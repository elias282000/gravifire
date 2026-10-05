# Scenario Input Specification — D6 (R3 deliverable)

How the dashboard turns a user scenario into a verdict. The scenario is the
user-facing form of a transfer claim (verdict_spec.md §1); the engine
consumes claims, the UI consumes scenarios. Version 1.0, 2026-10-02.

## Request (what the user picks on screen)

```json
{
  "scenario_id": "SC-DEMO-1",
  "material_family": "SIBAL cotton-fiberglass fabric",
  "geometry": "flat sheet",
  "ventilation": {
    "direction": "concurrent",        // concurrent | opposed
    "flow_cms": 20                    // number; display semantics for small duct,
                                      // calibrated for SAFFIRE-class duct
  },
  "cabin_o2_percent": 21.5,
  "duct": "SAFFIRE-class large",      // or "MSG-class small"
  "earth_basis": "NASA-STD-6001 Test 1 pass / 1-g burn observed",
  "question": "Can the Earth-based flammability assumption be trusted here?"
}
```

Field rules:
- `material_family` must map to an L1 family (the UI offers the registry's
  16 families; anything else routes to the refusal card with nearest domain).
- `duct` sets scale_class; partial-gravity options are deliberately absent —
  the engine refuses them, and the UI should not offer what it cannot answer.
- `earth_basis` is free text + type tag (STD_TEST | MEASURED_GROUND |
  LITERATURE); it becomes the claim's earth_expectation.
- The UI never asks for expected outcomes — the user states the Earth
  assumption, the engine states the μg answer.

## Mapping to a claim (deterministic, client-side)

| Scenario field | Claim field |
| -------------- | ----------- |
| material_family → registry key | family |
| geometry | geometry_class |
| ventilation.direction | flow_regime.direction |
| flow_cms → bucket (`<1 | 1–5 | 5–25 | >25`) | flow_regime.bucket |
| cabin_o2_percent → bucket (`<18 | 18–20 | 20–22.5 | >22.5`) | oxygen_regime.bucket |
| duct → small/large | scale_class |
| earth_basis | earth_expectation (predicate chosen by the UI from a labeled list; never inferred silently) |

## Response (what the UI renders)

The engine output (verdict_spec.md §7). Rendering contract per demo beat:
1. **Verdict banner** — SUPPORTED (green) / CONTRADICTED (red) /
   INSUFFICIENT (amber "we refuse to answer — and here is why").
2. **Confidence chip** — HIGH/MODERATE/LOW with the four dimension bars.
3. **Evidence drill-down** — every row: run id, source file#row, evidence
   class, flags (DISPLAY_NOT_CALIBRATED, TEXT_MINED, PUBLISHED_VALUE...).
4. **What would change it** — always visible, not hidden behind a tooltip.
5. **Refusal card** (INSUFFICIENT only) — missing evidence + nearest tested
   domain + suggested next test.

No-fake-numbers rule: the UI renders only values present in the engine
output; it never computes, converts, or averages on its own.

## Demo scenario pack (v1 video + B1 scaffolding)

| scenario | claim | expected verdict | beat |
| -------- | ----- | ---------------- | ---- |
| SC-DEMO-1 SIBAL sheet, concurrent 20, 21.5%, large | TC-SIBAL-LG-01 | SUPPORTED / HIGH | the 15-second wow |
| SC-DEMO-2 PDMS sheet, concurrent 20, ~22%, large | TC-PDMS-01 | CONTRADICTED / MODERATE | the surprise |
| SC-DEMO-3 PDMS sheet, concurrent 20, 30% O2, large | TC-PDMS-03 | INSUFFICIENT (refusal) | the memory line |
| SC-DEMO-4 Nomex adjacent to PMMA, large | TC-NOMEX-01 | CONTRADICTED / MODERATE | the cascade story |
