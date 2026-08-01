import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../api';

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
