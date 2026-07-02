import type { DataQuality, Store } from "@/lib/types";

/** Plain-language meaning of the A–D data quality scale (PRD transparency). */
export const DATA_QUALITY_TEXT: Record<DataQuality, string> = {
  A: "godt kontrollert",
  B: "stort sett kontrollert",
  C: "bør dobbeltsjekkes",
  D: "usikker – verifiser selv",
};

/** Compact inline legend for the data quality scale. */
export const DATA_QUALITY_LEGEND = "A = godt kontrollert · C = bør dobbeltsjekkes";

/**
 * Attribute definitions (PRD §9 & §13).
 * One place that maps the structured `StoreAttributes` shape onto:
 *  - human badge labels shown on profiles and search results, and
 *  - the Advanced Mode filter list.
 */

/** Read a FieldConfidence<boolean> truthily, ignoring confidence. */
function flag(value?: { value: boolean }): boolean {
  return value?.value === true;
}

export type BadgeTone = "accent" | "neutral" | "ok" | "warn";

export type AttributeBadge = {
  label: string;
  tone: BadgeTone;
};

/**
 * Prioritised, capped badge list for compact contexts (search results, cards).
 * Order: geo → requested payments → VOEC (foreign) → shipping → trust.
 * Badges whose attribute the user actually searched for (activeFilters) are
 * boosted so e.g. "Vipps" surfaces first on a Vipps search.
 */
export function priorityBadges(
  store: Store,
  activeFilters: string[] = [],
  limit = 4,
): AttributeBadge[] {
  const a = store.attributes;
  const want = new Set(activeFilters);
  const items: { badge: AttributeBadge; rank: number }[] = [];
  const add = (label: string, tone: BadgeTone, rank: number) =>
    items.push({ badge: { label, tone }, rank });

  // 1 – geography
  if (store.isNorwegian) add("Norsk butikk", "ok", 1);
  else if (store.shipsToNorway) add("Sender til Norge", "neutral", 1.1);

  // 2 – payments (boosted when requested)
  if (flag(a.payments.vipps)) add("Vipps", "neutral", want.has("vipps") ? 0.5 : 2);
  if (flag(a.payments.klarna)) add("Klarna", "neutral", want.has("klarna") ? 0.5 : 2.1);
  if (flag(a.payments.paypal)) add("PayPal", "neutral", want.has("paypal") ? 0.5 : 3.4);
  if (flag(a.payments.applePay)) add("Apple Pay", "neutral", want.has("applePay") ? 0.5 : 3.5);

  // 3 – VOEC for foreign stores
  if (!store.isNorwegian && flag(a.geography.voec)) add("VOEC", "neutral", 3);

  // 4 – shipping/delivery (boosted when requested)
  const ship = a.shipping.shippingType?.value;
  if (ship === "free") add("Fri frakt", "ok", want.has("freeShipping") ? 0.6 : 4);
  else if (ship === "free_over_amount") {
    const from = a.shipping.freeShippingFrom?.value;
    add(
      from ? `Fri frakt over ${from} kr` : "Fri frakt over beløp",
      "neutral",
      want.has("freeShippingOver") ? 0.6 : 4.2,
    );
  }
  if (flag(a.shipping.homeDelivery))
    add("Hjemlevering", "neutral", want.has("homeDelivery") ? 0.6 : 4.5);
  if (flag(a.shipping.clickAndCollect))
    add("Klikk og hent", "neutral", want.has("clickAndCollect") ? 0.6 : 4.6);

  // 5 – trust (only surfaces if there is room)
  if (flag(a.trust.tryggEhandel)) add("Trygg E-handel", "ok", 5);

  return items
    .sort((x, y) => x.rank - y.rank)
    .slice(0, limit)
    .map((i) => i.badge);
}

/** Keys for Advanced Mode filters (PRD §13). */
export type FilterKey =
  | "norwegian"
  | "shipsToNorway"
  | "voec"
  | "vipps"
  | "klarna"
  | "paypal"
  | "applePay"
  | "freeShipping"
  | "freeShippingOver"
  | "clickAndCollect"
  | "homeDelivery"
  | "subscription"
  | "freeTrial"
  | "introOffer"
  | "outlet"
  | "highDataQuality";

export type FilterDefinition = {
  key: FilterKey;
  label: string;
  group: "Land og avgift" | "Betaling" | "Frakt og levering" | "Kommersielt" | "Datakvalitet";
  predicate: (store: Store) => boolean;
};

export const FILTERS: FilterDefinition[] = [
  { key: "norwegian", label: "Norsk butikk", group: "Land og avgift", predicate: (s) => s.isNorwegian },
  { key: "shipsToNorway", label: "Sender til Norge", group: "Land og avgift", predicate: (s) => s.shipsToNorway },
  { key: "voec", label: "VOEC", group: "Land og avgift", predicate: (s) => flag(s.attributes.geography.voec) },

  { key: "vipps", label: "Vipps", group: "Betaling", predicate: (s) => flag(s.attributes.payments.vipps) },
  { key: "klarna", label: "Klarna", group: "Betaling", predicate: (s) => flag(s.attributes.payments.klarna) },
  { key: "paypal", label: "PayPal", group: "Betaling", predicate: (s) => flag(s.attributes.payments.paypal) },
  { key: "applePay", label: "Apple Pay", group: "Betaling", predicate: (s) => flag(s.attributes.payments.applePay) },

  { key: "freeShipping", label: "Fri frakt", group: "Frakt og levering", predicate: (s) => s.attributes.shipping.shippingType?.value === "free" },
  { key: "freeShippingOver", label: "Fri frakt over beløp", group: "Frakt og levering", predicate: (s) => s.attributes.shipping.shippingType?.value === "free_over_amount" },
  { key: "clickAndCollect", label: "Klikk og hent", group: "Frakt og levering", predicate: (s) => flag(s.attributes.shipping.clickAndCollect) },
  { key: "homeDelivery", label: "Hjemlevering", group: "Frakt og levering", predicate: (s) => flag(s.attributes.shipping.homeDelivery) },

  { key: "subscription", label: "Abonnement", group: "Kommersielt", predicate: (s) => flag(s.attributes.commercial.subscription) },
  { key: "freeTrial", label: "Gratis prøve", group: "Kommersielt", predicate: (s) => flag(s.attributes.commercial.freeTrial) },
  { key: "introOffer", label: "Introtilbud", group: "Kommersielt", predicate: (s) => flag(s.attributes.commercial.introOffer) },
  { key: "outlet", label: "Outlet", group: "Kommersielt", predicate: (s) => flag(s.attributes.commercial.outlet) },

  { key: "highDataQuality", label: "Kun høy datakvalitet", group: "Datakvalitet", predicate: (s) => s.dataQuality === "A" || s.dataQuality === "B" },
];

export const FILTER_GROUPS = [
  "Land og avgift",
  "Betaling",
  "Frakt og levering",
  "Kommersielt",
  "Datakvalitet",
] as const;

export const filterByKey = new Map<FilterKey, FilterDefinition>(
  FILTERS.map((f) => [f.key, f]),
);

/** Apply a set of active filters (AND semantics). */
export function applyFilters(store: Store, active: FilterKey[]): boolean {
  return active.every((key) => filterByKey.get(key)?.predicate(store) ?? true);
}
