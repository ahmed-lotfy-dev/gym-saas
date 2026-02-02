# WhatsApp Integration Guide 📱

In the Egypt & Gulf markets, WhatsApp is the primary communication channel. This guide outlines how Gym SaaS integrates with the WhatsApp Business API.

## 🔗 Architecture Overview

We use a **Webhook-based** system to send and receive messages.

1.  **Gym SaaS API** triggers an event (e.g., Subscription Expired).
2.  **Notification Worker** selects the appropriate WhatsApp template.
3.  **Provider API** (Twilio / CEQUENS / Infobip) sends the message.
4.  **Status Callback** updates the message status (Sent, Delivered, Read).

## 📋 Key Use Cases

### 1. Welcome Message
- **Trigger**: New member registration.
- **Goal**: Send a digital membership card (PNG with barcode) and gym location.

### 2. Expiry Alerts (P0)
- **T-3 Days**: Friendly reminder to renew.
- **Expiration Day**: Notification of block/expiration.
- **T+7 Days**: Win-back offer.

### 3. Payment Receipts
- **Trigger**: Recorded payment.
- **Goal**: Send PDF invoice link automatically.

### 4. PT Session Confirmations
- **Trigger**: Trainer records a session.
- **Goal**: Confirm remaining sessions to the member.

## 🛠️ Providers for Egypt/Gulf

| Provider | Best For | Why? |
| :--- | :--- | :--- |
| **CEQUENS** | Egypt | Local carrier relations, competitive EGP pricing. |
| **Infobip** | Gulf (KSA/UAE) | Massive regional presence, high reliability. |
| **Twilio** | International | Developer-friendly, but more expensive in MENA. |

## 📦 Implementation Checklist

- [ ] **FB Business Verification**: Required for official WhatsApp Business API.
- [ ] **Template Approval**: Register HSM (Highly Structured Messages) templates with Meta.
- [ ] **Opt-in Management**: Ensure members agree to receive WhatsApp messages during registration.
- [ ] **Fallback System**: If WhatsApp fails, fallback to SMS or Email.

---
_Reference: [PRD.md](./PRD.md) Section 4.1_
