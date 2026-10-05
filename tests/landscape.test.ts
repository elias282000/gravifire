import { describe, expect, it } from "vitest";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import { analyzeLandscapeVariables, buildLandscapePoints, calculateDensity, findExperimentTwin, nearestExperiments, observedBounds, parseLandscapeState } from "@/lib/landscape";

describe("Fire Landscape data utilities", () => {
    const variables = analyzeLandscapeVariables(nasaExperimentRuns);

    it("computes numeric availability from actual runs", () => {
        const initialOxygen = variables.find((variable) => variable.id === "initial_oxygen_percent");
        expect(initialOxygen?.availabilityCount).toBe(129);
        expect(initialOxygen?.missingCount).toBe(0);
    });

    it("excludes text-status measurements from plotting", () => {
        const points = buildLandscapePoints(nasaExperimentRuns, "initial_oxygen_percent", "final_oxygen_percent");
        const finalCo = variables.find((variable) => variable.id === "final_co_ppm");
        expect(finalCo?.textStatusCount).toBeGreaterThan(0);
        expect(points.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y))).toBe(true);
    });

    it("calculates observed bounds and deterministic density cells", () => {
        const points = buildLandscapePoints(nasaExperimentRuns, "initial_oxygen_percent", "initial_co2_percent");
        const bounds = observedBounds(points);
        expect(bounds.x?.min).toBeLessThanOrEqual(bounds.x?.max ?? 0);
        expect(calculateDensity(points)).toHaveLength(64);
        expect(calculateDensity([]).every((cell) => cell.classification === "UNSAMPLED")).toBe(true);
    });

    it("finds nearest real NASA runs without synthetic points", () => {
        const points = buildLandscapePoints(nasaExperimentRuns, "initial_oxygen_percent", "initial_co2_percent");
        const b1 = points.find((point) => point.runId === "B1");
        expect(b1).toBeDefined();
        const nearest = nearestExperiments(b1!, points, nasaExperimentRuns);
        expect(nearest.length).toBeGreaterThan(0);
        expect(nearest.every((item) => item.run.sourceExperimentId !== "B1")).toBe(true);
    });

    it("handles conservative material groups and twin fields", () => {
        const pmma = nasaExperimentRuns.filter((run) => run.sourceMetadata?.normalizedMaterial === "PMMA");
        const ambiguous = nasaExperimentRuns.find((run) => run.sourceMetadata?.rawMaterialDescription.includes("clear rod"));
        expect(pmma.length).toBeGreaterThan(0);
        expect(ambiguous?.sourceMetadata?.normalizedMaterial).not.toBe("PMMA");
        const b1 = nasaExperimentRuns.find((run) => run.id === "B1");
        expect(findExperimentTwin(b1!, nasaExperimentRuns).length).toBeGreaterThan(0);
    });

    it("parses deep-link axes safely and rejects unsupported axes", () => {
        expect(parseLandscapeState("?x=initial_oxygen_percent&y=initial_co2_percent&material=PMMA", variables)).toEqual({ x: "initial_oxygen_percent", y: "initial_co2_percent", material: "PMMA" });
        expect(parseLandscapeState("?x=airflow_cm_s&y=initial_co2_percent", variables).x).toBe("initial_oxygen_percent");
    });
});
