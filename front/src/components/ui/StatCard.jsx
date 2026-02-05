import { Badge } from "./Badge.jsx";

export const StatCard = ({ label, value, change, icon }) => (
  <div className="card flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <span className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-2 text-emerald-600 dark:text-emerald-400">{icon}</span>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <Badge tone="emerald">{change}</Badge>
    </div>
  </div>
);

