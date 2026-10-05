# Decision Gate — GRAVIFIRE winner shape

How to validate any project choice before building it. Distilled on
2026-10-02 from two strategy decks (sources in §11). This file is a
standing instruction to the agent: every decision Elias brings goes through
this gate before it is acted on.

## 1. How the gate works

When Elias proposes anything — a feature, a dataset, a stack, a screen, a
pitch line — the agent answers with a verdict and a reason. Never approve
silently.

| Verdict | Meaning | Use when |
| ------- | ------- | -------- |
| **FOCUS** | Keep it and double down | It strengthens the core question and passes §5 |
| **REDUCE** | Cut it, or keep it out of the demo | It widens scope without adding decision value |
| **CHANGE** | Reframe it before building | The intent is right, the shape is wrong |

Gate rules:

- Name the checklist item (§5) or anti-pattern (§6) that triggered the
  verdict. No unexplained verdicts.
- Log every verdict in §10. Never delete log rows.
- If two options both pass, pick the one with the stronger 15-second demo
  (§8).
- This gate adds to the root `CLAUDE.md §Hard rules`; it never overrides
  the no-overclaim and provenance rules.

## 2. The thesis

> Use NASA data to answer one narrow, important question, then prove the
> answer is trustworthy. (Deck 1, slides 2 and 16)

The formula behind strong winners 2023–2025: important problem + NASA data
+ method + useful result + validation + memorable presentation. The winning
project is not the largest one. It is the clearest useful transformation of
NASA data into a decision a judge can repeat after the room empties.

The pattern held while the details changed: 2023 rewarded one narrow
NASA-data problem solved deeply; 2024 added a visible trust mechanism on a
sharp decision; 2025 demanded one clear award identity and one useful step
beyond the challenge statement.

## 3. The GRAVIFIRE winner shape

Target state, fixed. Every choice moves toward this or away from it.

> Do not build a generic fire dashboard. Build a scientific trust workflow.
> (Deck 1, slide 15)

| Layer | Locked value |
| ----- | ------------ |
| User (one) | Fire-safety or materials engineer who approves spacecraft materials |
| Question (one) | Can Earth-based material flammability assumptions be trusted under this microgravity scenario? |
| Mechanism (one) | Evidence-aware inference: compare ground vs microgravity behavior across the four studies |
| Decision | supported / contradicted / insufficient — per material and scenario |
| Trust layer | Uncertainty plus full provenance lineage on every number |
| Extension (one) | Next-experiment recommendation: which test would reduce uncertainty most? |
| The memory | "It knows when NASA evidence is not enough." |

Notes:

- Deck 1 slide 15 lists "Saffire, BASS, SoFIE and related evidence". Our
  downloaded science set is PSI-25/26/98/99: BASS-II, BASS, SAFFIRE-I,
  SAFFIRE-II. Cite SoFIE as literature only, never as analyzed data.
- The extension layer is the "one meaningful step beyond the challenge"
  (Deck 1, slide 7): scientific search → evidence-backed inference. It is
  what gives the project identity beyond compliance with the brief.
- The standout mechanism and the trust layer overlap on purpose: refusing
  to answer when evidence is insufficient is both the trust feature and the
  sentence judges repeat (Deck 1, slide 8).

## 4. Data discipline

The order of operations after data arrives (Deck 1, slide 5). Skipping
straight to charts is the classic failure.

1. **Understand** — variables, units, limits, missing values.
2. **Structure** — align the data around the one question.
3. **Transform** — apply the method (here: cross-study evidence
   comparison, not black-box prediction).
4. **Validate** — test accuracy, uncertainty, failure cases.
5. **Decide** — produce the supported / contradicted / insufficient call.
6. **Visualize** — communicate the result.

Key rule: visualization is the communication layer, not automatically the
contribution. A beautiful visualization helps only after the data has
produced a useful decision.

## 5. The seven-point checklist

Run every decision through these (Deck 1, slide 6). A choice passing fewer
than five needs REDUCE or CHANGE unless it is infrastructure that serves a
passing choice.

1. **Impact** — does it matter to the one user in §3?
2. **NASA dependency** — would the project break without NASA data? Direct
   input, not decoration.
3. **Narrow scope** — does it solve one part deeply instead of many parts
   thinly?
4. **Decision value** — does it move the verdict, the uncertainty estimate,
   or the next-experiment call?
5. **Validation** — can we prove it works with a test, a metric, or a
   source trace?
6. **Demo strength** — can its value show in seconds inside the demo beats
   (§8)?
7. **Award identity** — which award category does it strengthen? "Generic
   excellence" is not a category.

