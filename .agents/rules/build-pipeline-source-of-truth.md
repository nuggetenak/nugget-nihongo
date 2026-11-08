# Build Pipeline & Source-of-Truth Invariant Rule

When inspecting, remediating, or expanding vocabulary, grammar, kanji, and curriculum data across Nugget Nihongo:

1. **Never Directly Edit Auto-Generated Files**:
   - `public/data/vocab/vocab-n{1..5}.js`, `public/data/grammar/grammar-n{1..5}.js`, and `public/data/curriculum/curriculum-*.json` are compiled build artifacts.
   - Any direct edits to these monolithic files will be silently destroyed the next time build scripts or GitHub Actions execute.

2. **Always Edit Category Source Files**:
   - For Vocabulary: Edit the modular category files under `public/data/vocab/n{1..5}/{verbs,nouns,adjectives,adverbs,expressions}.js`, then run:
     `node scripts/merge-vocab.js`
   - For Grammar: Edit the modular category files under `public/data/grammar/n{1..5}/*.js`, then run:
     `node scripts/merge-grammar.js`
   - For Curriculum: Update the unit definitions, vocab keywords, and kanji bindings inside `scripts/build-curriculum-n5.js` (or respective track compiler), then run:
     `node scripts/build-curriculum-n5.js`

3. **Build-Time Compilation Over Runtime Reconciliation**:
   - Never merge raw and staged datasets dynamically in client browser memory (as previously done in `dataManager.ts`).
   - Reconcile staged expansions into category sources at build time using `scripts/merge-staged-into-categories.js`.

4. **Schema Contract & Migration Invariance**:
   - Any modification to data structures in category source files must maintain backward compatibility with client IndexedDB stores and TinyBase schemas.
   - If a breaking schema change is unavoidable, provide an explicit offline database migration script before publishing compiled data artifacts.
