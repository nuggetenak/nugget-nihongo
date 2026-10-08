const fs = require('fs');
const path = require('path');

// Fix broken single-quote escaping in nuance fields across all vocab files
// The issue: inject_nuances.js produces \\' instead of \' in some cases
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = dir + '/' + f;
    if (fs.statSync(p).isDirectory()) walkDir(p, callback);
    else callback(p);
  });
}

let files = [];
walkDir('public/data/vocab', p => {
  if (p.endsWith('.js') && !path.basename(p).startsWith('vocab-') && !p.includes('index')) {
    files.push(p);
  }
});

let totalFixed = 0;

files.forEach(filePath => {
  let text = fs.readFileSync(filePath, 'utf8');
  
  // Fix double-escaped quotes: \\' → \'
  // But we need to be careful not to break legitimate \\ followed by '
  // The pattern \\\\' in a JS string literal represents \\' in the file
  // We want to replace \\' with \' only inside nuance fields
  
  const before = text;
  
  // Replace \\' with \' inside nuance values
  // nuance: '...\\'...', → nuance: '...\'...',
  text = text.replace(/(nuance:\s*'[^]*?')(,?\s*$)/gm, (match) => {
    // Replace \\' with \' within the match
    return match.replace(/\\\\'/g, "\\'");
  });
  
  if (text !== before) {
    totalFixed++;
    fs.writeFileSync(filePath, text, 'utf8');
    console.log('Fixed:', path.basename(filePath));
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
