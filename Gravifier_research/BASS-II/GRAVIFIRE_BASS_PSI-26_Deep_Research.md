# GRAVIFIRE Deep Research Report

## BASS / Burning and Suppression of Solids
### Evidence Audit, Suppression Science, Literature Review, and Research Gap Map

**Project:** GRAVIFIRE - NASA International Space Apps Challenge 2026  
**Investigation:** Burning and Suppression of Solids (BASS)  
**NASA PSI:** PSI-26  
**NASA Center:** Glenn Research Center  
**Flight Platform:** International Space Station, Microgravity Science Glovebox  
**Historical PI:** Paul V. Ferkul  
**Prepared:** 1 October 2026

> **Evidence standard used in this report**  
> Claims are separated, where useful, into **Measured**, **Derived**, **Modeled**, **Interpreted**, and **Open/Unverified**. Original BASS is not back-filled with BASS-II instrumentation or metadata. Planned test points, completed burns, archive files, and published analysis counts are treated as different quantities unless a source explicitly equates them.

---

## Executive Summary

The original **Burning and Suppression of Solids (BASS)** investigation was an early long-duration ISS campaign focused on how solid fuels **burn, spread, persist, quench, and respond to active suppression in microgravity**. NASA used a small forced-flow duct inside the Microgravity Science Glovebox (MSG) and deliberately tested several fuel families and geometries, including SIBAL cotton-fiberglass fabric, Nomex, Ultem, PMMA/acrylic flat samples, wax-saturated fiberglass, PMMA spheres, and paraffin/Japan-wax candle configurations. [S3](https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf) [S5](https://ntrs.nasa.gov/citations/20140011099)

The most distinctive scientific value of BASS is **intervention science**. BASS did not only observe flames. Investigators changed ventilation, reduced flow toward extinction, injected nitrogen suppressant, reused or preheated samples, and examined conditions where a suppressant jet could produce an unintended fluid-mechanical effect. The candle work documented a particularly important result: a nitrogen jet intended to suppress a flame could entrain oxygen-containing ambient air and **enhance combustion instead of simply extinguishing it**. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

BASS also showed that microgravity flames can be exceptionally sensitive in the **0 to 5 cm/s ventilation region**. At very low flow, some flames became dim, blue, and stable rather than disappearing immediately. At modest low flow, continued heating of the solid could increase fuel vaporization and make the flame stronger with time. NASA explicitly noted the spacecraft-fire-safety implication: a small weak-looking flame might persist for a long time and later intensify if ventilation increases or another fuel is reached. [S5](https://ntrs.nasa.gov/citations/20140011099)

The investigation produced important model-validation evidence. SIBAL experiments supplied long-duration opposed- and concurrent-flow flame-spread data, including low-speed quenching. PMMA sphere experiments later supported transient spherical-fuel modeling and the development of follow-on growth/extinction research. Candle experiments provided a difficult benchmark involving radiation, soot, detailed chemistry, vitiated air, and suppression flow. [S4](https://ntrs.nasa.gov/citations/20130012832) [S7](https://doi.org/10.1007/s10694-019-00848-2)

BASS is therefore **not superseded by BASS-II**. BASS-II expanded systematic ignition/spread/extinction studies and atmospheric oxygen control, but original BASS retains distinctive evidence involving local suppressant jets, suppression failure through entrainment, candle flames, early spherical-fuel tests, broad exploratory materials, and dynamic ventilation interventions.

### Most important conclusions for GRAVIFIRE

- **Do not reinvent:** basic SIBAL spread analysis, low-flow quenching, basic flame-front tracking, PMMA sphere thermal-history modeling, or the fact that nitrogen delivery can interact adversely with flow.
- **Potentially underused:** run-level suppression timelines, partial/failed suppression, dynamic overlay histories, repeated-sample thermal history, negative/near-limit cases, and archive-wide uncertainty metadata.
- **Most credible BASS opportunities:** suppression-event reconstruction, uncertainty-aware video measurements, temporal event ontologies, model applicability/discrepancy maps, contradiction-aware evidence synthesis, and evidence-state knowledge-gap mapping.
- **Do not flatten BASS into one ML table:** sheet spread, sphere regression, candle extinction, and suppression response are physically different targets.
- **Do not claim a final GRAVIFIRE direction from BASS alone:** these opportunities must later be compared with the other NASA fire experiment families.

---

## 1. Investigation Identity

| Field | Current evidence | Status |
|---|---|---|
| Investigation | Burning and Suppression of Solids | Verified |
| Acronym | BASS | Verified |
| NASA PSI | PSI-26 | Verified from the official PSI endpoint and BASS-II related-investigation metadata |
| Completion | Complete | NASA PSI research-area listing |
| Research area | Combustion Science | Verified |
| Flight platform | International Space Station | Verified |
| Facility | Microgravity Science Glovebox | Verified |
| NASA center | Glenn Research Center | Verified |
| Historical PI | Paul V. Ferkul | Verified in NASA BASS documentation |
| Project Scientist / Co-I | Sandra L. Olson | Verified |
| Other documented Co-Is | James S. T'ien, Fumiaki Takahashi | Verified |
| Related investigation | BASS-II / PSI-25 | Verified |
| PSI DOI | Not independently recoverable from the current indexed PSI-26 page | Open/Unverified |
| Current PSI version | Not independently recoverable | Open/Unverified |
| License | Not independently recoverable | Open/Unverified |

The official PSI-26 route resolves at NASA PSI, but the current web index does not expose the same rich metadata that PSI-25 currently exposes. This report therefore **does not copy the BASS-II DOI, version, or license into BASS**. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-26) [S2](https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/)

NASA's contemporaneous BASS quad chart identifies **Paul V. Ferkul** as PI, **Sandra Olson** as Project Scientist/Co-I, and James T'ien and Fumiaki Takahashi as Co-Is. [S3](https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf)

### Timeline

The project has several meaningful time windows rather than one simple date:

- BASS planning and hardware development began before the main flight runs.
- Peer-reviewed and conference sources describe BASS operation aboard the ISS during **2012 and 2013**. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)
- NASA continued publishing BASS results and using BASS as a precursor/validation dataset in later years. [S7](https://doi.org/10.1007/s10694-019-00848-2)

For GRAVIFIRE, individual run dates should be preserved when available instead of assigning a single publication-era date to all BASS evidence.

---

## 2. Why NASA Conducted BASS

### 2.1 NASA's stated spacecraft-fire problem

NASA's BASS objective was to help bridge the gap between **normal-gravity NASA-STD-6001 material screening**, short-duration reduced-gravity tests, and actual long-duration material flammability in microgravity. BASS also explicitly assessed an **inert gaseous extinguishing agent** similar to spacecraft fire suppression across different fuels, geometries, and flow configurations. [S3](https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf)

### 2.2 Why a 1g test is not automatically conservative

On Earth, heated gases rise. That buoyancy-driven flow changes oxygen delivery, flame shape, convective heat loss, and feedback from the flame to the solid. In orbital microgravity, natural convection is largely removed and the dominant transport can instead come from weak fan-driven spacecraft ventilation and diffusion. NASA therefore needed long-duration ISS data to determine whether materials that behave one way in a terrestrial flammability screen could behave differently under microgravity ventilation. [S9](https://www.nasa.gov/sites/default/files/atoms/files/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf)

### 2.3 Why suppression had to be tested in flight

An extinguisher is not only a chemical or dilution source. A gaseous suppressant also creates a **momentum jet**. In microgravity, that jet can become one of the dominant local flow fields. The delivery can:

- dilute oxygen,
- move or stretch a flame,
- change convective heat transfer,
- entrain fresh ambient air,
- behave differently around partially obstructed or wake-stabilized flames.

NASA's BASS planning material explicitly anticipated that the correct point of suppressant application might not be obvious in microgravity. [S3](https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf)

### 2.4 Synthesis

BASS was simultaneously:

- **exploratory**, because it tested several fuels and geometries;
- **fire-safety oriented**, because suppression and ventilation were explicit objectives;
- **model-validation focused**, because microgravity removes buoyancy and simplifies the forced-flow boundary condition;
- **a precursor**, because later BASS-II and SoFIE work extended questions revealed by the original campaign. [S13](https://www.nasa.gov/humans-in-space/fighting-fire-with-fire-new-space-station-experiments-study-flames-in-space/)

---

## 3. Experimental Design

### 3.1 Core facility and hardware

BASS used a small flow duct inside the ISS **Microgravity Science Glovebox**. NASA documentation describes slightly modified SPICE hardware with crew-controlled sample loading, ignition, airflow adjustment, nitrogen suppressant delivery, video downlink, selected high-resolution still imaging, and instrument/flow information associated with the run. [S3](https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf) [S10](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf)

### 3.2 Fuel families and geometries

| Family | Materials / examples | Geometry | Why it mattered |
|---|---|---|---|
| Thin flat | SIBAL cotton-fiberglass, Nomex, Ultem | nominally long narrow strips | spread, limiting flame length, low-flow extinction |
| Thick flat | PMMA/acrylic, wax-saturated fiberglass | mm-scale slabs | thickness, preheat, thermal inertia |
| Sphere | PMMA | 1 and 2 cm class spheres | axisymmetric geometry, thermal-history effects, possible reuse |
| Candle | paraffin and Japan wax in ceramic tube | wick/tube diffusion-flame geometry | wax combustion, low-flow flame structure, N2 suppression |

The original BASS program is therefore **heterogeneous by design**. A sphere, sheet, and candle should not share a generic output variable called simply "flame spread" unless the specific measurement definition is preserved. [S5](https://ntrs.nasa.gov/citations/20140011099) [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

### 3.3 Controlled and measured variables

| Variable / parameter | Controlled? | Measured / derived? | Units | Notes |
|---|---:|---:|---|---|
| Fuel material | Yes | configuration | categorical | multiple fuel families |
| Geometry | Yes | configuration | sheet/sphere/candle | physically non-interchangeable |
| Fuel thickness / size | Yes | physical sample property | mm, cm | key for thermal response |
| Forced airflow | Yes | instrumented | cm/s | particularly important from <1 to ~5 cm/s |
| Flow direction | Yes | configuration | opposed/concurrent | fuel-family dependent |
| N2 suppressor flow | Yes | controlled | cc/min | documented around 500 cc/min in candle study |
| N2 nozzle geometry / location | configuration | documented for some studies | mm / position | affects entrainment |
| Oxygen fraction | configuration, limited | documented in particular tests | mole fraction | original BASS was not equivalent to BASS-II ambient-vitiation program |
| Ambient pressure | facility condition | contextual | atm | no systematic pressure axis |
| Ignition | crew controlled | timing observable | time | exact construction should be kept source-specific |
| Flame image / appearance | response | measured by camera | image/video | direct visual evidence |
| Flame front / spread | response | derived from imagery | distance/time | derived, not direct sensor value |
| Flame length / size | response | derived | length | geometry/camera dependent |
| Extinction / quench | response | observed | event/time/condition | can be flow- or suppression-driven |
| Radiation | response | instrument signal in program documentation | relative/instrument units | absolute calibration should not be assumed without source support |

### 3.4 Oxygen and pressure caveat

Original BASS did not provide the same systematic whole-MSG oxygen-control program that became important in BASS-II. Some BASS configurations used ordinary air or nitrogen-vitiated air, including the candle experiments at approximately 0.21 and 0.17 oxygen mole fraction. That does **not** make oxygen a universal BASS treatment axis. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

BASS likewise did not systematically vary pressure. Pressure-dependent exploration-atmosphere fire behavior therefore cannot be learned from original BASS alone.

---

## 4. Test Inventory and Count Audit

The public record contains **different count concepts** and they should not be silently merged.

### 4.1 Program-plan counts

Older NASA experiment-profile material describes a program with **41 fuel samples** and **89 planned test points**. The same broad profile family also contains BASS-II operational language, so these values should be treated as **program-plan figures requiring investigation-level provenance**, not automatically as a final BASS as-run count. [S14](https://www.nasa.gov/wp-content/uploads/2025/07/burning-and-suppression-of-solids-bass.pdf)

### 4.2 Recent NASA analyzed-burn count

A 2023 NASA fire-safety summary states that analysis of **59 BASS burn tests** produced data on heat flow, flame size, flow effects, and other parameters. This is a more direct modern NASA statement about analyzed BASS burns. [S11](https://www.nasa.gov/missions/station/iss-research/science-in-space-week-of-sept-29-2023-fire-safety-in-space/)

### 4.3 What this report treats as verified

| Quantity | Value | How to interpret it |
|---|---:|---|
| Program fuel-sample count reported in NASA profile | 41 | planning / program-level sample count, provenance caution |
| Program test points reported in older profile | 89 | planned test points, not automatically completed burns |
| BASS burn tests said to have been analyzed in 2023 NASA summary | 59 | modern NASA analysis count |
| Exact PSI-26 Experimental Table row count | not independently recovered | unresolved from current web-indexed PSI page |
| Exact completed physical runs | not fully reconstructed | open |
| Exact successful ignitions | not reconstructed | open |
| Exact raw-video count | not reconstructed | open |

**GRAVIFIRE rule:** keep `planned_sample`, `planned_test_point`, `executed_run`, `successful_burn`, and `published_analysis_case` as separate entities.

---

## 5. Public Dataset and Evidence Audit

NASA PSI lists BASS as a completed Combustion Science investigation and the official PSI-26 route is public. Current web indexing, however, does not expose the complete PSI-26 file manifest, version metadata, or all table rows in a way that can be independently audited here. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-26) [S2](https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/)

| Resource | Public evidence | What it contains | GRAVIFIRE usefulness |
|---|---|---|---|
| PSI-26 investigation repository | verified route | central NASA data archive | essential |
| Experimental/test database | documented as existing in NASA/PSI ecosystem | run/test metadata | essential, but exact current count unresolved |
| Raw video | verified by BASS publications and current NASA re-analysis | flame evolution, run dynamics, overlays | very high |
| High-resolution still images | verified | flame geometry and growth | high |
| NASA BASS quad chart | public PDF | objectives, team, experiment concept | essential context |
| BASS technical publication | public PDF | objectives, space/earth benefits, results | high |
| SIBAL analysis | NTRS public | opposed/concurrent spread, quench | very high |
| Thickness/preheat synthesis | NTRS public | multi-geometry BASS findings | very high |
| Candle/suppression conference paper | public metadata/full abstract | wax flames, vitiation, N2 entrainment | very high |
| Sphere model paper | peer reviewed | PMMA sphere precursor + model validation | high |
| Engineering/calibration files | likely archive content, not fully enumerated here | hardware/calibration | potentially very high |
| Machine-readable outcome ontology | not found | sustain/quench/suppression labels | opportunity |
| Archive-wide uncertainty schema | not found | measurement uncertainty | opportunity |

### Repository limitation

This is a **public-discoverability limitation**, not proof that NASA lacks the files. The report deliberately avoids guessing inaccessible filenames, file sizes, version numbers, or a Modeling Table that could not be directly verified.

---

## 6. Major Scientific Findings

### 6.1 Extremely low ventilation can support weak but persistent flames

**Measured/Observed:** NASA's BASS synthesis reports especially strong sensitivity in the **0 to 5 cm/s** airflow region. Below about 1 cm/s, flames tended to become dim, blue, and stable. [S5](https://ntrs.nasa.gov/citations/20140011099)

**Physical interpretation:** low convective losses can allow a small flame to persist rather than extinguish immediately.

**Spacecraft-fire implication:** visual weakness does not automatically mean rapid self-extinction.

### 6.2 Modest low flow can strengthen a flame over time

At approximately 1 to 5 cm/s, NASA reports continued fuel heating, higher vaporization, and a stronger, more luminous flame as time progresses. Some small acrylic slab flames reportedly burned for **more than five minutes** before self-extinguishing. [S5](https://ntrs.nasa.gov/citations/20140011099)

This supports an important scenario:

`small persistent flame -> continued fuel heating -> ventilation increase or new fuel -> stronger fire`

This is an **experiment-supported concern**, not a universal probability model.

### 6.3 SIBAL opposed-flow spread was not simply monotonic with airflow

**Derived from imagery:** in opposed flow, the cotton-fiberglass flame quickly approached steady spread, and the spread rate was fastest at an **intermediate** airflow rather than increasing monotonically over the entire tested range. [S4](https://ntrs.nasa.gov/citations/20130012832)

This directly invalidates a simplistic GRAVIFIRE rule such as:

`airflow up => flame spread always up`

### 6.4 SIBAL concurrent-flow experiments produced rare long-duration transient data

In concurrent low-speed flow, flame size grew with time. At sufficiently low flow, the short sample could reach a limiting flame length and approximately steady spread. NASA emphasized that these ISS runs supplied detailed transient flame-growth data not readily obtainable in short-duration ground microgravity. [S4](https://ntrs.nasa.gov/citations/20130012832)

### 6.5 Low-flow quenching was directly observed

By decreasing flow toward roughly the 1 cm/s region, BASS observed quenching/extinction for SIBAL configurations. Later BASS/BASS-II work expanded the quenching boundary as a function of oxygen concentration. [S4](https://ntrs.nasa.gov/citations/20130012832) [S8](https://doi.org/10.1016/j.proci.2016.06.028)

### 6.6 Thermal history matters for thick spherical fuels

The BASS PMMA-sphere precursor data later supported a transient spherical-fuel model. The follow-on paper emphasizes internal solid heating and shows why a thermally thick fuel cannot always be represented solely by its instantaneous external flow condition. [S7](https://doi.org/10.1007/s10694-019-00848-2)

**GRAVIFIRE implication:** a reused/preheated sphere and a cold fresh sphere at the same nominal airflow may not represent the same physical state.

---

## 7. Fire Suppression Science

Suppression is the original BASS feature most worth preserving as a separate scientific layer.

### 7.1 Suppression method

The principal documented BASS suppressor was **gaseous nitrogen**, delivered through a local nozzle. In the candle study, nitrogen was injected at approximately **500 cc/min** through a 3.1 mm ID tube upstream of the flame. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

### 7.2 Intended mechanism

`N2 jet -> local oxygen dilution -> reduced reaction support -> extinction`

### 7.3 Observed complication: entrainment

The candle study documented the opposite fluid-mechanical effect:

`N2 jet momentum -> entrains ambient oxygen-containing air -> increases oxidizer transport -> combustion enhanced`

This is one of BASS's strongest direct contributions to spacecraft suppression understanding. A suppressant is not described by concentration alone; **delivery geometry and flow field matter**. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

### 7.4 Ventilation shutdown

NASA interpreted BASS results as supporting the spacecraft fire-response principle of reducing forced ventilation, because selected flames extinguished rapidly when the primary airflow was removed. This should be classified as:

- **experimentally demonstrated:** airflow removal can extinguish specific BASS flames;
- **operationally relevant:** consistent with spacecraft ventilation-shutdown strategies;
- **not established by this review:** BASS alone created a new ISS emergency procedure.

### 7.5 Suppressant coverage limitation

No comprehensive original-BASS program comparing multiple suppressant technologies was found in the reviewed sources. BASS therefore supports important nitrogen-delivery physics but **does not support a universal spacecraft suppressant ranking**.

---

## 8. Important Reports and Literature

| Work | BASS evidence | Method | Main contribution | Limitation |
|---|---|---|---|---|
| Ferkul et al., 2012, *Flammability Aspects of a Cotton-Fiberglass Fabric...* | SIBAL | ISS experiment + image-derived spread | opposed/concurrent spread, enhanced microgravity flammability, quench | model fuel, small duct |
| Ferkul et al., 2013, *Thickness and Fuel Preheating Effects...* | flats, spheres, candles | multi-configuration synthesis | low-flow persistence, thermal history, suppression observations | conference presentation |
| Takahashi et al., 2013, *Burning Characteristics of Paraffin and Japan Wax Candle Flames...* | candle subset | ISS experiment + detailed-chemistry interpretation | low-flow wax flames, vitiation, N2 entrainment enhancement | conference-level publication; chemistry uses model assumptions |
| Zhao et al., 2017, *Concurrent flame growth, spread, and quenching...* | BASS + BASS-II SIBAL lineage | experiment + transient 3D modeling | quenching boundary and quantitative model comparison | combines two investigations |
| Endo et al., 2020, *Flame Growth Around a Spherical Solid Fuel...* | BASS sphere precursor | transient numerical model + experiment comparison | thermal history, sphere flame growth/extinction | BASS sphere subset small |
| NASA Researcher's Guide to Combustion Science | program synthesis | NASA review | connects BASS to spacecraft fire-safety lineage | overview, not run-level data |

### 8.1 SIBAL study

**Title:** *Flammability Aspects of a Cotton-Fiberglass Fabric in Opposed and Concurrent Airflow in Microgravity*  
**Authors:** Paul V. Ferkul, Sandra L. Olson, Michael C. Johnston, James S. T'ien  
**NASA record:** NTRS 20130012832. [S4](https://ntrs.nasa.gov/citations/20130012832)

**Question:** how does purely forced airflow affect flame appearance, transient growth, spread, and extinction in microgravity?

**Contribution:** the BASS data validated important theoretical predictions and provided rare long-duration data for transient model development.

### 8.2 Thickness and fuel preheating synthesis

**Title:** *Thickness and Fuel Preheating Effects on Material Flammability in Microgravity from the BASS Experiment*  
**Authors:** Paul V. Ferkul, Sandra L. Olson, Fumiaki Takahashi, Makoto Endo, Michael C. Johnston, James S. T'ien  
**Venue:** ASGSR 2013  
**NASA record:** NTRS 20140011099. [S5](https://ntrs.nasa.gov/citations/20140011099)

It summarizes thin/thick flat samples, spheres, candles, airflow, preheat, nitrogen dilution/suppression, flame appearance, growth, and spread.

### 8.3 Candle and suppression study

**Title:** *Burning Characteristics of Paraffin and Japan Wax Candle Flames in a Low-Speed Oxidizing Stream in Microgravity*  
**Authors:** Fumiaki Takahashi, Paul V. Ferkul, Sandra L. Olson, V. R. Katta  
**Venue:** ASGSR/ISPS, 2013. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

**BASS configuration:** wax in alumina tube, fiberglass wick, roughly 0 to 5 cm/s oxidizer flow, ordinary or nitrogen-vitiated air, opposed/concurrent orientation, N2 suppression attempt.

**Key result:** the nitrogen jet could entrain air and enhance combustion.

### 8.4 Sphere model-validation lineage

**Title:** *Flame Growth Around a Spherical Solid Fuel in Low Speed Forced Flow in Microgravity*  
**Authors:** Makoto Endo, James S. T'ien, Paul V. Ferkul, Sandra L. Olson, Michael C. Johnston  
**Journal:** *Fire Technology*, 56(1), 5-32  
**DOI:** 10.1007/s10694-019-00848-2. [S7](https://doi.org/10.1007/s10694-019-00848-2)

The paper explicitly identifies a BASS microgravity sphere experiment as a precursor used to assess experiment operation and validate the accompanying numerical model.

---

## 9. Model Validation History

| Model / approach | BASS cases | Inputs | Outputs | Validation finding | Remaining issue |
|---|---|---|---|---|---|
| Thin-fuel flame-spread theory | SIBAL opposed/concurrent | flow, sample geometry, material properties | spread / flame behavior | important predicted trends supported | narrow fuel family |
| Transient concurrent flame-growth model | SIBAL | flow, oxygen in later combined studies, pyrolysis properties | transient flame growth, spread, quench | later BASS/BASS-II comparison quantitatively useful | family-specific |
| Spherical-fuel transient model | PMMA sphere precursor | flow, thermal properties, internal heating | flame growth, heat transfer, extinction | experimental trends agree with model | few precursor BASS sphere cases |
| Candle detailed-chemistry model | candle geometry | oxidizer flow, chemistry surrogate, thermal/radiative terms | flame structure / response | useful physical interpretation | surrogate chemistry not exact wax |
| Simple suppressant-dilution intuition | N2 jet | suppressant flow / oxygen | extinction | **insufficient alone** | entrainment can reverse expected effect |

### Model lesson for GRAVIFIRE

BASS does not justify one universal model. Each model has an **applicability domain**:

`fuel family + geometry + flow regime + measurement definition + assumptions`

GRAVIFIRE should expose that domain rather than hiding it behind a generic predictor.

---

## 10. Image and Video Prior Art

BASS used real-time video and selected higher-resolution still imagery. The visual record has already supported extraction or interpretation of:

- flame-front position,
- spread rate,
- flame growth,
- flame length / size,
- extinction,
- sphere/flame geometry,
- flame appearance and color.

Current NASA-funded PSI re-analysis led by Ya-Ting Liao is processing BASS and BASS-II imagery using edge tracing, experiment-specific thresholds, flame-progression tracking, and extraction of real-time airflow information from overlaid video text. [S12](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

### Prior-art implication

The following is **not** a defensible novelty claim:

> "GRAVIFIRE is the first project to segment or track BASS flames from video."

### What might still be scientifically useful

1. **Uncertainty-aware segmentation** - how much do flame measurements move when threshold, edge definition, scale, or frame quality changes?
2. **Suppression-event timelines** - synchronize N2 start, airflow, flame deflection, luminosity, quench, or enhancement.
3. **Repeated-sample history** - encode the thermal state of reused/preheated sphere tests.
4. **Evidence-linked events** - attach every derived event to exact frames, source files, and investigator descriptions.

---

## 11. Machine Learning and AI Prior Art

Targeted searches were performed for BASS with terms including machine learning, neural network, Bayesian, surrogate modeling, active learning, computer vision, flame segmentation, image processing, uncertainty, and combined BASS/BASS-II analysis.

| Technique | Evidence found specifically for BASS | Assessment |
|---|---|---|
| Classical image processing / edge tracking | Yes | established |
| Archive-scale BASS/BASS-II visual processing | Yes, current NASA project | active prior art |
| Neural-network BASS predictor | no direct evidence found in targeted search | **no evidence found**, not proof of nonexistence |
| Random forest / conventional supervised ML | no BASS-specific publication found | no evidence found |
| Bayesian predictive framework | none found | potentially open |
| Explicit uncertainty-aware prediction | no archive-wide framework found | underdeveloped |
| Active learning / next-experiment selection | none found | potentially open |
| Deep semantic segmentation | no BASS-specific peer-reviewed result found | but classical segmentation already occupies basic task |
| Cross-dataset BASS/BASS-II integration | yes | active prior art |

### Why generic ML is scientifically risky

A flat BASS feature matrix would mix physically incompatible targets:

- sheet flame-front spread,
- sphere regression / thermal response,
- candle extinction,
- nitrogen suppression response.

A model could obtain apparently good metrics while learning experiment-family identity rather than transferable physics. Any future ML study should use coherent subfamilies, explicit applicability domains, physics baselines, and leakage-resistant validation.

---

## 12. Contribution to Real Spacecraft Fire Safety

### Experimentally demonstrated

- forced ventilation strongly changes microgravity solid-fuel behavior;
- weak low-flow flames can persist;
- low-flow quenching occurs in tested configurations;
- local N2 delivery can be affected by entrainment;
- microgravity behavior can differ markedly from the corresponding 1g geometry. [S4](https://ntrs.nasa.gov/citations/20130012832) [S5](https://ntrs.nasa.gov/citations/20140011099) [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

### Model-supporting

BASS supplied relatively clean forced-flow microgravity evidence for validating flame-spread, transient growth, thick-fuel, sphere, and suppression-related models. NASA explicitly frames BASS results as contributing to computational models relevant to spacecraft fire detection and suppression. [S10](https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf)

### Design-relevant

The data improve understanding of:

- ventilation control,
- suppressant-delivery geometry,
- limits of terrestrial material screening,
- weak or hidden flame persistence.

### Operational-impact caution

This review did **not** find primary documentation proving that BASS alone directly:

- changed a named NASA-STD-6001 pass/fail threshold,
- certified or rejected a specific spacecraft material,
- installed a new detector or extinguisher,
- created a new ISS emergency procedure.

The documented impact is strongest at the level of scientific understanding, model support, fire-safety design relevance, and support for continued experiment development.

---

## 13. Experimental Limitations

### Scale

BASS used small samples and a small flow duct inside the MSG. It is not a spacecraft-scale fire experiment.

### Gravity

ISS microgravity only. There is no controlled sequence through lunar and Martian gravity.

### Pressure

No systematic BASS pressure axis was established in the sources reviewed.

### Oxygen

Original BASS contains limited oxygen/vitiation cases but not the systematic atmospheric oxygen program that followed in BASS-II.

### Materials

The material set is diverse enough for exploratory science, but still tiny compared with the material inventory of an operational spacecraft.

### Suppressants

Nitrogen dominates the documented BASS suppression work. The experiment does not support general conclusions across all spacecraft extinguishing agents.

### Diagnostics

No verified original-BASS full-field temperature, species, soot, or velocity field and no universally documented in-flight mass-loss measurement were found in this review.

### Human-in-the-loop operations

Crew interaction with sample changes, ignition, flow adjustment, and suppressant delivery adds procedural variation that should be preserved in run provenance.

### Thermal history

Repeated or preheated samples can carry state from earlier burning, violating an assumption of independent identically prepared trials.

---

## 14. Dataset Limitations

### Public discoverability

The PSI-26 route is public but the current indexed page did not expose a complete file manifest, current version, DOI/license metadata, or machine-readable table inventory to this audit.

### Count ambiguity

Program plans, analyzed burn counts, executed runs, and usable scientific cases are different quantities. They should not be merged.

### Dynamic treatment paths

A run can involve changing airflow, suppressant start, extinction, reignition, or reuse. A single static row may omit the most important causal sequence.

### Video-embedded data

Current NASA work extracts experimental information from video overlays, demonstrating that some useful data are not conveniently represented as a normal table. [S12](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

### Missing universal outcome ontology

No verified archive-wide machine-readable label set was found for:

- failed ignition,
- sustained burning,
- steady spread,
- quench,
- successful N2 suppression,
- failed/partial suppression,
- suppressant-enhanced combustion,
- reignition.

### Uncertainty metadata

No archive-wide schema was found that consistently attaches uncertainty to image-derived spread, flame length, extinction timing, airflow reconstruction, or suppressant timing.

---

## 15. Research Gaps

### Physics gaps

- exact low-flow transition boundaries across the complete material/geometry set;
- thermal-history effects beyond the limited thick-fuel/sphere cases;
- coupling between local suppressant jets and complex flame geometries.

### Material gaps

- limited real spacecraft material diversity;
- no universal cross-material flammability relationship.

### Environmental gaps

- no systematic pressure axis;
- no lunar/Mars partial-gravity sequence;
- limited exploration-atmosphere coverage.

### Suppression gaps

- no comprehensive multi-agent comparison;
- incomplete run-level map of nozzle placement, jet momentum, flow, geometry, and outcome;
- lack of a validated universal suppression-response model.

### Modeling gaps

- separate models exist, but no public BASS-wide model-applicability map was found;
- model failure/discrepancy cases are scattered across literature;
- no unified uncertainty propagation across measurement and model layers.

### Data-usage gaps

- temporal event structure is not represented cleanly in normal experimental tables;
- video, test notes, model results, and literature claims are not exposed as one provenance chain;
- negative and partial-suppression cases may be especially informative but are hard to query.

### AI / evidence-science gaps

- evidence-grounded scientific QA for BASS;
- automatic contradiction/context-difference detection;
- model-applicability reasoning;
- uncertainty-aware derived measurements;
- active next-experiment reasoning based on model disagreement rather than only sample density.

---

## 16. DO NOT REINVENT THESE

| Existing solution / finding | Maturity | Why GRAVIFIRE should not claim it as new |
|---|---|---|
| SIBAL opposed/concurrent spread analysis | strong experimental basis | directly reported from BASS |
| airflow strongly affects microgravity flames | core BASS result | foundational motivation/result |
| low-flow quenching | established in BASS lineage | directly observed and later modeled |
| basic flame-front / edge tracking | established | used in prior and current NASA analysis |
| PMMA sphere thermal-history modeling | peer-reviewed follow-on | BASS used as precursor validation |
| N2 jet can worsen combustion through entrainment | distinctive published finding | already documented in candle study |
| generic BASS+BASS-II visual meta-analysis | active NASA prior art | current NASA-funded project overlaps |
| ground tests do not automatically reproduce microgravity | pre-existing BASS motivation | not a new GRAVIFIRE discovery |

---

## 17. Potentially Underused BASS Data

### 17.1 Suppression attempts and failures

A high-value retrospective dataset would classify every recoverable suppression event by:

- fuel and geometry,
- flame state before intervention,
- background airflow,
- N2 flow and nozzle relation,
- onset time,
- flame deflection,
- luminosity/size change,
- success, failure, or temporary response.

**Why it appears underused:** the key entrainment effect is published, but an archive-wide suppression-response matrix was not found.

**Risk:** source metadata may not contain enough calibrated geometric detail.

### 17.2 Dynamic flow histories

Some BASS science is inherently a trajectory, not a point. Reconstructing `time -> control -> flame response` could recover scientific context lost in static rows.

**Overlap warning:** current NASA work is already extracting airflow histories from BASS/BASS-II imagery, so simple extraction alone is not novel. [S12](https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content)

### 17.3 Negative and near-limit cases

Failed ignition, weak persistent burning, partial quenching, suppression failure, and recovery after a control change are especially valuable for boundary science.

### 17.4 Repeated-sample thermal history

Sphere reuse creates an opportunity to encode material state over time rather than treating nominally identical conditions as independent.

### 17.5 Engineering/anomaly context

If PSI-26 contains detailed engineering logs or anomalies, linking them to runs could prevent downstream models from treating compromised or unusual conditions as normal samples.

---

## 18. BASS Research Gap Map

### WELL SOLVED

Within the tested domains:

- strong airflow dependence of microgravity solid flames;
- SIBAL opposed/concurrent spread trends;
- existence of low-flow quenching;
- long-duration transient flame growth;
- weak-looking flame persistence at very low flow;
- basic sphere growth/extinction physics and thermal-history importance;
- qualitative nitrogen-jet entrainment failure mode;
- conventional video-derived flame analysis.

### PARTIALLY SOLVED

- quantitative generalization of SIBAL across broader material classes;
- complete mapping of low-flow transitions;
- suppression efficacy as a function of nozzle placement and jet momentum;
- thermal-history-dependent extinction beyond limited sphere work;
- ground-to-space material-test correlation;
- BASS-wide model validation and discrepancy synthesis;
- normalization with BASS-II while preserving family differences.

### OPEN

- archive-wide uncertainty propagation;
- standardized suppression-event ontology;
- run-by-run model applicability map;
- model-disagreement atlas;
- contradiction-aware provenance reconciliation;
- systematic near-limit/failure-case analysis;
- scientifically constrained next-experiment recommendation.

### DATA-RICH BUT POTENTIALLY UNDEREXPLOITED

- raw suppression videos;
- dynamic airflow overlays;
- suppressant-onset timing;
- failed/partial suppression cases;
- repeated sphere runs and preheated samples;
- unusual material cases;
- low-luminosity persistent flames;
- engineering and procedural metadata.

### NOT SOLVABLE WITH BASS ALONE

- Moon-gravity prediction;
- Mars-gravity prediction;
- systematic pressure response;
- high-O2 exploration-atmosphere flammability;
- large-scale spacecraft fire growth;
- universal material flammability prediction;
- universal suppressant-agent ranking;
- smoke-detector performance;
- comprehensive toxic-product prediction.

---

## 19. GRAVIFIRE Opportunity Matrix

### Opportunity 1 - Suppression-event evidence reconstruction

**Research question:** Under what documented BASS conditions did nitrogen suppress, fail to suppress, or enhance combustion?

**Data required:** suppression videos, N2 timing/flow, airflow, sample geometry, test notes, source publications.

**Prior work:** Takahashi et al. establishes the entrainment-enhancement mechanism. [S6](https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity)

**Potential new contribution:** a run-level intervention-response map with frame-level evidence.

**Method:** temporal annotation + telemetry/overlay synchronization + provenance graph.

**Validation:** reproduce investigator-described cases and manually review ambiguous events.

**Hackathon feasibility:** **High for a curated subset.**

**Main limitation:** complete geometric/calibration metadata may be unavailable.

**Novelty risk:** **Medium.** The mechanism is known; the evidence reconstruction appears less developed.

### Opportunity 2 - Uncertainty-aware video measurement

**Research question:** How uncertain are flame-front, flame-length, and extinction-time measurements extracted from BASS imagery?

**New part:** not segmentation itself, but **measurement + uncertainty + source quality**.

**Method:** vary threshold/edge definitions, frame-scale calibration, and temporal alignment; propagate measurement variation into spread/extinction quantities.

**Validation:** compare with published BASS measurements and check whether literature values fall within derived intervals.

**Feasibility:** **High for selected runs.**

**Novelty risk:** **Medium.** Threshold sensitivity is known, but explicit archive-level uncertainty remains underdeveloped.

### Opportunity 3 - Temporal event ontology

**Research question:** Can each BASS run be represented as a physical sequence rather than a static row?

Example:

`ignition -> flame establishment -> spread -> airflow change -> N2 start -> deflection -> quench/enhancement`

**Method:** scientifically defined event schema with timestamps, evidence frames, confidence, and source references.

**Validation:** investigator reports and manual expert review.

**Feasibility:** **High for a small evidence set.**

**Novelty risk:** **Medium-low.** Tracking exists; a provenance-aware event ontology is more distinct.

### Opportunity 4 - Model applicability and discrepancy atlas

**Research question:** Which published BASS models apply to which cases, and where do they agree or fail?

**Output:**

`model -> assumptions -> fuel family -> geometry -> valid regime -> test cases -> measured quantity -> agreement/disagreement`

**Method:** literature extraction + structured model cards + reproducible comparison where numeric outputs are available.

**Validation:** reproduce selected published comparisons.

**Feasibility:** **High for curated literature.**

**Novelty risk:** **Low-medium.** Individual comparisons exist, but no BASS-wide applicability layer was found.

### Opportunity 5 - Contradiction-aware evidence synthesis

**Research question:** Can apparent source conflicts be classified as true contradiction, context difference, planning-vs-execution difference, or unresolved evidence?

Examples:

- 41 samples / 89 planned test points vs a modern NASA statement of 59 analyzed BASS burns;
- design flow ranges vs specific science-run ranges;
- program-level oxygen descriptions vs subset-specific vitiated-air conditions.

**Method:** claim extraction + provenance + context keys + manually reviewed benchmark set.

**Feasibility:** **High if tightly scoped.**

**Novelty risk:** **Low based on the targeted BASS literature search.**

### Opportunity 6 - Evidence-state knowledge-gap map

Instead of only `tested / untested`, represent:

- directly measured,
- image-derived,
- model-supported,
- investigator-interpreted,
- suppression intervention,
- uncertain/conflicted,
- no evidence.

**Feasibility:** **High.**

**Novelty risk:** **Medium**, because current NASA meta-analysis overlaps with coverage mapping but not necessarily this epistemic-state framing.

### Opportunity 7 - Model-disagreement next-experiment recommendation

**Research question:** Where would a future experiment best discriminate between scientifically plausible models or reduce the most consequential uncertainty?

Candidate score can combine:

- evidence sparsity,
- model disagreement,
- measurement uncertainty,
- feasible experimental domain.

**Validation:** retrospective holdout of known cases.

**Feasibility:** **Medium.**

**Novelty risk:** **Low-medium.** No BASS-specific active-learning framework was found, but future-experiment planning is an active NASA interest.

---

## 20. BASS vs BASS-II

| Dimension | Original BASS | BASS-II |
|---|---|---|
| PSI | PSI-26 | PSI-25 |
| Scientific character | exploratory flammability + suppression + model validation | deeper systematic ignition/spread/extinction studies |
| Platform | ISS MSG | ISS MSG |
| Hardware lineage | modified SPICE/BASS flow duct | reused/evolved BASS hardware lineage |
| Material emphasis | SIBAL, Nomex, Ultem, PMMA, wax/fiberglass, spheres, candles | more systematic PMMA families plus SIBAL and other configurations |
| Local N2 suppressant jet | **central distinctive feature** | not the defining BASS-II intervention |
| Systematic ambient O2 control | limited/subset-specific | substantially expanded |
| PMMA sphere precursor | **yes** | later related/follow-on science |
| Candle configurations | **yes** | not a principal BASS-II family |
| PMMA rod program | not central | major BASS-II family |
| Low-flow flame persistence | important | extended in more systematic parameter studies |
| Image/video evidence | yes | yes |
| Model-validation role | SIBAL, sphere, candle, low-flow suppression | extensive thin/intermediate PMMA, rods, SIBAL |
| Partial gravity | no | no |
| Pressure axis | no systematic program | no systematic program |
| Unique value now | dynamic suppression/intervention evidence | systematic spread/extinction parameter science |

### What BASS established

- spacecraft-relevant low-flow behavior can be counterintuitive;
- ventilation is a dominant microgravity control variable;
- small weak flames can persist;
- nitrogen delivery can interact adversely with local flow;
- several solid-fuel models can be meaningfully validated in long-duration microgravity.

### Why BASS-II was needed

BASS revealed important behavior but left major questions under-parameterized. BASS-II expanded systematic study of ignition, flame spread, extinction, geometry, fuel dimensions, and ambient oxygen conditions while retaining the long-duration ISS forced-flow advantage. [S15](https://psi.nasa.gov/physci/repo/data/investigations/PSI-25)

### What BASS remains uniquely useful for

- local N2 suppression events;
- suppression enhancement through entrainment;
- wax/candle configurations;
- broad exploratory materials;
- PMMA sphere precursor/thermal-history evidence;
- dynamic ventilation and intervention sequences.

---

## 21. Preliminary BASS + BASS-II Synthesis

### 21.1 What the two together reveal

Together, the investigations trace a progression from **exploratory material/geometry/suppression behavior** to **more systematic environment and geometry parameterization**.

A defensible combined analysis is possible only if each measurement retains:

- investigation identity,
- fuel family,
- geometry,
- flow orientation,
- treatment history,
- measurement method,
- evidence status,
- uncertainty/provenance.

### 21.2 Variables that can potentially be harmonized

With source-specific calibration:

- material identity,
- dimensions,
- geometry class,
- opposed/concurrent orientation,
- physical airflow where verified,
- oxygen concentration where actually measured/controlled,
- timestamps,
- image-derived flame-front position,
- flame length,
- extinction/event status.

### 21.3 Variables that should not be directly merged

- BASS local N2 suppressor flow vs BASS-II working-volume oxygen dilution;
- sheet spread vs rod spread vs sphere regression vs candle flame length;
- static conditions vs deliberately ramped flow histories;
- fresh vs preheated/reused material state;
- uncalibrated instrument signals across configurations;
- planned settings vs as-run measured values.

### 21.4 Correct combined-data architecture

A scientifically defensible representation is hierarchical rather than a single generic ML table:

```text
NASA solid-fuel fire evidence
|
+-- BASS / PSI-26
|   +-- thin flat / SIBAL
|   +-- thick flat
|   +-- PMMA sphere
|   +-- candle
|   +-- suppression interventions
|
+-- BASS-II / PSI-25
    +-- thin PMMA
    +-- intermediate PMMA
    +-- PMMA rods
    +-- SIBAL
    +-- other configurations
```

A unified query layer is scientifically reasonable. A universal predictor that ignores these family boundaries is not.

---

## 22. Official NASA Imagery References

This report uses custom GRAVIFIRE scientific diagrams for portability and reproducibility. The following **official NASA-created BASS imagery** is recommended for visual evidence and presentation use:

1. **ISS035-E-014971 - BASS flame close-up, 6 April 2013.** NASA image, public-domain U.S. government work. NASA catalog image mirrored by Wikimedia Commons. [S16](https://commons.wikimedia.org/wiki/File:ISS-35_Burning_and_Suppression_of_Solids_(BASS)_experiment_(1).jpg)
2. **BASS image sequence in NASA's 2022 ISS Imagery presentation.** The slide explicitly identifies a sequence from the second BASS run and explains its use for fire detection/suppression model development. [S17](https://ntrs.nasa.gov/api/citations/20220009934/downloads/ISS%20Imagery%20-%20ISS%20RD%20rev%201.pdf)
3. **NASA Researcher's Guide to Combustion Science.** Includes a BASS acrylic-sphere flame image, SIBAL flame sequences, and BASS suppression context. [S9](https://www.nasa.gov/sites/default/files/atoms/files/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf)

> **Image-use note:** NASA-created imagery is generally public-domain in the United States unless otherwise noted, but NASA insignia/logos have separate usage restrictions. Each image should retain its NASA credit and photo ID/source where available.

---

## 23. Final BASS Assessment for GRAVIFIRE

Original BASS has two different types of scientific value.

### Physics value

It established real microgravity behavior involving low-speed flame persistence, spread, quenching, thermal history, and suppressant-flow interaction. Several of those phenomena are already well studied and should not be repackaged as new discoveries.

### Evidence-science value

The archive appears to contain a more difficult and potentially valuable problem:

- dynamic interventions,
- partial/failed suppression,
- multiple physically distinct fuel families,
- video-embedded experimental state,
- reused/preheated samples,
- scattered model comparisons,
- uncertainty and provenance that are not naturally represented in a flat table.

For GRAVIFIRE, the most defensible BASS-specific direction is therefore **not another generic flame predictor**. The stronger opportunity is to make BASS evidence **temporally reconstructable, intervention-aware, uncertainty-aware, model-aware, and provenance-aware** while preserving what NASA actually measured versus what later researchers derived or modeled.

This is a **BASS-only conclusion**. It does not select the final GRAVIFIRE research contribution.

---

## 24. Source List

**S1. NASA PSI - PSI-26, BASS.**  
https://psi.nasa.gov/physci/repo/data/investigations/PSI-26

**S2. NASA PSI Investigations by Research Area.**  
https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/

**S3. NASA Glenn - Burning And Suppression of Solids (BASS) Quad Chart.**  
https://www1.grc.nasa.gov/wp-content/uploads/BASS-Quad-Chart.pdf

**S4. Ferkul PV, Olson SL, Johnston MC, T'ien JS. Flammability Aspects of a Cotton-Fiberglass Fabric in Opposed and Concurrent Airflow in Microgravity. NASA NTRS 20130012832.**  
https://ntrs.nasa.gov/citations/20130012832

**S5. Ferkul PV, Olson SL, Takahashi F, Endo M, Johnston MC, T'ien JS. Thickness and Fuel Preheating Effects on Material Flammability in Microgravity from the BASS Experiment. NASA NTRS 20140011099.**  
https://ntrs.nasa.gov/citations/20140011099

**S6. Takahashi F, Ferkul PV, Olson SL, Katta VR. Burning Characteristics of Paraffin and Japan Wax Candle Flames in a Low-Speed Oxidizing Stream in Microgravity. 2013.**  
https://www.researchgate.net/publication/265684771_Burning_Characteristics_of_Paraffin_and_Japan_Wax_Candle_Flames_in_a_Low-Speed_Oxidizing_Stream_in_Microgravity

**S7. Endo M, T'ien JS, Ferkul PV, Olson SL, Johnston MC. Flame Growth Around a Spherical Solid Fuel in Low Speed Forced Flow in Microgravity. Fire Technology 56, 5-32.**  
https://doi.org/10.1007/s10694-019-00848-2

**S8. Zhao X, Liao YT, Johnston MC, T'ien JS, Ferkul PV, Olson SL. Concurrent flame growth, spread, and quenching over composite fabric samples in low speed purely forced flow in microgravity. Proceedings of the Combustion Institute 36(2), 2971-2978.**  
https://doi.org/10.1016/j.proci.2016.06.028

**S9. NASA ISS Program Science Office. A Researcher's Guide to Combustion Science.**  
https://www.nasa.gov/sites/default/files/atoms/files/np-2015-10-034-jsc_combustion_in_reduced_gravity-iss-mini-book-011116-508.pdf

**S10. NASA ISS Technical Publication - Burning and Suppression of Solids (BASS).**  
https://www.nasa.gov/wp-content/uploads/2022/03/iss_technical_publication_030116.pdf

**S11. NASA - Science in Space: Fire Safety in Space, 2023.**  
https://www.nasa.gov/missions/station/iss-research/science-in-space-week-of-sept-29-2023-fire-safety-in-space/

**S12. NASA Task Book - Predicting Material Flammability in Partial Gravity Using Microgravity and Ground Data, PI Ya-Ting Liao.**  
https://taskbook.nasaprs.com/tbp/index.cfm?TASKID=31FF2895CF11A3D63C9B8986DB12A22A&action=public_query_taskbook_content

**S13. NASA - Fighting Fire with Fire: New Space Station Experiments Study Flames in Space.**  
https://www.nasa.gov/humans-in-space/fighting-fire-with-fire-new-space-station-experiments-study-flames-in-space/

**S14. NASA BASS experiment profile.**  
https://www.nasa.gov/wp-content/uploads/2025/07/burning-and-suppression-of-solids-bass.pdf

**S15. NASA PSI - BASS-II / PSI-25, related investigation metadata.**  
https://psi.nasa.gov/physci/repo/data/investigations/PSI-25

**S16. NASA photo ISS035-E-014971, BASS experiment, mirrored by Wikimedia Commons.**  
https://commons.wikimedia.org/wiki/File:ISS-35_Burning_and_Suppression_of_Solids_(BASS)_experiment_(1).jpg

**S17. NASA NTRS - International Space Station Imagery, 2022, BASS image sequence.**  
https://ntrs.nasa.gov/api/citations/20220009934/downloads/ISS%20Imagery%20-%20ISS%20RD%20rev%201.pdf
