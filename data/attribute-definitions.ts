import type { Confidence, DataQuality, FieldConfidence, Store } from "@/lib/types";

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
 * Attribute registry (PRD §9 & §13, arkitektur fase 0).
 *
 * Attributes are ENTITIES, defined as data – not as scattered code. One entry
 * here drives everything an attribute does in the product:
 *   - the Advanced Mode filter (when `group` is set),
 *   - the Norwegian search phrases the intent parser recognises (`aliases`),
 *   - the badge shown on cards and search results (`badge`),
 *   - the predicate used for filtering and ranking.
 *
 * Adding an attribute is ONE entry here (plus the underlying data field until
 * fase 1 makes storage generic). QA verifies alias hygiene via the shared
 * lexicon.
 */

/** Read a FieldConfidence<boolean> truthily, ignoring confidence. */
function flag(value?: { value: boolean }): boolean {
  return value?.value === true;
}

export type BadgeTone = "accent" | "neutral" | "ok" | "warn";

export type AttributeBadge = {
  label: string;
  tone: BadgeTone;
  /** True when the underlying claim is low-confidence (shown as «?»). */
  uncertain?: boolean;
};

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

/** All attribute keys – filters plus badge-only attributes. */
export type AttributeKey = FilterKey | "tryggEhandel";

export type FilterGroup =
  | "Land og avgift"
  | "Betaling"
  | "Frakt og levering"
  | "Kommersielt"
  | "Datakvalitet";

export type AttributeDefinition = {
  key: AttributeKey;
  label: string;
  /** Advanced Mode filter group. Absent → attribute is not a filter. */
  group?: FilterGroup;
  /** Norwegian phrases that make a search activate this attribute. */
  aliases: string[];
  /** When this attribute is detected in a query, drop these broader ones. */
  subsumes?: AttributeKey[];
  predicate: (store: Store) => boolean;
  /**
   * The stored claim behind the attribute, when claim-backed. Drives the
   * confidence policy (docs/claims-modell.md §8). Absent = derived fact
   * (e.g. data quality), treated as certain.
   */
  claim?: (store: Store) => FieldConfidence<unknown> | undefined;
  /** Badge on cards/search results. Absent → no badge. */
  badge?: {
    tone: BadgeTone;
    /** Sort rank (ascending). */
    rank: number;
    /** Rank when the user actively searched/filtered for this attribute. */
    boostedRank?: number;
    /** Dynamic label; defaults to `label`. */
    text?: (store: Store) => string;
    /** Extra display condition; defaults to `predicate`. */
    show?: (store: Store) => boolean;
  };
};

