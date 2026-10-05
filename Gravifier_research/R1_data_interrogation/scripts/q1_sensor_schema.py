#!/usr/bin/env python
"""Q1 recon part 2: full headers of every sensor workbook, schema comparison,
row counts, time spans, sample rates. PSI-99 Samples 1-9 + PSI-98 Sample 2."""
from pathlib import Path

import openpyxl

ROOT = Path("/home/elias/Codes/NSAC/psidata")
P99 = sorted(ROOT.glob("PSI-99/Raw Data/PSI-99_Raw Data_Saffire Sensor Data Sample *.xlsx"))
P98 = sorted(ROOT.glob("PSI-98/Raw Data/*Sensor Data*.xlsx"))

def header_of(path, sheet="Calibrated Data"):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    names = []
    units = []
    if sheet in wb.sheetnames:
        ws = wb[sheet]
        rows = ws.iter_rows(min_row=1, max_row=2, values_only=True)
        names = [("" if v is None else str(v).strip()) for v in next(rows)]
        units = [("" if v is None else str(v).strip()) for v in next(rows)]
    sheets = wb.sheetnames
    wb.close()
    return sheets, names, units

ref_path, ref_sheets, ref_names, ref_units = None, None, None, None
for path in P99 + P98:
    sheets, names, units = header_of(path)
    tag = path.name.split("Sample ")[-1].split(".")[0] if "Sample" in path.name else path.stem[-30:]
    n_rows = None
    print(f"\n== {path.name}  sheets={sheets}")
    print(f"   {len(names)} cols")
    if ref_names is None:
        ref_path, ref_names, ref_units = path, names, units
        print("   headers (name|unit):")
        for i, (n, u) in enumerate(zip(names, units)):
            print(f"     {i:2d}  {n}{'|' + u if u else ''}")
    else:
        diffs = [(i, ref_names[i] if i < len(ref_names) else "<oob>", n) for i, n in enumerate(names) if n != (ref_names[i] if i < len(ref_names) else None)]
        print(f"   vs reference ({ref_path.name}): {'IDENTICAL' if not diffs else str(len(diffs)) + ' diffs'}")
        for i, ref, new in diffs[:20]:
            print(f"     col {i}: ref='{ref}' new='{new}'")
