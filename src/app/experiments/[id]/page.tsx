"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { nasaInvestigations } from "@/data/nasa-investigations";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import ExperimentRunCard from "@/components/experiments/ExperimentRunCard";
import pipelineReport from "../../../../data/nasa/normalized/bass-ii/ingestion-report.json";
import documentReport from "../../../../data/nasa/normalized/bass-ii/document-ingestion-report.json";
import evidenceAssets from "../../../../data/nasa/normalized/bass-ii/evidence-assets.json";
import samePipelineReport from "../../../../data/nasa/normalized/same/ingestion-report.json";
import saffirePipelineReport from "../../../../data/nasa/normalized/saffire-i/ingestion-report.json";
import saffireIIPipelineReport from "../../../../data/nasa/normalized/saffire-ii/ingestion-report.json";
import saffireIIIPipelineReport from "../../../../data/nasa/normalized/saffire-iii/ingestion-report.json";
import sameRPipelineReport from "../../../../data/nasa/normalized/same-r/ingestion-report.json";
import flexPipelineReport from "../../../../data/nasa/normalized/flex/ingestion-report.json";
import flex2PipelineReport from "../../../../data/nasa/normalized/flex-2/ingestion-report.json";
import { nasaExperimentConfigurations } from "@/data/nasa-experiment-configurations";
import FLEX2ConfigurationCard from "@/components/experiments/FLEX2ConfigurationCard";
import { nasaOperatingConditionObservations } from "@/data/nasa-operating-condition-observations";
import SPICEObservationCard from "@/components/experiments/SPICEObservationCard";
import spicePipelineReport from "../../../../data/nasa/normalized/spice/ingestion-report.json";

