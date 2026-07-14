import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/nettbutikker", label: "Alle nettbutikker" },
  { href: "/slik-fungerer-det", label: "Slik fungerer det" },
  { href: "/om", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/personvern", label: "Personvern" },
  { href: "/annonser-og-samarbeid", label: "Annonser og samarbeid" },
  { href: "/legg-til-nettbutikk", label: "Legg til nettbutikk" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line-strong bg-paper">
      <div className="mx-auto max-w-page px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-base font-extrabold tracking-tight text-ink">
            {site.shortName}
            <span className="text-accent">.</span>
            <span className="font-semibold text-ink-muted">no</span>
          </span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-ink-muted">
          <p>
            Noen lenker kan være annonse-/affiliatelenker. Det påvirker ikke hvilke
            butikker vi anbefaler. Informasjon om frakt, betaling og vilkår kan
            endres – kontroller alltid opplysningene hos nettbutikken før kjøp.
          </p>
          <p className="mt-3">
            © 2026 {site.name} · Et prosjekt fra{" "}
            <a
              href="https://swanecreative.no/"
              target="_blank"
              rel="noopener"
              className="text-ink-soft transition-colors hover:text-accent-ink"
            >
              Swane Creative
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
