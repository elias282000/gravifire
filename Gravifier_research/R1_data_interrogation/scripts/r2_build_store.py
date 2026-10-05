#!/usr/bin/env python
"""R2 — build the GRAVIFIRE L1 evidence store.

Outputs (under Gravifier_research/evidence_store/):
  gravifire_l1.db        SQLite store (runs, evidence items, series, images,
                         families, planned test points)
  series/*.csv.gz        the 11 unified time-series from R1
  exports/data_contract.json   catalog JSON (dev-doc data contract draft)
  exports/r2_exit_checks.txt   reconciliation + provenance + spot checks

Discipline (hard rules): every value keeps its source string + file + row;
nothing converts silently (flags, not fixes); display fields never become
calibrated velocity; planned != as-flown both live; BOUND != exact.
"""
import glob
import json
import re
import shutil
import sqlite3
import sys
from pathlib import Path

import numpy as np
import openpyxl
import pandas as pd

ROOT = Path("/home/elias/Codes/NSAC")
PSI = ROOT / "psidata"
R1OUT = ROOT / "Gravifier_research/R1_data_interrogation/outputs"
STORE = ROOT / "Gravifier_research/evidence_store"
SERIES = STORE / "series"
EXPORTS = STORE / "exports"
ANCHORS = STORE / "anchors"
STORE.mkdir(parents=True, exist_ok=True)
(ANCHORS).mkdir(parents=True, exist_ok=True)
DB = STORE / "gravifire_l1.db"

sys.path.insert(0, str(ROOT / "Gravifier_research/R1_data_interrogation/scripts"))
import q5_experimental_tables as q5  # reuse parse_cell + family rules  # noqa: E402

SCHEMA = """
PRAGMA journal_mode=OFF;
CREATE TABLE studies(study_id TEXT PRIMARY KEY, psi_id TEXT, name TEXT,
                     duct TEXT, scale_class TEXT);
CREATE TABLE runs(
  run_id TEXT PRIMARY KEY, study_id TEXT NOT NULL, run_key TEXT NOT NULL,
  pi TEXT, date TEXT, gmt TEXT,
  family TEXT, geometry TEXT, direction TEXT, scale_class TEXT,
  material_raw TEXT, sample_id TEXT,
  planned_test_no TEXT, is_test INTEGER NOT NULL DEFAULT 1,
  source_file TEXT NOT NULL, source_row INTEGER NOT NULL, flags TEXT NOT NULL DEFAULT '');
CREATE TABLE evidence_items(
  ei_id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL REFERENCES runs(run_id),
  variable TEXT NOT NULL,
  value_raw TEXT, value_norm TEXT, unit TEXT,
  evidence_class TEXT NOT NULL,
  flags TEXT NOT NULL DEFAULT '',
  source_file TEXT NOT NULL, source_row INTEGER, sheet TEXT,
  method TEXT);
CREATE TABLE sensor_series(
  series_id TEXT PRIMARY KEY, run_id TEXT, study_id TEXT NOT NULL,
  t0_epoch_ms INTEGER, t_end_epoch_ms INTEGER, duration_s REAL,
  hz REAL, n_rows INTEGER, n_channels INTEGER, big_gaps INTEGER,
  file TEXT, source_file TEXT NOT NULL, flags TEXT NOT NULL DEFAULT '');
CREATE TABLE image_sets(
  set_id TEXT PRIMARY KEY, run_id TEXT, study_id TEXT NOT NULL,
  camera TEXT, kind TEXT, mapping TEXT,
  n_frames INTEGER, t0_epoch_ms INTEGER, t_end_epoch_ms INTEGER,
  median_dt_ms REAL,
  local_zips INTEGER, extracted_path TEXT,
  source_file TEXT NOT NULL, source_sheet TEXT, flags TEXT NOT NULL DEFAULT '');
CREATE TABLE planned_test_points(
  ptp_id INTEGER PRIMARY KEY AUTOINCREMENT,
  study_id TEXT NOT NULL, sample_no TEXT, test_point TEXT,
  material_raw TEXT, ignition_type TEXT, extinguish_plan TEXT,
  source_file TEXT NOT NULL, source_row INTEGER NOT NULL,
  flags TEXT NOT NULL DEFAULT '');
CREATE TABLE families(
  family TEXT NOT NULL, study_id TEXT NOT NULL,
  geometry TEXT, material_class TEXT, n_runs INTEGER,
  notes TEXT, PRIMARY KEY(family, study_id));
"""

MEAS, DERIV, INTERP = "MEASURED", "DERIVED", "INTERPRETED"

GEOM = {
    "thin_pmma_film": "thin_sheet", "pmma_rod": "rod", "sibal_fabric": "sheet",
    "pmma_sphere": "sphere", "wax_slab": "slab", "nomex_blend": "sheet",
    "candle": "candle", "acetate": "sheet", "polyethylene": "sheet",
    "pmma_slab": "slab", "spherical_section": "curved_section", "ultem_sheet": "sheet",
    "housekeeping": None, "pdms_silicone": "sheet", "pmma_nomex": "sheet",
    "pmma_thick": "slab",
}

con = sqlite3.connect(DB)
con.executescript(SCHEMA)


def run(run_id, study, key, *, pi="", date="", gmt="", family=None, geometry=None,
        direction=None, scale="", material="", sample="", planned=None,
        is_test=1, src="", row=0, flags=""):
    con.execute("INSERT OR REPLACE INTO runs VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (run_id, study, key, pi, date, gmt, family, geometry, direction,
                 scale, material, sample, planned, is_test, src, row, flags))
    return run_id


