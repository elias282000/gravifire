import glob
import re

import numpy as np
import pandas as pd
from PIL import Image

PAT = re.compile(r"-(\d{13})")
files = sorted(glob.glob(
    "/home/elias/Codes/NSAC/Gravifier_research/evidence_store/anchors/SAFFIRE2-S6C1/*.jp*g"))
t0 = int(PAT.search(files[0]).group(1))
rows = []
for f in files[::10]:
    im = np.asarray(Image.open(f).convert("L"), dtype=float)
    h, w = im.shape
    strip = im[int(h * 0.26):int(h * 0.86), :]
    cb = np.percentile(strip, 98, axis=0)
    p95 = np.percentile(cb, 95)
    thr = max(0.45 * p95, 25.0)
    fl = np.where(cb > thr)[0]
    t = (int(PAT.search(f).group(1)) - t0) / 1000.0
    if len(fl):
        rows.append({"t": t, "lo": fl.min(), "hi": fl.max(),
                     "cover": (fl.max() - fl.min()) / w, "gmax": im.max(),
                     "gmean": round(im.mean(), 1), "w": w, "h": h})
df = pd.DataFrame(rows)
print(df.iloc[::8].to_string(index=False))
