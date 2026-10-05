"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GroundedQueryResult } from "@/types/ask";
import EvidenceDNA from "@/components/evidence/EvidenceDNA";
import { nasaScientificDocuments, nasaDocumentLinks } from "@/data/nasa-document-data";
import { challengeAskAnswer } from "@/lib/challenge-engine";

const suggestions = ["What was the initial oxygen level in Test B1?", "What evidence do we have for B1?", "What does NASA say about extinction velocity?", "Which tests used PMMA?", "What don't we know about B1?"];

export default function AskGravifire() {
    const params = useSearchParams();
    const runId = params.get("run") ?? undefined;
    const investigationId = params.get("investigation") ?? undefined;
    const recommendationContext = params.get("context") ?? undefined;
    const [query, setQuery] = useState(params.get("query") ?? (runId ? `What evidence do we have for ${runId}?` : ""));
    const [result, setResult] = useState<GroundedQueryResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!query.trim()) return;
        setLoading(true); setError(null);
        try {
            const response = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, runId, investigationId, recommendationContext }) });
            const payload: unknown = await response.json();
            if (!response.ok || !payload || typeof payload !== "object" || !("answer" in payload)) throw new Error("The grounded query could not be completed.");
            setResult(payload as GroundedQueryResult);
        } catch (caught) { setError(caught instanceof Error ? caught.message : "The grounded query could not be completed."); }
        finally { setLoading(false); }
    }

    return <main className="min-h-screen bg-[#050811] text-white"><div className="mx-auto max-w-6xl px-5 py-8"><Link href="/experiments" className="text-sm text-slate-400 hover:text-cyan-300">← NASA Experiment Explorer</Link><header className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-7"><p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Evidence-grounded assistant</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">ASK GRAVIFIRE</h1><p className="mt-3 max-w-2xl text-slate-400">Ask questions across NASA combustion experiments and scientific reports. Answers use only ingested GRAVIFIRE evidence.</p><form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about a NASA experiment or report…" className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none ring-cyan-400 focus:ring-2" /><button disabled={loading || !query.trim()} className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Searching…" : "Ask GRAVIFIRE"}</button></form><div className="mt-4 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => setQuery(suggestion)} className="rounded-lg border border-white/10 px-3 py-2 text-left text-xs text-slate-400 hover:border-cyan-400/30 hover:text-cyan-200">{suggestion}</button>)}</div></header>{error && <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-sm text-rose-200">{error}</div>}{result && <ResultView result={result} />}</div></main>;
}

function ResultView({ result }: { result: GroundedQueryResult }) {
    const run = result.relatedRuns[0];
    const challenge = challengeAskAnswer(result);
    return <div className="mt-5 space-y-5"><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Answer</p><p className="mt-3 whitespace-pre-line text-lg leading-8 text-slate-100">{result.answer}</p></div><span className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ${result.evidenceCoverage === "DIRECT" ? "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300" : result.evidenceCoverage === "PARTIAL" ? "border-amber-400/25 bg-amber-400/[0.08] text-amber-300" : "border-slate-400/20 bg-slate-400/[0.08] text-slate-300"}`}>EVIDENCE {result.evidenceCoverage}</span></div><p className="mt-4 text-xs text-slate-500">Detected intent: {result.retrievalMetadata.intent} · {result.answerStatus}</p></section><section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Evidence Used</p><div className="mt-4 grid gap-3 md:grid-cols-2">{result.evidence.map((source) => <article key={source.id} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold text-emerald-300">{source.sourceType.replaceAll("_", " ")}</p><span className="text-xs text-cyan-200">{source.citation}</span></div><h3 className="mt-2 text-sm font-medium text-slate-100">{source.title}</h3><p className="mt-2 line-clamp-4 text-xs leading-5 text-slate-400">{source.text}</p><p className="mt-3 text-[11px] text-slate-500">{source.provenance}</p>{source.sourceUrl && <a href={source.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-cyan-300 hover:text-cyan-200">View source ↗</a>}</article>)}</div>{result.evidence.length === 0 && <p className="mt-3 text-sm text-slate-500">No source met the evidence threshold.</p>}</section><section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-6"><p className="text-xs uppercase tracking-[0.2em] text-amber-300">Limitations</p><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">{result.limitations.map((limitation) => <li key={limitation}>• {limitation}</li>)}</ul></section><section className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-5"><p className="text-xs uppercase tracking-[0.2em] text-amber-300">Challenge this answer</p><p className="mt-2 text-sm text-slate-300">{challenge.summary}</p><p className="mt-3 text-xs font-semibold tracking-[0.12em] text-amber-200">{challenge.challengeStatus.replaceAll("_", " ")}</p><p className="mt-2 text-xs text-slate-400">{challenge.limitations[0]?.text ?? challenge.missingEvidence[0]?.text ?? "No additional limitation found."}</p></section>{run && <EvidenceDNA run={run} documents={nasaScientificDocuments} documentLinks={nasaDocumentLinks} />}</div>;
}
