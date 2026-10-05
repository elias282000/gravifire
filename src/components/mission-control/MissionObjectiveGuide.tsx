"use client";

import type { MissionProgress } from "@/features/mission-control/types";

type Guide = { title: string; location: string; action: string; progress?: string; steps: string[] };
function getGuide(missionId: string, beat: string): Guide {
  if (missionId === "m0") {
    if (beat === "INCIDENT_RESPONSE") return { title: "INSPECT INCIDENT SYSTEMS", location: "INCIDENT BAY", action: "Aim at each station and press E", progress: "0 / 3 SYSTEMS", steps: ["Heater panel", "Garment", "Ventilation outlet"] };
    if (beat === "ARCHIVE_UNLOCK") return { title: "REPORT TO ARCHIVE TERMINAL", location: "MISSION CONTROL / ARCHIVE", action: "Reach the highlighted terminal", steps: ["Containment recorded", "Archive access available"] };
    return { title: "RESPOND TO DECK-B ALERT", location: "CREW-QUARTER ACCESS", action: "Follow the illuminated corridor", steps: ["Reach incident bay"] };
  }
  if (missionId === "m1") {
    const guides: Record<string, Guide> = { INSERTION: { title: "INSPECT SIBAL TEST ARTICLE", location: "PREPARATION BAY", action: "Approach the sample and press E", steps: ["Identify sample"] }, PREDICT: { title: "RECORD YOUR EXPECTATION", location: "PREPARATION BAY TERMINAL", action: "Select one prediction", steps: ["Identify sample", "Record prediction"] }, SOURCE_CONFIGURATION: { title: `REPLAY ${beat === "SOURCE_CONFIGURATION" ? "THE NEXT SAFFIRE-I CONDITION" : "SOURCE"}`, location: "SAFFIRE REPLAY CHAMBER", action: "Set the required flow station, then start replay", steps: ["Replay S1 Concurrent", "Replay S2 Opposed"] }, RUN: { title: "WATCH THE SOURCE REPLAY", location: "SAFFIRE REPLAY CHAMBER", action: "Remain near the active evidence monitor", steps: ["Compressed playback"] }, COMPARE: { title: "ENTER THE ANALYSIS ROOM", location: "COMPARISON ROOM", action: "Approach the 420 s / 70 s display", steps: ["S1 viewed", "S2 viewed", "Compare evidence"] } };
    return guides[beat] ?? { title: "REVIEW THE EVIDENCE DECISION", location: "ANALYSIS ROOM", action: "Use the highlighted terminal", steps: ["Submit decision"] };
  }
  if (missionId === "m4") {
    const guides: Record<string, Guide> = { INSERTION: { title: "LOCATE SAMPLE 2-1", location: "MATERIAL STORAGE", action: "Find SILICONE 2-1 and press E", steps: ["Locate sample"] }, PREDICT: { title: "RECORD YOUR EXPECTATION", location: "MATERIAL INSPECTION", action: "Select one prediction", steps: ["Locate sample", "Record prediction"] }, EARTH_REFERENCE: { title: "REVIEW 1-g REFERENCE", location: "GROUND REFERENCE BAY", action: "Start the source reference", steps: ["Ground reference"] }, RUN: { title: "REVIEW LOW-g FLIGHT RECORD", location: "LOW-g FLIGHT RECORD BAY", action: "Start sample 2-1 replay", steps: ["Ground reference", "Flight record"] }, COMPARE: { title: "INSPECT ALL FOUR SILICONE RECORDS", location: "SAMPLE ANALYSIS WALL", action: "Review 2-2, 2-3, and 2-4", progress: "0 / 4 RECORDS", steps: ["2-1", "2-2", "2-3", "2-4"] } };
    return guides[beat] ?? { title: "SUBMIT MATERIAL-EVIDENCE DECISION", location: "MATERIAL REVIEW TERMINAL", action: "Choose how Aegis records the result", steps: ["Submit decision"] };
  }
  if (missionId === "m6") {
    const guides: Record<string, Guide> = { INSERTION: { title: "ASSEMBLE MANIFEST", location: "MANIFEST CONTROL ROOM", action: "Begin at the first manifest station", progress: "0 / 3 SLOTS COMPLETE", steps: ["Liner", "Housings / panels", "Seals"] }, CONFIGURE: { title: "ASSEMBLE MANIFEST", location: "MANIFEST CONTROL ROOM", action: "Visit each material station", progress: "SELECT EACH SLOT", steps: ["Liner", "Housings / panels", "Seals"] }, COMPARE: { title: "REVIEW EVIDENCE ASSEMBLY", location: "EVIDENCE ASSEMBLY WALL", action: "Approach the activated wall", steps: ["Evidence counts", "Named gaps"] }, REACH_CONSOLE: { title: "FOLLOW CORRIDOR TO MARS HABITAT BOUNDARY", location: "EXPLORATION CORRIDOR", action: "Walk to the sealed boundary door", steps: ["Airlock", "Exploration corridor", "Boundary door"] }, VERDICT: { title: "DESIGN THE NEXT EXPERIMENT", location: "RESEARCH MEMO TERMINAL", action: "Review the evidence boundary first", progress: "0 / 3 CANDIDATES", steps: ["Name the gap", "Design experiments"] } };
    return guides[beat] ?? { title: "SEND RESEARCH MEMO", location: "MISSION CONTROL UPLINK", action: "Select three candidates and submit", steps: ["Research memo"] };
  }
  return { title: "ENTER THE TEST DECK", location: "MISSION CONTROL", action: "Follow the highlighted station", steps: ["Configure", "Run", "Review"] };
}

export default function MissionObjectiveGuide({ missionId, progress, target }: { missionId: string; progress: MissionProgress; target: string | null }) {
  const guide = getGuide(missionId, progress.currentBeat);
  return <div className="pointer-events-none absolute left-6 top-32 z-20 w-64 border-l border-cyan-200/45 bg-[#050a0d]/45 px-3 py-2 font-mono backdrop-blur-[2px]"><div className="flex items-center justify-between"><p className="text-[9px] uppercase tracking-[0.22em] text-cyan-200">PRIMARY OBJECTIVE</p>{guide.progress && <p className="text-[9px] text-amber-200">{guide.progress}</p>}</div><p className="mt-2 text-sm tracking-wide text-white">{guide.title}</p><p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-slate-500">LOCATION · <span className="text-slate-300">{guide.location}</span></p><p className="mt-1 text-[10px] text-slate-400">ACTION · {target ? `E · ${target}` : guide.action}</p><div className="mt-3 space-y-1 border-t border-white/10 pt-2">{guide.steps.map((step, index) => <p key={step} className={`text-[9px] uppercase tracking-[0.1em] ${index === 0 ? "text-cyan-100" : "text-slate-600"}`}>{index === 0 ? "●" : "○"} {step}</p>)}</div></div>;
}
