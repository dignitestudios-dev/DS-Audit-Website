import { heroFindings, SAMPLE_SITE, SEV_LABEL } from "@/lib/report";

/** Hero visual: a dark example report that is "inspected" once on load, then stamped. */
export default function HeroReport() {
  return (
    <figure className="rep" aria-label="Example audit report" style={{ margin: 0 }}>
      <span className="rep__scan" aria-hidden="true" />
      <div className="rep__head">
        <h2 className="rep__title">Audit report</h2>
        <span className="rep__tag">Example findings</span>
      </div>
      <p className="rep__meta">{SAMPLE_SITE}</p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {heroFindings.map((f, i) => (
          <li key={f.title} className="rep__row" style={{ "--i": i } as React.CSSProperties}>
            <span className={`stamp stamp--${f.sev}`}>{SEV_LABEL[f.sev]}</span>
            <span>
              <span className="rep__name">{f.title}</span>
              <span className="rep__area">{f.area}</span>
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
