# Søkekvalitet – måling og vokabular-dekning

**Dato:** 2026-07-02 · **Status:** Vedtatt og implementert.
**Kontekst:** [arkitektur-2026-07.md](arkitektur-2026-07.md),
[produkttype-modell.md](produkttype-modell.md) steg 3.

## 1. Hvorfor dette er den viktigste flaskehalsen

Etter grunnmursarbeidet (katalog, produkttyper, claims, confidence-policy,
forklaringsmodell) satt produktet igjen med et paradoks: **en ærlig søkemotor
som ikke forstår norsk handlevokabular er ærlig om feil ting.** En stikkprøve
mot motoren viste at «vinterjakke», «støvsuger», «kjøleskap», «seng»,
«solkrem», «verktøy» – 17 av 17 helt vanlige kjøpesord – alle fikk «vi forsto
ikke helt hva du leter etter». Ærlighets-porten fungerer perfekt; vokabularet
bak den var for lite. Og viktigere: **vi hadde ingen måling av det.**
Golden-testene verner 23 kjente søk mot regresjon – de måler ikke dekning mot
den virkelige spørringsfordelingen.

For «Norges beste butikksøk» er spørringsforståelse selve produktet. Alt annet
(rangering, forklaringer, SEO) opererer nedstrøms av om vi i det hele tatt
forsto ordet.

## 2. Hvorfor de andre kandidatene ble valgt bort

- **Datainnsamling/claim-logg:** størst asset på sikt, men MVP-forbudt og
  trigger-styrt (claims-modell §6). Premature.
- **SEO / svarsider:** PRD-en sier eksplisitt «etter at søkeopplevelsen
  fungerer». Å sende trafikk til et søk som misforstår halvparten av ordene
  brenner tilliten sidene skulle bygge.
- **Ranking-finjustering:** presisjon er ikke feilbudsjettet nå – recall er.
  Ved 30 butikker er rangeringen god nok når matchingen først treffer.
- **UX/ytelse/DX:** ikke begrensningen; QA-infrastrukturen er allerede sterk.

Valget kombinerer to varige verdier: **målingen** (permanent infrastruktur som
gjør all fremtidig søkejobb – inkludert AI-fallback i fase 4 – målbar) og
**vokabularet** (produktets kjerne-asset, ren dataendring takket være
ProductType-grunnmuren).

## 3. Målemetoden

`scripts/eval-queries.json` er et panel på **134 realistiske norske
spørringer** – på tvers av alle 13 kategorier, entitetstyper (kategori,
produkttype, merke, butikk, attributt), diakritikk-løs skriving («kjoleskap»,
«stovsuger») og bevisst utenfor-domenet-spørringer («billige flybilletter»,
«strømpriser i dag»). Hver har en fasit for hva en handleveiviser *bør* gjøre.

To tall (npm run eval gir full gap-rapport):

- **Forståelse:** andel i-domenet-spørringer som forstås OG lenkes til riktige
  entiteter, med minst ett resultat (med mindre ærlig-tomt er riktig).
- **Ærlighet:** andel utenfor-domenet-spørringer som ærlig avvises. Denne skal
  alltid være 100 % – å «forstå» flybilletter er verre enn å avvise dem
  (PRD v0.3 §1).

QA håndhever **gulv som kun skrus oppover** (ratchet): vokabular-arbeid hever
gulvet i samme commit; ingen endring får senke det stille.

## 4. Resultat

| | Forståelse | Ærlighet |
| --- | --- | --- |
| Baseline (før vokabular-arbeid) | **45,5 %** | 100 % |
| Etter vokabular-utvidelsen | **100 %** | 100 % |

Baseline-tallet er den kvantifiserte flaskehalsen: over halvparten av vanlige
kjøpesord traff ærlighets-porten i stedet for et svar.

Utvidelsen (ren dataendring, ingen motor-endring):

- **11 nye produkttyper:** jakker, støvsuger, hvitevarer, kjøkkenapparater,
  senger og madrasser, grill, hagemaskiner, verktøy, mobiltilbehør,
  bilbarnesete, hårpleie – alle med kategorihjem som har butikker (QA-krav).
- **Aliaser på eksisterende vokabular:** vintersko/sandaler/barnesko (sko),
  sykkelhjelm (sykkel), solkrem (hudpleie), kattemat (katt), sommerdekk
  (dekk), skjermkort/tastatur (PC), byggeklosser/dukkehus (leker), m.fl.
- **Kategori-aliaser** for ord som hører hjemme på kategorinivå: sokker,
  genser, badetøy, yogamatte, fiskeutstyr, gardiner, deodorant, takboks,
  motorolje, sjokolade …
- **Merkevarer:** Garmin (med butikk-kanter, lav confidence per
  claims-konvensjonen), AirPods som Apple-alias.

Dokumenterte hull som bevisst IKKE ble «fikset» (ærlig avvisning er riktig):
«gavekort» (giftCard finnes i data, ikke søkbar ennå), «rask levering»
(leveringstid mangler som attributt), «er wish trygt» (butikk utenfor
datasettet).

## 5. Vedlikeholdsregelen

Nytt vokabular og nye eval-spørringer hører sammen: legger du til en
produkttype, legg samtidig spørringene som skal treffe den inn i panelet.
Panelet er syntetisk-men-realistisk til ekte søkelogger finnes (PRD §21);
når loggene kommer, mates de inn her og gulvene revurderes.
