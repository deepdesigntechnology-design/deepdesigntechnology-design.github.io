import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArticleCard } from "@/components/article-card";
import { PageHero } from "@/components/page-hero";
import { categories, posts, type CategorySlug } from "@/lib/content/posts";
import { SITE } from "@/lib/content/site";
import { cn, faNum } from "@/lib/cn";

type BlogSearch = { cat?: string };

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
  }),
  head: () => ({ meta: [{ title: `مطالب · ${SITE.title}` }] }),
});

function BlogIndex() {
  const { cat } = Route.useSearch();
  const active = (cat ?? "") as CategorySlug | "";
  const list = useMemo(
    () => (active && categories.some((c) => c.slug === active) ? posts.filter((p) => p.category === active) : posts),
    [active],
  );

  return (
    <main>
      <PageHero
        kicker="وبلاگ مرجع"
        title="مطالب استخراج‌شده از تدوین کتاب"
        lede="هیچ مطلبی خارج از آرشیو پروژهٔ تدوین کتاب «صنعت نوین معرق چرم» در این وبلاگ منتشر نشده است."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/blog"
            search={{ cat: undefined }}
            className={cn(
              "rounded-full border px-3 py-2 text-xs font-medium",
              !active ? "border-leather bg-leather text-paper" : "border-border bg-paper hover:border-leather/40",
            )}
          >
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/blog"
              search={{ cat: c.slug }}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-medium",
                active === c.slug
                  ? "border-leather bg-leather text-paper"
                  : "border-border bg-paper hover:border-leather/40",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">{faNum(list.length)} مطلب</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
