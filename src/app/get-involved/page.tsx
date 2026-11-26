import type { Metadata } from "next";
import { HeartHandshake, Store, Users } from "lucide-react";
import { figures } from "@/content/site";
import { Button, Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Fund a shop, apply for support as a refugee entrepreneur in Kakuma, or share your skills as a mentor or volunteer.",
};

const sections = [
  {
    id: "partners",
    icon: HeartHandshake,
    label: "Partners & funders",
    title: "Help the loop turn faster.",
    body: [
      `A fully built and stocked shop costs around ${figures.shopCost}. Because it is repaid with a margin, that money goes on to fund the next shop, and the one after that.`,
      "We welcome grants, impact investment, in-kind support (building materials, stock, equipment) and partnerships with NGOs and businesses working in Kakuma.",
    ],
    list: ["Fund a shop", "Co-fund our training hub", "Donate materials or equipment", "Partner on programmes"],
    cta: { label: "Start a partnership conversation", topic: "partner" },
  },
  {
    id: "entrepreneurs",
    icon: Store,
    label: "Refugee entrepreneurs in Kakuma",
    title: "Have a business idea? Let’s talk.",
    body: [
      "We support refugees in Kakuma and Kalobeyei who want to start a business, or grow one they already run, but cannot get finance.",
      `We will talk through your idea, what you need, and a repayment plan you can manage. Plans usually run ${figures.term} and are agreed in writing before anything starts.`,
    ],
    list: ["Women and young people are especially encouraged", "No collateral needed", "Shops on your own plot, or capital for your existing business"],
    cta: { label: "Ask about support", topic: "entrepreneur" },
  },
  {
    id: "volunteers",
    icon: Users,
    label: "Mentors & volunteers",
    title: "Share what you know.",
    body: [
      "Experience in retail, bookkeeping, construction, marketing or business planning can make the difference between a shop that survives and one that grows.",
      "You can mentor an entrepreneur in person in Kakuma or remotely by phone and WhatsApp.",
    ],
    list: ["Business and bookkeeping mentoring", "Construction and site oversight", "Fundraising and communications"],
    cta: { label: "Offer your skills", topic: "volunteer" },
  },
];

export default function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Every shop is built by many hands."
        intro="Whether you fund, build, mentor or run a business, there is a place for you in the loop."
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-clay-600 hover:text-clay-600">
              {s.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {sections.map((s, i) => {
        const Icon = s.icon;
        return (
          <section key={s.id} id={s.id} className={`scroll-mt-24 ${i % 2 === 1 ? "bg-sand-100" : ""}`}>
            <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <Icon aria-hidden className="size-9 text-clay-600" />
                <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-clay-600">{s.label}</p>
                <h2 className="mt-3 text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-medium">{s.title}</h2>
              </div>
              <div>
                <div className="space-y-4 text-lg text-muted">
                  {s.body.map((p) => <p key={p}>{p}</p>)}
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.list.map((l) => (
                    <li key={l} className="rounded-full bg-acacia-700/10 px-4 py-2 text-sm font-medium text-acacia-800">{l}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={`/contact/?topic=${s.cta.topic}`}>{s.cta.label}</Button>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