def ei(run_id, variable, raw, norm, unit, ev_class, flags="",
       src="", row=None, sheet=None, method=None):
    con.execute("INSERT INTO evidence_items(run_id,variable,value_raw,value_norm,unit,"
                "evidence_class,flags,source_file,source_row,sheet,method) "
                "VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                (run_id, variable, "" if raw is None else str(raw),
                 None if norm is None else str(norm), unit, ev_class, flags,
                 src, row, sheet, method))


def parse_num(raw):
    """strict plain-number parse; returns (value, flags) — flags on anything odd"""
    if raw is None:
        return None, ["MISSING"]
    s = str(raw).strip()
    approx = s.startswith("~")
    if approx:
        s = s[1:].strip()
        # bare number under an approx marker, e.g. '~ 22.1' with % in header
        try:
            return float(s), ["APPROX_MARKER"]
        except ValueError:
            return None, ["NON_NUMERIC"]
    if s == "" or s.lower() in {"none", "n/a", "na", "-", "nan"}:
        return None, ["MISSING"]
    try:
        v = float(s)
    except ValueError:
        return None, ["NON_NUMERIC"]
    if v != v:  # NaN literal that survived string conversion
        return None, ["MISSING"]
    return v, ([] if v >= 0 else ["NEGATIVE_RAW"])


def parse_unit_value(raw, expect_unit):
    """'20 cm/s' -> (20.0, ['UNIT_EMBEDDED']); '22.1 to 22.0' -> first + RANGE;
    '037 mm' -> ambiguous, no silent fix."""
    if raw is None:
        return None, ["MISSING"]
    s = str(raw).strip()
    m = re.match(r"^~?\s*(\d+(?:\.\d+)?)\s*(?:to|-|–)\s*(\d+(?:\.\d+)?)\s*(mm|cm|s|W|cm/s|%|ms)?\b", s)
    if m:  # range: take the first value, flag it
        return float(m.group(1)), ["RANGE_VALUE"]
    m = re.match(r"^~?\s*(\d+(?:\.\d+)?)\s*(mm|cm|s|W|cm/s|%|ms)\b", s)
    if not m:
        v, fl = parse_num(s)
        return v, fl + (["NON_NUMERIC"] if v is None and fl == [] else [])
    num, unit = m.group(1), m.group(2)
    fl = ["UNIT_EMBEDDED"] if unit else []
    if re.match(r"^0\d", num):  # '037' — dropped decimal point, cannot fix silently
        return None, fl + ["AMBIGUOUS_NUMERIC"]
    return float(num), fl


# ----------------------------------------------------------------------------
# studies
# ----------------------------------------------------------------------------
for sid, psi, name, duct, scale in [
    ("BASS-II", "PSI-25", "Burning and Suppression of Solids II", "MSG small duct", "small"),
    ("BASS", "PSI-26", "Burning and Suppression of Solids", "MSG small duct", "small"),
    ("SAFFIRE-I", "PSI-98", "Spacecraft Fire Safety Experiment I", "Cygnus large duct", "large"),
    ("SAFFIRE-II", "PSI-99", "Spacecraft Fire Safety Experiment II", "Cygnus large duct", "large"),
]:
    con.execute("INSERT INTO studies VALUES (?,?,?,?,?)", (sid, psi, name, duct, scale))

# ----------------------------------------------------------------------------
# PSI-25 (BASS-II) experimental table -> runs + evidence
# ----------------------------------------------------------------------------
p25 = PSI / "PSI-25/Experimental table/PSI-25_Experimental table_BASS-II.csv"
df25 = pd.read_csv(p25, encoding="utf-8-sig", dtype=str)
for i, r in df25.iterrows():
    rid = f"BASS2-{r['Test #'].strip()}"
    mat = r.get("Fuel Sample Material")
    fam, fl = q5.family_of(mat)
    run(rid, "BASS-II", r["Test #"].strip(), pi=str(r.get("PI", "")).strip(),
        date=str(r.get("Date", "")).strip(), gmt=str(r.get("GMT", "")).strip(),
        family=fam, geometry=GEOM.get(fam), scale="small",
        material=str(mat).strip() if mat is not None else "",
        sample=str(r.get("Sample #", "")).strip(),
        src=p25.name, row=i + 2, flags="|".join(fl))
    for flg in q5.date_gmt_check(r):
        ei(rid, "_row_flag", f"{r.get('Date','')}|{r.get('GMT','')}", None, None,
           MEAS, flags=flg + "|ROW", src=p25.name, row=i + 2)
    for col, var, unit in [
        ("GMT", "gmt_day_of_year", "day_of_year"),
        ("Flow restrictor", "flow_restrictor", "setting"),
        ("Fan display", "fan_display", "display"),
        ("Air display", "air_display", "display"),
        ("Radiometer gain   (1000   250   50   10)", "radiometer_gain", "setting"),
        ("Total Frames Shot", "total_frames_shot", "frames"),
        ("Calibrated  initial O2 % by vol ", "o2_initial_pct", "%"),
        ("Calibrated final O2 % by vol", "o2_final_pct", "%"),
        ("Initial CO2 % by vol", "co2_initial_pct", "%"),
        ("Final CO2 % by vol", "co2_final_pct", "%"),
        ("Initial CO (ppm)", "co_initial_ppm", "ppm"),
        ("Final CO (ppm)", "co_final_ppm", "ppm"),
    ]:
        raw = r.get(col)
        kind = "seq" if var.endswith("_display") else "float"
        val, fl2 = q5.parse_cell(raw, kind)
        fl2 = list(fl2)
        if var.endswith("_display"):
            fl2.append("DISPLAY_NOT_CALIBRATED")
        if var.startswith("o2_") or var.startswith("co2_") or var.startswith("co_"):
            fl2.append("CALIBRATED_GAS_ANALYSIS")
        norm = json.dumps(val) if isinstance(val, list) else val
        ei(rid, var, raw, norm, unit, MEAS, flags="|".join(fl2), src=p25.name, row=i + 2)

