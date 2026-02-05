import React from 'react'
import { Badge } from './ui/Badge';

const Navbar = ({t,changeLang,theme,toggleTheme,lang,languageSwitchLabel}) => {
  const toggleLanguage = () => {
    changeLang(lang === "ar" ? "en" : "ar");
  };
  return (
    <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone="emerald">{t("labels.saasBadge")}</Badge>
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {t("labels.gym")}: PowerFit Downtown
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t("labels.branch")}: Nasr City
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <input
                        className="w-56 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm focus:border-emerald-400 dark:focus:border-emerald-500 focus:outline-none"
                        placeholder={t("common.searchPlaceholder")}
                      />
                    </div>
                    <button
                      className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      onClick={toggleLanguage}
                    >
                      {languageSwitchLabel}
                    </button>
                    <button
                      className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? "وضع نهاري" : "وضع ليلي"}
                    </button>
                  </div>
                </div>
  )
}

export default Navbar