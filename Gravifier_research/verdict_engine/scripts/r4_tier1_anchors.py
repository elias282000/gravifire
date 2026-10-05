#!/usr/bin/env python
"""R4 Tier 1 — anchor reproduction on the R2 anchor imagery.

Targets (published): S5 2.1 mm/s, S6 2.6 mm/s (SAFFIRE-II table + reviews);
SAFFIRE-I S1 1.7-1.8 mm/s (SAFFIRE-I review SS7.4 note, Urban 2019);
PDMS S1-S4 qualitative stall (SAFFIRE-II review SS16.1).

Methods (all documented, no silent fixes):
- S5/S6 (mapped 650x178, strip-row leading-edge tracker from R1):
  traverse calibration (front traverse = sample length 29 cm, the same
  length-over-time derivation as NASA's table) + absolute-scale variant.
- SAFFIRE-I S1C1 (mapped 1226x1702): flame-sheet blob tracker on the column
  axis; exposure/bracket outlier frames (col-span > 500 px) excluded;
  scale inferred from flame-sheet rows-extent = fabric width 40.6 cm
  (ROI calibration PDF is a dead NASA link - inference flagged).
- PDMS S1C2/S2C2/S3C2(unmapped)/S4C1: max sustained flame excursion from the
  ignition zone in sample-length units; STALL if < 4 cm.
"""
import glob
import json
import re
from pathlib import Path

import numpy as np
import pandas as pd
from PIL import Image

ROOT = Path("/home/elias/Codes/NSAC")
ANCH = ROOT / "Gravifier_research/evidence_store/anchors"
OUT = ROOT / "Gravifier_research/verdict_engine/outputs"
OUT.mkdir(exist_ok=True)


def frames_of(set_id):
    return sorted(glob.glob(str(ANCH / set_id / "*.jp*g")))


