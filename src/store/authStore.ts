// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from './useUserStore';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  initialize: () => void; // Changed from Promise<void> since it's no longer fetching data directly
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,

      setToken: (token) => set({ token }),

      /**
       * Checks the URL for an OAuth token, saves it, and cleans the URL.
       * TanStack Query will automatically detect the token change and fetch the user profile.
       */
      initialize: () => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');

        if (tokenFromUrl) {
          set({ token: tokenFromUrl });
          localStorage.setItem('token', tokenFromUrl);

          // Clean up the URL query parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Redirect unauthenticated traffic if they aren't on the login/signup page
        const isAuthPage = window.location.pathname === "/login" || window.location.pathname === "/signup";
        if (!get().token && !isAuthPage) {
          window.location.href = "/signup";
        }
      },

      logout: () => {
        set({ token: null }); // Clear token in Zustand
        useUserStore.getState().logout(); // Clear user data in userStore

        if (typeof window !== 'undefined') {
          localStorage.removeItem('token'); 
          localStorage.removeItem('auth-storage'); 
          window.location.href = '/'; // Redirect to home
        }
      }
    }),
    {
      name: 'auth-storage', // Keeps the token persistent in localStorage across reloads
    }
  )
);