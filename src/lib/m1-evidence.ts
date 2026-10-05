import { nasaSaffireIExperimentRuns } from "@/data/nasa-experiment-runs";
import type { NASAExperimentRun } from "@/types/experiment";
import type { MissionEvidenceReference } from "@/features/mission-control/types";

export type M1SourceRecord = { run: NASAExperimentRun; data: NonNullable<NASAExperimentRun["saffireData"]> };
export function resolveM1Record(sourceRecordId: "S1" | "S2"): M1SourceRecord {
  const run = nasaSaffireIExperimentRuns.find((item) => item.sourceExperimentId === sourceRecordId);
  if (!run?.saffireData) throw new Error(`SAFFIRE-I source record ${sourceRecordId} is not available in the ingested runtime.`);
  return { run, data: run.saffireData };
}
export function resolveM1Pair(): { s1: M1SourceRecord; s2: M1SourceRecord } { return { s1: resolveM1Record("S1"), s2: resolveM1Record("S2") }; }
export function m1EvidenceReference(record: M1SourceRecord): MissionEvidenceReference {
  return { id: `psi98-${record.run.sourceExperimentId}`, type: "EXPERIMENT_RECORD", investigationId: "PSI-98", family: "SAFFIRE-I", sourceRecordId: record.run.sourceExperimentId, sourcePathOrCitation: `${record.run.provenance.sourceFile}:row-${record.run.provenance.sourceRow}`, sourceField: "SAFFIRE-I Experimental Table row", rawValue: record.run.rawRecord ? JSON.stringify(record.run.rawRecord) : record.run.sourceExperimentId, normalizedValue: "SAFFIRE-I source row preserved", unit: "", evidenceRole: "DIRECT", notes: "Direct source row; burn time is reported as burn time, not an inferred outcome." };
}
export function m1SourceSummary(record: M1SourceRecord) { const { data } = record; return { sourceId: record.run.sourceExperimentId, material: data.rawMaterialDescription, thickness: data.sampleThicknessCm, length: data.sampleLengthCm, width: data.sampleWidthCm, airflow: data.airflowCmS, oxygen: data.oxygenMeasurement, ignitionPower: data.ignitionPowerW, ignitionTime: data.ignitionTimeS, burnTime: data.burnTimeS, direction: data.flowDirectionRaw, camera1: data.camera1Identifier, camera2: data.camera2Identifier }; }

