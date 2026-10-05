import { ExperimentDataStatus, NASAExperimentRun } from "@/types/experiment";

export type LandscapeVariable = {
    id: string;
    label: string;
    unit: string;
    sourceField: string;
    description: string;
    valueType: "NUMERIC";
    availabilityCount: number;
    missingCount: number;
    textStatusCount: number;
    coverage: number;
};

export type LandscapeValue = {
    value: number;
    rawValue: string;
    sourceField: string;
};

export type LandscapePoint = {
    runId: string;
    sampleId: string;
    x: number;
    y: number;
    material: string;
    rawMaterialDescription: string;
    dataStatus: ExperimentDataStatus;
    xSource: LandscapeValue;
    ySource: LandscapeValue;
};

export type LandscapeBounds = { min: number; max: number };
export type DensityClass = "WELL_SAMPLED" | "SPARSE" | "UNSAMPLED";
export type DensityCell = { column: number; row: number; count: number; classification: DensityClass };
export type NeighborResult = { run: NASAExperimentRun; distance: number };
export type TwinDifference = { field: string; left: string; right: string };
export type TwinResult = { run: NASAExperimentRun; sharedFields: string[]; differences: TwinDifference[] };
