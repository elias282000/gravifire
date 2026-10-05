# SPICE / PSI-107 data pipeline

GRAVIFIRE ingests the local NASA PSI-107 Experimental Table as an evidence source for the Smoke Point In Co-flow Experiment.

## Source and record meaning

The source has nine columns: `GMT date`, `GMT ignition`, `GMT  Flame Off `, `Fuel`, `Nozzle (mm)`, `Fuel Rate (sccm)`, `Fuel Rate (mg/s)`, `HC Fuel Rate (mg/s)`, and `Air Rate (cm/s)`. Raw header spacing and raw cell text are preserved. The current artifact contains 469 rows.

These rows are classified as `OPERATING_CONDITION_OBSERVATION`. They are not NASA test identifiers, independent flame records, or smoke-point results. Multiple rows can share an ignition/Flame Off interval while flow conditions change, and exact duplicate rows are retained with source-row provenance. GRAVIFIRE therefore creates no SPICE run records and does not infer flame sessions.

The PSI investigation page reports 526 flames. That count is retained as a separate scope fact; it is not reconciled with the 469 table rows.

## Normalization

Pure source labels normalize conservatively to PROPYLENE, PROPANE, ETHYLENE, and METHANE. `50 % Propylene`, `75 % Propylene`, and `75% Propylene` are represented as propylene/nitrogen mixture concepts using separate literature semantic context: the percentages are by volume. Raw labels remain unchanged.

Nozzle values remain exact source values. Fuel Rate, HC Fuel Rate, and Air Rate preserve numeric zero, blanks, and negative source values distinctly. Negative Air Rate values are retained and flagged for source review; they are not clamped or made positive.

GMT date is stored as a source-label-only value. Ignition and Flame Off retain raw strings and use conservative statuses for colon times, dot-separated times, four-digit time-like strings, text statuses such as `LOS`, `Ku LOS`, and `no ku`, and blanks. No source-reported burn duration is derived.

## Evidence boundary

The current table does not contain smoke-point labels, soot-onset values, flame length, soot emission, flame temperature, radiation, or a soot/no-soot outcome. Scientific publication findings, images, videos, and analyzed smoke-point results must be ingested separately as document or media evidence.

The optional future view is **SPICE Operating-Point Coverage**. It must remain an evidence-coverage view, not a smoke-point map, classifier, or prediction model.

## Reproducibility

`pnpm ingest:spice` hashes the local source, preserves all rows, classifies each record, writes `observations.json`, `rejected-records.json`, and `ingestion-report.json`, and reports duplicate patterns, missing fields, time statuses, fuel normalization, and source-scope differences. Internal IDs such as `spice-observation-000001` are GRAVIFIRE IDs, not NASA test numbers.
