import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { techniques } from "@/lib/content/techniques";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/techniques/")({
  component: TechniquesIndex,
  head: () => ({ meta: [{ title: `تکنیک‌های پنج‌گانه · ${SITE.title}` }] }),
});

function TechniquesIndex() {
  return (
    <main>
      <PageHero
        kicker="وجه تمایز"
        title="تکنیک‌های پنج‌گانه ابداعی"
        lede="معرق چرم بر خلاف معرق‌های سنتی صلب که متکی بر قطعات مسطح هستند، با این پنج تکنیک دارای ساختار حجمی، پویا و خطوط سیال می‌شود."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <figure className="mb-8 overflow-hidden rounded-xl border border-border">
          <img
            src="/media/806008894.jpg"
            alt="نمای نزدیک بافت نوارهای چرمی"
            className="max-h-72 w-full object-cover"
          />
          <figcaption className="bg-paper px-4 py-3 text-xs leading-6 text-muted">
            اصلی‌ترین وجه تمایز معرق چرم، تکنیک ابداعی بافت یا پیچ است که زمینه‌های منفی را به بافت حجمی بدل می‌کند.
          </figcaption>
        </figure>

        <div className="grid gap-4 md:grid-cols-2">
          {techniques.map((t) => (
            <Link
              key={t.slug}
              to="/techniques/$slug"
              params={{ slug: t.slug }}
              className="rounded-xl border border-border bg-paper p-6 hover:border-leather/40"
            >
              <p className="text-xs tabular-nums text-leather">تکنیک {faNum(t.number)}</p>
              <h2 className="mt-2 text-lg font-semibold">{t.title}</h2>
              {t.english ? <p className="mt-1 text-xs text-subtle">{t.english}</p> : null}
              <p className="mt-3 text-sm leading-7 text-muted">{t.summary}</p>
              <ul className="mt-4 space-y-1 text-xs text-muted">
                {t.kinds.map((k) => (
                  <li key={k}>· {k}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
