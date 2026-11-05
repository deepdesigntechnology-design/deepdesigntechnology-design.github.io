import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Menu, Search, X } from "lucide-react";
import { MosaicMark } from "@/components/mosaic-mark";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/content/site";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/booklet", label: "جزوه" },
  { to: "/blog", label: "مطالب" },
  { to: "/chapters", label: "کتاب" },
  { to: "/techniques", label: "تکنیک‌ها" },
  { to: "/process", label: "کارگاه" },
  { to: "/gallery", label: "آرشیو عکس" },
  { to: "/glossary", label: "واژه‌نامه" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-ink">
          <MosaicMark className="size-9 shrink-0 text-leather" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight">{SITE.shortTitle}</span>
            <span className="hidden text-[11px] text-muted sm:block">وبلاگ مرجع تدوین کتاب</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-sm px-2.5 py-2 text-[13px] font-medium transition-colors duration-150",
                  active ? "bg-surface text-ink" : "text-muted hover:bg-surface/70 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/saved"
            aria-label="نشان‌شده‌ها"
            className="grid size-11 place-items-center rounded-sm text-ink hover:bg-surface"
          >
            <Bookmark className="size-4" strokeWidth={1.75} />
          </Link>
          <Link
            to="/search"
            aria-label="جستجو"
            className="grid size-11 place-items-center rounded-sm text-ink hover:bg-surface"
          >
            <Search className="size-4" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-sm text-ink hover:bg-surface lg:hidden"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-paper px-4 py-3 lg:hidden">
          <nav className="grid gap-1" aria-label="منوی موبایل">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-surface"
            >
              شناسنامه
            </Link>
            <Link
              to="/red-lines"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-surface"
            >
              خطوط قرمز
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
