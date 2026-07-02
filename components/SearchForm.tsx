"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdvancedPanel } from "@/components/AdvancedPanel";
import type { FilterKey } from "@/data/attribute-definitions";
import { buildSearchUrl } from "@/lib/search/url";

type Props = {
  variant?: "hero" | "bar";
  initialQuery?: string;
  initialFilters?: FilterKey[];
  autoFocus?: boolean;
};

const PLACEHOLDER_LONG = "Hva vil du kjøpe, eller hva lurer du på?";
const PLACEHOLDER_SHORT = "Hva vil du kjøpe?";

/**
 * Search input with discreet Advanced Mode (PRD §4 & §13).
 * Editorial styling: minimal border, calm shadow, soft accent focus.
 */
export function SearchForm({
  variant = "hero",
  initialQuery = "",
  initialFilters = [],
  autoFocus = false,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Set<FilterKey>>(new Set(initialFilters));
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDER_LONG);

  // Shorter placeholder on small screens (P2).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setPlaceholder(mq.matches ? PLACEHOLDER_SHORT : PLACEHOLDER_LONG);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const filterList = useMemo(() => [...filters], [filters]);

  const navigate = useCallback(
    (q: string, f: FilterKey[]) => router.push(buildSearchUrl(q, f)),
    [router],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query, filterList);
  };

  const toggleFilter = (key: FilterKey) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      if (variant === "bar") navigate(query, [...next]);
      return next;
    });
  };

  const clearFilters = () => {
    setFilters(new Set());
    if (variant === "bar") navigate(query, []);
  };

  const isHero = variant === "hero";

  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div
          className={
            isHero
              ? "group flex items-center gap-2 border border-line-strong bg-paper px-3 py-2 transition-colors duration-200 ease-calm focus-within:border-accent"
              : "group flex items-center gap-2 border border-line-strong bg-paper px-2.5 py-1.5 transition-colors duration-200 focus-within:border-accent"
          }
        >
          <span aria-hidden className="pl-1.5 text-ink-faint transition-colors group-focus-within:text-accent-ink">
            <SearchIcon />
          </span>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Søk etter nettbutikk"
            className={
              isHero
                ? "min-w-0 flex-1 bg-transparent py-2.5 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:shadow-none focus-visible:shadow-none sm:text-lg"
                : "min-w-0 flex-1 bg-transparent py-2 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:shadow-none focus-visible:shadow-none"
            }
          />
          <button type="submit" className="btn-primary shrink-0" aria-label="Søk">
            <span className="hidden sm:inline">Søk</span>
            <span className="sm:hidden">
              <SearchIcon />
            </span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            aria-expanded={advancedOpen}
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            <SlidersIcon />
            Avansert
            {filters.size > 0 && (
              <span className="rounded-md bg-accent-soft px-1.5 py-px text-[11px] font-medium text-accent-ink">
                {filters.size}
              </span>
            )}
          </button>
          {isHero && (
            <a
              href="/slik-fungerer-det"
              className="text-[13px] text-ink-muted transition-colors hover:text-ink"
            >
              Slik vurderer vi nettbutikker
            </a>
          )}
        </div>

        {advancedOpen && (
          <div className="mt-3">
            <AdvancedPanel
              active={filters}
              onToggle={toggleFilter}
              onClear={clearFilters}
              onClose={() => setAdvancedOpen(false)}
            />
          </div>
        )}
      </form>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
