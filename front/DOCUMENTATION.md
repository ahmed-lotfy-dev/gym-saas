# Frontend Documentation - Multi-gym SaaS Dashboard

## Overview
This frontend is a Tailwind CSS–based admin console for a multi-gym, multi-branch SaaS. The UI highlights core system modules, roles, and workflows (members, subscriptions, attendance, payments, reports, and trainer management) in a responsive, web-based layout.

## What Was Built
1. Responsive admin layout with sidebar navigation, top bar, and content area.
2. Bilingual toggle (Arabic/English) with RTL/LTR direction switching.
3. Page mockups for all core modules: Dashboard, Members, Subscriptions, Attendance, Payments, Alerts, Reports, Settings, Trainer.
4. Dashboard analytics: KPI cards, branch overview, alerts, expiring subscriptions, and revenue chart.
5. Permissions matrix and trainer workflow preview.
6. SaaS plan panel for monthly subscription positioning.

## Page Map
1. Dashboard: KPIs, branch performance, alerts, expiring subscriptions, attendance log.
2. Members: member table with status badges and filters.
3. Subscriptions: plan cards (daily, weekly, monthly, quarterly, yearly, special offers).
4. Attendance: barcode scanning panel, member preview, entry rules, today log.
5. Payments: invoice table and payment summaries.
6. Alerts: notification channels and alert cards.
7. Reports: exportable report cards and KPI summary.
8. Settings: gym profile, barcode settings, permissions matrix.
9. Trainer: clients list, session log, PT metrics.

## Tailwind CSS Setup
1. Tailwind configured via `tailwind.config.js` and `postcss.config.js`.
2. `src/App.css` includes Tailwind directives and light theme tokens.
3. Reusable UI patterns are handled with Tailwind utility classes plus small component classes (`card`, `chip`, `nav-item`).

## Language & Direction
1. Default language is Arabic.
2. Toggle button in the top bar switches to English.
3. `document.documentElement` is updated to set `lang` and `dir` for RTL/LTR support.

## i18n (Translations)
1. i18n is powered by `i18next` + `react-i18next` (configured in `front/i18n.js`).
2. Translations are loaded from the `public` folder (HTTP backend) at:
   - `front/public/locales/ar/transilation.json`
   - `front/public/locales/en/transilation.json`
3. Changing language updates both text and direction (RTL/LTR).

## Files Updated
1. `front/src/App.jsx`
2. `front/src/App.css`
3. `front/src/main.jsx`
4. `front/index.html`
5. `front/vite.config.js`
6. `front/i18n.js`
7. `front/public/locales/ar/transilation.json`
8. `front/public/locales/en/transilation.json`
9. `front/src/components/Badge.jsx`
10. `front/src/components/Icon.jsx`
11. `front/src/components/MiniCard.jsx`
12. `front/src/components/SectionHeader.jsx`
13. `front/src/components/StatCard.jsx`
14. `front/tailwind.config.js`
15. `front/postcss.config.js`
16. `front/package.json`
17. `front/package-lock.json`

## How To Run
1. `npm install`
2. `npm run dev`

## Next Suggested Enhancements
1. Replace mock data with API responses from the backend.
2. Wire real routes using React Router for deep linking.
3. Add authentication flows and role-based access guards.