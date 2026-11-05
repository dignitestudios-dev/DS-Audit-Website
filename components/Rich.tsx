import Link from "next/link";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|`[^`]+`)/g;

/** Renders **bold**, `inline code` and [label](href) links inside article text. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return <strong key={i} style={{ color: "#ffffff", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
          return (
            <code key={i} style={{ background: "#1b1b1d", border: "1px solid #2a2a2e", borderRadius: 6, padding: "1px 6px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: "0.88em", color: "#ffb08a", overflowWrap: "anywhere" }}>
              {part.slice(1, -1)}
            </code>
          );
        }
        const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (m) {
          const [, label, href] = m;
          return href.startsWith("/") ? (
            <Link key={i} href={href}>{label}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          );
        }
        return part;
      })}
    </>
  );
}
