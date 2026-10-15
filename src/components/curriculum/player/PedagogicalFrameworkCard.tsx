// ══════════════════════════════════════════════════════════════════
//  PedagogicalFrameworkCard.tsx — Konteks Situasi Nyata & Logika Belajar
//  Ramah Pembelajar, Bebas Jargon Akademis, Kaya Konteks Budaya & Suara
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, BookOpen, Users, Compass, HeartHandshake, Mic2 } from 'lucide-react';
import { LessonPedagogicalFramework } from '../../../types/curriculum';

interface PedagogicalFrameworkCardProps {
  framework?: LessonPedagogicalFramework;
}

export const PedagogicalFrameworkCard: React.FC<PedagogicalFrameworkCardProps> = ({ framework }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [isCultureOpen, setIsCultureOpen] = useState(false);
  const [isPronunciationOpen, setIsPronunciationOpen] = useState(false);

  if (!framework) return null;

  const { what, sensei_context, cultural_notes, pronunciation_tips, who_and_when, scenario, why_research } = framework;

  const sceneNarrative = sensei_context?.sceneIntro || scenario?.narrative;
  const missionText = sensei_context?.dailyMission || what?.canDo;
  const whyOrderText = sensei_context?.whyOrder || why_research?.cognitive_rationale;

  return (
    <div className="space-y-3.5 my-4">
      {/* ── 1. Skenario Nyata & Misi Percakapan ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface-2 to-surface-2 border border-accent/25 space-y-3 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-accent text-xs">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Skenario Nyata di Jepang
            </span>
          </div>
          {scenario?.setting && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface border border-accent/20 text-appText-muted font-medium truncate max-w-[200px]">
              📍 {scenario.setting}
            </span>
          )}
        </div>

        <div className="text-sm sm:text-base font-bold text-appText-bright">
          {scenario?.title || 'Situasi Percakapan Keseharian'}
        </div>

        {sceneNarrative && (
          <p className="text-xs text-appText leading-relaxed">
            {sceneNarrative}
          </p>
        )}

        {/* Misi Percakapan Hari Ini */}
        {missionText && (
          <div className="p-3 rounded-xl bg-surface/80 border border-amber-500/25 space-y-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <span>🎯</span>
              <span>Target Kemampuan Nyata</span>
            </div>
            <div className="text-xs text-appText-bright font-medium leading-relaxed">
              {missionText}
            </div>
          </div>
        )}

        {/* WHO & WHEN Pill Highlights */}
        {who_and_when && (
          <div className="pt-2 border-t border-accent/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {who_and_when.social_relations && (
              <div className="flex items-start gap-1.5 text-appText-muted">
                <Users className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-appText-bright">Relasi:</strong> {who_and_when.social_relations}</span>
              </div>
            )}
            {who_and_when.situational_context && (
              <div className="flex items-start gap-1.5 text-appText-muted">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-appText-bright">Situasi:</strong> {who_and_when.situational_context}</span>
              </div>
            )}
            {who_and_when.when_not_to_use && (
              <div className="sm:col-span-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                💡 <strong className="text-amber-200">Catatan Pemakaian:</strong> {who_and_when.when_not_to_use}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 2. Logika Berpikir: Mengapa Pola Ini Dipelajari Duluan? ─── */}
      {whyOrderText && (
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
                  Kenapa Pola Ini Dipelajari Duluan?
                </div>
                <div className="text-[10px] text-appText-muted truncate">
                  Alur berpikir logis untuk mempermudah otak mengingat tanpa pusing
                </div>
              </div>
            </div>
            <div className="text-appText-muted shrink-0">
              {isWhyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isWhyOpen && (
            <div className="p-4 sm:p-5 pt-2 border-t border-accent/10 bg-surface-2/60 space-y-2.5 text-xs leading-relaxed animate-fade-in">
              <p className="text-appText">
                {whyOrderText}
              </p>
              {why_research?.prerequisite_link && (
                <p className="text-appText-muted italic text-[11px]">
                  🔗 Kaitan dengan pelajaran sebelumnya: {why_research.prerequisite_link}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── 3. Etika & Tata Krama Budaya di Jepang ───────────────────── */}
      {cultural_notes && (
        <div className="rounded-2xl border border-accent/20 bg-surface overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setIsCultureOpen(!isCultureOpen)}
            className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-surface-2 transition-colors min-h-[48px] active:scale-98"
            aria-expanded={isCultureOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-sm shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-appText-bright">
                  {cultural_notes.title || 'Etika & Tata Krama Budaya'}
                </div>
                <div className="text-[10px] text-appText-muted truncate">
                  Kebiasaan orang Jepang (ojigi, kesantunan, & komunikasi yang tepat)
                </div>
              </div>
            </div>
            <div className="text-appText-muted shrink-0">
              {isCultureOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isCultureOpen && (
            <div className="p-4 sm:p-5 pt-2 border-t border-accent/10 bg-surface-2/60 space-y-3 text-xs leading-relaxed animate-fade-in">
              <p className="text-appText">
                {cultural_notes.etiquette}
              </p>
              {cultural_notes.taboos && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>Hal yang Perlu Dihindari:</span>
                  </div>
                  <p className="text-appText leading-relaxed">
                    {cultural_notes.taboos}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── 4. Tips Pelafalan Alami untuk Lidah Indonesia ────────────── */}
      {pronunciation_tips && (
        <div className="rounded-2xl border border-accent/20 bg-surface overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setIsPronunciationOpen(!isPronunciationOpen)}
            className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:bg-surface-2 transition-colors min-h-[48px] active:scale-98"
            aria-expanded={isPronunciationOpen}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1 rounded-lg bg-blue-500/15 text-blue-400 text-sm shrink-0">
                <Mic2 className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-appText-bright">
                  {pronunciation_tips.title || 'Tips Pelafalan Alami'}
                </div>
                <div className="text-[10px] text-appText-muted truncate">
                  Ketukan waktu (mora) & bunyi terbisukan agar tidak medok
                </div>
              </div>
            </div>
            <div className="text-appText-muted shrink-0">
              {isPronunciationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {isPronunciationOpen && (
            <div className="p-4 sm:p-5 pt-2 border-t border-accent/10 bg-surface-2/60 space-y-2.5 text-xs leading-relaxed animate-fade-in">
              <div className="p-3 rounded-xl bg-surface border border-accent/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                  Ketukan Waktu (Mora):
                </span>
                <p className="text-appText">{pronunciation_tips.moraNote}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-accent/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                  Kunci Pengucapan Alami:
                </span>
                <p className="text-appText">{pronunciation_tips.soundTip}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
