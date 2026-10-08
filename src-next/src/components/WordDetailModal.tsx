"use client";

import React from "react";
import { VocabItem } from "@/types";
import { useAppStore } from "@/lib/store";
import { X, Star, Volume2, BookOpen, Layers } from "lucide-react";

interface WordDetailModalProps {
  item: VocabItem;
  onClose: () => void;
}

export default function WordDetailModal({ item, onClose }: WordDetailModalProps) {
  const { isBookmarked, toggleBookmark } = useAppStore();
  const bookmarked = isBookmarked(item.id);

  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="glass-panel w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 border-white/20 shadow-2xl relative bg-[#13151b]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-nugget-amber/20 text-nugget-amber border border-nugget-amber/40">
              {item.jlpt.toUpperCase()}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {item.pos || "Kosakata"}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(item.id)}
              className={`p-2 rounded-xl border transition-all ${
                bookmarked
                  ? "bg-nugget-amber/20 text-nugget-amber border-nugget-amber"
                  : "bg-surface-100 text-gray-400 border-surface-border hover:text-white"
              }`}
              title={bookmarked ? "Hapus Bookmark" : "Simpan Kata"}
            >
              <Star className={`w-4 h-4 ${bookmarked ? "fill-nugget-amber" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-100 border border-surface-border text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Word Display */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-5xl font-bold tracking-tight text-white font-japanese">
              {item.word}
            </h2>
            <button
              onClick={() => playAudio(item.word)}
              className="p-2 rounded-full bg-nugget-amber/10 hover:bg-nugget-amber/20 text-nugget-amber border border-nugget-amber/30 transition-transform active:scale-90"
              title="Dengarkan Audio"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-lg text-nugget-amber mt-2 font-medium font-japanese">
            {item.reading} {item.romaji ? `(${item.romaji})` : ""}
          </p>
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-surface-200 border border-surface-border">
            <p className="text-base font-semibold text-white">
              {item.meaning_id}
            </p>
          </div>
        </div>

        {/* Nuance Note */}
        {item.nuance && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
            <span className="font-bold block mb-1">💡 Nuansa & Penggunaan:</span>
            {item.nuance}
          </div>
        )}

        {/* Conjugation preview if verb */}
        {item.conjugations && Object.keys(item.conjugations).length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-nugget-amber" />
              Bentuk Konjugasi
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(item.conjugations).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-xl bg-surface-100 border border-surface-border">
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">{k}</span>
                  <span className="text-white font-bold font-japanese">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        {item.examples && item.examples.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-nugget-amber" />
              Contoh Kalimat
            </h3>
            <div className="space-y-3">
              {item.examples.map((ex, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-surface-100 border border-surface-border flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <p className="text-white font-medium text-sm font-japanese leading-relaxed">
                      {ex.jp}
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {ex.id}
                    </p>
                  </div>
                  <button
                    onClick={() => playAudio(ex.jp)}
                    className="p-1.5 text-gray-400 hover:text-nugget-amber transition-colors shrink-0"
                    title="Dengarkan Contoh"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
