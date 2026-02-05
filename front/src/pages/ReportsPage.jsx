import { reports } from "../assets/assets";
import { MiniCard } from "../components/ui/MiniCard";
import { SectionHeader } from "../components/ui/SectionHeader";

const ReportsPage = ({ t }) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <div key={report.titleKey} className="card">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t(report.titleKey)}</p>
            <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">{t(report.descriptionKey)}</p>
            <button className="mt-4 w-fit rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              {t("reports.export")}
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <SectionHeader title={t("reports.summary.title")} description={t("reports.summary.description")} />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <MiniCard title={t("reports.summary.renewalRate.title")} value="86%" note={t("reports.summary.renewalRate.note")} />
          <MiniCard title={t("reports.summary.avgAttendance.title")} value="402" note={t("reports.summary.avgAttendance.note")} />
          <MiniCard title={t("reports.summary.ptSessions.title")} value="328" note={t("reports.summary.ptSessions.note")} />
        </div>
      </div>
    </div>
  );
export default ReportsPage;