"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { grayboxMission } from "@/data/missions/graybox";
import { campaignMissions } from "@/data/missions";
import { CAMPAIGN_STORAGE_KEY, GRAYBOX_STORAGE_KEY, activateTest, beginMission, initialMissionProgress, markConsoleReached, parseCampaign, parseCampaignState, serializeCampaign, setAirflow, toggleDirection, viewVerdict } from "@/lib/mission-state";
import type { MissionProgress } from "@/features/mission-control/types";
import MissionHUD from "@/components/mission-control/MissionHUD";
import MissionScene from "@/components/mission-control/MissionScene";
import VerdictCard from "@/components/mission-control/VerdictCard";
import M0MissionGame from "@/components/mission-control/M0MissionGame";
import M1MissionGame from "@/components/mission-control/M1MissionGame";
import M4MissionGame from "@/components/mission-control/M4MissionGame";
import M6MissionGame from "@/components/mission-control/M6MissionGame";

export default function MissionGame({ missionId }: { missionId: string }) {
  const router = useRouter();
  const [progress, setProgress] = useState<MissionProgress>(() => initialMissionProgress(missionId));
  const [target, setTarget] = useState<string | null>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 1.2, 4.5]);
  const [details, setDetails] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState("LOCKED");
  useEffect(() => { const timer = window.setTimeout(() => { const saved = parseCampaign(localStorage.getItem(GRAYBOX_STORAGE_KEY), missionId); setProgress(saved.status === "AVAILABLE" ? beginMission(saved) : saved); }, 0); return () => window.clearTimeout(timer); }, [missionId]);
  useEffect(() => { const timer = window.setTimeout(() => { const saved = parseCampaignState(localStorage.getItem(CAMPAIGN_STORAGE_KEY), campaignMissions); setCampaignStatus(saved.missions[missionId]?.status ?? "LOCKED"); }, 0); return () => window.clearTimeout(timer); }, [missionId]);
  const update = useCallback((next: MissionProgress) => { setProgress(next); localStorage.setItem(GRAYBOX_STORAGE_KEY, serializeCampaign(next)); }, []);
  const airflow = () => update(setAirflow(progress, progress.configuration.airflow >= 60 ? 20 : progress.configuration.airflow + 20));
  const direction = () => update(toggleDirection(progress));
  const run = () => { if (progress.currentBeat === "CONFIGURE") update(activateTest(progress)); };
  const reached = () => { if (progress.currentBeat === "REACH_CONSOLE") update(markConsoleReached(progress)); };
  if (missionId === "m0") return <M0MissionGame />;
  if (missionId === "m1") return <M1MissionGame />;
  if (missionId === "m4") return <M4MissionGame />;
  if (missionId === "m6") return <M6MissionGame />;
  if (missionId !== "graybox") return <div className="flex min-h-screen items-center justify-center bg-[#050811] p-6 text-center text-slate-300"><div><p className="text-xs uppercase tracking-[0.2em] text-amber-300">{campaignStatus === "LOCKED" ? "MISSION LOCKED" : "MISSION SHELL"}</p><h1 className="mt-3 max-w-xl text-2xl text-white">{campaignMissions.find((mission) => mission.id === missionId)?.title ?? "Mission not found"}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{campaignStatus === "LOCKED" ? "Complete the previous campaign mission before entering this deck." : "This mission is story-ready, but its scientific payload is EVIDENCE PENDING. It will become playable after evidence binding."}</p><button className="mt-6 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950" onClick={() => router.push("/mission-control")}>Return to Queue</button></div></div>;
  return <main className="relative h-screen overflow-hidden bg-[#050811]"><MissionScene progress={progress} onAirflow={airflow} onDirection={direction} onRun={run} onConsoleReached={reached} onTarget={setTarget} onPlayerPosition={setPosition} /><MissionHUD progress={progress} target={target} airflow={progress.configuration.airflow} position={position} onExit={() => router.push("/mission-control")} />{progress.currentBeat === "REVIEW_VERDICT" && <VerdictCard verdict={grayboxMission.verdict!} progress={progress} onDetails={() => setDetails(true)} onReturn={() => { update(viewVerdict(progress)); router.push("/mission-control"); }} />}{details && <div className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center bg-black/70 p-5"><div className="w-full max-w-md rounded-xl border border-white/10 bg-[#08111e] p-5"><p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Graybox test settings</p><div className="mt-4 space-y-3 text-sm text-slate-300"><p>Airflow · {progress.configuration.airflow} cm/s</p><p>Direction · {progress.configuration.direction}</p><p>Oxygen · {progress.configuration.oxygen}%</p></div><button onClick={() => setDetails(false)} className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300">Close</button></div></div>}</main>;
}
