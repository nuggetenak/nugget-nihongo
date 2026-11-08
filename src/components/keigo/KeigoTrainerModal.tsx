// ══════════════════════════════════════════════════════════════════
//  KeigoTrainerModal.tsx — Pelatih Keigo & Etiket Kerja Bisnis
//  (Sonkeigo, Kenjougo, Teineigo, Uchi-Soto Simulator, & Tokutei Ginou)
//  Built to Universal Multi-Device Responsive Design Standards
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import {
  X,
  Volume2,
  Sparkles,
  Search,
  RotateCcw,
  BookOpen,
  GitFork,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx, playFlipSfx } from '../../lib/audio/sfx';
import {
  KEIGO_VERB_BANK,
  KEIGO_NOUN_BANK,
  REQUEST_LADDER,
  KEIGO_SCENARIO_BANK,
  BUSINESS_ETIQUETTE_NOTES,
  KeigoVerb,
  KeigoNounWord,
  KeigoScenario,
} from '../../lib/keigo/keigoData';
import {
  DecisionPath,
  currentDecisionStep,
  deriveRegister,
  explainDecisionPath,
  searchKeigoVerbs,
  searchKeigoNouns,
} from '../../lib/keigo/keigoEngine';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface KeigoTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'matrix' | 'tree' | 'drill' | 'etiquette';
}

type MainTab = 'matrix' | 'tree' | 'drill' | 'etiquette';
type MatrixCategory = 'all' | 'irregular' | 'regular' | 'nouns' | 'requests';

