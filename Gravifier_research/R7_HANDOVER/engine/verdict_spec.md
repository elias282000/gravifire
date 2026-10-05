# Verdict Specification — GRAVIFIRE evidence-transfer engine (FROZEN v1.1)

Frozen 2026-10-02 at R3 entry. Changes after freeze require a gate log entry.
The engine is deterministic rule-based evidence synthesis over the L1 store
(`Gravifier_research/evidence_store/gravifire_l1.db`) plus a cited
literature register. No statistical learning inside the verdict path —
every fired rule is traceable (rule_trace in every output).

Changelog: v1.1 (same day, seed-claim exercise) — §2(a) extended to admit
INTERPRETED items flagged PRIMARY_OPERATOR_LOG (NASA's own as-run outcome
notes) as confirmatory evidence; motivation logged in the gate decision log.
v1.0 initial freeze.

## 1. Transfer claim (L2) grammar

```json
{
  "tc_id": "TC-PDMS-01",
  "family": "pdms_silicone",            // L1 family registry key
  "geometry_class": "sheet",             // sheet|thin_sheet|slab|rod|sphere|candle|curved_section
  "flow_regime": {"direction": "concurrent", "bucket": "moderate"},
  "oxygen_regime": {"bucket": "normal"}, // depleted_lt18|low_18_20|normal_20_22|enriched_gt22
  "scale_class": "large",                // small (MSG duct) | large (SAFFIRE duct)
  "earth_expectation": {
    "statement": "PDMS sheet ignites and propagates (1-g complete burn)",
    "predicate": "PROPAGATES",           // see §2 predicates
    "source": "PSI-99 table 1-g columns; Niehaus 2015",
    "source_type": "MEASURED_GROUND"     // MEASURED_GROUND|STD_TEST|LITERATURE
  },
  "question": "Does this Earth-based expectation hold in microgravity?"
}
```

Flow buckets (cm/s, display values usable only as display; SAFFIRE values are
calibrated duct flow): `very_low_lt1`, `low_1_5`, `moderate_5_25`,
`high_gt25`. Buckets compare display-to-display (BASS vs BASS) or
calibrated-to-calibrated (SAFFIRE vs SAFFIRE); display is never compared to
calibrated (hard rule).

### Expectation predicates
| Predicate | Meaning (Earth expectation) |
| --------- | ---------------------------- |
| PROPAGATES | ignition leads to sustained spread |
| NO_PROPAGATION | ignition does not lead to spread |
| EXTINGUISHES_LOW_FLOW | flame quenches when flow drops |
| SUPPRESSES | suppressant jet extinguishes the flame |
| SPREAD_RATE_MATCHES | μg spread rate ≈ 1-g rate (tolerance band ±50%) |
| NON_MONOTONIC_FLOW | spread rate non-monotonic in flow |
| REGRESSION_ANCHORED | no spread; slow surface regression only |
| THERMAL_HISTORY_INSENSITIVE | preheating does not change outcome |

## 2. Verdict semantics

