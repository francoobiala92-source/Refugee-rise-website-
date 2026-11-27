import type { Metadata } from "next";
import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";
import { figures, grant, sdgs } from "@/content/site";
import { Button, Container, CtaBand, PageHero, SectionHead } from "@/components/ui";
import { CountUp } from "@/components/motion";
import { ProjectsSlider } from "@/components/ProjectsSlider";

export const metadata: Metadata = {
  title: "Impact",
  description: "Three refugee-owned businesses running in Kakuma, Ksh 480,000 invested, an Inkomoko FAST grant, and 10–15 more shops planned.",
};

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact & achievements"
        title="Early results, measured honestly."
        intro={`We are early: three businesses open and running, and ${figures.shopsPlanned} more shops planned. Here is exactly what has been invested, by whom, and on what terms.`}
      >
        <div className="mt-8">
          <Button href="/donate/" variant="donate" arrow={false}>Fund the next business</Button>
        </div>
      </PageHero>

      <section>
        <Container className="py-20 sm:py-24">
          <dl className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(figures.businesses), "refugee-owned businesses launched"],
              [figures.invested, "invested across all three businesses"],
              [figures.grant, "grant from Inkomoko FAST"],
              [figures.shopsPlanned, "more shops planned"],
            ].map(([v, l], i) => (
              <div key={l} data-reveal="zoom" style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="bg-sand-50 p-7">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="display block text-[clamp(1.9rem,1.25rem+1.2vw,2.25rem)] font-medium whitespace-nowrap text-clay-600"><CountUp value={v} /></span>
                  <span className="mt-1 block text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <SectionHead eyebrow="Results so far" title="What has changed." />
            <ul className="space-y-4">
              {[
                "Three refugee entrepreneurs now run businesses that support their families.",
                "A model that works for shops and for transport, from setup to repayment.",
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
          <div data-reveal>
            <SectionHead eyebrow="Entrepreneur stories" title="Three businesses, three different starting points." />
          </div>
          <div data-reveal>
            <ProjectsSlider onSand />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-10 rounded-[1.5rem] border border-line p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal="left">
              <Award aria-hidden className="size-12 text-ochre-400" />
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-clay-600">Recognition · {grant.date}</p>
              <h2 className="mt-2 text-3xl font-medium">{grant.title}</h2>
              <p className="display mt-3 text-4xl font-medium text-acacia-700"><CountUp value={grant.amount} /></p>
              <p className="mt-4 text-muted">{grant.body}</p>
            </div>
            <figure data-reveal="right" className="group">
              <a
                href="/images/inkomoko-certificate.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl shadow-[0_30px_60px_-30px_rgba(23,38,31,0.5)] ring-1 ring-line transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.5deg]"
              >
                <Image
                  src="/images/inkomoko-certificate.jpg"
                  alt="Inkomoko certificate of completion awarded to Ohisa Franco for the Business Accelerator Program (Idea stage track), Fund for Alumni Start-ups in Transition, in partnership with the Mastercard Foundation, May 2025."
                  width={1407}
                  height={717}
                  className="w-full"
                />
              </a>
              <figcaption className="mt-3 text-sm text-muted">
                Certificate of completion, Inkomoko Business Accelerator Program, May 2025. Tap to view full size.
              </figcaption>
            </figure>
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
