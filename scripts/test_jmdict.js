const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data-sources/jmdict-eng-3.6.2.json', 'utf8'));
console.log('Words loaded:', data.words.length);
const eat = data.words.find(w => w.kanji.some(k => k.text === '食べる'));
console.log('食べる:', JSON.stringify(eat, null, 2));
