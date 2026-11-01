import type { CurriculumLesson } from '../../../../types/curriculum';

export const sswKaigoLessons: Record<string, Partial<CurriculumLesson>> = {
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
        diagnosticFeedback: {
          'おじいちゃん (Ojiichan)': 'Panggilan akrab keluarga ini terlarang dalam fasilitas profesional karena merendahkan otonomi dewasa.',
          'ともだち (Tomodachi)': 'Tomodachi berarti teman sejawat, tidak pantas untuk hubungan pengasuh-residen lansia.',
          'かんじゃ (Kanja)': 'Kanja (pasien) adalah istilah rumah sakit untuk orang sakit, sedangkan di panti wreda mereka adalah penghuni residen (riyousha).',
        },
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pilihan Kata): Lengkapi salam masuk kamar lansia sesuai SOP Kaigo:',
        sentencePrompt: 'やまださま、おはようございます。_____。',
        options: ['しつれいいたします', 'ごめんなさい', 'じゃあね', 'おじゃま'],
        correctAnswer: 'しつれいいたします',
        explanation: 'Shitsurei itashimasu adalah frasa wajib permisi saat memasuki ruang privasi residen.',
        diagnosticFeedback: {
          'ごめんなさい': 'Gomennasai adalah ungkapan minta maaf informal, bukan salam permisi masuk kamar.',
          'じゃあね': 'Jaa ne adalah ucapan selamat tinggal kasual kepada teman sebaya.',
          'おじゃま': 'Ojama adalah bentuk tidak lengkap yang kurang sopan untuk pelayanan profesional.',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun izin membuka tirai:',
        sentencePrompt: 'Bolehkah membuka tirai?',
        tokens: ['カーテンを', 'あけても', 'よろしいですか'],
        correctOrder: ['0', '1', '2'],
        options: ['カーテンを あけても よろしいですか', 'あけても カーテンを よろしいですか', 'よろしいですか カーテンを あけても'],
        correctAnswer: 'カーテンを あけても よろしいですか',
        explanation: 'Kaaten wo akete mo yoroshii desu ka.',
        diagnosticFeedback: {
          'あけても カーテンを よろしいですか': 'Jebakan Susunan: Objek "kaaten o" harus mendahului verba bentuk te "aketemo".',
          'よろしいですか カーテンを あけても': 'Jebakan Struktur: Frasa permohonan izin "yoroshii desu ka" diletakkan di akhir kalimat.',
        },
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Kesalahan): Manakah panggilan yang DILARANG dalam etika Kaigo Jepang?',
        options: ['おじいちゃん (Ojiichan)', '山田様 (Yamada-sama)', '山田さん (Yamada-san)'],
        correctAnswer: 'おじいちゃん (Ojiichan)',
        explanation:
          'Memanggil lansia dengan "Ojiichan" dilarang keras dalam SOP Kaigo karena dianggap merendahkan martabat (infantilization).',
        diagnosticFeedback: {
          '山田様 (Yamada-sama)': 'Panggilan Nama + Sama adalah standar tertinggi kesantunan profesional di panti Kaigo.',
          '山田さん (Yamada-san)': 'Panggilan Nama + San diperbolehkan di sebagian fasilitas jika sudah ada persetujuan keakraban santun.',
        },
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
        diagnosticFeedback: {
          'じゃあね！': 'Jaa ne berarti "dadah!", sangat tidak pantas diucapkan saat melayani residen.',
          'どういたしまして。': 'Douitashimashite (sama-sama) hanya diucapkan jika residen berterima kasih terlebih dahulu.',
          'ごめんなさい。': 'Gomennasai berarti minta maaf atas kesalahan, tidak nyambung dengan izin membuka tirai.',
        },
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
        diagnosticFeedback: {
          '起床': 'Kishou berarti bangun tidur dari ranjang secara normal, bukan insiden darurat.',
          '食事': 'Shokuji berarti makan, tidak sesuai dengan situasi darurat di lantai.',
          '散歩': 'Sanpo berarti jalan-jalan santai, bukan kecelakaan terjatuh.',
        },
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun instruksi pencegahan cedera leher:',
        sentencePrompt: 'Tolong jangan bergerak!',
        tokens: ['動かないで', 'くださいね'],
        correctOrder: ['0', '1'],
        options: ['動かないで くださいね', 'くださいね 動かないで'],
        correctAnswer: '動かないで くださいね',
        explanation: 'Ugokanaide kudasai ne.',
        diagnosticFeedback: {
          'くださいね 動かないで': 'Jebakan Susunan: Partikel permohonan "kudasai ne" diletakkan setelah bentuk negatif "naide".',
        },
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
        diagnosticFeedback: {
          'Berlutut dan menepuk bahu lembut untuk memeriksa kesadaran': 'Tindakan ini adalah SOP wajib pertama untuk memeriksa respon korban tanpa menggerakkan tulang belakang.',
          'Memanggil Leader dan memeriksa ada tidaknya pendarahan kepala': 'Tindakan ini adalah protokol baku keselamatan sebelum intervensi lebih lanjut.',
        },
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
        diagnosticFeedback: {
          'はい、大丈夫だと思います。たぶん寝ています。': 'Asumsi subjektif ("mungkin tidur") sangat berbahaya dalam situasi darurat medis.',
          'わかりません。さようなら。': 'Jawaban tidak bertanggung jawab yang melanggar kode etik perawat profesional.',
          '痛いです。ごめんなさい。': 'Perawat melaporkan kondisi residen kepada Leader, bukan mengeluhkan sakit diri sendiri.',
        },
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

// Track-prefixed alias IDs
sswKaigoLessons['les-curriculum-ssw-kaigo-u01-01'] = sswKaigoLessons['les-ssw-kaigo-u01-01'];
sswKaigoLessons['les-curriculum-ssw-kaigo-u01-02'] = sswKaigoLessons['les-ssw-kaigo-u01-02'];
