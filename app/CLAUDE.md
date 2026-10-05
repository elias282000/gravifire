# CLAUDE.md — app: GRAVIFIRE (game + Dossier)

## Task summary

- **Owner:** developer (to be named) with Elias Ur Rahman — Team NeuraVesta
- **Status:** awaiting B0 onboarding; **stack deliberately unset — the
  developer selects (decision D8, resolved at the week-1 graybox gate)**
- **Start date / close date:** 2026-10-02 / 2026-11-15

## What this sub-project is

The deliverable: a web-delivered, two-tab app — TAB A the first-person
game (Certification Queue hub + mission template), TAB B the Aegis
Evidence Dossier (always reachable, never gated). Contract:
`Gravifier_research/R7_HANDOVER/docs/DEVELOPER_DOCUMENT.md` v1.1. Done = a
judge-ready demo on Nov 15 with provenance on every displayed number.

**Nothing in this directory (or repo) prescribes a framework, engine, or
language.** The dev doc fixes the contract (two tabs, static hosting,
precomputed verdict JSON, honesty rules, perf budget); D8 picks the stack.

## Files that always belong here

- `notes.md` — build decisions and test evidence (Study → Plan → Implement → Test).
- Source code, structure created when the developer chooses the stack.
- Data catalogue linking each input to `Gravifier_research/R7_HANDOVER/`.

## How to work on this

- Root `CLAUDE.md §Hard rules` apply in full: no overclaims, provenance
  everywhere, experiment families kept separate, writing style.
- Every build decision (feature, screen, stack, copy) passes the decision
  gate at `Setup docs/decision_gate.md`: verdict FOCUS / REDUCE / CHANGE,
  trigger named, logged in the gate's decision log.
- Every metric/claim rendered in the UI must carry a key in
  `R7_HANDOVER/numbers_whitelist.json` — no client-side numbers, ever.
- Test evidence goes in `notes.md`; never delete prior evidence.

## Vocab / gotchas

- PSI display "flow" fields are not calibrated physical velocity.
- Image-derived flame-spread values are derived data, not measurements.
- BASS-II did not establish partial-gravity (Moon/Mars) behavior — the app
  must not present it as such; refusals are non-overridable.

## Open items

- [ ] B0 onboarding session (checklist: dev doc v1.1 §11).
- [ ] D8 stack selection at the week-1 graybox gate.
- [ ] Data catalogue from the R7 bundle.
