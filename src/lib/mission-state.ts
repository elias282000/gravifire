import type { CampaignGapLog, CampaignState, FieldManualEntry, MissionBeat, MissionDefinition, MissionProgress, MissionStatus, MissionVerdictReference, MissionDecision, PredictionRecord, PredictionComparison } from "@/features/mission-control/types";

export const CAMPAIGN_STORAGE_KEY = "gravifire:mission-control:campaign:v2";
export const GRAYBOX_STORAGE_KEY = "gravifire:mission-control:graybox:v1";
export const LEGACY_CAMPAIGN_STORAGE_KEY = "gravifire:mission-control:campaign:v1";
export const CAMPAIGN_SCHEMA_VERSION = 2;
const beats: MissionBeat[] = ["BRIEFING", "INSERTION", "PREDICT", "EARTH_REFERENCE", "REACH_CONSOLE", "CONFIGURE", "RUN", "RUN_TEST", "DECIDE", "VERDICT", "REVIEW_VERDICT", "FIELD_MANUAL", "COMPLETE"];

export function initialMissionProgress(missionId: string, status: MissionStatus = "AVAILABLE"): MissionProgress { return { missionId, status, currentBeat: "BRIEFING", selectedChoices: {}, configuration: { airflow: 20, direction: "Concurrent", oxygen: 21 }, verdictViewed: false, fieldManualUnlocks: [], playerPredictions: [], gapLog: [] }; }
export function createInitialCampaign(definitions: MissionDefinition[]): CampaignState {
  const missions = Object.fromEntries(definitions.map((mission) => [mission.id, initialMissionProgress(mission.id, mission.sequence === 0 ? "AVAILABLE" : "LOCKED")]));
  return { schemaVersion: CAMPAIGN_SCHEMA_VERSION, activeMissionId: null, missions, predictions: [], decisions: [], gapLog: [], manual: [], verdictHistory: [], challengeLinks: [], grayboxProgress: initialMissionProgress("graybox") };
}
export function serializeCampaignState(state: CampaignState): string { return JSON.stringify(state); }
export function parseCampaignState(serialized: string | null, definitions: MissionDefinition[]): CampaignState {
  const fallback = createInitialCampaign(definitions);
  if (!serialized) return fallback;
  try {
    const parsed = JSON.parse(serialized) as CampaignState;
    if (parsed.schemaVersion !== CAMPAIGN_SCHEMA_VERSION || !parsed.missions) return fallback;
    return { ...fallback, ...parsed, missions: { ...fallback.missions, ...parsed.missions } };
  } catch { return fallback; }
}
export function beginMission(progress: MissionProgress): MissionProgress { return { ...progress, status: "IN_PROGRESS", currentBeat: progress.missionId === "graybox" ? "REACH_CONSOLE" : (progress.currentBeat === "BRIEFING" ? "INSERTION" : progress.currentBeat) }; }
export function beginM0(progress: MissionProgress): MissionProgress { return { ...progress, status: "IN_PROGRESS", currentBeat: "INSERTION" }; }
export function setM0Decision(progress: MissionProgress, decision: "vent-cut" | "vent-increase" | "suppression"): MissionProgress { return { ...progress, currentBeat: "INCIDENT_RESPONSE", selectedChoices: { ...progress.selectedChoices, m0Decision: decision } }; }
export function revealM0Evidence(progress: MissionProgress): MissionProgress { return { ...progress, currentBeat: "EVIDENCE_REVEAL" }; }
export function unlockM0Archive(progress: MissionProgress): MissionProgress { return { ...progress, currentBeat: "ARCHIVE_UNLOCK" }; }
export function transitionBeat(progress: MissionProgress, next: MissionBeat): MissionProgress {
  const currentIndex = beats.indexOf(progress.currentBeat); const nextIndex = beats.indexOf(next);
  if (nextIndex < 0 || nextIndex > currentIndex + 1 || (next === "COMPLETE" && progress.currentBeat !== "FIELD_MANUAL" && progress.currentBeat !== "VERDICT" && progress.currentBeat !== "REVIEW_VERDICT")) return progress;
  return { ...progress, currentBeat: next, status: next === "COMPLETE" ? "COMPLETE" : "IN_PROGRESS" };
}
export function markConsoleReached(progress: MissionProgress): MissionProgress { return { ...progress, currentBeat: "CONFIGURE" }; }
export function setAirflow(progress: MissionProgress, airflow: number): MissionProgress { return { ...progress, configuration: { ...progress.configuration, airflow: Math.max(0, Math.min(100, airflow)) } }; }
export function toggleDirection(progress: MissionProgress): MissionProgress { return { ...progress, configuration: { ...progress.configuration, direction: progress.configuration.direction === "Concurrent" ? "Opposed" : "Concurrent" } }; }
export function activateTest(progress: MissionProgress): MissionProgress { return { ...progress, currentBeat: "REVIEW_VERDICT" }; }
export function viewVerdict(progress: MissionProgress): MissionProgress { return { ...progress, verdictViewed: true, currentBeat: "COMPLETE", status: "COMPLETE" }; }
export function missionStatus(definition: MissionDefinition, progress?: MissionProgress): MissionStatus { return progress?.status ?? definition.status; }
export function objectiveForBeat(beat: MissionBeat): string { if (beat === "REACH_CONSOLE") return "Reach the chamber control console."; if (beat === "CONFIGURE") return "Configure the test chamber."; if (beat === "REVIEW_VERDICT") return "Review the evidence verdict."; if (beat === "COMPLETE") return "Mission sequence complete."; return "Enter the mission deck."; }

