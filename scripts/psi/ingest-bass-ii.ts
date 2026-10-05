import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { BassIIDataSourceAdapter } from "./bass-ii-adapter";
import { parseBassIIFile } from "./parsers/bass-ii-parser";
import { normalizeBassIIRecord } from "./normalizers/normalize-bass-ii";
import { validateExperimentRun } from "./validators/validate-experiment-run";
import { sha256File } from "./utils/provenance";
import { isDuplicateSourceExperimentId } from "./validators/duplicate-record";
import { PSISourceFile, RejectedRecord, IngestionReport } from "../../src/types/psi-ingestion";
import { NASAExperimentEvidenceAsset, NASAExperimentRun } from "../../src/types/experiment";
import { parseBASSIIEvidenceFilename } from "./parsers/bass-ii-evidence-filename-parser";
import { matchBASSIIEvidence } from "./evidence/match-evidence";

const root = resolve(process.cwd());
const outputDirectory = join(root, "data", "nasa", "normalized", "bass-ii");
const manifestDirectory = join(root, "data", "nasa", "manifests");

async function writeJson(path: string, value: unknown): Promise<void> {
    await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function isSupported(fileName: string): boolean {
    return extname(fileName).toLowerCase() === ".csv";
}

async function main(): Promise<void> {
    const adapter = new BassIIDataSourceAdapter();
    const manifest = await adapter.getInvestigationMetadata();
    const files = await adapter.listSourceFiles();
    const timestamp = new Date().toISOString();
    const validRuns: NASAExperimentRun[] = [];
    const rejectedRecords: RejectedRecord[] = [];
    const sourceFilesProcessed: string[] = [];
    const sourceFilesUnsupported: string[] = [];
    const processedManifestFiles: PSISourceFile[] = [];
    const fieldsDiscovered = new Set<string>();
    const normalizedUnits = new Set<string>();
    const sourceExperimentIds = new Set<string>();
    let rawRecordsFound = 0;
    let duplicateRecords = 0;
    let materialNormalizationReviewCount = 0;
    let measurementTextStatusCount = 0;
    const warnings: string[] = [];
    const evidenceMatchWarnings: string[] = [];

    for (const file of files) {
        const fileHash = file.localPath ? await sha256File(file.localPath) : undefined;
        processedManifestFiles.push({ ...file, ...fileHash });
        if (!isSupported(file.fileName)) {
            sourceFilesUnsupported.push(file.fileName);
            processedManifestFiles[processedManifestFiles.length - 1] = { ...processedManifestFiles[processedManifestFiles.length - 1], downloadStatus: "UNSUPPORTED" };
            continue;
        }
        sourceFilesProcessed.push(file.fileName);
        try {
            const content = (await adapter.fetchSourceFile(file)).toString("utf8");
            const records = parseBassIIFile(content, file.fileName);
            rawRecordsFound += records.length;
            for (const parsed of records) {
                Object.keys(parsed.values).forEach((field) => fieldsDiscovered.add(field));
                try {
                    if (!fileHash?.sha256) throw new Error("Source file SHA-256 is missing");
                    const normalized = normalizeBassIIRecord(parsed, manifest, file.fileName, timestamp, fileHash.sha256);
                    if (isDuplicateSourceExperimentId(sourceExperimentIds, normalized.run.sourceExperimentId)) {
                        duplicateRecords += 1;
                        rejectedRecords.push({ reason: "Duplicate source experiment ID", sourceFile: file.fileName, sourceRow: parsed.sourceRow, rawRecord: parsed.values });
                        continue;
                    }
                    const validation = validateExperimentRun(normalized.run);
                    if (!validation.success) {
                        rejectedRecords.push({ reason: validation.reason, sourceFile: file.fileName, sourceRow: parsed.sourceRow, rawRecord: parsed.values });
                        continue;
                    }
                    sourceExperimentIds.add(normalized.run.sourceExperimentId);
                    validRuns.push(validation.data);
                    if (normalized.materialNormalizationReviewRequired) materialNormalizationReviewCount += 1;
                    measurementTextStatusCount += normalized.measurementTextStatusCount;
                    Object.values(normalized.sourceValues).forEach((value) => { if (value.unit) normalizedUnits.add(value.unit); });
                } catch (error) {
                    rejectedRecords.push({ reason: error instanceof Error ? error.message : "Unknown normalization error", sourceFile: file.fileName, sourceRow: parsed.sourceRow, rawRecord: parsed.values });
                }
            }
        } catch (error) {
            warnings.push(`${file.fileName}: ${error instanceof Error ? error.message : "Unable to parse source file"}`);
        }
    }

    const evidenceFiles = await adapter.listEvidenceFiles();
    const evidenceAssets: NASAExperimentEvidenceAsset[] = [];
    const unmatchedEvidenceAssets: NASAExperimentEvidenceAsset[] = [];
    for (const file of evidenceFiles) {
        if (!file.localPath) continue;
        const fileHash = await sha256File(file.localPath);
        const parsed = parseBASSIIEvidenceFilename(file.fileName);
        const relativePath = relative(root, file.localPath).replace(/\\/g, "/");
        const extension = parsed.extension;
        const assetType: NASAExperimentEvidenceAsset["assetType"] = extension === "mp4" ? "RAW_VIDEO" : ["png", "jpg", "jpeg", "webp"].includes(extension) ? "RAW_IMAGE" : ["csv", "json", "txt"].includes(extension) ? "RAW_DATA" : ["pdf", "doc", "docx", "ppt", "pptx"].includes(extension) ? "DOCUMENT" : "UNKNOWN";
        const mediaType = extension === "mp4" ? "video/mp4" : extension === "png" ? "image/png" : extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "application/octet-stream";
        const baseAsset: NASAExperimentEvidenceAsset = {
            id: `evidence-${fileHash.sha256.slice(0, 16)}`,
            investigationId: manifest.investigationId,
            ...(parsed.sourceExperimentId ? { sourceExperimentId: parsed.sourceExperimentId } : {}),
            ...(parsed.sourceSampleId ? { sourceSampleId: parsed.sourceSampleId } : {}),
            assetType, fileName: file.fileName, localPath: relativePath, mediaType, sourceUrl: manifest.sourceUrl, sha256: fileHash.sha256, sizeBytes: fileHash.sizeBytes, dataStatus: "REAL_NASA_DATA", matchMethod: "UNMATCHED", matchConfidence: "UNMATCHED",
            provenance: { sourceFile: file.fileName, relativePath, investigationId: manifest.investigationId, investigationUrl: manifest.sourceUrl, ingestionTimestamp: timestamp, ...(parsed.rawGmt ? { rawGmt: parsed.rawGmt } : {}), ...(parsed.sourceExperimentId ? { parsedTestId: parsed.sourceExperimentId } : {}), ...(parsed.sourceSampleId ? { parsedSampleId: parsed.sourceSampleId } : {}) },
        };
        const match = matchBASSIIEvidence(baseAsset, parsed, validRuns);
        if (match.linkedRun) {
            const exact = Boolean(parsed.sourceSampleId && match.linkedRun.sourceMetadata?.sourceSampleId === parsed.sourceSampleId);
            const matchedAsset = { ...baseAsset, matchMethod: exact ? "TEST_AND_SAMPLE" as const : "TEST_ONLY" as const, matchConfidence: exact ? "EXACT_IDENTIFIERS" as const : "PARTIAL_IDENTIFIERS" as const };
            evidenceAssets.push(matchedAsset);
            match.linkedRun.evidenceAssets.push(matchedAsset);
        } else {
            unmatchedEvidenceAssets.push(baseAsset);
        }
        if (match.warning) evidenceMatchWarnings.push(`${file.fileName}: ${match.warning}`);
    }

    const allEvidenceAssets = [...evidenceAssets, ...unmatchedEvidenceAssets];
    const countAssetType = (type: NASAExperimentEvidenceAsset["assetType"]) => allEvidenceAssets.filter((asset) => asset.assetType === type).length;

    if (files.length === 0) warnings.push("No local NASA source files were present; no run-level records were generated.");
    const report: IngestionReport = { investigation: manifest.investigationId, timestamp, sourceFilesProcessed, sourceFilesUnsupported, rawRecordsFound, validRecords: validRuns.length, rejectedRecords: rejectedRecords.length, duplicateRecords, fieldsDiscovered: [...fieldsDiscovered].sort(), normalizedUnits: [...normalizedUnits].sort(), warnings, materialNormalizationReviewCount, measurementTextStatusCount, evidenceFilesFound: evidenceFiles.length, evidenceFilesMatched: evidenceAssets.length, evidenceFilesUnmatched: unmatchedEvidenceAssets.length, evidenceMatchWarnings, videoAssets: countAssetType("RAW_VIDEO"), imageAssets: countAssetType("RAW_IMAGE"), otherAssets: allEvidenceAssets.length - countAssetType("RAW_VIDEO") - countAssetType("RAW_IMAGE") };
    await mkdir(outputDirectory, { recursive: true });
    await writeJson(join(outputDirectory, "valid-runs.json"), validRuns);
    await writeJson(join(outputDirectory, "rejected-runs.json"), rejectedRecords);
    await writeJson(join(outputDirectory, "ingestion-report.json"), report);
    await writeJson(join(outputDirectory, "evidence-assets.json"), evidenceAssets);
    await writeJson(join(outputDirectory, "unmatched-evidence-assets.json"), unmatchedEvidenceAssets);
    await writeJson(join(manifestDirectory, "psi-25-bass-ii.processed.json"), { ...manifest, files: processedManifestFiles });
    console.log(`BASS-II ingestion complete: ${validRuns.length} valid REAL NASA DATA runs, ${rejectedRecords.length} rejected records, ${sourceFilesProcessed.length} supported source files.`);
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
