// ══════════════════════════════════════════════════════════════════
//  scripts/sync-changelog.js
//  Automated Single Source of Truth Changelog Compiler
//  Compiles src/lib/data/patchNotes.ts into CHANGELOG.md
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT_DIR = path.resolve(__dirname, '..');
const PATCH_NOTES_PATH = path.join(ROOT_DIR, 'src', 'lib', 'data', 'patchNotes.ts');
const CHANGELOG_PATH = path.join(ROOT_DIR, 'CHANGELOG.md');

function loadPatchNotes() {
  const tsContent = fs.readFileSync(PATCH_NOTES_PATH, 'utf8');
  const code = esbuild.transformSync(tsContent, {
    loader: 'ts',
    format: 'cjs',
    target: 'node18',
  }).code;

  const mod = { exports: {} };
  const runner = new Function('module', 'exports', code);
  runner(mod, mod.exports);

  if (!mod.exports.PATCH_NOTES_HISTORY || !Array.isArray(mod.exports.PATCH_NOTES_HISTORY)) {
    throw new Error('Could not find PATCH_NOTES_HISTORY array in patchNotes.ts');
  }

  return mod.exports.PATCH_NOTES_HISTORY;
}

function extractLegacyArchive(existingChangelog) {
  // Look for where v15.15.0 begins in the existing CHANGELOG.md
  const marker = '## v15.15.0 (30 September 2026)';
  const idx = existingChangelog.indexOf(marker);
  if (idx !== -1) {
    return existingChangelog.slice(idx);
  }
  return '';
}

function generateMarkdown(patchNotes, legacyArchive) {
  let md = '# Changelog — Nugget Nihongo\n\n';
  md += '> Catatan pembaruan ini disinkronkan secara otomatis dari `src/lib/data/patchNotes.ts`\n';
  md += '> Single Source of Truth: Jalankan `npm run changelog` atau `npm run build` untuk memutakhirkan.\n\n';

  // Render modern structured releases
  for (const note of patchNotes) {
    md += `## ${note.version} (${note.date}) — ${note.releaseName}\n\n`;

    if (note.highlights && note.highlights.length > 0) {
      md += '### Sorotan Pembaruan (Highlights)\n';
      for (const hl of note.highlights) {
        md += `- ${hl}\n`;
      }
      md += '\n';
    }

    if (note.details && note.details.length > 0) {
      md += '### Rincian Perubahan (Details)\n';
      for (const det of note.details) {
        md += `#### ${det.category}\n`;
        for (const item of det.items) {
          md += `- ${item}\n`;
        }
        md += '\n';
      }
    }

    md += '---\n\n';
  }

  if (legacyArchive) {
    md += '## Arsip Pembaruan Historis (v15.15.0 ke Bawah)\n\n';
    md += legacyArchive.trim() + '\n';
  }

  return md;
}

function main() {
  console.log('[changelog-sync] Reading patchNotes.ts...');
  const patchNotes = loadPatchNotes();
  console.log(`[changelog-sync] Loaded ${patchNotes.length} release notes.`);

  let legacyArchive = '';
  if (fs.existsSync(CHANGELOG_PATH)) {
    const existing = fs.readFileSync(CHANGELOG_PATH, 'utf8');
    legacyArchive = extractLegacyArchive(existing);
  }

  const outputMarkdown = generateMarkdown(patchNotes, legacyArchive);
  fs.writeFileSync(CHANGELOG_PATH, outputMarkdown, 'utf8');
  console.log(`[changelog-sync] Successfully synchronized CHANGELOG.md (${outputMarkdown.length} bytes).`);
}

main();
