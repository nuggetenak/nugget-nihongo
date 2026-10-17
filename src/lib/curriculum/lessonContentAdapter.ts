// ══════════════════════════════════════════════════════════════════
//  lessonContentAdapter.ts — Universal Adaptive Curriculum Engine
//  Menyediakan konten terkurasi mendalam & Dynamic Generator lintas jalur
//  Bebas jargon akademis, kaya konteks nyata, & ramah pembelajar
// ══════════════════════════════════════════════════════════════════

import type {
  CurriculumLesson,
  LessonDialogueLine,
  LessonExplanationSection,
  LessonDrillItem,
  CanDoChallenge,
  LessonPedagogicalFramework,
  LessonVocabDetail,
  CommonPitfallItem,
  PocketSummary,
} from '../../types/curriculum';
import type { NormalizedGrammar, NormalizedVocab } from '../data/dataManager';

// ── 1. REPOSITORI KONTEN TERKURASI KHUSUS (GOLD STANDARD N5 & SSW KAIGO) ──

const CURATED_LESSONS_MAP: Record<string, Partial<CurriculumLesson>> = {
  // ── N5 Unit 1 Pelajaran 1: Nama & Identitas Diri (〜は〜です) ────
  'les-n5-u01-01': {
    pedagogical_framework: {
      what: {
        summary: 'Pola predikat nominal afirmatif 〜は〜です dan penanda topik は (wa).',
        canDo: 'Bisa menyebutkan nama, asal negara, dan profesi diri secara sopan saat perjumpaan pertama.',
        targetPatterns: ['〜は〜です', 'は (topik)'],
        coreVocabSample: ['わたし', 'なまえ', 'がくせい', 'かいしゃいん', 'エンジニア', 'インドネシア'],
      },
      sensei_context: {
        sceneIntro:
          'Bayangkan kamu baru saja mendarat di Jepang untuk bekerja atau belajar. Langkah pertamamu adalah mendatangi balai kota (Kuyakusho) untuk mendaftarkan alamat tinggal dan berkenalan dengan staf loket.',
        dailyMission:
          'Mampu menyebutkan nama, asal negara, dan profesi dirimu dengan percaya diri, ramah, dan santun tanpa rasa canggung.',
        whyOrder:
          'Kenapa pola ini dipelajari pertama kali? Karena otak kita jauh lebih mudah merakit pola kalimat dasar [Subjek + adalah + Predikat] sebelum masuk ke perubahan kata kerja yang bercabang-cabang. Pola ini adalah pondasi dari 80% komunikasi awal di Jepang.',
      },
      cultural_notes: {
        title: 'Etika Perkenalan Pertama (Jikoshoukai) di Jepang',
        etiquette:
          'Saat mengucapkan "Hajimemashite" dan "Douzo yoroshiku", tundukkan badan sekitar 15 derajat (Eshaku) dengan kedua tangan di samping paha (pria) atau di depan perut (wanita). Jangan pernah menambahkan akhiran gelar "-san" pada nama dirimu sendiri!',
        taboos:
          'Dalam percakapan sehari-hari, orang Jepang sering menghilangkan subjek atau menyebut nama/jabatan + さん. Sebutan "anata" dapat terdengar berjarak atau terlalu langsung dalam konteks interpersonal tertentu (meski lazim di kuesioner tertulis atau lagu). Untuk kenalan baru, lebih aman dan santun memanggil nama keluarga lawan bicara diikuti gelar "-san" (misal: Tanaka-san).',
      },
      pronunciation_tips: {
        title: 'Tips Pelafalan Alami untuk Lidah Indonesia',
        moraNote:
          'Bahasa Jepang memakai ketukan waktu yang rata (mora), bukan suku kata yang ditekan keras-lemah.',
        soundTip:
          'Bunyi "su" pada akhiran "desu" dilafalkan sangat tipis dan terbisukan laksana embusan napas (des\'), jangan dibaca tebal atau ditekan seperti kata "desa" dalam bahasa Indonesia.',
      },
      common_pitfalls: [
        {
          title: 'Jebakan Kata "Adalah" (Struktur SVO Indonesia vs SOV Jepang)',
          caseScenario: 'Menerjemahkan kata "adalah" di tengah kalimat seperti susunan bahasa Indonesia.',
          pitfallWarning: '"わたしは です ブディ。" (Watashi wa desu Budi)',
          rightSolution: '"わたしは ブディ です。" (Watashi wa Budi desu)',
          explanation:
            'Di bahasa Indonesia kita meletakkan "adalah" di tengah kalimat. Namun dalam kalimat pernyataan dasar bahasa Jepang, "desu" berfungsi menutup predikat sopan (dapat diikuti partikel penanya/penegas seperti "ka", "yo", atau "ne").',
        },
        {
          title: 'Pantangan Menempelkan Gelar "-san" ke Diri Sendiri',
          caseScenario: 'Memperkenalkan nama diri dengan embel-embel sopan.',
          pitfallWarning: '"わたしは ブディさん です。" (Watashi wa Budi-san desu)',
          rightSolution: '"わたしは ブディ です。" (Watashi wa Budi desu)',
          explanation:
            'Gelar "-san" adalah tanda penghormatan eksklusif untuk orang lain. Menggunakannya untuk diri sendiri terdengar sombong dan janggal bagi telinga orang Jepang.',
        },
      ],
      who_and_when: {
        situational_context:
          'Perkenalan pertama kali (Jikoshoukai), registrasi administrasi balai kota, orientasi kerja, atau menyapa tetangga baru.',
        social_relations:
          'Digunakan kepada orang yang baru dikenal, rekan kerja sejawat, atau staf pelayanan publik dalam ragam kesopanan standar (Teineigo).',
        when_not_to_use:
          'Hindari menggunakan kata ganti "anata" secara sembarangan kepada orang yang baru dikenal.',
      },
      scenario: {
        title: 'Registrasi Kependudukan di Balai Kota Shinjuku',
        setting: 'Loket Pendaftaran Penduduk, Kuyakusho Tokyo',
        narrative:
          'Budi baru saja mendarat di Jepang untuk bekerja. Dia mendatangi loket balai kota dan memperkenalkan identitas dirinya kepada Tanaka-san, petugas loket.',
      },
    },

    // ── Dialog 6-8 Baris Lengkap & Alami ──
    dialogue: [
      {
        id: 'd1',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'こんにちは。はじめまして。たなかです。',
        furigana: 'こんにちは。はじめまして。田中です。',
        romaji: 'Konnichiwa. Hajimemashite. Tanaka desu.',
        idText: 'Halo selamat siang. Salam kenal. Saya Tanaka.',
        note: 'Menunduk hormat 15 derajat (Eshaku)',
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はじめまして。わたしは ブディです。どうぞ よろしく おねがいします。',
        furigana: 'はじめまして。私は ブディです。どうぞ よろしく お願いします。',
        romaji: 'Hajimemashite. Watashi wa Budi desu. Douzo yoroshiku onegaishimasu.',
        idText: 'Salam kenal. Saya Budi. Senang berkenalan dengan Anda, mohon bimbingannya.',
      },
      {
        id: 'd3',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'ブディさんは、どちらから きましたか。',
        furigana: 'ブディさんは、どちらから 来ましたか。',
        romaji: 'Budi-san wa, dochira kara kimashita ka.',
        idText: 'Budi-san datang dari mana (asal negara/daerah)?',
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'インドネシアから きました。ジャカルタの しゅっしんです。',
        furigana: 'インドネシアから 来ました。ジャカルタの 出身です。',
        romaji: 'Indoneshia kara kimashita. Jakaruta no shusshin desu.',
        idText: 'Saya datang dari Indonesia. Asal saya dari Jakarta.',
      },
      {
        id: 'd5',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'そうですか。ブディさんは、がくせいですか。',
        furigana: 'そうですか。ブディさんは、学生ですか。',
        romaji: 'Sou desu ka. Budi-san wa, gakusei desu ka.',
        idText: 'Begitu ya. Apakah Budi-san seorang mahasiswa/pelajar?',
        note: 'Mengangguk ramah (Aizuchi)',
      },
      {
        id: 'd6',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'いいえ、がくせいじゃ ありません。かいしゃいんです。エンジニアです。',
        furigana: 'いいえ、学生じゃ ありません。会社員です。エンジニアです。',
        romaji: 'Iie, gakusei ja arimasen. Kaishain desu. Enjinia desu.',
        idText: 'Bukan, saya bukan mahasiswa. Saya karyawan perusahaan. Saya seorang engineer.',
      },
      {
        id: 'd7',
        speaker: 'Tanaka',
        speakerRole: 'Petugas Balai Kota',
        avatar: '🧑‍💼',
        jp: 'エンジニアですね。すばらしいです。ようこそ にほんへ！',
        furigana: 'エンジニアですね。素晴らしいです。ようこそ 日本へ！',
        romaji: 'Enjinia desu ne. Subarashii desu. Youkoso Nihon e!',
        idText: 'Insinyur ya. Luar biasa. Selamat datang di Jepang!',
      },
    ],

    // ── Bedah Kosakata Inti (Kaya Konteks & Collocation) ──
    vocab_breakdown: [
      {
        id: 'v1',
        word: 'わたし',
        reading: 'わたし',
        romaji: 'watashi',
        meaning: 'Saya (kata ganti orang pertama netral & sopan)',
        nuance: 'Paling aman dan standar digunakan oleh pria maupun wanita dalam situasi formal, kerja, dan sosial umum.',
        particleTip: 'Biasa dipasangkan dengan partikel は (watashi wa) untuk memulai perkenalan.',
        exampleSentence: {
          jp: 'わたしは エンジニアです。',
          furigana: '私は エンジニアです。',
          romaji: 'Watashi wa enjinia desu.',
          idText: 'Saya adalah seorang insinyur.',
        },
      },
      {
        id: 'v2',
        word: 'なまえ',
        reading: 'なまえ / おなまえ',
        romaji: 'namae / onamae',
        meaning: 'Nama',
        nuance: 'Jika bertanya nama orang lain, tambahkan awalan penghormatan "o-" menjadi "O-namae wa?". Jangan gunakan "o-" untuk nama diri sendiri.',
        particleTip: 'おなまえは なんですか。(Siapa nama Anda?)',
        exampleSentence: {
          jp: 'おなまえは なんですか。',
          furigana: 'お名前は 何ですか。',
          romaji: 'Onamae wa nan desu ka.',
          idText: 'Siapa nama Anda?',
        },
      },
      {
        id: 'v3',
        word: 'がくせい',
        reading: 'がくせい',
        romaji: 'gakusei',
        meaning: 'Pelajar / Mahasiswa',
        nuance: 'Menyebutkan status pendidikan secara umum, mulai dari sekolah kejuruan hingga universitas.',
        particleTip: 'がくせいです。(Saya seorang pelajar.)',
        exampleSentence: {
          jp: 'たなかさんは がくせいですか。',
          furigana: '田中さんは 学生ですか。',
          romaji: 'Tanaka-san wa gakusei desu ka.',
          idText: 'Apakah Tanaka-san seorang pelajar?',
        },
      },
      {
        id: 'v4',
        word: 'かいしゃいん',
        reading: 'かいしゃいん',
        romaji: 'kaishain',
        meaning: 'Karyawan Perusahaan / Pegawai Kantor',
        nuance: 'Dipakai saat menyebut profesi diri ("Saya karyawan"). Jika menyebut nama kantor tertentu, gunakan kata "shain" (misal: Toyota no shain).',
        particleTip: 'かいしゃいんです。(Saya karyawan kantor.)',
        exampleSentence: {
          jp: 'わたしは かいしゃいんです。',
          furigana: '私は 会社員です。',
          romaji: 'Watashi wa kaishain desu.',
          idText: 'Saya adalah seorang karyawan perusahaan.',
        },
      },
      {
        id: 'v5',
        word: 'エンジニア',
        reading: 'エンジニア',
        romaji: 'enjinia',
        meaning: 'Insinyur / Software Engineer / Teknisi',
        nuance: 'Kata serapan bahasa asing yang ditulis dengan aksara Katakana.',
        particleTip: 'ITの エンジニアです。(Saya insinyur IT.)',
        exampleSentence: {
          jp: 'ブディさんは エンジニアです。',
          furigana: 'ブディさんは エンジニアです。',
          romaji: 'Budi-san wa enjinia desu.',
          idText: 'Budi-san adalah seorang insinyur.',
        },
      },
      {
        id: 'v6',
        word: 'せんせい',
        reading: 'せんせい',
        romaji: 'sensei',
        meaning: 'Guru / Dosen / Dokter / Pengajar Terhormat',
        nuance: 'Gelar penghormatan untuk profesi pendidik atau dokter. Pantang menyebut diri sendiri "watashi wa sensei desu" di depan umum; gunakan "kyoushi" untuk profesi diri.',
        particleTip: 'たなかせんせい (Tanaka-sensei / Pak Guru Tanaka).',
        exampleSentence: {
          jp: 'たなかさんは せんせいです。',
          furigana: '田中さんは 先生です。',
          romaji: 'Tanaka-san wa sensei desu.',
          idText: 'Tanaka-san adalah seorang guru.',
        },
      },
      {
        id: 'v7',
        word: 'インドネシア',
        reading: 'インドネシア',
        romaji: 'indoneshia',
        meaning: 'Negara Indonesia',
        nuance: 'Untuk menyatakan warga negara Indonesia, cukup tambahkan akhiran "jin" (インドネシアじん).',
        particleTip: 'インドネシアから きました。(Saya datang dari Indonesia.)',
        exampleSentence: {
          jp: 'わたしは インドネシアじんです。',
          furigana: '私は インドネシア人です。',
          romaji: 'Watashi wa indoneshiajin desu.',
          idText: 'Saya adalah orang Indonesia.',
        },
      },
      {
        id: 'v8',
        word: 'にほん',
        reading: 'にほん / にっぽん',
        romaji: 'nihon / nippon',
        meaning: 'Negara Jepang',
        nuance: 'Negara Jepang. Orang Jepang = にほんじん (nihonjin). Bahasa Jepang = にほんご (nihongo).',
        particleTip: 'にほんへ ようこそ！(Selamat datang di Jepang!)',
        exampleSentence: {
          jp: 'たなかさんは にほんじんです。',
          furigana: '田中さんは 日本人です。',
          romaji: 'Tanaka-san wa nihonjin desu.',
          idText: 'Tanaka-san adalah orang Jepang.',
        },
      },
    ],

    // ── Bedah Pola Tata Bahasa & Partikel Mendalam ──
    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00001',
        title: 'Pola Predikat Identitas Sopan: 〜は〜です',
        formula: '[Subjek/Topik] は [Predikat Kata Benda] です',
        meaning: 'Menyatakan identitas diri, nama, kebangsaan, atau profesi secara santun dan terhormat.',
        nuanceNotes:
          'Struktur dasar paling penting dalam bahasa Jepang. Menghubungkan topik pembicaraan dengan identitasnya di depan lawan bicara.',
        patternLogic:
          'Orang Jepang berpikir dengan cara: "Mengenai [Topik], ia adalah [Predikat]". Karena itu, topik diangkat terlebih dahulu menggunakan partikel は, lalu identitasnya dikunci dengan akhiran kesopanan です di ujung kalimat.',
        particleNotes:
          'Partikel penanda topik は ditulis menggunakan huruf hiragana "ha", namun KHUSUS saat berfungsi sebagai partikel penanda topik kalimat, bunyinya wajib dibaca "wa".',
        formVariations: [
          {
            label: 'Bentuk Positif (Afirmatif)',
            jp: 'わたしは ブディです。',
            idText: 'Saya adalah Budi.',
          },
          {
            label: 'Bentuk Negatif (Penyangkal)',
            jp: 'わたしは がくせいじゃ ありません。',
            idText: 'Saya bukan pelajar.',
          },
          {
            label: 'Bentuk Tanya (Introgatif)',
            jp: 'たなかさんは せんせいですか。',
            idText: 'Apakah Tanaka-san seorang guru?',
          },
        ],
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
        pairedExamples: [
          {
            speakerA: 'Tanaka',
            jpA: 'ブディさんは、がくせいですか。',
            idA: 'Apakah Budi-san seorang mahasiswa?',
            speakerB: 'Budi',
            jpB: 'いいえ、がくせいじゃ ありません。エンジニアです。',
            idB: 'Bukan, saya bukan mahasiswa. Saya seorang insinyur.',
          },
        ],
      },
    ],

    // ── Tangga Latihan Bertingkat 5-Soal (Cek Pemahaman) ──
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Manakah kata yang tepat untuk menyebut "karyawan perusahaan" bagi profesi diri?',
        options: ['かいしゃいん (kaishain)', 'せんせい (sensei)', 'がくせい (gakusei)', 'ぎんこういん (ginkouin)'],
        correctAnswer: 'かいしゃいん (kaishain)',
        explanation: 'Kaishain adalah sebutan tepat untuk karyawan perusahaan secara umum.',
        diagnosticFeedback: {
          'せんせい (sensei)': 'Sensei berarti guru atau dokter, bukan karyawan perusahaan.',
          'がくせい (gakusei)': 'Gakusei berarti pelajar atau mahasiswa.',
          'ぎnこういん (ginkouin)': 'Ginkouin berarti pegawai bank secara spesifik.',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Partikel): Pilih partikel penanda topik yang tepat untuk melengkapi kalimat perkenalan:',
        sentencePrompt: 'わたし _____ インドネシアじん です。',
        options: ['は', 'が', 'を', 'に'],
        correctAnswer: 'は',
        explanation: 'Partikel は (dibaca "wa") berfungsi mengangkat "watashi" sebagai topik kalimat.',
        diagnosticFeedback: {
          'が': 'Partikel が (ga) menandai subjek gramatikal spesifik atau penekanan fokus, kurang lazim untuk perkenalan identitas umum.',
          'を': 'Partikel を (wo) adalah penanda objek penderita kata kerja, bukan kalimat nominal desu.',
          'に': 'Partikel に (ni) menandai waktu, tempat tujuan, atau keberadaan.',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kepingan Kalimat): Susun kepingan kata berikut menjadi kalimat: "Saya adalah karyawan perusahaan"',
        sentencePrompt: 'Saya adalah karyawan perusahaan',
        tokens: ['です', 'わたしは', 'かいしゃいん'],
        correctOrder: ['わたしは', 'かいしゃいん', 'です'],
        correctAnswer: 'わたしは かいしゃいん です',
        explanation: 'Urutan bahasa Jepang selalu: Topik (watashi wa) + Predikat Benda (kaishain) + Kopula Sopan (desu).',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan Umum): Kalimat manakah yang TIDAK PANTAS diucapkan saat berkenalan di Jepang?',
        options: [
          'わたしは ブディさん です。',
          'わたしは ブディ です。',
          'たなかさんは にほんじんです。',
        ],
        correctAnswer: 'わたしは ブディさん です。',
        explanation:
          'Gelar "-san" tidak boleh dipasang pada nama diri sendiri. Menyebut diri sendiri "Budi-san" terdengar janggal dan tidak sopan.',
        diagnosticFeedback: {
          'わたしは ブディ です。': 'Kalimat ini 100% benar dan sopan untuk memperkenalkan diri.',
          'たなかさんは にほんじんです。': 'Kalimat ini benar karena memasang "-san" pada nama orang lain (Tanaka).',
        },
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Percakapan Nyata): Petugas bertanya: "ブディさんは がくせいですか。". Jika kamu seorang insinyur, apa jawaban terbaikmu?',
        options: [
          'いいえ、がくせいじゃ ありません。エンジニアです。',
          'はい、がくせいじゃ ありません。',
          'わたしは です エンジニア。',
          'いいえ、がくせいです。',
        ],
        correctAnswer: 'いいえ、がくせいじゃ ありません。エンジニアです。',
        explanation:
          'Menyangkal dengan "Iie, gakusei ja arimasen" lalu mengoreksi dengan profesi yang benar "Enjinia desu".',
        diagnosticFeedback: {
          'はい、がくせいじゃ ありません。': 'Kontradiktif: "Hai" (Ya) tidak bisa dipasangkan dengan sangkalan negatif "ja arimasen".',
          'わたしは です エンジニア。': 'Terbalik akibat terjemahan harfiah bahasa Indonesia; "desu" wajib berada di ujung kalimat.',
          'いいえ、がくせいです。': 'Kontradiktif: "Iie" (Bukan) tidak cocok dengan penegasan positif "gakusei desu".',
        },
      },
    ],

    // ── Tantangan Nyata (Can-Do Real-World Challenge) ──
    can_do_challenge: {
      statement: 'Mampu memperkenalkan nama, profesi, dan asal negara secara santun dan wajar saat pertama kali bertemu.',
      situation: 'Kamu baru saja mendarat di Tokyo dan mendatangi loket balai kota (Kuyakusho). Staf loket menyapa: "Konnichiwa! Hajimemashite."',
      promptTask: 'Ucapkan salam kenal, sebutkan namamu, sampaikan bahwa kamu berasal dari Indonesia, dan tutup dengan permohonan bimbingan yang santun!',
      modelAnswer: 'はじめまして。わたしは [Nama] です。インドネシアから きました。どうぞ よろしく おねがいします。',
      modelAnswerId: 'Hajimemashite. Watashi wa [Nama] desu. Indoneshia kara kimashita. Douzo yoroshiku onegaishimasu.',
      culturalEtiquette: 'Ucapkan sambil membungkukkan badan sekitar 15 derajat (Eshaku) dengan senyum ramah dan kontak mata yang wajar.',
      skillUnlocked: [
        'Bisa menyebutkan nama diri tanpa menyematkan -san',
        'Bisa menyatakan kebangsaan dan asal negara',
        'Bisa merangkai kalimat nominal sopan berakhiran desu',
      ],
      pocketSummary: {
        keyFormula: '[Topik] は [Predikat] です',
        coreWords: ['わたし (Saya)', 'なまえ (Nama)', 'かいしゃいん (Karyawan)'],
        coreWarning: 'Jangan taruh "desu" di tengah kalimat & jangan panggil diri sendiri dengan "-san"!',
        quickDialogue: 'A: おなまえは？ → B: わたしは ブディです。',
      },
    },

    pocket_summary: {
      keyFormula: '[Topik] は [Predikat] です',
      coreWords: ['わたし (Saya)', 'なまえ (Nama)', 'かいしゃいん (Karyawan)'],
      coreWarning: 'Jangan taruh "desu" di tengah kalimat & jangan panggil diri sendiri dengan "-san"!',
      quickDialogue: 'A: おなまえは？ → B: わたしは ブディです。',
    },
  },

  // ── N5 Unit 1 Pelajaran 2: Penyangkal & Pertanyaan Sopan (〜じゃありません / 〜ですか) ──
  'les-n5-u01-02': {
    pedagogical_framework: {
      what: {
        summary: 'Bentuk negatif predikat 〜じゃありません dan partikel tanya か.',
        canDo: 'Bisa menyangkal profesi/kewarganegaraan dan menanyakan identitas orang lain dengan sopan.',
        targetPatterns: ['〜じゃありません', '〜ですか'],
        coreVocabSample: ['がくせい', 'せんせい', 'いしゃ', 'かいしゃいん', 'はい', 'いいえ'],
      },
      sensei_context: {
        sceneIntro:
          'Di kantor atau lingkungan baru, orang sering salah menebak profesi atau asalmu. Pelajaran ini melatihmu untuk meluruskan kesalahpahaman secara santun tanpa menyinggung perasaan lawan bicara.',
        dailyMission:
          'Mampu meluruskan status atau profesi diri dengan menyangkal secara halus dan bertanya balik mengenai identitas lawan bicara.',
        whyOrder:
          'Setelah pola kalimat positif (desu) kamu kuasai, otakmu siap beralih ke variasi seimbangannya: bentuk negatif (ja arimasen) dan bentuk pertanyaan (desu ka). Keduanya adalah kunci untuk membangun percakapan dua arah yang hidup.',
      },
      cultural_notes: {
        title: 'Etika Menolak & Menyangkal di Jepang',
        etiquette:
          'Jangan memotong ucapan lawan bicara dengan kata "Iie!" (Bukan/Tidak!) yang keras atau mendadak. Mulailah dengan nada yang lembut: "Iie, gakusei ja arimasen..." diikuti penjelasan yang sebenarnya.',
        taboos:
          'Dalam situasi resmi atau kerja, bentuk tulisan formal adalah "dewa arimasen". Dalam percakapan santun sehari-hari, "ja arimasen" adalah ragam yang paling umum dan alami.',
      },
      pronunciation_tips: {
        title: 'Intonasi Pertanyaan Bahasa Jepang',
        moraNote:
          'Partikel "ka" di akhir kalimat berfungsi menggantikan tanda tanya (?).',
        soundTip:
          'Naikkan sedikit nada bicaramu pada suku kata terakhir "ka?" secara lembut, jangan berteriak atau terlalu tajam.',
      },
      common_pitfalls: [
        {
          title: 'Ja Arimasen vs Bukan Bahasa Indonesia',
          caseScenario: 'Mencoba membuat kalimat negatif dengan menyisipkan kata "bukan" di depan kata benda.',
          pitfallWarning: '"わたしは じゃない がくせい。" (Susunan kata salah)',
          rightSolution: '"わたしは がくせいじゃ ありません。" (Susunan kata benar)',
          explanation:
            'Di bahasa Jepang, penanda negatif "ja arimasen" SELALU ditaruh di belakang kata bendanya, bukan di depannya.',
        },
        {
          title: 'Menjawab Pertanyaan Negatif dengan Iie Terbalik',
          caseScenario: 'Menjawab pertanyaan negatif sopan seperti "Nihonjin ja arimasen ka?".',
          pitfallWarning: 'Menjawab "Iie" dengan maksud mengiyakan sangkalan lawan bicara ala logika bahasa Indonesia.',
          rightSolution: 'Menjawab "Hai, Nihonjin ja arimasen" (Benar, saya bukan orang Jepang).',
          explanation:
            'Dalam bahasa Jepang, "Hai" berarti membenarkan premis kalimat lawan bicara, sedangkan "Iie" berarti menyangkal premis kalimat lawan bicara.',
        },

      ],
      who_and_when: {
        situational_context: 'Klarifikasi data diri, wawancara kerja, menjawab pertanyaan formulir atau teman baru.',
        social_relations: 'Sopan resmi (Teineigo) kepada siapa pun dalam situasi kerja atau publik.',
        when_not_to_use: 'Hindari mengatakan "Iie!" secara ketus tanpa alasan pelunak ketika menolak.',
      },
      scenario: {
        title: 'Verifikasi Identitas di Kantor Pos Tokyo',
        setting: 'Loket Pengambilan Paket Yuubinkyoku',
        narrative:
          'Petugas kantor pos menanyakan apakah Budi seorang mahasiswa universitas setempat sebelum menyerahkan paket kiriman.',
      },
    },

    dialogue: [
      {
        id: 'd1',
        speaker: 'Petugas Pos',
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
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'いいえ、がくせいじゃ ありません。かいしゃいんです。',
        furigana: 'いいえ、学生じゃ ありません。会社員です。',
        romaji: 'Iie, gakusei ja arimasen. Kaishain desu.',
        idText: 'Bukan, saya bukan mahasiswa. Saya karyawan perusahaan.',
      },
      {
        id: 'd3',
        speaker: 'Petugas Pos',
        speakerRole: 'Staf Pos',
        avatar: '📮',
        jp: 'あ、かいしゃいんですね。しつれいしました。こちらに サインを おねがいします。',
        furigana: 'あ、会社員ですね。失礼しました。こちらに サインを お願いします。',
        romaji: 'A, kaishain desu ne. Shitsurei shimashita. Kochira ni sain wo onegaishimasu.',
        idText: 'Oh, karyawan perusahaan ya. Maaf salah mengira. Mohon tanda tangan di sebelah sini.',
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、わかりました。ありがとうございます。',
        furigana: 'はい、分かりました。ありがとうございます。',
        romaji: 'Hai, wakarimashita. Arigatou gozaimasu.',
        idText: 'Baik, saya mengerti. Terima kasih banyak.',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'はい',
        reading: 'はい',
        romaji: 'hai',
        meaning: 'Ya / Benar (jawaban afirmatif sopan)',
        nuance: 'Jawaban sopan resmi. Menunjukkan kesiapan mendengarkan atau persetujuan.',
        exampleSentence: {
          jp: 'はい、そうです。',
          furigana: 'はい、そうです。',
          romaji: 'Hai, sou desu.',
          idText: 'Ya, benar demikian.',
        },
      },
      {
        id: 'v2',
        word: 'いいえ',
        reading: 'いいえ',
        romaji: 'iie',
        meaning: 'Tidak / Bukan (jawaban sangkalan sopan)',
        nuance: 'Ucapkan dengan lembut saat mengoreksi informasi lawan bicara.',
        exampleSentence: {
          jp: 'いいえ、ちがいます。',
          furigana: 'いいえ、違います。',
          romaji: 'Iie, chigaimasu.',
          idText: 'Bukan, bukan begitu.',
        },
      },
      {
        id: 'v3',
        word: 'いしゃ',
        reading: 'いしゃ / おいしゃさん',
        romaji: 'isha / oishasan',
        meaning: 'Dokter',
        nuance: 'Untuk dokter sendiri = isha. Menyapa dokter yang merawat = sensei.',
        exampleSentence: {
          jp: 'たなかさんは いしゃじゃ ありません。',
          furigana: '田中さんは 医者じゃ ありません。',
          romaji: 'Tanaka-san wa isha ja arimasen.',
          idText: 'Tanaka-san bukan seorang dokter.',
        },
      },
      {
        id: 'v4',
        word: 'だいがく',
        reading: 'だいがく',
        romaji: 'daigaku',
        meaning: 'Universitas / Perguruan Tinggi',
        nuance: 'Tingkat pendidikan tinggi.',
        exampleSentence: {
          jp: 'とうきょうだいがくの がくせいです。',
          furigana: '東京大学の 学生です。',
          romaji: 'Toukyou daigaku no gakusei desu.',
          idText: 'Mahasiswa Universitas Tokyo.',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        grammarId: 'gn5-00002',
        title: 'Bentuk Negatif Sopan: 〜じゃありません',
        formula: '[Kata Benda] + じゃ ありません',
        meaning: 'Menyatakan bahwa subjek bukan berstatus kata benda yang dimaksud.',
        nuanceNotes: 'Bentuk sangkalan sopan netral untuk percakapan sehari-hari.',
        patternLogic:
          'Menggantikan akhiran です dengan じゃ ありません di akhir kalimat.',
        examples: [
          {
            jp: 'わたしは せんせいじゃ ありません。',
            furigana: '私は 先生じゃ ありません。',
            romaji: 'Watashi wa sensei ja arimasen.',
            idText: 'Saya bukan seorang guru.',
          },
        ],
      },
      {
        id: 'exp2',
        grammarId: 'gn5-00004',
        title: 'Partikel Tanya: 〜ですか',
        formula: '[Kalimat Lengkap] + か',
        meaning: 'Mengubah kalimat pernyataan menjadi pertanyaan sopan.',
        nuanceNotes: 'Di bahasa Jepang, partikel か menggantikan fungsi tanda tanya.',
        examples: [
          {
            jp: 'ブディさんは がくせいですか。',
            furigana: 'ブディさんは 学生ですか。',
            romaji: 'Budi-san wa gakusei desu ka.',
            idText: 'Apakah Budi-san seorang mahasiswa?',
          },
        ],
      },
    ],

    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Bagaimana cara sopan menjawab "Bukan, salah mengira" dalam bahasa Jepang?',
        options: ['いいえ (Iie)', 'はい (Hai)', 'ありがとう (Arigatou)', 'どうぞ (Douzo)'],
        correctAnswer: 'いいえ (Iie)',
        explanation: 'Iie adalah kata sangkalan sopan untuk menyatakan bukan/tidak.',
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Partikel): Lengkapi partikel tanya di akhir kalimat:',
        sentencePrompt: 'たなかさんは かいしゃいん です_____。',
        options: ['か', 'は', 'ね', 'よ'],
        correctAnswer: 'か',
        explanation: 'Partikel か (ka) di akhir kalimat berfungsi sebagai penanda kalimat tanya.',
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun kata-kata berikut menjadi: "Bukan guru"',
        sentencePrompt: 'Bukan guru',
        tokens: ['ありません', 'せんせいじゃ'],
        correctOrder: ['せんせいじゃ', 'ありません'],
        correctAnswer: 'せんせいじゃ ありません',
        explanation: 'Sensei ja arimasen = Bukan seorang guru.',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah susunan kalimat negatif yang SALAH?',
        options: [
          'わたしは じゃない がくせい。',
          'わたしは がくせいじゃ ありません。',
          'たなかさんは いしゃじゃ ありません。',
        ],
        correctAnswer: 'わたしは じゃない がくせい。',
        explanation:
          'Janai/ja arimasen tidak diletakkan di depan kata benda seperti kata "bukan" dalam bahasa Indonesia, melainkan di belakangnya.',
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Nyata): Seseorang bertanya: "たなかさんは いしゃですか。". Jika Tanaka adalah guru dan bukan dokter, apa jawabanmu?',
        options: [
          'いいえ、いしゃじゃ ありません。せんせいです。',
          'はい、いしゃじゃ ありません。',
          'いいえ、いしゃです。',
          'せんせい は です。',
        ],
        correctAnswer: 'いいえ、いしゃじゃ ありません。せんせいです。',
        explanation: 'Menyangkal profesi dokter lalu menegaskan profesi guru secara tepat.',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu menyangkal kesalahpahaman profesi/status diri dan menyatakan identitas yang benar.',
      situation: 'Petugas administrasi salah mengira Anda adalah seorang dokter.',
      promptTask: 'Katakan bahwa Anda bukan dokter, melainkan perawat (kangoshi)!',
      modelAnswer: 'いいえ、いしゃじゃ ありません。かんごしです。',
      modelAnswerId: 'Iie, isha ja arimasen. Kangoshi desu.',
      culturalEtiquette: 'Gunakan intonasi lembut saat meluruskan agar lawan bicara tidak merasa malu.',
      skillUnlocked: [
        'Bisa menyangkal dengan 〜じゃありません',
        'Bisa bertanya sopan dengan 〜ですか',
      ],
      pocketSummary: {
        keyFormula: '[Nomina] じゃ ありません (Bukan ~) / 〜ですか (Apakah ~?)',
        coreWords: ['はい (Ya)', 'いいえ (Bukan)', 'いしゃ (Dokter)'],
        coreWarning: 'Jangan taruh kata "bukan" di depan kata benda!',
        quickDialogue: 'A: がくせいですか？ → B: いいえ、かいしゃいんです。',
      },
    },

    pocket_summary: {
      keyFormula: '[Nomina] じゃ ありません (Bukan ~) / 〜ですか (Apakah ~?)',
      coreWords: ['はい (Ya)', 'いいえ (Bukan)', 'いしゃ (Dokter)'],
      coreWarning: 'Jangan taruh kata "bukan" di depan kata benda!',
      quickDialogue: 'A: がくせいですか？ → B: いいえ、かいしゃいんです。',
    },
  },


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

  // ── SSW Kaigo Unit 1 Pelajaran 1: Protokol Koe-kake Pagi (〜てもよろしいですか) ──
  'les-ssw-kaigo-u01-01': {
    pedagogical_framework: {
      what: {
        summary: 'Protokol Koe-kake (menyapa sebelum bertindak) dan salam hormat lansia di fasilitas panti wreda.',
        canDo: 'Bisa menyapa lansia di pagi hari dan meminta izin sebelum memeriksa kondisi atau membuka tirai.',
        targetPatterns: ['〜失礼します', '〜てもよろしいですか', 'おはようございます'],
        coreVocabSample: ['りようしゃ', 'たいちょう', 'カーテン', 'あさ', 'きぶん'],
      },
      sensei_context: {
        sceneIntro:
          'Dalam dunia keperawatan lansia Jepang (Kaigo), privasi dan martabat residen lansia adalah nomor satu. SOP Jepang mewajibkan prinsip "Koe-kake" (selalu bersuara menyapa dan minta izin sebelum menyentuh tubuh atau ruangan residen).',
        dailyMission:
          'Mampu menyapa lansia dengan nama keluarga + sama di pagi hari, dan meminta izin membuka tirai jendela dengan sopan.',
        whyOrder:
          'Koe-kake adalah standar keselamatan pertama di panti wreda Jepang agar lansia tidak kaget, jatuh karena panik, atau merasa diabaikan martabatnya.',
      },
      cultural_notes: {
        title: 'Pantangan "Baby Talk" (Larangan Tameguchi pada Lansia)',
        etiquette:
          'Selalu panggil residen lansia dengan nama keluarga + 様 (sama) atau さん (san). Jangan pernah memanggil dengan "Ojiichan" (Kakek) atau "Obaachan" (Nenek) karena dianggap merendahkan martabat (infantilization).',
        taboos:
          'Dilarang keras langsung membuka tirai jendela atau menyentuh selimut tanpa memberi salam Koe-kake terlebih dahulu.',
      },
      pronunciation_tips: {
        title: 'Nada Bicara Koe-kake',
        moraNote:
          'Gunakan suara yang hangat, jelas, tidak terburu-buru, dan arahkan pandangan sejajar dengan mata lansia.',
        soundTip:
          'Ucapkan "Shitsurei itashimasu" dengan nada santun dan tenang saat melangkahkan kaki ke dalam kamar.',
      },
      common_pitfalls: [
        {
          title: 'Memanggil Lansia Seperti Kerabat Sendiri',
          caseScenario: 'Memanggil kakek residen dengan panggilan Ojiichan.',
          pitfallWarning: '"おじいちゃん、おはよう！" (Dilarang keras dalam SOP Kaigo)',
          rightSolution: '"山田様、おはようございます。失礼いたします。" (Yamada-sama, ohayou gozaimasu.)',
          explanation:
            'Di Jepang, residen panti wreda adalah pelanggan terhormat. Selalu gunakan nama keluarga + sama.',
        },
      ],
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
        speaker: 'Yamada',
        speakerRole: 'Residen Lansia',
        avatar: '👴',
        jp: 'ああ、シティさん、おはよう。',
        furigana: 'ああ、シティさん、おはよう。',
        romaji: 'Aa, Shiti-san, ohayou.',
        idText: 'Ah, Siti-san, selamat pagi.',
      },
      {
        id: 'd3',
        speaker: 'Siti',
        speakerRole: 'Perawat Kaigo',
        avatar: '👩‍⚕️',
        jp: 'きょうは いいてんきですよ。カーテンを あけても よろしいですか。',
        furigana: '今日は いい天気ですよ。カーテンを 開けても よろしいですか。',
        romaji: 'Kyou wa ii tenki desu yo. Kaaten wo akete mo yoroshii desu ka.',
        idText: 'Hari ini cuacanya cerah lho. Bolehkah saya membuka tirai jendelanya?',
      },
      {
        id: 'd4',
        speaker: 'Yamada',
        speakerRole: 'Residen Lansia',
        avatar: '👴',
        jp: 'うん、おねがいするよ。あかるくなって いいね。',
        furigana: 'うん、お願いするよ。明るくなって いいね。',
        romaji: 'Un, onegai suru yo. Akaruku natte ii ne.',
        idText: 'Ya, tolong ya. Jadi terang dan nyaman ya.',
      },
    ],

    vocab_breakdown: [
      {
        id: 'v1',
        word: 'りようしゃ',
        reading: 'りようしゃ / 利用者様',
        romaji: 'riyousha / riyousha-sama',
        meaning: 'Residen / Pengguna Layanan Panti Lansia',
        nuance: 'Istilah baku SOP keperawatan Jepang untuk menyebut para lansia yang dirawat.',
        exampleSentence: {
          jp: 'りようしゃさまの へやに いきます。',
          furigana: '利用者様の 部屋に 行きます。',
          romaji: 'Riyousha-sama no heya ni ikimasu.',
          idText: 'Pergi ke kamar residen lansia.',
        },
      },
      {
        id: 'v2',
        word: 'たいちょう',
        reading: 'たいちょう / 体調',
        romaji: 'taichou',
        meaning: 'Kondisi Fisik / Kesehatan Tubuh',
        nuance: 'Sangat sering digunakan dalam pertanyaan rutin: Taichou wa ikaga desu ka? (Bagaimana kondisi tubuh Anda?)',
        exampleSentence: {
          jp: 'たいちょうは いかがですか。',
          furigana: '体調は いかがですか。',
          romaji: 'Taichou wa ikaga desu ka.',
          idText: 'Bagaimana kondisi fisik Anda hari ini?',
        },
      },
      {
        id: 'v3',
        word: 'カーテン',
        reading: 'カーテン',
        romaji: 'kaaten',
        meaning: 'Tirai Jendela',
        nuance: 'Objek yang wajib dimintakan izin sebelum dibuka agar residen tidak silau.',
        exampleSentence: {
          jp: 'カーテンを あけます。',
          furigana: 'カーテンを 開けます。',
          romaji: 'Kaaten wo akemasu.',
          idText: 'Membuka tirai.',
        },
      },
    ],

    explanations: [
      {
        id: 'exp1',
        title: 'Protokol Izin Tindakan Santun: 〜ても よろしいですか',
        formula: '[Kata Kerja Bentuk て] + も よろしいですか',
        meaning: 'Apakah diperkenankan jika saya melakukan...?',
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
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kontekstual): Apa istilah resmi dalam SOP Kaigo untuk menyebut penghuni panti wreda?',
        options: ['りようしゃさま (Riyousha-sama)', 'おじいちゃん (Ojiichan)', 'ともだち (Tomodachi)', 'かんじゃ (Kanja)'],
        correctAnswer: 'りようしゃさま (Riyousha-sama)',
        explanation: 'Riyousha-sama adalah sebutan resmi yang menghormati martabat penghuni panti.',
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Kata): Lengkapi salam masuk kamar lansia sesuai SOP Kaigo:',
        sentencePrompt: 'やまださま、おはようございます。_____。',
        options: ['しつれいいたします', 'ごめんなさい', 'じゃあね', 'おじゃま'],
        correctAnswer: 'しつれいいたします',
        explanation: 'Shitsurei itashimasu adalah frasa wajib permisi saat memasuki ruang privasi residen.',
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun izin membuka tirai:',
        sentencePrompt: 'Bolehkah membuka tirai?',
        tokens: ['よろしいですか', 'あけても', 'カーテンを'],
        correctOrder: ['カーテンを', 'あけても', 'よろしいですか'],
        correctAnswer: 'カーテンを あけても よろしいですか',
        explanation: 'Kaaten wo akete mo yoroshii desu ka.',
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah panggilan yang DILARANG dalam etika Kaigo Jepang?',
        options: ['おじいちゃん (Ojiichan)', '山田様 (Yamada-sama)', '山田さん (Yamada-san)'],
        correctAnswer: 'おじいちゃん (Ojiichan)',
        explanation:
          'Memanggil lansia dengan "Ojiichan" dilarang keras dalam SOP Kaigo karena dianggap merendahkan martabat (infantilization).',
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Nyata): Setelah kakek Yamada mengizinkan tirai dibuka ("Un, onegai suru yo"), apa respon terbaikmu?',
        options: [
          'しつれいいたします。カーテンを あけますね。',
          'じゃあね！',
          'どういたしまして。',
          'ごめんなさい。',
        ],
        correctAnswer: 'しつれいいたします。カーテンを あけますね。',
        explanation: 'Menyampaikan konfirmasi tindakan dengan santun saat melangkah membuka tirai.',
      },
    ],

    can_do_challenge: {
      statement: 'Mampu menyapa lansia dan meminta izin membuka tirai jendela di pagi hari secara sopan.',
      situation: 'Pukul 07.00 pagi, Anda masuk ke kamar residen Kakek Yamada.',
      promptTask: 'Ucapkan salam pagi dan minta izin membuka tirai!',
      modelAnswer: 'やまださま、おはようございます。カーテンを あけても よろしいですか。',
      modelAnswerId: 'Yamada-sama, ohayou gozaimasu. Kaaten wo akete mo yoroshii desu ka.',
      culturalEtiquette: 'Ucapkan dari jarak yang terlihat jelas oleh residen dan jangan tiba-tiba menyentuh barang pribadi.',
      skillUnlocked: [
        'Menguasai protokol salam Koe-kake masuk kamar',
        'Bisa meminta izin sopan dengan 〜てもよろしいですか',
      ],
      pocketSummary: {
        keyFormula: '[Kata Kerja Bentuk て] + も よろしいですか',
        coreWords: ['りようしゃ (Residen)', 'たいちょう (Kondisi Fisik)', 'カーテン (Tirai)'],
        coreWarning: 'Pantang panggil lansia dengan "Ojiichan/Obaachan", selalu gunakan Nama + Sama!',
        quickDialogue: 'A: カーテンを あけても よろしいですか？ → B: うん、おねがいするよ。',
      },
    },

    pocket_summary: {
      keyFormula: '[Kata Kerja Bentuk て] + も よろしいですか',
      coreWords: ['りようしゃ (Residen)', 'たいちょう (Kondisi Fisik)', 'カーテン (Tirai)'],
      coreWarning: 'Pantang panggil lansia dengan "Ojiichan/Obaachan", selalu gunakan Nama + Sama!',
      quickDialogue: 'A: カーテンを あけても よろしいですか？ → B: うん、おねがいするよ。',
    },
  },
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

};

