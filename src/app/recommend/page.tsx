import { Suspense } from "react";
import { nasaBassIIExperimentRuns } from "@/data/nasa-experiment-runs";
import { analyzeLandscapeVariables } from "@/lib/landscape";
import RecommendationExplorer from "@/components/recommendations/RecommendationExplorer";

export default function RecommendPage() { return <Suspense fallback={<main className="min-h-screen bg-[#050811] p-10 text-slate-400">Loading recommendation workspace…</main>}><RecommendationExplorer runs={nasaBassIIExperimentRuns} variables={analyzeLandscapeVariables(nasaBassIIExperimentRuns)} /></Suspense>; }
