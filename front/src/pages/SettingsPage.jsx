import { permissions } from "../assets/assets";
import { SectionHeader } from "../components/ui/SectionHeader";

 const SettingsPage = ({ t }) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-2">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("settings.gymProfile.title")}</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">PowerFit Downtown</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("settings.gymProfile.subtitle")}</p>
        </div>
        <div className="card space-y-2">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("settings.barcode.title")}</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">QR + Code128</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("settings.barcode.subtitle")}</p>
        </div>
      </div>

      <div className="card space-y-4">
        <SectionHeader
          title={t("tables.permissions")}
          description={t("settings.permissionsDescription")}
          action={<button className="rounded-full bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors">{t("actions.updateSettings")}</button>}
        />
        <div className="overflow-auto rounded-2xl border border-slate-200/70 dark:border-slate-700/70">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 text-start">{t("permissions.table.action")}</th>
                <th className="px-4 py-3 text-start">{t("permissions.table.gymAdmin")}</th>
                <th className="px-4 py-3 text-start">{t("permissions.table.staff")}</th>
                <th className="px-4 py-3 text-start">{t("permissions.table.trainer")}</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.actionKey} className="border-t border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{t(permission.actionKey)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{permission.admin ? "?" : "�"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{permission.staff ? "?" : "�"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{permission.trainer ? "?" : "�"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
export default SettingsPage;