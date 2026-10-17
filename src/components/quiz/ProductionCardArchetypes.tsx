// ══════════════════════════════════════════════════════════════════
//  ProductionCardArchetypes.tsx — The 6 Production Card Archetypes
//  Research Basis: ADR-011, Skill Acquisition Theory (DeKeyser 2015),
//  Indonesian L1 Contrastive Analysis (Maarif 2021, Sutedi 2016, Pramesti 2019)
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, AlertTriangle, CheckCircle2, XCircle, Zap, Clock, ShieldAlert, ArrowRight, RefreshCw } from 'lucide-react';
import { MicroSessionCardItem } from '../../lib/session/microSessionEngine';
import { speakJapanese } from '../../lib/audio/tts';

interface ProductionCardArchetypeProps {
  card: MicroSessionCardItem;
  onSubmitAnswer: (isCorrect: boolean, latencyMs: number, trapEncountered?: string) => void;
  onNextCard?: () => void;
}

export const ProductionCardArchetypes: React.FC<ProductionCardArchetypeProps> = ({
  card,
  onSubmitAnswer,
  onNextCard,
}) => {
  const startTimeRef = useRef<number>(Date.now());
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [measuredLatency, setMeasuredLatency] = useState<number>(0);
  const [triggeredTrap, setTriggeredTrap] = useState<string | null>(null);

  // Type Cloze state
  const [typedInput, setTypedInput] = useState<string>('');

  // Collocation Chunk Builder state
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);

  // Speed Blast / Audio Gate countdown timer
  const [timeLeftMs, setTimeLeftMs] = useState<number>(
    card.archetype === 'speed_comprehension_blast' ? 1500 : card.archetype === 'audio_speed_gate' ? 2500 : 0
  );

  // Reset component on card change
  useEffect(() => {
    startTimeRef.current = Date.now();
    setHasSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setMeasuredLatency(0);
    setTriggeredTrap(null);
    setTypedInput('');
    setAssembledTokens([]);

    if (card.archetype === 'collocation_chunk_builder') {
      const tokens = card.options && card.options.length > 0 
        ? [...card.options] 
        : card.correctAnswer.split(' ').filter(Boolean);
      // Deterministic pseudo-shuffle
      setAvailableTokens([...tokens].sort(() => 0.5 - Math.random()));
    }

    if (card.archetype === 'speed_comprehension_blast') {
      setTimeLeftMs(1500);
    } else if (card.archetype === 'audio_speed_gate') {
      setTimeLeftMs(2500);
      if (card.audioUrl) {
        const audio = new Audio(card.audioUrl);
        audio.play().catch(() => speakJapanese(card.targetPattern));
      } else {
        speakJapanese(card.targetPattern);
      }
    }
  }, [card.id, card.archetype]);

  // Countdown timer for speed blast and audio gate
  useEffect(() => {
    if (hasSubmitted) return;
    if (card.archetype !== 'speed_comprehension_blast' && card.archetype !== 'audio_speed_gate') return;

    const interval = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (prev <= 50) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 50;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [hasSubmitted, card.archetype]);

  const handleTimeExpired = () => {
    if (hasSubmitted) return;
    const latency = Date.now() - startTimeRef.current;
    setMeasuredLatency(latency);
    setHasSubmitted(true);
    setIsCorrect(false);
    onSubmitAnswer(false, latency, 'Waktu habis sebelum produksi otomatis terjadi.');
  };

  const handleOptionSelect = (option: string) => {
    if (hasSubmitted) return;
    const latency = Date.now() - startTimeRef.current;
    setMeasuredLatency(latency);
    setSelectedOption(option);
    setHasSubmitted(true);

    const correct = option.trim().toLowerCase() === card.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);

    let trap: string | undefined = undefined;
    if (!correct && card.isL1Trap) {
      trap = card.l1TrapWarning || 'Jebakan transfer negatif bahasa ibu terdeteksi.';
      setTriggeredTrap(trap);
    }

    onSubmitAnswer(correct, latency, trap);
  };

  const handleTypeClozeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (hasSubmitted || !typedInput.trim()) return;

    const latency = Date.now() - startTimeRef.current;
    setMeasuredLatency(latency);
    setHasSubmitted(true);

    const cleanInput = typedInput.trim().toLowerCase();
    const cleanTarget = card.correctAnswer.trim().toLowerCase();
    const correct = cleanInput === cleanTarget;
    setIsCorrect(correct);

    let trap: string | undefined = undefined;
    if (!correct && card.isL1Trap) {
      trap = card.l1TrapWarning || 'Ketepatan infleksi gramatikal belum sesuai.';
      setTriggeredTrap(trap);
    }

    onSubmitAnswer(correct, latency, trap);
  };

  const handleAddToken = (token: string, index: number) => {
    if (hasSubmitted) return;
    setAssembledTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveToken = (token: string, index: number) => {
    if (hasSubmitted) return;
    setAvailableTokens((prev) => [...prev, token]);
    setAssembledTokens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckAssembledTokens = () => {
    if (hasSubmitted || assembledTokens.length === 0) return;
    const latency = Date.now() - startTimeRef.current;
    setMeasuredLatency(latency);
    setHasSubmitted(true);

    const assembledString = assembledTokens.join('');
    const targetString = card.correctAnswer.replace(/\s+/g, '');
    const correct = assembledString === targetString;
    setIsCorrect(correct);

    let trap: string | undefined = undefined;
    if (!correct) {
      trap = card.l1TrapWarning || 'Urutan kata belum mengikuti prinsip Predikat di Akhir (SOV).';
      setTriggeredTrap(trap);
    }

    onSubmitAnswer(correct, latency, trap);
  };

  // Helper for character-level typing diffing
  const renderCharacterDiff = (input: string, target: string) => {
    const maxLen = Math.max(input.length, target.length);
    const chars: React.ReactNode[] = [];

    for (let i = 0; i < maxLen; i++) {
      const inChar = input[i] || '';
      const targetChar = target[i] || '';

      if (inChar === targetChar) {
        chars.push(
          <span key={i} className="text-emerald-400 font-bold bg-emerald-500/20 px-1 py-0.5 rounded">
            {inChar}
          </span>
        );
      } else {
        chars.push(
          <span key={i} className="text-red-400 line-through bg-red-500/20 px-1 py-0.5 rounded mx-0.5">
            {inChar || '␣'}
          </span>
        );
      }
    }

    return (
      <div className="mt-2 p-3 bg-neutral-900/80 rounded-xl border border-neutral-700/60 font-mono text-sm">
        <div className="text-xs text-neutral-400 mb-1">Analisis Karakter per Karakter:</div>
        <div className="flex flex-wrap items-center gap-1">{chars}</div>
        <div className="text-xs text-emerald-400 mt-2 font-sans font-medium">
          Target Sebenarnya: <span className="font-bold">{target}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md overflow-x-hidden">
      {/* Archetype Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 truncate">
            {card.archetype.replace(/_/g, ' ')}
          </span>
          {card.isL1Trap && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              <ShieldAlert className="w-3 h-3 shrink-0" />
              L1 Contrast Trap
            </span>
          )}
        </div>

        {/* Speed Dial / Latency Timer */}
        {(card.archetype === 'speed_comprehension_blast' || card.archetype === 'audio_speed_gate') && (
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-500/40 shrink-0">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            {(timeLeftMs / 1000).toFixed(1)}s
          </div>
        )}
      </div>

      {/* Main Prompt */}
      <div className="mb-5">
        <h3 className="text-base sm:text-lg font-bold text-neutral-100 leading-snug break-words">
          {card.prompt}
        </h3>
        {card.kanaFurigana && (
          <p className="text-sm text-neutral-400 mt-1 font-mono">{card.kanaFurigana}</p>
        )}
      </div>

      {/* ── ARCHETYPE 1: CONTRASTIVE PAIR SLOT ── */}
      {card.archetype === 'contrastive_pair_slot' && (
        <div className="space-y-4">
          <div className="p-4 bg-neutral-800/60 rounded-2xl border border-neutral-700/50 text-center">
            <span className="text-lg font-medium text-neutral-300">
              {card.targetPattern.replace(card.correctAnswer, ' ______ ')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(card.options || [card.correctAnswer, 'Jebakan L1']).map((opt, idx) => {
              const isSelected = selectedOption === opt;
              let btnStyle = 'bg-neutral-800/80 hover:bg-neutral-750 text-neutral-200 border-neutral-700';
              if (hasSubmitted) {
                if (opt === card.correctAnswer) {
                  btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-900/60 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={hasSubmitted}
                  className={`min-h-[44px] min-w-[44px] px-4 py-3 rounded-2xl border text-sm sm:text-base font-medium transition-all active:scale-95 flex items-center justify-between text-left ${btnStyle}`}
                >
                  <span className="break-words">{opt}</span>
                  {hasSubmitted && opt === card.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  {hasSubmitted && isSelected && opt !== card.correctAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ARCHETYPE 2: AUDIO SPEED GATE ── */}
      {card.archetype === 'audio_speed_gate' && (
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-800/80 to-neutral-900/80 rounded-2xl border border-neutral-700">
            <button
              onClick={() => speakJapanese(card.targetPattern)}
              className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-90 text-neutral-950 flex items-center justify-center shadow-lg transition-transform mb-2"
              title="Putar Audio"
            >
              <Volume2 className="w-8 h-8" />
            </button>
            <span className="text-xs text-neutral-400 font-medium">Dengarkan perbedaan fonetik (2.5s)</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(card.options || [card.correctAnswer, 'Pilihan lain']).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(opt)}
                disabled={hasSubmitted}
                className="min-h-[48px] px-4 py-3 rounded-2xl border border-neutral-700 bg-neutral-800 text-center font-bold text-base hover:border-amber-400 active:scale-95 transition-all text-neutral-200"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ARCHETYPE 3: PRODUCTION TYPE CLOZE ── */}
      {card.archetype === 'production_type_cloze' && (
        <form onSubmit={handleTypeClozeSubmit} className="space-y-4">
          <div className="p-4 bg-neutral-800/60 rounded-2xl border border-neutral-700/60">
            <div className="text-xs text-neutral-400 mb-1">Target Infleksi / Kata:</div>
            <div className="text-lg font-semibold text-neutral-200 break-words">{card.targetPattern}</div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              disabled={hasSubmitted}
              placeholder="Ketik jawaban lengkap dalam bahasa Jepang..."
              className="w-full min-h-[48px] px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-2xl text-white font-medium focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {!hasSubmitted && (
            <button
              type="submit"
              disabled={!typedInput.trim()}
              className="w-full min-h-[44px] bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold rounded-2xl active:scale-95 transition-all shadow-md"
            >
              Kirim Jawaban
            </button>
          )}

          {hasSubmitted && renderCharacterDiff(typedInput, card.correctAnswer)}
        </form>
      )}

      {/* ── ARCHETYPE 4: PRAGMATIC REGISTER PIVOT ── */}
      {card.archetype === 'pragmatic_register_pivot' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <div className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-1">Skenario Sosio-Pragmatik:</div>
            <p className="text-sm text-neutral-200 leading-relaxed">{card.prompt}</p>
          </div>

          <div className="space-y-2.5">
            {(card.options || [card.correctAnswer, 'Register tidak sesuai']).map((opt, idx) => {
              const isSelected = selectedOption === opt;
              let style = 'bg-neutral-800/90 border-neutral-700 text-neutral-200';
              if (hasSubmitted) {
                if (opt === card.correctAnswer) {
                  style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={hasSubmitted}
                  className={`w-full min-h-[48px] p-3.5 rounded-2xl border text-left text-sm sm:text-base font-medium transition-all active:scale-95 flex items-center justify-between ${style}`}
                >
                  <span className="break-words">{opt}</span>
                  {hasSubmitted && opt === card.correctAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ARCHETYPE 5: COLLOCATION CHUNK BUILDER ── */}
      {card.archetype === 'collocation_chunk_builder' && (
        <div className="space-y-4">
          <div className="min-h-[60px] p-3 bg-neutral-950/80 border border-neutral-700/70 rounded-2xl flex flex-wrap items-center gap-2">
            {assembledTokens.length === 0 ? (
              <span className="text-xs text-neutral-500 italic">Ketuk potongan kata di bawah untuk merangkai kalimat (SOV):</span>
            ) : (
              assembledTokens.map((tok, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveToken(tok, idx)}
                  disabled={hasSubmitted}
                  className="min-h-[38px] px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-sm font-semibold active:scale-95 transition-all"
                >
                  {tok} ✕
                </button>
              ))
            )}
          </div>

          {/* Available Token Pool */}
          <div className="flex flex-wrap gap-2 pt-2">
            {availableTokens.map((tok, idx) => (
              <button
                key={idx}
                onClick={() => handleAddToken(tok, idx)}
                disabled={hasSubmitted}
                className="min-h-[42px] px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 rounded-xl text-sm font-medium active:scale-95 transition-all"
              >
                + {tok}
              </button>
            ))}
          </div>

          {!hasSubmitted && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCheckAssembledTokens}
                disabled={assembledTokens.length === 0}
                className="flex-1 min-h-[44px] bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold rounded-2xl active:scale-95 transition-all"
              >
                Periksa Urutan Frasa
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ARCHETYPE 6: SPEED COMPREHENSION BLAST ── */}
      {card.archetype === 'speed_comprehension_blast' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-neutral-800 to-neutral-850 rounded-2xl border border-neutral-700 text-center">
            <span className="text-2xl font-bold text-amber-400">{card.targetPattern}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(card.options || [card.correctAnswer, 'Salah 1', 'Salah 2', 'Salah 3']).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(opt)}
                disabled={hasSubmitted}
                className="min-h-[44px] px-4 py-3 bg-neutral-800 hover:bg-neutral-750 active:scale-95 border border-neutral-700 rounded-2xl text-sm font-medium text-left text-neutral-200 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── FEEDBACK & L1 TRAP ALERT BANNER ── */}
      {hasSubmitted && (
        <div className="mt-5 space-y-3 animate-fadeIn">
          {/* Result Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isCorrect
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-bold text-sm">
                  {isCorrect ? 'Benar & Tepat!' : 'Belum Tepat!'}
                </span>
                <span className="text-xs font-mono opacity-80">
                  {measuredLatency}ms {measuredLatency <= 1200 ? '⚡ Refleks Otomatis' : '⏱️ Deliberate'}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {isCorrect
                  ? 'Akses memori instan berhasil diperkuat dalam jaringan fonologis-ortografis.'
                  : `Kunci jawaban yang tepat: ${card.correctAnswer}`}
              </p>
            </div>
          </div>

          {/* Indonesian Metalinguistic Gap Warning */}
          {triggeredTrap && (
            <div className="p-4 bg-amber-950/60 border border-amber-500/50 rounded-2xl flex items-start gap-3 text-amber-200">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Peringatan Interferensi Bahasa Ibu (L1 Gap)
                </div>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed text-amber-100">
                  {triggeredTrap}
                </p>
              </div>
            </div>
          )}

          {/* Continue Action */}
          {onNextCard && (
            <button
              onClick={onNextCard}
              className="w-full min-h-[46px] mt-2 bg-neutral-100 hover:bg-white text-neutral-950 font-bold rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Lanjut ke Kartu Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
