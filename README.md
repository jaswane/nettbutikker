# Nettbutikker.no – MVP-prototype

Søkeførst AI-veiviser for norske nettbutikker. Bygget etter **PRD v0.2 – MVP Cut**,
med produktbeslutninger fra søkemotorarbeidet dokumentert i
[PRD v0.3 – tillegg](docs/PRD-v0.3-tillegg.md).
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
- `data/brands.ts` – merkevarer for søk/ranking
- `data/attribute-definitions.ts` – badges + Advanced Mode-filtre
- `lib/search/intent.ts` – intent-parser (where_to_buy, is_store_safe,
  store_with_attribute, brand_query, category_recommendation, unknown)
- `lib/search/ranking.ts` – relevansrangering (affiliate avgjør **ikke** rekkefølgen)
- `lib/search/searchStores.ts` – setter sammen svaret
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
Kontrollerer at: store-slugs er unike, affiliate-slugs er unike, alle
kategorireferanser finnes i `categories.ts`, `/go` ikke er i sitemap, robots
blokkerer `/go` og `/api`, `/go` setter `noindex`, alle rutefiler finnes, og at
alle butikker har gyldig `lastChecked`/`dataQuality`.
