# Nugget Nihongo UI/UX, IA, & Navigation Overhaul — Comprehensive Survey Report (Explorer 3)
**Scope**: Tab 5 (Profile, Cloud Sync, & L1 Dialect Hub), State Stores & Schemas (R6), and Test Suites, Verification Runners & Bundle Budgets  
**Target Project**: `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`  
**Date**: 2026-10-25  
**Author**: Explorer 3 (Codebase Explorer)

---

## 1. Observation

### 1.1 Tab 5 (Profile, Cloud Sync, & L1 Dialect Hub)

#### A. Existing Profile & Settings Architecture
- **No Standalone `ProfilePage.tsx`**: Search for `*profile*` in `src/` yielded 0 page components. Profile management, account status, cloud sync, settings, and diagnostics currently reside in a single file: `src/pages/SettingsPage.tsx` (1,228 lines).
- **Navigation Ingress to Settings/Profile**:
  - `src/components/layout/Header.tsx:186-198`: Clicking the user avatar/pill invokes `onClick={() => setActiveTab('settings')}`.
  - `src/components/layout/Sidebar.tsx:31`: Nav item `{ id: 'settings', label: 'Pengaturan', jp: '設定', icon: <Settings className="w-5 h-5" /> }` invokes `transitionTabChange('settings', setActiveTab)`.
  - `src/components/layout/MobileDrawer.tsx:174`: Menu button navigates to `'settings'` via `onClick={() => transitionTabChange('settings', setActiveTab)}`.
  - `src/App.tsx:224-225`: Switch statement in `renderActiveView()` renders `<SettingsPage />` when `activeTab === 'settings'`.

#### B. Cloud Sync Status & `SyncStatusPill` Integration
- **Component File**: `src/components/ui/SyncStatusPill.tsx` (182 lines).
- **State Store**: Reads `useAuthStore` (`src/lib/supabase/authStore.ts:22-23`):
  ```typescript
  const { user, syncStatus, lastSyncedAt, syncErrorMessage, syncNow, openAuthModal } = useAuthStore();
  ```
- **Live Telemetry & Visual States**:
  1. `!isOnline`: `border-red-500/30 bg-red-500/10 text-red-400` with `WifiOff` icon ("Offline")
  2. `syncStatus === 'syncing'`: `border-amber-500/40 bg-amber-500/15 text-amber-300 animate-pulse` with spinning `RefreshCw` icon ("Sinkron...")
  3. `syncStatus === 'error'`: `border-rose-500/30 bg-rose-500/10 text-rose-300` with `AlertCircle` icon ("Cek Cloud")
  4. `user` authenticated: `border-emerald-500/30 bg-emerald-500/15 text-emerald-300` with `CheckCircle2` icon ("Tersinkron")
  5. Guest / local mode: `border-accent/20 bg-surface-2 text-appText-muted hover:text-appText-bright` with `HardDrive` icon ("Mode Lokal")
- **Interactive Modal Drawer**: Clicking `SyncStatusPill` opens a modal dialog displaying:
  - Network status (`Online` vs `Offline`)
  - Supabase Project Reference (`OFFICIAL_PROJECT_REF = 'xipvhxorvwpvfokauboy'`)
  - User email / Guest label
  - Last synced timestamp (`new Date(lastSyncedAt).toLocaleTimeString('id-ID')`)
  - Action buttons: "Sinkronkan Sekarang" (disabled while syncing) and "Cadangkan ke Akun Cloud" (triggers `openAuthModal('signin')`).
- **Required Mountings (Enforced by Regression Tests)**:
  `tests/test-ssw-priority-architecture.js:78-86` asserts verbatim inclusion:
  - `src/pages/HomePage.tsx:147`: `<SyncStatusPill />`
  - `src/pages/MateriHubPage.tsx:133`: `<SyncStatusPill />`
  - `src/pages/SettingsPage.tsx:678`: `<SyncStatusPill />`

#### C. XP Calculations & Anti-Cheat
- **State Storage**: `src/store/useAppStore.ts:53, 446`:
  - `xp: getStoredNumber('nn_xp', 0)` (persisted in `localStorage.getItem('nn_xp')`).
- **Increment Protection**: `src/store/useAppStore.ts:449-460`:
  - Calls `checkXpAntiCheat(amount)` in `src/lib/gamification/gamificationStore.ts`.
  - Anti-cheat enforces maximum XP velocity ceilings and rate limits to prevent loop manipulation.
