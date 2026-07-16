import type { ProductType } from "@/lib/types";

/**
 * Produkttype-vokabularet – klasser av kjøpbare ting slik brukeren søker
 * («løpesko», «hundefôr», «gaming-PC»). Se docs/produkttype-modell.md.
 *
 * Regler:
 *  - `name` skal fungere i setningen «… er et godt sted å kjøpe {name}» –
 *    det brukes direkte i svaroverskrifter.
 *  - `aliases` er søkefraser; leksikonet legger selv til diakritikk-foldede
 *    varianter, og QA håndhever stoppord-/kollisjonshygiene.
 *  - `categories`: navigasjonshjem; første er primær. Kryss-kategori er lov.
 *  - `broader`: valgfri peker til bredere produkttype – aldri tvungen struktur.
 *  - Ny produkttype = ny rad her. Ingen kodeendring.
 *
 * Migrert fra de tidligere «subcategories» (samme slugs og aliaser, så
 * søkeadferden er bevart – golden-verifisert).
 */
export const productTypes: ProductType[] = [
  // --- Klær, sko og mote -------------------------------------------------------
  {
    slug: "dameklaer",
    name: "Dameklær",
    aliases: ["dameklær", "klær til dame", "kjoler"],
    categories: ["klaer-sko-mote"],
  },
  {
    slug: "herreklaer",
    name: "Herreklær",
    aliases: ["herreklær", "klær til herre"],
    categories: ["klaer-sko-mote"],
  },
  {
    slug: "sko",
    name: "Sko",
    aliases: ["sko", "joggesko", "sneakers", "støvler", "vintersko", "sandaler", "barnesko"],
    categories: ["klaer-sko-mote"],
  },
  {
    slug: "jakker",
    name: "Jakker",
    aliases: ["jakker", "vinterjakke", "regnjakke", "dunjakke", "allværsjakke", "skalljakke"],
    categories: ["klaer-sko-mote"],
  },

  // --- Sport, friluft og trening -------------------------------------------------
  {
    slug: "lopesko",
    name: "Løpesko",
    aliases: ["løpesko", "lopesko", "joggesko til løping"],
    categories: ["sport-friluft-trening"],
    broader: "sko",
    brandSlugs: ["nike", "adidas", "asics", "new-balance"],
  },
  {
    slug: "sykkel",
    name: "Sykkel",
    aliases: ["sykkel", "el-sykkel", "sykkeldeler", "sykkelhjelm"],
    categories: ["sport-friluft-trening"],
  },
  {
    slug: "friluft",
    name: "Friluftsutstyr",
    aliases: ["friluft", "telt", "sovepose", "tursekk", "fjellsko"],
    categories: ["sport-friluft-trening"],
    brandSlugs: ["norrona", "patagonia"],
  },

  // --- Hjem, interiør og hage ----------------------------------------------------
  {
    slug: "mobler",
    name: "Møbler",
    aliases: ["møbler", "sofa", "stol", "bord", "spisebord"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "kjokken",
    name: "Kjøkkenutstyr",
    aliases: ["kjøkken", "kjøkkenutstyr", "gryter", "servise", "bestikk"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "hage",
    name: "Hageutstyr",
    aliases: ["hage", "hagemøbler", "planter"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "senger",
    name: "Senger og madrasser",
    aliases: ["seng", "senger", "madrass", "sengetøy", "dyne", "pute"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "grill",
    name: "Grill",
    aliases: ["grill", "gassgrill", "kullgrill", "grilltilbehør"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "hagemaskiner",
    name: "Hagemaskiner",
    aliases: ["hagemaskiner", "gressklipper", "robotgressklipper", "robotklipper", "snøfreser"],
    categories: ["hjem-interior-hage"],
  },
  {
    slug: "verktoy",
    name: "Verktøy",
    aliases: ["verktøy", "drill", "verktøysett", "skrutrekker", "elektroverktøy"],
    categories: ["hjem-interior-hage", "bil-bat-motor"],
  },

  // --- Elektronikk, data og gaming -------------------------------------------------
  {
    slug: "pc-data",
    name: "PC og datautstyr",
    aliases: ["pc", "gaming-pc", "laptop", "komponenter", "skjermkort", "tastatur", "gamingstol", "datamus"],
    categories: ["elektronikk-data-gaming"],
  },
  {
    slug: "mobil",
    name: "Mobil",
    aliases: ["mobil", "telefon", "smarttelefon"],
    categories: ["elektronikk-data-gaming"],
    brandSlugs: ["apple", "samsung"],
  },
  {
    slug: "lyd-bilde",
    name: "TV, lyd og bilde",
    aliases: ["tv", "lyd", "hodetelefoner", "høyttaler", "soundbar"],
    categories: ["elektronikk-data-gaming"],
    brandSlugs: ["sony", "samsung"],
  },
  {
    slug: "mobiltilbehor",
    name: "Mobiltilbehør",
    aliases: ["mobiltilbehør", "mobildeksel", "lader", "mobillader", "powerbank"],
    categories: ["elektronikk-data-gaming"],
  },
  {
    slug: "stovsuger",
    name: "Støvsuger",
    aliases: ["støvsuger", "robotstøvsuger", "håndstøvsuger"],
    categories: ["elektronikk-data-gaming", "hjem-interior-hage"],
  },
  {
    slug: "hvitevarer",
    name: "Hvitevarer",
    aliases: ["hvitevarer", "kjøleskap", "vaskemaskin", "oppvaskmaskin", "tørketrommel", "komfyr"],
    categories: ["elektronikk-data-gaming", "hjem-interior-hage"],
  },
  {
    slug: "kjokkenapparater",
    name: "Kjøkkenapparater",
    aliases: ["kjøkkenapparater", "kjøkkenmaskin", "kaffetrakter", "espressomaskin", "airfryer", "blender"],
    categories: ["elektronikk-data-gaming", "hjem-interior-hage"],
  },

  // --- Baby, barn og leker ----------------------------------------------------------
  {
    slug: "leker",
    name: "Leker",
    aliases: ["leker", "leketøy", "lego", "brettspill", "byggeklosser", "dukker", "dukkehus"],
    categories: ["baby-barn-leker"],
    brandSlugs: ["lego"],
  },
  {
    slug: "babyutstyr",
    name: "Babyutstyr",
    aliases: ["babyutstyr", "barnevogn", "bæresele", "smokk", "tåteflaske", "stellebord"],
    categories: ["baby-barn-leker"],
  },
  {
    slug: "bilbarnesete",
    name: "Bilbarnesete",
    aliases: ["bilbarnesete", "bilstol til barn", "barnesete til bil", "bilseter til barn"],
    categories: ["baby-barn-leker", "bil-bat-motor"],
  },

  // --- Helse, skjønnhet og apotek -----------------------------------------------------
  {
    slug: "hudpleie",
    name: "Hudpleie",
    aliases: ["hudpleie", "ansiktskrem", "serum", "solkrem", "fuktighetskrem"],
    categories: ["helse-skjonnhet-apotek"],
    brandSlugs: ["the-ordinary", "cerave"],
  },
  {
    slug: "harpleie",
    name: "Hårpleie",
    aliases: ["sjampo", "shampo", "balsam", "hårprodukter"],
    categories: ["helse-skjonnhet-apotek"],
  },
  {
    slug: "apotek",
    name: "Apotekvarer",
    aliases: ["apotek", "reseptfritt", "vitaminer"],
    categories: ["helse-skjonnhet-apotek"],
  },
  {
    slug: "sminke",
    name: "Sminke",
    aliases: ["sminke", "makeup", "kosmetikk"],
    categories: ["helse-skjonnhet-apotek"],
  },

  // --- Dyr og kjæledyr ------------------------------------------------------------------
  {
    slug: "hund",
    name: "Hundeutstyr og fôr",
    aliases: ["hund", "hundefor", "hundeutstyr", "hundemat", "hundebur", "hundeseng"],
    categories: ["dyr-kjaeledyr"],
    brandSlugs: ["royal-canin"],
  },
  {
    slug: "katt",
    name: "Katteutstyr og fôr",
    aliases: ["katt", "kattefor", "kattesand", "kattemat"],
    categories: ["dyr-kjaeledyr"],
  },

  // --- Bil, båt og motor -------------------------------------------------------------------
  {
    slug: "bildeler",
    name: "Bildeler",
    aliases: ["bildeler", "reservedeler"],
    categories: ["bil-bat-motor"],
  },
  {
    slug: "dekk",
    name: "Dekk og felg",
    aliases: ["dekk", "felger", "vinterdekk", "sommerdekk", "helårsdekk"],
    categories: ["bil-bat-motor"],
  },

  // --- Mat, drikke og dagligvarer --------------------------------------------------------------
  {
    slug: "matkasse",
    name: "Matkasse",
    aliases: ["matkasse", "middagskasse"],
    categories: ["mat-drikke-dagligvarer"],
  },
  {
    slug: "kaffe-te",
    name: "Kaffe og te",
    aliases: ["kaffe", "te", "kaffebønner"],
    categories: ["mat-drikke-dagligvarer"],
  },

  // --- Hobby, gaver og moro -----------------------------------------------------------------------
  {
    slug: "kreativt",
    name: "Kreativt og håndarbeid",
    aliases: ["garn", "maling", "håndarbeid", "symaskin", "strikkepinner"],
    categories: ["hobby-gaver-moro"],
  },
  {
    slug: "gaver",
    name: "Gaver",
    aliases: ["gave", "gaver", "gaveideer", "julegave", "julegaver", "bursdagsgave"],
    categories: ["hobby-gaver-moro"],
  },

  // --- Syn, briller og linser -------------------------------------------------------------------------
  {
    slug: "briller",
    name: "Briller",
    aliases: ["briller", "solbriller", "lesebriller"],
    categories: ["syn-briller-linser"],
    brandSlugs: ["ray-ban"],
  },
  {
    slug: "linser",
    name: "Kontaktlinser",
    aliases: ["linser", "kontaktlinser"],
    categories: ["syn-briller-linser"],
  },

  // --- Tjenester og abonnement -----------------------------------------------------------------------------
  // Merk: produkttypene «stromming» og «programvare» ble fjernet 2026-07-16 –
  // døde rester uten butikkvei. Søkeordene dekkes av kategori-aliasene på
  // tjenester-abonnement; nye typer legges til når en faktisk butikk fører dem.
];
