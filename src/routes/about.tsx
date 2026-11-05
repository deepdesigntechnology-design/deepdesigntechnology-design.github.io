import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  chapterRule,
  courseSpec,
  dedication,
  historySplit,
  hse,
  identity,
  intake,
  pathology,
  preface,
} from "@/lib/content/identity";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: `شناسنامه · ${SITE.title}` }] }),
});

function AboutPage() {
  return (
    <main>
      <PageHero
        kicker="شناسنامه پروژه تدوین کتاب"
        title="هویت صنعت نوین معرق چرم"
        lede={identity.intro}
        actions={<BookmarkButton id="about" label="نشان کردن" />}
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        <figure className="overflow-hidden rounded-xl border border-border bg-paper">
          <img
            src="/media/ketab-054958.jpg"
            alt="جلد دست‌نویس کتاب صنعت نوین معرق چرم"
            className="max-h-[28rem] w-full object-cover object-top"
          />
          <figcaption className="px-4 py-3 text-xs leading-6 text-muted">
            جلد دست‌نویس اثر از آرشیو پروژهٔ تدوین کتاب؛ پدیدآورندهٔ شیوه افشین خلیلی.
          </figcaption>
        </figure>

        <section className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <article className="prose-fa rounded-xl border border-border bg-paper p-6 sm:p-8">
            <h2 className="text-xl font-semibold">{preface.title}</h2>
            {preface.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] leading-8 text-ink">
                {p}
              </p>
            ))}
          </article>
          <aside className="h-fit rounded-xl border border-border bg-paper p-5">
            <p className="text-xs font-medium text-leather">مشخصات دوره</p>
            <dl className="mt-4 space-y-3">
              {courseSpec.rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] text-muted">{row.label}</dt>
                  <dd className="mt-0.5 text-sm leading-6">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section>
          <h2 className="text-xl font-semibold">{historySplit.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-8 text-muted">{historySplit.lead}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {historySplit.items.map((item) => (
              <article key={item.era} className="rounded-lg border border-border bg-paper p-5">
                <h3 className="font-semibold">{item.era}</h3>
                <p className="mt-1 text-xs text-leather">{item.period}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-8 text-muted">{identity.origin}</p>
        </section>

        <section className="rounded-xl border border-border bg-paper p-6 sm:p-8">
          <h2 className="text-xl font-semibold">{dedication.title}</h2>
          {dedication.body.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 text-[15px] leading-8">
              {p}
            </p>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold">اصول مربوط به چرم</h2>
          <ul className="mt-4 space-y-2">
            {identity.leatherRules.map((r) => (
              <li key={r} className="rounded-md border border-border bg-paper px-4 py-3 text-sm leading-7">
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">{pathology.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">{pathology.text}</p>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-muted">{identity.audience}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-paper p-6">
            <h2 className="text-lg font-semibold">ورود کارآموز</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li>تحصیلات: {intake.education}</li>
              <li>سلامت: {intake.health}</li>
              <li>مهارت: {intake.skill}</li>
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-paper p-6">
            <h2 className="text-lg font-semibold">ایمنی کارگاه (HSE)</h2>
            <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-7 text-muted">
              {hse.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        </section>

        <section>
          <h2 className="text-xl font-semibold">ساختار ده بخشی هر فصل</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {chapterRule.map((item, i) => (
              <li key={item} className="flex gap-3 rounded-md border border-border bg-paper px-3 py-3 text-sm">
                <span className="tabular-nums text-muted">{faNum(i + 1)}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