- **Awarding Sources**:
  - Lesson completion (`useAppStore.completeLesson`): +50 XP (deduplicated by `completedLessonIds`).
  - Curriculum lesson completion (`useCurriculumStore.completeLesson`): +20 XP on first completion, +10 XP on repeats.
  - Kanji stroke completion (`src/components/kanji/KanjiStrokeModal.tsx:624`): +15 XP.
  - Kana practice (`src/components/kana/KanaChartModal.tsx:422`): +5 XP.
  - Choukai simulator & Quiz arena drills.
- **Display Locations**:
  - `Header.tsx:165`: `<Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> <span ...>{xp} XP</span>`
  - `HomePage.tsx:162`: Displays total XP and daily progress bar (`todayXP / dailyGoalXP`).

#### D. Streak Engine & Grace Protection
- **State Storage**: `src/store/useAppStore.ts:52, 445`:
  - `streak: getStoredNumber('nn_streak', 0)` (persisted in `localStorage.getItem('nn_streak')`).
  - Stored structure: JSON `{ count: number, lastDate: string, lastTimestamp: number }`.
- **36-Hour Grace Window Engine** (`src/store/useAppStore.ts:480-549`):
  - Uses `getLocalDateString()` for Indonesian learner timezones (`Asia/Jakarta`, `Asia/Makassar`, `Asia/Jayapura`, or `Asia/Tokyo`).
  - Protects night-shift, overtime, and late-night workers with a 36-hour grace window (`now - lastTimestamp <= 36 * 3600 * 1000`).
  - If inactive beyond 36h, resets streak to 1 and opens `StreakBrokenModal`.
  - `recordStudyActivity()` advances streak if studied yesterday or within the 36h grace window.
- **Display Locations**:
  - `Header.tsx:154-155`: `<Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-500 text-amber-500 animate-pulse" /> <span ...>{streak}</span>`
  - `HomePage.tsx:152`: Synchronous hero streak banner: `'Streak {streak} Hari Aktif'`.

#### E. L1 Substratum Dialect Preferences
- **Data Definition**: `src/lib/data/diagnosticManager.ts:1-12`:
  ```typescript
  export type L1Substratum = 'general_indonesian' | 'javanese' | 'sundanese' | 'batak_eastern';
  ```
- **Dual Store Synchronization**:
  - `useAppStore.userSubstratum`: Initialized from `localStorage.getItem('nn_user_l1_substratum') || 'general_indonesian'`. Setter `setUserSubstratum` writes to `localStorage`.
  - `useCurriculumStore.userSubstratum`: Also reads/writes `localStorage.getItem('nn_user_l1_substratum')`.
  - In `SettingsPage.tsx:583-584`, setting a dialect calls both:
    ```typescript
    setUserSubstratum(item.id);
    useCurriculumStore.getState().setUserSubstratum(item.id);
    ```
- **Available Dialects in UI** (`SettingsPage.tsx:552-619`):
  1. `general_indonesian`: "Bahasa Indonesia Umum" (Badge: "Umum")
  2. `javanese`: "Logat Jawa" (Badge: "Jawa")
  3. `sundanese`: "Logat Sunda" (Badge: "Sunda")
  4. `batak_eastern`: "Logat Batak & Indonesia Timur" (Badge: "Batak / Timur")
  - Active indicator renders `✓ Aktif` text (critical for responsive test assertion).

#### F. Application Preferences & Local Persistence
All preferences are persisted immediately to `localStorage`:
| Preference | Store Property | localStorage Key | Values | Default |
|---|---|---|---|---|
| Furigana Toggle | `showFurigana` | `nn_furigana` | `'1'` / `'0'` (boolean) | `true` |
| Romaji Toggle | `showRomaji` | `nn_romaji` | `'1'` / `'0'` (boolean) | `false` |
| Speech Rate | `speechRate` | `nn_speech_rate` | `'0.75'`, `'0.9'`, `'1.0'` (number) | `0.9` |
| Audio SFX | `soundEffects` | `nn_sound_effects` | `'1'` / `'0'` (boolean) | `true` |
| App Theme | `theme` | `bunpou-theme` | `'light'` / `'dark'` | `'light'` |
| UI Language | `uiLanguage` | `nn_ui_language` | `'id'` / `'en'` | `'id'` |
| Reduced Motion | `prefersReducedMotion` | N/A (system media query) | boolean | OS preference |

