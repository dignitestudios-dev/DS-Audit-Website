import Link from "next/link";
import "./home.css";
import { EMAIL, EMAIL_HREF, faqs, fit, included, PHONE, PHONE_HREF, REPORT_DAYS, steps } from "@/lib/content";
import { articles } from "@/lib/articles";
import { HOME_DESCRIPTION, HOME_TITLE, jsonLd, SITE_NAME, SITE_URL } from "@/lib/site";
import { NewsGrid } from "@/components/NewsCards";
import { PageShell, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Shield, Tick } from "@/components/icons";
import AreasBento from "@/components/AreasBento";
import AiSection from "@/components/AiSection";
import Locations from "@/components/Locations";
import { locations } from "@/lib/locations";
import Proof from "@/components/Proof";
import HeroReport from "@/components/HeroReport";
import SampleReport from "@/components/SampleReport";
import Faq from "@/components/Faq";
import OrderForm from "@/components/OrderForm";

const blind = [
  {
    t: "You test on your own phone, already logged in.",
    p: "Your customers use older phones, other browsers and no account yet. A button that works for you can be a dead end for them.",
  },
  {
    t: "Broken pages don’t send emails.",
    p: "When something fails, most people just leave. Nothing lands in your inbox, so a real problem looks like a slow month.",
  },
  {
    t: "Old code keeps its secrets.",
    p: "Developers move on, plugins age and test pages stay online. None of it shows up in your admin panel until someone goes looking.",
  },
];

const wedo = [
  "Audit the public version of your app or website.",
  "Use non-destructive checks only.",
  "Write up every issue with a screenshot or screen recording and a plain-English fix.",
  "Walk you through the report on a 20-minute call.",
];
const wedont = [
  "Ask for your passwords or admin access. For logged-in areas, you create a separate test account.",
  "Run load tests or attempt to break in.",
  "Make any changes to your data.",
  "Review anything you aren’t authorised to have tested.",
];

