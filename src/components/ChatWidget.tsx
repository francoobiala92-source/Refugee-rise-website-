"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Send, X } from "lucide-react";
import { donate, figures, site } from "@/content/site";

type Msg = { from: "bot" | "me"; text: string };

const wa = (text: string) => `${site.whatsappHref}?text=${encodeURIComponent(text)}`;

function donateAnswer() {
  const { bank, mpesa } = donate;
  const lines: string[] = ["Thank you for wanting to give! You can donate here:"];
  if (mpesa.paybill) lines.push(`M-Pesa Paybill: ${mpesa.paybill}${mpesa.accountRef ? `, Account: ${mpesa.accountRef}` : ""}`);
  if (mpesa.till) lines.push(`M-Pesa Till: ${mpesa.till}`);
  if (!mpesa.paybill && !mpesa.till && mpesa.phone) lines.push(`M-Pesa Send Money: ${mpesa.phone}`);
  if (bank.accountNumber)
    lines.push(
      [bank.bankName, bank.accountName && `Account name: ${bank.accountName}`, `Account number: ${bank.accountNumber}`, bank.branch && `Branch: ${bank.branch}`]
        .filter(Boolean)
        .join("\n") + (bank.note ? `\n(${bank.note})` : ""),
    );
  if (lines.length === 1) lines.push("Tap “Chat on WhatsApp” below and we’ll send you our M-Pesa and bank details right away.");
  else lines.push("After you give, tell us on WhatsApp so we can thank you and send updates.");
  return lines.join("\n\n");
}

const faqs: { q: string; a: () => string; wa: string }[] = [
  { q: "How can I donate?", a: donateAnswer, wa: "Hello, I would like to donate to Refugee Rise Initiative." },
  {
    q: "What does Refugee Rise do?",
    a: () =>
      `We build shops and provide startup capital for refugee entrepreneurs in Kakuma, on fair written repayment plans. Every repayment funds the next business. So far: ${figures.businesses} businesses, ${figures.invested} invested.`,
    wa: "Hello, I would like to know more about Refugee Rise Initiative.",
  },
  {
    q: "I'm a refugee with a business idea",
    a: () =>
      `Wonderful! We support refugees in Kakuma and Kalobeyei, especially women and young people. No collateral is needed. Plans usually run ${figures.term}. Message us on WhatsApp to talk about your idea.`,
    wa: "Hello, I am a refugee entrepreneur in Kakuma and I have a business idea.",
  },
  {
    q: "I want to volunteer or partner",
    a: () => "We'd love that. Mentors, volunteers and partners all help the loop turn faster. Send us a WhatsApp message and tell us what you'd like to do.",
    wa: "Hello, I would like to volunteer / partner with Refugee Rise Initiative.",
  },
];

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! 👋 Welcome to ${site.name}. How can we help you today?` },
  ]);
  const [draft, setDraft] = useState("");
  const [lastWa, setLastWa] = useState("Hello Refugee Rise Initiative!");
  const [showDonate, setShowDonate] = useState(false);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowDonate(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), [msgs, open]);

  /** Ask the AI assistant; streams the reply into the last bubble. Falls back to built-in answers. */
  const talk = async (text: string, fallback: string) => {
    const history = [...msgs, { from: "me" as const, text }];
    setMsgs([...history, { from: "bot", text: "" }]);
    setBusy(true);
    const setLast = (t: string) =>
      setMsgs((m) => [...m.slice(0, -1), { from: "bot", text: t }]);
    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text })),
        }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let out = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        out += dec.decode(value, { stream: true });
        setLast(out);
      }
      if (!out.trim()) setLast(fallback);
    } catch {
      setLast(fallback);
    } finally {
      setBusy(false);
    }
  };

  const ask = (f: (typeof faqs)[number]) => {
    if (busy) return;
    setLastWa(f.wa);
    talk(f.q, f.a());
  };

  const send = () => {
    const t = draft.trim();
    if (!t || busy) return;
    setLastWa(t);
    setDraft("");
    talk(t, "Thanks for your message! Tap “Chat on WhatsApp” below to send it to our team, and we’ll reply as soon as we can.");
  };

  const onDonatePage = pathname?.startsWith("/donate");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Refugee Rise"
          className="rise flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-sand-50 shadow-[0_30px_70px_-20px_rgba(23,38,31,0.55)] ring-1 ring-line"
        >
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <span className="relative flex size-10 items-center justify-center rounded-full bg-white/15 font-semibold">
              RR
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#25d366] ring-2 ring-[#075e54]" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="font-semibold">{site.name}</p>
              <p className="text-xs text-white/75">Instant answers · team on WhatsApp</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-white/15">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close chat</span>
            </button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto bg-[#efe7dc] px-3 py-4" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`rise max-w-[85%] whitespace-pre-line rounded-xl px-3.5 py-2 text-[0.9375rem] leading-snug shadow-sm ${
                  m.from === "bot" ? "rounded-tl-none bg-white" : "ml-auto rounded-tr-none bg-[#dcf8c6]"
                }`}
              >
                {m.text || (
                  <span className="flex gap-1 py-1.5" aria-label="Typing">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="size-2 animate-bounce rounded-full bg-[#075e54]/50" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </span>
                )}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {faqs.map((f) => (
                <button
                  key={f.q}
                  type="button"
                  disabled={busy}
                  onClick={() => ask(f)}
                  className="rounded-full border border-[#075e54]/30 bg-white px-3 py-1.5 text-sm font-medium text-[#075e54] hover:bg-[#075e54] hover:text-white disabled:opacity-50"
                >
                  {f.q}
                </button>
              ))}
            </div>
            <div ref={endRef} />
          </div>

          <a
            href={wa(lastWa)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25d366] py-2.5 text-sm font-semibold text-[#073b33] hover:bg-[#1fbe5b]"
          >
            <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
          </a>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-line bg-white p-2"
          >
            <label className="sr-only" htmlFor="chat-input">Type a message</label>
            <input
              id="chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="min-h-11 flex-1 rounded-full bg-sand-100 px-4 text-[0.9375rem] outline-none focus:ring-2 focus:ring-[#25d366]"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex size-11 items-center justify-center rounded-full bg-[#075e54] text-white hover:bg-[#0a7a6d] disabled:opacity-50"
            >
              <Send aria-hidden className="size-4" />
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      )}

      {!onDonatePage && (
        <Link
          href="/donate/"
          aria-hidden={!showDonate || open}
          tabIndex={showDonate && !open ? 0 : -1}
          className={`donate-pulse inline-flex min-h-12 items-center gap-2 rounded-full bg-clay-600 px-5 py-3 font-semibold text-white shadow-[0_18px_40px_-12px_rgba(168,64,28,0.7)] transition-all duration-500 hover:bg-[#8f3616] ${
            showDonate && !open ? "translate-y-0 opacity-100" : "pointer-events-none hidden translate-y-6 opacity-0"
          }`}
        >
          <Heart aria-hidden className="heart-beat size-5 fill-white" />
          Donate
        </Link>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative inline-flex size-15 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_40px_-12px_rgba(7,94,84,0.7)] transition-transform hover:scale-105"
      >
        {open ? <X aria-hidden className="size-7" /> : <WhatsAppIcon />}
        {!open && <span className="absolute -right-0.5 -top-0.5 size-3.5 animate-ping rounded-full bg-clay-500" />}
        {!open && <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-clay-600 ring-2 ring-white" />}
        <span className="sr-only">{open ? "Close chat" : "Chat with us on WhatsApp"}</span>
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-8 fill-white">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}
