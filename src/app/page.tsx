import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, HandCoins, HeartHandshake, Store, Users } from "lucide-react";
import { figures, grant, modelSteps, stories } from "@/content/site";
import { Button, Container, CtaBand, Eyebrow, SectionHead } from "@/components/ui";

export default function Home() {
  const hellen = stories[0];
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
              <Button href="/our-model/">See how it works</Button>
              <Button href="/get-involved/" variant="secondary" arrow={false}>Get involved</Button>
            </div>
          </div>
          <figure className="rise relative">
            <Image
              src={hellen.photo}
              alt={hellen.photoAlt}
              width={1600}
              height={1200}
              priority
              className="aspect-[4/3] w-full rounded-[1.25rem] object-cover shadow-[0_30px_60px_-30px_rgba(23,38,31,0.45)]"
            />
            <figcaption className="absolute -bottom-5 left-5 right-5 rounded-xl bg-sand-50 px-5 py-4 text-sm shadow-lg sm:left-auto sm:max-w-xs">
              <strong className="block font-semibold">Hellen Loki&rsquo;s shop, Kalobeyei</strong>
              <span className="text-muted">Built and stocked by Refugee Rise. Open and trading.</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-sand-100">
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="Not aid: self-sustaining businesses"
            title="Talent is everywhere in Kakuma. Capital is not."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: HandCoins, t: "Financial dependency", b: "Many refugees, especially young people and women, rely on aid with no route to their own income." },
              { icon: Briefcase, t: "No access to finance", b: "Without savings, collateral or a trading space, a good business idea never gets started." },
              { icon: Store, t: "What we create instead", b: "A shop, working capital and a clear written agreement: the tools to earn, not just receive." },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-[1.25rem] bg-sand-50 p-7">
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
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow="Our model" title="Four steps, one loop that keeps turning." />
            <div className="mb-12"><Button href="/our-model/" variant="secondary">Explore the model</Button></div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {modelSteps.map((s) => (
              <li key={s.n} className="bg-sand-50 p-7">
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
          <SectionHead light eyebrow="Early impact" title="Building the street, one shop at a time." />
          <dl className="grid gap-px overflow-hidden rounded-[1.25rem] bg-sand-50/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(figures.businesses), "businesses launched and trading"],
              [figures.invested, "invested in refugee-owned businesses"],
              [figures.grant, "Inkomoko FAST grant, with the Mastercard Foundation"],
              [figures.shopsPlanned, "more shops planned"],
            ].map(([v, l]) => (
              <div key={l} className="bg-ink p-7">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="display block text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] font-medium whitespace-nowrap text-ochre-400">{v}</span>
                  <span className="mt-2 block text-sand-100/80">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/impact/" variant="light">Read our impact stories</Button>
            <p className="flex items-center gap-2 text-sand-100/80">
              <Award aria-hidden className="size-5 text-ochre-400" />
              {grant.title}, awarded {grant.date}
            </p>
          </div>
        </Container>
      </section>

      {/* Where you fit */}
      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="Where you fit in" title="There’s a part for everyone in this loop." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Store, t: "Entrepreneurs", b: "Have a business idea or a small shop that needs capital to grow? Tell us about it.", href: "/get-involved/#entrepreneurs" },
              { icon: HeartHandshake, t: "Partners & funders", b: `A stocked shop costs around ${figures.shopCost}. Fund one and it keeps funding others as it is repaid.`, href: "/get-involved/#partners" },
              { icon: Users, t: "Mentors & volunteers", b: "Share skills in bookkeeping, retail, construction or business planning.", href: "/get-involved/#volunteers" },
            ].map(({ icon: Icon, t, b, href }) => (
              <Link key={t} href={href} className="group rounded-[1.25rem] border border-line p-7 transition-colors hover:border-clay-600 hover:bg-sand-100">
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
