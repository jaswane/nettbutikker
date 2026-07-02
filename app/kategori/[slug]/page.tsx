import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StoreCard } from "@/components/StoreCard";
import { JsonLd } from "@/components/JsonLd";
import { SearchForm } from "@/components/SearchForm";
import { categories, getCategory } from "@/data/categories";
import { stores } from "@/data/stores";
import { site } from "@/lib/site";
import type { MainCategorySlug, Store } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Kategori ikke funnet" };
  return {
    title: `${cat.name} – beste nettbutikker`,
    description: cat.description,
    alternates: { canonical: `/kategori/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · ${site.name}`,
      description: cat.description,
      url: `${site.url}/kategori/${cat.slug}`,
    },
  };
}

function storesIn(main: MainCategorySlug): Store[] {
  return stores
    .filter((s) => s.categories.some((c) => c.main === main))
    .sort((a, b) => {
      // Primary-category stores first, then by editorial score.
      const ap = a.categories.find((c) => c.main === main)?.relevance === "primary" ? 1 : 0;
      const bp = b.categories.find((c) => c.main === main)?.relevance === "primary" ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return b.editorialScore - a.editorialScore;
    });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = storesIn(cat.slug);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} – nettbutikker`,
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
          { name: "Kategorier", href: "/nettbutikker" },
          { name: cat.name, href: `/kategori/${cat.slug}` },
        ]}
      />

      <div className="max-w-narrow">
        <h1 className="font-display text-3xl font-semibold tracking-tightish text-ink sm:text-4xl">
          {cat.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-muted text-pretty">
          {cat.description}
        </p>
        <div className="mt-6">
          <SearchForm variant="bar" initialQuery={cat.shortName} />
        </div>
      </div>

      {list.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-line bg-surface p-8 text-center text-ink-muted">
          Ingen butikker i denne kategorien ennå.
        </p>
      )}

      {/* Other categories */}
      <section className="mt-14">
        <h2 className="mb-4 text-sm font-medium text-ink-muted">Andre kategorier</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== cat.slug)
            .map((c) => (
              <Link key={c.slug} href={`/kategori/${c.slug}`} className="chip">
                {c.shortName}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
