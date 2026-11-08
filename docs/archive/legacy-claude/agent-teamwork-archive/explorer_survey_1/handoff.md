# Handoff Report — Explorer 1 (Navigation, Layout, Tab 1 Belajar, Tab 4 Sensei AI)

- **Date**: 2026-10-25T05:53:00Z
- **Explorer Identity**: Explorer 1
- **Focus Area**: Navigation & Layout Architecture, Tab 1 (Belajar / Roadmap / Curriculum Pathway), In-Lesson Study Sensei Contextual Helper, Tab 4 (Sensei AI Tutor Room)
- **Target Project Directory**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`
- **Authoritative Request**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\.agents\teamwork\ORIGINAL_REQUEST.md` (R1, R4, R6)

---

## 1. Observation

### 1.1 Baseline System Verification
All baseline verification commands were executed directly against `nugget-nihongo`:
- `node tests/run-sprints-1-to-44.js`: **PASS (44/44 sprint suites passed, 0 regressions)**
- `node tests/test-ssw-priority-architecture.js`: **PASS (6/6 checks passed)**
- `node tests/run.js`: **PASS: 75,987 assertions, 0 failures, 0 skipped**
- `npx tsc --noEmit`: **Exited with code 0 (zero TypeScript compilation errors)**

---

### 1.2 Navigation & Layout Architecture (Topic 1)

#### Files Inspected
- `src/App.tsx` (Lines 1–423)
- `src/components/layout/BottomNav.tsx` (Lines 1–61)
- `src/components/layout/Sidebar.tsx` (Lines 1–150)
- `src/components/layout/Header.tsx` (Lines 1–214)
- `src/components/layout/MobileDrawer.tsx` (Lines 1–317)
- `src/store/useAppStore.ts` (Lines 32–44, 261–269, 295–350)
- `src/lib/ui/navigation.ts` (Lines 1–21)

#### Direct Observations & Verified Code
1. **Active Tab Definition and Type Union**:
   In `src/store/useAppStore.ts` (Lines 34–35):
   ```typescript
   export interface AppState {
     // Navigation & Active View
     activeTab: 'home' | 'materi' | 'quiz' | 'kebun' | 'sensei' | 'settings' | 'about' | 'study' | 'methodology' | 'choukai';
     setActiveTab: (tab: AppState['activeTab']) => void;
     ...
   ```
2. **Tab Transition Engine**:
   In `src/lib/ui/navigation.ts` (Lines 13–20):
   ```typescript
   export function transitionTabChange(
     newTab: AppState['activeTab'],
     setter: (tab: AppState['activeTab']) => void
   ): void {
     withViewTransition(() => {
       setter(newTab);
     });
   }
   ```
3. **URL Hash Synchronization**:
   In `src/App.tsx` (Lines 123–164):
   - Listens to `popstate` and `hashchange` events.
   - Maps `#browse` -> `'materi'`, `#stats` / `#retensi` -> `'kebun'`.
   - Handles `#study?track={trackId}&unit={unitId}&lesson={lessonId}&type={trackType}` by triggering `useAppStore.getState().openLessonStudy(trackId, unitId, lessonId, trackType)`.
   - Valid tab array in `App.tsx` (Line 152):
     `const validTabs = ['home', 'materi', 'quiz', 'kebun', 'sensei', 'settings', 'about', 'study', 'methodology', 'choukai'] as const;`
4. **Current Mobile Bottom Navigation (`BottomNav.tsx`)**:
   In `src/components/layout/BottomNav.tsx` (Lines 14–25):
   ```typescript
   if (activeTab === 'study') {
     return null;
   }

   const items: Array<{ id: AppState['activeTab']; label: string; icon: React.ReactNode }> = [
     { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
     { id: 'materi', label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
     { id: 'quiz', label: 'Kuis', icon: <Layers className="w-5 h-5" /> },
     { id: 'kebun', label: 'Kebun', icon: <Sprout className="w-5 h-5" /> },
     { id: 'sensei', label: 'Sensei', icon: <Sparkles className="w-5 h-5" /> },
   ];
   ```
   Button styling (Line 40):
   `className="flex-1 min-h-[48px] py-1.5 px-1 min-w-0 flex flex-col items-center justify-center rounded-2xl transition-all relative active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ..."`