def track_saffire2(set_id, target_mm_s, strip_frac=(0.26, 0.86), sample_cm=29.0):
    """S5/S6 mapped tracker: leftmost flame column within strip.
    Absolute-scale variant assumes image width == sample length (per-set
    width read from the first frame; assumption flagged in the output)."""
    files = frames_of(set_id)
    w0 = np.asarray(Image.open(files[0])).shape[1]
    recs = []
    for f in files:
        ms = int(re.search(r"-(\d{13})\.jpe?g", f).group(1))
        im = np.asarray(Image.open(f).convert("L"), dtype=float)
        h, w = im.shape
        strip = im[int(h * strip_frac[0]):int(h * strip_frac[1]), :]
        col_bright = np.percentile(strip, 98, axis=0)
        p95 = np.percentile(col_bright, 95)
        thr = max(0.45 * p95, 25.0)
        flame = np.where(col_bright > thr)[0]
        if len(flame) == 0:
            recs.append({"epoch_ms": ms, "status": "NO_FLAME", "front_px": np.nan})
            continue
        cover = (flame.max() - flame.min()) / w
        if cover > 0.85:  # exposure ramp or periodic LED scene frame
            recs.append({"epoch_ms": ms, "status": "SATURATED", "front_px": np.nan})
        else:
            recs.append({"epoch_ms": ms, "status": "OK", "front_px": float(flame.min())})
    df = pd.DataFrame(recs).sort_values("epoch_ms")
    t0 = df.epoch_ms.min()
    df["t_s"] = (df.epoch_ms - t0) / 1000.0
    # burn window = longest contiguous interval where flame presence (rolling
    # 5 s fraction of OK frames) stays >= 0.3. Post-burn glow frames are
    # sparse (surrounded by NO_FLAME/SATURATED), so activity collapses there.
    df["ok_flag"] = (df.status == "OK").astype(float)
    df["act"] = df.ok_flag.rolling(150, center=True, min_periods=15).mean()
    act = df.dropna(subset=["act"])
    active = act[act.act >= 0.3]
    gaps = active.t_s.diff()
    if len(active) == 0:
        raise RuntimeError(f"{set_id}: no active interval found")
    seg_start = 0
    best = (0, None, None)
    starts = [0] + list(gaps[gaps > 2.0].index)
    ends = list(gaps[gaps > 2.0].index) + [len(active)]
    for s, e in zip(starts, ends):
        seg = active.iloc[s:e]
        span = seg.t_s.iloc[-1] - seg.t_s.iloc[0]
        if span > best[0]:
            best = (span, seg.t_s.iloc[0], seg.t_s.iloc[-1])
    _, t_lo, t_hi = best
    burn = df[(df.t_s >= t_lo) & (df.t_s <= t_hi) & (df.status == "OK")].dropna(subset=["front_px"])
    # if the front genuinely reaches the left edge inside the activity window
    # (S5), trim at arrival: first front<30 whose following valid frames stay
    # <45. Sets whose front stalls short of the edge (S6) keep the window.
    crossed = burn[burn.front_px < 30]
    for _, row in crossed.iterrows():
        nxt = burn[(burn.t_s >= row.t_s) & (burn.t_s <= row.t_s + 2.5)]
        if len(nxt) >= 1 and (nxt.front_px < 45).all():
            burn = burn[burn.t_s <= row.t_s]
            break
    dur = float(burn.t_s.iloc[-1] - burn.t_s.iloc[0])
    trav = float(burn.front_px.iloc[0] - burn.front_px.iloc[-1])
    px_per_cm_trav = trav / sample_cm if trav else np.nan
    rate_trav = sample_cm / dur * 10 if dur > 0 else np.nan
    # Theil-Sen slope (median of 400 random pair slopes) - robust to the
    # arrival stall tail and residual glow frames inside the window
    rng = np.random.default_rng(7)
    ts = burn.t_s.to_numpy()
    fs = burn.front_px.to_numpy()
    i, j = rng.integers(0, len(ts), 400), rng.integers(0, len(ts), 400)
    keep = ts[j] - ts[i] > 1.0
    slopes = (fs[j][keep] - fs[i][keep]) / (ts[j][keep] - ts[i][keep])
    slope_ts = float(np.median(slopes))
    rate_desc = -slope_ts / px_per_cm_trav * 10 if px_per_cm_trav else np.nan
    slope, intercept = np.polyfit(burn.t_s, burn.front_px, 1)
    px_per_cm_abs = w0 / sample_cm
    rate_abs = -slope / px_per_cm_abs * 10
    resid = burn.front_px - np.polyval([slope, intercept], burn.t_s)
    return {
        "set_id": set_id, "target_mm_s": target_mm_s,
        "image_width_px": int(w0),
        "frames": len(files), "ok_frames": int(len(burn)),
        "burn_window_s": [round(float(burn.t_s.min()), 1), round(float(burn.t_s.max()), 1)],
        "rate_traverse_mm_s": round(float(rate_trav), 2),
        "rate_descent_fit_mm_s": round(float(rate_desc), 2),
        "rate_absolute_mm_s": round(float(rate_abs), 2),
        "pct_vs_published_traverse": round(100 * (rate_trav - target_mm_s) / target_mm_s, 1),
        "pct_vs_published_descent": round(100 * (rate_desc - target_mm_s) / target_mm_s, 1),
        "pct_vs_published_absolute": round(100 * (rate_abs - target_mm_s) / target_mm_s, 1),
        "resid_std_px": round(float(resid.std()), 1),
        "quality": {"NO_FLAME": int((df.status == "NO_FLAME").sum()),
                    "SATURATED": int((df.status == "SATURATED").sum()),
                    "OK": int((df.status == "OK").sum())},
    }


def track_saffire1_s1c1(target_lo, target_hi):
    files = frames_of("SAFFIRE1-S1C1")
    t0 = int(re.search(r"-(\d{13})", files[0]).group(1))
    recs = []
    for f in files:
        ms = int(re.search(r"-(\d{13})\.jpe?g", f).group(1))
        im = np.asarray(Image.open(f).convert("L"), dtype=float)
        mask = im > 60
        cols = np.where(mask.any(axis=0))[0]
        rows = np.where(mask.any(axis=1))[0]
        if len(cols) == 0:
            recs.append({"t_s": (ms - t0) / 1000.0, "status": "NO_FLAME",
                         "center": np.nan, "span": np.nan, "row_span": np.nan})
            continue
        span = cols.max() - cols.min()
        if span > 500:  # exposure/bracket frame: whole scene lit
            recs.append({"t_s": (ms - t0) / 1000.0, "status": "EXPOSURE_OUTLIER",
                         "center": np.nan, "span": np.nan, "row_span": np.nan})
            continue
        recs.append({"t_s": (ms - t0) / 1000.0, "status": "OK",
                     "center": float((cols.max() + cols.min()) / 2),
                     "span": float(span), "row_span": float(rows.max() - rows.min())})
    df = pd.DataFrame(recs)
    ok = df[df.status == "OK"].dropna(subset=["center"])
    # keep the contiguous main tracking window (largest gap < 20 s clusters)
    ok = ok.sort_values("t_s").reset_index(drop=True)
    gaps = ok.t_s.diff()
    break_idx = gaps[gaps > 20].index
    start = 0
    best = None
    ends = list(break_idx) + [len(ok)]
    for e in ends:
        seg = ok.iloc[start:e]
        if best is None or len(seg) > len(best):
            best = seg
        start = e
    seg = best
    slope, intercept = np.polyfit(seg.t_s, seg.center, 1)
    px_rate = -slope
    row_span_med = float(seg.row_span.median())
    # scale inference: flame sheet spans the fabric width 40.6 cm
    px_per_cm = row_span_med / 40.6
    rate_mm_s = px_rate / px_per_cm * 10
    mid = (target_lo + target_hi) / 2
    return {
        "set_id": "SAFFIRE1-S1C1", "target_mm_s": [target_lo, target_hi],
        "frames": len(files), "ok_frames": int(len(seg)),
        "track_window_s": [round(float(seg.t_s.iloc[0]), 1), round(float(seg.t_s.iloc[-1]), 1)],
        "px_rate": round(float(px_rate), 2),
        "scale_inference": f"flame-sheet row span {row_span_med:.0f} px = fabric width 40.6 cm "
                           f"-> {px_per_cm:.1f} px/cm (ROI calibration PDF is a dead NASA link)",
        "rate_mm_s": round(float(rate_mm_s), 2),
        "pct_vs_published": round(100 * (rate_mm_s - mid) / mid, 1),
        "quality": df.status.value_counts().to_dict(),
    }


