"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE_HREF, PRIVACY_URL, SUPPORT_EMAIL, SUPPORT_EMAIL_HREF, TERMS_URL } from "@/lib/content";

const kinds = [
  { id: "web", label: "Website" },
  { id: "webapp", label: "Web app" },
  { id: "mobile", label: "Mobile app" },
] as const;

type KindId = (typeof kinds)[number]["id"];
type Status = "idle" | "sending" | "sent" | "error";

// Shown in turn while the request is in flight. The last one stays until the server answers.
const PROGRESS = ["Sending your request", "Saving it securely", "Letting our team know", "Almost there"];
const MIN_BUSY_MS = 900; // so a very fast response doesn't flash

export default function OrderForm() {
  const [selected, setSelected] = useState<KindId[]>(["web"]);
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [selectError, setSelectError] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status !== "sending") return;
    const id = setInterval(() => setStep((s) => Math.min(s + 1, PROGRESS.length - 1)), 1500);
    return () => clearInterval(id);
  }, [status]);

  const hasApp = selected.includes("mobile");
  const hasWeb = selected.includes("web") || selected.includes("webapp");
  const linkLabel = hasApp && hasWeb ? "Website address and app store links" : hasApp ? "App Store or Google Play link" : "Website address";
  const linkPlaceholder = hasApp && hasWeb ? "https://yourwebsite.com, https://apps.apple.com/…" : hasApp ? "https://apps.apple.com/…" : "https://yourwebsite.com";

  const toggle = (id: KindId) => {
    setSelectError(false);
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (selected.length === 0) {
      setSelectError(true);
      return;
    }
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      kinds: selected,
      link: String(f.get("link") ?? ""),
      worry: String(f.get("worry") ?? ""),
      authorised: f.get("authorised") === "on",
      phone: String(f.get("phone") ?? ""),
      smsConsent,
      elapsedMs: Date.now() - openedAt.current,
    };
    setStep(0);
    setStatus("sending");
    const started = Date.now();
    let ok = false;
    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { saved?: boolean } | null;
      ok = res.ok && data?.saved === true;
    } catch {
      ok = false;
    }
    const wait = MIN_BUSY_MS - (Date.now() - started);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className="done" role="status">
        <div className="done__badge" aria-hidden="true">
          <span className="done__ring" />
          <svg className="done__svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle className="done__circle" cx="36" cy="36" r="30" stroke="#ff7a45" strokeWidth="4" strokeLinecap="round" />
            <path className="done__check" d="M23 37l9 9 17-19" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} className="confetti" style={{ "--a": `${i * (360 / 14)}deg`, "--d": `${58 + (i % 3) * 14}px`, "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <h3 className="done__title">Thanks, we&apos;ve got your request</h3>
        <p className="done__text">
          We&apos;ll email you with the next steps for auditing your {selected.map((id) => kinds.find((k) => k.id === id)!.label.toLowerCase()).join(", ")}.
        </p>
        <button type="button" className="btn btn--line" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} className="form" aria-busy={busy}>
      <fieldset className="form__set" disabled={busy}>
        <div className="form__row">
          <label htmlFor="f-name" className="field">
            Your name
            <input id="f-name" name="name" required autoComplete="name" placeholder="Jane Smith" className="input" />
          </label>
          <label htmlFor="f-email" className="field">
            Email
            <input id="f-email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className="input" />
          </label>
        </div>

        <label htmlFor="f-phone" className="field">
          <span>
            Phone number <span className="field__opt">{smsConsent ? "Required for text messages" : "Optional"}</span>
          </span>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required={smsConsent} placeholder="+1 555 123 4567" className="input" />
        </label>

        <fieldset className="chips">
          <legend className="chips__legend">
            What should we audit? <span className="field__opt">Select all that apply</span>
          </legend>
          <div className="chips__row">
            {kinds.map((k) => (
              <button key={k.id} type="button" className="chip" onClick={() => toggle(k.id)} aria-pressed={selected.includes(k.id)}>
                {k.label}
              </button>
            ))}
          </div>
          {selectError && <span role="alert" className="err">Please select at least one.</span>}
        </fieldset>

        <label htmlFor="f-link" className="field">
          {linkLabel}
          <input id="f-link" name="link" required placeholder={linkPlaceholder} className="input" />
        </label>

        <label htmlFor="f-worry" className="field">
          <span>
            Anything you&apos;re already worried about? <span className="field__opt">Optional</span>
          </span>
          <textarea id="f-worry" name="worry" rows={3} placeholder="e.g. Customers say the sign-up page freezes on Android" className="input" style={{ resize: "vertical" }} />
        </label>

        <label htmlFor="f-auth" className="check">
          <input id="f-auth" name="authorised" type="checkbox" required />
          <span>I own this app or website, or I&apos;m authorised to request a security and usability review of it.</span>
        </label>
        <label htmlFor="f-sms" className="check check--sms">
          <input id="f-sms" name="smsConsent" type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} />
          <span>
            By checking this box, I consent to receive SMS messages from Dignite Studios at the phone number I provided. Message and data rates may apply. Message frequency may vary. For assistance, reply HELP or email us at{" "}
            <a href={SUPPORT_EMAIL_HREF}>{SUPPORT_EMAIL}</a>. You may opt out at any time by replying STOP. See our{" "}
            <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a> and{" "}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy Policy</a> for more details.{" "}
            <a href={PHONE_HREF}>Talk to our experts</a>
          </span>
        </label>
      </fieldset>

      <button type="submit" className={`btn submit${busy ? " submit--busy" : ""}${status === "error" ? " submit--shake" : ""}`} aria-disabled={busy} aria-busy={busy}>
        {busy ? (
          <span className="submit__label">
            <span className="spin" aria-hidden="true" />
            <span key={step} className="submit__msg">{PROGRESS[step]}…</span>
          </span>
        ) : (
          <span className="submit__label">Submit request</span>
        )}
        {busy && <span className="submit__bar" aria-hidden="true" />}
      </button>

      {/* Screen readers hear one calm message, not every animation frame. */}
      <span className="sr-only" role="status">{busy ? "Sending your request, please wait." : ""}</span>
      {status === "error" && (
        <span role="alert" className="err">We couldn&apos;t send that. Please try again, or email us and we&apos;ll sort it out.</span>
      )}
      <span className="fine">Money-back guarantee: if we find no issues worth fixing, you get a full refund.</span>
    </form>
  );
}
