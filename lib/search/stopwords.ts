/**
 * Norwegian stopwords – small, common words that must NEVER be searchable
 * entity phrases (PRD v0.3 §4). A stopword alias silently poisons results
 * (e.g. "for" once made «beste nettbutikk for løpesko» match pet stores).
 *
 * Shared by the lexicon (blocks generated diacritic-folded variants, e.g.
 * «fôr» → «for») and by QA (fails the build on hand-authored offenders).
 */
export const STOPWORDS: ReadonlySet<string> = new Set([
  "for", "med", "til", "og", "er", "en", "et", "den", "det", "de",
  "i", "på", "om", "av", "som", "du", "jeg", "hva", "hvor", "best",
  "beste", "ny", "nye", "klar", "kan", "skal", "vil", "har", "ikke",
]);
