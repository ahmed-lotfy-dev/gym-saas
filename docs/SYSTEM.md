# Gym SaaS - System Requirements

## 1. System Overview

| Attribute     | Description                       |
| ------------- | --------------------------------- |
| **Type**      | Web-based                         |
| **Model**     | Multi-gym SaaS platform           |
| **Branches**  | Multi-branch support              |
| **Users**     | Multi-user with role-based access |
| **Languages** | Arabic / English (Bilingual)      |
| **Pricing**   | Monthly subscription (SaaS)       |

---

## 2. System Goals

- Organize gym data comprehensively
- Prevent expired members from entering
- Speed up entry process with barcode scanning
- Track member and client attendance
- Monitor personal training (PT) subscriptions
- Provide accurate financial reports
- Enable trainers to manage their clients
- Scalable to support hundreds of gyms

---

## 3. User Roles

### 3.1 Super Admin (Platform Owner)

**Scope:** All gyms, all branches, all data

- Full access to all gym data (for testing, support, and platform management)
- Create and manage gyms on the platform
- Set platform-wide subscription tiers/packages for gyms to choose from
- Monitor overall performance across all gyms
- Manage high-level users and platform settings
- Impersonate gym admins for support purposes
- Access to platform-wide reports and analytics
- System configuration and maintenance

### 3.2 Gym Admin (Gym Owner)

**Scope:** Own gym only + own branches only

**Same capabilities as Super Admin but LIMITED to their gym:**

- Manage gym profile (name, logo, address, contact info)
- **Manage subscription packages and pricing** for their gym members:
  - Create custom subscription types (Daily, Weekly, Monthly, etc.)
  - Set custom pricing for each package
  - Create promotional offers and discounts
  - Activate/deactivate packages
- Manage branches
- Manage members
- Manage subscriptions
- Manage trainers
- Manage staff
- Access reports
- Manage settings
- View all gym data

- Manage members
- Manage subscriptions
- Manage trainers
- Manage staff
- Access reports
- Manage settings
- View all data

### 3.3 Staff (Reception)

- Record attendance via barcode
- Add new members
- Register subscriptions
- **No access** to financial reports

### 3.4 Trainer (Coach)

- Dedicated dashboard
- View only their clients
- Record training sessions
- Write notes
- Track client progress

---

## 4. Core Pages

### 4.1 🏠 Dashboard (Admin)

- Total members count
- Today's attendance count
- Subscriptions nearing expiration
- Daily / Monthly revenue
- Trainer client counts
- Charts & visualizations

### 4.2 👥 Members Management

- Add new member
- Auto-generate Barcode / QR Code
- Edit member data
- Delete member
- Member photo
- **Identity Document** (National ID / Iqama / Passport)
- Search & filter
- Subscription status (Active / Expired)
- Subscription history
- Print membership card with barcode

### 4.3 📅 Subscriptions Management

**Subscription Types:**

- Daily
- Weekly
- Monthly
- 3 Months
- Yearly
- Special offers

**Features:**

- Set price
- Set duration
- Link subscription to member
- Renew subscription
- Suspend subscription
- Apply discounts

### 4.4 🕓 Attendance System (Barcode Based)

**Primary Method:**

- Camera or Barcode scanner device
- Read QR Code / Barcode
- Instant member data display:
  - Name
  - Photo
  - Subscription status
  - Days remaining

**Functions:**

- Automatic Check-in
- Check-out
- Block entry if subscription expired
- Prevent duplicate check-in on same day
- Daily attendance log
- Historical attendance records

### 4.5 💳 Payments & Invoices

- Record payment transactions
- Payment types (Cash / Transfer / Visa)
- Invoice per subscription
- Payment archive
- Financial reports
- Link payment to member or trainer

### 4.6 🔔 Alerts & Notifications

- Alert for subscription nearing expiration
- Alert for subscription expiration
- Alert for training sessions ending
- Send via:
  - SMS
  - WhatsApp
  - Email

