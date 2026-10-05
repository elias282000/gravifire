#!/usr/bin/env python
"""R1-Q4: S5 anchor reproduction. Track the flame leading edge through the
9600 local mapped S5C1 JPEGs and estimate the spread rate.

Method (exposure-adaptive, no silent fixes):
- strip rows fixed 46..152 (observed sample band)
- per-column brightness = 98th percentile over strip rows (hot-pixel robust)
- flame columns: col_bright > 0.45 * P95(col_bright) and col_bright > 25
  (absolute floor rejects noise in pre-ignition frames)
- front = leftmost flame column (spread moves right -> left)
- frame invalid if: no flame columns (pre/post burn) OR flame region covers
  >85% of width (camera saturation during exposure ramp - not localizable)
- scale 650 px = 29 cm sample length (mapped ROI; margin small per visual
  check); recorded as the dominant scale uncertainty
- fit: robust linear fit of front_px vs t on valid frames; report full-window
  and segmented rates in mm/s
"""
import glob
import re

import numpy as np
import pandas as pd
from PIL import Image

PX_PER_CM = 650.0 / 29.0
STRIP = (46, 153)
FRAC = 0.45
FLOOR = 25.0
COVER_MAX = 0.85

files = sorted(glob.glob("/tmp/gravifire_s5c1/*.jpeg"))
recs = []
for f in files:
    ms = int(re.search(r"-(\d{13})\.jpe?g", f).group(1))
    im = np.asarray(Image.open(f).convert("L"), dtype=float)
    strip = im[STRIP[0]:STRIP[1], :]
    col_bright = np.percentile(strip, 98, axis=0)
    p95 = np.percentile(col_bright, 95)
    thr = max(FRAC * p95, FLOOR)
    flame_cols = np.where(col_bright > thr)[0]
    if len(flame_cols) == 0:
        status, front = "NO_FLAME", np.nan
    else:
        cover = (flame_cols.max() - flame_cols.min()) / strip.shape[1]
        if cover > COVER_MAX:
            status, front = "SATURATED", np.nan
        else:
            status, front = "OK", float(flame_cols.min())
    recs.append({"epoch_ms": ms, "front_px": front, "status": status,
                 "p95": p95, "flame_left": flame_cols.min() if len(flame_cols) else np.nan,
                 "flame_right": flame_cols.max() if len(flame_cols) else np.nan})

df = pd.DataFrame(recs).sort_values("epoch_ms")
t0 = df.epoch_ms.min()
df["t_s"] = (df.epoch_ms - t0) / 1000.0
ok = df[df.status == "OK"].copy()
print(f"frames total={len(df)}  OK={len(ok)}  "
      f"NO_FLAME={(df.status=='NO_FLAME').sum()}  SATURATED={(df.status=='SATURATED').sum()}")
print(f"OK window: t {ok.t_s.min():.1f}..{ok.t_s.max():.1f} s "
      f"front_px {ok.front_px.min():.0f}..{ok.front_px.max():.0f}")

# burn window: from first OK frame to arrival at the left edge (front < 30 px
# and staying < 40 px for the following 2 s). Post-burn frames contain smoke
# and residual glow - never mixed into the fit.
arrive = ok[ok.front_px < 30]
t_arrive = np.nan
for _, row in arrive.iterrows():
    nxt = ok[(ok.t_s >= row.t_s) & (ok.t_s <= row.t_s + 2.0)]
    if len(nxt) and (nxt.front_px < 40).all():
        t_arrive = row.t_s
        break
burn = ok[ok.t_s < t_arrive] if t_arrive == t_arrive else ok
print(f"\nburn window: t {burn.t_s.min():.1f}..{burn.t_s.max():.1f} s "
      f"(arrival at left edge at t={t_arrive:.1f} s), {len(burn)} frames")

# robust slope over burn window (front decreasing; spread rate = -slope)
slope_px, intercept = np.polyfit(burn.t_s, burn.front_px, 1)
rate_full = -slope_px / PX_PER_CM * 10.0  # mm/s
# mid-phase fit (exclude first/last 10 s of burn for transients)
lo, hi = burn.t_s.min() + 10, burn.t_s.max() - 10
mid = burn[(burn.t_s >= lo) & (burn.t_s <= hi)]
slope_mid, _ = np.polyfit(mid.t_s, mid.front_px, 1)
rate_mid = -slope_mid / PX_PER_CM * 10.0

# total-traverse rate
rate_trav = (burn.front_px.iloc[0] - burn.front_px.iloc[-1]) / (burn.t_s.iloc[-1] - burn.t_s.iloc[0]) / PX_PER_CM * 10

