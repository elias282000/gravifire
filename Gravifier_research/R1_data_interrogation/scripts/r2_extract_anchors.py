#!/usr/bin/env python
"""R2: extract anchor image sets from local zips into
Gravifier_research/evidence_store/anchors/<set_id>/ and register them in the
store's image_sets (extracted_path + frame census). Mapped JPEG zips only,
plus S3C2 fallback to the unmapped All-JPEGs (flagged).
"""
import glob
import re
import shutil
import sqlite3
import subprocess
import zipfile
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
PSI = ROOT / "psidata"
ANCHORS = ROOT / "Gravifier_research/evidence_store/anchors"
DB = ROOT / "Gravifier_research/evidence_store/gravifire_l1.db"

# set_id -> (zip glob pattern, study, run_id, mapping, flags)
SETS = {
    "SAFFIRE2-S1C2": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S1C2_Image_Data_All-JPEGs_Mapped_part*.zip",
                      "mapped", "PDMS anchor (stall qualitative)"),
    "SAFFIRE2-S2C2": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S2C2_Image_Data_All_JPEGs_Mapped_part*.zip",
                      "mapped", "PDMS anchor"),
    "SAFFIRE2-S3C2": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S3C2_Image_Data_All-JPEGs_part*.zip",
                      "unmapped_fallback", "PDMS anchor; mapped JPEG set does not exist locally"),
    "SAFFIRE2-S4C1": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S4C1_Image_Data_All_JPEGs_Mapped_part*.zip",
                      "mapped", "PDMS opposed-flow anchor"),
    "SAFFIRE2-S5C1": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S5C1_Image_Data_All_JPEGs_Mapped_part*.zip",
                      "mapped", "primary anchor 2.1 mm/s (reproduced in R1)"),
    "SAFFIRE2-S5C2": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S5C2_Image_Data_All_JPEGs_Mapped_part*.zip",
                      "mapped", "S5 second camera"),
    "SAFFIRE2-S6C1": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II*S6C1_Image_Data_All[-_]JPEGs_Mapped_part*.zip",
                      "mapped", "S6 anchor ~2.6 mm/s (R4)"),
    "SAFFIRE2-S9C1": ("PSI-99/Raw Data/PSI-99_Raw Data_SAFFIRE-II_S9C1_Image_Data_All_JPEGs_Mapped_part*.zip",
                      "mapped", "thick PMMA 1 cm anchor"),
    "SAFFIRE1-S1C1": ("PSI-98/Raw Data/PSI-98_Raw Data_SAFFIRE_I_S1C1_JPEG_Mapped_part*.zip",
                      "mapped", "SAFFIRE-I S1 anchor ~1.7-1.8 mm/s (R4)"),
}

con = sqlite3.connect(DB)
for set_id, (pat, mapping, note) in SETS.items():
    zips = sorted(glob.glob(str(ROOT / "psidata" / pat)))
    dest = ANCHORS / set_id
    if not zips:
        print(f"{set_id}: NO LOCAL ZIPS match {pat}")
        continue
    dest.mkdir(parents=True, exist_ok=True)
    n = 0
    for z in zips:
        with zipfile.ZipFile(z) as zf:
            members = [m for m in zf.namelist() if m.lower().endswith((".jpeg", ".jpg"))]
            for m in members:
                out = dest / Path(m).name
                if not out.exists():
                    with zf.open(m) as src, open(out, "wb") as fh:
                        shutil.copyfileobj(src, fh)
                n += 1
    files = sorted(dest.glob("*.jp*g"))
    eps = sorted(int(m.group(1)) for f in files
                 for m in [re.search(r"(\d{13})\.jpe?g", f.name)] if m)
    study, _, tag = set_id.partition("-")
    cam = tag
    run_id = f"{study}-S{cam[1]}" if cam[0] == "S" else None
    flags = "ANCHOR|" + ("UNMAPPED_FALLBACK" if mapping != "mapped" else "MAPPED")
    con.execute("INSERT OR REPLACE INTO image_sets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (set_id, run_id, study, cam, "burn", mapping, len(files),
                 eps[0] if eps else None, eps[-1] if eps else None, None,
                 len(zips), str(dest.relative_to(ROOT)), "local zips", None,
                 flags + "|" + note.replace(" ", "_")))
    print(f"{set_id}: {len(files)} frames from {len(zips)} zips -> {dest}")

con.commit()
con.close()
total = sum(1 for _ in ANCHORS.rglob("*.jp*g"))
print(f"\nanchor frames total: {total}")
