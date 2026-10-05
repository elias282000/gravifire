#!/usr/bin/env python
"""R5 exit checks: (1) every demonstrable-claim chain cites an artifact that
exists; (2) every number quoted in the digest's demonstrable claims matches
the artifact it cites."""
import json
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
VE = ROOT / "Gravifier_research/verdict_engine"
fails = []


def chk(msg, ok):
    print(("PASS" if ok else "FAIL") + "  " + msg)
    if not ok:
        fails.append(msg)


# artifacts cited by D1-D11 exist
artifacts = [
    VE / "outputs/r4_tier1_anchors.json",
    VE / "outputs/r4_tier3_provenance.json",
    VE / "outputs/r4_tier2_holdout.json",
    VE / "outputs/r4_holdout_stamp.json",
    VE / "outputs/seed_verdicts.json",
    ROOT / "Gravifier_research/evidence_store/R2_CENSUS.md",
    ROOT / "Gravifier_research/evidence_store/exports/r2_exit_checks.txt",
    ROOT / "Gravifier_research/R1_data_interrogation/R1_FINDINGS.md",
    ROOT / "Gravifier_research/R5_DIGEST_DATA.json",
]
for a in artifacts:
    chk(f"artifact exists: {a.name}", a.exists())

# numbers match artifacts
t1 = json.loads((VE / "outputs/r4_tier1_anchors.json").read_text())
chk("D1 S5 Theil-Sen 2.18 (+4.0%)", t1["S5"]["rate_descent_fit_mm_s"] == 2.18
    and t1["S5"]["pct_vs_published_descent"] == 4.0)
chk("D2 S6 Theil-Sen 2.64 (+1.6%)", t1["S6"]["rate_descent_fit_mm_s"] == 2.64
    and t1["S6"]["pct_vs_published_descent"] == 1.6)
t3 = json.loads((VE / "outputs/r4_tier3_provenance.json").read_text())
chk("D3 provenance 6 FULL / 0 FAIL", t3["FULL"] == 6 and t3["FAIL"] == 0)
t2 = json.loads((VE / "outputs/r4_tier2_holdout.json").read_text())
chk("D6 false-SUPPORTED 0", t2["false_SUPPORTED_rate"] == 0.0)
pdms = [p for p in t1["PDMS"]]
chk("D4 PDMS stall x4", len(pdms) == 4 and
    all(p["verdict"].startswith("STALL_CONFIRMED") for p in pdms))
sv = json.loads((VE / "outputs/seed_verdicts.json").read_text())
byid = {v["tc_id"]: v for v in sv["verdicts"]}
chk("D5 refusal claims INSUFFICIENT+refusal",
    all(byid[t]["verdict"] == "INSUFFICIENT" and byid[t].get("refusal")
        for t in ("TC-PDMS-03", "TC-EXPLORATION-O2-01")))
chk("D7 Nomex CONTRADICTED", byid["TC-NOMEX-01"]["verdict"] == "CONTRADICTED")
chk("D11 BASS-II claims INSUFFICIENT",
    byid["TC-BASS2-FILM-01"]["verdict"] == "INSUFFICIENT"
    and byid["TC-BASS2-ROD-01"]["verdict"] == "INSUFFICIENT")
dd = json.loads((ROOT / "Gravifier_research/R5_DIGEST_DATA.json").read_text())
chk("D10 verdict mix 4/5/9 + grid 70 cells",
    dd["verdict_mix"] == {"SUPPORTED": 4, "CONTRADICTED": 5, "INSUFFICIENT": 9,
                          "refusals": 4} and dd["n_tested_cells"] == 70)
# D8 GN2 count
import sqlite3
con = sqlite3.connect(ROOT / "Gravifier_research/evidence_store/gravifire_l1.db")
n = con.execute("SELECT COUNT(*) FROM evidence_items WHERE variable='test_observations' "
                "AND (value_raw LIKE '%dilut%' OR value_raw LIKE '%GN2%' "
                "OR value_raw LIKE '%nitrogen%')").fetchone()[0]
chk(f"D8 GN2/dilution rows = 13 (cited)", n == 13)

# digest table rows: every row in section 2/4 references an artifact or store id
digest = (ROOT / "Gravifier_research/R5_FINDINGS_DIGEST.md").read_text()
for token in ("r4_tier1_anchors.json", "r4_tier3_provenance.json", "r4_tier2_holdout.json",
              "r4_holdout_stamp.json", "R2_CENSUS.md", "R5_DIGEST_DATA.json",
              "seed_verdicts.json"):
    chk(f"digest cites {token}", token in digest)

print(f"\n{len(fails)} FAILURES" if fails else "\nALL R5 EXIT CHECKS PASS")
