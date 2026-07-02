import { StoreLogo } from "@/components/StoreLogo";
import { getCategory } from "@/data/categories";
import { DATA_QUALITY_TEXT } from "@/data/attribute-definitions";
import { goHref, isAffiliate, OUTBOUND_REL } from "@/lib/affiliate";
import { geoLabel, TRUST } from "@/lib/storeFormat";
import type { Store } from "@/lib/types";

/** Top section – the one place allowed a subtle white surface + shadow. */
export function StoreProfileHeader({ store }: { store: Store }) {
  const primary = store.categories.find((c) => c.relevance === "primary") ?? store.categories[0];
  const primaryName = primary ? getCategory(primary.main)?.name : undefined;
  const verdict = store.reviewSummary ?? store.shortDescription;

  const facts = [geoLabel(store), primaryName, TRUST[store.trustLevel]].filter(Boolean);

  return (
    <header className="bg-accent-soft p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <StoreLogo store={store} size="lg" />
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {store.name}
          </h1>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-soft text-pretty">
            {verdict}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-muted">{facts.join("  ·  ")}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={goHref(store)}
          rel={isAffiliate(store) ? OUTBOUND_REL : "noopener"}
          className="btn-primary"
        >
          Gå til {store.name}
        </a>
        <span className="text-xs text-ink-muted">
          Datakvalitet {store.dataQuality} – {DATA_QUALITY_TEXT[store.dataQuality]} · Sist
          kontrollert {store.lastChecked}
          {isAffiliate(store) ? " · annonselenke" : ""}
        </span>
      </div>
    </header>
  );
}
