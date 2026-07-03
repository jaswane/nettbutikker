# Release-notat – første preview-deploy

**Dato:** 2026-07-03 · **Grunnlag:** pre-deploy-review av hele prosjektet.
`npm run check` grønn (lint + typecheck + 33 QA-sjekker + build).

## Klart

- **Søk i to nivåer:** instant-panel under søkefeltet (klient-side motor,
  ~2 ms; verifisert i produksjonsbygg) og kanonisk `/sok`-side. Konsistens
  panel↔side er verifisert og prop-synket.
- **Deterministisk søkemotor** med entity linking (kategori, produkttype,
  merke, butikk, attributt), diakritikk-folding, ærlighets-port og
  dekningsspråk («Vi har ikke dekning for X ennå» – aldri brukerskyld).
- **Målt søkekvalitet:** 100 % forståelse / 100 % ærlighet på panelet med
  136 realistiske spørringer; QA-gulv som kun kan skrus opp.
- **Tillitsmodell hele veien:** confidence-policy (low → «?», «Trolig ja»,
  halv ranking-uttelling; unknown → aldri fakta), graderte forklaringer som
  navngir det dataene vet, ferskhets-SLA som feiler bygget på råtne claims.
- **Butikkprofiler med beslutningsdata:** retur, leveringstid og betaling på
  alle 30 butikker (illustrative verdier, ærlig merket).
- **Affiliate ryddig:** `/go/[slug]`-redirect med `X-Robots-Tag: noindex,
  nofollow` (verifisert i prod), blokkert i robots, utenfor sitemap,
  `rel="nofollow sponsored noopener"` på alle utgående lenker, synlig
  merking med forklaring («påvirker aldri rangeringen»).
- **SEO-grunnlag:** canonical, sitemap, robots, JSON-LD; `/sok` med query er
  noindex.
- **Mobil:** ingen horisontal overflow på forside/søk/profil (prod-verifisert).
- **Regresjonsvern:** golden-baseline (23 søk), eval-gulv, 33 QA-sjekker,
  importgrenser, konsistens- og kollisjonssjekker.

## Bevisst ikke klart

- **Dataene er illustrative prototypdata** (PRD §7): attributter, retur- og
  leveringstider er ikke verifisert mot butikkene – derav bevisst mye
  «(ikke bekreftet)» i UI. Reell verifisering er fase 3.
- Ingen database, admin, scraping, claim-logg, analytics eller AI i
  spørringsflyten – trigger-styrt plan i docs/ (arkitektur fase 3–4).
- Ingen `/api/search`; instant-panelet kjører klient-side (riktig ved 30
  butikker, byttes bak samme komponent ved vekst).
- Redaksjonelt innhold (omtaler/pros/cons) finnes bare på et fåtall butikker.
- `/svar/[slug]`-sider, piltast-navigasjon i panelet, komponent-tester for
  panelet.

## Kjente risikoer

- **Hele katalogen ligger i klient-bundelen**, inkludert interne signaler
  (`editorialScore`, `needsManualReview`) og rankingvekter. Offentlig
  produktdata, men gjør kopiering triviell; flyttes bak API i fase 3.
- Prototypdata kan leses som fakta til tross for merking – disclaimer og
  datakvalitets-merking er vernet, men preview-publikum bør informeres.
- `/sok` SSR-er per spørring (280–540 ms målt lokalt) – akseptabelt som
  nivå 2, men verdt å følge med på hos hosting-leverandør.
- Golden/eval verner motoren, ikke React-adferden i instant-panelet
  (manuelt verifisert).

## Test manuelt etter deploy

1. **Instant-søk:** skriv «støvsuger» på forsiden – panel med svar innen
   ~200 ms; Enter gir full side med samme beste valg.
2. **Dekning:** søk «rosenkål» – skal gi «Vi har ikke dekning …», ikke feil.
3. **Affiliate:** klikk «Gå til Elkjøp» – havner på elkjop.no med
   `aff`/`utm`-parametre; sjekk at `view-source:/go/elkjop` ikke er
   indekserbar (302 + noindex-header).
4. **Mobil på ekte enhet:** forside → søk → profil; panel, tastatur-fokus og
   ingen sidescroll.
5. **SEO-hygiene:** `robots.txt` (Disallow /go/ og /api/), `sitemap.xml`
   (ingen /go), `view-source` på /sok?q=x → `noindex`.
6. **Profil:** Zalando → «Retur»-gruppen viser «100 dager (ikke bekreftet)»
   og affiliate-forklaringen under CTA.
7. Hastighet på ekte nett: førsteinntrykk på forsiden og tid til
   instant-panel på 4G.
