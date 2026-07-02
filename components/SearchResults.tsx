import Link from "next/link";
import { BadgeRow } from "@/components/Badge";
import { DataQualityTag } from "@/components/StoreCard";
import { StoreLogo } from "@/components/StoreLogo";
import { Disclaimer } from "@/components/Disclaimer";
import { DataNote } from "@/components/DataNote";
import { priorityBadges, type FilterKey } from "@/data/attribute-definitions";
import { goHref, isAffiliate, OUTBOUND_REL } from "@/lib/affiliate";
import { buildSearchUrl } from "@/lib/search/url";
import { EXAMPLE_QUERIES } from "@/lib/site";
import type { AnswerTone, SearchResult } from "@/lib/search/searchStores";
import type { ScoredStore } from "@/lib/search/ranking";

const panelTone: Record<AnswerTone, string> = {
  recommend: "bg-accent-soft",
  neutral: "bg-surface",
  caution: "bg-surface border-l-2 border-warn/70",
};

const eyebrowTone: Record<AnswerTone, string> = {
  recommend: "text-accent-ink",
  neutral: "text-ink-muted",
  caution: "text-warn",
};

export function SearchResults({ result }: { result: SearchResult }) {
  const { best, alternatives, answer, followUps, activeFilters } = result;

  if (!best) {
    return (
      <div className="border border-line bg-surface p-8">
        <p className="font-display text-xl font-bold text-ink">{answer.headline}</p>
        {answer.subline && <p className="mt-2 text-sm text-ink-muted">{answer.subline}</p>}
        <p className="eyebrow mb-3 mt-7 text-ink-faint">Prøv for eksempel</p>
        <ul className="flex flex-col gap-2.5">
          {EXAMPLE_QUERIES.map((q) => (
            <li key={q}>
              <Link href={buildSearchUrl(q)} className="prompt group">
                <span
                  aria-hidden
                  className="text-gold transition-transform duration-200 group-hover:translate-x-0.5"
                >
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
    );
  }

  return (
    <div className="space-y-8">
      {/* The answer */}
      <div className="animate-rise-in">
        <h1 className="font-display text-[1.75rem] font-bold leading-[1.1] text-ink text-balance sm:text-[2.15rem]">
          {answer.headline}
        </h1>
        {answer.subline && (
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-muted text-pretty">
            {answer.subline}
          </p>
        )}
      </div>

      {/* Recommended store – an answer panel, not a product card */}
      <BestPanel
        item={best}
        answerTone={answer.tone}
        eyebrow={answer.bestLabel}
        activeFilters={activeFilters}
      />

      {/* Alternatives – compact, divided rows */}
      {alternatives.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Andre relevante butikker</h2>
          <div className="divide-y divide-line border-y border-line bg-paper">
            {alternatives.map((item) => (
              <AlternativeRow key={item.store.id} item={item} activeFilters={activeFilters} />
            ))}
          </div>
        </section>
      )}

      {/* Follow-ups as text prompts */}
      {followUps.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Forfin søket</h2>
          <ul className="flex flex-col gap-2.5">
            {followUps.map((f) => (
              <li key={f.label}>
                <Link href={f.href} className="prompt group">
                  <span aria-hidden className="text-gold transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                  <span className="border-b border-transparent pb-px transition-colors group-hover:border-line-strong">
                    {f.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-3 border-t border-line/70 pt-6">
        <DataNote />
        <Disclaimer />
      </div>
    </div>
  );
}

function BestPanel({
  item,
  answerTone,
  eyebrow,
  activeFilters,
}: {
  item: ScoredStore;
  answerTone: AnswerTone;
  eyebrow: string;
  activeFilters: FilterKey[];
}) {
  const { store, reasons } = item;
  const badges = priorityBadges(store, activeFilters, 4);
  const why = store.bestFor.slice(0, 3).join(" · ");
  const explain = reasons.slice(0, 3);

  return (
    <article className={`p-6 sm:p-7 ${panelTone[answerTone]}`}>
      {eyebrow && (
        <p className={`eyebrow mb-2 ${eyebrowTone[answerTone]}`}>{eyebrow}</p>
      )}
      <div className="flex items-center gap-3">
        <StoreLogo store={store} size="md" />
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
          <Link href={`/butikk/${store.slug}`} className="hover:text-accent-ink">
            {store.name}
          </Link>
        </h2>
      </div>

      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft text-pretty">
        {store.shortDescription}
      </p>

      {why && (
        <p className="mt-3 text-sm text-ink-muted">
          <span className="font-medium text-ink-soft">Passer godt for:</span> {why}
        </p>
      )}

      {/* Why recommended – integrated explanation, separated by a hairline */}
      {explain.length > 0 && (
        <div className="mt-5 border-t border-line/60 pt-4">
          <p className="eyebrow mb-2 text-ink-faint">Derfor</p>
          <ul className="space-y-1 text-sm text-ink-soft">
            {explain.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-pill bg-accent" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {store.warnings && store.warnings.length > 0 && (
        <p className="mt-4 text-sm leading-relaxed text-warn">⚠ {store.warnings[0]}</p>
      )}

      <div className="mt-5">
        <BadgeRow badges={badges} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={goHref(store)}
          rel={isAffiliate(store) ? OUTBOUND_REL : "noopener"}
          className="btn-primary"
        >
          Gå til {store.name}
        </a>
        <Link
          href={`/butikk/${store.slug}`}
          className="text-sm font-medium text-accent-ink underline-offset-2 hover:underline"
        >
          Se butikkprofil
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
        <DataQualityTag quality={store.dataQuality} />
        <span aria-hidden className="text-ink-faint">·</span>
        <span>Sist kontrollert {store.lastChecked}</span>
        {isAffiliate(store) && (
          <>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>annonselenke</span>
          </>
        )}
      </div>
    </article>
  );
}

function AlternativeRow({
  item,
  activeFilters,
}: {
  item: ScoredStore;
  activeFilters: FilterKey[];
}) {
  const { store } = item;
  const badges = priorityBadges(store, activeFilters, 3);
  const why = store.bestFor[0];

  return (
    <div className="flex flex-col gap-2 p-5 transition-colors hover:bg-paper/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <StoreLogo store={store} size="sm" className="mt-0.5" />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            <Link href={`/butikk/${store.slug}`} className="hover:text-accent-ink">
              {store.name}
            </Link>
          </h3>
          {why && <p className="mt-0.5 text-sm text-ink-muted text-pretty">{why}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <BadgeRow badges={badges} />
            <DataQualityTag quality={store.dataQuality} />
          </div>
        </div>
      </div>
      <a
        href={goHref(store)}
        rel={isAffiliate(store) ? OUTBOUND_REL : "noopener"}
        className="shrink-0 text-sm font-medium text-accent-ink underline-offset-2 hover:underline"
      >
        Til butikk →
      </a>
    </div>
  );
}
