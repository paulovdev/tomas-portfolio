import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: {},
  setProject: (slug, data) =>
    set((state) => ({
      projects: { ...state.projects, [slug]: data },
    })),
}));
