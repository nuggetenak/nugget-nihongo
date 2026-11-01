// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/build-units-16-to-17.js
//  Bespoke Gold-Standard Content for N2 Units 16–17 (4 Lessons)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'units-16-to-20.js');

const u16_17 = {
  // ─────────────────────────────────────────────────────────────
  // UNIT 16: Asumsi Hipotetis, Upaya Maksimal & Akumulasi Faktor
  // ─────────────────────────────────────────────────────────────
  'les-n2-u16-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pertimbangan batas realistis intervensi: 〜たところで (bahkan seandainya diupayakan semaksimal apa pun, hasilnya tetap sia-sia/terbatas) dan faktor pemicu kumulatif: 〜に加えて (ditambah lagi dengan faktor risiko...).',
        canDo: 'Bisa menganalisis skenario terburuk (worst-case scenario) fluktuasi kurs valuta asing dan menghitung akumulasi risiko biaya rantai pasok.',
        targetPatterns: [
          'V-ta + ところで (bahkan seandainya ... sekalipun, hasilnya tetap ...)',
          'N + に加えて (ditambah lagi dengan ... / di samping faktor ...)'
        ],
        coreVocabSample: ['かわせ', 'ヘッジ', 'きんしゅく', 'ふかくてい', 'えいきょう', 'さいあく', 'しさん', 'りすく']
      },
      sensei_context: {
        sceneIntro: 'Divisi peramalan risiko keuangan dan manajemen investasi korporat di Nihonbashi, Tokyo. Sakura (Konsultan Manajemen & Mentor Strategis) meninjau model simulasi stres keuangan bersama Budi.',
        dailyMission: 'Gunakan "ta tokorode" untuk menunjukkan batas realistis intervensi pasar jangka pendek dan "ni kuwaete" untuk memaparkan beban kumulatif.',
        whyOrder: 'Di level N2, manajemen risiko keuangan membutuhkan kejernihan berpikir tanpa ilusi: mengakui kapan suatu tindakan sudah mencapai batas efektivitasnya (ta tokorode) dan memperhitungkan efek berantai (ni kuwaete).'
      },
      cultural_notes: {
        title: 'Analisis Skenario Terburuk (ストレステストと最悪の想定) dalam Tata Kelola Finansial',
        etiquette: 'Menyajikan risiko moneter dengan angka batas realistis dan ketenangan objektif mencerminkan kedewasaan analis korporat terpercaya.',
        taboos: 'Jangan memberikan optimisme palsu kepada komite investasi bila data sensitivitas menunjukkan batas kerugian kritis.'
      },
      pronunciation_tips: {
        title: 'Intonasi Realistis "Ta Tokorode"',
        moraNote: 'Lafalkan "ta-to-ko-ro-de" dengan tempo tenang tanpa nada pesimistis buta.',
        soundTip: 'Pada "ni kuwaete", beri penekanan mora lembut pada ku-wa untuk menandai penambahan faktor.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜たところで (Hasil Skeptis Sia-sia) vs 〜ても (Pengandaian Netral)',
          caseScenario: 'Ingin mengatakan bahwa bahkan seandainya kita memohon sekarang pun, tenggat waktu bank tidak akan berubah.',
          pitfallWarning: '頼【たの】んでも、無駄【むだ】だ。 (Ragam percakapan standar kasual)',
          rightSolution: '今【いま】さら 頼【たの】み込【こ】んだ ところで、期限【きげん】は 変【か】わらない。 (Tepat: evaluasi batas kepastian)',
          explanation: '〜たところで mengandung penilaian pembicara bahwa usaha tersebut sudah terlambat atau tidak akan mengubah hasil yang terbatas.'
        },
        {
          title: 'Memakai 〜たところで untuk Hal yang Berhasil Menguntungkan',
          caseScenario: 'Memakai ta tokorode untuk usaha yang sukses besar.',
          pitfallWarning: '頑張【がんば】った ところで、合格【ごうかく】した。 (Salah total)',
          rightSolution: '頑張【がんば】った ところで、限界【げんかい】が ある。 (Tepat: hasil tetap ada batasnya)',
          explanation: 'Klausa setelah 〜たところで selalu bernada negatif, skeptis, sia-sia, atau terbatas.'
        }
      ],
      who_and_when: {
        situational_context: 'Rapat komite audit risiko keuangan, simulasi lindung nilai (hedging) valas, dan tinjauan strategi belanja modal.',
        social_relations: 'Konsultasi analisa makroekonomi antara konsultan senior (Sakura) dan analis keuangan (Budi).',
        when_not_to_use: 'Jangan gunakan pada nasihat motivasi bagi anak-anak karena dapat meruntuhkan semangat belajar.'
      },
      scenario: {
        title: 'Simulasi Stres Fluktuasi Valuta Asing Nihonbashi',
        setting: 'Ruang Analisis Kuantitatif Nihonbashi, pukul 10.30',
        narrative: 'Sakura dan Budi memodelkan dampak depresiasi yen mendadak terhadap margin laba pengadaan bahan baku baja.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、今【いま】から スポット市場【しじょう】で ドルを 買【か】い集【あつ】めた ところで、為替【かわせ】差損【さそん】を 抜本【ばっぽん】的【てき】に 防【ふせ】ぐ ことは できませんね。',
        furigana: 'ブディさん、今から スポット市場で ドルを 買い集めた ところで、為替差損を 抜本的に 防ぐ ことは できませんね。',
        romaji: 'Budi-san, ima kara supotto shijou de doru o kaiatsumeta tokoro de, kawase sason o bapponteki ni fusegu koto wa dekimasen ne.',
        idText: 'Budi, bahkan seandainya kita memborong dolar di pasar spot sekarang sekalipun, kita tetap tidak bisa mencegah kerugian selisih kurs secara mendasar ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'おっしゃる 通【とお】りです。為替【かわせ】の 急変【きゅうへん】に 加【くわ】えて、海上【かいじょう】運賃【うんちん】の 高騰【こうとう】も 重【かさ】なり、複合【ふくごう】的【てき】な 圧迫【あっぱく】要因【よういん】と なっております。',
        furigana: 'おっしゃる 通りです。為替の 急変に 加えて、海上運賃の 高騰も 重なり、複合的な 圧迫要因と なっております。',
        romaji: 'Ossharu toori desu. Kawase no kyuuhen ni kuwaete, kaijou unchin no koutou mo kasanari, fukugoutekina appaku youin to natte orimasu.',
        idText: 'Tepat seperti yang Anda sampaikan. Ditambah lagi dengan lonjakan tarif kargo laut di samping gejolak kurs mendadak, ini menjadi faktor tekanan yang berlipat ganda.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: '現実【げんじつ】を 冷静【れいせい】に 直視【ちょくし】できていますね。では、長期【ちょうき】の 為替【かわせ】予約【よやく】と サプライチェーンの 分散【ぶんさん】を 同時【どうじ】に 進【すす】めましょう。',
        furigana: '現実を 冷静に 直視できていますね。では、長期の 為替予約と サプライチェーンの 分散を 同時に 進めましょう。',
        romaji: 'Genjitsu o reisei ni chokushi dekite imasu ne. Dewa, chouki no kawase yoyaku to sapuraicheen no bunsan o douji ni susumemashou.',
        idText: 'Kamu mampu menatap kenyataan secara tenang dan jernih. Kalau begitu, mari kita jalankan kontrak forward valas jangka panjang bersamaan dengan diversifikasi rantai pasok.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ 最悪【さいあく】の シナリオを 想定【そうてい】した 上【うえ】で、強靭【きょうじん】な リスクヘッジ計画【けいかく】を 策定【さくてい】いたします。',
        furigana: '承知いたしました！ 最悪の シナリオを 想定した 上で、強靭な リスクヘッジ計画を 策定いたします。',
        romaji: 'Shouchi itashimashita! Saiaku no shinario o soutei shita ue de, kyoujinna risuku hejji keikaku o sakutei itashimasu.',
        idText: 'Dimengerti! Berlandaskan simulasi skenario terburuk, saya akan merumuskan rencana lindung nilai risiko yang tangguh.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "為替 (かわせ)" dalam mitigasi finansial?',
        sentencePrompt: 'Istilah "為替【かわせ】予約【よやく】" bermakna:',
        options: [
          'Kontrak penetapan kurs valuta asing di muka untuk mengunci nilai transaksi masa depan',
          'Pemesanan kamar hotel bintang lima untuk liburan tahun baru',
          'Penukaran uang koin receh di loket bank terdekat',
          'Pengiriman surat undangan pernikahan melalui kurir'
        ],
        correctAnswer: 'Kontrak penetapan kurs valuta asing di muka untuk mengunci nilai transaksi masa depan',
        explanation: '"為替 (かわせ)" bermakna valuta asing/kurs valas, dan 为替予約 adalah kontrak forward untuk melindungi nilai mata uang dari fluktuasi.',
        diagnosticFeedback: {
          'Pemesanan kamar hotel bintang lima untuk liburan tahun baru': 'Salah: Pemesanan kamar adalah ホテル予約 (hoteru yoyaku).',
          'Penukaran uang koin receh di loket bank terdekat': 'Salah: Penukaran uang receh adalah 両替 (ryougae).',
          'Pengiriman surat undangan pernikahan melalui kurir': 'Salah: Surat undangan adalah 招待状 (shoutaijou).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola konsesi realistis yang menyatakan kesia-siaan usaha terbatas:',
        sentencePrompt: 'いくら 弁解【べんかい】[　　]、失【うしな】われた 信用【しんらい】は 取【と】り戻【もど】せない。',
        options: [
          'した ところで',
          'した うえは',
          'する につれて',
          'した ものの'
        ],
        correctAnswer: 'した ところで',
        explanation: 'いくら + V-ta + ところで menyatakan "bahkan seandainya beralasan/membela diri sekeras apa pun, reputasi yang hilang tetap tidak bisa dikembalikan".',
        diagnosticFeedback: {
          'した うえは': 'Kekeliruan Makna: 〜上は menyatakan konsekuensi komitmen status.',
          'する につれて': 'Kekeliruan Pola: 〜につれて menyatakan perubahan proporsional seiring waktu.',
          'した ものの': 'Kekeliruan Nuansa: 〜ものの menyatakan kontras konsesif biasa, bukan penilaian skeptis kesia-siaan (ikura... tokorode).'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Akumulasi Faktor): Manakah kalimat yang menggunakan 〜に加えて secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜に加えて dengan akumulasi beban/faktor yang benar:',
        options: [
          '原材料【げんざいりょう】の 高騰【こうとう】に 加【くわ】えて、人件【じんけん】費【ひ】も 上昇【じょうしょう】している。',
          '雨【あめ】が 降【ふ】るに 加【くわ】えて、傘【かさ】を さした。',
          '朝【あさ】ご飯【はん】を 食【た】べるに 加【くわ】えて、歯【は】を 磨【みが】いた。',
          '電車【でんしゃ】が 到着【とうちゃく】するに 加【くわ】えて、乗客【じょうきゃく】が 降【お】りた。'
        ],
        correctAnswer: '原材料【げんざいりょう】の 高騰【こうとう】に 加【くわ】えて、人件【じんけん】費【ひ】も 上昇【じょうしょう】している。',
        explanation: '〜に加えて menambahkan faktor kedua yang memperberat atau memperkuat faktor pertama (di samping lonjakan harga bahan baku, biaya tenaga kerja pun naik).',
        diagnosticFeedback: {
          '雨【あめ】が 降【ふ】るに 加【くわ】えて、傘【かさ】を さした。': 'Aksi Reaktif: Memakai payung adalah reaksi atas hujan, bukan akumulasi fenomena.',
          '朝【あさ】ご飯【はん】を 食【た】べるに 加【くわ】えて、歯【は】を 磨【みが】いた。': 'Urutan Rutinitas: Sarapan lalu sikat gigi adalah urutan kebiasaan kronologis, bukan akumulasi.',
          '電車【でんしゃ】が 到着【とうちゃく】するに 加【くわ】えて、乗客【じょうきゃく】が 降【お】りた。': 'Akibat Lumrah: Penumpang turun setelah kereta tiba adalah hal lumrah.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat analisis batas intervensi:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'ドルを 買【か】い集【あつ】めた ところで 損失【そんしつ】を 防【ふせ】ぐ ことは できない',
          '損失【そんしつ】を 防【ふせ】ぐ ドルを 買【か】い集【あつ】めた ところで ことは できない',
          '防【ふせ】ぐ ことは できない ドルを 買【か】い集【あつ】めた ところで 損失【そんしつ】を',
          'ドルを 損失【そんしつ】を 買【か】い集【あつ】めた ところで 防【ふせ】ぐ ことは できない'
        ],
        correctAnswer: 'ドルを 買【か】い集【あつ】めた ところで 損失【そんしつ】を 防【ふせ】ぐ ことは できない',
        explanation: 'Urutan baku: Tindakan konsesi sia-sia (ドルを買い集めたところで) + objek risiko (損失を) + verba kemustahilan (防ぐことはできない).',
        diagnosticFeedback: {
          '損失【そんしつ】を 防【ふせ】ぐ ドルを 買【か】い集【あつ】めた ところで ことは できない': 'Sintaksis Terbelah: Objek kerugian ditaruh di awal membelah verba penutup.',
          '防【ふせ】ぐ ことは できない ドルを 買【か】い集【あつ】めた ところで 損失【そんしつ】を': 'Predikat di Depan: Meletakkan predikat kemustahilan di awal kalimat.',
          'ドルを 損失【そんしつ】を 買【か】い集【あつ】めた ところで 防【ふせ】ぐ ことは できない': 'Objek Bertumpuk: Menggabungkan partikel o berturut-turut.'
        },
        tokens: ['ドルを', '買【か】い集【あつ】めた ところで', '損失【そんしつ】を', '防【ふせ】ぐ ことは できない'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Ketahanan Risiko Finansial): Saat Sakura mengarahkan: 「長期の為替予約と サプライチェーンの分散を 同時に進めましょう」, apa respons terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang menunjukkan ketelitian perencanaan lindung nilai:',
        options: [
          '承知【しょうち】いたしました！ 最悪【さいあく】の シナリオを 想定【そうてい】した 上【うえ】で、強靭【きょうじん】な リスクヘッジ計画【けいかく】を 策定【さくてい】いたします。',
          '為替【かわせ】なんて ギャンブルですから、全額【ぜんがく】 カジノに 賭【か】けて 一発【いっぱつ】逆転【ぎゃくてん】を 狙【ねら】いましょう！',
          'お金【かね】の 計算【けいさん】は 頭【あたま】が 痛【いた】くなるので、明日【あした】から 会社【かいしゃ】を 辞【や】めます。',
          'さくらさん、会社【かいしゃ】が 倒産【とうさん】したら 倒産【とうさん】したで、別【べつ】の 会社【かいしゃ】に 転職【てんしょく】すれば いいだけですよ。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ 最悪【さいあく】の シナリオを 想定【そうてい】した 上【うえ】で、強靭【きょうじん】な リスクヘッジ計画【けいかく】を 策定【さくてい】いたします。',
        explanation: 'Menunjukkan komitmen menghadapi volatilitas pasar dengan rencana lindung nilai yang kokoh dan teruji stres.',
        diagnosticFeedback: {
          '為替【かわせ】なんて ギャンブルですから、全額【ぜんがく】 カジノに 賭【か】けて 一発【いっぱつ】逆転【ぎゃくてん】を 狙【ねら】いましょう！': 'Kriminal Spekulatif: Mempertaruhkan aset perusahaan di meja judi adalah pelanggaran hukum fiduciary duty.',
          'お金【かね】の 計算【けいさん】は 頭【あたま】が 痛【いた】くなるので、明日【あした】から 会社【かいしゃ】を 辞【や】めます。': 'Defaitis & Pengecut: Mengundurkan diri saat menghadapi perhitungan analitis mencerminkan ketidakmampuan emosional.',
          'さくらさん、会社【かいしゃ】が 倒産【とうさん】したら 倒産【とうさん】したで、別【べつ】の 会社【かいしゃ】に 転職【てんしょく】すれば いいだけですよ。': 'Ketiadaan Loyalitas: Masa bodoh terhadap kelangsungan hidup korporasi tempat bernaung merusak etika profesi.'
        }
      }
    ]
  },

  'les-n2-u16-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai pemakluman kondisi khusus yang luar biasa: 〜とあって (karena dalam situasi istimewa/kondisi khusus demikian, wajar jika...) dan konsesi skenario kompromi: 〜にしても (bahkan seandainya memperhitungkan skenario X pun, tetap...).',
        canDo: 'Bisa merumuskan kebijakan alokasi cadangan laba ditahan (retained earnings) korporasi di tengah kondisi resesi ekonomi global.',
        targetPatterns: [
          'V-plain / N + とあって (karena berada dalam situasi istimewa ... wajar jika ...)',
          'V-plain / N + にしても (bahkan seandainya ... sekalipun / bagaimanapun situasinya ...)'
        ],
        coreVocabSample: ['きんしゅく', 'ないぶりゅうほ', 'ふきょう', 'たいせい', 'ほりゅう', 'しきん', 'びちく', 'けいえい']
      },
      sensei_context: {
        sceneIntro: 'Ruang sidang dewan komisaris Nihonbashi. Sakura dan Budi mempersiapkan bahan rapat anggaran darurat di tengah guncangan pasar modal dunia.',
        dailyMission: 'Gunakan "fukyou to atte" untuk memaklumi pengetatan anggaran dan "saiken suru ni shitemo" untuk menetapkan batas realistis cadangan kas.',
        whyOrder: 'Pola ~to atte memahami konteks situasional yang melatarbelakangi suatu kebijakan darurat, sedangkan ~ni shitemo menjaga objektivitas agar kompromi tidak mengorbankan fondasi kelangsungan bisnis.'
      },
      cultural_notes: {
        title: 'Ketahanan Cadangan Internal (内部留保の意義) dan Kebijakan Pengetatan Fiskal',
        etiquette: 'Menjelaskan rasionalisasi pemotongan anggaran dengan rujukan kondisi pasar makro (to atte) mempermudah tercapainya keikhlasan bersama.',
        taboos: 'Hindari menguras cadangan kas darurat untuk proyek spekulatif berisiko tinggi saat pasar sedang lesu.'
      },
      pronunciation_tips: {
        title: 'Tempo Pemakluman Situasional',
        moraNote: 'Lafalkan "to-a-t-te" dengan sokuon tajam pada t-te.',
        soundTip: 'Pada "ni shitemo", pertahankan nada datar tenang.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜とあって (Situasi Khusus Objektif) vs 〜から (Alasan Biasa)',
          caseScenario: 'Mengatakan bahwa karena pembukaan toko perdana, wajar ramai pembeli.',
          pitfallWarning: '開店【かいてん】した から、混【こ】んでいる。 (Kalimat sebab-akibat datar biasa)',
          rightSolution: '初【はつ】の オープンと あって、大勢【おおぜい】の 客【きゃく】が 押【お】し寄【よ】せた。 (Tepat: situasi istimewa yang memicu hal wajar)',
          explanation: '〜とあって membawa nuansa bahwa situasi tersebut istimewa, langka, atau sangat khusus sehingga memicu reaksi wajar yang luar biasa.'
        },
        {
          title: 'Memakai 〜とあって untuk Alasan Diri Sendiri',
          caseScenario: 'Mengatakan alasan kemauan pribadi.',
          pitfallWarning: '私【わたし】が 眠【ねむ】いと あって、寝【ね】ました。 (Salah total)',
          rightSolution: '有名【ゆうめい】な 祭【まつ】りと あって、街【まち】は 賑【にぎ】わっている。 (Tepat: situasi publik objektif)',
          explanation: 'Subjek pemicu 〜とあって adalah situasi publik, acara besar, atau fenomena sosial objektif, bukan kondisi personal pembicara.'
        }
      ],
      who_and_when: {
        situational_context: 'Rapat anggaran dewan direksi, penjelasan kebijakan pengetatan biaya operasional, dan sidang pertanggungjawaban fiskal tahunan.',
        social_relations: 'Penyusunan rekomendasi fiskal oleh konsultan manajemen dan staf keuangan senior.',
        when_not_to_use: 'Jangan gunakan untuk alasan sepele yang terjadi setiap hari tanpa ada unsur keistimewaan.'
      },
      scenario: {
        title: 'Sidang Anggaran Darurat Pasca Guncangan Pasar Nihonbashi',
        setting: 'Ruang Rapat Dewan Komisaris Nihonbashi Lantai 20, pukul 14.00',
        narrative: 'Sakura dan Budi memaparkan alokasi cadangan kas likuid untuk menjamin kelangsungan pembayaran gaji karyawan selama 12 bulan ke depan.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: 'ブディさん、世界【せかい】的【てき】な 景気【けいき】後退【こうたい】の 局面【きょくめん】と あって、どの 企業【きぎょう】も 設備【せつび】投資【とうし】に 慎重【しんちょう】に なっていますね。',
        furigana: 'ブディさん、世界的な 景気後退の 局面と あって、どの 企業も 設備投資に 慎重に なっていますね。',
        romaji: 'Budi-san, sekai-tekina keiki koutai no kyokumen to atte, dono kigyou mo setsubi toushi ni shinchou ni natte imasu ne.',
        idText: 'Budi, karena berada dalam fase resesi ekonomi global, wajar jika perusahaan mana pun menjadi sangat berhati-hati dalam investasi fasilitas ya.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、さくらさん。新規【しんき】事業【じぎょう】を 展開【てんかい】する にしても、内部【ないぶ】留保【りゅうほ】を 確保【かくほ】した 上【うえ】で 慎重【しんちょう】に 進【すす】める 必要【ひつよう】が あります。',
        furigana: 'はい、さくらさん。新規事業を 展開する にしても、内部留保を 確保した 上で 慎重に 進める 必要が あります。',
        romaji: 'Hai, Sakura-san. Shinki jigyou o tenkai suru ni shitemo, naibu ryuuho o kakuho shita ue de shinchou ni susumeru hitsuyou ga arimasu.',
        idText: 'Ya, Sakura-san. Bahkan seandainya kita berekspansi ke bisnis baru sekalipun, kita mutlak perlu menjalankannya secara hati-hati setelah mengamankan cadangan laba internal.'
      },
      {
        id: 'd3',
        speaker: 'Sakura',
        speakerRole: 'Konsultan Manajemen',
        avatar: '👩‍🏫',
        jp: '的確【てきかく】な 判断【はんだん】です。いかに 成長【せいちょう】を 志向【しこう】する にしても、危機【きき】への 備【そな】えを 怠【おこた】っては 元【もと】も 子【こ】も ありませんからね。',
        furigana: '的確な 判断です。いかに 成長を 志向する にしても、危機への 備えを 怠っては 元も 子も ありませんからね。',
        romaji: 'Tekikakuna handan desu. Ikani seichou o shikou suru ni shitemo, kiki e no sonae o okotatte wa moto mo ko mo arimasen kara ne.',
        idText: 'Pertimbangan yang sangat tepat sasaran. Bagaimanapun kita berorientasi pada pertumbuhan sekalipun, jika melalaikan kesiapsiagaan menghadapi krisis maka semuanya akan hancur lebur.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: '承知【しょうち】いたしました！ １年間【いちねんかん】の 運転【うんてん】資金【しきん】を 完全【かんぜん】に 保守【ほしゅ】する 財務【ざいむ】計画【けいかく】を 役員【やくいん】会【かい】へ 提案【ていあん】いたします。',
        furigana: '承知いたしました！ １年間の 運転資金を 完全に 保守する 財務計画を 役員会へ 提案いたします。',
        romaji: 'Shouchi itashimashita! Ichinenkan no unten shikin o kanzen ni hoshu suru zaimu keikaku o yakuinkai e teian itashimasu.',
        idText: 'Dimengerti! Saya akan mengusulkan rencana keuangan yang mengamankan dana operasional selama satu tahun penuh kepada dewan direksi.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "内部留保 (ないぶりゅうほ)" dalam neraca korporat?',
        sentencePrompt: 'Istilah "企業【きぎょう】の 内部【ないぶ】留保【りゅうほ】" bermakna:',
        options: [
          'Akumulasi laba bersih yang ditahan dan disimpan perusahaan sebagai cadangan kas menghadapi krisis',
          'Uang palsu yang disita oleh pihak kepolisian dari sindikat kejahatan',
          'Biaya pembelian kopi dan cemilan harian untuk para tamu kantor',
          'Kupon diskon belanja pakaian musim dingin di toserba'
        ],
        correctAnswer: 'Akumulasi laba bersih yang ditahan dan disimpan perusahaan sebagai cadangan kas menghadapi krisis',
        explanation: '"内部留保 (ないぶりゅうほ)" bermakna laba ditahan (retained earnings) yang memperkokoh solvabilitas korporasi.',
        diagnosticFeedback: {
          'Uang palsu yang disita oleh pihak kepolisian dari sindikat kejahatan': 'Salah: Uang palsu adalah 偽札 (nisesatsu).',
          'Biaya pembelian kopi dan cemilan harian untuk para tamu kantor': 'Salah: Biaya jamuan adalah 会議費 (kaigihi) atau 接待費 (settaihi).',
          'Kupon diskon belanja pakaian musim dingin di toserba': 'Salah: Kupon adalah 割引クーポン.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola pemakluman situasi khusus yang wajar:',
        sentencePrompt: '初日【しょにち】の 舞台【ぶたい】挨拶【あいさつ】[　　]、会場【かいじょう】は 開場【かいじょう】前【まえ】から 熱気【ねっき】に 包【つつ】まれていた。',
        options: [
          'と あって',
          'に すぎず',
          'に ほかならず',
          'た ところで'
        ],
        correctAnswer: 'と あって',
        explanation: 'Nomina + とあって menyatakan bahwa karena situasinya adalah hari perdana sapaan panggung artis (kondisi istimewa), wajar jika gedung dipenuhi antusiasme.',
        diagnosticFeedback: {
          'に すぎず': 'Kekeliruan Makna: 〜にすぎず meremehkan acara pembukaan hari pertama.',
          'に ほかならず': 'Kekeliruan Pola: 〜にほかならない diletakkan di akhir predikat penegasan.',
          'た ところで': 'Kekeliruan Pola: 〜たところで menyatakan konsesi skeptis kesia-siaan.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Konsesi Skeptis Kompromi): Manakah kalimat yang menggunakan 〜にしても secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜にしても dengan pertimbangan kompromi yang benar:',
        options: [
          'どんなに 忙【いそが】しい にしても、報告【ほうこく】の 連絡【れんらく】くらいは 入【い】れるべきだ。',
          'どんなに 忙【いそが】しい にしても、ご飯【はん】を 食【た】べたら 美味【おい】しかった。',
          '明日【あした】 雨【あめ】が 降【ふ】る にしても、長靴【ながぐつ】を 買【か】いました。',
          '本【ほん】を 読【よ】む にしても、眠【ねむ】くなりました。'
        ],
        correctAnswer: 'どんなに 忙【いそが】しい にしても、報告【ほうこく】の 連絡【れんらく】くらいは 入【い】れるべきだ。',
        explanation: '〜にしても menyatakan bahwa bagaimanapun situasinya (sesibuk apa pun), ada batas kewajiban minimal yang mutlak tidak boleh dilanggar (tetap wajib melapor).',
        diagnosticFeedback: {
          'どんなに 忙【いそが】しい にしても、ご飯【はん】を 食【た】べたら 美味【おい】しかった。': 'Kekeliruan Rasa: Makanan enak adalah sensasi rasa, bukan tuntutan norma kewajiban ni shitemo.',
          '明日【あした】 雨【あめ】が 降【ふ】る にしても、長靴【ながぐつ】を 買【か】いました。': 'Tindakan Lampau Kasual: Membeli sepatu bot tidak selaras dengan konsesi etis.',
          '本【ほん】を 読【よ】む にしても、眠【ねむ】くなりました。': 'Reaksi Biologis: Mengantuk saat membaca adalah reaksi fisiologis normal.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat prinsip ketahanan krisis:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          'いかに 成長【せいちょう】を 志向【しこう】する にしても 備【そな】えを 怠【おこた】っては ならない',
          '備【そな】えを 怠【おこた】っては ならない いかに 成長【せいちょう】を 志向【しこう】する にしても',
          '志向【しこう】する にしても いかに 成長【せいちょう】を 備【そな】えを 怠【おこた】っては ならない',
          'いかに 備【そな】えを 成長【せいちょう】を 志向【しこう】する にしても 怠【おこた】っては ならない'
        ],
        correctAnswer: 'いかに 成長【せいちょう】を 志向【しこう】する にしても 備【そな】えを 怠【おこた】っては ならない',
        explanation: 'Urutan baku: Adverbia tingkat (いかに) + objek arah (成長を) + verba konsesi (志向するにしても) + objek kesiapan (備えを) + predikat larangan (怠ってはならない).',
        diagnosticFeedback: {
          '備【そな】えを 怠【おこた】っては ならない いかに 成長【せいちょう】を 志向【しこう】する にしても': 'Predikat di Depan: Meletakkan larangan melalaikan kesiapan di awal kalimat.',
          '志向【しこう】する にしても いかに 成長【せいちょう】を 備【そな】えを 怠【おこた】っては ならない': 'Adverbia Terpisah: Adverbia ikani terpisah dari verba shikou suru.',
          'いかに 備【そな】えを 成長【せいちょう】を 志向【しこう】する にしても 怠【おこた】っては ならない': 'Objek Tumpuk: Menggabungkan dua objek partikel o secara acak.'
        },
        tokens: ['いかに 成長【せいちょう】を', '志向【しこう】する にしても', '備【そな】えを', '怠【おこた】っては ならない'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Komitmen Manajemen Kas Krisis): Saat Sakura menegaskan: 「いかに成長を志向するにしても、危機への備えを怠っては元も子もありませんからね」, apa tindakan fiskal terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang mengamankan ketahanan kelangsungan korporat:',
        options: [
          '承知【しょうち】いたしました！ １年間【いちねんかん】の 運転【うんてん】資金【しきん】を 完全【かんぜん】に 保守【ほしゅ】する 財務【ざいむ】計画【けいかく】を 役員【やくいん】会【かい】へ 提案【ていあん】いたします。',
          '備【そな】えなんて 考【かんが】えずに、会社【かいしゃ】の 貯金【ちょきん】を 全部【ぜんぶ】 使【つか】って 豪華【ごうか】な パーティーを 開【ひら】きましょう！',
          '倒産【とうさん】する 前【まえ】に、会社【かいしゃ】の 金庫【きんこ】から 現金【げんきん】を 持【も】ち出【だ】して 山分【やまわ】けしませんか？',
          'さくらさん、景気【けいき】が 悪【わる】いのは 政治家【せいじか】の せいですから、何【なに】も せずに 文句【もんく】だけ 言【い】っていましょう。'
        ],
        correctAnswer: '承知【しょうち】いたしました！ １年間【いちねんかん】の 運転【うんてん】資金【しきん】を 完全【かんぜん】に 保守【ほしゅ】する 財務【ざいむ】計画【けいかく】を 役員【やくいん】会【かい】へ 提案【ていあん】いたします。',
        explanation: 'Menunjukkan kecakapan fiskal tingkat tinggi dengan menyiapkan rencana penjaminan kas operasional satu tahun ke dewan komisaris.',
        diagnosticFeedback: {
          '備【そな】えなんて 考【かんが】えずに、会社【かいしゃ】の 貯金【ちょきん】を 全部【ぜんぶ】 使【つか】って 豪華【ごうか】な パーティーを 開【ひら】きましょう！': 'Hambur Dana di Masa Krisis: Menguras kas untuk pesta saat resesi adalah tindakan gila dan bunuh diri korporat.',
          '倒産【とうさん】する 前【まえ】に、会社【かいしゃ】の 金庫【きんこ】から 現金【げんきん】を 持【も】ち出【だ】して 山分【やまわ】けしませんか？': 'Pencurian & Penggelapan: Mengambil uang kas perusahaan adalah tindak pidana korupsi dan penggelapan jabatan.',
          'さくらさん、景気【けいき】が 悪【わる】いのは 政治家【せいじか】の せいですから、何【なに】も せずに 文句【もんく】だけ 言【い】っていましょう。': 'Mengeluh Tanpa Aksi: Menyalahkan pihak luar tanpa mengambil langkah defensif internal mencerminkan ketidakcakapan analis.'
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 17: Penegasan Berlapis, Penyelidikan Menyeluruh & Klarifikasi
  // ─────────────────────────────────────────────────────────────
  'les-n2-u17-01': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai penegasan bertingkat ekstrem: 〜ばかりか〜さえ (bukan hanya X, bahkan sampai hal paling mendalam Y pun terkena dampak) dan klarifikasi lingkup materi investigasi: 〜に関して / 〜に関する (berkenaan dengan penyelidikan kasus/isu X).',
        canDo: 'Bisa memimpin audit forensik keamanan siber data korporat dan memaparkan laporan investigasi berlapis di depan komite tata kelola.',
        targetPatterns: [
          'V / A / Naな / N + ばかりか ... さえ (bukan hanya ... bahkan sampai ... pun)',
          'N + に関して / に関する (berkenaan dengan / terkait penyelidikan ...)'
        ],
        coreVocabSample: ['せいさ', 'こんせき', 'とうたつ', 'かいめい', 'ほうこく', 'しょうこ', 'きゅうめい', 'たいおう']
      },
      sensei_context: {
        sceneIntro: 'Ruang dengar pendapat internal komite audit mutu dan tata kelola perusahaan di Roppongi. Nakamura (Manajer SDM & Regulasi Ketenagakerjaan) meminta Budi memaparkan hasil audit forensik kebocoran kredensial jaringan.',
        dailyMission: 'Gunakan "shitsugi outou ni kanshite" untuk membatasi fokus topik audit dan "shain bakari ka torihikisaki sae" untuk menggambarkan skala dampak insiden.',
        whyOrder: 'Pola ~bakari ka ~sae menggambarkan eskalasi dampak yang melintasi perimeter biasa, sementara ~ni kanshite memusatkan perhatian dewan komite pada substansi penyelidikan tanpa melebar ke ranah spekulatif.'
      },
      cultural_notes: {
        title: 'Audit Forensik Independen (徹底的精査) dan Penegasan Lingkup Fakta',
        etiquette: 'Menyampaikan hasil audit dengan memaparkan jejak log forensik digital terotentikasi membuktikan transparansi mutlak.',
        taboos: 'Jangan mengarahkan praduga bersalah kepada staf tertentu sebelum hasil verifikasi log hash digital tuntas 100%.'
      },
      pronunciation_tips: {
        title: 'Penekanan Bertingkat "Bakari ka"',
        moraNote: 'Lafalkan "ba-ka-ri-ka" dengan aksen mantap sebelum menyambung ke partikel penegas ekstrem "sae".',
        soundTip: 'Pada "ni kanshite", pertahankan tempo datar formal.'
      },
      common_pitfalls: [
        {
          title: 'Tertukar Antara 〜ばかりか〜さえ vs 〜だけでなく〜も',
          caseScenario: 'Memilih pola penegasan eskalasi ekstrem.',
          pitfallWarning: 'Kedua pola bermakna serupa, namun 〜ばかりか〜さえ membawa nuansa dramatis bahwa hal kedua (sae) sangat tak lazim atau ekstrem melebihi batas perkiraan normal.',
          rightSolution: '社内【しゃない】ばかりか、取引先【とりひきさき】さえ 混乱【こんらん】に 巻【ま】き込【こ】まれた。 (Tepat: eskalasi ekstrem)',
          explanation: 'Gunakan ばかりか〜さえ bila hal kedua bersifat kejutan atau derajatnya jauh lebih berat/ekstrem.'
        },
        {
          title: 'Salah Partikel Modifikasi Nomina untuk 〜に関して',
          caseScenario: 'Memakai ni kanshite langsung sebelum kata benda.',
          pitfallWarning: '事件【じけん】に 関【かん】して 報告書【ほうこくしょ】 (Salah)',
          rightSolution: '事件【じけん】に 関【かん】する 報告書【ほうこくしょ】 (Tepat: Nomina + に関する + Nomina)',
          explanation: 'Bila memodifikasi kata benda berikutnya, partikel te berubah menjadi no (〜に関する).'
        }
      ],
      who_and_when: {
        situational_context: 'Sidang dengar pendapat internal dewan audit, laporan kepatuhan siber ke regulator kementerian, dan rapat klarifikasi perselisihan kontrak.',
        social_relations: 'Pemaparan investigator teknis independen di hadapan komite audit tata kelola perusahaan.',
        when_not_to_use: 'Jangan gunakan pada obrolan kasual belanjaan yang tidak memiliki unsur penyelidikan serius.'
      },
      scenario: {
        title: 'Audit Forensik Digital Tata Kelola Roppongi',
        setting: 'Ruang Sidang Komite Audit Tata Kelola Roppongi, pukul 11.00',
        narrative: 'Nakamura mendengarkan pemaparan Budi mengenai kronologi upaya peretasan brute-force yang berhasil ditangkal firewall.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: 'ブディさん、先週【せんしゅう】発生【はっせい】した 外部【がいぶ】アクセス事案【じあん】に 関【かん】して、ログの 精査【せいさ】結果【けっか】を 報告【ほうこく】してください。',
        furigana: 'ブディさん、先週発生した 外部アクセス事案に 関して、ログの 精査結果を 報告してください。',
        romaji: 'Budi-san, senshuu hassei shita gaibu akusesu ji-an ni kanshite, rogu no seisa kekka o houkoku shite kudasai.',
        idText: 'Budi, berkenaan dengan insiden upaya akses eksternal yang terjadi minggu lalu, tolong laporkan hasil audit cermat atas log sistem.'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、中村【なかむら】さん！ 侵入【しんにゅう】の 痕跡【こんせき】に 関【かん】して 徹底的【てっていてき】に 調査【ちょうさ】した 結果【けっか】、基幹【きかん】データベースへの 到達【とうたつ】は 阻止【そし】されておりました。',
        furigana: 'はい、中村さん！ 侵入の 痕跡に 関して 徹底的に 調査した 結果、基幹データベースへの 到達は 阻止されておりました。',
        romaji: 'Hai, Nakamura-san! Shinnyuu no konseki ni kanshite tetteiteki ni chousa shita kekka, kikan deetabeesu e no toutatsu wa soshi sarete orimashita.',
        idText: 'Ya, Nakamura-san! Berkenaan dengan jejak penyusupan, setelah kami selidiki secara mendalam, akses menuju basis data inti berhasil ditangkal sepenuhnya.'
      },
      {
        id: 'd3',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: '不幸中【ふこうちゅう】の 幸【さいわ】いでしたね。もし 漏えい【ろうえい】していれば、社内【しゃない】ばかりか 取引先【とりひきさき】の 信用【しんらい】さえ 失墜【しっつい】しかねませんでしたよ。',
        furigana: '不幸中の 幸いでしたね。もし 漏えいしていれば、社内ばかりか 取引先の 信用さえ 失墜しかねませんでしたよ。',
        romaji: 'Fukouchuu no saiwai deshita ne. Moshi rouei shite ireba, shanai bakari ka torihikisaki no shinrai sae shittsui shikanemasen deshita yo.',
        idText: 'Masih ada berkah di tengah musibah ya. Seandainya bocor, bukan hanya kepercayaan di internal perusahaan, bahkan kredibilitas para mitra bisnis pun bisa runtuh lho.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい。危機【きき】を 重【おも】く 受【う】け止【と】め、多要素【たようそ】認証【にんしょう】の 導入【どうにゅう】に 関【かん】する 実施【じっし】計画【けいかく】を 直【ただ】ちに 策定【さくてい】いたします。',
        furigana: 'はい。危機を 重く 受け止め、多要素認証の 導入に 関する 実施計画を 直ちに 策定いたします。',
        romaji: 'Hai. Kiki o omoku uketome, tayouso ninshou no dounyuu ni kansuru jisshi keikaku o tadachi ni sakutei itashimasu.',
        idText: 'Ya. Menyikapi krisis ini secara serius, kami akan segera merumuskan rencana implementasi terkait penerapan autentikasi multi-faktor.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "精査 (せいさ)" dalam audit investigatif?',
        sentencePrompt: 'Istilah "システムログの 精査【せいさ】" bermakna:',
        options: [
          'Pemeriksaan dan penyelidikan yang dilakukan secara amat cermat, teliti, dan mendalam',
          'Penghapusan seluruh file riwayat komputer untuk mengosongkan hard disk',
          'Pencetakan laporan di atas kertas daur ulang berwarna cokelat',
          'Pemasangan screensaver foto pemandangan pantai di komputer staf'
        ],
        correctAnswer: 'Pemeriksaan dan penyelidikan yang dilakukan secara amat cermat, teliti, dan mendalam',
        explanation: '"精査 (せいさ)" bermakna telaah cermat, audit mendalam, atau inspeksi forensik yang memeriksa detail terkecil.',
        diagnosticFeedback: {
          'Penghapusan seluruh file riwayat komputer untuk mengosongkan hard disk': 'Salah: Penghapusan adalah 削除 (sakujo) atau 消去 (shoukyo).',
          'Pencetakan laporan di atas kertas daur ulang berwarna cokelat': 'Salah: Pencetakan adalah 印刷 (insatsu).',
          'Pemasangan screensaver foto pemandangan pantai di komputer staf': 'Salah: Screensaver adalah スクリーンセーバー設定.'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola klarifikasi topik rujukan:',
        sentencePrompt: '今回【こんかい】の 不祥事【ふしょうじ】の 原因【げんいん】[　　]、徹底的【てっていてき】に 調査【ちょうさ】する。',
        options: [
          'に 関【かん】して',
          'ばかりか',
          'に とどまらず',
          'に すぎず'
        ],
        correctAnswer: 'に 関【かん】して',
        explanation: 'Nomina + に関して menyatakan topik penyelidikan: "berkenaan dengan / terkait penyebab skandal ini, kami akan menyelidiki secara tuntas".',
        diagnosticFeedback: {
          'ばかりか': 'Kekeliruan Pola: 〜ばかりか membutuhkan pembanding eskalasi kedua (sae/mo).',
          'に とどまらず': 'Kekeliruan Makna: 〜にとどまらず menyatakan perluasan skala spektrum, tidak cocok untuk penunjukan topik penyelidikan.',
          'に すぎず': 'Kekeliruan Makna: 〜にすぎず menyatakan batasan sepele.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Penegasan Bertingkat Ekstrem): Manakah kalimat yang menggunakan 〜ばかりか〜さえ secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜ばかりか〜さえ dengan eskalasi yang benar:',
        options: [
          '彼【かれ】は 漢字【かんじ】ばかりか、自分【じぶん】の 名前【なまえ】さえ 書【か】けない。',
          '彼【かれ】は 漢字【かんじ】ばかりか、ご飯【はん】さえ 食【た】べた。',
          '明日【あした】ばかりか、昨日【きのう】さえ 来【き】た。',
          '東京【とうきょう】ばかりか、朝【あさ】さえ 起【お】きた。'
        ],
        correctAnswer: '彼【かれ】は 漢字【かんじ】ばかりか、自分【じぶん】の 名前【なまえ】さえ 書【か】けない。',
        explanation: 'Bukan hanya kanji rumit (hal umum yang sulit), bahkan nama diri sendiri yang paling mendasar pun (hal ekstrem yang mestinya bisa) tidak bisa ditulis.',
        diagnosticFeedback: {
          '彼【かれ】は 漢字【かんじ】ばかりか、ご飯【はん】さえ 食【た】べた。': 'Kategori Berbeda: Menulis kanji dan makan nasi adalah dua kategori yang tidak berhubungan.',
          '明日【あした】ばかりか、昨日【きのう】さえ 来【き】た。': 'Kekeliruan Waktu: Besok dan kemarin tidak membentuk eskalasi kualitas.',
          '東京【とうきょう】ばかりか、朝【あさ】さえ 起【お】きた。': 'Ketiadaan Hubungan: Tokyo dan bangun pagi adalah dua hal acak.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat peringatan dampak reputasi:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '社内【しゃない】ばかりか 取引先【とりひきさき】の 信用【しんらい】さえ 失墜【しっつい】しかねませんでした',
          '信用【しんらい】さえ 社内【しゃない】ばかりか 取引先【とりひきさき】の 失墜【しっつい】しかねませんでした',
          '失墜【しっつい】しかねませんでした 社内【しゃない】ばかりか 取引先【とりひきさき】の 信用【しんらい】さえ',
          '社内【しゃない】ばかりか 失墜【しっつい】しかねませんでした 取引先【とりひきさき】の 信用【しんらい】さえ'
        ],
        correctAnswer: '社内【しゃない】ばかりか 取引先【とりひきさき】の 信用【しんらい】さえ 失墜【しっつい】しかねませんでした',
        explanation: 'Urutan baku: Lingkup awal (社内ばかりか) + eskalasi eksternal (取引先の信用さえ) + predikat risiko lampau (失墜しかねませんでした).',
        diagnosticFeedback: {
          '信用【しんらい】さえ 社内【しゃない】ばかりか 取引先【とりひきさき】の 失墜【しっつい】しかねませんでした': 'Partikel di Depan: Meletakkan partikel sae sebelum klausa awal.',
          '失墜【しっつい】しかねませんでした 社内【しゃない】ばかりか 取引先【とりひきさき】の 信用【しんらい】さえ': 'Predikat di Depan: Meletakkan predikat di awal kalimat.',
          '社内【しゃない】ばかりか 失墜【しっつい】しかねませんでした 取引先【とりひきさき】の 信用【しんらい】さえ': 'Sintaksis Terbelah: Verba memotong di antara dua nomina penegasan.'
        },
        tokens: ['社内【しゃない】ばかりか', '取引先【とりひきさき】の', '信用【しんらい】さえ', '失墜【しっつい】しかねませんでした'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Tanggung Jawab Pengetatan Sistem): Saat Nakamura mengingatkan: 「もし漏えいしていれば、社内ばかりか取引先の信用さえ失墜しかねませんでしたよ」, apa komitmen pengamanan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang mengutamakan penguatan benteng pertahanan digital:',
        options: [
          'はい。危機【きき】を 重【おも】く 受【う】け止【と】め、多要素【たようそ】認証【にんしょう】の 導入【どうにゅう】に 関【かん】する 実施【じっし】計画【けいかく】を 直【ただ】ちに 策定【さくてい】いたします。',
          '侵入【しんにゅう】されても データが 盗【ぬす】まれなかったなら、何【なに】も 対策【たいさく】しなくて 大丈夫【だいじょうぶ】ですよ。',
          '中村【なかむら】さん、セキュリティなんて 金【かね】食い虫【ぐいむし】ですから、ファイアウォールを 解除【かいじょ】して コストを 浮【う】かせましょう。',
          '取引先【とりひきさき】が 信用【しんらい】を 失【うしな】おうが、私【わたし】の 給料【きゅうりょう】が 出【で】れば どうでもいいです。'
        ],
        correctAnswer: 'はい。危機【きき】を 重【おも】く 受【う】け止【と】め、多要素【たようそ】認証【にんしょう】の 導入【どうにゅう】に 関【かん】する 実施【じっし】計画【けいかく】を 直【ただ】ちに 策定【さくてい】いたします。',
        explanation: 'Menyikapi krisis dengan serius dan langsung mengimplementasikan autentikasi multi-faktor (MFA) untuk membentengi sistem.',
        diagnosticFeedback: {
          '侵入【しんにゅう】されても データが 盗【ぬす】まれなかったなら、何【なに】も 対策【たいさく】しなくて 大丈夫【だいじょうぶ】ですよ。': 'Puas Diri yang Fatal: Menunda mitigasi pasca serangan awal adalah resep pasti terjadinya kebobolan fatal berikutnya.',
          '中村【なかむら】さん、セキュリティなんて 金【かね】食い虫【ぐいむし】ですから、ファイアウォールを 解除【かいじょ】して コストを 浮【う】かせましょう。': 'Tindakan Gila: Mematikan firewall sama saja dengan mengundang peretas mengacak-acak basis data.',
          '取引先【とりひきさき】が 信用【しんらい】を 失【うしな】おうが、私【わたし】の 給料【きゅうりょう】が 出【で】れば どうでもいいです。': 'Egois Mutlak: Mengabaikan kehormatan mitra dagang bertentangan dengan sumpah etika integritas bisnis.'
        }
      }
    ]
  },

  'les-n2-u17-02': {
    pedagogical_framework: {
      what: {
        summary: 'Menguasai cakupan kesepakatan umum: 〜はもちろん〜も (sudah tentu hal dasar X, demikian pula hal luas Y) dan penegasan poros perdebatan multi-pihak: 〜をめぐって / 〜をめぐる (seputar perundingan / memperdebatkan klausul X).',
        canDo: 'Bisa memimpin mediasi negosiasi service level agreement (SLA) dengan vendor pihak ketiga seputar kompensasi gangguan server.',
        targetPatterns: [
          'N + はもちろん ... も (sudah tentu ... demikian pula hal lain ...)',
          'N + をめぐって / をめぐる (seputar perdebatan / terkait pertikaian mengenai ...)'
        ],
        coreVocabSample: ['ごうい', 'せっしょう', 'たいりつ', 'かいしょう', 'ほしょう', 'じょうほ', 'きょうぎ', 'えんまん']
      },
      sensei_context: {
        sceneIntro: 'Ruang mediasi perselisihan kontrak Roppongi. Nakamura dan Budi memfasilitasi musyawarah antara divisi infrastruktur internal dan vendor penyedia jaringan serat optik.',
        dailyMission: 'Gunakan "songai baishou o megutte" untuk merangkum titik sengketa dan "koushou wa mochiron jigo taiou mo" untuk memastikan komitmen holistik.',
        whyOrder: 'Pola ~o megutte mengidentifikasi akar perselisihan atau isu sentral yang diperdebatkan banyak pihak, sementara ~wa mochiron ~mo merangkul solusi komprehensif agar kesepakatan akhir memuaskan semua pemangku kepentingan.'
      },
      cultural_notes: {
        title: 'Penyelesaian Sengketa Damai (円満解決) dan Kompensasi Berkeadilan',
        etiquette: 'Menyusun naskah mediasi dengan kalimat objektif "ryougui no kenshou o megutte" menjaga martabat kedua belah pihak tanpa saling mempermalukan di forum.',
        taboos: 'Jangan memaksakan konsesi sepihak yang mencekik arus kas vendor lokal hingga memicu kebangkrutan mitra kerja.'
      },
      pronunciation_tips: {
        title: 'Artikulasi Nada Penengah "O Megutte"',
        moraNote: 'Lafalkan "o-me-gu-t-te" dengan sokuon bersih pada t-te.',
        soundTip: 'Pada "wa mochiron", pertahankan ritme lancar percaya diri.'
      },
      common_pitfalls: [
        {
          title: 'Salah Partikel Modifikasi Nomina untuk 〜をめぐって',
          caseScenario: 'Memakai o megutte langsung sebelum kata benda.',
          pitfallWarning: '権利【けんり】を めぐって 争【あらそ】い (Kurang tepat)',
          rightSolution: '権利【けんり】を めぐる 争【あらそ】い (Tepat: Nomina + をめぐる + Nomina)',
          explanation: 'Bila memodifikasi kata benda berikutnya, partikel te berubah menjadi ru (〜をめぐる).'
        },
        {
          title: 'Memakai 〜をめぐって untuk Hal yang Bukan Perdebatan Banyak Orang',
          caseScenario: 'Menggunakan o megutte untuk keputusan satu orang di kamar tidur.',
          pitfallWarning: '私【わたし】が 何【なに】を 食【た】べるかを めぐって (Rancu)',
          rightSolution: '遺産【いさん】の 相続【そうぞく】を めぐって 親族【しんぞく】が 対立【たいりつ】した (Tepat: melibatkan banyak pihak)',
          explanation: '〜をめぐって mensyaratkan adanya polaritas pandangan, sengketa, atau diskusi yang melibatkan banyak pihak.'
        }
      ],
      who_and_when: {
        situational_context: 'Sidang mediasi perundingan sengketa bisnis, negosiasi perpanjangan kontrak vendor, dan konsensus klausul kompensasi SLA.',
        social_relations: 'Peran fasilitator netral dan negosiator ulung antara Manajer SDM/Kepatuhan dan analis kontrak.',
        when_not_to_use: 'Jangan gunakan pada perdebatan batin personal yang tidak melibatkan pihak luar.'
      },
      scenario: {
        title: 'Mediasi Rekonsiliasi SLA Serat Optik Roppongi',
        setting: 'Ruang Mediasi Kemitraan Menara Roppongi Lantai 18, pukul 16.00',
        narrative: 'Nakamura dan Budi memimpin musyawarah penetapan denda kompensasi downtime antara operator jaringan dan vendor transmisi.'
      }
    },
    dialogue: [
      {
        id: 'd1',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: 'ブディさん、先般【せんぱん】の 通信【つうしん】障害【しょうがい】の 損害【そんがい】賠償【ばいしょう】を めぐって、ベンダー側【がわ】との 協議【きょうぎ】は まとまりましたか？',
        furigana: 'ブディさん、先般の 通信障害の 損害賠償を めぐって、ベンダー側との 協議は まとまりましたか？',
        romaji: 'Budi-san, sempan no tsuushin shougai no songai baishou o megutte, bendaa-gawa to no kyougi wa matomarimashita ka?',
        idText: 'Budi, seputar perdebatan ganti rugi gangguan komunikasi beberapa waktu lalu, apakah perundingan dengan pihak vendor sudah mencapai titik temu?'
      },
      {
        id: 'd2',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい、中村【なかむら】さん！ 責任【せきにん】の 所在【しょざい】を めぐる 議論【ぎろん】を 丁寧【ていねい】に 重【かさ】ね、合理的【ごうりてき】な 減額【げんがく】基準【きじゅん】で 双務【そうむ】合意【ごうい】に 達【たっ】しました。',
        furigana: 'はい、中村さん！ 責任の 所在を めぐる 議論を 丁寧に 重ね、合理的な 減額基準で 双務合意に 達しました。',
        romaji: 'Hai, Nakamura-san! Sekinin no shozai o meguru giron o teinei ni kasane, gouritekina gengaku kijun de soumu goui ni tasshimashita.',
        idText: 'Ya, Nakamura-san! Setelah melalui diskusi mendalam secara saksama seputar letak tanggung jawab, kami telah mencapai kesepakatan bilateral atas dasar kriteria potongan biaya yang rasional.'
      },
      {
        id: 'd3',
        speaker: 'Nakamura',
        speakerRole: 'Manajer SDM & Regulasi',
        avatar: '👩‍💼',
        jp: '見事【みごと】な 折衝【せっしょう】です。金銭【きんせん】的【てき】な 補償【ほしょう】は もちろん、再発【さいはつ】防止【ぼうし】の 技術【ぎじゅつ】協力【きょうりょく】も 約束【やくそく】できたのですね。',
        furigana: '見事な 折衝です。金銭的な 補償は もちろん、再発防止の 技術協力も 約束できたのですね。',
        romaji: 'Migotona sesshou desu. Kinsentekina hoshou wa mochiron, saihatsu boushi no gijutsu kyouryoku mo yakusoku dekita no desu ne.',
        idText: 'Negosiasi yang mengagumkan. Sudah tentu kompensasi finansial disepakati, demikian pula kerja sama teknis pencegahan kekambuhan berhasil dijanjikan ya.'
      },
      {
        id: 'd4',
        speaker: 'Budi',
        speakerRole: 'Pembelajar Indonesia',
        avatar: '🙋‍♂️',
        jp: 'はい！ 今後【こんご】は パートナーシップを いっそう 強化【きょうか】し、共【とも】に 盤石【ばんじゃく】な ネットワークを 築【きず】き上【あ】げてまいります。',
        furigana: 'はい！ 今後は パートナーシップを いっそう 強化し、共に 盤石な ネットワークを 築き上げてまいります。',
        romaji: 'Hai! Kongo wa paatonaashippu o issou kyouka shi, tomo ni banjakuna nettowaaku o kizukiagete mairimasu.',
        idText: 'Ya! Ke depannya kami akan semakin memperkuat kemitraan dan bersama-sama membangun jaringan yang kokoh tanpa goyah.'
      }
    ],
    drills: [
      {
        id: 'drill-1',
        type: 'vocab_context',
        instruction: 'Langkah 1 (Arti Kosakata): Apakah makna kontekstual dari kata "折衝 (せっしょう)" dalam mediasi komersial?',
        sentencePrompt: 'Istilah "条件【じょうけん】の 折衝【せっしょう】" bermakna:',
        options: [
          'Perundingan atau negosiasi alot untuk mempertemukan kepentingan dua pihak yang saling berbeda',
          'Perkelahian fisik di jalan raya menggunakan pentungan kayu',
          'Penyobekan dokumen perjanjian menjadi serpihan kecil',
          'Tidur siang di sofa ruang tamu kantor cabang'
        ],
        correctAnswer: 'Perundingan atau negosiasi alot untuk mempertemukan kepentingan dua pihak yang saling berbeda',
        explanation: '"折衝 (せっしょう)" bermakna negosiasi, perundingan kompromi diplomatik, atau diplomasi bisnis.',
        diagnosticFeedback: {
          'Perkelahian fisik di jalan raya menggunakan pentungan kayu': 'Salah: Perkelahian adalah 乱闘 (rantou) atau 喧嘩 (kenka).',
          'Penyobekan dokumen perjanjian menjadi serpihan kecil': 'Salah: Penyobekan adalah 破棄 (haki) atau 破断 (hadan).',
          'Tidur siang di sofa ruang tamu kantor cabang': 'Salah: Tidur siang adalah 昼寝 (hirune).'
        }
      },
      {
        id: 'drill-2',
        type: 'cloze',
        instruction: 'Langkah 2 (Pola Kalimat): Lengkapi kalimat dengan pola poros perdebatan multi-pihak:',
        sentencePrompt: '新【あたら】しい 開発【かいはつ】計画【けいかく】の 是非【ぜひ】[　　]、住民【じゅうみん】の間【あいだ】で 激【はげ】しい 議論【ぎろん】が 交【か】わされた。',
        options: [
          'を めぐって',
          'は もちろん',
          'に すぎず',
          'に ほかならず'
        ],
        correctAnswer: 'を めぐって',
        explanation: 'Nomina + をめぐって menyatakan poros perdebatan: "seputar perdebatan pro-kontra rencana pembangunan baru, adu argumen sengit terjadi di kalangan warga".',
        diagnosticFeedback: {
          'は もちろん': 'Kekeliruan Pola: 〜はもちろん menyatakan sudah tentu X, tidak cocok untuk poros perdebatan.',
          'に すぎず': 'Kekeliruan Makna: 〜にすぎず menyatakan batasan remeh.',
          'に ほかならず': 'Kekeliruan Pola: 〜にほかならない diletakkan di akhir predikat penegasan mutlak.'
        }
      },
      {
        id: 'drill-3',
        type: 'trap_detect',
        instruction: 'Langkah 3 (Kaidah Cakupan Umum Inklusif): Manakah kalimat yang menggunakan 〜はもちろん〜も secara tepat?',
        sentencePrompt: 'Pilihlah kalimat yang menggunakan 〜はもちろん〜も dengan struktur yang benar:',
        options: [
          'この 料理【りょうり】は 味【あじ】は もちろん、見【み】た目【め】も 美【うつく】しい。',
          'この 料理【りょうり】は 味【あじ】は もちろん、昨日【きのう】 寝【ね】ました。',
          '雨【あめ】は もちろん、ご飯【はん】を 食【た】べました。',
          '明日【あした】は もちろん、靴【くつ】を 買【か】いました。'
        ],
        correctAnswer: 'この 料理【りょうり】は 味【あじ】は もちろん、見【み】た目【め】も 美【うつく】しい。',
        explanation: '〜はもちろん〜も menggabungkan dua kualitas yang sama-sama unggul (sudah tentu rasanya lezat, penampilannya pun indah).',
        diagnosticFeedback: {
          'この 料理【りょうり】は 味【あじ】は もちろん、昨日【きのう】 寝【ね】ました。': 'Ketiadaan Hubungan: Rasa makanan dan tidur kemarin adalah dua hal acak.',
          '雨【あめ】は もちろん、ご飯【はん】を 食【た】べました。': 'Kekeliruan Kategori: Hujan dan makan nasi tidak memiliki perbandingan kualitas.',
          '明日【あした】は もちろん、靴【くつ】を 買【か】いました。': 'Waktu Bertentangan: Besok dan membeli kemarin adalah masa yang bentrok.'
        }
      },
      {
        id: 'drill-4',
        type: 'reorder',
        instruction: 'Langkah 4 (Susun Kalimat): Susun frasa-frasa berikut menjadi kalimat pelaporan hasil mediasi:',
        sentencePrompt: 'Susunlah frasa-frasa berikut:',
        options: [
          '損害【そんがい】賠償【ばいしょう】を めぐって ベンダー側【がわ】と 協議【きょうぎ】を 重【かさ】ねた',
          'ベンダー側【がわ】と 損害【そんがい】賠償【ばいしょう】を めぐって 協議【きょうぎ】を 重【かさ】ねた',
          '協議【きょうぎ】を 重【かさ】ねた 損害【そんがい】賠償【ばいしょう】を めぐって ベンダー側【がわ】と',
          'めぐって ベンダー側【がわ】と 協議【きょうぎ】を 損害【そんがい】賠償【ばいしょう】を 重【かさ】ねた'
        ],
        correctAnswer: '損害【そんがい】賠償【ばいしょう】を めぐって ベンダー側【がわ】と 協議【きょうぎ】を 重【かさ】ねた',
        explanation: 'Urutan baku: Poros sengketa (損害賠償をめぐって) + mitra runding (ベンダー側と) + objek tindakan (協議を) + verba hasil (重ねた).',
        diagnosticFeedback: {
          'ベンダー側【がわ】と 損害【そんがい】賠償【ばいしょう】を めぐって 協議【きょうぎ】を 重【かさ】ねた': 'Urutan Kurang Baku: Lebih alami menaruh poros topik sengketa di awal kalimat.',
          '協議【きょうぎ】を 重【かさ】ねた 損害【そんがい】賠償【ばいしょう】を めぐって ベンダー側【がわ】と': 'Predikat di Depan: Meletakkan kata kerja di awal kalimat.',
          'めぐって ベンダー側【がわ】と 協議【きょうぎ】を 損害【そんがい】賠償【ばいしょう】を 重【かさ】ねた': 'Partikel di Awal: Meletakkan megutte di awal kalimat tanpa objek.'
        },
        tokens: ['損害【そんがい】賠償【ばいしょう】を', 'めぐって', 'ベンダー側【がわ】と', '協議【きょうぎ】を 重【かさ】ねた'],
        correctOrder: ['0', '1', '2', '3']
      },
      {
        id: 'drill-5',
        type: 'response',
        instruction: 'Langkah 5 (Rekonsiliasi Jangka Panjang): Saat Nakamura mengapresiasi: 「金銭的な補償はもちろん、再発防止の技術協力も約束できたのですね」, apa komitmen kemitraan terbaik Anda?',
        sentencePrompt: 'Pilihlah tanggapan profesional yang mengutamakan masa depan kolaborasi kokoh:',
        options: [
          'はい！ 今後【こんご】は パートナーシップを いっそう 強化【きょうか】し、共【とも】に 盤石【ばんじゃく】な ネットワークを 築【きず】き上【あ】げてまいります。',
          'ベンダーから お金【かね】を むしり取【と】ったので、もう あの 会社【かいしゃ】とは 金輪際【こんりんざい】 縁【えん】を 切【き】りましょう。',
          'どうせ また 障害【しょうがい】が 起【お】きますから、次【つぎ】は 裁判【さいばん】に 訴【うった】えて 倒産【とうさん】に 追【お】い込【こ】みましょう。',
          '中村【なかむら】さん、私【わたし】が 偉【えら】いので、特別【とくべつ】ボーナスとして 100万円【ひゃくまんえん】 ポケットマネーから ください。'
        ],
        correctAnswer: 'はい！ 今後【こんご】は パートナーシップを いっそう 強化【きょうか】し、共【とも】に 盤石【ばんじゃく】な ネットワークを 築【きず】き上【あ】げてまいります。',
        explanation: 'Menjaga hubungan kemitraan jangka panjang dan bertekad membangun infrastruktur jaringan yang kokoh tanpa dendam.',
        diagnosticFeedback: {
          'ベンダーから お金【かね】を むしり取【と】ったので、もう あの 会社【かいしゃ】とは 金輪際【こんりんざい】 縁【えん】を 切【き】りましょう。': 'Sikap Pemerasan: Memeras vendor dan memutus hubungan merusak ekosistem pasokan jangka panjang.',
          'どうせ また 障害【しょうがい】が 起【お】きますから、次【つぎ】は 裁判【さいばん】に 訴【うった】えて 倒産【とうさん】に 追【お】い込【こ】みましょう。': 'Pendendam & Toksik: Niat menghancurkan mitra bisnis bertentangan dengan etika mediasi korporat.',
          '中村【なかむら】さん、私【わたし】が 偉【えら】いので、特別【とくべつ】ボーナスとして 100万円【ひゃくまんえん】 ポケットマネーから ください。': 'Meminta Suap: Menuntut uang saku pribadi dari manajer setelah negosiasi adalah pelanggaran berat kode etik.'
        }
      }
    ]
  }
};

// Write out file
const outContent = `// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2/units-16-to-20.js
//  Bespoke Gold-Standard Content for N2 Units 16–20
// ══════════════════════════════════════════════════════════════════

module.exports = ${JSON.stringify(u16_17, null, 2)};
`;

fs.writeFileSync(targetFile, outContent, 'utf8');
console.log(`✅ units-16-to-20.js created with Units 16 and 17!`);
