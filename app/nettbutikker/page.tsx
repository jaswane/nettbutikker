import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LetterNav } from "@/components/LetterNav";
import { JsonLd } from "@/components/JsonLd";
import { allCategories as categories, getPublicStores } from "@/lib/catalog";
import { groupByLetter, letterLabel, nonEmptyLetters } from "@/lib/letters";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alle nettbutikker – alfabetisk og etter kategori",
  description:
    "Bla gjennom alle nettbutikker alfabetisk eller etter kategori. Sekundær oversikt – bruk søket for anbefalinger.",
  alternates: { canonical: "/nettbutikker" },
};

export default function NettbutikkerPage() {
  // Kun offentlige butikker (publiseringspolicyen i lib/catalog.ts).
  const stores = getPublicStores();
  const grouped = groupByLetter(stores);
  const letters = nonEmptyLetters(stores);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Alle nettbutikker",
    numberOfItems: stores.length,
    itemListElement: [...stores]
      .sort((a, b) => a.name.localeCompare(b.name, "nb"))
      .map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `${site.url}/butikk/${s.slug}`,
      })),
  };

  return (
    <div className="mx-auto max-w-page px-5 py-8 sm:px-8 sm:py-12">
      <JsonLd data={itemList} />
      <Breadcrumbs items={[{ name: "Nettbutikker", href: "/nettbutikker" }]} />

      <header className="max-w-narrow">
        <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
          Alle nettbutikker
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
          En oversikt over de {stores.length} butikkene vi dekker. Dette er
          sekundær navigasjon –{" "}
          <Link href="/" className="text-accent-ink underline-offset-2 hover:underline">
            bruk søket
          </Link>{" "}
          for anbefalinger.
        </p>
      </header>

      <div className="mt-8">
        <LetterNav />
      </div>

      {/* Categories */}
      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium text-ink-muted">Etter kategori</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/kategori/${c.slug}`} className="chip">
              {c.shortName}
            </Link>
          ))}
        </div>
      </section>

      {/* Alphabetical groups */}
      <div className="mt-12 space-y-8">
        {letters.map((letter) => {
          const list = grouped.get(letter) ?? [];
          return (
            <section key={letter} id={letter}>
              <h2 className="mb-3 flex items-center gap-3 font-display text-lg font-semibold text-ink">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-accent-soft text-sm text-accent-ink">
                  {letterLabel(letter)}
                </span>
                <Link
                  href={`/nettbutikker/${letter}`}
                  className="text-sm font-normal text-ink-muted hover:text-accent-ink"
                >
                  Se egen side
                </Link>
              </h2>
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/butikk/${s.slug}`}
                      className="text-ink-soft hover:text-accent-ink"
                    >
                      {s.name}
                    </Link>
                    {!s.isNorwegian && (
                      <span className="ml-2 text-xs text-ink-muted">utenlandsk</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Diskret henvisning for butikkeiere – ingen salgspromotering utover dette. */}
      <p className="mt-14 border-t border-line pt-6 text-sm text-ink-muted">
        Driver du en nettbutikk som ikke er oppført?{" "}
        <Link href="/legg-til-nettbutikk" className="text-link">
          Les om hvordan du kan få den vurdert
        </Link>
        .
      </p>
    </div>
  );
}
