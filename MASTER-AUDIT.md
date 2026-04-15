# NUGGET NIHONGO — MASTER AUDIT
**Updated:** 16 April 2026 · Deep repo scan + live infra check  
**Owner:** Nugget  
**Scope:** Claude (claude.ai) = strategic oversight, content generation, audit  
**Scope:** Claude Code = code ops only → lihat **CLAUDE-CODE-TASKS.md**

---

## SITUASI SAAT INI — REAL STATE (16 April 2026)

### ✅ SELESAI SEMUA — Tasks 1–7 dari audit 15 April
| Task | Keterangan |
|------|-----------|
| TASK 1 | Cherry-pick Irodori grammar lenses + branch cleanup |
| TASK 2 | Hapus duplicate Soumatome files |
| TASK 3 | Rewrite `_MAP.md` + update `CLAUDE.md` |
| TASK 4 | Fill grammar_ids Irodori A2-1 & A2-2 |
| TASK 5 | Fill grammar lens ir-a2-1.js (65 entries) + ir-a2-2.js (62 entries) |
| TASK 6 | Verify + patch Irodori A1 grammar lens global_grammar_id links |
| TASK 7 | Fill grammar_ids for Irodori A1 |

---

## DATA COUNTS — REAL (16 April 2026)

| File | Count | Status |
|---|---|---|
| grammar-n5.js | **94** entries | ✅ Full (naik dari 80, tasks 4+6 tambah 14) |
| grammar-n4.js | **92** entries | ✅ Full (naik dari 90, task 4 tambah 2) |
| grammar-n3.js | 103 entries | ✅ Full |
| grammar-n2.js | 30 entries | 🌱 Seed |
| grammar-n1.js | 8 entries | 🌱 Seed |
| vocab-n5.js | 725 entries | ✅ Full |
| vocab-n4.js | 692 entries | ✅ Full |
| vocab-n3.js | **100** entries | ⚠️ Partial (target min 300, ideal 3750) |
| vocab-n2.js | 50 entries | 🌱 Seed |
| vocab-n1.js | 20 entries | 🌱 Seed |
| grammar-lens-ir-a1.js | 61 entries | ✅ Full |
| grammar-lens-ir-a2-1.js | **65** entries | ✅ Full |
| grammar-lens-ir-a2-2.js | **62** entries | ✅ Full |
| grammar-lens-sm-n3.js | 132 entries | ✅ Full |
| grammar-lens-sm-n4.js | 102 entries | ✅ Full |
| book-irodori-a1.js | grammar_ids ✅ vocab ✅ | ✅ Complete |
| book-irodori-a2-1.js | grammar_ids ✅ vocab ✅ | ✅ Complete |
| book-irodori-a2-2.js | grammar_ids ✅ vocab ✅ | ✅ Complete |
| book-minna-1.js | ❌ Empty | Blocked — butuh PDF |
| book-minna-2.js | ❌ Empty | Blocked — butuh PDF |

---

## INFRA STATUS — LIVE CHECK

### Supabase ✅ LIVE & WIRED
- Project `oxeuwkpgrtojjzhcboqz` · ap-northeast-1 · ACTIVE_HEALTHY
- 7 tabel deployed + RLS enabled ✅
- `supabase-client.js` sudah pakai URL + anon key yang valid (bukan placeholder) ✅
- CDN `<script>` sudah di-uncomment di `index.html` baris 1300–1301 ✅
- ❌ **Yang belum:** Google OAuth belum dikonfigurasi di Supabase Dashboard

### Cloudflare ✅ Pages Jalan, ❌ AI Worker Belum
- Pages Worker `nugget-nihongo` sudah deployed (15 April) — serve static site ✅
- **AI Proxy Worker `nugget-nihongo-ai` BELUM ADA** di Cloudflare ❌
- **KV Namespace `RATE_LIMITS` BELUM DIBUAT** (0 namespaces exist) ❌
- `workers/wrangler.toml` masih punya placeholder `REPLACE_WITH_KV_NAMESPACE_ID` ❌

