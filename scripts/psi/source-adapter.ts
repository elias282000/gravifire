import { PSIInvestigationManifest, PSISourceFile } from "../../src/types/psi-ingestion";

export interface PSIDataSourceAdapter {
    getInvestigationMetadata(): Promise<PSIInvestigationManifest>;
    listSourceFiles(): Promise<PSISourceFile[]>;
    listEvidenceFiles(): Promise<PSISourceFile[]>;
    fetchSourceFile(file: PSISourceFile): Promise<Buffer>;
}
