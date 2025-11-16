import { create } from "zustand";
import { persist } from "zustand/middleware";

const CACHE_DURATION = 10 * 60 * 1000;

export const useWorksStore = create(
  persist(
    (set, get) => ({
      works: null,
      lastFetch: null,

      setWorks: (works) => {
        set({
          works,
          lastFetch: Date.now(),
        });
      },

      isExpired: () => {
        const lastFetch = get().lastFetch;
        if (!lastFetch) return true;

        return Date.now() - lastFetch > CACHE_DURATION;
      },

      clearWorks: () => set({ works: null, lastFetch: null }),
    }),
    {
      name: "works-storage",
      getStorage: () => sessionStorage,
    }
  )
);
