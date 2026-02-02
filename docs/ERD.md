# Gym SaaS - Entity Relationship Diagram (ERD)

> **Note:** To view this Mermaid diagram in VS Code:
>
> 1. Install **"Markdown Preview Enhanced"** extension
> 2. Open this file and press **Ctrl+Shift+V** (or Cmd+Shift+V on Mac)
> 3. The diagram will render automatically

## Visual Diagram (Mermaid)

```mermaid
erDiagram
    GYM {
        uuid id PK
        string name
        text address
        string phone
        string email
        string logoUrl
        string currency
        string timezone
        boolean isActive
        timestamp createdAt
    }

    BRANCH {
        uuid id PK
        uuid gymId FK
        string name
        text address
        string phone
        boolean isActive
    }

    USER {
        uuid id PK
        uuid gymId FK
        uuid branchId FK
        string email
        string passwordHash
        string fullName
        string phone
        enum role
        boolean isActive
        timestamp lastLogin
        timestamp createdAt
    }

    TRAINER {
        uuid id PK
        uuid userId FK
        uuid gymId FK
        string specialty
        text bio
        decimal commissionRate
        boolean isActive
    }

    MEMBER {
        uuid id PK
        uuid gymId FK
        uuid branchId FK
        string fullName
        string phone
        string email
        string barcode
        string photoUrl
        string idNumber
        date dateOfBirth
        enum gender
        boolean isActive
        timestamp createdAt
    }

    SUBSCRIPTION_PLAN {
        uuid id PK
        uuid gymId FK
        string name
        int durationDays
        decimal price
        text description
        boolean isActive
    }

    SUBSCRIPTION {
        uuid id PK
        uuid gymId FK
        uuid memberId FK
        uuid planId FK
        date startDate
        date endDate
        enum status
        decimal pricePaid
        boolean isRenewal
        timestamp createdAt
    }

    SUBSCRIPTION_PAUSE {
        uuid id PK
        uuid subscriptionId FK
        date startDate
        date endDate
        string reason
        uuid approvedBy FK
    }

    TRAINER_CLIENT {
        uuid id PK
        uuid trainerId FK
        uuid memberId FK
        int totalSessions
        int remainingSessions
        date startDate
        date endDate
        boolean isActive
    }

    TRAINER_SESSION {
        uuid id PK
        uuid trainerClientId FK
        date sessionDate
        text notes
        timestamp createdAt
    }

    TRAINER_NOTE {
        uuid id PK
        uuid trainerClientId FK
        string note
        timestamp createdAt
    }

    ATTENDANCE {
        uuid id PK
        uuid gymId FK
        uuid branchId FK
        uuid memberId FK
        uuid scannedBy FK
        timestamp checkIn
        timestamp checkOut
        string deviceId
        timestamp createdAt
    }

    PAYMENT {
        uuid id PK
        uuid gymId FK
        uuid memberId FK
        uuid subscriptionId FK
        uuid recordedBy FK
        decimal amount
        enum paymentMethod
        string referenceNumber
        text notes
        timestamp createdAt
    }

    NOTIFICATION {
        uuid id PK
        uuid gymId FK
        uuid memberId FK
        enum type
        string message
        boolean isRead
        timestamp sentAt
    }

    LEAD {
        uuid id PK
        uuid gymId FK
        uuid assignedTo FK
        string name
        string phone
        string email
        enum source
        enum status
        timestamp followUpDate
        text notes
        uuid convertedToMemberId FK
    }

    CLASS_SCHEDULE {
        uuid id PK
        uuid gymId FK
        uuid branchId FK
        uuid trainerId FK
        string name
        enum dayOfWeek
        time startTime
        int duration
        int maxCapacity
        decimal price
    }

    CLASS_BOOKING {
        uuid id PK
        uuid classScheduleId FK
        uuid memberId FK
        date bookingDate
        enum status
    }

    CLASS_WAITLIST {
        uuid id PK
        uuid classScheduleId FK
        uuid memberId FK
        timestamp joinDate
        int priority
        timestamp notifiedAt
        enum status
    }

    GYM_SETTINGS {
        uuid gymId PK
        int alertDaysBeforeExpiry
        text receiptFooter
        boolean enableOnlineRegistration
        boolean enableMembershipFreeze
        boolean enableOnlineFreezeRequest
        boolean enableSelfCancellation
        boolean enableReferralSystem
        boolean enableGuestPasses
        boolean enableClassBooking
        boolean enableOnlinePayments
        boolean enableAutoRenewal
        boolean enableTrainerCommission
        boolean enableBirthdayRewards
        boolean enableWaitlist
        boolean enableCheckOut
        boolean enableVisitLimits
        boolean enableTimeRestrictions
    }

    GYM ||--o{ BRANCH : has
    GYM ||--o{ USER : employs
    GYM ||--o{ MEMBER : contains
    GYM ||--o{ SUBSCRIPTION_PLAN : defines
    GYM ||--|| GYM_SETTINGS : configures
    GYM ||--o{ LEAD : tracks
    GYM ||--o{ CLASS_SCHEDULE : offers

    BRANCH ||--o{ USER : assigns
    BRANCH ||--o{ MEMBER : registers_at
    BRANCH ||--o{ ATTENDANCE : records

    USER ||--|| TRAINER : extends
    USER ||--o{ ATTENDANCE : scans
    USER ||--o{ PAYMENT : records
    USER ||--o{ LEAD : assigned
    USER ||--o{ SUBSCRIPTION_PAUSE : approves

    TRAINER ||--o{ TRAINER_CLIENT : manages
    TRAINER ||--o{ CLASS_SCHEDULE : teaches

    MEMBER ||--o{ SUBSCRIPTION : owns
    MEMBER ||--o{ ATTENDANCE : records
    MEMBER ||--o{ PAYMENT : makes
    MEMBER ||--o{ NOTIFICATION : receives
    MEMBER ||--o{ TRAINER_CLIENT : trains_with
    MEMBER ||--o{ CLASS_BOOKING : books
    MEMBER ||--o{ CLASS_WAITLIST : waits

    SUBSCRIPTION_PLAN ||--o{ SUBSCRIPTION : used_for
    SUBSCRIPTION ||--o{ SUBSCRIPTION_PAUSE : frozen

    TRAINER_CLIENT ||--o{ TRAINER_SESSION : has
    TRAINER_CLIENT ||--o{ TRAINER_NOTE : has

    CLASS_SCHEDULE ||--o{ CLASS_BOOKING : has
    CLASS_SCHEDULE ||--o{ CLASS_WAITLIST : has
```

