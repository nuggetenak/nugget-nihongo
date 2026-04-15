# CLAUDE-CODE-TASKS.md — Task List untuk Claude Code
**Project:** Nugget Nihongo · **Updated:** 16 April 2026  
**Untuk:** Claude Code sessions saja. Bukan untuk claude.ai.

> **BACA INI DULU** sebelum ngapa-ngapain.
> Setiap task = satu session. Jangan gabung task. Commit + merge sebelum mulai task berikutnya.
> Setelah setiap task: `node tests/run.js` → harus 0 FAIL.

---

## SCOPE CLAUDE CODE

Claude Code **BOLEH**:
- Git ops (branch delete, merge, cherry-pick, push)
- Edit file JS/CSS/HTML yang sudah ada
- Create/edit config files (wrangler.toml, wrangler.jsonc, CLAUDE.md, _MAP.md)
- Run wrangler commands (deploy, secret put, kv:namespace create)
- Run tests

Claude Code **TIDAK BOLEH** (selalu timeout/gagal):
- Generate vocab/grammar/lens entries baru dari scratch
- Tulis konten Bahasa Indonesia/Jepang dalam jumlah besar
- Scrape atau fetch data eksternal

**Konten baru = selalu minta ke claude.ai, bukan Claude Code.**

---

## STATUS TASKS

| Task | Status | Priority |
|------|--------|----------|
| TASK-CC-1: Clean branches | ⏳ Pending | 🔥 Launch blocker |
| TASK-CC-2: Fix level pill order | ⏳ Pending | 🔥 Launch blocker |
| TASK-CC-3: Fix header branding | ⏳ Pending | 🔥 Launch blocker |
| TASK-CC-4: Deploy AI Worker | ⏳ Pending | 🟠 AI feature |
| TASK-CC-5: Category panel UX | ⏳ Pending | 🟡 Post-launch |
| TASK-CC-6: Fix auth button visibility | ⏳ Pending | 🟡 Post-launch |
| TASK-CC-7: Update _MAP.md + CLAUDE.md | ⏳ Pending | 🟡 After infra done |

---

## TASK-CC-1 — CLEAN BRANCHES 🔥
**Estimated tokens:** Very Low  
**Files touched:** Git only, no code files  
**Do this first — no dependencies.**

```bash
git fetch origin

# Delete dead branches
git push origin --delete claude/read-audit-execute-task-zSXIw
git push origin --delete claude/setup-supabase-mcp-IDFOp

# Verify: only main + corpus/v17-pass15 should remain
git branch -r
```

Expected output after:
```
origin/HEAD -> origin/main
origin/corpus/v17-pass15
origin/main
```

Run `node tests/run.js` → verify 0 failures.  
Commit: nothing to commit (git ops only).

---

## TASK-CC-2 — FIX LEVEL PILL ORDER 🔥
**Estimated tokens:** Low  
**Files touched:** `public/index.html` only  
**Depends on:** Nothing

Current (wrong) order in `index.html`:
```html
<button class="pill active-all" id="pill-all" ...>Semua</button>
<button class="pill" id="pill-n3" ...>N3</button>
<button class="pill" id="pill-n4" ...>N4</button>
<button class="pill" id="pill-n1" ...>N1</button>
<button class="pill" id="pill-n2" ...>N2</button>
<button class="pill" id="pill-n5" ...>N5</button>
<button class="pill" id="pill-bookmark" ...>⭐ Bookmark</button>
```

Target (correct) order — N5 to N1, beginner to advanced:
```html
<button class="pill active-all" id="pill-all" ...>Semua</button>
<button class="pill" id="pill-n5" ...>N5</button>
<button class="pill" id="pill-n4" ...>N4</button>
<button class="pill" id="pill-n3" ...>N3</button>
<button class="pill" id="pill-n2" ...>N2</button>
<button class="pill" id="pill-n1" ...>N1</button>
<button class="pill" id="pill-bookmark" ...>⭐ Bookmark</button>
```

**Jangan ubah apapun selain urutan.** Semua attribute, class, onclick tetap sama.

Run `node tests/run.js` → 0 failures.  
Commit: `"fix: level pill order N5→N1 (beginner to advanced)"`

---

## TASK-CC-3 — FIX HEADER BRANDING 🔥
**Estimated tokens:** Low  
**Files touched:** `public/index.html` only  
**Depends on:** Nothing (can run parallel with TASK-CC-2)

Find this in `index.html` (inside `<header>`):
```html
<h1>日本語総まとめ</h1>
<p>JLPT N1–N5 · Referensi & Quiz Tata Bahasa Jepang</p>
```

Replace with:
```html
<h1>Nugget <span lang="ja">日本語</span></h1>
<p>Belajar JLPT N5–N1 · Grammar · Kosakata · Quiz</p>
```

Also update `<title>` tag near top of `<head>`:
```html
<!-- Change from: -->
<title>Nugget — Nihongo · 日本語文法</title>
<!-- Change to: -->
<title>Nugget Nihongo · Belajar Bahasa Jepang JLPT</title>
```

Also update `manifest.webmanifest` — check `name` and `short_name` fields, make consistent.

Run `node tests/run.js` → 0 failures.  
Commit: `"fix: header branding Nugget Nihongo + title update"`

---

## TASK-CC-4 — DEPLOY AI PROXY WORKER 🟠
**Estimated tokens:** Low  
**Files touched:** `workers/wrangler.toml`  
**Depends on:** Nugget harus provide GROQ_API_KEY + GEMINI_API_KEY dulu

**Nugget must provide these keys before starting this task.**  
Instruksi cara dapat keys ada di `SETUP.md § Step 1`.

