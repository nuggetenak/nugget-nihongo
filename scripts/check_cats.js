const fs = require('fs');

for (const cat of ['adjectives', 'adverbs', 'expressions', 'nouns', 'verbs']) {
  const c = fs.readFileSync(`public/data/vocab/n5/n5-${cat}.js`, 'utf8');
  const conjMatches = (c.match(/(?:pos|"pos"):\s*['"]conj['"]/g) || []).length;
  const prtMatches = (c.match(/(?:pos|"pos"):\s*['"]particle['"]/g) || []).length;
  if (conjMatches > 0) console.log(`N5 has conj in: ${cat} (${conjMatches})`);
  if (prtMatches > 0) console.log(`N5 has particle in: ${cat} (${prtMatches})`);
}
