import { open } from "node:fs/promises";
import { join } from "node:path";
import { nasaEvidenceAssets } from "@/data/nasa-evidence-assets";
import { resolveSafeEvidencePath } from "@/lib/evidence-serving";

export const runtime = "nodejs";

export async function GET(request: Request, context: { params: Promise<{ assetId: string }> }) {
    const { assetId } = await context.params;
    const asset = nasaEvidenceAssets.find((candidate) => candidate.id === assetId);
    if (!asset) return new Response("Evidence asset not found", { status: 404 });
    const normalizedPath = asset.localPath.replace(/\\/g, "/");
    const evidenceRoots = [
        { prefix: "src/data/nasa/raw/", root: join(process.cwd(), "src", "data", "nasa", "raw") },
        { prefix: "data/nasa/raw/", root: join(process.cwd(), "data", "nasa", "raw") },
    ];
    const matchingRoot = evidenceRoots.find((candidate) => normalizedPath.startsWith(candidate.prefix));
    const filePath = matchingRoot ? resolveSafeEvidencePath(matchingRoot.root, normalizedPath.slice(matchingRoot.prefix.length)) : null;
    if (!filePath) return new Response("Evidence asset path is invalid", { status: 404 });
    let handle;
    try {
        handle = await open(filePath, "r");
        const stat = await handle.stat();
        const range = request.headers.get("range");
        const headers = new Headers({ "Content-Type": asset.mediaType, "Accept-Ranges": "bytes", "Cache-Control": "public, max-age=3600, immutable" });
        if (!range) {
            const buffer = await handle.readFile();
            headers.set("Content-Length", String(stat.size));
            return new Response(buffer, { status: 200, headers });
        }
        const match = range.match(/^bytes=(\d*)-(\d*)$/);
        if (!match) return new Response("Invalid range", { status: 416 });
        const start = match[1] ? Number(match[1]) : Math.max(0, stat.size - Number(match[2]) - 1);
        const end = match[2] ? Number(match[2]) : stat.size - 1;
        if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || start >= stat.size) return new Response("Range not satisfiable", { status: 416 });
        const boundedEnd = Math.min(end, stat.size - 1);
        const buffer = Buffer.alloc(boundedEnd - start + 1);
        await handle.read(buffer, 0, buffer.length, start);
        headers.set("Content-Length", String(buffer.length));
        headers.set("Content-Range", `bytes ${start}-${boundedEnd}/${stat.size}`);
        return new Response(buffer, { status: 206, headers });
    } catch {
        return new Response("Evidence asset not found", { status: 404 });
    } finally {
        await handle?.close();
    }
}
