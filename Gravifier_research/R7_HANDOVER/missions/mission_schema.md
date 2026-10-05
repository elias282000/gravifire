# GRAVIFIRE — Mission-JSON Schema v1.0 (R7, 2026-10-06)

One payload per mission. The Lab template renders any conforming payload —
mission count is cheap, bespoke geometry is not. **Gold standard: `M1.json`
in this folder. Build every other mission by copying its shape.**

Binding context: `DEVELOPER_DOCUMENT.md` v1.1 §6 (contract), §7 (numbers
whitelist), §8 (hard rules). Honesty contract: `material_catalog_and_experiment_game.md` §4.4;
campaign design: `game_story_and_choices.md`.

## Top-level object

| Field | Type | Meaning |
| ----- | ---- | ------- |
| `mission_id` | string | `"M0"`…`"M6"` |
| `title` | string | Story title, e.g. "The Standard" |
| `act` | int | 1–3 (act = verdict state per game story §1) |
| `role` | string | One line: what the mission teaches |
| `claims` | string[] | tc_ids consumed — must exist in `engine/outputs/seed_verdicts.json` |
| `environment` | object | `location`, `material` (display name + family key), `geometry`, `duct` (`small`/`large`), `ember_hint_key` |
| `beats` | object[] | Ordered, typed per §Beat types below |
| `verdict_payloads` | object | `tc_id → engine output object`, embedded **verbatim** from `seed_verdicts.json` — never retyped |

## Beat types (template order — game story §4)

1. `insertion` — `dialogue[]` (speaker: `EMBER`/`OKAFOR`/`SYSTEM`, line), `duration_s`
2. `predict` — timed choice, `timed_s: 10`. `options[]` with `id`, `text`,
   optional `earth_expectation_ref` (predicate name). Logged, never scored;
   replayed at the verdict card.
3. `run_1g` — Earth Lab render: `render.flame` morphology token, `render.outcome`,
   `label` (Earth basis, e.g. "1-g ground tests").
4. `configure` — physical setup in-world. `controls[]` (valve/toggle/mixer
   with values; archive anchor noted). `branches[]`: each branch has
   `conditions` (direction/flow/oxygen), `render_state`
   (`EXACT`/`BOUND`/`CONTRADICTED`/`REFUSAL`), `claim` (tc_id), and
   `animation` params whose numbers are `{whitelist_key, display}` pairs only.
5. `run_ug` — renders from the chosen branch's `render_state` per the
   honesty contract (catalog §4.4). No own data.
6. `decide` — operational choice. `options[]` each carrying `evidence`
   (`runs[]`, `chip`: `MODERATE`/`BOUND`/`DISFAVORED`/`ALIGNED`, `note`).
   Consequences always three layers: animation, EMBER evidence-alignment
   feedback, narrative. No death states.
7. `verdict_card` — per branch: tc_id, verdict, confidence chips +
   dimension bars, evidence rows (run_id, value_raw, class, flags, file#row
   — all from `verdict_payloads`), `what_would_change_it`, calibration
   labels. Prediction recall line ("you expected …; the archive said …").
8. `field_manual` — `entry` (FM-nn), `text`, optional `numbers[]` as
   whitelist-key refs.
9. `return_to_queue` — Okafor/EMBER reaction beat, queue reorders.

## Number rules (binding — dev doc §8 rule 15)

- Every numeric literal in an `animation`, timer, or card field is a
  `{whitelist_key, display}` pair; the key must resolve in
  `../numbers_whitelist.json`. `verify_bundle.py` enforces this.
- `display` strings must match the whitelist entry's `render_as` (or a
  prefix of it); the whitelist carries the calibration label.
- Prohibited literals: "~13 s" (use `pdms_episode_*` keys), bare "22.5%"
  without the boundary phrase, any rate without its calibration label.

## Verdict payloads

`verdict_payloads[tc_id]` is the full engine output object copied verbatim
from `seed_verdicts.json` (or a regeneration of it). The UI renders its
fields (`verdict`, `confidence`, `grade`, `evidence[]`,
`missing_evidence[]`, `what_would_change_it[]`, `nearest_domain`,
`refusal`, `confidence_dimensions`, `rule_trace[]`) without transformation
(dev doc §5).

## EMBER dialogue lines

- Text-only; grounded; may explain, never override, never generate numbers
  (dev doc §8 rule 13).
- Hint tiers per game story §7: 20 s nudge / 45 s scaffold / 70 s
  point-to-source (opens the exact file#row from the verdict payload).
- Offline fallback: the payload's dialogue lines ARE the fallback bank —
  the companion can never take the game down.

## Adding a mission (checklist)

1. Copy `M1.json`, rename, replace header + beats.
2. Pull `verdict_payloads` entries verbatim from `seed_verdicts.json` for
   the new claims.
3. Every number → whitelist key. If a number you need is missing, request a
   whitelist addition from Elias (verified against the store first) — do
   not inline it.
4. Run `python3 ../verify_bundle.py` — must pass before commit.
