const fs = require('fs');
const path = require('path');
const vm = require('vm');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.js')) results.push(file);
  });
  return results;
}

const files = walk('public/data/staged-expansion/exercises');
const allProps = new Set();
const missingPromptList = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(content, sandbox);
    const bank = Object.values(sandbox.window)[0] || Object.values(sandbox)[0];
    if (bank) {
      const sub = bank.chapters || bank.units || bank.lessons || bank.weeks || bank.topics;
      if (sub) {
        Object.values(sub).forEach(s => {
          if (s.drills && Array.isArray(s.drills)) {
            s.drills.forEach(d => {
              Object.keys(d).forEach(k => allProps.add(k));
              const hasAnyPrompt = d.prompt || d.sentence_prompt || d.dialogue_prompt || d.question_prompt || d.target_word || d.dialogue_scenario || d.cloze_sentence || d.star_sentence || d.context_sentence || d.kanji || d.source_sentence || d.passage || d.scrambled_tokens;
              if (!hasAnyPrompt) {
                missingPromptList.push({ file: path.basename(f), id: d.id, keys: Object.keys(d) });
              }
            });
          }
        });
      }
    }
  } catch (e) {
    console.error('Error evaluating ' + f, e.message);
  }
});

console.log('All Drill Props:', Array.from(allProps).sort());
console.log('Missing Prompt count:', missingPromptList.length);
if (missingPromptList.length > 0) {
  console.log('Sample missing:', missingPromptList.slice(0, 10));
}
