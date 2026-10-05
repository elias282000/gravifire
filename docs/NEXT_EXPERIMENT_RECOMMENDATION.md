# What Should We Test Next?

This feature ranks proposed conditions that could add coverage to the currently ingested NASA BASS-II evidence. It is not a NASA endorsement, safety system, risk optimizer, predictive combustion model, causal model, or outcome predictor.

## Scope and inputs

The current implementation uses only the two selected Fire Landscape axes and the currently filtered validated NASA run records. Default axes are Initial Oxygen and Initial CO2. Air display, Fan display, pressure, airflow, gravity, flame spread, outcome, and other unsupported fields cannot appear in a candidate.

Material and principal investigator are filters. A PMMA filter uses only records with conservative normalized material `PMMA`; ambiguous material descriptions remain excluded from that group.

## Candidate generation

Filtered points are restricted to records with exact finite numeric values on both axes. At least five such records are required. Observed min/max bounds are computed from those points; candidates are never generated outside those bounds.

The bounded space is divided into an 8×8 grid. `UNSAMPLED` cells have zero points and `SPARSE` cells have one or two points. `WELL_SAMPLED` cells are excluded by default. A candidate is the center of an eligible cell. Candidates within an epsilon of an existing point are rejected. Epsilon is 1% of the observed axis range, with a minimum of `1e-6` in the source unit.

## Information Value

Coverage Gap Ranking v1 computes:

`informationValue = 0.55 × sparsityScore + 0.30 × normalizedMeanNearestDistance + 0.15 × localGapScore`

For an unsampled cell, `sparsityScore = 1` and `localGapScore = 1`. For a sparse cell, both are `0.5`. `normalizedMeanNearestDistance` is the mean distance to the three nearest existing points after independent min/max normalization of both axes, divided by the maximum two-dimensional normalized distance (`sqrt(2)`). Recommendations are sorted by this value, then by stable candidate ID.

“Information Value” is an internal deterministic coverage-ranking value. It is not confidence, probability, risk, scientific importance, or expected outcome.

## Reproducibility and limitations

Each recommendation stores the generation timestamp, algorithm version, selected axes, filters, dataset run IDs, observed bounds, grid cell, minimum evidence threshold, and exact ranking formula. The Scientific Flight Recorder exposes these inputs in the UI.

The recommendation describes an evidence gap in the current local dataset. It does not claim that NASA has never tested the condition, that NASA should run it, or that any fire response will occur. No result is predicted.
