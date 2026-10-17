// ══════════════════════════════════════════════════════════════════
//  DialogueStage.tsx — Tahap 1: Dialog Otentik
//  Menyajikan percakapan alami, bimodal audio sync, & kontrol intonasi
// ══════════════════════════════════════════════════════════════════

import React, { useState, useRef } from 'react';
import { Volume2, Eye, EyeOff, Gauge, Play, Square, Compass, Sparkles } from 'lucide-react';
import { LessonDialogueLine } from '../../../types/curriculum';
import { speakJapanese } from '../../../lib/audio/speechEngine';
import { resolveSpeakerPersona } from '../../../lib/audio/personaVoices';
import { RubyText } from '../../ui/RubyText';

interface DialogueStageProps {
  dialogue?: LessonDialogueLine[];
  sceneIntro?: string;
  onCompleteStage?: () => void;
}

export const DialogueStage: React.FC<DialogueStageProps> = ({ dialogue = [], sceneIntro }) => {
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const stopPlayingAllRef = useRef(false);

  const handlePlayAudio = async (line: LessonDialogueLine) => {
    setPlayingLineId(line.id);

    // Bimodal audio playback: try pre-rendered audio asset first if available
    if (line.audio_url) {
      try {
        const audio = new Audio(line.audio_url);
        audio.playbackRate = speechRate;
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error('Pre-rendered audio playback failed'));
          audio.play().catch(reject);
        });
        setPlayingLineId(null);
        return;
      } catch {
        // Fallback to Web Speech API on error or offline
      }
    }

    const persona = resolveSpeakerPersona(line.speaker);
    const textToSpeak = line.jp || line.furigana || '';
    await speakJapanese(textToSpeak, { rate: speechRate, gender: persona.gender }, () => {
      setPlayingLineId(null);
    });
  };

  const toggleRate = () => {
    setSpeechRate((prev) => (prev === 1.0 ? 0.8 : 1.0));
  };

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      stopPlayingAllRef.current = true;
      setIsPlayingAll(false);
      setPlayingLineId(null);
      return;
    }

    if (!dialogue || dialogue.length === 0) return;
    setIsPlayingAll(true);
    stopPlayingAllRef.current = false;

    for (let i = 0; i < dialogue.length; i++) {
      if (stopPlayingAllRef.current) break;
      const line = dialogue[i];
      setPlayingLineId(line.id);

      const persona = resolveSpeakerPersona(line.speaker);
      const textToSpeak = line.jp || line.furigana || '';
      await speakJapanese(textToSpeak, { rate: speechRate, gender: persona.gender });

      // Jeda alami antar penutur
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsPlayingAll(false);
    setPlayingLineId(null);
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
      {/* ── Pengantar Situasi Percakapan ─────────────────────────── */}
      {sceneIntro && (
        <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 flex items-start gap-3 shadow-sm">
          <div className="p-2 rounded-xl bg-amber-500/15 text-accent shrink-0 mt-0.5">
            <Compass className="w-4 h-4" />
          </div>
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
              Situasi Percakapan Nyata
            </span>
            <p className="text-xs text-appText leading-relaxed">
              {sceneIntro}
            </p>
          </div>
        </div>
      )}

      {/* ── Toolbar Kontrol Dialog ───────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-surface-2 border border-accent/15 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          {/* Tombol Putar Penuh */}
          <button
            type="button"
            onClick={handlePlayAll}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
              isPlayingAll
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-accent text-bg hover:brightness-110'
            }`}
            title="Dengarkan seluruh percakapan secara berurutan"
          >
            {isPlayingAll ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlayingAll ? 'Hentikan Audio' : 'Putar Seluruh Dialog'}</span>
          </button>

          {/* Pengatur Kecepatan */}
          <button
            type="button"
            onClick={toggleRate}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
              speechRate === 0.8
                ? 'bg-amber-500 text-bg border-amber-500 shadow-sm'
                : 'bg-surface border-accent/20 text-appText-muted hover:text-appText-bright'
            }`}
            title="Ubah kecepatan suara"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{speechRate === 0.8 ? '0.8x Lambat' : '1.0x Normal'}</span>
          </button>
        </div>

        {/* Sakelar Bantuan Teks */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowFurigana(!showFurigana)}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-surface border border-accent/20 text-appText-muted hover:text-appText-bright flex items-center gap-1.5 active:scale-95"
            title="Sembunyikan atau tampilkan furigana"
          >
            {showFurigana ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-bold">Furigana</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranslation(!showTranslation)}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl bg-surface border border-accent/20 text-appText-muted hover:text-appText-bright flex items-center gap-1.5 active:scale-95"
            title="Sembunyikan atau tampilkan arti bahasa Indonesia"
          >
            {showTranslation ? <Eye className="w-3.5 h-3.5 text-accent" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-bold">Arti ID</span>
          </button>
        </div>
      </div>

      {/* ── Chat Stream Percakapan dengan Bimodal Audio Highlighting ── */}
      <div className="space-y-3.5 pt-1">
        {dialogue.map((line, idx) => {
          const isPlaying = playingLineId === line.id;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={line.id || idx}
              className={`flex items-start gap-3 p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                isPlaying
                  ? 'bg-amber-500/15 border-amber-500 shadow-md ring-2 ring-amber-500/40 translate-x-1'
                  : 'bg-surface border-accent/15 hover:border-accent/30'
              }`}
            >
              {/* Avatar Penutur */}
              <div className={`w-11 h-11 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-center text-2xl shrink-0 select-none shadow-sm transition-transform ${
                isPlaying ? 'scale-110 animate-pulse ring-2 ring-amber-400/50' : ''
              }`}>
                {line.avatar || resolveSpeakerPersona(line.speaker, line.speakerRole).avatar}
              </div>

              {/* Isi Dialog */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-appText-bright">{line.speaker}</span>
                    {line.speakerRole && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-2 border border-accent/15 text-appText-muted font-medium">
                        {line.speakerRole}
                      </span>
                    )}
                    {line.note && (
                      <span className="text-[10px] text-accent italic font-medium">
                        · {line.note}
                      </span>
                    )}
                  </div>

                  {/* Tombol Audio Per Baris */}
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(line)}
                    className={`min-h-[38px] min-w-[38px] p-2 rounded-xl border flex items-center justify-center transition-all active:scale-95 shrink-0 ${
                      isPlaying
                        ? 'bg-accent text-bg border-accent shadow-md animate-pulse'
                        : 'bg-surface-2 border-accent/20 text-accent hover:bg-surface-3'
                    }`}
                    title="Dengarkan pelafalan kalimat ini"
                    aria-label={`Dengarkan kalimat dari ${line.speaker}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Teks Bahasa Jepang */}
                <div className="text-base sm:text-lg font-jp font-semibold text-appText-bright leading-relaxed [word-break:keep-all] [overflow-wrap:anywhere]">
                  <RubyText text={line.jp} furigana={line.furigana} showFurigana={showFurigana} />
                </div>

                {/* Romaji */}
                {line.romaji && (
                  <div className="text-xs text-appText-muted font-mono">
                    {line.romaji}
                  </div>
                )}

                {/* Terjemahan Bahasa Indonesia */}
                {showTranslation && (
                  <div className="text-xs sm:text-sm text-appText pt-1.5 border-t border-accent/10 leading-relaxed">
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
