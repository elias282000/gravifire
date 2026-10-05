# R5 Findings Digest — what we discovered (COMPLETE, 2026-10-02)

The R5 understanding deliverable and the direct source for the video script
and developer document. Every number below traces to an artifact: R1
`R1_FINDINGS.md`, R2 `evidence_store/` (+`R2_CENSUS.md`), R3
`verdict_engine/` (+`outputs/seed_verdicts.json`), R4
`R4_VALIDATION_REPORT.md` (+`outputs/r4_*.json`), and `R5_DIGEST_DATA.json`
(regenerable via `verdict_engine/scripts/r5_build_digest.py`).

## 1. The answer to the master question

*Can Earth-based material flammability assumptions be trusted under a given
microgravity scenario?* — **It depends on the evidence domain, and the
system now tells you which case you are in.** Across 18 seed transfer
claims: 4 SUPPORTED, 5 CONTRADICTED, 9 INSUFFICIENT (4 outright refusals).
Earth assumptions held for SIBAL fabric in the large duct (blind-predictable
from one prior flight), failed for PDMS propagation and the Nomex cascade
assumption, and are simply unanswerable today for exploration atmospheres
and partial gravity. The one-sentence memory line survives validation:
**"It knows when NASA evidence is not enough."**

## 2. Per-claim verdict table with interpretation

| tc_id | Verdict | Interp. for a fire-safety engineer |
| ----- | ------- | ---------------------------------- |
| TC-SIBAL-LG-01 | SUPPORTED / HIGH | SIBAL propagation at moderate concurrent flow in a large duct is confirmed across two flights (SAFFIRE-II S5, S6 + SAFFIRE-I S1); our measured rates match published values within ±4% |
| TC-SAF1-S1-01 | SUPPORTED / HIGH | The SAFFIRE-I S1 scenario (large SIBAL, 420 s burn) is cross-study corroborated; CR-2 units conflict noted but affects geometry metadata only |
| TC-PDMS-02 | SUPPORTED / MODERATE | Thick-PDMS no-spread expectation transfers (single tested condition; capped) |
| TC-PMMA-THICK-01 | SUPPORTED / MODERATE | Thick PMMA stays non-spreading (anchored regression 0.01–0.04 mm/s), two runs, one condition |
| TC-PDMS-01 | CONTRADICTED / MODERATE | The headline surprise: PDMS that burns completely in 1-g ignites then stalls in μg — all four coupons, imagery-confirmed |
| TC-NOMEX-01 | CONTRADICTED / MODERATE | The cascade assumption fails: PMMA ignition aid consumed, adjacent Nomex never ignited |
| TC-SAF1-S2-01 | CONTRADICTED / MODERATE | Opposed moderate flow killed the large sample in 70 s vs 420 s concurrent — "slower but sustained" 1-g intuition fails at scale |
| TC-BASS-SIBAL-01 | CONTRADICTED / MODERATE | Low-flow sustained-burning expectation fails in the small duct (quench directly observed) |
| TC-BASS-SUPPRESS-01 | CONTRADICTED / MODERATE | N₂ suppressant jets can *enhance* combustion (entrainment) — 13 operator logs + Takahashi |
| TC-PDMS-03, TC-SIBAL-SCALE-01, TC-BASS-SIBAL-02, TC-BASS-SPHERE-01, TC-BASS2-FILM-01, TC-BASS2-ROD-01, TC-BASS-WAX-01 | INSUFFICIENT | Each names its missing evidence; BASS-II is structurally INSUFFICIENT (no local per-run outcomes — the discipline case) |
| TC-PARTIAL-G-01, TC-EXPLORATION-O2-01 | INSUFFICIENT (refusals) | Partial gravity and >22.5% O₂ are out of evidence scope entirely — refused with nearest tested domain shown |

Blind hold-out (SAFFIRE-II concealed, hash-stamped): SIBAL claim predicted
SUPPORTED/HIGH from SAFFIRE-I alone (agrees with truth); all four
SAFFIRE-II-only families correctly refused; **0/5 false-SUPPORTED**.

