const fs = require('fs');
let txt = fs.readFileSync('tests/quality.js', 'utf8');
txt = txt.replace(
  /const word = String\(e\.word \|\| ''\);\s*if \(word\) \{\s*if \(wordLevelMap\.has\(word\) && wordLevelMap\.get\(word\)\.level !== level\)\s*warn\('CROSSLEVEL_DUP_WORD', id,[\s\S]*?else if \(!wordLevelMap\.has\(word\)\) wordLevelMap\.set\(word, \{id,level\}\);\s*\}/,
  `const word = String(e.word || '');
      const meaning = String(e.meaning_id || '');
      if (word) {
        if (wordLevelMap.has(word) && wordLevelMap.get(word).level !== level) {
          if (wordLevelMap.get(word).meaning === meaning) {
            warn('CROSSLEVEL_DUP_WORD', id,
              \`'\${word}' also in \${wordLevelMap.get(word).level} (\${wordLevelMap.get(word).id}) with identical meaning\`);
          }
        } else if (!wordLevelMap.has(word)) {
          wordLevelMap.set(word, {id, level, meaning});
        }
      }`
);
fs.writeFileSync('tests/quality.js', txt, 'utf8');
