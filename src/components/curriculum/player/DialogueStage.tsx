// ══════════════════════════════════════════════════════════════════
//  DialogueStage.tsx — Tahap 1: Dialog Situasional & Percakapan Otentik
//  Menyajikan percakapan penutur asli dengan audio Web Speech API
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Volume2, Eye, EyeOff, Gauge } from 'lucide-react';
import { LessonDialogueLine } from '../../../types/curriculum';
import { speakJapanese } from '../../../lib/audio/speechEngine';

interface DialogueStageProps {
  dialogue?: LessonDialogueLine[];
  onCompleteStage?: () => void;
}

export const DialogueStage: React.FC<DialogueStageProps> = ({ dialogue = [] }) => {
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);

  const handlePlayAudio = async (line: LessonDialogueLine) => {
    setPlayingLineId(line.id);
    const textToSpeak = line.jp || line.furigana || '';
    await speakJapanese(textToSpeak, speechRate, () => {
      setPlayingLineId(null);
    });
  };

  const toggleRate = () => {
    setSpeechRate((prev) => (prev === 1.0 ? 0.8 : 1.0));
  };

  if (!dialogue || dialogue.length === 0) {
    return (
      <div className="py-12 text-center text-appText-muted">
        Tidak ada dialog khusus untuk pelajaran ini. Silakan lanjut ke bedah materi.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Toolbar Kontrol Dialog ───────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-surface-2 border border-accent/15 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleRate}
            className={`min-h-[36px] px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
              speechRate === 0.8
                ? 'bg-amber-500 text-bg border-amber-500 shadow-sm'
                : 'bg-surface border-accent/20 text-appText-muted hover:text-appText-bright'
            }`}
            title="Ubah kecepatan suara"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{speechRate === 0.8 ? 'Kecepatan: 0.8x (Lambat)' : 'Kecepatan: 1.0x (Normal)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowFurigana(!showFurigana)}
            className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-surface border border-accent/20 text-appText-muted hover:text-appText-bright flex items-center gap-1.5 active:scale-95"
          >
            {showFurigana ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Furigana</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranslation(!showTranslation)}
            className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-surface border border-accent/20 text-appText-muted hover:text-appText-bright flex items-center gap-1.5 active:scale-95"
          >
            {showTranslation ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Arti ID</span>
          </button>
        </div>
      </div>

      {/* ── Chat Stream Percakapan ──────────────────────────────── */}
      <div className="space-y-3.5 pt-1">
        {dialogue.map((line, idx) => {
          const isPlaying = playingLineId === line.id;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={line.id || idx}
              className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                isPlaying
                  ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                  : 'bg-surface border-accent/15 hover:border-accent/30'
              }`}
            >
              {/* Avatar Penutur */}
              <div className="w-10 h-10 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-center text-xl shrink-0 select-none shadow-sm">
                {line.avatar || (isEven ? '🧑‍💼' : '🙋‍♂️')}
              </div>

              {/* Isi Dialog */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-appText-bright">{line.speaker}</span>
                    {line.speakerRole && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-surface-2 border border-accent/15 text-appText-muted font-medium">
                        {line.speakerRole}
                      </span>
                    )}
                  </div>

                  {/* Tombol Audio */}
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(line)}
                    className={`min-h-[36px] min-w-[36px] p-2 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
                      isPlaying
                        ? 'bg-accent text-bg border-accent shadow-md animate-pulse'
                        : 'bg-surface-2 border-accent/20 text-accent hover:bg-surface-3'
                    }`}
                    title="Dengarkan pelafalan"
                    aria-label={`Dengarkan kalimat dari ${line.speaker}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Teks Bahasa Jepang */}
                <div className="text-base sm:text-lg font-jp font-semibold text-appText-bright leading-relaxed break-words">
                  {showFurigana && line.furigana ? line.furigana : line.jp}
                </div>

                {/* Romaji */}
                {line.romaji && (
                  <div className="text-xs text-appText-muted font-mono">
                    {line.romaji}
                  </div>
                )}

                {/* Terjemahan Bahasa Indonesia */}
                {showTranslation && (
                  <div className="text-xs sm:text-sm text-appText pt-1 border-t border-accent/10 leading-relaxed">
                    {line.idText}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
