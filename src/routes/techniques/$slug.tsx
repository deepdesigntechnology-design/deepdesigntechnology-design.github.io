import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { getTechnique, techniques } from "@/lib/content/techniques";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/techniques/$slug")({
  component: TechniquePage,
  head: ({ params }) => {
    const t = getTechnique(params.slug);
    return { meta: [{ title: t ? `${t.title} · ${SITE.title}` : SITE.title }] };
  },
});

function TechniquePage() {
  const { slug } = Route.useParams();
  const t = getTechnique(slug);
  if (!t) throw notFound();

  return (
    <main>
      <PageHero
        kicker={`تکنیک ${faNum(t.number)} از پنج`}
        title={t.title}
        lede={t.summary}
        actions={<BookmarkButton id={`tech-${t.slug}`} label="نشان کردن تکنیک" />}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {t.english ? <p className="text-sm text-subtle">{t.english}</p> : null}
        <h2 className="mt-8 text-lg font-semibold">انواع / زیرشاخه‌ها</h2>
        <ul className="mt-3 space-y-2">
          {t.kinds.map((k) => (
            <li key={k} className="rounded-md border border-border bg-paper px-4 py-3 text-sm">
              {k}
            </li>
          ))}
        </ul>
        <div className="prose-fa mt-8">
          {t.body.map((p) => (
            <p key={p.slice(0, 28)} className="text-[15px] leading-8">
              {p}
            </p>
          ))}
        </div>
        <h2 className="mt-10 text-lg font-semibold">یادداشت کارگاهی</h2>
        <ul className="mt-3 list-disc space-y-2 pr-5 text-sm leading-7 text-muted">
          {t.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-2">
          {techniques.map((x) => (
            <Link
              key={x.slug}
              to="/techniques/$slug"
              params={{ slug: x.slug }}
              className={`rounded-full border px-3 py-2 text-xs font-medium ${
                x.slug === t.slug
                  ? "border-leather bg-leather text-paper"
                  : "border-border bg-paper hover:border-leather/40"
              }`}
            >
              {faNum(x.number)}. {x.title}
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
