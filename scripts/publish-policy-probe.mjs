// Publiseringspolicy-probe. Kjøres av qa-checks.mjs som subprosess med
// NODE_ENV=production for å verifisere at draft-profiler er usynlige på alle
// offentlige flater i produksjon (og, uten NODE_ENV, at development viser alt).
// Skriver én JSON-linje til stdout – ingen sideeffekter.

import { register } from "node:module";
register("./ts-alias-loader.mjs", import.meta.url);

const { allStores, getPublicStores, getPublishedStore, relatedStores } =
  await import("../lib/catalog.ts");
const { searchStores } = await import("../lib/search/searchStores.ts");
const sitemap = (await import("../app/sitemap.ts")).default;

const verifiedSlugs = allStores
  .filter((s) => s.contentStatus === "verified")
  .map((s) => s.slug);
const draftSlugs = allStores
  .filter((s) => (s.contentStatus ?? "draft") !== "verified")
  .map((s) => s.slug);

const publicSlugs = getPublicStores().map((s) => s.slug);

// Søk som i dev treffer drafts: butikkoppslag (temu), merkevare (LEGO),
// kategori (hudpleie) og attributt (vipps).
const searches = ["Er Temu trygt?", "Hvor kjøper jeg LEGO?", "hudpleie", "vipps"];
const searchResultSlugs = [
  ...new Set(
    searches.flatMap((q) => searchStores(q).results.map((r) => r.store.slug)),
  ),
];

const relatedSlugs = [
  ...new Set(
    getPublicStores().flatMap((s) => relatedStores(s).map((r) => r.slug)),
  ),
];

const sitemapStoreSlugs = sitemap()
  .map((e) => e.url)
  .filter((u) => u.includes("/butikk/"))
  .map((u) => u.split("/butikk/")[1]);

console.log(
  JSON.stringify({
    nodeEnv: process.env.NODE_ENV ?? null,
    total: allStores.length,
    verifiedSlugs,
    draftCount: draftSlugs.length,
    publicSlugs,
    // Oppslags-API: én verified og de to første gjenværende drafts (dynamisk,
    // så proben overlever at butikker løftes til verified)
    lookupVerified: getPublishedStore("lekekassen")?.slug ?? null,
    draftProbeSlugs: draftSlugs.slice(0, 2),
    lookupDrafts: draftSlugs.slice(0, 2).map((s) => getPublishedStore(s)?.slug ?? null),
    searchResultSlugs,
    relatedSlugs,
    sitemapStoreSlugs,
  }),
);
