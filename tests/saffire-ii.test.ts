import { describe, expect, it } from "vitest";
import { parseSAFFIREIIExperimentalTable } from "../scripts/psi/parsers/saffire-ii-parser";
import { classifySAFFIREIIRecord, normalizeSAFFIREIINote, normalizeSAFFIREIIRun } from "../scripts/psi/normalizers/normalize-saffire-ii";

const headers = "Sample Number,Material,Samle Thickness ,Sample Length ,Sample Width (cm),Air Flow (cm/s),Percent O2 (Note 1),Ignition Power (W),Ignition Time (s),Burn Time (s),Flow Direction,?-g Burn Length,?-g Spread Length,1-g Burn Length,1-g Spread Rate,Camera 1,Camera 2";
const row = "2-1,Silicone,0.27 mm,29 cm,5 cm,20 cm/s,~ 21.5,80 W,9.2 s,Insignificant,Concurrent,~ 0,n/a,Complete,Acceleratory,S1C1,S1C2";
const rowTwo = "2-5,Cotton-Fiberglass (SIBAL),037 mm,29 cm,5 cm,20 cm/s,~ 22.1,80 W,9.2 s,145 s,Concurrent,29 cm,2.1 mm/s,Complete,Acceleratory,S5C1,S5C2";
const note = "Note 1 Derived from measured CO2 production and referenced to initial O2 concentration reported by ISS.,,,,,,,,,,,,,,,,";

describe("SAFFIRE-II source semantics", () => {
    it("trims BOM and recognizes exact headers", () => {
        const records = parseSAFFIREIIExperimentalTable(`\ufeff${headers}\n${row}`);
        expect(records).toHaveLength(1);
        expect(classifySAFFIREIIRecord(records[0])).toBe("COMBUSTION_EXPERIMENT");
        expect(records[0].values["Samle Thickness"]).toBe("0.27 mm");
    });

    it("preserves ambiguous thickness and explicit physical airflow", () => {
        const records = parseSAFFIREIIExperimentalTable(`${headers}\n${rowTwo}`);
        const normalized = normalizeSAFFIREIIRun(records[0], { investigationId: "PSI-99", family: "SAFFIRE-II", title: "Spacecraft Fire Experiment-II", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-99", sourceType: "NASA_PSI_INVESTIGATION", files: [] }, "source.csv", "2026-01-01T00:00:00.000Z", "hash", []);
        expect(normalized.saffireIIData?.airflowCmS.parsedValue).toBe(20);
        expect(normalized.saffireIIData?.sampleThickness.status).toBe("REVIEW_REQUIRED");
        expect(normalized.saffireIIData?.sampleThickness.parsedValue).toBeNull();
        expect(normalized.saffireIIData?.normalizedMaterial).toBe("SIBAL");
    });

    it("keeps note rows separate", () => {
        const records = parseSAFFIREIIExperimentalTable(`${headers}\n${note}`);
        expect(classifySAFFIREIIRecord(records[0])).toBe("SOURCE_NOTE");
        const normalized = normalizeSAFFIREIINote(records[0], { investigationId: "PSI-99", family: "SAFFIRE-II", title: "Spacecraft Fire Experiment-II", sourceUrl: "https://psi.nasa.gov/physci/repo/data/investigations/PSI-99", sourceType: "NASA_PSI_INVESTIGATION", files: [] }, "source.csv", "2026-01-01T00:00:00.000Z", "hash");
        expect(normalized.noteId).toBe("Note 1");
        expect(normalized.rawText).toContain("Derived from measured CO2");
    });
});
