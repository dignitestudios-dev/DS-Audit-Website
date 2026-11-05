import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Security news and articles from Dignite Studios";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Security news",
    title: "What went wrong for others, and what to check on yours",
  });
}
