import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { chain13, qavam, workshop24 } from "@/lib/content/process";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({ meta: [{ title: `زنجیره اجرا · ${SITE.title}` }] }),
});

function ProcessPage() {
  return (
    <main>
      <PageHero
        kicker="فرایند کارگاهی"
        title="زنجیره اجرای معرق چرم"
        lede="ترتیب صحیح و تثبیت‌شده باید در تدوین بخش عملی کتاب و آموزش حفظ شود. معرق از اجرای اولیه شروع نمی‌شود."
        actions={<BookmarkButton id="process" label="نشان کردن" />}
      />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6">
        <figure className="overflow-hidden rounded-xl border border-border">
          <img
            src="/media/806006378.jpg"
            alt="قطعات چرمی آویخته در کارگاه پیش از مونتاژ"
            className="max-h-80 w-full object-cover"
          />
          <figcaption className="bg-paper px-4 py-3 text-xs leading-6 text-muted">
            معرق از اجرای اولیه شروع نمی‌شود؛ نخست پایه‌کار آماده می‌گردد و چرم طبیعی خام انتخاب می‌شود.
          </figcaption>
        </figure>

        <section>
          <h2 className="text-xl font-semibold">سیزده مرحله فنی تثبیت‌شده</h2>
          <p className="mt-2 max-w-3xl text-sm leading-8 text-muted">
            آماده‌سازی پایه‌کار ← اعمال چسب ← اجرای اولیه ← قوام‌آوری اولیه ← تکمیل کامل معرق ← رزین زیرکار (۱ به ۶) ←
            قوام‌آوری نهایی در دونم ← خشک‌شدن ← رنگ‌آمیزی ← خشک‌شدن ← خال‌زنی ← خشک‌شدن خال‌ها ← روسازی نهایی.
          </p>
          <ol className="mt-6 space-y-4">
            {chain13.map((s) => (
              <li
                key={s.n}
                id={`chain-${s.n}`}
                className="rounded-xl border border-border bg-paper p-5 sm:p-6"
              >
                <p className="text-xs tabular-nums text-leather">مرحله {faNum(s.n)}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7">{s.goal}</p>
                {s.tools ? <p className="mt-2 text-xs leading-6 text-muted">ابزار و مواد: {s.tools}</p> : null}
                {s.notes ? <p className="mt-2 text-xs leading-6 text-muted">{s.notes}</p> : null}
                {s.errors ? (
                  <p className="mt-2 text-xs leading-6 text-warn">خطای رایج: {s.errors}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-border bg-paper p-6">
          <h2 className="text-xl font-semibold">{qavam.title}</h2>
          <p className="mt-3 text-sm leading-8">{qavam.text}</p>
          <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-7 text-muted">
            {qavam.stages.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">روند بیست‌وچهار مرحله‌ای کارگاهی</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {workshop24.map((s) => (
              <li
                key={s.n}
                id={`step-${s.n}`}
                className="rounded-lg border border-border bg-paper p-4"
              >
                <p className="text-xs tabular-nums text-leather">{faNum(s.n)}</p>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{s.goal}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
