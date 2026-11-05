import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { searchContent } from "@/lib/content/search-index";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: `جستجو · ${SITE.title}` }] }),
});

function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchContent(q), [q]);

  return (
    <main>
      <PageHero kicker="مرجع" title="جستجو در آرشیو کتاب" lede="جستجو فقط در متون استخراج‌شده از پروژه تدوین کتاب انجام می‌شود." />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <label className="block">
          <span className="sr-only">عبارت جستجو</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder="مثلاً پیچ، دونم، فارسی‌بر، رزین…"
            className="h-12 w-full rounded-md border border-border bg-paper px-4 text-sm outline-none ring-leather/30 focus:ring-2"
          />
        </label>
        <p className="mt-3 text-xs text-muted">
          {q.trim().length < 2 ? "دست‌کم دو نویسه بنویسید." : `${faNum(hits.length)} نتیجه`}
        </p>
        <ul className="mt-6 space-y-3">
          {hits.map((h) => (
            <li key={h.href + h.title}>
              <a
                href={h.href}
                className="block rounded-xl border border-border bg-paper p-4 hover:border-leather/40"
              >
                <p className="text-[11px] text-leather">{h.kind}</p>
                <h2 className="mt-1 font-semibold">{h.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm leading-7 text-muted">{h.snippet}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
