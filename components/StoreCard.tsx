import Link from "next/link";
import { Badge, BadgeRow } from "@/components/Badge";
import { StoreLogo } from "@/components/StoreLogo";
import { DATA_QUALITY_TEXT, priorityBadges } from "@/data/attribute-definitions";
import { goHref, isAffiliate, OUTBOUND_REL } from "@/lib/affiliate";
import type { Store } from "@/lib/types";

const dotColor: Record<Store["dataQuality"], string> = {
  A: "rgb(var(--ok))",
  B: "rgb(var(--accent))",
  C: "rgb(var(--warn))",
  D: "rgb(var(--bad))",
};

/** Data quality shown as dot + plain-language text (not a bare letter). */
export function DataQualityTag({
  quality,
  className = "",
}: {
  quality: Store["dataQuality"];
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-ink-muted ${className}`}>
      <span
        className="h-1.5 w-1.5 rounded-pill"
        style={{ backgroundColor: dotColor[quality] }}
        aria-hidden
      />
      Datakvalitet {quality} · {DATA_QUALITY_TEXT[quality]}
    </span>
  );
}

/** Compact store row used in category, alphabetical and related lists. */
export function StoreCard({ store }: { store: Store }) {
  const badges = priorityBadges(store, [], 4);
  return (
    <article className="group flex flex-col gap-3 border border-line bg-paper p-5 transition-colors duration-200 ease-calm hover:border-accent/60">
      <div className="flex items-start gap-3">
        <StoreLogo store={store} size="sm" className="mt-0.5" />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold tracking-tight text-ink">
            <Link href={`/butikk/${store.slug}`} className="hover:text-accent-ink">
              {store.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted text-pretty">
            {store.shortDescription}
          </p>
        </div>
      </div>
      <BadgeRow badges={badges} />
      <div className="mt-1 flex items-center justify-between gap-3 border-t border-line/60 pt-3 text-xs text-ink-muted">
        <DataQualityTag quality={store.dataQuality} />
        <a
          href={goHref(store)}
          rel={isAffiliate(store) ? OUTBOUND_REL : "noopener"}
          className="shrink-0 font-medium text-accent-ink underline-offset-2 hover:underline"
        >
          Til butikk →
        </a>
      </div>
    </article>
  );
}

export { Badge };
