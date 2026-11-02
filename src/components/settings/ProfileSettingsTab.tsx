import React from 'react';
import {
  Sparkles,
  HelpCircle,
  History,
  Languages,
  Compass,
} from 'lucide-react';
import { L1Substratum } from '../../lib/data/diagnosticManager';
import { APP_VERSION } from '../../config/version';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useCurriculumStore } from '../../lib/curriculum/curriculumStore';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useGardenStore } from '../../lib/garden/gardenStore';
import { LearnerIdentityCard } from './LearnerIdentityCard';
import { DailyGoalSelector } from './DailyGoalSelector';
import { LearnerMasteryReport } from './LearnerMasteryReport';
import { AchievementsBadgeShowcase } from './AchievementsBadgeShowcase';

interface ProfileSettingsTabProps {
  user: any;
  streak: number;
  xp: number;
  dailyGoalXP: number;
  todayXP: number;
  isGoalReached: boolean;
  goalProgressPercent: number;
  levelInfo: { level: number; title: string; titleJp?: string };
  nextLevelProgress: { currentLevelXp: number; nextLevelXp: number; percent: number; xpNeeded?: number };
  streakInfo: { count: number; lastDate: string; isTodayActive: boolean; isProtected: boolean };
  userSubstratum: L1Substratum;
  setUserSubstratum: (sub: L1Substratum) => void;
  uiLanguage: 'id' | 'en';
  setUiLanguage: (lang: 'id' | 'en') => void;
  openFeatureGuide: () => void;
  openOnboarding: () => void;
  openPatchNotes: () => void;
  showToast: (msg: string, icon?: string) => void;
  setDailyGoalXP?: (goal: number) => void;
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
  setDailyGoalXP,
}) => {
  // Store hooks for live learner analytics
  const cards = useAppStore((s) => s.cards);
  const placementHistory = useAppStore((s) => s.placementHistory);
  const storeSetDailyGoal = useAppStore((s) => s.setDailyGoalXP);
  const trackProgress = useCurriculumStore((s) => s.trackProgress);
  const badges = useGamificationStore((s) => s.badges);
  const plants = useGardenStore((s) => s.plants);

  // Auth Store identity state
  const { customDisplayName, customAvatar, setCustomDisplayName, setCustomAvatar } = useAuthStore();

  const handleGoalChange = (newGoal: number) => {
    if (setDailyGoalXP) {
      setDailyGoalXP(newGoal);
    } else {
      storeSetDailyGoal(newGoal);
    }
  };

  const bloomedKanjiCount = plants.filter((p) => p.stage >= 3).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Top Learner Identity & Japanese Avatar Picker */}
      <LearnerIdentityCard
        user={user}
        customDisplayName={customDisplayName}
        customAvatar={customAvatar}
        onSaveDisplayName={setCustomDisplayName}
        onSaveAvatar={setCustomAvatar}
        levelInfo={levelInfo}
        nextLevelProgress={nextLevelProgress}
        xp={xp}
        showToast={showToast}
      />

      {/* 2. Customizable Daily XP Target (Santai 30, Standar 50, Serius 100, Intensif 200) */}
      <DailyGoalSelector
        dailyGoalXP={dailyGoalXP}
        todayXP={todayXP}
        isGoalReached={isGoalReached}
        goalProgressPercent={goalProgressPercent}
        onSelectGoal={handleGoalChange}
        showToast={showToast}
      />

      {/* 3. Visual Learner Mastery Report (JLPT N5-N1, SSW Vocab, Kanji, FSRS Retention Health) */}
      <LearnerMasteryReport
        cards={cards}
        trackProgress={trackProgress}
        streakInfo={streakInfo}
        placementHistory={placementHistory}
        bloomedKanjiCount={bloomedKanjiCount}
      />

      {/* 4. Milestone Achievements & Badges Showcase */}
      <AchievementsBadgeShowcase badges={badges} />

      {/* 5. L1 Substratum Dialect Section (Preserved for verify-frontend-responsive.js) */}
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
                    <span className="text-xs font-bold text-accent bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
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

      {/* 6. Language & App Tours Card */}
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
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
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
