export const Badge = ({ tone = "slate", children }) => {
  const styles = {
    slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-700",
    emerald: "badge-emerald border",
    amber: "badge-amber border",
    rose: "badge-rose border",
    sky: "badge-sky border",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[tone] || styles.slate
      }`}
    >
      {children}
    </span>
  );
};

