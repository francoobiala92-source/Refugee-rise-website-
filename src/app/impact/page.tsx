import type { Metadata } from "next";
import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";
import { figures, grant, sdgs, stories } from "@/content/site";
import { Container, CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Impact",
  description: "Two refugee-owned businesses trading in Kakuma, Ksh 400,000 invested, an Inkomoko FAST grant, and 10–15 more shops planned.",
};

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact & achievements"
        title="Early results, measured honestly."
        intro={`We are early: two businesses open and trading, and ${figures.shopsPlanned} more shops planned. Here is exactly what has been invested, by whom, and on what terms.`}
      />

      <section>
        <Container className="py-20 sm:py-24">
          <dl className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(figures.businesses), "refugee-owned businesses launched"],
              [figures.invested, "invested across both businesses"],
              [figures.grant, "grant from Inkomoko FAST"],
              [figures.shopsPlanned, "more shops planned"],
            ].map(([v, l]) => (
              <div key={l} className="bg-sand-50 p-7">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="display block text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] font-medium whitespace-nowrap text-clay-600">{v}</span>
                  <span className="mt-1 block text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <SectionHead eyebrow="Results so far" title="What has changed." />
            <ul className="space-y-4">
              {[
                "Two refugee entrepreneurs now run businesses that support their families.",
                "A shop-building model that works, from construction to stocking to repayment.",
                "Local jobs for builders, shop attendants and suppliers.",
                "Written agreements that give entrepreneurs clear, fair terms from day one.",
                "Young people in the camp seeing that starting a business is possible.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-lg">
                  <CheckCircle2 aria-hidden className="mt-1 size-5 shrink-0 text-acacia-700" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-sand-100" id="stories">
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="Entrepreneur stories" title="Two businesses, two different starting points." />
          <div className="grid gap-8 lg:grid-cols-2">
            {stories.map((s) => (
              <article key={s.id} className="overflow-hidden rounded-[1.25rem] bg-sand-50">
                <Image src={s.photo} alt={s.photoAlt} width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
                <div className="p-7 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay-600">{s.kind}</p>
                  <h3 className="mt-2 text-3xl font-medium">{s.name}</h3>
                  <p className="text-muted">{s.place}</p>
                  <p className="mt-4 text-lg">{s.summary}</p>
                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    {s.facts.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-3">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-8 rounded-[1.25rem] border border-line p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto]">
            <Award aria-hidden className="size-14 text-ochre-400" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay-600">Recognition · {grant.date}</p>
              <h2 className="mt-2 text-3xl font-medium">{grant.title}</h2>
              <p className="mt-3 max-w-2xl text-muted">{grant.body}</p>
            </div>
            <p className="display text-4xl font-medium text-acacia-700">{grant.amount}</p>
          </div>
        </Container>
      </section>

      <section className="bg-ink text-sand-50">
        <Container className="py-20 sm:py-24">
          <SectionHead light eyebrow="Sustainable Development Goals" title="Where our work contributes." />
          <div className="grid gap-6 md:grid-cols-3">
            {sdgs.map((s) => (
              <div key={s.n} className="rounded-[1.25rem] border border-sand-50/15 p-7">
                <span className="display text-5xl font-light text-ochre-400">{s.n}</span>
                <h3 className="mt-3 text-2xl font-medium">SDG {s.n}: {s.name}</h3>
                <p className="mt-2 text-sand-100/80">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="What’s next" title="Our goals for the years ahead." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Scale up", `Build ${figures.shopsPlanned} more shops across Kakuma and Kalobeyei.`],
              ["Training hub", "A space for business, bookkeeping and financial literacy training."],
              ["Community-led growth", "Entrepreneurs we support become mentors for the next."],
              ["Partnerships", "Work with NGOs, funders and private businesses to grow faster."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[1.25rem] bg-sand-100 p-7">
                <h3 className="text-xl font-medium">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
