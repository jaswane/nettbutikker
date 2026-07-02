import Link from "next/link";
import { getCategory, getProductType } from "@/lib/catalog";
import { buildSearchUrl } from "@/lib/search/url";
import { RELEVANCE } from "@/lib/storeFormat";
import type { Store } from "@/lib/types";

/** Categories and brands as plain lists (no brand pages, no badge wall). */
export function BrandsSection({ store }: { store: Store }) {
  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      <section>
        <h3 className="text-sm font-semibold text-ink">Kategorier</h3>
        <ul className="mt-2">
          {store.categories.map((c) => {
            const cat = getCategory(c.main);
            const productType = c.productType ? getProductType(c.productType) : undefined;
            return (
              <li
                key={`${c.main}-${c.productType ?? ""}`}
                className="flex items-baseline justify-between gap-6 border-t border-line py-2.5 text-sm first:border-t-0"
              >
                <span className="min-w-0">
                  <Link href={`/kategori/${c.main}`} className="text-ink hover:text-accent">
                    {cat?.name ?? c.main}
                  </Link>
                  {productType && (
                    <>
                      <span className="text-ink-muted"> · </span>
                      {/* Internal link into the search projection of the same edge */}
                      <Link
                        href={buildSearchUrl(productType.name)}
                        className="text-ink-muted underline-offset-2 hover:text-accent hover:underline"
                      >
                        {productType.name}
                      </Link>
                    </>
                  )}
                </span>
                <span className="text-xs text-ink-faint">{RELEVANCE[c.relevance]}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-ink">Merkevarer</h3>
        {store.brands && store.brands.length > 0 ? (
          <ul className="mt-2">
            {store.brands.map((b) => (
              <li
                key={b.slug}
                className="flex items-baseline justify-between gap-6 border-t border-line py-2.5 text-sm first:border-t-0"
              >
                <span className="text-ink">{b.name}</span>
                <span className="text-xs text-ink-faint">{RELEVANCE[b.relevance]}</span>
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
