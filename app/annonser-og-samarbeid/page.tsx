import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Annonser og samarbeid",
  description: `Slik fungerer annonser, affiliatelenker og samarbeid på ${site.name}.`,
  alternates: { canonical: "/annonser-og-samarbeid" },
};

const points = [
  {
    h: "Noen lenker er annonselenker",
    p: "Enkelte lenker til nettbutikker er annonse-/affiliatelenker. Det betyr at vi kan motta en liten provisjon dersom du handler etter å ha klikket deg videre. Det koster ikke deg noe ekstra.",
  },
  {
    h: "Annonser styrer ikke anbefalingene",
    p: "Rangeringen vår bygger på relevans, tillit, datakvalitet og redaksjonell vurdering. En butikk uten affiliateavtale kan godt bli anbefalt foran en med – manglende avtale hindrer aldri at en god butikk vises.",
  },
  {
    h: "Tydelig merking",
    p: "Der en lenke er en annonselenke, forsøker vi å merke det tydelig. Utgående annonselenker er merket teknisk som «sponset» for søkemotorer.",
  },
  {
    h: "Betalte oppføringer",
    p: "Enkelte butikker kan betale for arbeidet med å bli vurdert og oppført i databasen. Slike betalinger påvirker aldri ranking eller anbefaling, og betalte oppføringer skal kunne merkes tydelig når de finnes. Redaksjonelle fakta og vurderinger bestemmes av Nettbutikker.no.",
  },
  {
    h: "Vil du samarbeide?",
    p: "Er du en nettbutikk som vil være med, eller mener du data om butikken din er feil? Ta kontakt, så ser vi på det.",
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs
        items={[{ name: "Annonser og samarbeid", href: "/annonser-og-samarbeid" }]}
      />

      <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
        Annonser og samarbeid
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
        Åpenhet om hvordan {site.name} tjener penger og hvordan det påvirker – og
        ikke påvirker – anbefalingene.
      </p>

      <div className="mt-8 space-y-6">
        {points.map((s) => (
          <section key={s.h} className="card p-5">
            <h2 className="font-display text-lg font-semibold text-ink">{s.h}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft text-pretty">
              {s.p}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/kontakt" className="btn-primary">
          Ta kontakt om samarbeid
        </Link>
      </div>
    </div>
  );
}
