"use client";

export type ProfileTab = { id: string; label: string };

/**
 * Desktop-only underline navigation (max four tabs, no horizontal slider).
 * On mobile the sections stack vertically, so this is hidden under `sm`.
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
  return (
    <nav
      aria-label="Butikkprofil"
      className="mt-8 hidden border-b border-line sm:flex sm:gap-8"
    >
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            aria-current={on ? "page" : undefined}
            onClick={() => onSelect(t.id)}
            className={
              on
                ? "-mb-px border-b-2 border-accent pb-3 text-sm font-semibold text-ink"
                : "-mb-px border-b-2 border-transparent pb-3 text-sm text-ink-muted transition-colors hover:text-ink"
            }
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
