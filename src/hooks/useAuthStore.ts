import { create, createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
type AuthState = {
  accessToken: string | undefined;
  actions: {
    setAccessToken: (accessToken: string | undefined) => void;
  };
};

// const defaultAuthState: AuthState = { access: '' };

const useAuthStore = createStore<AuthState>()(
  devtools(
    (set, get) => ({
      accessToken: undefined,

      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          set({ accessToken });
        },
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
