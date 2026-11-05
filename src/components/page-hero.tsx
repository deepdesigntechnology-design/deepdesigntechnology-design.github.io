import type { ReactNode } from "react";
import { PitchOrnament } from "@/components/mosaic-mark";

export function PageHero({
  kicker,
  title,
  lede,
  actions,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-paper">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {kicker ? (
          <p className="text-xs font-medium tracking-wide text-leather">{kicker}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        {lede ? <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{lede}</p> : null}
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        <PitchOrnament className="mt-8 h-10 w-full max-w-md text-leather" />
      </div>
    </section>
  );
}
