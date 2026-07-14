import type { Confidence, FieldConfidence, Store } from "@/lib/types";

/**
 * Claims read-model (docs/claims-modell.md).
 *
 * A claim is a sourced, dated, graded assertion about an entity or edge.
 * Today every fact is stored as its single RESOLVED claim (`FieldConfidence`
 * is the envelope); the write-side claim log arrives with the first automated
 * data source (fase 3 / T1). This module is the uniform read seam that log
 * will deliver behind: QA, tooling and future export read claims from here,
 * never by walking store internals themselves.
 */

export type ClaimGroup =
  | "payments"
  | "shipping"
  | "returns"
  | "geography"
  | "commercial"
  | "brands";

/**
 * Freshness SLA per claim group, in days – how long a claim stays trustworthy
 * without re-verification. `null` = structural facts that do not rot.
 * Exceeding the SLA is a BUILD FAILURE (QA), by design: stale assertions
 * presented as facts are a product bug (PRD v0.3 §1–3).
 */
export const CLAIM_SLA_DAYS: Record<ClaimGroup, number | null> = {
  payments: 365,
  shipping: 365,
  returns: 365,
  commercial: 365,
  brands: 540,
  geography: null,
};

/** SLA for the store-level lastChecked (the yearly full review). */
export const STORE_SLA_DAYS = 365;

export type StoreClaim = {
  /** Stable claim address: "<group>.<field>" or "brands.<brandSlug>". */
  key: string;
  group: ClaimGroup;
  value: unknown;
  confidence: Confidence;
  /** Verification date; falls back to the store's lastChecked when absent. */
  lastChecked: string;
  /** Set = verified against this address on lastChecked. Absent = editorial. */
  sourceUrl?: string;
  note?: string;
};

const ATTRIBUTE_GROUPS = [
  "payments",
  "shipping",
  "returns",
  "geography",
  "commercial",
] as const;

/** All resolved claims for a store, as one flat, uniform list. */
export function storeClaims(store: Store): StoreClaim[] {
  const claims: StoreClaim[] = [];

  for (const group of ATTRIBUTE_GROUPS) {
    const fields = store.attributes[group] as Record<
      string,
      FieldConfidence<unknown> | undefined
    >;
    for (const [field, fc] of Object.entries(fields)) {
      if (!fc) continue;
      claims.push({
        key: `${group}.${field}`,
        group,
        value: fc.value,
        confidence: fc.confidence,
        lastChecked: fc.lastChecked ?? store.lastChecked,
        sourceUrl: fc.sourceUrl,
        note: fc.note,
      });
    }
  }

  for (const b of store.brands ?? []) {
    claims.push({
      key: `brands.${b.slug}`,
      group: "brands",
      value: b.relevance,
      confidence: b.confidence,
      lastChecked: b.lastChecked ?? store.lastChecked,
      sourceUrl: b.sourceUrl,
      note: b.note,
    });
  }

  return claims;
}

/** Age of a claim in whole days at `now`. */
export function claimAgeDays(lastChecked: string, now: Date): number {
  const checked = new Date(lastChecked).getTime();
  return Math.floor((now.getTime() - checked) / 86_400_000);
}

export type Freshness = "fresh" | "aging" | "stale";

/**
 * Freshness verdict against the group SLA. "aging" = past 80 % of the SLA –
 * plan re-verification; "stale" = past it – build failure.
 */
export function claimFreshness(claim: StoreClaim, now: Date): Freshness {
  const sla = CLAIM_SLA_DAYS[claim.group];
  if (sla === null) return "fresh";
  const age = claimAgeDays(claim.lastChecked, now);
  if (age > sla) return "stale";
  if (age > sla * 0.8) return "aging";
  return "fresh";
}
