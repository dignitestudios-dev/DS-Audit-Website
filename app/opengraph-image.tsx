import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "$79 App and Website Audit by Dignite Studios";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "App & Website Audit",
    title: "Find the problems in your app before your customers do",
    subtitle: "Security, broken flows, speed and device bugs, ranked by priority.",
  });
}
