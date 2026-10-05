# GRAVIFIRE Judge Demo Script

Primary: `http://localhost:3000/mission-control?demo=1`

Backup: `http://localhost:3000/mission-control/dossier`

Primary stops: M1, M4, M6, Dossier.

Target runtime: 3:30–4:30. Do not play the full campaign during the primary demonstration.

## Narrative

Problem → real NASA data → surprising evidence → honest refusal → next experiment.

## 0:00–0:25 · Opening / Mission Control

Screen: `/mission-control?demo=1`.

Say:

> Fire behaves differently when gravity, airflow, geometry, and atmosphere change.
>
> NASA has decades of spacecraft fire experiments, but those results are spread across investigations, source tables, reports, and conditions.
>
> GRAVIFIRE turns that evidence into an interactive fire-safety reasoning system.
>
> This 2038 mission is fictional. The NASA experimental evidence underneath it is real.

Point briefly to `FICTIONAL MISSION` and `REAL NASA EVIDENCE`.

## 0:25–1:05 · M1 / SIBAL

Click `SHOW SIBAL EVIDENCE` or jump to M1 and open the comparison.

Pause on:

- S1 · Concurrent · 420 s recorded burn time
- S2 · Opposed · 70 s recorded burn time
- REAL NASA DATA · SAFFIRE-I / PSI-98

Say:

> These are two real SIBAL source records from NASA PSI-98.
>
> Both list 20 centimeters per second airflow. The concurrent run records 420 seconds of burn time. The opposed run records 70 seconds.
>
> GRAVIFIRE does not turn that into a universal rule like “reverse the fan.” It preserves the condition, the source records, and the limitation.

Optional: open the evidence drawer for 3–5 seconds. Do not get lost in source UI.

This is screenshot moment #1.

## 1:05–1:50 · M4 / Silicone

Click `SHOW SILICONE CONTRADICTION` and show sample 2-1.

Pause on:

- 1-g Burn Length: `Complete`
- Low-g Burn Time: `Insignificant`
- Low-g Burn Length: `~0`
- NASA DOCUMENT CONTEXT: ignition without propagation

Say:

> Saffire-II gives us the result that breaks intuition.
>
> For silicone sample 2-1, the table’s one-gravity reference says the burn length was complete. But the flight record reports insignificant burn time and approximately zero low-gravity burn length.
>
> NASA’s report adds the qualitative context: the silicone samples ignited, but the flame did not propagate.
>
> GRAVIFIRE keeps those evidence layers separate. It does not conclude that silicone is universally nonflammable.

Show the four-sample matrix.

> The source details remain visible too. Sample 2-4 contains the raw thickness value “037 mm,” so GRAVIFIRE flags it instead of silently correcting the source table.

This is screenshot moment #2.

## 1:50–2:45 · M6 / Locked Door

Click `SHOW MARS REFUSAL` and approach the sealed door.

Before interaction:

> Now we ask the question a Mars mission actually cares about: what happens when we combine the material, habitat geometry, exploration atmosphere, and Mars gravity?

Interact with the door. Let the deterministic refusal sequence play without talking over the key visual.

When the refusal appears:

> Mars gravity is about 0.38 g. But GRAVIFIRE does not have a matching combined-condition record in its currently ingested evidence.
>
> So it does something most AI demos avoid: it refuses to invent the fire.
>
> This does not mean NASA has never studied partial gravity. It means this evidence set cannot support this exact combined condition.

Show `REFUSAL` and `OUTSIDE CURRENT INGESTED EVIDENCE DOMAIN`.

This is screenshot moment #3.

## 2:45–3:15 · Next Experiment Memo

Show the campaign experiment memo.

Say:

> A refusal is not the end of the workflow. GRAVIFIRE converts that boundary into a research question.
>
> It identifies what dimensions are missing, shows the nearest evidence we already have, and lets the mission team define the next experiments without inventing their outcomes.

Call it a `CAMPAIGN EXPERIMENT MEMO`, not a universal ranked recommendation.

## 3:15–3:55 · Dossier

Open `/mission-control/dossier`.

Say:

> Every decision is preserved in the Aegis Evidence Dossier. A judge or researcher does not need to play the game to inspect the science.

