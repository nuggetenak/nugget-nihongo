// ──────────────────────────────────────────────────────────────
//  n1-particles.js — Nugget Nihongo · JLPT N1 Grammar
//  3 entries | Category: particles
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Particles = [

{
  id: 'gn1-00093', level: 'n1', pattern: '〜において / 〜における',
  reading: '〜ni oite / 〜ni okeru',
  meaning: 'di ..., dalam bidang/konteks/waktu ... (penanda lokasi, bidang, atau situasi formal)',
  cat: 'particle',
  connection: 'N + において / においては / においても / における + N',
  desc: '<b>〜において</b> adalah partikel formal yang menandai lokasi, konteks, bidang, atau waktu di mana suatu peristiwa atau kondisi berlaku. Setara dengan で atau に dalam situasi formal. 〜における digunakan sebagai modifier nomina (adjektivalisasi).',
  nuance: 'Berbeda dari で (kasual, menandai lokasi aksi) dan に (lokasi keberadaan), 〜において hanya digunakan dalam tulisan formal, laporan, hukum, dan presentasi. Jangan digunakan dalam percakapan sehari-hari — terdengar sangat kaku. 〜にあって lebih aktif dan situasional; 〜において lebih statis sebagai penanda konteks.',
  examples: [
    { jp: '現代社会<b>において</b>、デジタルリテラシーは不可欠なスキルとなっている。', id: 'Dalam masyarakat modern, literasi digital telah menjadi keterampilan yang mutlak diperlukan.' },
    { jp: 'この分野<b>における</b>彼の貢献は計り知れない。', id: 'Kontribusinya dalam bidang ini tidak ternilai besarnya.' },
  ],
  see_also_grammar: ['gn1-00092', 'gn1-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00092'],
  register: 'formal', exceptions: null, notes: '日常会話では「で」「に」で代替。〜においては（強調）、〜においても（even in〜）、〜における + N（形容詞的用法）。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00195',
  level: 'n1',
  pattern: '〜において',
  reading: '〜ni oite',
  meaning: 'di ..., dalam ..., dalam konteks ... (formal; adverbial)',
  cat: 'particle',
  connection: 'N + において',
  desc: '<b>〜において</b> adalah partikel majemuk formal yang menyatakan tempat, waktu, atau konteks di mana sesuatu terjadi atau berlaku. Berfungsi sebagai adverbial — menerangkan verba atau predikat kalimat. Sering digunakan untuk menggantikan で atau に dalam konteks formal.',
  nuance: 'Berbeda dari で dan に yang umum, 〜において jauh lebih formal dan sering ditemukan dalam teks ilmiah, hukum, berita, dan wacana formal. Berbeda dari 〜における (gn1-00196) yang berfungsi sebagai prenominal (menerangkan nomina berikutnya), 〜において menerangkan predikat. Pasangan keduanya: における digunakan sebelum nomina, において digunakan sebelum verba/predikat.',
  examples: [
    { jp: '現代社会<b>において</b>、情報リテラシーは必須だ。', id: 'Dalam masyarakat modern, literasi informasi adalah hal yang wajib.' },
    { jp: 'この分野<b>において</b>、彼女は第一人者だ。', id: 'Dalam bidang ini, dia adalah yang terdepan.' },
    { jp: '国際会議<b>において</b>、重要な決定が下された。', id: 'Dalam konferensi internasional itu, keputusan penting telah diambil.' },
  ],
  see_also_grammar: ['gn1-00196', 'gn1-00197'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00196', 'gn1-00197'],
  register: 'formal',
  exceptions: null,
  notes: 'Fungsi adverbial: menerangkan predikat. Untuk fungsi prenominal (menerangkan nomina), gunakan 〜における (gn1-00196).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00196',
  level: 'n1',
  pattern: '〜における',
  reading: '〜ni okeru',
  meaning: 'yang berada di ..., dalam konteks ... (formal; prenominal/atributif)',
  cat: 'particle',
  connection: 'N + における + N',
  desc: '<b>〜における</b> adalah bentuk prenominal (atributif) dari 〜において (gn1-00195). Digunakan untuk menerangkan nomina yang mengikutinya — sama dengan 〜において namun posisinya sebelum nomina, bukan sebelum predikat.',
  nuance: 'Perbedaan utama dengan 〜において (gn1-00195) adalah posisi sintaktis: 〜における selalu diikuti oleh nomina yang dimodifikasinya. Contoh: 「日本における問題」(masalah di Jepang) — di sini における menerangkan 問題. Sementara 「日本において問題が起きた」— において menerangkan predikat 起きた. Keduanya bermakna sama, hanya berbeda fungsi sintaktis.',
  examples: [
    { jp: '日本<b>における</b>少子化は深刻な課題だ。', id: 'Penurunan angka kelahiran di Jepang adalah masalah yang serius.' },
    { jp: 'グローバル化社会<b>における</b>言語教育の重要性が増している。', id: 'Pentingnya pendidikan bahasa dalam masyarakat yang mengglobal semakin meningkat.' },
    { jp: '現代医学<b>における</b>最新の研究成果を紹介する。', id: 'Memperkenalkan hasil penelitian terbaru dalam ilmu kedokteran modern.' },
  ],
  see_also_grammar: ['gn1-00195', 'gn1-00197'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00195'],
  register: 'formal',
  exceptions: null,
  notes: 'Fungsi prenominal: selalu diikuti nomina. Untuk fungsi adverbial (sebelum predikat), gunakan 〜において (gn1-00195).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
