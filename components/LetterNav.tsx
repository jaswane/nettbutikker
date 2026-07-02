import Link from "next/link";
import { LETTERS, letterLabel, nonEmptyLetters } from "@/lib/letters";
import { allStores as stores } from "@/lib/catalog";

/** A–Z / Æ Ø Å / 0-9 navigation strip (PRD §15). */
export function LetterNav({ active }: { active?: string }) {
  const available = new Set(nonEmptyLetters(stores));
  return (
    <nav aria-label="Bla alfabetisk" className="flex flex-wrap gap-1.5">
      {LETTERS.map((l) => {
        const has = available.has(l);
        const isActive = active === l;
        const label = letterLabel(l);
        if (!has) {
          return (
            <span
              key={l}
              aria-disabled
              className="grid h-9 min-w-9 place-items-center rounded-md px-2 text-sm text-ink-faint/50"
            >
              {label}
            </span>
          );
        }
        return (
          <Link
            key={l}
            href={`/nettbutikker/${l}`}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "grid h-9 min-w-9 place-items-center rounded-md bg-accent px-2 text-sm font-semibold text-white"
                : "grid h-9 min-w-9 place-items-center rounded-md border border-line bg-surface px-2 text-sm font-medium text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-ink"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
