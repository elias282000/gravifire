import { describe, expect, it } from "vitest";
import { campaignMissions } from "@/data/missions";
import { m1Mission } from "@/data/missions/m1-sibal";
import { addPrediction, completeMission, createInitialCampaign, validateVerdict } from "@/lib/mission-state";
import { m1EvidenceReference, resolveM1Pair } from "@/lib/m1-evidence";
import { challengeComparison } from "@/lib/challenge-engine";

describe("M1 SIBAL source-bound mission", () => {
  const pair = resolveM1Pair();
  it("is unavailable before M0 and available after M0 completion", () => { let state = createInitialCampaign(campaignMissions); expect(state.missions.m1.status).toBe("LOCKED"); state = completeMission(state, "m0", "m1"); expect(state.missions.m1.status).toBe("AVAILABLE"); });
  it("resolves SAFFIRE-I S1 and S2 from existing runtime records", () => { expect(pair.s1.run.sourceExperimentId).toBe("S1"); expect(pair.s2.run.sourceExperimentId).toBe("S2"); expect(pair.s1.data.rawMaterialDescription).toBe("SIBAL Fabric"); expect(pair.s2.data.rawMaterialDescription).toBe("SIBAL Fabric"); expect(pair.s1.data.airflowCmS.parsedValue).toBe(20); expect(pair.s2.data.airflowCmS.parsedValue).toBe(20); expect(pair.s1.data.flowDirectionRaw).toBe("Concurrent"); expect(pair.s2.data.flowDirectionRaw).toBe("Opposed"); expect(pair.s1.data.burnTimeS.parsedValue).toBe(420); expect(pair.s2.data.burnTimeS.parsedValue).toBe(70); });
  it("preserves oxygen reporting status and raw text", () => { expect(pair.s1.data.oxygenMeasurement.status).toBe("RANGE"); expect(pair.s1.data.oxygenMeasurement.rawValue).toBe("21.5 - 21.7"); expect(pair.s2.data.oxygenMeasurement.status).toBe("APPROXIMATE"); expect(pair.s2.data.oxygenMeasurement.rawValue).toBe("~ 21.5"); });
  it("uses an exact paired verdict with both direct references", () => { const verdict = m1Mission.verdictDefinitions[0]; expect(verdict.verdict).toBe("EXACT"); expect(verdict.evidence.map((item) => item.sourceRecordId)).toEqual(["S1", "S2"]); expect(validateVerdict(verdict)).toHaveLength(0); expect(verdict.conclusion).not.toContain("extinction"); expect(verdict.conclusion).not.toContain("caused"); });
  it("keeps M1 free of SAFFIRE-II rate claims and extinction wording", () => { const text = JSON.stringify(m1Mission); expect(text).not.toContain("2.18"); expect(text).not.toContain("2.64"); expect(text).not.toContain("2.1 mm/s"); expect(text).not.toContain("2.6 mm/s"); expect(text.toLowerCase()).not.toContain("extinction time"); });
  it("compares predictions without school-style scoring", () => { let state = createInitialCampaign(campaignMissions); state = addPrediction(state, { missionId: "m1", questionId: "m1-burn-duration", selectedOption: "SHORTER", selectedAt: "2038-01-01" }); expect(state.predictions[0].selectedOption).toBe("SHORTER"); });
  it("challenge integration receives both S1 and S2 evidence", () => { const result = challengeComparison(pair.s1.run, pair.s2.run); expect(result.targetType).toBe("COMPARISON"); expect(result.evidence.map((item) => item.sourceExperimentId)).toContain("S1"); expect(result.evidence.map((item) => item.sourceExperimentId)).toContain("S2"); expect(result.limitations.some((item) => item.text.includes("causal"))).toBe(true); });
  it("keeps replay completion idempotent and unlocks M4", () => { let state = completeMission(createInitialCampaign(campaignMissions), "m0", "m1"); state = completeMission(state, "m1", "m4"); state = completeMission(state, "m1", "m4"); expect(state.missions.m1.status).toBe("COMPLETE"); expect(state.missions.m4.status).toBe("AVAILABLE"); });
  it("creates direct evidence references from the source rows", () => { expect(m1EvidenceReference(pair.s1)).toMatchObject({ investigationId: "PSI-98", sourceRecordId: "S1", evidenceRole: "DIRECT" }); expect(m1EvidenceReference(pair.s2)).toMatchObject({ investigationId: "PSI-98", sourceRecordId: "S2", evidenceRole: "DIRECT" }); });
});

