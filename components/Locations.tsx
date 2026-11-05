import { locations, mapsLink } from "@/lib/locations";

export default function Locations() {
  return (
    <div className="wrap loc">
      <div className="loc__head">
        <h2 className="h2" id="loc-title">Our locations</h2>
        <p className="lede">Find us in Casper, Wyoming or in Karachi, Pakistan.</p>
      </div>
      <div className="loc__grid">
        {locations.map((l) => (
          <article key={l.id} className="locc">
            <div className="locc__map">
              <iframe
                src={l.embed}
                title={`Map showing our ${l.place} location`}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="locc__body">
              <h3 className="locc__t">{l.place}</h3>
              <address className="locc__addr">{l.address}</address>
              <a className="locc__link" href={mapsLink(l.address)} target="_blank" rel="noopener noreferrer">
                Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
