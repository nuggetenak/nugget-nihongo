// ══════════════════════════════════════════════════════════════════
//  KotowazaModal.tsx — Authentic Japanese Proverb Gallery & Wisdom
//  52 Traditional Kotowaza with Zen Art, Audio TTS & Category Filters
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Volume2,
  Copy,
  Sparkles,
  Quote,
  BookOpen,
  Filter,
  Check,
  Compass,
} from 'lucide-react';
import { KOTOWAZA_LIST, getDailyKotowaza, getKotowazaCategories, Kotowaza } from '../../lib/data/kotowaza';
import { speakJapanese } from '../../lib/audio/tts';
import { useAppStore } from '../../store/useAppStore';

interface KotowazaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KotowazaModal: React.FC<KotowazaModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useAppStore();

  const dailyItem = useMemo(() => getDailyKotowaza(), []);
  const categories = useMemo(() => ['Semua', ...getKotowazaCategories()], []);

  const filteredList = useMemo(() => {
    let list: Kotowaza[] = KOTOWAZA_LIST;

    if (selectedCategory !== 'Semua') {
      list = list.filter((k: Kotowaza) => k.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (k: Kotowaza) =>
          k.jp.toLowerCase().includes(q) ||
          k.reading.toLowerCase().includes(q) ||
          k.romaji.toLowerCase().includes(q) ||
          k.meaning.toLowerCase().includes(q) ||
          (k.literal && k.literal.toLowerCase().includes(q)) ||
          k.wisdom.toLowerCase().includes(q) ||
          (k.origin && k.origin.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleCopy = (item: Kotowaza) => {
    const textToCopy = `${item.jp} (${item.reading})\n"${item.meaning}"\nMakna: ${item.wisdom}\n— Nugget Nihongo`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedId(item.id);
      showToast('Peribahasa disalin ke clipboard! 📋', '✨');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-surface border border-accent/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden flex justify-center pt-2 pb-1 bg-surface-2/40">
          <div className="w-10 h-1 rounded-full bg-accent/30" />
        </div>

        {/* Hero Artwork Header */}
        <div className="relative overflow-hidden border-b border-accent/20 bg-surface-2 shrink-0">
          {/* Zen Tea Room Calligraphy Artwork */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity hover:opacity-40 transition-opacity"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />

          <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>52 Mutiara Kebijaksanaan</span>
                </span>
                <span className="text-xs text-appText-muted font-jp hidden sm:inline">
                  日本のことわざ
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright tracking-tight">
                Galeri Peribahasa Jepang (ことわざ)
              </h2>
              <p className="text-xs text-appText-muted leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                Jelajahi peribahasa tradisional sarat filosofi, hikmah hidup, dan etos kerja Jepang dengan audio pelafalan asli dan asal-usul budayanya.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-surface/80 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-all shrink-0 active:scale-95"
              title="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-accent/15 bg-surface-2/50 space-y-3 shrink-0">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari peribahasa, bacaan hiragana, arti, atau kata kunci (contoh: batu, monyet, waktu)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-surface border border-accent/20 text-xs sm:text-sm text-appText-bright placeholder:text-appText-muted/60 focus:outline-none focus:border-accent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal Scrolling Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-0.5">
            <span className="text-[11px] font-bold text-accent shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              <span className="hidden sm:inline">Kategori:</span>
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-accent text-bg font-extrabold shadow-sm'
                      : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Proverb List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Spotlight: Peribahasa Hari Ini */}
          {!searchQuery && selectedCategory === 'Semua' && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-surface-2 to-surface border-2 border-accent/40 shadow-glow relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-hot flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mutiara Hari Ini · 今日のことわざ</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                  {dailyItem.category}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-2">
                <div>
                  <div className="text-xl sm:text-2xl font-jp font-bold text-appText-bright flex items-center gap-2 flex-wrap">
                    <span>{dailyItem.jp}</span>
                    <span className="text-xs sm:text-sm font-normal text-amber-400 font-mono">
                      【{dailyItem.reading}】
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-appText-muted mt-0.5">
                    /{dailyItem.romaji}/
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => speakJapanese(dailyItem.jp)}
                    className="p-2.5 rounded-xl bg-surface hover:bg-amber-500/20 text-accent border border-accent/20 transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95"
                    title="Dengarkan pelafalan"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengar</span>
                  </button>
                  <button
                    onClick={() => handleCopy(dailyItem)}
                    className="p-2.5 rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent border border-accent/20 transition-all active:scale-95"
                    title="Salin peribahasa"
                  >
                    {copiedId === dailyItem.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-bold text-accent-hot mt-1">
                "{dailyItem.meaning}"
              </div>
              {dailyItem.literal && (
                <div className="text-[11px] text-appText-muted italic">
                  Harfiah: {dailyItem.literal}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-accent/20 text-xs text-appText-bright leading-relaxed bg-surface/60 p-3 rounded-2xl">
                <span className="font-bold text-accent">Hikmah: </span>
                {dailyItem.wisdom}
              </div>
            </div>
          )}

          {/* Results Count Header */}
          <div className="flex items-center justify-between text-xs text-appText-muted px-1">
            <span>
              Menampilkan <strong className="text-accent">{filteredList.length}</strong> dari 52 peribahasa
            </span>
            {searchQuery && (
              <span className="italic">
                Kata kunci: "{searchQuery}"
              </span>
            )}
          </div>

          {/* Empty State */}
          {filteredList.length === 0 && (
            <div className="text-center py-12 space-y-3 bg-surface-2/40 rounded-3xl border border-accent/15">
              <Quote className="w-10 h-10 text-appText-muted/40 mx-auto" />
              <p className="text-sm font-semibold text-appText-bright">
                Tidak ada peribahasa yang sesuai dengan pencarian Anda.
              </p>
              <p className="text-xs text-appText-muted">
                Coba gunakan kata kunci lain atau pilih filter kategori "Semua".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="px-4 py-2 rounded-xl bg-surface border border-accent/25 text-xs text-accent font-bold hover:bg-surface-2 transition-all"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredList.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 hover:border-accent/40 transition-all flex flex-col justify-between group shadow-sm hover:bg-surface-2/90"
                >
                  <div>
                    {/* Top row: Category tag & Actions */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-surface border border-accent/20 text-accent">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakJapanese(item.jp)}
                          className="p-1.5 rounded-lg bg-surface hover:bg-amber-500/20 text-accent transition-all active:scale-95"
                          title="Dengarkan pelafalan"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(item)}
                          className="p-1.5 rounded-lg bg-surface hover:bg-surface-3 text-appText-muted hover:text-accent transition-all active:scale-95"
                          title="Salin teks"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Japanese text & Furigana */}
                    <div className="space-y-1 my-1.5">
                      <div className="text-lg sm:text-xl font-jp font-bold text-appText-bright group-hover:text-accent transition-colors">
                        {item.jp}
                      </div>
                      <div className="text-xs font-mono text-amber-400">
                        【{item.reading}】
                      </div>
                      <div className="text-[11px] font-mono text-appText-muted">
                        /{item.romaji}/
                      </div>
                    </div>

                    {/* Meanings */}
                    <div className="space-y-1 mt-2.5">
                      <div className="text-xs font-bold text-appText-bright leading-relaxed">
                        "{item.meaning}"
                      </div>
                      {item.literal && (
                        <div className="text-[11px] text-appText-muted italic">
                          Harfiah: {item.literal}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Wisdom & Origin footer */}
                  <div className="mt-3 pt-3 border-t border-accent/15 space-y-2">
                    <div className="text-[11px] text-appText-muted/95 leading-relaxed bg-surface/50 p-2.5 rounded-xl border border-accent/10">
                      <span className="font-bold text-accent">💡 Hikmah: </span>
                      {item.wisdom}
                    </div>

                    {item.origin && (
                      <div className="text-[10px] text-appText-muted/70 flex items-start gap-1">
                        <BookOpen className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span className="italic">Asal: {item.origin}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 sm:p-4 border-t border-accent/15 bg-surface-2/70 flex items-center justify-between text-xs text-appText-muted shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <Compass className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Peribahasa Jepang mencerminkan kearifan lokal berabad-abad</span>
            <span className="sm:hidden">52 Koleksi Peribahasa</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-accent text-bg font-extrabold text-xs hover:bg-accent-hot transition-all active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