# ----------------------------------------------------------------------------
# PSI-26 (BASS) experimental table -> runs (canonical key = As Run Test #)
# ----------------------------------------------------------------------------
p26 = PSI / "PSI-26/Experimental table/PSI-26_Experimental table_BASS.csv"
df26 = pd.read_csv(p26, encoding="utf-8-sig", dtype=str)
# as-run numbers repeat in the source (rerun pairs 24/85; numbering reset 89-91).
# Every physical row survives: duplicate keys get a letter suffix + flag.
asrun_seen = {}
for i, r in df26.iterrows():
    asrun = str(r["As Run Test #"]).strip()
    occ = asrun_seen.get(asrun, 0)
    asrun_seen[asrun] = occ + 1
    rid = f"BASS-{asrun}" if occ == 0 else f"BASS-{asrun}{chr(ord('a') + occ)}"
    mat = r.get("Fuel Sample Material")
    fam, fl = q5.family_of(mat)
    notest = ["NOT_A_TEST"] if fam == "housekeeping" else []
    if occ > 0:
        fl = fl + ["DUPLICATE_ASRUN_KEY"]
    run(rid, "BASS", asrun, date=str(r.get("Date", "")).strip(),
        gmt=str(r.get("GMT", "")).strip(), family=fam, geometry=GEOM.get(fam),
        scale="small", material=str(mat).strip() if mat is not None else "",
        sample=str(r.get("Sample #", "")).strip(),
        planned=str(r.get("Test #", "")).strip(),
        is_test=0 if notest else 1, src=p26.name, row=i + 2,
        flags="|".join(fl + notest))
    for flg in q5.date_gmt_check(r):
        ei(rid, "_row_flag", f"{r.get('Date','')}|{r.get('GMT','')}", None, None,
           MEAS, flags=flg + "|ROW", src=p26.name, row=i + 2)

# ----------------------------------------------------------------------------
# PSI-26 as-run matrix -> per-run setup/conditions/outcome text
# ----------------------------------------------------------------------------
p26m = PSI / "PSI-26/Science Documents/PSI-26_Science Documents_As Run_Test Matrix.xlsx"
wb = openpyxl.load_workbook(p26m, read_only=True, data_only=True)
ws = wb["as run matrix"]
rows = list(ws.iter_rows(min_row=4, values_only=True))
wb.close()
n_matrix_runs = 0
n_matrix_nonruns = 0
for j, r in enumerate(rows, start=4):
    asrun = r[2]
    if asrun is None or str(asrun).strip() in ("", "None"):
        # setup / dilution / non-test rows
        label = str(r[3] if r[3] is not None else r[5] if r[5] is not None else "").strip()
        if label:
            n_matrix_nonruns += 1
            run(f"BASS-MX-{j}", "BASS", f"matrix-row-{j}", material=label,
                is_test=0, src=p26m.name, row=j, flags="MATRIX_ROW|NOT_A_TEST")
        continue
    if not re.match(r"^\d+(\.0)?$", str(asrun).strip()):
        # non-numeric as-run cell = annotation/note row (STOW, SETUP, camera notes)
        n_matrix_nonruns += 1
        run(f"BASS-MX-{j}", "BASS", f"matrix-row-{j}",
            material=str(r[3] or r[5] or asrun).strip(),
            is_test=0, src=p26m.name, row=j, flags="MATRIX_ANNOTATION|NOT_A_TEST")
        continue
    asrun = str(asrun).strip().replace(".0", "")
    rid = f"BASS-{asrun}"
    exists = con.execute("SELECT COUNT(*) FROM runs WHERE run_id=?", (rid,)).fetchone()[0]
    if not exists:
        run(rid, "BASS", asrun, src=p26m.name, row=j, flags="MATRIX_ONLY_ROW")
    # variables from matrix (row indices per header recon)
    mvars = [
        (6, "igniter", None, MEAS, []),
        (7, "flow_restrictor", "setting", MEAS, []),
        (8, "sample_distance", None, MEAS, []),
        (9, "fan_display", "display", MEAS, ["DISPLAY_NOT_CALIBRATED"]),
        (10, "air_display", "display", MEAS, ["DISPLAY_NOT_CALIBRATED"]),
        (11, "radiometer_gain", "setting", MEAS, []),
        (12, "radiometer_display", None, MEAS, ["DISPLAY_NOT_CALIBRATED"]),
        (13, "gn2_pot", "setting", MEAS, []),
        (14, "gn2_display", None, MEAS, ["DISPLAY_NOT_CALIBRATED"]),
        (25, "total_frames_shot", "frames", MEAS, []),
        (26, "o2_pct_volume", "%", MEAS, ["CALIBRATED_GAS_ANALYSIS"]),
        (27, "pressure_atm", "atm", MEAS, []),
        (28, "co2_mmhg", "mmHg", MEAS, ["UNIT_SOURCE_MMHG"]),
        (29, "test_observations", None, INTERP, ["FREE_TEXT_OUTCOME"]),
    ]
    for idx, var, unit, cls, base in mvars:
        raw = r[idx] if idx < len(r) else None
        if raw is None or str(raw).strip() == "":
            continue
        if var.endswith("_display"):
            val, fl = q5.parse_cell(raw, "seq")
            norm = json.dumps(val) if isinstance(val, list) else val
        elif var == "test_observations":
            norm, fl = None, []
        elif cls == MEAS and unit:
            v2 = str(raw).strip().rstrip("%").strip()
            val, fl = parse_num(v2)
            norm = val
        else:
            val, fl = parse_num(raw)
            norm = val
        ei(rid, var, raw, norm, unit, cls, flags="|".join(base + list(fl)),
           src=p26m.name, row=j, sheet="as run matrix")

