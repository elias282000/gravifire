import { NASAExperimentRun } from "@/types/experiment";
import { DensityCell, DensityClass, LandscapeBounds, LandscapePoint, LandscapeValue, LandscapeVariable, NeighborResult, TwinDifference, TwinResult } from "@/types/landscape";

type VariableDefinition = Omit<LandscapeVariable, "availabilityCount" | "missingCount" | "textStatusCount" | "coverage"> & { read: (run: NASAExperimentRun) => { value: number | null; rawValue: string; textStatus: boolean } };

const gas = (run: NASAExperimentRun, key: keyof NonNullable<NASAExperimentRun["measurements"]>) => {
    const measurement = run.measurements?.[key];
    if (!measurement) return { value: null, rawValue: "", textStatus: false };
    return { value: measurement.status === "EXACT" ? measurement.parsedValue : null, rawValue: measurement.rawValue, textStatus: measurement.status === "TEXT_STATUS" };
};

export const landscapeVariableDefinitions: VariableDefinition[] = [
    { id: "initial_oxygen_percent", label: "Initial Oxygen", unit: "%", sourceField: "Calibrated initial O2 % by vol", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "initialOxygenPercent") },
    { id: "final_oxygen_percent", label: "Final Oxygen", unit: "%", sourceField: "Calibrated final O2 % by vol", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "finalOxygenPercent") },
    { id: "initial_co2_percent", label: "Initial CO2", unit: "%", sourceField: "Initial CO2 % by vol", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "initialCO2Percent") },
    { id: "final_co2_percent", label: "Final CO2", unit: "%", sourceField: "Final CO2 % by vol", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "finalCO2Percent") },
    { id: "initial_co_ppm", label: "Initial CO", unit: "ppm", sourceField: "Initial CO (ppm)", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "initialCOPpm") },
    { id: "final_co_ppm", label: "Final CO", unit: "ppm", sourceField: "Final CO (ppm)", description: "Numeric exact values from the NASA gas measurement field.", valueType: "NUMERIC", read: (run) => gas(run, "finalCOPpm") },
    { id: "thickness_mm", label: "PMMA Thickness", unit: "mm", sourceField: "Fuel Sample Material → explicit thickness", description: "Explicitly extracted material thickness where the NASA text gave clear thickness semantics.", valueType: "NUMERIC", read: (run) => ({ value: run.sourceMetadata?.thicknessMm ?? null, rawValue: run.sourceMetadata?.thicknessRaw ?? "", textStatus: false }) },
    { id: "width_mm", label: "PMMA Width", unit: "mm", sourceField: "Fuel Sample Material → explicit width", description: "Explicitly extracted material width where the NASA text gave clear width semantics.", valueType: "NUMERIC", read: (run) => ({ value: run.sourceMetadata?.widthMm ?? null, rawValue: run.sourceMetadata?.widthRaw ?? "", textStatus: false }) },
];

export function analyzeLandscapeVariables(runs: NASAExperimentRun[]): LandscapeVariable[] {
    runs = runs.filter((run) => run.family === "BASS-II");
    return landscapeVariableDefinitions.map(({ read, ...definition }) => {
        let numericAvailable = 0;
        let textStatusCount = 0;
        runs.forEach((run) => { const result = read(run); if (result.value !== null && Number.isFinite(result.value)) numericAvailable += 1; if (result.textStatus) textStatusCount += 1; });
        return { ...definition, availabilityCount: numericAvailable, missingCount: runs.length - numericAvailable, textStatusCount, coverage: runs.length === 0 ? 0 : numericAvailable / runs.length };
    });
}

export function getLandscapeVariable(id: string): LandscapeVariable | undefined { return analyzeLandscapeVariables([]).find((variable) => variable.id === id); }

function readVariable(run: NASAExperimentRun, id: string): LandscapeValue | null {
    const definition = landscapeVariableDefinitions.find((item) => item.id === id);
    if (!definition) return null;
    const result = definition.read(run);
    return result.value !== null && Number.isFinite(result.value) ? { value: result.value, rawValue: result.rawValue, sourceField: definition.sourceField } : null;
}

export function buildLandscapePoints(runs: NASAExperimentRun[], xId: string, yId: string): LandscapePoint[] {
    runs = runs.filter((run) => run.family === "BASS-II");
    return runs.flatMap((run) => { const x = readVariable(run, xId); const y = readVariable(run, yId); if (!x || !y) return []; return [{ runId: run.id, sampleId: run.sourceMetadata?.sourceSampleId ?? "", x: x.value, y: y.value, material: run.sourceMetadata?.normalizedMaterial ?? "REVIEW_REQUIRED / UNKNOWN", rawMaterialDescription: run.sourceMetadata?.rawMaterialDescription ?? run.material, dataStatus: run.dataStatus, xSource: x, ySource: y }]; });
}

