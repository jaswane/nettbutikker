# ProductType – domenemodell

**Dato:** 2026-07-02 · **Status:** Vedtatt, grunnmur implementert (se §8)
**Bygger på:** [arkitektur-2026-07.md](arkitektur-2026-07.md) §2.1 og fase 2.

---

## 1. Hva er egentlig en ProductType?

En ProductType er **en klasse kjøpbare ting, navngitt slik brukeren tenker når
hun skal handle**: «løpesko», «gaming-PC», «hundefôr», «serum», «barnevogn»,
«vinterdekk». Det er enheten for kjøpsintensjon – substantivet i «hvor kjøper
jeg X?».

Tre tester for om noe er en ProductType:

1. **Substantiv-testen:** kan det stå som X i «hvor kjøper jeg X?» uten å
   høres rart ut? («løpesko» ja, «sport, friluft og trening» nei.)
2. **Hylletest:** kan en butikk ha en hylle/avdeling for det? (dvs. det er en
   vareklasse, ikke en egenskap – «fri frakt» er ikke en ProductType.)
3. **Klasse, ikke instans:** «løpesko» ja, «Nike Pegasus 41» nei. Enkeltmodeller
   er produkter og hører til produktfeeds – et eksplisitt ikke-mål (PRD §3).

### Avgrensning mot Category

| | Category | ProductType |
| --- | --- | --- |
| **Hva** | Redaksjonell navigasjonsbøtte | Brukerspråkets etterspørselsvokabular |
| **Antall** | 13, stabilt, kuratert | Hundrevis → tusenvis, halelang |
| **Eier** | Redaksjonen (informasjonsarkitektur) | Brukerne (slik de faktisk søker) |
| **Endres når** | Sjelden – strukturbeslutning | Løpende – nytt ord = ny rad |
| **Har egen side** | Ja (`/kategori/[slug]`) | Nei som hovedregel (se §6) |

En Category er en *visning*; ProductTypene er *grafen*. «Sport, friluft og
trening» finnes fordi vi trenger en meny og en side – ingen bruker søker på
det. Google gjør samme skille: Product Taxonomy (klassifisering av ting) er
adskilt fra site-navigasjon.

Dagens «subcategories» var en sammenblanding: halvt navigasjon, halvt
produktvokabular («løpesko», «hundefôr»-aliaser). PRD-en kalte dem selv
«representative, for matching, not exhaustive» – altså et spirende
produkttype-vokabular. **Beslutning: ProductType absorberer subcategories.**
Det finnes ingen underkategori-ruter, så dette er en ren datamodell-endring.

### Avgrensning mot Brand

Brand svarer «hvem lager det», ProductType «hva det er». De møtes i spørringer
som «nike løpesko»: merke + produkttype er to uavhengige signaler som begge
skal påvirke rangeringen. Derfor er `ProductType.brandSlugs` en *assosiasjon*
(Nike er typisk for løpesko), aldri en eierskapsrelasjon.

### Avgrensning mot Attribute

Attributter er egenskaper ved *butikken* (Vipps, fri frakt); ProductType er
egenskap ved *etterspørselen*. En spørring kan ha begge: «norsk nettbutikk med
vipps som selger løpesko».

## 2. Relasjonene

```
ProductType ──in_category──▶ Category        (1..n, første er primær/hjem)
ProductType ──broader──▶ ProductType         (0..1, lett hierarki, ingen tvungen trestruktur)
ProductType ──assoc_brand──▶ Brand           (0..n, typiske merker)
Store ──sells──▶ ProductType                 (i dag: via kategorikanten, se under)
```

**`sells`-kanten i MVP:** butikkens produkttype-kobling ligger som
`productType?`-felt på butikkens kategorikant (`StoreCategoryRef`). Det er et
bevisst kompromiss: dagens data har den formen (tidligere `sub`), og kanten
arver kategorikantens `relevance`. Når lagringen blir generisk (arkitektur
fase 3) løftes dette til egne kant-rader med claim-metadata (kilde,
confidence, sjekket-dato) – akkurat som merkekantene allerede har. Modellen
er forberedt: å *lese* koblingen går allerede via katalogen
(`storesWithProductType`), så lagringsformen kan byttes uten at noe over
katalogen merker det.

**Trust/Claims:** en ProductType har i seg selv ingen tillitsdata – tillit bor
på butikker og på kanter. Men produkttypen er *subjektet* i fremtidige claims:
«Elkjøp selger gaming-PC (kilde: crawl 2026-06, confidence: high)». Det er
derfor kanten – ikke entiteten – som skal bære claim-metadata i fase 3.

## 3. Feltene

```ts
export type ProductType = {
  slug: string;              // "lopesko" – stabil identitet
  name: string;              // "Løpesko" – visningsnavn
  aliases: string[];         // søkefraser; leksikonet folder diakritikk selv
  categories: MainCategorySlug[]; // navigasjonshjem; første er primær
  broader?: string;          // valgfri bredere produkttype ("lopesko" → "sko")
  brandSlugs?: string[];     // typiske merker (spørringsraffinering, lenker)
  description?: string;      // kort brukertekst; PÅKREVD før ev. svarside (§6)
};
```

Bevisst utelatt (og hvorfor):

- **`seoPage`/`indexable`-flagg** – ingen produkttype-ruter finnes ennå;
  flagget legges til når `/svar/[slug]` bygges, ikke før (ingen spekulative
  felter).
- **`popularity`/søkevolum** – kommer fra analytics-pipeline senere, ikke
  håndvedlikehold.
- **claim-felter på entiteten** – claims hører til kantene (§2).
- **hierarki som tre** – `broader` er en valgfri peker, ikke en tvungen
  taksonomi. Tvungne trær råtner; lette pekere kan alltid strammes til.

