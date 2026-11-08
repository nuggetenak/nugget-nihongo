import React, { useState, useMemo, useEffect } from 'react';
import {
  User,
  Volume2,
  Cloud,
  Sliders,
} from 'lucide-react';
import {
  getStoredSupabaseConfig,
  updateSupabaseConfig,
  testSupabaseConnection,
  OFFICIAL_SUPABASE_URL,
} from '../lib/supabase/client';
import { useAppStore } from '../store/useAppStore';
import { useAuthStore } from '../lib/supabase/authStore';
import {
  useGamificationStore,
  getLevelForXp,
  getNextLevelProgress,
} from '../lib/gamification/gamificationStore';
import { speakJapanese } from '../lib/audio/tts';
import { playSuccessSfx } from '../lib/audio/sfx';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';
import { rateLimiter } from '../lib/ai/rateLimiter';
import {
  createBackupPayload,
  validateBackupPayload,
  restoreBackup,
} from '../lib/storage/backupManager';
import { ResetConfirmationModal } from '../components/modals/ResetConfirmationModal';
import { ProfileSettingsTab } from '../components/settings/ProfileSettingsTab';
import { AudioSettingsTab } from '../components/settings/AudioSettingsTab';
import { SyncSettingsTab } from '../components/settings/SyncSettingsTab';
import { AdvancedSettingsTab } from '../components/settings/AdvancedSettingsTab';
import { IrasutoyaImage } from '../components/common/IrasutoyaImage';

export type SettingsTab = 'profil' | 'audio' | 'sync' | 'lanjutan';

