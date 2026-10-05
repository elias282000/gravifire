import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { PSIInvestigationManifest, PSISourceFile } from "../../src/types/psi-ingestion";
import { PSIDataSourceAdapter } from "./source-adapter";

const root = resolve(process.cwd());
const manifestPath = join(root, "data", "nasa", "manifests", "psi-25-bass-ii.json");
const rawDirectories = [
    join(root, "data", "nasa", "raw", "bass-ii"),
    join(root, "src", "data", "nasa", "raw", "bass-ii"),
];
const evidenceDirectories = rawDirectories.map((directory) => join(directory, "evidence"));

export class BassIIDataSourceAdapter implements PSIDataSourceAdapter {
    async getInvestigationMetadata(): Promise<PSIInvestigationManifest> {
        return JSON.parse(await readFile(manifestPath, "utf8")) as PSIInvestigationManifest;
    }

    async listSourceFiles(): Promise<PSISourceFile[]> {
        const { readdir } = await import("node:fs/promises");
        const files: PSISourceFile[] = [];
        for (const rawDirectory of rawDirectories) {
            try {
                const entries = await readdir(rawDirectory, { withFileTypes: true });
                files.push(...entries.filter((entry) => entry.isFile() && entry.name !== ".gitkeep").map((entry) => ({
                    fileName: entry.name,
                    localPath: join(rawDirectory, entry.name),
                    downloadStatus: "LOCAL_ONLY" as const,
                })));
            } catch (error) {
                if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
            }
        }
        return files;
    }

    async fetchSourceFile(file: PSISourceFile): Promise<Buffer> {
        if (!file.localPath) throw new Error(`No local path is available for ${file.fileName}`);
        return readFile(file.localPath);
    }

    async listEvidenceFiles(): Promise<PSISourceFile[]> {
        const { readdir } = await import("node:fs/promises");
        const files: PSISourceFile[] = [];
        for (const evidenceDirectory of evidenceDirectories) {
            try {
                const entries = await readdir(evidenceDirectory, { withFileTypes: true });
                files.push(...entries.filter((entry) => entry.isFile()).map((entry) => ({
                    fileName: entry.name,
                    localPath: join(evidenceDirectory, entry.name),
                    downloadStatus: "LOCAL_ONLY" as const,
                })));
            } catch (error) {
                if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
            }
        }
        return files;
    }
}
