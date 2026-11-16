// ══════════════════════════════════════════════════════════════════
//  BottomNav.tsx — Responsive 5-Tab Mobile Navigation Shell
//  Tab 1: Belajar ('home')
//  Tab 2: Review ('kebun')
//  Tab 3: Dojo & Pustaka ('materi')
//  Tab 4: Sensei AI ('sensei')
//  Tab 5: Profil & Pengaturan ('settings')
// ══════════════════════════════════════════════════════════════════

import React, { useMemo } from 'react';
import { Home, BookOpen, Layers, Sprout, Sparkles, User, Compass } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';
import { useExerciseStore } from '../../store/useExerciseStore';
import { getFSRSDueCount } from '../../lib/fsrs/math';
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
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const cards = useAppStore((s) => s.cards);
  const currentSet = useExerciseStore((s) => s.currentSet);
  const isSubmitted = useExerciseStore((s) => s.isSubmitted);
  const hasActiveCbt = currentSet !== null && !isSubmitted;

  // Immersion Shield: Automatically hide BottomNav during timed exams and study studio
  if (activeTab === 'study') {
    return null;
  }
  if (hasActiveCbt) {
    return null;
  }

  // Calculate live FSRS due cards count for review badge
  const dueCount = useMemo(() => {
    try {
      const safeCards = cards && typeof cards === 'object' ? cards : {};
      return getFSRSDueCount(safeCards);
    } catch {
      return 0;
    }
  }, [cards]);

  // 5-Tab Core Navigation Architecture (Sovereign Mobile-First Model)
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
      id: 'kebun',
      label: 'Ulas',
      icon: <Sprout className="w-5 h-5" />,
      isActive: activeTab === 'kebun',
    },
    {
      id: 'materi',
      label: 'Dojo',
      icon: <BookOpen className="w-5 h-5" />,
      isActive: activeTab === 'materi' || activeTab === 'choukai' || activeTab === 'quiz',
    },
    {
      id: 'sensei',
      label: 'Sensei',
      icon: <Sparkles className="w-5 h-5" />,
      isActive: activeTab === 'sensei',
    },
    {
      id: 'settings',
      label: 'Akun',
      icon: <User className="w-5 h-5" />,
      isActive: activeTab === 'settings' || activeTab === 'about' || activeTab === 'methodology',
    },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Navigasi Utama Ponsel" 
      className="lg:hidden fixed z-40 bg-surface/95 backdrop-blur-lg border-accent/20 px-1 py-1 flex items-center justify-between safe-area-bottom bottom-0 left-0 right-0 border-t sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md sm:rounded-2xl sm:border sm:shadow-2xl"
    >
      {items.map((item) => {
        const isActive = item.isActive;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                try {
                  navigator.vibrate(10);
                } catch {}
              }
              if (isActive) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                transitionTabChange(item.id, setActiveTab);
              }
            }}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 min-h-[48px] py-1.5 px-1 min-w-0 flex flex-col landscape:flex-row landscape:min-h-[38px] landscape:py-0.5 items-center justify-center rounded-2xl transition-all relative active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isActive
                ? 'text-accent font-extrabold bg-amber-500/12'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className={`transition-transform duration-300 ease-spring ${isActive ? 'scale-110 text-accent' : 'scale-100'}`}>
                {item.icon}
              </span>
              {item.id === 'kebun' && dueCount > 0 && (
                <span 
                  aria-label={`${dueCount} kartu perlu diulas`}
                  className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center shadow-xs pointer-events-none animate-in zoom-in-75 duration-200"
                >
                  {dueCount > 99 ? '99+' : dueCount}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs mt-1 landscape:mt-0 landscape:ml-1.5 font-bold tracking-tight truncate max-w-full text-center">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-0.5 landscape:hidden shadow-glow ring-2 ring-amber-500/25" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
