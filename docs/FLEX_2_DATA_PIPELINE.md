# FLEX-2 / PSI-68 data pipeline

GRAVIFIRE ingests `PSI-68_Experimental table_Flex2.csv` as a NASA configuration-envelope source. Its eight rows are classified as `EXPERIMENT_CONFIGURATION_ENVELOPE`, not `NASAExperimentRun` records.

The source provides fuel/configuration entries for pure and mixture fuels, initial droplet diameter range, alternative gas mixtures, discrete oxygen and pressure options, temperature, and flow range. It does not provide individual test identifiers, dates, run results, burn time, extinction, soot, or burning-rate measurements.

## Identity and provenance

Each record receives a GRAVIFIRE internal slug such as `flex2-isooctane-pure`. These are application IDs, not NASA test identifiers. Raw headers, source row, source file, SHA-256, source URL, parser version, and normalizer version are preserved.

## Conservative semantics

- `1.5 - 5` is a range, not a midpoint or a set of synthetic droplets;
- `0.17; 0.21;0.25; 0.3` is a discrete option set, not a continuous interval;
- pressure options remain discrete atm values;
- `O2/N2 or O2/He` remains two alternative gas configurations;
- `0.1 - 5` cm/s remains a flow envelope;
- mixture percentages have unspecified mole/mass/volume basis;
- no Cartesian product is expanded;
- no outcome, extinction, soot, or burning-rate value is generated.

## Runtime separation

FLEX-2 configurations are loaded through `nasaExperimentConfigurations`, never into `nasaExperimentRuns`. The FLEX / PSI-69 run-result table and FLEX-2 configuration table are compared only at the data-availability level. Shared fuel names do not create run joins or experiment twins.

The FLEX-2 page therefore says “fuel/configuration entries,” not “experiments” or “tests.” Its detail pages explicitly state what the envelope means and what it does not establish.

## Current evidence boundary

The current source does not establish that every combination in the listed parameter envelope was flown. Run-level FLEX-2 results require separate NASA experimental records or analyzed evidence with their own provenance.
