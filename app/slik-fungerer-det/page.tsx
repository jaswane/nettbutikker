import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Slik fungerer det – slik vurderer vi nettbutikker",
  description:
    "Hvordan Nettbutikker.no tolker søket ditt og rangerer nettbutikker etter relevans, tillit og datakvalitet – ikke etter annonseinntekt.",
  alternates: { canonical: "/slik-fungerer-det" },
};

const steps = [
  {
    t: "Du skriver hva du lurer på",
    d: "Skriv naturlig – «løpesko», «Er Temu trygt?» eller «norske nettbutikker med Vipps». Du trenger ikke kunne kategorier eller filtre.",
  },
  {
    t: "Vi tolker hva du mener",
    d: "En enkel motor gjenkjenner om du leter etter en kategori, en merkevare, en bestemt butikk, en betalingsmåte eller om du lurer på om en butikk er trygg.",
  },
  {
    t: "Vi rangerer butikkene",
    d: "Vi vekter relevans, kategori- og merkevaretreff, tillit, datakvalitet og redaksjonell vurdering. Annonselenker påvirker ikke rangeringen.",
  },
  {
    t: "Du får et tydelig svar",
    d: "Én anbefaling, noen alternativer og en forklaring på hvorfor – med forbehold om at du alltid bør sjekke vilkår hos butikken selv.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Slik fungerer det", href: "/slik-fungerer-det" }]} />

      <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
        Slik vurderer vi nettbutikker
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
        {site.name} er en søkeførst veiviser, ikke en katalog. Målet er å hjelpe
        deg å ta en god beslutning raskt.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="card flex gap-4 p-5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-accent text-sm font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">{s.t}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-10 card p-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Om datakvalitet (A–D)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">
          Hver butikk har en datakvalitetsmerking. <strong>A</strong> betyr godt
          verifiserte opplysninger, mens <strong>D</strong> betyr at vi er usikre
          og at du bør dobbeltsjekke selv. Vi viser alltid når informasjonen sist
          ble kontrollert.
        </p>
      </section>

      <Disclaimer className="mt-8" />

      <p className="mt-8 text-sm text-ink-muted">
        Lurer du på noe?{" "}
        <Link href="/kontakt" className="text-accent-ink underline-offset-2 hover:underline">
          Ta kontakt
        </Link>
        .
      </p>
    </div>
  );
}
