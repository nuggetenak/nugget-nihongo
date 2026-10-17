// ══════════════════════════════════════════════════════════════════
//  HVPTPlayer.tsx — High Variability Phonetic Training (HVPT) Player
//  Research Basis: Logan et al. (1991), Bradlow et al. (1997), Hirata (2004)
//  4-Speaker Acoustic Contrast, Pitch Accent Mora Steps & Sokuon Gating
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Volume2, Play, Users, CheckCircle2, RotateCcw, Activity } from 'lucide-react';
import { HVPTPairItem, PitchAccentType } from '../../types/hvpt';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx } from '../../lib/audio/sfx';

export type SpeakerKey = 'speaker_m1' | 'speaker_m2' | 'speaker_f1' | 'speaker_f2';

export interface HVPTPlayerProps {
  pair: HVPTPairItem;
  onSelectWord?: (selected: 'A' | 'B') => void;
  onComplete?: (isCorrect: boolean) => void;
  className?: string;
}

const SPEAKERS: Array<{ key: SpeakerKey; label: string; gender: 'M' | 'F'; age: string; icon: string }> = [
  { key: 'speaker_m1', label: 'Penutur M1', gender: 'M', age: 'Pria Muda', icon: '👨' },
  { key: 'speaker_f1', label: 'Penutur F1', gender: 'F', age: 'Wanita Muda', icon: '👩' },
  { key: 'speaker_m2', label: 'Penutur M2', gender: 'M', age: 'Pria Senior', icon: '👴' },
  { key: 'speaker_f2', label: 'Penutur F2', gender: 'F', age: 'Wanita Senior', icon: '👵' },
];

