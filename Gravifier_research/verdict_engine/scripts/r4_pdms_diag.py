import glob
import re

import numpy as np
from PIL import Image

PAT = re.compile(r"-(\d{13})")
for sid in ("SAFFIRE2-S1C2", "SAFFIRE2-S2C2", "SAFFIRE2-S4C1"):
    fs = sorted(glob.glob(
        f"/home/elias/Codes/NSAC/Gravifier_research/evidence_store/anchors/{sid}/*.jp*g"))
    t0 = int(PAT.search(fs[0]).group(1))
    print(f"== {sid}: {len(fs)} frames ==")
    for idx in (0, len(fs) // 4, len(fs) // 2, 3 * len(fs) // 4, len(fs) - 1):
        im = np.asarray(Image.open(fs[idx]).convert("L"), dtype=float)
        t = (int(PAT.search(fs[idx]).group(1)) - t0) // 1000
        line = f"t+{t:4d}s shape={im.shape} gmax={im.max():.0f} gmean={im.mean():.1f}"
        for thr in (60, 120, 180):
            m = im > thr
            cols = np.where(m.any(axis=0))[0]
            ext = (cols.max() - cols.min()) / (im.shape[1] / 29.0) if len(cols) else 0
            line += f" | thr{thr}: n={m.sum():6d} ext={ext:5.1f}cm"
        print(line)
