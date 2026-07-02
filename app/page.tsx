import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { JsonLd } from "@/components/JsonLd";
import { buildSearchUrl } from "@/lib/search/url";
import { EXAMPLE_QUERIES, site } from "@/lib/site";

export default function HomePage() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
  };

  // Search-first product → tell search engines about the site search box.
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/sok?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webSite} />
      {/* Start-screen: search-first, no catalog grid above the fold.
          `home-hero` adds a very subtle petrol dot pattern that fades out (CSS only). */}
      <div className="home-hero relative isolate">
      <section className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-narrow flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.04] text-ink text-balance sm:text-[3.7rem]">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-muted text-pretty sm:text-lg">
          Spør hvor du bør handle, om en butikk er trygg, eller hvilke
          nettbutikker som passer behovet ditt.
        </p>

        <div className="mt-10 w-full">
          <SearchForm variant="hero" autoFocus />
        </div>

        {/* Quick prompts – editorial text suggestions, not pill buttons */}
        <div className="mt-12 w-full">
          <p className="eyebrow mb-4 text-ink-faint">Prøv for eksempel</p>
          <ul className="mx-auto flex max-w-md flex-col gap-3 text-left">
            {EXAMPLE_QUERIES.map((q) => (
              <li key={q}>
                <Link href={buildSearchUrl(q)} className="prompt group">
                  <span aria-hidden className="text-gold transition-transform duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                  <span className="border-b border-transparent pb-px transition-colors group-hover:border-accent/50">
                    {q}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </>
  );
}
