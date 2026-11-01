import React from 'react';
import {
  Volume2,
  VolumeX,
  Type,
  Sparkles,
} from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx } from '../../lib/audio/sfx';

interface AudioSettingsTabProps {
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  showFurigana: boolean;
  setShowFurigana: (show: boolean) => void;
  showRomaji: boolean;
  setShowRomaji: (show: boolean) => void;
  textSize: 'small' | 'normal' | 'large';
  handleTextSizeChange: (size: 'small' | 'normal' | 'large') => void;
  showToast: (msg: string, icon?: string) => void;
}

export const AudioSettingsTab: React.FC<AudioSettingsTabProps> = ({
  soundEffects,
  setSoundEffects,
  speechRate,
  setSpeechRate,
  showFurigana,
  setShowFurigana,
  showRomaji,
  setShowRomaji,
  textSize,
  handleTextSizeChange,
  showToast,
}) => {
  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Audio & Audio Speed Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-accent" />
            Pengaturan Audio & Suara
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Sesuaikan kecepatan pelafalan audio bahasa Jepang (TTS) dan efek suara gamifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sound Effects Toggle */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-appText-bright block">
                Efek Suara Gamifikasi (SFX)
              </span>
              <span className="text-[11px] text-appText-muted block">
                Suara umpan balik kuis, naik level, dan kombo.
              </span>
            </div>
            <button
              onClick={() => {
                const next = !soundEffects;
                setSoundEffects(next);
                if (next) playSuccessSfx();
                showToast(next ? 'Efek suara aktif' : 'Efek suara dinonaktifkan', next ? '🔊' : '🔇');
              }}
              className={`p-2.5 min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition-all ${
                soundEffects
                  ? 'bg-accent text-bg border-accent shadow-xs'
                  : 'bg-surface-3 text-appText-muted border-accent/20 hover:text-appText-bright'
              }`}
              aria-label={soundEffects ? 'Nonaktifkan efek suara' : 'Aktifkan efek suara'}
            >
              {soundEffects ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          {/* Speech Rate Selection */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-appText-bright block">
                Kecepatan Audio Pelafalan
              </span>
              <span className="text-xs font-mono font-bold text-accent">
                {speechRate.toFixed(2)}x
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { rate: 0.75, label: '0.75x (Lambat)' },
                { rate: 0.85, label: '0.85x (Santai)' },
                { rate: 1.0, label: '1.0x (Normal)' },
                { rate: 1.15, label: '1.15x (Cepat)' },
              ].map((item) => {
                const isSelected = Math.abs(speechRate - item.rate) < 0.05;
                return (
                  <button
                    key={item.rate}
                    onClick={() => {
                      setSpeechRate(item.rate);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('nn_speech_rate', String(item.rate));
                      }
                      showToast(`Kecepatan audio diatur ke ${item.rate}x`, '🎙️');
                    }}
                    className={`py-2 px-1 rounded-lg text-xs font-mono font-bold border transition-all text-center truncate ${
                      isSelected
                        ? 'bg-accent text-bg border-accent shadow-xs font-extrabold'
                        : 'bg-surface-3 text-appText-muted border-accent/15 hover:text-appText-bright hover:bg-surface-2'
                    }`}
                  >
                    {item.rate}x
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Audio Test Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              speakJapanese('こんにちは、一緒に日本語を勉強しましょう！', speechRate);
              showToast('Memutar audio contoh: "Konnichiwa, issho ni nihongo o benkyou shimashou!"', '🔊');
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-xs font-bold text-appText-bright transition-all active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-accent" />
            Tes Uji Audio Pelafalan Bahasa Jepang
          </button>
        </div>
      </div>

      {/* Japanese Typography & Furigana Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Type className="w-5 h-5 text-accent" />
            Tipografi & Bantuan Baca (Furigana / Romaji)
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Sesuaikan ukuran teks dan anotasi bantuan baca huruf kanji di seluruh materi pembelajaran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Furigana Toggle */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-appText-bright block">
                Tampilkan Furigana (ふりがな)
              </span>
              <span className="text-[11px] text-appText-muted block">
                Anotasi kana di atas karakter kanji.
              </span>
            </div>
            <button
              onClick={() => {
                const next = !showFurigana;
                setShowFurigana(next);
                showToast(next ? 'Furigana diaktifkan' : 'Furigana disembunyikan', '文');
              }}
              className={`w-full py-2 rounded-lg text-xs font-bold border transition-all ${
                showFurigana
                  ? 'bg-accent text-bg border-accent shadow-xs'
                  : 'bg-surface-3 text-appText-muted border-accent/20 hover:text-appText-bright'
              }`}
            >
              {showFurigana ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* Romaji Toggle */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-appText-bright block">
                Tampilkan Romaji (Rōmaji)
              </span>
              <span className="text-[11px] text-appText-muted block">
                Transliterasi alfabet latin untuk pemula.
              </span>
            </div>
            <button
              onClick={() => {
                const next = !showRomaji;
                setShowRomaji(next);
                showToast(next ? 'Romaji diaktifkan' : 'Romaji disembunyikan', '🔤');
              }}
              className={`w-full py-2 rounded-lg text-xs font-bold border transition-all ${
                showRomaji
                  ? 'bg-accent text-bg border-accent shadow-xs'
                  : 'bg-surface-3 text-appText-muted border-accent/20 hover:text-appText-bright'
              }`}
            >
              {showRomaji ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>

          {/* Text Size (Non-Destructive rem Scaling) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-between space-y-2">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-appText-bright block">
                Skala Ukuran Teks (rem)
              </span>
              <span className="text-[11px] text-appText-muted block">
                Skala relatif tanpa merusak aksesibilitas sistem.
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'small' as const, label: 'Kecil' },
                { id: 'normal' as const, label: 'Normal' },
                { id: 'large' as const, label: 'Besar' },
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => handleTextSizeChange(sz.id)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all text-center ${
                    textSize === sz.id
                      ? 'bg-accent text-bg border-accent shadow-xs font-extrabold'
                      : 'bg-surface-3 text-appText-muted border-accent/15 hover:text-appText-bright'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Japanese Typography Preview Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/40 border border-accent/15 space-y-2">
          <div className="flex items-center justify-between border-b border-accent/10 pb-2">
            <span className="text-[11px] font-semibold text-appText-muted uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Pratinjau Tipografi Autentik
            </span>
            <span className="text-[10px] font-mono text-accent">
              {textSize.toUpperCase()} · {showFurigana ? 'FURIGANA' : 'NO-FURIGANA'}
            </span>
          </div>
          <div className="py-3 text-center">
            <div className="text-xl sm:text-2xl font-japanese font-bold text-appText-bright leading-relaxed">
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  日<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">に</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '日'}
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  本<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">ほん</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '本'}
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  語<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">ご</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '語'}
              の
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  勉<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">べん</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '勉'}
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  強<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">きょう</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '強'}
              を
              {showFurigana ? (
                <ruby lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
                  始<rp className="text-[0em] opacity-0">(</rp><rt className="text-[0.65em] text-accent/80 font-normal select-none">はじ</rt><rp className="text-[0em] opacity-0">)</rp>
                </ruby>
              ) : '始'}
              めましょう！
            </div>
            {showRomaji && (
              <div className="text-xs sm:text-sm font-mono text-accent-hot font-medium mt-1">
                nihongo no benkyou o hajimemashou!
              </div>
            )}
            <div className="text-xs text-appText-muted mt-1">
              "Ayo kita mulai belajar bahasa Jepang!"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
