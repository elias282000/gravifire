import { describe, expect, it } from "vitest";
import flexRuns from "../data/nasa/normalized/flex/valid-runs.json";
import flexReport from "../data/nasa/normalized/flex/ingestion-report.json";
import { decodeFLEXBuffer, parseFLEXExperimentalTable } from "../scripts/psi/parsers/flex-parser";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeRun } from "../src/lib/challenge-engine";
import { NASAExperimentRun } from "../src/types/experiment";

describe("FLEX PSI-69 ingestion", () => {
    it("preserves CP1252 en dash and exact 15-column schema", () => {
        const content = decodeFLEXBuffer(Buffer.from("FLEX Test #,FLEX Identifier,Test Date,Test GMT,Fuel,Ambient pressure; mmHg,O initial ambient composition; mole fraction,N initial ambient composition; mole fraction,CO initial ambient composition; mole fraction,He initial ambient composition; mole fraction,Droplet initial diameter; mm,Visible flame extinction diameter; mm,Burning rate; mm,Burn time; s,Test end\n1,X,3/5/2009,12:00,Methanol,762,0.21,0.79,0,0,2.0,–,0.2,~6,Extinction\n", "utf8"));
        const [record] = parseFLEXExperimentalTable(content);
        expect(record.values["Visible flame extinction diameter; mm"]).toBe("–");
        expect(record.values["Burn time; s"]).toBe("~6");
    });
    it("matches the verified local dataset counts and semantics", () => {
        expect(flexReport.rawRows).toBe(274);
        expect(flexRuns).toHaveLength(274);
        expect(new Set(flexRuns.map((run) => run.sourceExperimentId)).size).toBe(274);
        expect(flexReport.duplicateFLEXIdentifierGroups[0].identifier).toBe("193F001");
        expect(flexReport.duplicateFLEXIdentifierGroups[0].testIds).toEqual(["70", "73"]);
        const test114 = flexRuns.find((run) => run.sourceExperimentId === "114");
        expect(test114?.flexData?.ambientPressure.parsedValue).toBe(0);
        expect(test114?.flexData?.sourceWarnings.some((warning) => warning.code === "SOURCE_VALUE_ANOMALY")).toBe(true);
        const dash = flexRuns.find((run) => run.flexData?.dropletInitialDiameter.status === "SOURCE_DASH");
        expect(dash?.flexData?.dropletInitialDiameter.rawValue).toBe("–");
    });
    it("answers extinction and keeps engineering identifier ambiguity", () => {
        const extinction = answerGroundedQuery({ query: "Did FLEX Test 2 extinguish?", investigationId: "flex" });
        expect(extinction.answer).toContain("Extinction");
        const ambiguous = answerGroundedQuery({ query: "What happened in FLEX identifier 193F001?", investigationId: "flex" });
        expect(ambiguous.answer).toContain("Test 70");
        expect(ambiguous.answer).toContain("Test 73");
    });
    it("challenges source semantics without treating them as invalid", () => {
        const test2 = flexRuns.find((run) => run.sourceExperimentId === "2");
        expect(test2).toBeDefined();
        const challenge = challengeRun(test2 as unknown as NASAExperimentRun);
        expect(challenge.limitations.some((item) => item.text.includes("CO") || item.text.includes("burning-rate"))).toBe(true);
        expect(challenge.challengeStatus).not.toBe("ROBUST_WITHIN_SCOPE");
    });
});