---

## Entity Descriptions

### Core Entities

| Entity     | Description                                                                   | Primary Key | Key Relations                     |
| ---------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------- |
| **GYM**    | The tenant/root entity. Each gym is a separate customer of the SaaS platform. | `id` UUID   | Has many branches, users, members |
| **BRANCH** | Physical location of a gym. A gym can have multiple branches.                 | `id` UUID   | Belongs to GYM                    |
| **USER**   | System users across all roles (Super Admin, Gym Admin, Staff, Trainer)        | `id` UUID   | Belongs to GYM and BRANCH         |

### Member Management

| Entity                 | Description                                | Primary Key | Key Relations                         |
| ---------------------- | ------------------------------------------ | ----------- | ------------------------------------- |
| **MEMBER**             | Gym members who use the facility           | `id` UUID   | Has subscriptions, attendance records |
| **SUBSCRIPTION_PLAN**  | Template packages (Monthly, Yearly, etc.)  | `id` UUID   | Belongs to GYM                        |
| **SUBSCRIPTION**       | Active membership linking member to a plan | `id` UUID   | Links MEMBER + PLAN                   |
| **SUBSCRIPTION_PAUSE** | Freeze records for paused memberships      | `id` UUID   | Belongs to SUBSCRIPTION               |

### Attendance & Payments

| Entity         | Description                | Primary Key | Key Relations               |
| -------------- | -------------------------- | ----------- | --------------------------- |
| **ATTENDANCE** | Check-in/check-out records | `id` UUID   | Links MEMBER + BRANCH       |
| **PAYMENT**    | Financial transactions     | `id` UUID   | Links MEMBER + SUBSCRIPTION |

### Trainer System

| Entity              | Description                     | Primary Key | Key Relations             |
| ------------------- | ------------------------------- | ----------- | ------------------------- |
| **TRAINER**         | Trainer profile extending USER  | `id` UUID   | One-to-one with USER      |
| **TRAINER_CLIENT**  | Link between trainer and member | `id` UUID   | Links TRAINER + MEMBER    |
| **TRAINER_SESSION** | Individual training sessions    | `id` UUID   | Belongs to TRAINER_CLIENT |
| **TRAINER_NOTE**    | Progress notes for clients      | `id` UUID   | Belongs to TRAINER_CLIENT |

### Class Management

