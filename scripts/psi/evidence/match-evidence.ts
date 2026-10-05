import { NASAExperimentEvidenceAsset, NASAExperimentRun } from "../../../src/types/experiment";
import { ParsedBASSIIEvidenceFilename } from "../../../src/types/evidence";

export function matchBASSIIEvidence(asset: NASAExperimentEvidenceAsset, parsed: ParsedBASSIIEvidenceFilename, runs: NASAExperimentRun[]): { linkedRun?: NASAExperimentRun; warning?: string } {
    if (!parsed.sourceExperimentId) return { warning: "No explicit TEST token was found; evidence remains unmatched." };
    const run = runs.find((candidate) => candidate.sourceExperimentId === parsed.sourceExperimentId);
    if (!run) return { warning: `No validated NASA run matched TEST_${parsed.sourceExperimentId}.` };
    const sampleId = run.sourceMetadata?.sourceSampleId;
    if (parsed.sourceSampleId && sampleId && parsed.sourceSampleId !== sampleId) return { warning: `Sample conflict for TEST_${parsed.sourceExperimentId}: asset SAMPLE_${parsed.sourceSampleId} does not match table sample ${sampleId}.` };
    if (parsed.sourceSampleId && sampleId === parsed.sourceSampleId) return { linkedRun: run };
    return { linkedRun: run, warning: "TEST token matched, but SAMPLE token was absent; match is partial." };
}