export const ATTRIBUTES: AttributeDefinition[] = [
  // --- Land og avgift --------------------------------------------------------
  {
    key: "norwegian",
    label: "Norsk butikk",
    group: "Land og avgift",
    aliases: ["norsk", "norske", "norsk butikk"],
    predicate: (s) => s.isNorwegian,
    claim: (s) => s.attributes.geography.isNorwegian,
    badge: { tone: "ok", rank: 1 },
  },
  {
    key: "shipsToNorway",
    label: "Sender til Norge",
    group: "Land og avgift",
    aliases: ["sender til norge", "leverer til norge"],
    predicate: (s) => s.shipsToNorway,
    claim: (s) => s.attributes.geography.shipsToNorway,
    // Only shown for foreign stores – "Norsk butikk" already implies it.
    badge: { tone: "neutral", rank: 1.1, show: (s) => !s.isNorwegian && s.shipsToNorway },
  },
  {
    key: "voec",
    label: "VOEC",
    group: "Land og avgift",
    aliases: ["voec"],
    predicate: (s) => flag(s.attributes.geography.voec),
    claim: (s) => s.attributes.geography.voec,
    badge: { tone: "neutral", rank: 3, show: (s) => !s.isNorwegian && flag(s.attributes.geography.voec) },
  },

  // --- Betaling ---------------------------------------------------------------
  {
    key: "vipps",
    label: "Vipps",
    group: "Betaling",
    aliases: ["vipps"],
    predicate: (s) => flag(s.attributes.payments.vipps),
    claim: (s) => s.attributes.payments.vipps,
    badge: { tone: "neutral", rank: 2, boostedRank: 0.5 },
  },
  {
    key: "klarna",
    label: "Klarna",
    group: "Betaling",
    aliases: ["klarna", "delbetaling", "faktura"],
    predicate: (s) => flag(s.attributes.payments.klarna),
    claim: (s) => s.attributes.payments.klarna,
    badge: { tone: "neutral", rank: 2.1, boostedRank: 0.5 },
  },
  {
    key: "paypal",
    label: "PayPal",
    group: "Betaling",
    aliases: ["paypal"],
    predicate: (s) => flag(s.attributes.payments.paypal),
    claim: (s) => s.attributes.payments.paypal,
    badge: { tone: "neutral", rank: 3.4, boostedRank: 0.5 },
  },
  {
    key: "applePay",
    label: "Apple Pay",
    group: "Betaling",
    aliases: ["apple pay", "applepay"],
    predicate: (s) => flag(s.attributes.payments.applePay),
    claim: (s) => s.attributes.payments.applePay,
    badge: { tone: "neutral", rank: 3.5, boostedRank: 0.5 },
  },

  // --- Frakt og levering -------------------------------------------------------
  {
    key: "freeShipping",
    label: "Fri frakt",
    group: "Frakt og levering",
    aliases: ["fri frakt", "gratis frakt", "fri levering"],
    predicate: (s) => s.attributes.shipping.shippingType?.value === "free",
    claim: (s) => s.attributes.shipping.shippingType,
    badge: { tone: "ok", rank: 4, boostedRank: 0.6 },
  },
  {
    key: "freeShippingOver",
    label: "Fri frakt over beløp",
    group: "Frakt og levering",
    aliases: ["fri frakt over"],
    subsumes: ["freeShipping"],
    predicate: (s) => s.attributes.shipping.shippingType?.value === "free_over_amount",
    claim: (s) => s.attributes.shipping.shippingType,
    badge: {
      tone: "neutral",
      rank: 4.2,
      boostedRank: 0.6,
      text: (s) => {
        const from = s.attributes.shipping.freeShippingFrom?.value;
        return from ? `Fri frakt over ${from} kr` : "Fri frakt over beløp";
      },
    },
  },
  {
    key: "clickAndCollect",
    label: "Klikk og hent",
    group: "Frakt og levering",
    aliases: ["klikk og hent", "hente i butikk", "hent i butikk"],
    predicate: (s) => flag(s.attributes.shipping.clickAndCollect),
    claim: (s) => s.attributes.shipping.clickAndCollect,
    badge: { tone: "neutral", rank: 4.6, boostedRank: 0.62 },
  },
  {
    key: "homeDelivery",
    label: "Hjemlevering",
    group: "Frakt og levering",
    aliases: ["hjemlevering", "levert hjem", "hjem til døra"],
    predicate: (s) => flag(s.attributes.shipping.homeDelivery),
    claim: (s) => s.attributes.shipping.homeDelivery,
    badge: { tone: "neutral", rank: 4.5, boostedRank: 0.61 },
  },

  // --- Kommersielt -------------------------------------------------------------
  {
    key: "subscription",
    label: "Abonnement",
    group: "Kommersielt",
    aliases: ["abonnement"],
    predicate: (s) => flag(s.attributes.commercial.subscription),
    claim: (s) => s.attributes.commercial.subscription,
  },
  {
    key: "freeTrial",
    label: "Gratis prøve",
    group: "Kommersielt",
    aliases: ["gratis prøve", "prøveperiode"],
    predicate: (s) => flag(s.attributes.commercial.freeTrial),
    claim: (s) => s.attributes.commercial.freeTrial,
  },
  {
    key: "introOffer",
    label: "Introtilbud",
    group: "Kommersielt",
    aliases: ["introtilbud", "velkomsttilbud"],
    predicate: (s) => flag(s.attributes.commercial.introOffer),
    claim: (s) => s.attributes.commercial.introOffer,
  },
  {
    key: "outlet",
    label: "Outlet",
    group: "Kommersielt",
    aliases: ["outlet", "restsalg"],
    predicate: (s) => flag(s.attributes.commercial.outlet),
    claim: (s) => s.attributes.commercial.outlet,
  },

  // --- Datakvalitet --------------------------------------------------------------
  {
    key: "highDataQuality",
    label: "Kun høy datakvalitet",
    group: "Datakvalitet",
    aliases: [],
    predicate: (s) => s.dataQuality === "A" || s.dataQuality === "B",
  },

  // --- Badge-only (not filters) ---------------------------------------------------
  {
    key: "tryggEhandel",
    label: "Trygg E-handel",
    aliases: [],
    predicate: (s) => flag(s.attributes.trust.tryggEhandel),
    claim: (s) => s.attributes.trust.tryggEhandel,
    badge: { tone: "ok", rank: 5 },
  },
];

