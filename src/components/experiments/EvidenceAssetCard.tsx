import { NASAExperimentEvidenceAsset } from "@/types/experiment";
import DataStatusBadge from "@/components/experiments/DataStatusBadge";

export default function EvidenceAssetCard({ asset }: { asset: NASAExperimentEvidenceAsset }) {
    return <article className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-200">{asset.fileName}</p><p className="mt-1 text-xs text-slate-500">{asset.assetType.replaceAll("_", " ")}</p></div><DataStatusBadge status={asset.dataStatus} /></div>
        {asset.assetType === "RAW_VIDEO" && <video className="mt-4 aspect-video w-full rounded-lg bg-black" controls preload="metadata" src={`/api/evidence/bass-ii/${asset.id}`}><track kind="captions" /></video>}
        <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2"><p>Match: <span className="text-slate-200">{asset.matchConfidence === "EXACT_IDENTIFIERS" ? "Test + Sample exact identifier match" : asset.matchConfidence}</span></p><p>File size: <span className="text-slate-200">{asset.sizeBytes.toLocaleString()} bytes</span></p><p className="sm:col-span-2">SHA-256: <code title={asset.sha256} className="text-slate-200">{asset.sha256.slice(0, 16)}…</code></p></div>
        <div className="mt-4 border-t border-white/5 pt-3 text-xs leading-5 text-slate-500"><p>NASA PSI-{asset.provenance.investigationId.replace("PSI-", "")} · {asset.provenance.parsedTestId ? `Test ${asset.provenance.parsedTestId}` : "Test not parsed"}{asset.provenance.parsedSampleId ? ` · Sample ${asset.provenance.parsedSampleId}` : ""}</p><a href={asset.sourceUrl} target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-cyan-200">View Source Investigation ↗</a></div>
    </article>;
}
