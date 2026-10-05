#!/usr/bin/env python
"""Q4 recon: understand S5C1 mapped frame structure numerically."""
import glob

import numpy as np
from PIL import Image

files = sorted(glob.glob("/tmp/gravifire_s5c1/*.jpeg"))
print(f"{len(files)} frames")

for idx in (0, 200, 320, 900, 2000, 4000, 8000, 9599):
    im = np.asarray(Image.open(files[idx]).convert("L"), dtype=float)
    col_max = im.max(axis=0)  # per-column max over rows
    col_mean = im.mean(axis=0)
    row_max = im.max(axis=1)
    bright_cols = np.where(col_max > col_max.max() * 0.5)[0]
    bright_rows = np.where(row_max > row_max.max() * 0.5)[0]
    t_ms = files[idx].split("-")[-1].replace(".jpeg", "")
    print(f"\nframe[{idx}] epoch={t_ms} shape={im.shape} gmin={im.min():.0f} gmax={im.max():.0f} gmean={im.mean():.1f}")
    print(f"  bright cols (>50% of max): {bright_cols.min() if len(bright_cols) else '-'}..{bright_cols.max() if len(bright_cols) else '-'} (n={len(bright_cols)})")
    print(f"  bright rows: {bright_rows.min() if len(bright_rows) else '-'}..{bright_rows.max() if len(bright_rows) else '-'} (n={len(bright_rows)})")
    # horizontal band structure: mean over columns for 8 row bands
    bands = np.array_split(im, 8, axis=0)
    print("  row-band means:", [f"{b.mean():5.1f}" for b in bands])
    cols8 = np.array_split(im, 8, axis=1)
    print("  col-band means:", [f"{b.mean():5.1f}" for b in cols8])
