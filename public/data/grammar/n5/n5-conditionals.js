// ──────────────────────────────────────────────────────────────
//  n5-conditionals.js — Nugget Nihongo · JLPT N5 Grammar
//  3 entries | Category: conditionals
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Conditionals = [

{
    id         : 'gn5-00047',
    level      : 'n5',
    pattern    : '〜たら',
    reading    : '〜tara',
    meaning    : 'kalau / jika / setelah (kondisional)',
    cat        : 'conditional-tara',
    connection : 'Vた → Vたら / Adjかった → Adjかったら / N + だったら',
    desc       : '<b>〜たら</b> menyatakan kondisi atau urutan: "kalau...", "jika...", "setelah...". Bisa untuk kondisi hipotetis maupun nyata.',
    nuance     : 'Lebih fleksibel dari 〜と dan 〜ば. Paling sering digunakan di percakapan.',
    examples   : [
      { jp: 'うちに<b>かえったら</b>、でんわします。', id: 'Kalau sudah sampai rumah, saya akan menelepon.' },
      { jp: 'やすかっ<b>たら</b>かいます。', id: 'Kalau murah, saya beli.' },
    ],
    see_also_grammar : ['gn5-00048', 'gn5-00049'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00048',
    level      : 'n5',
    pattern    : '〜と (kondisional)',
    reading    : '〜to',
    meaning    : 'kalau / jika (kondisi alami/otomatis)',
    cat        : 'conditional-tara',
    connection : 'V plain / Adj plain + と',
    desc       : '<b>〜と</b> menyatakan kondisi yang secara otomatis atau selalu menghasilkan akibat tertentu. Digunakan untuk fakta alami, petunjuk arah, atau kondisi yang pasti.',
    nuance     : 'Tidak digunakan di kalimat yang melibatkan kemauan/permintaan di klausa hasil.',
    examples   : [
      { jp: 'みぎに<b>まがると</b>、こうえんがあります。', id: 'Kalau belok kanan, ada taman.' },
      { jp: 'はるになる<b>と</b>、さくらがさきます。', id: 'Kalau musim semi tiba, bunga sakura mekar.' },
    ],
    see_also_grammar : ['gn5-00047', 'gn5-00049'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00049',
    level      : 'n5',
    pattern    : '〜ば',
    reading    : '〜ba',
    meaning    : 'kalau / jika (kondisional hipotetis)',
    cat        : 'conditional-tara',
    connection : 'V → V-ba form (e.g. いく → いけば) / Adj → Adj-ければ',
    desc       : '<b>〜ば</b> menyatakan kondisi hipotetis: "kalau...", "seandainya...". Sering digunakan dengan nuansa nasihat atau kondisi yang harus dipenuhi.',
    nuance     : null,
    examples   : [
      { jp: 'はやくおき<b>れば</b>、おくれません。', id: 'Kalau bangun cepat, tidak akan terlambat.' },
      { jp: 'やすけ<b>れば</b>かいたいです。', id: 'Kalau murah, ingin beli.' },
    ],
    see_also_grammar : ['gn5-00047', 'gn5-00048'],
    see_also_vocab   : [],
    register   : null,
    exceptions : 'いい → よければ',
    notes      : null,
  }

];
