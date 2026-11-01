// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/build-units-04-to-05.js
//  Appends Gold-Standard Bespoke Curated Units 4 & 5 to units-01-to-05.js
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-01-to-05.js');
const existing = require(targetFile);

const u04_05 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 4: Kemahiran Teknis, Penyerapan Ilmu & Adaptasi Beban
  // ─────────────────────────────────────────────────────────────
  'les-n2-u04-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai verba majemuk kemahiran operasional: 〜こなす (menguasai dengan terampil/lancar) dan 〜こむ (melakukan secara mendalam/terpatri).',
        canDo: 'Bisa melaporkan penguasaan pengoperasian mesin atau sistem rumit, serta menjelaskan pendalaman analisis data teknis di laboratorium.',
        targetPatterns: [
          'V-masu + こなす (menguasai dengan terampil / menangani dengan lincah)',
          'V-masu + こむ (melakukan secara mendalam / terpatri kuat)'
        ],
        coreVocabSample: ['くぶん', 'くみたてる', 'そうさ', 'せってい', 'しゅうとく', 'ちょうせい', 'てきおう', 'けんしょう']
      },
      sensei_context: {
        sceneIntro: 'Pusat riset dan laboratorium pengujian robotika industri di Tsukuba Science City. Kenji (Senior Systems Architect) meninjau kemampuan Budi dalam mengonfigurasi parameter lengan robot.',
        dailyMission: 'Gunakan verba "atsukaikonasu" dan "yomikomu" untuk mendemonstrasikan kemahiran teknis tingkat tinggi di hadapan lead engineer.',
        whyOrder: 'Setelah aspek batas fisik (kireru/kirenai) di Unit 3, Unit 4 beralih ke spektrum kemahiran positif: bagaimana mengubah keterampilan dasar menjadi penguasaan profesional yang terampil (konasu).'
      },
      cultural_notes: {
        title: 'Etika Penguasaan Alat & Penyerapan Ilmu (習熟 - Shuujuku)',
        etiquette: 'Di lingkungan engineering Jepang, menguasai alat rumit bukan sekadar tahu tombolnya, melainkan mampu mengoperasikannya secara intuitif dan efisien (tsukaikonasu). Catat poin penting saat demonstrasi teknis.',
        taboos: 'Hindari mengklaim "sudah mahir" (tsukaikonaseru) jika belum memverifikasi hasil kalibrasi pada uji beban nyata di bawah supervisi.'
      },
      pronunciation_tips: {
        title: 'Intonasi Verba Majemuk (Fukugoudoushi)',
        moraNote: 'Pada verba majemuk seperti "atsukai-konasu", aksen ritmis stabil mengalir tanpa meninggikan vokal akhir su: a-tsu-ka-i-ko-na-su.',
        soundTip: 'Beri penekanan mora tegas pada "ko" saat mengucapkan "yomikomu" untuk mempertegas kedalaman pemahaman.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜こなす (Kemahiran Terampil) vs 〜きる (Ketuntasan Total)',
          caseScenario: 'Ingin mengatakan "saya mampu mengoperasikan software rumit ini dengan lancar", tetapi memakai ~kiru.',
          pitfallWarning: 'この 複雑【ふくざつ】な ソフトを 使【つか】いきれます。 (Artinya habis digunakan, bukan mahir)',
          rightSolution: 'この 複雑【ふくざつ】な ソフトを 使【つか】いこなせます。 (Tepat: mahir mengoperasikan)',
          explanation: '〜こなす berfokus pada kemahiran, kelancaran, dan keahlian menangani tugas sulit, sedangkan 〜きる berfokus pada menyelesaikan sesuatu sampai habis tuntas.'
        },
        {
          title: 'Menggabungkan Verba Transitif ke Konteks Non-Aksi',
          caseScenario: 'Memakai ~konasu pada fenomena alamiah yang bukan keterampilan kerja.',
          pitfallWarning: '雨【あめ】が 降【ふ】りこなしている。 (Salah total)',
          rightSolution: '仕事【しごと】を 手際【てぎわ】よく こなしている。 (Tepat)',
          explanation: '〜こなす hanya dapat dilekatkan pada verba yang melibatkan keterampilan, usaha, atau pengolahan aktif manusia.'
        }
      ],
      who_and_when: {
        situational_context: 'Evaluasi keterampilan teknis, sesi review kode, uji coba instrumen laboratorium, atau pelaporan kesiapan produksi.',
        social_relations: 'Ragam profesional sopan (Teineigo) yang mencerminkan etos pembelajar yang tekun kepada Lead Architect (Kenji).',
        when_not_to_use: 'Jangan memakai konasu untuk meremehkan pekerjaan orang lain seolah-olah pekerjaan itu sepele.'
      },
      scenario: {
        title: 'Kalibrasi Lengan Robotik Tsukuba',
        setting: 'Lab Pengujian Robotika Industri, Tsukuba Science City, pukul 10.30',
        narrative: 'Kenji mengamati Budi mengonfigurasi parameter gerak motor servo presisi tinggi.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Kenji',
        speakerRole: 'Senior Systems Architect',
        avatar: '👨‍💻',
        jp: 'ブディさん、新型【しんがた】ロボットアームの 複雑【ふくざつ】な 制御【せいぎょ】プログラムは、もう 扱【あつか】いこなせそうですか？',
        furigana: 'ブディさん、新型ロボットアームの 複雑な 制御プログラムは、もう 扱いこなせそうですか？',
        romaji: 'Budi-san, shingata robotto aamu no fukuzatsuna seigyo puroguramu wa, mou atsukaikonasesou desu ka?',
        idText: 'Budi, apakah kamu sudah bisa menguasai dengan mahir program kendali lengan robot model baru yang rumit ini?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、健二【けんじ】さん！ マニュアルを しっかり 読【よ】み込【こ】んだので、基本【きほん】操作【そうさ】は スムーズに こなせるように なりました。',
        furigana: 'はい、健二さん！ マニュアルを しっかり 読み込んだので、基本操作は スムーズに こなせるように なりました。',
        romaji: 'Hai, Kenji-san! Manyuaru o shikkari yomikonda node, kihon sousa wa sumuuzu ni konaseru you ni narimashita.',
        idText: 'Ya, Kenji-san! Karena saya telah mempelajari manualnya secara mendalam, saya sudah bisa menjalankan pengoperasian dasar dengan lancar.'
      },
      {
        id: 'd3',
        speaker: 'Kenji',
        speakerRole: 'Senior Systems Architect',
        avatar: '👨‍💻',
        jp: '素早【すばや】い 習得【しゅうとく】ですね。ただし、高精度【こうせいど】な 溶接【ようせつ】作業【さぎょう】を やり抜【ぬ】くには、さらなる 微調整【びちょうせい】が 必要【ひつよう】です。',
        furigana: '素早い 習得ですね。ただし、高精度な 溶接作業を やり抜くには、さらなる 微調整が 必要です。',
        romaji: 'Subayai shuutoku desu ne. Tadashi, kouseidona yousetsu sagyou o yarinuku ni wa, saranaru bichousei ga hitsuyou desu.',
        idText: 'Penguasaan yang cepat ya. Namun, untuk menuntaskan pekerjaan pengelasan presisi tinggi sampai tuntas, masih diperlukan penyesuaian halus lebih lanjut.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ エラーログを 徹底的【てっていてき】に 洗【あら】い出【だ】し、完璧【かんぺき】に 設定【せってい】を 仕上【しあ】げます。',
        furigana: '承知いたしました！ エラーログを 徹底的に 洗い出し、完璧に 設定を 仕上げます。',
        romaji: 'Shouchi itashimashita! Eraarogu o tetteiteki ni araidashi, kampeki ni settei o shiagemasu.',
        idText: 'Dimengerti! Saya akan menyisir log kesalahan secara menyeluruh dan menyempurnakan pengaturannya secara sempurna.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "区分 (くぶん)" dalam manajemen suku cadang industri?',
        sentencePrompt: 'Istilah "区分 (くぶん)" dalam logistik industri bermakna:',
        options: [
          'Pengelompokan atau pembagian kategori secara teratur',
          'Pembersihan tangki cairan pendingin',
          'Pembatalan kontrak pemasok bahan baku',
          'Pemasangan kabel daya tegangan tinggi'
        ],
        correctAnswer: 'Pengelompokan atau pembagian kategori secara teratur',
        explanation: '"区分 (くぶん)" bermakna pembagian, klasifikasi, atau pemilahan kategori sistematis.',
        diagnosticFeedback: {
          'Pembersihan tangki cairan pendingin': 'Salah: Pembersihan adalah 洗浄 (senjou) atau 清掃 (seisou).',
          'Pembatalan kontrak pemasok bahan baku': 'Salah: Pembatalan kontrak adalah 契約解除 (keiyaku kaijo).',
          'Pemasangan kabel daya tegangan tinggi': 'Salah: Pemasangan kabel adalah 配線 (haisen).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat berikut dengan pola yang menyatakan kemahiran pengoperasian:',
        sentencePrompt: '新人【しんじん】ながら、彼【かれ】は 最新【さいしん】の 測定器【そくていき】を 実【じつ】に 見事【みごと】に [　　] いる。',
        options: [
          '扱【あつか】いこなして',
          '扱【あつか】いきれて',
          '扱【あつか】いあわせて',
          '扱【あつか】いなおして'
        ],
        correctAnswer: '扱【あつか】いこなして',
        explanation: 'Pola 〜こなす menyatakan kemampuan mengoperasikan sesuatu yang rumit secara mahir dan luwes.',
        diagnosticFeedback: {
          '扱【あつか】いきれて': 'Kekeliruan Nuansa: 〜きる menyatakan menghabiskan atau menyudahi, bukan kemahiran terampil.',
          '扱【あつか】いあわせて': 'Kekeliruan Pola: 〜あう menyatakan saling melakukan secara timbal balik.',
          '扱【あつか】いなおして': 'Kekeliruan Pola: 〜なおす menyatakan mengulang kembali dari awal karena ada kekurangan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Nuansa Gramatikal): Manakah kalimat yang menggunakan pola 〜こなす secara tepat?',
        sentencePrompt: 'Pilihlah kalimat dengan pemakaian 〜こなす yang paling gramatikal dan alami:',
        options: [
          '彼【かれ】は 膨大【ぼうだい】な 事務【じむ】処理【しょり】を 迅速【じんそく】に こなした。',
          '雨【あめ】が 朝【あさ】から 激【はげ】しく 降【ふ】りこなしている。',
          '疲【つか】れすぎて、もう 一歩【いっぽ】も 歩【ある】きこなせない。',
          '会議【かいぎ】室【しつ】の 電灯【でんとう】を 全部【ぜんぶ】 消【け】しこなした。'
        ],
        correctAnswer: '彼【かれ】は 膨大【ぼうだい】な 事務【じむ】処理【しょり】を 迅速【じんそく】に こなした。',
        explanation: '〜こなす digunakan untuk menyelesaikan tugas yang membutuhkan keterampilan atau efisiensi (memproses tugas).',
        diagnosticFeedback: {
          '雨【あめ】が 朝【あさ】から 激【はげ】しく 降【ふ】りこなしている。': 'Kekeliruan Subjek: Fenomena alam tidak dapat dipadukan dengan 〜こなす yang membutuhkan kehendak/keterampilan.',
          '疲【つか】れすぎて、もう 一歩【いっぽ】も 歩【ある】きこなせない。': 'Kekeliruan Pola: Untuk batas fisik ketidakmampuan melangkah, gunakan 歩けない atau 歩ききれない.',
          '会議【かいぎ】室【しつ】の 電灯【でんとう】を 全部【ぜんぶ】 消【け】しこなした。': 'Kekeliruan Kolokasi: Mematikan lampu adalah tindakan mekanis sederhana, tepatnya 消し終えた atau 消しきった.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat padu yang gramatikal:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'マニュアルを 読【よ】み込【こ】んで 設定【せってい】を こなす',
          '設定【せってい】を こなす マニュアルを 読【よ】み込【こ】んで',
          '読【よ】み込【こ】んで マニュアルを 設定【せってい】を こなす',
          'マニュアルを こなす 設定【せってい】を 読【よ】み込【こ】んで'
        ],
        correctAnswer: 'マニュアルを 読【よ】み込【こ】んで 設定【せってい】を こなす',
        explanation: 'Urutan alami: Pelajari manual secara mendalam (マニュアルを読み込んで), lalu selesaikan pengaturan dengan mahir (設定をこなす).',
        diagnosticFeedback: {
          '設定【せってい】を こなす マニュアルを 読【よ】み込【こ】んで': 'Kekeliruan Urutan: Klausa prasyarat penjelas terbalik dari klausa tindakan akhir.',
          '読【よ】み込【こ】んで マニュアルを 設定【せってい】を こなす': 'Kekeliruan Partikel: Partikel objek を mendahului kata kerjanya, bukan sebaliknya.',
          'マニュアルを こなす 設定【せってい】を 読【よ】み込【こ】んで': 'Kekeliruan Kolokasi: Objek manual dipadukan dengan membaca (yomikomu), bukan konasu.'
        },
        tokens: ['マニュアルを', '読【よ】み込【こ】んで', '設定【せってい】を', 'こなす'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Respons Kerja Profesional): Saat Kenji mengingatkan: 「高精度な 溶接作業を やり抜くには、さらなる 微調整が 必要です」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan ketelitian teknis dan kesiapan bekerja tuntas:',
        options: [
          '承知【しょうち】いたしました！ エラーログを 徹底的【てっていてき】に 洗【あら】い出【だ】し、完璧【かんぺき】に 設定【せってい】を 仕上【しあ】げます。',
          'もう 基準【きじゅん】内【ない】なので、これ 以上【いじょう】の 微調整【びちょうせい】は 面倒【めんどう】ですから 省略【しょうりゃく】します。',
          '健二【けんじ】さん、ロボットの ことは 忘【わす】れて、一緒【いっしょ】に ゲームでも しませんか？',
          '微調整【びちょうせい】なんて 私【わたし】の 仕事【しごと】じゃないので、メーカーの 人【ひと】を 呼【よ】んでください。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ エラーログを 徹底的【てっていてき】に 洗【あら】い出【だ】し、完璧【かんぺき】に 設定【せってい】を 仕上【しあ】げます。',
        explanation: 'Menunjukkan komitmen terhadap standar mutu tinggi (Kaizen) dan kesiapan bekerja tuntas.',
        diagnosticFeedback: {
          'もう 基準【きじゅん】内【ない】なので、これ 以上【いじょう】の 微調整【びちょうせい】は 面倒【めんどう】ですから 省略【しょうりゃく】します。': 'Ceroboh & Malas: Mengabaikan arahan presisi lead engineer membahayakan mutu produk.',
          '健二【けんじ】さん、ロボットの ことは 忘【わす】れて、一緒【いっしょ】に ゲームでも しませんか？': 'Tidak Profesional: Mengajak bermain di tengah proses pengujian teknis melanggar etika kerja.',
          '微調整【びちょうせい】なんて 私【わたし】の 仕事【しごと】じゃないので、メーカーの 人【ひと】を 呼【よ】んでください。': 'Lepas Tanggung Jawab: Menolak tugas inti kalibrasi merusak kepercayaan tim engineering.'
        }
      }
    ]
  },

  'les-n2-u04-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pola penentuan prasyarat prosedural: 〜上で (setelah menuntaskan prasyarat A, barulah melakukan B) dan tindak lanjut instan: 〜次第 (segera setelah X selesai).',
        canDo: 'Bisa mengoordinasikan eksekusi prosedur bertahap dan melaporkan komitmen tindak lanjut seketika dalam alur kerja rekayasa.',
        targetPatterns: [
          'V-ta / Nの + 上で (setelah ... / berlandaskan hasil ...)',
          'V-masu + 次第 (segera setelah ... langsung ...)'
        ],
        coreVocabSample: ['けんとう', 'じっし', 'かくにん', 'ほうこく', 'れんけい', 'ていしゅつ', 'しんだん', 'てじゅん']
      },
      sensei_context: {
        sceneIntro: 'Ruang integrasi sistem robotika Tsukuba. Kenji menginstruksikan prosedur uji komunikasi antarmuka PLC sebelum penghubungan jalur transfer otomatis.',
        dailyMission: 'Gunakan frasa "kakunin no ue de" dan "shutoku shidai" untuk menegaskan kepatuhan SOP bertahap.',
        whyOrder: 'Pola ~ue de adalah tulang punggung kepatuhan prosedur industri Jepang: tiada tindakan kritis tanpa verifikasi prasyarat tertulis terlebih dahulu.'
      },
      cultural_notes: {
        title: 'Verifikasi Bertahap (確認の上で - Kakunin no Ue de) dalam SOP',
        etiquette: 'Menyatakan "kakunin no ue de susumemasu" memberikan rasa aman maksimal bagi atasan bahwa langkah kerja tidak diambil secara gegabah.',
        taboos: 'Jangan memakai 〜次第 untuk hal-hal di masa lampau. Pola ini khusus merujuk komitmen tindakan masa depan begitu kondisi terpenuhi.'
      },
      pronunciation_tips: {
        title: 'Artikulasi "Ue de" dan "Shidai"',
        moraNote: 'Frasa "ue de" dilafalkan dengan dua vokal bersih u-e tanpa menyatukannya menjadi diftong kotor.',
        soundTip: 'Pada "shidai", beri intonasi turun lembut di akhir mora i.'
      },
      common_pitfalls: [
        {
          title: 'Salah Bentuk Verba Sebelum 〜上で',
          caseScenario: 'Memasukkan bentuk kamus untuk tindakan yang mensyaratkan selesainya tahap awal.',
          pitfallWarning: '確認【かくにん】する 上【うえ】で、連絡【れんらく】します。 (Rancu)',
          rightSolution: '確認【かくにん】した 上【うえ】で、連絡【れんらく】します。 (Tepat)',
          explanation: 'Bila bermakna "setelah melakukan X baru melakukan Y", verba sebelum 上で wajib berbentuk lampau (Ta-kei) atau Nomina + の.'
        },
        {
          title: 'Memakai Kata Kerja Masa Lampau Sebelum 〜次第',
          caseScenario: 'Mengatakan "sudah selesai shidai".',
          pitfallWarning: '準備【じゅんび】が 終【お】わった 次第【しだい】、行【い】きました。 (Salah)',
          rightSolution: '準備【じゅんび】が 終【お】わり 次第【しだい】、伺【うかが】います。 (Tepat: masa depan)',
          explanation: '〜次第 (segera setelah) selalu dilekatkan pada Verba Masu-stem dan predikat penutupnya wajib berupa niat/instruksi masa depan.'
        }
      ],
      who_and_when: {
        situational_context: 'Penyampaian rencana implementasi sistem, briefing alur kerja kepada vendor, dan konfirmasi jadwal rilis.',
        social_relations: 'Komunikasi eksekutif formal antara lead engineer dan staf rekayasa.',
        when_not_to_use: 'Jangan gunakan pada rutinitas refleks alamiah sehari-hari seperti "setelah bangun tidur langsung membuka mata".'
      },
      scenario: {
        title: 'Otorisasi Uji Integrasi Jalur Otomatis',
        setting: 'Terminal Kontrol Pusat Lab Tsukuba, pukul 14.15',
        narrative: 'Kenji mengecek kepatuhan verifikasi sensor Budi sebelum menghubungkan sinyal ke konveyor utama.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Kenji',
        speakerRole: 'Senior Systems Architect',
        avatar: '👨‍💻',
        jp: 'ブディさん、自動【じどう】搬送【はんそう】システムへの 本格【ほんかく】接続【せつぞく】は、安全【あんぜん】確認【かくにん】の 上【うえ】で 進【すす】めていますか？',
        furigana: 'ブディさん、自動搬送システムへの 本格接続は、安全確認の 上で 進めていますか？',
        romaji: 'Budi-san, jidou hansou shisutemu e no honkaku setsuzoku wa, anzen kakunin no ue de susumete imasu ka?',
        idText: 'Budi, apakah penyambungan utama ke sistem konveyor otomatis ini kamu jalankan setelah verifikasi keselamatan?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ 各【かく】センサーの 通信【つうしん】テストを 実施【じっし】した 上【うえ】で、異常【いじょう】がないことを 確認【かくにん】いたしました。',
        furigana: 'はい！ 各センサーの 通信テストを 実施した 上で、異常がないことを 確認いたしました。',
        romaji: 'Hai! Kaku sensaa no tsuushin tesuto o jisshi shita ue de, ijou ga nai koto o kakunin itashimashita.',
        idText: 'Ya! Setelah melaksanakan uji komunikasi pada masing-masing sensor, saya telah memastikan bahwa tidak ada anomali.'
      },
      {
        id: 'd3',
        speaker: 'Kenji',
        speakerRole: 'Senior Systems Architect',
        avatar: '👨‍💻',
        jp: '了解【りょうかい】です。では、最終【さいしゅう】テストの ログが 出【で】次第【しだい】、すぐに 開発【かいはつ】チームへ 共有【きょうゆう】してください。',
        furigana: '了解です。では、最終テストの ログが 出次第、すぐに 開発チームへ 共有してください。',
        romaji: 'Ryoukai desu. Dewa, saishuu tesuto no rogu ga deshidai, sugu ni kaihatsu chiimu e kyouyuu shite kudasai.',
        idText: 'Paham. Kalau begitu, segera setelah log pengujian akhir keluar, tolong langsung bagikan ke tim pengembang.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'かしこまりました！ ログを 取得【しゅとく】し次第【しだい】、速【すみ】やかに 分析【ぶんせき】レポートを 提出【ていしゅつ】いたします。',
        furigana: 'かしこまりました！ ログを 取得し次第、速やかに 分析レポートを 提出いたします。',
        romaji: 'Kashikomarimashita! Rogu o shutoku shishidai, sumiyaka ni bunseki repooto o teishutsu itashimasu.',
        idText: 'Dimengerti! Segera setelah berhasil memperoleh log-nya, saya akan langsung menyerahkan laporan analisisnya.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "検討 (けんとう)" dalam evaluasi teknis?',
        sentencePrompt: 'Istilah "検討 (けんとう) する" dalam rapat teknis bermakna:',
        options: [
          'Mengkaji, meneliti, atau mempertimbangkan secara saksama',
          'Membuang peralatan lama ke tempat daur ulang',
          'Memberhentikan operasional pabrik secara permanen',
          'Mengganti oli mesin setiap 500 jam kerja'
        ],
        correctAnswer: 'Mengkaji, meneliti, atau mempertimbangkan secara saksama',
        explanation: '"検討 (けんとう)" bermakna mengkaji kelayakan, menimbang opsi, atau memeriksa secara mendalam sebelum memutuskan.',
        diagnosticFeedback: {
          'Membuang peralatan lama ke tempat daur ulang': 'Salah: Pembuangan barang bekas adalah 廃棄 (haiki).',
          'Memberhentikan operasional pabrik secara permanen': 'Salah: Penutupan fasilitas permanen adalah 閉鎖 (heisa).',
          'Mengganti oli mesin setiap 500 jam kerja': 'Salah: Penggantian oli adalah オイル交換 (oiru koukan).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan tindakan seketika setelah suatu peristiwa:',
        sentencePrompt: '工場長【こうじょうちょう】が 到着【とうちゃく】[　　]、直【ただ】ちに 全体【ぜんたい】ミーティングを 始【はじ】めます。',
        options: [
          'し次第【しだい】',
          'した 上【うえ】で',
          'する につれて',
          'した ところで'
        ],
        correctAnswer: 'し次第【しだい】',
        explanation: 'V-masu + 次第 menyatakan "segera setelah X terjadi, langsung melakukan Y". 到着し次第 = begitu tiba langsung...',
        diagnosticFeedback: {
          'した 上【うえ】で': 'Kekeliruan Nuansa: 〜上で menekankan musyawarah atau pertimbangan prasyarat yang memakan waktu, bukan kesegeraan instan.',
          'する につれて': 'Kekeliruan Pola: 〜につれて menyatakan perubahan proporsional bertahap (seiring berjalannya waktu).',
          'した ところで': 'Kekeliruan Pola: 〜たところで menyatakan konsesi skeptis (bahkan seandainya X dilakukan pun, hasilnya sia-sia).'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kesesuaian Bentuk): Manakah kalimat yang menggunakan pola 〜上で secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜上で dengan bentuk gramatikal yang benar:',
        options: [
          '両親【りょうしん】と 相談【そうだん】した 上【うえ】で、進路【しんろ】を 決【き】めたいと 思【おも】います。',
          '両親【りょうしん】と 相談【そうだん】する 上【うえ】で、進路【しんろ】を 決【き】めました。',
          '進路【しんろ】を 決【き】めた 上【うえ】で、両親【りょうしん】に 相談【そうだん】を 頼【たの】まれました。',
          '相談【そうだん】の 上【うえ】に、進路【しんろ】が 自然【しぜん】に 決【き】まりました。'
        ],
        correctAnswer: '両親【りょうしん】と 相談【そうだん】した 上【うえ】で、進路【しんろ】を 決【き】めたいと 思【おも】います。',
        explanation: 'Bentuk lampau (Ta-kei) + 上で menyatakan bahwa tindakan kedua dilakukan berlandaskan hasil dari tindakan pertama (setelah berdiskusi).',
        diagnosticFeedback: {
          '両親【りょうしん】と 相談【そうだん】する 上【うえ】で、進路【しんろ】を 決【き】めました。': 'Kekeliruan Bentuk: Sebelum 上で untuk arti "setelah", kata kerja wajib berbentuk lampau (soudan shita), bukan kamus.',
          '進路【しんろ】を 決【き】めた 上【うえ】で、両親【りょうしん】に 相談【そうだん】を 頼【たの】まれました。': 'Logika Terbalik: Menetapkan masa depan baru kemudian berdiskusi memutarbalikkan etika pertimbangan keluarga.',
          '相談【そうだん】の 上【うえ】に、進路【しんろ】が 自然【しぜん】に 決【き】まりました。': 'Kekeliruan Partikel: Bentuk yang baku adalah 〜の上で, sedangkan 〜の上に bermakna "selain daripada itu / ditambah lagi".'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun potongan frasa berikut menjadi alur laporan kerja yang benar:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'ログを 取得【しゅとく】し次第【しだい】 レポートを 提出【ていしゅつ】いたします',
          'レポートを 提出【ていしゅつ】いたします ログを 取得【しゅとく】し次第【しだい】',
          '取得【しゅとく】し次第【しだい】 ログを レポートを 提出【ていしゅつ】いたします',
          'ログを レポートを 取得【しゅとく】し次第【しだい】 提出【ていしゅつ】いたします'
        ],
        correctAnswer: 'ログを 取得【しゅとく】し次第【しだい】 レポートを 提出【ていしゅつ】いたします',
        explanation: 'Urutan baku: Klausa syarat waktu (ログを取得し次第) mendahului tindakan utama (レポートを提出いたします).',
        diagnosticFeedback: {
          'レポートを 提出【ていしゅつ】いたします ログを 取得【しゅとく】し次第【しだい】': 'Kekeliruan Urutan: Predikat penutup ditaruh di depan klausa waktu.',
          '取得【しゅとく】し次第【しだい】 ログを レポートを 提出【ていしゅつ】いたします': 'Kekeliruan Sintaksis: Objek "rogu o" harus berada sebelum verba "shutoku shi-shidai".',
          'ログを レポートを 取得【しゅとく】し次第【しだい】 提出【ていしゅつ】いたします': 'Tumpukan Partikel: Menggabungkan dua partikel objek "o" berturut-turut tanpa pemisah klausa membuat kalimat rusak.'
        },
        tokens: ['ログを', '取得【しゅとく】し次第【しだい】', 'レポートを', '提出【ていしゅつ】いたします'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Eksekusi): Saat Kenji mengarahkan: 「最終テストの ログが 出次第、すぐに 開発チームへ 共有してください」, bagaimana tanggapan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang menunjukkan kecepatan tindak lanjut dan tanggung jawab:',
        options: [
          'かしこまりました！ ログを 取得【しゅとく】し次第【しだい】、速【すみ】やかに 分析【ぶんせき】レポートを 提出【ていしゅつ】いたします。',
          '今【いま】は 忙【いそが】しいので、来週【らいしゅう】の 金曜日【きんようび】くらいに 送【おく】れば いいですか？',
          '共有【きょうゆう】するの 忘【わす】れそうなので、健二【けんじ】さんが 自分【じぶん】で ログを 取【と】ってください。',
          'テストなんて どうでもいいので、早【はや】く 帰【かえ】って ビールを 飲【の】みましょう！'
        ],
        correctAnswer: 'かしこまりました！ ログを 取得【しゅとく】し次第【しだい】、速【すみ】やかに 分析【ぶんせき】レポートを 提出【ていしゅつ】いたします。',
        explanation: 'Ragam Kenjougo "teishutsu itashimasu" dan komitmen "shutoku shishidai" adalah standar kerja profesional Jepang.',
        diagnosticFeedback: {
          '今【いま】は 忙【いそが】しいので、来週【らいしゅう】の 金曜日【きんようび】くらいに 送【おく】れば いいですか？': 'Lamban: Mengulur waktu hingga minggu depan bertentangan dengan instruksi "sugu ni".',
          '共有【きょうゆう】するの 忘【わす】れそうなので、健二【けんじ】さんが 自分【じぶん】で ログを 取【と】ってください。': 'Kurang Ajar: Melempar tugas kembali kepada supervisor sangat tidak pantas.',
          'テストなんて どうでもいいので、早【はや】く 帰【かえ】って ビールを 飲【の】みましょう！': 'Meremehkan Tugas: Mengabaikan integritas testing dan mengajak minum di jam kerja.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 5: Gejolak Emosi, Dorongan Spontan & Resonansi Batin
  // ─────────────────────────────────────────────────────────────
  'les-n2-u05-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai penyesuaian kebutuhan profesional: 〜に応じた (yang disesuaikan dengan...) dan evaluasi standar sikap: 〜ようでは (kalau bersikap begitu, mustahil...).',
        canDo: 'Bisa merancang panduan kerja yang adaptif terhadap kapasitas individu serta mengevaluasi kedewasaan sikap kerja secara konstruktif.',
        targetPatterns: [
          'N + に応じた / に応じて (yang disesuaikan dengan / sejalan dengan)',
          'V-plain + ようでは / ようじゃ (kalau bersikap demikian, maka mustahil...)'
        ],
        coreVocabSample: ['てきおう', 'はいりょ', 'きょうかん', 'しどう', 'りかい', 'ゆとり', 'たいおう', 'しせい']
      },
      sensei_context: {
        sceneIntro: 'Ruang istirahat dan konsultasi pendampingan magang multinasional di Shizuoka. Sakura (Konsultan Manajemen) berdiskusi dengan Budi mengenai metode bimbingan rekan magang baru.',
        dailyMission: 'Gunakan "ni oujita" untuk menawarkan solusi personal dan pahami peringatan "you dewa" untuk menjaga ketenangan membimbing.',
        whyOrder: 'Komunikasi N2 tidak hanya menuntut instruksi teknis, melainkan kecerdasan emosional dalam menyesuaikan pendekatan pengajaran terhadap kapasitas rekan kerja.'
      },
      cultural_notes: {
        title: 'Bimbingan Adaptif (個別指導) dan Kedewasaan Sikap (大人の対応)',
        etiquette: 'Dalam filosofi Omoiyari, instruktur senior harus menunjukkan kematangan emosi. Bila mentor tampak panik, junior akan kehilangan rasa percaya diri.',
        taboos: 'Jangan menggunakan frasa 〜ようでは untuk memarahi bawahan di depan forum umum. Sampaikan kritik tajam ini hanya dalam sesi mentoring empat mata (Mendan).'
      },
      pronunciation_tips: {
        title: 'Intonasi Penyesuaian dan Peringatan',
        moraNote: 'Pada "ni oujita", morfem ou dilafalkan panjang 2 mora: o-o-ji-ta.',
        soundTip: 'Pada "you dewa", turunkan sedikit nada pada de-wa untuk memberi penekanan peringatan yang berbobot tanpa terdengar berteriak.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜に応じた (Modifikasi Nomina) vs 〜に応じて (Bentuk Adverbial)',
          caseScenario: 'Menggunakan "ni oujite" langsung sebelum kata benda tanpa partikel modifikasi.',
          pitfallWarning: '能力【のうりょく】に 応【おう】じて 指導【しどう】マニュアル (Kurang tepat secara gramatikal)',
          rightSolution: '能力【のうりょく】に 応【おう】じた 指導【しどう】マニュアル (Tepat: menerangkan nomina)',
          explanation: 'Bila menerangkan kata benda berikutnya, gunakan bentuk 〜に応じた. Bila memodifikasi kata kerja predikat, gunakan 〜に応じて.'
        },
        {
          title: 'Salah Nada Akibat 〜ようでは yang Bersifat Negatif Mutlak',
          caseScenario: 'Memakai 〜ようでは untuk hasil yang positif.',
          pitfallWarning: '頑張【がんば】る ようでは、成功【せいこう】します。 (Salah)',
          rightSolution: 'ミスを 恐【おそ】れる ようでは、成長【せいちょう】できない。 (Tepat: hasil negatif/kendala)',
          explanation: 'Pola 〜ようでは selalu diikuti oleh klausa evaluasi negatif (tidak akan berhasil, payah, tidak ada kemajuan).'
        }
      ],
      who_and_when: {
        situational_context: 'Penyusunan kurikulum pelatihan internal, evaluasi kinerja bulanan staf, dan konsultasi empat mata.',
        social_relations: 'Konsultasi kolegial hangat antara mentor senior (Sakura) dan praktisi pembelajar (Budi).',
        when_not_to_use: 'Jangan gunakan 〜ようでは kepada atasan langsung karena menyiratkan penilaian meremehkan standar kompetensi lawan bicara.'
      },
      scenario: {
        title: 'Penyempurnaan Modul Pelatihan Adaptif',
        setting: 'Ruang Konsultasi Kemitraan Shizuoka, pukul 11.00',
        narrative: 'Sakura menelaah draf materi orientasi magang yang disusun Budi agar ramah bagi peserta pemula.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、現場【げんば】の 習熟【しゅうじゅく】度【ど】に 応【おう】じた 指導【しどう】マニュアルの 改訂【かいてい】は、うまく 進【すす】んでいますか？',
        furigana: 'ブディさん、現場の 習熟度に 応じた 指導マニュアルの 改訂は、うまく 進んでいますか？',
        romaji: 'Budi-san, gemba no shuujukudo ni oujita shidou manyuaru no kaitei wa, umaku susunde imasu ka?',
        idText: 'Budi, apakah revisi manual bimbingan yang disesuaikan dengan tingkat kemahiran lapangan berjalan lancar?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、さくらさん！ 各自【かくじ】の 理解度【りかいど】に 応【おう】じて、図解【ずかい】入【い】りの 解説【かいせつ】を 追加【ついか】しております。',
        furigana: 'はい、さくらさん！ 各自の 理解度に 応じて、図解入りの 解説を 追加しております。',
        romaji: 'Hai, Sakura-san! Kakuji no rikaido ni oujite, zukaiiri no kaisetsu o tsuika shite orimasu.',
        idText: 'Ya, Sakura-san! Disesuaikan dengan tingkat pemahaman masing-masing, saya telah menambahkan penjelasan bergambar.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: '丁寧【ていねい】な 工夫【くふう】ですね。ただ、指導者【しどうしゃ】が 焦【あせ】る ようでは、後輩【こうはい】たちも 不安【ふあん】に なってしまいますよ。',
        furigana: '丁寧な 工夫ですね。ただ、指導者が 焦る ようでは、後輩たちも 不安に なってしまいますよ。',
        romaji: 'Teineina kufuu desu ne. Tada, shidousha ga aseru you dewa, kouhaitachi mo fuan ni natte shimaimasu yo.',
        idText: 'Inovasi yang teliti ya. Namun, kalau instrukturnya tampak tergesa-gesa/panik, para junior pun akan ikut merasa cemas lho.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ご指摘【してき】の 通【とお】りです。常【つね】に 余裕【よゆう】を 持【も】って、温【あたた】かく サポートするよう 心【こころ】がけます。',
        furigana: 'ご指摘の 通りです。常に 余裕を 持って、温かく サポートするよう 心がけます。',
        romaji: 'Goshiteki no toori desu. Tsuneni yoyuu o motte, atatakaku sapooto suru you kokorogakemasu.',
        idText: 'Tepat seperti yang Anda sampaikan. Saya akan selalu berupaya tenang dan memberikan pendampingan yang hangat.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "適応 (てきおう)" dalam pendampingan kerja multinasional?',
        sentencePrompt: 'Istilah "環境【かんきょう】への 適応【てきおう】" bermakna:',
        options: [
          'Penyesuaian diri secara harmonis terhadap lingkungan baru',
          'Penolakan terhadap budaya setempat secara terang-terangan',
          'Pengrusakan fasilitas kantor akibat frustrasi',
          'Pergantian kewarganegaraan secara mendadak'
        ],
        correctAnswer: 'Penyesuaian diri secara harmonis terhadap lingkungan baru',
        explanation: '"適応 (てきおう)" bermakna proses beradaptasi dan menyesuaikan diri dengan kondisi atau iklim lingkungan kerja.',
        diagnosticFeedback: {
          'Penolakan terhadap budaya setempat secara terang-terangan': 'Salah: Penolakan adalah 拒絶 (kyozetsu) atau 反発 (hampatsu).',
          'Pengrusakan fasilitas kantor akibat frustrasi': 'Salah: Pengrusakan barang adalah 器物損壊 (kibutsu sonkai).',
          'Pergantian kewarganegaraan secara mendadak': 'Salah: Pergantian kewarganegaraan adalah 帰化 (kika).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola modifikasi nomina yang tepat:',
        sentencePrompt: '参加者【さんかしゃ】の 年齢【ねんれい】や 体力【たいりょく】[　　] トレーニング計画【けいかく】を 作成【さくせい】した。',
        options: [
          'に 応【おう】じた',
          'に 応【おう】じて',
          'の 上【うえ】で',
          'し 次第【しだい】'
        ],
        correctAnswer: 'に 応【おう】じた',
        explanation: 'Untuk memodifikasi kata benda berikutnya (トレーニング計画), gunakan bentuk 〜に応じた (yang disesuaikan dengan...).',
        diagnosticFeedback: {
          'に 応【おう】じて': 'Kekeliruan Bentuk: 〜に応じて berfungsi sebagai adverbia predikat, sedangkan di sini kalimat membutuhkan pemodifikasi nomina (keikaku).',
          'の 上【うえ】で': 'Kekeliruan Nuansa: 〜の上で bermakna "setelah menuntaskan pertimbangan", bukan kesesuaian proporsi karakteristik peserta.',
          'し 次第【しだい】': 'Kekeliruan Pola: 〜次第 berarti segera setelah, tidak cocok dengan nomina usia/stamina.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Konsekuensi): Manakah kalimat yang menggunakan 〜ようでは secara benar?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ようでは secara gramatikal dan bernuansa tepat:',
        options: [
          'こんな 簡単【かんたん】な 単語【たんご】で つまずく ようでは、N2 合格【ごうかく】など 思【おぼ】つかない。',
          '毎日【まいにち】 一生懸命【いっしょうけんめい】 勉強【べんきょう】する ようでは、きっと 合格【ごうかく】できる。',
          '笑顔【えがお】で 挨拶【あいさつ】する ようでは、みんなから 信頼【しんらい】される。',
          '時間【じかん】を 厳守【げんしゅ】する ようでは、プロの 技術者【ぎじゅつしゃ】として 頼【たよ】もしい。'
        ],
        correctAnswer: 'こんな 簡単【かんたん】な 単語【たんご】で つまずく ようでは、N2 合格【ごうかく】など 思【おぼ】つかない。',
        explanation: 'Pola 〜ようでは mensyaratkan kondisi negatif/kekurangan di klausa pertama yang berujung pada kemustahilan/kegagalan di klausa kedua.',
        diagnosticFeedback: {
          '毎日【まいにち】 一生懸命【いっしょうけんめい】 勉強【べんきょう】する ようでは、きっと 合格【ごうかく】できる。': 'Kekeliruan Makna: Klausa kedua bernada positif berhasil (goukaku dekiru), tidak boleh dipadukan dengan 〜ようでは.',
          '笑顔【えがお】で 挨拶【あいさつ】する ようでは、みんなから 信頼【しんらい】される。': 'Kekeliruan Nada: Menyapa dengan ramah adalah perbuatan terpuji, tidak cocok untuk pola kritik 〜ようでは.',
          '時間【じかん】を 厳守【げんしゅ】する ようでは、プロの 技術者【ぎじゅつしゃ】として 頼【たよ】もしい。': 'Kekeliruan Nada: Tepat waktu adalah kualitas profesional positif, bertentangan dengan fungsi celaan 〜ようでは.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat nasihat yang benar:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '指導者【しどうしゃ】が 焦【あせ】る ようでは 後輩【こうはい】も 不安【ふあん】になる',
          '後輩【こうはい】も 不安【ふあん】になる 指導者【しどうしゃ】が 焦【あせ】る ようでは',
          '焦【あせ】る ようでは 指導者【しどうしゃ】が 後輩【こうはい】も 不安【ふあん】になる',
          '指導者【しどうしゃ】が 不安【ふあん】になる 焦【あせ】る ようでは 後輩【こうはい】も'
        ],
        correctAnswer: '指導者【しどうしゃ】が 焦【あせ】る ようでは 後輩【こうはい】も 不安【ふあん】になる',
        explanation: 'Urutan logis: Klausa syarat pengandaian celaan (指導者が焦るようでは) mendahului dampak psikologis junior (後輩も不安になる).',
        diagnosticFeedback: {
          '後輩【こうはい】も 不安【ふあん】になる 指導者【しどうしゃ】が 焦【あせ】る ようでは': 'Kekeliruan Urutan: Konsekuensi diletakkan mendahului klausa syarat pengandaian.',
          '焦【あせ】る ようでは 指導者【しどうしゃ】が 後輩【こうはい】も 不安【ふあん】になる': 'Kekeliruan Subjek: Partikel subjek が harus berada langsung setelah nomina pemimpin (shidousha ga).',
          '指導者【しどうしゃ】が 不安【ふあん】になる 焦【あせ】る ようでは 後輩【こうはい】も': 'Susunan Acak: Merancukan subjek pemimpin dengan predikat cemas.'
        },
        tokens: ['指導者【しどうしゃ】が', '焦【あせ】る ようでは', '後輩【こうはい】も', '不安【ふあん】になる'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Kematangan Emosi): Saat Sakura menasihati: 「指導者が 焦るようでは、後輩たちも 不安になってしまいますよ」, bagaimana respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang menunjukkan keterbukaan menerima masukan dan ketenangan mental:',
        options: [
          'ご指摘【してき】の 通【とお】りです。常【つね】に 余裕【よゆう】を 持【も】って、温【あたた】かく サポートするよう 心【こころ】がけます。',
          '後輩【こうはい】たちが 悪【わる】いんです！ 何度【なんど】 言【い】っても 理解【りかい】しないから イライラするんです。',
          'さくらさん、そんな 小【ちい】さな ことで 私【わたし】に 説教【せっきょう】しないでください。',
          'もう 指導【しどう】なんて やめたいです。明日【あした】から 会社【かいしゃ】を 休【やす】みます。'
        ],
        correctAnswer: 'ご指摘【してき】の 通【とお】りです。常【つね】に 余裕【よゆう】を 持【も】って、温【あたた】かく サポートするよう 心【こころ】がけます。',
        explanation: 'Menerima masukan mentor dengan berjiwa besar (Goshiteki no toori desu) dan bertekad menjaga ketenangan.',
        diagnosticFeedback: {
          '後輩【こうはい】たちが 悪【わる】いんです！ 何度【なんど】 言【い】っても 理解【りかい】しないから イライラするんです。': 'Menyalahkan Bawahan: Melampiaskan emosi dan menyalahkan peserta didik bertentangan dengan profesionalisme pembimbing.',
          'さくらさん、そんな 小【ちい】さな ことで 私【わたし】に 説教【せっきょう】しないでください。': 'Defensif & Menentang: Menolak saran konstruksi mentor dengan nada kasar.',
          'もう 指導【しどう】なんて やめたいです。明日【あした】から 会社【かいしゃ】を 休【やす】みます。': 'Kanak-kanak: Mengancam bolos kerja saat diberi masukan menunjukkan ketidakmatangan mental.'
        }
      }
    ]
  },

  'les-n2-u05-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai ekspresi emosi mendalam tak terbendung: 〜てならない (rasa batin alamiah yang sangat kuat) dan komitmen tanggung jawab etis: 〜わけにはいかない (secara moral/tanggung jawab tidak boleh menyerah).',
        canDo: 'Bisa mengutarakan rasa empati tulus terhadap rekan kerja yang menghadapi kesulitan, serta menegaskan tekad pantang menyerah.',
        targetPatterns: [
          'V-te / A-kute / Na-de + ならない (sangat terasa hingga tak tertahankan)',
          'V-dict + わけにはいかない (secara etis/tanggung jawab tidak mungkin melakukan...)'
        ],
        coreVocabSample: ['きょうかん', 'そんちょう', 'しんぱい', 'せきにん', 'はげます', 'ゆうき', 'きずな', 'ぜんりょく']
      },
      sensei_context: {
        sceneIntro: 'Sore hari di teras ruang bimbingan Shizuoka. Sakura dan Budi mengamati peserta magang baru yang tampak rindu kampung halaman dan berdiskusi bagaimana memberikan dukungan moril.',
        dailyMission: 'Ungkapkan empati mendalam dengan "wakatte naranai" dan tegaskan integritas kepemimpinan dengan "makeru wake ni wa ikanai".',
        whyOrder: 'Pola ~te naranai mengekspresikan dorongan batin alamiah (spontan/involunter), sementara ~wake ni wa ikanai adalah jangkar etis: menyelaraskan perasaan hati dengan integritas tanggung jawab sosial.'
      },
      cultural_notes: {
        title: 'Empati Tulus (共感 - Kyoukan) dan Tanggung Jawab Moral Senior (先輩の責任)',
        etiquette: 'Mengakui rasa cemas batin (shimpai de naranai) kepada mentor menunjukkan kejujuran emosional, namun harus diimbangi tekad tidak boleh menyerah (akirameru wake ni wa ikanai).',
        taboos: 'Jangan gunakan 〜てならない untuk kondisi fisik murni sesaat (seperti kebelet buang air kecil). Untuk kondisi fisik mendesak, gunakan 〜てたまらない.'
      },
      pronunciation_tips: {
        title: 'Intonasi Kelembutan Rasa Batin',
        moraNote: 'Pada frasa "te naranai", artikulasikan na-ra-na-i dengan tempo lembut menurun untuk mencerminkan kedalaman batin.',
        soundTip: 'Pada "wake ni wa ikanai", beri penekanan ketegasan pada mora "wa-ke" untuk mempertegas batas prinsip moral.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜てならない (Perasaan Batin Spontan) vs 〜てたまらない (Sensasi Fisik Mendesak)',
          caseScenario: 'Ingin mengatakan sangat haus ingin minum.',
          pitfallWarning: 'のどが 渇【かわ】いて ならない。 (Kurang alami)',
          rightSolution: 'のどが 渇【かわ】いて たまらない。 (Tepat: sensasi fisik mendesak)',
          explanation: '〜てならない digunakan untuk emosi batiniah abstrak (khawatir, penasaran, sedih, rindu), sedangkan 〜てたまらない mencakup sensasi fisik mendesak (haus, gatal, lapar).'
        },
        {
          title: 'Memakai Verba yang Bukan Emosi Spontan Sebelum 〜てならない',
          caseScenario: 'Memasukkan verba tindakan sengaja ke dalam ~te naranai.',
          pitfallWarning: 'パソコンを 買【か】って ならない。 (Salah total)',
          rightSolution: '気【き】に なって ならない。 (Tepat: dorongan rasa penasaran)',
          explanation: 'Pola ini hanya dapat dipadukan dengan kata sifat emosi (shimpai, fuan, kanashii) atau verba spontan (omowareru, ki ni naru).'
        }
      ],
      who_and_when: {
        situational_context: 'Percakapan refleksi empat mata mengenai dinamika tim, konseling bimbingan mental peserta, dan penetapan tekad proyek.',
        social_relations: 'Hubungan saling percaya yang mendalam antara mentor (Sakura) dan junior teladan (Budi).',
        when_not_to_use: 'Jangan gunakan di depan forum audit legal formal yang menuntut bahasa statistik kaku tanpa emosi.'
      },
      scenario: {
        title: 'Dukungan Moril Peserta Magang di Shizuoka',
        setting: 'Teras Gedung Pelatihan Shizuoka, pukul 16.45',
        narrative: 'Matahari terbenam. Sakura dan Budi merenungkan tantangan emosional yang dihadapi para peserta magang baru.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、新【あたら】しく 来【き】た 実習【じっしゅう】生【せい】たちが 日本【にほん】の 寒【さむ】さに 慣【な】れたか、心配【しんぱい】で なりませんね。',
        furigana: 'ブディさん、新しく 来た 実習生たちが 日本の 寒さに 慣れたか、心配で なりませんね。',
        romaji: 'Budi-san, atarashiku kita jisshuuseitachi ga Nihon no samusa ni nareta ka, shimpai de narimasen ne.',
        idText: 'Budi, memikirkan apakah para peserta magang yang baru datang sudah terbiasa dengan dinginnya Jepang, rasanya sangat mencemaskan ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '本当【ほんとう】に そうですね。私【わたし】も 来日【らいにち】当初【とうしょ】は 不安【ふあん】でしたから、彼【かれ】らの 気持【きも】ちが 分【わ】かって なりません。',
        furigana: '本当に そうですね。私も 来日当初は 不安でしたから、彼らの 気持ちが 分かって なりません。',
        romaji: 'Hontou ni sou desu ne. Watashi mo rainichi tousho wa fuan deshita kara, karera no kimochi ga wakatte narimasen.',
        idText: 'Benar sekali. Karena saya pun dulu saat awal tiba di Jepang merasa cemas, saya sangat bisa merasakan apa yang ada di hati mereka.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: '分【わ】かります。でも、先輩【せんぱい】として 私【わたし】たちが 弱気【よわき】に なる わけには いきませんね。',
        furigana: '分かります。でも、先輩として 私たちが 弱気に なる わけには いきませんね。',
        romaji: 'Wakarimasu. Demo, sempai to shite watashitachi ga yowaki ni naru wake ni wa ikimasen ne.',
        idText: 'Saya paham. Namun, sebagai senior, tidak mungkin bagi kita untuk bersikap lemah/pesimistis kan.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'おっしゃる 通【とお】りです！ 頼【たよ】れる 先輩【せんぱい】として、全力【ぜんりょく】で 彼【かれ】らの 生活【せいかつ】と 学【まな】びを 支【ささ】えてまいります。',
        furigana: 'おっしゃる 通りです！ 頼れる 先輩として、全力で 彼らの 生活と 学びを 支えてまいります。',
        romaji: 'Ossharu toori desu! Tayoreru sempai to shite, zenryoku de karera no seikatsu to manabi o sasaete mairimasu.',
        idText: 'Tepat seperti yang Anda katakan! Sebagai senior yang dapat diandalkan, saya akan mendukung kehidupan dan pembelajaran mereka sekuat tenaga.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "共感 (きょうかん)" dalam pembinaan sosial?',
        sentencePrompt: 'Istilah "共感 (きょうかん) を 寄【よ】せる" bermakna:',
        options: [
          'Merasakan simpati dan memahami perasaan orang lain secara mendalam',
          'Mengirimkan barang pesanan melalui kurir ekspres',
          'Memaksa orang lain mengikuti pandangan sepihak kita',
          'Mengambil alih kepemilikan aset secara ilegal'
        ],
        correctAnswer: 'Merasakan simpati dan memahami perasaan orang lain secara mendalam',
        explanation: '"共感 (きょうかん)" bermakna resonansi perasaan, empati, dan ikut merasakan apa yang dirasakan pihak lain.',
        diagnosticFeedback: {
          'Mengirimkan barang pesanan melalui kurir ekspres': 'Salah: Pengiriman ekspres adalah 速達 (sokutatsu) atau 宅急便 (takkyuubin).',
          'Memaksa orang lain mengikuti pandangan sepihak kita': 'Salah: Pemaksaan pandangan adalah 意見の押し付け (iken no oshitsuke).',
          'Mengambil alih kepemilikan aset secara ilegal': 'Salah: Pengambilalihan ilegal adalah 横領 (ouryou) atau 略奪 (ryakudatsu).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan desakan rasa batin yang mendalam:',
        sentencePrompt: '故郷【こきょう】の 家族【かぞく】が 元気【げんき】で 暮【く】らしているか、心配【しんぱい】で [　　]。',
        options: [
          'ならない',
          'たまらない',
          'いられない',
          'いかない'
        ],
        correctAnswer: 'ならない',
        explanation: '心配でならない menyatakan dorongan rasa cemas batiniah spontan yang tak terbendung dari lubuk hati.',
        diagnosticFeedback: {
          'たまらない': 'Kekeliruan Nuansa: 〜たまらない lebih lazim untuk dorongan hasrat subjektif atau fisik mendesak, sedangkan untuk kecemasan batin yang mendalam, 〜ならない adalah bentuk paling elegan.',
          'いられない': 'Kekeliruan Pola: 〜てはいられない menyatakan tidak bisa terus-terusan berdiam diri.',
          'いかない': 'Kekeliruan Pola: 〜わけにはいかない menyatakan batasan norma moral/sosial, bukan ungkapan perasaan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Tanggung Jawab Moral): Manakah kalimat yang menggunakan 〜わけにはいかない secara tepat?',
        sentencePrompt: 'Pilihlah kalimat dengan penggunaan 〜わけにはいかない yang gramatikal dan berbobot moral:',
        options: [
          '明日【あした】は 大事【だいじ】な 試験【しけん】が あるので、今夜【こんや】は 遊【あそ】んでいる わけには いかない。',
          '今日【きょう】は 日曜日【にちようび】なので、早起【はやお】きする わけには いかない。',
          'お腹【なか】が 空【す】いたので、ご飯【はん】を 食【た】べる わけには いかない。',
          '天気【てんき】が いいので、散歩【さんぽ】に 行【い】く わけには いかない。'
        ],
        correctAnswer: '明日【あした】は 大事【だいじ】な 試験【しけん】が あるので、今夜【こんや】は 遊【あそ】んでいる わけには いかない。',
        explanation: '〜わけにはいかない digunakan ketika ada alasan kewajiban moral, tanggung jawab, atau situasi sosial yang melarang kita bersikap santai.',
        diagnosticFeedback: {
          '今日【きょう】は 日曜日【にちようび】なので、早起【はやお】きする わけには いかない。': 'Kekeliruan Logika: Hari Minggu boleh saja bangun pagi, tidak ada pelanggaran moral yang melarangnya.',
          'お腹【なか】が 空【す】いたので、ご飯【はん】を 食【た】べる わけには いかない。': 'Logika Rusak: Bila lapar, sewajarnya makan, bukan dilarang oleh norma moral.',
          '天気【てんき】が いいので、散歩【さんぽ】に 行【い】く わけには いかない。': 'Logika Terbalik: Cuaca cerah justru mendukung jalan-jalan, bukan menjadi kendala etis.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penegasan tekad yang benar:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '先輩【せんぱい】として 私【わたし】たちが 弱気【よわき】に なる わけには いかない',
          '弱気【よわき】に なる 先輩【せんぱい】として 私【わたし】たちが わけには いかない',
          '私【わたし】たちが わけには いかない 先輩【せんぱい】として 弱気【よわき】に なる',
          '先輩【せんぱい】として わけには いかない 私【わたし】たちが 弱気【よわき】に なる'
        ],
        correctAnswer: '先輩【せんぱい】として 私【わたし】たちが 弱気【よわき】に なる わけには いかない',
        explanation: 'Urutan baku: Kedudukan peran (先輩として) + subjek (私たちが) + predikat kondisi (弱気になる) + penutup moral (わけにはいかない).',
        diagnosticFeedback: {
          '弱気【よわき】に なる 先輩【せんぱい】として 私【わたし】たちが わけには いかない': 'Kekeliruan Urutan: Predikat diletakkan di depan sebelum frasa kedudukan sosial.',
          '私【わたし】たちが わけには いかない 先輩【せんぱい】として 弱気【よわき】に なる': 'Kekeliruan Penutup: Pola "wake ni wa ikanai" wajib berada di akhir kalimat penutup.',
          '先輩【せんぱい】として わけには いかない 私【わたし】たちが 弱気【よわき】に なる': 'Kekeliruan Sintaksis: Pola penutup memotong di tengah kalimat.'
        },
        tokens: ['先輩【せんぱい】として', '私【わたし】たちが', '弱気【よわき】に なる', 'わけには いかない'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Sikap Kepemimpinan): Saat Sakura mengingatkan: 「先輩として 私たちが 弱気になる わけにはいきませんね」, apa komitmen terbaik Anda?',
        sentencePrompt: 'Pilihlah respons yang mencerminkan keteguhan integritas kepemimpinan:',
        options: [
          'おっしゃる 通【とお】りです！ 頼【たよ】れる 先輩【せんぱい】として、全力【ぜんりょく】で 彼【かれ】らの 生活【せいかつ】と 学【まな】びを 支【ささ】えてまいります。',
          'もう 嫌【いや】です。自分【じぶん】の ことだけで 精一杯【せいいっぱい】なので、後輩【こうはい】の 面倒【めんどう】なんか 見【み】たくありません。',
          'さくらさん、会社【かいしゃ】から 特別【とくべつ】な 手当【てあて】が 出【で】ないなら、何【なに】も 手伝【てつだ】いませんよ。',
          '実習【じっしゅう】生【せい】なんて 誰【だれ】でも できる 仕事【しごと】ですから、放置【ほうち】しておけば 勝手【かって】に 育【そだ】ちます。'
        ],
        correctAnswer: 'おっしゃる 通【とお】りです！ 頼【たよ】れる 先輩【せんぱい】として、全力【ぜんりょく】で 彼【かれ】らの 生活【せいかつ】と 学【まな】びを 支【ささ】えてまいります。',
        explanation: 'Menunjukkan integritas teladan sebagai senior (Sempai) dengan komitmen penuh (Zenryoku de).',
        diagnosticFeedback: {
          'もう 嫌【いや】です。自分【じぶん】の ことだけで 精一杯【せいいっぱい】なので、後輩【こうはい】の 面倒【めんどう】なんか 見【み】たくありません。': 'Egois: Menolak tanggung jawab membimbing junior merusak kekompakan tim.',
          'さくらさん、会社【かいしゃ】から 特別【とくべつ】な 手当【てあて】が 出【で】ないなら、何【なに】も 手伝【てつだ】いませんよ。': 'Materialistis: Menuntut tunjangan uang saat dimintai dukungan moril sangat tidak etis.',
          '実習【じっしゅう】生【せい】なんて 誰【だれ】でも できる 仕事【しごと】ですから、放置【ほうち】しておけば 勝手【かって】に 育【そだ】ちます。': 'Abai & Lalai: Mengabaikan junior di masa adaptasi melanggar prinsip pembinaan aman dan bermartabat.'
        }
      }
    ]
  }
};

// Merge into existing
const merged = Object.assign({}, existing, u04_05);

const outContent = `// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/units-01-to-05.js
//  Bespoke Gold-Standard Content for N2 Units 1–5 (10 Lessons)
// ══════════════════════════════════════════════════════════════════

module.exports = ${JSON.stringify(merged, null, 2)};
`;

fs.writeFileSync(targetFile, outContent, 'utf8');
console.log(`✅ units-01-to-05.js successfully updated with ${Object.keys(merged).length} lessons!`);
