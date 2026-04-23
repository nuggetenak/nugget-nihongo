// ──────────────────────────────────────────────────────────────
//  n4-conditionals.js — Nugget Nihongo · JLPT N4 Grammar
//  3 entries | Category: conditionals
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN4_Conditionals = [

{
    id         : 'gn4-00016',
    level      : 'n4',
    pattern    : '〜場合は / 〜場合に (ばあい)',
    reading    : '〜baai wa / ni',
    meaning    : 'dalam hal ... / jika terjadi ...',
    cat        : 'conditional-tara',
    connection : 'N + の + 場合は / Vる/Vた + 場合は',
    desc       : '<b>〜場合は</b> digunakan untuk menyatakan kondisi yang lebih hipotetis atau formal: "dalam hal ini", "jika kasusnya demikian".',
    nuance     : 'Lebih formal dari たら atau と. Sering dalam aturan, panduan, atau situasi resmi.',
    examples   : [
      { jp: '緊急の<b>場合は</b>、このボタンを押してください。', id: 'Dalam keadaan darurat, tekan tombol ini.' },
      { jp: '遅刻する<b>場合は</b>、必ず連絡してください。', id: 'Jika terlambat, pastikan untuk memberi kabar.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : 'formal',
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00035',
    level      : 'n4',
    pattern    : '〜なら',
    reading    : '〜nara',
    meaning    : 'kalau memang ... / jika kasusnya ...',
    cat        : 'conditional-tara',
    connection : 'V/Adj plain / N + なら',
    desc       : '<b>〜なら</b> digunakan ketika kondisinya berdasarkan asumsi, informasi yang diterima dari pendengar, atau situasi yang sudah diketahui. Tidak untuk kejadian yang sudah pasti terjadi.',
    nuance     : 'Berbeda dari たら/と/ば: なら sering merespons apa yang baru dikatakan lawan bicara.',
    examples   : [
      { jp: '東京へ行く<b>なら</b>、ここに寄ってみてください。', id: 'Kalau memang pergi ke Tokyo, coba mampir ke sini.' },
      { jp: '本当に困っている<b>なら</b>、助けますよ。', id: 'Kalau memang benar-benar kesulitan, saya bantu.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00036',
    level      : 'n4',
    pattern    : '〜さえ〜ば',
    reading    : '〜sae〜ba',
    meaning    : 'asalkan ... / asal saja ...',
    cat        : 'conditional-tara',
    connection : 'N + さえ + Adj-ければ / Vさえ + すれば',
    desc       : '<b>〜さえ〜ば</b> menyatakan satu-satunya kondisi yang perlu dipenuhi untuk suatu hasil: "asal...", "asalkan...".',
    nuance     : null,
    examples   : [
      { jp: 'お金さえあれば、何でも買えます。', id: 'Asalkan ada uang, bisa beli apa saja.' },
      { jp: '健康でさえあれば、それで十分です。', id: 'Asalkan sehat, itu sudah cukup.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  }

];
