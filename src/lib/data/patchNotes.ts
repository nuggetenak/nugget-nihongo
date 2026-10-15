// ══════════════════════════════════════════════════════════════════
//  patchNotes.ts — Riwayat Catatan Rilis & Pembaruan Nugget Nihongo
//  Merekam evolusi sistem dari inisiasi awal hingga v17.1.0
// ══════════════════════════════════════════════════════════════════

export interface PatchNote {
  version: string;
  releaseName: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  friendlySummary?: string;
  highlights: string[];
  details: {
    category: string;
    items: string[];
  }[];
}

export const PATCH_NOTES_HISTORY: PatchNote[] = [
  {
    version: 'v19.3.1',
    releaseName: 'Light Theme Default, Continuous Kanji Ink Flow, FSRS Memory Vault & 10.508+ Vocab Ingestion',
    date: '16 Oktober 2026',
    type: 'patch',
    friendlySummary: 'Pembaruan besar untuk kenyamanan belajar harian: tampilan tema terang ramah di mata sebagai setelan awal, goresan kanji mengalir mulus bagai kuas kaligrafi, pusat pemantauan daya ingat FSRS, dan penambahan basis data lengkap hingga 10.508 kosakata.',
    highlights: [
      'Tema Terang Hangat Bawaan (Default Light Theme): Tampilan aplikasi kini dimulai dalam mode terang bernuansa kertas Washi Jepang (#FDFBF7) yang nyaman di mata untuk sesi belajar siang hari, dengan garis tepi proporsional.',
      'Aliran Tinta Kaligrafi Kanji Kontinu: Animasi goresan kanji kini mengalir mulus dari ujung kuas secara bertahap (1.2 detik per goresan) tanpa garis yang melompat tiba-tiba.',
      'Transformasi Pusat Retensi FSRS (Memory Vault): Menu Kebun Kata kini berevolusi menjadi Pusat Retensi ilmiah untuk melihat sebaran stabilitas ingatan, kurva kelupaan, dan kartu jatuh tempo.',
      'Integrasi 10.508+ Kosakata Lengkap: Seluruh data staged expansion berhasil digabungkan ke database aktif (N5: 1.321, N4: 1.286, N3: 2.580, N2: 2.104, N1: 3.217) lengkap dengan contoh kalimat bahasa Indonesia.',
      'Bedah Arena Kuis Mission Launchpad: Tata letak arena kuis ditata ulang dengan kontrol langsung level dan panjang sesi (10–30 soal), kartu review prioritas, dan tombol "Lanjut" kontras tinggi.',
      'Sensei AI Dynamic Router: Indikator tutor cerdas kini secara dinamis menampilkan model aktif (OpenRouter Qwen 2.5 72B / Gemini) serta statistik token yang transparan.',
      'Humanisasi Catatan Rilis: Tombol alih bahasa ramah pelajar vs detail teknis pengembang agar pengguna tidak merasa terasing dengan istilah rumit.',
    ],
    details: [
      {
        category: 'Tema & Visual Refinement',
        items: [
          'Inisialisasi :root dan <html> dengan kelas default .light bernuansa #FDFBF7, token border var(--border-theme) 12% opacity.',
          'Penyempurnaan tombol taktil dengan kontras tinggi (bg-amber-500 text-stone-950 font-black) untuk menghilangkan tombol yang tersamar di tema terang.',
          'Perbaikan ketebalan garis tepi (outlines) pada seluruh card komponen agar tidak terasa tebal berlebihan.',
        ],
      },
      {
        category: 'Animasi & Interaksi Kanji Dojo',
        items: [
          'Kalibrasi @keyframes drawStroke dengan stroke-dashoffset 1000 -> 0 dan durasi 1.2s.',
          'Eliminasi pil redundant "N5+N4 Dasar" dan perbaikan kontras teks tombol aktif.',
          'Penghilangan teks putih pada latar belakang transparan/terang pada pil level aktif.',
        ],
      },
      {
        category: 'Arsitektur Basis Data & FSRS',
        items: [
          'Ingesti 5.669 entri staged expansion (n1-staged hingga n5-staged) melampaui 10.508+ kosakata aktif terverifikasi.',
          'Pembersihan 500x placeholder [TBD] menjadi contoh kalimat bahasa Indonesia yang bermakna.',
          'Metrik analitik FSRS (Stabilitas S, Kesulitan D, Retrievability R) dan distribusi status memori (New, Learning, Review, Relearning).',
        ],
      },
      {
        category: 'Sensei AI & Integrasi API',
        items: [
          'Auto-router mendeteksi token sk-or- dan mengarahkan ke OpenRouter (Qwen 2.5 72B / Llama 3.3 70B / DeepSeek).',
          'Pencatatan tokensUsed dan label modelUsed dinamis per-bubble percakapan.',
        ],
      },
    ],
  },
  {
    version: 'v19.3.0',
    releaseName: 'Warm Sumi & Golden Lacquerware Theme, Kanji Studio Surgery, 3 Dedicated Studios & Arena Kuis Overhaul',
    date: '16 Oktober 2026',
    type: 'minor',
    highlights: [
      'Harmonisasi Tema Gelap Warm Sumi & Golden Lacquerware (Makie 蒔絵): Mengeliminasi benturan temperatur warna biru/slate dingin dengan palet hangat pernis emas Jepang (#121110, #1A1816, #24211E, #F5EFE6, #F59E0B) yang serasi dengan tema terang.',
      'Bedah Total Animasi Urutan Goresan Kanji (Progressive Stroke Animator): Menggantikan kemunculan garis instan dengan animasi aliran tinta kaligrafi progresif (stroke-dasharray/offset + pathLength=1000) lengkap dengan nomor awal goresan dan sapuan kuas otentik.',
      'Mesin Validasi Sentuhan Presisi (Intelligent Touch Drift Engine): Menghapus kanvas bebas tanpa aturan dan menggantikannya dengan deteksi koridor sentuh cerdas (toleransi start <= 36px, koridor <= 42px), getaran & goyangan halus (soft wobble) saat melenceng, serta snap otomatis ke vektor emas saat tuntas.',
      'Transformasi Materi Hub ke 3 Studio Terdedikasi: Menata ulang Materi Hub menjadi 3 studio terfokus: (1) Studio Dojo Kanji, (2) Perpustakaan 9 Buku Teks dengan 4 Jalur Pedagogis & Metodologi 5W+1H, dan (3) Kurikulum & Kamus Hub.',
      'Bedah Total Arena Kuis (Zen Focus & Two-Phase Floating Action Sheet): Bilah kontrol Zen Focus dengan shimmer progress, lembar aksi mengambang bebas pergeseran tata letak (zero CLS), tombol taktil 3D (.btn-tactile), dan Putaran Pemulihan (Remediation Loop).',
      'Integrasi Fleksibel OpenRouter & Dual-Engine AI: Mendukung API key OpenRouter (Qwen 2.5 72B / Llama 3.3) dengan deteksi otomatis dan fallback cerdas ke Gemini API.',
      'Pembersihan Typo & Humanisasi Bahasa: Perbaikan istilah "Catatan Kilaf" -> "Catatan Evaluasi", eliminasi 500x [TBD] pada contoh terjemahan, dan harmonisasi gaya sapaan hangat.',
    ],
    details: [
      {
        category: 'Desain & Palet Warna Makie',
        items: [
          'Penggantian latar belakang dingin slate ke warna arang hangat (Warm Sumi #121110, #1A1816, #24211E).',
          'Penambahan utility animasi taktil .btn-tactile, @keyframes softShake, @keyframes drawStroke, dan @keyframes guideRingPulse.',
          'Tipografi cerdas yang otomatis menerapkan font-japanese hanya pada karakter kanji/kana, menjaga teks Indonesia tetap jernih dan proporsional.',
        ],
      },
      {
        category: 'Kanji Master Studio & Animasi Goresan',
        items: [
          'Animasi goresan KanjiVG berkecepatan dinamis (0.75x, 1x, 1.5x) dengan aliran tinta progresif beraturan.',
          'Lingkaran pemandu titik awal berdenyut lembut (pulsing guide ring) untuk memandu jari pembelajar.',
          'Deteksi penyimpangan goresan (touch corridor drift engine) dengan audio thud dan animasi getar lembut sebelum mengulang.',
          'Efek suara sapuan kuas kaligrafi otentik (playBrushSfx) yang disintesis 100% offline via Web Audio API.',
        ],
      },
      {
        category: 'Perpustakaan 9 Buku Teks & Metodologi 5W+1H',
        items: [
          'Pengelompokan 9 buku kanonikal ke dalam 4 jalur: Akademik, Komunikatif & SSW, Ujian JLPT, dan Budaya.',
          'Kartu bedah pedagogis 5W+1H (Who, What, When, Where, Why, How) yang mengungkap alasan di balik urutan bab tiap buku.',
          'Komparasi langsung antar-buku teks populer (Minna vs Genki vs Irodori vs Soumatome).',
        ],
      },
      {
        category: 'Arena Kuis & Pengalaman Ujian',
        items: [
          'Bilah Zen Focus di bagian atas arena kuis untuk fokus maksimal tanpa elemen yang mengganggu.',
          'Floating Bottom Action Sheet untuk feedback jawaban instan tanpa lonjakan tinggi layar (zero CLS).',
          'Putaran Pemulihan (Remediation Loop) untuk mengulas kembali soal-soal evaluasi hingga tuntas 100%.',
          'Hujan konfeti kanvas (lightweight zero-dependency confetti) saat mencapai akurasi tinggi.',
        ],
      },
    ],
  },
  {
    version: 'v19.2.0',
    releaseName: 'Charcoal Obsidian Theme, Humanized Copywriting & UI/UX Hardening',
    date: '15 Oktober 2026',
    type: 'minor',
    highlights: [
      'Tema Gelap Premium Charcoal Obsidian & Deep Slate: Menggantikan palet cokelat redup dengan obsidian slate modern (#0B0F17, #131926) berpadu aksen amber emas (#F59E0B) dengan rasio kontras WCAG AAA.',
      'Humanisasi Copywriting & Eliminasi Jargon: Menghapus seluruh istilah akademis berat (cognitive overload, PT-1..6, IRT theta psychometrics, doktrin hukum) menjadi bahasa Indonesia yang ramah, hangat, dan mudah dipahami.',
      'Aksen Nada Tokyo (Pitch Accent) Dinamis: Perbaikan visualisasi SVG kontur nada tinggi-rendah dengan lebar adaptif per-mora, bebas distorsi, dan kontras tajam.',
      'Penyatuan Modal Kanji: Penggabungan komponen stroke modal sehingga animasi KanjiVG SVG dan kanvas latihan tulis tangan berfungsi penuh di semua halaman materi.',
      'Pembersihan Header & Navigasi Materi: Menghapus pil level ganda di header untuk mempertahankan kolom pencarian ≥ 320px, serta perapian tab navigasi Materi Hub.',
      'Standardisasi Ejaan KBBI & Aksesibilitas: Menyelaraskan ratusan kata baku (kosakata, izin, napas, telanjur, karier, antrean, praktik, respons, frasa) serta melengkapi atribut title dan aria-label pada seluruh tombol modal.',
    ],
    details: [
      {
        category: 'Desain & Tema Gelap',
        items: [
          'Palet Charcoal Obsidian (#0B0F17, #070A0F, #131926, #1E2638) diterapkan pada :root dan Tailwind tokens, bebas elemen kusam/berlumpur.',
          'Pembersihan 37+ kelas warna gelap tanpa awalan dark:, menjamin keterbacaan sempurna di tema terang dan gelap.',
          'Penyesuaian kontras kartu evaluasi, kartu FSRS rating, dan kartu skenario tanggap darurat.',
        ],
      },
      {
        category: 'Copywriting & Pengalaman Belajar',
        items: [
          'Redaksi ramah pembelajar pada Tes Penempatan Kilat, Arena Kuis, Pengaturan Logat Daerah, dan Landasan Belajar.',
          'Penjelasan kurikulum disederhanakan tanpa membebani pembelajar dengan jargon linguistik teoretis.',
          'Penyempurnaan tips salah kaprah kontrasif bahasa Indonesia vs Jepang.',
        ],
      },
      {
        category: 'Aksesibilitas & Kerapian Sistem',
        items: [
          'Atribut aria-label dan title standar disematkan pada seluruh tombol tutup modal dan ikon interaktif.',
          'Harmonisasi ejaan baku KBBI pada seluruh modul kurikulum, bank soal diagnostik, dan pustaka kosakata.',
          'Verifikasi 100% lulus pada seluruh suite pengujian otomatis unit dan responsif Playwright.',
        ],
      },
    ],
  },
  {
    version: 'v19.1.0',
    releaseName: 'Interactive AI Dojo, CAT Diagnostic, Dojo Kanji (2.383 Kanji), & 9-Book Pedagogical Matrix',
    date: '15 Oktober 2026',
    type: 'minor',
    highlights: [
      'Dojo Kanji Master: 2.383 Kanji N5–N1, Lensa Kurikulum Buku (GENKI, Minna, Soumatome), Animasi Vektor Goresan (KanjiVG SVG) & Kanvas Latihan Tulis Tangan Interaktif',
      'Sensei AI Studio Terintegrasi: Didukung Google Gemini 3.8 Flash dengan Guardrails Anti-Jailbreak, Mode Roleplay Situasional, dan Feedback Pengucapan Audio Asli',
      'Mesin Diagnostik Adaptif CAT (Computer Adaptive Testing): 10 Pertanyaan Item Response Theory (IRT) untuk Memetakan Level JLPT & JFT Secara Instan',
      'Matriks Metodologi 5W+1H untuk 9 Buku Teks Kanonikal: Penjelasan Pedagogis Komparatif Mengapa Setiap Buku Memiliki Urutan & Metodologi Berbeda',
      'Bank Latihan Otentik 9 Seri Buku: Renshuu B/C Minna, Bintang Susun ★ Soumatome & TRY!, Substitusi GENKI, Nuansa Shin Kanzen Master, dan Roleplay QUARTET',
      'Overhaul Navigasi & Responsif Multi-Device: Navigasi Bersih 4 Tab [Beranda, Materi, Latihan, Sensei AI], Tombol Lanjut Belajar 1-Ketuk, dan Bebas Bocor di Semua Ukuran Layar',
      'Pustaka Kosakata Diperluas: +5.669 Kosakata Baru Terindeks Lengkap Bebas Duplikasi dengan Pengucapan Audio',
    ],
    details: [
      {
        category: 'Dojo Kanji & Visualisasi Animasi Goresan',
        items: [
          'Pustaka Lengkap 2.383 Kanji: Mencakup seluruh kanji N5 (84), N4 (169), N3 (387), N2 (398), dan N1 (1.345) lengkap dengan radikal, Onyomi, Kunyomi, arti Indonesia, dan jukugo.',
          'Lensa Kurikulum Buku: Filter kanji spesifik sesuai silabus buku ajar (GENKI I & II 303 kanji, Minna no Nihongo 518 kanji, Nihongo Sou Matome).',
          'Animasi Vektor SVG: Visualisasi urutan goresan presisi berbasis KanjiVG dengan kontrol putar, jeda, langkah-demi-langkah, dan kanvas latihan tulis tangan.',
        ],
      },
      {
        category: 'Sensei AI Studio & Asisten Pembelajaran',
        items: [
          'Didukung Model Cerdas Gemini 3.8 Flash: Respons instan, penjelasan ramah pembelajar Indonesia, dan guardrails keamanan tanpa jailbreak.',
          'Mode Interaktif: Bedah tata bahasa mendalam, simulasi roleplay percakapan situasional, dan koreksi tulisan bahasa Jepang.',
          'Integrasi Lembar Kontekstual: Tombol [🍵 Tanya Sensei] di setiap penjelasan materi dan pembahasan kuis.',
        ],
      },
      {
        category: 'Diagnostik CAT & Matriks Pedagogis 5W+1H',
        items: [
          'Computer Adaptive Testing (CAT): 10 soal adaptif dengan parameter diskriminasi, kesulitan, dan tebakan (3PL IRT) untuk mendiagnosis level secara akurat dalam <3 menit.',
          'Analisis Metodologi 5W+1H 9 Buku: Membedah filosofi pedagogis di balik setiap buku teks kanonikal untuk membantu pembelajar memahami alasan di balik kurikulum masing-masing buku.',
          'Bank Soal Otentik: Latihan ciri khas setiap penerbit terkemuka langsung dapat dimainkan secara interaktif.',
        ],
      },
    ],
  },
  {
    version: 'v19.0.0',
    releaseName: 'Master Overhaul: 4 Kategori Kurikulum, 9 Seri Buku, 19 Sektor SSW & Interactive Studio',
    date: '15 Oktober 2026',
    type: 'major',
    highlights: [
      'Master Kurikulum 4 Kategori: Jalur JLPT Akademik (N5–N1), Jalur 9 Seri Buku Teks, Jalur Kerja SSW (19 Sektor), dan Jalur JFT-Basic & Hidup di Jepang (Seikatsu)',
      'Integrasi 9 Seri Buku Teks Kanonikal: GENKI I/II, Minna no Nihongo, Sou Matome, Tobira, QUARTET, TRY!, Shin Kanzen Master, Marugoto, dan Irodori',
      'Ekspansi Penuh 19 Sektor SSW Tokutei Ginou: Prosedur Keselamatan K3 Gemba, Protokol Komunikasi Koe-kake, Sanitasi HACCP, dan Pelaporan SBAR',
      'Kurasi Lengkap & Eliminasi Total String Placeholder: 9.565 Kalimat Contoh Divalidasi 100% Bebas [Terjemahan]',
      'Sanitasi Terminologi UI/UX: Bahasa Indonesia Hangat & Ramah Pembelajar, Memindahkan Teori SLA ke Modal Riset Mandiri',
      'Interactive Learning Studio: Tokyo Pitch Accent Contour Visualizer (SVG Polyline) & Kanji Stroke Order Practice Canvas',
      'Verifikasi Menyeluruh: 40.484 Uji Unit Lolos 100% & Audit Responsif Bebas Bocor di Semua Ukuran Layar',
    ],
    details: [
      {
        category: 'Ekspansi Kurikulum Multi-Jalur (4 Kategori)',
        items: [
          'Jalur JLPT Akademik (N5–N1): 74 unit dan ratusan pelajaran terstruktur dengan alur belajar bertahap Tahap 1–6.',
          'Jalur Buku Teks: Mengompilasi 9 seri buku teks bahasa Jepang terpopuler di dunia ke dalam format kurikulum terpadu.',
          'Jalur Kerja SSW: 19 sektor pekerjaan (Keperawatan, Makanan, Konstruksi, Pertanian, Perhotelan, Pembersihan Gedung, Manufaktur, Otomotif, Penerbangan, Perikanan, Permesinan, Elektronik, Perkapalan, Logistik, Kereta Api, Kehutanan, Kayu, dan Tekstil).',
          'Jalur JFT & Hidup di Jepang: Persiapan ujian JFT-Basic A1 & A2 (Huruf/Kata, Percakapan, Choukai, Dokkai) serta Panduan Seikatsu (Shiyakusho, pemilahan sampah, perbankan, & mitigasi bencana).',
        ],
      },
      {
        category: 'Kurasi Konten & Kualitas Data',
        items: [
          'Memvalidasi dan menerjemahkan 9.565 kalimat contoh di seluruh paket ekspansi, memastikan zero missing translation.',
          '129/129 modul ekspansi terverifikasi lolos uji validasi otomatis.',
          'Penataan file statis pra-kompilasi untuk menjamin kecepatan pemuatan instan tanpa latensi jaringan.',
        ],
      },
      {
        category: 'Fitur Studio Interaktif',
        items: [
          'Visualisasi Nada Intonasi Tokyo (Pitch Accent) menggunakan grafik SVG poliline dengan penanda ketukan mora dan penurunan nada (downstep).',
          'Modal Bedah & Latihan Goresan Kanji interaktif dengan kanvas sentuh untuk melatih goresan langsung di layar gawai.',
        ],
      },
      {
        category: 'Sanitasi Terminologi & Responsivitas Tampilan',
        items: [
          'Mengganti istilah akademis teknis seperti PT Stage dan Substratum dengan bahasa Indonesia yang natural dan ramah.',
          'Menyediakan modal khusus Landasan Riset Kurikulum bagi pembelajar dan pengajar yang ingin mempelajari dasar ilmiah pedagogi.',
          'Memastikan zero horizontal overflow (0px) pada seluruh breakpoint perangkat dari iPhone SE hingga layar lebar.',
        ],
      },
    ],
  },
  {
    version: 'v18.1.0',
    releaseName: 'Remediasi Kurikulum Semantik, Spesialisasi SSW & Penguatan Keamanan Publik',
    date: '15 Oktober 2026',
    type: 'minor',
    highlights: [
      'Sentence-Extraction & Slot-Filling Engine Mengeliminasi Total Kalimat Sintetis (Synthetic Gibberish)',
      'Penyelarasan 100% ID Latihan Fallback Kuis (vocab-drills.json & grammar-drills.json) 1:1 Terhadap Korpus Kanonikal',
      'Pencegahan Race Condition & Cache Poisoning dataManager Melalui inFlightLoads Concurrency Map',
      'Studio Pelajaran dengan Penanganan 404 Mandiri (LessonNotFoundState) & Pemuatan Kosakata SSW Khusus',
      'Ekspansi Korpus Tokutei Ginou SSW: 72 Kosakata Otentik Konstruksi, Pengolahan Makanan, dan Keperawatan (Kaigo)',
      'Restorasi Taksonomi Partikel N5/N4 dan Deduplikasi Referensi Buku Minna no Nihongo & Irodori',
      'Penguatan Keamanan Edge Workers (Rate Limiting /critique & UTF-8 Safe Admin Base64 Encoding)',
      'Eliminasi Token Statis Publik & Sistem Sinkronisasi Otomatis Changelog Antar Versi',
      'Anti-Leakage Layout Terverifikasi: 0px Horizontal Overflow di Seluruh Perangkat (iPhone SE hingga Desktop)',
    ],
    details: [
      {
        category: 'Remediasi Semantik & Adapter Konten Kurikulum',
        items: [
          'Mengganti generator template statis dengan Sentence-Extraction & Slot-Filling Engine yang mengekstraksi kalimat otentik langsung dari korpus kosakata/tata bahasa.',
          'Penyelarasan ID fallback kuis dari format lama ke format kanonikal (vocab_v-n5-*, grammar_g-n5-*) sehingga tidak ada drill yang terputus.',
          'Format tampilan pedagogis dirancang kontekstual dan komunikatif tanpa menyulitkan pembelajar umum.',
        ],
      },
      {
        category: 'Stabilitas Data & Concurrency Guard',
        items: [
          'Mengimplementasikan inFlightLoads Map pada DataManager untuk mencegah race condition pemanggilan simultan dan cache poisoning berupa array kosong.',
          'Halaman LessonStudyPage dilengkapi LessonNotFoundState ramah pengguna dengan tombol kembali jika rute/pelajaran tidak ditemukan.',
          'Pemuatan otomatis spesialisasi SSW vokasional (Konstruksi, Makanan, Kaigo) saat pengguna mengakses unit track SSW.',
        ],
      },
      {
        category: 'Pengayaan Korpus Vokasional SSW (Tokutei Ginou)',
        items: [
          'Penambahan 72 entitas kosakata otentik untuk sektor Kaigo (Keperawatan lansia), Konstruksi (K3 & Keselamatan kerja), dan Pengolahan Makanan (Standar HACCP).',
          'Katalog kurikulum SSW diperbarui lengkap dengan target kalimat dan model dialog kerja nyata di Jepang.',
        ],
      },
      {
        category: 'Pembersihan Taksonomi & Buku Pelajaran',
        items: [
          'Restorasi kategori partikel pada n5-particles.js dan n4-particles.js yang sebelumnya salah terlabel sebagai tense-aspect.',
          'Deduplikasi 24 entitas pada materi referensi buku teks (Minna no Nihongo 1 & 2, Irodori A1 & A2).',
        ],
      },
      {
        category: 'Keamanan Publik, Edge Workers & Otomasi Rilis',
        items: [
          'Pencegahan kebocoran kredensial dengan mengganti token anonim hardcoded menjadi placeholder aman unconfigured.',
          'Rate limiting ketat pada endpoint /critique berbasis IP nyata (CF-Connecting-IP).',
          'Sistem generator otomatis scripts/sync-changelog.js yang menyinkronkan patchNotes.ts ke CHANGELOG.md pada setiap proses build & rilis.',
        ],
      },
    ],
  },
  {
    version: 'v18.0.0',
    releaseName: 'Studio Pembelajaran Berbasis Riset SLA & Latihan Tersemat Mandiri',
    date: '10 Oktober 2026',
    type: 'major',
    highlights: [
      'Dedicated Full-Page Learning Studio (LessonStudyPage) Menggantikan Infinite Scroll Vertikal',
      'Integrasi Kerangka Pedagogis 5W1H Berbasis Riset Akuisisi Bahasa Kedua (Processability Theory & Analisis Kontrasif L1)',
      '100% Latihan Tersemat di Tempat (Zero Menu-Jumping) Tanpa Memental Pembelajar ke Menu Arena Kuis',
      'Umpan Balik Instan & Putaran Koreksi Otomatis (Retry Loop) untuk Setiap Soal yang Keliru',
      'Handoff Memori Otomatis ke Algoritma FSRS Setelah Mencapai Skor Kelulusan ≥ 80%',
      'Sintesis Suara Offline Bahasa Jepang (Web Speech API) dengan Pilihan Kecepatan 0.8x dan 1.0x',
      'Tantangan Komunikasi Nyata Berstandar CEFR-J (Can-Do Real-World Challenge) & Kunci Jawaban Model Percakapan',
      'Anti-Leakage Layout Terverifikasi: 0px Horizontal Overflow di Seluruh Perangkat (iPhone SE hingga Desktop)',
    ],
    details: [
      {
        category: 'Dedicated Studio Belajar & Stepper 4-Tahap',
        items: [
          'Penggantian scrolling vertikal panjang dengan halaman studio mandiri yang fokus dan bebas distraksi.',
          'Bilah Stepper 4-Tahap: 1. Dialog Otentik, 2. Bedah Pola & 5W1H, 3. Latihan di Tempat, 4. Verifikasi Can-Do.',
          'Navigasi mulus antar pelajaran dalam satu unit atau unit berikutnya tanpa perlu bolak-balik ke menu katalog.',
        ],
      },
      {
        category: 'Kerangka Pedagogis 5W1H Berbasis Riset SLA',
        items: [
          'WHAT: Rangkuman target kalimat, pola gramatikal, dan kosakata pokok.',
          'WHY: Justifikasi kognitif ilmiah (Processability Theory Pienemann, Semantic Clustering Tinkham, Analisis Kontrasif Sutedi) dengan kartu akordeon progressive disclosure.',
          'WHO & WHEN: Konteks sosiolinguistik, relasi hierarkis lawan bicara (Teineigo/Sonkeigo), dan aturan pantangan budaya.',
          'SCENARIO: Studi kasus situasional nyata di Jepang (balai kota, rumah sakit, tempat kerja).',
          'EDGE CASES: Analisis kontrasif mendalam (Contrastive Copula Trap, partikel WA vs GA, batasan penggunaan).',
        ],
      },
      {
        category: 'Latihan Tersemat 100% In-Place (Zero Menu-Jumping)',
        items: [
          'Seluruh latihan interaktif (susun kata, cloze partikel, spot the edge case) dikerjakan langsung di dalam halaman materi.',
          'Sistem koreksi cerdas: soal yang dijawab salah otomatis dimasukkan ke putaran koreksi (retry loop) hingga tuntas.',
          'Pencapaian skor kelulusan (≥ 80%) secara otomatis menginjeksi kartu tata bahasa dan kosakata ke antrean FSRS Beranda.',
        ],
      },
    ],
  },
  {
    version: 'v17.1.0',
    releaseName: 'Desain Seluler Adaptif & Optimasi Lintas Perangkat',
    date: '10 Oktober 2026',
    type: 'minor',
    highlights: [
      'Perombakan Total Antarmuka Seluler (Mobile UX Overhaul) di Seluruh Menu Utama',
      'Eliminasi Tab Collisions & Stacked Navigation Chrome dengan Bounded Responsive Grid',
      'Navigasi Kurikulum Cerdas dengan Bottom Sheet Picker & Target Sentuh Adaptif ≥ 44px',
      'Bilah Metrik Ringkas 4-Kolom di Arena Kuis & Sinkronisasi 13 Mode Latihan Lengkap',
      'Kebun Kata Format 2-Kolom Zen Garden yang Proporsional di Layar Sempit',
      'Horizontal Chip Carousel pada Penjelajah Bab Buku Pegangan (Minna no Nihongo & Genki)',
      'Zero Horizontal Overflow Guarantee (0px) Terverifikasi Otomatis Melalui Playwright Test Suite',
    ],
    details: [
      {
        category: 'Restrukturisasi Tata Letak Seluler (Mobile UX)',
        items: [
          'Materi Hub: Tab switcher (Kurikulum, Buku, Kosakata, Tata Bahasa) direkayasa ulang menggunakan CSS Grid 4-kolom terkendali untuk mengeliminasi bug tab menumpuk.',
          'Materi Hub Quick Tools: Tombol pintasan Kana, Konjugasi, dan Nuansa dipadatkan menjadi satu baris horizontal 36px yang elegan di mobile.',
          'Penjelajah Kurikulum: 4 lapis selector bertingkat digantikan oleh kartu ringkas (~85px) yang memunculkan Bottom Sheet Picker saat disentuh, membawa materi pelajaran langsung di atas lipatan layar (above the fold).',
          'Penjelajah Buku: Daftar bab vertikal 500px digantikan dengan horizontal carousel chip bab yang efisien.',
          'Kebun Kata: Ditransformasikan dari kartu memanjang tunggal menjadi tata letak 2-kolom mobile yang seimbang.',
        ],
      },
      {
        category: 'Arena Kuis & Interaktivitas',
        items: [
          'Kartu metrik kuis disederhanakan menjadi bilah status 4-kolom kompak (~48px) menampilkan Soal, Akurasi, FSRS, dan Air.',
          'Seluruh 13 mode kuis (termasuk Panic Recall, Mora Pacing, dan Pitch Accent) dapat diakses dengan mudah tanpa perlu scrolling panjang.',
          'Sinkronisasi badge Arena Kuis pada Mobile Drawer menjadi "13 Mode".',
        ],
      },
      {
        category: 'Aksesibilitas & Pengujian Lintas Perangkat',
        items: [
          'Seluruh tombol dan kartu interaktif memenuhi standar tap target ≥ 44px dengan umpan balik sentuhan active:scale-95.',
          'Pemberian padding cushion bawah dinamis (calc(5.5rem + env(safe-area-inset-bottom))) mencegah konten tertutup oleh BottomNav.',
          'Verifikasi otomatis 62/62 skenario Playwright pada iPhone SE (375px), Mobile Standar (390px), Tablet (768px), dan Desktop (1440px) dengan zero overflow.',
        ],
      },
    ],
  },
  {
    version: 'v17.0.0',
    releaseName: 'Kurikulum Orisinal, Diagnostik L1, & Vokasional SSW',
    date: '10 Oktober 2026',
    type: 'major',
    highlights: [
      'Peluncuran 8 Jalur Kurikulum Orisinal Nugget Nihongo (JLPT N5–N1 & SSW Kaigo, Food Service, Konstruksi)',
      'Pengorganisasian 74 Unit & 155 Pelajaran Mandiri Lengkap dengan Sasaran Can-Do Standar CEFR-J',
      'Peta Tangga Kognitif Berbasis Processability Theory (Stages 1–6 Pienemann)',
      'Mesin Diagnostik Empiris L1 Bahasa Indonesia: 300 Butir Uji (150 Morfosintaksis & 150 Nada Fonologis)',
      'Personalisasi 4 Substratum Dialek Daerah (Umum, Jawa, Sunda, Batak/Timur) di Materi & Pengaturan',
      '21 Protokol Kedaruratan Gemba K3 & Kaigo SBAR Berstandar Kerja Nyata Jepang',
      'Ekspansi Arena Kuis Menjadi 13 Mode: Panic Recall (5s Fading), Mora Pacing (240 bpm), Pitch Accent, dll.',
      'Kalibrasi FSRS Fatigue-Aware Clamping & Penyesuaian Peluruhan Waktu Malam',
      'Audit Responsif Multi-Device Headless Playwright: 64/64 Cek Lolos Melintasi iPhone SE hingga Desktop',
    ],
    details: [
      {
        category: 'Kurikulum Orisinal & Vokasional',
        items: [
          'Jalur Akademik N5–N1 terstruktur dari Aisatsu dasar hingga dekonstruksi wacana editorial surat kabar tingkat mahir.',
          'Jalur Vokasional SSW Kaigo (Keperawatan Lansia): SOP Koe-kake, komunikasi empatik, & format baku pelaporan darurat SBAR.',
          'Jalur Vokasional SSW Food Service: Protokol sanitasi 5S, standar HACCP, penanganan alergen, & etika pelayanan Omotenashi.',
          'Jalur Vokasional SSW Konstruksi: Pencegahan celaka K3 Gemba, komando akustik kansei KYT (Kiken Yochi Training), & aba-aba alat berat.',
          'Setiap unit dilengkapi catatan fokus analisis kontrasif L1 untuk membongkar jebakan bahasa ibu.',
        ],
      },
      {
        category: 'Diagnostik L1 & Substratum Daerah',
        items: [
          'Database 300 butir diagnostik empiris membedah interferensi transfer L1 Indonesia ↔ L2 Jepang.',
          'Substratum Jawa: Latihan fonologis plosif b/d/g dan pemanjangan vokal chōon.',
          'Substratum Sunda: Mitigasi netralisasi konsonan f/p/v dan artikulasi vokal sentral /ə/.',
          'Substratum Batak & Indonesia Timur: Penyetaraan aksen nada Tokyo heiban (datar) dari irama silabel dinamis.',
        ],
      },
      {
        category: 'Arena Kuis & Mode Latihan Baru',
        items: [
          'Panic Recall Drill: Latihan cover-recall-check dengan hitungan mundur 5 detik tanpa bantuan opsi ganda.',
          'Mora Pacing Drill: Metronom visual 240 bpm untuk menjaga kestabilan isokroni tiap ketukan suku kata mora.',
          'Pitch Accent Drill: Visualisasi kontur nada tinggi-rendah Tokyo (Heiban, Atamadaka, Nakadaka, Odaka).',
          'Macro-Discourse Deconstruct: Bedah struktur argumen premis-antitesis-bukti-sintesis teks N2/N1.',
          'Collocation Matrix: Analisis batas kompatibilitas pragmatis pasangan kata alami.',
        ],
      },
      {
        category: 'Performa & Keandalan Offline',
        items: [
          'Precache Service Worker mencakup seluruh 8 berkas kurikulum mandiri dan basis data diagnostik.',
          'Pencapaian 41.018 tes lolos 100% tanpa kegagalan pada rangkaian pengujian backend dan integrasi.',
          'Audit otomatis Playwright mengonfirmasi 0px kebocoran horizontal melintasi seluruh resolusi layar.',
        ],
      },
    ],
  },
  {
    version: 'v16.0.0',
    releaseName: 'Renaissance & Spaced Mastery',
    date: '10 Oktober 2026',
    type: 'major',
    highlights: [
      'Migrasi Penuh ke Single Page Application (SPA) React 18, Vite, & Tailwind CSS',
      'Penyatuan Kalkulasi Algoritma FSRS v4 di Seluruh 8 Mode Arena Kuis',
      'Pembersihan Form Pengaturan & Penyederhanaan Masuk Murni dengan Google (Google Sign-In)',
      'Widget Review Cerdas FSRS & Bilah Penguasaan Kurikulum JLPT N5–N1 di Beranda',
      'Koleksi Peribahasa Harian Otentik (Kotowaza · ことわざ) dengan Audio Pelafalan',
      'Penataan Ulang Materi Hub dengan Mode Daftar Ringkas (Compact List View) & Filter Jenis Kata',
      'Penataan Ulang Arena Kuis dengan Klaster Fondasi vs Keterampilan Khusus',
      'Mode Spoiler / Blur Interaktif untuk Mencegah Tebak Buta Arti Kalimat',
      'Sistem Pelaporan Kesalahan Konten In-App (Report Issue 🚩) dengan Offline Queue',
      'Optimalisasi Seluler Komprehensif: Pencegahan Bocor Layar (Anti-Horizontal Overflow)',
    ],
    details: [
      {
        category: 'Arsitektur & Kinerja',
        items: [
          'Memigrasikan ribuan baris Vanilla JS lama menjadi komponen modular React dengan Zustand store.',
          'Mengurangi waktu muat awal dengan pemisahan bundel Vite dan caching Service Worker offline.',
          'Menghilangkan ketergantungan form input API key mentah bagi pengguna akhir di menu Pengaturan.',
          'Pencegahan galat jaringan DNS NXDOMAIN dengan isolasi client Supabase yang aman offline.',
        ],
      },
      {
        category: 'UI & UX Beranda & Materi',
        items: [
          'Menghadirkan kartu prioritas FSRS Due yang mendeteksi kartu memori kritis secara dinamis.',
          'Menambahkan bilah progres visual kurikulum N5 hingga N1.',
          'Mode Tampilan Ganda pada Materi Hub: Kartu Grid luas atau Daftar Ringkas untuk memindai cepat.',
          'Pintasan langsung ke Bagan Kana, Matriks Konjugasi, dan Inspektor Nuansa dari Beranda.',
        ],
      },
      {
        category: 'Arena Kuis & Spaced Repetition',
        items: [
          'Memperbarui 8 mode latihan: Flashcard FSRS, Pilihan Ganda, Isian Partikel, Susun Kata, Audio Mendengar, Konjugasi, Terjemahan, dan Deteksi Jebakan.',
          'Setiap jawaban benar/salah kini otomatis memperbarui stabilitas memori FSRS dan menyemai bibit Kebun Kata.',
          'Pemberian hadiah tetes air dinamis (+1 hingga +5 tetes) berdasarkan performa sesi latihan.',
        ],
      },
      {
        category: 'Penyempurnaan Seluler',
        items: [
          'Mengunci viewport tanpa bocor horizontal (`overflow-x: hidden`, `viewport-fit=cover`).',
          'Drawer navigasi seluler lengkap dan tab menu "Tentang" permanen pada Bottom Navigation.',
          'Dukungan safe-area-inset-bottom pada ponsel modern (iPhone notch & gesture bar Android).',
        ],
      },
    ],
  },
  {
    version: 'v15.16.0',
    releaseName: 'AI Content Engine & Validator',
    date: '17 April 2026',
    type: 'minor',
    highlights: [
      'Integrasi Pipeline Promosi Konten AI (Edge Router & Critic Engine)',
      'Widget Umpan Balik Konten AI (Jempol Naik/Turun & Usulan Koreksi)',
      'Pengujian Persona Sensei & Pencegahan Halusinasi Model Bahasa',
    ],
    details: [
      {
        category: 'Kecerdasan Buatan',
        items: [
          'Sistem validasi silang antara model generator dan model kritikus untuk memastikan keaslian bahasa.',
          'Tabel antrean promosi konten cerdas ke dalam bank soal resmi.',
        ],
      },
    ],
  },
  {
    version: 'v15.0.0',
    releaseName: 'Kurikulum Akbar & FSRS Engine',
    date: '8 April 2026',
    type: 'major',
    highlights: [
      'Database 4.800+ Kosakata & 850+ Tata Bahasa JLPT N5 sampai N1',
      'Penerapan Rumus Matematika Retensi FSRS v4 (Stabilitas & Kesulitan)',
      'Jalur Belajar Buku Teks: Minna no Nihongo & Modul Irodori',
      'Jalur Freeway: 21 Pola Kalimat Paling Vital untuk Bertahan Hidup',
    ],
    details: [
      {
        category: 'Kurikulum & Data',
        items: [
          'Penyusunan data kosakata dengan kanji, kana, romaji, arti bahasa Indonesia, dan contoh kalimat berpasangan.',
          'Pengelompokan tata bahasa berdasar partikel, bentuk verba, pengandaian, dan modalitas.',
        ],
      },
    ],
  },
  {
    version: 'v14.0.0',
    releaseName: 'Kebun Kata & Gamifikasi',
    date: '25 Maret 2026',
    type: 'major',
    highlights: [
      'Fitur Kebun Kata (Kanji Garden) dengan 5 Fase Pertumbuhan (Benih → Mekar)',
      'Sistem Tetes Air Penyiram & Konversi Jawaban Kuis Menjadi Bunga',
      'Heatmap Kalender Aktivitas Belajar 49 Hari',
      'Sistem Lencana Prestasi (12 Badges Penghargaan)',
    ],
    details: [
      {
        category: 'Gamifikasi & Motivasi',
        items: [
          'Merawat pohon kanji menciptakan keterikatan emosional belajar tanpa beban.',
          'Pencatatan rekor streak beruntun dengan kompensasi pemulihan streak (Streak Saver).',
        ],
      },
    ],
  },
  {
    version: 'v12.0.0',
    releaseName: 'Arena Latihan Multi-Dimensi',
    date: '14 Februari 2026',
    type: 'minor',
    highlights: [
      'Peluncuran Mode Flashcard Interaktif 3D',
      'Mode Isian Rumpang Partikel Kalimat',
      'Mode Builder Susun Kata Acak',
      'Matriks Interaktif Perubahan Bentuk Kata Kerja (Konjugasi Te, Nai, Ta, Masu)',
    ],
    details: [
      {
        category: 'Latihan Interaktif',
        items: [
          'Mendukung latihan berbagai gaya belajar: visual, motorik, dan analisis sintaksis.',
        ],
      },
    ],
  },
  {
    version: 'v10.0.0',
    releaseName: 'PWA Offline & Mesin Suara TTS',
    date: '1 Januari 2026',
    type: 'major',
    highlights: [
      'Dukungan Progressive Web App (PWA) — Dapat Diinstal di Home Screen HP/PC',
      '100% Berfungsi Tanpa Koneksi Internet (Offline-First Service Worker)',
      'Integrasi Web Speech API untuk Pelafalan Suara Asli Bahasa Jepang',
    ],
    details: [
      {
        category: 'Fondasi Teknis',
        items: [
          'Seluruh data kosakata dan tata bahasa di-cache lokal sehingga aplikasi tetap responsif di area minim sinyal.',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    releaseName: 'Lahirnya Nugget Nihongo',
    date: '10 Agustus 2025',
    type: 'major',
    highlights: [
      'Inisiasi Proyek Pembelajaran Bahasa Jepang Khusus Penutur Bahasa Indonesia',
      'Bagan Interaktif Huruf Hiragana & Katakana',
      'Daftar Kosakata Dasar JLPT N5',
    ],
    details: [
      {
        category: 'Awal Mula',
        items: [
          'Berangkat dari keresahan sulitnya menemukan aplikasi belajar bahasa Jepang gratis, tanpa iklan, dan terstruktur dalam bahasa Indonesia.',
        ],
      },
    ],
  },
];