def pdms_stall(set_id, sample_cm=29.0):
    """Qualitative stall check. LED scene-lighting frames (gmean > 100) are
    excluded; a flame frame needs >=20 bright pixels above max(80, 6x median).
    PDMS μg flames are dim blue - near the JPEG noise floor in these mapped
    sets - so this measures 'sustained luminous flame present or not'."""
    files = frames_of(set_id)
    if not files:
        return {"set_id": set_id, "status": "NO LOCAL FRAMES"}
    t0 = int(re.search(r"-(\d{13})", files[0]).group(1))
    flame_frames = []   # (t_s, extent_cm)
    led_frames = 0
    for f in files[::2]:
        im = np.asarray(Image.open(f).convert("L"), dtype=float)
        if im.mean() > 100:  # LED/scene illumination frame
            led_frames += 1
            continue
        thr = max(80.0, 6.0 * float(np.median(im)))
        mask = im > thr
        if mask.sum() < 20:
            continue
        colprof = mask.sum(axis=0)
        cols = np.where(colprof >= 3)[0]
        if len(cols) == 0:
            continue
        t = (int(re.search(r"-(\d{13})", f).group(1)) - t0) / 1000.0
        extent = (cols.max() - cols.min()) / (im.shape[1] / sample_cm)
        flame_frames.append((t, extent))
    # longest sustained luminous presence (frames within 0.5 s count as continuous)
    longest_run_s = 0.0
    if flame_frames:
        flame_frames.sort()
        run_start = flame_frames[0][0]
        prev = run_start
        for t, _ in flame_frames[1:]:
            if t - prev > 0.5:
                longest_run_s = max(longest_run_s, prev - run_start)
                run_start = t
            prev = t
        longest_run_s = max(longest_run_s, prev - run_start)
    max_ext = max((e for _, e in flame_frames), default=0.0)
    return {
        "set_id": set_id, "target": "ignited but NO sustained propagation",
        "frames_sampled": len(files) // 2,
        "led_scene_frames_excluded": led_frames,
        "flame_frames_detected": len(flame_frames),
        "longest_sustained_flame_s": round(longest_run_s, 2),
        "max_flame_extent_cm": round(max_ext, 1),
        "verdict": ("STALL_CONFIRMED_NO_SUSTAINED_SPREAD" if longest_run_s < 20.0
                    else "POSSIBLE_PROPAGATION"),
        "threshold_note": "sustained threshold 20 s: SIBAL S5 sustains 142.7 s; "
                          "PDMS episodes are 11-15x shorter; NASA table burn "
                          "time for PDMS reads 'Insignificant'",
        "published": "ignition then stall (SAFFIRE-II review SS16.1); ignition "
                     "itself confirmed by igniter telemetry, not by imagery "
                     "(flame luminosity near JPEG noise floor)",
    }


results = {
    "S5": track_saffire2("SAFFIRE2-S5C1", 2.1),
    "S6": track_saffire2("SAFFIRE2-S6C1", 2.6),
    "SAFFIRE1-S1": track_saffire1_s1c1(1.7, 1.8),
    "PDMS": [pdms_stall(s) for s in
             ("SAFFIRE2-S1C2", "SAFFIRE2-S2C2", "SAFFIRE2-S3C2", "SAFFIRE2-S4C1")],
}

(OUT / "r4_tier1_anchors.json").write_text(json.dumps(results, indent=1))
print(json.dumps(results, indent=1))
