import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };

async function assets() {
  const [regular, bold, logo] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff")),
    readFile(join(process.cwd(), "assets/og-logo.png")),
  ]);
  return { regular, bold, logoSrc: `data:image/png;base64,${logo.toString("base64")}` };
}

/** Crop a /public image to the OG ratio and shrink it so the card stays light. */
async function backdrop(publicPath: string) {
  const file = join(process.cwd(), "public", publicPath);
  const buf = await sharp(file).resize(OG_SIZE.width, OG_SIZE.height, { fit: "cover" }).jpeg({ quality: 78 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

type OgInput = { eyebrow: string; title: string; subtitle?: string; bg?: string };

/** Branded 1200x630 share card. With `bg`, the article photo fills the card under a dark scrim. */
export async function renderOg({ eyebrow, title, subtitle, bg }: OgInput) {
  const [{ regular, bold, logoSrc }, bgSrc] = await Promise.all([assets(), bg ? backdrop(bg) : Promise.resolve(null)]);
  const long = title.length > 60;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          color: "#ffffff",
          fontFamily: "Inter",
          background:
            "radial-gradient(70% 90% at 85% 110%, rgba(229,50,15,0.75) 0%, rgba(131,31,0,0.4) 45%, rgba(10,10,10,0) 80%), #0a0a0a",
        }}
      >
        {bgSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bgSrc} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630 }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1200,
                height: 630,
                display: "flex",
                background: "linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.82) 42%, rgba(10,10,10,0.15) 100%)",
              }}
            />
          </>
        ) : null}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={168} height={96} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: bgSrc ? 700 : 1000 }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 2, color: "#ff8a5c" }}>{eyebrow.toUpperCase()}</div>
            <div style={{ display: "flex", fontSize: long ? 52 : 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
            {subtitle ? <div style={{ display: "flex", fontSize: 30, color: "#d4d4d8", maxWidth: 900 }}>{subtitle}</div> : null}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#d4d4d8" }}>
            <div style={{ display: "flex", background: "#cf4511", color: "#ffffff", fontWeight: 700, padding: "12px 28px", borderRadius: 9999 }}>Get my audit · $79</div>
            <div style={{ display: "flex" }}>No issues found? Full refund.</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
