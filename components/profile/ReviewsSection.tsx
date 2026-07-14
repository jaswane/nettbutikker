/**
 * RESERVED for real user reviews – NOT rendered anywhere yet.
 *
 * The «Omtaler» tab was removed from StoreProfile until a genuine review
 * system exists (backend, moderation, GDPR). Editorial content («Vår
 * vurdering» – reviewSummary/editorialPros/editorialCons) lives in
 * OverviewSection and must never move back here: this section is for
 * third-party user voices only.
 *
 * Rules when this is wired up again:
 *  - render ONLY real, moderated user reviews – never placeholders,
 *    never simulated reviews, never editorial text
 *  - the tab is added back in StoreProfile only when reviews exist
 *  - Review/AggregateRating schema only when real, visible reviews exist
 */
export function ReviewsSection() {
  return null;
}
