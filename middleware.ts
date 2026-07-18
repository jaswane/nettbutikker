import { NextResponse, type NextRequest } from "next/server";

/**
 * Staging-vern (audit 2026-07-18, funn #1).
 *
 * Vercel serverer den samme builden på både produksjonsdomenet og på
 * *.vercel.app-adresser (prosjekt-alias og genererte deployment-URL-er).
 * Sidene sender kanonisk URL til https://nettbutikker.no uansett host, så en
 * crawlet vercel.app-kopi ville pekt på et domene som i dag videresender et
 * annet sted – og konkurrert med hoveddomenet når det kobles til.
 *
 * Vernet leser REQUEST-HOSTEN, ikke NODE_ENV: begge miljøer bygges med
 * NODE_ENV=production, og det er hosten – ikke bygget – som avgjør om svaret
 * er en offentlig kopi. Hoveddomenet er dermed upåvirket, og ingen
 * deployment-ID er hardkodet.
 *
 * Canonical, metadata og H1 er bevisst urørt: dette legger kun på et
 * transport-header. /go/ har allerede sitt eget, strengere noindex/nofollow +
 * no-store i route-handleren, og påvirkes ikke av dette.
 */

/** Host uten port, lowercase. Tom streng når headeren mangler. */
function hostname(request: NextRequest): string {
  const raw = request.headers.get("host") ?? "";
  return raw.split(":")[0]!.trim().toLowerCase();
}

/**
 * True for enhver Vercel-eid forhåndsvisningsadresse – både prosjekt-aliaset
 * (nettbutikker.vercel.app) og genererte deployment-hoster
 * (nettbutikker-abc123-team.vercel.app). Egne domener treffes aldri.
 */
export function isVercelPreviewHost(host: string): boolean {
  return host === "vercel.app" || host.endsWith(".vercel.app");
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (isVercelPreviewHost(hostname(request))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  /**
   * Alt unntatt Next.js' egne statiske filer og /go/ (som setter sine egne,
   * strengere headere selv). robots.txt og sitemap.xml er bevisst INKLUDERT –
   * de er nettopp filene en crawler leser først.
   */
  matcher: ["/((?!_next/static|_next/image|go/).*)"],
};
