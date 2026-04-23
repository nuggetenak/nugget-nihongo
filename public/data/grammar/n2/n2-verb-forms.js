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
    see_also_grammar: ['gn2-00022'], see_also_vocab: [], register: null, exceptions: null, notes: null,
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
  id: 'gn2-00159', level: 'n2', pattern: '〜得る / 〜得ない',
  reading: '〜uri / 〜enai (atau: 〜eru / 〜enai)',
  meaning: '〜得る: bisa terjadi, ada kemungkinan | 〜得ない: tidak mungkin terjadi, mustahil',
  cat: 'potential',
  connection: 'V-stem + 得る (うる/える) / V-stem + 得ない (えない)',
  desc: '<b>〜得る</b> menyatakan kemungkinan bahwa sesuatu bisa terjadi atau bisa dilakukan dalam prinsipnya. Bentuk negatifnya <b>〜得ない</b> menyatakan kemustahilan yang mendasar. Sering digunakan dalam konteks formal dan akademik.',
  nuance: 'Berbeda dari できる (bisa secara kemampuan fisik/praktis) — 得る menyatakan kemungkinan logis atau teoritis, bukan kemampuan konkret. 得る dibaca うる dalam bentuk formal/tertulis dan える dalam percakapan. 得ない selalu dibaca えない.',
  examples: [
    { jp: 'そのような事態は十分に起こり<b>得る</b>。', id: 'Situasi seperti itu sangat mungkin terjadi.' },
    { jp: '一人の人間があらゆることを知ることは<b>あり得ない</b>。', id: 'Tidak mungkin seorang manusia mengetahui segalanya.' }
  ],
  see_also_grammar: ['gn2-00160'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '得る dibaca うる (formal/tulisan) atau える (bicara). 得ない selalu えない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00231', level: 'n2', pattern: '〜まい',
  reading: '〜mai',
  meaning: 'tidak akan ... / tidak berniat ... (negatif volitional)',
  cat: 'volitional-intention',
  connection: 'V-dict (Gr.1&2) + まい / V-masu-stem (Gr.2, opsional) + まい',
  desc: '<b>〜まい</b> adalah bentuk negatif dari volitional — menyatakan tekad atau niat untuk tidak melakukan sesuatu, atau perkiraan bahwa sesuatu tidak akan terjadi. Merupakan ekspresi formal atau bernuansa sastra.',
  nuance: 'Berbeda dari ないだろう yang hanya merupakan perkiraan — まい mengandung nuansa tekad atau kesadaran kuat dari pembicara. Untuk kata kerja ichidan (Gr.2), bisa pakai bentuk dict + まい atau masu-stem + まい (食べるまい atau 食べまい). Untuk する bisa jadi すまい atau しまい. Jarang dipakai dalam percakapan biasa — lebih sering dalam tulisan atau pidato.',
  examples: [
    { jp: 'あんな失敗は二度とする<b>まい</b>と心に誓った。', id: 'Aku berjanji dalam hati untuk tidak mengulangi kesalahan seperti itu lagi.' },
    { jp: '彼はもう来る<b>まい</b>と思っていた。', id: 'Dia pikir dia tidak akan datang lagi.' },
  ],
  see_also_grammar: ['gn2-00230', 'gn2-00232'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'する → すまい / しまい; くる → くるまい / こまい', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00282', level: 'n2', pattern: '〜きれない',
  reading: '〜kirenai',
  meaning: 'tidak bisa menyelesaikan semua ..., terlalu banyak untuk ...',
  cat: 'potential',
  connection: 'V-masu-stem + きれない',
  desc: '<b>〜きれない</b> adalah bentuk negatif potensial dari 〜きる, menyatakan bahwa seseorang tidak mampu menyelesaikan atau menghabiskan sesuatu secara penuh — karena terlalu banyak, terlalu berat, atau melampaui kemampuan. Bentuk ini sangat umum dan ekspresif dalam percakapan sehari-hari.',
  nuance: '〜きれない berbeda dari ただ「できない」(tidak bisa) karena menekankan bahwa ketidakmampuan disebabkan oleh kelebihan kapasitas atau beban berlebih, bukan sekadar kurang kemampuan. Contoh: 食べられない = tidak bisa makan (karena alergi dsb.); 食べきれない = tidak bisa menghabiskan (karena terlalu banyak). Juga dipakai dalam konteks emosional: 忘れきれない (tidak bisa benar-benar melupakan).',
  examples: [
    { jp: 'こんなにたくさんの料理、とても食べ<b>きれない</b>。', id: 'Makanan sebanyak ini sungguh tidak bisa aku habiskan semuanya.' },
    { jp: '彼女への気持ちがまだ忘れ<b>きれない</b>。', id: 'Perasaanku padanya masih belum bisa benar-benar kulupakan.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00283'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00283'],
  register: null, exceptions: null,
  notes: 'Bentuk negatif potensial dari きる. Versi afirmatif: gn2-00283 〜きれる.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00283', level: 'n2', pattern: '〜きれる',
  reading: '〜kireru',
  meaning: 'bisa menyelesaikan ..., mampu sampai tuntas',
  cat: 'potential',
  connection: 'V-masu-stem + きれる',
  desc: '<b>〜きれる</b> adalah bentuk potensial dari 〜きる, menyatakan bahwa seseorang mampu menyelesaikan atau menghabiskan sesuatu secara penuh dan tuntas. Sering dipakai dalam konteks pertanyaan atau pernyataan tentang kemampuan menyelesaikan sesuatu yang tampaknya banyak atau sulit.',
  nuance: '〜きれる adalah pasangan potensial afirmatif dari 〜きれない (gn2-00282). Dalam percakapan, 〜きれる sering dipakai dengan nada ragu-ragu (kira-kira, mungkin bisa?) atau untuk menyatakan bahwa ya, semuanya bisa diselesaikan. Perbedaan dengan 〜できる: きれる menekankan "menghabiskan/menuntaskan semuanya," sementara できる hanya menyatakan kemampuan umum.',
  examples: [
    { jp: 'このケーキ、全部食べ<b>きれる</b>かな？量が多いけど。', id: 'Kue ini bisa dihabiskan semuanya tidak ya? Porsinya banyak soalnya.' },
    { jp: '一日でこの仕事を片付け<b>きれる</b>と思う。', id: 'Aku rasa bisa membereskan semua pekerjaan ini dalam satu hari.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00282'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00281', 'gn2-00282'],
  register: null, exceptions: null,
  notes: 'Bentuk potensial afirmatif dari きる. Versi negatif: gn2-00282 〜きれない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00289', level: 'n2', pattern: '〜こなす',
  reading: '〜konasu',
  meaning: 'berhasil menangani, menguasai (dengan terampil)',
  cat: 'verb-form',
  connection: 'V-masu-stem + こなす',
  desc: '<b>〜こなす</b> menyatakan bahwa seseorang berhasil menangani atau menguasai sesuatu yang sulit atau kompleks dengan terampil. Tidak hanya selesai, tapi selesai dengan baik dan kompeten. Dipakai untuk menggambarkan keterampilan dalam menggunakan alat, bahasa, atau menyelesaikan tugas-tugas yang menantang.',
  nuance: '〜こなす berbeda dari 〜きる (gn2-00281) (tuntas/habis) dan 〜あげる (gn2-00287) (selesai membuat): こなす menekankan kualitas penanganan dan keahlian, bukan sekadar kuantitas atau penyelesaian. 使いこなす = menggunakan dengan mahir (bukan sekadar menghabiskan). Pola ini cenderung memuji kemampuan seseorang dalam menaklukkan sesuatu yang sulit.',
  examples: [
    { jp: '新しいソフトをやっと使い<b>こなせる</b>ようになった。', id: 'Akhirnya aku bisa menggunakan software baru itu dengan mahir.' },
    { jp: '彼はどんな仕事でも上手にこ<b>なす</b>。', id: 'Dia bisa menangani pekerjaan apapun dengan terampil.' },
  ],
  see_also_grammar: ['gn2-00281', 'gn2-00287'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '使いこなす (mahir menggunakan), 乗りこなす (mahir mengendarai) — semua berkonotasi kemampuan tinggi, bukan sekadar kuantitas.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00290', level: 'n2', pattern: '〜こむ',
  reading: '〜komu',
  meaning: 'masuk ke dalam, melakukan secara intensif/mendalam',
  cat: 'verb-form',
  connection: 'V-masu-stem + こむ',
  desc: '<b>〜こむ</b> sebagai sufiks verba majemuk mengandung dua makna utama: (1) masuk ke dalam suatu ruang atau kondisi secara fisik (押し込む, 飛び込む); dan (2) melakukan sesuatu secara intensif, mendalam, atau hingga terbenam — termasuk keyakinan atau pemikiran yang tertanam kuat (思い込む, 信じ込む). Sufiks ini sangat produktif dalam bahasa Jepang.',
  nuance: '〜こむ memiliki berbagai penggunaan yang luas. Tiga makna utama: (1) fisik — memasukkan ke dalam: 押し込む (mendorong masuk), 詰め込む (memasukkan penuh-penuh); (2) kognitif/emosional — terlanjur percaya atau terbenam: 思い込む (sudah terlanjur yakin), 信じ込む (percaya sungguh-sungguh); (3) intensitas — melakukan secara penuh/banyak: 書き込む (menulis lengkap di dalamnya). Konteks menentukan makna mana yang berlaku.',
  examples: [
    { jp: '彼は自分が絶対に正しいと思い<b>こんでいる</b>。', id: 'Dia sudah terlanjur yakin sekali bahwa dirinya pasti benar.' },
    { jp: 'ノートにポイントをしっかり書き<b>こんで</b>おいた。', id: 'Aku sudah menuliskan poin-poin penting secara lengkap di buku catatan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Verba umum dengan こむ: 思い込む, 押し込む, 書き込む, 詰め込む, 飛び込む — masing-masing dengan nuansa yang berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00295', level: 'n2', pattern: '〜かえる',
  reading: '〜kaeru',
  meaning: 'melakukan balik/kembali, mengubah dengan cara yang berbeda',
  cat: 'verb-form',
  connection: 'V-masu-stem + かえる',
  desc: '<b>〜かえる</b> sebagai sufiks verba majemuk menyatakan bahwa suatu tindakan dilakukan kembali dengan cara yang berbeda atau berlawanan, atau mengubah sesuatu melalui tindakan yang diulang. Contoh: 言いかえる (mengatakan ulang dengan kata lain/mengoreksi ucapan), 考えかえす (memikirkan kembali).',
  nuance: '〜かえる vs 〜なおす (gn2-00296): Keduanya menyatakan "melakukan ulang," tetapi berbeda nuansa. かえる = mengubah isi/cara dari sesuatu yang sudah dilakukan (sering dengan koreksi atau pembalikan arah); なおす = memperbaiki yang salah dengan mengulang karena ada kesalahan yang jelas. 言いかえる = mengatakan ulang dengan kata lain (tidak selalu karena salah); 言いなおす = mengatakan ulang karena salah/tidak jelas.',
  examples: [
    { jp: '難しい専門用語を分かりやすく言い<b>かえた</b>。', id: 'Istilah teknis yang sulit diubah menjadi ungkapan yang lebih mudah dipahami.' },
    { jp: '一度決めたことを急に言い<b>かえる</b>のは信頼を損なう。', id: 'Tiba-tiba mengubah apa yang sudah diputuskan dapat merusak kepercayaan.' },
  ],
  see_also_grammar: ['gn2-00296', 'gn2-00300'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00296', 'gn2-00301'],
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
  nuance: '〜なおす vs 〜かえる (gn2-00295): なおす = melakukan ulang karena ada kesalahan yang harus diperbaiki (motivasi perbaikan yang jelas); かえる = mengubah atau melakukan kembali, tidak selalu karena kesalahan — bisa karena perubahan keputusan atau cara penyampaian. 書きなおす = menulis ulang karena ada yang salah; 書きかえる = menulis ulang dengan konten atau cara yang berbeda.',
  examples: [
    { jp: '間違えた箇所を全部書き<b>なおした</b>。', id: 'Aku menulis ulang semua bagian yang salah.' },
    { jp: 'このコードにバグがあるので書き<b>なおす</b>必要がある。', id: 'Kode ini ada bug-nya, jadi perlu ditulis ulang.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: 'Verba umum: 書きなおす, 作りなおす, やりなおす, 読みなおす.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00300', level: 'n2', pattern: '〜もどる / 〜にもどる',
  reading: '〜modoru / 〜ni modoru',
  meaning: 'kembali ke keadaan semula, kembali lagi ke ...',
  cat: 'verb-form',
  connection: 'V-masu-stem + もどる / N + にもどる',
  desc: '<b>〜もどる</b> sebagai sufiks verba majemuk atau pola gramatikal menyatakan kembali ke kondisi, tempat, atau keadaan sebelumnya. Dipakai baik sebagai sufiks (引きもどる = kembali mundur) maupun sebagai pola 〜にもどる (kembali ke N — kondisi/topik/tempat).',
  nuance: '〜もどる vs 〜かえる (gn2-00295): もどる = kembali ke titik/kondisi asal (reversi, memulihkan ke keadaan semula); かえる = mengubah dengan cara yang berbeda (transformasi). Contoh: 元にもどる (kembali ke kondisi semula — reversi); 言いかえる (mengatakan dengan cara berbeda — perubahan). Dalam percakapan, にもどる sering dipakai saat topik diskusi kembali ke pokok bahasan.',
  examples: [
    { jp: '本題に<b>もどり</b>ましょう。', id: 'Mari kembali ke topik utama.' },
    { jp: '元の状態に<b>もどる</b>のに1週間かかった。', id: 'Butuh waktu satu minggu untuk kembali ke kondisi semula.' },
  ],
  see_also_grammar: ['gn2-00295', 'gn2-00296'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: '引きもどす (menarik kembali — transitif) vs 引きもどる (kembali — intransitif).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00301', level: 'n2', pattern: '〜かわる / 代わる代わる',
  reading: '〜kawaru / かわるがわる',
  meaning: 'bergantian melakukan, berubah (sebagai verba majemuk)',
  cat: 'verb-form',
  connection: 'V-masu-stem + かわる / 代わる代わる (idiom adverbia)',
  desc: '<b>〜かわる</b> sebagai sufiks verba majemuk menyatakan adanya perubahan atau pergantian dalam konteks tindakan yang dilakukan. Contoh: 入れかわる (silih berganti/bertukar posisi), 移りかわる (berubah seiring waktu). Bentuk idiomatis <b>代わる代わる (かわるがわる)</b> berarti "bergantian satu per satu" dan dipakai sebagai adverbia.',
  nuance: '〜かわる berbeda dari 〜かえる (gn2-00295): かわる adalah verba intransitif (sesuatu berubah atau terjadi pergantian dengan sendirinya), sedangkan かえる adalah transitif (seseorang mengubah sesuatu). 入れかわる (mereka bertukar tempat — intransitif) vs 入れかえる (aku menukar mereka — transitif). 代わる代わる/かわるがわる dipakai sebagai adverbia: 代わる代わる当番をする (melakukan piket secara bergantian).',
  examples: [
    { jp: 'リーダーが次々と入れ<b>かわって</b>、組織が混乱した。', id: 'Pemimpin silih berganti, sehingga organisasi menjadi kacau.' },
    { jp: '子供たちが<b>代わる代わる</b>（かわるがわる）ゲームをした。', id: 'Para anak-anak bermain game secara bergantian.' },
  ],
  see_also_grammar: ['gn2-00295'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00295'],
  register: null, exceptions: null,
  notes: '入れかわる (intransitif) vs 入れかえる (transitif) — pasangan intransitif-transitif penting.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00302', level: 'n2', pattern: '〜あう',
  reading: '〜au',
  meaning: 'saling melakukan, melakukan bersama-sama (resiprok)',
  cat: 'verb-form',
  connection: 'V-masu-stem + あう',
  desc: '<b>〜あう</b> menyatakan bahwa suatu tindakan dilakukan secara timbal balik antara dua pihak atau lebih — artinya, kedua pihak melakukan tindakan yang sama terhadap satu sama lain. Ini adalah sufiks resiprok dalam bahasa Jepang. Contoh: 助けあう (saling membantu), 愛しあう (saling mencintai), 話しあう (saling berbicara/berdiskusi).',
  nuance: '〜あう menyatakan resiprositas wajib — kedua pihak terlibat aktif. Berbeda dari ずつ atau お互いに yang hanya adverbia, 〜あう mengubah verba secara gramatikal menjadi "saling V." Perhatikan bahwa beberapa ungkapan dengan あう sudah terleksikalisasi dan maknanya tidak lagi terasa "saling": 間に合う (tepat waktu), 付き合う (bergaul). Dalam percakapan, 〜あう sering dikombinasikan dengan お互いに untuk memperkuat makna.',
  examples: [
    { jp: '困ったときは助け<b>あう</b>のが大切だ。', id: 'Di saat susah, saling membantu itu hal yang penting.' },
    { jp: '二人は長時間話し<b>あった</b>結果、和解できた。', id: 'Setelah berbicara panjang lebar satu sama lain, keduanya berhasil berdamai.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null,
  notes: 'Verba umum: 助けあう, 話しあう, 愛しあう, 競いあう, 支えあう.',
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
