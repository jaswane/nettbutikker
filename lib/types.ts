/**
 * Core data types for Nettbutikker.no (MVP).
 * Modelled closely on PRD v0.2 §8–9. These types are the single source of
 * truth shared by the local data files and the search engine.
 */

export type MainCategorySlug =
  | "klaer-sko-mote"
  | "sport-friluft-trening"
  | "hjem-interior-hage"
  | "elektronikk-data-gaming"
  | "baby-barn-leker"
  | "helse-skjonnhet-apotek"
  | "dyr-kjaeledyr"
  | "bil-bat-motor"
  | "mat-drikke-dagligvarer"
  | "hobby-gaver-moro"
  | "syn-briller-linser"
  | "tjenester-abonnement"
  | "utenlandske-nettbutikker";

export type StoreCountry =
  | "NO"
  | "SE"
  | "DK"
  | "DE"
  | "GB"
  | "US"
  | "CN"
  | "NL"
  | "FI"
  | "IE"
  | "EU"
  | "other";

export type Confidence = "high" | "medium" | "low" | "unknown";

export type Relevance = "primary" | "secondary" | "limited";

/** Generic confidence-wrapped field, per PRD §8. */
export type FieldConfidence<T> = {
  value: T;
  confidence: Confidence;
  lastChecked?: string;
  sourceUrl?: string;
  note?: string;
};

export type StoreCategoryRef = {
  main: MainCategorySlug;
  /**
   * ProductType the store is notably strong in within this category
   * (edge store→produkttype; see docs/produkttype-modell.md §2). Until
   * storage becomes generic (arkitektur fase 3) the edge rides on the
   * category ref and inherits its relevance.
   */
  productType?: string;
  relevance: Relevance;
};

export type StoreBrand = {
  name: string;
  slug: string;
  relevance: Relevance | "unknown";
  confidence: Confidence;
  lastChecked?: string;
  sourceUrl?: string;
  note?: string;
};

export type ShippingType = "free" | "free_over_amount" | "paid" | "unknown";

export type StoreAttributes = {
  payments: {
    vipps?: FieldConfidence<boolean>;
    klarna?: FieldConfidence<boolean>;
    paypal?: FieldConfidence<boolean>;
    applePay?: FieldConfidence<boolean>;
    googlePay?: FieldConfidence<boolean>;
    amex?: FieldConfidence<boolean>;
  };
  shipping: {
    shippingType?: FieldConfidence<ShippingType>;
    freeShippingFrom?: FieldConfidence<number | null>;
    /** Typical delivery time in days (decision driver, docs/opplevelse-2026-07.md). */
    deliveryDays?: FieldConfidence<number>;
    homeDelivery?: FieldConfidence<boolean>;
    clickAndCollect?: FieldConfidence<boolean>;
    instabox?: FieldConfidence<boolean>;
  };
  geography: {
    country?: FieldConfidence<StoreCountry>;
    isNorwegian?: FieldConfidence<boolean>;
    shipsToNorway?: FieldConfidence<boolean>;
    voec?: FieldConfidence<boolean>;
  };
  commercial: {
    subscription?: FieldConfidence<boolean>;
    bindingPeriod?: FieldConfidence<boolean>;
    freeTrial?: FieldConfidence<boolean>;
    introOffer?: FieldConfidence<boolean>;
    giftCard?: FieldConfidence<boolean>;
    outlet?: FieldConfidence<boolean>;
    priceMatch?: FieldConfidence<boolean>;
  };
  returns: {
    /** Return window in days. */
    returnWindowDays?: FieldConfidence<number>;
    freeReturns?: FieldConfidence<boolean>;
  };
  // Migrasjon 2026-07-15: den tidligere `trust`-gruppen (tryggEhandel) er
  // fjernet. Den norske «Trygg e-Handel»-sertifiseringen ble lagt ned
  // 2025-02-01 og skal ikke presenteres som aktivt tillitssignal noe sted.
  // Tillitsvurdering bygger i stedet på dokumenterte egenskaper (kilder,
  // datakvalitet, vilkår). QA feiler ved reintroduksjon.
};

export type TrustLevel = "high" | "medium" | "low" | "unknown";
export type DataQuality = "A" | "B" | "C" | "D";

/**
 * Optional store logo. Future-proofing only – no real logos are bundled yet.
 * When available, place local files at /public/logos/[slug].svg (or .png) and
 * set `src: "/logos/[slug].svg"`. Until then the UI renders an initial-based
 * fallback. Do NOT hotlink third-party logos or store favicons.
 */
export type StoreLogo = {
  src?: string;
  alt?: string;
  background?: "light" | "dark" | "transparent";
};

/**
 * A primary source backing the profile's claims (butikkens egne vilkår,
 * om oss-side osv.). Rendered under «Kilder og sist kontrollert» in Praktisk
 * info and required (min. two) before a profile can be `verified`.
 */
