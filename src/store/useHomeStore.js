import { create } from "zustand";

export const useHomeStore = create((set) => ({
  media: null,
  setMedia: (media) => set({ media }),
}));
