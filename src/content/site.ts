/**
 * Single source of truth for site copy and facts.
 * Facts come from the organisation's own materials (previous website,
 * agreement templates and the Inkomoko FAST certificate).
 * To update a number, a contact detail or a story, change it here only.
 */

export const site = {
  name: "Refugee Rise Initiative",
  shortName: "Refugee Rise",
  tagline: "Building Shops, Building Futures",
  description:
    "Refugee Rise Initiative builds shops and provides startup capital for refugee entrepreneurs in Kakuma, Kenya, on fair written repayment plans, then reinvests every repayment into the next business.",
  location: "Kakuma, Turkana County, Kenya",
  url: "https://refugee-rise.vercel.app",
  email: "francoohisa9535@gmail.com",
  phone: "+254 798 957 667",
  phoneHref: "tel:+254798957667",
  whatsappHref: "https://wa.me/254798957667",
  linkedin: "https://www.linkedin.com/company/refugee-rise-initiative",
  founder: "Ohisa Franco",
};

export const nav = [
  { href: "/our-model/", label: "Our model" },
  { href: "/impact/", label: "Impact" },
  { href: "/about/", label: "About" },
  { href: "/get-involved/", label: "Get involved" },
] as const;

/**
 * Donation details shown on /donate/.
 * Fill in your own bank and M-Pesa details below. Any field left as an
 * empty string ("") is hidden on the site automatically.
 * Only ever publish details people need to SEND money (account number,
 * account name, bank, branch). Never publish PINs, passwords, card
 * numbers, CVV codes or online-banking logins.
 */
export const donate = {
  bank: {
    bankName: "Equity Bank Kenya",
    accountName: "Ohisa Franco Obiala", // founder's account, used for the organisation's donations
    accountNumber: "1650162850298",
    branch: "", // e.g. "Kakuma Branch"
    swift: "", // optional, for international transfers
    note: "This account is held by our founder, Ohisa Franco, and receives donations for Refugee Rise Initiative.",
  },
  mpesa: {
    // Use a Paybill or Till number if you have one; otherwise a phone number.
    paybill: "",
    accountRef: "", // e.g. "DONATION"
    till: "",
    phone: "", // e.g. "0798 957 667"
  },
  /** Current fundraising goal. Update `raised` as gifts arrive. */
  goal: { label: "Fund our next projects", target: 1500000, raised: 0 },
  amounts: [
    { value: 1000, impact: "buys a crate of starter stock for a new shop" },
    { value: 5000, impact: "pays for shelving or a counter" },
    { value: 20000, impact: "stocks a shop's staple foods for a month" },
    { value: 80000, impact: "buys a motorbike for a boda boda business" },
  ],
};

/** Headline figures, used everywhere a number appears so they never disagree. */
export const figures = {
  businesses: 3,
  invested: "Ksh 480,000",
  grant: "US$4,000",
  shopsPlanned: "10–15",
  shopCost: "Ksh 300,000",
  margin: "40%",
  term: "1–2 years",
};

export const modelSteps = [
  {
    n: "01",
    title: "Build the shop",
    body: "We partner with a refugee entrepreneur or plot owner and fund the construction of a shop, with every cost invoiced openly.",
  },
  {
    n: "02",
    title: "Provide startup capital",
    body: "We stock the shop or fund the equipment a business needs to grow, such as stock, a fridge or shelving.",
  },
  {
    n: "03",
    title: "Agree a fair repayment plan",
    body: "Before any money moves, both sides sign a written plan: the cost plus an agreed margin, repaid from business income over 1–2 years.",
  },
  {
    n: "04",
    title: "Reinvest in the next business",
    body: "Every shilling repaid funds the next shop. Once repaid in full, ownership passes to the entrepreneur.",
  },
];

export const sdgs = [
  { n: 1, name: "No Poverty", body: "Steady income for households that had none." },
  { n: 8, name: "Decent Work and Economic Growth", body: "Businesses that create local jobs, from builders to shop attendants." },
  { n: 10, name: "Reduced Inequalities", body: "Finance for people the banking system leaves out, especially women and young people." },
];

export const stories = [
  {
    id: "hellen",
    name: "Hellen Loki",
    place: "Kalobeyei Village Two",
    kind: "New shop, built and stocked",
    photo: "/images/hellen-shop.jpg",
    photoAlt: "Inside Hellen Loki's shop: stocked shelves, an M-Pesa counter, grain sacks and a chest freezer.",
    summary:
      "Hellen is a single mother who had no steady income. We built and stocked a shop for her on her plot. It is now open and trading, giving her family a stable income.",
    facts: [
      ["Invested", "Ksh 300,000 (construction and stock)"],
      ["Repayment", "Ksh 420,000 over 2 years"],
      ["Ownership", "Transfers to Hellen once repaid"],
    ],
  },
  {
    id: "michael",
    name: "Michael Oliwa",
    place: "Kakuma",
    kind: "Existing business, capital to grow",
    photo: "/images/michael-shop.jpg",
    photoAlt: "Michael Oliwa arranging stock on the shelves of his shop.",
    summary:
      "Michael already ran a small shop but could not get the capital to grow it. A business loan let him expand his stock, raise his income and take on support staff.",
    facts: [
      ["Invested", "Ksh 100,000 business loan"],
      ["Repayment", "Ksh 140,000 over 1 year"],
      ["Status", "Trading and repaying"],
    ],
  },
  {
    id: "emmanuel",
    name: "Emmanuel Lolito",
    place: "Kakuma",
    kind: "New motorbike, a transport business",
    photo: "/images/emmanuel-moto.jpg",
    photoAlt: "Emmanuel Lolito giving a thumbs-up beside his new TVS Star HLX 125 motorbike, still in its factory seat cover.",
    summary:
      "Emmanuel needed a way to earn and support his family. We bought him a brand-new motorbike so he can run a boda boda (motorbike taxi) business. Since August 2026 he has repaid Ksh 15,000 every month from his fares.",
    facts: [
      ["Invested", "Ksh 80,000 (new motorbike)"],
      ["Repayment", "Ksh 120,000 at Ksh 15,000/month"],
      ["Status", "Repaying on time since August 2026"],
    ],
  },
];

/**
 * Emmanuel's repayment tracker. Update `repaid` each month when his
 * Ksh 15,000 payment arrives (4 payments, Aug–Nov 2026 = 60,000).
 */
export const emmanuelRepayment = {
  total: 120000,
  repaid: 60000,
  monthly: 15000,
  since: "August 2026",
};

export const grant = {
  title: "Inkomoko FAST grant",
  amount: "US$4,000",
  date: "April 2025",
  body: "Refugee Rise Initiative was selected for the Fund for Alumni Start-ups in Transition (FAST), run by Inkomoko in partnership with the Mastercard Foundation. Our founder completed Inkomoko's Business Accelerator Program in May 2025. The grant funded our first shop construction and operating costs.",
};
