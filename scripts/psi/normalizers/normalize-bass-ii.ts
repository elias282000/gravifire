import { NASAExperimentRun, BASSIIGasMeasurement } from "../../../src/types/experiment";
import { NormalizedBASSIIRecord, PSIInvestigationManifest, NormalizedScientificValue } from "../../../src/types/psi-ingestion";
import { ParsedSourceRecord } from "../parsers/bass-ii-parser";

export const PARSER_VERSION = "bass-ii-experimental-table-parser@2.0.0";
export const NORMALIZER_VERSION = "bass-ii-experimental-table-normalizer@2.0.0";

function parseDate(raw: string): string | undefined {
    const match = raw.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return undefined;
    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}` : undefined;
}

function parseGasMeasurement(rawValue: string, unit: "%" | "ppm"): BASSIIGasMeasurement {
    const trimmed = rawValue.trim();
    if (!trimmed || trimmed.toLowerCase() === "none") return { rawValue, parsedValue: null, unit, status: "NOT_REPORTED" };
    const aboveRange = trimmed.match(/^>\s*([-+]?\d+(?:\.\d+)?)$/);
    if (aboveRange) return { rawValue, parsedValue: Number(aboveRange[1]), unit, status: "ABOVE_RANGE", comparator: ">" };
    if (/^[-+]?\d+(?:\.\d+)?$/.test(trimmed)) return { rawValue, parsedValue: Number(trimmed), unit, status: "EXACT" };
    return { rawValue, parsedValue: null, unit, status: "TEXT_STATUS" };
}

function parseFrames(rawValue: string): number | undefined {
    return /^[-+]?\d+$/.test(rawValue.trim()) ? Number.parseInt(rawValue.trim(), 10) : undefined;
}

function normalizeMaterial(raw: string): { normalized: "PMMA" | "NOMEX" | "JAPAN_WAX" | "SIBAL" | null; status: "NORMALIZED" | "REVIEW_REQUIRED" } {
    if (/PMMA/.test(raw)) return { normalized: "PMMA", status: "NORMALIZED" };
    if (/nomex/i.test(raw)) return { normalized: "NOMEX", status: "NORMALIZED" };
    if (/Japan Wax/.test(raw)) return { normalized: "JAPAN_WAX", status: "NORMALIZED" };
    if (/SIBAL/i.test(raw)) return { normalized: "SIBAL", status: "NORMALIZED" };
    return { normalized: null, status: "REVIEW_REQUIRED" };
}

function extractDimensions(raw: string): { thicknessRaw?: string; thicknessMm?: number; widthRaw?: string; widthMm?: number; dimensionProvenance: Array<{ raw: string; normalizedMm: number; normalizationRule: string }> } {
    const dimensions: Array<{ raw: string; normalizedMm: number; normalizationRule: string }> = [];
    const thicknessMicron = raw.match(/\b(\d+(?:\.\d+)?)\s*(micron|microns|µm|um)\b/i);
    const thicknessMm = raw.match(/\b(\d+(?:\.\d+)?)\s*mm\s+thick\b/i);
    const widthCm = raw.match(/\b(\d+(?:\.\d+)?)\s*cm\s+wide\b/i);
    const thickness = thicknessMicron ? { raw: thicknessMicron[0], value: Number(thicknessMicron[1]) / 1000, rule: "micron → mm ÷ 1000" } : thicknessMm ? { raw: thicknessMm[0], value: Number(thicknessMm[1]), rule: "mm → mm (identity)" } : undefined;
    if (thickness) dimensions.push({ raw: thickness.raw, normalizedMm: thickness.value, normalizationRule: thickness.rule });
    if (widthCm) dimensions.push({ raw: widthCm[0], normalizedMm: Number(widthCm[1]) * 10, normalizationRule: "cm → mm × 10" });
    return { ...(thickness ? { thicknessRaw: thickness.raw, thicknessMm: thickness.value } : {}), ...(widthCm ? { widthRaw: widthCm[0], widthMm: Number(widthCm[1]) * 10 } : {}), dimensionProvenance: dimensions };
}

function measurementTextStatusCount(measurements: Record<string, BASSIIGasMeasurement>): number {
    return Object.values(measurements).filter((measurement) => measurement.status === "TEXT_STATUS").length;
}

export function normalizeBassIIRecord(parsed: ParsedSourceRecord, manifest: PSIInvestigationManifest, sourceFile: string, ingestionTimestamp: string, sourceSha256: string): NormalizedBASSIIRecord {
    const values = parsed.values;
    const sourceExperimentId = values["Test #"].trim();
    if (!sourceExperimentId) throw new Error("Required Test # source experiment identifier is absent");
    const rawMaterialDescription = values["Fuel Sample Material"];
    const material = normalizeMaterial(rawMaterialDescription);
    const dimensions = extractDimensions(rawMaterialDescription);
    const measurements = {
        initialOxygenPercent: parseGasMeasurement(values["Calibrated initial O2 % by vol"], "%"),
        finalOxygenPercent: parseGasMeasurement(values["Calibrated final O2 % by vol"], "%"),
        initialCO2Percent: parseGasMeasurement(values["Initial CO2 % by vol"], "%"),
        finalCO2Percent: parseGasMeasurement(values["Final CO2 % by vol"], "%"),
        initialCOPpm: parseGasMeasurement(values["Initial CO (ppm)"], "ppm"),
        finalCOPpm: parseGasMeasurement(values["Final CO (ppm)"], "ppm"),
    };
    const sourceValues: Record<string, NormalizedScientificValue> = {};
    for (const [field, measurement] of Object.entries(measurements)) {
        sourceValues[field] = { value: measurement.parsedValue ?? measurement.rawValue, unit: measurement.unit, rawValue: measurement.rawValue, rawField: field, sourceFile };
    }
    const warnings = material.status === "REVIEW_REQUIRED" ? [`Material value requires review: ${rawMaterialDescription}`] : [];
    const run: NASAExperimentRun = {
        id: sourceExperimentId,
        investigationId: "bass-ii",
        sourceExperimentId,
        title: `BASS-II Experimental Table test ${sourceExperimentId}`,
        family: manifest.family,
        material: rawMaterialDescription || "Unknown",
        environment: "Microgravity (investigation context)",
        parameters: measurements.initialOxygenPercent.parsedValue === null ? {} : { oxygenPercent: measurements.initialOxygenPercent.parsedValue },
        observations: {},
        outcome: "UNKNOWN",
        evidenceAssets: [],
        source: { repositoryName: "NASA Physical Sciences Informatics", investigationId: manifest.investigationId, url: manifest.sourceUrl },
        provenance: { investigationId: manifest.investigationId, sourceRepository: "NASA Physical Sciences Informatics", sourceUrl: manifest.sourceUrl, sourceFile, sourceSha256, sourceRow: parsed.sourceRow, rawExperimentId: sourceExperimentId, parserVersion: PARSER_VERSION, normalizerVersion: NORMALIZER_VERSION, ingestionTimestamp, originalFields: Object.keys(parsed.rawRecord), ingestionNote: "Exact BASS-II Experimental Table mapping. Raw instrument strings are preserved without physical interpretation.", fieldTransformations: {} },
        dataStatus: "REAL_NASA_DATA",
        normalizationWarnings: warnings,
        sourceMetadata: { investigationId: manifest.investigationId, principalInvestigator: values.PI, sourceSampleId: values["Sample #"], rawMaterialDescription, testDateRaw: values.Date, ...(parseDate(values.Date) ? { testDateIso: parseDate(values.Date) } : {}), gmtRaw: values.GMT, normalizedMaterial: material.normalized, materialNormalizationStatus: material.status, ...dimensions },
        bassIIConfiguration: { flowRestrictorRaw: values["Flow restrictor"], fanDisplayRaw: values["Fan display"], airDisplayRaw: values["Air display"], radiometerGainRaw: values["Radiometer gain (1000 250 50 10)"], totalFramesShotRaw: values["Total Frames Shot"], ...(parseFrames(values["Total Frames Shot"]) === undefined ? {} : { totalFramesShotParsed: parseFrames(values["Total Frames Shot"]) }) },
        measurements,
        rawRecord: parsed.rawRecord,
    };
    return { run, sourceValues, materialNormalizationReviewRequired: material.status === "REVIEW_REQUIRED", measurementTextStatusCount: measurementTextStatusCount(measurements) };
}
