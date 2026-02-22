import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  decimal,
  integer,
  date,
  time,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "super_admin",
  "gym_admin",
  "staff",
  "trainer",
]);

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "expired",
  "cancelled",
  "frozen",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "cash",
  "bank_transfer",
  "visa",
  "instapay",
  "vodafone_cash",
  "mada",
  "knet",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "expiry_alert",
  "payment_reminder",
  "session_reminder",
  "marketing",
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "walk_in",
  "phone",
  "website",
  "social_media",
  "referral",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "interested",
  "trial",
  "converted",
  "lost",
]);

export const dayOfWeekEnum = pgEnum("day_of_week", [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "booked",
  "cancelled",
  "attended",
]);

export const waitlistStatusEnum = pgEnum("waitlist_status", [
  "waiting",
  "notified",
  "confirmed",
  "expired",
]);

export const productCategoryEnum = pgEnum("product_category", [
  "supplement",
  "drink",
  "gear",
  "apparel",
  "other",
]);

export const templateStatusEnum = pgEnum("template_status", [
  "pending",
  "approved",
  "rejected",
]);

export const gyms = pgTable("gyms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  logoUrl: text("logo_url"),
  currency: text("currency").default("EGP"),
  timezone: text("timezone").default("Africa/Cairo"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id").references(() => gyms.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name").notNull(),
    phone: text("phone"),
    role: roleEnum("role").notNull(),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)]
);