### 4.7 📊 Reports

- Daily / Monthly attendance report
- Subscriptions report
- Revenue report
- Trainers report
- Clients per trainer report
- Export to PDF / Excel

### 4.8 ⚙️ Settings

- Manage users & permissions
- Gym name
- Logo
- Language
- Currency
- Alert days before expiration
- Barcode settings

---

## 5. Trainer System

### 5.1 🏠 Trainer Dashboard

- Client count
- Remaining sessions count
- Nearest PT subscriptions expiring
- Client-specific notifications

### 5.2 👥 My Clients

Trainer can:

- Add new client (from gym members)
- Set number of sessions
- Set PT subscription duration
- View only their clients

### 5.3 📆 Client Sessions

- Record training session per client
- Auto-deduct session
- Session history log

### 5.4 📝 Client Progress & Notes

Per client:

- Weight
- Height
- Goal (Cutting / Bulking / Fitness)
- Trainer notes
- Workout plan
- Update history

### 5.5 💳 Trainer Subscriptions

PT subscription separate from gym subscription:

- 10 sessions
- 20 sessions
- 1 month private training

---

## 6. Permissions Matrix

| Function                               | Super Admin | Gym Admin | Staff | Trainer |
| -------------------------------------- | :---------: | :-------: | :---: | :-----: |
| **Platform Management**                |
| Manage All Gyms                        |     ✅      |    ❌     |  ❌   |   ❌    |
| Manage Platform Settings               |     ✅      |    ❌     |  ❌   |   ❌    |
| Impersonate Users View As              |     ✅      |    ❌     |  ❌   |   ❌    |
| View Platform Analytics                |     ✅      |    ❌     |  ❌   |   ❌    |
| **Gym Management (Own Gym Only)**      |
| Add Member                             |     ✅      |    ✅     |  ✅   |   ❌    |
| View All Members                       |     ✅      |    ✅     |  ❌   |   ❌    |
| Edit Member Data                       |     ✅      |    ✅     |  ✅   |   ❌    |
| Delete Member                          |     ✅      |    ✅     |  ❌   |   ❌    |
| Barcode Attendance                     |     ✅      |    ✅     |  ✅   |   ❌    |
| Manage Subscriptions                   |     ✅      |    ✅     |  ✅   |   ❌    |
| Manage Staff Users                     |     ✅      |    ✅     |  ❌   |   ❌    |
| Manage Trainers                        |     ✅      |    ✅     |  ❌   |   ❌    |
| Manage Subscription Packages & Pricing |     ✅      |    ✅     |  ❌   |   ❌    |
| Financial Reports                      |     ✅      |    ✅     |  ❌   |   ❌    |
| Gym Settings                           |     ✅      |    ✅     |  ❌   |   ❌    |
| Export Data                            |     ✅      |    ✅     |  ❌   |   ❌    |
| **Trainer Functions**                  |
| View Their Clients Only                |     ❌      |    ❌     |  ❌   |   ✅    |
| Record Training Session                |     ❌      |    ❌     |  ❌   |   ✅    |
| Add Client Notes                       |     ❌      |    ❌     |  ❌   |   ✅    |
| View Client Progress                   |     ❌      |    ❌     |  ❌   |   ✅    |

**Notes:**

- `Super Admin` = Full platform access (all gyms, all data)
- `Gym Admin` = Full gym access (their gym + their branches only)
- `Staff` = Limited gym access (assigned branches only, no financials)
- `Trainer` = Client-only access (their assigned clients only)

---

## 7. Core Features

- ✅ Members Management
- ✅ Subscriptions Management
- ✅ Barcode Attendance System
- ✅ Trainer Clients System
- ✅ Alerts System
- ✅ Payments & Invoices
- ✅ Reports
- ✅ Role-based access
- ✅ Multi-gym support
- ✅ Multi-branch
- ✅ Multi-language
- ✅ Secure login (JWT)

---

## 8. Future Features

