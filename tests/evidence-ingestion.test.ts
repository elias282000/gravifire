import { describe, expect, it } from "vitest";
import { parseBASSIIEvidenceFilename } from "../scripts/psi/parsers/bass-ii-evidence-filename-parser";
import { matchBASSIIEvidence } from "../scripts/psi/evidence/match-evidence";
import { resolveSafeEvidencePath } from "../src/lib/evidence-serving";
import { NASAExperimentEvidenceAsset, NASAExperimentRun } from "../src/types/experiment";

const run: NASAExperimentRun = {
    id: "B1", investigationId: "bass-ii", sourceExperimentId: "B1", title: "BASS-II test B1", family: "BASS-II", material: "100 micron PMMA film", environment: "Microgravity (investigation context)", parameters: {}, observations: {}, outcome: "UNKNOWN", evidenceAssets: [], source: { repositoryName: "NASA Physical Sciences Informatics", investigationId: "PSI-25", url: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25" }, provenance: { sourceFile: "table.csv", sourceSha256: "a".repeat(64), sourceRow: 2, originalFields: [], ingestionNote: "test" }, dataStatus: "REAL_NASA_DATA", sourceMetadata: { investigationId: "PSI-25", principalInvestigator: "Bhattacharjee", sourceSampleId: "147", rawMaterialDescription: "100 micron PMMA film", testDateRaw: "2/19/2014", gmtRaw: "50", normalizedMaterial: "PMMA", materialNormalizationStatus: "NORMALIZED" }, measurements: { initialOxygenPercent: { rawValue: "22.2", parsedValue: 22.2, unit: "%", status: "EXACT" }, finalOxygenPercent: { rawValue: "22.2", parsedValue: 22.2, unit: "%", status: "EXACT" }, initialCO2Percent: { rawValue: "0.44", parsedValue: 0.44, unit: "%", status: "EXACT" }, finalCO2Percent: { rawValue: "0.44", parsedValue: 0.44, unit: "%", status: "EXACT" }, initialCOPpm: { rawValue: "0", parsedValue: 0, unit: "ppm", status: "EXACT" }, finalCOPpm: { rawValue: "6", parsedValue: 6, unit: "ppm", status: "EXACT" } }, rawRecord: {}, bassIIConfiguration: { flowRestrictorRaw: "2", fanDisplayRaw: "62", airDisplayRaw: "5", radiometerGainRaw: "50", totalFramesShotRaw: "57" }, normalizationWarnings: []
};

function asset(partial: Partial<NASAExperimentEvidenceAsset> = {}): NASAExperimentEvidenceAsset {
    return { id: "asset-1", investigationId: "PSI-25", assetType: "RAW_VIDEO", fileName: "file.mp4", localPath: "src/data/nasa/raw/bass-ii/evidence/file.mp4", mediaType: "video/mp4", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25", sha256: "b".repeat(64), sizeBytes: 1, dataStatus: "REAL_NASA_DATA", matchMethod: "UNMATCHED", matchConfidence: "UNMATCHED", provenance: { sourceFile: "file.mp4", relativePath: "src/data/nasa/raw/bass-ii/evidence/file.mp4", investigationId: "PSI-25", investigationUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25", ingestionTimestamp: "2026-01-01T00:00:00.000Z" }, ...partial };
}

describe("BASS-II evidence linking", () => {
    it("parses exact and case-preserving TEST/SAMPLE tokens", () => {
        expect(parseBASSIIEvidenceFilename("PSI-25_Raw Data_BASS_GMT50_SAMPLE_147_TEST_B1.mp4")).toMatchObject({ investigationId: "PSI-25", sourceSampleId: "147", sourceExperimentId: "B1", rawGmt: "50", extension: "mp4" });
        expect(parseBASSIIEvidenceFilename("TEST_O3a.mp4").sourceExperimentId).toBe("O3a");
        expect(parseBASSIIEvidenceFilename("TEST_P13b.mp4").sourceExperimentId).toBe("P13b");
        expect(parseBASSIIEvidenceFilename("TEST_T28a.mp4").sourceExperimentId).toBe("T28a");
    });

    it("matches TEST and SAMPLE exactly", () => {
        const result = matchBASSIIEvidence(asset(), parseBASSIIEvidenceFilename("SAMPLE_147_TEST_B1.mp4"), [run]);
        expect(result.linkedRun?.sourceExperimentId).toBe("B1");
        expect(result.warning).toBeUndefined();
    });

    it("keeps TEST-only matches partial and rejects sample conflicts", () => {
        const partial = matchBASSIIEvidence(asset(), parseBASSIIEvidenceFilename("TEST_B1.mp4"), [run]);
        expect(partial.linkedRun?.sourceExperimentId).toBe("B1");
        expect(partial.warning).toContain("SAMPLE token was absent");
        const conflict = matchBASSIIEvidence(asset(), parseBASSIIEvidenceFilename("SAMPLE_999_TEST_B1.mp4"), [run]);
        expect(conflict.linkedRun).toBeUndefined();
        expect(conflict.warning).toContain("Sample conflict");
    });

    it("leaves unknown filenames unmatched", () => {
        const result = matchBASSIIEvidence(asset(), parseBASSIIEvidenceFilename("unrelated-video.mp4"), [run]);
        expect(result.linkedRun).toBeUndefined();
        expect(result.warning).toContain("No explicit TEST token");
    });

    it("rejects traversal paths while allowing a relative evidence path", () => {
        expect(resolveSafeEvidencePath("D:/gravifire", "src/data/nasa/raw/bass-ii/evidence/file.mp4")).toBe("D:\\gravifire\\src\\data\\nasa\\raw\\bass-ii\\evidence\\file.mp4");
        expect(resolveSafeEvidencePath("D:/gravifire", "../../secrets/file.mp4")).toBeNull();
        expect(resolveSafeEvidencePath("D:/gravifire", "D:/secrets/file.mp4")).toBeNull();
    });
});
