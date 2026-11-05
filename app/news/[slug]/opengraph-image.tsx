import { articles, bySlug } from "@/lib/articles";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Dignite Studios security article";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = bySlug(slug);
  return renderOg({
    eyebrow: a ? `Security news · ${a.category}` : "Security news",
    title: a?.title ?? "Security news",
    bg: a?.image,
  });
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