- Mobile App for Members // TODO FUTURE ENHANCEMENT
- Mobile App for Trainers // TODO FUTURE ENHANCEMENT
- Camera-based QR Scanner
- Loyalty Points System
- Online Payments
- Chat between Trainer & Client
- Before/After photo uploads
- Trainer Schedule
- Online Bookings
- **Inventory System (Supplements, Drinks, Gear)**
- **POS System (Point of Sale)**
- **Ramadan Mode (Dynamic Shift Scheduling)**
- Smart Entry Gate (Turnstile)
- NFC Card Support

---

## 9. Backend Architecture Enhancements

### 9.1 Database Architecture

| Enhancement           | Description                                                        | Priority |
| --------------------- | ------------------------------------------------------------------ | -------- |
| **Soft Deletes**      | Keep historical data with `deletedAt` timestamp for audit trails   | High     |
| **Audit Logging**     | Track all CRUD operations with user ID, timestamp, old/new values  | High     |
| **Data Partitioning** | Partition `ATTENDANCE` table by month/gym for performance at scale | Medium   |
| **Archive Tables**    | Move old attendance (>2 years) to cold storage tables              | Low      |
| **Database Indexing** | Optimized indexes on `barcode`, `scanTime`, `memberId`, `gymId`    | High     |

### 9.2 Security & Access Control

```
Current: Simple role field (Admin, Staff, Trainer)
Proposed: Granular RBAC with permissions table
```

**Enhanced Security Features:**

- **Permission Templates**: Predefined sets (Receptionist, Senior Trainer, Accountant, Manager)
- **Branch-based Access**: Staff can only access their assigned branches
- **IP Whitelisting**: Restrict gym admin logins to gym location IPs (optional)
- **API Rate Limiting**: Per-gym limits to prevent abuse (e.g., 1000 req/min per gym)
- **Session Management**: Concurrent session limits, force logout
- **2FA Support**: Optional two-factor authentication for Gym Admin & Super Admin

**Permissions Table Structure:**

- `id`, `roleId`, `resource` (e.g., 'members', 'payments'), `action` (e.g., 'read', 'write', 'delete'), `allowed`

### 9.3 Subscription Engine Enhancements

| Feature               | Description                                                                            | Priority |
| --------------------- | -------------------------------------------------------------------------------------- | -------- |
| **Auto-Renewal**      | Automatic subscription renewal with saved payment methods                              | Medium   |
| **Freeze/Unfreeze**   | Members can freeze subscription (e.g., travel, injury) with configurable freeze limits | Medium   |
| **Upgrade/Downgrade** | Prorated subscription changes mid-cycle                                                | Low      |
| **Family Plans**      | Shared subscription pools (parent + children)                                          | Low      |
| **Corporate Plans**   | Company-sponsored memberships with bulk pricing                                        | Low      |
| **Trial Periods**     | Configurable trial days for new members                                                | Medium   |
| **Grace Period**      | Configurable days after expiry before blocking entry                                   | Medium   |

### 9.4 Advanced Attendance System

**Capacity Management:**

- Max occupancy per branch with real-time counters
- Peak hours analytics for staffing optimization
- Entry blocking when at capacity

**Enhanced Tracking:**

- **No-Show Tracking**: Flag members who book classes but don't attend
- **Visit Limits**: Restrict visits per day/week per subscription type
- **Time Restrictions**: Subscription types valid only during certain hours (e.g., off-peak)
- **Guest Passes**: Allow members to bring guests with limits

### 9.5 Financial Module

```
Current: Basic payment records
Proposed: Full accounting sub-system
```

**Core Features:**

| Feature                    | Description                                               |
| -------------------------- | --------------------------------------------------------- |
| **Invoicing**              | PDF invoices with gym branding, sequential numbering      |
| **Tax Support**            | VAT/tax calculation per country/gym, multiple tax rates   |
| **Refund Processing**      | Full/partial refund workflows with reason tracking        |
| **Revenue Recognition**    | Monthly revenue reports (accrual accounting)              |
| **Trainer Commission**     | Automatic commission calculation per session (% or fixed) |
| **Expense Tracking**       | Record gym expenses (rent, utilities, salaries)           |
| **Multi-Currency**         | Support for different currencies per gym                  |
| **Payment Reconciliation** | Match bank transfers to member payments                   |

