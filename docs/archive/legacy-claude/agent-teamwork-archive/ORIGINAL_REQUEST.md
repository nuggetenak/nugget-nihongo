# Original User Request

## 2026-10-25T05:29:20Z

Comprehensive UI/UX, Information Architecture (IA), and navigation overhaul for Nugget Nihongo: transform the current feature sprawl and modal stacking into a coherent, pathway-first Japanese Learning Management System built around a 5-tab core architecture for Indonesian learners.

Working directory: c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo
Integrity mode: development

## Requirements

### R1. Guided Daily Mission & Pathway-First Navigation (Tab 1: Belajar)
- Deliver a dedicated learning pathway interface that presents the learner's active track roadmap (JLPT N5–N1 or active SSW vocational sector) with clear visual milestones and Can-Do descriptors.
- Provide a prominent, zero-friction primary action button ("Mulai Belajar Hari Ini" / "Lanjutkan Pelajaran") that opens the next uncompleted lesson node without requiring nested studio navigation.
- Implement a non-destructive active track switcher sheet at the top header (`[🇯🇵 N5: Fondasi Dasar ▼]`) allowing seamless switching between JLPT levels and active SSW tracks.

### R2. Dual-Card Review & Garden Retention Hub (Tab 2: Review)
- Consolidate long-term memory retrieval (FSRS Spaced Repetition flashcards) and gamified garden progression (Kebun Nihongo) into a unified retention hub.
- Display current plant growth status and collected water drops (💧) in the top card, and the critical memory review trigger ("Mulai Ulas X Kartu Due") in the middle card.
- Award water drops upon completion of the FSRS review session and immediately enable one-tap plant watering on the same screen without page navigation.
- Provide secondary access to optional practice drills (quick quiz, grammar patterns, particles) below the primary review card.

### R3. Consolidated Dojo & Pustaka Catalog (Tab 3: Dojo & Pustaka)
- Eliminate floating modal stacking by creating a single, beautifully categorized tools and reference library page organized into 3 distinct clusters:
  1. **Core Skills (Latihan Keterampilan)**: Kanji Dojo & Stroke Animator, Choukai CBT Simulator, Pitch Accent Studio, and Adaptive Placement Test (CAT).
  2. **Grammar & Culture Lab (Laboratorium Bahasa & Budaya)**: Keigo Business Trainer, Counter Simulator (助数詞), Verb Conjugation Engine, Nuance Inspector, and 376+ Kotowaza Gallery.
  3. **Reference Library (Pustaka Referensi)**: Interactive Kana Chart (Hiragana & Katakana audio) and Standard Textbooks (Minna no Nihongo, Genki, Irodori).
- Each tool must open in a clean, dedicated sub-view or focused sheet with an explicit back button returning to the Dojo catalog.

### R4. Dedicated AI Tutor & In-Lesson Contextual Sheet (Tab 4: Sensei AI)
- Maintain a full-featured conversational AI tutor room in Tab 4 for freeform Japanese discussion, situational roleplay, and grammatical inquiry.
- Embed a non-intrusive contextual Sensei helper icon inside active lesson study screens (`LessonStudyPage`) that opens a lightweight bottom sheet to explain difficult sentences or sentence structures without resetting quiz state or losing lesson progress.

### R5. Profile, Cloud Sync, & L1 Dialect Hub (Tab 5: Profil & Pengaturan)
- Provide a centralized hub for account management, live Supabase cloud sync status (using `SyncStatusPill`), streak history, and total XP.
- Expose L1 Substratum dialect preferences (Bahasa Indonesia, Jawa, Sunda, dll.) and application preferences (Furigana toggle, Romaji toggle, speech rate, audio sound effects) with immediate local persistence.

### R6. Non-Destructive Facade & Backward Compatibility Guardrails
- Preserve existing state stores (`useAppStore`, `useCurriculumStore`, `useGardenStore`, `useAuthStore`) and IndexedDB data schemas without breaking changes.
- Ensure all 44 cumulative sprint test suites and the master regression runner remain 100% green without disabling or modifying any test assertions.
- Maintain responsive layout constraints across all target viewports (375px, 390px, 768px, 1440px) with 0px horizontal overflow, $\ge 40\times 40\text{px}$ touch targets, and safe area padding for bottom navigation.

## Acceptance Criteria

### Automated Regression & Type Integrity
- [ ] `npx tsc --noEmit` exits with code 0 (zero TypeScript compilation errors).
- [ ] `node tests/run.js` passes all 75,987+ assertions with 0 failures and 0 skips.
- [ ] `node tests/run-sprints-1-to-44.js` executes all 44 historical sprint test suites with 100% green status.
- [ ] `node tests/test-ssw-priority-architecture.js` passes all 6 verification checks.

### Responsive UI & Anti-Leakage Constraints
- [ ] `node tests/verify-frontend-responsive.js` passes 100% of checks across iPhone SE (375x667), Standard Mobile (390x844), iPad (768x1024), and Desktop Wide (1440x900) with 0px horizontal page overflow.
- [ ] All interactive touch targets (buttons, switcher pills, cards) maintain minimum dimensions of $\ge 40\times 40\text{px}$ with active touch feedback.
- [ ] Mobile bottom navigation cushion maintains `pb-[calc(5.5rem+env(safe-area-inset-bottom))]` preventing content occlusion.

### Production Bundle Performance Budget
- [ ] `npm run build:vite` succeeds without errors.
- [ ] `node scripts/verify-bundle-budget.js` verifies that every generated JavaScript chunk strictly remains $\le 500\text{ kB}$.
