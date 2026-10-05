# Mission Control Demo QA

## Fresh campaign

1. Open `/mission-control`.
2. Complete M0 and verify M1 unlocks.
3. View both M1 source records, compare, and complete M1.
4. Run M4, review the hero replay and four-sample matrix, then complete it.
5. Assemble the M6 manifest, approach the locked door, review the refusal, select three memo candidates, and open the Dossier.

## Replay

Replay each mission and verify that unlocks and gaps are not duplicated.

## Refresh

Refresh during each mission and verify local campaign state is recovered without a crash.

## Gameplay hardening

- WASD movement works on desktop.
- SHIFT transitions between walk and sprint without an abrupt velocity jump.
- CTRL/C crouches, lowers the view, and restores the standing view on release.
- Head bob and camera response remain restrained; verify reduced-motion settings remove the motion.
- Right mouse enters focus mode and R plays the cosmetic scanner inspection pose.
- F toggles the scanner flashlight without changing evidence or mission state.
- The held GRAVIFIRE scanner sways with movement and lowers while sprinting.
- Pointer lock starts and releases correctly.
- ESC opens the pause menu.
- Resume returns to the mission.
- Restart current mission does not erase completed campaign missions.
- Restart reloads only the current mission session.
- Return to Mission Control exits without clearing campaign progress.
- Objective text updates with the current mission beat.
- Interactive targets show a readable highlight/prompt.
- Pressing E repeatedly during a transition does not duplicate a mission action.
- M6 door interaction presents the refusal sequence before the verdict card.
- Mission completion uses an intentional completion state before returning to the Queue.

## Mission route checks

- M0: spawn in the crew corridor, pass the incident stations, inspect heater/garment/vent, choose a physical response, then reach the archive terminal.
- M1: scan the SIBAL article, enter the replay chamber, activate Concurrent and Opposed from their separate stations, then approach the comparison station before deciding.
- M4: locate sample 2-1, visit the ground-reference and flight-record stations, inspect 2-2/2-3/2-4, then use the material-review terminal.
- M6: visit the three manifest stations, review the evidence wall, proceed through the transition route, trigger the Mars boundary scan, then reach the research memo flow.
- Verify locked physical stages do not advance merely by walking into the next room.

## Third-person guidance checks

- Campaign missions open in third-person with the engineer avatar visible.
- `V` toggles third-person and first-person without changing mission state or evidence.
- The follow camera stays behind the player and moves closer at walls/consoles rather than clipping through them.
- RMB enters inspection framing and the scanner remains available in first-person mode.
- Objective guide answers what, where, and how; meaningful action verbs appear when a target is acquired.
- M0 shows the incident inspection route and 0/3 guidance before response controls.
- M1 shows sample, Concurrent/Opposed, ignition, and analysis-room guidance in order.
- M4 shows sample 2-1, ground reference, flight record, and 2-2/2-3/2-4 review guidance.
- M6 shows manifest, evidence wall, exploration corridor, boundary, and experiment guidance.
- First controls tutorial appears once and can be hidden locally.
- Camera preference persists across a mission refresh and `V` switches back to first-person without resetting evidence.
- Third-person camera shortens its follow distance near walls and consoles.

## Demo mode

Open `/mission-control?demo=1`, verify the DEMO NAVIGATION bar, quick jumps, and that normal campaign storage is unchanged.

## Links

Verify Dossier, Experiment Explorer, Lab, Ask GRAVIFIRE, Challenge, and Field Manual links.

## Print

Open the Dossier print preview and verify white background, readable evidence cards, source references, and persistent disclaimers.

This checklist is an internal manual procedure; it is not a claim that every browser-only step has been executed automatically.
