// ══════════════════════════════════════════════════════════════════
//  NuanceCompareModal.tsx — Side-by-Side Grammar Nuance Comparison
//  Contrasting tricky grammar pairs with semantic distinction & exam traps
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import { X, Volume2, Sparkles, AlertTriangle, Search, BrainCircuit } from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import {
  CANONICAL_NUANCE_PAIRS,
  NuanceComparisonPair,
  NuanceCategory,
} from '../../lib/data/nuanceDb';

export type { NuanceComparisonPair as NuancePair };
export const NUANCE_COMPARISON_PAIRS = CANONICAL_NUANCE_PAIRS;

interface NuanceCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_TABS: Array<{ id: NuanceCategory | 'all'; label: string; icon: string }> = [
  { id: 'all', label: 'Semua Pasangan', icon: '✨' },
  { id: 'l1_interference', label: 'Salah Kaprah L1 Indo', icon: '🇮🇩' },
  { id: 'transitivity', label: 'Transitif vs Intransitif', icon: '⚖️' },
  { id: 'false_friends', label: 'False Friends (Wasei-Eigo)', icon: '⚠️' },
  { id: 'jlpt_grammar', label: 'Nuansa JLPT N3–N1', icon: '🎯' },
];

export const NuanceCompareModal: React.FC<NuanceCompareModalProps> = ({ isOpen, onClose }) => {
  const [selectedPairId, setSelectedPairId] = useState<string>('adalah-insertion-copula');
  const [activeCategory, setActiveCategory] = useState<NuanceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  // Filter list by category and search query
  const filteredPairs = useMemo(() => {
    return CANONICAL_NUANCE_PAIRS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        p.title.toLowerCase().includes(q) ||
        p.patternA.pattern.toLowerCase().includes(q) ||
        p.patternB.pattern.toLowerCase().includes(q) ||
        p.patternA.meaning.toLowerCase().includes(q) ||
        p.patternB.meaning.toLowerCase().includes(q) ||
        p.keyDifference.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const currentPair =
    filteredPairs.find((p) => p.id === selectedPairId) ||
    filteredPairs[0] ||
    CANONICAL_NUANCE_PAIRS[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Inspektor Perbandingan Nuansa Tata Bahasa"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 scrollbar-none"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-glow">
              <IrasutoyaImage
                assetId="sensei_teaching"
                className="w-10 h-10 object-contain"
                alt="Inspektor Nuansa Tata Bahasa"
                animateFloat
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-appText-bright flex items-center gap-2">
                <span>Inspektor Nuansa Tata Bahasa</span>
                <span className="text-xs font-mono text-accent" lang="ja">ニュアンス比較</span>
              </h2>
              <p className="text-xs text-appText-muted">
                Bedah perbandingan 300+ interferensi L1 Indonesia, transitif-intransitif, dan jebakan JLPT.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all active:scale-95"
            title="Tutup"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-2 min-h-[38px] rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 active:scale-95 shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-accent text-bg border-accent shadow-sm'
                    : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-appText-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pola, kata kerja, atau topik (misal: adalah, wa, ga, mansion, akeru)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright placeholder-appText-muted/60 focus:outline-none focus:border-accent"
              aria-label="Cari pola nuansa"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-6 h-6 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-appText-muted hover:text-appText-bright"
                aria-label="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Pair Pills Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredPairs.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPairId(p.id)}
              className={`px-3 py-2 min-h-[36px] rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 active:scale-95 shrink-0 ${
                currentPair.id === p.id
                  ? 'bg-accent text-bg border-accent shadow-sm'
                  : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>{p.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  currentPair.id === p.id
                    ? 'bg-black/20 text-bg'
                    : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                }`}
              >
                {p.level}
              </span>
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pattern A Box */}
          <div className="card-interactive-lift bg-surface-2 border border-accent/25 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-accent/15 pb-3">
              <div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-500/30">
                  Pola A
                </span>
                <h3 className="text-xl font-jp font-bold text-appText-bright mt-1.5" lang="ja">
                  {currentPair.patternA.pattern}
                </h3>
                <div className="text-xs text-accent font-semibold mt-0.5">
                  {currentPair.patternA.meaning}
                </div>
              </div>

              <button
                type="button"
                onClick={() => speakJapanese(currentPair.patternA.pattern)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                aria-label={`Dengarkan pengucapan ${currentPair.patternA.pattern}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-appText-muted leading-relaxed">
              <span className="font-bold text-appText-bright block mb-1">Karakter & Nuansa:</span>
              {currentPair.patternA.nuance}
            </div>

            <div className="bg-surface/70 rounded-xl p-3 border border-accent/10 space-y-1">
              <div className="flex items-center justify-between text-xs font-jp text-appText-bright font-semibold">
                <span lang="ja">{currentPair.patternA.example.jp}</span>
                <button
                  type="button"
                  onClick={() => speakJapanese(currentPair.patternA.example.jp)}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-appText-muted hover:text-accent transition-colors active:scale-95 rounded-lg"
                  aria-label="Dengarkan contoh kalimat A"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-appText-muted italic">
                {currentPair.patternA.example.id}
              </div>
            </div>
          </div>

          {/* Pattern B Box */}
          <div className="card-interactive-lift bg-surface-2 border border-accent/25 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-accent/15 pb-3">
              <div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                  Pola B
                </span>
                <h3 className="text-xl font-jp font-bold text-appText-bright mt-1.5" lang="ja">
                  {currentPair.patternB.pattern}
                </h3>
                <div className="text-xs text-accent font-semibold mt-0.5">
                  {currentPair.patternB.meaning}
                </div>
              </div>

              <button
                type="button"
                onClick={() => speakJapanese(currentPair.patternB.pattern)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-amber-500/20 text-accent flex items-center justify-center transition-all shrink-0 active:scale-95"
                aria-label={`Dengarkan pengucapan ${currentPair.patternB.pattern}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-appText-muted leading-relaxed">
              <span className="font-bold text-appText-bright block mb-1">Karakter & Nuansa:</span>
              {currentPair.patternB.nuance}
            </div>

            <div className="bg-surface/70 rounded-xl p-3 border border-accent/10 space-y-1">
              <div className="flex items-center justify-between text-xs font-jp text-appText-bright font-semibold">
                <span lang="ja">{currentPair.patternB.example.jp}</span>
                <button
                  type="button"
                  onClick={() => speakJapanese(currentPair.patternB.example.jp)}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-appText-muted hover:text-accent transition-colors active:scale-95 rounded-lg"
                  aria-label="Dengarkan contoh kalimat B"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-appText-muted italic">
                {currentPair.patternB.example.id}
              </div>
            </div>
          </div>
        </div>

        {/* L1 Interference Autopsy Card (If Present) */}
        {currentPair.l1Pitfall && (
          <div className="card-interactive-lift bg-gradient-to-r from-purple-500/15 via-surface-2 to-surface-2 border border-purple-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="font-extrabold text-xs text-purple-800 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <span>Bedah Kesalahan Khas Pemelajar Indonesia (L1 Interference)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20">
                  {currentPair.domain}
                </span>
              </div>
              <div className="text-xs text-appText-bright font-medium">
                <span className="text-rose-400 font-bold">Salah Kaprah: </span>
                {currentPair.l1Pitfall.indonesianMistake}
              </div>
              <p className="text-xs text-appText-muted leading-relaxed">
                <span className="font-bold text-appText-bright">Akar Masalah: </span>
                {currentPair.l1Pitfall.rootCause}
              </p>
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 font-semibold">
                💡 Jembatan Keledai Sensei: {currentPair.l1Pitfall.remedialMnemonic}
              </div>
            </div>
          </div>
        )}

        {/* Core Distinction & Trap Warning Summary */}
        <div className="space-y-3">
          <div className="card-interactive-lift bg-gradient-to-r from-amber-500/15 via-surface-2 to-surface-2 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-accent-hot shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-xs text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Perbedaan Inti:
              </div>
              <p className="text-xs text-appText-bright mt-1 leading-relaxed">
                {currentPair.keyDifference}
              </p>
            </div>
          </div>

          <div className="card-interactive-lift bg-gradient-to-r from-red-500/10 via-surface-2 to-surface-2 border border-red-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                Jebakan Soal Ujian (JLPT Trap Warning):
              </div>
              <p className="text-xs text-appText-muted mt-1 leading-relaxed">
                {currentPair.trapWarning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
