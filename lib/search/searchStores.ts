import {
  getBrand,
  getCategory,
  getProductType,
  getPublicStores,
  getPublishedStore,
  storesInCategory,
  storesMatchingFilter,
  storesWithBrand,
} from "@/lib/catalog";
import { applyFilters, filterByKey, type FilterKey } from "@/data/attribute-definitions";
import { site } from "@/lib/site";
import { lcFirst } from "@/lib/storeFormat";
import { parseQuery, type ParsedQuery } from "@/lib/search/intent";
import { compareScored, scoreStore, type ScoredStore } from "@/lib/search/ranking";
import { buildSearchUrl } from "@/lib/search/url";

// Publiseringspolicyen ligger i katalogen: i produksjon inneholder denne
// listen (og alle edge-indeksene) kun verified-butikker.
const stores = getPublicStores();

export type FollowUp = { label: string; href: string };

/**
 * Top-level search orchestration (PRD §5).
 * Returns a structured answer: short conclusion, one best pick, 2–4
 * alternatives, the reasoning, follow-up questions and the standard disclaimer.
 */

export type AnswerTone = "recommend" | "neutral" | "caution";

/** Structured, intent-aware answer header (PRD §5). */
export type Answer = {
  headline: string;
  subline?: string;
  /** Eyebrow marker shown on the top store (e.g. "Beste valg"). */
  bestLabel: string;
  tone: AnswerTone;
};

export type SearchResult = {
  query: string;
  parsed: ParsedQuery;
  answer: Answer;
  best?: ScoredStore;
  alternatives: ScoredStore[];
  results: ScoredStore[];
  followUps: FollowUp[];
  disclaimer: string;
  /** Filters that were applied (from Advanced Mode + inferred from query). */
  activeFilters: FilterKey[];
  isEmptyQuery: boolean;
  /**
   * False when the query produced no recognisable signal (no store, category,
   * brand or attribute). The UI must then be honest about not understanding,
   * instead of ranking stores on reputation alone.
   */
  understood: boolean;
};

export type SearchOptions = {
  /** Advanced Mode filters set by the user (AND with the query). */
  filters?: FilterKey[];
  /** Max alternatives to return (best is separate). */
  maxAlternatives?: number;
};

