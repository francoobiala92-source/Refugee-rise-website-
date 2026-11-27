# Refugee Rise Initiative website

Next.js 15 + Tailwind CSS 4. Every page is pre-rendered HTML, so it is fast and cheap to host.
The only server code is the AI chat endpoint (`/api/chat/`).

## Change text, numbers or contact details
Almost everything lives in **`src/content/site.ts`**: contact details, headline figures
(businesses, amount invested, grant, shops planned, shop cost, margin, repayment term),
the entrepreneur stories and the grant. Change a number there and it updates on every page.

Photos are in `public/images/`. To swap one, replace the file with the same name.

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy to your existing Vercel project (refugee-rise)
    npm install -g vercel
    vercel link        # choose the existing "refugee-rise" project
    vercel --prod

## AI chat assistant (WhatsApp bubble, bottom-right)
The chat bubble answers visitors with Claude AI and hands real conversations to
WhatsApp. The assistant's knowledge (facts, stories, bank and M-Pesa details)
comes from `src/content/site.ts`, so updating that file updates its answers.
The code is in `src/app/api/chat/route.ts`.

To switch the AI on:
1. Create an API key at https://console.anthropic.com (Settings → API keys) and add credit.
   Set a monthly spend limit there (Settings → Limits) so costs can never run away.
2. In Vercel: Project → Settings → Environment Variables → add
   `ANTHROPIC_API_KEY` = your key (Production), then redeploy.
3. For local testing, create `.env.local` with `ANTHROPIC_API_KEY=...` (never commit it).

Without a key the bubble still works, using built-in answers plus WhatsApp.

## Contact form
There is no mail server, so "Send by email" opens the visitor's email app and
"Send on WhatsApp" opens WhatsApp, both with the message already written.
To receive form messages directly in your inbox instead, sign up for a free
form service (e.g. Formspree or Web3Forms) and post the form to its URL in
`src/components/ContactForm.tsx`.

## Before you switch to a custom domain
Update `url` in `src/content/site.ts`, plus `public/robots.txt` and `public/sitemap.xml`.
