// The ONE place the site's public origin is defined (no trailing slash).
// Drives metadataBase, canonical URLs, Open Graph image URLs, sitemap, robots and structured data.
export const SITE_URL = "https://dignitestudios.net";

export const SITE_NAME = "Dignite Studios";
export const HOME_TITLE = "$79 App and Website Audit";
export const HOME_DESCRIPTION =
  "We audit your live app or website for security gaps, broken flows, speed issues and device bugs. One prioritised report. No issues found? Full refund.";

/** Escape for safe embedding inside <script type="application/ld+json">. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
