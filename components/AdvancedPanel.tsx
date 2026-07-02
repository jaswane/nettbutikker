"use client";

import { FILTERS, FILTER_GROUPS, type FilterKey } from "@/data/attribute-definitions";

type Props = {
  active: Set<FilterKey>;
  onToggle: (key: FilterKey) => void;
  onClear: () => void;
  onClose: () => void;
};

/**
 * Advanced Mode filters (PRD §13). Bottom-sheet on mobile, inline panel on
 * desktop. Hidden by default – the parent controls visibility.
 */
export function AdvancedPanel({ active, onToggle, onClear, onClose }: Props) {
  return (
    <>
      <button
        type="button"
        aria-label="Lukk filtre"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm sm:hidden"
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] animate-sheet-up overflow-y-auto rounded-t-xl bg-surface p-5 shadow-lift sm:static sm:z-auto sm:max-h-none sm:animate-rise-in sm:rounded-lg sm:p-6 sm:shadow-soft"
        role="dialog"
        aria-label="Avanserte filtre"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-ink">Avansert søk</h2>
            <p className="text-[13px] text-ink-muted">Snevre inn med krav til butikken</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 shrink-0 rounded-md px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink"
          >
            Ferdig
          </button>
        </div>

        <div className="space-y-5">
          {FILTER_GROUPS.map((group) => {
            const items = FILTERS.filter((f) => f.group === group);
            return (
              <fieldset key={group}>
                <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  {group}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {items.map((f) => {
                    const on = active.has(f.key);
                    return (
                      <button
                        key={f.key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onToggle(f.key)}
                        className={
                          on
                            ? "inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-3 py-2 text-sm font-medium text-accent-ink transition-colors"
                            : "inline-flex items-center gap-1.5 rounded-md bg-paper px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
                        }
                      >
                        <span
                          aria-hidden
                          className={
                            on
                              ? "grid h-4 w-4 place-items-center rounded-[5px] bg-accent text-[10px] leading-none text-paper"
                              : "h-4 w-4 rounded-[5px] border border-line-strong"
                          }
                        >
                          {on ? "✓" : ""}
                        </span>
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>

        {active.size > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="mt-5 text-sm text-accent-ink underline-offset-2 hover:underline"
          >
            Nullstill {active.size} filter
          </button>
        )}
      </div>
    </>
  );
}
