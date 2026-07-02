// Detailed search-quality report (docs/sokekvalitet.md).
// Run with: npm run eval
//
// Prints per-query failures and the two headline rates (forståelse/ærlighet).
// The QA floors live in qa-checks.mjs – this script is the gap-analysis tool
// you run while expanding the vocabulary.

import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { register } from "node:module";
import { runEval } from "./eval-core.mjs";

register("./ts-alias-loader.mjs", import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const { searchStores } = await import(
  pathToFileURL(resolve(root, "lib/search/searchStores.ts")).href
);
const cases = JSON.parse(await readFile(resolve(root, "scripts/eval-queries.json"), "utf8"));

const summary = runEval(searchStores, cases);

console.log("\nNettbutikker.no – søkekvalitet\n");

const failures = summary.results.filter((r) => !r.ok);
if (failures.length) {
  console.log("Feilende spørringer:\n");
  for (const f of failures) {
    console.log(`  ✗ «${f.query}»`);
    for (const p of f.problems) console.log(`      ${p}`);
  }
  console.log("");
}

console.log(
  `Forståelse: ${summary.forstaelse} % (${summary.inScopeTotal} spørringer i domenet)`,
);
console.log(
  `Ærlighet:   ${summary.aerlighet} % (${summary.outOfScopeTotal} spørringer utenfor domenet)`,
);
console.log(`Totalt ${summary.total} spørringer, ${failures.length} feiler.\n`);