export const KeigoTrainerModal: React.FC<KeigoTrainerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'matrix',
}) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);
  const [activeTab, setActiveTab] = useState<MainTab>(initialTab);

  // Tab 1: Matrix state
  const [searchQuery, setSearchQuery] = useState('');
  const [matrixCategory, setMatrixCategory] = useState<MatrixCategory>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Tab 2: Decision Tree state
  const [decisionPath, setDecisionPath] = useState<DecisionPath>({});

  // Tab 3: Drill state
  const [drillCategory, setDrillCategory] = useState<string>('all');
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [drillScore, setDrillScore] = useState({ correct: 0, total: 0 });
  const [answeredDrillIds, setAnsweredDrillIds] = useState<Set<string>>(new Set());

  // Filtered Drills
  const activeDrills = useMemo(() => {
    if (drillCategory === 'all') return KEIGO_SCENARIO_BANK;
    return KEIGO_SCENARIO_BANK.filter((sc) => sc.category === drillCategory);
  }, [drillCategory]);

  const currentScenario: KeigoScenario | undefined = activeDrills[drillIndex] || activeDrills[0];

  // Filtered Matrix Verbs
  const filteredVerbs = useMemo(() => {
    let list = searchKeigoVerbs(searchQuery);
    if (matrixCategory === 'irregular') list = list.filter((v) => v.type === 'irregular');
    if (matrixCategory === 'regular') list = list.filter((v) => v.type === 'regular');
    return list;
  }, [searchQuery, matrixCategory]);

  // Filtered Nouns
  const filteredNouns = useMemo(() => {
    return searchKeigoNouns(searchQuery);
  }, [searchQuery]);

  // Escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Sound handler
  const handlePlayAudio = (text: string) => {
    speakJapanese(text);
  };

  // Decision Tree navigation
  const step = currentDecisionStep(decisionPath);
  const finalRegister = deriveRegister(decisionPath);
  const explanationText = explainDecisionPath(decisionPath);

  const resetDecisionTree = () => {
    playFlipSfx();
    setDecisionPath({});
  };

  // Drill option click
  const handleSelectDrillOption = (index: number) => {
    if (selectedOptionIndex !== null || !currentScenario) return;
    setSelectedOptionIndex(index);

    const isCorrect = currentScenario.options[index]?.isCorrect;
    if (isCorrect) {
      playSuccessSfx();
      setDrillScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      playErrorSfx();
      setDrillScore((prev) => ({ ...prev, total: prev.total + 1 }));
    }

    setAnsweredDrillIds((prev) => new Set(prev).add(currentScenario.id));
  };

  const handleNextDrill = () => {
    playFlipSfx();
    setSelectedOptionIndex(null);
    setDrillIndex((prev) => (prev + 1) % activeDrills.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Pelatih Keigo & Etiket Bisnis"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-surface border-t-2 sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[90dvh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-accent/30" />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 bg-surface-2/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30 overflow-hidden">
              <IrasutoyaImage assetId="sensei_ojigi" className="w-8 h-8" containerClassName="w-8 h-8 shrink-0" animateFloat />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-appText-bright truncate">
                  Pelatih Keigo & Etiket Kerja
                </h2>
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 hidden sm:inline-block">
                  尊敬語・謙譲語
                </span>
              </div>
              <p className="text-xs sm:text-xs text-appText-muted truncate">
                Kuasai Sonkeigo, Kenjougo, Teineigo, logika Uchi-Soto, & SSW Tokutei Ginou
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors active:scale-95 flex items-center justify-center"
            title="Tutup"
            aria-label="Tutup pelatih keigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="border-b border-accent/15 bg-surface-2/40 px-3 sm:px-5 shrink-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-2.5">
            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('matrix');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'matrix'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Matriks & Kamus Keigo</span>
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('tree');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'tree'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>Pohon Logika Uchi-Soto</span>
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('drill');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'drill'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Latihan Skenario Kerja</span>
              {drillScore.total > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-surface-3/80 text-appText-bright">
                  {drillScore.correct}/{drillScore.total}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('etiquette');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'etiquette'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-accent-hot dark:text-amber-400" />
              <span>Etiket & Jebakan Nyata</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-5 scrollbar-thin">
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 1: MATRIKS & KAMUS KEIGO                                */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              {/* Search & Sub-category Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-appText-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kanji, kana, atau arti (misal: pergi, 行く, 申す, 弊社)..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright placeholder-appText-muted focus:outline-none focus:border-accent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 py-0.5">
                  {(
                    [
                      { id: 'all', label: 'Semua' },
                      { id: 'irregular', label: '15 Verba Khusus' },
                      { id: 'regular', label: 'Pola Teratur (お/ご)' },
                      { id: 'nouns', label: 'Nomina & Bikago' },
                      { id: 'requests', label: 'Tangga Permohonan' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setMatrixCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        matrixCategory === cat.id
                          ? 'bg-surface-3 text-accent font-bold border border-accent/30'
                          : 'bg-surface-2 hover:bg-surface-3 text-appText-muted'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informative Guidance Banner */}
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-appText-bright leading-relaxed">
                  <span className="font-bold text-indigo-800 dark:text-indigo-300">Prinsip Emas Keigo: </span>
                  <span className="text-amber-800 dark:text-amber-300 font-bold">Sonkeigo (尊敬語)</span> meninggikan tindakan orang yang dihormati (lawan bicara/klien), sedangkan{' '}
                  <span className="text-cyan-800 dark:text-cyan-300 font-bold">Kenjougo (謙譲語)</span> merendahkan tindakan diri sendiri atau anggota kelompok sendiri demi menghormati orang lain.
                </div>
              </div>

              {/* Verbs List */}
              {matrixCategory !== 'nouns' && matrixCategory !== 'requests' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
                    <span>Daftar Kata Kerja Keigo ({filteredVerbs.length})</span>
                    <span className="text-xs font-normal lowercase">Klik untuk melihat contoh kalimat</span>
                  </h3>

                  {filteredVerbs.length === 0 ? (
                    <div className="text-center py-8 text-appText-muted text-xs">
                      Tidak ada kata kerja yang cocok dengan pencarian "{searchQuery}".
                    </div>
                  ) : (
                    filteredVerbs.map((verb) => {
                      const isExpanded = expandedCardId === verb.id;
                      return (
                        <div
                          key={verb.id}
                          className="rounded-2xl card-interactive-lift bg-surface-2 border border-accent/15 hover:border-accent/35 transition-all overflow-hidden"
                        >
                          <div
                            onClick={() => setExpandedCardId(isExpanded ? null : verb.id)}
                            className="p-3.5 sm:p-4 cursor-pointer hover:bg-surface-3/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayAudio(verb.dictionaryForm);
                                }}
                                className="w-10 h-10 rounded-xl bg-surface hover:bg-accent hover:text-surface text-appText-muted transition-colors flex items-center justify-center shrink-0 active:scale-95"
                                title="Dengarkan pelafalan"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-extrabold text-appText-bright">
                                    {verb.dictionaryForm}
                                  </span>
                                  <span className="text-xs text-appText-muted font-medium">
                                    ({verb.reading})
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                                      verb.type === 'irregular'
                                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                    }`}
                                  >
                                    {verb.type === 'irregular' ? 'Khusus' : 'Pola Teratur'}
                                  </span>
                                </div>
                                <div className="text-xs text-accent font-semibold truncate">
                                  {verb.meaning}
                                </div>
                              </div>
                            </div>

                            {/* Conjugation Badges */}
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/25 text-left">
                                <div className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400">Sonkeigo (Hormat)</div>
                                <div className="text-xs font-bold text-appText-bright">{verb.sonkeigo}</div>
                              </div>
                              <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/25 text-left">
                                <div className="text-xs uppercase font-bold text-cyan-700 dark:text-cyan-400">Kenjougo (Rendah Hati)</div>
                                <div className="text-xs font-bold text-appText-bright">{verb.kenjougo}</div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Nuance & Examples */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-2 border-t border-accent/10 bg-surface-3/30 space-y-3 animate-in fade-in duration-200">
                              <div className="text-xs text-appText-muted leading-relaxed bg-surface/60 p-3 rounded-xl border border-accent/10">
                                <span className="font-bold text-accent">Catatan Nuansa: </span>
                                {verb.nuanceNote}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {/* Sonkeigo Example */}
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase text-amber-400">Contoh Sonkeigo</span>
                                    <button
                                      type="button"
                                      onClick={() => handlePlayAudio(verb.exampleSonkeigo.jp)}
                                      className="text-amber-400 hover:text-amber-300 p-1"
                                      title="Dengarkan audio contoh"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="text-xs font-bold text-appText-bright">{verb.exampleSonkeigo.jp}</div>
                                  <div className="text-xs text-appText-muted">{verb.exampleSonkeigo.id}</div>
                                </div>

                                {/* Kenjougo Example */}
                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase text-cyan-400">Contoh Kenjougo</span>
                                    <button
                                      type="button"
                                      onClick={() => handlePlayAudio(verb.exampleKenjougo.jp)}
                                      className="text-cyan-400 hover:text-cyan-300 p-1"
                                      title="Dengarkan audio contoh"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="text-xs font-bold text-appText-bright">{verb.exampleKenjougo.jp}</div>
                                  <div className="text-xs text-appText-muted">{verb.exampleKenjougo.id}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Nouns & Bikago Section */}
              {(matrixCategory === 'all' || matrixCategory === 'nouns') && (
                <div className="space-y-3 pt-3">
                  <h3 className="text-xs font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
                    <span>Kata Benda, Bikago, & Pasangan Uchi/Soto ({filteredNouns.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredNouns.map((noun) => (
                      <div
                        key={noun.id}
                        className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 space-y-2 hover:border-accent/35 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-appText-bright">{noun.plain}</span>
                            <span className="text-xs text-appText-muted">({noun.reading})</span>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold">
                            {noun.meaning}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {noun.sonkeigo && (
                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                              <div className="text-xs font-bold text-amber-400 uppercase">Pihak Luar (Soto)</div>
                              <div className="font-bold text-appText-bright truncate">{noun.sonkeigo}</div>
                            </div>
                          )}
                          {noun.kenjougo ? (
                            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                              <div className="text-xs font-bold text-cyan-400 uppercase">Kelompok Sendiri (Uchi)</div>
                              <div className="font-bold text-appText-bright truncate">{noun.kenjougo}</div>
                            </div>
                          ) : (
                            <div className="p-2 rounded-xl bg-surface-3/50 border border-accent/10">
                              <div className="text-xs font-bold text-appText-muted uppercase">Bentuk Baku</div>
                              <div className="font-medium text-appText-muted truncate">{noun.plain}</div>
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-appText-muted leading-relaxed">{noun.nuanceNote}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Request Ladder Section */}
              {(matrixCategory === 'all' || matrixCategory === 'requests') && (
                <div className="space-y-3 pt-3">
                  <h3 className="text-xs font-bold text-appText-muted uppercase tracking-wider">
                    Tangga Kehalusan Permohonan Bisnis (Request Ladder)
                  </h3>

                  <div className="space-y-2.5">
                    {REQUEST_LADDER.map((req) => (
                      <div
                        key={req.id}
                        className="p-3.5 sm:p-4 rounded-2xl bg-surface-2 border border-accent/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-extrabold text-xs flex items-center justify-center shrink-0">
                              {req.level}
                            </span>
                            <span className="text-xs font-extrabold text-appText-bright">{req.label}</span>
                          </div>
                          <div className="text-sm font-bold text-amber-300 font-mono">{req.pattern}</div>
                          <p className="text-xs text-appText-muted">{req.idExplanation}</p>
                        </div>

                        <div className="sm:max-w-xs shrink-0 p-2.5 rounded-xl bg-surface border border-accent/15 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-accent">Contoh Penggunaan</span>
                            <button
                              type="button"
                              onClick={() => handlePlayAudio(req.example.jp)}
                              className="text-appText-muted hover:text-accent p-0.5"
                              title="Dengarkan audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs font-bold text-appText-bright">{req.example.jp}</div>
                          <div className="text-xs text-appText-muted">{req.example.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 2: POHON LOGIKA UCHI-SOTO (DECISION TREE SIMULATOR)     */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'tree' && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div className="text-center space-y-1.5">
                <h3 className="text-base sm:text-lg font-extrabold text-appText-bright">
                  Simulator Logika Uchi-Soto 3 Langkah
                </h3>
                <p className="text-xs text-appText-muted">
                  Jawab pertanyaan berikut untuk mengetahui apakah Anda harus menggunakan Sonkeigo (尊敬語) atau Kenjougo (謙譲語).
                </p>
              </div>

              {/* Step 1: Whose action is it? */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Langkah 1: Siapakah Pelaku Tindakannya?
                  </span>
                  {decisionPath.actor && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terpilih
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      playFlipSfx();
                      setDecisionPath({ actor: 'self' });
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                      decisionPath.actor === 'self'
                        ? 'bg-cyan-500/20 border-cyan-400 text-appText-bright shadow-sm'
                        : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                    }`}
                  >
                    <div className="font-bold text-xs text-appText-bright">Diri Saya Sendiri (私)</div>
                    <div className="text-xs text-appText-muted mt-0.5">
                      Tindakan saya sendiri yang ditujukan kepada lawan bicara.
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      playFlipSfx();
                      setDecisionPath({ actor: 'other' });
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                      decisionPath.actor === 'other'
                        ? 'bg-amber-500/20 border-amber-400 text-appText-bright shadow-sm'
                        : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                    }`}
                  >
                    <div className="font-bold text-xs text-appText-bright">Orang Lain (他人・相手)</div>
                    <div className="text-xs text-appText-muted mt-0.5">
                      Tindakan lawan bicara, atasan, tamu, atau rekan kerja.
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Direct or Third-party? (Only if actor is other) */}
              {decisionPath.actor === 'other' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Langkah 2: Berbicara Langsung atau Membicarakan Pihak Ketiga?
                    </span>
                    {decisionPath.addressee && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terpilih
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        playFlipSfx();
                        setDecisionPath((prev) => ({ ...prev, addressee: 'direct', group: undefined }));
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                        decisionPath.addressee === 'direct'
                          ? 'bg-amber-500/20 border-amber-400 text-appText-bright shadow-sm'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                      }`}
                    >
                      <div className="font-bold text-xs text-appText-bright">Bicara Langsung dengannya</div>
                      <div className="text-xs text-appText-muted mt-0.5">
                        Saya sedang bertatap muka / menelepon langsung orang tersebut.
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        playFlipSfx();
                        setDecisionPath((prev) => ({ ...prev, addressee: 'third-party' }));
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                        decisionPath.addressee === 'third-party'
                          ? 'bg-purple-500/20 border-purple-400 text-appText-bright shadow-sm'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                      }`}
                    >
                      <div className="font-bold text-xs text-appText-bright">Membicarakan Pihak Ketiga</div>
                      <div className="text-xs text-appText-muted mt-0.5">
                        Saya sedang menceritakan tindakan orang lain kepada lawan bicara saya.
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Own group (Uchi) or Outsider (Soto)? (Only if third-party) */}
              {decisionPath.actor === 'other' && decisionPath.addressee === 'third-party' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      Langkah 3: Orang itu Termasuk Kelompok Siapa Relatif terhadap Lawan Bicara?
                    </span>
                    {decisionPath.group && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terpilih
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        playFlipSfx();
                        setDecisionPath((prev) => ({ ...prev, group: 'own-group' }));
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                        decisionPath.group === 'own-group'
                          ? 'bg-cyan-500/20 border-cyan-400 text-appText-bright shadow-sm'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                      }`}
                    >
                      <div className="font-bold text-xs text-appText-bright">Kelompok Sendiri (Uchi - 内)</div>
                      <div className="text-xs text-appText-muted mt-0.5">
                        Misal: Bos/rekan sekantor saya, saat saya berbicara dengan klien pihak luar.
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        playFlipSfx();
                        setDecisionPath((prev) => ({ ...prev, group: 'outsider' }));
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all active:scale-98 ${
                        decisionPath.group === 'outsider'
                          ? 'bg-amber-500/20 border-amber-400 text-appText-bright shadow-sm'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText-muted'
                      }`}
                    >
                      <div className="font-bold text-xs text-appText-bright">Pihak Luar (Soto - 外)</div>
                      <div className="text-xs text-appText-muted mt-0.5">
                        Misal: Orang dari perusahaan rekanan atau tamu kehormatan.
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Result Card */}
              {step === 'result' && finalRegister && (
                <div className="p-5 rounded-2xl bg-surface-2 border-2 border-accent shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-wider text-appText-muted">
                        Hasil Analisis Register
                      </span>
                    </div>

                    <button
                      onClick={resetDecisionTree}
                      className="px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-3 text-xs font-bold text-appText-muted hover:text-appText-bright border border-accent/15 flex items-center gap-1.5 active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ulangi Simulator</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-surface flex items-center justify-between">
                    <div>
                      <div className="text-xs text-appText-muted font-medium">Bentuk Bahasa yang Wajib Digunakan:</div>
                      <div className="text-xl font-extrabold text-appText-bright flex items-center gap-2 mt-0.5">
                        {finalRegister === 'sonkeigo' ? (
                          <span className="text-amber-400">Sonkeigo (尊敬語 - Meninggikan)</span>
                        ) : (
                          <span className="text-cyan-400">Kenjougo (謙譲語 - Merendahkan Diri)</span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-2xl font-black px-3.5 py-1.5 rounded-2xl ${
                        finalRegister === 'sonkeigo'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {finalRegister === 'sonkeigo' ? 'お/ご〜になる' : 'お/ご〜する'}
                    </span>
                  </div>

                  <div className="text-xs text-appText-bright leading-relaxed p-3.5 rounded-xl bg-accent/10 border border-accent/20">
                    <span className="font-bold text-accent">Penjelasan Mendalam: </span>
                    {explanationText}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 3: LATIHAN SKENARIO KERJA (WORKPLACE SCENARIO DRILLS)   */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'drill' && currentScenario && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Category Pills & Score */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
                  {(
                    [
                      { id: 'all', label: 'Semua Skenario' },
                      { id: 'customer-service', label: 'Layanan Tamu' },
                      { id: 'workplace', label: 'Kantor & Uchi-Soto' },
                      { id: 'phone', label: 'Telepon Kantor' },
                      { id: 'email', label: 'Email Bisnis' },
                      { id: 'ssw-tokutei', label: 'SSW Kaigo' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        playFlipSfx();
                        setDrillCategory(cat.id);
                        setDrillIndex(0);
                        setSelectedOptionIndex(null);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        drillCategory === cat.id
                          ? 'bg-accent text-surface font-bold'
                          : 'bg-surface-2 text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-extrabold text-appText-bright px-3 py-1 rounded-xl bg-surface-2 border border-accent/15 shrink-0">
                  {drillIndex + 1} / {activeDrills.length}
                </div>
              </div>

              {/* Scenario Context Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      {currentScenario.categoryLabel}
                    </span>
                    {currentScenario.flipCase && (
                      <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Uchi-Soto Flip
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayAudio(currentScenario.audioPhrase)}
                    className="text-appText-muted hover:text-accent p-1 flex items-center gap-1 text-xs font-semibold"
                    title="Dengarkan pengucapan kalimat alami"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Audio</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs text-appText-muted">
                    <span className="font-bold text-appText-bright">Situasi: </span>
                    {currentScenario.setting}
                  </div>
                  <div className="text-xs text-appText-muted">
                    <span className="font-bold text-appText-bright">Lawan Bicara: </span>
                    {currentScenario.otherParty}
                  </div>
                  <div className="text-sm font-bold text-accent pt-1">
                    {currentScenario.promptCue}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentScenario.options.map((option, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isAnswered = selectedOptionIndex !== null;

                  let borderClass = 'border-accent/15 hover:border-accent/40 bg-surface-2';
                  if (isAnswered) {
                    if (option.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-200';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-500/15 text-rose-200';
                    } else {
                      borderClass = 'border-accent/10 opacity-60 bg-surface-2';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectDrillOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-98 flex items-start justify-between gap-3 ${borderClass}`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-appText-bright">{option.text}</div>
                        <div className="text-xs text-appText-muted">{option.reading}</div>
                        {isAnswered && (
                          <p
                            className={`text-xs mt-2 font-medium leading-relaxed ${
                              option.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            {option.feedback}
                          </p>
                        )}
                      </div>

                      {isAnswered && (
                        <div className="shrink-0 mt-0.5">
                          {option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {selectedOptionIndex !== null && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextDrill}
                    className="px-5 py-2.5 rounded-xl bg-accent text-surface font-extrabold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    <span>Lanjut ke Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 4: ETIKET & JEBAKAN NYATA (REAL-WORLD WORKPLACE PITFALLS) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'etiquette' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-appText-bright">
                  5 Jebakan & Realitas Bahasa Kerja Jepang
                </h3>
                <p className="text-xs text-appText-muted">
                  Perbedaan antara apa yang diajarkan buku pelajaran konvensional vs etiket nyata di lapangan kerja Jepang / Tokutei Ginou.
                </p>
              </div>

              <div className="space-y-3.5">
                {BUSINESS_ETIQUETTE_NOTES.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/15 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-appText-bright">{note.title}</h4>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                          note.status.includes('Settled')
                            ? 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/25'
                            : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25'
                        }`}
                      >
                        {note.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-surface border border-accent/10 space-y-1">
                        <div className="text-xs font-bold uppercase text-appText-muted">
                          Diajarkan di Buku Pelajaran
                        </div>
                        <p className="text-appText-muted leading-relaxed">{note.textbookTaught}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-surface border border-accent/10 space-y-1">
                        <div className="text-xs font-bold uppercase text-amber-400">
                          Realitas Lapangan Kerja Jepang
                        </div>
                        <p className="text-appText-bright leading-relaxed">{note.workplaceReality}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Tips Praktis SSW & Interview: </span>
                        {note.sswPracticalTip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
