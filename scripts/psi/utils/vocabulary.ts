export type VocabularyResult = { normalized: string | null; warning?: string };

const materialMappings: Record<string, string> = { pmma: "PMMA" };
const geometryMappings: Record<string, string> = { slab: "Slab", sheet: "Sheet", rod: "Rod", cylinder: "Cylinder" };
const outcomeMappings: Record<string, string> = { ignited: "IGNITED", sustained: "SUSTAINED", extinguished: "EXTINGUISHED", "no ignition": "NO_IGNITION", partial: "PARTIAL" };

function normalize(value: unknown, mappings: Record<string, string>, label: string): VocabularyResult {
    if (typeof value !== "string" || !value.trim()) return { normalized: null };
    const normalized = mappings[value.trim().toLowerCase()];
    return normalized ? { normalized } : { normalized: null, warning: `${label} value requires review: ${value}` };
}

export const normalizeMaterial = (value: unknown) => normalize(value, materialMappings, "Material");
export const normalizeGeometry = (value: unknown) => normalize(value, geometryMappings, "Geometry");
export const normalizeOutcome = (value: unknown) => normalize(value, outcomeMappings, "Outcome");
