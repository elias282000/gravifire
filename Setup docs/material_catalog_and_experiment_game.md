# GRAVIFIRE — Material Catalog & First-Person Experiment Simulation

**Status:** design draft v0.1 (2026-10-04). Adds a scope decision on top of the
developer document v1.0 (`Gravifier_research/R6_TRANSLATION/DEVELOPER_DOCUMENT.md`)
— needs a decision-gate verdict before it enters the build track. Everything in
§1 comes from the L1 evidence store (`evidence_store/gravifire_l1.db`, 261
combustion runs); §2 materials are real spacecraft-cabin materials **outside**
the archive — that absence is the point (see §4.3).

---

## 1. Archive materials — what NASA actually burned

### 1.1 Sorted by material type (chemistry)

| # | Material class | Chemistry type | Geometries | Runs | Studies |
|---|----------------|----------------|------------|------|---------|
| 1 | PMMA (acrylic) | thermoplastic | slab, rod, thin film, sphere, thick slab | **176** (67%) | BASS, BASS-II, SAFFIRE-II |
| 2 | SIBAL fabric | cotton–fiberglass composite | small sheet + large fabric | **43** | all four |
| 3 | Wax | melting hydrocarbon fuel | slab, candle | **24** | BASS, BASS-II |
| 4 | Nomex (aramid) | thermoset | blend sheet, PMMA-composite sheet | **10** | BASS, BASS-II, SAFFIRE-II |
| 5 | PDMS (silicone) | elastomer | sheet coupon | **4** | SAFFIRE-II |
| 6 | Ultem (polyetherimide) | thermoset | sheet | **2** | BASS |
| 7 | Curved section | spherical variant | curved section | **2** | BASS-II |

### 1.2 Sorted by other parameters

- **Fuel thickness** (key fire-science divider): *thermally thin* — SIBAL
  fabric, thin PMMA films, PMMA-Nomex sheet; *thermally thick* — PMMA
  slab/rod/sphere/thick, PDMS, wax, Ultem, Nomex.
- **Test scale:** *large duct* (Cygnus) — 11 runs (SIBAL, PDMS, thick PMMA,
  PMMA-Nomex); *small duct* (MSG) — 250 runs. 96% of the archive is
  small-scale — the asymmetry the epistemic grid makes visible.
- **Flow direction** (where recorded): concurrent — SAFFIRE-I S1, SAFFIRE-II
  S5/S6, PDMS ×3, thick PMMA ×2; opposed — SAFFIRE-I S2, PDMS ×1. BASS and
  BASS-II vary flow *within* a single burn (one sample, many flow changes) —
  direction is not a per-run parameter there.
- **Microgravity behavior** (the finding each supports): sustained propagation
  (SIBAL, large duct, concurrent, ~2.1–2.6 mm/s); ignites-then-stalls (PDMS,
  4/4); anchored non-spreading regression (thick PMMA, 0.01–0.04 mm/s); never
  ignited cascade target (Nomex in S7 composite); quench/blowoff boundaries
  (PMMA rods and thin films at low flow); protocol-confounded (wax).

---

## 2. Alternative materials — same classes, real spacecraft cabin materials, no μg archive

These populate the game's "what if" space. Every one of them shares a class
with an archive family, so the engine can at best return a **BOUND** verdict
(nearest tested domain); none has run-level microgravity evidence in the four
investigations. In-game, trying them is how a player *discovers* the evidence
boundary. Earth-side notes are qualitative, deliberately.

