// grammar-n3.js — Grammar JLPT N3 Global (Tier 1)
// window.grammarN3
// Dibuat oleh: Agent 4 — Batter 🌾
// Task: RESTRUKTURISASI-B-BATTER-N3 (Plan B)
// Versi schema: Arsitektur Dua Tier (Plan A, v14.8.1)
// Catatan: cat values menggunakan label inferensi — verifikasi vs GRM-6 final list diperlukan.
//          Referensi pattern dari n3-w1.js–n3-w6.js (bukan copy isi).

window.grammarN3 = [

  // ─────────────────────────────────────────────────────────────────────────
  // SEBAB / AKIBAT (gn3-00001 – gn3-00008)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00001',
    level      : 'n3',
    pattern    : '〜おかげで',
    reading    : '〜okage de',
    meaning    : 'berkat ... / karena ... (hal positif)',
    cat        : 'reason-cause',
    connection : 'V/Adj plain / N + の + おかげで',
    desc       : '<b>〜おかげで</b> menyatakan bahwa suatu hasil positif dicapai berkat seseorang atau sesuatu. Selalu digunakan dengan konteks positif.',
    nuance     : 'Lawan dari せいで (negatif). おかげで = rasa terima kasih/syukur.',
    examples   : [
      { jp: '先生のご指導の<b>おかげで</b>、試験に合格しました。', id: 'Berkat bimbingan guru, saya lulus ujian.' },
      { jp: '皆さんの協力の<b>おかげで</b>、プロジェクトが成功しました。', id: 'Berkat kerjasama semua orang, proyek berhasil.' },
      { jp: '薬を飲んだ<b>おかげで</b>、熱が下がりました。', id: 'Berkat minum obat, demam turun.' },
    ],
    see_also_grammar : ['gn3-00002'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00002',
    level      : 'n3',
    pattern    : '〜せいで / 〜せいか',
    reading    : '〜sei de / sei ka',
    meaning    : 'gara-gara ... / akibat ... (hal negatif)',
    cat        : 'reason-cause',
    connection : 'V/Adj plain / N + の + せいで / せいか',
    desc       : '<b>〜せいで</b> menyatakan penyebab dari suatu hasil negatif, sering dengan nada menyalahkan. <b>〜せいか</b>: nada lebih ragu ("mungkin gara-gara...").',
    nuance     : 'Selalu digunakan untuk hasil negatif. Berbeda dari おかげで.',
    examples   : [
      { jp: '風邪の<b>せいで</b>、仕事を休みました。', id: 'Gara-gara masuk angin, saya tidak masuk kerja.' },
      { jp: '睡眠不足の<b>せいか</b>、集中できない。', id: 'Mungkin gara-gara kurang tidur, saya tidak bisa konsentrasi.' },
      { jp: '彼女の<b>せいで</b>、計画が台無しになった。', id: 'Gara-gara dia, rencana menjadi berantakan.' },
    ],
    see_also_grammar : ['gn3-00001'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00003',
    level      : 'n3',
    pattern    : '〜そのため（に）',
    reading    : '〜sono tame ni',
    meaning    : 'oleh karena itu / untuk itu',
    cat        : 'reason-cause',
    connection : '文1。そのため（に）、文2。',
    desc       : '<b>〜そのため（に）</b> menghubungkan dua kalimat sebagai sebab dan akibat, atau menunjukkan tujuan dari kalimat sebelumnya. Lebih formal dari だから.',
    nuance     : null,
    examples   : [
      { jp: '台風が接近している。<b>そのため</b>、学校は休みになった。', id: 'Topan sedang mendekat. Oleh karena itu, sekolah diliburkan.' },
      { jp: '体を強くしたい。<b>そのために</b>、毎日運動している。', id: 'Ingin memperkuat tubuh. Untuk itu, berolahraga setiap hari.' },
    ],
    see_also_grammar : ['gn3-00004'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00004',
    level      : 'n3',
    pattern    : '〜その結果',
    reading    : '〜sono kekka',
    meaning    : 'akibatnya / hasilnya',
    cat        : 'reason-cause',
    connection : '文1。その結果、文2。',
    desc       : '<b>〜その結果</b> menghubungkan kalimat sebab dengan akibat yang merupakan hasil konkret.',
    nuance     : null,
    examples   : [
      { jp: '毎日練習した。<b>その結果</b>、大会で優勝できた。', id: 'Berlatih setiap hari. Akibatnya, bisa menang di kompetisi.' },
      { jp: '無理をしすぎた。<b>その結果</b>、体を壊した。', id: 'Terlalu memaksakan diri. Hasilnya, jatuh sakit.' },
    ],
    see_also_grammar : ['gn3-00003'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00005',
    level      : 'n3',
    pattern    : '〜なぜなら〜からだ',
    reading    : '〜nazenara〜kara da',
    meaning    : 'karena ... (penjelasan alasan)',
    cat        : 'sentence-final-modality',
    connection : '文1。なぜなら、文2 + からだ。',
    desc       : '<b>〜なぜなら〜からだ</b> digunakan untuk menjelaskan alasan dari kalimat sebelumnya. Pola formal untuk memaparkan alasan.',
    nuance     : 'Sering di tulisan atau ceramah. なぜかというと〜からだ adalah variannya.',
    examples   : [
      { jp: '私はお酒を飲まない。<b>なぜなら</b>、アレルギーがある<b>からだ</b>。', id: 'Saya tidak minum alkohol. Karena saya punya alergi.' },
      { jp: 'この仕事は難しい。<b>なぜなら</b>、専門知識が必要だ<b>から</b>。', id: 'Pekerjaan ini sulit. Karena membutuhkan pengetahuan khusus.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'written',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00006',
    level      : 'n3',
    pattern    : '〜ために (sebab — formal)',
    reading    : '〜tame ni',
    meaning    : 'karena ... / akibat ... (sebab, formal)',
    cat        : 'reason-cause',
    connection : 'Vた / N + の + ために',
    desc       : '<b>〜ために (sebab)</b> menyatakan penyebab dari suatu akibat dalam konteks formal atau tulisan. Berbeda dari ために tujuan.',
    nuance     : null,
    examples   : [
      { jp: '地震の<b>ために</b>、多くの家が壊れた。', id: 'Karena gempa, banyak rumah rusak.' },
      { jp: '交通事故の<b>ために</b>、道路が渋滞している。', id: 'Karena kecelakaan lalu lintas, jalan macet.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'written',
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KONDISIONAL / TEMPORAL (gn3-00007 – gn3-00018)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00007',
    level      : 'n3',
    pattern    : '〜うちに',
    reading    : '〜uchi ni',
    meaning    : 'sementara masih ... / selagi ...',
    cat        : 'sequential-temporal',
    connection : 'Vる / Vている / Adj-い / N + の + うちに',
    desc       : '<b>〜うちに</b> menyatakan bahwa suatu tindakan dilakukan selagi kondisi tertentu masih berlaku, dengan nuansa bahwa kondisi itu akan berubah. "Selagi masih...", "sebelum ... berakhir".',
    nuance     : 'Sering menyiratkan kesempatan yang perlu dimanfaatkan sebelum terlambat.',
    examples   : [
      { jp: '若い<b>うちに</b>、いろいろな経験をしてください。', id: 'Selagi masih muda, cari banyak pengalaman.' },
      { jp: '温かい<b>うちに</b>食べてください。', id: 'Makanlah selagi masih hangat.' },
      { jp: '覚えている<b>うちに</b>メモしておこう。', id: 'Selagi masih ingat, lebih baik dicatat.' },
    ],
    see_also_grammar : ['gn3-00008'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00008',
    level      : 'n3',
    pattern    : '〜たびに',
    reading    : '〜tabi ni',
    meaning    : 'setiap kali ... / tiap kali ...',
    cat        : 'sequential-temporal',
    connection : 'Vる / N + の + たびに',
    desc       : '<b>〜たびに</b> menyatakan bahwa setiap kali suatu peristiwa terjadi, konsekuensi atau kebiasaan yang sama pun terjadi.',
    nuance     : null,
    examples   : [
      { jp: '日本に来る<b>たびに</b>、お土産を買います。', id: 'Setiap kali datang ke Jepang, saya beli oleh-oleh.' },
      { jp: '彼の顔を見る<b>たびに</b>、あの日を思い出す。', id: 'Setiap kali melihat wajahnya, saya teringat hari itu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00009',
    level      : 'n3',
    pattern    : '〜とたん（に）',
    reading    : '〜totan ni',
    meaning    : 'begitu ... langsung / seketika setelah ...',
    cat        : 'sequential-temporal',
    connection : 'Vた + とたん（に）',
    desc       : '<b>〜とたん（に）</b> menyatakan bahwa sesuatu terjadi seketika atau tiba-tiba setelah suatu tindakan selesai. Menekankan kedekatannya yang sangat singkat.',
    nuance     : 'Selalu menggunakan Vた (lampau). Akibat di klausa kedua tidak bisa dikontrol.',
    examples   : [
      { jp: '外に出た<b>とたん</b>、雨が降り出した。', id: 'Begitu keluar, langsung hujan.' },
      { jp: '横になった<b>とたんに</b>、眠ってしまった。', id: 'Seketika berbaring, langsung tertidur.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00010',
    level      : 'n3',
    pattern    : '〜最中に（さいちゅうに）',
    reading    : '〜saichuu ni',
    meaning    : 'di tengah-tengah ... / tepat ketika sedang ...',
    cat        : 'sequential-temporal',
    connection : 'Vている + 最中に / N + の + 最中に',
    desc       : '<b>〜最中に</b> menyatakan bahwa suatu kejadian lain terjadi tepat di tengah-tengah suatu tindakan yang sedang berlangsung, sering dengan nuansa gangguan.',
    nuance     : null,
    examples   : [
      { jp: '会議の<b>最中に</b>、電話が鳴った。', id: 'Tepat di tengah rapat, telepon berdering.' },
      { jp: '食事している<b>最中に</b>、停電になった。', id: 'Tepat di tengah makan, listrik mati.' },
    ],
    see_also_grammar : ['gn3-00007'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00011',
    level      : 'n3',
    pattern    : '〜てはじめて',
    reading    : '〜te hajimete',
    meaning    : 'baru setelah ... / justru ketika ... baru sadar',
    cat        : 'sentence-final-modality',
    connection : 'Vて + はじめて',
    desc       : '<b>〜てはじめて</b> menyatakan bahwa suatu pemahaman, pengalaman, atau kemampuan baru terwujud setelah suatu tindakan tertentu. "Baru setelah X, Y baru terjadi".',
    nuance     : null,
    examples   : [
      { jp: '日本に来て<b>はじめて</b>、日本語の難しさが分かった。', id: 'Baru setelah datang ke Jepang, saya menyadari sulitnya bahasa Jepang.' },
      { jp: '失って<b>はじめて</b>、その大切さに気づく。', id: 'Baru setelah kehilangan, kita menyadari betapa berharganya itu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00012',
    level      : 'n3',
    pattern    : '〜まで（動作の終点）',
    reading    : '〜made (owari)',
    meaning    : 'sampai ... (batas akhir tindakan)',
    cat        : 'sequential-temporal',
    connection : 'Vる + まで',
    desc       : '<b>〜まで（動作の終点）</b> menyatakan bahwa suatu tindakan berlanjut sampai kondisi tertentu terpenuhi.',
    nuance     : null,
    examples   : [
      { jp: '合格する<b>まで</b>、諦めません。', id: 'Saya tidak akan menyerah sampai lulus.' },
      { jp: '彼が来る<b>まで</b>、ここで待っています。', id: 'Saya akan menunggu di sini sampai dia datang.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00013',
    level      : 'n3',
    pattern    : '〜としたら / 〜とすれば',
    reading    : '〜to shitara / to sureba',
    meaning    : 'seandainya ... / jika misalnya ...',
    cat        : 'conditional-tara',
    connection : 'V/Adj plain / N + としたら / とすれば',
    desc       : '<b>〜としたら / 〜とすれば</b> digunakan untuk kondisi hipotetis: "seandainya", "andai kata". Menyatakan kondisi yang masih dalam perkiraan atau belum terjadi.',
    nuance     : null,
    examples   : [
      { jp: '宝くじが当たったと<b>したら</b>、何をしますか。', id: 'Seandainya menang lotre, apa yang akan kamu lakukan?' },
      { jp: '彼が正直に言ったと<b>すれば</b>、信じます。', id: 'Seandainya dia berkata jujur, saya percaya.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00014',
    level      : 'n3',
    pattern    : '〜ば〜ほど',
    reading    : '〜ba〜hodo',
    meaning    : 'semakin ... semakin ...',
    cat        : 'conditional-tara',
    connection : 'Vば + Vる + ほど / Adj-ければ + Adj + ほど',
    desc       : '<b>〜ば〜ほど</b> menyatakan hubungan proporsional: semakin satu hal meningkat, semakin hal lain juga meningkat.',
    nuance     : null,
    examples   : [
      { jp: '練習すれ<b>ば</b>する<b>ほど</b>、上手になります。', id: 'Semakin banyak berlatih, semakin mahir.' },
      { jp: '考えれ<b>ば</b>考える<b>ほど</b>、わからなくなる。', id: 'Semakin dipikir, semakin tidak mengerti.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00015',
    level      : 'n3',
    pattern    : '〜るところだった',
    reading    : '〜ru tokoro datta',
    meaning    : 'hampir saja ... / nyaris ...',
    cat        : 'extent-degree',
    connection : 'Vる + ところだった',
    desc       : '<b>〜るところだった</b> menyatakan bahwa suatu peristiwa (biasanya negatif) hampir saja terjadi tapi tidak jadi. "Nyaris", "hampir saja".',
    nuance     : null,
    examples   : [
      { jp: '電車に乗り遅れる<b>ところだった</b>。', id: 'Hampir saja ketinggalan kereta.' },
      { jp: '転ぶ<b>ところだったが</b>、助けてもらった。', id: 'Hampir saja terjatuh, tapi ditolong.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00016',
    level      : 'n3',
    pattern    : '〜ついでに',
    reading    : '〜tsuide ni',
    meaning    : 'sambil sekalian ... / sekalian ...',
    cat        : 'sequential-temporal',
    connection : 'Vる / Vた + ついでに / N + の + ついでに',
    desc       : '<b>〜ついでに</b> menyatakan memanfaatkan suatu kesempatan untuk melakukan hal lain juga: "sekalian", "sambil sekalian".',
    nuance     : null,
    examples   : [
      { jp: '買い物に行く<b>ついでに</b>、薬局にも寄ります。', id: 'Sekalian pergi belanja, mampir juga ke apotek.' },
      { jp: '散歩した<b>ついでに</b>、ポストに手紙を入れた。', id: 'Sekalian jalan-jalan, memasukkan surat ke kotak pos.' },
    ],
    see_also_grammar : ['gn3-00007'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00017',
    level      : 'n3',
    pattern    : 'もし〜たなら / 〜たら',
    reading    : 'moshi〜ta nara / tara',
    meaning    : 'seandainya / kalau saja (hipotetis kuat)',
    cat        : 'conditional-tara',
    connection : 'もし + V/Adj + たなら / たら',
    desc       : '<b>もし〜たなら</b> memperkuat nuansa hipotetis atau tidak nyata dari kondisi.',
    nuance     : null,
    examples   : [
      { jp: '<b>もし</b>昨日来られていた<b>なら</b>、会えたのに。', id: 'Seandainya kemarin bisa datang, pasti bisa bertemu.' },
      { jp: '<b>もし</b>一人で住んでいた<b>ら</b>、何を作りますか。', id: 'Kalau tinggal sendiri, apa yang akan kamu masak?' },
    ],
    see_also_grammar : ['gn3-00013'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00018',
    level      : 'n3',
    pattern    : 'たとえ〜ても',
    reading    : 'tatoe〜te mo',
    meaning    : 'sekalipun ... / bahkan jika ...',
    cat        : 'contrast-concession',
    connection : 'たとえ + V/Adj + ても',
    desc       : '<b>たとえ〜ても</b> memperkuat konsesi: "sekalipun", "bahkan jika X, Y tetap berlaku". Lebih tegas dari 〜ても biasa.',
    nuance     : null,
    examples   : [
      { jp: '<b>たとえ</b>失敗し<b>ても</b>、諦めません。', id: 'Sekalipun gagal, saya tidak akan menyerah.' },
      { jp: '<b>たとえ</b>難しく<b>ても</b>、やってみる価値があります。', id: 'Bahkan jika sulit, ada nilainya untuk dicoba.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KONSESI / KONTRAS (gn3-00019 – gn3-00026)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00019',
    level      : 'n3',
    pattern    : '〜にしては',
    reading    : '〜ni shite wa',
    meaning    : 'padahal dia ... / untuk ukuran ...',
    cat        : 'contrast-concession',
    connection : 'N / Vる + にしては',
    desc       : '<b>〜にしては</b> menyatakan bahwa suatu keadaan di luar ekspektasi berdasarkan kategori atau kondisi tertentu: "untuk ukuran...", "padahal...".',
    nuance     : null,
    examples   : [
      { jp: '子ども<b>にしては</b>、難しい本を読んでいる。', id: 'Untuk ukuran anak-anak, dia membaca buku yang sulit.' },
      { jp: '初めて<b>にしては</b>、よくできました。', id: 'Untuk pertama kali, ini sudah sangat baik.' },
    ],
    see_also_grammar : ['gn3-00020'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00020',
    level      : 'n3',
    pattern    : '〜わりに（は）',
    reading    : '〜wari ni wa',
    meaning    : 'untuk ... / dibandingkan dengan ...',
    cat        : 'contrast-concession',
    connection : 'V/Adj plain / N + の + わりに（は）',
    desc       : '<b>〜わりに（は）</b> menyatakan bahwa suatu kondisi tidak sesuai dengan yang diharapkan dari keadaan tersebut: "untuk...", "ternyata lebih... dari yang seharusnya".',
    nuance     : null,
    examples   : [
      { jp: '値段の<b>わりに</b>、質がいいですね。', id: 'Untuk harganya, kualitasnya bagus ya.' },
      { jp: '練習した<b>わりには</b>、あまり上手くない。', id: 'Padahal sudah berlatih, tapi tidak begitu mahir.' },
    ],
    see_also_grammar : ['gn3-00019'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00021',
    level      : 'n3',
    pattern    : '〜くせに',
    reading    : '〜kuse ni',
    meaning    : 'padahal ... / meskipun (dengan nada kesal)',
    cat        : 'contrast-concession',
    connection : 'V/Adj plain / N + の + くせに',
    desc       : '<b>〜くせに</b> menyatakan kontras dengan nada tidak puas, kesal, atau mengkritik. "Padahal..., tapi..." dengan emosi negatif.',
    nuance     : 'Kasar/informal. Berbeda dari のに yang lebih netral.',
    examples   : [
      { jp: '知らない<b>くせに</b>、知ったかぶりをしている。', id: 'Padahal tidak tahu, pura-pura tahu.' },
      { jp: '下手な<b>くせに</b>、人の批判ばかりする。', id: 'Padahal tidak mahir, hanya mengkritik orang saja.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Bernada negatif/kritis. Tidak sopan jika digunakan kepada orang yang lebih tua/senior.',
  },

  {
    id         : 'gn3-00022',
    level      : 'n3',
    pattern    : '〜ものの',
    reading    : '〜mono no',
    meaning    : 'meskipun ... / walaupun ... (tapi)',
    cat        : 'contrast-concession',
    connection : 'V/Adj plain / N + ではある + ものの',
    desc       : '<b>〜ものの</b> menyatakan konsesi: meskipun kondisi pertama berlaku, akibat yang diharapkan tidak terjadi atau ada hal lain yang menghalangi. Lebih formal dari けど.',
    nuance     : null,
    examples   : [
      { jp: '日本語を勉強した<b>ものの</b>、なかなか上達しない。', id: 'Meskipun sudah belajar bahasa Jepang, sulit sekali untuk maju.' },
      { jp: '行きたい<b>ものの</b>、時間がない。', id: 'Meskipun ingin pergi, tidak ada waktu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00023',
    level      : 'n3',
    pattern    : '〜にしても',
    reading    : '〜ni shite mo',
    meaning    : 'meskipun begitu / bahkan jika ... pun',
    cat        : 'contrast-concession',
    connection : 'V/Adj plain / N + にしても',
    desc       : '<b>〜にしても</b> menyatakan bahwa meskipun suatu kondisi berlaku, ada pernyataan tambahan yang juga relevan.',
    nuance     : null,
    examples   : [
      { jp: '忙しい<b>にしても</b>、少しくらい連絡してほしい。', id: 'Meskipun sibuk, setidaknya tolong beri kabar.' },
      { jp: '安い<b>にしても</b>、もう少し品質を上げてほしい。', id: 'Meskipun murah, tolong tingkatkan sedikit kualitasnya.' },
    ],
    see_also_grammar : ['gn3-00022'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00024',
    level      : 'n3',
    pattern    : '〜ことは〜が / けど',
    reading    : '〜koto wa〜ga / kedo',
    meaning    : '... memang ... tapi / mengakui tapi ...',
    cat        : 'contrast-concession',
    connection : 'V + ことは + V + が / けど',
    desc       : '<b>〜ことは〜が</b> mengakui suatu kenyataan sebelum menyatakan kondisi yang membatasi atau kontras.',
    nuance     : null,
    examples   : [
      { jp: '行く<b>ことは</b>行く<b>が</b>、あまり乗り気じゃない。', id: 'Pergi memang pergi, tapi tidak begitu bersemangat.' },
      { jp: '分かる<b>ことは</b>分かる<b>けど</b>、難しいな。', id: 'Mengerti memang mengerti, tapi susah juga ya.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00025',
    level      : 'n3',
    pattern    : '〜かわりに',
    reading    : '〜kawari ni',
    meaning    : 'sebagai gantinya / sebagai imbalannya',
    cat        : 'contrast-concession',
    connection : 'V/Adj plain / N + の + かわりに',
    desc       : '<b>〜かわりに</b> menyatakan penggantian atau pertukaran: melakukan X sebagai ganti atau imbalan dari Y.',
    nuance     : 'Bisa juga berarti "alih-alih": 電車のかわりに自転車を使う.',
    examples   : [
      { jp: '父が来られない<b>かわりに</b>、兄が来ました。', id: 'Sebagai pengganti ayah yang tidak bisa datang, kakak yang datang.' },
      { jp: '手伝ってあげる<b>かわりに</b>、夕食をおごってよ。', id: 'Sebagai imbalan sudah dibantu, traktir makan malam dong.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00026',
    level      : 'n3',
    pattern    : 'どんなに / いくら〜ても',
    reading    : 'donna ni / ikura〜te mo',
    meaning    : 'betapapun ... / seberapa pun ... tetap saja',
    cat        : 'contrast-concession',
    connection : 'どんなに / いくら + V/Adj + ても',
    desc       : '<b>どんなに / いくら〜ても</b> menyatakan bahwa tidak peduli seberapa besar tingkat kondisi tertentu, hasilnya tetap tidak berubah.',
    nuance     : null,
    examples   : [
      { jp: '<b>どんなに</b>頑張っ<b>ても</b>、間に合わないと思う。', id: 'Betapapun keras berusaha, sepertinya tidak akan sempat.' },
      { jp: '<b>いくら</b>説明し<b>ても</b>、分かってくれない。', id: 'Seberapa pun dijelaskan, dia tidak mau mengerti.' },
    ],
    see_also_grammar : ['gn3-00018'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INFERENSI / EKSPEKTASI (gn3-00027 – gn3-00033)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00027',
    level      : 'n3',
    pattern    : '〜はずだ / 〜はずがない',
    reading    : '〜hazu da / hazu ga nai',
    meaning    : 'seharusnya ... / tidak mungkin ...',
    cat        : 'conjecture-possibility',
    connection : 'V/Adj plain / N + の + はずだ / はずがない',
    desc       : '<b>〜はずだ</b>: ekspektasi logis berdasarkan informasi/fakta yang diketahui. <b>〜はずがない</b>: mustahil berdasarkan logika.',
    nuance     : null,
    examples   : [
      { jp: '今ごろ着いている<b>はずです</b>。', id: 'Seharusnya sekarang sudah sampai.' },
      { jp: '彼がそんなことを言う<b>はずがない</b>。', id: 'Tidak mungkin dia mengatakan hal seperti itu.' },
    ],
    see_also_grammar : ['gn3-00028'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00028',
    level      : 'n3',
    pattern    : '〜わけだ',
    reading    : '〜wake da',
    meaning    : 'jadi ... / pantas saja ... / memang wajar',
    cat        : 'conjecture-possibility',
    connection : 'V/Adj plain / N + な/の + わけだ',
    desc       : '<b>〜わけだ</b> menyatakan bahwa suatu kesimpulan logis dapat ditarik dari kondisi yang ada: "jadi wajar saja", "pantas saja".',
    nuance     : null,
    examples   : [
      { jp: '10年も日本に住んでいるんだから、日本語が上手な<b>わけだ</b>。', id: 'Sudah tinggal 10 tahun di Jepang, jadi wajar saja bahasa Jepangnya bagus.' },
      { jp: '彼は3日も寝ていないそうだ。疲れている<b>わけだ</b>。', id: 'Katanya dia tidak tidur 3 hari. Pantas saja kelelahan.' },
    ],
    see_also_grammar : ['gn3-00029', 'gn3-00030'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00029',
    level      : 'n3',
    pattern    : '〜わけではない / 〜わけじゃない',
    reading    : '〜wake de wa nai / wake ja nai',
    meaning    : 'bukan berarti ... / tidak selalu ...',
    cat        : 'negative',
    connection : 'V/Adj plain / N + というわけではない',
    desc       : '<b>〜わけではない</b> digunakan untuk menyanggah atau membatasi interpretasi: "bukan berarti", "tidak selalu demikian".',
    nuance     : null,
    examples   : [
      { jp: '嫌いな<b>わけではない</b>が、好きでもない。', id: 'Bukan berarti tidak suka, tapi juga tidak suka.' },
      { jp: 'すべてが悪い<b>わけじゃない</b>。', id: 'Bukan berarti semuanya buruk.' },
    ],
    see_also_grammar : ['gn3-00028', 'gn3-00030'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00030',
    level      : 'n3',
    pattern    : '〜わけにはいかない',
    reading    : '〜wake ni wa ikanai',
    meaning    : 'tidak bisa ... / tidak boleh ...',
    cat        : 'obligation-necessity',
    connection : 'Vる / Vない + わけにはいかない',
    desc       : '<b>〜わけにはいかない</b> menyatakan bahwa suatu tindakan tidak dapat atau tidak boleh dilakukan karena alasan sosial, moral, atau situasional.',
    nuance     : 'Bukan larangan eksternal, tapi dorongan internal atau norma sosial.',
    examples   : [
      { jp: '病気でも、この仕事だけは休む<b>わけにはいかない</b>。', id: 'Meskipun sakit, pekerjaan ini saja tidak bisa saya tinggalkan.' },
      { jp: '親友を裏切る<b>わけにはいかない</b>。', id: 'Saya tidak bisa mengkhianati sahabat.' },
    ],
    see_also_grammar : ['gn3-00028', 'gn3-00029'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00031',
    level      : 'n3',
    pattern    : '〜ということだ',
    reading    : '〜to iu koto da',
    meaning    : 'artinya ... / kesimpulannya ...',
    cat        : 'conjecture-possibility',
    connection : 'V/Adj plain / N + ということだ',
    desc       : '<b>〜ということだ</b> digunakan untuk menyatakan kesimpulan atau penafsiran dari suatu informasi: "artinya", "yang berarti". Juga bisa menyatakan kabar yang didengar.',
    nuance     : null,
    examples   : [
      { jp: '電車が止まっている<b>ということは</b>、何か事故があったということだ。', id: 'Kereta berhenti, artinya ada sesuatu yang terjadi.' },
      { jp: '彼が来ない<b>ということは</b>、断ったということだろう。', id: 'Dia tidak datang, artinya dia menolak.' },
    ],
    see_also_grammar : ['gn3-00028'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00032',
    level      : 'n3',
    pattern    : '〜によれば / 〜によると',
    reading    : '〜ni yoreba / ni yoru to',
    meaning    : 'menurut ... / berdasarkan ...',
    cat        : 'hearsay-report',
    connection : 'N + によれば / によると',
    desc       : '<b>〜によれば / 〜によると</b> digunakan untuk mengutip sumber informasi: "menurut", "berdasarkan".',
    nuance     : null,
    examples   : [
      { jp: '天気予報<b>によれば</b>、明日は大雨だそうです。', id: 'Menurut ramalan cuaca, besok katanya hujan deras.' },
      { jp: '彼女の話<b>によると</b>、二人は別れたらしい。', id: 'Menurut cerita dia, katanya keduanya sudah putus.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00033',
    level      : 'n3',
    pattern    : '必ずしも〜とは限らない',
    reading    : 'kanarazu shimo〜to wa kagiranai',
    meaning    : 'tidak selalu ... / belum tentu ...',
    cat        : 'negative',
    connection : '必ずしも + V/Adj + とは限らない',
    desc       : '<b>必ずしも〜とは限らない</b> menyatakan bahwa sesuatu tidak selalu demikian, meskipun umum dianggap begitu: "belum tentu", "tidak selalu".',
    nuance     : null,
    examples   : [
      { jp: '高い物が<b>必ずしも</b>いい物だとは<b>限らない</b>。', id: 'Barang mahal belum tentu barang yang baik.' },
      { jp: '有名人が<b>必ずしも</b>幸せとは<b>限らない</b>。', id: 'Orang terkenal belum tentu bahagia.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KEWAJIBAN / SARAN / LARANGAN (gn3-00034 – gn3-00038)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00034',
    level      : 'n3',
    pattern    : '〜べきだ / 〜べきではない',
    reading    : '〜beki da / beki de wa nai',
    meaning    : 'seharusnya ... / sudah sewajarnya ...',
    cat        : 'obligation-necessity',
    connection : 'Vる + べきだ / べきではない',
    desc       : '<b>〜べきだ</b> menyatakan kewajiban moral atau norma yang seharusnya diikuti: "seharusnya", "sudah sewajarnya". Lebih kuat dari ほうがいい.',
    nuance     : null,
    examples   : [
      { jp: '人の失敗を笑う<b>べきではない</b>。', id: 'Tidak seharusnya menertawakan kegagalan orang lain.' },
      { jp: '約束は守る<b>べきだ</b>。', id: 'Janji seharusnya ditepati.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : 'する → すべき (lebih umum dari するべき)',
    notes      : null,
  },

  {
    id         : 'gn3-00035',
    level      : 'n3',
    pattern    : '〜ことはない',
    reading    : '〜koto wa nai',
    meaning    : 'tidak perlu ... / tidak ada perlunya ...',
    cat        : 'sentence-final-request',
    connection : 'Vる + ことはない',
    desc       : '<b>〜ことはない</b> menyatakan bahwa suatu tindakan tidak perlu dilakukan. Sering digunakan untuk menenangkan atau meyakinkan seseorang.',
    nuance     : null,
    examples   : [
      { jp: 'そんなに謝る<b>ことはない</b>よ。', id: 'Tidak perlu meminta maaf sebanyak itu.' },
      { jp: '心配する<b>ことはない</b>。きっと大丈夫。', id: 'Tidak perlu khawatir. Pasti baik-baik saja.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00036',
    level      : 'n3',
    pattern    : '〜しかない',
    reading    : '〜shika nai',
    meaning    : 'tidak ada pilihan selain ... / terpaksa ...',
    cat        : 'obligation-necessity',
    connection : 'Vる + しかない',
    desc       : '<b>〜しかない</b> menyatakan bahwa tidak ada pilihan lain selain melakukan sesuatu.',
    nuance     : null,
    examples   : [
      { jp: 'もうやる<b>しかない</b>！', id: 'Tidak ada pilihan selain melakukannya!' },
      { jp: '電車が止まっているから、歩く<b>しかない</b>。', id: 'Kereta berhenti, jadi tidak ada pilihan selain jalan kaki.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00037',
    level      : 'n3',
    pattern    : '〜ばよかった / 〜たらよかった',
    reading    : '〜ba yokatta / tara yokatta',
    meaning    : 'seandainya saja ... / kalau saja ...',
    cat        : 'completion-regret',
    connection : 'Vば / Vたら + よかった',
    desc       : '<b>〜ばよかった</b> menyatakan penyesalan atas tindakan yang tidak dilakukan atau dilakukan di masa lalu: "kalau saja tadi...", "seandainya saya...".',
    nuance     : null,
    examples   : [
      { jp: '傘を持ってくれば<b>よかった</b>。', id: 'Kalau saja tadi bawa payung.' },
      { jp: 'もっと早く言って<b>くれたらよかったのに</b>。', id: 'Seandainya saja memberitahu lebih awal.' },
    ],
    see_also_grammar : ['gn3-00038'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00038',
    level      : 'n3',
    pattern    : '〜させてください',
    reading    : '〜sasete kudasai',
    meaning    : 'izinkan saya ... / perbolehkan saya ...',
    cat        : 'sentence-final-request',
    connection : 'Vさせて + ください',
    desc       : '<b>〜させてください</b> digunakan untuk meminta izin melakukan sesuatu dengan sopan.',
    nuance     : null,
    examples   : [
      { jp: '発表させて<b>ください</b>。', id: 'Izinkan saya untuk berpresentasi.' },
      { jp: 'お礼を言わ<b>せてください</b>。', id: 'Perbolehkan saya mengucapkan terima kasih.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PENEKANAN (gn3-00039 – gn3-00043)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00039',
    level      : 'n3',
    pattern    : '〜こそ',
    reading    : '〜koso',
    meaning    : 'justru ... / (inilah) yang sesungguhnya ...',
    cat        : 'sentence-final-modality',
    connection : 'N + こそ / 〜てこそ',
    desc       : '<b>〜こそ</b> memberikan penekanan kuat: "justru ini", "inilah yang sesungguhnya". Memfokuskan perhatian pada hal tertentu.',
    nuance     : null,
    examples   : [
      { jp: '今<b>こそ</b>行動するときだ！', id: 'Justru sekaranglah saatnya bertindak!' },
      { jp: 'あなた<b>こそ</b>、私の理想の人です。', id: 'Justru kamulah orang yang ideal bagiku.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00040',
    level      : 'n3',
    pattern    : '〜さえ',
    reading    : '〜sae',
    meaning    : 'bahkan ... / ... saja pun',
    cat        : 'sentence-final-modality',
    connection : 'N + さえ / Vさえ',
    desc       : '<b>〜さえ</b> memberikan penekanan pada contoh ekstrem: "bahkan ... saja pun". Sering menyiratkan keterkejutan atau kondisi paling minimum.',
    nuance     : null,
    examples   : [
      { jp: '疲れて、歩く<b>さえ</b>できなかった。', id: 'Lelah sekali, bahkan berjalan saja tidak bisa.' },
      { jp: '彼は自分の名前<b>さえ</b>書けない。', id: 'Bahkan namanya sendiri saja tidak bisa dia tulis.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00041',
    level      : 'n3',
    pattern    : '〜なんか / 〜なんて / 〜など',
    reading    : '〜nanka / nante / nado',
    meaning    : 'hal seperti ... / ... dan sejenisnya',
    cat        : 'sentence-final-modality',
    connection : 'N/V + なんか / なんて / など',
    desc       : '<b>〜なんか / なんて</b>: informal, sering merendahkan atau mengejutkan. <b>〜など</b>: formal, menyebutkan contoh-contoh. Ketiganya bisa menyatakan kejutan atau meremehkan.',
    nuance     : 'なんか/なんて lebih kasual dan ekspresif. など lebih netral dan formal.',
    examples   : [
      { jp: 'そんなこと<b>なんて</b>どうでもいい。', id: 'Hal seperti itu tidak penting.' },
      { jp: '私<b>なんか</b>に無理だよ。', id: 'Orang seperti saya tidak bisa.' },
      { jp: 'リンゴ<b>など</b>の果物が好きです。', id: 'Saya suka buah-buahan seperti apel.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00042',
    level      : 'n3',
    pattern    : '〜はもちろん',
    reading    : '〜wa mochiron',
    meaning    : '... sudah pasti / tidak hanya ... tapi juga ...',
    cat        : 'sentence-final-modality',
    connection : 'N + はもちろん + N/V + も',
    desc       : '<b>〜はもちろん</b> menyatakan bahwa suatu hal sudah jelas, ditambah dengan hal lain yang mungkin lebih mengejutkan.',
    nuance     : null,
    examples   : [
      { jp: '日本語<b>はもちろん</b>、英語も話せます。', id: 'Sudah pasti bisa bahasa Jepang, bahkan bahasa Inggris juga bisa.' },
      { jp: '子ども<b>はもちろん</b>、大人にも人気があります。', id: 'Sudah pasti populer di kalangan anak-anak, bahkan orang dewasa pun menyukainya.' },
    ],
    see_also_grammar : ['gn3-00043'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00043',
    level      : 'n3',
    pattern    : '〜ばかりか〜(も)',
    reading    : '〜bakari ka〜mo',
    meaning    : 'bukan hanya ... tapi juga ...',
    cat        : 'sentence-final-modality',
    connection : 'V/Adj plain / N + ばかりか + V/N + も',
    desc       : '<b>〜ばかりか〜も</b> menyatakan bahwa tidak hanya hal pertama, tapi hal kedua yang bahkan lebih mengejutkan juga berlaku.',
    nuance     : null,
    examples   : [
      { jp: '彼は英語<b>ばかりか</b>フランス語<b>も</b>話せる。', id: 'Bukan hanya bahasa Inggris, bahasa Prancis pun dia bisa.' },
      { jp: '家族<b>ばかりか</b>友人<b>も</b>心配してくれた。', id: 'Bukan hanya keluarga, teman-teman pun ikut khawatir.' },
    ],
    see_also_grammar : ['gn3-00042'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PERNYATAAN NEGATIF (gn3-00044 – gn3-00047)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00044',
    level      : 'n3',
    pattern    : '決して〜ない',
    reading    : 'kesshite〜nai',
    meaning    : 'tidak pernah ... / sama sekali tidak ...',
    cat        : 'negative',
    connection : '決して + V/Adj + ない',
    desc       : '<b>決して〜ない</b> menyatakan penyangkalan yang kuat dan mutlak: "tidak pernah", "sama sekali tidak".',
    nuance     : null,
    examples   : [
      { jp: 'あの経験は<b>決して</b>忘れ<b>ない</b>。', id: 'Pengalaman itu tidak akan pernah saya lupakan.' },
      { jp: '<b>決して</b>諦め<b>ない</b>！', id: 'Tidak akan pernah menyerah!' },
    ],
    see_also_grammar : ['gn3-00045', 'gn3-00046'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00045',
    level      : 'n3',
    pattern    : 'めったに〜ない',
    reading    : 'metta ni〜nai',
    meaning    : 'jarang ... / hampir tidak pernah ...',
    cat        : 'sequential-temporal',
    connection : 'めったに + V + ない',
    desc       : '<b>めったに〜ない</b> menyatakan bahwa sesuatu jarang sekali terjadi: "hampir tidak pernah", "jarang".',
    nuance     : null,
    examples   : [
      { jp: '彼は<b>めったに</b>遅刻し<b>ない</b>。', id: 'Dia hampir tidak pernah terlambat.' },
      { jp: 'この店の料理は<b>めったに</b>食べられ<b>ない</b>。', id: 'Masakan restoran ini jarang bisa dimakan.' },
    ],
    see_also_grammar : ['gn3-00044', 'gn3-00046'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00046',
    level      : 'n3',
    pattern    : '少しも / ちっとも〜ない',
    reading    : 'sukoshi mo / chitto mo〜nai',
    meaning    : 'sedikitpun tidak ... / sama sekali tidak ...',
    cat        : 'negative',
    connection : '少しも / ちっとも + V/Adj + ない',
    desc       : '<b>少しも / ちっとも〜ない</b> menyatakan negasi total: "sedikitpun tidak". ちっとも lebih kasual.',
    nuance     : null,
    examples   : [
      { jp: '彼女のことが<b>少しも</b>わから<b>ない</b>。', id: 'Sedikitpun saya tidak mengerti tentang dia.' },
      { jp: '<b>ちっとも</b>寒く<b>ない</b>ね。', id: 'Tidak dingin sedikitpun ya.' },
    ],
    see_also_grammar : ['gn3-00044'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00047',
    level      : 'n3',
    pattern    : 'まったく〜ない',
    reading    : 'mattaku〜nai',
    meaning    : 'sama sekali tidak ... / benar-benar tidak ...',
    cat        : 'negative',
    connection : 'まったく + V/Adj + ない',
    desc       : '<b>まったく〜ない</b> menyatakan negasi mutlak: "sama sekali tidak", "benar-benar tidak".',
    nuance     : null,
    examples   : [
      { jp: '日本語が<b>まったく</b>わから<b>ない</b>。', id: 'Sama sekali tidak mengerti bahasa Jepang.' },
      { jp: '<b>まったく</b>想定外のことが起きた。', id: 'Sesuatu yang benar-benar di luar dugaan terjadi.' },
    ],
    see_also_grammar : ['gn3-00044', 'gn3-00046'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PARTIKEL FORMAL (gn3-00048 – gn3-00052)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00048',
    level      : 'n3',
    pattern    : '〜において / 〜における',
    reading    : '〜ni oite / ni okeru',
    meaning    : 'di ... / dalam ... (formal)',
    cat        : 'teineigo-pattern',
    connection : 'N + において / N + における + N',
    desc       : '<b>〜において</b> adalah bentuk formal dari で atau に, menandai tempat, waktu, atau bidang. <b>〜における + N</b> digunakan sebagai modifier nomina.',
    nuance     : null,
    examples   : [
      { jp: 'スポーツ<b>において</b>、努力は不可欠だ。', id: 'Dalam olahraga, usaha keras tidak bisa ditinggalkan.' },
      { jp: '現代社会<b>における</b>問題について話し合った。', id: 'Mendiskusikan masalah-masalah dalam masyarakat modern.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'formal',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00049',
    level      : 'n3',
    pattern    : '〜に関して',
    reading    : '〜ni kanshite',
    meaning    : 'berkenaan dengan ... / terkait dengan ...',
    cat        : 'teineigo-pattern',
    connection : 'N + に関して / に関する + N',
    desc       : '<b>〜に関して</b> adalah bentuk lebih formal dari について: "berkenaan dengan", "terkait". Sering digunakan dalam konteks resmi atau tulisan.',
    nuance     : null,
    examples   : [
      { jp: '今回の事故<b>に関して</b>、調査が行われています。', id: 'Terkait kecelakaan kali ini, sedang dilakukan penyelidikan.' },
      { jp: '環境問題<b>に関する</b>レポートを書きました。', id: 'Saya menulis laporan berkenaan dengan masalah lingkungan.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'formal',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00050',
    level      : 'n3',
    pattern    : '〜にとって',
    reading    : '〜ni totte',
    meaning    : 'bagi ... / menurut sudut pandang ...',
    cat        : 'quotation-thought',
    connection : 'N + にとって',
    desc       : '<b>〜にとって</b> menandai perspektif atau sudut pandang seseorang/sesuatu: "bagi", "dari sudut pandang".',
    nuance     : null,
    examples   : [
      { jp: '子ども<b>にとって</b>、遊ぶことは学ぶことだ。', id: 'Bagi anak-anak, bermain adalah belajar.' },
      { jp: '私<b>にとって</b>、家族が一番大切です。', id: 'Bagi saya, keluarga adalah yang paling penting.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00051',
    level      : 'n3',
    pattern    : '〜に比べて',
    reading    : '〜ni kurabete',
    meaning    : 'dibandingkan dengan ...',
    cat        : 'comparison',
    connection : 'N + に比べて / に比べると',
    desc       : '<b>〜に比べて</b> digunakan untuk membandingkan dua hal: "dibandingkan dengan".',
    nuance     : null,
    examples   : [
      { jp: '去年<b>に比べて</b>、今年は暖かい。', id: 'Dibandingkan tahun lalu, tahun ini lebih hangat.' },
      { jp: '電車<b>に比べると</b>、バスは時間がかかります。', id: 'Dibandingkan kereta, bus lebih memakan waktu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00052',
    level      : 'n3',
    pattern    : '〜にかけて',
    reading    : '〜ni kakete',
    meaning    : 'dari ... hingga ... / selama rentang ...',
    cat        : 'extent-degree',
    connection : 'N (titik awal) + から + N (titik akhir) + にかけて',
    desc       : '<b>〜にかけて</b> menyatakan rentang waktu atau tempat yang tidak pasti batasnya: "dari ... hingga ...", berbeda dari まで yang batasnya lebih pasti.',
    nuance     : null,
    examples   : [
      { jp: '春<b>にかけて</b>、花粉症がひどくなる。', id: 'Dari musim dingin hingga musim semi, alergi pollen semakin parah.' },
      { jp: '関東から東北<b>にかけて</b>、大雪が降った。', id: 'Dari Kanto hingga Tohoku, turun salju lebat.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ASPEK VERBA N3 (gn3-00053 – gn3-00061)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00053',
    level      : 'n3',
    pattern    : '〜かける / 〜かけの / 〜かけだ',
    reading    : '〜kakeru / kakeno / kakeda',
    meaning    : 'setengah ... / belum selesai ...',
    cat        : 'inception-continuation',
    connection : 'V-ます語幹 + かける / かけの / かけだ',
    desc       : '<b>〜かける</b> menyatakan suatu tindakan yang baru dimulai tapi belum selesai, atau hampir selesai. Juga bisa berarti hampir melakukan sesuatu.',
    nuance     : null,
    examples   : [
      { jp: '食べ<b>かけの</b>ケーキがある。', id: 'Ada kue yang sudah dimakan setengah.' },
      { jp: '書き<b>かけの</b>レポートを持ってきてください。', id: 'Tolong bawa laporan yang belum selesai ditulis.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00054',
    level      : 'n3',
    pattern    : '〜きり',
    reading    : '〜kiri',
    meaning    : 'sejak ... sampai sekarang (tanpa kembali)',
    cat        : 'inception-continuation',
    connection : 'Vた + きり / N + きり',
    desc       : '<b>〜きり</b> menyatakan bahwa setelah suatu tindakan terjadi, keadaan tersebut terus berlanjut tanpa perubahan.',
    nuance     : null,
    examples   : [
      { jp: '彼女は去年出かけた<b>きり</b>、戻ってこない。', id: 'Dia pergi tahun lalu dan tidak pernah kembali sejak saat itu.' },
      { jp: '二人<b>きり</b>で話したい。', id: 'Ingin bicara berdua saja.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00055',
    level      : 'n3',
    pattern    : '〜っぱなし',
    reading    : '〜ppanashi',
    meaning    : 'dibiarkan ... terus / terus-menerus ...',
    cat        : 'inception-continuation',
    connection : 'V-ます語幹 + っぱなし',
    desc       : '<b>〜っぱなし</b> menyatakan bahwa suatu keadaan yang diakibatkan oleh tindakan dibiarkan tanpa diselesaikan atau diperbaiki, sering bernuansa negatif.',
    nuance     : null,
    examples   : [
      { jp: '電気をつけっ<b>ぱなし</b>で寝てしまった。', id: 'Tertidur dengan lampu dibiarkan menyala terus.' },
      { jp: '窓を開けっ<b>ぱなし</b>にしないでください。', id: 'Jangan biarkan jendela terbuka terus.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00056',
    level      : 'n3',
    pattern    : '〜たて / 〜たての',
    reading    : '〜tate / tateno',
    meaning    : 'baru saja ... / segar ...',
    cat        : 'inception-continuation',
    connection : 'V-ます語幹 + たて / たての + N',
    desc       : '<b>〜たて</b> menyatakan bahwa sesuatu baru saja selesai dikerjakan, sering dengan konotasi positif (masih segar, masih bagus).',
    nuance     : null,
    examples   : [
      { jp: '炊き<b>たて</b>のご飯は美味しい。', id: 'Nasi yang baru matang itu enak.' },
      { jp: '焼き<b>たての</b>パンをどうぞ。', id: 'Silakan makan roti yang baru dipanggang.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00057',
    level      : 'n3',
    pattern    : '〜切る / 〜切れる / 〜切れない',
    reading    : '〜kiru / kireru / kirenai',
    meaning    : 'selesai melakukan ... sepenuhnya / tidak bisa selesai ...',
    cat        : 'inception-continuation',
    connection : 'V-ます語幹 + 切る / 切れる / 切れない',
    desc       : '<b>〜切る</b>: menyelesaikan sesuatu secara total, sampai tuntas. <b>〜切れない</b>: tidak bisa menyelesaikan sepenuhnya.',
    nuance     : null,
    examples   : [
      { jp: '食べ<b>切れない</b>ほどの料理が出てきた。', id: 'Makanan yang keluar tidak bisa dihabiskan semuanya.' },
      { jp: 'このプロジェクトを一人でやり<b>切った</b>。', id: 'Menyelesaikan proyek ini sendirian sampai tuntas.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00058',
    level      : 'n3',
    pattern    : '〜上げる / 〜上がる',
    reading    : '〜ageru / agaru',
    meaning    : 'selesai ... / menyelesaikan ...',
    cat        : 'inception-continuation',
    connection : 'V-ます語幹 + 上げる (他動詞) / 上がる (自動詞)',
    desc       : '<b>〜上げる</b>: menyelesaikan sesuatu secara menyeluruh (transitif). <b>〜上がる</b>: selesai dengan sendirinya (intransitif).',
    nuance     : null,
    examples   : [
      { jp: 'レポートを書き<b>上げた</b>。', id: 'Berhasil menyelesaikan penulisan laporan.' },
      { jp: '作品が仕上<b>がった</b>。', id: 'Karya telah selesai.' },
    ],
    see_also_grammar : ['gn3-00057'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00059',
    level      : 'n3',
    pattern    : '〜（よ）うとする / 〜（よ）うとしない',
    reading    : '〜(yo)u to suru / to shinai',
    meaning    : 'berusaha / hendak melakukan ... / tidak mau ...',
    cat        : 'volitional-intention',
    connection : 'Vよう + とする / としない',
    desc       : '<b>〜ようとする</b>: berusaha melakukan sesuatu atau hendak melakukan. <b>〜ようとしない</b>: tidak mau / tidak berusaha sama sekali.',
    nuance     : null,
    examples   : [
      { jp: '電車に乗ろう<b>としたとき</b>、財布がないことに気づいた。', id: 'Ketika hendak naik kereta, saya sadar dompet tidak ada.' },
      { jp: '彼は謝ろう<b>としない</b>。', id: 'Dia tidak mau meminta maaf.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00060',
    level      : 'n3',
    pattern    : '〜ずに',
    reading    : '〜zu ni',
    meaning    : 'tanpa ... / tidak ... (formal)',
    cat        : 'sequential-temporal',
    connection : 'Vない → Vず + に',
    desc       : '<b>〜ずに</b> adalah bentuk formal dari ないで: tanpa melakukan sesuatu.',
    nuance     : 'ずに lebih formal dan sering digunakan dalam tulisan.',
    examples   : [
      { jp: '何も言わ<b>ずに</b>出て行ってしまった。', id: 'Pergi begitu saja tanpa berkata apa pun.' },
      { jp: '食べ<b>ずに</b>ずっと仕事をしていた。', id: 'Terus bekerja tanpa makan.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'written',
    exceptions : 'する → せずに, くる → こずに',
    notes      : null,
  },

  {
    id         : 'gn3-00061',
    level      : 'n3',
    pattern    : '〜ちゃった / 〜ちゃう (kasual)',
    reading    : '〜chatta / chau',
    meaning    : 'sudah ... / kebablasan ... (kasual)',
    cat        : 'inception-continuation',
    connection : 'Vて + しまった → ちゃった / Vて + しまう → ちゃう',
    desc       : '<b>〜ちゃった</b> adalah kontraksi kasual dari てしまった: selesai secara tidak sengaja atau dengan rasa menyesal.',
    nuance     : null,
    examples   : [
      { jp: 'また寝坊し<b>ちゃった</b>！', id: 'Kebablasan tidur lagi!' },
      { jp: '言わない方がよかったかも。言っ<b>ちゃった</b>。', id: 'Mungkin lebih baik tidak dikatakan. Terlanjur bilang.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PENJELASAN / KUTIPAN (gn3-00062 – gn3-00071)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00062',
    level      : 'n3',
    pattern    : '〜というN',
    reading    : '〜to iu N',
    meaning    : 'N yang bernama ... / N yang disebut ...',
    cat        : 'quotation-thought',
    connection : '「...」 + という + N',
    desc       : '<b>〜というN</b> menghubungkan klausa penjelas dengan nomina: "N yang bernama", "N yang disebut", "N berupa".',
    nuance     : null,
    examples   : [
      { jp: '「侍」<b>という</b>言葉の意味を教えてください。', id: 'Tolong ajari saya arti kata "samurai".' },
      { jp: '田中<b>という</b>人が来ています。', id: 'Ada orang bernama Tanaka yang datang.' },
    ],
    see_also_grammar : ['gn3-00063', 'gn3-00064'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00063',
    level      : 'n3',
    pattern    : '〜ということ',
    reading    : '〜to iu koto',
    meaning    : 'hal bahwa ... / fakta bahwa ...',
    cat        : 'nominalization',
    connection : 'V/Adj plain / N + ということ',
    desc       : '<b>〜ということ</b> mengubah klausa menjadi nomina yang lebih abstrak atau umum: "hal bahwa", "fakta bahwa".',
    nuance     : null,
    examples   : [
      { jp: '彼が来ない<b>ということ</b>を、みんなに伝えてください。', id: 'Tolong sampaikan kepada semua orang bahwa dia tidak akan datang.' },
      { jp: '諦めない<b>ということ</b>が大切です。', id: 'Hal bahwa kita tidak menyerah itu penting.' },
    ],
    see_also_grammar : ['gn3-00062', 'gn3-00031'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00064',
    level      : 'n3',
    pattern    : '〜というのは',
    reading    : '〜to iu no wa',
    meaning    : 'yang disebut ... adalah / maksud dari ... adalah',
    cat        : 'copula',
    connection : 'N / 「...」 + というのは + 文',
    desc       : '<b>〜というのは</b> digunakan untuk mendefinisikan atau menjelaskan suatu istilah atau pernyataan.',
    nuance     : null,
    examples   : [
      { jp: '「武士道」<b>というのは</b>、侍の倫理規範のことです。', id: '"Bushido" adalah norma etika para samurai.' },
      { jp: '行きたくない<b>というのは</b>、本当ですか。', id: 'Apakah benar bahwa kamu tidak mau pergi?' },
    ],
    see_also_grammar : ['gn3-00062'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00065',
    level      : 'n3',
    pattern    : '〜というと / といえば / といったら',
    reading    : '〜to iu to / to ieba / to ittara',
    meaning    : 'berbicara soal ... / kalau bicara tentang ...',
    cat        : 'quotation-thought',
    connection : 'N / 「...」 + というと / といえば / といったら',
    desc       : '<b>〜といえば</b> dan bentuk sejenisnya digunakan untuk menghubungkan topik yang baru disebut dengan asosiasi atau respons tertentu.',
    nuance     : null,
    examples   : [
      { jp: '日本<b>といえば</b>、やはり富士山ですね。', id: 'Kalau bicara tentang Jepang, ya Gunung Fuji.' },
      { jp: '夏<b>というと</b>、お祭りを思い出します。', id: 'Berbicara soal musim panas, saya teringat festival.' },
    ],
    see_also_grammar : ['gn3-00062'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00066',
    level      : 'n3',
    pattern    : '〜といっても',
    reading    : '〜to itte mo',
    meaning    : 'meskipun disebut ... / bukan berarti ...',
    cat        : 'contrast-concession',
    connection : 'N / 「...」 + といっても',
    desc       : '<b>〜といっても</b> menyatakan bahwa meskipun ada label tertentu, kondisinya tidak sebesar atau seintens yang dibayangkan.',
    nuance     : null,
    examples   : [
      { jp: '経験者<b>といっても</b>、まだ半年しかない。', id: 'Meskipun disebut berpengalaman, baru setengah tahun.' },
      { jp: '旅行<b>といっても</b>、近所をぶらぶらするだけ。', id: 'Meskipun disebut wisata, hanya jalan-jalan di sekitar sini saja.' },
    ],
    see_also_grammar : ['gn3-00065'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00067',
    level      : 'n3',
    pattern    : '〜というより',
    reading    : '〜to iu yori',
    meaning    : 'lebih tepatnya ... / daripada disebut ...',
    cat        : 'comparison',
    connection : 'N/V/Adj + というより',
    desc       : '<b>〜というより</b> digunakan untuk mengoreksi atau memperjelas: "daripada dikatakan X, lebih tepat Y".',
    nuance     : null,
    examples   : [
      { jp: '趣味<b>というより</b>、もはや仕事になっている。', id: 'Daripada disebut hobi, itu sudah menjadi pekerjaan.' },
      { jp: '好き<b>というより</b>、尊敬しています。', id: 'Daripada disebut suka, lebih tepatnya saya kagum.' },
    ],
    see_also_grammar : ['gn3-00066'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00068',
    level      : 'n3',
    pattern    : '〜のように / 〜ように（説明）',
    reading    : '〜no you ni',
    meaning    : 'seperti ... / sebagaimana ...',
    cat        : 'comparison',
    connection : 'N + のように / 文 + ように',
    desc       : '<b>〜のように</b> digunakan sebagai pengantar penjelasan atau instruksi yang memiliki nuansa "seperti yang... ", "sebagaimana...".',
    nuance     : null,
    examples   : [
      { jp: '前回説明した<b>ように</b>、この問題は複雑です。', id: 'Seperti yang sudah dijelaskan sebelumnya, masalah ini kompleks.' },
      { jp: '彼女は天使<b>のように</b>歌います。', id: 'Dia menyanyi seperti malaikat.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00069',
    level      : 'n3',
    pattern    : '〜とおり（に）',
    reading    : '〜toori ni',
    meaning    : 'sesuai dengan ... / persis seperti ...',
    cat        : 'sequential-temporal',
    connection : 'Vた / N + の + とおり（に）',
    desc       : '<b>〜とおり（に）</b> menyatakan melakukan sesuatu persis seperti yang ditunjukkan, dikatakan, atau diinstruksikan.',
    nuance     : null,
    examples   : [
      { jp: '先生に言われた<b>とおり</b>にやってみました。', id: 'Saya mencoba melakukannya persis seperti yang dikatakan guru.' },
      { jp: '予想した<b>とおり</b>になりました。', id: 'Hasilnya persis seperti yang diperkirakan.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00070',
    level      : 'n3',
    pattern    : '〜ように言う / 頼む',
    reading    : '〜you ni iu / tanomu',
    meaning    : 'menyuruh agar ... / meminta supaya ...',
    cat        : 'sentence-final-request',
    connection : 'N (orang) + に + Vる/ない + ように + 言う/頼む/伝える',
    desc       : '<b>〜ように言う/頼む</b> digunakan untuk melaporkan perintah atau permintaan tidak langsung.',
    nuance     : null,
    examples   : [
      { jp: '先生に早く来る<b>ように言われました</b>。', id: 'Guru menyuruh saya untuk datang lebih awal.' },
      { jp: '彼に静かにする<b>ように頼んだ</b>。', id: 'Saya meminta dia agar diam.' },
    ],
    see_also_grammar : ['gn3-00071'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00071',
    level      : 'n3',
    pattern    : '〜ように（目的）',
    reading    : '〜you ni (tujuan)',
    meaning    : 'agar ... / supaya ...',
    cat        : 'purpose',
    connection : 'Vる/ない + ように + V(usaha)',
    desc       : '<b>〜ように（目的）</b> menyatakan tujuan agar kondisi tertentu terwujud. Berbeda dari ために: ように untuk kondisi/keadaan, ために untuk tindakan langsung.',
    nuance     : null,
    examples   : [
      { jp: '忘れない<b>ように</b>、メモをとった。', id: 'Mencatat agar tidak lupa.' },
      { jp: '合格できる<b>ように</b>、毎日勉強しています。', id: 'Belajar setiap hari agar bisa lulus.' },
    ],
    see_also_grammar : ['gn3-00070'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EKSPRESI BERMACAM (gn3-00072 – gn3-00085)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00072',
    level      : 'n3',
    pattern    : '〜ものだ',
    reading    : '〜mono da',
    meaning    : 'memang sudah begitulah / wajar bahwa ...',
    cat        : 'sequential-temporal',
    connection : 'Vる / Adjい + ものだ',
    desc       : '<b>〜ものだ</b> digunakan untuk: (1) menyatakan kebenaran umum atau sifat alami, (2) kenangan akan kebiasaan di masa lalu, (3) rasa kagum.',
    nuance     : 'Vた + ものだ = kenangan: 子どもの頃よく遊んだものだ.',
    examples   : [
      { jp: '人生は思い通りにならない<b>ものだ</b>。', id: 'Memang hidup tidak selalu berjalan sesuai keinginan.' },
      { jp: '子どもの頃はよく川で遊んだ<b>ものだ</b>。', id: 'Waktu kecil dulu sering bermain di sungai.' },
    ],
    see_also_grammar : ['gn3-00073'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00073',
    level      : 'n3',
    pattern    : '〜ことだ',
    reading    : '〜koto da',
    meaning    : 'yang penting adalah ... / sebaiknya ...',
    cat        : 'sentence-final-request',
    connection : 'Vる / Vない + ことだ',
    desc       : '<b>〜ことだ</b> digunakan untuk memberikan saran atau menyatakan hal yang paling penting untuk dilakukan.',
    nuance     : null,
    examples   : [
      { jp: '健康のためには、よく寝る<b>ことだ</b>。', id: 'Yang penting untuk kesehatan adalah tidur yang cukup.' },
      { jp: 'まず医者に診てもらう<b>ことだ</b>。', id: 'Pertama-tama, sebaiknya periksa ke dokter.' },
    ],
    see_also_grammar : ['gn3-00072'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00074',
    level      : 'n3',
    pattern    : '〜ことか',
    reading    : '〜koto ka',
    meaning    : 'betapa ... / sungguh ...',
    cat        : 'sentence-final-modality',
    connection : '疑問詞 + Vた/Adjい + ことか',
    desc       : '<b>〜ことか</b> mengekspresikan perasaan yang kuat, biasanya digunakan dengan kata tanya (何度、どれほど, dll): "betapa", "sungguh".',
    nuance     : null,
    examples   : [
      { jp: 'どれほど心配した<b>ことか</b>。', id: 'Betapa saya sudah sangat khawatir.' },
      { jp: '何度泣いた<b>ことか</b>。', id: 'Sungguh berkali-kali saya menangis.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00075',
    level      : 'n3',
    pattern    : '〜ふりをする',
    reading    : '〜furi wo suru',
    meaning    : 'berpura-pura ... / pura-pura ...',
    cat        : 'sentence-final-modality',
    connection : 'Vている / Adj / N + の + ふりをする',
    desc       : '<b>〜ふりをする</b> menyatakan berpura-pura melakukan atau berada dalam suatu keadaan.',
    nuance     : null,
    examples   : [
      { jp: '聞いたふり<b>をして</b>いた。', id: 'Dia berpura-pura sudah mendengar.' },
      { jp: '知らない<b>ふりをして</b>ください。', id: 'Tolong pura-pura tidak tahu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00076',
    level      : 'n3',
    pattern    : '〜っぽい',
    reading    : '〜ppoi',
    meaning    : 'keliatan seperti ... / tampak ...',
    cat        : 'conjecture-possibility',
    connection : 'N / V-ます語幹 / Adj語幹 + っぽい',
    desc       : '<b>〜っぽい</b> menyatakan kesan atau kecenderungan: "tampaknya", "sepertinya". Bernada kasual.',
    nuance     : null,
    examples   : [
      { jp: 'この料理は子ども<b>っぽい</b>。', id: 'Masakan ini seperti makanan anak-anak.' },
      { jp: '彼は忘れ<b>っぽい</b>性格だ。', id: 'Karakternya mudah lupa.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00077',
    level      : 'n3',
    pattern    : '〜つもりだった',
    reading    : '〜tsumori datta',
    meaning    : 'tadinya bermaksud ... / rencananya ...',
    cat        : 'volitional-intention',
    connection : 'Vる / Vない + つもりだった',
    desc       : '<b>〜つもりだった</b> menyatakan niat atau rencana di masa lalu yang akhirnya tidak terlaksana.',
    nuance     : null,
    examples   : [
      { jp: '早く帰る<b>つもりだった</b>が、残業になった。', id: 'Tadinya bermaksud pulang cepat, tapi harus lembur.' },
      { jp: '怒らない<b>つもりだったのに</b>、つい怒ってしまった。', id: 'Rencananya tidak mau marah, tapi tanpa sengaja marah juga.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00078',
    level      : 'n3',
    pattern    : '〜ますように / 〜ませんように',
    reading    : '〜masu you ni / masen you ni',
    meaning    : 'semoga ... / mudah-mudahan ...',
    cat        : 'desire-want',
    connection : 'V-ます / V-ません + ように',
    desc       : '<b>〜ますように</b> digunakan untuk berdoa atau mengungkapkan harapan: "semoga", "mudah-mudahan".',
    nuance     : null,
    examples   : [
      { jp: '試験に合格し<b>ますように</b>。', id: 'Semoga lulus ujian.' },
      { jp: 'もう二度と戦争が起き<b>ませんように</b>。', id: 'Semoga perang tidak terjadi lagi.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00079',
    level      : 'n3',
    pattern    : '〜といいなあ / 〜たらいいなあ',
    reading    : '〜to ii naa / tara ii naa',
    meaning    : 'alangkah baiknya kalau ... / andai bisa ...',
    cat        : 'desire-want',
    connection : 'Vる + といいなあ / Vたら + いいなあ',
    desc       : '<b>〜といいなあ / 〜たらいいなあ</b> mengungkapkan harapan atau keinginan yang tidak pasti terwujud, dalam monolog atau percakapan.',
    nuance     : null,
    examples   : [
      { jp: '明日晴れる<b>といいなあ</b>。', id: 'Alangkah baiknya kalau besok cerah.' },
      { jp: '宝くじが当たっ<b>たらいいなあ</b>。', id: 'Andai bisa menang lotre.' },
    ],
    see_also_grammar : ['gn3-00078'],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00080',
    level      : 'n3',
    pattern    : 'まるで〜のよう / 〜みたい',
    reading    : 'maru de〜no you / mitai',
    meaning    : 'seperti ... / bagaikan ...',
    cat        : 'comparison',
    connection : 'まるで + N + の + ようだ / みたいだ',
    desc       : '<b>まるで〜ようだ / みたいだ</b> memperkuat perumpamaan: "benar-benar seperti", "bagaikan".',
    nuance     : null,
    examples   : [
      { jp: '<b>まるで</b>夢<b>のようだ</b>。', id: 'Benar-benar seperti mimpi.' },
      { jp: 'その子は<b>まるで</b>人形<b>みたい</b>にかわいい。', id: 'Anak itu lucu bagaikan boneka.' },
    ],
    see_also_grammar : ['gn3-00068'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00081',
    level      : 'n3',
    pattern    : '〜ことにしている / 〜ことにした',
    reading    : '〜koto ni shite iru / shita',
    meaning    : 'sudah membiasakan diri / memutuskan untuk ...',
    cat        : 'volitional-intention',
    connection : 'Vる / Vない + ことにしている / ことにした',
    desc       : '<b>〜ことにしている</b>: kebiasaan yang sudah mapan atas keputusan sendiri. <b>〜ことにした</b>: keputusan yang baru diambil.',
    nuance     : null,
    examples   : [
      { jp: '毎朝30分ウォーキングする<b>ことにしている</b>。', id: 'Sudah membiasakan diri berjalan kaki 30 menit setiap pagi.' },
      { jp: 'タバコをやめる<b>ことにした</b>。', id: 'Memutuskan untuk berhenti merokok.' },
    ],
    see_also_grammar : ['gn3-00082'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00082',
    level      : 'n3',
    pattern    : '〜ことになっている / 〜ことになった',
    reading    : '〜koto ni natte iru / natta',
    meaning    : 'sudah ditetapkan / sesuai aturan ...',
    cat        : 'volitional-intention',
    connection : 'Vる / Vない + ことになっている / ことになった',
    desc       : '<b>〜ことになっている</b>: ada aturan atau kesepakatan yang berlaku. <b>〜ことになった</b>: keputusan yang datang dari luar diri sendiri.',
    nuance     : null,
    examples   : [
      { jp: '会議は毎週月曜日に行われる<b>ことになっています</b>。', id: 'Rapat ditetapkan diadakan setiap Senin.' },
      { jp: '来月転勤する<b>ことになった</b>。', id: 'Diputuskan bahwa bulan depan saya pindah tugas.' },
    ],
    see_also_grammar : ['gn3-00081'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00083',
    level      : 'n3',
    pattern    : '〜ような気がする',
    reading    : '〜you na ki ga suru',
    meaning    : 'rasanya ... / sepertinya ...',
    cat        : 'conjecture-possibility',
    connection : 'V/Adj plain / N + の + ような気がする',
    desc       : '<b>〜ような気がする</b> mengekspresikan perasaan subjektif atau intuisi: "rasanya", "seperti ada perasaan bahwa".',
    nuance     : null,
    examples   : [
      { jp: '今日は何か良いことがある<b>ような気がする</b>。', id: 'Rasanya hari ini akan ada sesuatu yang baik.' },
      { jp: '彼に会ったことがある<b>ような気がする</b>。', id: 'Sepertinya saya pernah bertemu dia.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00084',
    level      : 'n3',
    pattern    : '〜に〜られた (pasif dengan objek yang menderita)',
    reading    : '〜ni〜rareta',
    meaning    : 'dilakukan X kepada saya oleh ...',
    cat        : 'passive',
    connection : 'N (orang) + に + N(部位) + を + Vられた',
    desc       : '<b>〜に〜られた</b> mengungkapkan pasif penderitaan: subjek terkena dampak negatif dari tindakan orang lain terhadap bagian tubuh atau miliknya.',
    nuance     : null,
    examples   : [
      { jp: '電車で財布を盗まれた。', id: 'Dompet saya dicuri di kereta.' },
      { jp: '友だちに秘密を話され<b>て</b>しまった。', id: 'Rahasia saya dibocorkan oleh teman.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00085',
    level      : 'n3',
    pattern    : '〜られている (pasif — keadaan berlanjut)',
    reading    : '〜rarete iru',
    meaning    : 'sedang di- / diketahui bahwa ...',
    cat        : 'passive',
    connection : 'Vられて + いる',
    desc       : '<b>〜られている</b> digunakan untuk menyatakan keadaan yang merupakan hasil pasif (banyak digunakan dalam teks akademis/berita): "diketahui", "dipercaya", "digunakan".',
    nuance     : null,
    examples   : [
      { jp: 'この薬は世界中で広く使われ<b>ています</b>。', id: 'Obat ini banyak digunakan di seluruh dunia.' },
      { jp: '彼の絵は美術館に飾られ<b>ています</b>。', id: 'Lukisannya dipajang di museum.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KONJUNGSI N3 (gn3-00086 – gn3-00090)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00086',
    level      : 'n3',
    pattern    : '〜ところが',
    reading    : '〜tokoro ga',
    meaning    : 'namun ternyata / tapi sebaliknya',
    cat        : 'listing-addition',
    connection : '文1。ところが、文2。',
    desc       : '<b>〜ところが</b> menghubungkan dua kalimat yang hasilnya berlawanan dari yang diharapkan. Menekankan kejutan atau ketidaksesuaian.',
    nuance     : null,
    examples   : [
      { jp: '簡単だと思っていた。<b>ところが</b>、とても難しかった。', id: 'Saya pikir mudah. Namun ternyata sangat sulit.' },
      { jp: '急いで行った。<b>ところが</b>、店はもう閉まっていた。', id: 'Pergi terburu-buru. Tapi ternyata toko sudah tutup.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00087',
    level      : 'n3',
    pattern    : '〜ところで',
    reading    : '〜tokoro de',
    meaning    : 'ngomong-ngomong / omong-omong',
    cat        : 'listing-addition',
    connection : '文1。ところで、文2。',
    desc       : '<b>〜ところで</b> digunakan untuk mengalihkan topik pembicaraan: "ngomong-ngomong", "omong-omong".',
    nuance     : null,
    examples   : [
      { jp: 'それはよかった。<b>ところで</b>、来週の予定は？', id: 'Itu bagus. Ngomong-ngomong, rencana minggu depan?' },
      { jp: '<b>ところで</b>、もう昼食は食べましたか？', id: 'Omong-omong, sudah makan siang?' },
    ],
    see_also_grammar : ['gn3-00086'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00088',
    level      : 'n3',
    pattern    : '〜つまり',
    reading    : '〜tsumari',
    meaning    : 'maksudnya ... / dengan kata lain ...',
    cat        : 'listing-addition',
    connection : '文1。つまり、文2。',
    desc       : '<b>〜つまり</b> digunakan untuk merangkum, menyimpulkan, atau menyederhanakan apa yang telah dikatakan: "maksudnya", "jadi", "dengan kata lain".',
    nuance     : null,
    examples   : [
      { jp: '彼は昨日も一昨日も来なかった。<b>つまり</b>、もう来ないつもりだろう。', id: 'Dia kemarin dan kemarin lusa tidak datang. Maksudnya, sepertinya dia sudah tidak berniat datang.' },
      { jp: '彼女は仕事もやめて、家族とも連絡を絶った。<b>つまり</b>、一人で生きていくつもりなのだ。', id: 'Dia berhenti kerja dan memutus kontak dengan keluarga. Dengan kata lain, dia berniat hidup sendiri.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00089',
    level      : 'n3',
    pattern    : '〜だっけ',
    reading    : '〜dakke',
    meaning    : '... ya? / ... kan? (mengingat-ingat)',
    cat        : 'sentence-final-modality',
    connection : 'V/Adj plain / N + だっけ',
    desc       : '<b>〜だっけ</b> digunakan ketika pembicara mencoba mengingat-ingat informasi atau meminta konfirmasi dari lawan bicara secara kasual.',
    nuance     : null,
    examples   : [
      { jp: 'パーティーは何時から<b>だっけ</b>？', id: 'Pestanya mulai jam berapa ya?' },
      { jp: '田中さんって、結婚してる<b>んだっけ</b>？', id: 'Tanaka-san sudah menikah kan?' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00090',
    level      : 'n3',
    pattern    : '〜だもん / 〜だもの',
    reading    : '〜damon / da mono',
    meaning    : 'kan ... / soalnya ... (pembenaran kasual)',
    cat        : 'sentence-final-modality',
    connection : 'V/Adj plain / N + だもん / だもの',
    desc       : '<b>〜だもん / 〜だもの</b> digunakan sebagai pembenaran atau alasan kasual, bernada sedikit merengek atau membela diri.',
    nuance     : null,
    examples   : [
      { jp: '食べちゃった。だっておいしかった<b>んだもん</b>。', id: 'Sudah kumakan. Soalnya enak sih.' },
      { jp: '仕方ない<b>でしょ</b>、疲れてる<b>んだもの</b>。', id: 'Tidak bisa disalahkan, soalnya capek.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TAMBAHAN PENTING N3 (gn3-00091 – gn3-00100)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id         : 'gn3-00091',
    level      : 'n3',
    pattern    : '〜うえで (setelah / dalam hal)',
    reading    : '〜ue de',
    meaning    : 'setelah ... / dalam hal ... / untuk ...',
    cat        : 'sequential-temporal',
    connection : 'Vた / N + の + うえで',
    desc       : '<b>〜うえで</b> memiliki dua makna: (1) setelah melakukan X, barulah Y (urutan); (2) dalam konteks atau bidang X.',
    nuance     : null,
    examples   : [
      { jp: 'よく考えた<b>うえで</b>、決断します。', id: 'Setelah memikirkan dengan baik, saya akan mengambil keputusan.' },
      { jp: 'ビジネス<b>の上で</b>は、礼儀が大切です。', id: 'Dalam hal bisnis, kesopanan itu penting.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00092',
    level      : 'n3',
    pattern    : '〜ものか / 〜もんか',
    reading    : '〜mono ka / mon ka',
    meaning    : 'tidak sudi ... / masa mau ... (penolakan tegas)',
    cat        : 'sentence-final-modality',
    connection : 'Vる / Adjい + ものか',
    desc       : '<b>〜ものか</b> menyatakan penolakan tegas atau tekad kuat untuk tidak melakukan sesuatu: "tidak sudi", "masa mau".',
    nuance     : null,
    examples   : [
      { jp: 'あんな人に頼む<b>ものか</b>！', id: 'Masa mau minta tolong kepada orang seperti itu!' },
      { jp: '絶対に負ける<b>ものか</b>！', id: 'Tidak sudi kalah!' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00093',
    level      : 'n3',
    pattern    : '〜てごらん',
    reading    : '〜te goran',
    meaning    : 'coba lakukan ... / cobalah ...',
    cat        : 'sentence-final-request',
    connection : 'Vて + ごらん',
    desc       : '<b>〜てごらん</b> digunakan untuk menyarankan atau menantang seseorang untuk mencoba sesuatu. Digunakan oleh orang yang lebih tua/memiliki otoritas kepada yang lebih muda.',
    nuance     : null,
    examples   : [
      { jp: 'やって<b>みてごらん</b>。きっとできるよ。', id: 'Coba lakukan. Pasti bisa.' },
      { jp: 'この本を読んで<b>ごらん</b>。面白いから。', id: 'Coba baca buku ini. Karena menarik.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00094',
    level      : 'n3',
    pattern    : '〜に〜かわって',
    reading    : '〜ni〜kawatte',
    meaning    : 'menggantikan ... / atas nama ...',
    cat        : 'contrast-concession',
    connection : 'N + に + かわって',
    desc       : '<b>〜にかわって</b> menyatakan melakukan sesuatu menggantikan orang lain atau atas nama seseorang.',
    nuance     : null,
    examples   : [
      { jp: '父<b>にかわって</b>、私が挨拶します。', id: 'Menggantikan ayah, saya yang akan menyampaikan sambutan.' },
      { jp: '全員<b>にかわって</b>お礼申し上げます。', id: 'Atas nama semua anggota, saya menyampaikan terima kasih.' },
    ],
    see_also_grammar : ['gn3-00025'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00095',
    level      : 'n3',
    pattern    : '〜んだって',
    reading    : '〜n datte',
    meaning    : 'katanya ... / memangnya ...',
    cat        : 'hearsay-report',
    connection : 'V/Adj plain / N + んだって',
    desc       : '<b>〜んだって</b> adalah bentuk kasual untuk melaporkan informasi yang didengar dari orang lain: "katanya".',
    nuance     : null,
    examples   : [
      { jp: '田中さん、転職する<b>んだって</b>。', id: 'Katanya Tanaka-san mau ganti pekerjaan.' },
      { jp: '明日休みな<b>んだって</b>。', id: 'Katanya besok libur.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00096',
    level      : 'n3',
    pattern    : '〜のこと',
    reading    : '〜no koto',
    meaning    : 'tentang ... / hal mengenai ...',
    cat        : 'quotation-thought',
    connection : 'N + のこと',
    desc       : '<b>〜のこと</b> digunakan untuk menandai topik pembicaraan yang lebih personal atau mendalam: "hal tentang", "soal".',
    nuance     : null,
    examples   : [
      { jp: 'あなた<b>のこと</b>が好きです。', id: 'Saya suka kamu.' },
      { jp: '仕事<b>のこと</b>で相談があります。', id: 'Saya punya hal yang ingin didiskusikan mengenai pekerjaan.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00097',
    level      : 'n3',
    pattern    : '〜のを',
    reading    : '〜no wo',
    meaning    : 'hal ... / tindakan ... (nominalisasi objek)',
    cat        : 'nominalization',
    connection : 'V + の + を + V',
    desc       : '<b>〜のを</b> menominalisasi klausa verba dan menjadikannya objek dari verba lain. Sering dengan verba persepsi (見る, 聞く, 知る) atau verba emosi.',
    nuance     : null,
    examples   : [
      { jp: '彼が走っている<b>のを</b>見た。', id: 'Saya melihat dia sedang berlari.' },
      { jp: '財布を落とした<b>のを</b>気づかなかった。', id: 'Tidak menyadari bahwa dompet terjatuh.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00098',
    level      : 'n3',
    pattern    : '〜くらい / 〜ぐらい / 〜ほど（程度）',
    reading    : '〜kurai / gurai / hodo (teido)',
    meaning    : 'sekitar ... / sampai-sampai ... / sedemikian ...',
    cat        : 'extent-degree',
    connection : 'V/Adj + くらい / ぐらい / ほど',
    desc       : '<b>〜くらい / 〜ほど (derajat)</b> menyatakan tingkat atau ukuran: "sampai-sampai", "sedemikian", "sekitar". Menekankan derajat yang ekstrem.',
    nuance     : null,
    examples   : [
      { jp: '泣きたい<b>ほど</b>嬉しかった。', id: 'Senangnya sampai ingin menangis.' },
      { jp: '死ぬ<b>くらい</b>疲れた。', id: 'Capai sampai seperti mau mati.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00099',
    level      : 'n3',
    pattern    : 'もしかすると / もしかしたら〜かもしれない',
    reading    : 'moshikasuru to / moshikashitara〜kamo shirenai',
    meaning    : 'mungkin saja ... / bisa jadi ...',
    cat        : 'conjecture-possibility',
    connection : 'もしかすると / もしかしたら + 文 + かもしれない',
    desc       : '<b>もしかすると〜かもしれない</b> memperkuat ekspresi kemungkinan yang tidak pasti: "mungkin saja", "bisa jadi".',
    nuance     : null,
    examples   : [
      { jp: '<b>もしかすると</b>、彼女は知っている<b>かもしれない</b>。', id: 'Mungkin saja dia tahu.' },
      { jp: '<b>もしかしたら</b>、雨が降る<b>かもしれない</b>から傘を持って行こう。', id: 'Bisa jadi hujan, jadi ayo bawa payung.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00101',
    level      : 'n3',
    pattern    : '〜てくれと頼まれた / 〜なと言われた',
    reading    : '〜te kure to tanomareta / na to iwareta',
    meaning    : 'diminta untuk ... / diberitahu jangan ...',
    cat        : 'quotation-thought',
    connection : '「〜てくれ」と頼まれた / 「〜な」と言われた',
    desc       : '<b>〜てくれと頼まれた</b>: diminta melakukan sesuatu (kutipan tidak langsung). <b>〜なと言われた</b>: diberitahu untuk tidak melakukan sesuatu.',
    nuance     : null,
    examples   : [
      { jp: '手伝ってくれ<b>と頼まれた</b>。', id: 'Diminta untuk membantu.' },
      { jp: '無理するな<b>と言われた</b>。', id: 'Diberitahu agar tidak memaksakan diri.' },
    ],
    see_also_grammar : ['gn3-00070'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00102',
    level      : 'n3',
    pattern    : '〜とく / 〜といて (kasual)',
    reading    : '〜toku / toite',
    meaning    : 'melakukan ... terlebih dahulu (kasual)',
    cat        : 'progressive-state',
    connection : 'Vて + おく → とく / といて',
    desc       : '<b>〜とく / 〜といて</b> adalah kontraksi kasual dari 〜ておく / 〜ておいて.',
    nuance     : null,
    examples   : [
      { jp: '宿題やっ<b>とく</b>ね。', id: 'PR kukerjakan dulu ya.' },
      { jp: 'ドアを開け<b>といて</b>ください。', id: 'Tolong biarkan pintu dibuka dulu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
    id         : 'gn3-00103',
    level      : 'n3',
    pattern    : '〜み (nominalisasi adjektif)',
    reading    : '〜mi',
    meaning    : 'rasa ... / kesan ... (nominalisasi adjektif)',
    cat        : 'nominalization',
    connection : 'Adj-i語幹 + み',
    desc       : '<b>〜み</b> mengubah adjektif menjadi nomina yang menyatakan kualitas atau kesan yang dirasakan. Berbeda dari さ yang lebih objektif.',
    nuance     : 'さ = ukuran objektif; み = kesan/rasa yang dirasakan.',
    examples   : [
      { jp: 'この物語には深<b>み</b>がある。', id: 'Kisah ini punya kedalaman.' },
      { jp: '子どもらし<b>い</b>かわいら<b>しみ</b>があります。', id: 'Ada kepolosan yang menggemaskan khas anak-anak.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Tidak semua adjektif bisa membentuk 〜み. Yang umum: 深み, 甘み, 辛み, 面白み, 親しみ.',
  },

  {
    id         : 'gn3-00104',
    level      : 'n3',
    pattern    : '〜かな（あ）',
    reading    : '〜kana(a)',
    meaning    : '... ya kira-kira / ... ya (monolog)',
    cat        : 'sentence-final-modality',
    connection : 'V/Adj plain / N + かな(あ)',
    desc       : '<b>〜かな（あ）</b> digunakan dalam monolog atau percakapan kasual untuk mengekspresikan keraguan, keheranan, atau harapan.',
    nuance     : null,
    examples   : [
      { jp: 'もうそろそろ来る<b>かなあ</b>。', id: 'Kira-kira sebentar lagi datang ya.' },
      { jp: '明日晴れる<b>かな</b>。', id: 'Besok cerah ya kira-kira.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'spoken',
    exceptions : null,
    notes      : null,
  },

  {
      "id": "gn3-00105",
      "level": "n3",
      "pattern": "〜ば〜ほど",
      "reading": "~ba ~hodo",
      "meaning": "semakin ... semakin ...",
      "cat": "kondisional",
      "connection": "V-ば形 + V辞書形 + ほど",
      "desc": "<b>〜ば〜ほど</b> menyatakan bahwa semakin banyak sesuatu dilakukan, semakin kuat efeknya. Bentuk: Verb-ば + verb yang sama 辞書形 + ほど.",
      "nuance": "Menekankan proporsi — perubahan progresif. Sering digunakan untuk menggambarkan pengalaman mendalam.",
      "examples": [
          {
              "jp": "考え<b>れば</b>考える<b>ほど</b>わからなくなる。",
              "id": "Semakin dipikirkan, semakin tidak paham.",
              "level": "n3",
              "tags": [
                  "kondisional"
              ]
          },
          {
              "jp": "練習す<b>れば</b>する<b>ほど</b>上手になる。",
              "id": "Semakin berlatih, semakin mahir.",
              "level": "n3",
              "tags": [
                  "kondisional"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00025",
          "gn3-00026"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00106",
      "level": "n3",
      "pattern": "〜ばよかった",
      "reading": "~ba yokatta",
      "meaning": "seharusnya ... (penyesalan)",
      "cat": "kondisional",
      "connection": "V-ば形 + よかった",
      "desc": "<b>〜ばよかった</b> menyatakan penyesalan bahwa sesuatu tidak dilakukan. Harfiah: 'Kalau saja melakukan..., akan baik.'",
      "nuance": "Ekspresi penyesalan yang kuat. Sering dipakai untuk self-reflection.",
      "examples": [
          {
              "jp": "もっと勉強す<b>ればよかった</b>。",
              "id": "Seharusnya belajar lebih giat.",
              "level": "n3",
              "tags": [
                  "penyesalan"
              ]
          },
          {
              "jp": "傘を持ってく<b>ればよかった</b>。",
              "id": "Seharusnya bawa payung.",
              "level": "n3",
              "tags": [
                  "penyesalan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00025"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00107",
      "level": "n3",
      "pattern": "〜さえ〜ば",
      "reading": "~sae ~ba",
      "meaning": "asalkan ... saja",
      "cat": "kondisional",
      "connection": "N + さえ + V-ば形 / V-ます形 + さえすれば",
      "desc": "<b>〜さえ〜ば</b> menyatakan bahwa satu kondisi saja sudah cukup untuk hasil yang diinginkan.",
      "nuance": "Menekankan syarat minimum — 'cukup ini saja'. Nuansa: hal lain tidak penting.",
      "examples": [
          {
              "jp": "薬を飲み<b>さえすれば</b>治る。",
              "id": "Asalkan minum obat saja, akan sembuh.",
              "level": "n3",
              "tags": [
                  "kondisional"
              ]
          },
          {
              "jp": "お金<b>さえあれば</b>幸せだと思っていた。",
              "id": "Dulu berpikir asalkan punya uang saja sudah bahagia.",
              "level": "n3",
              "tags": [
                  "kondisional"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00025"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00108",
      "level": "n3",
      "pattern": "〜ないで",
      "reading": "~naide",
      "meaning": "tanpa melakukan ...",
      "cat": "penyangkalan",
      "connection": "V-ない形 + で",
      "desc": "<b>〜ないで</b> memiliki dua fungsi: (1) tanpa melakukan sesuatu, atau (2) permintaan untuk tidak melakukan (〜ないでください).",
      "nuance": "Berbeda dari 〜なくて yang lebih menekankan alasan/sebab. 〜ないで menekankan keadaan bersamaan.",
      "examples": [
          {
              "jp": "朝ごはんを食べ<b>ないで</b>学校に行った。",
              "id": "Pergi ke sekolah tanpa sarapan.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          },
          {
              "jp": "心配し<b>ないで</b>ください。",
              "id": "Jangan khawatir.",
              "level": "n3",
              "tags": [
                  "permintaan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00018"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00109",
      "level": "n3",
      "pattern": "〜わけがない",
      "reading": "~wake ga nai",
      "meaning": "tidak mungkin ...",
      "cat": "penyangkalan",
      "connection": "V普通形 / Adj普通形 / N + な + わけがない",
      "desc": "<b>〜わけがない</b> menyatakan bahwa sesuatu secara logis tidak mungkin terjadi. Penolakan kuat berdasarkan alasan.",
      "nuance": "Lebih kuat dari 〜はずがない. Pembicara yakin 100% bahwa hal tersebut mustahil.",
      "examples": [
          {
              "jp": "そんなことがある<b>わけがない</b>。",
              "id": "Tidak mungkin hal seperti itu ada.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          },
          {
              "jp": "彼が嘘をつく<b>わけがない</b>。",
              "id": "Tidak mungkin dia berbohong.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00048",
          "gn3-00110"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00110",
      "level": "n3",
      "pattern": "〜わけではない",
      "reading": "~wake dewa nai",
      "meaning": "bukan berarti ...",
      "cat": "penyangkalan",
      "connection": "V普通形 / Adj普通形 / N + な + わけではない",
      "desc": "<b>〜わけではない</b> menyatakan partial negation — bukan sepenuhnya begitu. Mengoreksi asumsi.",
      "nuance": "Negasi parsial. Mengakui sebagian tapi menolak generalisasi. Sangat berguna untuk nuansa.",
      "examples": [
          {
              "jp": "嫌いな<b>わけではない</b>けど、あまり食べない。",
              "id": "Bukan berarti tidak suka, tapi jarang makan.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          },
          {
              "jp": "お金がない<b>わけではない</b>。",
              "id": "Bukan berarti tidak punya uang.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00109"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00111",
      "level": "n3",
      "pattern": "〜ずに",
      "reading": "~zu ni",
      "meaning": "tanpa melakukan ... (formal)",
      "cat": "penyangkalan",
      "connection": "V-ない形 (remove ない, add ず) + に / する→せずに",
      "desc": "<b>〜ずに</b> adalah bentuk formal/tulisan dari 〜ないで. Menyatakan melakukan sesuatu tanpa melakukan hal lain.",
      "nuance": "Lebih formal dari 〜ないで. Sering muncul di tulisan dan pidato. する menjadi せず.",
      "examples": [
          {
              "jp": "辞書を使わ<b>ずに</b>読んだ。",
              "id": "Membaca tanpa menggunakan kamus.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          },
          {
              "jp": "何も言わ<b>ずに</b>帰った。",
              "id": "Pulang tanpa berkata apa-apa.",
              "level": "n3",
              "tags": [
                  "penyangkalan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00108"
      ],
      "see_also_vocab": [],
      "register": "written",
      "exceptions": "する → せず",
      "notes": null
  },

  {
      "id": "gn3-00112",
      "level": "n3",
      "pattern": "〜ざるを得ない",
      "reading": "~zaru wo enai",
      "meaning": "terpaksa harus ...",
      "cat": "keharusan",
      "connection": "V-ない形 (remove ない, add ざるを得ない) / する→せざるを得ない",
      "desc": "<b>〜ざるを得ない</b> menyatakan bahwa seseorang terpaksa melakukan sesuatu meskipun tidak ingin.",
      "nuance": "Sangat formal. Menekankan keterpaksaan. する menjadi せざるを得ない.",
      "examples": [
          {
              "jp": "締め切りがあるので、残業<b>せざるを得ない</b>。",
              "id": "Karena ada deadline, terpaksa harus lembur.",
              "level": "n3",
              "tags": [
                  "keharusan"
              ]
          },
          {
              "jp": "事実を認め<b>ざるを得ない</b>。",
              "id": "Terpaksa harus mengakui kenyataan.",
              "level": "n3",
              "tags": [
                  "keharusan"
              ]
          }
      ],
      "see_also_grammar": [],
      "see_also_vocab": [],
      "register": "formal",
      "exceptions": "する → せざるを得ない",
      "notes": null
  },

  {
      "id": "gn3-00113",
      "level": "n3",
      "pattern": "〜たとたんに",
      "reading": "~ta totan ni",
      "meaning": "begitu ... langsung ...",
      "cat": "temporal",
      "connection": "V-た形 + とたんに",
      "desc": "<b>〜たとたんに</b> menyatakan bahwa tepat setelah aksi pertama selesai, aksi kedua langsung terjadi secara tidak terduga.",
      "nuance": "Aksi kedua harus tidak disengaja/tak terduga. Tidak bisa dipakai untuk tindakan yang direncanakan.",
      "examples": [
          {
              "jp": "ドアを開けた<b>とたんに</b>猫が飛び出した。",
              "id": "Begitu pintu dibuka, kucing langsung melompat keluar.",
              "level": "n3",
              "tags": [
                  "temporal"
              ]
          },
          {
              "jp": "薬を飲んだ<b>とたんに</b>眠くなった。",
              "id": "Begitu minum obat, langsung mengantuk.",
              "level": "n3",
              "tags": [
                  "temporal"
              ]
          }
      ],
      "see_also_grammar": [],
      "see_also_vocab": [],
      "register": null,
      "exceptions": "Hasil harus tidak disengaja",
      "notes": null
  },

  {
      "id": "gn3-00114",
      "level": "n3",
      "pattern": "〜たびに",
      "reading": "~tabi ni",
      "meaning": "setiap kali ...",
      "cat": "frekuensi",
      "connection": "V辞書形 / N + の + たびに",
      "desc": "<b>〜たびに</b> menyatakan bahwa setiap kali suatu kejadian terjadi, hal lain selalu ikut terjadi.",
      "nuance": "Menekankan pola berulang yang konsisten. Nuansa: hal tersebut selalu tanpa kecuali.",
      "examples": [
          {
              "jp": "日本に行く<b>たびに</b>新しい発見がある。",
              "id": "Setiap kali ke Jepang, selalu ada penemuan baru.",
              "level": "n3",
              "tags": [
                  "frekuensi"
              ]
          },
          {
              "jp": "会う<b>たびに</b>きれいになっている。",
              "id": "Setiap kali bertemu, semakin cantik.",
              "level": "n3",
              "tags": [
                  "frekuensi"
              ]
          }
      ],
      "see_also_grammar": [],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00115",
      "level": "n3",
      "pattern": "〜ことにする",
      "reading": "~koto ni suru",
      "meaning": "memutuskan untuk ...",
      "cat": "keputusan",
      "connection": "V辞書形 / V-ない形 + ことにする",
      "desc": "<b>〜ことにする</b> menyatakan keputusan aktif yang dibuat oleh pembicara. Pembicara secara sadar memilih.",
      "nuance": "Berbeda dari 〜ことになる (keputusan dari luar). ことにする = keputusan pribadi.",
      "examples": [
          {
              "jp": "来月から運動する<b>ことにした</b>。",
              "id": "Memutuskan untuk berolahraga mulai bulan depan.",
              "level": "n3",
              "tags": [
                  "keputusan"
              ]
          },
          {
              "jp": "甘いものを食べない<b>ことにする</b>。",
              "id": "Memutuskan untuk tidak makan makanan manis.",
              "level": "n3",
              "tags": [
                  "keputusan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00116"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00116",
      "level": "n3",
      "pattern": "〜ことになる",
      "reading": "~koto ni naru",
      "meaning": "diputuskan bahwa ... / jadi ...",
      "cat": "keputusan",
      "connection": "V辞書形 / V-ない形 + ことになる",
      "desc": "<b>〜ことになる</b> menyatakan keputusan yang berasal dari luar (organisasi, keadaan), bukan keputusan pribadi.",
      "nuance": "Berbeda dari 〜ことにする (keputusan pribadi). ことになる = hasil dari proses eksternal.",
      "examples": [
          {
              "jp": "来月から東京に転勤する<b>ことになった</b>。",
              "id": "Jadi pindah kerja ke Tokyo mulai bulan depan.",
              "level": "n3",
              "tags": [
                  "keputusan"
              ]
          },
          {
              "jp": "会議は中止する<b>ことになった</b>。",
              "id": "Rapat diputuskan untuk dibatalkan.",
              "level": "n3",
              "tags": [
                  "keputusan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00115"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00117",
      "level": "n3",
      "pattern": "〜ことがある",
      "reading": "~koto ga aru",
      "meaning": "kadang-kadang ... / pernah ...",
      "cat": "frekuensi",
      "connection": "V辞書形 + ことがある (kadang) / V-た形 + ことがある (pernah)",
      "desc": "<b>〜ことがある</b> memiliki dua fungsi tergantung bentuk verb. V辞書形: kadang-kadang terjadi. V-た形: pernah mengalami.",
      "nuance": "Jangan campurkan dua fungsi ini. た形 = pengalaman hidup. 辞書形 = kebiasaan kadang-kadang.",
      "examples": [
          {
              "jp": "日本に行った<b>ことがある</b>。",
              "id": "Pernah ke Jepang.",
              "level": "n3",
              "tags": [
                  "frekuensi"
              ]
          },
          {
              "jp": "朝ごはんを食べない<b>ことがある</b>。",
              "id": "Kadang-kadang tidak sarapan.",
              "level": "n3",
              "tags": [
                  "frekuensi"
              ]
          }
      ],
      "see_also_grammar": [],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00118",
      "level": "n3",
      "pattern": "〜ようにする",
      "reading": "~you ni suru",
      "meaning": "berusaha agar ...",
      "cat": "niat",
      "connection": "V辞書形 / V-ない形 + ようにする",
      "desc": "<b>〜ようにする</b> menyatakan usaha/kebiasaan untuk mencapai sesuatu. Pembicara berusaha secara sadar.",
      "nuance": "Berbeda dari ことにする (keputusan satu kali). ようにする = usaha berkelanjutan.",
      "examples": [
          {
              "jp": "毎日野菜を食べる<b>ようにしている</b>。",
              "id": "Berusaha makan sayur setiap hari.",
              "level": "n3",
              "tags": [
                  "niat"
              ]
          },
          {
              "jp": "遅刻しない<b>ようにする</b>。",
              "id": "Berusaha agar tidak terlambat.",
              "level": "n3",
              "tags": [
                  "niat"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00119",
          "gn3-00115"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  },

  {
      "id": "gn3-00119",
      "level": "n3",
      "pattern": "〜ようになる",
      "reading": "~you ni naru",
      "meaning": "menjadi bisa ... / jadi ...",
      "cat": "perubahan",
      "connection": "V辞書形 / V-ない形 + ようになる",
      "desc": "<b>〜ようになる</b> menyatakan perubahan kemampuan atau kebiasaan secara gradual.",
      "nuance": "Perubahan bertahap, bukan tiba-tiba. Sering dipakai untuk kemampuan baru yang berkembang.",
      "examples": [
          {
              "jp": "日本語が話せる<b>ようになった</b>。",
              "id": "Jadi bisa bicara bahasa Jepang.",
              "level": "n3",
              "tags": [
                  "perubahan"
              ]
          },
          {
              "jp": "朝早く起きられる<b>ようになった</b>。",
              "id": "Jadi bisa bangun pagi.",
              "level": "n3",
              "tags": [
                  "perubahan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00118"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": "cat 'perubahan' belum terdaftar di taxonomy L1 — menggunakan closest match"
  },

  {
      "id": "gn3-00120",
      "level": "n3",
      "pattern": "〜ように",
      "reading": "~you ni",
      "meaning": "supaya ... / agar ...",
      "cat": "tujuan",
      "connection": "V辞書形 / V-ない形 + ように",
      "desc": "<b>〜ように</b> menyatakan tujuan, terutama untuk verb non-volitional atau kemampuan. Berbeda dari 〜ために yang dipakai untuk verb volitional.",
      "nuance": "Gunakan ように untuk: potential verbs (聞こえるように), negative (忘れないように), intransitive. Gunakan ために untuk: volitional verbs.",
      "examples": [
          {
              "jp": "忘れない<b>ように</b>メモした。",
              "id": "Mencatat supaya tidak lupa.",
              "level": "n3",
              "tags": [
                  "tujuan"
              ]
          },
          {
              "jp": "みんなに聞こえる<b>ように</b>大きな声で話した。",
              "id": "Berbicara dengan suara keras supaya semua orang bisa dengar.",
              "level": "n3",
              "tags": [
                  "tujuan"
              ]
          }
      ],
      "see_also_grammar": [
          "gn3-00053"
      ],
      "see_also_vocab": [],
      "register": null,
      "exceptions": null,
      "notes": null
  }

];
