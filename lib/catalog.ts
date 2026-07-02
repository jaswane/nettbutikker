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

// --- Entities ---------------------------------------------------------------

export const allStores: readonly Store[] = stores;
export const allCategories: readonly Category[] = categories;
export const allBrands: readonly Brand[] = brands;
export const allProductTypes: readonly ProductType[] = productTypes;

const storeBySlug = new Map<string, Store>(stores.map((s) => [s.slug, s]));
const categoryBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));
const brandBySlugMap = new Map<string, Brand>(brands.map((b) => [b.slug, b]));
const productTypeBySlug = new Map<string, ProductType>(productTypes.map((p) => [p.slug, p]));

export function getStore(slug: string): Store | undefined {
  return storeBySlug.get(slug);
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

const storesByCategory = new Map<MainCategorySlug, Store[]>();
const storesByBrand = new Map<string, Store[]>();

for (const store of stores) {
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

for (const store of stores) {
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
  FILTERS.map((f) => [f.key, stores.filter(f.predicate)]),
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

/** Graph neighbours: stores sharing a main category, by editorial score. */
export function relatedStores(store: Store, limit = 3): Store[] {
  const mains = new Set(store.categories.map((c) => c.main));
  return allStores
    .filter((s) => s.slug !== store.slug && s.categories.some((c) => mains.has(c.main)))
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, limit);
}
