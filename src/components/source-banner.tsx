import { SITE } from "@/lib/content/site";

export function SourceBanner() {
  return (
    <p className="border-b border-border bg-surface/70 px-4 py-2.5 text-center text-[12px] leading-6 text-muted sm:text-[13px]">
      {SITE.sourceNote}
    </p>
  );
}
