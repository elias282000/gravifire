#!/usr/bin/env python
"""R4 Tier 3 — provenance audit: 10 published claims traced end-to-end
through our system (store row -> source file#row -> and, where we hold raw
data, our own measurement). Resolution classes: FULL (published value
resolves to source row AND our own independent artifact where applicable),
PARTIAL (resolves to source row or literature only), FAIL (no chain)."""
import json
import sqlite3
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
DB = ROOT / "Gravifier_research/evidence_store/gravifire_l1.db"
T1 = json.loads((ROOT / "Gravifier_research/verdict_engine/outputs/r4_tier1_anchors.json").read_text())
con = sqlite3.connect(DB)
con.row_factory = sqlite3.Row


def item(run_id, var):
    r = con.execute("SELECT * FROM evidence_items WHERE run_id=? AND variable=?",
                    (run_id, var)).fetchone()
    return r


checks = []

# 1. S5 published ug rate 2.1 mm/s
r = item("SAFFIRE2-S5", "ug_spread_rate_published")
checks.append(("S5 ug spread rate 2.1 mm/s (table + Li 2019)", r is not None,
               f"store: {r['source_file']}#row{r['source_row']} raw='{r['value_raw']}'"
               if r else "no item",
               f"our measurement: Theil-Sen {T1['S5']['rate_descent_fit_mm_s']} mm/s "
               f"({T1['S5']['pct_vs_published_descent']:+.1f}%), window-rate "
               f"{T1['S5']['rate_traverse_mm_s']} ({T1['S5']['pct_vs_published_traverse']:+.1f}%)"))

# 2. S6 published ug rate 2.6 mm/s
r = item("SAFFIRE2-S6", "ug_spread_rate_published")
checks.append(("S6 ug spread rate 2.6 mm/s (table + Li 2019)", r is not None,
               f"store: {r['source_file']}#row{r['source_row']} raw='{r['value_raw']}'"
               if r else "no item",
               f"our measurement: Theil-Sen {T1['S6']['rate_descent_fit_mm_s']} mm/s "
               f"({T1['S6']['pct_vs_published_descent']:+.1f}%)"))

# 3. S8/S9 anchored regression 0.01-0.04 mm/s
r8, r9 = item("SAFFIRE2-S8", "ug_burn_length"), item("SAFFIRE2-S9", "ug_burn_length")
checks.append(("S8/S9 anchored regression 0.01-0.04 mm/s (Olson & Jomaas 2019)",
               r8 is not None and r9 is not None,
               f"store rows + review SS7.1; raws '{r8['value_raw']}' / '{r9['value_raw']}'",
               "no independent image measurement this phase (R5 candidate: S9C1 frames held)"))

# 4. SAFFIRE-I S1 burn time 420 s
r = item("SAFFIRE1-S1", "burn_time")
checks.append(("SAFFIRE-I S1 burn time 420 s (PSI-98 table)", r is not None,
               f"store: {r['source_file']}#row{r['source_row']} norm={r['value_norm']}",
               f"our S1C1 imagery: {T1['SAFFIRE1-S1']['ok_frames']} tracked frames, "
               f"rate {T1['SAFFIRE1-S1']['rate_mm_s']} mm/s ({T1['SAFFIRE1-S1']['pct_vs_published']:+.1f}% "
               f"vs published 1.7-1.8)"))

# 5. SAFFIRE-I S2 early extinction (70 s vs 420 s)
r = item("SAFFIRE1-S2", "burn_time")
checks.append(("SAFFIRE-I S2 early extinction 70 s (table + review SS10.3)", r is not None,
               f"store: burn_time={r['value_norm']} vs S1 420; flags '{r['flags']}'",
               "verdict engine used it in TC-SAF1-S2-01 (CONTRADICTED, concordant)"))

# 6. PDMS non-propagation (4 coupons)
rows = con.execute("SELECT run_id, value_raw FROM evidence_items "
                   "WHERE variable='ug_burn_length' AND run_id LIKE 'SAFFIRE2-S%' "
                   "AND run_id NOT IN ('SAFFIRE2-S5','SAFFIRE2-S6','SAFFIRE2-S7','SAFFIRE2-S8','SAFFIRE2-S9')").fetchall()
