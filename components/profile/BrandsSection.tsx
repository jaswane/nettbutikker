import Link from "next/link";
import { getCategory, getProductType } from "@/lib/catalog";
import { buildSearchUrl } from "@/lib/search/url";
import type { Store } from "@/lib/types";

/**
 * Categories and brands as simple link lists (no internal relevance labels,
 * no brand pages, no badge wall). Destinations:
 *  - category  → /kategori/[slug] (real category page)
 *  - productType → /sok?q=<navn> (server-rendered search projection)
 *  - brand     → /sok?q=<merke> (server-rendered brand search; brand_query)
 * Internal relevance/primary/secondary stays in the data model, unused here.
 */
export function BrandsSection({ store }: { store: Store }) {
  // Flatten each category edge into its category and (optional) product type,
  // de-duplicated, preserving order.
  const categoryItems: { key: string; label: string; href: string }[] = [];
  const seen = new Set<string>();
  for (const ref of store.categories) {
    const cat = getCategory(ref.main);
    if (cat && !seen.has(`c:${cat.slug}`)) {
      seen.add(`c:${cat.slug}`);
      categoryItems.push({ key: `c:${cat.slug}`, label: cat.name, href: `/kategori/${cat.slug}` });
    }
    if (ref.productType) {
      const pt = getProductType(ref.productType);
      if (pt && !seen.has(`p:${pt.slug}`)) {
        seen.add(`p:${pt.slug}`);
        categoryItems.push({ key: `p:${pt.slug}`, label: pt.name, href: buildSearchUrl(pt.name) });
      }
    }
  }

  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      <section>
        <h3 className="text-sm font-semibold text-ink">Kategorier</h3>
        <ul className="mt-2 space-y-1.5 text-sm">
          {categoryItems.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="text-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-ink">Merkevarer</h3>
        {store.brands && store.brands.length > 0 ? (
          <ul className="mt-2 space-y-1.5 text-sm">
            {store.brands.map((b) => (
              <li key={b.slug}>
                {/* No brand pages yet → link to a server-rendered brand search. */}
                <Link href={buildSearchUrl(b.name)} className="text-link">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">Ingen merkevarer er lagt inn ennå.</p>
        )}
      </section>
    </div>
  );
}
