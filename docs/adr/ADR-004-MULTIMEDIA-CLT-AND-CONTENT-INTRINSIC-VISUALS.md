# ADR-004: Cognitive Load Theory, CTML, and Content-Intrinsic Visual Assets

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Banyak platform pembelajaran bahasa menambahkan elemen visual dekoratif:
- Maskot kartun animasi yang melompat-lompat di pojok layar.
- Foto pemandangan Jepang atau ilustrasi abstrak yang tidak berhubungan langsung dengan target gramatikal.
- Efek partikel, kilatan koin, dan latar belakang bergerak saat kartu dibalik.

Meskipun tampak "menyenangkan", dalam Cognitive Load Theory elemen-elemen ini bertindak sebagai **seductive details** (detail pemikat yang tidak relevan) yang membebani memori kerja pembelajar dan merusak penguraian form-meaning mapping.

## Empirical SLA & Cognitive Load Grounding
- **Sweller (1988) [CLT-01] & Sweller, van Merriënboer, & Paas (2019) [CLT-02]:** Beban kognitif total terdiri dari beban intrinsik, beban asing (*extraneous load*), dan beban erat (*germane load*). Elemen visual non-fungsional meningkatkan *extraneous load*, yang secara langsung mengurangi ruang memori kerja untuk membangun skema mental tata bahasa baru.
- **Mayer (2021) [CT-01]:** *Cognitive Theory of Multimedia Learning (CTML)* merumuskan beberapa prinsip kunci:
  - *Coherence Principle:* Pembelajar belajar lebih baik ketika kata, suara, dan gambar asing disingkirkan.
  - *Spatial Contiguity Principle:* Teks penjelas dan visual harus berada berdampingan erat tanpa memerlukan navigasi mata yang terpisah (*split-attention*).
  - *Signaling Principle:* Menyoroti bagian penting secara visual memandu proses seleksi informasi.
- **Garner et al. (1989) [CM-18]:** Membuktikan bahwa "detail pemikat" (*seductive details*) mengalihkan perhatian pembelajar dari proposisi gramatikal inti, menurunkan transfer belajar hingga 30%.
- **Paivio (1986) [DC-01]:** *Dual Coding Theory* membuktikan bahwa pengkodean visual dan verbal memperkuat retensi hanya jika visual secara akurat menggambarkan representasi semantis kata konkret.

## Decision Drivers & Decisions
1. **Prinsip Konten Intrinsik Mutlak (*Strict Content-Intrinsic Rule*):**
   - Setiap aset visual di Nugget Nihongo **wajib** mencerminkan makna semantis atau konteks situasi konkret dari target kosakata/tata bahasa.
   - Ilustrasi **DIWAJIBKAN** untuk nomina konkret (misal: alat kerja, makanan, kendaraan, arah gerak fisik).
   - Ilustrasi **DILARANG** untuk partikel kasus abstrak (seperti *wa*, *ga*, *ni*, *de*) atau idiom konseptual tinggi yang visualisasinya ambigu, karena memicu disonansi interpretasi.
2. **Eliminasi Maskot dan Animasi Non-Pedagogis:**
   - Tidak ada maskot berjalan atau animasi latar yang bersaing memperebutkan atensi visual pada saat kuis atau latihan SRS sedang berlangsung.
3. **Penerapan Prinsip Keterdekatan Spasial (*Spatial Contiguity*):**
   - Teks kanji, bacaan kana, makna Indonesia, dan gambar diletakkan dalam satu kontainer kartu yang rapat tanpa batas scroll pemisah.
4. **Pewarnaan Signalisasi Fungsional (*Functional Signaling*):**
   - Warna dalam aplikasi dialokasikan secara fungsional:
     - Emas/Amber: Elemen navigasi & fokus utama.
     - Merah: Larangan K3 / Jebakan L1 transfer.
     - Hijau: Bentuk target native benar.
     - Biru/Ungu: Modus audio fonologi / aksen nada.

## Consequences & Verification
- **Positif:** Retensi meningkat, kelelahan mata berkurang drastis pada sesi malam hari, dan aplikasi tetap responsif pada perangkat berspesifikasi rendah.
- **Pemetaan Design Decision:** DD-01, DD-02, DD-03, DD-04, DD-05, DD-06, DD-40, DD-41, DD-42.
