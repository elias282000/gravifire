import Link from "next/link";

export function MissionNav() {
  return <nav className="flex items-center justify-between border-b border-white/10 bg-[#050811]/90 px-5 py-3 text-xs backdrop-blur"><Link href="/" className="font-semibold tracking-[0.22em] text-cyan-200">GRAVIFIRE</Link><div className="flex items-center gap-4 text-slate-400"><Link href="/experiments" className="hidden hover:text-white sm:block">EVIDENCE EXPLORER</Link><Link href="/mission-control" className="font-semibold tracking-[0.14em] text-cyan-300">MISSION CONTROL</Link></div></nav>;
}

