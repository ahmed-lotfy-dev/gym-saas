import { checkins } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { SectionHeader } from "../components/ui/SectionHeader";

const AttendancePage = ({t,pageTitle}) => (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="card space-y-4">
          <SectionHeader
            title={pageTitle("attendance")}
            description={t("attendance.description")}
            action={<button className="rounded-full bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors">{t("actions.startScan")}</button>}
          />
          <div className="relative flex h-56 items-center justify-center rounded-3xl border border-dashed border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
            <div className="absolute inset-x-8 top-10 h-1 rounded-full bg-emerald-300/60 dark:bg-emerald-400/40 motion-safe:animate-pulse" />
            <div className="text-center">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t("attendance.readyToScan")}</p>
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">{t("attendance.scanSource")}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-800/30 p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t("attendance.memberInfo")}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-200 dark:bg-emerald-900/30" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">ياسين طارق</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t("attendance.remainingDays", { count: 12 })}</p>
              </div>
              <Badge tone="emerald">{t("members.status.active")}</Badge>
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <SectionHeader title={t("attendance.entryRules.title")} description={t("attendance.entryRules.description")} />
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
              {t("attendance.entryRules.blockExpired")}
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
              {t("attendance.entryRules.preventDuplicate")}
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
              {t("attendance.entryRules.autoCheckout")}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-800/30 p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t("attendance.todayLog")}</p>
            <div className="mt-3 space-y-3">
              {checkins.map((checkin) => (
                <div key={`${checkin.name}-attendance`} className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{checkin.name}</span>
                  <span>{checkin.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default AttendancePage;