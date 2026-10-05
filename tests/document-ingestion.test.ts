import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { parseExplicitDocumentIdentifiers } from "../scripts/psi/documents/identifier-links";
import { searchDocumentChunks } from "../src/lib/document-search";
import { NASADocumentChunk } from "../src/types/documents";

describe("NASA scientific document foundation", () => {
    it("parses only explicit test and sample context", () => {
        expect(parseExplicitDocumentIdentifiers("Test B1 used Sample 147")).toEqual([{ sourceExperimentId: "B1", sourceSampleId: "147" }]);
        expect(parseExplicitDocumentIdentifiers("TEST_O3a and TEST_P13b and TEST_T28a")).toEqual([{ sourceExperimentId: "O3a" }, { sourceExperimentId: "P13b" }, { sourceExperimentId: "T28a" }]);
        expect(parseExplicitDocumentIdentifiers("B1 appears in general prose")).toEqual([]);
    });

    it("generates stable page citations and preserves extracted page records", () => {
        const pages = JSON.parse(readFileSync(join(process.cwd(), "data/nasa/normalized/bass-ii/pages.json"), "utf8")) as Array<{ documentId: string; pageNumber: number; text: string; sha256: string }>;
        const chunks = JSON.parse(readFileSync(join(process.cwd(), "data/nasa/normalized/bass-ii/chunks.json"), "utf8")) as Array<{ citation: string; pageStart: number; pageEnd: number; text: string }>;
        expect(pages.length).toBeGreaterThan(0);
        expect(pages.every((page) => page.documentId === "NTRS-20210011385" && page.pageNumber > 0 && typeof page.text === "string" && page.sha256.length === 64)).toBe(true);
        expect(chunks.length).toBeGreaterThan(0);
        expect(chunks[0].citation).toMatch(/^NTRS-20210011385:p\d+$/);
        expect(chunks.every((chunk) => chunk.pageEnd >= chunk.pageStart && chunk.text.length > 0)).toBe(true);
    });

    it("preserves the registered PDF hash", () => {
        const path = join(process.cwd(), "src/data/nasa/raw/bass-ii/documents/TM-20210011385.pdf");
        const document = JSON.parse(readFileSync(join(process.cwd(), "data/nasa/normalized/bass-ii/documents.json"), "utf8")) as Array<{ sha256: string; localPath: string; documentId: string }>;
        expect(existsSync(path)).toBe(true);
        const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
        expect(document[0].sha256).toBe(hash);
        expect(document[0].documentId).toBe("20210011385");
    });

    it("searches chunks and returns exact citations", () => {
        const chunks: NASADocumentChunk[] = [{ chunkId: "NTRS-20210011385:p12:c1", documentId: "NTRS-20210011385", pageStart: 12, pageEnd: 12, sectionTitle: "Results", text: "PMMA extinction results", sourceFile: "TM-20210011385.pdf", sha256: "a".repeat(64), citation: "NTRS-20210011385:p12", sourceUrl: "https://ntrs.nasa.gov/citations/20210011385", ingestionTimestamp: "2026-01-01T00:00:00.000Z", extractorVersion: "test" }];
        expect(searchDocumentChunks(chunks, "extinction")[0].citation).toBe("NTRS-20210011385:p12");
        expect(searchDocumentChunks(chunks, "not-present")).toEqual([]);
    });
});
