// ══════════════════════════════════════════════════════════════════
//  HVPTModal.tsx — High Variability Phonetic Training (HVPT) Studio
//  Features 150 Phonological Contrast Items across 4 Native Speakers
//  Covers Sokuon, Chouon, R vs L, Pitch Accent, Geminate Nasal & Gemba
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X,
  Headphones,
  Sparkles,
  RotateCcw,
  Trophy,
  Filter,
  Activity,
  CheckCircle2,
  ChevronRight,
  Timer,
  BarChart3,
} from 'lucide-react';
import {
  HVPTPairItem,
  HVPTQuizResult,
  HVPTSessionSummary,
  PhonologicalContrastDomain,
} from '../../types/hvpt.ts';
import {
  loadAllHVPTPairs,
  getHVPTPairsByDomain,
  createHVPTSession,
  summarizeHVPTSession,
  HVPT_SPEAKERS,
} from '../../lib/audio/hvptManager.ts';
import { HVPTPlayer } from './HVPTPlayer.tsx';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.ts';
import { useAppStore } from '../../store/useAppStore.ts';

interface HVPTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DOMAIN_TABS: Array<{ id: PhonologicalContrastDomain | 'all'; label: string; icon: string }> = [
  { id: 'all', label: 'Semua Domain', icon: '✨' },
  { id: 'sokuon_stop', label: 'Sokuon (Konsonan Kembar)', icon: '⚡' },
  { id: 'chōon_vowel', label: 'Chōon (Vokal Panjang)', icon: '⏱️' },
  { id: 'liquid_r_l', label: 'R vs L (Flap [ɾ])', icon: '👅' },
  { id: 'pitch_accent', label: 'Pitch Accent Homofon', icon: '🎵' },
  { id: 'geminate_nasal', label: 'Nasal & Yōon', icon: '👃' },
  { id: 'devoicing', label: 'K3 Gemba & Desonorisasi', icon: '⚠️' },
];

