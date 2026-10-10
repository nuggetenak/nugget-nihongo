// ══════════════════════════════════════════════════════════════════
//  KanaChartModal.tsx — Interactive 50-Sound Kana Chart
//  Hiragana & Katakana, Audio TTS per cell, Romaji Toggle, Practice Mode
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, BookOpen, Layers, CheckCircle2, RotateCcw } from 'lucide-react';
import { GOJUON_KANA, DAKUON_KANA, YOON_KANA, KanaItem } from './kanaData';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playFlipSfx } from '../../lib/audio/sfx';

interface KanaChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KanaChartModal: React.FC<KanaChartModalProps> = ({ isOpen, onClose }) => {
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [groupTab, setGroupTab] = useState<'gojuon' | 'dakuon' | 'yoon'>('gojuon');
  const [showRomaji, setShowRomaji] = useState(true);
  const [activeKana, setActiveKana] = useState<KanaItem | null>(null);

  // Quick practice mode state
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFlipped, setPracticeFlipped] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentList: KanaItem[] =
    groupTab === 'gojuon' ? GOJUON_KANA : groupTab === 'dakuon' ? DAKUON_KANA : YOON_KANA;

  const handleTileClick = (item: KanaItem) => {
    setActiveKana(item);
    const char = scriptType === 'hiragana' ? item.hiragana : item.katakana;
    speakJapanese(char, 0.8);
  };

  const startPractice = () => {
    setIsPracticeMode(true);
    setPracticeIndex(0);
    setPracticeFlipped(false);
    setPracticeScore(0);
  };

  const handleNextPractice = (knewIt: boolean) => {
    if (knewIt) {
      setPracticeScore((prev) => prev + 1);
      playSuccessSfx();
    }
    setPracticeFlipped(false);
    if (practiceIndex + 1 < currentList.length) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      // Completed round
      setPracticeIndex(0);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Tabel Huruf Kana"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 scrollbar-none"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-glow">
              あ
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-appText-bright flex items-center gap-2">
                <span>Tabel Huruf Kana</span>
                <span className="text-xs font-normal text-accent font-mono">五十音図</span>
              </h2>
              <p className="text-xs text-appText-muted">
                Fondasi utama bahasa Jepang untuk pemula mutlak (0 Pengetahuan).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (isPracticeMode ? setIsPracticeMode(false) : startPractice())}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isPracticeMode
                  ? 'bg-amber-500/20 text-accent border-accent/40 shadow-sm'
                  : 'bg-surface-2 text-appText-muted hover:text-appText-bright border-accent/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-hot" />
              <span>{isPracticeMode ? 'Tutup Kuis' : 'Latihan Hafalan'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Practice Mode Mini Drawer */}
        {isPracticeMode ? (
          <div className="bg-surface-2 border border-accent/30 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-appText-muted">
              <span>Kartu {practiceIndex + 1} dari {currentList.length}</span>
              <span className="font-bold text-accent">Skor: {practiceScore}</span>
            </div>

            <div
              onClick={() => {
                playFlipSfx();
                setPracticeFlipped(!practiceFlipped);
              }}
              className="cursor-pointer max-w-sm mx-auto h-48 rounded-3xl bg-surface border-2 border-accent/40 hover:border-accent flex flex-col items-center justify-center p-6 transition-all hover:scale-[1.02] shadow-glow"
            >
              <div className="text-6xl font-jp font-bold text-appText-bright mb-2">
                {scriptType === 'hiragana'
                  ? currentList[practiceIndex].hiragana
                  : currentList[practiceIndex].katakana}
              </div>
              <div className="text-xs text-appText-muted">
                {practiceFlipped ? (
                  <div className="space-y-1">
                    <span className="text-xl font-bold font-mono text-accent-hot">
                      /{currentList[practiceIndex].romaji}/
                    </span>
                    {currentList[practiceIndex].example && (
                      <div className="text-xs text-appText-bright font-jp">
                        {currentList[practiceIndex].example?.jp} ({currentList[practiceIndex].example?.meaning})
                      </div>
                    )}
                  </div>
                ) : (
                  'Ketuk untuk melihat cara baca'
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleNextPractice(false)}
                className="px-5 py-2.5 rounded-xl bg-surface-3 hover:bg-red-950/40 text-red-300 border border-red-500/30 text-xs font-bold transition-all"
              >
                Belum Hapal ❌
              </button>
              <button
                onClick={() => {
                  const char =
                    scriptType === 'hiragana'
                      ? currentList[practiceIndex].hiragana
                      : currentList[practiceIndex].katakana;
                  speakJapanese(char, 0.8);
                }}
                className="p-2.5 rounded-xl bg-surface border border-accent/20 text-accent hover:bg-amber-500/20 transition-all"
                title="Dengarkan Suara"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNextPractice(true)}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs transition-all shadow-glow"
              >
                Sudah Hapal ✅
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Controls: Script Type Switch + Sound Group Switch + Romaji Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-2/60 p-2.5 rounded-2xl border border-accent/15">
              {/* Hiragana vs Katakana Switch */}
              <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-accent/20">
                <button
                  onClick={() => setScriptType('hiragana')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scriptType === 'hiragana'
                      ? 'bg-accent text-bg shadow-sm'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Hiragana (ひらがな)
                </button>
                <button
                  onClick={() => setScriptType('katakana')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scriptType === 'katakana'
                      ? 'bg-accent text-bg shadow-sm'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  Katakana (カタカナ)
                </button>
              </div>

              {/* Sound Groups */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full pb-0.5">
                {[
                  { id: 'gojuon', shortLabel: 'Dasar (46)', fullLabel: 'Dasar (46)' },
                  { id: 'dakuon', shortLabel: 'Tebal (が)', fullLabel: 'Tebal (が/ざ/だ/ば/ぱ)' },
                  { id: 'yoon', shortLabel: 'Kombinasi (きゃ)', fullLabel: 'Kombinasi (きゃ/しゃ)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setGroupTab(tab.id as any)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                      groupTab === tab.id
                        ? 'bg-amber-500/20 text-accent-hot border border-amber-500/35 font-bold'
                        : 'text-appText-muted hover:text-appText-bright'
                    }`}
                  >
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </button>
                ))}
              </div>

              {/* Romaji Visibility Toggle */}
              <button
                onClick={() => setShowRomaji(!showRomaji)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  showRomaji
                    ? 'bg-surface border-accent/30 text-accent'
                    : 'bg-surface/50 border-accent/15 text-appText-muted'
                }`}
              >
                Romaji: {showRomaji ? 'Aktif' : 'Mati'}
              </button>
            </div>

            {/* Kana Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-2.5">
              {currentList.map((item) => {
                const char = scriptType === 'hiragana' ? item.hiragana : item.katakana;
                const isSelected = activeKana?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTileClick(item)}
                    className={`group relative rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center transition-all duration-150 border active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500/25 border-accent text-accent-hot shadow-glow'
                        : 'bg-surface-2 hover:bg-surface-3 border-accent/20 hover:border-accent/40 text-appText-bright'
                    }`}
                    title={`Klik untuk mendengar: ${item.romaji}`}
                  >
                    <span className="text-2xl sm:text-3xl font-jp font-bold group-hover:scale-110 transition-transform">
                      {char}
                    </span>
                    {showRomaji && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-appText-muted group-hover:text-amber-300 mt-1">
                        {item.romaji}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tile Preview Drawer */}
            {activeKana && (
              <div className="bg-surface-2/90 border border-accent/25 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-jp font-bold text-accent-hot bg-surface px-4 py-2 rounded-2xl border border-accent/30">
                    {scriptType === 'hiragana' ? activeKana.hiragana : activeKana.katakana}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-appText-bright flex items-center gap-2">
                      <span>Romaji: /{activeKana.romaji}/</span>
                      <button
                        onClick={() =>
                          speakJapanese(
                            scriptType === 'hiragana' ? activeKana.hiragana : activeKana.katakana,
                            0.8
                          )
                        }
                        className="p-1 rounded-lg bg-surface hover:bg-amber-500/20 text-accent transition-colors"
                        title="Putar ulang pelafalan"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    {activeKana.example ? (
                      <div className="text-xs text-appText-muted mt-0.5">
                        Contoh kata: <span className="font-jp text-amber-300 font-semibold">{activeKana.example.jp}</span> ({activeKana.example.reading}) = {activeKana.example.meaning}
                      </div>
                    ) : (
                      <div className="text-xs text-appText-muted mt-0.5">
                        Pelafalan fonetik bahasa Jepang baku
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-appText-muted/80 flex items-center gap-1.5 self-end sm:self-center">
                  <span>💡 Ketuk huruf apa saja untuk mendengar suara asli</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