### Branches ⚠️ Belum Bersih
- `claude/read-audit-execute-task-zSXIw` — harus dihapus
- `claude/setup-supabase-mcp-IDFOp` — harus dihapus
- `corpus/v17-pass15` — JANGAN DITOUCH, biarkan sebagai research reference
- Goal: hanya `main` + `corpus/v17-pass15`

### Tests
- node tests/run.js → **10,550 PASS, 0 FAIL** ✅

---

## UI/UX ISSUES — ANALISIS

### 🔴 Harus Fix Sebelum Launch

1. **Level pill order salah**
   Di `index.html` urutannya: N3, N4, N1, N2, N5 (random)
   Harusnya: **N5 → N4 → N3 → N2 → N1** (beginner ke advanced)

2. **Header branding salah**
   `<h1>日本語総まとめ</h1>` → nama buku Soumatome, bukan nama app
   Fix ke: `<h1>Nugget Nihongo</h1>` + subtitle yang relevan

3. **Supabase CDN conditionally loaded**
   CDN load di baris 1300 tapi mungkin ada race condition — verify di browser.

### 🟡 Penting untuk UX

4. **Category panel overwhelming**
   40+ kategori langsung kelihatan semua tanpa grouping. Mobile user harus scroll jauh.
   Fix: collapse ke 8–10 super-kategori, expand on tap.

5. **Auth button hidden by default**
   `style="display:none"` di HTML — JS yang reveal-nya. Risk: kalau JS lambat, user ga tau ada login.
   Fix: tampilkan by default, JS yang update state-nya (bukan hide/show).

6. **Tidak ada loading skeleton**
   Saat grammar cards render, layar kosong dulu. Jarring di mobile.

7. **Sensei tab icon `🤖`** kontras sama positioning "teman belajar hangat".
   Design system: warm tone. Robot emoji cold. Ganti ke `✨` atau `💬`.

### 🟢 Sudah Benar
- Dark mode default ✅
- Tab nav sticky bottom ✅
- Mobile-first layout ✅
- JLPT color coding per level ✅
- Touch targets design (perlu verify ≥44px) ✅

---

## TASK LIST AKTIF

### 🔥 TASK 9 — Clean Remaining Branches `[Claude Code]`
Hapus 2 branch sisa. Lihat `CLAUDE-CODE-TASKS.md § TASK-CC-1`.

### 🔥 TASK 10 — Fix Level Pill Order `[Claude Code]`
Di `index.html`, ubah urutan pills → N5, N4, N3, N2, N1.
Lihat `CLAUDE-CODE-TASKS.md § TASK-CC-2`.

### 🔥 TASK 11 — Fix Header Branding `[Claude Code]`
`<h1>日本語総まとめ</h1>` → `<h1>Nugget Nihongo</h1>`.
Lihat `CLAUDE-CODE-TASKS.md § TASK-CC-3`.

### 🟠 TASK 12 — Deploy AI Proxy Worker `[Human + Claude Code]`
Nugget harus punya GROQ_API_KEY dan GEMINI_API_KEY dulu.
Steps: Nugget dapat keys → Claude Code buat KV + deploy worker.
Lihat `CLAUDE-CODE-TASKS.md § TASK-CC-4`.

### 🟠 TASK 13 — Setup Google OAuth `[Human task — no Claude Code needed]`
1. Supabase Dashboard → Authentication → Providers → Google → Enable
2. Set Client ID + Secret dari Google Cloud Console
3. Redirect URL: `https://oxeuwkpgrtojjzhcboqz.supabase.co/auth/v1/callback`
4. Site URL: `https://nuggetenak.github.io/nugget-nihongo`

