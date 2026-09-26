# GVP Solar Energy — Leading Solar EPC in Maharashtra

Official website and lead management platform for **GVP Solar Energy**, premier Solar EPC solutions provider headquartered in Ichalkaranji, Maharashtra. Specializing in commercial, industrial rooftop, and PM Surya Ghar residential solar installations.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* **Node.js**: v18 or higher
* **npm**: v9 or higher

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

* **Website**: `http://localhost:3000/` (or `http://localhost:3001/`)
* **Admin Leads Dashboard**: `http://localhost:3000/cfladmin`

---

## 🔐 Admin Leads Portal

* **URL Path**: `/cfladmin`
* **Default Admin Email**: `info.gvpsolar@gmail.com`
* **Default Admin Password**: `Cflhouse@124.`

### Features:
* Real-time lead capture from consultation modals and solar calculators
* Status management (`New`, `Contacted`, `Survey Scheduled`, `Proposal Sent`, `Closed`)
* Direct WhatsApp and phone call triggers
* Permanent lead deletion with confirmation dialog
* CSV export with timestamped filenames
* Secure stateless HMAC-SHA256 session token authentication

---

## ⚡ Deployment to Vercel

This repository is pre-configured for seamless 1-click deployment on **Vercel**:

1. **Import Git Repository** into Vercel.
2. **Build Settings**:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
3. **Environment Variables** (Project Settings → Environment Variables):
   * `ADMIN_EMAIL`: `info.gvpsolar@gmail.com`
   * `ADMIN_PASSWORD`: `Cflhouse@124.`
   * `SESSION_SECRET`: `gvp-solar-production-session-auth-token-key-2026`
   * *(Optional)* `KV_REST_API_URL` & `KV_REST_API_TOKEN` (for Upstash / Vercel KV)

### Architecture on Vercel:
* **Static Assets & SPA**: Served from `dist/` with immutable edge caching via `vercel.json`.
* **Serverless Functions (`api/`)**:
  * `POST /api/leads` — Public lead submission with rate limiting and deduplication.
  * `POST /api/admin/login` — Administrator authentication.
  * `GET /api/admin/verify` — Session token verification.
  * `GET /api/admin/leads` — Authenticated leads retrieval.
  * `POST /api/admin/leads` — Lead status update.
  * `DELETE /api/admin/leads` — Lead removal.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
* **Build Tool**: Vite
* **Backend**: Vercel Serverless Functions (`api/*.ts`) & Vite Dev Server Middleware
* **Security**: Tamper-proof HMAC-SHA256 authentication, rate limiting, XSS input sanitization
