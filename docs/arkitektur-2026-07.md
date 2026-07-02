# Arkitekturvurdering og målarkitektur

**Rolle:** Staff Engineer / Search Architect / Product Lead
**Dato:** 2026-07-02 · **Grunnlag:** PRD v0.2, PRD v0.3-tillegget, hele kodebasen
**Status:** Vedtatt retning. Grunnmursendringene i §6 er implementert; resten er plan.

---

## 0. Den ærlige konklusjonen først

**Vi bygger riktig produkt, men av feil grunn enn vi tror.** Søkeopplevelsen er
ikke moaten – Google, Prisjakt og ChatGPT vil alltid være bedre på «hvor kjøper
jeg løpesko». Det forsvarbare i dette produktet er **den norske tillitsdataen**:
VOEC, Vipps, norsk butikk, returvilkår, «Er Temu trygt?» – strukturert, kildet,
datert og ærlig. Ingen av de store aktørene strukturerer dette for det norske
markedet. Søket er *grensesnittet* til den dataen, ikke produktet.

Det har én stor konsekvens for arkitekturen: **datamodellen og datainnsamlings-
pipelinen er systemet vi bygger. Nettsiden er en projeksjon av den.** Dagens
kodebase behandler det motsatt – data er statiske filer som mater en nettside.
Det er riktig for en prototype, men alle veivalg fremover må bygge asseten,
ikke nettsiden.

---

## 1. Vurdering av dagens arkitektur

### Det som er riktig (og må vernes)

- **Ærlighets-DNA-et.** Skillet mellom `matchScore` og kvalitetsbaseline i
  [ranking.ts](../lib/search/ranking.ts), `understood`-flagget i
  [searchStores.ts](../lib/search/searchStores.ts), og at affiliate aldri
  påvirker rangering. Dette er nedfelt i PRD v0.3 og er produktets ryggrad.
- **Proveniens i embryo.** `FieldConfidence<T>` (verdi + confidence +
  lastChecked + sourceUrl) er en *claim* i kunnskapsgraf-forstand. Instinktet
  er riktig; formen er bare ikke tatt helt ut.
- **QA som produktvern.** Regresjonstestene kjører den faktiske søkemotoren
  mot PRD-eksemplene. Få prototyper har dette.
- **Riktige ikke-mål.** Ingen database, ingen scraping, ingen fri AI i MVP var
  riktige kutt. Prototypen beviste det den skulle.

### Det som er galt

Kort versjon: **de fire entitetene er riktige, men bare to av dem er modellert
som entiteter.** Kategorier og merkevarer er data. Attributter er hardkodet i
typesystemet. Butikker er data, men alt annet om dem er denormalisert innmat.
Og den viktigste entiteten mangler helt (se §2.1).

---

## 2. De største svakhetene

### 2.1 Den manglende entiteten: ProductType (det brukeren vil kjøpe)

Brukeren søker ikke etter kategorier. Hun søker etter **ting**: «løpesko»,
«gaming-PC», «hundefôr», «serum». I dag er disse tingene modellert som
alias-strenger på 13 kategorier og ~25 «representative» underkategorier.
Det betyr:

- Vokabularet av kjøpbare ting – produktets viktigste søkeflate – er gjemt som
  strenglister uten identitet, uten relasjoner, uten regresjonsvern per begrep.
- «Løpesko» kan ikke ha egne butikk-koblinger, egen SEO-side eller egne
  synonymer. Den *er* bare en peker til sport-kategorien.
- Ved 500+ butikker er det produkttype-vokabularet (tusenvis av norske
  substantiv) som avgjør om søket føles smart eller dumt.

Dette er den dypeste modellfeilen. Kategoriene er en *navigasjonsvisning*;
produkttypene er *grafen*. (Google har en hel Product Taxonomy for akkurat
dette skillet.)

### 2.2 Attributter lever i typesystemet, ikke i datamodellen

`StoreAttributes` i [types.ts](../lib/types.ts) er en fast struktur. Å legge
til én attributt («returfrist», «Trustpilot-score», «leveringstid») krever i
dag endringer på **fire steder** som ikke kjenner hverandre:

1. Typen i `lib/types.ts`
2. Filter-predikatet i `data/attribute-definitions.ts`
3. Søkefrasene i `lib/search/intent.ts` (`ATTRIBUTE_PHRASES`)
4. Badge-logikken i `priorityBadges()`

Kategorier og merker fikk entitetsstatus; attributter fikk det ikke. Det er
inkonsistent, og det er den vedlikeholdskostnaden som først vil stoppe
datavekst. *(Adressert nå – se §6.)*

