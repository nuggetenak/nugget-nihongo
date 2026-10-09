import React from 'react';
import { Home, BookOpen, Layers, Sprout, Settings } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const items: Array<{ id: AppState['activeTab']; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'quiz', label: 'Kuis', icon: <Layers className="w-5 h-5" /> },
    { id: 'kebun', label: 'Kebun', icon: <Sprout className="w-5 h-5" /> },
    { id: 'settings', label: 'Setelan', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-accent/20 px-2 py-1.5 flex items-center justify-around safe-area-bottom">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-accent-hot font-bold'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
              {item.icon}
            </span>
            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent-hot mt-0.5 shadow-glow" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
