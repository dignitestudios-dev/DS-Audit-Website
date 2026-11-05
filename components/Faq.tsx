import { faqs } from "@/lib/content";

/** Native <details>: no client JavaScript, keyboard accessible, searchable with find-in-page. */
export default function Faq() {
  return (
    <div>
      {faqs.map((f, i) => (
        <details key={f.q} className="qa" name="faq" open={i === 0}>
          <summary className="qa__q">
            <span>{f.q}</span>
            <span className="qa__icon" aria-hidden="true" />
          </summary>
          <p className="qa__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