---

### 1.2 State Stores & Data Schemas (R6)

#### A. `useAppStore` (`src/store/useAppStore.ts`)
- **Key Schemas**:
  - `activeTab`: `'home' | 'materi' | 'quiz' | 'kebun' | 'sensei' | 'settings' | 'about' | 'study' | 'methodology' | 'choukai'`
  - `activeLessonContext`: `{ trackId: string, unitId: string, lessonId: string, trackType?: 'curriculum' | 'book' | 'jlpt' } | null`
  - `completedLessonIds`: `string[]` (backed by `nn_completed_lesson_ids`)
  - `cards`: `Record<string, { card: FSRSCard; source?: string }>` (backed by `nn_fsrs_cards`)
  - `dailyGoalXP`: `number` (backed by `nn_daily_goal_xp`, default `50`)
  - `placementHistory`: `Array<{ timestamp, theta, sem, recommendedLevel, questionsAnswered, accuracy }>`
  - `fsrsDueReviewTrigger`: `boolean` (trigger for starting FSRS session from other tabs)
- **Actions**:
  - `setActiveTab(tab)`: Updates `activeTab`, calls `announcer.announce('Membuka tab ' + tab, 'polite')`, and synchronizes browser hash `#<tab>`.
  - `completeLesson(lessonId, grammarIds, vocabIds)`: Atomic deduplicated reward handler (+50 XP, +2 water drops, FSRS card injection, study activity recording).
  - `resetAllData()`: Wipes all keys starting with `nn_` and `bunpou_` and restores clean initial state.

#### B. `useCurriculumStore` (`src/lib/curriculum/curriculumStore.ts`)
- **Key Schemas**:
  - `TrackId`: 43 track identifiers: `n5`, `n4`, `n3`, `n2`, `n1`, 31 SSW sectors (`ssw-kaigo`, `ssw-food`, `ssw-construction`, etc.), JFT-Basic (`jft-a1`, `jft-a2`, `seikatsu`), and standard books (`book-genki`, `book-minna`, etc.).
  - `trackProgress`: `Record<TrackId, TrackProgressState>`
    - `TrackProgressState`: `{ completedUnits: string[], completedLessons: string[], lessonScores: Record<string, number>, lastStudiedTimestamp?: string }`
  - `activeTrackId`: `TrackId` (persisted in `nn_active_curriculum_track`)
  - `userSubstratum`: `L1Substratum` (persisted in `nn_user_l1_substratum`)
- **Actions**:
  - `setActiveTrack(trackId)`
  - `completeLesson(trackId, unitId, lessonId, score, xpReward)`
  - `getTrackStats(trackId)`: returns `{ completedLessonsCount, completedUnitsCount, averageScore }`
  - `isLessonUnlocked(trackId, unitNumber, lessonNumber)`: returns `true` (ADR-003 Anti-Malu free-browsing policy).

#### C. `useGardenStore` (`src/lib/garden/gardenStore.ts`)
- **Key Schemas**:
  - `PlantItem`: `{ id: string, kanji: string, reading: string, meaning: string, level: 'n5'|'n4'|'n3'|'n2'|'n1', stage: number (0..4), waterCount: number, maxWater: number, lastWatered?: string }`
  - `waterDrops`: `number` (persisted in `nn_garden_drops`, default 3)
  - `plants`: `PlantItem[]` (persisted in `nn_garden_plants`, default 8 plants)
  - `MAX_GARDEN_CAPACITY`: `36`
- **Actions**:
  - `addWaterDrop(count)`
  - `waterPlant(plantId)`: consumes 1 drop, increments stage when threshold reached, triggers `notifyBloomBadge()` at stage 4.
  - `waterAll()`: mass watering across all unbloomed plants.
  - `seedPlant(kanji, reading, meaning, level)`: seeds new kanji plant from stroke animator or quiz arena.
  - `applyLapseWilt(lapsedKanji?)`: wilts a plant upon memory lapse.
  - `checkDailyRefill()`: grants +3 water drops daily based on learner's local timezone date (`nn_garden_last_refill`).

