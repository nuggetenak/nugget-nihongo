import React, { useState, useEffect } from 'react';
import { useAppStore, AppState } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Toast } from './components/ui/Toast';
import { SearchPalette } from './components/ui/SearchPalette';
import { UpdatePromptToast } from './components/ui/UpdatePromptToast';
import { OfflineBanner } from './components/ui/OfflineBanner';

import { ContextualSenseiSheet } from './components/sensei/ContextualSenseiSheet';
import { usePwaStore } from './lib/pwa/pwaStore';
import { useAuthStore } from './lib/supabase/authStore';
import { NormalizedVocab, NormalizedGrammar } from './lib/data/dataManager';
import { GlobalModalManager } from './components/modals/GlobalModalManager';
import { useModalStore } from './store/useModalStore';
import { useExerciseStore } from './store/useExerciseStore';
import { SkeletonGrid } from './components/ui/SkeletonCard';
import { A11yAnnouncer } from './components/ui/A11yAnnouncer';
import { RouteErrorBoundary } from './components/ui/RouteErrorBoundary';
import { ModalErrorBoundary } from './components/ui/ModalErrorBoundary';
import { transitionTabChange, getTabScrollMemory } from './lib/ui/navigation';

// Eagerly loaded default view for zero-latency initial paint
import { HomePage } from './pages/HomePage';

// Lazy-loaded secondary route views with isolated vendor chunks (Ticket T-92)
const MateriHubPage = React.lazy(() => import('./pages/MateriHubPage').then(m => ({ default: m.MateriHubPage })));
const QuizPage = React.lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })));
const KebunPage = React.lazy(() => import('./pages/KebunPage').then(m => ({ default: m.KebunPage })));
const SenseiPage = React.lazy(() => import('./pages/SenseiPage').then(m => ({ default: m.SenseiPage })));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const LessonStudyPage = React.lazy(() => import('./pages/LessonStudyPage').then(m => ({ default: m.LessonStudyPage })));
const MethodologyPage = React.lazy(() => import('./pages/MethodologyPage').then(m => ({ default: m.MethodologyPage })));
const ChoukaiSimulatorPage = React.lazy(() => import('./pages/ChoukaiSimulatorPage').then(m => ({ default: m.ChoukaiSimulatorPage })));

import { PageSkeleton } from './components/ui/PageSkeleton';

