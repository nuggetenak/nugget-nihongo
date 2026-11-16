// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint18-layer2-refinements.js
//  Suite 159: Comprehensive Verification of Lapisan 2 Refinements
//  (Kurikulum, Player Belajar 4-Tahap, & Interconnection Bridges)
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Suite 159: Lapisan 2 Kurikulum & Player Belajar 4-Tahap Refinements...');

// ── Contract 1: HomePage.tsx View Mode & Active Unit Persistence ───────────────
const homePath = path.join(rootDir, 'src', 'pages', 'HomePage.tsx');
assert.ok(fs.existsSync(homePath), 'HomePage.tsx must exist');
const homeContent = fs.readFileSync(homePath, 'utf8');

assert.ok(
  homeContent.includes("localStorage.getItem('nn_roadmap_view_mode')") &&
  homeContent.includes("localStorage.setItem('nn_roadmap_view_mode'"),
  'Contract 1: HomePage.tsx must persist roadmapViewMode in localStorage'
);
assert.ok(
  homeContent.includes('sessionStorage.getItem(`nn_selected_unit_') &&
  homeContent.includes('sessionStorage.setItem(`nn_selected_unit_'),
  'Contract 1: HomePage.tsx must persist selectedUnitId in sessionStorage per track'
);

// ── Contract 2: HomePage.tsx Kotowaza & Kotoba Bimodal Pulse Animation ─────────
assert.ok(
  homeContent.includes('isSpeakingKotowaza') && homeContent.includes('animate-pulse'),
  'Contract 2: HomePage.tsx must provide isSpeakingKotowaza state and pulse animation'
);
assert.ok(
  homeContent.includes('isSpeakingDailyWord'),
  'Contract 2: HomePage.tsx must provide isSpeakingDailyWord state'
);

// ── Contract 3: HomePage.tsx Smooth Scroll Centering for Active Unit Pill ──────
assert.ok(
  homeContent.includes('unitSwitcherRef') &&
  homeContent.includes('scrollIntoView') &&
  homeContent.includes("inline: 'center'"),
  'Contract 3: HomePage.tsx must auto-scroll active unit switcher button to center'
);

// ── Contract 4: HomePage.tsx Accessible Badge Typography on Mobile Hero (>=12px Anti-Microfont) ────────
assert.ok(
  homeContent.includes('text-xs') &&
  homeContent.includes('px-2 py-0.5 sm:px-3 sm:py-1') &&
  !homeContent.includes('text-[10px]') &&
  !homeContent.includes('text-[11px]'),
  'Contract 4: HomePage.tsx must apply accessible badge typography on mobile hero without microfont leakage'
);

// ── Contract 5: HomePage.tsx Lesson Primary CTA Button Title Truncation ────────
assert.ok(
  homeContent.includes('truncate max-w-[200px] xs:max-w-[260px] sm:max-w-md inline-block align-bottom'),
  'Contract 5: HomePage.tsx primary lesson CTA must apply responsive title truncation'
);

// ── Contract 6: HomePage.tsx Irasutoya Float Offset Stabilization ──────────────
assert.ok(
  homeContent.includes('self-center mt-0') &&
  homeContent.includes('w-14 h-14 sm:w-24 sm:h-24'),
  'Contract 6: HomePage.tsx Irasutoya image float must be centered without clipping'
);

// ── Contract 7: HomePage.tsx Zero XP Progress Bar Starter Pip ──────────────────
assert.ok(
  homeContent.includes('todayXP === 0 ? 2 : goalProgressPercent'),
  'Contract 7: HomePage.tsx must render a starter pip when todayXP is 0'
);

// ── Contract 8: HomePage.tsx 3-Column Stats Grid Compact Labels on Mobile ──────
assert.ok(
  homeContent.includes('hidden sm:inline') &&
  homeContent.includes('sm:hidden') &&
  homeContent.includes('FSRS'),
  'Contract 8: HomePage.tsx stats grid must shorten labels on compact screens'
);

// ── Contract 9: HomePage.tsx Kotowaza Radial SVG Pattern Fallback ──────────────
assert.ok(
  homeContent.includes('bg-radial from-amber-500/10 to-surface-2'),
  'Contract 9: HomePage.tsx Kotowaza card must provide radial pattern styling'
);