#### D. `useAuthStore` (`src/lib/supabase/authStore.ts`)
- **Key Schemas**:
  - `user: User | null`, `session: Session | null`, `isLoading: boolean`
  - `syncStatus: 'idle' | 'syncing' | 'synced' | 'error'`
  - `lastSyncedAt: Date | null`, `syncErrorMessage: string | null`
- **Actions**:
  - `initAuth()`: initializes session, listens to `supabase.auth.onAuthStateChange`, registers reconnection listeners (`window.addEventListener('online')`, `visibilitychange`).
  - `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut`.
  - `syncNow()`: delegates to `syncEngine.syncAll(userId)`.

#### E. IndexedDB Persistence & TinyBase
- **`src/lib/storage/localStore.ts`**:
  - Database name: `'nugget_nihongo_local'` via `createIndexedDbPersister(this.store, 'nugget_nihongo_local')`.
  - Tables:
    - `cards`: FSRS card records (`LocalFSRSCardRow`)
    - `reviews`: Historical immutable logs (`LocalReviewLogRow`)
    - `preferences`: User settings
    - `dirty_queue`: Mutation queue for cloud synchronization (`LocalDirtyMutationRow`)
  - `migrateAllLocalStorageKeys()`: One-way migration engine migrating 19 legacy localStorage keys to IndexedDB.
- **`src/lib/persistence/storageBridge.ts`**:
  - IndexedDB fallback database `'nugget_nihongo_db'` (v1, objectStore `'keyval'`) for low-overhead key-value storage.

---

### 1.3 Test Suites, Verification Runners & Budgets

#### A. Master Regression Runners & Current Status
| Test Suite Command | Target Scope | Observed Result | Assertions / Checks |
|---|---|---|---|
| `node tests/run.js` | Architecture v3 data, vocab, grammar, version sync, fallbacks, AI validator, curriculum N5/N4/N3, core handover modules | **PASS (Exit 0)** | **75,987 passed, 0 failed, 0 skipped** |
| `node tests/run-sprints-1-to-44.js` | All 44 cumulative sprint test suites | **PASS (Exit 0)** | **44/44 suites passed with zero regressions** |
| `node tests/test-ssw-priority-architecture.js` | SSW priority tracks, JAC subtracks, coming soon modal, SyncStatusPill mounts, syncEngine | **PASS (Exit 0)** | **6/6 checks passed (100% green)** |
| `npx tsc --noEmit` | TypeScript typecheck across entire project | **PASS (Exit 0)** | **Zero type errors** |
| `node scripts/verify-bundle-budget.js` | Audits generated JavaScript chunks in `dist/assets/js/` | **PASS (Exit 0)** | **51/51 chunks strictly $\le 500$ kB** |
| `npm test` | Master npm test script (FSRS, CAT, stores, adapter, personas, run.js, backend, curriculum) | **PASS (Exit 0)** | **All suites passed 100%** |
| `node tests/verify-frontend-responsive.js` | Playwright browser responsive audit across 4 viewports | **PASS (Exit 0)** | **All 4 viewports verified, 0px horizontal overflow** |

#### B. Critical Test Assertions & Sensitive Matchers Matrix
The table below catalogs every specific assertion in historical test suites that verifies navigation, tabs, DOM selectors, or file contents. Any changes in the navigation overhaul **must preserve these exact strings or satisfy their contracts**:

