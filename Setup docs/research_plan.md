# Research Plan — GRAVIFIRE

The phase-by-phase plan to *complete* the research and *understand* the
findings for this competition. Ordering and dependencies across all tracks
live in `roadmap.md`; this file is the research execution detail (phases
R0–R6). Written 2026-10-02 from the four deep-research reports
(`Gravifier_research/BASS-II/`), a local data audit of `psidata/`, and the
locked winner shape in `decision_gate.md §3`. No calendar dates — each
phase has entry and exit conditions instead.

---

## 1. What the literature already solved — and what it did not

The four reviews audited BASS-II (PSI-25), BASS (PSI-26), SAFFIRE-I (PSI-98),
SAFFIRE-II (PSI-99). Each ends with a gap map. Merged, they show one pattern.

### 1.1 Well solved per family (do not reinvent)

| Family | Established findings | Key sources |
| ------ | -------------------- | ----------- |
| BASS-II thin PMMA | radiative/thermal/kinetic spread regimes; low-flow radiative extinction | Bhattacharjee 2016 ×3 |
| BASS-II PMMA rods | quench vs blowoff boundary; Damkohler interpretation | Olson & Ferkul 2017 |
| BASS-II SIBAL | concurrent growth, spread, low-flow quenching | Zhao 2017 |
| BASS SIBAL | non-monotonic opposed-flow spread; low-flow quench | Ferkul 2012/2013 |
| BASS suppression | N2 jet can entrain air and *enhance* combustion | Takahashi 2013 |
| BASS spheres | thermal-history effects on thick spherical fuel | Endo 2020 |
| SAFFIRE-I | large concurrent flame reaches quasi-steady state; pyrolysis overshoot; confinement matters | Urban 2019, Li 2019, Olson 2023, Cui & Liao 2024 |
| SAFFIRE-II PDMS | all four coupons ignited but did not sustain propagation (ash role) | Niehaus 2015, Rojas-Alva 2022 |
| SAFFIRE-II SIBAL/PMMA/Nomex | scale-bridging spread; thick PMMA burns while flow on; Nomex non-propagation under adjacent PMMA flame | Li 2019, Olson & Jomaas 2019, Thomsen 2019 ×2 |
| All | threshold-based flame-front extraction and spread-rate measurement | every paper above |

### 1.2 Unsolved across all four reviews (the convergent gap)

1. **Evidence transfer.** No method exists for knowing when a result from one
   material, geometry, scale, duct, or gravity regime applies to another.
   SAFFIRE-II §33: "the persistent difficulty is evidence transfer."
2. **Uncertainty-aware measurement.** Published spread rates and fronts are
   deterministic thresholds. No archive-wide uncertainty propagates
   segmentation, calibration, and frame quality into derived quantities.
3. **Provenance and contradiction reconciliation.** Real unresolved conflicts
   exist in the archives (thickness unit cm-vs-mm; planned 30 vs as-flown
   25 cm/s; count-concept mismatches). Nothing exposes them.
4. **Negative and near-limit results as first-class data.** Non-propagation,
   failed ignition, quench — the boundary evidence — is scattered, not
   queryable.
5. **Next-experiment reasoning.** No BASS/SAFFIRE-specific system ranks
   candidate tests by uncertainty reduction or model discrimination.

Headline scope (gate-locked): gaps 1 + 2 as the product and its credibility
engine; gap 3 as infrastructure, gap 4 as fuel, gap 5 as a stub.

### 1.3 Prior-art guardrails (binding on us)

- NASA's active 2023–2026 project (PI Ya-Ting Liao) already does archive-scale
  image processing and partial-gravity meta-analysis. Prediction and
  cross-dataset extraction are occupied lanes.
- Full "do not reinvent" lists: BASS-II §14, BASS §16, SAFFIRE-I §21,
  SAFFIRE-II §28 of the respective reports.
- The reviews found **no evidence** of a cross-study verdict/applicability
  system, archive-wide uncertainty propagation, contradiction
  classification, or evidence-gap next-test selection on these datasets.
  "No evidence found" is a search result, not proof of absence.
