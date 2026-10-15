// ══════════════════════════════════════════════════════════════════
//  lessonContentAdapter.ts — Universal Adaptive Curriculum Engine
//  Menyediakan konten terkurasi mendalam & Dynamic Generator lintas jalur
//  Bebas jargon akademis, kaya konteks nyata, & ramah pembelajar
// ══════════════════════════════════════════════════════════════════

import {
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
import { NormalizedGrammar, NormalizedVocab } from '../data/dataManager';

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
};

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
      drills: curated.drills || lesson.drills,
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
        title: 'Jebakan Transfer Bahasa Indonesia',
        caseScenario: 'Menerapkan susunan kalimat bahasa Indonesia secara harfiah.',
        pitfallWarning: 'Menyusun kalimat dengan meletakkan predikat di tengah layaknya bahasa Indonesia.',
        rightSolution: `Pastikan predikat dan pola ${primaryG?.pattern || 'utama'} selalu diletakkan di akhir kalimat.`,
        explanation: 'Bahasa Jepang adalah bahasa dengan predikat di akhir kalimat (SOV).',
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
      jp: `こんにちは。きょうは「${lesson.title_id}」を れんしゅうしましょう。`,
      romaji: 'Konnichiwa. Kyou wa renshuu shimashou.',
      idText: `Halo. Hari ini mari kita berlatih topik "${lesson.title_id}".`,
    },
    {
      id: 'd2',
      speaker: 'Budi',
      speakerRole: 'Pembelajar Indonesia',
      avatar: '🙋‍♂️',
      jp: `はい！たとえば、どんな ふうに いいますか。`,
      romaji: 'Hai! Tatoeba, donna fuu ni iimasu ka.',
      idText: 'Baik! Misalnya, diungkapkan seperti apa?',
    },
    {
      id: 'd3',
      speaker: 'Tanaka',
      speakerRole: 'Rekan Bicara',
      avatar: '🧑‍💼',
      jp: `たとえば、こう いいます。「${authenticExample1.jp}」`,
      romaji: 'Tatoeba, kou iimasu.',
      idText: `Misalnya, kita katakan begini: "${authenticExample1.jp}" (${authenticExample1.id})`,
      note: 'Mengangguk ramah (Aizuchi)',
    },
    {
      id: 'd4',
      speaker: 'Budi',
      speakerRole: 'Pembelajar Indonesia',
      avatar: '🙋‍♂️',
      jp: `なるほど！${authenticExample2.jp}`,
      romaji: 'Naruhodo!',
      idText: `Begitu ya! ${authenticExample2.id}`,
    },
    {
      id: 'd5',
      speaker: 'Tanaka',
      speakerRole: 'Rekan Bicara',
      avatar: '🧑‍💼',
      jp: `その とおりです。とても じょうずですよ！`,
      romaji: 'Sono toori desu. Totemo jouzu desu yo!',
      idText: 'Tepat sekali. Pengucapanmu sangat wajar!',
    },
    {
      id: 'd6',
      speaker: 'Budi',
      speakerRole: 'Pembelajar Indonesia',
      avatar: '🙋‍♂️',
      jp: `ありがとうございます。がんばります！`,
      romaji: 'Arigatou gozaimasu. Gambarimasu!',
      idText: 'Terima kasih banyak. Saya akan terus berusaha!',
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
  const shuffledTokens = [...reorderTokens].reverse();

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
      options: [
        primaryV1.meaning,
        primaryV2.meaning || 'bertemu',
        primaryV3.meaning || 'melihat',
        'pergi / datang',
      ].filter((v, idx, arr) => arr.indexOf(v) === idx).slice(0, 4),
      correctAnswer: primaryV1.meaning,
      explanation: `Arti yang tepat untuk ${primaryV1.word} adalah "${primaryV1.meaning}".`,
    },
    {
      id: 'drill-dyn-2',
      type: 'cloze',
      instruction: 'Langkah 2 (Lengkapi Kalimat Otentik): Pilihlah bagian yang tepat untuk melengkapi kalimat berikut:',
      sentencePrompt: clozePrompt,
      options: clozeOptions,
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
      options: [
        `${authenticExample1.jp}`,
        `${invertedSentence} (Urutan terbalik ala SVO)`,
        `${alteredParticleSentence} (Partikel tidak pas)`,
      ],
      correctAnswer: `${authenticExample1.jp}`,
      explanation: `Kalimat yang benar dan wajar adalah: "${authenticExample1.jp}" (${authenticExample1.id}).`,
    },
    {
      id: 'drill-5',
      type: 'response',
      instruction: `Langkah 5 (Respons Situasional): Saat rekan bicara berkata "${authenticExample1.jp}", bagaimana respons terbaik Anda?`,
      options: [
        'はい、よく わかりました。ありがとうございます。',
        'いいえ、だめです。',
        'さようなら。',
        'ごめんなさい。',
      ],
      correctAnswer: 'はい、よく わかりました。ありがとうございます。',
      explanation: 'Memberikan respons sopan bahwa Anda menyimak dan memahami maksud rekan bicara dengan baik.',
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
