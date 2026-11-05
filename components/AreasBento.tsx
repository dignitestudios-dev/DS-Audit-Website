import { areas } from "@/lib/content";

const blurb: Record<string, string> = {
  sec: "Where customer data, logins and payments could be reached by someone who shouldn’t reach them.",
  flow: "The sign-ups, checkouts and bookings that quietly fail.",
  speed: "How the site feels on a normal phone and a normal connection.",
  device: "What actually shows up on the screens your customers hold.",
};

/* Decorative visuals. All are aria-hidden: the text beside them carries the meaning. */
function Radar() {
  return (
    <div className="viz viz--radar" aria-hidden="true">
      <div className="radar">
        <span className="radar__dot radar__dot--a" />
        <span className="radar__dot radar__dot--b" />
        <span className="radar__dot radar__dot--c" />
      </div>
    </div>
  );
}

function Flow() {
  const steps = ["Sign up", "Cart", "Pay", "Done"];
  return (
    <div className="viz viz--flow" aria-hidden="true">
      <ol className="flow">
        {steps.map((s, i) => (
          <li key={s} className="flow__step">
            <span className={`flow__node${i === 2 ? " flow__node--bad" : ""}`}>{s}</span>
            {i < steps.length - 1 && <span className={`flow__link${i === 2 ? " flow__link--cut" : ""}`} />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Speed() {
  return (
    <div className="viz viz--speed" aria-hidden="true">
      <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="chart">
        <defs>
          <linearGradient id="spd-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f15c20" stopOpacity="0.35" />
            <stop offset="1" stopColor="#f15c20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 82 C20 74 30 88 50 78 S80 72 100 80 S130 64 148 74 L164 18 L182 76 S212 72 232 79 S272 70 300 76 V110 H0 Z" fill="url(#spd-fill)" />
        <path className="chart__line" pathLength="1" d="M0 82 C20 74 30 88 50 78 S80 72 100 80 S130 64 148 74 L164 18 L182 76 S212 72 232 79 S272 70 300 76" fill="none" stroke="#f15c20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="chart__spike" />
    </div>
  );
}

function Devices() {
  return (
    <div className="viz viz--devices" aria-hidden="true">
      <div className="devs">
        <span className="dev dev--phone" />
        <span className="dev dev--tablet" />
        <span className="dev dev--laptop"><span className="dev__base" /></span>
      </div>
      <div className="chipsline">
        {["Safari", "Chrome", "Edge", "iOS", "Android"].map((c) => <span key={c} className="mini">{c}</span>)}
      </div>
    </div>
  );
}

const visuals: Record<string, React.ReactNode> = { sec: <Radar />, flow: <Flow />, speed: <Speed />, device: <Devices /> };

export default function AreasBento() {
  return (
    <div className="bento">
      {areas.map((a) => (
        <article key={a.k} className={`bx bx--${a.k}`}>
          <div className="bx__copy">
            <h3 className="bx__t">{a.t}</h3>
            <p className="bx__p">{blurb[a.k]}</p>
            <ul className="bx__list">
              {a.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          {visuals[a.k]}
        </article>
      ))}
    </div>
  );
}
