# PRD v0.3 – Tillegg: Læring fra søkemotorarbeidet

**Status:** Vedtatt · **Dato:** 2026-07-02 · **Gjelder:** Nettbutikker.no MVP
**Bygger på:** PRD v0.2 – MVP Cut (dette dokumentet erstatter ikke v0.2, det
dokumenterer produktbeslutninger tatt under implementering og testing av
søkemotoren).

Dette er ikke tekniske detaljer, men produktkrav: brudd på punktene under er
en produktfeil, ikke en teknisk svakhet.

---

## 1. Aldri selvsikre anbefalinger uten reelt matchsignal

Nettbutikker.no skal **aldri** presentere en butikk som «beste valg» eller gi
en selvsikker anbefaling uten at søket ga et reelt matchsignal (butikk,
kategori, merkevare eller attributt gjenkjent i spørringen).

**Hvorfor:** Under utviklingen rangerte en tidlig versjon butikker på
omdømme alene når spørringen ikke ble forstått. Det ser ut som et svar, men
er i praksis en gjetning – og undergraver hele tillitsløftet i produktet.

**Konsekvens:** Uten matchsignal skal UI-et være ærlig om at søket ikke ble
forstått (se punkt 3), ikke vise en «beste valg»-blokk.

## 2. Kvalitetssignaler rangerer – de kvalifiserer ikke

Tillit (`trustLevel`), datakvalitet (`dataQuality`) og `editorialScore` kan
brukes til å **rangere** butikker som allerede er relevante treff, men skal
**aldri alene** kvalifisere en butikk som treff.

**Hvorfor:** Hvis kvalitetsbaseline teller med i selve kvalifiseringen, vil
en velrenommert butikk dukke opp som «treff» på søk den ikke har noe med å
gjøre. Match og kvalitet er to separate akser.

**Konsekvens:** Rangeringen holder matchscore og kvalitetsbaseline adskilt
(se `lib/search/ranking.ts`); kun matchscore avgjør om en butikk i det hele
tatt er med i resultatet.

## 3. «Forsto ikke søket» ≠ «fant ingen gode treff»

Søket skal skille tydelig mellom to ulike tomme utfall:

1. **Vi forsto ikke søket** – ingen entitet gjenkjent. Svaret skal si det
   ærlig og foreslå hvordan brukeren kan omformulere.
2. **Vi forsto søket, men fant ingen gode treff** – entiteten ble gjenkjent,
   men ingen butikk i datasettet matcher. Svaret skal bekrefte hva vi lette
   etter og si at vi ikke fant noe.

**Hvorfor:** De to tilstandene krever helt ulik respons fra brukeren
(omformulere vs. justere filtre/akseptere at vi mangler data), og å blande
dem gjør begge svarene mindre troverdige.

**Konsekvens:** Søkeresultatet bærer et eksplisitt `understood`-flagg som
UI-et må respektere.

## 4. Stoppord skal ikke være aliaser

Norske stoppord og vanlige småord («for», «med», «til», «og», «best» osv.)
skal ikke brukes som søkealiaser for kategorier, underkategorier eller andre
entiteter.

**Hvorfor:** Ett stoppord-alias forgifter resultatene stille: aliaset «for»
gjorde en gang at «beste nettbutikk for løpesko» matchet dyrebutikker.

**Konsekvens:** QA-en har en egen alias-hygienesjekk som feiler bygget hvis
et stoppord dukker opp som alias (`scripts/qa-checks.mjs`, sjekk 9).

## 5. Søkbare entiteter har regresjonsvern

Merkevarer, kategorier, attributter og butikker er alle søkbare entiteter i
produktet. Hver entitetstype skal ha regresjonstester som beviser at den
fortsatt er søkbar, og referanseintegritet mellom datafilene skal håndheves
(butikk → kategori, butikk → underkategori, butikk → merkevare).

**Hvorfor:** Datasettet vedlikeholdes for hånd. Uten regresjonsvern kan en
uskyldig dataendring gjøre en hel entitetstype usøkbar uten at noen merker
det før en bruker gjør det.

## 6. QA-regresjonstester for PRD-eksemplene er et produktkrav

Regresjonstestene som kjører PRD-ens eksempelsøk mot den faktiske søkemotoren
(«Er Temu trygt?», «Norske nettbutikker med Vipps», «Hvor kjøper jeg LEGO?»,
«Beste nettbutikk for løpesko» m.fl.) er en del av produktkravet – ikke en
teknisk nice-to-have.

**Hvorfor:** Eksempelsøkene i PRD-en *er* produktløftet. Hvis de slutter å
fungere, er produktet ødelagt uansett hvor grønn resten av byggpipelinen er.

**Konsekvens:** `npm run qa` (som inngår i `npm run check`) skal alltid
inkludere disse søketestene, og nye PRD-eksempler skal legges til som
regresjonstester når de vedtas.
