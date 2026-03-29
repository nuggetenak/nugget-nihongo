# Nugget Nihongo — Roadmap
> Dibuat: Maret 2026 · Verified by Agent 6 QA
> Ini bukan task list teknis — ini peta jalan besar project.
> Untuk task teknis detail, lihat _MAP.md.

---

## Cara Baca Dokumen Ini

Setiap fase punya **definisi selesai** yang jelas — Integrator tidak boleh declare fase selesai sebelum semua kriteria terpenuhi. Agent tidak perlu baca semua fase — cukup baca fase yang sedang aktif.

---

## Fase 1 — Stabilisasi
**Status: 🟡 AKTIF SEKARANG**
**Tujuan: App yang sudah ada harus berfungsi sempurna tanpa bug.**

Selama masih ada bug kritis, jangan tambah fitur baru. Ini adalah fase paling penting karena fondasi yang rapuh akan merusak semua fase berikutnya.

Yang harus selesai:
- Load order script di index.html diperbaiki (error-boundary.js dan quiz-feedback.js salah posisi)
- Semua quiz mode berjalan tanpa error — fill-in, rearrange, conjugation, translation, error-find, multiple choice
- SRS rearrange mode berjalan (window.srsUpdate sudah didefinisikan)
- Konjugasi engine sempurna — verb godan dengan input hiragana menghasilkan hasil yang benar
- Filter kategori di catPanel berfungsi — semua 84 nilai cat bisa difilter
- Bank soal N4 W5-W6 dan N3 W3-W6 lengkap
- Semua POS values di vocab N4-N5 sudah seragam dan valid
- Category panel chip "Semua" berfungsi dengan benar

**Definisi selesai Fase 1:**
Semua task berlabel 🔴 KRITIS di _MAP.md sudah ✅ APPROVED oleh Agent 6 QA.

---

## Fase 2 — Konten Lengkap
**Status: 🔴 Belum mulai**
**Tujuan: Konten yang ada terasa premium dan lengkap sebelum ekspansi.**

Jangan mulai fase ini sebelum Fase 1 selesai.

Yang harus selesai:
- **Maksimalkan vocab N5** — semua 413 entry N5 Core dan 416 N5 Soumatome harus punya contoh kalimat, nuance, dan semua field terisi lengkap
- **Maksimalkan vocab N4** — semua 656 N4 Soumatome dan 36 N4 Core diperlakukan sama
- **Book index Minna no Nihongo 1 & 2** — terisi vocab_ids dan grammar_ids per chapter
- **Book index Irodori A1, A2-1, A2-2** — terisi per unit
- **Vocab N3 mulai diisi** — minimal 50 entry aktif sebelum diaktifkan
- **Conjugation engine** — cover semua edge case, selfTest() 0 failures
- Dokumentasi dan README diupdate

**Definisi selesai Fase 2:**
Semua entry vocab N4-N5 punya examples[] minimal 1 kalimat. Book index minimal 1 buku terisi penuh. Vocab N3 aktif dengan data yang bersih.

---

## Fase 3 — Local Backup & Sync
**Status: 🔴 Belum mulai**
**Tujuan: User tidak kehilangan progress meski ganti device.**

Jangan mulai fase ini sebelum Fase 2 cukup stabil (minimal N4-N5 selesai).

Yang harus selesai:
- Progress tersimpan rapi di localStorage device
- Fitur **Export** — user bisa simpan file backup progress ke device mereka
- Fitur **Import otomatis** — app auto-detect file backup di device tanpa user harus cari manual, cukup satu tombol
- Backup ringan terenkripsi di sisi device
- UI yang jelas dan mudah — bahkan user gaptek bisa pakai tanpa bingung

**Catatan arsitektur:** Fase ini tidak butuh backend atau server. Semua data tetap di device user — sesuai prinsip offline-first. User system berbasis Supabase atau cloud dipertimbangkan di masa depan yang jauh, bukan sekarang.

**Definisi selesai Fase 3:**
User bisa export progress, pindah device, import, dan semua progress kembali seperti semula. Tanpa perlu akun, tanpa perlu internet.

---

## Fase 4 — Personalisasi & Gamifikasi
**Status: 🔴 Belum mulai**
**Tujuan: App terasa personal dan membuat user ingin terus belajar.**

Jangan mulai fase ini sebelum Fase 3 selesai.

