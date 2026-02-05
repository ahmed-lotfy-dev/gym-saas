export const SectionHeader = ({ title, description, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
    {action}
  </div>
);

