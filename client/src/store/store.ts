import { create } from "zustand";

interface AuthState {
  username: string;
}

interface AuthStore {
  auth: AuthState;
  setUserName: (name: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    username: "",
  },
  setUserName: (name) =>
    set((state) => ({
      auth: { ...state.auth, username: name },
    })),
}));
