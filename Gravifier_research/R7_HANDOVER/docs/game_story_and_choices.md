# GRAVIFIRE — Story Campaign & Choice Design

**Status:** design draft v0.1 (2026-10-05). This is the narrative layer on top
of `material_catalog_and_experiment_game.md` v0.1 (the Lab, environments,
honesty contract) and `R5_FINDINGS_DIGEST.md` (every verdict, rate, and gap
used below is real). **Binding rules inherited:** catalog §4.4 outcome
rendering (EXACT / BOUND / INSUFFICIENT / CONTRADICTED) and R5 §7 guardrails
(no safe/unsafe language, no certification language, refusals non-overridable,
every number labeled, "no evidence found" phrasing).

Form factor (team decision, 2026-10-05): full first-person game (free
movement, aiming/interaction, physics), web-delivered. AI companion EMBER is
text-only, grounded, never adjudicates.

---

## 1. Premise

**Year 2038.** The crewed transport **ISV Vesta** is carrying the first Mars
surface habitat — **Aegis-1** — in its cargo bay, months from arrival. The
ship flies in microgravity the whole way; that is the entire point.

You are the newly posted **Fire Safety Officer (FSO)**. On your first night,
a ventilator fault presses a crew garment against a heater panel and it
smolders. No flame establishes. Nobody is hurt. But the near-miss triggers
what nobody wanted: **a full material recertification of the Aegis manifest
before arrival**, run against the only trustworthy knowledge that exists —
the archive of NASA's real flown combustion experiments (BASS, BASS-II,
SAFFIRE-I, SAFFIRE-II). The Vesta's test deck is a descendant of that exact
hardware: an Earth-sim lab, a Cygnus-class large duct, an MSG-class small
duct — and one door that does not open.

The dramatic engine: **intuition versus evidence, under schedule pressure.**
Chief Engineer Ada Okafor is not a villain; she is the voice of the 1-g
rating sheet — "these materials were stamped on the ground." Every mission
is one material's verdict, and the player's choices are operational calls
that the archive answers — or honestly refuses to.

The acts ARE the verdict states:

- **Act I — What We Know** (SUPPORTED): the archive earns your trust.
- **Act II — What We Got Wrong** (CONTRADICTED): intuition breaks, in both
  directions.
- **Act III — The Edge of the Map** (INSUFFICIENT): the refusals become the
  story, and the game ends at a locked door.

## 2. Cast (deliberately small)

| Character | Role | Voice |
|---|---|---|
| **You (FSO)** | Player. Authority over the manifest; no authority over physics. | first-person, silent-protagonist choices |
| **EMBER** | *Evidence-based Microgravity Emergency Reference* — the ship's materials & fire-safety AI. Unlocks the Archive, runs the Lab, talks in text. Cites run IDs. Refuses to speculate — as a personality trait. | text panel only |
| **Chief Engineer Ada Okafor** | Foil → ally. Trusts ground ratings, fights the schedule cost. Her arc mirrors the audience's learning. | voiced/text dialogue |
| **Mission Control ("the Ground")** | Off-screen authority that ordered recertification. Relayed by EMBER. | text only |

## 3. Structure & flow (dashboard-first, as decided)

```text
Title → 90s cold-open cinematic (the near-miss)
      → DASHBOARD: "Certification Queue" (material select — SIBAL flagged PRIORITY-1)
      → select material → MISSION (in the Lab, first-person)
      → verdict card(s) → Field Manual unlock → back to DASHBOARD
      → queue advances; Okafor/EMBER reaction beat
      → ... until queue clears ...
      → FINALE (The Aegis List & The Locked Door) unlocks
      → post-game: FREE SURVEY (full catalog) + DOSSIER standalone page
```

