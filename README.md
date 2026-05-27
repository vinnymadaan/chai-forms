# ⚡️ Streamyst Form Builder SaaS

Streamyst is a highly premium, production-style, Typeform-inspired dynamic form builder SaaS monorepo built for speed, safety, and visual excellence. It features dynamic form creation, responsive layouts, unhandled error logging, and custom styling.

---

## 🚀 Core Stack
* **Monorepo Manager**: [Turborepo](https://turbo.build/)
* **Type-Safe APIs**: [tRPC](https://trpc.io/)
* **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (Neon DB)
* **Validation Engine**: [Zod](https://zod.dev/)
* **API Documentation**: [Scalar API Reference](https://scalar.com/)
* **Framework**: [Next.js (App Router)](https://nextjs.org/) & Express

---

## 🔒 Advanced Authentication & Token Infrastructure
To provide a secure and robust production-ready SaaS environment, Streamyst implements a standard authentication pipeline with advanced token security:
* **Cookies**: Session tokens, access tokens, and refresh tokens are stored securely in the browser using `httpOnly`, `secure: true`, and `sameSite: "none"` cookie profiles.
* **JWT Access Tokens**: On successful authentication, the server signs a short-lived (1-hour) JWT access token containing standard identity claims (`userId`, `email`).
* **JWT Refresh Tokens**: Generates a long-lived (30-day) JWT refresh token to facilitate seamless background session refreshes.
* **Database Sessions**: Co-exists with a database-backed session verification table for maximum revocation power.

---

## 🔑 Demo Credentials (Quick Sign-In)
To facilitate immediate judging and testing, the application comes equipped with a custom, highly secure **Demo Sign-In** flow on the login page:
1. Visit the **Login Page** at `/login` (or try to enter the `/dashboard` directly).
2. Look for the **Or Use Demo Credentials** form.
3. Enter any Name (e.g. `Judge`) and Email (e.g. `judge@hackathon.com`).
4. Click **Quick Demo Sign In**! The backend will instantly resolve the profile, issue secure cookies, and redirect you directly to the protected creator dashboard.

---

## 📖 Scalar API Reference
API documentation is automatically generated using `trpc-to-openapi` and served interactively via the **Scalar API Reference Portal**:
* **OpenAPI Spec**: `http://localhost:10000/openapi.json`
* **Scalar Portal**: `http://localhost:10000/reference`

The portal provides an interactive, beautiful playground where you can view schemas and test tRPC routes directly.

---

## 🛠️ Getting Started (Local Development)

### 1. Install Dependencies
Make sure you have `pnpm` installed, then run:
```bash
pnpm install
```

### 2. Configure Environment Variables
Inside `apps/api/.env`, ensure you have your Neon Database URL and JWT settings set:
```env
DATABASE_URL=postgresql://neondb_owner:...
JWT_SECRET=chai-forms-secret-key-12345-very-long-key-for-jwt-signing
```

### 3. Run Development Servers
Launch both the frontend client and the backend API server in development mode:
```bash
pnpm dev
```
* **Frontend client**: `http://localhost:3000`
* **Backend API server**: `http://localhost:10000`

### 4. Database Setup & Migrations
To push the database schema or run migrations using Drizzle, run:
```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Verify & Run Diagnostics
To verify type safety across both frontend and backend packages:
```bash
# Run global workspace type checks
pnpm check-types

# Verify strict type safety inside the API server
cd apps/api && npx tsc --noEmit
```

---

## 📂 Project Directory Structure
```
├── apps
│   ├── api          # Express backend serving tRPC routes & Scalar docs
│   └── web          # Next.js App Router frontend client
└── packages
    ├── database     # Drizzle DB clients, schemas, & migrations
    ├── schemas      # Shared frontend/backend Zod validation schemas
    ├── services     # Core business services (Auth, Forms, Fields)
    └── trpc         # Shared tRPC server router context & procedures
```
