# GRAVIFIRE Deep Research Report

## SAFFIRE-I / Spacecraft Fire Safety Experiment-I
### NASA PSI-98: Large-Scale Spacecraft Fire Evidence Audit, Literature Review, Model History, and Research Gap Map

**Project:** GRAVIFIRE - NASA International Space Apps Challenge 2026  
**Investigation:** Spacecraft Fire Safety Experiment-I (SAFFIRE-I)  
**NASA PSI:** PSI-98  
**NASA Center:** Glenn Research Center  
**Flight Vehicle:** Orbital ATK Cygnus OA-6, after departure from the International Space Station  
**Principal Investigator / PSI contact:** David L. Urban  
**Experiment ignition:** 14 June 2016  
**Prepared:** 1 October 2026

> **Evidence standard used in this report**  
> Claims are distinguished, where useful, as **MEASURED**, **DERIVED**, **MODELED**, **INTERPRETED**, and **OPEN / UNVERIFIED**. SAFFIRE-I values are not back-filled from SAFFIRE-II, SAFFIRE-III, or later Saffire flights. A PSI table value, a published post-processed value, and a later model result are treated as different evidence classes. Apparent metadata conflicts are exposed rather than silently reconciled.

---

## Executive Summary

**SAFFIRE-I was NASA's first controlled spacecraft fire experiment at a scale approaching a realistic vehicle fire.** Before Saffire, crew safety constrained orbital combustion experiments to small samples and small enclosures. NASA therefore placed an automated fire experiment inside an expendable Cygnus resupply vehicle, waited until the vehicle had departed the ISS and moved to a safe orbit, and then ignited a roughly **0.94 m x 0.406 m SIBAL cotton-fiberglass sample** in a large flow duct. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/) [S3](https://ntrs.nasa.gov/citations/20170001636)

