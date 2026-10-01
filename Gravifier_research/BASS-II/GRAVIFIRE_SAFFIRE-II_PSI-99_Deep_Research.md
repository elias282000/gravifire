# GRAVIFIRE Deep Research Report
## SAFFIRE-II / Spacecraft Fire Experiment-II
### NASA PSI-99: Material Flammability, Multimodal Evidence, Literature Review, Model History, and Research Gap Map

<div class="cover-meta">
<strong>Project:</strong> GRAVIFIRE - NASA International Space Apps Challenge 2026<br>
<strong>Investigation:</strong> Spacecraft Fire Experiment-II (SAFFIRE-II)<br>
<strong>NASA PSI:</strong> PSI-99<br>
<strong>NASA Center:</strong> Glenn Research Center<br>
<strong>Flight vehicle:</strong> Orbital ATK Cygnus OA-5<br>
<strong>Launch:</strong> 17 October 2016<br>
<strong>Experiment operations:</strong> 21 November 2016<br>
<strong>Prepared:</strong> 1 October 2026
</div>

> **Evidence standard.** This report separates **MEASURED**, **DERIVED**, **MODELED**, **INTERPRETED**, and **OPEN / UNVERIFIED** statements. Planning values and as-flown values remain distinct. A single pass/fail flight condition is not silently converted into a material flammability limit. Values from SAFFIRE-I, SAFFIRE-III, BASS, or BASS-II are not used to fill SAFFIRE-II gaps unless an explicit comparison is being made.

---

## Executive Summary