| Verdict | Requires (all three) |
| ------- | -------------------- |
| **SUPPORTED** | (a) ≥1 in-domain μg evidence item of class MEASURED or DERIVED aligned with the expectation predicate — INTERPRETED items qualify only when flagged `PRIMARY_OPERATOR_LOG` (NASA's own as-run outcome text); (b) zero unresolved in-domain contradictions after conflict check (§4); (c) ≥2 in-domain runs OR 1 run + corroborating literature register entry (single-run SAFFIRE conditions never alone exceed MODERATE confidence) |
| **CONTRADICTED** | (a) ≥1 in-domain μg MEASURED/DERIVED item opposite to the predicate; (b) conflict check classifies the opposition TRUE_CONTRADICTION or the evidence is unambiguous (n≥2 same-direction); (c) the Earth side of the claim has its own cited source (no strawman Earth expectations) |
| **INSUFFICIENT** | anything else — no in-domain evidence; model/literature-only support; unresolved in-domain conflict; out-of-domain query. **Must name `missing_evidence` (what dataset/run type would fix it) and `what_would_change_it`.** |

Sub-grades on threshold-like results: `EXACT` / `BOUND` / `PASS-FAIL` /
`ESTIMATE` / `HYPOTHESIS`. Rule: a single SAFFIRE-II condition is never a
flight MOC — reported as `BOUND` on the tested condition axis.

## 3. Confidence (GRADE-adapted)

Four dimensions, each 0..1; confidence = min(dimension caps), then mapped:
≥0.75 **HIGH**, ≥0.50 **MODERATE**, else **LOW**.

| Dimension | Definition | Cap rules |
| --------- | ---------- | ---------- |
| directness | 1 − 0.25×(axes_off) over {family, geometry, scale, flow, O2} | out-of-domain ⇒ verdict INSUFFICIENT regardless |
| consistency | 1 − 0.5×(contradicting in-domain runs / total) − 0.5×unresolved_conflicts | any unresolved in-domain conflict ⇒ verdict INSUFFICIENT |
| precision | 0.4 + 0.2×min(n_in_domain_runs, 3) measured; literature-only ⇒ 0.3 | n=1 ⇒ 0.6 (MODERATE ceiling); n≥3 ⇒ 1.0 |
| class strength | strongest aligned evidence class: MEASURED 1.0, DERIVED 0.8, INTERPRETED 0.5, OPEN 0.2 | mixed classes report strongest + count of weaker |

Text-mined BASS outcomes are INTERPRETED (flag `TEXT_MINED`); published NASA
values in the table are DERIVED; sensor/telemetry-sourced values MEASURED.
For INSUFFICIENT verdicts the reported confidence means *confidence in the
refusal itself* (how well-evidenced the "evidence is absent/mixed" reading
is), not confidence in any outcome.

## 4. Conflict taxonomy

| Class | Meaning | Action |
| ----- | ------- | ------ |
| TRUE_CONTRADICTION | same domain, same quantity, opposite values, no unit/schema/context explanation | both provenance chains kept; verdict may proceed to CONTRADICTED |
| CONTEXT_DIFFERENCE | values differ because conditions differ (rerun, campaign, as-run numbering) | annotate, do not pool; verdict unaffected |
| SCHEMA_ERROR | source-table defect explains the apparent conflict (unit, column mislabel) | expose + use INTERPRETED companion item |
| UNRESOLVED | cannot classify with held evidence | blocks SUPPORTED/CONTRADICTED on that axis ⇒ INSUFFICIENT |

Conflict register seeded from R2: CR-1 PSI-99 rate-in-length-column
(SCHEMA_ERROR, resolved via companion item); CR-2 PSI-98 0.37 cm vs PSI-99
0.37 mm thickness (UNRESOLVED on units — behavior verdicts unaffected,
geometry axis carries flag); CR-3 BASS as-run collisions (CONTEXT_DIFFERENCE,
suffix keys).

## 5. Refusal semantics

The engine REFUSES (verdict INSUFFICIENT + `refusal: true`) when: family not
in the L1 registry; scale_class beyond the two ducts; partial gravity;
microgravity duration outside tested windows; oxygen bucket with zero
in-domain runs. A refusal always names the nearest tested domain
(`nearest_domain`) and the missing evidence type. Refusal is a first-class
output, not an error state.

## 6. NASA-STD-7009 mapping (trust-layer vocabulary)

| GRAVIFIRE artifact | NASA-STD-7009B concept |
| ------------------ | ---------------------- |
| MEASURED item + source row | "actual data with pedigree" |
| DERIVED (NASA-published) item | "results derived from actual data" |
| INTERPRETED (text-mined / companion) item | "expert judgment with documented basis" |
| Confidence HIGH/MODERATE/LOW | qualitative maturity of the evidence set |
| BOUND grade on thresholds | "applicability limited to tested conditions" |
| rule_trace + evidence list | verification/traceability expectation |
| R4 hold-out + anchor reproduction | validation evidence for the engine itself |

## 7. Engine I/O contract

Input: claim JSON (§1) — or a scenario (D6 spec) mapped 1:1 onto a claim.
Output per claim:

```json
{
  "tc_id": "...", "verdict": "SUPPORTED|CONTRADICTED|INSUFFICIENT",
  "confidence": "HIGH|MODERATE|LOW",
  "grade": "EXACT|BOUND|PASS-FAIL|ESTIMATE|HYPOTHESIS|null",
  "evidence": [{"run_id","item","value","class","flags","source",
                "domain_distance","role":"CONFIRM|CONTRADICT|CONTEXT|LITERATURE"}],
  "conflicts_considered": ["CR-1 ..."],
  "missing_evidence": ["..."], "what_would_change_it": ["..."],
  "nearest_domain": "..." , "refusal": false,
  "rule_trace": ["R-MATCH family=pdms_silicone runs=4", "R-OUTCOME ...", ...]
}
```

## 8. Scenario input (D6)

A dashboard scenario maps onto a claim with user-facing names:

```json
{
  "scenario_id": "SC-DEMO-1",
  "material_family": "SIBAL cotton-fiberglass fabric",
  "geometry": "flat sheet 29x5 cm",
  "ventilation": {"direction": "concurrent", "flow_cms": 20},
  "cabin_o2_percent": 21.5,
  "duct": "large (SAFFIRE-class)",
  "earth_basis": "NASA-STD-6001 Test 1 pass / 1-g burn observed",
  "question": "Can the Earth-based flammability assumption be trusted here?"
}
```

Response = §7 output. The UI must render verdict + confidence + evidence
drill-down + what-would-change-it; INSUFFICIENT renders as the refusal card.
