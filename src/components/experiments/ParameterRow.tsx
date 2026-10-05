export default function ParameterRow({ label, value, changed = false }: { label: string; value: string; changed?: boolean }) {
    return (
        <div className={`flex items-start justify-between gap-4 border-b border-white/5 py-3 last:border-0 ${changed ? "text-cyan-200" : ""}`}>
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-right text-sm text-slate-200">{value || "Not recorded"}</span>
        </div>
    );
}
