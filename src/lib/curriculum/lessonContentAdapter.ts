// ══════════════════════════════════════════════════════════════════
//  lessonContentAdapter.ts — Universal Adaptive Curriculum Engine
//  Menyediakan konten terkurasi 5W1H & Dynamic Generator lintas jalur
// ══════════════════════════════════════════════════════════════════

import {
  CurriculumLesson,
  LessonDialogueLine,
  LessonExplanationSection,
  LessonDrillItem,
  CanDoChallenge,
  LessonPedagogicalFramework,
} from '../../types/curriculum';
import { NormalizedGrammar, NormalizedVocab } from '../data/dataManager';

// ── 1. REPOSITORI KONTEN TERKURASI KHUSUS (GOLD STANDARD N5 & SSW KAIGO) ──

const CURATED_LESSONS_MAP: Record<string, Partial<CurriculumLesson>> = {
  // ── N5 Unit 1 Pelajaran 1: Nama & Identitas Pokok ───────────
  'les-n5-u01-01': {
    pedagogical_framework: {
      what: {
        summary: 'Pola predikat nominal afirmatif 〜は〜です dan penanda topik は (wa).',
        canDo: 'Bisa menyebutkan nama, asal negara, dan profesi diri secara sopan saat perjumpaan pertama.',
        targetPatterns: ['〜は〜です', 'は (topik)'],
        coreVocabSample: ['わたし', 'なまえ', 'がくせい', 'かいしゃいん', 'エンジニア', 'インドネシア'],
      },
      why_research: {
        cognitive_rationale:
          'Kapasitas kognitif otak pembelajar memproses kategori nomina + kopula desu jauh lebih awal dan stabil (Processability Theory Stage 2 Pienemann) sebelum mampu merakit infleksi verba kompleks (Stage 3/4).',
        sla_citations: [
          'Processability Theory Stage 2 (Pienemann 1998; Di Biase & Kawaguchi 2002)',
          'Semantic Clustering Prevention (Tinkham 1997; Waring 1997)',
          'Analisis Kontrasif Transfer L1 (Sutedi 2016)',
        ],
        prerequisite_link:
          'Fondasi struktur [Topik は Predikat です] menjadi cetak biru bagi 80% pola komunikasi dasar di seluruh level N5.',
      },
      who_and_when: {
        situational_context:
          'Perkenalan pertama kali (Jikoshoukai), registrasi administrasi, orientasi kantor/sekolah, atau menyapa tetangga baru.',
        social_relations:
          'Digunakan kepada orang yang baru dikenal, rekan sejawat, atau staf pelayanan publik dalam ragam kesopanan netral (Teineigo).',
        when_not_to_use:
          'Pantang memasang gelar 〜さん (san) pada nama diri sendiri. Hindari penggunaan kata ganti "anata" secara sembarangan kepada orang yang baru dikenal.',
      },
      scenario: {
        title: 'Registrasi Kependudukan di Balai Kota Shinjuku',
        setting: 'Loket Pendaftaran Penduduk, Kuyakusho Tokyo',
        narrative:
          'Budi baru saja mendarat di Jepang untuk bekerja. Dia mendatangi loket balai kota dan memperkenalkan identitas dirinya kepada Tanaka-san, petugas loket.',
      },
      edge_cases: [
        {
          title: 'Jebakan "Adalah" (Contrastive Copula Trap)',
          caseScenario: 'Menerjemahkan kata "adalah" di tengah kalimat seperti susunan SVO bahasa Indonesia.',
          pitfallWarning: '❌ "わたし は です ブディ。" (Watashi wa desu Budi)',
          rightSolution: '✅ "わたし は ブディ です。" (Watashi wa Budi desu)',
          explanation:
            'Di Jepang, "desu" bukan kata kerja, melainkan penanda kesopanan predikat yang SELALU diletakkan di akhir kalimat.',
        },
        {
          title: 'Pantangan Kata Ganti "Anata"',
          caseScenario: 'Bertanya identitas lawan bicara menggunakan kata "anata".',
          pitfallWarning: '❌ "あなた は がくせい ですか。" (Terdengar kasar & menuduh di Jepang)',
          rightSolution: '✅ "たなかさん は がくせい ですか。" atau hilangkan subjeknya.',
          explanation:
            'Orang Jepang menyebut nama lawan bicara + san, bukan kata ganti "anata" yang berjarak.',
        },
      ],
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'はじめまして。たなかです。どうぞ よろしく。',
        furigana: 'はじめまして。田中です。どうぞ よろしく。',
        romaji: 'Hajimemashite. Tanaka desu. Douzo yoroshiku.',
        idText: 'Salam kenal. Saya Tanaka. Senang berkenalan dengan Anda.',
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar',
        avatar: '🙋‍♂️',
        jp: 'はじめまして。わたしは ブディです。インドネシアから きました。',
        furigana: 'はじめまして。私は ブディです。インドネシアから 来ました。',
        romaji: 'Hajimemashite. Watashi wa Budi desu. Indoneshia kara kimashita.',
        idText: 'Salam kenal. Saya Budi. Saya datang dari Indonesia.',
      },
      {
        id: 'd3',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'ブディさんは、がくせいですか。',
        furigana: 'ブディさんは、学生ですか。',
        romaji: 'Budi-san wa, gakusei desu ka.',
        idText: 'Apakah Budi-san seorang pelajar/mahasiswa?',
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar',
        avatar: '🙋‍♂️',
        jp: 'いいえ、がくせいじゃ ありません。エンジニアです。',
        furigana: 'いいえ、学生じゃ ありません。エンジニアです。',
        romaji: 'Iie, gakusei ja arimasen. Enjinia desu.',
        idText: 'Bukan, saya bukan pelajar. Saya seorang insinyur.',
      },
    ],
    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00001',
        title: 'Pola Predikat Sopan: 〜は〜です',
        formula: '[Topik / Subjek] は [Predikat Nomina] です',
        meaning: 'Menyatakan identitas, nama, kebangsaan, atau profesi secara sopan.',
        nuanceNotes:
          'Partikel は ditulis dengan hiragana "ha" namun dilafalkan "wa". Desu diucapkan "des" dengan vokal "u" terbisukan secara halus.',
        examples: [
          {
            jp: 'わたしは エンジニアです。',
            furigana: '私は エンジニアです。',
            romaji: 'Watashi wa enjinia desu.',
            idText: 'Saya adalah seorang insinyur.',
          },
          {
            jp: 'たなかさんは にほんじんです。',
            furigana: '田中さんは 日本人です。',
            romaji: 'Tanaka-san wa nihonjin desu.',
            idText: 'Tanaka-san adalah orang Jepang.',
          },
        ],
        contrastiveTrap: {
          tag: 'contrastive-adalah-copula',
          warningTitle: 'Jangan meletakkan "desu" di tengah kalimat!',
          wrongExample: 'Watashi wa desu gakusei (Salah)',
          rightExample: 'Watashi wa gakusei desu (Benar)',
          explanation: 'Desu selalu berfungsi sebagai penutup kalimat predikat nomina di bahasa Jepang.',
        },
      },
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'reorder',
        instruction: 'Susun kata-kata berikut menjadi kalimat: "Saya adalah karyawan kantor"',
        sentencePrompt: 'Saya adalah karyawan kantor',
        tokens: ['です', 'わたしは', 'かいしゃいん'],
        correctOrder: ['わたしは', 'かいしゃいん', 'です'],
        correctAnswer: 'わたしは かいしゃいん です',
        explanation: 'Urutan bahasa Jepang: Topik (watashi wa) + Nomina (kaishain) + Kopula (desu).',
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Pilih partikel topik yang tepat untuk melengkapi kalimat perkenalan diri:',
        sentencePrompt: 'わたし _____ インドネシアじん です。',
        options: ['が', 'は', 'を', 'に'],
        correctAnswer: 'は',
        explanation: 'Partikel は (wa) mengangkat "watashi" sebagai topik pembicaraan perkenalan.',
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Spot the Edge Case: Kalimat manakah yang TIDAK PANTAS secara kesantunan di Jepang?',
        options: [
          'たなかさんは、エンジニアですか。',
          'あなたは、エンジニアですか。',
          'おしごとは、エンジニアですか。',
        ],
        correctAnswer: 'あなたは、エンジニアですか。',
        explanation:
          'Menggunakan "anata" kepada orang Jepang yang baru dikenal terkesan kasar dan menjaga jarak. Gunakan nama orang tersebut + san.',
      },
    ],
    can_do_challenge: {
      statement: 'Mampu memperkenalkan diri (nama & profesi) dengan sopan saat pertama kali berjumpa.',
      situation: 'Anda baru pertama kali datang ke kantor cabang Tokyo dan bertemu rekan kerja baru.',
      promptTask: 'Ucapkan perkenalan nama Anda dan sampaikan profesi Anda secara sopan!',
      modelAnswer: 'はじめまして。わたしは [Nama] です。エンジニアです。どうぞ よろしく。',
      modelAnswerId: 'Hajimemashite. Watashi wa [Nama] desu. Enjinia desu. Douzo yoroshiku.',
    },
  },

  // ── N5 Unit 1 Pelajaran 2: Penyangkal & Pertanyaan Sopan ─────
  'les-n5-u01-02': {
    pedagogical_framework: {
      what: {
        summary: 'Bentuk negatif predikat 〜じゃありません dan partikel tanya か.',
        canDo: 'Bisa menyangkal profesi/kewarganegaraan dan menanyakan identitas orang lain dengan sopan.',
        targetPatterns: ['〜じゃありません', '〜ですか'],
        coreVocabSample: ['がくせい', 'せんせい', 'いしゃ', 'かいしゃいん', 'はい', 'いいえ'],
      },
      why_research: {
        cognitive_rationale:
          'Setelah pola afirmatif stabil, pembelajar memerlukan kemampuan negasi polaritas dan introgatif untuk berpartisipasi dalam pertukaran percakapan dua arah (Two-way interaction hypothesis Long 1996).',
        sla_citations: [
          'Interaction Hypothesis (Long 1996)',
          'Negation Acquisition in Japanese Interlanguage (Kanagy 1994)',
        ],
        prerequisite_link: 'Negasi ja arimasen menggantikan desu secara langsung pada posisi predikat.',
      },
      who_and_when: {
        situational_context: 'Klarifikasi data diri, menjawab pertanyaan formulir, wawancara kerja.',
        social_relations: 'Sopan resmi (Teineigo) kepada siapa pun dalam situasi kerja atau publik.',
        when_not_to_use: 'Hindari mengatakan "Iie!" secara ketus tanpa alasan pelunak ketika menolak.',
      },
      scenario: {
        title: 'Verifikasi Identitas di Kantor Pos Tokyo',
        setting: 'Loket Pengambilan Paket Yuubinkyoku',
        narrative:
          'Petugas kantor pos menanyakan apakah Budi seorang mahasiswa universitas setempat sebelum menyerahkan paket kiriman.',
      },
      edge_cases: [
        {
          title: 'Ja Arimasen vs Dewa Arimasen',
          caseScenario: 'Memilih ragam kesopanan saat berbicara vs menulis surat resmi.',
          pitfallWarning: 'Mengira "ja arimasen" tidak sopan.',
          rightSolution:
            '"Ja arimasen" adalah lisan sopan standar. "Dewa arimasen" digunakan dalam tulisan resmi/pidato formal.',
          explanation: 'Keduanya sopan, namun "ja arimasen" adalah ragam percakapan alami sehari-hari.',
        },
      ],
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Petugas',
        speakerRole: 'Staf Pos',
        avatar: '📮',
        jp: 'ブディさんは、とうきょうだいがくの がくせいですか。',
        furigana: 'ブディさんは、東京大学の 学生ですか。',
        romaji: 'Budi-san wa, Toukyou daigaku no gakusei desu ka.',
        idText: 'Apakah Budi-san mahasiswa Universitas Tokyo?',
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar',
        avatar: '🙋‍♂️',
        jp: 'いいえ、がくせいじゃ ありません。かいしゃいんです。',
        furigana: 'いいえ、学生じゃ ありません。会社員です。',
        romaji: 'Iie, gakusei ja arimasen. Kaishain desu.',
        idText: 'Bukan, saya bukan mahasiswa. Saya karyawan perusahaan.',
      },
    ],
    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00002',
        title: 'Bentuk Negatif Sopan: 〜じゃありません',
        formula: '[Nomina] + じゃ ありません',
        meaning: 'Bukan (status/predikat yang disebutkan).',
        nuanceNotes: 'Bentuk sopan netral yang digunakan dalam percakapan lisan sehari-hari.',
        examples: [
          {
            jp: 'わたしは せんせいじゃ ありません。',
            furigana: '私は 先生じゃ ありません。',
            romaji: 'Watashi wa sensei ja arimasen.',
            idText: 'Saya bukan guru/dosen.',
          },
        ],
      },
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'reorder',
        instruction: 'Susun kalimat: "Bukan guru"',
        sentencePrompt: 'Bukan guru',
        tokens: ['ありません', 'せんせいじゃ'],
        correctOrder: ['せんせいじゃ', 'ありません'],
        correctAnswer: 'せんせいじゃ ありません',
        explanation: 'Sensei ja arimasen = Bukan guru.',
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Lengkapi partikel tanya di akhir kalimat:',
        sentencePrompt: 'あなたは にほんじん です_____。',
        options: ['ね', 'か', 'よ', 'の'],
        correctAnswer: 'か',
        explanation: 'Partikel か (ka) di akhir kalimat berfungsi menggantikan tanda tanya.',
      },
    ],
    can_do_challenge: {
      statement: 'Mampu menyangkal kesalahpahaman profesi/status diri dan menyatakan profesi yang benar.',
      situation: 'Seseorang mengira Anda adalah dokter di rumah sakit.',
      promptTask: 'Katakan bahwa Anda bukan dokter, melainkan perawat (kangoshi)!',
      modelAnswer: 'いいえ、いしゃじゃ ありません。かんごしです。',
      modelAnswerId: 'Iie, isha ja arimasen. Kangoshi desu.',
    },
  },

  // ── SSW Kaigo Unit 1 Pelajaran 1: Protokol Koe-kake Pagi ────
  'les-ssw-kaigo-u01-01': {
    pedagogical_framework: {
      what: {
        summary: 'Protokol Koe-kake (menyapa sebelum bertindak) dan salam hormat lansia di fasilitas panti wreda.',
        canDo: 'Bisa menyapa lansia di pagi hari dan meminta izin sebelum memeriksa kondisi atau membuka tirai.',
        targetPatterns: ['〜失礼します', '〜よろしいですか', 'おはようございます'],
        coreVocabSample: ['りようしゃ', 'たいちょう', 'カーテン', 'あさ', 'きぶん'],
      },
      why_research: {
        cognitive_rationale:
          'Standar keperawatan lansia Jepang (Kaigo Hoken SOP) mewajibkan prinsip "Jiritsu Shien" (kemandirian). Tenaga kerja asing wajib membiasakan salam Koe-kake agar lansia tidak terkejut atau merasa diperlakukan kasar.',
        sla_citations: [
          'Jicwels Kaigo Japanese Standard Curriculum (2020)',
          'Pragmatic Politeness in Geriatric Care (Hasegawa 2018)',
        ],
        prerequisite_link: 'Menjadi syarat mutlak sebelum melakukan kontak fisik atau transfer pasien.',
      },
      who_and_when: {
        situational_context: 'Pukul 07:00 pagi saat memasuki kamar residen lansia di panti wreda.',
        social_relations: 'Perawat (Kaigoshoku) kepada Residen Lansia (Riyousha-sama) dengan rasa hormat tinggi.',
        when_not_to_use: 'Dilarang langsung menyentuh tubuh atau membuka tirai tanpa suara menyapa terlebih dahulu.',
      },
      scenario: {
        title: 'Membangunkan Kakek Yamada di Kamar 203',
        setting: 'Fasilitas Panti Wreda Sakura En, Kamar Residen',
        narrative:
          'Siti (perawat SSW asal Indonesia) memasuki kamar Kakek Yamada untuk menyapa pagi dan membuka tirai jendela.',
      },
      edge_cases: [
        {
          title: 'Pantangan "Baby Talk" (Tameguchi Terlarang)',
          caseScenario: 'Berbicara dengan nada sok akrab atau memanggil lansia seperti anak kecil.',
          pitfallWarning: '❌ "おじいちゃん、起きて〜" (Ojiichan, okite~)',
          rightSolution: '✅ "山田様、おはようございます。失礼いたします。" (Yamada-sama, ohayou gozaimasu.)',
          explanation: 'Lansia di Jepang adalah orang dewasa terhormat. Gunakan nama keluarga + 様 (sama) atau さん (san).',
        },
      ],
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: 'やまださま、おはようございます。しつれいいたします。',
        furigana: '山田様、おはようございます。失礼いたします。',
        romaji: 'Yamada-sama, ohayou gozaimasu. Shitsurei itashimasu.',
        idText: 'Yamada-sama, selamat pagi. Permisi.',
      },
      {
        id: 'd2',
        speaker: 'Yamada-san',
        speakerRole: 'Residen Lansia',
        avatar: '👴',
        jp: 'ああ、シティさん。おはよう。',
        furigana: 'ああ、シティさん。おはよう。',
        romaji: 'Aa, Siti-san. Ohayou.',
        idText: 'Ah, Siti-san. Selamat pagi.',
      },
      {
        id: 'd3',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: 'きょうは いい てんきですね。カーテンを あけても よろしいですか。',
        furigana: '今日は いい 天気ですね。カーテンを 開けても よろしいですか。',
        romaji: 'Kyou wa ii tenki desu ne. Kaaten wo akete mo yoroshii desu ka.',
        idText: 'Hari ini cuaca cerah ya. Bolehkah saya membukakan tirainya?',
      },
    ],
    explanations: [
      {
        id: 'exp1',
        title: 'Protokol Koe-kake & Izin Tindakan: 〜ても よろしいですか',
        formula: '[Kata Kerja Bentuk て] + も よろしいですか',
        meaning: 'Apakah diperkenankan bila saya melakukan...?',
        nuanceNotes: 'Bentuk permohonan izin yang sangat santun dan wajib dalam dunia keperawatan Jepang.',
        examples: [
          {
            jp: 'カーテンを あけても よろしいですか。',
            furigana: 'カーテンを 開けても よろしいですか。',
            romaji: 'Kaaten wo akete mo yoroshii desu ka.',
            idText: 'Bolehkah saya membuka tirai?',
          },
        ],
      },
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'cloze',
        instruction: 'Lengkapi salam masuk kamar lansia sesuai SOP Kaigo:',
        sentencePrompt: 'やまださま、おはようございます。_____。',
        options: ['しつれいいたします', 'ごめんなさい', 'じゃあね', 'おじゃま'],
        correctAnswer: 'しつれいいたします',
        explanation: 'Shitsurei itashimasu adalah frasa wajib permisi saat memasuki ruang privasi residen.',
      },
      {
        id: 'drill-2',
        type: 'trap_detect',
        instruction: 'Spot the Edge Case: Manakah panggilan yang DILARANG dalam etika Kaigo Jepang?',
        options: ['山田様 (Yamada-sama)', '山田さん (Yamada-san)', 'おじいちゃん (Ojiichan)'],
        correctAnswer: 'おじいちゃん (Ojiichan)',
        explanation:
          'Memanggil lansia dengan "Ojiichan" dianggap merendahkan martabat (infantilization) dan dilarang keras dalam SOP Kaigo.',
      },
    ],
    can_do_challenge: {
      statement: 'Mampu menyapa lansia dan meminta izin membuka tirai jendela di pagi hari secara sopan.',
      situation: 'Pukul 07.00 pagi, Anda masuk ke kamar residen Nenek Sato.',
      promptTask: 'Ucapkan salam pagi dan minta izin membuka tirai!',
      modelAnswer: 'さとうさま、おはようございます。カーテンを あけても よろしいですか。',
      modelAnswerId: 'Satou-sama, ohayou gozaimasu. Kaaten wo akete mo yoroshii desu ka.',
    },
  },
};

