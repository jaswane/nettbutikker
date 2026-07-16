import {
  attributeByKey,
  attributeConfidence,
  attributeMatches,
  type FilterKey,
} from "@/data/attribute-definitions";
import { getCategory, getProductType } from "@/lib/catalog";
import { lcFirst } from "@/lib/storeFormat";
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
  /** Matched filters resting on low-confidence claims (subset of matchedFilters). */
  unverifiedFilters: FilterKey[];
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

/** «a», «a og b», «a, b og c»; more than three → «a, b, c m.m.» */
function joinNouns(nouns: string[]): string {
  if (nouns.length === 1) return nouns[0];
  if (nouns.length <= 3) {
    return `${nouns.slice(0, -1).join(", ")} og ${nouns[nouns.length - 1]}`;
  }
  return `${nouns.slice(0, 3).join(", ")} m.m.`;
}

export function scoreStore(store: Store, q: ParsedQuery): ScoredStore {
  let matchScore = 0;
  const reasons: string[] = [];
  const matchedFilters: FilterKey[] = [];

  // Direct store-name match (dominant – e.g. "Er Temu trygt?").
  if (q.storeSlug === store.slug) {
    matchScore += 120;
  }

  // Category match, with product-type precision on top.
  // Explanation model (docs/forklaringsmodell.md): name what the data knows,
  // grade the wording by the edge's relevance – never stronger than the edge.
  let bestCat: { main: string; relevance: string; productType?: string } | undefined;
  for (const ref of store.categories) {
    if (q.categorySlugs.includes(ref.main)) {
      if (!bestCat || RELEVANCE_CATEGORY[ref.relevance] > RELEVANCE_CATEGORY[bestCat.relevance]) {
        bestCat = { main: ref.main, relevance: ref.relevance, productType: ref.productType };
      }
    }
  }
  // The queried product type may sit on a lower-relevance edge than the best
  // category edge (e.g. primary «løpesko» + secondary «sykkel» for a «sykkel»
  // search), so the bonus checks every matching edge – wording still grades by
  // the product-type edge itself, never stronger than that edge.
  let bestPt: { relevance: string; productType: string } | undefined;
  for (const ref of store.categories) {
    if (!q.categorySlugs.includes(ref.main)) continue;
    if (!ref.productType || !q.productTypeSlugs.includes(ref.productType)) continue;
    if (!bestPt || RELEVANCE_CATEGORY[ref.relevance] > RELEVANCE_CATEGORY[bestPt.relevance]) {
      bestPt = { relevance: ref.relevance, productType: ref.productType };
    }
  }
  if (bestCat) {
    matchScore += RELEVANCE_CATEGORY[bestCat.relevance] ?? 0;
    // Only surface a category reason when the category actually is the point of
    // the search. For safety/brand/attribute searches it's just noise – even a
    // primary category hit (e.g. "Temu" matching the foreign-stores category).
    const categoryReasonRelevant =
      q.intent === "category_recommendation" || q.intent === "where_to_buy";
    if (bestPt) matchScore += 12;
    if (categoryReasonRelevant) {
      const ptName = bestPt ? getProductType(bestPt.productType)?.name : undefined;
      if (ptName) {
        reasons.push(
          bestPt!.relevance === "primary"
            ? `Spesialisert på ${lcFirst(ptName)}`
            : `Har også ${lcFirst(ptName)} i sortimentet`,
        );
      } else {
        const catName = getCategory(bestCat.main)?.name;
        if (catName) {
          reasons.push(
            bestCat.relevance === "primary"
              ? `Hovedområdet er ${lcFirst(catName)}`
              : bestCat.relevance === "secondary"
                ? `Dekker også ${lcFirst(catName)}`
                : `Har noe innen ${lcFirst(catName)}`,
          );
        }
      }
    }
  }

  // Brand match – wording graded by how central the brand is to the store.
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
      reasons.push(
        bestBrand.relevance === "primary"
          ? `Stort utvalg av ${bestBrand.name}`
          : bestBrand.relevance === "secondary"
            ? `Fører ${bestBrand.name}`
            : `Har noe fra ${bestBrand.name}`,
      );
    }
  }

  // Requested attributes. Confidence policy (docs/claims-modell.md §8):
  // unknown never matches; low counts half so verified stores outrank
  // unverified ones when the match is otherwise equal.
  const unverifiedFilters: FilterKey[] = [];
  for (const key of q.attributeFilters) {
    const def = attributeByKey.get(key);
    if (!def || !attributeMatches(store, def)) continue;
    const base = key === "norwegian" ? 16 : 14;
    if (attributeConfidence(store, def) === "low") {
      matchScore += Math.round(base / 2);
      unverifiedFilters.push(key);
    } else {
      matchScore += base;
    }
    matchedFilters.push(key);
  }
  // Name the verified attributes the user asked for («Har Vipps og fri
  // frakt»); unverified ones stay on their own «ikke bekreftet» line.
  // norwegian/shipsToNorway read as standalone sentences instead, and
  // highDataQuality is already shown in the result footer.
  if (q.wantsNorwegian && store.isNorwegian) {
    reasons.push("Norsk butikk");
  }
  const verifiedNouns: string[] = [];
  for (const key of matchedFilters) {
    if (unverifiedFilters.includes(key)) continue;
    if (key === "shipsToNorway") {
      reasons.push("Sender til Norge");
      continue;
    }
    const noun = attributeByKey.get(key)?.reasonNoun;
    if (noun) verifiedNouns.push(noun);
  }
  if (verifiedNouns.length) {
    reasons.push(`Har ${joinNouns(verifiedNouns)}`);
  }
  if (unverifiedFilters.length) {
    const nouns = unverifiedFilters.map(
      (k) => attributeByKey.get(k)?.reasonNoun ?? attributeByKey.get(k)?.label ?? k,
    );
    reasons.push(`Kan ha ${joinNouns(nouns)} – ikke bekreftet`);
  }

  // Quality baseline: trust, data quality, editorial. Kept OUT of matchScore –
  // it orders stores that already match, it never qualifies them by itself.
  let baseline = 0;
  baseline += TRUST_SCORE[store.trustLevel];
  baseline += QUALITY_SCORE[store.dataQuality];
  baseline += store.editorialScore * 0.4;

  // Cautions before praise: the UI caps at 3 lines, and warnings must never
  // be crowded out by «Høy tillit» (docs/forklaringsmodell.md regel 3).
  if (!store.shipsToNorway) {
    baseline -= 30;
    reasons.push("Sender ikke til Norge");
  }
  if (store.trustLevel === "low") {
    reasons.push("Vær ekstra forsiktig – lav tillit");
  }
  // Note: data quality is shown separately in the result footer, so we don't
  // repeat it here as a reason (avoids "Verifisert datakvalitet" duplication).
  if (store.trustLevel === "high") reasons.push("Høy tillit");

  return {
    store,
    score: matchScore + baseline,
    matchScore,
    reasons,
    matchedFilters,
    unverifiedFilters,
  };
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
