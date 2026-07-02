import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt (PRD §17 & §19). Blocks /go (affiliate redirects) and /api.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/go/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
