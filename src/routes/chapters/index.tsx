import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { chapters } from "@/lib/content/chapters";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/chapters/")({
  component: ChaptersIndex,
  head: () => ({ meta: [{ title: `فصول کتاب · ${SITE.title}` }] }),
});

function ChaptersIndex() {
  const theory = chapters.reduce((a, c) => a + c.theory, 0);
  const practice = chapters.reduce((a, c) => a + c.practice, 0);

  return (
    <main>
      <PageHero
        kicker="نقشه راه آموزشی"
        title="چارت ده فصلی کتاب"
        lede={`مجموع دوره ${faNum(theory + practice)} ساعت است: ${faNum(theory)} ساعت نظری و ${faNum(practice)} ساعت عملی. تطبیق با توانایی‌های استاندارد ${SITE.standardCode}.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4">
          {chapters.map((c) => (
            <Link
              key={c.slug}
              to="/chapters/$slug"
              params={{ slug: c.slug }}
              className="rounded-xl border border-border bg-paper p-5 transition-colors hover:border-leather/40 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-medium text-leather">فصل {faNum(c.n)}</p>
                <p className="text-xs tabular-nums text-muted">
                  {faNum(c.theory)} نظری · {faNum(c.practice)} عملی · {faNum(c.total)} ساعت
                </p>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{c.summary}</p>
              <p className="mt-3 text-xs text-subtle">{c.skill}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
