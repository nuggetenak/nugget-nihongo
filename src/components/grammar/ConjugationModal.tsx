// ══════════════════════════════════════════════════════════════════
//  ConjugationModal.tsx — Interactive Verb Inflection Matrix
//  Dictionary, Masu, Te, Nai, Ta, Potential, Imperative, Ba, Tai
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Search, Layers, RotateCcw } from 'lucide-react';
import { conjugateVerb, inferType, VerbType } from '../../lib/grammar/conjugation';
import { speakJapanese } from '../../lib/audio/tts';

interface ConjugationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVerb?: string;
}

interface CommonVerb {
  dict: string;
  reading: string;
  meaning: string;
}

const COMMON_PRESET_VERBS: CommonVerb[] = [
  { dict: '食べる', reading: 'たべる', meaning: 'Makan (Ichidan)' },
  { dict: '飲む', reading: 'のむ', meaning: 'Minum (Godan mu)' },
  { dict: '行く', reading: 'いく', meaning: 'Pergi (Godan ku - khusus)' },
  { dict: '話す', reading: 'はなす', meaning: 'Berbicara (Godan su)' },
  { dict: '書く', reading: 'かく', meaning: 'Menulis (Godan ku)' },
  { dict: '見る', reading: 'みる', meaning: 'Melihat (Ichidan)' },
  { dict: '待つ', reading: 'まつ', meaning: 'Menunggu (Godan tsu)' },
  { dict: 'する', reading: 'する', meaning: 'Melakukan (Irregular)' },
  { dict: '来る', reading: 'くる', meaning: 'Datang (Irregular)' },
];

export const ConjugationModal: React.FC<ConjugationModalProps> = ({
  isOpen,
  onClose,
  initialVerb = '食べる',
}) => {
  const [inputVerb, setInputVerb] = useState(initialVerb);
  const [selectedVerb, setSelectedVerb] = useState(initialVerb);

  useEffect(() => {
    if (initialVerb) {
      setInputVerb(initialVerb);
      setSelectedVerb(initialVerb);
    }
  }, [initialVerb]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const verbType: VerbType = inferType(selectedVerb) || 'godan';

  const conjugationRows = [
    { formKey: 'dict', label: 'Bentuk Kamus (辞書形)', desc: 'Bentuk dasar informal / netral' },
    { formKey: 'masu', label: 'Bentuk Sopan (ます形)', desc: 'Percakapan sehari-hari standar' },
    { formKey: 'te', label: 'Bentuk Sambung (て形)', desc: 'Menghubungkan kalimat, meminta tolong' },
    { formKey: 'nai', label: 'Bentuk Negatif (ない形)', desc: 'Menyatakan tidak melakukan' },
    { formKey: 'ta', label: 'Bentuk Lampau (た形)', desc: 'Menyatakan tindakan sudah selesai' },
    { formKey: 'potential', label: 'Bentuk Potensial (可能形)', desc: 'Menyatakan kemampuan (bisa / sanggup)' },
    { formKey: 'tai', label: 'Bentuk Keinginan (たい形)', desc: 'Menyatakan keinginan (ingin melakukan)' },
    { formKey: 'ba', label: 'Bentuk Pengandaian (ば形)', desc: 'Kondisi bersyarat (jika / seandainya)' },
    { formKey: 'nagara', label: 'Bentuk Sambil (ながら形)', desc: 'Melakukan dua aktivitas serentak' },
    { formKey: 'imperative', label: 'Bentuk Perintah (命令形)', desc: 'Perintah tegas atau seruan' },
  ];

  const handleApplyVerb = (dict: string) => {
    setInputVerb(dict);
    setSelectedVerb(dict);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Tabel Konjugasi Verba"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border-2 border-accent/30 rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-accent shadow-glow">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-appText-bright">
                Matriks Konjugasi Verba · 動詞活用
              </h2>
              <p className="text-xs text-appText-muted">
                Perubahan bentuk kata kerja lengkap untuk ujian dan percakapan.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input & Preset Quick Picker */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputVerb}
                onChange={(e) => setInputVerb(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyVerb(inputVerb);
                }}
                placeholder="Ketik kata kerja bentuk kamus (misal: 飲む, 行く, 食べる)..."
                className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-appText-bright placeholder:text-appText-muted/60 focus:outline-none focus:border-accent font-jp"
              />
            </div>
            <button
              onClick={() => handleApplyVerb(inputVerb)}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs transition-all shadow-sm shrink-0"
            >
              Cek Konjugasi
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent shrink-0 mr-1">
              Contoh:
            </span>
            {COMMON_PRESET_VERBS.map((v) => (
              <button
                key={v.dict}
                onClick={() => handleApplyVerb(v.dict)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedVerb === v.dict
                    ? 'bg-amber-500/25 border-accent text-accent-hot font-bold'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                }`}
              >
                {v.dict} ({v.meaning.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Current Verb Summary Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-surface-2 to-surface-2 border border-accent/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl sm:text-3xl font-jp font-bold text-accent-hot">
              {selectedVerb}
            </div>
            <div>
              <div className="text-xs font-bold text-appText-bright capitalize">
                Golongan: {verbType}
              </div>
              <div className="text-[11px] text-appText-muted">
                Kamus / Bentuk Dasar
              </div>
            </div>
          </div>

          <button
            onClick={() => speakJapanese(selectedVerb)}
            className="w-9 h-9 rounded-xl bg-surface hover:bg-amber-500/20 text-accent border border-accent/20 flex items-center justify-center transition-all shadow-sm"
            title="Dengarkan pelafalan"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Inflection Table */}
        <div className="space-y-2">
          {conjugationRows.map((row) => {
            const conjugated = conjugateVerb(selectedVerb, row.formKey, verbType);
            return (
              <div
                key={row.formKey}
                className="p-3 sm:p-3.5 rounded-xl bg-surface-2/70 border border-accent/10 hover:border-accent/30 flex items-center justify-between gap-3 transition-all"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-bold text-appText-muted">
                    {row.label}
                  </div>
                  <div className="text-sm sm:text-base font-jp font-bold text-appText-bright">
                    {conjugated || '—'}
                  </div>
                  <div className="text-[11px] text-appText-muted/80 truncate">
                    {row.desc}
                  </div>
                </div>

                {conjugated && (
                  <button
                    onClick={() => speakJapanese(conjugated)}
                    className="p-2 rounded-xl bg-surface hover:bg-amber-500/20 text-appText-muted hover:text-accent transition-all shrink-0 border border-accent/10"
                    title={`Dengarkan: ${conjugated}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
