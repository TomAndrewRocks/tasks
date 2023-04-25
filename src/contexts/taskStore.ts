import create from 'zustand';
import { persist } from 'zustand/middleware';

type taskKeyStore = {
  check: boolean;
  onCheck: () => void;
};

export const useTaskStore = create<taskKeyStore>(
  persist(
    (set) => ({
      check: false,
      onCheck: () =>
        set((state) => ({ check: !state.check })),
    }),
    { name: 'task-list' },
  ),
);
