#!/usr/bin/env python
"""R1-Q5: clean the PSI-25 (BASS-II) and PSI-26 (BASS) experimental tables
into evidence-store-shaped rows without silent conversions.

Output: outputs/q5_evidence_rows.csv (+ console reconciliation report).

Rules:
- Every normalized value keeps its source string (value_raw) and file/row
  provenance.
- Any cell that is not a plain number gets a flag; nothing is converted,
  dropped, or averaged silently.
- Multi-value cells (fan/air display sequences) are kept as JSON lists and
  flagged MULTI_VALUE.
- "none"/blank stay MISSING; negatives stay as-is and get NEGATIVE_RAW.
"""
import json
import re
import sys
from pathlib import Path

import pandas as pd

ROOT = Path("/home/elias/Codes/NSAC")
OUT = ROOT / "Gravifier_research/R1_data_interrogation/outputs"
OUT.mkdir(parents=True, exist_ok=True)

PSI25_CSV = ROOT / "psidata/PSI-25/Experimental table/PSI-25_Experimental table_BASS-II.csv"
PSI26_CSV = ROOT / "psidata/PSI-26/Experimental table/PSI-26_Experimental table_BASS.csv"

# value type per column: plain float, multi-sequence (list of floats), text
PSI25_COLS = {
    "GMT": ("float", "day_of_year"),
    "Flow restrictor": ("float", "setting"),
    "Fan display": ("seq", "display"),
    "Air display": ("seq", "display"),
    "Radiometer gain   (1000   250   50   10)": ("float", "gain_setting"),
    "Total Frames Shot": ("float", "frames"),
    "Calibrated  initial O2 % by vol ": ("float", "percent_vol"),
    "Calibrated final O2 % by vol": ("float", "percent_vol"),
    "Initial CO2 % by vol": ("float", "percent_vol"),
    "Final CO2 % by vol": ("float", "percent_vol"),
    "Initial CO (ppm)": ("float", "ppm"),
    "Final CO (ppm)": ("float", "ppm"),
}
PSI26_COLS = {
    "GMT": ("float", "day_of_year"),
    "As Run Test #": ("float", "test_number"),
    "Test #": ("float", "test_number"),
    "Sample #": ("text", "sample_id"),
}

# family rules for the material string (first match wins)
FAMILY_RULES = [
    (r"soot cleaning", "housekeeping"),
    (r"ultem", "ultem_sheet"),
    (r"micron|0\.\d mm|film", "thin_pmma_film"),
    (r"cyl|rod", "pmma_rod"),
    (r"spherical section", "spherical_section"),
    (r"sibal", "sibal_fabric"),
    (r"sphere", "pmma_sphere"),
    (r"wax", "wax_slab"),
    (r"nomex", "nomex_blend"),
    (r"can[sd]le", "candle"),
    (r"acetate", "acetate"),
    (r"polyethylene|pe ", "polyethylene"),
    # BASS flat PMMA ("PMMA 2 cm", "pmma slab") and BASS-II M-series
    # ("1 mm thick PMMA ... 2 cm wide", "4 mm thick ... PMMA slab")
    (r"pmma", "pmma_slab"),
]
NOT_A_TEST = {"housekeeping"}


def parse_cell(raw, kind):
    """Return (value_norm, flags). Never raise; flag everything odd."""
    flags = []
    if raw is None or (isinstance(raw, float) and pd.isna(raw)):
        return None, ["MISSING"]
    s = str(raw).strip()
    if s == "" or s.lower() in {"none", "n/a", "na", "-"}:
        return None, ["MISSING"]

    if kind == "text":
        return s, []

    if kind == "float":
        s2 = s.replace(",", ".")
        try:
            v = float(s2)
        except ValueError:
            return s, ["NON_NUMERIC"]
        if v < 0:
            flags.append("NEGATIVE_RAW")
        if "," in s:
            flags.append("DECIMAL_COMMA_FIX")
        return v, flags

    if kind == "seq":
        # split on any whitespace (values like "0.9   1.3   2.75" or "3.3 (66)")
        parts = s.split()
        vals, seq_flags = [], []
        for p in parts:
            p2 = re.sub(r"\(([^)]*)\)", r"\1", p)  # "1.7 (52)" -> paren = annotated
            if "(" in p:
                seq_flags.append("PAREN_ANNOTATION")
            try:
                vals.append(float(p2))
            except ValueError:
                vals.append(p2)
                seq_flags.append("NON_NUMERIC_IN_SEQ")
        if len(vals) > 1:
            seq_flags.append("MULTI_VALUE")
        if any(isinstance(v, str) for v in vals):
            seq_flags.append("SEQ_HAS_TEXT")
        return vals, seq_flags or []

    return s, ["UNHANDLED_KIND"]


def family_of(material):
    if material is None or (isinstance(material, float) and pd.isna(material)):
        return None, ["MISSING"]
    s = str(material).lower()
    for pat, fam in FAMILY_RULES:
        if re.search(pat, s):
            return fam, []
    return "UNMATCHED:" + str(material).strip(), ["FAMILY_UNMATCHED"]


