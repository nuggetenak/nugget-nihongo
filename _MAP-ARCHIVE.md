# _MAP ARCHIVE — Done Tasks
> Arsip task yang sudah ✅ merged. Dipindahkan dari _MAP.md untuk efisiensi token.
> Dikelola oleh Crispy. Jangan edit manual.

#### TASK-INT-1 ✅ — Pindahkan error-boundary.js ke posisi ke-2
- [Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.5.5
- error-boundary.js sekarang load ke-2 setelah version.js. Bug [A-NEW-8] RESOLVED.


#### TASK-INT-2 ✅ — Aktifkan book files di index.html dan sw.js
- ✅ Maret 2026 — verified by Agent 6 QA (partial)
- Catatan: index.html dan sw.js sudah uncomment, tapi data book-*.js masih kosong
- Fitur Browse/Quiz by Buku masih non-functional sampai Agent 3 isi data


#### TASK-INT-3 ✅ — Exclude vocab-n3-soumatome.js stub dari vocabDB
- [Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.5.5
- vocabN3Soumatome di-comment di vocab-index.js baris 37. Bug [B-NEW-2] RESOLVED.
- Uncomment kembali setelah entries > 50.


#### TASK-INT-4 ✅ — Update AGENT-4-GRAMMAR.txt — referensi vocab-n4.js retired
- ✅ 15 Maret 2026 — verified by Crispy: referensi vocab-n4.js tidak ada di prompt v4 (sudah bersih sejak GOV-007). Tidak ada perubahan diperlukan.
- File: agent-prompts/AGENT-4-GRAMMAR.txt
- Detail: ganti referensi vocab-n4.js → vocab-n4-soumatome.js + vocab-n4-core.js
- Assign: Agent 1


#### TASK-INT-5 ✅ — Update AGENT-3-BOOK.txt — range unit Irodori salah
- ✅ 15 Maret 2026 — verified by Crispy: klarifikasi unit numbering Irodori (1–18 per volume, 9 topik) ditambahkan ke AGENT-3-BOOK.txt. Merged ke v14.7.0.
- File: agent-prompts/AGENT-3-BOOK.txt
- Detail: unit numbering restart per-volume (1–18), bukan 1-9/10-18/19-27
- Dependency: tunggu konfirmasi dari Agent 3 (TASK-BOOK-1)
- Assign: Agent 1


#### TASK-INT-6 ✅ — Fix deploy.yml — jangan ekspos file internal
- [Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.5.5
- rsync step ditambah dengan exclude list: agent-prompts/, docs/, tools/, vocab-n4.js, _MAP.md, dll.

---

### ── VOCAB TASKS ───────────────────────────────────────────────────────────


#### TASK-6 ✅ — vocab-n5-soumatome POS Residual
- ✅ Maret 2026 — verified by Agent 6 QA
- 12 entries `pos: exp` divalidasi, semua tepat


#### TASK-7 ✅ — vocab-n5-soumatome Domain Enrichment
- ✅ Maret 2026 — verified by Agent 6 QA
- 155 entries → 136 dienrich ke domain spesifik


#### TASK-10 ✅ — Split vocab-n4.js → soumatome + core
- ✅ Maret 2026 — verified by Agent 6 QA
- 656 → vocab-n4-soumatome.js, 36 → vocab-n4-core.js. vocab-n4.js RETIRED.


#### TASK-VOC-1 ✅ — Fix POS Mismatch Sistemik
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: semua vocab-n*.js domain Agent 2
- Detail: adj-i→i-adj, adj-na→na-adj, adv→adverb, exp→expr, prt→particle
- Assign: Agent 2
- Priority: 🔴 KRITIS — label POS kosong di UI


#### TASK-VOC-2 ✅ — Fix v-n5-s0003 POS salah (noun → expr)
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: vocab-n5-soumatome.js
- Detail: お先に失礼します adalah expr, bukan noun
- Assign: Agent 2


#### TASK-VOC-3 ✅ — Update _schema-vocab.md — 8 field salah
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: data/_schema-vocab.md
- Detail: format ID, field names, contoh related_grammar — semua pakai format lama
- Assign: Agent 2


#### TASK-VOC-4 ✅ — Fix ID gap dan komentar entry count
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0. vocab-index.js komentar ~150 → 413 difix oleh Crispy.
- File: vocab-n4-soumatome.js (ID gap v-n4-0014), vocab-index.js (komentar ~150 → 413)
- Assign: Agent 2 (gap ID) + Agent 1 (komentar di vocab-index.js)


#### TASK-BOOK-1 ✅ — Verifikasi chapter count BOOK_META Irodori
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0. Konfirmasi: Irodori = 18 units per volume.
- File: book-irodori-*.js
- Detail: inkonsistensi antara chapters:9 di BOOK_META vs unit:18 di data
- Assign: Agent 3 — hitung dan konfirmasi ke Integrator


#### TASK-BOOK-2 ✅ — Update sources.js — 4 angka entry salah
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: data/sources.js
- Detail: N5 Core 150→413, N5 Soumatome 432→416, N4 Core status pending→done, entries null→36
- Assign: Agent 3


#### TASK-BOOK-3 ✅ — Update docs/source-reference.md — snapshot stale
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: docs/source-reference.md
- Detail: semua angka di STATUS SNAPSHOT sudah tidak akurat
- Assign: Agent 3


#### TASK-BOOK-4 ✅ — Update ERROR-PATTERN-LOG.md: ERR-001–ERR-007 status stale
- ✅ 15 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.7.0
- File: docs/ERROR-PATTERN-LOG.md
- Detail: ERR-001–007 masih listed sebagai "🔴 POLA AKTIF" padahal semua sudah ✅ resolved
- Assign: Agent 3 — Saucy
- Dependency: tidak ada

---

### ── GRAMMAR TASKS ─────────────────────────────────────────────────────────


#### TASK-9 ✅ — Grammar N4 W5-W6 Audit
- ✅ Maret 2026 — verified by Agent 6 QA
- Field connection, cat, level di n4-w5.js dan n4-w6.js sudah clean


#### TASK-GRM-1 ✅ — Buat bank soal N4 W5-W6 dan N3 W3-W6
- File: bank-soal-quiz4.js
- [Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.5.4
- Opsi B: fix grammarId di bank-soal-quiz4.js (15 baris diganti, 234/234 referential integrity PASS)
- ⚠️ Open item: N3 W2 soal ada di bank-soal-quiz4.js tapi tidak di bank-soal.js — perlu konfirmasi ke Batter (intentional atau kelewat?)


#### TASK-GRM-2 ✅ — Fix bank-soal.js entry bs-n3-w1-02
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.1
- File: bank-soal.js
- Detail: entry fill_in punya field rearrange (parts, answer array, star_pos, grammarIds) — sisa merge error
- Assign: Agent 4


#### TASK-GRM-3 ✅ — Update _schema.md — redirect VocabEntry ke _schema-vocab.md
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.1
- File: data/_schema.md
- Detail: section VocabEntry sudah obsolete, arahkan ke _schema-vocab.md
- Assign: Agent 4


#### TASK-GRM-4 ✅ — Dokumentasikan format ID di _schema.md
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.1
- File: data/_schema.md
- Detail: format {level}-w{week}d{day}-{index2digit} belum terdokumentasi dengan benar
- Assign: Agent 4


#### TASK-GRM-5 ✅ — Update komentar stale di data/index.js
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.1 (index.js fix by Crispy per GOV — Crispy scope)
- Catatan: index.js adalah file Integrator — Agent 4 TIDAK boleh edit langsung
- Agent 4 laporkan ke Integrator: komentar "N3 Week 2-6 menyusul" sudah tidak akurat
- Assign: Agent 4 (lapor) → Agent 1 (eksekusi)


#### TASK-GRM-6 ✅ — Audit dan normalisasi nilai cat
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.1 — cat list final: 82 nilai
- File: data/n3-w*.js, n4-w*.js
- Detail: 84 nilai cat unik, banyak duplikat (passive/pasif, causative/kausatif)
- ⚠️ DEPENDENCY: task ini HARUS selesai dan list cat final dikirim ke Integrator
  SEBELUM Agent 5 boleh mulai TASK-UI-4
- Assign: Agent 4


#### TASK-GRM-7 ✅ — Buat soal fill_in + rearrange N3 W2 di bank-soal.js
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.2
- File: data/bank-soal.js
- Detail: OI-1 resolved — keputusan Nugget-san 15 Maret 2026: assign ke Batter.
  bank-soal-quiz4.js sudah punya 40 soal N3 W2 (conjugation/translation).
  bank-soal.js hanya punya placeholder komentar untuk N3 W2 — perlu diisi soal fill_in + rearrange.
- Ref grammar: data/n3-w2.js (grammar entries n3-w2d1-xx s/d n3-w2d5-xx)
- Assign: Agent 4
- Priority: 🟠 TINGGI

---

### ── UI TASKS ──────────────────────────────────────────────────────────────


#### TASK-UI-0 ✅ [Maret 2026] — Fix quiz-feedback.js load order — verified by Agent 6 Crunchy
- File: index.html
- Detail: quiz-feedback.js dipindah ke baris 977, tepat sebelum fillin.js (baris 978)
- Assign: Agent 5 (koordinasi dengan Agent 1)
- Priority: 🔴 KRITIS


#### TASK-UI-1 ✅ [Maret 2026] — Fix GODAN_EXCEPTIONS tidak ada versi hiragana — verified by Agent 6 Crunchy
- File: js/conjugation-engine.js
- Detail: vocab-detail.js panggil conjugateAll(v.reading) = hiragana, tapi GODAN_EXCEPTIONS hanya kanji
  → 5+ verb godan-irregular dikonjugasi salah
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-2 ✅ [Maret 2026] — Fix Keigo table type override di normalize() — verified by Agent 6 Crunchy
- File: js/conjugation-engine.js
- Detail: normalize() pakai keigoEntry.type → 読む→して (WRONG), 見る→suru (WRONG)
- Fix: ganti `hintType || keigoEntry.type` → `hintType || inferType(w)`
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-3 ✅ [Maret 2026] — Tambah id="cat-all" ke chip Semua di catPanel — verified by Agent 6 Crunchy
- File: index.html
- Detail: browse.js panggil getElementById("cat-all") 3x, tapi id tidak ada di HTML
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-4 ✅ — Sync catPanel HTML, catLabel map, dan grammar data
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.3
- File: index.html (catPanel), js/browse.js (catLabel)
- Detail: 84 cat di data, hanya 18 tombol — 75.5% grammar cards tidak bisa difilter
- ✅ DEPENDENCY selesai: cat list final = 82 nilai (GRM-6 merged v14.6.1)
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-9 ✅ — Fix quizCatGroup key EN lama (passive → pasif, causative → kausatif)
- [15 Maret 2026] — verified by Agent 6 Crunchy, merged ke v14.6.4
- File: index.html (id=quizCatGroup, baris ~474–491)
- Detail: quizCatGroup masih pakai 'passive' dan 'causative' (key EN lama).
  Selain fix 2 key EN, perlu sync ke 82 cat lengkap (saat ini hanya 19 tombol).
  Declared out-of-scope dari TASK-UI-4 — keputusan Nugget-san 15 Maret 2026.
- ⚠️ DEPENDENCY: tunggu TASK-UI-4 approved + merged dulu
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-5 ✅ [Maret 2026] — Fix window.srsUpdate tidak terdefinisi — verified by Agent 6
- File: js/srs.js
- Detail: fillin.js:343 panggil window.srsUpdate() yang tidak pernah didefinisikan
  SRS untuk Rearrange mode diam-diam tidak jalan
- Fix: tambahkan `window.srsUpdate = function(id, quality) { srsReview(id, quality); };` di srs.js
- Assign: Agent 5
- Priority: 🔴 KRITIS


#### TASK-UI-6 ✅ [Maret 2026] — Fix restartQuiz chain di fillin.js — verified by Agent 6
- File: js/fillin.js
- Detail: fillin.js override window.restartQuiz tanpa chain ke prev
- Assign: Agent 5
- Priority: 🟠 TINGGI


#### TASK-UI-7 ✅ [Maret 2026] — Fix Streak hanya naik saat buka halaman — verified by Agent 6
- File: js/streak.js, js/core/state.js
- Detail: streak naik setiap hari baru dibuka, tanpa cek apakah user benar-benar belajar
- Assign: Agent 5
- Priority: 🟠 TINGGI


#### TASK-UI-8 ✅ — Fix Daily Word bisa tampil tanpa examples
- ✅ 17 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.11.0
- File: js/daily-word.js
- Detail: filter pool ke entry yang punya examples.length > 0 && nuance


#### TASK-UI-15 ✅ — Fix gsPickGrammar/Vocab pakai fragile querySelector
- ✅ 17 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.11.0
- Detail: querySelector('[onclick*="browse"]') fragile — ganti dengan id="tabBtnBrowse"
- Assign: Agent 5
- Priority: 🟠 TINGGI


#### TASK-UI-11 ✅ — Fix CSS: 2 blok :root duplicate variables
- ✅ 17 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.11.0. INC-001 fixed by Crispy.
- File: css/style.css
- Detail: blok :root kedua di baris ~1582 — pindahkan vars ke blok utama, hapus duplikat
- Assign: Agent 5
- Priority: 🟡 SEDANG


#### TASK-UI-12 ✅ — Fix manifest.json: SVG icon → PNG untuk iOS Safari
- ✅ 17 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.12.0
- File: manifest.json, icon-192.png (NEW), icon-512.png (NEW)
- Detail: iOS Safari tidak support SVG untuk PWA icon — generate PNG 192×192 dan 512×512
- Assign: Agent 5
- Priority: 🟡 SEDANG


#### TASK-UI-13 ✅ — Update README.md — 5 inkonsistensi
- ✅ 17 Maret 2026 — verified by Agent 6 Crunchy, merged ke v14.11.0
- File: README.md
- Detail: N4 W5-W6 belum masuk tabel, total grammar 210→234, referensi vocab-n3.js (nama lama)
- Assign: Agent 5
- Priority: 🟡 SEDANG


#### TASK-UI-14 ✅ — Tambah PWA icon ke sw.js ASSETS
- ✅ 17 Maret 2026 — dikerjakan Crispy saat merge TASK-UI-12, v14.12.0
- File: sw.js
- Dependency: TASK-UI-12 harus selesai dulu
- Assign: Agent 5 (koordinasi dengan Agent 1 untuk bump versi)
- Priority: 🟡 SEDANG

---

### ── QA TASKS ──────────────────────────────────────────────────────────────


#### TASK-QA-INIT-1 ✅ — Audit menyeluruh v14.5.3
- ✅ Maret 2026 — selesai. Temuan terdokumentasi di docs/AGENT6-QA-AuditReport.docx
- 21 temuan Agent 5 di-cross-check, 2 temuan baru ditemukan (NEW-QA-1, NEW-QA-2)


#### TASK-QA-INIT-2 ✅ — Buat data/qa-tests.js
- ✅ Maret 2026 — verified by Agent 6 Crunchy
- 4 test suite: grammarId integrity, duplicate ID, vocab_id integrity, POS validity
- File: data/qa-tests.js (baru)
- Detail: formalisasi test cases konjugasi dan data validation
- Assign: Agent 6

