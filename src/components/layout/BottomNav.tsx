// ══════════════════════════════════════════════════════════════════
//  BottomNav.tsx — Responsive Mobile Navigation Bar
//  Includes direct 1-tap access to Tentang Aplikasi, Kuis, Materi, & Kebun
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Home, BookOpen, Layers, Sparkles } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const items: Array<{ id: AppState['activeTab']; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quiz', label: 'Latihan', icon: <Layers className="w-5 h-5" /> },
    { id: 'sensei', label: 'Sensei AI', icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-accent/20 px-1 py-1 flex items-center justify-between safe-area-bottom">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 min-h-[48px] py-1.5 px-1 min-w-0 flex flex-col items-center justify-center rounded-2xl transition-all relative active:scale-95 ${
              isActive
                ? 'text-accent font-extrabold'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110 text-accent' : 'scale-100'}`}>
              {item.icon}
            </span>
            <span className="text-[10px] sm:text-xs mt-1 font-bold tracking-tight truncate max-w-full text-center">
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
