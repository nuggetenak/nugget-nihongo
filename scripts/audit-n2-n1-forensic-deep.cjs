const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Helper to check for kanji
const KANJI_REGEX = /[\u4E00-\u9FAF\u3005]/;
const KANA_REGEX = /^[\u3040-\u309F\u30A0-\u30FF\u3000-\u303F\s]+$/;

function auditTrack(level) {
  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`🔍 AUDITING JLPT ${level.toUpperCase()} CURRICULUM LESSONS (40 LESSONS)`);
  console.log(`═══════════════════════════════════════════════════`);

  const lessonsDir = path.join(ROOT, `src/lib/curriculum/lessons/${level}`);
  if (!fs.existsSync(lessonsDir)) {
    console.error(`Directory not found: ${lessonsDir}`);
    return;
  }

  const indexFile = path.join(lessonsDir, 'index.ts');
  let curatedLessons = {};
  if (level === 'n2') {
    curatedLessons = require(indexFile).n2CuratedLessons;
  } else if (level === 'n1') {
    curatedLessons = require(indexFile).n1CuratedLessons;
  }

  const lessonKeys = Object.keys(curatedLessons);
  console.log(`Total lessons registered: ${lessonKeys.length}`);

  let stats = {
    totalLessons: lessonKeys.length,
    lessonsWithKanaOnlyVocabSample: 0,
    totalDialogueLines: 0,
    dialogueLinesWithBracketsInJp: 0,
    dialogueLinesWithInvertedFurigana: 0,
    dialogueLinesPureKana: 0,
    totalVocabBreakdown: 0,
    vocabWordIsKanaOnly: 0,
    totalDrills: 0,
    drillsMissingDiagnostic: 0,
    drillsWithBracketIssues: 0,
    drillsMissingExplanations: 0,
    pocketSummariesMissing: 0,
    pocketSummaryWithKanaOnlyWords: 0,
  };

  const sampleFindings = [];

  for (const key of lessonKeys) {
    const lesson = curatedLessons[key];

    // 1. Audit pedagogical_framework.what.coreVocabSample
    const coreVocab = lesson.pedagogical_framework?.what?.coreVocabSample || [];
    if (coreVocab.length > 0) {
      const allKana = coreVocab.every(w => !KANJI_REGEX.test(w));
      if (allKana) {
        stats.lessonsWithKanaOnlyVocabSample++;
        if (sampleFindings.length < 5) {
          sampleFindings.push(`[${key}] coreVocabSample is all Kana: ${JSON.stringify(coreVocab.slice(0, 4))}`);
        }
      }
    }

    // 2. Audit dialogue lines
    const dialogue = lesson.dialogue || [];
    for (const d of dialogue) {
      stats.totalDialogueLines++;
      if (/【[^】]+】/.test(d.jp)) {
        stats.dialogueLinesWithBracketsInJp++;
      }
      if (d.furigana && /【[^】]+】/.test(d.furigana)) {
        // furigana field should be clean kanji without brackets
        stats.dialogueLinesWithInvertedFurigana++;
      }
      if (d.jp && !KANJI_REGEX.test(d.jp) && d.jp.length > 8) {
        stats.dialogueLinesPureKana++;
      }
    }

    // 3. Audit vocab_breakdown
    const vocabBreakdown = lesson.vocab_breakdown || [];
    for (const vb of vocabBreakdown) {
      stats.totalVocabBreakdown++;
      if (vb.word && !KANJI_REGEX.test(vb.word) && !/^[ァ-ヶー\s]+$/.test(vb.word)) {
        stats.vocabWordIsKanaOnly++;
      }
    }

    // 4. Audit drills
    const drills = lesson.drills || [];
    for (const dr of drills) {
      stats.totalDrills++;
      if (!dr.explanation || dr.explanation.trim().length === 0) {
        stats.drillsMissingExplanations++;
      }
      if (dr.options && dr.options.length > 0) {
        if (!dr.diagnosticFeedback || Object.keys(dr.diagnosticFeedback).length === 0) {
          stats.drillsMissingDiagnostic++;
        }
      }
    }

    // 5. Audit pocket summary
    if (!lesson.pocket_summary) {
      stats.pocketSummariesMissing++;
    } else {
      const coreWords = lesson.pocket_summary.coreWords || [];
      if (coreWords.length > 0 && coreWords.every(w => !KANJI_REGEX.test(w))) {
        stats.pocketSummaryWithKanaOnlyWords++;
      }
    }
  }

  console.log(`\nAudit Statistics for ${level.toUpperCase()}:`);
  console.log(JSON.stringify(stats, null, 2));

  if (sampleFindings.length > 0) {
    console.log(`\nSample Findings:`);
    sampleFindings.forEach(f => console.log(` - ${f}`));
  }

  return stats;
}

console.log('Starting Forensic Quality Audit for N2 and N1...');
const n2Stats = auditTrack('n2');
const n1Stats = auditTrack('n1');
