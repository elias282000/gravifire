import evidenceAssets from "../../data/nasa/normalized/bass-ii/evidence-assets.json";
import validRuns from "../../data/nasa/normalized/bass-ii/valid-runs.json";
import rejectedRuns from "../../data/nasa/normalized/bass-ii/rejected-runs.json";
import documents from "../../data/nasa/normalized/bass-ii/documents.json";
import chunks from "../../data/nasa/normalized/bass-ii/chunks.json";
import sameValidRuns from "../../data/nasa/normalized/same/valid-runs.json";
import sameRejectedRuns from "../../data/nasa/normalized/same/rejected-runs.json";
import saffireValidRuns from "../../data/nasa/normalized/saffire-i/valid-runs.json";
import saffireRejectedRuns from "../../data/nasa/normalized/saffire-i/rejected-runs.json";
import saffireIIValidRuns from "../../data/nasa/normalized/saffire-ii/valid-runs.json";
import saffireIIRejectedRuns from "../../data/nasa/normalized/saffire-ii/rejected-runs.json";
import saffireIIPretests from "../../data/nasa/normalized/saffire-ii/pretest-records.json";
import saffireIINotes from "../../data/nasa/normalized/saffire-ii/source-notes.json";
import saffireIIIValidRuns from "../../data/nasa/normalized/saffire-iii/valid-runs.json";
import saffireIIIRejectedRuns from "../../data/nasa/normalized/saffire-iii/rejected-runs.json";
import sameRValidRuns from "../../data/nasa/normalized/same-r/valid-runs.json";
import sameRRejectedRuns from "../../data/nasa/normalized/same-r/rejected-runs.json";
import flexValidRuns from "../../data/nasa/normalized/flex/valid-runs.json";
import flexRejectedRuns from "../../data/nasa/normalized/flex/rejected-runs.json";
import flex2Configurations from "../../data/nasa/normalized/flex-2/configurations.json";
import spiceObservations from "../../data/nasa/normalized/spice/observations.json";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import { nasaDocumentLinks } from "@/data/nasa-document-data";
import { NASAExperimentRun } from "@/types/experiment";
import { ExperimentRecommendation } from "@/types/recommendation";
import { SelfAuditResult, SelfAuditWarning, SystemTrustSummary } from "@/types/trust";
import { CHALLENGE_ENGINE_VERSION } from "@/lib/challenge-engine";
import { RECOMMENDATION_ALGORITHM_VERSION } from "@/lib/recommendations";

export function runSelfAudit(runs: NASAExperimentRun[] = nasaExperimentRuns, recommendations: ExperimentRecommendation[] = []): SelfAuditResult {
    const warnings: SelfAuditWarning[] = [];
    if (runs === nasaExperimentRuns && flexValidRuns.length !== runs.filter((run) => run.family === "FLEX").length) warnings.push({ id: "flex-runtime-count", severity: "IMPORTANT", message: `FLEX runtime count ${runs.filter((run) => run.family === "FLEX").length} does not match generated valid-runs count ${flexValidRuns.length}.` });
    if (flexRejectedRuns.length > 0) warnings.push({ id: "flex-rejected-records", severity: "CAUTION", message: `${flexRejectedRuns.length} FLEX source record(s) are preserved as rejected output.` });
    if (runs.some((run) => run.family === "FLEX-2")) warnings.push({ id: "flex2-run-leak", severity: "IMPORTANT", message: "FLEX-2 configuration envelopes must not enter the run-result collection." });
    if (flex2Configurations.some((configuration) => configuration.sourceRecordType !== "EXPERIMENT_CONFIGURATION_ENVELOPE")) warnings.push({ id: "flex2-record-type", severity: "IMPORTANT", message: "A FLEX-2 generated record is not classified as a configuration envelope." });
    if (spiceObservations.some((observation) => observation.sourceRecordType !== "OPERATING_CONDITION_OBSERVATION")) warnings.push({ id: "spice-record-type", severity: "IMPORTANT", message: "A SPICE generated record is not classified as an operating-condition observation." });
    if (spiceObservations.some((observation) => !observation.provenance.sourceFile || !observation.provenance.sourceSha256 || observation.sourceExperimentId !== null)) warnings.push({ id: "spice-provenance-or-id", severity: "IMPORTANT", message: "A SPICE observation is missing provenance or has an invented NASA source experiment identifier." });
    if (runs.some((run) => run.investigationId === "spice")) warnings.push({ id: "spice-run-leak", severity: "IMPORTANT", message: "SPICE operating-condition observations must not enter the NASA experiment-run collection." });
    runs.filter((run) => run.dataStatus === "REAL_NASA_DATA").forEach((run) => { if (!run.provenance.sourceFile || !run.provenance.sourceSha256 || !run.provenance.investigationId) warnings.push({ id: `run-provenance-${run.id}`, severity: "IMPORTANT", message: `REAL_NASA_DATA run ${run.id} is missing required provenance.` }); });
    recommendations.forEach((recommendation) => { if (recommendation.dataStatus === "PROPOSED_EXPERIMENT" && recommendation.metadata.datasetBounds) { const x = recommendation.candidatePoint.x; const y = recommendation.candidatePoint.y; if (x < recommendation.metadata.datasetBounds.x.min || x > recommendation.metadata.datasetBounds.x.max || y < recommendation.metadata.datasetBounds.y.min || y > recommendation.metadata.datasetBounds.y.max) warnings.push({ id: `recommendation-bounds-${recommendation.id}`, severity: "IMPORTANT", message: `Recommendation ${recommendation.id} falls outside observed bounds.` }); } if (String(recommendation.dataStatus) === "REAL_NASA_DATA") warnings.push({ id: `recommendation-status-${recommendation.id}`, severity: "IMPORTANT", message: `Proposed recommendation ${recommendation.id} is incorrectly marked REAL_NASA_DATA.` }); });
    evidenceAssets.forEach((asset) => { if (!asset.sourceExperimentId || !runs.some((run) => run.sourceExperimentId === asset.sourceExperimentId)) warnings.push({ id: `asset-run-${asset.id}`, severity: "IMPORTANT", message: `Evidence asset ${asset.id} does not resolve to a validated run.` }); });
    nasaDocumentLinks.filter((link) => link.matchStatus === "VERIFIED").forEach((link) => { if (!runs.some((run) => run.sourceExperimentId === link.sourceExperimentId)) warnings.push({ id: `document-link-${link.documentId}-${link.sourceExperimentId}`, severity: "IMPORTANT", message: `Verified document link points to missing run ${link.sourceExperimentId}.` }); });
    return { passed: warnings.length === 0, warnings };
}

