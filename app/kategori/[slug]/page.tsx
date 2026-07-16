import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StoreCard } from "@/components/StoreCard";
import { JsonLd } from "@/components/JsonLd";
import { SearchForm } from "@/components/SearchForm";
import {
  allCategories as categories,
  getCategory,
  productTypesInCategory,
  storesInCategorySorted,
} from "@/lib/catalog";
import { buildSearchUrl } from "@/lib/search/url";
import { site } from "@/lib/site";

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
  // Tomme kategorier (ingen publiserte butikker) skal ikke indekseres – de
  // viser en ærlig tomtilstand og kommer inn igjen når en butikk verifiseres.
  const hasStores = storesInCategorySorted(cat.slug).length > 0;
  return {
    title: `${cat.name} – beste nettbutikker`,
    description: cat.description,
    alternates: { canonical: `/kategori/${cat.slug}` },
    robots: hasStores ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${cat.name} · ${site.name}`,
      description: cat.description,
      url: `${site.url}/kategori/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const list = storesInCategorySorted(cat.slug);
  const popular = productTypesInCategory(cat.slug);

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

        {popular.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
              Populære søk
            </h2>
            <div className="flex flex-wrap gap-2">
              {popular.map((pt) => (
                <Link key={pt.slug} href={buildSearchUrl(pt.name)} className="chip">
                  {pt.name}
                </Link>
              ))}
            </div>
          </div>
        )}
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
