import { allBrands, allCategories, allProductTypes } from "@/lib/catalog";
import { ATTRIBUTES, attributeByKey, type FilterKey } from "@/data/attribute-definitions";
import { linkEntities, normalize } from "@/lib/search/lexicon";
import type { MainCategorySlug, SearchIntent } from "@/lib/types";

/**
 * Norwegian intent parser (PRD §6).
 * No external AI – entity linking via the shared lexicon
 * (lib/search/lexicon.ts) plus deterministic intent rules. The parser
 * interprets which entities a query mentions; it does not own vocabulary.
 */

export { normalize } from "@/lib/search/lexicon";

export type ParsedQuery = {
  raw: string;
  normalized: string;
  tokens: string[];
  intent: SearchIntent;
  categorySlugs: MainCategorySlug[];
  productTypeSlugs: string[];
  brandSlugs: string[];
  /** Store matched directly by name (used for safety / "er X trygt"). */
  storeSlug?: string;
  /** Attribute filters inferred from the query text. */
  attributeFilters: FilterKey[];
  wantsNorwegian: boolean;
  /** Whether the user is asking for a "best" recommendation. */
  wantsBest: boolean;
};

function includesPhrase(haystack: string, needle: string): boolean {
  // Word-ish boundary match so "for" doesn't match "fortelle".
  const n = normalize(needle);
  if (!n) return false;
  if (n.includes(" ")) return haystack.includes(n);
  return new RegExp(`(^|[\\s-])${escapeRegExp(n)}([\\s-]|$)`).test(haystack);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const SAFETY_WORDS = [
  "trygg",
  "trygt",
  "trygge",
  "seriøs",
  "seriost",
  "seriøst",
  "pålitelig",
  "palitelig",
  "svindel",
  "scam",
  "safe",
  "stole på",
  "tør jeg",
];

const BEST_WORDS = ["beste", "best", "anbefal", "anbefalt", "topp"];

const WHERE_WORDS = ["hvor", "hvor kan", "hvor kjøper", "hvor får"];

// Canonical ordering (data-file order) so multi-entity queries produce stable,
// registry-ordered lists regardless of token order in the query.
const CATEGORY_ORDER = new Map(allCategories.map((c, i) => [c.slug, i]));
const PRODUCT_TYPE_ORDER = new Map(allProductTypes.map((p, i) => [p.slug, i]));
const BRAND_ORDER = new Map(allBrands.map((b, i) => [b.slug, i]));
const ATTRIBUTE_ORDER = new Map(ATTRIBUTES.map((a, i) => [a.key, i]));

export function parseQuery(raw: string): ParsedQuery {
  const normalized = normalize(raw);
  const tokens = normalized.split(" ").filter(Boolean);

  // Entity linking: which entities does the query mention?
  const categorySet = new Set<MainCategorySlug>();
  const productTypeSet = new Set<string>();
  const brandSet = new Set<string>();
  const attributeSet = new Set<FilterKey>();
  let bestStore: { slug: string; len: number } | undefined;

  for (const match of linkEntities(normalized)) {
    const ref = match.ref;
    switch (ref.type) {
      case "category":
        categorySet.add(ref.slug);
        break;
      case "productType":
        // A product-type mention implies its home categories for retrieval.
        for (const main of ref.categories) categorySet.add(main);
        productTypeSet.add(ref.slug);
        break;
      case "brand":
        brandSet.add(ref.slug);
        break;
      case "store":
        // Longest store-phrase match wins (e.g. "barnas hus" over "hus").
        if (!bestStore || match.phrase.length > bestStore.len) {
          bestStore = { slug: ref.slug, len: match.phrase.length };
        }
        break;
      case "attribute":
        // Only filterable attributes participate in search.
        if (attributeByKey.get(ref.key)?.group !== undefined) {
          attributeSet.add(ref.key as FilterKey);
        }
        break;
    }
  }

  // Specific attributes subsume broader ones (e.g. "fri frakt over" → "fri frakt").
  for (const key of [...attributeSet]) {
    for (const broader of attributeByKey.get(key)?.subsumes ?? []) {
      attributeSet.delete(broader as FilterKey);
    }
  }

  const categorySlugs = [...categorySet].sort(
    (a, b) => (CATEGORY_ORDER.get(a) ?? 0) - (CATEGORY_ORDER.get(b) ?? 0),
  );
  const productTypeSlugs = [...productTypeSet].sort(
    (a, b) => (PRODUCT_TYPE_ORDER.get(a) ?? 0) - (PRODUCT_TYPE_ORDER.get(b) ?? 0),
  );
  const brandSlugs = [...brandSet].sort(
    (a, b) => (BRAND_ORDER.get(a) ?? 0) - (BRAND_ORDER.get(b) ?? 0),
  );
  const attributeFilters = [...attributeSet].sort(
    (a, b) => (ATTRIBUTE_ORDER.get(a) ?? 0) - (ATTRIBUTE_ORDER.get(b) ?? 0),
  );
  const storeSlug = bestStore?.slug;

  const wantsNorwegian = attributeFilters.includes("norwegian");
  const wantsBest = BEST_WORDS.some((w) => includesPhrase(normalized, w));

  const hasSafety = SAFETY_WORDS.some((w) => includesPhrase(normalized, w));
  const hasWhere = WHERE_WORDS.some((w) => includesPhrase(normalized, w));
  // Attribute filters that are "real" constraints (norwegian alone is weak).
  const strongAttributes = attributeFilters.filter((k) => k !== "norwegian");

  let intent: SearchIntent = "unknown";
  if (hasSafety && (storeSlug || brandSlugs.length || categorySlugs.length)) {
    intent = "is_store_safe";
  } else if (storeSlug && !categorySlugs.length && !brandSlugs.length) {
    // Bare store name → treat as safety/profile lookup style.
    intent = "is_store_safe";
  } else if (wantsBest && categorySlugs.length) {
    intent = "category_recommendation";
  } else if (brandSlugs.length) {
    intent = "brand_query";
  } else if (strongAttributes.length || (attributeFilters.length && !categorySlugs.length)) {
    intent = "store_with_attribute";
  } else if (categorySlugs.length) {
    intent = hasWhere ? "where_to_buy" : "category_recommendation";
  } else if (attributeFilters.length) {
    intent = "store_with_attribute";
  }

  return {
    raw,
    normalized,
    tokens,
    intent,
    categorySlugs,
    productTypeSlugs,
    brandSlugs,
    storeSlug,
    attributeFilters,
    wantsNorwegian,
    wantsBest,
  };
}
