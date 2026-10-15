// ══════════════════════════════════════════════════════════════════
//  KanjiStrokeModal.tsx — Bridge Wrapper to Master KanjiStrokeModal
//  Unifies curriculum interactive stroke animator with KanjiVG SVG engine
// ══════════════════════════════════════════════════════════════════

import React, { useMemo } from 'react';
import { KanjiStrokeModal as MasterKanjiStrokeModal } from '../../kanji/KanjiStrokeModal';
import { MasterKanjiItem } from '../../../lib/data/kanjiManager';
import { useAppStore } from '../../../store/useAppStore';

export interface KanjiDetailInfo {
  kanji: string;
  onyomi?: string[];
  kunyomi?: string[];
  meanings?: string[];
  strokeCount?: number;
  radical?: string;
  grade?: string;
}

interface KanjiStrokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  kanjiInfo?: KanjiDetailInfo | null;
}

export const KanjiStrokeModal: React.FC<KanjiStrokeModalProps> = ({
  isOpen,
  onClose,
  kanjiInfo,
}) => {
  const { openSenseiSheet } = useAppStore();

  const mappedKanji: MasterKanjiItem | null = useMemo(() => {
    if (!kanjiInfo) return null;
    return {
      id: `kanji-${kanjiInfo.kanji}`,
      character: kanjiInfo.kanji,
      unicode: kanjiInfo.kanji.charCodeAt(0).toString(16).toUpperCase(),
      level: 'N5',
      strokes: kanjiInfo.strokeCount || 4,
      grade: 1,
      freq_rank: null,
      radical: {
        character: kanjiInfo.radical || kanjiInfo.kanji,
        number: 1,
        strokes: 1,
        name_ja: '',
        name_id: '',
      },
      readings: {
        onyomi: kanjiInfo.onyomi || [],
        kunyomi: kanjiInfo.kunyomi || [],
      },
      meanings: {
        id: kanjiInfo.meanings || [],
        en: [],
      },
    };
  }, [kanjiInfo]);

  return (
    <MasterKanjiStrokeModal
      isOpen={isOpen}
      onClose={onClose}
      kanji={mappedKanji}
      onAskSensei={(char) => {
        openSenseiSheet({
          id: `kanji-${char}`,
          type: 'kanji',
          level: 'n5',
          target: char,
          meaning_id: kanjiInfo?.meanings?.join(', '),
        });
      }}
    />
  );
};
