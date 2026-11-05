import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bookChapters, getChapter, type QuizBlock } from "@/lib/content/book";
import { quizKey, useBookProgress } from "@/lib/book-progress";
import { SITE } from "@/lib/content/site";
import { cn, faNum } from "@/lib/cn";

export const Route = createFileRoute("/read/$slug")({
  component: ReadChapter,
  head: ({ params }) => {
    const ch = getChapter(params.slug);
    return { meta: [{ title: ch ? `فصل ${ch.n} · ${ch.title}` : SITE.title }] };
  },
});

function ReadChapter() {
  const { slug } = Route.useParams();
  const ch = getChapter(slug);
  if (!ch) throw notFound();
  const idx = bookChapters.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? bookChapters[idx - 1] : null;
  const next = idx < bookChapters.length - 1 ? bookChapters[idx + 1] : null;
  const font = useBookProgress((s) => s.font);
  const setFont = useBookProgress((s) => s.setFont);
  const open = useBookProgress((s) => s.open);
  const [active, setActive] = useState(ch.sections[0]?.id ?? "");

  useEffect(() => {
    open(slug, active);
  }, [slug, active, open]);

  const style = useMemo(() => ({ fontSize: `${font}px` }), [font]);

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_1fr]">
      <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
        <p className="text-xs font-medium text-leather">فصل {faNum(ch.n)}</p>
        <h1 className="mt-1 text-lg font-semibold leading-snug">{ch.title}</h1>
        <p className="mt-1 text-xs leading-6 text-muted">{ch.kicker}</p>
        <label className="mt-4 block text-xs text-muted">
          بخش
          <select
            className="mt-1 h-11 w-full rounded-md border border-border bg-paper px-2 text-sm text-ink lg:hidden"
            value={active}
            onChange={(e) => {
              setActive(e.target.value);
              document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {ch.sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <nav className="mt-4 hidden space-y-1 lg:block" aria-label="بخش‌های فصل">
          {ch.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActive(s.id)}
              className={cn(
                "block rounded-sm px-2 py-1.5 text-xs leading-5",
                active === s.id ? "bg-surface text-ink" : "text-muted hover:bg-surface/70",
              )}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </aside>

      <article>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">اندازه متن</span>
          {[15, 17, 19].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setFont(n)}
              className={cn(
                "h-11 min-w-11 rounded-md border px-3 text-sm",
                font === n ? "border-leather bg-leather text-paper" : "border-border bg-paper",
              )}
            >
              {faNum(n)}
            </button>
          ))}
        </div>

        <div className="space-y-8" style={style}>
          {ch.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-[1.15em] font-semibold leading-snug">{s.title}</h2>
              <div className="mt-3 space-y-3 leading-8">
                {s.blocks.map((b, i) => {
                  if (b.t === "li") {
                    return (
                      <p key={i} className="border-r-2 border-line pr-3">
                        {b.text}
                      </p>
                    );
                  }
                  if (b.t === "q") {
                    return <Quiz key={i} slug={slug} sectionId={s.id} q={b} />;
                  }
                  return <p key={i}>{b.text}</p>;
                })}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-12 flex items-stretch justify-between gap-3 border-t border-border pt-6 text-sm">
          {prev ? (
            <Link to="/read/$slug" params={{ slug: prev.slug }} className="flex max-w-[48%] items-center gap-2 text-muted">
              <ArrowRight className="size-4 shrink-0" />
              <span>فصل {faNum(prev.n)} · {prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to="/read/$slug" params={{ slug: next.slug }} className="flex max-w-[48%] items-center gap-2 text-left text-muted">
              <span>فصل {faNum(next.n)} · {next.title}</span>
              <ArrowLeft className="size-4 shrink-0" />
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}

function Quiz({ slug, sectionId, q }: { slug: string; sectionId: string; q: QuizBlock }) {
  const key = quizKey(slug, sectionId, q.n);
  const picked = useBookProgress((s) => s.answers[key]);
  const mark = useBookProgress((s) => s.mark);
  const known = q.answer !== null;
  const checked = picked !== undefined;

  return (
    <div className="rounded-lg border border-border bg-paper p-4">
      <p className="text-xs text-leather">پرسش {faNum(q.n)} · صحیح / غلط</p>
      <p className="mt-2 leading-8">{q.text}</p>
      {known ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {[true, false].map((value) => {
            const on = picked === value;
            const right = checked && value === q.answer;
            const wrong = on && value !== q.answer;
            return (
              <button
                key={String(value)}
                type="button"
                onClick={() => mark(key, value)}
                className={cn(
                  "h-11 rounded-md border px-4 text-sm",
                  right && "border-leather bg-leather text-paper",
                  wrong && "border-warn text-warn",
                  !right && !wrong && "border-border bg-bg",
                )}
              >
                {value ? "صحیح" : "غلط"}
              </button>
            );
          })}
          {checked ? (
            <span className="self-center text-xs text-muted">
              {picked === q.answer ? "مطابق کلید فصل" : "با کلید فصل یکی نیست"}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
