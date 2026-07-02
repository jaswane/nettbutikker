import { site } from "@/lib/site";

/** Standard reservation shown on results and store profiles (PRD §20). */
export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2 rounded-md border border-line bg-paper px-3.5 py-3 text-xs leading-relaxed text-ink-muted ${className}`}
    >
      <span aria-hidden className="mt-px text-accent">
        ⓘ
      </span>
      <span>{site.disclaimer}</span>
    </p>
  );
}
