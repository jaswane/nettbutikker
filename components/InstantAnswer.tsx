"use client";

import Link from "next/link";
import { buildSearchUrl } from "@/lib/search/url";
import type { FilterKey } from "@/data/attribute-definitions";
import type { SearchResult } from "@/lib/search/searchStores";

/**
 * Instant answer panel under the search field (docs/opplevelse-2026-07.md).
 * Level 1 of the search experience: the engine is a pure function over the
 * static catalog, so it runs client-side in ~1 ms. The full result page
 * (Enter / «Se alle treff») is level 2 – deep-linkable and canonical.
 */
export function InstantAnswer({
  result,
  query,
  filters,
  ms,
}: {
  result: SearchResult;
  query: string;
  filters: FilterKey[];
  ms: number;
}) {
  const { best, alternatives, answer, understood, results } = result;
  const top = [best, ...alternatives]
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 3);

  return (
    <div
      role="region"
      aria-label="Hurtigsvar"
      data-instant-ms={ms.toFixed(1)}
      className="absolute left-0 right-0 top-full z-20 mt-2 border border-line-strong bg-paper shadow-lg shadow-ink/5"
    >
      {understood && best ? (
        <>
          <p aria-live="polite" className="border-b border-line px-4 pb-2.5 pt-3 text-sm font-semibold text-ink">
            {answer.headline}
          </p>
          <ul>
            {top.map((item) => (
              <li key={item.store.slug} className="border-b border-line/60">
                <Link
                  href={`/butikk/${item.store.slug}`}
                  className="block px-4 py-2.5 transition-colors hover:bg-accent-soft/60"
                >
                  <span className="text-sm font-medium text-ink">{item.store.name}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-ink-muted">
                    {item.store.bestFor[0] ?? item.store.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={buildSearchUrl(query, filters)}
            className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft/60"
          >
            <span>
              Se alle treff{results.length > top.length ? ` (${results.length})` : ""}
            </span>
            <span aria-hidden className="text-xs text-ink-faint">Enter ↵</span>
          </Link>
        </>
      ) : (
        <p aria-live="polite" className="px-4 py-3 text-sm text-ink-muted">
          {understood
            ? "Vi fant ingen butikker som passer helt. Prøv færre ord eller et annet begrep."
            : answer.headline}
        </p>
      )}
    </div>
  );
}
