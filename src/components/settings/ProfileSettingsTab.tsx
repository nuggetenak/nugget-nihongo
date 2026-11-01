import React from 'react';
import {
  User,
  Sparkles,
  Award,
  Zap,
  Flame,
  HelpCircle,
  History,
  Languages,
  Compass,
} from 'lucide-react';
import { SyncStatusPill } from '../ui/SyncStatusPill';
import { L1Substratum } from '../../lib/data/diagnosticManager';
import { APP_VERSION } from '../../config/version';

interface ProfileSettingsTabProps {
  user: any;
  streak: number;
  xp: number;
  dailyGoalXP: number;
  todayXP: number;
  isGoalReached: boolean;
  goalProgressPercent: number;
  levelInfo: { level: number; title: string };
  nextLevelProgress: { currentLevelXp: number; nextLevelXp: number; percent: number };
  streakInfo: { count: number; lastDate: string; isTodayActive: boolean; isProtected: boolean };
  userSubstratum: L1Substratum;
  setUserSubstratum: (sub: L1Substratum) => void;
  uiLanguage: 'id' | 'en';
  setUiLanguage: (lang: 'id' | 'en') => void;
  openFeatureGuide: () => void;
  openOnboarding: () => void;
  openPatchNotes: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  streak,
  xp,
  dailyGoalXP,
  todayXP,
  isGoalReached,
  goalProgressPercent,
  levelInfo,
  nextLevelProgress,
  streakInfo,
  userSubstratum,
  setUserSubstratum,
  uiLanguage,
  setUiLanguage,
  openFeatureGuide,
  openOnboarding,
  openPatchNotes,
  showToast,
}) => {
  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Top Profile & Progress Mastery Card */}
      <div className="bg-surface border border-accent/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Identity & SyncStatusPill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Avatar Pengguna"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-accent/30 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-inner">
                <User className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-appText-bright truncate">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pembelajar Nugget'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/25">
                  Lv. {levelInfo.level}
                </span>
              </div>
              <p className="text-xs text-appText-muted truncate mt-0.5">
                {user?.email || 'Akun Tamu Lokal (Tersimpan di Perangkat)'}
              </p>
            </div>
          </div>
          <div className="self-start sm:self-auto shrink-0">
            <SyncStatusPill />
          </div>
        </div>

        {/* Progress Metrics & Streak Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Level & Title */}
          <div className="p-3.5 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
                <Award className="w-4 h-4 text-accent" />
                Gelar Kemahiran
              </span>
              <span className="text-xs font-bold text-accent font-mono">Lv. {levelInfo.level}</span>
            </div>
            <div>
              <div className="text-base font-extrabold text-appText-bright tracking-tight">
                {levelInfo.title}
              </div>
              <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${nextLevelProgress.percent}%` }}
                />
              </div>
              <span className="text-[10px] text-appText-muted mt-1 block font-mono">
                {nextLevelProgress.currentLevelXp} / {nextLevelProgress.nextLevelXp} XP menuju level berikutnya
              </span>
            </div>
          </div>

          {/* Daily XP Target */}
          <div className="p-3.5 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-accent" />
                Target XP Harian
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                isGoalReached ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-surface-3 text-appText-muted'
              }`}>
                {isGoalReached ? 'Tercapai 🎯' : `${goalProgressPercent}%`}
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-appText-bright tracking-tight font-mono">
                {todayXP} <span className="text-xs text-appText-muted font-sans font-normal">/ {dailyGoalXP} XP</span>
              </div>
              <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isGoalReached ? 'bg-emerald-500' : 'bg-accent'
                  }`}
                  style={{ width: `${goalProgressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-appText-muted mt-1 block">
                Total Akumulasi: <strong className="text-appText-bright font-mono">{xp} XP</strong>
              </span>
            </div>
          </div>

          {/* Streak Badge & Status */}
          <div className="p-3.5 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-appText-muted flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-accent-hot" />
                Streak Belajar
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                streakInfo.isTodayActive
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : streakInfo.isProtected
                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                  : 'bg-surface-3 text-appText-muted'
              }`}>
                {streakInfo.isTodayActive ? 'Aktif Hari Ini' : streakInfo.isProtected ? 'Grace Window (36h)' : 'Belum Belajar'}
              </span>
            </div>
            <div>
              <div className="text-base font-extrabold text-appText-bright tracking-tight font-mono flex items-center gap-1.5">
                {streak} <span className="text-xs font-sans font-normal text-appText-muted">Hari Beruntun</span>
              </div>
              <p className="text-[10px] text-appText-muted mt-1 leading-tight">
                {streakInfo.isTodayActive
                  ? 'Kamu sudah mempertahankan api semangat belajarmu hari ini!'
                  : 'Selesaikan 1 sesi latihan hari ini untuk mempertahankan streak!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* L1 Substratum & Learning Preferences Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Compass className="w-5 h-5 text-accent" />
            L1 Substratum & Penyesuaian Dialek Daerah
          </h2>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Nugget Nihongo menyesuaikan penjelasan fonetik & kontras tata bahasa berdasarkan bahasa daerah atau gaya tuturan pertamamu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              id: 'none' as L1Substratum,
              title: 'Standar Indonesia',
              desc: 'Penjelasan umum Bahasa Indonesia formal & komunikatif.',
            },
            {
              id: 'javanese' as L1Substratum,
              title: 'Bahasa Jawa',
              desc: 'Sensitif terhadap tingkatan unggah-ungguh, fonemik th/dh, dan analogi krama inggil vs keigo.',
            },
            {
              id: 'sundanese' as L1Substratum,
              title: 'Bahasa Sunda',
              desc: 'Analogi undak-usuk basa, keselarasan partikel penegas (mah/teh), dan pemetaan fonemik e/eu.',
            },
            {
              id: 'batak' as L1Substratum,
              title: 'Bahasa Batak',
              desc: 'Kejelasan artikulasi konsonan tegas, kontras ritme suku kata, dan penekanan intonasi tegas.',
            },
          ].map((item) => {
            const isSelected = userSubstratum === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setUserSubstratum(item.id);
                  showToast(`Substratum dialihkan ke: ${item.title}`, '🗾');
                }}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between space-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? 'bg-accent/10 border-accent text-appText-bright shadow-xs'
                    : 'bg-surface-2/60 border-accent/15 text-appText-muted hover:border-accent/30 hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-sm font-bold ${isSelected ? 'text-accent' : 'text-appText-bright'}`}>
                    {item.title}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-accent bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      ✓ Aktif
                    </span>
                  )}
                </div>
                <p className="text-xs text-appText-muted leading-relaxed">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Language & App Tours Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Languages className="w-5 h-5 text-accent" />
            Bahasa Antarmuka & Panduan Aplikasi
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Atur bahasa navigasi dan jalankan kembali panduan interaktif jika kamu ingin menjelajahi alur belajar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 space-y-2">
            <label className="text-xs font-semibold text-appText-muted block">
              Bahasa Antarmuka
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setUiLanguage('id');
                  showToast('Bahasa diubah ke Bahasa Indonesia', '🇮🇩');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                  uiLanguage === 'id'
                    ? 'bg-accent text-bg border-accent shadow-xs'
                    : 'bg-surface-3 text-appText-muted border-accent/15 hover:text-appText-bright'
                }`}
              >
                Bahasa Indonesia
              </button>
              <button
                onClick={() => {
                  setUiLanguage('en');
                  showToast('Language changed to English', '🇬🇧');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                  uiLanguage === 'en'
                    ? 'bg-accent text-bg border-accent shadow-xs'
                    : 'bg-surface-3 text-appText-muted border-accent/15 hover:text-appText-bright'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-center space-y-2">
            <span className="text-xs font-semibold text-appText-muted block">
              Panduan Interaktif & Bantuan
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openFeatureGuide}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-2 text-xs font-semibold text-appText-bright border border-accent/15 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-accent" />
                Panduan Fitur
              </button>
              <button
                onClick={openOnboarding}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-2 text-xs font-semibold text-appText-bright border border-accent/15 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Tur Awal
              </button>
              <button
                onClick={openPatchNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-2 text-xs font-semibold text-appText-bright border border-accent/15 transition-all group"
              >
                <History className="w-3.5 h-3.5 text-accent" />
                <span>Changelog</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
                  {APP_VERSION}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
