<div align = "center">
<h1>BudgetBee: A Student-First Fintech App for Expense Tracking, Savings, and Micro-Investing</h1>
</div>

<p align="center">
  <a href="./Fintech_Case_Study.pdf">
    <img src="https://img.shields.io/badge/Case%20Study-PDF-red" alt="Case Study">
  </a>
  <a href="#prototype">
    <img src="https://img.shields.io/badge/Prototype-Figma-orange" alt="Prototype">
  </a>
  <a href="#market-landscape">
    <img src="https://img.shields.io/badge/Market-India%20Student%20Fintech-blue" alt="Market">
  </a>
</p>

<div align = "center">
<b>Parth Goyal</b>
</div>

---

## Tagline

**So Money doesn't hassle in your side hustle!!**

---

## Table of Contents

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Market Landscape](#market-landscape)
4. [User Research](#user-research)
5. [User Persona](#user-persona)
6. [Solution](#solution)
7. [Prototype](#prototype)
8. [Success Metrics](#success-metrics)
9. [GTM & Monetisation](#gtm--monetisation)
10. [Unit Economics](#unit-economics)
11. [Repository Structure](#repository-structure)
12. [Future Work](#future-work)
13. [Author](#author)

---

## Overview

**BudgetBee** is a student-focused fintech concept designed to help Indian college students track expenses, split group costs, set savings goals, and take their first steps into micro-investing — all with minimal manual effort. The product is positioned to fill a clear gap left by existing apps (Splitwise, Fold, Jupiter, CRED, Fi), none of which are purpose-built for the irregular, peer-driven, low-income financial lives of students.

This repository documents the end-to-end product case study: market sizing, user research, persona development, feature prioritization (RICE), prototype flows, success metrics, and go-to-market/monetisation strategy.

---

## Problem Statement

Indian college students struggle with unpredictable income, a lack of simple spend tracking, and messy group settlements — leading to overspending, low savings, and financial stress, with no fintech product targeting them directly.

**Root cause chain (5 Whys):**

| Question | Insight |
|---|---|
| Why do students run out of money mid-month? | They lack visibility into where money goes. |
| Why no visibility? | They don't maintain detailed records of daily expenses. |
| Why not? | Manual logging feels tedious for frequent, small, multi-channel transactions. |
| Why don't existing tools help? | Generic, effort-heavy apps don't fit irregular student money flows (splits, gigs, gifts, impulse spends). |
| Why is this critical now? | Digital payments and gig income are growing faster than student-focused financial tooling. |

---

## Market Landscape

| | |
|---|---|
| **Segment** | Indian Student-Focused Fintech Market |
| **Current Size (FY26)** | ₹4,643 cr |
| **Projected Growth (by 2030)** | ₹6,790 cr |

### Guesstimate — Impact Sizing

| Layer | Value | Basis |
|---|---:|---|
| **TAM** | 143 Mn | India population 1.46B; age 18–24 (~10%) |
| **SAM** | 65 Mn | Smartphone penetration (~90% → 129M) × financial challenge/interest (~50%) |
| **SOM** | 195K – 390K | 15% reach of SAM (~9.75M) → 10–20% install conversion (~975K–1.95M) → 20–40% retained MAU |

### Competitive Gap Analysis

| Category | Splitwise | Fold | Jupiter | CRED | Fi |
|---|---|---|---|---|---|
| **Key Offerings** | Group expense tracker; settle-up | SMS spend tracking, BNPL/credit, FDs | Neobank with UPI, Pots, rewards | Credit card bill pay + rewards | Digital bank; spend insights; travel perks |
| **Positioning** | Money manager + credit access | Spend + credit in one app | Lifestyle banking for young pros | Premium brand for "creditworthy" | Insight-driven neobank |
| **Target Segment** | Friends/roommates; not student-first | Mass retail Android; not student-first | Salaried/early earners | High-income, credit users | Urban, salaried pros |
| **Revenue Model** | Freemium + Pro upsells | Credit/loans; FD distribution | Interchange + premium features | Payments/UPI + brand tie-ups | Interchange + cross-sell (invest/FX) |
| **Actionable Gap** | No peer-pressure controls; free use capped | No social context; credit-heavy; unsafe for students | No peer/campus flows; lacks student budgeting | Not student-relevant (credit card bias) | Insights ≠ action; lacks student guardrails |

**BudgetBee's positioning:** actionable savings goals and hassle-free expense tracking for true financial control — built student-first from day one.

---

## User Research

Analysis of user reviews and survey data on top money challenges (n via review mining):

| Challenge | Share |
|---|---:|
| Savings | 24.7% |
| Loans | 25.7% |
| Budgeting | 13.1% |
| Lack of tools | 13.1% |
| Tracking expenses | 11.8% |
| Others | 11.6% |

**Key findings:**
- **Loan & Savings Challenges** — 40% of users report difficulty managing loans and building savings.
- **Daily Money Management Issues** — 20% struggle with tracking, splitting, budgeting, and lack of effective tools.

### Segmentation (Financial Literacy × Spending Consciousness)

| Quadrant | Profile | Behaviors |
|---|---|---|
| Unaware & Carefree | Low literacy, low consciousness | Overspending, peer pressure, no bank account |
| Conscious but Confused | Low–Med literacy, high consciousness | Saving, tracking, lack of tools, no emergency fund |
| Aware but Inconsistent | Med–High literacy, medium consciousness | Side income, budgeting, rent sharing |
| Financially Mature | High literacy, high consciousness | Loans, disciplined saving |

---

## User Persona

**Rohit — 21-year-old Student, Nagpur**

| Attribute | Detail |
|---|---|
| Allowance | ₹8,000/month |
| Daily Spend | ~₹100 |
| Loan | ₹2,000/month (mobile phone EMI) |
| Aspiration | Wants to buy a high-cost gaming laptop |

**Pain Points:** No clarity on where money goes; forgets loan EMIs and overspends; negligible savings and no emergency backup; struggles to stay disciplined.

**Needs:** Automatic expense categorization, clear loan tracking + reminders, weekend safe-to-spend nudges, savings goal tracking, and an easy path into small-ticket investing.

---

## Solution

### Why This Problem Matters, Why Now

Students lack tools to track and categorize expenses, leading to overspending, debt cycles, missed savings, and financial stress. 80% of students in the research dataset use financial tools yet struggle with consistency — confirming real, validated demand. India's personal finance market is booming (**$46B+**), and UPI-driven digital payments make this the right moment for a student-first, low-effort solution.

### Top Features (RICE-Prioritized)

| Feature | Description | Impact | Confidence | Effort | Validation | RICE Score |
|---|---|---:|---:|---:|---:|---:|
| **EduSave Goals** | Set and track savings goals with reminders and progress visuals | 5 | 5 | 2 | 5 | **100** |
| **EduSplit** | Split and settle group expenses using college email IDs / QR codes | 3 | 4 | 3 | 4 | 32 |
| **EduTrack SMS** | Auto-tracks expenses via SMS parsing, AI-categorized | 2 | 4 | 4 | 3 | 18 |

*RICE formula used: `(Impact × Confidence × (Validation + Differentiation)) / Effort`*

---

## Prototype

The clickable prototype covers the core flows: **Onboarding → Dashboard (Home) → Goal Setup → Activity → SplitGroup → Wealth.**

- **Onboarding** — grants SMS access so AI can auto-categorize transactions with zero manual entry.
- **Home/Dashboard** — wallet balance up front, savings goals as MVP centerpiece, quick actions for transactions, goals, and groups.
- **Goal Setup** — guided 4-step flow (category → amount → timeline → confirm).
- **Activity** — full transaction history, auto-parsed from SMS, with custom categorization.
- **SplitGroup** — divide group expenses via college ID or QR code scan.
- **Wealth** — AI-personalized investment suggestions tied to savings goals, integrated with affiliate investment partners.

---

## Success Metrics

**North Star Metric:** Number of successful student investments made through BudgetBee per month.

| L0 Metric | Category | L1 Metrics |
|---|---|---|
| Active Student Users per Month | Adoption | App Install Rate, MAU Growth Rate, Churn Rate, Retention (D7/D30) |
| % Students Creating Saving Goals | Engagement | Avg. goals per user, % Goal completion, Saving Consistency Rate, Drop-off in Goal Creation |
| Saving-to-Investment Transition Rate | Conversion | % Completing KYC, Investment Completion Rate, Avg. Commission per Investment, Investment Drop-off Rate |

**Stakeholders:** College students (manage pocket money, grow savings), Investment Partners — Jar, Groww, ET Money, Nibble (onboard young users, build loyalty), and BudgetBee itself (trusted financial buddy, commission-based revenue).

---

## GTM & Monetisation

### Revenue Model
- **Affiliate-based revenue** — partner with student-relevant financial, investment, and lifestyle brands; commissions triggered on signup, invest, or referral-based purchase.
- Offers surfaced naturally after key actions (goal completion, expense tracking milestones).
- **No subscriptions or in-app purchases for students.**

### Distribution Channels

| Channel | Why It Fits | Funnel Stage |
|---|---|---|
| WhatsApp group links | Splits = social action, viral CTA | Acquisition + Referral |
| College email IDs | Every student has one | Acquisition |
| Campus Ambassadors | Peer-driven trust | Acquisition + Retention |
| Instagram reels/memes | Relatable money moments | Acquisition |
| Referral via savings | Splits = natural referral loop | Referral |
| In-app nudges | Convert spare change into SIP | Revenue |

### AARRR Viral Loop (Example)

**Acquisition** → Vedant creates a split → Nikhil gets the link (WhatsApp/college email) → **Activation** → Nikhil installs with auto-filled group ID → **Retention** → Sees split history + goal suggestion, creates own goal → **Referral** → Makes his own split, generating new invites → **Revenue** → Invests spare ₹50 via SIP; BudgetBee earns commission.

**GTM Summary:** Splits = distribution engine · Goals = retention engine · Investments = monetisation engine · Campus culture = growth engine.

---

## Unit Economics

**Per 1,000 MAU:**

| Step | Description | Formula | Value |
|---|---|---|---:|
| Impressions | Investment cards shown | 1,000 | 1,000 |
| Clicks | Click-through (10%) | 1,000 × 10% | 100 |
| Onboarded | Completed KYC/signup (5% of clickers) | 100 × 5% | 5 |
| Funded | Funded account (80% of onboarded) | 5 × 80% | 4 |
| Revenue | CPA earned per funded (₹300 assumed) | 4 × ₹300 | **₹1,200** |

**Sensitivity:** Improving CTR to 15% and onboarding to 10% raises funded accounts to ~7 and revenue to ~₹2,100 per 1,000 MAU.

---

## Repository Structure

```text
.
├── Fintech_Case_Study.pdf     # Full BudgetBee case study deck
├── README.md                  # This file
└── assets/
    └── (deck exports / screenshots referenced above)
```

---

## Future Work

- Build out the SIP/micro-investment affiliate integration with live partners (Jar, Groww, ET Money, Nibble).
- Pilot college partnerships (B2B2C) via student unions, hostels, and clubs for bulk onboarding.
- Expand EduTrack SMS parsing accuracy and category personalization using on-device AI.
- Layer in gamified savings streaks and peer leaderboard mechanics to boost retention.

---

## Author

- **Parth Goyal**
