import { describe, expect, it } from "vitest";
import configurations from "../data/nasa/normalized/flex-2/configurations.json";
import report from "../data/nasa/normalized/flex-2/ingestion-report.json";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeConfiguration } from "../src/lib/challenge-engine";
import { nasaExperimentRuns } from "../src/data/nasa-experiment-runs";
import { nasaExperimentConfigurations } from "../src/data/nasa-experiment-configurations";

describe("FLEX-2 PSI-68 configuration envelopes", () => {
    it("ingests eight envelopes and no run records", () => {
        expect(report.rawRows).toBe(8);
        expect(report.validConfigurationEnvelopes).toBe(8);
        expect(configurations).toHaveLength(8);
        expect(configurations.every((item) => item.sourceRecordType === "EXPERIMENT_CONFIGURATION_ENVELOPE")).toBe(true);
        expect(nasaExperimentRuns.some((run) => run.family === "FLEX-2")).toBe(false);
    });
    it("preserves pure, mixture, range, option-set, and alternative-gas semantics", () => {
        const iso = configurations[0];
        expect(iso.id).toBe("flex2-isooctane-pure");
        expect(iso.fuelConfiguration.type).toBe("PURE");
        expect(iso.initialDropletDiameterRange.minValue).toBe(1.5);
        expect(iso.initialDropletDiameterRange.maxValue).toBe(5);
        expect(iso.oxygenMoleFractionOptions.values).toEqual([0.17, 0.21, 0.25, 0.3]);
        expect(iso.ambientPressureOptions.values).toEqual([0.5, 1, 1.5, 2, 3]);
        expect(iso.ambientGasMixtureOptions).toEqual([{ oxidizer: "O2", diluent: "N2" }, { oxidizer: "O2", diluent: "He" }]);
        const mixture = configurations.find((item) => item.rawFuelDescription.startsWith("Propanol (95%"));
        expect(mixture?.fuelConfiguration.fractionBasis).toBe("SOURCE_PERCENTAGE_UNSPECIFIED_BASIS");
        expect(mixture?.fuelConfiguration.components).toEqual([{ material: "PROPANOL", fraction: 0.95 }, { material: "GLYCEROL", fraction: 0.05 }]);
    });
    it("answers configuration questions without inventing run outcomes", () => {
        const count = answerGroundedQuery({ query: "How many FLEX-2 experiments were performed?", investigationId: "flex-2" });
        expect(count.answer).toContain("8 fuel/configuration entries");
        expect(count.answer).not.toContain("8 experiments");
        const outcome = answerGroundedQuery({ query: "Did IsoOctane extinguish?", investigationId: "flex-2" });
        expect(outcome.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
        expect(outcome.answer).toContain("configuration envelope");
        const flow = answerGroundedQuery({ query: "What flow velocities were investigated?", investigationId: "flex-2" });
        expect(flow.answer).toContain("0.1–5 cm/s");
    });
    it("challenges configuration-as-result interpretation", () => {
        const result = challengeConfiguration(nasaExperimentConfigurations[0]);
        expect(result.limitations.some((finding) => finding.text.includes("individual test identifier"))).toBe(true);
        expect(result.assumptions.some((finding) => finding.text.includes("EXPERIMENT_CONFIGURATION_ENVELOPE"))).toBe(true);
    });
});
