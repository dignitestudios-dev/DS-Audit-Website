export const PHONE = "+1 877 714 1770";
export const EMAIL = "info@dignitestudios.com";
/** Turnaround shown across the site. Replace the bracketed placeholder with the real number. */
export const REPORT_DAYS = "[5]";

export const TERMS_URL = "https://www.dignitestudios.com/terms-and-conditions";
export const PRIVACY_URL = "https://www.dignitestudios.com/privacy-policy";
export const SUPPORT_EMAIL = "support@dignitestudios.com";
export const SUPPORT_EMAIL_HREF = `mailto:${SUPPORT_EMAIL}`;
/** Bump when the SMS consent wording changes; it is stored with each submission. */
export const SMS_CONSENT_VERSION = "2026-11-05";

export const PHONE_HREF = "tel:+18777141770";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const SITE ="https://www.dignitestudios.com/";

export const findings = [
  { sev: "HIGH", bg: "#7f1d1d", fg: "#fecaca", t: "Login allows unlimited password attempts", area: "Security" },
  { sev: "HIGH", bg: "#7f1d1d", fg: "#fecaca", t: "Checkout button does nothing on iPhone SE", area: "Broken flow" },
  { sev: "MED", bg: "#7c2d12", fg: "#fed7aa", t: "Contact form clears all fields after an error", area: "Broken flow" },
  { sev: "LOW", bg: "#27272a", fg: "#d4d4d8", t: "Home page images add 4 seconds to load time", area: "Speed" },
];

export const areas = [
  { k: "sec", t: "Security", items: ["Exposed data and unsafe forms", "Weak login and password rules", "Outdated libraries and missing protections"] },
  { k: "flow", t: "Broken flows", items: ["Sign-ups, checkouts and bookings that fail", "Dead links, dead ends and confusing steps", "Forms that lose what people typed"] },
  { k: "speed", t: "Speed and stability", items: ["Slow screens and page loads", "Crashes, freezes and error messages", "Heavy images and scripts"] },
  { k: "device", t: "Devices and browsers", items: ["Layouts that break on phones or tablets", "Bugs on older iOS or Android versions", "Problems in Safari, Chrome or Edge"] },
];

export const included = [
  "Security review",
  "User-flow testing",
  "Speed and stability check",
  "Device and browser testing",
  "Prioritised report with fixes",
  "20-minute walkthrough call",
];

export const steps = [
  { n: "1", t: "Send us the link", d: "Your website address or app store link, plus anything you’re worried about." },
  { n: "2", t: "Pay $79", d: "Secure checkout. Covered by the money-back guarantee." },
  { n: "3", t: "We run the audit", d: "Our team tests security, flows, speed and devices." },
  { n: "4", t: "Get your report", d: "Issues ranked by priority, with fixes and a walkthrough call." },
];

export const fit = [
  "Your original developer is no longer around",
  "Customers mention bugs, but you can’t reproduce them",
  "Sign-ups or sales dropped and you don’t know why",
  "You’re about to spend money on marketing",
  "Your app hasn’t been updated in over a year",
  "You handle customer logins, payments or personal data",
  "Your app was built with AI tools, or AI wrote parts of it",
  "Nobody independent has ever tested your app",
];

export const faqs = [
  { q: "What happens if you don’t find any issues?", a: "You get your $79 back in full. If the audit finds nothing worth fixing, you shouldn’t pay for it." },
  { q: "What do I get at the end?", a: "A written report listing every issue we found, ranked high, medium or low priority, with screenshots or screen recordings and a plain-English fix for each one. Then a 20-minute call to walk you through it." },
  { q: "Do you need my passwords or admin access?", a: "No. We audit the public version of your app or website. If you want logged-in areas checked, create a separate test account for us. Never share your own password." },
  { q: "Is the security check safe for my live app?", a: "Yes. We use non-destructive checks only: no load testing, no attempts to break in, and no changes to your data. We only review apps and websites you’re authorised to have tested." },
  { q: "Will you fix the problems you find?", a: "Only if you want us to. The report is written so you or any developer can act on it. If you’d like us to fix them, we’ll quote separately." },
  { q: "How long does it take?", a: "Your report arrives within [5] working days of payment." },
];
