/*
 * PLACEHOLDER CONTENT. Every name, business, quote and number below is invented so the layout can be
 * designed and reviewed. Replace all of it with real, permissioned client feedback and real results
 * before launch. Do NOT add Review/AggregateRating structured data for this content.
 */

export type Result = { n: string; label: string; who: string; detail: string };
export type Review = { name: string; role: string; company: string; quote: string; lead?: boolean };

export const results: Result[] = [
  {
    n: "+31%",
    label: "more iPhone checkouts completed",
    who: "Northwind Candles, online shop",
    detail: "The audit found a “Pay now” button that did nothing on older iPhones. It was fixed the day after the report arrived.",
  },
  {
    n: "1 day",
    label: "to close a data exposure",
    who: "Brightline Dental, booking site",
    detail: "Appointment pages could be opened by changing a number in the address. The team locked them down the next day.",
  },
  {
    n: "6.2s → 1.9s",
    label: "mobile load time",
    who: "Kestrel Fitness, web app",
    detail: "Oversized images and unused scripts were trimmed after the speed findings. Sign-ups on phones followed.",
  },
];

export const reviews: Review[] = [
  {
    lead: true,
    name: "Amelia Carter",
    role: "Founder",
    company: "Northwind Candles",
    quote:
      "I had been losing iPhone orders for months and never knew. The report pointed at the exact button, my developer fixed it in an afternoon, and checkouts picked up straight away. I only wish I'd done it sooner.",
  },
  {
    name: "Daniel Okafor",
    role: "Owner",
    company: "Brightline Dental",
    quote:
      "The sample report is what convinced me, and the real one was just as clear. Every issue ranked, every fix in plain English. The 20-minute call was worth the price on its own.",
  },
  {
    name: "Priya Raman",
    role: "CTO",
    company: "Kestrel Fitness",
    quote:
      "We built our first version quickly with AI tools. The audit found things none of us had thought to check, like a database rule left open from testing. Calm, specific and no jargon.",
  },
];
