import create, { SetState } from 'zustand';
import { persist } from 'zustand/middleware';

type taskKeyStore = {
  check: boolean;
  onCheck: (val: boolean) => void;
};

export const useTaskStore = create<taskKeyStore>(
  persist(
    (set) => ({
      check: false,
      onCheck: (val) => set({ check: val }),
    }),
    { name: 'task-list' },
  ),
);
