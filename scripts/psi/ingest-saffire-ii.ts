import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { sha256File } from "./utils/provenance";
import { parseSAFFIREIIFile } from "./parsers/saffire-ii-parser";
import { classifySAFFIREIIRecord, normalizeSAFFIREIINote, normalizeSAFFIREIIPretest, normalizeSAFFIREIIRun, SAFFIREIIRecordClass } from "./normalizers/normalize-saffire-ii";
import { validateSAFFIREIIExperimentRun } from "./validators/validate-saffire-ii-run";
import { PSIInvestigationManifest, RejectedRecord } from "../../src/types/psi-ingestion";
import { NASAExperimentRun, SAFFIREIISourceNote } from "../../src/types/experiment";

const root = resolve(process.cwd());
const rawDirectories = [join(root, "data", "nasa", "raw", "saffire-ii"), join(root, "src", "data", "nasa", "raw", "saffire-ii")];
const outputDirectory = join(root, "data", "nasa", "normalized", "saffire-ii");
const manifestDirectory = join(root, "data", "nasa", "manifests");
async function writeJson(path: string, value: unknown): Promise<void> { await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
async function findFiles(): Promise<string[]> { for (const directory of rawDirectories) { try { return (await readdir(directory, { withFileTypes: true })).filter((entry) => entry.isFile()).map((entry) => join(directory, entry.name)); } catch { /* try next layout */ } } return []; }

async function main(): Promise<void> {
    const manifest = JSON.parse(await readFile(join(manifestDirectory, "psi-99-saffire-ii.json"), "utf8")) as PSIInvestigationManifest;
    const paths = await findFiles();
    const timestamp = new Date().toISOString();
    const runs: NASAExperimentRun[] = [];
    const pretests: ReturnType<typeof normalizeSAFFIREIIPretest>[] = [];
    const notes: SAFFIREIISourceNote[] = [];
    const rejected: RejectedRecord[] = [];
    const seen = new Set<string>();
    const warnings: string[] = [];
    const sourceFilesProcessed: string[] = [];
    const numericCoverage: Record<string, number> = { sampleThickness: 0, sampleLength: 0, sampleWidth: 0, airflowCmS: 0, ignitionPowerW: 0, ignitionTimeS: 0, burnTime: 0, lowGravityBurnLength: 0, lowGravitySpread: 0, oneGBurnLength: 0, oneGSpreadRate: 0 };
    const oxygenStatusCounts = { APPROXIMATE: 0, RANGE: 0, EXACT: 0, NOT_REPORTED: 0, TEXT_STATUS: 0 };
    const oxygenMeasurementMethodCounts = { DERIVED_SOURCE_MEASUREMENT: 0 };
    let rawRows = 0; let emptyRows = 0; let unknownRows = 0; let duplicateRecords = 0; let missingMaterial = 0; let thicknessReview = 0; let numericBurn = 0; let textBurn = 0;
    for (const path of paths) {
        const file = path.split(/[\\/]/).pop() ?? path;
        if (extname(file).toLowerCase() !== ".csv") { warnings.push(`Unsupported source file: ${file}`); continue; }
        const hash = await sha256File(path); sourceFilesProcessed.push(file);
        try {
            const records = parseSAFFIREIIFile((await readFile(path)).toString("utf8"), file);
            rawRows += records.length;
            for (const record of records.filter((item) => classifySAFFIREIIRecord(item) === "SOURCE_NOTE")) notes.push(normalizeSAFFIREIINote(record, manifest, file, timestamp, hash.sha256));
            for (const record of records) {
                const kind: SAFFIREIIRecordClass = classifySAFFIREIIRecord(record);
                if (kind === "EMPTY_SOURCE_ROW") { emptyRows += 1; continue; }
                if (kind === "SOURCE_NOTE") continue;
                if (kind === "PRETEST_FLOW_VISUALIZATION") { pretests.push(normalizeSAFFIREIIPretest(record, manifest, file, timestamp, hash.sha256)); continue; }
                if (kind === "UNKNOWN_SOURCE_RECORD") { unknownRows += 1; rejected.push({ reason: "Unknown SAFFIRE-II source record classification", sourceFile: file, sourceRow: record.sourceRow, rawRecord: record.values }); continue; }
                try {
                    const run = normalizeSAFFIREIIRun(record, manifest, file, timestamp, hash.sha256, notes);
                    if (seen.has(run.sourceExperimentId)) { duplicateRecords += 1; rejected.push({ reason: "Duplicate SAFFIRE-II Sample Number", sourceFile: file, sourceRow: record.sourceRow, rawRecord: record.values }); continue; }
                    const validation = validateSAFFIREIIExperimentRun(run);
                    if (!validation.success || !validation.data) { rejected.push({ reason: validation.reason ?? "SAFFIRE-II validation failed", sourceFile: file, sourceRow: record.sourceRow, rawRecord: record.values }); continue; }
                    seen.add(run.sourceExperimentId); runs.push(validation.data);
                    const data = run.saffireIIData!;
                    if (!data.rawMaterialDescription) missingMaterial += 1;
                    if (data.sampleThickness.status === "REVIEW_REQUIRED") { thicknessReview += 1; warnings.push(`SOURCE_VALUE_FORMAT_AMBIGUITY: Sample ${run.sourceExperimentId} thickness was preserved without numeric normalization.`); }
                    if (data.burnTime.status === "EXACT") numericBurn += 1;
                    if (data.burnTime.status === "TEXT_STATUS") textBurn += 1;
                    oxygenStatusCounts[data.oxygenMeasurement.status] += 1;
                    oxygenMeasurementMethodCounts[data.oxygenMeasurement.measurementMethod] += 1;
                    for (const [key, measurement] of Object.entries({ sampleThickness: data.sampleThickness, sampleLength: data.sampleLength, sampleWidth: data.sampleWidth, airflowCmS: data.airflowCmS, ignitionPowerW: data.ignitionPowerW, ignitionTimeS: data.ignitionTimeS, burnTime: data.burnTime, lowGravityBurnLength: data.microgravityBurnLength, lowGravitySpread: data.microgravitySpreadMeasurement, oneGBurnLength: data.normalGravityReference.burnLength, oneGSpreadRate: data.normalGravityReference.spreadRate })) if (measurement.parsedValue !== null) numericCoverage[key] += 1;
                    if (data.microgravitySpreadMeasurement.rawValue.includes("mm/s")) warnings.push(`SOURCE_SCHEMA_UNIT_MISMATCH: Sample ${run.sourceExperimentId} has '?-g Spread Length' values with rate units.`);
                } catch (error) { rejected.push({ reason: error instanceof Error ? error.message : "SAFFIRE-II normalization failed", sourceFile: file, sourceRow: record.sourceRow, rawRecord: record.values }); }
            }
        } catch (error) { warnings.push(`${file}: ${error instanceof Error ? error.message : "SAFFIRE-II parse failure"}`); }
    }
    const linkedNotes = notes.map((note) => { const references = runs.flatMap((run) => run.saffireIIData?.sourceNotes.filter((item) => item.noteId === note.noteId) ?? []); return { ...note, referencedByRunIds: [...new Set(references.flatMap((item) => item.referencedByRunIds))], referencedFields: [...new Set(references.flatMap((item) => item.referencedFields))] }; });
    if (!paths.length) warnings.push("No local NASA SAFFIRE-II source files were present; no records were generated.");
    const report = { investigation: manifest.investigationId, family: manifest.family, timestamp, rawRows, combustionExperiments: runs.length, pretestRecords: pretests.length, sourceNoteRecords: notes.length, emptyRows, unknownRows, rejectedRecords: rejected.length, duplicateRecords, materialMissingCount: missingMaterial, materialNormalizationCount: runs.filter((run) => run.saffireIIData?.materialStatus === "NORMALIZED").length, thicknessReviewRequiredCount: thicknessReview, oxygenStatusCounts, oxygenMeasurementMethodCounts, numericBurnTimeCount: numericBurn, textStatusBurnTimeCount: textBurn, cameraCoverage: { camera1: runs.filter((run) => Boolean(run.saffireIIData?.camera1Identifier.trim())).length, camera2: runs.filter((run) => Boolean(run.saffireIIData?.camera2Identifier.trim())).length }, numericCoverage, schemaWarnings: warnings.filter((warning) => warning.startsWith("SOURCE_SCHEMA_UNIT_MISMATCH") || warning.startsWith("SOURCE_VALUE_FORMAT_AMBIGUITY")), warnings };
    await mkdir(outputDirectory, { recursive: true }); await writeJson(join(outputDirectory, "valid-runs.json"), runs); await writeJson(join(outputDirectory, "pretest-records.json"), pretests); await writeJson(join(outputDirectory, "source-notes.json"), linkedNotes); await writeJson(join(outputDirectory, "rejected-runs.json"), rejected); await writeJson(join(outputDirectory, "ingestion-report.json"), report);
    console.log(`SAFFIRE-II ingestion complete: ${runs.length} combustion experiments, ${pretests.length} pre-test records, ${notes.length} source notes, ${rejected.length} rejected records.`);
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
