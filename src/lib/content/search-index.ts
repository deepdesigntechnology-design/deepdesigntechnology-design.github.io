import { chapters } from "./chapters";
import { techniques } from "./techniques";
import { glossary, redLines } from "./glossary";
import { workshop24 } from "./process";
import { posts, categoryLabel } from "./posts";

export type SearchHit = {
  href: string;
  kind: string;
  title: string;
  snippet: string;
};

export function searchContent(q: string): SearchHit[] {
  const query = q.trim();
  if (query.length < 2) return [];
  const hits: SearchHit[] = [];

  const match = (text: string) => text.includes(query);

  for (const p of posts) {
    const blob = [
      p.title,
      p.excerpt,
      p.kicker,
      p.source,
      ...p.sections.flatMap((s) => [s.heading ?? "", ...(s.paragraphs ?? []), ...(s.list ?? []), s.quote ?? "", s.warn ?? ""]),
    ].join(" ");
    if (match(blob)) {
      hits.push({
        href: `/blog/${p.slug}`,
        kind: categoryLabel(p.category),
        title: p.title,
        snippet: p.excerpt,
      });
    }
  }

  for (const c of chapters) {
    const blob = [c.title, c.skill, c.summary, ...c.body, ...c.goals].join(" ");
    if (match(blob)) {
      hits.push({
        href: `/chapters/${c.slug}`,
        kind: `فصل ${c.n}`,
        title: c.title,
        snippet: c.summary,
      });
    }
  }

  for (const t of techniques) {
    const blob = [t.title, t.summary, ...t.body, ...t.kinds].join(" ");
    if (match(blob)) {
      hits.push({
        href: `/techniques/${t.slug}`,
        kind: `تکنیک ${t.number}`,
        title: t.title,
        snippet: t.summary,
      });
    }
  }

  for (const g of glossary) {
    const blob = [g.term, g.def, g.use, ...(g.also ?? []), ...(g.banned ?? [])].join(" ");
    if (match(blob)) {
      hits.push({
        href: `/glossary#${g.id}`,
        kind: "واژه",
        title: g.term,
        snippet: g.def,
      });
    }
  }

  for (const s of workshop24) {
    const blob = `${s.title} ${s.goal}`;
    if (match(blob)) {
      hits.push({
        href: `/process#step-${s.n}`,
        kind: `مرحله ${s.n}`,
        title: s.title,
        snippet: s.goal,
      });
    }
  }

  for (const r of redLines) {
    if (match(`${r.title} ${r.text}`)) {
      hits.push({
        href: "/red-lines",
        kind: "خط قرمز",
        title: r.title,
        snippet: r.text,
      });
    }
  }

  return hits.slice(0, 24);
}
