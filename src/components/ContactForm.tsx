"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { site } from "@/content/site";

const topics = [
  { value: "partner", label: "Partnership or funding" },
  { value: "entrepreneur", label: "Support for my business" },
  { value: "volunteer", label: "Mentoring or volunteering" },
  { value: "other", label: "Something else" },
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Contact form. With no server to send mail from, submitting opens the visitor's
 * email app (or WhatsApp) with the message filled in, so nothing is ever lost.
 * To receive messages directly instead, connect a form service (see README).
 */
export function ContactForm() {
  const params = useSearchParams();
  const [topic, setTopic] = useState("other");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<"" | "email" | "whatsapp">("");

  useEffect(() => {
    const t = params.get("topic");
    if (t && topics.some((x) => x.value === t)) setTopic(t);
  }, [params]);

  function compose(form: HTMLFormElement) {
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address, like name@example.com.";
    if (message.length < 10) next.message = "Please write a short message (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return null;
    }
    const label = topics.find((x) => x.value === topic)?.label ?? "Enquiry";
    return { subject: `${label}: message from ${name}`, body: `${message}\n\n${name}\n${email}` };
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const m = compose(e.currentTarget);
    if (!m) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
    setSent("email");
  }

  function onWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;
    const m = compose(form);
    if (!m) return;
    window.open(`${site.whatsappHref}?text=${encodeURIComponent(`${m.subject}\n\n${m.body}`)}`, "_blank", "noopener");
    setSent("whatsapp");
  }

  const field = "mt-2 block w-full rounded-xl border border-ink/25 bg-white px-4 py-3 text-base outline-none focus:border-clay-600 focus:ring-2 focus:ring-clay-600/25 aria-[invalid=true]:border-clay-600";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold">Your name</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={field} />
          {errors.name && <p id="name-err" className="mt-2 text-sm text-clay-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={field} />
          {errors.email && <p id="email-err" className="mt-2 text-sm text-clay-600">{errors.email}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="font-semibold">What is this about?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <label key={t.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/20 bg-white px-4 py-3 has-[:checked]:border-clay-600 has-[:checked]:bg-clay-600/5">
              <input type="radio" name="topic" value={t.value} checked={topic === t.value} onChange={() => setTopic(t.value)} className="size-4 accent-[#a8401c]" />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="font-semibold">Message</label>
        <textarea id="message" name="message" rows={6} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={field} />
        {errors.message && <p id="message-err" className="mt-2 text-sm text-clay-600">{errors.message}</p>}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-clay-600 px-6 py-3 font-semibold text-white hover:bg-[#8f3616]">
          <Send aria-hidden className="size-4" /> Send by email
        </button>
        <button type="button" onClick={onWhatsApp} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-semibold hover:border-ink hover:bg-ink/5">
          Send on WhatsApp
        </button>
      </div>

      <p role="status" className="text-sm text-muted">
        {sent === "email" && "Your email app should now be open with your message ready. Just press send."}
        {sent === "whatsapp" && "WhatsApp should now be open with your message ready. Just press send."}
        {!sent && "We use your details only to reply to you. We never share them."}
      </p>
    </form>
  );
}
