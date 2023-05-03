import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IUserStore {
  auth: {
    userEmail: string;
    active: boolean;
  };
  setEmailUser: (email: string) => void;
}

export const useUsersStore = create<IUserStore>(
  devtools(
    persist(
      (set) => ({
        auth: {
          userEmail: '',
          active: false,
        },
        setEmailUser: (email: string) =>
          set((state) => ({
            auth: {
              ...state.auth,
              userEmail: email,
              active: true,
            },
          })),
      }),
      { name: 'auth-store' },
      // ******** state persistence localStorage/AsyncStorage
    ),
  ),
);
