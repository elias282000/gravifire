export type ParsedNumericValue = { value: number; rawValue: string | number; rawUnit?: string };

export const UNIT_ALIASES: Record<string, string> = {
    "%": "%",
    percent: "%",
    "cm/s": "cm/s",
    "cm/sec": "cm/s",
    "m/s": "m/s",
    pa: "Pa",
    kpa: "kPa",
    mm: "mm",
    cm: "cm",
};

export function parseNumericValue(input: unknown): ParsedNumericValue | undefined {
    if (typeof input === "number" && Number.isFinite(input)) return { value: input, rawValue: input };
    if (typeof input !== "string") return undefined;
    const trimmed = input.trim();
    if (!trimmed) return undefined;
    const match = trimmed.match(/^([-+]?\d+(?:\.\d+)?)(?:\s*([%a-zA-Z/]+))?$/);
    if (!match) return undefined;
    const value = Number(match[1]);
    const rawUnit = match[2] ? UNIT_ALIASES[match[2].toLowerCase()] : undefined;
    return Number.isFinite(value) ? { value, rawValue: input, rawUnit } : undefined;
}

export function normalizeUnit(value: number, fromUnit: string | undefined, toUnit: string): { value: number; rule: string } | { error: string } {
    if (!fromUnit) return { error: "UNKNOWN_UNIT" };
    if (fromUnit === toUnit) return { value, rule: `${fromUnit} → ${toUnit} (identity)` };
    if (fromUnit === "m/s" && toUnit === "cm/s") return { value: value * 100, rule: "m/s → cm/s × 100" };
    if (fromUnit === "Pa" && toUnit === "kPa") return { value: value / 1000, rule: "Pa → kPa ÷ 1000" };
    if (fromUnit === "cm" && toUnit === "mm") return { value: value * 10, rule: "cm → mm × 10" };
    return { error: `Unsupported unit conversion: ${fromUnit} → ${toUnit}` };
}