Yang harus selesai:
- **Pilihan level saat mulai** — 0 (Pemula Absolut), Beginner, Intermediate, Expert, Explorer Mode
- **Learning Path** — flow belajar yang direkomendasikan per level dan per buku. User level 0 yang pilih Minna no Nihongo otomatis dapat urutan belajar yang optimal
- **Adaptive SRS** — sistem review yang makin personal. Tau bahwa user ini cepat hafal kata benda tapi kesulitan verb godan, dan adjust frekuensi review sesuai itu
- **Hint & tips kontekstual** — bukan cuma "ini jawabannya" tapi "kamu sering salah di pola ini, ini penjelasannya"
- **Achievement & milestone** — badge dan title untuk pencapaian nyata (bukan gimmick)
  - Contoh meaningful: "N5 Grammar Week 1 Selesai", "100 Kata Hafal", "Streak 7 Hari"
  - Title bisa dipasang di profil lokal
  - Badge bisa ditampilkan di main menu
- **Profil lokal** — username dan avatar sederhana, tersimpan di device

**Definisi selesai Fase 4:**
User yang mulai dari 0 punya jalur belajar yang jelas. Ada minimal 10 achievement yang meaningful. SRS terasa berbeda untuk setiap user berdasarkan histori belajar mereka.

---

## Fase 5 — Polish & Identitas
**Status: 🔴 Belum mulai — bisa paralel dengan fase lain**
**Tujuan: App terasa punya identitas dan hubungan dengan usernya.**

Fase ini bisa dikerjakan paralel dengan fase lain untuk elemen yang tidak bergantung pada fitur baru.

Yang harus selesai:
- **UI overhaul** — lebih clean, lebih friendly, tidak overwhelming. First screen langsung kasih tau user "mau ngapain dulu?"
- **Ramah semua umur** — font yang mudah dibaca, kontras yang cukup, tombol yang besar dan jelas
- **Feedback button** — kirim email ke alamat feedback Nugget Nihongo langsung dari app
- **Patch history & update notes** — user bisa lihat apa yang baru di setiap versi
- **Credit page** — nama developer (nugget-san), credit kontributor
- **Footer dokumentasi** — informasi dasar tentang app
- **Nugget-san mascot** — karakter yang jadi identitas visual app, dikembangkan bertahap
- **Social media links** — menyusul di masa depan
- **PWA icon yang proper** — PNG untuk iOS Safari (bukan SVG)

**Definisi selesai Fase 5:**
App terasa punya "wajah" dan identitas yang konsisten. User yang baru buka untuk pertama kali tidak perlu bingung harus mulai dari mana.

---

## Fase 6 — Ekspansi Konten
**Status: 🔴 Belum mulai — jangka panjang**
**Tujuan: Nugget Nihongo jadi referensi terlengkap belajar bahasa Jepang yang gratis.**

Yang akan dikerjakan:
- **Vocab N2 dan N1** — Soumatome dan Core
- **Buku tambahan** — selain Minna no Nihongo dan Irodori
- **Modul Pemula Absolut** — konten khusus untuk yang benar-benar dari 0. Mulai dari pengenalan hiragana, katakana, cara baca, sampai kalimat pertama
- **Modul SSW (Specified Skilled Worker)** — persiapan ujian bahasa Jepang untuk visa kerja. Ini penting karena banyak user yang belajar Jepang dengan tujuan bekerja di sana
- **Konten budaya Jepang** — sebagai konteks belajar, bukan sekadar hafalan

**Catatan:** Fase ini tidak punya definisi selesai — ini adalah fase yang terus berkembang seiring kontribusi dan kebutuhan user.

---

## Catatan untuk Agent

- **Baca VISION.md dulu** sebelum baca ini — semua yang ada di sini serve visi di sana
- **Jangan lompat fase** — setiap fase punya prasyarat dari fase sebelumnya
- **Kalau ragu prioritas** — fase yang lebih awal selalu lebih prioritas
- **Fase 5 adalah pengecualian** — elemen polish yang tidak bergantung fitur baru boleh dikerjakan kapanpun

---

## Catatan untuk Developer (nugget-san)

Kalau kamu bingung "ini project mau ke mana?" — baca VISION.md.
Kalau kamu bingung "ini harus dikerjain sekarang atau nanti?" — baca dokumen ini.
Kalau kamu bingung "ini task siapa?" — baca _MAP.md.

Tiga dokumen itu adalah sistem navigasi project ini.
