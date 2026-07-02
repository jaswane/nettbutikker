import type { Metadata } from "next";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { searchStores } from "@/lib/search/searchStores";
import { parseFilterParam } from "@/lib/search/url";
import { site } from "@/lib/site";

type SearchParams = Promise<{ q?: string; f?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `Søk: ${q}` : "Søk etter nettbutikk";
  return {
    title,
    description: site.description,
    alternates: { canonical: "/sok" },
    // Result permutations should not be indexed individually.
    robots: q ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", f } = await searchParams;
  const filters = parseFilterParam(f);
  const result = searchStores(q, { filters });

  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8">
        <SearchForm
          variant="bar"
          initialQuery={q}
          initialFilters={filters}
          autoFocus={!q}
        />
      </div>

      {q.trim() ? (
        <SearchResults result={result} />
      ) : (
        <div className="border border-line bg-surface p-8 text-center">
          <h1 className="font-display text-xl font-bold text-ink">
            Hva leter du etter?
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Skriv hva du vil kjøpe eller lurer på – for eksempel «hudpleie»,
            «gaming-PC» eller «Er Temu trygt?».
          </p>
        </div>
      )}
    </div>
  );
}