Steps:
```bash
cd workers

# 1. Login (browser opens)
npx wrangler login

# 2. Create KV namespace
npx wrangler kv:namespace create "RATE_LIMITS"
# Output: id = "abc123def456..."
# Copy the id value
```

Edit `workers/wrangler.toml` — replace placeholder:
```toml
# Find:
id = "REPLACE_WITH_KV_NAMESPACE_ID"
# Replace with actual id from step 2:
id = "abc123def456..."  # ← paste real id here
```

```bash
# 3. Set secrets (paste when prompted)
npx wrangler secret put GEMINI_API_KEY
# → paste Gemini key

npx wrangler secret put GROQ_API_KEY
# → paste Groq key

# 4. Deploy
npx wrangler deploy
# → Output: "Deployed to: https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev"
```

```bash
# 5. Test the worker
curl -X POST https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Jelaskan に vs で dalam 1 kalimat"}]}'
# Should return JSON with "reply" field
```

```bash
# 6. Update ALLOWED_ORIGINS in workers/ai-proxy.js
# Add your actual Pages URL if not already present:
const ALLOWED_ORIGINS = [
  'https://nuggetenak.github.io',
  'https://nugget-nihongo.pages.dev',  // ← add if using CF Pages
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];
```

Run `node tests/run.js` from repo root → 0 failures.  
Commit: `"feat: AI worker KV wired + deploy ready"`

---

## TASK-CC-5 — CATEGORY PANEL UX FIX 🟡
**Estimated tokens:** Medium  
**Files touched:** `public/index.html`, `public/styles/app.css`  
**Depends on:** Nothing (post-launch)

**Problem:** 40+ kategori ditampilkan sekaligus di cat-panel. Overwhelming.

**Solution:** Group ke 8 super-kategori dengan expand on tap.

Super-kategori mapping (Claude Code harus implement ini):

```
📝 Struktur Kalimat
  → kopula, definisi, konjungsi, demonstrativa, enumerasi

⏱ Waktu & Aspek
  → aspek, aspek-kerja, waktu, frekuensi, batas-waktu, bersamaan, kenangan

🎯 Tujuan & Alasan  
  → tujuan, alasan, logika, sebab-akibat

🌡 Modalitas (Bisa/Harus/Boleh)
  → kemungkinan, keharusan, kewajiban, kausatif, kausatif-pasif, izin, larangan, keputusan

💭 Ekspresi & Nuansa
  → ekspresi, harapan, keinginan, kehendak, dugaan, inferensi, ekspektasi

🔄 Perbandingan & Kontras
  → kontras, konsesi, perbandingan, cara, derajat, kemudahan

💬 Register & Gaya
  → formal, kasual, kabar, kutipan, konfirmasi

📦 Kata & Bentuk
  → kata-benda-kualitas, adverbia, kondisional, pasif, keadaan, keadaan-hasil, kebiasaan, kesempatan

```

Implementation:
1. Ganti cat-panel dari flat list ke accordion/group structure
2. Setiap group header = clickable, expand/collapse children
3. Default: semua collapsed, hanya group headers terlihat
4. Active cat chip tetap visible (expand parent group jika ada active chip)
5. CSS: group header `font-weight: 600`, children indent 8px

Run `node tests/run.js` → 0 failures.  
Commit: `"feat: category panel grouped into 8 super-categories"`

---

## TASK-CC-6 — FIX AUTH BUTTON VISIBILITY 🟡
**Estimated tokens:** Low  
**Files touched:** `public/index.html`, `public/js/supabase-client.js`  
**Depends on:** Nothing

**Problem:** Auth button punya `style="display:none"` di HTML. JS reveal-nya.
Kalau JS lambat, user ga tau ada tombol login.

**Fix:**
1. Remove `style="display:none"` dari `<button class="auth-header-btn">` di `index.html`
2. Di `supabase-client.js`, pastikan JS tidak conflict — cari logic yang hide/show `authHeaderBtn`
3. Default state: tombol visible dengan text "Masuk"
4. JS update: kalau user sudah login, ganti jadi avatar/nama

Run `node tests/run.js` → 0 failures.  
Commit: `"fix: auth button visible by default, JS updates state"`

---

## TASK-CC-7 — UPDATE ORIENTATION DOCS 🟡
**Estimated tokens:** Low  
**Files touched:** `docs/project/_MAP.md`, `CLAUDE.md`  
**Depends on:** Lakukan SETELAH semua infra tasks selesai

Update `_MAP.md`:
- Ubah data counts ke angka real (N5=725, N4=692, N3=100, N2=50, N1=20)
- Ubah grammar counts ke angka real (N5=94, N4=92, N3=103)
- Tandai grammar lenses Irodori sebagai ✅ Full
- Update "What's next" section ke tasks yang masih pending

Update `CLAUDE.md`:
- "What still needs doing" → sesuaikan dengan MASTER-AUDIT.md task list terbaru
- Remove reference ke tasks yang sudah selesai (Tasks 1–7)

Run `node tests/run.js` → 0 failures.  
Commit: `"docs: sync _MAP.md + CLAUDE.md ke real state 16 April 2026"`

---

## SETELAH SETIAP TASK

```bash
# 1. Test
node tests/run.js
# → Must be 0 FAIL

# 2. Commit di working branch
git add -A
git commit -m "type: description"

# 3. Push + PR ke main
git push origin HEAD

# 4. Merge ke main (via GitHub PR atau:)
git checkout main
git merge --no-ff your-branch
git push origin main

# 5. Delete working branch
git push origin --delete your-branch-name
git branch -d your-branch-name
```

---

*Last updated: 16 April 2026 — claude.ai audit (Sonnet 4.6)*
