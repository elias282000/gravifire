# GRAVIFIRE NASA Data Pipeline

GRAVIFIRE treats NASA Physical Sciences Informatics (PSI) material as a provenance-preserving ingestion pipeline:

`NASA PSI → acquisition → raw immutable source → SHA-256 → parse → normalize → validate → provenance → valid dataset → GRAVIFIRE`

## BASS-II source

The checked-in manifest is `data/nasa/manifests/psi-25-bass-ii.json`. It records the verified investigation metadata for PSI-25 and the official source URL. It does not claim that run-level files are available. NASA PSI HTML is not treated as a stable API, and this pipeline does not assume an AWS S3 mirror.

Place manually downloaded, source-preserved files in `data/nasa/raw/bass-ii/` (the adapter also supports the existing repository-local `src/data/nasa/raw/bass-ii/` location), then run:

```bash
pnpm ingest:bass-ii
```

The BASS-II adapter currently supports the verified Experimental Table CSV schema. Other files are registered with their filename, hash, and status but are not interpreted. JSON, TXT, video, PDF, PowerPoint, DOCX, and other formats require a separately verified parser before they can enter the validated dataset.

## Integrity rules

- No scientific values are invented or filled with defaults.
- Raw values and source fields are retained in provenance.
- Unit conversions are deterministic and preserve the original unit and conversion rule.
- Missing fields are represented with an explicit `UNKNOWN` field status when the source does not distinguish why a value is absent.
- Ambiguous controlled-vocabulary values remain raw and receive a review warning.
- Every local source file is SHA-256 hashed in `data/nasa/manifests/psi-25-bass-ii.processed.json`.
- Invalid and duplicate records are preserved in `rejected-runs.json` with their raw record and location.
- Only `valid-runs.json` is imported by the application, and validated records are marked `REAL_NASA_DATA`.

## Outputs

The ingestion command writes:

- `data/nasa/normalized/bass-ii/valid-runs.json`
- `data/nasa/normalized/bass-ii/rejected-runs.json`
- `data/nasa/normalized/bass-ii/ingestion-report.json`
- `data/nasa/manifests/psi-25-bass-ii.processed.json`

With no local source files, the correct output is zero valid runs, zero rejected records, and a warning in the report. The application continues to show its run-level empty state.

## Evidence assets

Evidence files are scanned from `data/nasa/raw/bass-ii/evidence/` and the repository-local `src/data/nasa/raw/bass-ii/evidence/` fallback. BASS-II evidence filenames are parsed conservatively for explicit `TEST_...` and `SAMPLE_...` tokens. A linked asset requires both identifiers to match the validated table record; test-only matches remain partial and sample conflicts remain unmatched.

The generated evidence metadata contains hashes and safe relative paths, never embedded binary content. The application serves only listed assets through `/api/evidence/bass-ii/[assetId]`, with MP4 range support for browser playback.
