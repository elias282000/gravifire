import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export async function sha256File(path: string): Promise<{ sha256: string; sizeBytes: number }> {
    const buffer = await readFile(path);
    return { sha256: createHash("sha256").update(buffer).digest("hex"), sizeBytes: buffer.byteLength };
}
