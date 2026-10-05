import { describe, expect, it } from "vitest";
import { parseSAFFIREExperimentalTable } from "../scripts/psi/parsers/saffire-parser";
import { classifySAFFIRERecord, normalizeSAFFIRERun, normalizeSAFFIREPretest } from "../scripts/psi/normalizers/normalize-saffire";
import { answerGroundedQuery } from "../src/lib/grounded-query";
import { challengeRun } from "../src/lib/challenge-engine";
import { nasaSaffireIExperimentRuns } from "../src/data/nasa-experiment-runs";
import manifest from "../data/nasa/manifests/psi-98-saffire-i.json";
import { PSIInvestigationManifest } from "../src/types/psi-ingestion";
const sourceManifest = manifest as PSIInvestigationManifest;
const csv = "\uFEFFSample Number ,Material,Sample Thickness (cm),Sample Length (cm),Sample Width (cm),Air Flow (cm/s),Percent O2,Ignition Power (W),Ignition Time (s),Burn Time (s),Flow Direction ,Camera 1,Camera 2\nS1,SIBAL Fabric,0.37,40.6,94,20,21.5 - 21.7,182,8,420,Concurrent,S1C1,S1C2\nS2,SIBAL Fabric,0.37,40.6,94,20,~ 21.5,182,8,70,Opposed,S2C1,S2C2\nF1C1/F1C2,Pre-test flow visulation data for sample 1,,,,,,,,,,,";

describe("SAFFIRE-I PSI-98 ingestion", () => {
    it("parses exact headers and classifies combustion versus pre-test records", () => {
        const records = parseSAFFIREExperimentalTable(csv);
        expect(records[0].values["Sample Number"]).toBe("S1");
        expect(classifySAFFIRERecord(records[0])).toBe("COMBUSTION_EXPERIMENT");
        expect(classifySAFFIRERecord(records[2])).toBe("PRETEST_FLOW_VISUALIZATION");
    });
    it("preserves oxygen range and approximate semantics without a midpoint", () => {
        const records = parseSAFFIREExperimentalTable(csv);
        const s1 = normalizeSAFFIRERun(records[0], sourceManifest, "saffire.csv", "time", "hash");
        const s2 = normalizeSAFFIRERun(records[1], sourceManifest, "saffire.csv", "time", "hash");
        expect(s1.saffireData?.oxygenMeasurement).toMatchObject({ status: "RANGE", minValue: 21.5, maxValue: 21.7 });
        expect(s1.saffireData?.oxygenMeasurement.parsedValue).toBeUndefined();
        expect(s2.saffireData?.oxygenMeasurement).toMatchObject({ status: "APPROXIMATE", approximateValue: 21.5 });
    });
    it("normalizes measurements and preserves cameras without creating assets", () => {
        const record = parseSAFFIREExperimentalTable(csv)[0];
        const run = normalizeSAFFIRERun(record, sourceManifest, "saffire.csv", "time", "hash");
        expect(run.saffireData?.normalizedMaterial).toBe("SIBAL");
        expect(run.saffireData?.airflowCmS.parsedValue).toBe(20);
        expect(run.saffireData?.sampleLengthCm.parsedValue).toBe(40.6);
        expect(run.saffireData?.ignitionPowerW.parsedValue).toBe(182);
        expect(run.saffireData?.burnTimeS.parsedValue).toBe(420);
        expect(run.saffireData?.flowDirection).toBe("Concurrent");
        expect(run.saffireData?.camera1Identifier).toBe("S1C1");
        expect(run.evidenceAssets).toHaveLength(0);
    });
    it("answers oxygen with source range and challenges family-specific gaps", () => {
        const result = answerGroundedQuery({ query: "What oxygen concentration was used in S1?", investigationId: "saffire-i" });
        expect(result.answer).toContain("21.5 - 21.7");
        expect(result.answer).not.toContain("21.6");
        expect(result.evidence[0]?.citation).toBe("PSI-98:Sample-S1");
        const challenge = challengeRun(nasaSaffireIExperimentRuns.find((run) => run.id === "S1")!);
        expect(challenge.assumptions.some((item) => item.text.includes("Air display"))).toBe(false);
        expect(challenge.missingEvidence.some((item) => item.text.includes("camera media"))).toBe(true);
    });
    it("does not turn pre-test records into combustion runs", () => {
        const records = parseSAFFIREExperimentalTable(csv);
        const pretest = normalizeSAFFIREPretest(records[2], sourceManifest, "saffire.csv", "time", "hash");
        expect(pretest.relatedSample).toBe("1");
        expect(nasaSaffireIExperimentRuns.some((run) => run.sourceExperimentId === "F1C1/F1C2")).toBe(false);
    });
});