Show SIBAL, Silicone, Mars boundary, source references, and named gaps.

> Math and evidence decide what we know. AI can explain it. AI cannot invent the missing result.

## 3:55–4:10 · Closing

Finish on the Dossier or Mars refusal card.

> GRAVIFIRE connects NASA’s past fire experiments to the questions a future mission still needs answered.
>
> Don’t just predict the fire. Design the next experiment.

Stop. Do not continue explaining features unless judges ask.

## 2-minute emergency version

- 0:00–0:15: explain fictional scenario / real evidence.
- 0:15–0:45: SIBAL, 420 s versus 70 s.
- 0:45–1:15: Silicone, Complete versus Insignificant / ~0.
- 1:15–1:45: Mars refusal.
- 1:45–2:00: Dossier and closing line:

> GRAVIFIRE does not just tell us what NASA already learned. It shows us exactly where the evidence ends and what we should test next.

## 60-second emergency pitch

> Fire behavior depends on conditions. GRAVIFIRE puts real NASA fire evidence inside an interactive fictional mission scenario.
>
> In SAFFIRE-I, SIBAL records show 420 seconds under concurrent flow and 70 seconds under opposed flow. In SAFFIRE-II, silicone sample 2-1 has a Complete one-gravity reference but Insignificant burn time and approximately zero low-g burn length in flight.
>
> When asked for a combined Mars-habitat fire verdict, GRAVIFIRE refuses because the current archive has no matching condition.
>
> The result is not a guess. It is a boundary and a next experiment.

## Backup questions

### “Is this just a game?”

> No. The game is one interface over the evidence system. The underlying application has structured NASA investigation ingestion, provenance, Experiment Explorer, Ask GRAVIFIRE, Challenge My Science, evidence coverage mapping, and experiment-gap tools.

### “Are the flames simulated?”

> Not as predictive physics. Where we have evidence, Mission Control uses schematic evidence replays tied to source records. Where we do not have evidence, GRAVIFIRE refuses to generate fire behavior.

### “Why not use an LLM to predict the missing case?”

> Language models are not validated combustion solvers. Deterministic code and source evidence establish facts and verdicts; AI may communicate them but cannot generate measurements or override evidence boundaries.

### “What is the AI part?”

> GRAVIFIRE combines evidence retrieval, structured reasoning, challenge/self-audit, gap detection, experiment recommendation, and an evidence-grounded assistant. The novelty is knowing when the evidence supports an answer and when it does not.

### “Why 420 versus 70?”

> They are direct recorded burn-time values from SAFFIRE-I S1 and S2. Both list SIBAL and a 20 cm/s airflow magnitude, with concurrent versus opposed flow. The comparison is observed evidence, not a proved mechanism or universal control law.

### “Is silicone safe in space?”

> GRAVIFIRE refuses that conclusion. The Saffire-II evidence concerns four specific silicone samples under specific conditions.

### “Has NASA never tested Mars gravity?”

> No. NASA has studied partial-gravity combustion. The narrower claim is that the currently ingested GRAVIFIRE evidence does not contain a sufficiently matching combined Mars-habitat condition.

### “What would you build next?”

> Ingest more NASA fire families and richer document/image evidence, validate cross-experiment reasoning against withheld experiments, and use the evidence-gap engine to design high-information future tests without pretending to know their outcome.

## Recovery plan

- M1 issue: open the Dossier and show the SIBAL highlight/source references.
- M4 3D issue: open the Dossier Silicone highlight and source index.
- M6 WebGL issue: open the Dossier Mars boundary/refusal section.
- Corrupted campaign state: use `/mission-control?demo=1`.
- Demo navigation issue: use `/mission-control/dossier` directly.
- Internet issue: rely on local/preloaded runtime evidence only where that behavior has been verified; do not claim complete offline support.

## Presenter discipline

Never say: “NASA proved,” “Silicone is safe,” “opposed flow extinguishes fire,” “our AI predicts Mars fire,” “NASA has never tested this,” or “this is the safest material.”

Say: “the source records,” “under these tested conditions,” “the current archive,” “GRAVIFIRE refuses to extrapolate,” “this evidence supports,” and “this evidence does not reach that conclusion.”