def date_gmt_check(row, date_col="Date", gmt_col="GMT"):
    """GMT should equal day-of-year of Date. Return flag list."""
    try:
        d = pd.to_datetime(str(row[date_col]).strip(), format="%m/%d/%Y")
        gmt = float(row[gmt_col])
    except Exception:
        return ["DATE_GMT_UNCHECKABLE"]
    if int(gmt) == d.dayofyear:
        return []
    return [f"DATE_GMT_MISMATCH(gmt={int(gmt)},doy={d.dayofyear})"]


def main():
    frames = []
    recon = []

    for path, study, cols in ((PSI25_CSV, "BASS-II", PSI25_COLS), (PSI26_CSV, "BASS", PSI26_COLS)):
        df = pd.read_csv(path, encoding="utf-8-sig", dtype=str)
        n_raw = len(df)
        n_used = 0
        for i, row in df.iterrows():
            test_no = row.get("Test #")
            if test_no is None or (isinstance(test_no, float) and pd.isna(test_no)) or str(test_no).strip().lower() == "nan":
                test_no = row.get("As Run Test #", f"row{i}")
                test_flag = ["TEST_NUMBER_FROM_ASRUN"]
            else:
                test_flag = []
            test_id = str(test_no).strip()
            pi = str(row.get("PI", "")).strip() if "PI" in row else ""
            base = {
                "study": study,
                "source_file": path.name,
                "source_row": i + 2,  # 1-based CSV row incl. header
                "test_id": f"{study}-{test_id}",
                "pi": pi,
                "sample_id": str(row.get("Sample #", "")).strip(),
            }
            n_used += 1
            # identity: material + family
            mat_raw = row.get("Fuel Sample Material", None)
            fam, fam_flags = family_of(mat_raw)
            if fam in NOT_A_TEST:
                fam_flags = fam_flags + ["NOT_A_TEST"]
            fam_flags = fam_flags + test_flag
            frames.append({**base, "variable": "material", "value_raw": str(mat_raw).strip(),
                           "value_norm": fam, "unit": None, "flags": fam_flags})
            # date consistency
            for fl in date_gmt_check(row):
                frames.append({**base, "variable": "_row_flag", "value_raw": f"{row.get('Date','')}|{row.get('GMT','')}",
                               "value_norm": None, "unit": None, "flags": [fl, "ROW"]})
            # planned vs as-run (PSI-26 keeps both columns)
            if "As Run Test #" in row.index:
                frames.append({**base, "variable": "test_number_asrun", "value_raw": str(row["As Run Test #"]).strip(),
                               "value_norm": base["test_id"].split("-")[-1], "unit": None, "flags": []})
            for col, (kind, unit) in cols.items():
                raw = row.get(col, None)
                val, flags = parse_cell(raw, kind)
                frames.append({**base, "variable": col.strip(), "value_raw": str(raw).strip() if raw is not None else "",
                               "value_norm": json.dumps(val) if isinstance(val, list) else val,
                               "unit": unit, "flags": flags})
        recon.append((study, str(path.name), n_raw, n_used))

    ev = pd.DataFrame(frames)
    ev["flags"] = ev["flags"].apply(lambda x: "|".join(x) if x else "")
    ev.to_csv(OUT / "q5_evidence_rows.csv", index=False)

    print("=== Q5 reconciliation ===")
    for study, fname, n_raw, n_used in recon:
        print(f"{study}: raw data rows={n_raw}  cleaned rows={n_used}  {'OK' if n_raw == n_used else 'ROW_LOSS'}")

    print("\n=== rows per study ===")
    print(ev.groupby("study").size())

    print("\n=== flag frequency (non-empty flags) ===")
    fl = ev.loc[ev["flags"] != "", "flags"].str.split("|").explode().value_counts()
    print(fl)

    print("\n=== families per study ===")
    fam = ev[ev["variable"] == "material"]
    print(fam.groupby(["study", "value_norm"]).size())

    print("\n=== distinct unmatched materials ===")
    um = fam[ev["flags"].str.contains("FAMILY_UNMATCHED", na=False)]
    print(um[["study", "test_id", "value_raw"]].to_string() if len(um) else "(none)")

    print("\n=== GMT vs date mismatches ===")
    mism = ev[ev["variable"] == "_row_flag"]
    print(f"{len(mism)} mismatch rows" if len(mism) else "0 mismatches — GMT column = day-of-year, verified for every row")

    print("\n=== multi-value fan/air cells (PSI-25) ===")
    mv = ev[(ev["study"] == "BASS-II") & (ev["flags"].str.contains("MULTI_VALUE", na=False))]
    n_fanair = len(ev[(ev["study"] == "BASS-II") & ev["variable"].isin(["Fan display", "Air display"])])
    print(f"{len(mv)} of {n_fanair} fan/air cells are sequences")

    print("\n=== sample count check ===")
    for study in ("BASS-II", "BASS"):
        sub = ev[ev["study"] == study]
        n_rows = len(sub[sub["variable"] == "material"])
        n_tests = sub["test_id"].nunique()
        print(f"{study}: {n_rows} data rows, {n_tests} distinct test_ids, {n_rows - n_tests} duplicate ids")
        dups = sub[sub["variable"] == "material"].groupby("test_id").size()
        dups = dups[dups > 1]
        if len(dups):
            print(dups.to_string())

    print(f"\nwrote {OUT/'q5_evidence_rows.csv'} ({len(ev)} evidence rows)")


if __name__ == "__main__":
    sys.exit(main())
