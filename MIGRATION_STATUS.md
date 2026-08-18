# Migration Status Tracker

> Track the status of each JSON data file and hardcoded page being migrated to the backend API.
> Update this file as migration progresses through phases.

**Legend:**
- 🔴 Not started
- 🟡 In progress
- 🟢 Done
- ⏭️ Deferred

---

## Phase 1 — Auth & User Model

| Task | Status | Notes |
|---|---|---|
| Express app init (TypeScript) | 🟢 | `backend/src/index.ts` created |
| `envalid` env validation | 🟢 | `backend/src/config/env.ts` created |
| Prisma schema (MySQL) | 🟢 | `backend/prisma/schema.prisma` created |
| DB migration: `users`, `invites`, `editor_section_assignments` | 🔴 | Run `npx prisma migrate dev` after MySQL is up |
| All performance indexes (Section 3.8) | 🟢 | Embedded in schema.prisma |
| `POST /auth/google` (Google ID token verify, nonce, invite claim) | 🔴 | Phase 1 |
| JWT issuance (15m access + 7d refresh, `tv` field) | 🔴 | Phase 1 |
| JWT middleware (token_version + is_active + LRU cache) | 🔴 | Phase 1 |
| `POST /auth/refresh`, `POST /auth/logout` | 🔴 | Phase 1 |
| `GET /health` liveness endpoint | 🟢 | In `src/index.ts` |
| Role middleware (`requireRole`, `requireSection`) | 🔴 | Phase 1 |
| Audit log middleware | 🔴 | Phase 1 |
| PM2 cluster config + graceful shutdown | 🟢 | `src/index.ts` has graceful shutdown |
| `POST /admin/invites` (with sections) | 🔴 | Phase 1 |
| Admin dashboard: Login screen | 🔴 | Phase 1 |
| Admin dashboard: User Management screen | 🔴 | Phase 1 |

---

## Phase 2 — Content: Notices, News, Careers, E-Tenders

| File | DB Table(s) | Seed Script | API Routes | Frontend Migration | Status |
|---|---|---|---|---|---|
| `notices.json` | `notices` | 🟢 `notices.seed.ts` | 🔴 | 🔴 `NoticePage.jsx`, `Navbar.jsx`, `LatestNews.jsx` | 🔴 |
| `news.json` | `news` | 🟢 `news.seed.ts` | 🔴 | 🔴 `NewsPage.jsx`, `NewsTicker.jsx`, `LatestNews.jsx` | 🔴 |
| `careers.json` | `careers` + `career_buttons` | 🟢 `careers.seed.ts` | 🔴 | 🔴 `CareersPage.jsx` | 🔴 |
| `etenders.json` | `etenders` | 🟢 `etenders.seed.ts` | 🔴 | 🔴 `ETenderPage.jsx` | 🔴 |
| Media upload endpoint | `media_files` | — | 🔴 | — | 🔴 |
| Admin: Notices Manager screen | — | — | — | — | 🔴 |
| Admin: News Manager screen | — | — | — | — | 🔴 |
| Admin: Careers Manager screen | — | — | — | — | 🔴 |
| Admin: E-Tenders Manager screen | — | — | — | — | 🔴 |

---

## Phase 3 — Faculty Self-Editing

| File | DB Table(s) | Seed Script | API Routes | Frontend Migration | Status |
|---|---|---|---|---|---|
| `faculty_details.json` | `faculty_profiles` + 5 child tables | 🟢 `faculty.seed.ts` | 🔴 | 🔴 `FacultyPage.jsx`, `FacultyProfilePage.jsx`, dept pages | 🔴 |
| Faculty: publications sub-resource | `faculty_publications` | 🟢 (in faculty.seed.ts) | 🔴 | — | 🔴 |
| Faculty: projects sub-resource | `faculty_projects` | 🟢 | 🔴 | — | 🔴 |
| Faculty: patents sub-resource | `faculty_patents` | 🟢 | 🔴 | — | 🔴 |
| Faculty: seminars sub-resource | `faculty_seminars` | 🟢 | 🔴 | — | 🔴 |
| Faculty: supervisions sub-resource | `faculty_supervisions` | 🟢 | 🔴 | — | 🔴 |
| Admin: Faculty Profile Editor | — | — | — | — | 🔴 |
| Faculty: "My Profile" dashboard screen | — | — | — | — | 🔴 |

---

## Phase 4 — Approval Workflow + Security Hardening