5. **Desktop Layout Hierarchy (`App.tsx` & `Sidebar.tsx`)**:
   - `Sidebar.tsx` renders a fixed left navigation rail at width `260px` (`hidden lg:flex w-[260px] fixed left-0 top-0`).
   - Main content container in `App.tsx` (Line 259) offsets content:
     `className="flex-1 lg:pl-[260px] flex flex-col min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 w-full max-w-full min-w-0 overflow-x-hidden"`
   - `Header.tsx` is sticky at top (`sticky top-0 z-30`).
6. **Strict Historical Test Assertions on Navigation**:
   - `tests/test-sprint-12-features.js` (Lines 54–60):
     ```javascript
     assert(navContent.includes("id: 'home'"), 'BottomNav must include home tab');
     assert(navContent.includes("id: 'materi'"), 'BottomNav must include materi tab');
     assert(navContent.includes("id: 'quiz'"), 'BottomNav must include quiz tab');
     assert(navContent.includes("id: 'kebun'"), 'BottomNav must include kebun tab');
     assert(navContent.includes("id: 'sensei'"), 'BottomNav must include sensei tab');
     assert(navContent.includes('Sprout'), 'BottomNav must import and use Sprout icon for kebun');
     assert(navContent.includes('active:scale-95'), 'BottomNav buttons must feature active tactile feedback');
     ```
   - `tests/test-sprint-10-ergonomics.js` (Lines 169–172):
     ```javascript
     assert(bottomNavContent.includes("if (activeTab === 'study')"), 'Must check activeTab === study');
     assert(bottomNavContent.includes("return null;"), 'Must return null during study mode');
     ```
   - `tests/test-sprint-42-animations-motion.js` (Lines 116–117):
     ```javascript
     assert(bottomNav.includes('transitionTabChange(item.id, setActiveTab)'), 'BottomNav must use transitionTabChange');
     ```
   - `tests/test-sprint-21-a11y.js` (Lines 60–77):
     Checks `role="navigation"`, `aria-current={isActive ? 'page' : undefined}`, and `focus-visible:ring-2 focus-visible:ring-accent`.

---

### 1.3 Tab 1 (Belajar / Roadmap / Curriculum Pathway) (Topic 2)

#### Files Inspected
- `src/pages/HomePage.tsx` (Lines 82–320)
- `src/pages/MateriHubPage.tsx` (Lines 40–44, 242–360)
- `src/components/materi/CurriculumTrackBrowser.tsx` (Lines 37–57, 105–258, 384–650, 1043–1180, 1300–1450)
- `src/lib/curriculum/curriculumStore.ts` (Lines 12–57, 65–93, 193–285)
- `src/lib/data/dataManager.ts` (Lines 441–480)

#### Direct Observations & Verified Code
1. **Current Component Rendering the Curriculum Roadmap**:
   - The interactive learning pathway is currently rendered by `<CurriculumTrackBrowser />` (`src/components/materi/CurriculumTrackBrowser.tsx`).
   - In the existing architecture, this component is buried inside `MateriHubPage.tsx` (Lines 349–360):
     ```tsx
     {/* ── STUDIO 3: KURIKULUM & KAMUS HUB ── */}
     {activeStudio === 'kurikulum' && kurikulumSub === 'spiral' && (
       <CurriculumTrackBrowser
         vocabList={vocabList}
         grammarList={grammarList}
         onSelectItem={(item, type) => {
           openDetailModal(item, type);
         }}
         onNavigateToQuiz={() => {
           useAppStore.getState().setActiveTab('quiz');
         }}
       />
     )}
     ```
   - On `HomePage.tsx`, there are only summary cards (`grammarTracks`, `vocabTracks`, `sswTracks`). Clicking one invokes `handleNavigateCurriculum(trackId)` (Line 209), which calls `setActiveTrack(trackId)` and changes `activeTab` to `'materi'`, leaving the user in the 3-studio hub.
