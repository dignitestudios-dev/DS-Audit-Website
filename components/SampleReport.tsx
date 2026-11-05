import Link from "next/link";
import {
  SAMPLE_SITE,
  SAMPLE_TOTAL,
  SAMPLE_TOTALS,
  SAMPLE_URGENT,
  SEV_LABEL,
  type Sev,
  sampleFindings,
} from "@/lib/report";

const order: Sev[] = ["critical", "high", "medium", "low"];

export default function SampleReport() {
  return (
    <div className="smp__grid">
      <aside className="smp__aside" aria-label="Sample report summary">
        <div className="smp__intro">
          <h2 className="h2" id="sample-title">What a finished report looks like</h2>
          <p className="lede">
            An example report for a made-up online shop. Open any finding to see how it&apos;s written up: what we found, why it matters and how to fix it.
          </p>
        </div>

        <div className="smp__gauge">
          <svg className="ring" viewBox="0 0 120 120" role="img" aria-label={`${SAMPLE_URGENT} of ${SAMPLE_TOTAL} findings need fixing this week`}>
            <circle className="ring__track" cx="60" cy="60" r="52" />
            <circle className="ring__bar" cx="60" cy="60" r="52" />
            <text className="ring__num" x="60" y="60" textAnchor="middle" dominantBaseline="central">{SAMPLE_URGENT}</text>
          </svg>
          <p className="gauge__text">
            of <strong>{SAMPLE_TOTAL}</strong> example findings are critical or high. These are the ones to fix first.
          </p>
        </div>

        <ul className="legend" aria-label="Findings by severity">
          {order.map((s) => (
            <li key={s} className="legend__row">
              <span>{SEV_LABEL[s]}</span>
              <span className="legend__bar" aria-hidden="true">
                <span className={`legend__fill legend__fill--${s}`} style={{ "--w": `${(SAMPLE_TOTALS[s] / SAMPLE_TOTAL) * 100}%` } as React.CSSProperties} />
              </span>
              <span className="legend__n">{SAMPLE_TOTALS[s]}</span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="smp__sheet">
        <div className="smp__sheethead">
          <h3 className="smp__sheettitle">{SAMPLE_SITE}</h3>
          <span className="smp__sheetmeta">Example report</span>
        </div>

        {sampleFindings.map((f, i) => (
          <details key={f.title} className="find" name="finding" open={i === 0}>
            <summary className="find__sum">
              <span className={`stamp stamp--${f.sev}`}>{SEV_LABEL[f.sev]}</span>
              <span className="find__t">
                {f.title}
                <span className="find__area">{f.area}</span>
              </span>
              <span className="find__chev" aria-hidden="true" />
            </summary>
            <div className="find__body">
              <div>
                <h4>What we found</h4>
                <p>{f.found}</p>
              </div>
              <div>
                <h4>Why it matters</h4>
                <p>{f.why}</p>
              </div>
              <div className="find__fix">
                <h4>How to fix it</h4>
                <p>{f.fix}</p>
              </div>
            </div>
          </details>
        ))}

        <div className="find__more">
          <span>Every finding comes with a screenshot or screen recording and a plain-English fix.</span>
          <Link href="/#order">Get my audit · $79</Link>
        </div>
      </div>
    </div>
  );
}
