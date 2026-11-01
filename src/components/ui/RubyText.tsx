// ══════════════════════════════════════════════════════════════════
//  RubyText.tsx — Universal Semantic HTML5 Ruby Furigana Component
//  Compliant with W3C Ruby Annotation & WCAG A11y Standards
//  Emits semantic <ruby>, <rp>, and <rt> with copy-paste fallback protection
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { parseRubySegments, stripFurigana, isPureKana, containsKanji } from '../../lib/data/rubyGenerator';

export interface RubyTextProps {
  text: string;
  furigana?: string;
  showFurigana?: boolean;
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
 */
export const RubyText: React.FC<RubyTextProps> = ({
  text,
  furigana,
  showFurigana = true,
  className = '',
  rtClassName = 'text-[0.6em] text-accent/80 font-normal leading-none tracking-normal select-none [ruby-position:over]',
  rpStart = '(',
  rpEnd = ')',
}) => {
  if (!text) return null;

  let targetText = text;
  let targetHint = furigana;

  // Auto-recovery for inverted fields: if text is purely kana but furigana holds Kanji
  if (furigana && containsKanji(furigana) && !containsKanji(text)) {
    targetText = furigana;
    targetHint = text;
  }

  if (!showFurigana) {
    return <span lang="ja" className={className}>{stripFurigana(targetText)}</span>;
  }

  // Pure kana sentences or identical furigana reading require no ruby tags
  if (isPureKana(targetText) || (targetHint && targetHint === targetText)) {
    return <span lang="ja" className={className}>{targetText}</span>;
  }

  const segments = parseRubySegments(targetText, targetHint);

  return (
    <span lang="ja" className={`inline-flex flex-wrap items-baseline ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.rt) {
          return (
            <ruby key={idx} lang="ja" className="font-jp [ruby-position:over] inline-flex flex-col items-center leading-normal">
              {seg.kanji}
              <rp className="text-[0em] opacity-0">{rpStart}</rp>
              <rt className={rtClassName}>{seg.rt}</rt>
              <rp className="text-[0em] opacity-0">{rpEnd}</rp>
            </ruby>
          );
        }
        return <React.Fragment key={idx}>{seg.kanji}</React.Fragment>;
      })}
    </span>
  );
};

export default RubyText;
