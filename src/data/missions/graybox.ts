import type { MissionDefinition } from "@/features/mission-control/types";

export const grayboxMission: MissionDefinition = {
  id: "graybox", sequence: -1, act: "DEVELOPER TOOLS", scientificScope: "No scientific scope; systems validation only.", scientificPayloadState: "SYSTEM_READY", evidenceReadiness: "SYSTEM READY", storyContext: {}, beats: [], verdictDefinitions: [], evidenceReferences: [], completionRules: ["Complete the systems test"],
  title: "GRAYBOX SYSTEM TEST",
  subtitle: "Reusable mission scene validation deck",
  status: "AVAILABLE",
  objective: "Reach the chamber control console.",
  interactions: [
    { id: "airflow", label: "AIRFLOW", interactionType: "CONTROL", interactionDistance: 3 },
    { id: "direction", label: "FLOW DIRECTION", interactionType: "CONTROL", interactionDistance: 3 },
    { id: "run", label: "IGNITION / RUN", interactionType: "CONTROL", interactionDistance: 3 },
    { id: "exit", label: "RETURN TO QUEUE", interactionType: "EXIT", interactionDistance: 3 },
  ],
  verdict: {
    verdict: "SYSTEM_TEST", conclusion: "Mission Control interaction loop verified; scientific rendering is disabled for the graybox.",
    evidence: [],
    message: "Mission Control interaction loop verified. Scientific rendering is disabled for the graybox.",
    systemTest: true,
  },
};
