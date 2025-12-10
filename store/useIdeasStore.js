import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useIdeasStore = create(
  persist(
    (set) => ({
      page: 1,
      limit: 8,
      sort: "-published_at",

      setPage: (page) => set({ page }),
      setLimit: (limit) => set({ limit }),
      setSort: (sort) => set({ sort }),

      selectedIdea: null,
      setSelectedIdea: (idea) => set({ selectedIdea: idea }),
      clearSelectedIdea: () => set({ selectedIdea: null })
    }),
    {
      name: "ideas-storage", // localStorage key
      partialize: (state) => ({
        page: state.page,
        limit: state.limit,
        sort: state.sort,
        selectedIdea: state.selectedIdea,
      }),
    }
  )
);
