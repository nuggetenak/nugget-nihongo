// ══════════════════════════════════════════════════════════════════
//  useModalStore.ts — Centralized Modal & Dialog Stacking State
//  Research Basis: ADR-014, Elimination of Arbitrary z-9999 & Multi-Mounts
// ══════════════════════════════════════════════════════════════════

import { create } from 'zustand';
import { NormalizedVocab, NormalizedGrammar } from '../lib/data/dataManager';

export type ModalType =
  | 'detail'
  | 'kana'
  | 'conjugation'
  | 'nuance'
  | 'shortcuts'
  | 'patchNotes'
  | 'kotowaza'
  | 'toolbox'
  | 'catPlacement'
  | 'featureGuide'
  | 'reportIssue'
  | 'auth'
  | 'install'
  | 'streakBroken'
  | 'onboarding';

export interface ModalPropsMap {
  detail: { item: NormalizedVocab | NormalizedGrammar; type: 'vocab' | 'grammar' };
  kana: Record<string, never>;
  conjugation: { initialVerb?: string };
  nuance: Record<string, never>;
  shortcuts: Record<string, never>;
  patchNotes: Record<string, never>;
  kotowaza: Record<string, never>;
  toolbox: Record<string, never>;
  catPlacement: Record<string, never>;
  featureGuide: Record<string, never>;
  reportIssue: {
    itemId?: string;
    itemType?: 'vocab' | 'grammar' | 'quiz' | 'lesson';
    originalJapanese?: string;
    originalTranslation?: string;
  };
  auth: Record<string, never>;
  install: Record<string, never>;
  streakBroken: Record<string, never>;
  onboarding: Record<string, never>;
}

interface ModalState {
  modalStack: Array<{ type: ModalType; props?: any }>;
  openModal: <T extends ModalType>(type: T, props?: ModalPropsMap[T]) => void;
  closeModal: () => void;
  closeAllModals: () => void;
  getActiveModal: () => { type: ModalType; props?: any } | null;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modalStack: [],

  openModal: (type, props) => {
    set((state) => ({
      modalStack: [...state.modalStack, { type, props }],
    }));
  },

  closeModal: () => {
    set((state) => ({
      modalStack: state.modalStack.slice(0, -1),
    }));
  },

  closeAllModals: () => {
    set({ modalStack: [] });
  },

  getActiveModal: () => {
    const stack = get().modalStack;
    return stack.length > 0 ? stack[stack.length - 1] : null;
  },
}));
