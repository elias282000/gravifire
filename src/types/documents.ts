export type NASAScientificDocument = {
    id: string;
    investigationId: string;
    title: string;
    documentId: string;
    authors?: string[];
    publicationDate?: string;
    documentType: string;
    sourceRepository: "NASA Technical Reports Server";
    sourceUrl: string;
    localPath: string;
    sha256: string;
    sizeBytes: number;
    dataStatus: "REAL_NASA_DATA";
    extractionStatus: "TEXT_EXTRACTED" | "EXTRACTION_FAILED" | "NOT_PROCESSED";
    provenance: {
        sourceFile: string;
        ingestionTimestamp: string;
        extractorVersion: string;
    };
};

export type NASADocumentPage = {
    documentId: string;
    pageNumber: number;
    text: string;
    sectionTitle: string | null;
    sectionPath: string[] | null;
    sourceFile: string;
    sha256: string;
    sourceUrl: string;
    ingestionTimestamp: string;
    extractorVersion: string;
};

export type NASADocumentChunk = {
    chunkId: string;
    documentId: string;
    pageStart: number;
    pageEnd: number;
    sectionTitle: string | null;
    text: string;
    sourceFile: string;
    sha256: string;
    citation: string;
    sourceUrl: string;
    ingestionTimestamp: string;
    extractorVersion: string;
};

export type ScientificClaim = {
    id: string;
    investigationId: string;
    statement: string;
    claimType: "EXPERIMENT_DESCRIPTION" | "TEST_MATRIX" | "OBSERVATION" | "RESULT" | "LIMITATION" | "METHOD" | "BACKGROUND" | "UNKNOWN";
    supportLevel: "DIRECT_SOURCE" | "DERIVED_SUMMARY" | "UNVERIFIED";
    sourceCitations: string[];
    relatedRunIds: string[];
    relatedMaterials: string[];
    relatedVariables: string[];
    extractionMethod: string;
    reviewStatus: "UNREVIEWED" | "REVIEWED";
};

export type DocumentExperimentLink = {
    documentId: string;
    chunkId: string;
    sourceExperimentId: string;
    sourceSampleId?: string;
    matchMethod: "TEST_AND_SAMPLE" | "TEST_IDENTIFIER" | "SAMPLE_CONFLICT";
    matchStatus: "VERIFIED" | "CANDIDATE" | "CONFLICT" | "UNMATCHED";
    citation: string;
    notes: string;
};

export type DocumentIngestionReport = {
    investigation: string;
    timestamp: string;
    documentsFound: number;
    documentsProcessed: number;
    pagesExtracted: number;
    chunksGenerated: number;
    directClaimsGenerated: number;
    verifiedRunLinks: number;
    candidateRunLinks: number;
    conflicts: number;
    warnings: string[];
};
