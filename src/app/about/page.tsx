import type { Metadata } from "next";
import Image from "next/image";
import { Award } from "lucide-react";
import { grant, site } from "@/content/site";
import { Container, CtaBand, Eyebrow, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Refugee Rise Initiative is a refugee-led, community-based organisation in Kakuma, Kenya, founded by Ohisa Franco.",
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Led from within the community we serve."
        intro="Refugee Rise Initiative is a refugee-led, community-based organisation in Kakuma, Kenya. We help financially vulnerable refugees become economically independent through business ownership."
      />

      <section>
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-medium">
              It started with one question: what if support didn’t run out?
            </h2>
            <figure data-reveal="left" className="zoom-media relative mt-10 max-w-sm">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.5rem] border-2 border-ochre-400" />
              <div className="relative overflow-hidden rounded-[1.5rem] bg-sand-100">
                <Image
                  src="/images/ohisa-franco.jpg"
                  alt={`${site.founder}, founder of ${site.name}`}
                  width={1205}
                  height={1205}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <figcaption className="relative -mt-8 ml-5 mr-10 rounded-xl bg-ink px-5 py-4 text-sand-50 shadow-lg">
                <p className="display text-xl font-medium">{site.founder}</p>
                <p className="mt-0.5 text-sm text-sand-100/75">Founder · Inkomoko Business Accelerator alumnus, 2025</p>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-5 text-lg text-muted">
            <p>
              Our founder, {site.founder}, saw the same thing again and again in Kakuma: young people and women with real
              business talent, and no way to get started. No savings, no collateral, no trading space, and no bank
              willing to lend.
            </p>
            <p>
              Aid helped people survive, but it was spent once and gone. So Refugee Rise was built around a different idea:
              build a shop, provide the capital, agree a fair repayment plan in writing, and put every repayment into the
              next business. Support that keeps going.
            </p>
            <p>
              In 2025 the initiative was selected for Inkomoko’s Fund for Alumni Start-ups in Transition, supported by the
              Mastercard Foundation. That grant helped fund our first shop. Today three businesses are running, and the next ones
              are planned.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-acacia-700 text-sand-50">
        <Container className="grid gap-10 py-20 sm:py-24 md:grid-cols-2">
          <div>
            <Eyebrow light>Mission</Eyebrow>
            <p className="display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-snug">
              To empower refugees to build income of their own through entrepreneurship, business infrastructure and fair
              access to capital.
            </p>
          </div>
          <div>
            <Eyebrow light>Vision</Eyebrow>
            <p className="display text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)] leading-snug">
              A community-led movement beyond aid, where every refugee who wants to run a business has the means to start one.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="What we stand for" title="Our values." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Dignity", "People are entrepreneurs, not beneficiaries. We build with them, not for them."],
              ["Self-reliance", "The goal is always independence: a business that stands on its own."],
              ["Trust", "Written agreements, open invoices and fair terms, every time."],
              ["Community ownership", "Shops pass to their owners, and repayments stay in the community."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[1.25rem] border border-line p-7">
                <h3 className="text-2xl font-medium">{t}</h3>
                <p className="mt-2 text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="The reality on the ground"
            title="The challenges we’re working through."
            intro="We would rather be honest about these than hide them. Each one is something a partner can help solve."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Funding to meet demand", "Far more entrepreneurs want a shop than we can currently fund."],
              ["A stable, skilled team", "Volunteer turnover is high, and skilled long-term staff are hard to keep."],
              ["Operating in a camp setting", "Working inside a refugee camp means things often take longer to put in place than planned."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-[1.25rem] bg-sand-50 p-7">
                <h3 className="text-xl font-medium">{t}</h3>
                <p className="mt-2 text-muted">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 flex items-center gap-2 text-muted">
            <Award aria-hidden className="size-5 text-ochre-400" />
            Supported by the {grant.title} ({grant.date})
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
