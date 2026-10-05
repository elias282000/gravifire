# GRAVIFIRE — Video Script v2 (fully evidenced)

240 seconds. Script version v2 per `Setup docs/roadmap.md §4`: real
validation numbers, hold-out reveal, uncertainty story. Every factual
narration line carries its source in the claim-map column — only D1–D11
(from `Gravifier_research/R5_FINDINGS_DIGEST.md §4`) and artifacts may back
an on-screen claim. Style: `Setup docs/anti-ai-writing-style.md`.
Narration ≈ 500 words. Screens shown before B3 exists are engine-output
mockups of real data, labeled "engine output" on screen.

## Beat table

| Time | Beat | Narration | On screen | Claim source |
| ---- | ---- | --------- | --------- | ------------ |
| 0:00–0:08 | WHO | A fire-safety engineer is approving a material for a spacecraft cabin. Her only screening tool is a test done on Earth. | Engineer at desk; material spec sheet; "Test 1: PASS" | — (framing) |
| 0:08–0:24 | WHY | A wrong flammability call inside a spacecraft can be lethal, and Earth tests are the only cheap screen we have. The question that decides her approval: does an Earth answer survive microgravity? | Earth test → spacecraft cabin split screen; question types out | — (framing); problem per gate §2 |
| 0:24–0:40 | WHY (cont.) | NASA has already run the experiments — four investigations, 261 combustion runs, decades of microgravity fire data. But the answer for a specific scenario still hides inside archives. | BASS, BASS-II, SAFFIRE-I, SAFFIRE-II cards; counter to 261 | D10 (261 runs; R2_CENSUS) |
| 0:40–0:52 | WHAT | GRAVIFIRE is not another flame predictor. It is an evidence system: scenario in, verdict out — supported, contradicted, or insufficient — with a source on every number. | Title; three verdict states; verdict chips | R3 spec §1–2; gate §3 |
| 0:52–1:07 | **15-second wow** | She types her scenario: SIBAL fabric, twenty centimeters a second, normal air, large duct. The NASA evidence appears. The engine checks her Earth assumption against it. | Screen recording: scenario form → evidence list floods in → rule trace → verdict lands: **SUPPORTED — HIGH confidence** | D6 spec SC-DEMO-1; TC-SIBAL-LG-01 |
| 1:07–1:24 | HOW (1) | Underneath: one evidence store. 261 runs, 3,176 evidence items — every value keeps its source file and row, its unit, and its honesty flags. Sensor streams and camera frames share one clock across two flights. | Store UI: provenance drill-down, file#row highlight; timeline 2016 | D10; D9 (one clock; R1 Q1/Q2) |
| 1:24–1:44 | HOW (2) — the surprise | Now the material that shocked NASA. PDMS silicone burns completely in one-g tests. In microgravity it ignites — and stalls. All four flight samples. The system marks the Earth assumption contradicted. | PDMS demo: Earth "complete burn" vs μg frames; verdict **CONTRADICTED**; 4/4 coupon cards | D4 (PSI-99 rows 2-1..2-4; imagery stall ×4) |
| 1:44–2:00 | HOW (3) — the refusal | Ask it about PDMS in a thirty-percent-oxygen cabin — and it refuses. Not an error. A first-class answer: no NASA evidence exists for that condition. It names the missing test and the nearest tested domain. | Refusal card: **INSUFFICIENT**; "missing: enriched-O2 PDMS test"; nearest domain | D5 (TC-PDMS-03) |
| 2:00–2:18 | PROOF (1) — measurement | Can you trust the numbers? We re-measured NASA's published spread rates from the raw flight frames: two point one eight against a published two point one. Two point six four against two point six. And every rate is labeled with its calibration. | Anchor chart: 2.18 vs 2.1 (+4.0%), 2.64 vs 2.6 (+1.6%); calibration label visible | D1, D2 (r4_tier1_anchors) |
| 2:18–2:34 | PROOF (2) — the blind test | Then we blinded it. Hid SAFFIRE-II completely and asked again. It still called SIBAL right — from one prior flight. And for the four materials it could not know, it refused. Zero false supports. | Hold-out reveal: 5 cards flip; "0/5 false-SUPPORTED"; pre-reveal hash shown | D6 (r4_tier2_holdout; stamp) |
| 2:34–2:46 | PROOF (3) — traceability | Ten published NASA claims, traced end to end through our system. Ten resolved chains. Six rest on our own independent measurements. | Provenance audit screen: 6 FULL / 4 PARTIAL / 0 FAIL | D3 (r4_tier3_provenance) |
| 2:46–2:58 | SO WHAT | The system also says what NASA should test next, ranked by information gained: PDMS in exploration-atmosphere oxygen. SIBAL opposed flow at full scale. The next experiment is a decision, not a guess. | Next-experiment stub: ranked list with rationale | R5 §6 items 1–3 |
| 2:58–3:10 | Close | GRAVIFIRE. Evidence verdicts for spacecraft fire safety — with the uncertainty stated, the sources shown, and the limits kept. It knows when NASA evidence is not enough. | Title; memory line types out; team credit | memory line (gate §3) |

