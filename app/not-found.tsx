import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <SiteHeader />
      <main id="main" className="sec nf">
        <div className="nf__in">
          <p className="nf__code" aria-hidden="true">404</p>
          <h1 className="nf__t">We couldn&apos;t find that page</h1>
          <p className="lede">The link may be old or mistyped. Here are a few places that do exist.</p>
          <div className="nf__links">
            <Link href="/" className="btn">Back to the home page</Link>
            <Link href="/news" className="btn btn--ghost">Read the security news</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
