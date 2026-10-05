# R1 Findings — Interrogate the Data (COMPLETE, 2026-10-02)

The R1 feasibility sprint of `Setup docs/research_plan.md §5`. Five questions,
five documented answers, one branch decision. All scripts in `scripts/`, all
outputs in `outputs/` of this folder. Environment: uv venv (Python 3.11.16,
pandas 3.0.6, openpyxl 3.1.5, pillow 12.3.0) at repo root.

## Verdict table

| Q | Question | Answer | Go/no-go |
| - | -------- | ------ | -------- |
| Q1 | Sensor workbooks + telemetry → one time-series schema? | Yes. All 9 PSI-99 workbooks share an identical 65-channel schema; PSI-98 Sample-2 matches by name (not position) + 4 extra derived front channels; telemetry joins on epoch-ms | **GO** |
| Q2 | Image epoch-ms aligns with sensor time bases? | Yes. 100% of sampled frames (PSI-98 S2C1/C2 zips, PSI-98 Camera Data sheet, PSI-99 S5C1 zips) fall inside their sensor windows on one shared epoch reference; 30.3 fps; cameras start +55–58 s after sensor t0 | **GO** |
| Q3 | PSI-98 sensor coverage beyond Sample 2? | Upstream has a Sample-1 sensor workbook + telemetry "Good Process Version" — both 404 (NASA-side dead, in `psidata/dead_files.txt`). Sample 1 = imagery + literature only; sensor time-series impossible for S1 | **NO-GO for S1 sensors; bounded, not blocking** |
| Q4 | S5 anchor reproduces? | Yes. Traverse-calibrated 2.04 mm/s vs published 2.1 (−3.1%); absolute-scale variant 1.83 (−13%, scale-bound); acceleratory phase pattern matches Li 2019 | **GO** |
| Q5 | Experimental tables clean into evidence store? | Yes. 129/129 (BASS-II) + 122/122 (BASS) rows reconcile, zero silent conversions, 2,418 flagged evidence rows; canonical run key = As Run Test # | **GO** |

**Gap-2 branch decision: FULL measurement-uncertainty path** (not the
run-count + literature-spread fallback). The anchor reproduced, epochs align,
and per-frame quality flags (NO_FLAME / SATURATED / OK) give an honest
uncertainty basis. The fallback stays documented as the contingency if R2
finds the other anchors unreproducible.

## The possibility map (what this data can and cannot support)

**Can support (evidence-backed):**
- Verdicts over SAFFIRE-II: all 9 samples have 30 Hz calibrated sensor
  streams (O2, CO2, radiometers, 6 plume + 6 sample TCs, anemometers,
  pressure) + 30 fps mapped imagery on one time base.
- Verdicts over SAFFIRE-I: Sample 2 fully covered (sensors + 2 cameras +
  derived Up/Downstream Front/Back channels). Sample 1: imagery + published
  values only.
- Image-derived spread rates for every SAFFIRE sample with mapped JPEGs
  (front tracker works; S5 proven, S6/S9/S1–S4 next).
- Run-condition evidence for all 251 BASS/BASS-II tests (flow display
  sequences, O2/CO2/CO before/after, frame counts) with per-cell flags —
  enough for BOUND-grade and count-based claims, not for per-run μg
  measurement (no per-run video held locally; selective pulls possible but
  sized in GB per test).
- A real experiment timeline: SAFFIRE-I June 14 2016 20:55 UTC; SAFFIRE-II
  Nov 21/22 2016 23:27→02:26 UTC, nine contiguous sample windows.

**Cannot support (refusal territory):**
- SAFFIRE-I Sample-1 sensor claims (dead links) — cite literature instead.
- Calibrated flow velocity for BASS/BASS-II runs (display ≠ calibrated,
  no converter in the archive) — keep as display fields.
- Any per-frame "measurement" during camera saturation ramps (2,072 of
  9,600 S5 frames) — those carry exclusion flags, never interpolated.
- Partial-gravity or non-tested-material verdicts (no evidence in these
  four datasets; SoFIE remains literature-only).

## Per-question evidence

### Q1 — one time-series schema (GO)
- 9 × PSI-99 'Calibrated Data' sheets: identical 65 columns (name+unit
  header pair), 30.3 Hz, epoch-vs-elapsed drift 0.0 ms in every workbook.
- PSI-98 Sample-2 workbook: 69 channels = same 65 by name (column order
  differs; join by name, never position) + `Upstream/Downstream Front/Back`
  derived front-position channels + 'Camera Data' sheet with per-frame
  epoch-ms, exposure, gain.
