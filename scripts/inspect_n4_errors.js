const fs = require('fs');

global.window = global;
require('../public/data/vocab/vocab-n4.js');

const dupIds = ['vg-n4-00689', 'vg-n4-00690', 'vg-n4-00692'];
const found = window.vocabN4.filter(x => dupIds.includes(x.id));
console.log('--- Duplicate Entries ---');
found.forEach(x => {
  console.log(x.id, x.word, x.reading, x.pos, x.added_v);
});

const jpnIds = ['vg-n4-00736', 'vg-n4-00836', 'vg-n4-00805', 'vg-n4-00707', 'vg-n4-00932'];
console.log('\n--- Meaning Entries ---');
window.vocabN4.filter(x => jpnIds.includes(x.id)).forEach(x => {
  console.log(x.id, x.word, x.reading, 'meaning_id:', x.meaning_id, 'meaning_en:', x.meaning_en);
});
