"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { stories } from "@/content/site";

const AUTOPLAY_MS = 5500;

/**
 * Supported businesses as a gliding slider: auto-advances, pauses on hover or
 * focus, swipes on touch screens, and shows a peek of the next slide.
 */
export function ProjectsSlider({ light = false, onSand = false }: { light?: boolean; onSand?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const n = stories.length;

  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(i + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  const onDown = (e: React.PointerEvent) => {
    start.current = e.clientX;
    setPaused(true);
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current !== null) setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (Math.abs(drag) > 60) go(drag < 0 ? i + 1 : i - 1);
    start.current = null;
    setDrag(0);
    setPaused(false);
  };

  const muted = light ? "text-sand-100/75" : "text-muted";
  const ring = light ? "border-sand-50/30 hover:bg-sand-50 hover:text-ink" : "border-ink/20 hover:bg-ink hover:text-sand-50";

  return (
    <div
      className="slider-vars"
      role="region"
      aria-roledescription="carousel"
      aria-label="Businesses we have supported"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="touch-pan-y select-none overflow-hidden"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => start.current !== null && onUp()}
      >
        <ul
          className="flex gap-5 sm:gap-6"
          style={{
            // each slide is 86% wide on phones, 78% on larger screens; the rest is the peek
            transform: `translateX(calc(${-i} * (var(--slide) + var(--gap)) + ${drag}px))`,
            transition: drag ? "none" : "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {stories.map((s, k) => {
            const active = k === i;
            return (
              <li
                key={s.id}
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${n}: ${s.name}`}
                aria-hidden={!active}
                className="w-[var(--slide)] shrink-0"
              >
                <article
                  className={`grid h-full overflow-hidden rounded-[1.5rem] transition-opacity duration-700 md:grid-cols-[1.15fr_1fr] ${
                    light ? "bg-sand-50/[0.06] ring-1 ring-sand-50/10" : onSand ? "bg-sand-50" : "bg-sand-100"
                  } ${active ? "opacity-100" : "opacity-45"}`}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={s.photo}
                      alt={s.photoAlt}
                      width={1400}
                      height={1000}
                      draggable={false}
                      className={`aspect-[4/3] h-full w-full object-cover md:aspect-auto md:min-h-[24rem] ${active ? "ken-burns" : ""}`}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-sand-50/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                      {String(k + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay-500">{s.kind}</p>
                      <h3 className="mt-2 text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] font-medium">{s.name}</h3>
                      <p className={`mt-1 flex items-center gap-1.5 text-sm ${muted}`}>
                        <MapPin aria-hidden className="size-3.5" /> {s.place}
                      </p>
                      <p className={`mt-4 ${muted}`}>{s.summary}</p>
                    </div>
                    <dl className={`grid grid-cols-1 gap-3 border-t pt-5 text-sm sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 ${light ? "border-sand-50/15" : "border-line"}`}>
                      {s.facts.map(([key, v]) => (
                        <div key={key}>
                          <dt className={`text-xs ${muted}`}>{key}</dt>
                          <dd className="mt-0.5 font-semibold leading-snug">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose a business">
          {stories.map((s, k) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={s.name}
              onClick={() => go(k)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                k === i ? "w-14" : "w-6"
              } ${light ? "bg-sand-50/20" : "bg-ink/15"}`}
            >
              {k === i && (
                <span
                  key={`${i}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-clay-500"
                  style={{ animation: paused ? "none" : `slide-timer ${AUTOPLAY_MS}ms linear forwards`, width: paused ? "100%" : undefined }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(i - 1)} className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${ring}`}>
            <ArrowLeft aria-hidden className="size-4" />
            <span className="sr-only">Previous business</span>
          </button>
          <button type="button" onClick={() => go(i + 1)} className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${ring}`}>
            <ArrowRight aria-hidden className="size-4" />
            <span className="sr-only">Next business</span>
          </button>
        </div>
      </div>
    </div>
  );
}