- Telemetry (`Saffire-II Telemetry Data.xlsx`): SaffireData 1 Hz × 10,000 s
  spans all nine sample windows; RawData CygnusTimestamp is ~95% sane with
  garbage in the pre-test padding rows (flag, don't repair); embedded
  "Dummy data for line" block exists in CygnusPressureData (flagged).
- Known caveats carried forward: PSI-98 Sample-2 epoch column is 39%
  missing (recoverable from elapsed time — as DERIVED, flagged);
  workbook human timestamps are EST; epoch-ms is UTC.

### Q2 — time alignment (GO)
- Every frame of PSI-98 S2C1 (4,550) and S2C2 (4,614) JPEGs: 100.00%
  inside the Sample-2 sensor window; Camera Data sheet 18,150 rows also
  100% in-window (zips hold a subset of logged frames; heads differ by
  ≤3.07 s — subset selection, not a time-base conflict).
- PSI-99 S5C1 mapped JPEGs (9,600): 99.99% in the S5 sensor window,
  +55 s camera lead, same 33 ms cadence.

### Q3 — PSI-98 sensor coverage beyond Sample 2 (bounded NO-GO)
- Upstream manifest: `Saffire-I Sample 1 Sensor Data Complete TM graphs.xlsx`
  (25.1 MB), `Saffire-I Telemetry Data Good Process Version.xlsx` (2.8 MB),
  `Saffire I Sample 1 TM graphs.docx` (1.4 MB) — all presign OK, S3 404.
  Already in `psidata/dead_files.txt` from earlier full-run attempts.
- Consequence: SAFFIRE-I S1 sensor evidence class = INTERPRETED (literature)
  or image-derived; never MEASURED-sensor.

### Q4 — S5 anchor (GO)
- Front tracker on 9,600 mapped S5C1 JPEGs (strip rows 46–152, per-column
  P98 brightness, adaptive threshold 0.45×P95 with floor 25, leftmost flame
  column = leading edge; SATURATED/NO_FLAME frames excluded).
- Burn window t=0.2–142.7 s (3,365 usable frames).
- Results: absolute-scale fit 1.83 ± 0.01 mm/s (R²=0.86, assumes 650 px =
  29 cm); traverse-calibrated 2.04 mm/s (same length-over-time derivation
  as the published value) vs published 2.1 mm/s → −3.1%. Phase rates
  early 0–40 s ≈ 1.2, late 60–130 s ≈ 2.5 mm/s → acceleratory, matching
  Li 2019 and the table's "Acceleratory".
- Named R2 task: pin px/cm from the ROI/distortion-grid reference docs —
  the −13% vs −3% spread is scale calibration, not tracking error.
- Frame-quality census (becomes the uncertainty input): OK 6877, SATURATED
  2072, NO_FLAME 651.

### Q5 — evidence store from tables (GO)
- Reconciliation: BASS-II 129/129, BASS 122/122; 2,418 evidence rows with
  source-file + source-row provenance and raw-string preservation.
- Flag census: 196 MULTI_VALUE fan/air sequences, 273 NON_NUMERIC_IN_SEQ,
  123 SEQ_HAS_TEXT, 46 PAREN_ANNOTATION, 44 NON_NUMERIC, 38 MISSING,
  13 NEGATIVE_RAW, 9 GMT-vs-date mismatches (real source inconsistencies,
  carried as flags), 1 NOT_A_TEST ("SOOT Cleaning"), 1 TEST_NUMBER_FROM_ASRUN.
- Families: BASS-II {rods 54, SIBAL 27, thin film 22, slabs 20, Nomex 3,
  spherical sections 2, wax 1}; BASS {spheres 50, slabs 28, wax 18, SIBAL
  12, Nomex 6, candles 5, Ultem 2, housekeeping 1}.
- Canonical run key: **study + As Run Test #** (BASS planned Test # recycles
  across 2012/2013 campaigns: 53, 75, 114, 118 collide with different
  materials). BASS-II Test # is unique per PI. Planned ≠ as-flown both kept.
- GMT column = day-of-year (verified 245/251 rows; the 9 mismatches flagged).

## What this decides downstream

- R2 proceeds with the SQLite L1 store keyed on (study, run_key) with the
  name-based channel map from Q1 and the flag vocabulary from Q5.
- The verdict engine can promise image-derived spread rates for SAFFIRE
  samples with local mapped JPEGs, sensor-backed condition context, and
  BOUND-grade aggregation for BASS/BASS-II — the honest three-tier evidence
  base the winner shape needs.
- The S5 anchor becomes the demo-able proof that our measurement pipeline
  reproduces published NASA numbers (validation story, dev doc PROOF beat).
