import Link from "next/link";
import { NASAExperimentRun } from "@/types/experiment";
import DataStatusBadge from "@/components/experiments/DataStatusBadge";
import { SAMERunCardDetails } from "@/components/experiments/SAMERunDetails";
import { SAFFIRERunCardDetails } from "@/components/experiments/SAFFIRERunDetails";
import { SAFFIREIIRunCardDetails } from "@/components/experiments/SAFFIREIIRunDetails";
import { SAFFIREIIIRunCardDetails } from "@/components/experiments/SAFFIREIIIRunDetails";
import { SAMERRunCardDetails } from "@/components/experiments/SAMERRunDetails";
import { FLEXRunCardDetails } from "@/components/experiments/FLEXRunDetails";

export default function ExperimentRunCard({ run }: { run: NASAExperimentRun }) {
    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{run.sourceExperimentId}</p>
                    <h3 className="mt-2 font-semibold text-white">{run.title}</h3>
                </div>
                <DataStatusBadge status={run.dataStatus} />
            </div>
            {run.family === "SAME" ? <SAMERunCardDetails run={run} /> : run.family === "SAME-R" ? <SAMERRunCardDetails run={run} /> : run.family === "SAFFIRE-I" ? <SAFFIRERunCardDetails run={run} /> : run.family === "SAFFIRE-II" ? <SAFFIREIIRunCardDetails run={run} /> : run.family === "SAFFIRE-III" ? <SAFFIREIIIRunCardDetails run={run} /> : run.family === "FLEX" ? <FLEXRunCardDetails run={run} /> : <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div><span className="text-slate-500">PI</span><p className="mt-1 text-slate-200">{run.sourceMetadata?.principalInvestigator ?? "Not recorded"}</p></div>
                <div><span className="text-slate-500">Sample</span><p className="mt-1 text-slate-200">{run.sourceMetadata?.sourceSampleId ?? "Not recorded"}</p></div>
                <div className="sm:col-span-2"><span className="text-slate-500">Raw material</span><p className="mt-1 text-slate-200">{run.sourceMetadata?.rawMaterialDescription ?? run.material}</p></div>
            </div>}
            {run.family === "BASS-II" && <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
                {run.measurements?.initialOxygenPercent && <span className="rounded-md border border-white/10 px-2 py-1">Initial O₂ {run.measurements.initialOxygenPercent.rawValue}%</span>}
                {run.sourceMetadata?.testDateRaw && <span className="rounded-md border border-white/10 px-2 py-1">Date {run.sourceMetadata.testDateRaw}</span>}
            </div>}
            <Link href={`/experiments/${run.investigationId}/runs/${run.id}`} className="mt-5 inline-flex rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">View Experiment →</Link>
        </article>
    );
}
