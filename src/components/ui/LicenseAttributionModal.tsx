// ══════════════════════════════════════════════════════════════════
//  LicenseAttributionModal.tsx — Open-Source Legal Attribution Portal
//  Ticket T-206: Comprehensive statutory attribution for EDRDG JMdict,
//  KANJIDIC2, Ulrich Apel's KanjiVG, Tatoeba, OJAD/Wadoku, BudouX,
//  Kuromoji, FSRS-rs, and SIL Open Fonts.
// ══════════════════════════════════════════════════════════════════

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShieldCheck, ExternalLink, X, BookOpen, Code2, Scale } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface LicenseAttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttributionEntry {
  title: string;
  project: string;
  license: string;
  licenseType: 'CC BY-SA 3.0' | 'CC BY 2.0 FR' | 'Apache 2.0' | 'MIT' | 'OFL 1.1';
  copyright: string;
  description: string;
  url: string;
  licenseUrl: string;
}

const ATTRIBUTIONS: AttributionEntry[] = [
  {
    title: 'Kamus Kosakata & Kanji (JMdict & KANJIDIC2)',
    project: 'EDRDG (Electronic Dictionary Research and Development Group)',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported',
    licenseType: 'CC BY-SA 3.0',
    copyright: 'Electronic Dictionary Research and Development Group (EDRDG)',
    description: 'Basis data leksikal komprehensif kosakata dan kanji Jepang yang diverifikasi oleh EDRDG dan Jim Breen.',
    url: 'https://www.edrdg.org/',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    title: 'Goresan & Anatomi Vektor Kanji (KanjiVG)',
    project: 'KanjiVG Project by Ulrich Apel',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported',
    licenseType: 'CC BY-SA 3.0',
    copyright: '(c) 2009-2023 Ulrich Apel',
    description: 'Vektor SVG urutan goresan stroke-order dan diagram kanji yang digunakan pada Dojo Kanji dan latihan menulis.',
    url: 'https://kanjivg.tagaini.net/',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    title: 'Kalimat Contoh Dwibahasa (Tatoeba)',
    project: 'Tatoeba Project',
    license: 'Creative Commons Attribution 2.0 France',
    licenseType: 'CC BY 2.0 FR',
    copyright: 'Tatoeba.org and Community Contributors',
    description: 'Koleksi kalimat contoh dan konteks percakapan nyata Jepang-Indonesia yang dikurasi oleh komunitas Tatoeba.',
    url: 'https://tatoeba.org/',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/fr/',
  },
  {
    title: 'Basis Data Nada Tokyo (OJAD & Wadoku)',
    project: 'Online Japanese Accent Dictionary & Wadoku e.V.',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported',
    licenseType: 'CC BY-SA 3.0',
    copyright: 'Wadoku e.V. and NINJAL (National Institute for Japanese Language and Linguistics)',
    description: 'Data pola kontur mora dan visualisasi nada (Heiban, Atamadaka, Nakadaka, Odaka) untuk pelafalan akurat.',
    url: 'https://www.gavo.t.u-tokyo.ac.jp/ojad/',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    title: 'Pemenggalan Frasa Cerdas (Google BudouX)',
    project: 'Google BudouX Machine Learning Segmenter',
    license: 'Apache License 2.0',
    licenseType: 'Apache 2.0',
    copyright: 'Copyright 2021 Google LLC',
    description: 'Model pemenggalan frasa semantik bunsetsu di browser tanpa dependensi jaringan untuk tipografi ponsel alami.',
    url: 'https://github.com/google/budoux',
    licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
  },
  {
    title: 'Analisis Morfologi & Transliterasi (Kuromoji & WanaKana)',
    project: 'Kuromoji.js & WanaKana',
    license: 'Apache 2.0 & MIT License',
    licenseType: 'Apache 2.0',
    copyright: 'Atilika Inc. & WanaKana Contributors',
    description: 'Tokenizer morfologi leksikal bahasa Jepang dan transliterasi romaji/hiragana/katakana instan di sisi klien.',
    url: 'https://github.com/takuyaa/kuromoji.js',
    licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
  },
  {
    title: 'Algoritma Pengulangan Spasi (FSRS Engine)',
    project: 'Free Spaced Repetition Scheduler (FSRS-rs)',
    license: 'MIT License',
    licenseType: 'MIT',
    copyright: 'Copyright (c) 2022-2024 Jarrett Ye & Open Spaced Repetition',
    description: 'Mesin matematika retensi memori interval bebas yang menyesuaikan stabilitas dan kesulitan tiap kartu.',
    url: 'https://github.com/open-spaced-repetition/fsrs-rs',
    licenseUrl: 'https://opensource.org/licenses/MIT',
  },
  {
    title: 'Tipografi Aksara Jepang & Latin',
    project: 'Google Fonts (BIZ UDGothic, Shippori Mincho, DM Sans)',
    license: 'SIL Open Font License 1.1',
    licenseType: 'OFL 1.1',
    copyright: 'Morisawa Inc., Fontworks Inc., Colophon Foundry',
    description: 'Tipografi Universal Design berkejelasan tinggi yang dioptimalkan untuk membaca kanji dan furigana dengan nyaman.',
    url: 'https://fonts.google.com/',
    licenseUrl: 'https://openfontlicense.org/',
  },
  {
    title: 'Aplikasi Nugget Nihongo Engine',
    project: 'Nugget Nihongo Core System',
    license: 'MIT License',
    licenseType: 'MIT',
    copyright: 'Copyright (c) 2024-2026 Nugget Nihongo Contributors',
    description: 'Kode sumber aplikasi didistribusikan secara terbuka di bawah lisensi MIT. Semua catatan dan data pengguna 100% milik pengguna.',
    url: 'https://github.com/',
    licenseUrl: 'https://opensource.org/licenses/MIT',
  },
];