| Material | Class (→ nearest archive family) | Typical spacecraft use | Earth 1-g flammability character | μg evidence status |
|----------|----------------------------------|-----------------------|----------------------------------|--------------------|
| Polyethylene (ULD/HDPE) | thermoplastic (→ pmma families) | bags, containers, packaging | easily ignited; melts and flows | none — INSUFFICIENT |
| Polypropylene | thermoplastic (→ pmma) | containers, clothing blends | readily burning; drips | none — INSUFFICIENT |
| Nylon | thermoplastic (→ pmma) | straps, fasteners, fabric blends | melts and drips; variable | none — INSUFFICIENT |
| Polycarbonate (Lexan) | thermoplastic (→ pmma) | windows, helmets, panels | chars; melts/drips | none — INSUFFICIENT |
| ABS | thermoplastic (→ pmma) | 3D-printed parts (ISS printers!) | readily burning | none — INSUFFICIENT |
| PEEK | thermoplastic (→ pmma_thick) | high-temp structural parts | very flame resistant | none — INSUFFICIENT |
| PTFE (Teflon) | fluoropolymer (→ pmma families) | wire insulation | extremely flame resistant | none — INSUFFICIENT |
| Kapton (polyimide film) | polyimide (→ ultem_sheet) | wire insulation, films | O₂-sensitive film | none — INSUFFICIENT |
| Crew clothing (cotton/poly blend) | cellulosic fabric (→ sibal_fabric) | what astronauts wear daily | flammable; documented NASA concern | none — INSUFFICIENT |
| Beta cloth (glass fabric) | glass fabric (→ sibal_fabric) | garments, cargo, thermal | inherently flame-resistant weave | none — INSUFFICIENT |
| Kevlar / Vectran | aramid (→ nomex_blend) | straps, cargo bags | chars, high resistance | none — INSUFFICIENT |
| RTV silicone | elastomer (→ pdms_silicone) | coatings, seals | relatively FR — **same polymer family as the archive's surprise** | none — INSUFFICIENT |
| Viton (fluoroelastomer) | elastomer (→ pdms_silicone) | O-rings, seals | more FR than hydrocarbon rubbers | none — INSUFFICIENT |
| EPDM | elastomer (→ pdms_silicone) | gaskets, mats | relatively FR rubber | none — INSUFFICIENT |
| Urethane foam | elastomer foam (→ thin fuels) | padding, sleep pads | highly flammable bulk fuel | none — INSUFFICIENT |
| CFRP / epoxy composite | thermoset composite (→ nomex_blend) | structural panels, seats | resin burns, laminate chars/delaminates | none — INSUFFICIENT |
| Phenolic | thermoset (→ nomex_blend) | panels, ablative liners | strong char former | none — INSUFFICIENT |

Rules for this table: "none — INSUFFICIENT" means no run-level evidence in the
four-investigation archive (BASS, BASS-II, SAFFIRE-I, SAFFIRE-II) — phrasing
"no evidence found", never "never tested anywhere." Earth character notes are
qualitative only; no numeric flammability parameters may be displayed in-game
without a citable source in the store.

---

## 3. Parameter axes for experiments

| Axis | Archive tested range (approx.) | Game range | Outside tested range |
|------|-------------------------------|------------|----------------------|
| Material family | 7 archive families | all 7 + §2 alternatives | → refusal reveal |
| Geometry | sheet, slab, rod, sphere, film, candle, curved | same set | BOUND at best |
| Fuel thickness | thin films → thick slabs (per-run dims in store) | slider thin→thick | BOUND at best |
| Ventilation flow | low → ~20 cm/s anchors (exact per-run values in store) | 0–50 cm/s slider | → refusal reveal |
| Flow direction | concurrent, opposed, in-run varied (BASS) | toggle + live fan control | — |
| Cabin O₂ | tested up to ≈22.5% | 16–30%+ slider | **>22.5% = hard refusal** (exploration-atmosphere boundary) |
| Pressure | ~1 atm (+ measured per-run values for BASS) | reduced ↔ 1 atm | BOUND at best |
| Duct scale | small (MSG) / large (Cygnus) | both, side-by-side | small→large transfer = refusal for opposed low flow |
| Ignition source | hot wire / radiative per protocol | preset per apparatus | — |
| Gravity | 1-g ground tests + μg flights | 1-g lab ↔ μg station | **partial-g = refusal, non-overridable** |

---

## 4. The first-person experiment game ("GRAVIFIRE Lab")

### 4.1 Positioning (what keeps this on-strategy)

Not a physics sandbox and not a flame toy. The game is the **explore mode in
first-person form**: the player *is* the fire-safety engineer from the video
script, running experiments whose outcomes are rendered from the real research
data. The one mechanic no other fire game has: **when the player configures a
condition NASA never flew, the μg chamber refuses to fabricate an answer** —
and that refusal is the reward, not a failure state. The memory line
("It knows when NASA evidence is not enough") becomes something the player
experiences.

### 4.2 Environments

1. **Earth Lab (1-g)** — Test-1-style burn rig; ground behavior rendered from
   the scenario's stated Earth basis.
2. **Cygnus Large Duct (μg)** — SAFFIRE-style: large fabric samples, fixed
   concurrent/opposed flow, long-duration burns.
3. **MSG Small Duct (μg)** — BASS-style: small samples, **live fan control
   during the burn** (teaches the real BASS protocol — flow varies within a
   run, N₂ jets can enhance the flame: demo D8, playable).
