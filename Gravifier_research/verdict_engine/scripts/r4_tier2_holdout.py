#!/usr/bin/env python
"""R4 Tier 2 — blind SAFFIRE-II hold-out.

Protocol:
1. VERSION-STAMP FIRST: sha256 of engine, spec, seed claims, literature
   register, and the store, plus git HEAD - written before any blind run.
2. BLIND: copy the store; mask SAFFIRE-II mug-outcome evidence (both raw and
   normalized) on the copy; engine blind mode also drops SAFFIRE-II-derived
   literature entries. Only BASS + BASS-II + SAFFIRE-I evidence is visible.
3. PREDICT: run the 5 SAFFIRE-II-family seed claims through the blind engine.
4. REVEAL: compare against the R3 full-evidence verdicts (the truth set).
5. METRICS: agreement on cross-study claims; correct-refusal rate on
   SAFFIRE-II-only families; false-SUPPORTED count (must be 0).
"""
import hashlib
import json
import shutil
import sqlite3
import subprocess
import sys
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
VE = ROOT / "Gravifier_research/verdict_engine"
OUT = VE / "outputs"
BLIND_DB = OUT / "blind_store.db"

MASK_VARS = ("ug_burn_length", "ug_spread_length", "ug_spread_rate_published")

# ---- 1. version stamp (before any blind evaluation)
def sha256(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()[:16]

stamp = {
    "stamped_before_reveal": True,
    "engine.py": sha256(VE / "engine.py"),
    "verdict_spec.md": sha256(VE / "verdict_spec.md"),
    "seed_claims.json": sha256(VE / "seed_claims.json"),
    "literature_register.json": sha256(VE / "literature_register.json"),
    "gravifire_l1.db": sha256(ROOT / "Gravifier_research/evidence_store/gravifire_l1.db"),
}
try:
    stamp["git_head"] = subprocess.check_output(
        ["git", "-C", str(ROOT), "rev-parse", "--short", "HEAD"], text=True).strip()
    dirty = subprocess.check_output(
        ["git", "-C", str(ROOT), "status", "--porcelain"], text=True).strip()
    stamp["git_dirty_files"] = len(dirty.splitlines())
except Exception:
    stamp["git_head"] = "unavailable"
(OUT / "r4_holdout_stamp.json").write_text(json.dumps(stamp, indent=1))
print("version stamp:", json.dumps(stamp))

# ---- 2. blinded store copy
shutil.copy(ROOT / "Gravifier_research/evidence_store/gravifire_l1.db", BLIND_DB)
con = sqlite3.connect(BLIND_DB)
ph = ",".join("?" * len(MASK_VARS))
cur = con.execute(
    "UPDATE evidence_items SET value_norm=NULL, value_raw='', "
    "flags=flags||'|HOLDOUT_MASKED' WHERE run_id LIKE 'SAFFIRE2-%' "
    f"AND variable IN ({ph})", MASK_VARS)
print(f"masked {cur.rowcount} SAFFIRE-II outcome items")
con.commit()
con.close()

# ---- 3. blind predictions
sys.path.insert(0, str(VE))
from engine import Engine  # noqa: E402

claims = {c["tc_id"]: c for c in json.loads((VE / "seed_claims.json").read_text())
          if c["tc_id"].startswith("TC-") and c["family"] in
          ("pdms_silicone", "pmma_thick", "pmma_nomex", "sibal_fabric")
          and c["scale_class"] == "large" and c["tc_id"] not in ("TC-SIBAL-SCALE-01",)}
# keep the SAFFIRE-II-target claims (large-scale families that flew on SAFFIRE-II)
holdout_ids = ["TC-PDMS-01", "TC-PDMS-02", "TC-SIBAL-LG-01", "TC-PMMA-THICK-01", "TC-NOMEX-01"]
blind_engine = Engine(store_path=BLIND_DB, blind=True)
predictions = {}
for tc in holdout_ids:
    r = blind_engine.evaluate(claims[tc])
    predictions[tc] = {"verdict": r["verdict"], "confidence": r["confidence"],
                       "refusal": r.get("refusal", False),
                       "missing": r["missing_evidence"][:1],
                       "n_evidence": len(r["evidence"])}
    print(f"BLIND {tc}: {r['verdict']} / {r['confidence']}")

# ---- 4. reveal
truth = {v["tc_id"]: v for v in
         json.loads((OUT / "seed_verdicts.json").read_text())["verdicts"]}
print("\nREVEAL:")
rows, n_agree, n_false_sup, n_correct_refusal, n_miss = [], 0, 0, 0, 0
for tc in holdout_ids:
    b, t = predictions[tc], truth[tc]["verdict"]
    if b["verdict"] == t:
        cls, ok = "AGREE", True
        n_agree += 1
    elif b["verdict"] == "SUPPORTED" and t in ("CONTRADICTED", "INSUFFICIENT"):
        cls, ok = "FALSE_SUPPORTED", False
        n_false_sup += 1
    elif b["verdict"] == "INSUFFICIENT":
        # refusal while non-SAFFIRE-II evidence existed to make the call?
        has_cross = any(e.get("run_id") and not str(e.get("run_id")).startswith("SAFFIRE2")
                        for e in truth[tc]["evidence"]
                        if e["role"] in ("CONFIRM", "CONTRADICT"))
        cls = "CORRECT_REFUSAL" if not has_cross else "MISSED_CALL"
        ok = not has_cross
        n_correct_refusal += ok
        n_miss += (not ok)
    else:
        cls, ok = "OTHER_DISAGREE", False
    rows.append({"tc_id": tc, "blind": b["verdict"], "blind_conf": b["confidence"],
                 "truth": t, "truth_conf": truth[tc]["confidence"],
                 "classification": cls})
    print(f"  {tc}: blind={b['verdict']}/{b['confidence']} truth={t} -> {cls}")

metrics = {
    "n_holdout_claims": len(holdout_ids),
    "verdict_agreement": n_agree,
    "false_SUPPORTED_rate": n_false_sup / len(holdout_ids),
    "correct_refusals": n_correct_refusal,
    "missed_calls": n_miss,
    "rows": rows,
    "stamp": stamp,
    "mask_rule": f"SAFFIRE-II variables {MASK_VARS} (raw+norm) + SAFFIRE-II lit keys",
}
(OUT / "r4_tier2_holdout.json").write_text(json.dumps(metrics, indent=1))
print(f"\nagreement {n_agree}/{len(holdout_ids)} | false-SUPPORTED {n_false_sup} "
      f"| correct refusals {n_correct_refusal} | missed {n_miss}")
