// ══════════════════════════════════════════════════════════════════
//  nuanceDb.ts — Canonical Indonesian L1 Contrastive Nuance Matrix
//  Research Basis: Prihantoro et al. (2024), Husna & Febriyanti (2022),
//                  Pomax Linguistic Analysis & Corpus v30 (300 compiled items)
// ══════════════════════════════════════════════════════════════════

export type NuanceCategory =
  | 'l1_interference'
  | 'transitivity'
  | 'false_friends'
  | 'particles'
  | 'jlpt_grammar';

export interface NuancePatternDetail {
  pattern: string;
  reading: string;
  meaning: string;
  nuance: string;
  example: {
    jp: string;
    id: string;
  };
}

export interface NuanceComparisonPair {
  id: string;
  title: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'N5 / N4' | 'N4 / N3' | 'N3 / N2' | 'N2 / N1' | 'Semua Level';
  category: NuanceCategory;
  domain: string;
  patternA: NuancePatternDetail;
  patternB: NuancePatternDetail;
  keyDifference: string;
  trapWarning: string;
  l1Pitfall?: {
    indonesianMistake: string;
    rootCause: string;
    remedialMnemonic: string;
  };
}

export const CANONICAL_NUANCE_PAIRS: NuanceComparisonPair[] = [
  // ── KELOMPOK 1: L1 INTERFERENCE & SALAH KAPRAH KHAS INDONESIA ──
  {
    id: 'adalah-insertion-copula',
    title: 'だ/です (Kopula) vs Salah Kaprah "Adalah"',
    level: 'N5',
    category: 'l1_interference',
    domain: 'Domain V: Adnominal Clauses & Copula Transfer',
    patternA: {
      pattern: '〜は〜です / だ',
      reading: '〜は〜です / だ',
      meaning: 'A adalah B (Pernyataan identitas nomina)',
      nuance: 'Kopula だ/です hanya mengikat NOMINA atau NA-adjektiva untuk menegaskan predikat identitas. Posisi selalu di akhir kalimat.',
      example: {
        jp: '私は学生です。',
        id: 'Saya adalah seorang mahasiswa.',
      },
    },
    patternB: {
      pattern: '*〜は〜です + Verba / I-Adj (Kopula Ilegal)',
      reading: 'Kopula Ilegal (Salah Kaprah)',
      meaning: '*Salah kaprah menyisipkan kata "adalah" sebelum kata kerja/sifat',
      nuance: 'Verba dan I-adjektiva bahasa Jepang sudah memiliki fungsi predikatif mandiri. Menyelipkan だ/である di depannya adalah error transfer L1.',
      example: {
        jp: '× 私は日本へ行くです。→ ○ 私は日本へ行きます。',
        id: '× "Saya adalah pergi ke Jepang" (Salah!) → ○ "Saya pergi ke Jepang" (Benar).',
      },
    },
    keyDifference: 'Bahasa Indonesia mengizinkan kata perangkai "adalah" di depan verba/frasa, sedangkan bahasa Jepang mengharamkan だ/です mendahului bentuk kamus verba.',
    trapWarning: 'JANGAN PERNAH menyisipkan だ/です sebelum kata kerja (contoh: *食べるです) atau di depan nomina yang diterangkan (contoh: *面白いです本)!',
    l1Pitfall: {
      indonesianMistake: 'Menerjemahkan kata "adalah" secara kaku menjadi "desu" sebelum predikat verba.',
      rootCause: 'Bahasa Indonesia adalah bahasa SVO tanpa fleksi verba, sehingga pembelajar membutuhkan kopula penghubung subjek dan predikat.',
      remedialMnemonic: 'Verba Jepang sudah mandiri! Jangan beri "adalah" (です/だ) jika kalimatmu sudah berujung kata kerja (~ます/~る).',
    },
  },
  {
    id: 'wa-vs-ga-asymmetry',
    title: 'は (wa) vs が (ga) — Topik vs Subjek Faktual',
    level: 'N5 / N4',
    category: 'particles',
    domain: 'Domain I: Asymmetrical Case Particles',
    patternA: {
      pattern: '〜は (wa)',
      reading: 'wa',
      meaning: 'Mengenai... / Berbicara tentang...',
      nuance: 'Menandai tema pembicaraan yang sudah diketahui kedua pihak (old info) atau menghadirkan kontras dengan hal lain. Fokus ada di setelah は.',
      example: {
        jp: '田中さんは親切です。',
        id: 'Mengenai Saudara Tanaka, orangnya sangat ramah (fokus: ramahnya).',
      },
    },
    patternB: {
      pattern: '〜が (ga)',
      reading: 'ga',
      meaning: '...lah yang / Subjek spesifik',
      nuance: 'Menunjuk pelaku spesifik (exhaustive listing) atau fenomena objektif yang ditangkap panca indera (new info). Fokus ada di depan が.',
      example: {
        jp: '田中さんが来ました！',
        id: 'Tanaka-lah yang datang! (fokus: orangnya yang baru tiba).',
      },
    },
    keyDifference: 'は menyorot predikat di belakangnya (topik umum/kontras), sedangkan が menyorot subjek di depannya ("siapa/apa persisnya").',
    trapWarning: 'Dalam anak kalimat (relative clause / 連体修飾節), partikel は TIDAK BOLEH dipakai; wajib diganti dengan が atau の!',
    l1Pitfall: {
      indonesianMistake: 'Menganggap は dan が sama-sama berarti subjek "yang/si".',
      rootCause: 'Bahasa Indonesia tidak membedakan penanda topik (topic-prominent) dan penanda kasus gramatikal subjek (subject-prominent).',
      remedialMnemonic: 'Tanya "Siapa yang..."? Jawab pakai が (Tanaka-san ga!). Bicara "Orangnya bagaimana..."? Mulai pakai は (Tanaka-san wa...).',
    },
  },
  {
    id: 'ni-vs-de-locative',
    title: 'に (ni) vs で (de) — Tabrakan Kata "DI" Bahasa Indonesia',
    level: 'N5',
    category: 'l1_interference',
    domain: 'Domain I: Asymmetrical Case Particles',
    patternA: {
      pattern: '〜に [住む・ある・いる]',
      reading: 'ni',
      meaning: 'Di (Lokus eksistensi / menetap permanen)',
      nuance: 'Menandai titik hasil keberadaan subjek yang statis atau tempat tujuan akhir pergerakan (locus of existence).',
      example: {
        jp: '私は東京に住んでいます。',
        id: 'Saya tinggal di Tokyo (keberadaan menetap).',
      },
    },
    patternB: {
      pattern: '〜で [働く・勉強する・食べる]',
      reading: 'de',
      meaning: 'Di (Lokus aksi / aktivitas dinamis)',
      nuance: 'Menandai arena panggung di mana suatu aksi fisik atau peristiwa aktif berlangsung (locus of action).',
      example: {
        jp: '図書館で日本語を勉強します。',
        id: 'Belajar bahasa Jepang di perpustakaan (aktivitas dinamis).',
      },
    },
    keyDifference: 'Keduanya diterjemahkan "DI" dalam bahasa Indonesia. Gunakan に untuk keberadaan menetap (住む/ある/いる), gunakan で untuk aktivitas kerja/belajar.',
    trapWarning: 'Jangan katakan *東京で住んでいます (Salah)! Verba tinggal (住む) memproyeksikan status keberadaan, bukan kegiatan fisik sementara.',
    l1Pitfall: {
      indonesianMistake: 'Menggunakan "de" untuk semua kata "di" tempat tinggal.',
      rootCause: 'Bahasa Indonesia hanya memiliki satu preposisi universal "di" untuk lokasi diam maupun aksi.',
      remedialMnemonic: 'Diam menetap = NInja diam (に)! Beraksi heboh = DEmonstrasi gerak (で)!',
    },
  },
  {
    id: 'ageru-kureru-morau-perspective',
    title: 'てあげる vs てくれる vs てもらう',
    level: 'N4',
    category: 'l1_interference',
    domain: 'Domain IV: Benefactive Verbs & Perspective',
    patternA: {
      pattern: '〜てあげる',
      reading: '〜てあげる',
      meaning: 'Melakukan kebaikan untuk orang lain (Dari saya/kami ke luar)',
      nuance: 'Vektor kebaikan mengalir keluar dari sudut pandang pembicara. Hati-hati: kepada atasan terkesan sombong/merendahkan jika diucapkan terang-terangan.',
      example: {
        jp: '友だちの荷物を持ってあげました。',
        id: 'Saya membawakan barang bawaan teman saya (kebaikan saya untuk dia).',
      },
    },
    patternB: {
      pattern: '〜てくれる',
      reading: '〜てくれる',
      meaning: 'Orang lain berbuat baik untuk saya/kami (Dari luar ke dalam)',
      nuance: 'Vektor kebaikan mengalir masuk ke arah pembicara atas inisiatif pihak lain. Pembicara merasa bersyukur atas budi baik tersebut.',
      example: {
        jp: '鈴木さんが駅まで送ってくれました。',
        id: 'Pak Suzuki telah mengantarkan saya sampai ke stasiun (dia berbaik hati).',
      },
    },
    keyDifference: 'あげる mengalir dari saya ke orang lain, くれる mengalir dari orang lain masuk ke saya. てもらう menyatakan saya memohon/menerima bantuan orang lain.',
    trapWarning: 'Jangan katakan *先生が本をあげました saat guru memberi buku kepadamu! Wajib gunakan くれました atau くださった.',
    l1Pitfall: {
      indonesianMistake: 'Memakai "memberi" (あげる) untuk aksi orang lain memberi kepada pembicara.',
      rootCause: 'Bahasa Indonesia memakai kata "memberi" netral tanpa memandang arah vektor sudut pandang penutur.',
      remedialMnemonic: 'Kebaikan Masuk = KUrterima (くれる)! Kebaikan Keluar = Aku beri (あげる)!',
    },
  },

  // ── KELOMPOK 2: TRANSITIVE (他動詞) VS INTRANSITIVE (自動詞) PAIRS ──
  {
    id: 'aku-vs-akeru',
    title: '開く (あく) vs 開ける (あける)',
    level: 'N5 / N4',
    category: 'transitivity',
    domain: 'Domain II: Transitivity & Ergative Ergativity',
    patternA: {
      pattern: 'ドアが開く (が自動詞)',
      reading: 'ドアがあく',
      meaning: 'Pintu terbuka (sendiri / fenomena alami)',
      nuance: 'Verba intransitif (自動詞). Menyoroti perubahan wujud atau status objek tanpa menyebutkan atau memedulikan siapa pelaku manusianya.',
      example: {
        jp: '風でドアが開きました。',
        id: 'Pintu terbuka karena tertiup angin (terbuka sendiri).',
      },
    },
    patternB: {
      pattern: 'ドアを開ける (を他動詞)',
      reading: 'ドアをあける',
      meaning: 'Membuka pintu (aksi sengaja seseorang)',
      nuance: 'Verba transitif (他動詞). Membutuhkan pelaku yang melakukan tindakan sengaja pada objek penderita (bertanda partikel を).',
      example: {
        jp: '暑いので窓を開けました。',
        id: 'Karena gerah, saya sengaja membuka jendela.',
      },
    },
    keyDifference: 'が 開く = terbuka sendiri (fokus status), を 開ける = membuka sesuatu dengan sengaja (fokus aksi pelaku).',
    trapWarning: 'Bentuk 〜ている pada intransitif (開いている) berarti "kondisi sedang terbuka", bukan sedang melakukan aksi!',
    l1Pitfall: {
      indonesianMistake: 'Tertukar memakai partikel を pada verba あく (*ドアをあく).',
      rootCause: 'Imbuhan bahasa Indonesia ter- (terbuka) dan me- (membuka) sering membingungkan saat memetakan partikel penanda objek を vs が.',
      remedialMnemonic: 'Vokal U = Intransitif Terbuka sendiri (開く・あく)! Akhiran ERU = Membuka dengan tenaga (開ける・あける)!',
    },
  },
  {
    id: 'kieru-vs-kesu',
    title: '消える (きえる) vs 消す (けす)',
    level: 'N5 / N4',
    category: 'transitivity',
    domain: 'Domain II: Transitivity & Ergative Ergativity',
    patternA: {
      pattern: '電気が消える (が自動詞)',
      reading: 'でんきがきえる',
      meaning: 'Lampu padam / mati sendiri',
      nuance: 'Status hilangnya nyala api atau aliran listrik tanpa campur tangan langsung manusia yang disorot.',
      example: {
        jp: '停電で部屋の電気が消えました。',
        id: 'Karena mati listrik, lampu kamar langsung padam sendiri.',
      },
    },
    patternB: {
      pattern: '電気を消す (を他動詞)',
      reading: 'でんきをけす',
      meaning: 'Mematikan lampu / memadamkan api',
      nuance: 'Tindakan volisional seseorang menekan saklar atau memadamkan sumber cahaya/api.',
      example: {
        jp: '寝る前に電気を消してください。',
        id: 'Tolong matikan lampu sebelum tidur.',
      },
    },
    keyDifference: 'が 消える = padam sendiri (intransitif), を 消す = mematikan sesuatu secara sengaja (transitif).',
    trapWarning: 'Saat melihat kompor mati sendiri di dapur, katakan 火が消えた, bukan 火を消した!',
  },
  {
    id: 'ochiru-vs-otosu',
    title: '落ちる (おちる) vs 落とす (おとす)',
    level: 'N4',
    category: 'transitivity',
    domain: 'Domain II: Transitivity & Ergative Ergativity',
    patternA: {
      pattern: '財布が落ちる (が自動詞)',
      reading: 'さいふがおちる',
      meaning: 'Dompet terjatuh / jatuh sendiri',
      nuance: 'Peristiwa jatuhnya benda akibat gravitasi tanpa ada kesengajaan dari pelaku.',
      example: {
        jp: 'ポケットから小銭が落ちました。',
        id: 'Uang koin terjatuh dari dalam saku.',
      },
    },
    patternB: {
      pattern: '財布を落とす (を他動詞)',
      reading: 'さいふをおとす',
      meaning: 'Menjatuhkan / menghilangkan dompet',
      nuance: 'Kelalaian atau tindakan pelaku yang menyebabkan barang terlepas dan jatuh.',
      example: {
        jp: '道で定期券を落としてしまいました。',
        id: 'Saya tidak sengaja menjatuhkan kartu komuter di jalan.',
      },
    },
    keyDifference: 'が 落ちる = terjatuh/gugur (intransitif), を 落とす = menjatuhkan/menghilangkan (transitif).',
    trapWarning: 'Saat lulus/gagal ujian: 落ちる berarti "tidak lulus / gagal ujian" (試験に落ちる), bukan menjatuhkan ujian!',
  },

  // ── KELOMPOK 3: FALSE FRIENDS & WASEI-EIGO (JEBAKAN KOSAKATA SERAPAN) ──
  {
    id: 'false-friend-mansion',
    title: 'マンション (Mansion) vs Rumah Mewah',
    level: 'Semua Level',
    category: 'false_friends',
    domain: 'Domain III: False Cognates & Wasei-Eigo',
    patternA: {
      pattern: 'マンション (Wasei-Eigo Jepang)',
      reading: 'まんしょん',
      meaning: 'Apartemen / Kondominium beton bertingkat biasa',
      nuance: 'Di Jepang, マンション adalah hunian vertikal apartemen berstruktur beton/baja (RC), ditinggali masyarakat kelas menengah biasa.',
      example: {
        jp: '駅前のマンションを借りました。',
        id: 'Saya menyewa apartemen beton di depan stasiun.',
      },
    },
    patternB: {
      pattern: '豪邸・大邸宅 (Rumah Gedongan Bahasa Indonesia/Inggris)',
      reading: 'ごうてい / だいていたく',
      meaning: 'Rumah mewah besar berhalaman luas (Mansion asli Inggris)',
      nuance: 'Dalam bahasa Inggris/Indonesia, mansion berarti istana pribadi mewah para konglomerat dengan halaman sangat luas.',
      example: {
        jp: '大富豪の豪邸に招待された。',
        id: 'Saya diundang ke rumah gedongan megah milik konglomerat.',
      },
    },
    keyDifference: 'マンション di Jepang hanyalah apartemen beton biasa. Jika ingin menyebut rumah megah miliarder, sebutlah 豪邸 (Goutei).',
    trapWarning: 'Jangan mengira teman Jepangmu konglomerat sultan saat dia berkata "Watashi wa mansion ni sunde imasu"! Dia cuma tinggal di apartemen petak biasa.',
    l1Pitfall: {
      indonesianMistake: 'Membayangkan rumah istana megah saat mendengar kata mansion.',
      rootCause: 'Pengaruh serapan kata "mansion" dari film Hollywood dalam bahasa Indonesia.',
      remedialMnemonic: 'Mansion Jepang = Mampir ke Apartemen Beton Sederhana!',
    },
  },
  {
    id: 'false-friend-cunning',
    title: 'カンニング (Cunning) vs Mencontek Ujian',
    level: 'Semua Level',
    category: 'false_friends',
    domain: 'Domain III: False Cognates & Wasei-Eigo',
    patternA: {
      pattern: 'カンニング (Cunning Jepang)',
      reading: 'かんにんぐ',
      meaning: 'Mencontek / Berbuat curang saat ujian tulis',
      nuance: 'Di Jepang, serapan ini mengalami pergeseran makna sempit mutlak: hanya berarti tindakan mencontek (cheating in exams).',
      example: {
        jp: 'カンニングが見つかって退学になった。',
        id: 'Ketahuan mencontek saat ujian, ia dikeluarkan dari sekolah.',
      },
    },
    patternB: {
      pattern: 'ずる賢い / 狡猾 (Cunning Bahasa Inggris/Indonesia)',
      reading: 'ずるがしこい / こうかつ',
      meaning: 'Lihai, cerdik berbelit, banyak akal licik',
      nuance: 'Makna aslinya dalam bahasa Inggris adalah licik atau lihai memanfaatkan situasi untuk keuntungan pribadi.',
      example: {
        jp: '彼はとてもずる賢い商人だ。',
        id: 'Dia adalah pedagang yang sangat licik dan lihai.',
      },
    },
    keyDifference: 'カンニング di Jepang HANYA berarti aksi mencontek saat ujian sekolah, bukan watak licik cerdik.',
    trapWarning: 'Memuji orang Jepang "Anata wa cunning desu ne" akan dianggap menghina bahwa dia tukang contek curang!',
  },
  {
    id: 'false-friend-smart',
    title: 'スマート (Smart) vs Pintar / Ber-IQ Tinggi',
    level: 'Semua Level',
    category: 'false_friends',
    domain: 'Domain III: False Cognates & Wasei-Eigo',
    patternA: {
      pattern: 'スマート (Smart Jepang)',
      reading: 'すまーと',
      meaning: 'Bertubuh langsing, ramping, elegan bergaya',
      nuance: 'Dalam Wasei-Eigo, スマート merujuk pada bentuk fisik badan yang proporsional langsing atau penampilan busana yang modis anggun.',
      example: {
        jp: 'ダイエットして体がスマートになった。',
        id: 'Setelah diet, tubuhnya menjadi langsing dan ramping.',
      },
    },
    patternB: {
      pattern: '頭がいい / 賢い (Smart Pintar Otak)',
      reading: 'あたまがいい / かしこい',
      meaning: 'Pintar, cerdas, berotak encer, intelek',
      nuance: 'Untuk kecerdasan intelektual akademis, bahasa Jepang selalu menggunakan 頭がいい atau 賢い.',
      example: {
        jp: '彼女はとても頭が良くて合格した。',
        id: 'Dia sangat pintar sehingga langsung lulus ujian.',
      },
    },
    keyDifference: 'スマート di Jepang memuji bentuk fisik langsing/elegan, BUKAN memuji kecerdasan IQ di kepala.',
    trapWarning: 'Jika ingin memuji teman yang jago matematika, katakan 頭がいい (Atama ga ii), jangan sebut スマート!',
  },
  {
    id: 'false-friend-consent',
    title: 'コンセント (Consent) vs Colokan Listrik Dinding',
    level: 'Semua Level',
    category: 'false_friends',
    domain: 'Domain III: False Cognates & Wasei-Eigo',
    patternA: {
      pattern: 'コンセント (Consent Jepang)',
      reading: 'こんせんと',
      meaning: 'Stopkontak / Colokan listrik di dinding (Electrical Outlet)',
      nuance: 'Berasal dari istilah kuno "concentric plug". Di Jepang 100% berarti lubang colokan kabel listrik di tembok.',
      example: {
        jp: 'スマホの充電器をコンセントに差し込む。',
        id: 'Mencolokkan charger HP ke stopkontak dinding.',
      },
    },
    patternB: {
      pattern: '同意・承諾 (Consent Persetujuan Legal)',
      reading: 'どうい / しょうだく',
      meaning: 'Persetujuan suka sama suka / Izin resmi medis & hukum',
      nuance: 'Makna asli bahasa Inggris adalah izin atau persetujuan persetujuan sukarela antara dua pihak.',
      example: {
        jp: '手術の前にインフォームド・コンセントを得る。',
        id: 'Memperoleh persetujuan tindakan medis sebelum operasi.',
      },
    },
    keyDifference: 'Di restoran atau kafe Jepang, bertanya "Konsento arimasu ka?" berarti menanyakan ketersediaan colokan charger HP!',
    trapWarning: 'Jangan kaget saat orang Jepang mencari コンセント di bawah meja kantor; mereka mencari lubang kabel listrik, bukan persetujuan batin!',
  },

  // ── KELOMPOK 4: JLPT N3–N1 NUANCE COMPARISON PAIRS ──
  {
    id: 'wake-vs-kagiranai',
    title: 'わけではない vs とは限らない',
    level: 'N3 / N2',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: 'わけではない',
      reading: 'わけではない',
      meaning: 'Bukan berarti / Bukan bermaksud sepenuhnya...',
      nuance: 'Digunakan untuk menyangkal kesimpulan wajar orang lain. Bersifat subjektif dan membela diri dari asumsi lawan bicara.',
      example: {
        jp: '嫌いなわけではないが、今は食べたくない。',
        id: 'Bukan berarti saya membencinya, hanya saja sekarang lagi tidak ingin makan.',
      },
    },
    patternB: {
      pattern: 'とは限らない',
      reading: 'とはかぎらない',
      meaning: 'Belum tentu / Tidak selalu...',
      nuance: 'Menyatakan probabilitas objektif atau kebenaran umum bahwa sesuatu yang lazim tidak 100% berlaku di setiap situasi.',
      example: {
        jp: '高いものが必ずしも良いとは限らない。',
        id: 'Barang yang mahal belum tentu selalu berkualitas bagus.',
      },
    },
    keyDifference: 'わけではない menyangkal praduga khusus ("bukan begitu maksud saya"), sedangkan とは限らない menyatakan kemungkinan objektif ("ada perkecualian secara logika").',
    trapWarning: 'Soal JLPT sering memunculkan kata 必ずしも (kanarazushimo = belum tentu). Pasangan alaminya adalah とは限らない!',
  },
  {
    id: 'monodakara-vs-seide',
    title: 'ものだから vs せいで',
    level: 'N3 / N2',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: 'ものだから',
      reading: 'ものだから / もんだから',
      meaning: 'Karena / Maklum saja soalnya...',
      nuance: 'Alasan pribadi yang bersifat membela diri secara halus untuk memohon permakluman dari pendengar. Tidak boleh digunakan untuk menyalahkan orang lain.',
      example: {
        jp: '道が混んでいたものだから、遅れてしまいました。',
        id: 'Karena jalanan macet parah (harap maklum), saya jadi terlambat.',
      },
    },
    patternB: {
      pattern: 'せいで',
      reading: 'せいで',
      meaning: 'Gara-gara / Akibat buruk dari...',
      nuance: 'Menyalahkan faktor eksternal atau seseorang atas hasil yang buruk atau kegagalan yang merugikan.',
      example: {
        jp: '雨が降ったせいで、試合が中止になった。',
        id: 'Gara-gara hujan turun, pertandingannya jadi dibatalkan.',
      },
    },
    keyDifference: 'ものだから bernada sopan memohon pengertian atas kekurangan diri sendiri, sedangkan せいで bernada menyalahkan pihak lain atau keadaan atas kesialan.',
    trapWarning: 'Jangan pernah gunakan せいで saat berbicara dengan atasan untuk membela diri atas kesalahan sendiri, karena terkesan lempar tanggung jawab!',
  },
  {
    id: 'warini-vs-nishiteha',
    title: 'わりに(は) vs にしては',
    level: 'N3 / N2',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: 'わりに(は)',
      reading: 'わりには',
      meaning: 'Untuk ukuran / Mengingat bahwa...',
      nuance: 'Membandingkan standar umum yang bisa diukur (harga, usia, porsi). Rentang kategori umum (misal: untuk ukuran harga murah).',
      example: {
        jp: 'この料理は値段のわりに量が多い。',
        id: 'Masakan ini untuk ukuran harganya, porsinya tergolong sangat banyak.',
      },
    },
    patternB: {
      pattern: 'にしては',
      reading: 'にしては',
      meaning: 'Padahal kenyataannya / Kalau mengingat bahwa dia adalah...',
      nuance: 'Membandingkan fakta konkret yang pasti dan spesifik (misal: padahal baru belajar 3 bulan, padahal koki profesional). Fakta spesifik tak terbantahkan.',
      example: {
        jp: '日本語を習って3ヶ月にしては、とても上手だ。',
        id: 'Mengingat dia baru belajar bahasa Jepang selama 3 bulan, bicaranya tergolong sangat mahir.',
      },
    },
    keyDifference: 'わりに(は) dipasangkan dengan standar umum yang bisa bervariasi (harga, umur), sedangkan にしては dipasangkan dengan fakta konkret yang pasti (3 bulan, orang dewasa).',
    trapWarning: 'Untuk angka waktu atau fakta spesifik yang tidak bisa ditawar, gunakan にしては!',
  },
  {
    id: 'totan-ni-vs-shidai',
    title: 'とたんに vs 次第 (しだい)',
    level: 'N3 / N2',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: '〜とたんに',
      reading: '〜とたんに',
      meaning: 'Begitu... seketika itu juga...',
      nuance: 'Menyatakan peristiwa masa lalu yang terjadi mendadak dan mengejutkan di luar kendali pembicara. Tidak boleh diikuti kalimat perintah atau kehendak.',
      example: {
        jp: '窓を開けたとたんに、強い風が吹き込んできた。',
        id: 'Begitu jendela dibuka, seketika itu juga angin kencang berhembus masuk.',
      },
    },
    patternB: {
      pattern: '〜次第 (しだい)',
      reading: '〜しだい',
      meaning: 'Segera setelah... (akan langsung melakukan)',
      nuance: 'Menyatakan janji masa depan dalam konteks bisnis/formal bahwa aksi berikutnya akan segera dieksekusi begitu syarat pertama terpenuhi.',
      example: {
        jp: '詳しい日程が決まり次第、すぐにご連絡いたします。',
        id: 'Segera setelah jadwal rincinya diputuskan, saya akan langsung menghubungi Anda.',
      },
    },
    keyDifference: 'とたんに hanya untuk kejadian masa lalu yang mengejutkan, sedangkan 次第 selalu untuk rencana/janji aksi di masa depan.',
    trapWarning: 'Jangan gunakan 次第 untuk kejadian lampau (*連絡した次第です), dan jangan gunakan とたんに untuk rencana masa depan (*来たとたんに電話します)!',
  },
  {
    id: 'okage-de-vs-sei-de',
    title: 'おかげで vs せいで',
    level: 'N4 / N3',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: '〜おかげで',
      reading: '〜おかげで',
      meaning: 'Berkat / Berkat bantuan dari...',
      nuance: 'Menyatakan rasa syukur atas bantuan seseorang atau kondisi baik yang membawa hasil positif menyenangkan.',
      example: {
        jp: '先生が教えてくださったおかげで、試験に合格しました。',
        id: 'Berkat bimbingan dari Sensei, saya berhasil lulus ujian.',
      },
    },
    patternB: {
      pattern: '〜せいで',
      reading: '〜せいで',
      meaning: 'Gara-gara / Akibat buruk dari...',
      nuance: 'Menyatakan kekecewaan atau menyalahkan faktor penyebab atas timbulnya hasil yang merugikan atau kegagalan.',
      example: {
        jp: '目覚まし時計が鳴らなかったせいで、遅刻した。',
        id: 'Gara-gara jam weker tidak berdering, saya jadi terlambat.',
      },
    },
    keyDifference: 'おかげで untuk hasil bernuansa positif/syukur, sedangkan せいで untuk hasil bernuansa negatif/rugi/kesialan.',
    trapWarning: 'Dalam sarkasme, orang Jepang terkadang memakai おかげで secara ironis, tetapi dalam ujian resmi JLPT おかげで selalu bernilai positif!',
  },
  {
    id: 'beki-vs-hazu',
    title: 'べき vs はず',
    level: 'N3 / N2',
    category: 'jlpt_grammar',
    domain: 'Domain VI: Discourse, Modality & Conditionals',
    patternA: {
      pattern: '〜べきだ',
      reading: '〜べきだ',
      meaning: 'Seharusnya / Wajib (Kewajiban moral/sosial)',
      nuance: 'Menyatakan kewajiban etika moral, nasihat wajar, atau tanggung jawab yang semestinya dilakukan seseorang.',
      example: {
        jp: '約束は絶対に守るべきです。',
        id: 'Janji itu seharusnya dan wajib ditepati.',
      },
    },
    patternB: {
      pattern: '〜はずだ',
      reading: '〜はずだ',
      meaning: 'Seharusnya / Pastilah (Ekspektasi logis)',
      nuance: 'Menyatakan dugaan atau kesimpulan logis pembicara berdasarkan bukti atau perhitungan yang masuk akal.',
      example: {
        jp: '鍵はカバンに入れたはずなのに、見当たらない。',
        id: 'Seharusnya kuncinya sudah saya masukkan ke dalam tas (ekspektasi logika), tapi kok tidak ada.',
      },
    },
    keyDifference: 'べき adalah kewajiban norma ("harus kamu lakukan secara moral"), sedangkan はず adalah keyakinan logika ("seharusnya secara hitungan kejadiannya demikian").',
    trapWarning: 'Jangan gunakan べき untuk memprediksi cuaca (*明日は晴れるべきだ)! Cuaca tidak punya kewajiban moral; gunakan はずだ.',
  },
];