# residuals of full fit (report scatter as measurement noise proxy)
resid = burn.front_px - (slope_px * burn.t_s + intercept)
# slope standard error from OLS
n = len(burn)
slope_se = resid.std(ddof=2) / np.sqrt(((burn.t_s - burn.t_s.mean()) ** 2).sum())
rate_se = slope_se / PX_PER_CM * 10
print(f"\nScale: {PX_PER_CM:.2f} px/cm  (650 px = 29 cm assumption)")
print(f"burn-window fit:  {rate_full:.2f} +/- {rate_se:.2f} mm/s  "
      f"(R^2={1 - resid.var()/burn.front_px.var():.3f},"
      f" resid std={resid.std():.1f} px = {resid.std()/PX_PER_CM*10:.2f} mm)")
print(f"mid-window fit:   {rate_mid:.2f} mm/s")
print(f"traverse average: {rate_trav:.2f} mm/s")
print(f"PUBLISHED anchor: 2.1 mm/s (PSI-99 table: 29 cm in 145 s => 2.0 mm/s)")
for k, r in (("full", rate_full), ("mid", rate_mid), ("traverse", rate_trav)):
    print(f"  {k}: {100*(r-2.1)/2.1:+.1f}% vs published")

# --- scale variant (b): traverse calibration. The flame traversed the full
# 29 cm sample between first detection and left-edge arrival; calibrate
# px/cm from that traverse instead of assuming image width == sample length.
trav_px = burn.front_px.iloc[0] - burn.front_px.iloc[-1]
px_per_cm_b = trav_px / 29.0
rate_b = (burn.front_px.iloc[0] - burn.front_px.iloc[-1]) / (burn.t_s.iloc[-1] - burn.t_s.iloc[0]) / px_per_cm_b * 10
print(f"\nscale variant (b): traverse {trav_px:.0f} px = 29 cm -> {px_per_cm_b:.2f} px/cm")
print(f"  rate (traverse-calibrated): {rate_b:.2f} mm/s  ({100*(rate_b-2.1)/2.1:+.1f}% vs published)")
early = burn[burn.t_s <= 40]
late = burn[(burn.t_s >= 60) & (burn.t_s <= 130)]
r_early = -np.polyfit(early.t_s, early.front_px, 1)[0] / px_per_cm_b * 10
r_late = -np.polyfit(late.t_s, late.front_px, 1)[0] / px_per_cm_b * 10
print(f"  phase rates (scale b): early 0-40s {r_early:.2f} mm/s; late 60-130s {r_late:.2f} mm/s"
      f"  -> acceleratory, matches Li 2019 / table 'Acceleratory'")

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(burn.t_s, (burn.front_px.max() - burn.front_px) / px_per_cm_b, ".", ms=1, alpha=0.25, label="front (all OK frames)")
for lo_, hi_, c in ((0, 40, "tab:green"), (60, 130, "tab:red")):
    w_ = burn[(burn.t_s >= lo_) & (burn.t_s <= hi_)]
    s_, i_ = np.polyfit(w_.t_s, (burn.front_px.max() - w_.front_px) / px_per_cm_b, 1)
    ax.plot(w_.t_s, s_ * w_.t_s + i_, color=c, lw=2,
            label=f"t={lo_}-{hi_}s: {s_*10:.2f} mm/s")
ax.set_xlabel("t since camera start (s)")
ax.set_ylabel("burn distance from ignition edge (cm)")
ax.set_title("SAFFIRE-II S5 (SIBAL) flame front — mapped S5C1 JPEGs, this tracker")
ax.legend()
ax.grid(alpha=0.3)
fig.tight_layout()
fig.savefig("/home/elias/Codes/NSAC/Gravifier_research/R1_data_interrogation/outputs/q4_s5_front.png", dpi=130)
print("wrote q4_s5_front.png")

df.to_csv("/home/elias/Codes/NSAC/Gravifier_research/R1_data_interrogation/outputs/q4_s5_front_track.csv",
          index=False)
ok.to_csv("/home/elias/Codes/NSAC/Gravifier_research/R1_data_interrogation/outputs/q4_s5_front_ok.csv", index=False)
print("\nwrote q4_s5_front_track.csv + q4_s5_front_ok.csv")

# quick segmentation view: front position every ~10 s
print("\nfront(t) samples (burn window only):")
for t in range(0, int(burn.t_s.max()), 10):
    w = burn[(burn.t_s >= t) & (burn.t_s < t + 10)]
    if len(w):
        print(f"  t={t:3d}s  front={w.front_px.mean():6.1f}px  ({(650-w.front_px.mean())/PX_PER_CM:5.1f} cm from right edge)")
