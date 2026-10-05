import { NASAExperimentRun } from "@/types/experiment";
import { DensityClass, LandscapeBounds, LandscapePoint } from "@/types/landscape";

export type ProposedParameter = { variableId: string; label: string; unit: string; value: number };

export type RecommendationMetadata = {
    generationTimestamp: string;
    algorithmVersion: "Coverage Gap Ranking v1";
    selectedAxes: { x: string; y: string };
    activeFilters: { material: string; principalInvestigator: string };
    datasetRunIds: string[];
    datasetBounds: { x: LandscapeBounds; y: LandscapeBounds };
    gridConfiguration: { bins: number; candidateCell: { column: number; row: number; classification: DensityClass } };
    minimumEvidenceThreshold: number;
    rankingFormula: string;
};

export type ExperimentRecommendation = {
    id: string;
    investigationId: string;
    candidateParameters: ProposedParameter[];
    recommendationReason: string;
    informationValue: number;
    evidenceGap: { classification: DensityClass; matchingTests: number; region: { xMin: number; xMax: number; yMin: number; yMax: number } };
    nearestRuns: { run: NASAExperimentRun; distance: number }[];
    supportingVariables: string[];
    limitations: string[];
    generationMethod: "Coverage Gap Ranking v1";
    dataStatus: "PROPOSED_EXPERIMENT";
    metadata: RecommendationMetadata;
    candidatePoint: LandscapePoint;
};

export type RecommendationRequest = {
    runs: NASAExperimentRun[];
    xId: string;
    yId: string;
    material?: string;
    principalInvestigator?: string;
    region?: { xMin: number; xMax: number; yMin: number; yMax: number };
    topN?: number;
};

export type RecommendationResult = {
    status: "READY" | "INSUFFICIENT_EVIDENCE_FOR_RECOMMENDATION" | "UNSUPPORTED_VARIABLE" | "NO_CANDIDATE_REGION";
    recommendations: ExperimentRecommendation[];
    message?: string;
    filteredRunCount: number;
    observedBounds?: { x: LandscapeBounds; y: LandscapeBounds };
};