### 9.6 Notification System Architecture

**Multi-Channel Support:**

| Channel               | Use Cases                                          | Provider Options                     |
| --------------------- | -------------------------------------------------- | ------------------------------------ |
| **Email**             | Invoices, receipts, monthly summaries, welcome     | SendGrid, AWS SES, Mailgun           |
| **SMS**               | Expiry alerts, OTP, emergency notifications        | Twilio, MessageBird, local providers |
| **WhatsApp Business** | Renewal reminders, session confirmations, receipts | WhatsApp Business API                |
| **Push**              | Mobile app notifications (future)                  | Firebase, OneSignal                  |
| **In-App**            | Real-time dashboard alerts                         | WebSocket                            |

**Features:**

- **Notification Templates**: Per-gym customizable templates with variables (`{{memberName}}`, `{{expiryDate}}`)
- **Scheduled Notifications**: Queue notifications to be sent at optimal times
- **Delivery Tracking**: Track opened/read status
- **Preference Management**: Members can choose channels and notification types
- **DND Hours**: Respect do-not-disturb hours per timezone

### 9.7 Reporting & Analytics Engine

**Real-time Dashboard:**

- WebSocket-based live attendance updates
- Current occupancy per branch
- Today's revenue counter

**Advanced Analytics:**

| Report                  | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| **Cohort Analysis**     | Member retention by join month                                      |
| **Churn Prediction**    | ML-based prediction of members likely to leave                      |
| **LTV Calculation**     | Lifetime value per member                                           |
| **Trainer Performance** | Revenue per trainer, client progress stats, session completion rate |
| **Peak Analysis**       | Busiest hours/days for capacity planning                            |
| **Custom Reports**      | Gym admins can build their own reports with drag-and-drop           |

**Export Options:**

- PDF, Excel, CSV
- Scheduled email reports (daily/weekly/monthly)
- API endpoint for external BI tools

### 9.8 Integration Capabilities

| Category             | Integrations                                 | Purpose                                 |
| -------------------- | -------------------------------------------- | --------------------------------------- |
| **Payment Gateways** | Stripe, PayPal, Fawry, Vodafone Cash, Paymob | Process payments globally and locally   |
| **Accounting**       | QuickBooks, Xero                             | Automatic sync of invoices and payments |
| **Access Control**   | ZKTeco, HID, custom turnstiles               | Hardware gate control                   |
| **Biometrics**       | Fingerprint/face recognition devices         | Alternative entry methods               |
| **Email**            | SendGrid, AWS SES, Mailgun                   | Transactional emails                    |
| **SMS**              | Twilio, Infobip, local providers             | SMS notifications                       |
| **Storage**          | AWS S3, Cloudflare R2                        | Member photos, documents                |
| **CDN**              | Cloudflare, AWS CloudFront                   | Static asset delivery                   |

**Webhook System:**

- Outgoing webhooks for gym events (new member, payment received, etc.)
- Configurable per gym
- Retry logic with exponential backoff

### 9.9 Scalability & Performance

**Architecture Layers:**

```
┌─────────────────────────────────────┐
│         Load Balancer               │
├─────────────────────────────────────┤
│    CDN (Static Assets)              │
├─────────────────────────────────────┤
│    API Servers (Auto-scaling)       │
├─────────────────────────────────────┤
│    Redis Cache                      │
├─────────────────────────────────────┤
│    Read Replicas  ←  Primary DB     │
├─────────────────────────────────────┤
│    Queue Workers (Background Jobs)  │
└─────────────────────────────────────┘
```

**Caching Strategy:**

