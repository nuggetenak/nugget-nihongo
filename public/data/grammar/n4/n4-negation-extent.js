// ──────────────────────────────────────────────────────────────
//  n4-negation-extent.js — Nugget Nihongo · JLPT N4 Grammar
//  3 entries | Category: negation-extent
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN4_Negation_Extent = [

{
    id         : 'gn4-00044',
    level      : 'n4',
    pattern    : 'Vやすい',
    reading    : 'V-yasui',
    meaning    : 'mudah untuk ... / gampang ...',
    cat        : 'extent-degree',
    connection : 'V-ます語幹 + やすい',
    desc       : '<b>〜やすい</b> menyatakan bahwa suatu tindakan mudah dilakukan atau bahwa sesuatu cenderung terjadi. Berperilaku seperti adjektif-i.',
    nuance     : null,
    examples   : [
      { jp: 'この辞書は使い<b>やすい</b>です。', id: 'Kamus ini mudah digunakan.' },
      { jp: '彼女の説明は分かり<b>やすかった</b>。', id: 'Penjelasannya mudah dipahami.' },
    ],
    see_also_grammar : ['gn4-00045'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00045',
    level      : 'n4',
    pattern    : 'Vにくい',
    reading    : 'V-nikui',
    meaning    : 'sulit untuk ... / susah ...',
    cat        : 'extent-degree',
    connection : 'V-ます語幹 + にくい',
    desc       : '<b>〜にくい</b> menyatakan bahwa suatu tindakan sulit dilakukan.',
    nuance     : null,
    examples   : [
      { jp: 'この漢字は書き<b>にくい</b>です。', id: 'Kanji ini sulit ditulis.' },
      { jp: '狭くて住み<b>にくい</b>アパートです。', id: 'Ini apartemen yang sempit dan susah untuk ditinggali.' },
    ],
    see_also_grammar : ['gn4-00044'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : null,
  },

{
    id         : 'gn4-00068',
    level      : 'n4',
    pattern    : '〜すぎる',
    reading    : '〜sugiru',
    meaning    : 'terlalu ...',
    cat        : 'extent-degree',
    connection : 'V-ます語幹 / Adj-i語幹 / Adj-na + すぎる',
    desc       : '<b>〜すぎる</b> menyatakan bahwa sesuatu melebihi batas yang diinginkan atau wajar: "terlalu".',
    nuance     : null,
    examples   : [
      { jp: 'このカレーは辛<b>すぎます</b>。', id: 'Kari ini terlalu pedas.' },
      { jp: '昨日飲み<b>すぎた</b>。', id: 'Kemarin terlalu banyak minum.' },
    ],
    see_also_grammar : [],
    see_also_vocab   : [],
    register   : null,
    exceptions : 'いい → よすぎる',
    notes      : null,
  }

];
