import { subscriptionPlans } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { SectionHeader } from "../components/ui/SectionHeader";

const SubscriptionsPage = ({t,pageTitle}) => (
    <div className="space-y-6">
      <SectionHeader
        title={pageTitle("subscriptions")}
        description={t("subscriptions.description")}
        action={<button className="rounded-full bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors">{t("actions.addPlan")}</button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <div key={plan.titleKey} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t(plan.titleKey)}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{plan.price}</p>
              </div>
              <Badge tone="emerald">{t(plan.durationKey)}</Badge>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {plan.perksKeys.map((perkKey) => (
                <p key={perkKey} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                  {t(perkKey)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
export default SubscriptionsPage;