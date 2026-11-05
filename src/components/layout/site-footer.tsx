import { Link } from "@tanstack/react-router";
import { MosaicMark } from "@/components/mosaic-mark";
import { SITE } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-leather-deep text-paper print:hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <MosaicMark className="size-8 text-paper" />
            <p className="font-semibold">{SITE.title}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-paper/75">{SITE.sourceNote}</p>
          <p className="mt-4 text-xs text-paper/55">
            {SITE.author} · {SITE.atelier}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-paper/55">وبلاگ</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/blog" className="hover:underline">
                همه مطالب
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:underline">
                آرشیو عکس کارگاه
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                شناسنامه و هویت
              </Link>
            </li>
            <li>
              <Link to="/glossary" className="hover:underline">
                واژه‌نامه تخصصی
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-paper/55">کتاب و کارگاه</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/chapters" className="hover:underline">
                ده فصل کتاب
              </Link>
            </li>
            <li>
              <Link to="/process" className="hover:underline">
                زنجیره اجرا
              </Link>
            </li>
            <li>
              <Link to="/red-lines" className="hover:underline">
                خطوط قرمز
              </Link>
            </li>
            <li>
              <Link to="/materials" className="hover:underline">
                متریال و ابزار
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 text-center text-[11px] text-paper/50">
        کد استاندارد {SITE.standardCode} · {SITE.org}
      </div>
    </footer>
  );
}
