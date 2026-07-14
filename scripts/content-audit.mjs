// Innholdsaudit for butikkprofiler (redaksjonell standard).
// Run with: npm run qa:content
//
// READ-ONLY: rapporterer ordtelling, kilder, mangler og status per butikk.
// Dikter aldri innhold og fyller aldri hull.
//
// Regler:
//  - `verified` krever: ≥300 ord beskrivelse (longDescription + seksjoner),
//    ≥2 kilder med gyldige https-URL-er, lastChecked, shortDescription,
//    bestFor/notBestFor, ingen tomme mellomtitler, ingen placeholder-ord.
//    Brudd for verified-profiler feiler auditen (exit 1).
//  - `draft` (eller uten status) kan ha mangler – de listes, men feiler ikke.

import { register } from "node:module";
register("./ts-alias-loader.mjs", import.meta.url);

const { allStores } = await import("../lib/catalog.ts");

const MIN_WORDS = 300;
const MIN_SOURCES = 2;
const PLACEHOLDER_RE = /\b(lorem|ipsum|placeholder|TODO|FIXME|prototype|demotekst)\b/i;

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

/** All visible description text for a store, joined. */
function fullText(store) {
  const parts = [store.longDescription ?? ""];
  for (const s of store.descriptionSections ?? []) {
    parts.push(s.heading, ...s.paragraphs);
  }
  return parts.join(" ");
}

/** Visible text fields to scan for placeholder words. */
function visibleFields(store) {
  return [
    store.shortDescription,
    store.longDescription ?? "",
    store.reviewSummary ?? "",
    ...(store.bestFor ?? []),
    ...(store.notBestFor ?? []),
    ...(store.warnings ?? []),
    ...(store.notes ?? []),
    ...(store.descriptionSections ?? []).flatMap((s) => [s.heading, ...s.paragraphs]),
  ].join(" ");
}

function auditStore(store) {
  const problems = [];
  const words = countWords(fullText(store));
  const sources = store.sources ?? [];

  if (words < MIN_WORDS) problems.push(`kun ${words} ord (< ${MIN_WORDS})`);
  if (sources.length < MIN_SOURCES) problems.push(`kun ${sources.length} kilder (< ${MIN_SOURCES})`);
  for (const src of sources) {
    try {
      const u = new URL(src.url);
      if (u.protocol !== "https:") problems.push(`kilde uten https: ${src.url}`);
    } catch {
      problems.push(`ugyldig kilde-URL: ${src.url}`);
    }
    if (!src.checkedAt || !/^\d{4}-\d{2}-\d{2}$/.test(src.checkedAt))
      problems.push(`kilde mangler gyldig checkedAt: ${src.label}`);
  }
  if (!store.shortDescription?.trim()) problems.push("mangler shortDescription");
  if (!store.longDescription?.trim()) problems.push("mangler longDescription");
  if (!store.lastChecked) problems.push("mangler lastChecked");
  if (!store.bestFor?.length) problems.push("tom bestFor");
  if (!store.notBestFor?.length) problems.push("tom notBestFor");
  if (!store.categories?.length) problems.push("mangler kategorier");
  for (const s of store.descriptionSections ?? []) {
    if (!s.heading.trim()) problems.push("tom mellomtittel");
    if (!s.paragraphs.length || s.paragraphs.some((p) => !p.trim()))
      problems.push(`tomt avsnitt under «${s.heading}»`);
  }
  const placeholder = visibleFields(store).match(PLACEHOLDER_RE);
  if (placeholder) problems.push(`placeholder-ord i synlig tekst: "${placeholder[0]}"`);

  return { words, sourceCount: sources.length, problems };
}

console.log("\nNettbutikker.no – innholdsaudit (read-only)\n");

let verifiedFailures = 0;
let verifiedCount = 0;
const drafts = [];

for (const store of allStores) {
  const status = store.contentStatus ?? "draft";
  const { words, sourceCount, problems } = auditStore(store);

  if (status === "verified") {
    verifiedCount++;
    const okMark = problems.length === 0;
    console.log(
      `${okMark ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"} VERIFIED  ${store.slug.padEnd(16)} ${String(words).padStart(4)} ord, ${sourceCount} kilder, sist kontrollert ${store.lastChecked}`,
    );
    if (!okMark) {
      verifiedFailures++;
      for (const p of problems) console.log(`    \x1b[31m→ ${p}\x1b[0m`);
    }
  } else {
    drafts.push({ slug: store.slug, words, sourceCount, problems });
  }
}

console.log(`\nDRAFT (${drafts.length} butikker – mangler listes, feiler ikke):`);
for (const d of drafts) {
  const top = d.problems.slice(0, 3).join("; ");
  console.log(
    `  · ${d.slug.padEnd(16)} ${String(d.words).padStart(4)} ord, ${d.sourceCount} kilder${top ? ` – ${top}` : ""}`,
  );
}

console.log(
  `\n${verifiedCount} verified (${verifiedFailures} med brudd), ${drafts.length} draft.`,
);
if (verifiedFailures > 0) {
  console.log("\x1b[31mAudit feilet: verified-profiler bryter den redaksjonelle standarden.\x1b[0m\n");
  process.exit(1);
}
console.log("\x1b[32mAudit OK.\x1b[0m\n");
