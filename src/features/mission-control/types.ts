export type MissionStatus = "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETE";
export type MissionBeat = "BRIEFING" | "INSERTION" | "INCIDENT_RESPONSE" | "EVIDENCE_REVEAL" | "ARCHIVE_UNLOCK" | "PREDICT" | "SOURCE_CONFIGURATION" | "EARTH_REFERENCE" | "REACH_CONSOLE" | "CONFIGURE" | "RUN" | "RUN_TEST" | "COMPARE" | "DECIDE" | "VERDICT" | "REVIEW_VERDICT" | "FIELD_MANUAL" | "COMPLETE";
export type InteractionType = "CONTROL" | "DISPLAY" | "EXIT";
export type VerdictType = "EXACT" | "BOUND" | "INSUFFICIENT" | "CONTRADICTED" | "REFUSAL" | "SYSTEM_TEST";
export type EvidenceRole = "DIRECT" | "CONTEXT" | "LIMITATION" | "CONFLICT" | "GAP" | "DERIVED_DISPLAY";
export type PredictionComparison = "ALIGNED" | "CONTRADICTED" | "NOT_COMPARABLE";
export type EvidenceAlignment = "DIRECTLY_SUPPORTED" | "PARTIALLY_SUPPORTED" | "BOUND" | "INSUFFICIENT" | "NOT_APPLICABLE";

export type MissionChoice = { id: string; label: string; value: string };
export type MissionInteraction = { id: string; label: string; interactionType: InteractionType; interactionDistance: number };
export type MissionEvidenceReference = {
  id: string; type: string; investigationId: string; family: string; sourceRecordId: string;
  sourcePathOrCitation: string; sourceField: string; rawValue: string; normalizedValue: string; unit: string;
  evidenceRole: EvidenceRole; notes?: string;
};
export type EvidenceBoundValue = { displayValue: string; rawValue: string; unit: string; sourceEvidenceId: string; calibrationLabel: string; displayStatus: "EVIDENCE_BOUND" | "STORY_METADATA" | "PLACEHOLDER" };
export type MissionVerdictReference = {
  verdict: VerdictType; conclusion: string; message?: string; evidence: MissionEvidenceReference[];
  limitations?: string[]; namedGap?: string; boundaryDifferences?: string[]; unsupportedCondition?: string;
  expected?: string; systemTest?: boolean; challengeTarget?: { type: string; id: string };
};
export type MissionBeatDefinition = { id: MissionBeat; title: string; objective: string; next?: MissionBeat[] };
export type MissionRunScenario = { id: string; label: string; values: Record<string, EvidenceBoundValue | string> };
export type MissionDefinition = {
  id: string; sequence: number; title: string; subtitle: string; act: string; material?: string; status: MissionStatus;
  objective: string; scientificScope: string; scientificPayloadState: "PENDING_EVIDENCE_BINDING" | "EVIDENCE_BOUND" | "SYSTEM_READY";
  storyContext: Record<string, string>; evidenceReadiness: "STORY READY" | "EVIDENCE PENDING" | "EVIDENCE BOUND" | "PLAYABLE" | "SYSTEM READY";
  interactions: MissionInteraction[]; beats: MissionBeatDefinition[]; predictChoice?: { questionId: string; question: string; options: MissionChoice[] };
  configurationControls?: string[]; runScenarios?: MissionRunScenario[]; decisionChoice?: { id: string; question: string; options: MissionChoice[] };
  verdictDefinitions: MissionVerdictReference[]; evidenceReferences: MissionEvidenceReference[]; fieldManualEntry?: { id: string; title: string; text: string };
  completionRules: string[]; nextMissionId?: string; verdict?: MissionVerdictReference;
};
export type MissionProgress = { missionId: string; status: MissionStatus; currentBeat: MissionBeat; selectedChoices: Record<string, string>; configuration: { airflow: number; direction: "Concurrent" | "Opposed"; oxygen: number }; verdictViewed: boolean; fieldManualUnlocks: string[]; playerPredictions: string[]; gapLog: string[]; viewedEvidenceRecords?: string[]; comparisonViewed?: boolean };
export type PredictionRecord = { missionId: string; questionId: string; selectedOption: string; selectedAt: string };
export type MissionDecision = { missionId: string; decisionId: string; selectedOption: string; evidenceAlignment: EvidenceAlignment; evidenceRefs: string[]; selectedAt: string };
export type CampaignGapLog = { id: string; missionId: string; title: string; missingCondition: string; reason: string; nearestEvidenceRefs: string[]; loggedAt: string };
export type FieldManualEntry = { id: string; title: string; text: string; missionId: string; evidenceRefs: string[]; unlocked: boolean };
export type EmberTrigger = "MISSION_START" | "PREDICTION_SELECTED" | "INTERACTION" | "CONFIGURATION_CHANGED" | "RUN_STARTED" | "VERDICT_REVEALED" | "GAP_LOGGED" | "MISSION_COMPLETE" | "INVALID_EVIDENCE_REQUEST";
export type EmberLine = { id: string; missionId: string; beat: MissionBeat; trigger: EmberTrigger; text: string; evidenceRefs: string[]; tone: "CALM" | "CAUTION" | "DIRECT" };
export type CampaignState = { schemaVersion: 2; activeMissionId: string | null; missions: Record<string, MissionProgress>; predictions: PredictionRecord[]; decisions: MissionDecision[]; gapLog: CampaignGapLog[]; manual: FieldManualEntry[]; verdictHistory: Array<{ missionId: string; verdict: MissionVerdictReference; viewedAt: string }>; challengeLinks: string[]; grayboxProgress?: MissionProgress };
