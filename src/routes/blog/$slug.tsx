import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { ArticleCard } from "@/components/article-card";
import { categoryLabel, getPost, posts, readingMinutes } from "@/lib/content/posts";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  head: ({ params }) => {
    const post = getPost(params.slug);
    return {
      meta: [
        { title: post ? `${post.title} · ${SITE.title}` : SITE.title },
        ...(post ? [{ name: "description", content: post.excerpt }] : []),
      ],
    };
  },
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  if (!post) throw notFound();
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;
  const more = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="border-b border-border bg-paper">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
            <p className="text-xs font-medium tracking-wide text-leather">
              {post.kicker} · {categoryLabel(post.category)}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-base leading-8 text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BookmarkButton id={`post-${post.slug}`} label="نشان کردن مطلب" />
              <p className="text-xs text-subtle">
                {faNum(readingMinutes(post))} دقیقه · {post.source}
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
            <figure className="overflow-hidden rounded-xl border border-border">
              <img src={post.cover} alt={post.coverAlt} className="aspect-[16/9] w-full object-cover" />
              <figcaption className="bg-surface px-4 py-3 text-xs leading-6 text-muted">{post.coverAlt}</figcaption>
            </figure>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {post.sections.map((s, i) => (
            <section key={s.heading ?? i} className="prose-fa">
              {s.heading ? <h2 className="mt-10 text-xl font-semibold">{s.heading}</h2> : null}
              {s.quote ? (
                <blockquote className="mt-6 border-r-2 border-leather pr-4 text-[15px] leading-8 text-ink">
                  {s.quote}
                </blockquote>
              ) : null}
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-5 text-[15px] leading-8">
                  {p}
                </p>
              ))}
              {s.list ? (
                <ul className="mt-4 list-disc space-y-2 pr-5 text-[15px] leading-8">
                  {s.list.map((item) => (
                    <li key={item.slice(0, 32)}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {s.warn ? (
                <p className="mt-5 rounded-md border border-warn/25 bg-surface px-4 py-3 text-sm leading-7 text-warn">
                  {s.warn}
                </p>
              ) : null}
            </section>
          ))}

          <p className="mt-12 rounded-md border border-border bg-surface px-4 py-3 text-xs leading-6 text-muted">
            منبع: {post.source}. {SITE.sourceNote}
          </p>

          {post.related.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.related.map((r) => (
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
                to="/blog/$slug"
                params={{ slug: prev.slug }}
                className="flex max-w-[48%] items-center gap-2 text-sm text-muted hover:text-ink"
              >
                <ArrowRight className="size-4 shrink-0" />
                <span>
                  <span className="block text-[11px]">مطلب قبل</span>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to="/blog/$slug"
                params={{ slug: next.slug }}
                className="flex max-w-[48%] items-center gap-2 text-left text-sm text-muted hover:text-ink"
              >
                <span>
                  <span className="block text-[11px]">مطلب بعد</span>
                  {next.title}
                </span>
                <ArrowLeft className="size-4 shrink-0" />
              </Link>
            ) : null}
          </nav>
        </div>
      </article>

      {more.length ? (
        <aside className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h2 className="text-lg font-semibold">از همین بخش</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {more.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
