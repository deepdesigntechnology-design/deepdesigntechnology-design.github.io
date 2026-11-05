import { Fragment, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FrameDiagram } from "@/components/mosaic-mark";
import { chapters } from "@/lib/content/chapters";
import { glossary, redLines } from "@/lib/content/glossary";
import {
  chapterRule,
  courseSpec,
  dedication,
  historySplit,
  hse,
  identity,
  intake,
  pathology,
  preface,
  visualArtsQuote,
  visualArtsQuoteExtended,
} from "@/lib/content/identity";
import { cuttingManual, lathe, leathers, tools, transferMethods } from "@/lib/content/materials";
import { chain13, qavam, workshop24 } from "@/lib/content/process";
import { SITE } from "@/lib/content/site";
import { techniques } from "@/lib/content/techniques";
import { faNum } from "@/lib/cn";

export const Route = createFileRoute("/booklet")({
  component: BookletPage,
  head: () => ({
    meta: [
      { title: `جزوه آموزشی فشرده · ${SITE.title}` },
      {
        name: "description",
        content: "جزوه راهبردی و آموزشی فشردهٔ صنعت نوین معرق چرم، قطع آ۵، برگرفته از متن کتاب آمادهٔ چاپ.",
      },
    ],
  }),
});

function mask(text: string) {
  return text.replaceAll("افشین خلیلی", "مولف شیوه");
}

function Sheet({
  tone,
  kicker,
  wm,
  children,
}: {
  tone: "deep" | "leather" | "ink" | "warn";
  kicker: string;
  wm?: string;
  children: ReactNode;
}) {
  return (
    <article className={`sheet tone-${tone}`}>
      {wm ? <div className="sheet-wm" style={{ backgroundImage: `url(${wm})` }} /> : null}
      <header className="sheet-head">
        <span>صنعت نوین معرق چرم</span>
        <span>{kicker}</span>
      </header>
      <div className="sheet-body">{children}</div>
      <footer className="sheet-foot">
        <span>جزوه راهبردی آموزشی · قطع آ۵</span>
        <span className="pg" />
      </footer>
    </article>
  );
}

function Paras({ items }: { items: string[] }) {
  return items.map((text) => (
    <p key={text.slice(0, 48)} className="b-p">
      {mask(text)}
    </p>
  ));
}

function PitchMarks() {
  return (
    <svg viewBox="0 0 320 86" role="img" aria-label="سه شیوه بافت یا پیچ">
      {["نامنظم", "منظم", "درختی"].map((label, row) => (
        <g key={label} transform={`translate(${row * 108},0)`}>
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 14 + i * 14;
            const amp = row === 0 ? 16 + (i % 3) * 4 : row === 1 ? 18 : 10 + (i % 2) * 8;
            return (
              <path
                key={i}
                d={`M${x} 36 c 4 -${amp} 10 -${amp} 10 0 c 0 ${amp - 2} -6 ${amp} -10 0`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            );
          })}
          <text x="46" y="78" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FarsiDiagram() {
  return (
    <svg viewBox="0 0 320 110" role="img" aria-label="فارسی‌بر ۴۵ درجه">
      <polygon points="24,78 150,78 150,28 96,78" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="170,78 296,78 224,28 170,28" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M150 28 L96 78" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2" />
      <text x="70" y="24" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        ۴۵ درجه
      </text>
      <text x="160" y="100" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        نوارهای نسبتاً پهن — اتصال بی‌درز
      </text>
    </svg>
  );
}

function MotabbaqDiagram() {
  return (
    <svg viewBox="0 0 320 120" role="img" aria-label="لایه‌گذاری مطبق">
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={40 + i * 28}
          y={70 - i * 18}
          width={200 - i * 36}
          height="18"
          rx="2"
          fill="currentColor"
          opacity={0.15 + i * 0.18}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      <text x="40" y="110" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        لایهٔ زیرین لویس می‌شود تا ارتفاع ناموزون نشود
      </text>
    </svg>
  );
}

function StripDiagram() {
  return (
    <svg viewBox="0 0 320 118" role="img" aria-label="برش تریشه از لبه چرم، موازی با لبه">
      <rect x="16" y="16" width="200" height="86" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={28 + i * 14} y1="16" x2={28 + i * 14} y2="102" stroke="currentColor" strokeWidth="1" />
      ))}
      <path d="M118 16 L200 70" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.45" />
      <path d="M186 58 l8 4 l-6 2" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <text x="214" y="36" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        موازی لبه
      </text>
      <text x="214" y="58" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        ۱ میلی‌متر
      </text>
      <text x="214" y="86" fontSize="10" fill="currentColor" fontFamily="Vazirmatn, sans-serif" opacity="0.6">
        برش عمود ممنوع
      </text>
    </svg>
  );
}

