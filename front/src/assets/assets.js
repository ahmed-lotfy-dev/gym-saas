



export const revenueBars = [65, 45, 80, 55, 92, 70, 88, 60, 75, 50, 84, 66];
export const alerts = [
    {
      titleKey: "dashboard.quickAlerts.monthlyExpiring.title",
      descriptionKey: "dashboard.quickAlerts.monthlyExpiring.description",
      tone: "amber",
    },
    {
      titleKey: "dashboard.quickAlerts.ptRemaining.title",
      descriptionKey: "dashboard.quickAlerts.ptRemaining.description",
      tone: "rose",
    },
    {
      titleKey: "dashboard.quickAlerts.branchPeak.title",
      descriptionKey: "dashboard.quickAlerts.branchPeak.description",
      tone: "sky",
    },
  ];

export const expiringMembers = [
    { name: "سارة أحمد", planKey: "plans.monthly", days: 2 },
    { name: "محمد كمال", planKey: "plans.quarterly", days: 4 },
    { name: "هاني يوسف", planKey: "plans.yearly", days: 6 },
    { name: "مروان عمر", planKey: "plans.special", days: 7 },
  ];
export const checkins = [
    { name: "ريم خالد", time: "08:45 AM", statusKey: "attendance.status.checkedIn" },
    { name: "ياسين طارق", time: "09:10 AM", statusKey: "attendance.status.checkedIn" },
    { name: "نور سمير", time: "09:22 AM", statusKey: "attendance.status.blocked" },
    { name: "علي هشام", time: "10:05 AM", statusKey: "attendance.status.checkedOut" },
  ];
export const membersList = [
    {
      name: "أمينة حسين",
      planKey: "plans.monthly",
      statusKey: "members.status.active",
      lastVisitKey: "time.today",
    },
    {
      name: "سامح رأفت",
      planKey: "plans.quarterly",
      statusKey: "members.status.active",
      lastVisitKey: "time.yesterday",
    },
    {
      name: "نادين علاء",
      planKey: "plans.yearly",
      statusKey: "members.status.expired",
      lastVisitKey: "time.daysAgo",
      lastVisitValue: 5,
    },
    {
      name: "حسن السيد",
      planKey: "plans.weekly",
      statusKey: "members.status.active",
      lastVisitKey: "time.today",
    },
  ];
export const subscriptionPlans = [
    {
      titleKey: "plans.daily",
      price: "35 EGP",
      durationKey: "plans.dailyDuration",
      perksKeys: ["plans.perks.fullDayAccess", "plans.perks.instantQr"],
    },
    {
      titleKey: "plans.weekly",
      price: "150 EGP",
      durationKey: "plans.weeklyDuration",
      perksKeys: ["plans.perks.autoRenew", "plans.perks.classDiscounts"],
    },
    {
      titleKey: "plans.monthly",
      price: "450 EGP",
      durationKey: "plans.monthlyDuration",
      perksKeys: ["plans.perks.expiryAlerts", "plans.perks.attendanceTracking"],
    },
    {
      titleKey: "plans.quarterly",
      price: "1,200 EGP",
      durationKey: "plans.quarterlyDuration",
      perksKeys: ["plans.perks.discount10", "plans.perks.assessmentSession"],
    },
    {
      titleKey: "plans.yearly",
      price: "4,200 EGP",
      durationKey: "plans.yearlyDuration",
      perksKeys: ["plans.perks.discount20", "plans.perks.priorityBooking"],
    },
    {
      titleKey: "plans.special",
      price: "2,300 EGP",
      durationKey: "plans.specialDuration",
      perksKeys: ["plans.perks.freePtSession", "plans.perks.retailVouchers"],
    },
  ];
export const invoices = [
    { id: "INV-2041", member: "ليلى سالم", amount: "450 EGP", methodKey: "payments.methods.cash" },
    { id: "INV-2042", member: "كريم مجدي", amount: "1,200 EGP", methodKey: "payments.methods.visa" },
    { id: "INV-2043", member: "سمر فؤاد", amount: "4,200 EGP", methodKey: "payments.methods.transfer" },
    { id: "INV-2044", member: "روان حسن", amount: "150 EGP", methodKey: "payments.methods.cash" },
  ];
export const reports = [
    {
      titleKey: "reports.items.attendance.title",
      descriptionKey: "reports.items.attendance.description",
    },
    {
      titleKey: "reports.items.subscriptions.title",
      descriptionKey: "reports.items.subscriptions.description",
    },
    {
      titleKey: "reports.items.revenue.title",
      descriptionKey: "reports.items.revenue.description",
    },
    {
      titleKey: "reports.items.trainers.title",
      descriptionKey: "reports.items.trainers.description",
    },
  ];
export const permissions = [
    { actionKey: "permissions.actions.addMember", admin: true, staff: true, trainer: false },
    { actionKey: "permissions.actions.viewAllMembers", admin: true, staff: false, trainer: false },
    { actionKey: "permissions.actions.barcodeAttendance", admin: true, staff: true, trainer: false },
    { actionKey: "permissions.actions.seeOwnClients", admin: false, staff: false, trainer: true },
    { actionKey: "permissions.actions.logTrainingSession", admin: false, staff: false, trainer: true },
    { actionKey: "permissions.actions.financialReports", admin: true, staff: false, trainer: false },
    { actionKey: "permissions.actions.addNotes", admin: false, staff: false, trainer: true },
  ];
export const trainerClients = [
    { name: "أحمد عادل", focusKey: "trainer.goals.cutting", sessions: 6 },
    { name: "جمال شريف", focusKey: "trainer.goals.bulking", sessions: 2 },
    { name: "آية سالم", focusKey: "trainer.goals.fitness", sessions: 8 },
  ];
export const sessionLog = [
    { name: "أحمد عادل", dateKey: "time.today", noteKey: "trainer.sessionLog.resistanceLogged" },
    { name: "آية سالم", dateKey: "time.yesterday", noteKey: "trainer.sessionLog.weightUpdated" },
    { name: "جمال شريف", dateKey: "time.daysAgo", dateValue: 2, noteKey: "trainer.sessionLog.sessionCanceled" },
  ];