#!/usr/bin/env python
"""R1-Q2: do image epoch-ms timestamps align with the sensor time bases?

Evidence:
- PSI-98 S2C1/S2C2 jpeg zips: filenames S2C1-<epoch_ms>.jpeg
- PSI-98 Sample-2 workbook 'Camera Data' sheet: per-frame epoch ms
- PSI-98 Sample-2 'Calibrated Data' epoch ms (sensor base)
- PSI-99 S5C1 mapped-jpeg zips (part1+part2): Mapped_S5C1-<epoch_ms>.jpeg
- PSI-99 Sample-5 'Calibrated Data' epoch ms (sensor base)

Checks: per-frame dt, span, in-window fraction, camera-sheet vs zip offset.
"""
import re
import zipfile
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path("/home/elias/Codes/NSAC/psidata")
OUT = Path("/home/elias/Codes/NSAC/Gravifier_research/R1_data_interrogation/outputs")


def frame_epochs_from_zip(zpaths, pat):
    eps = []
    for zp in zpaths:
        with zipfile.ZipFile(zp) as z:
            for n in z.namelist():
                m = re.search(pat, n)
                if m:
                    eps.append(int(m.group(1)))
    return np.array(sorted(eps))


def sensor_window(csv_gz, epoch_col="Epoch Time"):
    df = pd.read_csv(csv_gz)
    ep = pd.to_numeric(df[epoch_col], errors="coerce").dropna()
    return ep.to_numpy()


def report(name, frames, sensor):
    dt = np.diff(frames)
    in_win = ((frames >= sensor.min()) & (frames <= sensor.max())).mean()
    lead = (frames.min() - sensor.min()) / 1000.0
    tail = (sensor.max() - frames.max()) / 1000.0
    print(f"{name}:")
    print(f"  frames={len(frames)}  span={dt.sum()/1000:.1f}s  median_dt={np.median(dt):.1f}ms"
          f"  (~{1000/np.median(dt):.1f} fps)")
    print(f"  in sensor window: {in_win*100:.2f}%   frame_start leads sensor_t0 by {lead:+.1f}s,"
          f" ends {tail:+.1f}s before sensor_end")
    return {"name": name, "frames": len(frames), "span_s": dt.sum() / 1000,
            "median_dt_ms": float(np.median(dt)), "in_window_frac": float(in_win)}


rows = []

# --- PSI-98: zip filenames vs camera sheet vs calibrated sensors
p98_zips = [
    ROOT / "PSI-98/Raw Data/PSI-98_Raw Data_SAFFIRE_I_S2C1_jpeg.zip",
    ROOT / "PSI-98/Raw Data/PSI-98_Raw Data_SAFFIRE_I_S2C2_jpeg.zip",
]
f98_c1 = frame_epochs_from_zip([p98_zips[0]], r"S2C1-(\d{13})\.jpe?g")
f98_c2 = frame_epochs_from_zip([p98_zips[1]], r"S2C2-(\d{13})\.jpe?g")
sens98 = sensor_window(OUT / "q1_P98-S2.csv.gz")

cam = pd.read_excel(ROOT / "PSI-98/Raw Data/PSI-98_Raw Data_Saffire-I Sample 2 Sensor Data Complete TM graphs.xlsx",
                    sheet_name="Camera Data", header=1)
cam_c1 = pd.to_numeric(cam["Epoch Time (ms)"], errors="coerce").dropna().to_numpy()
# Camera sheet holds C1 and C2 blocks in the same rows (same header repeated)
cam_c2 = pd.to_numeric(cam["Epoch Time (ms).1"], errors="coerce").dropna().to_numpy()

rows.append(report("P98 S2C1 zip filenames", f98_c1, sens98))
rows.append(report("P98 S2C2 zip filenames", f98_c2, sens98))
rows.append(report("P98 Camera-sheet C1", cam_c1, sens98))
rows.append(report("P98 Camera-sheet C2", cam_c2, sens98))
off = np.intersect1d(f98_c1[:50], cam_c1[:50])
print(f"  camera-sheet C1 vs zip C1 first-50 shared epochs: {len(off)}/50 identical"
      f"  (max |diff| of sorted heads: {np.abs(np.sort(f98_c1[:len(cam_c1)])[:50] - np.sort(cam_c1)[:50]).max():.0f} ms)")

# --- PSI-99: S5C1 zip filenames vs S5 calibrated sensors
p99_zips = [
    ROOT / "PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S5C1_Image_Data_All_JPEGs_Mapped_part1.zip",
    ROOT / "PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S5C1_Image_Data_All_JPEGs_Mapped_part2.zip",
]
f99 = frame_epochs_from_zip(p99_zips, r"S5C1-(\d{13})\.jpe?g")
sens99 = sensor_window(OUT / "q1_P99-S5.csv.gz")
rows.append(report("P99 S5C1 mapped zip filenames", f99, sens99))

pd.DataFrame(rows).to_csv(OUT / "q2_alignment_stats.csv", index=False)
print(f"\nwrote {OUT}/q2_alignment_stats.csv")