// ── Contract 10: HomePage.tsx Quick Utilities Strip Compact Touch Target ───────
assert.ok(
  homeContent.includes('p-2 sm:p-2.5') && homeContent.includes('text-xs text-appText-muted line-clamp-1'),
  'Contract 10: HomePage.tsx Quick Utilities Strip must provide compact padding & typography'
);

// ── Contract 11: HomePage.tsx Lesson Badges Light Mode Contrast Token ──────────
assert.ok(
  homeContent.includes('bg-purple-100 text-purple-800') &&
  homeContent.includes('dark:bg-purple-950/80') &&
  homeContent.includes('bg-blue-100 text-blue-800') &&
  homeContent.includes('dark:bg-blue-950/80'),
  'Contract 11: HomePage.tsx lesson badges must provide dual-theme high-contrast tokens'
);

// ── Contract 12: HomePage.tsx Kotoba POS Indonesian Translation Helper ─────────
assert.ok(
  homeContent.includes('Nomina (Kata Benda)') &&
  homeContent.includes('Verba (Kata Kerja)'),
  'Contract 12: HomePage.tsx Kotoba Hari Ini must translate POS tags to Indonesian'
);

// ── Contract 13: HomePage.tsx Heatmap Mobile Right Edge Fade Gradient ──────────
assert.ok(
  homeContent.includes('from-surface to-transparent sm:hidden'),
  'Contract 13: HomePage.tsx heatmap must include mobile right-edge fade gradient'
);

// ── Contract 14: LessonStudyPage.tsx Dynamic Document Title per Active Lesson ──
const lessonStudyPath = path.join(rootDir, 'src', 'pages', 'LessonStudyPage.tsx');
assert.ok(fs.existsSync(lessonStudyPath), 'LessonStudyPage.tsx must exist');
const lessonStudyContent = fs.readFileSync(lessonStudyPath, 'utf8');

assert.ok(
  lessonStudyContent.includes('document.title =') &&
  lessonStudyContent.includes('currentLesson.title_id'),
  'Contract 14: LessonStudyPage.tsx must dynamically update document.title with lesson title'
);

// ── Contract 15: LessonStudyPage.tsx Non-Sticky Stepper Invariant ──────────────
assert.ok(
  !lessonStudyContent.includes('sticky top-0 z-20') &&
  !lessonStudyContent.includes('sticky top-0 z-10'),
  'Contract 15: Studio Belajar Non-Sticky Invariant violated! Stepper must remain in-flow'
);

// ── Contract 16: LessonStudyPage.tsx Safe Area Padding & Studio Immersion Cushion ───
assert.ok(
  lessonStudyContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12') &&
  lessonStudyContent.includes('min-w-0 overflow-x-hidden'),
  'Contract 16: LessonStudyPage.tsx must enforce safe area padding cushion and overflow defense'
);

// ── Contract 17: LessonStudyPage.tsx WAI-ARIA Stepper Tablist Roles ────────────
assert.ok(
  lessonStudyContent.includes('role="tablist"') &&
  lessonStudyContent.includes('role="tab"') &&
  lessonStudyContent.includes('aria-selected=') &&
  lessonStudyContent.includes('aria-controls=') &&
  lessonStudyContent.includes('role="tabpanel"'),
  'Contract 17: LessonStudyPage.tsx stepper must provide complete WAI-ARIA tablist semantics'
);

// ── Contract 18: LessonStudyPage.tsx Native Title Tooltip on Header ────────────
assert.ok(
  lessonStudyContent.includes('title={currentLesson.title_id}'),
  'Contract 18: LessonStudyPage.tsx must provide native tooltip on title'
);

// ── Contract 19: LessonStudyPage.tsx Directional View Transitions ─────────────
assert.ok(
  lessonStudyContent.includes('animate-in fade-in slide-in-from-right-4'),
  'Contract 19: LessonStudyPage.tsx must declare directional view transitions'
);

// ── Contract 20: DialogueStage.tsx 3-Tier Speed Toggle ─────────────────────────
const dialoguePath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'DialogueStage.tsx');
assert.ok(fs.existsSync(dialoguePath), 'DialogueStage.tsx must exist');
const dialogueContent = fs.readFileSync(dialoguePath, 'utf8');

assert.ok(
  dialogueContent.includes('prev === 1.0 ? 0.8 : prev === 0.8 ? 1.2 : 1.0'),
  'Contract 20: DialogueStage.tsx must implement 3-tier speech rate cycle (1.0x -> 0.8x -> 1.2x)'
);

