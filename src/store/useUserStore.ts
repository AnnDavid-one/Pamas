// src/store/useUserStore.ts
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void; // Updated to accept null for logging out
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  // Set or clear the user data instantly
  setUser: (user) => set({ user }),

  // Simple synchronous cleanup
  logout: () => set({ user: null }),
}));