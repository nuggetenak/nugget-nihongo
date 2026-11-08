// ══════════════════════════════════════════════════════════════════
//  ExamLmsHub.tsx — Nugget Nihongo "The 3 Clean Doors" Exam Portal
//  Research Basis: DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md
//  Door 1 (JLPT), Door 2 (Tokutei Ginou SSW/JFT), Door 3 (Rapid Drill)
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Briefcase,
  Zap,
  Sparkles,
  Clock,
  Target,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  Star,
  Play,
  Flame,
  HelpCircle,
  X,
} from 'lucide-react';
import { JLPTLevel } from '../../types/vocab';
import { ScaffoldingMode, ExerciseTrackType, SSWSectorId } from '../../types/exercise';
import { useExerciseStore, ExerciseManifestEntry } from '../../store/useExerciseStore';
import { useAppStore } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

export type CleanDoorTab = 'jlpt' | 'ssw' | 'rapid';

interface ExamLmsHubProps {
  onStartExerciseSet: (setId: string, mode: ScaffoldingMode) => void;
  onStartFSRSDue: () => void;
  onStartMistakeReview: () => void;
  onStartDynamicDrill: (count: number) => void;
  dueCount: number;
  mistakesCount: number;
}

export const ExamLmsHub: React.FC<ExamLmsHubProps> = ({
  onStartExerciseSet,
  onStartFSRSDue,
  onStartMistakeReview,
  onStartDynamicDrill,
  dueCount,
  mistakesCount,
}) => {
  const { selectedLevel, setSelectedLevel, cards, streak } = useAppStore();
  const { openModal } = useModalStore();
  const {
    manifest,
    isLoadingManifest,
    fetchManifest,
    records,
    loadRecords,
    savedSessionAvailable,
    checkSavedSession,
    restoreSavedSession,
    discardSavedSession,
  } = useExerciseStore();

  const [activeDoor, setActiveDoor] = useState<CleanDoorTab>('jlpt');

  // Door 1 State: JLPT Active Level
  const [activeJlptLevel, setActiveJlptLevel] = useState<JLPTLevel>(
    selectedLevel === 'all' ? 'n5' : selectedLevel
  );

  // Door 2 State: SSW Active Track
  const [activeSswTrack, setActiveSswTrack] = useState<'jft' | SSWSectorId>('jft');

  // Pre-test Scaffolding Modal State
  const [selectedSetForPretest, setSelectedSetForPretest] = useState<ExerciseManifestEntry | null>(
    null
  );
  const [pretestMode, setPretestMode] = useState<ScaffoldingMode>('strict');

  useEffect(() => {
    fetchManifest();
    loadRecords();
    checkSavedSession();
  }, []);

  // Filter manifest sets
  const jlptSets =
    manifest?.sets.filter((s) => s.trackType === 'jlpt' && s.level === activeJlptLevel) || [];

  const jftSets = manifest?.sets.filter((s) => s.trackType === 'jft') || [];

  const sswSets =
    manifest?.sets.filter(
      (s) => s.trackType === 'ssw' && s.sswSectorId === activeSswTrack
    ) || [];

  // Handle open pre-test modal
  const handleOpenPreTest = (setEntry: ExerciseManifestEntry) => {
    setSelectedSetForPretest(setEntry);
    setPretestMode('strict'); // Default to authentic CBT standard
  };

  const handleLaunchConfirmed = () => {
    if (!selectedSetForPretest) return;
    onStartExerciseSet(selectedSetForPretest.setId, pretestMode);
    setSelectedSetForPretest(null);
  };

  const jlptLevels: JLPTLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1'];

  const sswSectorOptions: Array<{ id: 'jft' | SSWSectorId; label: string; icon: string; count: string }> = [
    { id: 'jft', label: 'JFT-Basic A2', icon: '🌸', count: '5 Set' },
    { id: 'ssw-kaigo', label: 'Kaigo (Keperawatan)', icon: '🏥', count: '5 Set' },
    { id: 'ssw-food-service', label: 'Gaishoku (Restoran)', icon: '🍽️', count: '5 Set' },
    { id: 'ssw-food-mfg', label: 'Pabrik Makanan', icon: '🏭', count: '5 Set' },
    { id: 'ssw-kensetsu-doboku', label: 'Konstruksi Sipil (土木)', icon: '🚜', count: '3 Set' },
    { id: 'ssw-kensetsu-kenchiku', label: 'Konstruksi Gedung (建築)', icon: '🏗️', count: '3 Set' },
    { id: 'ssw-kensetsu-lifeline', label: 'Konstruksi Utilitas (MEP)', icon: '🔧', count: '3 Set' },
    { id: 'ssw-agriculture', label: 'Pertanian (農業)', icon: '🌾', count: '5 Set' },
    { id: 'ssw-manufacturing', label: 'Manufaktur Mesin (製造)', icon: '⚙️', count: '5 Set' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* ── CRASH RECOVERY NOTIFICATION BANNER ────────────────────── */}
      {savedSessionAvailable && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-surface-2 to-surface border-2 border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-black flex items-center justify-center shrink-0 shadow-sm">
              <RotateCcw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight truncate">
                Sesi Ujian CBT Belum Selesai Terdeteksi
              </h4>
              <p className="text-xs text-appText-muted mt-0.5 truncate">
                Set <span className="font-mono text-amber-300">{savedSessionAvailable.setId}</span> · Tersisa{' '}
                {Math.ceil((savedSessionAvailable.remainingSeconds || 0) / 60)} menit lagi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={discardSavedSession}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-muted transition-all active:scale-95"
            >
              Abaikan
            </button>
            <button
              type="button"
              onClick={restoreSavedSession}
              className="min-h-[40px] px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-glow active:scale-95"
            >
              <span>Lanjutkan Sesi</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* ── MISSION COMMAND HEADER & THE 3 CLEAN DOORS ────────────── */}
      <div className="bg-surface border border-theme rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pusat Asesmen Resmi · 認定試験ポータル</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-appText-bright tracking-tight">
            Pusat Ujian & Latihan Terarah
          </h1>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed max-w-2xl">
            Pilih jalur target kelulusanmu: JLPT Akademik (N5–N1), Sertifikasi Tokutei Ginou SSW/JFT,
            atau Latihan Cepat Spaced Repetition FSRS.
          </p>
        </div>

        {/* ── THE 3 CLEAN DOORS TABS ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Pintu 1: JLPT */}
          <button
            type="button"
            onClick={() => setActiveDoor('jlpt')}
            className={`card-interactive-lift p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] flex flex-col justify-between min-h-[110px] ${
              activeDoor === 'jlpt'
                ? 'bg-amber-500/15 border-amber-500 text-appText-bright shadow-md ring-2 ring-amber-500/20'
                : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-muted hover:text-appText-bright'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl p-2 rounded-xl bg-surface border border-theme/80 shrink-0">
                🎌
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                  activeDoor === 'jlpt'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-surface border-theme text-appText-muted'
                }`}
              >
                50 Set
              </span>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400">Pintu 1</div>
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright mt-0.5 truncate">
                Pusat Ujian JLPT
              </h3>
              <p className="text-xs text-appText-muted truncate">Jenjang Resmi N5 s/d N1</p>
            </div>
          </button>

          {/* Pintu 2: SSW & JFT */}
          <button
            type="button"
            onClick={() => setActiveDoor('ssw')}
            className={`card-interactive-lift p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] flex flex-col justify-between min-h-[110px] ${
              activeDoor === 'ssw'
                ? 'bg-emerald-500/15 border-emerald-500 text-appText-bright shadow-md ring-2 ring-emerald-500/20'
                : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-muted hover:text-appText-bright'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl p-2 rounded-xl bg-surface border border-theme/80 shrink-0">
                🛠️
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                  activeDoor === 'ssw'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-surface border-theme text-appText-muted'
                }`}
              >
                39 Set
              </span>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400">Pintu 2</div>
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright mt-0.5 truncate">
                Pusat Tokutei Ginou
              </h3>
              <p className="text-xs text-appText-muted truncate">JFT-Basic A2 & 8 Sektor SSW</p>
            </div>
          </button>

          {/* Pintu 3: Latihan Cepat & Review */}
          <button
            type="button"
            onClick={() => setActiveDoor('rapid')}
            className={`card-interactive-lift p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] flex flex-col justify-between min-h-[110px] ${
              activeDoor === 'rapid'
                ? 'bg-cyan-500/15 border-cyan-500 text-appText-bright shadow-md ring-2 ring-cyan-500/20'
                : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-muted hover:text-appText-bright'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl p-2 rounded-xl bg-surface border border-theme/80 shrink-0">
                ⚡
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                  activeDoor === 'rapid'
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-surface border-theme text-appText-muted'
                }`}
              >
                Kilat & FSRS
              </span>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-cyan-400">Pintu 3</div>
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright mt-0.5 truncate">
                Latihan Cepat & Review
              </h3>
              <p className="text-xs text-appText-muted truncate">FSRS, Catatan Salah & CAT</p>
            </div>
          </button>
        </div>
      </div>

      {/* ── DOOR 1: PUSAT UJIAN JLPT (N5 - N1) ─────────────────────── */}
      {activeDoor === 'jlpt' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Level Switcher (N5 s/d N1) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface border border-theme rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-appText-muted uppercase tracking-wider">
                Pilih Jenjang JLPT:
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-theme overflow-x-auto scrollbar-none max-w-full">
              {jlptLevels.map((lvl) => {
                const isSelected = activeJlptLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setActiveJlptLevel(lvl);
                      setSelectedLevel(lvl);
                    }}
                    className={`min-h-[40px] px-4 py-1.5 text-xs font-extrabold rounded-lg uppercase transition-all active:scale-95 shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    JLPT {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Set Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright flex items-center gap-2">
                <span>Daftar Set Latihan Modular (15 Menit · 15 Soal)</span>
              </h3>
              <span className="text-xs text-appText-muted font-mono font-bold">
                Standar Kurikulum Resmi JF/JEES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Active Golden Set (Set 01) */}
              {jlptSets.map((setEntry) => {
                const record = records[setEntry.setId];
                const hasAttempt = Boolean(record && record.attempts > 0);

                return (
                  <div
                    key={setEntry.setId}
                    onClick={() => handleOpenPreTest(setEntry)}
                    className="card-interactive-lift group cursor-pointer bg-surface hover:bg-surface-2 border border-theme hover:border-amber-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-200 shadow-sm active:scale-[0.98] flex flex-col justify-between min-h-[170px]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 uppercase">
                          {setEntry.level?.toUpperCase()} · Golden Set
                        </span>
                        {hasAttempt && record.isMastered && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            <span>Mastered</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-appText-bright group-hover:text-amber-400 transition-colors">
                        {setEntry.title}
                      </h4>
                      <p className="text-xs text-appText-muted mt-1 line-clamp-2 leading-relaxed">
                        {setEntry.targetUnits}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-theme/60 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-appText-muted font-mono">
                        <span>⏱️ 15 Menit</span>
                        <span>· 15 Soal</span>
                      </div>

                      {hasAttempt ? (
                        <span className="font-mono font-bold text-emerald-400">
                          Skor: {record.bestScore}/15 ({record.bestPercentage}%)
                        </span>
                      ) : (
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <span>Mulai</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Locked/Upcoming Sets Placeholders (Sets 02..05) */}
              {[2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className="bg-surface/50 border border-dashed border-theme/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[170px] opacity-75"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-surface-2 border border-theme text-appText-muted uppercase">
                        {activeJlptLevel.toUpperCase()} · Set 0{num}
                      </span>
                      <span className="text-xs font-bold text-appText-dim flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Segera Hadir</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-appText-muted">
                      Set Latihan JLPT {activeJlptLevel.toUpperCase()} - 0{num}
                    </h4>
                    <p className="text-xs text-appText-dim mt-1 leading-relaxed">
                      Kurasi materi unit lanjutan dalam proses sinkronisasi kurikulum dewan guru.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-theme/40 text-xs text-appText-dim font-mono">
                    Terkunci · 15 Soal
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DOOR 2: PUSAT TOKUTEI GINOU (SSW & JFT-BASIC) ──────────── */}
      {activeDoor === 'ssw' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Sector Pill Switcher */}
          <div className="bg-surface border border-theme rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-appText-muted uppercase tracking-wider">
                Pilih Sektor Vokasional / JFT:
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full pb-1">
              {sswSectorOptions.map((opt) => {
                const isSelected = activeSswTrack === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setActiveSswTrack(opt.id)}
                    className={`min-h-[42px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                        : 'bg-surface-2 hover:bg-surface-3 border border-theme text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                    <span className="text-xs opacity-75 font-mono">({opt.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sector Set Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-extrabold text-appText-bright">
                {activeSswTrack === 'jft'
                  ? 'Set Latihan JFT-Basic A2 (Irodori & Can-Do Komunikasi)'
                  : `Set Latihan SSW: ${
                      sswSectorOptions.find((o) => o.id === activeSswTrack)?.label || 'Vokasional'
                    }`}
              </h3>
              <span className="text-xs text-appText-muted font-mono font-bold">
                Standar Kemenkes/Kementan/Kemenhub Jepang
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {(activeSswTrack === 'jft' ? jftSets : sswSets).map((setEntry) => {
                const record = records[setEntry.setId];
                const hasAttempt = Boolean(record && record.attempts > 0);

                return (
                  <div
                    key={setEntry.setId}
                    onClick={() => handleOpenPreTest(setEntry)}
                    className="group cursor-pointer bg-surface hover:bg-surface-2 border border-theme hover:border-emerald-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 shadow-sm active:scale-[0.98] flex flex-col justify-between min-h-[170px]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase">
                          {activeSswTrack === 'jft' ? 'JFT-Basic A2' : 'SSW Official'}
                        </span>
                        {hasAttempt && record.isMastered && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            <span>Mastered</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-appText-bright group-hover:text-emerald-400 transition-colors">
                        {setEntry.title}
                      </h4>
                      <p className="text-xs text-appText-muted mt-1 line-clamp-2 leading-relaxed">
                        {setEntry.targetUnits}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-theme/60 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-appText-muted font-mono">
                        <span>⏱️ 15 Menit</span>
                        <span>· 15 Soal K3 & Bahasa</span>
                      </div>

                      {hasAttempt ? (
                        <span className="font-mono font-bold text-emerald-400">
                          Skor: {record.bestScore}/15 ({record.bestPercentage}%)
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <span>Mulai</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Prometric Full Simulation Banner */}
              <div className="sm:col-span-2 lg:col-span-3 p-5 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-surface to-surface-2 border-2 border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>Simulasi Akbar Penuh Prometric CBT</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-appText-bright">
                    Simulasi 60 Menit Waktu Penuh Standar Prometric Jepang
                  </h4>
                  <p className="text-xs sm:text-sm text-appText-muted max-w-xl leading-relaxed">
                    Uji ketahanan mental dan kecepatanmu dalam simulasi 60 soal resmi dengan ambang batas kelulusan
                    resmi 200/250 poin (80%).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const targetSet = jlptSets[0] || manifest?.sets?.[0];
                    if (targetSet) {
                      onStartExerciseSet(targetSet.setId, 'strict');
                    } else {
                      onStartDynamicDrill(60);
                    }
                  }}
                  className="min-h-[46px] px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-glow shrink-0"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Uji Simulasi Penuh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DOOR 3: LATIHAN CEPAT & REVIEW DINAMIS ──────────────────── */}
      {activeDoor === 'rapid' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tool 1: Review Harian FSRS */}
            <div className="card-interactive-lift bg-surface hover:bg-surface-2 border border-theme hover:border-amber-500/50 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-amber-500/15 border border-amber-500/30">
                    🧠
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    {dueCount} Kartu Menanti
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg text-appText-bright">
                  Review Harian FSRS v4.5
                </h3>
                <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
                  Latih kartu kosakata, kanji, dan tata bahasa yang mencapai interval kritis kelupaan hari ini
                  sesuai rumus pengulangan berjarak ilmiah.
                </p>
              </div>

              <div className="pt-4 border-t border-theme/60 flex items-center justify-between gap-3">
                <span className="text-xs text-appText-muted font-mono">⏱️ ~3 Menit</span>
                <button
                  type="button"
                  disabled={dueCount === 0}
                  onClick={onStartFSRSDue}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {dueCount === 0 ? (
                    <>
                      <span>Belum Ada Kartu Perlu Diulas</span>
                      <span className="sr-only">Belum Ada Kartu Due</span>
                    </>
                  ) : (
                    <>
                      <span>Mulai Ulas Materi</span>
                      <span className="sr-only">Mulai Review</span>
                    </>
                  )}
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Tool 2: Buku Catatan Kesalahan (Mistake Bank) */}
            <div className="card-interactive-lift bg-surface hover:bg-surface-2 border border-theme hover:border-rose-500/50 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-rose-500/15 border border-rose-500/30">
                    📕
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300">
                    {mistakesCount} Soal Salah
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg text-appText-bright">
                  Buku Catatan Kesalahan (間違いノート)
                </h3>
                <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
                  Latih khusus butir-butir soal yang pernah kamu jawab salah pada kuis atau set latihan sebelumnya
                  tanpa perlu mengulang dari nol.
                </p>
              </div>

              <div className="pt-4 border-t border-theme/60 flex items-center justify-between gap-3">
                <span className="text-xs text-appText-muted font-mono">Fokus Remedial</span>
                <button
                  type="button"
                  onClick={onStartMistakeReview}
                  disabled={mistakesCount === 0}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 ${
                    mistakesCount > 0
                      ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-sm'
                      : 'bg-surface-3 text-appText-dim border border-theme cursor-not-allowed'
                  }`}
                >
                  <span>Latih Soal Salah</span>
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tool 3: Latihan Kilat 10 Soal Dinamis */}
            <div className="card-interactive-lift bg-surface hover:bg-surface-2 border border-theme hover:border-cyan-500/50 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                    ⚡
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                    Campuran 10 Soal
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg text-appText-bright">
                  Latihan Cepat Dinamis (Rapid Drill)
                </h3>
                <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
                  Latihan acak kilat 10 soal dari seluruh materi kurikulum yang telah kamu pelajari di MateriHub
                  untuk menguji daya reflek.
                </p>
              </div>

              <div className="pt-4 border-t border-theme/60 flex items-center justify-between gap-3">
                <span className="text-xs text-appText-muted font-mono">⏱️ ~2 Menit</span>
                <button
                  type="button"
                  onClick={() => onStartDynamicDrill(10)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <span>Mulai 10 Soal</span>
                  <Play className="w-4 h-4 fill-stone-950" />
                </button>
              </div>
            </div>

            {/* Tool 4: Tes Penempatan Cepat CAT IRT 3PL */}
            <div className="card-interactive-lift bg-surface hover:bg-surface-2 border border-theme hover:border-purple-500/50 rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-purple-500/15 border border-purple-500/30">
                    🎯
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">
                    IRT 3PL Presisi
                  </span>
                </div>

                <h3 className="font-black text-base sm:text-lg text-appText-bright">
                  Tes Penempatan Adaptif (CAT)
                </h3>
                <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
                  Diagnosa jenjang kemahiran bahasa Jepangmu (N5 hingga N1) dalam 10–12 butir soal adaptif
                  dengan akurasi statistik tinggi.
                </p>
              </div>

              <div className="pt-4 border-t border-theme/60 flex items-center justify-between gap-3">
                <span className="text-xs text-appText-muted font-mono">⏱️ ~5 Menit</span>
                <button
                  type="button"
                  onClick={() => openModal('catPlacement')}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <span>Mulai CAT</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PRE-TEST SCAFFOLDING MODAL (GUIDED VS STRICT) ──────────── */}
      {selectedSetForPretest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div
            className="w-full max-w-lg bg-surface border border-theme rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pretest-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSetForPretest(null)}
              className="absolute top-4 right-4 w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all active:scale-95"
              aria-label="Tutup konfigurasi ujian"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title with Irasutoya Senpai Anchor */}
            <div className="flex items-center gap-3.5 pr-10">
              <IrasutoyaImage
                assetId="senpai_studying"
                alt="Senpai Konfigurasi Ujian"
                className="w-12 h-12 object-contain"
                containerClassName="w-12 h-12 shrink-0"
                animateFloat
              />
              <div className="min-w-0">
                <span className="text-xs font-black uppercase tracking-wider text-accent-hot dark:text-amber-400 font-bold">
                  Konfigurasi Mode Pengerjaan · 試験設定
                </span>
                <h3 id="pretest-modal-title" className="text-lg sm:text-xl font-black text-appText-bright mt-0.5 truncate">
                  {selectedSetForPretest.title}
                </h3>
                <p className="text-xs text-appText-muted mt-0.5 truncate">
                  {selectedSetForPretest.targetUnits}
                </p>
              </div>
            </div>

            {/* Mode Selection Cards */}
            <div className="space-y-3">
              {/* Option 1: Strict Exam (Recommended) */}
              <div
                onClick={() => setPretestMode('strict')}
                className={`card-interactive-lift cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                  pretestMode === 'strict'
                    ? 'bg-rose-500/10 border-rose-500 text-appText-bright shadow-sm'
                    : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-muted'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-sm font-extrabold text-appText-bright">
                      🔴 Mode Simulasi Resmi (Strict Exam)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40">
                    Rekomendasi Ujian
                  </span>
                </div>
                <ul className="text-xs text-appText-muted mt-2 space-y-1 list-disc list-inside">
                  <li>Timer ketat 15:00 menit (hitung mundur resmi).</li>
                  <li>Pembahasan 5 lapis ditunda hingga seluruh soal selesai.</li>
                  <li>Audio Choukai dibatasi maksimal 2x putar (standar JFT).</li>
                  <li>Mencatat skor terverifikasi ke Rapor Kelulusan.</li>
                </ul>
              </div>

              {/* Option 2: Guided Practice */}
              <div
                onClick={() => setPretestMode('guided')}
                className={`card-interactive-lift cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                  pretestMode === 'guided'
                    ? 'bg-emerald-500/10 border-emerald-500 text-appText-bright shadow-sm'
                    : 'bg-surface-2 hover:bg-surface-3 border-theme text-appText-muted'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm font-extrabold text-appText-bright">
                      🟢 Mode Latihan Terbimbing (Guided Practice)
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Ramah ADHD
                  </span>
                </div>
                <ul className="text-xs text-appText-muted mt-2 space-y-1 list-disc list-inside">
                  <li>Waktu santai tanpa batas hitung mundur.</li>
                  <li>Umpan balik & pembahasan 5 lapis terbuka seketika per soal.</li>
                  <li>Audio Choukai dapat diputar ulang bebas tanpa batas.</li>
                  <li>Cocok untuk mendalami konsep dan mempelajari pola baru.</li>
                </ul>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSetForPretest(null)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-theme text-xs font-bold text-appText-muted transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleLaunchConfirmed}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-glow active:scale-95"
              >
                <span>Mulai Ujian Sekarang</span>
                <Play className="w-4 h-4 fill-stone-950" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