### 2.3 Denormalisert dobbeltbokføring som vil drifte

`Store` har `country`, `isNorwegian`, `shipsToNorway` som topp-felter **og**
som `FieldConfidence`-felter i `attributes.geography.*`. To sannhetskilder,
ingen konsistenssjekk. Tilsvarende: `StoreBrand` dupliserer merkenavnet i
hver butikk. Ved 30 butikker er dette irriterende; ved 5 000 er det datakorrupsjon
satt i system. *(Konsistenssjekk lagt inn nå; strukturell fiks i fase 2.)*

### 2.4 Alias-kunnskapen er spredt og har ingen felles hygiene

Aliaser finnes i fire regimer: kategorialiaser, merkealiaser, attributtfraser
og butikknavn (som ikke har aliaser i det hele tatt – søk på «elkjop» uten ø
traff ingenting). Stoppord-vernet gjaldt bare kategorialiaser. Det finnes ingen
kollisjonsdeteksjon på tvers («lego» er både merke og kategorialias – i dag
tilfeldigvis ufarlig, i morgen en stille feil). *(Adressert nå – se §6.)*

### 2.5 Ingen datainngang – alle leser rått

17 filer importerer `data/*.ts` direkte og filtrerer/sorterer inline
(kategorisider, relaterte butikker, bokstavlister, sitemap, søk). Det betyr at
«bytt lagringsform» – den ene migreringen vi *vet* kommer – berører hele
kodebasen. Det finnes ingen seam å bytte bak. *(Adressert nå – se §6.)*

### 2.6 Søket skanner, det slår ikke opp

Intent-parseren bygger regexer per alias per spørring (O(aliaser)), og
rankingen scorer **alle** butikker per søk (O(butikker)). Ved 30 butikker:
mikrosekunder. Ved 20 000 butikker og 50 000 leksikonfraser: fortsatt teknisk
overlevbart i minne, men arkitektonisk feil – retrieval skal gå fra
*forstått entitet* til *kandidatliste* via indeks, ikke via full skanning.
*(Kandidat-henting via postings lagt inn nå.)*

### 2.7 Skjørt uten fasit: refaktorering var utrygt

QA-en sjekket adferd på 8 søk, men ikke *hvilke butikker* som kom i hvilken
rekkefølge for et bredere batteri. Enhver omskriving av motoren kunne stille
endre resultater uten at noen så det. *(Golden-query-vern lagt inn nå.)*

---

## 3. Svar på de arkitektoniske spørsmålene

**Er dette egentlig en kunnskapsgraf?** Ja – og den later som den ikke er det.
Butikk—kategori-koblingen har relevans; butikk—merke-koblingen har relevans,
confidence, kilde og dato. Det *er* typede kanter med egenskaper. De er bare
begravd som innmat i butikk-objekter i stedet for å være førsteklasses.
Modellen bør erkjennes som det den er: **entiteter + typede, kildede kanter**.

**Hvordan ville Google modellert dette?** Som Knowledge Graph + Merchant
Center: en Merchant-entitet med strukturerte attributter (betalingsmetoder,
frakt, retur – Google har schema.org-typer for alt dette), en produkttaksonomi
brukeren søkes inn i, entity linking fra spørring til graf, og rangering =
relevans × kvalitetsprior (E-E-A-T). Dagens `matchScore` × baseline er faktisk
en miniatyr av dette – riktig instinkt. Gapet er entitetene (§2.1, §2.2) og
entity linking via ett leksikon (§2.4).

**Én modell for søk, filtrering, anbefalinger, interne lenker og SEO?**
Alt er grafspørringer: søk = entity linking + kant-traversering; filtrering =
kant-predikater; «relaterte butikker» = naboer i grafen; interne lenker =
kanter rendret som `<a>`; sitemap = entitetsenumerering; JSON-LD =
entitetsserialisering. Det krever bare at alle leser fra samme graf-API i
stedet for fra rå filer. Det er dét catalog-laget (§6) etablerer.

**Hvor bør AI brukes?** Der språk møter struktur, aldri der fakta produseres:

| Bruk AI | Aldri AI |
| --- | --- |
| Long-tail spørring → strukturert intent (fallback når leksikonet bommer) | Rangering |
| Ekstraksjon av attributter fra butikksider → *claims* med kilde, til review-kø | Trygghetsdommer («Er X trygt?») |
| Synonym-/aliasforslag (offline, inn i leksikonet etter QA) | Fakta i svar uten datagrunnlag |
| Utkast til redaksjonelt innhold (menneske publiserer) | Hva som kvalifiserer som treff |

