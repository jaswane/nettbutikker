import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line-strong bg-paper">
      {/* sharp petrol detail line under the header */}
      <div className="h-0.5 w-full bg-accent" aria-hidden />
      <div className="relative mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
        {/* Brand lockup – wordmark only, no app-icon chip. */}
        <Link
          href="/"
          aria-label={`${site.name} – til forsiden`}
          className="font-display text-[21px] font-extrabold tracking-tight text-ink"
        >
          {site.shortName}
          <span className="text-accent">.</span>
          <span className="font-semibold text-ink-muted">no</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <MobileMenu items={mainNav} />
      </div>
    </header>
  );
}
