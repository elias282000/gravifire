"use client";

import { useEffect, useState } from "react";

const key = "gravifire-tutorial-controls-seen";
export default function TutorialTips() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(localStorage.getItem(key) !== "1"), 0); const dismiss = (event: KeyboardEvent) => { if (!["w", "a", "s", "d", "v", "e"].includes(event.key.toLowerCase())) return; localStorage.setItem(key, "1"); setVisible(false); }; window.addEventListener("keydown", dismiss); return () => { window.clearTimeout(timer); window.removeEventListener("keydown", dismiss); }; }, []);
  if (!visible) return null;
  return <div className="pointer-events-auto absolute bottom-24 left-1/2 z-30 -translate-x-1/2 border border-cyan-200/35 bg-[#071116]/90 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-200 shadow-xl"><p className="text-cyan-200">FIRST MISSION CONTROLS</p><p className="mt-2">WASD · MOVE &nbsp; SHIFT · SPRINT &nbsp; E · INTERACT &nbsp; V · CAMERA MODE</p><button onClick={() => { localStorage.setItem(key, "1"); setVisible(false); }} className="mt-2 text-[9px] text-slate-500 underline">HIDE TUTORIALS</button></div>;
}
