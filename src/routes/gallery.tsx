import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { photos } from "@/lib/content/gallery";
import { SITE } from "@/lib/content/site";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({ meta: [{ title: `آثار معرق · ${SITE.title}` }] }),
});

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index === null ? null : photos[index];

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowRight") setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <main>
      <PageHero
        kicker="آرشیو آثار"
        title="آثار معرق، همان‌طور که در عکس هستند"
        lede="فقط عکس آثار معرق کتابخانه اینجاست. چرم خام، ابزار، نمونهٔ رنگ و برگ دست‌نویس کنار گذاشته شده. شرح هر عکس همان چیزی است که در تصویر دیده می‌شود."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-xs text-muted">{faNum(photos.length)} اثر</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((ph, i) => (
            <li key={ph.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="w-full overflow-hidden rounded-xl border border-border bg-paper text-right"
              >
                <img src={ph.src} alt={ph.alt} className="aspect-[4/3] w-full object-cover" />
                <span className="block p-4">
                  <span className="block text-[11px] font-medium text-leather">اثر معرق {faNum(i + 1)}</span>
                  <span className="mt-1 block text-sm leading-7 text-muted">{ph.caption}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && index !== null ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-leather-deep/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          onClick={() => setIndex(null)}
        >
          <figure
            className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-xl bg-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={open.src} alt={open.alt} className="max-h-[62vh] w-full bg-leather-deep object-contain" />
            <figcaption className="p-4 text-sm leading-7">
              <p className="text-[11px] font-medium text-leather">
                اثر {faNum(index + 1)} از {faNum(photos.length)}
              </p>
              <p className="mt-2">{open.caption}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {open.seen.map((item) => (
                  <li key={item} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="h-11 rounded-md border border-border px-4 text-sm"
                  onClick={() => setIndex((index - 1 + photos.length) % photos.length)}
                >
                  قبلی
                </button>
                <button
                  type="button"
                  className="h-11 rounded-md border border-border px-4 text-sm"
                  onClick={() => setIndex((index + 1) % photos.length)}
                >
                  بعدی
                </button>
                <button type="button" className="h-11 px-4 text-sm font-medium text-leather" onClick={() => setIndex(null)}>
                  بستن
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </main>
  );
}