const RouteSuspenseFallback: React.FC = () => (
  <div className="w-full">
    <PageSkeleton />
    <div className="sr-only" aria-hidden="true">
      <SkeletonGrid count={6} type="card" />
    </div>
  </div>
);

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    checkStreakStatus,
    openFeatureGuide,
    theme,
    openKana,
    openConjugation,
    openNuance,
  } = useAppStore();
  const { initPwa } = usePwaStore();
  const { initAuth } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync dark/light theme to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme]);

  // Initialize PWA Service Worker, Supabase Auth session, & Streak Check on mount
  useEffect(() => {
    initPwa();
    initAuth();
    checkStreakStatus();
    // Initialize persisted non-destructive font scaling (rem percentage scale)
    if (typeof window !== 'undefined') {
      const savedTextSize = localStorage.getItem('nn_text_size');
      if (savedTextSize === 'small') {
        document.documentElement.style.fontSize = '93.75%';
        document.documentElement.setAttribute('data-text-size', 'small');
      } else if (savedTextSize === 'large') {
        document.documentElement.style.fontSize = '109.375%';
        document.documentElement.setAttribute('data-text-size', 'large');
      }
    }
    if (typeof window !== 'undefined' && !localStorage.getItem('nn_onboarding_completed')) {
      const hash = window.location.hash || '';
      const isRootOrHome = !hash || hash === '#' || hash === '#home' || hash === '#belajar';
      if (isRootOrHome) {
        useModalStore.getState().openModal('onboarding');
      }
    }
  }, [initPwa, initAuth, checkStreakStatus]);

  // Listen to browser forward/back hash & popstate changes
  useEffect(() => {
    const syncRouteFromHash = () => {
      const fullHash = (window.location.hash || '').replace('#', '');
      const baseTab = fullHash.split('?')[0].toLowerCase();
      const segments = baseTab.split('/');
      let rootSegment = segments[0];
      let subSegment = segments[1];

      // Support kebab-case hash sub-routing (#dojo-drills, #dojo-kamus, #dojo-pustaka, #dojo-cbt)
      if (rootSegment.startsWith('dojo-')) {
        subSegment = rootSegment.substring(5);
        rootSegment = 'dojo';
      }

      const ROUTE_ALIAS_MAP: Record<string, AppState['activeTab']> = {
        browse: 'materi',
        dojo: 'materi',
        stats: 'kebun',
        retensi: 'kebun',
        ulas: 'kebun',
        kebun: 'kebun',
        arena: 'quiz',
        kuis: 'quiz',
        quiz: 'quiz',
        metodologi: 'methodology',
        method: 'methodology',
        methodology: 'methodology',
        belajar: 'home',
        home: 'home',
        profil: 'settings',
        pengaturan: 'settings',
        settings: 'settings',
        akun: 'settings',
        tentang: 'about',
        about: 'about',
        sensei: 'sensei',
        study: 'study',
        choukai: 'choukai',
      };

      // Route Sub-Path Matchers and Legacy Contract Assertions
      const isSettings = rootSegment === 'profil' || rootSegment === 'pengaturan' || rootSegment === 'settings';
      const isDojo = rootSegment === 'dojo';
      const mapped = isSettings ? 'settings' : (isDojo ? 'materi' : (ROUTE_ALIAS_MAP[rootSegment] || (rootSegment as AppState['activeTab'])));

      // Dojo Pillar Sub-Routing (#dojo/drills, #dojo/dictionary, #dojo/reference, #dojo/cbt)
      if (mapped === 'materi' && subSegment) {
        if (subSegment === 'drills' || subSegment === 'latihan') {
          useAppStore.getState().setDojoTab('latihan');
        } else if (subSegment === 'dictionary' || subSegment === 'kamus') {
          useAppStore.getState().setDojoTab('kamus');
        } else if (subSegment === 'reference' || subSegment === 'alat' || subSegment === 'pustaka') {
          useAppStore.getState().setDojoTab('alat');
        } else if (subSegment === 'cbt' || subSegment === 'simulasi' || subSegment === 'ujian') {
          useAppStore.getState().setDojoTab('cbt');
        }
      }

      if (mapped === 'study') {
        const qIndex = fullHash.indexOf('?');
        if (qIndex !== -1) {
          const params = new URLSearchParams(fullHash.substring(qIndex + 1));
          const trackId = params.get('track') || 'n5';
          const lessonId = params.get('lesson') || '';
          const unitId = params.get('unit') || '';
          const trackType = (params.get('type') || 'curriculum') as any;
          if (lessonId) {
            useAppStore.getState().openLessonStudy(trackId, unitId, lessonId, trackType);
            return;
          }
        }
        setActiveTab('study');
        return;
      }

      const validTabs = ['home', 'materi', 'quiz', 'kebun', 'sensei', 'settings', 'about', 'study', 'methodology', 'choukai'] as const;
      if (validTabs.includes(mapped as any)) {
        if (useAppStore.getState().activeLessonContext) {
          useAppStore.setState({ activeLessonContext: null });
        }
        transitionTabChange(mapped as any, setActiveTab);
      }
    };

    const handlePopState = () => {
      // Dismiss top modal if a modal is open in the global stack
      if (useModalStore.getState().modalStack.length > 0) {
        useModalStore.getState().closeModal();
        return;
      }
      syncRouteFromHash();
    };

    const handleHashChange = () => {
      syncRouteFromHash();
    };

    // Initial mount sync (does not pop active modals)
    syncRouteFromHash();
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setActiveTab]);

  // Per-tab scroll restoration when activeTab changes (restores last viewport scroll position or resets to top 0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetScroll = getTabScrollMemory(activeTab) || 0;
      if (targetScroll === 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } else {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetScroll, behavior: 'instant' });
        });
      }
    }
  }, [activeTab]);

  // Dynamic document.title synchronization
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const TAB_TITLE_MAP: Record<string, string> = {
      home: 'Belajar',
      materi: 'Dojo Latihan',
      kebun: 'Pusat Retensi',
      quiz: 'Arena Kuis',
      sensei: 'Sensei AI',
      methodology: 'Metodologi & Riset',
      settings: 'Profil & Pengaturan',
      about: 'Tentang Aplikasi',
      study: 'Sesi Belajar',
      choukai: 'Choukai Listening',
    };
    const pageTitle = TAB_TITLE_MAP[activeTab] || 'Belajar Bahasa Jepang';
    document.title = `${pageTitle} · Nugget Nihongo`;
  }, [activeTab]);

  // Desktop global keyboard shortcut listener (⌘K, ?, F, R, T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut ⌘K / Ctrl+K (Global search)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      // Ignore single hotkeys if typing in inputs or textareas (Edge Case 5)
      const target = e.target as HTMLElement;
      const isInput = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );
      if (isInput) return;

      if (e.key === 'Escape' && !e.defaultPrevented) {
        if (useModalStore.getState().modalStack.length > 0) {
          e.preventDefault();
          useModalStore.getState().closeModal();
          return;
        }
      } else if (e.key === '?') {
        e.preventDefault();
        useModalStore.getState().openModal('shortcuts');
      } else if (e.key.toLowerCase() === 't') {
        const { toggleTheme, theme, showToast } = useAppStore.getState();
        toggleTheme();
        const next = theme === 'dark' ? 'Terang' : 'Gelap';
        showToast(`Tema diganti ke mode ${next}`, theme === 'dark' ? '☀️' : '🌙');
      } else if (e.key.toLowerCase() === 'f') {
        const { showFurigana, setShowFurigana, showToast } = useAppStore.getState();
        setShowFurigana(!showFurigana);
        showToast(!showFurigana ? 'Furigana diaktifkan' : 'Furigana disembunyikan', '文');
      } else if (e.key.toLowerCase() === 'r') {
        const { showRomaji, setShowRomaji, showToast } = useAppStore.getState();
        setShowRomaji(!showRomaji);
        showToast(!showRomaji ? 'Romaji diaktifkan' : 'Romaji dinonaktifkan', '🔤');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectItemFromSearch = (item: NormalizedVocab | NormalizedGrammar, type: 'vocab' | 'grammar') => {
    useModalStore.getState().openModal('detail', { item, type });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'materi':
        return <MateriHubPage />;
      case 'quiz': {
        const { quizInitialMode } = useAppStore.getState();
        const hasActiveExercise =
          useExerciseStore.getState().currentSet && !useExerciseStore.getState().isSubmitted;
        if (quizInitialMode || hasActiveExercise) {
          return <QuizPage />;
        }
        return <MateriHubPage initialTab="latihan" />;
      }
      case 'kebun':
        return <KebunPage />;
      case 'sensei':
        return <SenseiPage />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      case 'study':
        return <LessonStudyPage />;
      case 'methodology':
        return <MethodologyPage />;
      case 'choukai':
        return <ChoukaiSimulatorPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-appText flex flex-col antialiased selection:bg-amber-500/30 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Skip to Content Accessible Link (WCAG 2.1 Bypass Blocks) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-3 focus:bg-amber-600 focus:text-white dark:focus:bg-amber-500 dark:focus:text-stone-950 font-black focus:rounded-2xl focus:shadow-2xl focus:ring-4 focus:ring-amber-500/50 focus:outline-none transition-transform"
      >
        Lewati ke konten utama
      </a>

      {/* Screen Reader Live Region Announcer (WCAG 2.1 Status Messages) */}
      <A11yAnnouncer />

      {/* Floating Offline Status Banner */}
      <OfflineBanner />

      {/* Desktop Sidebar (Fixed left 260px) */}
      <Sidebar />

      {/* Main App Content Container (Offset by 260px on desktop) */}
      <div className={`flex-1 lg:pl-[260px] flex flex-col min-h-screen ${
        activeTab === 'study'
          ? 'pb-0'
          : 'pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'
      } w-full max-w-full min-w-0 overflow-x-hidden`}>
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenShortcuts={() => useModalStore.getState().openModal('shortcuts')}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        />
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className="flex-1 px-3 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto min-w-0 overflow-x-hidden focus:outline-none"
        >
          <RouteErrorBoundary
            currentTab={activeTab}
            onResetToHome={() => setActiveTab('home')}
          >
            <React.Suspense fallback={<RouteSuspenseFallback />}>
              <div key={activeTab} className="animate-page-enter">
                {renderActiveView()}
              </div>
            </React.Suspense>
          </RouteErrorBoundary>
        </main>
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenKana={openKana}
        onOpenConjugation={openConjugation}
        onOpenNuance={openNuance}
      />

      {/* Mobile Bottom Navigation (Includes direct 1-tap Tentang tab) */}
      <BottomNav />

      {/* Floating Modern Toast Capsule */}
      <Toast />

      {/* Spotlight Command Palette (⌘K) */}
      <SearchPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSelectItemFromSearch}
      />

      {/* PWA Update Prompt Toast (Prompt-based Service Worker Update Flow) */}
      <UpdatePromptToast />

      {/* 
        Centralized Global Dynamic Modal Manager (ADR-014 / Ticket T-42 / Ticket T-13)
        Single source of truth for all modal rendering via unified modalStack:
        DetailModal, KanaChartModal, ConjugationModal, NuanceCompareModal,
        PatchNotesModal, KotowazaModal, StudyToolboxModal, CatPlacementModal
        Wired with onOpenPitch for complete pitch accent integration.
      */}
      <ModalErrorBoundary modalName="Modal Dinamis Global">
        <GlobalModalManager />
      </ModalErrorBoundary>

      {/* Context-Injected Sensei Studio Bottom Sheet */}
      <ModalErrorBoundary modalName="Sensei AI Studio">
        <ContextualSenseiSheet />
      </ModalErrorBoundary>
    </div>
  );
};

export default App;
