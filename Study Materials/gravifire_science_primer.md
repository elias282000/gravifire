# GRAVIFIRE Science Primer — for the computer scientist

Read this before `R5_FINDINGS_DIGEST.md` and the other research documents.
Written for a CS student who knows Python. Every scientific concept gets a
CS analogy, a short explanation, and a "where you'll see it" pointer into
our documents. Nothing here goes beyond what our own data shows.

---

## 1. The problem in one page

Spacecraft materials (fabrics, panels, cables) are approved using fire
tests done **on Earth, in normal gravity**. The implicit assumption: if a
material behaves mildly in the lab, it behaves mildly in orbit.

That assumption is physically suspect. Gravity pulls hot gas up, creating
**buoyant flow** — the rising air you see over any candle. Remove gravity
(like in a spacecraft) and that flow vanishes. A flame loses its free
air supply and must live on whatever ventilation the cabin provides. The
same material can burn *differently* — sometimes milder, sometimes
stranger, occasionally worse.

NASA has flown four experiments to measure this directly:

| Investigation | Where it ran | Scale | What it tested |
| ------------- | ------------ | ----- | -------------- |
| **BASS** (PSI-26) | ISS, Microgravity Science Glovebox, small duct, 2012–2013 | small | many materials, many small tests, suppression |
| **BASS-II** (PSI-25) | ISS, same duct, 2014 | small | focused families: thin films, rods, fabric |
| **SAFFIRE-I** (PSI-98) | free-flying Cygnus cargo craft, large duct, June 14 2016 | large | one large SIBAL fabric fire (2 samples) |
| **SAFFIRE-II** (PSI-99) | Cygnus, large duct, Nov 21–22 2016 | large | 9 material coupons incl. silicone, fabric, thick PMMA |

GRAVIFIRE's question: *for a given scenario (material + flow + oxygen +
duct), can the Earth-based assumption be trusted?* The answer is a verdict:
**SUPPORTED** (evidence agrees), **CONTRADICTED** (evidence disagrees), or
**INSUFFICIENT** (no evidence — the refusal).

**Where you'll see it:** R5 digest §1; every document's framing.

---

## 2. Combustion in fifteen minutes

### 2.1 What a flame actually is

A solid doesn't burn directly. Heat decomposes the solid into gases
(**pyrolysis**), and the gases react with oxygen in a thin zone — that zone
is the flame. So a flame on a solid fuel is a **gas-phase reaction fed by a
solid-state vaporizer**. CS analogy: the solid is a lazy iterator producing
fuel elements; the flame is a consumer that must be fed faster than it
decays.

### 2.2 Flame spread as a feedback loop

Spread means the flame heats fresh fuel ahead of itself until that fuel
pyrolyzes and joins the flame. It's a **self-propagating loop**:

```text
heat -> pyrolysis -> more fuel -> bigger flame -> more heat -> ...
```

