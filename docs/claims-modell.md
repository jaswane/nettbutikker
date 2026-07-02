# Claims-modellen – analyse og beslutning

**Dato:** 2026-07-02 · **Status:** Vedtatt. Grunnmur i §7 implementert; selve
claim-loggen er bevisst utsatt (trigger-styrt, se §6).
**Bygger på:** [arkitektur-2026-07.md](arkitektur-2026-07.md) §4 pkt. 3 og
fase 3, [produkttype-modell.md](produkttype-modell.md) §2.

---

## 0. Den ærlige konklusjonen først

**Ikke bygg claim-loggen nå – og ikke fas ut FieldConfidence.** Analysen under
viser at et fullt claim-system består av to lag: en **skrivemodell** (loggen:
flere claims per fakta, kilder, konfliktløsning, review-kø) og en
**lesemodell** (den oppløste «gjeldende beste verdien» per fakta).
`FieldConfidence` *er* lesemodellen – det er de manglende 20 prosentene som
er skrivemodellen, og de har i dag **null produsenter**: eneste datakilde er
redaksjonen, som løser konflikter i hodet før hun skriver. En logg uten
konflikter, en review-kø uten innsendere og kilde-presedens med én kilde er
maskineri som ikke kan testes mot virkelighet – bare vedlikeholdes.

Men analysen avdekket noe viktigere: **claim-metadataene vi allerede har er
pynt.** Empirisk funn fra kodebasen i dag:

| Felt | Skrives | Leses av produktet |
| --- | --- | --- |
| `value` | overalt | søk, filtre, badges, profil |
| `confidence` | overalt | **ingen steder** (`jaFc` ignorerer den eksplisitt) |
| `lastChecked` (per claim) | overalt | **ingen steder** (kun butikk-nivået vises, 3 steder) |
| `sourceUrl` | sporadisk | **ingen steder** |
| `note` | sporadisk | **ingen steder** |

Vi samler proveniens ingen bruker. Det riktige grunnmursarbeidet nå er ikke å
lagre *mer* metadata – det er å gjøre metadataene vi har **funksjonelle**:
en uniform claims-lesevei og en ferskhets-SLA som gjør «sist kontrollert» til
maskineri i stedet for dekor. Det er implementert (§7). Resten er
trigger-styrt plan (§6).

## 1. Alle butikkfakta som claims

En claim er en kildet, datert, gradert påstand:

```
Claim = {
  subject:    entitet eller kant        (store:elkjop / store:elkjop→brand:apple)
  predicate:  hvilket fakta             (attr:vipps / sells_brand / in_category)
  value:      påstått verdi             (true / relevance:secondary / …)
  source:     hvor påstanden kommer fra (→ §2)
  confidence: hvor sikker kilden gjør oss (→ §3)
  checkedAt:  når den sist ble bekreftet  (→ §4)
  status:     resolved | pending | rejected | superseded
}
```

Kartlegging av dagens datamodell mot dette:

| Dagens felt | Claim-oversettelse |
| --- | --- |
| `attributes.*.*: FieldConfidence<T>` | oppløst claim: subject=butikk, predicate=attributt |
| `StoreBrand{relevance, confidence, lastChecked, sourceUrl}` | oppløst claim på kanten butikk→merke (samme konvolutt, inlinet) |
| `StoreCategoryRef{relevance}` | redaksjonell claim på kanten butikk→kategori (uten konvolutt) |
| `categories[].productType` | redaksjonell claim på sells-kanten (uten konvolutt) |
| `trustLevel`, `dataQuality`, `editorialScore` | **ikke claims** – redaksjonelle *dommer* (aggregater over claims), skal aldri komme fra automatikk |
| `shortDescription`, `bestFor`, `reviewSummary` | **ikke claims** – redaksjonelt innhold |
| `lastChecked` (butikk) | aggregat: eldste/siste kontrollrunde |
| `needsManualReview` | frøet til review-køen |

Viktig avgrensning: skillet claim/dom/innhold er selve vernet mot at
automatisert innsamling forgifter tilliten. En crawler kan foreslå
`attr:vipps=true`; den kan aldri sette `trustLevel`.

## 2. Kilder

Kilde blir egen entitet når loggen kommer:

```
Source = { id, type: "editorial" | "store_website" | "crawl" |
           "user_report" | "partner_feed", url?, name, retrievedAt }
```

Kontrakt **fra i dag** (dokumentert her, gjelder nåværende data):
`sourceUrl` satt = verifisert mot den adressen på `lastChecked`-datoen.
`sourceUrl` fraværende = redaksjonell vurdering. Det gjør dagens data
entydig oversettbar til kildede claims senere uten arkeologi.

## 3. Confidence

Confidence er **kildens og verifiseringens kvalitet**, ikke synsing. Skalaen
får definert semantikk (gjelder fra nå):

- `high` – bekreftet mot autoritativ kilde (butikkens egne sider/vilkår) på
  `lastChecked`-datoen.
- `medium` – redaksjonell kunnskap eller sekundærkilde; ikke direkte bekreftet.
- `low` – antagelse/utdatert kilde; bør re-verifiseres før den vektlegges.
- `unknown` – vet ikke; skal behandles som fravær av claim, aldri som «nei».

I loggen (fase 3) beregnes confidence av resolusjonen (kilde-type × alder ×
enighet mellom kilder); i dag settes den manuelt etter samme skala.

**Kjent, akseptert hull:** filtre og badges behandler i dag `low`-claims som
fakta («har Vipps»). Akseptabelt mens dataene er illustrative prototypdata
med global disclaimer; skal fikses når ekte data kommer – da skal
`low`-claims enten re-verifiseres eller vises med forbehold. Beslutningen om
*når* er knyttet til fase 3-triggeren (§6), og QA-ferskhetssjekken (§7)
sørger for at `low` ikke i tillegg blir *gammel* uten at bygget sier fra.

## 4. «Sist kontrollert» og ferskhet

Fakta råtner med ulik hastighet. Ferskhet blir SLA per claim-gruppe – og
SLA-brudd er **byggefeil**, ikke dashboard-støy (ærlighetsprinsippet fra PRD
v0.3: utdaterte påstander presentert som fakta er en produktfeil):

| Gruppe | SLA | Begrunnelse |
| --- | --- | --- |
| payments, shipping, commercial | 365 dager | endres med butikkens avtaler |
| trust (Trygg E-handel), brands | 540 dager | endres sjeldnere |
| geography (land, VOEC …) | ingen | strukturelle fakta |
| butikkens `lastChecked` | 365 dager | hele profilen skal ha en årlig runde |

At en QA-kjøring kan begynne å feile «av seg selv» åtte måneder frem i tid er
tilsiktet: det er re-verifiseringsalarmen. Utveien er å re-verifisere (ny
`lastChecked`), eller nedgradere confidence og notere hvorfor.

## 5. Motstridende claims, manuell + automatisk

Når loggen kommer (fase 3), er resolusjonen deterministisk – aldri AI:

1. **Kilde-presedens:** editorial > store_website > partner_feed > crawl >
   user_report. En redaksjonell claim slås bare av en automatisk hvis den
   redaksjonelle er *stale* (utenfor SLA) og den automatiske er fersk med
   høy kildekvalitet – og selv da bare via review-kø.
2. **Recency innen samme kildetype:** nyeste vinner.
3. **Uenige ferske kilder på samme nivå** → claimen får `pending`, feltet
   viser forrige oppløste verdi med senket confidence, og saken havner i
   review-køen (`needsManualReview` er dagens frø).
4. **Automatiske claims er alltid forslag:** de lander som `pending` og blir
   `resolved` av et menneske – med unntak av en eksplisitt allowlist av
   lavrisiko-predikater (f.eks. `freeShippingFrom`-beløp) som kan
   auto-aksepteres med `confidence: medium`.

Slik støttes manuell redaksjon (claims med source=editorial, akkurat som i
dag) og fremtidig innsamling (claims med source=crawl) av samme system, uten
at automatikken noensinne kan overskrive redaksjonen stille.

## 6. Samme system for alle entiteter – og hvorfor vi likevel venter

