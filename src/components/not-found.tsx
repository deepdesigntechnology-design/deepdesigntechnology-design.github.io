import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-xs font-medium tracking-wide text-leather">صفحه پیدا نشد</p>
      <h1 className="mt-3 text-2xl font-semibold">این مسیر در آرشیو کتاب نیست</h1>
      <p className="mt-3 text-sm leading-8 text-muted">
        مطلب یا فصل موردنظر در پروژهٔ تدوین کتاب ثبت نشده، یا نشانی نادرست است.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-leather px-4 text-sm font-medium text-paper"
      >
        بازگشت به خانه
      </Link>
    </main>
  );
}