// ── Contract 21: PedagogicalFrameworkCard.tsx Accessible Focus Rings ───────────
const pedaPath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'PedagogicalFrameworkCard.tsx');
assert.ok(fs.existsSync(pedaPath), 'PedagogicalFrameworkCard.tsx must exist');
const pedaContent = fs.readFileSync(pedaPath, 'utf8');

assert.ok(
  pedaContent.includes('focus-visible:ring-2 focus-visible:ring-accent'),
  'Contract 21: PedagogicalFrameworkCard.tsx accordion triggers must implement accessible focus rings'
);

// ── Contract 22: ExplanationStage.tsx Melodic Pitch Audio Feedback ─────────────
const explPath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx');
assert.ok(fs.existsSync(explPath), 'ExplanationStage.tsx must exist');
const explContent = fs.readFileSync(explPath, 'utf8');

assert.ok(
  explContent.includes('handlePlayPitchMelody') &&
  explContent.includes('playingPitchWord'),
  'Contract 22: ExplanationStage.tsx must implement melodic pitch tone player with visual state'
);

// ── Contract 23: ExplanationStage.tsx Scroll-to-Top Floating Position ──────────
assert.ok(
  explContent.includes('bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4'),
  'Contract 23: ExplanationStage.tsx scroll-to-top button must be positioned above safe-area'
);

// ── Contract 24: ExplanationStage.tsx Non-Sticky Tabs Invariant ────────────────
assert.ok(
  !explContent.includes('sticky top-0'),
  'Contract 24: ExplanationStage.tsx sub-tabs must remain strictly in-flow (never sticky top-0)'
);

// ── Contract 25: MicroDrillStage.tsx Safe Token Reordering by Index ────────────
const microDrillPath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'MicroDrillStage.tsx');
assert.ok(fs.existsSync(microDrillPath), 'MicroDrillStage.tsx must exist');
const microDrillContent = fs.readFileSync(microDrillPath, 'utf8');

assert.ok(
  microDrillContent.includes('placedTokenIndices') &&
  microDrillContent.includes('handlePlaceToken') &&
  microDrillContent.includes('handleToggleTokenSlot'),
  'Contract 25: MicroDrillStage.tsx must use index-based token placement to prevent duplicates bug'
);

// ── Contract 26: MicroDrillStage.tsx Instant Diagnostic Option Color Feedback ──
assert.ok(
  microDrillContent.includes('bg-emerald-500/20') &&
  microDrillContent.includes('bg-rose-500/20'),
  'Contract 26: MicroDrillStage.tsx options must display instant diagnostic color states'
);

// ── Contract 27: MicroDrillStage.tsx Keyboard Shortcut Listener ────────────────
assert.ok(
  microDrillContent.includes("key === '1' || key === 'A'") &&
  microDrillContent.includes("e.key === 'Enter' || e.key === ' '"),
  'Contract 27: MicroDrillStage.tsx must support 1-4 / A-D and Enter/Space keyboard hotkeys'
);

// ── Contract 28: MicroDrillStage.tsx Visual Progress Bar ───────────────────────
assert.ok(
  microDrillContent.includes('h-1.5 bg-surface-3 rounded-full overflow-hidden'),
  'Contract 28: MicroDrillStage.tsx must render visual progress bar'
);

// ── Contract 29: CanDoCompletionStage.tsx Duplicate Comment Deduplication ──────
const canDoPath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'CanDoCompletionStage.tsx');
assert.ok(fs.existsSync(canDoPath), 'CanDoCompletionStage.tsx must exist');
const canDoContent = fs.readFileSync(canDoPath, 'utf8');

const t48Matches = (canDoContent.match(/Ticket T-48 & Ticket T-196/g) || []).length;
assert.strictEqual(
  t48Matches,
  1,
  'Contract 29: CanDoCompletionStage.tsx must have exactly 1 occurrence of Ticket T-48 comment'
);

// ── Contract 30: CanDoCompletionStage.tsx Pocket Summary Clipboard Export Button
assert.ok(
  canDoContent.includes('handleCopyPocketSummary') &&
  canDoContent.includes('isCopied'),
  'Contract 30: CanDoCompletionStage.tsx must provide pocket summary clipboard export button'
);