export const attributeByKey = new Map<AttributeKey, AttributeDefinition>(
  ATTRIBUTES.map((a) => [a.key, a]),
);

// --- Confidence policy (docs/claims-modell.md §8) ------------------------------
// high/medium = fact · low = counts but is marked «?» and ranks half ·
// unknown/missing claim = never a match. Filters, badges, ranking and catalog
// postings all go through these two functions.

/** Confidence of the claim behind an attribute. Derived facts are certain. */
export function attributeConfidence(store: Store, def: AttributeDefinition): Confidence {
  if (!def.claim) return "high";
  return def.claim(store)?.confidence ?? "unknown";
}

/** Whether the attribute holds for the store, per the confidence policy. */
export function attributeMatches(store: Store, def: AttributeDefinition): boolean {
  return def.predicate(store) && attributeConfidence(store, def) !== "unknown";
}

// --- Derived: Advanced Mode filters (PRD §13) ---------------------------------

export type FilterDefinition = {
  key: FilterKey;
  label: string;
  group: FilterGroup;
  predicate: (store: Store) => boolean;
};

export const FILTERS: FilterDefinition[] = ATTRIBUTES.filter(
  (a): a is AttributeDefinition & { group: FilterGroup } => a.group !== undefined,
).map((a) => ({
  key: a.key as FilterKey,
  label: a.label,
  group: a.group,
  // Confidence policy applies to filtering: unknown never satisfies a filter.
  predicate: (s) => attributeMatches(s, a),
}));

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

// --- Derived: prioritised badges ----------------------------------------------

/**
 * Prioritised, capped badge list for compact contexts (search results, cards).
 * Generated from the registry: each attribute with a `badge` entry surfaces
 * when its condition holds, ordered by rank. Badges whose attribute the user
 * actually searched for (activeFilters) use their boosted rank so e.g.
 * "Vipps" surfaces first on a Vipps search.
 */
export function priorityBadges(
  store: Store,
  activeFilters: string[] = [],
  limit = 4,
): AttributeBadge[] {
  const want = new Set(activeFilters);
  const items: { badge: AttributeBadge; rank: number }[] = [];

  for (const attr of ATTRIBUTES) {
    if (!attr.badge) continue;
    const confidence = attributeConfidence(store, attr);
    // unknown claims never assert a badge (docs/claims-modell.md §8).
    if (confidence === "unknown") continue;
    const visible = attr.badge.show ? attr.badge.show(store) : attr.predicate(store);
    if (!visible) continue;
    const rank =
      want.has(attr.key) && attr.badge.boostedRank !== undefined
        ? attr.badge.boostedRank
        : attr.badge.rank;
    const uncertain = confidence === "low";
    const base = attr.badge.text ? attr.badge.text(store) : attr.label;
    const label = uncertain ? `${base}?` : base;
    items.push({ badge: { label, tone: attr.badge.tone, uncertain }, rank });
  }

  return items
    .sort((x, y) => x.rank - y.rank)
    .slice(0, limit)
    .map((i) => i.badge);
}
