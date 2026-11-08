/**
 * test-s3-pass10-japanese-typography-furigana.js
 * Verification suite for Siklus III — Pass 10:
 * Japanese Typography, Furigana RubyText & Bunsetsu Line Breaking
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('--- RUNNING SIKLUS III PASS 10: JAPANESE TYPOGRAPHY & FURIGANA TEST SUITE ---');

// Check 10.1: InteractiveSentence.tsx - Irasutoya senpai_studying, card-interactive-lift, focus-visible
{
  const filePath = path.join(projectRoot, 'src/components/common/InteractiveSentence.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 10.1 Failed: InteractiveSentence must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 10.1 Failed: InteractiveSentence must render senpai_studying asset');
  assert(code.includes('animateFloat'), 'Check 10.1 Failed: InteractiveSentence must animate senpai_studying asset');
  assert(code.includes('card-interactive-lift'), 'Check 10.1 Failed: InteractiveSentence must apply card-interactive-lift on decomposition cards');
  assert(code.includes('focus-visible:ring-2'), 'Check 10.1 Failed: InteractiveSentence tokens must include focus-visible ring for accessibility');
  console.log('✅ Check 10.1 Passed: InteractiveSentence includes Irasutoya Senpai, card-interactive-lift, and focus accessibility.');
}

// Check 10.2: InteractiveSentence.tsx - Touch targets >= 40px and CTA >= 44px
{
  const filePath = path.join(projectRoot, 'src/components/common/InteractiveSentence.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('min-w-[40px]') && code.includes('min-h-[40px]'), 'Check 10.2 Failed: Voice and close triggers must enforce min-w-[40px] min-h-[40px]');
  assert(code.includes('min-h-[44px]') && code.includes('active:scale-95'), 'Check 10.2 Failed: Conjugation matrix CTA must enforce min-h-[44px] active:scale-95');
  console.log('✅ Check 10.2 Passed: InteractiveSentence satisfies Universal Multi-Device touch target standards.');
}

// Check 10.3: BudouxText.tsx - lang="ja", break-keep, break-words, and max-w-full
{
  const filePath = path.join(projectRoot, 'src/components/ui/BudouxText.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('lang="ja"'), 'Check 10.3 Failed: BudouxText must declare lang="ja" attribute');
  assert(code.includes('break-keep'), 'Check 10.3 Failed: BudouxText must enforce break-keep for bunsetsu phrase grouping');
  assert(code.includes('break-words') && code.includes('max-w-full'), 'Check 10.3 Failed: BudouxText must guard against 320px viewport blowouts');
  console.log('✅ Check 10.3 Passed: BudouxText implements semantic Japanese line breaking with anti-blowout safeguards.');
}

// Check 10.4: RubyText.tsx - High contrast WCAG AA tokens, standard HTML5 ruby tags, align-baseline
{
  const filePath = path.join(projectRoot, 'src/components/ui/RubyText.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('text-amber-900 dark:text-amber-300'), 'Check 10.4 Failed: RubyText must use WCAG AA dual-theme contrast tokens for furigana');
  assert(code.includes('<ruby') && code.includes('<rt') && code.includes('<rp'), 'Check 10.4 Failed: RubyText must emit semantic <ruby>, <rt>, <rp> tags');
  assert(code.includes('align-baseline'), 'Check 10.4 Failed: RubyText must ensure clean vertical baseline alignment');
  console.log('✅ Check 10.4 Passed: RubyText enforces WCAG AA contrast tokens, semantic W3C tags, and baseline alignment.');
}

// Check 10.5: InteractiveSentence.tsx - High-contrast POS and explanation tokens
{
  const filePath = path.join(projectRoot, 'src/components/common/InteractiveSentence.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('text-amber-900 dark:text-amber-300'), 'Check 10.5 Failed: POS tag and Yomitan explanation must use high contrast tokens');
  assert(code.includes('text-amber-800 dark:text-amber-400'), 'Check 10.5 Failed: Meaning section header must use high contrast tokens');
  console.log('✅ Check 10.5 Passed: InteractiveSentence enforces WCAG AA high-contrast tokens across all popover subcomponents.');
}

console.log('🎉 ALL SIKLUS III PASS 10 CHECKS PASSED (5/5)!');
