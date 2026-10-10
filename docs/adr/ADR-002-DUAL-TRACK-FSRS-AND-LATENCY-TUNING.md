# ADR-002: Dual-Track FSRS Scheduling, Response Latency Weighting, and Session Bounds

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Algoritma Spaced Repetition konvensional (seperti SuperMemo SM-2 atau Anki default) memperlakukan sebuah butir memori (*memory node*) sebagai entitas skalar tunggal. Jika pengguna menekan "Good" atau "Easy", kartu diasumsikan telah dikuasai secara menyeluruh.

Dalam pembelajaran bahasa Jepang oleh penutur asing non-kanji (seperti pembelajar Indonesia), terdapat disosiasi neurobiologis yang tajam antara dua modalitas:
1. **Modalitas Orto-Visual (Pengenalan Tulisan Kanji/Kana):** Pembelajar mampu mengenali karakter kanji saat membaca lambat di layar.
2. **Modalitas Audio-Fonologis (Penguraian Wicara Cepat):** Ketika mendengar kata yang sama dalam wicara alami berkecepatan 1.0x native, pembelajar gagal mengidentifikasi morfem tersebut sebelum gelombang suara berikutnya tiba.

Selain itu, pembelajar seringkali membutuhkan waktu berpikir 8–10 detik untuk mengingat suatu kata (pengambilan memori lambat / *effortful declarative retrieval*), namun tetap menekan tombol "Ingat / Benar". Algoritma SM-2 konvensional menganggap ini setara dengan reflek otomatis (<1000 ms), sehingga menjadwalkan interval pengulangan yang terlalu jauh dan memicu kelupaan di dunia nyata.

## Empirical SLA & Cognitive Science Grounding
- **Ye et al. (2024) [SRS-05]:** Free Spaced Repetition Scheduler (FSRS) memodelkan memori manusia berbasis stabilitas $S$ (waktu yang dibutuhkan untuk retrievability $R$ turun ke 90%) dan kesulitan $D$, memberikan akurasi prediksi retensi 28% lebih tinggi dibanding algoritma berbasis interval faktor heuristik SM-2.
- **Vidal (2011) [LS-11] & Port et al. (1987) [PH-16]:** Penguraian wicara L2 membutuhkan komputasi fonologis real-time yang independen dari dekoding grafis teks. Kemampuan membaca tidak secara otomatis mentransfer kelancaran persepsi aural (*aural-comprehension transfer asymmetry*).
- **Mory (2004) [OD-14], Corbett & Anderson (1995) [OD-15]:** Waktu latensi respons ($\Delta t$) berkorelasi langsung dengan kekuatan jejak memori (*trace strength*). Respons benar dengan $\Delta t > 3500\text{ ms}$ menunjukkan ketiadaan proseduralisasi (masih dalam ranah deklaratif rapuh).
- **Matsunaga (1999) [OD-20]:** Pembelajar tanpa latar belakang kanji (non-kanji L1 seperti Indonesia) membutuhkan rata-rata **2.3× lebih banyak paparan** per karakter kanji dibanding pembelajar L1 Mandarin/Korea untuk mencapai paritas retensi yang setara.
- **Cowan (2001) [WM-02] & Sweller (1988) [CLT-01]:** Batas memori kerja adalah $4 \pm 1$ chunk. Sesi belajar di atas 7–10 menit pada perangkat seluler memicu kelelahan kognitif (*cognitive depletion*) yang menurunkan efisiensi konsolidasi sinaptik.

## Decision Drivers & Decisions
1. **Dual-Track Stability Scheduling ($S_{\text{audio}}$ vs $S_{\text{ortho}}$):**
   - Setiap kartu kosakata dan tata bahasa memiliki dua parameter stabilitas independen:
     - $S_{\text{ortho}}$: Ditingkatkan melalui kuis teks, kanji recognition, dan cloze writing.
     - $S_{\text{audio}}$: Ditingkatkan HANYA ketika pembelajar berhasil mengidentifikasi kata melalui stimulus audio murni (tanpa teks di layar).
2. **Pembobotan Latensi Respons ($\Phi(\Delta t)$):**
   - Interval pengulangan FSRS disesuaikan secara dinamis oleh faktor latensi:
     $$\Phi(\Delta t) = \max\left(0.5, \, 1.0 - \frac{\Delta t - 1200\text{ ms}}{3000\text{ ms}}\right)$$
   - Respons benar yang membutuhkan waktu $\ge 4000\text{ ms}$ secara otomatis diberi penalti stabilitas (diperlakukan mirip dengan "Hard" alih-alih "Easy").
3. **Kalibrasi Prior Kesulitan Kanji Indonesia ($D_0 = 7.2$):**
   - Seluruh kartu kanji dan kosakata berkanji kompleks diinisialisasi dengan tingkat kesulitan awal $D_0 = 7.2$ (skala 1–10) dengan interval hari pertama yang lebih rapat ($S_0 = 1.2\text{ hari}$ alih-alih default FSRS $S_0 = 2.5\text{ hari}$) untuk mengompensasi rasio 2.3× Matsunaga (1999).
4. **Batas Mutlak Sesi Mikro 5–7 Menit:**
   - Aplikasi secara otomatis mengakhiri sesi latihan setelah 12–18 kartu atau waktu berjalan mencapai 300–420 detik, mengarahkan pembelajar ke layar rangkuman metakognitif.

## Consequences & Verification
- **Positif:** Mencegah ilusi penguasaan (*illusion of competence*); menjamin kelancaran persepsi wicara saat diuji di dunia nyata.
- **Pemetaan Design Decision:** DD-53, DD-54, DD-55, DD-56, DD-57, DD-58, DD-59, DD-60.