- The cross-domain solution-type scan
  (`Gravifier_research/solution_prior_art_scan.md`) confirms: no exact match
  in any domain, but every component is mature elsewhere (SciFact claim
  verification, GRADE certainty grading, QSAR applicability domains,
  Kennedy–O'Hagan discrepancy, Bayesian experiment design, NASA-STD-7009
  credibility). We adapt, cite, and compose — only the composition on
  spacecraft fire archives claims openness.

---

## 2. The research problem we attack

Locked question (gate §3): *can Earth-based material flammability assumptions
be trusted under a given microgravity scenario?*

> **RQ0 (master).** For a given transfer claim — (material family, geometry,
> flow regime, oxygen regime, scale) + an Earth-test-based expectation — can
> the pooled microgravity evidence from BASS, BASS-II, SAFFIRE-I, SAFFIRE-II
> return a verdict **supported / contradicted / insufficient**, with every
> verdict traceable to primary evidence, carrying explicit confidence, and
> naming what would change it?

| Sub-RQ | Question | Feeds |
| ------ | -------- | ---- |
| RQ1 | Can the four archives be normalized into one family-aware evidence graph without destroying physics distinctions? | catalogue, dev doc |
| RQ2 | What verdict semantics make supported / contradicted / insufficient scientifically defensible? | verdict spec |
| RQ3 | How uncertain are the derived quantities verdicts rest on? | trust layer |
| RQ4 | Does the verdict system reproduce known science? | validation |
| RQ5 | Which untested condition would reduce uncertainty most? | extension stub |
| RQ6 | What do the results actually mean — what can we say, not say, and refuse to say? | findings digest → script |

---

## 3. Local data inventory (audited 2026-10-02)

| Dataset | Size | What is local | Key facts |
| ------- | ---- | ------------- | --------- |
| PSI-25 BASS-II | 56 MB | Experimental table CSV (129 rows: PI, test, sample, material, fan/air *display*, radiometer gain, frames, initial/final O2, CO2, CO); 144-page summary report; SRD; engineering + reference docs | No raw video/stills locally. Fan/Air display ≠ calibrated velocity. Raw video exists in PSI — selective pull only if RQ3 needs it. |
| PSI-26 BASS | 37 MB | Experimental table CSV (122 data rows); planned + as-run test matrices (XLSX); SRD/DLD; Ferkul fabric paper; engineering drawings; presentations | No raw imagery locally. |
| PSI-98 SAFFIRE-I | 12 GB | 61 zips: per-camera JPEG/TIFF archives (S1C1…F2C2), distortion grids, ROI/offset references, image-directory XLSX, Sample-2 sensor TM workbook | 2 combustion runs; richness is time-series. Sensor coverage beyond Sample 2 needs the R1 audit. |
| PSI-99 SAFFIRE-II | 16 GB | 185 zips + 9 per-sample sensor workbooks (11 sheets each incl. **Calibrated Data**), telemetry XLSX, per-sample TM graphs, stitched CO2 PDF, operations PDF, SFS-W-009 TC-height nonconformance PDF | The multimodal backbone; the nonconformance PDF is ready-made provenance evidence. |

Audit findings that shape the method: SAFFIRE image filenames embed Unix
epoch-ms timestamps (the synchronization key); keep TIFF/raw zipped and
extract mapped JPEGs for anchor runs only (S5, S9, S1–S4 PDMS, SAFFIRE-I S1).

---

## 4. Method — the evidence system in one page

Four layers:

```text
L1 Evidence items (EI)
    {source file, run id, study, family, variable, value, unit,
     evidence class, uncertainty, applicability domain}
    evidence class ∈ MEASURED | DERIVED | MODELED | INTERPRETED | OPEN
L2 Transfer claims (TC)
    {family, geometry class, flow regime, O2 regime, scale class,
     earth-based expectation, expectation source}
L3 Verdict engine
    TC × EI-pool → verdict + confidence + evidence list + distance-to-domain
    SUPPORTED | CONTRADICTED | INSUFFICIENT (+ BOUND / PASS-FAIL tags)
L4 Gap layer
    epistemic-state grid over (family × condition × geometry);
    next-experiment ranking from model disagreement + sparsity
```