Claim-konvolutten er subjekt-agnostisk: butikk-attributter, butikk→merke,
butikk→produkttype (sells-kanten fra produkttype-modellen §2),
produkttype→merke – alle er `(subject, predicate, value)` + konvolutt.
Det er nettopp derfor loggen kan vente: **konvolutten er allerede felles**
(FieldConfidence), og alle lesninger går allerede gjennom katalog-seamen.
Migreringen til logg er dermed mekanisk når den trengs:

- **Påvirkning på søk/ranking:** ingen – søket leser den oppløste visningen
  (dagens shape) uansett; loggen lever bak katalogen.
- **Tillit/UI:** «sist kontrollert» per fakta og «slik vet vi dette»-visning
  blir mulig; dataQuality (A–D) kan på sikt *beregnes* fra claim-dekning og
  -ferskhet i stedet for å settes manuelt.
- **SEO:** ferskhetssignaler (ekte `lastModified` per profil) og
  troverdighetsinnhold; ingen nye sider.

**Svar på de tre spørsmålene:**

1. **Bør FieldConfidence fases ut?** Nei. Den *forfremmes*: fra «felt med
   metadata ingen leser» til dokumentert lesemodell-kontrakt for oppløste
   claims (semantikken i §2–§4). Navnet beholdes – PRD-en definerer det, og
   navnebytte er churn uten informasjon.
2. **Bør hele datamodellen bygges rundt claims?** Lesemodellen: ja – det er
   den allerede, minus kontrakten som nå er dokumentert. Skrivemodellen
   (loggen): nei, ikke som lagringsform i håndredigerte TS-filer. Én fakta =
   én oppløst claim er riktig lagring så lenge redaksjonen er eneste skriver.
3. **Riktig tidspunkt?** Nei – triggeren er **første automatiske datakilde
   eller andre uavhengige kilde** (fase 3), ikke en dato. Da finnes det
   konflikter å løse og innsendere til review-køen. Å bygge det før er å
   vedlikeholde maskineri som ikke kan testes mot virkelighet, og det gjør
   håndredigering (dagens eneste pipeline) tyngre akkurat når den trengs mest.

**Fordeler ved full claims-modell nå** (for balansens skyld): fremtidssikker
lagring fra dag én, ingen senere migrering, review-kø klar når crawleren
kommer. **Hvorfor det taper:** migreringen senere er mekanisk (samme
konvolutt, bak samme seam), mens kostnaden nå er konkret – tyngre datafiler,
resolusjonslogikk uten data å resolvere, og QA som tester tomme baner.

**Migreringsplan (trigger-styrt):**

- **T0 (nå, gjort):** kontrakten i dette dokumentet + grunnmuren i §7.
- **T1 (første crawler/ekstraktor):** claim-logg i DB bak katalogen
  (`claims`-tabell + `sources`), resolusjonsregler fra §5, review-kø-UI.
  Lesemodellen (og dermed alt over katalogen) er uendret.
- **T2 (flere kilder):** presedens-matrisen aktiveres fullt, konfliktrapport
  i QA, dataQuality beregnes fra claim-dekning/-ferskhet.

## 7. Grunnmur implementert nå

1. **Uniform claims-lesevei** (`lib/claims.ts`, re-eksportert fra katalogen):
   `storeClaims(store)` – alle claims for en butikk som én flat, typet liste
   (attributt-claims fra alle grupper + merkekantene). Dette er lese-seamen
   T1-loggen skal levere bak, og det QA og fremtidig tooling/eksport bruker.
2. **Ferskhets-SLA i QA:** hver claim måles mot gruppens SLA (§4);
   overskridelse feiler bygget med beskjed om hva som må re-verifiseres.
   Claims uten egen dato arver butikkens `lastChecked`. QA rapporterer også
   hvor mange claims som nærmer seg SLA (>80 %), så re-verifisering kan
   planlegges før alarmen går.
3. **Kontraktene i §2–§4 er normative fra nå:** sourceUrl-semantikk,
   confidence-skala, SLA-tabell. Dokumentert her; ingen datamigrering nødvendig
   (dagens verdier er allerede konsistente med skalaen).

Bevisst IKKE bygget: claim-logg, Source-entitet, resolusjonsmotor, review-kø,
confidence i rangering/filtre, per-fakta «sist kontrollert» i UI. Alt er
spesifisert over og venter på T1-triggeren.