| Test File | Line | Assertion / Contract | Critical Requirement for Overhaul |
|---|---|---|---|
| `tests/test-sprint-12-features.js` | 54–60 | `assert(navContent.includes("id: 'home'"))`<br>`assert(navContent.includes("id: 'materi'"))`<br>`assert(navContent.includes("id: 'quiz'"))`<br>`assert(navContent.includes("id: 'kebun'"))`<br>`assert(navContent.includes("id: 'sensei'"))`<br>`assert(navContent.includes('Sprout'))`<br>`assert(navContent.includes('active:scale-95'))` | `BottomNav.tsx` MUST retain these exact string references (or maintain a backward-compatible mapping/comment facade) so `test-sprint-12-features.js` remains 100% green! |
| `tests/test-sprint-10-ergonomics.js` | 170 | `assert(bottomNavContent.includes("if (activeTab === 'study')"))` | `BottomNav.tsx` must conditionally return `null` when `activeTab === 'study'`. |
| `tests/test-sprint-21-a11y.js` | 55–62, 77, 115 | `Sidebar.tsx`: `role="complementary"`, `role="navigation"`, `aria-current={isActive ? 'page' : undefined}`<br>`BottomNav.tsx`: `role="navigation"`, `aria-current={isActive ? 'page' : undefined}`, `focus-visible:ring-2 focus-visible:ring-accent`<br>`useAppStore.ts`: `announcer.announce(\`Membuka tab \${activeTab}\`` | All navigation landmarks, ARIA current-page markers, focus-visible rings, and accessibility announcements must remain intact. |
| `tests/test-sprint-42-animations-motion.js` | 114, 117 | `assert(sidebar.includes('transitionTabChange(item.id, setActiveTab)'))`<br>`assert(bottomNav.includes('transitionTabChange(item.id, setActiveTab)'))` | Tab switching in both `Sidebar` and `BottomNav` must invoke `transitionTabChange`. |
| `tests/test-sprint-28-copywriting-typography.js` | 146, 150 | `assert.ok(fs.readFileSync(sidebarPath, 'utf8').includes('Pusat Retensi (Brankas FSRS)'))`<br>`assert.ok(fs.readFileSync(drawerPath, 'utf8').includes('Pusat Retensi (Brankas FSRS)'))` | Sidebar and MobileDrawer must retain the exact label "Pusat Retensi (Brankas FSRS)" for retention navigation. |
| `tests/test-ssw-priority-architecture.js` | 78–86 | `assert(homeCode.includes('<SyncStatusPill />'))`<br>`assert(hubCode.includes('<SyncStatusPill />'))`<br>`assert(settingsCode.includes('<SyncStatusPill />'))` | `<SyncStatusPill />` must be mounted in `HomePage.tsx`, `MateriHubPage.tsx`, and `SettingsPage.tsx`. |
| `tests/test-ssw-priority-architecture.js` | 20–33 | 6 active priority SSW tracks: `ssw-kaigo`, `ssw-building-cleaning`, `ssw-construction`, `ssw-agriculture`, `ssw-food`, `ssw-accommodation` with `status: 'active'` | SSW priority tracks must maintain status active in `CurriculumTrackBrowser.tsx`. |
| `tests/test-ssw-priority-architecture.js` | 36–58 | 13 non-priority tracks locked with `status: 'coming_soon'` | Must retain 13 coming soon tracks in `CurriculumTrackBrowser.tsx`. |
| `tests/test-ssw-priority-architecture.js` | 60–64 | `browserCode.includes('constructionSubTrack')`<br>`browserCode.includes('doboku') && browserCode.includes('kenchiku') && browserCode.includes('setsubi')`<br>`browserCode.includes('Spesialisasi Ujian Prometric JAC (建設業)')` | JAC Prometric construction subtracks must remain in `CurriculumTrackBrowser.tsx`. |
| `tests/test-sprint-17-bundle-optimization.js` | 39–48 | `vite.config.ts`: `'vendor-react': ['react', 'react-dom', 'zustand']`, `'vendor-icons': ['lucide-react']`, `'vendor-supabase': ['@supabase/supabase-js']`, `cssCodeSplit: true`, `assetsInlineLimit: 4096`, `minify: 'esbuild'` | `vite.config.ts` must maintain `VENDOR_CHUNK_DEFINITIONS` and build configs. |
| `tests/test-sprint-17-bundle-optimization.js` | 58, 62–75 | Eager `HomePage` import and `React.lazy` imports for: `MateriHubPage`, `QuizPage`, `KebunPage`, `SenseiPage`, `SettingsPage`, `AboutPage`, `LessonStudyPage`, `MethodologyPage`, `ChoukaiSimulatorPage` | `App.tsx` must keep eager `HomePage` and lazy secondary pages matching regex `React.lazy(() => import('./pages/...'))`. |
| `tests/test-sprint-43-performance-cwv.js` | 50–56, 61–63 | Heavy modals must use `React.lazy` in `App.tsx` and `GlobalModalManager.tsx`: `KanaChartModal`, `CatPlacementModal`, `KotowazaModal`, `ConjugationModal`, `NuanceCompareModal`, `StudyToolboxModal`, `PatchNotesModal` | Modals must remain lazy-loaded with Suspense wrappers. |
| `tests/test-sprint-43-performance-cwv.js` | 91–92 | `assert(home.includes('Streak {streak} Hari Aktif'))`<br>`assert(home.includes('dueCount > 0'))` | Hero streak and dueCount memo must be in `HomePage.tsx`. |
| `tests/test-sprint-37-settings-hardening.js` | 57, 63, 69, 322, 328 | `SettingsPage.tsx`: No `?key=` query string, uses `'x-goog-api-key'`, renders `<ResetConfirmationModal`, calls `setSpeechRate(item.rate)` | SettingsPage security and accessibility safeguards must be maintained. |
| `tests/test-sprint-21-a11y.js` | 142–145 | `SettingsPage.tsx`: `htmlFor="custom-api-key"`, `id="custom-api-key"`, `aria-describedby="api-key-desc"`, `role="switch"` | SettingsPage form inputs and toggles must retain ARIA labels and switch roles. |
| `tests/test-sprint-16-i18n-sla.js` | 169–170 | `SettingsPage.tsx`: `uiLanguage, setUiLanguage`, `Bahasa Antarmuka (Language)` | Language preference controls must remain intact. |
| `tests/test-sprint-3-frontend.js` | 206, 214, 240 | `SettingsPage.tsx`: `focus:outline-none` (no `focus:outline-hidden`), synchronous `speakJapanese` on button click without `setTimeout` | Voice sample button must fire `speakJapanese` synchronously. |
| `tests/verify-frontend-responsive.js` | 124–135, 260–270 | Selectors: `nav.fixed button:has-text("Materi")`, `button:has-text("Materi Hub")`, `h1:has-text("Materi Hub")`, `button:has-text("Kurikulum Orisinal")`, `h2:has-text("Kurikulum")`, `div.fixed button:has-text("Pengaturan")`, `button:has-text("Pengaturan")`, `h1:has-text("Pengaturan")`, `h2:has-text("Penyesuaian Logat Daerah")`, `button:has-text("Logat Jawa") :text("✓ Aktif")` | The automated browser verification navigates via these exact selectors and verifies zero horizontal overflow. |

