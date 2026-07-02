import type { Store } from "@/lib/types";

/**
 * Store logo with a discreet initial-based fallback.
 *
 * Future logos: drop local files at /public/logos/[slug].svg (or .png) and set
 *   logo: { src: "/logos/[slug].svg", alt: "Butikknavn", background: "light" }
 * on the store in data/stores.ts. Until a file exists we render the initial.
 * Never hotlink third-party logos or store favicons.
 */

const SIZES = {
  sm: { box: "h-7 w-7", text: "text-[11px]" },
  md: { box: "h-10 w-10", text: "text-sm" },
  lg: { box: "h-14 w-14", text: "text-lg" },
} as const;

type Size = keyof typeof SIZES;

export function StoreLogo({
  store,
  size = "md",
  className = "",
}: {
  store: Pick<Store, "name" | "slug" | "logo">;
  size?: Size;
  className?: string;
}) {
  const s = SIZES[size];
  const initial = store.name.trim().charAt(0).toUpperCase();

  if (store.logo?.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={store.logo.src}
        alt={store.logo.alt ?? store.name}
        className={`${s.box} shrink-0 border border-line object-contain ${
          store.logo.background === "dark" ? "bg-ink" : "bg-white"
        } p-1 ${className}`}
      />
    );
  }

  // Fallback: square, light petrol tile with a deep petrol initial.
  return (
    <span
      aria-hidden
      className={`${s.box} ${s.text} grid shrink-0 place-items-center bg-accent-soft font-bold text-accent-ink ${className}`}
    >
      {initial}
    </span>
  );
}
