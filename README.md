# GRAVIFIRE — Team NeuraVesta

NASA Space Apps Challenge 2026 — "Flame in Freefall: AI-Powered Fire Safety
Insights from Microgravity Combustion Data." Private working repo for the
build. Hackathon: Nov 14–15, 2026; full build deadline Nov 7.

**What it is:** a two-tab web app — a first-person game where you play the
Fire Safety Officer of the ISV Vesta (2038), running NASA's real
microgravity fire experiments as evidence-based decisions, plus the Aegis
Evidence Dossier (always reachable, never gated) that carries the full
verified findings. Every verdict — SUPPORTED / CONTRADICTED / INSUFFICIENT —
traces to study, run, and source file. INSUFFICIENT is a first-class
answer: *it knows when NASA evidence is not enough.*

**Stack: deliberately unset.** Nothing in this repo prescribes a framework,
engine, or language — the developer selects (decision D8, resolved at the
week-1 graybox gate). The binding contract is
[`Gravifier_research/R7_HANDOVER/docs/DEVELOPER_DOCUMENT.md`](Gravifier_research/R7_HANDOVER/docs/DEVELOPER_DOCUMENT.md) v1.1.

## Repo map

| Path | What it is |
| ---- | ---------- |
| `Gravifier_research/R7_HANDOVER/` | **Start here** — the verified developer handover bundle (engine, L1 store, missions, numbers whitelist, frames) |
| `Gravifier_research/` | Full research track: deep-research reports, evidence store (L1), verdict engine, validation, findings digest |
| `psidata/` | PSI download tooling + file manifests (raw data is gitignored, re-downloadable) |
| `Setup docs/` | Decision gate, strategy, campaign + catalog design docs, roadmap |
| `Scripts/` | Scripts for the competition videos (writing, not code) |
| `Study Materials/` | Study packs (winning-strategy, science primer) |
| `Daily doc/` | Daily todo lists + work reports |
| `app/` | The deliverable — empty until the developer chooses the stack |
| `requirements.md` | Study → Plan → Implement → Test record with evidence |

## Verify the data bundle (run after cloning)

```bash
cd Gravifier_research/R7_HANDOVER
python3 verify_bundle.py   # expect 40/40 PASS
```

## Hard rules (root `CLAUDE.md`)

No overclaims. Provenance on every number. No client-side math — any
rendered number must carry a key in `R7_HANDOVER/numbers_whitelist.json`.
Refusals (>22.5% O₂, partial gravity) are non-overridable. No secrets in
the repo, ever.

## License

MIT — see `LICENSE`. NASA datasets remain under their original terms.