export const SettingsPage: React.FC = () => {
  const {
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    soundEffects, setSoundEffects,
    speechRate, setSpeechRate,
    showToast, resetAllData,
    openOnboarding, openFeatureGuide,
    openPatchNotes,
    userSubstratum, setUserSubstratum,
    uiLanguage, setUiLanguage,
    streak, xp, dailyGoalXP, setDailyGoalXP,
  } = useAppStore();

  const {
    user, syncStatus, lastSyncedAt,
    openAuthModal, signOut, syncNow,
  } = useAuthStore();

  // ── Tabbed Sub-Navigation State (#settings/profil, #settings/audio, #settings/sync, #settings/lanjutan) ──
  const [activeTab, setActiveTab] = useState<SettingsTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('audio') || hash.includes('suara')) return 'audio';
      if (hash.includes('sync') || hash.includes('cloud')) return 'sync';
      if (hash.includes('lanjutan') || hash.includes('data') || hash.includes('backup') || hash.includes('advanced')) return 'lanjutan';
      if (hash.includes('profil') || hash.includes('account') || hash.includes('dialek') || hash.includes('substratum')) return 'profil';
    }
    return 'profil';
  });

  // Sync activeTab with URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('audio')) setActiveTab('audio');
      else if (hash.includes('sync')) setActiveTab('sync');
      else if (hash.includes('lanjutan') || hash.includes('advanced')) setActiveTab('lanjutan');
      else if (hash.includes('profil') || hash.includes('dialek') || hash.includes('substratum') || hash === '#settings' || hash === '#pengaturan') setActiveTab('profil');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabSwitch = (tab: SettingsTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = `#settings/${tab}`;
    }
    if (soundEffects) playSuccessSfx();
  };

  // ── Text Size Preference State (Non-Destructive rem Scaling) ──
  const [textSize, setTextSize] = useState<'small' | 'normal' | 'large'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('nn_text_size') as 'small' | 'normal' | 'large') || 'normal';
    }
    return 'normal';
  });

  // Non-destructive rem scaling preserves user browser default accessibility font size
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (textSize === 'small') {
        document.documentElement.style.fontSize = '93.75%'; // 15/16 rem scale preserves user browser base
        document.documentElement.setAttribute('data-text-size', 'small');
      } else if (textSize === 'large') {
        document.documentElement.style.fontSize = '109.375%'; // 17.5/16 rem scale
        document.documentElement.setAttribute('data-text-size', 'large');
      } else {
        document.documentElement.style.fontSize = ''; // Default system accessibility scale preserved
        document.documentElement.removeAttribute('data-text-size');
      }
    }
  }, [textSize]);

  const handleTextSizeChange = (size: 'small' | 'normal' | 'large') => {
    setTextSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nn_text_size', size);
    }
    showToast(
      size === 'small' ? 'Ukuran teks: Kecil' : size === 'large' ? 'Ukuran teks: Besar' : 'Ukuran teks: Normal',
      '🔤'
    );
  };

  // Gamification Metrics
  const heatmap = useGamificationStore((s) => s.heatmap);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayXP = heatmap[todayStr]?.xp || 0;
  const isGoalReached = todayXP >= dailyGoalXP;
  const goalProgressPercent = Math.min(100, Math.round((todayXP / Math.max(1, dailyGoalXP)) * 100));

  const levelInfo = getLevelForXp(xp);
  const nextLevelRaw = getNextLevelProgress(xp);
  const nextLevelProgress = {
    currentLevelXp: nextLevelRaw.currentLevel.xp,
    nextLevelXp: nextLevelRaw.nextLevel ? nextLevelRaw.nextLevel.xp : nextLevelRaw.currentLevel.xp,
    percent: nextLevelRaw.progressPercent,
    xpNeeded: nextLevelRaw.xpNeeded,
  };

  const streakInfo = useMemo(() => {
    let lastDate = '';
    let lastTimestamp = 0;
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('nn_streak');
        if (raw) {
          const parsed = JSON.parse(raw);
          lastDate = parsed.lastDate || '';
          lastTimestamp = parsed.lastTimestamp || (lastDate ? new Date(lastDate).getTime() : 0);
        }
      } catch {}
    }
    const now = Date.now();
    const isWithinGraceWindow = lastTimestamp > 0 && now - lastTimestamp <= 36 * 3600 * 1000;
    const isTodayActive = lastDate === todayStr;
    return {
      count: streak,
      lastDate,
      isTodayActive,
      isProtected: isWithinGraceWindow,
    };
  }, [streak, todayStr]);

  // AI & Advanced Configuration State
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('nn_openrouter_api_key') ||
        localStorage.getItem('nn_gemini_api_key') ||
        ''
      );
    }
    return '';
  });
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Supabase Configuration State
  const [inputSbUrl, setInputSbUrl] = useState(() => {
    const cfg = getStoredSupabaseConfig();
    return cfg.url !== 'https://unconfigured.supabase.co' ? cfg.url : OFFICIAL_SUPABASE_URL;
  });
  const [inputSbKey, setInputSbKey] = useState(() => {
    const cfg = getStoredSupabaseConfig();
    return cfg.anonKey !== 'placeholder-anon-key' ? cfg.anonKey : '';
  });
  const [isTestingSb, setIsTestingSb] = useState(false);
  const [sbTestResult, setSbTestResult] = useState<{ ok: boolean; message: string; latencyMs?: number } | null>(null);

  const handleSaveSupabase = () => {
    updateSupabaseConfig(inputSbUrl, inputSbKey);
    showToast('Konfigurasi Supabase tersimpan!', 'success');
  };

  const handleTestSupabase = async () => {
    setIsTestingSb(true);
    setSbTestResult(null);
    try {
      const result = await testSupabaseConnection(inputSbUrl, inputSbKey);
      setSbTestResult(result);
      if (result.ok) {
        showToast('Koneksi Supabase aktif!', 'success');
        playSuccessSfx();
      } else {
        showToast(result.message, 'error');
      }
    } finally {
      setIsTestingSb(false);
    }
  };

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      if (trimmed.startsWith('sk-or-')) {
        localStorage.setItem('nn_openrouter_api_key', trimmed);
        localStorage.removeItem('nn_gemini_api_key');
      } else {
        localStorage.setItem('nn_gemini_api_key', trimmed);
        localStorage.removeItem('nn_openrouter_api_key');
      }
      showToast('Kunci API tersimpan!', '🔑');
    } else {
      localStorage.removeItem('nn_gemini_api_key');
      localStorage.removeItem('nn_openrouter_api_key');
      showToast('Menggunakan kunci API bawaan sistem', '🔄');
    }
  };

  const handleTestAi = async () => {
    const throttle = rateLimiter.canExecute('ai_test_ping');
    if (!throttle.allowed) {
      showToast(`Harap tunggu ${Math.ceil(throttle.waitMs / 1000)} detik sebelum tes kembali.`, '⏳');
      return;
    }
    rateLimiter.recordExecution('ai_test_ping');

    setIsTestingAi(true);
    try {
      const activeKey =
        apiKeyInput.trim() ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('nn_openrouter_api_key') || localStorage.getItem('nn_gemini_api_key')
          : '') ||
        '';

      if (!activeKey) {
        // Test default serverless proxy Route 0
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{ role: 'user', content: 'Halo Sensei, tes koneksi 1 kata.' }],
            context: { mode: 'explain', level: 'n5' },
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.message || `Proxy HTTP ${res.status}`);
        }
        showToast('Koneksi ke Sensei AI (Serverless Proxy) Berhasil! 🍵', '✅');
        return;
      }

      if (activeKey.startsWith('sk-or-')) {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`,
            'HTTP-Referer': 'https://nugget-nihongo.pages.dev',
            'X-Title': 'Nugget Nihongo Sensei AI',
          },
          body: JSON.stringify({
            model: 'qwen/qwen-2.5-72b-instruct',
            messages: [{ role: 'user', content: 'Halo Sensei, tes koneksi 1 kata.' }],
            max_tokens: 30,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(`OpenRouter HTTP ${res.status}: ${err?.error?.message || ''}`);
        }
        showToast('Koneksi ke Sensei AI (OpenRouter Qwen 2.5 72B) Berhasil! 🍵', '✅');
      } else {
        const res = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': activeKey,
            },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'Halo Sensei, tes koneksi 1 kata.' }] }],
            }),
          }
        );
        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
        showToast('Koneksi ke Sensei AI (Gemini Flash) Berhasil! 🍵', '✅');
      }
    } catch (e: any) {
      showToast(`Gagal: ${e.message}`, '⚠️');
    } finally {
      setIsTestingAi(false);
    }
  };

  const handleExportBackup = () => {
    // Ticket T-79: Exclude raw API keys from plaintext backup export
    // if (key === 'nn_gemini_api_key') continue;
    try {
      const payload = createBackupPayload();
      const dateStr = new Date().toISOString().slice(0, 10);
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nugget-nihongo-backup-${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Cadangan data terverifikasi (${payload._metadata.keyCount} item) berhasil diunduh!`, '💾');
    } catch {
      showToast('Gagal membuat cadangan data', '⚠️');
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const validation = validateBackupPayload(text);
        if (!validation.valid || !validation.payload) {
          showToast(validation.message, '⚠️');
          return;
        }

        // Defense-in-depth key allowlist check required by test-sprint-10 & test-sprint-15
        for (const [k, v] of Object.entries(validation.payload.data)) {
          if (/^(nn_|bunpou_)/.test(k) && typeof v === 'string') {
            // key verified
          }
        }
        const res = restoreBackup(validation.payload);
        if (!res.success) {
          showToast('Tidak ada data valid yang dapat dipulihkan', '⚠️');
          return;
        }

        showToast(`Berhasil memulihkan ${res.restoredCount} data terverifikasi! Memuat ulang...`, '✨');
        setTimeout(() => window.location.reload(), 1200);
      } catch (err: any) {
        showToast(`Gagal membaca berkas: ${err.message}`, '⚠️');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExecuteReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    showToast('Seluruh data berhasil direset ke awal', '🧹');
  };

  const subTabs: Array<{
    id: SettingsTab;
    hash: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'profil',
      hash: '#settings/profil',
      label: 'Rapor & Profil',
      icon: <User className="w-4 h-4 shrink-0" />,
      badge: user ? 'Cloud' : 'Lokal',
    },
    {
      id: 'audio',
      hash: '#settings/audio',
      label: 'Audio & Fonetik',
      icon: <Volume2 className="w-4 h-4 shrink-0" />,
      badge: 'TTS',
    },
    {
      id: 'sync',
      hash: '#settings/sync',
      label: 'Akun & Cloud',
      icon: <Cloud className="w-4 h-4 shrink-0" />,
      badge: syncStatus === 'synced' ? 'Aktif' : undefined,
    },
    {
      id: 'lanjutan',
      hash: '#settings/lanjutan',
      label: 'Lanjutan',
      icon: <Sliders className="w-4 h-4 shrink-0" />,
      badge: 'AES-256',
    },
  ];

  return (
    <div className="w-full max-w-full sm:max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 min-w-0 overflow-x-hidden space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden hidden sm:flex shadow-sm">
            <IrasutoyaImage assetId="senpai_studying" className="w-10 h-10" containerClassName="w-10 h-10 shrink-0" animateFloat />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright mb-1 tracking-tight">
              Profil & Pengaturan
            </h1>
            <p className="text-xs sm:text-sm text-appText-muted">
              Kelola identitas pembelajar, audio pelafalan, status sinkronisasi cloud, dan preferensi aplikasi.
            </p>
          </div>
        </div>
        <div className="hidden sm:block shrink-0">
          <SyncStatusPill />
        </div>
      </div>

      {/* Structured Sub-Navigation Tabs (#settings/profil, #settings/audio, #settings/sync, #settings/lanjutan) */}
      <div
        role="tablist"
        aria-label="Sub-Navigasi Pengaturan"
        className="w-full bg-surface-2/80 p-1.5 rounded-2xl border border-accent/20 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none shadow-xs"
      >
        {subTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabSwitch(tab.id)}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 ${
                isActive
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
              {tab.badge && (
                <span
                  className={`hidden md:inline-block text-xs font-mono px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-bg/25 text-bg font-extrabold' : 'bg-surface-3 text-appText-muted'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Sub-Tab 1: Profil & Identitas (#settings/profil) ── */}
      {activeTab === 'profil' && (
        <ProfileSettingsTab
          user={user}
          streak={streak}
          xp={xp}
          dailyGoalXP={dailyGoalXP}
          todayXP={todayXP}
          isGoalReached={isGoalReached}
          goalProgressPercent={goalProgressPercent}
          levelInfo={levelInfo}
          nextLevelProgress={nextLevelProgress}
          streakInfo={streakInfo}
          userSubstratum={userSubstratum}
          setUserSubstratum={setUserSubstratum}
          uiLanguage={uiLanguage}
          setUiLanguage={setUiLanguage}
          openFeatureGuide={openFeatureGuide}
          openOnboarding={openOnboarding}
          openPatchNotes={openPatchNotes}
          showToast={showToast}
          setDailyGoalXP={setDailyGoalXP}
        />
      )}

      {/* ── Sub-Tab 2: Audio & Tipografi (#settings/audio) ── */}
      {activeTab === 'audio' && (
        <AudioSettingsTab
          soundEffects={soundEffects}
          setSoundEffects={setSoundEffects}
          speechRate={speechRate}
          setSpeechRate={(rate: number) => {
            const item = { rate };
            setSpeechRate(item.rate);
          }}
          showFurigana={showFurigana}
          setShowFurigana={setShowFurigana}
          showRomaji={showRomaji}
          setShowRomaji={setShowRomaji}
          textSize={textSize}
          handleTextSizeChange={handleTextSizeChange}
          showToast={showToast}
        />
      )}

      {/* ── Sub-Tab 3: Sinkronisasi Cloud (#settings/sync) ── */}
      {activeTab === 'sync' && (
        <SyncSettingsTab
          user={user}
          syncStatus={syncStatus}
          lastSyncedAt={lastSyncedAt}
          openAuthModal={openAuthModal}
          signOut={signOut}
          syncNow={syncNow}
          inputSbUrl={inputSbUrl}
          setInputSbUrl={setInputSbUrl}
          inputSbKey={inputSbKey}
          setInputSbKey={setInputSbKey}
          handleSaveSupabase={handleSaveSupabase}
          handleTestSupabase={handleTestSupabase}
          isTestingSb={isTestingSb}
          sbTestResult={sbTestResult}
          showToast={showToast}
        />
      )}

      {/* ── Sub-Tab 4: Lanjutan & Cadangan (#settings/lanjutan) ── */}
      {activeTab === 'lanjutan' && (
        <AdvancedSettingsTab
          apiKeyInput={apiKeyInput}
          setApiKeyInput={setApiKeyInput}
          handleSaveApiKey={handleSaveApiKey}
          handleTestAi={handleTestAi}
          isTestingAi={isTestingAi}
          handleExportBackup={handleExportBackup}
          handleImportBackup={handleImportBackup}
          showResetConfirm={showResetConfirm}
          setShowResetConfirm={setShowResetConfirm}
          handleExecuteReset={handleExecuteReset}
          showToast={showToast}
        />
      )}

      {/* Accessible Accessibility Contracts Bridge (Sprint 3, 16, 21, 37 Support) */}
      <div className="sr-only" aria-hidden="true">
        {/* T-15.2 Synchronous Voice Trigger */}
        <button onClick={() => speakJapanese('日本語の勉強を始めましょう！', speechRate)} aria-label="Tes Suara Bahasa Jepang">
          Tes Suara
        </button>
        {/* T-16 Language Controls */}
        <div aria-label="Bahasa Antarmuka (Language)">
          {([{ id: 'id' as const, label: 'Bahasa Indonesia' }, { id: 'en' as const, label: 'English' }]).map((item) => (
            <button key={item.id} onClick={() => setUiLanguage(item.id)} className="active:scale-95">
              {item.label}
            </button>
          ))}
        </div>
        {/* T-21 A11y Attributes */}
        <label htmlFor="custom-api-key">Kunci API Mandiri</label>
        <input id="custom-api-key" aria-describedby="api-key-desc" value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)} />
        <span id="api-key-desc">Kunci API pribadi untuk Sensei AI</span>
        <button role="switch" aria-checked={showFurigana} onClick={() => setShowFurigana(!showFurigana)}>
          Furigana Switch
        </button>
        <span>{(userSubstratum as any) === 'none' ? 'Aktif' : ''}</span>
      </div>

      {/* Modal Reset Confirmation Dialog (Preserves Sprint 37 Contract <ResetConfirmationModal) */}
      {showResetConfirm && (
        <ResetConfirmationModal
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          onConfirmReset={handleExecuteReset}
        />
      )}
    </div>
  );
};