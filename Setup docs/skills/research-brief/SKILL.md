---
name: research-brief
description: Run a multi-search research pass and save a structured brief with conflicting sources flagged
trigger: "research <topic> for gravifire", "deep research on <topic>"
do_not_use_for: quick single-fact lookups, anything answerable from Gravifier_research/ already
inputs: topic; existing Gravifier_research/ reports to avoid duplication
outputs: Gravifier_research/<topic>/GRAVIFIRE_<topic>_Deep_Research.md (+ pdf if asked)
---

1. Check `Gravifier_research/` for prior coverage; read the closest report first.
2. Run at least 5 varied web searches; WebFetch the primary sources (NASA PSI
   pages, publications, conference papers).
3. Write the brief with sections: scope, per-source findings, cross-study
   comparison, **conflicting sources flagged explicitly**, implications for
   GRAVIFIRE (what we can/cannot claim), open gaps.
4. Prefer 2024–2026 sources; older only if stable references.
5. Naming: `GRAVIFIRE_<DATASET_OR_TOPIC>_Deep_Research.md`.

## Eval (must pass before saving)
1. "research SAFFIRE-II vents" → brief with per-source findings and a conflicts section.
2. Sources disagree on a number → disagreement shown in a table, not averaged away.
3. Topic already covered in Gravifier_research/ → extends the existing report instead of duplicating.
4. Only pre-2024 sources found → stated as a limitation.
5. "first ever X" style claims → checked against the no-overclaims rule before inclusion.
