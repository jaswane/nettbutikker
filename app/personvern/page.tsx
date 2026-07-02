import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personvern",
  description: `Personvern og bruk av data på ${site.name}.`,
  alternates: { canonical: "/personvern" },
};

const sections = [
  {
    h: "Kort oppsummert",
    p: "Vi samler ikke inn personopplysninger for å identifisere deg, og krever ingen innlogging. Du kan bruke søket uten å oppgi noe om deg selv.",
  },
  {
    h: "Søk og statistikk",
    p: "Vi kan registrere anonym, aggregert statistikk om bruk – for eksempel at et søk ble utført eller at Advanced Mode ble åpnet – for å forbedre tjenesten. Vi forsøker å unngå å lagre selve søketeksten dersom den kan inneholde sensitiv informasjon.",
  },
  {
    h: "Informasjonskapsler",
    p: "Nettstedet bruker minimalt med informasjonskapsler. Eventuelle tredjeparter (for eksempel ved bruk av annonse-/affiliatelenker) kan sette egne informasjonskapsler når du klikker deg videre til en butikk.",
  },
  {
    h: "Lenker til andre butikker",
    p: "Når du klikker deg videre til en nettbutikk, gjelder butikkens egne vilkår og personvernregler. Vi har ikke kontroll over hvordan de behandler dine opplysninger.",
  },
  {
    h: "Annonse- og affiliatelenker",
    p: "Noen lenker kan være annonselenker. Når du følger en slik lenke, kan partneren registrere at du kom fra oss. Dette påvirker ikke hvilke butikker vi anbefaler.",
  },
  {
    h: "Endringer",
    p: "Innholdet og denne siden kan bli oppdatert over tid. Sjekk gjerne tilbake ved senere besøk.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Personvern", href: "/personvern" }]} />

      <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
        Personvern
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
        Hvordan {site.name} forholder seg til data og personvern.
      </p>

      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-lg font-semibold text-ink">{s.h}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft text-pretty">
              {s.p}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-10 text-xs text-ink-muted">
        Dette er en forenklet personvernerklæring og er ikke juridisk rådgivning.
      </p>
    </div>
  );
}
