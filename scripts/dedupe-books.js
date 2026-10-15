const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, '..', 'public', 'data', 'books');
const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.js'));

let totalDupsRemoved = 0;

for (const file of files) {
  const filePath = path.join(booksDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let inVocabArray = false;
  let inGrammarArray = false;
  let seenIds = new Set();
  let fileDups = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('vocab_ids') && line.includes('[')) {
      inVocabArray = true;
      seenIds = new Set();
      newLines.push(line);
      // Check if one-line array
      if (line.includes(']')) {
        inVocabArray = false;
      }
      continue;
    }

    if (line.includes('grammar_ids') && line.includes('[')) {
      inGrammarArray = true;
      seenIds = new Set();
      newLines.push(line);
      if (line.includes(']')) {
        inGrammarArray = false;
      }
      continue;
    }

    if (inVocabArray) {
      if (line.includes(']')) {
        inVocabArray = false;
        newLines.push(line);
        continue;
      }
      // Match ID like 'vg-n5-00108' or "vg-n5-00108"
      const match = line.match(/['"](vg-[^'"]+|[a-zA-Z0-9_-]+)['"]/);
      if (match) {
        const id = match[1];
        if (seenIds.has(id)) {
          fileDups++;
          continue; // Skip duplicate line
        }
        seenIds.add(id);
      }
      newLines.push(line);
      continue;
    }

    if (inGrammarArray) {
      if (line.includes(']')) {
        inGrammarArray = false;
        newLines.push(line);
        continue;
      }
      const match = line.match(/['"](gn\d-[^'"]+|[a-zA-Z0-9_-]+)['"]/);
      if (match) {
        const id = match[1];
        if (seenIds.has(id)) {
          fileDups++;
          continue; // Skip duplicate line
        }
        seenIds.add(id);
      }
      newLines.push(line);
      continue;
    }

    newLines.push(line);
  }

  if (fileDups > 0) {
    console.log(`Deduplicated ${fileDups} items in ${file}`);
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    totalDupsRemoved += fileDups;
  }
}

console.log(`Finished deduplicating books. Total duplicates removed: ${totalDupsRemoved}`);
