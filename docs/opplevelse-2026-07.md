# Opplevelsesanalyse og målmodell for søk og profiler

**Dato:** 2026-07-03 · **Status:** Vedtatt; MVP-delene implementert (§5).
**Input:** manuell brukertesting av eier + gjennomgang av faktisk UI-adferd.
**Kontekst:** [sokekvalitet.md](sokekvalitet.md), [claims-modell.md](claims-modell.md) §8,
[forklaringsmodell.md](forklaringsmodell.md).

## 1. Den største opplevelsesflaskehalsen

**Avstanden mellom spørsmål og svar.** Motoren er en ren funksjon over den
statiske katalogen og svarer på ~2 ms – men opplevelsen gjemte det bak en
full sidenavigasjon per søk. Målt på produksjonsbygget: resultatsiden koster
280–540 ms serverrendring per spørring, pluss navigasjon og innlasting.
Produktløftet er «anbefalte nettbutikker på sekunder»; leveransemekanismen
var det som brøt løftet, ikke motoren. Alt annet i tilbakemeldingene
(profildybde, affiliate-tillit, dekningsspråk) er reelt, men hastighet er
det som avgjør om folk *kommer tilbake*.

## 2. Målmodell: søket har to nivåer

1. **Instant-svar (nivå 1):** panel under søkefeltet som svarer mens du
   skriver. Samme deterministiske motor, kjørt i nettleseren (katalogen er
   statisk og offentlig; ~20 kB ekstra JS – forsiden gikk fra ~105 til
   125 kB First Load). 90 ms bevisst debounce; målt input→panel 168 ms,
   motor 2,1 ms. Viser svaroverskriften, topp 3 butikker og «Se alle treff
   (N)». Dekningsspråket gjelder også her.
2. **Full resultatside (nivå 2):** kanonisk, deep-linkbar, SEO-indekserbar
   (uten query). Nås med Enter, «Søk» eller «Se alle treff». Uendret
   struktur: svar → beste valg → alternativer → forfin søket.

Én motor, to visninger – golden/eval verner begge. **Skaleringsseam:** ved
~500+ butikker byttes panelets kraftkilde til `/api/search` bak samme
komponent (transport-endring, ikke omskriving). Forsiden forblir
startskjerm; panelet legger seg over uten å flytte innholdet.

Bevisst IKKE bygget: piltast-navigasjon i panelet, prefetch-triks, chatbot.

## 3. Tomme, svake og utenfor-dekning-søk

Gammelt språk: «Vi forsto ikke helt hva du leter etter» – feil når brukeren
skriver et helt vanlig ord som «rosenkål». Det er *vår dekning* som slutter,
ikke brukerens klarhet. Nytt språk (begge nivåer):

- **Utenfor dekning:** «Vi har ikke dekning for «rosenkål» ennå.» + hva vi
  faktisk dekker + eksempler. Søket siteres alltid (avkortet ved 40 tegn).
- **Forstått, men tomt:** «Vi fant ingen butikker som passer helt» +
  filterjustering (uendret – dette skillet fantes allerede, PRD v0.3 §3).
- Gibberish og ekte ord behandles likt – å *gjette* at «rosenkål» er mat
  ville brutt ærlighetsprinsippet. Skillet er dokumentert dekning, ikke
  språkgjenkjenning.

## 4. Butikkprofiler: fra faktaark til kjøpsvurdering

Profilens jobb er å svare «bør jeg handle her – for dette behovet?».
Strukturen (dom → passer for/ikke for → praktiske vilkår → tillit) fantes;
det som manglet var **feltene som faktisk avgjør kjøp**. Nå i datamodellen
og på profilen: **returfrist, fri retur, leveringstid** – med
confidence-policyen automatisk på («100 dager (ikke bekreftet)»,
«Trolig ja»). Tillit vises fortsatt som tre rolige signaler (datakvalitet i
footer, trust-etikett, «?»-merking) – ingen nye visuelle lag.

**Datafelt som fortsatt mangler** (prioritert, til fase 3-innsamlingen):
fraktpris, kundeservicekanaler (telefon/chat), fysiske butikker (antall),
etablert år/organisasjonsnummer, Trustpilot-referanse (som claim med kilde),
prisnivå-indikasjon. Redaksjonelt: longDescription/reviewSummary/pros/cons
finnes bare på et fåtall butikker – innholdsjobb, ikke modelljobb.

## 5. Affiliate uten å virke kjøpt og betalt

Prinsipp: **provisjonen opplyses i samme åndedrag som løftet om at den ikke
påvirker noe.** Implementert: «annonselenke» er nå en lenket merking med
forklarende tittel (til /annonser-og-samarbeid), konsekvent i søkeresultat
og profil; profiler med affiliate får én rolig setning under CTA-en. Ranking
var allerede affiliate-fri (PRD §17) – nå sier UI-et det høyt.

## 6. Prioritert plan

| | Hva | Status |
| --- | --- | --- |
| P0 | Instant-svar, dekningsspråk | **Gjort** |
| P0 | Retur/levering som data + profil, affiliate-merking | **Gjort** |
| P1 | Analytics-hendelser uten persondata (PRD §21) → ekte spørringer inn i eval-panelet | Neste |
| P1 | Redaksjonelt innhold (reviewSummary/pros/cons) på alle 30 | Neste |
| P2 | `/api/search` som panel-kraftkilde, piltast-navigasjon, `/svar/[slug]` | Ved vekst |
| P2 | Fraktpris, kundeservice, Trustpilot som claims | Fase 3-innsamling |

## 7. Målt ytelse (produksjonsbygg, lokalt)

| Flate | Målt |
| --- | --- |
| Instant-panel | motor 2,1 ms · input→panel 168 ms (90 ms debounce) |
| /sok SSR per spørring | 280–540 ms (+ navigasjon) – dette var «tungheten» |
| Forside / profil / kategori | 56–130 ms (statisk) |
| Bundle-kost for klient-motor | ~20 kB (forsiden 125 kB First Load) |

«Første søk tregt, neste raskere» fra manuell testing var dev-serverens
on-demand-kompilering – finnes ikke i produksjon. Den reelle strukturelle
tregheten (SSR per søk) er nå utenfor kritisk sti for opplevelsen.
