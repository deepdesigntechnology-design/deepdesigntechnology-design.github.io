import { Link } from "@tanstack/react-router";
import { categoryLabel, readingMinutes, type Post } from "@/lib/content/posts";
import { faNum } from "@/lib/cn";

export function ArticleCard({
  post,
  layout = "grid",
}: {
  post: Post;
  layout?: "grid" | "row" | "feature";
}) {
  const minutes = readingMinutes(post);

  if (layout === "feature") {
    return (
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group grid overflow-hidden rounded-xl border border-border bg-paper shadow-soft lg:grid-cols-[1.2fr_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[22rem]">
          <img
            src={post.cover}
            alt={post.coverAlt}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-xs font-medium tracking-wide text-leather">
            {post.kicker} · {categoryLabel(post.category)}
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">{post.title}</h2>
          <p className="mt-3 text-sm leading-8 text-muted">{post.excerpt}</p>
          <p className="mt-5 text-xs text-subtle">
            {faNum(minutes)} دقیقه مطالعه · {post.source}
          </p>
        </div>
      </Link>
    );
  }

  if (layout === "row") {
    return (
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group flex gap-4 rounded-lg border border-border bg-paper p-3 transition-colors hover:border-leather/35"
      >
        <img
          src={post.cover}
          alt={post.coverAlt}
          className="size-24 shrink-0 rounded-md object-cover sm:size-28"
        />
        <div className="min-w-0 py-0.5">
          <p className="text-[11px] font-medium text-leather">{categoryLabel(post.category)}</p>
          <h3 className="mt-1 text-base font-semibold leading-snug">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-7 text-muted">{post.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-paper transition-colors hover:border-leather/35"
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={post.cover}
          alt={post.coverAlt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-medium tracking-wide text-leather">
          {categoryLabel(post.category)} · {faNum(minutes)} دقیقه
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-7 text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