| Task | Status |
|---|---|
| `content_approvals` table | 🟢 (in schema.prisma) |
| Approval API endpoints | 🔴 |
| Dashboard: Pending approvals queue | 🔴 |
| CSRF protection (`csrf-csrf`) | 🔴 |
| Rate limiting all endpoints | 🟢 (general limiter in `src/index.ts`) |
| Security audit + pen tests | 🔴 |
| Automated daily DB backup (`mysqldump` cron) | 🔴 |
| Audit log viewer in dashboard | 🔴 |

---

## Phase 4 — Supplementary Content Migration

| File | DB Table(s) | Seed Script | API Routes | Frontend Migration | Status |
|---|---|---|---|---|---|
| `mous.json` | `mous` | 🟢 `mous.seed.ts` | 🔴 | 🔴 `MousPage.jsx` | 🔴 |
| `alumni.json` | `alumni` | 🟢 `alumni.seed.ts` | 🔴 | 🔴 `AlumniPage.jsx` | 🔴 |
| `non_teaching_staff.json` | `non_teaching_staff` | 🟢 `non_teaching_staff.seed.ts` | 🔴 | 🔴 `NonTeachingStaffPage.jsx` | 🔴 |
| `press.json` | `press_coverage` | 🟢 `press.seed.ts` | 🔴 | 🔴 `LifePressPage.jsx` | 🔴 |
| `scholarshipsData.json` | `scholarships` | 🟢 `scholarships.seed.ts` | 🔴 | 🔴 `ScholarshipPage.jsx` | 🔴 |
| `shortlistings.json` | `shortlistings` + `shortlisted_candidates` | 🟢 `shortlistings.seed.ts` | 🔴 | 🔴 `ShortlistingsPage.jsx` | 🔴 |

---

## Phase 5 — Hardcoded JSX Pages (Lowest Priority)

| Page | Content Type | Target Table | Status |
|---|---|---|---|
| `sgrc.json` | SGRC committee members | `committees` (TBD) | ⏭️ Deferred |
| `lifePageData.json` | Life section — events, clubs, gallery | Schema TBD | ⏭️ Deferred |
| `UgPgSchemesPage.jsx` (75.9 KB) | Course scheme tables | TBD | ⏭️ Deferred |
| `CseDepartmentPage.jsx` (40.4 KB) | Dept. content | TBD | ⏭️ Deferred |
| `EceDepartmentPage.jsx` (39.9 KB) | Dept. content | TBD | ⏭️ Deferred |
| `ReportsAndMinutes.jsx` (18.4 KB) | Board minutes PDFs | TBD | ⏭️ Deferred |
| `PatentsPage.jsx` (17.7 KB) | Patent listings | TBD | ⏭️ Deferred |

---

## Google Cloud Console Setup Checklist

- [ ] Create Google OAuth2 Client ID
- [ ] Set Authorized JS Origins: `https://admin.iiitp.ac.in`, `http://localhost:5174`
- [ ] Set Authorized Redirect URIs: `https://admin.iiitp.ac.in/auth/callback`
- [ ] Copy client ID to `backend/.env` as `GOOGLE_CLIENT_ID`

## Local Dev Setup Checklist

- [ ] Install MySQL 8.x locally (or use Docker: `docker run -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:8`)
- [ ] Create database: `CREATE DATABASE iiitp_cms;`
- [ ] Create user with privileges
- [ ] Copy `backend/.env.example` → `backend/.env` and fill in credentials
- [ ] `cd backend && npm install`
- [ ] `npx prisma migrate dev --name init`
- [ ] `npm run db:seed`
- [ ] `npm run dev` → verify `GET http://localhost:4000/health` returns `{ status: "ok" }`

## File Storage Decision

> **Decided: Local VPS disk (`/uploads`) on Hostinger Cloud Startup plan.**

| Scenario | Strategy |
|---|---|
| **Existing files** in `public/` (PDFs, faculty photos, etc.) | **Option A — keep as-is.** Seed scripts store their current relative URL strings (e.g. `/documents/notice.pdf`) directly in the DB. No migration needed. |
| **New uploads** via admin dashboard | Stored in `/var/www/backend/uploads` on the VPS. Served at `https://api.iiitp.ac.in/uploads/<uuid>-filename.ext` via Nginx. |
| **Backup** | Daily `rclone sync /uploads remote:iiitp-uploads-backup` cron job. |
| **PDF security** | Nginx enforces `Content-Disposition: attachment` for all `.pdf` URL matches [FIX #6]. |

> [!IMPORTANT]
> The `UPLOAD_DIR` env var must point to a directory **outside the web root** (i.e., not directly exposed by Nginx's static file serving). Nginx proxies to Node.js for `/uploads/*` routes so the backend can enforce auth checks and the Content-Disposition header.
