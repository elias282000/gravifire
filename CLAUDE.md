# CLAUDE.md — GRAVIFIRE (NASA Space Apps 2026)

## Project summary

- **Owner:** Elias Ur Rahman — team lead, GRAVIFIRE
- **Competition:** NASA Space Apps Challenge 2026, **November 14–15, 2026**
- **Challenge:** "Flame in Freefall: AI-Powered Fire Safety Insights from
  Microgravity Combustion Data" — an interactive, AI-powered dashboard that
  summarizes, ranks, and interprets microgravity combustion findings for
  spacecraft fire safety.
- **Status:** discovery/data-acquisition (as of 2026-10-02)

## Layout of this project

- `CLAUDE.md` — this file: project-wide rules (≤ 200 lines; split if exceeded).
- `requirements.md` — the Study → Plan → Implement → Test record for the build.
- `Gravifier_research/` — deep-research reports (BASS, BASS-II, SAFFIRE-I/II).
  Read before making any scientific claim in the app.
- `psidata/` — PSI download tooling, manifests, and datasets.
  - `manifests/` — full PSI file manifests (PSI-25/26/98/99).
  - `download_science_set.py` — verified science-set downloader (~810 MB).
- `Setup docs/` — writing style, templates, skills library, cron index.
- `Daily doc/` — one todo list + one work report per working day.
- `Study Materials/` — study packs for self-paced learning topics.
- `app/` — the GRAVIFIRE dashboard deliverable (own `CLAUDE.md`).

## Hard rules

1. **No overclaims.** Never claim "first CV analysis of BASS-II" or "first
   cross-dataset meta-analysis" — NASA (Ya-Tying Liao, 2023–2026) already does
   this. Defensible angles: uncertainty-aware measurement, provenance,
   evidence reconciliation, model applicability maps, contradiction-aware
   synthesis.
2. **Provenance everywhere.** Every number shown in the dashboard must be
   traceable to study, experiment run, and source file. Display fields for
   ventilation flow ≠ calibrated velocity; image-derived spread rates are
   derived, not measured. Keep experiment families (thin PMMA, PMMA rods,
   SIBAL fabric, …) separate.
3. **Resource check before downloads.** Machine: i5-8365U, 15 GiB RAM,
   ~248 GB free on /home. Raw PSI data (~920 GB) never gets downloaded in
   full — science set (~810 MB) plus selective cherry-picks only. Confirm
   sizing with the user before any large job.
4. **No secrets in the repo.** API keys are bearer tokens; never commit them.
5. **Write per `Setup docs/anti-ai-writing-style.md`** — short, direct,
   active voice; no "delve", no corporate hedging, no filler.

## How to work on this project

- Follow the Study → Plan → Implement → Test cycle; record evidence in
  `requirements.md §Test evidence`. Never delete prior evidence.
- Daily outputs go to `Daily doc/Daily_Work_Report_Elias_DD-MM-YYYY.md` and
  `Daily doc/todo_list_Elias_DD-MM-YY.md`.
- Reusable procedures become Skills under `Setup docs/skills/<name>/SKILL.md`.
- One gold-standard example per sub-project: link a prior good artefact in
  each new sub-folder instead of starting from blank.

## Countdown to hackathon

- Data acquisition + synthesis design: now → Nov 7
- Dashboard build window (the hackathon itself): Nov 14–15
- Everything data-related must be downloaded, cleaned, and documented
  **before** Nov 14 — during the hackathon only assemble and present.
