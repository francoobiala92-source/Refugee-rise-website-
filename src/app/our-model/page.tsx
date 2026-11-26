import type { Metadata } from "next";
import Image from "next/image";
import { FileSignature, LineChart, Eye, Repeat } from "lucide-react";
import { figures, modelSteps, stories } from "@/content/site";
import { Container, CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our model",
  description: "How Refugee Rise builds shops and provides capital on fair, written repayment plans, and reinvests every repayment in the next business.",
};

export default function OurModel() {
  return (
    <>
      <PageHero
        eyebrow="Shop-building & business development"
        title="A model where support doesn’t run out."
        intro="Most aid is spent once. Our money is meant to keep moving: each repayment funds the next shop, so one investment helps many entrepreneurs over time."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="The loop" title="Every repayment builds the next shop." />
          <ol className="grid gap-6 sm:grid-cols-2">
            {modelSteps.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-[1.25rem] border border-line p-7">
                <span className="display text-4xl font-light text-clay-600">{s.n}</span>
                <div>
                  <h3 className="text-2xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="Two ways we support a business"
            title="A new shop, or capital to grow an existing one."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                s: stories[0],
                t: "1. Building a new shop",
                points: [
                  "We fund and build a shop on a plot owned by a refugee entrepreneur or community landowner, with detailed invoices for every cost.",
                  "We stock it, and the owner runs the business or rents the shop out.",
                  "Repayments come from the shop’s income until the agreed total is reached.",
                  "Once repaid in full, the shop is formally handed over through a signed agreement.",
                ],
              },
              {
                s: stories[1],
                t: "2. Capital to grow a business",
                points: [
                  "For entrepreneurs who already trade but cannot get finance to grow.",
                  "We fund what the business needs: more stock, a fridge, shelving or equipment.",
                  "Repayments are weekly, monthly or a lump sum, whichever fits the business’s cash flow.",
                  "Items bought with the capital pass to the entrepreneur once the loan is repaid.",
                ],
              },
            ].map(({ s, t, points }) => (
              <article key={t} className="overflow-hidden rounded-[1.25rem] bg-sand-50">
                <Image src={s.photo} alt={s.photoAlt} width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
                <div className="p-7">
                  <h3 className="text-2xl font-medium">{t}</h3>
                  <ul className="mt-4 space-y-3">
                    {points.map((p) => (
                      <li key={p} className="flex gap-3 text-muted">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-clay-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-semibold text-acacia-700">Example: {s.name}, {s.kind.toLowerCase()}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="How repayment works"
            title="Fair terms that build confidence, not debt."
            intro={`The entrepreneur repays the cost plus an agreed ${figures.margin} margin over ${figures.term}. The margin is what funds the next shop. It is never profit taken out of the community.`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FileSignature, t: "Agreed before money moves", b: "Amount, schedule and end date are written and signed by both sides before work starts." },
              { icon: LineChart, t: "Shaped around the business", b: "Payments come from business income, on a schedule the business can actually meet." },
              { icon: Eye, t: "Transparent and accountable", b: "Invoices for every construction cost. Disputes go first to a community mediator." },
              { icon: Repeat, t: "Reinvested, never lost", b: "Every shilling repaid goes into building and stocking the next shop." },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-[1.25rem] border border-line p-7">
                <Icon aria-hidden className="size-7 text-clay-600" />
                <h3 className="mt-5 text-xl font-medium">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{b}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.25rem] bg-acacia-700 p-7 text-sand-50 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ochre-400">Worked example: Hellen’s shop</p>
            <dl className="mt-5 grid gap-6 sm:grid-cols-3">
              {[
                ["Ksh 300,000", "to build and stock the shop"],
                ["Ksh 420,000", "repaid in total (cost + 40%)"],
                ["2 years", "to repay, then the shop is hers"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd><span className="display block text-3xl font-medium">{v}</span><span className="text-sand-100/85">{l}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-sand-100">
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-2">
          <SectionHead eyebrow="Who we support" title="People the financial system leaves out." />
          <div className="space-y-5 text-lg text-muted">
            <p>
              We focus on financially excluded refugees in Kakuma and Kalobeyei, particularly women and young people.
              Some start with no income at all. Others already trade and need capital to grow their stock, income or staff.
            </p>
            <p>
              Beyond the shop and the capital, the model builds financial literacy and an entrepreneurial culture in
              the camp, so businesses keep growing long after the loan is repaid.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
