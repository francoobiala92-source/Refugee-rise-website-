# Refugee Rise Initiative website

Next.js 15 + Tailwind CSS 4. Static site: every page is plain HTML, so it is fast and cheap to host.

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

## Contact form
There is no mail server, so "Send by email" opens the visitor's email app and
"Send on WhatsApp" opens WhatsApp, both with the message already written.
To receive form messages directly in your inbox instead, sign up for a free
form service (e.g. Formspree or Web3Forms) and post the form to its URL in
`src/components/ContactForm.tsx`.

## Before you switch to a custom domain
Update `url` in `src/content/site.ts`, plus `public/robots.txt` and `public/sitemap.xml`.
