export type ExplicitDocumentIdentifier = { sourceExperimentId: string; sourceSampleId?: string };

export function parseExplicitDocumentIdentifiers(text: string): ExplicitDocumentIdentifier[] {
    const tests = [...text.matchAll(/(?:\bTest\s*#?\s+|\bTEST_)([A-Za-z]+\d+[A-Za-z]?)/g)].map((match) => match[1]);
    const samples = [...text.matchAll(/(?:\bSample\s*#?\s*|\bSAMPLE_)([A-Za-z0-9]+)/g)].map((match) => match[1]);
    return [...new Set(tests)].map((sourceExperimentId) => ({ sourceExperimentId, ...(samples[0] ? { sourceSampleId: samples[0] } : {}) }));
}
