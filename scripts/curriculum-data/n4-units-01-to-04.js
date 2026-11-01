// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n4-units-01-to-04.js
//  Gold-Standard Bespoke Curated Content for N4 Units 1–4 (7 Lessons)
// ══════════════════════════════════════════════════════════════════

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 1: Niat, Tekad & Rencana Kehidupan
  // ─────────────────────────────────────────────────────────────
  'les-n4-u01-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menyatakan kebiasaan hidup yang ditetapkan atas disiplin pribadi (〜ことにしている) dan upaya sadar secara terus-menerus (〜ようにしている / ようにする).',
        canDo: 'Bisa menceritakan komitmen kedisiplinan diri, pola hidup sehat, dan rutinitas belajar mandiri di Jepang.',
        targetPatterns: [
          '[Verba Kamus / Nai] ことに している (membiasakan diri atas tekad)',
          '[Verba Kamus / Nai] ように している (berupaya secara sadar)'
        ],
        coreVocabSample: ['きそく', 'けんこう', 'まいあさ', 'うんどう', 'やさい', 'まもる', 'つづける']
      },
      sensei_context: {
        sceneIntro: 'Di ruang istirahat kantor setelah jam makan siang. Sakura melihat Budi membawa bekal sehat dan bertanya rahasia staminanya yang selalu prima selama magang di Tokyo.',
        dailyMission: 'Mampu membedakan nuansa "koto ni shite iru" (keputusan aturan sendiri) dan "you ni shite iru" (upaya kebiasaan bertahap), serta mengungkapkan tekad menjaga kesehatan.',
        whyOrder: 'Setelah menyatakan rencana masa depan di Lesson 1 (tsumori / ikoukei), Lesson 2 mengajarkan eksekusi harian melalui kedisiplinan dan pembiasaan diri.'
      },
      cultural_notes: {
        title: 'Manajemen Kesehatan Pribadi (自己管理 - Jiko Kanri) di Dunia Kerja Jepang',
        etiquette: 'Di Jepang, menjaga kesehatan pribadi dipandang sebagai tanggung jawab profesional. Mengatakan "Saya berupaya tidur tepat waktu" mencerminkan kedewasaan dan kesiapan kerja.',
        taboos: 'Hindari memakai 〜ことにしている untuk aturan umum yang dipaksakan pihak luar (seperti peraturan perusahaan). Pola ini khusus keputusan dari dalam diri sendiri.'
      },
      pronunciation_tips: {
        title: 'Intonasi Sambung pada Frasa Hiragana Panjang',
        moraNote: 'Frasa "koto ni shite iru" terdiri dari 7 mora datar tanpa aksen kejut tinggi mendadak: ko-to-ni-shi-te-i-ru.',
        soundTip: 'Ucapkan "you ni" dengan vokal [o] panjang 2 mora: yo-o-ni, bukan yoni pendek.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ことにしている (Keputusan Sendiri) vs 〜ことになっている (Aturan dari Luar)',
          caseScenario: 'Ingin mengatakan "Saya bertekad bangun jam 6", tetapi malah memakai aturan luar.',
          pitfallWarning: '"毎朝【まいあさ】６時【ろくじ】に 起【お】きる ことに なっています。" (Kurang pas jika tekad pribadi)',
          rightSolution: '"毎朝【まいあさ】６時【ろくじ】に 起【お】きる ことに しています。" (Tepat)',
          explanation: '〜ことにしている adalah keputusan dan komitmen inisiatif sendiri, sedangkan 〜ことになっている adalah aturan atau jadwal yang ditetapkan oleh kantor atau organisasi.'
        },
        {
          title: 'Memasukkan Verba Bentuk Masu Sebelum Pola',
          caseScenario: 'Menggabungkan bentuk masu ke dalam pola: "tabemasu you ni shite iru".',
          pitfallWarning: '"野菜【やさい】を 食【た】べます ように しています。"',
          rightSolution: '"野菜【やさい】を 食【た】べる ように しています。"',
          explanation: 'Pola 〜ようにしている dan 〜ことにしている hanya menerima verba bentuk kamus (Jishokei) atau bentuk negatif kamus (Naikei).'
        }
      ],
      who_and_when: {
        situational_context: 'Saat wawancara kerja, evaluasi pembimbing magang, atau obrolan santai mengenai gaya hidup dan target belajar.',
        social_relations: 'Ragam sopan (Teineigo) yang sangat elegan untuk berbicara kepada mentor, atasan, maupun rekan kerja.',
        when_not_to_use: 'Jangan gunakan pada hal-hal yang terjadi di luar kendali kemauan manusia (seperti hujan atau tinggi badan).'
      },
      scenario: {
        title: 'Komitmen Hidup Disiplin di Tokyo',
        setting: 'Ruang istirahat staf, pukul 12.45',
        narrative: 'Sakura memuji Budi yang tampak bugar dan disiplin membawa bekal sayur setiap hari.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: 'ブディさん、いつも 元気【げんき】ですね。健康【けんこう】のために 何【なに】か していますか。', furigana: 'ブディさん、いつも 元気ですね。健康のために 何か していますか。', romaji: 'Budi-san, itsumo genki desu ne. Kenkou no tame ni nanika shite imasu ka.', idText: 'Budi-san, selalu kelihatan bugar ya. Ada melakukan sesuatu untuk menjaga kesehatan?' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、毎日【まいにち】野菜【やさい】を たくさん 食【た】べる ように しています。', furigana: 'はい、毎日野菜を たくさん 食べる ように しています。', romaji: 'Hai, mainichi yasai o takusan taberu you ni shite imasu.', idText: 'Iya, setiap hari saya berupaya untuk banyak makan sayur.' },
      { id: 'd3', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: '素晴らしいですね！運動【うんどう】も していますか。', furigana: '素晴らしいですね！運動も していますか。', romaji: 'Subarashii desu ne! Undou mo shite imasu ka.', idText: 'Luar biasa sekali! Apakah kamu juga berolahraga?' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、エレベーターを 使【つか】わないで、階段【かいだん】を 使【つか】う ことに しています。', furigana: 'はい、エレベーターを 使わないで、階段を 使う ことに しています。', romaji: 'Hai, erebe-ta- o tsukawanaide, kaidan o tsukau koto ni shite imasu.', idText: 'Iya, saya membiasakan diri tidak naik lift, melainkan memakai tangga.' },
      { id: 'd5', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: '感心【かんしん】しました。夜【よる】遅【おそ】くの スマホは どうですか。', furigana: '感心しました。夜遅くの スマホは どうですか。', romaji: 'Kanshin shimashita. Yoru osoku no sumaho wa dou desu ka.', idText: 'Saya kagum. Kalau penggunaan ponsel larut malam bagaimana?' },
      { id: 'd6', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '寝【ね】る 前【まえ】は スマホを 見【み】ない ように 気【き】を つけています。', furigana: '寝る 前は スマホを 見ない ように 気を つけています。', romaji: 'Neru mae wa sumaho o minai you ni ki o tsukete imasu.', idText: 'Sebelum tidur saya berhati-hati berupaya tidak melihat ponsel.' },
      { id: 'd7', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: 'しっかり 自己管理【じこかんり】が できていますね！見習【みなら】いたいです。', furigana: 'しっかり 自己管理が できていますね！見習いたいです。', romaji: 'Shikkari jikokanri ga dekite imasu ne! Minaraitai desu.', idText: 'Kamu benar-benar mampu mengelola diri dengan baik ya! Saya ingin mencontohnya.' },
      { id: 'd8', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'ありがとうございます！これからも 規則正【きそくただ】しい 生活【せいかつ】を 続【つづ】けます。', furigana: 'ありがとうございます！これからも 規則正しい 生活を 続けます。', romaji: 'Arigatou gozaimasu! Kore kara mo kisokutadashii seikatsu o tsuzukemasu.', idText: 'Terima kasih banyak! Ke depannya pun saya akan melanjutkan pola hidup yang teratur.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah padanan makna yang paling tepat untuk istilah "自己管理 (じこかんり)".',
        sentencePrompt: 'Istilah "自己管理" dalam dunia kerja dan kesehatan berarti:',
        options: ['Manajemen kedisiplinan diri sendiri', 'Laporan keuangan bulanan', 'Pemberitahuan cuti kerja', 'Pengaturan jadwal atasan'],
        correctAnswer: 'Manajemen kedisiplinan diri sendiri',
        explanation: '"自己管理 (じこかんり)" tersusun dari 自己 (diri sendiri) + 管理 (pengelolaan/manajemen).',
        diagnosticFeedback: {
          'Laporan keuangan bulanan': 'Salah: Laporan keuangan adalah 会計報告 (kaikei houkoku) atau 経理 (keiri).',
          'Pemberitahuan cuti kerja': 'Salah: Cuti kerja adalah 休暇届 (kyuukadoke).',
          'Pengaturan jadwal atasan': 'Salah: Pengaturan jadwal atasan adalah スケジュール管理 (sukejuuru kanri).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Isian Tepat): Lengkapilah rumpang kalimat berikut dengan bentuk verba yang tepat sebelum "ことにしています".',
        sentencePrompt: '私【わたし】は 毎朝【まいあさ】ジョギングを _____ ことに しています。',
        options: ['する', 'します', 'して', 'した'],
        correctAnswer: 'する',
        explanation: 'Pola 〜ことにしている mensyaratkan kata kerja bentuk kamus (Jishokei). Kata kerja kelompok 3 suru menjadi する.',
        diagnosticFeedback: {
          'します': 'Salah: Bentuk masu pantang digunakan tepat sebelum partikel nominalisator こと.',
          'して': 'Salah: Bentuk te digunakan untuk urutan atau sambungan, bukan sebelum ことにしている.',
          'した': 'Salah: Bentuk ta menunjukkan lampau; untuk kebiasaan rutin gunakan bentuk kamus sekarang.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susunlah potongan kalimat berikut untuk menyatakan upaya sadar tidak makan makanan manis.',
        sentencePrompt: 'Susunan kalimat yang tepat:',
        options: [
          '甘【あま】い 物【もの】を 食【た】べない ように しています',
          '食【た】べない 甘【あま】い 物【もの】を ように しています',
          'ように しています 甘【あま】い 物【もの】を 食【た】べない',
          '甘【あま】い 食【た】べない 物【もの】を ように しています'
        ],
        correctAnswer: '甘【あま】い 物【もの】を 食【た】べない ように しています',
        explanation: 'Objek (甘い物を) + Verba Naikei (食べない) + ように しています.',
        diagnosticFeedback: {
          '食【た】べない 甘【あま】い 物【もの】を ように しています': 'Salah: Predikat kerja tidak boleh ditaruh di awal klausa.',
          'ように しています 甘【あま】い 物【もの】を 食【た】べない': 'Salah: Pola you ni shite imasu harus selalu berada di ujung kalimat.',
          '甘【あま】い 食【た】べない 物【もの】を ように しています': 'Salah: Kata sifat 甘い harus menerangkan kata benda 物, bukan diselipi kata kerja.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Jebakan Nuansa): Manakah kalimat yang paling tepat untuk menyatakan tekad pribadi membiasakan membaca buku sebelum tidur?',
        sentencePrompt: 'Pilihlah kalimat yang mencerminkan komitmen inisiatif pribadi:',
        options: [
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】む ことに しています。',
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】む ことに なっています。',
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】みます ことに しています。',
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】んだ ことに しています。'
        ],
        correctAnswer: '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】む ことに しています。',
        explanation: '〜ことにしている dengan bentuk kamus (読む) menyatakan aturan yang kamu putuskan sendiri atas disiplin pribadi.',
        diagnosticFeedback: {
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】む ことに なっています。': 'Jebakan: 〜ことになっている berarti itu aturan atau kesepakatan luar dari kantor/sekolah, bukan tekad diri.',
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】みます ことに しています。': 'Jebakan Gramatikal: Bentuk masu (読みます) salah disambung ke こと.',
          '寝【ね】る 前【まえ】に 本【ほん】を 読【よ】んだ ことに しています。': 'Jebakan: Bentuk lampau (読んだ) berarti "berpura-pura menganggap sudah membaca".'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Rekan kerjamu bertanya "風邪【かぜ】を ひかないように、何【なに】か 気【き】を つけていますか". Jawaban paling tepat:',
        sentencePrompt: 'Pilihlah tanggapan yang menyatakan upaya sadar menjaga kesehatan:',
        options: [
          '外【そと】から 帰【かえ】ったら、手【て】を 洗【あら】う ように しています。',
          '手【て】を 洗【あら】った ほうが いいですよ。',
          '手【て】を 洗【あら】う つもりでした。',
          '風邪【かぜ】を ひく ことに しました。'
        ],
        correctAnswer: '外【そと】から 帰【かえ】ったら、手【て】を 洗【あら】う ように しています。',
        explanation: 'Menyatakan upaya kebiasaan sadar yang rutin dilakukan diri sendiri (cuci tangan saat pulang dari luar) menggunakan 〜ようにしている.',
        diagnosticFeedback: {
          '手【て】を 洗【あら】った ほうが いいですよ。': 'Salah: Ini memberi nasihat kepada penanya, padahal penanya menanyakan kebiasaanmu.',
          '手【て】を 洗【あら】う つもりでした。': 'Salah: 〜つもりでした berarti berniat di masa lalu tetapi tidak terealisasi.',
          '風邪【かぜ】を ひく ことに しました。': 'Konyol/Salah: Ini berarti "saya memutuskan untuk masuk angin".'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menceritakan komitmen kedisiplinan dan rutinitas belajar mandiri di Jepang.',
      situation: 'Ditanya oleh mentor kerja mengenai rutinitas belajar bahasa Jepang di asrama.',
      promptTask: 'Katakan bahwa kamu membiasakan diri menghafal 5 kanji setiap malam!',
      modelAnswer: '毎晩【まいばん】漢字【かんじ】を 五【いつ】つ 覚【おぼ】える ことに しています。',
      modelAnswerId: 'Setiap malam saya membiasakan diri menghafal 5 buah kanji.',
      culturalEtiquette: 'Tunjukkan kesungguhan tekad belajar dengan intonasi mantap dan santun.',
      skillUnlocked: ['Mampu menyatakan komitmen disiplin pribadi dengan 〜ことにしている', 'Mampu membedakan tekad internal vs aturan eksternal']
    },
    pocket_summary: {
      keyFormula: '[V-Kamus / V-Nai] ことに している (disiplin) / ように している (upaya)',
      coreWords: ['きそく', 'けんこう', 'じこかんり', 'つづける'],
      coreWarning: 'Gunakan bentuk kamus atau nai sebelum koto ni shite iru; jangan gunakan bentuk masu.',
      quickDialogue: 'A: 何か気をつけていますか。 → B: 野菜を食べるようにしています。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 2: Rekomendasi, Saran & Derajat Berlebih
  // ─────────────────────────────────────────────────────────────
  'les-n4-u02-01': {
    pedagogical_framework: {
      what: {
        summary: 'Memberikan saran atau rekomendasi kuat (〜ほうがいい) dan saran alternatif santun (〜たらどうですか).',
        canDo: 'Bisa menasihati rekan kerja yang menghadapi masalah atau kelelahan secara empatik dan tepat tata krama.',
        targetPatterns: [
          '[Verba Bentuk-Ta] ほう が いい (lebih baik melakukan)',
          '[Verba Bentuk-Nai] ほう が いい (lebih baik jangan)',
          '[Verba Bentuk-Tara] どうですか (bagaimana kalau)'
        ],
        coreVocabSample: ['くすり', 'びょういん', 'ねつ', 'むり', 'やすむ', 'そうだん', 'しんぱい']
      },
      sensei_context: {
        sceneIntro: 'Di area kerja kantor atau pabrik. Kenji melihat Budi batuk dan pucat saat jam istirahat. Kenji memberikan saran ramah agar Budi segera berobat atau istirahat.',
        dailyMission: 'Mampu menyusun kalimat saran afirmatif (V-ta hou ga ii) dan preventif (V-nai hou ga ii), serta mengajak konsultasi santun (tara dou desu ka).',
        whyOrder: 'Setelah bisa menyatakan komitmen diri di Unit 1, Unit 2 melatih empati sosial: merekomendasikan tindakan terbaik kepada orang lain.'
      },
      cultural_notes: {
        title: 'Etika Memberi Nasihat di Jepang: Jangan Terkesan Menggurui',
        etiquette: 'Pola 〜ほうがいい memiliki nuansa nasihat yang cukup tegas. Kepada atasan, jangan gunakan 〜ほうがいい karena terdengar seperti mendikte atasan. Gunakan 〜てはいかがでしょうか atau pertanyaan halus.',
        taboos: 'Hindari mengatakan "〜しなければならない" (harus) saat memberi saran kasual; kalimat tersebut terlalu kaku dan mengintimidasi.'
      },
      pronunciation_tips: {
        title: 'Pelafalan Frasa "Hou ga ii"',
        moraNote: '"Hou" (ほう) adalah vokal panjang 2 mora (ho-o). "Ii" (いい) adalah 2 mora (i-i). Jaga ketukan stabil.',
        soundTip: 'Akhiri kalimat nasihat dengan partikel lembut "yo" atau "ne" (〜ほうがいいですよ) agar terdengar peduli dan hangat.'
      },
      common_pitfalls: [
        {
          title: 'Memakai Bentuk Kamus Sebelum "Hou ga ii" Afirmatif',
          caseScenario: 'Refleks menggunakan bentuk kamus "iku hou ga ii" untuk saran pergi ke dokter.',
          pitfallWarning: '"病院【びょういん】へ 行【い】く ほう が いいです。" (Kurang baku)',
          rightSolution: '"病院【びょういん】へ 行【い】った ほう が いいです。" (Baku & Alami)',
          explanation: 'Dalam bahasa Jepang standar, saran afirmatif (melakukan sesuatu) wajib menggunakan verba bentuk lampau (Bentuk-Ta) sebelum ほうがいい.'
        },
        {
          title: 'Salah Bentuk pada Kalimat Saran Negatif (Jangan Melakukan)',
          caseScenario: 'Menggunakan bentuk lampau negatif "nakatta hou ga ii" padahal saran untuk masa depan.',
          pitfallWarning: '"無理【むり】を しなかった ほう が いいですよ。" (Bermakna penyesalan masa lalu)',
          rightSolution: '"無理【むり】を しない ほう が いいですよ。" (Saran untuk sekarang/depan)',
          explanation: 'Untuk saran melarang (lebih baik jangan), gunakan bentuk masa kini negatif (Naikei) + ほうがいい.'
        }
      ],
      who_and_when: {
        situational_context: 'Saat melihat rekan kerja sakit, kelelahan, atau bingung menentukan keputusan.',
        social_relations: 'Sangat cocok untuk rekan sejawat, bawahan, atau sesama teman pembelajar. Kepada atasan gunakan bentuk usulan keigo.',
        when_not_to_use: 'Jangan gunakan bentuk 〜ほうがいい kepada direktur atau manajer perusahaan secara langsung.'
      },
      scenario: {
        title: 'Saran Empatik Saat Rekan Kerja Demam',
        setting: 'Ruang loker karyawan, pukul 16.30',
        narrative: 'Kenji menyadari Budi bersin-bersin dan badannya hangat menjelang akhir jam kerja.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: 'ブディ、顔色【かおいろ】が 悪【わる】いよ。熱【ねつ】が あるんじゃない？', furigana: 'ブディ、顔色が 悪いよ。熱が あるんじゃない？', romaji: 'Budi, kaoiro ga warui yo. Netsu ga arun janai?', idText: 'Budi, wajahmu pucat lho. Jangan-jangan kamu demam?' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'ちょっと 頭【あたま】が 痛【いた】くて、寒気【さむけ】が します。', furigana: 'ちょっと 頭が 痛くて、寒気が します。', romaji: 'Chotto atama ga itakute, samuke ga shimasu.', idText: 'Agak sakit kepala dan merasa menggigil.' },
      { id: 'd3', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: 'それは 大変【たいへん】だ。今日【きょう】は 残業【ざんぎょう】しないで、早【はや】く 帰【かえ】った ほう が いいよ。', furigana: 'それは 大変だ。今日は 残業しないで、早く 帰った ほう が いいよ。', romaji: 'Sore wa taihen da. Kyou wa zangyou shinaide, hayaku kaetta hou ga ii yo.', idText: 'Wah gawat tuh. Hari ini lebih baik tidak lembur dan pulang lebih awal.' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'でも、まだ 明日【あした】の 準備【じゅんび】が 残【のこ】っています。', furigana: 'でも、まだ 明日の 準備が 残っています。', romaji: 'Demo, mada ashita no junbi ga nokotte imasu.', idText: 'Tapi, masih tersisa persiapan untuk besok.' },
      { id: 'd5', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: '準備【じゅんび】は 私【わたし】たちが やるから、無理【むり】を しない ほう が いいですよ。', furigana: '準備は 私たちが やるから、無理を しない ほう が いいですよ。', romaji: 'Junbi wa watashitachi ga yaru kara, muri o shinai hou ga ii desu yo.', idText: 'Persiapan biar kami yang kerjakan, jadi lebih baik jangan memaksakan diri ya.' },
      { id: 'd6', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: '田中【たなか】リーダーに 相談【そうだん】して、病院【びょういん】へ 行【い】ったら どう？', furigana: '田中リーダーに 相談して、病院へ 行ったら どう？', romaji: 'Tanaka-ri-da- ni soudan shite, byouin e ittara dou?', idText: 'Bagaimana kalau konsultasi ke Leader Tanaka, lalu pergi ke klinik?' },
      { id: 'd7', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'お言葉【ことば】に 甘【あま】えて、そうします。ご心配【しんぱい】を かけました。', furigana: 'お言葉に 甘えて、そうします。ご心配を かけました。', romaji: 'Okotoba ni amaete, sou shimasu. Goshinpai o kakemashita.', idText: 'Atas kebaikan kalian, saya akan ikuti saran itu. Maaf sudah membuat khawatir.' },
      { id: 'd8', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: 'お大事【だいじ】に！温【あたた】かくして ゆっくり 休【やす】んでくださいね。', furigana: 'お大事に！温かくして ゆっくり 休んでくださいね。', romaji: 'Odaiji ni! Atatakaku shite yukkuri yasunde kudasai ne.', idText: 'Semoga lekas sembuh! Hangatkan tubuh dan istirahatlah dengan tenang ya.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah ungkapan empati yang diucapkan kepada orang yang sedang sakit.',
        sentencePrompt: 'Saat mendengar rekan kerja sakit atau izin berobat, ucapan santun standar bahasa Jepang adalah:',
        options: ['お大事【だいじ】に (Semoga lekas sembuh)', 'ごちそうさまでした (Terima kasih atas hidangannya)', 'お邪魔【じゃま】します (Permisi mengganggu)', '遠慮【えんりょ】しないで (Jangan sungkan)'],
        correctAnswer: 'お大事【だいじ】に (Semoga lekas sembuh)',
        explanation: '"お大事に (odaiji ni)" adalah singkatan santun dari "どうぞお体を大事になさってください" (jaga diri baik-baik / semoga lekas sembuh).',
        diagnosticFeedback: {
          'ごちそうさまでした (Terima kasih atas hidangannya)': 'Salah: Diucapkan setelah selesai makan.',
          'お邪魔【じゃま】します (Permisi mengganggu)': 'Salah: Diucapkan saat bertamu ke rumah orang.',
          '遠慮【えんりょ】しないで (Jangan sungkan)': 'Salah: Diucapkan saat menawarkan makanan atau bantuan.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Isian Bentuk Verba): Pilihlah bentuk verba yang tepat untuk saran afirmatif "lebih baik minum obat ini".',
        sentencePrompt: 'この 薬【くすり】を _____ ほう が いいですよ。',
        options: ['飲【の】んだ', '飲【の】む', '飲【の】みます', '飲【の】んで'],
        correctAnswer: '飲【の】んだ',
        explanation: 'Saran tindakan afirmatif memerlukan bentuk lampau kasual (Bentuk-Ta) sebelum ほうがいい: 飲んだ ほうがいい.',
        diagnosticFeedback: {
          '飲【の】む': 'Salah: Bentuk kamus kurang tepat untuk rekomendasi saran kuat bahasa Jepang standar.',
          '飲【の】みます': 'Salah: Bentuk masu tidak boleh diletakkan di depan kata benda/frasa ほう.',
          '飲【の】んで': 'Salah: Bentuk te digunakan sebelum kudasai, bukan ほうがいい.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun potongan kalimat berikut untuk menyarankan tidak memaksakan diri bekerja malam ini.',
        sentencePrompt: 'Susunan saran negatif yang tepat:',
        options: [
          '今夜【こんや】は 無理【むり】を しない ほう が いいです',
          '無理【むり】を 今夜【こんや】は ほう が いいです しない',
          'しない ほう が いいです 今夜【こんや】は 無理【むり】を',
          '今夜【こんや】は ほう が いいです 無理【むり】を しない'
        ],
        correctAnswer: '今夜【こんや】は 無理【むり】を しない ほう が いいです',
        explanation: 'Keterangan waktu (今夜は) + Objek (無理を) + Verba Naikei (しない) + ほうがいいです.',
        diagnosticFeedback: {
          '無理【むり】を 今夜【こんや】は ほう が いいです しない': 'Salah: Kata kerja しない terpisah di ujung setelah predikat.',
          'しない ほう が いいです 今夜【こんや】は 無理【むり】を': 'Salah: Predikat saran ditaruh di awal kalimat.',
          '今夜【こんや】は ほう が いいです 無理【むり】を しない': 'Salah: Frasa ほうがいい ditaruh sebelum kata kerja yang diterangkan.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Rekomendasi Santun): Manakah kalimat saran yang paling halus dan mengajak dengan pola 〜たらどうですか?',
        sentencePrompt: 'Pilihlah bentuk ajakan saran yang paling tepat:',
        options: [
          '少【すこ】し 横【よこ】に なったら どうですか。',
          '少【すこ】し 横【よこ】に なれば どうですか。',
          '少【すこ】し 横【よこ】に なると どうですか。',
          '少【すこ】し 横【よこ】に なるなら どうですか。'
        ],
        correctAnswer: '少【すこ】し 横【よこ】に なったら どうですか。',
        explanation: 'Pola usulan alternatif menggunakan bentuk Tara-kei: 〜たら どうですか (bagaimana kalau berbaring sebentar).',
        diagnosticFeedback: {
          '少【すこ】し 横【よこ】に なれば どうですか。': 'Salah: Bentuk ba-kei tidak berpasangan dengan どうですか untuk membuat usulan saran.',
          '少【すこ】し 横【よこ】に なると どうですか。': 'Salah: Bentuk to (pengandaian pasti/alamiah) tidak bisa dipasangkan dengan dou desu ka.',
          '少【すこ】し 横【よこ】に なるなら どうですか。': 'Salah: Bentuk nara memerlukan topik syarat kontekstual lawan bicara.'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Rekan kerjamu tampak tersesat mencari stasiun kereta. Saran terbaikmu:',
        sentencePrompt: 'Pilihlah kalimat rekomendasi yang paling tepat:',
        options: [
          '交番【こうばん】で 道【みち】を 聞【き】いた ほう が いいですよ。',
          '交番【こうばん】で 道【みち】を 聞【き】かない ほう が いいですよ。',
          '道【みち】を 迷【まよ】う ことに しました。',
          '道【みち】を 聞【き】く つもりでした。'
        ],
        correctAnswer: '交番【こうばん】で 道【みち】を 聞【き】いた ほう が いいですよ。',
        explanation: 'Menyarankan tindakan positif yang solutif (lebih baik bertanya jalan di pos polisi) menggunakan Bentuk-Ta + ほうがいいですよ.',
        diagnosticFeedback: {
          '交番【こうばん】で 道【みち】を 聞【き】かない ほう が いいですよ。': 'Salah/Konyol: Berarti "lebih baik jangan bertanya jalan di pos polisi".',
          '道【みち】を 迷【まよ】う ことに しました。': 'Salah: Berarti "saya memutuskan untuk tersesat di jalan".',
          '道【みち】を 聞【き】く つもりでした。': 'Salah: Menyatakan niat lampau pembicara, bukan saran untuk teman.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menasihati rekan kerja yang menghadapi masalah secara empatik.',
      situation: 'Melihat rekan magang tidak enak badan saat bekerja.',
      promptTask: 'Sarankan agar dia segera minum air hangat dan pulang istirahat!',
      modelAnswer: '温【あたた】かい 水【みず】を 飲【の】んで、早【はや】く 帰【かえ】った ほう が いいですよ。',
      modelAnswerId: 'Lebih baik minum air hangat lalu pulang lebih awal lho.',
      culturalEtiquette: 'Gunakan nada suara hangat dengan akhiran sopan desu yo.',
      skillUnlocked: ['Menguasai pemberian saran afirmatif (V-ta hou ga ii)', 'Menguasai usulan santun (V-tara dou desu ka)']
    },
    pocket_summary: {
      keyFormula: 'Saran Lakukan: [V-Ta] ほう が いい / Saran Jangan: [V-Nai] ほう が いい',
      coreWords: ['くすり', 'ねつ', 'むり', 'そうだん', 'おだいじに'],
      coreWarning: 'Ingat rumus: V-ta untuk saran positif, V-nai untuk saran larangan.',
      quickDialogue: 'A: 熱があります。 → B: 早く病院へ行ったほうがいいですよ。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Derajat Berlebih & Tujuan Tindakan
  // ─────────────────────────────────────────────────────────────
  'les-n4-u02-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menyatakan tindakan melampaui batas kewajaran (〜すぎる), serta membedakan tujuan tindakan berorientasi kehendak (〜ために) vs target kondisi kemampuan (〜ように).',
        canDo: 'Bisa menjelaskan tindakan korektif saat bekerja terlalu lelah, serta mengungkapkan target tujuan belajar dan bekerja.',
        targetPatterns: [
          '[Masu-Stem / Kata Sifat] すぎる (terlalu berlebihan)',
          '[Kata Benda] の ために / [Verba Kamus Volisional] ために (demi / untuk tujuan)',
          '[Verba Potensial / Non-Volisional] ように (agar / supaya menjadi)'
        ],
        coreVocabSample: ['はたらく', 'つかれる', 'ごうかく', 'めざす', 'しっぱい', 'ちゅうい', 'ねむい']
      },
      sensei_context: {
        sceneIntro: 'Di ruang evaluasi kerja mingguan. Tanaka-senpai memperhatikan Budi bekerja sangat keras hingga lembur berlebihan, lalu memberikan arahan mengenai efisiensi dan tujuan karier.',
        dailyMission: 'Mampu menggunakan pola 〜すぎる untuk memperingatkan batas kelelahan, dan membedakan penggunaan 〜ために vs 〜ように secara akurat.',
        whyOrder: 'Setelah bisa memberikan saran di Lesson 1, pembelajar harus mampu menganalisis alasan di balik kelelahan (terlalu banyak) dan tujuan perbaikan (agar bisa lulus ujian).'
      },
      cultural_notes: {
        title: 'Bahaya Karoushi (過労死) dan Gerakan Work-Life Balance di Jepang Modern',
        etiquette: 'Dahulu lembur dipandang sebagai bukti loyalitas, namun perusahaan Jepang modern sangat ketat melarang jam kerja berlebih demi mencegah kelelahan fatal. Melaporkan bahwa pekerjaan "terlalu berat" (haitatsu ga oosugiru) adalah tindakan preventif yang bertanggung jawab.',
        taboos: 'Jangan memakai 〜ために untuk kata kerja kemampuan atau kata kerja negatif (seperti goukaku dekiru tame ni / wasurenai tame ni); situasi tersebut wajib memakai 〜ように.'
      },
      pronunciation_tips: {
        title: 'Penekanan Aksentuasi pada Pola "Sugiru"',
        moraNote: 'Kata "sugiru" bergabung langsung dengan akar kata: Hatara-ki-su-gi-ru (6 mora). Tidak ada jeda spasi.',
        soundTip: 'Pada kata sifat-i: buang [i], lalu sambung: Takai -> Taka-sugiru, Samui -> Samu-sugiru.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ために (Volisional) vs 〜ように (Kondisi/Potensial)',
          caseScenario: 'Mengatakan "Demi bisa membeli mobil" menggunakan tame ni.',
          pitfallWarning: '"車【くるま】が 買【か】える ために、貯金【ちょきん】します。" (Salah)',
          rightSolution: '"車【くるま】が 買【か】える ように、貯金【ちょきん】します。" (Benar)',
          explanation: 'Verba potensial (買える) menunjukkan kondisi kemampuan, bukan tindakan kemauan langsung. Kata kerja kemampuan selalu dipasangkan dengan 〜ように.'
        },
        {
          title: 'Lupa Menghilangkan Akhiran [I] pada Kata Sifat Sebelum Sugiru',
          caseScenario: 'Menggabungkan bentuk utuh takai ke sugiru: "takaisugiru".',
          pitfallWarning: '"この 荷物【にもつ】は 重【おも】いすぎます。"',
          rightSolution: '"この 荷物【にもつ】は 重【おも】すぎます。"',
          explanation: 'Pada kata sifat-i, huruf [i] terakhir wajib dibuang sebelum disambung dengan 〜すぎる (Omoi -> Omosugiru).'
        }
      ],
      who_and_when: {
        situational_context: 'Saat briefing evaluasi beban kerja, konsultasi kesehatan, atau menyusun target rencana studi magang.',
        social_relations: 'Ragam sopan (Teineigo) yang tepat dalam diskusi formal dengan atasan dan mentor.',
        when_not_to_use: 'Jangan gunakan 〜すぎる sebagai pujian murni kepada atasan, karena kata ini berkonotasi melampaui batas wajar/bermasalah.'
      },
      scenario: {
        title: 'Evaluasi Beban Kerja & Target Ujian JLPT',
        setting: 'Ruang rapat departemen, pukul 17.30',
        narrative: 'Tanaka-senpai mengingatkan Budi agar tidak bekerja terlalu larut demi menjaga stamina ujian.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: 'ブディさん、最近【さいきん】残業【ざんぎょう】が 多【おお】すぎますよ。大丈夫【だいじょうぶ】ですか。', furigana: 'ブディさん、最近残業が 多すぎますよ。大丈夫ですか。', romaji: 'Budi-san, saikin zangyou ga oosugimasu yo. Daijoubu desu ka.', idText: 'Budi-san, akhir-akhir ini lemburnya terlalu banyak lho. Apakah kamu baik-baik saja?' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '田中【たなか】さん、すみません。仕事【しごと】を 覚【おぼ】える ために、頑張【がんば】りすぎてしまいました。', furigana: '田中さん、すみません。仕事を 覚える ために、頑張りすぎてしまいました。', romaji: 'Tanaka-san, sumimasen. Shigoto o oboeru tame ni, gambarisugite shimaimashita.', idText: 'Tanaka-san, mohon maaf. Demi menguasai pekerjaan, saya jadi terlalu memaksakan diri berusaha.' },
      { id: 'd3', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: '熱心【ねっしん】なのは いいですが、働【はたら】きすぎると 集中力【しゅうちゅうりょく】が 落【お】ちて ミスが 増【ふ】えます。', furigana: '熱心なのは いいですが、働きすぎると 集中力が 落ちて ミスが 増えます。', romaji: 'Nesshin na no wa ii desu ga, hatarakisugiru to shuuchuuryoku ga ochite misu ga fuemasu.', idText: 'Bersemangat itu bagus, tapi kalau bekerja terlalu keras konsentrasi akan turun dan kesalahan meningkat.' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、昨日【きのう】も 眠【ねむ】すぎて レポートの 数字【すうじ】を 間違【まちが】えてしまいました。', furigana: 'はい、昨日も 眠すぎて レポートの 数字を 間違えてしまいました。', romaji: 'Hai, kinou mo nemusugite repo-to no suuji o machigaete shimaimashita.', idText: 'Iya, kemarin pun karena terlalu mengantuk saya sempat salah mengisi angka laporan.' },
      { id: 'd5', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: '失敗【しっぱい】を 防【ふせ】ぐ ように、確認【かくにん】チェックリストを 作【つく】りましょう。', furigana: '失敗を 防ぐ ように、確認チェックリストを 作りましょう。', romaji: 'Shippai o fusegu you ni, kakunin chekkurisuto o tsukurimashou.', idText: 'Agar bisa mencegah kesalahan, mari kita buat daftar periksa konfirmasi.' },
      { id: 'd6', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'ありがとうございます！試験【しけん】に 合格【ごうかく】できる ように、体調【たいちょう】も 整【ととの】えます。', furigana: 'ありがとうございます！試験に 合格できる ように、体調も 整えます。', romaji: 'Arigatou gozaimasu! Shiken ni goukaku dekiru you ni, taichou mo totonoemasu.', idText: 'Terima kasih banyak! Agar bisa lulus ujian, saya juga akan mengatur kondisi fisik.' },
      { id: 'd7', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: 'その 心意気【こころいき】です！夢【ゆめ】の ために、まずは 体【からだ】を 大切【たいせつ】にしてください。', furigana: 'その 心意気です！夢の ために、まずは 体を 大切にしてください。', romaji: 'Sono kokoroiki desu! Yume no tame ni, mazu wa karada o taisetsu ni shite kudasai.', idText: 'Itu baru semangat yang tepat! Demi impianmu, pertama-tama jagalah tubuhmu baik-baik.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah makna kata sifat "眠い (ねむい)" saat digabungkan menjadi "眠すぎる".',
        sentencePrompt: 'Frasa "眠すぎる (ねむすぎる)" artinya:',
        options: ['Terlalu mengantuk', 'Terlalu malas', 'Terlalu lapar', 'Terlalu dingin'],
        correctAnswer: 'Terlalu mengantuk',
        explanation: 'Nemui (mengantuk) dibuang [i] + sugiru -> Nemusugiru (terlalu mengantuk).',
        diagnosticFeedback: {
          'Terlalu malas': 'Salah: Malas adalah めんどくさい atau 怠惰 (taida).',
          'Terlalu lapar': 'Salah: Lapar adalah お腹が空きすぎる (onaka ga skisugiru).',
          'Terlalu dingin': 'Salah: Dingin adalah 寒すぎる (samusugiru).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pembedaan Pola): Lengkapi rumpang kalimat berikut dengan penghubung tujuan yang tepat untuk verba potensial "話せる (bisa berbicara)".',
        sentencePrompt: '日本語【にほんご】が 上手【じょうず】に 話【はな】せる _____、毎日【まいにち】練習【れんしゅう】しています。',
        options: ['ように', 'ために', 'ので', 'から'],
        correctAnswer: 'ように',
        explanation: 'Kata kerja bentuk potensial (話せる = bisa berbicara) menunjukkan kondisi kemampuan, sehingga wajib berpasangan dengan ように, bukan ために.',
        diagnosticFeedback: {
          'ために': 'Salah: ために hanya dipasangkan dengan kata kerja volisional/kehendak tindakan langsung, bukan potensial.',
          'ので': 'Salah: ので menyatakan sebab-akibat alasan masa lalu/sekarang, bukan tujuan ke depan.',
          'から': 'Salah: から menyatakan alasan, bukan target maksud perbuatan.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susunlah potongan kalimat untuk menyatakan makan terlalu banyak saat pesta makan malam.',
        sentencePrompt: 'Susunan kalimat yang tepat:',
        options: [
          '晩【ばん】ごはんを 食【た】べすぎて お腹【なか】が 痛【いた】いです',
          'お腹【なか】が 食【た】べすぎて 晩【ばん】ごはんを 痛【いた】いです',
          '食【た】べすぎて 痛【いた】いです 晩【ばん】ごはんを お腹【なか】が',
          '晩【ばん】ごはんを 痛【いた】いです お腹【なか】が 食【た】べすぎて'
        ],
        correctAnswer: '晩【ばん】ごはんを 食【た】べすぎて お腹【なか】が 痛【いた】いです',
        explanation: 'Objek (晩ごはんを) + Verba-Te Sugite (食べすぎて) + Akibat (お腹が痛いです).',
        diagnosticFeedback: {
          'お腹【なか】が 食【た】べすぎて 晩【ばん】ごはんを 痛【いた】いです': 'Salah: Urutan klausa terbalik sehingga makna rancu.',
          '食【た】べすぎて 痛【いた】いです 晩【ばん】ごはんを お腹【なか】が': 'Salah: Predikat rasa sakit ditaruh sebelum objek kalimat.',
          '晩【ばん】ごはんを 痛【いた】いです お腹【なか】が 食【た】べすぎて': 'Salah: Pola sebab-akibat berantakan.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Jebakan Kata Sifat): Manakah penggabungan kata sifat-na "簡単 (かんたん)" dengan pola "すぎる" yang benar?',
        sentencePrompt: 'Pilihlah bentuk yang tepat:',
        options: [
          'この 問題【もんだい】は 簡単【かんたん】すぎます。',
          'この 問題【もんだい】は 簡単【かんたん】なすぎます。',
          'この 問題【もんだい】は 簡単【かんたん】だすぎます。',
          'この 問題【もんだい】は 簡単【かんたん】にすぎます。'
        ],
        correctAnswer: 'この 問題【もんだい】は 簡単【かんたん】すぎます。',
        explanation: 'Pada kata sifat-na, buang akhiran な/だ dan langsung tempelkan すぎる: 簡単 + すぎます = 簡単すぎます.',
        diagnosticFeedback: {
          'この 問題【もんだい】は 簡単【かんたん】なすぎます。': 'Jebakan: Huruf な tidak boleh dipertahankan sebelum すぎる.',
          'この 問題【もんだい】は 簡単【かんたん】だすぎます。': 'Jebakan: Kopula だ tidak boleh disisipkan sebelum すぎる.',
          'この 問題【もんだい】は 簡単【かんたん】にすぎます。': 'Jebakan: に すぎます memiliki arti lain sama sekali ("hanya/sekadar").'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Atasan melihat tumpukan dokumen di mejamu dan bertanya "書類【しょるい】の 量【りょう】は どうですか". Jawaban jika kamu kewalahan:',
        sentencePrompt: 'Pilihlah tanggapan yang sopan dan jelas:',
        options: [
          '一人【ひとり】では 多【おお】すぎますので、手伝【てつだ】って いただけますか。',
          '一人【ひとり】では 少【すく】なすぎますので、もっと ください。',
          '書類【しょるい】を 覚【おぼ】える ために、食【た】べすぎました。',
          '書類【しょるい】の ために、病院【びょういん】へ 行【い】った ほう が いいです。'
        ],
        correctAnswer: '一人【ひとり】では 多【おお】すぎますので、手伝【てつだ】って いただけますか。',
        explanation: 'Menyatakan bahwa jumlahnya terlalu banyak (oosugimasu) dan memohon bantuan secara sopan.',
        diagnosticFeedback: {
          '一人【ひとり】では 少【すく】なすぎますので、もっと ください。': 'Salah: Ini berarti "terlalu sedikit, tolong beri lagi".',
          '書類【しょるい】を 覚【おぼ】える ために、食【た】べすぎました。': 'Konyol/Salah: "Demi mengingat dokumen, saya terlalu banyak makan".',
          '書類【しょるい】の ために、病院【びょういん】へ 行【い】った ほう が いいです。': 'Salah: Konteks tidak nyambung.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menjelaskan tindakan korektif saat bekerja terlalu lelah.',
      situation: 'Melaporkan kepada supervisor bahwa beban kerja hari ini melebihi kapasitas.',
      promptTask: 'Katakan bahwa barangnya terlalu berat sehingga kamu butuh bantuan!',
      modelAnswer: 'この 荷物【にもつ】は 重【おも】すぎますので、手伝【てつだ】ってください。',
      modelAnswerId: 'Barang ini terlalu berat, jadi tolong bantu saya.',
      culturalEtiquette: 'Ucapkan dengan sopan tanpa terkesan mengeluh emosional.',
      skillUnlocked: ['Menguasai pola berlebih 〜すぎる', 'Mampu membedakan tujuan 〜ために vs 〜ように']
    },
    pocket_summary: {
      keyFormula: '[V-Stem / Adj] すぎる (berlebih) | [Potensial/Nai] ように (target kondisi)',
      coreWords: ['はたらく', 'つかれる', 'しっぱい', 'めざす'],
      coreWarning: 'Kata kerja potensial (bisa/mampu) selalu memakai ように, bukan ために.',
      quickDialogue: 'A: どうして練習しますか。 → B: 上手に話せるように練習します。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 3: Potensial, Kapasitas & Perubahan Diri
  // ─────────────────────────────────────────────────────────────
  'les-n4-u03-01': {
    pedagogical_framework: {
      what: {
        summary: 'Pola pembentukan kata kerja bentuk potensial (可能形 kanoukei) untuk menyatakan kemampuan/izin, serta membedakan persepsi indra spontan (聞こえる / 見える) vs tindakan aktif (聞く / 見る).',
        canDo: 'Bisa menjelaskan keterampilan operasional dan melaporkan suara mesin yang terdengar aneh di tempat kerja.',
        targetPatterns: [
          '[Verba Bentuk-Potensial] (bisa / dapat melakukan)',
          '[Kata Benda] が 聞【き】こえる (terdengar secara spontan)',
          '[Kata Benda] が 見【み】える (terlihat secara spontan)'
        ],
        coreVocabSample: ['はなせる', 'よめる', 'きこえる', 'みえる', 'おと', 'きかい', 'こしょう']
      },
      sensei_context: {
        sceneIntro: 'Di area pabrik atau bengkel kerja. Kenji dan Budi sedang mengecek mesin pemotong. Budi mendengar suara gemertak ganjil dari arah motor penggerak.',
        dailyMission: 'Mampu mengonjugasikan kata kerja ke bentuk potensial (bisa mengoperasikan mesin) dan menggunakan partikel が bersama きこえる / みえる.',
        whyOrder: 'Kemampuan teknis dan pelaporan anomali sensorik (suara aneh terdengar) adalah keterampilan hidup paling krusial bagi tenaga magang di industri Jepang.'
      },
      cultural_notes: {
        title: 'Pelaporan Bahaya Indra (五感による異常検知) di Pabrik Jepang',
        etiquette: 'Ketika mendengar suara abnormal, operator Jepang pantang mendiamkannya. Mengatakan "Hen na oto ga kikoemasu" (Terdengar suara aneh) adalah tanda kepekaan K3 yang sangat dihargai.',
        taboos: 'Partikel penanda objek pada bentuk potensial dan persepsi spontan berubah dari を menjadi が: "Nihongo GA hanaseru", "Oto GA kikoeru". Jangan memakai を!'
      },
      pronunciation_tips: {
        title: 'Konjugasi Vokal e Panjang pada Ichidan',
        moraNote: 'Pada verba Ichidan (Golongan 2): Taberu -> Taberareru (5 mora). Dalam percakapan santai modern sering dipersingkat menjadi "Tabereru" (Ra-nuki kotoba), namun dalam tes JLPT wajib bentuk utuh.',
        soundTip: 'Kikoeru dilafalkan mengalir 4 mora: ki-ko-e-ru. Jangan ditekan pada akhiran ru.'
      },
      common_pitfalls: [
        {
          title: 'Memakai Partikel を untuk Objek Bentuk Potensial & Kikoeru/Mieru',
          caseScenario: 'Refleks mentransfer objek "o" ke kalimat kemampuan: "Nihongo o hanasemasu".',
          pitfallWarning: '"私【わたし】は 日本語【にほんご】を 話【はな】せます。" (Kurang alami)',
          rightSolution: '"私【わたし】は 日本語【にほんご】が 話【はな】せます。" (Alami & Baku)',
          explanation: 'Bentuk potensial dan verba persepsi spontan (kikoeru, mieru) menuntut partikel penanda subjek kemampuan が.'
        },
        {
          title: 'Tertukar Antara 見える (Spontan) vs 見られる (Kemampuan/Peluang)',
          caseScenario: 'Ingin mengatakan "Dari sini kita bisa menonton film" menggunakan mieru.',
          pitfallWarning: '"ここから 映画【えいが】が 見【み】えます。" (Salah konteks)',
          rightSolution: '"ここから 映画【えいが】が 見【み】られます。" (Bisa menonton)',
          explanation: '見える berarti objek masuk ke pandangan mata secara alami tanpa usaha (seperti gunung terlihat). Menonton film adalah aktivitas berkesadaran, maka gunakan 見られる.'
        }
      ],
      who_and_when: {
        situational_context: 'Pemeriksaan operasional mesin di pabrik, percakapan kemampuan bahasa, atau pelaporan anomali lingkungan.',
        social_relations: 'Ragam sopan standar (Teineigo) yang penting saat berkoordinasi dengan mekanik atau pimpinan tim.',
        when_not_to_use: 'Jangan memakai kata potensial "dekimasu" secara berlebihan tanpa menyebutkan keterampilan spesifiknya.'
      },
      scenario: {
        title: 'Deteksi Suara Aneh pada Mesin Produksi',
        setting: 'Lantai produksi pabrik komponen otomotif, pukul 10.15',
        narrative: 'Budi mendengar suara berisik dari mesin nomor 3 dan langsung memberi tahu Kenji.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'ケンジさん、ちょっと 来【き】てください。変【へん】な 音【おと】が 聞【き】こえます。', furigana: 'ケンジさん、ちょっと 来てください。変な 音が 聞こえます。', romaji: 'Kenji-san, chotto kite kudasai. Hen na oto ga kikoemasu.', idText: 'Kenji-san, tolong ke sini sebentar. Terdengar suara aneh.' },
      { id: 'd2', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: 'えっ、本当【ほんとう】？どこから 聞【き】こえる？', furigana: 'えっ、本当？どこから 聞こえる？', romaji: 'E, hontou? Doko kara kikoeru?', idText: 'Eh, sungguhan? Terdengar dari mana?' },
      { id: 'd3', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '３号機【さんごうき】の モーターの あたりから カタカタと 聞【き】こえます。', furigana: '３号機の モーターの あたりから カタカタと 聞こえます。', romaji: 'Sangouki no mo-ta- no atari kara katakata to kikoemasu.', idText: 'Dari sekitar motor mesin nomor 3 terdengar bunyi gemertak.' },
      { id: 'd4', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: '危【あぶ】ないね。すぐに 非常停止【ひじょうていし】ボタンが 押【お】せる？', furigana: '危ないね。すぐに 非常停止ボタンが 押せる？', romaji: 'Abunai ne. Sugu ni hijou teishi botan ga oseru?', idText: 'Bahaya itu ya. Apakah kamu bisa segera menekan tombol henti darurat?' },
      { id: 'd5', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、押【お】せます！すぐ 止【と】めました。', furigana: 'はい、押せます！すぐ 止めました。', romaji: 'Hai, osemasu! Sugu tomemashita.', idText: 'Ya, saya bisa menekan! Sudah langsung saya matikan.' },
      { id: 'd6', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: 'よく 気【き】がつきましたね！早【はや】く 発見【はっけん】できたので 事故【じこ】が 防【ふせ】げました。', furigana: 'よく 気がつきましたね！早く 発見できたので 事故が 防げました。', romaji: 'Yoku ki ga tsukimashita ne! Hayaku hakken dekita node jiko ga fusegemashita.', idText: 'Bagus sekali kamu menyadarinya! Karena bisa cepat ditemukan, kecelakaan bisa dicegah.' },
      { id: 'd7', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'よかったです！マニュアルの 警告【けいこく】が 読【よ】める ように 勉強【べんきょう】していました。', furigana: 'よかったです！マニュアルの 警告が 読める ように 勉強していました。', romaji: 'Yokatta desu! Manyuaru no keikoku ga yomeru you ni benkyou shite imashita.', idText: 'Syukurlah! Saya memang sudah belajar agar bisa membaca peringatan manual.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah arti kata "非常停止 (ひじょうていし)".',
        sentencePrompt: 'Istilah K3 "非常停止" pada panel mesin pabrik berarti:',
        options: ['Penghentian darurat', 'Pemeriksaan rutin mingguan', 'Penyesuaian kecepatan putar', 'Pengisian daya listrik'],
        correctAnswer: 'Penghentian darurat',
        explanation: '"非常 (hijou = darurat)" + "停止 (teishi = henti)".',
        diagnosticFeedback: {
          'Pemeriksaan rutin mingguan': 'Salah: Pemeriksaan rutin adalah 定期点検 (teiki tenken).',
          'Penyesuaian kecepatan putar': 'Salah: Penyesuaian adalah 速度調整 (sokudo chousei).',
          'Pengisian daya listrik': 'Salah: Pengisian daya adalah 充電 (juuden).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Konjugasi Potensial): Pilihlah bentuk potensial yang tepat dari kata kerja "読む (よむ = membaca)".',
        sentencePrompt: '私【わたし】は 漢字【かんじ】の マニュアルが _____。',
        options: ['読【よ】めます', '読【よ】られます', '読【よ】せます', '読【よ】きます'],
        correctAnswer: '読【よ】めます',
        explanation: 'Yomu adalah verba Golongan 1 (Godan). Vokal akhir -u berubah menjadi baris -e: yomu -> yomemasu.',
        diagnosticFeedback: {
          '読【よ】られます': 'Salah: Akhiran -rareru hanya untuk verba Golongan 2 (Ichidan).',
          '読【よ】せます': 'Salah: Bentuk -seru adalah pembentukan kausatif, bukan potensial.',
          '読【よ】きます': 'Salah: Salah konjugasi vokal.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun potongan kata berikut untuk menyatakan bisa melihat pemandangan Gunung Fuji dari jendela kantor.',
        sentencePrompt: 'Susunan kalimat yang tepat:',
        options: [
          '窓【まど】から 富士山【ふじさん】が 見【み】えます',
          '富士山【ふじさん】が 窓【まど】から 見【み】ます',
          '見【み】えます 窓【まど】から 富士山【ふじさん】が',
          '窓【まど】から 見【み】ます 富士山【ふじさん】が'
        ],
        correctAnswer: '窓【まど】から 富士山【ふじさん】が 見【み】えます',
        explanation: 'Tempat asal (窓から) + Objek alami (富士山が) + Mieru (見える).',
        diagnosticFeedback: {
          '富士山【ふじさん】が 窓【まど】から 見【み】ます': 'Salah: Verba 見ます adalah melihat aktif berkesadaran, bukan penampakan alami.',
          '見【み】えます 窓【まど】から 富士山【ふじさん】が': 'Salah: Verba tidak boleh ditaruh di depan subjek.',
          '窓【まど】から 見【み】ます 富士山【ふじさん】が': 'Salah: Urutan kata terbalik.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Jebakan Partikel): Manakah kalimat yang menggunakan partikel penanda objek kemampuan secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang benar secara gramatikal:',
        options: [
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】が 読【よ】めます。',
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】を 読【よ】めます。',
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】で 読【よ】めます。',
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】に 読【よ】めます。'
        ],
        correctAnswer: 'ブディさんは 日本語【にほんご】の 新聞【しんぶん】が 読【よ】めます。',
        explanation: 'Bentuk kemampuan (読める) secara baku berpasangan dengan partikel が untuk menandai objek yang mampu dibaca.',
        diagnosticFeedback: {
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】を 読【よ】めます。': 'Jebakan: Partikel を kurang lazim dalam kalimat kemampuan standar JLPT N4.',
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】で 読【よ】めます。': 'Jebakan: Partikel で menandai alat atau sarana.',
          'ブディさんは 日本語【にほんご】の 新聞【しんぶん】に 読【よ】めます。': 'Jebakan: Partikel に menandai tujuan atau waktu.'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Rekan kerjamu bertanya "隣【となり】の 部屋【へや】から 何【なに】か 音【おと】が しませんか". Respons terbaik:',
        sentencePrompt: 'Pilihlah jawaban yang tepat untuk persepsi pendengaran spontan:',
        options: [
          'はい、ピアノの 音【おと】が 聞【き】こえますね。',
          'はい、ピアノの 音【おと】を 聞【き】きますね。',
          'いいえ、何【なに】も 見【み】えません。',
          'はい、ピアノを 弾【ひ】く つもりです。'
        ],
        correctAnswer: 'はい、ピアノの 音【おと】が 聞【き】こえますね。',
        explanation: 'Suara yang terdengar tanpa sengaja diungkapkan dengan 音が 聞こえます.',
        diagnosticFeedback: {
          'はい、ピアノの 音【おと】を 聞【き】きますね。': 'Salah: 聞きます berarti mendengarkan secara sengaja.',
          'いいえ、何【なに】も 見【み】えません。': 'Salah: Menjawab tentang penglihatan (mieru), padahal pertanyaannya suara.',
          'はい、ピアノを 弾【ひ】く つもりです。': 'Salah: Menjawab tentang niat pribadi memainkan piano.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menjelaskan keterampilan operasional dan melaporkan suara mesin aneh.',
      situation: 'Melaporkan kepada supervisor bahwa kamu sudah bisa mengoperasikan forklift pabrik.',
      promptTask: 'Laporkan bahwa kamu sekarang sudah bisa mengemudikan forklift!',
      modelAnswer: '私【わたし】は フォークリフトの 運転【うんてん】が できます。',
      modelAnswerId: 'Saya bisa mengemudikan forklift.',
      culturalEtiquette: 'Sampaikan keterampilan dengan percaya diri dan siap diuji praktiknya.',
      skillUnlocked: ['Menguasai bentuk potensial kata kerja (Kanoukei)', 'Mampu membedakan 聞こえる / 見える vs 聞く / 見る']
    },
    pocket_summary: {
      keyFormula: '[Objek] が [Verba Potensial] / [Suara] が 聞こえる / [Objek] が 見える',
      coreWords: ['はなせる', 'よめる', 'きこえる', 'みえる', 'おと'],
      coreWarning: 'Ganti partikel を menjadi が saat kata kerja berubah ke bentuk potensial.',
      quickDialogue: 'A: 日本語が話せますか。 → B: はい、少し話せます。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Proses Perubahan Kemampuan & Keadaan
  // ─────────────────────────────────────────────────────────────
  'les-n4-u03-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menyatakan proses perubahan bertahap dari tidak bisa menjadi bisa (〜ようになる) dan perubahan kondisi sifat (〜くなる / 〜になる).',
        canDo: 'Bisa menceritakan peningkatan pemahaman bahasa Jepang dan adaptasi kehidupan selama magang di Jepang.',
        targetPatterns: [
          '[Verba Bentuk Potensial / Kamus] ように なる (menjadi bisa / mulai terbiasa)',
          '[Kata Sifat-i] くなる (menjadi [sifat])',
          '[Kata Sifat-na / Kata Benda] に なる (menjadi [kondisi])'
        ],
        coreVocabSample: ['じょうず', 'わかる', 'なれる', 'へんか', 'せいかつ', 'かんじ', 'ぶんか']
      },
      sensei_context: {
        sceneIntro: 'Di meja makan malam asrama. Sakura dan Budi mengobrol santai mengenai perkembangan belajar Budi setelah 6 bulan tinggal di Tokyo.',
        dailyMission: 'Mampu menggunakan pola 〜ようになる untuk memaparkan proses kemajuan diri dari yang awalnya tidak paham menjadi mengerti.',
        whyOrder: 'Setelah menguasai bentuk kemampuan statis di Lesson 1 (kanoukei), Lesson 2 mengajarkan dinamika waktu: transformasi dari masa lalu ke masa kini.'
      },
      cultural_notes: {
        title: 'Konsep "Seichou" (成長 - Pertumbuhan Diri) dalam Budaya Evaluasi Jepang',
        etiquette: 'Orang Jepang sangat menghargai proses kemajuan yang konsisten. Mampu merendah sembari mengakui kemajuan ("Dahulu tidak paham, sekarang berkat bimbingan senpai saya jadi bisa") adalah bentuk kerendahhatian (Kenjou) yang sangat disukai.',
        taboos: 'Jangan memakai 〜ようになる untuk perubahan mendadak yang terjadi dalam sekejap; pola ini khusus untuk proses yang berangsur-angsur berkembang seiring waktu.'
      },
      pronunciation_tips: {
        title: 'Kelancaran Pelafalan "You ni narimashita"',
        moraNote: 'Rangkaian frasa: yo-u-ni-na-ri-ma-shi-ta (8 mora). Sambungkan vokal "you" secara halus ke "ni".',
        soundTip: 'Pada perubahan kata sifat: Yoi (bagus) menjadi "Yoku narimashita", bukan "ikunarimashita".'
      },
      common_pitfalls: [
        {
          title: 'Salah Bentuk Kata Sifat "Yoi (Bagus)" Saat Diubah ke Menjadi',
          caseScenario: 'Mengubah kata bagus ii/yoi menjadi "iinatta" atau "ikunatta".',
          pitfallWarning: '"日本語【にほんご】が いいになりました。" (Salah fatal)',
          rightSolution: '"日本語【にほんご】が よく なりました。" (Benar)',
          explanation: 'Kata sifat いい berakar dari 良い (よい). Bentuk perubahannya wajib memakai よい: 良く なりました.'
        },
        {
          title: 'Memasukkan Kata Kerja Bentuk Masu Sebelum You ni naru',
          caseScenario: 'Menyambung bentuk masu langsung: "wakarimasu you ni narimashita".',
          pitfallWarning: '"漢字【かんじ】が 分【わ】かります ように なりました。"',
          rightSolution: '"漢字【かんじ】が 分【わ】かる ように なりました。"',
          explanation: 'Pola 〜ようになる hanya menerima bentuk kamus biasa (Jishokei), terutama verba potensial atau verba non-volisional seperti 分かる.'
        }
      ],
      who_and_when: {
        situational_context: 'Saat wawancara perpanjangan kontrak magang, pidato perpisahan, atau refleksi belajar bersama mentor.',
        social_relations: 'Ragam sopan (Teineigo) yang memberikan kesan positif dan dedikasi tinggi.',
        when_not_to_use: 'Jangan gunakan pada benda mati yang mengalami kerusakan fisik (misal mesin rusak gunakan kowaremashita).'
      },
      scenario: {
        title: 'Refleksi Kemajuan 6 Bulan Tinggal di Tokyo',
        setting: 'Dapur bersama asrama pembelajar internasional, pukul 19.30',
        narrative: 'Sakura kagum melihat Budi sekarang bisa membaca kemasan bumbu masakan Jepang tanpa kamus.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: 'ブディさん、調味料【ちょうみりょう】の 漢字【かんじ】が 読【よ】めたの？すごいですね！', furigana: 'ブディさん、調味料の 漢字が 読めたの？すごいですね！', romaji: 'Budi-san, choumiryou no kanji ga yometa no? Sugoi desu ne!', idText: 'Budi-san, kamu bisa membaca kanji bumbu dapur tadi? Hebat sekali ya!' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'ありがとうございます！最初【さいしょ】は 全然【ぜんぜん】分【わ】かりませんでしたが、最近【さいきん】少【すこ】し 分【わ】かる ように なりました。', furigana: 'ありがとうございます！最初は 全然分かりませんでしたが、最近少し 分かる ように なりました。', romaji: 'Arigatou gozaimasu! Saisho wa zenzen wakarimasen deshita ga, saikin sukoshi wakaru you ni narimashita.', idText: 'Terima kasih banyak! Awalnya saya sama sekali tidak paham, tapi akhir-akhir ini sudah mulai mengerti.' },
      { id: 'd3', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: '日本【にほん】の 生活【せいかつ】にも だいぶ 慣【な】れましたね。', furigana: '日本の 生活にも だいぶ 慣れましたね。', romaji: 'Nihon no seikatsu ni mo daibu naremashita ne.', idText: 'Kamu juga sudah banyak terbiasa dengan kehidupan di Jepang ya.' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、電車【でんしゃ】の 乗【の】り換【か】えも 一人【ひとり】で スムーズに できる ように なりました。', furigana: 'はい、電車の 乗り換えも 一人で スムーズに できる ように なりました。', romaji: 'Hai, densha no norikae mo hitori de sumu-zu ni dekiru you ni narimashita.', idText: 'Iya, transit pindah kereta pun sekarang sudah bisa saya lakukan sendirian dengan lancar.' },
      { id: 'd5', speaker: 'Sakura', speakerRole: 'Mentor Pembelajar', avatar: '👩‍🏫', jp: '発音【はつおん】も とても 自然【しぜん】に なりましたよ。毎日【まいにち】の 努力【どりょく】の おかげですね。', furigana: '発音も とても 自然に なりましたよ。毎日の 努力の おかげですね。', romaji: 'Hatsuon mo totemo shizen ni narimashita yo. Mainichi no doryoku no okage desu ne.', idText: 'Pelafalanmu juga sudah menjadi sangat alami lho. Ini semua berkat kerja keras harianmu ya.' },
      { id: 'd6', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'さくらさんが いつも 親切【しんせつ】に 教【おし】えてくださる おかげです。もっと 上手【じょうず】に なりたいです！', furigana: 'さくらさんが いつも 親切に 教えてくださる おかげです。もっと 上手に なりたいです！', romaji: 'Sakura-san ga itsumo shinsetsu ni oshiete kudasaru okage desu. Motto jouzu ni naritai desu!', idText: 'Ini berkat Sakura-san yang selalu mengajari saya dengan ramah. Saya ingin menjadi lebih mahir lagi!' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah padanan makna kata "慣れる (なれる)".',
        sentencePrompt: 'Kata "慣れる" dalam konteks adaptasi lingkungan baru berarti:',
        options: ['Terbiasa / Menyesuaikan diri', 'Merasa lelah', 'Lupa ingatan', 'Berubah pikiran'],
        correctAnswer: 'Terbiasa / Menyesuaikan diri',
        explanation: '"慣れる (nareru)" berarti menjadi terbiasa setelah melalui pembiasaan waktu.',
        diagnosticFeedback: {
          'Merasa lelah': 'Salah: Merasa lelah adalah 疲れる (tsukareru).',
          'Lupa ingatan': 'Salah: Lupa adalah 忘れる (wasureru).',
          'Berubah pikiran': 'Salah: Berubah pikiran adalah 気が変わる (ki ga kawaru).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Isian Tepat): Lengkapi rumpang kalimat untuk menyatakan perubahan kata sifat "上手 (mahir/pandai)" menjadi mahir.',
        sentencePrompt: '毎日【まいにち】練習【れんしゅう】して、日本語【にほんご】が _____ なりました。',
        options: ['上手【じょうず】に', '上手【じょうず】く', '上手【じょうず】な', '上手【じょうず】で'],
        correctAnswer: '上手【じょうず】に',
        explanation: 'Jouzu adalah kata sifat-na. Perubahannya berpasangan dengan に: 上手に なりました.',
        diagnosticFeedback: {
          '上手【じょうず】く': 'Salah: Akhiran -ku hanya untuk kata sifat-i (seperti hayaku, takaku).',
          '上手【じょうず】な': 'Salah: Bentuk -na dipakai untuk menerangkan kata benda di depannya.',
          '上手【じょうず】で': 'Salah: Bentuk -de dipakai untuk menyambung kalimat.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun potongan kata berikut untuk menyatakan bahwa sekarang sudah bisa makan makanan pedas.',
        sentencePrompt: 'Susunan kalimat perubahan kemampuan yang tepat:',
        options: [
          '辛【から】い 物【もの】が 食【た】べられる ように なりました',
          '食【た】べられる 辛【から】い 物【もの】が ように なりました',
          'ように なりました 辛【から】い 物【もの】が 食【た】べられる',
          '辛【から】い 食【た】べられる 物【もの】が ように なりました'
        ],
        correctAnswer: '辛【から】い 物【もの】が 食【た】べられる ように なりました',
        explanation: 'Objek (辛い物が) + Verba Potensial (食べられる) + ように なりました.',
        diagnosticFeedback: {
          '食【た】べられる 辛【から】い 物【もの】が ように なりました': 'Salah: Verba potensial salah posisi di depan objek.',
          'ように なりました 辛【から】い 物【もの】が 食【た】べられる': 'Salah: Predikat utama diletakkan di awal kalimat.',
          '辛【から】い 食【た】べられる 物【もの】が ように なりました': 'Salah: Frasa kata sifat dan kata kerja tumpang tindih.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Bentuk Sifat-i): Manakah perubahan kata sifat "早い (cepat)" menjadi lebih cepat yang benar?',
        sentencePrompt: 'Pilihlah bentuk yang tepat:',
        options: [
          '朝【あさ】早【はや】く 起【お】きられる ように なりました。',
          '朝【あさ】早【はや】いに 起【お】きられる ように なりました。',
          '朝【あさ】早【はや】いな 起【お】きられる ように なりました。',
          '朝【あさ】早【はや】いで 起【お】きられる ように なりました。'
        ],
        correctAnswer: '朝【あさ】早【はや】く 起【お】きられる ように なりました。',
        explanation: 'Kata sifat-i Hayai diubah menjadi adverbia bentuk -ku (早くなる / 早く起きる).',
        diagnosticFeedback: {
          '朝【あさ】早【はや】いに 起【お】きられる ように なりました。': 'Jebakan: Kata sifat-i tidak boleh diberi partikel に.',
          '朝【あさ】早【はや】いな 起【お】きられる ように なりました。': 'Jebakan: Akhiran な hanya untuk kata sifat-na.',
          '朝【あさ】早【はや】いで 起【お】きられる ように なりました。': 'Jebakan: Salah bentuk sambung.'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Rekan kerjamu bertanya "刺身【さしみ】は 食【た】べられますか". Jawaban jika dulu tidak bisa tetapi sekarang sudah bisa makan:',
        sentencePrompt: 'Pilihlah tanggapan yang menyatakan proses perubahan kemampuan:',
        options: [
          '前【まえ】は だめでしたが、今【いま】は 食【た】べられる ように なりました。',
          '刺身【さしみ】を 食【た】べた ほう が いいですよ。',
          '刺身【さしみ】を 食【た】べる つもりです。',
          '刺身【さしみ】が 食【た】べたい すぎます。'
        ],
        correctAnswer: '前【まえ】は だめでしたが、今【いま】は 食【た】べられる ように なりました。',
        explanation: 'Menyatakan kontras dari dulu tidak bisa menjadi bisa sekarang menggunakan 〜ようになりました.',
        diagnosticFeedback: {
          '刺身【さしみ】を 食【た】べた ほう が いいですよ。': 'Salah: Ini malah memberi saran kepada orang lain.',
          '刺身【さしみ】を 食【た】べる つもりです。': 'Salah: Hanya menyatakan niat, bukan kemampuan.',
          '刺身【さしみ】が 食【た】べたい すぎます。': 'Salah: Tata bahasa rusak.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menceritakan peningkatan pemahaman bahasa Jepang selama magang.',
      situation: 'Wawancara evaluasi progres bersama mentor di akhir bulan keenam.',
      promptTask: 'Laporkan bahwa sekarang kamu sudah mulai bisa memahami percakapan berita radio!',
      modelAnswer: 'ラジオの ニュースが 聞【き】き取【と】れる ように なりました。',
      modelAnswerId: 'Sekarang saya sudah mulai bisa menangkap pendengaran berita radio.',
      culturalEtiquette: 'Tersenyum ramah dan ucapkan terima kasih atas bimbingan mentor.',
      skillUnlocked: ['Menguasai transformasi kemampuan 〜ようになる', 'Menguasai perubahan kata sifat 〜くなる / 〜になる']
    },
    pocket_summary: {
      keyFormula: '[V-Potensial] ように なる (menjadi bisa) | [Adj-i] くなる / [Adj-na] になる',
      coreWords: ['じょうず', 'わかる', 'なれる', 'せいかつ'],
      coreWarning: 'Kata sifat いい berubah menjadi よく なりました, bukan いくなりました.',
      quickDialogue: 'A: 日本語はどうですか。 → B: 前より話せるようになりました。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 4: Kemudahan Operasional & Ukuran Sifat
  // ─────────────────────────────────────────────────────────────
  'les-n4-u04-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menyatakan tingkat kemudahan suatu tindakan (〜やすい) dan kesulitan operasional (〜にくい), serta membagikan atau mengalokasikan kuantitas secara proporsional per satuan (〜ずつ).',
        canDo: 'Bisa menilai manual operasional alat yang mudah dipahami dan membagikan komponen per orang atau per mesin.',
        targetPatterns: [
          '[Masu-Stem] やすい (mudah dilakukan / gampang terjadi)',
          '[Masu-Stem] にくい (sulit dilakukan / sukar terjadi)',
          '[Kuantitas / Angka] ずつ (masing-masing ... / sedikit demi sedikit)'
        ],
        coreVocabSample: ['つかいやすい', 'わかりにくい', 'すこしずつ', 'マニュアル', 'ボタン', 'くばる', 'ぶひん']
      },
      sensei_context: {
        sceneIntro: 'Di stasiun perakitan bengkel kerja. Budi dan Kenji sedang mempelajari panduan pengoperasian mesin baru. Kenji meminta masukan mengenai kejelasan tombol dan pembagian suku cadang.',
        dailyMission: 'Mampu menggunakan akhiran 〜やすい dan 〜にくい untuk menilai perangkat kerja, serta memakai partikel kuantitas 〜ずつ saat mendistribusikan material.',
        whyOrder: 'Setelah bisa mengoperasikan alat di Unit 3, Unit 4 melatih pembelajar memberikan evaluasi kualitas operasional alat (user-friendliness) dan efisiensi logistik perakitan.'
      },
      cultural_notes: {
        title: 'Prinsip Kaizen (改善) & Desain Ergonomis Alat Kerja Jepang',
        etiquette: 'Di pabrik Jepang, masukan dari operator lapangan mengenai alat yang "sulit dipakai" (tsukainikui) sangat dihargai sebagai bahan Kaizen (perbaikan berkelanjutan). Berikan masukan secara spesifik dan konstruktif.',
        taboos: 'Akhiran 〜やすい dan 〜にくい mengubah kata kerja menjadi berkarakter KATA SIFAT-I! Bentuk negatifnya adalah "yasukunai" / "nikukunai", BUKAN "yasuku arimasen".'
      },
      pronunciation_tips: {
        title: 'Peleburan Masu-Stem dengan Yasui/Nikui',
        moraNote: 'Tsukaimasu -> buang [masu] -> Tsukai-yasui (5 mora). Wakarimasu -> Wakari-nikui (6 mora).',
        soundTip: 'Ucapkan "zutsu" dengan dua mora jelas: zu-tsu, jangan disingkat menjadi desu.'
      },
      common_pitfalls: [
        {
          title: 'Memasukkan Bentuk Kamus Sebelum Yasui / Nikui',
          caseScenario: 'Menggabungkan bentuk kamus utuh: "tsukau yasui".',
          pitfallWarning: '"この パソコンは 使【つか】う やすいです。" (Salah)',
          rightSolution: '"この パソコンは 使【つか】い やすいです。" (Benar)',
          explanation: 'Pola ini hanya menempel pada akar kata kerja bentuk Masu (Masu-Stem), yaitu 使います tanpa ます -> 使いやすい.'
        },
        {
          title: 'Salah Menempatkan Kata "Zutsu"',
          caseScenario: 'Menaruh zutsu sebelum angka: "zutsu hitotsu".',
          pitfallWarning: '"ずつ 一【ひと】つ 取【と】ってください。"',
          rightSolution: '"一【ひと】つ ずつ 取【と】ってください。"',
          explanation: 'Kata ずつ selalu diletakkan LANGSUNG SETELAH kata bilangan kuantitas: 1つずつ (satu per satu), 少しずつ (sedikit demi sedikit).'
        }
      ],
      who_and_when: {
        situational_context: 'Saat pengujian alat baru, penyusunan instruksi kerja, atau pembagian materi briefing kepada anggota tim.',
        social_relations: 'Ragam sopan (Teineigo) yang sangat profesional saat berdiskusi dengan sesama rekan teknisi.',
        when_not_to_use: 'Jangan gunakan 〜にくい untuk menolak perintah atasan secara frontal; gunakan alasan objektif.'
      },
      scenario: {
        title: 'Evaluasi Manual Alat Baru di Stasiun Perakitan',
        setting: 'Meja kerja tim manufaktur lantai 1, pukul 14.00',
        narrative: 'Budi dan Kenji membandingkan manual lama dengan manual digital baru di layar tablet.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: 'ブディ、新【あたら】しい 機械【きかい】の タブレットはどう？使【つか】いやすい？', furigana: 'ブディ、新しい 機械の タブレットはどう？使いやすい？', romaji: 'Budi, atarashii kikai no taburetto wa dou? Tsukaiyasui?', idText: 'Budi, tablet mesin yang baru bagaimana? Mudah digunakan?' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい！画面【がめん】が 大【おお】きくて、とても 使【つか】いやすいです。', furigana: 'はい！画面が 大きくて、とても 使いやすいです。', romaji: 'Hai! Gamen ga ookikute, totemo tsukaiyasui desu.', idText: 'Ya! Layarnya besar dan sangat mudah digunakan.' },
      { id: 'd3', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: '前【まえ】の 紙【かみ】の マニュアルは 字【じ】が 小【ちい】さくて 読【よ】みにくかったもんね。', furigana: '前の 紙の マニュアルは 字が 小さくて 読みにくかったもんね。', romaji: 'Mae no kami no manyuaru wa ji ga chiisakute yominikukatta mon ne.', idText: 'Manual kertas yang dulu kan hurufnya kecil dan susah dibaca ya.' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'そうですね。写真【しゃしん】も あるので、作業【さぎょう】の 手順【てじゅん】が 分【わ】かりやすいです。', furigana: 'そうですね。写真も あるので、作業の 手順が 分かりやすいです。', romaji: 'Sou desu ne. Shashin mo aru node, sagyou no tejun ga wakariyasui desu.', idText: 'Benar sekali. Karena ada fotonya juga, urutan langkah kerjanya mudah dipahami.' },
      { id: 'd5', speaker: 'Kenji', speakerRole: 'Rekan Kerja', avatar: '🧑‍💻', jp: 'じゃあ、今日【きょう】の 組【く】み立【た】て 部品【ぶひん】を 各班【かくはん】に ２個【にこ】ずつ 配【くば】ってくれる？', furigana: 'じゃあ、今日の 組み立て 部品を 各班に ２個ずつ 配ってくれる？', romaji: 'Jaa, kyou no kumitate buhin o kakuhan ni niko zutsu kubatte kureru?', idText: 'Kalau begitu, bisakah tolong bagikan komponen perakitan hari ini masing-masing 2 buah ke tiap regu?' },
      { id: 'd6', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '承知【しょうち】しました。落【お】とさないように、少【すこ】しずつ 運【はこ】びます。', furigana: '承知しました。落とさないように、少しずつ 運びます。', romaji: 'Shouchi shimashita. Otosanai you ni, sukoshizutsu hakobimasu.', idText: 'Saya pahami. Agar tidak jatuh, saya akan membawanya sedikit demi sedikit.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah lawan kata dari "使いやすい (mudah dipakai)".',
        sentencePrompt: 'Lawan kata dari "使いやすい" adalah:',
        options: ['使【つか】いにくい (sulit dipakai)', '食【た】べやすい (mudah dimakan)', '飲【の】みにくい (sulit diminum)', '見【み】やすい (mudah dilihat)'],
        correctAnswer: '使【つか】いにくい (sulit dipakai)',
        explanation: 'Pola -yasui berlawanan dengan -nikui pada akar kata kerja yang sama (tsukaiyasui vs tsukainikui).',
        diagnosticFeedback: {
          '食【た】べやすい (mudah dimakan)': 'Salah: Beda kata kerja dasar (makan).',
          '飲【の】みにくい (sulit diminum)': 'Salah: Beda kata kerja dasar (minum).',
          '見【み】やすい (mudah dilihat)': 'Salah: Beda kata kerja dasar (melihat).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Penggabungan Masu-Stem): Pilihlah bentuk yang tepat untuk menyatakan obat yang mudah ditelan/diminum.',
        sentencePrompt: 'この 薬【くすり】は 小【ちい】さくて _____ です。',
        options: ['飲【の】みやすい', '飲【の】むやすい', '飲【の】んでやすい', '飲【の】まないやすい'],
        correctAnswer: '飲【の】みやすい',
        explanation: 'Kata kerja 飲みます buang ます -> 飲み + やすい = 飲みやすい.',
        diagnosticFeedback: {
          '飲【の】むやすい': 'Salah: Bentuk kamus tidak boleh digabungkan langsung dengan やすい.',
          '飲【の】んでやすい': 'Salah: Bentuk te tidak boleh digabungkan dengan やすい.',
          '飲【の】まないやすい': 'Salah: Bentuk negatif tidak boleh disambung ke やすい.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun potongan kata berikut untuk menginstruksikan pembagian formulir 1 lembar per orang.',
        sentencePrompt: 'Susunan instruksi alokasi yang tepat:',
        options: [
          '皆【みな】さんに １枚【いちまい】ずつ 配【くば】ってください',
          '１枚【いちまい】ずつ 配【くば】ってください 皆【みな】さんに',
          '配【くば】ってください １枚【いちまい】ずつ 皆【みな】さんに',
          '皆【みな】さんに 配【くば】ってください １枚【いちまい】ずつ'
        ],
        correctAnswer: '皆【みな】さんに １枚【いちまい】ずつ 配【くば】ってください',
        explanation: 'Penerima (皆さんに) + Kuantitas-Zutsu (1枚ずつ) + Verba Instruksi (配ってください).',
        diagnosticFeedback: {
          '１枚【いちまい】ずつ 配【くば】ってください 皆【みな】さんに': 'Kurang lazim: Penerima bantuan diletakkan di akhir.',
          '配【くば】ってください １枚【いちまい】ずつ 皆【みな】さんに': 'Salah: Kata kerja ditaruh di awal.',
          '皆【みな】さんに 配【くば】ってください １枚【いちまい】ずつ': 'Salah: Kuantitas ditaruh setelah perintah kerja.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Karakter Sifat-i): Manakah bentuk lampau negatif yang benar dari "わかりやすい"?',
        sentencePrompt: 'Pilihlah bentuk konjugasi yang tepat untuk "dahulu tidak mudah dipahami":',
        options: [
          '分【わ】かりやすくなかったです。',
          '分【わ】かりやすいではありませんでした。',
          '分【わ】かりやすかったです。',
          '分【わ】かりやすいじゃなかったです。'
        ],
        correctAnswer: '分【わ】かりやすくなかったです。',
        explanation: 'Karena -yasui berkonjugasi persis seperti kata sifat-i, maka bentuk lampau negatifnya adalah -yasukunakatta desu.',
        diagnosticFeedback: {
          '分【わ】かりやすいではありませんでした。': 'Jebakan: Pola dewa arimasen deshita adalah konjugasi kata sifat-na/benda, bukan kata sifat-i.',
          '分【わ】かりやすかったです。': 'Salah: Ini adalah bentuk positif lampau ("dulu mudah dipahami").',
          '分【わ】かりやすいじゃなかったです。': 'Jebakan: Pola ja nakatta adalah untuk sifat-na/benda.'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Supervisor menanyakan pendapatmu tentang sepatu safety baru "新【あたら】しい 安全靴【あんぜんぐつ】の 履【は】き心地【ごこち】はどうですか". Respons terbaik:',
        sentencePrompt: 'Pilihlah evaluasi yang tepat:',
        options: [
          '軽【かる】くて、とても 歩【ある】きやすいです。',
          '軽【かる】くて、とても 歩【ある】くやすいです。',
          '歩【ある】く ことに しています。',
          '歩【ある】いた ほう が いいですよ。'
        ],
        correctAnswer: '軽【かる】くて、とても 歩【ある】きやすいです。',
        explanation: 'Menilai bahwa sepatunya ringan dan sangat mudah/nyaman untuk berjalan (Aruki-yasui).',
        diagnosticFeedback: {
          '軽【かる】くて、とても 歩【ある】くやすいです。': 'Salah bentuk: Aruku yasui salah, seharusnya arukiyasui.',
          '歩【ある】く ことに しています。': 'Salah konteks: "Saya membiasakan diri berjalan".',
          '歩【ある】いた ほう が いいですよ。': 'Salah konteks: Malah menasihati atasan.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa menilai manual operasional alat yang mudah dipahami.',
      situation: 'Memberikan umpan balik kepada perancang panduan kerja pabrik.',
      promptTask: 'Katakan bahwa manual ini mudah dipahami karena fotonya jelas!',
      modelAnswer: '写真【しゃしん】が はっきりしていて、とても 分【わ】かりやすいです。',
      modelAnswerId: 'Fotonya jelas dan sangat mudah dipahami.',
      culturalEtiquette: 'Berikan apresiasi positif terlebih dahulu sebelum poin teknis.',
      skillUnlocked: ['Menguasai sufiks evaluatif 〜やすい dan 〜にくい', 'Menguasai partikel distribusi proporsional 〜ずつ']
    },
    pocket_summary: {
      keyFormula: '[Masu-Stem] やすい (mudah) / にくい (sulit) | [Jumlah] ずつ (per satuan)',
      coreWords: ['つかいやすい', 'わかりにくい', 'すこしずつ', 'くばる'],
      coreWarning: 'Akhiran yasui dan nikui berstatus kata sifat-i; negatifnya adalah yasukunai.',
      quickDialogue: 'A: この道具はどう？ → B: 軽くてとても使いやすいです。'
    }
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Nominalisasi Ukuran Sifat & Interval Rutin
  // ─────────────────────────────────────────────────────────────
  'les-n4-u04-02': {
    pedagogical_framework: {
      what: {
        summary: 'Nominalisasi kata sifat menjadi besaran kuantitatif objektif dengan akhiran 〜さ (ukuran sifat), serta menyatakan interval kejadian berkala (〜おきに = berselang jeda vs 〜ごとに = setiap kali siklus).',
        canDo: 'Bisa melaporkan berat beban paket logistik dan mengecek suhu mesin setiap interval 30 menit secara teratur.',
        targetPatterns: [
          '[Kata Sifat-i buang i / Kata Sifat-na] さ (tingkat / bobot / derajat nominal)',
          '[Satuan Angka / Waktu] おき に (berselang interval)',
          '[Satuan Waktu / Kategori] ごと に (setiap / tiap-tiap siklus)'
        ],
        coreVocabSample: ['おもさ', 'たかさ', 'ながさ', 'あつさ', 'おきに', 'ごとに', 'はかる', 'てんけん']
      },
      sensei_context: {
        sceneIntro: 'Di gudang pengiriman kargo pabrik. Tanaka-senpai mengawasi Budi menimbang berat paket karton dan mengatur alarm pengecekan suhu mesin penyimpanan.',
        dailyMission: 'Mampu mengubah kata sifat dimensi (omoi, takai, nagai) menjadi kata benda besaran (omosa, takasa, nagasa), serta menggunakan "goto ni" untuk interval SOP kerja.',
        whyOrder: 'Dalam dunia industri modern di Jepang, penilaian subjektif ("ini berat") harus dikonversi menjadi data objektif ("beratnya 15 kg") dan dijalankan sesuai interval waktu presisi.'
      },
      cultural_notes: {
        title: 'Standarisasi Data Kuantitatif (定量的管理 - Teiryou-teki Kanri)',
        etiquette: 'Laporan kerja di Jepang mengutamakan angka numerik pasti. Daripada berkata "Kono hako wa totemo omoi desu" (Kotak ini sangat berat), pimpinan lebih menghargai "Omosa o hakattara 15kg deshita" (Setelah diukur beratnya 15 kg).',
        taboos: 'Perhatikan perbedaan: "1-jikan oki ni" berarti berselang selang 1 jam penuh (setiap 2 jam sekali). Jika ingin mengatakan "setiap 1 jam sekali", gunakan "1-jikan goto ni"!'
      },
      pronunciation_tips: {
        title: 'Penekanan Suku Kata pada Sufiks -Sa',
        moraNote: 'Omoi -> O-mo-sa (3 mora). Takai -> Ta-ka-sa (3 mora). Nagai -> Na-ga-sa (3 mora).',
        soundTip: 'Ucapkan "goto ni" dengan nada mengalir datar, jangan menekan kata "go" terlalu keras.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜おきに (Berselang Jeda Antara) vs 〜ごとに (Tiap-Tiap Siklus)',
          caseScenario: 'Ingin mengatakan "tiap 30 menit sekali mesin diperiksa" tetapi menggunakan okini.',
          pitfallWarning: '"３０分【さんじゅっぷん】おき に 点検【てんけん】します。" (Bermakna ada jeda kosong 30 menit)',
          rightSolution: '"３０分【さんじゅっぷん】ごと に 点検【てんけん】します。" (Setiap siklus 30 menit)',
          explanation: '〜ごとに berarti setiap interval tanpa jeda terlewat. 〜おきに berarti diselingi jeda satu interval.'
        },
        {
          title: 'Menempelkan Akhiran -Sa pada Kata Sifat Tanpa Membuang [i]',
          caseScenario: 'Menyusun kalimat: "omoi-sa o hakaru".',
          pitfallWarning: '"重【おも】いさ を 測【はか】ります。"',
          rightSolution: '"重【おも】さ を 測【はか】ります。"',
          explanation: 'Huruf [i] terakhir pada kata sifat wajib dihilangkan sebelum diganti dengan 〜さ (Omoi -> Omosa).'
        }
      ],
      who_and_when: {
        situational_context: 'Pemeriksaan logistik kargo, pengukuran dimensi fisik produk, atau pengaturan alarm jadwal patroli pabrik.',
        social_relations: 'Ragam sopan (Teineigo) yang penting saat mengisi formulir inspeksi mutu (QC).',
        when_not_to_use: 'Jangan gunakan -sa untuk kata sifat yang tidak memiliki parameter besaran ukur fisik atau psikologis terukur.'
      },
      scenario: {
        title: 'Inspeksi Berat Paket & Patroli Rutin Mesin',
        setting: 'Gudang logistik dan ruang kontrol mesin pendingin, pukul 15.00',
        narrative: 'Tanaka-senpai membimbing Budi menimbang berat paket sebelum dimuat ke truk kargo.'
      }
    },
    dialogue: [
      { id: 'd1', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: 'ブディさん、出荷【しゅっか】する 前【まえ】に ダンボールの 重【おも】さを 測【はか】ってください。', furigana: 'ブディさん、出荷する 前に ダンボールの 重さを 測ってください。', romaji: 'Budi-san, shukka suru mae ni danbo-ru no omosa o hakatte kudasai.', idText: 'Budi-san, sebelum dikirim tolong timbang berat kardusnya ya.' },
      { id: 'd2', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: 'はい、測【はか】りました。１箱【ひとはこ】の 重【おも】さは ちょうど １２キロです。', furigana: 'はい、測りました。１箱の 重さは ちょうど １２キロです。', romaji: 'Hai, hakarimashita. Hitohako no omosa wa choudo juunikiro desu.', idText: 'Baik, sudah saya timbang. Berat satu kotaknya pas 12 kilogram.' },
      { id: 'd3', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: '規定【きてい】の 範囲内【はんいない】ですね。高【たか】さは どうですか。', furigana: '規定の 範囲内ですね。高さは どうですか。', romaji: "Kitei no han'inai desu ne. Takasa wa dou desu ka.", idText: 'Masuk dalam batas regulasi ya. Ketinggiannya bagaimana?' },
      { id: 'd4', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '高【たか】さは ５０センチです。トラックの 荷台【にだい】に しっかり 収【おさ】まります。', furigana: '高さは ５０センチです。トラックの 荷台に しっかり 収まります。', romaji: 'Takasa wa gojuusenti desu. Torakku no nidai ni shikkari osamarimasu.', idText: 'Tingginya 50 sentimeter. Muat pas di bak truk.' },
      { id: 'd5', speaker: 'Tanaka', speakerRole: 'Supervisor Kerja', avatar: '🧑‍💼', jp: 'よし。あと 冷凍庫【れいとうこ】の 温度【おんど】は １時間【いちじかん】ごとに チェックしてくださいね。', furigana: 'よし。あと 冷凍庫の 温度は １時間ごとに チェックしてくださいね。', romaji: 'Yoshi. Ato reitouko no ondo wa ichijikan goto ni chekku shite kudasai ne.', idText: 'Bagus. Lalu suhu ruang pembeku tolong dicek setiap 1 jam sekali ya.' },
      { id: 'd6', speaker: 'Budi', speakerRole: 'Pembelajar Indonesia', avatar: '🙋‍♂️', jp: '承知【しょうち】しました！１時間【いちじかん】ごとに 記録表【きろくひょう】に 記入【きにゅう】します。', furigana: '承知しました！１時間ごとに 記録表に 記入します。', romaji: 'Shouchi shimashita! Ichijikan goto ni kirokuhyou ni kinyuu shimasu.', idText: 'Saya pahami! Setiap 1 jam akan saya catat di tabel laporan.' }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Konsep Kata): Pilihlah kata nominal dimensi yang berarti "panjangnya suatu benda".',
        sentencePrompt: 'Kata yang berarti "panjangnya" yang dibentuk dari kata sifat "長い (ながい)" adalah:',
        options: ['長【なが】さ', '長【なが】いさ', '長【なが】み', '長【なが】くて'],
        correctAnswer: '長【なが】さ',
        explanation: 'Nagai buang [i] + さ = 長さ (panjangnya / dimensi panjang).',
        diagnosticFeedback: {
          '長【なが】いさ': 'Salah: Huruf [i] tidak boleh dipertahankan sebelum -sa.',
          '長【なが】み': 'Salah: Akhiran -mi menyatakan kedalaman rasa/nuansa abstrak, bukan dimensi panjang fisik.',
          '長【なが】くて': 'Salah: Ini adalah bentuk te penyambung kata sifat.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pembedaan Interval): Lengkapi rumpang kalimat untuk SOP kerja "memeriksa suhu setiap 30 menit".',
        sentencePrompt: '３０分【さんじゅっぷん】_____ 温度【おんど】を 測定【そくてい】してください。',
        options: ['ごと に', 'おき に', 'までに', 'あいだ'],
        correctAnswer: 'ごと に',
        explanation: 'Untuk jadwal rutin yang dieksekusi setiap siklus satuan waktu (tiap 30 menit sekali), gunakan ごとに.',
        diagnosticFeedback: {
          'おき に': 'Kurang tepat: おきに berarti diselingi jeda 30 menit kosong di antaranya.',
          'までに': 'Salah: までに menandai batas tenggat waktu akhir (deadline).',
          'あいだ': 'Salah: あいだ menandai durasi rentang waktu keberlangsungan.'
        }
      },
      {
        id: 'drill-3',
        type: 'reorder',
        instruction: 'Langkah 3 (Susun Kalimat): Susun potongan kata berikut untuk menyatakan pengukuran berat kardus dengan timbangan.',
        sentencePrompt: 'Susunan kalimat pengukuran yang tepat:',
        options: [
          'はかりで 荷物【にもつ】の 重【おも】さを 測【はか】ります',
          '重【おも】さを はかりで 荷物【にもつ】の 測【はか】ります',
          '荷物【にもつ】の 測【はか】ります はかりで 重【おも】さを',
          '測【はか】ります はかりで 荷物【にもつ】の 重【おも】さを'
        ],
        correctAnswer: 'はかりで 荷物【にもつ】の 重【おも】さを 測【はか】ります',
        explanation: 'Alat (はかりで) + Objek Kepemilikan (荷物の重さを) + Verba Mengukur (測ります).',
        diagnosticFeedback: {
          '重【おも】さを はかりで 荷物【にもつ】の 測【はか】ります': 'Salah: Frasa 荷物の terpisah dari kata yang diterangkan (重さ).',
          '荷物【にもつ】の 測【はか】ります はかりで 重【おも】さを': 'Salah: Kata kerja ditaruh di tengah sebelum objek.',
          '測【はか】ります はかりで 荷物【にもつ】の 重【おも】さを': 'Salah: Predikat utama diletakkan di awal kalimat.'
        }
      },
      {
        id: 'drill-4',
        type: 'trap_detect',
        instruction: 'Langkah 4 (Deteksi Sufiks Nominalisasi): Manakah kata benda besaran yang terbentuk dari kata sifat "高い (tinggi/mahal)"?',
        sentencePrompt: 'Pilihlah bentuk nominal yang tepat untuk "tingginya":',
        options: [
          'この ビルの 高【たか】さは １００メートルです。',
          'この ビルの 高【たか】いさは １００メートルです。',
          'この ビルの 高【たか】みは １００メートルです。',
          'この ビルの 高【たか】くては １００メートルです。'
        ],
        correctAnswer: 'この ビルの 高【たか】さは １００メートルです。',
        explanation: 'Takai buang [i] + さ -> 高さを表す名詞: 高さ (tingginya).',
        diagnosticFeedback: {
          'この ビルの 高【たか】いさは １００メートルです。': 'Jebakan: Huruf [i] salah dipertahankan.',
          'この ビルの 高【たか】みは １００メートルです。': 'Jebakan: Takami bermakna tempat tinggi secara puitis/abstrak, bukan ketinggian numerik.',
          'この ビルの 高【たか】くては １００メートルです。': 'Salah: Bentuk te-wa tidak berfungsi sebagai kata benda subjek.'
        }
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Situasional): Rekan kerjamu bertanya "この バスは どれくらいで 来【き】ますか". Jawaban bahwa bus datang setiap 10 menit sekali:',
        sentencePrompt: 'Pilihlah informasi jadwal yang tepat:',
        options: [
          '１０分【じゅっぷん】ごと に 来【き】ますよ。',
          '１０分【じゅっぷん】までに 来【き】ますよ。',
          '１０分【じゅっぷん】やすい ですよ。',
          '１０分【じゅっぷん】に しますよ。'
        ],
        correctAnswer: '１０分【じゅっぷん】ごと に 来【き】ますよ。',
        explanation: 'Frekuensi siklus interval transportasi diungkapkan dengan 10分ごとに (setiap 10 menit).',
        diagnosticFeedback: {
          '１０分【じゅっぷん】までに 来【き】ますよ。': 'Salah: までに berarti paling lambat sebelum 10 menit.',
          '１０分【じゅっぷん】やすい ですよ。': 'Salah: Tata bahasa rusak.',
          '１０分【じゅっぷん】に しますよ。': 'Salah: Menyatakan keputusan waktu janji.'
        }
      }
    ],
    can_do_challenge: {
      statement: 'Bisa melaporkan berat beban paket dan mengecek mesin berkala.',
      situation: 'Melaporkan hasil penimbangan kargo dan komitmen patroli suhu ke supervisor.',
      promptTask: 'Laporkan bahwa berat kardus 10 kg dan kamu akan mengeceknya tiap 1 jam!',
      modelAnswer: 'ダンボールの 重【おも】さは １０キロです。１時間【いちじかん】ごと に 点検【てんけん】します。',
      modelAnswerId: 'Berat kardusnya 10 kg. Saya akan memeriksa setiap 1 jam sekali.',
      culturalEtiquette: 'Sebutkan angka satuan ukur (kg, jam) secara tegas dan jelas.',
      skillUnlocked: ['Menguasai nominalisasi ukuran besaran dengan akhiran 〜さ', 'Menguasai ekspresi interval berkala 〜ごとに']
    },
    pocket_summary: {
      keyFormula: '[Kata Sifat buang i] さ (besaran sifat) | [Waktu/Satuan] ごと に (setiap siklus)',
      coreWords: ['おもさ', 'たかさ', 'ながさ', 'ごとに', 'はかる'],
      coreWarning: 'Omosa (berat), Takasa (tinggi), Nagasa (panjang) — selalu buang akhiran i.',
      quickDialogue: 'A: 重さはどれくらい？ → B: ちょうど10キロです。'
    }
  }
};
