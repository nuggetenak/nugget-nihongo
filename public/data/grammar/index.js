// DATA INDEX — Gabungkan semua database jadi satu array global
// Urutan load di index.html: n3-w1.js → dummy.js → index.js

// Tambahkan database baru di sini saat konten bertambah:
// N3 W1–W6: sudah aktif semua
// const N5 = [...];    → ganti N5_DUMMY dengan N5

window.grammarData = [
  ...N3_W1,
  // N3 W2–W6: aktif (merged v14.6.1)
  ...N3_W2,
  ...N3_W3,
  ...N3_W4,
  ...N3_W5,
  ...N3_W6,

  // N4 data asli
  ...N4_W1,
  ...N4_W2,
  ...N4_W3,
  ...N4_W4,
  ...(typeof N4_W5 !== 'undefined' ? N4_W5 : []),
  ...(typeof N4_W6 !== 'undefined' ? N4_W6 : []),

  // Level lain menyusul (ganti dummy dengan data asli):
  ...N2_DUMMY,
  ...N1_DUMMY,
  ...N5_DUMMY,
];

// Meta: info per level untuk UI (week count, tema, status)
window.levelMeta = {
  n1: {
    label: 'N1', name: 'Mahir Tinggi', total: 0,
    weeks: []  // akan diisi saat data asli tersedia
  },
  n2: {
    label: 'N2', name: 'Mahir', total: 0,
    weeks: []
  },
  n3: {
    label: 'N3', name: 'Menengah', total: 132,
    weeks: [
      {w:1, theme:'がんばらなくちゃ！',        ready: true},
      {w:2, theme:'がんばってごらん！',          ready: true},
      {w:3, theme:'もっとがんばってほしい！',    ready: true},
      {w:4, theme:'がんばるしかない！',          ready: true},
      {w:5, theme:'もっとがんばればよかった！',  ready: true},
      {w:6, theme:'もっとがんばることにした！',  ready: true},
    ]
  },
  n4: {
    label: 'N4', name: 'Dasar Menengah', total: 0,
    weeks: [
      {w:1, theme:'一日に二回、歯をみがきます',        ready: true},
      {w:2, theme:'宿題をしなければいけません',        ready: true},
      {w:3, theme:'漢字を書くのは大変です',            ready: true},
      {w:4, theme:'夏休みになったら、国に帰ります',    ready: true},
      {w:5, theme:'環境問題について話し合いました',    ready: true},
      {w:6, theme:'急に雨が降り出しました',            ready: true},
    ]
  },
  n5: {
    label: 'N5', name: 'Dasar', total: 0,
    weeks: []
  },
};

// Auto-hitung total per level dari data nyata (non-dummy)
Object.keys(window.levelMeta).forEach(lv => {
  window.levelMeta[lv].total = window.grammarData.filter(
    d => d.level === lv && d.cat !== 'dummy'
  ).length;
});