function MashtehDiagram() {
  return (
    <svg viewBox="0 0 320 100" role="img" aria-label="مشته‌زنی دو مرحله‌ای">
      <rect x="16" y="28" width="130" height="36" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" />
      <rect x="174" y="28" width="130" height="36" rx="2" fill="currentColor" opacity="0.22" stroke="currentColor" />
      <path d="M70 18 v10 M90 14 v14 M110 18 v10" stroke="currentColor" strokeWidth="1.3" />
      <path d="M228 22 v6 M248 24 v4 M268 22 v6" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <text x="81" y="84" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        مرحله اول · ضربه معمولی
      </text>
      <text x="239" y="84" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        مرحله دوم · دونم · آرام
      </text>
    </svg>
  );
}

function ChainBlock({ steps }: { steps: typeof chain13 }) {
  return steps.map((s) => (
    <section key={s.n}>
      <h3 className="b-h2">
        {faNum(s.n)}. {s.title}
      </h3>
      <p className="b-p">{s.goal}</p>
      {s.tools ? <p className="b-small">ابزار و مواد: {s.tools}</p> : null}
      {s.notes ? <p className="b-small">{s.notes}</p> : null}
      {s.errors ? <p className="b-warn">خطای رایج: {s.errors}</p> : null}
    </section>
  ));
}
function RatioDiagram() {
  return (
    <svg viewBox="0 0 320 88" role="img" aria-label="نسبت رزین یک به شش">
      <rect x="16" y="18" width="36" height="48" fill="currentColor" />
      <text x="34" y="80" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        چسب
      </text>
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x={70 + i * 38}
          y="18"
          width="30"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
      <text x="184" y="80" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        آب — نسبت ۱ به ۶
      </text>
    </svg>
  );
}

