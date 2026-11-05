import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { cuttingManual, lathe, leathers, tools, transferMethods } from "@/lib/content/materials";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/materials")({
  component: MaterialsPage,
  head: () => ({ meta: [{ title: `متریال و ابزار · ${SITE.title}` }] }),
});

function MaterialsPage() {
  return (
    <main>
      <PageHero
        kicker="کارگاه"
        title="متریال، ابزار و برش"
        lede="چرم طبیعی خام ماده اصلی است. رنگ پس از تثبیت اعمال می‌شود. چرم کفی و کروپون ماده سازه‌ای صنعت نوین‌اند."
        actions={<BookmarkButton id="materials" label="نشان کردن" />}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <figure className="overflow-hidden rounded-xl border border-border">
          <img
            src="/media/806021735.jpg"
            alt="موتیف‌های چرمی بریده‌شده"
            className="max-h-72 w-full object-cover"
          />
          <figcaption className="bg-paper px-4 py-3 text-xs leading-6 text-muted">
            موتیف معمولاً از چرم کفی با پرس یا لیزر بریده می‌شود. تریشه یک میلی‌متری از چرم کفی شتری تهیه می‌گردد.
          </figcaption>
        </figure>

        <section>
          <h2 className="text-xl font-semibold">استاندارد معامله و بسته‌بندی چرم</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-paper">
            <table className="w-full min-w-[36rem] text-right text-sm">
              <thead className="bg-surface text-xs text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">نوع چرم</th>
                  <th className="px-4 py-3 font-medium">واحد معامله</th>
                  <th className="px-4 py-3 font-medium">بسته‌بندی / عدل</th>
                  <th className="px-4 py-3 font-medium">کاربرد در معرق</th>
                </tr>
              </thead>
              <tbody>
                {leathers.map((row) => (
                  <tr key={row.name} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-muted">{row.unit}</td>
                    <td className="px-4 py-3 text-muted">{row.pack}</td>
                    <td className="px-4 py-3 text-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">برش دستی نوارهای یک میلی‌متری</h2>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {cuttingManual.map((s, i) => (
              <li key={s.title} className="rounded-lg border border-border bg-paper p-5">
                <p className="text-xs tabular-nums text-leather">{faNum(i + 1)}</p>
                <h3 className="mt-1 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-border bg-paper p-6">
          <h2 className="text-xl font-semibold">{lathe.title}</h2>
          <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-7 text-muted">
            {lathe.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">روش‌های مجاز انتقال طرح</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {transferMethods.map((m) => (
              <article key={m.name} className="rounded-lg border border-border bg-paper p-5">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="mt-2 text-xs text-leather">{m.tools}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{m.how}</p>
                <p className="mt-3 text-xs leading-6 text-subtle">{m.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">فهرست ابزار کارگاه</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <li key={t} className="rounded-md border border-border bg-paper px-4 py-3 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