# ----------------------------------------------------------------------------
# PSI-26 planned matrix -> planned_test_points (planned != as-flown)
# ----------------------------------------------------------------------------
p26p = PSI / "PSI-26/Science Documents/PSI-26_Science Documents_Planned_Test Matrix.xlsx"
wb = openpyxl.load_workbook(p26p, read_only=True, data_only=True)
ws = wb["BASS Test Matrix"]
rows = list(ws.iter_rows(min_row=6, values_only=True))
wb.close()
n_ptp = 0
for j, r in enumerate(rows, start=6):
    sample = str(r[1]).strip() if r[1] is not None else ""
    tp = str(r[2]).strip() if r[2] is not None else ""
    if not sample and not tp:
        continue
    n_ptp += 1
    con.execute("INSERT INTO planned_test_points(study_id,sample_no,test_point,"
                "material_raw,ignition_type,extinguish_plan,source_file,source_row,flags)"
                "VALUES (?,?,?,?,?,?,?,?,?)",
                ("BASS", sample, tp,
                 str(r[3]).strip() if r[3] is not None else "",
                 str(r[4]).strip() if r[4] is not None else "",
                 str(r[6]).strip() if r[6] is not None else "",
                 p26p.name, j, "PLANNED_NOT_ASRUN"))

# ----------------------------------------------------------------------------
# PSI-98 (SAFFIRE-I) table -> runs + evidence
# ----------------------------------------------------------------------------
p98 = PSI / "PSI-98/Experimental table/PSI-98_Experimental table_SAFFIRE-1.csv"
df98 = pd.read_csv(p98, encoding="utf-8-sig", dtype=str)
for i, r in df98.iterrows():
    sn = str(r["Sample Number "]).strip()
    if sn.startswith("F"):  # flow-vis rows
        run(f"SAFFIRE1-{sn[:2]}", "SAFFIRE-I", sn[:2], material="flow visualization",
            direction=None, scale="large", is_test=0, src=p98.name, row=i + 2,
            flags="FLOW_VIS_NOT_COMBUSTION")
        continue
    rid = f"SAFFIRE1-{sn}"
    fam = "sibal_fabric"
    run(rid, "SAFFIRE-I", sn, family=fam, geometry="sheet",
        direction=str(r["Flow Direction "]).strip() or None, scale="large",
        material=str(r["Material"]).strip(), src=p98.name, row=i + 2)
    for col, var, unit, cls, flags in [
        ("Sample Thickness (cm)", "thickness", "cm", MEAS, "UNIT_CONFLICT|CM_VS_MM_STANDING_TRAP"),
        ("Sample Length (cm)", "length", "cm", MEAS, ""),
        ("Sample Width (cm)", "width", "cm", MEAS, ""),
        ("Air Flow (cm/s)", "air_flow", "cm/s", MEAS, "FLOW_SETTING_AS_PLANNED"),
        ("Percent O2", "o2_pct", "%", MEAS, "RANGE_VALUE"),
        ("Ignition Power (W)", "ignition_power", "W", MEAS, ""),
        ("Ignition Time (s)", "ignition_time", "s", MEAS, ""),
        ("Burn Time (s)", "burn_time", "s", MEAS, ""),
    ]:
        raw = r.get(col)
        s = str(raw).strip() if raw is not None else ""
        m = re.match(r"^~?\s*(\d+(?:\.\d+)?)\s*(-\s*\d+(?:\.\d+)?)?\s*(%|cm\/s|W|s|cm)?", s)
        if m and m.group(1):
            val = float(m.group(1))
            fl = flags.split("|") if flags else []
            if "~" in s:
                fl.append("APPROX_MARKER")
            if m.group(2):
                fl.append("RANGE_LOW_HIGH")
            if m.group(3):
                fl.append("UNIT_EMBEDDED")
            ei(rid, var, s, val, unit, cls, flags="|".join(fl), src=p98.name, row=i + 2)
        else:
            ei(rid, var, s, None, unit, cls, flags=(flags + "|NON_NUMERIC").strip("|"),
               src=p98.name, row=i + 2)

