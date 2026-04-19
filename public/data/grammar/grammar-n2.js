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
    cat: 'contrast-concession',
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
    cat: 'listing-addition',
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
    cat: 'sequential-temporal',
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
    cat: 'sequential-temporal',
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
    cat: 'sequential-temporal',
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
    cat: 'conditional-tara',
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
    cat: 'conjecture-possibility',
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
    cat: 'conjecture-possibility',
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
    cat: 'verb-form',
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
    cat: 'extent-degree',
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
    cat: 'quotation-thought',
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
    cat: 'listing-addition',
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
    cat: 'sentence-final-modality',
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
    cat: 'contrast-concession',
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
    cat: 'contrast-concession',
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
    cat: 'reason-cause',
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
    cat: 'obligation-necessity',
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
    cat: 'conjecture-possibility',
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
    cat: 'conditional-tara',
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
    cat: 'sentence-final-modality',
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
    cat: 'volitional-intention',
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
    cat: 'obligation-necessity',
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
    cat: 'progressive-state',
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
    cat: 'quotation-thought',
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
    cat: 'listing-addition',
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
    cat: 'comparison',
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
    cat: 'quotation-thought',
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
    cat: 'listing-addition',
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
    cat: 'obligation-necessity',
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
    cat: 'extent-degree',
    connection: 'V-dict / N + にすぎない',
    desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan; meremehkan atau merendah.',
    examples: [
      { jp: 'これは私の意見<b>にすぎない</b>。', id: 'Ini hanya pendapat saya saja.' },
      { jp: '彼はただの知り合い<b>にすぎない</b>。', id: 'Dia tidak lebih dari sekadar kenalan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00031', level: 'n2', pattern: '〜にもかかわらず', reading: '〜ni mo kakawarazu',
  meaning: 'meskipun ... (formal) / walaupun ...',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + にもかかわらず',
  desc: '<b>〜にもかかわらず</b> menyatakan bahwa hasil sesuatu berlawanan dari yang diharapkan, meskipun ada kondisi atau fakta tertentu. Digunakan dalam konteks formal dan tulisan resmi.',
  nuance: 'Lebih kuat dan formal dibanding のに atau けれども. Cocok untuk laporan, berita, dan teks akademis. Pembicara tidak perlu terlibat secara emosional seperti pada のに.',
  examples: [
    { jp: '雨<b>にもかかわらず</b>、大勢の人が集まった。', id: 'Meskipun hujan, banyak orang yang berkumpul.' },
    { jp: '努力した<b>にもかかわらず</b>、結果は出なかった。', id: 'Meskipun sudah berusaha, hasilnya tidak muncul.' },
    { jp: '反対意見<b>にもかかわらず</b>、計画は進められた。', id: 'Meskipun ada pendapat yang menentang, rencana tetap dilanjutkan.' }
  ],
  see_also_grammar: ['gn2-00032'], see_also_vocab: [],
  confusion_pairs: ['gn2-00032'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00032', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
  meaning: 'meskipun ... (tapi kenyataannya ...)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + ではある + ものの',
  desc: '<b>〜ものの</b> mengakui kondisi di bagian pertama kalimat, lalu menunjukkan bahwa bagian kedua berlawanan dari harapan atau logika yang semestinya.',
  nuance: 'Lebih formal dari けど atau が. Sering muncul dalam teks tulisan. Berbeda dari にもかかわらず — ものの terasa lebih reflektif dan personal, sedangkan にもかかわらず lebih objektif.',
  examples: [
    { jp: '合格した<b>ものの</b>、喜ぶ気になれなかった。', id: 'Meskipun lulus, tidak bisa merasa senang.' },
    { jp: '買った<b>ものの</b>、まだ一度も使っていない。', id: 'Meskipun sudah dibeli, belum pernah dipakai sekalipun.' },
    { jp: '日本語を勉強している<b>ものの</b>、会話はまだ難しい。', id: 'Meskipun sedang belajar bahasa Jepang, percakapan masih sulit.' }
  ],
  see_also_grammar: ['gn2-00031'], see_also_vocab: [],
  confusion_pairs: ['gn2-00031'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00033', level: 'n2', pattern: '〜だけでなく〜も', reading: '〜dake de naku 〜mo',
  meaning: 'bukan hanya A, tapi juga B',
  cat: 'listing-addition',
  connection: 'N / V-plain / Adj + だけでなく + [elemen tambahan] + も',
  desc: '<b>〜だけでなく〜も</b> digunakan untuk menambahkan informasi — menyatakan bahwa tidak hanya A yang berlaku, melainkan B juga termasuk.',
  nuance: 'Dapat digunakan dalam konteks formal maupun informal. Lebih tegas dari も saja karena secara eksplisit menekankan "bukan hanya". Bandingkan dengan のみならず yang lebih formal.',
  examples: [
    { jp: '彼は英語<b>だけでなく</b>、フランス語<b>も</b>話せる。', id: 'Dia tidak hanya bisa bahasa Inggris, tapi juga bahasa Prancis.' },
    { jp: '子ども<b>だけでなく</b>、大人<b>も</b>楽しめるイベントです。', id: 'Ini adalah acara yang tidak hanya bisa dinikmati anak-anak, tapi orang dewasa juga.' },
    { jp: '体<b>だけでなく</b>、心<b>も</b>疲れている。', id: 'Bukan hanya badan, tapi hati pun sudah lelah.' }
  ],
  see_also_grammar: ['gn2-00046', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046', 'gn2-00034'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00034', level: 'n2', pattern: '〜に限らず', reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... / tidak hanya ...',
  cat: 'listing-addition',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada satu hal atau kelompok tertentu — berlaku lebih luas dari yang disebutkan.',
  nuance: 'Lebih formal dari だけでなく. Sering dipakai dalam tulisan dan pengumuman resmi. Subyek yang mengikuti に限らず biasanya merupakan kategori atau kelompok (bukan individu).',
  examples: [
    { jp: '日本人<b>に限らず</b>、外国人も参加できます。', id: 'Tidak terbatas hanya warga Jepang, orang asing pun bisa ikut serta.' },
    { jp: '社員<b>に限らず</b>、家族も招待されました。', id: 'Tidak hanya karyawan, keluarga pun diundang.' },
    { jp: '大都市<b>に限らず</b>、地方でも問題が起きている。', id: 'Bukan hanya di kota besar, masalah juga terjadi di daerah.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00035', level: 'n2', pattern: '〜どころか', reading: '〜doko ro ka',
  meaning: 'jauh dari itu / bahkan ... (malah sebaliknya)',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + どころか',
  desc: '<b>〜どころか</b> menyangkal anggapan sebelumnya dan menyatakan bahwa kenyataannya justru jauh berbeda — bahkan bisa kebalikannya.',
  nuance: 'Sangat berbeda dari のに atau ものの. どころか mengandung unsur kejutan atau bantahan yang kuat. Sering diikuti penegasan seperti むしろ atau さえ.',
  examples: [
    { jp: '休む<b>どころか</b>、残業が増えた。', id: 'Bukannya istirahat, malah lembur semakin banyak.' },
    { jp: '謝る<b>どころか</b>、怒り出した。', id: 'Bukannya minta maaf, malah marah.' },
    { jp: '楽になる<b>どころか</b>、もっと大変になった。', id: 'Bukannya menjadi lebih mudah, malah semakin berat.' }
  ],
  see_also_grammar: ['gn2-00036'], see_also_vocab: [],
  confusion_pairs: ['gn2-00036'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00036', level: 'n2', pattern: '〜どころではない', reading: '〜doko ro de wa nai',
  meaning: 'bukan waktunya untuk ... / tidak sempat ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + どころではない',
  desc: '<b>〜どころではない</b> menyatakan bahwa situasi saat ini terlalu genting atau sibuk sehingga hal yang disebutkan sama sekali tidak memungkinkan untuk dilakukan.',
  nuance: 'Berbeda dari どころか yang membandingkan dua hal. どころではない menekankan ketidakmungkinan akibat kondisi yang mendesak. Terasa lebih kuat dari それどころじゃない (percakapan kasual).',
  examples: [
    { jp: '締め切りが明日なので、遊ぶ<b>どころではない</b>。', id: 'Karena deadline besok, ini bukan waktunya untuk bermain.' },
    { jp: '試験勉強<b>どころではない</b>、熱が40度もある。', id: 'Bukan waktunya belajar ujian, demamnya sampai 40 derajat.' },
    { jp: '旅行<b>どころではない</b>、仕事が山積みだ。', id: 'Bukan waktunya untuk liburan, pekerjaan menumpuk.' }
  ],
  see_also_grammar: ['gn2-00035'], see_also_vocab: [],
  confusion_pairs: ['gn2-00035'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00037', level: 'n2', pattern: '〜に過ぎない', reading: '〜ni sugi nai',
  meaning: 'hanya / tidak lebih dari ...',
  cat: 'extent-degree',
  connection: 'V-plain / N / Adj-plain + に過ぎない',
  desc: '<b>〜に過ぎない</b> menyatakan bahwa sesuatu tidak melebihi batas tertentu — "hanya sebatas itu" dan tidak lebih.',
  nuance: 'Mengandung nada meremehkan atau mengecilkan sesuatu. Berbeda dari だけ yang netral, に過ぎない terasa lebih kritis atau merendahkan nilai sesuatu.',
  examples: [
    { jp: 'これは私の個人的な意見<b>に過ぎない</b>。', id: 'Ini hanyalah pendapat pribadi saya, tidak lebih.' },
    { jp: '彼の言葉は冗談<b>に過ぎない</b>。', id: 'Kata-katanya hanyalah candaan belaka.' },
    { jp: 'まだ始まった<b>に過ぎない</b>ので、諦めないでほしい。', id: 'Ini baru saja dimulai, jadi tolong jangan menyerah.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00038', level: 'n2', pattern: '〜に対して', reading: '〜ni taishite',
  meaning: 'terhadap ... / sedangkan ... / berbanding dengan ...',
  cat: 'contrast-concession',
  connection: 'N + に対して / に対する + N',
  desc: '<b>〜に対して</b> memiliki dua fungsi utama: (1) menunjukkan arah atau sasaran tindakan, (2) membandingkan dua hal yang berlawanan atau berbeda.',
  nuance: 'Ketika dipakai untuk kontras, に対して bersifat objektif — cocok untuk tulisan formal. Berbeda dari 一方で yang juga kontras tetapi lebih berstruktur naratif.',
  examples: [
    { jp: '弟が内向的<b>に対して</b>、姉は社交的だ。', id: 'Berbanding dengan adik yang introvert, kakak perempuannya ekstrovert.' },
    { jp: '昨年の売上<b>に対して</b>、今年は大幅に増加した。', id: 'Dibandingkan penjualan tahun lalu, tahun ini meningkat drastis.' },
    { jp: '先生の質問<b>に対して</b>、学生が答えた。', id: 'Terhadap pertanyaan guru, murid-murid menjawab.' }
  ],
  see_also_grammar: ['gn2-00051', 'gn2-00052'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00039', level: 'n2', pattern: '〜において / 〜における', reading: '〜ni oite / 〜ni okeru',
  meaning: 'di dalam ... / dalam hal ... / pada ... (formal)',
  cat: 'nominalization',
  connection: 'N + において / N + における + N',
  desc: '<b>〜において</b> adalah partikel majemuk formal yang menunjukkan tempat, waktu, atau ranah terjadinya sesuatu. Bentuk <b>〜における</b> digunakan sebelum nomina (atributif).',
  nuance: 'Pengganti formal dari で atau の中で. Hampir tidak dipakai dalam percakapan sehari-hari. Sering muncul dalam dokumen resmi, berita, dan akademik.',
  examples: [
    { jp: '現代社会<b>において</b>、スマホは必需品だ。', id: 'Dalam masyarakat modern, smartphone adalah kebutuhan pokok.' },
    { jp: '日本<b>における</b>少子化問題は深刻だ。', id: 'Masalah penurunan angka kelahiran di Jepang sangat serius.' },
    { jp: 'このプロジェクト<b>において</b>、彼の役割は大きい。', id: 'Dalam proyek ini, perannya sangat besar.' }
  ],
  see_also_grammar: ['gn2-00040'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: 'における adalah bentuk atributif (sebelum nomina); において adalah bentuk predikatif.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00040', level: 'n2', pattern: '〜にわたって / 〜にわたる', reading: '〜ni watatte / 〜ni wataru',
  meaning: 'sepanjang ... / mencakup ... / selama ...',
  cat: 'extent-degree',
  connection: 'N (waktu/jumlah/rentang) + にわたって / にわたる + N',
  desc: '<b>〜にわたって</b> menyatakan bahwa sesuatu berlangsung atau mencakup jangkauan tertentu — bisa dari segi waktu, jarak, maupun cakupan. Bentuk <b>〜にわたる</b> digunakan sebelum nomina.',
  nuance: 'Menekankan luas atau panjang cakupan tersebut. Berbeda dari 間 (aida) yang netral — にわたって mengandung kesan cakupan yang signifikan dan mengesankan.',
  examples: [
    { jp: '３年間<b>にわたって</b>研究を続けた。', id: 'Penelitian dilanjutkan selama 3 tahun penuh.' },
    { jp: '全国<b>にわたる</b>調査が実施された。', id: 'Survei yang mencakup seluruh negeri dilaksanakan.' },
    { jp: '長期<b>にわたって</b>交渉が続いている。', id: 'Negosiasi terus berlangsung dalam jangka panjang.' }
  ],
  see_also_grammar: ['gn2-00039'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00041', level: 'n2', pattern: '〜に従って / 〜に従い', reading: '〜ni shitagatte / 〜ni shitagai',
  meaning: 'sesuai dengan ... / mengikuti ... / seiring ...',
  cat: 'sequential-temporal',
  connection: 'V-dict / N + に従って / に従い',
  desc: '<b>〜に従って</b> memiliki dua makna: (1) mengikuti aturan, instruksi, atau otoritas tertentu; (2) seiring perubahan A, B pun ikut berubah secara proporsional.',
  nuance: 'Makna (2) mirip dengan に伴って, tetapi に従って lebih menekankan hubungan sebab-akibat yang mengalir secara alami. Makna (1) mirip dengan 通りに tetapi に従って lebih formal.',
  examples: [
    { jp: '規則<b>に従って</b>行動してください。', id: 'Mohon bertindak sesuai dengan peraturan.' },
    { jp: '時代<b>に従って</b>、働き方も変わった。', id: 'Seiring perkembangan zaman, cara bekerja pun berubah.' },
    { jp: '医師の指示<b>に従い</b>、薬を飲んでいます。', id: 'Saya minum obat mengikuti petunjuk dokter.' }
  ],
  see_also_grammar: ['gn2-00042'], see_also_vocab: [],
  confusion_pairs: ['gn2-00042'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00042', level: 'n2', pattern: '〜によって / 〜による', reading: '〜ni yotte / 〜ni yoru',
  meaning: 'oleh ... / tergantung pada ... / karena ... (varian makna)',
  cat: 'reason-cause',
  connection: 'N + によって / による + N',
  desc: '<b>〜によって</b> memiliki beberapa makna sekaligus: (1) pelaku dalam kalimat pasif, (2) cara/metode ("melalui/dengan cara"), (3) penyebab, (4) variasi tergantung kondisi.',
  nuance: 'Pola ini sangat multifungsi. Untuk makna "tergantung", よって tidak bisa diganti で. Bentuk attributif による sering muncul dalam berita: 〜による被害 (kerugian akibat ...).',
  examples: [
    { jp: 'この小説はある作家<b>によって</b>書かれた。', id: 'Novel ini ditulis oleh seorang penulis tertentu.' },
    { jp: '人<b>によって</b>、意見が異なる。', id: 'Tergantung orangnya, pendapat bisa berbeda-beda.' },
    { jp: '台風<b>による</b>被害が広がっている。', id: 'Kerusakan akibat topan terus meluas.' }
  ],
  see_also_grammar: ['gn2-00041', 'gn2-00043'], see_also_vocab: [],
  confusion_pairs: ['gn2-00041', 'gn2-00043'],
  register: null, exceptions: null, notes: 'Pelajari tiap makna secara terpisah karena masing-masing memiliki konteks yang berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00043', level: 'n2', pattern: '〜によると / 〜によれば', reading: '〜ni yoru to / 〜ni yoreba',
  meaning: 'menurut ... (informasi dari sumber luar)',
  cat: 'hearsay-report',
  connection: 'N (sumber) + によると / によれば + [informasi] + そうだ / とのことだ',
  desc: '<b>〜によると</b> digunakan untuk menyampaikan informasi yang bersumber dari luar — berita, laporan, atau perkataan orang lain. Kalimat sering diakhiri dengan そうだ atau とのことだ.',
  nuance: 'Berbeda dari そうだ (hearsay) saja, によると secara eksplisit menyebutkan sumbernya. によれば sedikit lebih formal dan sering dipakai dalam berita atau tulisan.',
  examples: [
    { jp: '天気予報<b>によると</b>、明日は雨らしい。', id: 'Menurut prakiraan cuaca, besok sepertinya akan hujan.' },
    { jp: '彼女の話<b>によると</b>、会議は中止になったそうだ。', id: 'Menurut ceritanya, rapat katanya dibatalkan.' },
    { jp: '報告書<b>によれば</b>、売上は増加している。', id: 'Menurut laporan, penjualan sedang meningkat.' }
  ],
  see_also_grammar: ['gn2-00042'], see_also_vocab: [],
  confusion_pairs: ['gn2-00042'],
  register: null, exceptions: null, notes: 'によると dan によれば hampir sama; によれば sedikit lebih formal/tulisan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00044', level: 'n2', pattern: '〜をはじめ / 〜をはじめとして', reading: '〜wo hajime / 〜wo hajime to shite',
  meaning: 'dimulai dari ... / termasuk ... / antara lain ...',
  cat: 'listing-addition',
  connection: 'N (representatif) + をはじめ / をはじめとして + N (kelompok/tambahan)',
  desc: '<b>〜をはじめ</b> memperkenalkan daftar dengan menyebut satu contoh paling representatif, lalu mengisyaratkan bahwa masih ada anggota lain dalam kelompok tersebut.',
  nuance: 'Nomina pertama harus yang paling menonjol atau penting dalam kelompok. Berbeda dari など yang hanya menambahkan contoh tanpa hierarki.',
  examples: [
    { jp: '東京<b>をはじめ</b>、全国各地でイベントが開催された。', id: 'Dimulai dari Tokyo, acara diselenggarakan di berbagai penjuru negeri.' },
    { jp: '社長<b>をはじめとして</b>、全員が参加した。', id: 'Dimulai dari direktur, semua orang ikut serta.' },
    { jp: '日本語<b>をはじめ</b>、アジアの言語に興味がある。', id: 'Saya tertarik pada bahasa-bahasa Asia, terutama dimulai dari bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00045', level: 'n2', pattern: '〜をめぐって / 〜をめぐる', reading: '〜wo megutte / 〜wo meguru',
  meaning: 'seputar ... / mengenai ... / terkait isu ...',
  cat: 'nominalization',
  connection: 'N (isu/topik) + をめぐって / をめぐる + N',
  desc: '<b>〜をめぐって</b> menandai topik yang menjadi pusat diskusi, perdebatan, atau konflik. <b>〜をめぐる</b> adalah bentuk atributif yang diikuti nomina.',
  nuance: 'Berbeda dari について (yang netral dan umum), をめぐって menyiratkan adanya perselisihan, kontroversi, atau diskusi aktif di sekitar topik tersebut.',
  examples: [
    { jp: '領土問題<b>をめぐって</b>、両国は対立している。', id: 'Kedua negara bertikai seputar masalah wilayah.' },
    { jp: '予算<b>をめぐる</b>議論が続いている。', id: 'Perdebatan mengenai anggaran terus berlanjut.' },
    { jp: '遺産<b>をめぐって</b>、家族の間で争いが起きた。', id: 'Perselisihan terjadi di antara keluarga seputar warisan.' }
  ],
  see_also_grammar: ['gn2-00053'], see_also_vocab: [],
  confusion_pairs: ['gn2-00053'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00046', level: 'n2', pattern: '〜のみならず', reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (formal/tulisan)',
  cat: 'listing-addition',
  connection: 'V-plain / N / Adj + のみならず',
  desc: '<b>〜のみならず</b> adalah padanan formal dari だけでなく — menyatakan bahwa tidak hanya A, tapi B juga termasuk. Hampir eksklusif digunakan dalam tulisan formal.',
  nuance: 'Setara dengan だけでなく dalam makna, tetapi jauh lebih formal dan kaku. Tidak lazim dalam percakapan sehari-hari. Sering muncul dalam pidato, teks akademis, dan berita.',
  examples: [
    { jp: 'この問題は学生<b>のみならず</b>、教師にも関係する。', id: 'Masalah ini tidak hanya berkaitan dengan siswa, tetapi juga dengan guru.' },
    { jp: '健康<b>のみならず</b>、精神的な安定も重要だ。', id: 'Tidak hanya kesehatan fisik, keseimbangan mental pun penting.' },
    { jp: '国内<b>のみならず</b>、海外でも評価されている。', id: 'Tidak hanya diakui di dalam negeri, tapi juga dihargai di luar negeri.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033', 'gn2-00044'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00047', level: 'n2', pattern: '〜さえ〜ば', reading: '〜sae 〜ba',
  meaning: 'asalkan ... / kalau saja ... (satu syarat cukup)',
  cat: 'conditional-tara',
  connection: 'N + さえ + V-ba / Adj-kereba / N + でさえあれば',
  desc: '<b>〜さえ〜ば</b> menyatakan bahwa jika satu syarat kunci terpenuhi, maka segalanya akan baik-baik saja. Satu kondisi itu sudah cukup untuk menghasilkan hasil yang diharapkan.',
  nuance: 'Menekankan bahwa syarat yang disebutkan adalah satu-satunya yang diperlukan. Berbeda dari さえ〜ても yang mengungkapkan kondisi ekstrem tetapi hasilnya tetap berlawanan.',
  examples: [
    { jp: 'お金<b>さえ</b>あれ<b>ば</b>、何でもできる。', id: 'Asalkan ada uang, apa pun bisa dilakukan.' },
    { jp: '健康<b>でさえあれば</b>、それで十分だ。', id: 'Asalkan sehat, itu sudah cukup.' },
    { jp: '彼が来て<b>さえくれれば</b>、問題ない。', id: 'Asalkan dia mau datang, tidak ada masalah.' }
  ],
  see_also_grammar: ['gn2-00048'], see_also_vocab: [],
  confusion_pairs: ['gn2-00048'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00048', level: 'n2', pattern: '〜さえ〜ても', reading: '〜sae 〜temo',
  meaning: 'bahkan jika ... (pun tetap ...)',
  cat: 'contrast-concession',
  connection: 'N + さえ + V-te + も / Adj + くさえあっても',
  desc: '<b>〜さえ〜ても</b> mengungkapkan kondisi ekstrem yang diikuti hasil yang tidak berubah. Menyatakan bahwa bahkan dalam kasus paling ekstrem sekalipun, hasilnya tetap sama.',
  nuance: 'Berbeda dari さえ〜ば yang kondisional-positif, さえ〜ても bersifat kontraharapan. Menekankan bahwa bahkan kondisi yang paling sulit tidak mengubah kenyataan.',
  examples: [
    { jp: '努力<b>さえし</b>ても、全員が合格するわけではない。', id: 'Bahkan jika berusaha sekalipun, tidak berarti semua orang bisa lulus.' },
    { jp: 'お金<b>さえあっても</b>、幸せになれるとは限らない。', id: 'Bahkan jika punya uang sekalipun, belum tentu bisa bahagia.' },
    { jp: '謝って<b>さえいても</b>、許されないこともある。', id: 'Bahkan jika sudah meminta maaf sekalipun, kadang tidak dimaafkan.' }
  ],
  see_also_grammar: ['gn2-00047'], see_also_vocab: [],
  confusion_pairs: ['gn2-00047'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00049', level: 'n2', pattern: '〜ほど〜ない', reading: '〜hodo 〜nai',
  meaning: 'tidak se... seperti ... / tidak semewah / tidak sehebat ...',
  cat: 'extent-degree',
  connection: 'N + ほど + V-nai / Adj-nai',
  desc: '<b>〜ほど〜ない</b> membandingkan dua hal dan menyatakan bahwa yang satu tidak mencapai tingkat atau kualitas yang lain. Digunakan untuk komparasi yang merendahkan atau mengurangi.',
  nuance: 'Berbeda dari と比べて yang lebih netral, ほど〜ない selalu bernuansa "kurang dari". Pembicara menetapkan standar referensi dengan nomina setelah ほど.',
  examples: [
    { jp: '東京<b>ほど</b>大きな都市は<b>ない</b>。', id: 'Tidak ada kota sebesar Tokyo.' },
    { jp: '思った<b>ほど</b>難しく<b>なかった</b>。', id: 'Tidak sesulit yang saya bayangkan.' },
    { jp: '彼女<b>ほど</b>優しい人は<b>いない</b>。', id: 'Tidak ada orang sebaik hati dirinya.' }
  ],
  see_also_grammar: ['gn2-00050'], see_also_vocab: [],
  confusion_pairs: ['gn2-00050'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00050', level: 'n2', pattern: '〜と比べて / 〜に比べて', reading: '〜to kurabete / 〜ni kurabete',
  meaning: 'dibandingkan dengan ...',
  cat: 'comparison',
  connection: 'N + と比べて / に比べて + [perbandingan]',
  desc: '<b>〜と比べて</b> dan <b>〜に比べて</b> digunakan untuk membandingkan dua hal secara langsung. Keduanya hampir identik, tetapi に比べて sedikit lebih formal.',
  nuance: 'Perbandingan bersifat netral — bisa lebih baik maupun lebih buruk. Berbeda dari ほど〜ない yang selalu bernuansa "kurang dari". と比べて lebih umum dipakai dalam percakapan.',
  examples: [
    { jp: '去年<b>と比べて</b>、今年は暑い。', id: 'Dibandingkan tahun lalu, tahun ini lebih panas.' },
    { jp: '日本語<b>に比べて</b>、中国語の発音は難しいと感じる。', id: 'Dibandingkan bahasa Jepang, saya merasa pengucapan bahasa Mandarin lebih sulit.' },
    { jp: '兄<b>と比べて</b>、私は背が低い。', id: 'Dibandingkan dengan kakak, saya lebih pendek.' }
  ],
  see_also_grammar: ['gn2-00049'], see_also_vocab: [],
  confusion_pairs: ['gn2-00049'],
  register: null, exceptions: null, notes: 'と比べて lebih umum/kasual; に比べて lebih formal. Keduanya bisa saling menggantikan di sebagian besar konteks.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00051', level: 'n2', pattern: '〜一方で', reading: '〜ippou de',
  meaning: 'di satu sisi ... di sisi lain ... / sementara itu ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 一方で',
  desc: '<b>〜一方で</b> digunakan untuk menyandingkan dua fakta atau tindakan yang berbeda, sering kali berlawanan atau kontras, yang dimiliki oleh subjek yang sama atau situasi yang sama.',
  nuance: 'Berbeda dari に対して yang membandingkan dua subjek berbeda, 一方で sering menggambarkan dua sisi dari satu hal yang sama. Bisa juga berarti "sementara itu" (progresif paralel).',
  examples: [
    { jp: '便利になった<b>一方で</b>、プライバシーの問題も増えた。', id: 'Di satu sisi menjadi lebih praktis, di sisi lain masalah privasi pun bertambah.' },
    { jp: '彼は優しい<b>一方で</b>、とても厳しい面もある。', id: 'Di satu sisi dia baik hati, di sisi lain ada sisi yang sangat tegas.' },
    { jp: '勉強している<b>一方で</b>、アルバイトもしている。', id: 'Di satu sisi sedang belajar, di sisi lain juga bekerja paruh waktu.' }
  ],
  see_also_grammar: ['gn2-00052', 'gn2-00038'], see_also_vocab: [],
  confusion_pairs: ['gn2-00052', 'gn2-00038'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00052', level: 'n2', pattern: '〜反面', reading: '〜hanmen',
  meaning: 'di satu sisi ... di sisi lain ... (formal — dua sisi berlawanan)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 反面',
  desc: '<b>〜反面</b> menyatakan bahwa suatu hal memiliki dua sisi yang bertentangan — kelebihan dan kekurangan, atau sifat positif dan negatif secara bersamaan.',
  nuance: 'Lebih formal dan kuat dari 一方で. 反面 (harfiah: "sisi sebaliknya") menyiratkan adanya kontradiksi inheren dalam satu hal yang sama. Tidak bisa digunakan untuk dua subjek berbeda.',
  examples: [
    { jp: 'この薬は効果がある<b>反面</b>、副作用も強い。', id: 'Obat ini efektif, namun di sisi lain efek sampingnya juga kuat.' },
    { jp: '都市生活は便利な<b>反面</b>、孤独を感じやすい。', id: 'Kehidupan kota itu nyaman, namun di sisi lain mudah merasa kesepian.' },
    { jp: '彼は頭が良い<b>反面</b>、コミュニケーションが苦手だ。', id: 'Dia cerdas, namun di sisi lain lemah dalam berkomunikasi.' }
  ],
  see_also_grammar: ['gn2-00051'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00053', level: 'n2', pattern: '〜に関して / 〜に関する', reading: '〜ni kanshite / 〜ni kansuru',
  meaning: 'mengenai ... / terkait dengan ... / berkenaan dengan ...',
  cat: 'nominalization',
  connection: 'N + に関して / に関する + N',
  desc: '<b>〜に関して</b> menandai topik atau bidang yang dibicarakan. <b>〜に関する</b> adalah bentuk atributif (sebelum nomina). Digunakan dalam konteks formal.',
  nuance: 'Lebih formal dari について. に関して cocok untuk dokumen, surat resmi, dan presentasi. Dalam percakapan sehari-hari, についてのほうが自然.',
  examples: [
    { jp: '環境問題<b>に関して</b>、専門家が意見を述べた。', id: 'Mengenai masalah lingkungan, para ahli menyampaikan pendapatnya.' },
    { jp: '契約<b>に関する</b>書類を提出してください。', id: 'Mohon serahkan dokumen yang terkait dengan kontrak.' },
    { jp: 'この件<b>に関して</b>、ご不明な点はありますか？', id: 'Terkait hal ini, apakah ada yang kurang jelas?' }
  ],
  see_also_grammar: ['gn2-00045'], see_also_vocab: [],
  confusion_pairs: ['gn2-00045'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00054', level: 'n2', pattern: '〜次第で', reading: '〜shidai de',
  meaning: 'tergantung pada ... (hasilnya bisa berbeda)',
  cat: 'conditional-tara',
  connection: 'N + 次第で / 次第では',
  desc: '<b>〜次第で</b> menyatakan bahwa hasil atau kondisi akhir sepenuhnya ditentukan oleh faktor yang disebutkan. Faktor itu menjadi penentu utama.',
  nuance: 'Menekankan variabilitas hasil bergantung pada satu faktor. Berbeda dari 次第だ (kesimpulan/penjelasan keadaan) — 次第で selalu diikuti kondisi atau akibat yang berubah-ubah.',
  examples: [
    { jp: '努力<b>次第で</b>、結果は変わる。', id: 'Tergantung pada usaha, hasilnya bisa berubah.' },
    { jp: '天気<b>次第で</b>、ピクニックを中止するかもしれない。', id: 'Tergantung cuaca, piknik mungkin akan dibatalkan.' },
    { jp: '返事<b>次第では</b>、計画を変更する必要がある。', id: 'Tergantung jawabannya, mungkin perlu mengubah rencana.' }
  ],
  see_also_grammar: ['gn2-00055'], see_also_vocab: [],
  confusion_pairs: ['gn2-00055'],
  register: null, exceptions: null, notes: '次第では (dengan は) menambah nuansa kondisional yang lebih kuat — "kalau sampai ..."',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00055', level: 'n2', pattern: '〜次第だ / 〜次第です', reading: '〜shidai da / 〜shidai desu',
  meaning: 'sepenuhnya tergantung pada ... / itulah alasannya ...',
  cat: 'sentence-final-modality',
  connection: 'N + 次第だ / [penjelasan] + という次第だ',
  desc: '<b>〜次第だ</b> memiliki dua makna: (1) menyatakan bahwa sesuatu sepenuhnya bergantung pada faktor tertentu (akhir kalimat); (2) menjelaskan kronologi atau alasan keadaan saat ini.',
  nuance: 'Makna (2) — "という次第です" — sering dipakai dalam email formal atau laporan untuk menjelaskan latar belakang situasi. Terdengar sangat formal dan kaku dalam percakapan.',
  examples: [
    { jp: 'あとはあなた<b>次第だ</b>。', id: 'Sisanya sepenuhnya tergantung padamu.' },
    { jp: '成功するかどうかは努力<b>次第だ</b>。', id: 'Berhasil atau tidak sepenuhnya tergantung pada usaha.' },
    { jp: 'ご連絡が遅くなり、申し訳ない<b>という次第です</b>。', id: 'Itulah mengapa kami terlambat menghubungi Anda, kami mohon maaf.' }
  ],
  see_also_grammar: ['gn2-00054'], see_also_vocab: [],
  confusion_pairs: ['gn2-00054'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00056', level: 'n2', pattern: '〜を通じて / 〜を通して', reading: '〜wo tsuujite / 〜wo tooshite',
  meaning: 'melalui ... / lewat ... / sepanjang ...',
  cat: 'purpose',
  connection: 'N (media/periode) + を通じて / を通して',
  desc: '<b>〜を通じて</b> dan <b>〜を通して</b> menyatakan saluran, media, atau metode yang digunakan untuk melakukan sesuatu, atau rentang waktu yang berkelanjutan. Keduanya hampir sinonim.',
  nuance: 'を通じて lebih sering untuk media/perantara dan rentang waktu. を通して lebih sering untuk proses pengalaman langsung. Keduanya bisa saling menggantikan dalam banyak konteks.',
  examples: [
    { jp: 'インターネット<b>を通じて</b>、世界中の人とつながれる。', id: 'Melalui internet, kita bisa terhubung dengan orang di seluruh dunia.' },
    { jp: '旅行<b>を通して</b>、多くのことを学んだ。', id: 'Melalui perjalanan, saya belajar banyak hal.' },
    { jp: '一年<b>を通じて</b>、気温の変化が少ない。', id: 'Sepanjang tahun, perubahan suhu tidak banyak.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'を通じて — lebih untuk media/perantara dan rentang waktu. を通して — lebih untuk pengalaman atau proses.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00057', level: 'n2', pattern: '〜ことから', reading: '〜koto kara',
  meaning: 'dari fakta bahwa ... / karena (berdasarkan fakta) ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + であること + から',
  desc: '<b>〜ことから</b> menyatakan bahwa suatu kesimpulan, nama, atau keputusan diambil berdasarkan fakta atau keadaan tertentu yang diamati.',
  nuance: 'Berbeda dari から atau ので yang umum, ことから menekankan bahwa alasannya adalah sebuah fakta atau observasi konkret — lebih logis dan objektif.',
  examples: [
    { jp: '花が多いこと<b>から</b>、この町は「花の町」と呼ばれている。', id: 'Karena banyaknya bunga, kota ini disebut "Kota Bunga".' },
    { jp: '試験の点数が下がっていること<b>から</b>、勉強不足だとわかる。', id: 'Dari fakta menurunnya nilai ujian, dapat diketahui bahwa belajarnya kurang.' },
    { jp: '毎日遅刻すること<b>から</b>、彼の時間管理に問題があると思われる。', id: 'Dari fakta dia terlambat setiap hari, diduga ada masalah dalam manajemen waktunya.' }
  ],
  see_also_grammar: ['gn2-00056', 'gn2-00060'], see_also_vocab: [],
  confusion_pairs: ['gn2-00060'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00058', level: 'n2', pattern: '〜ことなく', reading: '〜koto naku',
  meaning: 'tanpa ... / tidak pernah (melakukan) ...',
  cat: 'negative',
  connection: 'V-dict + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan dilakukan tanpa pernah melakukan tindakan lain yang disebutkan. Berfungsi seperti 〜ないで tetapi lebih formal.',
  nuance: 'Lebih formal dari ないで. ことなく mengandung nuansa konsistensi — seseorang terus melakukan sesuatu tanpa sekalipun menyimpang. Sering dipakai dalam tulisan dan narasi.',
  examples: [
    { jp: '彼は一度も休む<b>ことなく</b>、毎日練習した。', id: 'Tanpa sekalipun istirahat, dia berlatih setiap hari.' },
    { jp: '誰にも相談する<b>ことなく</b>、決断した。', id: 'Tanpa berkonsultasi dengan siapa pun, keputusan dibuat.' },
    { jp: '諦める<b>ことなく</b>、挑戦し続けた。', id: 'Tanpa menyerah, dia terus mencoba.' }
  ],
  see_also_grammar: ['gn2-00059'], see_also_vocab: [],
  confusion_pairs: ['gn2-00059'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00059', level: 'n2', pattern: '〜ことなしに', reading: '〜koto nashi ni',
  meaning: 'tanpa ... (lebih formal dari ことなく)',
  cat: 'negative',
  connection: 'V-dict + ことなしに',
  desc: '<b>〜ことなしに</b> memiliki makna yang sama dengan ことなく — menyatakan bahwa sesuatu dilakukan tanpa melakukan tindakan yang disebutkan — tetapi berasa lebih kaku dan formal.',
  nuance: 'Sering dipakai dalam konteks yang menegaskan bahwa kondisi tertentu tidak bisa dihindari: "tidak mungkin A tanpa B". Lebih sering dalam tulisan akademis atau sastrawi.',
  examples: [
    { jp: '練習する<b>ことなしに</b>、上達はできない。', id: 'Tanpa berlatih, tidak mungkin bisa berkembang.' },
    { jp: '彼の助け<b>なしに</b>は、成功しなかったでしょう。', id: 'Tanpa bantuannya, kemungkinan tidak akan berhasil.' },
    { jp: '犠牲を払う<b>ことなしに</b>、夢は実現しない。', id: 'Tanpa pengorbanan, impian tidak akan terwujud.' }
  ],
  see_also_grammar: ['gn2-00058'], see_also_vocab: [],
  confusion_pairs: ['gn2-00058'],
  register: 'written', exceptions: null, notes: 'ことなく dan ことなしに hampir sama; ことなしに lebih kaku dan lebih sering dalam teks tertulis atau sastra.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00060', level: 'n2', pattern: '〜だけあって', reading: '〜dake atte',
  meaning: 'memang karena ... / pantas saja karena ... / wajar saja ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas yang ada sesuai ekspektasi berdasarkan latar belakang atau reputasi yang diketahui. Mengandung kesan pengakuan dan pujian.',
  nuance: 'Selalu mengandung konotasi positif atau setidaknya netral. Tidak bisa digunakan untuk hal negatif yang tidak diinginkan. Berbeda dari ことから yang lebih analitis/objektif.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、演奏は素晴らしかった。', id: 'Memang karena dia seorang profesional, penampilannya luar biasa.' },
    { jp: '10年のキャリア<b>だけあって</b>、仕事が速い。', id: 'Pantas saja, dengan pengalaman 10 tahun, pekerjaannya cepat.' },
    { jp: '高い料理<b>だけあって</b>、味は格別だった。', id: 'Memang karena harganya mahal, rasanya istimewa.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: ['gn2-00057'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00061', level: 'n2', pattern: '〜ざるを得ない', reading: '〜zaru o enai',
  meaning: 'tidak bisa tidak ... / terpaksa ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ざるを得ない (する → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> mengungkapkan bahwa seseorang terpaksa melakukan sesuatu karena tidak ada pilihan lain — bukan karena keinginan sendiri.',
  nuance: 'Lebih kuat dari しなければならない. Menekankan ketidakberdayaan akibat tekanan dari luar. Berbeda dari ずにはいられない yang didorong oleh emosi dari dalam.',
  examples: [
    { jp: '電車が止まったので、タクシーで行か<b>ざるを得なかった</b>。', id: 'Karena kereta berhenti, terpaksa harus naik taksi.' },
    { jp: '体調が悪くて、会議を欠席せ<b>ざるを得ない</b>。', id: 'Badan tidak enak, terpaksa tidak hadir rapat.' },
    { jp: '証拠を見せられては、認め<b>ざるを得ない</b>。', id: 'Setelah diberi bukti, terpaksa harus mengakui.' }
  ],
  see_also_grammar: ['gn2-00072'], see_also_vocab: [],
  confusion_pairs: ['gn2-00072', 'gn2-00082'],
  register: null, exceptions: 'する → せざるを得ない (bukan しざる)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00062', level: 'n2', pattern: '〜わけにはいかない', reading: '〜wake ni wa ikanai',
  meaning: 'tidak bisa melakukan ... / tidak mungkin melakukan ... (hambatan sosial atau moral)',
  cat: 'permission-prohibition',
  connection: 'V-dict / V-nai + わけにはいかない',
  desc: '<b>〜わけにはいかない</b> menyatakan bahwa sesuatu tidak bisa dilakukan karena ada hambatan sosial, moral, atau situasional — bukan karena ketidakmampuan fisik.',
  nuance: 'Berbeda dari できない (tidak mampu secara fisik/teknis). わけにはいかない menekankan "tidak pantas" atau "tidak mungkin dilakukan secara sosial/moral".',
  examples: [
    { jp: 'みんなが頑張っているのに、私だけ休む<b>わけにはいかない</b>。', id: 'Padahal semua sedang kerja keras, masa saya sendiri yang istirahat.' },
    { jp: '約束したから、断る<b>わけにはいかない</b>。', id: 'Karena sudah berjanji, tidak bisa menolak.' },
    { jp: 'ここで諦める<b>わけにはいかない</b>。', id: 'Di titik ini, tidak mungkin menyerah.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00063', level: 'n2', pattern: '〜わけがない', reading: '〜wake ga nai',
  meaning: 'tidak mungkin ... (berdasarkan logika — nada heran)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + な + わけがない',
  desc: '<b>〜わけがない</b> digunakan untuk menyatakan bahwa sesuatu mustahil terjadi, berdasarkan penalaran logis pembicara. Sering membawa nuansa kaget atau tidak percaya.',
  nuance: 'Lebih emosional dari はずがない. わけがない terasa seperti "tidak masuk akal sama sekali!", sementara はずがない lebih dingin dan faktual.',
  examples: [
    { jp: '彼がそんなことをする<b>わけがない</b>。', id: 'Tidak mungkin dia melakukan hal seperti itu.' },
    { jp: '昨日会ったばかりなのに、忘れた<b>わけがない</b>。', id: 'Baru ketemu kemarin, tidak mungkin sudah lupa.' },
    { jp: 'こんな難しい問題、小学生に解ける<b>わけがない</b>。', id: 'Soal sesulit ini, tidak mungkin bisa diselesaikan anak SD.' }
  ],
  see_also_grammar: ['gn2-00068'], see_also_vocab: [],
  confusion_pairs: ['gn2-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00064', level: 'n2', pattern: '〜わけだ', reading: '〜wake da',
  meaning: 'jadi memang ... / pantas saja ... / berarti ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + な + わけだ',
  desc: '<b>〜わけだ</b> mengungkapkan kesimpulan logis dari informasi yang baru saja diketahui — "jadi itulah alasannya" atau "pantas saja". Pembicara merasa pemahamannya terkonfirmasi.',
  nuance: 'Berbeda dari のだ: わけだ menekankan kesimpulan logis yang kini masuk akal berkat informasi baru. のだ lebih luas (bisa untuk penjelasan, konfirmasi, atau pertanyaan).',
  examples: [
    { jp: '彼は10年間日本に住んでいた。日本語が上手な<b>わけだ</b>。', id: 'Dia sudah tinggal 10 tahun di Jepang. Pantas saja bahasa Jepangnya bagus.' },
    { jp: 'セールだったから、混んでいた<b>わけだ</b>。', id: 'Karena lagi sale, pantas saja ramai.' },
    { jp: 'そういう事情があったから、断った<b>わけだ</b>。', id: 'Ada alasan seperti itu, jadi memang dia menolak.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00065', level: 'n2', pattern: '〜ことになっている', reading: '〜koto ni natte iru',
  meaning: 'sudah ditetapkan bahwa ... / seharusnya ... (aturan atau kesepakatan dari luar)',
  cat: 'obligation-necessity',
  connection: 'V-dict / V-nai + ことになっている',
  desc: '<b>〜ことになっている</b> menyatakan bahwa suatu hal sudah ditetapkan, direncanakan, atau diatur — bukan oleh pembicara sendiri, melainkan oleh pihak luar, sistem, atau kesepakatan bersama.',
  nuance: 'Berbeda dari ことにしている (keputusan pribadi). ことになっている = aturan, jadwal, atau keputusan yang datang dari luar diri pembicara.',
  examples: [
    { jp: '社員は毎朝9時に出社する<b>ことになっている</b>。', id: 'Karyawan sudah ditentukan harus masuk jam 9 pagi.' },
    { jp: 'このビルではペットを飼わない<b>ことになっている</b>。', id: 'Di gedung ini sudah diatur tidak boleh memelihara hewan peliharaan.' },
    { jp: '来月、東京支社に異動する<b>ことになっている</b>。', id: 'Bulan depan, sudah diputuskan akan pindah ke kantor cabang Tokyo.' }
  ],
  see_also_grammar: ['gn2-00066'], see_also_vocab: [],
  confusion_pairs: ['gn2-00066'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00066', level: 'n2', pattern: '〜ことにしている', reading: '〜koto ni shite iru',
  meaning: 'saya membiasakan diri untuk ... / saya selalu ...',
  cat: 'volitional-intention',
  connection: 'V-dict / V-nai + ことにしている',
  desc: '<b>〜ことにしている</b> menyatakan kebiasaan atau kebijakan pribadi yang dibuat sendiri oleh pembicara secara sadar dan konsisten dijalankan.',
  nuance: 'Ini adalah keputusan dan kebiasaan yang berasal dari diri sendiri. Berbeda dari ことになっている yang merupakan aturan dari pihak luar.',
  examples: [
    { jp: '健康のために、毎朝30分歩く<b>ことにしている</b>。', id: 'Demi kesehatan, saya selalu berjalan kaki 30 menit setiap pagi.' },
    { jp: '寝る前にスマホを見ない<b>ことにしている</b>。', id: 'Saya membiasakan diri tidak melihat HP sebelum tidur.' },
    { jp: '食事は腹八分目に抑える<b>ことにしている</b>。', id: 'Saya selalu membatasi makan sampai sekitar 80% kenyang.' }
  ],
  see_also_grammar: ['gn2-00065'], see_also_vocab: [],
  confusion_pairs: ['gn2-00065'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00067', level: 'n2', pattern: '〜に違いない', reading: '〜ni chigai nai',
  meaning: 'pasti ... (keyakinan kuat pembicara)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + に違いない',
  desc: '<b>〜に違いない</b> menyatakan keyakinan kuat pembicara bahwa sesuatu pasti benar, berdasarkan penilaian subjektifnya terhadap situasi atau bukti yang ada.',
  nuance: 'Lebih personal dan emosional dibanding に相違ない. Bisa digunakan dalam percakapan sehari-hari maupun tulisan. Keyakinannya datang dari dalam diri pembicara.',
  examples: [
    { jp: '彼女は今頃、怒っている<b>に違いない</b>。', id: 'Dia pasti sedang marah sekarang.' },
    { jp: 'あんなに練習したから、合格する<b>に違いない</b>。', id: 'Sudah latihan sekeras itu, pasti lulus.' },
    { jp: '電気がついている。まだ起きている<b>に違いない</b>。', id: 'Lampunya menyala. Pasti masih terjaga.' }
  ],
  see_also_grammar: ['gn2-00080'], see_also_vocab: [],
  confusion_pairs: ['gn2-00080', 'gn2-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00068', level: 'n2', pattern: '〜はずがない', reading: '〜hazu ga nai',
  meaning: 'tidak mungkin ... (berdasarkan logika atau ekspektasi yang wajar)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + の + はずがない',
  desc: '<b>〜はずがない</b> menyatakan bahwa sesuatu seharusnya tidak mungkin terjadi, berdasarkan pengetahuan atau logika objektif pembicara.',
  nuance: 'Lebih dingin dan faktual dibanding わけがない. わけがない sering membawa nuansa heran atau emosional, sedangkan はずがない lebih berdasarkan ekspektasi logis.',
  examples: [
    { jp: '昨日日本に着いたばかりだ。疲れていない<b>はずがない</b>。', id: 'Baru tiba di Jepang kemarin. Tidak mungkin tidak lelah.' },
    { jp: 'あの優しい人が嘘をつく<b>はずがない</b>。', id: 'Orang sebaik itu tidak mungkin berbohong.' },
    { jp: '10年も勉強して、できない<b>はずがない</b>。', id: 'Belajar selama 10 tahun, tidak mungkin tidak bisa.' }
  ],
  see_also_grammar: ['gn2-00063'], see_also_vocab: [],
  confusion_pairs: ['gn2-00063', 'gn2-00067'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00069', level: 'n2', pattern: '〜べきだ', reading: '〜beki da',
  meaning: 'seharusnya ... / sudah semestinya ... (kewajiban moral)',
  cat: 'obligation-necessity',
  connection: 'V-dict + べきだ (する → すべきだ atau するべきだ)',
  desc: '<b>〜べきだ</b> menyatakan bahwa suatu tindakan adalah hal yang benar atau semestinya dilakukan, berdasarkan norma moral, sosial, atau logika yang berlaku.',
  nuance: 'Lebih kuat dari 〜たほうがいい. べきだ membawa nuansa kewajiban moral, bukan sekadar saran. Hati-hati — bisa terkesan menggurui jika langsung diucapkan ke lawan bicara.',
  examples: [
    { jp: '間違えたら、素直に謝る<b>べきだ</b>。', id: 'Kalau salah, seharusnya jujur meminta maaf.' },
    { jp: 'そんな大切なことは親に相談す<b>べきだ</b>。', id: 'Hal sepenting itu seharusnya didiskusikan dengan orang tua.' },
    { jp: '健康のために、もっと野菜を食べる<b>べきだ</b>。', id: 'Demi kesehatan, seharusnya makan lebih banyak sayuran.' }
  ],
  see_also_grammar: ['gn2-00070'], see_also_vocab: [],
  confusion_pairs: ['gn2-00070'],
  register: null, exceptions: 'する → すべきだ (lebih formal/tulisan) atau するべきだ (lebih umum/lisan)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00070', level: 'n2', pattern: '〜べきではない', reading: '〜beki de wa nai',
  meaning: 'tidak seharusnya ... / tidak semestinya ...',
  cat: 'obligation-necessity',
  connection: 'V-dict + べきではない',
  desc: '<b>〜べきではない</b> adalah bentuk negatif dari べきだ — menyatakan bahwa suatu tindakan tidak sesuai dengan norma, moral, atau logika yang benar.',
  nuance: 'Lebih tegas dari 〜ないほうがいい. べきではない berbasis norma atau moral, bukan sekadar preferensi atau saran praktis.',
  examples: [
    { jp: '人のプライバシーを勝手に見る<b>べきではない</b>。', id: 'Tidak seharusnya mengintip privasi orang lain sembarangan.' },
    { jp: '大切なことを人任せにする<b>べきではない</b>。', id: 'Hal-hal penting tidak seharusnya diserahkan begitu saja kepada orang lain.' },
    { jp: '感情的になって判断する<b>べきではない</b>。', id: 'Tidak seharusnya mengambil keputusan dalam keadaan emosi.' }
  ],
  see_also_grammar: ['gn2-00069'], see_also_vocab: [],
  confusion_pairs: ['gn2-00069'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00071', level: 'n2', pattern: '〜得る／〜得ない', reading: '〜uru / 〜enai',
  meaning: 'bisa terjadi / tidak bisa terjadi (kemungkinan — formal)',
  cat: 'conjecture-possibility',
  connection: 'V-stem + 得る (うる/える) / V-stem + 得ない (えない)',
  desc: '<b>〜得る</b> menyatakan bahwa sesuatu berpotensi atau memungkinkan untuk terjadi. <b>〜得ない</b> menyatakan sesuatu yang mustahil terjadi. Digunakan dalam konteks formal atau tulisan.',
  nuance: '得る dibaca うる (formal, tulisan) atau える (lebih umum). 得ない selalu dibaca えない. Lebih formal dari かもしれない. Sering muncul dalam laporan, analisis, atau pidato.',
  examples: [
    { jp: 'そのような事故は十分起こり<b>得る</b>。', id: 'Kecelakaan seperti itu sangat mungkin terjadi.' },
    { jp: 'あり<b>得ない</b>ことが現実になった。', id: 'Hal yang dianggap mustahil menjadi kenyataan.' },
    { jp: 'あらゆる可能性を考え<b>得る</b>限り検討した。', id: 'Kami sudah mempertimbangkan semua kemungkinan yang bisa dibayangkan.' }
  ],
  see_also_grammar: ['gn2-00067'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: '得る: うる (tulisan/formal), える (umum/lisan). 得ない: selalu えない', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00072', level: 'n2', pattern: '〜ずにはいられない', reading: '〜zu ni wa irarenai',
  meaning: 'tidak bisa tidak ... / tidak bisa menahan diri untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ずにはいられない (する → せずにはいられない)',
  desc: '<b>〜ずにはいられない</b> mengungkapkan dorongan yang tidak bisa ditahan — pembicara merasa terpaksa melakukan sesuatu karena emosi atau perasaan yang kuat dari dalam dirinya.',
  nuance: 'Lebih emosional dari ざるを得ない. ざるを得ない = terpaksa karena tekanan dari luar; ずにはいられない = dorongan tak tertahankan dari dalam diri (emosi, naluri, perasaan).',
  examples: [
    { jp: 'その映画を見て、泣か<b>ずにはいられなかった</b>。', id: 'Menonton film itu, tidak bisa tidak menangis.' },
    { jp: '彼女の歌声を聞いて、感動せ<b>ずにはいられなかった</b>。', id: 'Mendengar suara nyanyiannya, tidak bisa tidak tersentuh.' },
    { jp: '不公平な扱いを見て、抗議せ<b>ずにはいられない</b>。', id: 'Melihat perlakuan tidak adil itu, tidak bisa tidak protes.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: ['gn2-00061'],
  register: null, exceptions: 'する → せずにはいられない', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00073', level: 'n2', pattern: '〜てたまらない', reading: '〜te tamaranai',
  meaning: 'sangat ... / tidak tahan ... (sensasi atau keinginan yang kuat)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + たまらない',
  desc: '<b>〜てたまらない</b> mengungkapkan perasaan, sensasi fisik, atau keinginan yang sangat kuat sehingga tidak tertahankan.',
  nuance: 'Bisa digunakan untuk emosi positif maupun negatif, dan juga sensasi fisik (lapar, dingin, sakit). Dibanding てならない yang lebih halus, たまらない terasa lebih intens dan langsung.',
  examples: [
    { jp: '寒くて<b>たまらない</b>から、早く帰りたい。', id: 'Sangat kedinginan, ingin cepat pulang.' },
    { jp: '彼のことが好きで<b>たまらない</b>。', id: 'Sangat menyukainya, tidak tahan.' },
    { jp: '試験前で緊張して<b>たまらない</b>。', id: 'Menjelang ujian, sangat gugup sampai tidak tahan.' }
  ],
  see_also_grammar: ['gn2-00074', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00074', 'gn2-00075'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00074', level: 'n2', pattern: '〜てならない', reading: '〜te naranai',
  meaning: 'sungguh terasa ... / tidak bisa menahan perasaan ... (emosi yang muncul alami)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + ならない',
  desc: '<b>〜てならない</b> mengungkapkan perasaan yang muncul secara alami dan kuat di luar kendali pembicara — biasanya emosi seperti sedih, rindu, khawatir, atau penasaran.',
  nuance: 'Lebih halus dan puitis dibanding てたまらない. Hampir selalu digunakan untuk emosi mendalam (悲しい、心配、気になる). Jarang untuk sensasi fisik seperti lapar atau lelah.',
  examples: [
    { jp: '故郷のことが懐かしく<b>てならない</b>。', id: 'Sungguh merindukan kampung halaman.' },
    { jp: '彼女の体調が心配で<b>ならない</b>。', id: 'Sangat khawatir dengan kondisi kesehatannya.' },
    { jp: 'なぜそうなったのか、気になっ<b>てならない</b>。', id: 'Sungguh penasaran mengapa hal itu bisa terjadi.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00075'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00075', level: 'n2', pattern: '〜てしょうがない', reading: '〜te shō ga nai',
  meaning: 'sangat ... / tidak ada yang bisa dilakukan terhadap perasaan ini',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + しょうがない',
  desc: '<b>〜てしょうがない</b> mengungkapkan perasaan atau kondisi yang sangat kuat dan tidak bisa dikendalikan. Fungsinya mirip てたまらない, namun nuansanya lebih kasual.',
  nuance: 'てしょうがない = lebih kasual, biasa dalam percakapan lisan. てたまらない = bisa digunakan dalam tulisan juga. Bentuk lain yang sedikit lebih formal: てしかたない.',
  examples: [
    { jp: '眠くて<b>しょうがない</b>から、少し休憩した。', id: 'Sangat mengantuk, jadi istirahat sebentar.' },
    { jp: 'あのドラマが気になって<b>しょうがない</b>。', id: 'Sangat penasaran dengan drama itu.' },
    { jp: '試合に負けて、悔しくて<b>しょうがない</b>。', id: 'Kalah pertandingan, sangat kesal.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00074'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00074'],
  register: 'spoken', exceptions: 'Bentuk lain: てしかたない (sedikit lebih formal/tulisan)', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00076', level: 'n2', pattern: '〜ものだ', reading: '〜mono da',
  meaning: 'memang begitulah ... / seharusnya ... (generalisasi, norma, atau nostalgia)',
  cat: 'sentence-final-modality',
  connection: 'V-dict / V-nai / Adj-plain / N + ものだ',
  desc: '<b>〜ものだ</b> memiliki tiga fungsi utama tergantung konteks: (1) generalisasi/norma umum — "begitulah adanya"; (2) nostalgia — mengenang kebiasaan masa lalu; (3) kekaguman atau perasaan mendalam.',
  nuance: 'Jangan tertukar dengan ものではない (larangan berdasarkan norma). Konteks dan predikat sebelumnya menentukan fungsi mana yang digunakan.',
  examples: [
    { jp: '人間は失敗から学ぶ<b>ものだ</b>。', id: 'Memang manusia belajar dari kegagalan.' },
    { jp: '子供のころは、よく川で遊んだ<b>ものだ</b>。', id: 'Waktu kecil dulu, sering main di sungai.' },
    { jp: '彼女のやさしさには、本当に感動する<b>ものだ</b>。', id: 'Kebaikan hatinya sungguh mengharukan.' }
  ],
  see_also_grammar: ['gn2-00077', 'gn2-00078'], see_also_vocab: [],
  confusion_pairs: ['gn2-00077'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00077', level: 'n2', pattern: '〜ものではない', reading: '〜mono de wa nai',
  meaning: 'tidak seharusnya ... / tidak pantas ... (larangan berdasarkan norma atau etika)',
  cat: 'permission-prohibition',
  connection: 'V-dict + ものではない',
  desc: '<b>〜ものではない</b> menyatakan larangan atau penilaian bahwa suatu tindakan tidak sesuai dengan norma sosial, etika, atau akal sehat.',
  nuance: 'Lebih bernada nasihat moral dibandingkan べきではない. Sering digunakan oleh orang yang lebih tua kepada yang lebih muda, atau dalam ungkapan pepatah.',
  examples: [
    { jp: '人前でそんなことを言う<b>ものではない</b>。', id: 'Tidak pantas mengatakan hal seperti itu di depan orang.' },
    { jp: '食べ物を粗末にする<b>ものではない</b>。', id: 'Tidak seharusnya menyia-nyiakan makanan.' },
    { jp: '困っている人を見捨てる<b>ものではない</b>。', id: 'Tidak pantas meninggalkan orang yang sedang kesulitan.' }
  ],
  see_also_grammar: ['gn2-00076'], see_also_vocab: [],
  confusion_pairs: ['gn2-00076'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00078', level: 'n2', pattern: '〜ものがある', reading: '〜mono ga aru',
  meaning: 'ada sesuatu yang ... / terasa ada unsur ... (kesan subjektif yang dalam)',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain + ものがある',
  desc: '<b>〜ものがある</b> mengungkapkan perasaan atau kesan subjektif yang kuat — bahwa ada suatu kualitas atau elemen tertentu yang benar-benar dirasakan oleh pembicara.',
  nuance: 'Selalu mengungkapkan penilaian subjektif yang dalam, bukan fakta objektif. Sering diikuti kata seperti 感動する、心を打つ、考えさせられる. Tidak bisa digunakan untuk hal-hal biasa.',
  examples: [
    { jp: '彼の演技には心を打つ<b>ものがある</b>。', id: 'Ada sesuatu dalam aktingnya yang benar-benar menyentuh hati.' },
    { jp: 'この話には考えさせられる<b>ものがある</b>。', id: 'Ada sesuatu dalam cerita ini yang membuat kita berpikir.' },
    { jp: '彼女の作品には独特の美しさを感じる<b>ものがある</b>。', id: 'Ada sesuatu dalam karya-karyanya yang memancarkan keindahan yang unik.' }
  ],
  see_also_grammar: ['gn2-00076'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00079', level: 'n2', pattern: '〜ではないか', reading: '〜de wa nai ka',
  meaning: 'bukankah ... ? / ayo ... — (retorikal atau ajakan)',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + ではないか (kasual: じゃないか)',
  desc: '<b>〜ではないか</b> digunakan dalam dua fungsi: (1) pertanyaan retoris untuk menegaskan pendapat pembicara, atau (2) ajakan atau usulan kepada lawan bicara.',
  nuance: 'Intonasi dan konteks menentukan fungsinya. Fungsi retoris: "bukankah ini masalah serius?" Fungsi ajakan: "ayo kita coba, bagaimana?" Versi kasual: じゃないか / じゃないですか.',
  examples: [
    { jp: 'これは重大な問題<b>ではないか</b>。', id: 'Bukankah ini masalah yang sangat serius?' },
    { jp: 'せっかくだから、一緒に行こう<b>ではないか</b>。', id: 'Sudah jauh-jauh ke sini, ayo pergi bersama.' },
    { jp: 'この景色、本当に美しい<b>じゃないか</b>。', id: 'Pemandangan ini, indah sekali kan?' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00080', level: 'n2', pattern: '〜に相違ない', reading: '〜ni sōi nai',
  meaning: 'pasti ... (keyakinan formal dan kuat — lebih formal dari に違いない)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + に相違ない',
  desc: '<b>〜に相違ない</b> mengungkapkan keyakinan kuat bahwa sesuatu pasti benar — setara dengan に違いない tetapi lebih formal. Sering ditemukan dalam tulisan resmi, dokumen hukum, atau laporan.',
  nuance: 'Sangat formal. Jarang dalam percakapan biasa. Jika に違いない = bahasa sehari-hari yang tegas, maka に相違ない = setara dalam dokumen resmi atau akademik.',
  examples: [
    { jp: '目撃者の証言から、彼が犯人である<b>に相違ない</b>。', id: 'Berdasarkan kesaksian saksi mata, dialah pasti pelakunya.' },
    { jp: 'その方針は正しい<b>に相違ない</b>。', id: 'Kebijakan tersebut pasti benar.' },
    { jp: 'この発見は歴史的な意義を持つ<b>に相違ない</b>。', id: 'Penemuan ini pasti memiliki makna historis.' }
  ],
  see_also_grammar: ['gn2-00067'], see_also_vocab: [],
  confusion_pairs: ['gn2-00067'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00081', level: 'n2', pattern: '〜に値する', reading: '〜ni atai suru',
  meaning: 'layak ... / patut mendapatkan ... / sebanding dengan ...',
  cat: 'predicate-adjective',
  connection: 'V-dict / N + に値する',
  desc: '<b>〜に値する</b> menyatakan bahwa sesuatu atau seseorang layak atau pantas mendapatkan perlakuan, penilaian, atau penghargaan tertentu.',
  nuance: 'Formal. Sering digunakan dalam konteks evaluasi atau penilaian. Bentuk negatif に値しない menyatakan "tidak layak". Berbeda dari てもいい yang sekadar memberi izin.',
  examples: [
    { jp: '彼女の努力は称賛<b>に値する</b>。', id: 'Usaha kerasnya layak mendapat pujian.' },
    { jp: 'この作品は世界に紹介する<b>に値する</b>。', id: 'Karya ini layak untuk diperkenalkan ke dunia.' },
    { jp: '彼の行動は信頼<b>に値しない</b>。', id: 'Tindakannya tidak layak untuk dipercaya.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00082', level: 'n2', pattern: '〜を余儀なくされる', reading: '〜wo yogi naku sareru',
  meaning: 'dipaksa (oleh keadaan) untuk melakukan ... (pasif formal)',
  cat: 'obligation-necessity',
  connection: 'N + を余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> adalah ungkapan pasif formal yang menyatakan bahwa seseorang terpaksa melakukan sesuatu bukan atas kemauan sendiri, melainkan karena keadaan yang memaksa dari luar.',
  nuance: 'Sangat formal. Hampir selalu ditemukan dalam berita, laporan resmi, atau tulisan akademik. Subjek selalu berposisi sebagai pihak yang tidak berdaya terhadap keadaan.',
  examples: [
    { jp: '地震の影響で、住民は避難<b>を余儀なくされた</b>。', id: 'Akibat gempa bumi, warga terpaksa mengungsi.' },
    { jp: '経営難で、会社は工場閉鎖<b>を余儀なくされた</b>。', id: 'Karena kesulitan keuangan, perusahaan terpaksa menutup pabrik.' },
    { jp: '怪我で選手は引退<b>を余儀なくされた</b>。', id: 'Akibat cedera, atlet itu terpaksa pensiun.' }
  ],
  see_also_grammar: ['gn2-00061'], see_also_vocab: [],
  confusion_pairs: ['gn2-00061'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00083', level: 'n2', pattern: '〜限り', reading: '〜kagiri',
  meaning: 'selama ... / sejauh ... / sampai batas ...',
  cat: 'extent-degree',
  connection: 'V-dict / V-nai / N + の + 限り',
  desc: '<b>〜限り</b> memiliki dua fungsi utama: (1) menyatakan batas kondisi atau waktu — "selama kondisi ini berlangsung"; (2) menyatakan batas pengetahuan atau kemampuan pembicara — "sejauh yang saya tahu/bisa".',
  nuance: 'Lebih luas dari 限りでは. Bisa digunakan untuk batas temporal (命ある限り) maupun batas pengetahuan (知る限り). 限りでは lebih spesifik untuk konteks pengetahuan pembicara.',
  examples: [
    { jp: '私が知る<b>限り</b>、彼は嘘をついたことがない。', id: 'Sejauh yang saya tahu, dia belum pernah berbohong.' },
    { jp: '命ある<b>限り</b>、夢を追い続ける。', id: 'Selama masih hidup, akan terus mengejar impian.' },
    { jp: '力の<b>限り</b>、全力で頑張ります。', id: 'Akan berusaha semaksimal kemampuan saya.' }
  ],
  see_also_grammar: ['gn2-00084'], see_also_vocab: [],
  confusion_pairs: ['gn2-00084'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00084', level: 'n2', pattern: '〜限りでは', reading: '〜kagiri de wa',
  meaning: 'sejauh yang saya ketahui ... / berdasarkan yang saya amati ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + の + 限りでは',
  desc: '<b>〜限りでは</b> menyatakan bahwa informasi yang disampaikan terbatas pada apa yang diamati atau diketahui oleh pembicara — "sejauh yang saya lihat / ketahui".',
  nuance: 'Lebih spesifik dari 限り. Hampir selalu digunakan untuk membatasi ruang lingkup pengetahuan pembicara, bukan kondisi temporal. Sering diikuti dengan ekspresi ketidakpastian seperti ようだ atau らしい.',
  examples: [
    { jp: '私が調べた<b>限りでは</b>、問題はないようだ。', id: 'Sejauh yang saya teliti, tampaknya tidak ada masalah.' },
    { jp: '今のところ確認できた<b>限りでは</b>、被害は出ていない。', id: 'Sejauh yang bisa dikonfirmasi sejauh ini, belum ada korban.' },
    { jp: '彼が話した<b>限りでは</b>、計画は順調らしい。', id: 'Berdasarkan yang dia ceritakan, rencana tampaknya berjalan lancar.' }
  ],
  see_also_grammar: ['gn2-00083'], see_also_vocab: [],
  confusion_pairs: ['gn2-00083'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00085', level: 'n2', pattern: '〜上は', reading: '〜ue wa',
  meaning: 'karena sudah memutuskan ... maka harus ... (tanggung jawab yang mengikuti)',
  cat: 'reason-cause',
  connection: 'V-ta / V-dict + 上は',
  desc: '<b>〜上は</b> menyatakan bahwa karena suatu keputusan atau situasi sudah ada, maka konsekuensi atau tanggung jawab tertentu harus dipenuhi secara penuh.',
  nuance: 'Lebih formal dibanding からには. 上は lebih sering dalam tulisan. Nuansanya: tanggung jawab yang muncul secara logis dari keputusan yang sudah dibuat.',
  examples: [
    { jp: '引き受けた<b>上は</b>、最後まで責任を持ってやり遂げる。', id: 'Karena sudah menerima tanggung jawab ini, harus diselesaikan sampai akhir.' },
    { jp: 'チームに入った<b>上は</b>、全力で取り組む覚悟が必要だ。', id: 'Karena sudah masuk tim, perlu tekad untuk berusaha sepenuh hati.' },
    { jp: '決めた<b>上は</b>、迷わずに進むべきだ。', id: 'Karena sudah diputuskan, seharusnya maju tanpa ragu.' }
  ],
  see_also_grammar: ['gn2-00086', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00086', 'gn2-00087'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00086', level: 'n2', pattern: '〜以上は', reading: '〜ijō wa',
  meaning: 'karena sudah ... maka wajib ... / mengingat bahwa ...',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + である + 以上は',
  desc: '<b>〜以上は</b> menyatakan bahwa karena fakta atau kondisi tertentu sudah ada, maka suatu konsekuensi atau kewajiban secara logis harus diikuti.',
  nuance: 'Hampir identik dengan からには dalam fungsi. 以上は terasa sedikit lebih formal. Perbedaan halus: からには lebih menekankan tekad personal; 以上は lebih menekankan konsekuensi logis.',
  examples: [
    { jp: 'プロである<b>以上は</b>、常に最高のパフォーマンスを見せなければならない。', id: 'Karena sudah jadi profesional, harus selalu menampilkan performa terbaik.' },
    { jp: '約束した<b>以上は</b>、必ず守るべきだ。', id: 'Karena sudah berjanji, harus ditepati.' },
    { jp: '参加する<b>以上は</b>、ルールを守る必要がある。', id: 'Karena ikut berpartisipasi, perlu mematuhi aturan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00087', level: 'n2', pattern: '〜からには', reading: '〜kara ni wa',
  meaning: 'karena sudah ... maka harus ... (tekad kuat berdasarkan pilihan)',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta + からには',
  desc: '<b>〜からには</b> menyatakan bahwa mengingat fakta atau keputusan yang ada, pembicara bertekad atau berkewajiban untuk melakukan sesuatu. Lebih menekankan tekad diri sendiri.',
  nuance: 'Lebih menekankan tekad personal dibanding 以上は dan 上は. Paling sering muncul dalam pernyataan tekad diri: "karena sudah memilih ini, saya akan benar-benar ...".',
  examples: [
    { jp: 'やると決めた<b>からには</b>、途中で諦めない。', id: 'Karena sudah memutuskan untuk melakukannya, tidak akan menyerah di tengah jalan.' },
    { jp: '日本に来た<b>からには</b>、日本語をマスターしたい。', id: 'Karena sudah datang ke Jepang, ingin menguasai bahasa Jepang.' },
    { jp: '勝負に出た<b>からには</b>、全力を尽くす。', id: 'Karena sudah terjun bersaing, akan berusaha sepenuh kemampuan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00086'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00086', 'gn2-00088'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00088', level: 'n2', pattern: '〜手前', reading: '〜temae',
  meaning: 'karena sudah terlanjur ... di depan orang, tidak bisa mundur',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + の + 手前',
  desc: '<b>〜手前</b> menyatakan bahwa karena pembicara sudah mengatakan atau melakukan sesuatu di depan orang lain, ada tekanan sosial untuk menjaga konsistensi — tidak bisa mundur karena menjaga muka atau wibawa.',
  nuance: 'Berbeda dari からには yang berbasis tekad. 手前 lebih menekankan tekanan sosial eksternal: "karena sudah terlanjur dilihat orang, tidak bisa tidak melanjutkan". Nuansanya lebih sosial dan terkait muka.',
  examples: [
    { jp: '大口をたたいた<b>手前</b>、失敗するわけにはいかない。', id: 'Karena sudah sesumbar di depan orang, tidak bisa gagal.' },
    { jp: '自分で言い出した<b>手前</b>、やらないわけにはいかない。', id: 'Karena sudah saya sendiri yang bilang, tidak bisa tidak melakukannya.' },
    { jp: '部下の<b>手前</b>、ミスを認めにくい。', id: 'Di depan bawahan, sulit untuk mengakui kesalahan.' }
  ],
  see_also_grammar: ['gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00089', level: 'n2', pattern: '〜とあれば', reading: '〜to areba',
  meaning: 'kalau memang ... — rela melakukan apapun / demi ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあれば',
  desc: '<b>〜とあれば</b> menyatakan bahwa jika suatu kondisi tertentu terpenuhi, pembicara rela atau bersedia melakukan apa saja. Biasanya mengungkapkan kesediaan atau pengorbanan yang kuat.',
  nuance: 'Lebih kuat dari なら. Menyiratkan "apapun akan saya lakukan demi ...". Sering digunakan untuk mengungkapkan kesetiaan, dedikasi, atau pengorbanan tanpa syarat.',
  examples: [
    { jp: '君のため<b>とあれば</b>、何でもするよ。', id: 'Kalau memang demi kamu, aku akan lakukan apa saja.' },
    { jp: '会社の存続<b>とあれば</b>、給料カットも仕方がない。', id: 'Kalau memang demi kelangsungan perusahaan, pemotongan gaji pun tidak apa-apa.' },
    { jp: '子供のため<b>とあれば</b>、親は何でも惜しまない。', id: 'Kalau demi anak, orang tua tidak akan segan melakukan apapun.' }
  ],
  see_also_grammar: ['gn2-00090'], see_also_vocab: [],
  confusion_pairs: ['gn2-00090'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00090', level: 'n2', pattern: '〜とあっては', reading: '〜to atte wa',
  meaning: 'dalam kondisi seperti ini ... / mengingat keadaan yang ...',
  cat: 'conditional-tara',
  connection: 'V-plain / N + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa mengingat kondisi atau situasi tertentu yang sudah ada, suatu konsekuensi logis tidak bisa dihindari.',
  nuance: 'Berbeda dari とあれば (kesediaan aktif dari dalam diri). とあっては menekankan tekanan dari situasi yang sudah ada — "menghadapi kenyataan ini, tidak ada pilihan lain selain ...".',
  examples: [
    { jp: '社長自らの命令<b>とあっては</b>、従わないわけにはいかない。', id: 'Mengingat ini perintah langsung dari presiden direktur, tidak ada pilihan selain mematuhi.' },
    { jp: 'これほどの非常事態<b>とあっては</b>、冷静でいるのは難しい。', id: 'Dalam kondisi darurat seserius ini, sulit untuk tetap tenang.' },
    { jp: '彼女の一言<b>とあっては</b>、断れない。', id: 'Kalau sudah kata-kata darinya, tidak bisa menolak.' }
  ],
  see_also_grammar: ['gn2-00089'], see_also_vocab: [],
  confusion_pairs: ['gn2-00089'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00091',
  level: 'n2',
  pattern: '〜のみならず',
  reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (tetapi juga ...)',
  cat: 'listing-addition',
  connection: 'V-plain / Adj-plain / N + のみならず',
  desc: '<b>〜のみならず</b> menyatakan "tidak hanya X tetapi juga Y". Setara dengan だけでなく tapi lebih formal dan banyak ditemukan dalam bahasa tulisan.',
  nuance: 'Register written/formal — hindari dalam percakapan sehari-hari. Lebih kuat dan lebih luas cakupannya dibanding だけでなく; biasa muncul di berita, laporan, dan esai akademis.',
  examples: [
    { jp: '彼は成績が優秀な<b>のみならず</b>、スポーツも得意だ。', id: 'Dia tidak hanya berprestasi dalam pelajaran, tetapi juga pandai olahraga.' },
    { jp: 'この政策は国内<b>のみならず</b>、海外にも大きな影響を与えた。', id: 'Kebijakan ini tidak hanya berdampak di dalam negeri, tetapi juga di luar negeri.' },
    { jp: '環境問題は一国<b>のみならず</b>、全人類が取り組むべき課題だ。', id: 'Masalah lingkungan bukan hanya tanggung jawab satu negara, melainkan seluruh umat manusia.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00092',
  level: 'n2',
  pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: 'sudah pasti ... / tidak perlu dikatakan lagi ..., bahkan juga ...',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa hal pertama sudah merupakan sesuatu yang sudah pasti/jelas terjadi, lalu menambahkan hal kedua yang cakupannya lebih luas atau mengejutkan.',
  nuance: 'Lebih formal dari はもちろん dan lebih sering muncul dalam tulisan. Menekankan bahwa X adalah hal yang "sudah semestinya", sebelum menambahkan Y yang mungkin tak terduga.',
  examples: [
    { jp: '英語<b>はもとより</b>、中国語も流暢に話せます。', id: 'Bahasa Inggris sudah pasti, bahkan bahasa Mandarin pun bisa berbicara dengan lancar.' },
    { jp: '専門家<b>はもとより</b>、一般市民もこの問題に強い関心を示している。', id: 'Sudah pasti para ahli, bahkan masyarakat umum pun menunjukkan perhatian besar terhadap masalah ini.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00093',
  level: 'n2',
  pattern: '〜はもちろん',
  reading: '〜wa mochiron',
  meaning: 'tentu saja ... / sudah jelas ..., dan (tidak ketinggalan) ...',
  cat: 'listing-addition',
  connection: 'N + はもちろん',
  desc: '<b>〜はもちろん</b> menyatakan bahwa X sudah pasti/jelas, kemudian menambahkan Y. Sedikit lebih kasual dan lebih luas penggunaannya dibanding はもとより.',
  nuance: 'Bisa muncul dalam percakapan semi-formal maupun tulisan. Tidak sekuat はもとより dalam hal keformalan, tapi sama-sama menyiratkan "X sudah tentu, apalagi Y".',
  examples: [
    { jp: '日本語<b>はもちろん</b>、文化についても深く勉強したい。', id: 'Bahasa Jepang tentu saja, aku juga ingin belajar lebih dalam tentang budayanya.' },
    { jp: '彼女は料理<b>はもちろん</b>、掃除も得意だ。', id: 'Sudah pasti soal memasak, dia juga pandai membersihkan rumah.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00092'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00092'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00094',
  level: 'n2',
  pattern: '〜に限らず',
  reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... saja / tidak hanya ...',
  cat: 'extent-degree',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada X, melainkan berlaku lebih luas atau mencakup Y juga.',
  nuance: 'Menekankan perluasan cakupan — "jangan salah anggap ini hanya soal X". Sering berpasangan dengan 〜も atau 〜でも. Bisa digunakan dalam konteks formal maupun sehari-hari.',
  examples: [
    { jp: '子供<b>に限らず</b>、大人にも人気のあるゲームだ。', id: 'Ini bukan hanya permainan yang populer di kalangan anak-anak, tapi juga di kalangan orang dewasa.' },
    { jp: '日本<b>に限らず</b>、アジア全体でこの問題が深刻化している。', id: 'Masalah ini tidak hanya serius di Jepang, tapi di seluruh Asia.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091'],
  register: null,
  exceptions: null,
  notes: '〜に限らず adalah bentuk negatif dari 〜に限り (terbatas pada ...). Jangan dicampur dengan 〜にかかわらず.',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00095',
  level: 'n2',
  pattern: '〜を皮切りに',
  reading: '〜wo kawakiri ni',
  meaning: 'diawali dengan ... / dimulai dari ... (sebagai pembuka serangkaian)',
  cat: 'inception-continuation',
  connection: 'N + を皮切りに / を皮切りとして',
  desc: '<b>〜を皮切りに</b> menyatakan bahwa X menjadi titik awal atau pembuka dari serangkaian kejadian atau tindakan yang menyusul setelahnya.',
  nuance: 'Menekankan bahwa X adalah "awal dari serentetan". Sering digunakan untuk tur, acara berturut-turut, atau tren yang menyebar. Agak formal; lebih jarang dalam percakapan biasa.',
  examples: [
    { jp: '東京<b>を皮切りに</b>、全国ツアーが幕を開けた。', id: 'Dimulai dari Tokyo, tur nasional pun resmi dimulai.' },
    { jp: 'この商品のヒット<b>を皮切りに</b>、次々と新製品が発売された。', id: 'Dimulai dari keberhasilan produk ini, produk-produk baru pun bermunculan satu per satu.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00108'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn2-00108'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00096',
  level: 'n2',
  pattern: '〜もさることながら',
  reading: '〜mo saru koto nagara',
  meaning: 'sudah tentu ... (tapi yang tidak kalah penting / bahkan lebih dari itu ...)',
  cat: 'listing-addition',
  connection: 'N + もさることながら',
  desc: '<b>〜もさることながら</b> menyatakan bahwa X memang sudah pasti/diakui, tapi Y bahkan lebih menonjol, penting, atau mengesankan.',
  nuance: 'Sangat formal dan hampir eksklusif untuk tulisan. Berbeda dari はもとより: もさることながら lebih menyiratkan "X itu sudah jelas hebat, tapi Y justru lebih lagi". Jarang sekali dalam percakapan.',
  examples: [
    { jp: '技術力<b>もさることながら</b>、彼の粘り強い努力には頭が下がる。', id: 'Sudah tentu soal kemampuan teknisnya, tapi ketekunannya justru lebih mengesankan.' },
    { jp: '景色<b>もさることながら</b>、地元の料理が旅の一番の思い出になった。', id: 'Pemandangannya sudah tentu indah, tapi makanan lokalnya justru menjadi kenangan terbaik dari perjalanan itu.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00097',
  level: 'n2',
  pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimana keadaan ...',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa hasil atau tindakan tidak dipengaruhi oleh kondisi atau variabel yang disebutkan — "apapun yang terjadi dengan X, hasilnya tetap sama".',
  nuance: 'Sangat formal; umum dalam dokumen resmi, kontrak, pengumuman institusi. Jauh lebih kuat dari にかかわらず biasa. Kontras dengan いかんによって: di sini kondisi TIDAK menentukan hasil.',
  examples: [
    { jp: '結果<b>いかんにかかわらず</b>、最善を尽くします。', id: 'Terlepas dari hasilnya bagaimana, kami akan berupaya sebaik-baiknya.' },
    { jp: '理由<b>いかんにかかわらず</b>、期限内の提出が義務付けられています。', id: 'Terlepas dari alasan apapun, pengumpulan sebelum batas waktu adalah kewajiban.' }
  ],
  see_also_grammar: ['gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00099'],
  register: 'formal',
  exceptions: null,
  notes: 'いかん adalah kata formal yang berarti "keadaan/kondisi". Bentuk lain: いかんを問わず (sama artinya, sedikit lebih formal).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00098',
  level: 'n2',
  pattern: '〜をものともせず',
  reading: '〜wo mono to mo sezu',
  meaning: 'tanpa mempedulikan ... / tidak menjadikan ... sebagai halangan',
  cat: 'contrast-concession',
  connection: 'N + をものともせず',
  desc: '<b>〜をものともせず</b> menyatakan bahwa subjek menghadapi atau melewati rintangan/kesulitan yang disebutkan tanpa menjadikannya hambatan.',
  nuance: 'Selalu berkonotasi positif atau heroik — memuji keberanian, ketabahan, atau determinasi subjek. TIDAK digunakan untuk hal negatif. Berbeda dari をよそに yang berkonotasi mengabaikan perasaan orang lain.',
  examples: [
    { jp: '激しい嵐<b>をものともせず</b>、船は航海を続けた。', id: 'Tanpa mempedulikan badai yang ganas, kapal terus berlayar.' },
    { jp: '激しい批判<b>をものともせず</b>、彼は改革を断行した。', id: 'Tanpa tergoyahkan oleh kritik keras, dia melaksanakan reformasi.' }
  ],
  see_also_grammar: ['gn2-00100'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00100'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00099',
  level: 'n2',
  pattern: '〜いかんによって',
  reading: '〜ikan ni yotte',
  meaning: 'tergantung pada ... / bergantung bagaimana ...',
  cat: 'conditional-tara',
  connection: 'N + いかんによって / いかんによっては',
  desc: '<b>〜いかんによって</b> menyatakan bahwa hasil atau tindakan bergantung pada kondisi atau variabel tertentu yang disebutkan.',
  nuance: 'Kebalikan nuansa dari いかんにかかわらず: di sini kondisi MENENTUKAN hasil. Formal. いかんによっては (dengan は) menambahkan nuansa "ada kemungkinan tertentu bergantung pada kondisi".',
  examples: [
    { jp: '交渉の結果<b>いかんによっては</b>、契約を見直す可能性がある。', id: 'Tergantung hasil negosiasinya, ada kemungkinan kontrak perlu ditinjau ulang.' },
    { jp: '対応<b>いかんによって</b>、顧客の信頼を失うこともある。', id: 'Tergantung bagaimana penanganannya, kepercayaan pelanggan bisa hilang.' }
  ],
  see_also_grammar: ['gn2-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00097'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00100',
  level: 'n2',
  pattern: '〜をよそに',
  reading: '〜wo yoso ni',
  meaning: 'mengabaikan ... / tidak peduli terhadap ... (situasi atau perasaan sekitar)',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa subjek bertindak seolah tidak peduli terhadap kondisi, kekhawatiran, atau perasaan pihak lain yang disebutkan.',
  nuance: 'Sering berkonotasi negatif ringan — subjek tampak egois atau tidak berempati. Berbeda dari をものともせず yang heroik: をよそに lebih netral hingga sedikit negatif. Register written/agak formal.',
  examples: [
    { jp: '親の心配<b>をよそに</b>、子供たちは楽しそうに遊んでいた。', id: 'Mengabaikan kekhawatiran orang tua, anak-anak tetap bermain dengan riang gembira.' },
    { jp: '世間の批判<b>をよそに</b>、彼は独自の道を歩み続けた。', id: 'Mengabaikan kritik masyarakat, dia terus berjalan di jalannya sendiri.' }
  ],
  see_also_grammar: ['gn2-00098'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00098'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00101',
  level: 'n2',
  pattern: '〜に即して',
  reading: '〜ni soku shite',
  meaning: 'sesuai dengan kenyataan ... / berdasarkan situasi aktual ...',
  cat: 'reason-cause',
  connection: 'N + に即して / に即した (+ N)',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan sesuai dengan realita, fakta di lapangan, atau kondisi aktual yang disebutkan — bukan sekadar teori.',
  nuance: 'Menekankan kesesuaian dengan "kenyataan nyata di lapangan". Berbeda dari に基づいて yang bertumpu pada data/teori/hukum: に即して lebih menekankan pada realita praktis dan situasi yang hidup.',
  examples: [
    { jp: '実態<b>に即した</b>政策を立案することが求められている。', id: 'Dibutuhkan perumusan kebijakan yang sesuai dengan kondisi nyata di lapangan.' },
    { jp: '状況<b>に即して</b>柔軟に対応してください。', id: 'Tolong tanggapi dengan fleksibel sesuai situasi yang ada.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00103'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00102',
  level: 'n2',
  pattern: '〜にそって / 〜に沿って',
  reading: '〜ni sotte',
  meaning: 'mengikuti / selaras dengan / sepanjang ...',
  cat: 'sequential-temporal',
  connection: 'N + に沿って / に沿った (+ N)',
  desc: '<b>〜に沿って</b> menyatakan bahwa sesuatu dilakukan mengikuti jalur, rencana, pedoman, atau arah yang disebutkan. Bisa bermakna literal (mengikuti jalan/sungai) maupun figuratif (mengikuti rencana).',
  nuance: 'Lebih netral register-nya dibanding に即して atau に基づいて. Bisa dipakai sehari-hari. Pada makna fisik menekankan pergerakan mengikuti garis/jalur; pada makna figuratif menekankan kepatuhan pada alur atau panduan.',
  examples: [
    { jp: '川<b>に沿って</b>歩いていくと、古い橋が見えてきます。', id: 'Jika berjalan mengikuti sungai, Anda akan melihat sebuah jembatan tua.' },
    { jp: '計画<b>に沿って</b>プロジェクトを進めてください。', id: 'Tolong jalankan proyek sesuai dengan rencana yang telah dibuat.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00101'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00103'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00103',
  level: 'n2',
  pattern: '〜に基づいて / 〜にもとづいて',
  reading: '〜ni motozuite',
  meaning: 'berdasarkan ... / berlandaskan ...',
  cat: 'reason-cause',
  connection: 'N + に基づいて / に基づいた (+ N)',
  desc: '<b>〜に基づいて</b> menyatakan bahwa sesuatu dilakukan berlandaskan data, bukti, hukum, teori, atau prinsip tertentu yang disebutkan.',
  nuance: 'Menekankan fondasi intelektual, legal, atau faktual dari suatu tindakan atau keputusan. Sangat umum dalam dokumen resmi, laporan akademis, dan konteks hukum. Berbeda dari に即して yang menekankan realita lapangan.',
  examples: [
    { jp: '証拠<b>に基づいて</b>判断を下した。', id: 'Keputusan diambil berdasarkan bukti yang ada.' },
    { jp: 'この規則<b>に基づいて</b>、手続きが行われます。', id: 'Prosedur dilaksanakan berdasarkan aturan ini.' },
    { jp: 'データ<b>に基づいた</b>分析が必要だ。', id: 'Diperlukan analisis yang berlandaskan data.' }
  ],
  see_also_grammar: ['gn2-00101', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00101', 'gn2-00102'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00104',
  level: 'n2',
  pattern: '〜に応じて',
  reading: '〜ni ojite',
  meaning: 'sesuai dengan ... / menyesuaikan dengan ... / bergantung pada ...',
  cat: 'conditional-tara',
  connection: 'N + に応じて / に応じた (+ N)',
  desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi, permintaan, atau situasi yang disebutkan.',
  nuance: 'Menekankan fleksibilitas atau penyesuaian: hasilnya bervariasi tergantung X. Sangat umum dalam konteks bisnis, regulasi, dan pendidikan. Bedakan dengan に基づいて (berdasarkan) — に応じて lebih menekankan dinamika penyesuaian.',
  examples: [
    { jp: '状況<b>に応じて</b>対応を変える必要がある。', id: 'Perlu mengubah respons sesuai situasi yang berkembang.' },
    { jp: '収入<b>に応じて</b>税額が決まります。', id: 'Jumlah pajak ditentukan sesuai pendapatan.' }
  ],
  see_also_grammar: ['gn2-00105', 'gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00105'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00105',
  level: 'n2',
  pattern: '〜に応じた',
  reading: '〜ni ojita',
  meaning: 'yang disesuaikan dengan ... / yang sesuai dengan ...',
  cat: 'conditional-tara',
  connection: 'N + に応じた + N (bentuk atributif)',
  desc: '<b>〜に応じた</b> adalah bentuk atributif (prenominal) dari に応じて, digunakan langsung sebelum nomina untuk menyatakan "N yang disesuaikan dengan X".',
  nuance: 'Secara semantis sama dengan に応じて, tapi posisinya adalah modifier nomina. Sangat umum dalam konteks kebijakan, pendidikan, dan layanan. Pelajar sering lupa bahwa bentuk atributif memakai た, bukan て.',
  examples: [
    { jp: '個人の能力<b>に応じた</b>学習計画を作成してください。', id: 'Tolong buat rencana belajar yang disesuaikan dengan kemampuan masing-masing individu.' },
    { jp: 'ニーズ<b>に応じた</b>サービスを提供することが重要だ。', id: 'Penting untuk menyediakan layanan yang disesuaikan dengan kebutuhan pelanggan.' }
  ],
  see_also_grammar: ['gn2-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00104'],
  register: null,
  exceptions: null,
  notes: '〜に応じた adalah bentuk adjektival dari に応じて. Selalu diikuti nomina, bukan predikat.',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00106',
  level: 'n2',
  pattern: '〜に先立って',
  reading: '〜ni sakidatte',
  meaning: 'sebelum ... / mendahului ... / sebagai persiapan menjelang ...',
  cat: 'sequential-temporal',
  connection: 'N / V-dict + に先立って / に先立ち',
  desc: '<b>〜に先立って</b> menyatakan bahwa suatu tindakan atau persiapan dilakukan sebelum kejadian besar atau penting yang disebutkan.',
  nuance: 'Lebih formal dari 〜の前に. Sering muncul dalam pengumuman resmi, upacara, atau rilis produk. に先立ち adalah bentuk yang lebih singkat dan sedikit lebih formal, umum dalam bahasa tulis.',
  examples: [
    { jp: '式典<b>に先立って</b>、リハーサルが行われた。', id: 'Sebelum upacara, gladi resik pun dilaksanakan.' },
    { jp: '製品発売<b>に先立ち</b>、プレスリリースが配布された。', id: 'Mendahului peluncuran produk, siaran pers telah dibagikan.' }
  ],
  see_also_grammar: ['gn2-00107'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00107',
  level: 'n2',
  pattern: '〜を契機に',
  reading: '〜wo keiki ni',
  meaning: 'menjadikan ... sebagai momentum / berawal dari ... (sebagai titik balik penting)',
  cat: 'inception-continuation',
  connection: 'N + を契機に / を契機として',
  desc: '<b>〜を契機に</b> menyatakan bahwa peristiwa X menjadi momentum atau titik balik yang mendorong perubahan atau tindakan signifikan sesudahnya.',
  nuance: 'Lebih formal dari をきっかけに dan sering dipakai untuk peristiwa besar atau bersejarah. を契機として lebih formal lagi. Konotasinya lebih berat/bermakna dibanding をきっかけに yang lebih kasual dan personal.',
  examples: [
    { jp: 'その事故<b>を契機に</b>、安全規制が大幅に強化された。', id: 'Berawal dari kecelakaan itu, regulasi keselamatan pun diperkuat secara signifikan.' },
    { jp: '転職<b>を契機に</b>、生き方そのものを見直した。', id: 'Menjadikan pergantian pekerjaan sebagai momentum, aku menata ulang cara hidupku.' }
  ],
  see_also_grammar: ['gn2-00108', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00108', 'gn2-00095', 'gn2-00106'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00108',
  level: 'n2',
  pattern: '〜をきっかけに',
  reading: '〜wo kikkake ni',
  meaning: 'karena dipicu oleh ... / berawal dari ... / gara-gara ...',
  cat: 'inception-continuation',
  connection: 'N / V-plain + のをきっかけに',
  desc: '<b>〜をきっかけに</b> menyatakan bahwa X menjadi pemicu atau awal mula dari suatu perubahan atau tindakan. Lebih kasual dan personal dibanding を契機に.',
  nuance: 'Bisa digunakan untuk kejadian besar maupun kecil dalam kehidupan sehari-hari. Lebih umum dan fleksibel dari を契機に. Konotasinya lebih personal: sering menceritakan pengalaman individu.',
  examples: [
    { jp: '旅行<b>をきっかけに</b>、写真に深く興味を持つようになった。', id: 'Berawal dari perjalanan itu, aku jadi sangat tertarik dengan fotografi.' },
    { jp: '彼女に出会った<b>のをきっかけに</b>、日本語の勉強を始めた。', id: 'Dipicu oleh pertemuan dengannya, aku mulai belajar bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00107', 'gn2-00095'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00107', 'gn2-00095'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00109',
  level: 'n2',
  pattern: '〜をめどに',
  reading: '〜wo medo ni',
  meaning: 'dengan target ... / dengan patokan waktu ... / paling lambat ...',
  cat: 'purpose',
  connection: 'N (waktu/angka) + をめどに / をめどとして',
  desc: '<b>〜をめどに</b> menyatakan suatu target waktu atau angka yang dijadikan patokan, dengan nuansa fleksibel — bukan batas mati, tapi tujuan yang diupayakan.',
  nuance: 'Berbeda dari までに (batas waktu keras dan wajib): をめどに adalah target yang diupayakan, sedikit fleksibel. Sering digunakan dalam konteks bisnis, proyek, dan pernyataan pemerintah.',
  examples: [
    { jp: '来月末<b>をめどに</b>、報告書を提出してください。', id: 'Harap selesaikan laporan dengan target akhir bulan depan.' },
    { jp: '三年<b>をめどに</b>、この事業の黒字化を目指します。', id: 'Dengan target tiga tahun, kami berupaya mencapai profitabilitas bisnis ini.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: 'Perbedaan kunci: をめどに = target/patokan (fleksibel); までに = batas waktu (wajib).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00110',
  level: 'n2',
  pattern: '〜を中心に',
  reading: '〜wo chuushin ni',
  meaning: 'berpusat pada ... / dengan ... sebagai inti / yang difokuskan pada ...',
  cat: 'extent-degree',
  connection: 'N + を中心に / を中心として / を中心にして',
  desc: '<b>〜を中心に</b> menyatakan bahwa sesuatu terjadi atau dilakukan dengan X sebagai pusat, titik fokus, atau inti. Bisa bermakna geografis maupun figuratif.',
  nuance: 'Sangat fleksibel dan umum digunakan dalam berbagai register. Makna geografis: "berpusat di X secara fisik". Makna figuratif: "dengan X sebagai fokus utama". を中心として sedikit lebih formal.',
  examples: [
    { jp: '東京<b>を中心に</b>、関東地方全域に被害が広がった。', id: 'Dengan Tokyo sebagai pusat, kerusakan meluas ke seluruh wilayah Kanto.' },
    { jp: '若者層<b>を中心に</b>、このサービスへの支持が急速に広がっている。', id: 'Berpusat pada kalangan anak muda, dukungan terhadap layanan ini menyebar dengan cepat.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00111', level: 'n2', pattern: '〜ようでは / 〜ようじゃ',
  reading: '〜you de wa / 〜you ja',
  meaning: 'kalau sampai seperti itu ... (ekspresi kekecewaan/kekhawatiran)',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは / ようじゃ',
  desc: '<b>〜ようでは</b> digunakan ketika pembicara mengekspresikan kekhawatiran atau ketidaksetujuan terhadap kondisi yang disebutkan — menyiratkan bahwa kondisi tersebut tidak dapat diterima.',
  nuance: 'ようじゃ adalah bentuk kasual dari ようでは. Sering diikuti ungkapan negatif seperti 困る、話にならない、だめだ. Menyiratkan kritik atau peringatan — "kalau sampai begitu, maka ada masalah."',
  examples: [
    { jp: 'そんなことで怒る<b>ようでは</b>、社会人として失格だ。', id: 'Kalau sampai marah karena hal seperti itu, tidak layak jadi orang dewasa.' },
    { jp: '基本も分からない<b>ようじゃ</b>、試験に合格できないよ。', id: 'Kalau dasar saja tidak mengerti, tidak akan bisa lulus ujian.' }
  ],
  see_also_grammar: ['gn2-00112', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00112', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00112', level: 'n2', pattern: '〜ようでは困る',
  reading: '〜you de wa komaru',
  meaning: 'kalau sampai begitu akan bermasalah',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは困る',
  desc: '<b>〜ようでは困る</b> mengungkapkan bahwa jika kondisi tertentu terjadi atau berlanjut, hal itu akan menjadi masalah serius. Digunakan sebagai peringatan atau teguran halus.',
  nuance: 'Lebih spesifik dari ようでは — selalu berakhir dengan 困る. Sering digunakan atasan kepada bawahan, atau orang tua kepada anak. Nada lebih halus dibanding ようでは話にならない, tapi tetap mengandung ketidaksetujuan.',
  examples: [
    { jp: '毎回遅刻する<b>ようでは困る</b>。', id: 'Kalau sampai terlambat setiap kali, itu akan jadi masalah.' },
    { jp: '部下に頼り続ける<b>ようでは困る</b>よ。', id: 'Kalau terus bergantung pada bawahan, itu akan jadi masalah.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00113', level: 'n2', pattern: '〜ようでは話にならない',
  reading: '〜you de wa hanashi ni naranai',
  meaning: 'kalau begitu tidak ada gunanya bicara',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは話にならない',
  desc: '<b>〜ようでは話にならない</b> menyatakan bahwa kondisi yang disebutkan sangat tidak memadai sehingga tidak ada gunanya melanjutkan diskusi atau harapan.',
  nuance: 'Lebih keras dari ようでは困る — menyiratkan penolakan total atau frustrasi mendalam. Digunakan ketika standar minimum pun tidak terpenuhi. Cocok dalam konteks profesional atau evaluasi kinerja.',
  examples: [
    { jp: 'この程度しかできない<b>ようでは話にならない</b>。', id: 'Kalau kemampuannya hanya segitu, tidak ada gunanya bicara.' },
    { jp: '自分の意見も言えない<b>ようでは話にならない</b>よ。', id: 'Kalau pendapat sendiri saja tidak bisa diungkapkan, tidak ada artinya.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00112'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00112'],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00114', level: 'n2', pattern: '〜てこそ',
  reading: '〜te koso',
  meaning: 'justru karena ... baru bisa ... (syarat esensial)',
  cat: 'reason-cause',
  connection: 'V-te + こそ',
  desc: '<b>〜てこそ</b> menyatakan bahwa justru karena melakukan A, barulah kondisi atau hasil B bisa tercapai. A adalah syarat mutlak agar B terwujud.',
  nuance: 'Berbeda dari てから (urutan waktu) — てこそ menekankan bahwa A adalah syarat hakiki, bukan sekadar urutan. Sering digunakan dalam konteks motivasi, nilai hidup, atau pelajaran mendalam.',
  examples: [
    { jp: '失敗し<b>てこそ</b>、人は本当に成長できる。', id: 'Justru karena mengalami kegagalan, manusia bisa benar-benar bertumbuh.' },
    { jp: '努力し<b>てこそ</b>、達成感が生まれる。', id: 'Justru karena sudah berusaha keras, barulah muncul rasa pencapaian.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00115', level: 'n2', pattern: '〜からこそ',
  reading: '〜kara koso',
  meaning: 'justru karena itulah ... (penekanan pada alasan)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だ + からこそ',
  desc: '<b>〜からこそ</b> memperkuat alasan atau sebab — menegaskan bahwa alasan yang disebut adalah faktor penentu yang sesungguhnya.',
  nuance: 'からこそ = から + こそ (partikel penegas). Digunakan untuk menegaskan alasan yang dianggap menentukan, sering untuk membenarkan tindakan atau mengungkapkan apresiasi mendalam. Berbeda dari てこそ yang menekankan prasyarat tindakan.',
  examples: [
    { jp: 'あなたを信頼している<b>からこそ</b>、この話をしている。', id: 'Justru karena aku percaya padamu, aku membicarakan hal ini.' },
    { jp: '難しい<b>からこそ</b>、挑戦する価値がある。', id: 'Justru karena sulit, ada nilai yang layak untuk diperjuangkan.' }
  ],
  see_also_grammar: ['gn2-00114', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00114', 'gn2-00116'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00116', level: 'n2', pattern: '〜ばこそ',
  reading: '〜ba koso',
  meaning: 'justru karena ... (bentuk literary dari からこそ)',
  cat: 'reason-cause',
  connection: 'V-conditional (〜ば) / N・Adj + であればこそ',
  desc: '<b>〜ばこそ</b> adalah bentuk literary dan sangat formal dari からこそ — menekankan alasan dengan bobot yang lebih kuat menggunakan struktur kondisional ば.',
  nuance: 'Sangat formal dan literary — jarang dalam percakapan sehari-hari. Lebih kuat dari からこそ karena menggunakan bentuk kondisional. Sering ditemukan dalam tulisan formal, pidato, atau sastra. Pelajar perlu mengenali tapi tidak perlu aktif menggunakannya dalam percakapan.',
  examples: [
    { jp: '愛してい<b>ればこそ</b>、厳しく言うのだ。', id: 'Justru karena mencintaimu, aku berbicara dengan tegas.' },
    { jp: '君の将来を思え<b>ばこそ</b>、忠告したのだ。', id: 'Justru karena memikirkan masa depanmu, aku memberikan nasihat itu.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00114'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00117', level: 'n2', pattern: '〜だけに',
  reading: '〜dake ni',
  meaning: 'justru karena ... / mengingat ... (hasil terasa lebih kuat)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけに',
  desc: '<b>〜だけに</b> menyatakan bahwa justru karena kondisi di bagian pertama, dampak atau perasaan di bagian kedua terasa lebih kuat atau lebih wajar.',
  nuance: 'Berbeda dari だけあって — だけに bisa digunakan untuk hasil negatif maupun positif, sedangkan だけあって hampir selalu positif. だけに sering menyiratkan beban harapan atau dampak emosional yang diperbesar oleh kondisi yang disebutkan.',
  examples: [
    { jp: '長年努力してきた<b>だけに</b>、失敗のショックは大きかった。', id: 'Justru karena sudah berjuang bertahun-tahun, guncangan kegagalan itu terasa sangat besar.' },
    { jp: '期待されていた<b>だけに</b>、残念な結果だった。', id: 'Mengingat betapa besarnya harapan yang disematkan, hasilnya sungguh mengecewakan.' }
  ],
  see_also_grammar: ['gn2-00118', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00118', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00118', level: 'n2', pattern: '〜だけあって',
  reading: '〜dake atte',
  meaning: 'memang pantas karena ... / tidak heran karena ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas di bagian kedua memang wajar dan sejalan dengan reputasi, pengalaman, atau kemampuan yang disebutkan di bagian pertama.',
  nuance: 'Hampir selalu digunakan untuk penilaian positif — berbeda dari だけに yang bisa untuk hasil negatif. Mengandung nuansa "terbukti wajar, tidak mengherankan." Cocok untuk memuji seseorang secara tidak langsung.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、仕事がとても丁寧だ。', id: 'Tidak heran karena profesional, pekerjaannya sangat teliti.' },
    { jp: '長く勉強した<b>だけあって</b>、日本語がとても上手だ。', id: 'Memang pantas karena sudah lama belajar, bahasa Jepangnya sangat bagus.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00119', level: 'n2', pattern: '〜だけのことはある',
  reading: '〜dake no koto wa aru',
  meaning: 'memang ada alasannya / tidak sia-sia ...',
  cat: 'reason-cause',
  connection: 'V-plain / N + だけのことはある',
  desc: '<b>〜だけのことはある</b> mengkonfirmasi bahwa usaha, biaya, atau kondisi yang disebutkan memang sepadan dengan hasil yang diperoleh — "terbukti tidak sia-sia."',
  nuance: 'Lebih kuat nuansa konfirmasinya dibanding だけあって. Sering diucapkan setelah menyaksikan langsung hasil yang mengesankan. Mengandung makna "memang layak, tidak mengecewakan" — pujian berdasarkan bukti nyata.',
  examples: [
    { jp: '長年修行した<b>だけのことはある</b>。料理が絶品だ。', id: 'Memang tidak sia-sia bertahun-tahun berlatih. Masakannya luar biasa.' },
    { jp: '値段が高い<b>だけのことはある</b>、品質が全然違う。', id: 'Memang ada alasannya kenapa mahal — kualitasnya jauh berbeda.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00118'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00118'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00120', level: 'n2', pattern: '〜ながら(も)',
  reading: '〜nagara (mo)',
  meaning: 'meskipun ... (tapi berlawanan dari yang diharapkan)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem / Adj-plain / N + ながら(も)',
  desc: '<b>〜ながら(も)</b> menyatakan kontras — kondisi A diakui, tapi kondisi B yang mengikutinya bertentangan dengan harapan wajar.',
  nuance: 'も setelah ながら memperkuat nuansa kontras/kejutan. Berbeda dari つつ(も) yang hanya menempel ke verb — ながら(も) bisa menempel ke noun dan adjective juga. Contoh: 小さいながらも (meskipun kecil), 新人ながらも (meskipun masih baru).',
  examples: [
    { jp: '小さい<b>ながらも</b>、立派な庭がある。', id: 'Meskipun kecil, taman itu tampak sangat megah.' },
    { jp: '反対し<b>ながらも</b>、彼は最終的に従った。', id: 'Meskipun menentang, akhirnya dia tetap menurut.' }
  ],
  see_also_grammar: ['gn2-00121'], see_also_vocab: [],
  confusion_pairs: ['gn2-00121'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00121', level: 'n2', pattern: '〜つつ(も)',
  reading: '〜tsutsu (mo)',
  meaning: 'sambil ... / meskipun tahu ... (kontras dengan konflik batin)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem + つつ(も)',
  desc: '<b>〜つつ(も)</b> menyatakan bahwa meskipun menyadari atau melakukan A secara bersamaan, kondisi berlawanan B tetap terjadi — sering menyiratkan konflik batin.',
  nuance: 'Lebih formal dari ながら(も) dan hanya menempel ke verb. Menekankan ketegangan antara dua hal yang terjadi bersamaan — terutama antara apa yang diketahui/dirasakan dengan apa yang dilakukan. Sering digunakan dalam tulisan atau narasi introspektif.',
  examples: [
    { jp: '悪いと分かり<b>つつも</b>、やめられなかった。', id: 'Meskipun tahu itu salah, tidak bisa berhenti juga.' },
    { jp: '疲れを感じ<b>つつも</b>、仕事を続けた。', id: 'Meskipun merasakan kelelahan, terus bekerja juga.' }
  ],
  see_also_grammar: ['gn2-00120'], see_also_vocab: [],
  confusion_pairs: ['gn2-00120'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00122', level: 'n2', pattern: '〜くせに',
  reading: '〜kuse ni',
  meaning: 'padahal ... / meskipun begitu malah ... (kecaman/sinisme)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + の + くせに',
  desc: '<b>〜くせに</b> mengekspresikan kritik, ketidaksenangan, atau sinisme — perilaku atau kondisi subjek bertentangan dengan apa yang seharusnya, dan pembicara tidak menyukainya.',
  nuance: 'Selalu mengandung nada negatif — berbeda dari のに yang lebih netral. Tidak sopan digunakan kepada orang yang lebih tua atau atasan. Penggunaannya menyiratkan bahwa pembicara merasa kesal atau kecewa dengan inkonsistensi subjek.',
  examples: [
    { jp: '知っている<b>くせに</b>、知らないふりをしている。', id: 'Padahal tahu, malah pura-pura tidak tahu.' },
    { jp: '下手な<b>くせに</b>、人の仕事を批判する。', id: 'Padahal tidak mahir, malah mengkritik pekerjaan orang lain.' }
  ],
  see_also_grammar: ['gn2-00120', 'gn2-00121'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00123', level: 'n2', pattern: '〜ものを',
  reading: '〜mono o',
  meaning: 'padahal kalau saja ... (penyesalan yang tertahan)',
  cat: 'completion-regret',
  connection: 'V-plain / Adj-plain + ものを',
  desc: '<b>〜ものを</b> mengungkapkan penyesalan — situasi yang disesalkan seharusnya bisa dihindari jika kondisi tertentu terpenuhi. Sering digunakan di akhir kalimat.',
  nuance: 'Lebih formal dan literary dari のに. Mengandung nuansa kritik atau keluhan yang tertahan — pembicara menyayangkan kondisi yang tidak sesuai harapan. Sering terdengar dalam monolog, narasi, atau percakapan yang intens secara emosional.',
  examples: [
    { jp: '早く言えばよかった<b>ものを</b>。', id: 'Padahal kalau saja bilang lebih awal...' },
    { jp: '少し待てばよかった<b>ものを</b>、なぜそんなに急いだのか。', id: 'Padahal kalau sabar sebentar saja — mengapa tergesa-gesa begitu?' }
  ],
  see_also_grammar: ['gn2-00124', 'gn2-00125'], see_also_vocab: [],
  confusion_pairs: ['gn2-00124'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00124', level: 'n2', pattern: '〜ものなら',
  reading: '〜mono nara',
  meaning: 'kalau saja bisa ... (harapan hypothetical / tantangan implisit)',
  cat: 'conjecture-possibility',
  connection: 'V-potential / V-volitional-plain + ものなら',
  desc: '<b>〜ものなら</b> memiliki dua penggunaan: (1) harapan terhadap sesuatu yang dianggap sulit atau mustahil; (2) tantangan atau provokasi implisit.',
  nuance: 'Perhatikan konteks: できるものなら〜したい = harapan yang sulit terwujud; やれるものならやってみろ = tantangan/provokasi. Keduanya menyiratkan skeptisisme terhadap kemungkinan terjadinya hal tersebut.',
  examples: [
    { jp: 'できる<b>ものなら</b>、もう一度やり直したい。', id: 'Kalau saja bisa, ingin mengulang dari awal.' },
    { jp: 'やれる<b>ものなら</b>やってみろ。', id: 'Kalau memang bisa, silakan coba saja.' }
  ],
  see_also_grammar: ['gn2-00123', 'gn2-00125'], see_also_vocab: [],
  confusion_pairs: ['gn2-00123'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00125', level: 'n2', pattern: '〜もので / 〜ものだから',
  reading: '〜mono de / 〜mono dakara',
  meaning: 'karena ... (penjelasan/pembenaran dari sudut pandang pembicara)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + もので / ものだから',
  desc: '<b>〜ものだから</b> dan <b>〜もので</b> memberikan penjelasan atau pembenaran atas suatu kondisi, sering untuk minta maaf atau mengklarifikasi.',
  nuance: 'ものだから lebih kuat dan terkesan seperti pembelaan diri. もので sedikit lebih halus. Keduanya lebih subjektif dari ので — menekankan alasan dari sudut pandang pembicara yang tidak bisa dihindari. Sering digunakan untuk meminta maaf karena keterlambatan atau kesalahan.',
  examples: [
    { jp: '急いでいた<b>もので</b>、ご連絡できませんでした。', id: 'Karena sedang terburu-buru, tidak sempat menghubungi.' },
    { jp: '子供が熱を出した<b>ものだから</b>、早退しました。', id: 'Karena anak demam, saya pulang lebih awal.' }
  ],
  see_also_grammar: ['gn2-00123', 'gn2-00124'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00126', level: 'n2', pattern: '〜というものだ',
  reading: '〜to iu mono da',
  meaning: 'memang begitulah seharusnya / itulah yang namanya ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + というものだ',
  desc: '<b>〜というものだ</b> menyatakan bahwa sesuatu memang sudah seharusnya begitu — mengungkapkan prinsip umum, nilai, atau kebenaran yang dipegang pembicara.',
  nuance: 'Digunakan untuk menegaskan kebenaran umum atau penilaian moral. Sering terdengar seperti pernyataan filosofis atau bijak. Berbeda dari というものでもない yang menyangkal generalisasi — keduanya berlawanan langsung.',
  examples: [
    { jp: '親が子を思うのは当然<b>というものだ</b>。', id: 'Memang sudah seharusnya orang tua menyayangi anaknya.' },
    { jp: '苦しい時に助け合う、それが友情<b>というものだ</b>。', id: 'Saling membantu di saat sulit — itulah yang namanya persahabatan.' }
  ],
  see_also_grammar: ['gn2-00127', 'gn2-00128'], see_also_vocab: [],
  confusion_pairs: ['gn2-00127'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00127', level: 'n2', pattern: '〜というものでもない',
  reading: '〜to iu mono demo nai',
  meaning: 'bukan berarti ... / tidak harus selalu begitu ...',
  cat: 'sentence-final-modality',
  connection: 'V-plain / Adj-plain / N + というものでもない',
  desc: '<b>〜というものでもない</b> menyangkal generalisasi atau asumsi yang terlalu mutlak — "bukan berarti selalu begitu."',
  nuance: 'Kebalikan langsung dari というものだ. Sering dipadukan dengan かならずしも (tidak selalu). Digunakan untuk meluruskan asumsi atau pendapat umum yang terlalu ekstrem. Tone-nya lebih analitis dan reflektif.',
  examples: [
    { jp: '値段が高ければいい<b>というものでもない</b>。', id: 'Bukan berarti karena mahal pasti bagus.' },
    { jp: '努力すれば必ず成功する<b>というものでもない</b>。', id: 'Bukan berarti kalau sudah berusaha keras pasti berhasil.' }
  ],
  see_also_grammar: ['gn2-00126', 'gn2-00130'], see_also_vocab: [],
  confusion_pairs: ['gn2-00126', 'gn2-00130'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00128', level: 'n2', pattern: '〜ということになる',
  reading: '〜to iu koto ni naru',
  meaning: 'artinya ... / berarti ... (kesimpulan logis)',
  cat: 'quotation-thought',
  connection: 'Clause + ということになる',
  desc: '<b>〜ということになる</b> menyatakan kesimpulan logis yang ditarik dari kondisi atau informasi yang telah diberikan sebelumnya.',
  nuance: 'Berbeda dari ということになっている (aturan yang sudah ada) — ということになる adalah proses penarikan kesimpulan baru. Digunakan untuk menyimpulkan implikasi dari fakta yang sudah diketahui, sering dalam diskusi logis atau analisis.',
  examples: [
    { jp: '彼が来ないと、計画は中止<b>ということになる</b>。', id: 'Kalau dia tidak datang, artinya rencana harus dibatalkan.' },
    { jp: '全員賛成なら、決定した<b>ということになる</b>。', id: 'Kalau semua setuju, berarti sudah diputuskan.' }
  ],
  see_also_grammar: ['gn2-00129', 'gn2-00126'], see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00129', level: 'n2', pattern: '〜ということになっている',
  reading: '〜to iu koto ni natte iru',
  meaning: 'sudah menjadi aturan bahwa ... / secara tidak tertulis ...',
  cat: 'obligation-necessity',
  connection: 'Clause + ということになっている',
  desc: '<b>〜ということになっている</b> menyatakan bahwa sesuatu telah menjadi aturan, kesepakatan, atau norma yang berlaku — baik tertulis maupun tak tertulis.',
  nuance: 'Berbeda dari ことになっている (aturan/rencana resmi) — ということになっている sering menyiratkan norma implisit atau konvensi sosial yang sudah dipahami bersama. Mengandung nuansa "begitulah ketentuannya, sudah seperti itu dari dulu."',
  examples: [
    { jp: 'ここでは靴を脱ぐ<b>ということになっている</b>。', id: 'Di sini sudah menjadi aturan bahwa harus melepas sepatu.' },
    { jp: '会議の費用は会社が負担する<b>ということになっている</b>。', id: 'Sudah menjadi ketentuan bahwa biaya rapat ditanggung perusahaan.' }
  ],
  see_also_grammar: ['gn2-00128'], see_also_vocab: [],
  confusion_pairs: ['gn2-00128'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00130', level: 'n2', pattern: '〜とは限らない',
  reading: '〜to wa kagiranai',
  meaning: 'tidak selalu ... / belum tentu ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + とは限らない',
  desc: '<b>〜とは限らない</b> menyatakan bahwa sesuatu tidak selalu benar atau tidak bisa dipastikan — menyanggah generalisasi atau asumsi.',
  nuance: 'Berbeda dari わけではない (bukan berarti dalam kasus ini) — とは限らない lebih menekankan "tidak selalu terjadi" dari sisi kemungkinan umum. Sering dipadukan dengan かならずしも. Digunakan untuk berpikir kritis atau mempertanyakan asumsi.',
  examples: [
    { jp: '有名な人が優れている<b>とは限らない</b>。', id: 'Belum tentu orang yang terkenal itu unggul.' },
    { jp: '高い薬が効く<b>とは限らない</b>。', id: 'Belum tentu obat yang mahal itu ampuh.' }
  ],
  see_also_grammar: ['gn2-00127', 'gn2-00124'], see_also_vocab: [],
  confusion_pairs: ['gn2-00127'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}
];
