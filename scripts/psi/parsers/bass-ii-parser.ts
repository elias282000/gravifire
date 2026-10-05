export const BASS_II_HEADERS = [
    "PI",
    "Test #",
    "Date",
    "GMT",
    "Sample #",
    "Fuel Sample Material",
    "Flow restrictor",
    "Fan display",
    "Air display",
    "Radiometer gain (1000 250 50 10)",
    "Total Frames Shot",
    "Calibrated initial O2 % by vol",
    "Calibrated final O2 % by vol",
    "Initial CO2 % by vol",
    "Final CO2 % by vol",
    "Initial CO (ppm)",
    "Final CO (ppm)",
] as const;

export type ParsedSourceRecord = { values: Record<string, string>; rawRecord: Record<string, string>; sourceRow: number };

function normalizeHeader(header: string): string {
    return header.replace(/^\uFEFF/, "").trim().replace(/\s+/g, " ");
}

function splitCsvLine(line: string): string[] {
    const cells: string[] = [];
    let cell = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        if (character === '"' && line[index + 1] === '"') { cell += '"'; index += 1; continue; }
        if (character === '"') { quoted = !quoted; continue; }
        if (character === "," && !quoted) { cells.push(cell.trim()); cell = ""; continue; }
        cell += character;
    }
    cells.push(cell.trim());
    return cells;
}

export function parseBassIIExperimentalTable(content: string): ParsedSourceRecord[] {
    const lines = content.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
    if (lines.length === 0) return [];
    const sourceHeaders = splitCsvLine(lines[0]).map(normalizeHeader);
    const missingHeaders = BASS_II_HEADERS.filter((header) => !sourceHeaders.includes(header));
    if (missingHeaders.length > 0) throw new Error(`BASS-II Experimental Table schema mismatch; missing headers: ${missingHeaders.join(", ")}`);
    return lines.slice(1).map((line, index) => {
        const cells = splitCsvLine(line);
        const values = Object.fromEntries(BASS_II_HEADERS.map((header) => [header, cells[sourceHeaders.indexOf(header)] ?? ""]));
        const rawRecord = Object.fromEntries(sourceHeaders.map((header, headerIndex) => [header, cells[headerIndex] ?? ""]));
        return { values, rawRecord, sourceRow: index + 2 };
    });
}

export function parseBassIIFile(content: string, fileName: string): ParsedSourceRecord[] {
    if (fileName.toLowerCase().endsWith(".csv")) return parseBassIIExperimentalTable(content);
    throw new Error(`Unsupported BASS-II source format: ${fileName}`);
}
