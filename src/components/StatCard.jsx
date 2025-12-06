function StatCard({ label, value, desc }) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 flex flex-col justify-between">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-lg font-semibold mb-1">{value}</div>
      <div className="text-[11px] text-slate-500">{desc}</div>
    </div>
  );
}

export default StatCard;

