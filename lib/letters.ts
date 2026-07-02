import type { Store } from "@/lib/types";

/**
 * Alphabetical index helpers (PRD §15).
 * Supported buckets: A–Z, Æ, Ø, Å and 0-9 (digits + anything non-letter).
 */
export const LETTERS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "æ", "ø", "å", "0-9",
] as const;

export type LetterBucket = (typeof LETTERS)[number];

/** Derive the bucket key for a store name. */
export function letterOf(name: string): LetterBucket {
  const first = name.trim().charAt(0).toLowerCase();
  if (/[0-9]/.test(first)) return "0-9";
  if (first === "æ") return "æ";
  if (first === "ø") return "ø";
  if (first === "å") return "å";
  if (/[a-z]/.test(first)) return first as LetterBucket;
  return "0-9";
}

/** Human label for a bucket (uppercased; "0-9" stays as is). */
export function letterLabel(bucket: string): string {
  return bucket === "0-9" ? "0-9" : bucket.toUpperCase();
}

/** Group stores by their first-letter bucket, sorted by Norwegian collation. */
export function groupByLetter(stores: readonly Store[]): Map<LetterBucket, Store[]> {
  const map = new Map<LetterBucket, Store[]>();
  for (const letter of LETTERS) map.set(letter, []);
  for (const store of stores) {
    map.get(letterOf(store.name))!.push(store);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "nb"));
  }
  return map;
}

/** Buckets that actually contain at least one store. */
export function nonEmptyLetters(stores: readonly Store[]): LetterBucket[] {
  const grouped = groupByLetter(stores);
  return LETTERS.filter((l) => (grouped.get(l)?.length ?? 0) > 0);
}

export function isValidLetter(value: string): value is LetterBucket {
  return (LETTERS as readonly string[]).includes(value);
}
