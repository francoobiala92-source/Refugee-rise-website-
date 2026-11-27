import type { Metadata } from "next";
import { FileText, Repeat, ShieldCheck } from "lucide-react";
import { donate, figures, modelSteps } from "@/content/site";
import { ProjectsSlider } from "@/components/ProjectsSlider";
import { Container, Eyebrow, SectionHead } from "@/components/ui";
import { DonatePanel } from "@/components/DonatePanel";
import { CountUp, ProgressBar } from "@/components/motion";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give by M-Pesa or bank transfer to help refugee entrepreneurs in Kakuma start businesses. Every repayment is reinvested in the next business.",
};

const ksh = (n: number) => `Ksh ${n.toLocaleString("en-US")}`;

export default function Donate() {
  const { goal } = donate;
  const pct = (goal.raised / goal.target) * 100;

  return (
    <>
      {/* Hero + panel */}
      <section className="relative overflow-hidden border-b border-line bg-sand-100">
        <Container className="relative grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(0,30rem)]">
          <div className="rise">
            <Eyebrow>Donate · Refugee Rise Initiative</Eyebrow>
            <h1 className="text-[clamp(2.4rem,1.6rem+3.6vw,4.25rem)] font-medium">
              One gift. <em className="font-normal italic text-clay-600">Many businesses.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              Your donation builds a shop, stocks it or buys the equipment a refugee entrepreneur in Kakuma needs to
              earn. When it is repaid, it funds the next one. Your gift keeps working.
            </p>

            {/* Campaign card */}
            <div className="mt-10 max-w-xl rounded-[1.25rem] bg-ink p-6 text-sand-50 sm:p-7" data-reveal>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ochre-400">Current goal</p>
                {goal.raised > 0 && <p className="text-sm text-sand-100/70">{Math.round(pct)}% funded</p>}
              </div>
              <h2 className="mt-2 text-2xl font-medium">{goal.label}</h2>
              {goal.raised > 0 ? (
                <>
                  <div className="mt-5">
                    <ProgressBar light percent={pct} label={`${goal.label}: ${Math.round(pct)}% funded`} />
                  </div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span><strong className="text-ochre-400"><CountUp value={ksh(goal.raised)} /></strong> raised</span>
                    <span className="text-sand-100/70">Goal {ksh(goal.target)}</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="display mt-4 text-[clamp(2.2rem,1.6rem+2vw,3rem)] font-medium text-ochre-400">
                    <CountUp value={ksh(goal.target)} />
                  </p>
                  <p className="mt-2 text-sand-100/80">
                    To build and fund {figures.shopsPlanned} more refugee-owned businesses in Kakuma. Be one of the
                    first to give.
                  </p>
                </>
              )}
              {goal.raised > 0 && (
                <p className="mt-2 text-sm text-sand-100/70">
                  For {figures.shopsPlanned} more refugee-owned businesses in Kakuma.
                </p>
              )}
            </div>

            <ul className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
              {[
                { icon: Repeat, t: "Reinvested", b: "Repayments fund the next business." },
                { icon: FileText, t: "Written terms", b: "Every plan is agreed and signed." },
                { icon: ShieldCheck, t: "Transparent", b: "Costs invoiced, results reported." },
              ].map(({ icon: Icon, t, b }, i) => (
                <li key={t} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                  <Icon aria-hidden className="size-6 text-acacia-700" />
                  <p className="mt-2 font-semibold">{t}</p>
                  <p className="text-sm text-muted">{b}</p>
                </li>
              ))}
            </ul>
          </div>

          <div id="give" className="rise scroll-mt-24 lg:sticky lg:top-24" style={{ animationDelay: "150ms" }}>
            <DonatePanel />
          </div>
        </Container>
      </section>

      {/* Track record */}
      <section>
        <Container className="py-20 sm:py-24">
          <div data-reveal>
            <SectionHead
              eyebrow="Where gifts have gone"
              title={`${figures.businesses} businesses funded. ${figures.invested} invested.`}
              intro="Each one has a written repayment plan. As it is repaid, the money goes straight into the next business."
            />
          </div>
          <div data-reveal>
            <ProjectsSlider />
          </div>
        </Container>
      </section>

      {/* The loop */}
      <section className="bg-ink text-sand-50">
        <Container className="py-20 sm:py-24">
          <div data-reveal>
            <SectionHead light eyebrow="How your gift multiplies" title="Give once. It keeps turning." />
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modelSteps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
                className="rounded-[1.25rem] border border-sand-50/15 p-6 transition-colors hover:border-ochre-400/60"
              >
                <span className="display text-4xl font-light text-ochre-400">{s.n}</span>
                <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-sand-100/80">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center" data-reveal="zoom">
            <a
              href="#give"
              className="inline-flex min-h-12 items-center rounded-full bg-clay-600 px-7 py-3 font-semibold text-white hover:bg-[#8f3616]"
            >
              Give now
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