The dashboard is the hub the user asked for: the game literally starts on
material selection. (If we want the cinematic even earlier, it can live as
the dashboard's "Incident Briefing" tab — same flow.)

Two dashboards, renamed to avoid confusion:
- **Certification Queue** (in-game hub): material select + mission state.
- **The Dossier** (its own tab, always reachable, never gated): full
  findings, evidence map, hold-out replay, export — the credible artifact
  for judges. The campaign *adds* your personal layers to it (logged gaps,
  your predictions vs archive answers); it never withholds the base
  findings behind gameplay — a judge who never plays still gets everything
  in one click.

## 4. The beat template (every mission, same skeleton — this is what makes it buildable)

1. **INSERTION** (60–90 s): walk the deck to the relevant bay; Okafor/EMBER
   dialogue establishes the material's story role and stakes.
2. **PREDICT** *(Choice 1, timed 10 s)*: EMBER asks you to state the Earth
   assumption for this material in μg. Logged — never scored as right/wrong;
   replayed at the verdict card ("you expected …; the archive said …").
3. **RUN 1-g**: Earth Lab renders the ground behavior (Earth basis, labeled
   as such).
4. **CONFIGURE** *(Choice 2, physical)*: you set up the μg chamber in-world —
   walk to the valve/toggle/mixer and aim-click. Some settings are inside the
   tested range, some outside (outside ⇒ refusal reveal — teaching the
   boundary by touch).
5. **RUN μg**: the chamber renders per the honesty contract — the engine's
   actual verdict state decides the animation (§9).
6. **DECIDE** *(Choice 3, operational)*: a real ship decision (ventilation
   policy, suppression tool, zoning, manifest slot). Consequences are
   evidence-weighted, not binary win/lose: EMBER shows which choice carries
   which evidence chips.
7. **VERDICT CARD**: tc_id, verdict, confidence chips, drill-down to
   file#row, calibration label on any number.
8. **FIELD MANUAL unlock**: one fire-safety codex entry per mission.
9. **Return to Queue.**

Choice consequences have three layers, always: (a) immediate animation,
(b) evidence-alignment feedback from EMBER + card, (c) narrative consequence
(Okafor's position shifts, queue reorders). No death/game-over states; wrong
calls cost time and trust, never lives — professional tone.

---

## 5. Missions

### M0 — Prologue: "Two Seconds of Smoke" (cinematic + first walk)

**Role:** hook, controls tutorial, motive. **Evidence:** none rendered (the
garment is a manifest item with no μg evidence — that's the point).

Night cycle. Alarm. B-deck crew quarters: a garment smolders against a
faulted heater panel. Glow, smoke threads (μg smoke blobs — no buoyant
plume), no flame.

**Choice P1 (timed):**
- **(a) Cut ventilation to the section** *(evidence-aligned)* — the smolder
  dims, shrinks, dies. EMBER: "At very low flow a nascent flame can lose
  more heat than it makes. We were lucky twice — no flame established, and
  no data on this garment. Neither luck repeats."
- **(b) Ramp the fan to 'blow it out'** — edge-glow brightens for two
  seconds; master safety auto-cuts power and flow. EMBER (stern): "Flow is
  fuel delivery. The archive will show you what concurrent air does to a
  spreading fabric front."
- **(c) Reach for the N₂ extinguisher** — EMBER stops you mid-reach: "Hold.
  Jets entrain air. I'll show you the thirteen logs where that made flames
  *stronger*. Lab, tomorrow."

Aftermath: the Ground orders full recertification. Okafor objects — schedule.
EMBER unlocks the Archive and the Lab. **Certification Queue appears;
SIBAL flagged PRIORITY-1: incident-adjacent cargo liner.**

**Field Manual FM-01:** *Airflow is fuel delivery. First move: control the
air, not the flame.*

### M1 — SIBAL: "The Standard" (Act I)

**Role:** teach the loop; the archive earns trust with anchors.
**Evidence:** TC-SIBAL-LG-01, TC-SAF1-S1-01, TC-SAF1-S2-01, TC-SIBAL-SCALE-01.

Cargo bay: Aegis corridor liner panels — cotton-fiberglass fabric (SIBAL
heritage). Okafor: "It's the standard liner. Make it quick."

- **Predict (C1):** vigorous 1-g burner — what in μg? (a) same or faster,
  (b) slower but keeps burning, (c) just dies.
- **1-g run:** Earth Lab — teardrop flames, fast climb, panel consumed.
- **Configure (C2, physical):** in the Cygnus-class large duct — flow valve
  (anchor ~20 cm/s or low), direction toggle, ignition. Branches:
  - **Concurrent, anchor flow:** full spread render; burn-front marker
    tracks at **2.18 mm/s** (on-screen label: *traverse calibration*; drill
    -down shows 2.1 published, +4.0% — D1; second anchor 2.64 vs 2.6, +1.6%
    — D2). Gauges run on the one-clock timebase (D9 cameo). Sustained
    420-second-class burn. **Verdict: TC-SIBAL-LG-01 SUPPORTED / HIGH**
    (two flights agree: SAFFIRE-I S1 + SAFFIRE-II S5/S6).
  - **Opposed, moderate:** the flame flattens, tears backward, gutters —
    **out at 70 s** (timer overlay contrasts 70 vs 420). **Verdict:
    TC-SAF1-S2-01 CONTRADICTED** — the "slower but sustained" 1-g intuition
    fails at scale: it didn't slow, it died.
  - **Low flow, large duct:** the chamber goes dark — refusal render:
    *"SIBAL, opposed low flow, large duct — no NASA evidence found."*
    (TC-SIBAL-SCALE-01 INSUFFICIENT; the log-the-gap button appears.)
- **Decide (C3):** corridor fire failsafe policy —
  - (a) *auto-reverse to opposed + ramp* — evidence: one large-duct run
    (S2), MODERATE chip;
  - (b) *full flow shutdown* — evidence: quench at low flow observed in the
    **small** duct (TC-BASS-SIBAL-01); large-duct transfer = named gap —
    BOUND chip with the asymmetry stated;
  - (c) *N₂ flood* — EMBER flags the entrainment logs; disfavored chip.
  EMBER: "I rank evidence, I don't certify designs. Choose your margins."
- **Okafor beat:** grudging — "Fine. The fabric behaves. Windows next."

**FM-02:** *Direction matters: opposed flow killed the large sample in 70
seconds against 420 concurrent.*

### M2 — Thick PMMA: "The Slow Ones" (Act I)

**Role:** SUPPORTED with a MODERATE cap — confidence becomes a mechanic;
first seeded refusal.
**Evidence:** TC-PMMA-THICK-01, TC-EXPLORATION-O2-01.

Viewport pans and instrument housings — thick PMMA slabs (S8/S9 heritage).

- **Predict (C1):** (a) won't spread, (b) slow creep, (c) pool fire.
- **1-g run:** heavy flame, softening, dripping.
- **μg run (configured at archive conditions):** flame anchors at the
  ignition zone; the front creeps at **0.01–0.04 mm/s** (label: *anchored
  regression; two runs, one condition*). Time-lapse overlay makes minutes
  visible. **Verdict: TC-PMMA-THICK-01 SUPPORTED / MODERATE.** EMBER explains
  the cap: "Single condition, two runs — capped by rule, not by mood."
- **Configure branch — Okafor's proposal:** enrich corridor O₂ to 28–30% to
  cut EVA prebreathe time (real exploration-atmosphere logic). Drag the
  mixer past **22.5%** and EMBER hard-refuses (non-overridable): chamber
  seals itself, overlay: **"ABOVE TESTED RANGE — NASA HAS NOT FLOWN THIS."**
  The card names the exact missing test (*thick PMMA at >22.5% O₂, large
  duct* — TC-EXPLORATION-O2-01 refusal with nearest tested domain shown;
  demo D5 embodied).
- **Decide (C3):** sign housings (a) *as-flown configuration* [aligned] vs
  (b) *with the O₂ enrichment plan* [unwritten — every chamber answer
  becomes a refusal]. Okafor takes it up with the Ground; friction logged.

**FM-03:** *Slow is a number, not a promise — and "what about 30% oxygen?"
is currently unanswerable.*

### M3 — Wax & the jet: "The Right Tool" (Act II opener)

**Role:** suppression trap (the choice that punishes intuition) + data
quality humility.
**Evidence:** TC-BASS-SUPPRESS-01, TC-BASS-WAX-01, TC-BASS2-FILM/ROD-01, D8, D11.

MSG-class small duct. EMBER frames it: "The oldest fire in the archive."

- **Sequence 1 — the fog:** wax replay begins, then EMBER freezes it:
  operator text confounds commanded extinction with failure-to-burn —
  **TC-BASS-WAX-01 INSUFFICIENT** render (dim chamber, named gap:
  *protocol-aware outcome classification*). "Even the archive has fog."
- **Sequence 2 — the discipline case:** player asks about the BASS-II films
  and rods (thin-film self-extinction stories they've heard). EMBER refuses
  to render the chamber at all: "That study's per-run outcomes aren't held
  here. I can offer literature, not evidence." (D11 embodied.)
- **The drill (C2, the mission's core choice):** live suppression on a
  small-duct burning sample with real evidence behind each tool:
  - **(a) N₂ jet** — jet hits; flame dips for a beat — then **lengthens,
    brightens, grows**; auto-scram; slow-mo replay with labeled schematic:
    *entrained air* (no fabricated numbers). **Verdict:
    TC-BASS-SUPPRESS-01 CONTRADICTED** — 13 operator logs + Takahashi (D8).
  - **(b) Cut the flow** — spherical blue flame shrinks, dims, quenches
    (small-duct low-flow quench, TC-BASS-SIBAL-01 evidence).
  - **(c) Both at once (jet at zero carrier flow)** — dip, no growth, slow
    decay — EMBER notes the logs' condition and marks it PARTIAL-evidence.
- **Decide (C3):** rewrite the Vesta's handheld-extinguisher doctrine for
  μg (carry N₂ / carry flow-control toolkit / both). Evidence-weighted
  feedback; Okafor watched the jet feed the fire — first crack in her
  certainty.

**FM-04:** *Your suppressant can be an oxidizer delivery system.*

### M4 — PDMS: "The Gasket Paradox" (Act II center — the headline twist)

**Evidence:** TC-PDMS-01, TC-PDMS-02. The strongest CONTRADICTED story we own.

Seal inventory bay. Silicone is everywhere — gaskets, potting, seals.
Okafor: "Ground rating says nasty. The swap program costs us a week. Just
confirm it so I can schedule it."

- **Predict (C1):** (a) burns worse in μg, (b) same, (c) stalls.
- **1-g run:** complete consumption — the coupon is gone.
- **μg run — the split-screen render:** left, Earth full burn; right, μg
  chamber: ignition flash (labeled *ignition per telemetry, not imagery* —
  guardrail), luminous flame fades by **~13 s** (vs **142.7 s** for SIBAL,
  on screen), front never advances. ×4 coupons, same result.
  **Verdict: TC-PDMS-01 CONTRADICTED / MODERATE** — "PDMS that burns
  completely in 1-g ignites then stalls in μg. All four coupons."
  Side card: TC-PDMS-02 SUPPORTED (thick-PDMS no-spread expectation
  transfers — single condition, capped).
- **Decide (C3) — Okafor's swap program:**
  - (a) *Proceed — swap to Viton/EPDM*: EMBER runs the class transfer:
    same polymer family as the archive's surprise, **no run-level
    evidence** — BOUND at best; the queue fills with INSUFFICIENT chips.
  - (b) *Keep PDMS, add inspection cadence* [what's actually evidenced].
  - (c) *Demand a ground re-rating campaign* — EMBER: ratings are 1-g by
    definition; the archive is the tiebreaker, not the sheet.
- **Okafor's turn:** she pulls up the epistemic grid herself. "Show me the
  map, EMBER. All of it." (Gap-map gameplay teased for Free Survey.)

**FM-05:** *A 1-g rating can be wrong in either direction — milder (PDMS)
or faster at scale. The archive is the tiebreaker.*

### M5 — Nomex: "The Neighbor Effect" (Act II closer)

**Evidence:** TC-NOMEX-01, D7, D6 (Blind Test mini-game).

Habitat wall assembly: PMMA-faced panels with Nomex adjacent (S7 heritage).

- **Predict (C1):** the PMMA face catches — does the Nomex neighbor follow?
  (a) cascade, (b) no.
- **μg run:** PMMA face burns out its anchored zone; heat-shimmer passes
  toward the Nomex; scanline highlight sweeps the neighbor — **never
  ignites**. **Verdict: TC-NOMEX-01 CONTRADICTED** — "The cascade assumption
  fails: PMMA ignition aid consumed, adjacent Nomex never ignited" (D7).
- **Decide (C3) — zoning:** adjacency rules for the Aegis interior. Framed
  carefully: EMBER **refuses "safe" classifications** (guardrail) — "I rank
  evidence, not safety. Choose margins, not promises."
- **The Blind Test (offer, skippable):** replay the SAFFIRE-II hold-out —
  conceal, call your five, hash-stamped reveal; par score = **0/5
  false-SUPPORTED**; badge *The Honest Analyst* (D6 embodied).

**FM-06:** *Adjacency assumptions are unverified until the archive says
otherwise — and the engine that never overclaims is the one you can trust
when it does.*

### M6 — Finale: "The Aegis List & The Locked Door" (Act III)

**Evidence:** TC-PARTIAL-G-01, TC-EXPLORATION-O2-01, §2 catalog, R5 §6.

The queue is clear; the manifest decision is yours to assemble. The Aegis
List: one slot at a time, real options, the engine answering each —

| Slot | Options | Engine answers |
|---|---|---|
| Liner | SIBAL / beta cloth | SUPPORTED·HIGH vs INSUFFICIENT (glass fabric → sibal family, BOUND) |
| Housings | thick PMMA / PEEK | SUPPORTED·MODERATE vs INSUFFICIENT (→ pmma_thick, BOUND) |
| Seals | PDMS / Viton / EPDM | CONTRADICTED+TRANSFERABLE story vs INSUFFICIENT ×2 |
| Screens | polycarbonate | INSUFFICIENT (→ pmma, BOUND) |
| Printer stock | ABS | INSUFFICIENT — "ISS printers, no μg runs" |
| Padding | urethane foam | INSUFFICIENT — flagged bulk fuel, Earth basis only |

Every INSUFFICIENT pick renders the dark chamber + named gap; BOUND picks
carry the caveat banner. No slot is "right" — each is an evidence state you
must own.

**Then you walk the corridor to the door.** Brushed steel, stenciled:
**EXPLORATION ATMOSPHERE — 0.38 g — UNFLOWN.** Interacting with it plays
the two non-overridable refusals in full (TC-EXPLORATION-O2-01,
TC-PARTIAL-G-01) — the door *names the missing flight tests* (R5 §6 items
1–2; partial-g stays a refusal until a partial-g campaign exists). EMBER's
closing monologue: "Mars is the edge of this map. Everything past this door
is unwritten — not safe, not unsafe: **unwritten**. That is why the next
fire in freefall matters."

**Final choice — the memo:** pick three next-experiment candidates from the
gap map; the epilogue compares your list to the real ranked one (PDMS at
>22.5% O₂ large duct; thick PMMA >22.5%; SIBAL opposed low flow, large
duct) with alignment feedback, no score-shaming.

**Export:** the **Aegis Evidence Dossier** — every verdict, citation, and
named gap from your campaign, stamped *"evidence states, not
certifications."* Mission Control's acceptance is off-screen and
conditional on ground review — the game's job was the evidence, never the
stamp. Post-credits: Free Survey unlocked; your personal Dossier layers
(door log, predictions, gap picks) merge into the always-open Dossier tab.

### Free Survey (post-game)

The full catalog (7 archive families + all §2 alternatives), all chambers,
live fan control, badges (Gap Collector, Assumption Breaker, Honest
Analyst, Blind Test, Trust Room — catalog §4.5), and the Dossier page.

---

## 6. Choice → outcome → animation mapping (global contract)

| Player choice lands on… | Engine state | Animation (what the team builds) |
|---|---|---|
| Tested condition, agreement | EXACT | Full flame-front motion at measured rate; front marker + rate label (calibration named); live gauges; sustained-burn timers (420 s class) |
| Tested condition, disagreement | CONTRADICTED | Split-screen 1-g vs μg (PDMS full-burn vs stall); or extinction sequence (S2: flatten → tear → gutter → dark at 70 s); or neighbor-scan highlight (Nomex) |
| Near a tested condition | BOUND | Normal animation + caveat banner "nearest tested domain: …" + differing axes listed |
| Untested condition | INSUFFICIENT | **Dark chamber render**: ignition per Earth data, then the μg view shows the no-evidence state — named missing test, "log the gap" button. Never an error, never empty |
| Hard boundary (>22.5% O₂, partial-g) | REFUSAL (non-overridable) | Chamber seals / door stays locked; stencil names the unflown test; EMBER delivers the refusal as a character beat |
| Suppression choice | per-tool evidence | N₂ jet: dip → growth → auto-scram + labeled entrainment schematic; flow-cut: spherical shrink → quench |

Hard animation rules (from catalog §4.4, restated for the animators): no
numeric value on screen unless it is engine output; no fabricated flame
physics for untested cells — **the refusal animation is content, not a
failure state**; every flame behavior traces to a run_id; flame morphology
basics — μg flames are spherical/blue and dimmer without buoyancy, 1-g are
teardrop/yellow (smoke blobs, not plumes, in μg).

## 7. EMBER — AI companion spec (text-only)

- **Identity:** Evidence-based Microgravity Emergency Reference. Warm, precise,
  slightly wry; treats refusal as a point of pride, not a limitation.
  Signature lines: *"That's not in the archive. That's why you're here."* /
  *"I rank evidence. I don't certify."*
- **Channel:** subtitle bar + expandable chat log (React UI), never voice.
- **Hint tiers (per stuck beat):** 20 s idle → nudge ("Check the flow
  direction toggle"); 45 s → scaffold ("Opposed flow changed S2's fate");
  70 s → point-to-source (opens the exact file#row). Teaches, never solves.
- **Hard constraints:** grounded retrieval over the L1 store + literature
  register only; **may explain, never override a verdict, never generate a
  number**; cites run_ids on request; refusals non-overridable by player or
  AI alike.
- **Fallback:** scripted line bank keyed to mission/beat for offline demo —
  the companion can never take the game down with it.

## 8. Field Manual (fire-safety codex — one unlock per mission)

FM-01 airflow is fuel delivery · FM-02 direction matters (70 s vs 420 s) ·
FM-03 slow ≠ safe; the 30% O₂ question is unanswerable today · FM-04 your
suppressant can feed the fire · FM-05 ratings break both ways; the archive
is the tiebreaker · FM-06 adjacency is an assumption, not a fact ·
FM-07 (finale) unwritten ≠ safe — act with margins, name the test.

## 9. Build notes (read before dividing tasks)

- **Stack (per the 2026-10-05 FPS decision): one React app** — React Three
  Fiber + drei + react-three-rapier. Game, Queue dashboard, Dossier,
  verdict cards, EMBER chat, and Field Manual share one app and one state
  store; no engine-embed bridge, fully static hosting. (Fallback engine if
  the team rebels against R3F: Babylon.js. Skip Unity/Godot web export.)
  FPS layer: Pointer Lock + KeyboardControls (drei) for mouse-look + WASD;
  Rapier character controller; station modules as box colliders = the area
  constraints; the "weapon" raycast is the **igniter/measurement probe** —
  full FPS feel, zero combat. NPCs render as holograms on monitors ( dodges
  humanoid animation, the hardest amateur problem). Free CC0 assets: Kenney
  space-station kits, Quaternius, Poly Haven HDRIs, ambientCG.
- **All verdict data precomputed** from `verdict_engine/` and shipped as
  static JSON — no backend, no API risk. EMBER's LLM (if used) never called
  from the browser with a public key: serverless wrapper or pre-cached
  lines at build time.
- **Content is data:** every mission is a JSON payload (dialogue, choices,
  configs, precomputed verdicts) over one Lab template. Mission count is
  cheap; bespoke geometry is not. Do not build six custom levels.
- **Perf budget:** the real constraint is the *judges'* browsers, not the dev
  GPU — one reusable interior kit, baked lighting, ≤2 realtime lights,
  low-poly throughout; <15–20 MB initial load (Draco/Meshopt GLB, KTX2
  textures, lazy-load per mission). Hosting: Vercel with the SPA rewrite
  rule; MIT LICENSE for the open-source requirement.
- **Week-1 gate (binding):** graybox one corridor proving walk → aim →
  ignite → verdict card. If that loop takes more than one week, fall back
  to fixed interaction points — recorded gate decision, pre-agreed.
- **Scope guard (catalog §5, binding):** if the critical path is threatened,
  cut mission breadth or Free Survey polish — never the honesty contract.

## 10. Open items for the team

1. Stack confirmation: R3F + Rapier single-app (recommended) vs Babylon.js —
   the week-1 graybox gate decides.
2. Mission count for MVP: recommend **M0 + M1 + M4 + M6** as the vertical
   slice (incident → trust → twist → refusal ending); M2/M3/M5 slot in as
   payload data.
3. Okafor voiced vs text-only.
4. Whether the Blind Test mini-game ships in-campaign (M5) or post-game.
