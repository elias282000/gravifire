"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { nasaInvestigations } from "@/data/nasa-investigations";

export default function ExperimentsPage() {
    const [search, setSearch] = useState("");
    const [family, setFamily] = useState("ALL");

    const filtered = useMemo(() => {
        return nasaInvestigations.filter((item) => {
            const matchesFamily =
                family === "ALL" || item.family === family;

            const text = [
                item.title,
                item.family,
                item.category,
                item.shortDescription,
                ...item.materials,
                ...item.capabilities,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = text.includes(search.toLowerCase());

            return matchesFamily && matchesSearch;
        });
    }, [search, family]);

    return (
        <main className="min-h-screen bg-[#050811] text-white">
            <div className="mx-auto max-w-[1600px] px-5 py-5">
                <header className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
                                GRAVIFIRE
                            </p>

                            <h1 className="mt-2 text-2xl font-semibold">
                                NASA Experiment Explorer
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                Explore NASA combustion investigations and discover the
                                evidence behind GRAVIFIRE.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/landscape" className="rounded-xl border border-cyan-400/30 bg-cyan-400/[0.08] px-5 py-3 text-center text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/[0.14]">Fire Landscape</Link>
                            <Link href="/experiments/saffire-comparison" className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]">SAFFIRE Comparison</Link>
                            <Link href="/experiments/same-comparison" className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]">SAME Comparison</Link>
                            <Link href="/experiments/flex-comparison" className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]">FLEX Comparison</Link>
                            <Link href="/lab" className="rounded-xl border border-cyan-400/30 bg-cyan-400/[0.08] px-5 py-3 text-center text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/[0.14]">Open Virtual Lab</Link>
                        </div>
                    </div>
                </header>

                <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                    {/* Filters */}
                    <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                            Filters
                        </p>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm text-slate-400">
                                Search
                            </label>

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="PMMA, smoke, extinction..."
                                className="w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50"
                            />
                        </div>

                        <div className="mt-6">
                            <p className="mb-3 text-sm text-slate-400">
                                Experiment Family
                            </p>

                            <div className="space-y-2">
                                {["ALL", "BASS-II", "SAFFIRE-I", "SAFFIRE-II", "SAFFIRE-III", "FLEX", "FLEX-2", "SAME", "SAME-R"].map(
                                    (item) => (
                                        <button
                                            key={item}
                                            onClick={() => setFamily(item)}
                                            className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                                                family === item
                                                    ? "border-cyan-400/30 bg-cyan-400/[0.10] text-cyan-200"
                                                    : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                                            }`}
                                        >
                                            {item === "ALL" ? "All Investigations" : item}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="mt-7 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
                            <p className="text-xs font-semibold text-emerald-300">
                                DATA POLICY
                            </p>

                            <p className="mt-2 text-xs leading-5 text-slate-400">
                                GRAVIFIRE keeps NASA source provenance visible and separates
                                original evidence from model-generated estimates.
                            </p>
                        </div>
                    </aside>

                    {/* Results */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    {filtered.length} investigations
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Initial GRAVIFIRE evidence catalog
                                </p>
                            </div>

                            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                Investigation View
              </span>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-2">
                            {filtered.map((investigation) => (
                                <article
                                    key={investigation.id}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.025]"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge>{investigation.family}</Badge>

                                                {investigation.psiId && (
                                                    <Badge>{investigation.psiId}</Badge>
                                                )}

                                                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-1 text-[10px] font-medium text-emerald-300">
                          NASA SOURCE
                        </span>
                                            </div>

                                            <h2 className="mt-4 text-lg font-semibold tracking-tight">
                                                {investigation.title}
                                            </h2>

                                            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">
                                                {investigation.category}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-6 text-slate-400">
                                        {investigation.shortDescription}
                                    </p>

                                    <div className="mt-5">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                                            Research Areas
                                        </p>

                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {investigation.capabilities.map((capability) => (
                                                <span
                                                    key={capability}
                                                    className="rounded-lg border border-white/10 bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400"
                                                >
                          {capability}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 border-t border-white/10 pt-4">
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <Link
                                                href={`/experiments/${investigation.id}`}
                                                className="rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                                            >
                                                Explore Investigation
                                            </Link>

                                            <a
                                                href={investigation.sourceUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-slate-300 transition hover:bg-white/[0.06]"
                                            >
                                                View NASA Source
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-16 text-center">
                                <p className="font-medium text-slate-300">
                                    No matching investigations
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    Try another keyword or experiment family.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.07] px-2 py-1 text-[10px] font-medium text-cyan-300">
      {children}
    </span>
    );
}
