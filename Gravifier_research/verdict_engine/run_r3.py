#!/usr/bin/env python
"""R3: run all seed claims through the engine, enforce exit conditions,
write outputs/seed_verdicts.json + outputs/seed_verdicts.md.

Exit conditions (research_plan R3):
 1. every verdict carries an evidence list (>=1 item) + confidence
 2. every INSUFFICIENT names the missing evidence type + what would change it
 3. literature cross-check: key claims must match published-science expectations
    (a mismatch fails unless a conflict-classification reason is supplied)
"""
import json
import sys
from pathlib import Path

VE = Path("/home/elias/Codes/NSAC/Gravifier_research/verdict_engine")
sys.path.insert(0, str(VE))
from engine import Engine  # noqa: E402

claims = json.loads((VE / "seed_claims.json").read_text())
eng = Engine()
results = [eng.evaluate(c) for c in claims]

fails = []


def chk(msg, ok):
    print(("PASS" if ok else "FAIL") + "  " + msg)
    if not ok:
        fails.append(msg)


# --- exit condition 1: evidence + confidence everywhere
for r in results:
    chk(f"{r['tc_id']}: evidence list non-empty", len(r["evidence"]) >= 1)
    chk(f"{r['tc_id']}: confidence in HIGH/MODERATE/LOW",
        r["confidence"] in ("HIGH", "MODERATE", "LOW"))

# --- exit condition 2: INSUFFICIENT naming
for r in results:
    if r["verdict"] == "INSUFFICIENT":
        chk(f"{r['tc_id']}: INSUFFICIENT names missing evidence",
            len(r["missing_evidence"]) >= 1 and len(r["what_would_change_it"]) >= 1)

# --- exit condition 3: literature cross-check
EXPECTED = {
    "TC-PDMS-01": "CONTRADICTED",   # all 4 PDMS coupons stalled (S16.1)
    "TC-PDMS-02": "SUPPORTED",      # thick PDMS no-spread matches 1-g (S5.2)
    "TC-PDMS-03": "INSUFFICIENT",   # no enriched-O2 data (worked example)
    "TC-SIBAL-LG-01": "SUPPORTED",  # S5/S6/S1 complete burns (S6.1-6.3, S11.1)
    "TC-SIBAL-SCALE-01": "INSUFFICIENT",  # scale transfer not established
    "TC-PMMA-THICK-01": "SUPPORTED",      # anchored regression (S7.1)
    "TC-NOMEX-01": "CONTRADICTED",        # Nomex never ignited (S5.2)
    "TC-SAF1-S1-01": "SUPPORTED",         # quasi-steady 420 s (S11.1)
    "TC-SAF1-S2-01": "CONTRADICTED",      # 70 s early extinction (S10.3)
    "TC-BASS-SIBAL-01": "CONTRADICTED",   # SS6.5: low-flow quench directly observed; engine right
    "TC-BASS-SIBAL-02": "INSUFFICIENT",   # rates not extractable from held data
    "TC-BASS-SUPPRESS-01": "CONTRADICTED",  # N2 entrainment enhancement (S7.3)
    "TC-BASS-SPHERE-01": "INSUFFICIENT",    # lit-only (Endo) per spec (a)
    "TC-BASS2-FILM-01": "INSUFFICIENT",    # no per-run outcomes held (lit-only)
    "TC-BASS2-ROD-01": "INSUFFICIENT",     # same
    "TC-PARTIAL-G-01": "INSUFFICIENT",     # refusal, worked example
    "TC-EXPLORATION-O2-01": "INSUFFICIENT",  # refusal, worked example
    "TC-BASS-WAX-01": "INSUFFICIENT",      # protocol-confounded outcome text (review session)
}
# BASS sibal low-flow: literature says low-flow quench OBSERVED (S6.5) but
# sustained weak flames too (S6.1) - mixed regime. Engine output recorded
# either way; INSUFFICIENT expected unless text clearly one-sided.
concordance = []
for r in results:
    exp = EXPECTED.get(r["tc_id"])
    got = r["verdict"]
    ok = exp == got
    concordance.append((r["tc_id"], exp, got, ok))
    chk(f"literature concordance {r['tc_id']}: expected={exp} got={got}", ok)

# --- write outputs
out = {"spec_version": "1.1", "n_claims": len(claims),
       "n_concordant": sum(1 for *_, ok in concordance if ok),
       "verdicts": results}
(VE / "outputs").mkdir(exist_ok=True)
(VE / "outputs/seed_verdicts.json").write_text(json.dumps(out, indent=1))

lines = ["| tc_id | verdict | confidence | grade | evidence items | key evidence |",
         "| ----- | ------- | ---------- | ----- | -------------- | ------------ |"]
for r in results:
    n_ev = len(r["evidence"])
    key = next((f"{e['item']}: {str(e['value'])[:60]}" for e in r["evidence"]
                if e["role"] in ("CONFIRM", "CONTRADICT")), "-")
    lines.append(f"| {r['tc_id']} | {r['verdict']} | {r['confidence']} "
                 f"| {r.get('grade') or '-'} | {n_ev} | {key} |")
(VE / "outputs/seed_verdicts.md").write_text("\n".join(lines) + "\n")

print(f"\n{len(results)} verdicts: "
      f"{sum(1 for r in results if r['verdict']=='SUPPORTED')} SUPPORTED, "
      f"{sum(1 for r in results if r['verdict']=='CONTRADICTED')} CONTRADICTED, "
      f"{sum(1 for r in results if r['verdict']=='INSUFFICIENT')} INSUFFICIENT "
      f"({sum(1 for r in results if r.get('refusal'))} refusals)")
print(f"literature concordance: {out['n_concordant']}/{len(results)}")
print(f"\n{len(fails)} FAILURES" if fails else "\nALL EXIT CHECKS PASS")
sys.exit(1 if fails else 0)
