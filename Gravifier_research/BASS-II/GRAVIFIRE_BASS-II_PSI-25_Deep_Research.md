# GRAVIFIRE Deep Research Report

## BASS-II / NASA PSI-25
### Evidence Audit, Literature Review, Prior Art, and Research Gap Map

**Project:** GRAVIFIRE - NASA International Space Apps Challenge 2026  
**Investigation:** Burning and Suppression of Solids-II (BASS-II)  
**NASA PSI:** PSI-25, Version 4  
**DOI:** 10.60555/4qc4-de67  
**NASA Center:** Glenn Research Center  
**Flight Platform:** International Space Station  
**Prepared:** 1 October 2026

> **Evidence standard used in this report**  
> Every important statement is classified, where useful, as **Measured**, **Derived**, **Modeled**, **Interpreted**, or **Open/Unverified**. BASS-II experiment families are kept separate. A table field is never silently converted into a physical variable unless the source supports that conversion.

---

## Executive Summary

BASS-II was designed to study ignition, flame growth, flame spread, and extinction of solid fuels in low-velocity forced flow in microgravity, and to help bridge the gap between terrestrial NASA-STD-6001 material screening and actual spacecraft combustion behavior. The investigation varied ambient oxygen, ventilation flow, fuel type, thickness, and geometry, using the Microgravity Science Glovebox on the ISS. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25) [S2](https://ntrs.nasa.gov/citations/20210011385)

The central result of this review is that **BASS-II is scientifically rich but not unexplored**. Thin-PMMA spread regimes, low-flow radiative extinction, PMMA-rod quenching and blowoff, SIBAL growth and quenching, optical burning-rate estimation, and several gravity/ground-test comparisons have already been studied with physics-based theory, CFD, image processing, and experiment-driven correlations. [S6](https://doi.org/10.1016/j.firesaf.2015.11.011) [S7](https://doi.org/10.1016/j.combustflame.2015.10.023) [S8](https://doi.org/10.1016/j.proci.2016.06.025) [S10](https://doi.org/10.1016/j.combustflame.2017.03.001) [S12](https://doi.org/10.1016/j.proci.2016.06.028) [S15](https://doi.org/10.1016/j.combustflame.2021.111846)

For GRAVIFIRE, the strongest remaining BASS-II opportunities are therefore less likely to be "another flame predictor" and more likely to involve **uncertainty-aware measurement, provenance, model applicability, model-discrepancy synthesis, evidence reconciliation, temporal event reconstruction, and scientifically constrained knowledge-gap reasoning**.

A second major prior-art constraint is current NASA work. A 2023-2026 NASA-funded project led by Ya-Ting Liao is already processing BASS/BASS-II images and video, extracting flame progression and overlaid airflow information, and building cross-investigation comparisons aimed at partial-gravity flammability. Generic claims such as "first computer vision analysis of BASS-II" or "first cross-dataset BASS/BASS-II meta-analysis" are therefore not defensible. [S17](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

### Key takeaways

- **Strongly established:** thin-PMMA spread regimes, low-flow extinction physics, PMMA-rod flammability boundaries, rod blowoff mechanisms, SIBAL low-flow quenching, and conventional image-derived spread measurements.
- **Partially solved:** intermediate-thickness PMMA CFD, boundary-layer effects, reduced-pressure analogs, optical burning-rate inference, and cross-investigation normalization.
- **Open or underdeveloped:** repository-wide uncertainty propagation, model applicability maps, structured evidence reconciliation, run-level outcome ontologies, contradiction-aware scientific synthesis, and scientifically constrained next-experiment reasoning.
- **Do not overclaim:** BASS-II did not directly establish Moon/Mars partial-gravity behavior, a universal spacecraft-material fire model, a universal pressure response, or a verified generic "safe/unsafe" classifier.

---

## 1. Investigation Identity and NASA Motivation

### Verified identity

| Field | Verified value |
|---|---|
| Investigation | Burning and Suppression of Solids-II |
| Acronym | BASS-II |
| PSI ID | PSI-25 |
| PSI version | Version 4 |
| DOI | 10.60555/4qc4-de67 |
| Research area | Combustion Science |
| Sub-research area | Spacecraft Fire Safety |
| Platform | International Space Station |
| NASA center | Glenn Research Center |
| License | CC0-1.0 |
| Related investigation | PSI-26, original BASS |

NASA states that BASS-II was intended to study **ignition, flame growth, flame spread, and extinction limits** of solid fuels in low-velocity forced flow and to help connect normal-gravity screening, short-duration ground microgravity work, and actual long-duration microgravity flammability. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)

### Why ground testing was not enough

On Earth, buoyancy strongly affects oxygen transport, flame shape, convective cooling, and heat feedback. In orbital microgravity, buoyant convection is removed and forced ventilation plus diffusion can dominate. BASS-II therefore asked whether a terrestrial upward-burning screening test necessarily bounds the worst spacecraft condition. NASA framed this as a material-flammability and spacecraft fire-safety problem, not merely a combustion-physics demonstration. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25) [S3](https://ntrs.nasa.gov/citations/20160000593)

---

## 2. Experimental Design

### 2.1 Facility and hardware

BASS-II used a small flow duct inside the ISS **Microgravity Science Glovebox (MSG)**. The experiment allowed controlled fan-driven flow, crew-controlled ignition, synchronized imaging, and pre/post gas measurements. A video camera with data overlay and a still camera recorded the events. BASS-II also introduced working-volume oxygen reduction in the MSG using gaseous nitrogen, supported by a perfectly stirred reactor model and onboard oxygen measurements. [S2](https://ntrs.nasa.gov/citations/20210011385)

### 2.2 Measurements and instrumentation

| Measurement or control | Status | Scientific use | Important caveat |
|---|---|---|---|
| Ambient O2 concentration | Controlled/measured | flammability and extinction | configuration dependent |
| Ventilation flow | Controlled, instrumented | spread, quench, blowoff | PSI display fields should not be assumed to equal calibrated physical velocity |
| Fuel type and geometry | Controlled | family-specific behavior | families must remain separate |
| Fuel thickness/diameter | Controlled | thermal response and flammability | thickness affects regime |
| Video | Direct evidence | spread, flame shape, events | image-derived values are derived data |
| High-resolution stills | Direct evidence | geometry and flame structure | framing varies by experiment |
| Radiometer | Measured signal | relative flame dynamics | instrument was not an absolute heat-flux ground truth |
| O2, CO2, CO | Pre/post measurements | combustion completeness, global behavior | not a local time-resolved species field |
| Burn time | Recorded/derived | HRR and event timing | procedure dependent |

NASA's summary report states that BASS-II used CSA-CP O2 and CO readings plus a Carbon Dioxide Monitor before and after tests. The report also derives heat-release rate from oxygen consumption using 13.1 kJ per gram of O2 consumed, with most tests reported well below 100 W. [S2](https://ntrs.nasa.gov/citations/20210011385) [S4](https://ntrs.nasa.gov/citations/20150019858)

### 2.3 Materials and geometries

The overall BASS-II program included multiple subfamilies rather than one homogeneous dataset:

- **Thin PMMA sheets/films**, including nominal 100, 200, 300, and 400 micrometer classes in published work.
- **Intermediate/thicker PMMA sheets and slabs**, including millimeter-scale thicknesses.
- **PMMA rods/cylinders**, clear and black, used for concurrent axial-flow flammability and blowoff studies.
- **SIBAL cotton/fiberglass composite fabric**, used for concurrent flame growth, spread, and quenching studies.
- **Spherical or spherical-section PMMA configurations**, including a 4 cm acrylic spherical section in ISS operations.
- Limited additional materials/configurations, including Nomex and legacy/auxiliary samples in the broader program record. [S2](https://ntrs.nasa.gov/citations/20210011385) [S3](https://ntrs.nasa.gov/citations/20160000593) [S21](https://www.nasa.gov/blogs/stationreport/2014/07/23/iss-daily-summary-report-07-23-14/) [S22](https://www.nasa.gov/blogs/stationreport/2014/07/08/iss-daily-summary-report-07-08-14/)

### 2.4 Parameter ranges must stay subfamily-specific

There is no single universal "BASS-II airflow range." NASA overview material describes a small wind tunnel with speeds up to roughly 53 cm/s, while the rod flammability work reports 0-55 cm/s and oxygen from about 13.6% to 22.2%. Thin-sheet studies concentrate much more heavily on lower opposed-flow velocities. [S3](https://ntrs.nasa.gov/citations/20160000593) [S10](https://doi.org/10.1016/j.combustflame.2017.03.001)

**GRAVIFIRE rule:** store the physical condition at the **run/subexperiment level**, not as one investigation-wide number.

---

## 3. Public Data and Repository Audit

NASA PSI identifies PSI-25 as **Version 4** and provides the official investigation landing page, metadata, publications, and repository structure. The version history reports hundreds of added files, but this is a **repository file count, not an experiment count**. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)

### 3.1 GRAVIFIRE-verified local ingestion state

The current GRAVIFIRE BASS-II ingestion contains:

- **129 validated Experimental Table records**
- **0 rejected records**
- exact source provenance
- Test B1 / Sample 147 linked to raw NASA video
- BASS-II Summary Report
- 144 report pages
- 271 citation-safe chunks

### 3.2 Critical Experimental Table limitation

The Experimental Table does **not** provide verified universal row-level fields for:

- calibrated physical airflow velocity
- pressure
- flame-spread rate
- a generic combustion outcome label

Therefore "Air display" or "Fan display" must not be silently relabeled as physical airflow without a calibration or documented mapping.

### 3.3 Resource inventory

| Resource | Public status | What it contains | GRAVIFIRE value |
|---|---|---|---|
| Investigation metadata | Public | identity, objectives, provenance, version | Essential |
| Experimental Table | Public / locally ingested | run/sample metadata | Essential but not a complete supervised-learning table |
| Raw video | Public | time-resolved flame evidence plus overlays in some runs | Very high |
| Still images | Public | higher-resolution flame geometry | High |
| Summary report | Public NASA TM | design, operations, science sections, anomalies, references | Essential |
| Engineering documents | Public repository category/examples | requirements and hardware context | High |
| Science/reference documents | Public repository categories | interpretation and supporting evidence | High |
| Publications | Public metadata; access varies | peer-reviewed interpretation and models | Essential |
| Gas analysis | NASA/NTRS | pre/post O2, CO2, CO; derived HRR | High |
| Modeling Table | **Unresolved** | no separately exposed BASS-II Modeling Table could be independently verified | Do not invent |

### 3.4 Raw vs derived evidence

A useful BASS-II data architecture should separate:

1. **Direct NASA measurement** - sensor reading, source image, run metadata.
2. **Derived measurement** - spread rate, flame area, flame length, optical burning rate.
3. **Modeled quantity** - CFD or analytical prediction.
4. **Interpretation** - radiative regime, quenching mechanism, model applicability.
5. **Hypothesis/open question** - untested parameter region or causal explanation.

---

## 4. Major Scientific Findings

### 4.1 Thin PMMA: radiative, thermal, and kinetic spread regimes

BASS-II thin-PMMA experiments captured the classic **radiative, thermal, and kinetic regimes** of opposed-flow flame spread within one experimental program. Digital video processing was used to obtain spread rates, which were compared with theory and computational models. [S8](https://doi.org/10.1016/j.proci.2016.06.025)

**Meaning:** the relationship between forced flow and spread is not monotonic across all regimes. At very low flow, radiative heat loss can dominate and lead toward extinction. At intermediate flow, a thermal regime can appear. At sufficiently high flow, finite-rate chemistry and residence-time limits can drive blowoff.

### 4.2 Low-flow radiative extinction

The critical-flow study combined scaling, numerical modeling, and limited ISS validation to examine a minimum opposed-flow condition below which radiative loss can extinguish a thin-PMMA flame. [S7](https://doi.org/10.1016/j.combustflame.2015.10.023)

**Status:** strong evidence within the tested PMMA domain, not a universal material law.

### 4.3 PMMA rods: quenching and blowoff boundary

Concurrent-flow rod experiments used clear and black PMMA rods under roughly 0-55 cm/s flow and about 13.6-22.2% O2. The researchers identified two physically different extinction regimes: low-flow quenching and high-flow blowoff. [S10](https://doi.org/10.1016/j.combustflame.2017.03.001)

The blowoff boundary was interpreted through Damkohler-number and energy-balance reasoning. Later ground experiments used the same geometry to relate normal-gravity mixed-convection blowoff to the microgravity boundary. [S13](https://doi.org/10.1016/j.proci.2018.05.081)

### 4.4 Gravity comparison for PMMA cylinders

Direct microgravity/1g comparison showed that solid-fuel behavior depends on the combined effects of gravity, oxygen, imposed flow, and geometry. The normal-gravity case cannot simply be assumed to bound all spacecraft conditions. [S11](https://doi.org/10.1038/s41598-017-18398-4)

### 4.5 SIBAL fabric growth and quenching

BASS-II SIBAL tests examined transient flame growth, spread, and low-flow quenching in purely forced microgravity flow, with detailed transient modeling used to interpret the results. [S12](https://doi.org/10.1016/j.proci.2016.06.028)

### 4.6 Intermediate-thickness PMMA: important model mismatch

Intermediate-thickness PMMA work used CFD/FDS-style modeling to reproduce the flight configuration, but spread rates were overpredicted in the reported modeling study. This is scientifically valuable because it provides a **model-discrepancy case**, not just another successful fit.

### 4.7 Optical burning-rate estimation

Later work used BASS-II PMMA-rod imagery to compare optical methods for estimating burning rate. Flame-sheet area was found more robust than simple fuel-regression or leading-edge tracking for the tested configuration, which were more sensitive to camera resolution and background. [S15](https://doi.org/10.1016/j.combustflame.2021.111846)

### 4.8 Radiation

BASS-II radiation work examined how recorded flame radiation changed with oxygen, flow, and thin-PMMA conditions. The radiometer signal is useful for relative dynamics, but it should not be treated as an automatically calibrated absolute heat-flux field. [S16](https://doi.org/10.1007/s10694-019-00884-y) [S2](https://ntrs.nasa.gov/citations/20210011385)

---

## 5. Literature Matrix

| Work | BASS-II data used | Main method | Contribution | Important limitation |
|---|---|---|---|---|
| Bhattacharjee et al., 2016, Fire Safety Journal | thin PMMA sheets | microgravity + 1g comparison, scaling | established thermal-regime behavior and transition concepts | PMMA-specific |
| Bhattacharjee et al., 2016, Combustion and Flame | thin PMMA | scaling + numerical model + ISS validation | critical low-flow radiative extinction formulation | limited flight cases |
| Bhattacharjee et al., 2017, Proc. Combustion Institute | thin PMMA | video-derived spread + theory + computation | radiative, thermal, kinetic regimes | family-specific |
| Carmignani et al., 2018 | thin PMMA | experiment + simulation | boundary-layer effects and unresolved mismatch | finite duct/development length |
| Olson & Ferkul, 2017 | PMMA rods | ISS experiment + energy balance/Damkohler | microgravity quench/blowoff boundary | specific rod geometry/material |
| Link et al., 2018 | PMMA cylinders | ISS + Earth comparison | gravity effect on flame spread | limited materials/conditions |
| Zhao et al., 2017 | SIBAL | experiment + transient modeling | growth, spread, low-flow quenching | composite model fuel |
| Marcum et al., 2019 | BASS-II rod geometry as benchmark | extensive normal-gravity follow-on | ground-to-microgravity blowoff correlation | not universal across materials |
| Olson et al., 2019 | PMMA rod blowoff | high-speed video + BASS-II context | post-blowoff oscillation dynamics | narrow phenomenon |
| Xiong et al., 2022 | BASS-II PMMA rod imagery | optical measurement methods | burning-rate estimation via flame area | configuration-specific |
| Carmignani et al., 2020 | thin PMMA | experiment + numerical radiation study | radiation trends | radiometer calibration limits |

### Selected DOI links

- Thermal regime: [S6](https://doi.org/10.1016/j.firesaf.2015.11.011)
- Critical radiative extinction: [S7](https://doi.org/10.1016/j.combustflame.2015.10.023)
- Three-regime study: [S8](https://doi.org/10.1016/j.proci.2016.06.025)
- Boundary-layer effect: [S9](https://doi.org/10.1080/00102202.2017.1404587)
- Rod flammability boundary: [S10](https://doi.org/10.1016/j.combustflame.2017.03.001)
- Gravity effect on PMMA cylinders: [S11](https://doi.org/10.1038/s41598-017-18398-4)
- SIBAL growth/quenching: [S12](https://doi.org/10.1016/j.proci.2016.06.028)
- Ground/microgravity blowoff correlation: [S13](https://doi.org/10.1016/j.proci.2018.05.081)
- Flame oscillations after blowoff: [S14](https://doi.org/10.1016/j.proci.2018.05.080)
- Optical burning-rate estimation: [S15](https://doi.org/10.1016/j.combustflame.2021.111846)
- Radiation study: [S16](https://doi.org/10.1007/s10694-019-00884-y)

---

## 6. Modeling and Validation History

BASS-II does not contain one universal model. It contains several **subfamily-specific models and correlations**, each with its own applicability domain.

### A. MSG nitrogen-dilution model

**Purpose:** experiment operations and target oxygen control, not flame prediction.  
**Inputs:** starting atmosphere, N2 flow, duration, effective working-volume mixing.  
**Output:** estimated working-volume oxygen level.  
**Validation:** calibrated against onboard oxygen measurements. [S2](https://ntrs.nasa.gov/citations/20210011385) [S4](https://ntrs.nasa.gov/citations/20150019858)

### B. Thin-PMMA opposed-flow theory/model

**Purpose:** flame spread and extinction across radiative/thermal/kinetic regimes.  
**Outputs:** spread behavior, extinction limits, flame-shape evolution.  
**Validation:** BASS-II thin-sheet flight data. [S7](https://doi.org/10.1016/j.combustflame.2015.10.023) [S8](https://doi.org/10.1016/j.proci.2016.06.025)

### C. Intermediate-PMMA CFD/FDS model

**Purpose:** simulate millimeter-scale PMMA sheets in the flight duct.  
**Result:** documented spread-rate overprediction.  
**Scientific value:** a model-discrepancy target for GRAVIFIRE, not evidence that the experiment was "unsolved."

### D. SIBAL transient combustion model

**Purpose:** transient ignition/growth/spread/quench of composite fabric.  
**Validation:** flight trends and boundary behavior. [S12](https://doi.org/10.1016/j.proci.2016.06.028)

### E. PMMA-rod energy-balance and critical-Damkohler framework

**Purpose:** concurrent rod quenching and blowoff.  
**Validation:** BASS-II rod boundary. [S10](https://doi.org/10.1016/j.combustflame.2017.03.001)

### Model-use rule for GRAVIFIRE

Existing models should be represented as:

> **model + assumptions + valid geometry + valid material + parameter domain + validation cases + failure cases**

A generic model selector that ignores those boundaries would be scientifically misleading.

---

## 7. Raw Video and Computer-Vision Opportunity

BASS-II raw video is a major asset because the footage can contain both flame evolution and experimental overlays. Yet visual analysis is **not novel by itself**.

### Already done

- digital thresholding and flame-front extraction
- spread-rate extraction
- flame-position tracking
- flame-area measurement
- fuel-regression measurement
- post-blowoff oscillation tracking
- optical burning-rate estimation [S8](https://doi.org/10.1016/j.proci.2016.06.025) [S14](https://doi.org/10.1016/j.proci.2018.05.080) [S15](https://doi.org/10.1016/j.combustflame.2021.111846)

### Current NASA work raises the novelty bar

The active NASA project "Predicting Material Flammability in Partial Gravity Using Microgravity and Ground Data" is processing BASS and BASS-II imagery, using edge tracing, test-specific thresholds, text-overlay processing, and extraction of real-time airflow and flame-location histories for much of the archive. It also aims at cross-project meta-analysis and partial-gravity correlations. [S17](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

### Scientifically defensible remaining video opportunities

1. **Uncertainty-aware flame measurement** - quantify how segmentation threshold, resolution, saturation, and background alter derived quantities.
2. **Temporal event reconstruction** - ignition, stable spread, control change, instability, quench, blowoff.
3. **Model-validation timeline** - align measured events with predictions and show where models diverge.
4. **Relative multimodal synchronization** - video geometry plus flow/radiometer signals, with calibration caveats preserved.

---

## 8. AI / ML Prior-Art Audit

| Idea | What exists | Current assessment for BASS-II |
|---|---|---|
| Generic flame segmentation | classical threshold/edge processing; current NASA archive-scale work | **Already occupied** |
| Flame-front tracking | multiple published studies | **Well established** |
| Flame-spread prediction | analytical, numerical, CFD, correlations | **Well studied** |
| Extinction prediction | thin PMMA, rods, SIBAL subfamilies | **Well/partially solved by subfamily** |
| Optical burning-rate inference | published using BASS-II imagery | **Already demonstrated** |
| Modern ML predictor trained directly on PSI-25 | no clear BASS-II-specific publication found in targeted search | **Apparently open, but scientifically risky** |
| Deep-learning flame segmentation | no BASS-II-specific publication identified | **Open technically, weak novelty if only segmentation** |
| Uncertainty-aware predictive framework | no full BASS-II framework identified | **Underdeveloped** |
| Bayesian/active-learning next-test selection | no BASS-II-specific system identified | **Apparently open** |
| Evidence-grounded scientific QA | no BASS-II-specific system identified | **Apparently open** |
| Automatic contradiction detection | no BASS-II-specific system identified | **Apparently open** |
| Cross-dataset integration | active NASA work | **High duplication risk** |
| Partial-gravity extrapolation | active NASA work | **High duplication risk** |

**Important:** "no evidence found" is not equivalent to "no work exists." It means targeted searches did not reveal a directly matching publication/system.

---

## 9. What BASS-II Actually Contributed to Spacecraft Fire Safety

### Experimentally demonstrated / strongly supported

- Solid-fuel combustion in microgravity is highly sensitive to imposed flow, oxygen, geometry, and thickness.
- Low-flow and high-flow extinction can arise from different physical mechanisms.
- Normal-gravity behavior does not automatically bound every microgravity condition.
- Long-duration ISS data provide validation cases unavailable from short drop experiments. [S3](https://ntrs.nasa.gov/citations/20160000593) [S10](https://doi.org/10.1016/j.combustflame.2017.03.001) [S11](https://doi.org/10.1038/s41598-017-18398-4)

### Model-supporting / design-relevant

NASA states that BASS-II results contribute to combustion computational models relevant to fire detection and suppression design and to strategies for material flammability screening. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25) [S2](https://ntrs.nasa.gov/citations/20210011385)

### What was not verified in this review

No primary source was found showing that one specific BASS-II result directly:

- changed a named NASA-STD-6001 pass/fail threshold,
- certified or rejected a specific flight material,
- caused deployment of a particular detector,
- or changed a specific ISS emergency procedure.

The safest impact statement is therefore: **strong scientific, model-validation, and test-method relevance**, rather than a documented one-to-one operational rule change.

---

## 10. Experimental and Dataset Limitations

### Experimental limitations

- **Material concentration:** heavy emphasis on PMMA and SIBAL relative to the diversity of spacecraft materials.
- **Pressure:** no systematic pressure axis in the flight experiment.
- **Gravity:** microgravity only; no direct lunar/Mars partial-gravity sequence.
- **Oxygen:** broad enough to study important limits, but not a complete future exploration-atmosphere envelope.
- **Geometry/scale:** small duct and small samples; apparatus-scale effects matter.
- **Instrumentation:** many important quantities are image-derived rather than directly sensed.
- **Radiometer:** useful signal but not an automatic absolute heat-flux reference.
- **Dynamic procedures:** some runs include changing flow conditions, so static rows can miss treatment history.

### Dataset limitations

- 129 GRAVIFIRE-ingested Experimental Table rows do not form one IID dataset with one shared target.
- No verified universal row-level outcome label.
- No verified universal row-level calibrated airflow variable in the Experimental Table.
- Important physics may be embedded in raw video, overlays, reports, or publications.
- Family-specific definitions of "spread," "regression," "extinction," and "outcome" are not interchangeable.
- Repository-wide uncertainty metadata are incomplete or not normalized.

---

## 11. BASS-II Research Gap Map

### WELL SOLVED

- thin-PMMA radiative/thermal/kinetic regime identification
- thin-PMMA low-flow radiative extinction in tested domain
- major PMMA-rod quench/blowoff mechanisms
- PMMA-rod flammability boundary in tested conditions
- SIBAL low-flow quenching physics
- conventional flame-front extraction and spread measurement

### PARTIALLY SOLVED

- intermediate-thickness PMMA quantitative prediction
- boundary-layer influence in the finite flight duct
- Earth-test equivalence to microgravity
- optical burning-rate inference across varied image quality
- archive-scale normalization and cross-investigation synthesis
- reduced-pressure analogs for gravity effects

### OPEN / UNDERDEVELOPED

- repository-wide uncertainty propagation
- model-applicability and model-discrepancy synthesis
- consistent run-level outcome/event ontology
- evidence/provenance reconciliation across raw data, reports, and papers
- contradiction-aware scientific synthesis
- scientifically constrained next-experiment reasoning

### NOT SOLVABLE WITH BASS-II ALONE

- direct lunar-gravity fire behavior
- direct Martian-gravity fire behavior
- systematic pressure dependence in microgravity
- universal spacecraft-material flammability
- large-scale spacecraft fire growth
- broad smoke/detection/suppression chain behavior

---

## 12. Potentially Underused BASS-II Data

### 12.1 Full raw-video archive as synchronized evidence

Not because video has never been used, but because the full archive is not yet represented in one run-level evidence system linking **video - telemetry - derived measurements - publication claims - model predictions - limitations**.

### 12.2 Model failure cases

Cases where models overpredict or where boundary-layer predictions do not completely match experiment may be more scientifically useful than additional successful fits.

### 12.3 Near-limit and negative events

Failed ignition, quenching, partial spread, instability, oscillation, and blowoff can provide information that is lost in a simple "successful burn" database.

### 12.4 Multimodal uncertainty

Image-derived flame geometry, instrument uncertainty, run metadata, and model uncertainty are rarely propagated together.

---

## 13. GRAVIFIRE Opportunity Matrix - BASS-II Only

### Opportunity A - Evidence-normalized BASS-II scientific record

**Research question:** Can every important BASS-II value/claim be traced through source, measurement, derivation, paper, and limitation?  
**Required data:** Experimental Table, raw video/stills, summary report, engineering/science documents, gas-analysis material, publications.  
**Prior work:** PSI provides data; papers analyze subfamilies; current NASA project processes images.  
**New contribution:** an explicit evidence-lineage graph that separates direct measurement, derived data, model output, and interpretation.  
**Validation:** reconstruct published results from linked evidence.  
**Hackathon feasibility:** **High**.  
**Novelty risk:** **Low to medium**.

### Opportunity B - Uncertainty-aware video-derived measurement

**Research question:** How sensitive are spread rate, flame length, area, and event timing to image-analysis choices?  
**Prior work:** threshold/edge processing already exists.  
**New contribution:** measurement plus confidence interval and source-quality score.  
**Validation:** reproduce published values and test whether they fall inside estimated uncertainty intervals.  
**Feasibility:** **Medium to high** on a selected subset.  
**Novelty risk:** **Medium**.

### Opportunity C - Published model vs experiment discrepancy atlas

**Research question:** Where do BASS-II models agree, and where do they fail?  
**Data:** selected thin PMMA, intermediate PMMA, rod, and SIBAL cases plus published model results.  
**New contribution:** applicability map rather than another model.  
**Validation:** reproduce published comparisons.  
**Feasibility:** **High for a curated subset**.  
**Novelty risk:** **Low to medium**.

### Opportunity D - Temporal event ontology

**Research question:** Can runs be represented as time-dependent physical sequences rather than static rows?  
**Example:** ignition -> stable burning -> flow change -> instability -> quench/blowoff.  
**Validation:** compare with investigator-described events.  
**Feasibility:** **Medium**.  
**Novelty risk:** **Medium**.

### Opportunity E - Evidence-state knowledge-gap map

**Research question:** Where is evidence directly measured, derived, model-only, interpreted, or absent?  
**New contribution:** epistemic-state mapping rather than only density mapping.  
**Feasibility:** **High**.  
**Novelty risk:** **Medium**, because current NASA work overlaps with coverage/meta-analysis.

### Opportunity F - Model-disagreement-driven next-experiment suggestion

**Research question:** Which future condition would best reduce uncertainty or distinguish competing valid models?  
**Method:** combine evidence sparsity, model disagreement, measurement uncertainty, and physical feasibility.  
**Validation:** retrospective holdout on known BASS-II cases.  
**Feasibility:** **Medium**.  
**Novelty risk:** **Low to medium**.

### Opportunity G - Contradiction-aware scientific synthesis

**Research question:** Can apparently conflicting source claims be classified as true contradiction, contextual difference, measurement difference, or unresolved disagreement?  
**Example:** different reported flow maxima can refer to different subprograms and operational contexts.  
**Validation:** expert-reviewed claim pairs.  
**Feasibility:** **Medium to high** for a curated evaluation set.  
**Novelty risk:** **Low** based on this review.

### Opportunity to treat cautiously - generic ML fire predictor

A BASS-II-only generic ML model would face small, heterogeneous subfamilies, derived/missing labels, dynamic treatment paths, and strong existing physics baselines. A random row split could produce misleading performance through condition leakage. If ML is later used, evaluation should be condition-aware and compared with established physics-based models.

---

## 14. Prior-Art Warning for GRAVIFIRE

The following should **not** be presented as novel BASS-II contributions:

- first visualization of PSI-25
- first BASS-II flame segmentation
- first extraction of flame spread from video
- first extinction map
- first physics prediction of PMMA flame spread
- first PMMA rod extinction predictor
- first Earth-vs-microgravity comparison
- first BASS/BASS-II cross-dataset analysis
- first partial-gravity extrapolation based on BASS/BASS-II alone

NASA's active 2023-2026 project is particularly important here because it already performs large-scale BASS/BASS-II image processing, overlay extraction, and cross-dataset partial-gravity research. [S17](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

---

## 15. What to Carry Forward to the Next Experiment-Family Reviews

BASS-II establishes an important benchmark for how GRAVIFIRE should evaluate every later experiment family:

1. **Do not equate repository rows with complete physical experiments.**
2. **Do not mix geometries simply because they share the same material.**
3. **Do not call derived quantities direct NASA measurements.**
4. **Treat existing physics models as prior art, not baselines to ignore.**
5. **Treat model failures as evidence.**
6. **Distinguish data coverage from fire risk.**
7. **Preserve uncertainty and contradictory/context-dependent source claims.**
8. **Check current NASA-funded work before claiming novelty.**

The final GRAVIFIRE research contribution should not be selected from BASS-II alone. Its opportunities need to be compared with the other NASA experiment families after equally deep audits.

---

## Official Visual References

These official visuals are useful for presentations and outreach. They are linked here so the original source and credit remain attached.

![BASS-II microgravity flame - ESA/NASA](https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2014/08/microgravity_flame/14714389-2-eng-GB/Microgravity_flame.jpg)

- ESA, **Microgravity flame** - BASS-II visual reference: [S19](https://www.esa.int/ESA_Multimedia/Images/2014/08/Microgravity_flame)
- NASA, **BASS-II Inflight Maintenance** - astronaut working with BASS-II in the MSG: [S18](https://www.nasa.gov/image-article/bass-ii-inflight-maintenance/)

> The PDF edition uses original report graphics and schematics rather than hot-linking remote imagery, so the document remains portable and reproducible offline.

---

## Sources

- **S1.** [NASA Physical Sciences Informatics - PSI-25 Version 4](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)
- **S2.** [NASA/TM-20210011385 - Burning and Suppression of Solids-II (BASS-II) Summary Report](https://ntrs.nasa.gov/citations/20210011385)
- **S3.** [NASA NTRS - Combustion of Solids in Microgravity: Results from the BASS-II Experiment](https://ntrs.nasa.gov/citations/20160000593)
- **S4.** [NASA NTRS - CSA-CP and CDM sensor readings during BASS-II](https://ntrs.nasa.gov/citations/20150019858)
- **S5.** [NASA NTRS - Microgravity Flammability of PMMA Rods in Concurrent Flow](https://ntrs.nasa.gov/citations/20150008961)
- **S6.** [Bhattacharjee et al. - Opposed-flow flame spread: thermal regime](https://doi.org/10.1016/j.firesaf.2015.11.011)
- **S7.** [Bhattacharjee et al. - Critical flow velocity for radiative extinction](https://doi.org/10.1016/j.combustflame.2015.10.023)
- **S8.** [Bhattacharjee et al. - Radiative, thermal, and kinetic regimes](https://doi.org/10.1016/j.proci.2016.06.025)
- **S9.** [Carmignani et al. - Boundary layer effect on opposed-flow flame spread](https://doi.org/10.1080/00102202.2017.1404587)
- **S10.** [Olson and Ferkul - Microgravity flammability boundary for PMMA rods](https://doi.org/10.1016/j.combustflame.2017.03.001)
- **S11.** [Link et al. - The Effect of Gravity on Flame Spread over PMMA Cylinders](https://doi.org/10.1038/s41598-017-18398-4)
- **S12.** [Zhao et al. - Concurrent flame growth, spread, and quenching over SIBAL](https://doi.org/10.1016/j.proci.2016.06.028)
- **S13.** [Marcum et al. - PMMA rod stagnation-region flame blowoff limits](https://doi.org/10.1016/j.proci.2018.05.081)
- **S14.** [Olson et al. - High-speed video analysis of flame oscillations](https://doi.org/10.1016/j.proci.2018.05.080)
- **S15.** [Xiong et al. - Evaluation of burning rate in microgravity](https://doi.org/10.1016/j.combustflame.2021.111846)
- **S16.** [Carmignani et al. - Radiation from Flames in a Microgravity Environment](https://doi.org/10.1007/s10694-019-00884-y)
- **S17.** [NASA Task Book - Predicting Material Flammability in Partial Gravity Using Microgravity and Ground Data](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)
- **S18.** [NASA - BASS-II Inflight Maintenance image article](https://www.nasa.gov/image-article/bass-ii-inflight-maintenance/)
- **S19.** [ESA - Microgravity flame, BASS-II visual](https://www.esa.int/ESA_Multimedia/Images/2014/08/Microgravity_flame)
- **S20.** [NASA - Studying Combustion and Fire Safety](https://www.nasa.gov/missions/station/iss-research/studying-combustion-and-fire-safety/)
- **S21.** [NASA ISS daily summary - BASS-II acrylic slab operations, 23 July 2014](https://www.nasa.gov/blogs/stationreport/2014/07/23/iss-daily-summary-report-07-23-14/)
- **S22.** [NASA ISS daily summary - BASS-II rod comparison, 8 July 2014](https://www.nasa.gov/blogs/stationreport/2014/07/08/iss-daily-summary-report-07-08-14/)


---

### Evidence note

This report intentionally uses phrases such as **"no evidence found"**, **"apparently open"**, and **"not independently verified"** where the literature/repository search does not justify a stronger claim. Those phrases should be preserved in downstream GRAVIFIRE material unless new primary evidence changes the conclusion.
