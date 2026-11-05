export type Location = {
  id: string;
  place: string; // heading
  address: string; // as shown on the page and used for the "Open in Google Maps" link
  embed: string; // Google Maps embed URL (the iframe src)
  schema: { streetAddress: string; addressLocality: string; addressRegion?: string; postalCode?: string; addressCountry: string };
};

export const locations: Location[] = [
  {
    id: "casper",
    place: "Casper, Wyoming, USA",
    address: "312 W 2nd St, Casper, WY 82601, USA",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.114132128944!2d-106.3291481!3d42.8493232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8760bca480ca44a5%3A0xf5d42b5e551b1978!2s312%20W%202nd%20St%2C%20Casper%2C%20WY%2082601%2C%20USA!5e0!3m2!1sen!2s!4v1793890824175!5m2!1sen!2s",
    schema: { streetAddress: "312 W 2nd St", addressLocality: "Casper", addressRegion: "WY", postalCode: "82601", addressCountry: "US" },
  },
  {
    id: "karachi",
    place: "Karachi, Pakistan",
    address: "Plot 8 B, Sindhi Muslim Cooperative Housing Society Block A, Sindhi Muslim CHS (SMCHS), Karachi, Pakistan",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.135730561724!2d67.05134457488019!3d24.859213445308136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e840aa1bb63%3A0xa8f5fe69d8aa4712!2sBlock%20A%2C%2008%2C%20near%20Shahrah-e-Faisal%2C%20Sindhi%20Muslim%20Cooperative%20Housing%20Society%20Block%20B%20Sindhi%20Muslim%20CHS%20(SMCHS)%2C%20Karachi%2C%2074500%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1793890933840!5m2!1sen!2sus",
    schema: { streetAddress: "Plot 8 B, Sindhi Muslim Cooperative Housing Society Block A", addressLocality: "Karachi", addressCountry: "PK" },
  },
];

export const mapsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
