# ADR-005: Progressive Furigana Degradation and Orthographic Transition Policies

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Pembelajar bahasa Jepang dari rumpun bahasa berbasis alfabet Latin (seperti bahasa Indonesia) menghadapi dilema ortografis yang berat:
1. **Perangkap Ketergantungan Romaji (*Romaji Crippling Effect*):** Jika romaji disediakan terus-menerus, mata pembelajar secara otomatis mengabaikan huruf kana/kanji, menghambat pembentukan rute fonologis langsung (*direct phonological route*) dan pemisahan mora (*moraic segmentation*).
2. **Dinding Kanji Mendadak (*Kanji Wall*):** Jika pembelajar langsung dipaksa membaca teks kanji tanpa bantuan bacaan furigana di awal belajar, beban kognitif melonjak tajam dan mematikan pemahaman bacaan.
3. **Ketergantungan Furigana Permanen (*Furigana Crutch*):** Jika furigana dibiarkan tampil selamanya, pembelajar membaca furigana hiragana kecil di atas huruf dan tidak pernah memproses radikal kanji di bawahnya (*visual attentional capture*).

## Empirical SLA & Psycholinguistic Grounding
- **Chikamatsu (1996) [ER-20]:** Pembelajar L1 bersistem alfabetik (seperti L1 Indonesia) memproses tulisan Jepang melalui mediasi fonologis (*phonological recoding*). Ketergantungan berlebih pada romaji memperlambat transisi pembacaan morfemik kanji hingga 300%.
- **Perfetti & Tan (1998) [PR-01]:** Dalam pembacaan karakter logografis/morfemik kanji, pengenalan bentuk visual ortografis mendahului aktivasi fonologis sebesar 50–100 milidetik pada pembelajar mahir. Furigana permanen menghalangi pembentukan jalur leksikal langsung ini.
- **Matsunaga (1999) [OD-20]:** Pembelajar tanpa latar belakang kanji membutuhkan perlakuan khusus: penopang bertahap yang secara terukur dilepaskan (*scaffolding fading*) saat stabilitas memori menguat.
- **Carver (1994) [ER-01] & Hu & Nation (2000) [BC-08]:** Kelancaran membaca ekstensif menuntut 98% cakupan leksikal yang dikenali secara instan. Penopang bacaan harus memfasilitasi kelancaran tanpa menjadi distraksi.

## Decision Drivers & Decisions
Nugget Nihongo menerapkan kebijakan **4-Tahap Degradasi Furigana Bertahap (*Progressive Furigana Degradation*)**:

1. **Tahap 1 — N5 Unit 0 (Fondasi Aksara):**
   - Romaji diperbolehkan HANYA pada kartu pengenalan Hiragana/Katakana awal dan ujaran beku salam.
   - **Batas Mutlak:** Begitu pengguna lulus Unit 0 (Uji Mandiri Hiragana/Katakana), seluruh teks romaji di seluruh layar materi dan kuis **DIHAPUS SECARA PERMANEN**.
2. **Tahap 2 — N5 & N4 (Furigana Wajib):**
   - Semua kanji wajib memiliki furigana hiragana di atasnya pada tampilan kartu materi dan contoh kalimat.
   - Pilihan toggle furigana tersedia di pengaturan bagi pembelajar yang ingin menantang diri.
3. **Tahap 3 — N3 (Fading Berbasis Stabilitas FSRS):**
   - Furigana ditampilkan secara default, namun pada kartu kosakata yang telah berstatus *Matang* ($S \ge 21\text{ hari}$), furigana secara otomatis disamarkan (*blurred / faded*).
   - Ketukan jari (*tap-to-reveal*) membuka furigana seketika jika pengguna ragu.
4. **Tahap 4 — N2 & N1 (Otentik Full-Kanji Default):**
   - Teks kalimat bacaan dan contoh disajikan tanpa furigana secara default, meniru kondisi otentik surat kabar Jepang dan lembar ujian resmi JLPT.
   - Furigana hanya muncul saat kata di-tap dalam mode inspeksi kartu.

## Consequences & Verification
- **Positif:** Mengeliminasi ketergantungan romaji dalam 7 hari pertama belajar; menjamin kesiapan transisi visual ke ujian resmi JLPT N3–N1.
- **Pemetaan Design Decision:** DD-25, DD-26, DD-43, DD-44, DD-45, DD-46.
