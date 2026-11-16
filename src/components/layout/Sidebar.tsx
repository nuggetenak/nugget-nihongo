// ══════════════════════════════════════════════════════════════════
//  Sidebar.tsx — Desktop 5-Tab Navigation Rail
//  Tab 1: Belajar ('home')
//  Tab 2: Pusat Retensi ('kebun')
//  Tab 3: Dojo & Pustaka ('materi')
//  Tab 4: Sensei AI ('sensei')
//  Tab 5: Profil & Pengaturan ('settings')
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Compass, BookOpen, Brain, Sparkles, Settings, HelpCircle, History, Quote, Wrench, Layers, GraduationCap, Users, Sun, Moon } from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { transitionTabChange } from '../../lib/ui/navigation';
import { APP_VERSION } from '../../config/version';

interface NavItem {
  id: AppState['activeTab'];
  label: string;
  jp: string;
  icon: React.ReactNode;
  badge?: string;
  isSpecial?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, openPatchNotes, openKotowaza, openToolbox, theme, toggleTheme, showFurigana, setShowFurigana } = useAppStore();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Belajar', jp: '学習', icon: <Compass className="w-5 h-5" /> },
    { id: 'kebun', label: 'Pusat Retensi (Brankas FSRS)', jp: '復習', icon: <Brain className="w-5 h-5" /> },
    { id: 'materi', label: 'Dojo (Sasana Latihan & Ujian)', jp: '道場', icon: <BookOpen className="w-5 h-5" />, badge: '4 Pilar' },
    { 
      id: 'sensei', 
      label: 'Sensei AI', 
      jp: '先生', 
      icon: <Sparkles className="w-5 h-5 text-accent-hot" />,
      isSpecial: true
    },
    { id: 'methodology', label: 'Metodologi & Riset', jp: '方法', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'settings', label: 'Profil & Pengaturan', jp: '設定', icon: <Settings className="w-5 h-5" /> },
    { id: 'about', label: 'Tentang Aplikasi', jp: '情報', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleNavClick = (id: AppState['activeTab']) => {
    if (useAppStore.getState().activeLessonContext) {
      useAppStore.getState().closeLessonStudy();
    }
    if (id === 'quiz') {
      useAppStore.getState().setDojoTab('latihan');
      transitionTabChange('materi', setActiveTab);
    } else if (id === 'materi') {
      transitionTabChange('materi', setActiveTab);
    } else {
      transitionTabChange(id, setActiveTab);
    }
  };

  const isItemActive = (id: AppState['activeTab']) => {
    if (activeTab === 'study') {
      const currentContext = useAppStore.getState().activeLessonContext;
      if (currentContext?.trackType === 'book') {
        return id === 'materi';
      }
      return id === 'home';
    }
    if (id === 'materi') return activeTab === 'materi' || activeTab === 'quiz' || activeTab === 'choukai';
    return activeTab === id;
  };

  return (
    <aside 
      role="complementary" 
      aria-label="Navigasi Utama Desktop" 
      className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0 bg-surface border-r border-accent/15 z-40 select-none"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-accent/15">
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Beranda Nugget Nihongo (Scroll ke Atas)"
          className="w-full text-left flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-1 transition-all"
        >
          <img
            src="/icons/icon-192.png"
            alt="Nugget Nihongo"
            className="w-10 h-10 rounded-xl object-cover shadow-glow ring-1 ring-amber-500/40 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.45)] transition-all duration-300 ease-spring"
          />
          <div>
            <div className="font-bold text-base text-appText-bright leading-tight tracking-tight group-hover:text-accent transition-colors">
              Nugget 日本語
            </div>
            <div className="text-xs text-accent font-semibold tracking-wider uppercase">
              Teman Belajar
            </div>
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <nav 
        role="navigation" 
        aria-label="Menu Navigasi Utama Desktop" 
        className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto"
      >
        {navItems.map((item) => {
          const isActive = isItemActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'quiz' || item.id === 'materi') {
                  handleNavClick(item.id);
                } else {
                  transitionTabChange(item.id, setActiveTab);
                }
              }}
              aria-label={`${item.label} (${item.jp})`}
              aria-current={isActive ? 'page' : undefined}
              className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-accent bg-amber-500/15 text-accent-hot font-bold border border-amber-500/35 shadow-sm ring-1 ring-amber-500/20'
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
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                ) : (
                  <span lang="ja" className="text-xs font-jp opacity-50">{item.jp}</span>
                )}
              </div>
            </button>
          );
        })}

        {/* Quick Study Toolbox Button */}
        <div className="pt-2 space-y-1.5">
          <button
            onClick={openToolbox}
            aria-label="Buka Kotak Peralatan Belajar"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-appText-bright transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Buka Kotak Peralatan Belajar (Bagan Kana, Konjugasi, Nuansa, Tes CAT)"
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform" />
              <span>Kotak Peralatan</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-accent-hot border border-amber-500/25">
              7 Alat
            </span>
          </button>

          {/* Community & Lounge Button */}
          <button
            onClick={() => useModalStore.getState().openModal('community')}
            aria-label="Buka Study Lounge & Komunitas"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-appText-bright transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title="Buka Study Lounge & Komunitas Resmi Nugget Nihongo"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              <span>Komunitas & Lounge</span>
            </div>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Baru
            </span>
          </button>
        </div>
      </nav>

      {/* Desktop Quick Utility Bar (Theme & Furigana Toggles) */}
      <div className="px-3 py-2 border-t border-accent/10 bg-surface-2/20 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ganti ke Tema Terang' : 'Ganti ke Tema Gelap'}
          title={theme === 'dark' ? 'Tema: Gelap (Klik untuk Terang)' : 'Tema: Terang (Klik untuk Gelap)'}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-surface hover:bg-surface-3 border border-accent/15 text-appText-muted hover:text-accent text-xs font-semibold transition-all active:scale-95"
        >
          {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
          <span>{theme === 'dark' ? 'Gelap' : 'Terang'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowFurigana(!showFurigana)}
          aria-label={showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
          title={showFurigana ? 'Furigana Aktif (Klik untuk Nonaktifkan)' : 'Furigana Nonaktif (Klik untuk Aktifkan)'}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all active:scale-95 ${
            showFurigana
              ? 'bg-amber-500/15 border-amber-500/30 text-accent font-bold'
              : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted hover:text-accent'
          }`}
        >
          <span lang="ja" className="font-jp font-bold text-xs">文</span>
          <span>Furigana: {showFurigana ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Bottom User / Info Card */}
      <div className="p-4 border-t border-accent/15 bg-surface-2/40 space-y-2">
        <button
          onClick={openKotowaza}
          className="w-full flex items-center justify-between text-xs text-appText-muted hover:text-accent transition-colors group cursor-pointer text-left"
          title="Buka Galeri 52 Peribahasa Jepang Tradisional"
        >
          <span className="group-hover:underline flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Peribahasa (ことわざ)</span>
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-accent border border-amber-500/30">
            52
          </span>
        </button>

        <button
          onClick={openPatchNotes}
          className="w-full flex items-center justify-between text-xs text-appText-muted hover:text-accent transition-colors group cursor-pointer text-left pt-1 border-t border-accent/10"
          title="Lihat Catatan Rilis & Riwayat Versi Lengkap"
        >
          <span className="group-hover:underline font-mono">{APP_VERSION} · Catatan Rilis</span>
          <span className="text-accent font-semibold flex items-center gap-1 text-xs">
            <span>Changelog</span>
            <History className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
    </aside>
  );
};
