import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { StoreProfile } from "@/components/StoreProfile";
import { stores, getStore } from "@/data/stores";
import { getCategory } from "@/data/categories";
import { site } from "@/lib/site";
import type { Store } from "@/lib/types";

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Butikk ikke funnet" };
  return {
    title: `${store.name} – anbefaling og fakta`,
    description: store.shortDescription,
    alternates: { canonical: `/butikk/${store.slug}` },
    openGraph: {
      title: `${store.name} · ${site.name}`,
      description: store.shortDescription,
      url: `${site.url}/butikk/${store.slug}`,
    },
  };
}

function relatedStores(store: Store): Store[] {
  const mains = new Set(store.categories.map((c) => c.main));
  return stores
    .filter((s) => s.slug !== store.slug && s.categories.some((c) => mains.has(c.main)))
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, 3);
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  const related = relatedStores(store);
  const primaryCat = store.categories.find((c) => c.relevance === "primary") ?? store.categories[0];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[960px] px-5 py-8 sm:px-8 sm:py-12">
        <Breadcrumbs
          items={[
            { name: "Nettbutikker", href: "/nettbutikker" },
            { name: store.name, href: `/butikk/${store.slug}` },
          ]}
        />

        <StoreProfile store={store} related={related} />

        {/* Store schema-lite via JSON-LD */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: store.name,
            url: store.websiteUrl,
            description: store.shortDescription,
            ...(primaryCat ? { knowsAbout: getCategory(primaryCat.main)?.name } : {}),
          }}
        />
      </div>
    </div>
  );
}
