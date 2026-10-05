#!/usr/bin/env python
"""Recon: sheet names + first rows of the PSI-99 sensor workbooks and
PSI-98/99 telemetry, so the Q1 parser can be written against reality."""
from pathlib import Path

import openpyxl

ROOT = Path("/home/elias/Codes/NSAC/psidata")

TARGETS = [
    ROOT / "PSI-99/Raw Data/PSI-99_Raw Data_Saffire Sensor Data Sample 1.xlsx",
    ROOT / "PSI-99/Raw Data/PSI-99_Raw Data_Saffire-II Telemetry Data.xlsx",
    ROOT / "PSI-98/Raw Data/PSI-98_Raw Data_Saffire-I Sample 2 Sensor Data Complete TM graphs.xlsx",
]

for path in TARGETS:
    print(f"\n{'=' * 80}\n{path.name}")
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    for ws in wb.worksheets:
        print(f"  -- sheet '{ws.title}' dims={ws.calculate_dimension()}")
        for r, row in enumerate(ws.iter_rows(min_row=1, max_row=4, values_only=True), start=1):
            vals = [str(v)[:22] if v is not None else "" for v in row[:14]]
            print(f"     r{r}: {vals}")
    wb.close()