export type StoreSource = {
  label: string;
  url: string;
  /** ISO date the source was last checked against the profile. */
  checkedAt: string;
  /** Which claim areas the source supports, e.g. "payments", "returns". */
  supports?: string[];
};

/** One H2-section of the long editorial description (redaksjonell standard). */
export type DescriptionSection = {
  heading: string;
  paragraphs: string[];
};

/**
 * How the listing came to exist:
 *  - "editorial": vi valgte selv å legge inn butikken (standard; gjelder også
 *    når feltet mangler)
 *  - "paid": butikken har betalt for arbeidet med vurdering og oppføring
 * Feltet beskriver KUN opphav. Det skal ALDRI leses av ranking, score eller
 * anbefalinger – håndhevet av QA (qa-checks.mjs). Fremtidig synlig merking
 * skjer i Praktisk info, ikke i profilhodet.
 */
export type ListingType = "editorial" | "paid";

export type Store = {
  id: string;
  name: string;
  slug: string;
  /**
   * Extra search phrases for the store beyond its name (e.g. "hm" for H&M).
   * Diacritic-less typing ("elkjop") is handled automatically by the lexicon.
   */
  searchAliases?: string[];
  websiteUrl: string;
  affiliateSlug?: string;
  logo?: StoreLogo;
  shortDescription: string;
  /**
   * Direct summary (50–80 ord) that opens the profile's Oversikt: what kind
   * of store, who it fits, what it does not cover.
   */
  longDescription?: string;
  /**
   * Full editorial description (≥300 ord for `verified` profiles), structured
   * as H2 sections per the redaksjonelle standarden: hva selger butikken,
   * hvem passer den for, betaling/frakt, retur, hva bør kontrolleres.
   * Facts only – every claim must be covered by `sources`.
   */
  descriptionSections?: DescriptionSection[];
  /** Primary sources backing the profile (min. two for `verified`). */
  sources?: StoreSource[];
  /**
   * Editorial content status. `verified` requires ≥300 ord beskrivelse,
   * ≥2 kilder, lastChecked + komplette kjernefelter (håndheves av
   * `npm run qa:content`). Absent/`draft` = under arbeid.
   */
  contentStatus?: "draft" | "verified";
  /** Listing origin (see ListingType). Absent = "editorial". Never in ranking. */
  listingType?: ListingType;
  /** Short editorial verdict shown under «Vår vurdering» in Oversikt (optional). */
  reviewSummary?: string;
  editorialPros?: string[];
  editorialCons?: string[];
  bestFor: string[];
  notBestFor?: string[];
  categories: StoreCategoryRef[];
  brands?: StoreBrand[];
  country: StoreCountry;
  isNorwegian: boolean;
  shipsToNorway: boolean;
  attributes: StoreAttributes;
  trustLevel: TrustLevel;
  dataQuality: DataQuality;
  editorialScore: number;
  warnings?: string[];
  notes?: string[];
  lastChecked: string;
  needsManualReview?: boolean;
};

export type Category = {
  slug: MainCategorySlug;
  name: string;
  shortName: string;
  description: string;
  /** Search aliases / synonyms used by the intent parser. */
  aliases: string[];
};

/**
 * A class of purchasable things, named the way users search («løpesko»,
 * «hundefôr»). The demand-side vocabulary of the entity graph – distinct from
 * Category (navigation) and Brand (maker). See docs/produkttype-modell.md.
 */
export type ProductType = {
  slug: string;
  /** Display name; must read naturally after «… et godt sted å kjøpe». */
  name: string;
  /** Search phrases; the lexicon adds diacritic-folded variants itself. */
  aliases: string[];
  /** Navigation home(s); the first entry is primary. */
  categories: MainCategorySlug[];
  /** Optional broader product type (slug) – light hierarchy, never a forced tree. */
  broader?: string;
  /** Brands typically associated – query refinement and internal links. */
  brandSlugs?: string[];
  /** Short user-facing description; required before any future answer page. */
  description?: string;
};

/** Old eButikker slug → new structure mapping, per PRD §11. */
export type CategoryMapping = {
  oldSlug: string;
  newMainCategory: MainCategorySlug;
  newProductType?: string;
  aliases: string[];
  riskLevel: "normal" | "sensitive" | "restricted";
};

export type Brand = {
  name: string;
  slug: string;
  aliases: string[];
  /** Categories the brand is typically associated with. */
  categories: MainCategorySlug[];
};

/** Intent types the MVP search engine recognises, per PRD §6. */
export type SearchIntent =
  | "where_to_buy"
  | "is_store_safe"
  | "store_with_attribute"
  | "brand_query"
  | "category_recommendation"
  | "unknown";
