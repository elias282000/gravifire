# R2 Evidence Census — what we actually hold (COMPLETE, 2026-10-02)

The R2 understanding deliverable of `Setup docs/research_plan.md §5`: how many
runs, families, conditions, and modalities the L1 store holds, and where it is
thin. Store: `evidence_store/gravifire_l1.db` (built by
`R1_data_interrogation/scripts/r2_build_store.py`, anchors by
`r2_extract_anchors.py`, contract by `r2_export_contract.py`; 19/19 exit
checks in `exports/r2_exit_checks.txt`).

## The census in one table

| Study | Combustion runs | Families | Evidence items | Sensor series | Burn frames inventoried |
| ----- | --------------- | -------- | -------------- | ------------- | ----------------------- |
| BASS-II (PSI-25) | 129 | 7 | 1,548 | 0 local | — (video upstream only) |
| BASS (PSI-26) | 121 | 7 | 1,489 | 0 local | — |
| SAFFIRE-I (PSI-98) | 2 | 1 | 16 | 1 (S2; S1 dead upstream) | 72,533 (S1 36,233 + S2 36,300) |
| SAFFIRE-II (PSI-99) | 9 | 4 | 123 | 9 (all samples) | 177,300 |
| **Total** | **261** | **19 study-family cells** | **3,176** | **11** | **249,833** |

Plus 14 non-test rows kept deliberately (2+2 flow-vis per SAFFIRE flight, 10
BASS matrix annotations incl. STOW/SETUP/dilution/housekeeping), 54 planned
test points (planned layer), and 9 extracted anchor image sets
(118,938 frames, `evidence_store/anchors/`).

## What the store can already answer (the healthy regions)

- **SAFFIRE-II is the multimodal backbone**: every sample carries 13–15
  evidence items (geometry, flow, O2, ignition, published outcomes), a 30 Hz
  calibrated sensor series, and a full-frame camera inventory; 7 of 9 samples
  have extracted anchor imagery (S1C2, S2C2, S3C2 unmapped, S4C1, S5C1+C2,
  S6C1, S9C1).
- **BASS run conditions are stronger than the review assumed**: the as-run
  matrix gives measured O2 for 121/121 runs, pressure 121/121, CO2 111/121,
  GN2 suppressant settings 77/121 — not just display fields.
- **Negative and boundary results exist and are queryable**: 116/121 BASS
  runs carry free-text outcome observations (keyword census: 77 "ignited",
  34 "extinguished", 45 "soot", 13 dilution/GN2 events, 5 explicit
  no-spread/no-ignition). This is the gap-4 fuel the verdict engine needs.
- **Planned vs as-flown is live end-to-end**: 54 planned test points against
  121 as-run tests, per-run planned numbers kept, NASA's own "Data without
  TP / TP without Data" reconciliation sheets not needed locally.

## Where the store is thin (the honest limits)

1. **BASS/BASS-II have no local video.** Verdicts there rest on run-condition
   + outcome-text evidence (BOUND-grade), never per-run image measurement.
   Selective video pulls exist upstream but cost GB per test — a deliberate
   non-goal for now.
2. **SAFFIRE-I S1 has no sensor series** (dead NASA links, R1-Q3). S1 claims
   must cite imagery (36,233 frames inventoried; 14,388 extracted mapped) or
   literature. S2 is fully covered.
3. **S3C2 anchor imagery is unmapped** (mapped set does not exist locally;
   unmapped All-JPEGs used, flagged UNMAPPED_FALLBACK). PDMS S3 is a
   qualitative stall anchor, so acceptable.
4. **S5C2 mapped is partial** (5,000 of 9,600 frames; NASA shipped only
   part1 mapped). S5C1 — the anchor camera — is complete.
5. **Calibrated flow exists only for SAFFIRE** (anemometer channels at 30 Hz).
   All BASS/BASS-II flow fields stay DISPLAY_NOT_CALIBRATED forever (593
   flagged items) — this is physics honesty, not a gap to fill.
6. **Source schema defects are preserved, not fixed**: the PSI-99 rate-in-
   length-column defect (S5 2.1, S6 2.6 mm/s carry
   VALUE_HAS_RATE_UNIT_IN_LENGTH_COLUMN + an INTERPRETED companion item);
   "037 mm" thicknesses stay AMBIGUOUS_NUMERIC; PSI-98 0.37 cm thickness
   keeps UNIT_CONFLICT; 6 BASS rows share as-run numbers (suffix + flag);
   9 GMT-vs-date mismatches stand as row flags.

## Row reconciliation (exit condition)

| Audit target | Source of truth | Store | Verdict |
| ------------ | --------------- | ----- | ------- |
| BASS-II 129 tests | review (audited) | 129 | PASS |
| BASS 122 table rows | primary table (review: unresolved) | 122 kept = 121 tests + 1 housekeeping | PASS — review's open question closed from primary source |
| SAFFIRE-I 2 combustion + 2 FV | review | 2 + 2 | PASS |
| SAFFIRE-II 9 samples + 2 FV | review | 9 + 2 | PASS |
| Provenance completeness | hard rule 2 | 0 of 3,185 items missing source file/row | PASS |
| Display ≠ calibrated | hard rule | 0 unflagged display items | PASS |
| Silent conversions | probes + flag census | 7/7 probes PASS; every odd value carries a flag | PASS |

## What this decides for R3

- The verdict engine can seed claims across all four SAFFIRE-II families,
  BASS-II thin-film/rod/SIBAL, and BASS sphere/SIBAL/Nomex — with evidence
  class and applicability domain drawn from the store, not from memory.
- The conflict taxonomy has real work day one: the rate-in-length-column
  defect, the cm-vs-mm thickness conflict, and the BASS as-run collisions are
  three concrete conflicts already classified (SCHEMA_ERROR /
  UNIT_CONFLICT / CONTEXT_DIFFERENCE candidates).
- The gap layer's sparsity grid starts from this census: 19 family×study
  cells, of which 4 are SAFFIRE-multimodal, 14 are BASS-condition-grade,
  1 (SAFFIRE-I SIBAL) is imagery-only.
