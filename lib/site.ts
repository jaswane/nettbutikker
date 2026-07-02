/** Global site configuration. */
export const site = {
  name: "Nettbutikker.no",
  shortName: "Nettbutikker",
  /** Used for canonical URLs, sitemap and schema. */
  url: "https://nettbutikker.no",
  tagline: "Finn riktig nettbutikk.",
  description:
    "Søkeførst veiviser for norske nettbutikker. Spør hvor du bør handle, om en butikk er trygg, eller hvilke nettbutikker som passer behovet ditt.",
  /** Standard reservation shown on search results and store profiles. */
  disclaimer:
    "Informasjonen kan endre seg. Sjekk alltid pris, frakt, retur og betalingsvalg hos butikken før du handler.",
  // NB: the contact email lives ONLY in app/kontakt/page.tsx visible content –
  // never in global config, metadata, schema or other components.
} as const;

export const mainNav = [
  { href: "/nettbutikker", label: "Alle nettbutikker" },
  { href: "/slik-fungerer-det", label: "Slik fungerer det" },
  { href: "/om", label: "Om" },
] as const;

/**
 * Canonical example questions (PRD §4). Used on the front page and as
 * suggestions when a search produces no recognisable signal – one source of
 * truth so the two never drift apart.
 */
export const EXAMPLE_QUERIES = [
  "Er Temu trygt?",
  "Norske nettbutikker med Vipps",
  "Hvor kjøper jeg LEGO?",
  "Beste nettbutikk for løpesko",
  "Nettbutikker med Klarna",
  "Hvor kjøper jeg gaming-PC?",
] as const;

/** Deep petrol brand accent (single identity – see globals.css :root). */
export const BRAND_ACCENT_HEX = "#075E68";