2. **Track Switching Architecture (JLPT N5–N1 & SSW Vocational Sectors)**:
   - State: Managed in `useCurriculumStore` (`src/lib/curriculum/curriculumStore.ts`):
     - `activeTrackId: TrackId` (defaults to `'n5'`, stored in `localStorage.nn_active_curriculum_track`).
     - `setActiveTrack: (trackId: TrackId) => void`.
   - Supported tracks (`TrackId` union):
     - JLPT: `'n5' | 'n4' | 'n3' | 'n2' | 'n1'`
     - 19 SSW Sectors: `'ssw-kaigo'`, `'ssw-food'`, `'ssw-construction'`, `'ssw-agriculture'`, `'ssw-accommodation'`, `'ssw-building-cleaning'`, plus 13 coming-soon sectors (`ssw-manufacturing`, etc.).
     - JFT & Life: `'jft-a1'`, `'jft-a2'`, `'seikatsu'`.
     - 9 Textbook Tracks: `'book-genki'`, `'book-minna'`, `'book-soumatome'`, etc.
   - Current switcher location:
     - On desktop: Inside `CurriculumTrackBrowser.tsx` (Lines 453–504) via 3 category tabs (`Jalur JLPT`, `Jalur Kerja SSW`, `JFT & Hidup di Jepang`), followed by a horizontal scrolling track pill ribbon (Lines 519–650).
     - On mobile: A card (Lines 390–427) with a track button that opens `isMobileTrackPickerOpen = true` (Lines 1305–1450), rendering a modal bottom sheet to select tracks across categories.
3. **Can-Do Descriptor Display**:
   - Unit-level Can-Do:
     In `CurriculumTrackBrowser.tsx` (Lines 1046–1055):
     ```tsx
     {/* Can-Do Statement Card */}
     <div className="bg-surface-2/90 border border-accent/20 rounded-2xl p-4 space-y-1.5">
       <div className="flex items-center gap-1.5 text-xs font-bold text-appText-bright">
         <span className="text-sm">🎯</span>
         <span>Target Kemampuan Nyata (Sasaran Can-Do):</span>
       </div>
       <p className="text-xs text-appText leading-relaxed break-words">
         {unit.can_do_summary}
       </p>
     </div>
     ```
   - Lesson-level Can-Do:
     In `CurriculumTrackBrowser.tsx` (Lines 1141–1146):
     ```tsx
     {lesson.can_do_statement && (
       <div className="text-[11px] text-accent-hot font-medium flex items-start gap-1 mt-1">
         <span>🎯</span>
         <span className="break-words">Can-Do: {lesson.can_do_statement}</span>
       </div>
     )}
     ```
   - Study Page Stage 4 Can-Do:
     In `LessonStudyPage.tsx` (Lines 344–351), Stage 4 renders `<CanDoCompletionStage />`, which presents the real-world communication challenge (`CanDoChallenge`), model dialogue responses, and rubric validation.
4. **Next Uncompleted Lesson Determination & Primary Action Button**:
   - Current logic on `HomePage.tsx` (Lines 285–311):
     Reads `lastStudiedLesson` from `useAppStore` (`nn_last_studied_lesson`):
     ```tsx
     <button
       onClick={() => {
         if (lastStudiedLesson) {
           openLessonStudy(
             lastStudiedLesson.trackId,
             lastStudiedLesson.unitId,
             lastStudiedLesson.lessonId
           );
         } else {
           openLessonStudy('n5', 'n5-u1', 'n5-l1');
         }
       }}
     >
       {/* Button text: 'Mulai Belajar · Bab 1 (N5)' or 'Lanjut Belajar · ...' */}
     </button>
     ```
   - Limitation observed: If the user finished that lesson, `lastStudiedLesson` still points to the already-completed lesson rather than advancing to the next uncompleted node.
   - In `LessonStudyPage.tsx` (Lines 162–189), `findNextLesson()` scans `currentUnit.lessons` and subsequent units to find the immediate successor, but this is only triggered inside the lesson completion view.
   - In `curriculumStore.ts` (Lines 58–63, 223–225), completed lesson IDs are stored in `trackProgress[trackId].completedLessons: string[]`.

