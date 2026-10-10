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
  Layers,
  Sprout,
  Sparkles,
  Settings,
  HelpCircle,
  Compass,
  Volume2,
  Table,
  RotateCcw,
  Scale,
  ShieldCheck,
  ChevronRight,
  User as UserIcon,
  Cloud,
  CloudOff,
  History,
} from 'lucide-react';
import { useAppStore, AppState } from '../../store/useAppStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { APP_VERSION, APP_RELEASE_NAME } from '../../config/version';

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
  onOpenKana,
  onOpenConjugation,
  onOpenNuance,
}) => {
  const { activeTab, setActiveTab, openFeatureGuide, openOnboarding, openPatchNotes } = useAppStore();
  const { user, openAuthModal } = useAuthStore();

  if (!isOpen) return null;

  const navItems: Array<{
    id: AppState['activeTab'];
    label: string;
    jp: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    { id: 'home', label: 'Beranda', jp: 'ホーム', icon: <Home className="w-5 h-5 text-amber-400" /> },
    { id: 'materi', label: 'Materi Hub', jp: '学習', icon: <BookOpen className="w-5 h-5 text-blue-400" />, badge: '4.800+' },
    { id: 'quiz', label: 'Arena Kuis', jp: '練習', icon: <Layers className="w-5 h-5 text-emerald-400" />, badge: '8 Mode' },
    { id: 'kebun', label: 'Kebun Kata', jp: '庭園', icon: <Sprout className="w-5 h-5 text-green-400" /> },
    { id: 'sensei', label: 'Sensei AI', jp: '先生', icon: <Sparkles className="w-5 h-5 text-purple-400" />, badge: 'Soon' },
    { id: 'about', label: 'Tentang Aplikasi', jp: '情報', icon: <HelpCircle className="w-5 h-5 text-cyan-400" />, badge: 'FAQ' },
    { id: 'settings', label: 'Pengaturan', jp: '設定', icon: <Settings className="w-5 h-5 text-orange-400" /> },
  ];

  const handleNavigate = (tab: AppState['activeTab']) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-surface border-r border-accent/25 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
        {/* Top Brand Header */}
        <div className="p-5 border-b border-accent/15 bg-surface-2/60">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/logo.png"
                alt="Nugget Nihongo"
                className="w-9 h-9 rounded-xl object-cover shadow-glow ring-1 ring-amber-500/40"
              />
              <div>
                <div className="font-extrabold text-sm text-appText-bright leading-tight">
                  Nugget Nihongo
                </div>
                <div className="text-[10px] text-accent font-mono font-bold">
                  {APP_VERSION}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-appText-muted leading-relaxed">
            Teman belajar bahasa Jepang hangat dengan spaced repetition FSRS.
          </p>
        </div>

        {/* Navigation List */}
        <div className="p-3 space-y-1 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-accent/80 px-3 py-1.5">
            Navigasi Menu
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35 font-bold shadow-sm'
                    : 'text-appText-bright hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-surface-3 text-accent border border-accent/20">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </div>
              </button>
            );
          })}

          {/* Quick Learning Tools */}
          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-accent/80 px-3 py-1.5">
              Alat Pembelajaran
            </div>
            <div className="space-y-1">
              {onOpenKana && (
                <button
                  onClick={() => {
                    onOpenKana();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-all"
                >
                  <Table className="w-4 h-4 text-accent" />
                  <span>Bagan Kana (Hiragana & Katakana)</span>
                </button>
              )}
              {onOpenConjugation && (
                <button
                  onClick={() => {
                    onOpenConjugation();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span>Simulator Konjugasi Verba</span>
                </button>
              )}
              {onOpenNuance && (
                <button
                  onClick={() => {
                    onOpenNuance();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-all"
                >
                  <Scale className="w-4 h-4 text-accent" />
                  <span>Komparator Nuansa Tata Bahasa</span>
                </button>
              )}
              <button
                onClick={() => {
                  openFeatureGuide();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-all"
              >
                <Compass className="w-4 h-4 text-accent" />
                <span>Direktori Panduan Fitur</span>
              </button>
              <button
                onClick={() => {
                  openPatchNotes();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-appText-muted hover:text-accent hover:bg-surface-2 transition-all"
              >
                <History className="w-4 h-4 text-accent-hot" />
                <span>Catatan Rilis (Patch Notes)</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Account / Offline Footer */}
        <div className="p-4 border-t border-accent/15 bg-surface-2/60 space-y-2">
          {user ? (
            <button
              onClick={() => {
                setActiveTab('settings');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-surface border border-accent/20 text-xs text-appText-bright hover:border-accent transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="truncate text-left">
                  <div className="font-bold truncate">{user.user_metadata?.display_name || user.email?.split('@')[0]}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Cloud className="w-2.5 h-2.5" />
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
              className="w-full py-2.5 px-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-accent font-bold text-xs flex items-center justify-center gap-2 transition-all"
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
            className="w-full flex items-center justify-between text-[11px] text-appText-muted hover:text-accent transition-colors pt-1 cursor-pointer text-left"
            title="Lihat Catatan Rilis & Riwayat Versi"
          >
            <span className="hover:underline">100% PWA Offline</span>
            <span className="font-mono text-accent font-bold flex items-center gap-1">
              <span>{APP_VERSION}</span>
              <History className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
