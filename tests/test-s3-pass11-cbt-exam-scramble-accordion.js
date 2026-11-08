/**
 * test-s3-pass11-cbt-exam-scramble-accordion.js
 * Verification suite for Siklus III — Pass 11:
 * CBT Exam Simulation Screen, Question Drawer & Explanations Accordion
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('--- RUNNING SIKLUS III PASS 11: CBT EXAM, SCRAMBLE & ACCORDION TEST SUITE ---');

// Check 11.1: CbtRunnerScreen.tsx - Irasutoya anchors (Hanko/Daruma in Score, Senpai in Pause, Daruma in Exit)
{
  const filePath = path.join(projectRoot, 'src/components/exercise/CbtRunnerScreen.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 11.1 Failed: CbtRunnerScreen must import IrasutoyaImage');
  assert(code.includes('assetId={sessionSummary.isPassed ? \'hanko_excellent\' : \'daruma_recovery\'}'), 'Check 11.1 Failed: CbtRunnerScreen must render dynamic Hanko/Daruma in score hero');
  assert(code.includes('assetId="senpai_studying"'), 'Check 11.1 Failed: CbtRunnerScreen must render senpai_studying in ADHD smart pause');
  assert(code.includes('assetId="daruma_recovery"') && code.includes('Konfirmasi Keluar'), 'Check 11.1 Failed: CbtRunnerScreen must render daruma_recovery in exit guard modal');
  console.log('✅ Check 11.1 Passed: CbtRunnerScreen incorporates authentic Irasutoya anchors across results, pause, and exit guard.');
}

// Check 11.2: CbtRunnerScreen.tsx - .card-interactive-lift on review cards, options, and guided accordion
{
  const filePath = path.join(projectRoot, 'src/components/exercise/CbtRunnerScreen.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('card-interactive-lift bg-surface border border-theme rounded-3xl'), 'Check 11.2 Failed: Question review cards must have card-interactive-lift');
  assert(code.includes('card-interactive-lift min-h-[56px]'), 'Check 11.2 Failed: Multiple choice options must have card-interactive-lift');
  assert(code.includes('card-interactive-lift border border-theme rounded-2xl bg-surface-2/40'), 'Check 11.2 Failed: Guided explanation accordion must have card-interactive-lift');
  console.log('✅ Check 11.2 Passed: CbtRunnerScreen applies card-interactive-lift across review cards, options, and accordion.');
}

// Check 11.3: CbtRunnerScreen.tsx - Universal touch targets in drawer and actions
{
  const filePath = path.join(projectRoot, 'src/components/exercise/CbtRunnerScreen.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('w-10 h-10 min-w-[40px] min-h-[40px]') && code.includes('Tutup laci'), 'Check 11.3 Failed: Review drawer close button must enforce >= 40px touch targets');
  assert(code.includes('min-h-[44px]') && code.includes('Tetap Mengerjakan'), 'Check 11.3 Failed: Exit guard actions must enforce min-h-[44px]');
  console.log('✅ Check 11.3 Passed: CbtRunnerScreen drawer and exit actions enforce Universal Multi-Device touch targets.');
}

// Check 11.4: FiveLayerExplanationSheet.tsx - .card-interactive-lift across all 5 lapis cards
{
  const filePath = path.join(projectRoot, 'src/components/exercise/FiveLayerExplanationSheet.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('card-interactive-lift p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2'), 'Check 11.4 Failed: Status banner must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-emerald-500/5'), 'Check 11.4 Failed: Lapis 1 must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-surface border border-theme rounded-2xl sm:rounded-3xl'), 'Check 11.4 Failed: Lapis 2 must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-amber-500/10'), 'Check 11.4 Failed: Lapis 3 must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-orange-500/10'), 'Check 11.4 Failed: Lapis 4 must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-gradient-to-r from-cyan-500/10'), 'Check 11.4 Failed: Lapis 5 must have card-interactive-lift');
  console.log('✅ Check 11.4 Passed: FiveLayerExplanationSheet applies card-interactive-lift across all 5 pedagogical layers.');
}

// Check 11.5: StarScrambleWidget.tsx - Irasutoya Senpai, card-interactive-lift on slots, bank & options
{
  const filePath = path.join(projectRoot, 'src/components/exercise/StarScrambleWidget.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 11.5 Failed: StarScrambleWidget must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 11.5 Failed: StarScrambleWidget must render senpai_studying asset');
  assert(code.includes('card-interactive-lift bg-surface border border-theme rounded-2xl p-4 sm:p-5'), 'Check 11.5 Failed: Sentence target must have card-interactive-lift');
  assert(code.includes('card-interactive-lift min-h-[44px] px-4 py-2 rounded-xl'), 'Check 11.5 Failed: Available tokens must have card-interactive-lift');
  assert(code.includes('card-interactive-lift min-h-[48px] px-4 py-3 rounded-2xl'), 'Check 11.5 Failed: 4 Options must have card-interactive-lift');
  assert(code.includes('text-amber-900 dark:text-amber-300 font-bold'), 'Check 11.5 Failed: Selected option must preserve high-contrast tokens');
  console.log('✅ Check 11.5 Passed: StarScrambleWidget integrates Irasutoya Senpai and card-interactive-lift across all tokens & slots.');
}

console.log('🎉 ALL SIKLUS III PASS 11 CHECKS PASSED (5/5)!');
