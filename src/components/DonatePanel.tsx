"use client";

import { useState } from "react";
import { Check, Copy, Landmark, MessageCircle, Smartphone } from "lucide-react";
import { donate, site } from "@/content/site";

const fmt = (n: number) => `Ksh ${n.toLocaleString("en-US")}`;

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the value is still visible to copy by hand */
    }
  };
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-0">
      <div className="min-w-0">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className="display truncate text-xl font-medium tracking-wide">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-all ${
          copied ? "border-acacia-700 bg-acacia-700 text-white" : "border-line hover:border-clay-600 hover:text-clay-600"
        }`}
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
        {copied ? "Copied" : "Copy"}
        <span className="sr-only"> {label}</span>
      </button>
    </div>
  );
}

export function DonatePanel() {
  const [amount, setAmount] = useState<number>(donate.amounts[1].value);
  const [custom, setCustom] = useState("");
  const value = custom ? Number(custom) || 0 : amount;
  const impact = donate.amounts.find((a) => a.value === value)?.impact;

  const { bank, mpesa } = donate;
  const hasBank = Boolean(bank.accountNumber);
  const hasMpesa = Boolean(mpesa.paybill || mpesa.till || mpesa.phone);
  const [method, setMethod] = useState<"mpesa" | "bank">(hasMpesa || !hasBank ? "mpesa" : "bank");

  const waText = encodeURIComponent(
    `Hello ${site.shortName}, I have just sent a donation of ${value ? fmt(value) : "(amount)"} via ${
      method === "mpesa" ? "M-Pesa" : "bank transfer"
    }. My name is: `,
  );

  return (
    <div className="rounded-[1.5rem] bg-sand-50 p-6 shadow-[0_40px_80px_-40px_rgba(23,38,31,0.5)] ring-1 ring-line sm:p-8">
      {/* Step 1: amount */}
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-clay-600">Step 1 · Choose an amount</p>
      <div role="radiogroup" aria-label="Donation amount" className="mt-4 grid grid-cols-2 gap-3">
        {donate.amounts.map((a) => {
          const active = !custom && amount === a.value;
          return (
            <button
              key={a.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setAmount(a.value);
                setCustom("");
              }}
              className={`rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                active ? "border-clay-600 bg-clay-600 text-white shadow-lg" : "border-line hover:border-clay-600"
              }`}
            >
              <span className="display block text-xl font-semibold">{fmt(a.value)}</span>
            </button>
          );
        })}
      </div>
      <label className="mt-3 flex items-center gap-2 rounded-xl border-2 border-line px-4 focus-within:border-clay-600">
        <span className="font-semibold text-muted">Ksh</span>
        <input
          type="number"
          inputMode="numeric"
          min={100}
          step={100}
          placeholder="Other amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
          className="min-h-12 w-full bg-transparent text-lg font-semibold outline-none placeholder:font-normal placeholder:text-muted"
        />
      </label>

      <p aria-live="polite" className="mt-4 min-h-[3.25rem] rounded-xl bg-ochre-400/15 px-4 py-3 text-[0.9375rem]">
        {value > 0 ? (
          <>
            <strong>{fmt(value)}</strong>{" "}
            {impact ??
              (value >= 300000
                ? "can fund a whole shop, built and stocked."
                : `brings us closer to our ${fmt(donate.goal.target)} goal for the next projects.`)}
          </>
        ) : (
          "Enter an amount to see what it does."
        )}
      </p>

      {/* Step 2: how to give */}
      <p className="mt-8 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-clay-600">Step 2 · Send your gift</p>

      {hasBank || hasMpesa ? (
        <>
          {hasBank && hasMpesa && (
            <div role="tablist" aria-label="Payment method" className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-sand-100 p-1">
              {(
                [
                  ["mpesa", "M-Pesa", Smartphone],
                  ["bank", "Bank transfer", Landmark],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={method === id}
                  onClick={() => setMethod(id)}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all ${
                    method === id ? "bg-ink text-sand-50 shadow" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  <Icon aria-hidden className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          <div key={method} className="rise mt-4 rounded-xl border border-line px-4">
            {method === "mpesa" && hasMpesa ? (
              <dl>
                <CopyRow label="M-Pesa Paybill" value={mpesa.paybill} />
                <CopyRow label="Account" value={mpesa.paybill ? mpesa.accountRef : ""} />
                <CopyRow label="Buy Goods Till" value={mpesa.till} />
                <CopyRow label="Send Money to" value={!mpesa.paybill && !mpesa.till ? mpesa.phone : ""} />
              </dl>
            ) : (
              <dl>
                <CopyRow label="Bank" value={bank.bankName} />
                <CopyRow label="Account name" value={bank.accountName} />
                <CopyRow label="Account number" value={bank.accountNumber} />
                <CopyRow label="Branch" value={bank.branch} />
                <CopyRow label="SWIFT code" value={bank.swift} />
                {bank.note && <p className="border-t border-line py-3 text-sm text-muted">{bank.note}</p>}
              </dl>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-xl border border-line p-4 text-[0.9375rem] text-muted">
          Message us on WhatsApp and we will send you our M-Pesa and bank details straight away.
        </p>
      )}

      {/* Step 3: tell us */}
      <p className="mt-8 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-clay-600">Step 3 · Let us know</p>
      <p className="mt-2 text-[0.9375rem] text-muted">
        So we can thank you and send a receipt and updates on the business your gift supports.
      </p>
      <a
        href={`${site.whatsappHref}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="donate-pulse mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-clay-600 px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#8f3616]"
      >
        <MessageCircle aria-hidden className="size-5" />
        {hasBank || hasMpesa ? "I've donated: tell us on WhatsApp" : "Get payment details on WhatsApp"}
      </a>
      <p className="mt-3 text-center text-sm text-muted">
        Or email <a href={`mailto:${site.email}`} className="font-semibold text-clay-600 underline-offset-2 hover:underline">{site.email}</a>
      </p>
    </div>
  );
}