# ----------------------------------------------------------------------------
# PSI-99 (SAFFIRE-II) table -> runs + evidence (units embedded, published values)
# ----------------------------------------------------------------------------
p99 = PSI / "PSI-99/Experimental table/PSI-99_Experimental table_SAFFIRE-2.csv"
df99 = pd.read_csv(p99, encoding="utf-8-sig", dtype=str)
SAF2_FAM = {
    "2-1": "pdms_silicone", "2-2": "pdms_silicone", "2-3": "pdms_silicone",
    "2-4": "pdms_silicone", "2-5": "sibal_fabric", "2-6": "sibal_fabric",
    "2-7": "pmma_nomex", "2-8": "pmma_thick", "2-9": "pmma_thick",
}
for i, r in df99.iterrows():
    sn = str(r["Sample Number"]).strip()
    if sn.startswith("F"):
        run(f"SAFFIRE2-{sn[:2]}", "SAFFIRE-II", sn[:2], material="flow visualization",
            scale="large", is_test=0, src=p99.name, row=i + 2,
            flags="FLOW_VIS_NOT_COMBUSTION")
        continue
    if sn.startswith("Note"):
        continue
    rid = f"SAFFIRE2-S{sn.split('-')[1]}"
    fam = SAF2_FAM.get(sn, "")
    mat = str(r["Material"]).strip() if r["Material"] is not None else ""
    fam_flags = []
    if mat == "" or mat.lower() == "nan":
        mat = ""
        fam_flags.append("MATERIAL_MISSING_IN_SOURCE|FAMILY_FROM_REVIEW")
    run(rid, "SAFFIRE-II", sn, family=fam, geometry=GEOM.get(fam),
        direction=str(r["Flow Direction"]).strip() or None, scale="large",
        material=mat, src=p99.name, row=i + 2, flags="|".join(fam_flags))
    # dimensions / settings (units embedded in cells)
    for col, var, unit in [
        ("Samle Thickness ", "thickness", "mm"),
        ("Sample Length ", "length", "cm"),
        ("Sample Width (cm)", "width", "cm"),
        ("Air Flow (cm/s)", "air_flow", "cm/s"),
        ("Percent O2 (Note 1)", "o2_pct", "%"),
        ("Ignition Power (W)", "ignition_power", "W"),
        ("Ignition Time (s)", "ignition_time", "s"),
        ("Burn Time (s)", "burn_time", "s"),
    ]:
        raw = r.get(col)
        s = str(raw).strip() if raw is not None else ""
        if s.startswith("See"):
            ei(rid, var, s, None, unit, MEAS, flags="NON_NUMERIC|SEE_FIGURE",
               src=p99.name, row=i + 2)
            continue
        val, fl = parse_unit_value(s, unit)
        extra = []
        if s.startswith("~"):
            extra.append("APPROX_MARKER")
        ei(rid, var, s, val, unit, MEAS, flags="|".join(fl + extra),
           src=p99.name, row=i + 2)
    # published outcomes, source-faithful: the CSV has NO '?-g Spread Rate'
    # column; rate values (2.1/2.6 mm/s) arrive in '?-g Spread Length', and
    # '1-g Spread Rate' carries descriptors (Acceleratory) for some samples.
    # Both defects get cell-level flags + one INTERPRETED interpretation item.
    for col, var, unit, cls, fl in [
        ("?-g Burn Length", "ug_burn_length", "cm", DERIV,
         "PUBLISHED_VALUE|NASA_DERIVED|MOJIBAKE_MU"),
        ("?-g Spread Length", "ug_spread_length", "cm", DERIV,
         "PUBLISHED_VALUE|NASA_DERIVED|MOJIBAKE_MU"),
        ("1-g Burn Length", "g1_burn_length", "cm", MEAS,
         "PUBLISHED_VALUE|GROUND_TEST_1G"),
        ("1-g Spread Rate", "g1_spread_rate", "mm/s", MEAS,
         "PUBLISHED_VALUE|GROUND_TEST_1G"),
    ]:
        raw = r.get(col)
        if raw is None:
            continue
        s = str(raw).strip()
        val, fl2 = parse_unit_value(s, unit)
        if val is not None and "mm/s" in s and var.endswith("_length"):
            fl2 = fl2 + ["VALUE_HAS_RATE_UNIT_IN_LENGTH_COLUMN|SOURCE_SCHEMA_DEFECT"]
        if val is None and s and s.lower() not in ("n/a", "na", "", "none", "nan") and not s.startswith("~"):
            fl2 = [f for f in fl2 if f != "NON_NUMERIC"] + ["DESCRIPTOR_VALUE|NON_NUMERIC"]
        ei(rid, var, s, val, unit, cls,
           flags="|".join(fl.split("|") + list(fl2)), src=p99.name, row=i + 2)
        if "VALUE_HAS_RATE_UNIT" in "|".join(fl2):
            ei(rid, "ug_spread_rate_published", s, val, "mm/s", INTERP,
               flags="INTERPRETED_FROM_MISLABELED_CELL|PUBLISHED_VALUE",
               src=p99.name, row=i + 2, method="value carries a rate unit inside the "
               "'?-g Spread Length' column; read as the published ug spread rate")
    for cc in ("Camera 1", "Camera 2"):
        cv = r.get(cc)
        if cv is not None and str(cv).strip() not in ("", "n/a", "nan"):
            ei(rid, "camera_assigned", str(cv).strip(), str(cv).strip(), None, MEAS,
               flags="CAMERA_ID|SCHEMA_TYPO_SEEN(S56C2)" if "56" in str(cv) else "CAMERA_ID",
               src=p99.name, row=i + 2)

# ----------------------------------------------------------------------------
# families table
# ----------------------------------------------------------------------------
fam_geo = con.execute("SELECT family, COUNT(*) FROM runs WHERE family IS NOT NULL GROUP BY family").fetchall()

