import { notFound } from "next/navigation";
import { nasaExperimentRuns, nasaBassIIExperimentRuns, nasaSaffireIIExperimentRuns } from "@/data/nasa-experiment-runs";
import { nasaExperimentConfigurations } from "@/data/nasa-experiment-configurations";
import { challengeConfiguration, challengeObservation, challengeRecommendation, challengeRun, challengeComparison, challengeLandscapeRegion } from "@/lib/challenge-engine";
import { resolveM1Pair } from "@/lib/m1-evidence";
import { nasaOperatingConditionObservations } from "@/data/nasa-operating-condition-observations";
import { recommendExperiments } from "@/lib/recommendations";
import { DensityClass } from "@/types/landscape";
import ChallengeResultView from "@/components/challenge/ChallengeResultView";

type Params = { type?: string; id?: string; x?: string; y?: string; material?: string; pi?: string; xMin?: string; xMax?: string; yMin?: string; yMax?: string; density?: string; count?: string };
export default async function ChallengePage({ searchParams }: { searchParams: Promise<Params> }) { const params = await searchParams;
  if (params.type === "m1-comparison") { const pair = resolveM1Pair(); return <ChallengeResultView result={challengeComparison(pair.s1.run, pair.s2.run)} />; }
  if (params.type === "m4-silicone") { const records = nasaSaffireIIExperimentRuns.filter((run) => ["2-1", "2-2", "2-3", "2-4"].includes(run.sourceExperimentId)); return <ChallengeResultView result={challengeComparison(records[0], records[3])} />; }
  if (params.type === "observation" && params.id) { const observation = nasaOperatingConditionObservations.find((item) => item.internalObservationId === params.id); if (!observation) notFound(); return <ChallengeResultView result={challengeObservation(observation)} />; }
  if (params.type === "configuration" && params.id) { const configuration = nasaExperimentConfigurations.find((item) => item.id === params.id); if (!configuration) notFound(); return <ChallengeResultView result={challengeConfiguration(configuration)} />; }
  if (params.type === "run" && params.id) { const run = nasaExperimentRuns.find((item) => item.id === params.id); if (!run) notFound(); return <ChallengeResultView result={challengeRun(run)} />; }
  if (params.type === "recommendation" && params.id) { const recommendation = recommendExperiments({ runs: nasaBassIIExperimentRuns, xId: params.x ?? "initial_oxygen_percent", yId: params.y ?? "initial_co2_percent", material: params.material ?? "ALL", principalInvestigator: params.pi ?? "ALL", topN: 64 }).recommendations.find((item) => item.id === params.id); if (!recommendation) notFound(); return <ChallengeResultView result={challengeRecommendation(recommendation)} />; }
  if (params.type === "landscape" && params.x && params.y && params.xMin && params.xMax && params.yMin && params.yMax) { const region = { targetId: params.id ?? "landscape-region", xId: params.x, yId: params.y, xLabel: params.x, yLabel: params.y, bounds: { x: { min: Number(params.xMin), max: Number(params.xMax) }, y: { min: Number(params.yMin), max: Number(params.yMax) } }, densityClass: (params.density ?? "UNSAMPLED") as DensityClass, pointCount: Number(params.count ?? 0), nearbyRunIds: [] }; return <ChallengeResultView result={challengeLandscapeRegion(region)} />; }
  return <ChallengeResultView result={challengeRun(nasaExperimentRuns.find((run) => run.id === "B1")!)} />;
}
