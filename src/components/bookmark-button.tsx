import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";
import { cn } from "@/lib/cn";

export function BookmarkButton({ id, label }: { id: string; label: string }) {
  const [ready, setReady] = useState(false);
  const has = useBookmarks((s) => s.ids.includes(id));
  const toggle = useBookmarks((s) => s.toggle);

  useEffect(() => {
    setReady(true);
  }, []);

  const on = ready && has;

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors",
        on
          ? "border-leather bg-leather text-paper"
          : "border-border bg-paper text-ink hover:bg-surface",
      )}
      aria-pressed={on}
    >
      <Bookmark className="size-4" strokeWidth={1.75} fill={on ? "currentColor" : "none"} />
      {on ? "نشان‌شده" : label}
    </button>
  );
}
