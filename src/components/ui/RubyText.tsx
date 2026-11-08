// ══════════════════════════════════════════════════════════════════
//  RubyText.tsx — Universal Semantic HTML5 Ruby Furigana Component
//  Compliant with W3C Ruby Annotation & WCAG A11y Standards
//  Emits semantic <ruby>, <rp>, and <rt> with copy-paste fallback protection
//  Supports Furigana toggle, Romaji assistance, and BIZ UDGothic typography
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { parseRubySegments, stripFurigana, isPureKana, containsKanji } from '../../lib/data/rubyGenerator';

export interface RubyTextProps {
  text: string;
  furigana?: string;
  romaji?: string;
  showFurigana?: boolean;
  showRomaji?: boolean;
  className?: string;
  rtClassName?: string;
  rpStart?: string;
  rpEnd?: string;
}

/**
 * RubyText Component
 * Renders Japanese text with accessible, semantic Furigana annotations:
 *   <ruby>
 *     漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp>
 *   </ruby>
 *
 * Screen Reader & Clipboard Safety:
 * - Assistive technologies respect <rt> and <rp> separation.
 * - Legacy clipboard engines preserve readable fallback: 漢字(かんじ).
 * - Dual-theme WCAG AAA contrast tokens: text-amber-900 (light) / text-amber-300 (dark).
 */
export const RubyText: React.FC<RubyTextProps> = ({
  text,
  furigana,
  romaji,
  showFurigana = true,
  showRomaji = false,
  className = '',
  rtClassName = 'text-[0.65em] font-medium text-amber-900 dark:text-amber-300 leading-none tracking-tight select-none [ruby-position:over]',
  rpStart = '(',
  rpEnd = ')',
}) => {
  if (!text) return null;

  // Clean raw HTML bold tags so they never leak as unrendered text in Ruby annotations
  let targetText = typeof text === 'string' ? text.replace(/<\/?b>/gi, '') : text;
  let targetHint = typeof furigana === 'string' ? furigana.replace(/<\/?b>/gi, '') : furigana;

  // Auto-recovery for inverted fields: if text is purely kana but furigana holds Kanji
  if (furigana && containsKanji(furigana) && !containsKanji(text)) {
    targetText = furigana;
    targetHint = text;
  }

  // When furigana is hidden
  if (!showFurigana) {
    const cleanText = stripFurigana(targetText);
    if (showRomaji && romaji) {
      return (
        <span lang="ja" className={`inline-flex flex-col items-center ${className}`}>
          <span>{cleanText}</span>
          <span className="text-[0.65em] text-appText-muted font-mono tracking-tight">{romaji}</span>
        </span>
      );
    }
    return <span lang="ja" className={className}>{cleanText}</span>;
  }

  // Pure kana sentences or identical furigana reading require no ruby tags
  if (isPureKana(targetText) || (targetHint && targetHint === targetText)) {
    if (showRomaji && romaji) {
      return (
        <span lang="ja" className={`inline-flex flex-col items-center ${className}`}>
          <span>{targetText}</span>
          <span className="text-[0.65em] text-appText-muted font-mono tracking-tight">{romaji}</span>
        </span>
      );
    }
    return <span lang="ja" className={className}>{targetText}</span>;
  }

  const segments = parseRubySegments(targetText, targetHint);

  return (
    <span lang="ja" className={`inline-flex flex-wrap items-baseline ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.rt) {
          return (
            <ruby
              key={idx}
              lang="ja"
              className="font-jp [ruby-position:over] inline-flex flex-col items-center leading-normal mx-[0.05em] align-baseline"
            >
              {seg.kanji}
              <rp className="text-[0em] opacity-0">{rpStart}</rp>
              <rt className={rtClassName}>{seg.rt}</rt>
              <rp className="text-[0em] opacity-0">{rpEnd}</rp>
            </ruby>
          );
        }
        return <React.Fragment key={idx}>{seg.kanji}</React.Fragment>;
      })}
      {showRomaji && romaji && (
        <span className="block w-full text-[0.65em] text-appText-muted font-mono tracking-tight text-center">
          {romaji}
        </span>
      )}
    </span>
  );
};

export default RubyText;
