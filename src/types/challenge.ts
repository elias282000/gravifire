import { NASAExperimentRun } from "@/types/experiment";
import { EvidenceSource, GroundedQueryResult } from "@/types/ask";
import { ExperimentRecommendation } from "@/types/recommendation";
import { DensityClass, LandscapeBounds } from "@/types/landscape";
import { ScientificClaim } from "@/types/documents";
import { FLEX2ConfigurationEnvelope } from "@/types/configuration";
import { SPICEOperatingConditionObservation } from "@/types/spice";

export type ChallengeTargetType = "RUN" | "OBSERVATION" | "ASK_ANSWER" | "RECOMMENDATION" | "COMPARISON" | "LANDSCAPE_REGION" | "DOCUMENT_CLAIM" | "CONFIGURATION" | "UNKNOWN";
export type ChallengeFindingType = "SUPPORT" | "LIMITATION" | "MISSING_EVIDENCE" | "CONFLICT" | "ASSUMPTION" | "SCOPE_WARNING" | "DATA_QUALITY" | "ALTERNATIVE_INTERPRETATION";
export type ChallengeSeverity = "INFO" | "CAUTION" | "IMPORTANT";
export type ChallengeStatus = "ROBUST_WITHIN_SCOPE" | "LIMITED_EVIDENCE" | "INSUFFICIENT_EVIDENCE" | "CONFLICTING_EVIDENCE";

export type ChallengeConflictType = "SOURCE_VALUE_CONFLICT" | "SOURCE_UNIT_CONFLICT" | "SOURCE_CONTEXT_CONFLICT";
export type ChallengeFinding = { id: string; type: ChallengeFindingType; severity: ChallengeSeverity; text: string; evidenceIds?: string[]; conflictType?: ChallengeConflictType };
export type ChallengeAssumption = { id: string; title: string; description: string; affectedFeatures: string[] };
export type ChallengeProvenance = { engineVersion: string; generatedAt: string; targetType: ChallengeTargetType; targetId: string; evidenceIdsUsed: string[]; assumptionIds: string[]; datasetScope: string };

export type ScientificChallengeResult = {
    targetType: ChallengeTargetType;
    targetId: string;
    summary: string;
    supportingEvidence: ChallengeFinding[];
    limitations: ChallengeFinding[];
    missingEvidence: ChallengeFinding[];
    conflicts: ChallengeFinding[];
    assumptions: ChallengeFinding[];
    scopeWarnings: ChallengeFinding[];
    dataQualityIssues: ChallengeFinding[];
    alternativeInterpretations: ChallengeFinding[];
    evidence: EvidenceSource[];
    challengeStatus: ChallengeStatus;
    provenance: ChallengeProvenance;
};

export type LandscapeChallengeTarget = { targetId: string; xLabel: string; yLabel: string; xId: string; yId: string; bounds: { x: LandscapeBounds; y: LandscapeBounds }; densityClass: DensityClass; pointCount: number; nearbyRunIds: string[]; material?: string; principalInvestigator?: string };
export type ChallengeInput = { type: "RUN"; run: NASAExperimentRun } | { type: "OBSERVATION"; observation: SPICEOperatingConditionObservation } | { type: "ASK_ANSWER"; result: GroundedQueryResult } | { type: "RECOMMENDATION"; recommendation: ExperimentRecommendation } | { type: "COMPARISON"; left: NASAExperimentRun; right: NASAExperimentRun } | { type: "LANDSCAPE_REGION"; region: LandscapeChallengeTarget } | { type: "DOCUMENT_CLAIM"; claim: ScientificClaim } | { type: "CONFIGURATION"; configuration: FLEX2ConfigurationEnvelope };

export type AssumptionId = "LANDSCAPE_GRID_8X8" | "CURRENTLY_INGESTED_BASS_II_ONLY" | "MISSING_VALUES_EXCLUDED" | "NORMALIZED_DISTANCE" | "MATERIAL_NORMALIZATION_CONSERVATIVE" | "NO_OUTCOME_MODEL" | "NO_CAUSAL_MODEL" | "NO_PHYSICAL_AIRFLOW_MAPPING" | "SAFFIRE_III_THICKNESS_SOURCE_CONFLICT" | "SAFFIRE_III_AIRFLOW_SOURCE_CONTEXT_CONFLICT" | "SAFFIRE_III_SAMPLE_LENGTH_CONTEXT_CONFLICT";
