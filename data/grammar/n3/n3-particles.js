// ──────────────────────────────────────────────────────────────
//  n3-particles.js — Nugget Nihongo · JLPT N3 Grammar
//  2 entries | Category: particles
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN3_Particles = [

{
  id: 'gn3-00141',
  level: 'n3',
  pattern: '〜を通して',
  reading: '~wo tooshite',
  meaning: 'melalui ..., lewat ... (proses panjang)',
  cat: 'particle',
  connection: 'N + を通して / を通じて',
  desc: '<b>〜を通して</b> menyatakan bahwa sesuatu terjadi atau tercapai melalui suatu media, perantara, atau proses tertentu. Bisa juga berarti "sepanjang" dalam konteks waktu (例: 一年を通して = sepanjang tahun). Bentuk 〜を通じて memiliki makna yang hampir sama dan sering dapat dipertukarkan.',
  nuance: null,
  examples: [
    { jp: '読書<b>を通して</b>、多くのことを学んだ。', id: 'Melalui membaca, saya belajar banyak hal.' },
    { jp: '交流プログラム<b>を通して</b>、友達ができた。', id: 'Melalui program pertukaran, saya mendapat teman.' },
    { jp: '一年<b>を通して</b>、この地域は温暖な気候だ。', id: 'Sepanjang tahun, daerah ini beriklim hangat.' },
  ],
  see_also_grammar: ['gn3-00142'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00138'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn3-00144',
  level: 'n3',
  pattern: '〜として',
  reading: '~to shite',
  meaning: 'sebagai ..., dalam kapasitas sebagai ...',
  cat: 'particle',
  connection: 'N + として',
  desc: '<b>〜として</b> menyatakan posisi, peran, kapasitas, atau status seseorang atau sesuatu. Dapat juga berarti "sebagai" dalam konteks menganggap sesuatu dengan cara tertentu. Pola ini sangat serbaguna dan umum digunakan dalam konteks formal maupun informal.',
  nuance: null,
  examples: [
    { jp: '彼は医者<b>として</b>、多くの患者を救った。', id: 'Sebagai dokter, dia menyelamatkan banyak pasien.' },
    { jp: 'これは問題<b>として</b>取り上げるべきだ。', id: 'Ini harus diangkat sebagai suatu masalah.' },
    { jp: '留学生<b>として</b>、日本の文化を学んでいる。', id: 'Sebagai mahasiswa pertukaran, saya sedang mempelajari budaya Jepang.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn3-00050', 'gn2-00025', 'gn2-00044', 'gn2-00218', 'gn1-00116', 'gn1-00117', 'gn1-00140', 'gn1-00145'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
