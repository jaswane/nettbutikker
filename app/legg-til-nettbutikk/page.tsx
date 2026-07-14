import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Få nettbutikken din oppført | Nettbutikker.no" },
  description:
    "Få nettbutikken din vurdert for oppføring på Nettbutikker.no. Fast pris 1 000 kr + mva. Betaling påvirker aldri rangering eller anbefalinger.",
  alternates: { canonical: "/legg-til-nettbutikk" },
  robots: { index: true, follow: true },
};

/**
 * Kommersiell side for betalt oppføring. Flat, redaksjonell layout – ingen
 * kort-grids, ingen skygger, ingen kundesitater. Kontaktadressen vises ALDRI
 * her (kun på /kontakt); all CTA går via /kontakt. Ingen Product/Review/
 * AggregateRating-schema. Betaling gjelder arbeidet med vurdering og
 * oppføring og påvirker aldri ranking (se listingType i lib/types.ts).
 */

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Gir betaling bedre plassering?",
    a: "Nei. Betaling skal ikke inngå i ranking eller anbefalinger. Plassering styres av relevans, dokumenterte egenskaper og kvaliteten på datagrunnlaget.",
  },
  {
    q: "Er oppføring garantert?",
    a: "Nei. Butikken vurderes før fakturering, og forespørsler kan avslås – for eksempel når butikken faller utenfor katalogens dekning eller vi ikke kan dokumentere sentrale fakta.",
  },
  {
    q: "Kan vi bestemme hva som står på profilen?",
    a: "Dere kan levere og korrigere dokumenterbare fakta, men Nettbutikker.no bestemmer redaksjonell tekst, struktur og vurdering.",
  },
  {
    q: "Hva koster det?",
    a: "1 000 kr + mva for første redaksjonelle vurdering og oppføring.",
  },
  {
    q: "Når betaler vi?",
    a: "Etter at butikken er forhåndsvurdert og oppføringen er akseptert. Blir forespørselen avslått, faktureres ingenting.",
  },
  {
    q: "Hvor lang tid tar det?",
    a: "Leveringstid avtales før fakturering, sammen med hvilke opplysninger vi trenger.",
  },
  {
    q: "Kan vi melde fra om feil senere?",
    a: (
      <>
        Ja. Meld fra via{" "}
        <Link href="/kontakt" className="text-link">
          kontaktsiden
        </Link>
        , så kontrollerer vi og retter dokumenterte feil.
      </>
    ),
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs
        items={[{ name: "Legg til nettbutikk", href: "/legg-til-nettbutikk" }]}
      />

      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Få nettbutikken din oppført
      </h1>
      <div className="mt-4 max-w-prose space-y-3 text-base leading-relaxed text-ink-soft">
        <p className="text-pretty">
          Driver du en nettbutikk som selger til Norge, kan du be om redaksjonell
          vurdering og oppføring i {site.name}s database. Oppføring koster{" "}
          <strong className="font-semibold text-ink">1 000 kr + mva</strong>, og
          butikken vurderes før noe faktureres. Betaling garanterer ikke aksept.
        </p>
        <p className="text-pretty">
          {site.name} bestemmer den redaksjonelle teksten og vurderingen.
          Faktapåstander kontrolleres mot butikkens egne sider og andre relevante
          primærkilder – og betaling gir aldri bedre rangering.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <Section title="Dette får du">
          <Bullets
            items={[
              `Egen butikkprofil på ${site.name}`,
              "Redaksjonelt skrevet og faktabasert presentasjon",
              "Minst 300 ord når tilstrekkelige fakta og kilder finnes",
              "Kategorier og relevante merkevarer",
              "Praktisk informasjon om betaling, frakt og levering",
              "Dokumenterte kilder og dato for siste kontroll",
              `Mulighet for å bli funnet gjennom ${site.name}s katalog og søk`,
              "Logo på profilen når en egnet offisiell logofil leveres",
            ]}
          />
        </Section>

        <Section title="Dette får du ikke">
          <Bullets
            items={[
              "Ingen kjøpt topplassering",
              "Ingen garanti for å bli anbefalt",
              "Ingen kontroll over den redaksjonelle vurderingen",
              "Ingen skjult reklame",
              "Ingen garanti for trafikk eller salg",
              "Ingen rett til å fjerne korrekte, relevante forbehold",
            ]}
          />
        </Section>

        <Section title="Pris">
          <p className="text-2xl font-bold tracking-tight text-ink">
            1 000 kr <span className="text-base font-medium text-ink-muted">+ mva</span>
          </p>
          <p className="max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
            Prisen gjelder første redaksjonelle vurdering og oppføring.
            Fakturering skjer først etter at butikken er forhåndsvurdert og
            akseptert. Leveringstid og nødvendige opplysninger avtales før
            fakturering.
          </p>
        </Section>

        <Section title="Dette trenger vi fra deg">
          <Bullets
            items={[
              "Nettbutikkens navn og nettadresse",
              "Organisasjonsnummer",
              "Kontaktperson",
              "Kort beskrivelse av sortimentet",
              "Viktigste kategorier og merkevarer",
              "Lenker til fraktinformasjon",
              "Lenker til betalingsinformasjon",
              "Lenker til retur- og kjøpsvilkår",
              "Offisiell logo i SVG, PNG eller WebP hvis tilgjengelig",
              "Annen relevant dokumentasjon",
            ]}
          />
        </Section>

        <Section title="Slik fungerer det">
          <ol className="max-w-prose space-y-2.5 text-[15px] leading-relaxed text-ink-soft">
            {[
              "Du tar kontakt.",
              "Vi vurderer om nettbutikken passer inn.",
              "Vi bekrefter om oppføringen kan gjennomføres.",
              "Vi avtaler informasjon, leveringstid og fakturering.",
              "Vi kontrollerer fakta og skriver profilen.",
              "Profilen kvalitetssikres og publiseres.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-semibold tabular-nums text-accent-ink">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="pt-3">
            <Link href="/kontakt" className="btn-primary">
              Ta kontakt om oppføring
            </Link>
          </div>
        </Section>

        <Section title="Redaksjonell uavhengighet">
          <div className="border-l-2 border-accent pl-4">
            <p className="max-w-prose text-[15px] leading-relaxed text-ink text-pretty">
              Betaling gjelder arbeidet med vurdering, faktakontroll og
              oppføring. Den gir aldri bedre plassering i søkeresultater, høyere
              redaksjonell score eller større sannsynlighet for å bli anbefalt.
              Rangering og anbefalinger styres av relevans, dokumenterte
              egenskaper og kvaliteten på datagrunnlaget.
            </p>
          </div>
          <p className="max-w-prose text-sm leading-relaxed text-ink-muted text-pretty">
            Les mer om hvordan {site.name} tjener penger på{" "}
            <Link href="/annonser-og-samarbeid" className="text-link">
              annonser og samarbeid
            </Link>
            .
          </p>
        </Section>

        <Section title="Vanlige spørsmål">
          <dl className="space-y-5">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-semibold text-ink">{item.q}</dt>
                <dd className="mt-1 max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </div>
  );
}
