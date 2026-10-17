// scripts/generate-choukai-bank.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcFile = path.join(__dirname, '../../choukai renshuu/public/js/questions.js');
const targetFile = path.join(__dirname, '../src/lib/data/choukaiExamBank.ts');

if (!fs.existsSync(srcFile)) {
  console.error(`Source file not found: ${srcFile}`);
  process.exit(1);
}

let rawContent = fs.readFileSync(srcFile, 'utf8');
rawContent = rawContent.replace(/const\s+questionSets\s*=/, 'globalThis.questionSets =');

const sandbox = { globalThis: {} };
vm.createContext(sandbox);
vm.runInContext(rawContent, sandbox);
const parsed = sandbox.globalThis.questionSets;

if (!parsed || !Array.isArray(parsed)) {
  console.error('Failed to extract questionSets array');
  process.exit(1);
}

// Prefix images and audio with /data/choukai/
function rewritePaths(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(rewritePaths);
  }
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      if (v.startsWith('images/')) {
        result[k] = '/data/choukai/' + v;
      } else if (v.startsWith('audio/')) {
        result[k] = '/data/choukai/' + v;
      } else if (v.startsWith('pdf/')) {
        result[k] = '/data/choukai/' + v;
      } else {
        result[k] = v;
      }
    } else {
      result[k] = rewritePaths(v);
    }
  }
  return result;
}

const rewritten = rewritePaths(parsed);

let totalQuestions = 0;
rewritten.forEach(set => {
  set.sections.forEach(sec => {
    totalQuestions += sec.questions ? sec.questions.length : 0;
  });
});

console.log(`Loaded ${rewritten.length} question sets with ${totalQuestions} questions total.`);

const tsOutput = `// ══════════════════════════════════════════════════════════════════
//  choukaiExamBank.ts — Authentic JFT-Basic CBT & Choukai Simulator Bank
//  Migrated from choukai renshuu (38 native audio tracks, 372 illustrations)
// ══════════════════════════════════════════════════════════════════

export interface ChoukaiAudioFile {
  mp3: string;
  m4a?: string;
  label?: string;
}

export interface ChoukaiOptionItem {
  label?: string;
  text?: string;
  image?: string;
}

export interface ChoukaiQuestionItem {
  id: number;
  promptImage?: string;
  promptText?: string;
  audioIndex?: number;
  options: (string | ChoukaiOptionItem)[];
  answer: string;
  explanation?: string;
}

export interface ChoukaiSection {
  id: 'vocab' | 'conversation' | 'listening' | 'reading' | string;
  name: string;
  nameJp?: string;
  icon?: string;
  description?: string;
  audioFiles?: ChoukaiAudioFile[];
  questions: ChoukaiQuestionItem[];
}

export interface ChoukaiQuestionSet {
  id: number;
  title: string;
  pdfUrl?: string;
  sections: ChoukaiSection[];
}

export const CHOUKAI_QUESTION_SETS: ChoukaiQuestionSet[] = ${JSON.stringify(rewritten, null, 2)};

export function getChoukaiSetById(id: number): ChoukaiQuestionSet | undefined {
  return CHOUKAI_QUESTION_SETS.find(s => s.id === id);
}

export function getAllChoukaiSets(): ChoukaiQuestionSet[] {
  return CHOUKAI_QUESTION_SETS;
}
`;

fs.writeFileSync(targetFile, tsOutput, 'utf8');
console.log(`Successfully generated: ${targetFile}`);