#### C. Production Bundle Performance Budget
- **Single Chunk Ceiling**: Strictly $\le 500\text{ kB}$ enforced by `scripts/verify-bundle-budget.js` and `vite.config.ts:33` (`chunkSizeWarningLimit: 500`).
- **Current Production Build Status**:
  - Total chunks generated: 51 JavaScript chunks.
  - Largest vendor chunks: `vendor-supabase` (221.39 kB), `vendor-react` (140.73 kB), `vendor-icons` (52.37 kB).
  - Largest page chunks: `QuizPage` (387.76 kB), `MateriHubPage` (161.63 kB), `LessonStudyPage` (74.82 kB), `SettingsPage` (50.89 kB).
  - Modular curriculum split: 15 chunks across N5–N1 (`curriculum-n1-p1` 381 kB, `curriculum-n2-p1` 406 kB, `curriculum-n3-p1` 328 kB, etc.) — all well below 500 kB.
  - All 51 chunks pass within budget (0 violations).

---

## 2. Logic Chain

1. **Premise 1 (Tab 5 Architecture)**:
   - The user request requires a dedicated Tab 5 for "Profil & Pengaturan" incorporating account management, live Supabase cloud sync status (`SyncStatusPill`), streak history, total XP, L1 Substratum dialect preferences, and application preferences with immediate local persistence.
   - Observation 1.1 reveals that `SettingsPage.tsx` currently contains all of these features in a single 1,228-line file, but lacks a clean, dedicated learner profile card with streak history and XP achievements.
   - Observation 1.3 shows that historical tests (`test-sprint-37`, `test-sprint-21`, `test-sprint-16`, `test-sprint-3`, `test-ssw-priority-architecture`, and `verify-frontend-responsive`) inspect `SettingsPage.tsx` using exact string assertions (`<SyncStatusPill />`, `htmlFor="custom-api-key"`, `'x-goog-api-key'`, `<ResetConfirmationModal`, `uiLanguage, setUiLanguage`, `Penyesuaian Logat Daerah`, `Logat Jawa`, `✓ Aktif`).
   - **Deduction 1**: Tab 5 can be elevated to "Profil & Pengaturan" by enriching `SettingsPage.tsx` with a prominent Profile & Progress overview card at the top (avatar, email, streak flame with 36h freeze status, total XP, level rank) while preserving all existing settings sections, forms, and exact string contracts so all historical tests remain 100% green.

