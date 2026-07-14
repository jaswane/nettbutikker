import Link from "next/link";
import { StoreLogo } from "@/components/StoreLogo";
import { getCategory } from "@/lib/catalog";
import { goHref, isAffiliate, OUTBOUND_REL } from "@/lib/affiliate";
import type { Store } from "@/lib/types";

/**
 * Top section: logo in the left column; name, short description, one factual
 * line and the CTA all in the right column (CTA aligns with the text, never
 * under the logo). Internal signals (datakvalitet, sist kontrollert, kilder)
 * live in Praktisk info; affiliate is a single discreet line under the CTA.
 */
export function StoreProfileHeader({ store }: { store: Store }) {
  const primary = store.categories.find((c) => c.relevance === "primary") ?? store.categories[0];
  const category = primary ? getCategory(primary.main) : undefined;
  const geo = store.isNorwegian ? "Norsk nettbutikk" : "Utenlandsk nettbutikk";

  return (
    <header className="bg-accent-soft p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <StoreLogo store={store} size="lg" className="self-start" />

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {store.name}
          </h1>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft text-pretty">
            {store.shortDescription}
          </p>

          {/* Factual line – only the category part is a link (real navigation). */}
          <p className="mt-2 text-sm text-ink-muted">
            {geo}
            {category && (
              <>
                {" · "}
                <Link href={`/kategori/${category.slug}`} className="text-link">
                  {category.name}
                </Link>
              </>
            )}
          </p>

          <div className="mt-6">
            <a
              href={goHref(store)}
              rel={isAffiliate(store) ? OUTBOUND_REL : "noopener"}
              className="btn-primary"
            >
              Gå til {store.name}
              <span aria-hidden> ↗</span>
            </a>
            {isAffiliate(store) && (
              <p className="mt-2 text-xs text-ink-muted">
                Annonselenke ·{" "}
                <Link href="/annonser-og-samarbeid" className="text-link">
                  Les mer
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
