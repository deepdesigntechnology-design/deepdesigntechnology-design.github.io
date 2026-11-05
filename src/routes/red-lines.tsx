import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { BookmarkButton } from "@/components/bookmark-button";
import { redLines } from "@/lib/content/glossary";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/red-lines")({
  component: RedLinesPage,
  head: () => ({ meta: [{ title: `خطوط قرمز · ${SITE.title}` }] }),
});

function RedLinesPage() {
  return (
    <main>
      <PageHero
        kicker="آسیب‌شناسی کارگاهی"
        title="خطوط قرمز متریال و روش"
        lede="ممنوعیت‌های مطلق پروژه تدوین کتاب برای حفظ سلامت رخ چرم، جذب رزین و یکنواختی ترمینولوژی."
        actions={<BookmarkButton id="red-lines" label="نشان کردن" />}
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        {redLines.map((r, i) => (
          <article key={r.title} className="rounded-xl border border-warn/25 bg-paper p-5 sm:p-6">
            <p className="text-xs tabular-nums text-warn">{faNum(i + 1)}</p>
            <h2 className="mt-1 text-lg font-semibold">{r.title}</h2>
            <p className="mt-3 text-sm leading-8">{r.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
