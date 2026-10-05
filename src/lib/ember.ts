import type { EmberLine, EmberTrigger, MissionBeat } from "@/features/mission-control/types";

const lines: EmberLine[] = [
  { id: "identity-rank", missionId: "*", beat: "BRIEFING", trigger: "MISSION_START", text: "I rank evidence. I don't certify.", evidenceRefs: [], tone: "CALM" },
  { id: "identity-archive", missionId: "*", beat: "VERDICT", trigger: "INVALID_EVIDENCE_REQUEST", text: "That's not in the archive. That's why you're here.", evidenceRefs: [], tone: "DIRECT" },
  { id: "m1-pair", missionId: "m1", beat: "INSERTION", trigger: "MISSION_START", text: "We finally have a pair I can answer. Same listed material. Same listed airflow magnitude. Different flow direction.", evidenceRefs: ["psi98-S1", "psi98-S2"], tone: "CALM" },
  { id: "m1-predict", missionId: "m1", beat: "PREDICT", trigger: "MISSION_START", text: "Do not guess the result. Record your expectation first.", evidenceRefs: [], tone: "DIRECT" },
  { id: "m1-scope", missionId: "m1", beat: "VERDICT", trigger: "VERDICT_REVEALED", text: "The archive reports source values. Keep the conclusion scoped to these tested conditions.", evidenceRefs: ["psi98-S1", "psi98-S2"], tone: "CALM" },
  { id: "m4-opening", missionId: "m4", beat: "INSERTION", trigger: "MISSION_START", text: "This one is why I don't trust labels like 'flammable' without the test condition. The archive has a direct comparison worth seeing.", evidenceRefs: [], tone: "CAUTION" },
  { id: "m4-earth", missionId: "m4", beat: "EARTH_REFERENCE", trigger: "MISSION_START", text: "Now remove the assumption that the ground result transfers.", evidenceRefs: [], tone: "DIRECT" },
  { id: "m4-scope", missionId: "m4", beat: "VERDICT", trigger: "VERDICT_REVEALED", text: "I rank evidence. I don't certify.", evidenceRefs: ["psi99-2-1", "ntrs-20180004258"], tone: "CALM" },
  { id: "m6-opening", missionId: "m6", beat: "INSERTION", trigger: "MISSION_START", text: "Three reviews complete. You've seen direct evidence, contradiction, and an honest gap. Now build the manifest without turning any of them into a certification.", evidenceRefs: [], tone: "CALM" },
  { id: "m6-refusal", missionId: "m6", beat: "VERDICT", trigger: "VERDICT_REVEALED", text: "NASA has studied partial-gravity combustion. But I do not have a matching record for this complete condition. I won't interpolate a verdict across all of those dimensions.", evidenceRefs: ["planet-mars-0-38g"], tone: "DIRECT" },
  { id: "m6-closing", missionId: "m6", beat: "FIELD_MANUAL", trigger: "MISSION_COMPLETE", text: "A missing result is not permission to invent one. Name the gap. Then design the experiment.", evidenceRefs: [], tone: "CALM" },
];
export function getEmberLines(missionId: string, beat: MissionBeat, trigger: EmberTrigger): EmberLine[] { return lines.filter((line) => (line.missionId === missionId || line.missionId === "*") && line.beat === beat && line.trigger === trigger); }
