import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, HandCoins, HeartHandshake, Store, Users } from "lucide-react";
import { emmanuelRepayment, figures, grant, modelSteps, stories } from "@/content/site";
import { Button, Container, CtaBand, Eyebrow, SectionHead } from "@/components/ui";
import { CountUp, ProgressBar } from "@/components/motion";
import { ProjectsSlider } from "@/components/ProjectsSlider";

export default function Home() {
  const hellen = stories[0];
  const emmanuel = stories.find((s) => s.id === "emmanuel")!;
  const rp = emmanuelRepayment;
  const rpPct = (rp.repaid / rp.total) * 100;
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="rise">
            <Eyebrow>Refugee-led · Kakuma, Kenya</Eyebrow>
            <h1 className="text-[clamp(2.6rem,1.6rem+4.4vw,5rem)] font-medium">
              From zero income to a shop <em className="font-normal italic text-clay-600">of your own.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              We build shops, provide startup capital and agree fair, written repayment plans with refugee
              entrepreneurs. Every repayment funds the next business.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/donate/" variant="donate" arrow={false}>Donate now</Button>
              <Button href="/our-model/" variant="secondary">See how it works</Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-acacia-700 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-acacia-700" />
              </span>
              {figures.businesses} refugee-owned businesses funded and running
            </p>
          </div>
          <figure className="rise relative" style={{ animationDelay: "150ms" }}>
            <Image
              src={hellen.photo}
              alt={hellen.photoAlt}
              width={1600}
              height={1200}
              priority
              className="aspect-[4/3] w-full rounded-[1.25rem] object-cover shadow-[0_30px_60px_-30px_rgba(23,38,31,0.45)]"
            />
            <figcaption className="float-slow absolute -bottom-5 left-5 right-5 rounded-xl bg-sand-50 px-5 py-4 text-sm shadow-lg sm:left-auto sm:max-w-xs">
              <strong className="block font-semibold">Hellen Loki&rsquo;s shop, Kalobeyei</strong>
              <span className="text-muted">Built and stocked by Refugee Rise. Open and trading.</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-sand-100">
        <Container className="py-20 sm:py-24">
          <div data-reveal>
            <SectionHead
              eyebrow="Not aid: self-sustaining businesses"
              title="Talent is everywhere in Kakuma. Capital is not."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: HandCoins, t: "Financial dependency", b: "Many refugees, especially young people and women, rely on aid with no route to their own income." },
              { icon: Briefcase, t: "No access to finance", b: "Without savings, collateral or a trading space, a good business idea never gets started." },
              { icon: Store, t: "What we create instead", b: "A shop, working capital and a clear written agreement: the tools to earn, not just receive." },
            ].map(({ icon: Icon, t, b }, i) => (
              <div
                key={t}
                data-reveal
                style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
                className="rounded-[1.25rem] bg-sand-50 p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <Icon aria-hidden className="size-7 text-clay-600" />
                <h3 className="mt-5 text-2xl font-medium">{t}</h3>
                <p className="mt-3 text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Model */}
      <section>
        <Container className="py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <SectionHead eyebrow="Our model" title="Four steps, one loop that keeps turning." />
            <div className="mb-12"><Button href="/our-model/" variant="secondary">Explore the model</Button></div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {modelSteps.map((s, i) => (
              <li key={s.n} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="bg-sand-50 p-7">
                <span className="display text-4xl font-light text-clay-600">{s.n}</span>
                <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Impact */}
      <section className="bg-ink text-sand-50">
        <Container className="py-20 sm:py-24">
          <div data-reveal>
            <SectionHead light eyebrow="Early impact" title="Building the street, one business at a time." />
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[1.25rem] bg-sand-50/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(figures.businesses), "businesses launched and running"],
              [figures.invested, "invested in refugee-owned businesses"],
              [figures.grant, "Inkomoko FAST grant, with the Mastercard Foundation"],
              [figures.shopsPlanned, "more shops planned"],
            ].map(([v, l], i) => (
              <div key={l} data-reveal="zoom" style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="bg-ink p-7">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="display block text-[clamp(1.9rem,1.25rem+1.2vw,2.25rem)] font-medium whitespace-nowrap text-ochre-400">
                    <CountUp value={v} />
                  </span>
                  <span className="mt-2 block text-sand-100/80">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex items-end justify-between gap-6" data-reveal>
            <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium">The businesses you&rsquo;re backing</h3>
            <p className="hidden max-w-xs text-right text-sm text-sand-100/70 sm:block">Drag, swipe or use the arrows. Each one is repaying into the next.</p>
          </div>
          <div className="mt-6" data-reveal>
            <ProjectsSlider light />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/impact/" variant="light">Read our impact stories</Button>
            <p className="flex items-center gap-2 text-sand-100/80">
              <Award aria-hidden className="size-5 text-ochre-400" />
              {grant.title}, awarded {grant.date}
            </p>
          </div>
        </Container>
      </section>

      {/* Latest business + donate */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
          <figure data-reveal="left" className="zoom-media relative">
            <div className="overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-30px_rgba(23,38,31,0.45)]">
              <Image src={emmanuel.photo} alt={emmanuel.photoAlt} width={1600} height={900} className="aspect-[16/10] w-full object-cover" />
            </div>
            <span className="float-slow absolute -top-4 left-5 rounded-full bg-ochre-400 px-4 py-1.5 text-sm font-semibold text-ink shadow-lg">
              Latest business funded
            </span>
          </figure>
          <div data-reveal="right">
            <Eyebrow>{emmanuel.kind}</Eyebrow>
            <h2 className="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-medium">
              {emmanuel.name} got the keys to his own boda boda.
            </h2>
            <p className="mt-5 text-lg text-muted">{emmanuel.summary}</p>
            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line text-center">
              {[
                ["Invested", "Ksh 80,000"],
                ["Paid back monthly", `Ksh ${rp.monthly.toLocaleString("en-US")}`],
                ["Total to repay", `Ksh ${rp.total.toLocaleString("en-US")}`],
              ].map(([k, v]) => (
                <div key={k} className="bg-sand-50 px-3 py-4">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="display mt-1 text-lg font-semibold text-clay-600 sm:text-xl"><CountUp value={v} /></dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-xl bg-sand-100 p-5">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-semibold">Repaid so far</span>
                <span className="text-muted">since {rp.since}</span>
              </div>
              <div className="mt-3">
                <ProgressBar percent={rpPct} label={`Emmanuel has repaid ${Math.round(rpPct)}%`} />
              </div>
              <p className="mt-2 text-sm">
                <strong className="text-clay-600"><CountUp value={`Ksh ${rp.repaid.toLocaleString("en-US")}`} /></strong>
                {" "}of Ksh {rp.total.toLocaleString("en-US")} ({Math.round(rpPct)}%), on time every month.
              </p>
            </div>
            <p className="mt-6 text-[0.9375rem] text-muted">
              Every shilling Emmanuel repays goes straight into the next business. Your gift starts the same loop for
              the next entrepreneur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/donate/" variant="donate" arrow={false}>Fund the next business</Button>
              <Button href="/impact/#stories" variant="secondary">All stories</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Where you fit */}
      <section>
        <Container className="py-20 sm:py-24">
          <div data-reveal>
            <SectionHead eyebrow="Where you fit in" title="There’s a part for everyone in this loop." />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Store, t: "Entrepreneurs", b: "Have a business idea or a small shop that needs capital to grow? Tell us about it.", href: "/get-involved/#entrepreneurs" },
              { icon: HeartHandshake, t: "Donors & funders", b: `A stocked shop costs around ${figures.shopCost}. Give any amount, and it keeps funding others as it is repaid.`, href: "/donate/" },
              { icon: Users, t: "Mentors & volunteers", b: "Share skills in bookkeeping, retail, construction or business planning.", href: "/get-involved/#volunteers" },
            ].map(({ icon: Icon, t, b, href }, i) => (
              <Link
                key={t}
                href={href}
                data-reveal
                style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
                className="group rounded-[1.25rem] border border-line p-7 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-clay-600 hover:bg-sand-100"
              >
                <Icon aria-hidden className="size-7 text-acacia-700" />
                <h3 className="mt-5 text-2xl font-medium">{t}</h3>
                <p className="mt-3 text-muted">{b}</p>
                <span className="mt-5 inline-block font-semibold text-clay-600 group-hover:underline">Find out more →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
