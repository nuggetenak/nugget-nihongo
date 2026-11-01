// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/append-units-08-to-10.js
//  Appends Gold-Standard Curated Units 8, 9, 10 to units-06-to-10.js
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-06-to-10.js');
let existing = {};
try {
  existing = require(targetFile);
} catch (e) {
  existing = {};
}

const u08_10 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 8: Manajemen Risiko, Komitmen Tegas & Cakupan Luas
  // ─────────────────────────────────────────────────────────────
  'les-n2-u08-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai peringatan risiko fatal tak terduga: 〜かねない (berpotensi menimbulkan bahaya/kerusakan jika dibiarkan) dan tekad tanggung jawab mutlak: 〜からには (karena sudah bertekad/mengambil tanggung jawab, maka pantang mundur).',
        canDo: 'Bisa mendeteksi dan memperingatkan anomali sistem kelistrikan berisiko tinggi serta menegaskan komitmen penanganan hingga tuntas.',
        targetPatterns: [
          'V-masu + かねない (berpotensi / bisa berujung pada bahaya)',
          'V-plain / N + である + からには (karena sudah ..., pantang mundur / wajib tuntas)'
        ],
        coreVocabSample: ['けいほう', 'しゃだん', 'いじょう', 'きけん', 'たいさく', 'かくご', 'てんけん', 'ほぜん']
      },
      sensei_context: {
        sceneIntro: 'Pusat komando tanggap darurat infrastruktur kelistrikan dan jaringan rel kereta Shinkansen. Yamada (Manajer Logistik & QC) memantau sensor arus daya trafo bersama Budi.',
        dailyMission: 'Gunakan "kaneninai" untuk membunyikan alarm peringatan teknis seawal mungkin dan "kara ni wa" untuk menandai tanggung jawab profesional.',
        whyOrder: 'Dalam manajemen risiko N2, peringatan dini terhadap potensi kegagalan berantai (kaneninai) harus selalu diimbangi dengan sikap kepemimpinan yang berani bertanggung jawab (kara ni wa).'
      },
      cultural_notes: {
        title: 'Manajemen Bahaya Sejak Dini (危険予知 - Kiken Yochi) & Integritas Tugas',
        etiquette: 'Menyampaikan potensi bahaya dengan "jiko ni tsunagarikanemasen" dipandang sebagai bukti dedikasi tinggi terhadap keselamatan, bukan pesimisme.',
        taboos: 'Jangan pernah meremehkan kenaikan suhu sekecil apa pun pada gardu listrik bertegangan tinggi.'
      },
      pronunciation_tips: {
        title: 'Penekanan Moralitas "Kara ni wa"',
        moraNote: 'Lafalkan "ka-ra-ni-wa" dengan tempo berbobot tegas untuk mempertegas komitmen moral.',
        soundTip: 'Pada "kaneninai", ucapkan dengan artikulasi halus tanpa menaikkan nada seperti pertanyaan.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜かねない (Risiko Negatif) vs 〜かねる (Penolakan Sopan)',
          caseScenario: 'Memakai kanenai untuk menolak permohonan klien secara sopan.',
          pitfallWarning: 'その 要求【ようきゅう】は 引【ひ】き受【う】けかねない。 (Salah: artinya malah berpotensi menerima)',
          rightSolution: 'その 要求【ようきゅう】は 引【ひ】き受【う】けかねます。 (Tepat: menolak secara sopan)',
          explanation: '〜かねない selalu bermakna risiko bahaya atau akibat buruk (bisa berujung celaka), sedangkan 〜かねる bermakna kesulitan/tidak sanggup melakukan (penolakan santun).'
        },
        {
          title: 'Memakai 〜かねない untuk Kejadian Positif',
          caseScenario: 'Mengatakan bahwa harga saham berpotensi naik menguntungkan.',
          pitfallWarning: '株価【かぶか】が 上【あ】がりかねない。 (Rancu jika dianggap positif)',
          rightSolution: '株価【かぶか】が 上【あ】がる 可能性【かのうせい】が ある。 (Tepat)',
          explanation: 'Pola 〜かねない hanya digunakan untuk potensi peristiwa yang tidak diinginkan atau membahayakan.'
        }
      ],
      who_and_when: {
        situational_context: 'Pusat kendali tanggap darurat, inspeksi keselamatan K3, briefing mitigasi bencana, dan investigasi kegagalan teknis.',
        social_relations: 'Koordinasi tanggap darurat antara Komandan Lapangan (Yamada) dan teknisi sistem (Budi).',
        when_not_to_use: 'Jangan gunakan pada perkiraan cuaca cerah atau keberuntungan yang membahagiakan.'
      },
      scenario: {
        title: 'Deteksi Fluktuasi Arus Gardu Shinkansen',
        setting: 'Pusat Komando Tanggap Darurat Shinkansen, pukul 21.00',
        narrative: 'Layar monitor berkedip kuning menunjukkan lonjakan temperatur transformator daya fase 3.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: 'ブディさん、第３【だいさん】変電【へんでん】所【じょ】の 温度【おんど】上昇【じょうしょう】を 放置【ほうち】すれば、大規模【だいきぼ】な 停電【ていでん】事故【じこ】に つながりかねませんよ！',
        furigana: 'ブディさん、第３変電所の 温度上昇を 放置すれば、大規模な 停電事故に つながりかねませんよ！',
        romaji: 'Budi-san, daisan hendensho no ondo joushou o houchi sureba, daikibona teiden jiko ni tsunagarikanemasen yo!',
        idText: 'Budi, jika kenaikan temperatur gardu ketiga ini dibiarkan, ini berpotensi berujung pada kecelakaan pemadaman listrik skala besar lho!'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、山田【やまだ】さん！ 警報【けいほう】が 鳴【な】った からには、ただちに 電源【でんげん】を 予備【よび】系統【けいとう】へ 切【き】り替【か】えて 遮断【しゃだん】いたします。',
        furigana: 'はい、山田さん！ 警報が 鳴った からには、ただちに 電源を 予備系統へ 切り替えて 遮断いたします。',
        romaji: 'Hai, Yamada-san! Keihou ga natta kara ni wa, tadachi ni dengen o yobi keitou e kirikaete shadan itashimasu.',
        idText: 'Ya, Yamada-san! Karena alarm peringatan sudah berbunyi, kami akan segera mengalihkan daya ke sistem cadangan dan memutus arus!'
      },
      {
        id: 'd3',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: '頼【たよ】もしい 判断【はんだん】です。保安【ほあん】要員【よういん】を 引【ひ】き受【う】けた からには、最後【さいご】まで 乗客【じょうきゃく】の 安全【あんぜん】を 守【まも】り抜【ぬ】いてください。',
        furigana: '頼もしい 判断です。保安要員を 引き受けた からには、最後まで 乗客の 安全を 守り抜いてください。',
        romaji: 'Tayomoshii handan desu. Hoan youin o hikiuketa kara ni wa, saigo made joukyaku no anzen o mamorinuite kudasai.',
        idText: 'Keputusan yang andal. Karena sudah mengemban tugas sebagai petugas keselamatan, tolong lindungi keselamatan penumpang sampai tuntas.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 現場【げんば】の 復旧【ふっきゅう】班【はん】と 密接【みっせつ】に 連携【れんけい】し、絶対【ぜったい】に 運行【うんこう】を 守【まも】ります。',
        furigana: '承知いたしました！ 現場の 復旧班と 密接に 連携し、絶対に 運行を 守ります。',
        romaji: 'Shouchi itashimashita! Gemba no fukkyuuhan to missetsu ni renkei shi, zettai ni unkou o mamorimasu.',
        idText: 'Dimengerti! Kami akan berkoordinasi erat dengan regu pemulihan lapangan dan mutlak menjaga kelancaran operasi.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "遮断 (しゃだん)" dalam proteksi kelistrikan?',
        sentencePrompt: 'Istilah "電流【でんりゅう】の 遮断【しゃだん】" bermakna:',
        options: [
          'Pemutusan aliran arus listrik secara cepat demi keselamatan',
          'Penambahan tegangan listrik sebesar dua kali lipat',
          'Pencurian kabel tembaga di pinggir rel kereta',
          'Pembersihan jendela gerbong kereta Shinkansen'
        ],
        correctAnswer: 'Pemutusan aliran arus listrik secara cepat demi keselamatan',
        explanation: '"遮断 (しゃだん)" bermakna memutus, mengisolasi, atau menghalangi aliran sinyal/listrik/jalur.',
        diagnosticFeedback: {
          'Penambahan tegangan listrik sebesar dua kali lipat': 'Salah: Penambahan tegangan adalah 昇圧 (shouatsu).',
          'Pencurian kabel tembaga di pinggir rel kereta': 'Salah: Pencurian adalah 盗難 (tounan) atau 窃盗 (settou).',
          'Pembersihan jendela gerbong kereta Shinkansen': 'Salah: Pembersihan adalah 清掃 (seisou).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola peringatan potensi risiko bahaya fatal:',
        sentencePrompt: '過度【かど】な 睡眠【すいみん】不足【ぶそく】での 運転【うんてん】は、重大【じゅうだい】な 事故【じこ】を 起【お】こし[　　]。',
        options: [
          'かねない',
          'かねる',
          '得【え】ない',
          'ようがない'
        ],
        correctAnswer: 'かねない',
        explanation: 'V-masu + かねない menyatakan potensi bahaya buruk yang sangat mungkin terjadi jika kondisi dibiarkan (bisa berujung kecelakaan fatal).',
        diagnosticFeedback: {
          'かねる': 'Kekeliruan Makna: 〜かねる menyatakan ketidaksanggupan/penolakan santun, tidak cocok dengan kata kerja menimbulkan kecelakaan.',
          '得【え】ない': 'Kekeliruan Makna: 〜得ない menyatakan ketidakmungkinan mutlak (mustahil terjadi).',
          'ようがない': 'Kekeliruan Pola: 〜ようがない menyatakan tiada cara/metode untuk melakukan sesuatu.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Tekad Tanggung Jawab): Manakah kalimat yang menggunakan 〜からには secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜からには dengan muatan tekad yang benar:',
        options: [
          '約束【やくそく】した からには、何【なに】が あっても 最後【さいご】まで 守【まも】る べきだ。',
          '雨【あめ】が 降【ふ】った からには、傘【かさ】を 忘【わす】れました。',
          'ご飯【はん】を 食【た】べた からには、お腹【なか】が 空【す】きました。',
          '疲【つか】れた からには、昨日【きのう】 寝【ね】ました。'
        ],
        correctAnswer: '約束【やくそく】した からには、何【なに】が あっても 最後【さいご】まで 守【まも】る べきだ。',
        explanation: '〜からには mensyaratkan klausa kedua berupa tekad (〜つもりだ), kewajiban (〜べきだ), atau perintah/dorongan moral.',
        diagnosticFeedback: {
          '雨【あめ】が 降【ふ】った からには、傘【かさ】を 忘【わす】れました。': 'Kekeliruan Konsekuensi: Lupa payung adalah fakta kejadian lampau, bukan tekad tanggung jawab.',
          'ご飯【はん】を 食【た】べた からには、お腹【なか】が 空【す】きました。': 'Logika Rusak: Makan nasi berujung kenyang, bukan lapar; serta bukan komitmen moral.',
          '疲【つか】れた からには、昨日【きのう】 寝【ね】ました。': 'Kekeliruan Waktu: Tidur kemarin adalah masa lampau, tidak boleh menjadi klausa akhir 〜からには.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat peringatan risiko:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '温度【おんど】上昇【じょうしょう】を 放置【ほうち】すれば 事故【じこ】に つながりかねません',
          '事故【じこ】に つながりかねません 温度【おんど】上昇【じょうしょう】を 放置【ほうち】すれば',
          '放置【ほうち】すれば 温度【おんど】上昇【じょうしょう】を 事故【じこ】に つながりかねません',
          '温度【おんど】上昇【じょうしょう】を 事故【じこ】に つながりかねません 放置【ほうち】すれば'
        ],
        correctAnswer: '温度【おんど】上昇【じょうしょう】を 放置【ほうち】すれば 事故【じこ】に つながりかねません',
        explanation: 'Urutan baku: Objek verba syarat (温度上昇を) + verba syarat pengandaian (放置すれば) + akibat risiko bahaya (事故につながりかねません).',
        diagnosticFeedback: {
          '事故【じこ】に つながりかねません 温度【おんど】上昇【じょうしょう】を 放置【ほうち】すれば': 'Predikat di Depan: Menaruh klausa konsekuensi sebelum syarat.',
          '放置【ほうち】すれば 温度【おんど】上昇【じょうしょう】を 事故【じこ】に つながりかねません': 'Verba Memotong: Verba ditaruh sebelum objek partikel o.',
          '温度【おんど】上昇【じょうしょう】を 事故【じこ】に つながりかねません 放置【ほうち】すれば': 'Klausa Menggantung: Syarat pengandaian ditaruh di paling belakang.'
        },
        tokens: ['温度【おんど】上昇【じょうしょう】を', '放置【ほうち】すれば', '事故【じこ】に', 'つながりかねません'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Sikap Pantang Menyerah): Saat Yamada mengingatkan: 「保安要員を 引き受けた からには、最後まで 乗客の 安全を 守り抜いてください」, apa tanggapan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan dedikasi penuh:',
        options: [
          '承知【しょうち】いたしました！ 現場【げんば】の 復旧【ふっきゅう】班【はん】と 密接【みっせつ】に 連携【れんけい】し、絶対【ぜったい】に 運行【うんこう】を 守【まも】ります。',
          '給料【きゅうりょう】が 安【やす】いので、危険【きけん】な トラブルの 対応【たいおう】は 他【ほか】の 人【ひと】に 投【な】げますね。',
          '新幹線【しんかんせん】が 脱線【だっせん】しても、私【わたし】の 家【いえ】には 影響【えいきょう】ないので 帰【かえ】ります。',
          '山田【やまだ】さん、大【おお】げさですよ。たかが トランスの 温度【おんど】くらいで 騒【さわ】がないでください。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 現場【げんば】の 復旧【ふっきゅう】班【はん】と 密接【みっせつ】に 連携【れんけい】し、絶対【ぜったい】に 運行【うんこう】を 守【まも】ります。',
        explanation: 'Menunjukkan kesiapan memikul tanggung jawab keselamatan publik dengan koordinasi erat.',
        diagnosticFeedback: {
          '給料【きゅうりょう】が 安【やす】いので、危険【きけん】な トラブルの 対応【たいおう】は 他【ほか】の 人【ひと】に 投【な】げますね。': 'Pengecut & Melanggar Sumpah: Melempar tanggung jawab keselamatan darurat demi alasan uang sangat tercela.',
          '新幹線【しんかんせん】が 脱線【だっせん】しても、私【わたし】の 家【いえ】には 影響【えいきょう】ないので 帰【かえ】ります。': 'Ketiadaan Moral: Masa bodoh terhadap potensi kecelakaan kereta melanggar hukum perkeretaapian.',
          '山田【やまだ】さん、大【おお】げさですよ。たかが トランスの 温度【おんど】くらいで 騒【さわ】がないでください。': 'Mengabaikan Peringatan: Menyepelekan kenaikan suhu trafo adalah pemicu langsung ledakan gardu.'
        }
      }
    ]
  },

  'les-n2-u08-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai konsekuensi komitmen status/kontrak: 〜上は (karena secara status/aturan hukum sudah disepakati, konsekuensinya...) dan tindakan korektif darurat yang terpaksa diambil: 〜ざるを得ない.',
        canDo: 'Bisa merumuskan langkah penanganan krisis pemulihan jaringan dan mengambil tindakan intervensi darurat.',
        targetPatterns: [
          'V-plain / Nである + 上は (atas dasar status / karena sudah resmi ...)',
          'V-nai + ざるを得ない (terpaksa harus melakukan ... tiada opsi lain)'
        ],
        coreVocabSample: ['きんきゅう', 'しゅうふく', 'けいやく', 'ぎょうむ', 'そんがい', 'たいせい', 'ぼうし', 'ほしょう']
      },
      sensei_context: {
        sceneIntro: 'Ruang evaluasi tanggap darurat infrastruktur. Yamada dan Budi memeriksa perjanjian tingkat layanan (SLA) pasca pemulihan anomali arus.',
        dailyMission: 'Gunakan "keiyaku o musunda ue wa" untuk menegaskan tanggung jawab kontrak dan "shuufuku sezaru o enai" saat intervensi.',
        whyOrder: 'Pola ~ue wa menegaskan ikatan hukum formal atau komitmen etis tingkat institusional: status resmi melahirkan konsekuensi tindakan tanpa pengecualian.'
      },
      cultural_notes: {
        title: 'Tanggung Jawab Kontrak (契約上の責任) dan Komitmen Pemulihan',
        etiquette: 'Gunakan frasa "keiyaku jou no gimu to shite" saat menegaskan integritas perusahaan di hadapan regulator.',
        taboos: 'Jangan berdalih atau mencari alasan saat target SLA terancam; fokuskan seluruh energi pada perbaikan sistem.'
      },
      pronunciation_tips: {
        title: 'Ketegasan Lafal "Ue wa"',
        moraNote: 'Lafalkan "u-e-wa" dengan artikulasi tegas tanpa menyambungnya menjadi diftong cepat.',
        soundTip: 'Pada "sezaru o enai", pertahankan nada datar mantap.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜上は (Konsekuensi Status/Aturan) vs 〜上で (Setelah Menuntaskan)',
          caseScenario: 'Ingin mengatakan "setelah mengecek baru lapor" tetapi memakai ue wa.',
          pitfallWarning: '確認【かくにん】した 上【うえ】は、報告【ほうこく】します。 (Rancu)',
          rightSolution: '確認【かくにん】した 上【うえ】で、報告【ほうこく】します。 (Tepat: urutan kronologis)',
          explanation: '〜上で bermakna kronologis (setelah A baru B), sedangkan 〜上は bermakna sebab-akibat komitmen status (karena statusnya A, maka wajar wajib B).'
        },
        {
          title: 'Memakai 〜上は untuk Keinginan Santai Pribadi',
          caseScenario: 'Memakai ue wa untuk urusan hobi.',
          pitfallWarning: 'ゲームを 買【か】った 上【うえ】は、クリアしたい。 (Terlalu kaku/berlebihan)',
          rightSolution: '契約【けいやく】を 結【むす】んだ 上【うえ】は、義務【ぎむ】を 果【は】たす べきだ。 (Tepat: tanggung jawab formal)',
          explanation: 'Pola 〜上は membawa bobot hukum, norma sosial, atau status formal yang serius.'
        }
      ],
      who_and_when: {
        situational_context: 'Penyusunan jaminan mutu kontrak, mediasi klaim garansi produk, dan kepatuhan audit keandalan sistem.',
        social_relations: 'Pembicaraan formal penegasan integritas antara manajer QC dan analis mutu.',
        when_not_to_use: 'Jangan gunakan pada urusan privat non-komitmen seperti rencana liburan keluarga.'
      },
      scenario: {
        title: 'Pemulihan Integritas Layanan Daya Shinkansen',
        setting: 'Ruang Briefing Operasi Tanggap Darurat, pukul 23.30',
        narrative: 'Yamada dan Budi memverifikasi bahwa seluruh daya telah stabil 100% sebelum kereta fajar pertama berangkat.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: 'ブディさん、鉄道【てつどう】会社【がいしゃ】と 保守【ほしゅ】契約【けいやく】を 結【むす】んでいる 上【うえ】は、始発【しはつ】前【まえ】の 完全【かんぜん】修復【しゅうふく】は 絶対【ぜったい】条件【じょうけん】ですね。',
        furigana: 'ブディさん、鉄道会社と 保守契約を 結んでいる 上は、始発前の 完全修復は 絶対条件ですね。',
        romaji: 'Budi-san, tetsudou gaisha to hoshu keiyaku o musunde iru ue wa, shihatsumae no kanzen shuufuku wa zettai jouken desu ne.',
        idText: 'Budi, karena kita terikat kontrak pemeliharaan dengan perusahaan kereta api, pemulihan total sebelum kereta pertama beroperasi adalah syarat mutlak ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、山田【やまだ】さん！ 責任【せきにん】を 引【ひ】き受【う】けた 上【うえ】は、徹夜【てつや】してでも 原因【げんいん】究明【きゅうめい】と 修復【しゅうふく】を やり遂【と】げます。',
        furigana: 'はい、山田さん！ 責任を 引き受けた 上は、徹夜してでも 原因究明と 修復を やり遂げます。',
        romaji: 'Hai, Yamada-san! Sekinin o hikiuketa ue wa, tetsuya shite demo genin kyuumei to shuufuku o yaritogemasu.',
        idText: 'Ya, Yamada-san! Karena sudah memikul tanggung jawab ini, sekalipun harus begadang kami akan menuntaskan penyelidikan penyebab dan pemulihannya.'
      },
      {
        id: 'd3',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: '部品【ぶひん】の 劣化【れっか】が 見【み】つかった 以上【いじょう】、新品【しんぴん】の ユニットに 全【すべ】て 交換【こうかん】せざるを 得【え】ませんね。',
        furigana: '部品の 劣化が 見つかった 以上、新品の ユニットに 全て 交換せざるを 得ませんね。',
        romaji: 'Buhin no rekka ga mitsukatta ijou, shimpin no yunitto ni subete koukan sezaru o emasen ne.',
        idText: 'Karena degradasi komponen telah terdeteksi, tiada pilihan lain selain terpaksa mengganti semuanya dengan unit baru.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '了解【りょうかい】いたしました！ 直【ただ】ちに 倉庫【そうこ】から 純正【じゅんせい】予備【よび】パーツを 出庫【しゅっこ】し、交換【こうかん】作業【さぎょう】に 入【はい】ります。',
        furigana: '了解いたしました！ 直ちに 倉庫から 純正予備パーツを 出庫し、交換作業に 入ります。',
        romaji: 'Ryoukai itashimashita! Tadachi ni souko kara junsei yobi paatsu o shukko shi, koukan sagyou ni hairimasu.',
        idText: 'Siap dipahami! Kami akan segera mengeluarkan suku cadang cadangan resmi dari gudang dan langsung memulai pekerjaan penggantian.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "修復 (しゅうふく)" dalam pemeliharaan sarana vital?',
        sentencePrompt: 'Istilah "システム障害【しょうがい】の 修復【しゅうふく】" bermakna:',
        options: [
          'Pemulihan dan perbaikan sistem yang rusak kembali ke kondisi normal',
          'Pencoretan anggaran biaya pemeliharaan tahunan',
          'Penjualan gedung kantor cabang kepada pihak asing',
          'Pemasangan poster iklan bioskop di dinding gardu'
        ],
        correctAnswer: 'Pemulihan dan perbaikan sistem yang rusak kembali ke kondisi normal',
        explanation: '"修復 (しゅうふく)" bermakna memulihkan, memperbaiki, atau mengembalikan fungsi struktur yang rusak ke keadaan semula.',
        diagnosticFeedback: {
          'Pencoretan anggaran biaya pemeliharaan tahunan': 'Salah: Pemotongan anggaran adalah 予算削減 (yosan sakugen).',
          'Penjualan gedung kantor cabang kepada pihak asing': 'Salah: Penjualan aset adalah 資産売却 (shisan baikyaku).',
          'Pemasangan poster iklan bioskop di dinding gardu': 'Salah: Pemasangan iklan adalah 広告掲示 (koukoku keiji).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola konsekuensi status/komitmen formal:',
        sentencePrompt: 'プロの 資格【しかく】を 取得【しゅとく】した [　　]、社会【しゃかい】に 貢献【こうけん】する 義務【ぎむ】が ある。',
        options: [
          '上【うえ】は',
          'に つれて',
          'どころではなく',
          'に すぎず'
        ],
        correctAnswer: '上【うえ】は',
        explanation: '〜上は (karena secara status sudah resmi X, maka wajar wajib Y) adalah pola penegasan konsekuensi komitmen formal.',
        diagnosticFeedback: {
          'に つれて': 'Kekeliruan Pola: 〜につれて menyatakan perubahan proporsional bertahap (seiring waktu).',
          'どころではなく': 'Kekeliruan Pola: 〜どころではない menyatakan kondisi genting di mana sesuatu tidak mungkin dilakukan.',
          'に すぎず': 'Kekeliruan Makna: 〜にすぎない menyatakan batasan remeh (hanyalah sebatas).'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Konsekuensi Status): Manakah kalimat yang menggunakan 〜上は secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜上は dengan bobot makna yang benar:',
        options: [
          '計画【けいかく】を 公表【こうひょう】した 上【うえ】は、予定【よてい】通【どお】り 実行【じっこう】しなければ ならない。',
          '書類【しょるい】を 読【よ】んだ 上【うえ】は、サインを 忘【わす】れました。',
          '学校【がっこう】に 着【つ】いた 上【うえ】は、雨【あめ】が 止【や】みました。',
          '服【ふく】を 買【か】った 上【うえ】は、お金【かね】が 減【へ】りました。'
        ],
        correctAnswer: '計画【けいかく】を 公表【こうひょう】した 上【うえ】は、予定【よてい】通【どお】り 実行【じっこう】しなければ ならない。',
        explanation: 'Karena rencana sudah diumumkan ke publik (status resmi), maka wajib dilaksanakan sesuai jadwal (tanggung jawab mutlak).',
        diagnosticFeedback: {
          '書類【しょるい】を 読【よ】んだ 上【うえ】は、サインを 忘【わす】れました。': 'Kekeliruan Konsekuensi: Lupa tanda tangan adalah kelalaian, bukan konsekuensi komitmen status.',
          '学校【がっこう】に 着【つ】いた 上【うえ】は、雨【あめ】が 止【や】みました。': 'Kekeliruan Hubungan: Hujan reda adalah fenomena alam tak terkendali, bukan kewajiban etis.',
          '服【ふく】を 買【か】った 上【うえ】は、お金【かね】が 減【へ】りました。': 'Fakta Sepele: Berkurangnya uang adalah akibat transaksi kasual, tidak butuh pola berat 〜上は.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat pernyataan kepatuhan kontrak:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '契約【けいやく】を 結【むす】んでいる 上【うえ】は 完全【かんぜん】修復【しゅうふく】は 絶対【ぜったい】条件【じょうけん】です',
          '完全【かんぜん】修復【しゅうふく】は 契約【けいやく】を 結【むす】んでいる 上【うえ】は 絶対【ぜったい】条件【じょうけん】です',
          '絶対【ぜったい】条件【じょうけん】です 契約【けいやく】を 結【むす】んでいる 上【うえ】は 完全【かんぜん】修復【しゅうふく】は',
          '結【むす】んでいる 上【うえ】は 契約【けいやく】を 完全【かんぜん】修復【しゅうふく】は 絶対【ぜったい】条件【じょうけん】です'
        ],
        correctAnswer: '契約【けいやく】を 結【むす】んでいる 上【うえ】は 完全【かんぜん】修復【しゅうふく】は 絶対【ぜったい】条件【じょうけん】です',
        explanation: 'Urutan baku: Klausa syarat ikatan kontrak (契約を結んでいる上は) + subjek tindakan (完全修復は) + predikat penutup (絶対条件です).',
        diagnosticFeedback: {
          '完全【かんぜん】修復【しゅうふく】は 契約【けいやく】を 結【むす】んでいる 上【うえ】は 絶対【ぜったい】条件【じょうけん】です': 'Subjek Memotong: Subjek ditaruh di paling depan sebelum klausa syarat.',
          '絶対【ぜったい】条件【じょうけん】です 契約【けいやく】を 結【むす】んでいる 上【うえ】は 完全【かんぜん】修復【しゅうふく】は': 'Predikat Terbalik: Meletakkan predikat di awal kalimat.',
          '結【むす】んでいる 上【うえ】は 契約【けいやく】を 完全【かんぜん】修復【しゅうふく】は 絶対【ぜったい】条件【じょうけん】です': 'Kekeliruan Partikel: Verba mendahului objek partikel o.'
        },
        tokens: ['契約【けいやく】を', '結【むす】んでいる 上【うえ】は', '完全【かんぜん】修復【しゅうふく】は', '絶対【ぜったい】条件【じょうけん】です'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Kecepatan Aksi Krisis): Saat Yamada menegaskan: 「部品の 劣化が 見つかった 以上、新品の ユニットに 全て 交換せざるを 得ませんね」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan ketangkasan eksekusi:',
        options: [
          '了解【りょうかい】いたしました！ 直【ただ】ちに 倉庫【そうこ】から 純正【じゅんせい】予備【よび】パーツを 出庫【しゅっこ】し、交換【こうかん】作業【さぎょう】に 入【はい】ります。',
          '新品【しんぴん】の ユニットなんて もったいないので、壊【こわ】れた まま ガムテープで 貼【は】っておきましょう。',
          '深夜【しんや】作業【さぎょう】は 眠【ねむ】いので、明日【あした】の 昼【ひる】まで 放っておいて いいですか？',
          '交換【こうかん】なんて 私【わたし】の 指示【しじ】じゃないので、山田【やまだ】さんが 一人【ひとり】で レンチを 回【まわ】してください。'
        ],
        correctAnswer: '了解【りょうかい】いたしました！ 直【ただ】ちに 倉庫【そうこ】から 純正【じゅんせい】予備【よび】パーツを 出庫【しゅっこ】し、交換【こうかん】作業【さぎょう】に 入【はい】ります。',
        explanation: 'Menunjukkan kesigapan eksekusi SOP darurat dengan mengeluarkan komponen resmi tanpa menunda waktu.',
        diagnosticFeedback: {
          '新品【しんぴん】の ユニットなんて もったいないので、壊【こわ】れた まま ガムテープで 貼【は】っておきましょう。': 'Kelalaian K3 Ekstrem: Menambal komponen tegangan tinggi dengan selotip mengundang kebakaran fatal.',
          '深夜【しんや】作業【さぎょう】は 眠【ねむ】いので、明日【あした】の 昼【ひる】まで 放っておいて いいですか？': 'Abai & Malas: Menunda pemulihan sarana kereta api hingga siang hari melumpuhkan jutaan mobilitas warga.',
          '交換【こうかん】なんて 私【わたし】の 指示【しじ】じゃないので、山田【やまだ】さんが 一人【ひとり】で レンチを 回【まわ】してください。': 'Pembangkangan Kerja: Menolak instruksi kerja darurat supervisor.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 9: Penyesuaian Proporsional, Batasan & Fokus Utama
  // ─────────────────────────────────────────────────────────────
  'les-n2-u09-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai penyesuaian proporsional dinamis: 〜に応じて (disesuaikan dengan kebutuhan/perubahan variabel) dan penetapan poros prioritas utama: 〜を中心に (berpusat pada elemen kunci / terfokus pada).',
        canDo: 'Bisa merumuskan strategi alokasi armada kontainer berdasarkan dinamika permintaan kargo dan menentukan pelabuhan hub utama.',
        targetPatterns: [
          'N + に応じて / に応じた (disesuaikan dengan fluktuasi / proporsional terhadap)',
          'N + を中心に / を中心とする (berpusat pada ... / dengan poros utama ...)'
        ],
        coreVocabSample: ['きょてん', 'はいぶん', 'じゅよう', 'へんどう', 'こうわん', 'りゅうつう', 'たいせい', 'さいてき']
      },
      sensei_context: {
        sceneIntro: 'Ruang strategi pengadaan bahan baku manufaktur bersama tim supply chain di Osaka. Yamada (Manajer Logistik & QC) memetakan rute logistik kontainer.',
        dailyMission: 'Gunakan "ni oujite" untuk menjelaskan fleksibilitas distribusi armada dan "o chuushin ni" untuk menetapkan hub distribusi Kansai.',
        whyOrder: 'Manajemen modern membutuhkan kemampuan alokasi proporsional yang lentur (ni oujite) tanpa kehilangan fokus pada poros komando utama (o chuushin ni).'
      },
      cultural_notes: {
        title: 'Alokasi Optimal (最適配分) dan Penentuan Poros Kunci (要の確立)',
        etiquette: 'Paparkan rencana penyesuaian biaya dan armada dengan didukung data metrik yang transparan dan grafik terverifikasi.',
        taboos: 'Jangan mengubah alokasi kontainer lintas daerah tanpa konfirmasi sistematis dengan pengelola pelabuhan regional.'
      },
      pronunciation_tips: {
        title: 'Kontur Mengalir "Ni Oujite"',
        moraNote: 'Pada "ni oujite", bunyikan vokal panjang o-o dengan lembut mengalir tanpa menyentak di partikel te.',
        soundTip: 'Pada "o chuushin ni", beri artikulasi tegas pada chの間 untuk menegaskan titik tumpu utama.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜に応じて (Sesuai Permintaan) vs 〜によって (Tergantung Ragam Jenis)',
          caseScenario: 'Mengatakan bahwa jumlah kontainer disesuaikan dengan volume muatan.',
          pitfallWarning: '荷物【にもつ】の 量【りょう】に よって、トラックを 変【か】えます。 (Lebih ke ragam jenis)',
          rightSolution: '荷物【にもつ】の 量【りょう】に 応【おう】じて、トラックを 増減【ぞうげん】させます。 (Tepat: penyesuaian proporsional)',
          explanation: '〜に応じて berfokus pada penyesuaian kuantitas/skala yang proporsional dengan fluktuasi variabel (semakin banyak barang, semakin banyak truk).'
        },
        {
          title: 'Salah Partikel pada 〜を中心に',
          caseScenario: 'Memakai partikel de atau ni sebelum chuushin.',
          pitfallWarning: '大阪【おおさか】で 中心【ちゅうしん】に 配送【はいそう】する。 (Salah)',
          rightSolution: '大阪【おおさか】を 中心【ちゅうしん】に 配送【はいそう】する。 (Tepat: Nomina + を中心に)',
          explanation: 'Pola ini selalu menggunakan partikel objek を sebelum 中心に (atau を中心とする bila memodifikasi nomina).'
        }
      ],
      who_and_when: {
        situational_context: 'Penyusunan anggaran belanja korporat, rekayasa rute rantai pasok global, dan restrukturisasi organisasi.',
        social_relations: 'Diskusi perencanaan operasional antara kepala logistik regional (Yamada) dan perencana pasokan (Budi).',
        when_not_to_use: 'Jangan gunakan "ni oujite" bila tidak ada variabel yang mengalami fluktuasi (misal jika kondisi bersifat kaku konstan).'
      },
      scenario: {
        title: 'Optimasi Jaringan Kontainer Pelabuhan Osaka',
        setting: 'Pusat Logistik Nanko Osaka, pukul 13.00',
        narrative: 'Yamada dan Budi memantau lonjakan arus impor akhir tahun dan menggeser armada truk pendingin ke poros Kansai.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: 'ブディさん、年末【ねんまつ】の 貨物【かもつ】需要【じゅよう】の 変動【へんどう】に 応【おう】じて、輸送【ゆそう】トラックの 配分【はいぶん】は 調整【ちょうせい】できていますか？',
        furigana: 'ブディさん、年末の 貨物需要の 変動に 応じて、輸送トラックの 配分は 調整できていますか？',
        romaji: 'Budi-san, nemmatsu no kamotsu juyou no hendou ni oujite, yusou torakku no haibun wa chousei dekite imasu ka?',
        idText: 'Budi, disesuaikan dengan fluktuasi permintaan kargo akhir tahun, apakah alokasi truk angkut sudah bisa disesuaikan?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、山田【やまだ】さん！ 各【かく】地域【ちいき】の 荷物【にもつ】量【りょう】の 増減【ぞうげん】に 応【おう】じて、臨機応変【りんきおうへん】に ダイヤを 編成【へんせい】しております。',
        furigana: 'はい、山田さん！ 各地域の 荷物量の 増減に 応じて、臨機応変に ダイヤを 編成しております。',
        romaji: 'Hai, Yamada-san! Kaku chiiki no nimotsuryou no zougen ni oujite, rinkiouhen ni daiya o hensei shite orimasu.',
        idText: 'Ya, Yamada-san! Disesuaikan dengan naik turunnya volume muatan di masing-masing wilayah, kami menyusun jadwal secara fleksibel.'
      },
      {
        id: 'd3',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: '素晴らしいです。関西【かんさい】エリアでは、大阪【おおさか】港【こう】を 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを 強化【きょうか】していきましょう。',
        furigana: '素晴らしいです。関西エリアでは、大阪港を 中心に 物流ネットワークを 強化していきましょう。',
        romaji: 'Subarashii desu. Kansai eria dewa, Oosakakou o chuushin ni butsuryuu nettowaaku o kyouka shite ikimashou.',
        idText: 'Luar biasa. Untuk area Kansai, mari kita perkuat jaringan logistik dengan berpusat pada Pelabuhan Osaka.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 大阪【おおさか】拠点【きょてん】を 軸【じく】として、配送【はいそう】効率【こうりつ】を 最大限【さいだいげん】に 高【たか】めてまいります。',
        furigana: '承知いたしました！ 大阪拠点を 軸として、配送効率を 最大限に 高めてまいります。',
        romaji: 'Shouchi itashimashita! Oosaka kyoten o jiku to shite, haisou kouritsu o saidaigen ni takamete mairimasu.',
        idText: 'Dimengerti! Dengan poros hub Osaka sebagai poros utama, kami akan meningkatkan efisiensi pengiriman hingga taraf maksimal.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "拠点 (きょてん)" dalam rekayasa rantai pasok?',
        sentencePrompt: 'Istilah "物流【ぶつりゅう】の 拠点【きょてん】" bermakna:',
        options: [
          'Pusat pangkalan strategis yang menjadi tumpuan aktivitas operasional',
          'Tempat pemancingan ikan santai di tepi danau',
          'Toko cinderamata kecil di stasiun kereta desa',
          'Tempat parkir sepeda motor karyawan kantor'
        ],
        correctAnswer: 'Pusat pangkalan strategis yang menjadi tumpuan aktivitas operasional',
        explanation: '"拠点 (きょてん)" bermakna pusat pangkalan, hub strategis, atau titik tumpu operasional.',
        diagnosticFeedback: {
          'Tempat pemancingan ikan santai di tepi danau': 'Salah: Tempat memancing adalah 釣り堀 (tsuribori).',
          'Toko cinderamata kecil di stasiun kereta desa': 'Salah: Toko oleh-oleh adalah 土産物店 (miyagemonoten).',
          'Tempat parkir sepeda motor karyawan kantor': 'Salah: Tempat parkir sepeda adalah 駐輪場 (chuurinjou).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola yang menyatakan fokus pada poros utama:',
        sentencePrompt: '当社【とうしゃ】は アジア市場【しじょう】[　　]、グローバル展開【てんかい】を 加速【かそく】させている。',
        options: [
          'を 中心【ちゅうしん】に',
          'に 応【おう】じて',
          'に 際【さい】して',
          'に つけ'
        ],
        correctAnswer: 'を 中心【ちゅうしん】に',
        explanation: 'Nomina + を中心に menyatakan bahwa aktivitas difokuskan dan digerakkan dengan poros utama pada elemen tersebut.',
        diagnosticFeedback: {
          'に 応【おう】じて': 'Kekeliruan Pola: 〜に応じて menyatakan penyesuaian proporsional, bukan fokus poros ekspansi.',
          'に 際【さい】して': 'Kekeliruan Pola: 〜に際して menyatakan momentum waktu penting, tidak pas mendampingi pasar Asia.',
          'に つけ': 'Kekeliruan Pola: 〜につけ menyatakan setiap kali terpicu memori batin.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Penyesuaian Proporsional): Manakah kalimat yang menggunakan 〜に応じて secara tepat?',
        sentencePrompt: 'Pilihlah kalimat dengan pemakaian 〜に応じて yang paling gramatikal dan proporsional:',
        options: [
          '体力【たいりょく】や 年齢【ねんれい】に 応【おう】じて、運動【うんどう】の メニューを 変【か】える。',
          '太陽【たいよう】が 東【ひがし】から 昇【のぼ】るに 応【おう】じて、朝【あさ】に なる。',
          '友達【ともだち】に 会【あ】うに 応【おう】じて、本【ほん】を 買【か】いました。',
          '信号【しんごう】が 赤【あか】に 応【おう】じて、車【くるま】が 走【はし】る。'
        ],
        correctAnswer: '体力【たいりょく】や 年齢【ねんれい】に 応【おう】じて、運動【うんどう】の メニューを 変【か】える。',
        explanation: 'Mengubah porsi menu olahraga disesuaikan secara proporsional dengan stamina dan usia adalah penggunaan baku 〜に応じて.',
        diagnosticFeedback: {
          '太陽【たいよう】が 東【ひがし】から 昇【のぼ】るに 応【おう】じて、朝【あさ】に なる。': 'Kekeliruan Logika: Terbitnya matahari adalah kepastian alam semesta, bukan penyesuaian responsif.',
          '友達【ともだち】に 会【あ】うに 応【おう】じて、本【ほん】を 買【か】いました。': 'Ketiadaan Hubungan: Bertemu kawan dan membeli buku tidak memiliki korelasi proporsional.',
          '信号【しんごう】が 赤【あか】に 応【おう】じて、車【くるま】が 走【はし】る。': 'Bahaya Fatal: Lampu merah justru mewajibkan kendaraan berhenti, bukan berjalan.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat strategi logistik:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '大阪【おおさか】港【こう】を 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを 強化【きょうか】していきましょう',
          '物流【ぶつりゅう】ネットワークを 大阪【おおさか】港【こう】を 中心【ちゅうしん】に 強化【きょうか】していきましょう',
          '強化【きょうか】していきましょう 大阪【おおさか】港【こう】を 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを',
          '大阪【おおさか】港【こう】を 強化【きょうか】していきましょう 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを'
        ],
        correctAnswer: '大阪【おおさか】港【こう】を 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを 強化【きょうか】していきましょう',
        explanation: 'Urutan baku: Frasa poros (大阪港を中心に) + objek sasaran (物流ネットワークを) + verba ajakan (強化していきましょう).',
        diagnosticFeedback: {
          '物流【ぶつりゅう】ネットワークを 大阪【おおさか】港【こう】を 中心【ちゅうしん】に 強化【きょうか】していきましょう': 'Objek Tumpuk: Meletakkan objek sasaran sebelum frasa poros.',
          '強化【きょうか】していきましょう 大阪【おおさか】港【こう】を 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを': 'Predikat Terbalik: Meletakkan predikat di depan kalimat.',
          '大阪【おおさか】港【こう】を 強化【きょうか】していきましょう 中心【ちゅうしん】に 物流【ぶつりゅう】ネットワークを': 'Sintaksis Terbelah: Pola o chuushin ni terpotong oleh verba.'
        },
        tokens: ['大阪【おおさか】港【こう】を', '中心【ちゅうしん】に', '物流【ぶつりゅう】ネットワークを', '強化【きょうか】していきましょう'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Sinergi Rantai Pasok): Saat Yamada mengarahkan: 「関西エリアでは、大阪港を中心に 物流ネットワークを 強化していきましょう」, apa tanggapan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menegaskan kesiapan eksekusi:',
        options: [
          '承知【しょうち】いたしました！ 大阪【おおさか】拠点【きょてん】を 軸【じく】として、配送【はいそう】効率【こうりつ】を 最大限【さいだいげん】に 高【たか】めてまいります。',
          '大阪【おおさか】なんて 混【こ】んでいるので 嫌【いや】です。もっと 田舎【いなか】の 静【しず】かな 港【みなと】に 変【か】えましょう。',
          '物流【ぶつりゅう】なんて トラックの 運転手【うんてんしゅ】が 勝手【かって】に やれば いいので、私【わたし】たちは 休【やす】みましょう。',
          '山田【やまだ】さん、年末【ねんまつ】は 忙【いそが】しいので、荷物【にもつ】の 配送【はいそう】は 全部【ぜんぶ】 断【ことわ】りましょう！'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 大阪【おおさか】拠点【きょてん】を 軸【じく】として、配送【はいそう】効率【こうりつ】を 最大限【さいだいげん】に 高【たか】めてまいります。',
        explanation: 'Menegaskan komitmen mengoptimalkan efisiensi operasional dengan Osaka sebagai poros utama logistik.',
        diagnosticFeedback: {
          '大阪【おおさか】なんて 混【こ】んでいるので 嫌【いや】です。もっと 田舎【いなか】の 静【しず】かな 港【みなと】に 変【か】えましょう。': 'Menghindari Kenyataan: Pelabuhan besar ramai karena volume ekonomi, bukan alasan untuk lari ke pelabuhan kecil yang tidak memadai.',
          '物流【ぶつりゅう】なんて トラックの 運転手【うんてんしゅ】が 勝手【かって】に やれば いいので、私【わたし】たちは 休【やす】みましょう。': 'Meremehkan Manajemen: Rantai pasok membutuhkan koordinasi dispatched yang ketat, bukan dibiarkan tanpa arah.',
          '山田【やまだ】さん、年末【ねんまつ】は 忙【いそが】しいので、荷物【にもつ】の 配送【はいそう】は 全部【ぜんぶ】 断【ことわ】りましょう！': 'Menghancurkan Bisnis: Menolak pengiriman di masa puncak akhir tahun melanggar komitmen bisnis logistik.'
        }
      }
    ]
  },

  'les-n2-u09-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai penegasan realitas objektif yang terbatas: 〜にすぎない (hanyalah sebatas / tidak lebih dari sekadar...) dan penolakan kondisi santai di tengah krisis: 〜どころではない (bukan saatnya santai / situasi jauh dari memungkinkan).',
        canDo: 'Bisa meredam kepanikan dengan memaparkan data objektif serta menetapkan prioritas pemulihan kemacetan gudang kargo.',
        targetPatterns: [
          'V-plain / N + にすぎない (hanyalah ... / tidak lebih dari sekadar ...)',
          'V-plain / N + どころではない (bukan saatnya ... / jangankan ..., situasi sama sekali tidak memungkinkan)'
        ],
        coreVocabSample: ['ひっぱく', 'ゆうせん', 'いちじてき', 'こんざつ', 'かいしょう', 'たいおう', 'せいきじょう', 'ほかん']
      },
      sensei_context: {
        sceneIntro: 'Ruang kendali pergudangan kargo pelabuhan Osaka saat penumpukan peti kemas akibat keterlambatan kapal feri kargo internasional.',
        dailyMission: 'Gunakan "ichijitekina konzatsu ni suginai" untuk menenangkan tim dan "kyuukei dokoro dewa nai" untuk memobilisasi regu lembur.',
        whyOrder: 'Di level N2, profesional harus mampu membedakan anomali sementara (ni suginai) dari krisis struktural serta mengalihkan energi secara disiplin saat kondisi darurat (dokoro dewa nai).'
      },
      cultural_notes: {
        title: 'Ketenangan Rasional (冷静な客観視) dan Mobilisasi Prioritas (非常時の結束)',
        etiquette: 'Menyampaikan bahwa anomali "hanyalah bersifat sementara" mencegah kepanikan massal di lantai gudang.',
        taboos: 'Hindari bersantai atau merokok di saat rekan-rekan gudang sedang berjibaku mengurai kemacetan peti kemas.'
      },
      pronunciation_tips: {
        title: 'Intonasi Pembatasan "Ni Suginai"',
        moraNote: 'Pada "ni suginai", lafalkan su-gi-na-i dengan tempo tenang untuk mempertegas batas wajar fenomena.',
        soundTip: 'Pada "dokoro dewa nai", beri aksen tegas pada do-ko-ro untuk menandai kemustahilan bersantai.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜にすぎない (Hanyalah Sebatas) vs 〜にほかならない (Tiada Lain Hanyalah Bukti Mutlak)',
          caseScenario: 'Ingin mengatakan bahwa keterlambatan ini hanyalah insiden kecil.',
          pitfallWarning: 'これ、重大【じゅうだい】な 失敗【しっぱい】に ほかならない。 (Artinya malah menegaskan kegagalan fatal mutlak)',
          rightSolution: '一時的【いちじてき】な 遅【おく】れに すぎない。 (Tepat: hanyalah keterlambatan sementara)',
          explanation: '〜にすぎない mengecilkan derajat (hanya sebatas hal kecil), sedangkan 〜にほかならない membesarkan derajat (tiada lain hanyalah bukti mutlak dari hal tersebut).'
        },
        {
          title: 'Memakai 〜どころではない untuk Hal-Hal yang Memungkinkan',
          caseScenario: 'Memakai dokoro dewa nai untuk situasi yang sangat santai.',
          pitfallWarning: '暇【ひま】すぎて、休【やす】む どころではない。 (Salah)',
          rightSolution: '忙【いそが】しすぎて、休【やす】む どころではない。 (Tepat: saking sibuknya sampai tidak mungkin istirahat)',
          explanation: '〜どころではない mensyaratkan kondisi yang sangat ekstrem/genting sehingga tindakan santai di klausa pertama menjadi mustahil dilakukan.'
        }
      ],
      who_and_when: {
        situational_context: 'Penyelesaian kemacetan rantai pasok, penanganan komplain keterlambatan kargo, dan perumusan skala prioritas krisis.',
        social_relations: 'Koordinasi taktis cepat antara supervisor lapangan (Yamada) dan koordinator logistik (Budi).',
        when_not_to_use: 'Jangan gunakan "ni suginai" bila kerugian yang terjadi terbukti merupakan bencana sistemik besar.'
      },
      scenario: {
        title: 'Penanganan Kemacetan Peti Kemas Osaka Nanko',
        setting: 'Menara Pengawas Yard Kontainer Nanko, pukul 17.30',
        narrative: 'Yamada dan Budi mengurai antrean truk kontainer yang memadati pintu gerbang dermaga.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: 'ブディさん、ゲート前【まえ】の トラックの 混雑【こんざつ】が 激【はげ】しいですが、パニックに なる 必要【ひつよう】は ありませんよ。',
        furigana: 'ブディさん、ゲート前の トラックの 混雑が 激しいですが、パニックに なる 必要は ありませんよ。',
        romaji: 'Budi-san, geetomae no torakku no konzatsu ga hageshii desu ga, panikku ni naru hitsuyou wa arimasen yo.',
        idText: 'Budi, antrean truk di depan gerbang memang padat, tetapi tidak ada kebutuhan untuk panik ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、山田【やまだ】さん！ システムの データ上【じょう】も、今回【こんかい】の 滞着【たいちゃく】は 一時的【いちじてき】な 集中【しゅうちゅう】に すぎません。',
        furigana: 'はい、山田さん！ システムの データ上も、今回の 滞着は 一時的な 集中に すぎません。',
        romaji: 'Hai, Yamada-san! Shisutemu no deetajou mo, konkai no taichaku wa ichijitekina shuuchuu ni sugimasen.',
        idText: 'Ya, Yamada-san! Berdasarkan data sistem pun, penumpukan saat ini hanyalah sebatas lonjakan sementara, tidak lebih.'
      },
      {
        id: 'd3',
        speaker: 'Yamada',
        speakerRole: 'Manajer Logistik & QC',
        avatar: '👷‍♂️',
        jp: 'その 通【とお】りです。しかし、今夜【こんや】は のんびり 休【やす】んでいる どころでは ありませんから、全力【ぜんりょく】で 荷受【にう】けを 進【すす】めましょう。',
        furigana: 'その 通りです。しかし、今夜は のんびり 休んでいる どころでは ありませんから、全力で 荷受けを 進めましょう。',
        romaji: 'Sono toori desu. Shikashi, konya wa nonbiri yasunde iru dokoro dewa arimasen kara, zenryoku de niuke o susumemashou.',
        idText: 'Tepat sekali. Namun, malam ini bukanlah saatnya santai beristirahat, jadi mari kita lanjutkan penerimaan muatan sekuat tenaga.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 冷凍【れいとう】貨物【かもつ】を 最優先【さいゆうせん】に 処理【しょり】し、１時間【いちじかん】以内【いない】に 混雑【こんざつ】を 解消【かいしょう】させます。',
        furigana: '承知いたしました！ 冷凍貨物を 最優先に 処理し、１時間以内に 混雑を 解消させます。',
        romaji: 'Shouchi itashimashita! Reitou kamotsu o saiyuusen ni shori shi, ichijikan inai ni konzatsu o kaishou sasemasu.',
        idText: 'Dimengerti! Kami akan memproses kargo beku dengan prioritas tertinggi dan mengurai kemacetan dalam waktu kurang dari satu jam.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "逼迫 (ひっぱく)" dalam manajemen persediaan barang?',
        sentencePrompt: 'Istilah "倉庫【そうこ】容量【ようりょう】の 逼迫【ひっぱく】" bermakna:',
        options: [
          'Kondisi genting dan sangat terbatasnya kapasitas ruang simpan gudang',
          'Pembongkaran atap gudang untuk renovasi arsitektur',
          'Penurunan harga sewa gudang sebesar 90 persen',
          'Perayaan pesta kelulusan karyawan pergudangan'
        ],
        correctAnswer: 'Kondisi genting dan sangat terbatasnya kapasitas ruang simpan gudang',
        explanation: '"逼迫 (ひっぱく)" bermakna kondisi sangat tertekan, kritis, atau gentingnya persediaan/kapasitas.',
        diagnosticFeedback: {
          'Pembongkaran atap gudang untuk renovasi arsitektur': 'Salah: Pembongkaran adalah 解体 (kaitai).',
          'Penurunan harga sewa gudang sebesar 90 persen': 'Salah: Penurunan harga adalah 値下げ (nesage) atau 暴落 (bouraku).',
          'Perayaan pesta kelulusan karyawan pergudangan': 'Salah: Pesta adalah 祝賀会 (shukugakai).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola penolakan kondisi santai di tengah kesibukan ekstrem:',
        sentencePrompt: '納期【のうき】が 明日【あした】に 迫【せま】っており、今夜【こんや】は 寝【ね】る [　　]。',
        options: [
          'どころではない',
          'にすぎない',
          'に相違ない',
          'ものがある'
        ],
        correctAnswer: 'どころではない',
        explanation: 'V-dict + どころではない menyatakan situasi genting di mana melakukan tindakan tersebut (tidur) sama sekali mustahil.',
        diagnosticFeedback: {
          'にすぎない': 'Kekeliruan Makna: 〜にすぎない menyatakan hal remeh sebatas, tidak pas mendampingi tenggat waktu mendesak besok.',
          'に相違ない': 'Kekeliruan Pola: 〜に相違ない menyatakan kepastian analisis, tidak pas untuk kemustahilan bersantai.',
          'ものがある': 'Kekeliruan Nuansa: 〜ものがある menyatakan kesan emosi estetis yang mendalam.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Pembatasan Objektif): Manakah kalimat yang menggunakan 〜にすぎない secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜にすぎない dengan pembatasan derajat yang benar:',
        options: [
          'これらは まだ 初期【しょき】の 仮説【かせつ】に すぎず、さらなる 検証【けんしょう】が 必要【ひつよう】だ。',
          '彼【かれ】は 社長【しゃちょう】に すぎないから、全権【ぜんけん】を 握【にぎ】っている。',
          '富士山【ふじさん】は 日本一【にっぽんいち】の 高【たか】い 山【やま】に すぎない。',
          '地球【ちきゅう】は 宇宙【うちゅう】の 全【すべ】てに すぎない。'
        ],
        correctAnswer: 'これらは まだ 初期【しょき】の 仮説【かせつ】に すぎず、さらなる 検証【けんしょう】が 必要【ひつよう】だ。',
        explanation: 'Menyatakan bahwa data saat ini hanyalah sebatas hipotesis awal (tidak lebih dari itu) dan memerlukan pembuktian lanjutan.',
        diagnosticFeedback: {
          '彼【かれ】は 社長【しゃちょう】に すぎないから、全権【ぜんけん】を 握【にぎ】っている。': 'Logika Kontradiktif: Memegang kekuasaan penuh bertentangan dengan kata "hanya sebatas presiden direktur".',
          '富士山【ふじさん】は 日本一【にっぽんいち】の 高【たか】い 山【やま】に すぎない。': 'Kontradiksi Derajat: Puncak tertinggi di Jepang bukanlah hal kecil yang diremehkan dengan 〜にすぎない.',
          '地球【ちきゅう】は 宇宙【うちゅう】の 全【すべ】てに すぎない。': 'Kekeliruan Fakta: Bumi bukan seluruh alam semesta, penggunaan suginai di sini rancu.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penegasan skala prioritas:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '今夜【こんや】は のんびり 休【やす】んでいる どころでは ありません',
          'どころでは ありません 今夜【こんや】は のんびり 休【やす】んでいる',
          '休【やす】んでいる 今夜【こんや】は のんびり どころでは ありません',
          '今夜【こんや】は どころでは ありません のんびり 休【やす】んでいる'
        ],
        correctAnswer: '今夜【こんや】は のんびり 休【やす】んでいる どころでは ありません',
        explanation: 'Urutan baku: Waktu topik (今夜は) + adverbia santai (のんびり) + verba bersantai (休んでいる) + penutup kemustahilan (どころではありません).',
        diagnosticFeedback: {
          'どころでは ありません 今夜【こんや】は のんびり 休【やす】んでいる': 'Predikat Terbalik: Meletakkan predikat kemustahilan di awal kalimat.',
          '休【やす】んでいる 今夜【こんや】は のんびり どころでは ありません': 'Urutan Teracak: Verba ditaruh sebelum waktu penjelas.',
          '今夜【こんや】は どころでは ありません のんびり 休【やす】んでいる': 'Sintaksis Terputus: Penutup ditaruh membelah frasa santai.'
        },
        tokens: ['今夜【こんや】は', 'のんびり', '休【やす】んでいる', 'どころでは ありません'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Fokus Penguraian Antrean): Saat Yamada mengingatkan: 「今夜は のんびり 休んでいる どころではありませんから、全力で 荷受けを 進めましょう」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang mengutamakan penyelesaian krisis muatan:',
        options: [
          '承知【しょうち】いたしました！ 冷凍【れいとう】貨物【かもつ】を 最優先【さいゆうせん】に 処理【しょり】し、１時間【いちじかん】以内【いない】に 混雑【こんざつ】を 解消【かいしょう】させます。',
          'トラックの 運転手【うんてんしゅ】が うるさいので、ゲートを 閉【し】めて 全員【ぜんいん】 追【お】い返【かえ】しましょう。',
          '冷凍【れいとう】マグロなんて 溶【と】けても 知【し】りません。私【わたし】は ゲームの イベントが あるので 帰【かえ】ります。',
          '山田【やまだ】さん、私【わたし】に ばかり 働【はたら】かせないで、自分【じぶん】で コンテナを 運【はこ】んでください。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 冷凍【れいとう】貨物【かもつ】を 最優先【さいゆうせん】に 処理【しょり】し、１時間【いちじかん】以内【いない】に 混雑【こんざつ】を 解消【かいしょう】させます。',
        explanation: 'Mengidentifikasi kargo kritis (muatan beku) dan menetapkan target waktu penyelesaian yang terukur.',
        diagnosticFeedback: {
          'トラックの 運転手【うんてんしゅ】が うるさいので、ゲートを 閉【し】めて 全員【ぜんいん】 追【お】い返【かえ】しましょう。': 'Merusak Operasi: Mengusir truk pengangkut memicu kemarahan pelanggan dan memutus rantai pasok.',
          '冷凍【れいとう】マグロなんて 溶【と】けても 知【し】りません。私【わたし】は ゲームの イベントが あるので 帰【かえ】ります。': 'Kerugian Milyaran: Membiarkan kargo beku mencair merusak ratusan juta yen aset pangan pelanggan.',
          '山田【やまだ】さん、私【わたし】に ばかり 働【はたら】かせないで、自分【じぶん】で コンテナを 運【はこ】んでください。': 'Menolak Kerja Sama: Mengeluh dan membangkang arahan supervisor di saat krisis gudang.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 10: Kriteria Penilaian, Standar Legal & Penolakan Halus
  // ─────────────────────────────────────────────────────────────
  'les-n2-u10-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai tolok ukur kepatuhan legal: 〜に照らして (berdasarkan rujukan undang-undang/prinsip etika) dan penolakan diplomatis bernuansa Keigo tinggi: 〜かねる / 〜かねます (sulit bagi kami untuk memenuhinya / dengan berat hati kami tolak).',
        canDo: 'Bisa menelaah klausul draf perjanjian bisnis bilateral dan menolak permintaan klausul sepihak secara santun dan tegas.',
        targetPatterns: [
          'N + に照らして / に照らすと (merujuk pada norma hukum / berdasarkan tolok ukur)',
          'V-masu + かねる / かねます (sulit untuk ... / dengan berat hati kami tolak secara santun)'
        ],
        coreVocabSample: ['けいやく', 'じょうこう', 'ほうりつ', 'きはん', 'じたい', 'ていけい', 'きょうぎ', 'けんしゅう']
      },
      sensei_context: {
        sceneIntro: 'Departemen legalitas dan kepatuhan kontrak korporat di Marunouchi, Tokyo. Sato (Direktur Kemitraan Korporat) menelaah draf perjanjian kerja sama internasional bersama Budi.',
        dailyMission: 'Gunakan "hourei ni terashite" untuk menguji legalitas klausul dan gunakan "oujikanemasu" untuk menolak klausul eksklusif yang merugikan.',
        whyOrder: 'Kemampuan bernegosiasi tingkat N2 mensyaratkan keterampilan menolak secara diplomatis (kanemasu) tanpa merusak hubungan kerja sama bilateral.'
      },
      cultural_notes: {
        title: 'Penolakan Santun Bisnis (ビジネスにおける断りの美学) dan Acuan Legal',
        etiquette: 'Menolak dengan "itashikanemasu" mencerminkan rasa hormat dan empati bahwa secara subjektif kita ingin membantu, namun secara objektif sistem tidak mengizinkan.',
        taboos: 'Jangan pernah mengatakan "dekimasen" atau "dame desu" secara frontal dalam negosiasi kontrak resmi bilateral.'
      },
      pronunciation_tips: {
        title: 'Kelembutan Vokal Penolakan Diplomatis',
        moraNote: 'Lafalkan "ka-ne-ma-su" dengan nada datar lembut menurun untuk mengisyaratkan rasa penyesalan profesional.',
        soundTip: 'Pada "ni terashite", jaga kejelasan mora te-ra-shi-te.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜かねる (Penolakan Halus) vs 〜できない (Ketidakmampuan Kemampuan)',
          caseScenario: 'Menggunakan kaneru untuk ketidakmampuan fisik.',
          pitfallWarning: '私【わたし】は ピアノが 弾【ひ】きかねます。 (Salah)',
          rightSolution: '私【わたし】は ピアノが 弾【ひ】けません。 (Tepat: potensi diri)',
          explanation: '〜かねる khusus digunakan untuk penolakan atas dasar pertimbangan etika, hukum, wewenang, atau kebijakan korporat, bukan kemahiran bakat fisik.'
        },
        {
          title: 'Memakai Kata Kerja Negatif Sebelum 〜かねる',
          caseScenario: 'Memasukkan bentuk nai sebelum kaneru.',
          pitfallWarning: 'ご案内【あんない】しないかねます。 (Salah)',
          rightSolution: 'ご案内【あんない】いたしかねます。 (Tepat: V-masu stem)',
          explanation: 'Verba sebelum かねる selalu berbentuk Masu-stem positif (itashikanemasu).'
        }
      ],
      who_and_when: {
        situational_context: 'Pemeriksaan kontrak komersial, negosiasi klausul ganti rugi, penolakan permintaan diskon berlebih, dan kepatuhan hukum.',
        social_relations: 'Interaksi kemitraan eksekutif antara Direktur Kemitraan (Sato) dan analis legal junior (Budi).',
        when_not_to_use: 'Jangan gunakan pada permohonan santai antar kawan akrab di luar urusan pekerjaan.'
      },
      scenario: {
        title: 'Negosiasi Kontrak Kemitraan Bilateral Marunouchi',
        setting: 'Ruang Rapat Eksekutif Gedung Marunouchi Lantai 28, pukul 14.00',
        narrative: 'Sato dan Budi meneliti draf addendum kontrak dari konsorsium mitra asing.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: 'ブディさん、相手方【あいてがた】から 提示【ていじ】された 秘密【ひみつ】保持【ほじ】の 特約【とくやく】ですが、法【ほう】の 精神【せいしん】に 照【て】らして 問題【もんだい】は ありませんか？',
        furigana: 'ブディさん、相手方から 提示された 秘密保持の 特約ですが、法の 精神に 照らして 問題は ありませんか？',
        romaji: 'Budi-san, aitegata kara teiji sareta himitsu hoji no tokuyaku desu ga, hou no seishin ni terashite mondai wa arimasen ka?',
        idText: 'Budi, klausul khusus kerahasiaan yang diajukan oleh pihak mitra, apakah tidak ada masalah bila dirujuk pada semangat hukum?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、佐藤【さとう】部長【ぶちょう】。国際【こくさい】法【ほう】の 規範【きはん】に 照【て】らしますと、一部【いちぶ】の 賠償【ばいしょう】範囲【はんい】が 過大【かだい】であると 判断【はんだん】されます。',
        furigana: 'はい、佐藤部長。国際法の 規範に 照らしますと、一部の 賠償範囲が 過大であると 判断されます。',
        romaji: 'Hai, Satou-buchou. Kokusaihou no kihan ni terashimasu to, ichibu no baishou han-i ga kadai de aru to handan saremasu.',
        idText: 'Ya, Direktur Sato. Apabila dirujuk pada norma hukum internasional, dinilai bahwa sebagian cakupan ganti rugi terlalu berlebihan.'
      },
      {
        id: 'd3',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: '的確【てきかく】な 指摘【してき】です。一方的【いっぽうてき】な 義務【ぎむ】を 課【か】す 条項【じょうこう】には、当社【とうしゃ】として 同意【どうい】いたしかねますね。',
        furigana: '的確な 指摘です。一方的な 義務を 課す 条項には、当社として 同意いたしかねますね。',
        romaji: 'Tekikakuna shiteki desu. Ippoutekina gimu o kasu joukou ni wa, tousha to shite doui itashikanemasu ne.',
        idText: 'Ulasan yang sangat tepat sasaran. Terhadap klausul yang membebankan kewajiban sepihak, dari pihak perusahaan kami dengan berat hati sulit untuk menyetujuinya ya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'かしこまりました。角【かど】を 立【た】てずに 辞退【じたい】の 意【い】を 伝【つた】え、修正【しゅうせい】条項【じょうこう】を 提案【ていあん】いたします。',
        furigana: 'かしこまりました。角を 立てずに 辞退の 意を 伝え、修正条項を 提案いたします。',
        romaji: 'Kashikomarimashita. Kado o tatezu ni jitai no i o tsutae, shuusei joukou o teian itashimasu.',
        idText: 'Dimengerti. Tanpa menimbulkan ketegangan/konfrontasi, saya akan menyampaikan penolakan santun dan mengusulkan klausul revisi.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "条項 (じょうこう)" dalam telaah hukum kontrak?',
        sentencePrompt: 'Istilah "契約【けいやく】の 個別【こべつ】条項【じょうこう】" bermakna:',
        options: [
          'Klausul atau butir pasal tertentu dalam dokumen perjanjian legal',
          'Tanda tangan basah di atas meterai tempel',
          'Daftar nomor telepon pribadi para direksi',
          'Biaya sewa ruang rapat gedung pertemuan'
        ],
        correctAnswer: 'Klausul atau butir pasal tertentu dalam dokumen perjanjian legal',
        explanation: '"条項 (じょうこう)" bermakna butir pasal, klausul tertulis, atau artikel dalam naskah hukum/kontrak.',
        diagnosticFeedback: {
          'Tanda tangan basah di atas meterai tempel': 'Salah: Tanda tangan adalah 署名 (shomei) atau 捺印 (natsu-in).',
          'Daftar nomor telepon pribadi para direksi': 'Salah: Buku telepon adalah 連絡先名簿 (renrakusaki meibo).',
          'Biaya sewa ruang rapat gedung pertemuan': 'Salah: Biaya sewa ruangan adalah 会議室使用料 (kaigishitsu shiyouryou).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola penolakan santun bernuansa bisnis formal:',
        sentencePrompt: '社内【しゃない】の 規定【きてい】により、お客様【きゃくさま】の ご要望【ようぼう】には 応【おう】じ[　　]。',
        options: [
          'かねます',
          'かねません',
          'すぎません',
          'ざるを 得【え】ません'
        ],
        correctAnswer: 'かねます',
        explanation: 'V-masu + かねます adalah bentuk penolakan diplomatis paling sopan dalam bisnis Jepang (dengan berat hati kami sulit untuk memenuhinya).',
        diagnosticFeedback: {
          'かねません': 'Kekeliruan Fatal: 〜かねません bermakna berpotensi mendatangkan bencana/risiko, berlawanan total dengan penolakan.',
          'すぎません': 'Kekeliruan Makna: 〜にすぎません bermakna hanyalah sebatas, tidak pas untuk kalimat penolakan.',
          'ざるを 得【え】ません': 'Kekeliruan Makna: 〜ざるを得ません bermakna terpaksa harus memenuhi, bertentangan dengan menolak.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Rujukan Legalitas): Manakah kalimat yang menggunakan 〜に照らして secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜に照らして dengan makna rujukan tolok ukur yang benar:',
        options: [
          '過去【かこ】の 判例【はんれい】に 照【て】らして、妥当【だとう】な 賠償【ばいしょう】額【がく】を 算出【さんしゅつ】する。',
          '懐中【かいちゅう】電灯【でんとう】に 照【て】らして、夜道【よみち】を 歩【ある】く。',
          '鏡【かがみ】に 照【て】らして、髪【かみ】を 整【ととの】える。',
          '太陽【たいよう】に 照【て】らして、洗濯【せんたく】物【もの】を 干【ほ】す。'
        ],
        correctAnswer: '過去【かこ】の 判例【はんれい】に 照【て】らして、妥当【だとう】な 賠償【ばいしょう】額【がく】を 算出【さんしゅつ】する。',
        explanation: '〜に照らして digunakan dalam arti kiasan abstrak: merujuk pada standar aturan, hukum, atau preseden peradilan.',
        diagnosticFeedback: {
          '懐中【かいちゅう】電灯【でんとう】に 照【て】らして、夜道【よみち】を 歩【ある】く。': 'Arti Harfiah: Menyinari secara fisik dengan senter menggunakan 照らす biasa, bukan konstruksi gramatikal abstrak N2.',
          '鏡【かがみ】に 照【て】らして、髪【かみ】を 整【ととの】える。': 'Kekeliruan Verba: Menatap cermin adalah 鏡に映して (utsushite).',
          '太陽【たいよう】に 照【て】らして、洗濯【せんたく】物【もの】を 干【ほ】す。': 'Arti Harfiah: Disinari matahari adalah 日に当てて (hi ni atete).'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penolakan klausul yang elegan:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '一方的【いっぽうてき】な 条項【じょうこう】には 同意【どうい】いたしかねます',
          '同意【どうい】いたしかねます 一方的【いっぽうてき】な 条項【じょうこう】には',
          '条項【じょうこう】には 一方的【いっぽうてき】な 同意【どうい】いたしかねます',
          '同意【どうい】いたしかねます 条項【じょうこう】には 一方的【いっぽうてき】な'
        ],
        correctAnswer: '一方的【いっぽうてき】な 条項【じょうこう】には 同意【どうい】いたしかねます',
        explanation: 'Urutan baku: Modifikasi sifat (一方的な) + objek sasaran (条項には) + verba penolakan santun (同意いたしかねます).',
        diagnosticFeedback: {
          '同意【どうい】いたしかねます 一方的【いっぽうてき】な 条項【じょうこう】には': 'Predikat di Depan: Meletakkan predikat di awal sebelum objek.',
          '条項【じょうこう】には 一方的【いっぽうてき】な 同意【どうい】いたしかねます': 'Modifikasi Terpisah: Kata sifat ippouteki na ditaruh setelah objek yang diterangkannya.',
          '同意【どうい】いたしかねます 条項【じょうこう】には 一方的【いっぽうてき】な': 'Susunan Acak: Menempatkan kata sifat menggantung di akhir.'
        },
        tokens: ['一方的【いっぽうてき】な', '条項【じょうこう】には', '同意【どうい】', 'いたしかねます'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Diplomasi Tanpa Konflik): Saat Sato menyatakan: 「一方的な 義務を 課す 条項には、当社として 同意いたしかねますね」, apa tindakan diplomatis terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang mengedepankan solusi win-win tanpa memicu konfrontasi:',
        options: [
          'かしこまりました。角【かど】を 立【た】てずに 辞退【じたい】の 意【い】を 伝【つた】え、修正【しゅうせい】条項【じょうこう】を 提案【ていあん】いたします。',
          '相手【あいて】の 会社【かいしゃ】に 怒鳴【どな】り込【こ】んで、契約書【けいやくしょ】を ビリビリに 破【やぶ】り捨【す】てましょう！',
          '佐藤【さとう】部長【ぶちょう】、相手【あいて】の 言【い】う 通【とお】りに 全【すべ】て サインして 終【お】わりに しましょうよ。',
          '法律【ほうりつ】なんて どうでもいいので、裁判【さいばん】沙汰【ざた】に なったら 逃【に】げれば 大丈夫【だいじょうぶ】です。'
        ],
        correctAnswer: 'かしこまりました。角【かど】を 立【た】てずに 辞退【じたい】の 意【い】を 伝【つた】え、修正【しゅうせい】条項【じょうこう】を 提案【ていあん】いたします。',
        explanation: 'Menolak secara beretika tanpa menyakiti martabat mitra (Kado o tatezu ni) dan menawarkan klausul alternatif konstruktif.',
        diagnosticFeedback: {
          '相手【あいて】の 会社【かいしゃ】に 怒鳴【どな】り込【こ】んで、契約書【けいやくしょ】を ビリビリに 破【やぶ】り捨【す】てましょう！': 'Agresi Liar: Memaki dan merobek kontrak melanggar hukum dan memicu tuntutan pidana.',
          '佐藤【さとう】部長【ぶちょう】、相手【あいて】の 言【い】う 通【とお】りに 全【すべ】て サインして 終【お】わりに しましょうよ。': 'Menyerah Total: Menandatangani klausul berat sebelah merugikan finansial korporat secara permanen.',
          '法律【ほうりつ】なんて どうでもいいので、裁判【さいばん】沙汰【ざた】に なったら 逃【に】げれば 大丈夫【だいじょうぶ】です。': 'Ilegal & Buron: Menghindar dari gugatan hukum mencerminkan ketidakjujuran moral.'
        }
      }
    ]
  },

  'les-n2-u10-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai ekspresi desakan batin yang mendesak: 〜てたまらない (sangat khawatir hingga tidak tenang) dan evaluasi pembatasan legal: 〜に過ぎない (tidak lebih dari sekadar klausul rujukan awal).',
        canDo: 'Bisa mengutarakan kekhawatiran atas potensi kebocoran rahasia dagang dan membatasi tanggung jawab hukum dalam batasan yang wajar.',
        targetPatterns: [
          'V-te / A-kute / Na-de + たまらない (sangat ... tak tertahankan secara subjektif)',
          'N + に過ぎない (tidak lebih dari sekadar ... / sebatas ...)'
        ],
        coreVocabSample: ['きみつ', 'げんしゅ', 'ろうえい', 'ばいしょう', 'ふあん', 'ぎむ', 'ほしょう', 'ばくたい']
      },
      sensei_context: {
        sceneIntro: 'Ruang konsultasi legal Marunouchi. Sato dan Budi membedah klausul denda pelanggaran kerahasiaan informasi teknologi paten.',
        dailyMission: 'Gunakan "shimpai de tamaranai" untuk mengungkapkan urgensi perlindungan data paten dan "sankou ni suginai" untuk menegaskan batasan dokumen awal.',
        whyOrder: 'Pola ~te tamaranai mencerminkan kekhawatiran subjektif yang mendesak, yang harus diimbangi dengan ketenangan rasional menempatkan dokumen pada porsi batas hukumnya (~ni suginai).'
      },
      cultural_notes: {
        title: 'Kerahasiaan Dagang (営業秘密の厳守) dan Ketenangan Hukum',
        etiquette: 'Menjaga kerahasiaan paten adalah fondasi kelangsungan hidup korporasi teknologi. Kehati-hatian adalah keutamaan tertinggi.',
        taboos: 'Jangan pernah membocorkan lampiran teknis proyek kepada pihak ketiga tanpa dokumen NDA (Non-Disclosure Agreement) yang sah.'
      },
      pronunciation_tips: {
        title: 'Desakan Emosi "Te Tamaranai"',
        moraNote: 'Lafalkan "ta-ma-ra-na-i" dengan ritme lancar tanpa memotong mora.',
        soundTip: 'Pada "ni suginai", pertahankan intonasi dingin objektif.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜てたまらない (Subjektif Mendesak) vs 〜てならない (Spontanitas Batin Alamiah)',
          caseScenario: 'Mengungkapkan rasa cemas mendesak yang membuat tidak bisa tidur.',
          pitfallWarning: '心配【しんぱい】で ならないから、今すぐ 走【はし】り出【だ】したい。 (Kurang pas nuansa mendesaknya)',
          rightSolution: '心配【しんぱい】で たまらない。 (Tepat: desakan subjektif mendesak)',
          explanation: '〜てたまらない mencerminkan rasa gundah subjektif yang mendesak dan sulit ditahan secara emosi maupun fisik.'
        },
        {
          title: 'Menggunakan 〜に過ぎない untuk Prestasi Gemilang yang Patut Diapresiasi',
          caseScenario: 'Meremehkan keberhasilan besar tim sendiri.',
          pitfallWarning: '全社【ぜんしゃ】の 優勝【ゆうしょう】は、小【ちい】さな 運【うん】に すぎない。 (Menghancurkan moral tim)',
          rightSolution: '一里塚【いちりづか】に すぎない。 (Tepat: metafora batu loncatan menuju target lebih tinggi)',
          explanation: 'Hati-hati dalam menggunakan 〜にすぎない agar tidak terkesan merendahkan jerih payah rekan kerja secara tidak pantas.'
        }
      ],
      who_and_when: {
        situational_context: 'Penyusunan NDA paten teknologi, mitigasi risiko sengketa kekayaan intelektual, dan pengarahan etika kerahasiaan.',
        social_relations: 'Konsultasi keamanan legal antara Direktur Legal (Sato) dan asisten kepatuhan (Budi).',
        when_not_to_use: 'Jangan gunakan "te tamaranai" dalam draf resmi teks kontrak perdata karena teks hukum harus bebas dari kata sifat subjektif emosional.'
      },
      scenario: {
        title: 'Pengamanan Rahasia Dagang Inovasi Baterai',
        setting: 'Ruang Rahasia Arsip Paten Korporat Marunouchi, pukul 18.00',
        narrative: 'Sato dan Budi mengunci draf formula kimia baterai padat sebelum dikirim ke kantor paten Jenewa.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: 'ブディさん、この 特許【とっきょ】技術【ぎじゅつ】の 機密【きみつ】が 外部【がいぶ】に 漏えい【ろうえい】しないか、心配【しんぱい】で たまりませんね。',
        furigana: 'ブディさん、この 特許技術の 機密が 外部に 漏えいしないか、心配で たまりませんね。',
        romaji: 'Budi-san, kono tokkyo gijutsu no kimitsu ga gaibu ni rouei shinai ka, shimpai de tamarimasen ne.',
        idText: 'Budi, memikirkan apakah rahasia teknologi paten ini tidak bocor ke luar, rasanya sangat mencemaskan hingga tidak tenang ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'ご安心【あんしん】ください！ 開示【かいじ】した 資料【しりょう】は 概要【がいよう】の 説明【せつめい】に 過ぎず【すぎず】、核心【かくしん】データは 厳重【げんじゅう】に 隔離【かくり】してあります。',
        furigana: 'ご安心ください！ 開示した 資料は 概要の 説明に 過ぎず、核心データは 厳重に 隔離してあります。',
        romaji: 'Goanshin kudasai! Kaiji shita shiryou wa gaiyou no setsumei ni sugizu, kakushin deeta wa genjuu ni kakuri shite arimasu.',
        idText: 'Tenang saja! Dokumen yang diungkapkan tidak lebih dari sekadar penjelasan garis besar, data inti telah diisolasi secara ketat.'
      },
      {
        id: 'd3',
        speaker: 'Sato',
        speakerRole: 'Direktur Kemitraan Korporat',
        avatar: '👔',
        jp: '見事【みごと】な 防衛【ぼうえい】策【さく】です。相手方【あいてがた】との 信頼【しんらい】関係【かんけい】を 維持【いじ】しつつ、企業【きぎょう】の 宝【たから】を 守【まも】り抜【ぬ】きましょう。',
        furigana: '見事な 防衛策です。相手方との 信頼関係を 維持しつつ、企業の 宝を 守り抜きましょう。',
        romaji: 'Migotona boueisaku desu. Aitegata to no shinrai kankei o iji shitsutsu, kigyou no takara o mamorinukimashou.',
        idText: 'Langkah pengamanan yang luar biasa. Sembari memelihara hubungan kepercayaan dengan mitra, mari kita lindungi harta karun perusahaan sampai tuntas.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ 万全【ばんぜん】の セキュリティ体制【たいせい】で、日本【にほん】と インドネシアの 共同【きょうどう】開発【かいはつ】を 成功【せいこう】へ 導【みちび】きます。',
        furigana: 'はい！ 万全の セキュリティ体制で、日本と インドネシアの 共同開発を 成功へ 導きます。',
        romaji: 'Hai! Banzen no sekyuriti taisei de, Nihon to Indoneshia no kyoudou kaihatsu o seikou e michibikimasu.',
        idText: 'Ya! Dengan sistem keamanan yang paripurna, kami akan memandu pengembangan bersama Jepang dan Indonesia menuju keberhasilan.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "機密 (きみつ)" dalam kepatuhan hukum korporasi?',
        sentencePrompt: 'Istilah "営業【えいぎょう】機密【きみつ】の 厳守【げんしゅ】" bermakna:',
        options: [
          'Kepatuhan mutlak dalam menjaga rahasia penting dagang perusahaan',
          'Penyebaran brosur promosi produk baru di perempatan jalan',
          'Pemberian kartu ucapan selamat tahun baru kepada pelanggan',
          'Pencatatan daftar hadir karyawan di mesin fingerprint'
        ],
        correctAnswer: 'Kepatuhan mutlak dalam menjaga rahasia penting dagang perusahaan',
        explanation: '"機密 (きみつ)" bermakna rahasia negara atau rahasia penting korporat yang dilarang keras bocor.',
        diagnosticFeedback: {
          'Penyebaran brosur promosi produk baru di perempatan jalan': 'Salah: Penyebaran brosur adalah チラシ配り (chirashikubari).',
          'Pemberian kartu ucapan selamat tahun baru kepada pelanggan': 'Salah: Kartu tahun baru adalah 年賀状 (nengajou).',
          'Pencatatan daftar hadir karyawan di mesin fingerprint': 'Salah: Pencatatan presensi adalah 出退勤記録 (shuttaikin kiroku).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola desakan emosi subjektif yang mendesak:',
        sentencePrompt: '合格【ごうかく】発表【はっぴょう】の 日【ひ】が 近【ちか】づいて、結果【けっか】が 気【き】に なって [　　]。',
        options: [
          'たまらない',
          'すぎない',
          '照【て】らして',
          'かねる'
        ],
        correctAnswer: 'たまらない',
        explanation: '〜気になってたまらない menyatakan dorongan rasa penasaran/cemas subjektif yang sangat mendesak hingga sulit tenang.',
        diagnosticFeedback: {
          'すぎない': 'Kekeliruan Makna: 〜にすぎない menyatakan hal sebatas remeh, tidak pas untuk desakan rasa penasaran.',
          '照【て】らして': 'Kekeliruan Pola: 〜に照らして menyatakan rujukan hukum abstrak, tidak cocok setelah partikel te.',
          'かねる': 'Kekeliruan Pola: 〜かねる menyatakan penolakan santun, tidak nyambung dengan rasa cemas.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Batasan Realitas): Manakah kalimat yang menggunakan 〜にすぎない secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜にすぎない dengan makna pembatasan objektif:',
        options: [
          '今回【こんかい】の 成功【せいこう】は、大【おお】きな 目標【もくひょう】の 第一歩【だいいっぽ】に 過ぎない【すぎない】。',
          '私【わたし】の 親友【しんゆう】は、世界【せかい】の 王様【おうさま】に すぎない。',
          '彼【かれ】は 天才【てんさい】科学者【かがくしゃ】に すぎないから、ノーベル賞【しょう】を 辞退【じたい】した。',
          '美味【おい】しい 寿司【すし】は、宇宙【うちゅう】の 奇跡【きせき】に すぎない。'
        ],
        correctAnswer: '今回【こんかい】の 成功【せいこう】は、大【おお】きな 目標【もくひょう】の 第一歩【だいいっぽ】に 過ぎない【すぎない】。',
        explanation: 'Menyatakan bahwa keberhasilan ini tidak lebih dari sekadar langkah awal kecil menuju target yang jauh lebih besar.',
        diagnosticFeedback: {
          '私【わたし】の 親友【しんゆう】は、世界【せかい】の 王様【おうさま】に すぎない。': 'Logika Khayalan: Sahabat saya adalah raja dunia bukanlah pembatasan realitas wajar.',
          '彼【かれ】は 天才【てんさい】科学者【かがくしゃ】に すぎないから、ノーベル賞【しょう】を 辞退【じたい】した。': 'Kontradiksi: Menolak hadiah Nobel tidak selaras dengan meremehkan status ilmuwan jenius.',
          '美味【おい】しい 寿司【すし】は、宇宙【うちゅう】の 奇跡【きせき】に すぎない。': 'Rancu Filosofis: Menggabungkan keajaiban alam semesta dengan pembatasan suginai merusak makna.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penegasan batas data:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '開示【かいじ】した 資料【しりょう】は 概要【がいよう】の 説明【せつめい】に 過ぎない【すぎない】',
          '説明【せつめい】に 過ぎない【すぎない】 開示【かいじ】した 資料【しりょう】は 概要【がいよう】の',
          '概要【がいよう】の 開示【かいじ】した 資料【しりょう】は 説明【せつめい】に 過ぎない【すぎない】',
          '開示【かいじ】した 過ぎない【すぎない】 資料【しりょう】は 概要【がいよう】の 説明【せつめい】に'
        ],
        correctAnswer: '開示【かいじ】した 資料【しりょう】は 概要【がいよう】の 説明【せつめい】に 過ぎない【すぎない】',
        explanation: 'Urutan baku: Subjek modifikasi (開示した資料は) + frasa pembatas (概要の説明に) + predikat pembatasan (過ぎない).',
        diagnosticFeedback: {
          '説明【せつめい】に 過ぎない【すぎない】 開示【かいじ】した 資料【しりょう】は 概要【がいよう】の': 'Predikat di Depan: Menempatkan predikat penutup di awal kalimat.',
          '概要【がいよう】の 開示【かいじ】した 資料【しりょう】は 説明【せつめい】に 過ぎない【すぎない】': 'Modifikasi Terpisah: Gaiyou no terpisah dari setsumei.',
          '開示【かいじ】した 過ぎない【すぎない】 資料【しりょう】は 概要【がいよう】の 説明【せつめい】に': 'Sintaksis Terbelah: Verba suginai memotong di antara verba dan nomina.'
        },
        tokens: ['開示【かいじ】した 資料【しりょう】は', '概要【がいよう】の', '説明【せつめい】に', '過ぎない【すぎない】'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Pengamanan Aset): Saat Sato mengingatkan: 「相手方との 信頼関係を 維持しつつ、企業の 宝を 守り抜きましょう」, apa komitmen terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan dedikasi paripurna:',
        options: [
          'はい！ 万全【ばんぜん】の セキュリティ体制【たいせい】で、日本【にほん】と インドネシアの 共同【きょうどう】開発【かいはつ】を 成功【せいこう】へ 導【みちび】きます。',
          '特許【とっきょ】データなんて インターネットに 全部【ぜんぶ】 アップロードしておけば、バックアップの 手間【てま】が 省【はぶ】けますよ。',
          'ライバル企業【きぎょう】に データを 売【う】り払【はら】って、その お金【かね】で 海外【かいがい】旅行【りょこう】に 行【い】きましょう！',
          '佐藤【さとう】部長【ぶちょう】、心配【しんぱい】しすぎですよ。漏【も】れたら 漏【も】れたで、新【あたら】しい アイデアを 考え【かんがえ】れば いいだけです。'
        ],
        correctAnswer: 'はい！ 万全【ばんぜん】の セキュリティ体制【たいせい】で、日本【にほん】と インドネシアの 共同【きょうどう】開発【かいはつ】を 成功【せいこう】へ 導【みちび】きます。',
        explanation: 'Menegaskan kesiapan menjaga keamanan sistem tingkat tertinggi dan memandu kemitraan bilateral.',
        diagnosticFeedback: {
          '特許【とっきょ】データなんて インターネットに 全部【ぜんぶ】 アップロードしておけば、バックアップの 手間【てま】が 省【はぶ】けますよ。': 'Kebocoran Publik: Mengunggah paten rahasia ke ruang publik menghancurkan kebaruan paten secara global.',
          'ライバル企業【きぎょう】に データを 売【う】り払【はら】って、その お金【かね】で 海外【かいがい】旅行【りょこう】に 行【い】きましょう！': 'Spionase Industri: Menjual rahasia dagang ke kompetitor adalah tindak pidana kejahatan korporat.',
          '佐藤【さとう】部長【ぶちょう】、心配【しんぱい】しすぎですよ。漏【も】れたら 漏【も】れたで、新【あたら】しい アイデアを 考え【かんがえ】れば いいだけです。': 'Meremehkan Kekayaan Intelektual: Menganggap enteng kebocoran riset bernilai ratusan miliar yen.'
        }
      }
    ]
  }
};

const merged = Object.assign({}, existing, u08_10);

const outContent = `// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/units-06-to-10.js
//  Bespoke Gold-Standard Content for N2 Units 6–10 (10 Lessons)
// ══════════════════════════════════════════════════════════════════

module.exports = ${JSON.stringify(merged, null, 2)};
`;

fs.writeFileSync(targetFile, outContent, 'utf8');
console.log(`✅ units-06-to-10.js successfully completed with all ${Object.keys(merged).length} lessons!`);
