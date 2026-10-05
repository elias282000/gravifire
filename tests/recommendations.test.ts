import { describe, expect, it } from "vitest";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import { recommendExperiments, RECOMMENDATION_MINIMUM_EVIDENCE } from "@/lib/recommendations";

describe("coverage-based experiment recommendations", () => {
    const base = { runs: nasaExperimentRuns, xId: "initial_oxygen_percent", yId: "initial_co2_percent" };

    it("generates only sparse or unsampled candidates inside observed bounds", () => {
        const result = recommendExperiments(base);
        expect(result.status).toBe("READY");
        expect(result.recommendations).toHaveLength(5);
        result.recommendations.forEach((recommendation) => {
            expect(["SPARSE", "UNSAMPLED"]).toContain(recommendation.evidenceGap.classification);
            expect(recommendation.candidateParameters[0].value).toBeGreaterThanOrEqual(result.observedBounds!.x.min);
            expect(recommendation.candidateParameters[0].value).toBeLessThanOrEqual(result.observedBounds!.x.max);
            expect(recommendation.candidateParameters[1].value).toBeGreaterThanOrEqual(result.observedBounds!.y.min);
            expect(recommendation.candidateParameters[1].value).toBeLessThanOrEqual(result.observedBounds!.y.max);
            expect(recommendation.dataStatus).toBe("PROPOSED_EXPERIMENT");
        });
    });

    it("ranks deterministically and preserves reproducibility metadata", () => {
        const first = recommendExperiments(base).recommendations;
        const second = recommendExperiments(base).recommendations;
        expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
        expect(first.map((item) => item.informationValue)).toEqual(second.map((item) => item.informationValue));
        expect(first[0].metadata.algorithmVersion).toBe("Coverage Gap Ranking v1");
        expect(first[0].metadata.rankingFormula).toContain("sparsityScore");
        expect(first[0].metadata.datasetRunIds).toHaveLength(129);
    });

    it("applies a conservative PMMA filter", () => {
        const result = recommendExperiments({ ...base, material: "PMMA" });
        expect(result.status).toBe("READY");
        expect(result.filteredRunCount).toBe(41);
        expect(result.recommendations.every((recommendation) => recommendation.metadata.activeFilters.material === "PMMA")).toBe(true);
    });

    it("guards against too little evidence", () => {
        const result = recommendExperiments({ ...base, runs: nasaExperimentRuns.slice(0, RECOMMENDATION_MINIMUM_EVIDENCE - 1) });
        expect(result.status).toBe("INSUFFICIENT_EVIDENCE_FOR_RECOMMENDATION");
        expect(result.message).toContain(String(RECOMMENDATION_MINIMUM_EVIDENCE));
    });

    it("rejects unsupported axes and does not duplicate an existing point", () => {
        const unsupported = recommendExperiments({ ...base, xId: "airflow_cm_s" });
        expect(unsupported.status).toBe("UNSUPPORTED_VARIABLE");
        const result = recommendExperiments(base);
        const bounds = result.observedBounds!;
        const xEpsilon = (bounds.x.max - bounds.x.min) * 0.01;
        const yEpsilon = (bounds.y.max - bounds.y.min) * 0.01;
        result.recommendations.forEach((recommendation) => nasaExperimentRuns.forEach((run) => {
            const x = run.measurements?.initialOxygenPercent;
            const y = run.measurements?.initialCO2Percent;
            if (x?.status === "EXACT" && y?.status === "EXACT" && x.parsedValue !== null && y.parsedValue !== null) {
                expect(Math.abs(recommendation.candidatePoint.x - x.parsedValue) <= xEpsilon && Math.abs(recommendation.candidatePoint.y - y.parsedValue) <= yEpsilon).toBe(false);
            }
        }));
    });

    it("preloads a selected region and returns only candidates in that region", () => {
        const full = recommendExperiments(base);
        const first = full.recommendations[0].evidenceGap.region;
        const result = recommendExperiments({ ...base, region: first });
        result.recommendations.forEach((recommendation) => {
            expect(recommendation.candidatePoint.x).toBeGreaterThanOrEqual(first.xMin);
            expect(recommendation.candidatePoint.x).toBeLessThanOrEqual(first.xMax);
            expect(recommendation.candidatePoint.y).toBeGreaterThanOrEqual(first.yMin);
            expect(recommendation.candidatePoint.y).toBeLessThanOrEqual(first.yMax);
        });
    });
});
