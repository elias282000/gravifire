---
name: psi-science-set-download
description: Download only the science files (csv/xlsx/pdf/docx/pptx) of a PSI study via presigned S3 URLs
trigger: "download the science set", "get PSI-XX tables and docs"
do_not_use_for: raw video/telemetry zips, bulk raw downloads, unconfirmed downloads
inputs: study id; manifest at psidata/manifests/<id>.json; user confirmation after sizing check
outputs: files under psidata/<id>/Science Data/, rows appended to psidata/download_log.tsv
---

1. Run psi-manifest-check first; get explicit user confirmation of the size.
2. For each science file in the manifest, `GET https://psi.nasa.gov/geode-py/ws/studies/<id>/download?file=<BASENAME>&redirect=false` — **basename only**, not the s3_path.
3. Download from the presigned URL to `psidata/<id>/Science Data/<path>`, resuming past completed entries via `download_log.tsv`.
4. Verify each file's size against the manifest; log date, file, expected/actual size, status.
5. Report summary: files fetched, bytes, any failures with retry plan.

## Eval (must pass before saving)
1. "download the PSI-25 science set" → only after a sizing confirmation; log rows written.
2. Interrupted run re-invoked → skips already-logged files.
3. S3 URL expired mid-run → refreshes the presigned URL and continues.
4. "download all PSI-25 raw data" → refused, routed to psi-manifest-check sizing.
5. Checksum/size mismatch → file flagged in the log, not silently kept.