### 🟡 TASK 14 — Category Panel UX Fix `[Claude Code]`
Grouping 40+ kategori jadi super-kategori. Lihat `CLAUDE-CODE-TASKS.md § TASK-CC-5`.

### 🟡 TASK 15 — N3 Vocab Expansion Batch B `[Claude — di claude.ai, BUKAN Claude Code]`
Lanjut dari vg-n3-00101 → vg-n3-00150.
Content generation TIDAK BISA di Claude Code (timeout). Lakukan di claude.ai.

### 🟡 TASK 16 — N2/N1 Grammar Enrichment `[Claude — di claude.ai]`
N2 (30 entries) + N1 (8 entries) belum punya `desc` Bahasa Indonesia + `meaning_id`.
Generate di claude.ai, paste ke file.

### ⬜ TASK 17 — Minna no Nihongo Lenses `[BLOCKED]`
`book-minna-1.js` + `book-minna-2.js` kosong.
Status: BLOCKED sampai Nugget punya PDF Minna no Nihongo.

---

## DEPLOYMENT TARGET — SUNDAY

**Rekomendasi: GitHub Pages** (sudah otomatis jalan via deploy.yml on push to main).

URL live: `https://nuggetenak.github.io/nugget-nihongo/`

Untuk Sunday yang fungsional minimal:
- [x] Grammar browse (N5/N4/N3) ✅
- [x] Vocab browse ✅
- [x] Quiz modes ✅
- [ ] Fix level pill order (TASK 10)
- [ ] Fix header branding (TASK 11)
- [ ] AI Sensei (butuh AI Worker + keys — TASK 12)
- [ ] Login/sync (butuh Google OAuth — TASK 13)

Kalau TASK 12–13 tidak sempat, app tetap bisa dipakai offline (grammar + quiz) tanpa AI dan tanpa login. Itu sudah berguna.

---

## PANDUAN SPLIT TUGAS

| Jenis Task | Siapa | Tool |
|---|---|---|
| Generate vocab entries | Claude | claude.ai chat |
| Generate grammar entries | Claude | claude.ai chat |
| Generate lens content | Claude | claude.ai chat |
| Analysis & audit | Claude | claude.ai chat |
| Git operations | Claude Code | Terminal |
| Edit JS/CSS/HTML | Claude Code | Terminal |
| Deploy wrangler | Claude Code | Terminal |
| Config files | Claude Code | Terminal |
| Tests | Claude Code | node tests/run.js |

---

## KONVENSI WAJIB

```
IDs:
  Vocab:        vg-{level}-{5digit}     e.g. vg-n3-00101
  Grammar:      gn{level}-{5digit}      e.g. gn5-00095
  Lens Irodori: ir-a{level}-{3digit}    e.g. ir-a1-001
  Lens Souma:   sm-n3-{3digit}          e.g. sm-n3-001

Data files:
  Append-only. Jangan delete entry yang sudah ada.
  provenance: 'jlpt-corpus' untuk entry baru
  added_v: 'v15' untuk semua entry baru

Git:
  claude/ branch → merge to main → DELETE branch
  Jangan commit langsung ke main
  JANGAN pernah touch corpus/v17-pass15

Testing:
  node tests/run.js → harus 0 FAIL sebelum commit
```

---

## FILE YANG WAJIB DIBACA CLAUDE CODE

1. `CLAUDE.md` — tech stack, conventions
2. `MASTER-AUDIT.md` — state ini
3. `CLAUDE-CODE-TASKS.md` — task list Claude Code
4. `public/data/_schema.md` — data architecture v3
5. `docs/project/_MAP.md` — file structure

**JANGAN baca** (buang token):
- `docs/agent-system/` — multi-agent lama
- `docs/corpus/` — research docs
- `SPEC-GRAMMAR-IRODORI-A2.md` — sudah done
- `ARCHITECTURE.md` — sebagian stale

---

*Last updated: 16 April 2026 — claude.ai deep scan (Sonnet 4.6)*
