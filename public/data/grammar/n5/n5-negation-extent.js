// ──────────────────────────────────────────────────────────────
//  n5-negation-extent.js — Nugget Nihongo · JLPT N5 Grammar
//  6 entries | Category: negation-extent
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Negation_Extent = [

{
    id         : 'gn5-00027',
    level      : 'n5',
    pattern    : '〜ない (negatif plain)',
    reading    : '〜nai',
    meaning    : 'negatif bentuk biasa',
    cat        : 'negative',
    connection : 'V → Vない',
    desc       : 'Bentuk negatif verba dalam gaya biasa (bukan sopan). Digunakan dalam percakapan kasual dan sebagai dasar banyak pola grammar lain.',
    nuance     : null,
    examples   : [
      { jp: 'あまりテレビを<b>みない</b>。', id: 'Tidak terlalu sering nonton TV.' },
      { jp: 'きょうは<b>いかない</b>つもりです。', id: 'Berencana tidak pergi hari ini.' },
    ],
    see_also_grammar : ['gn5-00028', 'gn5-00030', 'gn5-00040'],
    see_also_vocab   : [],
    register   : null,
    exceptions : 'する → しない, くる → こない',
    notes      : null,
  },

{
    id         : 'gn5-00035',
    level      : 'n5',
    pattern    : '〜ないで',
    reading    : '〜nai de',
    meaning    : 'tanpa melakukan ... / jangan ...',
    cat        : 'negative',
    connection : 'Vない + で',
    desc       : '<b>〜ないで</b> digunakan untuk: (1) melakukan sesuatu tanpa melakukan hal lain, atau (2) permintaan untuk tidak melakukan sesuatu (lebih lembut dari 〜てはいけない).',
    nuance     : null,
    examples   : [
      { jp: 'なにも<b>たべないで</b>ねてしまった。', id: 'Tertidur tanpa makan apapun.' },
      { jp: 'ここでおよが<b>ないで</b>ください。', id: 'Tolong jangan berenang di sini.' },
    ],
    see_also_grammar : ['gn5-00030', 'gn5-00032'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00057',
    level      : 'n5',
    pattern    : 'AはBより〜',
    reading    : 'A wa B yori〜',
    meaning    : 'A lebih ... daripada B',
    cat        : 'comparison',
    connection : 'A + は + B + より + Adj/Adv',
    desc       : 'Pola perbandingan dasar: A lebih [adjektif] daripada B. <b>より</b> menandai benda pembanding.',
    nuance     : null,
    examples   : [
      { jp: 'でんしゃはバス<b>より</b>はやいです。', id: 'Kereta lebih cepat dari bus.' },
      { jp: 'このかばんはあのかばん<b>より</b>やすいです。', id: 'Tas ini lebih murah dari tas itu.' },
    ],
    see_also_grammar : ['gn5-00058', 'gn5-00059'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00058',
    level      : 'n5',
    pattern    : '〜の方が〜より',
    reading    : '〜no hou ga〜yori',
    meaning    : '... lebih ... dibandingkan ...',
    cat        : 'comparison',
    connection : 'A + の方が + B + より + Adj',
    desc       : '<b>〜の方が</b> menegaskan pilihan yang lebih disukai atau sifat yang lebih menonjol. Sering digunakan dalam pernyataan preferensi.',
    nuance     : null,
    examples   : [
      { jp: 'バスよりでんしゃ<b>のほうが</b>はやいです。', id: 'Kereta lebih cepat daripada bus.' },
      { jp: 'なつよりふゆ<b>のほうが</b>すきです。', id: 'Lebih suka musim dingin daripada musim panas.' },
    ],
    see_also_grammar : ['gn5-00057', 'gn5-00060'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00059',
    level      : 'n5',
    pattern    : 'AはBほど〜ない',
    reading    : 'A wa B hodo〜nai',
    meaning    : 'A tidak se... B',
    cat        : 'comparison',
    connection : 'A + は + B + ほど + Adj/Adv + ない',
    desc       : '<b>〜ほど〜ない</b> menyatakan bahwa A tidak setara (dalam derajat tertentu) dengan B. Bentuk negatif perbandingan.',
    nuance     : null,
    examples   : [
      { jp: 'きょうはきのう<b>ほど</b>さむく<b>ない</b>です。', id: 'Hari ini tidak sedingin kemarin.' },
      { jp: 'このしけんはまえのしけん<b>ほど</b>むずかしく<b>なかった</b>。', id: 'Ujian ini tidak sesulit ujian yang lalu.' },
    ],
    see_also_grammar : ['gn5-00057', 'gn5-00058'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00060',
    level      : 'n5',
    pattern    : '〜が一番',
    reading    : '〜ga ichiban',
    meaning    : '... paling ... / yang terbaik',
    cat        : 'comparison',
    connection : 'N + が + 一番 + Adj',
    desc       : '<b>一番</b> berarti "nomor satu" atau "paling", digunakan untuk superlative dalam kelompok.',
    nuance     : null,
    examples   : [
      { jp: 'くだものの中で、りんご<b>が一番</b>すきです。', id: 'Di antara buah-buahan, saya paling suka apel.' },
      { jp: 'このクラスで彼女<b>が一番</b>じょうずです。', id: 'Di kelas ini, dia yang paling pandai.' },
    ],
    see_also_grammar : ['gn5-00057', 'gn5-00058'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  }

];
