import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: { absolute: "Kontakt oss | Nettbutikker.no" },
  description:
    "Har du funnet feil informasjon om en nettbutikk, eller mener du at noe bør oppdateres? Kontakt Nettbutikker.no.",
  alternates: { canonical: "https://nettbutikker.no/kontakt" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-narrow px-5 py-8 sm:px-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Kontakt oss", href: "/kontakt" }]} />

      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Kontakt oss
      </h1>
      <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-soft text-pretty">
        Har du funnet feil informasjon om en nettbutikk, eller mener du at noe bør
        oppdateres? Send oss gjerne en melding.
      </p>

      <div className="mt-8 border-y border-line py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
          E-post
        </p>
        <a
          href="mailto:kontakt@swanecreative.no"
          className="mt-1.5 inline-block text-lg font-medium text-accent-ink underline-offset-4 hover:underline"
        >
          kontakt@swanecreative.no
        </a>
      </div>

      <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-muted text-pretty">
        Oppgi gjerne hvilken nettbutikk eller side det gjelder, hva du mener er feil,
        og eventuelt en lenke til oppdatert informasjon.
      </p>
    </div>
  );
}
