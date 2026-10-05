import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { sha256File } from "./utils/provenance";
import { NASAExperimentRun } from "../../src/types/experiment";
import { DocumentExperimentLink, DocumentIngestionReport, NASADocumentChunk, NASADocumentPage, NASAScientificDocument, ScientificClaim } from "../../src/types/documents";
import { parseExplicitDocumentIdentifiers } from "./documents/identifier-links";

const root = resolve(process.cwd());
const manifestPath = join(root, "data", "nasa", "manifests", "bass-ii-documents.json");
const outputDirectory = join(root, "data", "nasa", "normalized", "bass-ii");
const runDataPath = join(outputDirectory, "valid-runs.json");
const EXTRACTOR_VERSION = "pdfjs-dist-text-extractor@1.0.0";

type DocumentManifestEntry = { documentId: string; fileName: string; title: string; documentType: string; sourceRepository: "NASA Technical Reports Server"; sourceUrl: string; localPath: string };
type DocumentManifest = { investigationId: string; documents: DocumentManifestEntry[] };

async function writeJson(fileName: string, value: unknown): Promise<void> { await writeFile(join(outputDirectory, fileName), `${JSON.stringify(value, null, 2)}\n`, "utf8"); }

function detectSection(text: string): { title: string | null; path: string[] | null } {
    const knownHeading = text.split(/\r?\n/).map((line) => line.trim()).find((line) => /^(?:\d+(?:\.\d+)*\s+)?(?:Introduction|Individual Principal Investigator Report|Test Matrix|Results|Extinction Velocity|Appendix|Methods?|Discussion|Conclusion)\s*$/i.test(line) && line.length < 100);
    return knownHeading ? { title: knownHeading, path: [knownHeading] } : { title: null, path: null };
}

function splitChunks(text: string, maxLength = 1800): string[] {
    const paragraphs = text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
    const chunks: string[] = [];
    let current = "";
    for (const paragraph of paragraphs) {
        if (paragraph.length <= maxLength && current.length + paragraph.length + 2 <= maxLength) { current = current ? `${current}\n\n${paragraph}` : paragraph; continue; }
        if (current) chunks.push(current);
        if (paragraph.length <= maxLength) current = paragraph;
        else for (let index = 0; index < paragraph.length; index += maxLength) chunks.push(paragraph.slice(index, index + maxLength).trim());
        current = current && current.length > maxLength ? "" : current;
    }
    if (current) chunks.push(current);
    return chunks;
}

function citation(documentId: string, pageStart: number, pageEnd = pageStart): string { return `NTRS-${documentId}:p${pageStart}${pageEnd === pageStart ? "" : `-${pageEnd}`}`; }

function detectLinks(chunk: NASADocumentChunk, runs: NASAExperimentRun[]): DocumentExperimentLink[] {
    const links: DocumentExperimentLink[] = [];
    for (const identifier of parseExplicitDocumentIdentifiers(chunk.text)) {
        const sourceExperimentId = identifier.sourceExperimentId;
        const run = runs.find((candidate) => candidate.sourceExperimentId === sourceExperimentId);
        const sourceSampleId = identifier.sourceSampleId;
        if (!run) { links.push({ documentId: chunk.documentId, chunkId: chunk.chunkId, sourceExperimentId, ...(sourceSampleId ? { sourceSampleId } : {}), matchMethod: "TEST_IDENTIFIER", matchStatus: "UNMATCHED", citation: chunk.citation, notes: "Explicit test identifier was found, but no validated run matched it." }); continue; }
        const expectedSample = run.sourceMetadata?.sourceSampleId;
        if (sourceSampleId && expectedSample && sourceSampleId !== expectedSample) { links.push({ documentId: chunk.documentId, chunkId: chunk.chunkId, sourceExperimentId, sourceSampleId, matchMethod: "SAMPLE_CONFLICT", matchStatus: "CONFLICT", citation: chunk.citation, notes: `Document sample ${sourceSampleId} conflicts with validated table sample ${expectedSample}.` }); continue; }
        if (sourceSampleId && expectedSample === sourceSampleId) { links.push({ documentId: chunk.documentId, chunkId: chunk.chunkId, sourceExperimentId, sourceSampleId, matchMethod: "TEST_AND_SAMPLE", matchStatus: "VERIFIED", citation: chunk.citation, notes: "Explicit test and sample identifiers match the validated NASA run." }); continue; }
        links.push({ documentId: chunk.documentId, chunkId: chunk.chunkId, sourceExperimentId, matchMethod: "TEST_IDENTIFIER", matchStatus: "CANDIDATE", citation: chunk.citation, notes: "Explicit test identifier matched; sample identifier was not present in the same chunk." });
    }
    return links;
}