## 6. Anti-patterns (instant verdicts)

From Deck 1 slide 10 ("what works / what does not") and Deck 2 slide 12
(GRAVIFIRE weak version: "looks impressive, but could still stop at Global
Nominee"). Any of these shapes in a proposal gets REDUCE, or CHANGE when
the underlying intent is worth keeping.

| Proposal shape | Verdict | Why |
| -------------- | ------- | --- |
| Chatbot | REDUCE | Parallel product; strengthens no core decision |
| Experiment browser as centerpiece | REDUCE | Generic dashboard; NASA data as decoration |
| 3D flames / flame simulator | REDUCE | Wow without decision value |
| Moon mode / Mars mode | REDUCE | BASS-II did not establish partial-gravity behavior; breaks the no-overclaim rule and the winner shape at once |
| "AI predictor" for flame behavior | CHANGE | Prediction is NASA's own lane (Liao 2023–2026); reframe as evidence comparison with uncertainty |
| More features for more user groups | REDUCE | Too many user groups is a listed failure pattern; we have one user |
| Reports / AR / extra modules | REDUCE | Feature overload; every parallel feature dilutes the one decision |
| NASA data bolted onto an existing tool late | CHANGE | Invert it: start from the data, end at the decision |
| Tech-first story ("we used AI, ML, 3D…") | CHANGE | Start from the problem; pitch order is §8 |

## 7. Feature discipline

From Deck 2 slide 11. Feature count is not the scoring function. Every
feature must strengthen the same core decision.

**Keep:** the engineer-centered story; the one core workflow (scenario in →
verdict out); cross-study and ground-vs-microgravity comparison views;
uncertainty shown beside every number; provenance drill-down; the
next-experiment recommendation.

**De-emphasize or cut:** a generic chatbot; unguided dataset browsing;
several weak predictions; any feature with no validation story; AR or 3D
that does not improve the decision.

## 8. Demo and pitch contract

Design the demo while building, not after (Deck 1, slide 11). Decide the
15-second wow moment early and protect it.

The six demo beats:

1. User enters a real scenario (material + spacecraft conditions).
2. NASA data appears (the experiments behind the question).
3. The method processes it (ground vs microgravity comparison).
4. A clear verdict appears (supported / contradicted / insufficient).
5. The user asks why.
6. NASA evidence backs it (drill-down to study, run, source file).

The 15-second wow is beats 1–4. If the core value needs a paragraph of
explanation, the shape is wrong — CHANGE.

The 240-second pitch (Deck 1, slide 12), in order: WHO (fire-safety
engineer approving materials) → WHY (a wrong flammability call in a
spacecraft is lethal, and Earth tests are the only cheap screen) → WHAT
(evidence-boundary dashboard) → HOW (NASA combustion experiments, ground vs
microgravity comparison) → PROOF (held-out checks, uncertainty, source
trace) → SO WHAT (what NASA should test next). Do not start with tools.

## 9. Trust requirements (non-negotiable)

From Deck 1 slide 9 and Deck 2 slides 6–7. At global level, "the app works"
is not enough. The YottaByte gap was exactly this: prototype evidence was
stronger than validation evidence.

- **Validation** — held-out checks with named metrics. For GRAVIFIRE: hold
  out experiments or a whole study, check whether the verdicts reproduce
  published findings, and report agreement, misses, and calibration.
- **Uncertainty** — every verdict and rank carries a confidence, and the
  UI shows what would change it.
- **Evidence check** — the lineage chain stays visible: dataset name →
  variable → units/resolution → processing → result → decision (Deck 2,
  slide 6). Same as root `CLAUDE.md` hard rule 2.
- **Failure logic** — "insufficient evidence" is a first-class output, not
  an error state. Refusing out-of-scope questions is the standout
  mechanism.

## 10. Decision log

| Date | Decision brought | Verdict | Trigger / reason |
| ---- | ---------------- | ------- | ---------------- |
| 2026-10-02 | Gate created from the two strategy decks | — | baseline |
| 2026-10-02 | Research plan (`Setup docs/research_plan.md`): master RQ = evidence-transfer verdicts over the four local datasets; WPs 1–7 mapped to D3–D7; validation via value reproduction + SAFFIRE-II hold-out + provenance audit | **FOCUS** | Strengthens the core question and §9 trust layer; passes checklist 1–7 (one user, NASA-data-first, narrow, decision-valued, validatable, demo-able beats 1–4, award identity = evidence/trust). Key unsolved problem taken from the four family reviews' convergent gap (evidence transfer, uncertainty, provenance), not the occupied prediction lane (anti-pattern table, "AI predictor" row) |
| 2026-10-02 | Sequencing: time-boxed, question-driven data feasibility sprint (WP1) before freezing verdict semantics (D4, Nov 7) — not solution-first, not open-ended data-first | **FOCUS** | Concept risk already retired by literature-first work; remaining risk is feasibility (sensor schemas, timestamp alignment, anchor reproduction). Open-ended exploration trips the experiment-browser anti-pattern (§6); designing D4 on unopened data repeats the YottaByte built-vs-proved gap (§9) |
| 2026-10-02 | Commit to the evidence-transfer verdict system as the NSAC submission (winnability assessed) | **FOCUS**, with three named failure modes to manage | Concept maps 1:1 onto the winning formula (§2, §5). Failure modes: (a) abstraction leak — verdict semantics visible in UI instead of a 15-second decision (§8); (b) data feasibility unresolved at Nov 7 freeze; (c) AI-identity question — mitigate by positioning as "AI that knows what it doesn't know" (insight engine, not predictor). MVP = catalogue + verdicts on 4 SAFFIRE-II families + hold-out demo + provenance drill-down |
| 2026-10-02 | Scope proposal (conditional): make gaps 1 (evidence transfer) + 2 (uncertainty-aware measurement) the headline; retire 3/4/5 as features | **FOCUS** with reframe — 1 is the product, 2 is its credibility engine; 3 (provenance) stays as non-negotiable infrastructure (hard rule 2, §9 evidence check), 4 (negative results) stays as evidence fuel (the PDMS CONTRADICTED case depends on it), 5 (next-experiment) stays as a one-screen stub to keep the pitch SO WHAT beat (§8) | Choosing the pair sharpens the project (depth over noise, §7) and gap 2 supplies the "we analyzed NASA's raw data" legitimacy plus the anchor-reproduction validation artifact. Gap 2 is also the main technical risk — the S5 anchor test in the feasibility sprint is its go/no-go |
| 2026-10-02 | Delivery model + roadmap restructure (`Setup docs/roadmap.md`): three tracks (research Elias+agent / build developer / video), Nov 7 = 240 s video deadline, script before screens, web-primary product, no full build before Nov 7 | **FOCUS** | New fact (240 s video due Nov 7) moves the critical path: research must finish by Oct 31 so script (Oct 31–Nov 2) → screens (Nov 2–5) → video (Nov 5–7) fits. Script-then-screens ordering enforces §8 (design the demo while building); web-primary passes demo-strength checklist; "not developing the whole project now" is feature discipline (§7), not scope cowardice — the video needs scripted screens on real data, not a finished product |
| 2026-10-02 | **Deadline correction** (Elias): the 240 s video is due **Oct 7** (five days out), and the **whole project must be built by Nov 7** (Elias + developer). Roadmap rewritten as v2 | **FOCUS** with a named honesty constraint | Inverted critical path: video comes first and is a *concept* video built only from existing assets (locked shape, four reviews, prior-art scan, local NASA archive, published PDMS/SAFFIRE results as PROOF) — concept screens labeled as design, never as a working product (no-overclaim rule). Build track starts scaffolding ~Oct 20 on the draft contract so the Nov 7 full-build deadline never rests on one integration week. Video sprint has one buffer day; if the script misses Oct 3 gate, ship v0 rather than slip |
| 2026-10-02 | **Sequencing correction + roadmap v3** (Elias): research FIRST (complete it if possible → understand what is possible/not → script points → developer document); team edits video in parallel throughout; roadmap must be dependency-based, not date-based; research_plan.md restructured into phase-by-phase R0–R6 with understanding deliverables | **FOCUS** | Restores the data-to-evidence order (§4: understand before transform before visualize) and the research-first principle from §2. Dependency form removes false schedule precision while keeping ordering enforceable; parallel V0 editing track means video capability never blocks research; script-version table (v0/v1/v2, roadmap §4) reconciles the Oct 7 deadline with research-first without faking results — early versions cite published NASA findings, later versions add our own |
| 2026-10-02 | **R1 exit — feasibility sprint complete** (`Gravifier_research/R1_data_interrogation/R1_FINDINGS.md`): all five questions answered; four GO + one bounded no-go (PSI-98 Sample-1 sensor files are NASA-side dead links; SAFFIRE-I S1 = imagery + literature evidence class only); gap-2 branch = FULL measurement-uncertainty path (S5 anchor reproduced at 2.04 vs 2.1 mm/s published, −3.1% traverse-calibrated); canonical run key = study + As Run Test #; canonical channel join = name-based (PSI-98 column order differs) | **FOCUS** | Retires the feasibility risk named in the sequencing verdict (§10 row 2) without tripping the experiment-browser anti-pattern (§6) — every check maps to a verdict-engine input, not to browsing. Anchor pass converts gap 2 from "main technical risk" to validated credibility engine (§9 validation); the fallback branch stays documented as contingency. No-overclaim check: all numbers above carry their derivation in R1_FINDINGS §Q4 |
| 2026-10-02 | **R2 exit — L1 evidence store built** (`Gravifier_research/evidence_store/`): 261 combustion runs across 4 studies, 3,176 evidence items with file+row provenance on every row, 11 sensor series, 249,833 burn frames inventoried (118,938 anchor frames extracted), 54 planned test points (planned layer live), 19/19 exit checks incl. review-count reconciliation and 7 no-silent-conversion probes; data contract draft exported for DEV DOC v1. Source defects preserved as flags (PSI-99 rate-in-length-column, "037 mm", cm-vs-mm, BASS as-run collisions) | **FOCUS** | Directly serves the trust layer (§9: lineage chain visible end to end) and unblocks R3 + DEV DOC v1 (data-contract half) per the roadmap. Evidence classes now map to real rows, and the conflict taxonomy has three concrete day-one cases. The store stays catalogue-shaped (no per-frame rows, series as file refs) — feature discipline (§7): infrastructure sized to the one decision, not a data warehouse |
| 2026-10-02 | **R3 exit — verdict engine designed + exercised** (`Gravifier_research/verdict_engine/`): spec frozen v1.1 (one amendment: NASA operator-log outcome text counts as confirmatory INTERPRETED evidence); deterministic engine over the L1 store + cited literature register; 18 seed claims → 4 SUPPORTED / 5 CONTRADICTED / 9 INSUFFICIENT (4 refusals); 18/18 literature concordance; review session (`VERDICT_REVIEW.md`) found+fixed 3 defects and validated 2 engine-right refusals; scenario spec D6 with 4-scenario demo pack | **FOCUS** | The engine is the winner shape's mechanism layer: scenario→verdict in one call (§8 beats 1–4), refusal as first-class output (§9 failure logic), evidence drill-down = provenance rule, and the four-dimension confidence is the uncertainty story judges can repeat. BASS-II study-wide INSUFFICIENT and the wax refusal prove the no-overclaim discipline is real, not decorative. Deterministic rules (no ML) keep NASA-STD-7009 traceability honest and the R4 hold-out meaningful |
| 2026-10-02 | **R4 exit — validation complete** (`Gravifier_research/verdict_engine/R4_VALIDATION_REPORT.md`): Tier 1 anchors — S5 2.18 (+4.0%) and S6 2.64 (+1.6%) Theil–Sen vs published, SAFFIRE-I S1 1.96 (+12.3% under documented scale inference), PDMS stall ×4; Tier 2 hash-stamped blind SAFFIRE-II hold-out — 0/5 false-SUPPORTED, 1/1 transferable-call agreement (SIBAL SUPPORTED/HIGH blind = truth), 4/4 correct refusals, 0 misses; Tier 3 provenance — 6 FULL / 4 PARTIAL / 0 FAIL (100% chain resolution). Credibility statement: failure profile Type-II-conservative throughout | **FOCUS** | This is §9 made real: named metrics from a version-stamped blind test, quantified measurement error with the dominant systematic identified (scale calibration; ROI PDFs dead NASA-side), and a hold-out proving the refusal mechanism rather than asserting it. The zero-false-SUPPORTED result is the PROOF beat's strongest number, and the honest PARTIALs (S8/S9, N2-jet, non-monotonicity) keep the no-overclaim rule intact under validation pressure. Engine spec tightened to match frozen rules (single-run SUPPORTED removed) with R3 concordance re-verified 18/18 |
| 2026-10-02 | **R5 exit — findings digest** (`Gravifier_research/R5_FINDINGS_DIGEST.md` + `R5_DIGEST_DATA.json`): per-claim table with interpretations, can-say/cannot-say/refuse-to-say, 11 demonstrable claims (D1–D11) each citing its evidence chain, judge-language uncertainty story, next-experiment ranking (3 flight-test candidates from the 70-cell epistemic grid + 3 analysis priorities), 10 script guardrails. Exit verified programmatically: 26/26 checks — every cited artifact exists and every quoted number matches it | **FOCUS** | The digest is the script's direct source and stays inside the winner shape: D1–D3/D6/D10 are the PROOF beats from real validation artifacts (§9), §5 is the uncertainty story judges can repeat, §6 items 1–3 are the SO WHAT beat (§8 pitch order), and the 10 guardrails operationalize the no-overclaim rule for every downstream artifact. The demonstrable-claims list also enforces feature discipline (§7): anything not on the list may not appear on screen — a hard boundary the developer and video tracks can build against |
| 2026-10-02 | **R6 exit — translation** (`Gravifier_research/R6_TRANSLATION/`): video script v2 (240 s, 13-beat table, claim-map to D1–D11 on every factual line, protected 15-second wow, memory line once, WHO→WHY→WHAT→HOW→PROOF→SO WHAT order, honesty labels for pre-B3 screens) + developer document v1.0 (7 screens, engine call contract, citable-numbers whitelist, 10 binding UI rules, SC-DEMO-1..4, B1→B3 mapping). Exit checks 26/26 | **FOCUS** for the script; dev doc **ready for developer acceptance** (B0 pending) | Script passes §8 programmatically (order, wow, memory line) and every factual line maps to a verified artifact — the no-fake-numbers rule enforced at the script level, not just the UI. It never leads with tools (anti-pattern table) and the PROOF beats cite only R4/R5-verified numbers (§9). The dev doc fixes the contract while leaving stack choice D8 to the developer; its citable-numbers whitelist keeps B3 honest. Research track R0–R6 complete: the build and video tracks now have everything they need |
| 2026-10-06 | **R7 — developer handover packaging, Phase A complete** (`Gravifier_research/R7_HANDOVER/` + dev doc → v1.1): two-tab FPS+Dossier architecture contract (game story §9 reconciled with S1–S7), mission-JSON schema + `M1.json` gold standard with verdict payloads embedded verbatim, machine-readable `numbers_whitelist.json` (28 renderable numbers, each resolving to an exact source path; render rules: bare "~13 s" banned → anchors values, 22.5% O₂ = boundary statement only), 27 dossier frames with provenance manifest, `verify_bundle.py` 40/40 PASS; engine determinism re-proven (run_r3 regenerated output byte-identical to bundle copy); r5_exit_checks re-run ALL PASS | **FOCUS** | Packaging unblocks the build track (B0 onboarding) with zero new features — the bundle contains only existing verified artifacts (§7 feature discipline). Whitelist enforcement extends the R6 no-fake-numbers rule from script level to payload level (§9 evidence check). Dev doc v1.1 removes the abstraction-leak failure mode named in the R0 verdict by handing the developer one contract instead of two contradictory ones (dashboard-era S1–S7 vs the 2026-10-05 FPS decision) |
| 2026-10-06 | **Phase B — repo transport prepared** (three commits on master: research R1–R6 / R7 bundle + dev doc v1.1 / repo prep): secrets audit clean (no tokens in tree), 28 GB raw PSI + 1.5 GB anchors gitignored with 27 selected frames + small PSI-25 assets whitelisted in, MIT LICENSE, stack-neutral root README + app/ placeholder + dev doc §3 rewritten so D8 is genuinely open (prior React/R3F lean downgraded to documented input per Elias — "no framework things; the developer selects"), `Setup docs/repo_publish.md` = 5-minute publish runbook (gh CLI not installed locally, remote creation is Elias's one command); final tree 199 files / 33 MB | **FOCUS**, with stack neutrality as a named constraint | Transport serves the build track without pre-deciding D8 (the tech-first-story anti-pattern starts with the stack, not the pitch — §6); committing the verified research artifacts creates the shared evidence baseline the YottaByte lineage gap diagnosed (§9 evidence check: judges and teammates trace the chain from a fresh clone). Public-facing artifact (private repo) keeps secrets rule enforceable by audit; heavyweight data stays local per resource discipline |

## 11. Sources and evidence notes

- `~/Documents/space_apps_winning_strategy_guide.pptx` — 16 slides. Winner
  patterns 2023–2025, the seven-point test, trust mechanics, demo and pitch
  structure, GRAVIFIRE application (slide 15).
- `~/Documents/yottabyte_case_study_strategy_deck.pptx` — 15 slides.
  YottaByte/AgroHub postmortem: two consecutive Global Nominations despite
  strong execution, diagnosed as broad-platform shape, invisible data
  lineage, and thin validation. GRAVIFIRE weak vs winner shape on slide 12.
- Evidence limits of those decks: the YottaByte analysis rests on public
  artifacts (DIU CPC achievements page) and an internal analysis memo; NASA
  never published judge feedback; mock screens are reconstructed, not live
  captures. Treat this gate as a strategy hypothesis distilled from the
  decks, not as verified scoring criteria.
