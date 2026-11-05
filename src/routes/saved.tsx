import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ArticleCard } from "@/components/article-card";
import { useBookmarks } from "@/lib/bookmarks";
import { posts } from "@/lib/content/posts";
import { chapters } from "@/lib/content/chapters";
import { techniques } from "@/lib/content/techniques";
import { SITE } from "@/lib/content/site";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
  head: () => ({ meta: [{ title: `نشان‌شده‌ها · ${SITE.title}` }] }),
});

function SavedPage() {
  const [ready, setReady] = useState(false);
  const ids = useBookmarks((s) => s.ids);
  useEffect(() => setReady(true), []);

  const savedPosts = posts.filter((p) => ids.includes(`post-${p.slug}`));
  const savedChapters = chapters.filter((c) => ids.includes(`chapter-${c.slug}`));
  const savedTechs = techniques.filter((t) => ids.includes(`tech-${t.slug}`));
  const extras = [
    { id: "about", href: "/about", label: "شناسنامه و هویت" },
    { id: "process", href: "/process", label: "زنجیره اجرا" },
    { id: "materials", href: "/materials", label: "متریال و ابزار" },
    { id: "red-lines", href: "/red-lines", label: "خطوط قرمز" },
  ].filter((x) => ids.includes(x.id));

  const empty = ready && ids.length === 0;

  return (
    <main>
      <PageHero
        kicker="مطالعه شخصی"
        title="مطالب نشان‌شده"
        lede="نشان‌ها فقط روی همین دستگاه ذخیره می‌شوند و بخشی از آرشیو کتاب نیستند."
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        {!ready ? <p className="text-sm text-muted">در حال خواندن نشان‌ها…</p> : null}
        {empty ? (
          <p className="rounded-xl border border-border bg-paper p-6 text-sm leading-8 text-muted">
            هنوز مطلبی نشان نشده. از دکمه‌های «نشان کردن» در مطالب، فصول و تکنیک‌ها استفاده کنید.
          </p>
        ) : null}

        {savedPosts.length ? (
          <section>
            <h2 className="text-lg font-semibold">مطالب وبلاگ</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedPosts.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        ) : null}

        {savedChapters.length ? (
          <section>
            <h2 className="text-lg font-semibold">فصول</h2>
            <ul className="mt-4 space-y-2">
              {savedChapters.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/chapters/$slug"
                    params={{ slug: c.slug }}
                    className="block rounded-lg border border-border bg-paper px-4 py-3 text-sm hover:border-leather/40"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {savedTechs.length ? (
          <section>
            <h2 className="text-lg font-semibold">تکنیک‌ها</h2>
            <ul className="mt-4 space-y-2">
              {savedTechs.map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/techniques/$slug"
                    params={{ slug: t.slug }}
                    className="block rounded-lg border border-border bg-paper px-4 py-3 text-sm hover:border-leather/40"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {extras.length ? (
          <section>
            <h2 className="text-lg font-semibold">صفحات مرجع</h2>
            <ul className="mt-4 space-y-2">
              {extras.map((x) => (
                <li key={x.id}>
                  <a
                    href={x.href}
                    className="block rounded-lg border border-border bg-paper px-4 py-3 text-sm hover:border-leather/40"
                  >
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
