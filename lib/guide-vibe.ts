import type { Article } from "./articles";

export const vibeGuide: Article = {
  slug: "vibe-coded-apps-security-risks",
  title: "Vibe-coded apps and security: what AI-built software often gets wrong",
  metaTitle: "Vibe-Coded App Security: What to Check",
  summary:
    "AI can build a working app in an afternoon, but it's weak at asking what could go wrong. What AI-built apps tend to miss, and how to check yours.",
  category: "Guide",
  date: "2026-11-05",
  readMinutes: 8,
  faq: [
    {
      q: "Is AI-generated code less secure than code written by people?",
      a: "Not automatically. People write insecure code too. The difference is speed and review: an assistant can produce a lot of code quickly, and if nobody reads it carefully, the gaps ship along with the features.",
    },
    {
      q: "I built on Supabase or Firebase. Do I still need to worry?",
      a: "Those platforms give you good tools, but they rely on you to set the access rules correctly. Rules left open during testing and never tightened are one of the most common problems in apps built quickly.",
    },
    {
      q: "What's the quickest check I can do myself?",
      a: "Log out and try to open pages and data that should be private. Then create two test accounts, log in as the second, and try to open the first account's data by changing the number in the address.",
    },
  ],
  body: [
    { type: "p", text: "There has never been a faster way to turn an idea into a working app. You describe what you want, an AI assistant writes the code, and a few hours later there's a login page, a dashboard and a payment button. People call it vibe coding, and plenty of real businesses now run on it." },
    { type: "p", text: "The catch is that \"it works\" and \"it's safe\" are different questions. AI assistants are very good at the first one. The second needs someone who understands your whole system, your data and what an attacker would try, and an assistant working one prompt at a time rarely has that picture." },
    { type: "p", text: "None of this is an argument against using AI. It's an argument for treating what it writes the way you'd treat code from a fast, keen new hire: useful, but worth reviewing before it meets customers." },

    { type: "h", text: "Why AI-built apps tend to have gaps" },
    { type: "ul", items: [
      "**It aims for working, not safe.** The goal in the prompt is usually a feature. Nobody asked for \"and make sure strangers can't use it.\"",
      "**It sees a small slice.** It doesn't know which data is sensitive, who your users are, or how the rest of the app is wired.",
      "**It copies common patterns,** including the insecure ones that appear in countless tutorials and demos.",
      "**It fixes the error you pasted,** sometimes by switching off whatever was blocking the request: loosening a permission, opening a database rule, allowing every website to call your API.",
      "**The builder may not read the code.** That's the point of vibe coding, and also how problems stay hidden.",
    ] },

    { type: "h", text: "The gaps we'd check first" },

    { type: "h3", text: "1. Missing permission checks" },
    { type: "p", text: "This is the big one. An assistant builds a page that shows an order, and it works, so it moves on. Nothing checks that the order belongs to the person asking. Here's what that often looks like:" },
    { type: "code", text: "// Works in the demo. Any visitor can read any order.\napp.get(\"/api/orders/:id\", async (req, res) => {\n  const order = await db.orders.find(req.params.id);\n  res.json(order);\n});" },
    { type: "p", text: "The fix is one line, but someone has to know it's missing:" },
    { type: "code", text: "app.get(\"/api/orders/:id\", requireLogin, async (req, res) => {\n  const order = await db.orders.find(req.params.id);\n  if (order.userId !== req.user.id) return res.sendStatus(404);\n  res.json(order);\n});" },
    { type: "p", text: "A related trap: hiding a button isn't security. If the only thing stopping a normal user from reaching the admin area is that the link isn't shown, anyone who types the address gets in. The check has to happen on the server." },

    { type: "h3", text: "2. Secrets in the wrong place" },
    { type: "p", text: "Payment keys, database passwords and AI service keys have a habit of ending up in front-end code, in a public repository, or pasted into a chat. Some tools expose any variable with a certain prefix to the browser (`NEXT_PUBLIC_` in Next.js, `VITE_` in Vite), so a secret named the wrong way is published to every visitor. Our guide to [exposed .env files and leaked keys](/news/exposed-env-file-api-key-leak) shows how to check." },

    { type: "h3", text: "3. Databases and storage left open" },
    { type: "p", text: "Backend platforms make it easy to start with permissive settings so everything just works. Row-level security switched off, security rules in test mode, a storage bucket that's public. Those are sensible for a prototype and dangerous once real customers arrive. If the rules were opened to make an error disappear, they probably never got closed." },

    { type: "h3", text: "4. Packages nobody vetted" },
    { type: "p", text: "Assistants add libraries freely. Some are old and carry known problems. Some suggestions are for packages that don't exist, and because attackers know this, they can register those names and wait. Before you accept a new dependency, check that it's real, maintained and widely used, keep a lockfile, and run your package manager's audit command now and then." },

    { type: "h3", text: "5. No limits" },
    { type: "p", text: "Login forms that accept endless guesses. Contact forms that anyone can hit a thousand times. And, newer, an endpoint that calls a paid AI service on your account with no cap, so a stranger can run up your bill. Limits are boring and rarely part of the first prompt." },

    { type: "h3", text: "6. Debug settings left on" },
    { type: "p", text: "Detailed error pages, test endpoints, default admin accounts and verbose logs are helpful while building and a gift to attackers afterwards. Our guide to [common PHP errors](/news/fix-common-php-errors) covers why on-screen errors matter, and the same idea applies to any stack." },

    { type: "h3", text: "7. If your app talks to an AI model" },
    { type: "p", text: "Text from users, emails or web pages can contain instructions the model might follow, which is known as prompt injection. Don't give the model more access than the person using it has, and treat what it returns as untrusted until it's checked." },

    { type: "h", text: "What happens if it's never properly checked" },
    { type: "ul", items: [
      "**Customer data is exposed,** sometimes without anyone noticing for months. Depending on where you operate, that can create legal duties to tell customers.",
      "**Accounts get taken over** through weak login rules and unlimited guesses.",
      "**You get a surprise bill** when a leaked key or open endpoint is used by someone else.",
      "**Things break or disappear,** when an unprotected action deletes data and there's no backup to restore.",
      "**You find out the hard way,** from a customer, a stranger or a news story, instead of from a report you could act on quietly.",
    ] },

    { type: "h", text: "A 30-minute check you can do yourself" },
    { type: "ol", items: [
      "**Go logged-out.** Open a private window and try the addresses of pages that should need a login, including admin and API routes.",
      "**Use two test accounts.** Log in as the second and try to open the first account's order, profile or file by changing the number in the address.",
      "**Look for keys.** Open your site, press F12, go to the Network and Sources tabs and search for words like `key`, `secret` and `token`.",
      "**Try the usual suspects:** `/.env` and `/.git/config` should not load.",
      "**Guess wrongly ten times** on your login. Something should slow you down.",
      "**Check your database and storage dashboard** for public or open access rules.",
      "**List your dependencies** and run the package manager's audit. Remove what you don't use.",
      "**Switch debug off** on the live site.",
    ] },
    { type: "p", text: "Asking the AI to review its own code is worth doing, and it often finds real issues. But it's the same author marking its own homework: it shares the same blind spots and can't see your live app. An independent look is a different thing." },

    { type: "h", text: "Using AI well, and safely" },
    { type: "ul", items: [
      "Put security requirements in the prompt, such as \"every route must check that the user owns the data.\"",
      "Read the changes, at least the ones that touch logins, payments and data access.",
      "Keep real keys out of prompts, chats and repositories.",
      "Add a few tests for permissions: user A must not reach user B's data.",
      "Have someone who didn't build it look at it before launch.",
    ] },
    { type: "p", text: "That last point is the gap our audit is built for. You send us the link, we test your live app the way a visitor would, and you get a report that ranks every issue by priority with a plain-English fix for each. Our [security checklist](/news/website-security-checklist) covers the basics you can do first." },
  ],
};
