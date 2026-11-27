"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Container, LogoMark } from "./ui";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sand-50/92 backdrop-blur">
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <LogoMark />
          <span className="leading-tight">
            <span className="display block text-[1.0625rem] font-semibold">{site.shortName}</span>
            <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">Initiative</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="rounded-full px-4 py-2 text-[0.9375rem] font-medium text-ink/80 hover:bg-ink/5 hover:text-ink aria-[current=page]:text-clay-600"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="ml-2 inline-flex min-h-11 items-center rounded-full border border-ink/25 px-5 text-[0.9375rem] font-semibold hover:border-ink hover:bg-ink/5"
          >
            Contact
          </Link>
          <Link
            href="/donate/"
            aria-current={isActive("/donate/") ? "page" : undefined}
            className="group ml-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-clay-600 px-5 text-[0.9375rem] font-semibold text-white hover:bg-[#8f3616]"
          >
            <Heart aria-hidden className="size-4 fill-white transition-transform duration-300 group-hover:scale-125" />
            Donate
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/donate/"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-clay-600 px-4 text-[0.9375rem] font-semibold text-white"
          >
            <Heart aria-hidden className="size-4 fill-white" />
            Donate
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-sand-50 md:hidden">
          <Container className="flex flex-col py-3">
            {[...nav, { href: "/contact/", label: "Contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="border-b border-line py-4 text-lg font-medium last:border-0 aria-[current=page]:text-clay-600"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
