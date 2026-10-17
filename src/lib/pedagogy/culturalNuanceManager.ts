// ══════════════════════════════════════════════════════════════════
//  culturalNuanceManager.ts — Modul Nuansa Budaya Kerja Jepang vs Indonesia
//  Panduan etika profesional, hierarki, dan komunikasi untuk pekerja SSW,
//  EPA Kaigo, perawat, magang, dan profesional Indonesia di Jepang
// ══════════════════════════════════════════════════════════════════

export type WorkplaceDomain =
  | 'komunikasi_bisnis'
  | 'keselamatan_k3'
  | 'etika_kerja'
  | 'hierarki_relasi'
  | 'kehidupan_sehari_hari';

export interface CulturalNuanceItem {
  id: string;
  conceptJa: string;
  kanji: string;
  romaji: string;
  titleId: string;
  domain: WorkplaceDomain;
  targetAudience: ('SSW' | 'EPA_KAIGO' | 'ENGINEER' | 'ALL')[];
  summaryId: string;
  contrastIndonesianCulture: {
    kebiasaanUmumIndonesia: string;
    ekspektasiStandarJepang: string;
    titikGesekanPotensial: string;
  };
  practicalPhrases: {
    japanese: string;
    romaji: string;
    indonesian: string;
    context: string;
  }[];
  goldenRuleId: string;
}

