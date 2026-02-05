/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/theme";
import { Icon } from "./components/ui/Icon.jsx";

import {
  DashboardPage,
  MembersPage,
  SubscriptionsPage,
  AttendancePage,
  PaymentsPage,
  AlertsPage,
  ReportsPage,
  SettingsPage,
  TrainerPage,
} from "./pages";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

const AppContent = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, lang, changeLang } = useTheme();
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [isRTL, lang, i18n]);

  const pageTitle = (id) => t(`pages.${id}.title`);
  const pageIntro = (id) => t(`pages.${id}.intro`);
  const languageSwitchLabel = lang === "ar" ? t("language.switchToEnglish") : t("language.switchToArabic");

  const navItems = [
    {
      id: "dashboard",
      label: pageTitle("dashboard"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M3 12h7V3H3v9Z" />
          <path d="M14 21h7V10h-7v11Z" />
          <path d="M14 3h7v4h-7z" />
          <path d="M3 17h7v4H3z" />
        </Icon>
      ),
      path: "/",
    },
    {
      id: "members",
      label: pageTitle("members"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M16 11a4 4 0 1 0-8 0" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          <path d="M20 8V5" />
          <path d="M22 6h-4" />
        </Icon>
      ),
      path: "/members",
    },
    {
      id: "subscriptions",
      label: pageTitle("subscriptions"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M6 8h12" />
          <path d="M6 12h12" />
          <path d="M6 16h7" />
          <rect x="3" y="4" width="18" height="16" rx="3" />
        </Icon>
      ),
      path: "/subscriptions",
    },
    {
      id: "attendance",
      label: pageTitle("attendance"),
      icon: (
        <Icon className="h-5 w-5">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M7 9h10" />
          <path d="M7 13h6" />
          <path d="M7 17h4" />
        </Icon>
      ),
      path: "/attendance",
    },
    {
      id: "payments",
      label: pageTitle("payments"),
      icon: (
        <Icon className="h-5 w-5">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
        </Icon>
      ),
      path: "/payments",
    },
    {
      id: "alerts",
      label: pageTitle("alerts"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M12 3a6 6 0 0 0-6 6v4l-2 2h16l-2-2V9a6 6 0 0 0-6-6Z" />
          <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
        </Icon>
      ),
      path: "/alerts",
    },
    {
      id: "reports",
      label: pageTitle("reports"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M4 19V5" />
          <path d="M10 19V9" />
          <path d="M16 19V13" />
          <path d="M22 19V3" />
        </Icon>
      ),
      path: "/reports",
    },
    {
      id: "settings",
      label: pageTitle("settings"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.4 15a7.7 7.7 0 0 0 .1-6l2-1.2-2-3.6-2.2 1a7.4 7.4 0 0 0-5.2-2.2L9.2 2 7 5.4l2 1.2a7.7 7.7 0 0 0 0 6L7 14l2.2 3.6 2-1.2a7.4 7.4 0 0 0 5.2 2.2l1.9 2.2 2.2-3.6-2.1-1.2Z" />
        </Icon>
      ),
      path: "/settings",
    },
    {
      id: "trainer",
      label: pageTitle("trainer"),
      icon: (
        <Icon className="h-5 w-5">
          <path d="M8 6a4 4 0 1 0 8 0" />
          <path d="M2 21c0-4 4-7 10-7" />
          <path d="M16 19l2 2 4-4" />
        </Icon>
      ),
      path: "/trainers",
    },
  ];

  // Get current route for active nav
  const location = typeof window !== "undefined" ? window.location : { pathname: "/" };
  const activeId = navItems.find((item) => item.path === location.pathname)?.id || "dashboard";
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className="pointer-events-none absolute inset-0">
          <div style={{background: 'var(--color-emerald-bg, #d1fae5)', opacity: 0.4}} className="absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl" />
          <div style={{background: 'var(--color-amber-bg, #fef3c7)', opacity: 0.3}} className="absolute right-10 top-24 h-80 w-80 rounded-full blur-3xl" />
          <div style={{background: 'var(--color-sky-bg, #e0f2fe)', opacity: 0.4}} className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
        </div>

        <div
          className={`relative mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:gap-8 ${
            isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
          >
          <Sidebar navItems={navItems} activeId={activeId} t={t}/>
          <main className="flex-1 space-y-6 pb-12">
            <Navbar t={t} changeLang={changeLang} theme={theme} languageSwitchLabel={languageSwitchLabel} toggleTheme={toggleTheme} lang={lang}/>
            <Routes>
                <Route path="/" element={<DashboardPage t={t} />} />
                <Route path="/members" element={<MembersPage t={t} />} />
                <Route path="/payments" element={<PaymentsPage t={t}/>} />
                <Route path="/reports" element={<ReportsPage t={t} />} />
                <Route path="/trainers" element={<TrainerPage t={t} />} />
                <Route path="/attendance" element={<AttendancePage pageTitle={pageTitle} t={t}/>} />
                <Route path="/settings" element={<SettingsPage t={t}/>} />
                <Route path="/subscriptions" element={<SubscriptionsPage pageTitle ={pageTitle} t={t}/>} />
                <Route path="/alerts" element={<AlertsPage t={t} pageTitle={pageTitle}/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
