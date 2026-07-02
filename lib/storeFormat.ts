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

/** Ja / Nei / Ukjent from a plain boolean. */
export function ja(value: boolean | undefined): string {
  return value === undefined ? "Ukjent" : value ? "Ja" : "Nei";
}

/** Ja / Nei / Ukjent from a confidence-wrapped boolean (confidence not shown). */
export function jaFc(fc?: FieldConfidence<boolean>): string {
  return fc === undefined ? "Ukjent" : fc.value ? "Ja" : "Nei";
}

export function shipText(fc?: FieldConfidence<ShippingType>): string {
  switch (fc?.value) {
    case "free":
      return "Fri frakt";
    case "free_over_amount":
      return "Fri frakt over beløp";
    case "paid":
      return "Betalt frakt";
    default:
      return "Ukjent";
  }
}

/** Short one-line geography label for the header. */
export function geoLabel(store: Store): string {
  return store.isNorwegian ? "Norsk butikk" : `Utenlandsk · ${COUNTRY[store.country]}`;
}
