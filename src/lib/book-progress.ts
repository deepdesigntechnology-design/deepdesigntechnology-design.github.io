import { create } from "zustand";
import { persist } from "zustand/middleware";

type Progress = {
  slug: string | null;
  section: string | null;
  font: number;
  answers: Record<string, boolean>;
  open: (slug: string, section?: string) => void;
  setFont: (font: number) => void;
  mark: (key: string, value: boolean) => void;
};

export const useBookProgress = create<Progress>()(
  persist(
    (set) => ({
      slug: null,
      section: null,
      font: 17,
      answers: {},
      open: (slug, section) => set({ slug, section: section ?? null }),
      setFont: (font) => set({ font }),
      mark: (key, value) => set((s) => ({ answers: { ...s.answers, [key]: value } })),
    }),
    { name: "moarraq-book" },
  ),
);

export function quizKey(slug: string, sectionId: string, n: number) {
  return `${slug}:${sectionId}:${n}`;
}