export function addPrediction(state: CampaignState, prediction: PredictionRecord): CampaignState { return { ...state, predictions: [...state.predictions.filter((item) => !(item.missionId === prediction.missionId && item.questionId === prediction.questionId)), prediction] }; }
export function comparePrediction(prediction: PredictionRecord | undefined, archiveValue?: string): PredictionComparison { if (!prediction || !archiveValue) return "NOT_COMPARABLE"; return prediction.selectedOption === archiveValue ? "ALIGNED" : "CONTRADICTED"; }
export function addDecision(state: CampaignState, decision: MissionDecision): CampaignState { return { ...state, decisions: [...state.decisions.filter((item) => !(item.missionId === decision.missionId && item.decisionId === decision.decisionId)), decision] }; }
export function addGap(state: CampaignState, gap: CampaignGapLog): CampaignState { return state.gapLog.some((item) => item.missionId === gap.missionId && item.missingCondition === gap.missingCondition) ? state : { ...state, gapLog: [...state.gapLog, gap] }; }
export function unlockManual(state: CampaignState, entry: FieldManualEntry): CampaignState { return { ...state, manual: state.manual.some((item) => item.id === entry.id) ? state.manual.map((item) => item.id === entry.id ? { ...item, unlocked: true } : item) : [...state.manual, { ...entry, unlocked: true }] }; }
export function completeMission(state: CampaignState, missionId: string, nextMissionId?: string): CampaignState { const current = state.missions[missionId]; return { ...state, activeMissionId: nextMissionId ?? null, missions: { ...state.missions, [missionId]: { ...current, status: "COMPLETE", currentBeat: "COMPLETE" }, ...(nextMissionId && state.missions[nextMissionId] ? { [nextMissionId]: { ...state.missions[nextMissionId], status: "AVAILABLE" } } : {}) } }; }
export function resetCampaign(definitions: MissionDefinition[]): CampaignState { return createInitialCampaign(definitions); }

export function validateVerdict(verdict: MissionVerdictReference): string[] {
  const errors: string[] = [];
  if (verdict.verdict === "SYSTEM_TEST") return [];
  if ((verdict.verdict === "EXACT" || verdict.verdict === "CONTRADICTED") && verdict.evidence.filter((item) => item.evidenceRole === "DIRECT").length === 0) errors.push(`${verdict.verdict} requires DIRECT evidence`);
  if (verdict.verdict === "BOUND" && (!verdict.evidence.length || !verdict.boundaryDifferences?.length)) errors.push("BOUND requires evidence and boundary differences");
  if (verdict.verdict === "INSUFFICIENT" && !verdict.namedGap) errors.push("INSUFFICIENT requires a named evidence gap");
  if (verdict.verdict === "REFUSAL" && !verdict.unsupportedCondition) errors.push("REFUSAL requires an unsupported condition");
  return errors;
}
export function assertValidVerdict(verdict: MissionVerdictReference): MissionVerdictReference { const errors = validateVerdict(verdict); if (errors.length) throw new Error(errors.join("; ")); return verdict; }

// Compatibility adapter for the already-working developer graybox route.
export function serializeCampaign(progress: MissionProgress): string { return JSON.stringify(progress); }
export function parseCampaign(serialized: string | null, missionId: string): MissionProgress { if (!serialized) return initialMissionProgress(missionId); try { const parsed = JSON.parse(serialized) as MissionProgress; return parsed?.missionId === missionId ? parsed : initialMissionProgress(missionId); } catch { return initialMissionProgress(missionId); } }
