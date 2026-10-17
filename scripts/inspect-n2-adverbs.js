const fs = require('fs');
const files = ['n2-adjectives.js', 'n2-expressions.js', 'n2-nouns.js', 'n2-verbs.js'];
for (const f of files) {
  const c = fs.readFileSync('public/data/vocab/n2/' + f, 'utf8');
  const advs = (c.match(/"pos":\s*"adverb"/g) || []).length;
  console.log(f, 'has pos: "adverb":', advs);
}
