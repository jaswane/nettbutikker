import type { Store } from "@/lib/types";

/**
 * Affiliate handling (PRD §17).
 * Outgoing links always go through /go/[slug]. The actual destination is the
 * affiliateUrl when an affiliateSlug is set, otherwise the plain websiteUrl.
 */

/** Path used everywhere we link out to a store. */
export function goHref(store: Pick<Store, "slug">): string {
  return `/go/${store.slug}`;
}

/** Whether the outbound link should be marked as sponsored. */
export function isAffiliate(store: Pick<Store, "affiliateSlug">): boolean {
  return Boolean(store.affiliateSlug);
}

/**
 * Resolve the real outbound destination for a store.
 * In the MVP there is no external affiliate network, so we build a stable,
 * tagged URL from the store's own website. A real integration would swap this
 * for the network deep-link.
 */
export function resolveOutboundUrl(
  store: Pick<Store, "websiteUrl" | "affiliateSlug">,
): string {
  if (!store.affiliateSlug) return store.websiteUrl;
  try {
    const url = new URL(store.websiteUrl);
    // Tag so the prototype can demonstrate affiliate attribution.
    url.searchParams.set("utm_source", "nettbutikker.no");
    url.searchParams.set("utm_medium", "affiliate");
    url.searchParams.set("aff", store.affiliateSlug);
    return url.toString();
  } catch {
    return store.websiteUrl;
  }
}

/** rel attribute for visible outbound links. */
export const OUTBOUND_REL = "nofollow sponsored noopener";
