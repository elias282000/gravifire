# FLEX / PSI-69 data pipeline

GRAVIFIRE ingests the locally downloaded `PSI-69_Experimental table_FLEX.csv` as the authoritative run-level artifact for NASA’s Flame Extinguishment Experiment.

## Source and encoding

The source is the PSI-69 Experimental Table. The file contains Windows-1252 characters, including an en dash used as a source status. Ingestion attempts strict UTF-8 first and falls back to CP1252 without converting the dash to zero, blank, or missing.

The current artifact contains 274 rows and FLEX Test # values 1–274. NASA/TP-2015-216046 describes 284 tests. GRAVIFIRE records this as an unresolved source-scope difference and does not fabricate Tests 275–284.

## Identity

FLEX Test # is the unique run identity. FLEX Identifier is retained as an engineering identifier but is not unique: `193F001` appears for Tests 70 and 73. Queries by that identifier remain ambiguous.

## Scientific mappings

The raw 15 headers are preserved. NASA/TP-2015-216046 supplies two explicit semantic mappings:

- the raw `CO initial ambient composition` field is represented internally as CO₂ mole fraction;
- the incomplete `Burning rate; mm` header represents an average droplet D²-law burning-rate constant in mm²/s.

These mappings do not rewrite the raw CSV. Burning rate is never presented as mm, mm/s, or flame-spread rate.

Gas values remain mole fractions. A percentage display, where used, is only the deterministic representation `fraction × 100`.

## Missing and special values

- source en dash in initial or extinction diameter is preserved as `SOURCE_DASH`;
- blank is `NOT_REPORTED`;
- numeric zero remains a numeric zero;
- `~6` and `~9` burn times remain `APPROXIMATE`;
- missing GMT does not reject a run;
- Test 114 pressure remains 0 mmHg with a source anomaly warning.

Test-end categories are preserved as EXTINCTION, DISRUPTION, and COMPLETION. They are source termination categories, not safety scores or causal conclusions.

## Scope

Currently ingested fields include pressure, O₂, N₂, CO₂-context, He, initial droplet diameter, visible flame extinction diameter where reported, burning-rate constant, burn time, and test-end status. Raw video, full droplet histories, radiometry, temperatures, soot, OH imaging, and detailed model outputs are not yet ingested into GRAVIFIRE.

The dataset supports direct source questions such as whether a named test ended in Extinction. It does not by itself support claims about suppressant effectiveness, causal explanations, safety, or prediction between tests.
