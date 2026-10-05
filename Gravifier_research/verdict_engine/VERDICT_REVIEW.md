# R3 Verdict Review Session — 2026-10-02

The R3 understanding deliverable: each seed verdict read against the
question **"would a NASA fire-safety engineer accept this reasoning?"**
Inputs: `outputs/seed_verdicts.json` (18 claims, engine v1.1). Exit state:
18/18 literature concordance, all structural checks PASS.

## Session outcome in one line

The engine survives the review **after three real defects were found and
fixed during the exercise** — which is the review working, not failing.

## Defects found during the exercise (and fixed)

| # | Defect | Symptom | Fix |
| - | ------ | ------- | --- |
| 1 | L2 store: PSI-99 runs hardcoded geometry "sheet" | thick-PMMA slab claim ruled out-of-domain; hooks tried to rescue it | geometry from family registry; store rebuilt (19/19 checks) |
| 2 | O2 parsing: "~ 22.1" (bare number, unit in header) unparseable; bucket boundary at 22.0 pushed 22.1% into "enriched" | enriched-O2 refusal claim (TC-PDMS-03) wrongly contradicted on normal-air evidence | approx-marker-aware numeric parse; normal bucket ceiling 22.5%; store rebuilt |
| 3 | Conflict register unstructured: CR-2 (thickness *units*) capped SAFFIRE-I S1 to LOW | TC-SAF1-S1-01 SUPPORTED/LOW while its twin claim scored HIGH | conflicts carry `class` + `affects`; only outcome-affecting UNRESOLVED conflicts cap consistency |

Engine-design note validated by accident: when defect 1 left the claim
out-of-domain, the engine **refused even though hooks had confirming
evidence** — refuse-wins ordering is correct and stays.

## Expectation corrections (engine was right, table was wrong)

- TC-BASS-SIBAL-01: expected INSUFFICIENT, engine said CONTRADICTED.
  Review verdict: **engine correct** — BASS review §6.5 records low-flow
  quenching directly observed; the claim ("sustains at very low opposed
  flow") is contradicted by primary run text + literature.
- TC-BASS-WAX-01: expected SUPPORTED, engine said INSUFFICIENT.
  Review verdict: **engine correct to refuse** — wax outcome texts mix
  "spread/burnout" with "extinguished"; BASS protocol *reduces flow until
  extinction*, so operator text conflates protocol endpoint with failure to
  burn. Classification needs protocol-awareness (named as an improvement,
  not silently patched).

## Per-verdict acceptance notes

| tc_id | verdict | accepted? | engineer's note |
| ----- | ------- | --------- | --------------- |
| TC-PDMS-01 | CONTRADICTED / MODERATE | yes | 3 in-domain runs all "~ 0" burn length + §16.1; BOUND grade right (one O2/flow condition) |
| TC-PDMS-02 | SUPPORTED / MODERATE | yes | consistent with 1-g ~0 for thick PDMS; single condition cap applied |
| TC-PDMS-03 | INSUFFICIENT / LOW | yes | refusal names missing evidence (enriched-O2 test); nearest domain shown |
| TC-SIBAL-LG-01 | SUPPORTED / HIGH | yes | 3 runs, 2 studies, 2 flights; rate + length items both cited |
| TC-SIBAL-SCALE-01 | INSUFFICIENT / LOW | yes | scale axis off; nearest domain = small-duct SIBAL; honest about transfer gap |
| TC-PMMA-THICK-01 | SUPPORTED / MODERATE | yes | anchored regression confirmed S8+S9 with §7.1; BOUND |
| TC-NOMEX-01 | CONTRADICTED / MODERATE | yes | the demo-ready cascade-refutation; single run + literature, correctly not HIGH |
| TC-SAF1-S1-01 | SUPPORTED / HIGH | yes (after defect 3) | cross-study corroboration is legitimate strength |
| TC-SAF1-S2-01 | CONTRADICTED / MODERATE | yes | 70 s vs 420 s as-flown burn times; single run kept at MODERATE |
| TC-BASS-SIBAL-01 | CONTRADICTED / MODERATE | yes | see expectation correction above |
| TC-BASS-SIBAL-02 | INSUFFICIENT / LOW | yes | per-run rates need video analysis we hold only for SAFFIRE |
| TC-BASS-SUPPRESS-01 | CONTRADICTED / MODERATE | yes | 13 GN2/dilution run texts + §7.3; enhancement result cited verbatim |
| TC-BASS-SPHERE-01 | INSUFFICIENT / LOW | yes | literature-only cannot clear SUPPORTED bar (spec §2a); refuses despite strong review finding |
| TC-BASS2-FILM-01 | INSUFFICIENT / LOW | yes | same discipline applied to BASS-II (no local outcome text) — study-wide refusal is honest |
| TC-BASS2-ROD-01 | INSUFFICIENT / LOW | yes | as above |
| TC-PARTIAL-G-01 | INSUFFICIENT / LOW (refusal) | yes | partial gravity out of scope; nearest domain + what-would-change listed |
| TC-EXPLORATION-O2-01 | INSUFFICIENT / LOW (refusal) | yes | the exploration-atmosphere memory line, working as designed |
| TC-BASS-WAX-01 | INSUFFICIENT / MODERATE | yes | refusal confidence MODERATE = the mixed-evidence reading itself is well-evidenced |

## What would NOT have survived a NASA review (fixed or fenced)

- Calling PDMS "safe" from these verdicts — fenced: CONTRADICTED is about the
  *propagation expectation*, not a safety classification; spec forbids
  safe/unsafe framing.
- Any SINGLE-run HIGH verdict — prevented by precision cap.
- Display-vs-calibrated flow comparison — prevented by kind check in
  domain_distance.
- BASS-II SUPPORTED from literature alone — prevented by spec §2(a);
  the whole study correctly lands INSUFFICIENT until per-run outcomes exist.

## Carried to R4

- Anchor reproduction must re-run on the rebuilt store (S5, S6, S9, SAFFIRE-I
  S1 targets unchanged).
- Blind hold-out design: the engine and seed claims above are now
  version-stamped (v1.1, this file's git state); the hold-out conceals
  SAFFIRE-II outcomes and re-derives verdicts from BASS + BASS-II +
  SAFFIRE-I evidence only.
- Protocol-aware BASS outcome classification is an R4+ improvement item
  (wax case documents why).
