import { describe, expect, it } from "vitest";
import observations from "../data/nasa/normalized/spice/observations.json";
import report from "../data/nasa/normalized/spice/ingestion-report.json";
import { nasaExperimentRuns } from "../src/data/nasa-experiment-runs";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeObservation } from "../src/lib/challenge-engine";
import { SPICEOperatingConditionObservation } from "../src/types/spice";

const rows = observations as SPICEOperatingConditionObservation[];

describe("SPICE PSI-107 operating-condition ingestion", () => {
    it("preserves observation semantics and source counts", () => {
        expect(rows).toHaveLength(469);
        expect(report.rawRows).toBe(469);
        expect(report.validObservations).toBe(469);
        expect(report.rejectedRecords).toBe(0);
        expect(report.runRecordsCreated).toBe(0);
        expect(rows.every((row) => row.sourceRecordType === "OPERATING_CONDITION_OBSERVATION")).toBe(true);
        expect(nasaExperimentRuns.some((run) => run.investigationId === "spice")).toBe(false);
        expect(new Set(rows.map((row) => row.nozzleDiameter.parsedValue)).size).toBe(3);
    });

    it("normalizes fuels without destroying raw labels", () => {
        expect(report.rawFuelCounts["75 % Propylene"]).toBe(119);
        expect(report.rawFuelCounts["75% Propylene"]).toBe(16);
        expect(report.canonicalFuelCounts.PROPYLENE_NITROGEN_MIXTURE).toBe(246);
        expect(rows.find((row) => row.rawFuel === "75 % Propylene")?.fuelConfiguration.percentageBasis).toBe("VOLUME");
        expect(rows.find((row) => row.rawFuel === "Methane")?.fuelConfiguration.normalizedMaterial).toBe("METHANE");
        expect(rows.find((row) => row.rawFuel === "Ethylene")?.fuelConfiguration.normalizedMaterial).toBe("ETHYLENE");
        expect(rows.find((row) => row.rawFuel === "Propane")?.fuelConfiguration.normalizedMaterial).toBe("PROPANE");
        expect(rows.find((row) => row.rawFuel === "Propylene")?.fuelConfiguration.normalizedMaterial).toBe("PROPYLENE");
    });

    it("preserves duplicates, anomalies, missing values, and time statuses", () => {
        expect(report.exactDuplicateOccurrences).toBe(34);
        expect(report.exactDuplicatePatternCount).toBe(31);
        expect(rows.some((row) => row.sourceWarnings.includes("EXACT_SOURCE_ROW_DUPLICATE"))).toBe(true);
        expect(rows.some((row) => row.airRateCmS.parsedValue === -0.28)).toBe(true);
        expect(rows.some((row) => row.airRateCmS.parsedValue === -5.92)).toBe(true);
        expect(rows.some((row) => row.airRateCmS.parsedValue === null && row.airRateCmS.rawValue === "")).toBe(true);
        expect(rows.some((row) => row.ignitionTime.status === "PARSED_COLON_TIME")).toBe(true);
        expect(rows.some((row) => row.ignitionTime.status === "PARSED_DOT_TIME")).toBe(true);
        expect(rows.some((row) => row.ignitionTime.status === "HHMM_LIKE_RAW")).toBe(true);
        expect(rows.some((row) => row.ignitionTime.status === "TEXT_STATUS" && /LOS|no ku/i.test(row.ignitionTime.rawValue))).toBe(true);
        expect(rows.some((row) => row.hydrocarbonFuelRateMgS.parsedValue === 0)).toBe(true);
        expect(rows.some((row) => row.airRateCmS.parsedValue === null && row.airRateCmS.status === "NOT_REPORTED")).toBe(true);
    });

    it("does not fabricate smoke-point results", () => {
        expect(report.smokePointLabelsAvailable).toBe(false);
        expect(report.flameLengthResultsAvailable).toBe(false);
        expect(rows.every((row) => !Object.prototype.hasOwnProperty.call(row, "smokePoint"))).toBe(true);
    });

    it("answers with the observation boundary", () => {
        const count = answerGroundedQuery({ query: "How many SPICE experiments are in this CSV?", investigationId: "spice" });
        expect(count.answer).toContain("469 operating-condition rows");
        expect(count.answer).not.toContain("469 experiments");
        const smoke = answerGroundedQuery({ query: "Was this a smoke point?", investigationId: "spice" });
        expect(smoke.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
        const observation = rows.find((row) => row.airRateCmS.parsedValue === -0.28) as SPICEOperatingConditionObservation;
        const air = answerGroundedQuery({ query: `What air rate is recorded for ${observation.internalObservationId}?`, investigationId: "spice" });
        expect(air.answer).toContain("-0.28");
    });

    it("challenges an observation without calling it a run", () => {
        const observation = rows[0];
        const challenge = challengeObservation(observation);
        expect(challenge.targetType).toBe("OBSERVATION");
        expect(challenge.summary).toContain("not a verified independent flame");
        expect(challenge.limitations.some((item) => item.text.includes("smoke-point"))).toBe(true);
        expect(challenge.limitations.some((item) => item.text.includes("OPERATING_CONDITION_OBSERVATION"))).toBe(true);
    });
});