// ── Contract 31: CanDoCompletionStage.tsx FSRS Seeding Confirmation Badge ──────
assert.ok(
  canDoContent.includes('FSRS Memory Seeding Aktif'),
  'Contract 31: CanDoCompletionStage.tsx must display FSRS memory seeding confirmation badge'
);

// ── Contract 32: LessonRowNode.tsx Light Mode Contrast & Native Tooltip ────────
const lessonRowPath = path.join(rootDir, 'src', 'components', 'materi', 'curriculum', 'LessonRowNode.tsx');
assert.ok(fs.existsSync(lessonRowPath), 'LessonRowNode.tsx must exist');
const lessonRowContent = fs.readFileSync(lessonRowPath, 'utf8');

assert.ok(
  lessonRowContent.includes('bg-blue-100 text-blue-800') &&
  lessonRowContent.includes('dark:bg-blue-950/80') &&
  lessonRowContent.includes('title={lesson.title_id}'),
  'Contract 32: LessonRowNode.tsx must fix light mode contrast and provide native title tooltip'
);

// ── Contract 33: UnitAccordionCard.tsx Accessible ARIA Controls & Break Words ──
const unitAccPath = path.join(rootDir, 'src', 'components', 'materi', 'curriculum', 'UnitAccordionCard.tsx');
assert.ok(fs.existsSync(unitAccPath), 'UnitAccordionCard.tsx must exist');
const unitAccContent = fs.readFileSync(unitAccPath, 'utf8');

assert.ok(
  unitAccContent.includes('aria-controls={`unit-content-${unit.id}`}') &&
  unitAccContent.includes('id={`unit-content-${unit.id}`}') &&
  unitAccContent.includes('break-words'),
  'Contract 33: UnitAccordionCard.tsx must provide aria-controls, matching id, and break-words'
);

// ── Contract 34: TrackCategoryFilter.tsx 44px Minimum Touch Targets & ARIA ────
const trackFilterPath = path.join(rootDir, 'src', 'components', 'materi', 'curriculum', 'TrackCategoryFilter.tsx');
assert.ok(fs.existsSync(trackFilterPath), 'TrackCategoryFilter.tsx must exist');
const trackFilterContent = fs.readFileSync(trackFilterPath, 'utf8');

assert.ok(
  trackFilterContent.includes('role="tablist"') &&
  trackFilterContent.includes('role="tab"') &&
  trackFilterContent.includes('min-h-[40px]') &&
  trackFilterContent.includes('min-h-[44px]'),
  'Contract 34: TrackCategoryFilter.tsx must provide 40-44px touch targets and tablist semantics'
);

// ── Contract 35: CurriculumTrackBrowser.tsx In-Page Unit Search & 4th Tab ──────
const trackBrowserPath = path.join(rootDir, 'src', 'components', 'materi', 'CurriculumTrackBrowser.tsx');
assert.ok(fs.existsSync(trackBrowserPath), 'CurriculumTrackBrowser.tsx must exist');
const trackBrowserContent = fs.readFileSync(trackBrowserPath, 'utf8');

assert.ok(
  trackBrowserContent.includes('unitSearchQuery') &&
  trackBrowserContent.includes('searchedUnits'),
  'Contract 35: CurriculumTrackBrowser.tsx must implement in-page unit search and filtering'
);
assert.ok(
  trackBrowserContent.includes("trackCategory === 'textbook'") &&
  trackBrowserContent.includes('9 Buku Teks'),
  'Contract 35: CurriculumTrackBrowser.tsx must include 4th category tab for 9 Buku Teks'
);

// ── Contract 36: ResearchMethodologyModal.tsx Modal Accessibility & Scroll Lock ─
const researchModalPath = path.join(rootDir, 'src', 'components', 'materi', 'ResearchMethodologyModal.tsx');
assert.ok(fs.existsSync(researchModalPath), 'ResearchMethodologyModal.tsx must exist');
const researchModalContent = fs.readFileSync(researchModalPath, 'utf8');

assert.ok(
  researchModalContent.includes('useBodyScrollLock(isOpen)') &&
  researchModalContent.includes("e.key === 'Escape'") &&
  researchModalContent.includes('e.stopPropagation()'),
  'Contract 36: ResearchMethodologyModal.tsx must implement scroll lock, Escape listener, and stopPropagation'
);

