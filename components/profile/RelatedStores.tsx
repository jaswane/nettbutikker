import Link from "next/link";
import { StoreLogo } from "@/components/StoreLogo";
import { goHref, isAffiliate, OUTBOUND_REL } from "@/lib/affiliate";
import type { Store } from "@/lib/types";

/** Compact "Vurder også" list – rows with thin separators, not a card grid. */
export function RelatedStores({ stores }: { stores: Store[] }) {
  if (stores.length === 0) return null;
  return (
    <section className="mt-14 border-t border-line pt-8">
      <h2 className="text-lg font-bold tracking-tight text-ink">Vurder også</h2>
      <ul className="mt-3">
        {stores.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-3 border-t border-line py-3.5 first:border-t-0"
          >
            <StoreLogo store={s} size="sm" />
            <div className="min-w-0 flex-1">
              <Link
                href={`/butikk/${s.slug}`}
                className="font-medium text-ink hover:text-accent"
              >
                {s.name}
              </Link>
              <p className="truncate text-sm text-ink-muted">{s.bestFor[0]}</p>
            </div>
            <a
              href={goHref(s)}
              rel={isAffiliate(s) ? OUTBOUND_REL : "noopener"}
              className="shrink-0 text-sm font-medium text-accent hover:underline"
            >
              Til butikk →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
