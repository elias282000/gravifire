# GRAVIFIRE — Requirements & Work Record

Study → Plan → Implement → Test record for the NASA Space Apps 2026
"Flame in Freefall" challenge submission.

- **Status:** discovery (data acquisition)
- **Start date:** 2026-10-02
- **Target:** working dashboard by end of Nov 15, 2026

## 1. Goal

Build an interactive, AI-powered dashboard that summarizes, ranks, and
interprets microgravity combustion findings (BASS, BASS-II, SAFFIRE-I,
SAFFIRE-II) for spacecraft fire safety, with:

- flammability / extinction-limit exploration,
- material risk ranking,
- plain-language fire-safety guidance,
- traceable provenance on every claim,
- flagged knowledge gaps and uncertainties.

## 2. Research findings

- Deep-research reports live in `Gravifier_research/BASS-II/` (md + pdf).
- NASA's own 2023–2026 work already covers CV-based BASS/BASS-II analysis and
  cross-investigation comparison — our differentiation is uncertainty,
  provenance, and evidence synthesis, not prediction.
- Full findings and constraints: see `CLAUDE.md §Hard rules`.

## 3. Data plan

| Item | Status |
| ---- | ------ |
| PSI API endpoints documented (geode-py/ws) | done |
| Manifests PSI-25/26/98/99 downloaded | done (`psidata/manifests/`) |
| Science-set downloader written + verified | done (`psidata/download_science_set.py`) |
| Science-set download (~810 MB) | **paused — awaiting user confirmation** |
| Selective raw video/telemetry cherry-picks | not started (only if needed) |

## 4. Implementation plan

1. Download + inventory the science set; write a data catalogue.
2. Normalize tabular results across the four studies (units, materials,
   experiment families kept separate).
3. Build evidence layer: claim → source file → study/run linkage.
4. Build dashboard (stack TBD: Streamlit vs React — decide by Nov 7).
5. Risk ranking + plain-language guidance with uncertainty flags.
6. Presentation/demo script for the judges.

## 5. Open items / decisions

- [ ] Stack choice: resolves at the week-1 graybox gate (D8); R3F + rapier
  single React app recommended (dev doc v1.1 §3). Streamlit superseded by
  the FPS game decision (2026-10-05).
- [ ] Confirm science-set download with sizing check.
- [ ] Team roles split for the hackathon weekend.

## 6. Test evidence

| Date | What was tested | Result |
| ---- | --------------- | ------ |
| 2026-10-02 | PSI manifest fetch + presigned URL download path | verified (see `psidata/download_log.tsv`) |
| 2026-10-06 | R7 handover bundle integrity: whitelist path resolution, M1 payload verbatim check, inventory (`R7_HANDOVER/verify_bundle.py`) | 40/40 PASS |
| 2026-10-06 | Engine determinism: `run_r3.py` regenerated `seed_verdicts.json` vs bundled copy | byte-identical; 18/18 literature concordance |
| 2026-10-06 | R5 exit checks re-run (`verdict_engine/scripts/r5_exit_checks.py`) | ALL PASS |
