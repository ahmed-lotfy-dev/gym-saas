import { alerts } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { MiniCard } from "../components/ui/MiniCard";
import { SectionHeader } from "../components/ui/SectionHeader";

const AlertsPage = ({t, pageTitle}) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MiniCard title="SMS" value="86%" note={t("alerts.channels.smsNote")} />
        <MiniCard title="WhatsApp" value="92%" note={t("alerts.channels.whatsappNote")} />
        <MiniCard title="Email" value="78%" note={t("alerts.channels.emailNote")} />
      </div>
      <div className="card space-y-4">
        <SectionHeader
          title={pageTitle("alerts")}
          description={t("alerts.description")}
          action={<button className="rounded-full bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors">{t("actions.sendAlerts")}</button>}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {alerts.map((alert) => (
            <div key={`${alert.titleKey}-alert`} className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-800/30 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t(alert.titleKey)}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t(alert.descriptionKey)}</p>
              <div className="mt-3">
                <Badge tone={alert.tone}>{t("alerts.ready")}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
export default AlertsPage;