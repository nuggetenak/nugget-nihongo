import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/ui/Toast';
import { SearchPalette } from './components/ui/SearchPalette';
import { DetailModal } from './components/ui/DetailModal';
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
  const { activeTab, setActiveTab } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModalItem, setSelectedModalItem] = useState<(NormalizedVocab | NormalizedGrammar) | null>(null);
  const [modalItemType, setModalItemType] = useState<'vocab' | 'grammar'>('vocab');

  // Keyboard shortcut listener (Ctrl+K or ⌘K for spotlight search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
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
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen pb-20 lg:pb-12">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 px-4 lg:px-8 max-w-7xl w-full mx-auto">
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
    </div>
  );
};

export default App;