| Cache Key                     | TTL      | Purpose                  |
| ----------------------------- | -------- | ------------------------ |
| `gym:{id}:settings`           | 1 hour   | Gym configuration        |
| `member:{barcode}`            | 5 min    | Member lookup on scan    |
| `subscription:plans:{gymId}`  | 1 hour   | Subscription plans       |
| `attendance:today:{branchId}` | 1 min    | Today's attendance count |
| `session:{token}`             | 24 hours | Auth sessions            |

**Background Jobs (Queue):**

- Notification sending
- Report generation
- Invoice PDF generation
- Data export
- Daily/monthly aggregation jobs
- Webhook delivery

### 9.10 Additional Database Entities

Based on the ERD analysis, these entities should be added:

| Entity                 | Fields                                                                                                             | Purpose                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| **GYM_SETTINGS**       | `gymId`, `currency`, `timezone`, `alertDaysBeforeExpiry`, `language`, `logo`, `taxRate`, `receiptFooter`           | Per-gym configuration                  |
| **PAYMENT_METHOD**     | `memberId`, `type` (card/cach first/vodafone ), `token`, `last4`, `expiry`, `isDefault`                            | Saved payment methods for auto-renewal |
| **CLASS_SCHEDULE**     | `id`, `gymId`, `branchId`, `name`, `trainerId`, `dayOfWeek`, `startTime`, `duration`, `maxCapacity`, `price`       | Group fitness classes                  |
| **CLASS_BOOKING**      | `id`, `classScheduleId`, `memberId`, `bookingDate`, `status` (booked/cancelled/attended)                           | Class reservations                     |
| **INVOICE**            | `id`, `gymId`, `memberId`, `invoiceNumber`, `issueDate`, `dueDate`, `subtotal`, `tax`, `total`, `status`, `pdfUrl` | Proper invoicing                       |
| **TAX_RATE**           | `id`, `gymId`, `name`, `rate`, `isDefault`                                                                         | Configurable tax rates                 |
| **ACTIVITY_LOG**       | `id`, `userId`, `gymId`, `action`, `entityType`, `entityId`, `oldValues`, `newValues`, `ipAddress`, `timestamp`    | Audit trail                            |
| **MEMBER_DOCUMENT**    | `id`, `memberId`, `type` (contract/id/medical), `fileUrl`, `uploadedAt`                                            | Member file attachments                |
| **SUBSCRIPTION_PAUSE** | `id`, `subscriptionId`, `startDate`, `endDate`, `reason`, `approvedBy`                                             | Track subscription freezes             |

---

## 10. API Design Principles

### 10.1 RESTful Endpoints

```
/api/v1/gyms/{gymId}/members
/api/v1/gyms/{gymId}/subscriptions
/api/v1/gyms/{gymId}/attendance
/api/v1/gyms/{gymId}/payments
/api/v1/gyms/{gymId}/trainers
/api/v1/gyms/{gymId}/reports
```

### 10.2 Key Patterns

- **Tenant Isolation**: All queries filtered by `gymId`
- **Pagination**: Cursor-based for large datasets (attendance)
- **Filtering**: Query params for search, date ranges, status
- **Sorting**: Multi-column sort support
- **Field Selection**: Sparse fieldsets to reduce payload
- **Bulk Operations**: Batch create/update where applicable

### 10.3 Barcode Scan Endpoint

```http
POST /api/v1/attendance/scan
Content-Type: application/json

{
  "barcode": "123456789",
  "branchId": "branch-uuid",
  "deviceId": "scanner-001"
}
```

**Response:**

```json
{
  "success": true,
  "member": {
    "id": "uuid",
    "name": "John Doe",
    "photo": "https://cdn.example.com/photo.jpg",
    "subscriptionStatus": "active",
    "daysRemaining": 15
  },
  "checkInTime": "2026-02-02T08:30:00Z",
  "message": "Welcome!"
}
```

---

## 11. Deployment & DevOps

### 11.1 Environment Strategy

- **Development**: Local Docker Compose
- **Staging**: Cloud environment with production-like data
- **Production**: Multi-region deployment (optional)