4. **The Door That Doesn't Open Yet** — exploration-atmosphere room (>22.5% O₂,
   partial-g). Permanently locked; the door names the missing flight test.
   This room is the ending of the game.

### 4.3 Core loop

1. **Select** material — archive family or §2 alternative.
2. **Configure** parameters (§3 axes).
3. **Predict** — player states the expected μg outcome (the Earth assumption).
4. **Run 1-g** — Earth lab renders the ground behavior.
5. **Run μg** — station chamber renders per §4.4 rules.
6. **Compare** — side-by-side replay; verdict card lands
   (SUPPORTED / CONTRADICTED / INSUFFICIENT) with confidence chips and
   evidence drill-down to file#row, exactly the S2–S5 contract.
7. **Log** — outcome enters the player's own epistemic grid; badges per §4.5.

### 4.4 Outcome rendering rules (the honesty contract — binding)

| Engine state | Game render | Data source |
|--------------|-------------|-------------|
| EXACT match | Full animation; flame-front motion at measured rates; calibration label on screen | L1 runs + anchor imagery-derived values |
| BOUND | Animation with caveat banner "nearest tested domain: …" + which axes differ | engine `nearest_domain`, `grade` |
| INSUFFICIENT / refusal | Apparagus runs, ignition occurs or not per Earth data, then the μg view shows the **no-evidence state**: dark chamber, named missing test, "log the gap" | engine `missing_evidence`, `what_would_change_it` |
| CONTRADICTED | Split-screen Earth-full-burn vs μg-stall (PDMS), or cascade target that never ignites (Nomex) | verdict + run evidence items |

Hard rules: no numeric value may appear on screen unless it comes from engine
output; no fabricated physics for untested cells — the refusal animation *is*
the content; every flame behavior traceable to a run_id; AI narration (per the
AI-driven directive) may explain but never override a verdict or generate
numbers.

### 4.5 Gamification — score evidence quality, not fire size

- **Gap Collector** — discover the untested condition-cells; the epistemic
  grid (70 lit cells) becomes the game map; six named gaps = six "artifacts."
- **Assumption Breaker** — trigger the CONTRADICTED outcomes (PDMS flip,
  Nomex cascade, opposed-flow extinction).
- **Honest Analyst** — correctly predict *insufficiency* before running; the
  game teaches calibrated trust, not pyromania.
- **The Blind Test** — mini-game replay of the SAFFIRE-II hold-out: conceal,
  call your five, reveal against the hash stamp (0/5 false-SUPPORTED as the
  par score).
- **Trust Room** — the validation vault: anchors ±4%, provenance audit,
  playable drill-down (S7 proof screen, embodied).

### 4.6 Element → research artifact mapping

| Game element | Feeds from |
|--------------|-----------|
| Material picker | family registry + §2 table |
| Parameter sliders | §3 axes; per-run values from L1 store |
| Verdict cards | `verdict_engine/engine.py` live output |
| Flame animations | anchor frame sets + measured/derived rates (labeled) |
| Telemetry gauges | `series/*.csv.gz` sensor streams (the one-clock data, D9) |
| Gap map | `R5_DIGEST_DATA.json` epistemic grid |
| Trust Room | R4 validation artifacts |
| AI guide / mission controller | grounded generation over L1 store + literature register |

---

## 5. Scope

**MVP (fits B2–B3):** Earth Lab + one μg chamber, the 4 verdict-carrying
archive materials + 3 alternatives, 4 parameter axes (material, flow,
direction, O₂), verdict cards + refusal reveal + one badge track. 2.5D canvas
rendering is acceptable.

**Full:** three environments, live fan control, the locked door, Blind Test
mini-game, full §2 table, Three.js/WebGL in the React app (D8-dependent),
data-driven flame-front animation (spread rate → front position over time on a
mesh; luminous intensity from imagery-derived values).

**Scope guard:** the game must never displace B3 completion or the video
(V2). If the critical path is threatened, cut game breadth, never the honesty
contract (§4.4).

---

## 6. Standing rules carried into this doc

1. No overclaims; "no evidence found" phrasing everywhere; the locked door
   says "no NASA evidence exists," not "impossible."
2. No safe/unsafe classifications; verdicts are evidence states.
3. Partial gravity and >22.5% O₂ refusals are non-overridable — by the player
   or the AI.
4. Every displayed number carries source and calibration label.
5. This document adds scope: log a gate verdict (recommend **FOCUS** — it
   strengthens the explore mode into an embodied story, provided §4.4 holds)
   and update the developer document if accepted.
