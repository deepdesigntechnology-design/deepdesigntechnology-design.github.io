import data from "./book.json";

export type TextBlock = { t: "p"; text: string };
export type ListBlock = { t: "li"; text: string };
export type QuizBlock = { t: "q"; n: number; text: string; answer: boolean | null };
export type Block = TextBlock | ListBlock | QuizBlock;

export type BookSection = { id: string; title: string; blocks: Block[] };

export type BookChapter = {
  n: number;
  slug: string;
  title: string;
  kicker: string;
  sections: BookSection[];
};

export const bookChapters = data.chapters as BookChapter[];

export function getChapter(slug: string) {
  return bookChapters.find((c) => c.slug === slug);
}

export function chapterStats(ch: BookChapter) {
  let blocks = 0;
  let questions = 0;
  for (const s of ch.sections) {
    blocks += s.blocks.length;
    questions += s.blocks.filter((b) => b.t === "q").length;
  }
  return { sections: ch.sections.length, blocks, questions };
}
