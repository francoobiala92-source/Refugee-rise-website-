import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] ${
        light ? "text-ochre-400" : "text-clay-600"
      }`}
    >
      {children}
    </p>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  external?: boolean;
  arrow?: boolean;
};

export function Button({ href, children, variant = "primary", external, arrow = true }: BtnProps) {
  const styles = {
    primary: "bg-clay-600 text-white hover:bg-[#8f3616]",
    secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
    light: "bg-sand-50 text-ink hover:bg-white",
  }[variant];
  const cls = `group inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-semibold transition-colors ${styles}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="rise max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2.4rem,1.6rem+3.6vw,4.25rem)] font-medium">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-medium">{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-sand-100/85" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

/** Brand mark: a shop roof with a rising arrow, redrawn from the organisation's logo. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M8 23 24 11l16 12" fill="none" stroke="#2e5a4c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 24h10v17H12z" fill="#17261f" />
      <path d="M25 24h9v17h-9z" fill="#e2a33a" />
      <path d="M14 9c8-6 20-5 27 3" fill="none" stroke="#e2a33a" strokeWidth="3" strokeLinecap="round" />
      <path d="m42 6 1 8-8-1" fill="none" stroke="#e2a33a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CtaBand() {
  return (
    <section className="bg-acacia-700 text-sand-50">
      <Container className="flex flex-col items-start gap-8 py-16 sm:py-20 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow light>Join the loop</Eyebrow>
          <h2 className="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-medium">Help us build the next 10–15 shops.</h2>
          <p className="mt-4 text-lg text-sand-100/85">
            Partners, funders and mentors all have a part. Every shilling repaid is reinvested in the next business.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/get-involved/" variant="light">Ways to get involved</Button>
          <Link
            href="/contact/"
            className="inline-flex min-h-12 items-center rounded-full border border-sand-50/40 px-6 py-3 text-[0.9375rem] font-semibold hover:border-sand-50 hover:bg-sand-50/10"
          >
            Talk to us
          </Link>
        </div>
      </Container>
    </section>
  );
}
