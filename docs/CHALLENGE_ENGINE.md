# Challenge Engine

Challenge My Science is GRAVIFIRE’s deterministic evidence-audit layer. It stress-tests an existing run, grounded answer, recommendation, comparison, or Fire Landscape region against the evidence and feature metadata that produced it.

## Target types

- `RUN`
- `ASK_ANSWER`
- `RECOMMENDATION`
- `COMPARISON`
- `LANDSCAPE_REGION`
- `DOCUMENT_CLAIM` (reserved for future reviewed claims)

The engine does not parse arbitrary prose into a scientific critique and does not require an external model.

## Challenge statuses

- `ROBUST_WITHIN_SCOPE`: direct evidence supports the audited statement within its stated scope.
- `LIMITED_EVIDENCE`: evidence exists, but important dimensions, outcomes, or context are missing.
- `INSUFFICIENT_EVIDENCE`: the target cannot support the requested conclusion from current evidence.
- `CONFLICTING_EVIDENCE`: an internal evidence or provenance consistency conflict was detected.

These statuses describe evidence quality only. They are not safety, risk, or reliability scores.

## Audit logic

Run audits verify REAL NASA DATA status, provenance, linked raw assets, missing outcome/airflow/pressure/spread fields, and direct report links. Answer audits verify that every answer segment references an evidence ID present in the retrieved result; otherwise `UNSUPPORTED_ANSWER_SEGMENT` is raised as an important conflict. Recommendation audits expose dataset size, density class, nearest runs, formula, observed bounds, unsupported dimensions, and the fact that Information Value is not scientific importance. Landscape audits warn that density changes with axes, filters, and 8×8 grid resolution. Comparison audits prevent causal interpretation of field differences.

## Assumptions

The reusable registry includes the current BASS-II scope, 8×8 grid, missing-value exclusion, normalized distance, conservative material normalization, absent outcome/causal models, and the absence of physical airflow mapping.

## Contrasts and conflicts

Missing evidence is not contradictory evidence. The current BASS-II records have unknown outcomes, so experiments can be potentially contrasting by stored fields but should not be called contradictory. Actual conflicts are reserved for system consistency failures such as unsupported answer citations, recommendation bounds violations, or verified links pointing to missing runs.

## Self-audit

`src/lib/self-audit.ts` checks run provenance, proposed-experiment status, recommendation bounds, evidence-asset run resolution, and verified document-link targets. `getSystemTrustSummary()` exposes counts and known limitations for a future trust console.
