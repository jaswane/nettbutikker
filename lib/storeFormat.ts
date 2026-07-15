import type { FieldConfidence, ShippingType, Store, StoreCountry } from "@/lib/types";

/**
 * Plain-Norwegian formatting helpers for the store profile UI.
 * Technical field names stay in the data model – the UI only ever shows these
 * everyday translations (no "confidence", "attributter" or "commercial model").
 */

export const COUNTRY: Record<StoreCountry, string> = {
  NO: "Norge",
  SE: "Sverige",
  DK: "Danmark",
  DE: "Tyskland",
  GB: "Storbritannia",
  US: "USA",
  CN: "Kina",
  NL: "Nederland",
  FI: "Finland",
  IE: "Irland",
  EU: "EU",
  other: "Annet",
};

export const TRUST: Record<Store["trustLevel"], string> = {
  high: "Høy tillit",
  medium: "Middels tillit",
  low: "Lav tillit",
  unknown: "Ukjent tillit",
};

export const RELEVANCE: Record<string, string> = {
  primary: "Hovedområde",
  secondary: "Sekundært",
  limited: "Begrenset",
  unknown: "Ukjent",
};

/**
 * Lowercase the first letter for mid-sentence use («Løpesko» → «løpesko»),
 * but leave acronyms alone («TV, lyd og bilde», «PC og datautstyr»).
 */
export function lcFirst(s: string): string {
  if (s.length > 1 && s[1] === s[1].toUpperCase() && /[A-ZÆØÅ]/.test(s[1])) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/** Ja / Nei / Ukjent from a plain boolean. */
export function ja(value: boolean | undefined): string {
  return value === undefined ? "Ukjent" : value ? "Ja" : "Nei";
}

/**
 * Ja / Nei / Ukjent from a confidence-wrapped boolean, per the confidence
 * policy (docs/claims-modell.md §8): low-confidence claims must not read as
 * certain («Trolig ja»), unknown reads as absent («Ukjent»).
 */
export function jaFc(fc?: FieldConfidence<boolean>): string {
  if (fc === undefined || fc.confidence === "unknown") return "Ukjent";
  const base = fc.value ? "Ja" : "Nei";
  return fc.confidence === "low" ? `Trolig ${base.toLowerCase()}` : base;
}

/** Day-count claim → «30 dager», confidence-honest per claims-modell §8. */
export function dagerFc(fc?: FieldConfidence<number>, prefix = ""): string {
  if (fc === undefined || fc.confidence === "unknown") return "Ukjent";
  const base = `${prefix}${fc.value} ${fc.value === 1 ? "dag" : "dager"}`;
  return fc.confidence === "low" ? `${base} (ikke bekreftet)` : base;
}

export function shipText(fc?: FieldConfidence<ShippingType>): string {
  if (fc === undefined || fc.confidence === "unknown") return "Ukjent";
  let base: string;
  switch (fc.value) {
    case "free":
      base = "Fri frakt";
      break;
    case "free_over_amount":
      base = "Fri frakt over beløp";
      break;
    case "paid":
      base = "Betalt frakt";
      break;
    default:
      return "Ukjent";
  }
  return fc.confidence === "low" ? `${base} (ikke bekreftet)` : base;
}

/** Short one-line geography label for the header. */
export function geoLabel(store: Store): string {
  return store.isNorwegian ? "Norsk butikk" : `Utenlandsk · ${COUNTRY[store.country]}`;
}
