import type { Metadata } from "next";
import { Suspense } from "react";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container, PageHero } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Refugee Rise Initiative in Kakuma, Kenya by email, phone or WhatsApp.",
};

export default function Contact() {
  const rows = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: site.phone, href: site.whatsappHref },
    { icon: Linkedin, label: "LinkedIn", value: "Refugee Rise Initiative", href: site.linkedin },
    { icon: MapPin, label: "Where we work", value: site.location },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s build something together."
        intro="Funders, partners, entrepreneurs and volunteers: we read and reply to every message."
      />
      <section>
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[1.25rem] bg-sand-100 p-6 sm:p-9">
            <h2 className="mb-6 text-3xl font-medium">Send us a message</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
          <div>
            <h2 className="text-3xl font-medium">Reach us directly</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4 py-5">
                  <Icon aria-hidden className="mt-1 size-5 shrink-0 text-clay-600" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="break-all text-lg font-medium hover:text-clay-600 hover:underline" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
