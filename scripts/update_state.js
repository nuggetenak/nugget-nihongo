const fs = require('fs');
const STATE_FILE = 'scratch/orchestrator_state.json';

let state = {};
if (fs.existsSync(STATE_FILE)) {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
} else {
  let files = fs.readdirSync('scratch').filter(f => f.startsWith('missing_') && f.endsWith('.json'));
  files.forEach(f => {
    state[f] = { status: 'pending' };
  });
}

// Mark running
[0,1,2,3,4,5].forEach(i => {
  const f = `missing_n5-nouns_${i}.json`;
  if (state[f]) state[f].status = 'running';
});

fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
console.log('State updated');