*(Total 190 s of narration beats + 50 s buffer for pacing, transitions, and
the wow moment to breathe. Cut order if over: trim HOW(1) store detail first,
never PROOF beats.)*

## The 15-second wow (protected)

0:52–1:07, beats 1–4 of the gate's demo contract: scenario entered → NASA
evidence appears → method processes → verdict lands. If a viewer sees one
thing, it is this.

## Memory line

**"It knows when NASA evidence is not enough."** Spoken once, at the close;
never paraphrased elsewhere in the script.

## Narration script (clean read)

A fire-safety engineer is approving a material for a spacecraft cabin. Her
only screening tool is a test done on Earth. A wrong flammability call
inside a spacecraft can be lethal — and Earth tests are the only cheap
screen we have. The question that decides her approval: does an Earth
answer survive microgravity?

NASA has already run the experiments. Four investigations, 261 combustion
runs, decades of microgravity fire data. But the answer for a specific
scenario still hides inside archives.

GRAVIFIRE is not another flame predictor. It is an evidence system:
scenario in, verdict out — supported, contradicted, or insufficient — with
a source on every number.

She types her scenario: SIBAL fabric, twenty centimeters per second, normal
air, large duct. The NASA evidence appears. The engine checks her Earth
assumption against it. Supported — with high confidence, and the evidence
one click away.

Underneath, one evidence store: 261 runs, 3,176 items, every value keeping
its source file and row, its unit, and its honesty flags. Sensor streams
and camera frames share one clock across two flights.

Now the material that shocked NASA. PDMS silicone burns completely in
one-g tests. In microgravity it ignites — and stalls. All four flight
samples. The Earth assumption: contradicted.

Ask about PDMS in a thirty-percent-oxygen cabin, and it refuses. Not an
error — a first-class answer. No NASA evidence exists for that condition.
It names the missing test and the nearest tested domain.

Can you trust the numbers? We re-measured NASA's published spread rates
from the raw flight frames: two point one eight against a published two
point one. Two point six four against two point six. Every rate labeled
with its calibration.

Then we blinded it — hid SAFFIRE-II completely and asked again. It still
called SIBAL right, from one prior flight. For the four materials it could
not know, it refused. Zero false supports.

Ten published NASA claims traced end to end. Ten resolved chains. Six rest
on our own independent measurements.

And the system says what NASA should test next, ranked by information
gained: PDMS in exploration-atmosphere oxygen; SIBAL opposed flow at full
scale. The next experiment becomes a decision, not a guess.

GRAVIFIRE. Evidence verdicts for spacecraft fire safety — uncertainty
stated, sources shown, limits kept. It knows when NASA evidence is not
enough.

## Production notes (honesty labels)

1. Screens before B3 exists show **real engine outputs** rendered in a
   mockup shell; on-screen label "engine output" in the corner. No fake
   dashboards.
2. The hold-out hash is shown on screen (from `r4_holdout_stamp.json`).
3. All numbers in narration match `r5_exit_checks.py`-verified values; if
   any number changes on re-run, the script number changes or the shot is
   cut — never silently kept.
4. Guardrails from R5 §7 apply verbatim (no "first ever", no safe/unsafe,
   PDMS phrased "ignited (per telemetry), then stalled").
5. Credits: NASA PSI (PSI-25/26/98/99), the four investigation teams,
   open-source libraries; NASA imagery credits per PSI guidelines.