function BookletPage() {
  const design = chapters.find((c) => c.slug === "design-pattern");
  const visual = chapters.find((c) => c.slug === "visual-arts");
  const history = chapters.find((c) => c.slug === "workshop-history");
  const skiving = chapters.find((c) => c.slug === "skiving");
  const strips = chapters.find((c) => c.slug === "strips");
  const five = chapters.find((c) => c.slug === "five-techniques");
  const assembly = chapters.find((c) => c.slug === "assembly");
  const color = chapters.find((c) => c.slug === "color-resin");
  const studio = chapters.find((c) => c.slug === "studio-project");
  const brand = chapters.find((c) => c.slug === "atelier-brand");

  return (
    <main>
      <div className="no-print mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-sm text-muted">جزوهٔ چاپی قطع آ۵ — برای چاپ، اندازهٔ کاغذ را آ۵ بگذارید.</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-11 items-center rounded-md bg-leather px-4 text-sm font-medium text-paper"
        >
          چاپ جزوه
        </button>
      </div>

      <div className="booklet-stage">
        <article className="sheet cover-sheet">
          <img className="cover-photo" src="/media/806118570.jpg" alt="" />
          <div className="cover-shade" />
          <div className="sheet-body relative z-10 flex min-h-[170mm] flex-col justify-end">
            <p className="text-[8.5pt] tracking-wide text-paper/80">جزوه راهبردی و آموزشی فشرده · قطع آ۵</p>
            <h1 className="b-display mt-3 text-[26pt] text-paper">صنعت نوین معرق چرم</h1>
            <p className="mt-3 max-w-[34ch] text-[11pt] leading-8 text-paper/85">
              فرادهی علمی و عملی شیوه‌های اجرایی، برای هنرجوی حرفه‌ای و علاقه‌مند.
            </p>
            <p className="mt-6 text-[9pt] text-paper/75">
              {SITE.org}
              <br />
              کد استاندارد {SITE.standardCode}
              <br />
              {faNum(SITE.hours.total)} ساعت: {faNum(SITE.hours.theory)} نظری و {faNum(SITE.hours.practice)} عملی
            </p>
          </div>
        </article>

        <Sheet tone="leather" kicker="شناسنامه دوره" wm="/media/ketab-054958.jpg">
          <p className="b-kicker">مرجع آموزشی</p>
          <h2 className="b-h">{courseSpec.title}</h2>
          <table className="b-table">
            <tbody>
              {courseSpec.rows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td>{mask(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="b-h2">ورود کارآموز</h3>
          <ul className="b-ul">
            <li>تحصیلات: {intake.education}</li>
            <li>سلامت: {intake.health}</li>
            <li>مهارت: {intake.skill}</li>
          </ul>
          <h3 className="b-h2">ساختار ده بخشی هر فصل کتاب</h3>
          <ol className="b-ol b-dense">
            {chapterRule.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Sheet>

        <Sheet tone="deep" kicker="تقدیم‌نامه">
          <h2 className="b-h">{dedication.title}</h2>
          <Paras items={dedication.body} />
        </Sheet>

        <Sheet tone="ink" kicker="مقدمه" wm="/media/ketab-060140.jpg">
          <h2 className="b-h">{preface.title}</h2>
          <Paras items={preface.paragraphs.slice(0, 3)} />
        </Sheet>

        <Sheet tone="ink" kicker="مقدمه">
          <h2 className="b-h">ادامهٔ مقدمه</h2>
          <Paras items={preface.paragraphs.slice(3)} />
          <p className="b-small">مخاطب: {identity.audience}</p>
        </Sheet>

        <Sheet tone="leather" kicker="هویت" wm="/media/806022254.jpg">
          <h2 className="b-h">{identity.title}</h2>
          <p className="b-p">{mask(identity.intro)}</p>
          <p className="b-p">{mask(identity.origin)}</p>
          <h3 className="b-h2">اصول مربوط به چرم</h3>
          <ul className="b-ul">
            {identity.leatherRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Sheet>

        <Sheet tone="warn" kicker="تفکیک" wm="/media/ketab-060140.jpg">
          <h2 className="b-h">{historySplit.title}</h2>
          <p className="b-p">{historySplit.lead}</p>
          <table className="b-table">
            <thead>
              <tr>
                <th>حوزه</th>
                <th>دوره</th>
                <th>ماده و اجرا</th>
              </tr>
            </thead>
            <tbody>
              {historySplit.items.map((item) => (
                <tr key={item.era}>
                  <td>{item.era}</td>
                  <td>{mask(item.period)}</td>
                  <td>{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="b-p">{pathology.text}</p>
        </Sheet>

        {visual ? (
          <>
            <Sheet tone="leather" kicker={`فصل ${faNum(visual.n)}`} wm="/media/806121679.jpg">
              <p className="b-kicker">{visual.skill}</p>
              <h2 className="b-h">{visual.title}</h2>
              <p className="b-small">
                {faNum(visual.theory)} ساعت نظری · {faNum(visual.practice)} ساعت عملی
              </p>
              <h3 className="b-h2">اهداف آموزشی</h3>
              <ol className="b-ol">
                {visual.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ol>
              <blockquote className="b-quote">{visualArtsQuote}</blockquote>
              <p className="b-p">{visualArtsQuoteExtended}</p>
            </Sheet>
            <Sheet tone="leather" kicker={`فصل ${faNum(visual.n)}`}>
              <h2 className="b-h">ترکیب‌بندی کلاسیک</h2>
              <figure className="b-fig b-fig-limit">
                <FrameDiagram />
                <figcaption className="b-cap">ترنج تا دو نقطهٔ طلایی، لچک در گوشه‌ها، حاشیه پیرامون کادر.</figcaption>
              </figure>
              <Paras items={visual.body} />
            </Sheet>
          </>
        ) : null}

        {design ? (
          <Sheet tone="ink" kicker={`فصل ${faNum(design.n)}`}>
            <p className="b-kicker">{design.skill}</p>
            <h2 className="b-h">{design.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {design.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={design.body} />
          </Sheet>
        ) : null}

        <Sheet tone="leather" kicker="الگوبرداری">
          <h2 className="b-h">سه روش مجاز انتقال طرح</h2>
          <table className="b-table">
            <thead>
              <tr>
                <th>روش</th>
                <th>ابزار</th>
                <th>اجرا</th>
                <th>نکته</th>
              </tr>
            </thead>
            <tbody>
              {transferMethods.map((m) => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  <td>{m.tools}</td>
                  <td>{m.how}</td>
                  <td>{m.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        {history ? (
          <Sheet tone="deep" kicker={`فصل ${faNum(history.n)}`} wm="/media/ketab-055352.jpg">
            <p className="b-kicker">{history.skill}</p>
            <h2 className="b-h">{history.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {history.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={history.body} />
          </Sheet>
        ) : null}

        <Sheet tone="warn" kicker="خطوط قرمز">
          <h2 className="b-h">خطوط قرمز متریال و روش</h2>
          <ol className="b-ol">
            {redLines.map((r) => (
              <li key={r.title}>
                <strong>{r.title}. </strong>
                {r.text}
              </li>
            ))}
          </ol>
        </Sheet>

        {skiving ? (
          <Sheet tone="ink" kicker={`فصل ${faNum(skiving.n)}`}>
            <p className="b-kicker">{skiving.skill}</p>
            <h2 className="b-h">{skiving.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {skiving.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={skiving.body} />
          </Sheet>
        ) : null}

        {strips ? (
          <>
            <Sheet tone="leather" kicker={`فصل ${faNum(strips.n)}`} wm="/media/806021735.jpg">
              <p className="b-kicker">{strips.skill}</p>
              <h2 className="b-h">{strips.title}</h2>
              <h3 className="b-h2">اهداف آموزشی</h3>
              <ol className="b-ol">
                {strips.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ol>
              <Paras items={strips.body} />
            </Sheet>
            <Sheet tone="ink" kicker="برش تریشه">
              <h2 className="b-h">دستور برش دستی</h2>
              <figure className="b-fig">
                <StripDiagram />
                <figcaption className="b-cap">برش از لبه، موازی با لبه، با عرض برابر. برش عمود بر سطح ممنوع است.</figcaption>
              </figure>
              <ol className="b-ol">
                {cuttingManual.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}. </strong>
                    {s.text}
                  </li>
                ))}
              </ol>
              <h3 className="b-h2">{lathe.title}</h3>
              <ul className="b-ul">
                {lathe.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Sheet>
          </>
        ) : null}

        {five ? (
          <Sheet tone="deep" kicker={`فصل ${faNum(five.n)}`} wm="/media/806008894.jpg">
            <p className="b-kicker">{five.skill}</p>
            <h2 className="b-h">{five.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {five.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={five.body} />
            <figure className="b-fig">
              <PitchMarks />
              <figcaption className="b-cap">سه زیرشاخهٔ بافت یا پیچ: نامنظم، منظم، درختی.</figcaption>
            </figure>
          </Sheet>
        ) : null}

        {techniques.map((t) => (
          <Fragment key={t.slug}>
          <Sheet
            tone={t.number % 2 === 0 ? "ink" : "leather"}
            kicker={`تکنیک ${faNum(t.number)}`}
            wm={t.slug === "pitch" ? "/media/806008894.jpg" : t.slug === "chemistry" ? "/media/806027434.jpg" : undefined}
          >
            <p className="b-kicker">{t.english ?? "شیوه اجرایی"}</p>
            <h2 className="b-h">{t.title}</h2>
            <p className="b-p">{t.summary}</p>
            <h3 className="b-h2">انواع</h3>
            <ul className="b-ul">
              {t.kinds.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
            <Paras items={t.slug === "chemistry" ? t.body.slice(0, 3) : t.body} />
            {t.slug === "farsi-bor" ? (
              <figure className="b-fig">
                <FarsiDiagram />
                <figcaption className="b-cap">زاویه‌تراشی ۴۵ درجه فقط روی نوارهای نسبتاً پهن.</figcaption>
              </figure>
            ) : null}
            {t.slug === "motabbaq" ? (
              <figure className="b-fig">
                <MotabbaqDiagram />
                <figcaption className="b-cap">برجسته‌سازی با اختلاف سطح لایه‌ها.</figcaption>
              </figure>
            ) : null}
            {t.slug === "chemistry" ? null : (
              <>
                <h3 className="b-h2">یادداشت کارگاهی</h3>
                <ul className="b-ul">
                  {t.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}
          </Sheet>
          {t.slug === "chemistry" ? (
            <Sheet tone="warn" kicker="رزین و فام‌بخشی" wm="/media/806027434.jpg">
              <h2 className="b-h">رزین زیرکار و پرداز</h2>
              <Paras items={t.body.slice(3)} />
              <figure className="b-fig">
                <RatioDiagram />
                <figcaption className="b-cap">رزین زیرکار: چسب چوب و آب، نسبت ۱ به ۶.</figcaption>
              </figure>
              <h3 className="b-h2">یادداشت کارگاهی</h3>
              <ul className="b-ul">
                {t.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Sheet>
          ) : null}
          </Fragment>
        ))}

        {assembly ? (
          <Sheet tone="deep" kicker={`فصل ${faNum(assembly.n)}`} wm="/media/806006378.jpg">
            <p className="b-kicker">{assembly.skill}</p>
            <h2 className="b-h">{assembly.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {assembly.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={assembly.body} />
          </Sheet>
        ) : null}

        {(
          [
            [0, 3],
            [3, 6],
            [6, 10],
            [10, 13],
          ] as const
        ).map(([from, to], index) => (
          <Sheet key={from} tone={index % 2 === 0 ? "leather" : "ink"} kicker={`زنجیره ${faNum(index + 1)}`}>
            <h2 className="b-h">{index === 0 ? "سیزده مرحله فنی" : "ادامهٔ زنجیره اجرا"}</h2>
            <ChainBlock steps={chain13.slice(from, to)} />
            {chain13.slice(from, to).some((s) => s.n === 4) ? (
              <figure className="b-fig">
                <MashtehDiagram />
                <figcaption className="b-cap">مشته‌زنی اول بلافاصله پس از نصب؛ مشته‌زنی دوم آرام و در حالت دونم.</figcaption>
              </figure>
            ) : null}
          </Sheet>
        ))}

        <Sheet tone="ink" kicker="قوام‌آوری" wm="/media/806010841.jpg">
          <h2 className="b-h">{qavam.title}</h2>
          <p className="b-p">{qavam.text}</p>
          <ul className="b-ul">
            {qavam.stages.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Sheet>

        <Sheet tone="deep" kicker="روند کارگاهی ۱">
          <h2 className="b-h">بیست‌وچهار مرحلهٔ کارگاه</h2>
          <table className="b-table">
            <thead>
              <tr>
                <th>شماره</th>
                <th>مرحله</th>
                <th>هدف</th>
              </tr>
            </thead>
            <tbody>
              {workshop24.slice(0, 12).map((s) => (
                <tr key={s.n}>
                  <td>{faNum(s.n)}</td>
                  <td>{s.title}</td>
                  <td>{s.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        <Sheet tone="deep" kicker="روند کارگاهی ۲">
          <h2 className="b-h">ادامهٔ بیست‌وچهار مرحله</h2>
          <table className="b-table">
            <thead>
              <tr>
                <th>شماره</th>
                <th>مرحله</th>
                <th>هدف</th>
              </tr>
            </thead>
            <tbody>
              {workshop24.slice(12).map((s) => (
                <tr key={s.n}>
                  <td>{faNum(s.n)}</td>
                  <td>{s.title}</td>
                  <td>{s.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Sheet>

        {color ? (
          <Sheet tone="warn" kicker={`فصل ${faNum(color.n)}`} wm="/media/806027434.jpg">
            <p className="b-kicker">{color.skill}</p>
            <h2 className="b-h">{color.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {color.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={color.body} />
          </Sheet>
        ) : null}

        <Sheet tone="leather" kicker="متریال" wm="/media/806006378.jpg">
          <h2 className="b-h">استاندارد چرم کارگاه</h2>
          <table className="b-table">
            <thead>
              <tr>
                <th>نوع</th>
                <th>واحد</th>
                <th>بسته‌بندی</th>
                <th>کاربرد</th>
              </tr>
            </thead>
            <tbody>
              {leathers.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.unit}</td>
                  <td>{row.pack}</td>
                  <td>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="b-h2">فهرست ابزار</h3>
          <ul className="b-ul">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Sheet>

        {studio ? (
          <Sheet tone="ink" kicker={`فصل ${faNum(studio.n)}`} wm="/media/806118570.jpg">
            <p className="b-kicker">{studio.skill}</p>
            <h2 className="b-h">{studio.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {studio.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={studio.body} />
          </Sheet>
        ) : null}

        {brand ? (
          <Sheet tone="warn" kicker={`فصل ${faNum(brand.n)}`}>
            <p className="b-kicker">{brand.skill}</p>
            <h2 className="b-h">{brand.title}</h2>
            <h3 className="b-h2">اهداف آموزشی</h3>
            <ol className="b-ol">
              {brand.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
            <Paras items={brand.body} />
            <h3 className="b-h2">ایمنی، بهداشت و محیط کارگاه</h3>
            <ul className="b-ul">
              {hse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Sheet>
        ) : null}

        {Array.from({ length: Math.ceil(glossary.length / 4) }, (_, index) => glossary.slice(index * 4, index * 4 + 4)).map(
          (group, index) => (
            <Sheet key={group[0]?.id ?? index} tone="ink" kicker={`واژه‌نامه ${faNum(index + 1)}`}>
              <h2 className="b-h">{index === 0 ? "واژه‌نامه تخصصی" : "ادامهٔ واژه‌نامه"}</h2>
              {group.map((g) => (
                <section key={g.id}>
                  <h3 className="b-h2">{g.term}</h3>
                  {g.banned?.length ? <p className="b-warn">به‌جای: {g.banned.join("، ")}</p> : null}
                  <p className="b-p">{g.def}</p>
                  <p className="b-small">{g.use}</p>
                </section>
              ))}
            </Sheet>
          ),
        )}

        <Sheet tone="deep" kicker="پایان جزوه" wm="/media/806022254.jpg">
          <p className="b-kicker">شناسهٔ مولف شیوه</p>
          <h2 className="b-h">استاد افشین خلیلی</h2>
          <p className="b-p">
            پدیدآورندهٔ شیوه و گردآورندهٔ اصول اجرایی صنعت نوین معرق چرم. {SITE.atelier}.
          </p>
          <p className="b-p">
            این جزوه از کتاب اصلی «صنعت نوین معرق چرم» (معرق‌کاری چرم)، که آمادهٔ چاپ و نشر است، جهت استفاده به‌عنوان
            مرجع فشردهٔ این صنعت تا پیش از نشر رسمی کتاب مورد استفاده قرار می‌گیرد.
          </p>
          <p className="b-small">
            {SITE.org} · کد استاندارد {SITE.standardCode} · دورهٔ {faNum(SITE.hours.total)} ساعت.
          </p>
        </Sheet>
      </div>
    </main>
  );
}
