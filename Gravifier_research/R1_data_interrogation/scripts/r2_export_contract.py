#!/usr/bin/env python
"""R2: (re)export data_contract.json from the finished store (runs anchors-
aware; run after r2_build_store.py + r2_extract_anchors.py)."""
import json
import sqlite3
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
DB = ROOT / "Gravifier_research/evidence_store/gravifire_l1.db"
EXPORTS = ROOT / "Gravifier_research/evidence_store/exports"

con = sqlite3.connect(DB)
runs_out = []
for r in con.execute(
        "SELECT run_id,study_id,run_key,pi,date,family,geometry,direction,"
        "scale_class,material_raw,sample_id,planned_test_no,is_test,flags FROM runs"):
    rid = r[0]
    ev = con.execute("SELECT variable,value_norm,unit,evidence_class,flags FROM "
                     "evidence_items WHERE run_id=? AND variable!='_row_flag'", (rid,)).fetchall()
    sers = con.execute("SELECT series_id,hz,n_rows,file FROM sensor_series WHERE run_id=?",
                       (rid,)).fetchall()
    imgs = con.execute("SELECT set_id,n_frames,t0_epoch_ms,t_end_epoch_ms,extracted_path "
                       "FROM image_sets WHERE run_id=?", (rid,)).fetchall()
    runs_out.append({
        "run_id": rid, "study": r[1], "run_key": r[2], "pi": r[3], "date": r[4],
        "family": r[5], "geometry": r[6], "direction": r[7], "scale": r[8],
        "material": r[9], "sample_id": r[10], "planned_test_no": r[11],
        "is_test": bool(r[12]), "flags": r[13].split("|") if r[13] else [],
        "evidence": [{"variable": e[0], "value": e[1], "unit": e[2], "class": e[3],
                      "flags": e[4].split("|") if e[4] else []} for e in ev],
        "series": [{"series_id": s[0], "hz": s[1], "rows": s[2], "file": s[3]} for s in sers],
        "image_sets": [{"set_id": i[0], "frames": i[1], "t0_ms": i[2], "t_end_ms": i[3],
                        "extracted": bool(i[4])} for i in imgs],
    })

census = {}
for (sid,) in con.execute("SELECT study_id FROM studies"):
    census[sid] = {
        "combustion_runs": con.execute(
            "SELECT COUNT(*) FROM runs WHERE study_id=? AND is_test=1", (sid,)).fetchone()[0],
        "families": con.execute(
            "SELECT COUNT(DISTINCT family) FROM runs WHERE study_id=? AND is_test=1", (sid,)).fetchone()[0],
        "evidence_items": con.execute(
            "SELECT COUNT(*) FROM evidence_items e JOIN runs r ON e.run_id=r.run_id "
            "WHERE r.study_id=? AND e.variable!='_row_flag'", (sid,)).fetchone()[0],
        "sensor_series": con.execute(
            "SELECT COUNT(*) FROM sensor_series WHERE study_id=?", (sid,)).fetchone()[0],
        "image_frames_inventoried": con.execute(
            "SELECT COALESCE(SUM(n_frames),0) FROM image_sets WHERE study_id=? AND kind='burn'",
            (sid,)).fetchone()[0],
    }
n_anchor_frames = con.execute(
    "SELECT COALESCE(SUM(n_frames),0) FROM image_sets WHERE extracted_path IS NOT NULL").fetchone()[0]

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
        "SAFFIRE-II table source defect: published ug rates sit in the 'Spread Length' column (flagged + INTERPRETED item)",
    ],
    "census": census,
    "anchor_frames_extracted": n_anchor_frames,
    "runs": runs_out,
}
EXPORTS.mkdir(parents=True, exist_ok=True)
(EXPORTS / "data_contract.json").write_text(json.dumps(contract, indent=1))
print(f"contract re-exported: {EXPORTS/'data_contract.json'} "
      f"({len(runs_out)} runs, {n_anchor_frames} anchor frames)")
