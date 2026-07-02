import { allBrands as brands, allCategories as categories, allStores as stores } from "@/lib/catalog";
import { ATTRIBUTES, attributeByKey, type FilterKey } from "@/data/attribute-definitions";
import type { MainCategorySlug, SearchIntent } from "@/lib/types";

/**
 * Lightweight Norwegian intent parser (PRD §6).
 * No external AI – pure string/alias matching over the local dataset.
 */

export type ParsedQuery = {
  raw: string;
  normalized: string;
  tokens: string[];
  intent: SearchIntent;
  categorySlugs: MainCategorySlug[];
  subSlugs: string[];
  brandSlugs: string[];
  /** Store matched directly by name (used for safety / "er X trygt"). */
  storeSlug?: string;
  /** Attribute filters inferred from the query text. */
  attributeFilters: FilterKey[];
  wantsNorwegian: boolean;
  /** Whether the user is asking for a "best" recommendation. */
  wantsBest: boolean;
};

/** Normalise text but keep Norwegian letters. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\wæøå\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

/**
 * Detect attribute filters from the query using the attribute registry
 * (data/attribute-definitions.ts) – phrases live with the attribute they
 * belong to, not here.
 */
function detectAttributeFilters(norm: string): FilterKey[] {
  const found = new Set<FilterKey>();
  for (const attr of ATTRIBUTES) {
    if (attr.group === undefined) continue; // only filterable attributes
    if (attr.aliases.some((p) => includesPhrase(norm, p))) found.add(attr.key as FilterKey);
  }
  // Specific attributes subsume broader ones (e.g. "fri frakt over" → drop "fri frakt").
  for (const key of [...found]) {
    for (const broader of attributeByKey.get(key)?.subsumes ?? []) {
      found.delete(broader as FilterKey);
    }
  }
  return [...found];
}

function detectCategories(norm: string): { main: MainCategorySlug[]; subs: string[] } {
  const main = new Set<MainCategorySlug>();
  const subs = new Set<string>();
  for (const cat of categories) {
    const aliasHit =
      cat.aliases.some((a) => includesPhrase(norm, a)) ||
      includesPhrase(norm, cat.name) ||
      includesPhrase(norm, cat.shortName);
    if (aliasHit) main.add(cat.slug);
    for (const sub of cat.subcategories ?? []) {
      if (sub.aliases.some((a) => includesPhrase(norm, a)) || includesPhrase(norm, sub.name)) {
        main.add(cat.slug);
        subs.add(sub.slug);
      }
    }
  }
  return { main: [...main], subs: [...subs] };
}

function detectBrands(norm: string): string[] {
  const found = new Set<string>();
  for (const brand of brands) {
    if (brand.aliases.some((a) => includesPhrase(norm, a)) || includesPhrase(norm, brand.name)) {
      found.add(brand.slug);
    }
  }
  return [...found];
}

function detectStore(norm: string): string | undefined {
  // Longest store-name match wins (e.g. "barnas hus" over "hus").
  let best: { slug: string; len: number } | undefined;
  for (const store of stores) {
    const name = normalize(store.name);
    if (includesPhrase(norm, name) && (!best || name.length > best.len)) {
      best = { slug: store.slug, len: name.length };
    }
  }
  return best?.slug;
}

export function parseQuery(raw: string): ParsedQuery {
  const normalized = normalize(raw);
  const tokens = normalized.split(" ").filter(Boolean);

  const { main: categorySlugs, subs: subSlugs } = detectCategories(normalized);
  const brandSlugs = detectBrands(normalized);
  const storeSlug = detectStore(normalized);
  const attributeFilters = detectAttributeFilters(normalized);
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
    subSlugs,
    brandSlugs,
    storeSlug,
    attributeFilters,
    wantsNorwegian,
    wantsBest,
  };
}