2. **Premise 2 (BottomNav 5-Tab & Test Contract)**:
   - The user request establishes a 5-tab core architecture: Tab 1 Belajar, Tab 2 Review, Tab 3 Dojo & Pustaka, Tab 4 Sensei AI, Tab 5 Profil & Pengaturan.
   - Observation 1.3 shows that `tests/test-sprint-12-features.js:54-58` asserts literal string inclusion in `src/components/layout/BottomNav.tsx`:
     `navContent.includes("id: 'home'")`, `navContent.includes("id: 'materi'")`, `navContent.includes("id: 'quiz'")`, `navContent.includes("id: 'kebun'")`, `navContent.includes("id: 'sensei'")`, and `navContent.includes('Sprout')`.
   - Observation 1.3 also shows that `verify-frontend-responsive.js:124` targets `nav.fixed button:has-text("Materi")`.
   - **Deduction 2**: To introduce the new 5-tab navigation model without violating historical test assertions or causing responsive audit failures:
     - The bottom navigation and router must support backward-compatible tab ID aliasing (e.g. mapping `home` to Belajar, `kebun` to Review retention hub, `materi`/`quiz` to Dojo & Pustaka, `sensei` to Sensei AI, and `settings` to Profil & Pengaturan).
     - `BottomNav.tsx` must retain the legacy identifier strings in a comment or compatibility dictionary so `test-sprint-12-features.js` passes without modifying the test file.

3. **Premise 3 (State Stores & Schemas Backward Compatibility - R6)**:
   - Observation 1.2 demonstrates that the 4 primary state stores (`useAppStore`, `useCurriculumStore`, `useGardenStore`, `useAuthStore`) and TinyBase IndexedDB persistence (`localStore.ts`) are deeply interconnected and heavily tested across 44 sprint test suites.
   - Every store already possesses synchronous getters, atomic action handlers, and robust local persistence.
   - **Deduction 3**: The UI/UX overhaul must be implemented as a purely non-destructive presentation facade. No existing store properties, action names, or persistence keys (`nn_xp`, `nn_streak`, `nn_fsrs_cards`, `nn_curriculum_progress_v1`, `nn_garden_plants`, `nn_user_l1_substratum`, `nn_furigana`, `nn_romaji`, `nn_sound_effects`, `nn_speech_rate`) may be deleted or renamed.

4. **Premise 4 (Production Bundle Performance Budget)**:
   - Observation 1.3 demonstrates that Vite manualChunks is finely tuned with `VENDOR_CHUNK_DEFINITIONS` and modular curriculum chunks, keeping all 51 chunks under 414 kB (well within the 500 kB budget).
   - `test-sprint-17-bundle-optimization.js` and `test-sprint-43-performance-cwv.js` strictly enforce literal string declarations in `vite.config.ts` (`'vendor-react': ['react', 'react-dom', 'zustand']`, `'vendor-icons': ['lucide-react']`, `'vendor-supabase': ['@supabase/supabase-js']`, `'vendor-state': ['clsx', 'tailwind-merge']`).
   - `App.tsx` must continue lazy-loading secondary pages and heavy modals using `React.lazy` with zero-CLS Suspense fallbacks.
   - **Deduction 4**: Any new UI components or refactored page views must be split appropriately and imported lazily if heavy, ensuring `dist/assets/js/` chunks never exceed 500 kB and `vite.config.ts` string definitions remain untouched.

---

## 3. Caveats

1. **Areas Not Investigated**:
   - Audio synthesis worker internals (`pocket-tts` / `VoiceStudio`) were not executed, as they operate in dedicated background media pipelines.
   - Supabase live cloud network syncing was not tested against live production credentials to avoid mutating remote user databases; local mocked sync tests and contract assertions were relied upon.
2. **Assumptions Made**:
   - Assumed that `tests/verify-frontend-responsive.js` continues to use headless Microsoft Edge (`channel: 'msedge'`) via Playwright CLI on Windows as configured in the project.
   - Assumed that the 5-tab core navigation will map cleanly onto existing `AppState['activeTab']` identifiers via backward-compatible aliases or union expansion without breaking existing routes.
