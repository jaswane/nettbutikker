import type { FilterKey } from "@/data/attribute-definitions";

/** Build a /sok URL from a query and active filters. */
export function buildSearchUrl(query: string, filters: FilterKey[] = []): string {
  const params = new URLSearchParams();
  const q = query.trim();
  if (q) params.set("q", q);
  if (filters.length) params.set("f", filters.join(","));
  const qs = params.toString();
  return qs ? `/sok?${qs}` : "/sok";
}

/** Parse the `f` search param into a filter list. */
export function parseFilterParam(value: string | undefined | null): FilterKey[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as FilterKey[];
}