export const HVPTPlayer: React.FC<HVPTPlayerProps> = ({
  pair,
  onSelectWord,
  onComplete,
  className = '',
}) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerKey>('speaker_m1');
  const [activePlayback, setActivePlayback] = useState<'A' | 'B' | null>(null);
  const [userSelection, setUserSelection] = useState<'A' | 'B' | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const playWordAudio = (target: 'A' | 'B') => {
    setActivePlayback(target);
    const word = target === 'A' ? pair.word_a : pair.word_b;

    // Look for speaker token matching selectedSpeaker
    const token = word.audio_tokens?.find((t) => t.speaker_id === selectedSpeaker);
    if (token && token.audio_url && !token.audio_url.startsWith('/audio/stub')) {
      const audio = new Audio(token.audio_url);
      audio.play().catch(() => {
        // Fallback to TTS if audio track not found on disk
        speakJapanese(word.kana || word.kanji);
      });
      audio.onended = () => setActivePlayback(null);
    } else {
      speakJapanese(word.kana || word.kanji);
      setTimeout(() => setActivePlayback(null), 900);
    }
  };

  const handleChoose = (choice: 'A' | 'B') => {
    if (userSelection) return;
    setUserSelection(choice);
    setIsRevealed(true);

    if (onSelectWord) {
      onSelectWord(choice);
    }

    // Default target word is Word A
    const isCorrect = choice === 'A';
    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
    }

    if (onComplete) {
      onComplete(isCorrect);
    }
  };

  const handleReset = () => {
    setUserSelection(null);
    setIsRevealed(false);
    setActivePlayback(null);
  };

  const renderPitchContour = (pitchPattern: ('H' | 'L')[], accentType: PitchAccentType) => {
    return (
      <div className="flex items-center gap-1.5 py-1">
        {pitchPattern.map((p, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold transition-all shadow-xs ${
                p === 'H'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/35 transform -translate-y-1'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/35'
              }`}
            >
              {p}
            </span>
            <span className="text-[9px] text-appText-muted mt-0.5">M{idx + 1}</span>
          </div>
        ))}
        <span className="text-[10px] font-semibold text-accent/80 uppercase ml-1 px-1.5 py-0.5 rounded bg-surface-3 border border-accent/10">
          {accentType}
        </span>
      </div>
    );
  };

  return (
    <div className={`w-full max-w-full bg-surface border border-accent/25 rounded-3xl p-4 sm:p-6 space-y-5 overflow-x-hidden ${className}`}>
      {/* Header & Contrast Domain Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-accent/15">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-accent flex items-center justify-center shrink-0 border border-amber-500/30">
            <Activity className="w-4 h-4 text-accent-hot" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-appText-bright">
              Latihan Akustik HVPT & Kontur Pitch Accent
            </h3>
            <p className="text-[10px] text-appText-muted">
              Variabilitas 4 penutur asli untuk pembentukan kategori fonemik kokoh
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-surface-2 text-accent border border-accent/20 uppercase tracking-wider">
          {pair.phonological_contrast_domain.replace(/_/g, ' ')}
        </span>
      </div>

      {/* 4-Speaker Selector Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-appText-muted">
          <Users className="w-3.5 h-3.5 text-accent" />
          <span>Pilih Penutur Asli (4 Multi-Speaker HVPT):</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SPEAKERS.map((s) => {
            const isSelected = selectedSpeaker === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSelectedSpeaker(s.key)}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-accent font-bold shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-muted'
                }`}
              >
                <span className="text-lg leading-none">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs truncate font-bold">{s.label}</div>
                  <div className="text-[9.5px] opacity-75 truncate">{s.age}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Acoustic Discrimination Arena */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* Card A */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
            userSelection === 'A'
              ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
              : 'bg-surface-2/70 border-accent/15'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Pilihan Kata A</span>
              <button
                onClick={() => playWordAudio('A')}
                className="min-h-[40px] min-w-[40px] px-2.5 py-1 rounded-xl bg-surface-3 hover:bg-surface border border-accent/25 text-appText-bright flex items-center gap-1.5 text-xs font-semibold active:scale-95 cursor-pointer"
                title="Dengarkan pengucapan Kata A"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activePlayback === 'A' ? 'text-accent-hot animate-pulse' : 'text-accent'}`} />
                <span>Putar</span>
              </button>
            </div>

            <div className="text-2xl font-bold font-jp text-appText-bright">
              {pair.word_a.kanji || pair.word_a.kana}
            </div>
            <div className="text-xs text-accent font-jp">{pair.word_a.kana}</div>
            <div className="text-xs text-appText-muted">{pair.word_a.meaning_id}</div>
          </div>

          {/* Pitch Accent Step Graph */}
          {isRevealed && (
            <div className="p-2.5 rounded-xl bg-surface-3/60 border border-accent/15 space-y-1 animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-appText-muted block">Kontur Pitch Accent:</span>
              {renderPitchContour(pair.word_a.pitch_pattern, pair.word_a.accent_type)}
            </div>
          )}

          <button
            disabled={userSelection !== null}
            onClick={() => handleChoose('A')}
            className={`w-full min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              userSelection === 'A'
                ? 'bg-emerald-500 text-bg shadow-glow'
                : 'bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright border border-accent/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Pilih Kata Ini</span>
          </button>
        </div>

        {/* Card B */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
            userSelection === 'B'
              ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
              : 'bg-surface-2/70 border-accent/15'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Pilihan Kata B</span>
              <button
                onClick={() => playWordAudio('B')}
                className="min-h-[40px] min-w-[40px] px-2.5 py-1 rounded-xl bg-surface-3 hover:bg-surface border border-accent/25 text-appText-bright flex items-center gap-1.5 text-xs font-semibold active:scale-95 cursor-pointer"
                title="Dengarkan pengucapan Kata B"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activePlayback === 'B' ? 'text-accent-hot animate-pulse' : 'text-accent'}`} />
                <span>Putar</span>
              </button>
            </div>

            <div className="text-2xl font-bold font-jp text-appText-bright">
              {pair.word_b.kanji || pair.word_b.kana}
            </div>
            <div className="text-xs text-accent font-jp">{pair.word_b.kana}</div>
            <div className="text-xs text-appText-muted">{pair.word_b.meaning_id}</div>
          </div>

          {/* Pitch Accent Step Graph */}
          {isRevealed && (
            <div className="p-2.5 rounded-xl bg-surface-3/60 border border-accent/15 space-y-1 animate-in fade-in duration-200">
              <span className="text-[10px] font-bold text-appText-muted block">Kontur Pitch Accent:</span>
              {renderPitchContour(pair.word_b.pitch_pattern, pair.word_b.accent_type)}
            </div>
          )}

          <button
            disabled={userSelection !== null}
            onClick={() => handleChoose('B')}
            className={`w-full min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              userSelection === 'B'
                ? 'bg-emerald-500 text-bg shadow-glow'
                : 'bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright border border-accent/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Pilih Kata Ini</span>
          </button>
        </div>
      </div>

      {/* Feedback Bar & Reset */}
      {isRevealed && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs text-appText-bright">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Perbedaan akustik terletak pada pola mora dan register tinggi/rendah (F0).
            </span>
          </div>

          <button
            onClick={handleReset}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-bright flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Latihan</span>
          </button>
        </div>
      )}
    </div>
  );
};
