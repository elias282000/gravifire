import { ExperimentFamily, NASAExperimentRun } from "@/types/experiment";

export type PSISourceFile = {
    fileName: string;
    category?: string;
    sourceUrl?: string;
    mediaType?: string;
    localPath?: string;
    sha256?: string;
    sizeBytes?: number;
    downloadStatus?: "VERIFIED" | "LOCAL_ONLY" | "UNAVAILABLE" | "UNSUPPORTED";
};

export type PSIInvestigationManifest = {
    investigationId: string;
    family: ExperimentFamily;
    title: string;
    version?: string;
    sourceUrl: string;
    license?: string;
    doi?: string;
    retrievedAt?: string;
    sourceType: "NASA_PSI_INVESTIGATION";
    files: PSISourceFile[];
};

export type NormalizedScientificValue = {
    value: number | string | boolean;
    unit?: string;
    rawValue: string | number | boolean;
    rawUnit?: string;
    rawField: string;
    sourceFile: string;
    normalizationRule?: string;
};

export type NormalizedBASSIIRecord = {
    run: NASAExperimentRun;
    sourceValues: Record<string, NormalizedScientificValue>;
    materialNormalizationReviewRequired: boolean;
    measurementTextStatusCount: number;
};

export type RejectedRecord = {
    reason: string;
    sourceFile: string;
    sourceRow?: number;
    rawRecord: Record<string, unknown>;
};

export type IngestionReport = {
    investigation: string;
    timestamp: string;
    sourceFilesProcessed: string[];
    sourceFilesUnsupported: string[];
    rawRecordsFound: number;
    validRecords: number;
    rejectedRecords: number;
    duplicateRecords: number;
    fieldsDiscovered: string[];
    normalizedUnits: string[];
    warnings: string[];
    materialNormalizationReviewCount: number;
    measurementTextStatusCount: number;
    evidenceFilesFound: number;
    evidenceFilesMatched: number;
    evidenceFilesUnmatched: number;
    evidenceMatchWarnings: string[];
    videoAssets: number;
    imageAssets: number;
    otherAssets: number;
};
