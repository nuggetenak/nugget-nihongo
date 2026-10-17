// ══════════════════════════════════════════════════════════════════
//  scripts/enrich-sprint-5.js
//  Enriches lessonContentAdapter.ts with Gold-Standard Curated Lessons
//  (N5 Unit 1 Lesson 3, N5 Unit 2 Lessons 1 & 2, SSW Kaigo Unit 1 Lesson 2)
//  and adds diagnostic feedback to dynamic drills and contrastive traps.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/lib/curriculum/lessonContentAdapter.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const n5_u01_03_code = `
  // ── N5 Unit 1 Pelajaran 3: Kepemilikan & Bentuk Lampau (〜の〜 / 〜でした) ──
  'les-n5-u01-03': {
    pedagogical_framework: {
      what: {
        summary: 'Pola kepemilikan dan afiliasi dengan partikel の (no), serta predikat nominal lampau 〜でした dan sangkalan lampau 〜じゃありませんでした.',
        canDo: 'Bisa menyatakan pemilik barang ("buku saya"), asal institusi ("mahasiswa universitas mana"), dan mengonfirmasi kondisi di waktu lampau.',
        targetPatterns: ['〜の〜', '〜でした', '〜じゃありませんでした'],
        coreVocabSample: ['ほん', 'ノート', 'だいがく', 'だれ', 'きのう', 'くるま'],
      },
      sensei_context: {
        sceneIntro:
          'Di tempat kerja atau kampus, sering kali barang tertinggal di atas meja rapat atau kita ditanya mengenai organisasi asal kita di masa lalu.',
        dailyMission:
          'Mampu menjelaskan kepemilikan barang pribadi dan menyebutkan asal institusi pendidikan atau tempat kerja sebelumnya secara santun.',
        whyOrder:
          'Partikel の adalah "lem perekat" paling serbaguna dalam bahasa Jepang. Menguasai の bersama bentuk lampau でした membuka kemampuan bercerita tentang latar belakang diri.',
      },
      cultural_notes: {
        title: 'Partikel の Sebagai Penanda Keanggotaan Sosial (Uchi vs Soto)',
        etiquette:
          'Di Jepang, saat memperkenalkan diri dalam lingkungan bisnis, orang sering menyebut nama perusahaannya terlebih dahulu diikuti の baru namanya sendiri: "Toyota no Tanaka desu".',
        taboos:
          'Jangan terbalik susunannya! Di bahasa Indonesia kita mengatakan "Buku Budi" (Benda + Pemilik), sedangkan di bahasa Jepang selalu "Budi no hon" (Pemilik + の + Benda).',
      },
      pronunciation_tips: {
        title: 'Ketukan Mora Partikel の dan Bentuk Lampau',
        moraNote:
          'Partikel の diucapkan pendek dan rata dengan 1 ketukan mora (no), menyatu halus dengan kata benda di depannya.',
        soundTip:
          'Pada bentuk lampau でした (deshita), vokal "i" dilafalkan teredam ("desh-ta"), jangan dipanjangkan menjadi "de-syi-ta".',
      },
      common_pitfalls: [
        {
          title: 'Urutan Kepemilikan Terbalik (Hukum D-M Indonesia vs M-D Jepang)',
          caseScenario: 'Menerjemahkan kepemilikan sesuai susunan kata bahasa Indonesia.',
          pitfallWarning: '"ほん ブディ の" (Buku Budi no - Terbalik)',
          rightSolution: '"ブディさんの 本" (Budi-san no hon - Benar)',
          explanation:
            'Bahasa Indonesia berpola Diterangkan-Menerangkan (Buku Budi), sedangkan bahasa Jepang berpola Menerangkan-Diterangkan (Budi-san no hon).',
        },
        {
          title: 'Keterangan Lampau Berpasangan dengan Desu',
          caseScenario: 'Menyatakan keadaan kemarin namun lupa mengubah desu menjadi deshita.',
          pitfallWarning: '"きのうは あめ です。" (Kemarin hujan adalah - bukan lampau)',
          rightSolution: '"きのうは あめ でした。" (Kinou wa ame deshita - lampau)',
          explanation:
            'Keterangan waktu lampau (kemarin, minggu lalu) wajib berpasangan dengan predikat lampau でした, bukan です.',
        },
      ],
      who_and_when: {
        situational_context:
          'Menanyakan kepemilikan barang di kantor/kelas, mencari barang hilang di meja resepsionis, atau menceritakan riwayat singkat.',
        social_relations:
          'Sopan standar (Teineigo) yang berlaku umum antar rekan kerja, staf publik, dan guru.',
        when_not_to_use:
          'Jangan memakai partikel の bertumpuk lebih dari 3 kali berturut-turut dalam satu tarikan napas agar kalimat tidak membingungkan.',
      },
      scenario: {
        title: 'Buku Catatan Tertinggal di Ruang Rapat Shinjuku',
        setting: 'Ruang Rapat Perusahaan IT Tokyo',
        narrative:
          'Ken menemukan sebuah buku catatan tebal berwarna biru di atas meja dan menanyakan kepada Budi apakah itu miliknya.',
      },
    },

    dialogue: [
      {
        id: 'd1',
        speaker: 'Ken',
        speakerRole: 'Rekan Kerja Jepang',
        avatar: '👨‍💼',
        jp: 'すみません、この ノートは ブディさんのですか。',
        furigana: 'すみません、この ノートは ブディさんのですか。',
        romaji: 'Sumimasen, kono nooto wa Budi-san no desu ka.',
        idText: 'Permisi, apakah buku catatan ini milik Budi-san?',
        note: 'Menunjuk sopan ke meja',
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'いいえ、わたしのでは ありません。たなかさんのですよ。',
        furigana: 'いいえ、私のでは ありません。田中さんのですよ。',
        romaji: 'Iie, watashi no dewa arimasen. Tanaka-san no desu yo.',
        idText: 'Bukan, bukan milik saya. Itu milik Tanaka-san lho.',
      },
      {
        id: 'd3',
        speaker: 'Ken',
        speakerRole: 'Rekan Kerja Jepang',
        avatar: '👨‍💼',
        jp: 'あ、たなかさんのですね。きのう ここで かいぎが ありましたね。',
        furigana: 'あ、田中さんのですね。昨日 ここで 会議が ありましたね。',
        romaji: 'A, Tanaka-san no desu ne. Kinou koko de kaigi ga arimashita ne.',
        idText: 'Oh, milik Tanaka-san ya. Kemarin ada rapat di sini ya.',
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、きのうは とても いそがしい いちにちでした。',
        furigana: 'はい、昨日は とても 忙しい 一日でした。',
        romaji: 'Hai, kinou wa totemo isogashii ichinichi deshita.',
        idText: 'Ya, kemarin adalah hari yang sangat sibuk.',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'ほん',
        reading: 'ほん',
        romaji: 'hon',
        meaning: 'Buku',
        nuance: 'Kata umum untuk semua jenis buku fisik.',
        exampleSentence: {
          jp: 'これは にほんごの ホンです。',
          furigana: 'これは 日本語の 本です。',
          romaji: 'Kore wa nihongo no hon desu.',
          idText: 'Ini adalah buku bahasa Jepang.',
        },
      },
      {
        id: 'v2',
        word: 'ノート',
        reading: 'ノート',
        romaji: 'nooto',
        meaning: 'Buku catatan / Notebook',
        nuance: 'Berasal dari serapan bahasa Inggris "notebook".',
        exampleSentence: {
          jp: 'それは わたしの ノートです。',
          furigana: 'それは 私の ノートです。',
          romaji: 'Sore wa watashi no nooto desu.',
          idText: 'Itu adalah buku catatan saya.',
        },
      },
      {
        id: 'v3',
        word: 'だれ',
        reading: 'だれ',
        romaji: 'dare',
        meaning: 'Siapa (kata tanya orang)',
        nuance: 'Ragam sopannya adalah どなた (donata).',
        exampleSentence: {
          jp: 'これは だれの かさですか。',
          furigana: 'これは 誰の 傘ですか。',
          romaji: 'Kore wa dare no kasa desu ka.',
          idText: 'Ini payung milik siapa?',
        },
      },
      {
        id: 'v4',
        word: 'きのう',
        reading: 'きのう',
        romaji: 'kinou',
        meaning: 'Kemarin (waktu lampau)',
        nuance: 'Wajib dipasangkan dengan predikat bentuk lampau でした.',
        exampleSentence: {
          jp: 'きのうは やすみでした。',
          furigana: '昨日は 休みでした。',
          romaji: 'Kinou wa yasumi deshita.',
          idText: 'Kemarin adalah hari libur.',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00003',
        title: 'Partikel Kepemilikan & Afiliasi: 〜の',
        formula: '[Pemilik/Institusi] + の + [Kata Benda]',
        meaning: 'Menyatakan bahwa benda kedua dimiliki atau terhubung dengan entitas pertama.',
        nuanceNotes: 'Susunannya selalu Pemilik di depan, Benda di belakang.',
        examples: [
          {
            jp: 'これは わたしの ペンです。',
            furigana: 'これは 私の ペンです。',
            romaji: 'Kore wa watashi no pen desu.',
            idText: 'Ini adalah pulpen milik saya.',
          },
        ],
      },
      {
        id: 'exp2',
        grammarId: 'gn5-00005',
        title: 'Predikat Nominal Lampau: 〜でした / 〜じゃありませんでした',
        formula: '[Kata Benda] + でした / じゃ ありませんでした',
        meaning: 'Menyatakan status atau kondisi yang terjadi di masa lalu.',
        nuanceNotes: 'Bentuk lampau positif adalah でした, sedangkan lampau negatif adalah じゃありませんでした.',
        examples: [
          {
            jp: 'きのうは にちようびでした。',
            furigana: '昨日は 日曜日でした。',
            romaji: 'Kinou wa nichiyoubi deshita.',
            idText: 'Kemarin adalah hari Minggu.',
          },
        ],
      },
    ],

    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah arti dari kata tanya "だれ (dare)"?',
        options: ['Siapa', 'Kapan', 'Di mana', 'Berapa'],
        correctAnswer: 'Siapa',
        explanation: 'だれ (dare) berarti siapa.',
        diagnosticFeedback: {
          'Kapan': 'Kapan dalam bahasa Jepang adalah いつ (itsu).',
          'Di mana': 'Di mana dalam bahasa Jepang adalah どこ (doko).',
          'Berapa': 'Berapa adalah いくら / いくつ.',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Partikel): Lengkapi partikel kepemilikan berikut: "Ini buku milik Budi-san"',
        sentencePrompt: 'これは ブディさん_____ ほんです。',
        options: ['の', 'は', 'を', 'に'],
        correctAnswer: 'の',
        explanation: 'Partikel の menghubungkan pemilik (Budi-san) dengan bendanya (hon).',
        diagnosticFeedback: {
          'は': 'Partikel は adalah penanda topik, bukan penanda kepemilikan kata benda.',
          'を': 'Partikel を menandai objek kata kerja tindakan.',
          'に': 'Partikel に menandai tujuan atau titik waktu.',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun kalimat berikut: "Buku catatan milik saya"',
        tokens: ['ノート', 'の', 'わたし'],
        correctOrder: ['わたし', 'の', 'ノート'],
        correctAnswer: 'わたし の ノート',
        explanation: 'Pemilik (watashi) + partikel (no) + benda (nooto).',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah susunan kalimat lampau yang SALAH?',
        options: [
          'きのうは あめ です。',
          'きのうは あめ でした。',
          'おとといは やすみでした。',
        ],
        correctAnswer: 'きのうは あめ です。',
        explanation:
          'Keterangan waktu lampau "きのう" wajib berpasangan dengan predikat lampau "でした", bukan "です".',
        diagnosticFeedback: {
          'きのうは あめ でした。': 'Kalimat ini benar karena memakai predikat lampau でした.',
          'おとといは やすみでした。': 'Kalimat ini benar karena おととい (kemarin lusa) berpasangan dengan でした.',
        },
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Seseorang bertanya: "これは あなたの ノートですか。". Jika itu milik Tanaka, apa respons Anda?',
        options: [
          'いいえ、わたしのでは ありません。たなかさんのです。',
          'はい、たなかさんのです。',
          'いいえ、ノートです。',
          'たなかさんは ノートです。',
        ],
        correctAnswer: 'いいえ、わたしのでは ありません。たなかさんのです。',
        explanation: 'Menyangkal kepemilikan pribadi lalu menegaskan pemilik sebenarnya secara santun.',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu menjelaskan kepemilikan benda dan menyatakan peristiwa di masa lampau.',
      situation: 'Rekan kerja menemukan payung tertinggal dan menanyakan apakah itu milik Anda.',
      promptTask: 'Katakan bahwa itu bukan milik Anda, melainkan milik Tanaka-san!',
      modelAnswer: 'いいえ、わたしのでは ありません。たなかさんのです。',
      modelAnswerId: 'Iie, watashi no dewa arimasen. Tanaka-san no desu.',
      culturalEtiquette: 'Ucapkan dengan ramah dan tunjuk ke arah pemilik yang bersangkutan bila ada di ruangan.',
      skillUnlocked: [
        'Menguasai partikel kepemilikan 〜の',
        'Menguasai bentuk lampau nominal 〜でした',
      ],
      pocketSummary: {
        keyFormula: '[Pemilik] の [Benda] / [Waktu Lampau] は [Nomina] でした',
        coreWords: ['ほん (Buku)', 'だれ (Siapa)', 'きのう (Kemarin)'],
        coreWarning: 'Pemilik selalu di depan partikel の, jangan terbalik!',
        quickDialogue: 'A: だれの ノートですか？ → B: わたしのです。',
      },
    },

    pocket_summary: {
      keyFormula: '[Pemilik] の [Benda] / [Waktu Lampau] は [Nomina] でした',
      coreWords: ['ほん (Buku)', 'だれ (Siapa)', 'きのう (Kemarin)'],
      coreWarning: 'Pemilik selalu di depan partikel の, jangan terbalik!',
      quickDialogue: 'A: だれの ノートですか？ → B: わたしのです。',
    },
  },

  // ── N5 Unit 2 Pelajaran 1: Menunjuk Benda di Sekitar (これ / それ / あれ / どれ) ──
  'les-n5-u02-01': {
    pedagogical_framework: {
      what: {
        summary: 'Pola kata tunjuk benda mandiri これ (dekat pembicara), それ (dekat lawan bicara), あれ (jauh dari keduanya), dan kata tanya どれ (yang mana).',
        canDo: 'Bisa menunjuk dan menanyakan nama benda di sekitar dalam ruang kerja, toko, atau kelas secara tepat posisi.',
        targetPatterns: ['これは〜です', 'それは〜ですか', 'あれは〜です', 'どれですか'],
        coreVocabSample: ['これ', 'それ', 'あれ', 'どれ', 'ペン', 'かぎ', 'とけい', 'なん'],
      },
      sensei_context: {
        sceneIntro:
          'Saat berbelanja di minimarket Jepang atau meminta tolong mengambilkan barang di kantor, kamu perlu menunjuk barang dengan tepat berdasarkan jarak posisi.',
        dailyMission:
          'Mampu menunjuk barang yang ada di dekatmu (Kore), dekat temanmu (Sore), dan yang berada jauh dari kalian berdua (Are).',
        whyOrder:
          'Sistem kata tunjuk Ko-So-A-Do adalah pilar spasial bahasa Jepang yang teratur. Menguasai 4 koordinat dasar ini membuatmu bisa bertanya nama benda apa pun.',
      },
      cultural_notes: {
        title: 'Etika Menunjuk Benda di Jepang',
        etiquette:
          'Saat menunjuk barang di tempat umum atau toko, arahkan telapak tangan terbuka dengan jari rapat ke arah barang (Tenohira), bukan dengan telunjuk mengacung tunggal yang dianggap kasar.',
        taboos:
          'Jangan pernah menunjuk orang menggunakan kata "Kore" atau "Are"! Untuk orang, gunakan kata sopan "Kochira" atau "Achira".',
      },
      pronunciation_tips: {
        title: 'Intonasi Ko-So-A-Do',
        moraNote:
          'Setiap kata memiliki 2 ketukan mora rata: ko-re, so-re, a-re, do-re.',
        soundTip:
          'Ucapkan "Kore wa nan desu ka?" dengan penekanan wajar pada kata tanya "nan".',
      },
      common_pitfalls: [
        {
          title: 'Tertukar Kore dan Sore Berdasarkan Perspektif Rekan Bicara',
          caseScenario: 'Menunjuk barang yang dipegang lawan bicara dengan berkata Kore.',
          pitfallWarning: 'Menunjuk barang di tangan teman sambil berkata "Kore wa...".',
          rightSolution: 'Barang di tangan lawan bicara wajib disebut "Sore wa...".',
          explanation:
            'Kore hanya untuk benda di zona pembicara. Jika benda berada di tangan atau meja rekan bicara, gunakan Sore!',
        },
        {
          title: 'Menempelkan Kata Benda Langsung Setelah Kore',
          caseScenario: 'Mencoba membuat kalimat "Buku ini" dengan Kore Hon.',
          pitfallWarning: '"これ 本は わたしのです。" (Kore hon wa...)',
          rightSolution: '"この 本は わたしのです。" (Kono hon wa...) atau "これは わたしの 本です。"',
          explanation:
            'Kore adalah kata ganti mandiri (pronomina) yang diikuti partikel は, tidak boleh langsung menempel pada kata benda.',
        },
      ],
      who_and_when: {
        situational_context:
          'Berbelanja di minimarket/toko buku, meminjam alat tulis di kantor, mengidentifikasi dokumen di meja kerja.',
        social_relations:
          'Ragam sopan standar (Teineigo) yang aman digunakan kepada siapa pun.',
        when_not_to_use:
          'Jangan gunakan untuk menunjuk manusia atau atasan kerja.',
      },
      scenario: {
        title: 'Membeli Alat Tulis di Toko Buku Tokyo',
        setting: 'Toko Alat Tulis Maruzen Ginza',
        narrative:
          'Budi sedang memilih buku kamus dan menanyakan jenis produk kepada pramuniaga toko.',
      },
    },

    dialogue: [
      {
        id: 'd1',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'すみません、これは 日本語の じしょですか。',
        furigana: 'すみません、これは 日本語の 辞書ですか。',
        romaji: 'Sumimasen, kore wa Nihongo no jisho desu ka.',
        idText: 'Permisi, apakah ini kamus bahasa Jepang?',
      },
      {
        id: 'd2',
        speaker: 'Tenin',
        speakerRole: 'Pramuniaga Toko',
        avatar: '🧑‍💼',
        jp: 'はい、それは 初級の 日本語辞典です。',
        furigana: 'はい、それは 初級の 日本語辞典です。',
        romaji: 'Hai, sore wa shokyuu no Nihongo jiten desu.',
        idText: 'Ya, itu adalah kamus bahasa Jepang tingkat dasar.',
      },
      {
        id: 'd3',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'あそこに ある あれは 何ですか。',
        furigana: 'あそこに ある あれは 何ですか。',
        romaji: 'Asoko ni aru are wa nan desu ka.',
        idText: 'Yang ada di sebelah sana itu apa?',
      },
      {
        id: 'd4',
        speaker: 'Tenin',
        speakerRole: 'Pramuniaga Toko',
        avatar: '🧑‍💼',
        jp: 'あれは 漢字練習帳です。とても 人気がありますよ。',
        furigana: 'あれは 漢字練習帳です。とても 人気がありますよ。',
        romaji: 'Are wa Kanji renshuuchou desu. Totemo ninki ga arimasu yo.',
        idText: 'Itu adalah buku latihan Kanji. Sangat populer lho.',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'これ',
        reading: 'これ',
        romaji: 'kore',
        meaning: 'Ini (benda dekat pembicara)',
        nuance: 'Digunakan untuk barang yang berada dalam jangkauan tangan pembicara.',
        exampleSentence: {
          jp: 'これは ペンです。',
          furigana: 'これは ペンです。',
          romaji: 'Kore wa pen desu.',
          idText: 'Ini adalah pulpen.',
        },
      },
      {
        id: 'v2',
        word: 'それ',
        reading: 'それ',
        romaji: 'sore',
        meaning: 'Itu (benda dekat lawan bicara)',
        nuance: 'Digunakan untuk barang yang berada dekat lawan bicara.',
        exampleSentence: {
          jp: 'それは じしょです。',
          furigana: 'それは 辞書です。',
          romaji: 'Sore wa jisho desu.',
          idText: 'Itu adalah kamus.',
        },
      },
      {
        id: 'v3',
        word: 'あれ',
        reading: 'あれ',
        romaji: 'are',
        meaning: 'Itu (jauh dari keduanya)',
        nuance: 'Digunakan untuk barang yang posisinya jauh dari pembicara dan lawan bicara.',
        exampleSentence: {
          jp: 'あれは くるまです。',
          furigana: 'あれは 車です。',
          romaji: 'Are wa kuruma desu.',
          idText: 'Itu adalah mobil.',
        },
      },
      {
        id: 'v4',
        word: 'なん',
        reading: 'なん / なに',
        romaji: 'nan / nani',
        meaning: 'Apa (kata tanya)',
        nuance: 'Biasa dipadukan dengan ですか menjadi "Nan desu ka?".',
        exampleSentence: {
          jp: 'これは なんですか。',
          furigana: 'これは 何ですか。',
          romaji: 'Kore wa nan desu ka.',
          idText: 'Ini apa?',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00007',
        title: 'Kata Tunjuk Mandiri: これ / それ / あれ',
        formula: 'これ / それ / あれ + は + [Kata Benda] + です',
        meaning: 'Menunjuk benda berdasarkan 3 zona jarak relatif dari pembicara dan lawan bicara.',
        nuanceNotes: 'Kore = dekat saya, Sore = dekat kamu, Are = jauh di sana.',
        examples: [
          {
            jp: 'これは わたしのかぎです。',
            furigana: 'これは 私の鍵です。',
            romaji: 'Kore wa watashi no kagi desu.',
            idText: 'Ini adalah kunci saya.',
          },
        ],
      },
      {
        id: 'exp2',
        grammarId: 'gn5-00008',
        title: 'Kata Tanya Benda: どれ & 何 (なん)',
        formula: 'これは なん ですか / どれ ですか',
        meaning: 'Menanyakan identitas benda atau memilih opsi dari kelompok barang.',
        nuanceNotes: 'Gunakan "Nan desu ka" untuk menanyakan nama benda, dan "Dore" untuk memilih satu dari beberapa opsi.',
        examples: [
          {
            jp: 'あなたの かさは どれですか。',
            furigana: 'あなたの 傘は どれですか。',
            romaji: 'Anata no kasa wa dore desu ka.',
            idText: 'Payung milik Anda yang mana?',
          },
        ],
      },
    ],

    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Jika barang berada di dekat lawan bicara Anda, kata tunjuk apa yang tepat?',
        options: ['それ (Sore)', 'これ (Kore)', 'あれ (Are)', 'どれ (Dore)'],
        correctAnswer: 'それ (Sore)',
        explanation: 'Sore digunakan untuk barang yang posisinya berada di area lawan bicara.',
        diagnosticFeedback: {
          'これ (Kore)': 'Kore untuk benda di dekat Anda (pembicara), bukan di dekat teman bicara.',
          'あれ (Are)': 'Are untuk benda yang jauh dari Anda berdua.',
          'どれ (Dore)': 'Dore adalah kata tanya ("yang mana").',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Kata): Lengkapi pertanyaan: "Ini apa?"',
        sentencePrompt: 'これは _____ ですか。',
        options: ['なん', 'だれ', 'どこ', 'いつ'],
        correctAnswer: 'なん',
        explanation: 'Nan (apa) digunakan untuk menanyakan benda.',
        diagnosticFeedback: {
          'だれ': 'Dare untuk menanyakan orang (siapa).',
          'どこ': 'Doko untuk menanyakan tempat (di mana).',
          'いつ': 'Itsu untuk menanyakan waktu (kapan).',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun: "Itu adalah kamus"',
        tokens: ['じしょ', 'です', 'それは'],
        correctOrder: ['それは', 'じしょ', 'です'],
        correctAnswer: 'それは じしょ です',
        explanation: 'Sore wa (topik) + jisho (predikat) + desu.',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah susunan kalimat yang SALAH?',
        options: [
          'これ ほんは わたしのです。',
          'これは わたしの ほんです。',
          'あれは くるまです。',
        ],
        correctAnswer: 'これ ほんは わたしのです。',
        explanation:
          'Kore tidak boleh langsung menempel di depan kata benda! Harus menjadi "Kono hon" atau "Kore wa hon desu".',
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Nyata): Rekan kerja menunjuk buku di dekat Anda dan bertanya: "それは なんですか。". Bagaimana jawaban awal Anda?',
        options: [
          'これは にほんごの ほんです。',
          'それは にほんごの ほんです。',
          'あれは にほんごの ほんですどれ。',
          'だれ ですか。',
        ],
        correctAnswer: 'これは にほんごの ほんです。',
        explanation: 'Karena barang berada di dekat Anda, saat menjawab Anda menyebutnya "Kore".',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu menunjuk dan menanyakan nama barang di sekitar menggunakan Kore, Sore, Are.',
      situation: 'Anda sedang berada di kantor dan ingin menanyakan nama dokumen di atas meja rekan kerja.',
      promptTask: 'Tunjuk dokumen di meja rekan kerja dan tanyakan itu apa!',
      modelAnswer: 'すみません、それは 何の しょるいですか。',
      modelAnswerId: 'Sumimasen, sore wa nan no shorui desu ka.',
      culturalEtiquette: 'Tunjuk dengan telapak tangan terbuka menghadap ke atas, hindari mengacungkan jari telunjuk tunggal.',
      skillUnlocked: [
        'Bisa membedakan zona jarak Kore / Sore / Are',
        'Bisa bertanya nama barang dengan 何ですか',
      ],
      pocketSummary: {
        keyFormula: 'これ (Dekat saya) / それ (Dekat kamu) / あれ (Jauh) + は [Nomina] です',
        coreWords: ['これ (Ini)', 'それ (Itu)', 'あれ (Itu jauh)', 'なん (Apa)'],
        coreWarning: 'Jangan gunakan Kore/Are untuk menunjuk orang!',
        quickDialogue: 'A: これは なんですか？ → B: それは じしょです。',
      },
    },

    pocket_summary: {
      keyFormula: 'これ (Dekat saya) / それ (Dekat kamu) / あれ (Jauh) + は [Nomina] です',
      coreWords: ['これ (Ini)', 'それ (Itu)', 'あれ (Itu jauh)', 'なん (Apa)'],
      coreWarning: 'Jangan gunakan Kore/Are untuk menunjuk orang!',
      quickDialogue: 'A: これは なんですか？ → B: それは じしょです。',
    },
  },

  // ── N5 Unit 2 Pelajaran 2: Karakteristik & Konfirmasi (この / その / あの / どの + Nomina) ──
  'les-n5-u02-02': {
    pedagogical_framework: {
      what: {
        summary: 'Pola kata penunjuk atributif この / その / あの / どの yang wajib langsung menempel di depan kata benda.',
        canDo: 'Bisa merinci barang spesifik ("buku yang ini", "payung yang itu") dan menanyakan pilihan spesifik di antara banyak opsi.',
        targetPatterns: ['この [Nomina] は〜です', 'その [Nomina]', 'あの [Nomina]', 'どの [Nomina] ですか'],
        coreVocabSample: ['この', 'その', 'あの', 'どの', 'かばん', 'かさ', 'ひと', 'いくら'],
      },
      sensei_context: {
        sceneIntro:
          'Ketika ada banyak barang sejenis berjejer di etalase toko atau gantungan payung, kita harus menyebutkan secara spesifik: "Payung yang mana milikmu?".',
        dailyMission:
          'Mampu menggunakan pasangan Kono/Sono/Ano/Dono bersama kata benda secara tepat untuk memilih atau mendeskripsikan barang.',
        whyOrder:
          'Setelah menguasai Kore/Sore/Are mandiri, otakmu siap membedakan bentuk atributif Kono/Sono/Ano yang langsung memodifikasi kata benda di depannya.',
      },
      cultural_notes: {
        title: 'Menunjuk Orang Secara Halus dengan Ano Hito / Ano Kata',
        etiquette:
          'Jika menunjuk seseorang yang posisinya agak jauh, sebutlah "Ano kata" (ragam sangat hormat) atau "Ano hito" (ragam netral). Jangan pernah menunjuk dengan jari!',
        taboos:
          'Pantang membiarkan kata "Kono" berdiri sendiri tanpa kata benda (misal: "Kono wa ikura desu ka?" adalah salah fatal!).',
      },
      pronunciation_tips: {
        title: 'Ritme Bunyi Kono / Sono / Ano',
        moraNote:
          'Kono, Sono, Ano, Dono mengalir langsung ke kata benda berikutnya tanpa jeda nafas yang canggung.',
        soundTip:
          'Ucapkan "Kono kaban" laksana satu kesatuan frasa yang harmonis.',
      },
      common_pitfalls: [
        {
          title: 'Tertukar Penggunaan Kore vs Kono',
          caseScenario: 'Memakai Kono sendirian diikuti partikel wa.',
          pitfallWarning: '"このは わたしの ペンです。" (Kono wa...)',
          rightSolution: '"これは わたしの ペンです。" atau "この ペンは わたしのです。"',
          explanation:
            'Kono WAJIB diikuti kata benda ("kono pen"). Kore berdiri mandiri diikuti partikel ("kore wa").',
        },
        {
          title: 'Menanyakan Pilihan Menggunakan Dore Nomina',
          caseScenario: 'Ingin bertanya "Tas yang mana" tetapi memakai Dore Kaban.',
          pitfallWarning: '"どれ かばんが あなたのですか。"',
          rightSolution: '"どの かばんが あなたのですか。"',
          explanation:
            'Di depan kata benda, kata tanyanya adalah どの (Dono), bukan どれ (Dore).',
        },
      ],
      who_and_when: {
        situational_context:
          'Memilih produk spesifik di toko pakaian/elektronik, mengambil payung di tempat penitipan, mengenali orang di foto.',
        social_relations:
          'Sopan standar (Teineigo) untuk percakapan transaksi dan sosial.',
        when_not_to_use:
          'Jangan gunakan Kono/Sono sendirian tanpa kata benda.',
      },
      scenario: {
        title: 'Mengambil Payung di Rak Penitipan Restoran Tokyo',
        setting: 'Pintu Masuk Restoran Ramen Shibuya',
        narrative:
          'Setelah selesai makan siang saat hujan deras, Budi mencari payungnya di rak penitipan bersama pelayan restoran.',
      },
    },

    dialogue: [
      {
        id: 'd1',
        speaker: 'Pelayan',
        speakerRole: 'Staf Restoran',
        avatar: '🧑‍🍳',
        jp: 'お客様、どの傘が お客様のですか。',
        furigana: 'お客様、どの傘が お客様のですか。',
        romaji: 'Okyaku-sama, dono kasa ga okyaku-sama no desu ka.',
        idText: 'Tuan pelanggan, payung yang mana milik Anda?',
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'その 青い傘が 私のです。',
        furigana: 'その 青い傘が 私のです。',
        romaji: 'Sono aoi kasa ga watashi no desu.',
        idText: 'Payung yang biru itu milik saya.',
      },
      {
        id: 'd3',
        speaker: 'Pelayan',
        speakerRole: 'Staf Restoran',
        avatar: '🧑‍🍳',
        jp: 'こちらですね。どうぞ、お忘れ物の ないように。',
        furigana: 'こちらですね。どうぞ、お忘れ物の ないように。',
        romaji: 'Kochira desu ne. Douzo, owasuremono no nai you ni.',
        idText: 'Yang ini ya. Silakan, semoga tidak ada barang tertinggal.',
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ありがとうございます。助かりました。',
        furigana: 'ありがとうございます。助かりました。',
        romaji: 'Arigatou gozaimasu. Tasakarimashita.',
        idText: 'Terima kasih banyak. Sangat membantu.',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'この',
        reading: 'この',
        romaji: 'kono',
        meaning: '... ini (wajib diikuti kata benda)',
        nuance: 'Menempel langsung di depan kata benda yang berada di dekat pembicara.',
        exampleSentence: {
          jp: 'この かばんは わたしのです。',
          furigana: 'この 鞄は 私のです。',
          romaji: 'Kono kaban wa watashi no desu.',
          idText: 'Tas ini adalah milik saya.',
        },
      },
      {
        id: 'v2',
        word: 'その',
        reading: 'その',
        romaji: 'sono',
        meaning: '... itu (wajib diikuti kata benda)',
        nuance: 'Menempel di depan kata benda yang berada di dekat lawan bicara.',
        exampleSentence: {
          jp: 'その かさを ください。',
          furigana: 'その 傘を ください。',
          romaji: 'Sono kasa wo kudasai.',
          idText: 'Tolong berikan payung itu.',
        },
      },
      {
        id: 'v3',
        word: 'あの',
        reading: 'あの',
        romaji: 'ano',
        meaning: '... itu jauh (wajib diikuti kata benda)',
        nuance: 'Menempel di depan kata benda yang jauh dari kedua pembicara.',
        exampleSentence: {
          jp: 'あの ひとは だれですか。',
          furigana: 'あの 人は 誰ですか。',
          romaji: 'Ano hito wa dare desu ka.',
          idText: 'Orang di sebelah sana itu siapa?',
        },
      },
      {
        id: 'v4',
        word: 'どの',
        reading: 'どの',
        romaji: 'dono',
        meaning: '... yang mana (kata tanya penentu)',
        nuance: 'Wajib diikuti kata benda saat memilih dari sekumpulan opsi.',
        exampleSentence: {
          jp: 'どの シャツが いいですか。',
          furigana: 'どの シャツが いいですか。',
          romaji: 'Dono shatsu ga ii desu ka.',
          idText: 'Kemeja yang mana yang bagus?',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00009',
        title: 'Kata Penunjuk Atributif: この / その / あの + Nomina',
        formula: 'この / その / あの + [Kata Benda] + は〜です',
        meaning: 'Merinci benda spesifik yang sedang dibicarakan.',
        nuanceNotes: 'Wajib langsung menempel di depan kata benda tanpa partikel perantara.',
        examples: [
          {
            jp: 'この ペンは 100えんです。',
            furigana: 'この ペンは 100円です。',
            romaji: 'Kono pen wa hyaku-en desu.',
            idText: 'Pulpen ini harganya 100 yen.',
          },
        ],
      },
      {
        id: 'exp2',
        grammarId: 'gn5-00010',
        title: 'Menanyakan Opsi Spesifik: どの + Nomina',
        formula: 'どの + [Kata Benda] + が〜ですか',
        meaning: 'Menanyakan pilihan di antara 3 benda atau lebih.',
        nuanceNotes: 'Kata tanya どの di posisi subjek biasanya dipasangkan dengan partikel が.',
        examples: [
          {
            jp: 'どの かばんが あなたのですか。',
            furigana: 'どの 鞄が あなたのですか。',
            romaji: 'Dono kaban ga anata no desu ka.',
            idText: 'Tas yang mana yang merupakan milik Anda?',
          },
        ],
      },
    ],

    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Jika ingin mengatakan "Buku ini" dalam bahasa Jepang, manakah padanan yang benar?',
        options: ['この ほん (Kono hon)', 'これ ほん (Kore hon)', 'その ほん (Sono hon)', 'どれ ほん (Dore hon)'],
        correctAnswer: 'この ほん (Kono hon)',
        explanation: 'Kata tunjuk yang menempel langsung ke kata benda adalah この (kono).',
        diagnosticFeedback: {
          'これ ほん (Kore hon)': 'Kore tidak boleh menempel langsung ke kata benda.',
          'その ほん (Sono hon)': 'Sono hon berarti "buku itu", bukan "buku ini".',
          'どれ ほん (Dore hon)': 'Dore tidak menempel ke kata benda (gunakan dono).',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Kata): Lengkapi kalimat: "Payung yang mana milik Anda?"',
        sentencePrompt: '_____ かさが あなたの ですか。',
        options: ['どの', 'どれ', 'なに', 'どこ'],
        correctAnswer: 'どの',
        explanation: 'Di depan kata benda kasa (payung), kata tanyanya adalah どの (dono).',
        diagnosticFeedback: {
          'どれ': 'Dore berdiri mandiri dan tidak menempel di depan kata benda.',
          'なに': 'Nani berarti apa, bukan penentu "yang mana".',
          'どこ': 'Doko menanyakan lokasi (di mana).',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun: "Payung itu milik saya"',
        tokens: ['その', 'わたしのです', 'かさは'],
        correctOrder: ['その', 'かさは', 'わたしのです'],
        correctAnswer: 'その かさは わたしのです',
        explanation: 'Sono kasa wa (topik spesifik) + watashi no desu (predikat).',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah penggunaan kata tunjuk yang SALAH?',
        options: [
          'このは 100円です。',
          'この ペンは 100円です。',
          'これは 100円です。',
        ],
        correctAnswer: 'このは 100円です。',
        explanation:
          'Kono tidak boleh berdiri sendiri tanpa kata benda! Gunakan "Kore wa 100-en desu" atau "Kono pen wa 100-en desu".',
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Nyata): Seseorang bertanya: "どの かばんが あなたのですか。". Menunjuk tas hitam di dekat Anda, apa respons terbaik?',
        options: [
          'この くろい かばんが わたしのです。',
          'これ かばんが わたしのです。',
          'どこ ですか。',
          'どの かばんです。',
        ],
        correctAnswer: 'この くろい かばんが わたしのです。',
        explanation: 'Menegaskan tas hitam di dekat pembicara dengan pola "Kono kuroi kaban ga watashi no desu".',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu mendeskripsikan dan memilih barang spesifik menggunakan Kono, Sono, Ano, Dono + Kata Benda.',
      situation: 'Anda sedang berada di kasir toko dan ingin menunjuk tas spesifik yang ingin dibeli.',
      promptTask: 'Katakan bahwa Anda menginginkan tas yang berwarna biru itu!',
      modelAnswer: 'すみません、その 青い かばんを ください。',
      modelAnswerId: 'Sumimasen, sono aoi kaban wo kudasai.',
      culturalEtiquette: 'Ucapkan dengan jelas sambil menunjuk dengan telapak tangan terbuka.',
      skillUnlocked: [
        'Menguasai atributif この / その / あの + Nomina',
        'Menguasai kata tanya selektif どの + Nomina',
      ],
      pocketSummary: {
        keyFormula: 'この / その / あの / どの + [Kata Benda]',
        coreWords: ['この (Ini...)', 'その (Itu...)', 'あの (Itu jauh...)', 'どの (Yang mana...)'],
        coreWarning: 'Kono/Sono/Ano/Dono WAJIB menempel pada kata benda!',
        quickDialogue: 'A: どの かさですか？ → B: その あおい かさです。',
      },
    },

    pocket_summary: {
      keyFormula: 'この / その / あの / どの + [Kata Benda]',
      coreWords: ['この (Ini...)', 'その (Itu...)', 'あの (Itu jauh...)', 'どの (Yang mana...)'],
      coreWarning: 'Kono/Sono/Ano/Dono WAJIB menempel pada kata benda!',
      quickDialogue: 'A: どの かさですか？ → B: その あおい かさです。',
    },
  },
`;

const kaigo_u01_02_code = `
  // ── SSW Kaigo Unit 1 Pelajaran 2: Tanggap Darurat & Laporan SBAR (K3 Gemba) ──
  'les-ssw-kaigo-u01-02': {
    pedagogical_framework: {
      what: {
        summary: 'Prosedur tanggap darurat K3 gemba panti wreda: konfirmasi kesadaran lansia terjatuh, proteksi leher/tulang belakang, dan pelaporan verbal ringkas terstruktur (SBAR: Situation, Background, Assessment, Recommendation).',
        canDo: 'Bisa merespons lansia terjatuh di kamar tidur/koridor, tidak memindahkan sembarangan, dan melapor segera ke perawat pimpinan (Riidaa) dengan pola terstandar.',
        targetPatterns: ['〜大変です！', '〜が倒れています', '〜意識があります/ありません', '〜確認をお願いします'],
        coreVocabSample: ['てんとう', 'いしき', 'こきゅう', 'けが', 'しゅっけつ', 'リーダー'],
      },
      sensei_context: {
        sceneIntro:
          'Di fasilitas Kaigo, insiden jatuh (Tentou) adalah keadaan darurat nomor satu. Panik dan mengangkat korban sembarangan bisa memicu fraktur tulang leher atau kelumpuhan saraf permanen.',
        dailyMission:
          'Mampu berseru tenang memanggil bantuan dan melaporkan kondisi kesadaran lansia secara akurat dalam hitungan detik.',
        whyOrder:
          'Protokol darurat K3 adalah syarat mutlak kelulusan ujian SSW Kaigo dan perlindungan hukum bagi perawat asing di Jepang.',
      },
      cultural_notes: {
        title: 'Pantangan Memindahkan Tubuh Lansia yang Terjatuh',
        etiquette:
          'Saat melihat lansia terjatuh di lantai, JANGAN LANGSUNG MEMBANGUNKAN atau MENARIK TANGANNYA! Berlututlah, periksa kesadaran dengan menepuk bahu lembut dan menyapa namanya: "Yamada-sama, daijoubu desu ka?".',
        taboos:
          'Dilarang keras merahasiakan insiden jatuh meskipun lansia mengaku "tidak apa-apa", karena pendarahan intrakranial bisa terjadi beberapa jam kemudian (Kyoumakuka kesshu).',
      },
      pronunciation_tips: {
        title: 'Artikulasi Laporan K3 Darurat',
        moraNote:
          'Ucapkan laporan darurat dengan suara lantang, artikulasi tajam, dan tempo stabil agar terdengar jelas di seluruh lorong stasiun perawat.',
        soundTip:
          'Tekankan kata "Tentou" (te-n-to-u) dan nomor kamar dengan ketukan jelas.',
      },
      common_pitfalls: [
        {
          title: 'Langsung Membopong Korban Tanpa Cek Leher/Kepala',
          caseScenario: 'Menarik tubuh korban untuk segera duduk atau berdiri di tempat tidur.',
          pitfallWarning: 'Menarik tangan atau membopong lansia yang baru saja jatuh tergeletak.',
          rightSolution: 'Pertahankan posisi tidur, stabilkan kepala, dan segera panggil perawat penanggung jawab (Leader).',
          explanation:
            'Fraktur leher atau panggul sangat rapuh pada lansia osteoporosis. Memindahkan tanpa instruksi medis berisiko fatal.',
        },
        {
          title: 'Melapor dengan Emosi Panik Tanpa Fakta Terstruktur',
          caseScenario: 'Melapor dengan teriakan tidak jelas tanpa data medis dasar.',
          pitfallWarning: '"Aduh Sensei, tolong kakek jatuh gawat sekali!"',
          rightSolution: '"リーダー、203号室で山田様が転倒されました！意識は清明、頭部に出血はありません！"',
          explanation:
            'Komunikasi darurat medis Jepang menuntut formula terstruktur: Siapa + Di mana + Kondisi Kesadaran + Ada Pendarahan atau Tidak.',
        },
      ],
      who_and_when: {
        situational_context:
          'Kejadian darurat K3 saat patroli kamar atau pergantian shift jaga malam (Yakin).',
        social_relations:
          'Perawat SSW (Kaigoshoku) kepada Kaigo Leader / Perawat Medis (Kangoshi) dengan urgensi tinggi.',
        when_not_to_use:
          'Jangan gunakan bahasa santai (Tameguchi) atau berbisik-bisik saat panggilan darurat.',
      },
      scenario: {
        title: 'Insiden Terpeleset di Samping Ranjang Kamar 203',
        setting: 'Lantai 2 Panti Wreda Sakura En, Kamar Residen Yamada-sama',
        narrative:
          'Saat patroli pagi pukul 07.15, Siti mendapati Yamada-sama tergeletak di samping tempat tidur dekat pintu kamar mandi.',
      },
    },

    dialogue: [
      {
        id: 'd1',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: '山田様！大丈夫ですか！私の声が聞こえますか！',
        furigana: '山田様！大丈夫ですか！私の声が聞こえますか！',
        romaji: 'Yamada-sama! Daijoubu desu ka! Watashi no koe ga kikoemasu ka!',
        idText: 'Yamada-sama! Apakah Anda tidak apa-apa! Bisakah Anda mendengar suara saya!',
        note: 'Berlutut dan menepuk bahu lembut',
      },
      {
        id: 'd2',
        speaker: 'Yamada',
        speakerRole: 'Residen Lansia',
        avatar: '👴',
        jp: 'うう… 足が滑って… 腰が痛いよ…',
        furigana: 'うう… 足が滑って… 腰が痛いよ…',
        romaji: 'Uu... ashi ga subette... koshi ga itai yo...',
        idText: 'Uu... kaki saya tergelincir... pinggang saya sakit...',
      },
      {
        id: 'd3',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: '動かないでくださいね。今リーダーを呼びますから！',
        furigana: '動かないでくださいね。今リーダーを呼びますから！',
        romaji: 'Ugokanaide kudasai ne. Ima riidaa wo yobimasu kara!',
        idText: 'Tolong jangan bergerak ya. Saya akan memanggil Leader sekarang!',
      },
      {
        id: 'd4',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: 'リーダー、大変です！203号室で山田様が転倒されました！',
        furigana: 'リーダー、大変です！203号室で山田様が転倒されました！',
        romaji: 'Riidaa, taihen desu! Ni-maru-san goushitsu de Yamada-sama ga tentou saremashita!',
        idText: 'Leader, darurat! Di kamar 203 Yamada-sama terjatuh!',
        note: 'Berbicara lantang dan tegas via interkom',
      },
      {
        id: 'd5',
        speaker: 'Leader',
        speakerRole: 'Perawat Penanggung Jawab',
        avatar: '🧑‍⚕️',
        jp: '意識と呼吸はどうですか！出血はありますか！',
        furigana: '意識と呼吸はどうですか！出血はありますか！',
        romaji: 'Ishiki to kokyuu wa dou desu ka! Shukketsu wa arimasu ka!',
        idText: 'Bagaimana kesadaran dan pernapasannya! Apakah ada pendarahan!',
      },
      {
        id: 'd6',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: '意識はあります。呼吸も安定しています。頭部出血はありませんが、右腰の痛みを訴えています！',
        furigana: '意識はあります。呼吸も安定しています。頭部出血はありませんが、右腰の痛みを訴えています！',
        romaji: 'Ishiki wa arimasu. Kokyuu mo antei shite imasu. Toubu shukketsu wa arimasen ga, migikoshi no itami wo uttaete imasu!',
        idText: 'Kesadaran ada. Pernapasan stabil. Tidak ada pendarahan kepala, tetapi mengeluhkan nyeri pada pinggang kanan!',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'てんとう',
        reading: 'てんとう (転倒)',
        romaji: 'tentou',
        meaning: 'Jatuh / Terpeleset',
        nuance: 'Istilah medis resmi Kaigo untuk insiden terjatuh.',
        exampleSentence: {
          jp: 'りようしゃが てんとうしました。',
          furigana: '利用者が 転倒しました。',
          romaji: 'Riyousha ga tentou shimashita.',
          idText: 'Residen terjatuh.',
        },
      },
      {
        id: 'v2',
        word: 'いしき',
        reading: 'いしき (意識)',
        romaji: 'ishiki',
        meaning: 'Kesadaran',
        nuance: 'Diperiksa pertama kali saat terjadi insiden darurat.',
        exampleSentence: {
          jp: 'いしきは せいめいです。',
          furigana: '意識は 清明です。',
          romaji: 'Ishiki wa seimei desu.',
          idText: 'Kesadaran jelas / sadar penuh.',
        },
      },
      {
        id: 'v3',
        word: 'こきゅう',
        reading: 'こきゅう (呼吸)',
        romaji: 'kokyuu',
        meaning: 'Pernapasan',
        nuance: 'Tanda vital dasar yang wajib dilaporkan.',
        exampleSentence: {
          jp: 'こきゅうが あらいです。',
          furigana: '呼吸が 荒いです。',
          romaji: 'Kokyuu ga arai desu.',
          idText: 'Pernapasannya terengah-engah/sesak.',
        },
      },
      {
        id: 'v4',
        word: 'しゅっけつ',
        reading: 'しゅっけつ (出血)',
        romaji: 'shukketsu',
        meaning: 'Pendarahan',
        nuance: 'Cek terutama di bagian kepala dan siku.',
        exampleSentence: {
          jp: 'とうぶに しゅっけつは ありません。',
          furigana: '頭部に 出血は ありません。',
          romaji: 'Toubu ni shukketsu wa arimasen.',
          idText: 'Tidak ada pendarahan di area kepala.',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn4-00028',
        title: 'Bentuk Pasif Sopan / Pelaporan Kejadian: 〜されました',
        formula: '[Residen] + が + [Kata Kerja Pasif] + されました',
        meaning: 'Melaporkan kejadian yang dialami lansia dengan nada sopan dan objektif.',
        nuanceNotes: 'Menyatakan insiden tanpa menyalahkan siapa pun.',
        examples: [
          {
            jp: '山田様が 転倒されました。',
            furigana: '山田様が 転倒されました。',
            romaji: 'Yamada-sama ga tentou saremashita.',
            idText: 'Yamada-sama terjatuh.',
          },
        ],
      },
      {
        id: 'exp2',
        grammarId: 'gn4-00021',
        title: 'Melaporkan Keluhan Pasien: 〜を訴えています',
        formula: '[Bagian Tubuh] + の + 痛み + を + 訴えています',
        meaning: 'Menyampaikan keluhan rasa sakit yang dirasakan residen lansia kepada perawat medis.',
        nuanceNotes: 'Uttaete imasu adalah kosakata standar rekam medis Jepang.',
        examples: [
          {
            jp: '右足の 痛みを 訴えています。',
            furigana: '右足の 痛みを 訴えています。',
            romaji: 'Migiashi no itami wo uttaete imasu.',
            idText: 'Mengeluhkan rasa sakit pada kaki kanan.',
          },
        ],
      },
    ],

    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Apa istilah teknis medis Kaigo untuk insiden lansia terpeleset atau terjatuh di lantai?',
        options: ['てんとう (転倒)', 'きしょう (起床)', 'にゅうよく (入浴)', 'はいせつ (排泄)'],
        correctAnswer: 'てんとう (転倒)',
        explanation: 'Tentou adalah istilah resmi untuk lansia jatuh.',
        diagnosticFeedback: {
          'きしょう (起床)': 'Kishou berarti bangun tidur.',
          'にゅうよく (入浴)': 'Nyuuyoku berarti mandi berendam.',
          'はいせつ (排泄)': 'Haisetsu berarti buang air / ekskresi.',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Kata Laporan SBAR): Lengkapi laporan kepada Leader:',
        sentencePrompt: 'リーダー、203号室で山田様が_____されました！',
        options: ['転倒', '起床', '食事', '散歩'],
        correctAnswer: '転倒',
        explanation: 'Tentou saremashita = terjatuh.',
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun instruksi pencegahan cedera leher:',
        sentencePrompt: 'Tolong jangan bergerak!',
        tokens: ['動かないで', 'くださいね'],
        correctOrder: ['動かないで', 'くださいね'],
        correctAnswer: '動かないで くださいね',
        explanation: 'Ugokanaide kudasai ne.',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan SOP): Manakah tindakan yang DILARANG saat menemukan lansia tergeletak jatuh di lantai?',
        options: [
          'Langsung menarik tangan dan membopong berdiri ke tempat tidur',
          'Berlutut dan menepuk bahu lembut untuk memeriksa kesadaran',
          'Memanggil Leader dan memeriksa ada tidaknya pendarahan kepala',
        ],
        correctAnswer: 'Langsung menarik tangan dan membopong berdiri ke tempat tidur',
        explanation:
          'Dilarang keras membopong korban tanpa pemeriksaan medis karena berisiko memperparah fraktur tulang atau saraf tulang belakang!',
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons SBAR): Leader bertanya: "意識と呼吸はどうですか！". Jika sadar dan napas stabil tanpa pendarahan, apa respons Anda?',
        options: [
          '意識はあります。呼吸も安定しています。頭部出血はありません！',
          'はい、大丈夫だと思います。たぶん寝ています。',
          'わかりません。さようなら。',
          '痛いです。ごめんなさい。',
        ],
        correctAnswer: '意識はあります。呼吸も安定しています。頭部出血はありません！',
        explanation: 'Melaporkan status kesadaran, pernapasan, dan kondisi luka secara ringkas dan terukur.',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu merespons keadaan darurat lansia jatuh dan melaporkan status SBAR secara cepat ke Leader.',
      situation: 'Saat patroli, Anda mendapati residen Yamada-sama terjatuh di samping tempat tidur.',
      promptTask: 'Panggil Leader via interkom dan laporkan insiden serta status kesadaran korban!',
      modelAnswer: 'リーダー、大変です！203号室で山田様が転倒されました！意識は清明、頭部出血はありません！',
      modelAnswerId: 'Riidaa, taihen desu! Ni-maru-san goushitsu de Yamada-sama ga tentou saremashita! Ishiki wa seimei, toubu shukketsu wa arimasen!',
      culturalEtiquette: 'Gunakan nada suara tegas, tenang, tidak histeris, dan jangan memindahkan tubuh korban sendirian.',
      skillUnlocked: [
        'Menguasai protokol pelaporan darurat SBAR',
        'Bisa melaporkan keluhan pasien dengan 〜を訴えています',
      ],
      pocketSummary: {
        keyFormula: '[Nama] 様が 転倒されました / 意識はあります / [Bagian] の 痛みを 訴えています',
        coreWords: ['てんとう (Jatuh)', 'いしき (Kesadaran)', 'こきゅう (Pernapasan)', 'しゅっけつ (Pendarahan)'],
        coreWarning: 'JANGAN PERNAH membopong korban jatuh sendirian tanpa instruksi medis Leader!',
        quickDialogue: 'A: 意識はどうですか？ → B: 意識はあります、出血はありません！',
      },
    },

    pocket_summary: {
      keyFormula: '[Nama] 様が 転倒されました / 意識はあります / [Bagian] の 痛みを 訴えています',
      coreWords: ['てんとう (Jatuh)', 'いしき (Kesadaran)', 'こきゅう (Pernapasan)', 'しゅっけつ (Pendarahan)'],
      coreWarning: 'JANGAN PERNAH membopong korban jatuh sendirian tanpa instruksi medis Leader!',
      quickDialogue: 'A: 意識はどうですか？ → B: 意識はあります、出血はありません！',
    },
  },