The loop can strengthen (**acceleratory** spread — S5's behavior), hold
steady, or break (**extinction/quench**). A **spread rate** in mm/s is the
speed of the burning edge along the sample. Our anchor measurements are
exactly this quantity.

### 2.3 Flow direction changes everything

Airflow along a burning surface comes in two flavors:

```text
OPPOSED (counter-flow):        CONCURRENT (co-flow):
  flow ->                            <- flame
  <- flame                          flow ->
  air hits the flame face-on       flame rides its own hot wake
```

- **Opposed flow**: the flame pushes against fresh cold air. More flow can
  help (feeds oxygen) or hurt (cools the flame). Behavior is non-trivial.
- **Concurrent flow**: the flame spreads in the same direction as the air,
  riding preheated gas. Usually faster, more dangerous.

Same material, same flow speed, opposite direction → different outcome.
This is why our verdict engine tracks `direction` as a domain axis.

### 2.4 Ways a flame dies

- **Quenching**: the flame loses heat faster than chemistry releases it —
  it shrinks and goes out. At very low flow in microgravity, flames lose
  heat by **radiation** (they glow energy away) and can radiatively
  extinguish even with fuel and oxygen present. BASS-II thin films showed
  exactly this.
- **Blowoff**: flow is so fast it tears the flame off the fuel. Rods
  (BASS-II) show a quench-vs-blowoff boundary — too slow dies cold, too
  fast dies blown out, in between survives.
- **Fuel exhaustion / burnout**: the sample is consumed. That's a
  successful burn, not a failure.

### 2.5 Suppression — and the trap

The intuitive suppressant: blow inert gas (nitrogen) at the flame. BASS
found a failure mode: a **N₂ jet can entrain surrounding air** (drag fresh
oxygen-rich air into the jet) and the flame **grows**. Suppression
hardware can feed the fire. This is D8 in the digest.

---

## 3. The materials — a field guide

You'll meet these names constantly. Families stay separate in our store;
never assume results transfer between them.

| Material | Plain description | Why NASA tested it | Appears in |
| -------- | ----------------- | ------------------ | ---------- |
| **PMMA** | Acrylic / plexiglass. The clear plastic of aquariums. | Classic test fuel; well-characterized | BASS-II films/rods/slabs, BASS spheres/slabs, SAFFIRE-II S8/S9 thick slabs |
| **SIBAL** | Cotton-fiberglass fabric (cotton woven with glass). Candidate cabin fabric. | Realistic spacecraft material | BASS, BASS-II, SAFFIRE-I S1/S2, SAFFIRE-II S5/S6 — our strongest family |
| **PDMS / silicone** | The rubbery silicone of gaskets and potting compounds. | Everywhere in hardware; suspected benign | SAFFIRE-II S1–S4 — the surprise (D4) |
| **Nomex** | Aramid (like fire-suit fabric). Flame-resistant by design. | Should resist fire; verify in μg | SAFFIRE-II S7 next to PMMA (D7) |
| **Wax / candles** | Paraffin and Japan wax on fiberglass. | Simple geometry, suppression tests | BASS (the protocol-confounded text case) |
| **Ultem** | Polyetherimide, a tough engineering plastic. | Aerospace staple | BASS (only 2 runs — thin-evidence example) |

Geometry matters as much as chemistry: a **thin film** (0.1 mm) behaves
nothing like a **1 cm slab** of the same plastic, because the slab is a
heat sink that steals energy from the flame. Our registry keys families
like `thin_pmma_film` vs `pmma_thick` for exactly this reason.

---

## 4. Microgravity — what actually changes

No buoyancy. Consequences, all visible in our data:

1. **Flames become spherical and blue.** No rising column of hot gas; the
   flame burns slowly and diffusely around the fuel. Our mapped JPEGs show
   small dim flames (that's why PDMS flames sit near the image noise floor).
2. **Ventilation is life support.** With no natural convection, the only
   oxygen supply is forced flow. Turn the fan down and the flame can
   radiatively extinguish (thin films), stall (PDMS), or persist weakly
   (candles). Flow `cm/s` is therefore a first-class variable everywhere.
3. **Time scales stretch.** Earth flames flicker at ~10 Hz; μg flames
   evolve over tens of seconds. SAFFIRE-I S1 burned **420 s** at a
   quasi-steady crawl — impossible in a 1-g lab at that scale.
4. **Scale and confinement matter.** A flame in a small glovebox duct is
   coupled to the duct walls' flow field differently than in a
   meter-class duct. This is why small→large transfer is *not* free
   (TC-SIBAL-SCALE-01 refuses it), and why SAFFIRE existed at all.

---

## 5. The quantities on our screens

| Quantity | What it is | Instrument / source |
| -------- | ---------- | ------------------- |
| Spread rate (mm/s) | Speed of the burning edge | Derived from video (ours) or NASA's published value |
| Burn length (cm) | How far the sample burned | NASA post-flight analysis (table) |
| Regression rate (mm/s) | Surface recedes without spreading (thick PMMA) | NASA analysis, 0.01–0.04 mm/s |
| O₂ % | Cabin/test-section oxygen | Gas sensors, calibrated |
| Flow (cm/s) | Air speed along the sample | **SAFFIRE: calibrated anemometers. BASS: a display number only** |
| Radiometer flux (mW/cm²) | Radiant heat hitting a sensor | 4 radiometers per sample |
| Thermocouples (TC1–12) | Gas and solid temperatures | 6 plume + 6 sample positions |
| Burn time (s) | Ignition to extinction | Operations record |
| Epoch ms | Unix time in milliseconds — our universal clock | Embedded in image filenames and sensor rows |

**The display-vs-calibrated trap** (hard rule in our system): BASS fan
readings like "66 > 52" are raw instrument display values, not calibrated
cm/s. We never compare them to SAFFIRE's calibrated flows, and the UI
shows a DISPLAY_NOT_CALIBRATED chip. When R5 says a verdict's flow axis
was "non-creditable," this is why.

---

## 6. Data concepts — the CS translations

### 6.1 Provenance = git blame for numbers

Every value in our store keeps `value_raw` (the source string), the source
`file`, the `row`, and `flags`. It's an immutable chain: dashboard number
→ evidence item → `PSI-99_Experimental table_SAFFIRE-2.csv#row7`. The
provenance audit (D3) walked 10 published claims down this chain.

### 6.2 Evidence classes = a type system for trust

```text
MEASURED    sensor/instrument value        (strongest)
DERIVED     NASA computed it from raw data
MODELED     simulation output               (we hold none)
INTERPRETED human reading — incl. NASA operator logs (TEXT_MINED flag)
OPEN        folklore, unverified           (weakest)
```

Verdicts require MEASURED/DERIVED (or NASA's own operator log) to say
SUPPORTED. A literature finding alone returns INSUFFICIENT — that's why
the whole BASS-II study refuses (D11), and that's a feature.

### 6.3 Epoch-ms timestamps

```python
import datetime
datetime.datetime.fromtimestamp(1479773147567 / 1000, datetime.timezone.utc)
# 2016-11-22 00:05:47 UTC  -> SAFFIRE-II Sample 1 sensors start
datetime.datetime.fromtimestamp(1479775442720 / 1000, datetime.timezone.utc)
# 2016-11-22 00:44:02 UTC  -> first S5C1 frame (the filename you see below)
```

Every image filename (`S5C1-1479775442720.jpeg`) and every sensor row
carries one. We verified all clocks agree: 100% of frames fall inside
their sensor windows (R1-Q2). That's D9.

### 6.4 Planned vs as-run

BASS kept a planned test matrix and an as-run log. They differ (tests
skipped, repeated, renumbered). We store both; never confuse them — same
discipline as "the ticket said X, the code does Y."

### 6.5 Source defects we preserve, not fix

Real examples our ingestion flagged instead of silently repairing:

- PSI-99's table has no rate column; the published rates (2.1, 2.6 mm/s)
  sit in the column labeled "Spread **Length**." We keep the source item
  flagged `SOURCE_SCHEMA_DEFECT` plus an INTERPRETED companion item.
- `"037 mm"` (dropped decimal) stays un-parsed: `AMBIGUOUS_NUMERIC`.
- BASS as-run numbers collide (reruns, a numbering reset) → suffixed IDs
  + `DUPLICATE_ASRUN_KEY`.

Think: never `except: pass` on data you don't understand.

### 6.6 Confidence — GRADE, adapted from medicine

Medicine grades evidence quality (study design, consistency, directness).
We adapted four 0–1 dimensions:

| Dimension | CS intuition |
| --------- | ------------ |
| Directness | Does the test actually cover this code path (domain)? |
| Consistency | Do the tests agree, or is one flaky? |
| Precision | How many test cases? (n=1 → 0.6 cap; one condition → 0.7 cap) |
| Class strength | Test tier: integration > unit > anecdote |

Score = min of the four → HIGH (≥0.75) / MODERATE (≥0.5) / LOW.

### 6.7 Conflict taxonomy = merge-conflict resolution rules

```text
TRUE_CONTRADICTION  both sides valid, values genuinely oppose → keep both chains
CONTEXT_DIFFERENCE  "different conditions" — like different environments/flags
SCHEMA_ERROR        the data was corrupted (unit/cell defect) — fix exposure, use companion
UNRESOLVED          can't tell → blocks SUPPORTED/CONTRADICTED (returns INSUFFICIENT)
```

---

## 7. How we measured spread rates (the ±4% story)

Given 9,600 JPEGs of a burn, measure the front's speed:

1. **Detect the flame per frame.** In the sample's strip of the image,
   compute per-column brightness (98th percentile — robust to single hot
   pixels), threshold adaptively (`0.45 × 95th percentile` with a floor),
   take the leftmost surviving column = leading edge. Exposure ramps and
   periodic LED frames are excluded and counted (quality census), never
   interpolated over.
2. **Find the burn window.** The flame's presence fraction (rolling share
   of usable frames) stays high during the burn and collapses into
   post-burn glow; cut there. If the front visibly reaches the sample's
   end, trim at arrival.
3. **Slope = speed.** With (t, front_px), the speed is a slope. We use
   **Theil–Sen** — the median of slopes between many random point pairs —
   because a broken microgravity flame edge flickers and OLS chases
   outliers:

   ```python
   import numpy as np
   rng = np.random.default_rng(0)
   i, j = rng.integers(0, n, 400), rng.integers(0, n, 400)
   dts = t[j] - t[i]
   slopes = (y[j] - y[i]) / dts[dts > 1.0]      # keep well-separated pairs
   slope = np.median(slopes)                    # robust estimate
   ```

4. **Pixels → millimeters (the calibration problem).** Two ways:
   - **Traverse calibration**: the front crossed the whole sample
     (known: 29 cm) between first and last detection, so
     rate = 29 cm / burn-window time. This is the *same derivation NASA's
     table uses* → our +4.0% / +1.6% agreement.
   - **Absolute scale** (image width = sample length): a guess about
     margins → systematically −13..−20% low. NASA's exact calibration
     files are dead links; until they surface, every displayed rate is
     labeled with which calibration it used.

**Where you'll see it:** R4 report Tier 1; R5 §5 uncertainty story.

---

## 8. The verdict engine — semantics in plain words

A **claim** = a domain tuple + an Earth expectation with a predicate
(`PROPAGATES`, `EXTINGUISHES_LOW_FLOW`, `SUPPRESSES`, ...). The engine:

1. Finds runs in the store matching the domain (family, geometry, flow
   bucket, O₂ bucket, scale, direction — display never compared to
   calibrated).
2. Extracts each run's outcome (published values, burn times, or
   text-mined operator logs — class INTERPRETED, capped at MODERATE).
3. Aligns outcomes against the predicate → CONFIRM / CONTRADICT evidence.
4. Applies the verdict rules (needs ≥2 in-domain runs or 1 + corroborating
   literature; zero unresolved conflicts), scores confidence, and for
   INSUFFICIENT names the missing evidence + the test that would change
   it.

**Refusal is a first-class return value** — like a total function that
returns `None` with a reason instead of guessing.

**Where you'll see it:** `verdict_spec.md` (frozen semantics);
`VERDICT_REVIEW.md` (the NASA-engineer review that caught 3 real bugs).

---

## 9. Validation — the testing metaphors are exact

- **Anchor reproduction** = golden tests. Re-derive known published values
  from raw data; our pipeline must land within a stated tolerance
  (it did: ±4%).
- **Blind hold-out** = integration test on unseen data. We concealed all
  SAFFIRE-II outcomes (masked store + masked literature, hashes stamped
  *before* the run) and let the engine predict from BASS/BASS-II/SAFFIRE-I
  only. Metric that matters: **false-SUPPORTED = 0/5**. The one
  cross-study claim it could make (SIBAL), it made correctly.
- **Provenance audit** = trace coverage. 10 published claims walked
  end-to-end: 6 FULL (independent artifact), 4 PARTIAL, 0 FAIL.
- **Type-II-conservative** = fail-safe bias. Every failure mode refuses or
  under-claims; nothing overclaims. For a fire-safety trust tool that's
  the only acceptable profile — and it's a *measured* property, not a hope.

**Where you'll see it:** R4 report (all tiers + the credibility
statement).