---

### 1.4 In-Lesson Study & Sensei AI Contextual Helper (R4) (Topic 3)

#### Files Inspected
- `src/pages/LessonStudyPage.tsx` (Lines 32–122, 149–160, 314–353)
- `src/components/curriculum/player/MicroDrillStage.tsx` (Lines 17–121)
- `src/components/sensei/ContextualSenseiSheet.tsx` (Lines 26–140)
- `src/store/useAppStore.ts` (Lines 135–152, 693–694)
- `src/App.tsx` (Lines 414–418)

#### Direct Observations & Verified Code
1. **Component Architecture of `LessonStudyPage.tsx`**:
   - Manages four distinct sequential stages via `activeStage: 'dialogue' | 'explanation' | 'drills' | 'cando'` (Line 36).
   - Stage 1: `<DialogueStage />` (`src/components/curriculum/player/DialogueStage.tsx`)
   - Stage 2: `<ExplanationStage />` (`src/components/curriculum/player/ExplanationStage.tsx`)
   - Stage 3: `<MicroDrillStage />` (`src/components/curriculum/player/MicroDrillStage.tsx`)
   - Stage 4: `<CanDoCompletionStage />` (`src/components/curriculum/player/CanDoCompletionStage.tsx`)
2. **Quiz State Management in `MicroDrillStage.tsx`**:
   In `src/components/curriculum/player/MicroDrillStage.tsx` (Lines 18–29):
   ```typescript
   // Antrean soal aktif (mendukung retry loop untuk soal yang salah)
   const [activeQueue, setActiveQueue] = useState<LessonDrillItem[]>(drills);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
   const [reorderedTokens, setReorderedTokens] = useState<string[]>([]);
   const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

   // Statistik
   const [firstAttemptCorrect, setFirstAttemptCorrect] = useState<Record<string, boolean>>({});
   const [retryQueue, setRetryQueue] = useState<LessonDrillItem[]>([]);
   const [isFinished, setIsFinished] = useState(false);
   ```
   - Crucial detail: The quiz state is held purely in local React `useState` hooks inside `MicroDrillStage`.
   - If `LessonStudyPage` or `MicroDrillStage` unmounts or changes route, this state resets.
3. **Existing Sensei Contextual Sheet (`ContextualSenseiSheet.tsx`)**:
   - Mounted globally at root in `src/App.tsx` (Lines 414–418):
     ```tsx
     {/* Context-Injected Sensei Studio Bottom Sheet */}
     <ModalErrorBoundary modalName="Sensei AI Studio">
       <ContextualSenseiSheet />
     </ModalErrorBoundary>
     ```
   - Controlled by `useAppStore`:
     ```typescript
     isSenseiSheetOpen: boolean;
     senseiSheetContext: {
       id: string;
       type: 'grammar' | 'vocab' | 'quiz' | 'kanji';
       level: string;
       target: string;
       meaning_id?: string;
       structure?: string;
       exampleJa?: string;
       exampleId?: string;
     } | null;
     openSenseiSheet: (ctx) => void;
     closeSenseiSheet: () => void;
     ```
   - Already used inside `ExplanationStage.tsx` (Lines 144–151) and `KanjiStrokeModal.tsx` (Line 68).
4. **Non-Destructive Sheet Integration Proof**:
   - Because `ContextualSenseiSheet` is rendered at the root level of `App.tsx` as a fixed slide-over / bottom sheet overlay (`fixed inset-0 z-50`), toggling `isSenseiSheetOpen` via `openSenseiSheet(...)` and `closeSenseiSheet()` does **NOT** unmount `LessonStudyPage` or `MicroDrillStage`.
   - The user can tap a Sensei helper icon, ask questions or review explanations, and dismiss the sheet. The underlying quiz questions, current token order, selected answer, and score tracking remain 100% intact.

---

### 1.5 Tab 4 (Sensei AI Tutor Room) (Topic 4)