| Entity             | Description               | Primary Key | Key Relations           |
| ------------------ | ------------------------- | ----------- | ----------------------- |
| **CLASS_SCHEDULE** | Recurring class templates | `id` UUID   | Belongs to GYM + BRANCH |
| **CLASS_BOOKING**  | Member reservations       | `id` UUID   | Links MEMBER + SCHEDULE |
| **CLASS_WAITLIST** | Waitlist for full classes | `id` UUID   | Links MEMBER + SCHEDULE |

### Additional

| Entity           | Description                       | Primary Key  | Key Relations       |
| ---------------- | --------------------------------- | ------------ | ------------------- |
| **GYM_SETTINGS** | Feature toggles and configuration | `gymId` UUID | One-to-one with GYM |
| **NOTIFICATION** | System notifications to members   | `id` UUID    | Belongs to MEMBER   |
| **LEAD**         | Potential members (CRM)           | `id` UUID    | Belongs to GYM      |

---

## Key Relationships Explained

### 1. Multi-Tenancy Pattern

```

GYM (tenant)
├── BRANCH 1
├── BRANCH 2
├── USER (Gym Admin)
├── USER (Staff at Branch 1)
├── MEMBER 1 (registered at Branch 1)
├── MEMBER 2 (registered at Branch 2)
└── SUBSCRIPTION_PLAN (Monthly)
└── SUBSCRIPTION (Member 1)

```

Every entity has a `gymId` foreign key for tenant isolation.

### 2. User Role Hierarchy

```

SUPER_ADMIN (platform level)
└── Can access all gyms

GYM_ADMIN (gym level)
├── Can access all branches
└── Assigned to GYM

STAFF (branch level)
└── Assigned to specific BRANCH

TRAINER (gym level)
└── Linked to MEMBERs via TRAINER_CLIENT

```

### 3. Subscription Lifecycle

```

MEMBER
└── SUBSCRIPTION (active)
├── SUBSCRIPTION_PLAN (Monthly)
├── PAYMENT (EGP 500)
└── SUBSCRIPTION_PAUSE (optional, if frozen)
├── startDate
├── endDate
└── reason: "Travel"

```

### 4. Attendance Flow

```

MEMBER (scans barcode)
└── ATTENDANCE
├── branchId (where they checked in)
├── checkIn (timestamp)
├── checkOut (optional)
├── scannedBy (USER who scanned)
└── deviceId (scanner identifier)

```

### 5. Trainer System Flow

```

TRAINER (User with role=TRAINER)
└── TRAINER_CLIENT (Member assigned)
├── totalSessions: 10
├── remainingSessions: 7
└── TRAINER_SESSION (completed session)
├── sessionDate
└── notes: "Good progress"

```

---

## Indexes for Performance

```sql
-- For barcode scanning (critical path)
CREATE INDEX idx_members_barcode ON members(barcode);
CREATE INDEX idx_members_gym_id ON members(gymId);

-- For today's attendance queries
CREATE INDEX idx_attendance_check_in ON attendance(checkIn);
CREATE INDEX idx_attendance_gym_id ON attendance(gymId);
CREATE INDEX idx_attendance_branch_id ON attendance(branchId);

-- For subscription lookups
CREATE INDEX idx_subscriptions_member_id ON subscriptions(memberId);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(endDate);

-- For payment reports
CREATE INDEX idx_payments_gym_id ON payments(gymId);
CREATE INDEX idx_payments_created_at ON payments(createdAt);

-- For trainer lookups
CREATE INDEX idx_trainer_clients_trainer_id ON trainer_clients(trainerId);
CREATE INDEX idx_trainer_clients_member_id ON trainer_clients(memberId);
```

---

## Generating Visual Diagram

To generate a visual image from this Mermaid diagram:

### Option 1: Mermaid Live Editor

1. Visit: https://mermaid.live
2. Copy the Mermaid code above
3. Export as PNG/SVG/PDF

### Option 2: VS Code Extension (Recommended)

1. Install **"Markdown Preview Enhanced"** extension
2. Open this file in VS Code
3. Press **Ctrl+Shift+V** (or Cmd+Shift+V on Mac) to open preview
4. The diagram will render automatically
5. Right-click → "Save as Image" to export

### Option 3: CLI Tool

```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Generate PNG
mmdc -i ERD.md -o erd-diagram.png
```

### Option 4: Online Tools

- https://www.mermaidchart.com
- https://dbdiagram.io (can import SQL)

---

## Database Schema SQL

See [PRD.md](./PRD.md) Section 6 for complete SQL schema with:

- Table definitions
- Relationships
- Constraints
- RLS policies
- Partitioning setup

---

_Last Updated: 2026-02-02_
