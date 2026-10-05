import { Suspense } from "react";
import { nasaBassIIExperimentRuns } from "@/data/nasa-experiment-runs";
import { analyzeLandscapeVariables } from "@/lib/landscape";
import LandscapeExplorer from "@/components/landscape/LandscapeExplorer";

export default function LandscapePage() {
    const variables = analyzeLandscapeVariables(nasaBassIIExperimentRuns);
    return <Suspense fallback={<main className="min-h-screen bg-[#050811] p-10 text-slate-400">Loading Fire Landscape…</main>}><LandscapeExplorer runs={nasaBassIIExperimentRuns} variables={variables} /></Suspense>;
}
