// Cover images live in /public/news/<slug>.jpg (1376x768). Alt text describes what is drawn.
export const NEWS_IMAGES: Record<string, { image: string; imageAlt: string }> = {
  "vibe-coded-apps-security-risks": {
    image: "/news/vibe-coded-apps-security-risks.jpg",
    imageAlt: "A chat bubble feeding a glass code window with two highlighted insecure lines, a sparkle and a warning shield",
  },
  "website-security-checklist": {
    image: "/news/website-security-checklist.jpg",
    imageAlt: "A glass checklist panel with orange ticks, a shield, a padlock and a magnifying glass on a dark background",
  },
  "exposed-env-file-api-key-leak": {
    image: "/news/exposed-env-file-api-key-leak.jpg",
    imageAlt: "A browser window labelled .env with glowing orange keys spilling out and a warning shield beside it",
  },
  "fix-common-php-errors": {
    image: "/news/fix-common-php-errors.jpg",
    imageAlt: "A PHP code window with a warning triangle and a tick, surrounded by speed gauges, charts and a wrench",
  },
  "nextjs-middleware-auth-bypass": {
    image: "/news/nextjs-middleware-auth-bypass.jpg",
    imageAlt: "Concentric glass walls protecting a central chip, with a glowing line routing around the outer barrier",
  },
  "crowdstrike-outage-2024": {
    image: "/news/crowdstrike-outage-2024.jpg",
    imageAlt: "A blue error screen at the centre of a network of servers, with a severed orange connection",
  },
  "php-cgi-cve-2024-4577": {
    image: "/news/php-cgi-cve-2024-4577.jpg",
    imageAlt: "A terminal window passing code toward a glowing orange cube, with a padlocked shield on the right",
  },
  "moveit-transfer-breach": {
    image: "/news/moveit-transfer-breach.jpg",
    imageAlt: "A glass database tower cracking open with orange light and files scattering across a network",
  },
  log4shell: {
    image: "/news/log4shell.jpg",
    imageAlt: "A Java terminal window at the centre of a branching network, with one glowing orange node under a shield",
  },
};
