// grammar-n2.js — Grammar JLPT N2 Global (Tier 1)
// window.grammarN2
// v15.5.0 — 30 seed entries (top JLPT N2 grammar patterns)
// Schema: sama dengan grammar-n3.js
// Expand via: node tools/generate-corpus.js --level=n2 --type=grammar --start=31 --count=170

window.grammarN2 = [

  // ── SEBAB / AKIBAT ───────────────────────────────────
  {
    id: 'gn2-00001', level: 'n2', pattern: '〜に反して', reading: '〜ni hanshite',
    meaning: 'bertentangan dengan ... / melawan ...',
    cat: 'kontras',
    connection: 'N + に反して',
    desc: '<b>〜に反して</b> menyatakan bahwa sesuatu terjadi berlawanan dari harapan, aturan, atau kehendak yang disebutkan.',
    examples: [
      { jp: '予想<b>に反して</b>、試験は難しかった。', id: 'Bertentangan dengan perkiraan, ujiannya sulit.' },
      { jp: '親の意志<b>に反して</b>、彼は会社を辞めた。', id: 'Melawan kehendak orang tuanya, dia berhenti dari perusahaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00002', level: 'n2', pattern: '〜に加えて', reading: '〜ni kuwaete',
    meaning: 'selain ... / ditambah dengan ...',
    cat: 'enumerasi',
    connection: 'N + に加えて',
    desc: '<b>〜に加えて</b> digunakan untuk menambahkan informasi atau kondisi di atas yang sudah ada.',
    examples: [
      { jp: '寒さ<b>に加えて</b>、風も強かった。', id: 'Selain dingin, anginnya pun kencang.' },
      { jp: '英語<b>に加えて</b>、日本語も話せます。', id: 'Selain bahasa Inggris, saya juga bisa berbahasa Jepang.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00003', level: 'n2', pattern: '〜に際して', reading: '〜ni saishite',
    meaning: 'pada saat ... / ketika (momen penting) ...',
    cat: 'waktu',
    connection: 'V-dict / N + に際して',
    desc: '<b>〜に際して</b> digunakan untuk momen penting atau formal seperti upacara, awal kegiatan, atau situasi khusus.',
    examples: [
      { jp: '入学<b>に際して</b>、学長が挨拶をした。', id: 'Pada saat masuk sekolah, rektor memberikan sambutan.' },
      { jp: '契約<b>に際して</b>、注意事項をよく読んでください。', id: 'Pada saat kontrak, bacalah dengan teliti hal-hal yang perlu diperhatikan.' },
    ],
    see_also_grammar: ['gn2-00004'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn2-00004', level: 'n2', pattern: '〜にあたって', reading: '〜ni atatte',
    meaning: 'pada saat ... / dalam rangka ...',
    cat: 'waktu',
    connection: 'V-dict / N + にあたって',
    desc: '<b>〜にあたって</b> hampir sama dengan に際して tetapi lebih menekankan persiapan atau tindakan menjelang suatu momen.',
    examples: [
      { jp: '旅行<b>にあたって</b>、保険に加入した。', id: 'Dalam rangka perjalanan, saya mengambil asuransi.' },
      { jp: '発表<b>にあたって</b>、資料をまとめた。', id: 'Menjelang presentasi, saya menyusun bahan-bahan.' },
    ],
    see_also_grammar: ['gn2-00003'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn2-00005', level: 'n2', pattern: '〜に伴って', reading: '〜ni tomonatte',
    meaning: 'seiring dengan ... / bersamaan dengan ...',
    cat: 'bersamaan',
    connection: 'V-dict / N + に伴って',
    desc: '<b>〜に伴って</b> menyatakan bahwa dua perubahan terjadi secara bersamaan dan saling berkaitan.',
    examples: [
      { jp: '経済の発展<b>に伴って</b>、生活水準が上がった。', id: 'Seiring perkembangan ekonomi, taraf hidup meningkat.' },
      { jp: '年齢<b>に伴って</b>、体力が落ちる。', id: 'Seiring bertambahnya usia, stamina menurun.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  // ── KONDISI / CARA ───────────────────────────────────
  {
    id: 'gn2-00006', level: 'n2', pattern: '〜上で', reading: '〜ue de',
    meaning: 'setelah ... / dalam hal ... / dari segi ...',
    cat: 'kondisional',
    connection: 'V-た / N + の + 上で',
    desc: '<b>〜上で</b> memiliki dua makna: (1) setelah melakukan sesuatu sebagai syarat; (2) dari segi / dalam konteks.',
    examples: [
      { jp: 'よく考えた<b>上で</b>、決めてください。', id: 'Setelah berpikir baik-baik, silakan putuskan.' },
      { jp: '仕事の<b>上で</b>の悩みを話した。', id: 'Saya berbicara tentang masalah dalam pekerjaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00007', level: 'n2', pattern: '〜かねない', reading: '〜kanenai',
    meaning: 'bisa jadi ... (hal negatif) / ada kemungkinan ...',
    cat: 'kemungkinan',
    connection: 'V-stem + かねない',
    desc: '<b>〜かねない</b> mengungkapkan kemungkinan terjadinya sesuatu yang negatif atau tidak diinginkan.',
    examples: [
      { jp: 'こんな運転をしていたら、事故を起こし<b>かねない</b>。', id: 'Kalau mengemudi seperti ini, bisa jadi terjadi kecelakaan.' },
      { jp: '放っておくと、もっと悪化し<b>かねない</b>。', id: 'Kalau dibiarkan, bisa makin parah.' },
    ],
    see_also_grammar: ['gn2-00008'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00008', level: 'n2', pattern: '〜かねる', reading: '〜kaneru',
    meaning: 'tidak bisa (melakukan) ... / sulit untuk ...',
    cat: 'kemungkinan',
    connection: 'V-stem + かねる',
    desc: '<b>〜かねる</b> menyatakan bahwa secara psikologis atau moral pembicara tidak dapat atau sulit untuk melakukan sesuatu.',
    examples: [
      { jp: 'その要求には応じ<b>かねます</b>。', id: 'Kami sulit memenuhi permintaan tersebut.' },
      { jp: '一人では決め<b>かねます</b>。', id: 'Saya tidak bisa memutuskan sendiri.' },
    ],
    see_also_grammar: ['gn2-00007'], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn2-00009', level: 'n2', pattern: '〜を通じて / 〜を通して', reading: '〜wo tsuujite / tooshite',
    meaning: 'melalui ... / sepanjang ...',
    cat: 'cara',
    connection: 'N + を通じて / を通して',
    desc: '<b>〜を通じて</b> berarti "melalui suatu media/perantara" atau "sepanjang suatu periode". <b>を通して</b> lebih menekankan proses.',
    examples: [
      { jp: 'SNS<b>を通じて</b>、友達と連絡を取る。', id: 'Saya berkomunikasi dengan teman melalui media sosial.' },
      { jp: '一年<b>を通じて</b>、温暖な気候だ。', id: 'Sepanjang tahun, iklimnya hangat.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00010', level: 'n2', pattern: '〜にわたって', reading: '〜ni watatte',
    meaning: 'meliputi ... / selama ... / di seluruh ...',
    cat: 'rentang',
    connection: 'N（periode/wilayah）+ にわたって',
    desc: '<b>〜にわたって</b> menyatakan rentang waktu atau wilayah yang luas.',
    examples: [
      { jp: '三日間<b>にわたって</b>、会議が続いた。', id: 'Selama tiga hari, rapat terus berlangsung.' },
      { jp: '全国<b>にわたって</b>、調査が行われた。', id: 'Survei dilakukan di seluruh negeri.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00011', level: 'n2', pattern: '〜に基づいて', reading: '〜ni motozuite',
    meaning: 'berdasarkan ... / berlandaskan ...',
    cat: 'referensi',
    connection: 'N + に基づいて',
    desc: '<b>〜に基づいて</b> menyatakan dasar atau landasan dari suatu tindakan atau keputusan.',
    examples: [
      { jp: 'データ<b>に基づいて</b>、報告書を作成した。', id: 'Berdasarkan data, laporan dibuat.' },
      { jp: '法律<b>に基づいて</b>、処罰される。', id: 'Dihukum berdasarkan hukum.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  // ── PENAMBAHAN / PENGECUALIAN ─────────────────────────
  {
    id: 'gn2-00012', level: 'n2', pattern: '〜はもちろん', reading: '〜wa mochiron',
    meaning: 'sudah tentu ... / tidak hanya ... bahkan ...',
    cat: 'enumerasi',
    connection: 'N + はもちろん',
    desc: '<b>〜はもちろん</b> menyatakan bahwa hal yang disebutkan pertama sudah jelas, dan hal kedua pun juga berlaku.',
    examples: [
      { jp: '日本語<b>はもちろん</b>、英語も話せる。', id: 'Sudah tentu bahasa Jepang, bahasa Inggris pun bisa.' },
      { jp: '大人<b>はもちろん</b>、子供も楽しめる。', id: 'Tidak hanya orang dewasa, anak-anak pun bisa menikmati.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00013', level: 'n2', pattern: '〜ばかりか', reading: '〜bakari ka',
    meaning: 'tidak hanya ... bahkan ...',
    cat: 'penekanan',
    connection: 'V/Adj plain / N + ばかりか',
    desc: '<b>〜ばかりか</b> menambahkan informasi yang mengejutkan atau melebihi ekspektasi dari apa yang disebutkan.',
    examples: [
      { jp: '彼は歌う<b>ばかりか</b>、踊ることもできる。', id: 'Tidak hanya menyanyi, dia bahkan bisa menari.' },
      { jp: '宿題を忘れた<b>ばかりか</b>、教科書まで忘れた。', id: 'Tidak hanya lupa PR, bahkan buku teksnya pun lupa.' },
    ],
    see_also_grammar: ['gn2-00014'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00014', level: 'n2', pattern: '〜どころか', reading: '〜dokoro ka',
    meaning: 'jangankan ... bahkan ... / bukannya ... malah ...',
    cat: 'kontras',
    connection: 'V/Adj plain / N + どころか',
    desc: '<b>〜どころか</b> menyatakan bahwa kenyataannya jauh berbeda (biasanya lebih ekstrem) dari yang diharapkan atau disebutkan.',
    examples: [
      { jp: '褒める<b>どころか</b>、叱られた。', id: 'Bukannya dipuji, malah dimarahi.' },
      { jp: '楽になる<b>どころか</b>、もっと忙しくなった。', id: 'Jangankan santai, malah makin sibuk.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00015', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
    meaning: 'meskipun ... / walau ...',
    cat: 'konsesi',
    connection: 'V/Adj plain / N + である + ものの',
    desc: '<b>〜ものの</b> menyatakan konsesi: meskipun kondisi pertama terpenuhi, hasilnya tidak sesuai harapan.',
    examples: [
      { jp: '資格は取った<b>ものの</b>、使う機会がない。', id: 'Meskipun sudah dapat sertifikat, tidak ada kesempatan menggunakannya.' },
      { jp: '安い<b>ものの</b>、品質が悪い。', id: 'Walaupun murah, kualitasnya buruk.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  // ── LOGIKA / PENJELASAN ───────────────────────────────
  {
    id: 'gn2-00016', level: 'n2', pattern: '〜わけだ', reading: '〜wake da',
    meaning: 'pantas saja ... / memang ... / artinya ...',
    cat: 'logika',
    connection: 'V/Adj plain / N + の + わけだ',
    desc: '<b>〜わけだ</b> digunakan ketika pembicara memahami alasan atau kesimpulan dari suatu situasi.',
    examples: [
      { jp: '彼は10年間日本にいた。日本語が上手な<b>わけだ</b>。', id: 'Dia tinggal 10 tahun di Jepang. Pantas saja bahasa Jepangnya bagus.' },
      { jp: 'そういう<b>わけだ</b>ったのか。', id: 'Jadi begitu ya ceritanya.' },
    ],
    see_also_grammar: ['gn2-00017'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00017', level: 'n2', pattern: '〜わけにはいかない', reading: '〜wake ni wa ikanai',
    meaning: 'tidak mungkin (bisa) ... / tidak boleh ...',
    cat: 'keharusan',
    connection: 'V-dict / V-ない + わけにはいかない',
    desc: '<b>〜わけにはいかない</b> menyatakan bahwa secara sosial, moral, atau situasional seseorang tidak bisa melakukan sesuatu.',
    examples: [
      { jp: '約束したから、行かない<b>わけにはいかない</b>。', id: 'Karena sudah berjanji, tidak mungkin tidak pergi.' },
      { jp: '試験前なのに、遊んでいる<b>わけにはいかない</b>。', id: 'Menjelang ujian, tidak boleh bermain-main.' },
    ],
    see_also_grammar: ['gn2-00016'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00018', level: 'n2', pattern: '〜に違いない', reading: '〜ni chigai nai',
    meaning: 'pasti ... / tidak salah lagi ...',
    cat: 'dugaan',
    connection: 'V/Adj plain / N + に違いない',
    desc: '<b>〜に違いない</b> menyatakan keyakinan kuat pembicara bahwa sesuatu pasti benar.',
    examples: [
      { jp: '彼が来ない<b>に違いない</b>。', id: 'Pasti dia tidak akan datang.' },
      { jp: 'この映画は面白い<b>に違いない</b>。', id: 'Film ini pasti menarik.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00019', level: 'n2', pattern: '〜次第', reading: '〜shidai',
    meaning: '(1) segera setelah ... (2) tergantung pada ...',
    cat: 'kondisional',
    connection: 'V-stem / N + 次第',
    desc: '<b>〜次第</b> bermakna ganda: (1) segera setelah tindakan selesai; (2) bergantung pada kondisi yang disebutkan.',
    examples: [
      { jp: '準備ができ<b>次第</b>、出発します。', id: 'Segera setelah persiapan selesai, kami akan berangkat.' },
      { jp: '結果<b>次第</b>で、方針が変わります。', id: 'Kebijakan akan berubah tergantung pada hasilnya.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00020', level: 'n2', pattern: '〜てならない', reading: '〜te naranai',
    meaning: 'sangat ... / tidak tahan merasa ...',
    cat: 'perasaan',
    connection: 'V-te / い-Adj-くて / な-Adj-で + ならない',
    desc: '<b>〜てならない</b> mengungkapkan perasaan yang sangat kuat dan alami (tidak bisa ditahan) dari dalam diri.',
    examples: [
      { jp: '故郷が恋しく<b>てならない</b>。', id: 'Sangat merindukan kampung halaman.' },
      { jp: '彼のことが心配で<b>ならない</b>。', id: 'Sangat khawatir akan dia.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  // ── HARAPAN / NIAT ───────────────────────────────────
  {
    id: 'gn2-00021', level: 'n2', pattern: '〜ことにする', reading: '〜koto ni suru',
    meaning: 'memutuskan untuk ... / sengaja ...',
    cat: 'keputusan',
    connection: 'V-dict / V-ない + ことにする',
    desc: '<b>〜ことにする</b> menyatakan keputusan atau pilihan sadar dari pembicara.',
    examples: [
      { jp: '毎日運動する<b>ことにした</b>。', id: 'Saya memutuskan untuk olahraga setiap hari.' },
      { jp: 'お酒を飲まない<b>ことにしている</b>。', id: 'Saya sengaja tidak minum alkohol.' },
    ],
    see_also_grammar: ['gn2-00022'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00022', level: 'n2', pattern: '〜ことになっている', reading: '〜koto ni natte iru',
    meaning: 'sudah ditetapkan bahwa ... / seharusnya ...',
    cat: 'keharusan',
    connection: 'V-dict / V-ない + ことになっている',
    desc: '<b>〜ことになっている</b> menyatakan aturan, ketentuan, atau jadwal yang sudah ditetapkan dari luar.',
    examples: [
      { jp: '会議は9時に始まる<b>ことになっている</b>。', id: 'Rapat sudah ditetapkan mulai pukul 9.' },
      { jp: '社内ではスーツを着る<b>ことになっている</b>。', id: 'Di kantor, sudah menjadi aturan untuk memakai setelan.' },
    ],
    see_also_grammar: ['gn2-00021'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00023', level: 'n2', pattern: '〜ものだ', reading: '〜mono da',
    meaning: '(1) memang seharusnya ... (2) dulu sering ...',
    cat: 'kebiasaan',
    connection: 'V-dict / V-ない + ものだ',
    desc: '<b>〜ものだ</b>: (1) mengungkapkan kebenaran umum atau norma; (2) mengenang kebiasaan di masa lalu.',
    examples: [
      { jp: '人は誰でも間違える<b>ものだ</b>。', id: 'Memang sudah sewajarnya manusia berbuat salah.' },
      { jp: '子供の頃、よくここで遊んだ<b>ものだ</b>。', id: 'Waktu kecil, saya dulu sering bermain di sini.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00024', level: 'n2', pattern: '〜といえば', reading: '〜to ieba',
    meaning: 'berbicara tentang ... / kalau bicara soal ...',
    cat: 'referensi',
    connection: 'N + といえば',
    desc: '<b>〜といえば</b> digunakan untuk memperkenalkan topik atau merespons sesuatu yang baru saja disebutkan.',
    examples: [
      { jp: '桜<b>といえば</b>、京都が有名だ。', id: 'Kalau bicara soal bunga sakura, Kyoto terkenal.' },
      { jp: '夏<b>といえば</b>、花火だね。', id: 'Berbicara tentang musim panas, ya kembang api.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00025', level: 'n2', pattern: '〜をはじめ', reading: '〜wo hajime',
    meaning: 'mulai dari ... / terutama ... dan lainnya',
    cat: 'enumerasi',
    connection: 'N + をはじめ（として）',
    desc: '<b>〜をはじめ</b> memperkenalkan contoh utama/terpenting sebelum menyebutkan yang lain.',
    examples: [
      { jp: '東京<b>をはじめ</b>、多くの都市で開催された。', id: 'Diadakan di banyak kota, mulai dari Tokyo.' },
      { jp: '山田さん<b>をはじめ</b>、全員が賛成した。', id: 'Mulai dari Yamada-san, semua setuju.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00026', level: 'n2', pattern: '〜に応じて', reading: '〜ni oujite',
    meaning: 'sesuai dengan ... / sesuai keadaan ...',
    cat: 'perbandingan',
    connection: 'N + に応じて',
    desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi yang disebutkan.',
    examples: [
      { jp: '能力<b>に応じて</b>、仕事を割り当てる。', id: 'Pekerjaan dibagi sesuai kemampuan.' },
      { jp: '状況<b>に応じて</b>、対応を変える。', id: 'Tanggapan diubah sesuai situasi.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00027', level: 'n2', pattern: '〜をもとに', reading: '〜wo moto ni',
    meaning: 'berdasarkan ... / mengacu pada ...',
    cat: 'referensi',
    connection: 'N + をもとに（して）',
    desc: '<b>〜をもとに</b> menyatakan sumber atau bahan dasar dari suatu tindakan atau karya.',
    examples: [
      { jp: '実話<b>をもとに</b>した映画だ。', id: 'Ini film yang didasarkan pada kisah nyata.' },
      { jp: 'アンケート結果<b>をもとに</b>、改善した。', id: 'Diperbaiki berdasarkan hasil kuesioner.' },
    ],
    see_also_grammar: ['gn2-00011'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00028', level: 'n2', pattern: '〜だけでなく', reading: '〜dake de naku',
    meaning: 'tidak hanya ... tetapi juga ...',
    cat: 'enumerasi',
    connection: 'V/Adj plain / N + だけでなく',
    desc: '<b>〜だけでなく</b> menambahkan informasi tambahan; mirip ばかりでなく dan のみならず.',
    examples: [
      { jp: '彼女は頭がいい<b>だけでなく</b>、心も優しい。', id: 'Dia tidak hanya cerdas, tapi juga baik hati.' },
      { jp: '日本<b>だけでなく</b>、海外でも人気だ。', id: 'Tidak hanya di Jepang, tapi juga populer di luar negeri.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn2-00029', level: 'n2', pattern: '〜ざるを得ない', reading: '〜zaru wo enai',
    meaning: 'terpaksa ... / tidak bisa tidak ...',
    cat: 'keharusan',
    connection: 'V-ない-stem + ざるを得ない（例外: する→せざるを得ない）',
    desc: '<b>〜ざるを得ない</b> menyatakan bahwa pembicara terpaksa melakukan sesuatu karena tidak ada pilihan lain.',
    examples: [
      { jp: '事情があって、断らざるを得なかった。', id: 'Ada alasan, terpaksa harus menolak.' },
      { jp: '証拠があるから、認めざるを得ない。', id: 'Karena ada bukti, terpaksa harus mengakui.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: 'する → せざるを得ない', notes: null,
  },

  {
    id: 'gn2-00030', level: 'n2', pattern: '〜にすぎない', reading: '〜ni suginai',
    meaning: 'hanya ... saja / tidak lebih dari ...',
    cat: 'pembatasan',
    connection: 'V-dict / N + にすぎない',
    desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan; meremehkan atau merendah.',
    examples: [
      { jp: 'これは私の意見<b>にすぎない</b>。', id: 'Ini hanya pendapat saya saja.' },
      { jp: '彼はただの知り合い<b>にすぎない</b>。', id: 'Dia tidak lebih dari sekadar kenalan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

];
