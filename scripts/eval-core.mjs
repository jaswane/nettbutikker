// Search-quality evaluation core (docs/sokekvalitet.md).
//
// Runs the query panel in scripts/eval-queries.json against the real engine
// and measures two rates:
//   - forståelse: of the queries a shopping guide SHOULD understand, how many
//     are understood AND linked to the right entities (category/productType/
//     brand/store/attributes) with at least one result (unless allowEmpty)?
//   - ærlighet:   of the queries that are out of scope, how many are honestly
//     refused (understood=false)?
//
// Used by scripts/search-eval.mjs (detailed report) and scripts/qa-checks.mjs
// (floor thresholds). Deterministic – no network, no AI.

/** Evaluate one case; returns a list of problems (empty = pass). */
function evaluateCase(searchStores, c) {
  const r = searchStores(c.query, {});
  const e = c.expect;
  const problems = [];

  if (e.understood === false) {
    if (r.understood !== false) {
      problems.push(
        `skulle vært ærlig avvist, men ble tolket som ${r.parsed.intent} ` +
          `(cat=[${r.parsed.categorySlugs}] pt=[${r.parsed.productTypeSlugs}] brand=[${r.parsed.brandSlugs}])`,
      );
    }
    return problems;
  }

  if (!r.understood) {
    problems.push("ikke forstått");
    return problems;
  }
  if (e.category && !r.parsed.categorySlugs.includes(e.category)) {
    problems.push(
      `kategori «${e.category}» ikke gjenkjent (fikk: ${r.parsed.categorySlugs.join(", ") || "ingen"})`,
    );
  }
  if (e.productType && !r.parsed.productTypeSlugs.includes(e.productType)) {
    problems.push(
      `produkttype «${e.productType}» ikke gjenkjent (fikk: ${r.parsed.productTypeSlugs.join(", ") || "ingen"})`,
    );
  }
  if (e.brand && !r.parsed.brandSlugs.includes(e.brand)) {
    problems.push(
      `merkevare «${e.brand}» ikke gjenkjent (fikk: ${r.parsed.brandSlugs.join(", ") || "ingen"})`,
    );
  }
  if (e.store && r.parsed.storeSlug !== e.store) {
    problems.push(`butikk «${e.store}» ikke gjenkjent (fikk: ${r.parsed.storeSlug ?? "ingen"})`);
  }
  for (const key of e.attributes ?? []) {
    if (!r.parsed.attributeFilters.includes(key)) {
      problems.push(`attributt «${key}» ikke gjenkjent`);
    }
  }
  if (!e.allowEmpty && r.results.length === 0) {
    problems.push("forstått, men 0 resultater");
  }
  return problems;
}

/** Run the whole panel. Returns per-case results + the two rates (0–100). */
export function runEval(searchStores, cases) {
  const results = cases.map((c) => {
    const problems = evaluateCase(searchStores, c);
    return {
      query: c.query,
      inScope: c.expect.understood !== false,
      ok: problems.length === 0,
      problems,
    };
  });

  const rate = (list) =>
    list.length === 0 ? 100 : Math.round((list.filter((r) => r.ok).length / list.length) * 1000) / 10;

  const inScope = results.filter((r) => r.inScope);
  const outOfScope = results.filter((r) => !r.inScope);

  return {
    results,
    total: results.length,
    inScopeTotal: inScope.length,
    outOfScopeTotal: outOfScope.length,
    forstaelse: rate(inScope),
    aerlighet: rate(outOfScope),
  };
}