// ── 2. DYNAMIC ADAPTIVE FALLBACK GENERATOR (UNTUK SELURUH JALUR LAIN) ──

/**
 * Menghasilkan konten pembelajaran adaptif lengkap untuk pelajaran mana pun
 * yang belum memiliki naskah terkurasi manual.
 */
export function getAdaptiveLessonContent(
  trackId: string,
  unit: any,
  lesson: CurriculumLesson,
  grammarList: NormalizedGrammar[] = [],
  vocabList: NormalizedVocab[] = []
): CurriculumLesson {
  // 1. Cek repositori terkurasi spesifik
  if (CURATED_LESSONS_MAP[lesson.id]) {
    const curated = CURATED_LESSONS_MAP[lesson.id];
    return {
      ...lesson,
      ...curated,
      pedagogical_framework: curated.pedagogical_framework || lesson.pedagogical_framework,
      dialogue: curated.dialogue || lesson.dialogue,
      explanations: curated.explanations || lesson.explanations,
      drills: curated.drills || lesson.drills,
      can_do_challenge: curated.can_do_challenge || lesson.can_do_challenge,
    };
  }

  // 2. Ambil data kata dan tata bahasa yang cocok
  const matchedGrammar = (lesson.grammar_ids || [])
    .map((gid) => grammarList.find((g) => g.id === gid))
    .filter(Boolean) as NormalizedGrammar[];

  const matchedVocab = (lesson.vocab_ids || [])
    .map((vid) => vocabList.find((v) => v.id === vid))
    .filter(Boolean) as NormalizedVocab[];

  const primaryG = matchedGrammar[0];
  const secondaryG = matchedGrammar[1] || matchedGrammar[0];

  const primaryV1 = matchedVocab[0] || { word: 'にほん', reading: 'にほん', meaning: 'Jepang' };
  const primaryV2 = matchedVocab[1] || { word: 'ともだち', reading: 'ともだち', meaning: 'Teman' };

  // 3. Bangun kerangka 5W1H otomatis
  const framework: LessonPedagogicalFramework = {
    what: {
      summary: `${lesson.title_id} — Fokus penguasaan pola ${primaryG?.pattern || 'tata bahasa utama'} dan kosakata terkait.`,
      canDo: lesson.can_do_statement || unit?.can_do_summary || 'Mampu mengomunikasikan gagasan inti unit ini secara wajar.',
      targetPatterns: matchedGrammar.slice(0, 3).map((g) => g.pattern || g.title),
      coreVocabSample: matchedVocab.slice(0, 5).map((v) => v.word || v.kanji || v.kana),
    },
    why_research: {
      cognitive_rationale: `Unit ini berakar pada Processability Theory Tahap ${unit?.pt_stage || 3} dan prinsip pembagian materi bertahap Nation (2007) untuk memastikan retensi stabil tanpa kelebihan beban memori kerja.`,
      sla_citations: [
        `Processability Theory Stage ${unit?.pt_stage || 3} (Pienemann 1998)`,
        'Nation 4 Strands (Meaning-focused Input & Output 2007)',
        'Contrastive Interlanguage Analysis (Sutedi 2016)',
      ],
      prerequisite_link: `Pola ini mengonsolidasikan pemahaman dari pelajaran sebelumnya untuk memperluas kapasitas komunikasi aktif.`,
    },
    who_and_when: {
      situational_context: `Digunakan saat berinteraksi dalam konteks ${unit?.theme || 'keseharian dan kerja di Jepang'}.`,
      social_relations: 'Ragam sopan standar (Teineigo) yang aman digunakan kepada siapa pun.',
      when_not_to_use: 'Perhatikan derajat kesantunan dan hindari mencampuradukkan bentuk kasual dengan formal.',
    },
    scenario: {
      title: `Skenario Praktis: ${unit?.theme || lesson.title_id}`,
      setting: 'Aktivitas Kerja / Kehidupan di Jepang',
      narrative: `Percakapan situasional yang menerapkan pola ${lesson.title_id} secara alami antara dua penutur.`,
    },
    edge_cases: [
      {
        title: 'Perhatian Nuansa & Transfer Bahasa Ibu',
        caseScenario: 'Menerapkan tata bahasa Indonesia secara literal tanpa menyesuaikan partikel Jepang.',
        pitfallWarning: 'Memilih partikel atau infleksi yang keliru akibat kebiasaan struktur kalimat bahasa Indonesia.',
        rightSolution: `Perhatikan posisi predikat dan fungsi partikel ${primaryG?.pattern || 'inti'}.`,
        explanation: 'Bahasa Jepang adalah bahasa berbasis partikel dengan predikat di akhir kalimat (SOV).',
      },
    ],
  };

  // 4. Bangun dialog dinamis dari contoh kalimat tata bahasa
  const ex1 = primaryG?.examples?.[0] || {
    jp: `${primaryV1.reading || primaryV1.word}に いきます。`,
    romaji: 'Nihon ni ikimasu.',
    id: 'Pergi ke Jepang.',
  };
  const ex2 = secondaryG?.examples?.[0] || {
    jp: `はい、わかりました。`,
    romaji: 'Hai, wakarimashita.',
    id: 'Ya, saya mengerti.',
  };

  const dialogue: LessonDialogueLine[] = [
    {
      id: 'd1',
      speaker: 'Tanaka',
      speakerRole: 'Rekan Bicara',
      avatar: '🧑‍💼',
      jp: ex1.jp,
      romaji: ex1.romaji,
      idText: ex1.id,
    },
    {
      id: 'd2',
      speaker: 'Kenji',
      speakerRole: 'Pembelajar',
      avatar: '🙋‍♂️',
      jp: ex2.jp,
      romaji: ex2.romaji,
      idText: ex2.id,
    },
  ];

  // 5. Bangun penjelasan tata bahasa dinamis
  const explanations: LessonExplanationSection[] = matchedGrammar.map((g, idx) => ({
    id: `exp-${idx + 1}`,
    grammarId: g.id,
    title: `Pola: ${g.pattern || g.title}`,
    formula: g.formula || g.pattern || 'Pola Inti',
    meaning: g.meaning || 'Makna dan fungsi pola.',
    nuanceNotes: g.notes || g.explanation || 'Digunakan dalam ragam sopan standar.',
    examples: (g.examples || []).slice(0, 2).map((ex: any) => ({
      jp: ex.jp || '',
      romaji: ex.romaji || '',
      idText: ex.id || '',
    })),
  }));

  // 6. Bangun latihan in-place micro-drills dinamis
  const drills: LessonDrillItem[] = [
    {
      id: 'drill-dyn-1',
      type: 'cloze',
      instruction: `Pilih opsi yang tepat untuk melengkapi pola ${primaryG?.pattern || 'tata bahasa'}:`,
      sentencePrompt: `${primaryV1.reading || primaryV1.word} _____`,
      options: [primaryG?.pattern || 'です', 'じゃない', 'でした', 'から'],
      correctAnswer: primaryG?.pattern || 'です',
      explanation: `Opsi yang benar adalah ${primaryG?.pattern || 'pola inti'} sesuai konteks pelajaran ini.`,
    },
    {
      id: 'drill-dyn-2',
      type: 'trap_detect',
      instruction: 'Spot the Edge Case: Manakah penggunaan yang paling alami dan santun?',
      options: [
        `${primaryV1.reading || primaryV1.word} です。`,
        `${primaryV1.reading || primaryV1.word} だよ (terlalu kasual untuk orang asing)`,
        `です ${primaryV1.reading || primaryV1.word} (urutan kata terbalik)`,
      ],
      correctAnswer: `${primaryV1.reading || primaryV1.word} です。`,
      explanation: 'Bahasa Jepang menempatkan kopula sopan di akhir kalimat.',
    },
  ];

  const can_do_challenge: CanDoChallenge = {
    statement: lesson.can_do_statement || 'Mampu mengaplikasikan materi pelajaran ini dalam situasi nyata.',
    situation: `Situasi komunikasi seputar tema ${unit?.theme || lesson.title_id}.`,
    promptTask: `Gunakan pola ${primaryG?.pattern || 'utama'} untuk menyatakan maksud Anda secara sopan!`,
    modelAnswer: ex1.jp,
    modelAnswerId: ex1.id,
  };

  return {
    ...lesson,
    pedagogical_framework: framework,
    dialogue,
    explanations: explanations.length > 0 ? explanations : undefined,
    drills,
    can_do_challenge,
  };
}
