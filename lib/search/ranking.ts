import { filterByKey, type FilterKey } from "@/data/attribute-definitions";
import type { Store } from "@/lib/types";
import type { ParsedQuery } from "@/lib/search/intent";

/**
 * Relevance ranking (PRD §5–6).
 * Scores combine: store-name match, category match, brand match, requested
 * attributes, trustLevel, dataQuality, editorialScore and "norsk butikk".
 *
 * Affiliate status is intentionally NOT part of the score (PRD §17): a great
 * store without affiliate must still be recommended. Affiliate is used only as
 * a last-resort tiebreaker when everything else is equal.
 */

export type ScoredStore = {
  store: Store;
  /** Total ordering score: matchScore + quality baseline. */
  score: number;
  /**
   * Signal-only score from actual query matches (store name, category, brand,
   * requested attributes). The quality baseline (trust/dataQuality/editorial)
   * is deliberately excluded: a store must never enter a result list on
   * reputation alone – that would turn nonsense queries into confident answers.
   */
  matchScore: number;
  reasons: string[];
  matchedFilters: FilterKey[];
};

const TRUST_SCORE: Record<Store["trustLevel"], number> = {
  high: 18,
  medium: 8,
  low: -12,
  unknown: 0,
};

const QUALITY_SCORE: Record<Store["dataQuality"], number> = {
  A: 12,
  B: 8,
  C: 3,
  D: -4,
};

const RELEVANCE_CATEGORY: Record<string, number> = {
  primary: 40,
  secondary: 20,
  limited: 8,
};

const RELEVANCE_BRAND: Record<string, number> = {
  primary: 46,
  secondary: 26,
  limited: 10,
  unknown: 4,
};

export function scoreStore(store: Store, q: ParsedQuery): ScoredStore {
  let matchScore = 0;
  const reasons: string[] = [];
  const matchedFilters: FilterKey[] = [];

  // Direct store-name match (dominant – e.g. "Er Temu trygt?").
  if (q.storeSlug === store.slug) {
    matchScore += 120;
  }

  // Category match, with product-type precision on top.
  let bestCat: { relevance: string; productType?: string } | undefined;
  for (const ref of store.categories) {
    if (q.categorySlugs.includes(ref.main)) {
      if (!bestCat || RELEVANCE_CATEGORY[ref.relevance] > RELEVANCE_CATEGORY[bestCat.relevance]) {
        bestCat = { relevance: ref.relevance, productType: ref.productType };
      }
    }
  }
  if (bestCat) {
    matchScore += RELEVANCE_CATEGORY[bestCat.relevance] ?? 0;
    // Only surface a category reason when the category actually is the point of
    // the search. For safety/brand/attribute searches it's just noise – even a
    // primary category hit (e.g. "Temu" matching the foreign-stores category).
    const categoryReasonRelevant =
      q.intent === "category_recommendation" || q.intent === "where_to_buy";
    if (bestCat.productType && q.productTypeSlugs.includes(bestCat.productType)) {
      matchScore += 12;
      if (categoryReasonRelevant) reasons.push("Spesialisert på det du søker etter");
    } else if (categoryReasonRelevant) {
      reasons.push("Dekker kategorien du søker i");
    }
  }

  // Brand match.
  if (q.brandSlugs.length && store.brands?.length) {
    let bestBrand: { name: string; relevance: string } | undefined;
    for (const b of store.brands) {
      if (q.brandSlugs.includes(b.slug)) {
        if (!bestBrand || RELEVANCE_BRAND[b.relevance] > RELEVANCE_BRAND[bestBrand.relevance]) {
          bestBrand = { name: b.name, relevance: b.relevance };
        }
      }
    }
    if (bestBrand) {
      matchScore += RELEVANCE_BRAND[bestBrand.relevance] ?? 0;
      reasons.push(`Fører ${bestBrand.name}`);
    }
  }

  // Requested attributes.
  for (const key of q.attributeFilters) {
    const def = filterByKey.get(key);
    if (def?.predicate(store)) {
      matchScore += key === "norwegian" ? 16 : 14;
      matchedFilters.push(key);
    }
  }
  if (matchedFilters.length) {
    reasons.push(`Matcher ${matchedFilters.length} av filtrene dine`);
  }

  // Quality baseline: trust, data quality, editorial. Kept OUT of matchScore –
  // it orders stores that already match, it never qualifies them by itself.
  let baseline = 0;
  baseline += TRUST_SCORE[store.trustLevel];
  baseline += QUALITY_SCORE[store.dataQuality];
  baseline += store.editorialScore * 0.4;

  // Note: data quality is shown separately in the result footer, so we don't
  // repeat it here as a reason (avoids "Verifisert datakvalitet" duplication).
  if (store.trustLevel === "high") reasons.push("Høy tillit");

  // "Norsk butikk" boost when relevant.
  if (q.wantsNorwegian && store.isNorwegian) {
    reasons.push("Norsk butikk");
  }
  if (!store.shipsToNorway) {
    baseline -= 30;
    reasons.push("Sender ikke til Norge");
  }

  // Caution flag for low-trust stores on safety queries.
  if (store.trustLevel === "low") {
    reasons.push("Vær ekstra forsiktig – lav tillit");
  }

  return { store, score: matchScore + baseline, matchScore, reasons, matchedFilters };
}

/** Stable comparator with affiliate as the very last tiebreaker only. */
export function compareScored(a: ScoredStore, b: ScoredStore): number {
  if (b.score !== a.score) return b.score - a.score;
  if (b.store.editorialScore !== a.store.editorialScore)
    return b.store.editorialScore - a.store.editorialScore;
  // Last resort: prefer a store we can actually link via affiliate, then name.
  const aff = Number(Boolean(b.store.affiliateSlug)) - Number(Boolean(a.store.affiliateSlug));
  if (aff !== 0) return aff;
  return a.store.name.localeCompare(b.store.name, "nb");
}
