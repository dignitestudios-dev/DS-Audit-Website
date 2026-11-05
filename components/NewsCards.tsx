import Image from "next/image";
import Link from "next/link";
import "@/app/news.css";
import { type Article, formatDate } from "@/lib/articles";

export function CategoryChip({ category }: { category: Article["category"] }) {
  return <span className={`cat cat--${category.toLowerCase()}`}>{category}</span>;
}

/** Cover image that fills its (relatively positioned, fixed-ratio) parent. */
export function Cover({ article, sizes, priority, className }: { article: Article; sizes: string; priority?: boolean; className: string }) {
  if (!article.image) return null;
  return (
    <Image
      src={article.image}
      alt={article.imageAlt ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      quality={80}
      className={className}
    />
  );
}

export function NewsGrid({ items }: { items: Article[] }) {
  return (
    <div className="ngrid">
      {items.map((a) => (
        <Link key={a.slug} href={`/news/${a.slug}`} className="ncard">
          {a.image && (
            <span className="ncard__media">
              <Cover article={a} sizes="(min-width: 1240px) 380px, (min-width: 700px) 45vw, 100vw" className="ncard__img" />
            </span>
          )}
          <span className="ncard__body">
            <CategoryChip category={a.category} />
            <h3 className="ncard__t">{a.title}</h3>
            <span className="ncard__s">{a.summary}</span>
            <span className="ncard__meta">{formatDate(a.date)} · {a.readMinutes} min read</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Large lead story for the top of the news index. */
export function FeaturedStory({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="nfeat">
      <span className="nfeat__media">
        <Cover article={article} sizes="(min-width: 1240px) 640px, (min-width: 860px) 55vw, 100vw" priority className="nfeat__img" />
      </span>
      <span className="nfeat__copy">
        <CategoryChip category={article.category} />
        <h2 className="nfeat__t">{article.title}</h2>
        <span className="nfeat__s">{article.summary}</span>
        <span className="nfeat__meta">{formatDate(article.date)} · {article.readMinutes} min read</span>
        <span className="nfeat__cta">Read the article</span>
      </span>
    </Link>
  );
}
