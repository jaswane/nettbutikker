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

const { allStores, storeClaims } = await import("../lib/catalog.ts");

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

/**
 * Kildekrav for verified-profiler (claims-modellen §8): konkrete claims som
 * vises offentlig – payments/shipping/returns/commercial, geography samt
 * merkevarer – må ha https-sourceUrl og gyldig lastChecked. Gjelder også
 * false-verdier (false er en faktapåstand), inkludert voec=false,
 * isNorwegian=true/false, country og shipsToNorway. At geography har SLA
 * null i claims-modellen betyr bare at claimet ikke foreldes – ikke at det
 * kan være ukildet. Eneste unntak:
 *  - confidence "unknown": vises som «Ukjent» og trenger ingen kilde
 *  - undefined felt: presenteres ikke og trenger ingen kilde
 */
function claimSourcingProblems(store) {
  const problems = [];
  for (const c of storeClaims(store)) {
    if (c.confidence === "unknown") continue;
    const path = c.group === "brands" ? c.key : `attributes.${c.key}`;
    const desc = `(value=${JSON.stringify(c.value)}, confidence=${c.confidence})`;
    if (!c.sourceUrl) {
      problems.push(`${path} mangler sourceUrl ${desc}`);
    } else if (!/^https:\/\//.test(c.sourceUrl)) {
      problems.push(`${path} har ikke-https sourceUrl: ${c.sourceUrl}`);
    } else if (PLACEHOLDER_RE.test(c.sourceUrl)) {
      problems.push(`${path} har placeholder-sourceUrl: ${c.sourceUrl}`);
    }
    if (!c.lastChecked || !/^\d{4}-\d{2}-\d{2}$/.test(c.lastChecked)) {
      problems.push(`${path} mangler gyldig lastChecked ${desc}`);
    }
  }
  return problems;
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

  // Kildekravet håndheves kun for verified – drafts re-researches uansett
  // fullt i batch-metoden før de løftes.
  if (store.contentStatus === "verified") {
    problems.push(...claimSourcingProblems(store));
  }

  return { words, sourceCount: sources.length, problems };
}

console.log("\nNettbutikker.no – innholdsaudit (read-only)\n");

let verifiedFailures = 0;
let verifiedCount = 0;
let geoExplicitDates = 0;
let geoFallbackDates = 0;
const drafts = [];

for (const store of allStores) {
  const status = store.contentStatus ?? "draft";
  const { words, sourceCount, problems } = auditStore(store);

  if (status === "verified") {
    verifiedCount++;
    for (const f of Object.values(store.attributes.geography)) {
      if (!f || f.confidence === "unknown") continue;
      if (f.lastChecked) geoExplicitDates++;
      else geoFallbackDates++;
    }
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
console.log(
  `Geography-datoer i verified: ${geoExplicitDates} eksplisitte, ${geoFallbackDates} via fallback til butikkens lastChecked.`,
);
if (verifiedFailures > 0) {
  console.log("\x1b[31mAudit feilet: verified-profiler bryter den redaksjonelle standarden.\x1b[0m\n");
  process.exit(1);
}
console.log("\x1b[32mAudit OK.\x1b[0m\n");
