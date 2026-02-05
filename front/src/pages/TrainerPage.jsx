import { sessionLog, trainerClients } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { MiniCard } from "../components/ui/MiniCard";
import { SectionHeader } from "../components/ui/SectionHeader";

const TrainerPage = ({ t }) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MiniCard title={t("trainer.summary.myClients.title")} value="14" note={t("trainer.summary.myClients.note")} />
        <MiniCard title={t("trainer.summary.remainingSessions.title")} value="38" note={t("trainer.summary.remainingSessions.note")} />
        <MiniCard title={t("trainer.summary.ptPlans.title")} value="5" note={t("trainer.summary.ptPlans.note")} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="card space-y-4">
          <SectionHeader title={t("trainer.myClients.title")} description={t("trainer.myClients.description")} />
          <div className="space-y-3">
            {trainerClients.map((client) => (
              <div key={client.name} className="flex items-center justify-between rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{client.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t(client.focusKey)}</p>
                </div>
                <Badge tone="emerald">
                  {t("trainer.sessionsCount", { count: client.sessions })}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4">
          <SectionHeader title={t("tables.sessions")} description={t("trainer.sessions.description")} />
          <div className="space-y-3">
            {sessionLog.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/30 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <span>{item.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {item.dateKey === "time.daysAgo" ? t("time.daysAgo", { count: item.dateValue }) : t(item.dateKey)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{t(item.noteKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
export default TrainerPage;