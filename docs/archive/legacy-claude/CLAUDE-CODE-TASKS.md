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
- Run wrangler commands (deploy, secret put)
- Run tests

Claude Code **TIDAK BOLEH** (selalu timeout/gagal):
- Generate vocab/grammar/lens entries baru dari scratch
- Tulis konten Bahasa Indonesia/Jepang dalam jumlah besar

**Konten baru = selalu minta di claude.ai, bukan Claude Code.**

---

## STATUS TASKS

| Task | Status | Priority |
|------|--------|----------|
| TASK-CC-1: Clean branches | ✅ DONE (16 Apr) | — |
| TASK-CC-2: Fix level pill order | ✅ DONE (16 Apr) | — |
| TASK-CC-3: Fix header branding | ✅ DONE (16 Apr) | — |
| TASK-CC-4: Deploy AI Worker | ⏳ Pending — butuh API keys | 🟠 AI feature |
| TASK-CC-5: Category panel UX | ⏳ Pending | 🟡 Post-launch |
| TASK-CC-6: Fix auth button visibility | ✅ DONE (16 Apr) | — |
| TASK-CC-7: Update _MAP.md + CLAUDE.md | ✅ DONE (18 Apr) | — |
| TASK-CC-8: Content population batch A | ✅ DONE (18 Apr) | — |

---

## TASK-CC-4 — DEPLOY AI PROXY WORKER 🟠
**Estimated tokens:** Low  
**Files touched:** `workers/wrangler.toml` (already updated), `workers/ai-proxy.js`  
**Depends on:** Nugget harus provide GROQ_API_KEY + GEMINI_API_KEY

> **KV namespace sudah dibuat:** `f7de1d5156a04308a529c7f30d7319d5`
> `workers/wrangler.toml` sudah terkonfigurasi dengan ID ini.
> Kamu hanya perlu: login + set secrets + deploy.

**Nugget must provide API keys before starting.**  
Cara dapat keys: lihat `SETUP.md § Step 1`.

```bash
cd workers

# Login Cloudflare (browser terbuka)
npx wrangler login

# Set secrets — paste key ketika diminta
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put GROQ_API_KEY

# Deploy!
npx wrangler deploy
# → Output: "Deployed to: https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev"
```

Setelah deploy, test:
```bash
curl -X POST https://nugget-nihongo-ai.YOUR_SUBDOMAIN.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Jelaskan に vs で dalam 1 kalimat"}]}'
# Harus return JSON dengan field "reply"
```

Kalau test berhasil, update URL di `public/js/ai-tutor.js` jika subdomain berbeda dari `nugget-nihongo-ai.workers.dev`:
```js
// Cari:
return 'https://nugget-nihongo-ai.workers.dev/chat';
// Ganti jika perlu ke URL aktual dari output wrangler deploy
```

Run `node tests/run.js` dari root repo → 0 FAIL.  
Commit: `"feat: AI Worker deployed — wrangler.toml finalized"`

---

## TASK-CC-5 — CATEGORY PANEL UX FIX 🟡
**Estimated tokens:** Medium  
**Files touched:** `public/index.html`, `public/styles/app.css`  
**Depends on:** Nothing (post-launch, bisa dikerjakan kapan saja)

**Problem:** 40+ kategori langsung tampil semua tanpa grouping. Mobile user harus scroll jauh.

**Target:** Accordion dengan 8 super-kategori. Default: collapsed.

Super-kategori mapping yang harus di-implement:

```
📝 Struktur Kalimat
  → kopula, definisi, konjungsi, demonstrativa, enumerasi

⏱ Waktu & Aspek
  → aspek, aspek-kerja, waktu, frekuensi, batas-waktu, bersamaan, kenangan

🎯 Tujuan & Alasan
  → tujuan, alasan, logika, sebab-akibat

🌡 Modalitas
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
1. Bungkus cat-chips dengan group `<div class="cat-group">`
2. Setiap group punya `<button class="cat-group-header">` yang toggle `.expanded`
3. Children chips tersembunyi saat tidak `.expanded`
4. CSS: group header `font-weight: 600; padding: 6px 0;`, children `padding-left: 8px`
5. Kalau ada chip yang sedang active, parent group-nya otomatis `.expanded`

Run `node tests/run.js` → 0 FAIL.  
Commit: `"feat: category panel accordion — 8 super-categories"`

---

## TASK-CC-7 — UPDATE ORIENTATION DOCS 🟡
**Estimated tokens:** Low  
**Files touched:** `docs/project/_MAP.md`, `CLAUDE.md`  
**Depends on:** Lakukan setelah TASK-CC-4 selesai (supaya infra info akurat)

Update `_MAP.md`:
- Data counts → N5=725, N4=692, N3=285, N2=130, N1=60 (grammar: N5=94, N4=92, N3=119, N2=90, N1=60)
- Tandai grammar lenses Irodori A1/A2-1/A2-2 sebagai ✅ Full
- Update infra section: Supabase ✅, AI Worker status terbaru
- Update "What's next" ke task list MASTER-AUDIT.md yang aktif

Update `CLAUDE.md`:
- Section "What still needs doing" → sesuaikan dengan MASTER-AUDIT.md Tasks 12–17
- Hapus referensi ke Tasks 1–11 yang sudah done

Run `node tests/run.js` → 0 FAIL.  
Commit: `"docs: sync _MAP.md + CLAUDE.md ke real state post-16-April-2026"`

---

## TASK-CC-8 — CONTENT POPULATION BATCH A ✅ DONE (18 Apr)

Batch A selesai via 10-agent pipeline (courier delivery to Crunchy → QA → direct push):
- vocab-n3: +135 entries (vg-n3-00151→00285, total 285)
- vocab-n2: +80 entries (vg-n2-00051→00130, total 130)
- vocab-n1: +40 entries (vg-n1-00021→00060, total 60)
- grammar-n2: +60 entries (gn2-00031→00090, total 90)
- grammar-n1: +60 entries (gn1-00001→00060, total 60)

**Next content batch (Batch B):** mulai dari vg-n3-00286 dst. Siapkan via claude.ai lagi.

---

## SETELAH SETIAP TASK

```bash
# 1. Test
node tests/run.js  # → must be 0 FAIL

# 2. Commit
git add -A
git commit -m "type: description"

# 3. Push + merge ke main
git push origin HEAD
# Buat PR di GitHub atau:
git checkout main && git merge --no-ff your-branch
git push origin main

# 4. Delete working branch
git push origin --delete your-claude-branch
git branch -d your-claude-branch
```

---

*Last updated: 18 April 2026 — Crunchy 🧂 (post content-population batch A)*
*Tests: 10,550 PASS | 0 FAIL*
