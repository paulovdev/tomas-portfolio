import { create } from "zustand";

export const useWorksStore = create((set) => ({
  works: null,
  setWorks: (works) => set({ works }),
}));
