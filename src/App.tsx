import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/ui/Toast';
import { SearchPalette } from './components/ui/SearchPalette';
import { DetailModal } from './components/ui/DetailModal';
import { InstallModal } from './components/ui/InstallModal';
import { StreakBrokenModal } from './components/gamification/StreakBrokenModal';
import { AuthModal } from './components/auth/AuthModal';
import { KeyboardShortcutsModal } from './components/ui/KeyboardShortcutsModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { FeatureGuideModal } from './components/ui/FeatureGuideModal';
import { KanaChartModal } from './components/kana/KanaChartModal';
import { ConjugationModal } from './components/grammar/ConjugationModal';
import { NuanceCompareModal } from './components/grammar/NuanceCompareModal';
import { usePwaStore } from './lib/pwa/pwaStore';
import { useAuthStore } from './lib/supabase/authStore';
import { NormalizedVocab, NormalizedGrammar } from './lib/data/dataManager';

// Views
import { HomePage } from './pages/HomePage';
import { MateriHubPage } from './pages/MateriHubPage';
import { QuizPage } from './pages/QuizPage';
import { KebunPage } from './pages/KebunPage';
import { SenseiPage } from './pages/SenseiPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const { activeTab, setActiveTab, checkStreakStatus } = useAppStore();
  const { initPwa } = usePwaStore();
  const { initAuth } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isKanaOpen, setIsKanaOpen] = useState(false);
  const [isConjugationOpen, setIsConjugationOpen] = useState(false);
  const [isNuanceOpen, setIsNuanceOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<(NormalizedVocab | NormalizedGrammar) | null>(null);
  const [modalItemType, setModalItemType] = useState<'vocab' | 'grammar'>('vocab');

  // Initialize PWA Service Worker, Supabase Auth session, & Streak Check on mount
  useEffect(() => {
    initPwa();
    initAuth();
    checkStreakStatus();
  }, [initPwa, initAuth, checkStreakStatus]);

  // Listen to browser forward/back hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const raw = (window.location.hash || '').replace('#', '').toLowerCase();
      const mapped = raw === 'browse' ? 'materi' : raw === 'stats' ? 'kebun' : raw;
      const validTabs = ['home', 'materi', 'quiz', 'kebun', 'sensei', 'settings', 'about'] as const;
      if (validTabs.includes(mapped as any)) {
        setActiveTab(mapped as any);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveTab]);

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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-appText flex flex-col antialiased selection:bg-amber-500/30 selection:text-white">
      {/* Desktop Sidebar (Fixed left 260px) */}
      <Sidebar />

      {/* Main App Content Container (Offset by 260px on desktop) */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12">
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
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
        item={selectedModalItem}
        type={modalItemType}
        onClose={() => setSelectedModalItem(null)}
      />

      {/* Keyboard Shortcuts Helper Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

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
        onOpenKana={() => setIsKanaOpen(true)}
        onOpenConjugation={() => setIsConjugationOpen(true)}
        onOpenNuance={() => setIsNuanceOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Interactive Kana Chart Modal */}
      <KanaChartModal
        isOpen={isKanaOpen}
        onClose={() => setIsKanaOpen(false)}
      />

      {/* Verb Conjugation Matrix Modal */}
      <ConjugationModal
        isOpen={isConjugationOpen}
        onClose={() => setIsConjugationOpen(false)}
      />

      {/* Grammar Nuance Compare Modal */}
      <NuanceCompareModal
        isOpen={isNuanceOpen}
        onClose={() => setIsNuanceOpen(false)}
      />
    </div>
  );
};

export default App;