Verdict semantics sketch (starting point, frozen in R3): SUPPORTED needs
in-domain μg MEASURED/DERIVED confirmation without unresolved contradiction;
CONTRADICTED needs an in-domain opposite MEASURED result *after* the conflict
check classifies it a true contradiction; INSUFFICIENT covers no in-domain
evidence, model-only support, unresolved conflicts, and out-of-domain
queries. Threshold-like results carry grades EXACT / BOUND / PASS-FAIL /
ESTIMATE / HYPOTHESIS — a single SAFFIRE-II condition is never a flight MOC.

Conflict taxonomy: TRUE_CONTRADICTION | CONTEXT_DIFFERENCE | SCHEMA_ERROR |
UNRESOLVED — classified, never silently resolved; both provenance chains kept.

Family registry: join only through material identity, dimensions, geometry
class, direction, calibrated flow (where verified), O2, timestamps,
image-derived fronts (with method metadata). Never pool display vs
calibrated flow; rod vs sheet vs sphere vs candle outcomes; small vs large
duct without confinement geometry; fresh vs preheated samples; planned vs
as-flown values.

---

## 5. Research phases R0–R6

Each phase: entry condition, work, exit condition (the gate question), and
an **understanding deliverable** — what we must be able to *say* afterward.
This is where findings become comprehension, not just output.

### R0 — Foundations (COMPLETE, 2026-10-02)

Four family reviews; solution-type prior-art scan; winner shape locked;
data audit; this plan. Understanding delivered: the convergent gap, the
occupied lanes, the transfer dimensions, and the worked verdict examples
(PDMS contradicted; SIBAL supported-but-scale-bound; exploration
atmospheres insufficient).

### R1 — Interrogate the data (feasibility) (COMPLETE, 2026-10-02)

- **Entry:** R0 + working environment (venv, pandas/openpyxl).
- **Work:** answer the five questions — (1) do the 9 PSI-99 sensor workbooks
  + PSI-98 telemetry parse into one time-series schema; (2) do image
  epoch-ms timestamps align with sensor time bases; (3) what sensor coverage
  does PSI-98 have beyond Sample 2; (4) does the S5 anchor reproduce
  (~0.21 cm/s from mapped JPEGs); (5) do the 129 + 122 table rows clean
  into an evidence store without silent conversions.
- **Exit:** each question has a documented answer + a go/no-go; the gap-2
  branch is chosen (full measurement uncertainty vs run-count + literature
  spread fallback).
- **Understanding deliverable:** the possibility map — what this data can
  and cannot support, in one page. This is Elias's "whole idea about what
  is possible and what not," made concrete.
- **Result:** 4 GO + 1 bounded no-go (PSI-98 Sample-1 sensor files dead
  NASA-side). Gap-2 branch = FULL measurement uncertainty. Findings,
  evidence, and scripts: `Gravifier_research/R1_data_interrogation/`
  (`R1_FINDINGS.md`). Run key = study + As Run Test #; channel join =
  name-based; S5 anchor 2.04 mm/s vs 2.1 published (−3.1%).

### R2 — Build the evidence base (COMPLETE, 2026-10-02)

- **Entry:** R1 go decisions.
- **Work:** full ingestion (both experimental tables, as-run matrix, nine
  sensor workbooks, telemetry, both MergeResult image directories);
  L1 store in SQLite + JSON export (the data contract); family registry;
  source-string preservation for every normalized value; anchor image sets
  extracted.
- **Exit:** row-count reconciliation against the reviews' audited counts;
  zero silent unit conversions (spot-check passes); every row carries
  source file + row provenance.