function getLegacySystemTrustSummary(): SystemTrustSummary {
    return { realRuns: validRuns.length + sameValidRuns.length + sameRValidRuns.length + saffireValidRuns.length + saffireIIValidRuns.length + saffireIIIValidRuns.length, rejectedRuns: rejectedRuns.length + sameRejectedRuns.length + sameRRejectedRuns.length + saffireRejectedRuns.length + saffireIIRejectedRuns.length + saffireIIIRejectedRuns.length, evidenceAssets: evidenceAssets.length, documents: documents.length, documentChunks: chunks.length, verifiedDocumentRunLinks: nasaDocumentLinks.filter((link) => link.matchStatus === "VERIFIED").length, askTests: 37, recommendationAlgorithmVersion: RECOMMENDATION_ALGORITHM_VERSION, challengeEngineVersion: CHALLENGE_ENGINE_VERSION, knownLimitations: ["No validated outcome model", "No causal model", "Air display and Fan display are not physical airflow for BASS-II; SAME and SAFFIRE explicit Air Flow fields are physical", "SAME detector-response data is not ingested", "SAME-R particle and detector result sources are not ingested", "SAFFIRE-I raw camera and time-series data are not ingested", "SAFFIRE-II camera, telemetry, and detailed time-series data are not ingested", "SAFFIRE-III thickness and airflow source-context conflicts remain unresolved"], families: [{ family: "BASS-II", investigationId: "bass-ii", status: "INGESTED", realRuns: validRuns.length, rejectedRuns: rejectedRuns.length, evidenceAssets: evidenceAssets.length, documents: documents.length }, { family: "SAME", investigationId: "same", status: "INGESTED", realRuns: sameValidRuns.length, rejectedRuns: sameRejectedRuns.length, evidenceAssets: 0, documents: 0 }, { family: "SAME-R", investigationId: "same-r", status: "INGESTED", realRuns: sameRValidRuns.length, rejectedRuns: sameRRejectedRuns.length, evidenceAssets: 0, documents: 0 }, { family: "SAFFIRE-I", investigationId: "saffire-i", status: "INGESTED", realRuns: saffireValidRuns.length, rejectedRuns: saffireRejectedRuns.length, evidenceAssets: 0, documents: 0 }, { family: "SAFFIRE-II", investigationId: "saffire-ii", status: "INGESTED", realRuns: saffireIIValidRuns.length, rejectedRuns: saffireIIRejectedRuns.length, evidenceAssets: 0, documents: 0 }, { family: "SAFFIRE-III", investigationId: "saffire-iii", status: "INGESTED", realRuns: saffireIIIValidRuns.length, rejectedRuns: saffireIIIRejectedRuns.length, evidenceAssets: 0, documents: 0 }, { family: "SAFFIRE-II pre-test", investigationId: "saffire-ii", status: "INGESTED", realRuns: saffireIIPretests.length, rejectedRuns: 0, evidenceAssets: 0, documents: 0 }, { family: "SAFFIRE-II source notes", investigationId: "saffire-ii", status: "INGESTED", realRuns: saffireIINotes.length, rejectedRuns: 0, evidenceAssets: 0, documents: 0 }, { family: "FLEX", investigationId: "flex", status: "NOT_INGESTED", realRuns: 0, rejectedRuns: 0, evidenceAssets: 0, documents: 0 }] };
}

export function getSystemTrustSummary(): SystemTrustSummary {
    const summary = getLegacySystemTrustSummary();
    summary.realRuns += flexValidRuns.length;
    summary.rejectedRuns += flexRejectedRuns.length;
    summary.knownLimitations.push("FLEX local table/report scope differs (274 vs 284)", "FLEX raw CO header and burning-rate unit semantics require NASA report context");
    summary.knownLimitations.push("FLEX-2 PSI-68 records are configuration envelopes; no run-level results are currently ingested");
    summary.knownLimitations.push("SPICE PSI-107 rows are operating-condition observations, not independent runs; smoke-point and flame-length results are not in the current table");
    summary.families = [...summary.families.filter((family) => family.family !== "FLEX"), { family: "FLEX", investigationId: "flex", status: "INGESTED", realRuns: flexValidRuns.length, rejectedRuns: flexRejectedRuns.length, evidenceAssets: 0, documents: 0 }];
    summary.families.push({ family: "FLEX-2 configuration envelopes", investigationId: "flex-2", status: "INGESTED", realRuns: 0, rejectedRuns: 0, evidenceAssets: 0, documents: 0 });
    summary.families.push({ family: "SPICE operating observations", investigationId: "spice", status: "INGESTED", realRuns: 0, rejectedRuns: 0, evidenceAssets: 0, documents: 0 });
    return summary;
}
