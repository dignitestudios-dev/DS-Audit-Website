import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, bySlug, formatDate } from "@/lib/articles";
import Rich from "@/components/Rich";
import { CategoryChip, Cover, NewsGrid } from "@/components/NewsCards";
import { jsonLd, SITE_NAME, SITE_URL } from "@/lib/site";
import { PageShell, SiteFooter, SiteHeader } from "@/components/SiteChrome";

type Params = { slug: string };

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) return {};
  return {
    title: a.metaTitle ?? a.title,
    description: a.summary,
    alternates: { canonical: `/news/${a.slug}` },
    openGraph: {
      type: "article",
      url: `/news/${a.slug}`,
      title: a.metaTitle ?? a.title,
      description: a.summary,
      publishedTime: a.date,
      section: a.category,
    },
    twitter: { card: "summary_large_image", title: a.metaTitle ?? a.title, description: a.summary },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) notFound();

  const toc = [
    ...a.body.filter((b) => b.type === "h").map((b) => ({ id: slugify(b.text), label: b.text })),
    ...(a.faq ? [{ id: "faq", label: "Common questions" }] : []),
  ];
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <PageShell>
      <div className="art__bar" aria-hidden="true" />
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Article",
                  headline: a.title,
                  description: a.summary,
                  datePublished: a.date,
                  dateModified: a.date,
                  articleSection: a.category,
                  mainEntityOfPage: `${SITE_URL}/news/${a.slug}`,
                  image: a.image ? `${SITE_URL}${a.image}` : `${SITE_URL}/news/${a.slug}/opengraph-image`,
                  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
                  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
                },
                ...(a.faq
                  ? [{ "@type": "FAQPage", mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
                  : []),
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Security news", item: `${SITE_URL}/news` },
                    { "@type": "ListItem", position: 3, name: a.title, item: `${SITE_URL}/news/${a.slug}` },
                  ],
                },
              ],
            }),
          }}
        />

        <article className="art">
          <header className="art__head">
            <Link href="/news" className="art__back">← All security news</Link>
            <CategoryChip category={a.category} />
            <h1 className="art__title">{a.title}</h1>
            <p className="art__lede">{a.summary}</p>
            <span className="art__by">By the {SITE_NAME} team · {formatDate(a.date)} · {a.readMinutes} min read</span>
          </header>

          {a.image && (
            <figure className="art__hero" style={{ margin: "clamp(28px, 4vw, 44px) auto 0" }}>
              <div className="art__heroimg">
                <Cover article={a} sizes="(min-width: 1140px) 1100px, 100vw" priority className="art__img" />
              </div>
            </figure>
          )}

          <div className="art__grid">
            <div className="prose">
              {a.body.map((b, i) => {
                if (b.type === "h") return <h2 key={i} id={slugify(b.text)}>{b.text}</h2>;
                if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
                if (b.type === "p") return <p key={i}><Rich text={b.text} /></p>;
                if (b.type === "code") return <pre key={i} tabIndex={0}><code>{b.text}</code></pre>;
                if (b.type === "ol")
                  return (
                    <ol key={i}>
                      {b.items.map((it) => <li key={it}><Rich text={it} /></li>)}
                    </ol>
                  );
                return (
                  <ul key={i}>
                    {b.items.map((it) => <li key={it}><span><Rich text={it} /></span></li>)}
                  </ul>
                );
              })}

              {a.faq && (
                <section aria-labelledby="faq" className="faqs">
                  <h2 id="faq">Common questions</h2>
                  {a.faq.map((f) => (
                    <div key={f.q} className="faqs__item">
                      <h3 className="faqs__q">{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </section>
              )}

              {a.source && (
                <p className="prose__src">
                  Source: <a href={a.source.url} target="_blank" rel="noopener noreferrer">{a.source.label}</a>
                </p>
              )}

              <div className="artcta">
                <h2 className="artcta__t">Not sure if your app has this problem?</h2>
                <p className="artcta__p">Our $79 audit checks for issues like this and ranks what to fix first. No issues found? Full refund.</p>
                <Link href="/#order" className="btn">Get my audit · $79</Link>
              </div>
            </div>

            {toc.length > 2 && (
              <nav className="toc" aria-label="In this article">
                <p className="toc__t">In this article</p>
                <ol className="toc__list">
                  {toc.map((t) => (
                    <li key={t.id}><a href={`#${t.id}`} className="toc__link">{t.label}</a></li>
                  ))}
                </ol>
              </nav>
            )}
          </div>

          <section className="related" aria-labelledby="related-title">
            <h2 className="related__t" id="related-title">Keep reading</h2>
            <NewsGrid items={related} />
          </section>
        </article>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