// ── Contract 37: SeikatsuLivingGuideModal.tsx Touch Targets & Accessibility ────
const seikatsuModalPath = path.join(rootDir, 'src', 'components', 'materi', 'SeikatsuLivingGuideModal.tsx');
assert.ok(fs.existsSync(seikatsuModalPath), 'SeikatsuLivingGuideModal.tsx must exist');
const seikatsuModalContent = fs.readFileSync(seikatsuModalPath, 'utf8');

assert.ok(
  seikatsuModalContent.includes('min-w-[40px] min-h-[40px]') &&
  seikatsuModalContent.includes('useBodyScrollLock(isOpen)') &&
  seikatsuModalContent.includes('role="tablist"'),
  'Contract 37: SeikatsuLivingGuideModal.tsx must enlarge touch targets and provide tablist semantics'
);

// ── Contract 38: PrometricCbtModal.tsx & JftBasicCbtModal.tsx Touch Targets ─────
const prometricPath = path.join(rootDir, 'src', 'components', 'quiz', 'PrometricCbtModal.tsx');
assert.ok(fs.existsSync(prometricPath), 'PrometricCbtModal.tsx must exist');
const prometricContent = fs.readFileSync(prometricPath, 'utf8');

const jftModalPath = path.join(rootDir, 'src', 'components', 'quiz', 'JftBasicCbtModal.tsx');
assert.ok(fs.existsSync(jftModalPath), 'JftBasicCbtModal.tsx must exist');
const jftModalContent = fs.readFileSync(jftModalPath, 'utf8');

assert.ok(
  prometricContent.includes('min-w-[40px] min-h-[40px]') &&
  prometricContent.includes('useBodyScrollLock(isOpen)') &&
  prometricContent.includes("e.key === 'Escape'"),
  'Contract 38: PrometricCbtModal.tsx must provide 40px close button, scroll lock, and Escape listener'
);
assert.ok(
  jftModalContent.includes('min-w-[40px] min-h-[40px]') &&
  jftModalContent.includes('useBodyScrollLock(isOpen)'),
  'Contract 38: JftBasicCbtModal.tsx must provide 40px close button and scroll lock'
);

// ── Contract 39: AuthenticDrillModal.tsx Touch Targets, Hotkeys & Propagation ──
const authDrillPath = path.join(rootDir, 'src', 'components', 'materi', 'AuthenticDrillModal.tsx');
assert.ok(fs.existsSync(authDrillPath), 'AuthenticDrillModal.tsx must exist');
const authDrillContent = fs.readFileSync(authDrillPath, 'utf8');

assert.ok(
  authDrillContent.includes('min-w-[40px] min-h-[40px]') &&
  authDrillContent.includes('e.stopPropagation()') &&
  authDrillContent.includes("key === '1' || key === 'A'"),
  'Contract 39: AuthenticDrillModal.tsx must provide 40px audio button, stopPropagation, and keyboard hotkeys'
);

// ── Contract 40: KanjiStrokeModal.tsx & KanjiDojoView.tsx Refinements ──────────
const kanjiStrokePath = path.join(rootDir, 'src', 'components', 'kanji', 'KanjiStrokeModal.tsx');
assert.ok(fs.existsSync(kanjiStrokePath), 'KanjiStrokeModal.tsx must exist');
const kanjiStrokeContent = fs.readFileSync(kanjiStrokePath, 'utf8');

const kanjiDojoPath = path.join(rootDir, 'src', 'components', 'kanji', 'KanjiDojoView.tsx');
assert.ok(fs.existsSync(kanjiDojoPath), 'KanjiDojoView.tsx must exist');
const kanjiDojoContent = fs.readFileSync(kanjiDojoPath, 'utf8');

assert.ok(
  kanjiStrokeContent.includes('useBodyScrollLock(isOpen)') &&
  kanjiStrokeContent.includes("e.key === 'Escape'"),
  'Contract 40: KanjiStrokeModal.tsx must implement scroll lock and Escape key listener'
);
assert.ok(
  kanjiDojoContent.includes('role="tablist"') &&
  kanjiDojoContent.includes('min-h-[40px]'),
  'Contract 40: KanjiDojoView.tsx must provide tablist semantics and 40px touch targets on filter pills'
);