// Alias mappings for track-prefixed lesson IDs
CURATED_LESSONS_MAP['les-curriculum-ssw-kaigo-u01-01'] = CURATED_LESSONS_MAP['les-ssw-kaigo-u01-01'];
CURATED_LESSONS_MAP['les-curriculum-ssw-kaigo-u01-02'] = CURATED_LESSONS_MAP['les-ssw-kaigo-u01-02'];

// Clean distractor self-leaks from multiple choice options
export function cleanOptionText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*\((?:Urutan terbalik[^\)]*|Partikel tidak pas|Bukan partikel[^\)]*|Pola kalimat salah[^\)]*|Salah susun[^\)]*|Bukan kata benda[^\)]*|Jebakan[^\)]*)\)/gi, '')
    .trim();
}

// Fisher-Yates shuffle helper to ensure non-deterministic option ordering across drills
export function shuffleOptions<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ── 2. DYNAMIC ADAPTIVE FALLBACK GENERATOR (UNTUK SELURUH JALUR LAIN) ──

/**
 * Menghasilkan konten pembelajaran adaptif lengkap untuk pelajaran mana pun
 * yang belum memiliki naskah kurasi manual, dengan standar kedalaman yang persis sama.
 */
export function getAdaptiveLessonContent(
  trackId: string,
  unit: any,
  lesson: CurriculumLesson,
  grammarList: NormalizedGrammar[] = [],
  vocabList: NormalizedVocab[] = []
): CurriculumLesson {
  // 1. Cek repositori terkurasi spesifik jika ada
  if (CURATED_LESSONS_MAP[lesson.id]) {
    const curated = CURATED_LESSONS_MAP[lesson.id];
    return {
      ...lesson,
      ...curated,
      pedagogical_framework: curated.pedagogical_framework || lesson.pedagogical_framework,
      dialogue: curated.dialogue || lesson.dialogue,
      vocab_breakdown: curated.vocab_breakdown || lesson.vocab_breakdown,
      explanations: curated.explanations || lesson.explanations,
      common_pitfalls: curated.common_pitfalls || lesson.common_pitfalls,
      drills: (curated.drills || lesson.drills || []).map((d) =>
        d.options ? { ...d, options: shuffleOptions(d.options.map(cleanOptionText)), correctAnswer: cleanOptionText(d.correctAnswer || '') } : d
      ),
      // Curated drill option randomization invariant: d.options ? { ...d, options: shuffleOptions(d.options) } : d
      can_do_challenge: curated.can_do_challenge || lesson.can_do_challenge,
      pocket_summary: curated.pocket_summary || lesson.pocket_summary,
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

  const primaryV1 = matchedVocab[0] || { word: 'にほん', reading: 'にほん', romaji: 'nihon', meaning: 'Jepang' };
  const primaryV2 = matchedVocab[1] || { word: 'ともだち', reading: 'ともだち', romaji: 'tomodachi', meaning: 'Teman' };
  const primaryV3 = matchedVocab[2] || { word: 'かいしゃ', reading: 'かいしゃ', romaji: 'kaisha', meaning: 'Perusahaan' };

  // 3. Bangun kerangka kontekstual ramah Sensei (tanpa jargon paper)
  const framework: LessonPedagogicalFramework = {
    what: {
      summary: `${lesson.title_id} — Fokus memahami pola ${primaryG?.pattern || 'tata bahasa utama'} dan kosakata terkait.`,
      canDo: lesson.can_do_statement || unit?.can_do_summary || 'Mampu mengomunikasikan gagasan inti unit ini secara wajar.',
      targetPatterns: matchedGrammar.slice(0, 3).map((g) => g.pattern || (g as any).title || 'Pola Utama'),
      coreVocabSample: matchedVocab.slice(0, 6).map((v) => v.word || (v as any).kanji || v.reading),
    },
    sensei_context: {
      sceneIntro: `Pada pelajaran ini, kita mempelajari bagaimana berinteraksi seputar tema ${unit?.theme || lesson.title_id} dalam suasana kehidupan dan kerja di Jepang.`,
      dailyMission: lesson.can_do_statement || 'Mampu menerapkan pola kalimat ini dalam percakapan sehari-hari secara wajar.',
      whyOrder: `Mengapa pola ini dipelajari pada tahap ini? Karena menguasai struktur ${primaryG?.pattern || 'dasar'} ini memberi fondasi kuat agar kamu bisa berkomunikasi tanpa takut salah susun kata.`,
    },
    cultural_notes: {
      title: 'Kiat Budaya & Etika Berkomunikasi',
      etiquette: 'Gunakan bentuk sopan standar (Teineigo) saat berbicara dengan rekan kerja atau orang yang baru dikenal. Anggukkan kepala ringan (Aizuchi) untuk menunjukkan bahwa kamu menyimak.',
      taboos: 'Hindari berbicara terlalu tergesa-gesa atau menggunakan ragam kasual kepada orang yang lebih senior.',
    },
    pronunciation_tips: {
      title: 'Tips Pelafalan Alami Lidah Indonesia',
      moraNote: 'Jaga ketukan waktu yang stabil untuk setiap aksara kana.',
      soundTip: 'Perhatikan vokal panjang dan bunyi konsonan rangkap agar artinya tidak tertukar.',
    },
    common_pitfalls: [
      {
        title: 'Jebakan Transfer SVO vs SOV Bahasa Indonesia',
        caseScenario: 'Menerapkan susunan kata bahasa Indonesia secara harfiah.',
        pitfallWarning: 'Menyusun kalimat dengan meletakkan predikat di tengah layaknya bahasa Indonesia.',
        rightSolution: `Pastikan predikat dan pola ${primaryG?.pattern || 'utama'} selalu diletakkan di akhir kalimat.`,
        explanation: 'Bahasa Jepang adalah bahasa dengan predikat di akhir kalimat (SOV), bukan SVO.',
      },
      {
        title: 'Jebakan Partikel Topik (は) vs Subjek (が)',
        caseScenario: 'Memilih partikel penanda pokok kalimat yang tepat.',
        pitfallWarning: 'Memakai partikel が sembarangan saat memperkenalkan topik pembicaraan umum.',
        rightSolution: 'Gunakan は untuk topik umum/perkenalan, dan gunakan が saat menekankan pilihan spesifik atau informasi baru.',
        explanation: 'Partikel は membatasi fokus tema pembicaraan ("mengenai ini..."), sedangkan が menunjuk subjek spesifik.',
      },
      {
        title: 'Pantangan Menempelkan Gelar Kehormatan pada Diri Sendiri',
        caseScenario: 'Menyebut nama diri sendiri dalam percakapan formal.',
        pitfallWarning: 'Menempelkan akhiran "-san" atau "-sama" pada nama sendiri saat berbicara.',
        rightSolution: 'Hanya gunakan "-san", "-sama", atau "-sensei" untuk orang lain.',
        explanation: 'Gelar kehormatan adalah bentuk penghormatan eksklusif untuk pihak luar.',
      },
    ],
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
  };

  // 4. Bangun bedah kosakata inti (6-10 kata)
  const vocab_breakdown: LessonVocabDetail[] = (matchedVocab.length > 0 ? matchedVocab : vocabList.slice(0, 6)).slice(0, 8).map((v) => ({
    id: v.id,
    word: v.word,
    reading: v.reading || v.word,
    romaji: v.romaji || '',
    meaning: v.meaning,
    pos: v.pos,
    nuance: v.nuance || 'Kosakata penting yang sering dipakai dalam situasi percakapan harian.',
    particleTip: `Gunakan dalam kalimat bersama pola ${primaryG?.pattern || 'terkait'}.`,
    exampleSentence: v.examples?.[0] ? {
      jp: v.examples[0].jp,
      romaji: '',
      idText: v.examples[0].id,
    } : {
      jp: `${v.word} です。`,
      romaji: '',
      idText: `Adalah ${v.meaning}.`,
    },
  }));

  // 5. Bangun dialog dinamis (6 baris percakapan situasional yang alami)
  // Ambil contoh kalimat otentik terverifikasi dari data grammar atau vocab
  const authenticExample1 = primaryG?.examples?.[0] || primaryV1?.examples?.[0] || {
    jp: `${primaryV1.reading || primaryV1.word}を べんきょうします。`,
    romaji: 'benkyou shimasu',
    id: `Belajar ${primaryV1.meaning || 'materi ini'}.`,
  };
  const authenticExample2 = secondaryG?.examples?.[0] || primaryV2?.examples?.[0] || {
    jp: 'はい、よく わかりました。',
    romaji: 'Hai, yoku wakarimashita.',
    id: 'Ya, saya mengerti dengan baik.',
  };

  const dialogue: LessonDialogueLine[] = [
    {
      id: 'd1',
      speaker: 'Tanaka',
      speakerRole: 'Rekan Bicara',
      avatar: '🧑‍💼',
      jp: `すみません、${authenticExample1.jp}`,
      romaji: (authenticExample1 as any).romaji ? `Sumimasen, ${(authenticExample1 as any).romaji}` : 'Sumimasen...',
      idText: `Permisi, ${authenticExample1.id}`,
    },
    {
      id: 'd2',
      speaker: 'Budi',
      speakerRole: 'Pembelajar Indonesia',
      avatar: '🙋‍♂️',
      jp: `あ、そうですか。${authenticExample2.jp}`,
      romaji: (authenticExample2 as any).romaji ? `A, sou desu ka. ${(authenticExample2 as any).romaji}` : 'A, sou desu ka.',
      idText: `Ah, begitu ya. ${authenticExample2.id}`,
    },
    {
      id: 'd3',
      speaker: 'Tanaka',
      speakerRole: 'Rekan Bicara',
      avatar: '🧑‍💼',
      jp: `はい。${primaryG?.pattern ? `この「${primaryG.pattern}」の つかいかたは たいせつですよ。` : 'とても たいせつな ひょうげんです。'}`,
      romaji: 'Hai. Kono hyougen wa taisetsu desu yo.',
      idText: 'Ya. Pola ungkapan ini sangat lazim dan penting dalam percakapan.',
      note: 'Mengangguk ramah (Aizuchi)',
    },
    {
      id: 'd4',
      speaker: 'Budi',
      speakerRole: 'Pembelajar Indonesia',
      avatar: '🙋‍♂️',
      jp: `教えてくれて ありがとうございます！よく わかりました。`,
      romaji: 'Oshiete kurete arigatou gozaimasu! Yoku wakarimashita.',
      idText: 'Terima kasih banyak sudah menjelaskan! Saya mengerti dengan jelas.',
    },
  ];

  // 6. Bangun penjelasan tata bahasa dinamis dengan dekonstruksi mendalam
  const explanations: LessonExplanationSection[] = matchedGrammar.map((g, idx) => ({
    id: `exp-${idx + 1}`,
    grammarId: g.id,
    title: `Pola: ${g.pattern || (g as any).title}`,
    formula: (g as any).connection || (g as any).formula || g.pattern || 'Pola Inti',
    meaning: g.meaning || 'Makna dan fungsi pola.',
    nuanceNotes: g.nuance || (g as any).desc || 'Digunakan dalam ragam sopan standar.',
    patternLogic: 'Perhatikan posisi predikat dan partikel yang mengikat peran kata dalam kalimat.',
    particleNotes: 'Partikel penanda kalimat membantu memperjelas hubungan antar kata.',
    formVariations: [
      {
        label: 'Bentuk Standar',
        jp: `${g.pattern}`,
        idText: g.meaning,
      },
    ],
    examples: (g.examples || []).slice(0, 3).map((ex: any) => ({
      jp: ex.jp || '',
      romaji: ex.romaji || '',
      idText: ex.id || '',
    })),
  }));

  // 7. Bangun tangga latihan bertingkat 5-soal berbasis Sentence-Extraction & Slot-Filling (C-03)
  // Ekstraksi slot target dari kalimat asli, bukan merangkai string sintetis
  const rawJp = authenticExample1.jp.replace(/[。！!？?]/g, '').trim();

  // Deteksi partikel atau penanda yang diuji
  const commonParticles = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'から', 'まで', 'より', 'だけ'];
  const patternClean = (primaryG?.pattern || '').replace(/[〜\s\(\)（）A-Za-z0-9]/g, '');
  const matchedParticle = commonParticles.find((p) => patternClean.includes(p) && rawJp.includes(p)) ||
    commonParticles.find((p) => rawJp.includes(p));

  let clozePrompt = '';
  let clozeAnswer = '';
  let clozeOptions: string[] = [];
  let clozeExplanation = '';

  if (matchedParticle && rawJp.includes(matchedParticle)) {
    clozeAnswer = matchedParticle;
    clozePrompt = rawJp.replace(matchedParticle, ' _____ ') + `。 (Arti: ${authenticExample1.id})`;
    const distractors = ['で', 'に', 'を', 'が', 'へ', 'は', 'と'].filter((p) => p !== matchedParticle);
    clozeOptions = [matchedParticle, distractors[0], distractors[1], distractors[2]];
    clozeExplanation = `Partikel yang tepat untuk kalimat ini adalah "${matchedParticle}". Kalimat lengkap: "${authenticExample1.jp}" (${authenticExample1.id}).`;
  } else {
    // Jika bukan partikel, uji bentuk penutup predikat
    const endingMatch = rawJp.match(/(ます|ました|ません|でした|です|ない|たい)$/);
    if (endingMatch) {
      clozeAnswer = endingMatch[1];
      clozePrompt = rawJp.slice(0, rawJp.length - clozeAnswer.length) + ' _____ 。' + ` (Arti: ${authenticExample1.id})`;
      const formDistractors = ['ます', 'ました', 'ません', 'でした', 'です'].filter((f) => f !== clozeAnswer);
      clozeOptions = [clozeAnswer, formDistractors[0], formDistractors[1], formDistractors[2]];
      clozeExplanation = `Bentuk predikat yang tepat adalah "${clozeAnswer}". Kalimat lengkap: "${authenticExample1.jp}" (${authenticExample1.id}).`;
    } else {
      // Pemecahan kata terakhir dari contoh otentik
      const words = rawJp.split(/\s+/);
      const lastWord = words[words.length - 1] || 'です';
      clozeAnswer = lastWord;
      clozePrompt = (words.length > 1 ? words.slice(0, -1).join(' ') + ' _____ 。' : ' _____ 。') + ` (Arti: ${authenticExample1.id})`;
      clozeOptions = [lastWord, 'あります', 'います', 'します'];
      clozeExplanation = `Kata yang melengkapi kalimat dengan tepat adalah "${lastWord}". Kalimat lengkap: "${authenticExample1.jp}" (${authenticExample1.id}).`;
    }
  }

  // Pecah token untuk latihan susun kalimat (reorder) dari contoh asli
  const spaceTokens = rawJp.split(/\s+/).filter(Boolean);
  let reorderTokens = spaceTokens;
  if (reorderTokens.length < 2) {
    // Jika tidak ada spasi, pecah berdasarkan partikel
    const particleChunks = rawJp.split(/([はがをにでへと])/).filter(Boolean);
    const recombined: string[] = [];
    for (let i = 0; i < particleChunks.length; i++) {
      if (['は', 'が', 'を', 'に', 'で', 'へ', 'と'].includes(particleChunks[i]) && recombined.length > 0) {
        recombined[recombined.length - 1] += particleChunks[i];
      } else {
        recombined.push(particleChunks[i]);
      }
    }
    reorderTokens = recombined.length >= 2 ? recombined : [rawJp.slice(0, Math.floor(rawJp.length / 2)), rawJp.slice(Math.floor(rawJp.length / 2))];
  }

  const correctOrder = [...reorderTokens];
  let shuffledTokens = shuffleOptions(reorderTokens);
  if (reorderTokens.length > 1 && shuffledTokens.every((t, i) => t === correctOrder[i])) {
    shuffledTokens = [...reorderTokens].reverse();
  }

  // Susun jebakan urutan kata (trap_detect)
  const invertedSentence = reorderTokens.length >= 2
    ? `${reorderTokens[reorderTokens.length - 1]} ${reorderTokens.slice(0, -1).join(' ')}。`
    : `${rawJp} です です。`;

  const alteredParticleSentence = matchedParticle
    ? rawJp.replace(matchedParticle, matchedParticle === 'に' ? 'を' : 'に') + '。'
    : rawJp + ' だよ。';

  const drills: LessonDrillItem[] = [
    {
      id: 'drill-dyn-1',
      type: 'vocab_context',
      instruction: `Langkah 1 (Arti Kosakata): Apakah arti dari kata "${primaryV1.reading || primaryV1.word}"?`,
      options: shuffleOptions(
        [
          primaryV1.meaning,
          primaryV2.meaning || 'bertemu',
          primaryV3.meaning || 'melihat',
          'pergi / datang',
        ].filter((v, idx, arr) => arr.indexOf(v) === idx).slice(0, 4)
      ),
      correctAnswer: primaryV1.meaning,
      explanation: `Arti yang tepat untuk ${primaryV1.word} adalah "${primaryV1.meaning}".`,
    },
    {
      id: 'drill-dyn-2',
      type: 'cloze',
      instruction: 'Langkah 2 (Lengkapi Kalimat Otentik): Pilihlah bagian yang tepat untuk melengkapi kalimat berikut:',
      sentencePrompt: clozePrompt,
      options: shuffleOptions(clozeOptions),
      correctAnswer: clozeAnswer,
      explanation: clozeExplanation,
    },
    {
      id: 'drill-dyn-3',
      type: 'reorder',
      instruction: 'Langkah 3 (Susun Kalimat): Susun kepingan kata berikut menjadi kalimat bahasa Jepang yang utuh dan padu:',
      tokens: shuffledTokens,
      correctOrder: correctOrder,
      correctAnswer: correctOrder.join(' '),
      explanation: 'Dalam bahasa Jepang, predikat atau kata kerja selalu diletakkan di akhir kalimat.',
    },
    {
      id: 'drill-4',
      type: 'trap_detect',
      instruction: 'Langkah 4 (Deteksi Kalimat Alami): Manakah susunan kalimat yang benar dan berterima secara alami?',
      options: shuffleOptions([
        `${authenticExample1.jp}`,
        `${invertedSentence}`,
        `${alteredParticleSentence}`,
      ]),
      correctAnswer: `${authenticExample1.jp}`,
      explanation: `Kalimat yang benar dan wajar adalah: "${authenticExample1.jp}" (${authenticExample1.id}).`,
      diagnosticFeedback: {
        [`${invertedSentence}`]: 'Jebakan SVO: Dalam bahasa Jepang predikat selalu di akhir, jangan terbalik seperti susunan bahasa Indonesia!',
        [`${alteredParticleSentence}`]: 'Jebakan Partikel: Partikel ini tidak sesuai peran gramatikal atau mengubah arti kalimat menjadi janggal.',
      },
    },
    {
      id: 'drill-5',
      type: 'response',
      instruction: `Langkah 5 (Respons Situasional): Saat rekan bicara berkata "${authenticExample1.jp}", bagaimana respons terbaik Anda?`,
      options: shuffleOptions([
        'はい、よく わかりました。ありがとうございます。',
        'いいえ、だめです。',
        'さようなら。',
        'ごめんなさい。',
      ]),
      correctAnswer: 'はい、よく わかりました。ありがとうございます。',
      explanation: 'Memberikan respons sopan bahwa Anda menyimak dan memahami maksud rekan bicara dengan baik.',
      diagnosticFeedback: {
        'いいえ、だめです。': 'Terlalu konfrontatif dan tidak sopan dalam etika interaksi sosial Jepang.',
        'さようなら。': 'Hanya digunakan saat perpisahan jangka panjang atau selesai jam kerja, bukan respons memahami ujaran.',
        'ごめんなさい。': 'Hanya digunakan saat meminta maaf atas kesalahan pribadi, bukan untuk merespons informasi positif.',
      },
    },
  ];

  const pocketSummary: PocketSummary = {
    keyFormula: primaryG?.pattern || 'Pola Inti Pelajaran',
    coreWords: [primaryV1.word, primaryV2.word, primaryV3.word],
    coreWarning: 'Selalu perhatikan posisi predikat di akhir kalimat dan gunakan partikel yang sesuai fungsi.',
    quickDialogue: `A: ${authenticExample1.jp} → B: ${authenticExample2.jp}`,
  };

  const can_do_challenge: CanDoChallenge = {
    statement: lesson.can_do_statement || 'Mampu mengaplikasikan materi pelajaran ini dalam situasi nyata.',
    situation: `Situasi komunikasi seputar tema ${unit?.theme || lesson.title_id}.`,
    promptTask: `Gunakan pola ${primaryG?.pattern || 'utama'} untuk menyatakan maksud Anda secara sopan!`,
    modelAnswer: authenticExample1.jp,
    modelAnswerId: authenticExample1.id,
    culturalEtiquette: 'Tatap lawan bicara dengan sopan dan gunakan nada suara ramah.',
    skillUnlocked: [
      `Memahami penggunaan pola ${primaryG?.pattern || 'utama'}`,
      `Menguasai kosakata pendukung tema ${unit?.theme || lesson.title_id}`,
    ],
    pocketSummary,
  };

  return {
    ...lesson,
    pedagogical_framework: framework,
    dialogue,
    vocab_breakdown,
    explanations: explanations.length > 0 ? explanations : undefined,
    common_pitfalls: framework.common_pitfalls,
    drills,
    can_do_challenge,
    pocket_summary: pocketSummary,
  };
}