## 4. Hvordan ProductType gjør søket bedre

1. **Presisjon i rangering:** treff på produkttype gir +12 over ren
   kategorimatch (mekanikken fantes for subcategories; nå har den riktig
   navn og eget vokabular). «Hundefôr» rangerer hundespesialisten Vom og
   Hundemat foran generalisten Zooplus – verifisert i golden-baselinen.
2. **Presisjon i språket:** svaret kan navngi det brukeren faktisk ba om:
   «Sport 1 er vårt beste valg for **løpesko**» i stedet for «… innen sport,
   friluft og trening». Kategorinavn i overskriften avslører at vi matcher
   grovt; produkttypenavnet viser at vi forsto.
3. **Skarpere ærlighet (PRD v0.3 §3):** «vi forsto at du leter etter
   vinterdekk, men har ingen butikker registrert for akkurat det» blir mulig å
   skille fra kategorinivå-svar.
4. **Fremtidig AI-søk:** LLM-fallbacken for uforståtte spørringer skal mappe
   fritekst til *lukket vokabular* – produkttype-slugs – aldri generere fakta.
   Jo rikere vokabularet er, jo oftere lander AI-en i grafen i stedet for i
   «vi forsto ikke». Embeddings for synonym-gjenfinning skjer offline og
   materialiseres som `aliases` etter QA – leksikonet forblir den
   deterministiske broen.

## 5. Én modell → mange projeksjoner

Samme kanter rendres forskjellig, ingenting dupliseres:

- **Søk:** leksikonfraser → produkttype → kandidat-postings → rangering.
- **Butikkprofil:** butikkens produkttyper vises ved kategoriene og lenker til
  søket (`/sok?q=Løpesko`) – beslutningshjelp og interne lenker fra samme kant.
- **Kategoriside:** «Populære søk» – produkttypene i kategorien som lenkeliste
  til søket. Kategorisiden blir en graf-spørring, ikke håndskrevet innhold.
- **SEO:** i dag kun bedre intern lenking og bedre svartekster; sidegenerering
  er bevisst utsatt (§6).

## 6. SEO uten side-eksplosjon

Tre nivåer, der **nivå 1 er default og nivå 3 krever manuell kuratering**:

1. **Søkbar (alle):** enhver produkttype er søkbar og lenkbar via
   `/sok?q=…`. Disse resultatsidene er allerede `noindex` (kun `/sok` uten
   query indekseres) – vokabularet kan vokse fritt uten å produsere én eneste
   ny indekserbar URL.
2. **Internt lenket (alle med butikker):** profil- og kategorisidene lenker
   til produkttype-søk. Det gir crawlere og brukere stier gjennom grafen uten
   nye sider.
3. **Svarside (kuratert håndfull, senere):** `/svar/[slug]` (PRD §14
   «senere») bygges kun for produkttyper som består en redaksjonell port:
   `description` skrevet, ≥N butikker med sterk kobling, dokumentert
   søkeetterspørsel. Porten håndheves i QA når rutene kommer.

Anti-mønsteret vi eksplisitt avviser: programmatisk generering av
`/produkttype/[slug]`-sider for hele vokabularet. Tusenvis av tynne sider er
både PRD-brudd (§24) og Google-gift (thin/doorway content).

## 7. Hvorfor denne modellen er bedre enn dagens

- **Vokabularet får identitet.** «Løpesko» er en rad med slug, navn, aliaser
  og kanter – ikke en streng gjemt i en kategorifil. Nye ord = dataendring.
- **Skillet navigasjon/etterspørsel blir eksplisitt.** Kategoriene kan forbli
  13 og stabile mens vokabularet vokser til tusenvis – uavhengige akser.
- **Kryss-kategori blir mulig** («smartklokke» → elektronikk *og* sport) –
  subcategories kunne per konstruksjon bare tilhøre én kategori. (Migrert
  data er 1:1 i dag; kapasiteten er der uten omskriving.)
- **AI-fallback får et lukket mål** å lande i (fase 4), og claims-pipelinen
  (fase 3) får kanter å henge bevis på.
- **Enkel ved 30, holder ved 20 000:** i dag én TS-fil med 29 rader; ved
  skala er det samme logiske skjema DB-tabeller (`product_types`,
  `store_product_types` med claim-kolonner) bak katalog-seamen.

## 8. Migreringsplan og status

**Steg 1 (gjort):** `data/product-types.ts` opprettet – de 29 subcategories
løftet til produkttyper (samme slugs og aliaser → søkeadferd bevart,
golden-verifisert uendret). `Category.subcategories` fjernet.
`StoreCategoryRef.sub` → `productType`. Leksikon, intent (`productTypeSlugs`),
ranking, katalog (`getProductType`, `productTypesInCategory`,
`storesWithProductType`) og QA (referanseintegritet begge veier, minst én
butikk-vei per produkttype, unike slugs) oppdatert.

**Steg 2 (gjort):** projeksjonene – svaroverskrifter navngir produkttypen,
butikkprofilens kategoriliste lenker produkttypen til søket, kategorisider
fikk «Populære søk». QA-regresjonsvern for overskriften.

**Steg 3 (ved behov, data-only):** utvid vokabularet med nye produkttyper
(«vinterdekk», «barnevogn», «smartklokke» …), legg `broader`-pekere og
kryss-kategori der det er naturlig. Ingen kodeendring.

**Steg 4 (fase 3 i arkitekturplanen):** `sells`-kanten løftes ut av
kategorikanten til egne rader med claim-metadata når lagringen blir generisk.

**Steg 5 (fase 4):** kuraterte svarsider for utvalgte produkttyper bak
redaksjonell QA-port; AI-fallback som mapper fritekst til vokabularet.
