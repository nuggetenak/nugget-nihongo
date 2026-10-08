// ──────────────────────────────────────────────────────────────
//  n2-verb-forms.js — Nugget Nihongo · JLPT N2 Grammar
//  14 entries | Category: verb-forms
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Verb_Forms = [

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
    nuance: null,
    confusion_pairs: ['gn1-00158', 'gn1-00168'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

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
    nuance: null,
    confusion_pairs: ['gn3-00122', 'gn3-00124', 'gn5-00064', 'gn5-00053', 'gn4-00040', 'gn4-00041'],
    see_also_grammar: ['gn2-00022'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00066', level: 'n2', pattern: '〜ことにしている', reading: '〜koto ni shite iru',
  meaning: 'saya membiasakan diri untuk ... / saya selalu ...',
  cat: 'volitional-intention',
  connection: 'V-dict / V-nai + ことにしている',
  desc: '<b>〜ことにしている</b> menyatakan kebiasaan atau kebijakan pribadi yang dibuat sendiri oleh pembicara secara sadar dan konsisten dijalankan.',
  nuance: null,
  examples: [
    { jp: '健康のために、毎朝30分歩く<b>ことにしている</b>。', id: 'Demi kesehatan, saya selalu berjalan kaki 30 menit setiap pagi.' },
    { jp: '寝る前にスマホを見ない<b>ことにしている</b>。', id: 'Saya membiasakan diri tidak melihat HP sebelum tidur.' },
    { jp: '食事は腹八分目に抑える<b>ことにしている</b>。', id: 'Saya selalu membatasi makan sampai sekitar 80% kenyang.' }
  ],
  see_also_grammar: ['gn2-00065'], see_also_vocab: [],
  confusion_pairs: ['gn2-00022', 'gn3-00082', 'gn3-00121', 'gn3-00073', 'gn3-00123', 'gn2-00065'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00159', level: 'n2', pattern: '〜得る / 〜得ない',
  reading: '〜uri / 〜enai (atau: 〜eru / 〜enai)',
  meaning: '〜得る: bisa terjadi, ada kemungkinan | 〜得ない: tidak mungkin terjadi, mustahil',
  cat: 'potential',
  connection: 'V-stem + 得る (うる/える) / V-stem + 得ない (えない)',
  desc: '<b>〜得る</b> menyatakan kemungkinan bahwa sesuatu bisa terjadi atau bisa dilakukan dalam prinsipnya. Bentuk negatifnya <b>〜得ない</b> menyatakan kemustahilan yang mendasar. Sering digunakan dalam konteks formal dan akademik.',
  nuance: null,
  examples: [
    { jp: 'そのような事態は十分に起こり<b>得る</b>。', id: 'Situasi seperti itu sangat mungkin terjadi.' },
    { jp: '一人の人間があらゆることを知ることは<b>あり得ない</b>。', id: 'Tidak mungkin seorang manusia mengetahui segalanya.' }
  ],
  see_also_grammar: ['gn2-00160'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn3-00179'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00231', level: 'n2', pattern: '〜まい',
  reading: '〜mai',
  meaning: 'tidak akan ... / tidak berniat ... (negatif volitional)',
  cat: 'volitional-intention',
  connection: 'V-dict (Gr.1&2) + まい / V-masu-stem (Gr.2, opsional) + まい',
  desc: '<b>〜まい</b> adalah bentuk negatif dari volitional — menyatakan tekad atau niat untuk tidak melakukan sesuatu, atau perkiraan bahwa sesuatu tidak akan terjadi. Merupakan ekspresi formal atau bernuansa sastra.',
  nuance: null,
  examples: [
    { jp: 'あんな失敗は二度とする<b>まい</b>と心に誓った。', id: 'Aku berjanji dalam hati untuk tidak mengulangi kesalahan seperti itu lagi.' },
    { jp: '彼はもう来る<b>まい</b>と思っていた。', id: 'Dia pikir dia tidak akan datang lagi.' },
  ],
  see_also_grammar: ['gn2-00230', 'gn2-00232'], see_also_vocab: [],
  confusion_pairs: ['gn2-00186'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00282', level: 'n2', pattern: '〜きれない',
  reading: '〜kirenai',
  meaning: 'tidak bisa menyelesaikan semua ..., terlalu banyak untuk ...',
  cat: 'potential',
  connection: 'V-masu-stem + きれない',
  desc: '<b>〜きれない</b> adalah bentuk negatif potensial dari 〜きる, menyatakan bahwa seseorang tidak mampu menyelesaikan atau menghabiskan sesuatu secara penuh — karena terlalu banyak, terlalu berat, atau melampaui kemampuan. Bentuk ini sangat umum dan ekspresif dalam percakapan sehari-hari.',
  nuance: null,
  examples: [
    { jp: 'こんなにたくさんの料理、とても食べ<b>きれない</b>。', id: 'Makanan sebanyak ini sungguh tidak bisa aku habiskan semuanya.' },
    { jp: '彼女への気持ちがまだ忘れ<b>きれない</b>。', id: 'Perasaanku padanya masih belum bisa benar-benar kulupakan.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00283'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00283'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00283', level: 'n2', pattern: '〜きれる',
  reading: '〜kireru',
  meaning: 'bisa menyelesaikan ..., mampu sampai tuntas',
  cat: 'potential',
  connection: 'V-masu-stem + きれる',
  desc: '<b>〜きれる</b> adalah bentuk potensial dari 〜きる, menyatakan bahwa seseorang mampu menyelesaikan atau menghabiskan sesuatu secara penuh dan tuntas. Sering dipakai dalam konteks pertanyaan atau pernyataan tentang kemampuan menyelesaikan sesuatu yang tampaknya banyak atau sulit.',
  nuance: null,
  examples: [
    { jp: 'このケーキ、全部食べ<b>きれる</b>かな？量が多いけど。', id: 'Kue ini bisa dihabiskan semuanya tidak ya? Porsinya banyak soalnya.' },
    { jp: '一日でこの仕事を片付け<b>きれる</b>と思う。', id: 'Aku rasa bisa membereskan semua pekerjaan ini dalam satu hari.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00282'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00282'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00289', level: 'n2', pattern: '〜こなす',
  reading: '〜konasu',
  meaning: 'berhasil menangani, menguasai (dengan terampil)',
  cat: 'verb-form',
  connection: 'V-masu-stem + こなす',
  desc: '<b>〜こなす</b> menyatakan bahwa seseorang berhasil menangani atau menguasai sesuatu yang sulit atau kompleks dengan terampil. Tidak hanya selesai, tapi selesai dengan baik dan kompeten. Dipakai untuk menggambarkan keterampilan dalam menggunakan alat, bahasa, atau menyelesaikan tugas-tugas yang menantang.',
  nuance: null,
  examples: [
    { jp: '新しいソフトをやっと使い<b>こなせる</b>ようになった。', id: 'Akhirnya aku bisa menggunakan software baru itu dengan mahir.' },
    { jp: '彼はどんな仕事でも上手にこ<b>なす</b>。', id: 'Dia bisa menangani pekerjaan apapun dengan terampil.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00287'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00287'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00290', level: 'n2', pattern: '〜こむ',
  reading: '〜komu',
  meaning: 'masuk ke dalam, melakukan secara intensif/mendalam',
  cat: 'verb-form',
  connection: 'V-masu-stem + こむ',
  desc: '<b>〜こむ</b> sebagai sufiks verba majemuk mengandung dua makna utama: (1) masuk ke dalam suatu ruang atau kondisi secara fisik (押し込む, 飛び込む); dan (2) melakukan sesuatu secara intensif, mendalam, atau hingga terbenam — termasuk keyakinan atau pemikiran yang tertanam kuat (思い込む, 信じ込む). Sufiks ini sangat produktif dalam bahasa Jepang.',
  nuance: null,
  examples: [
    { jp: '彼は自分が絶対に正しいと思い<b>こんでいる</b>。', id: 'Dia sudah terlanjur yakin sekali bahwa dirinya pasti benar.' },
    { jp: 'ノートにポイントをしっかり書き<b>こんで</b>おいた。', id: 'Aku sudah menuliskan poin-poin penting secara lengkap di buku catatan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00295', level: 'n2', pattern: '〜かえる',
  reading: '〜kaeru',
  meaning: 'melakukan balik/kembali, mengubah dengan cara yang berbeda',
  cat: 'verb-form',
  connection: 'V-masu-stem + かえる',
  desc: '<b>〜かえる</b> sebagai sufiks verba majemuk menyatakan bahwa suatu tindakan dilakukan kembali dengan cara yang berbeda atau berlawanan, atau mengubah sesuatu melalui tindakan yang diulang. Contoh: 言いかえる (mengatakan ulang dengan kata lain/mengoreksi ucapan), 考えかえす (memikirkan kembali).',
  nuance: null,
  examples: [
    { jp: '難しい専門用語を分かりやすく言い<b>かえた</b>。', id: 'Istilah teknis yang sulit diubah menjadi ungkapan yang lebih mudah dipahami.' },
    { jp: '一度決めたことを急に言い<b>かえる</b>のは信頼を損なう。', id: 'Tiba-tiba mengubah apa yang sudah diputuskan dapat merusak kepercayaan.' },
  ],
  see_also_grammar: ['gn2-00296', 'gn2-00300'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00296', 'gn2-00300', 'gn2-00301'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00296', level: 'n2', pattern: '〜なおす',
  reading: '〜naosu',
  meaning: 'melakukan ulang, memperbaiki dengan melakukan lagi',
  cat: 'verb-form',
  connection: 'V-masu-stem + なおす',
  desc: '<b>〜なおす</b> menyatakan bahwa suatu tindakan dilakukan ulang untuk memperbaiki kesalahan atau hasil yang tidak memuaskan sebelumnya. Nuansanya adalah "melakukan lagi karena yang pertama salah atau kurang baik." Sangat produktif dan umum dipakai dalam situasi pekerjaan, tulisan, dan koreksi.',
  nuance: null,
  examples: [
    { jp: '間違えた箇所を全部書き<b>なおした</b>。', id: 'Aku menulis ulang semua bagian yang salah.' },
    { jp: 'このコードにバグがあるので書き<b>なおす</b>必要がある。', id: 'Kode ini ada bug-nya, jadi perlu ditulis ulang.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00300', level: 'n2', pattern: '〜もどる / 〜にもどる',
  reading: '〜modoru / 〜ni modoru',
  meaning: 'kembali ke keadaan semula, kembali lagi ke ...',
  cat: 'verb-form',
  connection: 'V-masu-stem + もどる / N + にもどる',
  desc: '<b>〜もどる</b> sebagai sufiks verba majemuk atau pola gramatikal menyatakan kembali ke kondisi, tempat, atau keadaan sebelumnya. Dipakai baik sebagai sufiks (引きもどる = kembali mundur) maupun sebagai pola 〜にもどる (kembali ke N — kondisi/topik/tempat).',
  nuance: null,
  examples: [
    { jp: '本題に<b>もどり</b>ましょう。', id: 'Mari kembali ke topik utama.' },
    { jp: '元の状態に<b>もどる</b>のに1週間かかった。', id: 'Butuh waktu satu minggu untuk kembali ke kondisi semula.' },
  ],
  see_also_grammar: ['gn2-00295', 'gn2-00296'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00301', level: 'n2', pattern: '〜かわる / 代わる代わる',
  reading: '〜kawaru / かわるがわる',
  meaning: 'bergantian melakukan, berubah (sebagai verba majemuk)',
  cat: 'verb-form',
  connection: 'V-masu-stem + かわる / 代わる代わる (idiom adverbia)',
  desc: '<b>〜かわる</b> sebagai sufiks verba majemuk menyatakan adanya perubahan atau pergantian dalam konteks tindakan yang dilakukan. Contoh: 入れかわる (silih berganti/bertukar posisi), 移りかわる (berubah seiring waktu). Bentuk idiomatis <b>代わる代わる (かわるがわる)</b> berarti "bergantian satu per satu" dan dipakai sebagai adverbia.',
  nuance: null,
  examples: [
    { jp: 'リーダーが次々と入れ<b>かわって</b>、組織が混乱した。', id: 'Pemimpin silih berganti, sehingga organisasi menjadi kacau.' },
    { jp: '子供たちが<b>代わる代わる</b>（かわるがわる）ゲームをした。', id: 'Para anak-anak bermain game secara bergantian.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00302', level: 'n2', pattern: '〜あう',
  reading: '〜au',
  meaning: 'saling melakukan, melakukan bersama-sama (resiprok)',
  cat: 'verb-form',
  connection: 'V-masu-stem + あう',
  desc: '<b>〜あう</b> menyatakan bahwa suatu tindakan dilakukan secara timbal balik antara dua pihak atau lebih — artinya, kedua pihak melakukan tindakan yang sama terhadap satu sama lain. Ini adalah sufiks resiprok dalam bahasa Jepang. Contoh: 助けあう (saling membantu), 愛しあう (saling mencintai), 話しあう (saling berbicara/berdiskusi).',
  nuance: null,
  examples: [
    { jp: '困ったときは助け<b>あう</b>のが大切だ。', id: 'Di saat susah, saling membantu itu hal yang penting.' },
    { jp: '二人は長時間話し<b>あった</b>結果、和解できた。', id: 'Setelah berbicara panjang lebar satu sama lain, keduanya berhasil berdamai.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
