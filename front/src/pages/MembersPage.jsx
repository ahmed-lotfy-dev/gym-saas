import { membersList } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { SectionHeader } from "../components/ui/SectionHeader";

const MembersPage = ({t}) => (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge tone="emerald">{t("members.filters.active")}</Badge>
          <Badge tone="slate">{t("members.filters.all")}</Badge>
          <Badge tone="amber">{t("members.filters.expiring")}</Badge>
          <Badge tone="rose">{t("members.filters.expired")}</Badge>
        </div>
        <button className="rounded-full bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors">{t("actions.newMember")}</button>
      </div>

      <div className="card space-y-4">
        <SectionHeader title={t("tables.members")} description={t("members.description")} />
        <div className="overflow-auto rounded-2xl border border-slate-200/70 dark:border-slate-700/70">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 text-start">{t("members.table.member")}</th>
                <th className="px-4 py-3 text-start">{t("members.table.plan")}</th>
                <th className="px-4 py-3 text-start">{t("members.table.status")}</th>
                <th className="px-4 py-3 text-start">{t("members.table.lastVisit")}</th>
              </tr>
            </thead>
            <tbody>
              {membersList.map((member) => (
                <tr key={member.name} className="border-t border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{member.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{t(member.planKey)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={member.statusKey === "members.status.expired" ? "rose" : "emerald"}>{t(member.statusKey)}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    {member.lastVisitKey === "time.daysAgo"
                      ? t("time.daysAgo", { count: member.lastVisitValue })
                      : t(member.lastVisitKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
export default MembersPage;