export function observedBounds(points: LandscapePoint[]): { x: LandscapeBounds | null; y: LandscapeBounds | null } {
    if (points.length === 0) return { x: null, y: null };
    const x = points.map((point) => point.x); const y = points.map((point) => point.y);
    return { x: { min: Math.min(...x), max: Math.max(...x) }, y: { min: Math.min(...y), max: Math.max(...y) } };
}

function normalized(value: number, bounds: LandscapeBounds): number { return bounds.max === bounds.min ? 0.5 : (value - bounds.min) / (bounds.max - bounds.min); }

export function calculateDensity(points: LandscapePoint[], bins = 8): DensityCell[] {
    const bounds = observedBounds(points); if (!bounds.x || !bounds.y) return Array.from({ length: bins * bins }, (_, index) => ({ column: index % bins, row: Math.floor(index / bins), count: 0, classification: "UNSAMPLED" as DensityClass }));
    const counts = new Map<string, number>();
    points.forEach((point) => { const column = Math.min(bins - 1, Math.max(0, Math.floor(normalized(point.x, bounds.x!) * bins))); const row = Math.min(bins - 1, Math.max(0, Math.floor((1 - normalized(point.y, bounds.y!)) * bins))); const key = `${column}:${row}`; counts.set(key, (counts.get(key) ?? 0) + 1); });
    return Array.from({ length: bins * bins }, (_, index) => { const column = index % bins; const row = Math.floor(index / bins); const count = counts.get(`${column}:${row}`) ?? 0; return { column, row, count, classification: count === 0 ? "UNSAMPLED" : count >= 3 ? "WELL_SAMPLED" : "SPARSE" }; });
}

export function nearestExperiments(selected: LandscapePoint, points: LandscapePoint[], runs: NASAExperimentRun[], limit = 5): NeighborResult[] {
    const bounds = observedBounds(points); if (!bounds.x || !bounds.y) return [];
    return points.filter((point) => point.runId !== selected.runId).map((point) => { const dx = normalized(point.x, bounds.x!) - normalized(selected.x, bounds.x!); const dy = normalized(point.y, bounds.y!) - normalized(selected.y, bounds.y!); return { run: runs.find((run) => run.id === point.runId)!, distance: Math.sqrt(dx * dx + dy * dy) }; }).filter((item) => Boolean(item.run)).sort((left, right) => left.distance - right.distance).slice(0, limit);
}

function comparableFields(run: NASAExperimentRun): Map<string, string> {
    const map = new Map<string, string>(); const metadata = run.sourceMetadata; const measurements = run.measurements;
    if (metadata?.normalizedMaterial) map.set("Material", metadata.normalizedMaterial);
    if (measurements) { for (const [label, measurement] of [["Initial O2", measurements.initialOxygenPercent], ["Initial CO2", measurements.initialCO2Percent], ["Initial CO", measurements.initialCOPpm]] as const) if (measurement.status === "EXACT" && measurement.parsedValue !== null) map.set(label, String(measurement.parsedValue)); }
    if (metadata?.thicknessMm !== undefined) map.set("Thickness", String(metadata.thicknessMm));
    if (metadata?.widthMm !== undefined) map.set("Width", String(metadata.widthMm));
    return map;
}

export function findExperimentTwin(selected: NASAExperimentRun, runs: NASAExperimentRun[]): TwinResult[] {
    const selectedFields = comparableFields(selected);
    return runs.filter((run) => run.id !== selected.id).map((run) => { const candidate = comparableFields(run); const sharedFields: string[] = []; const differences: TwinDifference[] = []; for (const [field, value] of selectedFields) { if (!candidate.has(field)) continue; if (candidate.get(field) === value) sharedFields.push(field); else differences.push({ field, left: value, right: candidate.get(field)! }); } return { run, sharedFields, differences }; }).filter((result) => result.sharedFields.length + result.differences.length > 0).sort((left, right) => right.sharedFields.length - left.sharedFields.length || left.differences.length - right.differences.length).slice(0, 5);
}

export function parseLandscapeState(search: string, variables: LandscapeVariable[]): { x: string; y: string; material: string } {
    const params = new URLSearchParams(search); const valid = new Set(variables.map((variable) => variable.id)); const x = params.get("x"); const y = params.get("y"); return { x: x && valid.has(x) ? x : "initial_oxygen_percent", y: y && valid.has(y) ? y : "initial_co2_percent", material: params.get("material") ?? "ALL" };
}
