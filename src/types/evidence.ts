import { NASAExperimentEvidenceAsset } from "@/types/experiment";

export type ParsedBASSIIEvidenceFilename = {
    investigationId?: string;
    sourceExperimentId?: string;
    sourceSampleId?: string;
    rawGmt?: string;
    extension: string;
};

export type EvidenceMatchResult = {
    asset: NASAExperimentEvidenceAsset;
    linked: boolean;
    warning?: string;
};
