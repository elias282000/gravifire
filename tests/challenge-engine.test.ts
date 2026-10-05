import { describe, expect, it } from "vitest";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import { answerGroundedQuery } from "@/lib/grounded-query";
import { challengeAskAnswer, challengeRecommendation, challengeRun, challengeLandscapeRegion, challengeComparison } from "@/lib/challenge-engine";
import { recommendExperiments } from "@/lib/recommendations";
import { runSelfAudit } from "@/lib/self-audit";

describe("Challenge My Science", () => {
    it("audits B1 direct evidence and missing scientific fields", () => {
        const result = challengeRun(nasaExperimentRuns.find((run) => run.id === "B1")!);
        expect(result.challengeStatus).toBe("ROBUST_WITHIN_SCOPE");
        expect(result.supportingEvidence.some((finding) => finding.text.includes("REAL NASA DATA"))).toBe(true);
        expect(result.missingEvidence.some((finding) => finding.text.includes("outcome"))).toBe(true);
        expect(result.missingEvidence.some((finding) => finding.text.toLowerCase().includes("pressure"))).toBe(true);
        expect(result.missingEvidence.some((finding) => finding.text.includes("technical-report link"))).toBe(true);
        expect(result.summary).not.toContain("directly discusses B1");
    });

    it("marks direct oxygen answers robust within scope", () => {
        const answer = answerGroundedQuery({ query: "What was the initial oxygen level in Test B1?" });
        const result = challengeAskAnswer(answer);
        expect(result.challengeStatus).toBe("ROBUST_WITHIN_SCOPE");
        expect(result.conflicts).toHaveLength(0);
    });

    it("flags unsupported answer segments", () => {
        const answer = answerGroundedQuery({ query: "What was the initial oxygen level in Test B1?" });
        answer.answerSegments[0].evidenceIds.push("not-supplied");
        const result = challengeAskAnswer(answer);
        expect(result.challengeStatus).toBe("CONFLICTING_EVIDENCE");
        expect(result.conflicts[0].text).toContain("UNSUPPORTED_ANSWER_SEGMENT");
    });

    it("challenges recommendations with metric and scope limitations", () => {
        const recommendation = recommendExperiments({ runs: nasaExperimentRuns, xId: "initial_oxygen_percent", yId: "initial_co2_percent" }).recommendations[0];
        const result = challengeRecommendation(recommendation);
        expect(result.challengeStatus).toBe("LIMITED_EVIDENCE");
        expect(result.limitations.some((finding) => finding.text.includes("scientific importance"))).toBe(true);
        expect(result.assumptions.some((finding) => finding.text.includes("8×8"))).toBe(true);
        expect(result.missingEvidence.some((finding) => finding.text.includes("exact NASA experiment"))).toBe(true);
    });

    it("challenges a landscape projection and comparisons without causal language", () => {
        const region = challengeLandscapeRegion({ targetId: "region-1", xId: "initial_oxygen_percent", yId: "initial_co2_percent", xLabel: "Initial Oxygen", yLabel: "Initial CO2", bounds: { x: { min: 13.6, max: 22.2 }, y: { min: 0, max: 1.85 } }, densityClass: "UNSAMPLED", pointCount: 0, nearbyRunIds: [] });
        expect(region.alternativeInterpretations[0].text).toContain("2D projection");
        const comparison = challengeComparison(nasaExperimentRuns.find((run) => run.id === "B1")!, nasaExperimentRuns.find((run) => run.id === "B2")!);
        expect(comparison.limitations.some((finding) => finding.text.includes("causal"))).toBe(true);
        expect(comparison.alternativeInterpretations[0].text).toContain("cause");
    });

    it("passes the current internal consistency self-audit", () => {
        const audit = runSelfAudit();
        expect(audit.passed).toBe(true);
        expect(audit.warnings).toHaveLength(0);
    });

    it("flags a proposed candidate outside observed bounds", () => {
        const recommendation = recommendExperiments({ runs: nasaExperimentRuns, xId: "initial_oxygen_percent", yId: "initial_co2_percent" }).recommendations[0];
        const invalid = { ...recommendation, candidatePoint: { ...recommendation.candidatePoint, x: recommendation.metadata.datasetBounds.x.max + 1 } };
        const audit = runSelfAudit(nasaExperimentRuns, [invalid]);
        expect(audit.passed).toBe(false);
        expect(audit.warnings.some((warning) => warning.message.includes("outside observed bounds"))).toBe(true);
    });
});
