import { NextResponse } from "next/server";

import { SMS_CONSENT_VERSION } from "@/lib/content";

const KINDS = ["web", "webapp", "mobile"];

// Best-effort rate limit (per server instance): 5 requests per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

/**
 * Receives the order form, validates it and appends it to a Google Sheet through an
 * Apps Script web app (SHEETS_WEBHOOK_URL), authenticated with a shared secret (SHEETS_SECRET).
 * In development, with those variables unset, the request is only logged.
 */
export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  // The per-IP limit only applies in production (in dev every request shares one address).
  if (process.env.NODE_ENV === "production" && limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Anti-bot: a person needs a few seconds to fill in the form; scripts post instantly.
  // (A hidden "honeypot" field was removed: browser extensions fill hidden fields and
  // silently discarded real visitors.) Rejections are explicit so nobody is told it worked.
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsed < 1500) {
    console.warn("[audit-request] rejected: submitted too fast (" + elapsed + " ms)");
    return NextResponse.json({ error: "Please try again" }, { status: 400 });
  }

  const { name, email, kinds, link, worry, authorised } = body;
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const phoneOk = phone === "" || (/^[+\d][\d\s().-]{5,}$/.test(phone) && phone.replace(/\D/g, "").length >= 7);
  // Text messages need a phone number; consent can never be recorded without one.
  const smsConsent = body.smsConsent === true;
  const validKinds =
    Array.isArray(kinds) && kinds.length > 0 && kinds.every((k) => typeof k === "string" && KINDS.includes(k));

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email) ||
    !validKinds ||
    typeof link !== "string" || !link.trim() ||
    authorised !== true ||
    !phoneOk ||
    (smsConsent && phone === "")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const record = {
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    kinds: [...new Set(kinds as string[])],
    link: link.trim().slice(0, 1000),
    worry: typeof worry === "string" ? worry.slice(0, 5000) : "",
    authorised: true,
    phone,
    smsConsent,
    smsConsentVersion: smsConsent ? SMS_CONSENT_VERSION : "",
  };

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;

  if (!url || !secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[audit-request] SHEETS_WEBHOOK_URL / SHEETS_SECRET are not set; request not saved");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }
    console.warn("[audit-request] SHEETS_WEBHOOK_URL / SHEETS_SECRET not set, so this was NOT saved to the sheet:", record);
    return NextResponse.json({ ok: true, saved: false });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain keeps this a "simple" request; Apps Script reads the raw body either way.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...record }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !data?.ok) throw new Error("Sheet rejected the request (status " + res.status + ")");
  } catch (err) {
    console.error("[audit-request] could not save to Google Sheets:", err);
    return NextResponse.json({ error: "Could not save" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, saved: true });
}
