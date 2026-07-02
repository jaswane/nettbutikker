// QA checks for Nettbutikker.no (PRD §QA) – data integrity, route/SEO rules
// and search-engine regression tests.
// Run with: npm run qa
//
// Uses Node's native TypeScript type-stripping (Node >= 22.6) plus a small
// `@/`-alias loader (ts-alias-loader.mjs) so the actual search engine can be
// imported and exercised directly – the core product promise is tested, not
// just the data files.

import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { register } from "node:module";

register("./ts-alias-loader.mjs", import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

let failures = 0;
let passes = 0;

function ok(msg) {
  passes++;
  console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
}
function fail(msg) {
  failures++;
  console.log(`  \x1b[31m✗ ${msg}\x1b[0m`);
}

async function importTs(rel) {
  const url = pathToFileURL(resolve(root, rel)).href;
  return import(url);
}

async function readText(rel) {
  return readFile(resolve(root, rel), "utf8");
}

console.log("\nNettbutikker.no – QA checks\n");

// --- Load data -------------------------------------------------------------
let stores, categories;
try {
  ({ stores } = await importTs("data/stores.ts"));
  ({ categories } = await importTs("data/categories.ts"));
} catch (err) {
  console.error(
    "\x1b[31mKunne ikke importere datafiler. Krever Node >= 22.6 med type-stripping.\x1b[0m",
  );
  console.error(err);
  process.exit(1);
}

// --- 1. Unique store slugs -------------------------------------------------
{
  const seen = new Map();
  let dup = 0;
  for (const s of stores) {
    if (seen.has(s.slug)) {
      fail(`Duplikat store-slug: "${s.slug}" (${s.id} og ${seen.get(s.slug)})`);
      dup++;
    }
    seen.set(s.slug, s.id);
  }
  if (!dup) ok(`Alle ${stores.length} store-slugs er unike`);
}

// --- 1b. Unique store ids --------------------------------------------------
{
  const ids = stores.map((s) => s.id);
  const uniq = new Set(ids);
  if (uniq.size === ids.length) ok(`Alle store-ids er unike (${ids.length})`);
  else fail("Det finnes duplikate store-ids");
}

// --- 2. Unique affiliate slugs --------------------------------------------
{
  const seen = new Map();
  let dup = 0;
  for (const s of stores) {
    if (!s.affiliateSlug) continue;
    if (seen.has(s.affiliateSlug)) {
      fail(`Duplikat affiliate-slug: "${s.affiliateSlug}"`);
      dup++;
    }
    seen.set(s.affiliateSlug, s.id);
  }
  if (!dup) ok(`Alle affiliate-slugs er unike (${seen.size} satt)`);
}

// --- 3. All category refs exist in categories.ts ---------------------------
{
  const valid = new Set(categories.map((c) => c.slug));
  let bad = 0;
  for (const s of stores) {
    for (const ref of s.categories) {
      if (!valid.has(ref.main)) {
        fail(`Butikk "${s.slug}" refererer ukjent kategori "${ref.main}"`);
        bad++;
      }
    }
  }
  if (!bad) ok("Alle kategorireferanser finnes i categories.ts");
}

// --- 3b. 13 main categories present ----------------------------------------
{
  if (categories.length === 13) ok("13 hovedkategorier definert");
  else fail(`Forventet 13 hovedkategorier, fant ${categories.length}`);
}

// --- 3c. Store count ~30 ---------------------------------------------------
{
  if (stores.length >= 25 && stores.length <= 35)
    ok(`Antall testbutikker er ${stores.length} (mål: ~30)`);
  else fail(`Antall butikker (${stores.length}) er utenfor forventet område`);
}

// --- 4. Sitemap excludes /go ----------------------------------------------
{
  const raw = await readText("app/sitemap.ts");
  // Strip comments so a documentation mention of /go doesn't trip the check.
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
  if (!code.includes("/go/") && !code.includes("/go`") && !code.includes('/go"')) {
    ok("/go er ikke inkludert i sitemap.ts");
  } else {
    fail("/go ser ut til å være referert i sitemap.ts (utenom kommentarer)");
  }
}

// --- 5. robots blocks /go --------------------------------------------------
{
  const robots = await readText("app/robots.ts");
  if (robots.includes("/go/")) ok("robots.ts blokkerer /go/");
  else fail("robots.ts blokkerer ikke /go/");
  if (robots.includes("/api/")) ok("robots.ts blokkerer /api/");
  else fail("robots.ts blokkerer ikke /api/");
}

// --- 6. /go route sets noindex --------------------------------------------
{
  const route = await readText("app/go/[slug]/route.ts");
  if (/X-Robots-Tag/i.test(route) && /noindex/i.test(route))
    ok("/go-route setter X-Robots-Tag: noindex");
  else fail("/go-route mangler noindex header");
}

// --- 7. Required routes exist ---------------------------------------------
{
  const routeFiles = [
    "app/page.tsx",
    "app/sok/page.tsx",
    "app/butikk/[slug]/page.tsx",
    "app/kategori/[slug]/page.tsx",
    "app/nettbutikker/page.tsx",
    "app/nettbutikker/[letter]/page.tsx",
    "app/go/[slug]/route.ts",
    "app/slik-fungerer-det/page.tsx",
    "app/om/page.tsx",
    "app/kontakt/page.tsx",
    "app/personvern/page.tsx",
    "app/annonser-og-samarbeid/page.tsx",
    "app/sitemap.ts",
    "app/robots.ts",
  ];
  let missing = 0;
  for (const f of routeFiles) {
    try {
      await readText(f);
    } catch {
      fail(`Mangler rutefil: ${f}`);
      missing++;
    }
  }
  if (!missing) ok(`Alle ${routeFiles.length} rutefiler finnes`);
}

// --- 8. Every store has lastChecked + dataQuality -------------------------
{
  let bad = 0;
  const quality = new Set(["A", "B", "C", "D"]);
  for (const s of stores) {
    if (!s.lastChecked || !/^\d{4}-\d{2}-\d{2}$/.test(s.lastChecked)) {
      fail(`Butikk "${s.slug}" mangler gyldig lastChecked`);
      bad++;
    }
    if (!quality.has(s.dataQuality)) {
      fail(`Butikk "${s.slug}" har ugyldig dataQuality`);
      bad++;
    }
  }
  if (!bad) ok("Alle butikker har gyldig lastChecked og dataQuality");
}

// --- 9. Lexicon hygiene: no stopwords, no unknown cross-family collisions ----
// The lexicon is the single bridge from language to entities (PRD v0.3 §4–5).
// (a) No compiled phrase may be a Norwegian stopword – a stopword alias
//     silently poisons results ("for" once made «beste nettbutikk for
//     løpesko» match pet stores).
// (b) A phrase pointing at multiple entity FAMILIES (kategori-familien,
//     merke, butikk, attributt) is genuine ambiguity and must be an explicit,
//     reviewed decision – new ones fail the build.
{
  const { STOPWORDS } = await importTs("lib/search/stopwords.ts");
  const { lexiconPhrases } = await importTs("lib/search/lexicon.ts");

  const stopwordOffenders = [];
  for (const { phrase } of lexiconPhrases()) {
    if (STOPWORDS.has(phrase)) stopwordOffenders.push(`"${phrase}"`);
  }
  if (stopwordOffenders.length)
    fail(`Stoppord i leksikonet: ${stopwordOffenders.join(", ")}`);
  else ok("Ingen stoppord blant leksikonets søkefraser");

  // Reviewed, intentional cross-family ambiguities.
  const ALLOWED_COLLISIONS = new Set([
    "lego", // merkevare + leke-kategori/underkategori
    "temu", // butikk + alias for utenlandske-kategorien
    "amazon", // butikk + alias for utenlandske-kategorien
    "playstation", // Sony-merkealias + elektronikk-kategorialias
    "the ordinary", // merkevare + alias for helse/skjønnhet-kategorien
    "voec", // attributt + alias for utenlandske-kategorien
    "abonnement", // attributt + alias for tjenester-kategorien
  ]);
  // Categories and product types form one "vocabulary" family – a phrase
  // hitting both (e.g. «sminke») routes to compatible search behaviour.
  const family = (ref) =>
    ref.type === "category" || ref.type === "productType" ? "vokabular" : ref.type;
  let unknown = 0;
  for (const { phrase, refs } of lexiconPhrases()) {
    const families = new Set(refs.map(family));
    if (families.size > 1 && !ALLOWED_COLLISIONS.has(phrase)) {
      fail(
        `Ukjent leksikon-kollisjon: "${phrase}" → ${refs
          .map((r) => `${r.type}:${r.slug ?? r.key}`)
          .join(", ")}`,
      );
      unknown++;
    }
  }
  if (!unknown)
    ok(`Alle kryss-familie-kollisjoner i leksikonet er godkjente (${ALLOWED_COLLISIONS.size} kjente)`);
}

// --- 10. Referential integrity: store brands + product-type refs -------------
{
  let bad = 0;
  const { brands } = await importTs("data/brands.ts");
  const { productTypes } = await importTs("data/product-types.ts");
  const brandSlugs = new Set(brands.map((b) => b.slug));
  const ptBySlug = new Map(productTypes.map((p) => [p.slug, p]));
  for (const s of stores) {
    for (const b of s.brands ?? []) {
      if (!brandSlugs.has(b.slug)) {
        fail(`Butikk "${s.slug}" refererer ukjent merkevare "${b.slug}"`);
        bad++;
      }
    }
    for (const ref of s.categories) {
      if (!ref.productType) continue;
      const pt = ptBySlug.get(ref.productType);
      if (!pt) {
        fail(`Butikk "${s.slug}" refererer ukjent produkttype "${ref.productType}"`);
        bad++;
      } else if (!pt.categories.includes(ref.main)) {
        fail(
          `Butikk "${s.slug}": produkttype "${ref.productType}" hører ikke hjemme i "${ref.main}"`,
        );
        bad++;
      }
    }
  }
  if (!bad) ok("Alle merkevare- og produkttypereferanser er gyldige");
}

// --- 10b. Product-type vocabulary integrity ----------------------------------
// Every product type must be well-formed and reachable: valid categories,
// valid broader/brand pointers, unique slugs, and at least one store path
// (docs/produkttype-modell.md §8 – dead vocabulary fails the build).
{
  const { brands } = await importTs("data/brands.ts");
  const { productTypes } = await importTs("data/product-types.ts");
  const brandSlugs = new Set(brands.map((b) => b.slug));
  const catSlugs = new Set(categories.map((c) => c.slug));
  const ptSlugs = new Set(productTypes.map((p) => p.slug));
  let bad = 0;

  if (ptSlugs.size !== productTypes.length) {
    fail("Duplikate produkttype-slugs");
    bad++;
  }
  const storesByMain = new Map();
  for (const s of stores) {
    for (const ref of s.categories) {
      storesByMain.set(ref.main, (storesByMain.get(ref.main) ?? 0) + 1);
    }
  }
  for (const pt of productTypes) {
    if (!pt.aliases.length) {
      fail(`Produkttype "${pt.slug}" mangler aliaser`);
      bad++;
    }
    if (!pt.categories.length || pt.categories.some((c) => !catSlugs.has(c))) {
      fail(`Produkttype "${pt.slug}" har ugyldig kategoriliste`);
      bad++;
    }
    if (pt.broader && !ptSlugs.has(pt.broader)) {
      fail(`Produkttype "${pt.slug}" peker på ukjent broader "${pt.broader}"`);
      bad++;
    }
    for (const b of pt.brandSlugs ?? []) {
      if (!brandSlugs.has(b)) {
        fail(`Produkttype "${pt.slug}" peker på ukjent merkevare "${b}"`);
        bad++;
      }
    }
    if (!pt.categories.some((c) => (storesByMain.get(c) ?? 0) > 0)) {
      fail(`Produkttype "${pt.slug}" har ingen butikk-vei (tom primærkategori)`);
      bad++;
    }
  }
  if (!bad) ok(`Produkttype-vokabularet er velformet (${productTypes.length} typer)`);
}

// --- 11. Search-engine regression tests (the core product) ------------------
{
  const { searchStores } = await importTs("lib/search/searchStores.ts");

  /** Run a query and assert on the result; report each case individually. */
  function expectSearch(query, opts, checks) {
    const r = searchStores(query, opts);
    const problems = [];
    for (const [label, predicate] of checks) {
      try {
        if (!predicate(r)) problems.push(label);
      } catch (e) {
        problems.push(`${label} (kastet: ${e.message})`);
      }
    }
    if (problems.length) {
      fail(`Søk «${query}» – feilet: ${problems.join("; ")}`);
    } else {
      ok(`Søk «${query}» oppfører seg som forventet`);
    }
  }

  expectSearch("Er Temu trygt?", {}, [
    ["intent=is_store_safe", (r) => r.parsed.intent === "is_store_safe"],
    ["best=temu", (r) => r.best?.store.slug === "temu"],
    ["tone=caution", (r) => r.answer.tone === "caution"],
    // The user must actually read a safety verdict about the store they asked about.
    ["overskrift nevner Temu", (r) => r.answer.headline.includes("Temu")],
    ["etikett flagger tillit", (r) => /tillit/i.test(r.answer.bestLabel)],
  ]);

  expectSearch("Norske nettbutikker med Vipps", {}, [
    ["intent=store_with_attribute", (r) => r.parsed.intent === "store_with_attribute"],
    ["har treff", (r) => r.results.length > 0],
    [
      "alle treff er norske med Vipps",
      (r) =>
        r.results.every(
          (x) => x.store.isNorwegian && x.store.attributes.payments.vipps?.value === true,
        ),
    ],
  ]);

  expectSearch("Hvor kjøper jeg LEGO?", {}, [
    ["intent=brand_query", (r) => r.parsed.intent === "brand_query"],
    ["beste treff fører LEGO", (r) => r.best?.store.brands?.some((b) => b.slug === "lego")],
  ]);

  expectSearch("Beste nettbutikk for løpesko", {}, [
    ["intent=category_recommendation", (r) => r.parsed.intent === "category_recommendation"],
    ["best er sportsbutikk", (r) =>
      r.best?.store.categories.some((c) => c.main === "sport-friluft-trening")],
    // The answer must name the product type, not just the category – that is
    // the point of the vocabulary (docs/produkttype-modell.md §4).
    ["overskrift nevner løpesko", (r) => /løpesko/i.test(r.answer.headline)],
    [
      "ingen dyrebutikker i topp 3 (stoppord-regresjon)",
      (r) =>
        [r.best, ...r.alternatives.slice(0, 2)]
          .filter(Boolean)
          .every((x) => !x.store.categories.some((c) => c.main === "dyr-kjaeledyr")),
    ],
  ]);

  expectSearch("Hvor kan jeg kjøpe hundefôr?", {}, [
    ["intent=where_to_buy", (r) => r.parsed.intent === "where_to_buy"],
    ["produkttype gjenkjent", (r) => r.parsed.productTypeSlugs.includes("hund")],
    ["overskrift bruker produkttypenavnet", (r) => /hundeutstyr og fôr/i.test(r.answer.headline)],
  ]);

  expectSearch("Hvor kjøper jeg gaming-PC?", {}, [
    ["intent gjenkjent", (r) => r.parsed.intent !== "unknown"],
    ["best er elektronikkbutikk", (r) =>
      r.best?.store.categories.some((c) => c.main === "elektronikk-data-gaming")],
  ]);

  expectSearch("xkqzv jwrpt", {}, [
    ["forstått=false", (r) => r.understood === false],
    ["ingen resultater", (r) => r.results.length === 0],
    ["ingen 'beste valg'", (r) => r.best === undefined],
  ]);

  expectSearch("hudpleie", {}, [
    ["har treff", (r) => r.results.length > 0],
    ["best er helse/skjønnhet", (r) =>
      r.best?.store.categories.some((c) => c.main === "helse-skjonnhet-apotek")],
  ]);

  expectSearch("vipps", { filters: [] }, [
    ["intent=store_with_attribute", (r) => r.parsed.intent === "store_with_attribute"],
    ["alle treff har Vipps", (r) =>
      r.results.every((x) => x.store.attributes.payments.vipps?.value === true)],
  ]);
}

// --- 11b. Duplicated fields must agree (until fase 1 removes the duplication) –
// Store has country/isNorwegian/shipsToNorway both top-level and inside
// attributes.geography. Two sources of truth WILL drift; this makes drift a
// build failure. See docs/arkitektur-2026-07.md §2.3.
{
  let bad = 0;
  for (const s of stores) {
    const g = s.attributes.geography;
    const checks = [
      ["isNorwegian", s.isNorwegian, g.isNorwegian?.value],
      ["shipsToNorway", s.shipsToNorway, g.shipsToNorway?.value],
      ["country", s.country, g.country?.value],
    ];
    for (const [field, top, attr] of checks) {
      if (attr !== undefined && top !== attr) {
        fail(`Butikk "${s.slug}": ${field} avviker (topp=${top}, attributes=${attr})`);
        bad++;
      }
    }
  }
  if (!bad) ok("Topp-felter og attributes.geography er konsistente");
}

// --- 11c. Brand names embedded in stores must match the brand registry ------
{
  const { brands } = await importTs("data/brands.ts");
  const nameBySlug = new Map(brands.map((b) => [b.slug, b.name]));
  let bad = 0;
  for (const s of stores) {
    for (const b of s.brands ?? []) {
      const canonical = nameBySlug.get(b.slug);
      if (canonical && b.name !== canonical) {
        fail(`Butikk "${s.slug}": merkenavn "${b.name}" ≠ register "${canonical}"`);
        bad++;
      }
    }
  }
  if (!bad) ok("Innbakte merkenavn matcher merkeregisteret");
}

// --- 11d. Import boundary: only lib/catalog.ts reads data entities ----------
// Pages, components and search must go through the catalog so the storage
// backend can be swapped without touching them.
{
  const { execSync } = await import("node:child_process");
  let out = "";
  try {
    out = execSync(
      'git grep -n \'from "@/data/\\(stores\\|categories\\|brands\\)"\' -- app components lib',
      { cwd: root, encoding: "utf8" },
    );
  } catch {
    // git grep exits 1 on no matches – that is the good case.
  }
  const offenders = out
    .split("\n")
    .filter(Boolean)
    .filter((line) => !line.startsWith("lib/catalog.ts"));
  if (offenders.length) {
    for (const line of offenders) fail(`Direkte data-import utenom catalog: ${line}`);
  } else {
    ok("Kun lib/catalog.ts leser data-entiteter direkte");
  }
}

// --- 11e. Claim freshness SLA (docs/claims-modell.md §4) ---------------------
// Every claim is measured against its group's SLA. Stale claims FAIL the
// build – that is the re-verification alarm working, not a flaky test. Fix by
// re-verifying (new lastChecked) or downgrading confidence with a note.
{
  const { storeClaims, claimFreshness, claimAgeDays, STORE_SLA_DAYS } =
    await importTs("lib/claims.ts");
  const now = new Date();
  let stale = 0;
  let aging = 0;
  let total = 0;
  for (const s of stores) {
    for (const c of storeClaims(s)) {
      total++;
      const f = claimFreshness(c, now);
      if (f === "stale") {
        fail(`Utdatert claim: ${s.slug} ${c.key} (sist kontrollert ${c.lastChecked})`);
        stale++;
      } else if (f === "aging") {
        aging++;
      }
    }
    if (claimAgeDays(s.lastChecked, now) > STORE_SLA_DAYS) {
      fail(`Butikk "${s.slug}" har ikke hatt full kontroll på over ett år (${s.lastChecked})`);
      stale++;
    }
  }
  if (!stale) {
    ok(
      `Alle ${total} claims er innenfor ferskhets-SLA` +
        (aging ? ` (${aging} nærmer seg – planlegg re-verifisering)` : ""),
    );
  }
}

// --- 12. Golden search regression (frozen baseline) --------------------------
// scripts/golden-queries.json freezes intent/understood/count/top-3 for a
// query battery. Any drift fails the build; intentional engine changes must
// regenerate the file (npm run golden) in the same commit.
{
  const { searchStores } = await importTs("lib/search/searchStores.ts");
  const golden = JSON.parse(await readText("scripts/golden-queries.json"));
  let drift = 0;
  for (const g of golden) {
    const r = searchStores(g.query, { filters: g.filters });
    const problems = [];
    if (r.parsed.intent !== g.intent)
      problems.push(`intent ${r.parsed.intent} ≠ ${g.intent}`);
    if (r.understood !== g.understood)
      problems.push(`understood ${r.understood} ≠ ${g.understood}`);
    if (r.results.length !== g.resultCount)
      problems.push(`antall ${r.results.length} ≠ ${g.resultCount}`);
    const top = r.results.slice(0, 3).map((x) => x.store.slug);
    if (top.join(",") !== g.top.join(","))
      problems.push(`topp [${top}] ≠ [${g.top}]`);
    if (problems.length) {
      fail(`Golden «${g.query}» – ${problems.join("; ")}`);
      drift++;
    }
  }
  if (!drift) ok(`Golden-baseline uendret for alle ${golden.length} søk`);
}

// --- Summary ---------------------------------------------------------------
console.log(
  `\n${failures === 0 ? "\x1b[32m" : "\x1b[31m"}${passes} ok, ${failures} feil\x1b[0m\n`,
);
process.exit(failures === 0 ? 0 : 1);
