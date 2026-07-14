import type { Store } from "@/lib/types";

/**
 * Store logo with a discreet initial-based fallback.
 *
 * The holder adapts to the logo's own background (never auto-stripped):
 *  - transparent → shown directly, no holder, no border (avoids a card look)
 *  - light       → white holder with a very faint 1px border
 *  - dark        → dark holder for light-on-transparent artwork
 * Common: no rounding, no shadow, object-contain, capped height, small
 * vertical padding, small logos are never stretched. Files live in
 * /public/logos/ (see docs/BRAND_ASSETS.md); never hotlink third-party logos.
 *
 * Stores without a logo keep a square petrol-tinted initial tile.
 */

const SIZES = {
  sm: { img: "h-6", pad: "px-1.5 py-0.5", maxW: "max-w-[104px]", box: "h-7 w-7", text: "text-[11px]" },
  md: { img: "h-8", pad: "px-2 py-1", maxW: "max-w-[150px]", box: "h-10 w-10", text: "text-sm" },
  lg: { img: "h-10", pad: "px-2 py-1", maxW: "max-w-[210px]", box: "h-14 w-14", text: "text-lg" },
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

  if (store.logo?.src) {
    const bg = store.logo.background ?? "light";
    const img = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={store.logo.src}
        alt={store.logo.alt ?? store.name}
        className={`${s.img} w-auto object-contain`}
      />
    );

    // Transparent logos need no chrome – show them directly.
    if (bg === "transparent") {
      return (
        <span className={`inline-flex shrink-0 overflow-hidden ${s.maxW} ${className}`}>
          {img}
        </span>
      );
    }

    // light / dark → adaptive holder that hugs the logo (sharp corners,
    // faint/dark surface), capped and clipped for pathologically wide logos.
    return (
      <span
        className={`inline-flex shrink-0 items-center overflow-hidden ${s.pad} ${s.maxW} border ${
          bg === "dark" ? "border-ink/20 bg-ink" : "border-line/70 bg-white"
        } ${className}`}
      >
        {img}
      </span>
    );
  }

  // Fallback: square, light petrol tile with a deep petrol initial.
  return (
    <span
      aria-hidden
      className={`${s.box} ${s.text} grid shrink-0 place-items-center bg-accent-soft font-bold text-accent-ink ${className}`}
    >
      {store.name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
