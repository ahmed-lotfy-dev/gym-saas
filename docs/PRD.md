# Gym SaaS - Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-02-02  
**Status:** Draft  
**Tech Stack:** Node.js + Express + TypeScript + PostgreSQL + React

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Target Users](#2-target-users)
3. [User Stories & Requirements](#3-user-stories--requirements)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Database Schema](#6-database-schema)
7. [API Endpoints](#7-api-endpoints)
8. [UI/UX Requirements](#8-uiux-requirements)
9. [Security Requirements](#9-security-requirements)
10. [MVP Scope](#10-mvp-scope)
11. [Release Phases](#11-release-phases)
12. [Success Metrics](#12-success-metrics)

---

## 1. Executive Summary

### 1.1 Product Vision

A multi-gym SaaS platform designed for the Egyptian and MENA market, enabling gym owners to manage their facilities, members, subscriptions, and trainers through a unified web-based system.

### 1.2 Problem Statement

Current gym management in Egypt relies on:

- Paper-based member tracking
- Excel spreadsheets
- Manual attendance counting
- No centralized member data
- Limited financial tracking
- Poor trainer management

### 1.3 Solution

A comprehensive gym management platform with:

- Barcode-based attendance system
- Automated subscription tracking
- Financial reporting
- Trainer-client management
- Multi-branch support
- Bilingual interface (Arabic/English)

### 1.4 Key Differentiators

1. **Offline-capable barcode scanning** for unreliable internet
2. **Flexible feature toggles** - gyms enable what they need
3. **Local payment support** (cash, bank transfer, Vodafone Cash)
4. **Simple pricing** - no per-member fees
5. **Mobile-responsive** - works on tablet at reception

---

## 2. Target Users

### 2.1 Primary Users

| User Type         | Count per Gym | Technical Skill        |
| ----------------- | ------------- | ---------------------- |
| Gym Admin (Owner) | 1-2           | Medium                 |
| Staff (Reception) | 2-4           | Low                    |
| Trainer           | 5-20          | Low-Medium             |
| Member            | 100-2000      | N/A (no direct access) |

### 2.2 Platform Admin (SaaS Provider)

- Super Admin manages all gyms
- Monitors platform health
- Handles support requests
- Manages gym subscriptions

---

## 3. User Stories & Requirements

### 3.1 Gym Admin (Owner)

**Authentication & Setup:**

```gherkin
As a Gym Admin
I want to register my gym on the platform
So that I can start managing my business

Acceptance Criteria:
- Register with gym name, address, contact info
- Upload gym logo
- Set currency (EGP default)
- Configure working hours
- Invite staff members
```

**Member Management:**

```gherkin
As a Gym Admin
I want to register new members
So that they can access the gym

Acceptance Criteria:
- Capture: full name, phone, email (optional), photo, ID number
- Auto-generate unique barcode
- Print membership card with barcode
- View member subscription history
- Search members by name, phone, or barcode
- Deactivate problematic members
```

**Subscription Management:**

```gherkin
As a Gym Admin
I want to create subscription packages
So that members can choose what fits them

Acceptance Criteria:
- Create packages: Daily, Weekly, Monthly, 3-Month, 6-Month, Yearly
- Set price for each package
- Set duration (days)
- Enable/disable packages
- View active subscriptions count
- See expired subscriptions list
```

**Financial Management:**

```gherkin
As a Gym Admin
I want to record payments
So that I can track my revenue

Acceptance Criteria:
- Record payment: amount, date, method (Cash/Bank/Visa)
- Link payment to member subscription
- Generate PDF invoice
- View daily collections
- View monthly revenue report
- Export to Excel
```

**Attendance Monitoring:**

```gherkin
As a Gym Admin
I want to see who entered my gym today
So that I can monitor usage

Acceptance Criteria:
- View today's attendance count
- See real-time check-ins
- View member details on scan
- Download daily attendance report
- Identify expired members trying to enter
```

### 3.2 Staff (Reception)

**Quick Check-in:**

```gherkin
As a Staff member
I want to scan member barcodes
So that I can record their attendance quickly

Acceptance Criteria:
- Camera-based barcode scanning
- Instant member data display
- Visual approval (green = active, red = expired)
- One-click check-in
- View today's attendance list
```

**Member Registration (Quick):**

```gherkin
As a Staff member
I want to quickly add new members
So that I don't hold up the reception line

Acceptance Criteria:
- Minimal fields: name, phone, photo
- Quick subscription assignment
- Instant card printing
- Complete profile later
```

### 3.3 Trainer

**Client Management:**

```gherkin
As a Trainer
I want to see my assigned clients
So that I can manage their training

Acceptance Criteria:
- View client list with photos
- See remaining sessions per client
- View client progress notes
- Record new training session
- Add progress notes
```

**Session Recording:**

```gherkin
As a Trainer
I want to mark a session as completed
So that the client's remaining sessions decrease

Acceptance Criteria:
- One-click session completion
- Auto-decrement remaining sessions
- View session history
- Add session notes
```

---

## 4. Functional Requirements

### 4.1 Core Modules

| Module                       | Priority | Complexity |
| ---------------------------- | -------- | ---------- |
| Authentication (Multi-role)  | P0       | Medium     |
| Gym Onboarding               | P0       | Low        |
| Member Management            | P0       | Medium     |
| Subscription Management      | P0       | Medium     |
| Barcode Attendance           | P0       | High       |
| Payment Recording            | P0       | Medium     |
| Basic Reports                | P0       | Medium     |
| Trainer Management           | P1       | Medium     |
| Trainer-Client System        | P1       | Medium     |
| Notifications (SMS/WhatsApp) | P1       | High       |
| Advanced Reports             | P2       | Medium     |
| Class Scheduling             | P2       | High       |
| Waitlist Management          | P2       | Medium     |
| Referral System              | P3       | Low        |
| Lead CRM                     | P3       | Medium     |

### 4.2 Feature Toggles (Gym Settings)

All features default to **OFF** - gym owner enables as needed:

| Feature               | Toggle Name                 | Default |
| --------------------- | --------------------------- | ------- |
| Online Registration   | `enableOnlineRegistration`  | OFF     |
| Membership Freeze     | `enableMembershipFreeze`    | OFF     |
| Online Freeze Request | `enableOnlineFreezeRequest` | OFF     |
| Self Cancellation     | `enableSelfCancellation`    | OFF     |
| Referral System       | `enableReferralSystem`      | OFF     |
| Guest Passes          | `enableGuestPasses`         | OFF     |
| Class Booking         | `enableClassBooking`        | OFF     |
| Online Payments       | `enableOnlinePayments`      | OFF     |
| Auto Renewal          | `enableAutoRenewal`         | OFF     |
| Trainer Commission    | `enableTrainerCommission`   | OFF     |
| Birthday Rewards      | `enableBirthdayRewards`     | OFF     |
| Waitlist              | `enableWaitlist`            | OFF     |
| Check-out Required    | `enableCheckOut`            | OFF     |
| Visit Limits          | `enableVisitLimits`         | OFF     |
| Time Restrictions     | `enableTimeRestrictions`    | OFF     |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Requirement                         | Target      |
| ----------------------------------- | ----------- |
| Barcode scan response time          | < 500ms     |
| Page load time                      | < 2 seconds |
| API response time (95th percentile) | < 200ms     |
| Concurrent users per gym            | 50+         |
| Database query time                 | < 100ms     |
| Report generation (monthly)         | < 5 seconds |

### 5.2 Scalability

- Support 1000+ gyms on single instance
- 100,000+ members per gym
- 1,000,000+ attendance records per month
- Horizontal scaling via load balancers

### 5.3 Reliability

- 99.9% uptime SLA
- Automatic failover
- Daily backups
- Data retention: 7 years

### 5.4 Security

- **Authentication:** Better Auth with 2FA support (Email, TOTP)
- **Organization-based access:** Better Auth Organizations plugin for multi-tenant
- **RBAC:** Role-based access control (Super Admin, Gym Admin, Staff, Trainer)
- **Password hashing:** bcrypt (handled by Better Auth)
- **Session management:** Secure sessions with refresh tokens (Better Auth)
- **Row Level Security (RLS):** PostgreSQL RLS for data isolation
- **HTTPS only:** TLS 1.3
- **API rate limiting:** 100 req/min per IP, 1000 req/min per gym
- **Input validation:** Zod
- **XSS/CSRF protection:** Built into Better Auth
- **SQL injection prevention:** Parameterized queries via Drizzle

### 5.5 Accessibility

- Bilingual: Arabic (RTL) & English (LTR)
- Mobile-responsive design
- Touch-friendly interface for tablets
- Screen reader support

---

## 6. Database Schema

### 6.1 Core Entities

```sql
-- Gyms (Tenants)
CREATE TABLE gyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    logo_url TEXT,
    currency VARCHAR(3) DEFAULT 'EGP',
    timezone VARCHAR(50) DEFAULT 'Africa/Cairo',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Branches
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users (All roles: SuperAdmin, GymAdmin, Staff, Trainer)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) CHECK (role IN ('super_admin', 'gym_admin', 'staff', 'trainer')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    barcode VARCHAR(50) UNIQUE NOT NULL,
    photo_url TEXT,
    id_number VARCHAR(50),
    date_of_birth DATE,
    gender VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Plans
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    duration_days INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'expired', 'cancelled', 'frozen')),
    price_paid DECIMAL(10,2),
    is_renewal BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    check_in TIMESTAMP NOT NULL,
    check_out TIMESTAMP,
    scanned_by UUID REFERENCES users(id),
    device_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (check_in);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'bank_transfer', 'visa', 'instapay', 'vodafone_cash')),
    reference_number VARCHAR(100),
    notes TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trainers
CREATE TABLE trainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
    specialty VARCHAR(255),
    bio TEXT,
    commission_rate DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trainer Clients
CREATE TABLE trainer_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID REFERENCES trainers(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    total_sessions INTEGER NOT NULL,
    remaining_sessions INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trainer Sessions
CREATE TABLE trainer_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_client_id UUID REFERENCES trainer_clients(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gym Settings & Feature Toggles
CREATE TABLE gym_settings (
    gym_id UUID PRIMARY KEY REFERENCES gyms(id) ON DELETE CASCADE,
    alert_days_before_expiry INTEGER DEFAULT 3,
    receipt_footer TEXT,
    enable_online_registration BOOLEAN DEFAULT false,
    enable_membership_freeze BOOLEAN DEFAULT false,
    enable_online_freeze_request BOOLEAN DEFAULT false,
    enable_self_cancellation BOOLEAN DEFAULT false,
    enable_referral_system BOOLEAN DEFAULT false,
    enable_guest_passes BOOLEAN DEFAULT false,
    enable_class_booking BOOLEAN DEFAULT false,
    enable_online_payments BOOLEAN DEFAULT false,
    enable_auto_renewal BOOLEAN DEFAULT false,
    enable_trainer_commission BOOLEAN DEFAULT false,
    enable_birthday_rewards BOOLEAN DEFAULT false,
    enable_waitlist BOOLEAN DEFAULT false,
    enable_check_out BOOLEAN DEFAULT false,
    enable_visit_limits BOOLEAN DEFAULT false,
    enable_time_restrictions BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies (Example)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY gym_isolation ON members
    USING (gym_id = current_setting('app.current_gym_id')::UUID);
```

---

## 7. API Endpoints

### 7.1 Authentication

```
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### 7.2 Gym Management (Super Admin)

```
GET    /api/v1/admin/gyms
POST   /api/v1/admin/gyms
GET    /api/v1/admin/gyms/:id
PUT    /api/v1/admin/gyms/:id
DELETE /api/v1/admin/gyms/:id
GET    /api/v1/admin/dashboard
```

### 7.3 Gym Operations (Gym Admin)

```
GET    /api/v1/gyms/:gymId/dashboard
PUT    /api/v1/gyms/:gymId/settings

# Branches
GET    /api/v1/gyms/:gymId/branches
POST   /api/v1/gyms/:gymId/branches
GET    /api/v1/gyms/:gymId/branches/:branchId
PUT    /api/v1/gyms/:gymId/branches/:branchId
DELETE /api/v1/gyms/:gymId/branches/:branchId

# Users (Staff/Trainers)
GET    /api/v1/gyms/:gymId/users
POST   /api/v1/gyms/:gymId/users
GET    /api/v1/gyms/:gymId/users/:userId
PUT    /api/v1/gyms/:gymId/users/:userId
DELETE /api/v1/gyms/:gymId/users/:userId
```

### 7.4 Members

```
GET    /api/v1/gyms/:gymId/members
POST   /api/v1/gyms/:gymId/members
GET    /api/v1/gyms/:gymId/members/:memberId
PUT    /api/v1/gyms/:gymId/members/:memberId
DELETE /api/v1/gyms/:gymId/members/:memberId
GET    /api/v1/gyms/:gymId/members/search?q=
GET    /api/v1/gyms/:gymId/members/by-barcode/:barcode
POST   /api/v1/gyms/:gymId/members/:memberId/photo
```

### 7.5 Subscriptions

```
GET    /api/v1/gyms/:gymId/subscription-plans
POST   /api/v1/gyms/:gymId/subscription-plans
PUT    /api/v1/gyms/:gymId/subscription-plans/:planId
DELETE /api/v1/gyms/:gymId/subscription-plans/:planId

GET    /api/v1/gyms/:gymId/subscriptions
POST   /api/v1/gyms/:gymId/subscriptions
GET    /api/v1/gyms/:gymId/subscriptions/:subscriptionId
PUT    /api/v1/gyms/:gymId/subscriptions/:subscriptionId/renew
PUT    /api/v1/gyms/:gymId/subscriptions/:subscriptionId/cancel
GET    /api/v1/gyms/:gymId/subscriptions/expiring
GET    /api/v1/gyms/:gymId/members/:memberId/subscriptions
```

### 7.6 Attendance

```
POST   /api/v1/attendance/scan
GET    /api/v1/gyms/:gymId/attendance/today
GET    /api/v1/gyms/:gymId/attendance
GET    /api/v1/gyms/:gymId/members/:memberId/attendance
GET    /api/v1/gyms/:gymId/branches/:branchId/attendance
POST   /api/v1/attendance/:attendanceId/checkout
```

### 7.7 Payments

```
GET    /api/v1/gyms/:gymId/payments
POST   /api/v1/gyms/:gymId/payments
GET    /api/v1/gyms/:gymId/payments/:paymentId
GET    /api/v1/gyms/:gymId/payments/summary
GET    /api/v1/gyms/:gymId/payments/daily
GET    /api/v1/gyms/:gymId/payments/monthly
POST   /api/v1/gyms/:gymId/payments/:paymentId/invoice
```

### 7.8 Trainers

```
GET    /api/v1/gyms/:gymId/trainers
POST   /api/v1/gyms/:gymId/trainers
GET    /api/v1/gyms/:gymId/trainers/:trainerId
PUT    /api/v1/gyms/:gymId/trainers/:trainerId
DELETE /api/v1/gyms/:gymId/trainers/:trainerId

# Trainer Clients
GET    /api/v1/trainers/:trainerId/clients
POST   /api/v1/trainers/:trainerId/clients
GET    /api/v1/trainers/:trainerId/clients/:clientId
POST   /api/v1/trainers/:trainerId/clients/:clientId/sessions
GET    /api/v1/trainers/:trainerId/sessions
```

### 7.9 Reports

```
GET    /api/v1/gyms/:gymId/reports/attendance
GET    /api/v1/gyms/:gymId/reports/revenue
GET    /api/v1/gyms/:gymId/reports/members
GET    /api/v1/gyms/:gymId/reports/subscriptions
GET    /api/v1/gyms/:gymId/reports/trainers
GET    /api/v1/gyms/:gymId/reports/export
```

---

## 8. UI/UX Requirements

### 8.1 Design Principles

1. **Speed First:** Barcode scan must be instant
2. **Mobile-First:** Works perfectly on tablet at reception
3. **Clear Visual Feedback:** Green/red for active/expired
4. **Arabic First:** RTL layout default
5. **Offline Indicators:** Show when connection is lost

### 8.2 Key Screens

| Screen            | Priority | Description                |
| ----------------- | -------- | -------------------------- |
| Login             | P0       | Multi-role login           |
| Dashboard         | P0       | Overview stats             |
| Member List       | P0       | Search, filter, view       |
| Add Member        | P0       | Registration form + camera |
| Barcode Scan      | P0       | Camera scanner interface   |
| Subscription List | P1       | Manage subscriptions       |
| Payment Record    | P1       | Record payments            |
| Attendance Log    | P1       | Today's entries            |
| Reports           | P2       | Analytics views            |
| Settings          | P2       | Gym configuration          |

### 8.3 Barcode Scanner Interface

```
┌─────────────────────────────┐
│  📷 Camera View             │
│  [Barcode Scan Area]       │
├─────────────────────────────┤
│  Last Scan:                 │
│  ┌─────────────────────┐   │
│  │ 👤 [Member Photo]   │   │
│  │ Ahmed Hassan        │   │
│  │ 🟢 ACTIVE (15 days) │   │
│  └─────────────────────┘   │
├─────────────────────────────┤
│  [Manual Barcode Input]    │
└─────────────────────────────┘
```

### 8.4 Color Scheme

- **Success (Active):** `#22C55E` (Green)
- **Error (Expired):** `#EF4444` (Red)
- **Warning (Expiring Soon):** `#F59E0B` (Yellow)
- **Primary:** `#3B82F6` (Blue)
- **Background:** `#F8FAFC` (Light gray)

---

## 9. Security Requirements

### 9.1 Authentication (Better Auth)

- **Better Auth** handles all authentication
- Session-based authentication with secure cookies
- 2FA support: Email OTP, TOTP (Authenticator apps)
- Password requirements: 8+ chars, mixed case, number
- Account lockout after 5 failed attempts (15 min)
- Force password change on first login
- Social login ready (Google, Facebook) - optional
- Passwordless login (magic links) - optional

### 9.2 Authorization

```
Super Admin: Can access any gym's data
Gym Admin: Can only access their gym's data
Staff: Can only access assigned branches
Trainer: Can only access their clients
```

### 9.3 Data Protection

- All passwords hashed (bcrypt, cost 12)
- Sensitive data encrypted at rest
- HTTPS only (TLS 1.3)
- API rate limiting: 100 req/min per IP, 1000 req/min per gym
- SQL injection prevention via parameterized queries
- XSS prevention via output encoding
- CSRF tokens for state-changing operations

### 9.4 Audit Logging

Log all:

- Login/logout events
- Member data changes
- Payment transactions
- Subscription modifications
- Settings changes

---

## 10. MVP Scope

### 10.1 Phase 1: Core Platform (Weeks 1-6)

**Must Have:**

- [ ] Multi-tenant architecture
- [ ] Super Admin gym management
- [ ] Gym Admin dashboard
- [ ] Member CRUD + barcode generation
- [ ] Subscription plans management
- [ ] Subscription assignment
- [ ] Barcode attendance scanning
- [ ] Payment recording
- [ ] Basic reports (daily attendance, revenue)
- [ ] Arabic/English support

**Tech:**

- Node.js + Express + TypeScript
- PostgreSQL with RLS
- React + Tailwind
- JWT auth

### 10.2 Phase 2: Trainer System (Weeks 7-10)

- [ ] Trainer management
- [ ] Trainer-Client assignment
- [ ] Session tracking
- [ ] Progress notes
- [ ] Trainer dashboard

### 10.3 Phase 3: Notifications & Polish (Weeks 11-14)

- [ ] SMS notifications (expiry alerts)
- [ ] WhatsApp integration
- [ ] Email invoices
- [ ] Advanced reports
- [ ] Export functionality
- [ ] Feature toggles UI

### 10.4 Phase 4: Advanced Features (Future)

- [ ] Class scheduling
- [ ] Waitlist management
- [ ] Referral system
- [ ] Lead CRM
- [ ] Mobile apps
- [ ] Online payments

---

## 11. Release Phases

| Phase | Timeline | Features                    | Target Users     |
| ----- | -------- | --------------------------- | ---------------- |
| Alpha | Week 4   | Core features, single gym   | Internal testing |
| Beta  | Week 8   | + Trainer system, 5 gyms    | Early adopters   |
| v1.0  | Week 14  | + Notifications, 20 gyms    | General release  |
| v1.5  | Month 6  | + Class scheduling, 50 gyms | Growth           |
| v2.0  | Month 12 | + Mobile apps, 200 gyms     | Scale            |

---

## 12. Success Metrics

### 12.1 Platform Metrics

| Metric            | Target (6 months) | Target (12 months) |
| ----------------- | ----------------- | ------------------ |
| Registered Gyms   | 20                | 100                |
| Active Members    | 2,000             | 15,000             |
| Daily Check-ins   | 1,000             | 8,000              |
| System Uptime     | 99.5%             | 99.9%              |
| API Response Time | <300ms            | <200ms             |

### 12.2 Business Metrics

| Metric                    | Target      |
| ------------------------- | ----------- |
| Monthly Recurring Revenue | EGP 100,000 |
| Average Gym Retention     | 90%         |
| Churn Rate                | <5%/month   |
| Support Tickets/Gym       | <2/month    |

### 12.3 User Satisfaction

| Metric                    | Target     |
| ------------------------- | ---------- |
| NPS Score                 | >50        |
| Barcode Scan Success Rate | >99%       |
| Time to Check-in          | <3 seconds |
| Report Load Time          | <5 seconds |

---

## Appendix A: Glossary

| Term               | Definition                                    |
| ------------------ | --------------------------------------------- |
| **Gym**            | A single fitness facility using the platform  |
| **Branch**         | A location of a gym (gyms can have multiple)  |
| **Member**         | A person with a gym subscription              |
| **Subscription**   | An active membership with start/end dates     |
| **Attendance**     | A check-in event by a member                  |
| **Trainer**        | A gym employee who provides personal training |
| **Trainer Client** | A member assigned to a specific trainer       |
| **Barcode**        | Unique identifier for member check-in         |

---

## Appendix B: Third-Party Services

| Service               | Purpose                |
| --------------------- | ---------------------- |
| CEQUENS / Vodafone    | SMS Gateway            |
| WhatsApp Business API | WhatsApp notifications |
| SendGrid              | Transactional emails   |
| Cloudflare R2         | File storage           |
| Cloudflare            | CDN + DDoS protection  |

---

_Document Version: 1.0_  
_Next Review: After MVP Phase 1 completion_
