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
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/kjopsvilkar", note: "Elkjøp Norge AS, org 947 054 600, Oslo" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/kjopsvilkar" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.elkjop.no/kundeservice/levering/levering-og-frakt", note: "Leverer ikke til utlandet" },
      },
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
    logo: { src: "/logos/power.svg", alt: "POWER", background: "dark" },
    shortDescription:
      "Stor elektronikkjede kjent for kampanjer og bredt utvalg innen TV, mobil, PC og hvitevarer – nettbutikk og varehus.",
    longDescription:
      "Power er en elektronikkjede der den norske virksomheten drives av Power Norge AS i Lørenskog. Nettbutikken selger TV, mobil, PC, gaming, lyd, smarthjem og hvitevarer. Kundegarantien «Pengene tilbake» gir 60 dagers åpent kjøp på de fleste varer – også åpnede – og Click&Collect lar deg reservere på nett og hente i varehus etter 30–60 minutter. Frakt koster fra 89 kroner, mens levering til POWER-butikk er gratis.",
    descriptionSections: [
      {
        heading: "Hva selger Power?",
        paragraphs: [
          "Power selger elektronikk på nett: TV og lyd, mobiltelefoner, PC-er og gaming, hvitevarer, smarthjem-produkter og småelektronikk, med kjente merkevarer som Samsung og Sony. Kjeden selger også Outlet-varer – kundereturer og utstillingsmodeller til nedsatt pris.",
          "Den norske virksomheten drives av Power Norge AS, org 977 047 838, i Lørenskog, som del av Power International-konsernet, med varehus og franchisetakere over hele landet. Sentrallageret ligger i Sverige, så bestillingsvarer kan ikke hentes der.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Power passer for deg som følger med på kampanjer og vil kombinere nettbutikk med varehus – enten via gratis Click&Collect-reservasjon eller gratis forsendelse til nærmeste POWER-butikk.",
          "Det 60 dager lange åpne kjøpet gjør det trygt å prøve produkter hjemme: du kan åpne og teste varen og likevel bytte eller få pengene tilbake, med unntak for blant annet forseglede varer.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Visa og Mastercard utstedt av norsk bank – kort fra utenlandske banker avvises – samt Vipps og faktura eller delbetaling via handlekontoen MyCredit fra Resurs Bank. Klarna tilbys ikke. Du må være 18 år eller ha tillatelse fra foresatt, og fysiske gavekort kan ikke brukes på nett – kun verdikoder.",
          "Levering til utleveringssted koster fra 89 kroner, hjemlevering av småvarer 149 kroner, og store varer leveres av Bring fra 399 kroner (699 kroner med innbæring). Send til POWER-butikk er gratis. Normal leveringstid er 2–7 virkedager, og Power leverer ikke til Svalbard eller Jan Mayen. Click&Collect er gratis: varen er klar i varehuset innen 30–60 minutter, og reservasjonen gjelder i 24 timer.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Kundegarantien «Pengene tilbake» gir 60 dagers åpent kjøp i butikk og på nett, også på åpnede og prøvde varer i samme stand. Unntakene omfatter blant annet mobiltelefoner og datakomponenter med brutt forsegling, spill og programvare, hygieneprodukter som smartklokker og in-ear-hodetelefoner, gavekort, kjøkken og TV-er uten originalemballasje; sesongvarer har 14 dager.",
          "Ved nettkjøp gjelder i tillegg 14 dagers angrerett, med returfrakt betalt av kunden – enklest er retur i et POWER-varehus. Merk at Click&Collect regnes som butikkjøp, slik at angreretten ikke gjelder for reservasjoner som betales i butikk.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om varen din er unntatt åpent kjøp før du bryter forseglingen, og husk at Click&Collect-reservasjoner som betales i butikk ikke har angrerett. Bruker du kort fra utenlandsk bank, må du velge en annen betalingsmåte.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Power før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Power – Kjøpsvilkår",
        url: "https://www.power.no/kundeservice/kjoepsvilkaar/",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping", "clickAndCollect"],
      },
      {
        label: "Power – Retur og åpent kjøp",
        url: "https://www.power.no/kundeservice/retur-og-aapent-kjoep/",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Power – Betalingsalternativer",
        url: "https://www.power.no/kundeservice/betalingsalternativer/",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
      {
        label: "Power – Levering og montering",
        url: "https://www.power.no/kundeservice/levering-og-montering/",
        checkedAt: "2026-07-16",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "Brønnøysundregistrene – Power Norge AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/977047838",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende elektronikkjede med 60 dagers åpent kjøp – også på åpnede varer – og gratis Click&Collect klar på 30–60 minutter. Vær oppmerksom på at frakt hjem alltid koster, at Klarna og utenlandske kort ikke støttes, og at Click&Collect regnes som butikkjøp uten angrerett.",
    editorialPros: [
      "60 dagers åpent kjøp («Pengene tilbake»), også på åpnede varer",
      "Gratis Click&Collect – klar i varehus på 30–60 minutter",
      "Gratis forsendelse til POWER-butikk",
      "Vipps og MyCredit faktura/delbetaling",
      "Varehus over hele landet",
    ],
    editorialCons: [
      "Ingen fri frakt hjem – fra 89 kr",
      "Klarna tilbys ikke (MyCredit via Resurs Bank)",
      "Kort fra utenlandske banker avvises",
      "Click&Collect er butikkjøp – angreretten gjelder ikke",
    ],
    bestFor: ["Kampanjepriser", "Bredt utvalg elektronikk", "Klikk og hent"],
    notBestFor: ["Spesialisert gaming-rådgivning"],
    categories: [{ main: "elektronikk-data-gaming", relevance: "primary" }],
    brands: [
      { name: "Samsung", slug: "samsung", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/samsung/" },
      { name: "Sony", slug: "sony", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/sony/" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/" },
        klarna: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/", note: "Faktura og delbetaling via MyCredit (Resurs Bank)" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/", note: "Kort oppgitt som Visa og Mastercard utstedt av norsk bank" },
      },
      shipping: {
        deliveryDays: { value: 5, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/kjoepsvilkaar/", note: "Normalt 2–7 virkedager fra gjennomført betaling" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/levering-og-montering/", note: "Utleveringssted fra 89 kr, hjemlevering fra 149 kr (store varer fra 399 kr); send til POWER-butikk gratis" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/levering-og-montering/" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/levering-og-montering/", note: "Gratis; klar på 30–60 min; reservasjonen gjelder i 24 timer; regnes som butikkjøp" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/977047838", note: "Power Norge AS, org 977 047 838, Lørenskog (del av Power International-konsernet)" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/977047838" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/kjoepsvilkaar/", note: "Ikke Svalbard eller Jan Mayen" },
      },
      commercial: {
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/betalingsalternativer/", note: "Fysiske gavekort kan ikke brukes i nettbutikken – kun verdikoder" },
        outlet: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/spoersmaal-og-svar/", note: "Kundereturer og utstillingsmodeller" },
      },
      returns: {
        returnWindowDays: { value: 60, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/retur-og-aapent-kjoep/", note: "60 dagers åpent kjøp (lovfestet angrerett 14 dager ved nettkjøp); sesongvarer 14 dager; unntak for brutt forsegling m.m." },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.power.no/kundeservice/retur-og-aapent-kjoep/", note: "Gratis i varehus; returfrakt per post betales av kunden" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 78,
    lastChecked: "2026-07-16",
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
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/", note: "Komplett Services AS, Sandefjord" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.komplett.no/kundeservice/om-komplett/salgsbetingelser-forbruker/", note: "Leverer til Fastlands-Norge og Svalbard" },
      },
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
    logo: { src: "/logos/multicom.svg", alt: "Multicom", background: "transparent" },
    shortDescription:
      "Norsk spesialist på gaming-PC, bærbare maskiner og datakomponenter – egenbygde PC-er fra eget verksted i Åmli.",
    longDescription:
      "Multicom er en norsk nettbutikk for PC og datautstyr, drevet av Multicom Norge AS i Åmli. Sortimentet dekker gaming-PC-er, bærbare maskiner, komponenter og tilbehør, inkludert PC-er bygget etter kundens spesifikasjoner. Du kan betale med kort, Vipps og Klarna, frakten koster fra 89 kroner, og angreretten er 14 dager med et fast returfradrag på 99 kroner. Egenbygde PC-er har egne avbestillingsgebyrer.",
    descriptionSections: [
      {
        heading: "Hva selger Multicom?",
        paragraphs: [
          "Multicom selger datautstyr på nett: gaming-PC-er og bærbare maskiner, datakomponenter til egenbygg, skjermer, tilbehør og annen elektronikk. Butikken bygger også PC-er etter kundens spesifikasjoner og gir to års garanti på egne Multicom-PC-er, mot normalt ett år på enkeltkomponenter.",
          "Nettbutikken drives av Multicom Norge AS, org 977 203 082, fra Engenes i Åmli, der selskapet har lager og verksted.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Multicom passer for deg som skal ha gaming-PC eller komponenter og vil ha et spesialisert fagmiljø – særlig hvis du vil kjøpe en ferdig bygget maskin uten å skru selv.",
          "Butikken har ikke egne varehus, så vil du se produktene fysisk før kjøp, må du velge en kjede med butikker. Hvitevarer og generell hjemmelektronikk er heller ikke butikkens fokus.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa og Mastercard), Vipps og Klarna, med faktura og delbetaling for privatkunder. Du må være over 18 år eller ha samtykke fra foresatt.",
          "Frakten koster fra 89 kroner og beregnes i kassen ut fra postnummer; varene sendes i hovedsak med Posten. Leveringstidene oppgis som veiledende. Multicom leverer også til Svalbard mot et tillegg.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager fra du mottar varen. Kjøper dekker returkostnadene, og Multicom trekker en fast returfrakt på 99 kroner fra tilbakebetalingen når du bruker deres returetikett. Angreretten gjelder ikke åpnet programvare eller forbruksvarer som blekkpatroner, og bedriftskjøp er unntatt.",
          "For PC-er som er bygget etter dine spesifikasjoner, kan kansellering koste 950–1600 kroner i produksjonskostnader. Reklamasjoner krever forhåndsgodkjent RMA-nummer, og en del produkter reklameres direkte til produsenten.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Bestiller du en egenbygd PC, bør du være sikker på konfigurasjonen før du betaler – avbestilling koster. Husk returfradraget på 99 kroner, og at åpnet programvare ikke kan returneres. Uavhentede pakker belastes med 99 kroner pluss frakt tur/retur.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Multicom før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Multicom – Kjøpsbetingelser",
        url: "https://www.multicom.no/pages/terms",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Multicom – Betaling",
        url: "https://www.multicom.no/pages/payment",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
      {
        label: "Multicom – Retur og angrerett",
        url: "https://www.multicom.no/pages/retur",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Brønnøysundregistrene – Multicom Norge AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/977203082",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Spesialisert norsk PC-butikk med egenbygde maskiner, to års garanti på Multicom-PC-er og betaling via Vipps og Klarna. Vær oppmerksom på returfradraget på 99 kroner, kanselleringsgebyr på egenbygde PC-er og at leveringstidene kun er veiledende.",
    editorialPros: [
      "Spesialist på gaming-PC og egenbygg",
      "To års garanti på egne Multicom-PC-er",
      "Vipps og Klarna faktura/delbetaling",
      "Leverer i hele Norge, også Svalbard mot tillegg",
    ],
    editorialCons: [
      "Returfradrag på 99 kr ved bruk av returetikett",
      "Avbestilling av egenbygd PC koster 950–1600 kr",
      "Ingen fri frakt – fra 89 kr",
      "Ingen fysiske butikker",
    ],
    bestFor: ["Gaming-PC", "Bærbare gaming-maskiner", "Komponenter til egenbygg"],
    notBestFor: ["Hvitevarer og generell elektronikk"],
    categories: [{ main: "elektronikk-data-gaming", productType: "pc-data", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment", note: "Faktura 30 dager, delbetaling og kort" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/payment", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/support", note: "Frakt fra 89 kr, beregnes i kassen etter postnummer; sendes i hovedsak med Posten" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/support" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/977203082", note: "Multicom Norge AS, org 977 203 082, Åmli" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/977203082" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/terms", note: "Også Svalbard mot tillegg" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/terms", note: "Lovfestet angrerett; unntak for åpnet programvare, forbruksvarer og bedriftskjøp" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.multicom.no/pages/retur", note: "Fast returfradrag på 99 kr ved bruk av returetikett" },
      },
    },
    trustLevel: "medium",
    dataQuality: "A",
    editorialScore: 70,
    lastChecked: "2026-07-16",
  },

  // ───────────────────────── Klær, sko og mote ───────────────────────────────
  {
    id: "zalando",
    name: "Zalando",
    slug: "zalando",
    websiteUrl: "https://www.zalando.no",
    affiliateSlug: "zalando",
    logo: { src: "/logos/zalando.svg", alt: "Zalando", background: "transparent" },
    shortDescription:
      "En av Europas største motebutikker med stort utvalg klær, sko og merkevarer. Tysk aktør med norsk mva. i prisen.",
    longDescription:
      "Zalando er en tysk moteplattform drevet av Zalando SE i Berlin, med norsk nettbutikk for klær, sko, sport og accessoirer. Deler av utvalget selges av partnerbutikker via plattformen. Zalando SE står i Skatteetatens VOEC-register, så norsk mva. er inkludert i prisen. Frakten er gratis til hentested ved kjøp over 599 kroner, og både egne varer og partnervarer kan returneres kostnadsfritt innen 30 dager.",
    descriptionSections: [
      {
        heading: "Hva selger Zalando?",
        paragraphs: [
          "Zalando selger mote på nett: klær, sko, sportsklær, vesker og accessoirer til dame, herre og barn. Utvalget dekker kjente merkevarer som Nike, Adidas, New Balance og Levi's, med egne merkesider for hver.",
          "Deler av sortimentet selges gjennom Zalando Partner-programmet, der utvalgte partnermerker er selger. Hvem som sender varen fremgår av produktsiden, og forsendelsen kan komme fra partneren i stedet for Zalando.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Zalando passer for deg som vil ha et stort merkevareutvalg innen mote og sko på ett sted, med gratis retur som gjør det trygt å bestille flere størrelser.",
          "Vil du handle fra en norsk aktør eller trenger varen raskt fra norsk lager, er norske kjeder mer aktuelle – leveringstiden oppgis først i kassen.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Zalando oppgir at norske kunder kan betale med kredittkort, PayPal, Vipps, Apple Pay, faktura, forhåndsbetaling og gavekort. Klarna er ikke oppgitt som betalingsmåte. Merk at ikke alle betalingsmåter er tilgjengelige ved hvert kjøp.",
          "Frakten er gratis til hentested ved kjøp over 599 kroner. Leveringsalternativene er standard, prioritert og hjemlevering med PostNord eller Bring, og leveringstiden oppgis i kassen. Zalando SE er registrert i Skatteetatens VOEC-register, så norsk merverdiavgift er inkludert i prisen og varene går gjennom forenklet fortolling.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Du kan returnere ubrukte varer kostnadsfritt innen 30 dager, forutsatt at de er i opprinnelig stand med etikettene på – å prøve varen regnes ikke som bruk. Det samme gjelder varer fra Zalando-partnere: 30 dager, gratis.",
          "Refusjonen skjer etter at returen er mottatt og kontrollert, og en retur kan ta én til tre uker å behandle. Kjøpsavtalen for partnervarer inngås med partneren, men returen håndteres gjennom Zalandos løsning.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om varen selges av Zalando eller en partner – det står på produktsiden og påvirker hvem som sender varen. Kontroller leveringstiden i kassen før du bestiller, og husk at fri frakt-grensen på 599 kroner gjelder levering til hentested.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Zalando før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Zalando – Returpolicy (FAQ)",
        url: "https://www.zalando.no/faq/what-is-your-return-policy.html",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Zalando – Betalingsalternativer (FAQ)",
        url: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
      {
        label: "Zalando – Leveringsalternativer (FAQ)",
        url: "https://www.zalando.no/faq/what-delivery-options-are-available.html",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Zalando – Zalando Partner (FAQ)",
        url: "https://www.zalando.no/faq/Zalando-Partner",
        checkedAt: "2026-07-16",
        supports: ["partnerSales", "returns"],
      },
      {
        label: "Zalando – Firmainformasjon",
        url: "https://www.zalando.no/firmainformasjon/",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
      {
        label: "Skatteetaten – VOEC-registeret",
        url: "https://www.skatteetaten.no/person/avgifter/kjop-fra-utlandet/nettbutikker-og-e-markedsplasser-som-er-registrert-i-voec-registeret/",
        checkedAt: "2026-07-16",
        supports: ["voec"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Stor europeisk moteplattform med bredt merkevareutvalg, gratis 30-dagers retur (også partnervarer) og VOEC-registrert avgiftshåndtering. Vær oppmerksom på at deler av utvalget selges av partnere, og at leveringstiden først oppgis i kassen.",
    editorialPros: [
      "Kostnadsfri retur innen 30 dager – også partnervarer",
      "Fri frakt til hentested over 599 kr",
      "Stort merkevareutvalg innen mote og sko",
      "Norsk mva. i prisen (VOEC-registrert hos Skatteetaten)",
      "Vipps, PayPal og Apple Pay",
    ],
    editorialCons: [
      "Klarna er ikke oppgitt som betalingsmåte",
      "Leveringstid oppgis først i kassen",
      "Deler av utvalget selges av partnere med egen forsendelse",
    ],
    bestFor: ["Stort merkevareutvalg", "Mote og sko", "Gratis retur"],
    notBestFor: ["De som vil handle fra norsk aktør"],
    categories: [
      { main: "klaer-sko-mote", relevance: "primary" },
      { main: "sport-friluft-trening", relevance: "secondary" },
      { main: "utenlandske-nettbutikker", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "primary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/nike/" },
      { name: "Adidas", slug: "adidas", relevance: "primary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/adidas/" },
      { name: "New Balance", slug: "new-balance", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/new-balance/" },
      { name: "Levi's", slug: "levis", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/levis/" },
    ],
    country: "DE",
    isNorwegian: false,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html" },
        paypal: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html" },
        klarna: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html", note: "Faktura tilbys, men Klarna er ikke oppgitt i betalingslisten" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Betaling/what-are-my-payment-options.html" },
      },
      shipping: {
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Frakt-and-leveranse" },
        freeShippingFrom: { value: 599, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/Frakt-and-leveranse", note: "Fri frakt til hentested" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/what-delivery-options-are-available.html", note: "PostNord eller Bring; leveringstid oppgis i kassen" },
      },
      geography: {
        country: { value: "DE", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/firmainformasjon/", note: "Zalando SE, Berlin; norsk mva-nr 913 924 428" },
        isNorwegian: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/firmainformasjon/" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/what-delivery-options-are-available.html", note: "Norsk handleflyt med PostNord/Bring-levering" },
        voec: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.skatteetaten.no/person/avgifter/kjop-fra-utlandet/nettbutikker-og-e-markedsplasser-som-er-registrert-i-voec-registeret/", note: "Zalando SE oppført i registeret med zalando.no" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/what-is-your-return-policy.html", note: "Gjelder også partnervarer" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.zalando.no/faq/what-is-your-return-policy.html" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 83,
    lastChecked: "2026-07-16",
  },
  {
    id: "xxl",
    name: "XXL",
    slug: "xxl",
    websiteUrl: "https://www.xxl.no",
    affiliateSlug: "xxl",
    logo: { src: "/logos/xxl.svg", alt: "XXL", background: "dark" },
    shortDescription:
      "Stor norsk sportskjede med bredt utvalg innen trening, sport, friluft og sko – varehus og nettbutikk.",
    longDescription:
      "XXL er en norsk sportskjede drevet av XXL Sport & Villmark AS, med varehus over hele landet og nettbutikk med bredt utvalg innen sport, trening, friluft, sykkel og sko. Klikk og hent i varehus er gratis og normalt klart innen to timer, og åpent kjøp gjelder i 28 dager. Merk at XXL ikke tilbyr fri frakt, og at retur per post koster 59 kroner for ikke-medlemmer.",
    descriptionSections: [
      {
        heading: "Hva selger XXL?",
        paragraphs: [
          "XXL selger sports- og friluftsutstyr: løpesko og joggesko, treningsklær og -apparater, sykler, ski, jakt- og villmarksutstyr, sportselektronikk og fritidsklær. Kjeden omtaler seg som Nordens største sportskjede og driver både varehus og nettbutikk i Norge.",
          "Sortimentet dekker kjente merkevarer som Nike, Adidas, Asics og Garmin. Selger er XXL Sport & Villmark AS, med hovedkontor i Oslo.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "XXL passer for deg som vil ha et bredt sportsutvalg på ett sted, og som gjerne kombinerer netthandel med varehus – enten for gratis klikk og hent eller for å bytte varer fysisk.",
          "Er du ute etter smal, teknisk friluftsnisje eller spesialtilpasning, kan spesialistbutikker være mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "I nettbutikken kan du betale med kort (Visa og Mastercard), Vipps og XXL-gavekort. Faktura og delbetaling tilbys gjennom Walley og betalingsløsningen XXL Pay – Klarna tilbys ikke.",
          "XXL tilbyr ikke fri frakt. Levering til hentested, pakkeboks (blant annet Instabox og Posten) eller postkasse tar normalt 1–4 virkedager, og hjemlevering på kveldstid tilbys i byene. Store varer leveres på 5–8 virkedager. Klikk og hent i varehus er gratis: varer på lager er normalt klare innen to timer, sykler innen 48 timer. Butikken leverer kun i Norge, ikke til Svalbard.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "XXL gir åpent kjøp i 28 dager fra du mottar varen, i tillegg til den lovfestede angreretten på 14 dager. Varer kan byttes og returneres i alle varehus. Retur per post til nettbutikken koster 59 kroner – medlemmer av kundeklubben XXL Reward har tre gratis returer per tolv måneder.",
          "Angrerett gjelder ikke ammunisjon, registreringspliktige våpen eller tilpassede varer. Prismatch tilbys i kjøpsøyeblikket mot dokumentert lavere pris hos konkurrent. Kundeservice er tilgjengelig på chat og telefon.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Husk at frakt alltid koster – sammenlign fraktprisen med gratis klikk og hent hvis du har et varehus i nærheten. Sjekk returkostnaden på 59 kroner hvis du handler klær eller sko i usikker størrelse uten Reward-medlemskap.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos XXL før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "XXL – Kjøpsbetingelser",
        url: "https://www.xxl.no/faq/betingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "returns", "shipping"],
      },
      {
        label: "XXL – Frakt og levering",
        url: "https://www.xxl.no/kundeservice/frakt-og-levering",
        checkedAt: "2026-07-16",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "XXL – Betaling og gavekort",
        url: "https://xxl.no/faq/betaling",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
      {
        label: "XXL – Retur og bytte",
        url: "https://www.xxl.no/kundeservice/retur-og-bytte",
        checkedAt: "2026-07-16",
        supports: ["returns", "membership"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk sportskjede med bredt utvalg, gratis klikk og hent innen to timer og 28 dagers åpent kjøp med bytte i varehus. Vær oppmerksom på at fri frakt ikke tilbys, og at postretur koster 59 kroner uten Reward-medlemskap.",
    editorialPros: [
      "Gratis klikk og hent, normalt klar innen 2 timer",
      "28 dagers åpent kjøp med bytte og retur i varehus",
      "Bredt utvalg sport, friluft og sko",
      "Prismatch i kjøpsøyeblikket",
      "Vipps og Walley faktura/delbetaling",
    ],
    editorialCons: [
      "Tilbyr ikke fri frakt",
      "Postretur koster 59 kr uten XXL Reward",
      "Tilbyr ikke Klarna",
    ],
    bestFor: ["Bredt sportsutvalg", "Klikk og hent i varehus", "Løpesko og treningsutstyr"],
    notBestFor: ["Smal teknisk friluftsnisje"],
    categories: [
      { main: "sport-friluft-trening", relevance: "primary" },
      { main: "klaer-sko-mote", productType: "sko", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "primary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/sport/loping/lopesko/Nike/c/142010" },
      { name: "Adidas", slug: "adidas", relevance: "primary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/sport/loping/lopesko/Adidas/c/142010" },
      { name: "Asics", slug: "asics", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/sport/loping/lopesko/Asics/c/142010" },
      { name: "Garmin", slug: "garmin", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/search?query=garmin" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling" },
        klarna: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling", note: "Faktura og delbetaling via Walley og XXL Pay – ikke Klarna" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        deliveryDays: { value: 2, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "Oppgitt 1–4 virkedager for de fleste alternativer; store varer 5–8" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "XXL tilbyr ikke fri frakt" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "Kveldslevering 17–21 i byer; store varer med eller uten innbæring" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "Gratis; normalt klar innen 2 timer ved lagervare (sykkel 48 t)" },
        instabox: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "Instabox-skap 1–2 virkedager" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/faq/betingelser", note: "XXL Sport & Villmark AS, Oslo" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/faq/betingelser" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/frakt-og-levering", note: "Leverer kun i Norge, ikke Svalbard" },
      },
      commercial: {
        priceMatch: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/faq/betingelser", note: "Gjelder kun i kjøpsøyeblikket" },
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://xxl.no/faq/betaling" },
      },
      returns: {
        returnWindowDays: { value: 28, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/faq/betingelser", note: "Åpent kjøp 28 dager (lovfestet angrerett 14 dager)" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.xxl.no/kundeservice/retur-og-bytte", note: "59 kr per postretur; gratis i varehus og for XXL Reward (3 per 12 mnd)" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 82,
    lastChecked: "2026-07-16",
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
    logo: { src: "/logos/hm.svg", alt: "H&M", background: "transparent" },
    shortDescription:
      "Internasjonal motekjede med rimelige basisplagg og trendklær for hele familien – norsk nettbutikk og butikker.",
    longDescription:
      "H&M er en internasjonal motekjede der den norske nettbutikken drives av H & M Hennes & Mauritz AS, registrert i Oslo. Sortimentet dekker klær til dame, herre og barn, undertøy, sko og interiør fra H&M HOME. Hent i butikk er gratis; til utleveringssted koster frakten 49,99 kroner, og fri frakt over 499 kroner gjelder kun medlemmer. Returregistrering innen 30 dager, med gebyr for postretur og gratis retur i butikk.",
    descriptionSections: [
      {
        heading: "Hva selger H&M?",
        paragraphs: [
          "H&M selger mote på nett: klær til dame, herre, baby og barn, undertøy, badetøy, sko, accessoirer og interiør fra H&M HOME. Sortimentet består av kjedens egne kolleksjoner, og hm.com selger i tillegg varer fra andre varemerker – blant annet konsernmerkene & Other Stories, ARKET, COS, Monki og Weekday – som kan sendes i separate pakker med egne returregler.",
          "Den norske nettbutikken drives av H & M Hennes & Mauritz AS, org 912 618 900, med forretningskontor i Oslo, og kjeden har butikker over hele landet.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "H&M passer for deg som vil ha rimelige basisplagg og trendmote til hele familien, og som gjerne kombinerer nett og butikk – gratis hent i butikk og gratis butikkretur gjør det enkelt å prøve hjemme og levere tilbake.",
          "Merk at flere fordeler er knyttet til det gratis H&M-medlemskapet: fri frakt over 499 kroner og Klarna-betaling gjelder kun medlemmer.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa, Mastercard og American Express), Vipps, Apple Pay og H&M-gavekort. Klarna-alternativene «Betal nå», «Betal senere» og «Del opp» er eksklusive for H&M-medlemmer. Du må være 18 år for å bestille.",
          "Standardlevering tar 2–5 arbeidsdager. Hent i butikk er gratis med 7 dagers hentefrist; levering til utleveringssted eller pakkeboks koster 49,99 kroner – gratis for medlemmer ved kjøp over 499 kroner. Ekspresslevering koster 79,99 kroner. H&M leverer i Norge til personer over 15 år, men ikke til Svalbard eller Jan Mayen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Du har 30 dager etter levering til å registrere retur – 14 dager for salgsvarer og nedsatte varer. Retur av H&M-varer i butikk er gratis; postretur koster 49,99 kroner, og gebyret øker til 69,99 kroner for kunder med høy returandel over tid.",
          "Varene må være ubrukte med etikettene på. Kosmetikk, undertøy, MAMA-kolleksjonen og enkelte andre varegrupper må returneres per post, badetøy krever intakt hygienestripe, og varer fra andre merker kan ha egne returløp. Varer kjøpt i butikk må returneres i butikk.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om varen selges av H&M eller et annet varemerke – det påvirker forsendelse og retur. Vurder det gratis medlemskapet hvis du handler ofte: uten medlemskap koster frakt til utleveringssted alltid 49,99 kroner. Husk den kortere returfristen på salgsvarer.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos H&M før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "H&M – Betingelser og vilkår",
        url: "https://www2.hm.com/no_no/customer-service/vilkar-sikkerhet/generelle-vilkar.html",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns"],
      },
      {
        label: "H&M – Levering og frakt",
        url: "https://www2.hm.com/no_no/customer-service/levering.html",
        checkedAt: "2026-07-16",
        supports: ["shipping", "clickAndCollect", "membership"],
      },
      {
        label: "H&M – Betalinger",
        url: "https://www2.hm.com/no_no/customer-service/payments.html",
        checkedAt: "2026-07-16",
        supports: ["payments", "membership"],
      },
      {
        label: "H&M – Returpolicy og -metoder",
        url: "https://www2.hm.com/no_no/customer-service/retur.html",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Bred motekjede med gratis hent og retur i butikk og norsk juridisk aktør bak nettbutikken. Vær oppmerksom på at fri frakt over 499 kroner og Klarna kun gjelder medlemmer, at postretur koster 49,99 kroner, og at salgsvarer har 14 dagers returfrist.",
    editorialPros: [
      "Gratis hent i butikk og gratis butikkretur av H&M-varer",
      "30 dagers returregistrering på ordinære varer",
      "Vipps, Apple Pay og Amex",
      "Fri frakt over 499 kr for medlemmer (gratis medlemskap)",
      "Butikker over hele landet",
    ],
    editorialCons: [
      "Frakt til utleveringssted koster 49,99 kr uten medlemskap",
      "Klarna er forbeholdt medlemmer",
      "Postretur koster 49,99 kr (69,99 kr ved høy returandel)",
      "Salgsvarer har kun 14 dagers returfrist",
    ],
    bestFor: ["Rimelige basisplagg", "Trendmote", "Klær til hele familien"],
    notBestFor: ["Premium kvalitet og holdbarhet"],
    categories: [{ main: "klaer-sko-mote", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
        amex: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html", note: "Kun for H&M-medlemmer (gratis medlemskap)" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
      },
      shipping: {
        deliveryDays: { value: 4, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/levering.html", note: "Standardlevering oppgitt til 2–5 arbeidsdager" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/levering.html", note: "49,99 kr til utleveringssted/pakkeboks; fri frakt over 499 kr kun for medlemmer; hent i butikk gratis" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/levering.html" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/levering.html", note: "Gratis standardleveranse til valgt butikk, 7 dagers hentefrist" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/vilkar-sikkerhet/generelle-vilkar.html", note: "H & M Hennes & Mauritz AS, org 912 618 900, Oslo (del av svensk konsern)" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/vilkar-sikkerhet/generelle-vilkar.html" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/levering.html", note: "Ikke Svalbard eller Jan Mayen" },
      },
      commercial: {
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/payments.html" },
      },
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/retur.html", note: "Registrering innen 30 dager; 14 dager for salgsvarer" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www2.hm.com/no_no/customer-service/retur.html", note: "Postretur 49,99 kr (69,99 kr ved høy returandel); gratis i butikk for H&M-varer" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 71,
    lastChecked: "2026-07-16",
  },

  // ───────────────────────── Sport, friluft og trening ───────────────────────
  {
    id: "sport-1",
    name: "Sport 1",
    searchAliases: ["sport1"],
    slug: "sport-1",
    websiteUrl: "https://www.sport1.no",
    affiliateSlug: "sport-1",
    logo: { src: "/logos/sport-1.svg", alt: "Sport 1", background: "light" },
    shortDescription:
      "Norsk sportskjede med sko, sport og friluft fra kjente merker – nettbutikk og lokale butikker over hele landet.",
    longDescription:
      "Sport 1 er en norsk sportskjede der nettbutikken drives av Sport Holding AS på Jessheim, med lokale butikker over hele landet. Utvalget dekker løpesko, klær, sykkel, friluft og vintersport fra merker som Nike, Asics og New Balance. Klikk & hent i butikk er gratis, frakt koster 99 kroner til utleveringssted, og angreretten er 14 dager. Nettbutikkordre leveres normalt på 3–7 virkedager med PostNord.",
    descriptionSections: [
      {
        heading: "Hva selger Sport 1?",
        paragraphs: [
          "Sport 1 selger sportsutstyr på nett: løpesko og joggesko, sports- og fritidsklær, sykkel, friluftsutstyr, vintersport og treningsutstyr. Utvalget spenner fra kjente internasjonale merker som Nike, Asics og New Balance til friluftsmerker som Salomon, Fjällräven og Devold, og kjeden har eget outlet på nett.",
          "Nettbutikken drives av Sport Holding AS, org 924 505 745, på Jessheim, og kjeden har lokale butikker over hele landet med sykkelverksted og utleie flere steder.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Sport 1 passer for deg som vil handle sports- og friluftsutstyr fra en norsk kjede med lokale butikker – enten du bestiller på nett med gratis klikk & hent eller vil ha hjelp i butikk.",
          "Er du primært ute etter lavest mulig pris, kan rene nettaktører og lavpriskjeder være mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kreditt- og debetkort, og gjennom betalingsleverandøren Dintero tilbys flere alternativer, blant annet Klarna.",
          "Frakt til utleveringssted koster 99 kroner per ordre og hjemlevering 149 kroner; ordre sendes med PostNord og leveres normalt på 3–7 virkedager. Sport 1 leverer i hele Norge unntatt Svalbard. Klikk & hent er gratis: du får SMS når varen er klar, og lagervarer holdes av i 48 timer – varer som sendes fra sentrallageret til butikken tar 3–7 dager og holdes av i 24 timer etter ankomstvarsel.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager for nettbutikkordre. Du registrerer returen via lenken i ordrebekreftelsen og leverer pakken på et MyPack-utleveringssted; fraktkostnaden på 99 kroner refunderes ikke ved retur. Klikk & hent-kjøp kan returneres i butikken du hentet i.",
          "Undertøy, badetøy og håndklær kan av hygienehensyn ikke returneres, og det samme gjelder personlig tilpassede produkter. Refusjonen kommer normalt innen 1–2 uker.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Husk at utfrakten ikke refunderes ved retur, og at hygienevarer er unntatt. Bruker du klikk & hent, må du hente innen 48 timer etter SMS – ellers frigis varen.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Sport 1 før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Sport 1 – Kjøpsvilkår",
        url: "https://www.sport1.no/kjopshjelp/kjopsvilkar",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns"],
      },
      {
        label: "Sport 1 – Frakt og levering",
        url: "https://www.sport1.no/kjopshjelp/frakt-og-levering",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Sport 1 – Returer",
        url: "https://www.sport1.no/kjopshjelp/returer",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Sport 1 – Klikk & hent",
        url: "https://www.sport1.no/kjopshjelp/klikk-hent",
        checkedAt: "2026-07-16",
        supports: ["clickAndCollect"],
      },
      {
        label: "Brønnøysundregistrene – Sport Holding AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/924505745",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk sportskjede med gratis klikk & hent, kjente sko- og friluftsmerker og outlet på nett. Vær oppmerksom på at frakt alltid koster 99 kroner og ikke refunderes ved retur, og at Vipps ikke er oppgitt som betalingsmåte.",
    editorialPros: [
      "Gratis klikk & hent i lokale butikker",
      "Bredt utvalg fra Nike, Asics og New Balance",
      "Outlet med nedsatte varer på nett",
      "Lokale butikker med sykkelverksted og utleie",
    ],
    editorialCons: [
      "Ingen fri frakt – 99 kr til utleveringssted",
      "Utfrakten refunderes ikke ved retur",
      "Vipps er ikke oppgitt som betalingsmåte",
      "14 dagers angrerett er lovens minimum",
    ],
    bestFor: ["Norsk sportsbutikk med kjent utvalg", "Løpesko og treningssko", "Klikk og hent"],
    notBestFor: ["Lavest mulig pris"],
    categories: [
      { main: "sport-friluft-trening", productType: "lopesko", relevance: "primary" },
      { main: "sport-friluft-trening", productType: "sykkel", relevance: "secondary" },
      { main: "klaer-sko-mote", productType: "sko", relevance: "secondary" },
    ],
    brands: [
      { name: "Nike", slug: "nike", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/search?query=nike" },
      { name: "Asics", slug: "asics", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/search?query=asics" },
      { name: "New Balance", slug: "new-balance", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/search?query=new%20balance" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/kjopsvilkar", note: "Via betalingsleverandøren Dintero" },
        vipps: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/kjopsvilkar", note: "Kun kort og Klarna via Dintero oppgitt i kjøpsvilkårene" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/kjopsvilkar" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/kjopsvilkar" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/kjopsvilkar" },
      },
      shipping: {
        deliveryDays: { value: 5, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/frakt-og-levering", note: "Nettbutikkordre leveres normalt på 3–7 virkedager" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/frakt-og-levering", note: "99 kr til utleveringssted, 149 kr hjemlevering; klikk & hent gratis" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/frakt-og-levering" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/klikk-hent", note: "Gratis; SMS når klar; lagervarer holdes av i 48 timer" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/924505745", note: "Sport Holding AS, org 924 505 745, Jessheim" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/924505745" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/frakt-og-levering", note: "Ikke Svalbard" },
      },
      commercial: {
        outlet: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kampanjer/outlet" },
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp" },
      },
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/returer", note: "Lovfestet angrerett; hygieneunntak for undertøy, badetøy og håndklær" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.sport1.no/kjopshjelp/returer", note: "Utfrakten på 99 kr refunderes ikke ved retur" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 72,
    lastChecked: "2026-07-16",
  },
  {
    id: "milrab",
    name: "Milrab",
    slug: "milrab",
    websiteUrl: "https://www.milrab.no",
    affiliateSlug: "milrab",
    logo: { src: "/logos/milrab.svg", alt: "Milrab", background: "light" },
    shortDescription:
      "Norsk nettbutikk for friluft, jakt og taktisk utstyr med 30 dagers returrett og prisløfte – sender fra lager i Sverige.",
    longDescription:
      "Milrab er en norsk nettbutikk for sport, friluft, jakt og taktisk utstyr, drevet av Milrab AS i Oslo. Utvalget dekker turutstyr, klær og sko fra merker som Patagonia, med priser som alltid inkluderer mva og toll. Butikken gir 30 dagers bytte- og returrett på ubrukte varer og har prisløfte mot norske nettbutikker. Alle ordre sendes fra lageret i Morgongåva i Sverige, med 1–5 virkedagers normal frakttid.",
    descriptionSections: [
      {
        heading: "Hva selger Milrab?",
        paragraphs: [
          "Milrab selger utstyr til tur og uteliv på nett: friluftsklær og -utstyr, jakt- og taktisk utstyr, sko, sekker og tilbehør. Butikken fører kjente merkevarer – blant annet Patagonia med flere hundre produkter – og kjører løpende kampanjer og «deals».",
          "Nettbutikken drives av Milrab AS, org 997 595 262, med adresse i Oslo. Alle ordre sendes fra selskapets lager i Morgongåva i Sverige, men prisene inkluderer alltid mva og tollavgifter, så du betaler ikke noe ekstra ved grensen.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Milrab passer for deg som skal ha robust tur-, jakt- eller treningsutstyr og vil ha 30 dagers returrett og prisløfte: finner du samme vare billigere på lager i en annen norsk nettbutikk, justerer Milrab prisen – før og inntil 30 dager etter kjøp.",
          "Butikken har ikke fysiske utsalg, og siden ordrene sendes fra Sverige, bør du ikke velge Milrab hvis du trenger varen på dagen.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Betalingen går gjennom Klarna, med kortbetaling, faktura med 30 dagers frist og delbetaling.",
          "Ordrene sendes med Bring (2–5 virkedager) eller Helthjem (1–4 virkedager) til hentested, pakkeboks eller døren; normal frakttid er 1–5 virkedager, og fraktprisen vises i kassen. Siden pakkene sendes fra Sverige, skal de gjennom tollbehandling før sporingen oppdateres i Norge – dette tar normalt 1–2 virkedager ekstra i sporingen. Milrab leverer ikke til Svalbard eller Jan Mayen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Milrab gir 30 dagers bytte-, retur- og angrerett på ubrukte varer, i tillegg til den lovfestede angreretten på 14 dager. Returen registrerer du på nett og betaler selv – returetiketten koster fast 69 kroner. Varen må være i originalemballasje med merkelapper intakt; sko kan prøves inne, men ikke brukes ute.",
          "Undertøy, strømpebukser og ørepropper kan av hygienehensyn ikke returneres. Uavhentede pakker belastes med 99 kroner pluss frakt tur/retur. Merk at ordre ikke kan endres eller kanselleres etter fullføring, fordi lageret er automatisert.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk størrelsen nøye før du bestiller – ordren kan ikke endres etterpå, og retur koster 69 kroner. Ta vare på originalemballasjen hvis du kan komme til å returnere, og husk at brukte varer bare refunderes med redusert verdi.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Milrab før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Milrab – Kjøpsvilkår",
        url: "https://www.milrab.no/kjopsvilkar",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "priceMatch"],
      },
      {
        label: "Milrab – Frakt og levering",
        url: "https://www.milrab.no/frakt-og-levering",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Brønnøysundregistrene – Milrab AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/997595262",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Norsk frilufts- og jaktspesialist med 30 dagers returrett, prisløfte mot norske nettbutikker og Klarna-betaling. Vær oppmerksom på at alt sendes fra lager i Sverige, at retur koster 69 kroner, og at ordre ikke kan endres etter bestilling.",
    editorialPros: [
      "30 dagers bytte- og returrett på ubrukte varer",
      "Prisløfte mot norske nettbutikker i 30 dager",
      "Priser inkluderer alltid mva og toll",
      "Bredt utvalg fra merker som Patagonia",
    ],
    editorialCons: [
      "Sender fra Sverige – tollbehandling gir tregere sporing",
      "Returetikett koster 69 kr",
      "Ordre kan ikke endres eller kanselleres etter fullføring",
      "Vipps er ikke oppgitt som betalingsmåte",
    ],
    bestFor: ["Turutstyr og friluft", "Robuste produkter", "Jakt og uteliv"],
    notBestFor: ["Mote og bylivsklær", "Levering på dagen"],
    categories: [{ main: "sport-friluft-trening", productType: "friluft", relevance: "primary" }],
    brands: [
      { name: "Patagonia", slug: "patagonia", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/search?query=patagonia" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "Kort, faktura 30 dager og delbetaling via Klarna" },
        vipps: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "Kun Klarna-betalingsmåter oppgitt i kjøpsvilkårene" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar" },
      },
      shipping: {
        deliveryDays: { value: 3, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "Normal frakttid 1–5 virkedager; sendes fra lager i Sverige" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/frakt-og-levering", note: "Fraktpris etter postnummer og pakkestørrelse, vises i kassen" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/frakt-og-levering", note: "Helthjem til døren der det er tilgjengelig" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/997595262", note: "Milrab AS, org 997 595 262, Oslo; lager i Morgongåva i Sverige" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/997595262" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/frakt-og-levering", note: "Ikke Svalbard eller Jan Mayen" },
      },
      commercial: {
        priceMatch: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "Identisk SKU på lager i norsk nettbutikk; gjelder i 30 dager; ikke elektronikk/profilering eller med rabattkode" },
      },
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "30 dagers bytte-/returrett på ubrukte varer (lovfestet angrerett 14 dager); hygieneunntak" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.milrab.no/kjopsvilkar", note: "Fast returfrakt 69 kr betales av kunden" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 75,
    lastChecked: "2026-07-16",
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
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/terms", note: "Fjellsport AS, org 989 710 338, Sandefjord" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/terms" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.fjellsport.no/faq/levering", note: "Hele Norge; Svalbard med tillegg, ikke Jan Mayen" },
      },
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
    logo: { src: "/logos/vita.svg", alt: "VITA", background: "transparent" },
    shortDescription:
      "Norsk skjønnhetskjede med sminke, hudpleie, hårpleie og parfyme – butikker over hele landet og nettbutikk.",
    longDescription:
      "VITA er en norsk skjønnhetskjede drevet av VITA Group AS, med butikker over hele landet og nettbutikk for sminke, hudpleie, hårpleie, parfyme og velværeprodukter. Nettbutikken har fri frakt over 299 kroner, gratis retur med Helthjem-returlapp og klikk og hent i butikk som normalt er klart etter 30 minutter. Kundeklubben VITA Venn er gratis og gir bonus og medlemstilbud.",
    descriptionSections: [
      {
        heading: "Hva selger VITA?",
        paragraphs: [
          "VITA selger skjønnhetsprodukter på nett: sminke, hudpleie, hårpleie, parfyme og velværeprodukter fra kjente merkevarer – blant annet The Ordinary, som har egen merkeside. Nettbutikken drives av VITA Group AS, som også driver de fysiske VITA-butikkene.",
          "Kundeklubben VITA Venn er gratis og gir bonus på kjøp og egne medlemstilbud. Medlemskapet er en fordelsordning – kjøpsvilkårene er de samme for alle.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "VITA passer for deg som handler sminke, hudpleie og parfyme og vil kombinere nett og butikk – enten med rask klikk og hent eller gratis retur hjemmefra. Den lave fri frakt-grensen gjør butikken praktisk også for små bestillinger.",
          "Er du ute etter apotekvarer eller reseptpliktige produkter, er apotekene mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa og Mastercard), Vipps, Klarna og Apple Pay. Du må være 18 år for å handle i nettbutikken.",
          "Frakten er gratis på ordre over 299 kroner. VITA sender med Helthjem, Bring, PostNord og Widerøe, med oppgitt leveringstid på 1–5 virkedager avhengig av metode og adresse. Klikk og hent i butikk er normalt klart etter 30 minutter når varene er på lager.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager, og VITA tilbyr gratis retur: du får en portofri Helthjem-returlapp på e-post innen én virkedag. Varen må være ubrukt og i original, uskadd indre emballasje.",
          "Kosmetikk og forseglede hygieneprodukter kan ikke returneres hvis forseglingen er brutt. Merk at klikk og hent-bestillinger håndteres av butikken du hentet i, ikke av nettbutikkens returløsning.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk om forseglingen må være intakt for varen du vurderer å returnere, og husk at klikk og hent-kjøp følges opp i butikken. Leveringstiden varierer med adresse – den vises i kassen.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos VITA før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "VITA – Salgs- og leveringsbetingelser",
        url: "https://www.vita.no/salgs--og-leveringsbetingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "VITA – Frakt og retur",
        url: "https://www.vita.no/fraktinfo",
        checkedAt: "2026-07-16",
        supports: ["shipping", "returns"],
      },
      {
        label: "VITA – Klikk og hent",
        url: "https://www.vita.no/klik--hent",
        checkedAt: "2026-07-16",
        supports: ["clickAndCollect"],
      },
      {
        label: "VITA – Om VITA Venn",
        url: "https://vita.no/om-club-vita",
        checkedAt: "2026-07-16",
        supports: ["membership"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk skjønnhetskjede med fri frakt over 299 kroner, gratis Helthjem-retur og klikk og hent på 30 minutter. Vær oppmerksom på at brutt forsegling fjerner returretten på kosmetikk, og at klikk og hent-kjøp håndteres av butikken.",
    editorialPros: [
      "Fri frakt over 299 kr",
      "Gratis retur med portofri Helthjem-returlapp",
      "Klikk og hent normalt klart etter 30 minutter",
      "Vipps, Klarna og Apple Pay",
      "Gratis kundeklubb med bonus (VITA Venn)",
    ],
    editorialCons: [
      "Brutt forsegling fjerner returretten på kosmetikk",
      "Klikk og hent-kjøp kan ikke returneres via nettbutikkens returløsning",
      "14 dagers angrerett er lovens minimum",
    ],
    bestFor: ["Sminke og hudpleie", "Kjente skjønnhetsmerker", "Klikk og hent"],
    notBestFor: ["Apotekvarer og resept"],
    categories: [{ main: "helse-skjonnhet-apotek", productType: "sminke", relevance: "primary" }],
    brands: [
      { name: "The Ordinary", slug: "the-ordinary", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/merker" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        deliveryDays: { value: 3, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/fraktinfo", note: "Oppgitt 1–5 virkedager avhengig av metode og adresse" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/fraktinfo" },
        freeShippingFrom: { value: 299, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/fraktinfo" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/fraktinfo", note: "Helthjem-levering over natten" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/klik--hent", note: "Normalt klart etter 30 minutter ved lagervare" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser", note: "VITA Group AS, org 923 592 784, Oslo" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/salgs--og-leveringsbetingelser" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/fraktinfo" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/retur", note: "Lovfestet angrerett; brutt forsegling fjerner returretten på kosmetikk" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.vita.no/retur", note: "Portofri Helthjem-returlapp tilsendt på e-post" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 79,
    lastChecked: "2026-07-16",
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
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/kjopsbetingelser", note: "Apotek 1 Gruppen AS, org 983 044 778, Lørenskog" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/kjopsbetingelser" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-14", sourceUrl: "https://www.apotek1.no/kundesenter/frakt-og-levering", note: "Sender kun til adresser i Norge, ikke Svalbard" },
      },
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
    logo: { src: "/logos/blivakker.svg", alt: "Blivakker.no", background: "transparent" },
    shortDescription:
      "Norsk nettbutikk for sminke, hudpleie og hårpleie, med lager og butikker i Kristiansand-området.",
    longDescription:
      "Blivakker er en norsk skjønnhetsnettbutikk drevet av Blivakker.no AS i Kristiansand. Sortimentet dekker sminke, hudpleie, hårpleie og parfyme, med The Ordinary blant merkevarene. Du kan betale med Vipps, kort eller BlivakkerPay faktura og delbetaling, og velge postkasse, hentested eller henting i Blivakker-butikk. Angreretten er 14 dager, og returfrakten betaler du selv.",
    descriptionSections: [
      {
        heading: "Hva selger Blivakker?",
        paragraphs: [
          "Blivakker selger skjønnhetsprodukter på nett: sminke, hudpleie, hårpleie, parfyme og tilbehør. Butikken fører kjente merkevarer som The Ordinary, som har egen merkeside, og omtaler seg som Norges største skjønnhetsbutikk på nett.",
          "Nettbutikken drives av Blivakker.no AS, registrert i Kristiansand, der selskapet også har lager. Kundeklubben Blivakker FOR YOU gir poeng og medlemstilbud.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Blivakker passer for deg som handler skjønnhetsprodukter på nett og vil ha et bredt utvalg fra norsk lager, med rask levering i 1–3 virkedager etter registrert betaling.",
          "Vil du prøve produkter fysisk før kjøp, er butikkutvalget begrenset utenfor Kristiansand-området.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Vipps, kort (Visa og Mastercard med 3D Secure) samt faktura med 30 dagers frist og delbetaling gjennom BlivakkerPay. Bindende kjøp krever at du er 15 år; kredittkjøp krever 18 år.",
          "Du kan velge brevpakke i postkassen, servicepakke til hentested eller henting i Blivakker-butikk med pakkeautomat. Fraktkostnaden avhenger av leveringsmåte og handlekurv, og vises i kassen. Leveringstiden er oppgitt til 1–3 virkedager etter registrert betaling.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Angreretten gjelder i 14 dager fra du mottar varen, og returkostnadene betaler du selv. Varen må være i vesentlig samme stand, og angreretten gjelder ikke varer der forsegling eller emballasje er brutt og som av hygienehensyn ikke kan selges på nytt.",
          "Uavhentede pakker belastes med 200 kroner i gebyr pluss 59 kroner i returfrakt. Kundeservice nås via kontaktskjema og telefon.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Husk at brutt forsegling fjerner returretten på hygieneprodukter, at returfrakt betales av deg, og at uavhentede pakker koster gebyr. Sjekk fraktprisen for din leveringsmåte i kassen.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Blivakker før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Blivakker – Brukerbetingelser",
        url: "https://www.blivakker.no/kundesenter/brukerbetingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Blivakker – Kundeklubb (FOR YOU)",
        url: "https://www.blivakker.no/kundesenter/kundeklubb",
        checkedAt: "2026-07-16",
        supports: ["membership"],
      },
      {
        label: "Brønnøysundregistrene – Blivakker.no AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/993563773",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Bred norsk skjønnhetsnettbutikk med rask levering fra eget lager og fleksibel betaling via Vipps og BlivakkerPay. Vær oppmerksom på at returfrakten betales av kunden, og at brutt forsegling fjerner returretten på hygieneprodukter.",
    editorialPros: [
      "Bredt skjønnhetsutvalg fra norsk lager",
      "Oppgitt leveringstid 1–3 virkedager",
      "Vipps og BlivakkerPay faktura/delbetaling",
      "Henting i Blivakker-butikk med pakkeautomat",
      "Gratis kundeklubb med poeng (FOR YOU)",
    ],
    editorialCons: [
      "Returfrakt betales av kunden",
      "Uavhentede pakker koster 200 kr + returfrakt",
      "Klarna er ikke oppgitt som betalingsmåte",
    ],
    bestFor: ["Bredt skjønnhetsutvalg", "Rask levering fra norsk lager", "Hudpleie og sminke"],
    notBestFor: ["Fysisk prøving utenfor Kristiansand-området"],
    categories: [{ main: "helse-skjonnhet-apotek", productType: "hudpleie", relevance: "primary" }],
    brands: [
      { name: "The Ordinary", slug: "the-ordinary", relevance: "primary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/merker/the-ordinary" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Kort oppgitt som Visa og Mastercard; faktura/delbetaling via BlivakkerPay" },
      },
      shipping: {
        deliveryDays: { value: 2, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Oppgitt 1–3 virkedager etter registrert betaling" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Fraktpris avhenger av leveringsmåte og handlekurv, vises i kassen" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Brevpakke i postkassen" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Henting i Blivakker-butikk med pakkeautomat" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/993563773", note: "Blivakker.no AS, org 993 563 773, Kristiansand" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/993563773" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser", note: "Lovfestet angrerett; hygieneunntak ved brutt forsegling" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.blivakker.no/kundesenter/brukerbetingelser" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 77,
    lastChecked: "2026-07-16",
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
    logo: { src: "/logos/jollyroom.svg", alt: "Jollyroom", background: "transparent" },
    shortDescription:
      "Norskregistrert nettbutikk for baby- og barneutstyr med alt fra vogner og bilstoler til klær og leker.",
    longDescription:
      "Jollyroom er en nettbutikk for baby- og barneutstyr, drevet av norskregistrerte Jollyroom AS og del av et nordisk konsern med hovedsete i Sverige. Sortimentet dekker barnevogner, bilstoler, barneklær, leker og interiør, med fri frakt over 1200 kroner og 365 dagers åpent kjøp på uåpnede varer. Merk at returfrakt koster fra 49 til 699 kroner avhengig av varens størrelse.",
    descriptionSections: [
      {
        heading: "Hva selger Jollyroom?",
        paragraphs: [
          "Jollyroom selger utstyr til barnefamilien: barnevogner, bilstoler, barneklær og -sko, leker, barneromsinteriør, babyutstyr og produkter til mor. Butikken fører kjente merkevarer som blant annet LEGO, Britax, Maxi-Cosi og Cybex, og omtaler seg som Nordens største nettbutikk for barn og baby.",
          "Nettbutikken drives av Jollyroom AS, registrert i Norge, og inngår i et nordisk konsern med hovedsete i Sverige. Selskapet ble etablert i 2010 og har også fysiske butikker, blant annet i Oslo.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Jollyroom passer for deg som vil handle bredt til baby og barn på ett sted – fra vogn og bilstol til klær og leker – og som verdsetter den lange åpent kjøp-perioden på uåpnede varer.",
          "Skal du prøve og sammenligne vogner eller bilstoler fysisk før kjøp, er utvalget av egne butikker begrenset; sjekk om en av butikkene er i nærheten.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med Vipps, kort (Visa og Mastercard med 3D Secure) samt faktura og delbetaling gjennom Jollyroompay – Klarna tilbys ikke. Du må være 18 år og ha gyldig norsk legitimasjon for å handle.",
          "Frakten er gratis på ordre over 1200 kroner for standard leveringsmåter. Under grensen koster pakkeboks med PostNord 79 kroner og hjemlevering 149 kroner for pakker under 20 kilo; store varer som vogner og møbler har egne fraktpriser. Leveringstiden beregnes i kassen. Jollyroom leverer ikke til Svalbard.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Jollyroom gir 365 dagers åpent kjøp på uåpnede varer, i tillegg til den lovfestede angreretten på 14 dager. Returfrakten betaler du selv: 49 kroner for klær og sko, 99 kroner for småvarer, 299 kroner for tunge varer og 699 kroner for pallegods. Hygieneprodukter er unntatt angrerett.",
          "Varene har ett års garanti mot fabrikasjonsfeil, og reklamasjonsretten følger forbrukerkjøpsloven med to eller fem år. Transportskader bør meldes innen én til tre dager etter levering.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk returkostnaden for varetypen du bestiller – særlig for store varer, der returfrakten kan bli 299 til 699 kroner. Husk at åpent kjøp forutsetter uåpnet vare, og kontroller leveringstiden i kassen. For bilstoler og annet sikkerhetsutstyr bør du kontrollere produktinformasjon og godkjenninger hos produsenten før kjøp.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Jollyroom før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Jollyroom – Kjøpsvilkår",
        url: "https://www.jollyroom.no/kundeservice/kjopsvilkar",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Jollyroom – Levering",
        url: "https://www.jollyroom.no/kundeservice/levering",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Jollyroom – Angrerett, retur og garanti",
        url: "https://www.jollyroom.no/kundeservice/angrerett-retur-og-garanti",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Jollyroom – Handle og betale",
        url: "https://www.jollyroom.no/kundeservice/handle-og-betale",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
      {
        label: "Brønnøysundregistrene – Jollyroom AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/995738279",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Bred baby- og barnebutikk drevet av norskregistrert selskap, med fri frakt over 1200 kroner og 365 dagers åpent kjøp på uåpnede varer. Vær oppmerksom på at returfrakten koster 49–699 kroner avhengig av varens størrelse, og at Klarna ikke tilbys.",
    editorialPros: [
      "365 dagers åpent kjøp på uåpnede varer",
      "Fri frakt over 1200 kr",
      "Bredt sortiment til baby og barn på ett sted",
      "Norskregistrert selskap med norske vilkår og Vipps",
      "Fører LEGO, Britax, Maxi-Cosi og andre kjente merker",
    ],
    editorialCons: [
      "Returfrakt betales av kunden: 49–699 kr etter størrelse",
      "Tilbyr ikke Klarna – faktura via Jollyroompay",
      "Leveringstid oppgis først i kassen",
    ],
    bestFor: ["Babyutstyr og barnevogn", "Bredt sortiment", "Alt på ett sted"],
    notBestFor: ["Fysisk prøving utenfor butikkbyene"],
    categories: [
      { main: "baby-barn-leker", productType: "babyutstyr", relevance: "primary" },
    ],
    brands: [
      { name: "LEGO", slug: "lego", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale" },
        klarna: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale", note: "Faktura og delbetaling via Jollyroompay (Avarda) – ikke Klarna" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/handle-og-betale", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/levering" },
        freeShippingFrom: { value: 1200, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/levering", note: "Gjelder standard leveringsmåter" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/levering", note: "149 kr under 20 kg; store varer har egne priser" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/995738279", note: "Jollyroom AS, org 995 738 279; del av nordisk konsern med hovedsete i Sverige" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/995738279" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/levering", note: "Leverer ikke til Svalbard" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 365, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/angrerett-retur-og-garanti", note: "365 dagers åpent kjøp for uåpnede varer (lovfestet angrerett 14 dager)" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.jollyroom.no/kundeservice/angrerett-retur-og-garanti", note: "Returfrakt 49–699 kr avhengig av varetype" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 73,
    lastChecked: "2026-07-16",
  },
  {
    id: "barnas-hus",
    name: "Barnas Hus",
    slug: "barnas-hus",
    websiteUrl: "https://www.barnashus.no",
    affiliateSlug: "barnas-hus",
    logo: { src: "/logos/barnas-hus.svg", alt: "Barnas Hus", background: "transparent" },
    shortDescription:
      "Norsk kjede for baby- og barneutstyr med butikker over hele landet, fri frakt over 1000 kr og klikk & hent på 2 timer.",
    longDescription:
      "Barnas Hus er en norsk kjede for baby- og barneutstyr der nettbutikken drives av Barnas Hus Norge AS. Sortimentet dekker barnevogner, bilstoler, barneklær og utstyr til babyrommet. Nettbutikken har fri frakt over 1000 kroner, klikk & hent på 2 timer i alle butikker og 30 dagers åpent kjøp – 100 dager for medlemmer av kundeklubben. Bilstoler har 14 dagers returfrist, og postretur koster fra 69 kroner.",
    descriptionSections: [
      {
        heading: "Hva selger Barnas Hus?",
        paragraphs: [
          "Barnas Hus selger baby- og barneutstyr på nett: barnevogner, bilstoler, barneklær, møbler og utstyr til babyrommet, ammeprodukter og leker. Kjeden profilerer seg på rådgivning i butikk, blant annet om bilstoler og vogntilpasning.",
          "Nettbutikken drives av Barnas Hus Norge AS, org 988 603 880, med nettbutikkavdeling i Vestby og butikker over hele landet. Kundeklubben er gratis og gir blant annet utvidet åpent kjøp.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Barnas Hus passer for småbarnsforeldre som vil kombinere nettbutikk med fysisk butikk – enten for rask klikk & hent, bytte i butikk eller rådgivning før større kjøp som bilstol og vogn.",
          "Er du primært ute etter lavest mulig pris på enkeltvarer, kan rene nettaktører være billigere.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa og Mastercard), Vipps og faktura eller delbetaling via Klarna. Du må være 18 år for å handle i nettbutikken.",
          "Frakten er gratis på ordre over 1000 kroner med Posten servicepakke – ellers koster den 79 kroner, og hjemlevering på døren 179 kroner. Pakker har 7 dagers hentefrist, som kan utvides til 14 dager. Klikk & hent er gratis og klar på 2 timer i alle butikker; du betaler ved henting, og reservasjonen gjelder ut neste virkedag. Barnas Hus leverer kun til Fastlands-Norge – ikke Svalbard eller Jan Mayen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Barnas Hus gir 30 dagers åpent kjøp på ubrukte varer i originalemballasje med merkelapper – 100 dager for kundeklubbmedlemmer, men bare 14 dager for bilstoler. Den lovfestede angreretten på 14 dager gjelder i tillegg for nettkjøp, med returfrakt betalt av kunden.",
          "Du kan returnere og bytte i alle butikker, eller sende i posten via returportalen for 69 kroner (299 kroner over 20 kilo). Hygieneartikler som ammeputer, stellematter, badebaljer, ammepumper, badetøy og undertøy byttes ikke, og outlet-varer og spesialbestillinger kan ikke returneres. Refusjonen kommer normalt innen 5 virkedager.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Husk den korte returfristen på bilstoler, og at åpnet originalemballasje begrenser returretten etter 14 dager. Meld deg inn i kundeklubben før kjøp hvis du vil ha 100 dagers åpent kjøp, og sjekk om varen din er unntatt som hygieneartikkel.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Barnas Hus før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Barnas Hus – Salgsbetingelser",
        url: "https://www.barnashus.no/salgsbetingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "Barnas Hus – Frakt og levering",
        url: "https://www.barnashus.no/frakt-og-levering",
        checkedAt: "2026-07-16",
        supports: ["shipping", "clickAndCollect"],
      },
      {
        label: "Barnas Hus – Retur og reklamasjon",
        url: "https://www.barnashus.no/retur-og-reklamasjon",
        checkedAt: "2026-07-16",
        supports: ["returns", "membership"],
      },
      {
        label: "Brønnøysundregistrene – Barnas Hus Norge AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/988603880",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk barneutstyrskjede med fri frakt over 1000 kroner, klikk & hent på 2 timer og 30 dagers åpent kjøp – 100 dager for medlemmer. Vær oppmerksom på at bilstoler kun har 14 dagers returfrist, at hygieneartikler ikke byttes, og at postretur koster fra 69 kroner.",
    editorialPros: [
      "Fri frakt over 1000 kr",
      "Klikk & hent på 2 timer i alle butikker",
      "30 dagers åpent kjøp – 100 dager for medlemmer",
      "Vipps og Klarna",
      "Bytte og retur i butikker over hele landet",
    ],
    editorialCons: [
      "Bilstoler har kun 14 dagers returfrist",
      "Postretur koster 69 kr (299 kr over 20 kg)",
      "Hygieneartikler og outlet-varer kan ikke returneres/byttes",
      "Leverer kun til Fastlands-Norge",
    ],
    bestFor: ["Trygg norsk barnehandel", "Bilstoler og vogner", "Rådgivning"],
    notBestFor: ["Lavest pris"],
    categories: [{ main: "baby-barn-leker", productType: "babyutstyr", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/", note: "Betalingslogoer på nettsiden: Vipps, Klarna, Visa, Mastercard" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/salgsbetingelser", note: "Faktura og delbetaling via Klarna" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/salgsbetingelser" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/salgsbetingelser" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/salgsbetingelser" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/", note: "Kort vist som Visa og Mastercard" },
      },
      shipping: {
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/frakt-og-levering", note: "Gjelder Posten servicepakke; under grensen 79 kr, hjemlevering 179 kr" },
        freeShippingFrom: { value: 1000, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/frakt-og-levering" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/frakt-og-levering", note: "På Døren-levering, 179 kr" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/frakt-og-levering", note: "Gratis; klar på 2 timer; betaling ved henting; reservasjonen gjelder ut neste virkedag" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/988603880", note: "Barnas Hus Norge AS, org 988 603 880; nettbutikkavdeling i Vestby" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/988603880" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/salgsbetingelser", note: "Kun Fastlands-Norge" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/retur-og-reklamasjon", note: "30 dagers åpent kjøp (100 dager for medlemmer, 14 dager for bilstoler); lovfestet angrerett 14 dager" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.barnashus.no/retur-og-reklamasjon", note: "Gratis i butikk; postretur 69 kr (299 kr over 20 kg)" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 78,
    lastChecked: "2026-07-16",
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
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/om-oss", note: "Lekekassen AS, Grimstad" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/om-oss" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-13", sourceUrl: "https://www.lekekassen.no/betingelser", note: "Leverer til fastlands-Norge, ikke Svalbard/Jan Mayen" },
      },
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
    logo: { src: "/logos/musti.svg", alt: "Musti", background: "transparent" },
    shortDescription:
      "Norsk dyrebutikkjede med fôr, utstyr og tilbehør til hund, katt og smådyr – butikker og nettbutikk.",
    longDescription:
      "Musti er en norsk dyrebutikkjede drevet av Musti Norge AS, del av det nordiske Musti Group. Nettbutikken selger fôr, utstyr og tilbehør til hund, katt og smådyr, med fri frakt over 599 kroner, 30 dagers åpent kjøp og gratis retur med Mustis returskjema. Bestillinger kan også hentes gratis i butikk, og faste fôrleveranser kan settes opp som abonnement.",
    descriptionSections: [
      {
        heading: "Hva selger Musti?",
        paragraphs: [
          "Musti selger dyreutstyr på nett: fôr, godbiter, senger, bur, leker og pleieprodukter til hund, katt og smådyr. Butikken fører kjente fôrmerker som Royal Canin, og tilbyr abonnement på fôr og godbiter med faste leveranser.",
          "Nettbutikken drives av Musti Norge AS, som også driver fysiske dyrebutikker over hele landet og inngår i det nordiske Musti Group med hovedsete i Finland.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Musti passer for deg som har hund, katt eller smådyr og vil kombinere netthandel med butikker i nærheten – enten for gratis klikk og hent eller rådgivning i butikk. Abonnementsordningen passer ved fast fôrforbruk.",
          "Har du eksotiske kjæledyr, er utvalget mer begrenset.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort, faktura eller delbetaling gjennom Klarna, samt Musti-gavekort. Vipps er ikke oppgitt som betalingsmåte i nettbutikken.",
          "Frakten er gratis på ordre over 599 kroner; under grensen koster standardfrakt fra 39 kroner. Musti sender med Bring, og du kan velge hjemlevering på dag- eller kveldstid, hentested eller pakkeboks. Bestillinger behandles innen 48 timer på hverdager, med 2–6 virkedagers transporttid. Klikk og hent i butikk er gratis: send til butikk tar 3–6 dager, eller du kan reservere varer som er på lager og hente innen to timer.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Musti gir 30 dagers åpent kjøp på musti.no. Bruker du Mustis returskjema, dekker Musti returfrakten – returer utenom skjemaet betaler du selv. Returer behandles innen ti arbeidsdager, og refusjonen skjer til samme betalingsmåte.",
          "Den lovfestede angreretten på 14 dager gjelder i tillegg. Kundeservice er tilgjengelig på e-post og telefon på hverdager.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Bruk Mustis returskjema hvis du skal returnere – ellers må du dekke returfrakten selv. Sjekk om ordren når fri frakt-grensen på 599 kroner, og om varen kan reserveres for henting i din lokale butikk i stedet.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Musti før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Musti – Kjøpsbetingelser",
        url: "https://www.musti.no/kjopsvilkar",
        checkedAt: "2026-07-16",
        supports: ["company", "returns"],
      },
      {
        label: "Musti – Betaling og leveranse",
        url: "https://www.musti.no/betaling-og-leveranse",
        checkedAt: "2026-07-16",
        supports: ["payments", "shipping", "clickAndCollect"],
      },
      {
        label: "Musti – Retur",
        url: "https://www.musti.no/retur",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Musti – Abonnementsvilkår",
        url: "https://www.musti.no/abonnement-vilkar",
        checkedAt: "2026-07-16",
        supports: ["subscriptions"],
      },
      {
        label: "Brønnøysundregistrene – Musti Norge AS",
        url: "https://data.brreg.no/enhetsregisteret/api/enheter/915886949",
        checkedAt: "2026-07-16",
        supports: ["company"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk dyrebutikkjede med fri frakt over 599 kroner, gratis retur via returskjema, gratis klikk og hent og abonnement på fôr. Vær oppmerksom på at Vipps ikke er oppgitt som betalingsmåte, og at retur utenom returskjemaet koster frakt.",
    editorialPros: [
      "Fri frakt over 599 kr",
      "Gratis retur med Mustis returskjema",
      "Gratis klikk og hent – reserver og hent innen 2 timer ved lagervare",
      "Abonnement på fôr og godbiter",
      "Butikker over hele landet",
    ],
    editorialCons: [
      "Vipps er ikke oppgitt som betalingsmåte",
      "Retur utenom returskjemaet betales av kunden",
      "Standardfrakt fra 39 kr under 599 kr",
    ],
    bestFor: ["Hunde- og kattefôr", "Bredt dyreutvalg", "Klikk og hent"],
    notBestFor: ["Eksotiske dyr"],
    categories: [{ main: "dyr-kjaeledyr", productType: "hund", relevance: "primary" }],
    brands: [
      { name: "Royal Canin", slug: "royal-canin", relevance: "secondary", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/royal-canin" },
    ],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse", note: "Faktura, delbetaling og kortbetaling via Klarna" },
      },
      shipping: {
        deliveryDays: { value: 4, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse", note: "Behandling innen 48 t + 2–6 virkedager med Bring" },
        shippingType: { value: "free_over_amount", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse" },
        freeShippingFrom: { value: 599, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse", note: "Under grensen koster standardfrakt fra 39 kr" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse", note: "Dag- eller kveldslevering, med eller uten signatur" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse", note: "Gratis; send til butikk 3–6 dager, eller reserver lagervare og hent innen 2 timer" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/915886949", note: "Musti Norge AS, org 915 886 949, Oslo; del av Musti Group" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://data.brreg.no/enhetsregisteret/api/enheter/915886949" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse" },
      },
      commercial: {
        subscription: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/abonnement-vilkar", note: "Faste leveranser av fôr og godbiter" },
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/betaling-og-leveranse" },
      },
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/retur", note: "30 dagers åpent kjøp (lovfestet angrerett 14 dager)" },
        freeReturns: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.musti.no/retur", note: "Gratis med Mustis returskjema; ellers betaler kunden returfrakt" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 77,
    lastChecked: "2026-07-16",
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
    logo: { src: "/logos/jysk.svg", alt: "JYSK", background: "transparent" },
    shortDescription:
      "Skandinavisk kjede for senger, madrasser, møbler og interiør. Norsk nettbutikk og varehus over hele landet.",
    longDescription:
      "JYSK er en skandinavisk kjede der den norske virksomheten drives av JYSK AS, registrert i Oslo. Nettbutikken selger senger, madrasser, møbler, tekstiler, oppbevaring og hagemøbler. Ubrukte varer med kvittering kan returneres uten tidsfrist, og Click & Collect lar deg reservere på nett og hente og betale i butikk innen 30 minutter. Småpakker og store varer har egne fraktpriser som varierer med postnummer.",
    descriptionSections: [
      {
        heading: "Hva selger JYSK?",
        paragraphs: [
          "JYSK selger varer til hjemmet: senger, madrasser, dyner og puter, møbler, gardiner og tekstiler, oppbevaring, baderomstilbehør og hagemøbler. Kjeden ble etablert i Danmark i 1979, og den norske virksomheten drives av JYSK AS med varehus over hele landet.",
          "Sortimentet består i hovedsak av kjedens egne produktserier – profilen fører derfor ingen egen merkevareliste.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "JYSK passer for deg som skal ha seng, madrass eller rimelige møbler og interiørvarer, og som gjerne kombinerer nettbutikk med varehus – enten via gratis Click & Collect-reservasjon eller retur i butikk.",
          "Er du ute etter designmøbler i premiumsegmentet, er spesialiserte møbelbutikker mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa og Mastercard), Vipps, Klarna faktura, JYSK-konto og gavekort. Du må være over 18 år for å handle på jysk.no.",
          "Småpakker sendes med PostNord til hentested fra 89,95 kroner, med hjemlevering mot tillegg og oppgitt leveringstid på 3–7 virkedager. Store varer leveres av Bring til inngangsdør eller nærmeste hinder fra 449 kroner, med 6–9 virkedagers leveringstid – prisen avhenger av postnummer og vises i kassen. Click & Collect er gratis: du reserverer på nett, får SMS innen 30 minutter, og betaler først når du henter i varehuset innen to virkedager.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "JYSK gir returrett uten tidsbegrensning på ubrukte varer med gyldig kvittering – raskest i et JYSK-varehus, der du får refusjonen med en gang. Returfrakt ved postretur betaler du selv, og spesialtilpassede varer og utførte tjenester kan ikke returneres. Den lovfestede angreretten på 14 dager gjelder i tillegg for nettkjøp.",
          "GOLD-madrasser har 100 dagers bytterett – en bytteordning, ikke en returordning. Reklamasjonsretten følger forbrukerkjøpsloven.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk fraktprisen for ditt postnummer i kassen – store varer koster fra 449 kroner å få levert, og retur av dem ordner du selv. Husk at Click & Collect er en reservasjon som må hentes innen to virkedager, og at madrassbytteordningen kun gjelder GOLD-madrasser.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos JYSK før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "JYSK – Salgs- og leveringsbetingelser",
        url: "https://jysk.no/vilkar-og-betingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping"],
      },
      {
        label: "JYSK – Click & Collect",
        url: "https://jysk.no/click-collect-reserver-online-og-hent-i-butikken",
        checkedAt: "2026-07-16",
        supports: ["clickAndCollect"],
      },
      {
        label: "JYSK – Frakt og levering (kundeservice)",
        url: "https://jysk.no/customer-service-category/12307",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende kjede for seng, madrass og rimelig interiør med returrett uten tidsfrist på ubrukte varer og gratis Click & Collect-reservasjon. Vær oppmerksom på at frakt alltid koster – fra 449 kroner for store varer – og at returfrakt betales av kunden.",
    editorialPros: [
      "Returrett uten tidsbegrensning på ubrukte varer med kvittering",
      "Gratis Click & Collect – reserver på nett, betal i butikk",
      "Vipps, Klarna faktura og JYSK-konto",
      "Varehus over hele landet med umiddelbar refusjon ved butikkretur",
      "100 dagers bytterett på GOLD-madrasser",
    ],
    editorialCons: [
      "Ingen fri frakt – småpakker fra 89,95 kr, store varer fra 449 kr",
      "Returfrakt ved postretur betales av kunden",
      "Store varer leveres kun til inngangsdør/første hinder",
    ],
    bestFor: ["Senger og madrasser", "Rimelig interiør", "Klikk og hent"],
    notBestFor: ["Designmøbler i premiumsegmentet"],
    categories: [{ main: "hjem-interior-hage", productType: "mobler", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Klarna faktura" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        deliveryDays: { value: 5, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Småpakker 3–7 virkedager; store varer 6–9 virkedager" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Fra 89,95 kr (småpakker) / fra 449 kr (store varer); varierer med postnummer" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Store varer leveres til inngangsdør/første hinder" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/click-collect-reserver-online-og-hent-i-butikken", note: "Gratis reservasjon; SMS innen 30 min; betal og hent i butikk innen 2 virkedager" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "JYSK AS, org 947 477 129, Oslo (del av dansk konsern)" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
      },
      commercial: {
        giftCard: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser" },
      },
      returns: {
        unlimitedReturnWindow: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Gjelder ubrukte varer med gyldig kvittering; unntak finnes (bl.a. spesialtilpassede varer og utførte tjenester). Lovfestet angrerett 14 dager gjelder i tillegg ved nettkjøp" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://jysk.no/vilkar-og-betingelser", note: "Gratis i varehus; returfrakt per post betales av kunden" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 73,
    lastChecked: "2026-07-16",
  },
  {
    id: "bohus",
    name: "Bohus",
    slug: "bohus",
    websiteUrl: "https://www.bohus.no",
    affiliateSlug: "bohus",
    logo: { src: "/logos/bohus.svg", alt: "Bohus", background: "dark" },
    shortDescription:
      "Norsk møbelkjede med sofaer, senger, møbler og interiør – nettbutikk og lokale kjedebutikker over hele landet.",
    longDescription:
      "Bohus er en norsk møbel- og interiørkjede der nettbutikken drives av BNB AS i Oslo, mens de lokale Bohus-butikkene er selvstendige kjedemedlemmer som kan ha egne priser og eget sortiment. Nettbutikken selger sofaer, senger, møbler og interiør med 30 dagers åpent kjøp, gratis henting i butikk og hjemlevering av møbler – med eller uten montering. Returfrakt per post betales av kunden, og store møbler returneres til butikk.",
    descriptionSections: [
      {
        heading: "Hva selger Bohus?",
        paragraphs: [
          "Bohus selger møbler og interiør: sofaer, senger og madrasser, spisegrupper, oppbevaring, tepper, belysning og hagemøbler. Kjeden omtaler seg som Norges største møbel- og interiørkjede.",
          "Nettbutikken bohus.no drives av BNB AS, org 998 461 936, i Oslo. De lokale Bohus-butikkene er selvstendige kjedemedlemmer som fritt kan sette egne priser, og sortimentet kan variere fra butikk til butikk – nettpriser og butikkpriser kan derfor avvike.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Bohus passer for deg som skal kjøpe sofa, seng eller møbler og vil kombinere netthandel med en lokal butikk – enten for gratis henting, prøvesitting eller hjemlevering med montering.",
          "Er du primært ute etter lavprisinteriør og småvarer, kan lavpriskjedene være mer aktuelle.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa, Mastercard og American Express), Vipps, Trustly og faktura eller delbetaling gjennom Walley – blant annet med 14 dagers faktura og rentefri delbetaling. Du må være 18 år for å handle på bohus.no.",
          "Henting i butikk er gratis, normalt innen fem virkedager. Møbler kan hjemleveres til kantstein eller med innbæring og montering, og mindre varer sendes per post med hjemlevering på kveldstid eller 7 dagers hentefrist. Fraktprisen avhenger av varetype og adresse og vises i kassen.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "Bohus gir 30 dagers åpent kjøp på ubrukte varer i originalemballasje, i tillegg til den lovfestede angreretten på 14 dager. Retur i Bohus-butikk er gratis; postretur betaler du selv, og store møbler må du selv frakte tilbake til en butikk.",
          "Åpent kjøp gjelder ikke spesialtilpassede varer, hygieneprodukter som madrasser, puter og sengetøy, eller utstillingsmodeller. Reklamasjonsretten følger forbrukerkjøpsloven.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk fraktprisen for varen og adressen din i kassen, og husk at retur av store møbler krever egen transport til butikk. Merk at madrasser og annet hygieneunntak ikke har åpent kjøp, og at lokale butikkpriser kan avvike fra nettprisene.",
          "Kontroller alltid gjeldende priser, frakt og vilkår hos Bohus før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Bohus – Kjøpsbetingelser",
        url: "https://www.bohus.no/kjopsbetingelser",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "shipping", "clickAndCollect"],
      },
      {
        label: "Bohus – Retur",
        url: "https://www.bohus.no/retur",
        checkedAt: "2026-07-16",
        supports: ["returns"],
      },
      {
        label: "Bohus – Betalingsmetoder",
        url: "https://www.bohus.no/betalingsmetoder",
        checkedAt: "2026-07-16",
        supports: ["payments"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Landsdekkende norsk møbelkjede med 30 dagers åpent kjøp, gratis henting og retur i butikk og hjemlevering med montering. Vær oppmerksom på at store møbler må returneres til butikk for egen regning, at hygieneunntaket omfatter madrasser og sengetøy, og at lokale butikkpriser kan avvike fra nettbutikken.",
    editorialPros: [
      "30 dagers åpent kjøp",
      "Gratis henting og retur i Bohus-butikker",
      "Hjemlevering av møbler med innbæring og montering",
      "Vipps, Trustly, Amex og Walley faktura/delbetaling",
      "Butikker over hele landet",
    ],
    editorialCons: [
      "Postretur betales av kunden, og store møbler må returneres til butikk",
      "Madrasser, puter og sengetøy er unntatt åpent kjøp",
      "Lokale butikkpriser og sortiment kan avvike fra nettbutikken",
      "Klarna er ikke oppgitt som betalingsmåte",
    ],
    bestFor: ["Sofaer og møbler", "Norsk møbelkjede", "Hjemlevering og montering"],
    notBestFor: ["Lavprisinteriør"],
    categories: [{ main: "hjem-interior-hage", productType: "mobler", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder" },
        amex: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder" },
        klarna: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder", note: "Faktura og delbetaling via Walley; Trustly for kontooverføring" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder" },
        applePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/betalingsmetoder" },
      },
      shipping: {
        deliveryDays: { value: 5, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser", note: "Henting i butikk normalt innen 5 virkedager; hjemlevering varierer med vare og adresse" },
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser", note: "Pris avhenger av varetype og adresse; gratis henting i butikk" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser", note: "Kantstein eller med innbæring/montering for møbler" },
        clickAndCollect: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser", note: "Gratis henting i butikk, normalt innen 5 virkedager" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser", note: "Nettbutikken drives av BNB AS, org 998 461 936, Oslo; kjedebutikkene er selvstendige" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/kjopsbetingelser" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 30, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/retur", note: "30 dagers åpent kjøp (lovfestet angrerett 14 dager); unntak for spesialtilpasset, hygieneprodukter og utstillingsmodeller" },
        freeReturns: { value: false, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://www.bohus.no/retur", note: "Gratis i butikk; postretur og møbeltransport betales av kunden" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 76,
    lastChecked: "2026-07-16",
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
    logo: { src: "/logos/oda.svg", alt: "Oda", background: "transparent" },
    shortDescription:
      "Norsk nettdagligvare med hjemlevering av matvarer på Østlandet og Sørlandet. Sjekk om de leverer til din adresse.",
    longDescription:
      "Oda er en norsk nettdagligvare drevet av Oda Norway AS, med hovedlager på Lierskogen og hjemlevering av dagligvarer til privatpersoner og bedrifter på Østlandet og Sørlandet. Leveringsgebyret varierer med område, dag og tidsvindu, og starter fra 0 kroner. Det er ingen krav til minstebestilling, men små ordre får et pakketillegg. Sjekk alltid i Odas app eller nettbutikk om de leverer til din adresse.",
    descriptionSections: [
      {
        heading: "Hva selger Oda?",
        paragraphs: [
          "Oda selger dagligvarer på nett: ferskvarer, frukt og grønt, tørrvarer, drikke, husholdningsprodukter og middagsingredienser med tilhørende oppskrifter. Selskapet omtaler seg som Norges største lavpris matbutikk på nett.",
          "Oda Norway AS ble grunnlagt i 2013, har hovedkontor i Oslo og driver et sentrallager på Lierskogen som all levering går fra – det finnes ingen fysiske butikker.",
        ],
      },
      {
        heading: "Hvem passer butikken for?",
        paragraphs: [
          "Oda passer for deg som bor i leveringsområdet på Østlandet eller Sørlandet og vil få dagligvarene levert hjem – særlig ved faste, større handler der pakketillegget ikke slår inn.",
          "Butikken er uaktuell utenfor leveringsområdet, og det finnes ingen butikk eller hentepunkt å oppsøke. Om Oda leverer til deg, ser du ved å legge inn adressen i appen eller nettbutikken.",
        ],
      },
      {
        heading: "Betaling, frakt og levering",
        paragraphs: [
          "Du kan betale med kort (Visa og Mastercard), Apple Pay, Vipps eller Klarna. Faktura tilbys kun bedriftskunder.",
          "Leveringsgebyret er dynamisk og starter fra 0 kroner: større tidsvinduer og rolige dager er billigere enn korte vinduer og travle dager. Det er ingen minstebestilling, men ordre under 1300 kroner får pakketillegg – 29 kroner under 1300, 59 kroner under 1100 og 199 kroner under 900. Du velger leveringsvindu i kassen, og varsles underveis på leveringsdagen. Er leveringen mer enn 15 minutter forsinket, gir Oda automatisk en kupong for gratis levering.",
        ],
      },
      {
        heading: "Retur og kundeservice",
        paragraphs: [
          "For matvarer gjelder egne regler: feil eller mangler må meldes innen 12 timer etter levering, og Oda gir ferskhetsgaranti på ferskvarer med dokumentert holdbarhet per produkt. Refusjon gis ved dokumenterte avvik.",
          "Angreretten på 14 dager gjelder ikke varer som forringes raskt eller forseglede varer der forseglingen er brutt – det omfatter det meste av dagligvarer. Bestillingen er bindende når den er registrert, og endringsmulighetene avhenger av ordrestatus. Pant håndteres med pantepose, og refusjon skjer som tilgodehavende.",
        ],
      },
      {
        heading: "Hva bør du kontrollere før kjøp?",
        paragraphs: [
          "Sjekk først om Oda leverer til adressen din, og sammenlign leveringsvinduene – prisen varierer med dag og tidsluke. Hold ordren over 1300 kroner hvis du vil unngå pakketillegg, og meld fra om eventuelle feil innen 12 timer.",
          "Kontroller alltid gjeldende priser, gebyrer og vilkår hos Oda før du bestiller.",
        ],
      },
    ],
    sources: [
      {
        label: "Oda – Salgs- og bruksvilkår",
        url: "https://oda.com/no/legal/betingelser/",
        checkedAt: "2026-07-16",
        supports: ["company", "payments", "returns", "cancellation", "perishableGoods"],
      },
      {
        label: "Oda – Hva koster hjemlevering? (hjelpesenter)",
        url: "https://hjelp.oda.com/no/article/7b7071",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Oda – Pakketillegg på mindre bestillinger (hjelpesenter)",
        url: "https://hjelp.oda.com/no/article/19d19e",
        checkedAt: "2026-07-16",
        supports: ["shipping"],
      },
      {
        label: "Oda – Om oss",
        url: "https://oda.com/no/about/om-oss/",
        checkedAt: "2026-07-16",
        supports: ["company", "deliveryArea"],
      },
    ],
    contentStatus: "verified",
    reviewSummary:
      "Norsk nettdagligvare med hjemlevering på Østlandet og Sørlandet, dynamisk leveringsgebyr fra 0 kroner og ferskhetsgaranti. Vær oppmerksom på pakketillegget på små ordre, 12-timersfristen for å melde feil, og at angreretten ikke gjelder de fleste matvarer.",
    editorialPros: [
      "Hjemlevering av dagligvarer med valgbare tidsvinduer",
      "Leveringsgebyr fra 0 kr – billigere ved store vinduer og rolige dager",
      "Ingen minstebestilling",
      "Ferskhetsgaranti og automatisk kompensasjon ved forsinkelse",
      "Vipps, Klarna og Apple Pay",
    ],
    editorialCons: [
      "Leverer kun på Østlandet og Sørlandet",
      "Pakketillegg på 29–199 kr for ordre under 1300 kr",
      "Feil på matvarer må meldes innen 12 timer",
      "Ingen butikk eller hentepunkt",
    ],
    bestFor: ["Dagligvarer hjem", "Store faste handler", "Middagsingredienser med oppskrifter"],
    notBestFor: ["Adresser utenfor Østlandet og Sørlandet", "Henting i butikk"],
    categories: [{ main: "mat-drikke-dagligvarer", relevance: "primary" }],
    country: "NO",
    isNorwegian: true,
    shipsToNorway: true,
    attributes: {
      payments: {
        vipps: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        klarna: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        applePay: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        paypal: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        googlePay: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        amex: { value: false, confidence: "medium", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/", note: "Kort oppgitt som Visa og Mastercard" },
      },
      shipping: {
        shippingType: { value: "paid", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://hjelp.oda.com/no/article/7b7071", note: "Dynamisk gebyr fra 0 kr etter område, dag og tidsvindu; pakketillegg 29–199 kr under 1300 kr" },
        homeDelivery: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://hjelp.oda.com/no/article/7b7071", note: "Kun hjemlevering, i definerte områder på Østlandet og Sørlandet" },
      },
      geography: {
        country: { value: "NO", confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/", note: "Oda Norway AS, org 912 262 510, Oslo" },
        isNorwegian: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/about/om-oss/", note: "Leverer til definerte områder på Østlandet og Sørlandet" },
      },
      commercial: {},
      returns: {
        returnWindowDays: { value: 14, confidence: "high", lastChecked: "2026-07-16", sourceUrl: "https://oda.com/no/legal/betingelser/", note: "Angrerett gjelder ikke varer som forringes raskt; feil på matvarer meldes innen 12 timer" },
      },
    },
    trustLevel: "high",
    dataQuality: "A",
    editorialScore: 75,
    notes: ["Hjemlevering er geografisk begrenset – sjekk i Odas app eller nettbutikk om de leverer til din adresse."],
    lastChecked: "2026-07-16",
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
        isNorwegian: { value: false, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/imprint.html" },
        shipsToNorway: { value: true, confidence: "high", lastChecked: "2026-07-15", sourceUrl: "https://www.temu.com/no/shipping-info.html", note: "Norsk handleflyt med leveringsadresser i Norge" },
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
