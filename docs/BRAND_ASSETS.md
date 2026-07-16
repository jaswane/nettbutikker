# Brand assets – butikklogoer

Regler (se også `lib/types.ts` → `StoreLogo`):

- Kun **offisielle** logoer fra butikkens eget nettsted, presseside eller mediebibliotek.
- Aldri tegn/gjenskap en logo, aldri hotlink – last ned en lokal kopi til `public/logos/`.
- Foretrekk SVG med transparent bakgrunn; vis med `object-fit: contain`.
- Sikkerhetssjekk SVG-er før bruk (ingen `<script>`, `foreignObject` eller eksterne referanser).
- Logoene tilhører butikkene. Bruken her er redaksjonell identifikasjon av omtalt butikk;
  fjern umiddelbart ved innsigelse fra rettighetshaver.

| Butikk | Fil | Kilde | Hentet | Merknad |
| --- | --- | --- | --- | --- |
| Lekekassen | `public/logos/lekekassen.svg` | Butikkens egen nettside (headerlogo), lekekassen.no – CDN: `d189539ycils2q.cloudfront.net/static/…/theme-frontend-lekekassen/nb_NO/images/logo.svg` | 2026-07-13 | Ren vektor, 260×67, transparent bakgrunn. Sikkerhetssjekket: ingen script/eksterne refs. |
| Komplett | `public/logos/komplett.svg` | Butikkens egen nettside (headerlogo): `komplett.no/logo/310/logo_b2c.svg` | 2026-07-14 | Ren vektor, 239×46.9, transparent bakgrunn (marineblå tekst + gult merke) → `background: "transparent"`. Sikkerhetssjekket: ingen script/eksterne refs. |
| Fjellsport | `public/logos/fjellsport.svg` | Butikkens egen nettside (headerlogo): `fjellsport.no/assets/contentful/…/fjellsport-logo-web.svg` | 2026-07-14 | Ren vektor, 185×39.6, transparent bakgrunn (mørk grå tekst + oransje) → `background: "transparent"`. Sikkerhetssjekket: ingen script/eksterne refs. |
| Apotek 1 | `public/logos/apotek-1.svg` | Butikkens egen nettside (headerlogo): `apotek1.no/assets/a1-logo-25.svg` | 2026-07-14 | Vektor, 727×112, med innebygd hvit bakgrunnsrect (grønn/mørkeblå figur) → `background: "light"`. Sikkerhetssjekket: ingen script/eksterne refs. |
| Elkjøp | `public/logos/elkjop.svg` | Butikkens egen nettside (headerlogo): `elkjop.no/assets_spa/images/logo_b2c_header_no.svg` | 2026-07-15 | Ren vektor, 459.5×165.7, transparent bakgrunn (mørkeblå tekst + grønt merke; kun interne xlink-refs) → `background: "transparent"`. Sikkerhetssjekket: ingen script/eksterne refs. |
| Temu | *(ingen – initial-fallback)* | Ikke funnet trygg offisiell fil: header-«logoen» på temu.com er en hvit plassholder-rect (ikke reell logo), og ingen offisiell presse-/merkevareside med nedlastbar fil ble funnet | 2026-07-15 | Beholder initial-fallback («T»-flis). Ikke hentet fra tredjepartskatalog, i tråd med reglene. |
| XXL | `public/logos/xxl.svg` | Butikkens egen nettside (headerlogo): `xxl.no/content/images/f248ca…-150x34.svg` | 2026-07-16 | Ren vektor, 150×34. Limegrønn «XXL» + hvit «Sport & Villmark»-tekst → krever mørk flate: `background: "dark"`. Sikkerhetssjekket: ingen script/eksterne refs. |
| Zalando | `public/logos/zalando.svg` | Butikkens egen nettside (inline header-SVG, `data-testid="zalando-logo"`) | 2026-07-16 | Ren vektor, 132×24, oransje symbol (#FF4C00) + svart ordmerke på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| Musti | `public/logos/musti.svg` | Butikkens eget mediedomene: `get.musti.media/shops/mno/resources/ftp/framework/logotypem.svg` | 2026-07-16 | Vektor 173.758×40 (viewBox lagt til med samme mål – filen manglet viewBox), grønn (#72BF44) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| Oda | `public/logos/oda.svg` | Butikkens egen nettside (inline header-SVG, aria-labelledby «oda-logo») | 2026-07-16 | Ren vektor, ordmerke uten fill (arver farge → rendres svart i img-kontekst, nær Odas mørke ordmerke) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| Jollyroom | `public/logos/jollyroom.svg` | Butikkens egen nettside (headerlogo `Jollyroom_logo_RGB.svg` fra jollyroom.no/storage/…) | 2026-07-16 | Ren vektor, 795.53×180.98, rosa (#e24585) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| VITA | `public/logos/vita.svg` | Butikkens egen nettside (inline header-SVG ved forsidelenken) | 2026-07-16 | Ren vektor, 433.5×169.9, mørk lilla (#3a1649) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| Blivakker | `public/logos/blivakker.svg` | Butikkens eget CDN: `cdn.blivakker.no/Media/content/SiteLogos/logo-bv.svg` | 2026-07-16 | Ren vektor, 1563.8×444, mørk grå (#25282A) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| H&M | `public/logos/hm.svg` | Butikkens egen nettside (inline header-SVG, aria-label «H&M») | 2026-07-16 | Ren vektor, 200×132, rød (#E50010) på transparent → `background: "transparent"`. Sikkerhetssjekket. |
| JYSK | `public/logos/jysk.svg` | Butikkens egen nettside: `jysk.no/themes/custom/jysk_bootstrap/icons/static/jysk-logo.svg` | 2026-07-16 | Ren vektor, 69×32, blå flate (#143c8a) med hvit tekst (selvbærende) → `background: "transparent"`. Sikkerhetssjekket. |
| Bohus | `public/logos/bohus.svg` | Butikkens egen nettside: `bohus.no/logo-5Lz.svg` | 2026-07-16 | Ren vektor, 123×35, hvit tekst → krever mørk flate: `background: "dark"`. Sikkerhetssjekket. |