/** Join a list in Norwegian: "a, b og c". */
function joinNo(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} og ${items[items.length - 1]}`;
}

/** Readable noun phrase for an attribute search from the active filters. */
function attributePhrase(active: FilterKey[]): { noun: string; suffix: string } {
  const isNorwegian = active.includes("norwegian");
  const meaningful = active.filter(
    (k) => k !== "norwegian" && k !== "highDataQuality" && k !== "shipsToNorway",
  );
  const labels = meaningful.map((k) => filterByKey.get(k)?.label ?? k);
  return {
    noun: isNorwegian ? "norske butikker" : "butikker",
    suffix: labels.length ? ` registrert med ${joinNo(labels)}` : "",
  };
}

/**
 * What the user is shopping for, for use in answer copy. The product type is
 * preferred over the category – «vårt beste valg for løpesko» shows we
 * understood; the category name only shows we matched coarsely.
 */
function searchTopic(parsed: ParsedQuery): string | undefined {
  const productType = parsed.productTypeSlugs
    .map((s) => getProductType(s)?.name)
    .filter(Boolean)[0];
  const category = parsed.categorySlugs.map((s) => getCategory(s)?.name).filter(Boolean)[0];
  const topic = productType ?? category;
  return topic ? lcFirst(topic) : undefined;
}

function buildAnswer(
  parsed: ParsedQuery,
  active: FilterKey[],
  best?: ScoredStore,
  count = 0,
): Answer {
  if (!best) {
    return {
      headline: "Vi fant ingen butikker som passer helt.",
      subline: "Prøv et enklere søk, eller juster filtrene i Avansert søk.",
      bestLabel: "",
      tone: "neutral",
    };
  }
  const name = best.store.name;

  switch (parsed.intent) {
    case "is_store_safe": {
      if (parsed.storeSlug === best.store.slug) {
        const t = best.store.trustLevel;
        if (t === "low")
          return {
            headline: `${name} bør sjekkes nøye før kjøp.`,
            subline:
              "Vi vurderer tilliten som lav. Sjekk levering, retur, avgifter og forbrukerrettigheter hos butikken selv.",
            bestLabel: "Butikken du spurte om · lav tillit",
            tone: "caution",
          };
        if (t === "high")
          return {
            headline: `${name} fremstår som en trygg handel i vår vurdering.`,
            subline: "Sjekk likevel alltid vilkår, frakt og retur hos butikken selv.",
            bestLabel: "Butikken du spurte om · høy tillit",
            tone: "recommend",
          };
        return {
          headline: `${name} ser ut til å være et middels trygt valg.`,
          subline: "Vurder vilkårene hos butikken før du handler.",
          bestLabel: "Butikken du spurte om · middels tillit",
          tone: "neutral",
        };
      }
      return {
        headline: "Her er de mest relevante treffene for søket ditt.",
        bestLabel: "Mest relevant",
        tone: "neutral",
      };
    }

    case "store_with_attribute": {
      const { noun, suffix } = attributePhrase(active);
      return {
        headline: `Vi fant ${count} ${noun}${suffix}.`,
        subline: "Her er de mest relevante og best kontrollerte treffene.",
        bestLabel: "Mest relevant",
        tone: "recommend",
      };
    }

    case "brand_query": {
      const brand = parsed.brandSlugs.map((s) => getBrand(s)?.name).filter(Boolean)[0];
      return brand
        ? {
            headline: `Beste treff for ${brand}.`,
            subline: `Butikker vi har registrert at fører ${brand}.`,
            bestLabel: `Beste treff for ${brand}`,
            tone: "recommend",
          }
        : {
            headline: `${name} er det mest relevante treffet.`,
            bestLabel: "Mest relevant",
            tone: "neutral",
          };
    }

    case "where_to_buy": {
      const topic = searchTopic(parsed);
      return {
        headline: topic
          ? `${name} er et godt sted å kjøpe ${topic}.`
          : `${name} er et godt sted å handle for dette.`,
        subline: "Under finner du flere butikker som også dekker det du leter etter.",
        bestLabel: "Vår anbefaling",
        tone: "recommend",
      };
    }

    case "category_recommendation": {
      const topic = searchTopic(parsed);
      return {
        headline: topic
          ? `${name} er vårt beste valg for ${topic}.`
          : `${name} er vårt beste valg for søket ditt.`,
        bestLabel: "Beste valg",
        tone: "recommend",
      };
    }

    default:
      return {
        headline: `${name} er det mest relevante treffet.`,
        bestLabel: "Mest relevant",
        tone: "neutral",
      };
  }
}

function buildFollowUps(parsed: ParsedQuery, active: FilterKey[]): FollowUp[] {
  const ups: FollowUp[] = [];
  const add = (label: string, key: FilterKey) => {
    if (!active.includes(key)) {
      ups.push({ label, href: buildSearchUrl(parsed.raw, [...active, key]) });
    }
  };
  add("Vis bare norske butikker", "norwegian");
  add("Hvilke har Vipps?", "vipps");
  add("Hvem har fri frakt?", "freeShipping");
  add("Kun høy datakvalitet", "highDataQuality");
  return ups.slice(0, 4);
}

export function searchStores(query: string, options: SearchOptions = {}): SearchResult {
  const parsed = parseQuery(query);
  const userFilters = options.filters ?? [];
  const maxAlt = options.maxAlternatives ?? 4;
  const isEmptyQuery = parsed.tokens.length === 0;

  // Active filters = explicit Advanced Mode filters + strong attribute filters
  // inferred from the query (so "norske butikker med vipps" actually filters).
  const inferred = parsed.attributeFilters;
  const activeFilters = [...new Set<FilterKey>([...userFilters, ...inferred])];

  // Honesty gate: if the query contains text but we recognised nothing at all,
  // say so. Never rank stores on reputation alone for a query we can't read.
  const hasSignal =
    Boolean(parsed.storeSlug) ||
    parsed.categorySlugs.length > 0 ||
    parsed.brandSlugs.length > 0 ||
    activeFilters.length > 0;

  if (!isEmptyQuery && !hasSignal) {
    // Coverage language, never user-blame: for a perfectly normal word like
    // «rosenkål» the truth is that OUR coverage ends here – not that the
    // user was unclear (docs/opplevelse-2026-07.md).
    const shownQuery = query.trim().length > 40 ? `${query.trim().slice(0, 40)}…` : query.trim();
    return {
      query,
      parsed,
      answer: {
        headline: `Vi har ikke dekning for «${shownQuery}» ennå.`,
        subline:
          "Vi dekker vanlige kjøpsbehov som klær, elektronikk, sport, hjem og dyr – og om butikker er trygge. Prøv et annet ord, eller se eksemplene under.",
        bestLabel: "",
        tone: "neutral",
      },
      best: undefined,
      alternatives: [],
      results: [],
      followUps: [],
      disclaimer: site.disclaimer,
      activeFilters,
      isEmptyQuery,
      understood: false,
    };
  }

  // Candidate retrieval: union the index postings for every entity the query
  // linked to (store, categories, brands, active filters). Only candidates can
  // produce a match signal, so this is equivalent to scanning every store –
  // but reads from the graph indexes instead (arkitektur fase 0).
  const candidateSet = new Set<typeof stores[number]>();
  if (parsed.storeSlug) {
    const s = getPublishedStore(parsed.storeSlug);
    if (s) candidateSet.add(s);
  }
  for (const slug of parsed.categorySlugs) {
    for (const s of storesInCategory(slug)) candidateSet.add(s);
  }
  for (const slug of parsed.brandSlugs) {
    for (const s of storesWithBrand(slug)) candidateSet.add(s);
  }
  for (const key of activeFilters) {
    for (const s of storesMatchingFilter(key)) candidateSet.add(s);
  }

  // Require a genuine match signal per store (matchScore, not total score –
  // the quality baseline must not qualify a store by itself). The asked-about
  // store in a safety lookup is always kept. Hard filters apply to every
  // candidate (AND semantics).
  const scored = [...candidateSet]
    .filter((s) => applyFilters(s, activeFilters))
    .map((s) => scoreStore(s, parsed))
    .filter((s) => s.matchScore > 0 || parsed.storeSlug === s.store.slug)
    .sort(compareScored);

  // For empty query, surface a few high-quality stores as a starting point
  // (no entity signal exists, so this reads the full catalog by design).
  const ranked = isEmptyQuery
    ? stores
        .filter((s) => applyFilters(s, activeFilters))
        .map((s) => scoreStore(s, parsed))
        .sort((a, b) => b.store.editorialScore - a.store.editorialScore)
        .slice(0, 6)
    : scored;

  const best = ranked[0];
  const alternatives = ranked.slice(1, 1 + maxAlt);

  // Confidence policy (docs/claims-modell.md §8): when shown results rest on
  // unverified claims for the requested attributes, the answer must say so –
  // the «?» badges on the cards need their explanation.
  const answer = buildAnswer(parsed, activeFilters, best, ranked.length);
  const shownUnverified = [best, ...alternatives].some(
    (x) => x && x.unverifiedFilters.length > 0,
  );
  if (shownUnverified && parsed.intent === "store_with_attribute") {
    const caveat = "Opplysninger merket «?» er ikke bekreftet – sjekk hos butikken.";
    answer.subline = answer.subline ? `${answer.subline} ${caveat}` : caveat;
  }

  return {
    query,
    parsed,
    answer,
    best,
    alternatives,
    results: ranked,
    followUps: buildFollowUps(parsed, activeFilters),
    disclaimer: site.disclaimer,
    activeFilters,
    isEmptyQuery,
    understood: true,
  };
}
