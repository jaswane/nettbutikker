// Minimal ESM loader that lets Node (with native type-stripping) import the
// app's TypeScript modules directly, resolving the `@/` path alias from
// tsconfig. This makes the search engine testable in scripts/qa-checks.mjs
// without a build step or extra dependencies.
//
// Register with:  import { register } from "node:module";
//                 register("./ts-alias-loader.mjs", import.meta.url);

import { existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");

/** Try the specifier as-is, then with .ts/.tsx, then as a directory index. */
function findFile(basePath) {
  for (const suffix of ["", ".ts", ".tsx", "/index.ts"]) {
    const candidate = basePath + suffix;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const hit = findFile(resolvePath(projectRoot, specifier.slice(2)));
    if (hit) return { url: hit, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
