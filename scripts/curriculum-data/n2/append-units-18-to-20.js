// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/append-units-18-to-20.js
//  Bespoke Gold-Standard Content for N2 Units 18–20 (6 Lessons)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-16-to-20.js');
let currentUnits = {};
if (fs.existsSync(targetFile)) {
  currentUnits = require(targetFile);
}

const u18_20 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 18: Kelayakan Nilai, Kecenderungan Perilaku & Sikap Tegas
  // ─────────────────────────────────────────────────────────────
  'les-n2-u18-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pertimbangan kelayakan penghargaan formal: 〜に値する (patut menerima pengakuan/apresiasi tinggi) dan deteksi kecenderungan kelalaian: 〜がちだ (cenderung sering terjadi kelalaian bila lengah).',
        canDo: 'Bisa mengevaluasi proposal inovasi teknis pemagang magang kerja, memberikan apresiasi objektif, serta mengingatkan celah kelalaian prosedural secara konstruktif.',
        targetPatterns: [
          'V-dictionary / N + に値する (layak ... / patut mendapatkan ... / bernilai tinggi)',
          'V-stem / N + がちだ (cenderung ... / sering terjadi kecenderungan ...)'
        ],
        coreVocabSample: ['ひょうしょう', 'あたいする', 'おこたる', 'ていあん', 'まんしん', 'ゆだん', 'にっぽう', 'こうけん']
      },
      sensei_context: {
        sceneIntro: 'Pabrik perakitan presisi dan pusat pelatihan magang teknis di Kyoto. Tanaka (Supervisor Pabrik & Manajer Lapangan) bersama Budi sedang mengevaluasi portofolio perbaikan kerja (Kaizen) para peserta magang asing.',
        dailyMission: 'Gunakan "ni atai suru" untuk memuji proposal yang luar biasa dan "gachi da" untuk mengidentifikasi kebiasaan buruk yang sering terulang secara diplomatis.',
        whyOrder: 'Level N2 menuntut kemampuan memberikan evaluasi berimbang: tidak hanya memuji secara dangkal, tetapi juga memberikan peringatan preventif terhadap kecenderungan kelalaian sebelum menjadi insiden fatal.'
      },
      cultural_notes: {
        title: 'Filosofi Kaizen dan Evaluasi Kelayakan (改善提案と表彰基準)',
        etiquette: 'Dalam manajemen Jepang, penghargaan diberikan bukan hanya pada hasil akhir, tetapi pada dedikasi perbaikan berkelanjutan (ni atai suru kouseki).',
        taboos: 'Jangan menegur kecenderungan lalai (gachi da) dengan mempermalukan individu di depan umum; gunakan format bimbingan pendampingan profesional.'
      },
      pronunciation_tips: {
        title: 'Artikulasi "Ni Atai Suru" dan "Gachi Da"',
        moraNote: 'Lafalkan "a-ta-i-su-ru" dengan vokal terbuka jernih dan nada wibawa.',
        soundTip: 'Pada "ga-chi-da", gunakan intonasi datar netral agar terdengar sebagai observasi faktual, bukan tuduhan emosional.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜がちだ (Kecenderungan Berulang) vs 〜気味だ (Sedikit Merasa Sakit/Lelah)',
          caseScenario: 'Ingin mengatakan bahwa akhir-akhir ini saya agak merasa lelah atau masuk angin ringan.',
          pitfallWarning: '最近【さいきん】、風邪【かぜ】がちです。 (Salah: pilek bukan kebiasaan berulang)',
          rightSolution: '最近【さいきん】、風邪【かぜ】気味【ぎみ】です。 (Tepat: kondisi fisik sementara)',
          explanation: '〜がちだ digunakan untuk frekuensi kejadian kelalaian atau sifat yang sering kambuh, sedangkan 〜気味だ (gimi da) untuk kondisi fisik/mental yang sedikit condong ke arah negatif.'
        },
        {
          title: 'Menggunakan 〜に値する untuk Hal Remeh Tanpa Bobot Nilai',
          caseScenario: 'Mengatakan bahwa permen ini layak untuk dimakan.',
          pitfallWarning: 'この 飴【あめ】は 食【た】べるに 値【あたい】する。 (Terlalu berlebihan dan aneh)',
          rightSolution: 'この 研究【けんきゅう】は 賞賛【しょうさん】に 値【あたい】する。 (Tepat: karya bernilai bobot)',
          explanation: '〜に値する digunakan untuk apresiasi bernilai tinggi: pujian (賞賛), penghargaan (表彰), rasa hormat (尊敬), atau telaah mendalam.'
        }
      ],
      who_and_when: {
        situational_context: 'Sidang evaluasi kinerja triwulan, penilaian proposal Kaizen, dan pengarahan keselamatan kerja pabrik.',
        social_relations: 'Supervisor pabrik senior (Tanaka) dan asisten instruktur teknis (Budi).',
        when_not_to_use: 'Jangan gunakan ni atai suru untuk memuji hal sepele sehari-hari seperti membuang sampah pada tempatnya.'
      },
      scenario: {
        title: 'Evaluasi Proposal Kaizen Kyoto Precision',
        setting: 'Ruang Musyawarah Pembina Teknis Kyoto, pukul 16.30',
        narrative: 'Tanaka dan Budi meninjau lembar inovasi operasional yang diajukan para pemagang Indonesia di lini perakitan.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Tanaka',
        speakerRole: 'Supervisor Pabrik',
        avatar: '🧑‍💼',
        jp: 'ブディさん、今期【こんき】の 研修生【けんしゅうせい】たちが 提出【ていしゅつ】した 改善【かいぜん】提案【ていあん】は、どれも 表彰【ひょうしょう】に 値【あたい】する 素晴【すば】らしい 内容【ないよう】ですね。',
        furigana: 'ブディさん、今期の 研修生たちが 提出した 改善提案は、どれも 表彰に 値する 素晴らしい 内容ですね。',
        romaji: 'Budi-san, konki no kenshuusei-tachi ga teishutsu shita kaizen teian wa, dore mo hyoushou ni atai suru subarashii naiyou desu ne.',
        idText: 'Budi, proposal perbaikan (Kaizen) yang diajukan para pemagang periode ini semuanya bermutu luar biasa dan patut menerima penghargaan resmi ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ありがとうございます！ ただ、現場【げんば】の 作業【さぎょう】に 集中【しゅうちゅう】するあまり、日報【にっぽう】の 提出【ていしゅつ】を 怠【おこた】りがちな 面【めん】が まだ 見受【みう】けられます。',
        furigana: 'ありがとうございます！ ただ、現場の 作業に 集中するあまり、日報の 提出を 怠りがちな 面が まだ 見受けられます。',
        romaji: 'Arigatou gozaimasu! Tada, genba no sagyou ni shuuchuu suru amari, nippou no teishutsu o okotari gachi na men ga mada miukeraremasu.',
        idText: 'Terima kasih banyak! Hanya saja, karena terlalu fokus pada pengerjaan fisik di lini pabrik, masih terlihat kecenderungan sering lalai menyerahkan laporan harian.'
      },
      {
        id: 'd3',
        speaker: 'Tanaka',
        speakerRole: 'Supervisor Pabrik',
        avatar: '🧑‍💼',
        jp: '仕事【しごと】に 慣【な】れてきた 頃【ころ】こそ 油断【ゆだん】しがちですからね。安全【あんぜん】管理【かんり】の 観点【かんてん】からも、丁寧【ていねい】に 継続【けいぞく】指導【しどう】を 行【おこな】っていきましょう。',
        furigana: '仕事に 慣れてきた 頃こそ 油断しがちですからね。安全管理の 観点からも、丁寧に 継続指導を 行っていきましょう。',
        romaji: 'Shigoto ni narete kita koro koso yudan shi gachi desu kara ne. Anzen kanri no kanten kara mo, teinei ni keizoku shidou o okonatte ikimashou.',
        idText: 'Justru di saat mulai terbiasa dengan pekerjaanlah orang cenderung mudah lengah. Dari sudut pandang manajemen keselamatan, mari kita lakukan bimbingan berkala dengan cermat.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 慢心【まんしん】を 排【はい】し、基本【きほん】の 報告【ほうこく】・連絡【れんらく】・相談【そうだん】を 徹底【てってい】するよう 促【うなが】してまいります。',
        furigana: '承知いたしました！ 慢心を 排し、基本の 報告・連絡・相談を 徹底するよう 促してまいります。',
        romaji: 'Shouchi itashimashita! Manshin o haishi, kihon no houkoku, renraku, soudan o tettei suru you unagashite mairimasu.',
        idText: 'Dimengerti! Saya akan menyingkirkan rasa cepat puas diri dan mendorong mereka untuk menuntaskan asas dasar Hou-Ren-So tanpa kompromi.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari ungkapan "表彰【ひょうしょう】に 値【あたい】する"?',
        sentencePrompt: 'Frasa "表彰【ひょうしょう】に 値【あたい】する 業績【ぎょうせき】" bermakna:',
        options: [
          'Prestasi yang sangat bernilai tinggi sehingga patut mendapatkan penganugerahan penghargaan resmi',
          'Tindakan pelanggaran jam kerja yang patut dijatuhi sanksi pemotongan gaji',
          'Pencatatan nota pembelian bahan kantin yang perlu segera dibuang',
          'Pengumuman libur bersama pada papan pengumuman lorong pabrik'
        ],
        correctAnswer: 'Prestasi yang sangat bernilai tinggi sehingga patut mendapatkan penganugerahan penghargaan resmi',
        explanation: '"〜に値する (ni atai suru)" menyatakan kelayakan nilai yang tinggi dan pantas menerima penghargaan (表彰) atau pujian (賞賛).',
        diagnosticFeedback: {
          'Tindakan pelanggaran jam kerja yang patut dijatuhi sanksi pemotongan gaji': 'Salah: Pelanggaran sanksi adalah 処罰 (shobatsu), bukan nilai penghargaan.',
          'Pencatatan nota pembelian bahan kantin yang perlu segera dibuang': 'Salah: Nota kantin adalah 領収書 (ryoushuusho).',
          'Pengumuman libur bersama pada papan pengumuman lorong pabrik': 'Salah: Papan pengumuman adalah 掲示板 (keijiban).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan kecenderungan negatif yang kerap kambuh:',
        sentencePrompt: '作業【さぎょう】に 慣【な】れてくると、確認【かくにん】手順【てじゅん】を 抜【ぬ】かし[　　]に なる。',
        options: [
          'がち',
          'ぎみ',
          'っぽい',
          'むき'
        ],
        correctAnswer: 'がち',
        explanation: 'V-stem + がちに なる menyatakan kecenderungan sering melompati/melewatkan prosedur pengecekan karena mulai lengah.',
        diagnosticFeedback: {
          'ぎみ': 'Kekeliruan Nuansa: 〜気味 (gimi) digunakan untuk perasaan fisik/mental sedikit condong ke gejala tertentu (風邪気味, 疲れ気味).',
          'っぽい': 'Kekeliruan Pola: 〜っぽい berarti tampak/berkesan seperti sifat tertentu (安っぽい, 怒りっぽい).',
          'むき': 'Kekeliruan Makna: 〜向き berarti cocok/sesuai untuk target tertentu (初心者向き).'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Kelayakan Nilai): Manakah kalimat yang menggunakan 〜に値する secara gramatikal dan berbobot tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜に値する dengan benar:',
        options: [
          '彼【かれ】の 粘【ねば】り強【づよ】い 探求【たんきゅう】心【しん】は、賞賛【しょうさん】に 値【あたい】する。',
          '今日【きょう】は 天気【てんき】が いいので、散歩【さんぽ】するに 値【あたい】する。',
          'お腹【なか】が 空【す】いたから、ラーメンを 食【た】べるに 値【あたい】する。',
          '消しゴムを 拾【ひろ】ってくれた 行為【こうい】は、国民【こくみん】栄誉【えいよ】賞【しょう】に 値【あたい】する。'
        ],
        correctAnswer: '彼【かれ】の 粘【ねば】り強【づよ】い 探求【たんきゅう】心【しん】は、賞賛【しょうさん】に 値【あたい】する。',
        explanation: '〜に値する digunakan untuk hal-hal yang memiliki bobot kelayakan tinggi seperti rasa hormat, pujian tulus, atau evaluasi mendalam.',
        diagnosticFeedback: {
          '今日【きょう】は 天気【てんき】が いいので、散歩【さんぽ】するに 値【あたい】する。': 'Tindakan Sepele: Jalan-jalan saat cuaca cerah tidak memerlukan konstruksi nilai berbobot ni atai suru.',
          'お腹【なか】が 空【す】いたから、ラーメンを 食【た】べるに 値【あたい】する。': 'Kebutuhan Biologis: Makan mi instan saat lapar adalah reaksi biasa, bukan kelayakan evaluatif.',
          '消しゴムを 拾【ひろ】ってくれた 行為【こうい】は、国民【こくみん】栄誉【えいよ】賞【しょう】に 値【あたい】する。': 'Hiperbolis Konyol: Mengambil penghapus jatuh tidak sebanding dengan penghargaan kehormatan tertinggi nasional.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat apresiasi kelayakan proposal Kaizen:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '提出【ていしゅつ】された 提案【ていあん】は 表彰【ひょうしょう】に 値【あたい】する 素晴らしい 内容【ないよう】だ',
          '表彰【ひょうしょう】に 素晴らしい 内容【ないよう】だ 提出【ていしゅつ】された 提案【ていあん】は 値【あたい】する',
          '値【あたい】する 提案【ていあん】は 提出【ていしゅつ】された 表彰【ひょうしょう】に 素晴らしい 内容【ないよう】だ',
          '提出【ていしゅつ】された 表彰【ひょうしょう】に 提案【ていあん】は 素晴らしい 内容【ないよう】だ 値【あたい】する'
        ],
        correctAnswer: '提出【ていしゅつ】された 提案【ていあん】は 表彰【ひょうしょう】に 値【あたい】する 素晴らしい 内容【ないよう】だ',
        explanation: 'Urutan baku: Subjek modifikasi (提出された提案は) + frasa kelayakan (表彰に値する) + frasa pujian akhir (素晴らしい内容だ).',
        diagnosticFeedback: {
          '表彰【ひょうしょう】に 素晴らしい 内容【ないよう】だ 提出【ていしゅつ】された 提案【ていあん】は 値【あたい】する': 'Sintaksis Terbalik: Meletakkan predikat di tengah sebelum klausa subjek.',
          '値【あたい】する 提案【ていあん】は 提出【ていしゅつ】された 表彰【ひょうしょう】に 素晴らしい 内容【ないよう】だ': 'Pemisahan Partikel: Nilai atai suru terlepas dari objek sasarannya (表彰に).',
          '提出【ていしゅつ】された 表彰【ひょうしょう】に 提案【ていあん】は 素晴らしい 内容【ないよう】だ 値【あたい】する': 'Verba Terdampar: Predikat utama terlempar ke akhir tanpa konektor.'
        },
        tokens: ['提出【ていしゅつ】された 提案【ていあん】は', '表彰【ひょうしょう】に', '値【あたい】する', '素晴らしい 内容【ないよう】だ'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Pencegahan Kelalaian Kerja): Saat Tanaka mengingatkan: 「仕事に慣れてきた頃こそ油断しがちですからね。丁寧に継続指導を行いましょう」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan ketegasan pencegahan kecerobohan:',
        options: [
          '承知【しょうち】いたしました！ 慢心【まんしん】を 排【はい】し、基本【きほん】の 報告【ほうこく】・連絡【れんらく】・相談【そうだん】を 徹底【てってい】するよう 促【うなが】してまいります。',
          '慣【な】れたら 手【て】を 抜【ぬ】くのは 人間【にんげん】の 本能【ほんのう】ですから、ミスが 起【お】きてから 怒鳴【どな】りつければ 十分【じゅうぶん】ですよ。',
          '日報【にっぽう】なんて 紙【かみ】の ムダですから、明日【あした】から 全部【ぜんぶ】 焼【や】却【きん】して 証拠【しょうこ】を 隠滅【いんめつ】しましょう。',
          '田中【たなか】さん、私【わたし】は 完璧【かんぺき】なので 指導【しどう】は 不要【ふよう】です。後輩【こうはい】たちだけ 厳【きび】しく 叱【しか】っておいてください。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 慢心【まんしん】を 排【はい】し、基本【きほん】の 報告【ほうこく】・連絡【れんらく】・相談【そうだん】を 徹底【てってい】するよう 促【うなが】してまいります。',
        explanation: 'Menunjukkan kesadaran disiplin kerja tinggi dengan menanamkan kewaspadaan dan konsistensi Hou-Ren-So pada seluruh tim.',
        diagnosticFeedback: {
          '慣【な】れたら 手【て】を 抜【ぬ】くのは 人間【にんげん】の 本能【ほんのう】ですから、ミスが 起【お】きてから 怒鳴【どな】りつければ 十分【じゅうぶん】ですよ。': 'Toksik & Pasif: Membiarkan kesalahan terjadi lalu membentak bawahan melanggar etika kepemimpinan modern.',
          '日報【にっぽう】なんて 紙【かみ】の ムダですから、明日【あした】から 全部【ぜんぶ】 焼【や】却【きん】して 証拠【しょうこ】を 隠滅【いんめつ】しましょう。': 'Tindakan Kriminal: Membakar dokumen logistik dan merusak arsip pabrik adalah tindak pidana.',
          '田中【たなか】さん、私【わたし】は 完璧【かんぺき】なので 指導【しどう】は 不要【ふよう】です。後輩【こうはい】たちだけ 厳【きび】しく 叱【しか】っておいてください。': 'Arogansi Merusak: Merasa diri sempurna dan lepas tangan dari tanggung jawab pembinaan mencoreng moral tim.'
        }
      }
    ]
  },

  'les-n2-u18-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai sarana perantara mediasi: 〜を通じて / 〜を通して (lewat sarana komunikasi intensif) dan perdebatan seputar isu: 〜をめぐって (seputar pertentangan pandangan kriteria).',
        canDo: 'Bisa memfasilitasi rekonsiliasi perbedaan pandangan antar-instruktur pabrik seputar sistem evaluasi pemagang, serta merumuskan standar penilaian terpadu.',
        targetPatterns: [
          'N + を通じて / を通して (melalui ... / lewat perantaraan ...)',
          'N + をめぐって / をめぐる (seputar ... / berkaitan dengan pertikaian/isu ...)'
        ],
        coreVocabSample: ['めぐる', 'つうじる', 'そうご', 'しんらい', 'ひょうか', 'ぎろん', 'たいわ', 'とういつ']
      },
      sensei_context: {
        sceneIntro: 'Ruang evaluasi instruktur kejuruan Kyoto. Tanaka dan Budi membahas hasil penyelarasan kriteria penilaian keterampilan teknis pemagang lintas departemen.',
        dailyMission: 'Gunakan "o megutte" untuk merangkum isu yang sempat diperdebatkan dan "o tsuujite" untuk menjelaskan bagaimana solusi mufakat dicapai lewat dialog.',
        whyOrder: 'Kemampuan mengurai perdebatan (o megutte) dan menyelesaikan friksi lewat komunikasi terstruktur (o tsuujite) adalah kecakapan diplomasi esensial manajer N2 di tempat kerja Jepang.'
      },
      cultural_notes: {
        title: 'Mufakat Organisasi dan Penyelarasan Kriteria (根回しと合意形成)',
        etiquette: 'Saat terjadi silang pendapat mengenai regulasi, fasilitator harus bersikap netral dan mengarahkan diskusi pada kepentingan bersama.',
        taboos: 'Jangan memihak satu faksi secara emosional saat merangkum kontroversi yang melingkupi kebijakan (o megutte).'
      },
      pronunciation_tips: {
        title: 'Penekanan Mora "O Megutte" dan "O Tsuujite"',
        moraNote: 'Lafalkan "o-me-gu-t-te" dengan penekanan mantap pada sokuon sebelum partikel penutup.',
        soundTip: 'Pada "o tsu-u-ji-te", panjangkan vokal u tepat 2 mora agar artikulasinya elegan.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜をめぐって (Isu Perdebatan Banyak Pihak) vs 〜について (Topik Pembahasan Netral)',
          caseScenario: 'Ingin menyampaikan bahwa kedua belah pihak berselisih seputar kepemilikan paten.',
          pitfallWarning: '特許【とっきょ】について 対立【たいりつ】した。 (Kurang tajam: terdengar hanya sekadar bicara)',
          rightSolution: '特許【とっきょ】を めぐって 激【はげ】しく 対立【たいりつ】した。 (Tepat: isu sengketa multi-pihak)',
          explanation: '〜をめぐって selalu mengindikasikan adanya perbedaan pendapat, perdebatan, atau perebutan kepentingan di antara banyak pihak seputar satu poros isu.'
        },
        {
          title: 'Menggunakan 〜を通じて untuk Perantara Fisik Konkret Sederhana',
          caseScenario: 'Ingin mengatakan melihat pemandangan lewat jendela kereta.',
          pitfallWarning: '窓【まど】を 通【つう】じて 外【そと】を 見【み】た。 (Agak kaku/tidak wajar)',
          rightSolution: '窓【まど】から 外【そと】を 見【み】た。 (Alami untuk bukaan fisik)',
          explanation: '〜を通じて lebih tepat untuk media perantara abstrak, relasi manusia, jaringan, atau rentang waktu periode (misal: 一年を通じて, 対話を通じて).'
        }
      ],
      who_and_when: {
        situational_context: 'Mediasi antar-departemen, rapat perumusan pedoman operasional pabrik, dan evaluasi kurikulum pemagangan.',
        social_relations: 'Supervisor pabrik (Tanaka) dan koordinator program pemagangan (Budi).',
        when_not_to_use: 'Jangan gunakan o megutte jika diskusi berjalan 100% harmonis tanpa ada perbedaan sudut pandang apa pun.'
      },
      scenario: {
        title: 'Konsensus Kriteria Uji Keterampilan Kyoto',
        setting: 'Ruang Rapat Instruktur Industri Kyoto, pukul 11.00',
        narrative: 'Tanaka dan Budi menyatukan standar pengujian keterampilan las dan bubut setelah melalui proses musyawarah intensif.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Tanaka',
        speakerRole: 'Supervisor Pabrik',
        avatar: '🧑‍💼',
        jp: '技能【ぎのう】実習【じっしゅう】の 評価【ひょうか】基準【きじゅん】を めぐって、指導員【しどういん】の間【あいだ】で 意見【いけん】が 分【わ】かれていましたが、方針【ほうしん】は まとまりましたか。',
        furigana: '技能実習の 評価基準を めぐって、指導員の間で 意見が 分かれていましたが、方針は まとまりましたか。',
        romaji: 'Ginou jisshuu no hyouka kijun o megutte, shidouin no aida de iken ga wakarete imashita ga, houshin wa matomarimashita ka.',
        idText: 'Seputar standar penilaian magang teknis, sebelumnya pendapat sempat terbelah di kalangan instruktur, apakah arah kebijakannya sudah disepakati?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、半年【はんとし】の 研修【けんしゅう】を 通【つう】じて 培【つちか】った 信頼【しんらい】関係【かんけい】を 基盤【きばん】に、全員【ぜんいん】が 納得【なっとく】できる 統一【とういつ】シートを 策定【さくてい】いたしました。',
        furigana: 'はい、半年間の 研修を 通じて 培った 信頼関係を 基盤に、全員が 納得できる 統一シートを 策定いたしました。',
        romaji: 'Hai, hantoshi no kenshuu o tsuujite tsuchikatta shinrai kankei o kiban ni, zenin ga nattoku dekiru touitsu shiito o sakutei itashimashita.',
        idText: 'Sudah, Pak! Berlandaskan hubungan saling percaya yang dipupuk melalui pelatihan selama setengah tahun ini, kami telah merumuskan lembar penilaian seragam yang disepakati bersama.'
      },
      {
        id: 'd3',
        speaker: 'Tanaka',
        speakerRole: 'Supervisor Pabrik',
        avatar: '🧑‍💼',
        jp: '綿密【めんみつ】な 対話【たいわ】を 重【かさ】ねてくれた おかげですね。制度【せいど】の 運用【うんよう】に 関【かん】する 懸念【けねん】も 払拭【ふっしょく】できました。',
        furigana: '綿密な 対話を 重ねてくれた おかげですね。制度の 運用に関する 懸念も 払拭できました。',
        romaji: 'Menmitsu na taiwa o kasanete kureta okage desu ne. Seido no unyou ni kansuru kenen mo fusshoku dekimashita.',
        idText: 'Semua berkat dialog mendalam yang kamu jalin berulang kali. Kekhawatiran terkait penerapan sistem ini pun berhasil dihapuskan sepenuhnya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '今後【こんご】も 定例【ていれい】ミーティングを 通【とお】して、実習生【じっしゅうせい】の 生【なま】の 声【こえ】を 吸【す】い上【あ】げ、常【つね】に 改善【かいぜん】を 図【はか】ってまいります！',
        furigana: '今後も 定例ミーティングを 通して、実習生の 生の声を 吸い上げ、常に 改善を 図ってまいります！',
        romaji: 'Kongo mo teirei miitingu o tooshite, jisshuusei no nama no koe o suiage, tsune ni kaizen o hakatte mairimasu!',
        idText: 'Ke depannya pun, lewat pertemuan berkala rutin, saya akan terus menyerap aspirasi murni para peserta magang dan senantiasa mengupayakan penyempurnaan!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah fungsi gramatikal dari ungkapan "〜をめぐって" dalam perundingan kebijakan?',
        sentencePrompt: 'Frasa "新【しん】制度【せいど】を めぐって 対立【たいりつ】する" bermakna:',
        options: [
          'Terjadi silang pendapat atau perdebatan di antara banyak pihak seputar penerapan sistem baru',
          'Berjalan berputar-putar mengelilingi gedung pusat pelatihan pada sore hari',
          'Mengirimkan paket berkas melalui loket pos kilat internasional',
          'Membayar tagihan listrik bulanan melalui transfer mesin ATM'
        ],
        correctAnswer: 'Terjadi silang pendapat atau perdebatan di antara banyak pihak seputar penerapan sistem baru',
        explanation: '"〜をめぐって" menandai isu sentral yang menjadi bahan perselisihan, perdebatan, atau perhatian banyak pihak.',
        diagnosticFeedback: {
          'Berjalan berputar-putar mengelilingi gedung pusat pelatihan pada sore hari': 'Arti Harfiah Fisik: めぐる di sini bukan gerakan memutari fisik gedung.',
          'Mengirimkan paket berkas melalui loket pos kilat internasional': 'Salah: Pengiriman surat adalah 郵便 (yuubin).',
          'Membayar tagihan listrik bulanan melalui transfer mesin ATM': 'Salah: Pembayaran tagihan adalah 振込 (furikomi).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan sarana/perantara pembinaan relasi:',
        sentencePrompt: '長年【ながねん】の 文化【ぶんか】交流【こうりゅう】[　　]、両国【りょうこく】の 絆【きずな】が 深【ふか】まった。',
        options: [
          'を 通【つう】じて',
          'を めぐって',
          'に 限【かぎ】って',
          'に 反【はん】して'
        ],
        correctAnswer: 'を 通【つう】じて',
        explanation: 'N + を通じて menyatakan "melalui/lewat sarana pertukaran budaya selama bertahun-tahun, ikatan kedua bangsa semakin mendalam".',
        diagnosticFeedback: {
          'を めぐって': 'Kekeliruan Makna: 〜をめぐって menyatakan perdebatan/sengketa seputar suatu hal.',
          'に 限【かぎ】って': 'Kekeliruan Pola: 〜に限って menyatakan kekhususan kebetulan negatif.',
          'に 反【はん】して': 'Kekeliruan Nuansa: 〜に反して menyatakan kontras yang berlawanan dengan prediksi/keinginan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Fokus Isu Sengketa): Manakah kalimat yang menggunakan 〜をめぐって dengan konteks pertentangan opini yang tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜をめぐって secara tepat:',
        options: [
          '工場【こうじょう】の 移転【いてん】計画【けいかく】を めぐって、住民【じゅうみん】と 行政【ぎょうせい】の 間【あいだ】で 激【はげ】しい 議論【ぎろん】が 続【つづ】いている。',
          '今日【きょう】の 朝【あさ】ご飯【はん】を めぐって、私【わたし】は パンを 食【た】べた。',
          '鉛筆【えんぴつ】の 長【なが】さを めぐって、定規【じょうぎ】で 測【はか】った。',
          '駅【えき】の 改札【かいさつ】を めぐって、切符【きっぷ】を 入【い】れた。'
        ],
        correctAnswer: '工場【こうじょう】の 移転【いてん】計画【けいかく】を めぐって、住民【じゅうみん】と 行政【ぎょうせい】の 間【あいだ】で 激【はげ】しい 議論【ぎろん】が 続【つづ】いている。',
        explanation: '〜をめぐって harus melibatkan multi-pihak (warga dan pemerintah) yang berdebat seputar sebuah kebijakan atau isu kepentingan bersama.',
        diagnosticFeedback: {
          '今日【きょう】の 朝【あさ】ご飯【はん】を めぐって、私【わたし】は パンを 食【た】べた。': 'Aksi Individu: Makan roti untuk sarapan adalah tindakan perorangan tanpa perdebatan multi-pihak.',
          '鉛筆【えんぴつ】の 長【なが】さを めぐって、定規【じょうぎ】で 測【はか】った。': 'Pengukuran Objektif: Mengukur pensil dengan penggaris tidak memerlukan konstruksi sengketa o megutte.',
          '駅【えき】の 改札【かいさつ】を めぐって、切符【きっぷ】を 入【い】れた。': 'Tindakan Mekanis: Memasukkan tiket ke gerbang stasiun adalah tindakan fisik biasa.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat mediasi standar evaluasi:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '評価【ひょうか】基準【きじゅん】を めぐって 指導員【しどういん】の 間【あいだ】で 議論【ぎろん】が 行【おこな】われた',
          '指導員【しどういん】の 間【あいだ】で 行【おこな】われた 評価【ひょうか】基準【きじゅん】を めぐって 議論【ぎろん】が',
          '議論【ぎろん】が 評価【ひょうか】基準【きじゅん】を めぐって 行【おこな】われた 指導員【しどういん】の 間【あいだ】で',
          'めぐって 評価【ひょうか】基準【きじゅん】を 指導員【しどういん】の 間【あいだ】で 議論【ぎろん】が 行【おこな】われた'
        ],
        correctAnswer: '評価【ひょうか】基準【きじゅん】を めぐって 指導員【しどういん】の 間【あいだ】で 議論【ぎろん】が 行【おこな】われた',
        explanation: 'Urutan baku: Isu sengketa (評価基準をめぐって) + para pihak terkait (指導員の間で) + subjek & verba diskusi (議論が行われた).',
        diagnosticFeedback: {
          '指導員【しどういん】の 間【あいだ】で 行【おこな】われた 評価【ひょうか】基準【きじゅん】を めぐって 議論【ぎろん】が': 'Klausa Terpotong: Verba okonawareta ditaruh mendahului isu perdebatan.',
          '議論【ぎろん】が 評価【ひょうか】基準【きじゅん】を めぐって 行【おこな】われた 指導員【しどういん】の 間【あいだ】で': 'Struktur Terbalik: Partikel pelaku ditaruh di paling belakang kalimat.',
          'めぐって 評価【ひょうか】基準【きじゅん】を 指導員【しどういん】の 間【あいだ】で 議論【ぎろん】が 行【おこな】われた': 'Partikel Mundur: Meletakkan megutte di awal kalimat mendahului nomina sasarannya.'
        },
        tokens: ['評価【ひょうか】基準【きじゅん】を', 'めぐって', '指導員【しどういん】の 間【あいだ】で', '議論【ぎろん】が 行【おこな】われた'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Hubungan Kerja): Saat Tanaka menyampaikan: 「綿密な対話を重ねてくれたおかげで、制度運用に関する懸念も払拭できました」, apa komitmen kemitraan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menjamin keterbukaan saluran komunikasi:',
        options: [
          '今後【こんご】も 定例【ていれい】ミーティングを 通【とお】して、実習生【じっしゅうせい】の 生【なま】の 声【こえ】を 吸【す】い上【あ】げ、常【つね】に 改善【かいぜん】を 図【はか】ってまいります！',
          '指導員【しどういん】たちの 文句【もんく】を 聞【き】くのは 面倒【めんどう】ですから、次【つぎ】からは 全員【ぜんいん】の 意見【いけん】を 黙殺【もくさつ】しましょう。',
          '懸念【けねん】が 消【き】えたなら もう 用済【ようず】みですね。これからは 毎日【まいにち】 定時【ていじ】で 即座【そくざ】に 帰宅【きたく】します。',
          '田中【たなか】さん、私【わたし】の 手腕【しゅわん】に 惚【ほ】れ直【なお】したでしょう？ 特別【とくべつ】に お酒【さけ】を 奢【おご】ってくださいよ。'
        ],
        correctAnswer: '今後【こんご】も 定例【ていれい】ミーティングを 通【とお】して、実習生【じっしゅうせい】の 生【なま】の 声【こえ】を 吸【す】い上【あ】げ、常【つね】に 改善【かいぜん】を 図【はか】ってまいります！',
        explanation: 'Menunjukkan dedikasi berkelanjutan untuk menjaga komunikasi dua arah dan menyerap masukan lapangan secara konsisten.',
        diagnosticFeedback: {
          '指導員【しどういん】たちの 文句【もんく】を 聞【き】くのは 面倒【めんどう】ですから、次【つぎ】からは 全員【ぜんいん】の 意見【いけん】を 黙殺【もくさつ】しましょう。': 'Sikap Otoriter Toksik: Mengabaikan masukan rekan kerja akan menghancurkan kerja sama tim.',
          '懸念【けねん】が 消【き】えたなら もう 用済【ようず】みですね。これからは 毎日【まいにち】 定時【ていじ】で 即座【そくざ】に 帰宅【きたく】します。': 'Apatis & Tidak Bertanggung Jawab: Lepas tangan setelah satu target tercapai merusak reputasi profesional.',
          '田中【たなか】さん、私【わたし】の 手腕【しゅわん】に 惚【ほ】れ直【なお】したでしょう？ 特別【とくべつ】に お酒【さけ】を 奢【おご】ってくださいよ。': 'Narsis & Tidak Sopan: Meminta traktiran minuman kepada atasan dengan nada congkak melanggar tata krama.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 19: Pondasi Berpijak, Perantaraan Media & Keyakinan Mutlak
  // ─────────────────────────────────────────────────────────────
  'les-n2-u19-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai landasan gagasan inspiratif: 〜をもとに / 〜をもとにした (berdasarkan sumber inspirasi/data mentah) dan penegasan keyakinan mutlak: 〜にほかならない (tiada lain hanyalah wujud nyata dari...).',
        canDo: 'Bisa memaparkan latar belakang riset teknologi semikonduktor masa depan, menguraikan sumber inspirasi biomimikri, serta menegaskan faktor kunci keberhasilan di hadapan mitra global.',
        targetPatterns: [
          'N + をもとに / をもとにした (berdasarkan ... / bersumber dari inspirasi ...)',
          'N / V-plain + にほかならない (tiada lain adalah ... / memang merupakan bukti nyata ...)'
        ],
        coreVocabSample: ['もとに', 'ほかならない', 'はんどうたい', 'せっけい', 'けっしょう', 'さくげん', 'かいろう', 'たゆまぬ']
      },
      sensei_context: {
        sceneIntro: 'Pusat Inovasi Riset & Pengembangan (R&D) Semikonduktor di Yokohama. Dr. Ogawa (Kepala Tim Riset) dan Budi mempresentasikan pencapaian prototipe chip hemat daya di hadapan komite riset internasional.',
        dailyMission: 'Gunakan "o moto ni" untuk menjelaskan ide awal rancangan dan "ni hoka naranai" untuk menegaskan dedikasi kerja keras tim dengan penuh keyakinan.',
        whyOrder: 'Dalam presentasi ilmiah dan bisnis tingkat N2, menjelaskan asal usul metodologi (o moto ni) serta menarik konklusi tegas (ni hoka naranai) memberikan wibawa argumentasi yang tak terbantahkan.'
      },
      cultural_notes: {
        title: 'Presentasi Hasil R&D dan Integritas Ilmiah (技術発表と成功の帰属)',
        etiquette: 'Menyampaikan rasa terima kasih kepada tim dan mentor saat mengumumkan pencapaian besar (ni hoka naranai) adalah cermin kerendahan hati akademis Jepang.',
        taboos: 'Jangan menggunakan kata "kebetulan beruntung" (guzen) saat menjelaskan inovasi strategis yang memakan waktu riset bertahun-tahun.'
      },
      pronunciation_tips: {
        title: 'Artikulasi Tegas "Ni Hoka Naranai"',
        moraNote: 'Lafalkan "ni-ho-ka-na-ra-na-i" dengan ketukan jelas tanpa jeda di tengah kata.',
        soundTip: 'Pada "o moto ni", berikan jeda mikro setelah partikel ni sebelum beralih ke verba tindakan.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜をもとに (Inspirasi/Ide Dasar) vs 〜を原料にして (Bahan Mentah Fisik)',
          caseScenario: 'Ingin mengatakan bahwa bir ini dibuat dari bahan mentah gandum.',
          pitfallWarning: '麦【むぎ】を もとに、ビールを 作【つく】る。 (Kurang tepat secara kimiawi)',
          rightSolution: '麦【むぎ】を 原料【げんりょう】にして、ビールを 醸造【じょうぞう】する。 (Tepat: pemrosesan materi fisik)',
          explanation: '〜をもとに digunakan untuk sesuatu yang dijadikan inspirasi abstrak, model desain, data dasar, atau bahan cerita; bukan bahan baku kimia/makanan langsung.'
        },
        {
          title: 'Menggunakan 〜にほかならない untuk Spekulasi Ringan',
          caseScenario: 'Ingin menduga kemungkinan besok akan hujan ringan.',
          pitfallWarning: '明日【あした】は 雨【あめ】に ほかならない。 (Terlalu dogmatis dan janggal)',
          rightSolution: '明日【あした】は 雨【あめ】に 相違【そうい】ない / 雨【あめ】だろう。 (Tepat: prediksi cuaca)',
          explanation: '〜にほかならない adalah penegasan deduktif definitif yang berarti "tidak ada penjelasan lain selain hal tersebut", biasanya untuk hakikat atau kesimpulan esensial.'
        }
      ],
      who_and_when: {
        situational_context: 'Simposium sains teknologi, presentasi peluncuran produk inovasi, dan laporan tahunan dewan direksi.',
        social_relations: 'Kepala Pusat Litbang (Dr. Ogawa) dan peneliti muda Indonesia (Budi).',
        when_not_to_use: 'Jangan gunakan ni hoka naranai pada obrolan santai saat makan siang seperti menebak rasa makanan.'
      },
      scenario: {
        title: 'Peluncuran Arsitektur Chip Hijau Yokohama',
        setting: 'Yokohama Global Tech Auditorium, pukul 14.00',
        narrative: 'Dr. Ogawa dan Budi memaparkan terobosan efisiensi konsumsi daya cip cerdas berbasis komputasi biologis.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: 'ブディさん、今回【こんかい】開発【かいはつ】した 省電力【しょうでんりょく】チップの アーキテクチャは、生体【せいたい】神経【しんけい】の 回路【かいろ】構造【こうぞう】を もとに 設計【せっけい】されたのですね。',
        furigana: 'ブディさん、今回開発した 省電力チップの アーキテクチャは、生体神経の 回路構造を もとに 設計されたのですね。',
        romaji: 'Budi-san, konkai kaihatsu shita shoudenryoku chippu no aakitekucha wa, seitai shinkei no kairo kouzou o moto ni sekkei sareta no desu ne.',
        idText: 'Budi, arsitektur cip hemat daya yang kita kembangkan kali ini dirancang berdasarkan struktur sirkuit saraf biologis ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ 自然界【しぜんかい】の 効率【こうりつ】性【せい】を もとに 試作【しさく】を 重【かさ】ねた 結果【けっか】、消費【しょうひ】電力【でんりょく】を 40％【よんじゅっぱーせんと】 削減【さくげん】することに 成功【せいこう】いたしました。',
        furigana: 'はい！ 自然界の 効率性を もとに 試作を 重ねた 結果、消費電力を 40％ 削減することに 成功いたしました。',
        romaji: 'Hai! Shizenkai no kouritsusei o moto ni shisaku o kasaneta kekka, shouhi denryoku o yonjuppasento sakugen suru koto ni seikou itashimashita.',
        idText: 'Benar sekali! Berdasarkan efisiensi alamiah, kami berulang kali membuat prototipe, dan hasilnya kami sukses memangkas konsumsi daya hingga 40%.'
      },
      {
        id: 'd3',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: 'この 驚異【きょうい】的【てき】な 測定【そくてい】値【ち】は、チームの たゆまぬ 探求【たんきゅう】と 粘【ねば】り強【づよ】い 実験【じっけん】の 結晶【けっしょう】に ほかなりません。',
        furigana: 'この 驚異的な 測定値は、チームの たゆまぬ 探求と 粘り強い 実験の 結晶に ほかなりません。',
        romaji: 'Kono kyouiteki na sokuteichi wa, chiimu no tayumanu tankyuu to nebarizuyoi jikken no kesshou ni hoka narimasen.',
        idText: 'Angka pengukuran yang luar biasa ini tiada lain adalah wujud nyata dari kristalisasi kegigihan eksperimen dan penjelajahan tiada henti dari tim.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '小川【おがわ】所長【しょちょう】の 的確【てきかく】な ご指導【しどう】が あってこその 成果【せいか】です。次【つぎ】世代【せだい】の 量産【りょうさん】化【か】に 向【む】けて 全力【ぜんりょく】を 尽【つ】くします！',
        furigana: '小川所長の 的確な ご指導が あってこその 成果です。次世代の 量産化に 向けて 全力を 尽くします！',
        romaji: 'Ogawa shochou no tekikaku na goshidou ga atte koso no seika desu. Jisedai no ryousanka ni mukete zenryoku o tsukushimasu!',
        idText: 'Pencapaian ini terwujud justru karena bimbingan tepat dari Bapak Direktur Ogawa. Kami akan mengerahkan segenap tenaga menuju produksi massal generasi berikutnya!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah fungsi gramatikal dari ungkapan "〜を もとに"?',
        sentencePrompt: 'Frasa "アンケートの 結果【けっか】を もとに 開発【かいはつ】する" bermakna:',
        options: [
          'Melakukan pengembangan produk dengan bertumpu pada data hasil kuesioner sebagai fondasi inspirasi',
          'Membakar kertas kuesioner untuk dijadikan bahan api unggun',
          'Menggugat pengisi kuesioner karena memberikan ulasan buruk',
          'Mengabaikan data kuesioner dan bekerja berdasarkan firasat semata'
        ],
        correctAnswer: 'Melakukan pengembangan produk dengan bertumpu pada data hasil kuesioner sebagai fondasi inspirasi',
        explanation: '"〜をもとに" bermakna menggunakan suatu data, inspirasi, atau fakta mentah sebagai landasan dasar pijakan cipta karya.',
        diagnosticFeedback: {
          'Membakar kertas kuesioner untuk dijadikan bahan api unggun': 'Salah: Pembakaran kertas adalah 焼却 (shoukyaku).',
          'Menggugat pengisi kuesioner karena memberikan ulasan buruk': 'Salah: Menggugat adalah 提訴 (teiso).',
          'Mengabaikan data kuesioner dan bekerja berdasarkan firasat semata': 'Salah: Berdasarkan firasat adalah 直感 (chokkan).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola konklusif yang menegaskan hakikat mutlak suatu keberhasilan:',
        sentencePrompt: '今回【こんかい】の 成功【せいこう】は、全員【ぜんいん】の たゆまぬ 努力【どりょく】の 結晶【けっしょう】[　　]。',
        options: [
          'に ほかならない',
          'に すぎない',
          'に たえない',
          'に そういない'
        ],
        correctAnswer: 'に ほかならない',
        explanation: 'N + にほかならない menyatakan penegasan mutlak: "Keberhasilan kali ini tiada lain adalah wujud kristalisasi kerja keras tiada henti dari semua orang".',
        diagnosticFeedback: {
          'に すぎない': 'Kekeliruan Nuansa: 〜にすぎない mengecilkan capaian ("hanyalah sebatas...").',
          'に たえない': 'Kekeliruan Pola: 〜にたえない berarti tidak tahan/sangat mendalam (感謝にたえない).',
          'に そういない': 'Kekeliruan Gaya: 〜に相違ない menyatakan kepastian dugaan deduktif, bukan hakikat eksklusif.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Inspirasi Konseptual): Manakah kalimat yang menggunakan 〜をもとに dengan tepat tanpa salah rancang bahan baku fisik?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜をもとに secara tepat:',
        options: [
          '実際【じっさい】に 起【お】きた 事件【じけん】を もとに、感動【かんどう】的【てき】な 小説【しょうせつ】が 執筆【しっぴつ】された。',
          '小麦【こむぎ】粉【こ】を もとに、うどんの 麺【めん】を 打【う】ち上【あ】げた。',
          '水【みず】を もとに、氷【こおり】を 冷凍庫【れいとうこ】で 作【つく】った。',
          '木材【もくざい】を もとに、本棚【ほんだな】を 大工【だいく】が 釘【くぎ】で 組【く】み立【た】てた。'
        ],
        correctAnswer: '実際【じっさい】に 起【お】きた 事件【じけん】を もとに、感動【かんどう】的【てき】な 小説【しょうせつ】が 執筆【しっぴつ】された。',
        explanation: '〜をもとに digunakan untuk sesuatu yang dijadikan bahan dasar inspirasi abstrak/karya, bukan materi fisik bahan mentah pembuat barang.',
        diagnosticFeedback: {
          '小麦【こむぎ】粉【こ】を もとに、うどんの 麺【めん】を 打【う】ち上【あ】げた。': 'Bahan Mentah Makanan: Tepung terigu adalah bahan fisik murni (小麦粉から作る / 原料にして).',
          '水【みず】を もとに、氷【こおり】を 冷凍庫【れいとうこ】で 作【つく】った。': 'Perubahan Wujud Fisika: Air menjadi es adalah pembekuan zat cair (水を凍らせる).',
          '木材【もくざい】を もとに、本棚【ほんだな】を 大工【だいく】が 釘【くぎ】で 組【く】み立【た】てた。': 'Bahan Konstruksi Fisik: Kayu adalah bahan mentah pembuatan mebel (木材で作る).'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penegasan arsitektur riset semikonduktor:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに 省電力【しょうでんりょく】チップを 設計【せっけい】した',
          '設計【せっけい】した 生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに 省電力【しょうでんりょく】チップを',
          '省電力【しょうでんりょく】チップを 設計【せっけい】した 生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに',
          'もとに 生体【せいたい】神経【しんけい】の 回路【かいろ】を 設計【せっけい】した 省電力【しょうでんりょく】チップを'
        ],
        correctAnswer: '生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに 省電力【しょうでんりょく】チップを 設計【せっけい】した',
        explanation: 'Urutan baku: Sumber inspirasi (生体神経の回路をもとに) + objek rancangan (省電力チップを) + verba desain (設計した).',
        diagnosticFeedback: {
          '設計【せっけい】した 生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに 省電力【しょうでんりょく】チップを': 'Predikat Terpental: Menempatkan kata kerja desain di awal kalimat sebelum objek.',
          '省電力【しょうでんりょく】チップを 設計【せっけい】した 生体【せいたい】神経【しんけい】の 回路【かいろ】を もとに': 'Runtutan Terbalik: Meletakkan inspirasi di belakang kalimat tanpa predikat akhir.',
          'もとに 生体【せいたい】神経【しんけい】の 回路【かいろ】を 設計【せっけい】した 省電力【しょうでんりょく】チップを': 'Partikel Mundur: Kata sambung moto ni terpisah dari nomina dasarnya.'
        },
        tokens: ['生体【せいたい】神経【しんけい】の 回路【かいろ】を', 'もとに', '省電力【しょうでんりょく】チップを', '設計【せっけい】した'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Inovasi Teknologi): Saat Dr. Ogawa memuji: 「この驚異的な測定値は、チームの粘り強い実験の結晶にほかなりません」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang memancarkan integritas dan semangat riset lanjutan:',
        options: [
          '小川【おがわ】所長【しょちょう】の 的確【てきかく】な ご指導【しどう】が あってこその 成果【せいか】です。次【つぎ】世代【せだい】の 量産【りょうさん】化【か】に 向【む】けて 全力【ぜんりょく】を 尽【つ】くします！',
          '全部【ぜんぶ】 私【わたし】の 天才【てんさい】的【てき】な 閃【ひらめ】きによる ものですから、所長【しょちょう】は 黙【だま】って 私【わたし】に 開発【かいはつ】費【ひ】を 全額【ぜんがく】 渡【わた】してください。',
          '測定【そくてい】データなんて 実【じつ】は 適当【てきとう】に 改ざんした 数値【すうち】なので、バレる前【まえ】に 逃【に】げ出【だ】しましょう！',
          '成功【せいこう】したからには 今日【きょう】から 実験【じっけん】は 一切【いっさい】 やめて、毎日【まいにち】 ゲームをして 給料【きゅうりょう】を もらいます。'
        ],
        correctAnswer: '小川【おがわ】所長【しょちょう】の 的確【てきかく】な ご指導【しどう】が あってこその 成果【せいか】です。次【つぎ】世代【せだい】の 量産【りょうさん】化【か】に 向【む】けて 全力【ぜんりょく】を 尽【つ】くします！',
        explanation: 'Menghargai arahan mentor dan berkomitmen penuh untuk membawa hasil inovasi lab menuju tahap produksi massal.',
        diagnosticFeedback: {
          '全部【ぜんぶ】 私【わたし】の 天才【てんさい】的【てき】な 閃【ひらめ】きによる ものですから、所長【しょちょう】は 黙【だま】って 私【わたし】に 開発【かいはつ】費【ひ】を 全額【ぜんがく】 渡【わた】してください。': 'Arogansi Merusak: Mengklaim kerja keras seluruh tim sebagai hasil pribadi merusak keharmonisan lab.',
          '測定【そくてい】データなんて 実【じつ】は 適当【てきとう】に 改ざんした 数値【すうち】なので、バレる前【まえ】に 逃【に】げ出【だ】しましょう！': 'Kriminal Ilmiah: Memalsukan data eksperimen melanggar hukum etika riset berat dan menghancurkan integritas.',
          '成功【せいこう】したからには 今日【きょう】から 実験【じっけん】は 一切【いっさい】 やめて、毎日【まいにち】 ゲームをして 給料【きゅうりょう】を もらいます。': 'Pemalas & Parasit: Bermalas-malasan setelah satu capaian merusak dedikasi sebagai saintis.'
        }
      }
    ]
  },

  'les-n2-u19-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai ungkapan getaran impresif: 〜ものがある (ada nuansa yang sangat mengagumkan/mendalam) dan keistimewaan eksklusif: 〜ならではの (kekhasan unik yang hanya dimiliki oleh...).',
        canDo: 'Bisa menguraikan keunggulan komparatif teknologi manufaktur presisi tingkat nano, serta meyakinkan mitra industri internasional akan keandalan produk khas Jepang.',
        targetPatterns: [
          'V-dictionary / Adj + ものがある (ada sesuatu yang sangat ... / memiliki kualitas mengesankan)',
          'N + ならではの (hanya khas ... / yang hanya bisa terwujud berkat ...)'
        ],
        coreVocabSample: ['ものがある', 'ならでは', 'せつごう', 'ぎじゅつ', 'みはる', 'ゆうごう', 'どくじ', 'しんらい']
      },
      sensei_context: {
        sceneIntro: 'Laboratorium Uji Ekstrem Semikonduktor Yokohama. Dr. Ogawa dan Budi mengamati ketahanan sambungan nano chip saat diuji pada suhu minus 50 derajat hingga 150 derajat Celsius.',
        dailyMission: 'Gunakan "mono ga aru" untuk mengekspresikan rasa kagum atas performa luar biasa dan "naradewa no" untuk menonjolkan keahlian presisi khas industri.',
        whyOrder: 'Evaluasi keunggulan kualitatif pada tingkat profesional N2 memerlukan kosakata apresiasi yang matang: mengekspresikan daya tarik mendalam (mono ga aru) dan nilai pembeda khas (naradewa no).'
      },
      cultural_notes: {
        title: 'Filosofi Monozukuri dan Presisi Ekstrem (職人技と極限の信頼性)',
        etiquette: 'Menggabungkan tradisi keuletan tangan terampil (Shokunin-waza) dengan robotika otomatisasi modern adalah kebanggaan terbesar manufaktur Jepang.',
        taboos: 'Jangan meremehkan toleransi margin mikro; dalam industri semikonduktor, selisih 1 nanometer menentukan keberhasilan produk.'
      },
      pronunciation_tips: {
        title: 'Artikulasi Menghayati "Mono Ga Aru" dan "Naradewa No"',
        moraNote: 'Lafalkan "mo-no-ga-a-ru" dengan intonasi turun lembut yang mencerminkan kekaguman mendalam dari lubuk hati.',
        soundTip: 'Pada "na-ra-de-wa-no", berikan penekanan halus pada mora de untuk mempertegas eksklusivitas.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ものがある (Kesan Mendalam Objektif) vs 〜ものだ (Hukum Kebenaran Alami / Kenangan)',
          caseScenario: 'Ingin menyampaikan bahwa teknologi baru ini sungguh memiliki daya pikat yang menggetarkan.',
          pitfallWarning: 'この 技術【ぎじゅつ】には 人【ひと】を 惹【ひ】きつける ものだ。 (Salah struktur)',
          rightSolution: 'この 技術【ぎじゅつ】には 人【ひと】を 惹【ひ】きつける ものが ある。 (Tepat: getaran kualitas mendalam)',
          explanation: '〜ものがある digunakan untuk mengekspresikan impresi atau penilaian bahwa suatu hal memiliki kualitas mendalam yang menyentuh perasaan pembicara.'
        },
        {
          title: 'Menggunakan 〜ならではの untuk Sifat Biasa Tanpa Keistimewaan Khusus',
          caseScenario: 'Mengatakan bahwa jalanan ini macet khas jalan raya biasa.',
          pitfallWarning: '道路【どうろ】ならではの 渋滞【じゅうたい】だ。 (Janggal: macet bukan keunggulan positif khas)',
          rightSolution: '京都【きょうと】ならではの 伝統【でんとう】美【び】。 (Tepat: keunikan istimewa bernilai tinggi)',
          explanation: '〜ならではの hampir selalu digunakan untuk memuji keistimewaan unik, kelebihan khas, atau citra bernilai positif yang hanya dimiliki oleh entitas tersebut.'
        }
      ],
      who_and_when: {
        situational_context: 'Pameran teknologi presisi, tinjauan mutu manufaktur nano, dan negosiasi pasokan komponen satelit luar angkasa.',
        social_relations: 'Saintis senior (Dr. Ogawa) dan insinyur riset material (Budi).',
        when_not_to_use: 'Jangan gunakan naradewa no untuk menamai cacat produk atau kekurangan teknis.'
      },
      scenario: {
        title: 'Uji Ekstrem Sambungan Nano Yokohama',
        setting: 'Laboratorium Lingkungan Ekstrem Yokohama, pukul 17.00',
        narrative: 'Ogawa dan Budi menyaksikan stabilitas transmisi sinyal chip pada siklus suhu termal ekstrem.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: '極低温【きょくていおん】から 超高温【ちょうこうおん】まで 安定【あんてい】して 稼働【かどう】する この ナノ接合【せつごう】技術【ぎじゅつ】には、目【め】を 見張【みは】る ものが ありますね。',
        furigana: '極低温から 超高温まで 安定して 稼働する この ナノ接合技術には、目を 見張る ものが ありますね。',
        romaji: 'Kyokuteion kara choukouon made antei shite kadou suru kono nano setsugou gijutsu ni wa, me o miharu mono ga arimasu ne.',
        idText: 'Teknologi sambungan nano yang beroperasi secara stabil dari suhu beku ekstrem hingga suhu amat panas ini sungguh memiliki keandalan yang mengagumkan mata ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ええ、ミクロン単位【たんい】の 誤差【ごさ】も 許【ゆる】さない 職人【しょくにん】技【わざ】と、先端【せんたん】ロボティクスが 融合【ゆうごう】した、日本【にほん】のものづくり ならではの 強【つよ】みです。',
        furigana: 'ええ、ミクロン単位の 誤差も 許さない 職人技と、先端ロボティクスが 融合した、日本のものづくり ならではの 強みです。',
        romaji: 'Ee, mikuron tani no gosa mo yurusanai shokunin-waza to, sentan robotikusu ga yuugou shita, Nihon no monozukuri naradewa no tsuyomi desu.',
        idText: 'Benar sekali, ini adalah kekuatan khas filosofi manufaktur Jepang (Monozukuri), perpaduan antara keterampilan mahir yang menolak toleransi kesalahan sekecil mikron dengan robotika mutakhir.'
      },
      {
        id: 'd3',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: 'まさに 他国【たこく】の 追随【ついずい】を 許【ゆる】さない 独自【どくじ】性【せい】ですね。この 信頼【しんらい】性【せい】こそが 世界【せかい】の 宇宙【うちゅう】開発【かいはつ】機構【きこう】を 惹【ひ】きつける はずです。',
        furigana: 'まさに 他国の 追随を 許さない 独自性ですね。この 信頼性こそが 世界の 宇宙開発機構を 惹きつける はずです。',
        romaji: 'Masa ni takoku no tsuizui o yurusanai dokujisei desu ne. Kono shinraisei koso ga sekai no uchuu kaihatsu kikou o hikitsukeru hazu desu.',
        idText: 'Tepat sekali, sebuah orisinalitas tanpa tanding yang tak dapat disusul negara lain. Keandalan inilah yang pasti akan memikat badan antariksa global.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '国際【こくさい】特許【とっきょ】の 出願【しゅつがん】も 完了【かんりょう】いたしましたので、胸【むね】を 張【は】って グローバル市場【しじょう】へ 展開【てんかい】してまいりましょう！',
        furigana: '国際特許の 出願も 完了いたしましたので、胸を 張って グローバル市場へ 展開してまいりましょう！',
        romaji: 'Kokusai tokkyo no shutsugan mo kanryou itashimashita node, mune o hatte guroobaru shijou e tenkai shite mairimashou!',
        idText: 'Pendaftaran paten internasional pun telah rampung, mari kita melangkah dengan kepala tegak untuk berekspansi ke pasar global!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari ungkapan "目【め】を 見張【みは】る ものが ある"?',
        sentencePrompt: 'Frasa "目【め】を 見張【みは】る ものが ある" bermakna:',
        options: [
          'Memiliki kualitas atau kemajuan yang sangat luar biasa menakjubkan hingga membuat mata terbelalak kagum',
          'Mata terasa sangat perih dan gatal akibat terkena debu jalanan',
          'Pergi ke klinik dokter mata untuk membeli kacamata renang baru',
          'Melihat pemandangan matahari terbenam sambil memejamkan mata erat-erat'
        ],
        correctAnswer: 'Memiliki kualitas atau kemajuan yang sangat luar biasa menakjubkan hingga membuat mata terbelalak kagum',
        explanation: '"目を見張るものがある" adalah ungkapan evaluatif untuk memuji performa atau perkembangan yang sangat menakjubkan.',
        diagnosticFeedback: {
          'Mata terasa sangat perih dan gatal akibat terkena debu jalanan': 'Salah: Mata perih adalah 目が痛い (me ga itai).',
          'Pergi ke klinik dokter mata untuk membeli kacamata renang baru': 'Salah: Dokter mata adalah 眼科 (ganka).',
          'Melihat pemandangan matahari terbenam sambil memejamkan mata erat-erat': 'Salah: Memejamkan mata adalah 目を閉じる (me o tojiru).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan keunikan khas yang hanya dimiliki satu entitas istimewa:',
        sentencePrompt: 'この 洗練【せんれん】された デザインは、京都【きょうと】の 伝統【でんとう】工芸【こうげい】[　　] 魅力【みりょく】だ。',
        options: [
          'ならではの',
          'にとどまらず',
          'をおいて',
          'にあたって'
        ],
        correctAnswer: 'ならではの',
        explanation: 'N + ならではの menyatakan keistimewaan khas yang hanya bisa ditemukan pada tradisi kriya Kyoto.',
        diagnosticFeedback: {
          'にとどまらず': 'Kekeliruan Pola: 〜にとどまらず berarti tidak hanya terbatas pada...',
          'をおいて': 'Kekeliruan Nuansa: 〜をおいて digunakan bersama bentuk sanggahan (〜をおいて他にない).',
          'にあたって': 'Kekeliruan Waktu: 〜にあたって digunakan saat momentum persiapan menyambut momen penting.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Nuansa Khas Positif): Manakah kalimat yang menggunakan 〜ならではの secara tepat dan alami?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ならではの secara tepat:',
        options: [
          '地元【じもと】の 新鮮【しんせん】な 魚介【ぎょかい】類【るい】を 使【つか】った 料理【りょうり】は、港【みなと】町【まち】ならではの 贅沢【ぜいたく】だ。',
          '毎日【まいにち】の 満員【まんいん】電車【でんしゃ】は、都会【とかい】ならではの 素晴らしい 宝物【たからもの】だ。',
          'スマートフォンを 落【お】として 画面【がめん】が 割【わ】れたのは、私【わたし】ならではの 奇跡【きせき】だ。',
          '風邪【かぜ】を 引【ひ】いて 熱【ねつ】が 出【で】たのは、冬【ふゆ】ならではの 楽しい イベントだ。'
        ],
        correctAnswer: '地元【じもと】の 新鮮【しんせん】な 魚介【ぎょかい】類【るい】を 使【つか】った 料理【りょうり】は、港【みなと】町【まち】ならではの 贅沢【ぜいたく】だ。',
        explanation: '〜ならではの digunakan untuk menonjolkan kekhasan unik bernilai positif dan menyenangkan (kemewahan kuliner khas kota pelabuhan).',
        diagnosticFeedback: {
          '毎日【まいにち】の 満員【まんいん】電車【でんしゃ】は、都会【とかい】ならではの 素晴らしい 宝物【たからもの】だ。': 'Sarkasme Janggal: Kereta padat berdesakan bukan anugerah positif bernilai tinggi.',
          'スマートフォンを 落【お】として 画面【がめん】が 割【わ】れたのは、私【わたし】ならではの 奇跡【きせき】だ。': 'Kekonyolan Ironis: Layar ponsel pecah adalah musibah kelalaian, bukan keistimewaan unik.',
          '風邪【かぜ】を 引【ひ】いて 熱【ねつ】が 出【で】たのは、冬【ふゆ】ならではの 楽しい イベントだ。': 'Ketidakwajaran Logika: Sakit demam saat musim dingin bukan acara yang menyenangkan.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat apresiasi keunggulan teknologi nano:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'この 先端【せんたん】技術【ぎじゅつ】には 目【め】を 見張【みは】る ものが あります',
          '目【め】を 見張【みは】る あります この 先端【せんたん】技術【ぎじゅつ】には ものが',
          'ものが あります この 先端【せんたん】技術【ぎじゅつ】には 目【め】を 見張【みは】る',
          'この 先端【せんたん】技術【ぎじゅつ】には ものが あります 目【め】を 見張【みは】る'
        ],
        correctAnswer: 'この 先端【せんたん】技術【ぎじゅつ】には 目【め】を 見張【みは】る ものが あります',
        explanation: 'Urutan baku: Topik (この先端技術には) + frasa modifikasi verba (目を見張る) + struktur penilaian mendalam (ものが あります).',
        diagnosticFeedback: {
          '目【め】を 見張【みは】る あります この 先端【せんたん】技術【ぎじゅつ】には ものが': 'Klausa Berantakan: Kata kerja bantu arimasu mendahului subjek penjelas.',
          'ものが あります この 先端【せんたん】技術【ぎじゅつ】には 目【め】を 見張【みは】る': 'Predikat Terbalik: Meletakkan kata mono ga arimasu di depan kalimat.',
          'この 先端【せんたん】技術【ぎじゅつ】には ものが あります 目【め】を 見張【みは】る': 'Modifikasi Terputus: Verba penjelas me o miharu terlempar ke ujung belakang.'
        },
        tokens: ['この 先端【せんたん】技術【ぎじゅつ】には', '目【め】を 見張【みは】る', 'ものが', 'あります'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Ekspansi Pasar Internasional): Saat Dr. Ogawa menegaskan: 「まさに他国の追随を許さない独自性ですね。この信頼性こそが世界の宇宙開発機構を惹きつけるはずです」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan kesiapan ekspansi komersial global:',
        options: [
          '国際【こくさい】特許【とっきょ】の 出願【しゅつがん】も 完了【かんりょう】いたしましたので、胸【むね】を 張【は】って グローバル市場【しじょう】へ 展開【てんかい】してまいりましょう！',
          '宇宙【うちゅう】開発【かいはつ】なんて お金【かね】の ムダですから、全員【ぜんいん】 ロケットから 降【お】りて 地上【ちじょう】で 芋【いも】でも 掘【ほ】りましょう。',
          '特許【とっきょ】なんて 取【と】らなくても パクリ放題【ほうだい】ですから、設計【せっけい】図【ず】を インターネットに 無料【むりょう】で ばらまきましょう。',
          '小川【おがわ】さん、私【わたし】は 宇宙【うちゅう】人【じん】が 怖【こわ】いので、明日【あした】から 地下【ちか】シェルターに 閉【と】じこもります。'
        ],
        correctAnswer: '国際【こくさい】特許【とっきょ】の 出願【しゅつがん】も 完了【かんりょう】いたしましたので、胸【むね】を 張【は】って グローバル市場【しじょう】へ 展開【てんかい】してまいりましょう！',
        explanation: 'Mengonfirmasi kesiapan perlindungan kekayaan intelektual (paten global) dan menunjukkan antusiasme ekspansi pasar internasional.',
        diagnosticFeedback: {
          '宇宙【うちゅう】開発【かいはつ】なんて お金【かね】の ムダですから、全員【ぜんいん】 ロケットから 降【お】りて 地上【ちじょう】で 芋【いも】でも 掘【ほ】りましょう。': 'Skeptisisme Defaitis: Merendahkan industri antariksa menunjukkan ketiadaan visi sains.',
          '特許【とっきょ】なんて 取【と】らなくても パクリ放題【ほうだい】ですから、設計【せっけい】図【ず】を インターネットに 無料【むりょう】で ばらまきましょう。': 'Kriminalitas HKI: Membocorkan cetak biru paten perusahaan ke publik adalah pelanggaran berat rahasia dagang.',
          '小川【おがわ】さん、私【わたし】は 宇宙【うちゅう】人【じん】が 怖【こわ】いので、明日【あした】から 地下【ちか】シェルターに 閉【と】じこもります。': 'Irasional & Kekanak-kanakan: Ketakutan tidak berdasar merusak profesionalisme insinyur riset.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 20: Dekrit Resmi, Regulasi Korporat & Keigo Tingkat Tinggi
  // ─────────────────────────────────────────────────────────────
  'les-n2-u20-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai bahasa hukum dan dekrit resmi: 〜ものとする (ditetapkan secara hukum/peraturan sebagai kewajiban mengikat) serta kerangka otoritas: 〜の下で / 〜のもとで (di bawah naungan/arahan resmi kesepakatan).',
        canDo: 'Bisa membaca, merumuskan, dan memverifikasi klausul kontrak kemitraan bilateral Jepang-Indonesia, serta mengoperasikan Keigo tingkat tinggi di ruang rapat direksi.',
        targetPatterns: [
          'V-plain + ものとする (ditetapkan bahwa ... / harus diperlakukan sebagai ... [ragam hukum/kontrak])',
          'N + の下で / のもとで (di bawah ... / di bawah naungan / berlandaskan arahan ...)'
        ],
        coreVocabSample: ['ものとする', 'のもとで', 'けいやく', 'ふんそう', 'ちゅうさい', 'きぞく', 'たんぽ', 'けつじつ']
      },
      sensei_context: {
        sceneIntro: 'Ruang Rapat Eksekutif Dewan Direksi Kantor Pusat Marunouchi, Tokyo. Sato (Direktur Kemitraan Korporat) dan Budi memfinalisasi teks perjanjian kemitraan investasi bilateral strategis.',
        dailyMission: 'Gunakan "mono to suru" untuk merumuskan klausul kewajiban hukum yang baku dan "no moto de" untuk menegaskan payung kerja sama antar-pemerintah.',
        whyOrder: 'Puncak kurikulum N2 memadukan literasi regulasi hukum resmi (mono to suru) dengan Keigo penghormatan eksekutif tingkat tinggi (Kenjougo/Sonkeigo) saat berhadapan dengan dewan komisaris.'
      },
      cultural_notes: {
        title: 'Penetapan Klausul Kontrak dan Keigo Eksekutif (契約条項と企業ガバナンス)',
        etiquette: 'Dalam dokumen legal resmi Jepang, frasa "mono to suru" digunakan untuk menetapkan aturan yang mengikat kedua belah pihak tanpa celah ambiguitas.',
        taboos: 'Jangan menggunakan ragam percakapan santai (koto ni suru) saat menyusun naskah klausul kontrak resmi di depan dewan direksi.'
      },
      pronunciation_tips: {
        title: 'Artikulasi Berwibawa "Mono To Suru"',
        moraNote: 'Lafalkan "mo-no-to-su-ru" dengan tempo teratur, nada mantap, dan ketukan formal.',
        soundTip: 'Pada "no mo-to-de", pastikan partikel penghubung terartikulasi dengan sopan dan khidmat.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ものとする (Dekrit Ketetapan Hukum Resmi) vs 〜ことにする (Keputusan Pribadi Kasual)',
          caseScenario: 'Ingin merumuskan bahwa segala sengketa wajib diselesaikan melalui arbitrase netral.',
          pitfallWarning: '紛争【ふんそう】は 仲裁【ちゅうさい】で 解決【かいけつ】する ことにする。 (Salah: terdengar seperti resolusi pribadi santai)',
          rightSolution: '紛争【ふんそう】は 仲裁【ちゅうさい】により 解決【かいけつ】する ものとする。 (Tepat: klausul hukum mengikat)',
          explanation: '〜ものとする adalah formula preskriptif standar dalam undang-undang, anggaran dasar korporasi, dan kontrak perdata.'
        },
        {
          title: 'Menggunakan 〜の下で untuk Lokasi Fisik Benda Bawah Meja',
          caseScenario: 'Ingin mengatakan kucing tidur di bawah meja.',
          pitfallWarning: '猫【ねこ】が 机【つくえ】の 下【もと】で 寝【ね】ている。 (Salah kaprah kanji)',
          rightSolution: '猫【ねこ】が 机【つくえ】の 下【した】で 寝【ね】ている。 (Tepat: posisi spasial bawah)',
          explanation: '〜の下で (no moto de) digunakan untuk kondisi abstrak: bimbingan mentor (指導のもとで), naungan perlindungan hukum, atau kerangka kesepakatan.'
        }
      ],
      who_and_when: {
        situational_context: 'Sidang pleno penandatanganan memorandum bilateral, rapat umum pemegang saham, dan audit kepatuhan hukum korporat.',
        social_relations: 'Direktur Kemitraan Korporat (Sato) dan koordinator kemitraan bilateral (Budi).',
        when_not_to_use: 'Jangan gunakan mono to suru saat membuat janji temu makan malam bersama teman akrab.'
      },
      scenario: {
        title: 'Penandatanganan Perjanjian Kemitraan Marunouchi',
        setting: 'Ruang Dewan Direksi Lantai 38 Marunouchi, pukul 10.00',
        narrative: 'Sato dan Budi memeriksa draf final klausul penyelesaian sengketa sebelum upacara penandatanganan resmi.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: 'ブディさん、日印【にちいん】包括【ほうかつ】的【てき】経済【けいざい】協定【きょうてい】の 精神【せいしん】の もとで、両社【りょうしゃ】の 合弁【ごうべん】事業【じぎょう】契約書【けいやくしょ】の 最終【さいしゅう】案【あん】を 確認【かくにん】しましょう。',
        furigana: 'ブディさん、包括的経済連携協定の 精神のもとで、両社の 合弁事業契約書の 最終案を 確認しましょう。',
        romaji: 'Budi-san, houkatsuteki keizai renkei kyoutei no seishin no moto de, ryousha no gouben jigyou keiyakusho no saishuu-an o kakunin shimashou.',
        idText: 'Budi, di bawah naungan semangat perjanjian kemitraan ekonomi bilateral, mari kita periksa draf final perjanjian usaha patungan kedua perusahaan.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ 第十二条【だいじゅうにじょう】において、『知的【ちてき】財産【ざいさん】権【けん】の 帰属【きぞく】に 関【かん】する 紛争【ふんそう】は、中立【ちゅうりつ】な 仲裁【ちゅうさい】機関【きかん】により 解決【かいけつ】する ものとする』と 明記【めいき】いたしました。',
        furigana: 'はい！ 第十二条において、『知的財産権の 帰属に関する 紛争は、中立な 仲裁機関により 解決する ものとする』と 明記いたしました。',
        romaji: 'Hai! Dai-juuni-jou ni oite, "Chiteki zaisanken no kizoku ni kansuru funsou wa, chuuritsu na chuusai kikan ni yori kaiketsu suru mono to suru" to meiki itashimashita.',
        idText: 'Baik, Pak! Pada Pasal 12, telah ditegaskan secara tertulis bahwa: "Sengketa mengenai kepemilikan hak kekayaan intelektual ditetapkan diselesaikan melalui lembaga arbitrase netral".'
      },
      {
        id: 'd3',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: '完璧【かんぺき】な 法的【ほうてき】規定【きてい】ですね。双方【そうほう】の 公平【こうへい】な 権利【けんり】が 担保【たんぽ】され、役員【やくいん】会【かい】でも 満場【まんじょう】一致【いっち】で 承認【しょうにん】されました。',
        furigana: '完璧な 法的規定ですね。双方の 公平な 権利が 担保され、役員会でも 満場一致で 承認されました。',
        romaji: 'Kampeki na houteki kitei desu ne. Souhou no kouhei na kenri ga tampo sare, yakuinkai demo manjou-icchi de shounin saremashita.',
        idText: 'Ketentuan hukum yang sempurna. Hak keadilan kedua belah pihak terjamin kokoh, dan rancangan ini telah disetujui secara aklamasi oleh dewan direksi.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '佐藤【さとう】取締役【とりしまりやく】の ご指導【しどう】の もとで 学【まな】んだ 国際【こくさい】法務【ほうむ】の 知見【ちけん】が、この 締結【ていけつ】に 結実【けつじつ】いたしました。心【こころ】より 感謝【かんしゃ】申【もう】し上【あ】げます！',
        furigana: '佐藤取締役の ご指導の もとで 学んだ 国際法務の 知見が、この 締結に 結実いたしました。心より 感謝申し上げます！',
        romaji: 'Sato torishimariyaku no goshidou no moto de mananda kokusai houmu no chiken ga, kono teiketsu ni ketsujitsu itashimashita. Kokoro yori kansha moushiagemasu!',
        idText: 'Wawasan hukum internasional yang saya pelajari di bawah bimbingan Bapak Direktur Sato telah membuahkan hasil dalam penandatanganan ini. Saya haturkan terima kasih yang sedalam-dalamnya!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah fungsi yuridis dari klausul yang diakhiri dengan "〜ものとする"?',
        sentencePrompt: 'Klausul "契約書【けいやくしょ】に 記載【きさい】された 義務【ぎむ】を 履行【りこう】する ものとする" bermakna:',
        options: [
          'Ditetapkan secara hukum resmi sebagai kewajiban mutlak yang wajib dipatuhi oleh para pihak yang mengikatkan diri',
          'Disarankan bila ada waktu luang untuk mencoba membaca kontrak tersebut',
          'Boleh membatalkan kontrak sesuka hati tanpa memberi tahu pihak rekanan',
          'Menganggap kontrak tersebut sebagai kertas coret-coret latihan menggambar'
        ],
        correctAnswer: 'Ditetapkan secara hukum resmi sebagai kewajiban mutlak yang wajib dipatuhi oleh para pihak yang mengikatkan diri',
        explanation: '"〜ものとする" adalah formula bahasa hukum wajib dalam naskah perjanjian dan regulasi korporat.',
        diagnosticFeedback: {
          'Disarankan bila ada waktu luang untuk mencoba membaca kontrak tersebut': 'Salah: Ini bukan opsi saran santai melainkan kewajiban yuridis mengikat.',
          'Boleh membatalkan kontrak sesuka hati tanpa memberi tahu pihak rekanan': 'Pelanggaran Berat: Pembatalan sepihak melanggar asas hukum perjanjian.',
          'Menganggap kontrak tersebut sebagai kertas coret-coret latihan menggambar': 'Pelecehan Dokumen: Naskah kontrak legal bukan kertas coret-coret.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan kerangka naungan/bimbingan otoritas:',
        sentencePrompt: '優【すぐ】れた 指導者【しどうしゃ】[　　]、若手【わかて】社員【しゃいん】たちが 目覚【めざ】ましい 成長【せいちょう】を 遂【と】げた。',
        options: [
          'の もとで',
          'に あたって',
          'を めぐって',
          'に 限【かぎ】らず'
        ],
        correctAnswer: 'の もとで',
        explanation: 'N + のもとで menyatakan kondisi bertumbuh di bawah naungan arahan/bimbingan pemimpin yang cakap.',
        diagnosticFeedback: {
          'に あたって': 'Kekeliruan Waktu: 〜にあたって digunakan untuk momentum memulai acara resmi.',
          'を めぐって': 'Kekeliruan Makna: 〜をめぐって menyatakan sengketa seputar suatu isu.',
          'に 限【かぎ】らず': 'Kekeliruan Pola: 〜に限らず berarti tidak hanya terbatas pada...'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Klausul Hukum): Manakah kalimat yang menggunakan 〜ものとする secara sah sesuai kaidah dokumen regulasi resmi?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ものとする secara tepat:',
        options: [
          '本【ほん】協定【きょうてい】の 解釈【かいしゃく】に 疑義【ぎぎ】が 生【しょう】じた 場合【ばあい】は、誠意【せいい】をもって 協議【きょうぎ】する ものとする。',
          '今晩【こんばん】は 疲【つか】れたから、早【はや】く 寝【ね】る ものとする。',
          '美味【おい】しい ケーキを 買【か】ったので、家族【かぞく】で 分【わ】け合【あ】う ものとする。',
          '明日【あした】 雨【あめ】が 降【ふ】ったら、遠足【えんそく】は 中止【ちゅうし】になる ものとする。'
        ],
        correctAnswer: '本【ほん】協定【きょうてい】の 解釈【かいしゃく】に 疑義【ぎぎ】が 生【しょう】じた 場合【ばあい】は、誠意【せいい】をもって 協議【きょうぎ】する ものとする。',
        explanation: '〜ものとする digunakan untuk pasal-pasal ketentuan normatif hukum dalam perjanjian kerja sama.',
        diagnosticFeedback: {
          '今晩【こんばん】は 疲【つか】れたから、早【はや】く 寝【ね】る ものとする。': 'Resolusi Personal: Ingin tidur lebih awal karena lelah adalah keputusan santai pribadi (寝ることにする).',
          '美味【おい】しい ケーキを 買【か】ったので、家族【かぞく】で 分【わ】け合【あ】う ものとする。': 'Urusan Domestik: Berbagi kue dengan keluarga bukan klausul yuridis.',
          '明日【あした】 雨【あめ】が 降【ふ】ったら、遠足【えんそく】は 中止【ちゅうし】になる ものとする。': 'Kondisi Cuaca Spontan: Pembatalan tamasya akibat hujan adalah pengumuman biasa (中止となります).'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi klausul penyelesaian sengketa:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '紛争【ふんそう】は 中立【ちゅうりつ】な 仲裁【ちゅうさい】により 解決【かいけつ】する ものとする',
          '解決【かいけつ】する ものとする 紛争【ふんそう】は 中立【ちゅうりつ】な 仲裁【ちゅうさい】により',
          '中立【ちゅうりつ】な 仲裁【ちゅうさい】により ものとする 紛争【ふんそう】は 解決【かいけつ】する',
          '紛争【ふんそう】は ものとする 中立【ちゅうりつ】な 仲裁【ちゅうさい】により 解決【かいけつ】する'
        ],
        correctAnswer: '紛争【ふんそう】は 中立【ちゅうりつ】な 仲裁【ちゅうさい】により 解決【かいけつ】する ものとする',
        explanation: 'Urutan klausul hukum baku: Pokok perkara (紛争は) + instrumen penyelesaian (中立な仲裁により) + verba penetapan hukum (解決するものとする).',
        diagnosticFeedback: {
          '解決【かいけつ】する ものとする 紛争【ふんそう】は 中立【ちゅうりつ】な 仲裁【ちゅうさい】により': 'Predikat di Depan: Meletakkan ketetapan hukum di awal naskah klausul.',
          '中立【ちゅうりつ】な 仲裁【ちゅうさい】により ものとする 紛争【ふんそう】は 解決【かいけつ】する': 'Klausul Terpecah: Frasa mono to suru menyusup membelah modalitas.',
          '紛争【ふんそう】は ものとする 中立【ちゅうりつ】な 仲裁【ちゅうさい】により 解決【かいけつ】する': 'Verba Terdampar: Menempatkan mono to suru sebelum tindakan penyelesaian.'
        },
        tokens: ['紛争【ふんそう】は', '中立【ちゅうりつ】な 仲裁【ちゅうさい】により', '解決【かいけつ】する', 'ものとする'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Etika Keigo Eksekutif): Saat Direktur Sato menyampaikan: 「完璧な法的規定ですね。役員会でも満場一致で承認されました」, apa ungkapan Keigo penghormatan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan eksekutif yang mencerminkan rasa hormat dan integritas:',
        options: [
          '佐藤【さとう】取締役【とりしまりやく】の ご指導【しどう】の もとで 学【まな】んだ 国際【こくさい】法務【ほうむ】の 知見【ちけん】が、この 締結【ていけつ】に 結実【けつじつ】いたしました。心【こころ】より 感謝【かんしゃ】申【もう】し上【あ】げます！',
          '佐藤【さとう】さん、あなたが ノロマだから 承認【しょうにん】が 遅【おく】れたんですよ。次【つぎ】からは もっと テキパキ 働【はたら】いてください。',
          '契約【けいやく】が 成立【せいりつ】したからには、印税【いんぜい】を 私【わたし】の 口座【こうざ】に 毎月【まいつき】 半分【はんぶん】 振り込【ふりこ】んでくださいね。',
          '役員【やくいん】会の 連中【れんちゅう】なんて どうせ 書類【しょるい】を 読【よ】んでいないので、適当【てきとう】に 騙【だま】せて ラッキーでしたね。'
        ],
        correctAnswer: '佐藤【さとう】取締役【とりしまりやく】の ご指導【しどう】の もとで 学【まな】んだ 国際【こくさい】法務【ほうむ】の 知見【ちけん】が、この 締結【ていけつ】に 結実【けつじつ】いたしました。心【こころ】より 感謝【かんしゃ】申【もう】し上【あ】げます！',
        explanation: 'Menggunakan ragam Kenjougo sempurna (感謝申し上げます, 結実いたしました) dan mengaitkan keberhasilan pada bimbingan berharga dewan pimpinan.',
        diagnosticFeedback: {
          '佐藤【さとう】さん、あなたが ノロマだから 承認【しょうにん】が 遅【おく】れたんですよ。次【つぎ】からは もっと テキパキ 働【はたら】いてください。': 'Penghinaan Berat: Mencela direktur sebagai orang lamban di ruang dewan komisaris akan berujung pemecatan.',
          '契約【けいやく】が 成立【せいりつ】したからには、印税【いんぜい】を 私【わたし】の 口座【こうざ】に 毎月【まいつき】 半分【はんぶん】 振り込【ふりこ】んでくださいね。': 'Tuntutan Ilegal: Menuntut royalti pribadi dari kontrak korporat adalah tindak pidana gratifikasi.',
          '役員【やくいん】会の 連中【れんちゅう】なんて どうせ 書類【しょるい】を 読【よ】んでいないので、適当【てきとう】に 騙【だま】せて ラッキーでしたね。': 'Penghinaan Dewan Komisaris: Menyebut jajaran direksi tidak membaca dokumen merusak tata kelola korporat.'
        }
      }
    ]
  },

  'les-n2-u20-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pencocokan standar regulasi: 〜に照らし合わせて (dicocokkan/diuji terhadap standar tolak ukur hukum & etika) dan keluwesan adaptasi: 〜に即して (tepat sesuai dengan situasi faktual lapangan).',
        canDo: 'Bisa melakukan audit komprehensif kepatuhan bisnis, memadukan kepatuhan etis internasional dengan realitas lapangan, serta mengikrarkan komitmen kepemimpinan bilateral menuju jenjang N1.',
        targetPatterns: [
          'N + に照らし合わせて (dicocokkan terhadap ... / berlandaskan tolak ukur standar ...)',
          'N + に即して / に即した (tepat sesuai dengan ... / berlandaskan fakta riil ...)'
        ],
        coreVocabSample: ['てらしあわせる', 'そくする', 'きはん', 'じつじょう', 'ちょういん', 'ちょうわ', 'えんかつ', 'いしずえ']
      },
      sensei_context: {
        sceneIntro: 'Ruang Sidang Paripurna Kemitraan Strategis Global di Tokyo. Puncak upacara peresmian traktat kemitraan dan penutupan seluruh kurikulum Flagship JLPT N2 Nugget Nihongo. Sato (Direktur Kemitraan) dan Budi menyampaikan pidato penutup.',
        dailyMission: 'Gunakan "ni terashiawasete" untuk menegaskan kepatuhan norma dan "ni sokushite" untuk memastikan operasional membumi dengan realitas lapangan.',
        whyOrder: 'Pelajaran ke-40 adalah puncak pencapaian pembelajar N2: menunjukkan penguasaan wacana tingkat tinggi yang menyatukan integritas moral, kepatuhan yuridis, keluwesan praktis, dan visi kepemimpinan masa depan.'
      },
      cultural_notes: {
        title: 'Kulminasi Pembelajaran dan Integritas Global (規範の遵守と実践躬行)',
        etiquette: 'Menyelesaikan kurikulum N2 menandakan pembelajar bukan lagi sekadar pemelajar bahasa, melainkan jembatan diplomasi (Kakehashi) yang dipercaya di lingkungan korporat Jepang.',
        taboos: 'Jangan menganggap kelulusan N2 sebagai titik henti; jadikan ini fondasi kokoh untuk melangkah menaklukkan wacana abstrak N1.'
      },
      pronunciation_tips: {
        title: 'Intonasi Khidmat Puncak N2',
        moraNote: 'Lafalkan "te-ra-shi-a-wa-se-te" dengan artikulasi berwibawa, bersih tanpa sengau.',
        soundTip: 'Pada "ni so-ku-shi-te", ucapkan dengan nada mantap penuh keteguhan tekad.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜に照らし合わせて (Menguji Terhadap Standar Norma) vs 〜に合わせて (Menyesuaikan Selera Kasual)',
          caseScenario: 'Ingin mengatakan bahwa kebijakan ini diuji dan dicocokkan dengan standar etika internasional.',
          pitfallWarning: '国際【こくさい】規範【きはん】に 合【あ】わせて 決【き】めた。 (Terdengar kurang akademis)',
          rightSolution: '国際【こくさい】規範【きはん】に 照【て】らし合【あ】わせて 策定【さくてい】した。 (Tepat: uji validasi standar)',
          explanation: '〜に照らし合わせて memiliki nuansa pengujian yang ketat dan cermat terhadap aturan hukum, standar norma, atau tolak ukur objektif.'
        },
        {
          title: 'Tertukar Antara 〜に即して (Berdasarkan Fakta Lapangan) vs 〜に即座に (Dengan Segera Cepat)',
          caseScenario: 'Ingin menyampaikan bahwa aturan dibuat sesuai dengan kondisi riil lapangan.',
          pitfallWarning: '実情【じつじょう】に 即座【そくざ】に 作【つく】った。 (Salah: sokuzani berarti dengan cepat/instan)',
          rightSolution: '現場【げんば】の 実情【じつじょう】に 即【そく】して 策定【さくてい】した。 (Tepat: sesuai fakta riil)',
          explanation: '〜に即して (ni sokushite) berarti berakar dan berkesesuaian erat dengan fakta, realitas, atau pengalaman nyata di lapangan.'
        }
      ],
      who_and_when: {
        situational_context: 'Upacara peresmian kerja sama bilateral, wisuda kelulusan pelatihan eksekutif, dan perumusan piagam tata kelola korporat.',
        social_relations: 'Pimpinan korporat senior (Sato) dan duta profesional Indonesia (Budi).',
        when_not_to_use: 'Jangan gunakan ni terashiawasete untuk membandingkan resep masakan sederhana di dapur.'
      },
      scenario: {
        title: 'Puncak Upacara Kemitraan Bilateral Tokyo',
        setting: 'Tokyo Grand Plenary Auditorium, pukul 15.00',
        narrative: 'Sato dan Budi merayakan tuntasnya penyelarasan regulasi bilateral, menandai penuntasan sempurna seluruh Kurikulum JLPT N2.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: 'ブディさん、本日【ほんじつ】の 調印【ちょういん】式【しき】を 迎【むか】え、私【わたし】たちの 協定【きょうてい】が 国際【こくさい】規範【きはん】に 照【て】らし合【あ】わせて 一点【いってん】の 曇【くも】りもない 状態【じょうたい】に 達【たっ】した ことを 誇【ほこ】りに 思【おも】います。',
        furigana: 'ブディさん、本日の 調印式を 迎え、私たちの 協定が 国際規範に 照らし合わせて 一点の 曇りもない 状態に 達した ことを 誇りに 思います。',
        romaji: 'Budi-san, honjitsu no chouinshiki o mukae, watashitachi no kyoutei ga kokusai kihan ni terashiawasete itten no kumori mo nai joutai ni tasshita koto o hokori ni omoimasu.',
        idText: 'Budi, menyambut upacara penandatanganan hari ini, saya bangga bahwa perjanjian kita telah mencapai kondisi sempurna tanpa celah sedikit pun saat diuji terhadap norma internasional.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ありがとうございます！ 理想【りそう】を 掲【かか】げるだけでなく、現場【げんば】の 実情【じつじょう】に 即【そく】した 柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 整備【せいび】できた ことが、今回【こんかい】の 成功【せいこう】要因【よういん】です。',
        furigana: 'ありがとうございます！ 理想を 掲げるだけでなく、現場の 実情に 即した 柔軟な 運用ガイドラインを 整備できた ことが、今回の 成功要因です。',
        romaji: 'Arigatou gozaimasu! Risou o kakageru dake de naku, genba no jitsujou ni sokushita juunan na unyou gaidorain o seibi dekita koto ga, konkai no seikou youin desu.',
        idText: 'Terima kasih banyak! Bukan hanya menjunjung cita-cita luhur, keberhasilan kali ini terwujud karena kita mampu menyusun pedoman operasional fleksibel yang membumi tepat sesuai dengan realitas di lapangan.'
      },
      {
        id: 'd3',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: 'ええ。高度【こうど】な 日本語【にほんご】の 運用【うんよう】能力【のうりょく】と 深【ふか】い 異【い】文化【ぶんか】理解【りかい】を もって、両国【りょうこく】の 架【か】け橋【はし】と なってくれた ブディさんに、心【こころ】から 敬意【けいい】を 表【ひょう】します。',
        furigana: 'ええ。高度な 日本語の 運用能力と 深い 異文化理解を もって、両国の 架け橋と なってくれた ブディさんに、心から 敬意を 表します。',
        romaji: 'Ee. Koudo na Nihongo no unyou nouryoku to fukai ibunka rikai o motte, ryoukoku no kakehashi to natte kureta Budi-san ni, kokoro kara keii o hyou shimasu.',
        idText: 'Tepat sekali. Kepada Budi, yang berbekal kemahiran bahasa Jepang tingkat tinggi dan pemahaman lintas budaya mendalam telah menjadi jembatan penghubung kedua negara, saya haturkan rasa hormat setinggi-tingginya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'この N2の 学【まな】びを 礎【いしずえ】として、さらなる 高【たか】みである N1の 頂【いただき】を 目指【めざ】し、グローバル社会【しゃかい】に 貢献【こうけん】する リーダーとして 精進【しょうじん】を 重【かさ】ねてまいります！',
        furigana: 'この N2の 学びを 礎として、さらなる 高みである N1の 頂を 目指し、グローバル社会に 貢献する リーダーとして 精進を 重ねてまいります！',
        romaji: 'Kono N2 no manabi o ishizue to shite, saranaru takami de aru N1 no itadaki o mezashi, guroobaru shakai ni kouken suru riidaa to shite shoujin o kasanete mairimasu!',
        idText: 'Menjadikan seluruh pembelajaran N2 ini sebagai fondasi kokoh, saya bertekad membidik puncak N1 yang lebih tinggi, dan terus mendedikasikan diri sebagai pemimpin yang berkontribusi bagi masyarakat global!'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah fungsi gramatikal dari ungkapan "〜に照【て】らし合【あ】わせて"?',
        sentencePrompt: 'Frasa "法令【ほうれい】と 倫理【りんり】に 照【て】らし合【あ】わせて 判断【はんだん】する" bermakna:',
        options: [
          'Mengambil keputusan dengan menguji dan mencocokkannya secara teliti terhadap standar hukum perundang-undangan dan norma etika',
          'Menyalakan lampu senter ke arah tumpukan dokumen di gudang gelap',
          'Membandingkan kecerahan warna dua kemeja batik di bawah sinar matahari',
          'Menunggu lampu lalu lintas berubah menjadi hijau sebelum menyeberang'
        ],
        correctAnswer: 'Mengambil keputusan dengan menguji dan mencocokkannya secara teliti terhadap standar hukum perundang-undangan dan norma etika',
        explanation: '"〜に照らし合わせて" menyatakan proses pengujian dan validasi tindakan terhadap standar aturan, norma, atau hukum.',
        diagnosticFeedback: {
          'Menyalakan lampu senter ke arah tumpukan dokumen di gudang gelap': 'Salah: Menyorot senter adalah 懐中電灯で照らす (terasu fisik).',
          'Membandingkan kecerahan warna dua kemeja batik di bawah sinar matahari': 'Salah: Membandingkan warna pakaian adalah 色を見比べる.',
          'Menunggu lampu lalu lintas berubah menjadi hijau sebelum menyeberang': 'Salah: Lampu lalu lintas adalah 信号 (shingou).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan kesesuaian erat dengan kenyataan fakta lapangan:',
        sentencePrompt: '新【あたら】しい 規則【きそく】は、現場【げんば】の 実情【じつじょう】[　　] 策定【さくてい】されなければ ならない。',
        options: [
          'に 即【そく】して',
          'に 反【はん】して',
          'を 限【かぎ】りに',
          'を もって'
        ],
        correctAnswer: 'に 即【そく】して',
        explanation: 'N + に即して menyatakan bahwa penyusunan aturan baru harus berpijak erat dan berkesesuaian dengan situasi riil lapangan.',
        diagnosticFeedback: {
          'に 反【はん】して': 'Kekeliruan Makna: 〜に反して berarti berlawanan/bertentangan dengan...',
          'を 限【かぎ】りに': 'Kekeliruan Waktu: 〜を限りに berarti berakhir sampai batas momentum tertentu.',
          'を もって': 'Kekeliruan Cara: 〜をもって menyatakan sarana resmi penutupan atau batasan waktu.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Validasi Standar Norma): Manakah kalimat yang menggunakan 〜に照らし合わせて secara berwibawa dan tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜に照らし合わせて secara tepat:',
        options: [
          '企業【きぎょう】の 財務【ざいむ】報告【ほうこく】は、国際【こくさい】会計【かいけい】基準【きじゅん】に 照【て】らし合【あ】わせて 厳正【げんせい】に 監査【かんさ】される。',
          '今日【きょう】の 気分【きぶん】に 照【て】らし合【あ】わせて、お昼【ひる】ご飯【はん】の カレーを 大盛【おおも】りにした。',
          '天気【てんき】予報【よほう】に 照【て】らし合【あ】わせて、傘【かさ】を ポケットに 突【つ】っ込【こ】んだ。',
          'ゲームの ルールに 照【て】らし合【あ】わせて、サイコロを 思【おも】いきり 投【な】げ飛【と】ばした。'
        ],
        correctAnswer: '企業【きぎょう】の 財務【ざいむ】報告【ほうこく】は、国際【こくさい】会計【かいけい】基準【きじゅん】に 照【て】らし合【あ】わせて 厳正【げんせい】に 監査【かんさ】される。',
        explanation: '〜に照らし合わせて sangat tepat untuk audit kepatuhan terhadap standar objektif (standar akuntansi internasional).',
        diagnosticFeedback: {
          '今日【きょう】の 気分【きぶん】に 照【て】らし合【あ】わせて、お昼【ひる】ご飯【はん】の カレーを 大盛【おおも】りにした。': 'Selera Pribadi: Memesan porsi makan siang berdasarkan suasana hati tidak memerlukan konstruksi audit norma.',
          '天気【てんき】予報【よほう】に 照【て】らし合【あ】わせて、傘【かさ】を ポケットに 突【つ】っ込【こ】んだ。': 'Aksi Sehari-hari: Menyiapkan payung cukup dengan 天気予報に合わせて / 見て.',
          'ゲームの ルールに 照【て】らし合【あ】わせて、サイコロを 思【おも】いきり 投【な】げ飛【と】ばした。': 'Konteks Main-main: Melempar dadu permainan bukan audit kepatuhan formal.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat operasional berbasis fakta lapangan:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '現場【げんば】の 実情【じつじょう】に 即【そく】した 柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 整備【せいび】した',
          '柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 現場【げんば】の 実情【じつじょう】に 整備【せいび】した 即【そく】した',
          '整備【せいび】した 柔軟【じゅうなん】な 現場【げんば】の 実情【じつじょう】に 即【そく】した 運用【うんよう】ガイドラインを',
          '即【そく】した 現場【げんば】の 実情【じつじょう】に 柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 整備【せいび】した'
        ],
        correctAnswer: '現場【げんば】の 実情【じつじょう】に 即【そく】した 柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 整備【せいび】した',
        explanation: 'Urutan baku: Modifikasi fakta (現場の実情に即した) + frasa nomina modifikasi (柔軟な運用ガイドラインを) + verba penuntasan (整備した).',
        diagnosticFeedback: {
          '柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 現場【げんば】の 実情【じつじょう】に 整備【せいび】した 即【そく】した': 'Frasa Pemisah: Kata sokushita terlempar ke paling ujung kalimat.',
          '整備【せいび】した 柔軟【じゅうなん】な 現場【げんば】の 実情【じつじょう】に 即【そく】した 運用【うんよう】ガイドラインを': 'Verba di Depan: Meletakkan kata kerja utama di awal kalimat memutus alur.',
          '即【そく】した 現場【げんば】の 実情【じつじょう】に 柔軟【じゅうなん】な 運用【うんよう】ガイドラインを 整備【せいび】した': 'Partikel Mundur: Kata sokushita mendahului nomina dasarnya.'
        },
        tokens: ['現場【げんば】の 実情【じつじょう】に', '即【そく】した', '柔軟【じゅうなん】な 運用【うんよう】ガイドラインを', '整備【せいび】した'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Puncak Deklarasi Kelulusan N2 Menuju N1): Saat Direktur Sato menyampaikan rasa hormat tertinggi atas peran Anda sebagai jembatan dua bangsa, apa deklarasi kepemimpinan terbaik Anda?',
        sentencePrompt: 'Pilihlah ikrar kelulusan pamungkas yang menyatukan rasa syukur, integritas, dan visi masa depan:',
        options: [
          'この N2の 学【まな】びを 礎【いしずえ】として、さらなる 高【たか】みである N1の 頂【いただき】を 目指【めざ】し、グローバル社会【しゃかい】に 貢献【こうけん】する リーダーとして 精進【しょうじん】を 重【かさ】ねてまいります！',
          'N2に 合格【ごうかく】したから もう 勉強【べんきょう】は 一生【いっしょう】しません！ 明日【あした】から 日本語【にほんご】の 教科【きょうか】書【しょ】を 全部【ぜんぶ】 捨【す】てます。',
          '佐藤【さとう】さん、私【わたし】が 偉【えら】いおかげで 会社【かいしゃ】が 救【すく】われたのですから、社長【しゃちょう】の 椅子【いす】を 今【いま】すぐ 私【わたし】に 譲【ゆず】ってください。',
          '日本語【にほんご】なんて 所詮【しょせん】 言語【げんご】ですから、これからは 全部【ぜんぶ】 AIに やらせて 私【わたし】は 南【みなみ】の 島【しま】で 昼寝【ひるね】します。'
        ],
        correctAnswer: 'この N2の 学【まな】びを 礎【いしずえ】として、さらなる 高【たか】みである N1の 頂【いただき】を 目指【めざ】し、グローバル社会【しゃかい】に 貢献【こうけん】する リーダーとして 精進【しょうじん】を 重【かさ】ねてまいります！',
        explanation: 'Mengekspresikan tekad luhur menjadikan pencapaian N2 sebagai batu loncatan menuju kepemimpinan global dan penguasaan N1 dengan penuh kerendahan hati dan keteguhan jiwa.',
        diagnosticFeedback: {
          'N2に 合格【ごうかく】したから もう 勉強【べんきょう】は 一生【いっしょう】しません！ 明日【あした】から 日本語【にほんご】の 教科【きょうか】書【しょ】を 全部【ぜんぶ】 捨【す】てます。': 'Defaitis & Berpuas Diri: Membuang buku belajar setelah N2 mencerminkan hilangnya semangat pembelajar sejati.',
          '佐藤【さとう】さん、私【わたし】が 偉【えら】いおかげで 会社【かいしゃ】が 救【すく】われたのですから、社長【しゃちょう】の 椅子【いす】を 今【いま】すぐ 私【わたし】に 譲【ゆず】ってください。': 'Arogansi Tak Terkendali: Menuntut kursi presiden direktur merusak etika tata krama korporat.',
          '日本語【にほんご】なんて 所詮【しょせん】 言語【げんご】ですから、これからは 全部【ぜんぶ】 AIに やらせて 私【わたし】は 南【みなみ】の 島【しま】で 昼寝【ひるね】します。': 'Ketiadaan Komitmen: Lari dari tanggung jawab kepemimpinan mencederai amanah sebagai jembatan dua bangsa.'
        }
      }
    ]
  }
};

const merged = Object.assign({}, currentUnits, u18_20);
fs.writeFileSync(targetFile, 'module.exports = ' + JSON.stringify(merged, null, 2) + ';\n', 'utf8');
console.log('✅ units-16-to-20.js successfully updated! Total lessons in file:', Object.keys(merged).length);
console.log('Keys:', Object.keys(merged));
