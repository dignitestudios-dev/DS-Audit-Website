import { results, reviews } from "@/lib/proof";

function Stars() {
  return (
    <span className="stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="#ffb347" />
        </svg>
      ))}
    </span>
  );
}

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2);

/* Placeholder content: see lib/proof.ts. */
export default function Proof() {
  const [lead, ...rest] = reviews;
  return (
    <div className="wrap proof">
      <div className="proof__head">
        <h2 className="h2" id="proof-title">What teams found, and what changed</h2>
        <p className="lede">The issues that mattered, and what happened once they were fixed.</p>
      </div>

      <ul className="results">
        {results.map((r) => (
          <li key={r.who} className="result">
            <span className="result__n">{r.n}</span>
            <span className="result__l">{r.label}</span>
            <span className="result__who">{r.who}</span>
            <span className="result__d">{r.detail}</span>
          </li>
        ))}
      </ul>

      <div className="quotes">
        <figure className="quote quote--lead">
          <Stars />
          <blockquote className="quote__t quote__t--lead">&ldquo;{lead.quote}&rdquo;</blockquote>
          <figcaption className="quote__by">
            <span className="avatar" aria-hidden="true">{initials(lead.name)}</span>
            <span><strong>{lead.name}</strong><span className="quote__role">{lead.role}, {lead.company}</span></span>
          </figcaption>
        </figure>
        {rest.map((r) => (
          <figure key={r.name} className="quote">
            <Stars />
            <blockquote className="quote__t">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="quote__by">
              <span className="avatar" aria-hidden="true">{initials(r.name)}</span>
              <span><strong>{r.name}</strong><span className="quote__role">{r.role}, {r.company}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
