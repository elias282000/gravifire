# GRAVIFIRE Roadmap v3 — Dependency-Based

What must be done before what, and what can run in parallel. No calendar
dates — deadlines (video due Oct 7, whole project built by Nov 7, hackathon
Nov 14–15) live in `strategy_agenda.md §1` and pressure the critical path
from outside. The phase-by-phase research execution detail lives in
`research_plan.md §5` (phases R0–R6); this file is the ordering across all
tracks. Logged through the gate (`decision_gate.md §10`).

## 1. Delivery model

| Track | Owner | Produces |
| ----- | ----- | -------- |
| **Research** | Elias + agent | understanding of what is possible / not possible; evidence catalogue; verdict engine + findings; validation results; script points + video script; the developer document |
| **Build** | developer (+ Elias) | the whole web project, from the developer document |
| **Video** | team (editing, starts in parallel immediately) + agent (script, concept screens) | the 240 s video; later the final demo video |

Sequencing principle (Elias, 2026-10-02): **research first** — build the
whole idea of what is possible and what is not; complete the research if
possible; derive the script points; then hand the developer document over.
Video editing prep runs in parallel throughout and never blocks research.

## 2. The dependency map

```text
[DONE baseline]  four family reviews · prior-art scan · winner shape ·
                 research plan · local data audit · concept + pitch lines
      │
      ├─▶ R1 interrogate the data (feasibility, 5 questions)
      │        │
      │        └─▶ R2 build the evidence base (catalogue + data contract)
      │                 │
      │                 └─▶ R3 design + exercise the verdict engine
      │                          │            │
      │                          │            └─▶ DEV DOC v1 ────────────▶ B1 scaffolding
      │                          │                                             (developer)
      │                          └─▶ R4 validate (anchors · blind hold-out ·
      │                                 provenance audit)                    │
      │                                 │                                   │
      │                                 └─▶ R5 synthesize + understand      │
      │                                          │                          │
      │                                          ├─▶ SCRIPT points ──▶ script v2 ─▶ V2 edit
      │                                          └─▶ DEV DOC v2 ─────────────┤
      │                                                                     ▼
      │                                                            B2 integration (catalogue + verdicts)
      │                                                                     │
      │                                                            B3 completion (+ validation artifacts)
      │                                                                     │
      └─▶ V0 editing prep (team, parallel from day one)                      │
                footage gathering · motion templates · narration pipeline    │
                asset credits · cut structure rehearsal                     ▼
                                                              F final assembly:
                                                              record on the real system →
                                                              final video + submission assets →
                                                              hackathon presentation
```

## 3. Node definitions

Each node: needs → produces → unblocks. Gate review at every exit.

### Research track (detail in `research_plan.md §5`)

**R1 — Interrogate the data.**
Needs: baseline. Produces: feasibility answers to the five questions
(workbook schemas, timestamp alignment, PSI-98 sensor coverage, S5 anchor
reproduction, table cleanup) + go/no-go on gap-2 depth. Unblocks: R2, and
the gap-2 fallback decision (downgrade to run-count + literature-spread
uncertainty if the anchor fails — pre-made branch, not a crisis).

**R2 — Build the evidence base.**
Needs: R1. Produces: L1 evidence store (SQLite + JSON export = the data
contract draft), family registry, provenance discipline, anchor image sets
extracted. Unblocks: R3, DEV DOC v1 (data-contract half).

**R3 — Design + exercise the verdict engine.**
Needs: R2. Produces: `verdict_spec.md` (claim grammar, evidence classes,
GRADE-adapted confidence, conflict taxonomy, evidence grades, refusal
semantics), working engine, 15–20 seed verdicts covering all four
SAFFIRE-II families + one BASS-II + one BASS claim, scenario input spec.
Unblocks: R4, DEV DOC v1 (semantics + screens half), script v1.