export default function InvestigationDetailPage() {
    const params = useParams<{ id: string }>();

    const investigation = nasaInvestigations.find(
        (item) => item.id === params.id
    );
    const runs = nasaExperimentRuns.filter((run) => run.investigationId === params.id);

    if (!investigation) {
        return (
            <main className="min-h-screen bg-[#050811] text-white">
                <div className="mx-auto max-w-5xl px-5 py-20 text-center">
                    <h1 className="text-2xl font-semibold">
                        Investigation not found
                    </h1>

                    <Link
                        href="/experiments"
                        className="mt-6 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
                    >
                        Back to Explorer
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050811] text-white">
            <div className="mx-auto max-w-[1400px] px-5 py-5">
                {/* Top navigation */}
                <div className="mb-5">
                    <Link
                        href="/experiments"
                        className="text-sm text-slate-400 transition hover:text-cyan-300"
                    >
                        ← NASA Experiment Explorer
                    </Link>
                </div>

                {/* Hero */}
                <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                    <div className="relative p-7 md:p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.10),transparent_45%)]" />

                        <div className="relative">
                            <div className="flex flex-wrap gap-2">
                                <Badge>{investigation.family}</Badge>

                                {investigation.psiId && (
                                    <Badge>{investigation.psiId}</Badge>
                                )}

                                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-xs font-medium text-emerald-300">
                  NASA SOURCE
                </span>
                            </div>

                            <p className="mt-7 text-xs uppercase tracking-[0.25em] text-cyan-300">
                                NASA Investigation
                            </p>

                            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl">
                                {investigation.title}
                            </h1>

                            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-slate-500">
                                {investigation.category}
                            </p>

                            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400">
                                {investigation.shortDescription}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={`/lab?investigation=${investigation.id}`}
                                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                                >
                                    Open in Virtual Lab →
                                </Link>

                                <Link
                                    href={`/ask?investigation=${investigation.id}`}
                                    className="rounded-xl border border-cyan-400/25 bg-cyan-400/[0.04] px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/[0.09]"
                                >
                                    Ask about {investigation.family}
                                </Link>

                                {investigation.id === "bass-ii" && (
                                    <Link
                                        href="/landscape"
                                        className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06]"
                                    >
                                        Explore Fire Landscape
                                    </Link>
                                )}

                                {investigation.id === "bass-ii" && (
                                    <Link
                                        href="/recommend"
                                        className="rounded-xl border border-amber-400/25 bg-amber-400/[0.04] px-6 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/[0.09]"
                                    >
                                        Next Experiment
                                    </Link>
                                )}

                                <a
                                    href={investigation.sourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06]"
                                >
                                    View Original NASA Source
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
                    {/* Left */}
                    <section className="space-y-5">
                        <Panel title="Research Focus">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {investigation.capabilities.map((capability) => (
                                    <div
                                        key={capability}
                                        className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4"
                                    >
                                        <p className="text-sm font-medium text-slate-200">
                                            {capability}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        <Panel title="Materials">
                            <div className="flex flex-wrap gap-2">
                                {investigation.materials.map((material) => (
                                    <span
                                        key={material}
                                        className="rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-sm text-cyan-200"
                                    >
                    {material}
                  </span>
                                ))}
                            </div>
                        </Panel>

                        <Panel title="Experiment Runs">
                            {investigation.id === "spice" ? (
                                <div className="space-y-4"><p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-6 text-amber-100">The current Experimental Table contains {spicePipelineReport.validObservations} operating-condition observations. These rows are not one-to-one independent flames or tests.</p>{nasaOperatingConditionObservations.slice(0, 24).map((observation) => <SPICEObservationCard key={observation.internalObservationId} observation={observation} />)}<p className="text-sm text-slate-500">Showing the first 24 observations. The generated dataset contains all {nasaOperatingConditionObservations.length} source rows.</p></div>
                            ) : investigation.id === "flex-2" ? (
                                <div className="space-y-4"><p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-6 text-amber-100">This source contains configuration envelopes, not individual experimental runs. Configuration entries: {flex2PipelineReport.validConfigurationEnvelopes}.</p>{nasaExperimentConfigurations.map((configuration) => <FLEX2ConfigurationCard key={configuration.id} configuration={configuration} />)}</div>
                            ) : runs.length > 0 ? (
                                <div className="space-y-4">
                                    {runs.map((run) => <ExperimentRunCard key={run.id} run={run} />)}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
                                    <p className="font-medium text-amber-200">Run-level NASA data has not been ingested yet.</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        GRAVIFIRE currently has investigation-level provenance for this dataset. Individual experimental records will appear here after ingestion and validation.
                                    </p>
                                    <div className="mt-4"><span className="rounded-md border border-slate-400/20 bg-slate-400/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-300">NO RUNS AVAILABLE</span></div>
                                </div>
                            )}
                        </Panel>

                        {investigation.id === "same" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Experimental Table" value={`${samePipelineReport.validRecords} validated samples`} /><EvidenceMetric label="Source Files" value={String(samePipelineReport.sourceFilesProcessed.length + samePipelineReport.sourceFilesUnsupported.length)} /><EvidenceMetric label="Rejected Records" value={String(samePipelineReport.rejectedRecords)} /><EvidenceMetric label="Physical Air Flow" value={`${samePipelineReport.numericCoverage.airflowCmS}/${samePipelineReport.validRecords} numeric`} /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">This panel reports only the PSI-102 Experimental Table currently ingested into GRAVIFIRE. Detector-response and smoke-particle datasets are not yet ingested.</p>
                            </Panel>
                        )}
                        {investigation.id === "same-r" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Experimental Table Records" value={String(sameRPipelineReport.validRecords)} /><EvidenceMetric label="Raw Sample Types" value={String(Object.keys(sameRPipelineReport.sampleTypeCounts).length)} /><EvidenceMetric label="Duplicate Test # Groups" value={String(sameRPipelineReport.duplicateSourceExperimentIdCount)} /><EvidenceMetric label="Inlet Velocity Coverage" value={`${sameRPipelineReport.numericCoverage.inletVelocityCmS}/${sameRPipelineReport.validRecords}`} /><EvidenceMetric label="Net Aging Coverage" value={`${sameRPipelineReport.numericCoverage.netAgingTime}/${sameRPipelineReport.validRecords}`} /><EvidenceMetric label="Net Aging n/a" value={String(sameRPipelineReport.netAgingNotApplicableCount)} /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">The current Experimental Table contains five raw sample types. Particle-size, morphology, and detector measurements require separate scientific-result sources and are not represented here.</p>
                            </Panel>
                        )}
                        {investigation.id === "saffire-i" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Combustion Experiments" value={String(saffirePipelineReport.combustionRecords)} /><EvidenceMetric label="Pre-test Flow Records" value={String(saffirePipelineReport.pretestFlowVisualizationRecords)} /><EvidenceMetric label="Rejected Records" value={String(saffirePipelineReport.rejectedRecords)} /><EvidenceMetric label="Source Rows" value={String(saffirePipelineReport.rawRows)} /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">Counts come from the locally ingested PSI-98 Experimental Table. Other SAFFIRE-I evidence remains not yet ingested into GRAVIFIRE.</p>
                            </Panel>
                        )}
                        {investigation.id === "saffire-ii" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Combustion Experiments" value={String(saffireIIPipelineReport.combustionExperiments)} /><EvidenceMetric label="Pre-test Records" value={String(saffireIIPipelineReport.pretestRecords)} /><EvidenceMetric label="Source Notes" value={String(saffireIIPipelineReport.sourceNoteRecords)} /><EvidenceMetric label="Rejected Records" value={String(saffireIIPipelineReport.rejectedRecords)} /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">Counts come from the locally ingested PSI-99 Experimental Table. Other SAFFIRE-II evidence is not yet ingested into GRAVIFIRE.</p>
                            </Panel>
                        )}
                        {investigation.id === "saffire-iii" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Experimental Table Records" value={String(saffireIIIPipelineReport.validRuns)} /><EvidenceMetric label="Rejected Records" value={String(saffireIIIPipelineReport.rejectedRows)} /><EvidenceMetric label="Source Conflicts" value={String(saffireIIIPipelineReport.sourceConflictCount)} /><EvidenceMetric label="Camera References" value={`${saffireIIIPipelineReport.cameraCoverage.camera1 + saffireIIIPipelineReport.cameraCoverage.camera2}`} /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">Counts come from the locally ingested PSI-100 Experimental Table. External NASA context is displayed separately and does not overwrite primary PSI values.</p>
                            </Panel>
                        )}
                        {investigation.id === "bass-ii" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <EvidenceMetric label="Experimental Table" value={`${pipelineReport.validRecords} validated tests`} />
                                    <EvidenceMetric label="Raw Evidence" value={`${evidenceAssets.length} linked assets`} />
                                    <EvidenceMetric label="Scientific Documents" value={`${documentReport.documentsProcessed} ingested`} />
                                    <EvidenceMetric label="Direct Source Claims" value={`${documentReport.directClaimsGenerated} generated`} />
                                    <EvidenceMetric label="Exact Run Links" value={`${documentReport.verifiedRunLinks} verified`} />
                                </div>
                                <Link href="/documents/bass-ii/20210011385" className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200">Explore Scientific Context →</Link>
                                <p className="mt-3 text-xs leading-5 text-slate-500">The BASS-II Summary Report is investigation-level evidence unless an exact document-to-run identifier link is verified.</p>
                            </Panel>
                        )}
                        {investigation.id === "flex" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Validated FLEX Tests" value={String(flexPipelineReport.validRecords)} /><EvidenceMetric label="Fuels" value={Object.entries(flexPipelineReport.fuelCounts).map(([fuel, count]) => `${fuel} ${count}`).join(" · ")} /><EvidenceMetric label="Extinction Diameter" value={`${flexPipelineReport.extinctionDiameter.numeric}/${flexPipelineReport.validRecords} numeric`} /><EvidenceMetric label="Burning-rate Constant" value={`${flexPipelineReport.burningRate.numeric}/${flexPipelineReport.validRecords} numeric`} /><EvidenceMetric label="Test End" value={Object.entries(flexPipelineReport.testEndCounts).map(([status, count]) => `${status} ${count}`).join(" · ")} /><EvidenceMetric label="Scope Discrepancy" value="274 local / 284 report" /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">This represents the currently ingested PSI-69 Experimental Table, not all FLEX raw or analyzed data. The detailed NASA report supplies semantic context but has not been ingested as searchable document evidence.</p>
                            </Panel>
                        )}
                        {investigation.id === "flex-2" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Configuration Entries" value={String(flex2PipelineReport.validConfigurationEnvelopes)} /><EvidenceMetric label="Source Record Type" value="CONFIGURATION ENVELOPE" /><EvidenceMetric label="Pure Fuels" value={String(flex2PipelineReport.pureFuelCount)} /><EvidenceMetric label="Mixture Configurations" value={String(flex2PipelineReport.mixtureFuelCount)} /><EvidenceMetric label="Run-level Results" value="NONE CURRENTLY INGESTED" /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">The PSI-68 table defines configuration space. It does not establish a run count or a Cartesian set of flown combinations.</p>
                            </Panel>
                        )}
                        {investigation.id === "spice" && (
                            <Panel title="Scientific Evidence">
                                <div className="grid gap-3 sm:grid-cols-2"><EvidenceMetric label="Source Rows" value={String(spicePipelineReport.validObservations)} /><EvidenceMetric label="Record Type" value="OPERATING CONDITION OBSERVATIONS" /><EvidenceMetric label="Duplicate Occurrences" value={String(spicePipelineReport.exactDuplicateOccurrences)} /><EvidenceMetric label="Negative Air Rates" value={String(spicePipelineReport.negativeAirRateCount)} /><EvidenceMetric label="Smoke-point Labels" value="NONE IN CURRENT TABLE" /><EvidenceMetric label="Flame Results" value="NONE IN CURRENT TABLE" /></div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">NASA investigation-level publications may report flame or smoke-point counts at different scopes. This table’s 469 rows are not treated as a direct flame count.</p>
                            </Panel>
                        )}

                        <Panel title="GRAVIFIRE Usage">
                            <p className="text-sm leading-7 text-slate-400">
                                This investigation can contribute evidence to GRAVIFIRE.
                                Individual experiment runs will later be normalized and linked
                                to their original NASA sources before they are used for
                                measured results, comparisons, model training, or
                                counterfactual predictions.
                            </p>

                            <div className="mt-5 grid gap-3 md:grid-cols-3">
                                <StatusCard
                                    title="Investigation"
                                    value="Available"
                                    tone="green"
                                />

                                <StatusCard
                                    title="Run-Level Data"
                                    value="Next Step"
                                    tone="yellow"
                                />

                                <StatusCard
                                    title="Predictive Model"
                                    value="Not Connected"
                                    tone="gray"
                                />
                            </div>
                        </Panel>
                    </section>

                    {/* Right */}
                    <aside className="space-y-5">
                        <Panel title="Source Information">
                            <InfoRow
                                label="Family"
                                value={investigation.family}
                            />

                            <InfoRow
                                label="PSI ID"
                                value={investigation.psiId ?? "N/A"}
                            />

                            <InfoRow
                                label="Environment"
                                value={investigation.environment}
                            />

                            <InfoRow
                                label="Repository"
                                value={investigation.sourceName}
                            />
                        </Panel>

                        <Panel title="Evidence Integrity">
                            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                                <p className="text-xs font-semibold text-emerald-300">
                                    SOURCE PROVENANCE PRESERVED
                                </p>

                                <p className="mt-2 text-xs leading-5 text-slate-400">
                                    GRAVIFIRE keeps the original NASA investigation reference
                                    attached to imported scientific records.
                                </p>
                            </div>

                            <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
                                <p className="text-xs font-semibold text-amber-300">
                                    IMPORTANT
                                </p>

                                <p className="mt-2 text-xs leading-5 text-slate-400">
                                    This page currently represents an investigation, not an
                                    individual measured experiment run.
                                </p>
                            </div>
                        </Panel>

                        {investigation.id === "bass-ii" && (
                            <Panel title="Data Pipeline">
                                <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                                    <span>NASA Source</span><span className="h-px flex-1 bg-white/10" /><span>Raw</span><span className="h-px flex-1 bg-white/10" /><span>Validated</span><span className="h-px flex-1 bg-white/10" /><span>GRAVIFIRE</span>
                                </div>
                                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                    <PipelineMetric label="Source Files" value={pipelineReport.sourceFilesProcessed.length + pipelineReport.sourceFilesUnsupported.length} />
                                    <PipelineMetric label="Validated Runs" value={pipelineReport.validRecords} />
                                    <PipelineMetric label="Rejected Runs" value={pipelineReport.rejectedRecords} />
                                </div>
                                <p className="mt-4 text-xs leading-5 text-slate-500">Counts come from the latest local ingestion report. Unsupported files remain registered but are never interpreted as scientific records.</p>
                            </Panel>
                        )}

                        <Link
                            href={`/lab?investigation=${investigation.id}`}
                            className="block rounded-xl bg-cyan-400 px-5 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                        >
                            Load into GRAVIFIRE Lab
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function Panel({
                   title,
                   children,
               }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-cyan-300">
                {title}
            </p>

            {children}
        </div>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.07] px-2.5 py-1 text-xs font-medium text-cyan-300">
      {children}
    </span>
    );
}

function InfoRow({
                     label,
                     value,
                 }: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start justify-between gap-5 border-b border-white/5 py-3 last:border-0">
            <span className="text-sm text-slate-500">{label}</span>

            <span className="max-w-[190px] text-right text-sm text-slate-200">
        {value}
      </span>
        </div>
    );
}

function StatusCard({
                        title,
                        value,
                        tone,
                    }: {
    title: string;
    value: string;
    tone: "green" | "yellow" | "gray";
}) {
    const tones = {
        green:
            "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300",
        yellow:
            "border-amber-400/20 bg-amber-400/[0.06] text-amber-300",
        gray:
            "border-white/10 bg-white/[0.025] text-slate-400",
    };

    return (
        <div className={`rounded-xl border p-4 ${tones[tone]}`}>
            <p className="text-xs opacity-60">{title}</p>
            <p className="mt-2 text-sm font-medium">{value}</p>
        </div>
    );
}

function PipelineMetric({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-2 text-xl font-semibold text-slate-200">{value}</p>
        </div>
    );
}

function EvidenceMetric({ label, value }: { label: string; value: string }) {
    return <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{label}</p><p className="mt-2 text-sm font-medium text-slate-200">{value}</p></div>;
}