# ----------------------------------------------------------------------------
# sensor series (from R1 unified outputs; copy into store)
# ----------------------------------------------------------------------------
SERIES.mkdir(parents=True, exist_ok=True)
series_src = {
    "P99-S1": "SAFFIRE2-S1", "P99-S2": "SAFFIRE2-S2", "P99-S3": "SAFFIRE2-S3",
    "P99-S4": "SAFFIRE2-S4", "P99-S5": "SAFFIRE2-S5", "P99-S6": "SAFFIRE2-S6",
    "P99-S7": "SAFFIRE2-S7", "P99-S8": "SAFFIRE2-S8", "P99-S9": "SAFFIRE2-S9",
    "P98-S2": "SAFFIRE1-S2",
}
for f in sorted(R1OUT.glob("q1_*.csv.gz")):
    sid = f.name[3:-7]
    study = "SAFFIRE-I" if sid.startswith("P98") else "SAFFIRE-II"
    dst = SERIES / f.name
    if not dst.exists():
        shutil.copy(f, dst)
    df = pd.read_csv(f)
    ep_col = "Epoch Time" if "Epoch Time" in df.columns else "SaffireTimestamp"
    el_col = "Elapsed Time (s)" if "Elapsed Time (s)" in df.columns else "Relative Time (s)"
    ep = pd.to_numeric(df[ep_col], errors="coerce")
    el = pd.to_numeric(df[el_col], errors="coerce")
    epv = ep.dropna()
    dt = np.diff(epv.to_numpy())
    rid = series_src.get(sid)
    flags = "EPOCH_39PCT_MISSING|RECONSTRUCTABLE_FROM_ELAPSED" if sid == "P98-S2" else ""
    con.execute("INSERT OR REPLACE INTO sensor_series VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (sid, rid, study, int(epv.iloc[0]), int(epv.iloc[-1]),
                 float(el.dropna().iloc[-1] - el.dropna().iloc[0]),
                 round(1000 / np.median(dt), 2), len(df), len(df.columns),
                 int((dt > 3 * np.median(dt)).sum()), f"series/{f.name}",
                 f.parent.name + "/" + f.name, flags))

# ----------------------------------------------------------------------------
# image catalog from MergeResult workbooks (NASA's own frame inventories)
# ----------------------------------------------------------------------------
def merge_frames(path, sheet, name_col="Jpeg File Name"):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    ws = wb[sheet]
    hdr_i, name_i = None, None
    eps = []
    for ri, row in enumerate(ws.iter_rows(min_row=1, max_row=6, values_only=True), start=1):
        for ci, v in enumerate(row):
            if v is not None and name_col in str(v):
                hdr_i, name_i = ri, ci
                break
        if name_i is not None:
            break
    if name_i is None:
        wb.close()
        return None
    for row in ws.iter_rows(min_row=hdr_i + 1, values_only=True):
        v = row[name_i] if name_i < len(row) else None
        if v is None:
            continue
        m = re.search(r"(\d{13})\.jpe?g", str(v))
        if m:
            eps.append(int(m.group(1)))
    wb.close()
    return eps


P99_MERGE = PSI / "PSI-99/Science Documents/PSI-99_Science Documents_SAFFIRE-II_MergeResult-jpeg_v5_Final.xlsx"
P98_MERGE = PSI / "PSI-98/Science Documents/PSI-98_Science Documents_SAFFIRE-1_MergeResult-jpeg_Update_Final_v2.xlsx"

for path, study, sheets in [
    (P99_MERGE, "SAFFIRE-II", {f"Sample{n} - jpeg": f"S{n}" for n in range(1, 10)} |
     {"PreFlowVis - jpeg": "F1", "PostFlowVis - jpeg": "F2", "BIT - jpeg": "BIT"}),
    (P98_MERGE, "SAFFIRE-I", {"Sample1 - jpeg": "S1", "Sample2 - jpeg": "S2",
     "PreFlowVis - jpeg": "F1", "PostFlowVis - jpeg": "F2", "BIT - jpeg": "BIT"}),
]:
    for sheet, tag in sheets.items():
        eps = merge_frames(path, sheet)
        if not eps:
            print(f"  !! no frames parsed: {path.name} '{sheet}'")
            continue
        eps = sorted(eps)
        cam = re.search(r"S\d+C\d|F\dC\d|BIT", sheet) or None
        # camera from frame names instead
        # (frame names carry the camera, e.g. S5C1-<ms>.jpeg)
        set_id = f"{study}-{tag}"
        rid = set_id if tag.startswith("S") else (set_id if tag in ("F1", "F2") else None)
        n_local = len(glob.glob(str(PSI / ("PSI-99" if study == "SAFFIRE-II" else "PSI-98")
                                   / "Raw Data" / f"*{tag.replace('S','S',1)}C*.zip")))
        con.execute("INSERT OR REPLACE INTO image_sets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    (set_id, rid if tag.startswith(("S", "F")) else None, study,
                     None, "burn" if tag.startswith("S") else
                     ("flow_vis" if tag in ("F1", "F2") else "pretest"),
                     "mapped_available_locally",
                     len(eps), eps[0], eps[-1], float(np.median(np.diff(eps))),
                     n_local, None, path.name, sheet, "MERGE_RESULT_INVENTORY"))

# fill camera per image set from frame-name prefixes via one extra pass
for set_id, study, tag in con.execute("SELECT set_id, study_id, kind FROM image_sets").fetchall():
    pass  # camera left per MergeResult sheet tag (single camera per sample listing)

