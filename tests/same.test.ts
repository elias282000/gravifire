import { describe, expect, it } from "vitest";
import { parseSAMEExperimentalTable } from "../scripts/psi/parsers/same-parser";
import { normalizeSAMERecord } from "../scripts/psi/normalizers/normalize-same";
import manifest from "../data/nasa/manifests/psi-102-same.json";
import { PSIInvestigationManifest } from "../src/types/psi-ingestion";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeRun } from "../src/lib/challenge-engine";
import { nasaSameExperimentRuns } from "../src/data/nasa-experiment-runs";

const sameManifest = manifest as PSIInvestigationManifest;

const csv = "\uFEFFSample #, Sample Material  ,Air Flow (cm/s),Weight loss rate (mg/min),Aging Duration (minutes)\n1,Teflon,5,2,1\n5,Kapton: same conditions as 1-4,,,";

describe("SAME PSI-102 ingestion", () => {
    it("handles BOM, exact headers, physical airflow, and numeric fields", () => {
        const records = parseSAMEExperimentalTable(csv);
        const result = normalizeSAMERecord(records[0], sameManifest, "same.csv", "2026-09-30T00:00:00.000Z", "hash");
        expect(records[0].values["Sample #"]).toBe("1");
        expect(result.run.sameData?.sourceSampleId).toBe("1");
        expect(result.run.sameData?.airflowCmS).toMatchObject({ rawValue: "5", parsedValue: 5, unit: "cm/s", status: "EXACT" });
        expect(result.run.sameData?.weightLossRateMgMin.parsedValue).toBe(2);
        expect(result.run.sameData?.agingDurationMinutes.parsedValue).toBe(1);
        expect(result.run.dataStatus).toBe("REAL_NASA_DATA");
    });

    it("normalizes only explicit Teflon and Kapton and never copies referenced conditions", () => {
        const records = parseSAMEExperimentalTable(csv);
        const result = normalizeSAMERecord(records[1], sameManifest, "same.csv", "2026-09-30T00:00:00.000Z", "hash");
        expect(result.run.sameData?.normalizedMaterial).toBe("KAPTON");
        expect(result.run.sameData?.airflowCmS.status).toBe("NOT_REPORTED");
        expect(result.run.sameData?.weightLossRateMgMin.parsedValue).toBeNull();
        expect(result.run.sameData?.agingDurationMinutes.parsedValue).toBeNull();
    });

    it("preserves blanks as missing rather than zero", () => {
        const record = parseSAMEExperimentalTable(csv)[1];
        const result = normalizeSAMERecord(record, sameManifest, "same.csv", "2026-09-30T00:00:00.000Z", "hash");
        expect(result.run.sameData?.airflowCmS.parsedValue).not.toBe(0);
        expect(result.run.sameData?.airflowCmS.status).toBe("NOT_REPORTED");
    });

    it("answers SAME airflow from the structured record and does not invent detector response", () => {
        const airflow = answerGroundedQuery({ query: "What is the airflow for SAME Sample 1?" });
        expect(airflow.answer).toContain("5 cm/s");
        expect(airflow.evidence[0]?.citation).toBe("PSI-102:Sample-1");
        const detector = answerGroundedQuery({ query: "What was the detector response for SAME Sample 1?" });
        expect(detector.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
    });

    it("challenges SAME without applying the BASS-II airflow warning", () => {
        const result = challengeRun(nasaSameExperimentRuns.find((run) => run.id === "1")!);
        expect(result.supportingEvidence.some((item) => item.text.includes("SAME Experimental Table"))).toBe(true);
        expect(result.missingEvidence.some((item) => item.text.includes("Detector-response"))).toBe(true);
        expect(result.assumptions.some((item) => item.text.includes("Air display"))).toBe(false);
    });
});
