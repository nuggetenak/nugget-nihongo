// grammar-lens-ir-a2-2.js — Irodori: Japanese for Life in Japan (Elementary 2 / A2-2)
// Book Lens: Grammar patterns per lesson, linked to GrammarGlobal
// Source: Official Irodori Grammar Notes PDF (CC BY 4.0, Japan Foundation)
// PDF: https://www.irodori.jpf.go.jp/assets/data/Grammar_all.pdf
// Total: 18 lessons (初級2 Shokyuu 2 / Elementary 2) — 62 entries
// Status: FILLED — 62 entries, all global_grammar_id links verified against grammar-n4.js / grammar-n5.js
// Generated: 2026-04-15 · Architecture v3 · Task 5 Sub-task B

window.grammarLensIrodoriA22 = {
  meta: {
    book         : 'irodori-a2-2',
    title        : 'Irodori: Japanese for Life in Japan — Elementary 2 (A2)',
    publisher    : 'Japan Foundation',
    jf_level     : 'A2',
    cefr_level   : 'A2',
    jlpt_range   : ['n4', 'n3'],
    structure    : 'lesson',
    total_lessons: 18,
    url          : 'https://www.irodori.jpf.go.jp/en/elementary02/pdf.html',
    notes        : 'Elementary 2: passive, potential advanced, conditional forms, causative intro, keigo intro, relative clauses advanced. Bridges N4→N3.',
  },

  entries: [

    // ── Lesson 1: 私の周りの人たち ① ────────────────────────────────────────
    {
      id: 'ir-a2-2-001', global_grammar_id: 'gn5-00071',
      lesson: 1, seq: 1,
      pattern: 'N1 という N2',
      raw: 'N1（名前・単語）＋という＋N2',
      desc: '<b>N1 という N2</b> digunakan untuk memperkenalkan atau menjelaskan nama/istilah yang mungkin belum diketahui lawan bicara. Artinya "N2 yang bernama/disebut N1".',
      examples: [
        { jp: '「さくら」という名前の猫がいます。', id: 'Ada kucing yang bernama "Sakura".' },
        { jp: '「いろどり」という教科書を使っています。', id: 'Kami menggunakan buku teks yang disebut "Irodori".' },
        { jp: '田中さんという人から電話がありました。', id: 'Ada telepon dari seseorang bernama Tanaka-san.' },
      ],
      notes: 'Sangat berguna saat memperkenalkan nama orang, tempat, atau benda yang tidak dikenal.',
    },
    {
      id: 'ir-a2-2-002', global_grammar_id: 'gn4-00091',
      lesson: 1, seq: 2,
      pattern: 'V-たばかりです (baru saja V)',
      raw: 'V〜た形＋ばかりです',
      desc: '<b>V-たばかり</b> menyatakan bahwa suatu tindakan <b>baru saja selesai</b> dilakukan. Menekankan kebaruan dan kesegaran waktu — biasanya hitungan menit, jam, atau hari yang sangat dekat.',
      examples: [
        { jp: '日本に来たばかりなので、まだ慣れていません。', id: 'Karena baru saja tiba di Jepang, saya belum terbiasa.' },
        { jp: 'ご飯を食べたばかりです。', id: 'Saya baru saja makan.' },
        { jp: 'この会社に入ったばかりで、覚えることがたくさんあります。', id: 'Baru saja masuk perusahaan ini, banyak hal yang perlu diingat.' },
      ],
      notes: 'Berbeda dari もうV-ました: ばかり menekankan betapa barunya tindakan tersebut. Tidak bisa digunakan untuk kejadian yang sudah lama.',
    },
    {
      id: 'ir-a2-2-003', global_grammar_id: 'gn5-00029',
      lesson: 1, seq: 3,
      pattern: 'V-ていました (sedang berlangsung di masa lalu)',
      raw: 'V〜て形＋いました（過去進行・継続状態）',
      desc: '<b>V-ていました</b> adalah bentuk lampau dari ています. Menyatakan tindakan yang <b>sedang berlangsung</b> atau <b>keadaan yang berlanjut</b> di masa lalu.',
      examples: [
        { jp: '昨日の夜、音楽を聞いていました。', id: 'Semalam saya sedang mendengarkan musik.' },
        { jp: '子どものころ、毎日泳いでいました。', id: 'Waktu kecil, saya berenang setiap hari.' },
        { jp: '3時間ずっと待っていました。', id: 'Saya menunggu selama 3 jam terus.' },
      ],
      notes: 'Penggunaan ている dalam bentuk lampau: kebiasaan atau kondisi yang berlanjut di masa lalu.',
    },

    // ── Lesson 2: 私の周りの人たち ② ────────────────────────────────────────
    {
      id: 'ir-a2-2-004', global_grammar_id: 'gn5-00026',
      lesson: 2, seq: 1,
      pattern: 'な A- です (predikat na-adjektif)',
      raw: 'な形容詞（語幹）＋です',
      desc: '<b>な-adjektif</b> digunakan sebagai predikat kalimat dengan menambahkan です. Tidak perlu menambahkan な saat posisi predikat — cukup stem + です.',
      examples: [
        { jp: 'この公園は静かです。', id: 'Taman ini tenang.' },
        { jp: '彼女はとても親切です。', id: 'Dia (perempuan) sangat baik hati.' },
        { jp: '新しい仕事は大変ですか？', id: 'Apakah pekerjaan baru itu berat?' },
      ],
      notes: 'Saat memodifikasi nomina, gunakan na + N: 静かな公園 (taman yang tenang).',
    },
    {
      id: 'ir-a2-2-005', global_grammar_id: 'gn5-00029',
      lesson: 2, seq: 2,
      pattern: 'V-ている + 人 (relative clause)',
      raw: 'V〜ている＋人／もの',
      desc: 'Klausa relatif dengan <b>V-ている</b> sebagai modifikator nomina. Menyatakan "orang yang sedang V" atau "orang yang dalam keadaan V". Urutan: klausa relatif + nomina (tanpa koma).',
      examples: [
        { jp: 'あそこで話している人は田中さんです。', id: 'Orang yang sedang berbicara di sana adalah Tanaka-san.' },
        { jp: '日本語を勉強している人が増えています。', id: 'Orang yang belajar bahasa Jepang semakin bertambah.' },
        { jp: '赤い服を着ている女の人は誰ですか？', id: 'Siapakah wanita yang mengenakan baju merah itu?' },
      ],
      notes: 'Klausa relatif selalu berada sebelum nomina yang dimodifikasi.',
    },
    {
      id: 'ir-a2-2-006', global_grammar_id: 'gn5-00076',
      lesson: 2, seq: 3,
      pattern: 'S し、〜 (beberapa alasan berganda)',
      raw: '理由1し、理由2し、（それで）結果',
      desc: '<b>〜し、〜し</b> digunakan untuk menyebutkan <b>beberapa alasan</b> sekaligus yang mendukung kesimpulan atau situasi tertentu. Lebih ringan dan natural dari から.',
      examples: [
        { jp: 'この店は安いし、おいしいし、また来たいです。', id: 'Restoran ini murah, dan enak, jadi saya ingin datang lagi.' },
        { jp: '彼は仕事もできるし、優しいし、人気があります。', id: 'Dia bisa bekerja dengan baik, dan baik hati, jadi dia populer.' },
        { jp: '今日は雨だし、疲れたし、家にいます。', id: 'Hari ini hujan, dan saya capek, jadi saya di rumah.' },
      ],
      notes: 'Bisa menyebutkan 2, 3, atau lebih alasan. Kesimpulan di akhir bisa dihilangkan jika sudah jelas dari konteks.',
    },

    // ── Lesson 3: レストランで ① ─────────────────────────────────────────────
    {
      id: 'ir-a2-2-007', global_grammar_id: 'gn5-00066',
      lesson: 3, seq: 1,
      pattern: 'S1 ので、S2 (alasan — sopan/objektif)',
      raw: 'S1（plain/丁寧）＋ので＋S2',
      desc: '<b>〜ので</b> menyatakan alasan atau sebab, mirip dengan から tetapi terdengar <b>lebih sopan dan objektif</b>. Digunakan dalam situasi formal atau saat menjelaskan sesuatu dengan nada tidak memaksa.',
      examples: [
        { jp: '今日は用事があるので、早く帰ります。', id: 'Karena hari ini ada urusan, saya akan pulang lebih awal.' },
        { jp: '体の具合が悪いので、休みたいんですが。', id: 'Karena badan tidak enak, saya ingin izin.' },
        { jp: '電車が遅れているので、少し待ってください。', id: 'Karena kereta terlambat, tolong tunggu sebentar.' },
      ],
      notes: 'ので lebih sopan dari から. Sering digunakan saat meminta maaf, izin, atau menjelaskan situasi kepada atasan.',
    },
    {
      id: 'ir-a2-2-008', global_grammar_id: 'gn5-00019',
      lesson: 3, seq: 2,
      pattern: 'S よね (konfirmasi bersama)',
      raw: 'S＋よね（同意・確認）',
      desc: '<b>〜よね</b> digunakan untuk <b>mengonfirmasi sesuatu</b> yang pembicara sudah yakin kebenarannya, sambil mengajak lawan bicara untuk setuju. Kombinasi dari よ (penegasan) dan ね (mencari persetujuan).',
      examples: [
        { jp: 'あの映画、面白かったよね。', id: 'Film itu menarik, kan?' },
        { jp: '明日は休みよね？', id: 'Besok libur, kan?' },
        { jp: 'この料理、辛いよね。', id: 'Masakan ini pedas, kan?' },
      ],
      notes: 'Berbeda dari ね saja (yang murni mencari konfirmasi). よね mengandung keyakinan lebih kuat dari pembicara.',
    },
    {
      id: 'ir-a2-2-009', global_grammar_id: 'gn5-00011',
      lesson: 3, seq: 3,
      pattern: 'N で〜 (tempat tindakan)',
      raw: '場所＋で＋V',
      desc: 'Partikel <b>で</b> menandai <b>tempat</b> di mana suatu tindakan berlangsung. Menjawab pertanyaan "di mana" tindakan itu terjadi.',
      examples: [
        { jp: 'レストランで食べます。', id: 'Saya makan di restoran.' },
        { jp: '会議室でミーティングをします。', id: 'Kami mengadakan rapat di ruang rapat.' },
        { jp: '家で日本語を練習します。', id: 'Saya berlatih bahasa Jepang di rumah.' },
      ],
      notes: 'Berbeda dari に (yang menandai keberadaan/posisi diam): 家にいます vs 家で勉強します.',
    },

    // ── Lesson 4: レストランで ② ─────────────────────────────────────────────
    {
      id: 'ir-a2-2-010', global_grammar_id: 'gn4-00035',
      lesson: 4, seq: 1,
      pattern: 'N なら、〜 (kalau soal N...)',
      raw: 'N（話題）＋なら＋アドバイス・情報',
      desc: '<b>N なら</b> digunakan untuk menerima topik yang baru saja disebutkan, lalu memberikan respons, saran, atau informasi yang relevan. Artinya "Kalau soal N…".',
      examples: [
        { jp: 'すしなら、あの店がおいしいですよ。', id: 'Kalau soal sushi, toko itu enak lho.' },
        { jp: '駅なら、あそこにありますよ。', id: 'Kalau stasiun, di sana ada.' },
        { jp: '日本語なら、毎日練習することが大切です。', id: 'Kalau soal bahasa Jepang, berlatih setiap hari itu penting.' },
      ],
      notes: 'なら sering muncul sebagai respons langsung setelah lawan bicara menyebutkan topik.',
    },
    {
      id: 'ir-a2-2-011', global_grammar_id: 'gn4-00027',
      lesson: 4, seq: 2,
      pattern: 'V-ちゃだめです (larangan kasual)',
      raw: 'V〜て形（縮約）＋だめです（ちゃ＝ては）',
      desc: '<b>V-ちゃだめ</b> adalah bentuk kasual dari V-てはいけません (tidak boleh). Digunakan dalam percakapan sehari-hari untuk melarang sesuatu secara informal.',
      examples: [
        { jp: 'ここでタバコを吸っちゃだめですよ。', id: 'Di sini tidak boleh merokok.' },
        { jp: '授業中にスマホを使っちゃだめです。', id: 'Tidak boleh menggunakan smartphone saat pelajaran.' },
        { jp: '嘘をついちゃだめだよ。', id: 'Tidak boleh bohong.' },
      ],
      notes: 'ちゃ dari kontraksi ては → ちゃ. Lebih kasual dari てはいけません.',
    },
    {
      id: 'ir-a2-2-012', global_grammar_id: 'gn5-00033',
      lesson: 4, seq: 3,
      pattern: 'V-てから、〜 (setelah V, lalu...)',
      raw: 'V〜て形＋から＋V2',
      desc: '<b>V-てから</b> menyatakan bahwa tindakan pertama <b>harus selesai terlebih dahulu</b> sebelum tindakan kedua. Menekankan urutan yang wajib.',
      examples: [
        { jp: '手を洗ってから、食べてください。', id: 'Cuci tangan dulu, baru makan.' },
        { jp: '考えてから、返事します。', id: 'Setelah dipikir dulu, baru saya balas.' },
        { jp: '日本に来てから、料理を覚えました。', id: 'Setelah datang ke Jepang, saya belajar memasak.' },
      ],
      notes: 'てから menekankan bahwa V1 adalah prasyarat yang harus tuntas.',
    },
    {
      id: 'ir-a2-2-013', global_grammar_id: 'gn5-00067',
      lesson: 4, seq: 4,
      pattern: 'S1 が、S2 (kontras — tetapi)',
      raw: 'S1＋が＋S2（逆接・対比）',
      desc: '<b>〜が</b> sebagai konjungsi menyatakan <b>kontras atau pertentangan</b> antara dua kalimat. Artinya "tetapi", "namun". Lebih sopan dari けど.',
      examples: [
        { jp: 'この店は高いですが、おいしいです。', id: 'Restoran ini mahal, tetapi enak.' },
        { jp: '行きたいですが、時間がありません。', id: 'Saya ingin pergi, tetapi tidak ada waktu.' },
        { jp: '日本語は難しいですが、面白いです。', id: 'Bahasa Jepang sulit, tetapi menarik.' },
      ],
      notes: 'が lebih formal dari けど/けれど. Juga digunakan sebagai pembuka sopan: すみませんが…',
    },

    // ── Lesson 5: 旅行に行こう ① ─────────────────────────────────────────────
    {
      id: 'ir-a2-2-014', global_grammar_id: 'gn4-00031',
      lesson: 5, seq: 1,
      pattern: 'V-(られ)ます 可能形① (bentuk potensi — dasar)',
      raw: 'V辞書形→可能形（一段：Vられる、五段：Vえる）',
      desc: '<b>Bentuk potensi</b> menyatakan kemampuan atau kemungkinan melakukan sesuatu. Ichidan verb: ganti る dengan られる. Godan verb: ubah vokal akhir ke え-row + る.',
      examples: [
        { jp: '私は漢字が読めます。', id: 'Saya bisa membaca kanji.' },
        { jp: '今日は早く帰られますか？', id: 'Apakah kamu bisa pulang lebih awal hari ini?' },
        { jp: '辛いものが食べられません。', id: 'Saya tidak bisa makan yang pedas.' },
      ],
      notes: 'Dengan potensi, objek sering menggunakan が bukan を: 日本語が話せます.',
    },
    {
      id: 'ir-a2-2-015', global_grammar_id: 'gn4-00013',
      lesson: 5, seq: 2,
      pattern: '〜ところ (momen spesifik dalam tindakan)',
      raw: 'V〜るところ／V〜ているところ／V〜たところ',
      desc: '<b>〜ところ</b> menyatakan <b>momen spesifik</b>: (1) V-るところ = tepat akan V; (2) V-ているところ = tepat sedang V; (3) V-たところ = baru saja selesai V.',
      examples: [
        { jp: 'ちょうど出かけるところです。', id: 'Saya tepat akan berangkat.' },
        { jp: '今、ご飯を食べているところです。', id: 'Sekarang tepat sedang makan.' },
        { jp: '今宿題が終わったところです。', id: 'PR baru saja selesai.' },
      ],
      notes: 'Tiga ところ menunjukkan fase berbeda: sebelum, selama, atau sesaat setelah tindakan.',
    },
    {
      id: 'ir-a2-2-016', global_grammar_id: 'gn4-00038',
      lesson: 5, seq: 3,
      pattern: '疑問詞 V-たらいいですか？ (sebaiknya bagaimana?)',
      raw: '疑問詞（どこ・いつ・どう）＋V〜たら＋いいですか',
      desc: '<b>疑問詞 〜たらいいですか</b> digunakan untuk <b>meminta saran atau rekomendasi</b>. Artinya "Sebaiknya bagaimana?"',
      examples: [
        { jp: 'どこに行ったらいいですか？', id: 'Sebaiknya saya pergi ke mana?' },
        { jp: '何を食べたらいいですか？', id: 'Sebaiknya saya makan apa?' },
        { jp: 'どうしたらいいですか？', id: 'Sebaiknya saya bagaimana?' },
      ],
      notes: 'Variasi: 〜ばいいですか (sedikit lebih formal, maknanya sama).',
    },
    {
      id: 'ir-a2-2-017', global_grammar_id: 'gn5-00028',
      lesson: 5, seq: 4,
      pattern: 'V-た (plain past — bentuk lampau biasa)',
      raw: 'V辞書形→た形（過去形・普通体）',
      desc: '<b>V-た</b> adalah bentuk lampau dalam gaya biasa (plain style). Digunakan dalam percakapan kasual, monolog, dan sebagai predikat dalam kalimat subordinat.',
      examples: [
        { jp: '昨日、映画を見た。', id: 'Kemarin, saya nonton film. (kasual)' },
        { jp: '先週、友達に会ったとき、楽しかった。', id: 'Waktu ketemu teman minggu lalu, menyenangkan.' },
        { jp: '買ったばかりのかばんをなくしました。', id: 'Saya kehilangan tas yang baru saja dibeli.' },
      ],
      notes: 'た形 dibutuhkan untuk banyak pola: たことがある、たあとで、たら、たばかり, dsb.',
    },

    // ── Lesson 6: 旅行に行こう ② ─────────────────────────────────────────────
    {
      id: 'ir-a2-2-018', global_grammar_id: 'gn4-00074',
      lesson: 6, seq: 1,
      pattern: 'V-るつもりです (berniat / berencana)',
      raw: 'V辞書形＋つもりです',
      desc: '<b>V-るつもり</b> menyatakan <b>niat atau rencana</b> yang sudah diputuskan. Lebih kuat dari したいです — mengimplikasikan keputusan pribadi yang sudah mantap.',
      examples: [
        { jp: '来年、日本語能力試験を受けるつもりです。', id: 'Tahun depan saya berencana ikut tes JLPT.' },
        { jp: '今週末は家でゆっくりするつもりです。', id: 'Akhir pekan ini saya berencana bersantai di rumah.' },
        { jp: '卒業したら、日本に行くつもりです。', id: 'Setelah lulus, saya berniat pergi ke Jepang.' },
      ],
      notes: 'Bentuk negatif: V-ないつもりです. Berbeda dari V-る予定です yang lebih formal/jadwal.',
    },
    {
      id: 'ir-a2-2-019', global_grammar_id: 'gn5-00076',
      lesson: 6, seq: 2,
      pattern: 'S し、S し、〜 (alasan berganda lebih dari dua)',
      raw: '理由1し、理由2し、理由3し、結論',
      desc: '<b>〜し、〜し</b> menyebutkan <b>beberapa alasan</b> secara bertahap untuk mendukung satu kesimpulan. Bisa menyebutkan dua atau lebih alasan.',
      examples: [
        { jp: '日本語は発音もきれいだし、文化も面白いし、ぜひ学びたいです。', id: 'Bahasa Jepang pelafalannya indah, budayanya juga menarik, jadi pasti ingin belajar.' },
        { jp: '天気もいいし、料金も安いし、この旅行は最高ですね。', id: 'Cuacanya bagus, harganya murah, perjalanan ini luar biasa ya.' },
        { jp: '近いし、安いし、この店をよく利用します。', id: 'Dekat, murah, jadi saya sering menggunakan toko ini.' },
      ],
      notes: 'Penggunaan kedua し — perbedaan hanya pada jumlah alasan. Maknanya sama dengan し pertama.',
    },
    {
      id: 'ir-a2-2-020', global_grammar_id: 'gn5-00015',
      lesson: 6, seq: 3,
      pattern: '【人】と【人数】で (bersama + jumlah orang)',
      raw: '人／グループ＋と＋人数＋で＋V',
      desc: 'Partikel <b>と</b> (bersama dengan) dikombinasikan dengan <b>人数 + で</b> untuk menyatakan dengan siapa dan berapa orang yang melakukan tindakan bersama.',
      examples: [
        { jp: '家族と3人で旅行します。', id: 'Saya bepergian bersama keluarga, bertiga.' },
        { jp: '友達と2人で映画を見ました。', id: 'Saya menonton film bersama teman, berdua.' },
        { jp: '同僚と5人で食事に行きます。', id: 'Saya makan bersama rekan kerja, berlima.' },
      ],
      notes: 'と menyatakan "bersama dengan"; で setelah 人数 menyatakan "dengan jumlah orang sebanyak itu".',
    },

    // ── Lesson 7: 地域のイベント ① ───────────────────────────────────────────
    {
      id: 'ir-a2-2-021', global_grammar_id: 'gn5-00047',
      lesson: 7, seq: 1,
      pattern: '〜たら、〜 (kondisional — jika/ketika terjadi)',
      raw: 'V〜た形＋ら＋結果／アドバイス',
      desc: '<b>〜たら</b> adalah bentuk kondisional. Menyatakan "jika/ketika V terjadi, maka...". Sering digunakan untuk kondisi yang diasumsikan akan terpenuhi.',
      examples: [
        { jp: '宿題が終わったら、遊んでいいよ。', id: 'Kalau PR sudah selesai, boleh bermain.' },
        { jp: '駅に着いたら、電話してください。', id: 'Kalau sudah sampai di stasiun, tolong telepon.' },
        { jp: '窓を開けたら、きれいな景色が見えました。', id: 'Saat membuka jendela, terlihat pemandangan yang indah.' },
      ],
      notes: 'たら fleksibel dan sangat umum. Juga untuk saran: 〜たらどうですか？',
    },
    {
      id: 'ir-a2-2-022', global_grammar_id: 'gn4-00028',
      lesson: 7, seq: 2,
      pattern: 'V-(ら)れます 受身① (bentuk pasif — dasar)',
      raw: '一段：V〜られる、五段：V〜あれる（受身形）',
      desc: '<b>Bentuk pasif</b>: subjek kalimat menerima tindakan dari pihak lain. Ichidan verb: ganti る dengan られる; Godan verb: ubah vokal akhir ke あ-row + れる.',
      examples: [
        { jp: '先生に褒められました。', id: 'Saya dipuji oleh guru.' },
        { jp: '雨に降られて、びしょぬれになりました。', id: 'Kena hujan dan jadi basah kuyup.' },
        { jp: '友達に誘われてパーティーに行きました。', id: 'Diajak teman, saya pergi ke pesta.' },
      ],
      notes: 'Pelaku tindakan menggunakan に. Pasif tidak langsung (kena dampak) juga umum.',
    },
    {
      id: 'ir-a2-2-023', global_grammar_id: 'gn4-00031',
      lesson: 7, seq: 3,
      pattern: 'V-(られ)ます 可能形② (potensi — situasi eksternal)',
      raw: '可能形の応用（状況可能・社会的許可）',
      desc: '<b>Bentuk potensi ②</b>: kemampuan berdasarkan kondisi eksternal (bukan hanya kemampuan personal). Juga menyatakan izin situasional.',
      examples: [
        { jp: 'ここでは写真が撮れます。', id: 'Di sini bisa foto (situasinya mengizinkan).' },
        { jp: '急げば間に合えます。', id: 'Kalau buru-buru masih bisa tepat waktu.' },
        { jp: '天気がよければ、富士山が見られます。', id: 'Kalau cuaca bagus, bisa melihat Gunung Fuji.' },
      ],
      notes: 'Penggunaan ② menekankan kemungkinan berdasarkan kondisi eksternal.',
    },

    // ── Lesson 8: 地域のイベント ② ───────────────────────────────────────────
    {
      id: 'ir-a2-2-024', global_grammar_id: 'gn5-00082',
      lesson: 8, seq: 1,
      pattern: 'もう V-ました (sudah selesai)',
      raw: 'もう＋V〜ました（完了・既了）',
      desc: '<b>もう V-ました</b> menyatakan bahwa suatu tindakan <b>sudah selesai</b> dilakukan. もう menambah nuansa "sudah". Negatif: まだ V-ていません.',
      examples: [
        { jp: 'もう準備しました。', id: 'Saya sudah mempersiapkan.' },
        { jp: 'レポートはもう出しましたか？', id: 'Apakah laporannya sudah dikumpulkan?' },
        { jp: 'もう昼ご飯を食べました。', id: 'Saya sudah makan siang.' },
      ],
      notes: 'Dalam kalimat tanya: もう〜ましたか (sudah belum?). Jawaban negatif: いいえ、まだです.',
    },
    {
      id: 'ir-a2-2-025', global_grammar_id: 'gn5-00083',
      lesson: 8, seq: 2,
      pattern: 'まだ V-ます / まだ V-ていません (masih / belum)',
      raw: 'まだ＋V〜ます（継続中）/ まだ＋V〜ていません（未完了）',
      desc: '<b>まだ V-ます</b> = masih melakukan V. <b>まだ V-ていません</b> = belum selesai V. Pasangan dari もう V-ました.',
      examples: [
        { jp: 'まだ仕事をしています。', id: 'Saya masih bekerja.' },
        { jp: '宿題はまだしていません。', id: 'PR belum dikerjakan.' },
        { jp: '彼はまだ来ていません。', id: 'Dia belum datang.' },
      ],
      notes: 'まだ〜ていません untuk "belum"; まだ〜ている untuk "masih".',
    },
    {
      id: 'ir-a2-2-026', global_grammar_id: 'gn4-00050',
      lesson: 8, seq: 3,
      pattern: '疑問詞 + S (plain) か、〜 (pertanyaan tersemat)',
      raw: '疑問詞（何・いつ・どこ・どう）＋S（普通体）＋か＋V',
      desc: '<b>Embedded question</b>: pertanyaan yang menjadi objek atau bagian dari kalimat lebih besar. Kata tanya + klausa (plain form) + か + kata kerja utama.',
      examples: [
        { jp: 'どこで買ったか知っていますか？', id: 'Apakah kamu tahu di mana membelinya?' },
        { jp: '何時に来るか教えてください。', id: 'Tolong beritahu saya jam berapa akan datang.' },
        { jp: 'どうすればいいかわかりません。', id: 'Saya tidak tahu harus bagaimana.' },
      ],
      notes: 'Dalam embedded question, predikat menggunakan plain form sebelum か.',
    },

    // ── Lesson 9: 年中行事とマナー ① ──────────────────────────────────────────
    {
      id: 'ir-a2-2-027', global_grammar_id: 'gn4-00048',
      lesson: 9, seq: 1,
      pattern: '〜んですか？ (mencari penjelasan)',
      raw: 'S（plain）＋んですか？（説明要求）',
      desc: '<b>〜んですか？</b> digunakan saat pembicara <b>mencari penjelasan</b> atas sesuatu yang diamati. Mengisyaratkan "Apa yang terjadi?" atau "Tolong jelaskan".',
      examples: [
        { jp: '顔色が悪いんですが、大丈夫ですか？', id: 'Mukanya pucat, apakah kamu tidak apa-apa?' },
        { jp: '何かあったんですか？', id: 'Ada sesuatu yang terjadi?' },
        { jp: '日本に来たばかりなんですか？', id: 'Apakah kamu baru saja datang ke Jepang?' },
      ],
      notes: 'んです menambah nuansa "menjelaskan/meminta penjelasan".',
    },
    {
      id: 'ir-a2-2-028', global_grammar_id: 'gn5-00023',
      lesson: 9, seq: 2,
      pattern: 'N しか + 否定文 (hanya — nuansa kurang)',
      raw: 'N＋しか＋否定動詞（〜ません／〜ない）',
      desc: '<b>N しか + 否定</b> menyatakan "hanya N (dan tidak ada lagi / itu tidak cukup)". Selalu diikuti negatif. Mengandung nuansa kekurangan atau keterbatasan.',
      examples: [
        { jp: '財布に1000円しかありません。', id: 'Di dompet hanya ada 1000 yen.' },
        { jp: '日本語しか話せません。', id: 'Saya hanya bisa berbahasa Jepang.' },
        { jp: '時間が10分しかありません。', id: 'Waktunya hanya 10 menit.' },
      ],
      notes: 'Berbeda dari だけ: しか selalu negatif dan mengandung nuansa "itu kurang/tidak ideal".',
    },
    {
      id: 'ir-a2-2-029', global_grammar_id: 'gn5-00022',
      lesson: 9, seq: 3,
      pattern: 'N だけ (hanya — netral)',
      raw: 'N＋だけ（限定・中立）',
      desc: '<b>N だけ</b> menyatakan "hanya N, tidak lebih". Bersifat netral — bisa digunakan dengan kalimat positif maupun negatif.',
      examples: [
        { jp: '一つだけ質問があります。', id: 'Saya hanya punya satu pertanyaan.' },
        { jp: '今日だけ休みです。', id: 'Hari ini saja libur.' },
        { jp: '少しだけ食べました。', id: 'Saya makan sedikit saja.' },
      ],
      notes: 'だけ: netral. しか: negatif + nuansa kekurangan. Keduanya artinya "hanya" tapi tone berbeda.',
    },
    {
      id: 'ir-a2-2-030', global_grammar_id: 'gn4-00046',
      lesson: 9, seq: 4,
      pattern: 'V-たりして、〜 (antara lain melakukan ini itu)',
      raw: 'V〜たり（して）＋V〜たり（して）します',
      desc: '<b>V-たりします</b> menyebutkan beberapa contoh tindakan (tidak komprehensif). "Antara lain melakukan ini dan itu".',
      examples: [
        { jp: '週末は映画を見たり、買い物をしたりします。', id: 'Akhir pekan antara lain nonton film, dan belanja.' },
        { jp: '日本の文化を調べたり、料理を習ったりしています。', id: 'Antara lain mencari tahu budaya Jepang, dan belajar memasak.' },
        { jp: '歌を歌ったりして楽しみます。', id: 'Saya bersenang-senang antara lain dengan bernyanyi.' },
      ],
      notes: 'たりして menekankan bahwa contoh yang disebutkan hanyalah sebagian. Selalu diakhiri します/しました.',
    },
    {
      id: 'ir-a2-2-031', global_grammar_id: 'gn4-00024',
      lesson: 9, seq: 5,
      pattern: 'V-なくちゃならない (harus V — kasual)',
      raw: 'V〜なくては＋ならない（縮約：なくちゃ）',
      desc: '<b>V-なくちゃならない</b> adalah bentuk kasual dari V-なければなりません. なくちゃ adalah kontraksi dari なくては.',
      examples: [
        { jp: '明日早く起きなくちゃならない。', id: 'Besok harus bangun pagi.' },
        { jp: 'この書類を今日中に出さなくちゃならないんです。', id: 'Dokumen ini harus dikumpulkan hari ini.' },
        { jp: '日本語をもっと練習しなくちゃ。', id: 'Harus lebih banyak berlatih bahasa Jepang.' },
      ],
      notes: 'なくちゃ saja (tanpa ならない) juga umum. Lebih formal: なければなりません.',
    },

    // ── Lesson 10: 年中行事とマナー ② ─────────────────────────────────────────
    {
      id: 'ir-a2-2-032', global_grammar_id: 'gn4-00038',
      lesson: 10, seq: 1,
      pattern: '疑問詞 V-ばいいですか？ (sebaiknya bagaimana — formal)',
      raw: '疑問詞＋V〜ば形＋いいですか',
      desc: '<b>〜ばいいですか</b> digunakan untuk meminta <b>saran atau panduan</b>. Sedikit lebih formal dari 〜たらいいですか, keduanya bermakna sama.',
      examples: [
        { jp: 'どうすればいいですか？', id: 'Sebaiknya saya bagaimana?' },
        { jp: 'どこに行けばいいですか？', id: 'Sebaiknya pergi ke mana?' },
        { jp: '何を持っていけばいいですか？', id: 'Sebaiknya membawa apa?' },
      ],
      notes: 'Sama maknanya dengan 〜たらいいですか.',
    },
    {
      id: 'ir-a2-2-033', global_grammar_id: 'gn4-00027',
      lesson: 10, seq: 2,
      pattern: 'V-ては〜 (larangan — akar pola formal)',
      raw: 'V〜て形＋は＋いけません／なりません／だめです',
      desc: '<b>V-ては</b> adalah akar dari pola larangan. Dikombinasikan dengan いけません, なりません, atau だめです dengan tingkat formalitas berbeda.',
      examples: [
        { jp: 'ここに入ってはいけません。', id: 'Dilarang masuk ke sini.' },
        { jp: '授業中に食べてはなりません。', id: 'Tidak boleh makan saat pelajaran.' },
        { jp: 'うそをついてはだめです。', id: 'Tidak boleh berbohong.' },
      ],
      notes: 'Formalitas: てはなりません > てはいけません > てはだめ/ちゃだめ.',
    },
    {
      id: 'ir-a2-2-034', global_grammar_id: 'gn4-00024',
      lesson: 10, seq: 3,
      pattern: 'V-なくちゃ (harus — sangat kasual)',
      raw: 'V〜なくちゃ（口語縮約形・単独使用）',
      desc: '<b>V-なくちゃ</b> adalah bentuk paling kasual dari "harus". Sering diucapkan sendiri tanpa ならない.',
      examples: [
        { jp: 'もう行かなくちゃ！', id: 'Harus pergi sekarang!' },
        { jp: '早く決めなくちゃ。', id: 'Harus cepat memutuskan.' },
        { jp: '宿題やらなくちゃ…', id: 'Harus ngerjain PR...' },
      ],
      notes: 'Dalam percakapan, なくちゃ saja sudah cukup.',
    },
    {
      id: 'ir-a2-2-035', global_grammar_id: 'gn4-00028',
      lesson: 10, seq: 4,
      pattern: 'V-(ら)れます 受身② (pasif — dampak tidak langsung)',
      raw: '受身形の応用（間接受身・迷惑受身）',
      desc: '<b>Pasif ②</b>: pasif tidak langsung — subjek terkena dampak negatif dari tindakan orang lain, meskipun bukan objek langsung. Disebut "迷惑の受身".',
      examples: [
        { jp: '隣の人に話しかけられて、集中できませんでした。', id: 'Karena diajak bicara orang sebelah, saya tidak bisa konsentrasi.' },
        { jp: '夜中に子どもに泣かれて、眠れませんでした。', id: 'Karena anak menangis tengah malam, saya tidak bisa tidur.' },
        { jp: '電車で足を踏まれました。', id: 'Kaki saya diinjak di kereta.' },
      ],
      notes: 'Pasif kerugian: subjek terkena dampak negatif dari tindakan orang lain.',
    },

    // ── Lesson 11: 上手な買い物 ① ────────────────────────────────────────────
    {
      id: 'ir-a2-2-036', global_grammar_id: 'gn4-00025',
      lesson: 11, seq: 1,
      pattern: 'V-てみてもいいですか？ (bolehkah saya mencoba V?)',
      raw: 'V〜て形＋みて＋もいいですか',
      desc: 'Kombinasi <b>V-てみる</b> (mencoba V) dan <b>〜てもいいですか</b> (bolehkah?). Meminta izin mencoba sesuatu dengan sopan.',
      examples: [
        { jp: 'この服を着てみてもいいですか？', id: 'Bolehkah saya mencoba baju ini?' },
        { jp: 'ちょっと食べてみてもいいですか？', id: 'Bolehkah saya mencoba sedikit?' },
        { jp: 'このソフトを使ってみてもいいですか？', id: 'Bolehkah saya mencoba software ini?' },
      ],
      notes: 'Sering dipakai saat belanja atau di situasi percobaan.',
    },
    {
      id: 'ir-a2-2-037', global_grammar_id: 'gn5-00026',
      lesson: 11, seq: 2,
      pattern: 'な A- な (atributif — memodifikasi nomina)',
      raw: 'な形容詞（語幹）＋な＋N',
      desc: '<b>な-adjektif</b> dalam posisi atributif membutuhkan な di antara adjektif dan nomina. Berbeda dari posisi predikat yang tidak membutuhkan な.',
      examples: [
        { jp: '静かな部屋が好きです。', id: 'Saya suka kamar yang tenang.' },
        { jp: '便利な道具を買いました。', id: 'Saya membeli alat yang praktis.' },
        { jp: '有名なレストランに行きました。', id: 'Saya pergi ke restoran yang terkenal.' },
      ],
      notes: 'Predikat: 部屋は静かです. Atributif: 静かな部屋. Ini perbedaan fundamental な-adjektif.',
    },
    {
      id: 'ir-a2-2-038', global_grammar_id: 'gn4-00028',
      lesson: 11, seq: 3,
      pattern: 'N を V-(ら)れます 受身③ (pasif langsung)',
      raw: 'N（対象）＋を＋V〜受身形',
      desc: '<b>Pasif ③</b>: pasif langsung di mana objek kalimat aktif diangkat menjadi subjek pasif. Ini pola pasif paling umum.',
      examples: [
        { jp: '財布を盗まれました。', id: 'Dompet saya dicuri.' },
        { jp: '大切な書類をなくされました。', id: 'Dokumen penting saya dihilangkan.' },
        { jp: '先生にレポートを褒められました。', id: 'Laporan saya dipuji oleh guru.' },
      ],
      notes: 'Dalam pasif langsung, を tetap dipakai menandai objek.',
    },
    {
      id: 'ir-a2-2-039', global_grammar_id: 'gn5-00079',
      lesson: 11, seq: 4,
      pattern: 'S (plain) かもしれません (mungkin saja)',
      raw: 'S（plain）＋かもしれません',
      desc: '<b>〜かもしれません</b> menyatakan kemungkinan atau ketidakpastian. Artinya "mungkin", "bisa jadi". Derajat kepastian lebih rendah dari でしょう.',
      examples: [
        { jp: '明日は雨かもしれません。', id: 'Besok mungkin hujan.' },
        { jp: '彼は来ないかもしれません。', id: 'Bisa jadi dia tidak datang.' },
        { jp: 'もう終わったかもしれません。', id: 'Mungkin sudah selesai.' },
      ],
      notes: 'Kasual: かもしれない / かも.',
    },

    // ── Lesson 12: 上手な買い物 ② ────────────────────────────────────────────
    {
      id: 'ir-a2-2-040', global_grammar_id: 'gn4-00092',
      lesson: 12, seq: 1,
      pattern: 'V-るまで、〜 (sampai V terjadi)',
      raw: 'V辞書形＋まで＋V2（継続・待機）',
      desc: '<b>V-るまで</b> menyatakan <b>batas akhir waktu</b> dari suatu kondisi atau tindakan — "sampai/hingga V terjadi".',
      examples: [
        { jp: '電車が来るまでここで待ってください。', id: 'Tolong tunggu di sini sampai kereta datang.' },
        { jp: '試験が終わるまで帰れません。', id: 'Saya tidak bisa pulang sampai ujian selesai.' },
        { jp: '準備ができるまで少し待ってください。', id: 'Tolong tunggu sebentar sampai persiapan selesai.' },
      ],
      notes: 'V-るまで menekankan proses yang berlanjut hingga titik akhir tertentu.',
    },
    {
      id: 'ir-a2-2-041', global_grammar_id: 'gn4-00044',
      lesson: 12, seq: 2,
      pattern: 'V-やすいです (mudah untuk V)',
      raw: 'V〜ます語幹＋やすい',
      desc: '<b>V-やすい</b> menyatakan bahwa sesuatu <b>mudah untuk dilakukan</b>. Dibentuk dari ます-stem + やすい. Kebalikannya: V-にくい.',
      examples: [
        { jp: 'この靴は歩きやすいです。', id: 'Sepatu ini mudah untuk berjalan.' },
        { jp: 'このソフトは使いやすいです。', id: 'Software ini mudah digunakan.' },
        { jp: 'この説明は分かりやすいです。', id: 'Penjelasan ini mudah dipahami.' },
      ],
      notes: 'やすい berperilaku seperti い-adjektif. Pasangan: にくい.',
    },
    {
      id: 'ir-a2-2-042', global_grammar_id: 'gn5-00058',
      lesson: 12, seq: 3,
      pattern: 'N1 と N2、どちら／どっちが〜ですか？ (perbandingan dua)',
      raw: 'N1 と N2（と）、どちら・どっちが＋い形／な形＋ですか',
      desc: '<b>どちら／どっち</b> digunakan untuk <b>membandingkan dua pilihan</b>. どちら lebih sopan, どっち lebih kasual.',
      examples: [
        { jp: '電車とバス、どちらが速いですか？', id: 'Kereta dan bus, mana yang lebih cepat?' },
        { jp: '夏と冬、どっちが好きですか？', id: 'Musim panas dan musim dingin, mana yang lebih suka?' },
        { jp: 'AとB、どちらにしますか？', id: 'A dan B, mana yang akan dipilih?' },
      ],
      notes: 'Setelah memilih, biasanya dijawab: 〜のほうが〜です.',
    },

    // ── Lesson 13: さまざまなサービス ① ────────────────────────────────────────
    {
      id: 'ir-a2-2-043', global_grammar_id: 'gn4-00028',
      lesson: 13, seq: 1,
      pattern: 'V-(ら)れます 受身④ (pasif — konteks formal/pelayanan)',
      raw: '受身形（サービス・案内・公的場面）',
      desc: '<b>Pasif ④</b>: Penggunaan pasif dalam konteks formal, pelayanan, atau pengumuman. Bahasa Jepang sering menggunakan pasif untuk pernyataan resmi dan instruksi layanan.',
      examples: [
        { jp: 'ご予約はこちらで承られます。', id: 'Reservasi dapat dilakukan di sini.' },
        { jp: 'お荷物はカウンターで受け取られます。', id: 'Barang bawaan dapat diambil di counter.' },
        { jp: '詳しい情報は係員から説明されます。', id: 'Informasi detail akan dijelaskan oleh petugas.' },
      ],
      notes: 'Dalam konteks formal dan layanan publik, pasif digunakan untuk kesan profesional.',
    },
    {
      id: 'ir-a2-2-044', global_grammar_id: 'gn4-00018',
      lesson: 13, seq: 2,
      pattern: 'V-てあります (sudah di-V — keadaan hasil disengaja)',
      raw: 'V〜て形＋あります（意図的な結果状態）',
      desc: '<b>V-てあります</b> menyatakan bahwa seseorang <b>sengaja melakukan V</b> sehingga sekarang ada keadaan/hasil tertentu. Menekankan persiapan yang sudah dilakukan.',
      examples: [
        { jp: '窓が開けてあります。', id: 'Jendela sudah (sengaja) dibuka.' },
        { jp: '料理はもう作ってあります。', id: 'Makanan sudah disiapkan.' },
        { jp: '予約してありますので、すぐに入れます。', id: 'Sudah dipesan, jadi bisa langsung masuk.' },
      ],
      notes: '窓が開いています (kebetulan terbuka) vs 窓が開けてあります (sengaja dibuka).',
    },
    {
      id: 'ir-a2-2-045', global_grammar_id: 'gn4-00081',
      lesson: 13, seq: 3,
      pattern: 'N1 だけじゃなくて、N2 も〜 (bukan hanya N1, tapi juga N2)',
      raw: 'N1＋だけじゃなくて＋N2＋も＋V／A',
      desc: '<b>〜だけじゃなくて〜も</b> menyatakan "bukan hanya N1, tetapi juga N2". Menambahkan informasi atau memperluas cakupan dari yang sudah disebutkan.',
      examples: [
        { jp: '英語だけじゃなくて、日本語も話せます。', id: 'Bukan hanya bahasa Inggris, tapi juga bisa bahasa Jepang.' },
        { jp: '料理だけじゃなくて、掃除も手伝います。', id: 'Bukan hanya memasak, tapi juga membantu bersih-bersih.' },
        { jp: '体にいいだけじゃなくて、おいしいです。', id: 'Bukan hanya baik untuk tubuh, tapi juga enak.' },
      ],
      notes: 'じゃなくて kasual dari ではなくて. Formal: だけでなく〜も.',
    },
    {
      id: 'ir-a2-2-046', global_grammar_id: 'gn4-00035',
      lesson: 13, seq: 4,
      pattern: 'N なら、〜 (saran/info terkait topik)',
      raw: 'N（話題）＋なら＋V（推薦・情報）',
      desc: 'Penggunaan kedua <b>なら</b>: merespons topik dengan memberikan saran atau informasi. "Kalau soal N itu..."',
      examples: [
        { jp: '京都なら、金閣寺がおすすめです。', id: 'Kalau Kyoto, Kuil Kinkaku-ji direkomendasikan.' },
        { jp: '日本語の勉強なら、毎日練習が大切です。', id: 'Kalau belajar bahasa Jepang, berlatih setiap hari itu penting.' },
        { jp: 'パソコンの修理なら、あのお店に行ってみてください。', id: 'Kalau soal reparasi komputer, coba pergi ke toko itu.' },
      ],
      notes: 'なら muncul natural saat merespons kebutuhan atau situasi lawan bicara.',
    },
    {
      id: 'ir-a2-2-047', global_grammar_id: 'gn4-00037',
      lesson: 13, seq: 5,
      pattern: '疑問詞 V-ても、〜 (tidak peduli apa/siapa — tetap...)',
      raw: '疑問詞（何・どこ・誰・いつ）＋V〜ても＋V2',
      desc: '<b>疑問詞 〜ても</b> menyatakan "tidak peduli [apa/siapa/di mana/kapan], hasilnya tetap sama".',
      examples: [
        { jp: '何を食べても太りません。', id: 'Makan apa pun tidak gemuk.' },
        { jp: 'どこに行っても日本語が通じました。', id: 'Di mana pun pergi, bahasa Jepang tetap bisa digunakan.' },
        { jp: '誰に聞いても同じ答えでした。', id: 'Ditanya kepada siapa pun, jawabannya sama.' },
      ],
      notes: 'Pola: 疑問詞 + ても = tidak peduli [kata tanya].',
    },

    // ── Lesson 14: さまざまなサービス ② ────────────────────────────────────────
    {
      id: 'ir-a2-2-048', global_grammar_id: 'gn5-00084',
      lesson: 14, seq: 1,
      pattern: 'な A- に (na-adjektif → adverbia)',
      raw: 'な形容詞（語幹）＋に（副詞的用法）',
      desc: 'Menambahkan <b>に</b> setelah na-adjektif mengubahnya menjadi <b>adverbia</b> yang memodifikasi kata kerja. Setara dengan "-ly" dalam bahasa Inggris.',
      examples: [
        { jp: '丁寧に書いてください。', id: 'Tolong tulis dengan rapi.' },
        { jp: '静かに話してください。', id: 'Tolong berbicara dengan tenang.' },
        { jp: '親切に教えてもらいました。', id: 'Saya diajari dengan baik hati.' },
      ],
      notes: 'な-adjektif + に = adverbia. い-adjektif + く = adverbia. Contoh: 早い→早く; 静か→静かに.',
    },
    {
      id: 'ir-a2-2-049', global_grammar_id: 'gn4-00042',
      lesson: 14, seq: 2,
      pattern: 'N のために、〜 (demi N / untuk kepentingan N)',
      raw: 'N＋のために＋V（利益・目的）',
      desc: '<b>N のために</b> menyatakan tujuan atau kepentingan — "demi N" atau "untuk kepentingan N". Fokus pada penerima manfaat.',
      examples: [
        { jp: '家族のために働いています。', id: 'Saya bekerja demi keluarga.' },
        { jp: '健康のために毎日運動しています。', id: 'Untuk kesehatan, saya olahraga setiap hari.' },
        { jp: '子どものために貯金しています。', id: 'Saya menabung untuk anak.' },
      ],
      notes: 'N のために = demi/untuk kepentingan N. V-るために = tujuan tindakan (untuk bisa V).',
    },

    // ── Lesson 15: 自然と環境 ① ──────────────────────────────────────────────
    {
      id: 'ir-a2-2-050', global_grammar_id: 'gn4-00086',
      lesson: 15, seq: 1,
      pattern: 'V-たままです (tetap dalam keadaan V)',
      raw: 'V〜た形＋まま（状態の継続）',
      desc: '<b>V-たまま</b> menyatakan bahwa keadaan hasil dari tindakan V <b>tetap berlanjut</b> tanpa perubahan. "Tetap dalam keadaan [setelah V]".',
      examples: [
        { jp: '靴を履いたまま家に入ってしまいました。', id: 'Tanpa disadari masuk rumah dengan sepatu masih dipakai.' },
        { jp: '電気をつけたまま寝てしまいました。', id: 'Saya tidur dengan lampu tetap menyala.' },
        { jp: 'ドアを開けたまま出かけました。', id: 'Saya keluar dengan pintu tetap terbuka.' },
      ],
      notes: 'まま menekankan keadaan yang seharusnya berubah justru tetap. Sering ada nuansa ceroboh.',
    },
    {
      id: 'ir-a2-2-051', global_grammar_id: 'gn4-00051',
      lesson: 15, seq: 2,
      pattern: 'V-るのにいいです (bagus/berguna untuk V)',
      raw: 'V辞書形＋のに＋いい／便利／役に立ちます',
      desc: '<b>V-るのに</b> menggunakan の sebagai nominalisasi dan に sebagai penanda kegunaan/tujuan. "Bagus/berguna untuk tujuan V".',
      examples: [
        { jp: 'この辞書は日本語を勉強するのに役に立ちます。', id: 'Kamus ini berguna untuk belajar bahasa Jepang.' },
        { jp: 'この道は散歩するのにいいです。', id: 'Jalan ini bagus untuk berjalan santai.' },
        { jp: 'このアプリは旅行するのに便利です。', id: 'Aplikasi ini praktis untuk bepergian.' },
      ],
      notes: 'V-るのに = "untuk [tujuan V]". の menominalisasi klausa, に menandai tujuan.',
    },

    // ── Lesson 16: 自然と環境 ② ──────────────────────────────────────────────
    {
      id: 'ir-a2-2-052', global_grammar_id: 'gn4-00056',
      lesson: 16, seq: 1,
      pattern: 'V 命令形 (bentuk imperatif/perintah)',
      raw: 'V命令形（一段：Vろ、五段：Vえ段）',
      desc: '<b>Bentuk imperatif</b> digunakan dalam konteks darurat, instruksi tegas, atau papan tanda. Sangat langsung dan kuat — hindari dalam percakapan biasa.',
      examples: [
        { jp: '早く逃げろ！', id: 'Cepat lari!' },
        { jp: '止まれ！', id: 'Berhenti!' },
        { jp: '火事だ！逃げろ！', id: 'Kebakaran! Lari!' },
      ],
      notes: 'Imperatif sangat kasar dalam percakapan normal. Dipakai darurat, papan tanda, atau komik/anime.',
    },
    {
      id: 'ir-a2-2-053', global_grammar_id: 'gn4-00041',
      lesson: 16, seq: 2,
      pattern: 'V-ないようにしてください (tolong usahakan jangan V)',
      raw: 'V〜ない形＋ようにしてください',
      desc: '<b>V-ないようにして</b> menyatakan permintaan agar seseorang <b>berusaha tidak melakukan V</b>. Lebih sopan dari larangan langsung.',
      examples: [
        { jp: '遅刻しないようにしてください。', id: 'Tolong usahakan jangan terlambat.' },
        { jp: 'プラスチックを使わないようにしています。', id: 'Saya berusaha tidak menggunakan plastik.' },
        { jp: '夜遅く食べないようにしてください。', id: 'Tolong usahakan jangan makan larut malam.' },
      ],
      notes: 'ようにする = berusaha agar. ようになる = menjadi terbiasa (alami). Keduanya berbeda.',
    },
    {
      id: 'ir-a2-2-054', global_grammar_id: 'gn4-00040',
      lesson: 16, seq: 3,
      pattern: 'V-(られ)なくなります (menjadi tidak bisa V)',
      raw: 'V〜可能形＋なくなります（能力・状況の変化）',
      desc: '<b>〜なくなります</b> menyatakan <b>perubahan menuju ketidakmampuan</b> atau hilangnya kondisi. "Menjadi tidak bisa V" atau "tidak lagi V".',
      examples: [
        { jp: '環境が悪化すれば、魚が住めなくなります。', id: 'Jika lingkungan memburuk, ikan tidak akan bisa hidup lagi.' },
        { jp: '忙しくて、趣味ができなくなりました。', id: 'Karena sibuk, saya jadi tidak bisa melakukan hobi.' },
        { jp: '目が悪くなって、細かい字が読めなくなりました。', id: 'Penglihatan memburuk dan tidak bisa membaca huruf kecil lagi.' },
      ],
      notes: 'Pasangan: V-るようになります (perubahan positif). なくなる = perubahan negatif.',
    },
    {
      id: 'ir-a2-2-055', global_grammar_id: 'gn4-00037',
      lesson: 16, seq: 4,
      pattern: 'S ても、〜 (meskipun S — tetap)',
      raw: 'V〜て形＋も／い形〜くても／な形＋でも',
      desc: '<b>〜ても</b> adalah bentuk konsesif — "meskipun S, tetap [hasil]". Kondisi S tidak mengubah hasil.',
      examples: [
        { jp: '雨が降っても、試合は行います。', id: 'Meskipun hujan, pertandingan tetap dilakukan.' },
        { jp: '高くても、買いたいです。', id: 'Meskipun mahal, saya ingin membeli.' },
        { jp: '疲れていても、毎日練習します。', id: 'Meskipun capek, saya berlatih setiap hari.' },
      ],
      notes: 'ても sangat umum untuk menyatakan tekad atau situasi tak terduga.',
    },
    {
      id: 'ir-a2-2-056', global_grammar_id: 'gn4-00049',
      lesson: 16, seq: 5,
      pattern: 'V (plain) かどうか、〜 (apakah V atau tidak)',
      raw: 'S（plain）＋かどうか＋V（判断・確認）',
      desc: '<b>〜かどうか</b> menyatakan ketidakpastian atau pertanyaan ya/tidak yang tersemat. "Apakah [S] atau tidak".',
      examples: [
        { jp: '行くかどうかまだ決めていません。', id: 'Apakah akan pergi atau tidak, belum diputuskan.' },
        { jp: '彼が来るかどうか確認してください。', id: 'Tolong konfirmasi apakah dia akan datang atau tidak.' },
        { jp: '本当かどうかわかりません。', id: 'Saya tidak tahu apakah itu benar atau tidak.' },
      ],
      notes: 'かどうか untuk ya/tidak. Kata tanya + か untuk embedded questions dengan kata tanya.',
    },

    // ── Lesson 17: 私の人生 ① ─────────────────────────────────────────────────
    {
      id: 'ir-a2-2-057', global_grammar_id: 'gn4-00040',
      lesson: 17, seq: 1,
      pattern: 'V-(られ)るようになりました (menjadi bisa V)',
      raw: 'V〜可能形＋ようになりました（変化・習得）',
      desc: '<b>〜ようになりました</b> menyatakan <b>perubahan menuju kemampuan baru</b>. "Menjadi bisa V" — sering digunakan untuk menggambarkan kemajuan belajar.',
      examples: [
        { jp: '日本語が少し話せるようになりました。', id: 'Saya sudah menjadi bisa berbicara sedikit bahasa Jepang.' },
        { jp: '一人で電車に乗れるようになりました。', id: 'Saya sudah bisa naik kereta sendiri.' },
        { jp: '辛い料理が食べられるようになりました。', id: 'Saya sudah bisa makan makanan pedas.' },
      ],
      notes: 'ようになる = perubahan alami/bertahap. Sangat umum saat berbicara tentang progres belajar bahasa.',
    },

    // ── Lesson 18: 私の人生 ② ─────────────────────────────────────────────────
    {
      id: 'ir-a2-2-058', global_grammar_id: 'gn4-00075',
      lesson: 18, seq: 1,
      pattern: 'V-(よ)うと思います／思っています (berniat / berencana)',
      raw: 'V〜意向形＋と思います・と思っています',
      desc: '<b>V-(よ)うと思います</b> = niat yang baru terbentuk. <b>と思っています</b> = niat yang sudah ada sejak beberapa waktu lalu.',
      examples: [
        { jp: '来年、日本に行こうと思っています。', id: 'Saya berencana pergi ke Jepang tahun depan.' },
        { jp: '毎日日記を書こうと思います。', id: 'Saya berniat menulis buku harian setiap hari.' },
        { jp: '転職しようと思っています。', id: 'Saya sedang memikirkan untuk ganti pekerjaan.' },
      ],
      notes: 'と思います = keputusan baru. と思っています = niat yang sudah lama dipertimbangkan.',
    },
    {
      id: 'ir-a2-2-059', global_grammar_id: 'gn4-00042',
      lesson: 18, seq: 2,
      pattern: 'V-るために、〜 (untuk bisa V / demi V)',
      raw: 'V辞書形＋ために＋V2（目的）',
      desc: '<b>V-るために</b> menyatakan <b>tujuan</b> dari tindakan. "Demi bisa V" atau "untuk tujuan V".',
      examples: [
        { jp: '日本語が上手になるために、毎日練習します。', id: 'Demi bisa mahir bahasa Jepang, saya berlatih setiap hari.' },
        { jp: '試験に合格するために、一生懸命勉強しています。', id: 'Untuk lulus ujian, saya belajar keras.' },
        { jp: '健康を保つために、野菜をたくさん食べます。', id: 'Untuk menjaga kesehatan, saya banyak makan sayuran.' },
      ],
      notes: 'V-るために = tujuan tindakan aktif. N のために = demi penerima manfaat.',
    },
    {
      id: 'ir-a2-2-060', global_grammar_id: 'gn5-00037',
      lesson: 18, seq: 3,
      pattern: 'V-てあげます (melakukan V untuk orang lain)',
      raw: '【人に】V〜て形＋あげます（話者→他者への恩恵）',
      desc: '<b>V-てあげます</b>: pembicara <b>melakukan V untuk orang lain</b> sebagai kebaikan. Sudut pandang pembicara sebagai pemberi.',
      examples: [
        { jp: '友達に荷物を持ってあげました。', id: 'Saya membawakan barang bawaan teman.' },
        { jp: '子どもに本を読んであげます。', id: 'Saya membacakan buku untuk anak.' },
        { jp: '道に迷った人に道を教えてあげました。', id: 'Saya menunjukkan jalan kepada orang yang tersesat.' },
      ],
      notes: 'Hati-hati: あげます bisa terkesan arogan. Untuk kerendahan hati, lebih baik bertanya dulu.',
    },
    {
      id: 'ir-a2-2-061', global_grammar_id: 'gn5-00038',
      lesson: 18, seq: 4,
      pattern: 'V-てもらいます (menerima kebaikan dari orang lain)',
      raw: '【人に】V〜て形＋もらいます（話者が恩恵を受ける）',
      desc: '<b>V-てもらいます</b>: pembicara <b>menerima manfaat</b> dari tindakan orang lain. Pembicara adalah penerima kebaikan.',
      examples: [
        { jp: '先生に説明してもらいました。', id: 'Saya mendapat penjelasan dari guru.' },
        { jp: '友達に手伝ってもらいました。', id: 'Saya mendapat bantuan dari teman.' },
        { jp: '病院で日本語で話してもらえますか？', id: 'Bisakah berbicara dalam bahasa Jepang? (saya yang menerima)' },
      ],
      notes: 'もらいます menekankan sudut pandang penerima.',
    },
    {
      id: 'ir-a2-2-062', global_grammar_id: 'gn5-00039',
      lesson: 18, seq: 5,
      pattern: 'V-てくれます (orang lain melakukan V untuk saya)',
      raw: '【人が】V〜て形＋くれます（他者→話者への恩恵）',
      desc: '<b>V-てくれます</b>: orang lain <b>melakukan V untuk pembicara</b> sebagai kebaikan. Fokus pada tindakan si pemberi dari sudut pandang penerima.',
      examples: [
        { jp: '友達が宿題を手伝ってくれました。', id: 'Teman membantu mengerjakan PR saya.' },
        { jp: '先生が分かりやすく説明してくれました。', id: 'Guru menjelaskan dengan jelas untuk kami.' },
        { jp: '彼が駅まで送ってくれました。', id: 'Dia mengantar saya sampai stasiun.' },
      ],
      notes: 'Tiga pola pemberian: あげる (saya→lain), もらう (saya terima dari lain), くれる (lain→saya). Fondasi ekspresi sosial bahasa Jepang.',
    },

  ],
};

console.log('[irodori] grammar-lens-ir-a2-2.js loaded: 62 entries (Elementary 2 A2, 18 lessons)');
