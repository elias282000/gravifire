import { z } from "zod";
import { answerGroundedQuery } from "@/lib/grounded-query";

const requestSchema = z.object({
    query: z.string().trim().min(1).max(500),
    runId: z.string().trim().min(1).max(80).optional(),
    investigationId: z.string().trim().min(1).max(80).optional(),
    recommendationContext: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
    const body: unknown = await request.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: "Enter a question up to 500 characters." }, { status: 400 });
    return Response.json(answerGroundedQuery(parsed.data));
}
