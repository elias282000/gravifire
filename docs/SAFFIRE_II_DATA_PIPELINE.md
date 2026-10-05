# SAFFIRE-II / PSI-99 data pipeline

GRAVIFIRE ingests the locally downloaded NASA PSI-99 Experimental Table as the authoritative artifact for this build:

`NASA PSI-99 Experimental Table -> exact parser -> row classification -> normalization -> validation -> provenance -> generated records`

## Source and scope

- Investigation: SAFFIRE-II / PSI-99
- Source: NASA Physical Sciences Informatics
- Official investigation page: https://psi.nasa.gov/physci/repo/data/investigations/PSI-99
- Runtime source scope: the local CSV in `src/data/nasa/raw/saffire-ii/`

The pipeline does not claim that the local file is the complete NASA archive. It reports only what has been ingested into GRAVIFIRE.

## Exact source schema

The parser recognizes the source headers after removing a UTF-8 BOM and trimming surrounding whitespace. It preserves the source spelling `Samle Thickness` and the literal headers `?-g Burn Length` and `?-g Spread Length` in raw records and provenance.

Rows are classified separately as combustion experiments, pre-test flow visualization records, source notes, empty rows, or unknown records. Pre-test rows and notes never enter the combustion run collection.

## Measurement semantics

Numeric cells are parsed only when their complete trimmed value is safely numeric. Blank cells remain not reported. `Insignificant` remains a text status rather than zero seconds. `n/a` remains not applicable. `See Fig. 5` remains a reference note.

Percent O2 values are derived-source measurements because Note 1 states that they are derived from measured CO2 production and referenced to initial ISS O2. Approximate values such as `~ 21.5` remain approximate; ranges such as `22.1 to 22.0` retain both endpoints and their original order. No midpoint is created.

Physical airflow is supported for SAFFIRE-II because the source explicitly labels `Air Flow (cm/s)`. This family-specific interpretation must not be copied to BASS-II's `Air display` field.

## Low-g and 1-g separation

The `?-g` headers are preserved exactly. Internal low-g field names are documented semantic labels, not a correction of the damaged source symbol. The `1-g Burn Length` and `1-g Spread Rate` fields are stored under `normalGravityReference` and are never mixed with in-flight low-g measurements.

The source places values with `mm/s` units in the `?-g Spread Length` column for some rows. GRAVIFIRE preserves those values and records a `SOURCE_SCHEMA_UNIT_MISMATCH` warning rather than silently renaming the field.

## Ambiguous and composite values

`037 mm` is retained as raw text with `REVIEW_REQUIRED` status and no numeric value. It is not converted to `0.37 mm`. Blank material fields remain missing and are never inherited from an adjacent row.

Sample 2-7 is represented as a multi-material configuration. Its PMMA/Nomex component pairing follows positional correspondence in the source strings and is explicitly documented in the record; the raw source remains authoritative. Note 2 is linked only to Sample 2-7 and preserves the component-specific observations.

Notes 1–4 are first-class source evidence with their own row provenance and explicit run/field links. Note 3 qualifies a visible-damage length, and Note 4 preserves the anchored-flame statement and the `0.01 to 0.04 mm/s` regression-rate range without generalizing it.

Camera values are identifiers only. They do not create media assets until matching NASA files are separately ingested. Suspicious-looking identifiers are preserved exactly.

## Current limitations

The generated dataset currently contains the Experimental Table, its pre-test references, and its source notes. Camera media, raw sensor time series, detailed gas time series, full science-report interpretation, engineering telemetry, and independently validated causal relationships are not yet ingested into GRAVIFIRE.

The table records conditions and comparison fields. It does not by itself explain why samples behaved differently or assign a validated combustion outcome.
