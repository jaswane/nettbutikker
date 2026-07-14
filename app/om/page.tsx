import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om oss",
  description: `Om ${site.name} – en søkeførst veiviser for norske nettbutikker.`,
  alternates: { canonical: "/om" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Om", href: "/om" }]} />

      <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
        Om {site.name}
      </h1>

      <div className="prose-custom mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
        <p className="text-pretty">
          {site.name} er en søkeførst veiviser for nettbutikker. I stedet for å
          bla gjennom en lang katalog skriver du hva du vil kjøpe eller lurer på,
          og får anbefalte butikker på sekunder.
        </p>
        <p className="text-pretty">
          Vi bygger rundt én kjerneidé: at et godt søk, kombinert med strukturert
          data om butikkene, gir bedre hjelp enn en tradisjonell oversikt. Utvalget
          er foreløpig et kuratert utvalg butikker på tvers av kategorier, og det
          utvides over tid.
        </p>
        <p className="text-pretty">
          Vi tar uavhengighet på alvor: noen lenker kan være annonselenker, men
          det påvirker ikke hvilke butikker vi anbefaler. Du kan lese mer om
          dette på{" "}
          <Link
            href="/annonser-og-samarbeid"
            className="text-accent-ink underline-offset-2 hover:underline"
          >
            annonser og samarbeid
          </Link>
          .
        </p>
        <p className="text-pretty">
          Informasjon om priser, frakt, betalingsmåter og lagerstatus kan endre
          seg. Sjekk derfor alltid butikkens egne vilkår før du handler.
        </p>
        <p className="text-pretty">
          Driver du en nettbutikk som ikke er oppført? Les om{" "}
          <Link
            href="/legg-til-nettbutikk"
            className="text-accent-ink underline-offset-2 hover:underline"
          >
            hvordan du kan få den vurdert
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Prøv søket
        </Link>
        <Link href="/slik-fungerer-det" className="btn-ghost">
          Slik fungerer det
        </Link>
      </div>
    </div>
  );
}