---

## 10. Terms you'll hit in the documents — quick glossary

| Term | One-liner |
| ---- | --------- |
| μg / microgravity ("?-g" in mojibake) | near-weightlessness; the `?` in NASA's table is a mangled µ |
| MSG | Microgravity Science Glovebox — the ISS rack with the small duct |
| Cygnus | the cargo craft SAFFIRE burned in, after leaving the ISS |
| Coupon | a test sample (SAFFIRE-II's 9 coupons) |
| Concurrent / opposed | spread with / against the airflow |
| Quench, blowoff | die cold / die torn-off |
| Acceleratory | spread speeding up (S5, S6) |
| Anchored regression | thick sample's surface slowly recedes; no spread (S8/S9) |
| MOC | maximum oxygen concentration a material tolerates (NASA-STD-6001) — we only ever produce a BOUND on tested conditions, never a flight MOC |
| NASA-STD-7009 | NASA's model-credibility standard — our trust-layer vocabulary |
| GRADE | medicine's evidence-grading framework we adapted |
| Theil–Sen | robust slope = median of pair slopes |
| Traverse calibration | px→cm via "front crossed the known sample length" |
| Epoch ms | Unix time in milliseconds; our universal clock |
| SD/sensor series | the 30 Hz calibrated telemetry streams (65 channels) |
| MergeResult | NASA's own frame-inventory workbooks (per-frame epoch lists) |
| Display value | instrument number, NOT calibrated velocity (BASS fans) |
| SCHEMA_ERROR etc. | our conflict-taxonomy classes (§6.7) |
| D1–D11 | the 11 demonstrable claims allowed on screen (R5 §4) |

---

## 11. Suggested reading order from here

1. This primer (done).
2. `R5_FINDINGS_DIGEST.md` — the findings; every term now decodes.
3. `R4_VALIDATION_REPORT.md` — the proof; read Tier 1 with §7 of this
   primer open.
4. `VERDICT_REVIEW.md` — the engine's code review, with real bug stories.
5. `R1_FINDINGS.md` + `R2_CENSUS.md` — the data foundation and its limits.
6. `R6_TRANSLATION/` — where it all lands (script + developer doc).

If a term still blocks you, grep this file first — it's organized to be
the project's dictionary.