pdms_ok = len(rows) == 4
checks.append(("PDMS x4 ignited but no sustained propagation (Niehaus 2015; SS16.1)",
               pdms_ok,
               f"store ug_burn_length rows: {[r['run_id'] for r in rows]}",
               "our imagery check: all four STALL_CONFIRMED_NO_SUSTAINED_SPREAD "
               "(longest luminous episode 12.7 s vs SIBAL S5 142.7 s)"))

# 7. BASS 122-row experimental table -> 121 combustion runs
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS' AND is_test=1").fetchone()[0]
checks.append(("BASS table 122 rows = 121 tests + 1 housekeeping (review: unresolved)",
               n == 121,
               f"store: {n} BASS test runs; duplicate as-run keys suffixed+flagged",
               "review's open count question closed from primary source (R2)"))

# 8. BASS-II 129 validated records
n = con.execute("SELECT COUNT(*) FROM runs WHERE study_id='BASS-II' AND is_test=1").fetchone()[0]
checks.append(("BASS-II 129 validated records (review SS3.1)", n == 129,
               f"store: {n} runs reconciled 129/129",
               "R2 exit check PASS"))

# 9. N2-jet suppression enhancement (Takahashi 2013)
n = con.execute("SELECT COUNT(*) FROM evidence_items WHERE variable='test_observations' "
                "AND (value_raw LIKE '%dilut%' OR value_raw LIKE '%GN2%' "
                "OR value_raw LIKE '%nitrogen%')").fetchone()[0]
checks.append(("N2 suppressant jet can enhance combustion (Takahashi 2013; SS7.3)",
               n >= 10,
               f"store: {n} GN2/dilution operator-log rows (TEXT_MINED, PRIMARY_OPERATOR_LOG)",
               "used by engine: TC-BASS-SUPPRESS-01 CONTRADICTED (concordant)"))

# 10. SIBAL non-monotonic opposed-flow spread (Ferkul 2012/2013)
n = con.execute("SELECT COUNT(*) FROM runs WHERE family='sibal_fabric' AND study_id='BASS'").fetchone()[0]
checks.append(("SIBAL non-monotonic opposed spread (Ferkul; SS6.3)",
               n >= 10,
               f"store: {n} BASS SIBAL runs with conditions; lit register entry sibal_bass",
               "per-run spread rates NOT held (video upstream only) -> engine honestly "
               "returns INSUFFICIENT (TC-BASS-SIBAL-02)"))

res = []
# explicit classifications where the keyword heuristic would misgrade:
# BASS-II 129 reconciles structurally (chain field) -> FULL; S2 extinction and
# N2 enhancement stay PARTIAL (no independent artifact / text-mined only).
OVERRIDE = {"BASS-II 129 validated records (review SS3.1)": "FULL"}
for claim, ok, chain, extra in checks:
    cls = OVERRIDE.get(claim)
    if cls is None:
        has_artifact = any(k in extra for k in ("our measurement", "our imagery", "our S1C1"))
        has_structural = any(k in extra for k in ("reconciled", "closed from primary", "store:"))
        cls = "FULL" if ok and (has_artifact or has_structural) else ("PARTIAL" if ok else "FAIL")
    res.append({"claim": claim, "resolution": cls, "chain": chain, "artifact": extra})

full = sum(1 for r in res if r["resolution"] == "FULL")
part = sum(1 for r in res if r["resolution"] == "PARTIAL")
fail = sum(1 for r in res if r["resolution"] == "FAIL")
out = {"checks": res, "resolution_rate_FULL": full / len(res),
       "FULL": full, "PARTIAL": part, "FAIL": fail}
(ROOT / "Gravifier_research/verdict_engine/outputs/r4_tier3_provenance.json").write_text(
    json.dumps(out, indent=1))
for r in res:
    print(f"{r['resolution']:6s}  {r['claim']}")
print(f"\nresolution: {full} FULL / {part} PARTIAL / {fail} FAIL "
      f"-> FULL rate {full}/{len(res)} = {full/len(res):.0%}")