Honest caveat carried with the table: BASS text-outcome verdicts can rest on
runs whose O₂ axis is unknown-but-non-creditable (the dilution protocol put
low-flow runs at depleted O₂; grid in `R5_DIGEST_DATA.json`); their
confidence is capped at MODERATE by the INTERPRETED evidence class, and the
evidence list shows exactly which runs were used.

## 3. What we can say / cannot say / refuse to say

**CAN say (evidence-backed, display-ready):**
1. SIBAL cotton-fiberglass fabric propagates in a large duct at ~20 cm/s
   concurrent flow, at ~2.1–2.6 mm/s (published) — our independent
   measurement: 2.18 and 2.64 mm/s (+4.0% / +1.6%).
2. PDMS that burns completely in normal gravity ignites but does not sustain
   spread in microgravity (4/4 coupons; imagery shows no sustained luminous
   flame beyond ~13 s vs 142.7 s for SIBAL).
3. Adjacent-Nomex ignition cascade is contradicted (S7).
4. Thick PMMA does not spread in μg; anchored regression only.
5. Opposed moderate flow extinguishes the large SIBAL sample early (70 s vs
   420 s).
6. N₂ suppressant jets can enhance combustion (entrainment) — a spacecraft
   suppression-design fact.
7. Our measurement pipeline reproduces published NASA numbers (anchors
   ±4% Theil–Sen; −13..−20% systematic under the uncalibrated scale, always
   labeled).
8. The verdict engine, run blind on concealed data, never claimed support it
   did not have (0/5 false-SUPPORTED) — and made the one transferable call
   correctly.

**CANNOT say yet (named gaps, honest INSUFFICIENT):** BASS-II per-run
outcomes (no local outcome text/video; literature findings only); BASS
per-run spread rates (video held upstream only); S8/S9 regression rates
independently (frames held, measurement not yet run); S2 extinction imagery
check; wax steady-burning (protocol-confounded operator text); the numeric
value of SIBAL non-monotonicity.

**REFUSE to say (by design):** anything about partial gravity; anything at
>22.5% O₂ (exploration atmospheres); safe/unsafe classifications (we return
evidence verdicts, not certifications — BOUND ≠ flight MOC); small-duct →
large-duct transfer for opposed low flow; fresh-sample → preheated-sphere
transfer; and every "first ever" novelty claim — our phrasing is always
"no evidence found" for prior-art gaps.

## 4. Demonstrable-claims list (what may appear in the video)

Each claim cites its chain; nothing else may be asserted on screen.

| # | Claim (screen-ready) | Evidence chain |
| - | -------------------- | -------------- |
| D1 | "We reproduced NASA's published spread rate from raw frames: 2.18 vs 2.1 mm/s (+4.0%)" | S5C1 anchors → `r4_tier1_anchors.json` S5; published: PSI-99 table row 2-5 (`ug_spread_rate_published`, INTERPRETED companion) |
| D2 | "And the second anchor: 2.64 vs 2.6 mm/s (+1.6%)" | S6C1 anchors → `r4_tier1_anchors.json` S6; table row 2-6 |
| D3 | "Every number traces to a source file and row — 10 published claims audited, zero unresolved chains" | `r4_tier3_provenance.json` (6 FULL / 4 PARTIAL / 0 FAIL) |
| D4 | "PDMS burns completely on Earth. In microgravity it ignites — and stalls. All four samples." | PSI-99 table rows 2-1..2-4 + imagery check (stall ×4) + review §16.1; engine TC-PDMS-01 CONTRADICTED |
| D5 | "Ask about 30% oxygen and the system refuses — naming the exact test NASA hasn't flown" | TC-PDMS-03 / TC-EXPLORATION-O2-01: refusal + missing_evidence + nearest_domain |
| D6 | "We blinded it to SAFFIRE-II entirely. It still called SIBAL right — and refused the four it couldn't know. Zero false supports." | `r4_holdout_stamp.json` (pre-reveal hashes) + `r4_tier2_holdout.json` |
| D7 | "The Nomex next to burning PMMA never ignited" | PSI-99 table row 2-7 note 2 + TC-NOMEX-01 |
| D8 | "A nitrogen jet — the suppressant — made flames stronger in 13 logged tests" | L1 store `test_observations` GN2/dilution rows + BASS review §7.3 |
| D9 | "Two flights, four studies, one clock: every image frame and sensor sample shares one epoch time base" | R1-FINDINGS Q1/Q2 (30.3 Hz, zero drift, 100% in-window) |
| D10 | "261 combustion runs, 19 material-family cells, 3,176 evidence items — every one with provenance" | `R2_CENSUS.md` + `exports/r2_exit_checks.txt` (19/19) |
| D11 | "It even refuses a whole study when the outcomes aren't held: BASS-II, structurally INSUFFICIENT" | TC-BASS2-FILM-01/ROD-01 + spec §2(a) |

