# GRAVIFIRE — Developer Document v1.1 (R6 2026-10-02 → R7 2026-10-06)

For the build track (graybox gate → B1 scaffold → B2 integration → B3
completion, per `Setup docs/roadmap.md §3`). The research track is complete;
everything referenced here exists and is verified. Stack choice is decision
D8 — yours, resolved at the week-1 graybox gate —; this document fixes the
contract, not the stack.

**v1.0 → v1.1 change log** (2026-10-06, handover packaging):

- Product re-framed per the team decision of 2026-10-05: first-person game
  + Dossier, two tabs, one React app (new §3; `Setup docs/game_story_and_choices.md`).
- §2 counts corrected: 275 runs / 3,185 items = whole store; 261 / 3,176 =
  combustion runs (the citable framing). v1.0 used both framings unlabeled.
- S1 family dropdown: "16 registry families" was a count error — the store
  holds **14 family keys** (13 with combustion runs); §4 lists them.
- New §6 mission-JSON contract; §7 whitelist extended with the animation
  numbers (v1.0 listed proof-screen numbers only); §8 rules 11–15 added.
- §10 milestones re-mapped onto the vertical slice M0+M1+M4+M6 with the
  binding week-1 graybox gate. §9 demo pack unchanged.
- Everything ships from the handover bundle `Gravifier_research/R7_HANDOVER/`.
- (2026-10-06, later same day) §3 made deliberately framework-neutral per
  Elias: the developer selects the stack; the prior React/R3F
  recommendation is downgraded to documented team input.

## 1. The product in one paragraph

One user: a fire-safety engineer approving spacecraft materials. One
workflow: state the Earth assumption for a material under a mission
condition; the system returns a verdict — SUPPORTED / CONTRADICTED /
INSUFFICIENT — with confidence, an evidence list that drills down to source
file and row, and what would change the verdict. INSUFFICIENT is a
first-class answer, not an error. One extension: what NASA should test
next. The workflow is *dramatized*: you play the Fire Safety Officer of the
ISV Vesta (2038), running the archive's experiments in first person. Memory
line the UI must never contradict: *"It knows when NASA evidence is not
enough."*

## 2. What exists already (do not rebuild)

| Artifact | Path | What it is |
| -------- | ---- | ---------- |
| **Handover bundle** | `Gravifier_research/R7_HANDOVER/` | Everything below, copied + packaged for you; start here |
| L1 evidence store | `evidence_store/gravifire_l1.db` | SQLite: 275 runs (261 combustion), 3,185 evidence items (3,176 combustion), 11 sensor series, 26 image sets, 54 planned points, 7 tables |
| Data contract JSON | `evidence_store/exports/data_contract.json` | Catalog: all runs with evidence, series, image sets; standing rules; census |
| Time series | `evidence_store/series/*.csv.gz` | 11 unified streams (30.3 Hz + telemetry), epoch-ms indexed, one clock |
| Verdict engine | `verdict_engine/engine.py` | Deterministic; `Engine().evaluate(claim_dict) -> verdict JSON` |
| Verdict spec | `verdict_engine/verdict_spec.md` (FROZEN v1.1) | Semantics: claim grammar, verdict rules, confidence, conflicts, refusal |
| Scenario spec | `verdict_engine/scenario_input_spec.md` | D6: scenario JSON → claim mapping, response rendering contract |
| Seed verdicts | `verdict_engine/outputs/seed_verdicts.json` | 18 evaluated claims with evidence lists (demo-ready) |
| Validation numbers | `verdict_engine/R4_VALIDATION_REPORT.md` + `outputs/r4_*.json` | The only numbers proof screens may cite |
| Numbers whitelist | `R7_HANDOVER/numbers_whitelist.json` | Machine-readable: every renderable number with its exact source path |
| Mission payloads | `R7_HANDOVER/missions/` | `mission_schema.md` + `M1.json` (gold standard — copy its shape) |
| Dossier imagery | `R7_HANDOVER/assets/dossier_frames/` | Selected anchor frames + provenance manifest |
| Campaign design | `Setup docs/game_story_and_choices.md` + `material_catalog_and_experiment_game.md` | Missions M0–M6, choice→outcome mapping, honesty contract |

## 3. Architecture — two tabs, one web-delivered app (team decision 2026-10-05; stack = developer's choice, D8)