### 11.2 Backup Strategy

| Data                  | Frequency                            | Retention |
| --------------------- | ------------------------------------ | --------- |
| Database              | Daily full + continuous WAL          | 30 days   |
| File Storage (photos) | Cross-region replication             | 90 days   |
| Audit Logs            | Archive to cold storage after 1 year | 7 years   |

### 11.3 Monitoring

- **APM**: Application performance monitoring (response times, error rates)
- **Database**: Slow query monitoring, connection pool stats
- **Business Metrics**: Daily signups, churn rate, revenue
- **Uptime**: Branch-level availability (entry system)

---

## 12. Compliance & Legal

### 12.1 Data Privacy (GDPR/CCPA)

- **Right to Access**: Export all member data
- **Right to Deletion**: Anonymize member data on request
- **Consent Management**: Track consent for marketing communications
- **Data Retention**: Auto-delete after retention period

### 12.2 Financial Compliance

- Invoice numbering regulations per country
- Tax reporting exports
- PCI DSS compliance for card data (use tokenization)

---

## 13. Additional Features (Industry Best Practices)

Based on successful gym SaaS platforms, these features significantly improve retention and operations:

### 13.1 Lead Management (CRM)

**Purpose:** Track potential members before they convert

| Feature                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Lead Capture**         | Record walk-ins, phone inquiries, website forms, social media leads          |
| **Lead Source Tracking** | Track where leads come from (Facebook, Google, Instagram, Walk-in, Referral) |
| **Follow-up Reminders**  | Automated reminders for staff to follow up with leads                        |
| **Lead Status**          | New → Contacted → Interested → Trial → Converted/Lost                        |
| **Notes & History**      | Track all interactions with each lead                                        |
| **Conversion Analytics** | Lead-to-member conversion rate by source                                     |

**Why:** Gyms lose 30%+ of leads without proper follow-up system

**Database Entity:** `LEAD` - `id`, `gymId`, `name`, `phone`, `email`, `source`, `status`, `assignedTo`, `followUpDate`, `notes`, `convertedToMemberId`

### 13.2 Membership Freeze & Cancellation Workflows (Optional Features)

> ⚠️ **Gym Owner Toggleable:** These features are **disabled by default**. Each gym owner can enable them in their gym settings based on their business policy.

**Gym Settings Toggle:**

- `enableMembershipFreeze` - Allow members to request subscription freezes
- `enableSelfCancellation` - Allow members to request cancellation via app/portal
- `enableOnlineFreezeRequest` - Enable online freeze requests (vs in-person only)

**Membership Freeze (when enabled):**

- Self-service freeze request from member
- Configurable max freeze duration (e.g., 30 days per year) - set by gym admin
- Freeze reason tracking (travel, injury, financial)
- Admin approval workflow
- Automatic unfreeze notification
- Extension tracking
- Freeze fees (optional - configurable by gym)

**Cancellation Workflow (when enabled):**

- Exit survey (reason for leaving)
- Retention offers triggered based on reason
- Cancellation fee calculation if applicable
- Automatic access revocation
- "Win-back" campaign eligibility
- Minimum commitment period enforcement

**Database Entities:**

- `GYM_FEATURES` - `gymId`, `enableFreeze`, `enableSelfCancellation`, `freezeMaxDays`, `freezeFee`, `cancellationFee`
- `SUBSCRIPTION_PAUSE` - freeze records
- `CANCELLATION_REQUEST` - cancellation tracking

### 13.3 Referral System

**How it Works:**

1. Member gets unique referral code/link
2. Shares with friends
3. When friend signs up → both get reward

**Reward Types:**

- Free sessions not month for referrer
- Discount on next renewal
- Cash reward
- Free PT session
- Guest passes

**Features:**

- Unique referral codes per member
- Referral tracking dashboard
- Automated reward fulfillment
- Referral leaderboards
- "Refer-a-friend" promotional campaigns

