import Link from "next/link";

/**
 * Transparent affiliate disclosure (docs/opplevelse-2026-07.md): the label is
 * always visible next to commercial CTAs, explains itself, and links to the
 * full policy. Trust through transparency – commission is disclosed in the
 * same breath as the promise that it never affects ranking (PRD §17).
 */
export function AffiliateMark() {
  return (
    <Link
      href="/annonser-og-samarbeid"
      title="Vi kan få provisjon hvis du handler via lenken. Det påvirker aldri hvilke butikker vi anbefaler eller rekkefølgen."
      className="underline decoration-line-strong decoration-dotted underline-offset-2 transition-colors hover:text-ink"
    >
      annonselenke
    </Link>
  );
}
