import { create } from "zustand";
import { persist } from "zustand/middleware";

const CACHE_DURATION = 10 * 60 * 1000;

export const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: {},
      lastFetch: {},
      setProject: (slug, data) => {
        set({
          projects: {
            ...get().projects,
            [slug]: data,
          },
          lastFetch: {
            ...get().lastFetch,
            [slug]: Date.now(),
          },
        });
      },

      isExpired: (slug) => {
        const last = get().lastFetch[slug];
        if (!last) return true;
        return Date.now() - last > CACHE_DURATION;
      },

      clearProject: (slug) => {
        const p = { ...get().projects };
        const l = { ...get().lastFetch };

        delete p[slug];
        delete l[slug];

        set({ projects: p, lastFetch: l });
      },
    }),
    {
      name: "project-storage",
      getStorage: () => sessionStorage,
    }
  )
);
