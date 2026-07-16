import { stores } from "@/data/stores";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { productTypes } from "@/data/product-types";
import { FILTERS, type FilterKey } from "@/data/attribute-definitions";
import type { Brand, Category, MainCategorySlug, ProductType, Store } from "@/lib/types";

/**
 * Catalog – the single read-side entry point to the entity graph:
 * stores, categories, brands and the edges between them.
 *
 * All pages, components and the search engine read from here – never from
 * data/* directly (enforced by QA). This is the seam where the storage
 * backend can be swapped (TS files → JSON → database) without touching
 * anything above it. See docs/arkitektur-2026-07.md, fase 0.
 *
 * Everything is precomputed once at module init from the static dataset.
 */

// Claims read-model: part of the catalog's read surface (docs/claims-modell.md §7).
export { storeClaims } from "@/lib/claims";
export type { StoreClaim } from "@/lib/claims";

// --- Publishing policy (single source of truth) ------------------------------

/**
 * Publiseringspolicy: i produksjon er KUN contentStatus === "verified"
 * offentlig. I development og i QA/tester (NODE_ENV ≠ "production") er alle
 * butikker synlige, slik at drafts kan utvikles og testes lokalt.
 * Produksjonsoppførselen testes lokalt med `npm run build && npm run start`
 * og håndheves av QA (scripts/publish-policy-probe.mjs).
 *
 * Alle offentlige flater – butikkprofiler, /nettbutikker, bokstavsider,
 * kategorisider, søk, «Vurder også», sitemap og ItemList-schema – leser fra
 * getPublicStores()/getPublishedStore() eller fra edge-indeksene under, som
 * alle bygges av publicStores. Ingen komponent skal ha egne statusregler.
 */
export function isPublishedStore(store: Store): boolean {
  return process.env.NODE_ENV !== "production" || store.contentStatus === "verified";
}

const publicStores: readonly Store[] = stores.filter(isPublishedStore);

/** Publicly visible stores (policy-filtered). Every public list surface reads this. */
export function getPublicStores(): readonly Store[] {
  return publicStores;
}

// --- Entities ---------------------------------------------------------------

/**
 * FULL dataset including drafts – for QA, audits and dev tooling only.
 * Public rendering surfaces must use getPublicStores()/getPublishedStore().
 */
export const allStores: readonly Store[] = stores;
export const allCategories: readonly Category[] = categories;
export const allBrands: readonly Brand[] = brands;
export const allProductTypes: readonly ProductType[] = productTypes;

const storeBySlug = new Map<string, Store>(stores.map((s) => [s.slug, s]));
const categoryBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));
const brandBySlugMap = new Map<string, Brand>(brands.map((b) => [b.slug, b]));
const productTypeBySlug = new Map<string, ProductType>(productTypes.map((p) => [p.slug, p]));

/** Unrestricted slug lookup – /go-ruten og intern verktøybruk. Offentlige sider bruker getPublishedStore. */
export function getStore(slug: string): Store | undefined {
  return storeBySlug.get(slug);
}

/** Slug lookup limited to publicly visible stores (undefined for drafts in prod). */
export function getPublishedStore(slug: string): Store | undefined {
  const s = storeBySlug.get(slug);
  return s && isPublishedStore(s) ? s : undefined;
}

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brandBySlugMap.get(slug);
}

export function getProductType(slug: string): ProductType | undefined {
  return productTypeBySlug.get(slug);
}

// --- Edge indexes (postings) -------------------------------------------------
// All indexes are built from publicStores, so every consumer (kategorisider,
// søkets kandidathenting, filtre) inherits the publishing policy for free.

const storesByCategory = new Map<MainCategorySlug, Store[]>();
const storesByBrand = new Map<string, Store[]>();

for (const store of publicStores) {
  for (const ref of store.categories) {
    let list = storesByCategory.get(ref.main);
    if (!list) storesByCategory.set(ref.main, (list = []));
    list.push(store);
  }
  for (const b of store.brands ?? []) {
    let list = storesByBrand.get(b.slug);
    if (!list) storesByBrand.set(b.slug, (list = []));
    list.push(store);
  }
}

/** Stores carrying a category edge, unordered (retrieval candidates). */
export function storesInCategory(main: MainCategorySlug): readonly Store[] {
  return storesByCategory.get(main) ?? [];
}

/** Stores carrying a brand edge, unordered (retrieval candidates). */
export function storesWithBrand(brandSlug: string): readonly Store[] {
  return storesByBrand.get(brandSlug) ?? [];
}

const storesByProductType = new Map<string, Store[]>();
const productTypesByCategory = new Map<MainCategorySlug, ProductType[]>();

for (const store of publicStores) {
  for (const ref of store.categories) {
    if (!ref.productType) continue;
    let list = storesByProductType.get(ref.productType);
    if (!list) storesByProductType.set(ref.productType, (list = []));
    list.push(store);
  }
}
for (const pt of productTypes) {
  for (const main of pt.categories) {
    let list = productTypesByCategory.get(main);
    if (!list) productTypesByCategory.set(main, (list = []));
    list.push(pt);
  }
}

/** Stores with an explicit edge to the product type (retrieval/links). */
export function storesWithProductType(slug: string): readonly Store[] {
  return storesByProductType.get(slug) ?? [];
}

/** Product types homed in a category, in vocabulary order (internal links). */
export function productTypesInCategory(main: MainCategorySlug): readonly ProductType[] {
  return productTypesByCategory.get(main) ?? [];
}

const storesByFilter = new Map<FilterKey, Store[]>(
  FILTERS.map((f) => [f.key, publicStores.filter(f.predicate)]),
);

/** Stores satisfying an attribute filter, unordered (retrieval candidates). */
export function storesMatchingFilter(key: FilterKey): readonly Store[] {
  return storesByFilter.get(key) ?? [];
}

/**
 * Canonical category-page ordering: primary-relevance stores first, then by
 * editorial score. (View ordering, distinct from search ranking.)
 */
export function storesInCategorySorted(main: MainCategorySlug): Store[] {
  return [...storesInCategory(main)].sort((a, b) => {
    const ap = a.categories.find((c) => c.main === main)?.relevance === "primary" ? 1 : 0;
    const bp = b.categories.find((c) => c.main === main)?.relevance === "primary" ? 1 : 0;
    if (ap !== bp) return bp - ap;
    return b.editorialScore - a.editorialScore;
  });
}

/**
 * Graph neighbours: public stores sharing a main category, by editorial score.
 * `limited`-edges regnes ikke som felles kategori her – en marginal kobling
 * skal ikke alene gjøre to butikker til anbefalte alternativer («Vurder
 * også»). Edgen beholdes i profil, søk og filtre som før.
 */
export function relatedStores(store: Store, limit = 3): Store[] {
  const strongMains = (s: Store) =>
    s.categories.filter((c) => c.relevance !== "limited").map((c) => c.main);
  const mains = new Set(strongMains(store));
  return publicStores
    .filter((s) => s.slug !== store.slug && strongMains(s).some((m) => mains.has(m)))
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, limit);
}