#### Files Inspected
- `src/pages/SenseiPage.tsx` (Lines 1–545)
- `src/lib/ai/senseiClient.ts` (Lines 1–160, 400–435)
- `src/lib/ai/senseiMemory.ts` (Lines 1–130)

#### Direct Observations & Verified Code
1. **Component Structure**:
   `SenseiPage.tsx` implements the dedicated conversational AI tutor room.
2. **Personas Supported**:
   - `'sensei_nugget'`: Direct senpai, dry wit, SLA insights, concise answers, emoji cap 1 (🍵).
   - `'senpai_aoi'`: Warm, patient, gentle encouragement, everyday life analogies (🌸).
3. **Three Core Modes**:
   - `'explain'`: Grammar and nuance breakdown. Preconfigured prompts include differences between ～わけではない vs ～とは限らない, は vs が, そうです vs ようです vs らしい, and ～てしまう/ちゃう.
   - `'roleplay'`: Situational conversation practice. Preconfigured scenarios: 🍜 Pesan Ramen, 🏪 Kasir Konbini, 🚉 Stasiun Kereta, 💼 Wawancara Baito.
   - `'correct'`: Writing composition and sentence correction (添削) with natural phrasing suggestions.
4. **Chat History Persistence & Lifecycle**:
   - History is partitioned per mode in `localStorage`: `nn_sensei_history_explain`, `nn_sensei_history_roleplay`, `nn_sensei_history_correct`.
   - Handled via `loadChatHistory(mode)`, `saveChatHistory(mode, messages)`, and `clearChatHistory(mode)` in `senseiClient.ts` (Lines 405–434).
   - Messages are trimmed to the last 40 entries to prevent memory bloating.
   - Non-blocking confirmation modal (`isClearConfirmOpen`, Lines 500–541) prevents accidental history loss.
5. **Intelligent Memory Layer (`senseiMemory.ts`)**:
   - Implements Mem0-inspired SLA memory under `localStorage.nugget_sensei_mem0_memory_v1`.
   - Categorizes memories into `'goal' | 'weak_point' | 'preference' | 'mastered_concept'`.
   - Injects relevant memories into the Gemini system prompt (`formatMemoriesForPrompt()`).
6. **Voice Audio & Suggested Actions**:
   - Speech synthesis for Japanese sentences is provided via `speakPersona(content, persona, ...)` and `stopPersonaVoice()`.
   - Bot messages support `suggestedAction` affordance (Lines 413–420) that can deep-link into quizzes (`handleSuggestedAction`).

---

## 2. Logic Chain

```
Observation 1.1: All 44 sprint test suites pass; 75,987 assertions pass; zero typecheck errors.
Observation 1.2.6: tests/test-sprint-12-features.js specifically checks for `id: 'home'`, `id: 'materi'`, `id: 'quiz'`, `id: 'kebun'`, `id: 'sensei'` in BottomNav.tsx.
Observation 1.2.6: tests/test-sprint-10-ergonomics.js checks `if (activeTab === 'study') return null;` in BottomNav.tsx.
Observation 1.2.6: tests/test-sprint-42-animations-motion.js checks `transitionTabChange(item.id, setActiveTab)` in BottomNav.tsx.
Observation 1.2.6: tests/test-sprint-21-a11y.js checks `role="navigation"` and `focus-visible:ring-2 focus-visible:ring-accent`.
Observation 1.3.1: CurriculumTrackBrowser is currently deeply nested inside MateriHubPage (kurikulum -> spiral).
Observation 1.3.2: activeTrackId is stored in useCurriculumStore; supports JLPT N5-N1, 19 SSW sectors, JFT, and Books.
Observation 1.3.4: HomePage only uses lastStudiedLesson and does not calculate the first uncompleted lesson node.
Observation 1.4.2 & 1.4.4: MicroDrillStage maintains quiz state in local useState; ContextualSenseiSheet is mounted globally in App.tsx.
Observation 1.5.4: SenseiPage and senseiClient already provide full-featured persona, roleplay, and persistent chat history.
```

