"use client";

import { useState } from "react";
import { NASADocumentChunk } from "@/types/documents";
import { searchDocumentChunks } from "@/lib/document-search";

export default function DocumentSearch({ chunks }: { chunks: NASADocumentChunk[] }) {
    const [query, setQuery] = useState("");
    const results = searchDocumentChunks(chunks, query);
    return <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Search Source Text</p><p className="mt-2 text-sm text-slate-400">Deterministic text search over extracted pages and chunks. No embeddings or generated answers.</p><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="PMMA, extinction, oxygen..." className="mt-4 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50" />{query && <div className="mt-4 space-y-3">{results.length ? results.map((result) => <article key={result.chunk.chunkId} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs text-cyan-300">{result.citation}</span><span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{result.chunk.sectionTitle ?? "Section not detected"}</span></div><p className="mt-2 text-sm leading-6 text-slate-300">{result.chunk.text.slice(0, 500)}{result.chunk.text.length > 500 ? "…" : ""}</p></article>) : <p className="text-sm text-slate-500">No extracted source text matched this query.</p>}</div>}</div>;
}
