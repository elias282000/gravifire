# SAME-R / SAME-2 / PSI-101 data pipeline

`NASA PSI-101 Experimental Table -> exact parser -> normalization -> composite identity validation -> provenance -> GRAVIFIRE`

## Source

The locally downloaded `PSI-101_Experimental table_SAME-R.csv` is the authoritative artifact for this milestone. The official investigation page is https://psi.nasa.gov/physci/repo/data/investigations/PSI-101.

The table contains 109 rows and five raw Sample Type values: Kapton, Silicone, Lampwick, Pyrell, and Teflon. Raw values remain preserved. Normalized material names are conservative display groupings only.

## Composite identity

`SAME Test #` is preserved as `sourceExperimentId`, but it is not unique. Test 57 appears for both Lampwick and Teflon. Runtime identity therefore uses `sourceRunKey`, such as `LAMPWICK::57` and `TEFLON::57`, and routes use stable internal IDs such as `same-r-lampwick-57`.

The application does not merge duplicate source IDs or choose one when a query asks about Test 57 without material scope.

## Measurement semantics

Inlet velocity is an explicit physical field. Zero is preserved as numeric `0 cm/s` and may be displayed descriptively as `ZERO_FLOW_CONFIGURATION`; it is not treated as missing.

`Rt/R0` is preserved as a dimensionless source parameter with `SOURCE_LABEL_ONLY` interpretation. GRAVIFIRE does not call it a temperature, resistance, or heating ratio without an authoritative definition source.

Blank duration and timing cells are `NOT_REPORTED_IN_SOURCE`. `n/a` in Net aging time is `NOT_APPLICABLE`, not zero. Dates retain day-month precision because the table does not provide a year.

Description text is preserved exactly. Tags such as `AGING_REFERENCED`, `STS_REFERENCED`, `NO_FLOW_REFERENCED`, and `BASELINE_REFERENCED` are text-derived descriptors, not scientific outcomes. STS text does not create detector-trigger results.

An `a` suffix is not automatically treated as a verified parent-child relation. No automatic relation output is generated unless a future source supports it.

## Evidence boundary

The current dataset contains experimental configuration and timing metadata only. Particle-size distributions, aging/flow publication results, TEM morphology, MPASS results, STS detector responses, alarm behavior, and concentration values are not copied into these rows. They require separate document or evidence ingestion with independent provenance.

The SAME/SAME-R comparison page compares data availability only. It does not join rows across investigations or rank scientific performance.
