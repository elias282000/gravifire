# Fire Landscape and Knowledge Frontier

Fire Landscape visualizes where the currently ingested NASA BASS-II evidence has tested numeric conditions. It is a coverage map, not a fire-behavior or hazard map.

## Supported variables

- Initial Oxygen, `%`
- Final Oxygen, `%`
- Initial CO2, `%`
- Final CO2, `%`
- Initial CO, `ppm`
- Final CO, `ppm`
- Explicit PMMA thickness, `mm`
- Explicit PMMA width, `mm`

Air display, Fan display, pressure, airflow velocity, gravity, flame-spread rate, and outcome are excluded because the current Experimental Table does not provide those row-level numeric fields with verified physical semantics.

## Availability and points

Availability is computed from the ingested runs at page load. A gas value is plottable only when its stored status is `EXACT` and its parsed value is finite. `TEXT_STATUS`, `NOT_REPORTED`, missing values, and ambiguous dimensions are excluded. Every plotted point is a real validated NASA run and links to its run page.

The default axes are Initial Oxygen and Initial CO2 because both are directly represented in the current source records. The page reports observed min/max bounds from the filtered points and does not extrapolate beyond them.

## Evidence density

The map normalizes each selected axis into its observed range and divides the two-dimensional space into an 8×8 grid. Cells with zero points are `UNSAMPLED`, cells with one or two points are `SPARSE`, and cells with three or more points are `WELL_SAMPLED`. Filters recompute the grid. These labels describe dataset coverage only; density is not a risk score, probability, confidence, or prediction.

## Nearest experiments and twins

Nearest experiments use Euclidean distance after independent min/max normalization of the selected axes. The result is labelled “Nearest in the currently selected parameter space.” Experiment twins compare only available verified fields: normalized material, exact initial gas measurements, explicit thickness, and explicit width. Missing fields are omitted rather than treated as zero. No causal interpretation or similarity percentage is produced.

## Knowledge gaps

Clicking a grid cell shows its selected numeric range, the count of currently ingested matching points, and nearby actual runs. Empty cells say “This region has no matching experiments in the currently ingested BASS-II dataset.” That wording does not claim that NASA has never tested the region.
