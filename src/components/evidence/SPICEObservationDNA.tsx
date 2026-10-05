import Link from "next/link";
import { SPICEOperatingConditionObservation } from "@/types/spice";

export default function SPICEObservationDNA({ observation }: { observation: SPICEOperatingConditionObservation }) {
    return <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Evidence DNA</p>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>NASA PSI-107</p><p className="pl-4 text-slate-500">↓</p><p>SPICE Experimental Table</p><p className="pl-4 text-slate-500">↓</p>
            <Link href={`/experiments/spice/observations/${observation.internalObservationId}`} className="block pl-4 text-cyan-200 hover:text-cyan-100">{observation.internalObservationId} · operating-condition observation</Link>
            <div className="ml-4 mt-3 border-l border-cyan-400/20 pl-4 text-slate-400">
                <p>{observation.rawFuel}</p><p>{observation.nozzleDiameter.rawValue} nozzle</p><p>Fuel / HC / Air rate source fields</p><p>Raw GMT timing fields</p>
            </div>
            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-500"><p>Smoke point: not present in current table</p><p>Flame length: not present in current table</p><p>Raw image/video: not linked</p></div>
        </div>
    </section>;
}
