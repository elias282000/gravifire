#!/usr/bin/env python
"""R1-Q3 selective pull: PSI-98 Sample 1 sensor workbook + telemetry Good
Process Version + Sample 1 TM graphs docx (~28 MB total). Uses download.py's
presign/fetch machinery (internal file IDs from files/v2)."""
import os
import sys

sys.path.insert(0, "/home/elias/Codes/NSAC/psidata")
import download as dl  # noqa: E402

WANT_SUBSTR = [
    "Sample 1 Sensor Data Complete",
    "Telemetry Data Good Process",
    "Sample 1 TM graphs",
]

files, sv = dl.get_tree("PSI-98")
hits = [f for f in files if any(w.lower() in f["name"].lower() for w in WANT_SUBSTR)
        and f["category"] == "Raw Data" and not f["restricted"]]
print(f"{len(hits)} matching files:")
for f in hits:
    dest = os.path.join(dl.ROOT, "PSI-98", f["category"], f["name"])
    print(f"  {dl.human(f['size']):>10}  {f['name']}  (id={f['id']})")
    if os.path.exists(dest) and os.path.getsize(dest) == f["size"]:
        print("             already complete, skip")
        continue
    url = dl.presign("PSI-98", f, sv)
    got = dl.fetch(url, dest, f["size"], lambda n: None)
    print(f"             -> {dest} ({dl.human(got)})")
print("done")
