import Link from "next/link";
import { Heart, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { nav, site, sdgs } from "@/content/site";
import { Container, LogoMark } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-sand-100">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="rounded-lg bg-sand-50 p-1"><LogoMark className="size-8" /></span>
            <span className="display text-xl font-semibold text-sand-50">{site.name}</span>
          </div>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ochre-400">{site.tagline}</p>
          <p className="mt-5 max-w-sm text-sand-100/80">
            A refugee-led, community-based organisation helping refugees in Kakuma build businesses of their own.
          </p>
          <Link
            href="/donate/"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-clay-600 px-5 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#8f3616]"
          >
            <Heart aria-hidden className="size-4 fill-white" />
            Donate
          </Link>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-50">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sand-100/80 hover:text-sand-50 hover:underline">{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-50">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sand-100/80">
            <li className="flex gap-3"><MapPin aria-hidden className="mt-1 size-4 shrink-0 text-ochre-400" />{site.location}</li>
            <li className="flex gap-3"><Mail aria-hidden className="mt-1 size-4 shrink-0 text-ochre-400" /><a className="break-all hover:text-sand-50 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><Phone aria-hidden className="mt-1 size-4 shrink-0 text-ochre-400" /><a className="hover:text-sand-50 hover:underline" href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-3"><MessageCircle aria-hidden className="mt-1 size-4 shrink-0 text-ochre-400" /><a className="hover:text-sand-50 hover:underline" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
            <li className="flex gap-3"><Linkedin aria-hidden className="mt-1 size-4 shrink-0 text-ochre-400" /><a className="hover:text-sand-50 hover:underline" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-sand-50/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-sand-100/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Contributing to {sdgs.map((s) => `SDG ${s.n} ${s.name}`).join(" · ")}</p>
        </Container>
      </div>
    </footer>
  );
}