### Derivations & Inferences:
1. **Navigation Facade Pattern (R1 & R6)**:
   - To deliver the 5-tab core architecture (Tab 1: Belajar, Tab 2: Review, Tab 3: Dojo & Pustaka, Tab 4: Sensei AI, Tab 5: Profil & Pengaturan) while ensuring `test-sprint-12-features.js` and other historical test suites remain 100% green:
     - `BottomNav.tsx` must retain the exact token identifiers or backwards-compatible facade mappings (`id: 'home'`, `id: 'materi'`, `id: 'quiz'`, `id: 'kebun'`, `id: 'sensei'`).
     - Specifically, Tab 1 Belajar can map to `'home'` (or a unified view rendering the pathway-first curriculum), Tab 2 Review maps to `'kebun'` / `'quiz'`, Tab 3 Dojo & Pustaka maps to `'materi'`, Tab 4 maps to `'sensei'`, and Tab 5 Profil/Pengaturan can be accessible via Header account button or a designated 5th tab slot while keeping legacy IDs in a declared constant or alias list.
     - Crucially, `BottomNav.tsx` must keep `if (activeTab === 'study') return null;`, `transitionTabChange(item.id, setActiveTab)`, `active:scale-95`, and `role="navigation"`.
2. **Pathway-First Tab 1 Belajar Architecture (R1)**:
   - Instead of routing users to `MateriHubPage` and making them navigate through studios, Tab 1 should directly present the learner's active track roadmap using `<CurriculumTrackBrowser />`.
   - The prominent action button ("Mulai Belajar Hari Ini" / "Lanjutkan Pelajaran") must be upgraded from naively checking `lastStudiedLesson` to dynamically identifying the **first uncompleted lesson** in `trackProgress[activeTrackId].completedLessons`.
   - The top header of Tab 1 should embed the active track switcher (`[🇯🇵 N5: Fondasi Dasar ▼]`), invoking `isMobileTrackPickerOpen` or an equivalent non-destructive sheet that updates `activeTrackId` in `useCurriculumStore`.
   - Can-Do descriptors from `unit.can_do_summary` and `lesson.can_do_statement` are already present in the data schema and rendered by `CurriculumTrackBrowser.tsx`, making direct promotion to Tab 1 clean and natural.
3. **Non-Destructive In-Lesson Sensei Sheet (R4)**:
   - Since `ContextualSenseiSheet` is already mounted at the root in `App.tsx` and operated via `openSenseiSheet` in `useAppStore`, adding a contextual Sensei button in `LessonStudyPage.tsx` (both in the top header and beside drill prompts) will open the sheet without triggering a component unmount of `MicroDrillStage`.
   - When the user closes the sheet, the quiz state (`activeQueue`, `currentIndex`, `selectedAnswer`, `reorderedTokens`) remains completely undisturbed.
4. **Tab 4 Sensei AI Room (R4)**:
   - `SenseiPage.tsx` already contains complete implementations for persona selection, 3 modes, voice audio, and Mem0 memory integration.
   - It is already fully isolated, accessible as an active tab (`activeTab === 'sensei'`), and complies with responsive constraints and WCAG guidelines.

---

## 3. Caveats

1. **Areas Not Investigated**:
   - Deep inspection of Tab 2 (Kebun FSRS garden merge) and Tab 3 (Dojo & Pustaka 3-cluster catalog) was deferred to Explorer 2 to avoid duplicate exploration overhead.
   - Database schema changes in Supabase were not explored because the task is strictly read-only local architecture mapping.
2. **Assumptions Made**:
   - We assume `CurriculumTrackBrowser.tsx` remains the authoritative roadmap component since `tests/test-ssw-priority-architecture.js` asserts directly on its internal variables (`activeTracks`, `comingSoonTracks`, `constructionSubTrack`, `comingSoonModalData`). Moving or renaming this component without keeping the source file in place would break Check 1–4 of `test-ssw-priority-architecture.js`.
