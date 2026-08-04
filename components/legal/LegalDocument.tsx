import type { ReactNode } from 'react';

type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
  extra?: ReactNode;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalDocument({ eyebrow, title, summary, updated, sections }: LegalDocumentProps) {
  return (
    <article className="bma-section relative overflow-hidden pt-36 sm:pt-44">
      <div className="bma-grid-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="bma-container relative">
        <header className="max-w-4xl border-b border-white/10 pb-12 sm:pb-16">
          <p className="bma-kicker">{eyebrow}</p>
          <h1 className="bma-display mt-5 text-[clamp(3.4rem,9vw,7.5rem)]">{title}</h1>
          <p className="bma-lede mt-7 max-w-3xl">{summary}</p>
          <p className="mt-7 font-label text-xs uppercase tracking-[0.18em] text-white/38">{updated}</p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[14rem_minmax(0,46rem)] lg:gap-20">
          <nav aria-label={title} className="hidden lg:block">
            <ol className="sticky top-32 space-y-3 border-l border-white/10 pl-5 text-sm text-white/45">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a className="transition hover:text-[#f0a539]" href={`#legal-${index + 1}`}>
                    {String(index + 1).padStart(2, '0')} · {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14 sm:space-y-18">
            {sections.map((section, index) => (
              <section id={`legal-${index + 1}`} key={section.title} className="scroll-mt-32 border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
                <div className="grid gap-5 sm:grid-cols-[3rem_1fr]">
                  <span className="font-label text-xs tracking-[0.2em] text-[#f0a539]/60">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="text-balance font-headline text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">{section.title}</h2>
                    <div className="mt-5 space-y-4 text-[1.02rem] leading-8 text-white/62">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      {section.items && (
                        <ul className="space-y-3 border-l border-white/10 pl-5">
                          {section.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                      {section.extra}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
