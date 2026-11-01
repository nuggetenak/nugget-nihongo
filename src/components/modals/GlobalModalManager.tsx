// ══════════════════════════════════════════════════════════════════
//  GlobalModalManager.tsx — Centralized Root-Level Modal Coordinator
//  Research Basis: Ticket T-42, Elimination of Nested Dialog Portals
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { useModalStore } from '../../store/useModalStore';
import { DetailModal } from '../ui/DetailModal';
import { KeyboardShortcutsModal } from '../ui/KeyboardShortcutsModal';
import { FeatureGuideModal } from '../ui/FeatureGuideModal';
import { AuthModal } from '../auth/AuthModal';
import { InstallModal } from '../ui/InstallModal';
import { StreakBrokenModal } from '../gamification/StreakBrokenModal';
import { OnboardingModal } from '../onboarding/OnboardingModal';

// Lazy-loaded heavy modals with chunk splitting (Ticket T-232)
const KanaChartModal = React.lazy(() => import('../kana/KanaChartModal').then(m => ({ default: m.KanaChartModal })));
const ConjugationModal = React.lazy(() => import('../grammar/ConjugationModal').then(m => ({ default: m.ConjugationModal })));
const NuanceCompareModal = React.lazy(() => import('../grammar/NuanceCompareModal').then(m => ({ default: m.NuanceCompareModal })));
const PatchNotesModal = React.lazy(() => import('../ui/PatchNotesModal').then(m => ({ default: m.PatchNotesModal })));
const KotowazaModal = React.lazy(() => import('../kotowaza/KotowazaModal').then(m => ({ default: m.KotowazaModal })));
const StudyToolboxModal = React.lazy(() => import('../tools/StudyToolboxModal').then(m => ({ default: m.StudyToolboxModal })));
const CatPlacementModal = React.lazy(() => import('../cat/CatPlacementModal').then(m => ({ default: m.CatPlacementModal })));
const KeigoTrainerModal = React.lazy(() => import('../keigo/KeigoTrainerModal').then(m => ({ default: m.KeigoTrainerModal })));
const CounterTrainerModal = React.lazy(() => import('../counters/CounterTrainerModal').then(m => ({ default: m.CounterTrainerModal })));
const PitchAccentModal = React.lazy(() => import('../pitch/PitchAccentModal').then(m => ({ default: m.PitchAccentModal })));
const ReportIssueModal = React.lazy(() => import('../ui/ReportIssueModal').then(m => ({ default: m.ReportIssueModal })));

export const GlobalModalManager: React.FC = () => {
  const { modalStack, closeModal, openModal } = useModalStore();

  if (modalStack.length === 0) return null;

  return (
    <React.Suspense fallback={null}>
      {modalStack.map((entry, index) => {
        const isTop = index === modalStack.length - 1;
        const key = `${entry.type}-${index}`;

        switch (entry.type) {
          case 'detail':
            return (
              <DetailModal
                key={key}
                item={entry.props?.item || null}
                type={entry.props?.type || 'vocab'}
                onClose={closeModal}
              />
            );
          case 'kana':
            return (
              <KanaChartModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'conjugation':
            return (
              <ConjugationModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
                initialVerb={entry.props?.initialVerb}
              />
            );
          case 'nuance':
            return (
              <NuanceCompareModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'shortcuts':
            return (
              <KeyboardShortcutsModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'patchNotes':
            return (
              <PatchNotesModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'kotowaza':
            return (
              <KotowazaModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'toolbox':
            return (
              <StudyToolboxModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
                onOpenKana={() => openModal('kana')}
                onOpenConjugation={() => openModal('conjugation')}
                onOpenNuance={() => openModal('nuance')}
                onOpenKotowaza={() => openModal('kotowaza')}
                onOpenCatPlacement={() => openModal('catPlacement')}
                onOpenKeigo={() => openModal('keigo')}
                onOpenCounters={() => openModal('counters')}
                onOpenFeatureGuide={() => openModal('featureGuide')}
                onOpenShortcuts={() => openModal('shortcuts')}
              />
            );
          case 'catPlacement':
            return (
              <CatPlacementModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'keigo':
            return (
              <KeigoTrainerModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'counters':
            return (
              <CounterTrainerModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'pitch':
            return (
              <PitchAccentModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
              />
            );
          case 'featureGuide':
            return (
              <FeatureGuideModal
                key={key}
                onOpenKana={() => openModal('kana')}
                onOpenConjugation={() => openModal('conjugation')}
                onOpenNuance={() => openModal('nuance')}
                onOpenShortcuts={() => openModal('shortcuts')}
              />
            );
          case 'reportIssue':
            return (
              <ReportIssueModal
                key={key}
                isOpen={isTop}
                onClose={closeModal}
                context={entry.props}
              />
            );
          case 'auth':
            return <AuthModal key={key} />;
          case 'install':
            return <InstallModal key={key} />;
          case 'streakBroken':
            return <StreakBrokenModal key={key} />;
          case 'onboarding':
            return <OnboardingModal key={key} />;
          default:
            return null;
        }
      })}
    </React.Suspense>
  );
};
