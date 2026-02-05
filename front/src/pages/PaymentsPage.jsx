import { invoices } from "../assets/assets";
import { Badge } from "../components/ui/Badge";
import { MiniCard } from "../components/ui/MiniCard";
import { SectionHeader } from "../components/ui/SectionHeader";

const PaymentsPage = ({ t }) => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MiniCard title={t("payments.summary.todayPayments.title")} value="18,400 EGP" note={t("payments.summary.todayPayments.note")} />
        <MiniCard title={t("payments.summary.pendingInvoices.title")} value="14" note={t("payments.summary.pendingInvoices.note")} />
        <MiniCard title={t("payments.summary.averageTicket.title")} value="620 EGP" note={t("payments.summary.averageTicket.note")} />
      </div>

      <div className="card space-y-4">
        <SectionHeader title={t("tables.invoices")} description={t("payments.description")} />
        <div className="overflow-auto rounded-2xl border border-slate-200/70 dark:border-slate-700/70">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 text-start">{t("payments.table.id")}</th>
                <th className="px-4 py-3 text-start">{t("payments.table.member")}</th>
                <th className="px-4 py-3 text-start">{t("payments.table.amount")}</th>
                <th className="px-4 py-3 text-start">{t("payments.table.method")}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{invoice.id}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{invoice.member}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <Badge tone="slate">{t(invoice.methodKey)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
export default PaymentsPage;