# ----------------------------------------------------------------------------
# families table
# ----------------------------------------------------------------------------
fam_notes = {
    ("thin_pmma_film", "BASS-II"): "radiative/kinetic spread regimes; low-flow radiative extinction (Bhattacharjee 2016)",
    ("pmma_rod", "BASS-II"): "quench vs blowoff; Damkohler interpretation (Olson & Ferkul 2017)",
    ("sibal_fabric", "BASS-II"): "concurrent growth, low-flow quench (Zhao 2017)",
    ("sibal_fabric", "BASS"): "non-monotonic opposed flow (Ferkul 2012/2013)",
    ("pmma_sphere", "BASS"): "thermal-history thick fuel (Endo 2020)",
    ("pdms_silicone", "SAFFIRE-II"): "ignited, no sustained propagation; ash role (Niehaus 2015, Rojas-Alva 2022)",
    ("sibal_fabric", "SAFFIRE-II"): "scale-bridging spread S5/S6 (Li 2019, Thomsen 2019)",
    ("pmma_thick", "SAFFIRE-II"): "anchored regression 0.01-0.04 mm/s (Olson & Jomaas 2019)",
    ("pmma_nomex", "SAFFIRE-II"): "PMMA consumed, Nomex not ignited (Thomsen 2019)",
}
for fam, n in fam_geo:
    study = con.execute("SELECT study_id FROM runs WHERE family=? LIMIT 1", (fam,)).fetchone()[0]
    n_runs = con.execute("SELECT COUNT(*) FROM runs WHERE family=? AND is_test=1", (fam,)).fetchone()[0]
    con.execute("INSERT OR REPLACE INTO families VALUES (?,?,?,?,?,?)",
                (fam, study, GEOM.get(fam), fam.split("_")[0], n_runs,
                 fam_notes.get((fam, study), "")))

# ----------------------------------------------------------------------------
# EXIT CHECKS
# ----------------------------------------------------------------------------
lines = []
def chk(msg, ok):
    lines.append(("PASS" if ok else "FAIL") + "  " + msg)

# 1. row-count reconciliation
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS-II' AND is_test=1").fetchone()[0]
chk(f"BASS-II runs = {n} (review audited 129)", n == 129)
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND is_test=1 "
                "AND flags NOT LIKE '%MATRIX_ONLY%'").fetchone()[0]
chk(f"BASS test runs from table = {n} (table 122 rows, 1 housekeeping -> 121 combustion)",
    n == 121)
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND is_test=1 "
                "AND flags LIKE '%MATRIX_ONLY%'").fetchone()[0]
chk(f"BASS matrix-only TEST rows = {n} (0: extras are annotations, is_test=0)", n == 0)
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='SAFFIRE-I' AND is_test=1").fetchone()[0]
chk(f"SAFFIRE-I combustion runs = {n} (review: 2)", n == 2)
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='SAFFIRE-II' AND is_test=1").fetchone()[0]
chk(f"SAFFIRE-II combustion runs = {n} (review: 9)", n == 9)
n_asrun_matrix = con.execute(
    "SELECT COUNT(DISTINCT run_id) FROM evidence_items WHERE source_file LIKE 'PSI-26%As Run%' "
    "AND run_id LIKE 'BASS-%' AND run_id NOT LIKE '%MX%'").fetchone()[0]
chk(f"BASS runs with as-run-matrix conditions = {n_asrun_matrix}", n_asrun_matrix >= 100)
chk(f"planned test points ingested = {n_ptp} (planned layer live)", n_ptp > 50)

# 2. provenance completeness
n = con.execute("SELECT COUNT(*) FROM evidence_items WHERE source_file IS NULL "
                "OR source_file='' OR source_row IS NULL").fetchone()[0]
chk(f"evidence items missing provenance = {n} (must be 0)", n == 0)
n = con.execute("SELECT COUNT(*) FROM runs WHERE source_file IS NULL OR source_file=''").fetchone()[0]
chk(f"runs missing provenance = {n} (must be 0)", n == 0)

# 3. no-silent-conversion spot checks (fixed probes)
probes = [
    ("SAFFIRE2-S5", "ug_spread_length", "2.1 mm/s", "2.1",
     ["UNIT_EMBEDDED", "VALUE_HAS_RATE_UNIT_IN_LENGTH_COLUMN", "PUBLISHED_VALUE"]),
    ("SAFFIRE2-S5", "ug_spread_rate_published", "2.1 mm/s", "2.1",
     ["INTERPRETED_FROM_MISLABELED_CELL"]),
    ("SAFFIRE2-S5", "thickness", "037 mm", None, ["AMBIGUOUS_NUMERIC"]),
    ("SAFFIRE1-S1", "thickness", "0.37", "0.37", ["UNIT_CONFLICT"]),
    ("SAFFIRE2-S1", "ug_spread_length", "nan", None, ["MISSING"]),
    ("SAFFIRE2-S4", "g1_spread_rate", "0.6 mm/s", "0.6", ["GROUND_TEST_1G"]),
    ("SAFFIRE2-S5", "g1_spread_rate", "Acceleratory", None, ["DESCRIPTOR_VALUE"]),
]
for rid, var, want_raw, want_norm, want_flags in probes:
    row = con.execute("SELECT value_raw, value_norm, flags FROM evidence_items "
                      "WHERE run_id=? AND variable=?", (rid, var)).fetchone()
    if row is None:
        chk(f"probe {rid}.{var} exists", False)
        continue
    raw, norm, flags = row
    ok = (want_raw in raw) and ((norm == want_norm) if want_norm is not None else (norm is None))
    for f in want_flags:
        ok = ok and f in flags
    chk(f"probe {rid}.{var}: raw='{raw}' norm={norm} flags={flags}", ok)

