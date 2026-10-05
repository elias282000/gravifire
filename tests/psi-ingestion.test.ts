import { describe, expect, it } from "vitest";
import { parseBassIIExperimentalTable } from "../scripts/psi/parsers/bass-ii-parser";
import { normalizeBassIIRecord } from "../scripts/psi/normalizers/normalize-bass-ii";
import { validateExperimentRun } from "../scripts/psi/validators/validate-experiment-run";
import { isDuplicateSourceExperimentId } from "../scripts/psi/validators/duplicate-record";
import { PSIInvestigationManifest } from "../src/types/psi-ingestion";

const manifest: PSIInvestigationManifest = { investigationId: "PSI-25", family: "BASS-II", title: "Burning and Suppression of Solids II", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-25", sourceType: "NASA_PSI_INVESTIGATION", files: [] };
const hash = "a".repeat(64);

function row(overrides: Record<string, string> = {}) {
    const values = { PI: "Bhattacharjee", "Test #": "B1", Date: "2/19/2014", GMT: "50", "Sample #": "147", "Fuel Sample Material": "100 micron PMMA film 2 cm wide", "Flow restrictor": "2", "Fan display": "62", "Air display": "5", "Radiometer gain (1000 250 50 10)": "50", "Total Frames Shot": "57", "Calibrated initial O2 % by vol": "22.2", "Calibrated final O2 % by vol": "22.2", "Initial CO2 % by vol": "0.44", "Final CO2 % by vol": "0.44", "Initial CO (ppm)": "0", "Final CO (ppm)": "6", ...overrides };
    return { values, rawRecord: values, sourceRow: 2 };
}

describe("BASS-II Experimental Table ingestion", () => {
    it("trims UTF-8 BOM and surrounding header whitespace", () => {
        const content = "\uFEFFPI, Test # ,Date,GMT,Sample #,Fuel Sample Material,Flow restrictor,Fan display,Air display,Radiometer gain (1000 250 50 10),Total Frames Shot,Calibrated initial O2 % by vol,Calibrated final O2 % by vol,Initial CO2 % by vol,Final CO2 % by vol,Initial CO (ppm),Final CO (ppm)\nPI,B1,2/19/2014,50,147,100 micron PMMA film,2,62,5,50,57,22.2,22.2,0.44,0.44,0,6";
        const parsed = parseBassIIExperimentalTable(content);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].values["Test #"]).toBe("B1");
    });

    it("parses the real NASA Test # as the source identifier", () => {
        const normalized = normalizeBassIIRecord(row(), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(normalized.run.sourceExperimentId).toBe("B1");
        expect(normalized.run.provenance.sourceRow).toBe(2);
        expect(normalized.run.dataStatus).toBe("REAL_NASA_DATA");
    });

    it("classifies exact, missing, range, text, and negative gas values", () => {
        const normalized = normalizeBassIIRecord(row({ "Calibrated initial O2 % by vol": "22.2", "Calibrated final O2 % by vol": "none", "Initial CO2 % by vol": ">500", "Final CO2 % by vol": "OR", "Initial CO (ppm)": "-1", "Final CO (ppm)": "over" }), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(normalized.run.measurements?.initialOxygenPercent).toMatchObject({ parsedValue: 22.2, status: "EXACT" });
        expect(normalized.run.measurements?.finalOxygenPercent).toMatchObject({ parsedValue: null, status: "NOT_REPORTED" });
        expect(normalized.run.measurements?.initialCO2Percent).toMatchObject({ parsedValue: 500, comparator: ">", status: "ABOVE_RANGE" });
        expect(normalized.run.measurements?.finalCO2Percent).toMatchObject({ parsedValue: null, rawValue: "OR", status: "TEXT_STATUS" });
        expect(normalized.run.measurements?.initialCOPpm).toMatchObject({ parsedValue: -1, status: "EXACT" });
        expect(normalized.run.measurements?.finalCOPpm).toMatchObject({ parsedValue: null, rawValue: "over", status: "TEXT_STATUS" });
        expect(normalized.measurementTextStatusCount).toBe(2);
    });

    it("keeps instrument fields raw and does not map Air display to airflow", () => {
        const normalized = normalizeBassIIRecord(row({ "Fan display": "0.9   1.3   2.75", "Air display": "5 down to ext", "Total Frames Shot": "300+   +102" }), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(normalized.run.bassIIConfiguration).toMatchObject({ fanDisplayRaw: "0.9   1.3   2.75", airDisplayRaw: "5 down to ext", totalFramesShotRaw: "300+   +102" });
        expect(normalized.run.bassIIConfiguration?.totalFramesShotParsed).toBeUndefined();
        expect(normalized.run.parameters.airflowCmS).toBeUndefined();
    });

    it("normalizes only explicitly safe material names and dimensions", () => {
        const normalized = normalizeBassIIRecord(row(), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(normalized.run.sourceMetadata).toMatchObject({ normalizedMaterial: "PMMA", thicknessRaw: "100 micron", thicknessMm: 0.1, widthRaw: "2 cm wide", widthMm: 20, testDateIso: "2014-02-19" });
        const ambiguous = normalizeBassIIRecord(row({ "Fuel Sample Material": "1/4\" clear rod" }), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(ambiguous.run.sourceMetadata?.normalizedMaterial).toBeNull();
        expect(ambiguous.materialNormalizationReviewRequired).toBe(true);
    });

    it("keeps outcome unknown and validates provenance", () => {
        const normalized = normalizeBassIIRecord(row(), manifest, "source.csv", "2026-01-01T00:00:00.000Z", hash);
        expect(normalized.run.outcome).toBe("UNKNOWN");
        expect(normalized.run.rawRecord?.["Test #"]).toBe("B1");
        expect(validateExperimentRun(normalized.run).success).toBe(true);
        expect(validateExperimentRun({ ...normalized.run, provenance: { ...normalized.run.provenance, sourceSha256: "bad" } }).success).toBe(false);
    });

    it("detects duplicate Test # values without overwriting", () => {
        expect(isDuplicateSourceExperimentId(new Set(["B1"]), "B1")).toBe(true);
        expect(isDuplicateSourceExperimentId(new Set(["B1"]), "B2")).toBe(false);
    });
});
