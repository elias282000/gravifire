import { nasaSaffireIIExperimentRuns } from "@/data/nasa-experiment-runs";
import type { NASAExperimentRun } from "@/types/experiment";
import type { MissionEvidenceReference } from "@/features/mission-control/types";

export type M4SourceRecord = { run: NASAExperimentRun; data: NonNullable<NASAExperimentRun["saffireIIData"]> };
const ids = ["2-1", "2-2", "2-3", "2-4"] as const;
export function resolveM4Record(id: typeof ids[number]): M4SourceRecord { const run = nasaSaffireIIExperimentRuns.find((item) => item.sourceExperimentId === id); if (!run?.saffireIIData) throw new Error(`SAFFIRE-II source record ${id} is unavailable.`); return { run, data: run.saffireIIData }; }
export function resolveM4Family(): M4SourceRecord[] { return ids.map(resolveM4Record); }
export function m4RowReference(record: M4SourceRecord): MissionEvidenceReference { return { id: `psi99-${record.run.sourceExperimentId}`, type: "EXPERIMENT_RECORD", investigationId: "PSI-99", family: "SAFFIRE-II", sourceRecordId: record.run.sourceExperimentId, sourcePathOrCitation: `${record.run.provenance.sourceFile}:row-${record.run.provenance.sourceRow}`, sourceField: "SAFFIRE-II Experimental Table row", rawValue: JSON.stringify(record.run.rawRecord), normalizedValue: "PSI-99 source row preserved", unit: "", evidenceRole: "DIRECT", notes: record.data.sampleThickness.status === "REVIEW_REQUIRED" ? "RAW SOURCE thickness is unresolved and requires review." : "Direct PSI-99 table row." }; }
export const m4DocumentReferences: MissionEvidenceReference[] = [
  { id: "ntrs-20170008805", type: "NASA_DOCUMENT", investigationId: "SAFFIRE-II", family: "NASA NTRS", sourceRecordId: "20170008805", sourcePathOrCitation: "NTRS 20170008805", sourceField: "Document context", rawValue: "Saffire-II silicone samples ignited, but flame did not propagate in flight.", normalizedValue: "Ignition without propagation", unit: "", evidenceRole: "CONTEXT", notes: "Document context; not an Experimental Table field." },
  { id: "ntrs-20180004258", type: "NASA_DOCUMENT", investigationId: "SAFFIRE-II", family: "NASA NTRS", sourceRecordId: "20180004258", sourcePathOrCitation: "NTRS 20180004258", sourceField: "Document context", rawValue: "Saffire-II samples 1–4 were silicone sheets of varying thickness; samples ignited but flame did not propagate.", normalizedValue: "Ignition without propagation", unit: "", evidenceRole: "CONTEXT", notes: "Document context; not an Experimental Table field." },
];
