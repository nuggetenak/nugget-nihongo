import React from 'react';
import { Home, BookOpen, Layers, Sprout, Sparkles, Settings, HelpCircle } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';

interface NavItem {
  id: AppState['activeTab'];
  label: string;
  jp: string;
  icon: React.ReactNode;
  badge?: string;
  isSpecial?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Beranda', jp: 'ホーム', icon: <Home className="w-5 h-5" /> },
    { id: 'materi', label: 'Materi Hub', jp: '学習', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quiz', label: 'Arena Kuis', jp: '練習', icon: <Layers className="w-5 h-5" /> },
    { id: 'kebun', label: 'Kebun Kata', jp: '庭園', icon: <Sprout className="w-5 h-5" /> },
    { 
      id: 'sensei', 
      label: 'Sensei AI', 
      jp: '先生', 
      icon: <Sparkles className="w-5 h-5 text-accent-hot" />,
      badge: 'Soon',
      isSpecial: true
    },
    { id: 'settings', label: 'Pengaturan', jp: '設定', icon: <Settings className="w-5 h-5" /> },
    { id: 'about', label: 'Tentang App', jp: '情報', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-surface border-r border-accent/15 z-40 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-accent/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-xl shadow-glow">
            🍙
          </div>
          <div>
            <div className="font-bold text-base text-appText-bright leading-tight tracking-tight">
              Nugget 日本語
            </div>
            <div className="text-[11px] text-accent font-semibold tracking-wider uppercase">
              Teman Belajar
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-accent-hot font-bold border border-amber-500/30 shadow-sm'
                  : 'text-appText/80 hover:bg-surface-2 hover:text-appText-bright'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-accent-hot' : 'text-appText/60'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                ) : (
                  <span className="text-[11px] font-jp opacity-40">{item.jp}</span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom User / Info Card */}
      <div className="p-4 border-t border-accent/15 bg-surface-2/40">
        <div className="flex items-center justify-between text-xs text-appText-muted">
          <span>v15.16 · Modern Engine</span>
          <span className="text-accent font-semibold">100% Offline</span>
        </div>
      </div>
    </aside>
  );
};