export const HVPTModal: React.FC<HVPTModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);
  const { showToast } = useAppStore();

  const [selectedDomain, setSelectedDomain] = useState<PhonologicalContrastDomain | 'all'>('all');
  const [sessionPairs, setSessionPairs] = useState<HVPTPairItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<HVPTQuizResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<HVPTSessionSummary | null>(null);

  // Initialize session whenever modal opens or domain changes
  useEffect(() => {
    if (!isOpen) return;
    startNewSession(selectedDomain);
  }, [isOpen, selectedDomain]);

  const startNewSession = async (domain: PhonologicalContrastDomain | 'all') => {
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setResults([]);
    setSummary(null);

    const targetDomain = domain === 'all' ? undefined : domain;
    const session = await createHVPTSession(targetDomain, 10);
    setSessionPairs(session.pairs);
    setIsLoading(false);
  };

  const handleTrialComplete = (result: HVPTQuizResult) => {
    const updated = [...results, result];
    setResults(updated);

    if (result.is_correct) {
      showToast('Diskriminasi Akustik Tepat! 🎉', '✨');
    } else {
      showToast('Perhatikan register frekuensi & oklusi! 💡', '❌');
    }

    // Auto advance after short delay or wait for next button
    setTimeout(() => {
      if (currentIndex + 1 < sessionPairs.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        const sessSummary = summarizeHVPTSession(updated);
        setSummary(sessSummary);
        setIsFinished(true);
      }
    }, 1800);
  };

  if (!isOpen) return null;

  const currentPair = sessionPairs[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-bg/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Studio Latihan Akustik HVPT Multi-Speaker"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-surface border-t-2 sm:border border-accent/30 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden flex justify-center pt-2 pb-1 bg-surface-2/40">
          <div className="w-10 h-1 rounded-full bg-accent/30" />
        </div>

        {/* Hero Artwork Header */}
        <div className="relative overflow-hidden border-b border-accent/20 bg-surface-2 shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-transparent" />

          <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-emerald-400" />
                  <span>Pelatih Akustik Multi-Speaker</span>
                </span>
                <span className="text-xs text-appText-muted font-jp hidden sm:inline" lang="ja">
                  高変動性音響弁別
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright tracking-tight">
                Studio HVPT (<span lang="ja">高変動性知覚訓練</span>)
              </h2>
              <p className="text-xs text-appText-muted leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                Latih telinga membedakan bunyi kritis bahasa Jepang (konsonan kembar sokuon, vokal panjang, fonem R/L) lintas 4 penutur asli untuk mengatasi transfer negatif L1 Indonesia.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-2xl bg-surface/80 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-all shrink-0 active:scale-95 flex items-center justify-center cursor-pointer"
              title="Tutup dialog"
              aria-label="Tutup dialog HVPT"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Domain Filter Pills Scroll Area */}
        <div className="border-b border-accent/15 px-4 sm:px-6 py-2.5 bg-surface-2/60 shrink-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {DOMAIN_TABS.map((tab) => {
              const isSelected = selectedDomain === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDomain(tab.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-bg shadow-sm font-extrabold'
                      : 'bg-surface hover:bg-surface-3 text-appText-muted border border-accent/15 hover:text-appText-bright'
                  }`}
                  aria-label={`Filter domain ${tab.label}`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-appText-muted">Menyiapkan butir akustik HVPT...</p>
            </div>
          ) : isFinished && summary ? (
            /* Summary Report Screen */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2 py-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-accent flex items-center justify-center mx-auto border border-amber-500/40">
                  <Trophy className="w-8 h-8 text-accent-hot" />
                </div>
                <h3 className="text-xl font-extrabold text-appText-bright">
                  Sesi HVPT Selesai!
                </h3>
                <p className="text-xs text-appText-muted max-w-md mx-auto">
                  Ketajaman persepsi fonemik kamu berhasil diuji melintasi 4 register penutur asli Jepang.
                </p>
              </div>

              {/* Big KPI Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 text-center space-y-1">
                  <div className="text-xs text-appText-muted font-bold">Akurasi Global</div>
                  <div className="text-2xl sm:text-3xl font-black text-accent-hot">
                    {summary.accuracy_percent}%
                  </div>
                  <div className="text-[10px] text-appText-muted">
                    {summary.correct_count} dari {summary.total_trials} Soal
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 text-center space-y-1">
                  <div className="text-xs text-appText-muted font-bold">Waktu Respons Rata-rata</div>
                  <div className="text-2xl sm:text-3xl font-black text-appText-bright">
                    {summary.average_reaction_time_ms}ms
                  </div>
                  <div className="text-[10px] text-appText-muted">Diskriminasi Cepat</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-surface-2 border border-accent/20 text-center space-y-1">
                  <div className="text-xs text-appText-muted font-bold">Variabilitas Penutur</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    4 / 4
                  </div>
                  <div className="text-[10px] text-appText-muted">Pria & Wanita (Muda/Senior)</div>
                </div>
              </div>

              {/* Speaker Breakdown Table */}
              <div className="p-4 rounded-2xl bg-surface-2 border border-accent/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-appText-bright">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <span>Performa Akurasi Berdasarkan Register Penutur:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HVPT_SPEAKERS.map((spk) => {
                    const stats = summary.speaker_breakdown[spk.key] || { total: 0, correct: 0, accuracy: 0 };
                    return (
                      <div
                        key={spk.key}
                        className="p-3 rounded-xl bg-surface border border-accent/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{spk.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-appText-bright">{spk.label}</div>
                            <div className="text-[10px] text-appText-muted">{spk.age_label}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-accent">
                            {stats.total > 0 ? `${stats.accuracy}%` : '-'}
                          </div>
                          <div className="text-[10px] text-appText-muted">
                            {stats.correct}/{stats.total}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => startNewSession(selectedDomain)}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-accent text-bg text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Mulai Sesi Baru (10 Soal)</span>
                </button>
              </div>
            </div>
          ) : currentPair ? (
            /* Active Player Trial */
            <div className="space-y-4">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-bold text-appText-muted px-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-accent/20 text-accent font-mono">
                    Soal {currentIndex + 1} / {sessionPairs.length}
                  </span>
                  <span>{currentPair.title}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Skor: {results.filter((r) => r.is_correct).length} / {results.length}
                  </span>
                </div>
              </div>

              {/* Interactive HVPT Player Card */}
              <HVPTPlayer
                key={currentPair.pair_id}
                pair={currentPair}
                targetWord={currentPair.target_word}
                onComplete={handleTrialComplete}
              />
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-appText-muted">
              Tidak ada butir latihan untuk domain ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
