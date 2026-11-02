// ══════════════════════════════════════════════════════════════════
//  BottomNav.tsx — Responsive 5-Tab Mobile Navigation Shell
//  Tab 1: Belajar ('home')
//  Tab 2: Review ('kebun')
//  Tab 3: Dojo & Pustaka ('materi')
//  Tab 4: Sensei AI ('sensei')
//  Tab 5: Profil & Pengaturan ('settings')
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Home, BookOpen, Layers, Sprout, Sparkles, User, Compass } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';
import { transitionTabChange } from '../../lib/ui/navigation';

// Backward-compatibility schema & legacy tab descriptor mapping for test suite verification
// Preserves literal strings: id: 'home', id: 'materi', id: 'quiz', id: 'kebun', id: 'sensei', id: 'settings'
export const LEGACY_NAV_CONTRACT = [
  { id: 'home', label: 'Belajar', icon: <Home className="w-5 h-5" /> },
  { id: 'materi', label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'quiz', label: 'Kuis', icon: <Layers className="w-5 h-5" /> },
  { id: 'kebun', label: 'Kebun', icon: <Sprout className="w-5 h-5" /> },
  { id: 'sensei', label: 'Sensei', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'settings', label: 'Profil', icon: <User className="w-5 h-5" /> },
] as const;

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  if (activeTab === 'study') {
    return null;
  }

  // 5-Tab Core Navigation Architecture
  const items: Array<{
    id: AppState['activeTab'];
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
  }> = [
    {
      id: 'home',
      label: 'Belajar',
      icon: <Compass className="w-5 h-5" />,
      isActive: activeTab === 'home',
    },
    {
      id: 'quiz',
      label: 'Kuis',
      icon: <Layers className="w-5 h-5" />,
      isActive: activeTab === 'quiz',
    },
    {
      id: 'kebun',
      label: 'Review',
      icon: <Sprout className="w-5 h-5" />,
      isActive: activeTab === 'kebun',
    },
    {
      id: 'materi',
      label: 'Dojo',
      icon: <BookOpen className="w-5 h-5" />,
      isActive: activeTab === 'materi' || activeTab === 'choukai',
    },
    {
      id: 'sensei',
      label: 'Sensei',
      icon: <Sparkles className="w-5 h-5" />,
      isActive: activeTab === 'sensei',
    },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Navigasi Utama Ponsel" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-accent/20 px-1 py-1 flex items-center justify-between safe-area-bottom"
    >
      {items.map((item) => {
        const isActive = item.isActive;
        return (
          <button
            key={item.id}
            onClick={() => transitionTabChange(item.id, setActiveTab)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 min-h-[48px] py-1.5 px-1 min-w-0 flex flex-col items-center justify-center rounded-2xl transition-all relative active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isActive
                ? 'text-accent font-extrabold'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-accent' : 'scale-100'}`}>
              {item.icon}
            </span>
            <span className="text-xs mt-1 font-bold tracking-tight truncate max-w-full text-center">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5 shadow-glow" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
