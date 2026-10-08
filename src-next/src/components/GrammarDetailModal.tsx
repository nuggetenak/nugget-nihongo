"use client";

import React from "react";
import { GrammarItem } from "@/types";
import { useAppStore } from "@/lib/store";
import { X, Star, BookOpen, GitCompare, HelpCircle } from "lucide-react";

interface GrammarDetailModalProps {
  item: GrammarItem;
  onClose: () => void;
}

export default function GrammarDetailModal({ item, onClose }: GrammarDetailModalProps) {
  const { isBookmarked, toggleBookmark } = useAppStore();
  const bookmarked = isBookmarked(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="glass-panel w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 border-white/20 shadow-2xl relative bg-[#13151b]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-nugget-gold/20 text-nugget-gold border border-nugget-gold/40">
              {item.level.toUpperCase()}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Tata Bahasa
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(item.id)}
              className={`p-2 rounded-xl border transition-all ${
                bookmarked
                  ? "bg-nugget-gold/20 text-nugget-gold border-nugget-gold"
                  : "bg-surface-100 text-gray-400 border-surface-border hover:text-white"
              }`}
              title={bookmarked ? "Hapus Bookmark" : "Simpan Pola"}
            >
              <Star className={`w-4 h-4 ${bookmarked ? "fill-nugget-gold" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-100 border border-surface-border text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pattern Header */}
        <div className="py-2">
          <h2 className="text-2xl font-bold tracking-tight text-white font-japanese">
            {item.pattern}
          </h2>
          <p className="text-sm text-nugget-gold mt-1 font-medium">
            {item.meaning}
          </p>
        </div>

        {/* Connection / Sambungan Rule */}
        {item.connection && (
          <div className="mt-4 p-3.5 rounded-2xl bg-surface-200 border border-surface-border">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Rumus / Sambungan:
            </span>
            <code className="text-sm font-semibold text-nugget-amber font-mono">
              {item.connection}
            </code>
          </div>
        )}

        {/* Description / Penjelasan */}
        {item.desc && (
          <div className="mt-4 text-sm text-gray-300 leading-relaxed bg-surface-100 p-4 rounded-2xl border border-surface-border">
            <div dangerouslySetInnerHTML={{ __html: item.desc }} />
          </div>
        )}

        {/* Nuance Note */}
        {item.nuance && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
            <span className="font-bold flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-4 h-4" /> Nuansa:
            </span>
            {item.nuance}
          </div>
        )}

        {/* Examples */}
        {item.examples && item.examples.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-nugget-gold" />
              Contoh Kalimat
            </h3>
            <div className="space-y-3">
              {item.examples.map((ex, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-surface-100 border border-surface-border space-y-1">
                  <p 
                    className="text-white font-medium text-sm font-japanese leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: ex.jp }}
                  />
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {ex.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