export default function Home() {
  return (
    <PageShell>
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: SITE_NAME, publisher: { "@id": `${SITE_URL}/#org` } },
                { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo-dark.webp`, email: EMAIL, telephone: PHONE, location: locations.map((l) => ({ "@type": "Place", name: l.place, address: { "@type": "PostalAddress", ...l.schema } })) },
                {
                  "@type": "Service",
                  name: HOME_TITLE,
                  description: HOME_DESCRIPTION,
                  serviceType: "App and website security, usability and performance audit",
                  provider: { "@id": `${SITE_URL}/#org` },
                  offers: { "@type": "Offer", price: "79", priceCurrency: "USD", url: `${SITE_URL}/#order` },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                },
              ],
            }),
          }}
        />

        {/* Hero */}
        <section className="hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1 className="hero__title">Your app works. Here&apos;s what it&apos;s quietly getting wrong.</h1>
              <p className="hero__sub">
                We test your live app or website for security gaps, broken sign-ups and checkouts, slow pages and device bugs, then hand you one clear report, ranked by what to fix first.
              </p>
              <div className="hero__cta">
                <a href="#order" className="btn">Get my audit · $79</a>
                <a href="#sample" className="btn btn--ghost">See a sample report</a>
              </div>
              <ul className="hero__facts">
                <li><Shield /> No issues found? Full refund</li>
                <li><Shield /> No passwords needed</li>
                <li><Shield /> Safe, non-destructive checks</li>
              </ul>
            </div>
            <HeroReport />
          </div>
        </section>

        {/* Blind spots */}
        <section className="sec sec--light">
          <div className="wrap">
            <div className="blind__head">
              <h2 className="h2">Three things the owner&apos;s seat can&apos;t show you</h2>
              <p className="lede">Problems like these are easy to miss. Nobody ignored them. They just aren&apos;t visible from where you sit.</p>
            </div>
            <div className="blind__cols">
              {blind.map((b) => (
                <div key={b.t} className="blind__col">
                  <h3 className="blind__t">{b.t}</h3>
                  <p className="blind__p">{b.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built with AI */}
        <section className="sec ai-sec" aria-labelledby="ai-title">
          <AiSection />
        </section>

        {/* What we check */}
        <section className="sec sec--dark">
          <div className="wrap">
            <div className="areas__head">
              <h2 className="h2">Four places apps and websites quietly lose customers</h2>
              <p className="lede">Every audit covers all four, on the app or site you point us to.</p>
            </div>
            <AreasBento />
          </div>
        </section>

        {/* Sample report */}
        <section id="sample" className="sec smp" aria-labelledby="sample-title">
          <div className="wrap">
            <SampleReport />
          </div>
        </section>

        {/* Pricing, promise and how we test */}
        <section id="pricing" className="sec sec--dark">
          <div className="wrap">
            <div className="price__grid">
              <div className="ticket">
                <p className="ticket__label">One price, one app or website</p>
                <div className="ticket__price">
                  <span className="ticket__amt">$79</span>
                  <span className="ticket__per">one-time, no subscription</span>
                </div>
                <ul className="ticket__list">
                  {included.map((i) => (
                    <li key={i}><span className="tick"><Tick /></span><span>{i}</span></li>
                  ))}
                </ul>
                <a href="#order" className="btn" style={{ justifySelf: "start" }}>Get my audit · $79</a>
              </div>
              <div className="promise">
                <Shield size={52} stroke="#fff" sw={1.6} />
                <h2 className="promise__t">Nothing to fix? You don&apos;t pay.</h2>
                <p className="promise__p">If our audit doesn&apos;t find a single issue worth fixing, we refund your $79 in full. No forms, no arguments.</p>
              </div>
            </div>

            <div className="safe">
              <div className="safe__col">
                <h3 className="safe__t">What we do</h3>
                <ul className="safe__list safe__list--do">{wedo.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="safe__col">
                <h3 className="safe__t">What we never do</h3>
                <ul className="safe__list safe__list--dont">{wedont.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="sec sec--soft">
          <div className="wrap">
            <div className="how__head">
              <h2 className="h2">From order to report in {REPORT_DAYS} working days</h2>
              <p className="lede">Send us the link, and we take it from there.</p>
            </div>
            <ol className="how__list">
              <span className="how__line" aria-hidden="true" />
              {steps.map((s) => (
                <li key={s.n} className="how__item">
                  <span className="how__n">{s.n}</span>
                  <h3 className="how__t">{s.t}</h3>
                  <p className="how__d">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Results and reviews (placeholder content, see lib/proof.ts) */}
        <section className="sec sec--dark" aria-labelledby="proof-title">
          <Proof />
        </section>

        {/* Sound familiar */}
        <section className="sec sec--light">
          <div className="wrap">
            <div className="fit__head">
              <h2 className="h2">Worth doing if any of these sound familiar</h2>
            </div>
            <ul className="fit__list">
              {fit.map((f) => (
                <li key={f} className="fit__item">
                  <span className="tick"><Tick /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* News preview */}
        <section className="sec sec--dark">
          <div className="wrap newsrow">
            <div className="newsrow__head">
              <div>
                <h2 className="h2">Real incidents, explained in plain English</h2>
                <p className="lede">What went wrong for other businesses, and what to check on yours.</p>
              </div>
              <Link href="/news" className="linkb">View all articles</Link>
            </div>
            <NewsGrid items={articles.slice(0, 3)} />
          </div>
        </section>

        {/* Order */}
        <section id="order" className="sec order">
          <div className="wrap order__grid">
            <div className="order__copy">
              <h2 className="h2">Tell us what to audit</h2>
              <p className="lede">
                Two minutes now. Your report arrives within {REPORT_DAYS} working days, and it&apos;s covered by the money-back guarantee.
              </p>
              <div className="order__contact">
                <span>Questions first?</span>
                <a href={PHONE_HREF}>{PHONE}</a>
                <a href={EMAIL_HREF}>{EMAIL}</a>
              </div>
            </div>
            <div className="order__card">
              <OrderForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec sec--light" aria-labelledby="faq-title">
          <div className="faq__in">
            <h2 className="h2" id="faq-title">Questions</h2>
            <Faq />
          </div>
        </section>

        {/* Locations */}
        <section className="sec sec--dark" aria-labelledby="loc-title">
          <Locations />
        </section>

        {/* Closing CTA */}
        <section className="sec cta">
          <div className="cta__in">
            <h2 className="cta__t">Find out what&apos;s waiting in your app for $79</h2>
            <p className="cta__p">And if we don&apos;t find anything worth fixing, you get your money back.</p>
            <a href="#order" className="btn">Get my audit · $79</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
