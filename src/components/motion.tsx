"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Watches every element with a `data-reveal` attribute and fades it up
 * when it scrolls into view. Mounted once in the root layout.
 * Content stays visible without JavaScript (see `html.js` in globals.css).
 */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

function useInView<T extends Element>(once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return [ref, inView] as const;
}

/**
 * Counts a figure up from zero when it scrolls into view.
 * Accepts strings such as "Ksh 480,000", "US$4,000" or "3"; values it can't
 * parse as one number (e.g. "10–15") are shown as they are.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const m = value.match(/^(\D*?)([\d,]+)(\D*)$/);
  const target = m ? Number(m[2].replace(/,/g, "")) : NaN;
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || Number.isNaN(target) || reduced()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  if (!m) return <span>{value}</span>;
  const shown = n === null ? value : `${m[1]}${n.toLocaleString("en-US")}${m[3]}`;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/** A progress bar that fills from 0 to `percent` when it scrolls into view. */
export function ProgressBar({ percent, light = false, label }: { percent: number; light?: boolean; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p)}
      className={`h-3 overflow-hidden rounded-full ${light ? "bg-sand-50/15" : "bg-ink/10"}`}
    >
      <div
        className="progress-fill h-full rounded-full bg-gradient-to-r from-clay-600 to-ochre-400"
        style={{ width: inView ? `${Math.max(p, 2)}%` : "0%" }}
      />
    </div>
  );
}
