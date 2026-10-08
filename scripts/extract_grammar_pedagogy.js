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
      // If nuance is null or very short
      if (!item.nuance || item.nuance.length < 10 || item.register === null) {
        missing.push({
          id: item.id,
          pattern: item.pattern,
          reading: item.reading,
          meaning: item.meaning,
          connection: item.connection,
          desc: item.desc,
          file: f.replace(/\\/g, '/')
        });
      }
    });
  } catch(e) {
    console.error('Failed to parse', f, e.message);
  }
});

if (!fs.existsSync('scratch')) {
  fs.mkdirSync('scratch');
}

// Write the state file
let state = {};

const CHUNK_SIZE = 40;
for (let i = 0; i < missing.length; i += CHUNK_SIZE) {
  const chunk = missing.slice(i, i + CHUNK_SIZE);
  const name = `missing_grammar_${i/CHUNK_SIZE}.json`;
  fs.writeFileSync(`scratch/${name}`, JSON.stringify(chunk, null, 2));
  state[name] = { status: 'pending' };
}

fs.writeFileSync('scratch/grammar_orchestrator_state.json', JSON.stringify(state, null, 2));

console.log(`Extracted ${missing.length} items into ${Math.ceil(missing.length/CHUNK_SIZE)} chunks.`);