// ══════════════════════════════════════════════════════════════════
//  Helper Query & Search APIs for Nuance Matrix
// ══════════════════════════════════════════════════════════════════

export function getNuancePairById(id: string): NuanceComparisonPair | undefined {
  if (!id) return undefined;
  return CANONICAL_NUANCE_PAIRS.find((p) => p.id.toLowerCase() === id.toLowerCase());
}

export function getNuancePairsByCategory(category: NuanceCategory | 'all'): NuanceComparisonPair[] {
  if (!category || category === 'all') return [...CANONICAL_NUANCE_PAIRS];
  return CANONICAL_NUANCE_PAIRS.filter((p) => p.category === category);
}

export function getNuancePairsByLevel(level: string): NuanceComparisonPair[] {
  if (!level || level === 'all') return [...CANONICAL_NUANCE_PAIRS];
  return CANONICAL_NUANCE_PAIRS.filter((p) => p.level.includes(level));
}

export function searchNuanceMatrix(keyword: string): NuanceComparisonPair[] {
  if (!keyword || typeof keyword !== 'string') return [...CANONICAL_NUANCE_PAIRS];
  const q = keyword.toLowerCase().trim();
  return CANONICAL_NUANCE_PAIRS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.keyDifference.toLowerCase().includes(q) ||
      p.trapWarning.toLowerCase().includes(q) ||
      p.patternA.pattern.toLowerCase().includes(q) ||
      p.patternB.pattern.toLowerCase().includes(q) ||
      p.patternA.meaning.toLowerCase().includes(q) ||
      p.patternB.meaning.toLowerCase().includes(q)
    );
  });
}

export function getL1InterferenceStats(): {
  totalCanonicalPairs: number;
  byCategory: Record<NuanceCategory, number>;
  l1InterferencePairs: number;
} {
  const byCategory: Record<NuanceCategory, number> = {
    l1_interference: 0,
    transitivity: 0,
    false_friends: 0,
    particles: 0,
    jlpt_grammar: 0,
  };

  CANONICAL_NUANCE_PAIRS.forEach((p) => {
    if (byCategory[p.category] !== undefined) {
      byCategory[p.category]++;
    }
  });

  return {
    totalCanonicalPairs: CANONICAL_NUANCE_PAIRS.length,
    byCategory,
    l1InterferencePairs: byCategory.l1_interference + byCategory.transitivity + byCategory.false_friends,
  };
}
