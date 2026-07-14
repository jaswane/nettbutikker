"use client";

export type ProfileTab = { id: string; label: string };

/**
 * Segmented tab navigation for the store profile. All tabs are visible (no
 * slider): on mobile a grid of 2 (four tabs → 2×2) or 3 (three tabs → one
 * row); on desktop one row matching the tab count. Thin uniform dividers via
 * a 1px grid gap over a line-coloured background – works for any column count
 * with no empty cells. Selected = petrol on white; sharp corners, no shadow.
 *
 * Purely visual navigation: every panel is server-rendered in the initial
 * HTML and toggled with CSS, so crawlers read all content.
 */
export function StoreProfileNav({
  tabs,
  active,
  onSelect,
}: {
  tabs: readonly ProfileTab[];
  active: string;
  onSelect: (id: string) => void;
}) {
  // Static class strings so Tailwind keeps them; only 3 or 4 tabs occur.
  const cols =
    tabs.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-3";

  return (
    <nav aria-label="Butikkprofil" className="mt-8">
      <div
        role="tablist"
        className={`grid ${cols} gap-px border border-line-strong bg-line`}
      >
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              onClick={() => onSelect(t.id)}
              className={`min-h-[44px] px-3 py-2.5 text-sm transition-colors duration-150 ${
                on
                  ? "bg-accent font-semibold text-white"
                  : "bg-paper text-ink-soft hover:bg-accent-soft hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
