import { ParsedBASSIIEvidenceFilename } from "../../../src/types/evidence";

export function parseBASSIIEvidenceFilename(fileName: string): ParsedBASSIIEvidenceFilename {
    const extension = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() : "";
    const stem = extension ? fileName.slice(0, -(extension.length + 1)) : fileName;
    const investigationMatch = stem.match(/(?:^|_)PSI-([0-9]+)(?:_|$)/i);
    const sampleMatch = stem.match(/(?:^|_)SAMPLE_([A-Za-z0-9]+)(?=_|$)/);
    const testMatch = stem.match(/(?:^|_)TEST_([A-Za-z0-9]+)(?=_|$)/);
    const gmtMatch = stem.match(/(?:^|_)GMT([^_]+)(?=_|$)/i);
    return {
        ...(investigationMatch ? { investigationId: `PSI-${investigationMatch[1]}` } : {}),
        ...(sampleMatch ? { sourceSampleId: sampleMatch[1] } : {}),
        ...(testMatch ? { sourceExperimentId: testMatch[1] } : {}),
        ...(gmtMatch ? { rawGmt: gmtMatch[1] } : {}),
        extension,
    };
}
