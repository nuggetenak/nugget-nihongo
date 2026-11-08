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
import { ModalErrorBoundary } from '../ui/ModalErrorBoundary';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

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
const StorageEvictionRecoveryModal = React.lazy(() => import('./StorageEvictionRecoveryModal').then(m => ({ default: m.StorageEvictionRecoveryModal })));
const CommunityHubModal = React.lazy(() => import('../community/CommunityHubModal').then(m => ({ default: m.CommunityHubModal })));
const HVPTModal = React.lazy(() => import('../audio/HVPTModal').then(m => ({ default: m.HVPTModal })));
const BadgesModal = React.lazy(() => import('../gamification/BadgesModal').then(m => ({ default: m.BadgesModal })));
const WordLookupSheet = React.lazy(() => import('./WordLookupSheet').then(m => ({ default: m.WordLookupSheet })));

export const GlobalModalManager: React.FC = () => {
  const { modalStack, closeModal, openModal } = useModalStore();

  useBodyScrollLock(modalStack.length > 0);

  // Global Escape key listener to dismiss top modal
  React.useEffect(() => {
    if (modalStack.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalStack.length, closeModal]);

  if (modalStack.length === 0) return null;

  return (
    <React.Suspense fallback={null}>
      {modalStack.map((entry, index) => {
        const isTop = index === modalStack.length - 1;
        const key = `${entry.type}-${index}`;

        switch (entry.type) {
          case 'detail':
            return (
              <ModalErrorBoundary modalName="Detail Kosakata & Pola" key={key} isOpen={isTop} onClose={closeModal}>
                <DetailModal
                  item={entry.props?.item || null}
                  type={entry.props?.type || 'vocab'}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'kana':
            return (
              <ModalErrorBoundary modalName="Tabel Kana" key={key} isOpen={isTop} onClose={closeModal}>
                <KanaChartModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'conjugation':
            return (
              <ModalErrorBoundary modalName="Konjugasi Kata Kerja" key={key} isOpen={isTop} onClose={closeModal}>
                <ConjugationModal
                  isOpen={isTop}
                  onClose={closeModal}
                  initialVerb={entry.props?.initialVerb}
                />
              </ModalErrorBoundary>
            );
          case 'nuance':
            return (
              <ModalErrorBoundary modalName="Perbandingan Nuansa Tata Bahasa" key={key} isOpen={isTop} onClose={closeModal}>
                <NuanceCompareModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'shortcuts':
            return (
              <ModalErrorBoundary modalName="Pintasan Keyboard" key={key} isOpen={isTop} onClose={closeModal}>
                <KeyboardShortcutsModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'patchNotes':
            return (
              <ModalErrorBoundary modalName="Catatan Pembaruan" key={key} isOpen={isTop} onClose={closeModal}>
                <PatchNotesModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'kotowaza':
            return (
              <ModalErrorBoundary modalName="Galeri Peribahasa Kotowaza" key={key} isOpen={isTop} onClose={closeModal}>
                <KotowazaModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'toolbox':
            return (
              <ModalErrorBoundary modalName="Kotak Peralatan Belajar" key={key} isOpen={isTop} onClose={closeModal}>
                <StudyToolboxModal
                  isOpen={isTop}
                  onClose={closeModal}
                  onOpenKana={() => openModal('kana')}
                  onOpenConjugation={() => openModal('conjugation')}
                  onOpenNuance={() => openModal('nuance')}
                  onOpenKotowaza={() => openModal('kotowaza')}
                  onOpenCatPlacement={() => openModal('catPlacement')}
                  onOpenKeigo={() => openModal('keigo')}
                  onOpenCounters={() => openModal('counters')}
                  onOpenPitch={() => openModal('pitch')}
                  onOpenHvpt={() => openModal('hvpt')}
                  onOpenBookStudio={() => useAppStore.getState().openBookStudio()}
                  onOpenFeatureGuide={() => openModal('featureGuide')}
                  onOpenShortcuts={() => openModal('shortcuts')}
                />
              </ModalErrorBoundary>
            );
          case 'catPlacement':
            return (
              <ModalErrorBoundary modalName="Tes Penempatan Adaptif (CAT)" key={key} isOpen={isTop} onClose={closeModal}>
                <CatPlacementModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'keigo':
            return (
              <ModalErrorBoundary modalName="Pelatih Keigo" key={key} isOpen={isTop} onClose={closeModal}>
                <KeigoTrainerModal
                  isOpen={isTop}
                  onClose={closeModal}
                  initialTab={entry.props?.initialTab}
                />
              </ModalErrorBoundary>
            );
          case 'counters':
            return (
              <ModalErrorBoundary modalName="Pelatih Kata Bantu Bilangan" key={key} isOpen={isTop} onClose={closeModal}>
                <CounterTrainerModal
                  isOpen={isTop}
                  onClose={closeModal}
                  initialTab={entry.props?.initialTab}
                />
              </ModalErrorBoundary>
            );
          case 'pitch':
            return (
              <ModalErrorBoundary modalName="Aksen Nada (Pitch Accent)" key={key} isOpen={isTop} onClose={closeModal}>
                <PitchAccentModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'hvpt':
            return (
              <ModalErrorBoundary modalName="Studio Latihan Akustik HVPT" key={key} isOpen={isTop} onClose={closeModal}>
                <HVPTModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'featureGuide':
            return (
              <ModalErrorBoundary modalName="Panduan Fitur" key={key} isOpen={isTop} onClose={closeModal}>
                <FeatureGuideModal
                  isOpen={isTop}
                  onClose={closeModal}
                  onOpenKana={() => openModal('kana')}
                  onOpenConjugation={() => openModal('conjugation')}
                  onOpenNuance={() => openModal('nuance')}
                  onOpenShortcuts={() => openModal('shortcuts')}
                />
              </ModalErrorBoundary>
            );
          case 'reportIssue':
            return (
              <ModalErrorBoundary modalName="Lapor Kesalahan" key={key} isOpen={isTop} onClose={closeModal}>
                <ReportIssueModal
                  isOpen={isTop}
                  onClose={closeModal}
                  context={entry.props}
                />
              </ModalErrorBoundary>
            );
          case 'auth':
            return (
              <ModalErrorBoundary modalName="Autentikasi Akun" key={key} isOpen={isTop} onClose={closeModal}>
                <AuthModal isOpen={isTop} onClose={closeModal} />
              </ModalErrorBoundary>
            );
          case 'install':
            return (
              <ModalErrorBoundary modalName="Instalasi Aplikasi" key={key} isOpen={isTop} onClose={closeModal}>
                <InstallModal isOpen={isTop} onClose={closeModal} />
              </ModalErrorBoundary>
            );
          case 'streakBroken':
            return (
              <ModalErrorBoundary modalName="Peringatan Streak" key={key} isOpen={isTop} onClose={closeModal}>
                <StreakBrokenModal isOpen={isTop} onClose={closeModal} />
              </ModalErrorBoundary>
            );
          case 'onboarding':
            return (
              <ModalErrorBoundary modalName="Tur Pengenalan" key={key} isOpen={isTop} onClose={closeModal}>
                <OnboardingModal isOpen={isTop} onClose={closeModal} />
              </ModalErrorBoundary>
            );
          case 'storageEviction':
            return (
              <ModalErrorBoundary modalName="Pemulihan Penyimpanan" key={key} isOpen={isTop} onClose={closeModal}>
                <StorageEvictionRecoveryModal
                  isOpen={isTop}
                  onClose={closeModal}
                  storageUsageMb={entry.props?.storageUsageMb}
                  storageQuotaMb={entry.props?.storageQuotaMb}
                />
              </ModalErrorBoundary>
            );
          case 'community':
            return (
              <ModalErrorBoundary modalName="Study Lounge & Komunitas" key={key} isOpen={isTop} onClose={closeModal}>
                <CommunityHubModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'badges':
            return (
              <ModalErrorBoundary modalName="Lencana Prestasi" key={key} isOpen={isTop} onClose={closeModal}>
                <BadgesModal
                  isOpen={isTop}
                  onClose={closeModal}
                />
              </ModalErrorBoundary>
            );
          case 'wordLookup':
            return (
              <ModalErrorBoundary modalName="Pencarian Kosakata Cepat" key={key} isOpen={isTop} onClose={closeModal}>
                <WordLookupSheet
                  isOpen={isTop}
                  onClose={closeModal}
                  word={entry.props?.word || ''}
                />
              </ModalErrorBoundary>
            );
          default:
            return null;
        }
      })}
    </React.Suspense>
  );
};
