import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { StoreProfile } from "@/components/StoreProfile";
import { getCategory, getPublicStores, getPublishedStore, relatedStores } from "@/lib/catalog";
import { site } from "@/lib/site";

// Publiseringspolicy: kun offentlige butikker (i produksjon = verified) får
// en side. Direkte besøk på en draft-slug gir notFound() i produksjon fordi
// getPublishedStore da returnerer undefined. I development vises alle.
export function generateStaticParams() {
  return getPublicStores().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getPublishedStore(slug);
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

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getPublishedStore(slug);
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

        {/*
          WebPage + mainEntity Organization (maskinlesbar profil). Only
          verified, visible fields: name/url/description are on the page,
          the logo file is served locally, dateModified = lastChecked (real
          content check date). Deliberately NO Review/AggregateRating until
          real, visible reviews exist.
        */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: `${site.url}/butikk/${store.slug}`,
            name: `${store.name} – anbefaling og fakta`,
            dateModified: store.lastChecked,
            mainEntity: {
              "@type": "Organization",
              name: store.name,
              url: store.websiteUrl,
              description: store.shortDescription,
              ...(store.logo?.src ? { logo: `${site.url}${store.logo.src}` } : {}),
              ...(primaryCat ? { knowsAbout: getCategory(primaryCat.main)?.name } : {}),
            },
          }}
        />
      </div>
    </div>
  );
}
