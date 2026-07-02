import type { AttributeBadge, BadgeTone } from "@/data/attribute-definitions";

const toneClass: Record<BadgeTone, string> = {
  accent: "badge-accent",
  neutral: "badge-neutral",
  ok: "badge-ok",
  warn: "badge-warn",
};

export function Badge({
  label,
  tone = "neutral",
  uncertain = false,
}: {
  label: string;
  tone?: BadgeTone;
  uncertain?: boolean;
}) {
  return (
    <span
      className={toneClass[tone]}
      title={uncertain ? "Ikke bekreftet – sjekk hos butikken" : undefined}
    >
      {label}
    </span>
  );
}

export function BadgeRow({ badges }: { badges: AttributeBadge[] }) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => (
        <Badge key={b.label} label={b.label} tone={b.tone} uncertain={b.uncertain} />
      ))}
    </div>
  );
}