Prinsippet fra PRD v0.3 generaliserer: **AI utvider forståelse og datafangst;
deterministikk avgjør sannhet og rangering.** En AI-parser skal returnere de
samme strukturerte entitetene som leksikonet – og treffer den ingen entiteter,
gjelder ærlighets-porten som før.

**Hva kollapser ved vekst?**

| Skala | Hva ryker først |
| --- | --- |
| 500 butikker | Håndvedlikehold av `stores.ts` (985 linjer for 30!). Trenger strukturert lagring + importverktøy. Kurasjon av aliaser per fil ryker → leksikon. |
| 5 000 | Redaksjonelt innhold per butikk (bestFor, beskrivelser) kan ikke skrives for hånd → AI-assistert pipeline med review. Ferskhet: `lastChecked` for hånd er umulig → freshness-SLA per attributtype + automatisk verifisering. Kategorisider uten paginering ryker. |
| 20 000 | **Ikke** compute – 20k entiteter er småtteri for en in-memory-indeks. Det som ryker er *tilliten*: uverifiserte data i skala gjør «ærlig veiviser» til løgn. Claims + kilder + verifiseringspipeline er ikke valgfritt lenger – det er produktet. |

**Hva angrer vi på om to år hvis vi ikke gjør noe?** I prioritert rekkefølge:
(1) attributter i typesystemet, (2) produkttyper som alias-strenger, (3) rå
dataimporter overalt, (4) dobbeltbokført geografi/tillit, (5) at claims ikke
har kilde-entitet. Alt annet – rammeverk, styling, ruting – er utskiftbart
uten anger.

---

## 4. Målarkitektur (3–5 år)

Fem lag. Pilene peker én vei.

```
┌──────────────────────────────────────────────────────────┐
│ 5. VISNINGER   nettsider · /api/search · SEO/JSON-LD ·   │
│                interne lenker · (senere: /svar/[slug])   │
├──────────────────────────────────────────────────────────┤
│ 4. SØK         entity linking (leksikon) → intent →      │
│                kandidat-retrieval (postings) →           │
│                deterministisk ranking → svarbygging      │
├──────────────────────────────────────────────────────────┤
│ 3. KATALOG     graf-API: entiteter, kanter, indekser.    │
│                Eneste lesevei. Kompilert snapshot.       │
├──────────────────────────────────────────────────────────┤
│ 2. GRAF        Store · Category · ProductType · Brand ·  │
│    (asseten)   Attribute · Claim(kilde,confidence,dato)  │
│                Kanter: sells, in_category, has_attribute,│
│                maps_to. Lagring: TS-filer nå → DB senere │
├──────────────────────────────────────────────────────────┤
│ 1. DATAOPS     import · AI-ekstraksjon → claims →        │
│                review-kø · freshness-SLA · QA-porter     │
└──────────────────────────────────────────────────────────┘
```

Nøkkelbeslutninger:

1. **ProductType blir egen entitet** med aliaser, koblet `maps_to` kategori/
   underkategori og (etter hvert) direkte `sold_by` butikker. Kategorier
   beholdes som navigasjon.
2. **Attribute er data, ikke type.** Ett register definerer nøkkel, label,
   søkefraser, badge og predikat. (Gjort – se §6.)
3. **Claim blir førsteklasses**: `{subjekt, predikat, verdi, kilde, confidence,
   sjekket}`. `FieldConfidence` er allerede 80 % av dette; det som mangler er
   kilde som entitet og en review-kø.
4. **Leksikonet er den eneste broen fra språk til graf.** Alle entitetstyper,
   én kollisjonspolitikk, ett stoppord-vern, diakritikk-folding. (Gjort.)
5. **Søk er en ren funksjon over et kompilert indeks-snapshot.** Ingen
   datalesing i request-path utover snapshotet. Det gjør backend-bytte
   (DB, ekstern indeks) usynlig for alt over lag 3.
6. **Lagring byttes bak katalog-laget** når datamengden krever det
   (~500 butikker): TS-filer → JSON + validering → Postgres. Ingen lag over
   3 skal merke det.

## 5. Migreringsplan

**Fase 0 – Grunnmur (nå, gjort i denne omgangen):** Se §6.

**Fase 1 – Datamodell-opprydding (før 100 butikker):**
- Fjern dobbeltbokføringen: topp-feltene `country`/`isNorwegian`/
  `shipsToNorway` blir deriverte gettere fra `attributes.geography` (eller
  omvendt – én kilde). Konsistens-QA-en fra fase 0 gjør dette trygt.
- `StoreBrand` slankes til `{slug, relevance, claim}` – navnet hentes fra
  merkeregisteret via katalogen.
