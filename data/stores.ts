import type { Confidence, FieldConfidence, Store } from "@/lib/types";

/**
 * 30 demo stores for the MVP prototype (PRD §7).
 *
 * ⚠️  DATA QUALITY NOTE
 * This is illustrative seed data for a prototype. Attributes are guidance only,
 * marked with `dataQuality` and `lastChecked`, and may be incomplete or
 * outdated. We deliberately use cautious/fictional values where unsure rather
 * than asserting fresh details. Always verify with the store before relying on
 * payment, shipping or VOEC status.
 */

const CHECKED = "2026-06-24";

/** Concise FieldConfidence builder. */
function fc<T>(
  value: T,
  confidence: Confidence = "medium",
  lastChecked: string = CHECKED,
): FieldConfidence<T> {
  return { value, confidence, lastChecked };
}

export const stores: Store[] = [
  // ───────────────────────── Elektronikk, data og gaming ─────────────────────
  {
    id: "elkjop",
    name: "Elkjøp",
    slug: "elkjop",
    websiteUrl: "https://www.elkjop.no",
    affiliateSlug: "elkjop",
    logo: { src: "/logos/elkjop.svg", alt: "Elkjøp", background: "transparent" },
    shortDescription:
      "Norges store elektronikkjede med alt fra mobil og PC til hvitevarer, og butikker for klikk og hent.",
    longDescription:
      "Elkjøp er en norsk elektronikkjede drevet av Elkjøp Norge AS, med nettbutikk og varehus over hele landet. Sortimentet dekker mobil, PC, TV, lyd, gaming, hvitevarer og smarte hjem-produkter, med gratis klikk og hent i varehus og 50 dagers åpent kjøp. Deler av utvalget selges av eksterne partnere via Elkjøp Marketplace, med egne vilkår. Butikken passer best for deg som vil kombinere netthandel med varehus i nærheten.",
    descriptionSections: [
      {
        heading: "Hva selger Elkjøp?",
        paragraphs: [
          "Elkjøp selger elektronikk og hvitevarer: mobiler, PC-er, TV-er, lydprodukter, gaming, smarte hjem-produkter, kjøkkenutstyr og storelektronikk. Kjeden omtaler seg som Nordens største elektronikkjede og fører merkevarer som Apple, Samsung, Dyson og Garmin med egne merkesider.",
          "Deler av utvalget på nettsiden selges gjennom Elkjøp Marketplace, der eksterne partnere er selger. Ved slike kjøp inngår du avtale direkte med partneren, og det fremgår av produktsiden, handlekurven og ordrebekreftelsen hvem som selger varen. Marketplace-kjøp følger partnerens vilkår: faktura og klikk og hent tilbys ikke, og Elkjøps åpent kjøp-ordning gjelder ikke.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Elkjøp passer for deg som vil kombinere netthandel med fysiske varehus – enten du henter varen selv etter en time, vil se produktet før kjøp, eller trenger hjemlevering og innbæring av hvitevarer. Tjenester som installasjon, montering og gratis resirkulering av gamle produkter i varehus er dokumenterte tilleggstilbud.",
          "Er du ute etter smale nisjeprodukter eller spesialisert rådgivning innen ett segment, kan spesialistbutikker passe bedre.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "I nettbutikken kan du betale med Visa, Mastercard og American Express, Vipps, Apple Pay, Trustly og Elkjøp-gavekort. Faktura tilbys via Klarna og finansiering via Avida – faktura kan ikke brukes ved kjøp fra Marketplace-partnere. Du må være 18 år for å handle på nettsiden.",
          "Klikk og hent er gratis: varer på lager i valgt varehus kan hentes innen én time, og varer uten lokal lagerstatus sendes kostnadsfritt til varehuset. Postpakker har fri frakt over 3000 kroner; under grensen koster hentested fra 59 kroner (prioritert fra 89), levering på døren fra 149 kroner og småvarer 79 kroner. Storvarer leveres uten innbæring fra 0 kroner over 3000 kroner i utvalgte postnummer, eller med innbæring fra 849 kroner. Leveringstiden er oppgitt til 2–7 dager for post på døren og lenger til hentested. Elkjøp leverer ikke til utlandet.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Elkjøp gir 50 dagers åpent kjøp på de fleste varer, forutsatt at produktet returneres i samme stand. Retur i varehus er gratis; retur per post eller henting hos deg krever at du dekker fraktkostnaden. Unntak fra åpent kjøp gjelder blant annet mobiler med brutt emballasje, programvare, hygieneprodukter og Marketplace-kjøp, som følger partnerens vilkår.",
          "Den lovfestede angreretten er 14 dager, med returfrakt betalt av kunden. Reklamasjonsretten følger forbrukerkjøpsloven: to år, eller fem år for varer ment å vare vesentlig lenger. Prismatch tilbys mot Komplett, NetOnNet, Skousen og Power i kjøpsøyeblikket, men ikke på outlet-, demo- eller Marketplace-varer.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om varen selges av Elkjøp eller en Marketplace-partner – vilkårene for betaling, retur og åpent kjøp er forskjellige. Kontroller om ordren når fri frakt-grensen på 3000 kroner, og husk at retur per post koster frakt selv under åpent kjøp.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Elkjøp før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Elkjøp – Kjøpsvilkår",
        url: "https://www.elkjop.no/kundeservice/kjopsvilkar",
        checkedAt: "2026-07-15",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Elkjøp – Frakt og levering",
        url: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt",
        checkedAt: "2026-07-15",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "Elkjøp – Betalingsløsninger",
        url: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger",
        checkedAt: "2026-07-15",
        supports: ["payments"],
      },
      {
        label: "Elkjøp – Prismatch",
        url: "https://www.elkjop.no/kundeservice/prismatch",
        checkedAt: "2026-07-15",
        supports: ["priceMatch"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk elektronikkjede med gratis klikk og hent innen én time, 50 dagers åpent kjøp og bredt betalingsutvalg. Vær oppmerksom på at Marketplace-kjøp fra partnere følger egne vilkår, og at fri frakt først gjelder over 3000 kroner.",
    editorialPros: [
      "Gratis klikk og hent, klar innen 1 time ved lagervare",
      "50 dagers åpent kjøp med gratis retur i varehus",
      "Bredt betalingsutvalg: Vipps, Klarna, Apple Pay, Amex",
      "Prismatch mot Komplett, NetOnNet, Skousen og Power",
      "Varehus i hele landet med installasjons- og resirkuleringstjenester",
    ],
    editorialCons: [
      "Fri frakt for postpakker først over 3000 kr",
      "Marketplace-kjøp har egne vilkår – uten faktura, klikk og hent og åpent kjøp",
      "Returfrakt per post betales av kunden",
    ],
    bestFor: ["Hvitevarer og storelektronikk", "Klikk og hent samme dag", "Trygg norsk kjede"],
    notBestFor: ["Smale nisjeprodukter"],
    categories: [
      { main: "elektronikk-data-gaming", productType: "lyd-bilde", relevance: "primary" },
      { main: "hjem-interior-hage", relevance: "secondary" },
    ],
    brands: [
      { name: "Apple", slug: "apple", relevance: "secondary", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/brand/apple" },
      { name: "Samsung", slug: "samsung", relevance: "secondary", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/brand/samsung" },
      { name: "Dyson", slug: "dyson", relevance: "limited", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/brand/dyson" },
      { name: "Garmin", slug: "garmin", relevance: "limited", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/brand/garmin" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger", note: "Faktura via Klarna; finansiering via Avida. Ikke ved Marketplace-kjøp" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
        amex: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
      },
      shipping: {
        deliveryDays: { value: 4, confidence: "medium", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt", note: "Oppgitt 2–7 dager post på døren; klikk og hent innen 1 time ved lagervare" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt" },
        freeShippingFrom: { value: 3000, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt", note: "Gjelder postpakker (standard) og storvarer uten innbæring i utvalgte postnummer" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt", note: "Fra 149 kr; storvarer med innbæring fra 849 kr; ekspress kveld i utvalgte områder" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt", note: "Gratis; klar innen 1 time ved lagervare i valgt varehus" },
      },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {
        priceMatch: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/prismatch", note: "Mot Komplett, NetOnNet, Skousen og Power; ikke outlet/demo/Marketplace" },
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/tjenester-og-tilbehor/tjenester/betaling/betalingslosninger" },
      },
      returns: {
        returnWindowDays: { value: 50, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/kjopsvilkar", note: "50 dagers åpent kjøp (lovfestet angrerett 14 dager); unntak for enkelte varegrupper og Marketplace" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/kjopsvilkar", note: "Gratis retur i varehus under åpent kjøp; per post/henting dekkes frakten av kunden" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 88,
    lastChecked: "2026-07-15",
  },
  {
    id: "power",
    name: "Power",
    slug: "power",
    websiteUrl: "https://www.power.no",
    affiliateSlug: "power",
    shortDescription:
      "Stor norsk elektronikkjede kjent for kampanjer og bredt utvalg innen TV, mobil, PC og hvitevarer.",
    bestFor: ["Kampanjepriser", "Bredt utvalg elektronikk", "Klikk og hent"],
    notBestFor: ["Spesialisert gaming-rådgivning"],
    categories: [{ main: "elektronikk-data-gaming", relevance: "primary" }],
    brands: [
      { name: "Samsung", slug: "samsung", relevance: "secondary", confidence: "medium", lastChecked: CHECKED },
      { name: "Sony", slug: "sony", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(2, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(500), homeDelivery: fc(true), clickAndCollect: fc(true, "high") },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { priceMatch: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 84,
    lastChecked: CHECKED,
  },
  {
    id: "komplett",
    name: "Komplett",
    slug: "komplett",
    websiteUrl: "https://www.komplett.no",
    affiliateSlug: "komplett",
    logo: { src: "/logos/komplett.svg", alt: "Komplett", background: "transparent" },
    shortDescription:
      "Norsk nettbutikk med stort utvalg innen PC, komponenter, gaming og elektronikk – populær for egenbygg.",
    longDescription:
      "Komplett er en norsk nettbutikk for elektronikk, drevet av Komplett Services AS med lager i Sandefjord. Sortimentet spenner fra PC-er, komponenter og gamingutstyr til mobil, TV, lyd og hvitevarer, med fri frakt over 1500 kroner og 60 dagers åpent kjøp med gratis retur. Butikken passer best for deg som handler data og elektronikk på nett – den har ingen fysiske butikker.",
    descriptionSections: [
      {
        heading: "Hva selger Komplett?",
        paragraphs: [
          "Komplett selger elektronikk på nett: PC-er, datakomponenter, gamingutstyr, mobiler, TV-er, lydprodukter, smarte hjem-produkter, kjøkkenutstyr og hvitevarer. Butikken har levert elektronikk til norske hjem siden 1996 og omtaler seg som Norges største nettbutikk.",
          "Sortimentet dekker kjente merkevarer som Apple og Samsung, med egne merkesider for begge. Alle varer sendes fra eget lager i Sandefjord, og selskapet tilbyr også innbytte av brukt elektronikk mot prisavslag eller gavekort.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Komplett passer først og fremst for deg som handler datautstyr og elektronikk på nett – fra ferdige gaming-PC-er og komponenter til egenbygg, til mobil, TV og hvitevarer.",
          "Butikken har ingen fysiske butikker. Vil du se og prøve varene før kjøp, må du velge en kjede med varehus – hos Komplett er alternativet et gratis Pick-up-Point ved lageret i Sandefjord.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med bank- eller kredittkort, Vipps, faktura eller kjøpsfinansiering. Faktura og delbetaling leveres av Walley eller Komplett selv, og finansieringsordningen Flex av Resurs Bank – Komplett tilbyr ikke Klarna. Er du under 18 år, kan du bare betale med eget bankkort.",
          "Frakten er gratis på ordre over 1500 kroner, og medlemmer av kundeklubben Komplett Club har alltid fri frakt. Under grensen koster pakke til hentested 59 kroner, postkasselevering 39 kroner og hjemlevering 159 kroner. I flere storbyer tilbys ekspresslevering samme eller neste kveld med Porterbuddy fra 79 kroner. Generell leveringstid er oppgitt til 1–5 dager, og butikken leverer til Fastlands-Norge og Svalbard.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Komplett gir 60 dagers åpent kjøp med gratis retur, godt utover den lovfestede angreretten på 14 dager. Enkelte varegrupper har unntak: ferdigbygde Komplett-PC-er med brutt emballasje, varer kjøpt med Flex, åpnede CD- og DVD-plater, elektroniske lisenser og åpnede hygieneprodukter har kortere eller ingen åpent kjøp-periode.",
          "Ved godkjente reklamasjoner dekker Komplett returfrakten. Reklamasjonsretten følger forbrukerkjøpsloven: to år, eller fem år for varer som er ment å vare vesentlig lenger.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om ordren din når fri frakt-grensen på 1500 kroner, og vær oppmerksom på unntakene fra åpent kjøp hvis du kjøper ferdigbygd PC, programvare eller hygieneprodukter. Uavhentede pakker belastes med gebyr.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Komplett før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Komplett – Salgsbetingelser forbruker",
        url: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/",
        checkedAt: "2026-07-14",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Komplett – Frakt og levering",
        url: "https://www.komplett.no/kundeservice/frakt-og-levering/",
        checkedAt: "2026-07-14",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "Komplett – Om oss",
        url: "https://www.komplett.no/kundeservice/om-komplett/om-oss/",
        checkedAt: "2026-07-14",
        supports: ["company", "productRange", "returns", "priceMatch"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Etablert norsk elektronikkbutikk med bredt utvalg innen PC og gaming, 60 dagers åpent kjøp med gratis retur og fri frakt over 1500 kroner. Vær oppmerksom på at Klarna ikke tilbys, og at unntak gjelder fra åpent kjøp for enkelte varegrupper.",
    editorialPros: [
      "60 dagers åpent kjøp med gratis retur",
      "Fri frakt over 1500 kr – alltid for Komplett Club-medlemmer",
      "Stort utvalg PC, komponenter og gaming",
      "Prismatch-garanti",
      "Ekspresslevering i flere storbyer",
    ],
    editorialCons: [
      "Tilbyr ikke Klarna – faktura via Walley eller Komplett",
      "Frakt koster under 1500 kr for ikke-medlemmer",
      "Ingen fysiske butikker (kun Pick-up-Point i Sandefjord)",
    ],
    bestFor: ["Gaming-PC og komponenter", "Bredt PC-utvalg", "Bygg din egen maskin"],
    notBestFor: ["Fysisk butikkopplevelse"],
    categories: [
      { main: "elektronikk-data-gaming", productType: "pc-data", relevance: "primary" },
    ],
    brands: [
      { name: "Apple", slug: "apple", relevance: "secondary", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/brand/Apple" },
      { name: "Samsung", slug: "samsung", relevance: "secondary", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/brand/Samsung" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/" },
        klarna: { value: false, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/", note: "Faktura/delbetaling via Walley og Komplett, finansiering via Resurs (Flex) – ikke Klarna" },
        paypal: { value: false, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/" },
      },
      shipping: {
        deliveryDays: { value: 3, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/om-oss/", note: "Oppgitt 1–5 dager fra eget lager i Sandefjord" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/frakt-og-levering/" },
        freeShippingFrom: { value: 1500, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/frakt-og-levering/", note: "Komplett Club-medlemmer har alltid fri frakt" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/frakt-og-levering/", note: "159 kr under 1500 kr; Porterbuddy-ekspress i storbyer fra 79 kr" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/frakt-og-levering/", note: "Gratis Pick-up-Point ved lageret i Sandefjord" },
      },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {
        priceMatch: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/om-oss/" },
      },
      returns: {
        returnWindowDays: { value: 60, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/om-oss/", note: "60 dagers åpent kjøp (lovfestet angrerett 14 dager); unntak for enkelte varegrupper" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/om-oss/" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 86,
    lastChecked: "2026-07-14",
  },
  {
    id: "multicom",
    name: "Multicom",
    slug: "multicom",
    websiteUrl: "https://www.multicom.no",
    shortDescription:
      "Norsk spesialist på gaming-PC, bærbare maskiner og datakomponenter med fokus på ytelse.",
    bestFor: ["Gaming-PC", "Bærbare gaming-maskiner", "Komponenter til egenbygg"],
    notBestFor: ["Hvitevarer og generell elektronikk"],
    categories: [{ main: "elektronikk-data-gaming", productType: "pc-data", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "low"), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("paid"), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 72,
    lastChecked: "2026-05-12",
    needsManualReview: true,
  },

  // ───────────────────────── Klær, sko og mote ───────────────────────────────
  {
    id: "zalando",
    name: "Zalando",
    slug: "zalando",
    websiteUrl: "https://www.zalando.no",
    affiliateSlug: "zalando",
    shortDescription:
      "En av Europas største motebutikker med enormt utvalg klær, sko og merkevarer. Utenlandsk aktør.",
    bestFor: ["Stort merkevareutvalg", "Mote og sko", "Lange returfrister"],
    notBestFor: ["De som vil støtte norsk butikk", "Rask levering fra norsk lager"],
    categories: [
      { main: "klaer-sko-mote", relevance: "primary" },
      { main: "sport-friluft-trening", relevance: "secondary" },
      { main: "utenlandske-nettbutikker", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
      { name: "Adidas", slug: "adidas", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
      { name: "New Balance", slug: "new-balance", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "Levi's", slug: "levis", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "DE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { klarna: fc(true, "high"), paypal: fc(true), vipps: fc(false, "medium") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("free"), homeDelivery: fc(true, "high") },
      geography: { country: fc("DE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "medium") },
      commercial: { outlet: fc(true, "low") },
      returns: { returnWindowDays: fc(100, "low"), freeReturns: fc(true, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 83,
    notes: ["Utenlandsk aktør – sjekk levering, retur og eventuell VOEC/avgift."],
    lastChecked: CHECKED,
  },
  {
    id: "xxl",
    name: "XXL",
    slug: "xxl",
    websiteUrl: "https://www.xxl.no",
    affiliateSlug: "xxl",
    shortDescription:
      "Stor norsk sportskjede med bredt utvalg innen trening, sport, friluft og sko – ofte kampanjer.",
    bestFor: ["Pris og kampanjer", "Bredt sportsutvalg", "Klikk og hent i butikk"],
    notBestFor: ["Smal teknisk friluftsnisje"],
    categories: [
      { main: "sport-friluft-trening", relevance: "primary" },
      { main: "klaer-sko-mote", productType: "sko", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
      { name: "Adidas", slug: "adidas", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
      { name: "Asics", slug: "asics", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "Garmin", slug: "garmin", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(999, "low"), clickAndCollect: fc(true, "high"), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { outlet: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 82,
    lastChecked: CHECKED,
  },
  {
    id: "boozt",
    name: "Boozt",
    slug: "boozt",
    websiteUrl: "https://www.boozt.com/no",
    affiliateSlug: "boozt",
    shortDescription:
      "Nordisk motebutikk med kuratert utvalg klær og sko fra kjente merker. Svensk aktør.",
    bestFor: ["Kuratert merkevaremote", "Rask nordisk levering"],
    notBestFor: ["Billigste budsjettkjøp"],
    categories: [
      { main: "klaer-sko-mote", relevance: "primary" },
      { main: "utenlandske-nettbutikker", relevance: "limited" },
    ],
    brands: [
      { name: "Levi's", slug: "levis", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "Adidas", slug: "adidas", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { klarna: fc(true, "high"), vipps: fc(true, "low") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(700, "low"), homeDelivery: fc(true) },
      geography: { country: fc("SE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(true, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 74,
    lastChecked: "2026-05-20",
  },
  {
    id: "hm",
    name: "H&M",
    slug: "hm",
    searchAliases: ["hm", "h og m", "hennes og mauritz"],
    websiteUrl: "https://www2.hm.com/no_no",
    shortDescription:
      "Internasjonal motekjede med rimelige basisplagg og trendklær for hele familien.",
    bestFor: ["Rimelige basisplagg", "Trendmote", "Klær til hele familien"],
    notBestFor: ["Premium kvalitet og holdbarhet"],
    categories: [{ main: "klaer-sko-mote", relevance: "primary" }],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { klarna: fc(true), vipps: fc(true, "low") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(500, "low"), clickAndCollect: fc(true, "low") },
      geography: { country: fc("SE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 71,
    lastChecked: "2026-05-02",
  },

  // ───────────────────────── Sport, friluft og trening ───────────────────────
  {
    id: "sport-1",
    name: "Sport 1",
    searchAliases: ["sport1"],
    slug: "sport-1",
    websiteUrl: "https://www.sport1.no",
    affiliateSlug: "sport-1",
    shortDescription:
      "Norsk sportskjede med kjent utvalg innen sko, sport og friluft, og lokale butikker over hele landet.",
    bestFor: ["Norsk sportsbutikk med kjent utvalg", "Løpesko og treningssko", "Lokal kundeservice"],
    notBestFor: ["Lavest mulig pris"],
    categories: [
      { main: "sport-friluft-trening", productType: "lopesko", relevance: "primary" },
      { main: "klaer-sko-mote", productType: "sko", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "Asics", slug: "asics", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "New Balance", slug: "new-balance", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(999, "low"), clickAndCollect: fc(true), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 80,
    lastChecked: CHECKED,
  },
  {
    id: "milrab",
    name: "Milrab",
    slug: "milrab",
    websiteUrl: "https://www.milrab.no",
    affiliateSlug: "milrab",
    shortDescription:
      "Norsk nettbutikk for friluft, jakt, militært og turutstyr med bredt utvalg til tur og uteliv.",
    bestFor: ["Turutstyr og friluft", "Robuste produkter", "Jakt og uteliv"],
    notBestFor: ["Mote og bylivsklær"],
    categories: [{ main: "sport-friluft-trening", productType: "friluft", relevance: "primary" }],
    brands: [
      { name: "Patagonia", slug: "patagonia", relevance: "limited", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(2, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(999, "low"), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { outlet: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 78,
    lastChecked: CHECKED,
  },
  {
    id: "fjellsport",
    name: "Fjellsport",
    slug: "fjellsport",
    websiteUrl: "https://www.fjellsport.no",
    affiliateSlug: "fjellsport",
    logo: { src: "/logos/fjellsport.svg", alt: "Fjellsport", background: "transparent" },
    shortDescription:
      "Norsk spesialist på teknisk friluftsutstyr og kvalitetsmerker for fjell, tur og ski.",
    longDescription:
      "Fjellsport er en norsk nettbutikk for friluftsutstyr, drevet av Fjellsport AS med hovedkontor og lager i Sandefjord. Sortimentet dekker klær, sko, sekker og turutstyr fra kjente kvalitetsmerker, med fri frakt over 1200 kroner, 100 dagers åpent kjøp og gratis retur. Butikken passer best for deg som skal ha utstyr til fjell, tur og ski – den er ikke en generell sportsbutikk for lagidrett.",
    descriptionSections: [
      {
        heading: "Hva selger Fjellsport?",
        paragraphs: [
          "Fjellsport selger friluftsutstyr på nett: klær og sko til dame, herre og barn, sekker, telt, soveposer og annet turutstyr tilpasset skandinavisk klima. Butikken fører kjente merkevarer som Norrøna og Patagonia, og har egen outlet med nedsatte varer.",
          "Selskapet ble grunnlagt i 2010, har rundt hundre ansatte og drives fra Sandefjord, der både administrasjon og lager holder til. Siden 2022 har Fjellsport vært eid av danske Egmont-stiftelsen gjennom Outnordic Invest AB, og jakt- og fiskebutikken Skittfiske er en del av samme miljø.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Fjellsport passer for deg som skal ha utstyr til fjelltur, ski, klatring eller friluftsliv, og som leter etter tekniske kvalitetsmerker. Den lange åpent kjøp-perioden gjør butikken praktisk når du er usikker på størrelse eller modell.",
          "Butikken er mindre aktuell for lagidrett, treningsapparater og generelt sportsutstyr utenfor friluftssegmentet.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Vipps, kort (Visa og Mastercard) eller faktura og delbetaling via Avarda – Klarna tilbys ikke. Gavekort kan også brukes som betalingsmiddel.",
          "Frakten er gratis på ordre over 1200 kroner for de rimeligste fraktvalgene. Under grensen koster postkasselevering og pakkeboks 59 kroner, post i butikk 69 kroner og hjemlevering 199 kroner. I flere storbyer tilbys ekspresslevering med Porterbuddy. Du kan også hente bestillingen gratis ved lageret i Sandefjord, normalt klar etter én til tre timer. Butikken leverer i hele Norge; sendinger til Svalbard har eget frakttillegg, og Jan Mayen dekkes ikke.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Fjellsport gir 100 dagers åpent kjøp fra du mottar varen, forutsatt at den kan selges som ny med alle merkelapper intakt. Returen er gratis: du oppretter returlapp på nett og leverer pakken hos Posten uten kostnad, eller leverer den ved lageret i Sandefjord.",
          "Den lovfestede angreretten på 14 dager gjelder i tillegg, og refusjon skjer til samme betalingsmiddel etter at returen er behandlet. Kundeservice er tilgjengelig på telefon, chat og e-post.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om ordren din når fri frakt-grensen på 1200 kroner, og husk at åpent kjøp forutsetter at varen er ubrukt med merkelappene på. Skal du sende til Svalbard, kommer et eget frakttillegg.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Fjellsport før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Fjellsport – Kjøpsvilkår",
        url: "https://www.fjellsport.no/faq/terms",
        checkedAt: "2026-07-14",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Fjellsport – Levering",
        url: "https://www.fjellsport.no/faq/levering",
        checkedAt: "2026-07-14",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "Fjellsport – Betaling",
        url: "https://www.fjellsport.no/faq/betaling",
        checkedAt: "2026-07-14",
        supports: ["payments"],
      },
      {
        label: "Fjellsport – Returinfo",
        url: "https://www.fjellsport.no/faq/returinfo",
        checkedAt: "2026-07-14",
        supports: ["returns"],
      },
      {
        label: "Fjellsport – Om Fjellsport",
        url: "https://www.fjellsport.no/faq/om-fjellsport",
        checkedAt: "2026-07-14",
        supports: ["company", "productRange"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Norsk friluftsspesialist med kvalitetsmerker, 100 dagers åpent kjøp, gratis retur og fri frakt over 1200 kroner. Vær oppmerksom på at Klarna ikke tilbys, og at sortimentet er smalt utenfor friluftssegmentet.",
    editorialPros: [
      "100 dagers åpent kjøp",
      "Gratis retur med ferdig returlapp",
      "Fri frakt over 1200 kr",
      "Fører Norrøna, Patagonia og andre kvalitetsmerker",
      "Gratis henting ved lageret i Sandefjord",
    ],
    editorialCons: [
      "Tilbyr ikke Klarna – faktura via Avarda",
      "Smalt sortiment utenfor friluft",
      "Frakttillegg til Svalbard",
    ],
    bestFor: ["Teknisk friluftsutstyr", "Kvalitetsmerker", "Ski og fjell"],
    notBestFor: ["Lagidrett og treningsapparater"],
    categories: [{ main: "sport-friluft-trening", productType: "friluft", relevance: "primary" }],
    brands: [
      { name: "Norrøna", slug: "norrona", relevance: "primary", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/merker/norrona" },
      { name: "Patagonia", slug: "patagonia", relevance: "secondary", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/merker/patagonia" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/betaling" },
        klarna: { value: false, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/betaling", note: "Faktura og delbetaling via Avarda – ikke Klarna" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/betaling" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/betaling", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        deliveryDays: { value: 3, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering", note: "Oppgitt 1–7 dager avhengig av fraktvalg" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering" },
        freeShippingFrom: { value: 1200, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering", note: "Gjelder rimeligste fraktalternativ" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering", note: "199 kr under 1200 kr; Porterbuddy-ekspress i storbyer" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering", note: "Gratis henting ved lageret i Sandefjord, normalt klar etter 1–3 timer" },
      },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {
        outlet: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/kampanjer/outlet" },
      },
      returns: {
        returnWindowDays: { value: 100, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/returinfo", note: "100 dagers åpent kjøp; lovfestet angrerett 14 dager" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/returinfo", note: "Gratis returlapp via Posten" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 85,
    lastChecked: "2026-07-14",
  },

  // ───────────────────────── Helse, skjønnhet og apotek ──────────────────────
  {
    id: "vita",
    name: "VITA",
    slug: "vita",
    websiteUrl: "https://www.vita.no",
    affiliateSlug: "vita",
    shortDescription:
      "Norsk skjønnhetskjede med sminke, hudpleie og parfyme fra kjente merker.",
    bestFor: ["Sminke og hudpleie", "Kjente skjønnhetsmerker", "Klikk og hent"],
    notBestFor: ["Apotekvarer og resept"],
    categories: [{ main: "helse-skjonnhet-apotek", productType: "sminke", relevance: "primary" }],
    brands: [
      { name: "The Ordinary", slug: "the-ordinary", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
      { name: "Cerave", slug: "cerave", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(499, "low"), clickAndCollect: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 79,
    lastChecked: CHECKED,
  },
  {
    id: "apotek-1",
    name: "Apotek 1",
    searchAliases: ["apotek1"],
    slug: "apotek-1",
    websiteUrl: "https://www.apotek1.no",
    logo: { src: "/logos/apotek-1.svg", alt: "Apotek 1", background: "light" },
    shortDescription:
      "Landsdekkende norsk apotekkjede med reseptfrie varer, hudpleie og helseprodukter på nett.",
    longDescription:
      "Apotek 1 er en landsdekkende norsk apotekkjede med nettapotek for reseptfrie legemidler, hudpleie og helseprodukter. Nettbutikken drives av Apotek 1 Gruppen AS og er registrert som nettapotek hos Direktoratet for medisinske produkter. Du kan hente bestillinger gratis i nærmeste apotek, normalt etter to timer. Butikken passer best for apotekvarer – for et bredt sminkeutvalg finnes egne skjønnhetsbutikker.",
    descriptionSections: [
      {
        heading: "Hva selger Apotek 1?",
        paragraphs: [
          "Apotek 1 selger apotekvarer på nett: reseptfrie legemidler, hudpleie, kosttilskudd, munnstell, baby- og barneprodukter og annet helseutstyr. Både reseptfrie og reseptbelagte legemidler kan kjøpes gjennom nettapoteket.",
          "Nettbutikken drives av Apotek 1 Skårersletta, en avdeling av Apotek 1 Gruppen AS i Lørenskog, og er registrert som nettapotek hos Direktoratet for medisinske produkter. Kjeden omtaler seg som Norges ledende apotekkjede, og alle som jobber med bestilling og pakking er underlagt taushetsplikt.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Apotek 1 passer for deg som vil handle apotekvarer på nett fra en regulert norsk apotekaktør – enten du bestiller reseptfrie legemidler, henter resepter eller fyller på med hudpleie og kosttilskudd. Abonnementsordningen gjør det enkelt å få faste varer tilsendt automatisk, uten ekstra kostnad for selve abonnementet.",
          "Leter du etter et bredt utvalg sminke og parfyme, er rene skjønnhetsbutikker mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Visa, Mastercard, Klarna eller Vipps. Gavekort og tilgodelapper kan ikke brukes i nettbutikken. Kjøp av reseptfrie legemidler på nett har 18 års aldersgrense.",
          "Billigste levering er postkasse med Posten til 19 kroner, mens pakkeskap med Instabox koster 59 kroner, utlevering i butikk 49 kroner og hjemlevering med PostNord 99 kroner. På Østlandet tilbys levering samme dag med Porterbuddy for 29 kroner. Medlemmer av kundeklubben har fri frakt på ordre over 299 kroner. Leveringstiden er oppgitt til 1–4 virkedager, og varene sendes i diskré emballasje. Butikken sender kun til adresser i Norge, ikke til Svalbard – legemidler kan ikke leveres i postkassen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager etter at du har mottatt varen, og returforsendelsen betaler du selv. Viktige unntak følger av loven: legemidler, medisinsk utstyr, forseglede hygienevarer med brutt forsegling og varer som raskt forringes kan ikke returneres.",
          "Henter du i apotek, er bestillingen normalt klar etter to timer, og du får SMS når varene kan hentes. Utlevering krever legitimasjon, og kun personen som står på bestillingen kan motta pakken.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Husk at legemidler og forseglede helsevarer ikke kan angres eller returneres, og at uavhentede pakker kan medføre gebyr. Sjekk om varen kan hentes gratis i ditt nærmeste apotek før du betaler for frakt.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Apotek 1 før du bestiller. Har du spørsmål om legemidler eller helse, kontakt apotek eller lege.",
        ],
      },
    ],
    sources: [
      {
        label: "Apotek 1 – Kjøpsbetingelser",
        url: "https://www.apotek1.no/kundesenter/kjopsbetingelser",
        checkedAt: "2026-07-14",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Apotek 1 – Frakt og levering",
        url: "https://www.apotek1.no/kundesenter/frakt-og-levering",
        checkedAt: "2026-07-14",
        supports: ["shipping", "clickAndCollect", "payments"],
      },
      {
        label: "Apotek 1 – Om selskapet",
        url: "https://www.apotek1.no/om-apotek1/om-selskapet",
        checkedAt: "2026-07-14",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Regulert norsk nettapotek med gratis klikk og hent i apotekene, rimelig postkasselevering og abonnement på faste varer. Vær oppmerksom på at legemidler og forseglede helsevarer ikke kan returneres, og at returfrakt ellers betales av kunden.",
    editorialPros: [
      "Registrert nettapotek under norsk tilsyn",
      "Gratis klikk og hent i apotek, normalt klar etter 2 timer",
      "Postkasselevering fra 19 kr",
      "Abonnement på faste varer uten ekstra kostnad",
      "Diskré emballasje og taushetsplikt",
    ],
    editorialCons: [
      "Returfrakt betales av kunden",
      "Legemidler og forseglede helsevarer kan ikke returneres",
      "Fri frakt krever kundeklubb-medlemskap og kjøp over 299 kr",
    ],
    bestFor: ["Apotekvarer på nett", "Reseptfrie legemidler", "Trygg helsehandel"],
    notBestFor: ["Bredt sminkeutvalg"],
    categories: [{ main: "helse-skjonnhet-apotek", productType: "apotek", relevance: "primary" }],
    brands: [
      { name: "Cerave", slug: "cerave", relevance: "secondary", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.apotek1.no/varemerker/cerave-hudpleie" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        deliveryDays: { value: 2, confidence: "medium", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Oppgitt 1–4 virkedager; samme dag med Porterbuddy på Østlandet" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Fri frakt gjelder kundeklubb-medlemmer" },
        freeShippingFrom: { value: 299, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "For medlemmer av kundeklubben" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "PostNord 99 kr; Porterbuddy 29 kr på Østlandet" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Gratis, normalt klar etter 2 timer" },
        instabox: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Pakkeskap 59 kr" },
      },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {
        subscription: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/kjopsbetingelser", note: "Abonnement på faste varer, uten ekstra kostnad for abonnementet" },
      },
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/kjopsbetingelser", note: "Ikke angrerett på legemidler, medisinsk utstyr og brutte forseglinger" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/kjopsbetingelser" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 84,
    lastChecked: "2026-07-14",
  },
  {
    id: "blivakker",
    name: "Blivakker",
    slug: "blivakker",
    websiteUrl: "https://www.blivakker.no",
    affiliateSlug: "blivakker",
    shortDescription:
      "Norsk nettbutikk med stort utvalg sminke, hudpleie og hårpleie til konkurransedyktige priser.",
    bestFor: ["Bredt skjønnhetsutvalg", "Gode priser", "Norsk lager"],
    notBestFor: ["Fysisk butikk"],
    categories: [{ main: "helse-skjonnhet-apotek", productType: "hudpleie", relevance: "primary" }],
    brands: [
      { name: "The Ordinary", slug: "the-ordinary", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
      { name: "Cerave", slug: "cerave", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(2, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(399, "low"), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { introOffer: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 77,
    lastChecked: CHECKED,
  },
  {
    id: "lyko",
    name: "Lyko",
    slug: "lyko",
    websiteUrl: "https://lyko.com/no",
    affiliateSlug: "lyko",
    shortDescription:
      "Nordisk skjønnhetsbutikk med stort utvalg hår- og hudpleie. Svensk aktør med levering til Norge.",
    bestFor: ["Hårpleie og verktøy", "Stort merkeutvalg", "Lojalitetsfordeler"],
    notBestFor: ["De som vil handle norsk"],
    categories: [
      { main: "helse-skjonnhet-apotek", relevance: "primary" },
      { main: "utenlandske-nettbutikker", relevance: "limited" },
    ],
    brands: [
      { name: "The Ordinary", slug: "the-ordinary", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { klarna: fc(true, "high"), vipps: fc(true, "low") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(400, "low"), homeDelivery: fc(true) },
      geography: { country: fc("SE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 70,
    lastChecked: "2026-05-18",
  },

  // ───────────────────────── Baby, barn og leker ─────────────────────────────
  {
    id: "jollyroom",
    name: "Jollyroom",
    slug: "jollyroom",
    websiteUrl: "https://www.jollyroom.no",
    affiliateSlug: "jollyroom",
    shortDescription:
      "Stor nordisk nettbutikk for baby- og barneutstyr med alt fra vogner til klær og leker.",
    bestFor: ["Babyutstyr og barnevogn", "Bredt sortiment", "Alt på ett sted"],
    notBestFor: ["Rask levering fra norsk lager"],
    categories: [
      { main: "baby-barn-leker", productType: "babyutstyr", relevance: "primary" },
      { main: "utenlandske-nettbutikker", relevance: "limited" },
    ],
    brands: [
      { name: "LEGO", slug: "lego", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { klarna: fc(true, "high"), vipps: fc(true, "low") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(699, "low"), homeDelivery: fc(true) },
      geography: { country: fc("SE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 73,
    lastChecked: "2026-05-22",
  },
  {
    id: "barnas-hus",
    name: "Barnas Hus",
    slug: "barnas-hus",
    websiteUrl: "https://www.barnashus.no",
    affiliateSlug: "barnas-hus",
    shortDescription:
      "Norsk kjede for baby- og barneutstyr med butikker og nettbutikk, og personlig rådgivning.",
    bestFor: ["Trygg norsk barnehandel", "Bilstoler og vogner", "Rådgivning"],
    notBestFor: ["Lavest pris"],
    categories: [{ main: "baby-barn-leker", productType: "babyutstyr", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(999, "low"), clickAndCollect: fc(true), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 78,
    lastChecked: CHECKED,
  },
  {
    id: "lekekassen",
    name: "Lekekassen",
    slug: "lekekassen",
    websiteUrl: "https://www.lekekassen.no",
    affiliateSlug: "lekekassen",
    logo: { src: "/logos/lekekassen.svg", alt: "Lekekassen", background: "light" },
    shortDescription:
      "Norsk nettbutikk for leker, spill og hobby med bredt utvalg for alle aldre.",
    longDescription:
      "Lekekassen er en norsk nettbutikk for leker og hobbyprodukter, drevet av Lekekassen AS i Grimstad og eid av Europris. Sortimentet dekker alt fra LEGO og brettspill til utelek og hobbymateriell, med fri frakt over 1000 kroner og normalt 1–3 virkedagers levering. Butikken passer best for deg som skal kjøpe leker eller gaver til barn – den fører ikke barnevogner, bilstoler eller annet babyutstyr.",
    descriptionSections: [
      {
        heading: "Hva selger Lekekassen?",
        paragraphs: [
          "Lekekassen selger leker, spill og hobbyprodukter på nett. Sortimentet spenner fra byggesett, dukker, plysj og puslespill til utelek som lekehus, basseng, vannleker og elektriske biler for barn, i tillegg til hobbymateriell.",
          "Butikken fører kjente merkevarer som LEGO, Barbie, Paw Patrol og Pokémon. Selskapet omtaler seg som Norges største lekebutikk og oppgir å sende flere hundre tusen bestillinger i året til hele Skandinavia. Søsterbutikkene Toyspace i Sverige og Danmark og Hobbykassen i Norge drives av samme selskap, som har hovedkontor og lager på 21 000 kvadratmeter i Grimstad.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Lekekassen passer først og fremst for deg som skal kjøpe leker, spill eller gaver til barn, eller utstyr til lek ute i hagen. Utvalget dekker de fleste aldersgrupper fra småbarn og oppover.",
          "Butikken er mindre aktuell hvis du leter etter babyutstyr som vogner og bilstoler – det ligger utenfor sortimentet.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Vipps, kortbetaling (Visa og Mastercard via Nets) eller Klarna faktura med 30 dagers forfall. Kjøper må være over 18 år.",
          "Frakt koster 79 kroner for ordre under 1000 kroner og er gratis over dette, med unntak for enkelte varer. Hjemlevering tilbys for 99 kroner, og varer over 35 kilo har eget frakttillegg. Normal leveringstid er oppgitt til 1–3 virkedager til hentested. Butikken leverer til fastlands-Norge, ikke til Svalbard eller Jan Mayen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager fra dagen etter at du mottar varen. Returfrakt betaler du selv – butikken tilbyr ikke returseddel eller fri retur. Varen må være ubrukt og i originalemballasjen, og refusjon skjer innen 10 dager etter at returen er mottatt.",
          "Reklamasjonsretten følger forbrukerkjøpsloven: to år, eller fem år for varer som er ment å vare vesentlig lenger.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om varene dine kvalifiserer til fri frakt, siden enkelte varer er unntatt. Husk at returfrakt ikke dekkes, og at forseglede varer må ha forseglingen intakt ved retur. Leveringstiden kan bli lengre rundt jul og påske.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Lekekassen før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Lekekassen – Om oss",
        url: "https://www.lekekassen.no/om-oss",
        checkedAt: "2026-07-13",
        supports: ["company", "productRange", "brands"],
      },
      {
        label: "Lekekassen – Betingelser",
        url: "https://www.lekekassen.no/betingelser",
        checkedAt: "2026-07-13",
        supports: ["payments", "shipping", "returns"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Solid norsk lekespesialist med bredt sortiment, kjente merkevarer og oppgitt leveringstid på 1–3 virkedager. Vær oppmerksom på at returfrakt betales av kunden.",
    editorialPros: [
      "Stort utvalg leker og kjente merkevarer",
      "Fri frakt over 1000 kr",
      "Oppgitt leveringstid 1–3 virkedager",
      "PrisMatch-garanti",
    ],
    editorialCons: [
      "Returfrakt betales av kunden",
      "14 dagers angrerett er lovens minimum",
      "Ingen fysisk butikk",
    ],
    bestFor: ["Leker og brettspill", "LEGO og byggesett", "Gaveideer til barn"],
    notBestFor: ["Babyutstyr som vogner og bilstoler"],
    categories: [
      { main: "baby-barn-leker", productType: "leker", relevance: "primary" },
      { main: "hobby-gaver-moro", productType: "gaver", relevance: "secondary" },
    ],
    brands: [
      { name: "LEGO", slug: "lego", relevance: "primary", confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/om-oss" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser", note: "Klarna faktura, 30 dagers forfall" },
      },
      shipping: {
        deliveryDays: { value: 2, confidence: "medium", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser", note: "Oppgitt 1–3 virkedager" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser" },
        freeShippingFrom: { value: 1000, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser", note: "99 kr, uavhengig av kjøpesum" },
      },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {
        priceMatch: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/prismatch" },
      },
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 76,
    lastChecked: "2026-07-13",
  },

  // ───────────────────────── Dyr og kjæledyr ─────────────────────────────────
  {
    id: "musti",
    name: "Musti",
    slug: "musti",
    websiteUrl: "https://www.musti.no",
    affiliateSlug: "musti",
    shortDescription:
      "Nordisk dyrebutikk med fôr, utstyr og tilbehør til hund, katt og smådyr. Butikker og nettbutikk.",
    bestFor: ["Hunde- og kattefôr", "Bredt dyreutvalg", "Klikk og hent"],
    notBestFor: ["Eksotiske dyr"],
    categories: [{ main: "dyr-kjaeledyr", productType: "hund", relevance: "primary" }],
    brands: [
      { name: "Royal Canin", slug: "royal-canin", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high"), klarna: fc(true) },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(599, "low"), clickAndCollect: fc(true), homeDelivery: fc(true) },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { subscription: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 77,
    lastChecked: CHECKED,
  },
  {
    id: "zooplus",
    name: "Zooplus",
    slug: "zooplus",
    websiteUrl: "https://www.zooplus.no",
    affiliateSlug: "zooplus",
    shortDescription:
      "En av Europas største dyrebutikker på nett med svært bredt utvalg fôr og utstyr. Utenlandsk aktør.",
    bestFor: ["Lave priser på fôr i volum", "Svært bredt utvalg", "Fast levering"],
    notBestFor: ["Rask levering fra norsk lager", "Klikk og hent"],
    categories: [
      { main: "dyr-kjaeledyr", relevance: "primary" },
      { main: "utenlandske-nettbutikker", relevance: "limited" },
    ],
    brands: [
      { name: "Royal Canin", slug: "royal-canin", relevance: "primary", confidence: "medium", lastChecked: CHECKED },
    ],
    country: "DE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { paypal: fc(true), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(5, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(699, "low"), homeDelivery: fc(true) },
      geography: { country: fc("DE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: { subscription: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 72,
    notes: ["Utenlandsk aktør – sjekk leveringstid og eventuell avgift."],
    lastChecked: "2026-05-15",
  },
  {
    id: "vom-og-hundemat",
    name: "VOM og Hundemat",
    slug: "vom-og-hundemat",
    searchAliases: ["vom"],
    websiteUrl: "https://www.vomoghundemat.no",
    shortDescription:
      "Norsk produsent og nettbutikk for ferskt hundefôr basert på norske råvarer, levert hjem.",
    bestFor: ["Ferskt norsk hundefôr", "Abonnement på fôr", "Hjemlevering"],
    notBestFor: ["Kattefôr og smådyr"],
    categories: [{ main: "dyr-kjaeledyr", productType: "hund", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("paid"), homeDelivery: fc(true, "high") },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { subscription: fc(true, "medium"), freeTrial: fc(true, "low") },
      returns: { returnWindowDays: fc(14, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 71,
    lastChecked: "2026-04-10",
    needsManualReview: true,
  },

  // ───────────────────────── Hjem, interiør og hage ──────────────────────────
  {
    id: "jysk",
    name: "JYSK",
    slug: "jysk",
    websiteUrl: "https://jysk.no",
    affiliateSlug: "jysk",
    shortDescription:
      "Skandinavisk kjede for senger, møbler og interiør til lav pris. Butikker og nettbutikk i Norge.",
    bestFor: ["Senger og madrasser", "Rimelig interiør", "Klikk og hent"],
    notBestFor: ["Designmøbler i premiumsegmentet"],
    categories: [{ main: "hjem-interior-hage", productType: "mobler", relevance: "primary" }],
    country: "DK",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium"), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("paid"), clickAndCollect: fc(true), homeDelivery: fc(true) },
      geography: { country: fc("DK", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 73,
    lastChecked: "2026-05-08",
  },
  {
    id: "bohus",
    name: "Bohus",
    slug: "bohus",
    websiteUrl: "https://www.bohus.no",
    affiliateSlug: "bohus",
    shortDescription:
      "Norsk møbelkjede med stort utvalg sofaer, møbler og interiør, og butikker over hele landet.",
    bestFor: ["Sofaer og møbler", "Norsk møbelkjede", "Hjemlevering og montering"],
    notBestFor: ["Lavprisinteriør"],
    categories: [{ main: "hjem-interior-hage", productType: "mobler", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium"), klarna: fc(true) },
      shipping: { deliveryDays: fc(7, "low"), shippingType: fc("paid"), clickAndCollect: fc(true), homeDelivery: fc(true, "high") },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 76,
    lastChecked: CHECKED,
  },
  {
    id: "rusta",
    name: "Rusta",
    slug: "rusta",
    websiteUrl: "https://www.rusta.com/no",
    shortDescription:
      "Lavpriskjede for hjem, hage og forbruksvarer med bredt utvalg til hus og fritid. Svensk aktør.",
    bestFor: ["Rimelige hjem- og hagevarer", "Sesongvarer", "Klikk og hent"],
    notBestFor: ["Kvalitetsmøbler"],
    categories: [
      { main: "hjem-interior-hage", productType: "hage", relevance: "primary" },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "low"), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("paid"), clickAndCollect: fc(true, "low") },
      geography: { country: fc("SE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "medium"), voec: fc(false, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "D",
    editorialScore: 64,
    lastChecked: "2026-03-28",
    needsManualReview: true,
  },

  // ───────────────────────── Bil, båt og motor ───────────────────────────────
  {
    id: "biltema",
    name: "Biltema",
    slug: "biltema",
    websiteUrl: "https://www.biltema.no",
    shortDescription:
      "Bredt varehus for bil, verktøy, hjem, fritid og hobby til lav pris. Butikker og nettbutikk.",
    bestFor: ["Bil og verktøy", "Rimelig bredde", "Hobby og fritid"],
    notBestFor: ["Spesialiserte merkevarer"],
    categories: [
      { main: "bil-bat-motor", productType: "bildeler", relevance: "primary" },
      { main: "hjem-interior-hage", relevance: "secondary" },
      { main: "hobby-gaver-moro", relevance: "secondary" },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium") },
      shipping: { deliveryDays: fc(3, "low"), shippingType: fc("paid"), clickAndCollect: fc(true, "high") },
      geography: { country: fc("SE", "low"), isNorwegian: fc(false, "medium"), shipsToNorway: fc(true, "high"), voec: fc(false, "low") },
      commercial: {},
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 72,
    notes: ["Eierskap og land kan være uklart – kontroller ved behov."],
    lastChecked: "2026-05-01",
  },
  {
    id: "dekkmann",
    name: "Dekkmann",
    slug: "dekkmann",
    websiteUrl: "https://www.dekkmann.no",
    affiliateSlug: "dekkmann",
    shortDescription:
      "Norsk dekk- og felgkjede med montering på verksted over hele landet, og bestilling på nett.",
    bestFor: ["Dekk og felg", "Montering på verksted", "Sesongskifte"],
    notBestFor: ["Generelle bildeler"],
    categories: [{ main: "bil-bat-motor", productType: "dekk", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium"), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(null, "low"), clickAndCollect: fc(true, "high") },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: {},
      returns: { returnWindowDays: fc(14, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "C",
    editorialScore: 70,
    lastChecked: "2026-05-05",
  },

  // ───────────────────────── Syn, briller og linser ──────────────────────────
  {
    id: "synsam",
    name: "Synsam",
    slug: "synsam",
    websiteUrl: "https://www.synsam.no",
    affiliateSlug: "synsam",
    shortDescription:
      "Optikerkjede for briller, solbriller og kontaktlinser med abonnement og synsundersøkelser.",
    bestFor: ["Briller og solbriller", "Linseabonnement", "Synsundersøkelse"],
    notBestFor: ["Lavpris engangskjøp"],
    categories: [{ main: "syn-briller-linser", productType: "briller", relevance: "primary" }],
    brands: [
      { name: "Ray-Ban", slug: "ray-ban", relevance: "secondary", confidence: "low", lastChecked: CHECKED },
    ],
    country: "SE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "medium"), klarna: fc(true, "low") },
      shipping: { deliveryDays: fc(4, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(null, "low"), clickAndCollect: fc(true, "high") },
      geography: { country: fc("SE", "low"), isNorwegian: fc(false, "low"), shipsToNorway: fc(true, "high"), voec: fc(false, "low") },
      commercial: { subscription: fc(true, "medium"), bindingPeriod: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 71,
    lastChecked: "2026-05-03",
  },

  // ───────────────────────── Mat, drikke og dagligvarer ──────────────────────
  {
    id: "oda",
    name: "Oda",
    slug: "oda",
    websiteUrl: "https://oda.com/no",
    affiliateSlug: "oda",
    shortDescription:
      "Norsk nettdagligvare med hjemlevering av matvarer og ferdige middagskasser i abonnement.",
    bestFor: ["Dagligvarer hjem", "Middagskasser", "Fast handlemønster"],
    notBestFor: ["Rask henting i butikk", "Hele landet (begrenset område)"],
    categories: [
      { main: "mat-drikke-dagligvarer", productType: "matkasse", relevance: "primary" },
      { main: "tjenester-abonnement", relevance: "secondary" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: { vipps: fc(true, "high") },
      shipping: { deliveryDays: fc(1, "low"), shippingType: fc("paid"), homeDelivery: fc(true, "high") },
      geography: { country: fc("NO", "high"), isNorwegian: fc(true, "high"), shipsToNorway: fc(true, "high"), voec: fc(false, "high") },
      commercial: { subscription: fc(true, "medium"), introOffer: fc(true, "low") },
      returns: { returnWindowDays: fc(14, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "high",
    dataQuality: "B",
    editorialScore: 75,
    notes: ["Hjemlevering er geografisk begrenset – sjekk om de leverer til deg."],
    lastChecked: CHECKED,
  },

  // ───────────────────────── Utenlandske nettbutikker ────────────────────────
  {
    id: "temu",
    name: "Temu",
    slug: "temu",
    websiteUrl: "https://www.temu.com",
    shortDescription:
      "Internasjonal lavprismarkedsplass der tredjepartsselgere selger til norske kunder. VOEC-registrert – kontroller selger og produkt før kjøp.",
    longDescription:
      "Temu er en internasjonal lavprismarkedsplass drevet av irske Whaleco Technology Limited. Når du handler, inngår du kjøpsavtale med en tredjepartsselger – ikke med Temu selv, som bistår med kundeservice og retur. Plattformen er registrert i Skatteetatens VOEC-register, så norsk mva. håndteres i kassen. EU-kommisjonen og europeiske forbrukermyndigheter har dokumentert mangler ved produktsikkerhet og markedsføringspraksis, så kontroller selger og produkt nøye før kjøp.",
    descriptionSections: [
      {
        heading: "Hva er Temu og hva selges der?",
        paragraphs: [
          "Temu er en markedsplass, ikke en vanlig nettbutikk: varene selges av tredjeparts handelspartnere som ifølge Temus egne vilkår må være profesjonelle næringsdrivende, og kjøpsavtalen inngås direkte mellom deg og selgeren. Temu er ikke part i avtalen, men bistår med kundeservice og returhåndtering. Motparten for norske brukere er Whaleco Technology Limited, registrert i Irland.",
          "Utvalget spenner over lavprisvarer i de fleste kategorier – husholdning, hobby, tilbehør, klær og småelektronikk. De fleste varer sendes fra utlandet; enkelte sendes fra lokale varehus i Europa. Du må være 18 år for å bruke tjenesten.",
        ],
      },
      {
        heading: "Hvem passer markedsplassen for?",
        paragraphs: [
          "Temu passer for deg som vil kjøpe rimelige småvarer og tilbehør, tåler at leveringstiden først oppgis i kassen, og er komfortabel med at selgeren er en utenlandsk tredjepart – ikke en norsk forhandler.",
          "Markedsplassen er mindre egnet for kjøp der dokumentert produktsikkerhet er avgjørende, som leketøy og elektronikk til barn: EU-kommisjonens kontrollkjøp har avdekket usikre produkter i slike kategorier (se advarslene på denne siden).",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Temu oppgir at norske kunder kan betale med kort (blant annet Visa, Mastercard og American Express), Vipps, Apple Pay, Google Pay, PayPal og Klarna, i tillegg til Temu-kreditt.",
          "Standardfrakt er gratis for de fleste varer over minstebestillingen, som er 130 kroner for første bestilling og 345 kroner for senere bestillinger. Bestillinger behandles normalt i løpet av 1–3 dager, og leveringstiden for din pakke oppgis i kassen og i ordrebekreftelsen – det finnes ingen generell oppgitt leveringstid til Norge. Temu er registrert i Skatteetatens VOEC-register (som Whaleco Technology Limited), så norsk merverdiavgift kreves inn når du betaler, og varene går gjennom forenklet fortolling.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Temu gir 90 dagers valgfri returrett fra kjøpet (45 eller 60 dager for enkelte elektronikkvarer), i tillegg til den lovfestede angreretten på 14 dager for EØS-forbrukere. Første retur per bestilling er gratis; senere returer fra samme bestilling betaler du selv. Refusjon skjer innen 14 dager, og varen må være ubrukt og komplett.",
          "Kundeservice tilbys via chat og e-post, og Temu har norsk telefonstøtte. Husk at selgeren – ikke Temu – er ansvarlig for varen og leveringen; Temu opptrer som mellomledd ved problemer.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Undersøk hvem selgeren av varen er, og vær ekstra kritisk til produkter der sikkerhet betyr noe. EU-kommisjonen opplyste 28. mai 2026 at Temu var ilagt en bot på 200 millioner euro etter DSA-reglene, fordi plattformen ikke hadde identifisert og vurdert risikoen for ulovlige produkter godt nok – kommisjonens kontrollkjøp fant blant annet ladere og babyleker som ikke besto sikkerhetstester. Det gjelder plattformens systemplikter og enkeltfunn, ikke at alle produkter er farlige. CPC-nettverket har i tillegg dokumentert villedende praksis som falske rabatter og kjøpepress, og pålagt endringer.",
          "Avgifter er derimot ryddig håndtert gjennom VOEC – totalprisen du ser i kassen inkluderer norsk mva. Kontroller alltid gjeldende vilkår, leveringstid og selgerinformasjon hos Temu før du bestiller, og vurder produktomtaler kritisk.",
        ],
      },
    ],
    sources: [
      {
        label: "Temu – Bruksvilkår (Norge)",
        url: "https://www.temu.com/no/terms-of-use.html",
        checkedAt: "2026-07-15",
        supports: ["company", "marketplace"],
      },
      {
        label: "Temu – Firmadetaljer/juridisk informasjon",
        url: "https://www.temu.com/no/imprint.html",
        checkedAt: "2026-07-15",
        supports: ["company", "customerService"],
      },
      {
        label: "Temu – Retur- og refusjonsvilkår",
        url: "https://www.temu.com/no/return-and-refund-policy.html",
        checkedAt: "2026-07-15",
        supports: ["returns"],
      },
      {
        label: "Temu – Betalingsmåter (supportsenter)",
        url: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html",
        checkedAt: "2026-07-15",
        supports: ["payments"],
      },
      {
        label: "Temu – Fraktinformasjon",
        url: "https://www.temu.com/no/shipping-info.html",
        checkedAt: "2026-07-15",
        supports: ["shipping"],
      },
      {
        label: "Skatteetaten – VOEC-registeret",
        url: "https://www.skatteetaten.no/person/avgifter/kjop-fra-utlandet/nettbutikker-og-e-markedsplasser-som-er-registrert-i-voec-registeret/",
        checkedAt: "2026-07-15",
        supports: ["voec"],
      },
      {
        label: "Forbrukertilsynet – «Temu må følge loven»",
        url: "https://www.forbrukertilsynet.no/temu-ma-folge-loven",
        checkedAt: "2026-07-15",
        supports: ["advarsler"],
      },
      {
        label: "EU-kommisjonen – bot til Temu for DSA-brudd (IP/26/1178)",
        url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1178",
        checkedAt: "2026-07-15",
        supports: ["productSafety", "advarsler"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Lavprismarkedsplass med bredt utvalg, VOEC-registrert avgiftshåndtering, 90 dagers returrett og bredt betalingsutvalg. EU-kommisjonen bøtela Temu i mai 2026 for mangelfull risikovurdering av ulovlige produkter, og CPC-nettverket har dokumentert villedende praksis – kontroller selger og produkt nøye før kjøp.",
    editorialPros: [
      "Norsk mva. håndteres i kassen (VOEC-registrert hos Skatteetaten)",
      "90 dagers returrett; første retur per bestilling er gratis",
      "Gratis standardfrakt over minstebestilling (130/345 kr)",
      "Bredt betalingsutvalg: Vipps, Klarna, PayPal, Apple Pay, Google Pay",
      "Norsk telefonstøtte",
    ],
    editorialCons: [
      "Bøtelagt av EU-kommisjonen (28. mai 2026) for mangelfull risikovurdering av ulovlige produkter",
      "CPC-dokumentert villedende praksis: falske rabatter og kjøpepress",
      "Kjøpsavtalen inngås med tredjepartsselger, ikke Temu",
      "Leveringstid oppgis først i kassen – ingen generell garanti",
    ],
    bestFor: ["Rimelige småvarer og gadgets", "Bredt utvalg lavprisvarer"],
    notBestFor: ["Leker og elektronikk der produktsikkerhet er avgjørende", "Kjøp der du vil ha norsk forhandler som motpart"],
    categories: [
      { main: "utenlandske-nettbutikker", relevance: "primary" },
      { main: "hjem-interior-hage", relevance: "limited" },
    ],
    country: "IE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html", note: "Betal nå eller om 30 dager" },
        paypal: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html" },
        googlePay: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html" },
        amex: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/support/c3/hvilke-betalingsm-ter-godtar--f-56-s-140.html" },
      },
      shipping: {
        shippingType: { value: "free", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/shipping-info.html", note: "Gratis standardfrakt for de fleste varer; minstebestilling 130 kr (første) / 345 kr (senere)" },
      },
      geography: {
        country: { value: "IE", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/imprint.html", note: "Plattformoperatør: Whaleco Technology Limited, Irland. Varene selges av tredjeparter og sendes i hovedsak fra utlandet" },
        isNorwegian: fc(false, "high"),
        shipsToNorway: fc(true, "high"),
        voec: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.skatteetaten.no/person/avgifter/kjop-fra-utlandet/nettbutikker-og-e-markedsplasser-som-er-registrert-i-voec-registeret/", note: "Oppført i registeret som Whaleco Technology Limited / temu.com" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 90, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/return-and-refund-policy.html", note: "Valgfri returrett; 45/60 dager for enkelte elektronikkvarer. Lovfestet angrerett 14 dager" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/return-and-refund-policy.html", note: "Første retur per bestilling er gratis; senere returer betales av kunden" },
      },
    },
    trustLevel: "low",
    dataQuality: "A",
    editorialScore: 45,
    warnings: [
      "EU-kommisjonen opplyste 28. mai 2026 at Temu var ilagt en bot på 200 millioner euro etter DSA-reglene, fordi plattformen ikke hadde vurdert risikoen for ulovlige produkter på markedsplassen godt nok. Kommisjonens kontrollkjøp fant blant annet ladere og babyleker som ikke besto sikkerhetstester. Kontroller produktsikkerhet selv, særlig for leker og elektronikk.",
      "Det europeiske forbrukervernnettverket CPC, koordinert av EU-kommisjonen, dokumenterte i 2024–2025 villedende praksis hos Temu, blant annet falske rabatter, kjøpepress og mangelfull forbrukerinformasjon, og påla endringer.",
    ],
    lastChecked: "2026-07-15",
  },
  {
    id: "amazon",
    name: "Amazon",
    slug: "amazon",
    websiteUrl: "https://www.amazon.de",
    shortDescription:
      "Verdens største nettbutikk med enormt utvalg. Norske kunder handler typisk via tyske eller svenske Amazon.",
    bestFor: ["Enormt utvalg", "Bøker, elektronikk og tilbehør", "Konkurransedyktige priser"],
    notBestFor: ["Norsk kundeservice", "Forutsigbar toll/avgift på enkeltvarer"],
    categories: [
      { main: "utenlandske-nettbutikker", relevance: "primary" },
      { main: "elektronikk-data-gaming", relevance: "secondary" },
      { main: "hobby-gaver-moro", relevance: "limited" },
    ],
    brands: [
      { name: "Apple", slug: "apple", relevance: "limited", confidence: "low", lastChecked: CHECKED },
      { name: "LEGO", slug: "lego", relevance: "limited", confidence: "low", lastChecked: CHECKED },
    ],
    country: "DE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: { paypal: fc(false, "low"), applePay: fc(false, "low") },
      shipping: { deliveryDays: fc(7, "low"), shippingType: fc("free_over_amount"), freeShippingFrom: fc(null, "low"), homeDelivery: fc(true, "medium") },
      geography: { country: fc("DE", "high"), isNorwegian: fc(false, "high"), shipsToNorway: fc(true, "high"), voec: fc(true, "low") },
      commercial: { subscription: fc(true, "low") },
      returns: { returnWindowDays: fc(30, "low"), freeReturns: fc(false, "low") },
    },
    trustLevel: "medium",
    dataQuality: "C",
    editorialScore: 68,
    notes: ["Norske kunder handler ofte via amazon.de eller amazon.se – sjekk levering og avgift."],
    lastChecked: "2026-05-20",
  },
];
