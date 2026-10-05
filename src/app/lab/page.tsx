"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { nasaInvestigations } from "@/data/nasa-investigations";
import { nasaExperimentRuns } from "@/data/nasa-experiment-runs";
import VirtualLabWorkspace from "@/components/lab/VirtualLabWorkspace";

function LabRouteContent() {
    const searchParams = useSearchParams();
    const investigationId = searchParams.get("investigation");
    const runId = searchParams.get("run");
    const investigation = nasaInvestigations.find((item) => item.id === investigationId);
    const run = runId ? nasaExperimentRuns.find((item) => item.id === runId && item.investigationId === investigationId) : undefined;
    return <VirtualLabWorkspace key={`${investigationId ?? "none"}:${runId ?? "demo"}`} investigation={investigation} run={run} />;
}

export default function VirtualFireLabPage() {
    return <Suspense fallback={<main className="min-h-screen bg-[#050811]" />}><LabRouteContent /></Suspense>;
}
