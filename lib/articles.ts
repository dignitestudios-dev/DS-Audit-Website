// Text fields support `inline code` and [label](/internal-or-https://external) links.
export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; text: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle?: string; // shorter <title> for search results (aim for 50-60 chars incl. suffix)
  summary: string;
  category: "Hack" | "Vulnerability" | "PHP" | "Outage" | "Guide";
  date: string; // ISO date of the incident / disclosure / publication
  readMinutes: number;
  image?: string; // cover image under /public (filled from lib/images.ts)
  imageAlt?: string;
  source?: { label: string; url: string };
  faq?: { q: string; a: string }[]; // rendered at the end and emitted as FAQPage JSON-LD
  body: Block[];
};

import { guides } from "./guides";
import { incidents } from "./incidents";
import { NEWS_IMAGES } from "./images";

export const articles: Article[] = [...guides, ...incidents].map((a) => ({ ...a, ...NEWS_IMAGES[a.slug] }));

export const bySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