3. **Alternative Interpretations Considered**:
   - *Alternative 1*: Replace `activeTab` union with `belajar | review | dojo | sensei | profile`.
     - *Risk*: Would break `test-sprint-12-features.js`, `test-sprint-8-sessions.js`, `test-sprint-21-a11y.js`, and URL hash deep linking across historical user bookmarks.
     - *Preferred Resolution*: Use an architectural facade where `'home'` is branded/rendered as Belajar, `'kebun'` as Review, `'materi'` as Dojo & Pustaka, `'sensei'` as Sensei AI, and `'settings'` as Profil & Pengaturan.

---

## 4. Conclusion

1. **Navigation**:
   - The navigation system is driven by `useAppStore.activeTab`, transitioned smoothly with `transitionTabChange` (View Transitions API), and synchronized with browser URL hashes.
   - To achieve the 5-Tab LMS transformation without regression, implement an additive facade that maps:
     - Tab 1: Belajar (`'home'`)
     - Tab 2: Review (`'kebun'`)
     - Tab 3: Dojo & Pustaka (`'materi'`)
     - Tab 4: Sensei AI (`'sensei'`)
     - Tab 5: Profil & Pengaturan (`'settings'`)
   - Preserve all existing IDs, Sprout icon imports, and `activeTab === 'study'` return-null checks in `BottomNav.tsx` to keep historical sprint tests green.
2. **Tab 1 Belajar / Roadmap**:
   - Elevate `<CurriculumTrackBrowser />` directly into Tab 1 as the default primary view.
   - Implement a dynamic `getNextUncompletedLesson(trackId, trackData, trackProgress)` function that scans for the first uncompleted lesson in the active track, powering the "Mulai Belajar Hari Ini" / "Lanjutkan Pelajaran" zero-friction primary CTA.
   - Maintain the active track switcher sheet at the top header (`[🇯🇵 N5: Fondasi Dasar ▼]`), ensuring instantaneous switching between JLPT levels and SSW sectors without modal stacking.
3. **In-Lesson Study & Sensei Helper**:
   - `LessonStudyPage` quiz state is held locally in `MicroDrillStage`.
   - Expose an `openSenseiSheet` helper trigger inside `LessonStudyPage.tsx` header and question cards. Because `ContextualSenseiSheet` is mounted at the root in `App.tsx`, opening and closing it does not unmount or reset the quiz state.
4. **Tab 4 Sensei AI**:
   - `SenseiPage.tsx` is completely built, feature-rich, and ready to serve as the full-page Tab 4 AI tutor room. It already supports dual personas, 3 modes, audio speech playback, and Mem0 long-term memory.

---

## 5. Verification Method

To independently verify these architectural findings, run the following commands from `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`:

1. **Verify All 44 Historical Sprint Test Contracts**:
   ```powershell
   node tests/run-sprints-1-to-44.js
   ```
   *Expected Output*: `🏆 ALL 44/44 SPRINT SUITES PASSED WITH ZERO REGRESSIONS!`

2. **Verify SSW Priority Architecture & Cloud Sync Contracts**:
   ```powershell
   node tests/test-ssw-priority-architecture.js
   ```
   *Expected Output*: `🎉 ALL SSW PRIORITY & CLOUD SYNC ARCHITECTURE CHECKS PASSED WITH 100% GREEN STATUS!`

3. **Verify Master Unit & Data Assertions (75,987 checks)**:
   ```powershell
   node tests/run.js
   ```
   *Expected Output*: `PASS: 75987 | FAIL: 0 | SKIP: 0`

4. **Verify TypeScript Type Integrity**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected Output*: Exits with code 0, no errors.

5. **Files to Inspect for Structural Verification**:
   - `src/components/layout/BottomNav.tsx`: Lines 14–25 (Active tab study hide & 5-tab items).
   - `src/components/materi/CurriculumTrackBrowser.tsx`: Lines 1046–1055 (Can-Do unit card) and Lines 1141–1146 (Can-Do lesson badge).
   - `src/pages/LessonStudyPage.tsx`: Lines 36, 149–160, 314–353 (4-stage stepper and quiz integration).
   - `src/components/sensei/ContextualSenseiSheet.tsx`: Lines 26–76 (Root-mounted contextual sheet).
   - `src/pages/SenseiPage.tsx`: Lines 83–130, 270–306 (Tab 4 tutor room personas and modes).
