// ──────────────────────────────────────────────────────────────
//  n2-modality.js — Nugget Nihongo · JLPT N2 Grammar
//  53 entries | Category: modality
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Modality = [

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
  confusion_pairs: ['gn2-00128', 'gn2-00151', 'gn2-00152'],
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
},

{
  id: 'gn2-00139', level: 'n2', pattern: '〜によれば / 〜によると',
  reading: '〜ni yoreba / 〜ni yoru to',
  meaning: 'menurut ..., berdasarkan informasi dari ...',
  cat: 'hearsay-report',
  connection: 'N + によれば / N + によると',
  desc: '<b>〜によれば</b> dan <b>〜によると</b> digunakan untuk mengutip sumber informasi — berita, laporan, ucapan seseorang, dsb. Biasanya diikuti oleh pernyataan atau klaim yang berasal dari sumber tersebut.',
  nuance: 'Keduanya hampir identik dalam makna. によれば sedikit lebih formal dan lebih sering muncul dalam tulisan, sementara によると lebih umum dalam percakapan lisan. Keduanya berbeda dari に基づいて yang menyatakan bahwa sesuatu berlandaskan fakta/aturan secara aktif.',
  examples: [
    { jp: '天気予報<b>によると</b>、明日は雨が降るそうだ。', id: 'Menurut prakiraan cuaca, besok katanya akan hujan.' },
    { jp: '報告書<b>によれば</b>、今年の売上は前年比で増加した。', id: 'Menurut laporan tersebut, penjualan tahun ini meningkat dibandingkan tahun lalu.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00149', level: 'n2', pattern: '〜に違いない',
  reading: '〜ni chigai nai',
  meaning: 'pasti ..., tidak diragukan lagi ..., tentu saja ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / い-Adj-plain / な-Adj + に違いない / N + に違いない',
  desc: '<b>〜に違いない</b> menyatakan keyakinan kuat dari penutur bahwa sesuatu pasti benar, berdasarkan bukti atau intuisi yang kuat. Tidak ada keraguan di benak penutur.',
  nuance: 'Lebih kuat dari はずだ (seharusnya, berdasarkan logika) — に違いない mengungkapkan keyakinan personal yang hampir tidak tergoyahkan. はずだ lebih obyektif dan logis; に違いない lebih subyektif dan emosional. Keduanya berbeda dari だろう yang lebih umum.',
  examples: [
    { jp: 'あの電気は消えていない。まだ誰かいる<b>に違いない</b>。', id: 'Lampunya masih menyala. Pasti masih ada seseorang di dalam.' },
    { jp: '彼女がそんなことをするはずがない。何か理由がある<b>に違いない</b>。', id: 'Tidak mungkin dia melakukan hal itu. Pasti ada alasan tertentu.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00152', level: 'n2', pattern: '〜ということになっている',
  reading: '〜to iu koto ni natte iru',
  meaning: 'sudah diputuskan/berlaku ketentuan bahwa ..., secara tidak tertulis sudah ...',
  cat: 'obligation-necessity',
  connection: 'Clause + ということになっている',
  desc: '<b>〜ということになっている</b> menyatakan bahwa sesuatu telah menjadi aturan, konvensi, atau norma yang berlaku dalam suatu kelompok atau masyarakat — baik tertulis maupun tidak tertulis.',
  nuance: 'Berbeda dari ことになっている (aturan/rencana resmi yang tertulis atau dijadwalkan) — ということになっている sering menyiratkan norma implisit atau konvensi sosial yang sudah dipahami bersama tanpa perlu ditulis. Lihat juga gn2-00129 untuk pembahasan serupa.',
  examples: [
    { jp: 'この会社では、上司より先に帰ってはいけない<b>ということになっている</b>。', id: 'Di perusahaan ini sudah menjadi norma bahwa karyawan tidak boleh pulang sebelum atasan.' },
    { jp: '入社した社員は最初の一年は現場研修をする<b>ということになっている</b>。', id: 'Sudah menjadi ketentuan bahwa karyawan baru menjalani pelatihan lapangan selama satu tahun pertama.' }
  ],
  see_also_grammar: ['gn2-00129', 'gn2-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00153', level: 'n2', pattern: '〜とは限らない',
  reading: '〜to wa kagiranai',
  meaning: 'tidak selalu ..., belum tentu ..., tidak bisa dipastikan ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / い-Adj-plain / な-Adj + とは限らない / N + とは限らない',
  desc: '<b>〜とは限らない</b> menyatakan bahwa suatu generalisasi atau asumsi tidak selalu berlaku — ada pengecualian atau kemungkinan yang berbeda. Digunakan untuk menyangkal kepastian atau pukul rata.',
  nuance: 'Berbeda dari わけではない (bukan berarti dalam kasus tertentu) — とは限らない menekankan "tidak selalu terjadi secara umum" dan lebih bersifat logis/kritis. Lihat juga gn2-00130. Sering dipadukan dengan かならずしも untuk penekanan.',
  examples: [
    { jp: '一生懸命勉強すれば合格できる<b>とは限らない</b>。', id: 'Belum tentu belajar keras selalu menjamin kelulusan.' },
    { jp: '外国語が話せる<b>とは限らない</b>から、通訳を用意した方がいい。', id: 'Belum tentu mereka bisa berbahasa asing, jadi lebih baik siapkan penerjemah.' }
  ],
  see_also_grammar: ['gn2-00130', 'gn2-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00154'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00155', level: 'n2', pattern: '〜わけにはいかない',
  reading: '〜wake ni wa ikanai',
  meaning: 'tidak bisa begitu saja ..., tidak mungkin tidak ..., tidak ada alasan untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + わけにはいかない / V-ない + わけにはいかない',
  desc: '<b>〜わけにはいかない</b> menyatakan bahwa sesuatu tidak dapat dilakukan karena alasan moral, sosial, atau situasional yang kuat — meski ada keinginan untuk melakukannya. Bentuk negatif (ないわけにはいかない) menyatakan ketidakmampuan untuk tidak melakukan sesuatu.',
  nuance: 'Berbeda dari てはいけない (larangan eksternal) — わけにはいかない adalah hambatan internal berdasarkan norma, tanggung jawab, atau rasa tidak pantas. "Secara logis atau sosial, aku tidak bisa melakukan ini." Bentuk ganda ないわけにはいかない = "tidak ada pilihan selain melakukan".',
  examples: [
    { jp: '大事な会議があるから、休む<b>わけにはいかない</b>。', id: 'Ada rapat penting, jadi tidak bisa begitu saja absen.' },
    { jp: '頼まれた以上、断る<b>わけにはいかない</b>。', id: 'Karena sudah dimintai tolong, tidak mungkin menolaknya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00160', 'gn2-00154'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00156', level: 'n2', pattern: '〜ないものでもない',
  reading: '〜nai mono demo nai',
  meaning: 'bukan tidak mungkin ..., bisa saja ..., tidak mustahil ...',
  cat: 'conjecture-possibility',
  connection: 'V-ない + ものでもない',
  desc: '<b>〜ないものでもない</b> adalah ungkapan negatif ganda yang menyatakan kemungkinan dengan nada ragu-ragu atau hati-hati — "tidak bisa dikatakan tidak mungkin". Menyiratkan kesediaan atau kemungkinan yang kecil namun ada.',
  nuance: 'Lebih ragu-ragu dibandingkan かもしれない (mungkin) atau できる (bisa) — ないものでもない menyiratkan keengganan atau kondisional. "Bukannya tidak bisa... kalau dipaksa/kondisi tepat." Digunakan saat berbicara secara hati-hati atau berdiplomasi.',
  examples: [
    { jp: '条件次第では、協力でき<b>ないものでもない</b>。', id: 'Tergantung kondisinya, bukan tidak mungkin saya bisa membantu.' },
    { jp: '彼の言い分にも、一理あら<b>ないものでもない</b>。', id: 'Bukan berarti argumennya sama sekali tidak ada benarnya.' }
  ],
  see_also_grammar: ['gn2-00157'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00157', level: 'n2', pattern: '〜かねない',
  reading: '〜kanenai',
  meaning: 'bisa saja (hal buruk) terjadi, ada kemungkinan (negatif) ...',
  cat: 'conjecture-possibility',
  connection: 'V-stem + かねない',
  desc: '<b>〜かねない</b> menyatakan bahwa ada kemungkinan nyata bahwa hal yang tidak diinginkan atau berbahaya bisa terjadi. Selalu menyiratkan konsekuensi negatif yang perlu diwaspadai.',
  nuance: 'Berlawanan dengan かねる (tidak bisa/sulit melakukan) meski berasal dari akar yang sama — かねない = "bisa saja terjadi (hal buruk)", bukan "tidak bisa melakukan". Selalu konteks negatif. Berbeda dari かもしれない yang netral.',
  examples: [
    { jp: '無理をすると、体を壊し<b>かねない</b>。', id: 'Kalau memaksakan diri, bisa-bisa merusak kesehatan.' },
    { jp: 'そんな発言は誤解を招き<b>かねない</b>から、気をつけてください。', id: 'Pernyataan seperti itu bisa menimbulkan kesalahpahaman, jadi hati-hati.' }
  ],
  see_also_grammar: ['gn2-00158'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00158'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00160', level: 'n2', pattern: '〜ざるを得ない',
  reading: '〜zaru wo enai',
  meaning: 'terpaksa ..., tidak punya pilihan selain ..., mau tidak mau ...',
  cat: 'obligation-necessity',
  connection: 'V-ない-stem + ざるを得ない (kecuali する → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> menyatakan keterpaksaan yang tidak terelakkan — pembicara tidak ingin melakukan sesuatu, namun situasi memaksanya untuk melakukannya. Menekankan ketiadaan pilihan.',
  nuance: 'Lebih kuat rasa terpaksanya dibandingkan しなければならない (harus melakukan) — ざるを得ない secara tegas menyiratkan "kalau bisa tidak mau, tapi tidak ada pilihan lain". Kata する menjadi せ (bukan しざる) — pengecualian penting yang sering salah.',
  examples: [
    { jp: '電車が止まって、歩か<b>ざるを得なかった</b>。', id: 'Karena kereta berhenti, terpaksa harus jalan kaki.' },
    { jp: '証拠が出た以上、認め<b>ざるを得ない</b>。', id: 'Setelah bukti muncul, tidak ada pilihan selain mengakuinya.' },
    { jp: 'コスト削減のため、プロジェクトを縮小<b>せざるを得ない</b>。', id: 'Demi penghematan biaya, terpaksa harus memperkecil skala proyek.' }
  ],
  see_also_grammar: ['gn2-00155'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00155'],
  register: null, exceptions: null,
  notes: 'Pengecualian: する → せざるを得ない (bukan しざるを得ない).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00170', level: 'n2', pattern: '〜からには',
  reading: '〜kara ni wa',
  meaning: 'karena sudah ..., maka harus ...; karena memang begitu, sudah selayaknya ...',
  cat: 'obligation-necessity',
  connection: 'V-plain + からには / N + である + からには',
  desc: '<b>〜からには</b> menyatakan bahwa karena suatu kondisi atau situasi sudah terjadi atau benar, maka ada tanggung jawab, kewajiban, atau konsekuensi logis yang harus diikuti. Menekankan komitmen atau konsekuensi yang tidak terelakkan.',
  nuance: 'Lebih spoken dibandingkan 上は dan 以上は yang lebih formal/tertulis. Semua tiga pola berbagi makna dasar, namun からには paling sering digunakan dalam percakapan sehari-hari dan tulisan semi-formal.',
  examples: [
    { jp: '約束した<b>からには</b>、必ず守らなければならない。', id: 'Karena sudah berjanji, harus ditepati tanpa kecuali.' },
    { jp: '参加する<b>からには</b>、全力で頑張ります。', id: 'Karena sudah memutuskan ikut, saya akan berusaha sepenuh hati.' }
  ],
  see_also_grammar: ['gn2-00171', 'gn2-00172'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00171', 'gn2-00172', 'gn2-00169'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00171', level: 'n2', pattern: '〜上は',
  reading: '〜ue wa',
  meaning: 'karena sudah ..., maka harus ... (formal, mengungkapkan tekad)',
  cat: 'obligation-necessity',
  connection: 'V-plain + 上は',
  desc: '<b>〜上は</b> menyatakan bahwa karena situasi atau keputusan sudah final, ada kewajiban atau tekad yang mengikutinya. Lebih formal dan kaku dibandingkan からには, sering muncul dalam pidato, tulisan resmi, atau ungkapan tekad yang sungguh-sungguh.',
  nuance: 'Dari tiga pola serupa (からには / 以上は / 上は), 上は paling formal dan paling jarang dalam percakapan. Berbagi makna inti dengan keduanya — mengungkapkan konsekuensi yang logis dan wajib dari kondisi yang sudah terjadi.',
  examples: [
    { jp: '引き受けた<b>上は</b>、最後まで責任を持ってやり遂げる。', id: 'Karena sudah menerimanya, saya akan menyelesaikannya dengan penuh tanggung jawab sampai akhir.' },
    { jp: '社会人となった<b>上は</b>、自覚を持って行動しなければならない。', id: 'Karena sudah menjadi anggota masyarakat dewasa, harus bertindak dengan penuh kesadaran.' }
  ],
  see_also_grammar: ['gn2-00170', 'gn2-00172'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170', 'gn2-00172'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00172', level: 'n2', pattern: '〜以上は',
  reading: '〜ijou wa',
  meaning: 'karena sudah ..., maka harus ...; selama masih dalam kondisi ...',
  cat: 'obligation-necessity',
  connection: 'V-plain + 以上は / N + である + 以上は',
  desc: '<b>〜以上は</b> memiliki dua nuansa: (1) karena situasi sudah demikian, ada kewajiban yang mengikutinya; (2) selama kondisi tertentu masih berlaku, hal lain harus terpenuhi. Lebih formal dari からには namun lebih umum dari 上は.',
  nuance: 'Dari tiga pola (からには / 以上は / 上は): 以上は adalah posisi tengah — lebih formal dari からには, namun tidak sekaku 上は. Juga bisa menyatakan kondisi berkelanjutan "selama masih X", sedangkan からには dan 上は lebih terfokus pada momen keputusan.',
  examples: [
    { jp: 'プロである<b>以上は</b>、常に最善を尽くすべきだ。', id: 'Selama masih seorang profesional, sudah seharusnya selalu memberikan yang terbaik.' },
    { jp: '決めた<b>以上は</b>、後悔しないようにしよう。', id: 'Karena sudah memutuskan, jangan sampai menyesal nantinya.' }
  ],
  see_also_grammar: ['gn2-00170', 'gn2-00171'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170', 'gn2-00171'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00173', level: 'n2', pattern: '〜べきだ',
  reading: '〜beki da',
  meaning: 'seharusnya ..., sudah selayaknya ..., wajib secara moral ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + べきだ (kecuali: する → すべきだ atau するべきだ)',
  desc: '<b>〜べきだ</b> menyatakan kewajiban atau keharusan berdasarkan penilaian moral, norma sosial, atau nalar penutur. Mengungkapkan bahwa sesuatu sudah selayaknya dilakukan menurut standar yang berlaku.',
  nuance: 'Berbeda dari なければならない (keharusan eksternal/aturan) — べきだ adalah penilaian normatif penutur: "menurut saya/norma ini, seharusnya demikian". Lebih bernada menggurui atau memberi saran kuat. する menjadi すべき atau するべき (keduanya diterima).',
  examples: [
    { jp: '間違えたなら、素直に謝る<b>べきだ</b>。', id: 'Kalau memang salah, seharusnya minta maaf dengan tulus.' },
    { jp: '健康のために、もっと野菜を食べる<b>べきだ</b>。', id: 'Demi kesehatan, seharusnya makan lebih banyak sayuran.' }
  ],
  see_also_grammar: ['gn2-00174'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00174'],
  register: null, exceptions: null,
  notes: 'する → すべきだ atau するべきだ (keduanya diterima; すべきだ lebih formal).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00174', level: 'n2', pattern: '〜べきではない',
  reading: '〜beki de wa nai',
  meaning: 'seharusnya tidak ..., tidak sepantasnya ..., tidak layak secara moral ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + べきではない (kecuali: する → すべきではない)',
  desc: '<b>〜べきではない</b> adalah bentuk negatif dari べきだ — menyatakan bahwa suatu tindakan tidak seharusnya dilakukan berdasarkan penilaian moral atau norma sosial penutur.',
  nuance: 'Berbeda dari てはいけない (larangan yang berasal dari aturan atau instruksi eksternal) — べきではない adalah penilaian normatif internal penutur. "Menurut saya atau menurut norma yang berlaku, ini tidak selayaknya dilakukan." Bernada lebih serius dan formal.',
  examples: [
    { jp: '人の秘密をむやみに話す<b>べきではない</b>。', id: 'Seharusnya tidak sembarangan membocorkan rahasia orang lain.' },
    { jp: '感情的になって判断する<b>べきではない</b>。', id: 'Tidak sepantasnya mengambil keputusan dalam keadaan emosi.' }
  ],
  see_also_grammar: ['gn2-00173'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00173', 'gn2-00176'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00176', level: 'n2', pattern: '〜ものではない',
  reading: '〜mono de wa nai',
  meaning: 'seharusnya tidak ..., tidak sepantasnya dilakukan ..., orang yang baik tidak akan ...',
  cat: 'obligation-necessity',
  connection: 'V-dictionary + ものではない',
  desc: '<b>〜ものではない</b> menyatakan bahwa suatu tindakan tidak pantas atau tidak sepantasnya dilakukan berdasarkan norma sosial atau kebiasaan umum. Bernada menggurui atau mengingatkan.',
  nuance: 'Berbeda dari べきではない (penilaian moral penutur) — ものではない lebih menekankan norma sosial yang sudah berlaku umum: "orang yang tahu sopan santun tidak akan melakukan ini". Sering digunakan oleh orang yang lebih tua untuk menasihati.',
  examples: [
    { jp: '人の悪口を言う<b>ものではない</b>。', id: 'Tidak sepantasnya mengumpat orang lain.' },
    { jp: '食べ物を粗末にする<b>ものではない</b>。', id: 'Tidak seharusnya menyia-nyiakan makanan.' }
  ],
  see_also_grammar: ['gn2-00173', 'gn2-00175'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00174', 'gn2-00175'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00179', level: 'n2', pattern: '〜ずにはいられない',
  reading: '〜zu ni wa irarenai',
  meaning: 'tidak bisa tidak ..., tidak sanggup menahan diri untuk tidak ...',
  cat: 'obligation-necessity',
  connection: 'V-ない-stem + ずにはいられない (kecuali: する → せずにはいられない)',
  desc: '<b>〜ずにはいられない</b> menyatakan bahwa penutur tidak bisa menahan dorongan internal untuk melakukan sesuatu — suatu tindakan yang terjadi karena tidak sanggup menahannya, bukan karena pilihan sadar.',
  nuance: 'Berbeda dari ざるを得ない (terpaksa karena tekanan atau situasi eksternal) — ずにはいられない menekankan dorongan atau perasaan dari dalam diri sendiri yang tidak bisa dilawan. "Tidak bisa menahan diri untuk tidak melakukan X."',
  examples: [
    { jp: 'あの映画を見たら、泣か<b>ずにはいられない</b>。', id: 'Kalau menonton film itu, tidak mungkin bisa menahan tangis.' },
    { jp: '不正を見たら、指摘せ<b>ずにはいられない</b>性格だ。', id: 'Ia memang berkepribadian tidak sanggup diam saat melihat ketidakadilan.' }
  ],
  see_also_grammar: ['gn2-00180'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00180'],
  register: null, exceptions: null,
  notes: 'する → せずにはいられない. Dorongan bersifat internal/psikologis, berbeda dari を余儀なくされる yang bersifat eksternal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00180', level: 'n2', pattern: '〜を余儀なくされる',
  reading: '〜wo yogi naku sareru',
  meaning: 'terpaksa ..., dipaksa oleh keadaan untuk ...',
  cat: 'obligation-necessity',
  connection: 'N + を余儀なくされる / V-plain + ことを余儀なくされる',
  desc: '<b>〜を余儀なくされる</b> menyatakan bahwa seseorang dipaksa oleh situasi, kondisi, atau pihak lain untuk melakukan sesuatu yang tidak diinginkan. Menekankan keterpaksaan yang datang dari luar diri pelaku.',
  nuance: 'Berbeda dari ずにはいられない (dorongan internal yang tak terbendung) dan ざるを得ない (terpaksa dari perspektif penutur aktif) — を余儀なくされる lebih pasif dan formal. Sering muncul dalam berita atau laporan: "X dipaksa untuk melakukan Y oleh keadaan Z."',
  examples: [
    { jp: '台風の影響で、イベントは中止<b>を余儀なくされた</b>。', id: 'Akibat topan, acara tersebut terpaksa harus dibatalkan.' },
    { jp: '業績不振により、会社は大規模なリストラ<b>を余儀なくされた</b>。', id: 'Akibat kinerja yang buruk, perusahaan dipaksa keadaan untuk melakukan PHK besar-besaran.' }
  ],
  see_also_grammar: ['gn2-00179'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00179'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00185', level: 'n2', pattern: '〜ことか',
  reading: '〜koto ka',
  meaning: 'betapa ..., sungguh ... (ekspresi perasaan yang sangat kuat)',
  cat: 'sentence-final-modality',
  connection: 'どんなに / どれほど / 何度 + V-plain + ことか',
  desc: '<b>〜ことか</b> digunakan bersama kata tanya (どんなに, どれほど, 何度) untuk mengungkapkan betapa besar, banyak, atau dalamnya suatu perasaan atau pengalaman. Merupakan ungkapan emosional yang kuat, sering bernada haru atau menyesal.',
  nuance: 'Selalu membutuhkan kata tanya di depannya — tidak bisa berdiri sendiri. Berbeda dari なんて (eksklamasi biasa) — ことか lebih formal dan literer, sering muncul dalam tulisan, pidato, atau ungkapan perasaan yang dalam. Jarang dalam percakapan kasual.',
  examples: [
    { jp: 'あなたに会いたいと、どれほど思った<b>ことか</b>。', id: 'Betapa seringnya aku memikirkan betapa inginnya bertemu denganmu.' },
    { jp: '何度失敗した<b>ことか</b>、それでも諦めなかった。', id: 'Betapa banyak kali ia gagal, namun tetap tidak menyerah.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Wajib didahului kata tanya: どれほど、どんなに、何度 dll. Tidak bisa berdiri sendiri.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00206',
  level: 'n2',
  pattern: '〜と考えられる',
  reading: '~to kangaerareru',
  meaning: 'dapat dipikirkan bahwa ..., tampaknya ...',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + と考えられる',
  desc: '<b>〜と考えられる</b> menyatakan bahwa berdasarkan informasi atau penalaran yang ada, suatu kesimpulan atau penilaian tampaknya masuk akal atau dapat disimpulkan. Pola ini mencerminkan inferensi logis dari pembicara, sering digunakan dalam teks akademis atau laporan ilmiah.',
  nuance: 'Berbeda dengan 〜とされている (konsensus eksternal yang sudah mapan) dan 〜と見られている (perkiraan dari pengamat/media), 〜と考えられる menekankan proses penalaran pembicara sendiri. Dalam tulisan akademis, ini adalah cara standar untuk menyampaikan kesimpulan tanpa terlalu menegaskan kepastian.',
  examples: [
    { jp: 'この現象は気候変動が原因<b>と考えられる</b>。', id: 'Fenomena ini dapat dipikirkan disebabkan oleh perubahan iklim.' },
    { jp: '患者の症状から、ウイルス感染<b>と考えられる</b>。', id: 'Berdasarkan gejala pasien, tampaknya terjadi infeksi virus.' },
    { jp: '需要の増加が価格上昇につながった<b>と考えられる</b>。', id: 'Dapat disimpulkan bahwa peningkatan permintaan menyebabkan kenaikan harga.' },
  ],
  see_also_grammar: ['gn2-00204', 'gn2-00205'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '学術論文・報告書での推論表現として最も一般的。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00232', level: 'n2', pattern: '〜ではあるまいか',
  reading: '〜de wa aru mai ka',
  meaning: 'mungkinkah ... / bukankah ...? (perkiraan retorik yang halus)',
  cat: 'conjecture-possibility',
  connection: 'N / V-plain / Adj-plain + ではあるまいか',
  desc: '<b>〜ではあるまいか</b> digunakan untuk menyampaikan pendapat atau dugaan dengan cara yang halus dan tidak langsung, seperti bertanya kepada diri sendiri. Mengandung nuansa retorik — pembicara sebenarnya sudah cukup yakin dengan pendapatnya.',
  nuance: 'Lebih formal dan tidak langsung dibandingkan だろう atau のではないか. Penggunaan まいか (negatif dari volitional) menciptakan nuansa "bukankah ini..., bisa jadi begini..." yang lebih reflektif dan intelektual. Sering muncul dalam esai, karya sastra, atau wacana analitis.',
  examples: [
    { jp: '問題の根本は、コミュニケーション不足<b>ではあるまいか</b>。', id: 'Mungkinkah akar masalahnya adalah kurangnya komunikasi?' },
    { jp: '彼の行動の裏には深い後悔があるの<b>ではあるまいか</b>。', id: 'Bukankah di balik tindakannya itu ada penyesalan yang mendalam?' },
  ],
  see_also_grammar: ['gn2-00231', 'gn2-00233'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00234', level: 'n2', pattern: '〜ものか',
  reading: '〜mono ka',
  meaning: 'tidak mungkin ... / pasti tidak ... (penolakan kuat dan emosional)',
  cat: 'sentence-final-modality',
  connection: 'V-dict / Adj-plain + ものか',
  desc: '<b>〜ものか</b> menyatakan penolakan, bantahan kuat, atau ketidakmungkinan sesuatu dengan nuansa emosional. Merupakan pernyataan tegas bahwa pembicara tidak akan melakukan atau tidak percaya sesuatu terjadi.',
  nuance: 'Lebih emosional dan kuat dari ないだろう. Bentuk kasual もんか sering dipakai dalam percakapan. Versi lebih halus: ものですか. Berbeda dari わけがない yang lebih logis dan analitis — ものか lebih bersifat emosional dan berbasis tekad atau kemarahan.',
  examples: [
    { jp: 'あんな人に負ける<b>ものか</b>！', id: 'Tidak mungkin aku kalah dari orang seperti itu!' },
    { jp: 'そんな辛い思いを、もう一度する<b>ものか</b>。', id: 'Sudah pasti aku tidak akan mengalami penderitaan seperti itu lagi.' },
  ],
  see_also_grammar: ['gn2-00233', 'gn2-00235'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'Bentuk kasual: もんか. Bentuk halus (feminim): ものですか.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00239', level: 'n2', pattern: '〜ないもの(だろう)か',
  reading: '〜nai mono (darou) ka',
  meaning: 'tidak bisakah ... / mungkinkah tidak ada cara untuk ...? (harapan/keinginan)',
  cat: 'sentence-final-request',
  connection: 'V-nai + もの(だろう)か',
  desc: '<b>〜ないものだろうか</b> mengekspresikan keinginan atau harapan agar sesuatu bisa terwujud, dengan nada bertanya kepada diri sendiri atau lingkungan. Menyiratkan bahwa situasinya sulit tetapi pembicara berharap ada jalan keluar.',
  nuance: 'Berbeda dari てほしい yang langsung meminta kepada seseorang — ないものだろうか lebih bersifat reflektif, merupakan harapan umum bukan permintaan langsung. Sering muncul dalam monolog atau tulisan. Bisa muncul sebagai ないものか (lebih kasual) atau ないものでしょうか (lebih sopan).',
  examples: [
    { jp: 'もっと効率的な方法は<b>ないものだろうか</b>。', id: 'Tidak bisakah ada cara yang lebih efisien dari ini?' },
    { jp: 'この問題を平和的に解決でき<b>ないものか</b>と思う。', id: 'Aku berharap masalah ini bisa diselesaikan secara damai.' },
  ],
  see_also_grammar: ['gn2-00232'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
