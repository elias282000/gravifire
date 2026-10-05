export const missionPhysicalRoutes = {
  m0: ["CREW CORRIDOR", "INCIDENT BAY", "ARCHIVE TERMINAL"],
  m1: ["PREPARATION BAY", "SAFFIRE REPLAY CHAMBER", "COMPARISON ROOM"],
  m4: ["MATERIAL STORAGE", "GROUND REFERENCE BAY", "LOW-g FLIGHT RECORD BAY", "SAMPLE ANALYSIS WALL"],
  m6: ["MANIFEST CONTROL ROOM", "EVIDENCE ASSEMBLY WALL", "TRANSITION AIRLOCK", "EXPLORATION CORRIDOR", "MARS BOUNDARY DOOR"]
} as const;

export function canRevealM1Comparison(viewed: string[]): boolean {
  return viewed.includes("S1") && viewed.includes("S2");
}

export function canReachM4Decision(reviewed: string[]): boolean {
  return ["sample-2-2", "sample-2-3", "sample-2-4"].every((sample) => reviewed.includes(sample));
}

export function canReachM6Boundary(selectedManifestSlots: number, requiredSlots = 3): boolean {
  return selectedManifestSlots >= requiredSlots;
}

export function canDesignNextExperiment(refusalViewed: boolean): boolean {
  return refusalViewed;
}
