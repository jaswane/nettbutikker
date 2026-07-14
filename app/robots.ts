import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt (PRD §17 & §19). Blocks /go (affiliate redirects) and /api.
 *
 * AI-søk: OAI-SearchBot (ChatGPT search-indeksering) er eksplisitt tillatt på
 * offentlige sider. NB: dette er IKKE GPTBot (treningscrawler) – GPTBot har
 * ingen egen regel og faller inn under `*` (tillatt unntatt /go//api).
 * Ikke endre GPTBot-policy uten eksplisitt beslutning.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/go/", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/go/", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
