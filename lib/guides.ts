import type { Article } from "./articles";
import { vibeGuide } from "./guide-vibe";

// Long-form, search-intent guides. Keep newest first (the home page shows the first three).
export const guides: Article[] = [
  vibeGuide,
  {
    slug: "website-security-checklist",
    metaTitle: "Small Business Website Security Checklist",
    title: "A plain-English website and app security checklist for small businesses",
    summary:
      "Twenty-eight checks you can run yourself in an afternoon, from forgotten admin logins to unlocked domains. No security degree needed.",
    category: "Guide",
    date: "2026-11-05",
    readMinutes: 9,
    faq: [
      {
        q: "How often should I run through a security checklist?",
        a: "Do the full list twice a year, and repeat the access and update checks whenever someone joins or leaves the team, or after any big release.",
      },
      {
        q: "Is a checklist enough to keep my site safe?",
        a: "It catches the common, avoidable problems, which is where most real-world break-ins start. It won't find flaws in your own code, such as a login form that can be guessed at forever. That takes someone testing the live app.",
      },
      {
        q: "Do I need to be technical to use this?",
        a: "No. Every item says what to look at and what a good answer sounds like. If a step needs a developer, we say so.",
      },
    ],
    body: [
      { type: "p", text: "Most small-business sites don't get hacked by a genius in a hoodie. They get hacked because a plugin was two years out of date, because a former freelancer still had an admin login, or because a backup file was sitting in a public folder with the database password inside." },
      { type: "p", text: "The good news is that the boring stuff is also the fixable stuff. This checklist is the version we'd hand to a friend who runs a shop, a booking site or a small app and has no idea where to begin. Grab a coffee and work through it. Anything you can't answer is already useful information." },

      { type: "h", text: "1. Who can get in?" },
      { type: "p", text: "Start with people, because accounts are the front door. A strong lock doesn't help if you've handed out too many keys." },
      { type: "ol", items: [
        "**List every account that can change your site.** Hosting, domain registrar, CMS or admin panel, app stores, email, payment provider. If you can't produce the list in ten minutes, that's your first finding.",
        "**Remove anyone who doesn't need access today.** Past developers, agencies, interns and that one contractor from 2021. Delete the account instead of just changing the password.",
        "**Turn on two-step login everywhere it's offered**, starting with email, the domain registrar and hosting. Whoever controls your email can reset almost every other password.",
        "**Stop sharing one login.** If three people use the same admin account, you can't tell who did what, and you can't remove one person without changing it for everyone.",
        "**Check passwords against known leaks.** Paste your work email into [Have I Been Pwned](https://haveibeenpwned.com/) and change anything that shows up. A password manager makes long, unique passwords painless.",
      ] },

      { type: "h", text: "2. Is everything up to date?" },
      { type: "p", text: "Old software is the most common way in, because attackers don't need to find new flaws when published ones still work." },
      { type: "ol", items: [
        "**Know your versions.** Which CMS, which plugins or themes, which PHP or Node version, which app libraries. Write them down once.",
        "**Update plugins, themes and libraries on a schedule**, not when you remember. Monthly is a sensible default; critical security fixes shouldn't wait.",
        "**Delete what you don't use.** An inactive plugin still sits on your server and can still be attacked. Fewer things installed means fewer things to patch.",
        "**Check your server language is still supported.** If you run PHP, look at the [supported versions page](https://www.php.net/supported-versions.php). Versions past their end-of-life date get no security fixes at all.",
      ] },
      { type: "p", text: "Running PHP and seeing odd errors on screen? That's worth fixing too. Our guide to [common PHP errors](/news/fix-common-php-errors) explains what each one means." },

      { type: "h", text: "3. Is your connection and setup locked down?" },
      { type: "ol", items: [
        "**Every page loads over HTTPS**, and `http://` redirects to `https://`. Test both, including the www and non-www versions.",
        "**Run your domain through [SSL Labs](https://www.ssllabs.com/ssltest/).** You're looking for a good grade and no warnings about old protocols.",
        "**Check your security headers** with a free scanner such as [securityheaders.com](https://securityheaders.com/). The ones that matter most for a typical site are `Strict-Transport-Security`, `X-Content-Type-Options` and a framing rule (`frame-ancestors` or `X-Frame-Options`) so nobody can embed your site inside theirs.",
        "**Lock your domain.** Ask your registrar to enable a transfer lock and make sure its account has two-step login. Losing a domain is one of the most painful and least recoverable mistakes.",
        "**Look at your DNS records** for anything you don't recognise, especially old subdomains pointing at services you stopped paying for.",
      ] },

      { type: "h", text: "4. Is anything sitting where it shouldn't?" },
      { type: "p", text: "This is the section people are most surprised by. Files meant for you end up public all the time." },
      { type: "ol", items: [
        "**Try a few addresses on your own site**: `/.env`, `/.git/config`, `/backup.zip`, `/phpinfo.php`. Each one should return a \"not found\" or \"forbidden\" page. If any of them shows content, treat it as an emergency. We wrote a full walkthrough on [exposed .env files and leaked keys](/news/exposed-env-file-api-key-leak).",
        "**Make sure folders don't list their contents.** Visit a folder URL such as `/uploads/` and check you don't get a file list.",
        "**Find your admin pages** (`/admin`, `/wp-admin`, `/login`). They don't have to be secret, but they should require a strong login, ideally with two-step verification and a limit on failed attempts.",
        "**Search for leftovers**: old staging sites, \"test\" subdomains, and copies like `site-old` or `v2-backup`. If it's still online, it's still attackable.",
      ] },

      { type: "h", text: "5. Do your forms and logins fight back?" },
      { type: "ol", items: [
        "**Try ten wrong passwords in a row** on your own login. If nothing slows you down or locks you out, an attacker can guess all day. This one is surprisingly common, and it's a real finding in many audits.",
        "**Submit your contact form with silly input**, such as a very long message, special characters and an empty required field. It should show a clear error and keep what you typed.",
        "**Check you receive form messages**, and that spam doesn't flood you. A simple honeypot field or a privacy-friendly challenge helps.",
        "**Look at what error messages reveal.** \"Wrong password\" is fine. A page full of file paths and database details is not.",
      ] },

      { type: "h", text: "6. Can you recover from a bad day?" },
      { type: "ol", items: [
        "**Have automatic backups of both files and database.** A decent rule of thumb is three copies, on two kinds of storage, with one kept somewhere else.",
        "**Restore one.** A backup you've never restored is a hope, not a plan. Try it on a test copy once and time how long it takes.",
        "**Know who to call.** Write down who handles hosting, the domain, and the developer who can fix things, along with how to reach each of them out of hours.",
      ] },

      { type: "h", text: "7. What else runs on your pages?" },
      { type: "ol", items: [
        "**List every third-party script**: analytics, chat widgets, ad pixels, fonts, booking tools. Each one runs with the same power as your own code.",
        "**Remove the ones nobody uses.** They slow the site down and widen the target.",
        "**For mobile apps, update your SDKs** and check that no secret keys are bundled inside the app. Anything shipped in the app file can be pulled out by anyone who wants to.",
      ] },

      { type: "h", text: "A quick way to score yourself" },
      { type: "p", text: "Count how many of the 28 items you could answer confidently without looking anything up. Twenty or more means you're in better shape than most small businesses. Under fourteen means there's likely something exposed, and it's cheaper to find it now than after a customer reports it." },

      { type: "h", text: "What a checklist can't do" },
      { type: "p", text: "Everything above is visible from the outside or from your account settings. It won't tell you whether the checkout works on an older iPhone, whether your own code builds database queries safely, or whether one particular page quietly leaks customer details. Those need someone to test the real thing, on real devices, with a trained eye." },
      { type: "p", text: "That's the gap our audit fills. You send us the link, we test your live app or site, and you get a report that ranks every issue by priority with a plain-English fix for each." },
    ],
  },

  {
    slug: "exposed-env-file-api-key-leak",
    metaTitle: "Exposed .env File? How to Check and Fix It",
    title: "Exposed .env files and leaked API keys: how to check your site and what to do next",
    summary:
      "A public .env file or leaked API key hands over your database and payments. Test your site in minutes and learn what to do if you find one.",
    category: "Guide",
    date: "2026-11-05",
    readMinutes: 8,
    faq: [
      {
        q: "If I delete the exposed file, am I safe?",
        a: "No. Deleting the file stops new visitors from seeing it, but anyone who already fetched it still has your secrets. Rotate every key that was in it, then investigate.",
      },
      {
        q: "Is it safe to put API keys in a mobile app?",
        a: "Not if the key is a secret. Anything inside the app file can be extracted. Keep secret keys on your server, and only ship keys designed to be public, ideally restricted to your app.",
      },
      {
        q: "How fast do attackers find an exposed .env file?",
        a: "Automated scanners request the same well-known paths on a huge number of sites around the clock, so you should assume a newly exposed file can be found quickly. We can't give an exact time, and it varies, so don't count on having days.",
      },
    ],
    body: [
      { type: "p", text: "Open a new browser tab, type your site's address, and add `/.env` on the end. If anything other than a \"not found\" page comes back, stop reading and go to the section on what to do. If it's clean, keep reading, because that one URL is only the start." },
      { type: "p", text: "A `.env` file is where many projects keep their private settings: database passwords, payment keys, email credentials, tokens for other services. It's meant to live on your server and nowhere else. When it ends up somewhere the public can reach, anyone can read it, and no hacking is required." },

      { type: "h", text: "How secrets end up in public" },
      { type: "p", text: "It's rarely carelessness in the dramatic sense. It's almost always a small setup choice that nobody revisited." },
      { type: "ul", items: [
        "**The web server points at the project folder** instead of a dedicated `public` folder, so every file inside is downloadable.",
        "**A key gets committed to a repository** for a quick test, then deleted in the next commit. The history still remembers it.",
        "**A backup or staging copy is left online**, such as `backup.zip`, `site-old/` or `dev.yoursite.com`, often with a full copy of the configuration.",
        "**Debug tools stay switched on**, like a `phpinfo.php` page or a log file such as `storage/logs/laravel.log` that prints settings and stack traces.",
        "**Secrets are baked into the front end.** In Next.js, any variable starting with `NEXT_PUBLIC_` is written into the JavaScript that every visitor downloads. The same goes for mobile apps: the key is inside the file people install.",
      ] },

      { type: "h", text: "Check your own site in five minutes" },
      { type: "p", text: "Only test sites you own or are allowed to test. From a terminal, this prints the status code for a few well-known paths:" },
      { type: "code", text: "for p in .env .git/config .git/HEAD backup.zip phpinfo.php wp-config.php.bak; do\n  echo \"$p -> $(curl -s -o /dev/null -w '%{http_code}' https://yoursite.com/$p)\"\ndone" },
      { type: "p", text: "A 404 or 403 is what you want. A 200 needs a second look, because single-page apps often answer 200 with their normal home page for any address. Open the URL in a browser and check whether you're seeing your settings or just your site." },
      { type: "p", text: "Then look beyond that list. Search your project history for strings that look like keys, and check the places you might have forgotten: old repositories, shared documents, chat messages, and the JavaScript your site serves (open the browser's developer tools, go to the Sources tab, and search for words like `key`, `secret` and `token`)." },

      { type: "h", text: "If you find one: do these in order" },
      { type: "ol", items: [
        "**Rotate first, investigate second.** Create new credentials and revoke the old ones before anything else. Every minute the old key works is a minute someone can use it.",
        "**Rotate everything in the file**, not just the one you noticed. Database password, mail login, payment keys, third-party tokens, session or encryption secrets.",
        "**Check for use you didn't make.** Look at the provider dashboards for unusual activity: odd logins, unexpected charges, new users, large data exports, API calls from places you don't operate.",
        "**Close the hole.** Fix the cause so the new secrets don't leak the same way (see below).",
        "**Tell the people who need to know.** If customer data could have been reached, you may have legal or contractual duties to report it. Get advice early rather than late.",
        "**Clean the history if the key was in a repository.** Tools like `git filter-repo` or BFG Repo-Cleaner can strip it out, but treat this as tidying. The key is already compromised, so rotation is what protects you.",
      ] },

      { type: "h", text: "Close the door properly" },
      { type: "h3", text: "Point the server at a public folder" },
      { type: "p", text: "Your web root should contain only what visitors are meant to download. Frameworks like Laravel, Symfony and Next.js are designed around this. The project's private files sit one level above." },
      { type: "h3", text: "Block dotfiles as a safety net" },
      { type: "p", text: "Even with a correct setup, one rule that denies anything starting with a dot costs nothing. On Nginx:" },
      { type: "code", text: "location ~ /\\.(?!well-known) {\n    deny all;\n}" },
      { type: "p", text: "And on Apache:" },
      { type: "code", text: "<FilesMatch \"^\\.\">\n    Require all denied\n</FilesMatch>" },
      { type: "h3", text: "Keep secrets out of version control" },
      { type: "p", text: "Add `.env` to `.gitignore` on day one. Commit a `.env.example` with the variable names but fake values, so teammates know what to fill in. Turn on your host's secret scanning if it has one. GitHub, for example, offers secret scanning and push protection that can block a commit containing a recognised key." },
      { type: "h3", text: "Use the right kind of key in the right place" },
      { type: "p", text: "Many services issue two types. Stripe, for instance, has publishable keys (starting `pk_`) that are meant to appear in a browser, and secret keys (starting `sk_`) that must never leave your server. Mixing them up is a classic mistake. Where a key has to be public, such as a maps key, restrict it to your domain or your app's ID so it's useless elsewhere." },
      { type: "h3", text: "Give each key the smallest job possible" },
      { type: "p", text: "A key that can only send email can't drain your database. Create one per service and per environment, with only the permissions it needs. When something leaks, the damage stays small." },

      { type: "h", text: "What about mobile apps?" },
      { type: "p", text: "Assume that anything you put inside an app can be read. People unpack app files for fun. If your app needs to call a service with a secret key, have it call your own server instead, and let that server hold the key and decide what the app is allowed to do." },

      { type: "h", text: "The short version" },
      { type: "ul", items: [
        "Test `/.env` and `/.git/config` on your site today.",
        "If anything is exposed, rotate every secret first and ask questions after.",
        "Serve only a public folder, block dotfiles, and keep `.env` out of Git.",
        "Use restricted, single-purpose keys, and never ship secret keys inside an app.",
      ] },
      { type: "p", text: "Want a second pair of eyes? Exposed files and keys are one of the first things we look for in an audit, along with the other issues in our [security checklist](/news/website-security-checklist)." },
    ],
  },

  {
    slug: "fix-common-php-errors",
    metaTitle: "Common PHP Errors and How to Fix Them",
    title: "Common PHP errors and how to fix them without breaking your live site",
    summary:
      "What common PHP errors mean, how to find the real cause, and the settings that stop errors leaking to visitors on your live site.",
    category: "PHP",
    date: "2026-11-05",
    readMinutes: 10,
    faq: [
      {
        q: "Why do I get a blank white page instead of an error?",
        a: "Usually a fatal error happened while display_errors is off, which is the correct setting for a live site. The message is in your PHP error log. Find that log and the cause will be there.",
      },
      {
        q: "Is it safe to turn display_errors on for a live site to debug?",
        a: "Avoid it. Error messages can expose file paths, database names and parts of queries to every visitor. Turn on log_errors and read the log, or reproduce the problem on a staging copy.",
      },
      {
        q: "Should I just raise memory_limit when I see a memory error?",
        a: "It can buy you time, but it rarely fixes the cause. A script that eats gigabytes is usually loading too much data at once, so look for unpaginated queries and huge files before raising the limit.",
      },
    ],
    body: [
      { type: "p", text: "A PHP error can feel like the site just fell over for no reason. In reality, PHP is usually telling you quite precisely what went wrong. The trouble is that on a live site that message is either hidden behind a blank page or, worse, printed straight onto the screen for everyone to read." },
      { type: "p", text: "This guide does two things. First, it shows you how to make PHP tell you what's wrong, safely. Then it walks through the errors we see most often, what causes them, and what to do." },

      { type: "h", text: "Step zero: make PHP show you the real error" },
      { type: "p", text: "Before you change any code, find the message. Visitors shouldn't see errors, but you need them somewhere. The standard setup for a live site is to hide them from the page and write them to a log file:" },
      { type: "code", text: "; php.ini on a live site\ndisplay_errors = Off\nlog_errors = On\nerror_log = /var/log/php/error.log\nerror_reporting = E_ALL" },
      { type: "p", text: "The log path varies by host. If you're unsure where yours lives, run `phpinfo()` on a private page (and delete it afterwards) and look at the `error_log` value, or ask your host. On a local or staging copy, you can safely set `display_errors = On` to see problems right in the browser." },
      { type: "p", text: "A related tip: a 500 error with no PHP message at all often comes from the web server, not PHP. A typo in `.htaccess` is a classic cause on Apache. Check the web server's error log as well." },

      { type: "h", text: "The errors you'll meet most" },

      { type: "h3", text: "\"Allowed memory size of … bytes exhausted\"" },
      { type: "p", text: "A script tried to use more memory than `memory_limit` allows. The common culprits are loading a whole table into an array, resizing very large images, or a loop that keeps growing a list." },
      { type: "ul", items: [
        "Fetch in pages or chunks (`LIMIT` and `OFFSET`) instead of everything at once.",
        "Free large variables you're done with, or process files line by line.",
        "On WordPress, you can raise the limit with `define('WP_MEMORY_LIMIT', '256M');` in `wp-config.php`. Treat this as a patch, and find which plugin or page is hungry.",
      ] },

      { type: "h3", text: "\"Maximum execution time of 30 seconds exceeded\"" },
      { type: "p", text: "The script ran longer than `max_execution_time`, which defaults to 30 seconds for web requests. Slow database queries and calls to other services with no timeout are the usual reasons. Set a timeout on outgoing requests (for cURL, `CURLOPT_TIMEOUT`), add indexes where queries are slow, and move heavy jobs such as report generation or bulk emails to a background task instead of the page request." },

      { type: "h3", text: "\"Call to undefined function\"" },
      { type: "p", text: "PHP can't find a function you used. There are three typical reasons:" },
      { type: "ul", items: [
        "**A missing extension.** Functions like `mb_strlen()` or `curl_init()` only exist if the `mbstring` or `curl` extensions are installed. Install and enable them (on Ubuntu the package is usually named something like `php-mbstring`), then restart PHP.",
        "**A version change.** The function was removed or renamed in the PHP version you upgraded to. Check the migration notes for that version.",
        "**A file that wasn't loaded.** The code lives in a file that never got included. With Composer, running `composer dump-autoload` often solves it.",
      ] },

      { type: "h3", text: "\"Call to a member function something() on null\"" },
      { type: "p", text: "You tried to use an object that doesn't exist. A database lookup found no row, or a variable was never set, and the code went on as if it had. Check the value before using it. On PHP 8 and later, the null-safe operator keeps things tidy:" },
      { type: "code", text: "// Stops with a fatal error if $user is null\n$name = $user->getProfile()->name;\n\n// Returns null instead (PHP 8.0+)\n$name = $user?->getProfile()?->name;" },
      { type: "p", text: "That removes the crash, but you still need to decide what the page should do when there's nothing there. Show a friendly message, not a blank space." },

      { type: "h3", text: "\"Class not found\"" },
      { type: "p", text: "Often a spelling or capitalisation problem. Windows doesn't care whether it's `User.php` or `user.php`; a Linux server does. Code written on a laptop can break the moment it's deployed. Check the namespace, the file name's case, and your autoloader settings." },

      { type: "h3", text: "\"Cannot modify header information: headers already sent\"" },
      { type: "p", text: "PHP must send headers (for redirects, cookies and sessions) before any page content. If anything has been output earlier, even a single space, it fails. The usual causes are whitespace or a hidden byte-order mark before the opening `<?php` tag, an `echo` that runs before `header()` or `session_start()`, and blank lines after a closing `?>` tag. The error message even names the file and line where the output began, so start there. In files that contain only PHP, leaving off the closing tag avoids the trailing-whitespace trap altogether." },

      { type: "h3", text: "\"Parse error: syntax error, unexpected …\"" },
      { type: "p", text: "A typo: a missing semicolon, an unclosed bracket, or a stray quote. If the code ran fine elsewhere, suspect a version mismatch. Newer syntax such as the `match` expression (PHP 8.0) will produce a parse error on an older server." },

      { type: "h3", text: "\"Undefined variable\" and \"Undefined array key\"" },
      { type: "p", text: "These are warnings, so the page often keeps working, which is exactly why they pile up unnoticed. Since PHP 8, a missing array key is reported as a warning rather than a quiet notice. Give the value a fallback:" },
      { type: "code", text: "// Warns if 'phone' is missing\n$phone = $_POST['phone'];\n\n// Safe default\n$phone = $_POST['phone'] ?? '';" },

      { type: "h3", text: "\"Deprecated\" notices" },
      { type: "p", text: "The code works today but won't forever. Two you'll likely meet on newer versions: passing `null` to a built-in function parameter that doesn't accept it (deprecated in PHP 8.1), and creating properties on an object without declaring them (deprecated in PHP 8.2). They're warnings that an upgrade is coming, so fix them before it does." },

      { type: "h3", text: "Database connection errors" },
      { type: "p", text: "Messages like \"Access denied for user\" or \"Connection refused\" mean the host, username, password or database name in your settings is wrong, the database server is down, or you've hit the connection limit. Check the credentials first, then your host's status page. And note that this type of message can contain your database host and username, which is one more reason not to show errors on screen." },

      { type: "h", text: "Why errors on screen are a security problem" },
      { type: "p", text: "A visible error isn't only embarrassing. It can show the full path of your files on the server, the names of your database and tables, fragments of the query, and the exact versions and libraries you use. That's a free map for anyone planning an attack, and it costs them nothing to read. Keep `display_errors` off, log everything, and set up an alert when the error count jumps." },

      { type: "h", text: "Keep your PHP version supported" },
      { type: "p", text: "Old versions stop receiving security fixes. PHP 7.4 and 8.0 are both long past end of life, and sites still running them are exposed to every flaw found since. Check the official [supported versions](https://www.php.net/supported-versions.php) page, then plan an upgrade. Our walkthrough of [what to check on your site](/news/website-security-checklist) covers this alongside everything else." },

      { type: "h", text: "When to ask for help" },
      { type: "p", text: "If errors keep coming back after you've fixed them one by one, there's usually an underlying issue: an unsupported version, a plugin that doesn't get on with another, or code that was never written to handle the unexpected. That's the kind of thing an audit turns up quickly, and it's cheaper to fix when you can see the full list in priority order." },
    ],
  },
];
