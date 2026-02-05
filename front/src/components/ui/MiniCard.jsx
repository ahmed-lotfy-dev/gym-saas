export const MiniCard = ({ title, value, note }) => (
  <div className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4">
    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
    <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{note}</p>
  </div>
);

