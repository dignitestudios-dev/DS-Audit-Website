import type { Metadata } from "next";
import { articles, formatDate } from "@/lib/articles";
import { getFeedItems } from "@/lib/feed";
import { FeaturedStory, NewsGrid } from "@/components/NewsCards";
import { PageShell, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { jsonLd, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Security news and articles";
const description = "Plain-English write-ups of real hacks, vulnerabilities, outages and PHP errors, and what they mean for your app or website.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news" },
  openGraph: { type: "website", url: "/news", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const revalidate = 3600; // refresh the live headlines hourly

export default async function NewsIndex() {
  const feed = await getFeedItems();
  const [lead, ...rest] = articles;
  return (
    <PageShell>
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "CollectionPage",
                  name: title,
                  description,
                  url: `${SITE_URL}/news`,
                  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
                  mainEntity: {
                    "@type": "ItemList",
                    itemListElement: articles.map((a, i) => ({
                      "@type": "ListItem",
                      position: i + 1,
                      url: `${SITE_URL}/news/${a.slug}`,
                      name: a.title,
                    })),
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Security news", item: `${SITE_URL}/news` },
                  ],
                },
              ],
            }),
          }}
        />
        <section className="nhero">
          <div className="wrap nhero__in">
            <div className="nhero__head">
              <h1 className="nhero__title">What went wrong for others, and what to check on yours</h1>
              <p className="lede">Plain-English write-ups of real hacks, vulnerabilities, outages and PHP errors.</p>
            </div>
            <FeaturedStory article={lead} />
          </div>
        </section>

        <section className="sec sec--dark" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="nsub">
              <h2 className="nsub__t">More articles</h2>
            </div>
            <NewsGrid items={rest} />
          </div>
        </section>

        {feed.length > 0 && (
          <section className="sec sec--soft" aria-labelledby="headlines-title">
            <div className="wrap">
              <div className="nsub">
                <h2 className="nsub__t" id="headlines-title">Latest headlines</h2>
                <p className="small" style={{ margin: 0 }}>Live from The Hacker News, BleepingComputer and PHP.net. Links open the publisher&apos;s site.</p>
              </div>
              <ul className="feed">
                {feed.map((i) => (
                  <li key={i.url} className="feed__item">
                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="feed__link">
                      <span className="feed__t">{i.title}</span>
                      <span className="feed__m">{i.source} · {formatDate(i.date.slice(0, 10))}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </PageShell>
  );
}
