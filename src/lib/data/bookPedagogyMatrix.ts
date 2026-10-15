// ══════════════════════════════════════════════════════════════════
//  bookPedagogyMatrix.ts — 5W+1H Pedagogical & Curricular Rationale
//  Nugget Nihongo · Comparative SLA Matrix for 9 Canonical Textbooks
// ══════════════════════════════════════════════════════════════════

export interface Book5W1HProfile {
  id: string;
  title: string;
  publisher: string;
  philosophy: string;
  who: string;      // Who is this book written for?
  what: string;     // What is the primary instructional content & core focus?
  when: string;     // When & in what order are grammars/vocabs introduced?
  where: string;    // Where/in what authentic context is the language situated?
  why: string;      // Why does this book sequence its syllabus this way vs others?
  how: string;      // How does its exercise format bridge the learner to fluency?
  comparativeHighlights: {
    versusBookId: string;
    versusBookName: string;
    distinction: string;
  }[];
  chapterRationales?: Record<
    number | string,
    {
      focus: string;
      whyNow: string;
      contrastInsight: string;
    }
  >;
}

export const BOOK_PEDAGOGY_REGISTRY: Record<string, Book5W1HProfile> = {
  minna: {
    id: 'minna',
    title: 'Minna no Nihongo (みんなの日本語)',
    publisher: '3A Corporation',
    philosophy: 'Struktural-Pola Kalimat Bertahap (Audio-Lingual & Pattern Substitution)',
    who: 'Pelajar dewasa, pekerja migran, dan mahasiswa di lembaga bahasa yang membutuhkan penguasaan tata bahasa presisi tinggi dan terstruktur sejak hari pertama.',
    what: 'Pola kalimat dasar (Bunkei), contoh kalimat (Reibun), percakapan terpandu (Kaiwa), dan drill substitusi mekanis intensif (Renshuu B/C).',
    when: 'Mengikuti urutan tata bahasa murni Processability Theory (PT Stage 1 s.d. Stage 4): Dimulai dari predikat nomina desu (Bab 1), demonstrativa kosoado (Bab 2–3), verba masu waktu & tempat (Bab 4–5), objek partikel o (Bab 6), instrumen de & pemberian agemasu (Bab 7), kata sifat i/na (Bab 8), hingga bentuk te yang baru diperkenalkan di Bab 14.',
    where: 'Konteks kehidupan pekerja asing di perusahaan Jepang (Tokkyo Electric), toko kelontong, rumah sakit, dan pergaulan formal-sopan (Teineigo/Masu-form).',
    why: 'Minna menunda bentuk kasual (futsūkei) dan bentuk te hingga bab pertengahan agar pelajar terlebih dahulu memiliki fondasi kalimat sopan yang aman dari kesalahan etika sosial di Jepang. Berbeda dengan Genki yang memperkenalkan te-form lebih awal.',
    how: 'Melalui teknik cue-substitution (Renshuu B) dan dialog mini fungsional (Renshuu C) yang membangun reflek otomatisasi otak (*proceduralization*) tanpa perlu mikir rumus terlalu lama.',
    comparativeHighlights: [
      {
        versusBookId: 'genki',
        versusBookName: 'GENKI',
        distinction: 'Minna memperkenalkan te-form di Bab 14 (fokus ketelitian rumus), sedangkan Genki sudah memperkenalkannya di Bab 5 untuk segera memicu percakapan meminta tolong (te kudasai).',
      },
      {
        versusBookId: 'irodori',
        versusBookName: 'Irodori',
        distinction: 'Minna sangat kuat dalam akurasi partikel dan pembentukan kata kerja, sementara Irodori lebih berorientasi pada pencapaian tugas hidup sehari-hari (Can-Do).',
      },
    ],
    chapterRationales: {
      1: {
        focus: 'Predikat Nomina: N1 wa N2 desu / ja arimasen / ka',
        whyNow: 'Membangun identitas sosial paling dasar: nama, kebangsaan, dan profesi. Wajib dikuasai sebelum menyentuh verba aksi.',
        contrastInsight: 'Di Genki materi ini digabung dengan angka dan nomor telepon langsung di bab 1.',
      },
      5: {
        focus: 'Perpindahan: ikimasu / kimasu / kaerimasu + partikel e (ke)',
        whyNow: 'Membuka dimensi spasial dan waktu: pergi ke mana, naik apa (de), bersama siapa (to).',
        contrastInsight: 'Memastikan konsep waktu mutlak vs relatif matang sebelum masuk ke objek langsung partikel o di Bab 6.',
      },
      14: {
        focus: 'Pembentukan Bentuk Te & ~te kudasai / ~te imasu',
        whyNow: 'Titik balik paling monumental di bahasa Jepang pemula. Begitu bentuk te dikuasai, pelajar bisa menghubungkan 2 verba, memohon bantuan, dan menyatakan aspek kontinual.',
        contrastInsight: 'Minna sengaja mematangkan 3 kelompok kata kerja (Golongan I, II, III) selama 13 bab sebelumnya agar aturan konjugasi te tidak membebani memori kerja.',
      },
    },
  },

  genki: {
    id: 'genki',
    title: 'GENKI: An Integrated Course in Elementary Japanese',
    publisher: 'The Japan Times',
    philosophy: 'Komunikatif-Situasional Terpadu (Task-Based Communicative Language Teaching)',
    who: 'Mahasiswa universitas, pelajar otodidak mandiri, dan penutur muda yang ingin cepat bisa ngobrol santai dengan teman sebaya dan berinteraksi di lingkungan kampus.',
    what: 'Integrasi seimbang 4 kemahiran (Menyimak, Berbicara, Membaca, Menulis) dengan fokus percakapan pasangan (*pair work*) dan latihan interaktif.',
    when: 'Memprioritaskan fungsionalitas percakapan awal: Memperkenalkan bentuk te di Lesson 5 (jauh lebih awal dari Minna) agar siswa segera bisa menggunakan permohonan santai, izin (~te mo ii desu ka), dan larangan (~te wa ikemasen).',
    where: 'Kehidupan mahasiswa internasional di Jepang (tokoh Mary, Takeshi, Robert): asrama, kedai kopi, kencan akhir pekan, perjalanan kereta, dan pesta universitas.',
    why: 'GENKI percaya motivasi pelajar melonjak saat mereka bisa mengekspresikan kehidupan pribadinya sedini mungkin. Kosakatanya mencakup kata-kata gaul sehari-hari sepertiデート (kencan), ハンバーガー (hamburger), dan ざんねんですね (sayang sekali ya).',
    how: 'Setiap tata bahasa langsung diikuti latihan berpasangan (*Pair Work*) yang meniru percakapan asli dua arah, bukan sekadar mengisi titik-titik kosong.',
    comparativeHighlights: [
      {
        versusBookId: 'minna',
        versusBookName: 'Minna no Nihongo',
        distinction: 'GENKI lebih santai dan berpusat pada kehidupan pergaulan anak muda, sedangkan Minna lebih formal dan bernuansa dunia kerja profesional.',
      },
      {
        versusBookId: 'marugoto',
        versusBookName: 'Marugoto',
        distinction: 'GENKI mempertahankan penjelasan tata bahasa eksplisit berbahasa Inggris/Indonesia yang komprehensif, sementara Marugoto mengandalkan pemahaman induktif visual.',
      },
    ],
    chapterRationales: {
      3: {
        focus: 'Kata Kerja Rutinitas Harian & Undangan (~masen ka)',
        whyNow: 'Mengajak teman jalan dan berbicara tentang jadwal harian adalah fungsi sosial nomor satu bagi mahasiswa baru.',
        contrastInsight: 'Di Minna undangan baru diperkenalkan di bab 6 setelah akumulasi verba transitif.',
      },
      5: {
        focus: 'Bentuk Te Awal & Permohonan',
        whyNow: 'Memberi siswa kemampuan meminta tolong dan menyatakan aktivitas yang sedang berlangsung di tengah semester.',
        contrastInsight: 'Percepatan bentuk te ini diimbangi dengan visual tabel konjugasi yang sangat ramah pemula.',
      },
    },
  },

  irodori: {
    id: 'irodori',
    title: 'Irodori: Japanese for Life in Japan (いろどり 生活の日本語)',
    publisher: 'The Japan Foundation (JF)',
    philosophy: 'Pendekatan Berorientasi Aksi (Action-Oriented CEFR-J Can-Do Framework)',
    who: 'Warga negara asing yang tinggal atau berencana bekerja di Jepang (khususnya visa Tokutei Ginou / SSW) yang butuh berkomunikasi nyata di tempat kerja dan lingkungan bertetangga.',
    what: 'Tugas-tugas komunikasi praktis (*Can-Do*): mengenali pengumuman stasiun, membaca label harga supermarket, menyapa tetangga saat buang sampah, hingga merespon instruksi keselamatan darurat.',
    when: 'Tidak diurutkan berdasarkan kerumitan rumus tata bahasa, melainkan berdasarkan urgensi kebutuhan hidup di Jepang. Contoh: cara membaca rambu dan label darurat diajarkan sejak level Starter (A1).',
    where: 'Jepang otentik masa kini: konbini, balai kota (*kuyakusho*), halte bus, apartemen, pabrik, dan restoran.',
    why: 'Di dunia nyata, orang tidak berbicara dengan urutan bab buku teks. Irodori menggunakan audio autentik berlatar kebisingan asli (stasiun, kafe) agar telinga pelajar terlatih menghadapi situasi sebenarnya.',
    how: 'Menggunakan lembar kerja visual berwarna penuh dengan foto asli fasilitas Jepang dan audio native bertempo alami (*natural speech rate*).',
    comparativeHighlights: [
      {
        versusBookId: 'minna',
        versusBookName: 'Minna no Nihongo',
        distinction: 'Irodori bebas royalti resmi JF dan menggunakan foto asli fasilitas Jepang, sedangkan Minna berbasis ilustrasi gambar garis klasik.',
      },
      {
        versusBookId: 'soumatome',
        versusBookName: 'Nihongo Sou Matome',
        distinction: 'Irodori melatih kemahiran hidup nyata (*life survival*), sedangkan Sou Matome dirancang murni untuk strategi lulus ujian JLPT.',
      },
    ],
  },

  soumatome: {
    id: 'soumatome',
    title: 'Nihongo Sou Matome (日本語総まとめ)',
    publisher: 'Ask Publishing',
    philosophy: 'Pemetaan Fungsi Sintaksis & Struktur Ujian Cepat (Targeted 6–8 Week Cramming)',
    who: 'Pelajar yang sedang mempersiapkan diri menghadapi ujian resmi JLPT (N5 hingga N1) dan butuh ringkasan terstruktur dengan ritme belajar harian yang terukur.',
    what: 'Pengelompokan pola kalimat berdasarkan kemiripan arti dan konteks gramatikal, disajikan dalam silabus 6 sampai 8 minggu (1 hari = 1 halaman + latihan kuis).',
    when: 'Disusun per minggu tematis. Hari ke-1 s.d. 6 membahas materi baru, hari ke-7 khusus tes simulasi mingguan (Jissen Mondai).',
    where: 'Ruang ujian JLPT, teks bacaan formal, email bisnis, dan artikel opini surat kabar Jepang.',
    why: 'Untuk mencegah kejenuhan belajar. Pendekatan per-hari mempermudah pelajar menetapkan target harian yang terukur (*bite-sized learning*).',
    how: 'Format soal 4 pilihan ganda, pengurutan bintang (★) untuk menguji struktur partikel kalimat, dan analisis jebakan pilihan mirip.',
    comparativeHighlights: [
      {
        versusBookId: 'shin_kanzen_master',
        versusBookName: 'Shin Kanzen Master',
        distinction: 'Sou Matome lebih ramah dan santai dengan ilustrasi kartun pendukung, sementara Shin Kanzen Master jauh lebih padat, analitis, dan menantang.',
      },
    ],
  },

  shin_kanzen_master: {
    id: 'shin_kanzen_master',
    title: 'Shin Kanzen Master (新完全マスター)',
    publisher: '3A Corporation',
    philosophy: 'Analisis Distingsi Nuansa Presisi Tinggi (Rigorous Linguistic Discrimination & Traps)',
    who: 'Pembelajar serius tingkat menengah ke atas (N3–N1) yang sering terjebak oleh pilihan ganda yang mirip dan ingin menguasai nuansa bahasa Jepang setingkat native.',
    what: 'Pembedahan mendalam perbedaan halus antara pola-pola yang tampak serupa (seperti ~wake dewa nai vs ~to wa kagiranai, atau ~ni shite wa vs ~wari ni wa).',
    when: 'Dikelompokkan secara ketat berdasarkan kategori semantik dan fungsi wacana: sebab-akibat, pengandaian kontrafaktual, kontras paradoks, batasan derajat, dan sikap psikologis pembicara.',
    where: 'Bahasa Jepang tertulis tingkat tinggi: esai opini, teks editorial, pidato formal, dan regulasi resmi.',
    why: 'Di level N2 dan N1, kesalahan terbesar pelajar bukan lagi tidak tahu arti kata, melainkan memakai kata yang benar di konteks yang salah (*sociolinguistic mismatch*). Shin Kanzen melatih kepekaan ini.',
    how: 'Melalui latihan komparasi berpasangan, soal cloze berbobot tinggi, dan jebakan distractor autentik JLPT.',
    comparativeHighlights: [
      {
        versusBookId: 'soumatome',
        versusBookName: 'Nihongo Sou Matome',
        distinction: 'Shin Kanzen Master jauh lebih komprehensif dalam membedah batasan penggunaan (*collocational constraints*), menjadikannya standar emas bagi calon penerjemah.',
      },
    ],
  },

  tobira: {
    id: 'tobira',
    title: 'Tobira: Gateway to Advanced Japanese (上級へのとびら)',
    publisher: 'Kuroshio Publishers',
    philosophy: 'Transisi Menengah Berbasis Konten Budaya (Content-Based Instruction & Cultural Transition)',
    who: 'Pelajar yang telah menyelesaikan level dasar (N4) dan ingin mendobrak "tembok N3" menuju kefasihan membaca teks panjang dan berdiskusi mendalam.',
    what: '15 bab bertema kaya budaya dan masyarakat Jepang: geografi, teknologi, sistem pendidikan, agama & anime, hingga masalah lingkungan hidup.',
    when: 'Setiap bab diawali artikel bacaan otentik 2–4 halaman, diikuti bedah kosakata berfrekuensi tinggi, pola tata bahasa kontekstual, dan latihan pertukaran opini.',
    where: 'Masyarakat Jepang modern, forum diskusi intelektual, dan media massa.',
    why: 'Tobira membuktikan bahwa tata bahasa tingkat menengah tidak bisa dipelajari sebagai kalimat lepas terisolasi; tata bahasa hanya hidup jika terikat dalam wacana teks panjang (*macro-discourse*).',
    how: 'Menggabungkan bacaan naratif, latihan ekspresi lisan (*Roleplay/Discussion*), dan tugas penelitian mini kebudayaan.',
    comparativeHighlights: [
      {
        versusBookId: 'quartet',
        versusBookName: 'QUARTET',
        distinction: 'Tobira lebih condong ke wawasan kebudayaan dan sosiologis Jepang, sedangkan QUARTET lebih condong ke penulisan esai akademis dan presentasi.',
      },
    ],
  },

  quartet: {
    id: 'quartet',
    title: 'QUARTET: Intermediate Japanese Across Four Skills',
    publisher: 'The Japan Times',
    philosophy: 'Integrasi 4 Kemahiran Berkelanjutan (Cohesive 4-Skills Spiral Integration)',
    who: 'Pelajar level N3–N2 yang ingin memiliki kemampuan seimbang antara input (Membaca & Mendengar) dan output produktif (Menulis Esai & Berbicara Formal).',
    what: 'Setiap pelajaran mengikat satu tema besar (misal: "Gaya Hidup dan Konsumsi") ke dalam 4 modul yang saling menyokong: Bacaan $\\rightarrow$ Pola Kalimat $\\rightarrow$ Tulis Esai $\\rightarrow$ Presentasi Lisan.',
    when: 'Terbagi dalam 2 jilid (Jilid 1 untuk N3, Jilid 2 untuk N2), masing-masing berisi 6 pelajaran padat yang dirancang untuk satu semester akademik.',
    where: 'Kehidupan profesional, universitas riset, dan seminar diskusi di Jepang.',
    why: 'Banyak pelajar bisa membaca kanji sulit tapi lidahnya kaku saat presentasi. QUARTET memecahkan masalah ini dengan mewajibkan pelajar memakai tata bahasa bacaan ke dalam tugas menulis dan berbicara mereka.',
    how: 'Menyediakan kerangka struktur komposisi (*paragraph structuring models*) dan strategi retorika berbicara formal.',
    comparativeHighlights: [
      {
        versusBookId: 'tobira',
        versusBookName: 'Tobira',
        distinction: 'QUARTET adalah penerus spiritual GENKI dengan desain tipografi modern dan panduan penulisan esai yang sangat terstruktur langkah-demi-langkah.',
      },
    ],
  },

  try: {
    id: 'try',
    title: 'TRY! Nihongo Nouryoku Shiken (TRY! 日本語能力試験)',
    publisher: 'Ask Publishing / ABK Asian Students Cultural Association',
    philosophy: 'Situasi Percakapan Nyata Menuju Rumus Ujian (Can-Do Passage to Grammar Formulas)',
    who: 'Pelajar yang ingin lulus JLPT tetapi tidak suka menghafal rumus kering, melainkan ingin memahami lewat konteks cerita dan percakapan hidup.',
    what: 'Teks bacaan naratif atau percakapan realistis di awal setiap unit yang secara alami memuat seluruh target tata bahasa bab tersebut.',
    when: 'Tersedia lengkap dari N5 hingga N1. Setiap bab mencakup 6–10 target tata bahasa yang diakhiri latihan soal berstandar JLPT resmi.',
    where: 'Situasi harian, cerita kehidupan asrama, surat lamaran magang, dan situasi kerja.',
    why: 'Nama TRY! berasal dari filosofi "Cobalah pakai dulu dalam situasi nyata, lalu pahami rumusnya". Pola pikir ini membuat hafalan bertahan jauh lebih lama di memori jangka panjang.',
    how: 'Kombinasi mendengarkan audio bacaan pembuka, menganalisis rumus tebal, dan mengerjakan soal tes mini bergaya JLPT.',
    comparativeHighlights: [
      {
        versusBookId: 'soumatome',
        versusBookName: 'Nihongo Sou Matome',
        distinction: 'TRY! selalu menyertakan teks cerita pembuka yang menyatukan semua pola bab tersebut, sementara Sou Matome menyajikan pola dalam kartu-kartu terpisah.',
      },
    ],
  },

  marugoto: {
    id: 'marugoto',
    title: 'Marugoto: Japanese Language and Culture (まるごと 日本のことばと文化)',
    publisher: 'The Japan Foundation (JF)',
    philosophy: 'Kompetensi Komunikatif Antar-Budaya Penuh (JF Standard Intercultural Communicative Competence)',
    who: 'Pelajar umum dan penikmat budaya Jepang yang mengutamakan percakapan santai, pemahaman adat istiadat, dan ekspresi visual yang menyenangkan.',
    what: 'Buku teks penuh warna dengan foto asli kehidupan Jepang, memadukan dua buku kembar dalam setiap level: *Katsudoo* (Aktivitas Komunikasi) dan *Rikai* (Pemahaman Bahasa & Tata Bahasa).',
    when: 'Mengikuti level CEFR (Starter A1 s.d. Intermediate B1) dengan fokus pada topik sehari-hari: makanan favorit, keluarga, traveling, festival, dan arsitektur rumah Jepang.',
    where: 'Keluarga angkat (*homestay*), festival matsuri, perjalanan wisata, dan interaksi ramah dengan orang lokal.',
    why: 'Marugoto percaya belajar bahasa tidak terpisahkan dari merasakan budayanya. Oleh karena itu, budaya disajikan sebagai menu utama, bukan sekadar selipan di pojok halaman.',
    how: 'Menggunakan rekaman dialog alami dari berbagai kalangan umur dan dialek, dilengkapi portofolio refleksi diri mandiri.',
    comparativeHighlights: [
      {
        versusBookId: 'minna',
        versusBookName: 'Minna no Nihongo',
        distinction: 'Marugoto bebas dari drill tata bahasa mekanis yang kaku, mengutamakan kenyamanan berbicara tanpa rasa cemas salah rumus.',
      },
    ],
  },
};
