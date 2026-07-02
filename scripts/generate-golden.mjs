// Regenerates scripts/golden-queries.json – the golden search-regression
// baseline. Run with: npm run golden
//
// The golden file freezes intent, understood-flag, result count and the top-3
// store slugs for a battery of queries. QA (npm run qa) fails on ANY drift, so
// intentional search-behaviour changes must regenerate this file in the same
// commit and explain the diff in the commit message.

import { writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { register } from "node:module";

register("./ts-alias-loader.mjs", import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const { searchStores } = await import(
  pathToFileURL(resolve(root, "lib/search/searchStores.ts")).href
);

/**
 * The battery. Covers every searchable entity type (store, category,
 * subcategory, brand, attribute), every intent, multi-signal queries,
 * diacritic-less typing and nonsense.
 */
const CASES = [
  // PRD §4 canonical examples
  { query: "Er Temu trygt?" },
  { query: "Norske nettbutikker med Vipps" },
  { query: "Hvor kjøper jeg LEGO?" },
  { query: "Beste nettbutikk for løpesko" },
  { query: "Nettbutikker med Klarna" },
  { query: "Hvor kjøper jeg gaming-PC?" },

  // Store as entity
  { query: "zalando" },
  { query: "Er Amazon trygt?" },
  { query: "Er elkjop trygt?" }, // typed without ø – diacritic folding case

  // Category & subcategory
  { query: "hudpleie" },
  { query: "sykkel" },
  { query: "briller" },
  { query: "matkasse" },
  { query: "klær til dame" },
  { query: "beste nettbutikk for møbler" },
  { query: "Hvor kan jeg kjøpe hundefôr?" },

  // Brand via alias
  { query: "iphone" },
  { query: "playstation" },

  // Attributes, alone and combined
  { query: "vipps" },
  { query: "nettbutikker med fri frakt" },
  { query: "norske nettbutikker med klarna og fri frakt" },
  { query: "sport", filters: ["vipps"] },

  // Honesty gate
  { query: "xkqzv jwrpt" },
];

const golden = CASES.map(({ query, filters = [] }) => {
  const r = searchStores(query, { filters });
  return {
    query,
    filters,
    intent: r.parsed.intent,
    understood: r.understood,
    resultCount: r.results.length,
    top: r.results.slice(0, 3).map((x) => x.store.slug),
  };
});

const out = resolve(root, "scripts/golden-queries.json");
await writeFile(out, JSON.stringify(golden, null, 2) + "\n");
console.log(`Skrev ${golden.length} golden-tilfeller til scripts/golden-queries.json`);