export const LicenseAttributionModal: React.FC<LicenseAttributionModalProps> = ({ isOpen, onClose }) => {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="license-modal-title"
        className="w-full sm:max-w-3xl bg-surface border-t sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-accent shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 id="license-modal-title" className="text-base sm:text-xl font-extrabold text-appText-bright">
                Lisensi Terbuka & Hak Cipta Korpus
              </h2>
              <p className="text-xs text-appText-muted mt-0.5">
                Pengakuan resmi (statutory attribution) atas basis data dan perangkat lunak sumber terbuka yang mendukung Nugget Nihongo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup jendela lisensi"
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors active:scale-95 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Statement Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-appText-muted leading-relaxed space-y-1.5">
          <div className="font-bold text-accent flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Kepatuhan Hukum Hak Cipta & Integritas Data</span>
          </div>
          <p>
            Nugget Nihongo menjunjung tinggi etika open-source dan hak cipta karya ilmiah. Seluruh materi kosakata, kamus kanji, diagram goresan, kalimat contoh, dan algoritma memori di dalam aplikasi ini diperoleh dari sumber terbuka yang sah secara hukum, dilisensikan di bawah Creative Commons (CC BY-SA 3.0 / CC BY 2.0 FR), Apache 2.0, SIL Open Font License, dan MIT License.
          </p>
        </div>

        {/* Attributions Grid */}
        <div className="space-y-3.5">
          {ATTRIBUTIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-surface-2/70 border border-accent/15 space-y-2 hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="font-bold text-xs sm:text-sm text-appText-bright flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent font-mono text-[10px] font-bold">
                    {item.licenseType}
                  </span>
                  <a
                    href={item.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-accent hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Teks Lisensi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-appText leading-relaxed">
                {item.description}
              </p>

              <div className="pt-1.5 border-t border-accent/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-appText-muted">
                <div>
                  <strong>Pemegang Hak Cipta:</strong> {item.copyright}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-appText-muted hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <span>Situs Resmi Proyek</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent text-bg font-extrabold text-xs hover:bg-accent-hot transition-all active:scale-95 shadow-md"
          >
            Tutup & Mengerti
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};
