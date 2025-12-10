import { create } from "zustand";
export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  isRtl: false,
  setRtl: (value) => set({ isRtl: value }),
}));