## 5. The uncertainty story (judge language)

Every number on screen carries two things: where it came from, and how
wrong it could be. Where we calibrate by the burn traverse — the same
length-over-time derivation NASA's own table uses — our measurements land
within ±4% of published values. Where we assume image-width-equals-sample
instead, expect −13% to −20%: that is a scale-calibration systematic, not
tracking error, and every displayed rate is labeled with which calibration
it uses. Verdict confidence is four transparent dimensions (directness,
consistency, precision, class strength); single-run and single-condition
results are capped at MODERATE by rule. Text-mined operator logs count only
as NASA-log evidence, never as measurement. And when the engine refuses, it
shows what is missing and names the one test that would change its mind.

## 6. Next-experiment candidates (information-gap rationale)

Epistemic grid: 70 tested condition-cells across 13 families
(`R5_DIGEST_DATA.json`). Our INSUFFICIENT verdicts point at six empty
cells; ranked by program value:

**Flight-test candidates:**
1. **PDMS at >22.5% O₂, large duct** — unblocks TC-PDMS-03; the
   exploration-atmosphere question for the one family whose μg behavior
   most surprised NASA; current evidence is a refusal by total absence.
2. **Thick PMMA at >22.5% O₂, large duct** — unblocks TC-EXPLORATION-O2-01;
   same rationale; tests whether anchored regression persists in enriched
   air.
3. **SIBAL opposed low flow, large duct** — unblocks TC-SIBAL-SCALE-01;
   the direct small→large duct scale-transfer test of the quench boundary.

**Analysis priorities (data held, measurement pending):**
4. BASS-II per-run outcome extraction (upstream video) — unblocks an entire
   study (TC-BASS2-FILM/ROD).
5. S9C1 regression-rate measurement + S2C2 extinction check — converts two
   PARTIAL provenance chains to FULL.
6. Protocol-aware BASS outcome classification — resolves the wax
   mixed-outcome refusal (commanded-extinction vs failure-to-burn).

(Partial gravity stays a refusal: not a candidate until a partial-g
campaign exists.)

## 7. Limits and overclaim guardrails carried into the script

1. Never "first ever" — always "no evidence found" for prior-art gaps.
2. No safe/unsafe, no certification language; verdicts are evidence states.
3. BOUND ≠ flight MOC; single SAFFIRE-II condition is never a flight MOC.
4. Display flow ≠ calibrated velocity, on screen and in data.
5. PDMS ignition is telemetry/literature-sourced (imagery shows stall, not
   ignition) — phrase as "ignited (per telemetry) then stalled".
6. SAFFIRE-I S1 rate carries an inferred scale (+12.3% vs published band);
   label or omit.
7. Hold-out agreement is n=1 for transferable calls; the strong number is
   0/5 false-SUPPORTED, not the single agreement.
8. SoFIE and partial gravity: literature-only or refusal; never analyzed
   data.
9. All rates labeled with calibration method (traverse vs absolute-scale).
10. The engine refuses; the UI renders refusal as a first-class answer —
    never as an error or an empty state.

## 8. What this leaves for R6

Script points: D1–D11 are the demonstrable spine; the uncertainty story
(§5) is the PROOF beat; §6 items 1–3 are the SO WHAT beat. Developer
document: the data contract (R2), verdict semantics (R3 spec), and the
validation numbers the proof screens may cite (D1–D3, D6, D10).
