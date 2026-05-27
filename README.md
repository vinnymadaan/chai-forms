# ⚡ Streamyst: Production-Grade Typeform-Style Form Builder SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![tRPC](https://img.shields.io/badge/tRPC-v11-25c2a0?style=for-the-badge&logo=trpc)](https://trpc.io/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-v0.30-c5f74f?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-336791?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**Streamyst** is a highly premium, production-ready, Typeform-inspired dynamic form builder SaaS monorepo built for speed, type safety, and extreme visual excellence. It features robust dynamic fields creation, visual theme styling, public response submission, real-time mathematical statistics analytics, and self-generating Scalar API interactive playgrounds.

---

## ✨ Primary Features

### 🛠️ Dynamic Multi-Field Form Builder
Creators can build dynamic form schemas using 8 fully featured question input types:
*   **Short Text & Long Text** (customizable placeholders)
*   **Email & Number** (with strict formatting constraints)
*   **Single Select & Multi Select** (dynamic comma-separated options builder UI)
*   **Star Rating** (interactive 1-to-5 star scale selector)
*   **Calendar Date Picker** (native date validation)

### 📊 Dynamic Submissions & Math Analytics Dashboard
Instead of viewing raw data arrays, creators have a unified **Submissions** center containing:
*   **All Responses Tab:** Chronological logs of every individual submission, beautifully formatted with precise timestamps.
*   **Analytics Insights Tab:** Automatically analyzes submissions. For **Number** and **Rating** fields, it dynamically computes **Average**, **Minimum**, and **Maximum** values. For text inputs, it displays a scrollable log of individual entries.

### 🔒 SaaS-Grade Token Auth Pipeline
*   **Secure Session Cookies:** Encapsulates state inside secure, HTTP-only browser cookies using `httpOnly`, `secure: true`, and `sameSite` profiles.
*   **JWT Access Tokens:** Issues a 1-hour signed JWT access token for instant, stateless verification.
*   **JWT Refresh Tokens:** Issues a 30-day signed JWT refresh token for seamless background session prolonging.
*   **Database Sessions:** Pairs tokens with an query-optimized DB session table for instant logout revocations.

### 🌐 Public vs. Unlisted Visibility Modes
*   **Public Forms:** Indexed and visible to anyone in explore templates/galleries.
*   **Unlisted Forms:** Hidden from explore lists. Only accessible through direct links.
*   **Unpublished Drafts:** Gracefully handled with descriptive preview barriers and will not ingest public responses.

---

## 🔑 Demo Credentials (Immediate Judging Access)
To let you test the system instantly, the login flow comes with a premium **Demo Login** credential:
1. Navigate to `/login` (or try visiting `/dashboard` directly to invoke the automatic Auth Redirect Guard).
2. Enter any **Name** (e.g. `Judge`) and **Email** (e.g. `judge@streamyst.com`).
3. Click **Quick Demo Sign In**.
4. The system will automatically seed your profile, issue your secure cookies, and redirect you to your workspace!

---

## 📂 Project Directory Structure

```text
├── apps
│   ├── api          # Express backend serving tRPC routers & Scalar documentation
│   └── web          # Next.js App Router frontend client application
└── packages
    ├── database     # Drizzle ORM client, PG schema definitions & SQL migrations
    ├── schemas      # Shared frontend/backend Zod validation schemas
    ├── services     # Core business services (Auth verification, Form CRUD, Ingestion)
    └── trpc         # Shared tRPC server router configurations & procedure definitions
```

---

## 🛠️ Getting Started (Local Development)

### 1. Install Dependencies
Ensure you have `pnpm` installed globally:
```bash
pnpm install
```

### 2. Configure Environment Variables
Create an `.env` file inside `apps/api/.env` and specify:
```env
DATABASE_URL=postgresql://neondb_owner:... # Your PostgreSQL link
JWT_SECRET=streamyst-super-secret-jwt-signing-key-12345-very-long-and-secure
```

### 3. Run Development Servers
Start the full Monorepo environment:
```bash
pnpm dev
```
*   **Frontend web client:** `http://localhost:3000`
*   **Backend tRPC & Express API:** `http://localhost:10000`

### 4. Database Setup & Schema Management
Push schema designs to your cloud database with Drizzle:
```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Diagnostics & Type Safety Validation
Run rigorous workspace type checks to confirm compile stability:
```bash
pnpm check-types
```

---

## 📖 Scalar API Reference Portal
All endpoint schemas are compiled into an OpenAPI Specification and beautifully rendered for developer usage:
*   **OpenAPI Specs (JSON):** `http://localhost:10000/openapi.json`
*   **Interactive Reference Portal:** `http://localhost:10000/reference`
