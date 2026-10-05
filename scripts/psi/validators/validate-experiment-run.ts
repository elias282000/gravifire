import { z } from "zod";
import { NASAExperimentRun } from "../../../src/types/experiment";

const valueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const gasMeasurementSchema = z.object({ rawValue: z.string(), parsedValue: z.number().nullable(), unit: z.enum(["%", "ppm"]), status: z.enum(["EXACT", "ABOVE_RANGE", "NOT_REPORTED", "TEXT_STATUS", "UNKNOWN"]), comparator: z.literal(">").optional() });
const runSchema = z.object({
    id: z.string().min(1), investigationId: z.string().min(1), sourceExperimentId: z.string().min(1), title: z.string().min(1), family: z.string().min(1), material: z.string().min(1), environment: z.string().min(1),
    parameters: z.record(z.string(), valueSchema), observations: z.record(z.string(), valueSchema), outcome: z.string().min(1), evidenceAssets: z.array(z.object({ label: z.string(), url: z.string(), type: z.enum(["video", "image", "document", "other"]).optional() })), source: z.object({ repositoryName: z.string().min(1), investigationId: z.string().min(1), url: z.string().url() }),
    provenance: z.object({ investigationId: z.string().min(1), sourceRepository: z.string().min(1), sourceUrl: z.string().url(), sourceFile: z.string().min(1), sourceSha256: z.string().regex(/^[a-f0-9]{64}$/), sourceRow: z.number().int().positive(), rawExperimentId: z.string().min(1), parserVersion: z.string().min(1), normalizerVersion: z.string().min(1), ingestionTimestamp: z.string().min(1), originalFields: z.array(z.string()), ingestionNote: z.string().min(1), fieldTransformations: z.record(z.string(), z.object({ originalValue: valueSchema, originalUnit: z.string().optional(), normalizedValue: valueSchema.optional(), normalizationRule: z.string().optional() })).optional() }),
    dataStatus: z.literal("REAL_NASA_DATA"), fieldStatuses: z.record(z.string(), z.enum(["NOT_REPORTED", "NOT_MEASURED", "NOT_APPLICABLE", "UNKNOWN"])).optional(), normalizationWarnings: z.array(z.string()).optional(),
    sourceMetadata: z.object({ investigationId: z.literal("PSI-25"), principalInvestigator: z.string(), sourceSampleId: z.string(), rawMaterialDescription: z.string(), testDateRaw: z.string(), testDateIso: z.string().optional(), gmtRaw: z.string(), normalizedMaterial: z.enum(["PMMA", "NOMEX", "JAPAN_WAX", "SIBAL"]).nullable(), materialNormalizationStatus: z.enum(["NORMALIZED", "REVIEW_REQUIRED"]), thicknessRaw: z.string().optional(), thicknessMm: z.number().optional(), widthRaw: z.string().optional(), widthMm: z.number().optional(), dimensionProvenance: z.array(z.object({ raw: z.string(), normalizedMm: z.number(), normalizationRule: z.string() })).optional() }).optional(),
    bassIIConfiguration: z.object({ flowRestrictorRaw: z.string(), fanDisplayRaw: z.string(), airDisplayRaw: z.string(), radiometerGainRaw: z.string(), totalFramesShotRaw: z.string(), totalFramesShotParsed: z.number().optional() }).optional(),
    measurements: z.object({ initialOxygenPercent: gasMeasurementSchema, finalOxygenPercent: gasMeasurementSchema, initialCO2Percent: gasMeasurementSchema, finalCO2Percent: gasMeasurementSchema, initialCOPpm: gasMeasurementSchema, finalCOPpm: gasMeasurementSchema }).optional(),
    rawRecord: z.record(z.string(), z.string()).optional(),
});

export function validateExperimentRun(run: NASAExperimentRun): { success: true; data: NASAExperimentRun } | { success: false; reason: string } {
    const result = runSchema.safeParse(run);
    return result.success ? { success: true, data: run } : { success: false, reason: result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ") };
}
