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
