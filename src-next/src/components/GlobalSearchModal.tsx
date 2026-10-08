"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, Layers } from "lucide-react";
import { searchAll } from "@/lib/data";
import { VocabItem, GrammarItem } from "@/types";
import WordDetailModal from "./WordDetailModal";
import GrammarDetailModal from "./GrammarDetailModal";

interface GlobalSearchModalProps {
  onClose: () => void;
}

export default function GlobalSearchModal({ onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ vocab: VocabItem[]; grammar: GrammarItem[] }>({
    vocab: [],
    grammar: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ vocab: [], grammar: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await searchAll(query);
      setResults(res);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-lg overflow-hidden rounded-3xl border-white/20 shadow-2xl bg-[#111317]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 flex items-center gap-3 border-b border-surface-border">
          <Search className="w-5 h-5 text-nugget-amber" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kanji, reading, grammar, arti..."
            className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-surface-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <p className="text-center text-sm text-gray-400 py-6 animate-pulse">
              Mencari di seluruh kamus...
            </p>
          )}

          {!loading && query.length >= 2 && results.vocab.length === 0 && results.grammar.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-8">
              Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
            </p>
          )}

          {!loading && query.length < 2 && (
            <div className="text-center text-xs text-gray-500 py-6">
              Ketik minimal 2 karakter (contoh: <span className="text-nugget-amber">taberu</span>, <span className="text-nugget-amber">makan</span>, <span className="text-nugget-amber">te-form</span>)
            </div>
          )}

          {/* Vocab Results */}
          {results.vocab.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
                Kosakata ({results.vocab.length})
              </span>
              <div className="space-y-1.5">
                {results.vocab.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedWord(v)}
                    className="p-3 rounded-2xl bg-surface-100 hover:bg-surface-200 border border-surface-border/50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-nugget-amber/20 text-nugget-amber font-bold">
                        {v.jlpt.toUpperCase()}
                      </span>
                      <div>
                        <span className="text-white font-bold font-japanese mr-2">{v.word}</span>
                        <span className="text-gray-400 text-xs font-japanese">({v.reading})</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-300 truncate max-w-[150px]">
                      {v.meaning_id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grammar Results */}
          {results.grammar.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
                Tata Bahasa ({results.grammar.length})
              </span>
              <div className="space-y-1.5">
                {results.grammar.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGrammar(g)}
                    className="p-3 rounded-2xl bg-surface-100 hover:bg-surface-200 border border-surface-border/50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-nugget-gold/20 text-nugget-gold font-bold">
                        {g.level.toUpperCase()}
                      </span>
                      <span className="text-white font-bold font-japanese">{g.pattern}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300 truncate max-w-[150px]">
                      {g.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedWord && (
        <WordDetailModal item={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
      {selectedGrammar && (
        <GrammarDetailModal item={selectedGrammar} onClose={() => setSelectedGrammar(null)} />
      )}
    </div>
  );
}
