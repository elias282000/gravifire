import { NASADocumentChunk } from "@/types/documents";

export type DocumentSearchResult = { chunk: NASADocumentChunk; score: number; citation: string };

export function searchDocumentChunks(chunks: NASADocumentChunk[], query: string): DocumentSearchResult[] {
    const normalizedQuery = query.toLowerCase().trim();
    const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 2 && !["what", "does", "say", "about", "the", "and"].includes(term));
    if (terms.length === 0) return [];
    return chunks.map((chunk) => {
        const text = chunk.text.toLowerCase();
        const section = chunk.sectionTitle?.toLowerCase() ?? "";
        const phraseBoost = normalizedQuery.length > 3 && text.includes(normalizedQuery) ? 12 : 0;
        const sectionBoost = terms.reduce((total, term) => total + (section.includes(term) ? 4 : 0), 0);
        const score = terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), phraseBoost + sectionBoost);
        return { chunk, score, citation: chunk.citation };
    }).filter((result) => result.score > 0).sort((left, right) => right.score - left.score || left.chunk.pageStart - right.chunk.pageStart).slice(0, 20);
}