**R4 — Validate.**
Needs: R3. Produces: anchor-reproduction results, the blind SAFFIRE-II
hold-out (rules version-stamped before reveal), provenance audit, metrics
(verdict agreement, false-SUPPORTED rate, calibration, coverage).
Unblocks: R5, DEV DOC v2 (proof content).

**R5 — Synthesize + understand.**
Needs: R4. Produces: the findings digest — per-claim verdict table with
interpretation; "what we can say / what we cannot say / what we refuse";
the demonstrable-claims list; the uncertainty story; next-experiment
candidates; limits and overclaim guardrails. This is the node that turns
results into *understanding*, and it is the direct source of the script.
Unblocks: script v2 (final), DEV DOC v2.

**R6 — Translate.**
Needs: R5. Produces: script points → full video script (beat table, 15-second
wow, memory line); the developer document (final version). Note both
artifacts have earlier draft versions (below) so nothing downstream starves.

### Build track

**B0 — Developer onboarding.** Parallel from day one. Name the developer,
pick the stack (web-primary; Streamlit vs React per developer = D8), set
the sync cadence. Needs nothing.

**B1 — Scaffolding.** Needs: DEV DOC v1. The web app skeleton renders the
JSON contract shape with clearly-marked interim data; concept screens
become UI direction.

**B2 — Integration.** Needs: catalogue freeze + DEV DOC v2. Real verdicts,
provenance links, refusal path, next-experiment stub.

**B3 — Completion.** Needs: validation artifacts. Proof screens wired in;
the whole project built. Unblocks F.

### Video track

**V0 — Editing prep.** Parallel from day one; needs nothing from research.
The team gathers footage (NASA imagery with credits, local archive frames),
builds motion templates, rehearses the narration pipeline and cut structure.

**V1 — Concept video edit.** Needs: script v1 + concept screens. The
240 s video with honestly-labeled concept screens; PROOF beats cite
published NASA results + the committed validation design.

**V2 — Final edit.** Needs: script v2 + B3. Re-shoot on the working system
with real verdicts and validation results; submission-ready output.

**F — Final assembly.** Needs: B3 + V2 material. Final video, project page
assets, pitch + Q&A rehearsal, hackathon presentation.

## 4. Script versions (so an early video deadline never forces fake results)

| Version | Available after | Contains | Honest label |
| ------- | --------------- | -------- | ------------ |
| v0 | now (baseline) | problem, concept, pitch lines | concept |
| v1 | R3 | + real seed verdicts from the engine, scenario→verdict flow | design-time results, engine real, validation pending |
| v2 | R5 | + validation results, hold-out reveal, uncertainty story | fully evidenced |

If the Oct 7 deadline arrives before R3 completes, ship v0/v1 hybrid:
published NASA findings as PROOF (real, citable) + engine demo if ready +
validation as committed plan. Concept screens always labeled as design.

## 5. Parallel work streams (what can run simultaneously)

| Stream | Runs parallel to | Until |
| ------ | ---------------- | ----- |
| V0 video-editing prep (team) | everything | script v1 arrives |
| B0 developer onboarding + stack pick | R1–R3 | DEV DOC v1 |
| Anchor-image extraction (R2 part) | R3 spec writing | extraction complete |
| Script v0/v1 drafting | R4 | v2 rewrite |
| Pitch + Q&A prep | B2/B3 | hackathon |

## 6. Standing rules

- Gate review at every node exit; verdicts logged in `decision_gate.md §10`.
- No overclaims; "no evidence found" phrasing survives into every artifact;
  concept screens labeled as design; no-fake-numbers in anything the
  developer renders.
- Families stay separate; display fields never become calibrated velocity;
  planned vs as-flown both live; BOUND ≠ exact MOC.
- If a node must shed scope to protect the critical path: cut seed-claim
  breadth — never the hold-out, the anchors, or the provenance discipline.
- The 15-second test applies to every artifact that leaves the research
  track.