async function extractPages(pdfPath: string): Promise<string[]> {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const data = new Uint8Array(await readFile(pdfPath));
    const document = await pdfjs.getDocument({ data }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const content = await page.getTextContent();
        const text = content.items.map((item) => "str" in item && typeof item.str === "string" ? `${item.str}${"hasEOL" in item && item.hasEOL ? "\n" : " "}` : "").join("").trim();
        pages.push(text);
    }
    return pages;
}

async function main(): Promise<void> {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as DocumentManifest;
    const runs = JSON.parse(await readFile(runDataPath, "utf8")) as NASAExperimentRun[];
    const timestamp = new Date().toISOString();
    const documents: NASAScientificDocument[] = [];
    const pages: NASADocumentPage[] = [];
    const chunks: NASADocumentChunk[] = [];
    const claims: ScientificClaim[] = [];
    const links: DocumentExperimentLink[] = [];
    const warnings: string[] = [];
    let documentsFound = 0;
    for (const entry of manifest.documents) {
        const pdfPath = resolve(root, entry.localPath);
        try {
            const fileEntries = await readdir(resolve(pdfPath, ".."));
            if (!fileEntries.includes(entry.fileName)) { warnings.push(`${entry.fileName}: listed in manifest but not found locally.`); continue; }
            documentsFound += 1;
            const hash = await sha256File(pdfPath);
            const documentId = `NTRS-${entry.documentId}`;
            const documentRecord: NASAScientificDocument = { id: documentId, investigationId: manifest.investigationId, title: entry.title, documentId: entry.documentId, documentType: entry.documentType, sourceRepository: entry.sourceRepository, sourceUrl: entry.sourceUrl, localPath: entry.localPath.replace(/\\/g, "/"), sha256: hash.sha256, sizeBytes: hash.sizeBytes, dataStatus: "REAL_NASA_DATA", extractionStatus: "TEXT_EXTRACTED", provenance: { sourceFile: entry.fileName, ingestionTimestamp: timestamp, extractorVersion: EXTRACTOR_VERSION } };
            documents.push(documentRecord);
            const extractedPages = await extractPages(pdfPath);
            extractedPages.forEach((text, pageIndex) => {
                const pageNumber = pageIndex + 1;
                const section = detectSection(text);
                pages.push({ documentId, pageNumber, text, sectionTitle: section.title, sectionPath: section.path, sourceFile: entry.fileName, sha256: hash.sha256, sourceUrl: entry.sourceUrl, ingestionTimestamp: timestamp, extractorVersion: EXTRACTOR_VERSION });
                splitChunks(text).forEach((chunkText, chunkIndex) => {
                    const chunkId = `${documentId}:p${pageNumber}:c${chunkIndex + 1}`;
                    const chunk: NASADocumentChunk = { chunkId, documentId, pageStart: pageNumber, pageEnd: pageNumber, sectionTitle: section.title, text: chunkText, sourceFile: entry.fileName, sha256: hash.sha256, citation: citation(entry.documentId, pageNumber), sourceUrl: entry.sourceUrl, ingestionTimestamp: timestamp, extractorVersion: EXTRACTOR_VERSION };
                    chunks.push(chunk);
                    links.push(...detectLinks(chunk, runs));
                });
            });
        } catch (error) {
            warnings.push(`${entry.fileName}: ${error instanceof Error ? error.message : "document extraction failed"}`);
        }
    }
    await mkdir(outputDirectory, { recursive: true });
    const report: DocumentIngestionReport = { investigation: manifest.investigationId, timestamp, documentsFound, documentsProcessed: documents.length, pagesExtracted: pages.length, chunksGenerated: chunks.length, directClaimsGenerated: claims.length, verifiedRunLinks: links.filter((link) => link.matchStatus === "VERIFIED").length, candidateRunLinks: links.filter((link) => link.matchStatus === "CANDIDATE").length, conflicts: links.filter((link) => link.matchStatus === "CONFLICT").length, warnings };
    await writeJson("documents.json", documents);
    await writeJson("pages.json", pages);
    await writeJson("chunks.json", chunks);
    await writeJson("claims.json", claims);
    await writeJson("document-links.json", links);
    await writeJson("document-ingestion-report.json", report);
    console.log(`BASS-II document ingestion complete: ${documents.length} documents, ${pages.length} pages, ${chunks.length} chunks, ${claims.length} direct claims, ${report.verifiedRunLinks} verified run links.`);
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
