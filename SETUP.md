# Nugget Nihongo — Setup & Deployment Guide
**Version:** v15.5.0  
**Time to deploy:** ~30 minutes

---

## Prerequisites
- Node.js 22+ installed (`node --version`)
- GitHub account (repo already set up)
- Free accounts for: Cloudflare, Supabase, Google AI Studio, Groq

---

## Step 1 — Get Free API Keys (5 min)

### Gemini API (primary AI)
1. Go to **aistudio.google.com/app/apikey**
2. Sign in with Google
3. Click **Create API key** → copy it
4. Save as: `GEMINI_KEY=AIza...`

### Groq API (AI fallback)  
1. Go to **console.groq.com** → Sign Up
2. API Keys → Create API Key → copy it
3. Save as: `GROQ_KEY=gsk_...`

---

## Step 2 — Deploy Cloudflare Worker (10 min)

The Worker is the AI proxy. It hides your API keys and handles rate limiting.

```bash
# Install wrangler CLI
npm install -g wrangler

# Login to Cloudflare (browser opens)
cd workers
npx wrangler login

# Create KV namespace for rate limiting
npx wrangler kv:namespace create "RATE_LIMITS"
# → Outputs: id = "abc123..."
# Copy the id value
```

Edit `workers/wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "RATE_LIMITS"
id      = "PASTE_YOUR_KV_ID_HERE"   # ← replace this line
```

```bash
# Add secrets (paste when prompted)
npx wrangler secret put GEMINI_API_KEY
# Paste your Gemini key → Enter

npx wrangler secret put GROQ_API_KEY
# Paste your Groq key → Enter

# Deploy!
npx wrangler deploy
# → Deployed to: https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev
```

### Update the Worker URL in the app

Edit `public/js/ai-tutor.js`, line ~13:
```js
// Change:
return 'https://nugget-nihongo-ai.workers.dev/chat';
// To your actual Worker URL:
return 'https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev/chat';
```

### Test the Worker
```bash
curl -X POST https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Jelaskan に vs で dalam 2 kalimat"}]}'
# Should return: { "reply": "...", "model_used": "gemini-2.0-flash", ... }
```

---

## Step 3 — Set Up Supabase (10 min)

1. Go to **supabase.com** → New project (free tier)
2. Set a strong database password → **Create project** (waits ~2 min)
3. **SQL Editor** → paste entire content of `supabase/schema.sql` → **Run**
4. **Settings → API** → copy:
   - **Project URL**: `https://xxxx.supabase.co`
   - **anon/public key**: `eyJ...`

Edit `public/js/supabase-client.js` (lines 14-15):
```js
var SUPABASE_URL  = 'https://YOUR_PROJECT.supabase.co';   // ← replace
var SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';             // ← replace
```

In `public/index.html`, search for `TODO: Supabase` and uncomment:
```html
<!-- Remove these comment delimiters: -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="./js/supabase-client.js"></script>
```

### Enable Google OAuth (optional but recommended)
1. Supabase Dashboard → **Authentication → Providers → Google**
2. Enable → add Client ID + Secret from Google Cloud Console
3. Add redirect URL: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

---

## Step 4 — Deploy to GitHub Pages (2 min)

The GitHub Actions workflow already exists at `.github/workflows/deploy.yml`.

```bash
# Commit all changes
git add -A
git commit -m "v15.5.0 — full platform: AI tutor + analytics + auth"
git push origin claude/architecture-audit-cleanup-WKJ2n

# Merge to main to trigger deploy
# (or create a PR on GitHub)
git checkout main
git merge claude/architecture-audit-cleanup-WKJ2n
git push origin main
```

GitHub Pages deploys automatically → live at:  
`https://nuggetenak.github.io/nugget-nihongo/`

---

## Step 5 — Expand the Corpus (ongoing)

Once you have your Gemini API key:

```bash
# Expand N3 vocab (70 → ~3,750 entries):
GEMINI_API_KEY=AIza... node tools/generate-corpus.js \
  --level=n3 --type=vocab --start=71 --count=100 \
  --output=/tmp/n3-vocab-batch1.txt
# Review /tmp/n3-vocab-batch1.txt, then paste into public/data/vocab/vocab-n3.js

# Expand N4 vocab (692 → ~1,500 entries):
GEMINI_API_KEY=AIza... node tools/generate-corpus.js \
  --level=n4 --type=vocab --start=693 --count=100

# Expand N2 grammar (30 → target 200):
GEMINI_API_KEY=AIza... node tools/generate-corpus.js \
  --level=n2 --type=grammar --start=31 --count=50
```

---

## Verification Checklist

After deploy:

- [ ] Open app at GitHub Pages URL
- [ ] Browse tab loads grammar cards ✓
- [ ] N5/N4/N3/N2/N1 level pills all clickable ✓
- [ ] Quiz modes work (try Pilihan Ganda) ✓
- [ ] AI Sensei tab → send a message → AI responds ✓
- [ ] Statistik tab → heatmap + SRS rings visible ✓
- [ ] Auth modal opens (Masuk button in header) ✓
- [ ] PWA installable (Chrome → Install) ✓
- [ ] Offline works (disable WiFi → reload) ✓

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| AI Sensei shows "belum dikonfigurasi" | Deploy Worker, update `AI_WORKER_URL` in ai-tutor.js |
| "Masuk" button not visible | Supabase CDN not uncommented in index.html |
| N2/N1 shows no results | Check grammar-index.js merges grammarN2/grammarN1 |
| Tests fail on version | Run `npm run check:version` — version.js and sw.js must match |
| Worker returns 403 | Check `ALLOWED_ORIGINS` in ai-proxy.js includes your Pages URL |

---

*SETUP.md generated by Claude Code — v15.5.0 — 7 April 2026*
