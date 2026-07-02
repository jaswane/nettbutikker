# Forklaringsmodellen – «Derfor»-tekstene i søket

**Dato:** 2026-07-02 · **Status:** Vedtatt og implementert.
**Kontekst:** [claims-modell.md](claims-modell.md) §8 (confidence),
[produkttype-modell.md](produkttype-modell.md) §4 (presisjon i språket).

## Analysen av det gamle

| Problem | Eksempel |
| --- | --- |
| Falsk abstraksjon | «Spesialisert på det du søker etter» – vi *visste* at det var løpesko. «Matcher 1 av filtrene dine» – vi visste at det var Vipps, og brukeren har aldri satt noe «filter». |
| Entitetstypene hørtes ikke | Kategori og produkttype delte to generiske setninger; attributter var en telling. Bare merkevaren ble navngitt («Fører LEGO»). |
| Usikkerhets-paradoks | Uverifiserte fakta ble navngitt («Kan ha Vipps»), verifiserte ble anonymisert til et tall. Motsatt av tillitsbyggende. |
| Rangering uforklart | Styrken som faktisk rangerer (primary/secondary-kanten) fantes i data, men hørtes ikke i teksten. |

## De fem reglene

1. **Navngi det dataene vet.** Produkttypen, kategorien, merket og attributtene
   nevnes ved navn. Aldri «det du søker etter», aldri «filtrene dine».
2. **Språket graderes etter kanten – aldri sterkere enn datagrunnlaget.**
   Primærkant + produkttype → «Spesialisert på løpesko»; sekundær →
   «Har også løpesko i sortimentet»; primærkategori → «Hovedområdet er …»;
   sekundær → «Dekker også …»; begrenset → «Har noe innen …». Merke:
   primær → «Stort utvalg av LEGO»; sekundær → «Fører LEGO»; begrenset →
   «Har noe fra LEGO». Slik *høres* rangeringen: brukeren ser hvorfor
   spesialisten står over generalisten uten at vi sammenlikner butikker.
3. **Det brukeren spurte om kommer først.** Match-grunner (kategori/
   produkttype → merke → attributter), deretter advarsler («Sender ikke til
   Norge», «Vær ekstra forsiktig – lav tillit»), til slutt kvalitet
   («Høy tillit»). UI-et viser maks 3 linjer – usikkerhet og advarsler skal
   aldri fortrenges av ros.
4. **Verifisert og uverifisert holdes adskilt, begge navngitt.**
   «Har Vipps og fri frakt» vs. «Kan ha Klarna – ikke bekreftet» (samme
   «?»-språk som badges, claims-modell §8). Maks 3 attributter navngis,
   deretter «m.m.» – ingen vegg av tekst ved mange treff.
5. **Ingen tall, scorer eller butikk-sammenlikninger.** «Rangert foran X
   fordi …» er falsk presisjon (scoren er en heuristikk) og skalerer ikke.
   Avvist bevisst.

Attributtenes setningsform styres av `reasonNoun` i attributtregisteret
(«fri frakt», «Vipps») – å legge til en attributt gir riktig forklaringstekst
samme sted som filter, badge og søkefraser. Alt er deterministisk fra
grafkantene; ingen generert tekst.

## Regresjonsvern

QA asserterer på ekte data: «Spesialisert på løpesko» for løpesko-søket,
«Stort utvalg av LEGO» for LEGO-søket, «Har Vipps» + «Norsk butikk» for
Vipps-søket, at «filtrene dine» aldri forekommer, og (syntetisk) at
uverifiserte attributter alltid får «ikke bekreftet»-linjen.
