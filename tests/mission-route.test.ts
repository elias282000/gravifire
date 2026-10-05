import { describe, expect, it } from "vitest";
import { canDesignNextExperiment, canReachM4Decision, canReachM6Boundary, canRevealM1Comparison, missionPhysicalRoutes } from "@/lib/mission-route";

describe("Mission physical routes", () => {
  it("keeps distinct routes for each campaign chapter", () => {
    expect(missionPhysicalRoutes.m0).toEqual(["CREW CORRIDOR", "INCIDENT BAY", "ARCHIVE TERMINAL"]);
    expect(missionPhysicalRoutes.m1).toContain("COMPARISON ROOM");
    expect(missionPhysicalRoutes.m4).toContain("LOW-g FLIGHT RECORD BAY");
    expect(missionPhysicalRoutes.m6).toContain("MARS BOUNDARY DOOR");
  });
  it("requires both M1 source replays before comparison", () => {
    expect(canRevealM1Comparison(["S1"])).toBe(false);
    expect(canRevealM1Comparison(["S1", "S2"])).toBe(true);
  });
  it("requires the three supporting M4 sample reviews", () => {
    expect(canReachM4Decision(["sample-2-2", "sample-2-3"])).toBe(false);
    expect(canReachM4Decision(["sample-2-2", "sample-2-3", "sample-2-4"])).toBe(true);
  });
  it("gates the M6 boundary behind all manifest slots and refusal", () => {
    expect(canReachM6Boundary(2)).toBe(false);
    expect(canReachM6Boundary(3)).toBe(true);
    expect(canDesignNextExperiment(false)).toBe(false);
    expect(canDesignNextExperiment(true)).toBe(true);
  });
});
