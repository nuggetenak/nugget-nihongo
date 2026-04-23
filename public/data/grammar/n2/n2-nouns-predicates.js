// ──────────────────────────────────────────────────────────────
//  n2-nouns-predicates.js — Nugget Nihongo · JLPT N2 Grammar
//  10 entries | Category: nouns-predicates
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Nouns_Predicates = [

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
  id: 'gn2-00246', level: 'n2', pattern: '〜がちだ',
  reading: '〜gachi da',
  meaning: 'cenderung ... / sering ... (biasanya hal negatif)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + がちだ',
  desc: '<b>〜がちだ</b> menyatakan kecenderungan untuk sering melakukan atau mengalami sesuatu, biasanya hal yang kurang diinginkan. Dapat digunakan sebagai predikat (がちだ) maupun sebagai modifier sebelum nomina (がちな).',
  nuance: 'Berbeda dari きらいがある (gn2-00245) yang lebih evaluatif dan formal — がちだ lebih deskriptif dan umum. Biasanya digunakan untuk hal-hal negatif atau yang dianggap tidak ideal. Berbeda dari っぽい (gn2-00247) yang tentang kesan/tampilan daripada kecenderungan perilaku berulang.',
  examples: [
    { jp: '冬は運動不足になり<b>がちだ</b>。', id: 'Di musim dingin orang cenderung kurang bergerak.' },
    { jp: '一人暮らしをすると、食生活が偏り<b>がちだ</b>。', id: 'Saat tinggal sendiri, pola makan cenderung jadi tidak seimbang.' },
  ],
  see_also_grammar: ['gn2-00245', 'gn2-00248'], see_also_vocab: [],
  confusion_pairs: ['gn2-00245', 'gn2-00248'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00247', level: 'n2', pattern: '〜っぽい',
  reading: '〜ppoi',
  meaning: 'terasa seperti ... / agak ... / -ish (berkesan seperti)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N / Adj-stem + っぽい',
  desc: '<b>〜っぽい</b> menyatakan bahwa sesuatu memberikan kesan atau terasa seperti yang disebutkan, meski belum tentu demikian. Bersifat informal dan sering digunakan dalam percakapan sehari-hari.',
  nuance: 'Berbeda dari らしい yang menyatakan "memang seperti seharusnya" — っぽい lebih menyatakan "terasa/tampak seperti, tapi mungkin tidak benar." Biasanya berkonotasi sedikit negatif atau merendahkan (contoh: 子供っぽい = kekanak-kanakan). Berbeda dari がちだ (gn2-00246) yang tentang kecenderungan perilaku berulang, っぽい lebih tentang kesan tampilan atau sifat.',
  examples: [
    { jp: 'この映画、ちょっと古<b>っぽい</b>ね。', id: 'Film ini agak terasa jadul ya.' },
    { jp: '彼女の話し方、子供<b>っぽい</b>と思わない？', id: 'Menurutmu cara ngomong dia kekanak-kanakan tidak?' },
  ],
  see_also_grammar: ['gn2-00248', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: ['gn2-00248'],
  register: null, exceptions: null, notes: 'Ekspresi informal — hindari dalam tulisan atau situasi formal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00248', level: 'n2', pattern: '〜気味だ',
  reading: '〜gimi da',
  meaning: 'agak ... / sedikit ... (kondisi sedikit mengarah ke hal negatif)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + 気味だ',
  desc: '<b>〜気味だ</b> menyatakan bahwa seseorang atau sesuatu berada dalam kondisi yang sedikit mengarah ke hal negatif. Mengandung nuansa bahwa kondisi tersebut belum serius namun mulai terasa.',
  nuance: 'Berbeda dari がちだ (gn2-00246) yang menyatakan kecenderungan berulang — 気味だ lebih menyatakan kondisi sesaat yang sedang dialami. Biasanya digunakan untuk kondisi fisik atau mental. Berbeda dari っぽい (gn2-00247) yang tentang kesan dari luar — 気味だ adalah kondisi yang dialami sendiri.',
  examples: [
    { jp: '最近、疲れ<b>気味だ</b>から、早めに帰ることにした。', id: 'Akhir-akhir ini agak kelelahan, jadi memutuskan untuk pulang lebih awal.' },
    { jp: '風邪<b>気味だ</b>から、今日は無理をしないようにする。', id: 'Agak sedikit flu, jadi hari ini tidak mau memaksakan diri.' },
  ],
  see_also_grammar: ['gn2-00249', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: ['gn2-00249', 'gn2-00246', 'gn2-00247'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00249', level: 'n2', pattern: '〜ぎみ',
  reading: '〜gimi',
  meaning: 'sedikit ... / agak ... (penulisan hiragana dari 気味, lebih kasual)',
  cat: 'predicate-adjective',
  connection: 'V-masu-stem / N + ぎみ',
  desc: '<b>〜ぎみ</b> adalah varian penulisan hiragana dari 〜気味だ (gn2-00248). Memiliki makna yang sama — menyatakan kondisi sedikit mengarah ke hal negatif. Sering dipakai saat digunakan sebagai modifier sebelum nomina atau dalam teks informal.',
  nuance: 'Secara gramatikal dan semantik identik dengan 気味だ — perbedaannya hanya pada ortografi. Penulisan hiragana ぎみ lebih sering muncul dalam pesan teks, chat, atau penulisan kasual. Dalam tulisan formal atau dokumen resmi, lebih diutamakan 気味. Sebagai modifier: 疲れぎみの体 (tubuh yang agak kelelahan).',
  examples: [
    { jp: '今日はちょっと体調が悪<b>ぎみ</b>で…。', id: 'Hari ini kondisi badan agak kurang baik...' },
    { jp: '最近、遅刻<b>ぎみ</b>だから気をつけないと。', id: 'Belakangan ini agak sering terlambat, harus lebih hati-hati.' },
  ],
  see_also_grammar: ['gn2-00248'], see_also_vocab: [],
  confusion_pairs: ['gn2-00248'],
  register: null, exceptions: null, notes: 'Identik dengan 気味だ — perbedaan hanya pada penulisan (kanji vs hiragana).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00250', level: 'n2', pattern: '〜向きだ / 〜向け',
  reading: '〜muki da / 〜muke',
  meaning: 'cocok untuk ... / ditujukan untuk ... / sesuai bagi ...',
  cat: 'predicate-adjective',
  connection: 'N + 向きだ / N + 向け + (N)',
  desc: '<b>〜向きだ</b> menyatakan bahwa sesuatu cocok atau sesuai untuk kondisi/orang tertentu secara alami berdasarkan karakteristiknya. <b>〜向け</b> menyatakan bahwa sesuatu sengaja dibuat atau dirancang untuk kelompok atau tujuan tertentu.',
  nuance: '向きだ vs 向け: 向きだ (cocok secara alami/karakteristik) vs 向け (sengaja dibuat/dirancang untuk). Contoh: この仕事は彼向きだ (pekerjaan ini secara karakter cocok untuknya) vs 子供向けの本 (buku yang memang dibuat untuk anak-anak). Perhatian: 向き juga bermakna "menghadap ke arah tertentu" (東向き = menghadap timur) — beda konteks, beda makna.',
  examples: [
    { jp: 'この映画は子供<b>向け</b>に作られている。', id: 'Film ini dibuat dan ditujukan untuk anak-anak.' },
    { jp: '細かい作業が好きな人<b>向きだ</b>と思います。', id: 'Menurutku ini cocok untuk orang yang suka pekerjaan yang membutuhkan ketelitian.' },
  ],
  see_also_grammar: ['gn2-00245', 'gn2-00246'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: '向き juga bermakna "arah menghadap" (東向き = menghadap timur) dalam konteks berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00303', level: 'n2', pattern: '〜もの(だ)',
  reading: '〜mono (da)',
  meaning: 'hal yang ..., sesuatu yang ... (sifat alami; nominalisasi dengan nuansa kebenaran umum)',
  cat: 'nominalization',
  connection: 'V-plain / Adj-plain + もの(だ)',
  desc: '<b>〜もの(だ)</b> sebagai pola nominalisasi/ekspresi dipakai untuk menyatakan bahwa sesuatu pada dasarnya atau secara alami seperti itu — sering menyatakan kebenaran umum, keniscayaan, atau sifat alamiah dari sesuatu. Juga dipakai untuk menyatakan kenangan atau kebiasaan masa lalu dengan nada nostalgia (〜たものだ = dulu biasanya...).',
  nuance: '〜もの mempunyai beberapa penggunaan yang perlu dibedakan: (1) kebenaran umum/sifat alami: 人間は間違えるものだ (manusia itu pada dasarnya bisa salah); (2) kenangan/nostalgia: 昔はよく遊んだものだ (dulu sering bermain); (3) nominalisasi: 私が欲しいものは自由だ (yang aku inginkan adalah kebebasan). Berbeda dari 〜こと (nominalisasi faktual/netral), 〜もの lebih bermuatan emosional atau menyatakan sifat esensial. Lihat juga 〜ところ (gn2-00304) untuk penggunaan temporal.',
  examples: [
    { jp: '友達というのは困ったときに助けてくれる<b>もの</b>だ。', id: 'Teman itu pada dasarnya adalah orang yang menolong kamu di saat susah — begitulah adanya.' },
    { jp: '子供の頃、よく川で遊んだ<b>もの</b>だ。', id: 'Waktu kecil, dulu sering bermain di sungai.' },
  ],
  see_also_grammar: ['gn2-00304', 'gn2-00306'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00304'],
  register: null, exceptions: null,
  notes: '〜もの (nomina fisik: "benda") vs 〜もの (gramatikal: "hal yang") — dibedakan dari konteks kalimat.',
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
