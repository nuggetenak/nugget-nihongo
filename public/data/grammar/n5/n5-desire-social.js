// ──────────────────────────────────────────────────────────────
//  n5-desire-social.js — Nugget Nihongo · JLPT N5 Grammar
//  2 entries | Category: desire-social
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Desire_Social = [

{
    id         : 'gn5-00040',
    level      : 'n5',
    pattern    : '〜たい',
    reading    : '〜tai',
    meaning    : 'ingin melakukan ...',
    cat        : 'desire-want',
    connection : 'V-ます語幹 + たい',
    desc       : '<b>〜たい</b> menyatakan keinginan si pembicara untuk melakukan sesuatu. Berperilaku seperti adjektif-i.',
    nuance     : 'Untuk menyatakan keinginan orang ketiga, gunakan 〜たがる.',
    examples   : [
      { jp: 'にほんへ<b>いきたい</b>です。', id: 'Ingin pergi ke Jepang.' },
      { jp: 'なにを<b>たべたい</b>ですか。', id: 'Mau makan apa?' },
    ],
    see_also_grammar : ['gn5-00041'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn5-00041',
    level      : 'n5',
    pattern    : '〜たがる',
    reading    : '〜tagaru',
    meaning    : 'sepertinya ingin melakukan ... (orang ketiga)',
    cat        : 'desire-want',
    connection : 'V-ます語幹 + たがる',
    desc       : '<b>〜たがる</b> digunakan untuk menyatakan keinginan orang ketiga, berdasarkan pengamatan perilaku atau sikapnya.',
    nuance     : null,
    examples   : [
      { jp: 'こどもはおかし<b>をたべたがっています</b>。', id: 'Anak itu sepertinya ingin makan kue.' },
      { jp: 'かれはもっとねむり<b>たがっている</b>。', id: 'Sepertinya dia ingin tidur lebih lama.' },
    ],
    see_also_grammar : ['gn5-00040'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  }

];
