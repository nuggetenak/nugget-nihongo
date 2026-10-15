---
name: strix-security-audit
description: "Autonomous AI penetration testing, security vulnerability scanning, Supabase RLS auditing, and GitHub Actions CI verification using Strix (usestrix/strix) for Nugget Nihongo."
---

# Strix Security & Penetration Testing Skill

This skill provides testing guidelines and runbooks using **Strix** (`usestrix/strix`), an open-source autonomous AI penetration testing agent. Strix performs dynamic attacks, identifies realistic security vulnerabilities, and generates working proof-of-concept fixes.

## Key Targets in Nugget Nihongo

1. **Supabase Row Level Security (RLS)**:
   - Ensure users cannot read or overwrite other students' `srsData`, `user_memories`, or quiz stats.
   - Prevent anonymous access to user progress tables.
2. **Cloudflare Worker & API Proxy**:
   - Verify rate limiting on Groq/Gemini AI proxy endpoints.
   - Prevent key leakage in HTTP response headers.
3. **PWA Client State & Injection**:
   - Guard against XSS in dynamic grammar breakdowns, markdown renderers, and user note inputs.

---

## Running Strix Locally

### 1. Test Local Web Application
Start your local dev server (`npm run dev` on port 3000 or 5173), then execute:
```bash
# Scan local Next.js frontend or Vanilla PWA
uvx strix scan http://localhost:3000 --scope web-vulnerabilities
```

### 2. Audit Cloudflare Worker API
```bash
# Scan local wrangler dev worker
uvx strix scan http://localhost:8787/api/ai --method POST --headers "Authorization: Bearer test"
```

### 3. Static & Semantic Codebase Audit
Scan repository files for exposed secrets, missing RLS policies, or insecure headers:
```bash
uvx strix audit . --rules security,owasp-top-10
```

---

## Security Verification Checklist

Before releasing any new version or pushing to `main`:

| Category | Check | Verification Method |
| :--- | :--- | :--- |
| **Database** | Supabase RLS enabled on all user tables | `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';` |
| **Secrets** | No hardcoded API keys in client bundles | Check that `SUPABASE_SERVICE_ROLE_KEY` or `GROQ_API_KEY` are strictly server-side / worker secrets |
| **Headers** | Content Security Policy (CSP) & CORS | Verify `wrangler.jsonc` or `next.config.ts` sends strict `Content-Security-Policy` and CORS origins |
| **Input** | Sanitized Japanese Furigana & HTML | Ensure text inputs do not allow `<script>` injection via `DOMPurify` |

---

## GitHub Actions Automated Security Workflow

Place the workflow at `.github/workflows/strix-security.yml` to automatically gate pull requests against vulnerabilities.
