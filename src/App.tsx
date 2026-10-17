import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Toast } from './components/ui/Toast';
import { SearchPalette } from './components/ui/SearchPalette';
import { DetailModal } from './components/ui/DetailModal';
import { InstallModal } from './components/ui/InstallModal';
import { UpdatePromptToast } from './components/ui/UpdatePromptToast';
import { OfflineBanner } from './components/ui/OfflineBanner';
import { StreakBrokenModal } from './components/gamification/StreakBrokenModal';
import { AuthModal } from './components/auth/AuthModal';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { FeatureGuideModal } from './components/ui/FeatureGuideModal';

// Lazy-loaded heavy modal views with isolated chunk splitting (Ticket T-232)
const KanaChartModal = React.lazy(() => import('./components/kana/KanaChartModal').then(m => ({ default: m.KanaChartModal })));
const ConjugationModal = React.lazy(() => import('./components/grammar/ConjugationModal').then(m => ({ default: m.ConjugationModal })));
const NuanceCompareModal = React.lazy(() => import('./components/grammar/NuanceCompareModal').then(m => ({ default: m.NuanceCompareModal })));
const PatchNotesModal = React.lazy(() => import('./components/ui/PatchNotesModal').then(m => ({ default: m.PatchNotesModal })));
const KotowazaModal = React.lazy(() => import('./components/kotowaza/KotowazaModal').then(m => ({ default: m.KotowazaModal })));
const StudyToolboxModal = React.lazy(() => import('./components/tools/StudyToolboxModal').then(m => ({ default: m.StudyToolboxModal })));
const CatPlacementModal = React.lazy(() => import('./components/cat/CatPlacementModal').then(m => ({ default: m.CatPlacementModal })));
import { ContextualSenseiSheet } from './components/sensei/ContextualSenseiSheet';
import { usePwaStore } from './lib/pwa/pwaStore';
import { useAuthStore } from './lib/supabase/authStore';
import { NormalizedVocab, NormalizedGrammar } from './lib/data/dataManager';
import { GlobalModalManager } from './components/modals/GlobalModalManager';
import { useModalStore } from './store/useModalStore';
import { SkeletonGrid } from './components/ui/SkeletonCard';
import { A11yAnnouncer } from './components/ui/A11yAnnouncer';
import { RouteErrorBoundary } from './components/ui/RouteErrorBoundary';
import { ModalErrorBoundary } from './components/ui/ModalErrorBoundary';
import { transitionTabChange } from './lib/ui/navigation';

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
    isPatchNotesOpen,
    closePatchNotes,
    isKotowazaOpen,
    closeKotowaza,
    isToolboxOpen,
    closeToolbox,
    isCatPlacementOpen,
    closeCatPlacement,
    openCatPlacement,
    openKotowaza,
    openFeatureGuide,
    theme,
    isKanaOpen,
    openKana,
    closeKana,
    isConjugationOpen,
    openConjugation,
    closeConjugation,
    isNuanceOpen,
    openNuance,
    closeNuance,
    detailModalItem,
    detailModalType,
    closeDetailModal,
  } = useAppStore();
  const { initPwa } = usePwaStore();
  const { initAuth } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<(NormalizedVocab | NormalizedGrammar) | null>(null);
  const [modalItemType, setModalItemType] = useState<'vocab' | 'grammar'>('vocab');

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
  }, [initPwa, initAuth, checkStreakStatus]);

  // Listen to browser forward/back hash & popstate changes
  useEffect(() => {
    const handlePopState = () => {
      // Dismiss top modal if a modal is open in the global stack
      if (useModalStore.getState().modalStack.length > 0) {
        useModalStore.getState().closeModal();
        return;
      }

      const fullHash = (window.location.hash || '').replace('#', '');
      const baseTab = fullHash.split('?')[0].toLowerCase();
      const mapped = baseTab === 'browse' ? 'materi' : (baseTab === 'stats' || baseTab === 'retensi') ? 'kebun' : baseTab;

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
        transitionTabChange(mapped as any, setActiveTab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [setActiveTab]);

  // Smooth scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Desktop global keyboard shortcut listener (⌘K, ?, F, R)
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

      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
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
    setSelectedModalItem(item);
    setModalItemType(type);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'materi':
        return <MateriHubPage />;
      case 'quiz':
        return <QuizPage />;
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-accent focus:text-bg font-bold focus:rounded-xl focus:shadow-xl focus:ring-2 focus:ring-accent focus:outline-none transition-transform"
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
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 w-full max-w-full min-w-0 overflow-x-hidden">
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
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
              {renderActiveView()}
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

      {/* Global Detail Modal */}
      <DetailModal
        item={detailModalItem || selectedModalItem}
        type={detailModalItem ? detailModalType : modalItemType}
        onClose={() => {
          setSelectedModalItem(null);
          closeDetailModal();
        }}
      />

      {/* Keyboard Shortcuts Helper Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* PWA Update Prompt Toast (Prompt-based Service Worker Update Flow) */}
      <UpdatePromptToast />

      {/* PWA Add to Home Screen Modal */}
      <InstallModal />

      {/* Streak Broken Motivational Modal */}
      <StreakBrokenModal />

      {/* Supabase User Authentication Modal */}
      <AuthModal />

      {/* Interactive Onboarding Tour Modal */}
      <OnboardingModal />

      {/* Feature Guide & Directory Modal */}
      <FeatureGuideModal
        onOpenKana={openKana}
        onOpenConjugation={openConjugation}
        onOpenNuance={openNuance}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Interactive Kana Chart Modal */}
      <ModalErrorBoundary modalName="Tabel Kana" isOpen={isKanaOpen} onClose={closeKana}>
        <KanaChartModal
          isOpen={isKanaOpen}
          onClose={closeKana}
        />
      </ModalErrorBoundary>

      {/* Verb Conjugation Matrix Modal */}
      <ModalErrorBoundary modalName="Konjugasi Kata Kerja" isOpen={isConjugationOpen} onClose={closeConjugation}>
        <ConjugationModal
          isOpen={isConjugationOpen}
          onClose={closeConjugation}
        />
      </ModalErrorBoundary>

      {/* Grammar Nuance Compare Modal */}
      <ModalErrorBoundary modalName="Perbandingan Nuansa Tata Bahasa" isOpen={isNuanceOpen} onClose={closeNuance}>
        <NuanceCompareModal
          isOpen={isNuanceOpen}
          onClose={closeNuance}
        />
      </ModalErrorBoundary>

      {/* Historical Patch Notes & Changelog Modal */}
      <ModalErrorBoundary modalName="Catatan Pembaruan" isOpen={isPatchNotesOpen} onClose={closePatchNotes}>
        <PatchNotesModal
          isOpen={isPatchNotesOpen}
          onClose={closePatchNotes}
        />
      </ModalErrorBoundary>

      {/* 52 Traditional Japanese Proverbs & Wisdom Gallery */}
      <ModalErrorBoundary modalName="Galeri Peribahasa Kotowaza" isOpen={isKotowazaOpen} onClose={closeKotowaza}>
        <KotowazaModal
          isOpen={isKotowazaOpen}
          onClose={closeKotowaza}
        />
      </ModalErrorBoundary>

      {/* Unified Kotak Peralatan Belajar (Study Toolbox Modal) */}
      <ModalErrorBoundary modalName="Kotak Peralatan Belajar" isOpen={isToolboxOpen} onClose={closeToolbox}>
        <StudyToolboxModal
          isOpen={isToolboxOpen}
          onClose={closeToolbox}
          onOpenKana={openKana}
          onOpenConjugation={openConjugation}
          onOpenNuance={openNuance}
          onOpenKotowaza={openKotowaza}
          onOpenCatPlacement={openCatPlacement}
          onOpenFeatureGuide={openFeatureGuide}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />
      </ModalErrorBoundary>

      {/* Adaptive Diagnostic Placement Test (CAT) Modal */}
      <ModalErrorBoundary modalName="Tes Penempatan Adaptif (CAT)" isOpen={isCatPlacementOpen} onClose={closeCatPlacement}>
        <CatPlacementModal
          isOpen={isCatPlacementOpen}
          onClose={closeCatPlacement}
        />
      </ModalErrorBoundary>

      {/* Centralized Global Dynamic Modal Manager */}
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
