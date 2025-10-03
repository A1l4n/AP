import { create } from 'zustand';

interface UserState {
  userId?: string;
  email?: string;
  setUser: (u: { userId: string; email: string }) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: undefined,
  email: undefined,
  setUser: (u) => set({ userId: u.userId, email: u.email }),
  clear: () => set({ userId: undefined, email: undefined }),
}));
