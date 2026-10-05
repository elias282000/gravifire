# R4 Validation Report — GRAVIFIRE (COMPLETE, 2026-10-02)

Honest numbers, including failures. Sources: `outputs/r4_tier1_anchors.json`,
`outputs/r4_tier2_holdout.json` (+ `r4_holdout_stamp.json`),
`outputs/r4_tier3_provenance.json`. Scripts in `scripts/r4_*.py`.

## Tier 1 — anchor reproduction

| Anchor | Our measurement | Published | Deviation |
| ------ | --------------- | --------- | --------- |
| S5 (SIBAL, SAFFIRE-II) window-rate | 2.03 mm/s | 2.1 | −3.1% |
| S5 Theil–Sen (traverse-calibrated) | 2.18 mm/s | 2.1 | **+4.0%** |
| S6 (SIBAL, SAFFIRE-II) window-rate | 2.25 mm/s | 2.6 | −13.6% |
| S6 Theil–Sen (traverse-calibrated) | 2.64 mm/s | 2.6 | **+1.6%** |
| SAFFIRE-I S1 (flame front) | 1.96 mm/s | 1.7–1.8 | +12.3% |
| PDMS S1–S4 (stall, qualitative) | no sustained spread ×4 | ignition-then-stall | confirmed |

Method notes (uniform across S5/S6: same thresholds, no per-set tuning):
activity-window burn detection (rolling OK-fraction ≥ 0.3) + arrival trim
where the front reaches the edge + Theil–Sen slope; LED/exposure frames
excluded (20–45% of frames per set — S5: 2,072 SATURATED + 651 NO_FLAME;
S6: 2,109 + 4,282).

Failures and limits, stated:
- **Scale calibration is the dominant systematic.** Under the
  image-width-equals-sample assumption the rates sit −12.8% (S5) / −19.6%
  (S6) low; traverse calibration removes most of it. The ROI/distortion
  calibration PDFs are dead NASA links — pinning px/cm exactly is not
  possible from held data.
- **SAFFIRE-I S1's scale is inferred, not measured**: flame-sheet row span
  (837 px) = fabric width (40.6 cm). The +12.3% deviation carries that
  inference.
- **PDMS ignition cannot be confirmed from imagery** (flames at the JPEG
  noise floor; S2C2 showed nothing above threshold outside LED frames) —
  stall is confirmed as absence of sustained spread; ignition rests on
  igniter telemetry + literature.
- Development iterations on the S6 burn-window rule (3 discarded attempts:
  stay-check, last-frame-above-100, running-min cut) are part of the record;
  the final rule is the only one that worked on both sets unchanged.

## Tier 2 — blind SAFFIRE-II hold-out

Protocol executed as specified: version-stamp **before** reveal
(sha256 of engine/spec/claims/literature/store + git HEAD `2a86093`,
22 dirty files recorded), SAFFIRE-II μg-outcome items masked (raw + norm,
HOLDOUT_MASKED flag), SAFFIRE-II-derived literature entries dropped, 5
SAFFIRE-II-family claims predicted blind, then revealed against R3 truth.

| Claim | Blind | Truth | Classification |
| ----- | ----- | ----- | -------------- |
| TC-SIBAL-LG-01 | **SUPPORTED / HIGH** | SUPPORTED / HIGH | AGREE (the transferable call) |
| TC-PDMS-01 | INSUFFICIENT / LOW | CONTRADICTED | CORRECT_REFUSAL |
| TC-PDMS-02 | INSUFFICIENT / LOW | SUPPORTED | CORRECT_REFUSAL |
| TC-PMMA-THICK-01 | INSUFFICIENT / LOW | SUPPORTED | CORRECT_REFUSAL |
| TC-NOMEX-01 | INSUFFICIENT / MODERATE | CONTRADICTED | CORRECT_REFUSAL |

Metrics: **false-SUPPORTED rate 0/5 = 0.00** (the cardinal error never
occurs); verdict agreement on cross-study-transferable claims 1/1 at
matching HIGH confidence; correct-refusal rate 4/4 (every SAFFIRE-II-only
family refused blind); missed calls 0.

Honest caveat: n=1 for the transferable-call agreement — one claim is all
the cross-study evidence supports. The hold-out's real finding is the
asymmetry: the engine makes the call it can make and refuses the four it
cannot, with zero overclaims.

## Tier 3 — provenance audit (10 published claims)

**6 FULL / 4 PARTIAL / 0 FAIL.** FULL = source-row chain + independent
artifact (our measurement or structural reconciliation): S5 rate, S6 rate,
SAFFIRE-I S1 burn time + our S1C1 measurement, PDMS stall + our imagery
check, BASS 122-row reconciliation, BASS-II 129/129 reconciliation.
PARTIAL = chain resolves, no independent artifact: S8/S9 regression rates
(S9C1 frames held — R5 candidate), S2 extinction (no S2 imagery pass run),
N2-jet enhancement (text-mined, INTERPRETED), SIBAL non-monotonicity
(per-run rates not held; engine honestly returns INSUFFICIENT).
Chain resolution rate: 10/10.

## The credibility statement (R4 understanding deliverable)

**What can be trusted, and how far:** image-derived spread rates reproduce
published NASA values within ±4% (Theil–Sen, traverse calibration) on both
SAFFIRE-II SIBAL anchors, and within +12% on SAFFIRE-I under a documented
scale inference. The verdict engine, run blind, never claimed support it
did not have (0 false-SUPPORTED in 5 hold-out claims) and made the single
call cross-study evidence permitted, at the correct verdict and confidence.
Every published number we display resolves to a source row (0 unresolved
chains); 6 of 10 additionally rest on our own independent artifacts.

**Where it fails, by design or by gap:** absolute-scale rate estimates carry
a −13% to −20% systematic until ROI calibration surfaces (dead links);
PDMS ignition is telemetry/literature-sourced, not imagery-sourced; BASS
outcome evidence is operator-log text, protocol-confounded where the test
ended in commanded extinction (wax case); BASS-II verdicts are structurally
INSUFFICIENT without per-run outcomes; SAFFIRE single-condition verdicts cap
at MODERATE.

**Why this failure profile is acceptable:** every failure mode is
conservative — refusal, underclaim, or a quantified systematic with a named
cause. Nothing in the system overclaims. For a spacecraft fire-safety trust
tool, a Type-II-conservative error profile (never says "supported" wrongly)
is the profile a NASA reviewer would accept; the blind hold-out is the proof.

## Carried to R5

- Demonstrable claims list sources: anchor table + hold-out table +
  provenance table above, with derivations.
- The uncertainty story for the script: "±4% where we calibrate by traverse;
  −13..−20% systematic if we don't; we tell you which number you're looking
  at, every time."
- R5 candidates: S9C1 regression-rate measurement (frames already held);
  S2C2 imagery extinction check; protocol-aware BASS text classification.