SAFFIRE-II changed the Saffire strategy from the meter-class single-fuel fire of SAFFIRE-I to a **nine-coupon material-flammability campaign** designed around questions that terrestrial NASA-STD-6001 Test 1 cannot answer directly in long-duration microgravity. The samples were approximately 5 cm wide by 29 cm long and represented four major material families: polydimethylsiloxane (PDMS/silicone), SIBAL cotton-fiberglass fabric, Nomex with a PMMA ignition aid, and thick PMMA. [S2](https://ntrs.nasa.gov/citations/20170000230) [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf)

<div class="metric-grid">
<div class="metric"><div class="n">9</div><div class="l">flight material samples</div></div>
<div class="metric"><div class="n">4</div><div class="l">material families</div></div>
<div class="metric"><div class="n">38+ Gb</div><div class="l">image + sensor data reported by NASA</div></div>
<div class="metric"><div class="n">106k+</div><div class="l">images already captured after samples 1-6</div></div>
</div>

The highest-value scientific result was not a universal numerical MOC. It was a **set of material-specific long-duration microgravity outcomes near terrestrial screening boundaries**. All four PDMS samples ignited but failed to develop self-sustaining propagation, despite ground-test expectations that at least some thicknesses were near or above terrestrial flammability boundaries. The two SIBAL coupons burned to completion. The PMMA ignition strip burned on Sample 7, but the Nomex section did not propagate. The two thick PMMA samples burned throughout their test windows and extinguished when forced flow ceased. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) [S7](https://doi.org/10.1016/j.combustflame.2022.112009)

That makes SAFFIRE-II scientifically valuable for three reasons:

1. It **tests the transferability of Earth-gravity screening logic into long-duration microgravity** rather than assuming it.
2. It provides **matched or near-matched material cases** that later researchers used to study scale, pressure, buoyancy, flow direction, geometry, and surface structure.
3. Its evidentiary richness is in **multimodal time series** - camera frames, radiometers, thermocouples, O2/CO2/pressure, flow measurements, ignition data, and vehicle context - not in the fact that there are nine samples. [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf) [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

The literature already substantially covers basic flame-front tracking, SIBAL scale effects, PMMA flame-spread extraction, reduced-pressure analogs, Nomex external heating, and PDMS ash-mediated extinction. A GRAVIFIRE project should therefore **not** claim novelty for simple image segmentation, ordinary spread-rate measurement, or generic "microgravity materials are different" conclusions. The more defensible remaining opportunities lie in uncertainty-aware multimodal synchronization, provenance, model applicability, evidence-gap mapping, and explicit representation of conflicting planning versus as-flown metadata.


<div class="figure-card">
<svg viewBox="0 0 1100 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SAFFIRE-II nine sample card reconstruction">
<rect width="1100" height="520" fill="#061626"/>
<text x="45" y="55" fill="#ffffff" font-size="28" font-weight="700">SAFFIRE-II nine-sample evidence map</text>
<text x="45" y="86" fill="#9bdcf5" font-size="16">NASA/NTRS sample numbering, as-flown material family, airflow and outcome</text>
<defs><marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#25a8d7"/></marker></defs>
<line x1="1000" y1="120" x2="860" y2="120" stroke="#25a8d7" stroke-width="8" marker-end="url(#arr)"/><text x="915" y="105" fill="#bfeeff" font-size="15">Flow</text>
<g font-family="Arial" font-size="15">
<rect x="55" y="130" width="300" height="95" rx="12" fill="#0b4b74"/><text x="75" y="160" fill="#fff" font-size="21" font-weight="700">1 | PDMS 0.25 mm</text><text x="75" y="187" fill="#d9f3ff">20 cm/s, concurrent</text><text x="75" y="210" fill="#ffd166">Ignited; no sustained propagation</text>
<rect x="400" y="130" width="300" height="95" rx="12" fill="#0b4b74"/><text x="420" y="160" fill="#fff" font-size="21" font-weight="700">2 | PDMS 0.61 mm</text><text x="420" y="187" fill="#d9f3ff">20 cm/s, concurrent</text><text x="420" y="210" fill="#ffd166">Ignited; no sustained propagation</text>
<rect x="745" y="130" width="300" height="95" rx="12" fill="#0b4b74"/><text x="765" y="160" fill="#fff" font-size="21" font-weight="700">3 | PDMS 1.02/1.03 mm</text><text x="765" y="187" fill="#d9f3ff">20 cm/s, concurrent</text><text x="765" y="210" fill="#ffd166">Ignited; no sustained propagation</text>
<rect x="55" y="245" width="300" height="95" rx="12" fill="#0b4b74"/><text x="75" y="275" fill="#fff" font-size="21" font-weight="700">4 | PDMS 0.36 mm</text><text x="75" y="302" fill="#d9f3ff">20 cm/s, opposed</text><text x="75" y="325" fill="#ffd166">Ignited; no sustained propagation</text>
<rect x="400" y="245" width="300" height="95" rx="12" fill="#146b60"/><text x="420" y="275" fill="#fff" font-size="21" font-weight="700">5 | SIBAL 0.33 mm</text><text x="420" y="302" fill="#d9fff3">20 cm/s, concurrent</text><text x="420" y="325" fill="#bff3d6">Burned to completion</text>
<rect x="745" y="245" width="300" height="95" rx="12" fill="#146b60"/><text x="765" y="275" fill="#fff" font-size="21" font-weight="700">6 | SIBAL 0.33 mm</text><text x="765" y="302" fill="#d9fff3">25 cm/s as-flown*</text><text x="765" y="325" fill="#bff3d6">Burned to completion</text>
<rect x="55" y="360" width="300" height="95" rx="12" fill="#694e9b"/><text x="75" y="390" fill="#fff" font-size="21" font-weight="700">7 | PMMA -> Nomex</text><text x="75" y="417" fill="#eee7ff">20 cm/s, concurrent</text><text x="75" y="440" fill="#ffd166">PMMA burned; Nomex did not propagate</text>
<rect x="400" y="360" width="300" height="95" rx="12" fill="#934c1d"/><text x="420" y="390" fill="#fff" font-size="21" font-weight="700">8 | Structured PMMA</text><text x="420" y="417" fill="#fff0df">nominal 10 mm, 20 cm/s</text><text x="420" y="440" fill="#ffe0a6">Burned until flow termination</text>
<rect x="745" y="360" width="300" height="95" rx="12" fill="#934c1d"/><text x="765" y="390" fill="#fff" font-size="21" font-weight="700">9 | Flat PMMA</text><text x="765" y="417" fill="#fff0df">10 mm, actual 20 cm/s in analysis</text><text x="765" y="440" fill="#ffe0a6">Burned until flow termination</text>
</g>
<text x="55" y="490" fill="#9ab0c0" font-size="13">*Planning documents list 30 cm/s for Sample 6; post-flight analysis reports 25 cm/s. Preserve both with provenance.</text>
</svg>
<div class="caption">Figure 1. GRAVIFIRE reconstruction of the SAFFIRE-II sample card from NASA/NTRS and peer-reviewed sources. It deliberately separates planning values from post-flight values.</div>
</div>



# 1. Verified Investigation Identity

| Field | Verified finding | Evidence / caveat |
|---|---|---|
| Exact title | Spacecraft Fire Experiment-II | NASA PSI / PSI program listings |
| Acronym | SAFFIRE-II | NASA |
| PSI ID | **PSI-99** | Official PSI endpoint [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-99) |
| DOI | **10.60555/2chp-m469** | Current PSI metadata reviewed for this audit |
| PSI version | **Version 5** | Current PSI metadata reviewed for this audit |
| Initial PSI release | **18 September 2024** | Current PSI metadata |
| Latest metadata update | **June 2025** | Current PSI version history |
| Research area | Combustion Science | NASA PSI |
| NASA center | Glenn Research Center | NASA PSI / NTRS |
| Completion status | Complete | NASA PSI research-area listing [S17](https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/) |
| Mission | Cygnus CRS OA-5 | NASA program records [S18](https://science.nasa.gov/physical-sciences-informatics-psi/nasa-psi-research-opportunity/) |
| Launch | **17 October 2016** | NASA/NTRS mission table [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) |
| Flight operation | **21 November 2016** | NASA/NTRS mission table [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) |
| SAFFIRE PI | David L. Urban | NASA project literature |
| Project manager | Gary A. Ruff | NASA project literature |
| License | **Not independently surfaced in the PSI-99 search index used for this audit** | Do not transfer PSI-98's CC0 label without direct PSI-99 verification |

### Metadata caution

The PSI system has shown legacy metadata anomalies for adjacent Saffire records. For SAFFIRE-II, this report therefore treats **mission-operational facts from NASA/NTRS** as authoritative for the 2016 Cygnus flight, while repository administrative dates describe the PSI release/versioning, not the date of the physical experiment.

### Official links

- NASA PSI-99: [Official PSI-99 investigation page](https://psi.nasa.gov/physci/repo/data/investigations/PSI-99)
- NASA Saffire development and operations: [Operation and Development Status of the Spacecraft Fire Experiments](https://ntrs.nasa.gov/citations/20170000230)
- NASA current PSI investigation listing: [PSI Investigations by Research Area](https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/)
- NASA PSI research opportunity listing: [PSI Research Opportunity - SAFFIRE-II / CRS OA-5](https://science.nasa.gov/physical-sciences-informatics-psi/nasa-psi-research-opportunity/)


# 2. Why NASA Conducted SAFFIRE-II

## 2.1 NASA stated objective

NASA's Saffire program addressed two linked risks: how rapidly realistic-scale fires grow in low gravity, and whether **low-gravity flammability limits agree with the normal-gravity material screening test** used for spacecraft material selection. SAFFIRE-II was the flight devoted most directly to the second problem. [S2](https://ntrs.nasa.gov/citations/20170000230) [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf)

The samples intentionally emulated the approximate geometry of NASA-STD-6001 Test 1 coupons. Camera imagery was the primary diagnostic because the fundamental question for several samples was binary but safety-critical: **does the flame propagate or self-extinguish under long-duration low-gravity conditions?** [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf)

## 2.2 Why SAFFIRE-I was not enough

SAFFIRE-I answered a scale question using a large SIBAL panel, but one material and one large configuration cannot establish material-specific flammability boundaries. SAFFIRE-II traded meter-class area for **material diversity and multiple near-limit cases**, allowing NASA to probe how thickness, flow direction, surface structure, and material chemistry alter long-duration microgravity flammability.

## 2.3 Why NASA-STD-6001 Test 1 matters

Test 1 places a coupon vertically in 1g and uses upward flame spread as a conservative screening configuration. A common pass/fail criterion is whether the material self-extinguishes before the flame consumes 15 cm of the sample. For materials whose behavior changes strongly when buoyant flow disappears, the assumption that upward 1g is always the worst relevant case requires evidence rather than faith. [S6](https://ntrs.nasa.gov/citations/20150022421)

## 2.4 MOC in this research context

For the silicone pre-flight work, NASA investigators defined **Maximum Oxygen Concentration (MOC)** as the highest oxygen mole fraction at which all six replicate samples self-extinguish before 15 cm of spread in the specified Test 1 configuration. The Upward Limiting Oxygen Index (ULOI) is a probabilistic boundary at which about half the repeats pass and half fail. [S6](https://ntrs.nasa.gov/citations/20150022421)

<div class="callout warning"><strong>Evidence rule:</strong> SAFFIRE-II did not fly six replicates at a sequence of oxygen concentrations for each material. Therefore a single flight condition can confirm a propagation outcome, challenge a terrestrial expectation, or constrain a boundary, but it generally cannot by itself provide an exact flight MOC.</div>


<div class="figure-card">
<svg viewBox="0 0 1100 430" xmlns="http://www.w3.org/2000/svg">
<rect width="1100" height="430" fill="#f7fbfd"/>
<text x="45" y="50" fill="#061626" font-size="27" font-weight="700">What SAFFIRE-II could and could not establish about flammability limits</text>
<rect x="55" y="100" width="285" height="235" rx="16" fill="#e7f4fb" stroke="#72b9dc"/><text x="78" y="136" fill="#0b5685" font-size="21" font-weight="700">Ground screening</text><text x="78" y="170" fill="#263e50" font-size="16">NASA-STD-6001 Test 1</text><text x="78" y="198" fill="#263e50" font-size="16">5 cm x 30 cm coupon</text><text x="78" y="226" fill="#263e50" font-size="16">Pass: self-extinguishes</text><text x="78" y="250" fill="#263e50" font-size="16">before 15 cm spread</text><text x="78" y="286" fill="#7253b6" font-size="15">MOC = highest O2 where</text><text x="78" y="310" fill="#7253b6" font-size="15">all six repeats pass</text>
<path d="M355 217 L480 217" stroke="#f97316" stroke-width="8"/><polygon points="480,217 458,205 458,229" fill="#f97316"/>
<rect x="500" y="100" width="285" height="235" rx="16" fill="#fff6e9" stroke="#e7b45d"/><text x="523" y="136" fill="#985516" font-size="21" font-weight="700">SAFFIRE-II flight</text><text x="523" y="170" fill="#263e50" font-size="16">Nine single flight coupons</text><text x="523" y="198" fill="#263e50" font-size="16">near 1 atm, ~cabin O2</text><text x="523" y="226" fill="#263e50" font-size="16">different materials/thicknesses</text><text x="523" y="254" fill="#263e50" font-size="16">long-duration microgravity</text><text x="523" y="292" fill="#c9362b" font-size="15">A single flight point gives</text><text x="523" y="316" fill="#c9362b" font-size="15">a pass/fail condition or bound,</text><text x="523" y="338" fill="#c9362b" font-size="15">not a full MOC curve.</text>
<path d="M800 217 L900 217" stroke="#25a8d7" stroke-width="8"/><polygon points="900,217 878,205 878,229" fill="#25a8d7"/>
<rect x="920" y="135" width="140" height="165" rx="16" fill="#eaf7f2" stroke="#7cc7ac"/><text x="940" y="170" fill="#168b78" font-size="19" font-weight="700">Evidence</text><text x="940" y="204" fill="#263e50" font-size="15">exact value?</text><text x="940" y="230" fill="#263e50" font-size="15">bound?</text><text x="940" y="256" fill="#263e50" font-size="15">pass/fail?</text><text x="940" y="282" fill="#263e50" font-size="15">estimate?</text>
<text x="55" y="390" fill="#607387" font-size="15">GRAVIFIRE rule: never convert one SAFFIRE-II condition into a universal material MOC.</text>
</svg>
<div class="caption">Figure 2. MOC evidence logic. SAFFIRE-II was designed around low-gravity flammability-limit questions, but one flight test per material/configuration generally constrains a boundary rather than measuring a complete threshold curve.</div>
</div>



# 3. Experimental Design Reconstruction

SAFFIRE-II used the Saffire flow-duct architecture carried inside the uncrewed Cygnus vehicle. The rectangular duct was approximately 460 mm by 510 mm in cross-section, with fans producing forced flow past a centrally mounted sample card. Nine samples were burned sequentially after Cygnus had safely departed the ISS. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/) [S2](https://ntrs.nasa.gov/citations/20170000230)

## 3.1 Diagnostics

The Saffire I-III diagnostic suite documented in NASA conference material included:

- two cameras viewing one side of the sample card;
- four calibrated radiometers, two viewing the front and two the back;
- six thermocouples shared across the sample card / duct configuration;
- O2 and CO2 solid-state sensors;
- pressure sensing;
- two anemometers, one on each side of the sample;
- smoke-wire flow visualization before combustion;
- ignition electrical control and telemetry. [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf)

For the PMMA analyses, published flight descriptions state that the two cameras recorded at **30 frames/s**, with the duct normally dark for flame imaging and the front surface illuminated for about **0.4 s every 2 s using green LEDs** to reveal the solid/pyrolysis region. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

## 3.2 Variable / measurement matrix

| Variable / measurement | Controlled | Measured | Unit | Sample-specific? | Source | Notes |
|---|---:|---:|---|---:|---|---|
| Material | yes | configuration | categorical | yes | S3/S4 | PDMS, SIBAL, Nomex+PMMA, PMMA |
| Length / width | yes | configuration | mm | yes | S3/S12 | nominally 290 x 50 mm |
| Thickness | yes | configuration | mm | yes | S3/S4 | 0.25 to 10 mm class |
| Flow velocity | yes | yes | cm/s | yes | S3/S4 | planning vs as-flown discrepancy for Sample 6 |
| Flow direction | yes | configuration | concurrent/opposed | yes | S3 | Sample 4 opposed; most others concurrent |
| Cabin O2 | facility condition | yes | vol % | time-dependent | S3/S12 | around cabin-air conditions; exact value should be tied to run sensor data |
| Pressure | facility condition | yes | kPa | time-dependent | S12 | near atmospheric in PMMA analysis |
| Igniter current/power/time | yes | yes/telemetry | A/W/s | yes | S8-S12 | not identical across every material family |
| Flame image | response | yes | image/time | yes | S3/S12 | primary diagnostic |
| Pyrolysis / char visibility | response | derived | image position | yes | S12 | aided by green illumination; not always visible in flight |
| Flame spread rate | response | derived | mm/s | yes | S7-S13 | method depends on material/frames |
| Radiation | response | yes | radiometer signal/flux | some samples | S3/S20 | front/back views |
| Surface/flame/duct temperature | response | yes | temperature | selected locations | S3 | only six thermocouples shared across card |
| CO2 | response | yes | mole fraction | experiment/cabin | S3 | avionics/duct placement in program docs |
| Smoke detector | response/context | vehicle-provided | detector output | global | S12 | not a dedicated smoke-generation experiment |

### 3.3 Ignition should remain sample-specific

There was no single universal ignition setting for all nine samples. For thick PMMA, the published sample-9 setup used a 29-gage (0.286 mm) Kanthal wire threaded across the tapered upstream edge and powered for 30 s at about 3.85 A / 97 W to assure ignition. The SIBAL cross-scale publication reports about 3.8 A, 80 W for 9.16 s for SAFFIRE-II Sample 5. Ground silicone pre-flight tests used a 29-AWG Kanthal wire at 3.8 A for 8 s, but that ground value must not be automatically substituted for the flight telemetry. [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S8](https://doi.org/10.1016/j.proci.2018.05.168) [S6](https://ntrs.nasa.gov/citations/20150022421)


# 4. Exact Nine-Sample Inventory

NASA post-flight summaries provide the clearest concise outcome map, while development documents preserve planned conditions. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf)

| Sample | Material | Thickness | Flight flow / direction | Purpose | Flight observation | Evidence status |
|---|---|---:|---|---|---|---|
| 1 | PDMS / silicone | 0.25 mm | 20 cm/s concurrent | flammability-limit thickness | ignited; no sustained flame propagation | MEASURED/INTERPRETED |
| 2 | PDMS / silicone | 0.61 mm | 20 cm/s concurrent | flammability-limit thickness | ignited; no sustained propagation | MEASURED/INTERPRETED |
| 3 | PDMS / silicone | 1.02-1.03 mm | 20 cm/s concurrent | thick silicone near non-ignition ground regime | ignited; no sustained propagation | MEASURED/INTERPRETED |
| 4 | PDMS / silicone | 0.36 mm | 20 cm/s opposed | test direction sensitivity | ignited; no sustained propagation | MEASURED/INTERPRETED |
| 5 | SIBAL, 75% cotton / 25% fiberglass | 0.33 mm | 20 cm/s concurrent | medium-scale bridge to SAFFIRE-I | burned to completion | MEASURED |
| 6 | SIBAL | 0.33 mm | **25 cm/s post-flight**; 30 cm/s in planning table | second flow case | burned to completion | MEASURED + metadata discrepancy |
| 7 | PMMA ignition strip -> Nomex | Nomex ~0.33 mm; PMMA aid ~1 mm in NASA summary | 20 cm/s concurrent | ignite fire-resistant fabric with real flame source | PMMA burned; flame did not propagate into Nomex | MEASURED |
| 8 | structured/grooved PMMA | nominal 10 mm with locally thinner structured region | 20 cm/s concurrent | surface-structure effect | sustained burn through test window; extinguished when flow ceased | MEASURED/DERIVED |
| 9 | flat PMMA | 10 mm | planning documents list 30 cm/s; later PMMA analysis uses 20 cm/s microgravity case | flat reference / spacecraft acrylic analogue | sustained burn through test window; extinguished when flow ceased | MEASURED + source-context discrepancy |

<div class="callout danger"><strong>Do not flatten this table into a training set without provenance.</strong> The rows differ in material physics, ignition strategy, flow direction, surface geometry, sensor coverage, and scientific target. Samples 1-4 are near-limit PDMS tests; 5-6 are scale/flow fabric tests; 7 is an externally heated fire-resistant fabric; 8-9 are thermally thick PMMA flame-spread experiments.</div>

### Planned-vs-as-flown discrepancies

Two values deserve explicit versioning:

- **Sample 6 flow:** early NASA planning tables list 30 cm/s, while post-flight summary/cross-scale literature reports 25 cm/s. [S5](https://ntrs.nasa.gov/api/citations/20160010292/downloads/20160010292.pdf) [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)
- **Sample 9 flow:** some pre-flight tables list 30 cm/s, while later peer-reviewed PMMA analysis describes the microgravity PMMA case at 200 mm/s (20 cm/s). [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

GRAVIFIRE should keep separate fields such as `planned_flow`, `reported_flight_flow`, `source`, and `source_date` rather than deciding that one number is universally "the" value.


# 5. Silicone / PDMS Samples

## 5.1 Pre-flight expectation

PDMS was selected because terrestrial flammability thresholds lie near ordinary cabin oxygen concentration and because thickness strongly changes the pass/fail response. Pre-flight NASA work tested 0.25, 0.36, 0.61, and 1.00 mm sheets in upward, downward, angled, horizontal, and forced-flow configurations. Ground studies showed that silica ash produced by PDMS can deposit onto unburned material and act as a thermal and mass-transfer barrier. [S6](https://ntrs.nasa.gov/citations/20150022421)

Published ground MOC / ULOI work used replicate testing across oxygen concentration. Representative pre-flight MOC values reported by the cited Hirsch dataset decreased with thickness, illustrating why NASA could choose flight coupons expected to sit near different sides of the terrestrial boundary. Those ground thresholds are **not flight MOC measurements**.

## 5.2 Flight result

NASA's post-flight summary is unambiguous: **all four silicone samples ignited, but flame propagation did not continue.** [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)

A later dedicated PDMS paper re-analyzed the SAFFIRE-II microgravity results and concluded that, contrary to ground-based expectations, the four flight samples did not develop self-sustained flames. The work emphasizes silica-ash production/deposition, solid-phase residue, radiative heat loss, and flow configuration as important mechanisms that complicate direct use of Test 1 expectations. [S7](https://doi.org/10.1016/j.combustflame.2022.112009)

### Later quantitative image analysis

Rojas-Alva's doctoral work tracked the leading-edge position of the flame/igniter region for all four PDMS flight samples. It treated the post-igniter behavior as extinction rather than sustained flame spread and highlighted the difficulty of predicting ash-producing silicone with conventional flame-spread models. [S14](https://era.ed.ac.uk/handle/1842/39064)

## 5.3 What SAFFIRE-II established - and what it did not

**Established:** selected PDMS thicknesses that were chosen from ground flammability behavior did not sustain propagation in the tested long-duration microgravity forced-flow conditions.

**Did not establish:** a universal PDMS MOC in microgravity, because the flight did not sweep oxygen concentration with the repeated sample count required by the terrestrial MOC definition.

**Mission implication:** terrestrial screening can be an imperfect predictor, but the flight result does not justify declaring PDMS categorically safer or less flammable in microgravity. Product formulation, thickness, residue formation, oxygen, pressure, forced flow, and ignition energy all matter.


# 6. SIBAL / Cotton-Fiberglass Samples

SIBAL is a composite model fuel containing approximately **75% cotton and 25% fiberglass by mass**. The fiberglass maintains structural integrity after the cotton burns. Samples 5 and 6 created a deliberate bridge to the large SIBAL panel used in SAFFIRE-I. [S8](https://doi.org/10.1016/j.proci.2018.05.168)

## 6.1 Sample 5 - scale bridge

Sample 5 used a 5 cm x 29 cm coupon at 20 cm/s, compared with the much wider SAFFIRE-I sample at nominally the same inlet flow. Later model-versus-experiment work showed that the smaller SAFFIRE-II coupon and the large SAFFIRE-I panel both approached quasi-steady flame states, but **sample width, location in the duct, flow-field development, and confinement materially affected measured spread behavior**. [S8](https://doi.org/10.1016/j.proci.2018.05.168)

## 6.2 Sample 6 - second flow condition

Post-flight literature reports a 25 cm/s flight case, while pre-flight NASA planning tables list 30 cm/s. The discrepancy should be retained as provenance, not erased. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) [S5](https://ntrs.nasa.gov/api/citations/20160010292/downloads/20160010292.pdf)

## 6.3 Cross-scale values from later synthesis

A later cross-scale SIBAL study reports, for SAFFIRE-II:

- Sample 5: O2 about 22.1%, pressure about 103 kPa, spread rate around 0.21 cm/s, flame/pyrolysis lengths around 4 cm;
- Sample 6: O2 about 22.1%, pressure about 103 kPa, spread rate around 0.26 cm/s, flame/pyrolysis lengths around 5 cm.

These are **later processed/derived literature values**, not raw Experimental Table labels. They should therefore be stored as literature-derived measurements with citation and method, not overwritten into NASA's raw record.

## 6.4 What the comparison taught researchers

The SIBAL lineage demonstrated that nominally matching material and inlet velocity does not guarantee identical flame-spread behavior across experiment scale. The flow duct, sample width, confinement, boundary-layer development, and sample placement can all alter local transport. This is a direct warning against pooling BASS, SAFFIRE-I, and SAFFIRE-II rows solely because the material field says `SIBAL`.


# 7. PMMA / Acrylic Samples

## 7.1 Samples 8 and 9

SAFFIRE-II Samples 8 and 9 were thermally thick PMMA coupons approximately 50 mm wide and 290 mm long. Sample 9 was the flat reference, while Sample 8 had a structured/grooved surface with locally thinner regions to study the effect of surface geometry on ignition and spread. [S9](https://doi.org/10.1007/s10694-019-00863-3) [S20](https://www.pure.ed.ac.uk/ws/portalfiles/portal/90496130/FT_2018_Saffire_PMMA_revised_with_changes_accepted.pdf)

The thick PMMA configuration is operationally relevant because acrylic-like materials are used in spacecraft applications, but the experiment should not be generalized to every acrylic product or window architecture.

## 7.2 Ignition and visual diagnostics

The published PMMA analysis describes a 29-gage Kanthal wire across the tapered upstream edge. Green LED illumination periodically exposed the material surface while dark frames emphasized the luminous flame. The structured sample ignited more readily, showed faster initial growth and greater luminosity, and produced asymmetric front/back radiation. [S20](https://www.pure.ed.ac.uk/ws/portalfiles/portal/90496130/FT_2018_Saffire_PMMA_revised_with_changes_accepted.pdf) [S9](https://doi.org/10.1007/s10694-019-00863-3)

## 7.3 Flight duration and shutdown

NASA's post-flight summary reports that the PMMA samples burned for their test windows and extinguished when flow ceased. This is important evidence that forced ventilation was a controlling part of the fire environment. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)

## 7.4 Later ground comparison

Thomsen et al. compared the flat SAFFIRE-II PMMA case with normal-gravity experiments from 100 to 40 kPa. Lower pressure reduced buoyancy and slowed concurrent spread, with a mixed-convection correlation extrapolating reasonably toward the microgravity flight spread rate. [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

This is substantial prior art. A GRAVIFIRE feature that merely "predicts PMMA spread from pressure" would be reproducing an existing physical analysis unless it tackles a clearly new uncertainty, applicability, or cross-evidence problem.


# 8. Nomex Sample

Sample 7 used a **PMMA ignition aid upstream of Nomex**, deliberately representing a fire-resistant material exposed to a realistic adjacent flame rather than only a standardized chemical or radiant igniter. NASA's post-flight summary reports that the PMMA burned but the flame **did not propagate into the Nomex** under the flight condition. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)

Later ground work reproduced the SAFFIRE-II concept with PMMA heating and compared it with controlled radiant heating. It found that external heating can extend the oxygen range over which Nomex propagates, and that a real PMMA flame can produce a very different effective flammability boundary from lamps alone. The study used pressure and oxygen variation to develop a mixed-convection interpretation. [S11](https://doi.org/10.1016/j.proci.2018.05.055)

### Why this matters

A material's fire resistance cannot always be represented by one intrinsic threshold independent of the **neighboring fire source**. SAFFIRE-II Sample 7 is valuable because it is an interaction test: PMMA supplies heat and ignition products, while Nomex supplies the candidate flame-resistant surface.

### What it does not prove

The single flight non-propagation result does not establish that Nomex cannot propagate in spacecraft. Later ground experiments show sensitivity to oxygen, pressure, and external heat flux. SAFFIRE-II provides one high-value boundary condition, not a universal certification.


# 9. Maximum Oxygen Concentration and Flammability-Limit Analysis

## 9.1 Definition

For the ground Test 1 methodology used in the silicone pre-flight work, **MOC is an experimentally repeated threshold**, not a one-shot value: the maximum oxygen mole fraction at which all six samples meet the pass criterion. ULOI is a related 50% pass/fail statistic. [S6](https://ntrs.nasa.gov/citations/20150022421)

## 9.2 What SAFFIRE-II actually tested

SAFFIRE-II flew a limited set of material/thickness/configuration points near cabin-air oxygen. It could therefore:

- test whether a configuration expected to propagate in 1g actually propagates in microgravity;
- test a flight pass/fail state at a known O2/pressure/flow condition;
- constrain hypotheses about low-g flammability limits;
- provide model-validation cases.

It could not map a full microgravity MOC curve for each material because it lacked replicate oxygen sweeps.

| Material family | Ground expectation | Flight condition | Flight observation | Interpretation class |
|---|---|---|---|---|
| PDMS thin sheets | thickness-dependent Test 1 behavior near cabin O2 | ~cabin air, forced flow | ignition without sustained propagation | **BOUND / pass-fail condition**, not exact flight MOC |
| SIBAL | known flammable model fabric | 20 and ~25 cm/s | burned to completion | propagation condition demonstrated |
| Nomex + PMMA | flame-resistant fabric with external flame source | 20 cm/s | PMMA burned; Nomex did not sustain propagation | non-propagation condition demonstrated |
| PMMA thick | expected to sustain concurrent flame spread | forced cabin flow | sustained for test window; died after flow stop | propagation condition + ventilation dependence |

<div class="callout info"><strong>GRAVIFIRE labeling rule:</strong> represent every threshold-like result as one of: EXACT VALUE, BOUND, PASS/FAIL CONDITION, ESTIMATE, or HYPOTHESIS. Most SAFFIRE-II flight outcomes belong in PASS/FAIL CONDITION or BOUND.</div>


# 10. Complete NASA Public Dataset Audit

The official archive is NASA PSI-99. The indexed public interface confirms the investigation and repository structure, but the search system available for this review did **not expose a complete stable manifest with every filename, byte size, and download URL**. This report therefore distinguishes verified category-level holdings from details that require opening the PSI file browser directly. [S1](https://psi.nasa.gov/physci/repo/data/investigations/PSI-99)

| Resource category | Public status | What it contains | Raw / processed | Scientific value | GRAVIFIRE priority |
|---|---|---|---|---|---|
| Investigation metadata | public | DOI/version/identity/context | metadata | provenance | MUST |
| Experimental Table | public PSI category | nine sample descriptors / planned or reported test fields | structured | sample-level indexing | MUST |
| Engineering documents | public PSI category | hardware, sample-card, offgassing/integration, procedures | documentation | configuration/provenance | MUST |
| Raw camera data | public archive category | dark and illuminated imagery, camera streams, flow visualization | raw | front tracking, event reconstruction | SELECTIVE initially |
| Raw sensor data | public archive category | thermal, radiometric, atmosphere, flow, ignition telemetry | raw | multimodal timeline | SHOULD |
| Science documents | public | conference papers and analysis | interpreted/derived | method + findings | MUST |
| Analyzed data | where present | derived fronts, spread, calibrated/processed signals | processed | validation benchmark | SHOULD |
| Flow visualization | public/raw | pre-burn uniformity / flow evidence | raw | boundary condition verification | SHOULD |
| Calibration / ROI / distortion | archive dependent | geometry/camera mapping | reference | measurement traceability | MUST for CV |
| Publications | public metadata / external journal links | peer-reviewed science | interpreted | prior art | MUST |

### Repository-size caution

NASA reported **more than 38 Gb of image and sensor data** from SAFFIRE-II. During operations, more than **106,000 images had already been captured after only Samples 1-6**, so the final visual dataset is clearly large. [S15](https://www.nasa.gov/wp-content/uploads/2016/05/20170329-nacheoc-crusan-gatens-hab-eclss-v5b_tagged.pdf) [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)

Do not equate image count with independent experiments. Most frames are temporally adjacent measurements of the same nine physical burns.


# 11. Practical Download Strategy

## MUST DOWNLOAD

1. **PSI investigation metadata archive / Experimental Table** - small; establishes identifiers, source semantics, sample rows, and version provenance.
2. **Saffire objectives, development, operations, and post-flight summary PDFs** - small; reconstruct design, sample-card layout, planned/as-flown values, and outcomes. [S2](https://ntrs.nasa.gov/citations/20170000230) [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)
3. **PDMS pre-flight paper + 2022 PDMS flight re-analysis** - critical for Samples 1-4 and MOC semantics. [S6](https://ntrs.nasa.gov/citations/20150022421) [S7](https://doi.org/10.1016/j.combustflame.2022.112009)
4. **SIBAL model-versus-experiment paper** - critical for Samples 5-6 and scale comparison. [S8](https://doi.org/10.1016/j.proci.2018.05.168)
5. **PMMA final paper / analysis** - critical for Samples 8-9. [S9](https://doi.org/10.1007/s10694-019-00863-3)
6. **Nomex mixed-convection paper** - critical for Sample 7. [S11](https://doi.org/10.1016/j.proci.2018.05.055)

## SHOULD DOWNLOAD

- calibration, ROI, frame-size, distortion, and timebase documents associated with the two cameras;
- thermocouple/radiometer/O2/CO2/pressure/flow data for Samples 5-9 first;
- flow-visualization files;
- analyzed front-position / spread-rate products if PSI provides them.

These enable GRAVIFIRE's **Evidence DNA**, model-validation, and multimodal timeline features without immediately ingesting tens of gigabytes of imagery.

## SELECTIVELY DOWNLOAD

Raw imagery/video should initially target:

- one PDMS case (Sample 1 or 2) to study ignition-to-extinction;
- SIBAL Sample 5 for cross-scale comparison;
- Nomex Sample 7 for PMMA-to-Nomex transition;
- flat PMMA Sample 9 for published benchmark reproduction;
- structured PMMA Sample 8 for surface-geometry effects.

After the ingestion, synchronization, and validation pipeline works on these representatives, expand to the full image archive.

## NOT NECESSARY YET

- every raw frame from every camera before the timebase and ROI metadata are understood;
- duplicate presentations that add no unique technical content;
- bulk imagery that cannot yet be linked to sample, camera, timestamp, and calibration;
- later Saffire datasets solely to fill SAFFIRE-II gaps. This phase is intentionally SAFFIRE-II-only.


# 12. Raw Images and Video Audit

SAFFIRE-II's visual evidence is one of its strongest assets.

## 12.1 Cameras and cadence

NASA program literature describes **two cameras** viewing one side of the sample card. For the PMMA flight analysis, the cameras recorded at **30 fps**. The duct was kept dark for flame imaging, while green LED illumination was applied for approximately **0.4 seconds every 2 seconds** to reveal the material surface. [S3](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf) [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

## 12.2 Dark frames

Dark frames support measurement of:

- visible flame front / tip;
- flame length and shape;
- luminous-area evolution;
- flicker and transient deformation;
- ignition and extinction event timing.

The PMMA literature extracted flame-front position from intensity thresholding in dark frames. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

## 12.3 Illuminated frames

Green-lit frames can expose:

- material surface;
- pyrolysis region;
- char/residue front for fabric or ash-forming materials;
- holder geometry and surface changes.

A key limitation is that **the PMMA pyrolysis front could not be reliably tracked in the SAFFIRE-II flight imagery in at least one later analysis because flame luminosity obscured the region**, even though the same measurement was clearer in ground tests. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

## 12.4 Image count

NASA mission updates reported more than **106,000 captured images after Samples 1-6**. A later NASA systems summary reported **more than 38 Gb of total image and sensor data received** from the mission. [S15](https://www.nasa.gov/wp-content/uploads/2016/05/20170329-nacheoc-crusan-gatens-hab-eclss-v5b_tagged.pdf)

The exact final frame count, per-camera file count, per-frame resolution, and full archive byte size should be taken from the PSI file manifest, not reconstructed from mission-update prose.

## 12.5 Calibration

Any modern CV pipeline should prioritize camera distortion grids, ROI offsets, physical pixel scale, and camera-to-sample geometry if available in PSI. Without these, segmentation can be visually impressive but scientifically weak.


# 13. Existing Flame Tracking and Image Processing

Image processing is already established SAFFIRE-II prior art.

### Thick PMMA

Later studies determined flame-tip/front position from frame intensity thresholds and tracked position versus time to calculate spread rate. The analysis explicitly excluded the ignition transient from the steady spread fit. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

### SIBAL

Model-versus-experiment studies used video and thermocouple histories to quantify flame growth, pyrolysis length, flame length, and spread behavior for SAFFIRE-I and SAFFIRE-II Sample 5. [S8](https://doi.org/10.1016/j.proci.2018.05.168)

### PDMS

The 2022 PDMS paper and associated doctoral analysis extracted flame-leading-edge trajectories from the four SAFFIRE-II silicone cases, but interpreted the post-igniter behavior as extinction rather than sustained material flame spread. [S7](https://doi.org/10.1016/j.combustflame.2022.112009) [S14](https://era.ed.ac.uk/handle/1842/39064)

### Nomex

The flight outcome is primarily a propagation / non-propagation result, while later ground studies provided more systematic measurements under varied pressure, O2, and external heating. [S11](https://doi.org/10.1016/j.proci.2018.05.055)

### Prior-art conclusion

**Already done:** threshold-based flame-front extraction, time-position tracking, spread-rate derivation, flame-length analysis, pyrolysis/char interpretation, comparison with thermal data, and cross-scale visualization.

**Potential remaining room:** systematic uncertainty on front location, automated event-state segmentation across all nine samples, calibrated multimodal registration, and source-linked reprocessing that reports when the visual observable is physically unidentifiable.


# 14. Modern Computer Vision Prior Art

A targeted search was performed for SAFFIRE-II combined with terms including **CNN, U-Net, semantic segmentation, instance segmentation, object detection, optical flow, vision transformer, automated flame tracking, deep learning, and uncertainty-aware segmentation**.

### Finding

**No direct evidence was found in the searched public literature of a peer-reviewed SAFFIRE-II-specific deep-learning segmentation pipeline.** This is not the same as claiming no such work exists.

The published SAFFIRE-II analyses found in this review rely mainly on physics-guided classical processing, including thresholding, geometric calibration, front tracking, and manual/algorithmic interpretation. That creates potential room for modern CV, but novelty would only be scientifically meaningful if it improves a measurement problem rather than replacing a robust threshold with an opaque neural network.

### Scientifically defensible modern-CV targets

- uncertainty-aware flame boundary rather than one hard mask;
- automated separation of igniter luminosity from self-sustained flame;
- ash/residue segmentation for PDMS where visibility permits;
- soot/char-front tracking on SIBAL;
- cross-camera geometric consistency checks;
- event classification: ignition, establishment, spread, stagnation, extinction;
- confidence-aware "not measurable" state when the pyrolysis front is obscured.

### Weak novelty targets

- generic flame/not-flame segmentation;
- pretty overlays without physical calibration;
- using neural networks merely because no prior neural network was found.


# 15. Sensor and Telemetry Data


<div class="figure-card">
<svg viewBox="0 0 1100 430" xmlns="http://www.w3.org/2000/svg">
<rect width="1100" height="430" fill="#061626"/>
<text x="45" y="54" fill="#fff" font-size="27" font-weight="700">SAFFIRE-II is a multimodal time-series dataset, not a nine-row ML table</text>
<g font-family="Arial">
<rect x="55" y="110" width="170" height="80" rx="12" fill="#0d5e9f"/><text x="78" y="145" fill="#fff" font-size="18" font-weight="700">Camera streams</text><text x="78" y="171" fill="#d9f3ff" font-size="14">dark + green-lit frames</text>
<rect x="260" y="110" width="170" height="80" rx="12" fill="#168b78"/><text x="283" y="145" fill="#fff" font-size="18" font-weight="700">Thermocouples</text><text x="283" y="171" fill="#d9fff3" font-size="14">sample / flame / duct</text>
<rect x="465" y="110" width="170" height="80" rx="12" fill="#934c1d"/><text x="488" y="145" fill="#fff" font-size="18" font-weight="700">Radiometers</text><text x="488" y="171" fill="#fff0df" font-size="14">front + back radiation</text>
<rect x="670" y="110" width="170" height="80" rx="12" fill="#7253b6"/><text x="693" y="145" fill="#fff" font-size="18" font-weight="700">Cabin sensors</text><text x="693" y="171" fill="#eee7ff" font-size="14">O2 / CO2 / pressure</text>
<rect x="875" y="110" width="170" height="80" rx="12" fill="#a63a3a"/><text x="898" y="145" fill="#fff" font-size="18" font-weight="700">Flow / ignition</text><text x="898" y="171" fill="#ffeaea" font-size="14">anemometers + power</text>
<path d="M140 220 L960 220" stroke="#25a8d7" stroke-width="5"/><circle cx="140" cy="220" r="8" fill="#25a8d7"/><circle cx="960" cy="220" r="8" fill="#25a8d7"/>
<text x="55" y="253" fill="#9bdcf5" font-size="15">Synchronize on experiment time</text>
<rect x="210" y="285" width="680" height="85" rx="15" fill="#f3f8fb"/><text x="250" y="318" fill="#061626" font-size="20" font-weight="700">Derived evidence layer</text><text x="250" y="346" fill="#315064" font-size="15">flame front • char / pyrolysis front • spread rate • event state • uncertainty • provenance</text>
<text x="55" y="407" fill="#9ab0c0" font-size="13">Scientific value comes from synchronized trajectories and source lineage, not from treating nine samples as IID rows.</text>
</g>
</svg>
<div class="caption">Figure 3. GRAVIFIRE multimodal architecture for SAFFIRE-II. The highest-value analysis aligns imagery, thermal/radiative signals, cabin state, airflow, ignition, and source metadata on a shared timeline.</div>
</div>


NASA's documented Saffire diagnostic suite included the following non-image channels. Exact sampling rates and calibration coefficients should be read from the PSI engineering/raw-data documentation rather than guessed from papers.

| Measurement | Instrument / location in program docs | Public scientific use | Coverage caveat |
|---|---|---|---|
| Flow temperature | thermocouples, duct inlet/outlet | boundary condition / plume context | not every sample has identical local coverage |
| Flame / surface temperature | thermocouples embedded in selected samples / near surface | SIBAL model validation, flame standoff | six TCs shared across nine-sample card |
| Plume temperature | thermocouple | thermal environment | location-specific |
| Radiation | four radiometers, two front + two back | PMMA asymmetry / radiative intensity | FOV differs by sample/card position |
| O2 | solid-state sensor | cabin / oxidizer state | slow global state, not local flame O2 field |
| CO2 | solid-state sensor | cabin response | global / local placement matters |
| Pressure | solid-state sensor | atmosphere | one mission environment, not pressure sweep |
| Flow velocity | two anemometers | actual forced-flow boundary condition | sample/duct profile not fully described by one scalar |
| Ignition | electrical telemetry | energy/timing | material-family specific |
| Smoke detector | vehicle system | contextual smoke response | not a calibrated aerosol science package |

### Synchronization opportunity

The most valuable GRAVIFIRE representation is a shared experiment-time axis linking:

`igniter state -> airflow -> camera frames -> thermocouples -> radiometers -> O2/CO2/pressure -> derived flame events`

A separate static record can summarize the run, but it should never replace the time series.


# 16. Major Scientific Findings

| Finding | Samples | Evidence class | Mission relevance | Limitation |
|---|---|---|---|---|
| PDMS samples ignited but did not sustain propagation | 1-4 | MEASURED / INTERPRETED | terrestrial expectation can fail | four conditions, no O2 sweep |
| SIBAL burned completely at both tested flows | 5-6 | MEASURED | validates flammable fabric behavior at medium scale | model fuel, narrow atmosphere |
| PMMA flame did not propagate into Nomex | 7 | MEASURED | adjacent-fire heating matters | one flight condition |
| Structured + flat thick PMMA sustained burning | 8-9 | MEASURED | thermally thick acrylic can support long concurrent spread | specific geometry / flow |
| PMMA burning stopped when forced flow ceased | 8-9 | MEASURED / INTERPRETED | ventilation strongly controls hazard | not an active suppression test |
| Surface structure altered PMMA ignition/growth | 8 vs 9 | MEASURED / DERIVED | geometry cannot be ignored in material screening | samples differ in structure and planned/as-flown flow context |
| Reduced-pressure ground tests approach microgravity PMMA spread | 9 + ground tests | DERIVED / MODELED | possible terrestrial analog approach | approximate; soot/temperature not fully reproduced |
| SIBAL scale/duct geometry affects spread | 5 + SAFFIRE-I / BASS literature | DERIVED / MODELED | coupon data do not transfer trivially to vehicle scale | confounded by location/duct/sample width |
| PDMS ash strongly complicates spread prediction | 1-4 + ground work | INTERPRETED / MODELED | silicone screening needs residue-aware physics | formulation-specific |

## 16.1 The most surprising result: silicone

The PDMS samples were specifically selected from ground flammability behavior to test near-limit conditions, but all four failed to establish sustained propagation in flight. This challenged a simple mapping from terrestrial Test 1 behavior to microgravity for that silicone system. [S7](https://doi.org/10.1016/j.combustflame.2022.112009)

## 16.2 The strongest "spacecraft environment" result: forced flow

The thick PMMA samples burned while forced air was present and extinguished when the flow stopped. That supports the physical importance of ventilation, but it should not be oversold as a general suppression rule for all spacecraft fires. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)


# 17. Ground vs Microgravity Comparison

## PDMS

Pre-flight ground testing produced thickness- and direction-dependent burn lengths and oxygen limits. The flight cases did not sustain propagation, demonstrating that the terrestrial outcome cannot be transplanted directly into microgravity without considering ash transport, radiative loss, boundary-layer behavior, and ignition details. [S6](https://ntrs.nasa.gov/citations/20150022421) [S7](https://doi.org/10.1016/j.combustflame.2022.112009)

## SIBAL

Ground and reduced-pressure experiments, BASS, SAFFIRE-I, and SAFFIRE-II have been used to study how mixed convection and scale affect thin-fabric spread. The later literature supports using reduced pressure as an **approximate** way to reduce buoyant influence, not as an exact recreation of microgravity. [S13](https://pmc.ncbi.nlm.nih.gov/articles/PMC6907022/) [S8](https://doi.org/10.1016/j.proci.2018.05.168)

## PMMA

For 10 mm PMMA, reducing normal-gravity pressure from 100 toward 40 kPa slowed concurrent spread and moved behavior toward the SAFFIRE-II microgravity result. A mixed-convection model extrapolated fairly well to the flight spread rate. However, the authors caution that flame appearance, soot formation, and temperature are not necessarily matched simply by lowering pressure. [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)

## Nomex

Ground tests matching the PMMA-to-Nomex arrangement and using controlled radiant heating showed strong sensitivity to oxygen, pressure, and the type of heat source. A real adjacent flame can extend propagation to conditions where radiant heating alone does not. [S11](https://doi.org/10.1016/j.proci.2018.05.055)

### Safety conclusion

The evidence does **not** justify a blanket statement that NASA-STD-6001 is always conservative or always non-conservative in microgravity. The transfer depends on material, thickness, flow direction, oxygen, pressure, ignition/heating source, residue chemistry, and geometry.


# 18. Peer-Reviewed Literature Matrix

| Work | Data used | Question / method | Major contribution | Limitation |
|---|---|---|---|---|
| Niehaus et al., 2015, *Buoyant Effects on the Flammability of Silicone Samples Planned for Saffire* | pre-flight PDMS ground tests | Test 1, direction, O2, forced flow, SEM/TGA/EDS | established terrestrial expectations and silica-layer mechanism | pre-flight, not flight result [S6](https://ntrs.nasa.gov/citations/20150022421) |
| Rojas-Alva et al., 2022, *Flame spread behaviour of PDMS membranes in 1g and microgravity* | SAFFIRE-II Samples 1-4 + ground tests | image analysis + ground forced-flow tests | explains failure of self-sustained PDMS flight flames; ash role | limited material formulation [S7](https://doi.org/10.1016/j.combustflame.2022.112009) |
| Li et al., 2019, *Transient flame growth and spread... Model versus experiment* | SAFFIRE-I + Sample 5 | 3D transient charring-solid model | reproduced transient growth / quasi-steady behavior; scale comparison | one SIBAL sample from II [S8](https://doi.org/10.1016/j.proci.2018.05.168) |
| Eigenbrod et al., 2017, *Effect of Surface Structures on PMMA in Microgravity* | Samples 8-9 | image/radiometer analysis | structured surface changes ignition/growth/spread behavior | conference study, short sample set |
| Olson & Jomaas, 2019, *Concurrent Flame Spread Over Two-Sided Thick PMMA Slabs in Microgravity* | Samples 8-9 | two-sided thick PMMA analysis | detailed structure vs flat behavior | only two PMMA configurations [S9](https://doi.org/10.1007/s10694-019-00863-3) |
| Thomsen et al., 2019, *Buoyancy effects on concurrent flame spread over thick PMMA* | Sample 9 + 1g pressure sweep | mixed-convection correlation | reduced-pressure approach approximates microgravity spread | not all flame characteristics match [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) |
| Thomsen et al., 2019, *Concurrent flame spread over externally heated Nomex under mixed convection flow* | Sample-7 concept + matched ground setup | pressure/O2/external-heat study | real PMMA flame and radiant heating produce different flammability response | ground comparison, not repeat flight [S11](https://doi.org/10.1016/j.proci.2018.05.055) |
| Rojas-Alva, 2022 PhD dissertation | Samples 1-4 + extensive PDMS data | ignition/spread/extinction/ash analysis | detailed post-flight reconstruction | thesis, not all conclusions independently replicated [S14](https://era.ed.ac.uk/handle/1842/39064) |

### Important NASA technical sources

- Ruff & Urban, **Operation and Development Status of the Spacecraft Fire Experiments**. [S2](https://ntrs.nasa.gov/citations/20170000230)
- NASA post-flight **SAFFIRE-II Summary**. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)
- NASA project development presentation documenting diagnostic suite and sample-selection constraints. [S5](https://ntrs.nasa.gov/api/citations/20160010292/downloads/20160010292.pdf)


# 19. Later Research Using SAFFIRE-II

Later work used SAFFIRE-II primarily as a **benchmark**, not simply as a historical demonstration.

### Flame-spread model validation

The SIBAL study compared a detailed transient 3D model with both large SAFFIRE-I and smaller SAFFIRE-II Sample 5. It reproduced major transient features and showed how scale and geometry alter the approach to quasi-steady spread. [S8](https://doi.org/10.1016/j.proci.2018.05.168)

### Reduced-pressure surrogate testing

PMMA and SIBAL studies used normal-gravity pressure reduction to weaken buoyant convection and compare against microgravity flight data. The method works reasonably for selected spread-rate trends but is not a complete surrogate for all thermal/soot behavior. [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S13](https://pmc.ncbi.nlm.nih.gov/articles/PMC6907022/)

### Fire-resistant fabric under realistic adjacent-flame heating

The Nomex program used a PMMA flame configuration matching SAFFIRE-II Sample 7 to quantify how external flame heating changes oxygen-limit behavior relative to lamps. [S11](https://doi.org/10.1016/j.proci.2018.05.055)

### PDMS ash-aware re-analysis

The 2022 PDMS paper and thesis reprocessed the flight imagery and linked flame extinction to ash/residue transport and heat-loss mechanisms that terrestrial Test 1 alone does not capture. [S7](https://doi.org/10.1016/j.combustflame.2022.112009) [S14](https://era.ed.ac.uk/handle/1842/39064)

### Surface-structure effects

The structured PMMA flight case motivated analysis of how grooves, thickness variations, two-sided burning, and flame radiation alter growth. These effects are sufficiently studied that GRAVIFIRE should not present "surface structure matters" as a new discovery. [S9](https://doi.org/10.1007/s10694-019-00863-3)


# 20. Model Validation History

| Model / approach | SAFFIRE-II sample | Predicted quantity | Experimental quantity | Validation result | Main limitation |
|---|---|---|---|---|---|
| 3D transient charring-solid flame-spread model | 5 (SIBAL) | growth, pyrolysis length, spread | video + thermocouples | captured major transient and quasi-steady behavior | material + geometry specific [S8](https://doi.org/10.1016/j.proci.2018.05.168) |
| Mixed-convection heat-transfer correlation | 9 (flat PMMA) | spread rate vs pressure/gravity | flame-front derived rate | extrapolation approximately predicts microgravity flight rate | cannot reproduce every soot/temperature feature [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) |
| Mixed-convection Nomex analysis | 7 concept | spread / limiting condition vs O2, pressure, heat source | ground matched configuration + flight non-propagation | predicted no flight propagation in tested condition | ground model + single flight point [S11](https://doi.org/10.1016/j.proci.2018.05.055) |
| PDMS ash / flame-spread interpretation | 1-4 | sustainment / leading-edge motion | flight image trajectories + ground data | explains failure of sustained spread qualitatively/quantitatively | ash chemistry/product formulation uncertain [S7](https://doi.org/10.1016/j.combustflame.2022.112009) |
| Empirical / geometric PMMA structure analysis | 8-9 | effect of surface structures | imagery + radiation | structured case showed easier ignition/faster growth | very small N; geometry-specific [S9](https://doi.org/10.1007/s10694-019-00863-3) |

## What is already mature enough not to reinvent

- physics-guided spread-rate extraction from flame imagery;
- mixed-convection scaling for selected PMMA/SIBAL cases;
- detailed transient SIBAL modeling;
- recognition of PDMS silica-ash effects;
- basic structured-vs-flat PMMA comparison;
- the fact that one-dimensional terrestrial screening cannot be assumed universally transferable.

A new GRAVIFIRE model should either improve uncertainty/applicability or answer a different question, not hide these established models behind an ML interface.


# 21. Machine Learning / AI Prior Art

Targeted searches covered: **machine learning, neural network, Gaussian process, Bayesian, surrogate model, uncertainty quantification, active learning, inverse design, experiment recommendation, image ML, multimodal learning**, combined with SAFFIRE-II and SAFFIRE I-III.

### Direct SAFFIRE-II ML predictor

**No direct evidence found in the searched public literature** of a supervised ML model trained on the nine SAFFIRE-II flight samples to predict material flammability.

That is unsurprising and scientifically appropriate: nine heterogeneous samples are not a credible IID training set.

### Deep-learning flame segmentation

**No direct SAFFIRE-II-specific peer-reviewed CNN/U-Net/ViT segmentation work was found** in the searched literature. Classical threshold/front extraction is well established.

### Bayesian / Gaussian-process surrogate

**No direct SAFFIRE-II-specific evidence found** in the searched literature.

### Active learning / inverse design / next experiment recommendation

**No direct SAFFIRE-II-specific evidence found**.

### Important caveat

"No evidence found" is a search result, not proof of nonexistence. More importantly, algorithmic novelty does not equal scientific novelty. A nine-row neural predictor would be less credible than a well-calibrated physics/evidence model.


# 22. SAFFIRE-I vs SAFFIRE-II

| Dimension | SAFFIRE-I | SAFFIRE-II |
|---|---|---|
| Primary objective | large-scale growth/spread | material flammability / low-g screening |
| Sample count | 2 combustion configurations in PSI table, one dominant large concurrent panel | 9 material coupons |
| Main sample scale | ~0.94 x 0.406 m SIBAL | ~0.29 x 0.05 m each |
| Materials | SIBAL | PDMS, SIBAL, Nomex+PMMA, thick PMMA |
| Flow | 20 cm/s primary | material-specific ~20-25 cm/s as flown in key summaries |
| Oxygen | near cabin air | near cabin air |
| Cameras | 2 | 2 |
| Thermocouples / radiometers | large-panel diagnostics | shared across 9-sample card; 4 radiometers |
| Main outcome | large flame growth reaches quasi-steady behavior | propagation / non-propagation, material/geometry effects |
| Main strength | realistic-scale fire | diverse near-limit material cases |
| Main weakness | almost no material diversity | sparse repetitions, smaller samples |

### What SAFFIRE-I could answer that II could not

- behavior of a meter-class flame over a large continuous panel;
- large-fire limiting flame size and confinement effects.

### What SAFFIRE-II could answer that I could not

- how multiple spacecraft-relevant material classes behave under the same mission architecture;
- whether selected Test 1 expectations transfer to long-duration microgravity;
- thickness, flow direction, external-heating, and surface-structure questions.

### Why both were necessary

SAFFIRE-I explored **scale**. SAFFIRE-II explored **material screening and heterogeneity**. Treating one as a replacement for the other destroys the scientific design.


# 23. Relationship to BASS / BASS-II Where Justified

Direct pooling is appropriate only where material, geometry, flow definition, and measured output are comparable.

### Scientifically useful overlaps

- **SIBAL:** BASS, SAFFIRE-I, and SAFFIRE-II provide a multi-scale lineage, but duct size and width strongly confound the raw comparison.
- **PMMA:** BASS-II includes extensive PMMA sheet/rod families; SAFFIRE-II adds thick, two-sided spacecraft-scale PMMA coupons. The response variables and geometries differ, so a universal PMMA model is not automatically valid.
- **Flow:** all experiments demonstrate ventilation sensitivity, but local flow fields, duct dimensions, boundary layers, and calibration differ.

### Variables that can be harmonized cautiously

- material identity and formulation;
- sample dimensions/thickness;
- physical flow velocity where calibrated;
- oxygen and pressure;
- concurrent/opposed direction;
- ignition timing/energy;
- derived flame-front position/spread rate with method metadata.

### Variables that should not be pooled directly

- BASS local N2 suppressant flow with SAFFIRE cabin ventilation;
- PMMA rod spread with thick PMMA slab spread;
- flame-length measurements from cameras with different optics/scales without calibration;
- BASS/BASS-II small-duct results with SAFFIRE large-duct results as if scale were irrelevant.

This cross-family evidence is useful primarily for **model applicability, scaling, and evidence-gap analysis**, not for a naive combined ML table.


# 24. Real Spacecraft Fire-Safety Contribution

## DIRECTLY DEMONSTRATED

- nine material configurations can be ignited/tested sequentially in an uncrewed spacecraft after ISS departure;
- PDMS ignition does not guarantee self-sustained propagation under the tested microgravity conditions;
- selected SIBAL coupons sustain propagation;
- a PMMA flame does not necessarily cause Nomex propagation at the tested condition;
- thick PMMA can sustain long concurrent burning and is strongly dependent on forced flow. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)

## SCIENTIFIC SUPPORT

- terrestrial Test 1 behavior requires material-specific microgravity validation;
- reduced-pressure ground tests can approximate selected microgravity spread trends;
- scale, duct confinement, surface structure, ash formation, and external heating can materially change flammability response. [S7](https://doi.org/10.1016/j.combustflame.2022.112009) [S8](https://doi.org/10.1016/j.proci.2018.05.168) [S10](https://doi.org/10.1016/j.combustflame.2018.10.016)

## DESIGN-RELEVANT

- material selection for exploration vehicles;
- ventilation-aware fire hazard modeling;
- realistic adjacent-fire exposure for fire-resistant materials;
- development/validation of spacecraft fire CFD and reduced-order models.

## PROPOSED IMPLICATION

- improved ground screening methods could combine pressure, forced flow, geometry, and material-specific physics rather than rely solely on upward 1g spread.

## DOCUMENTED OPERATIONAL CHANGE

This review did **not identify primary evidence that SAFFIRE-II alone directly changed a specific NASA-STD-6001 threshold, flight material certification, detector, extinguisher, or crew procedure**. Its contribution is strongly scientific and design-relevant; direct operational implementation should only be claimed when a standards or program document explicitly documents it.


# 25. Experimental Limitations

1. **Only nine flight samples.** Material breadth improved over SAFFIRE-I, but statistical replication in microgravity was minimal.
2. **One/few atmosphere states.** This was not a pressure or oxygen sweep.
3. **Sequential testing.** Cabin composition and soot/debris state can evolve between burns; time order should be preserved.
4. **Shared instrumentation.** Six thermocouples and radiometers cannot give identical local coverage for every sample.
5. **Sample-card placement.** Different rows/columns experience different geometric relationship to cameras, radiometers, duct boundaries, and upstream development.
6. **Ignition is not uniform.** PDMS, SIBAL, Nomex+PMMA, and thick PMMA use different ignition strategies and energies.
7. **No active suppression campaign.** Flow shutdown occurred, but SAFFIRE-II was not a suppressant-comparison experiment.
8. **Microgravity only.** No lunar or Martian partial-gravity axis.
9. **Limited material formulations.** One PDMS product or PMMA formulation cannot represent all silicones/acrylics.
10. **No systematic repeatability in flight.** Ground programs provide replication, but the spacecraft cases are precious single/few events.

These limitations define where models must expose uncertainty rather than extrapolate confidently.


# 26. Dataset Limitations

### Fragmentation

The scientific record is distributed across PSI file categories, NTRS presentations, journal papers, conference papers, dissertations, and later comparative studies.

### Very large image volume

Tens of gigabits and >100k frames make manual exploration difficult, but also create a false impression of large sample size. Temporally adjacent images are highly correlated.

### Missing machine-readable scientific annotations

The public literature contains event semantics such as `ignited`, `no propagation`, `burned to completion`, `flow off`, and `self-extinguished`, but these are not necessarily represented as a unified machine-readable ontology across the archive.

### Planned versus as-flown values

Sample 6 and Sample 9 flow values demonstrate why a single metadata field can be unsafe without source/version context.

### Synchronization

Scientific reuse depends on aligning camera frames with igniter, flow, thermal, radiation, and atmosphere data. File timestamps alone may not provide sufficient experimental-time semantics.

### Uncertainty

Published front extraction often uses thresholds or visually defined boundaries. Archive-wide uncertainty estimates are not standardized.

### GRAVIFIRE-solvable data problems

GRAVIFIRE can improve:

- run/file/source linkage;
- event timelines;
- planning vs as-flown provenance;
- measurement-method metadata;
- uncertainty status;
- publication-to-run linkage;
- negative-result visibility.

It cannot create missing flight repetitions or unmeasured partial gravity.


# 27. Research Gaps

| Gap category | What remains unknown | Can SAFFIRE-II alone solve it? | Additional evidence needed |
|---|---|---|---|
| Material flammability | transferability across many formulations | no | more materials / repeats |
| MOC | full low-g oxygen thresholds | mostly no | oxygen sweep + replicates |
| Scale | separation of sample width vs duct confinement vs flow profile | partly | SAFFIRE-I + BASS + models |
| Flow direction | direction effects for same material/condition | limited PDMS case only | matched repeats |
| Thickness | causal thickness curve in microgravity | limited PDMS set | repeated controlled series |
| Oxygen | material response across exploration O2 | no | enriched/reduced O2 data |
| Model | uncertainty / applicability boundaries | partly | published model predictions + more validation cases |
| CV | confidence-aware measurement | yes, potentially | calibrated frames + benchmark labels |
| Multimodal | unified timeline across sensors and imagery | yes, data-engineering problem | PSI raw streams/timebase |
| AI/ML | safe small-data prediction | weak | cross-experiment physics-aware data, not nine-row ML |
| Partial gravity | Moon/Mars | no | partial-gravity experiments/models |
| Mission decision | map evidence to actual design thresholds | no | program requirements / risk models |

### Most important conceptual gap

SAFFIRE-II shows that the problem is **not just lack of prediction**. The deeper problem is knowing **which evidence applies to which material/configuration and with what confidence**. A prediction without applicability and provenance can be more dangerous than no prediction.


# 28. DO NOT REINVENT THESE

1. **Basic NASA-STD-6001 vs microgravity motivation.** The Saffire program was created around this gap. [S2](https://ntrs.nasa.gov/citations/20170000230)
2. **PDMS ash affects propagation.** Pre-flight and post-flight work substantially analyzes silica residue. [S6](https://ntrs.nasa.gov/citations/20150022421) [S7](https://doi.org/10.1016/j.combustflame.2022.112009)
3. **All four flight PDMS samples failed to sustain propagation.** Established flight result. [S4](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)
4. **SIBAL scale affects spread behavior.** Substantially analyzed with detailed transient modeling. [S8](https://doi.org/10.1016/j.proci.2018.05.168)
5. **Structured PMMA differs from flat PMMA.** Already studied experimentally. [S9](https://doi.org/10.1007/s10694-019-00863-3)
6. **Reduced pressure can approximate selected microgravity spread trends.** Existing PMMA/SIBAL research. [S10](https://doi.org/10.1016/j.combustflame.2018.10.016) [S13](https://pmc.ncbi.nlm.nih.gov/articles/PMC6907022/)
7. **Nomex flammability depends strongly on external heat source, O2, and pressure.** Existing matched ground study. [S11](https://doi.org/10.1016/j.proci.2018.05.055)
8. **Threshold-based flame-front tracking.** Already used in the PMMA flight analysis. [S12](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/)
9. **"Use AI because there are lots of images."** Image volume is not independent physical sample volume.


# 29. Underused Data Opportunities

## 29.1 Multimodal event reconstruction

**Appears underrepresented in the literature searched.** Existing papers usually focus on one material family and a subset of diagnostics. A run-level timeline linking all sensors, frames, and procedural events could expose interactions that are otherwise hidden.

Validation: reproduce published ignition, spread, flow-off, and extinction times for Samples 5, 8, and 9.

Risk: timebase metadata may be incomplete or require engineering-file interpretation.

## 29.2 Negative-result image sequences

Samples 1-4 and 7 are scientifically valuable because they **do not** sustain the intended propagation. A dataset centered only on successful flames would systematically discard flammability-limit evidence.

Potential analysis: distinguish igniter-driven luminosity, transient material flame, ash formation, and true self-sustained spread.

## 29.3 Front-measurement uncertainty

Published PMMA methods use intensity thresholds, and the pyrolysis front can be obscured. A confidence-aware front estimator with explicit `unobservable` states could be more scientifically useful than another deterministic mask.

## 29.4 Radiometer + image fusion

Front/back radiometer asymmetry was scientifically informative in PMMA. Aligning radiation with flame geometry and flow changes could produce a reusable benchmark for model validation.

## 29.5 Planning-vs-flight metadata provenance

The sample-6 and sample-9 airflow discrepancies are ideal test cases for GRAVIFIRE's evidence-reconciliation capability.

## 29.6 Flow-visualization plus burn behavior

Pre-burn flow visualization can help explain local boundary conditions and may improve model applicability assessment, but it is often treated as ancillary engineering data.


# 30. Fire Safety Chain Placement


<div class="figure-card">
<svg viewBox="0 0 1100 250" xmlns="http://www.w3.org/2000/svg">
<rect width="1100" height="250" fill="#f7fbfd"/>
<text x="45" y="48" fill="#061626" font-size="26" font-weight="700">Fire Safety Chain placement</text>
<g font-family="Arial" font-size="14" text-anchor="middle">
<g transform="translate(40,95)"><rect width="130" height="70" rx="12" fill="#d9f0ff" stroke="#4aa3cf"/><text x="65" y="31" fill="#0b5685" font-weight="700">Ignition</text><text x="65" y="53" fill="#0b5685">DIRECT</text></g>
<g transform="translate(185,95)"><rect width="130" height="70" rx="12" fill="#e7f7ef" stroke="#70bd9f"/><text x="65" y="31" fill="#168b78" font-weight="700">Growth</text><text x="65" y="53" fill="#168b78">PARTIAL</text></g>
<g transform="translate(330,95)"><rect width="130" height="70" rx="12" fill="#dff5ec" stroke="#70bd9f"/><text x="65" y="31" fill="#168b78" font-weight="700">Spread</text><text x="65" y="53" fill="#168b78">DIRECT</text></g>
<g transform="translate(475,95)"><rect width="130" height="70" rx="12" fill="#fff1df" stroke="#e9b967"/><text x="65" y="31" fill="#8a5900" font-weight="700">Smoke</text><text x="65" y="53" fill="#8a5900">PARTIAL</text></g>
<g transform="translate(620,95)"><rect width="130" height="70" rx="12" fill="#f1f1f1" stroke="#c6c6c6"/><text x="65" y="31" fill="#555" font-weight="700">Detection</text><text x="65" y="53" fill="#555">CONTEXT</text></g>
<g transform="translate(765,95)"><rect width="130" height="70" rx="12" fill="#f1f1f1" stroke="#c6c6c6"/><text x="65" y="31" fill="#555" font-weight="700">Suppression</text><text x="65" y="53" fill="#555">NOT SUPPORTED</text></g>
<g transform="translate(910,95)"><rect width="130" height="70" rx="12" fill="#ece7fa" stroke="#a99adb"/><text x="65" y="31" fill="#5d468f" font-weight="700">Outcome</text><text x="65" y="53" fill="#5d468f">DIRECT</text></g>
</g>
<text x="45" y="215" fill="#607387" font-size="14">Outcome means propagation / self-extinguishment under tested conditions, not mission-level safety certification.</text>
</svg>
<div class="caption">Figure 4. SAFFIRE-II contributes strongly to ignition, propagation, and flammability outcome evidence. It does not directly test active suppression.</div>
</div>


| Chain stage | Support | Why |
|---|---|---|
| Ignition | **DIRECT** | all nine samples were actively ignited; ignition success/failure observable |
| Flame Growth | **PARTIAL** | thick PMMA and SIBAL growth available; not all materials develop sustained flames |
| Flame Spread | **DIRECT** | central measured/derived quantity for SIBAL/PMMA; non-propagation equally important |
| Smoke | **PARTIAL** | soot deposition and vehicle detector context exist, but SAFFIRE-II is not a dedicated aerosol characterization experiment |
| Detection | **CONTEXT ONLY** | vehicle smoke detector data exists in context, not a primary detector-science design |
| Suppression | **NOT SUPPORTED** | no suppressant comparison; flow cessation is a boundary-condition change, not a suppression campaign |
| Outcome | **DIRECT** | propagation, non-propagation, burn completion, and extinction are observed outcomes |


# 31. GRAVIFIRE Opportunity Matrix

| Opportunity | Research question | Exact SAFFIRE-II data | Prior work / unresolved part | Validation | Novelty risk | Hackathon feasibility |
|---|---|---|---|---|---|---|
| Multimodal evidence alignment | Can one timeline reconstruct physical cause/effect around ignition, spread and extinction? | camera + flow + TC + radiometer + O2/CO2/P + ignition | papers use subsets; archive-wide alignment appears underrepresented | reproduce published event times / spread trends | low-medium | high for 3-5 samples |
| Evidence DNA | Can every derived claim link to source file, frame interval, sensor and paper? | PSI metadata/files + literature | provenance is fragmented | audit 10 published claims end-to-end | low | high |
| Uncertainty-aware front measurement | How uncertain is flame position when thresholds/visibility vary? | calibrated images + benchmark sample 9 | deterministic thresholds exist; uncertainty layer weak | compare with published front traces | medium | medium-high |
| Negative-result event ontology | What distinguishes igniter glow from self-sustained material flame? | PDMS 1-4 + Nomex 7 imagery + ignition telemetry | negative cases analyzed but not unified | expert-label segments and reproduce published non-propagation outcome | low-medium | high on subset |
| Model applicability atlas | Which published model is valid for which material/flow/geometry? | samples 5,7,9 + model papers | models exist separately | reconstruct model-vs-flight cases | low | high |
| Metadata contradiction audit | Can the system expose planned vs as-flown conflicts without picking silently? | PSI + planning docs + post-flight papers | concrete flow discrepancies exist | expert-reviewed claim pairs | low | high |
| Cross-scale evidence comparison | How much of BASS/SAFFIRE-I behavior transfers to SAFFIRE-II? | SIBAL + PMMA comparable variables | prior work already shows scale effects | reproduce published scale trend first | medium-high | medium |
| Knowledge-gap map | Where is evidence direct, derived, model-only, or absent? | all 9 samples + literature | coverage maps are not same as epistemic maps | every cell source-linked | medium | high |
| Evidence-gap experiment recommendation | Which condition would best reduce evidence/model disagreement? | gap map + model applicability + uncertainty | no direct SAFFIRE-II active-learning work found | retrospective holdout | low-medium | medium |
| Generic 9-row ML predictor | Can AI predict flammability from the nine samples? | nine sample rows | scientifically inadequate data | no credible validation | high scientific risk | technically easy, **not recommended** |

### Highest-potential SAFFIRE-II-only directions

1. **Multimodal evidence alignment**
2. **Evidence DNA / provenance linking**
3. **Uncertainty-aware measurement**
4. **Negative-result event ontology**
5. **Model-applicability and discrepancy mapping**
6. **Metadata contradiction detection**

These are opportunity candidates only. The final GRAVIFIRE contribution should wait until additional experiment families are researched.


# 32. SAFFIRE-II Research Gap Map

## WELL SOLVED

- qualitative flight outcome for all nine samples;
- basic PDMS non-propagation result;
- SIBAL sample-5 scale/model comparison;
- thick PMMA spread and structure effects;
- reduced-pressure ground comparison for flat PMMA;
- Nomex response under matched external-heating concepts;
- classical image-based flame-front extraction.

## PARTIALLY SOLVED

- low-g material-screening transfer rules;
- PDMS ash-aware quantitative prediction;
- scale / confinement separation;
- local-flow effects across sample-card position;
- relationship between visual flame boundary and pyrolysis/char fronts;
- uncertainty in derived spread quantities.

## OPEN

- full microgravity MOC curves with replication;
- Moon/Mars partial-gravity material limits;
- broad formulation/material coverage;
- repository-wide multimodal synchronization with standardized provenance;
- evidence-aware model applicability;
- calibrated uncertainty propagation from sensor/frame to scientific claim.

## DATA-RICH BUT UNDEREXPLOITED

- negative-result PDMS and Nomex sequences;
- full dark/green-lit image alternation;
- radiometer + imagery fusion;
- flow visualization linked to subsequent burn response;
- sample-order / cabin-evolution context;
- planning-versus-as-flown metadata conflicts as evidence-quality cases.

## NOT SOLVABLE WITH SAFFIRE-II ALONE

- spacecraft-scale large-fire growth;
- universal material certification;
- active suppression performance;
- smoke aerosol physics and detector response in a dedicated sense;
- pressure/O2/gravity response surfaces;
- mission-level risk without vehicle/fire-system context.

## HIGH-POTENTIAL GRAVIFIRE OPPORTUNITIES

The strongest opportunities are those that turn SAFFIRE-II from a folder of heterogeneous files into a **scientifically auditable experiment graph** while preserving uncertainty and family-specific physics.


# 33. Cumulative Synthesis: BASS, BASS-II, SAFFIRE-I, SAFFIRE-II Only

| Scientific question | BASS | BASS-II | SAFFIRE-I | SAFFIRE-II | Remaining gap |
|---|---|---|---|---|---|
| Ignition | exploratory / crew-driven | systematic PMMA/fabric cases | large-panel ignition | material-specific coupon ignition | general material ignition model |
| Flame spread | thin fuels / multiple geometries | detailed PMMA + SIBAL regimes | meter-scale SIBAL | diverse medium coupons | transferable scaling law across families |
| Material effects | broad exploratory materials | stronger PMMA focus | one main model fabric | PDMS, SIBAL, Nomex, PMMA | real spacecraft material diversity |
| Airflow | low-speed forced + suppression interactions | wide subfamily ranges | vehicle-scale forced flow | 20-25 cm/s key flight cases | local flow-field / ventilation mapping |
| Oxygen | limited | expanded controlled O2 | near cabin | near cabin / MOC question | repeated O2 sweeps in relevant scale |
| Geometry | sheet/sphere/candle etc. | sheets/rods/fabric | large panel | thin sheets + thick structured slabs | unified geometry-aware transfer |
| Scale | small | small/intermediate | large | medium | separate sample vs duct-scale effects |
| Extinction | strong low-flow focus | radiative/quench/blowoff subfamilies | limited | negative PDMS/Nomex + flow-off PMMA | general extinction limits |
| Suppression | direct N2 intervention | extinction science, not same intervention | not central | not tested | modern suppressant performance |
| Large-scale fire | not vehicle scale | not vehicle scale | **direct** | medium coupons | broader materials at large scale |
| Material flammability | exploratory | physics-driven subsets | one material | **direct screening question** | replicated low-g thresholds |
| Visual evidence | video/stills | rich video/stills | large-fire two-camera | very large multimodal image set | common calibrated ontology |
| Predictive modeling | subfamily physics models | extensive subfamily models | validated large-fire models | material-specific models / analogs | uncertainty + applicability across datasets |

### The emerging pattern

Across these four experiments, the scientific frontier is not simply "more prediction." NASA already has strong physics models for selected families. The persistent difficulty is **evidence transfer**: knowing when a result from one material, geometry, scale, duct, gravity regime, or measurement method can be used for another.

That makes GRAVIFIRE's family-aware provenance principle increasingly important.


# 34. Evidence Standard and Confidence Rules

### MEASURED

Direct sensor or image observation from the flight experiment.

### DERIVED

Quantity computed from measured data, such as spread rate from front position.

### MODELED

Numerical or analytical prediction, including correlations fitted/validated against flight data.

### INTERPRETED

Scientific explanation offered by investigators, such as ash-layer inhibition or mixed-convection mechanism.

### HYPOTHESIZED

Untested or incompletely validated mechanism / extrapolation.

### Repository rules for GRAVIFIRE

1. Preserve source strings before normalization.
2. Never replace planned values with as-flown values; add a second field and provenance.
3. Never convert a single pass/fail observation into exact MOC.
4. Keep every visual measurement tied to frame range, calibration, algorithm, and uncertainty.
5. Preserve negative results as first-class evidence.
6. Do not pool material families merely because they share a high-level label such as `PMMA`.
7. Expose conflicts instead of silently resolving them.


# 35. Final Assessment for GRAVIFIRE

SAFFIRE-II is scientifically different from SAFFIRE-I. Its value comes from **material-specific near-limit experiments inside a real spacecraft environment**, not from producing the largest possible flame. It is also a textbook example of why an evidence-grounded platform is needed:

- the sample count is tiny, but the multimodal data volume is huge;
- some pre-flight metadata differs from post-flight analyses;
- successful burns and failed propagation are equally important;
- MOC language can be misused if one-shot flight conditions are converted into exact thresholds;
- classical image processing and physics models already solve several obvious tasks;
- later literature is essential for understanding what the raw flight observations mean.

The most credible GRAVIFIRE contribution using SAFFIRE-II alone would therefore be **not another generic predictor**, but a system that can align raw NASA evidence, measurements, uncertainty, model applicability, and published interpretations while making it obvious where the evidence ends.

This report intentionally does **not** select the final GRAVIFIRE research direction and does **not** research SAFFIRE-III.


# 36. Official NASA Imagery and Visual References

This PDF is kept self-contained using original GRAVIFIRE scientific schematics, while the following official NASA sources provide authoritative mission imagery for presentation or web reuse:

<div class="visual-source"><strong>NASA SAFFIRE-II post-flight summary</strong><br>Contains the composite end-of-test image of Samples 1-9 and mission operations figures.<br>[Open NASA NTRS PDF](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf)</div>

<div class="visual-source"><strong>NASA habitation / fire-safety presentation</strong><br>Contains a green-tinted SAFFIRE-II nine-sample image and the NASA summary that more than 38 Gb of image and sensor data were received.<br>[Open NASA PDF](https://www.nasa.gov/wp-content/uploads/2016/05/20170329-nacheoc-crusan-gatens-hab-eclss-v5b_tagged.pdf)</div>

<div class="visual-source"><strong>NASA Saffire overview article</strong><br>Includes official flame imagery and captions from the Saffire program, including thick PMMA examples.<br>[Open NASA page](https://www.nasa.gov/humans-in-space/the-flame-of-discovery-grows-as-saffire-sets-new-fires-in-space/)</div>

When GRAVIFIRE embeds these externally, retain the NASA credit and distinguish the exact flight/sample shown in the caption.


# 37. Bibliography and Source Index


| ID | Source | Link |
|---|---|---|
| S1 | NASA PSI-99 official investigation page | [Open](https://psi.nasa.gov/physci/repo/data/investigations/PSI-99) |
| S2 | Ruff & Urban - Operation and Development Status of the Spacecraft Fire Experiments | [Open](https://ntrs.nasa.gov/citations/20170000230) |
| S3 | NASA/NTRS - The Spacecraft Fire Experiment (Saffire): objectives, diagnostics, and sample card | [Open](https://ntrs.nasa.gov/api/citations/20170001636/downloads/20170001636.pdf) |
| S4 | NASA/NTRS - SAFFIRE-II Summary, post-flight sample outcomes and mission dates | [Open](https://ntrs.nasa.gov/api/citations/20180004258/downloads/20180004258.pdf) |
| S5 | NASA/NTRS - Large-scale Spacecraft Fire Safety Tests / sample-selection constraints | [Open](https://ntrs.nasa.gov/api/citations/20160010292/downloads/20160010292.pdf) |
| S6 | Niehaus, Ferkul, Gokoglu, Ruff - Buoyant Effects on Silicone Samples Planned for Saffire | [Open](https://ntrs.nasa.gov/citations/20150022421) |
| S7 | Rojas-Alva et al. - Flame spread behaviour of PDMS membranes in 1g and microgravity | [Open](https://doi.org/10.1016/j.combustflame.2022.112009) |
| S8 | Li et al. - Transient flame growth and spread processes over large solid fabric: model vs experiment | [Open](https://doi.org/10.1016/j.proci.2018.05.168) |
| S9 | Olson & Jomaas - Concurrent Flame Spread Over Two-Sided Thick PMMA Slabs in Microgravity | [Open](https://doi.org/10.1007/s10694-019-00863-3) |
| S10 | Thomsen et al. - Buoyancy effects on concurrent flame spread over thick PMMA | [Open](https://doi.org/10.1016/j.combustflame.2018.10.016) |
| S11 | Thomsen et al. - Concurrent flame spread over externally heated Nomex under mixed convection flow | [Open](https://doi.org/10.1016/j.proci.2018.05.055) |
| S12 | Open-access PMMA paper in PMC with detailed SAFFIRE-II camera/sensor description | [Open](https://pmc.ncbi.nlm.nih.gov/articles/PMC8862122/) |
| S13 | On Simulating Concurrent Flame Spread in Reduced Gravity by Reducing Ambient Pressure | [Open](https://pmc.ncbi.nlm.nih.gov/articles/PMC6907022/) |
| S14 | Rojas-Alva PhD - PDMS microgravity flammability and SAFFIRE-II re-analysis | [Open](https://era.ed.ac.uk/handle/1842/39064) |
| S15 | NASA habitation/fire-safety presentation - 38+ Gb mission-data summary | [Open](https://www.nasa.gov/wp-content/uploads/2016/05/20170329-nacheoc-crusan-gatens-hab-eclss-v5b_tagged.pdf) |
| S16 | NASA Aerospace Frontiers Dec 2016 - mission execution summary | [Open](https://www.nasa.gov/wp-content/uploads/2015/02/afdec2016r.pdf) |
| S17 | NASA PSI investigations by research area | [Open](https://www.nasa.gov/physical-sciences-informatics-psi/psi-investigations-by-research-area/) |
| S18 | NASA PSI Research Opportunity listing | [Open](https://science.nasa.gov/physical-sciences-informatics-psi/nasa-psi-research-opportunity/) |
| S19 | ScienceDirect record for Nomex study | [Open](https://www.sciencedirect.com/science/article/abs/pii/S1540748918300567) |
| S20 | Accepted manuscript - thick PMMA slabs in microgravity | [Open](https://www.pure.ed.ac.uk/ws/portalfiles/portal/90496130/FT_2018_Saffire_PMMA_revised_with_changes_accepted.pdf) |
| S21 | ScienceDirect record - SIBAL model versus experiment | [Open](https://www.sciencedirect.com/science/article/abs/pii/S1540748918301743) |
| S22 | NASA Saffire program article and official imagery | [Open](https://www.nasa.gov/humans-in-space/the-flame-of-discovery-grows-as-saffire-sets-new-fires-in-space/) |
| S23 | Urban et al. - Flame spread: Effects of microgravity and scale | [Open](https://doi.org/10.1016/j.combustflame.2018.10.012) |


## Search-scope note

The prior-art searches included NASA PSI, NASA NTRS, NASA Glenn, ScienceDirect, PubMed/PMC, investigator publication pages, ICES/Proceedings literature, and dissertations. Phrases such as **"No direct evidence found"** describe the result of that public search and are intentionally not phrased as proof that no unpublished or inaccessible work exists.
