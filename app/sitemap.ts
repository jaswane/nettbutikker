import type { MetadataRoute } from "next";
import { allCategories as categories, allStores as stores } from "@/lib/catalog";
import { nonEmptyLetters } from "@/lib/letters";
import { site } from "@/lib/site";

/**
 * Sitemap (PRD §19). Includes home, /sok, store profiles, categories,
 * /nettbutikker, alphabetical pages and legal pages. Deliberately EXCLUDES
 * /go/* (PRD §17).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPages = [
    "",
    "/sok",
    "/nettbutikker",
    "/slik-fungerer-det",
    "/om",
    "/kontakt",
    "/personvern",
    "/annonser-og-samarbeid",
    "/legg-til-nettbutikk",
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));

  for (const c of categories) {
    entries.push({
      url: `${base}/kategori/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const s of stores) {
    entries.push({
      url: `${base}/butikk/${s.slug}`,
      lastModified: new Date(s.lastChecked),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const letter of nonEmptyLetters(stores)) {
    entries.push({
      url: `${base}/nettbutikker/${letter}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    });
  }

  return entries;
}
