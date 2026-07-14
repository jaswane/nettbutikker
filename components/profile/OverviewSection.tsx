import type { Store } from "@/lib/types";

/**
 * Oversikt, in fixed reading order (redaksjonell standard):
 *  A. Direct summary (50–80 ord) – what, for whom, what it doesn't cover.
 *  B. Full editorial description as H2 sections (≥300 ord when verified).
 *  C. «Vår vurdering» – redaksjonell dom (summary + styrker/svakheter).
 *     Editorial, never user reviews; no stars, no rating, no Review schema.
 *     Hidden entirely when the store has no editorial verdict yet.
 *  D. Passer best til / Mindre egnet for as plain text columns.
 * Warnings stay on top – trust first. No cards, no background boxes.
 */
export function OverviewSection({ store }: { store: Store }) {
  const hasVerdict = Boolean(
    store.reviewSummary || store.editorialPros?.length || store.editorialCons?.length,
  );

  return (
    <div className="space-y-8">
      {store.warnings && store.warnings.length > 0 && (
        <div className="border-l-2 border-bad/70 pl-4">
          <p className="text-sm font-semibold text-bad">Vær oppmerksom</p>
          <ul className="mt-1 space-y-1 text-sm text-bad/90">
            {store.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* A. Direct summary */}
      <p className="max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
        {store.longDescription ?? store.shortDescription}
      </p>

      {/* B. Full description – H2 sections, ~70–75 tegn linjebredde */}
      {store.descriptionSections && store.descriptionSections.length > 0 && (
        <div className="max-w-prose space-y-7">
          {store.descriptionSections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-bold tracking-tight text-ink">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-2.5 text-[15px] leading-relaxed text-ink-soft text-pretty"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* C. Redaksjonell vurdering – aldri brukeromtaler, aldri rating */}
      {hasVerdict && (
        <section className="border-t border-line pt-7">
          <h2 className="text-base font-bold tracking-tight text-ink">Vår vurdering</h2>
          <p className="mt-1 text-xs text-ink-muted">
            Redaksjonell vurdering fra Nettbutikker.no, basert på informasjonen og
            kildene som er oppgitt på siden.
          </p>
          {store.reviewSummary && (
            <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
              {store.reviewSummary}
            </p>
          )}
          <div className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {store.editorialPros && store.editorialPros.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Styrker
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {store.editorialPros.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-accent" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {store.editorialCons && store.editorialCons.length > 0 && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Svakheter
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {store.editorialCons.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-ink-faint" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* D. Fit / not fit */}
      <div className="grid gap-x-10 gap-y-6 border-t border-line pt-7 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-ink">Passer best til</h2>
          <ul className="mt-2.5 space-y-1.5 text-sm text-ink-soft">
            {store.bestFor.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
        {store.notBestFor && store.notBestFor.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-ink">Mindre egnet for</h2>
            <ul className="mt-2.5 space-y-1.5 text-sm text-ink-soft">
              {store.notBestFor.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-ink-faint" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {store.notes && store.notes.length > 0 && (
        <div className="border-t border-line pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Merknader</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">
            {store.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