**Database Entity:** `REFERRAL` - `id`, `referrerMemberId`, `refereeMemberId`, `codeUsed`, `rewardGiven`, `status`

### 13.4 Waitlist Management

**Use Case:** Group classes at full capacity

| Feature               | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| **Join Waitlist**     | Member adds themselves to class waitlist                    |
| **Auto-notify**       | When spot opens, first on waitlist gets notified (SMS/App)  |
| **Time-limited**      | Member has X hours to confirm before next person gets offer |
| **Priority Rules**    | Premium members get waitlist priority                       |
| **Waitlist Position** | Member can see their position in line                       |

**Database Entity:** `CLASS_WAITLIST` - `id`, `classScheduleId`, `memberId`, `joinDate`, `priority`, `notifiedAt`, `status`

### 13.5 Trainer Commission & Payroll System

**Commission Calculation:**

- Percentage of PT session price (e.g., 60% to trainer)
- Fixed amount per session
- Tiered commission (more sessions = higher %)

**Payroll Features:**

- Payroll period management (weekly/bi-weekly/monthly)
- Commission summary per period
- Deductions (if applicable)
- Withdrawal requests
- Payment history
- Tax document generation

**Trainer Portal:**

- View upcoming sessions
- Track earnings in real-time
- Request withdrawal
- View payment history

**Database Entities:**

- `TRAINER_EARNING` - per session earnings
- `PAYROLL_PERIOD` - payroll cycle tracking
- `WITHDRAWAL_REQUEST` - trainer withdrawal requests

### 13.6 Member Engagement Automation

**Birthday Automation:**

- Send birthday wishes (SMS/WhatsApp/Email)
- Automatic birthday discount/free day
- Gym-branded birthday message

**Membership Anniversary:**

- "Thank you for 1 year" messages
- Loyalty rewards (e.g., free personal training session)
- Milestone badges

**Re-engagement Campaigns:**

- Detect inactive members (no visit in 30 days)
- Automated "We miss you" offers
- Win-back discounts

**Database Entity:** `MEMBER_EVENT` - track birthdays, anniversaries, milestones

### 13.7 Gym Feature Toggles (Optional Features)

Gym owners can enable/disable these features based on their business model:

| Feature Toggle              | Description                                 | Default |
| --------------------------- | ------------------------------------------- | ------- |
| `enableOnlineRegistration`  | Allow new members to register online        | ❌ OFF  |
| `enableMembershipFreeze`    | Allow members to freeze subscriptions       | ❌ OFF  |
| `enableOnlineFreezeRequest` | Allow online freeze requests (vs in-person) | ❌ OFF  |
| `enableSelfCancellation`    | Allow members to cancel online              | ❌ OFF  |
| `enableReferralSystem`      | Enable member referral program              | ❌ OFF  |
| `enableGuestPasses`         | Allow members to bring guests               | ❌ OFF  |
| `enableClassBooking`        | Enable group class booking                  | ❌ OFF  |
| `enableOnlinePayments`      | Allow online payment for subscriptions      | ❌ OFF  |
| `enableAutoRenewal`         | Enable subscription auto-renewal            | ❌ OFF  |
| `enableTrainerCommission`   | Enable trainer commission tracking          | ❌ OFF  |
| `enableBirthdayRewards`     | Send birthday rewards automatically         | ❌ OFF  |
| `enableWaitlist`            | Enable class waitlist feature               | ❌ OFF  |
| `enableCheckOut`            | Require members to check out                | ❌ OFF  |
| `enableVisitLimits`         | Enforce daily/weekly visit limits           | ❌ OFF  |
| `enableTimeRestrictions`    | Restrict entry by time of day               | ❌ OFF  |

**Why Most Features Default to OFF:**

In the Egyptian/local market context:

- **Capacity Control:** Many gyms have physical space quotas and prefer manual member intake control
- **Manual Registration:** Face-to-face registration builds trust and allows sales conversation
- **Payment Methods:** Cash and bank transfers are more common than online payments
- **Control:** Gym owners want to verify identity and avoid fake registrations
- **Simplicity:** Fewer moving parts = fewer support issues for gym staff
- **Gradual Adoption:** Owners can enable features as their business model evolves

