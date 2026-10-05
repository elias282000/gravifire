# SAFFIRE-I / PSI-98 data pipeline

GRAVIFIRE ingests the NASA PSI-98 SAFFIRE-I Experimental Table as a family-specific dataset:

`NASA PSI-98 → raw CSV → exact parser → record classification → normalization → validation → provenance → GRAVIFIRE`

The exact table fields are Sample Number, Material, Sample Thickness (cm), Sample Length (cm), Sample Width (cm), Air Flow (cm/s), Percent O2, Ignition Power (W), Ignition Time (s), Burn Time (s), Flow Direction, Camera 1, and Camera 2.

Rows S1 and S2 are combustion experiment records. Rows explicitly labelled pre-test flow visualization are retained in `pretest-records.json` and are not counted as combustion runs. Empty rows are diagnosed and ignored. Unknown classifications are preserved as rejected diagnostics.

SAFFIRE-I explicitly labels Air Flow (cm/s), so it is stored as a verified physical airflow measurement. Oxygen ranges such as `21.5 - 21.7` remain `RANGE`; approximate values such as `~ 21.5` remain `APPROXIMATE`. No midpoint is created by default. Burn time remains a source timing field and does not create an outcome category.

Camera values are identifiers only. They do not create media assets. Raw camera media, temperature and pressure time series, detailed gas time series, flame-growth measurements, and report interpretation remain not yet ingested into GRAVIFIRE.

Run `pnpm ingest:saffire-i` to regenerate validated combustion records, pre-test records, rejected diagnostics, and the ingestion report.
