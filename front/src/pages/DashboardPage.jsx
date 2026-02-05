import { alerts, checkins, expiringMembers, revenueBars } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { MiniCard } from "../components/ui/MiniCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import { StatCard } from "../components/ui/StatCard";

const stats = [
    {
      labelKey: "dashboard.stats.totalMembers",
      value: "1,284",
      changeKey: "dashboard.stats.totalMembersChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M16 11a4 4 0 1 0-8 0" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </Icon>
      ),
    },
    {
      labelKey: "dashboard.stats.todayAttendance",
      value: "312",
      changeKey: "dashboard.stats.todayAttendanceChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M4 12h16" />
          <path d="M12 4v16" />
        </Icon>
      ),
    },
    {
      labelKey: "dashboard.stats.expiringSoon",
      value: "42",
      changeKey: "dashboard.stats.expiringSoonChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M12 7v5l3 3" />
          <path d="M5 4h14" />
          <path d="M7 4v2" />
          <path d="M17 4v2" />
          <rect x="3" y="6" width="18" height="14" rx="2" />
        </Icon>
      ),
    },
    {
      labelKey: "dashboard.stats.monthlyRevenue",
      value: "148,000 EGP",
      changeKey: "dashboard.stats.monthlyRevenueChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M14 8h6v6" />
        </Icon>
      ),
    },
    {
      labelKey: "dashboard.stats.activeTrainers",
      value: "26",
      changeKey: "dashboard.stats.activeTrainersChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M6 6h12" />
          <path d="M8 10h8" />
          <path d="M10 14h4" />
          <rect x="4" y="3" width="16" height="18" rx="3" />
        </Icon>
      ),
    },
    {
      labelKey: "dashboard.stats.ptClients",
      value: "160",
      changeKey: "dashboard.stats.ptClientsChange",
      icon: (
        <Icon className="h-4 w-4">
          <path d="M8 12h8" />
          <path d="M4 12h4" />
          <path d="M16 12h4" />
          <path d="M8 12v6" />
          <path d="M16 12v6" />
        </Icon>
      ),
    },
  ];
const DashboardPage = ({t}) => (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.labelKey}
            label={t(stat.labelKey)}
            value={stat.value}
            change={t(stat.changeKey)}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <div className="card space-y-6">
          <SectionHeader
            title={t("dashboard.branchPerformance.title")}
            description={t("dashboard.branchPerformance.description")}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <MiniCard title={t("dashboard.branchPerformance.gyms")} value="12" note={t("dashboard.branchPerformance.gymsNote")} />
            <MiniCard title={t("dashboard.branchPerformance.branches")} value="31" note={t("dashboard.branchPerformance.branchesNote")} />
            <MiniCard title={t("dashboard.branchPerformance.users")} value="94" note={t("dashboard.branchPerformance.usersNote")} />
          </div>
          <div className="rounded-3xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-900 dark:bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">{t("dashboard.branchPerformance.monthlyRevenue")}</p>
                <p className="mt-2 text-2xl font-bold">148,000 EGP</p>
              </div>
              <Badge tone="emerald">+6%</Badge>
            </div>
            <div className="mt-6 flex items-end gap-2">
              {revenueBars.map((value, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="rounded-full bg-gradient-to-t from-emerald-400/80 to-emerald-200/10 dark:from-emerald-400/60 dark:to-emerald-300/10"
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/60">{t("dashboard.branchPerformance.includesAllActiveBranches")}</p>
          </div>
        </div>

        <div className="card space-y-4">
          <SectionHeader
            title={t("dashboard.quickAlerts.title")}
            description={t("dashboard.quickAlerts.description")}
          />
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.titleKey} className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t(alert.titleKey)}</p>
                  <Badge tone={alert.tone}>{t("dashboard.quickAlerts.badge")}</Badge>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t(alert.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="card space-y-4">
          <SectionHeader
            title={t("tables.expiring")}
            description={t("tables.expiringDescription")}
            action={
              <button className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                {t("actions.export")}
              </button>
            }
          />
          <div className="space-y-3">
            {expiringMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{member.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t(member.planKey)}</p>
                </div>
                <Badge tone="amber">
                  {t("time.days", { count: member.days })}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4">
          <SectionHeader title={t("tables.checkins")} description={t("tables.checkinsDescription")} />
          <div className="space-y-3">
            {checkins.map((checkin) => (
              <div
                key={`${checkin.name}-${checkin.time}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{checkin.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{checkin.time}</p>
                </div>
                <Badge tone={checkin.statusKey === "attendance.status.blocked" ? "rose" : "emerald"}>{t(checkin.statusKey)}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
export default DashboardPage;