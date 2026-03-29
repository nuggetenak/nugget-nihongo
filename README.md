# 📚 Nugget — Nihongo · 日本語文法

> Referensi & Quiz Tata Bahasa Jepang JLPT N1–N5  
> Progressive Web App · Offline · SRS · Streak · by Nugget

---

## 🌐 Live Demo

**→ https://nuggetenak.github.io/nugget-nihongo**

---

## ✨ Fitur

| Fitur | Status |
|---|---|
| 📚 Browse grammar cards (N3 W1–W6, N4 W1–W4) | ✅ |
| 🎯 Quiz Flip Card + self-assess | ✅ |
| ✏️ Quiz Fill-in (kalimat berlubang) | ✅ |
| 🔀 Quiz Susun Kalimat (rearrange — JLPT 問題2) | ✅ |
| 🔤 Quiz Conjugation (ubah bentuk kata kerja) | ✅ |
| 🔄 Quiz Translation (JP ↔ Indonesia) | ✅ |
| 🔍 Quiz Error Finding (cari kalimat salah) | ✅ |
| 🎯 Quiz Multiple Choice (pilih grammar tepat) | ✅ |
| ⚡ Quick Review (SRS due today) | ✅ |
| 🧠 SRS SM-2 (Anki algorithm) | ✅ |
| 📊 Progress Panel (Mature/Young/Learning) | ✅ |
| 🔥 Day Streak + broken animation | ✅ |
| ☀️🌙 Light / Dark mode | ✅ |
| 📱 PWA — installable + offline | ✅ |
| N1, N2, N5 content | 🚧 |

---

## 📊 Status Konten

| Level | Week | Grammar | Fill In | Rearrange | Conj | Trans | ErrFind | MultiChoice |
|-------|------|---------|---------|-----------|------|-------|---------|-------------|
| N3 | W1 | ✅ 18 | ✅ 20 | ✅ 5 | ✅ 5 | ✅ 5 | ✅ 5 | ✅ 5 |
| N3 | W2 | ✅ 22 | ✅ 15 | ✅ 5 | ✅ 5 | ✅ 5 | ✅ 5 | ✅ 5 |
| N3 | W3–W6 | ✅ 92 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 |
| N4 | W1–W4 | ✅ 78 | ✅ 60 | ✅ 20 | ✅ 20 | ✅ 20 | ✅ 20 | ✅ 20 |
| N4 | W5–W6 | ✅ 24 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 |
| N1, N2, N5 | — | 🚧 dummy | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 | 🚧 |

**Total grammar: 234 pola** (N3: 132 · N4: 102)*  
**Total bank soal: ~364 soal**

\* grammar pattern di workbook (n\*-w\*.js)

---

## 📁 Struktur Project

```
nugget-nihongo/
├── index.html
├── manifest.json
├── sw.js
├── css/style.css
├── js/
│   ├── app.js, browse.js, quiz.js, srs.js, swipe.js, streak.js
│   ├── fillin.js, conjugation.js, translation.js
│   ├── errorfind.js, multichoice.js
│   ├── quiz-generator.js, quiz-vocab.js, quiz-mixed.js
│   ├── quiz-feedback.js, quiz-typetr.js
│   ├── browse-vocab.js, vocab-detail.js, global-search.js
│   ├── daily-word.js, detail.js, conjugation-engine.js
│   ├── error-boundary.js
│   ├── lang/lang-core.js
│   └── core/ (version.js, state.js, router.js, theme.js, install.js, grammar-query.js)
├── data/
│   ├── grammar-n3.js          (132 pola N3 — ⚠️ belum aktif, tunggu engine RESTRUKTURISASI-D)
│   ├── grammar-n4.js          (102 pola N4 — ⚠️ belum aktif, tunggu engine RESTRUKTURISASI-D)
│   ├── vocab-n5.js            (711 entries, aktif)
│   ├── vocab-n4.js            (692 entries, aktif)
│   ├── bank-soal.js, bank-soal-n4.js
│   ├── bank-soal-quiz4.js     (120 soal)
│   └── dummy.js, vocab-index.js, index.js
├── docs/
│   ├── [Research DBs]         INCONSISTENCY-DB, RATE-LIMIT-DB, VIOLATION-DB, dll
│   ├── governance/            Governance scope documents + proposals aktif
│   │   ├── archive/           Versi lama governance docs
│   │   └── proposals/         Proposal documents
│   └── operational/           Dokumen operasional per task (diarchive setiap merge)
│       ├── qa-verdicts/
│       ├── dispatch-clearances/
│       ├── patch-notes/
│       └── session-proofs/
└── tools/scripts/
    ├── spicy/                 Post-merge scan scripts (Agent 7)
    └── utils/                 Work utilities semua agent (55+ scripts)
```

---

*Dibuat dengan ❤️ untuk belajar bahasa Jepang — がんばろう！*
