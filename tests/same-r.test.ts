import { describe, expect, it } from "vitest";
import { parseSAMERExperimentalTable } from "../scripts/psi/parsers/same-r-parser";
import { normalizeSAMERRun } from "../scripts/psi/normalizers/normalize-same-r";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeRun } from "../src/lib/challenge-engine";
import { nasaSameRExperimentRuns } from "../src/data/nasa-experiment-runs";

const manifest = { investigationId: "PSI-101", family: "SAME-R" as const, title: "Smoke Aerosol Measurement Experiment Reflight", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-101", sourceType: "NASA_PSI_INVESTIGATION" as const, files: [] };
const csv = "Sample Type,SAME Test #,Description,Date,Inlet velocity (cm/s),Rt/R0,Duration (sec),Primary aging time (sec),Primary mixing time (sec),Net aging time (sec)\nKapton,61,Baseline Aging,2-Aug,8.1,1.38,60,11,8,38\nLampwick,57,low flow run w STS,2-Aug,0,1.253,,,8,n/a\nTeflon,57,Baseline,2-Aug,1,1.253,120,1,8,21";

describe("SAME-R PSI-101 pipeline", () => {
    it("preserves exact headers, blank fields, n/a, and zero flow", () => {
        const records = parseSAMERExperimentalTable(`\ufeff${csv}`);
        expect(records).toHaveLength(3);
        expect(records[1].values["Inlet velocity (cm/s)"]).toBe("0");
        expect(records[1].values["Duration (sec)"]).toBe("");
        expect(records[1].values["Net aging time (sec)"]).toBe("n/a");
    });

    it("creates composite identity without changing source Test #", () => {
        const records = parseSAMERExperimentalTable(csv);
        const lampwick = normalizeSAMERRun(records[1], manifest, "source.csv", "2026-01-01T00:00:00.000Z", "hash");
        const teflon = normalizeSAMERRun(records[2], manifest, "source.csv", "2026-01-01T00:00:00.000Z", "hash");
        expect(lampwick.sourceExperimentId).toBe("57");
        expect(teflon.sourceExperimentId).toBe("57");
        expect(lampwick.id).not.toBe(teflon.id);
        expect(lampwick.sameRData?.sourceRunKey).toBe("LAMPWICK::57");
        expect(teflon.sameRData?.sourceRunKey).toBe("TEFLON::57");
        expect(lampwick.sameRData?.inletVelocityCmS.parsedValue).toBe(0);
        expect(lampwick.sameRData?.netAgingTime.status).toBe("NOT_APPLICABLE");
        expect(lampwick.sameRData?.rtR0.interpretationStatus).toBe("SOURCE_LABEL_ONLY");
    });

    it("keeps Test 57 ambiguous and does not invent scientific results", () => {
        const result = answerGroundedQuery({ query: "What happened in SAME-R Test 57?", investigationId: "same-r" });
        expect(result.answer).toContain("Lampwick Test 57");
        expect(result.answer).toContain("Teflon Test 57");
        const particle = answerGroundedQuery({ query: "What particle size was measured in SAME-R Test 61?", investigationId: "same-r" });
        expect(particle.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
    });

    it("challenges SAME-R limitations and source identity", () => {
        const run = nasaSameRExperimentRuns.find((item) => item.id === "same-r-lampwick-57");
        expect(run).toBeDefined();
        const result = challengeRun(run!);
        expect(result.limitations.some((item) => item.text.includes("Rt/R0"))).toBe(true);
        expect(result.missingEvidence.some((item) => item.text.includes("smoke-particle"))).toBe(true);
        expect(result.conflicts.some((item) => item.text.includes("SOURCE_IDENTIFIER_AMBIGUITY"))).toBe(true);
    });
});
