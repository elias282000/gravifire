# 240s Video — Screen Build List for the Developer

Extracted from `NSAC Script 2026 240s v2.md` (final). Every screen-capture moment in the storyboard, ranked by how many video beats depend on it. Data feeds come from the R7 bundle (`Gravifier_research/R7_HANDOVER/`) — all screens are precomputed-JSON UI (B1-style); no engine integration needed for the video. Contract: `docs/DEVELOPER_DOCUMENT.md` v1.1.

Created 2026-10-06. Video due Oct 7 (roadmap v2) — see the timing note.

## Priority order

### 1. Certification Queue — material select hub

- **Video beats:** 01:46–02:20 (WHAT/HOW), 03:00–03:34 (demo)
- **What it shows:** manifest of materials, SIBAL flagged **PRIORITY-1**, one selected → transition into the comparison view.
- **Dev doc:** Queue hub / S1 scenario fields as the select state.
- **Data:** catalog families + `missions/M1.json` environment.

### 2. Verdict card with the stamp animation

- **Video beats:** 01:46–02:20, inside the demo
- **What it shows:** SUPPORTED / CONTRADICTED / INSUFFICIENT lands as an animated stamp; confidence chips; grade badge.
- **Note:** the cold open's glitching stamp must match this exactly so the film reads as one system. Most-seen element in the video.
- **Dev doc:** S2. **Data:** `engine/outputs/seed_verdicts.json` verbatim.

### 3. Virtual Laboratory — Earth vs microgravity comparison

- **Video beats:** 01:46–02:20, 03:00–03:34
- **What it shows:** side-by-side evidence view for the selected material/condition; verdict stamp lands here.
- **Dev doc:** CONFIGURE/RUN beats + S1 fields.
- **Data:** M1.json branches — concurrent anchor → EXACT; opposed → CONTRADICTED; opposed low-flow large duct → refusal.

### 4. EMBER citation drill-down — "why"

- **Video beat:** 03:00–03:34 (the payoff shot)
- **What it shows:** user asks why → EMBER text panel cites run_ids → click → the exact file#row highlighted **inside the real NASA source file**. The video ends this shot on the highlighted citation.
- **Dev doc:** S3. **Data:** evidence rows in seed_verdicts (already carry file#row).

### 5. Refusal / INSUFFICIENT card — evidence gap + next experiment

- **Video beat:** 02:26–02:44
- **What it shows:** gap flagged, missing test named, next experiment proposed, "log the gap" button.
- **Dev doc:** S4 + S5.
- **Data:** TC-SIBAL-SCALE-01 (`missing_evidence` + `what_would_change_it`populated) + next-experiment ranking from `digest/R5_DIGEST_DATA.json`.

### 6. Evidence lineage card view

- **Video beat:** 02:20–02:26 (exactly 6 seconds)
- **What it shows:** four dataset cards — BASS, BASS-II, SAFFIRE-I, SAFFIRE-II with real tc_ids — connected by a line to the verdict stamp; caption "the evidence behind every decision." Dossier-tab content.
- **Data:** image_sets / runs tables in `store/gravifire_l1.db`.

### 7. Proof screen — blind hold-out stat

- **Video beat:** 02:44–03:00
- **What it shows:** "5 unseen NASA cases · 0 false SUPPORTED verdicts" with the 5-cases → engine → verdicts diagram.
- **Dev doc:** S7 / Trust Room. **Data:** `engine/outputs/r4_tier2_holdout.json`(5 rows + stamp). Short on time → editor motion graphic, numbers from `numbers_whitelist.json` only.

### 8. Game corridor — M0 opening walk

- **Video beat:** 03:00–03:34
- **What it shows:** ISV Vesta corridor, small fire incident, officer opens the dashboard → splits into screens 1–4.
- **Fallback (binding, from the script):** if the graybox is not ready by recording day, run the beat as a Dossier-only screen capture — the narration works unchanged.

## Not developer work (editor / motion graphics)

Cold open (PASSED spec-sheet stamp glitch), title card, end card, and the PROOF stat-card numbers can be built in the video editor. Any number rendered there must come from `numbers_whitelist.json` — no exceptions.

## Timing note

Video due **Oct 7**. If only a subset of screens lands in time, protect them in this order:

**verdict card → Queue → comparison → EMBER citation → refusal card**

That sequence covers beats 01:46–03:34 with the Dossier fallback and still demonstrates the whole thesis on camera: scenario → verdict → evidence → refusal.