import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { chapters, getChapter } from "@/lib/content/chapters";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/chapters/$slug")({
  component: ChapterPage,
  head: ({ params }) => {
    const ch = getChapter(params.slug);
    return { meta: [{ title: ch ? `${ch.title} · ${SITE.title}` : SITE.title }] };
  },
});

function ChapterPage() {
  const { slug } = Route.useParams();
  const ch = getChapter(slug);
  if (!ch) throw notFound();
  const idx = chapters.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <main>
      <PageHero
        kicker={`فصل ${faNum(ch.n)} · ${faNum(ch.total)} ساعت`}
        title={ch.title}
        lede={ch.skill}
        actions={<BookmarkButton id={`chapter-${ch.slug}`} label="نشان کردن فصل" />}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm leading-8 text-muted">{ch.summary}</p>
        <h2 className="mt-10 text-lg font-semibold">اهداف آموزشی</h2>
        <ol className="mt-3 space-y-2">
          {ch.goals.map((g, i) => (
            <li key={g} className="flex gap-3 text-sm leading-7">
              <span className="tabular-nums text-muted">{faNum(i + 1)}.</span>
              {g}
            </li>
          ))}
        </ol>
        <div className="prose-fa mt-10">
          {ch.body.map((p) => (
            <p key={p.slice(0, 32)} className="text-[15px] leading-8">
              {p}
            </p>
          ))}
        </div>
        {ch.related.length ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {ch.related.map((r) => (
              <a
                key={r.href}
                href={r.href}
                className="rounded-full border border-border bg-paper px-3 py-2 text-xs font-medium hover:border-leather/40"
              >
                {r.label}
              </a>
            ))}
          </div>
        ) : null}

        <nav className="mt-14 flex items-stretch justify-between gap-3 border-t border-border pt-6">
          {prev ? (
            <Link
              to="/chapters/$slug"
              params={{ slug: prev.slug }}
              className="flex max-w-[48%] items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowRight className="size-4 shrink-0" />
              <span>
                <span className="block text-[11px]">فصل قبل</span>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/chapters/$slug"
              params={{ slug: next.slug }}
              className="flex max-w-[48%] items-center gap-2 text-left text-sm text-muted hover:text-ink"
            >
              <span>
                <span className="block text-[11px]">فصل بعد</span>
                {next.title}
              </span>
              <ArrowLeft className="size-4 shrink-0" />
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
