#!/usr/bin/env python
"""R5 — build the findings-digest data from artifacts (no hand-typed numbers).

Outputs Gravifier_research/R5_DIGEST_DATA.json:
- verdict_table: 18 seed claims + 5 blind hold-out rows
- epistemic_grid: tested-condition coverage per family x flow x O2 x scale
  (in-domain run counts from the store)
- next_experiment_ranking: empty cells that our INSUFFICIENT verdicts point
  at, ranked by claims unblocked
"""
import json
import sqlite3
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path("/home/elias/Codes/NSAC")
VE = ROOT / "Gravifier_research/verdict_engine"
OUT = VE / "outputs"
sys.path.insert(0, str(VE))
from engine import Engine, flow_bucket, o2_bucket, run_conditions  # noqa: E402

# ---- verdict table
verdicts = json.loads((OUT / "seed_verdicts.json").read_text())["verdicts"]
holdout = json.loads((OUT / "r4_tier2_holdout.json").read_text())
rows = []
for v in verdicts:
    ev_confirm = [e for e in v["evidence"] if e["role"] == "CONFIRM"]
    ev_contra = [e for e in v["evidence"] if e["role"] == "CONTRADICT"]
    runs = sorted({str(e["run_id"]) for e in v["evidence"]
                   if e["run_id"] and e["role"] in ("CONFIRM", "CONTRADICT")})
    rows.append({
        "tc_id": v["tc_id"], "verdict": v["verdict"], "confidence": v["confidence"],
        "grade": v.get("grade"), "refusal": v.get("refusal", False),
        "n_confirm": len(ev_confirm), "n_contradict": len(ev_contra),
        "runs": runs[:6],
        "first_source": (ev_confirm or ev_contra or v["evidence"])[0].get("source", ""),
    })
blind_rows = holdout["rows"]

# ---- epistemic grid + next-experiment ranking
eng = Engine()
store = eng.store
families = [r[0] for r in store.con.execute(
    "SELECT DISTINCT family FROM runs WHERE is_test=1 AND family IS NOT NULL ORDER BY family")]
grid = defaultdict(int)
fam_scales = {}
for fam in families:
    for run in store.runs_for_family(fam):
        cond = run_conditions(store, run)
        key = (fam,
               flow_bucket(cond["flow"]) if cond["flow"] is not None else "unknown_flow",
               o2_bucket(cond["o2"]) if cond["o2"] is not None else "unknown_o2",
               cond["scale"])
        grid[key] += 1
        fam_scales.setdefault(fam, set()).add(cond["scale"])

tested_cells = dict(grid)
# claims that were refused/insufficient and the domains they demanded
claims_by_id = {c["tc_id"]: c for c in json.loads((VE / "seed_claims.json").read_text())}
demanded = []
for v in verdicts:
    if v["verdict"] == "INSUFFICIENT":
        c = claims_by_id[v["tc_id"]]
        fr = (c.get("flow_regime") or {})
        demanded.append({
            "tc_id": v["tc_id"],
            "family": c.get("family"),
            "cell": (c.get("family"), fr.get("bucket"),
                     (c.get("oxygen_regime") or {}).get("bucket"), c.get("scale_class")),
        })

cell_claims = defaultdict(list)
for d in demanded:
    cell_claims[(d["family"], d["cell"][1], d["cell"][2], d["cell"][3])].append(d["tc_id"])

# a candidate next experiment = an empty demanded cell (family with runs at
# some scale, but not this condition), ranked by #claims unblocked
ranking = []
for cell, tcs in cell_claims.items():
    fam, fb, ob, scale = cell
    if fam is None:
        continue
    has_family = any(k[0] == fam for k in tested_cells)
    cell_tested = any(k[0] == fam and k[1] == fb and k[3] == scale and (ob is None or k[2] == ob)
                      for k in tested_cells)
    if cell_tested:
        continue  # cell has data; the INSUFFICIENT came from outcome gaps, not sparsity
    ranking.append({
        "cell": {"family": fam, "flow_bucket": fb, "o2_bucket": ob, "scale": scale},
        "claims_unblocked": sorted(set(tcs)),
        "family_has_any_data": has_family,
    })
ranking.sort(key=lambda r: -len(r["claims_unblocked"]))

out = {
    "verdict_table": rows,
    "verdict_mix": {
        "SUPPORTED": sum(1 for r in rows if r["verdict"] == "SUPPORTED"),
        "CONTRADICTED": sum(1 for r in rows if r["verdict"] == "CONTRADICTED"),
        "INSUFFICIENT": sum(1 for r in rows if r["verdict"] == "INSUFFICIENT"),
        "refusals": sum(1 for r in rows if r["refusal"]),
    },
    "blind_holdout": {
        "rows": blind_rows,
        "false_SUPPORTED": holdout["false_SUPPORTED_rate"],
        "correct_refusals": holdout["correct_refusals"],
        "missed": holdout["missed_calls"],
    },
    "epistemic_grid_tested_cells": {str(k): v for k, v in sorted(tested_cells.items())},
    "n_tested_cells": len(tested_cells),
    "n_families": len(families),
    "next_experiment_ranking": ranking,
}
(ROOT / "Gravifier_research/R5_DIGEST_DATA.json").write_text(json.dumps(out, indent=1))
print(f"verdict mix: {out['verdict_mix']}")
print(f"epistemic grid: {len(tested_cells)} tested cells across {len(families)} families")
print("\nnext-experiment ranking (empty cells our refusals point at):")
for r in ranking:
    c = r["cell"]
    print(f"  {len(r['claims_unblocked'])} claims | {c['family']} @ {c['flow_bucket']},"
          f" O2 {c['o2_bucket']}, {c['scale']} -> {r['claims_unblocked']}")
