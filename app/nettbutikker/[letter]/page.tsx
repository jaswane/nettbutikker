import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LetterNav } from "@/components/LetterNav";
import { StoreCard } from "@/components/StoreCard";
import { JsonLd } from "@/components/JsonLd";
import { allStores as stores } from "@/lib/catalog";
import {
  groupByLetter,
  isValidLetter,
  letterLabel,
  nonEmptyLetters,
} from "@/lib/letters";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return nonEmptyLetters(stores).map((letter) => ({ letter }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letter: string }>;
}): Promise<Metadata> {
  const { letter } = await params;
  const decoded = decodeURIComponent(letter).toLowerCase();
  if (!isValidLetter(decoded)) return { title: "Ikke funnet" };
  const label = letterLabel(decoded);
  return {
    title: `Nettbutikker på ${label}`,
    description: `Nettbutikker som starter på ${label}.`,
    alternates: { canonical: `/nettbutikker/${decoded}` },
  };
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ letter: string }>;
}) {
  const { letter } = await params;
  const decoded = decodeURIComponent(letter).toLowerCase();
  if (!isValidLetter(decoded)) notFound();

  const list = groupByLetter(stores).get(decoded) ?? [];
  const label = letterLabel(decoded);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Nettbutikker på ${label}`,
    numberOfItems: list.length,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${site.url}/butikk/${s.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-page px-5 py-8 sm:px-8 sm:py-12">
      <JsonLd data={itemList} />
      <Breadcrumbs
        items={[
          { name: "Nettbutikker", href: "/nettbutikker" },
          { name: label, href: `/nettbutikker/${decoded}` },
        ]}
      />

      <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
        Nettbutikker på {label}
      </h1>
      <p className="mt-2 text-ink-muted">
        {list.length} {list.length === 1 ? "butikk" : "butikker"}
      </p>

      <div className="mt-6">
        <LetterNav active={decoded} />
      </div>

      {list.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-ink-muted">Ingen butikker her ennå.</p>
      )}
    </div>
  );
}