**Database Entity:** `GYM_FEATURES` - stores all toggle states per gym

### 13.8 Mobile App Features (Future Enhancement)

**Member Mobile App:**

- Digital membership card with barcode
- View subscription status and expiry
- See remaining PT sessions
- Book group classes
- View attendance history
- Receive push notifications
- Freeze/pause subscription
- Update personal info
- Refer friends
- View gym announcements

**Trainer Mobile App:**

- View today's schedule
- Check in clients for PT sessions
- View client progress notes
- Record session completion
- View earnings
- Communicate with clients

**Note:** Mobile apps are listed in Future Features (Section 8) but detailed here for planning purposes.

### 13.8 Multi-location Member Access (Not in MVP)

**Feature Description:**
Allow members to use any branch of the gym chain with their membership.

**Why NOT in MVP:**

- **Security Risk:** Members could share accounts across cities
- **Fraud Potential:** Hard to track if member is actually present vs. account sharing
- **Complexity:** Requires cross-gym data sharing and verification
- **Business Logic:** Pricing complications (branch A is premium, branch B is standard)

**Future Considerations:**

- Multi-tier memberships (single branch vs. all branches)
- Cross-branch attendance tracking
- Different pricing per branch location
- Requires robust identity verification

**MVP Approach:**
Each branch is independent. Member must purchase separate membership for each branch they want to use.

---

## 14. Summary: Database Entities Reference

| Entity                 | Purpose                          | Priority |
| ---------------------- | -------------------------------- | -------- |
| `GYM`                  | Gym/tenant data                  | Core     |
| `BRANCH`               | Branch locations                 | Core     |
| `USER`                 | System users (all roles)         | Core     |
| `MEMBER`               | Gym members                      | Core     |
| `SUBSCRIPTION_PLAN`    | Available subscription types     | Core     |
| `SUBSCRIPTION`         | Active/past member subscriptions | Core     |
| `ATTENDANCE`           | Check-in/check-out records       | Core     |
| `PAYMENT`              | Payment transactions             | Core     |
| `TRAINER`              | Trainer profiles                 | Core     |
| `TRAINER_CLIENT`       | Trainer-client relationships     | Core     |
| `TRAINER_SESSION`      | PT session records               | Core     |
| `TRAINER_NOTE`         | Client progress notes            | Core     |
| `GYM_SETTINGS`         | Per-gym configuration            | Core     |
| `GYM_FEATURES`         | Feature toggles per gym          | Core     |
| `NOTIFICATION`         | Notification history             | Core     |
| `LEAD`                 | CRM leads                        | High     |
| `CLASS_SCHEDULE`       | Group fitness classes            | High     |
| `CLASS_BOOKING`        | Class reservations               | High     |
| `CLASS_WAITLIST`       | Waitlist for full classes        | High     |
| `SUBSCRIPTION_PAUSE`   | Freeze records                   | Medium   |
| `CANCELLATION_REQUEST` | Cancellation tracking            | Medium   |
| `REFERRAL`             | Referral program tracking        | Medium   |
| `INVOICE`              | Proper invoicing                 | Medium   |
| `TAX_RATE`             | Configurable tax rates           | Medium   |
| `PAYMENT_METHOD`       | Saved payment methods            | Medium   |
| `ACTIVITY_LOG`         | Audit trail                      | High     |
| `MEMBER_DOCUMENT`      | File attachments                 | Medium   |
| `TRAINER_EARNING`      | Per session earnings             | Medium   |
| `PAYROLL_PERIOD`       | Payroll cycle tracking           | Medium   |
| `WITHDRAWAL_REQUEST`   | Trainer payouts                  | Medium   |
| `MEMBER_EVENT`         | Birthdays, anniversaries         | Low      |

---

_Last Updated: 2026-02-02_