export const trainers = pgTable("trainers", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  specialty: text("specialty"),
  bio: text("bio"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const members = pgTable(
  "members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    gymId: uuid("gym_id")
      .notNull()
      .references(() => gyms.id, { onDelete: "cascade" }),
    branchId: uuid("branch_id").references(() => branches.id, {
      onDelete: "set null",
    }),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    barcode: text("barcode").notNull(),
    photoUrl: text("photo_url"),
    idNumber: text("id_number"),
    dateOfBirth: date("date_of_birth"),
    gender: genderEnum("gender"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("members_barcode_unique").on(table.barcode)]
);

export const subscriptionPlans = pgTable("subscription_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  durationDays: integer("duration_days").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  planId: uuid("plan_id").references(() => subscriptionPlans.id, {
    onDelete: "set null",
  }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: subscriptionStatusEnum("status").notNull(),
  pricePaid: decimal("price_paid", { precision: 10, scale: 2 }),
  isRenewal: boolean("is_renewal").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscriptionPauses = pgTable("subscription_pauses", {
  id: uuid("id").primaryKey().defaultRandom(),
  subscriptionId: uuid("subscription_id")
    .notNull()
    .references(() => subscriptions.id, { onDelete: "cascade" }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  approvedBy: uuid("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trainerClients = pgTable("trainer_clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  trainerId: uuid("trainer_id")
    .notNull()
    .references(() => trainers.id, { onDelete: "cascade" }),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  totalSessions: integer("total_sessions").notNull(),
  remainingSessions: integer("remaining_sessions").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trainerSessions = pgTable("trainer_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  trainerClientId: uuid("trainer_client_id")
    .notNull()
    .references(() => trainerClients.id, { onDelete: "cascade" }),
  sessionDate: date("session_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trainerNotes = pgTable("trainer_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  trainerClientId: uuid("trainer_client_id")
    .notNull()
    .references(() => trainerClients.id, { onDelete: "cascade" }),
  note: text("note").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  branchId: uuid("branch_id").references(() => branches.id, {
    onDelete: "set null",
  }),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  scannedBy: uuid("scanned_by").references(() => users.id),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out"),
  deviceId: text("device_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").references(() => members.id, {
    onDelete: "set null",
  }),
  subscriptionId: uuid("subscription_id").references(() => subscriptions.id, {
    onDelete: "set null",
  }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }).default("0"),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  referenceNumber: text("reference_number"),
  notes: text("notes"),
  recordedBy: uuid("recorded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").references(() => members.id, {
    onDelete: "set null",
  }),
  type: notificationTypeEnum("type").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  assignedTo: uuid("assigned_to").references(() => users.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  source: leadSourceEnum("source").notNull(),
  status: leadStatusEnum("status").notNull(),
  followUpDate: timestamp("follow_up_date"),
  notes: text("notes"),
  convertedToMemberId: uuid("converted_to_member_id").references(() => members.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classSchedules = pgTable("class_schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  branchId: uuid("branch_id").references(() => branches.id, {
    onDelete: "set null",
  }),
  trainerId: uuid("trainer_id").references(() => trainers.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  duration: integer("duration").notNull(),
  maxCapacity: integer("max_capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classBookings = pgTable("class_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  classScheduleId: uuid("class_schedule_id")
    .notNull()
    .references(() => classSchedules.id, { onDelete: "cascade" }),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  bookingDate: date("booking_date").notNull(),
  status: bookingStatusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classWaitlists = pgTable("class_waitlists", {
  id: uuid("id").primaryKey().defaultRandom(),
  classScheduleId: uuid("class_schedule_id")
    .notNull()
    .references(() => classSchedules.id, { onDelete: "cascade" }),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  joinDate: timestamp("join_date").defaultNow().notNull(),
  priority: integer("priority").default(0),
  notifiedAt: timestamp("notified_at"),
  status: waitlistStatusEnum("status").notNull(),
});

export const gymSettings = pgTable("gym_settings", {
  gymId: uuid("gym_id")
    .primaryKey()
    .references(() => gyms.id, { onDelete: "cascade" }),
  alertDaysBeforeExpiry: integer("alert_days_before_expiry").default(3),
  receiptFooter: text("receipt_footer"),
  enableOnlineRegistration: boolean("enable_online_registration").default(false),
  enableMembershipFreeze: boolean("enable_membership_freeze").default(false),
  enableOnlineFreezeRequest: boolean("enable_online_freeze_request").default(false),
  enableSelfCancellation: boolean("enable_self_cancellation").default(false),
  enableReferralSystem: boolean("enable_referral_system").default(false),
  enableGuestPasses: boolean("enable_guest_passes").default(false),
  enableClassBooking: boolean("enable_class_booking").default(false),
  enableOnlinePayments: boolean("enable_online_payments").default(false),
  enableAutoRenewal: boolean("enable_auto_renewal").default(false),
  enableTrainerCommission: boolean("enable_trainer_commission").default(false),
  enableBirthdayRewards: boolean("enable_birthday_rewards").default(false),
  enableWaitlist: boolean("enable_waitlist").default(false),
  enableCheckOut: boolean("enable_check_out").default(false),
  enableVisitLimits: boolean("enable_visit_limits").default(false),
  enableTimeRestrictions: boolean("enable_time_restrictions").default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const inventoryProducts = pgTable("inventory_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: productCategoryEnum("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posTransactions = pgTable("pos_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  memberId: uuid("member_id").references(() => members.id, {
    onDelete: "set null",
  }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }).default("0"),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  recordedBy: uuid("recorded_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const whatsappTemplates = pgTable("whatsapp_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id")
    .notNull()
    .references(() => gyms.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  body: text("body").notNull(),
  language: text("language").default("en"),
  status: templateStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taxConfig = pgTable("tax_config", {
  gymId: uuid("gym_id")
    .primaryKey()
    .references(() => gyms.id, { onDelete: "cascade" }),
  vatRate: decimal("vat_rate", { precision: 5, scale: 2 }).default("0"),
  taxIdNumber: text("tax_id_number"),
  isVatEnabled: boolean("is_vat_enabled").default(false),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const activityLog = pgTable("activity_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  gymId: uuid("gym_id").references(() => gyms.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id"),
  oldValues: text("old_values"),
  newValues: text("new_values"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  referrerMemberId: uuid("referrer_member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  refereeMemberId: uuid("referee_member_id").references(() => members.id, {
    onDelete: "set null",
  }),
  codeUsed: text("code_used").notNull(),
  rewardGiven: boolean("reward_given").default(false),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Gym = typeof gyms.$inferSelect;
export type NewGym = typeof gyms.$inferInsert;
export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Trainer = typeof trainers.$inferSelect;
export type NewTrainer = typeof trainers.$inferInsert;
export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type NewSubscriptionPlan = typeof subscriptionPlans.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type GymSettings = typeof gymSettings.$inferSelect;
export type NewGymSettings = typeof gymSettings.$inferInsert;
