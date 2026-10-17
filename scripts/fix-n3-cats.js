const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../public/data/grammar/n3/n3-connectives.js');
let c = fs.readFileSync(file, 'utf8');

const map = {
  'negation-partial': 'negative',
  'social-norm': 'obligation-necessity',
  'causal-reason': 'reason-cause',
  'habit-routine': 'progressive-state',
  'directive-written': 'obligation-necessity',
  'reported-speech': 'quotation-thought',
  'conjecture-negative': 'conjecture-possibility',
  'change-progression': 'progressive-state',
  'contrast-parallel': 'contrast-concession',
  'topic-focus': 'particle',
  'cause-means-agent': 'reason-cause',
  'hearsay-source': 'hearsay-report',
  'addition-extent': 'extent-degree',
  'parallel-addition': 'listing-addition',
  'typicality': 'conjecture-possibility',
  'suffix-derivation': 'expression'
};

for (const [oldCat, newCat] of Object.entries(map)) {
  const reg = new RegExp(`cat:\\s*'${oldCat}'`, 'g');
  c = c.replace(reg, `cat: '${newCat}'`);
}

fs.writeFileSync(file, c, 'utf8');
console.log('✅ Updated categories in n3-connectives.js');
