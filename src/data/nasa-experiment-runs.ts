import { NASAExperimentRun } from "@/types/experiment";
import validRuns from "../../data/nasa/normalized/bass-ii/valid-runs.json";
import sameValidRuns from "../../data/nasa/normalized/same/valid-runs.json";
import saffireValidRuns from "../../data/nasa/normalized/saffire-i/valid-runs.json";
import saffireIITValidRuns from "../../data/nasa/normalized/saffire-ii/valid-runs.json";
import saffireIIITValidRuns from "../../data/nasa/normalized/saffire-iii/valid-runs.json";
import sameRValidRuns from "../../data/nasa/normalized/same-r/valid-runs.json";
import flexValidRuns from "../../data/nasa/normalized/flex/valid-runs.json";

/**
 * Verified run-level NASA records will be added here only after source
 * ingestion and validation. Investigation metadata is not run-level data.
 */
export const nasaBassIIExperimentRuns: NASAExperimentRun[] = validRuns as NASAExperimentRun[];
export const nasaSameExperimentRuns: NASAExperimentRun[] = sameValidRuns as NASAExperimentRun[];
export const nasaSaffireIExperimentRuns: NASAExperimentRun[] = saffireValidRuns as NASAExperimentRun[];
export const nasaSaffireIIExperimentRuns: NASAExperimentRun[] = saffireIITValidRuns as NASAExperimentRun[];
export const nasaSaffireIIIExperimentRuns: NASAExperimentRun[] = saffireIIITValidRuns as NASAExperimentRun[];
export const nasaSameRExperimentRuns: NASAExperimentRun[] = sameRValidRuns as NASAExperimentRun[];
export const nasaFlexExperimentRuns: NASAExperimentRun[] = flexValidRuns as NASAExperimentRun[];
export const nasaExperimentRuns: NASAExperimentRun[] = [...nasaBassIIExperimentRuns, ...nasaSameExperimentRuns, ...nasaSameRExperimentRuns, ...nasaSaffireIExperimentRuns, ...nasaSaffireIIExperimentRuns, ...nasaSaffireIIIExperimentRuns, ...nasaFlexExperimentRuns];

/** Reserved for clearly labelled UI fixtures. It is intentionally empty until
 * a demo record is needed and must never be presented as NASA measurement. */
export const demoExperimentRuns: NASAExperimentRun[] = [];
