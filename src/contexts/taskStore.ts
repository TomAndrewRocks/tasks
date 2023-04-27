import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { api } from '../services/api';

type taskKeyStore = {
  tasks: any;
  todoTaskLength: number;
  todoTasks: string[];
  inProgressTaskLength: number;
  inProgressTasks: string[];
  completedTaskLength: number;
  completedTasks: string[];
  addToPending: () => void;
  removeFromPending: () => void;
  addToInProgress: () => void;
  removeFromInProgress: () => void;
  addToCompleted: () => void;
  removeFromCompleted: () => void;
};

export const useTaskStore = create<taskKeyStore>(
  devtools(
    // persist(
    (set) => ({
      tasks: [],
      todoTaskLength: 0,
      todoTasks: [],
      inProgressTaskLength: 0,
      inProgressTasks: [],
      completedTaskLength: 0,
      completedTasks: [],
      // fetchData: async (url: string) => {
      //   const res = await api.get(url);
      //   set({ tasks: res.data });
      // },
      //  ********** FETCH API METHOD
      addToPending: () => {
        set((state) => ({
          todoTaskLength: state.todoTaskLength + 1,
        }));
      },
      removeFromPending: () => {
        set((state) => ({
          todoTaskLength: state.todoTaskLength - 1,
        }));
      },
      addToInProgress: () => {
        set((state) => ({
          inProgressTaskLength:
            state.inProgressTaskLength + 1,
        }));
      },
      removeFromInProgress: () => {
        set((state) => ({
          inProgressTaskLength:
            state.inProgressTaskLength - 1,
        }));
      },
      addToCompleted: () => {
        set((state) => ({
          completedTaskLength:
            state.completedTaskLength + 1,
        }));
      },
      removeFromCompleted: () => {
        set((state) => ({
          completedTaskLength:
            state.completedTaskLength - 1,
        }));
      },
    }),
    //   { name: 'task-list' },
    // ), ******** state persistence localStorage/AsyncStorage
  ),
);