`;

// Insert N5 lessons after les-n5-u01-02
const n5Marker = "  // ── SSW Kaigo Unit 1 Pelajaran 1: Protokol Koe-kake Pagi (〜てもよろしいですか) ──";
if (!content.includes(n5Marker)) {
  console.error('Cannot find n5Marker');
  process.exit(1);
}
content = content.replace(n5Marker, n5_u01_03_code + '\n' + n5Marker);

// Insert Kaigo U01-02 after les-ssw-kaigo-u01-01
const kaigoMarker = "}; // end of CURATED_LESSONS_MAP or closing bracket";
const closingMapRegex = /\n\};\s*\n\s*\/\/ Fisher-Yates shuffle/;
if (!closingMapRegex.test(content)) {
  console.error('Cannot find closingMapRegex');
  process.exit(1);
}

content = content.replace(closingMapRegex, kaigo_u01_02_code + '\n};\n\n// Fisher-Yates shuffle');

// Add alias mappings right after CURATED_LESSONS_MAP
const aliasCode = `
// Alias mappings for track-prefixed lesson IDs
CURATED_LESSONS_MAP['les-curriculum-ssw-kaigo-u01-01'] = CURATED_LESSONS_MAP['les-ssw-kaigo-u01-01'];
CURATED_LESSONS_MAP['les-curriculum-ssw-kaigo-u01-02'] = CURATED_LESSONS_MAP['les-ssw-kaigo-u01-02'];
`;

content = content.replace('// Fisher-Yates shuffle', aliasCode.trim() + '\n\n// Fisher-Yates shuffle');

// Also update lookup in getAdaptiveLessonContent
const oldLookup = `  // 1. Cek repositori terkurasi spesifik jika ada
  if (CURATED_LESSONS_MAP[lesson.id]) {
    const curated = CURATED_LESSONS_MAP[lesson.id];`;

const newLookup = `  // 1. Cek repositori terkurasi spesifik jika ada (dengan fallback alias multi-format)
  const normalizedKey = lesson.id.replace('curriculum-', '').replace('les-curriculum-', 'les-');
  const curated = CURATED_LESSONS_MAP[lesson.id] || CURATED_LESSONS_MAP[normalizedKey];
  if (curated) {`;

content = content.replace(oldLookup, newLookup);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('✅ Successfully enriched lessonContentAdapter.ts with Sprint 5 gold-standard lessons and aliases!');
