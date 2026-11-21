// ══════════════════════════════════════════════════════════════════
//  MobileDrawer.tsx — Slide-Over Navigation Drawer for Mobile Devices
//  Provides complete access to all pages (including Tentang App & Sensei),
//  learning tools, and cloud account on small screens
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import {
  X,
  Home,
  BookOpen,
  Sprout,
  Sparkles,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  ChevronRight,
  User as UserIcon,
  Cloud,
  History,
  Wrench,
  GraduationCap,
} from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { transitionTabChange } from '../../lib/ui/navigation';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { APP_VERSION } from '../../config/version';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKana?: () => void;
  onOpenConjugation?: () => void;
  onOpenNuance?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    activeTab,
    setActiveTab,
    openPatchNotes,
    theme,
    toggleTheme,
    showFurigana,
    setShowFurigana,
    showRomaji,
    setShowRomaji,
    soundEffects,
    setSoundEffects,
    openCatPlacement,
    openKotowaza,
    openToolbox,
  } = useAppStore();
  const { openModal } = useModalStore();
  const { user, openAuthModal } = useAuthStore();
  const touchStartXRef = React.useRef<number | null>(null);
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -50) {
      onClose();
    }
    touchStartXRef.current = null;
  };

  if (!isOpen) return null;

  const navItems: Array<{
    id: AppState['activeTab'];
    label: string;
    jp: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    { id: 'home', label: 'Belajar', jp: '学習', icon: <Home className="w-5 h-5 text-accent" /> },
    { id: 'kebun', label: 'Pusat Retensi (Brankas FSRS)', jp: '保持', icon: <Sprout className="w-5 h-5 text-nippon-tokiwa" /> },
    { id: 'materi', label: 'Dojo (Sasana Latihan & Ujian)', jp: '道場', icon: <BookOpen className="w-5 h-5 text-accent" />, badge: '4 Pilar' },
    { id: 'sensei', label: 'Sensei AI', jp: '先生', icon: <Sparkles className="w-5 h-5 text-nippon-fuji" /> },
    { id: 'methodology', label: 'Metodologi & Riset', jp: '方法', icon: <GraduationCap className="w-5 h-5 text-nippon-edo-indigo" />, badge: 'SLA' },
    { id: 'about', label: 'Tentang Aplikasi', jp: '情報', icon: <HelpCircle className="w-5 h-5 text-nippon-edo-indigo" />, badge: 'FAQ' },
    { id: 'settings', label: 'Profil & Pengaturan', jp: '設定', icon: <Settings className="w-5 h-5 text-accent" /> },
  ];

  const handleNavigate = (tab: AppState['activeTab']) => {
    if (useAppStore.getState().activeLessonContext) {
      useAppStore.getState().closeLessonStudy();
    }
    if (tab === 'quiz') {
      useAppStore.getState().setDojoTab('latihan');
      transitionTabChange('materi', setActiveTab);
    } else if (tab === 'materi') {
      transitionTabChange('materi', setActiveTab);
    } else {
      transitionTabChange(tab, setActiveTab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-4/5 max-w-xs bg-surface border-r border-border h-full flex flex-col justify-between shadow-xl z-10 animate-in slide-in-from-left duration-200 overflow-y-auto"
      >
        {/* Top Brand Header */}
        <div className="p-4 sm:p-5 border-b border-border bg-surface-2/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/icon-192.png"
                alt="Nugget Nihongo"
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-border"
              />
              <div>
                <div className="font-bold text-sm text-appText-bright leading-tight">
                  Nugget Nihongo
                </div>
                <div className="text-xs text-accent font-mono font-semibold">
                  {APP_VERSION}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup menu navigasi"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-appText-muted leading-relaxed">
            Teman belajar bahasa Jepang hangat dengan spaced repetition FSRS.
          </p>

          {/* Quick Control Center (Theme & Sound SFX, Furigana, & Romaji) */}
          <div className="grid grid-cols-4 gap-1.5 pt-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ganti ke Tema Terang' : 'Ganti ke Tema Gelap'}
              className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl bg-surface hover:bg-surface-2 border border-border text-xs font-semibold text-appText-bright active:scale-95 transition-all shadow-xs"
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-accent mb-1" /> : <Sun className="w-3.5 h-3.5 text-accent mb-1" />}
              <span className="text-[10px]">{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEffects(!soundEffects)}
              aria-label={soundEffects ? 'Matikan Suara SFX' : 'Aktifkan Suara SFX'}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl border text-xs font-semibold active:scale-95 transition-all shadow-xs ${
                soundEffects
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-surface hover:bg-surface-2 border-border text-appText-muted'
              }`}
            >
              <span className="text-xs mb-1 leading-none">{soundEffects ? '🔊' : '🔇'}</span>
              <span className="text-[10px]">SFX {soundEffects ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowFurigana(!showFurigana)}
              aria-label={showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl border text-xs font-semibold active:scale-95 transition-all shadow-xs ${
                showFurigana
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-surface hover:bg-surface-2 border-border text-appText-muted'
              }`}
            >
              <span lang="ja" className="font-jp font-bold text-xs mb-1 leading-none">文</span>
              <span className="text-[10px]">Furigana {showFurigana ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRomaji(!showRomaji)}
              aria-label={showRomaji ? 'Sembunyikan Romaji' : 'Tampilkan Romaji'}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl border text-xs font-semibold active:scale-95 transition-all shadow-xs ${
                showRomaji
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-surface hover:bg-surface-2 border-border text-appText-muted'
              }`}
            >
              <span className="font-mono font-bold text-xs mb-1 leading-none">Aa</span>
              <span className="text-[10px]">Romaji {showRomaji ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="p-3 space-y-3 flex-1 overflow-y-auto">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent px-3 py-1.5">
              Navigasi Menu
            </div>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.id === 'materi'
                    ? activeTab === 'materi' || activeTab === 'quiz' || activeTab === 'choukai'
                    : activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all min-h-[44px] active:scale-95 ${
                      isActive
                        ? 'bg-accent text-white dark:text-stone-950 font-semibold shadow-xs'
                        : 'text-appText-bright hover:bg-surface-2 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm tracking-tight">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-black/20 text-white dark:text-stone-950'
                            : 'bg-surface-2 text-accent border border-border'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white dark:text-stone-950' : 'opacity-40'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single Clean Link to Dojo · Alat & Referensi */}
          <div className="pt-2 border-t border-border space-y-2">
            <button
              type="button"
              onClick={() => {
                useAppStore.getState().setDojoTab('alat');
                transitionTabChange('materi', setActiveTab);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-left transition-all active:scale-[0.99] group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-appText-bright group-hover:text-accent transition-colors truncate">
                    Dojo · Alat & Referensi
                  </div>
                  <div className="text-[11px] text-appText-muted truncate">
                    Kana, Konjugasi, Nuansa, & CAT
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-appText-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>

            {/* Direct Utility Triggers: CAT Placement, Kotowaza, Toolbox, Community */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  openCatPlacement();
                  onClose();
                }}
                className="p-2 min-h-[44px] rounded-xl bg-surface hover:bg-surface-2 border border-border text-left text-xs font-medium text-appText-bright flex items-center gap-2 transition-all active:scale-95"
              >
                <span className="font-mono text-accent font-bold text-xs">CAT</span>
                <span className="truncate">Tes Level</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  openKotowaza();
                  onClose();
                }}
                className="p-2 min-h-[44px] rounded-xl bg-surface hover:bg-surface-2 border border-border text-left text-xs font-medium text-appText-bright flex items-center gap-2 transition-all active:scale-95"
              >
                <span className="font-jp text-nippon-shu font-bold text-xs">諺</span>
                <span className="truncate">Kotowaza</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  openToolbox();
                  onClose();
                }}
                className="p-2 min-h-[44px] rounded-xl bg-surface hover:bg-surface-2 border border-border text-left text-xs font-medium text-appText-bright flex items-center gap-2 transition-all active:scale-95"
              >
                <Wrench className="w-3.5 h-3.5 text-nippon-tokiwa" />
                <span className="truncate">Toolbox</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  openModal('community');
                  onClose();
                }}
                className="p-2 min-h-[44px] rounded-xl bg-surface hover:bg-surface-2 border border-border text-left text-xs font-medium text-appText-bright flex items-center gap-2 transition-all active:scale-95"
              >
                <HelpCircle className="w-3.5 h-3.5 text-nippon-fuji" />
                <span className="truncate">Komunitas</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Account / Offline Footer */}
        <div className="p-3.5 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-border bg-surface-2/40 space-y-2">
          {user ? (
            <button
              onClick={() => {
                setActiveTab('settings');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface border border-border text-xs text-appText-bright hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-left">
                  <div className="font-semibold truncate">{user.user_metadata?.display_name || user.email?.split('@')[0]}</div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Cloud className="w-3 h-3" />
                    <span>Tersinkron Cloud</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => {
                openAuthModal('signin');
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-accent font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Masuk / Sinkron Cloud</span>
            </button>
          )}

          <button
            onClick={() => {
              openPatchNotes();
              onClose();
            }}
            className="w-full flex items-center justify-between text-xs text-appText-muted hover:text-accent transition-colors pt-1 cursor-pointer text-left"
            title="Lihat Catatan Rilis & Riwayat Versi"
          >
            <span className="hover:underline">100% PWA Offline</span>
            <span className="font-mono text-accent font-semibold flex items-center gap-1">
              <span>{APP_VERSION}</span>
              <History className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
