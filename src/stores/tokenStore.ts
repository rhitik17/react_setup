import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TokenState {
  token: string | null;
  setToken: (token: string | null) => void;
  language: string | null;
  setLanguage: (token: string | null) => void;
}

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      language: null,

      setToken: (token) => set({ token }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "disease-token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useTokenStore;

interface UserStore {
  userProfile: {
    id: string | null;
    email: string | null;
    role: string | null;
    name: string | null;
    userHandle: string | null;
    connectedTo: string | null;
    otpVerified: boolean | null;
    token: string | null;
    refreshToken: string | null;
  } | null;

  setUserProfile: (profile: UserStore["userProfile"]) => void;
  removeUserProfile: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      removeUserProfile: () => set({ userProfile: null }),
    }),
    {
      name: "disease-user", // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface EmailState {
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  email: null,
  setEmail: (email: string | null) => set({ email }),
}));
