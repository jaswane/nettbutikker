import { ATTRIBUTES, type AttributeKey } from "@/data/attribute-definitions";
import { allBrands, allCategories, allProductTypes, getPublicStores } from "@/lib/catalog";
import { STOPWORDS } from "@/lib/search/stopwords";
import type { MainCategorySlug } from "@/lib/types";

/**
 * The lexicon – the single bridge from Norwegian language to the entity graph.
 *
 * Every searchable entity (category, product type, brand, store, attribute)
 * registers its names and aliases here, compiled ONCE at module init. Entity
 * linking then answers "which entities does this query mention?" – the intent
 * parser interprets that, it does not own vocabulary.
 *
 * Diacritic folding: each phrase is also indexed in a folded form
 * (ø→o, æ→ae, å→a) so «elkjop» finds Elkjøp. Folded variants that collapse
 * into a stopword are NOT indexed – «fôr» must never become «for»
 * (PRD v0.3 §4). Hand-authored stopword phrases are indexed as-is so QA can
 * fail loudly instead of them disappearing silently.
 *
 * QA (scripts/qa-checks.mjs) enforces: no stopword phrases, and no phrase
 * pointing at multiple entity families unless explicitly allowlisted.
 */

export type LexiconRef =
  | { type: "category"; slug: MainCategorySlug }
  | { type: "productType"; slug: string; categories: readonly MainCategorySlug[] }
  | { type: "brand"; slug: string }
  | { type: "store"; slug: string }
  | { type: "attribute"; key: AttributeKey };

export type LexiconMatch = { phrase: string; ref: LexiconRef };

// --- Normalisation ------------------------------------------------------------

/** Accented latin letters → base letters. æ/ø/å are first-class and kept. */
const ACCENTS: [RegExp, string][] = [
  [/[éèêë]/g, "e"],
  [/[áàâãä]/g, "a"],
  [/[óòôõö]/g, "o"],
  [/[úùûü]/g, "u"],
  [/[íìîï]/g, "i"],
  [/ç/g, "c"],
  [/ñ/g, "n"],
];

/** Normalise text for matching. Keeps Norwegian letters, digits and hyphens. */
export function normalize(input: string): string {
  let s = input.toLowerCase();
  for (const [re, to] of ACCENTS) s = s.replace(re, to);
  return s
    .replace(/[^\wæøå\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fold Norwegian letters to their common ASCII typing (elkjøp → elkjop). */
export function foldNorwegian(input: string): string {
  return input.replace(/ø/g, "o").replace(/æ/g, "ae").replace(/å/g, "a");
}

// --- Compilation ---------------------------------------------------------------

function refKey(ref: LexiconRef): string {
  return ref.type === "attribute" ? `attribute:${ref.key}` : `${ref.type}:${ref.slug}`;
}

const byPhrase = new Map<string, LexiconRef[]>();

function add(phrase: string, ref: LexiconRef): void {
  let refs = byPhrase.get(phrase);
  if (!refs) byPhrase.set(phrase, (refs = []));
  if (!refs.some((r) => refKey(r) === refKey(ref))) refs.push(ref);
}

function addPhrase(raw: string, ref: LexiconRef): void {
  const phrase = normalize(raw);
  if (!phrase) return;
  add(phrase, ref); // hand-authored form always indexed – QA guards stopwords
  const folded = foldNorwegian(phrase);
  if (folded !== phrase && !STOPWORDS.has(folded)) add(folded, ref);
}

for (const cat of allCategories) {
  const ref: LexiconRef = { type: "category", slug: cat.slug };
  addPhrase(cat.name, ref);
  addPhrase(cat.shortName, ref);
  for (const alias of cat.aliases) addPhrase(alias, ref);
}

for (const pt of allProductTypes) {
  const ref: LexiconRef = { type: "productType", slug: pt.slug, categories: pt.categories };
  addPhrase(pt.name, ref);
  for (const alias of pt.aliases) addPhrase(alias, ref);
}

for (const brand of allBrands) {
  const ref: LexiconRef = { type: "brand", slug: brand.slug };
  addPhrase(brand.name, ref);
  for (const alias of brand.aliases) addPhrase(alias, ref);
}

// Kun publiserte butikker i leksikonet: i produksjon skal en draft-butikk
// ikke engang gjenkjennes som entitet i søket.
for (const store of getPublicStores()) {
  const ref: LexiconRef = { type: "store", slug: store.slug };
  addPhrase(store.name, ref);
  for (const alias of store.searchAliases ?? []) addPhrase(alias, ref);
}

for (const attr of ATTRIBUTES) {
  const ref: LexiconRef = { type: "attribute", key: attr.key };
  for (const alias of attr.aliases) addPhrase(alias, ref);
}

// Split into lookup structures: single words hit via token set, multi-word
// phrases via substring scan (same semantics as the original matcher).
const singleWord = new Map<string, LexiconRef[]>();
const multiWord: { phrase: string; refs: LexiconRef[] }[] = [];
for (const [phrase, refs] of byPhrase) {
  if (phrase.includes(" ")) multiWord.push({ phrase, refs });
  else singleWord.set(phrase, refs);
}

// --- Linking --------------------------------------------------------------------

/**
 * Lookup units for a normalized query: every whitespace token, plus every
 * contiguous hyphen-run inside hyphenated tokens ("gaming-pc" → "gaming-pc",
 * "gaming", "pc") – mirroring word-boundary matching on space/hyphen.
 */
function lookupUnits(normalizedQuery: string): Set<string> {
  const units = new Set<string>();
  for (const token of normalizedQuery.split(" ")) {
    if (!token) continue;
    units.add(token);
    if (token.includes("-")) {
      const parts = token.split("-").filter(Boolean);
      for (let i = 0; i < parts.length; i++) {
        for (let j = i; j < parts.length; j++) {
          units.add(parts.slice(i, j + 1).join("-"));
        }
      }
    }
  }
  return units;
}

/** All entities mentioned by a normalized query. */
export function linkEntities(normalizedQuery: string): LexiconMatch[] {
  const matches: LexiconMatch[] = [];
  if (!normalizedQuery) return matches;

  const units = lookupUnits(normalizedQuery);
  for (const unit of units) {
    const refs = singleWord.get(unit);
    if (refs) for (const ref of refs) matches.push({ phrase: unit, ref });
  }
  for (const { phrase, refs } of multiWord) {
    if (normalizedQuery.includes(phrase)) {
      for (const ref of refs) matches.push({ phrase, ref });
    }
  }
  return matches;
}

// --- Introspection (QA) -----------------------------------------------------------

/** Every compiled phrase with its refs – used by QA for hygiene checks. */
export function lexiconPhrases(): { phrase: string; refs: LexiconRef[] }[] {
  return [...byPhrase.entries()].map(([phrase, refs]) => ({ phrase, refs }));
}
