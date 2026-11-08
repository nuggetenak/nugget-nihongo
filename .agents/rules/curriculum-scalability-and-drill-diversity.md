# Curriculum Scalability & Drill Diversity Invariant Rule

When compiling, expanding, or testing curriculum tracks (N5, N4, N3, N2, N1, and SSW) across Nugget Nihongo:

1. **Dynamic Track Loading & Performance Budget Ceiling (< 500 kB)**:
   - Never statically import all curated lessons from all JLPT levels into a single monolithic bundle in `LessonStudyPage.tsx` or `lessonContentAdapter.ts`.
   - Maintain level-based dynamic chunk loading (`loadCuratedLessonsForTrack`) and configure Rollup `manualChunks` in `vite.config.ts` so that no single JavaScript chunk exceeds 500 kB (enforced by `scripts/verify-bundle-budget.js`).
   - Decouple large static datasets (such as 366+ Kotowaza proverbs) from the critical `HomePage` landing bundle.

2. **Template Anti-Drill-Cloning Invariant**:
   - Every lesson within a curriculum track must synthesize authentic, grammar-specific multiple-choice distractors, BudouX-tokenized sentence reordering drills, and unique Indonesian diagnostic explanations.
   - Strictly forbid boilerplate placeholder distractors (e.g. generic "tugas/jadwal" options, `Jebakan 1/2`, or identical grammar choices cloned across unrelated lessons).
   - All pedagogical verification suites (`test-sprint-*-pedagogy.js`) must enforce cross-lesson diversity assertions, verifying that 100% of lessons feature distinct drill targets and varied dialogue scenarios.

3. **Web Audio Graph Lifecycle & Mobile Audio Safety**:
   - Procedural Web Audio tone synthesizers (pitch accent contours, procedural SFX) must reuse the centralized `getAudioContext()` singleton from `src/lib/audio/sfx.ts`.
   - Always check `isSfxEnabled()` before scheduling playback.
   - Schedule node disconnections (`gain.disconnect()`, `osc.disconnect()`) after sound completion to prevent Web Audio memory leaks and avoid hitting WebKit's hard limit of 4–6 unclosed AudioContext instances on iOS Safari.

4. **Interactive Touch Target Compliance (>= 40px)**:
   - All interactive audio controls, pitch melody buttons, stroke animators, and drill choices must strictly maintain `min-h-[40px]` and `min-w-[40px]` touch targets with `active:scale-95` tactile feedback.
