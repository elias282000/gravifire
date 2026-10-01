# CLAUDE.md — app: GRAVIFIRE dashboard

## Task summary

- **Owner:** Elias Ur Rahman — GRAVIFIRE team
- **Status:** planning (stack decision pending — Streamlit vs React, decide by Nov 7)
- **Start date / close date:** 2026-10-02 / 2026-11-15
- **Reviewers:** teammates (names TBD)

## What this sub-project is

The deliverable: an interactive, AI-powered dashboard that summarizes, ranks,
and interprets microgravity combustion findings across BASS, BASS-II,
SAFFIRE-I, and SAFFIRE-II for spacecraft fire safety. Done = a judge-ready
demo on Nov 15 with provenance on every displayed number.

## Files that always belong here

- `notes.md` — build decisions and test evidence (Study → Plan → Implement → Test).
- Dashboard source code (structure created when the stack is chosen).
- Data catalogue linking each input file to `psidata/`.

## How to work on this

- Root `CLAUDE.md §Hard rules` apply in full: no overclaims, provenance
  everywhere, experiment families kept separate, writing style.
- Every metric/claim rendered in the UI must map to a source file and study
  run — build the evidence layer before the UI.
- Test evidence goes in `notes.md`; never delete prior evidence.

## Vocab / gotchas

- PSI display "flow" fields are not calibrated physical velocity.
- Image-derived flame-spread values are derived data, not measurements.
- BASS-II did not establish partial-gravity (Moon/Mars) behavior — the
  dashboard must not present it as such.

## Open items

- [ ] Stack decision (Streamlit vs React) by Nov 7.
- [ ] Data catalogue once the science set is downloaded.
