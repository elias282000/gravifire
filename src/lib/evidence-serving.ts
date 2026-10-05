import { resolve, relative, isAbsolute } from "node:path";

export function resolveSafeEvidencePath(root: string, localPath: string): string | null {
    if (isAbsolute(localPath)) return null;
    const rootPath = resolve(root);
    const candidate = resolve(rootPath, localPath);
    const relativePath = relative(rootPath, candidate);
    if (relativePath.startsWith("..") || isAbsolute(relativePath)) return null;
    return candidate;
}
