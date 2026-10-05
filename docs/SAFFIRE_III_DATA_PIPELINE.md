# SAFFIRE-III / PSI-100 data pipeline

`NASA PSI-100 Experimental Table -> exact parser -> family-specific normalization -> validation -> provenance -> GRAVIFIRE`

## Primary source

GRAVIFIRE uses the locally downloaded `PSI-100_Experimental table_SAFFIRE-3.csv` as the authoritative primary artifact for this milestone. The official investigation page is https://psi.nasa.gov/physci/repo/data/investigations/PSI-100.

The parser preserves the exact source headers, including trailing whitespace in `Sample Number ` and `Air Flow `. It also preserves the raw row snapshot. Internal matching trims headers only; it never changes the stored source artifact.

The current table produces two configuration/combustion records: S1 and S2. It has no pre-test rows, source-note rows, or empty rows. Counts are calculated during ingestion.

## Supported fields

The table provides SIBAL Fabric, `.33 cm`, `94 cm`, `40.6 cm`, `30 cm/s`, Concurrent/Opposed direction, and camera identifiers. SIBAL Fabric is conservatively normalized to `SIBAL`.

Thickness, geometry, and airflow retain raw values, parsed values, source units, and deterministic local conversions. `.33 cm` is represented as 0.33 cm and 3.3 mm by conversion from the local CSV; this does not resolve the separate NASA literature context reporting approximately 0.33 mm.

Oxygen, ignition, burn-time, flame-spread, burn-length, pressure, CO2, temperature, outcome, radiometer, and sensor time-series fields are not reported in this current source. They are not copied from SAFFIRE-I or SAFFIRE-II.

## Unresolved source conflicts

External NASA context is stored separately from the primary PSI table:

- Thickness: PSI-100 `.33 cm` versus approximately `0.33 mm` in separate Saffire technical literature.
- Airflow: PSI-100 `30 cm/s` versus `25 cm/s` in later selected-results context.
- Length semantics: PSI-100 `94 cm` sample geometry versus an external approximately `10 cm` selected/burned quantity that may describe a different concept.

GRAVIFIRE does not call either source wrong, average values, or overwrite the primary table. Flight Recorder decisions record `DO_NOT_RECONCILE_THICKNESS`, `DO_NOT_RECONCILE_AIRFLOW`, and `DO_NOT_RECONCILE_SAMPLE_LENGTH`.

## Evidence boundaries

Camera values such as S1C1 and S2C2 are identifiers only. They do not create media assets. The run page distinguishes the primary ingested PSI source from external NASA context. Challenge My Science reports source conflicts and missing measurements without downgrading the authenticity of the PSI records.

The SAFFIRE family comparison is descriptive data availability only. It is not a performance ranking, causal analysis, or Fire Safety Chain.
