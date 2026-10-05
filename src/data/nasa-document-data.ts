import { NASADocumentChunk, NASADocumentPage, NASAScientificDocument, ScientificClaim, DocumentExperimentLink, DocumentIngestionReport } from "@/types/documents";
import documents from "../../data/nasa/normalized/bass-ii/documents.json";
import pages from "../../data/nasa/normalized/bass-ii/pages.json";
import chunks from "../../data/nasa/normalized/bass-ii/chunks.json";
import claims from "../../data/nasa/normalized/bass-ii/claims.json";
import documentLinks from "../../data/nasa/normalized/bass-ii/document-links.json";
import report from "../../data/nasa/normalized/bass-ii/document-ingestion-report.json";

export const nasaScientificDocuments = documents as NASAScientificDocument[];
export const nasaDocumentPages = pages as NASADocumentPage[];
export const nasaDocumentChunks = chunks as NASADocumentChunk[];
export const nasaScientificClaims = claims as ScientificClaim[];
export const nasaDocumentLinks = documentLinks as DocumentExperimentLink[];
export const nasaDocumentIngestionReport = report as DocumentIngestionReport;
