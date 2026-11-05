import Link from "next/link";

const misses = [
  { t: "Checks on who can see what", d: "The page works, so nobody asked whether any logged-in user can open someone else’s order." },
  { t: "Secrets in the wrong place", d: "Keys pasted into front-end code, a prompt or a public repository." },
  { t: "Databases left open", d: "Access rules loosened “just to make the error go away”, then never tightened." },
  { t: "Packages nobody vetted", d: "Assistants can suggest outdated libraries, or names that don’t exist and can be registered by someone else." },
  { t: "No limits", d: "Unlimited password guesses, and unlimited calls to a paid AI service on your account." },
];

const risks = [
  { t: "Customer data gets out", d: "One missing check can put every customer’s details a guess away from a stranger." },
  { t: "Accounts get taken over", d: "Weak login rules and endless guesses make it easy." },
  { t: "Surprise bills", d: "A leaked key or an open AI endpoint can be used by anyone, on your account." },
  { t: "Trust is hard to win back", d: "Emergency fixes, support time and lost customers cost more than finding the gap first." },
];

export default function AiSection() {
  return (
    <div className="wrap ai">
      <div className="ai__head">
        <h2 className="h2" id="ai-title">Built with AI? It still needs a second pair of eyes.</h2>
        <p className="lede">
          AI tools can get an app running in an afternoon. They&apos;re far less good at asking what could go wrong. Code that works in the demo isn&apos;t always code that&apos;s safe to put in front of customers.
        </p>
      </div>

      <div className="ai__grid">
        <div className="ai__misses">
          <h3 className="ai__sub">What AI-built apps often miss</h3>
          <ul className="miss">
            {misses.map((m) => (
              <li key={m.t} className="miss__item">
                <span className="miss__t">{m.t}</span>
                <span className="miss__d">{m.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="codes">
          <figure className="code code--bad">
            <figcaption className="code__bar">
              <span>Works in the demo</span>
              <span className="code__flag">Nothing checks who is asking</span>
            </figcaption>
            <pre tabIndex={0} className="code__pre"><code>
              <span className="ln ln--dim">{"// Any visitor can read any order"}</span>
              <span className="ln">{"app.get(\"/api/orders/:id\", async (req, res) => {"}</span>
              <span className="ln ln--bad">{"  const order = await db.orders.find(req.params.id);"}</span>
              <span className="ln ln--bad">{"  res.json(order);"}</span>
              <span className="ln">{"});"}</span>
            </code></pre>
          </figure>
          <figure className="code code--good">
            <figcaption className="code__bar">
              <span>Safe to ship</span>
              <span className="code__flag code__flag--good">Checks the order belongs to them</span>
            </figcaption>
            <pre tabIndex={0} className="code__pre"><code>
              <span className="ln ln--dim">{"// Only the owner can read their order"}</span>
              <span className="ln ln--good">{"app.get(\"/api/orders/:id\", requireLogin, async (req, res) => {"}</span>
              <span className="ln">{"  const order = await db.orders.find(req.params.id);"}</span>
              <span className="ln ln--good">{"  if (order.userId !== req.user.id) return res.sendStatus(404);"}</span>
              <span className="ln">{"  res.json(order);"}</span>
              <span className="ln">{"});"}</span>
            </code></pre>
          </figure>
        </div>
      </div>

      <div className="risks">
        <h3 className="ai__sub">If it&apos;s never properly checked</h3>
        <ul className="risks__row">
          {risks.map((r) => (
            <li key={r.t} className="risk">
              <span className="risk__t">{r.t}</span>
              <span className="risk__d">{r.d}</span>
            </li>
          ))}
        </ul>
        <p className="ai__foot">
          An audit is the cheap way to find out. Read more in{" "}
          <Link href="/news/vibe-coded-apps-security-risks">Vibe-coded apps and security: what AI-built software often gets wrong</Link>.
        </p>
      </div>
    </div>
  );
}
