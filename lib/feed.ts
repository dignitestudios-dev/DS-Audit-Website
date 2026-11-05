export type FeedItem = {
  title: string;
  url: string;
  source: string;
  date: string; // ISO
};

type FeedSource = { name: string; url: string };

// Headlines only (title, link, date). Full text stays on the publisher's site.
export const FEED_SOURCES: FeedSource[] = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { name: "PHP Releases", url: "https://www.php.net/releases/feed.php" },
];

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, "")
    .trim();

const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
};

function parse(xml: string, source: string): FeedItem[] {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const items: FeedItem[] = [];
  for (const b of blocks) {
    const title = tag(b, "title");
    let url = tag(b, "link");
    if (!/^https?:\/\//i.test(url)) {
      // Atom: prefer a non-enclosure/non-self <link>, else fall back to <id>.
      const links = [...b.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
      const alt = links.find((l) => !/rel=["'](enclosure|self)["']/i.test(l));
      url = alt?.match(/href=["']([^"']+)["']/i)?.[1] ?? tag(b, "id");
    }
    url = url.replace(/^http:\/\/php\.net\//i, "https://www.php.net/");
    const raw = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || tag(b, "dc:date");
    const t = Date.parse(raw);
    if (!title || !/^https?:\/\//i.test(url) || Number.isNaN(t)) continue;
    items.push({ title, url, source, date: new Date(t).toISOString() });
  }
  return items;
}

export async function getFeedItems(limit = 15): Promise<FeedItem[]> {
  const results = await Promise.allSettled(
    FEED_SOURCES.map(async (s) => {
      const res = await fetch(s.url, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "DigniteStudiosNewsFeed/1.0", Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" },
      });
      if (!res.ok) throw new Error(`${s.name}: ${res.status}`);
      // Keep at most the 5 newest per source so one busy feed can't crowd out the rest.
      return parse(await res.text(), s.name)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);
    }),
  );

  const seen = new Set<string>();
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((i) => i.date <= new Date().toISOString() && !seen.has(i.url) && seen.add(i.url))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
