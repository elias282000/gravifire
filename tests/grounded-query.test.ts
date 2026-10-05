import { describe, expect, it } from "vitest";
import { answerGroundedQuery } from "@/lib/grounded-query";

describe("grounded query answering", () => {
    it("answers B1 initial oxygen from the structured NASA record", () => {
        const result = answerGroundedQuery({ query: "What was the initial oxygen level in Test B1?" });
        expect(result.answer).toContain("22.2%");
        expect(result.evidence.some((source) => source.citation === "PSI-25:Test-B1")).toBe(true);
        expect(result.evidenceCoverage).toBe("DIRECT");
    });

    it("returns B1 evidence without claiming a direct report link", () => {
        const result = answerGroundedQuery({ query: "What evidence do we have for B1?" });
        expect(result.evidence.some((source) => source.sourceType === "EXPERIMENT_RECORD")).toBe(true);
        expect(result.evidence.some((source) => source.sourceType === "NASA_RAW_VIDEO")).toBe(true);
        expect(result.answer).toContain("not directly linked");
        expect(result.limitations.some((item) => item.includes("Summary Report link"))).toBe(true);
    });

    it("reports genuinely missing B1 fields", () => {
        const result = answerGroundedQuery({ query: "What don't we know about B1?" });
        expect(result.limitations.some((item) => item.includes("airflow"))).toBe(true);
        expect(result.limitations.some((item) => item.includes("pressure"))).toBe(true);
        expect(result.limitations.some((item) => item.includes("outcome"))).toBe(true);
    });

    it("refuses unsupported causal interpretation", () => {
        const result = answerGroundedQuery({ query: "Why did B1 burn faster?" });
        expect(result.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
        expect(result.evidenceCoverage).toBe("INSUFFICIENT");
        expect(result.answer).toContain("does not currently have sufficient evidence");
    });

    it("retrieves the extinction velocity source page", () => {
        const result = answerGroundedQuery({ query: "What does NASA say about extinction velocity?" });
        expect(result.evidence.some((source) => source.citation === "NTRS-20210011385:p31")).toBe(true);
    });

    it("compares only stored fields", () => {
        const result = answerGroundedQuery({ query: "Compare B1 and B2" });
        expect(result.answer).toContain("Test B1");
        expect(result.answer).toContain("Test B2");
        expect(result.answer).toContain("initial O2");
        expect(result.limitations[0]).toContain("no causal interpretation");
    });

    it("uses conservative PMMA normalization", () => {
        const result = answerGroundedQuery({ query: "Which tests used PMMA?" });
        expect(result.answer).toContain("validated BASS-II records");
        expect(result.limitations[0]).toContain("Ambiguous material descriptions remain excluded");
    });

    it("handles invalid run IDs and unknown questions safely", () => {
        const invalid = answerGroundedQuery({ query: "What evidence do we have?", runId: "not-a-real-run" });
        expect(invalid.answer).toContain("could not find");
        const unknown = answerGroundedQuery({ query: "Tell me something unrelated" });
        expect(unknown.answerStatus).toBe("INSUFFICIENT_EVIDENCE");
        expect(unknown.evidence).toHaveLength(0);
    });

    it("explains a proposed ranking from supplied recommendation metadata", () => {
        const result = answerGroundedQuery({ query: "Why is this proposed condition ranked highly?", recommendationContext: "classification UNSAMPLED; matching tests 0; information value 0.789; nearest test M7" });
        expect(result.answer).toContain("classification UNSAMPLED");
        expect(result.evidence[0].citation).toBe("GRAVIFIRE:RECOMMENDATION");
        expect(result.limitations[0]).toContain("does not predict");
    });
});
