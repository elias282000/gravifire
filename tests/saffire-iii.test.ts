import { describe, expect, it } from "vitest";
import { parseSAFFIREIIIExperimentalTable } from "../scripts/psi/parsers/saffire-iii-parser";
import { normalizeSAFFIREIIIRun } from "../scripts/psi/normalizers/normalize-saffire-iii";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeRun } from "../src/lib/challenge-engine";
import { nasaSaffireIIIExperimentRuns } from "../src/data/nasa-experiment-runs";

const manifest = { investigationId: "PSI-100", family: "SAFFIRE-III" as const, title: "Spacecraft Fire Experiment-III", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-100", sourceType: "NASA_PSI_INVESTIGATION" as const, files: [] };
const csv = "Sample Number ,Material,Sample Thickness,Sample Length,Sample Width,Air Flow ,Direction,Camera 1,Camera 2\nS1,SIBAL Fabric,.33 cm,94 cm,40.6 cm,30 cm/s,Concurrent ,S1C1,S1C2\nS2,SIBAL Fabric,.33 cm,94 cm,40.6 cm,30 cm/s,Opposed,S2C1,S2C2";

describe("SAFFIRE-III PSI-100 pipeline", () => {
    it("parses the two exact source rows and trims canonical headers", () => {
        const records = parseSAFFIREIIIExperimentalTable(`\ufeff${csv}`);
        expect(records).toHaveLength(2);
        expect(records[0].values["Sample Number"]).toBe("S1");
        expect(records[0].rawHeaders[0]).toBe("Sample Number ");
        expect(records[1].values.Direction).toBe("Opposed");
    });

    it("preserves PSI values while recording deterministic conversions and conflicts", () => {
        const record = parseSAFFIREIIIExperimentalTable(csv)[0];
        const run = normalizeSAFFIREIIIRun(record, manifest, "PSI-100_Experimental table_SAFFIRE-3.csv", "2026-01-01T00:00:00.000Z", "sha256");
        expect(run.dataStatus).toBe("REAL_NASA_DATA");
        expect(run.saffireIIIData?.normalizedMaterial).toBe("SIBAL");
        expect(run.saffireIIIData?.sampleThickness.rawValue).toBe(".33 cm");
        expect(run.saffireIIIData?.sampleThickness.parsedValue).toBe(0.33);
        expect(run.saffireIIIData?.sampleThickness.normalizedMm).toBe(3.3);
        expect(run.saffireIIIData?.sampleThickness.sourceConflictStatus).toBe("EXTERNAL_SOURCE_UNIT_CONFLICT");
        expect(run.saffireIIIData?.airflow.parsedValue).toBe(30);
        expect(run.saffireIIIData?.sourceConflicts.map((item) => item.field)).toEqual(["thickness", "airflow", "sampleLength"]);
    });

    it("does not create unsupported scientific fields or media assets", () => {
        const run = normalizeSAFFIREIIIRun(parseSAFFIREIIIExperimentalTable(csv)[1], manifest, "source.csv", "2026-01-01T00:00:00.000Z", "sha256");
        expect(run.saffireIIIData?.dataAvailability.notReportedInCurrentSource).toContain("oxygen");
        expect(run.saffireIIIData?.dataAvailability.notReportedInCurrentSource).toContain("burn duration");
        expect(run.measurements).toBeUndefined();
        expect(run.evidenceAssets).toHaveLength(0);
        expect(run.outcome).toBe("UNKNOWN");
    });

    it("answers only supported PSI-100 facts and preserves conflict wording", () => {
        const airflow = answerGroundedQuery({ query: "What airflow does the PSI-100 table report for S1?", investigationId: "saffire-iii" });
        const oxygen = answerGroundedQuery({ query: "What oxygen was used in S1?", investigationId: "saffire-iii" });
        const thickness = answerGroundedQuery({ query: "What is the thickness of S1?", investigationId: "saffire-iii" });
        expect(airflow.answer).toContain("30 cm/s");
        expect(airflow.answer).toContain("25 cm/s");
        expect(oxygen.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
        expect(thickness.answer).toContain("unresolved source-unit conflict");
    });

    it("challenges both explicit source conflicts without downgrading the primary record", () => {
        const result = challengeRun(nasaSaffireIIIExperimentRuns.find((run) => run.id === "S1")!);
        expect(result.challengeStatus).toBe("CONFLICTING_EVIDENCE");
        expect(result.conflicts.some((item) => item.conflictType === "SOURCE_UNIT_CONFLICT")).toBe(true);
        expect(result.conflicts.some((item) => item.conflictType === "SOURCE_CONTEXT_CONFLICT")).toBe(true);
        expect(result.supportingEvidence.some((item) => item.text.includes("REAL NASA DATA"))).toBe(true);
    });
});
