# SAME / PSI-102 data pipeline

GRAVIFIRE ingests the NASA PSI-102 Smoke and Aerosol Measurement Experiment Experimental Table as a separate scientific family.

`NASA PSI-102 → raw CSV → exact header parser → family-specific normalization → validation → provenance → generated SAME runs`

The source schema is `Sample #`, `Sample Material`, `Air Flow (cm/s)`, `Weight loss rate (mg/min)`, and `Aging Duration (minutes)`. `Air Flow (cm/s)` is explicitly labeled by NASA and is therefore retained as a physical `airflowCmS` measurement for SAME. This does not change the BASS-II rule that its `Air display` and `Fan display` remain raw fields.

The current local file produces the actual number of rows found by ingestion. Numeric values are parsed only when safely numeric; blanks and text remain represented by measurement status. Material normalization recognizes only explicit Teflon and Kapton text. Phrases such as “same conditions as 1-4” are preserved and do not copy values from other samples.

The source table does not provide detector response, particle size, smoke concentration, outcome, extinction, flame spread, pressure, or oxygen measurements. These are not populated. SAME remains separate from BASS-II in landscape, similarity, and scientific interpretation.

Run `pnpm ingest:same` to regenerate validated and rejected outputs plus the ingestion report. Rejected records never enter the application runtime dataset.
