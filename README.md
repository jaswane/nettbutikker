# Nettbutikker.no – MVP-prototype

Søkeførst AI-veiviser for norske nettbutikker. Bygget etter **PRD v0.2 – MVP Cut**,
med produktbeslutninger fra søkemotorarbeidet dokumentert i
[PRD v0.3 – tillegg](docs/PRD-v0.3-tillegg.md). Arkitekturvurdering,
målarkitektur og migreringsplan: [docs/arkitektur-2026-07.md](docs/arkitektur-2026-07.md).
Dette er en prototype, ikke et ferdig kommersielt nettsted: ingen database, ingen
eksterne API-er, ingen innlogging, admin, scraping eller automatisk SEO-generering.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS med et eget design-system (warm hvit, dyp blå/svart, lilla/blå aksent)
- All data i lokale TypeScript-filer under `data/`

## Kom i gang
```bash
npm install
npm run dev        # utvikling på http://localhost:3000
```

## Scripts
| Kommando            | Hva den gjør                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Utviklingsserver                                         |
| `npm run build`     | Produksjonsbygg (genererer alle statiske ruter)          |
| `npm run start`     | Kjør produksjonsbygg                                     |
| `npm run lint`      | ESLint (next/core-web-vitals)                            |
| `npm run typecheck` | `tsc --noEmit`                                           |
| `npm run qa`        | Prosjektspesifikke QA-kontroller (se under)              |
| `npm run check`     | lint + typecheck + qa + build                            |

## Ruter
- `/` – søkeførst forside (start-skjerm, ingen katalog over fold)
- `/sok` – søkeresultat med konklusjon, beste valg, alternativer og Advanced Mode
- `/butikk/[slug]` – butikkprofil (30 butikker)
- `/kategori/[slug]` – 13 hovedkategorier
- `/nettbutikker` – alfabetisk + kategori-oversikt (sekundær navigasjon)
- `/nettbutikker/[letter]` – A–Z, Æ, Ø, Å, 0-9
- `/go/[slug]` – affiliate-/utgående redirect (noindex, blokkert i robots, ikke i sitemap)
- `/slik-fungerer-det`, `/om`, `/kontakt`, `/personvern`, `/annonser-og-samarbeid`
- `sitemap.xml`, `robots.txt`

## Datamodell (`data/` + `lib/types.ts`)
- `data/stores.ts` – 30 testbutikker (`Store`, `StoreAttributes`, `FieldConfidence` …)
- `data/categories.ts` – 13 hovedkategorier + `CategoryMapping`
- `data/product-types.ts` – produkttype-vokabularet («løpesko», «hundefôr» …):
  det brukeren vil kjøpe, adskilt fra navigasjonskategoriene
  (se [docs/produkttype-modell.md](docs/produkttype-modell.md))
- `data/brands.ts` – merkevarer for søk/ranking
- `data/attribute-definitions.ts` – attributt-REGISTERET: én oppføring per
  attributt driver Advanced Mode-filtre, badges og søkefraser
- `lib/catalog.ts` – **eneste lesevei** til entitetene: oppslag, postings
  (kategori/merke/filter → butikker), relaterte butikker (QA-håndhevet)
- `lib/search/lexicon.ts` – ett kompilert leksikon (fraser → entiteter) med
  diakritikk-folding («elkjop» → Elkjøp) og stoppord-vern
- `lib/search/intent.ts` – intent-parser over entity-linking-resultatet
- `lib/search/ranking.ts` – relevansrangering (affiliate avgjør **ikke** rekkefølgen)
- `lib/search/searchStores.ts` – kandidat-henting fra postings + svarbygging
- `lib/letters.ts`, `lib/affiliate.ts`

> **Datakvalitet:** Alle attributter er veiledende prototypdata, merket med
> `dataQuality` (A–D) og `lastChecked`. Sjekk alltid butikkens egne vilkår.

### Butikklogoer (fremtid)
`Store` har et valgfritt `logo`-felt. Inntil ekte logoer finnes viser UI-et en
diskré initial-basert fallback ([components/StoreLogo.tsx](components/StoreLogo.tsx)).
Når du vil legge inn ekte logoer:
1. Legg lokale filer i `public/logos/[slug].svg` (eller `.png`).
2. Sett `logo: { src: "/logos/[slug].svg", alt: "Butikknavn", background: "light" }`
   på butikken i `data/stores.ts`.

Ikke hotlink tredjepartslogoer eller butikkenes favicons – bruk kun lokale filer
du har rett til å bruke.

## QA (`npm run qa`)
Kontrollerer bl.a.: unike slugs, referanseintegritet (kategori/underkategori/
merke), `/go`-SEO-reglene, at alle rutefiler finnes, gyldig
`lastChecked`/`dataQuality`, konsistens mellom topp-felter og
`attributes.geography`, at kun `lib/catalog.ts` leser data-entiteter direkte,
leksikon-hygiene (ingen stoppord som søkefraser, kollisjons-allowlist) – og
kjører søkemotor-regresjonstestene pluss **golden-baselinen**
(`scripts/golden-queries.json`, 23 frosne søk). Bevisste søkeendringer må
regenerere baselinen med `npm run golden` i samme commit.