The central scientific question was not merely whether the material could burn. NASA wanted to know whether a **large, long-duration microgravity fire would continue to grow, accelerate, or instead approach a limiting flame size and spread rate**, and whether behavior inferred from small coupon experiments was trustworthy when scaled toward spacecraft dimensions. [S3](https://ntrs.nasa.gov/citations/20170001636) [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

The current PSI-98 Experimental Table displays **five rows**, but only **two are combustion records**:

- **S1:** concurrent-flow SIBAL burn, nominal table burn time 420 s;
- **S2:** opposed-flow SIBAL burn, nominal table burn time 70 s;
- **F1C1/F1C2:** pre-test flow visualization for sample 1;
- **F2C1/F2C2:** pre-test flow visualization for sample 2;
- one blank row.

Those flow-visualization rows must not be counted as combustion experiments. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

The most important flight result was that the meter-class concurrent flame did **not** behave like an unconstrained upward 1g flame that continually accelerates and grows. The SAFFIRE-I flame approached a **quasi-steady spread regime with a limiting flame/pyrolysis length**, establishing that large forced-flow microgravity fires can reach a bounded state under the tested geometry and ventilation. Later model-versus-experiment work reproduced the transient growth, the large-sample pyrolysis-length overshoot, and the approach toward quasi-steady behavior. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012) [S5](https://doi.org/10.1016/j.proci.2018.05.168)

A second major result came later: **scale was not only a fuel-size question. The flow duct itself mattered.** SAFFIRE-I spread more slowly than smaller BASS-scale experiments under nominally similar SIBAL/flow conditions. Later cross-Saffire work and 2024 numerical analysis showed that confinement, cross-sectional flow profile, thermal expansion, and wall radiation can materially change flame spread even when the duct is far larger than the flame standoff distance. [S9](https://doi.org/10.1016/j.combustflame.2022.112559) [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

For GRAVIFIRE, SAFFIRE-I is therefore valuable for a different reason than BASS/BASS-II. BASS and BASS-II offer richer small-scale parameter sweeps and multiple material/geometry families. SAFFIRE-I offers **mission-scale geometry, a long uninterrupted burn, multi-camera evidence, time-series diagnostics, and direct evidence of scale/confinement effects**.

### Most important conclusions for GRAVIFIRE

- **Do not reinvent:** generic flame-front extraction, the finding that SAFFIRE-I reached a quasi-steady concurrent spread state, basic SIBAL large-scale spread modeling, or generic "scale matters" claims.
- **High-value evidence:** synchronized camera + sensor histories, calibration/distortion files, environmental time series, transient flame-growth phases, pre-test flow visualization, and model-versus-experiment disagreement.
- **Best apparent opportunities:** multimodal evidence alignment, uncertainty-aware flame/pyrolysis measurements, source/schema contradiction auditing, model applicability/discrepancy maps, scale-transfer evidence maps, and provenance-grounded comparison with BASS/BASS-II.
- **Do not flatten PSI-98 into a large ML dataset:** it contains only two combustion records in the Experimental Table. The scientific richness comes from time-resolved evidence, not sample count.
- **Do not choose the final GRAVIFIRE contribution from SAFFIRE-I alone:** later experiment families must still be researched separately.

---

# 1. Investigation Identity

| Field | Verified SAFFIRE-I evidence | Status |
|---|---|---|
| Investigation title | Spacecraft Fire Safety Experiment-I | Verified |
| Acronym | SAFFIRE-I / Saffire-I | Verified |
| NASA PSI | PSI-98 | Verified |
| PSI version | Version 4 | Verified, updated 3 Jun 2025 |
| PSI DOI | 10.60555/0t15-1z43 | Verified |
| License | CC0-1.0 | Verified |
| Research area | Combustion Science | Verified |
| Subresearch area | Spacecraft Fire, Smoke Distribution | Verified |
| NASA center | Glenn Research Center | Verified |
| PI / PSI contact | David L. Urban | Verified |
| Related PSI investigations | PSI-99, PSI-100, PSI-26 | Verified |
| Vehicle | Orbital ATK Cygnus OA-6 pressurized cargo module | Verified |
| Launch | 22 Mar 2016 | Verified |
| Cygnus departure / experiment day | 14 Jun 2016 | Verified |
| Data-downlink completion / power-off | 19 Jun 2016 | Verified |
| Cygnus reentry | 22 Jun 2016 | Verified |

[S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/) [S12](https://www.nasa.gov/image-article/cygnus-cargo-craft-released-from-space-station/)

## 1.1 Important PSI metadata anomaly

The current PSI-98 page contains a **Project** block that lists:

- proposal title: *Characterization of Smoke from Microgravity Fires for Improved Spacecraft Fire Detection*;
- flight platform: ISS;
- investigation dates: 2 Mar 2001 to 28 Feb 2008.

Those fields do not describe the 2016 SAFFIRE-I Cygnus mission documented by NASA's flight records and the Saffire literature. The same PSI page simultaneously carries the correct SAFFIRE-I title, objectives, Experimental Table, DOI, Saffire hardware identifier, related investigations, publications, and file tree. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

**GRAVIFIRE treatment:** preserve these project-block values as a **repository metadata anomaly**, not as the SAFFIRE-I mission timeline. The operational timeline is anchored to NASA's 2016 Cygnus mission records. [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)

---

# 2. Why NASA Conducted SAFFIRE-I

## 2.1 NASA's stated problem

NASA identified two broad objectives for the first Saffire series:

1. determine how rapidly a **large-scale fire grows in low gravity**;
2. investigate low-gravity material flammability relative to NASA's normal-gravity screening methods.

The first objective was central to SAFFIRE-I. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S3](https://ntrs.nasa.gov/citations/20170001636)

## 2.2 Why ISS-scale combustion experiments were not enough

Prior Shuttle/ISS experiments had generated valuable microgravity combustion science, but crew safety constrained their sample sizes and total fire energy. NASA's Saffire development paper states that earlier samples were generally no larger than about **10 cm in length and width**, while a serious spacecraft fire could involve much larger fuel areas and significantly more material. [S3](https://ntrs.nasa.gov/citations/20170001636)

A small coupon can answer questions about:

- ignition;
- local flame spread;
- extinction limits;
- material chemistry;
- controlled ventilation response.

It cannot automatically reproduce:

- meter-scale flame growth;
- long-duration heat feedback;
- large pyrolysis zones;
- significant oxygen consumption;
- interactions with a vehicle-sized flow enclosure;
- smoke and thermal response over a realistic spacecraft volume.

## 2.3 Why scale cannot be assumed linear

NASA's rationale was explicit: **fire spread, growth, and vehicle interaction cannot be expected to scale linearly from small experiments.** [S13](https://ntrs.nasa.gov/citations/20180005168)

Scaling changes:

- the amount of simultaneously burning material;
- flame residence and development length;
- radiation exchange;
- flow acceleration and profile;
- fuel preheating distance;
- boundary and wall interactions;
- available oxygen inventory;
- the spatial relationship between fire and spacecraft sensors.

Therefore "a 10 cm test burns at X" does not imply a 1 m sample will simply burn ten times longer or produce a ten-times-scaled flame.

## 2.4 Why Cygnus was ideal

A crewed vehicle could not safely host a meter-scale uncontrolled research fire. Cygnus offered a unique operational window:

1. deliver cargo to ISS;
2. remain dormant while berthed;
3. depart the ISS;
4. move to a safe free-flying orbit;
5. conduct the autonomous fire experiment;
6. downlink images and telemetry;
7. destructively reenter.

This created realistic spacecraft pressure, atmosphere, enclosure, electronics, and ventilation context without exposing a crew. [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/) [S3](https://ntrs.nasa.gov/citations/20170001636)

---

# 3. Relationship to BASS and BASS-II

## 3.1 What BASS/BASS-II could measure well

BASS and BASS-II offered controlled small-scale microgravity studies with richer variation in:

- fuel family;
- thickness and geometry;
- opposed vs concurrent flow;
- low-flow extinction;
- oxygen concentration, especially in BASS-II;
- rods, sheets, fabrics and other configurations;
- local suppression/intervention in original BASS.

These are ideal for **mechanism isolation and parameter studies**.

## 3.2 What they could not reproduce

They could not reproduce the combined condition of:

- roughly meter-scale fuel length;
- ~40 cm fuel width;
- large vehicle-scale flow duct;
- prolonged growth over several minutes;
- vehicle environmental response;
- significant total energy release.

## 3.3 What SAFFIRE-I added

SAFFIRE-I moved from **small-sample combustion science** toward **spacecraft-fire phenomenology**.

The sample was an order of magnitude larger in both dimensions than prior low-g flame-spread experiments in NASA's development description. [S3](https://ntrs.nasa.gov/citations/20170001636)

This made it possible to ask:

> Does a microgravity flame continue growing when the fuel is no longer the limiting scale?

That question could not be answered convincingly by the BASS/BASS-II coupon geometry alone.

---

# 4. Experimental Design

## 4.1 Overall hardware

The Saffire experiment module consisted of:

- a **flow duct** containing the sample card;
- an adjacent **avionics bay**;
- fans at the downstream/top end;
- flow straighteners at the upstream/bottom end;
- a Lexan boundary between flow duct and avionics bay;
- cameras and data-acquisition electronics;
- atmospheric and flow diagnostics.

NASA gave overall module dimensions of approximately **53 x 90 x 133 cm**. [S3](https://ntrs.nasa.gov/citations/20170001636)

Published SAFFIRE-I science descriptions give the flow tunnel cross-section at approximately **46 x 51 cm** and length about **109 cm**. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 4.2 Fuel

SAFFIRE-I used **SIBAL**, a cotton-fiberglass composite:

- **75% cotton**
- **25% fiberglass by weight**

The fiberglass preserves structure after the cotton burns, making it useful for flame-spread measurement. [S3](https://ntrs.nasa.gov/citations/20170001636)

The large fuel panel was nominally:

- length: **94 cm**
- width: **40.6 cm**

Published papers describe a thermally thin fabric thickness around **0.32 to 0.37 mm**, depending on the source/measurement description. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 4.3 A critical thickness-unit inconsistency

The current PSI Experimental Table labels its thickness column **"Sample Thickness (cm)"** and gives **0.37** for S1/S2. Taken literally, that would mean 3.7 mm.

However, flight-development and results literature describes the SIBAL as about **0.3175 to 0.37 mm**, not 0.37 cm. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

**GRAVIFIRE should not silently rewrite the PSI value.**

Recommended data representation:

- `source_thickness_value = 0.37`
- `source_thickness_unit = "cm" (PSI schema)`
- `published_physical_thickness ≈ 0.32-0.37 mm`
- `quality_flag = UNIT_CONFLICT`
- provenance for both.

This is exactly the kind of source reconciliation an evidence-grounded platform should expose.

## 4.4 Ventilation

PSI specifies:

- **20 cm/s airflow**
- S1: concurrent
- S2: opposed.

The fan/flow-straightener system was designed to create a controlled flow through the duct. Pre-test smoke/flow visualization was recorded before ignition. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)

## 4.5 Atmosphere

PSI table:

- S1: **21.5-21.7% O2**
- S2: **~21.5% O2**

Later published comparisons place the mission near **100 kPa** pressure. Pressure was measured, but pressure was not a systematically varied SAFFIRE-I experimental axis. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 4.6 Ignition

PSI reports:

- ignition power: **182 W**
- ignition time: **8 s**

Published design descriptions identify a resistively heated **29-gage Kanthal wire**, approximately **0.286 mm diameter**, driven around **3.85 A** for about eight seconds. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

The fuel card was equipped for ignition from both ends, enabling the long concurrent burn and a later short opposed-spread segment.

## 4.7 Cameras and illumination

The scientific literature reports:

- two cameras;
- about **30 frames/s**;
- adjacent fields covering slightly more than half of the long sample each;
- dark flow tunnel during primary flame imaging;
- a **green LED flash for ~0.4 s every 2 s** to reveal the fuel/char/pyrolysis structure.

[S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

PSI also lists camera identifiers:

- S1: **S1C1, S1C2**
- S2: **S2C1, S2C2**
- flow visualization: **F1C1/F1C2, F2C1/F2C2**.

## 4.8 Thermal and atmospheric diagnostics

Documented diagnostics include:

- thermocouples on/in the sample;
- plume/flow thermocouples;
- radiometers viewing the sample from front/back positions;
- O2 sensor;
- CO2 sensor;
- pressure sensor;
- two anemometers / flow diagnostics;
- fan tachometer and experiment electrical telemetry;
- vehicle smoke-detector information mentioned in the broader experiment diagnostics.

[S3](https://ntrs.nasa.gov/citations/20170001636) [S7](https://ntrs.nasa.gov/citations/20170000230)

## 4.9 Parameter / measurement matrix

| Parameter / Measurement | Controlled | Measured | Unit | Source | Notes |
|---|---:|---:|---|---|---|
| Material | Yes | Configuration | categorical | PSI | SIBAL only for SAFFIRE-I |
| Cotton/fiberglass ratio | Yes | Configuration | wt.% | NASA development paper | 75/25 |
| Sample length | Yes | Configuration | cm | PSI | 94 |
| Sample width | Yes | Configuration | cm | PSI | 40.6 |
| Sample thickness | Yes | Configuration | PSI says cm; literature mm | PSI + literature | Unit conflict; see section 4.3 |
| Airflow | Yes | Yes | cm/s | PSI | 20 |
| Flow direction | Yes | Configuration | concurrent/opposed | PSI | S1 vs S2 |
| O2 | Facility condition | Yes | % | PSI | 21.5-21.7 S1; ~21.5 S2 |
| Pressure | Not systematically varied | Yes | pressure | publications/diagnostics | ~100 kPa context |
| Ignition power | Yes | Electrical telemetry | W | PSI | 182 |
| Ignition duration | Yes | Time | s | PSI | 8 |
| Burn time | Response / procedure | Recorded | s | PSI | 420 S1, 70 S2 |
| Camera imagery | No | Yes | frames | NASA/PSI | 2 views |
| Frame rate | Configuration | Yes | frames/s | journal literature | ~30 fps |
| Thermocouple temperature | No | Yes | temperature | NASA diagnostics | sample/plume/flow positions |
| Radiometer signal | No | Yes | radiative signal | NASA diagnostics | multiple views |
| O2 time series | No | Yes | % | NASA diagnostics | atmospheric response |
| CO2 time series | No | Yes | concentration | NASA diagnostics | atmospheric response |
| Pressure time series | No | Yes | pressure | NASA diagnostics | vehicle response |
| Flow velocity | Yes | Yes | cm/s | anemometers | verify exact channel/location per file |
| Flame front | Response | Derived from images | position/time | publications | not a direct sensor |
| Pyrolysis length | Response | Derived | length | publications | image + illumination |
| Flame length | Response | Derived | length | publications | image-derived |
| Heat release rate | Response | Estimated/model-derived | power | publications | theoretical/derived, not direct calorimetry |

---

# 5. Experimental Table Audit

The current PSI-98 Experimental Table schema is:

`Sample Number | Material | Sample Thickness (cm) | Sample Length (cm) | Sample Width (cm) | Air Flow (cm/s) | Percent O2 | Ignition Power (W) | Ignition Time (s) | Burn Time (s) | Flow Direction | Camera 1 | Camera 2`

[S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

## 5.1 Exact displayed rows

| Row | Type | Material / description | Dimensions | Flow | O2 | Ignition | Burn | Direction | Cameras |
|---|---|---|---|---:|---|---|---:|---|---|
| S1 | **Combustion** | SIBAL Fabric | 0.37 / 40.6 / 94 | 20 cm/s | 21.5-21.7% | 182 W, 8 s | 420 s | Concurrent | S1C1, S1C2 |
| S2 | **Combustion** | SIBAL Fabric | 0.37 / 40.6 / 94 | 20 cm/s | ~21.5% | 182 W, 8 s | 70 s | Opposed | S2C1, S2C2 |
| F1C1/F1C2 | **Pre-test flow visualization** | Sample 1 visualization | blank | blank | blank | blank | blank | blank | identifiers embedded |
| F2C1/F2C2 | **Pre-test flow visualization** | Sample 2 visualization | blank | blank | blank | blank | blank | blank | identifiers embedded |
| blank | **Empty row** | blank | blank | blank | blank | blank | blank | blank | blank |

### Correct run-count interpretation

- displayed table rows: **5**
- combustion rows: **2**
- flow-visualization records: **2**
- empty rows: **1**

Therefore:

> **PSI-98 does not contain five combustion experiments.**

This distinction must be preserved in any GRAVIFIRE count, chart, or ML dataset.

## 5.2 Why S1 and S2 should not be treated as independent randomized replicates

The published experimental description indicates that the same large sample configuration was used sequentially:

1. concurrent ignition/burn from one end;
2. flow was turned off to extinguish/quench the first flame;
3. the opposite igniter was then used for the shorter opposed-spread segment, with only about 10 cm of fuel allocated for that phase.

[S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

S1 and S2 therefore differ in:

- direction;
- available unburned length;
- test duration;
- thermal/history state;
- preceding burn history.

A difference in S1 and S2 outcome cannot automatically be assigned to **flow direction alone**.

---

# 6. Public Dataset and File Inventory

## 6.1 PSI repository structure

PSI-98 exposes the following top-level categories:

- Investigation Metadata Files
- Engineering Documents
- Raw Data
- Science Documents
- Experimental table

The page shows **no associated Modeling Table** and **no associated representative image** in the PSI UI. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

## 6.2 Version 4 repository evidence

PSI Version 4, updated **3 Jun 2025**, reports:

- **74 files added**
- **85 files removed**
- **1 file updated**

This is version-history activity, **not the current total file count**.

Verified example filenames include:

1. `PSI-98_Engineering Documents_SAFFIRE Offgassing Testing Strategy.pdf`
2. `PSI-98_Raw Data_SAFFIRE-1_F1C1_DistortionGrids_1280x920_originals.zip`
3. `PSI-98_Raw Data_SAFFIRE-I_ImageFrameSizes_ROI_Offsets_Grid_1280x920_v1.0.pdf`
4. metadata ZIP shown as `PSI-98_metadata_PSI-166_SAFFIRE-I.zip`

[S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

The `PSI-166` token inside the metadata filename is another archive/migration detail that should be preserved rather than interpreted as the investigation ID.

## 6.3 Mission-downlinked data volume vs current PSI file count

NASA reports that the flight team downloaded:

- **more than 25 gigabits**
- **40,989 images and data files**

over the mission. [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)

Those values describe the **mission downlink**, not the current PSI public-file count.

The two quantities must not be equated.

## 6.4 Dataset inventory

| Resource | Public evidence | Format / size / count | Raw vs processed | What it contains | GRAVIFIRE value |
|---|---|---|---|---|---|
| PSI-98 metadata | Public | web + ZIP in repository | metadata | investigation identity, objectives, relationships | Essential |
| Experimental Table | Public | 5 displayed rows | curated metadata | 2 combustion runs + 2 flow visualization records + blank | Essential |
| Raw camera data | Public category verified | exact current count not exposed | raw | multi-camera flame/flow imagery | Very high |
| Distortion grids | Exact filename verified | ZIP, `1280x920` in filename | calibration/reference | camera distortion calibration images | Very high |
| ROI/frame-size reference | Exact filename verified | PDF | reference | frame size, ROI offsets, grid | Very high |
| Engineering documents | Public category | exact count not exposed | design/context | offgassing, hardware, integration, testing | High |
| Science documents | Public category | exact count not exposed | analysis | experiment interpretation/results | High |
| Telemetry / sensor data | Mission diagnostics verified; PSI raw category likely contains associated files | exact filenames not fully enumerable from indexed UI | raw/processed | flow, temperature, atmospheric/electrical channels | Very high |
| Publications | PSI list + external journals/NTRS | multiple | interpreted/modelled | scientific results and models | Essential |
| Modeling Table | **None associated** | none | n/a | PSI explicitly says no Modeling Table | Important negative finding |
| Representative Images in PSI | **None associated in PSI UI** | none | n/a | NASA imagery exists elsewhere | Use NASA mission pages instead |

### Direct NASA entry points

- [Official PSI-98 repository](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)
- [NASA SAFFIRE-I mission article and mission updates](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)
- [NASA SAFFIRE-I hardware image page](https://www.nasa.gov/image-article/saffire-i-hardware/)
- [NASA Cygnus departure image / mission context](https://www.nasa.gov/image-article/cygnus-cargo-craft-released-from-space-station/)
- [NASA NTRS: Saffire objectives, development and status](https://ntrs.nasa.gov/citations/20170001636)
- [NASA NTRS: Results of Large-Scale Spacecraft Flammability Tests](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170008805.pdf)
- [NASA NTRS: Operation and Development Status of Saffire](https://ntrs.nasa.gov/citations/20170000230)

---

# 7. Raw Video and Image Inventory

## 7.1 Camera streams

SAFFIRE-I science used **two side-by-side camera views** covering the long sample. [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/) [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

Identifiers in the PSI table:

- S1C1 / S1C2
- S2C1 / S2C2
- F1C1 / F1C2
- F2C1 / F2C2

The flow-visualization identifiers should be treated as a distinct visual-data class.

## 7.2 Frame rate and illumination

Published SAFFIRE-I work describes approximately **30 fps** imagery and periodic green illumination:

- green LED on for about **0.4 s**
- approximately every **2 s**

This gave investigators intermittent visibility of the sample surface/char and pyrolysis region while retaining dark-background flame observations in other frames. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 7.3 Spatial calibration evidence

The current PSI version history explicitly lists:

- `SAFFIRE-1_F1C1_DistortionGrids_1280x920_originals.zip`
- `SAFFIRE-I_ImageFrameSizes_ROI_Offsets_Grid_1280x920_v1.0.pdf`

These files strongly indicate that NASA preserved geometric calibration/ROI information needed for quantitative image measurement.

**Important caution:** `1280x920` appears in calibration filenames. This report does **not** automatically assert that every released compressed video stream has exactly that resolution without file-level verification.

## 7.4 What can be derived from the visual data

Scientifically defensible image-derived quantities include, with appropriate calibration:

- flame leading-edge position;
- pyrolysis-front position;
- spread rate;
- flame length;
- pyrolysis length;
- flame width/shape;
- transient growth rate;
- approximate luminous-area metrics;
- extinction/quench timing;
- smoke/flow-visualization structure in designated frames.

## 7.5 What has already been extracted

Published SAFFIRE research has already extracted or analyzed:

- flame front;
- spread rate;
- flame length;
- pyrolysis length;
- transient flame-growth phases;
- overshoot of the pyrolysis length;
- quasi-steady spread behavior;
- thermocouple-linked heat-feedback behavior.

[S4](https://doi.org/10.1016/j.combustflame.2018.10.012) [S5](https://doi.org/10.1016/j.proci.2018.05.168)

Therefore:

> **Generic flame segmentation or flame-front tracking is not a defensible novelty claim for GRAVIFIRE.**

---

# 8. Sensor and Time-Series Evidence

The experiment's scientific value is not limited to video.

## 8.1 Diagnostic classes

Documented classes include:

### Flow
- anemometer output;
- fan tachometer;
- inlet/outlet flow-related measurements.

### Temperature
- thermocouples associated with sample/flame;
- thermocouples in plume/flow positions;
- inlet/outlet flow temperatures.

### Radiation
- multiple radiometers viewing the fuel/flame.

### Atmosphere
- O2;
- CO2;
- pressure.

### Electrical / state
- igniter voltage/current history;
- smoke-wire or visualization-related electrical history;
- relay states;
- timing/state telemetry.

[S3](https://ntrs.nasa.gov/citations/20170001636) [S7](https://ntrs.nasa.gov/citations/20170000230)

## 8.2 Synchronization

Saffire was designed as an integrated automated flight system. Telemetry and images share experiment timing and can be related through the experiment sequence. However, the current indexed PSI page does not expose a clean public schema documenting every stream's exact sample rate, timestamp convention, missing-value rule, and synchronization uncertainty.

For GRAVIFIRE, those should be discovered **file by file** rather than assumed.

## 8.3 Measurements that are not verified as direct SAFFIRE-I channels

This review did not find evidence of direct flight measurement of:

- sample mass loss on a balance;
- spatially resolved gas concentration field;
- full velocity field/PIV;
- direct calorimetric heat-release rate.

Heat-release estimates reported in literature should therefore be labeled **DERIVED/MODELED**, not measured calorimetry.

---

# 9. S1: Concurrent Large-Scale Burn

## 9.1 PSI configuration

**MEASURED / CONFIGURATION**

- Material: SIBAL
- Table thickness: 0.37, table header says cm; literature indicates ~0.37 mm
- Width: 40.6 cm
- Length: 94 cm
- Airflow: 20 cm/s
- O2: 21.5-21.7%
- Ignition power: 182 W
- Ignition time: 8 s
- Table burn time: 420 s
- Direction: concurrent
- Cameras: S1C1, S1C2

[S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

## 9.2 Observed behavior

NASA's mission update described a slow-moving flame traversing the sample over roughly eight minutes when considering the broader visual sequence, while the Experimental Table assigns 420 s to the S1 burn record. These values refer to different operational/visual definitions and should not be forced into one exact duration. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98) [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)

The peer-reviewed analysis found that the concurrent flame:

- underwent an ignition/growth transient;
- developed an overshoot in pyrolysis length;
- approached a **quasi-steady spread state**;
- reached a roughly limiting flame/pyrolysis length rather than accelerating indefinitely.

[S4](https://doi.org/10.1016/j.combustflame.2018.10.012) [S5](https://doi.org/10.1016/j.proci.2018.05.168)

Published analyses report an average concurrent spread rate on the order of **~1.7-1.8 mm/s** for the large SAFFIRE-I SIBAL case, with a characteristic pyrolysis/flame-length scale on the order of several centimeters. Exact values depend on the definition and processed interval and should be linked to the specific paper/figure rather than promoted to universal PSI row fields. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 9.3 Scientific meaning

The key result was that **large scale did not produce unlimited growth under the tested forced-flow microgravity condition**.

This challenged a naive transfer from upward terrestrial flame spread, where buoyancy can continuously strengthen convective feedback and produce accelerating growth.

---

# 10. S2: Opposed-Flow Segment

## 10.1 PSI configuration

**MEASURED / CONFIGURATION**

- Material: SIBAL
- Nominal dimensions: same table dimensions as S1
- Airflow: 20 cm/s
- O2: ~21.5%
- Ignition: 182 W for 8 s
- Table burn time: 70 s
- Direction: opposed
- Cameras: S2C1, S2C2

[S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-98)

## 10.2 Important physical-history qualification

Published descriptions indicate that only about **10 cm** of fresh fuel was reserved for the opposed-spread segment after the main concurrent test. The sample had therefore already experienced the S1 experiment and shutdown sequence.

Consequently, S2 should not be interpreted as an independent full-length counterpart to S1.

## 10.3 Observed/derived behavior

Published Saffire analyses place the opposed spread rate in the same broad mm/s scale as the concurrent test, with some publications/processed tables showing a lower opposed value. Early mission summaries described the two as being of similar order.

The correct interpretation is:

> The two tests establish both concurrent and opposed large-scale flame-spread evidence, but **S1-S2 differences cannot be attributed exclusively to direction** because the histories and usable fuel lengths are not matched randomized replicates.

---

# 11. Major Scientific Findings

## 11.1 Large microgravity flame reached a quasi-steady state

**DERIVED from images and time history; interpreted with models.**

The meter-class concurrent flame reached an approximately stable flame/pyrolysis length and spread rate after transient growth. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012) [S5](https://doi.org/10.1016/j.proci.2018.05.168)

### Meaning

Large microgravity fire growth is not necessarily unbounded under fixed forced-flow conditions.

### Operational relevance

A limiting size creates a path toward bounded estimates of fire heat release and spacecraft environmental impact under defined ventilation.

---

## 11.2 The large sample behaved differently from upward 1g flame spread

**INTERPRETED from microgravity observations and terrestrial physics.**

An upward normal-gravity flame over a large vertical fuel can accelerate as buoyant flow strengthens heat transfer. SAFFIRE-I's concurrent forced-flow microgravity flame instead approached a limiting state. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

This is a scale-and-gravity result, not evidence that microgravity is always less hazardous.

---

## 11.3 Duct/confinement effects remained important even at large scale

Later analysis showed that Saffire flame spread was slower than smaller-duct BASS evidence might suggest under similar nominal flow/material conditions. [S9](https://doi.org/10.1016/j.combustflame.2022.112559)

The 2024 model study found strong sensitivity to duct height and explained the effect through:

- cross-section-dependent hydrodynamic flow profiles;
- thermal-expansion effects;
- radiation reflection from the duct ceiling.

[S10](https://doi.org/10.1016/j.combustflame.2024.113299)

### Meaning

"Scale" cannot be represented solely by fuel dimensions. **Vehicle/duct geometry is part of the boundary condition.**

---

## 11.4 Pyrolysis length showed transient overshoot

The large sample's pyrolysis region initially grew beyond its later quasi-steady level before relaxing. A transient model captured this behavior. [S5](https://doi.org/10.1016/j.proci.2018.05.168)

### Meaning

A steady-state correlation alone misses an important early fire-growth phase.

---

## 11.5 Large-scale data enabled model validation unavailable before

Before SAFFIRE-I, there was no meter-class long-duration microgravity dataset for validation of spacecraft-scale solid flame growth. SAFFIRE-I created that benchmark. [S13](https://ntrs.nasa.gov/citations/20180005168)

---

# 12. Scale Effects

This is the defining scientific theme of SAFFIRE-I.

## 12.1 Fuel scale

The 94 x 40.6 cm sample was at least an order of magnitude larger in both dimensions than the class of prior low-g flame-spread experiments described in the program-development literature. [S3](https://ntrs.nasa.gov/citations/20170001636)

The larger scale permitted:

- longer transient development;
- larger pyrolysis region;
- higher total fuel consumption;
- stronger integrated radiative/thermal environment;
- enough burn length to observe whether flame growth saturates.

## 12.2 Enclosure scale

Comparison with BASS and later Saffire flights showed that enclosure geometry alters the flow field seen by the flame.

Olson et al. 2023 used BASS + Saffire evidence to study duct size, sample size and fuel composition. [S9](https://doi.org/10.1016/j.combustflame.2022.112559)

Cui & Liao 2024 then reproduced large-scale confinement effects numerically and found that reducing duct height could increase spread rate and pyrolysis length dramatically, even when duct dimensions were much greater than flame standoff. [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

## 12.3 Consequence for GRAVIFIRE

A valid data model must include:

- sample size;
- flow-duct cross section;
- ceiling/wall geometry;
- ventilation profile;
- surface/radiative boundary properties where known.

Using only:

`material + O2 + nominal velocity`

would discard scientifically important scale information.

---

# 13. Peer-Reviewed Literature and NASA Reports

## 13.1 Schoren, Ruff & Urban - objectives and experiment design

**Title:** *The Spacecraft Fire Experiment (Saffire) - Objectives, Development and Status*  
**Authors:** William Schoren, Gary A. Ruff, David L. Urban  
**NASA NTRS:** 20170001636  
**Link:** [S3](https://ntrs.nasa.gov/citations/20170001636)

**SAFFIRE-I role:** experiment objectives, scale rationale, flow-duct architecture, SIBAL material, diagnostics, automation.

**Contribution:** primary source for why NASA moved to uncrewed large-scale testing.

**Limitation:** mainly pre-flight/development status; not the final scientific result paper.

---

## 13.2 Urban et al. - principal scale paper

**Title:** *Flame spread: Effects of microgravity and scale*  
**Authors:** David L. Urban, Paul Ferkul, Sandra Olson, Gary A. Ruff, John Easton, James S. T'ien, Ya-Ting T. Liao, Chengyao Li, Carlos Fernandez-Pello, Jose L. Torero, Guillaume Legros, Christian Eigenbrod, Nickolay Smirnov, Osamu Fujita, Sébastien Rouvreau, Balazs Toth, Grunde Jomaas  
**Journal:** *Combustion and Flame*, 199 (2019), 168-182  
**DOI:** 10.1016/j.combustflame.2018.10.012  
**Link:** [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

**Data used:** SAFFIRE-I camera/thermal data and related large-scale comparisons.

**Question:** How do microgravity and physical scale change flame spread and growth?

**Method:** post-processed flight imagery, thermal diagnostics, scale comparison, analytical interpretation.

**Major finding:** large concurrent SIBAL flame approached a limiting state; large-duct behavior differed materially from small-duct flame spread.

**Contribution:** central peer-reviewed interpretation of SAFFIRE-I.

**Limitation:** only one SAFFIRE-I material and one main concurrent large-scale condition.

---

## 13.3 Li et al. - transient model versus experiment

**Title:** *Transient flame growth and spread processes over a large solid fabric in concurrent low-speed flows in microgravity - Model versus experiment*  
**Authors:** Chengyao Li, Ya-Ting T. Liao, James S. T'ien, David L. Urban, Paul Ferkul, Sandra Olson, Gary A. Ruff, John Easton  
**Venue:** *Proceedings of the Combustion Institute*, 37(3) (2019), 4163-4171  
**DOI:** 10.1016/j.proci.2018.05.168  
**Link:** [S5](https://doi.org/10.1016/j.proci.2018.05.168)

**Data:** SAFFIRE-I large sample and smaller Saffire fabric case.

**Question:** Can a transient flame-spread model reproduce growth, overshoot and quasi-steady behavior?

**Method:** coupled transient numerical flame/fuel model compared with camera and thermocouple observations.

**Finding:** model captured initial growth, large-sample pyrolysis-length overshoot and quasi-steady state.

**Contribution:** demonstrates that SAFFIRE-I is a model-validation dataset, not only a visualization experiment.

**Limitations:** model assumptions and material property uncertainty remain; comparison is limited to specific SIBAL/flow configurations.

---

## 13.4 Results of Large-Scale Spacecraft Flammability Tests

**NASA report / presentation:** *Results of Large-Scale Spacecraft Flammability Tests*  
**NASA NTRS:** 20170008805  
**Link:** [S6](https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170008805.pdf)

**Role:** early consolidated flight results, S1/S2 interpretation, large-scale spread and chamber-size effect.

**Important contribution:** highlighted that the large tunnel produced slower spread than smaller microgravity tunnels under related conditions, motivating later confinement analysis.

---

## 13.5 Ruff & Urban - operations and development

**Title:** *Operation and Development Status of the Spacecraft Fire Experiments (Saffire)*  
**Authors:** Gary A. Ruff, David L. Urban  
**NASA NTRS:** 20170000230  
**Link:** [S7](https://ntrs.nasa.gov/citations/20170000230)

**Role:** flight-system integration, telemetry, downlink sequence, diagnostics and operations.

**GRAVIFIRE value:** critical for reconstructing data provenance and timing.

---

## 13.6 Jomaas et al. - why small-sample testing was inadequate

**Title:** *Fire safety in space - beyond flammability testing of small samples*  
**Journal:** *Acta Astronautica*  
**DOI:** 10.1016/j.actaastro.2014.11.025  
**Link:** [S8](https://doi.org/10.1016/j.actaastro.2014.11.025)

**Role:** scientific rationale for realistic-scale spacecraft fire research.

**Contribution:** frames the limitations of small-coupon material screening and the need for integrated fire-safety research.

---

## 13.7 Olson et al. - duct/sample/material effects

**Title:** *The effect of duct size, sample size, and fuel composition on concurrent flame spread over large cellulose samples in microgravity*  
**Journal:** *Combustion and Flame*, 248 (2023), 112559  
**DOI:** 10.1016/j.combustflame.2022.112559  
**Link:** [S9](https://doi.org/10.1016/j.combustflame.2022.112559)

**SAFFIRE-I use:** cross-experiment comparison including earlier BASS/Saffire SIBAL data.

**Question:** How do duct size, sample size and fuel composition alter concurrent microgravity spread?

**Finding:** enclosure scale remains important and can produce unexpectedly large changes.

**Contribution:** directly prevents a naive "same material + same nominal velocity = comparable experiment" assumption.

---

## 13.8 Cui & Liao - confinement model

**Title:** *Numerical study of the effects of confinement on large-scale fires in microgravity*  
**Journal:** *Combustion and Flame*, 261 (2024), 113299  
**DOI:** 10.1016/j.combustflame.2024.113299  
**Link:** [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

**SAFFIRE evidence:** Saffire large-duct data, including SAFFIRE-I as a validation case.

**Method:** two-dimensional transient numerical simulation, cold-flow analysis, thermocouple-based heat-flux deduction.

**Validation:** reproduced transient flame development and spread at different duct heights; derived heat-flux profiles showed agreement with experiment.

**Contribution:** demonstrates hydrodynamic confinement and ceiling-radiation effects at large scales.

**Limitation:** model remains an idealized representation, not a full 3D spacecraft CFD reconstruction.

---

# 14. Model Validation History

| Model / approach | Inputs | Outputs | SAFFIRE-I evidence | Agreement | Main limitation / failure risk |
|---|---|---|---|---|---|
| Transient solid/flame spread model | material properties, flow, geometry, atmosphere | flame growth, spread, pyrolysis length | S1 image + thermocouple data | Captured growth, overshoot, quasi-steady trend | Material properties and simplified geometry |
| Scale/confinement analytical interpretation | duct dimensions, nominal flow, thermal expansion | spread-scale relationships | SAFFIRE-I vs smaller BASS/Saffire cases | Explains major scale trend | Cross-experiment confounding |
| 2D confinement model | duct height, flow profile, radiation boundaries | spread rate, pyrolysis length, heat flux | Saffire large-scale cases including I | Good transient/spread agreement in published validation | 2D approximation, boundary-property assumptions |
| Thermocouple inverse heat-flux deduction | TC histories + thermal model | net surface heat flux | Saffire thermocouples | Qualitative/quantitative agreement with simulation | Inverse-problem assumptions and sensor placement |
| Ground/normal-gravity comparison frameworks | gravity, pressure, flow, fuel properties | surrogate/transfer behavior | contextual Saffire/BASS evidence | Useful trends, not universal transformation | No one-to-one Earth-to-microgravity equivalence |

## 14.1 Modeling problems GRAVIFIRE should not pretend to solve from scratch

- existence of a limiting concurrent large-scale spread state;
- transient large-fabric growth modeling;
- basic duct/confinement sensitivity;
- generic flame-front/spread measurement;
- first-order coupling between forced flow and flame spread.

A new GRAVIFIRE model would need to add something substantively different such as:

- uncertainty;
- model applicability;
- evidence reconciliation;
- multimodal validation;
- model disagreement;
- transferability assessment.

---

# 15. Computer Vision and Image-Processing Prior Art

## 15.1 Prior image processing definitely exists

The core SAFFIRE-I papers depend on quantitative image processing.

Published analyses include:

- calibrated flame-front tracking;
- pyrolysis-front extraction;
- flame-length measurement;
- transient time histories;
- processed image sequences using periodic green illumination.

Development/ground work also used color-channel/threshold logic to distinguish pyrolysis, burnout, and luminous flame features.

Therefore image processing is already part of the established Saffire methodology.

## 15.2 Modern CV: what could still add value?

### Potentially valuable

1. **Multi-camera registration**
   - combine C1/C2 measurements into one calibrated longitudinal coordinate;
   - propagate registration uncertainty.

2. **Uncertainty-aware segmentation**
   - produce distributions/confidence bands instead of one threshold edge.

3. **Frame-quality classification**
   - identify LED-on frames, saturation, smoke obscuration, compression artifacts and invalid measurements.

4. **Cross-modal event alignment**
   - link visual growth transitions to thermocouple, radiometer, O2/CO2, pressure and flow signals.

5. **Smoke-flow separation**
   - explicitly distinguish pre-test smoke visualization from combustion smoke/flame imagery.

6. **Reproducible derived-measurement pipeline**
   - every derived point linked to source frame, camera, calibration, algorithm version and uncertainty.

### Weak novelty

- basic flame/no-flame segmentation;
- single-camera leading-edge tracking;
- measuring flame length without uncertainty;
- simple color thresholding.

---

# 16. Machine Learning / AI Prior Art

Targeted searches were performed around combinations of:

- `SAFFIRE-I machine learning`
- `Saffire neural network spacecraft fire`
- `Saffire deep learning flame`
- `Saffire Gaussian process`
- `Saffire Bayesian`
- `Saffire active learning`
- `Saffire surrogate model`
- `Saffire uncertainty quantification`
- `Saffire image processing / computer vision`

## Findings

### Direct SAFFIRE-I neural-network predictor

**No evidence found in the targeted public literature search.**

This means the review did not locate a clearly documented peer-reviewed SAFFIRE-I neural-network predictor. It does **not** prove none exists.

### Direct SAFFIRE-I Bayesian / Gaussian-process surrogate

**No evidence found.**

### Direct active-learning / next-experiment system

**No evidence found.**

### Computer vision

**Prior art definitely exists**, primarily classical/calibrated image processing rather than a novelty-free modern deep-learning claim.

### Cross-dataset AI / meta-analysis overlap

NASA currently supports a PSI re-analysis project led by Ya-Ting Liao that uses BASS, BASS-II and SAFFIRE I-III to improve partial-gravity flammability prediction and cross-experiment understanding. [S11](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

**Implication for GRAVIFIRE:** generic "combine BASS and Saffire to predict partial-gravity fire behavior" carries high duplication risk.

---

# 17. Real-World and Mission Contribution

## 17.1 Experimentally demonstrated

### Large-scale controlled spacecraft fire is feasible in an uncrewed post-ISS vehicle

SAFFIRE-I validated the operational concept itself. [S2](https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/)

### A meter-class SIBAL flame can approach a limiting spread state

Directly derived from SAFFIRE-I flight imagery and time histories. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

### Spacecraft/duct geometry materially affects burning

Supported by cross-flight evidence and later validated modeling. [S9](https://doi.org/10.1016/j.combustflame.2022.112559) [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

## 17.2 Model-supporting

SAFFIRE-I became a benchmark for:

- large-scale flame-spread modeling;
- transient pyrolysis/flame-growth prediction;
- confinement models;
- heat-feedback analysis;
- scale-transfer reasoning.

## 17.3 Design-relevant

The experiment reduces uncertainty in:

- spacecraft ventilation/fire coupling;
- expected flame growth under forced flow;
- fire energy/size estimates;
- how representative small-coupon tests are;
- where sensors may need to operate relative to a large flame/smoke field.

## 17.4 Proposed operational implications

NASA intended Saffire results to support:

- safer exploration-vehicle design;
- material-screening criteria;
- fire detection/suppression system design;
- emergency planning and operational protocols.

## 17.5 Documented operational implementation

This review did **not** identify primary evidence that SAFFIRE-I by itself directly caused:

- a specific NASA-STD-6001 acceptance threshold change;
- a named spacecraft material being certified/rejected;
- a specific detector or extinguisher installation;
- a specific crew procedure revision.

GRAVIFIRE should therefore describe those areas as **design relevance / intended impact**, not proven operational implementation, unless a later standards source is found.

---

# 18. Experimental Limitations

## 18.1 Very small number of combustion cases

Two Experimental Table combustion records.

This is rich time-series science but extremely sparse experiment-count science.

## 18.2 One principal material

SAFFIRE-I used SIBAL.

It cannot provide broad material generalization.

## 18.3 One main airflow magnitude

Both S1/S2 table rows use 20 cm/s.

No SAFFIRE-I airflow sweep.

## 18.4 Narrow oxygen environment

Approximately 21.5-21.7% O2.

No SAFFIRE-I oxygen sweep.

## 18.5 Pressure not systematically varied

Near spacecraft ambient pressure.

No pressure-response curve.

## 18.6 No partial gravity

Microgravity, not Moon/Mars gravity.

## 18.7 One enclosure geometry

The later discovery that duct geometry matters means one Saffire-I duct cannot define universal spacecraft-scale behavior.

## 18.8 Limited repeatability

No large set of replicated S1 runs.

Random/statistical variability is difficult to estimate.

## 18.9 S2 history confounding

S2 followed the main burn and used limited remaining length.

It is not a clean paired replicate differing only by direction.

## 18.10 No suppression experiment

SAFFIRE-I does not directly test an extinguisher.

Suppression belongs to broader fire-safety context, not SAFFIRE-I measurement.

---

# 19. Dataset Limitations

## 19.1 Repository metadata anomalies

- legacy project title/date fields conflict with the 2016 mission;
- thickness unit conflicts between current PSI schema and published physical fabric thickness;
- metadata ZIP filename contains a different PSI number token.

These are ideal targets for provenance-aware auditing.

## 19.2 Archive-count ambiguity

Mission downlink:

- >25 Gbit
- 40,989 images/data files.

PSI version-history counts:

- 74 files added
- 85 removed
- 1 updated.

Neither is the same as "current public dataset file count."

## 19.3 Raw/processed linkage

The public interface does not expose a one-click relational graph from:

`S1 → camera frames → calibration → sensor channels → derived spread curve → paper figure`

That relationship must be reconstructed.

## 19.4 Time synchronization not exposed as a simple schema

The experiment was synchronized operationally, but file-level timestamps/sampling rates require direct inspection of raw assets.

## 19.5 Missing universal uncertainty fields

Published measurements have uncertainty/processing decisions, but PSI does not present one uniform archive-level uncertainty schema.

## 19.6 No structured outcome ontology

PSI gives run metadata, not a machine-readable sequence such as:

`ignition → growth → overshoot → quasi-steady spread → flow shutdown → extinction → opposed reignition`.

GRAVIFIRE can add such a **derived** layer while preserving originals.

---

# 20. Research Gap Inventory

## Physics gaps

### Unknown
How transferable is the SAFFIRE-I quasi-steady behavior across materially different spacecraft fuels?

**Why it matters:** one SIBAL sample cannot define general spacecraft fire growth.

**SAFFIRE-I sufficient?** No.

---

## Scale gaps

### Unknown
How should results transform between small BASS-scale ducts, SAFFIRE-scale ducts, and actual vehicle cabins of different geometry?

**Evidence of gap:** confinement effects remained unexpectedly strong and required later modeling. [S9](https://doi.org/10.1016/j.combustflame.2022.112559) [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

**SAFFIRE-I sufficient?** No; later Saffire/BASS cases needed.

---

## Material gaps

Only SIBAL in SAFFIRE-I.

**Need:** other polymers, fabrics, layered materials, realistic spacecraft assemblies.

---

## Flow gaps

One nominal airflow magnitude.

**Need:** systematic large-scale flow sweep.

---

## Oxygen gaps

Near-normoxic only.

**Need:** lower/higher O2 at meter scale.

---

## Modeling gaps

Models can reproduce major trends, but:

- applicability domains are fragmented;
- boundary conditions differ;
- uncertainty is not unified;
- no single validated spacecraft-cabin transfer model exists.

---

## Validation gaps

A public, machine-readable matrix of:

`model → assumptions → Saffire run → observed quantity → predicted quantity → error → failure mode`

does not appear to exist.

---

## Image-analysis gaps

Basic image analysis is mature.

Less mature opportunities include:

- uncertainty quantification;
- reproducible multi-camera registration;
- frame quality;
- synchronized multimodal event reconstruction.

---

## Time-series gaps

The mission produced rich sensor telemetry, yet much of the scientific literature focuses on a subset of derived flame quantities.

A unified visual + thermal + atmospheric time series appears underdeveloped.

---

## AI/ML gaps

No direct modern ML system was found that uses the full SAFFIRE-I multimodal evidence while preserving physical provenance and uncertainty.

However, the tiny run count makes naive supervised ML inappropriate.

---

## Cross-experiment gaps

Cross-analysis already exists and is active research.

The remaining need is not merely "put datasets together" but to preserve:

- geometry;
- scale;
- material family;
- measurement definitions;
- calibration;
- epistemic status.

---

## Partial-gravity gap

SAFFIRE-I contains no Moon/Mars gravity data.

Not solvable from PSI-98 alone.

---

## Mission-decision gap

There is still a gap between scientific flame measurements and a defensible mission decision such as:

- acceptable material;
- detector placement;
- ventilation response;
- suppression sizing.

SAFFIRE-I contributes evidence but does not alone provide those decision rules.

---

# 21. DO NOT REINVENT THESE

## 1. "Large-scale microgravity flame can reach a quasi-steady state"

Already a principal SAFFIRE-I result. [S4](https://doi.org/10.1016/j.combustflame.2018.10.012)

## 2. Basic SIBAL flame-spread measurement

Already published quantitatively.

## 3. Basic flame-front / pyrolysis-front image processing

Already integral to the scientific analysis.

## 4. Transient model of large SIBAL flame growth

Already validated against SAFFIRE data. [S5](https://doi.org/10.1016/j.proci.2018.05.168)

## 5. "Scale matters"

Too generic and already deeply established.

## 6. "Duct geometry matters"

Already quantified and modeled. [S9](https://doi.org/10.1016/j.combustflame.2022.112559) [S10](https://doi.org/10.1016/j.combustflame.2024.113299)

## 7. Generic BASS + SAFFIRE dataset comparison

Already present in the literature and current NASA-supported work.

## 8. Generic deep-learning flame segmentation

Even if a specific SAFFIRE-I CNN paper was not found, replacing established calibrated segmentation with a neural network is not in itself a scientific contribution.

---

# 22. Data-Rich but Potentially Underexploited Evidence

## 22.1 Multi-camera calibration assets

**Existing use:** calibrated image measurement.

**Opportunity:** reproducible camera-registration pipeline with uncertainty and frame-level provenance.

**Novelty risk:** medium.

## 22.2 Flow-visualization records F1/F2

**Existing use:** verify pre-test flow uniformity.

**Opportunity:** quantify actual field structure and connect it to later flame behavior without relabeling it as a combustion run.

**Novelty risk:** medium.

## 22.3 Sensor + video alignment

**Existing use:** papers use camera and selected thermocouples.

**Opportunity:** create one synchronized event record joining:

- camera fronts;
- radiometer;
- thermocouple;
- O2;
- CO2;
- pressure;
- flow/fan;
- ignition state.

**Novelty risk:** low-medium if the public archive permits full reconstruction.

## 22.4 Transient overshoot

**Existing use:** modeled/published.

**Opportunity:** uncertainty-aware event detection and model-discrepancy analysis.

**Novelty risk:** medium.

## 22.5 Environmental response

**Existing use:** diagnostic context.

**Opportunity:** quantify how large-flame phases map onto measurable spacecraft atmosphere response.

**Novelty risk:** medium, but limited by sensor sensitivity and one burn.

## 22.6 Engineering metadata

**Existing use:** operations/instrument design.

**Opportunity:** provenance reconstruction explaining why some frames/channels differ, including ROI offsets, camera distortion, timing and compression/downlink priorities.

**Novelty risk:** low as research infrastructure.

---

# 23. BASS / BASS-II vs SAFFIRE-I

| Dimension | BASS | BASS-II | SAFFIRE-I |
|---|---|---|---|
| Primary objective | small-scale burning + suppression exploration | systematic ignition/spread/extinction | large-scale fire growth and scale |
| Platform | ISS MSG | ISS MSG | post-ISS free-flying Cygnus |
| Characteristic sample scale | cm-class | cm-class | ~1 m x 0.4 m |
| Main SAFFIRE-overlap fuel | SIBAL | SIBAL / PMMA families | SIBAL |
| Material diversity | high exploratory | moderate, PMMA-heavy | one main material |
| Geometry diversity | sheets, sphere, candle, etc. | sheets, rods, etc. | one large planar fabric |
| Airflow coverage | multiple, very low to tens cm/s | multiple, geometry-specific | 20 cm/s in I |
| Oxygen coverage | limited | expanded/systematic | near ~21.5% |
| Pressure sweep | no | no | no |
| Suppression | direct N2 intervention | extinction science, not same local N2 program | none |
| Cameras | small-duct flame imaging | video/stills | dual long-sample cameras |
| Time-series context | experiment controls + imagery | imagery + controls | cameras + multi-sensor vehicle/fire diagnostics |
| Flame spread | direct/derived | direct/derived | direct/derived |
| Smoke | contextual | contextual | visible/flow visualization + spacecraft context |
| Scale/confinement | small duct | small duct | central scientific variable |
| Run count | many subfamily tests | 129 table records in current GRAVIFIRE ingestion | 2 combustion rows |
| Best use | mechanism/parameter study | mechanism/parameter study | scale/vehicle benchmark |
| ML suitability | subset-dependent | subset-dependent | time-series/multimodal, not row-count ML |
| Mission relevance | mechanism and suppression | material/fire physics | realistic-scale fire growth |

## 23.1 What SAFFIRE-I added that BASS/BASS-II could not

- meter-scale burn length/width;
- prolonged unrestricted growth period;
- large flow-duct / spacecraft interaction;
- significant integrated fire energy;
- realistic vehicle data architecture;
- direct large-scale model validation.

## 23.2 What BASS/BASS-II measure better

- parameter sweeps;
- multiple materials/geometries;
- low-flow extinction;
- oxygen dependence;
- repeat conditions;
- original BASS suppression interventions.

## 23.3 Variables that overlap enough for careful comparison

With provenance and calibration:

- SIBAL material identity;
- sample dimensions;
- flow direction;
- physical flow velocity;
- O2 concentration;
- flame-front position;
- spread rate;
- flame/pyrolysis length;
- experiment/duct dimensions.

## 23.4 Variables that should not be pooled blindly

- table rows across different geometries;
- BASS display variables vs calibrated physical velocity;
- local N2 suppressant flow vs ambient O2 reduction;
- SIBAL sheet spread vs PMMA rod/candle/sphere outcomes;
- small-duct and large-duct data without confinement geometry;
- different image-derived definitions of flame vs pyrolysis front.

---

# 24. Fire Safety Chain Placement

| Chain stage | SAFFIRE-I support | Evidence |
|---|---|---|
| Ignition | **DIRECT** | hot-wire ignition, power/time, ignition imagery |
| Flame Growth | **DIRECT** | long transient growth and limiting-size measurements |
| Flame Spread | **DIRECT** | S1/S2 and published spread histories |
| Smoke | **PARTIAL** | pre-test smoke visualization, visual smoke context, spacecraft diagnostics; not a dedicated smoke-aerosol experiment |
| Detection | **CONTEXT / PARTIAL** | spacecraft smoke-detector context exists, but SAFFIRE-I was not a detector-performance campaign |
| Suppression | **NOT SUPPORTED** | no extinguisher test in SAFFIRE-I |
| Outcome | **PARTIAL** | burn duration, limiting state, flow shutdown/quench; not a general mission fire outcome classifier |

This placement prevents GRAVIFIRE from treating SAFFIRE-I as if it measured the entire fire-safety chain.

---

# 25. GRAVIFIRE Opportunity Matrix

## Opportunity A - Multimodal run reconstruction

**Research question:**  
Can the full S1/S2 experiment be reconstructed as a synchronized scientific timeline across video, flow, temperature, radiation, atmosphere and experiment state?

**Exact SAFFIRE-I data required:**  
camera files, calibration/ROI references, thermocouples, radiometers, O2, CO2, pressure, flow/fan, ignition/relay state.

**Prior work:**  
papers already combine selected imagery and thermal data.

**Existing solution:**  
scientific results exist, but no public evidence graph/timeline was found that exposes all channels and provenance together.

**Proposed contribution:**  
one deterministic event timeline with raw/derived/model evidence kept separate.

**Validation:**  
reproduce published flame-front/pyrolysis histories and known event times.

**Output:**  
interactive evidence timeline + downloadable aligned dataset.

**Novelty potential:** high as scientific infrastructure.  
**Hackathon feasibility:** high if files are accessible.  
**Risk:** raw stream formats/timestamps may require significant parsing.

---

## Opportunity B - Uncertainty-aware flame/pyrolysis measurement

**Question:**  
How sensitive are SAFFIRE-I derived spread and length metrics to segmentation, camera calibration, ROI stitching and frame quality?

**Data:**  
S1C1/S1C2 raw images, distortion grids, ROI offsets, published benchmark curves.

**Prior work:**  
quantitative image processing exists.

**New contribution:**  
measurement intervals/confidence plus explicit quality flags rather than one deterministic edge.

**Method:**  
calibration-aware segmentation ensemble + perturbation/error propagation.

**Validation:**  
compare derived values with Urban et al. and Li et al.

**Novelty potential:** medium-high.  
**Feasibility:** high on a curated sequence.  
**Prior-work risk:** medium.

---

## Opportunity C - PSI metadata contradiction auditor

**Question:**  
Can GRAVIFIRE automatically detect and explain source conflicts without silently overwriting NASA records?

**SAFFIRE-I cases already present:**

- 2001-2008 project dates vs 2016 flight;
- legacy smoke-detection proposal title vs Saffire title/objective;
- 0.37 cm table thickness vs ~0.37 mm published fabric;
- mission-downlink file count vs PSI version-history counts;
- metadata filename containing PSI-166 inside PSI-98.

**Method:**  
claim extraction + field semantics + source authority + contextual reconciliation.

**Validation:**  
expert-reviewed set of known conflict pairs.

**Output:**  
`CONFLICT`, `CONTEXT_DIFFERENCE`, `LIKELY_SCHEMA_ERROR`, `UNRESOLVED`.

**Novelty potential:** high.  
**Feasibility:** high.  
**Scientific limitation:** system should flag, not autonomously rewrite primary evidence.

---

## Opportunity D - Model applicability and discrepancy atlas

**Question:**  
Which published Saffire/BASS models are valid for SAFFIRE-I conditions, and where do they diverge?

**Data:**  
S1 measurements, published model predictions, geometry, material properties.

**Prior work:**  
successful transient/confinement models exist.

**New contribution:**  
model cards tied to experimental domains:

`model → assumptions → geometry → variables → validation case → error → known failure`

**Validation:**  
reproduce published comparison points.

**Novelty potential:** medium-high.  
**Feasibility:** high for 2-3 models.  
**Risk:** some numeric predictions may only be recoverable from figures.

---

## Opportunity E - Scale-transfer evidence map: BASS/BASS-II ↔ SAFFIRE-I

**Question:**  
Which flame-spread relations transfer across scale and which fail because of duct/sample geometry?

**Data:**  
SIBAL-compatible BASS/BASS-II records plus SAFFIRE-I.

**Prior work:**  
Olson 2023 and Cui/Liao 2024 already study confinement/scale.

**Existing solution:**  
major physical explanation exists.

**Potential new contribution:**  
not a new scale law, but an **evidence applicability map** showing where a small-scale relation can and cannot be used.

**Validation:**  
paper-reported cases.

**Novelty potential:** medium.  
**Feasibility:** high.  
**Prior-work risk:** high if framed as discovering scale effects; lower if framed as evidence/model applicability.

---

## Opportunity F - Model-disagreement-based experiment recommendation

**Question:**  
Where would a future spacecraft fire test provide the most information: sparse evidence, high uncertainty, or disagreement between valid models?

**Data:**  
validated model surfaces + existing experiment conditions + uncertainties.

**SAFFIRE-I alone sufficient?**  
No. Useful only as one anchor in a broader experiment family.

**Method:**  
scientifically constrained acquisition score.

**Validation:**  
retrospective holdout of known cases.

**Novelty potential:** medium-high.  
**Feasibility:** medium.  
**Risk:** current NASA partial-gravity/meta-analysis work overlaps with "what to test next" motivation.

---

## Opportunity G - Generic ML predictor

**Question:**  
Can a model learn SAFFIRE-I flame behavior from the Experimental Table?

**Assessment:**  
not scientifically credible as a primary contribution.

There are only two combustion rows. A row-level ML model would be meaningless.

Time-series or physics-informed surrogate work could be possible, but must be anchored in many frames/sensor points without pretending those temporal samples are independent experimental replicates.

**Novelty potential:** low as generic ML.  
**Scientific risk:** very high.

---

# 26. SAFFIRE-I Research Gap Map

## WELL SOLVED / STRONGLY ADVANCED

- qualitative and quantitative characterization of the main large SIBAL concurrent burn;
- existence of a quasi-steady large-scale microgravity spread state;
- transient large-sample pyrolysis overshoot;
- first-order transient model validation;
- recognition that scale/confinement changes spread;
- basic calibrated flame/pyrolysis image analysis.

## PARTIALLY SOLVED

- general confinement law across spacecraft geometries;
- transfer from small BASS/BASS-II ducts to large spacecraft ducts;
- quantitative surface heat-flux reconstruction;
- Earth-to-space scale/flammability translation;
- sensor-based reconstruction of total fire severity.

## OPEN

- generalization beyond SIBAL;
- pressure response;
- high/low O2 large-scale response;
- Moon/Mars partial gravity;
- universal enclosure/ventilation scaling;
- robust uncertainty propagation from camera/sensor to model;
- operational decision rules linking fire evidence to spacecraft response.

## DATA-RICH BUT UNDEREXPLOITED

- calibrated multi-camera raw imagery;
- flow-visualization sequences;
- full sensor + video synchronization;
- engineering/calibration metadata;
- environmental response aligned to flame-growth phases;
- frame-level measurement uncertainty.

## NOT SOLVABLE WITH SAFFIRE-I ALONE

- broad material flammability;
- suppression effectiveness;
- partial-gravity prediction;
- smoke-particle/detector physics;
- large-scale O2/pressure response;
- generalized spacecraft-fire risk.

## HIGH-POTENTIAL GRAVIFIRE OPPORTUNITIES

1. multimodal evidence timeline;
2. uncertainty-aware image-derived measurement;
3. source/schema contradiction auditing;
4. model applicability/discrepancy atlas;
5. family-aware scale-transfer evidence map;
6. evidence-gap / next-test reasoning based on disagreement rather than density alone.

---

# 27. Evidence-Quality Audit

## High confidence

- PSI-98 identity, DOI, version, license;
- Cygnus OA-6 flight and June 2016 burn;
- S1/S2 Experimental Table values as source text;
- SIBAL composition;
- 94 x 40.6 cm scale;
- 20 cm/s flow;
- dual-camera experiment;
- major quasi-steady flame result;
- 25+ Gbit / 40,989 mission-downlinked image/data files;
- principal peer-reviewed papers and DOIs.

## High-confidence source conflict

- PSI thickness unit vs published physical SIBAL thickness.

This is not reason to discard PSI. It is reason to expose provenance.

## Medium confidence pending file-level audit

- exact current PSI public-file count;
- exact raw image count by camera/run;
- exact sample rates for each released sensor file;
- channel-level synchronization uncertainty;
- exact amount of raw vs compressed imagery retained publicly.

## No evidence found / not verified

- associated PSI Modeling Table;
- direct SAFFIRE-I extinguisher/suppression test;
- SAFFIRE-I-specific modern deep-learning predictor;
- SAFFIRE-I-specific active-learning system;
- documented specific NASA standard revision caused solely by SAFFIRE-I.

---

# 28. Official NASA Visual Evidence

The portable report uses original GRAVIFIRE schematics for repeatable rendering, but the following **official NASA visual sources** should be used in presentations or web versions where remote imagery can be embedded with attribution:

1. **Saffire-I hardware installed inside Cygnus**  
   NASA image article:  
   https://www.nasa.gov/image-article/saffire-i-hardware/

2. **SAFFIRE-I flame and mission image compilation, including green LED frames**  
   NASA Glenn mission article:  
   https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/

3. **Cygnus OA-6 released from ISS before SAFFIRE-I operations**  
   Image credit: ESA/NASA  
   https://www.nasa.gov/image-article/cygnus-cargo-craft-released-from-space-station/

4. **Official experiment hardware schematic**  
   NASA NTRS, *The Spacecraft Fire Experiment (Saffire) - Objectives, Development and Status*, Fig. 1:  
   https://ntrs.nasa.gov/citations/20170001636

These sources provide direct mission imagery and the official flow-duct/avionics-bay layout.

---

# 29. Recommended GRAVIFIRE Data Model for PSI-98

A defensible SAFFIRE-I structure should separate:

```text
Investigation: PSI-98
|
+-- Mission / vehicle
|   +-- Cygnus OA-6
|   +-- pressure / atmospheric context
|   +-- experiment clock
|
+-- Test records
|   +-- S1 concurrent combustion
|   +-- S2 opposed combustion
|   +-- F1 flow visualization
|   +-- F2 flow visualization
|
+-- Raw evidence
|   +-- Camera 1
|   +-- Camera 2
|   +-- calibration / distortion / ROI
|   +-- thermocouples
|   +-- radiometers
|   +-- O2 / CO2 / pressure
|   +-- airflow / fan
|   +-- ignition / electrical state
|
+-- Derived measurements
|   +-- flame front
|   +-- pyrolysis front
|   +-- flame length
|   +-- spread rate
|   +-- transient phase
|   +-- uncertainty
|
+-- Model evidence
|   +-- transient flame-spread model
|   +-- confinement model
|   +-- heat-flux inversion
|
+-- Scientific claims
    +-- source
    +-- evidence class
    +-- applicability domain
    +-- limitation
    +-- conflict / uncertainty
```

This representation preserves the difference between **two experiments** and **tens of thousands of time-resolved observations**.

---

# 30. Research Opportunity Decision Guardrails

Before GRAVIFIRE claims any SAFFIRE-I novelty, require all of the following:

1. **Run identity preserved**  
   F1/F2 cannot be mislabeled as fires.

2. **Source-unit conflict visible**  
   PSI thickness value/unit cannot be silently changed.

3. **Derived values labeled derived**  
   spread rate and flame length are not PSI raw sensor readings.

4. **Scale boundary explicit**  
   BASS/BASS-II relations are not assumed valid in the SAFFIRE duct.

5. **Model applicability explicit**  
   successful Saffire model validation does not mean a universal spacecraft-fire model.

6. **Temporal samples not treated as independent experiments**  
   thousands of frames do not create thousands of experimental replicates.

7. **Current NASA prior art checked**  
   cross-dataset/partial-gravity work is active.

8. **No final "safe/unsafe" classification without evidence**  
   SAFFIRE-I provides fire-behavior evidence, not a universal material-safety label.

---

# 31. Final SAFFIRE-I Synthesis

SAFFIRE-I's unique contribution was to move NASA fire research from **"How does a small sample burn in microgravity?"** toward **"How does a spacecraft-relevant fire grow when the fuel and enclosure are large enough for scale to matter?"**

Its main scientific legacy is not a huge number of experimental conditions. It is a **deep, instrumented, time-resolved benchmark** of a large SIBAL fire inside an actual spacecraft vehicle.

Three conclusions are especially durable:

1. **Large microgravity fire growth can approach a quasi-steady state under forced flow.**
2. **Enclosure geometry is part of the fire physics and can invalidate naive transfer from small ducts.**
3. **A realistic-scale spacecraft fire creates a multimodal evidence problem - video, flow, temperature, radiation, atmosphere, calibration, and models must be interpreted together.**

For GRAVIFIRE, that third point is especially important.

The strongest apparent opportunity is not to train a row-level predictor from two combustion tests. It is to make SAFFIRE-I's evidence **synchronized, provenance-grounded, uncertainty-aware, model-aware, and comparable across scale without destroying the physical context**.

No final GRAVIFIRE research contribution is selected here. SAFFIRE-II and the remaining NASA experiment families still require independent research before the opportunity space can be compared responsibly.

---

# 32. Source List

**S1 - NASA Physical Sciences Informatics, PSI-98**  
Spacecraft Fire Safety Experiment-I (SAFFIRE-I), Version 4. DOI 10.60555/0t15-1z43.  
https://psi.nasa.gov/physci/repo/data/investigations/PSI-98

**S2 - NASA Glenn, SAFFIRE-I mission article and mission updates**  
*NASA Ignites Fire Experiment Aboard Space Cargo Ship*. 23 Jun 2016.  
https://www.nasa.gov/centers-and-facilities/glenn/nasa-ignites-fire-experiment-aboard-space-cargo-ship/

**S3 - Schoren, Ruff & Urban**  
*The Spacecraft Fire Experiment (Saffire) - Objectives, Development and Status*. NASA NTRS 20170001636.  
https://ntrs.nasa.gov/citations/20170001636

**S4 - Urban et al.**  
*Flame spread: Effects of microgravity and scale*. *Combustion and Flame* 199 (2019), 168-182. DOI 10.1016/j.combustflame.2018.10.012.  
https://doi.org/10.1016/j.combustflame.2018.10.012

**S5 - Li et al.**  
*Transient flame growth and spread processes over a large solid fabric in concurrent low-speed flows in microgravity - Model versus experiment*. *Proceedings of the Combustion Institute* 37(3) (2019), 4163-4171. DOI 10.1016/j.proci.2018.05.168.  
https://doi.org/10.1016/j.proci.2018.05.168

**S6 - NASA NTRS**  
*Results of Large-Scale Spacecraft Flammability Tests*. NTRS archive 20170008805.  
https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20170008805.pdf

**S7 - Ruff & Urban**  
*Operation and Development Status of the Spacecraft Fire Experiments (Saffire)*. NASA NTRS 20170000230.  
https://ntrs.nasa.gov/citations/20170000230

**S8 - Jomaas et al.**  
*Fire safety in space - beyond flammability testing of small samples*. *Acta Astronautica*. DOI 10.1016/j.actaastro.2014.11.025.  
https://doi.org/10.1016/j.actaastro.2014.11.025

**S9 - Olson et al.**  
*The effect of duct size, sample size, and fuel composition on concurrent flame spread over large cellulose samples in microgravity*. *Combustion and Flame* 248 (2023), 112559. DOI 10.1016/j.combustflame.2022.112559.  
https://doi.org/10.1016/j.combustflame.2022.112559

**S10 - Cui & Liao**  
*Numerical study of the effects of confinement on large-scale fires in microgravity*. *Combustion and Flame* 261 (2024), 113299. DOI 10.1016/j.combustflame.2024.113299.  
https://doi.org/10.1016/j.combustflame.2024.113299

**S11 - NASA Task Book, current PSI re-analysis**  
*Predicting Material Flammability in Partial Gravity Using Microgravity and Ground Data*, PI Ya-Ting Liao.  
https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content

**S12 - NASA / ESA mission image**  
*Cygnus Cargo Craft Released From Space Station*. 15 Jun 2016.  
https://www.nasa.gov/image-article/cygnus-cargo-craft-released-from-space-station/

**S13 - NASA NTRS**  
*Saffire: A Novel Approach to Study of Spacecraft Fire Safety Using Un-Manned Spacecraft*.  
https://ntrs.nasa.gov/citations/20180005168

**S14 - NASA image article**  
*Saffire-I Hardware*.  
https://www.nasa.gov/image-article/saffire-i-hardware/

---

## Research Status

**SAFFIRE-I / PSI-98: deep individual-family review complete for the current GRAVIFIRE research sequence.**

**Next experiment family:** intentionally not researched in this report. Move to SAFFIRE-II only when explicitly requested.
