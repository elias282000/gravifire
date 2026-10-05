import { z } from "zod";
import { nasaExperimentRuns, nasaBassIIExperimentRuns } from "@/data/nasa-experiment-runs";
import { challengeRecommendation, challengeRun } from "@/lib/challenge-engine";
import { recommendExperiments } from "@/lib/recommendations";

const schema = z.discriminatedUnion("targetType", [z.object({ targetType: z.literal("RUN"), targetId: z.string().trim().min(1).max(80) }), z.object({ targetType: z.literal("RECOMMENDATION"), targetId: z.string().trim().min(1).max(160).optional(), recommendation: z.object({ id: z.string().trim().min(1).max(160) }).passthrough().optional() })]);

export async function POST(request: Request) {
    const body: unknown = await request.json().catch(() => null); const parsed = schema.safeParse(body);
    if (!parsed.success) return Response.json({ error: "Only validated RUN or RECOMMENDATION targets are accepted by this endpoint." }, { status: 400 });
    if (parsed.data.targetType === "RUN") { const run = nasaExperimentRuns.find((item) => item.id === parsed.data.targetId); if (!run) return Response.json({ error: "Run not found in normalized NASA data." }, { status: 404 }); return Response.json(challengeRun(run)); }
    const recommendationId = parsed.data.targetId ?? parsed.data.recommendation?.id; const recommendation = recommendExperiments({ runs: nasaBassIIExperimentRuns, xId: "initial_oxygen_percent", yId: "initial_co2_percent" }).recommendations.find((item) => item.id === recommendationId); if (!recommendation) return Response.json({ error: "Recommendation not found in deterministic output." }, { status: 404 }); return Response.json(challengeRecommendation(recommendation));
}
