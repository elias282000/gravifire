---
name: psi-manifest-check
description: Fetch and size-check a PSI study file manifest before any download decision
trigger: "check PSI manifest", "how big is PSI-XX", "what files are in PSI-XX"
do_not_use_for: downloading files (use psi-science-set-download), anything not NASA PSI
inputs: PSI study id (e.g. PSI-25); existing manifests in psidata/manifests/
outputs: updated psidata/manifests/<id>.json + a size summary table (science set vs raw) for the user
---

1. `GET https://psi.nasa.gov/geode-py/ws/repo/investigations/<id>/versions` and save the JSON to `psidata/manifests/<id>.json`.
2. Sum every `file_size` grouped by extension. Report: raw total, science-set total (csv/xlsx/pdf/docx/pptx), video total.
3. Compare against free disk space (`df -h /home`) and the constraints in the root `CLAUDE.md §Hard rules` — never propose a full raw download.
4. Present the table and ask for confirmation before any download.

## Eval (must pass before saving)
1. "check the PSI-25 manifest" → manifest saved + table showing ~549 GB raw vs science subset, with a confirm-before-download question.
2. "how much space would PSI-99 need?" → ~17 GB raw figure with the science-set-only figure alongside.
3. "download all of PSI-26" → refusal to bulk-download raw with sizing justification, offer science-set path.
4. "what's in PSI-98?" → file-type/size breakdown from the manifest.
5. "check manifest for PSI-300" → clean not-found handling.
