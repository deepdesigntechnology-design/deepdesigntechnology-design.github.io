import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { glossary } from "@/lib/content/glossary";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/glossary")({
  component: GlossaryPage,
  head: () => ({ meta: [{ title: `واژه‌نامه · ${SITE.title}` }] }),
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const query = q.trim();
    if (!query) return glossary;
    return glossary.filter((g) =>
      [g.term, g.def, g.use, ...(g.also ?? []), ...(g.banned ?? [])].join(" ").includes(query),
    );
  }, [q]);

  return (
    <main>
      <PageHero
        kicker="ترمینولوژی اصلاح‌شده"
        title="واژه‌نامه تخصصی"
        lede="جهت حفظ یکنواختی متون آموزشی، اصطلاحات زیر در کلیه فصول کتاب رعایت شده و واژه‌های اشتباه کلمه‌به‌کلمه اصلاح گردیده‌اند."
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <label className="block">
          <span className="sr-only">جستجوی واژه</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجو در اصطلاحات کارگاه…"
            className="h-11 w-full rounded-md border border-border bg-paper px-3 text-sm outline-none ring-leather/30 focus:ring-2"
          />
        </label>
        <p className="mt-3 text-xs text-muted">{faNum(items.length)} اصطلاح</p>
        <div className="mt-6 space-y-4">
          {items.map((g) => (
            <article
              key={g.id}
              id={g.id}
              className="scroll-mt-24 rounded-xl border border-border bg-paper p-5"
            >
              <h2 className="text-lg font-semibold">{g.term}</h2>
              {g.also?.length ? (
                <p className="mt-1 text-xs text-subtle">{g.also.join(" · ")}</p>
              ) : null}
              {g.banned?.length ? (
                <p className="mt-2 text-xs text-warn">جایگزین واژه‌های نادرست: {g.banned.join("، ")}</p>
              ) : null}
              <p className="mt-3 text-sm leading-8">{g.def}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{g.use}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
