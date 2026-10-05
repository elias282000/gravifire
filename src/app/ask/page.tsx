import { Suspense } from "react";
import AskGravifire from "@/components/ask/AskGravifire";

export default function AskPage() {
    return <Suspense fallback={<main className="min-h-screen bg-[#050811] p-10 text-slate-400">Loading ASK GRAVIFIRE…</main>}><AskGravifire /></Suspense>;
}
