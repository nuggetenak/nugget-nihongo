// ══════════════════════════════════════════════════════════════════
//  HVPTPlayer.tsx — High Variability Phonetic Training (HVPT) Player
//  Research Basis: Logan et al. (1991), Bradlow et al. (1997), Hirata (2004)
//  4-Speaker Acoustic Contrast, Pitch Accent Mora Steps & Sokuon Gating
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Users, CheckCircle2, XCircle, RotateCcw, Activity, Headphones, Timer } from 'lucide-react';
import { HVPTPairItem, PitchAccentType, HVPTQuizResult } from '../../types/hvpt.ts';
import { HVPT_SPEAKERS, playHVPTSpeaker } from '../../lib/audio/hvptManager.ts';
import { playSuccessSfx, playErrorSfx } from '../../lib/audio/sfx.ts';

export type SpeakerKey = 'speaker_m1' | 'speaker_m2' | 'speaker_f1' | 'speaker_f2';

export interface HVPTPlayerProps {
  pair: HVPTPairItem;
  targetWord?: 'A' | 'B';
  onSelectWord?: (selected: 'A' | 'B') => void;
  onComplete?: (result: HVPTQuizResult) => void;
  className?: string;
}

export const HVPTPlayer: React.FC<HVPTPlayerProps> = ({
  pair,
  targetWord: targetWordProp,
  onSelectWord,
  onComplete,
  className = '',
}) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerKey>('speaker_m1');
  const [activePlayback, setActivePlayback] = useState<'stimulus' | 'A' | 'B' | null>(null);
  const [userSelection, setUserSelection] = useState<'A' | 'B' | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [stimulusPlayed, setStimulusPlayed] = useState(false);
  const [playbackStartTime, setPlaybackStartTime] = useState<number | null>(null);
  const [reactionTimeMs, setReactionTimeMs] = useState<number>(0);

  const effectiveTarget: 'A' | 'B' = targetWordProp || pair.target_word || 'A';
  const targetWordData = effectiveTarget === 'A' ? pair.word_a : pair.word_b;

  // Reset internal state when pair changes
  useEffect(() => {
    setUserSelection(null);
    setIsRevealed(false);
    setActivePlayback(null);
    setStimulusPlayed(false);
    setPlaybackStartTime(null);
    setReactionTimeMs(0);
  }, [pair.pair_id]);

  const playStimulusAudio = async () => {
    setActivePlayback('stimulus');
    setStimulusPlayed(true);
    setPlaybackStartTime(Date.now());

    // Check if token with real audio exists
    const token = targetWordData.audio_tokens?.find((t) => t.speaker_id === selectedSpeaker);
    if (token && token.audio_url && !token.audio_url.startsWith('/audio/stub') && !token.audio_url.startsWith('/audio/hvpt')) {
      try {
        const audio = new Audio(token.audio_url);
        audio.onended = () => setActivePlayback(null);
        await audio.play();
        return;
      } catch {
        // Fall back to synthetic speaker synthesis
      }
    }

    try {
      await playHVPTSpeaker(targetWordData.kana || targetWordData.kanji, selectedSpeaker);
    } finally {
      setTimeout(() => setActivePlayback(null), 850);
    }
  };

  const playWordAudio = async (target: 'A' | 'B') => {
    setActivePlayback(target);
    const word = target === 'A' ? pair.word_a : pair.word_b;

    const token = word.audio_tokens?.find((t) => t.speaker_id === selectedSpeaker);
    if (token && token.audio_url && !token.audio_url.startsWith('/audio/stub') && !token.audio_url.startsWith('/audio/hvpt')) {
      try {
        const audio = new Audio(token.audio_url);
        audio.onended = () => setActivePlayback(null);
        await audio.play();
        return;
      } catch {
        // Fall back to synthetic speaker synthesis
      }
    }

    try {
      await playHVPTSpeaker(word.kana || word.kanji, selectedSpeaker);
    } finally {
      setTimeout(() => setActivePlayback(null), 850);
    }
  };

  const handleChoose = (choice: 'A' | 'B') => {
    if (userSelection) return;
    setUserSelection(choice);
    setIsRevealed(true);

    const now = Date.now();
    const rt = playbackStartTime ? Math.max(100, now - playbackStartTime) : 1200;
    setReactionTimeMs(rt);

    if (onSelectWord) {
      onSelectWord(choice);
    }

    const isCorrect = choice === effectiveTarget;
    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
    }

    if (onComplete) {
      onComplete({
        pair_id: pair.pair_id,
        selected: choice,
        target: effectiveTarget,
        is_correct: isCorrect,
        reaction_time_ms: rt,
        speaker_id: selectedSpeaker,
        domain: pair.phonological_contrast_domain,
      });
    }
  };

  const handleReset = () => {
    setUserSelection(null);
    setIsRevealed(false);
    setActivePlayback(null);
    setStimulusPlayed(false);
    setPlaybackStartTime(null);
    setReactionTimeMs(0);
  };

  const renderPitchContour = (pitchPattern: ('H' | 'L')[], accentType: PitchAccentType) => {
    return (
      <div className="flex items-center gap-1.5 py-1 flex-wrap">
        {pitchPattern.map((p, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold transition-all shadow-xs ${
                p === 'H'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/35 transform -translate-y-1'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/35'
              }`}
            >
              {p}
            </span>
            <span className="text-[10px] text-appText-muted mt-0.5">M{idx + 1}</span>
          </div>
        ))}
        <span className="text-xs font-semibold text-accent/80 uppercase ml-1 px-1.5 py-0.5 rounded bg-surface-3 border border-accent/10">
          {accentType}
        </span>
      </div>
    );
  };

  const isChoiceCorrect = userSelection === effectiveTarget;

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
              Latihan Akustik HVPT (High Variability Phonetic Training)
            </h3>
            <p className="text-xs text-appText-muted">
              Variabilitas 4 penutur asli untuk diskriminasi fonemik & kontras bunyi kritis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pair.closure_ratio && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Oklusi: {pair.closure_ratio}ms
            </span>
          )}
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-surface-2 text-accent border border-accent/20 uppercase tracking-wider">
            {pair.phonological_contrast_domain.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* 4-Speaker Selector Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-appText-muted">
          <Users className="w-3.5 h-3.5 text-accent" />
          <span>Pilih Penutur Asli (4 Multi-Speaker HVPT):</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HVPT_SPEAKERS.map((s) => {
            const isSelected = selectedSpeaker === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setSelectedSpeaker(s.key as SpeakerKey)}
                className={`min-h-[44px] p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-accent font-bold shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-muted'
                }`}
                aria-label={`Pilih ${s.label}`}
              >
                <span className="text-lg leading-none">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs truncate font-bold">{s.label}</div>
                  <div className="text-[9.5px] opacity-75 truncate">{s.age_label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Stimulus Audio Gate */}
      <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-appText-bright">
              Soal Audio Pendengaran (Stimulus Asli)
            </div>
            <div className="text-xs text-appText-muted">
              Dengarkan audio penutur terpilih, tebak kata mana yang diucapkan!
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={playStimulusAudio}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0 ${
            activePlayback === 'stimulus'
              ? 'bg-accent-hot text-bg font-extrabold shadow-md animate-pulse'
              : stimulusPlayed
              ? 'bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright border border-accent/30'
              : 'bg-accent text-bg shadow-sm font-extrabold'
          }`}
          aria-label="Putar audio soal stimulus"
        >
          <Volume2 className="w-4 h-4" />
          <span>{stimulusPlayed ? 'Putar Ulang Soal' : 'Dengarkan Audio Soal'}</span>
        </button>
      </div>

      {/* Acoustic Discrimination Arena */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* Card A */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
            userSelection === 'A'
              ? isChoiceCorrect
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                : 'bg-rose-500/10 border-rose-500/40 shadow-sm'
              : isRevealed && effectiveTarget === 'A'
              ? 'border-emerald-500/50 bg-emerald-500/5'
              : 'bg-surface-2/70 border-accent/15'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Pilihan Kata A</span>
              <button
                type="button"
                onClick={() => playWordAudio('A')}
                className="min-h-[40px] min-w-[40px] px-2.5 py-1 rounded-xl bg-surface-3 hover:bg-surface border border-accent/25 text-appText-bright flex items-center gap-1.5 text-xs font-semibold active:scale-95 cursor-pointer"
                title="Dengarkan pengucapan Kata A"
                aria-label="Dengarkan Kata A"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activePlayback === 'A' ? 'text-accent-hot animate-pulse' : 'text-accent'}`} />
                <span>Cek Suara</span>
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
              <span className="text-xs font-bold text-appText-muted block">Kontur Nada / Pola Mora:</span>
              {renderPitchContour(pair.word_a.pitch_pattern, pair.word_a.accent_type)}
            </div>
          )}

          <button
            type="button"
            disabled={userSelection !== null}
            onClick={() => handleChoose('A')}
            className={`w-full min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              userSelection === 'A'
                ? isChoiceCorrect
                  ? 'bg-emerald-500 text-bg shadow-glow'
                  : 'bg-rose-500 text-bg'
                : 'bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright border border-accent/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Pilih Kata Ini (A)</span>
          </button>
        </div>

        {/* Card B */}
        <div
          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
            userSelection === 'B'
              ? isChoiceCorrect
                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-sm'
                : 'bg-rose-500/10 border-rose-500/40 shadow-sm'
              : isRevealed && effectiveTarget === 'B'
              ? 'border-emerald-500/50 bg-emerald-500/5'
              : 'bg-surface-2/70 border-accent/15'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Pilihan Kata B</span>
              <button
                type="button"
                onClick={() => playWordAudio('B')}
                className="min-h-[40px] min-w-[40px] px-2.5 py-1 rounded-xl bg-surface-3 hover:bg-surface border border-accent/25 text-appText-bright flex items-center gap-1.5 text-xs font-semibold active:scale-95 cursor-pointer"
                title="Dengarkan pengucapan Kata B"
                aria-label="Dengarkan Kata B"
              >
                <Volume2 className={`w-3.5 h-3.5 ${activePlayback === 'B' ? 'text-accent-hot animate-pulse' : 'text-accent'}`} />
                <span>Cek Suara</span>
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
              <span className="text-xs font-bold text-appText-muted block">Kontur Nada / Pola Mora:</span>
              {renderPitchContour(pair.word_b.pitch_pattern, pair.word_b.accent_type)}
            </div>
          )}

          <button
            type="button"
            disabled={userSelection !== null}
            onClick={() => handleChoose('B')}
            className={`w-full min-h-[44px] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              userSelection === 'B'
                ? isChoiceCorrect
                  ? 'bg-emerald-500 text-bg shadow-glow'
                  : 'bg-rose-500 text-bg'
                : 'bg-surface-3 hover:bg-accent hover:text-bg text-appText-bright border border-accent/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Pilih Kata Ini (B)</span>
          </button>
        </div>
      </div>

      {/* Feedback Bar & Explanation */}
      {isRevealed && (
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 animate-in fade-in duration-200 ${
            isChoiceCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-appText-bright">
              {isChoiceCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pendengaran Tajam! Jawaban Kamu Benar ({effectiveTarget}).</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Kurang Tepat. Kata yang diucapkan adalah {effectiveTarget} ({targetWordData.kanji || targetWordData.kana}).</span>
                </>
              )}
            </div>
            {pair.explanation && (
              <p className="text-xs text-appText-muted leading-relaxed">
                {pair.explanation}
              </p>
            )}
            {reactionTimeMs > 0 && (
              <div className="flex items-center gap-1.5 text-[11px] text-appText-muted">
                <Timer className="w-3 h-3 text-accent" />
                <span>Waktu Respons: {reactionTimeMs}ms</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-bright flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Latihan</span>
          </button>
        </div>
      )}
    </div>
  );
};
