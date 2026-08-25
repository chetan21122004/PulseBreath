import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ShieldAlert, Stethoscope } from "lucide-react";
import type {
  ProgrammaticSeoPage,
  SeoPageManifest,
  SeoPerson,
  SeoReference,
} from "@/lib/programmatic-seo/types";

export function ProgrammaticSeoPageView({
  page,
  author,
  references,
  relatedPages,
  preview = false,
}: {
  page: ProgrammaticSeoPage;
  author?: SeoPerson;
  references: SeoReference[];
  relatedPages: SeoPageManifest[];
  preview?: boolean;
}) {
  return (
    <article className="bg-background text-navy">
      <header className="border-b border-border/70 bg-[linear-gradient(135deg,var(--background),var(--section-grey))] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-navy/60">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span aria-hidden className="mx-2">/</span>
            <Link href="/rehabilitation" className="hover:text-brand">Rehabilitation guides</Link>
          </nav>
          {preview ? (
            <p className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
              Editorial preview only — this page is excluded from production routes and search indexing until clinical approval.
            </p>
          ) : null}
          <p className="section-label text-[var(--brand-teal-deep)]">{page.content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {page.content.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-navy/75 sm:text-lg">
            {page.content.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-navy/65">
            <span className="rounded-full border border-border bg-white px-3 py-1.5">
              {page.evidence.medicalReview.status === "approved"
                ? "Clinically reviewed health content"
                : "Based on published PulseBreath service information"}
            </span>
            <span className="rounded-full border border-border bg-white px-3 py-1.5">Updated {page.publication.updatedAt}</span>
            <span className="rounded-full border border-border bg-white px-3 py-1.5">{page.locale}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-16">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="key-takeaways" className="rounded-2xl border border-[var(--brand-teal)]/20 bg-[var(--brand-teal-soft)]/35 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-[var(--brand-teal-deep)]" aria-hidden />
              <h2 id="key-takeaways" className="font-display text-2xl font-bold">Key takeaways</h2>
            </div>
            <ul className="mt-5 space-y-3">
              {page.content.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-navy/80">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-teal)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {page.content.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-[1.02rem] leading-8 text-navy/78">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-xl border border-border/70 bg-white p-4 text-sm leading-6 text-navy/75">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section aria-labelledby="safety-heading" className="rounded-2xl border border-red-200 bg-red-50/70 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-red-700" aria-hidden />
              <div>
                <h2 id="safety-heading" className="font-display text-2xl font-bold text-red-950">{page.content.safetyTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-red-900/75">PulseBreath is not an emergency service. Follow your treating clinician&apos;s instructions and use local emergency services for urgent symptoms.</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-red-950/85">
              {page.content.safetyPoints.map((point) => <li key={point}>• {point}</li>)}
            </ul>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-2xl font-bold sm:text-3xl">Questions patients often ask</h2>
            <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
              {page.content.faqs.map((faq) => (
                <details key={faq.question} className="group p-5 sm:p-6">
                  <summary className="cursor-pointer list-none pr-6 font-semibold leading-6 marker:hidden">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-navy/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="sources-heading" className="border-t border-border pt-10">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-[var(--brand-teal-deep)]" aria-hidden />
              <h2 id="sources-heading" className="font-display text-2xl font-bold">Clinical references</h2>
            </div>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-navy/70">
              {references.map((reference) => (
                <li key={reference.id}>
                  <a href={reference.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-teal-deep)] underline decoration-transparent underline-offset-4 hover:decoration-current">
                    {reference.title}
                  </a>{" "}— {reference.publisher}, {reference.publishedYear}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Guide information">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-5 w-5 text-[var(--brand-pink-deep)]" aria-hidden />
              <p className="font-display text-lg font-bold">
                {page.evidence.medicalReview.status === "approved"
                  ? "Clinical authorship"
                  : "Source clinician"}
              </p>
            </div>
            {author ? (
              <div className="mt-4">
                <Link href={author.profilePath} className="font-semibold text-[var(--brand-pink-deep)] hover:underline">
                  {author.name} ({author.honorificSuffix})
                </Link>
                <p className="mt-1 text-sm leading-6 text-navy/65">{author.role}</p>
                {page.evidence.medicalReview.status === "source-content-verified" ? (
                  <p className="mt-2 text-xs leading-5 text-navy/60">
                    This guide was assembled from PulseBreath&apos;s published service information; individual page-level clinical review is not claimed.
                  </p>
                ) : null}
                <ul className="mt-3 space-y-1.5 text-xs leading-5 text-navy/60">
                  {author.credentials.map((credential) => <li key={credential}>• {credential}</li>)}
                </ul>
              </div>
            ) : null}
          </div>

          <nav aria-label="Related reading" className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="font-display text-lg font-bold">Related reading</p>
            <ul className="mt-4 space-y-3">
              {page.links.filter((link) => !link.href.startsWith("/rehabilitation/")).slice(0, 6).map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className="group flex items-start justify-between gap-3 text-sm font-medium leading-6 text-navy/70 hover:text-[var(--brand-teal-deep)]">
                    <span>{link.label}</span><ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
              {relatedPages.map((related) => (
                <li key={related.id}>
                  <Link href={related.path} className="group flex items-start justify-between gap-3 text-sm font-medium leading-6 text-navy/70 hover:text-[var(--brand-teal-deep)]">
                    <span>{related.h1}</span><ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl bg-[var(--brand-dark)] p-6 text-white">
            <p className="font-display text-xl font-bold">{page.content.cta.heading}</p>
            <p className="mt-3 text-sm leading-6 text-white/70">{page.content.cta.body}</p>
            <Link href={page.content.cta.href} className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-pink-deep)]">
              {page.content.cta.label}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
