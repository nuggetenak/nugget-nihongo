// ──────────────────────────────────────────────────────────────
//  n5-particles.js — Nugget Nihongo · JLPT N5 Grammar
//  1 entries | Category: particles
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN5_Particles = [

{
    id         : 'gn5-00085',
    level      : 'n5',
    pattern    : 'から (asal/arah datang)',
    reading    : 'kara (asal)',
    meaning    : 'dari [tempat/orang] — menunjukkan asal atau titik keberangkatan',
    cat        : 'particle',
    connection : '【場所/人】から + V kedatangan (来ます、帰ります、dll.)',
    desc       : 'Partikel <b>から</b> menunjukkan asal atau titik keberangkatan. Pada level ini diajarkan sebagai pola tetap <b>【場所】から来ました</b> untuk menyatakan asal negara/kota.',
    nuance     : 'Berbeda dengan から di gn5-00020 (rentang waktu/tempat から〜まで). Di sini から berdiri sendiri untuk menunjukkan titik asal pergerakan.',
    examples   : [
      { jp: 'ブラジル<b>から</b>来ました。', id: 'Saya berasal dari Brasil.' },
      { jp: 'インドネシア<b>から</b>来ました。', id: 'Saya dari Indonesia.' },
      { jp: '大阪<b>から</b>来ました。', id: 'Saya datang dari Osaka.' },
    ],
    see_also_grammar : ['gn5-00020'],
    see_also_vocab   : [],
    register   : null,
    exceptions : null,
    notes      : 'Pattern from Irodori 入門 L3. Diajarkan sebagai frasa tetap; ekspansi pola dibahas di level Elementary.',
  }

];
