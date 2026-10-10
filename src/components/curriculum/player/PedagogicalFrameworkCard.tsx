// ══════════════════════════════════════════════════════════════════
//  PedagogicalFrameworkCard.tsx — Kartu Riset 5W1H & Edge Cases
//  Progressive Disclosure: Ringkas secara default, kaya saat dibuka
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Users, Compass } from 'lucide-react';
import { LessonPedagogicalFramework } from '../../../types/curriculum';

interface PedagogicalFrameworkCardProps {
  framework?: LessonPedagogicalFramework;
}

export const PedagogicalFrameworkCard: React.FC<PedagogicalFrameworkCardProps> = ({ framework }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isEdgeOpen, setIsEdgeOpen] = useState(false);

  if (!framework) return null;

  const { what, why_research, who_and_when, scenario, edge_cases } = framework;

  return (
    <div className="space-y-3.5 my-4">
      {/* ── 1. Skenario Nyata & Konteks Sosial ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface-2 to-surface-2 border border-accent/25 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-accent text-xs">
            <Compass className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Skenario Nyata di Jepang
          </span>
        </div>
        <div className="text-sm sm:text-base font-bold text-appText-bright">
          {scenario.title}
        </div>
        <p className="text-xs text-appText leading-relaxed">
          {scenario.narrative}
        </p>

        {/* WHO & WHEN Pill Highlights */}
        <div className="pt-2 border-t border-accent/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-1.5 text-appText-muted">
            <Users className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <span><strong className="text-appText-bright">Relasi:</strong> {who_and_when.social_relations}</span>
          </div>
          <div className="flex items-start gap-1.5 text-appText-muted">
            <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span><strong className="text-appText-bright">Situasi:</strong> {who_and_when.situational_context}</span>
          </div>
        </div>
      </div>

      {/* ── 2. Akordeon Modular: Mengapa Urutan Ini? (Riset SLA 💡) ─ */}
      <div className="rounded-2xl border border-accent/20 bg-surface overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setIsWhyOpen(!isWhyOpen)}
          className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-surface-2 transition-colors min-h-[48px] active:scale-98"
          aria-expanded={isWhyOpen}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1 rounded-lg bg-amber-500/15 text-accent text-sm shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-appText-bright">
                Mengapa Urutan Materi Ini? (Riset SLA 💡)
              </div>
              <div className="text-[10px] text-appText-muted truncate">
                Processability Theory, pencegahan interferensi semantis, & analisis kontrasif
              </div>
            </div>
          </div>
          <div className="text-appText-muted shrink-0">
            {isWhyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isWhyOpen && (
          <div className="p-4 sm:p-5 pt-2 border-t border-accent/10 bg-surface-2/60 space-y-3 text-xs leading-relaxed animate-fade-in">
            <p className="text-appText">
              {why_research.cognitive_rationale}
            </p>
            {why_research.prerequisite_link && (
              <p className="text-appText-muted italic">
                🔗 {why_research.prerequisite_link}
              </p>
            )}
            {why_research.sla_citations && why_research.sla_citations.length > 0 && (
              <div className="pt-2 border-t border-accent/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-appText-muted block mb-1">
                  Rujukan Ilmiah (Corpus Grounding):
                </span>
                <ul className="space-y-1 list-disc list-inside text-[11px] text-accent">
                  {why_research.sla_citations.map((cite, idx) => (
                    <li key={idx} className="break-words">{cite}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 3. Akordeon Modular: Batas Aturan & Edge Cases ⚠️ ──────── */}
      {edge_cases && edge_cases.length > 0 && (
        <div className="rounded-2xl border border-red-500/25 bg-surface overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setIsEdgeOpen(!isEdgeOpen)}
            className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-red-500/5 transition-colors min-h-[48px] active:scale-98"
            aria-expanded={isEdgeOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1 rounded-lg bg-red-500/15 text-red-400 text-sm shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-red-400">
                  Batas Aturan & Edge Cases (Jebakan L1 ⚠️)
                </div>
                <div className="text-[10px] text-appText-muted truncate">
                  Kekeliruan fatal transfer bahasa ibu dan pantangan kesantunan di Jepang
                </div>
              </div>
            </div>
            <div className="text-appText-muted shrink-0">
              {isEdgeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isEdgeOpen && (
            <div className="p-4 sm:p-5 pt-2 border-t border-red-500/15 bg-red-500/5 space-y-3.5 text-xs animate-fade-in">
              {edge_cases.map((ec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-surface border border-red-500/20 space-y-2">
                  <div className="font-bold text-red-300 flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{ec.title}</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="text-red-400 bg-red-500/10 p-1.5 rounded">{ec.pitfallWarning}</div>
                    <div className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded">{ec.rightSolution}</div>
                  </div>
                  <p className="text-appText leading-relaxed pt-1">
                    {ec.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
