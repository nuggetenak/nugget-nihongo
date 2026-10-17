// ══════════════════════════════════════════════════════════════════
//  en.ts — English Translation Dictionary (Secondary Locale for Nugget Nihongo)
// ══════════════════════════════════════════════════════════════════

import { TranslationKey } from './id';

export const enDictionary: Record<TranslationKey, string> = {
  // ── Core Navigation ──
  'nav.home': 'Home',
  'nav.materi': 'Curriculum',
  'nav.quiz': 'Practice',
  'nav.kebun': 'Word Garden',
  'nav.sensei': 'Sensei AI',
  'nav.choukai': 'Choukai CBT',
  'nav.methodology': 'Methodology',
  'nav.settings': 'Settings',
  'nav.about': 'About',

  // ── Common Headers & Actions ──
  'common.search': 'Search vocabulary, kanji, or grammar...',
  'common.loading': 'Loading data...',
  'common.back': 'Back',
  'common.close': 'Close',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.confirm': 'Confirm',
  'common.reset': 'Reset',
  'common.download': 'Download',
  'common.success': 'Success',
  'common.error': 'An error occurred',
  'common.level': 'Level',
  'common.track': 'Study Track',

  // ── Home ──
  'home.daily_target': 'Daily Target',
  'home.streak': 'Day Streak',
  'home.reviews_due': 'Cards Due for Review',
  'home.start_review': 'Start Review Now',
  'home.continue_lesson': 'Continue Lesson',
  'home.curriculum_tracks': 'Curriculum Tracks & Books',
  'home.vocational_ssw': 'SSW & K3 Vocational Tracks',
  'home.kanji_mastery': 'Kanji Mastery Dojo',

  // ── Materi Hub ──
  'materi.curriculum_tab': 'Step-by-step Curriculum',
  'materi.kanji_tab': 'Joyo Kanji 2136 Dojo',
  'materi.books_tab': 'Standard Textbooks',
  'materi.all_categories': 'All',
  'materi.vocab': 'Vocabulary',
  'materi.grammar': 'Grammar',
  'materi.kanji': 'Kanji',
  'materi.drills': 'Practice Drills',

  // ── Quiz & Practice ──
  'quiz.arena_title': 'Adaptive Practice Arena',
  'quiz.mode_mixed': 'Smart Mixed (FSRS)',
  'quiz.mode_vocab': 'Vocabulary Focus',
  'quiz.mode_grammar': 'Grammar Focus',
  'quiz.mode_kanji': 'Kanji Focus',
  'quiz.mode_audio': 'Listening CBT (Choukai)',
  'quiz.mode_k3': 'K3 Safety & Panic Recall',
  'quiz.mode_onomatopoeia': 'Clinical Pain Onomatopoeia',
  'quiz.answer_check': 'Check Answer',
  'quiz.answer_next': 'Next Question',
  'quiz.grade_again': 'Again (1)',
  'quiz.grade_hard': 'Hard (2)',
  'quiz.grade_good': 'Good (3)',
  'quiz.grade_easy': 'Easy (4)',

  // ── Word Garden (FSRS SRS) ──
  'kebun.title': 'FSRS Word Garden',
  'kebun.desc': 'Track your long-term memory consolidation powered by the FSRS v4.5 algorithm.',
  'kebun.seed': 'Seed (New)',
  'kebun.sprout': 'Sprout (Learning)',
  'kebun.tree': 'Young Tree (Reviewing)',
  'kebun.mature': 'Mature Tree (Mastered)',
  'kebun.review_now': 'Water Garden Now',

  // ── Sensei AI ──
  'sensei.title': 'Sensei AI Personal Tutor',
  'sensei.status_ready': 'Ready to Mentor',
  'sensei.status_thinking': 'Sensei is thinking...',
  'sensei.input_placeholder': 'Ask about grammar, nuance differences, or conversational roleplay...',
  'sensei.send': 'Send',
  'sensei.clear_history': 'Clear Chat History',

  // ── Settings ──
  'settings.title': 'Settings & Preferences',
  'settings.theme': 'Theme',
  'settings.language': 'Interface Language',
  'settings.furigana': 'Show Furigana',
  'settings.romaji': 'Show Romaji',
  'settings.sfx': 'Quiz Sound Effects',
  'settings.tts_speed': 'Audio Pronunciation Speed',
  'settings.l1_dialect': 'Native L1 Substratum Adaptation',
  'settings.backup_export': 'Export Data Backup',
  'settings.backup_import': 'Restore Data Backup',
};
