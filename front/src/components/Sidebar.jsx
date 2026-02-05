import React from 'react'
import { Badge } from './ui/Badge'
import { Icon } from './ui/Icon'
import { NavLink } from 'react-router-dom'

const Sidebar = ({t,activeId,navItems}) => {
  return (
    <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-6 lg:w-72 lg:self-start">
            <div className="card space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 dark:bg-emerald-600 text-white">
                  <Icon className="h-6 w-6">
                    <path d="M4 14l4-4 4 4 8-8" />
                    <path d="M4 20h16" />
                  </Icon>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{t("app.name")}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("app.tagline")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="emerald">{t("labels.saasBadge")}</Badge>
                <Badge tone="slate">{t("labels.multiBranch")}</Badge>
                <Badge tone="slate">{t("labels.multiUser")}</Badge>
              </div>
            </div>

            <div className="card space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t("labels.navigation")}</p>
              <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={`nav-item ${activeId === item.id ? "nav-item-active" : ""}`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="card space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t("plan.activeTitle")}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{t("plan.monthlyTitle")}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("plan.supportsBranches", { count: 5 })}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">1,200 EGP</p>
                <button className="rounded-full border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                  {t("plan.manage")}
                </button>
              </div>
            </div>
          </aside>
  )
}

export default Sidebar