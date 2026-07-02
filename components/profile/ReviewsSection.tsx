import type { Store } from "@/lib/types";

/** Reviews: no form/comments/login in the MVP – text + optional editorial verdict. */
export function ReviewsSection({ store }: { store: Store }) {
  const hasEditorial =
    store.reviewSummary ||
    (store.editorialPros && store.editorialPros.length > 0) ||
    (store.editorialCons && store.editorialCons.length > 0);

  return (
    <div className="space-y-8">
      <p className="max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
        Brukeromtaler er ikke åpnet ennå. Vi vurderer å åpne for omtaler senere, slik at du kan
        dele egne erfaringer med butikken.
      </p>

      {hasEditorial && (
        <div className="border-t border-line pt-6">
          <h3 className="text-sm font-semibold text-ink">Vår vurdering</h3>
          {store.reviewSummary && (
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
              {store.reviewSummary}
            </p>
          )}
          <div className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {store.editorialPros && store.editorialPros.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Styrker
                </p>
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
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Svakheter
                </p>
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
        </div>
      )}
    </div>
  );
}
