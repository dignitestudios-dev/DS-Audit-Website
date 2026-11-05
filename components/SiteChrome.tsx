import Image from "next/image";
import Link from "next/link";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, SITE, PRIVACY_URL, TERMS_URL } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="hdr">
      <div className="hdr__in">
        <Link href="/" aria-label="Dignite Studios home" className="hdr__logo">
          <Image src="/logo-dark.webp" alt="Dignite Studios" width={140} height={80} priority />
        </Link>
        <nav className="hdr__nav" aria-label="Main">
          <Link href="/#sample" className="hdr__link">Sample report</Link>
          <Link href="/#how" className="hdr__link">How it works</Link>
          <Link href="/news" className="hdr__link">Security news</Link>
          <a href={PHONE_HREF} className="hdr__link">{PHONE}</a>
          <Link href="/#order" className="btn btn--sm">Get my audit · $79</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="ftr__in">
        <span>© 2026 Dignite Studios · [BUSINESS POSTAL ADDRESS]</span>
        <span className="ftr__links">
          <Link href="/news">Security news</Link>
          <a href={TERMS_URL}>Terms</a>
          <a href={PRIVACY_URL}>Privacy</a>
          <a href={SITE}>dignitestudios.com</a>
          <a href={EMAIL_HREF}>{EMAIL}</a>
          <a href={PHONE_HREF}>{PHONE}</a>
        </span>
      </div>
    </footer>
  );
}

/** Wraps every page: skip link + base shell. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <a href="#main" className="skip">Skip to content</a>
      {children}
    </div>
  );
}
