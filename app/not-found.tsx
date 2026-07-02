import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-narrow flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-accent-ink">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tightish text-ink">
        Fant ikke siden
      </h1>
      <p className="mt-3 text-ink-muted">
        Siden finnes ikke, men søket gjør det.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">
          Til forsiden
        </Link>
        <Link href="/nettbutikker" className="btn-ghost">
          Alle nettbutikker
        </Link>
      </div>
    </div>
  );
}
