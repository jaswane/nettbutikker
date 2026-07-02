import type { Store } from "@/lib/types";

/** Overview: editorial verdict, fit/not-fit as plain text columns, warnings. */
export function OverviewSection({ store }: { store: Store }) {
  return (
    <div className="space-y-8">
      <p className="max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
        {store.longDescription ?? store.shortDescription}
      </p>

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

      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">Passer best til</h3>
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
            <h3 className="text-sm font-semibold text-ink">Mindre egnet for</h3>
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
