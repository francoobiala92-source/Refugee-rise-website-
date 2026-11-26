"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
            className="ml-3 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[0.9375rem] font-semibold text-sand-50 hover:bg-acacia-700"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
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
