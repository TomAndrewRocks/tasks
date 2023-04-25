import create from 'zustand';
import { persist } from 'zustand/middleware';

type taskKeyStore = {
  todoTask: string[];
  inProgressTask: string[];
  completedTask: string[];
  addToPending: (id: string) => void;
  addToInProgress: (id: string) => void;
  addToCompleted: (id: string) => void;
  removeFromPending: (id: string) => void;
  removeFromProgress: (id: string) => void;
  removeFromCompleted: (id: string) => void;
};

export const useTaskStore = create<taskKeyStore>(
  persist(
    (set) => ({
      todoTask: [],
      inProgressTask: [],
      completedTask: [],
      addToPending: (id: string) => {
        set((state) => ({
          todoTask: [...state.todoTask, id],
        }));
      },
      addToInProgress: (id: string) => {
        set((state) => ({
          inProgressTask: [...state.inProgressTask, id],
        }));
      },
      addToCompleted: (id: string) => {
        set((state) => ({
          completedTask: [...state.completedTask, id],
        }));
      },
      removeFromPending: (id: string) => {
        set((state) => ({
          todoTask: state.todoTask.filter(
            (idTask) => idTask != id,
          ),
        }));
      },
      removeFromProgress: (id: string) => {
        set((state) => ({
          inProgressTask: state.inProgressTask.filter(
            (idTask) => idTask != id,
          ),
        }));
      },
      removeFromCompleted: (id: string) => {
        set((state) => ({
          completedTask: state.completedTask.filter(
            (idTask) => idTask != id,
          ),
        }));
      },
    }),
    { name: 'task-list' },
  ),
);
