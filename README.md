# GRAVIFIRE

GRAVIFIRE is a Next.js application that combines a playable Mission Control
campaign with a provenance-aware NASA fire-experiment evidence system. The
Mission Control scenario is fictional; the referenced NASA experimental data
and research artifacts are real source material.

## Application

The current application includes:

- Mission Control and the M0, M1, M4, and M6 campaign missions
- Aegis Evidence Dossier, Field Manual, Gap Log, and Challenge integration
- NASA Experiment Explorer, Virtual Lab, Ask GRAVIFIRE, Fire Landscape, and
  recommendation interfaces
- Deterministic evidence binding, validation, and scientific-boundary refusal

Run locally with pnpm:

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm test
pnpm lint
pnpm build
```

Primary routes include `/mission-control`, `/mission-control/dossier`,
`/experiments`, `/lab`, `/ask`, `/landscape`, `/recommend`, and `/challenge`.

## Integrated research repository

The merge also preserves the target repository's research and data trees:

- `Gravifier_research/` — research reports, evidence stores, validation,
  handover bundle, provenance records, and research outputs
- `psidata/` — PSI manifests, download tooling, tracked reference material,
  and experimental tables
- `Setup docs/`, `Study Materials/`, `Daily doc/`, and `Scripts/` — project
  planning, study, operational, and presentation documentation

The verified handover bundle is at
`Gravifier_research/R7_HANDOVER/`. Its `verify_bundle.py` script can be run
with Python when the local research environment is available.

NASA datasets remain under their original terms. Raw downloads and local
secrets are intentionally ignored; tracked research artifacts are not removed
by the application build.
