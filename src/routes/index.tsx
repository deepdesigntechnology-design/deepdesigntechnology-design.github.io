import { createFileRoute, Link } from "@tanstack/react-router";
import { bookChapters, chapterStats } from "@/lib/content/book";
import { useBookProgress } from "@/lib/book-progress";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: `${SITE.title} · درسنامه تعاملی` },
      { name: "description", content: "هسته کامل درسنامه صنعت نوین معرق چرم، بدون تلخیص، با پرسش صحیح و غلط." },
    ],
  }),
});

function Home() {
  const slug = useBookProgress((s) => s.slug);
  const saved = bookChapters.find((c) => c.slug === slug);

  return (
    <main>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-medium tracking-wide text-leather">درسنامه تعاملی · هسته کامل</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{SITE.title}</h1>
            <p className="mt-4 max-w-xl text-sm leading-8 text-muted sm:text-base">
              هشت فصل آموزشی با متن ثابت کتاب: اهداف، درسنامه، کارگاه، پروژه، بانک پرسش و کلید پاسخ. متن خلاصه نشده است.
              کد استاندارد ۱-۰۲-۰۰-۷۷-۶۵۳۷.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/read/$slug"
                params={{ slug: saved?.slug ?? "ch-1" }}
                className="inline-flex h-11 items-center rounded-md bg-leather px-4 text-sm font-medium text-paper"
              >
                {saved ? `ادامه فصل ${faNum(saved.n)}` : "شروع از فصل یک"}
              </Link>
              <Link
                to="/search"
                className="inline-flex h-11 items-center rounded-md border border-border bg-bg px-4 text-sm font-medium"
              >
                جستجو در متن کامل
              </Link>
            </div>
          </div>
          <img
            src="/media/ketab-054958.jpg"
            alt="جلد دست‌نویس کتاب صنعت نوین معرق چرم"
            className="max-h-80 w-full rounded-xl border border-border object-cover object-top"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="text-xl font-semibold">فهرست درسنامه</h2>
        <ol className="mt-5 grid gap-3">
          {bookChapters.map((c) => {
            const st = chapterStats(c);
            return (
              <li key={c.slug}>
                <Link
                  to="/read/$slug"
                  params={{ slug: c.slug }}
                  className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-border bg-paper px-4 py-4 hover:border-leather/40 sm:px-5"
                >
                  <span>
                    <span className="text-xs text-leather">فصل {faNum(c.n)}</span>
                    <span className="mt-1 block text-base font-semibold">{c.title}</span>
                    <span className="mt-1 block text-xs text-muted">{c.kicker}</span>
                  </span>
                  <span className="text-xs text-subtle">
                    {faNum(st.sections)} بخش
                    {st.questions ? ` · ${faNum(st.questions)} پرسش` : ""}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
