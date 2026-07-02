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
  sub?: string;
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
  trust: {
    tryggEhandel?: FieldConfidence<boolean>;
  };
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
  /** Longer editorial description shown on the store profile (optional). */
  longDescription?: string;
  /** Short editorial verdict used in the "Omtaler" section (optional). */
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
  /** Representative subcategory slugs (for matching, not exhaustive). */
  subcategories?: { slug: string; name: string; aliases: string[] }[];
};

/** Old eButikker slug → new structure mapping, per PRD §11. */
export type CategoryMapping = {
  oldSlug: string;
  newMainCategory: MainCategorySlug;
  newSubcategory?: string;
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
