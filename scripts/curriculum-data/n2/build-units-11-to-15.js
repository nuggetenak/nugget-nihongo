// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/build-units-11-to-15.js
//  Bespoke Gold-Standard Curated Content for N2 Units 11–15 (10 Lessons)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-11-to-15.js');

const u11_15 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 11: Fakta Tak Terduga, Kontras Nyata & Asal Usul Kausalitas
  // ─────────────────────────────────────────────────────────────
  'les-n2-u11-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai paradoks kontras tak terduga: 〜にもかかわらず (meskipun fakta riilnya demikian, namun di luar dugaan...) dan pengakuan konsesif: 〜ものの (meskipun benar bahwa X, tetapi faktanya...).',
        canDo: 'Bisa menganalisis anomali eksperimen fisika material energi terbarukan dan menyajikan laporan disparitas data hasil uji coba.',
        targetPatterns: [
          'V / A / Naである / Nである + にもかかわらず (meskipun ... di luar dugaan kontras)',
          'V-plain / A-i / Naな + ものの (meskipun benar bahwa ..., namun kenyataannya ...)'
        ],
        coreVocabSample: ['いじょう', 'ほうねつ', 'そざい', 'けっか', 'そくてい', 'ぎゃくせつ', 'かいめい', 'じっけん']
      },
      sensei_context: {
        sceneIntro: 'Laboratorium pengujian material dan teknologi energi terbarukan di Tsukuba Science City. Ogawa (Kepala Tim Riset R&D) menganalisis disipasi panas semikonduktor silikon karbida bersama Budi.',
        dailyMission: 'Gunakan "ni mo kakawarazu" untuk melaporkan anomali suhu dan "mono no" untuk mengakui progres parsial tanpa mengabaikan hambatan.',
        whyOrder: 'Ilmuwan dan analis N2 wajib menguasai bahasa dialektika: mengakui premis fakta (mono no) sembari menyoroti fenomena anomali yang menantang teori konvensional (ni mo kakawarazu).'
      },
      cultural_notes: {
        title: 'Kejujuran Ilmiah (科学的誠実性) dan Disparitas Temuan Laboratorium',
        etiquette: 'Menyampaikan anomali riset dengan bahasa kontras formal menunjukkan objektivitas peneliti yang tidak memanipulasi data.',
        taboos: 'Jangan menyembunyikan data anomali yang bertentangan dengan hipotesis awal hanya demi laporan yang terlihat sempurna.'
      },
      pronunciation_tips: {
        title: 'Artikulasi Nada Kontras "Ni mo kakawarazu"',
        moraNote: 'Lafalkan "ni-mo-ka-ka-wa-ra-zu" (7 mora) secara mengalir tanpa jeda kaku sebelum morfem zu.',
        soundTip: 'Pada "mono no", beri sedikit jeda napas mikro setelah partikel no pertama.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜にもかかわらず (Fakta Kontras Nyata) vs 〜のに (Keluhan Emosional Kasual)',
          caseScenario: 'Menggunakan noni dalam makalah ilmiah formal.',
          pitfallWarning: '冷却【れいきゃく】した のに、温度【おんど】が 下【さ】がらない。 (Terasa kasual seperti mengeluh)',
          rightSolution: '冷却【れいきゃく】した にもかかわらず、温度【おんど】が 下【さ】がらない。 (Tepat: ragam tertulis objektif)',
          explanation: '〜にもかかわらず adalah padanan akademis/formal dari 〜のに yang bebas dari nada emosional subjektif.'
        },
        {
          title: 'Salah Partikel Hubung Sebelum 〜ものの',
          caseScenario: 'Menambahkan de aru langsung tanpa na untuk kata sifat na.',
          pitfallWarning: '有名【ゆうめい】である ものの (Bisa, namun bentuk paling alami adalah 有名なものの).',
          rightSolution: '有名【ゆうめい】な ものの、売【う】れ行【ゆ】きは 芳【かんば】しくない。 (Tepat: Na-na + mono no)',
          explanation: 'Sebelum 〜ものの, kata sifat na menggunakan bentuk な (misal: 優秀なものの / 不安なものの).'
        }
      ],
      who_and_when: {
        situational_context: 'Pemaparan jurnal riset ilmiah, telaah audit deviasi produksi, dan rapat evaluasi performa mesin prototipe.',
        social_relations: 'Diskusi saintifik antara Kepala Riset (Ogawa) dan peneliti muda (Budi).',
        when_not_to_use: 'Jangan gunakan pada hal-hal biasa yang hasilnya wajar dan tidak mengandung unsur kejutan paradoksal.'
      },
      scenario: {
        title: 'Investigasi Disipasi Termal Semikonduktor Tsukuba',
        setting: 'Lab Pengujian Termal Semikonduktor Tsukuba, pukul 11.00',
        narrative: 'Ogawa dan Budi meneliti sensor termografis yang mendeteksi kenaikan suhu lokal di bawah beban arus kontinu.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: 'ブディさん、高出力【こうしゅつりょく】の 冷却【れいきゃく】ファンを 稼働【かどう】させている にもかかわらず、基板【きばん】の 温度【おんど】が 下【さ】がりませんね。',
        furigana: 'ブディさん、高出力の 冷却ファンを 稼働させている にもかかわらず、基板の 温度が 下がりませんね。',
        romaji: 'Budi-san, koushutsuryoku no reikyaku fan o kadou sasete iru ni mo kakawarazu, kiban no ondo ga sagarimasen ne.',
        idText: 'Budi, meskipun kipas pendingin berdaya tinggi sedang beroperasi, di luar dugaan temperatur papan sirkuit tidak kunjung turun ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、小川【おがわ】主任【しゅにん】。理論【りろん】上【じょう】は 放熱【ほうねつ】が 完了【かんりょう】する はずである にもかかわらず、内部【ないぶ】に 熱【ねつ】が 籠【こ】もる 現象【げんしょう】が 確認【かくにん】されました。',
        furigana: 'はい、小川主任。理論上は 放熱が 完了する はずである にもかかわらず、内部に 熱が 籠もる 現象が 確認されました。',
        romaji: 'Hai, Ogawa-shunin. Rironjou wa hounetsu ga kanryou suru hazu de aru ni mo kakawarazu, naibu ni netsu ga komoru genshou ga kakunin saremashita.',
        idText: 'Ya, Peneliti Utama Ogawa. Meskipun secara teoretis disipasi panas semestinya telah tuntas, terkonfirmasi adanya fenomena panas yang terperangkap di bagian dalam.'
      },
      {
        id: 'd3',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: '興味深【きょうみぶか】い データです。新【あたら】しい 合金【ごうきん】素材【そざい】を 導入【どうにゅう】した ものの、結晶【けっしょう】構造【こうぞう】に 未知【みち】の 課題【かだい】が 潜【ひそ】んでいるのかも しれません。',
        furigana: '興味深い データです。新しい 合金素材を 導入した ものの、結晶構造に 未知の 課題が 潜んでいるのかも しれません。',
        romaji: 'Kyoumibukai deeta desu. Atarashii goukin sozai o dounyuu shita mono no, kesshou kouzou ni michi no kadai ga hisonde iru no kamo shiremasen.',
        idText: 'Data yang sangat menarik. Meskipun benar bahwa kita telah mengadopsi material paduan logam baru, mungkin terselubung tantangan tak terduga pada struktur kristalnya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 電子【でんし】顕微鏡【けんびきょう】による 断面【だんめん】解析【かいせき】を 実施【じっし】し、原因【げんいん】を 徹底的【てっていてき】に 究明【きゅうめい】いたします。',
        furigana: '承知いたしました！ 電子顕微鏡による 断面解析を 実施し、原因を 徹底的に 究明いたします。',
        romaji: 'Shouchi itashimashita! Denshi kenbikyou ni yoru dammen kaiseki o jisshi shi, gen-in o tetteiteki ni kyuumei itashimasu.',
        idText: 'Dimengerti! Kami akan melaksanakan analisis penampang menggunakan mikroskop elektron dan menyelidiki penyebabnya secara tuntas.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "放熱 (ほうねつ)" dalam rekayasa termal semikonduktor?',
        sentencePrompt: 'Istilah "半導体【はんどうたい】の 放熱【ほうねつ】" bermakna:',
        options: [
          'Pelepasan atau pembuangan energi panas keluar dari komponen sirkuit',
          'Pembakaran batu bara di pembangkit listrik tenaga uap',
          'Pemanasan oven dapur untuk memanggang kue bolu',
          'Penyiraman tanaman anggrek di rumah kaca kebun'
        ],
        correctAnswer: 'Pelepasan atau pembuangan energi panas keluar dari komponen sirkuit',
        explanation: '"放熱 (ほうねつ)" bermakna disipasi panas, yaitu radiasi/pembuangan panas yang dihasilkan perangkat elektronik.',
        diagnosticFeedback: {
          'Pembakaran batu bara di pembangkit listrik tenaga uap': 'Salah: Pembakaran adalah 燃焼 (nenshou).',
          'Pemanasan oven dapur untuk memanggang kue bolu': 'Salah: Pemanasan adalah 加熱 (kanetsu).',
          'Penyiraman tanaman anggrek di rumah kaca kebun': 'Salah: Penyiraman adalah 水やり (mizuyari) atau 灌漑 (kangai).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola kontras formal tak terduga:',
        sentencePrompt: '厳重【げんじゅう】に 警戒【けいかい】していた [　　]、不正【ふせい】アクセスを 防【ふせ】げなかった。',
        options: [
          'にもかかわらず',
          'ものの',
          '上【うえ】は',
          'に 応【おう】じて'
        ],
        correctAnswer: 'にもかかわらず',
        explanation: '〜にもかかわらず menyatakan kontras yang kuat: meskipun sudah dijaga secara super ketat (fakta), namun di luar dugaan pembobolan tetap terjadi.',
        diagnosticFeedback: {
          'ものの': 'Kekeliruan Nuansa: 〜ものの cenderung menyatakan pengakuan konsesif (meskipun benar A, namun B), sedangkan untuk kontras dramatis tak terduga, 〜にもかかわらず adalah bentuk terkuat.',
          '上【うえ】は': 'Kekeliruan Makna: 〜上は menyatakan konsekuensi komitmen status, tidak pas untuk kontras kegagalan.',
          'に 応【おう】じて': 'Kekeliruan Pola: 〜に応じて menyatakan penyesuaian proporsional, tidak cocok dengan kontras.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Pengakuan Konsesif): Manakah kalimat yang menggunakan 〜ものの secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ものの dengan struktur gramatikal yang benar:',
        options: [
          '給料【きゅうりょう】は 上【あ】がった ものの、物価【ぶっか】の 高騰【こうとう】で 生活【せいかつ】は 楽【らく】に ならない。',
          '給料【きゅうりょう】は 上【あ】がった ものの、とても 幸【しあわ】せで 貯金【ちょきん】が 増【ふ】えた。',
          '雨【あめ】が 降【ふ】った ものの、傘【かさ】を 買【か】いました。',
          '彼【かれ】は 医者【いしゃ】だ ものの、病気【びょうき】を 治【なお】した。'
        ],
        correctAnswer: '給料【きゅうりょう】は 上【あ】がった ものの、物価【ぶっか】の 高騰【こうとう】で 生活【せいかつ】は 楽【らく】に ならない。',
        explanation: 'Klausa 1 mengakui fakta positif (gaji naik), tetapi klausa 2 membatasi kenyataan dengan kenyataan yang tidak seindah harapan (karena inflasi hidup tidak mudah).',
        diagnosticFeedback: {
          '給料【きゅうりょう】は 上【あ】がった ものの、とても 幸【しあわ】せで 貯金【ちょきん】が 増【ふ】えた。': 'Kekeliruan Arah: Klausa 2 bernada positif mulus (hidup bahagia tabungan naik), bertentangan dengan fungsi kontras 〜ものの.',
          '雨【あめ】が 降【ふ】った ものの、傘【かさ】を 買【か】いました。': 'Tindakan Wajar: Beli payung saat hujan adalah aksi wajar sebab-akibat, bukan kontras konsesif.',
          '彼【かれ】は 医者【いしゃ】だ ものの、病気【びょうき】を 治【なお】した。': 'Hasil Alami: Dokter menyembuhkan penyakit adalah hal lumrah, tidak mengandung pertentangan.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat analisis anomali termal:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '冷却【れいきゃく】ファンを 稼働【かどう】させている にもかかわらず 基板【きばん】の 温度【おんど】が 下【さ】がらない',
          '基板【きばん】の 温度【おんど】が 下【さ】がらない 冷却【れいきゃく】ファンを 稼働【かどう】させている にもかかわらず',
          'にもかかわらず 冷却【れいきゃく】ファンを 稼働【かどう】させている 基板【きばん】の 温度【おんど】が 下【さ】がらない',
          '冷却【れいきゃく】ファンを 基板【きばん】の 温度【おんど】が 下【さ】がらない 稼働【かどう】させている にもかかわらず'
        ],
        correctAnswer: '冷却【れいきゃく】ファンを 稼働【かどう】させている にもかかわらず 基板【きばん】の 温度【おんど】が 下【さ】がらない',
        explanation: 'Urutan baku: Klausa fakta pengondisian (冷却ファンを稼働させている) + partikel kontras (にもかかわらず) + subjek anomali (基板の温度が) + verba hasil (下がらない).',
        diagnosticFeedback: {
          '基板【きばん】の 温度【おんど】が 下【さ】がらない 冷却【れいきゃく】ファンを 稼働【かどう】させている にもかかわらず': 'Predikat Terbalik: Meletakkan anomali di awal kalimat sebelum penyebab.',
          'にもかかわらず 冷却【れいきゃく】ファンを 稼働【かどう】させている 基板【きばん】の 温度【おんど】が 下【さ】がらない': 'Partikel di Depan: Meletakkan ni mo kakawarazu di awal kalimat.',
          '冷却【れいきゃく】ファンを 基板【きばん】の 温度【おんど】が 下【さ】がらない 稼働【かどう】させている にもかかわらず': 'Susunan Acak: Merancukan objek kipas dengan suhu papan.'
        },
        tokens: ['冷却【れいきゃく】ファンを', '稼働【かどう】させている にもかかわらず', '基板【きばん】の 温度【おんど】が', '下【さ】がらない'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Sikap Pantang Menyerah Meneliti): Saat Ogawa mengarahkan: 「新しい 合金素材を 導入したものの、結晶構造に 未知の 課題が 潜んでいるのかもしれません」, apa komitmen riset terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan saintifik yang menunjukkan tekad investigasi mendalam:',
        options: [
          '承知【しょうち】いたしました！ 電子【でんし】顕微鏡【けんびきょう】による 断面【だんめん】解析【かいせき】を 実施【じっし】し、原因【げんいん】を 徹底的【てっていてき】に 究明【きゅうめい】いたします。',
          '未知【みち】の 課題【かだい】なんて 怖【こわ】いので、この 実験【じっけん】は もう やめましょう。',
          '小川【おがわ】さん、温度計【おんどけい】が 壊【こわ】れているだけですよ。叩【たた】けば 直【なお】ります。',
          '論文【ろんぶん】に 書【か】くのが 面倒【めんどう】なので、データは 適当【てきとう】に 捏造【ねつぞう】して 提出【ていしゅつ】しておきますね。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 電子【でんし】顕微鏡【けんびきょう】による 断面【だんめん】解析【かいせき】を 実施【じっし】し、原因【げんいん】を 徹底的【てっていてき】に 究明【きゅうめい】いたします。',
        explanation: 'Menunjukkan etos saintifik sejati dengan mengusulkan verifikasi mikroskopik objektif.',
        diagnosticFeedback: {
          '未知【みち】の 課題【かだい】なんて 怖【こわ】いので、この 実験【じっけん】は もう やめましょう。': 'Jiwa Kerdil: Takut pada tantangan ilmiah bertentangan dengan etos inovasi riset.',
          '小川【おがわ】さん、温度計【おんどけい】が 壊【こわ】れているだけですよ。叩【たた】けば 直【なお】ります。': 'Tidak Ilmiah: Menganggap instrumen presisi jutaan yen bisa dibetulkan dengan dipukul adalah konyol.',
          '論文【ろんぶん】に 書【か】くのが 面倒【めんどう】なので、データは 適当【てきとう】に 捏造【ねつぞう】して 提出【ていしゅつ】しておきますね。': 'Kejahatan Akademik: Memalsukan data riset adalah pelanggaran integritas paling mematikan dalam sains.'
        }
      }
    ]
  },

  'les-n2-u11-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai penambahan efek kumulatif: 〜だけでなく (tidak hanya X, bahkan juga Y) dan penegasan sumber esensi kausalitas: 〜にほかならない (tiada lain hanyalah bukti nyata dari...).',
        canDo: 'Bisa mempresentasikan terobosan material baterai ramah lingkungan di forum simposium akademis dan menegaskan faktor pemicu keberhasilannya.',
        targetPatterns: [
          'V / A / Naな / N + だけでなく (tidak hanya ... melainkan juga ...)',
          'N + にほかならない (tiada lain hanyalah ... / merupakan bukti mutlak dari ...)'
        ],
        coreVocabSample: ['かくしん', 'けっしょう', 'せいい', 'せいこう', 'どりょく', 'きょうそう', 'じっしょう', 'はっぴょう']
      },
      sensei_context: {
        sceneIntro: 'Auditorium simposium riset energi bersih Tsukuba. Ogawa dan Budi bersiap naik ke panggung pleno untuk mempresentasikan hasil uji efisiensi sel surya perovskit.',
        dailyMission: 'Gunakan "dakedenaku" untuk menjelaskan spektrum keunggulan teknis dan tutup dengan "chiimu no kesshou ni hokanaranai" untuk memuji kerja keras tim.',
        whyOrder: 'Pola ~ni hokanaranai adalah mahkota retorika formal Jepang: memberikan penegasan konklusif filosofis yang berwibawa di akhir pidato atau kesimpulan karya tulis ilmiah.'
      },
      cultural_notes: {
        title: 'Penghargaan atas Sinergi Kolektif (結束の結晶) dalam Pidato Simposium',
        etiquette: 'Menyatakan bahwa keberhasilan proyek "tiada lain adalah berkat kerja keras tim" (doryoku no kesshou ni hokanaranai) mencerminkan kerendahan hati luhur.',
        taboos: 'Hindari mengklaim keberhasilan paten bersama sebagai pencapaian tunggal diri sendiri di forum akademik.'
      },
      pronunciation_tips: {
        title: 'Ketukan Tegas "Ni Hoka Naranai"',
        moraNote: 'Lafalkan "ni-ho-ka-na-ra-na-i" dengan penekanan mantap pada mora ho-ka untuk mempertegas keyakinan mutlak.',
        soundTip: 'Pada "dakedenaku", sambungkan artikulasi dengan nada datar berirama.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜にほかならない (Bukti Mutlak) vs 〜にすぎない (Hanyalah Sebatas)',
          caseScenario: 'Ingin menegaskan bahwa kesuksesan ini adalah murni hasil kerja keras.',
          pitfallWarning: '成功【せいこう】は 努力【どりょく】に すぎない。 (Artinya malah mengecilkan: sukses cuma usaha biasa)',
          rightSolution: '成功【せいこう】は 努力【どりょく】の 結晶【けっしょう】に ほかならない。 (Tepat: tiada lain adalah buah kristalisasi usaha)',
          explanation: '〜にほかならない mempertegas 100% kepastian hakikat, sedangkan 〜にすぎない justru membatasi dan meremehkan derajat.'
        },
        {
          title: 'Salah Partikel Hubung pada Kata Sifat Na untuk 〜だけでなく',
          caseScenario: 'Memakai partikel da sebelum dakedenaku.',
          pitfallWarning: '便利【べんり】だ だけでなく (Salah)',
          rightSolution: '便利【べんり】な だけでなく (Tepat: Na-na + dakedenaku)',
          explanation: 'Kata sifat Na menggunakan な sebelum だけでなく (contoh: 静かなだけでなく / 安全なだけでなく).'
        }
      ],
      who_and_when: {
        situational_context: 'Simposium internasional, pidato sambutan pimpinan upacara, kesimpulan tesis penelitian, dan rilis pers keberhasilan produk.',
        social_relations: 'Pemaparan bersama antara mentor riset (Ogawa) dan pembelajar (Budi) di hadapan komunitas ilmiah global.',
        when_not_to_use: 'Jangan gunakan "ni hokanaranai" untuk hal-hal sepele yang tidak memiliki bobot pembuktian kausalitas.'
      },
      scenario: {
        title: 'Presentasi Simposium Energi Bersih Internasional',
        setting: 'Auditorium Pleno Tsukuba Congress Center, pukul 15.00',
        narrative: 'Ogawa dan Budi memaparkan lonjakan efisiensi sel fotovoltaik baru di hadapan ratusan periset dunia.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: 'ブディさん、この 新型【しんがた】セルは 発電【はつでん】効率【こうりつ】が 高【たか】い だけでなく、耐久性【たいきゅうせい】にも 極【きわ】めて 優【すぐ】れていますね。',
        furigana: 'ブディさん、この 新型セルは 発電効率が 高い だけでなく、耐久性にも 極めて 優れていますね。',
        romaji: 'Budi-san, kono shingata seru wa hatsuden kouritsu ga takai dakedenaku, taikyuusei ni mo kiwamete sugurete imasu ne.',
        idText: 'Budi, sel model baru ini tidak hanya memiliki efisiensi pembangkitan listrik yang tinggi, melainkan juga sangat unggul dalam daya tahan ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ この 画期的【かっきてき】な 成果【せいか】は、日夜【にちや】実験【じっけん】を 重【かさ】ねてきた 研究【けんきゅう】チームの 努力【どりょく】の 結晶【けっしょう】に ほかなりません。',
        furigana: 'はい！ この 画期的な 成果は、日夜実験を 重ねてきた 研究チームの 努力の 結晶に ほかなりません。',
        romaji: 'Hai! Kono kakkitekina seika wa, nichiya jikken o kasanete kita kenkyuu chiimu no doryoku no kesshou ni hokanarimasen.',
        idText: 'Ya! Hasil terobosan bersejarah ini tiada lain hanyalah buah kristalisasi jerih payah tim peneliti yang telah mengulang eksperimen siang dan malam.'
      },
      {
        id: 'd3',
        speaker: 'Ogawa',
        speakerRole: 'Kepala Tim Riset R&D',
        avatar: '👨‍🔬',
        jp: '胸【むね】を 張【は】って 発表【はっぴょう】してください。国際【こくさい】的【てき】な 産学【さんがく】連携【れんけい】の 成功【せいこう】モデルとして、大【おお】いに アピールしましょう。',
        furigana: '胸を 張って 発表してください。国際的な 産学連携の 成功モデルとして、大いに アピールしましょう。',
        romaji: 'Mune o hatte happyou shite kudasai. Kokusaitekina sangaku renkei no seikou moderu to shite, ooi ni apiiru shimashou.',
        idText: 'Tolong sampaikan presentasi dengan dada tegak penuh percaya diri. Mari kita promosikan ini secara luas sebagai model sukses kemitraan industri-akademisi internasional.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 日本【にほん】と インドネシアの 共同【きょうどう】研究【けんきゅう】の 意義【いぎ】を、世界【せかい】の 研究者【けんきゅうしゃ】へ 堂々【どうどう】と 伝【つた】えてまいります。',
        furigana: '承知いたしました！ 日本と インドネシアの 共同研究の 意義を、世界の 研究者へ 堂々と 伝えてまいります。',
        romaji: 'Shouchi itashimashita! Nihon to Indoneshia no kyoudou kenkyuu no igi o, sekai no kenkyuusha e doudou to tsutaete mairimasu.',
        idText: 'Dimengerti! Makna penting riset kolaboratif Jepang dan Indonesia ini akan saya sampaikan dengan gagah berwibawa kepada para peneliti dunia.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "結晶 (けっしょう)" dalam kesimpulan keberhasilan riset?',
        sentencePrompt: 'Istilah "努力【どりょく】の 結晶【けっしょう】" bermakna:',
        options: [
          'Buah manis hasil perjuangan panjang atau perwujudan konkret dari jerih payah',
          'Es batu yang membeku di dalam lemari pendingin laboratorium',
          'Garam dapur kasar yang ditaburkan di atas jalanan bersalju',
          'Pecahan kaca jendela yang berserakan di lantai'
        ],
        correctAnswer: 'Buah manis hasil perjuangan panjang atau perwujudan konkret dari jerih payah',
        explanation: '"結晶 (けっしょう)" selain berarti kristal mineral, secara kiasan bermakna buah konkret dari keringat, dedikasi, dan kerja keras.',
        diagnosticFeedback: {
          'Es batu yang membeku di dalam lemari pendingin laboratorium': 'Arti Harfiah Fisik: Es biasa adalah 氷 (koori).',
          'Garam dapur kasar yang ditaburkan di atas jalanan bersalju': 'Salah: Garam adalah 食塩 (shokuen) atau 凍結防止剤.',
          'Pecahan kaca jendela yang berserakan di lantai': 'Salah: Pecahan kaca adalah ガラスの破片 (garasu no hahen).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola penegasan esensi kausalitas mutlak:',
        sentencePrompt: '彼【かれ】の 成功【せいこう】は、不断【ふだん】の 努力【どりょく】の [　　]。',
        options: [
          '結果【けっか】に ほかならない',
          '結果【けっか】に すぎない',
          '結果【けっか】の ものである',
          '結果【けっか】に 応【おう】じて'
        ],
        correctAnswer: '結果【けっか】に ほかならない',
        explanation: '〜にほかならない menegaskan secara mutlak bahwa kesuksesannya tiada lain adalah berkat kerja keras yang tiada henti.',
        diagnosticFeedback: {
          '結果【けっか】に すぎない': 'Kekeliruan Makna: 〜にすぎない meremehkan sukses sebagai hal sepele, bertolak belakang dengan pujian.',
          '結果【けっか】の ものである': 'Bentuk Janggal: Pola gramatikal yang baku adalah 〜にほかならない atau 〜ものがある.',
          '結果【けっか】に 応【おう】じて': 'Kekeliruan Pola: 〜に応じて menyatakan penyesuaian proporsional, tidak pas di posisi predikat penutup penegasan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Penambahan Luas): Manakah kalimat yang menggunakan 〜だけでなく secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜だけでなく dengan struktur modifikasi yang benar:',
        options: [
          'この 車【くるま】は デザインが 美【うつく】しい だけでなく、燃費【ねんぴ】も 抜群【ばつぐん】だ。',
          'この 車【くるま】は デザインが 美【うつく】しい だけでなく、走【はし】らない。',
          '朝【あさ】ごはんは 食べる【たべる】 だけでなく、夜【よる】になりました。',
          '雨【あめ】が 降【ふ】る だけでなく、晴【は】れました。'
        ],
        correctAnswer: 'この 車【くるま】は デザインが 美【うつく】しい だけでなく、燃費【ねんぴ】も 抜群【ばつぐん】だ。',
        explanation: '〜だけでなく menambahkan keunggulan kumulatif yang searah (tidak hanya desainnya indah, efisiensi bahan bakarnya pun luar biasa).',
        diagnosticFeedback: {
          'この 車【くるま】は デザインが 美【うつく】しい だけでなく、走【はし】らない。': 'Kontradiksi Arah: Tidak bisa jalan adalah cacat fatal, tidak bisa digabungkan dengan dakedenaku secara positif.',
          '朝【あさ】ごはんは 食べる【たべる】 だけでなく、夜【よる】になりました。': 'Ketiadaan Hubungan: Menjadi malam adalah waktu alamiah, bukan akumulasi kualitas sarapan.',
          '雨【あめ】が 降【ふ】る だけでなく、晴【は】れました。': 'Cuaca Bertentangan: Hujan dan cerah adalah dua kondisi berlawanan, bukan penambahan fitur.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat penegasan buah perjuangan:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'この 成果【せいか】は 努力【どりょく】の 結晶【けっしょう】に ほかなりません',
          '努力【どりょく】の 結晶【けっしょう】に ほかなりません この 成果【せいか】は',
          'この 成果【せいか】は ほかなりません 努力【どりょく】の 結晶【けっしょう】に',
          '結晶【けっしょう】に この 成果【せいか】は 努力【どりょく】の ほかなりません'
        ],
        correctAnswer: 'この 成果【せいか】は 努力【どりょく】の 結晶【けっしょう】に ほかなりません',
        explanation: 'Urutan baku: Topik keberhasilan (この成果は) + nomina kepemilikan (努力の) + predikat penegasan mutlak (結晶にほかなりません).',
        diagnosticFeedback: {
          '努力【どりょく】の 結晶【けっしょう】に ほかなりません この 成果【せいか】は': 'Predikat di Depan: Meletakkan predikat di awal kalimat.',
          'この 成果【せいか】は ほかなりません 努力【どりょく】の 結晶【けっしょう】に': 'Penutup Memotong: Kata hokanarimasen ditaruh sebelum nomina penjelas.',
          '結晶【けっしょう】に この 成果【せいか】は 努力【どりょく】の ほかなりません': 'Susunan Teracak: Nomina kristal ditaruh sebelum topik subjek.'
        },
        tokens: ['この 成果【せいか】は', '努力【どりょく】の', '結晶【けっしょう】に', 'ほかなりません'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Kepercayaan Diri Berwibawa): Saat Ogawa memotivasi: 「胸を 張って 発表してください。国際的な 産学連携の 成功モデルとして、大いに アピールしましょう」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan yang menunjukkan martabat periset bilateral:',
        options: [
          '承知【しょうち】いたしました！ 日本【にほん】と インドネシアの 共同【きょうどう】研究【けんきゅう】の 意義【いぎ】を、世界【せかい】の 研究者【けんきゅうしゃ】へ 堂々【どうどう】と 伝【つた】えてまいります。',
          '緊張【きんちょう】して お腹【なか】が 痛【いた】いので、小川【おがわ】さん 一人【ひとり】で 壇上【だんじょう】に 立【た】ってください。',
          '英語【えいご】も 日本語【にほんご】も 話【はな】したくないので、スライドだけ 置【お】いて 走【はし】って 逃【に】げます。',
          'どうせ 誰【だれ】も 聴【き】いていませんから、適当【てきとう】に ３分【さんぷん】で 終【お】わらせましょう。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 日本【にほん】と インドネシアの 共同【きょうどう】研究【けんきゅう】の 意義【いぎ】を、世界【せかい】の 研究者【けんきゅうしゃ】へ 堂々【どうどう】と 伝【つた】えてまいります。',
        explanation: 'Menunjukkan wibawa saintifik (Doudou to tsutaete mairimasu) dan kebanggaan atas kolaborasi bilateral.',
        diagnosticFeedback: {
          '緊張【きんちょう】して お腹【なか】が 痛【いた】いので、小川【おがわ】さん 一人【ひとり】で 壇上【だんじょう】に 立【た】ってください。': 'Minder & Lari: Meninggalkan panggung simposium merusak nama baik institusi penelitian.',
          '英語【えいご】も 日本語【にほんご】も 話【はな】したくないので、スライドだけ 置【お】いて 走【はし】って 逃【に】げます。': 'Kekanak-kanakan: Melarikan diri dari auditorium pleno adalah tindakan amat memalukan.',
          'どうせ 誰【だれ】も 聴【き】いていませんから、適当【てきとう】に ３分【さんぷん】で 終【お】わらせましょう。': 'Meremehkan Audiens: Mengabaikan ratusan pakar internasional yang hadir menunjukkan arogansi destruktif.'
        }
      }
    ]
  }
};

// Write out file
const outContent = `// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/units-11-to-15.js
//  Bespoke Gold-Standard Content for N2 Units 11–15
// ══════════════════════════════════════════════════════════════════

module.exports = ${JSON.stringify(u11_15, null, 2)};
`;

fs.writeFileSync(targetFile, outContent, 'utf8');
console.log(`✅ units-11-to-15.js created with Unit 11!`);
