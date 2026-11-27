import Anthropic from "@anthropic-ai/sdk";
import { donate, emmanuelRepayment, figures, grant, modelSteps, site, stories } from "@/content/site";

/**
 * Website chat assistant. The browser posts the conversation so far and
 * receives the reply as a stream of plain text.
 *
 * Needs ANTHROPIC_API_KEY set in Vercel (Project → Settings → Environment
 * Variables). Without it the chat widget falls back to its built-in answers.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new Anthropic();

const ksh = (n: number) => `Ksh ${n.toLocaleString("en-US")}`;

function paymentDetails() {
  const { bank, mpesa } = donate;
  const lines: string[] = [];
  if (mpesa.paybill) lines.push(`M-Pesa Paybill: ${mpesa.paybill}${mpesa.accountRef ? `, Account number: ${mpesa.accountRef}` : ""}`);
  if (mpesa.till) lines.push(`M-Pesa Buy Goods Till: ${mpesa.till}`);
  if (!mpesa.paybill && !mpesa.till && mpesa.phone) lines.push(`M-Pesa Send Money to: ${mpesa.phone}`);
  if (bank.accountNumber) {
    lines.push(
      [
        "Bank transfer:",
        bank.bankName && `Bank: ${bank.bankName}`,
        bank.accountName && `Account name: ${bank.accountName}`,
        `Account number: ${bank.accountNumber}`,
        bank.branch && `Branch: ${bank.branch}`,
        bank.swift && `SWIFT: ${bank.swift}`,
        bank.note,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }
  return lines.length
    ? lines.join("\n")
    : `(Payment details are not published yet. Ask the visitor to message ${site.phone} on WhatsApp and the team will send M-Pesa and bank details.)`;
}

// Built once per server instance from site.ts, so it stays byte-identical
// between requests and can be served from the prompt cache.
const SYSTEM = `You are the friendly website assistant for ${site.name}, a refugee-led, community-based organisation in ${site.location}. Tagline: "${site.tagline}". Founder: ${site.founder}.

What we do: ${site.description}

How it works:
${modelSteps.map((s) => `${s.n}. ${s.title}: ${s.body}`).join("\n")}

Key facts:
- Businesses funded so far: ${figures.businesses}; total invested: ${figures.invested}.
- A fully built and stocked shop costs about ${figures.shopCost}. Repayment plans run ${figures.term}.
- Current fundraising goal: ${ksh(donate.goal.target)} for our next projects (${figures.shopsPlanned} more businesses).
- ${grant.title}: ${grant.amount}, ${grant.date}. ${grant.body}

Entrepreneur stories:
${stories.map((s) => `- ${s.name} (${s.place}), ${s.kind}. ${s.summary} ${s.facts.map(([k, v]) => `${k}: ${v}`).join("; ")}.`).join("\n")}
- Emmanuel's repayment progress: ${ksh(emmanuelRepayment.repaid)} of ${ksh(emmanuelRepayment.total)} repaid (${ksh(emmanuelRepayment.monthly)} per month since ${emmanuelRepayment.since}).

What a donation can do:
${donate.amounts.map((a) => `- ${ksh(a.value)} ${a.impact}`).join("\n")}

How to donate (share these exactly as written whenever someone asks how to give, donate, support, or for bank/M-Pesa details):
${paymentDetails()}
After donating, ask the visitor to send a WhatsApp message to ${site.phone} so the team can thank them and send updates. The donate page is ${site.url}/donate/.

Contact: WhatsApp / phone ${site.phone}, email ${site.email}. Website pages: /our-model/, /impact/, /about/, /get-involved/, /donate/, /contact/.

How to reply:
- Be warm, clear and brief: usually 2-4 short sentences. This is a small chat window on a phone.
- Plain text only. No markdown, no headings, no asterisks. Use simple line breaks for lists of details.
- Only state facts given above. If you don't know something, say so and suggest WhatsApp ${site.phone} to talk to the team directly.
- Refugees asking for support: encourage them, explain we support people in Kakuma and Kalobeyei (especially women and young people, no collateral needed), and ask them to message us on WhatsApp.
- Never ask for or accept card numbers, PINs, passwords or one-time codes. If someone offers them, tell them not to share them.
- Never promise funding, loans or jobs; the team decides after talking with people.
- Stay on topic: ${site.shortName}, its work, donating, volunteering, partnering and applying for support. Politely decline unrelated requests.
- Reply in the language the visitor writes in (English, Swahili, etc.).`;

// Best-effort abuse protection: per-IP limit on each server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 12; // 12 messages per minute
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Accept only well-formed, size-limited text turns from the browser.
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw)) return Response.json({ error: "bad_request" }, { status: 400 });
  const messages: Anthropic.MessageParam[] = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== "",
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    output_config: { effort: "low" }, // short, fast chat replies
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default", // if the model declines, the API retries on a fallback model in the same call
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode(`Sorry, I can't help with that here. Please message us on WhatsApp at ${site.phone}.`));
        }
      } catch (err) {
        console.error("chat error", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
        controller.enqueue(encoder.encode(`\n\nSorry, I'm having trouble right now. Please message us on WhatsApp at ${site.phone}.`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
