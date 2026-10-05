import { ExperimentDataStatus } from "@/types/experiment";

type BadgeStatus = ExperimentDataStatus | "USER_MODIFIED" | "NOT_EVALUATED" | "SOURCE_LINKED" | "MODEL_NOT_CONNECTED";

const styles: Record<BadgeStatus, string> = {
    REAL_NASA_DATA: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
    DEMO: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
    DERIVED: "border-violet-400/25 bg-violet-400/[0.08] text-violet-300",
    UNKNOWN: "border-white/10 bg-white/[0.04] text-slate-400",
    USER_MODIFIED: "border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-300",
    NOT_EVALUATED: "border-slate-400/20 bg-slate-400/[0.08] text-slate-300",
    SOURCE_LINKED: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
    MODEL_NOT_CONNECTED: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
};

const labels: Record<BadgeStatus, string> = {
    REAL_NASA_DATA: "REAL NASA DATA",
    DEMO: "DEMO",
    DERIVED: "DERIVED",
    UNKNOWN: "UNKNOWN",
    USER_MODIFIED: "USER MODIFIED",
    NOT_EVALUATED: "NOT EVALUATED",
    SOURCE_LINKED: "SOURCE LINKED",
    MODEL_NOT_CONNECTED: "MODEL NOT CONNECTED",
};

export default function DataStatusBadge({ status }: { status: BadgeStatus }) {
    return (
        <span className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}