- **Understanding deliverable:** the evidence census — how many runs,
  families, conditions, and modalities we actually hold, and where it is
  thin (the input to the gap layer and the script's honesty about scope).
- **Result:** store live at `Gravifier_research/evidence_store/`
  (`gravifire_l1.db`, 275 runs, 3,185 evidence items, 11 series, 26 image
  sets, 118,938 anchor frames in 9 sets; 19/19 exit checks). Census + thin
  spots: `evidence_store/R2_CENSUS.md`. Data contract draft:
  `evidence_store/exports/data_contract.json`. Notable finds: BASS as-run
  matrix carries measured O2/pressure/CO2 + free-text outcomes for 116/121
  runs (negative-result fuel is queryable); PSI-99 source defect — the
  published μg rates sit in the "Spread Length" column (flagged + INTERPRETED
  companion item, never silently renamed); BASS as-run numbers collide
  (rerun pairs + numbering reset; suffix + DUPLICATE_ASRUN_KEY).

### R3 — Design + exercise the verdict engine (COMPLETE, 2026-10-02)

- **Entry:** R2 store live.
- **Work:** freeze `verdict_spec.md` (claim grammar, evidence classes,
  GRADE-adapted confidence dimensions, conflict taxonomy, evidence grades,
  refusal semantics, NASA-STD-7009 mappings); implement the engine;
  run 15–20 seed transfer claims (all four SAFFIRE-II families + one
  BASS-II + one BASS); write the scenario input spec (D6).
- **Exit:** every verdict carries an evidence list + confidence; every
  INSUFFICIENT names the missing evidence type; seed claims reviewed
  against the literature (no verdict contradicts a published finding
  without a conflict-classification reason).
- **Understanding deliverable:** the verdict review session — read each
  seed verdict aloud, ask "would a NASA fire-safety engineer accept this
  reasoning?"; fix what wouldn't survive that question.
- **Result:** engine v1.1 live in `Gravifier_research/verdict_engine/`
  (spec FROZEN v1.1 with one logged amendment: PRIMARY_OPERATOR_LOG text
  counts as confirmatory). 18 seed claims: 4 SUPPORTED / 5 CONTRADICTED /
  9 INSUFFICIENT (4 refusals), **18/18 literature concordance**, all
  structural checks PASS (`run_r3.py`; outputs in `outputs/`). Review
  session found and fixed 3 real defects (store geometry bug, O2 bucket
  boundary + bare-number parse, unstructured conflict register) plus 2
  expectation corrections where the engine was right (low-flow quench
  CONTRADICTED; protocol-confounded wax refusal) — `VERDICT_REVIEW.md`.
  Scenario spec D6: `scenario_input_spec.md` with the 4-scenario demo pack.

### R4 — Validate (COMPLETE, 2026-10-02)

- **Entry:** R3 frozen.
- **Work:** Tier 1 anchor reproduction (S5 ≈ 0.21 cm/s, S6 ≈ 0.26 cm/s,
  SAFFIRE-I S1 ≈ 1.7–1.8 mm/s if imagery permits, PDMS stall qualitative);
  Tier 2 blind hold-out (rules built from BASS + BASS-II + SAFFIRE-I only,
  SAFFIRE-II outcomes concealed, version-stamped before reveal);
  Tier 3 provenance audit (10 published claims end to end). Metrics:
  verdict agreement, false-SUPPORTED rate, calibration, reproduction
  coverage, provenance resolution rate.
- **Exit:** validation report with honest numbers, including failures.
- **Understanding deliverable:** the credibility statement — precisely how
  trustworthy the system is, where it fails, and why that failure profile
  is acceptable (or what we changed).
- **Result:** `verdict_engine/R4_VALIDATION_REPORT.md`. Tier 1: S5 Theil–Sen
  2.18 (+4.0%), S6 2.64 (+1.6%), S1-I 1.96 (+12.3%, scale inferred),
  PDMS stall ×4 confirmed; scale systematic −13..−20% named as dominant
  error term (ROI PDFs dead upstream). Tier 2 (hash-stamped, git 2a86093):
  **0/5 false-SUPPORTED**, 1/1 agreement on the transferable claim
  (SIBAL SUPPORTED/HIGH blind = truth), 4/4 correct refusals, 0 misses.
  Tier 3: 6 FULL / 4 PARTIAL / 0 FAIL (100% chain resolution). Credibility
  statement: failure profile is Type-II-conservative throughout — the
  system never overclaims; that is the acceptable profile for a
  spacecraft fire-safety trust tool.

### R5 — Synthesize + understand (feeds the script directly) (COMPLETE, 2026-10-02)

- **Entry:** R4 report exists.
- **Work:** write the findings digest:
  - per-claim verdict table with interpretation;
  - **what we can say / what we cannot say / what we refuse to say**;
  - the demonstrable-claims list (what may appear in the video);
  - the uncertainty story in judge-language;
  - next-experiment candidates with their information-gap rationale;
  - limits and overclaim guardrails carried into the script.
- **Exit:** digest passes the gate; every demonstrable claim cites its
  evidence chain.
- **Understanding deliverable:** this phase *is* the understanding
  deliverable — the document Elias reads to know what we discovered.
- **Result:** `Gravifier_research/R5_FINDINGS_DIGEST.md` (+ machine-readable
  `R5_DIGEST_DATA.json`: 18-claim table, blind rows, 70-cell epistemic
  grid, next-experiment ranking). 11 demonstrable claims D1–D11, each
  verified against its artifact by `verdict_engine/scripts/r5_exit_checks.py`
  (26/26 PASS — every cited number matches its source). Next-experiment
  layer: 3 flight-test candidates (PDMS/PMMA-thick at >22.5% O₂; SIBAL
  opposed large-duct) + 3 analysis priorities (BASS-II outcomes, S9/S2
  imagery passes, protocol-aware text). 10 script guardrails frozen. R6
  (translate: script + developer document) unblocked.

### R6 — Translate (COMPLETE, 2026-10-02)

- **Entry:** R5 approved (script v2 path) or R3 complete (earlier draft
  path, per roadmap §4 script versions).
- **Work:** script points → full video script (beat table, 15-second wow,
  memory line, WHO→WHY→WHAT→HOW→PROOF→SO WHAT); the developer document
  (screen specs, data contract, verdict semantics, no-fake-numbers rule,
  provenance rules, validation numbers the proof screens may cite).
- **Exit:** script passes the gate; developer document accepted by the
  developer.
- **Understanding deliverable:** none — this is output, and it ends the
  research track.
- **Result:** `Gravifier_research/R6_TRANSLATION/`. Video script v2
  (240 s, 13-beat table with claim-map to D1–D11, protected 15-second wow,
  clean-read narration ≈500 words, honesty labels for pre-B3 screens);
  developer document v1.0 (7 screen specs, engine call contract, complete
  citable-numbers list, 10 binding UI rules, SC-DEMO-1..4 pack, B1→B2→B3
  mapping). Exit checks 26/26 (`r6_exit_checks.py`: beat sourcing, number
  matching, pitch order, style guardrails). Gate: script FOCUS; dev doc
  ready for developer acceptance (B0 onboarding pending). **Research track
  R0–R6 complete.**

---

## 6. Standing traps (recheck at every phase exit)

- Temporally adjacent frames are not independent replicates.
- Planned ≠ as-flown; both fields always live.
- Fan/Air display ≠ calibrated velocity.
- PSI-98 thickness: source value + unit + `UNIT_CONFLICT` flag.
- F1/F2 flow-visualization records are not combustion runs.
- Families never merge on shared material label alone.
- SoFIE is literature-only context, never "analyzed data".
- All novelty phrasing keeps "no evidence found" qualifiers.

## 7. Ordering

Dates and cross-track dependencies live in `roadmap.md` (dependency-based,
no dates; deadlines in `strategy_agenda.md §1`). Rule if scope must shrink:
cut seed-claim breadth — never the hold-out, the anchors, or the provenance
discipline.

## 8. What this plan deliberately does not do

No flame-behavior predictor, no partial-gravity extrapolation, no new
physics model, no chatbot/AR/3D, no universal safe/unsafe classifier, no
pooling that breaks family boundaries. Gate verdicts for any addition get
logged before the work starts.
