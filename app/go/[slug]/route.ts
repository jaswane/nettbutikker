import { NextResponse } from "next/server";
import { getStore } from "@/lib/catalog";
import { resolveOutboundUrl } from "@/lib/affiliate";

/**
 * Affiliate / outbound redirect (PRD §17).
 * Redirects to affiliateUrl (when affiliateSlug is set) else websiteUrl.
 * Always noindex/nofollow; excluded from sitemap and blocked in robots.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const store = getStore(slug);

  const headers = new Headers({
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  });

  if (!store) {
    return new NextResponse("Fant ikke butikken.", { status: 404, headers });
  }

  const destination = resolveOutboundUrl(store);
  headers.set("Location", destination);
  return new NextResponse(null, { status: 302, headers });
}