- Kilde (`Source`) som egen liten entitet; `sourceUrl` på claims peker dit.

**Fase 2 – ProductType (GJORT 2026-07-02, se
[produkttype-modell.md](produkttype-modell.md)):**
- `data/product-types.ts` – underkategoriene løftet til et eget
  etterspørselsvokabular med kategorihjem, broader-pekere og merkekanter.
- Søk navngir produkttypen i svaret; profil- og kategorisider lenker
  grafen internt. QA: velformet vokabular + minst én butikk-vei per type.
- Gjenstår til fase 3: `sells`-kanten som egne rader med claim-metadata.

**Fase 3 – Datavekst (500+ butikker):**
- TS → JSON-datafiler med skjemavalidering (zod) bak katalogen.
- Importverktøy + AI-ekstraksjon som produserer claims til review-kø
  (`needsManualReview` finnes allerede som frø).
- Postgres når JSON-filene blir uhåndterlige – kun katalog-internt bytte.

**Fase 4 – Søk 2.0:**
- `/api/search` + instant-søk i UI (samme motor, ny transport).
- AI-fallback for uforståtte spørringer → strukturert intent → vanlig motor.
  Ærlighets-porten består: ingen entitet, intet svar.
- `/svar/[slug]`: kuraterte kanoniske svar som entiteter (PRD §14 «senere»).

**Hva som IKKE skal gjøres nå** (fristende, men galt): database, admin-UI,
embeddings, AI i spørringsflyten, `/api/search`, produkttype-migreringen.
Alle blir *lettere* av at fase 0 er gjort, og *dyrere* av å gjøres for tidlig.

## 6. Grunnmursendringer gjort nå (fase 0)

Alle med grønn QA, uendret UI og golden-vern:

1. **Golden-query regresjonsvern** – `scripts/golden-queries.json`
   (regenereres med `npm run golden`) + QA-sjekk: 23 spørringer med fasit
   for intent, forstått-flagg, antall treff og topp-3. Enhver stille
   resultatendring feiler bygget; bevisste endringer regenereres i samme
   commit med forklaring.
2. **Catalog-lag** (`lib/catalog.ts`) – eneste lesevei til entitetsgrafen:
   slug-oppslag, kategori-/merke-/filter-postings, relaterte butikker,
   kanonisk kategorisortering. QA håndhever importgrensen. Dette er seamen
   for fase 1–3. Konsistens-QA-en fant umiddelbart reell drift: Biltema og
   Synsam hadde `country: NO` på toppnivå men `SE` i attributtene, og UI-et
   viste selvmotsigende «Utenlandsk · Norge».
3. **Attributtregister** (`data/attribute-definitions.ts`) – én definisjon
   per attributt: nøkkel, label, filtergruppe, søkefraser, subsumering,
   badge, predikat. FILTERS, badges og intent-deteksjon genereres. Å legge
   til en attributt er nå én dataendring, ikke fire kodeendringer.
4. **Leksikon + entity linking** (`lib/search/lexicon.ts`) – alle søkbare
   entiteter i ett kompilert leksikon. Diakritikk-folding («elkjop» →
   Elkjøp) og aksent-transliterasjon («hundefôr» → «hundefor») med
   stoppord-vern (`lib/search/stopwords.ts`). Butikker fikk `searchAliases`.
   Intent-parseren tolker entity-linking-resultatet; den eier ikke lenger
   vokabular. QA sjekker at ingen leksikonfrase er et stoppord og at
   kryss-familie-kollisjoner står i en godkjent allowlist.
5. **Kandidat-retrieval via postings** – søket henter kandidater fra
   indeksen (matchede entiteter + filtre) i stedet for å skanne alle
   butikker. Golden-verifisert; riktig form for skala.
6. **Konsistens-QA** – topp-felter vs `attributes.geography`, merkenavn vs
   merkeregister. Drift-risikoen i §2.3 er nå en byggefeil.

**Bevis på at vernene virker:** under selve refaktoreringen gjorde den nye
transliterasjonen kategorialiaset «fôr» om til stoppordet «for». Stoppord-
sjekken slo alarm, og golden-baselinen viste samtidig at «beste nettbutikk
for løpesko» igjen matchet dyrebutikker (8 treff i stedet for 5) – nøyaktig
regresjonen PRD v0.3 §4 beskriver. Aliaset ble fjernet fra data; QA hindrer
at det kommer tilbake. To bevisste golden-diffs ble stående: «Er elkjop
trygt?» forstås nå, og «hundefôr» rangerer hundespesialisten Vom og Hundemat
foran generalisten Zooplus (underkategori-presisjon).
