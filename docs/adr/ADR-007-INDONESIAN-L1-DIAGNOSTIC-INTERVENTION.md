# ADR-007: Indonesian L1 Contrastive Interference Diagnostics and Metalinguistic Feedback

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0 / Corpus v30)

## Context & Problem Statement
Pembelajar bahasa Jepang dari Indonesia tidak membuat kesalahan secara acak (*random errors*). Sebaliknya, kesalahan mereka adalah hasil dari **transfer negatif sistematis (*negative transfer / catastrophic L1 interference*)** akibat benturan tipologi struktural antara bahasa Indonesia (Austronesia, SVO, preposisi bebas, tanpa infleksi kala/aspek) dengan bahasa Jepang (Japonik, SOV, pascaposisi kasus yang terikat argumen verba, infleksi morfologis kaya).

Contoh klasik interferensi katastropik:
1. **Kolisi Preposisi "DI" (に vs で):** Bahasa Indonesia hanya mengenal *di*. Di Jepang, tinggal (*sumu*) menuntut **に** (keberadaan statis permanen), sedangkan bekerja (*hataraku*) menuntut **で** (arena tindakan dinamis).
2. **Transfer Objek Statif (が vs を):** Kata *suka*, *bisa*, *paham* di L1 adalah verba transitif ("Saya menyukai kopi" $\rightarrow$ `私はコーヒーを好き`). Di Jepang, predikat ini adalah sifat-statif yang menuntut partikel nominatif **が**.
3. **Klausa Relatif Terbalik (*Head-Initial vs Head-Final*):** L1 menyusun nomina sebelum klausa penjelas ("Buku [yang dibeli kemarin]"), sedangkan bahasa Jepang mutlak meletakkan klausa penjelas di depan nomina kepala (`[昨日買った] 本`).
4. **Distingsi Arah Benefaktif (あげる vs くれる vs もらう):** Pembelajar mentransfer "memberi" secara netral tanpa menghitung teritorial psikologis penutur (*inward vs outward benefactive*).

Tanpa intervensi diagnostik khusus, kesalahan-kesalahan ini mengalami **fosilisasi (*fossilization*)**, tetap bertahan bahkan setelah pembelajar lulus ujian N3 atau N2.

## Empirical SLA Grounding
- **Maarif (2021 [EA-27], 2023 [EA-22]):** Studi akuisisi partikel kasus dan klausa adnominal pada pembelajar Indonesia membuktikan bahwa kesalahan substitusi partikel berakar pada konsep relasi argumen verba (*kou*), dan bahwa instruksi kesadaran metalinguistik eksplisit (*explicit metalinguistic awareness*) mutlak dibutuhkan untuk merestrukturisasi sistem interlanguage pembelajar.
- **Alifah, Kadir, & Risagarniwa (2020) [EA-28]:** Mendokumentasikan eror fosilisasi persisten pembelajar Indonesia pada verba transitif-statif (menukar を untuk が pada *suki*, *deki*, *wakaru*).
- **Prihantoro et al. (2024 [EA-26], 2025 [EA-23]):** Analisis korpus pembelajar Indonesia (DICO-JALF dan LPK Cahaya Mandiri) membuktikan konsentrasi eror masif pada 6 ranah kontrastif utama.
- **Corder (1967) [EA-01] & Selinker (1972) [EA-03]:** Kesalahan pembelajar harus diperlakukan sebagai jendela pengujian hipotesis interlanguage yang memerlukan *pushed output* dan koreksi diferensial.

## Decision Drivers & Decisions
1. **Penyusunan 300 Butir Diagnostik Granular:**
   - 150 butir L1 Morfosintaksis & Leksikal (`cp-l1-001` s.d. `cp-l1-150`) mencakup 6 domain: Partikel Kasus, Kala/Aspek, False Cognates Gairaigo, Benefaktif, Klausa Adnominal, dan Konektor Wacana/Modalitas/Kondisional.
   - 150 butir Fonologi & HVPT Minimal Pairs (`cp-phon-001` s.d. `cp-phon-150`) mencakup Tokyo Pitch Accent, Chōon, Sokuon, Yōon, dan Pasangan Kritis K3.
2. **Kompilasi ke Data Layer Aplikasi:**
   - Disimpan di `public/data/confusion-pairs.js` dan `public/data/diagnostic/diagnostic-inventory.json`.
   - Diintegrasikan ke dalam `src/lib/data/diagnosticManager.ts` dan fungsi kuis `generateDiagnosticQuestions()`.
3. **Arketipe Kartu Khusus `contrastive_pair_slot`:**
   - Menyajikan kalimat dengan celah kosong, di mana salah satu opsi jawaban adalah **Jebakan L1 Spesifik (*L1 Trap Distractor*)**.
   - Memilih opsi jebakan memicu **Peringatan Gap Metalinguistik Eksplisit (*Explicit Metalinguistic Gap Warning*)** di kartu belakang yang menjelaskan akar perbedaan sintaksis L1 vs L2.
4. **Bobot Kesulitan FSRS Ekstra ($D_0 = 7.2$):**
   - Setiap kartu diagnostik diinisialisasi dengan prior kesulitan tinggi untuk memastikan interval ulasannya dipercepat, mencegah fosilisasi sebelum mengakar.

## Consequences & Verification
- **Positif:** Mengeliminasi transfer negatif persisten dalam 30 hari; menghasilkan pemahaman argumen tata bahasa yang kokoh di tingkat percakapan nyata.
- **Pemetaan Design Decision:** DD-13, DD-14, DD-15, DD-16, DD-17, DD-18, DD-108.
