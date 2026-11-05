// Sample report content. Everything here is fictional: a made-up online shop, used to show
// the kind of issue we look for and how each finding is written up.

export type Sev = "critical" | "high" | "medium" | "low";

export const SEV_LABEL: Record<Sev, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export type SampleFinding = {
  sev: Sev;
  title: string;
  area: string;
  found: string;
  why: string;
  fix: string;
};

export const SAMPLE_SITE = "shop.example.com";

// Counts match the findings written out below, so nothing in the UI refers to unseen findings.
export const SAMPLE_TOTALS = { critical: 2, high: 3, medium: 3, low: 1 } as const;
export const SAMPLE_TOTAL = 9;
export const SAMPLE_URGENT = SAMPLE_TOTALS.critical + SAMPLE_TOTALS.high; // fix first

export const sampleFindings: SampleFinding[] = [
  {
    sev: "critical",
    title: "Strangers can read other customers’ orders",
    area: "Security",
    found:
      "Changing the number at the end of an order link, from /orders/1042 to /orders/1043, shows another customer’s name, address and purchase. No login for that account is needed.",
    why: "Every customer’s personal details are one guess away from anyone who tries. Leaks like this can trigger legal duties to notify customers, depending on where you operate, and they’re hard to undo.",
    fix: "Check on the server that each order belongs to the signed-in customer before showing it. Use hard-to-guess IDs as a second layer, and review your logs for signs it has already been used.",
  },
  {
    sev: "critical",
    title: "A public web address hands out your live payment and database keys",
    area: "Security",
    found:
      "Opening shop.example.com/.env in a browser downloads the file the site uses for its private settings. It contains a live payment secret key and the database password.",
    why: "Anyone can use those keys to take payments, read the database or pose as your shop. Automated bots check for this exact file on every site they find, all day long.",
    fix: "Move private files out of the public folder, block access to hidden files, and replace every key that was in the file. Rotating them is the step that actually protects you.",
  },
  {
    sev: "high",
    title: "Login accepts unlimited password guesses",
    area: "Security",
    found:
      "We tried 200 wrong passwords in a row on the admin login. It never slowed down, locked the account or raised an alert.",
    why: "Attackers can run automated guesses all night. Passwords reused from other breaches make this succeed more often than most owners expect.",
    fix: "Limit failed attempts, require two-step verification for admin accounts, and alert on repeated failures.",
  },
  {
    sev: "high",
    title: "Checkout button does nothing on iPhone Safari",
    area: "Broken flow",
    found:
      "On an iPhone SE running an older iOS, tapping “Pay now” has no effect and no message appears. The same button works on desktop Chrome.",
    why: "iPhone shoppers get all the way to payment and hit a dead end. Nothing is logged, so nobody on your team ever sees it happen. It just looks like fewer sales.",
    fix: "A script uses a feature older Safari versions don’t support. The report points to the line, suggests a compatible rewrite, and adds error logging so the next failure is visible.",
  },
  {
    sev: "high",
    title: "The server runs PHP 7.4, which stopped getting security fixes in 2022",
    area: "Security",
    found: "Response headers and a leftover info page show PHP 7.4 running on the live server.",
    why: "Flaws found since then stay open on that version for good, and attackers scan the internet looking for exactly these versions.",
    fix: "Upgrade to a supported PHP release on a test copy first, fix the warnings it surfaces, then switch the live site over.",
  },
  {
    sev: "medium",
    title: "Contact form wipes the whole message after one error",
    area: "Broken flow",
    found: "Typing the phone number in the wrong format clears every field, including a long message.",
    why: "People who wrote a long message rarely write it twice, so you lose the enquiry without knowing it existed.",
    fix: "Keep what was typed when there’s an error, and say which field needs fixing.",
  },
  {
    sev: "medium",
    title: "Login cookie can be read by scripts and sent over plain HTTP",
    area: "Security",
    found: "The session cookie is missing its HttpOnly and Secure settings.",
    why: "If a malicious script ever runs on a page, or someone is on an untrusted network, the cookie can be copied and used to act as that customer.",
    fix: "Set HttpOnly, Secure and SameSite on session cookies. It’s usually a one-line change.",
  },
  {
    sev: "medium",
    title: "Error pages reveal file paths and database details",
    area: "Security",
    found: "A broken search URL shows a full error message with server folder names and the database user.",
    why: "It hands anyone a free map of how your site is built.",
    fix: "Turn off on-screen errors on the live site and write them to a log instead.",
  },
  {
    sev: "low",
    title: "Home page photo is 4.2 MB",
    area: "Speed",
    found: "The hero photo is about 20 times larger than it needs to be.",
    why: "On a mobile connection it adds around four seconds before the page looks finished.",
    fix: "Resize and compress it, use a modern image format, and load images further down the page only when they’re needed.",
  },
];

/** The four findings shown on the hero sheet (indexes into sampleFindings). */
export const heroFindings = [0, 1, 3, 2].map((i) => sampleFindings[i]);
