export type SystemTrustSummary = {
    realRuns: number;
    rejectedRuns: number;
    evidenceAssets: number;
    documents: number;
    documentChunks: number;
    verifiedDocumentRunLinks: number;
    askTests: number;
    recommendationAlgorithmVersion: string;
    challengeEngineVersion: string;
    knownLimitations: string[];
    families: Array<{ family: string; investigationId: string; status: "INGESTED" | "NOT_INGESTED"; realRuns: number; rejectedRuns: number; evidenceAssets: number; documents: number }>;
};

export type SelfAuditWarning = { id: string; severity: "IMPORTANT" | "CAUTION"; message: string };
export type SelfAuditResult = { passed: boolean; warnings: SelfAuditWarning[] };
