# Strategy Agenda — GRAVIFIRE

The list of things to hold in mind while planning the next moves. Working
document: items move from §3 "Open" to §7 "Decided" as they clear the
decision gate (`decision_gate.md`, same folder). Last updated 2026-10-02.

## 1. Where we stand

- Phase: discovery / data acquisition (as of 2026-10-02).
- Hackathon build window: Nov 14–15, 2026. Only assembly and presentation
  happen there — all data work finishes before.
- The winner shape is locked (gate §3). Strategy sessions decide how to
  reach it, not whether to keep it.

Countdown checkpoints (deadlines only — task ordering is dependency-based
in `roadmap.md` v3; research execution detail in `research_plan.md §5`.
Known deadlines: **240 s video Oct 7**, **whole project built Nov 7**,
hackathon Nov 14–15. The video can ship at script-version v0/v1 if research
is still running — see `roadmap.md §4`.):

| When | What must be true |
| ---- | ----------------- |
| **Oct 7** | **240 s concept video submitted** (script Oct 2–3, concept screens Oct 4, edit Oct 5–6, buffer Oct 7) |
| Oct 8–14 | 2026 rules closed out; feasibility sprint passed; gap-2 go/no-go decided |
| Oct 15–27 | catalogue + verdict engine done; 15–20 seed verdicts run; spec v1 to developer ~Oct 20 |
| Oct 27–Nov 1 | validation campaign done (anchors + blind hold-out + provenance audit) |
| **Nov 7** | **whole project built** (developer scaffolding from ~Oct 20, integration Oct 28+, completion Nov 2–7) |
| Nov 8–13 | data frozen Nov 8; final demo video (real system); pitch + Q&A rehearsals |
| Nov 14–15 | assemble and present only |

## 2. Locked — do not spend session time here

- One user: fire-safety / materials engineer approving spacecraft
  materials.
- One question: can Earth-based material flammability assumptions be
  trusted under a given microgravity scenario?
- One mechanism: ground vs microgravity evidence comparison across BASS,
  BASS-II, SAFFIRE-I, SAFFIRE-II (SoFIE is literature only, never
  "analyzed data").
- Decision output: supported / contradicted / insufficient.
- Trust layer: uncertainty plus provenance on every displayed number.
- One extension: the next-experiment recommendation.
- Root `CLAUDE.md §Hard rules`: no overclaims, provenance everywhere,
  resource checks before downloads, house writing style, decision gate on
  every choice.

If a session drifts into reopening these, stop and return to §3.

## 3. Open decisions

Ordered by deadline. Every item eventually gets a gate verdict
(FOCUS / REDUCE / CHANGE) and a log row.

### Decide now (this week)

**D1. Science-set download go/no-go**
- What: run the verified downloader for the ~810 MB science set
  (`psidata/download_science_set.py`).
- Blocks: D3–D7 all wait on real data. This is the critical path.
- Precondition: disk/RAM sizing check and explicit confirmation (hard
  rule 3).
- Expected shape: FOCUS once sizing passes.

**D2. Competition intelligence**
- What: collect the 2026 Space Apps facts — submission format, project
  page requirements, video length and deadline, award category list,
  local vs global judging dates.
- Why: the deck's 240-second pitch and demo structure are patterns, not
  verified 2026 rules. Confirm before scripting anything.
- Source: official Space Apps 2026 pages when published; record what is
  still unknown.

### Decide by Nov 7 (synthesis design freeze)

**D3. Data catalogue + normalization plan**
- What: inventory the science set; normalize tabular results across the
  four studies (units, materials, conditions).
- Constraint: experiment families stay separate (thin PMMA, PMMA rods,
  SIBAL fabric, …). Display flow fields ≠ calibrated velocity.
- Output: a written catalogue in `psidata/`, linked from `app/`.

**D4. Verdict semantics — the scientific core**
- What: define precisely what makes a claim "supported", "contradicted",
  or "insufficient": which comparison, which threshold, which uncertainty
  measure, what contradicting evidence does to a rank.
- Why: this decides whether the project is science or theater. It is also
  the standout mechanism judges would remember.
- Read first: `Gravifier_research/BASS-II/` reports; gate §3 and §9.

**D5. Validation plan**
- What: choose the hold-out design (experiment runs, or a whole study)
  and the metrics: agreement with published findings, false "supported"
  rate, calibration of uncertainty.
- Why: the YottaByte gap — prototype evidence stronger than validation
  evidence. At global level this is the differentiator.
- Constraint: must be executable with the team and time available.

**D6. Scenario input design**
- What: what the engineer enters (material, atmosphere, flow, geometry)
  and which combinations the four studies can actually answer.
- Constraint: out-of-scope inputs get refused with a reason. "Insufficient
  evidence" is a first-class output, not an error.

**D7. Next-experiment recommender sketch**
- What: how "which test would reduce uncertainty most" is computed.
- Constraint: keep it a simple, defensible ranking (information gap per
  candidate test). No ML for its own sake — that is the AI-predictor
  anti-pattern in disguise.

**D8. Stack: Streamlit vs React**
- Considerations: Streamlit is fast and Python-only, and the evidence
  layer is Python; React buys polish but costs build time in a two-day
  window. The wow moment is the verdict appearing (demo beats 1–4), not
  UI chrome.
- Decide against demo strength and team capacity, per the gate.

**D9. Award identity**
- What: name the one award category the project sits in naturally.
- Depends on: D2's category list. Generic excellence is not a category.
- Why early: it disciplines every later framing choice, from project page
  title to pitch opening line.

### Decide by Nov 13 (rehearsal readiness)

**D10. Demo and pitch scripts**
- What: the six demo beats, the 15-second wow (beats 1–4), the pitch in
  WHO → WHY → WHAT → HOW → PROOF → SO WHAT order (gate §8).
- Draft early, rehearse before the weekend, adjust to confirmed 2026
  rules from D2.

**D11. Team roles for the build weekend**
- What: who owns evidence layer, UI, validation run, and pitch.
- Constraint: one owner per demo beat, so every beat has a person who can
  defend it.

**Checkpoint:** data frozen, catalogue complete, provenance drill-down
works end to end. Nothing data-related is touched after this point.

## 4. Standing traps while thinking

Quick reminders from gate §6; the full anti-pattern table lives there.

- Any new feature idea must name which checklist items it passes.
  "Would be cool" is not decision value.
- Prediction of flame behavior is NASA's lane. Ours is evidence
  comparison with uncertainty.
- Moon or Mars anything: no, twice over.
- A plan that needs a paragraph to explain its value will fail the
  15-second demo test.
- Visualization is the communication layer, not the contribution.
- The question is never "can we build it" but "can we prove it works".

## 5. Read before any strategy session

1. `decision_gate.md` (same folder) — the evaluation rules.
2. `research_plan.md` (same folder) — the science workplan (RQs, WPs, validation).
3. `Gravifier_research/BASS-II/` reports — before any scientific claim.
4. `requirements.md` — status and open items.
5. Latest `Daily doc/` report — what actually moved recently.

## 6. Session protocol

1. Read the §5 inputs.
2. Pick at most three open items from §3.
3. Run each through the gate; record verdict and trigger in the gate's
   decision log.
4. Update this file: move decided items to §7, add newly surfaced items
   with deadlines, refresh §1 dates.

## 7. Decided

| Date | Item | Verdict | Where logged |
| ---- | ---- | ------- | ------------ |
| 2026-10-02 | Research plan created: master RQ + WP1–WP7 mapped to D3–D7 | FOCUS | gate §10 row 2; `research_plan.md` |
