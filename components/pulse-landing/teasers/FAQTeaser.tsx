import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TOP_FAQS } from "../faq-data";

export function FAQTeaser() {
  return (
    <section className="border-b border-border bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <span className="pill">FAQs</span>
            <h2 className="heading-display mt-4">
              Common questions, <span className="text-brand">answered honestly.</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {TOP_FAQS.map((f) => (
                <li
                  key={f.q}
                  className="rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] font-medium text-navy sm:px-5"
                >
                  {f.q}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/faqs"
            className="group inline-flex min-h-[54px] shrink-0 items-center gap-2 self-start rounded-md border border-brand/25 bg-soft px-6 py-3.5 text-[15px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white lg:mt-10"
          >
            See all FAQs
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