// ── Contract 41: BookTrackBrowser.tsx Volume Switcher & RubyText.tsx rp Tag ────
const bookTrackPath = path.join(rootDir, 'src', 'components', 'materi', 'BookTrackBrowser.tsx');
assert.ok(fs.existsSync(bookTrackPath), 'BookTrackBrowser.tsx must exist');
const bookTrackContent = fs.readFileSync(bookTrackPath, 'utf8');

const rubyTextPath = path.join(rootDir, 'src', 'components', 'ui', 'RubyText.tsx');
assert.ok(fs.existsSync(rubyTextPath), 'RubyText.tsx must exist');
const rubyTextContent = fs.readFileSync(rubyTextPath, 'utf8');

assert.ok(
  bookTrackContent.includes('role="tablist"') &&
  bookTrackContent.includes('role="tab"') &&
  bookTrackContent.includes('min-h-[40px]'),
  'Contract 41: BookTrackBrowser.tsx volume switcher must provide tablist semantics and 40px touch targets'
);
assert.ok(
  rubyTextContent.includes('<rp className="text-[0em] opacity-0 select-none">'),
  'Contract 41: RubyText.tsx must include select-none on <rp> tags'
);

// ── Contract 42: Interconnection Bridges with Layer 1 ──────────────────────────
const appStorePath = path.join(rootDir, 'src', 'store', 'useAppStore.ts');
assert.ok(fs.existsSync(appStorePath), 'useAppStore.ts must exist');
const appStoreContent = fs.readFileSync(appStorePath, 'utf8');

const appPath = path.join(rootDir, 'src', 'App.tsx');
assert.ok(fs.existsSync(appPath), 'App.tsx must exist');
const appContent = fs.readFileSync(appPath, 'utf8');

const detailModalPath = path.join(rootDir, 'src', 'components', 'ui', 'DetailModal.tsx');
assert.ok(fs.existsSync(detailModalPath), 'DetailModal.tsx must exist');
const detailModalContent = fs.readFileSync(detailModalPath, 'utf8');

const senseiSheetPath = path.join(rootDir, 'src', 'components', 'sensei', 'ContextualSenseiSheet.tsx');
assert.ok(fs.existsSync(senseiSheetPath), 'ContextualSenseiSheet.tsx must exist');
const senseiSheetContent = fs.readFileSync(senseiSheetPath, 'utf8');

const sidebarPath = path.join(rootDir, 'src', 'components', 'layout', 'Sidebar.tsx');
assert.ok(fs.existsSync(sidebarPath), 'Sidebar.tsx must exist');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

const drawerPath = path.join(rootDir, 'src', 'components', 'layout', 'MobileDrawer.tsx');
assert.ok(fs.existsSync(drawerPath), 'MobileDrawer.tsx must exist');
const drawerContent = fs.readFileSync(drawerPath, 'utf8');

const headerPath = path.join(rootDir, 'src', 'components', 'layout', 'Header.tsx');
assert.ok(fs.existsSync(headerPath), 'Header.tsx must exist');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert.ok(
  appStoreContent.includes("currentContext?.trackType === 'book' ? 'materi' : 'home'"),
  'Contract 42: useAppStore.ts closeLessonStudy must be origin-aware'
);
assert.ok(
  appContent.includes("activeTab === 'study'") &&
  appContent.includes("'pb-0'"),
  'Contract 42: App.tsx must apply dynamic pb-0 padding in study mode'
);
assert.ok(
  headerContent.includes('useAppStore.getState().closeLessonStudy()'),
  'Contract 42: Header.tsx must close active study when switching curriculum tracks'
);
assert.ok(
  detailModalContent.includes('Silabus Kurikulum 🗺️'),
  'Contract 42: DetailModal.tsx must provide secondary CTA to view in curriculum roadmap'
);
assert.ok(
  senseiSheetContent.includes("drillTabBtn.click()"),
  'Contract 42: ContextualSenseiSheet.tsx must switch to in-place drills when in active study'
);
assert.ok(
  sidebarContent.includes("if (activeTab === 'study')"),
  'Contract 42: Sidebar.tsx must maintain parent route active indicator when in study mode'
);
assert.ok(
  drawerContent.includes('useAppStore.getState().closeLessonStudy()'),
  'Contract 42: MobileDrawer.tsx must clean up active study on navigation'
);

console.log('🎉 ALL 42 ARCHITECTURAL TEST CONTRACTS IN SUITE 159 PASSED WITH 100% GREEN STATUS!');
