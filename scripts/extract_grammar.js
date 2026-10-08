const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, callback);
    else callback(p);
  });
}

let files = [];
walk('public/data/grammar', p => {
  if (p.endsWith('.js') && !path.basename(p).startsWith('grammar-') && !p.includes('index')) {
    files.push(p);
  }
});

let missing = [];
files.forEach(f => {
  global.window = {};
  let text = fs.readFileSync(f, 'utf8');
  try {
    eval(text);
    const key = Object.keys(global.window)[0];
    const items = global.window[key];
    
    items.forEach(item => {
      // Extract all items so the AI can enrich them completely.
      // We pass the existing data so the AI can build upon it instead of replacing good data.
      missing.push({
        id: item.id,
        level: item.level,
        pattern: item.pattern,
        meaning: item.meaning,
        connection: item.connection,
        desc: item.desc,
        existing_nuance: item.nuance,
        existing_register: item.register,
        existing_exceptions: item.exceptions,
        existing_notes: item.notes,
        file: f.replace(/\\/g, '/')
      });
    });
  } catch(e) {
    console.error('Failed to parse', f, e.message);
  }
});

if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');

let state = {};
const CHUNK_SIZE = 40;
let chunks = 0;

for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
  const chunk = missing.slice(i, i + CHUNK_SIZE);
  // Group by level to give the LLM better context?
  // They are already sorted by file, so they will naturally group.
  const name = `grammar_chunk_${chunks}.json`;
  fs.writeFileSync(`scratch/${name}`, JSON.stringify(chunk, null, 2));
  state[name] = { status: 'pending' };
  chunks++;
}

fs.writeFileSync('scratch/grammar_orchestrator_state.json', JSON.stringify(state, null, 2));
console.log(`Extracted all ${missing.length} grammar items into ${chunks} chunks.`);