export const CULTURAL_NUANCES: Record<string, CulturalNuanceItem> = {
  // 1. Konsep Hou-Ren-So (Pelaporan, Komunikasi, Konsultasi)
  hourenso: {
    id: 'hourenso',
    conceptJa: '報・連・相 (ほうれんそう)',
    kanji: '報告・連絡・相談',
    romaji: 'Hou-Ren-So',
    titleId: 'Hou-Ren-So: Fondasi Komunikasi Kerja Jepang',
    domain: 'komunikasi_bisnis',
    targetAudience: ['ALL', 'SSW', 'ENGINEER'],
    summaryId:
      'Trinitas komunikasi wajib di semua lingkungan kerja Jepang: Houkoku (Lapor progres/hasil), Renraku (Hubungi/bagikan fakta terkini), dan Soudan (Konsultasikan keraguan sebelum bertindak).',
    contrastIndonesianCulture: {
      kebiasaanUmumIndonesia:
        'Seringkali bawahan merasa "tidak enak" atau sungkan melapor jika belum selesai sempurna, atau menunggu ditanya atasan baru menjelaskan kendala.',
      ekspektasiStandarJepang:
        'Atasan menganggap tidak melapor tepat waktu sebagai bentuk ketidakjujuran atau ketidakmampuan berkolaborasi. Laporlah saat tugas baru mencapai 50% atau segera begitu ada tanda masalah.',
      titikGesekanPotensial:
        'Dianggap menyembunyikan masalah jika atasan baru tahu kendala saat batas waktu (deadline) sudah terlewati.',
    },
    practicalPhrases: [
      {
        japanese: '中間報告をさせていただきます。',
        romaji: 'Chuukan houkoku o sasete itadakimasu.',
        indonesian: 'Izinkan saya memberikan laporan perkembangan pertengahan.',
        context: 'Digunakan saat mengabari atasan di tengah-tengah pengerjaan tugas proyek.',
      },
      {
        japanese: '少しご相談したいことがあるのですが、今お時間よろしいでしょうか。',
        romaji: 'Sukoshi gosoudan shitai koto ga aru no desu ga, ima ojikan yoroshii deshou ka.',
        indonesian: 'Ada hal yang ingin saya konsultasikan sebentar, apakah Bapak/Ibu ada waktu sekarang?',
        context: 'Meminta waktu atasan dengan sopan sebelum melakukan Soudan.',
      },
    ],
    goldenRuleId:
      'Jangan pernah menunggu ditanya! Lebih baik over-communicating (terlalu rajin lapor) daripada membuat atasan cemas.',
  },

  // 2. Konsep Uchi vs Soto (Orang Dalam vs Orang Luar)
  uchi_soto: {
    id: 'uchi_soto',
    conceptJa: 'ウチとソト',
    kanji: '内外の区別',
    romaji: 'Uchi to Soto',
    titleId: 'Uchi vs Soto: Batas Sosial & Penentuan Ragam Bahasa',
    domain: 'hierarki_relasi',
    targetAudience: ['ALL', 'ENGINEER'],
    summaryId:
      'Pemisahan tegas antara "lingkaran dalam / keluarga / kantor kita (Uchi)" dan "lingkaran luar / tamu / klien (Soto)".',
    contrastIndonesianCulture: {
      kebiasaanUmumIndonesia:
        'Di Indonesia, menyebut atasan sendiri di depan tamu luar dengan sebutan hormat "Bapak Direktur kami yang terhormat" adalah bentuk kepatutan dan rasa hormat.',
      ekspektasiStandarJepang:
        'Di depan klien luar (Soto), seluruh anggota kantor kita (termasuk bos direktur) adalah "Uchi". Panggilan "-san" atau "shachou" HARUS DICOPOT, dan tindakan bos harus direndahkan dengan Kenjougo.',
      titikGesekanPotensial:
        'Dianggap tidak profesional jika mengatakan "Yamada-shachou ga osshaimashita" di depan klien. Yang benar adalah "Shachou no Yamada ga moushimashita".',
    },
    practicalPhrases: [
      {
        japanese: '担当の田中は、ただいま席を外しております。',
        romaji: 'Tantou no Tanaka wa, tadaima seki o hazushite orimasu.',
        indonesian: 'Penanggung jawab kami, Tanaka, sedang tidak berada di tempat saat ini.',
        context: 'Menjawab telepon dari klien luar tentang rekan kerja/atasan sendiri tanpa gelar -san.',
      },
    ],
    goldenRuleId:
      'Di depan orang luar, bosmu adalah keluargamu: sebut namanya langsung tanpa embel-embel gelar kehormatan!',
  },

  // 3. Budaya Koe-kake & Yubisashi Koushou (Keselamatan K3)
  koekake_safety: {
    id: 'koekake_safety',
    conceptJa: '声かけと指差し呼称 (ゆびさしこしょう)',
    kanji: '声かけ・指差し呼称',
    romaji: 'Koe-kake to Yubisashi Koushou',
    titleId: 'Koe-kake & Point-and-Call: Keselamatan K3 Gemba',
    domain: 'keselamatan_k3',
    targetAudience: ['SSW', 'EPA_KAIGO'],
    summaryId:
      'Membiasakan bersuara keras sebelum melakukan tindakan fisik (Koe-kake) dan menunjuk dengan jari sambil meneriakkan konfirmasi (Yubisashi Koushou) untuk mencegah kecelakaan fatal.',
    contrastIndonesianCulture: {
      kebiasaanUmumIndonesia:
        'Bekerja diam-diam dan mengandalkan kontak mata atau asumsi bahwa rekan kerja di sekitar sudah saling tahu.',
      ekspektasiStandarJepang:
        'Di pabrik atau panti jompo (Kaigo), diam saat bekerja dianggap bahaya besar. Setiap tindakan menyentuh pasien atau menggerakkan mesin wajib diawali suara lantang.',
      titikGesekanPotensial:
        'Klien lansia kaget atau terjatuh, atau kecelakaan mesin kerja karena tidak ada aba-aba suara sebelum bergerak.',
    },
    practicalPhrases: [
      {
        japanese: '右よし！左よし！安全確認よし！',
        romaji: 'Migi yoshi! Hidari yoshi! Anzen kakunin yoshi!',
        indonesian: 'Kanan aman! Kiri aman! Konfirmasi keselamatan aman!',
        context: 'Prosedur penunjuk keselamatan saat melintasi jalur forklift atau rel kerja.',
      },
      {
        japanese: '足を動かしますね。痛かったらおっしゃってください。',
        romaji: 'Ashi o ugokashimasu ne. Itakattara osshatte kudasai.',
        indonesian: 'Saya izin gerakkan kakinya ya. Kalau terasa sakit silakan beri tahu saya.',
        context: 'Koe-kake lembut kepada pasien lansia sebelum mobilisasi fisik.',
      },
    ],
    goldenRuleId:
      'Suara adalah alat keselamatan kerja paling murah dan paling ampuh di tempat kerja Jepang.',
  },

  // 4. Disiplin Waktu: 5-Fun Mae Koudou (5 Menit Sebelum Waktu)
  jikan_genshu: {
    id: 'jikan_genshu',
    conceptJa: '時間厳守と5分前行動',
    kanji: '時間厳守・5分前行動',
    romaji: 'Jikan Genshu (Gofun-mae Koudou)',
    titleId: 'Jikan Genshu: Mengapa Datang Tepat Waktu Berarti Terlambat',
    domain: 'etika_kerja',
    targetAudience: ['ALL', 'SSW', 'EPA_KAIGO', 'ENGINEER'],
    summaryId:
      'Prinsip "5-fun mae koudou" menegaskan bahwa waktu mulai shift atau meeting adalah waktu saat pekerjaan langsung dimulai, bukan waktu baru tiba di lokasi.',
    contrastIndonesianCulture: {
      kebiasaanUmumIndonesia:
        'Budaya toleransi beberapa menit atau baru tiba di gerbang kantor saat bel masuk berbunyi.',
      ekspektasiStandarJepang:
        'Wajib sudah berganti seragam kerja, membersihkan area, dan siap berdiri di posisi 5 hingga 10 menit sebelum jam kerja resmi dimulai.',
      titikGesekanPotensial:
        'Dianggap tidak bertanggung jawab dan kehilangan kepercayaan rekan kerja bila baru memarkir motor tepat di jam shift.',
    },
    practicalPhrases: [
      {
        japanese: '電車が遅延しまして、10分ほど遅れます。大変申し訳ございません。',
        romaji: 'Densha ga chien shimashite, juppun hodo okuremasu. Taihen moushiwake gozaimasen.',
        indonesian: 'Kereta mengalami keterlambatan, sehingga saya akan terlambat sekitar 10 menit. Saya sangat mohon maaf.',
        context: 'Menghubungi atasan SEBELUM jam masuk saat terjadi kendala transportasi tak terduga.',
      },
    ],
    goldenRuleId:
      'Di Jepang: Datang 10 menit lebih awal = Tepat waktu. Datang pas jam masuk = Terlambat.',
  },

  // 5. Etika Aisatsu & Salam Kerja Berjenjang
  aisatsu_hierarchy: {
    id: 'aisatsu_hierarchy',
    conceptJa: '挨拶の作法 (お疲れ様・お先に失礼します)',
    kanji: '挨拶作法',
    romaji: 'Aisatsu Sahou',
    titleId: 'Etika Salam Kerja (Aisatsu): Membangun Kepercayaan Tim',
    domain: 'komunikasi_bisnis',
    targetAudience: ['ALL', 'SSW', 'EPA_KAIGO'],
    summaryId:
      'Salam kerja di Jepang bukan basa-basi sosial, melainkan pengukur energi, kesehatan, dan kesiapan mental seorang pekerja.',
    contrastIndonesianCulture: {
      kebiasaanUmumIndonesia:
        'Menyapa hanya kepada teman yang akrab atau menyapa sambil lalu dengan anggukan kepala santai.',
      ekspektasiStandarJepang:
        'Menyapa setiap orang yang berpapasan di lorong dengan kontak mata dan postur membungkuk (ojigi) yang mantap.',
      titikGesekanPotensial:
        'Pulang kantor diam-diam tanpa mengucap "Osaki ni shitsurei shimasu" dianggap tidak menghormati tim yang masih lembur.',
    },
    practicalPhrases: [
      {
        japanese: 'おはようございます！今日もよろしくお願いします！',
        romaji: 'Ohayou gozaimasu! Kyou mo yoroshiku onegai shimasu!',
        indonesian: 'Selamat pagi! Hari ini pun mohon kerja sama dan bimbingannya!',
        context: 'Salam pagi saat pertama kali menginjakkan kaki di ruang kerja.',
      },
      {
        japanese: 'お先に失礼します。お疲れ様でした。',
        romaji: 'Osaki ni shitsurei shimasu. Otsukaresama deshita.',
        indonesian: 'Saya izin pulang mendahului. Terima kasih atas kerja keras hari ini.',
        context: 'Salam wajib sebelum melangkah pulang meninggalkan rekan kerja.',
      },
    ],
    goldenRuleId:
      'Aisatsu yang ceria dan lantang di pagi hari bisa menutupi 50% kekurangan bahasa Jepangmu!',
  },
};

/**
 * Mengambil informasi nuansa budaya berdasarkan ID unik.
 */
export function getCulturalNuance(id: string): CulturalNuanceItem | undefined {
  return CULTURAL_NUANCES[id];
}

/**
 * Mengambil seluruh daftar modul nuansa budaya kerja.
 */
export function getAllCulturalNuances(): CulturalNuanceItem[] {
  return Object.values(CULTURAL_NUANCES);
}

/**
 * Mengambil daftar nuansa budaya berdasarkan domain tempat kerja.
 */
export function getNuancesByDomain(domain: WorkplaceDomain): CulturalNuanceItem[] {
  return getAllCulturalNuances().filter((item) => item.domain === domain);
}

/**
 * Mengambil daftar nuansa budaya yang relevan untuk target audiens tertentu.
 */
export function getNuancesByAudience(target: 'SSW' | 'EPA_KAIGO' | 'ENGINEER' | 'ALL'): CulturalNuanceItem[] {
  return getAllCulturalNuances().filter(
    (item) => item.targetAudience.includes(target) || item.targetAudience.includes('ALL')
  );
}