**Stack is decision D8 and is deliberately open: nothing in this repo
prescribes a framework, engine, or language. The developer selects at the
week-1 graybox gate.** The team's prior lean (input, not a constraint —
`game_story_and_choices.md` §9): React Three Fiber + drei + rapier, with
Babylon.js as fallback and Unity/Godot web export ruled out. If that lean
wins: Pointer Lock + WASD character controller, the "weapon" raycast as the
igniter/measurement probe — full FPS feel, zero combat. Free CC0 assets
either way: Kenney space-station kits, Quaternius, Poly Haven HDRIs,
ambientCG.

Constraints any stack choice must satisfy (this IS the contract):

- Web-delivered, runs in the judges' browsers; fully static hosting on a
  host of the developer's choice; MIT license.
- One app, two tabs, shared state store — not two sites.
- All verdict data precomputed static JSON — no backend, no runtime API.
- Perf budget: the judges' browsers, not the dev GPU — one reusable
  interior kit, baked lighting, ≤2 realtime lights, low-poly throughout,
  <15–20 MB initial load, lazy-load per mission.

- **TAB A — The Game** (main feature): first-person. Certification Queue
  dashboard = the hub (material select, mission state). Each mission runs
  the same 9-beat template (§4) in the Lab. NPCs render as holograms on
  monitors (dodges humanoid animation — the hardest amateur problem,
  whatever the engine).
- **TAB B — The Dossier** (always reachable, never gated, code-split):
  the credible artifact for judges. Contains the base findings in full —
  verdict table, evidence map, hold-out replay, next-experiment ranking,
  proof numbers — plus the player's personal layers after campaign play
  (logged gaps, predictions vs archive answers, door log). A judge who
  never plays gets everything in one click.

Content is data: every mission is a JSON payload (dialogue, choices,
configs, precomputed verdicts) over one Lab template. Mission count is
cheap; bespoke geometry is not. Do not build six custom levels.

## 4. Screen specs (S1–S7, mapped to the game beats)

The S1–S7 contract is unchanged; the game is where these screens *live*
now. Mapping:

| Spec | Where it lives in the game |
| ---- | -------------------------- |
| S1 Scenario input | The **CONFIGURE** beat: same D6 fields as physical in-world controls (family dropdown → material bay, flow slider → valve, direction → toggle, O₂ → mixer, duct → chamber door) |
| S2 Verdict banner | The **verdict card** after each run |
| S3 Evidence drill-down | Drill-down from the verdict card (file#row, clickable) — demo beat 6, the payoff |
| S4 Refusal card | The **dark-chamber render** for INSUFFICIENT: named missing test, "log the gap" button. Never an error, never empty |
| S5 What would change it | Always-visible section of the verdict card |
| S6 Next-experiment stub | The finale memo + the Dossier's next-experiment section (three ranked cards from R5 §6) |
| S7 Proof screen | The **Trust Room** (in-game) and the Dossier's proof section — validation numbers, §7 values only |

**S1 — Scenario input.** Fields per D6: material family (dropdown, the 14
registry family keys: `candle, housekeeping, nomex_blend, pdms_silicone,
pmma_nomex, pmma_rod, pmma_slab, pmma_sphere, pmma_thick, sibal_fabric,
spherical_section, thin_pmma_film, ultem_sheet, wax_slab` — 13 with
combustion runs; `housekeeping` has 0 runs), geometry, ventilation
direction + flow (slider, cm/s), cabin O₂ (%), duct (small/large), Earth
basis (selector: STD_TEST / MEASURED_GROUND / LITERATURE + text). No
expected-outcome field — the player states the Earth assumption in the
PREDICT beat; the archive answers. Partial-gravity options are absent by
design. The catalog's 7 archive material classes + 17 §2 alternatives map
onto these family keys via the class-transfer table
(`material_catalog_and_experiment_game.md` §2).

**S2 — Verdict banner.** SUPPORTED (green) / CONTRADICTED (red) /
INSUFFICIENT (amber). Confidence chip HIGH/MODERATE/LOW + four dimension
bars (directness, consistency, precision, class strength — values from
engine output `confidence_dimensions`). Grade badge (EXACT/BOUND/...) when
present.

**S3 — Evidence drill-down.** One row per evidence item: role badge
(CONFIRM / CONTRADICT / LITERATURE / CONTEXT), run_id, item, value_raw,
class, flags (render `DISPLAY_NOT_CALIBRATED`, `TEXT_MINED`,
`PUBLISHED_VALUE`... as readable chips), source (`file#row`, clickable).
This is demo beat 6 — make it feel like the payoff.

**S4 — Refusal card.** For INSUFFICIENT: the missing-evidence statement,
nearest tested domain, and what-would-change-it. Never render as error or
empty state. Copy tone: "No NASA evidence exists for this condition" +
the named test.

**S5 — What would change it.** Always visible on the verdict screen, not
behind a tooltip.

**S6 — Next-experiment stub.** Three ranked cards from R5 §6 (PDMS @
>22.5% O₂, thick PMMA @ >22.5%, SIBAL opposed large-duct), each with its
information-gap rationale. Static content — fine for v1.

**S7 — Proof screen.** Validation numbers, exactly these, exactly these
values (see §7). Nothing else numeric.

## 5. Engine integration

The engine is deterministic Python over frozen inputs, so "live" happens at
**build time, not runtime**: the app ships static verdict JSON regenerated
by `run_r3.py`. No backend, no API risk, no engine port. If an LLM powers
EMBER, it is never called from the browser with a public key — serverless
wrapper or pre-cached lines at build time.

Call shape (build-time / verification):

```python
from engine import Engine
verdict = Engine().evaluate(claim)   # claim per verdict_spec §1
```

Response JSON: `verdict`, `confidence`, `grade`, `evidence[]`,
`conflicts_considered[]`, `missing_evidence[]`, `what_would_change_it[]`,
`nearest_domain`, `refusal`, `confidence_dimensions`, `rule_trace[]`.
Render these fields verbatim — see §8 rules. The scenario→claim mapping is
deterministic (D6 spec); the predicate comes from the labeled Earth-basis
selector, never inferred.

## 6. Mission-JSON contract

Full schema: `R7_HANDOVER/missions/mission_schema.md`. Gold standard:
`R7_HANDOVER/missions/M1.json` — build every other mission by copying its
shape. Rules:

- One payload per mission: header (id, act, title, claims[]), environment
  config, `beats[]` in template order (insertion, predict, run_1g,
  configure, run_ug, decide, verdict_card, field_manual), dialogue lines
  (EMBER / OKAFOR / SYSTEM), choices with three-layer consequences
  (animation, evidence-alignment feedback, narrative), configure branches
  keyed to `tc_id` with render state (EXACT / BOUND / INSUFFICIENT /
  CONTRADICTED / REFUSAL).
- Every numeric literal in a payload carries a `whitelist_key` resolving in
  `numbers_whitelist.json`. No inline numbers without keys (§8 rule 15).
- Verdict payloads embed the engine output verbatim from
  `seed_verdicts.json` (or regenerated output) — never retyped.
- Vertical slice: **M0 + M1 + M4 + M6** (incident → trust → twist → refusal
  ending). M2/M3/M5 slot in later as payload data only.

## 7. Numbers the UI may render (complete list)

Machine-readable twin: `R7_HANDOVER/numbers_whitelist.json`. Proof screens
cite §7.1 only. Mission animations may also use §7.2. Nothing else numeric,
ever.

**7.1 Proof-screen numbers (v1.0 list, unchanged)**

| Number | Source artifact |
| ------ | --------------- |
| S5 anchor: 2.18 mm/s measured vs 2.1 published (+4.0%) | `r4_tier1_anchors.json` |
| S6 anchor: 2.64 vs 2.6 (+1.6%) | `r4_tier1_anchors.json` |
| Provenance: 10 claims audited — 6 FULL / 4 PARTIAL / 0 FAIL | `r4_tier3_provenance.json` |
| Blind hold-out: 0/5 false-SUPPORTED; 1/1 transferable agreement; 4/4 correct refusals | `r4_tier2_holdout.json` |
| Store: 261 combustion runs; 19 family cells; 3,176 evidence items; 19/19 build checks | `R2_CENSUS.md`, `r2_exit_checks.txt` |
| One clock: 30.3 Hz, zero epoch drift, 100% frames in-window | `R1_FINDINGS.md` Q1/Q2 |
| Verdict mix over 18 seed claims: 4 / 5 / 9 | `seed_verdicts.json` |

**7.2 Mission-animation numbers (new in v1.1)**

| Number | Render as | Source (exact path) | Label on screen |
| ------ | --------- | ------------------- | --------------- |
| SIBAL S1 burn 420 s | "420 s" | `seed_verdicts.json` TC-SIBAL-LG-01 / TC-SAF1-S1-01 evidence `burn_time` (PSI-98 table #row2) | measured, as-flown |
| SIBAL S2 opposed extinction 70 s | "70 s" (vs 420 s) | `seed_verdicts.json` TC-SAF1-S2-01 evidence `burn_time` (PSI-98 #row3) | measured, as-flown |
| S5 sustained window end 142.7 s | "142.7 s" | `r4_tier1_anchors.json` `S5.burn_window_s[1]` | imagery-derived window |
| S5 rates 2.03 / 2.18 / 1.83 mm/s (−3.1 / +4.0 / −12.8 %) | per fit | `r4_tier1_anchors.json` `S5.rate_traverse_mm_s / rate_descent_fit_mm_s / rate_absolute_mm_s` | traverse-calibrated / descent-fit / absolute-scale |
| S6 rates 2.25 / 2.64 / 2.09 mm/s (−13.6 / +1.6 / −19.6 %) | per fit | `r4_tier1_anchors.json` `S6.*` (same fields) | same three labels |
| Published rates 2.1 / 2.6 mm/s; burn length 29 cm | "2.1", "2.6", "29 cm" | `seed_verdicts.json` `ug_spread_rate_published`, `ug_burn_length` (PSI-99 #row6/#row7) | published value (flagged source defect, INTERPRETED) |
| SAFFIRE-I S1 rate 1.96 mm/s (+12.3%) | "1.96 mm/s" | `r4_tier1_anchors.json` `SAFFIRE1-S1.rate_mm_s` | scale inferred (flame-sheet = fabric width; ROI PDF dead) |
| PDMS flame episodes 12.66 / 12.72 / 0.45 / 9.47 s | "episodes 0.5–12.7 s" or per-coupon | `r4_tier1_anchors.json` `PDMS[].longest_sustained_flame_s` | imagery-detected, per coupon S1C2/S2C2/S3C2/S4C1 |
| PDMS max extents 13.0 / 15.3 / 2.2 / 2.4 cm | per coupon | `r4_tier1_anchors.json` `PDMS[].max_flame_extent_cm` | imagery-derived |
| Thick-PMMA creep 0.01–0.04 mm/s | "0.01–0.04 mm/s" | `literature_register.json` `pmma_thick.finding` (Olson & Jomaas 2019) | **LITERATURE** — never render as measured |
| Thick-PMMA burn length 10 cm of 29 cm | "10 of 29 cm" | `seed_verdicts.json` TC-PMMA-THICK-01 evidence `burn_length` (S8) | measured, two runs, one condition |
| O₂ boundary 22.5% | ">22.5% O₂ — above tested range" | `R5_FINDINGS_DIGEST.md` scope statement; refusal semantics in verdict spec | policy boundary, not a measurement |
| Anchor counts (9600 / 14388 frames, etc.) | only in Dossier imagery captions | `r4_tier1_anchors.json` `frames` fields | census |

**Render rules (binding):**

- "~13 s" is banned as a bare number — it is a prose rounding. Render
  "12.7 s" or "episodes 0.5–12.7 s" from the anchors fields.
- 22.5% O₂ is the archive's tested-range boundary — always rendered as a
  boundary statement, never as a measured threshold.
- Calibration label travels with every rate (traverse / descent-fit /
  absolute-scale / literature / published).
- Any number not in §7.1/§7.2 or the whitelist JSON does not render. File a
  whitelist addition request instead (Elias verifies against the store).

## 8. Hard rules (from CLAUDE.md, R3 spec, R5 §7, catalog §4.4 — binding on the UI and the game)

1. **No fake numbers.** The UI renders only values present in engine
   output or store rows. No client-side computation, conversion, rounding
   beyond display, or averaging. Ever.
2. **Provenance everywhere.** Every number on screen resolves to file#row
   via the drill-down. No orphan numbers.
3. **Display ≠ calibrated.** Fan/air display values never render as
   velocity; the DISPLAY_NOT_CALIBRATED chip renders when the flag is set.
4. **BOUND ≠ MOC.** Threshold-like results render with their grade badge;
   never "safe/unsafe" language, never certification phrasing.
5. **Refusal is first-class** (S4 semantics).
6. **Planned ≠ as-flown.** If both exist, show both, labeled.
7. **No novelty overclaims.** "No evidence found" phrasing only, anywhere
   prior art is mentioned.
8. **Calibration labels on rates**: traverse vs absolute-scale, always.
9. **SoFIE and partial gravity**: literature-only / refused; never
   rendered as analyzed data.
10. **PDMS ignition** phrasing: "ignited (per telemetry), then stalled."
11. **No fabricated physics.** Untested condition-cells render the refusal
    (dark chamber, named missing test) — the refusal animation *is*
    content, not a failure state.
12. **Flame morphology.** μg flames: spherical, blue, dimmer; smoke blobs,
    no buoyant plumes. 1-g: teardrop, yellow. Every flame behavior traces
    to a run_id.
13. **EMBER constraints.** Grounded over the L1 store + literature register
    only; may explain, never override a verdict, never generate a number;
    cites run_ids on request; text-only, never voice; fallback scripted
    line bank so the companion can never take the game down.
14. **Refusals are non-overridable** — >22.5% O₂ and partial gravity — by
    the player or the AI alike.
15. **Payload numbers carry whitelist keys.** Every numeric literal in a
    mission JSON references `numbers_whitelist.json`; no orphan literals.

## 9. Demo scenario pack (build these four first)

| Scenario | Claim | Expected output |
| -------- | ----- | --------------- |
| SC-DEMO-1 SIBAL sheet, concurrent 20 cm/s, 21.5%, large | TC-SIBAL-LG-01 | SUPPORTED / HIGH (the wow) |
| SC-DEMO-2 PDMS sheet, concurrent 20, ~22%, large | TC-PDMS-01 | CONTRADICTED / MODERATE |
| SC-DEMO-3 PDMS sheet, concurrent 20, 30% O₂, large | TC-PDMS-03 | INSUFFICIENT — refusal card |
| SC-DEMO-4 Nomex adjacent to PMMA, large | TC-NOMEX-01 | CONTRADICTED / MODERATE |

Full outputs already computed in `seed_verdicts.json` — B1 can scaffold
against them as interim data, clearly labeled.

**Vertical slice (the shipped game if nothing else lands):**

| Mission | Story role | Claims consumed |
| ------- | ---------- | --------------- |
| M0 "Two Seconds of Smoke" | hook, tutorial, motive | none rendered (the point) |
| M1 "The Standard" | teach the loop; archive earns trust | TC-SIBAL-LG-01, TC-SAF1-S1-01, TC-SAF1-S2-01, TC-SIBAL-SCALE-01, TC-BASS-SIBAL-01 |
| M4 "The Gasket Paradox" | the CONTRADICTED headline twist | TC-PDMS-01, TC-PDMS-02 |
| M6 "The Aegis List & The Locked Door" | refusal ending, Dossier export | TC-PARTIAL-G-01, TC-EXPLORATION-O2-01 + catalog §2 alternatives |

M2 (PMMA-thick), M3 (wax/suppression), M5 (Nomex + Blind Test) slot in as
payload data after the slice.

## 10. Milestone mapping

- **Week-1 graybox gate (binding, before B1 commitment):** one corridor
  proving walk → aim → ignite → verdict card. If this loop takes more than
  one week, fall back to fixed interaction points — recorded gate decision,
  pre-agreed. D8 resolves here.
- **B1 (scaffold):** React app shell, two tabs, Certification Queue, one
  mission (M1) over the Lab template reading precomputed JSON, verdict
  cards (S2–S5 shapes), static Dossier tab. Labeled "engine output
  (precomputed)".
- **B2 (integration):** all vertical-slice payloads wired; evidence
  drill-down wired to store rows via the bundled JSON; refusal paths
  (dark chamber, locked door); EMBER text panel with fallback line bank;
  Dossier personal layers.
- **B3 (completion):** Trust Room / proof screen with §7.1 numbers; Blind
  Test mini-game (hash-stamped hold-out replay); Free Survey; Aegis
  Dossier export; freeze for V2 video reshoot on the real system.

Scope guard (catalog §5, binding): if the critical path is threatened, cut
mission breadth or Free Survey polish — never the honesty contract (§8
rules 11–15).

## 11. Acceptance

This document is ready for developer acceptance (B0 onboarding pending).
Gate verdict logged in `Setup docs/decision_gate.md`. Changes to semantics
go through the frozen spec's amendment rule — never edit the engine or
spec silently.

**B0 onboarding checklist** (half a day, with Elias):

1. Walk §2 — what exists, do not rebuild; skim `R7_HANDOVER/README.md`.
2. Run `run_r3.py` once live (expect 18/18 concordance) and
   `r5_exit_checks.py` (expect 26/26) — see the pipeline is deterministic.
3. Play the four SC-DEMO scenarios against `seed_verdicts.json`.
4. Agree the mission-JSON schema against `M1.json` (gold standard).
5. Schedule D8 + the graybox gate (one week from B0).