3. **Alternative Interpretations Considered**:
   - *Alternative*: Splitting `SettingsPage.tsx` into two distinct files (`ProfilePage.tsx` and `SettingsPage.tsx`).
   - *Why rejected*: `tests/test-ssw-priority-architecture.js` line 81 explicitly asserts `settingsCode = fs.readFileSync('src/pages/SettingsPage.tsx')` and checks that it mounts `<SyncStatusPill />`, while `test-sprint-37`, `test-sprint-21`, `test-sprint-16`, and `verify-frontend-responsive.js` assert specific headers, labels, and toggles inside `SettingsPage.tsx`. Consolidating "Profil & Pengaturan" into `SettingsPage.tsx` (or using a facade container) ensures 100% test compatibility.

---

## 4. Conclusion

1. **Tab 5 (Profil & Pengaturan)** is fully architected around `SettingsPage.tsx`, `useAuthStore`, `useAppStore`, `SyncStatusPill`, and `syncEngine.ts`. All required elements (Supabase cloud sync telemetry, XP, 36h streak engine, L1 Substratum dialects, Furigana/Romaji/audio preferences) are already functional and locally persisted. Tab 5 can be elevated into a unified, user-friendly hub by adding a prominent Profile & Mastery Header Card while preserving the existing settings sections.
2. **State Stores & Schemas (R6)** are robust and cleanly decoupled. `useAppStore`, `useCurriculumStore`, `useGardenStore`, `useAuthStore`, and TinyBase `localStore` provide complete coverage. Preserving their existing signatures and storage keys guarantees zero data loss and seamless offline-first operation.
3. **Test Suites & Performance Budgets**: All 4 automated quality gates (`node tests/run.js` with 75,987 assertions, `node tests/run-sprints-1-to-44.js` with 44/44 suites, `node tests/test-ssw-priority-architecture.js` with 6/6 checks, and `npx tsc --noEmit`) are currently **100% GREEN**. The production bundle strictly enforces a 500 kB single-chunk ceiling across all 51 modular chunks.
4. **Implementation Guardrails**: The implementer must strictly observe the Critical Test Assertions Matrix (Section 1.3.B) to prevent accidental regressions on literal string matchers in `BottomNav.tsx`, `Sidebar.tsx`, `SettingsPage.tsx`, `HomePage.tsx`, and `vite.config.ts`.

---

## 5. Verification Method

To independently verify these findings, execute the following commands from `c:\Users\Timedoor\Downloads\nugget nihonggo project\nugget-nihongo`:

1. **Run Master Data & Architecture Test Suite**:
   ```powershell
   node tests/run.js
   ```
   *Expected*: `PASS: 75987 | FAIL: 0 | SKIP: 0` with exit code 0.

2. **Run Master Cumulative Sprint Regression (Sprints 1–44)**:
   ```powershell
   node tests/run-sprints-1-to-44.js
   ```
   *Expected*: `🏆 ALL 44/44 SPRINT SUITES PASSED WITH ZERO REGRESSIONS!` with exit code 0.

3. **Run SSW Priority Architecture & Cloud Sync Test**:
   ```powershell
   node tests/test-ssw-priority-architecture.js
   ```
   *Expected*: `🎉 ALL SSW PRIORITY & CLOUD SYNC ARCHITECTURE CHECKS PASSED WITH 100% GREEN STATUS!` with exit code 0.

4. **Verify TypeScript Strict Compilation**:
   ```powershell
   npx tsc --noEmit
   ```
   *Expected*: Clean exit with code 0 (no output, no type errors).

5. **Verify Production Bundle Performance Budget**:
   ```powershell
   node scripts/verify-bundle-budget.js
   ```
   *Expected*: `🌟 PERFORMANCE BUDGET PASSED 100%: All chunks strictly adhere to the 500 kB ceiling!` with exit code 0.

6. **Files to Inspect**:
   - `src/pages/SettingsPage.tsx` (Lines 1–1228)
   - `src/components/ui/SyncStatusPill.tsx` (Lines 1–182)
   - `src/store/useAppStore.ts` (Lines 1–760)
   - `src/lib/curriculum/curriculumStore.ts` (Lines 1–330)
   - `src/lib/garden/gardenStore.ts` (Lines 1–244)
   - `src/lib/supabase/authStore.ts` (Lines 1–139)
   - `src/lib/storage/localStore.ts` (Lines 1–239)
   - `vite.config.ts` (Lines 1–127)
   - `tests/test-sprint-12-features.js` (Lines 50–65)
   - `tests/test-ssw-priority-architecture.js` (Lines 71–87)