# 4. display fields never treated as calibrated
n = con.execute("SELECT COUNT(*) FROM evidence_items WHERE variable LIKE '%_display' "
                "AND flags NOT LIKE '%DISPLAY_NOT_CALIBRATED%'").fetchone()[0]
chk(f"display fields missing DISPLAY_NOT_CALIBRATED = {n} (must be 0)", n == 0)

# 5. series + images live
n = con.execute("SELECT COUNT(*) FROM sensor_series").fetchone()[0]
chk(f"sensor series ingested = {n} (11 expected)", n == 11)
n = con.execute("SELECT COUNT(*) FROM image_sets").fetchone()[0]
chk(f"image sets cataloged = {n}", n >= 12)

report = "\n".join(lines)
print(report)
(EXPORTS).mkdir(parents=True, exist_ok=True)
(EXPORTS / "r2_exit_checks.txt").write_text(report + "\n")
fails = sum(1 for l in lines if l.startswith("FAIL"))
print(f"\n{len(lines) - fails}/{len(lines)} checks passed; matrix non-test rows={n_matrix_nonruns}")

# ----------------------------------------------------------------------------
# data contract JSON export
# ----------------------------------------------------------------------------
runs_out = []
for r in con.execute("SELECT run_id,study_id,run_key,pi,date,family,geometry,direction,"
                     "scale_class,material_raw,sample_id,planned_test_no,is_test,flags FROM runs"):
    rid = r[0]
    ev = con.execute("SELECT variable,value_norm,unit,evidence_class,flags FROM "
                     "evidence_items WHERE run_id=? AND variable!='_row_flag'", (rid,)).fetchall()
    sers = con.execute("SELECT series_id,hz,n_rows,file FROM sensor_series WHERE run_id=?",
                       (rid,)).fetchall()
    imgs = con.execute("SELECT set_id,n_frames,t0_epoch_ms,t_end_epoch_ms,source_sheet "
                       "FROM image_sets WHERE run_id=?", (rid,)).fetchall()
    runs_out.append({
        "run_id": rid, "study": r[1], "run_key": r[2], "pi": r[3], "date": r[4],
        "family": r[5], "geometry": r[6], "direction": r[7], "scale": r[8],
        "material": r[9], "sample_id": r[10], "planned_test_no": r[11],
        "is_test": bool(r[12]), "flags": r[13].split("|") if r[13] else [],
        "evidence": [{"variable": e[0], "value": e[1], "unit": e[2],
                      "class": e[3], "flags": e[4].split("|") if e[4] else []} for e in ev],
        "series": [{"series_id": s[0], "hz": s[1], "rows": s[2], "file": s[3]} for s in sers],
        "image_sets": [{"set_id": i[0], "frames": i[1], "t0_ms": i[2], "t_end_ms": i[3]} for i in imgs],
    })

census = {}
for (sid,) in con.execute("SELECT study_id FROM studies").fetchall():
    nfam = con.execute("SELECT COUNT(DISTINCT family) FROM runs WHERE study_id=? AND is_test=1", (sid,)).fetchone()[0]
    nev = con.execute("SELECT COUNT(*) FROM evidence_items e JOIN runs r ON e.run_id=r.run_id "
                      "WHERE r.study_id=? AND e.variable!='_row_flag'", (sid,)).fetchone()[0]
    nser = con.execute("SELECT COUNT(*) FROM sensor_series WHERE study_id=?", (sid,)).fetchone()[0]
    nimg = con.execute("SELECT COUNT(*) FROM image_sets WHERE study_id=? AND kind='burn'", (sid,)).fetchone()[0]
    census[sid] = {"combustion_runs": con.execute(
        "SELECT COUNT(*) FROM runs WHERE study_id=? AND is_test=1", (sid,)).fetchone()[0],
        "families": nfam, "evidence_items": nev, "sensor_series": nser, "image_burn_sets": nimg}

contract = {
    "schema_version": "0.1-draft",
    "generated": "2026-10-02",
    "store": "Gravifier_research/evidence_store/gravifire_l1.db",
    "tables": ["studies", "runs", "evidence_items", "sensor_series", "image_sets",
               "planned_test_points", "families"],
    "evidence_classes": ["MEASURED", "DERIVED", "MODELED", "INTERPRETED", "OPEN"],
    "standing_rules": [
        "display flow fields are never calibrated velocity (DISPLAY_NOT_CALIBRATED)",
        "planned != as-flown; both live (planned_test_points vs runs/evidence)",
        "every value keeps value_raw + source_file + source_row",
        "SAFFIRE-I S1 sensor data is dead upstream; evidence class imagery/literature only",
        "BOUND != exact MOC; single SAFFIRE-II condition is never a flight MOC",
    ],
    "census": census,
    "runs": runs_out,
}
(EXPORTS / "data_contract.json").write_text(json.dumps(contract, indent=1))
n_ei = con.execute("SELECT COUNT(*) FROM evidence_items").fetchone()[0]
print(f"store: {DB}  runs={len(runs_out)}  evidence_items={n_ei}  "
      f"series={con.execute('SELECT COUNT(*) FROM sensor_series').fetchone()[0]}  "
      f"image_sets={con.execute('SELECT COUNT(*) FROM image_sets').fetchone()[0]}")
con.commit()
con.close()
print(f"contract: {EXPORTS/'data_contract.json'}")
