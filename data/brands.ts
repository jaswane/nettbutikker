import type { Brand } from "@/lib/types";

/**
 * Brand registry used for search & ranking (PRD §12). Not published as mass SEO
 * pages – brands exist to power matching and recommendations.
 */
export const brands: Brand[] = [
  { name: "Nike", slug: "nike", aliases: ["nike"], categories: ["sport-friluft-trening", "klaer-sko-mote"] },
  { name: "Adidas", slug: "adidas", aliases: ["adidas"], categories: ["sport-friluft-trening", "klaer-sko-mote"] },
  { name: "New Balance", slug: "new-balance", aliases: ["new balance", "newbalance"], categories: ["sport-friluft-trening", "klaer-sko-mote"] },
  { name: "Asics", slug: "asics", aliases: ["asics"], categories: ["sport-friluft-trening"] },
  { name: "Patagonia", slug: "patagonia", aliases: ["patagonia"], categories: ["sport-friluft-trening"] },
  { name: "Norrøna", slug: "norrona", aliases: ["norrøna", "norrona"], categories: ["sport-friluft-trening"] },
  { name: "LEGO", slug: "lego", aliases: ["lego"], categories: ["baby-barn-leker", "hobby-gaver-moro"] },
  { name: "Apple", slug: "apple", aliases: ["apple", "iphone", "macbook", "ipad", "airpods"], categories: ["elektronikk-data-gaming"] },
  { name: "Garmin", slug: "garmin", aliases: ["garmin"], categories: ["sport-friluft-trening", "elektronikk-data-gaming"] },
  { name: "Samsung", slug: "samsung", aliases: ["samsung", "galaxy"], categories: ["elektronikk-data-gaming"] },
  { name: "Sony", slug: "sony", aliases: ["sony", "playstation"], categories: ["elektronikk-data-gaming"] },
  { name: "Dyson", slug: "dyson", aliases: ["dyson"], categories: ["hjem-interior-hage", "elektronikk-data-gaming"] },
  { name: "The Ordinary", slug: "the-ordinary", aliases: ["the ordinary", "ordinary"], categories: ["helse-skjonnhet-apotek"] },
  { name: "Cerave", slug: "cerave", aliases: ["cerave"], categories: ["helse-skjonnhet-apotek"] },
  { name: "Royal Canin", slug: "royal-canin", aliases: ["royal canin"], categories: ["dyr-kjaeledyr"] },
  { name: "Hill's", slug: "hills", aliases: ["hills", "hill's", "hills science plan"], categories: ["dyr-kjaeledyr"] },
  { name: "Bosch", slug: "bosch", aliases: ["bosch"], categories: ["elektronikk-data-gaming", "hjem-interior-hage"] },
  { name: "Ray-Ban", slug: "ray-ban", aliases: ["ray-ban", "rayban"], categories: ["syn-briller-linser"] },
  { name: "IKEA", slug: "ikea", aliases: ["ikea"], categories: ["hjem-interior-hage"] },
  { name: "Levi's", slug: "levis", aliases: ["levis", "levi's"], categories: ["klaer-sko-mote"] },
];
