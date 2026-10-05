#!/usr/bin/env python3
"""R7 handover bundle integrity check. Verifies:
1. Inventory — every expected file exists.
2. Whitelist — every entry resolves at its source path to the expected value
   (@TCID token = find verdict by tc_id; markdown entries check substring).
3. M1.json — verdict payloads match seed_verdicts.json verbatim; every
   whitelist_key reference resolves; claims exist; no banned renderings.
Exit code 0 = all PASS."""
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent
results = []

def check(name, ok, detail=""):
    results.append((name, ok, detail))

# --- 1. inventory -----------------------------------------------------------
expected = [
    "README.md", "numbers_whitelist.json", "verify_bundle.py",
    "docs/DEVELOPER_DOCUMENT.md", "docs/game_story_and_choices.md",
    "docs/material_catalog_and_experiment_game.md", "docs/R1_FINDINGS.md",
    "docs/R4_VALIDATION_REPORT.md",
    "engine/engine.py", "engine/verdict_spec.md", "engine/scenario_input_spec.md",
    "engine/run_r3.py", "engine/seed_claims.json", "engine/literature_register.json",
    "engine/outputs/seed_verdicts.json", "engine/outputs/r4_tier1_anchors.json",
    "engine/outputs/r4_tier2_holdout.json", "engine/outputs/r4_tier3_provenance.json",
    "engine/outputs/r4_holdout_stamp.json",
    "store/gravifire_l1.db", "store/exports/data_contract.json",
    "store/exports/r2_exit_checks.txt", "store/R2_CENSUS.md",
    "digest/R5_FINDINGS_DIGEST.md", "digest/R5_DIGEST_DATA.json",
    "missions/mission_schema.md", "missions/M1.json",
    "assets/frames_manifest.md",
]
missing = [f for f in expected if not (ROOT / f).exists()]
n_series = len(list((ROOT / "store/series").glob("*.csv.gz")))
n_frames = len(list((ROOT / "assets/dossier_frames").glob("*.jpeg")))
check("inventory: expected files", not missing, f"missing: {missing}" if missing else f"{len(expected)} files")
check("inventory: 11 sensor series", n_series == 11, f"found {n_series}")
check("inventory: 27 dossier frames", n_frames == 27, f"found {n_frames}")

# --- 2. whitelist resolution -------------------------------------------------
wl = {e["key"]: e for e in json.load(open(ROOT / "numbers_whitelist.json"))["entries"]}
sv_doc = json.load(open(ROOT / "engine/outputs/seed_verdicts.json"))
sv_by_id = {v["tc_id"]: v for v in sv_doc["verdicts"]}

def resolve(doc, path):
    cur = doc
    for p in path:
        if isinstance(p, str) and p.startswith("@"):
            cur = next(v for v in cur if v["tc_id"] == p[1:])
        else:
            cur = cur[p]
    return cur

for key, e in sorted(wl.items()):
    f = ROOT / e["source_file"]
    if not f.exists():
        check(f"whitelist {key}", False, f"source missing: {e['source_file']}")
        continue
    if e["path"] is None:  # markdown / substring check
        text = f.read_text(errors="replace")
        needle = e.get("expect_contains_file") or str(e["value"])
        check(f"whitelist {key}", needle in text,
              "" if needle in text else f"substring {needle!r} not found in {e['source_file']}")
        continue
    try:
        val = resolve(json.load(open(f)), e["path"])
    except Exception as ex:
        check(f"whitelist {key}", False, f"path resolve failed: {ex}")
        continue
    if "expect_contains" in e:
        ok = e["expect_contains"] in str(val)
    else:
        ok = val == e["expect"]
    check(f"whitelist {key}", ok, f"got {val!r}, expected {e.get('expect', e.get('expect_contains'))!r}")

# --- 3. M1.json ----------------------------------------------------------------
m1 = json.load(open(ROOT / "missions/M1.json"))
for tc in m1["claims"]:
    check(f"M1 claim {tc} exists", tc in sv_by_id)
vp_ok, vp_bad = True, []
for tc, payload in m1["verdict_payloads"].items():
    if sv_by_id.get(tc) != payload:
        vp_ok = False; vp_bad.append(tc)
check("M1 verdict payloads verbatim", vp_ok, f"mismatched: {vp_bad}" if vp_bad else f"{len(m1['verdict_payloads'])} payloads identical to seed_verdicts.json")

refs = []
def walk(o):
    if isinstance(o, dict):
        if "whitelist_key" in o:
            refs.append(o["whitelist_key"])
        for v in o.values():
            walk(v)
    elif isinstance(o, list):
        for v in o:
            walk(v)
walk(m1)
bad_refs = [r for r in refs if r not in wl]
check("M1 whitelist_key refs resolve", not bad_refs, f"unknown: {bad_refs}" if bad_refs else f"{len(refs)} refs OK")
check("M1 has 9 beats", len(m1["beats"]) == 9, f"{len(m1['beats'])} beats")

banned = []
def walk2(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k == "display" and isinstance(v, str) and ("~13" in v or v.strip() == "13 s"):
                banned.append(v)
            walk2(v)
    elif isinstance(o, list):
        for v in o:
            walk2(v)
walk2(m1)
check("M1 no banned renderings (~13 s)", not banned, f"found: {banned}")

# --- report -------------------------------------------------------------------
fails = 0
for name, ok, detail in results:
    print(f"{'PASS' if ok else 'FAIL':4}  {name}" + (f"  — {detail}" if detail else ""))
    fails += 0 if ok else 1
print(f"\n{len(results) - fails}/{len(results)} PASS, {fails} FAIL")
sys.exit(1 if fails else 0)
