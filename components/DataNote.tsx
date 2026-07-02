import { DATA_QUALITY_LEGEND } from "@/data/attribute-definitions";

/**
 * Professional data-quality note explaining the A–D scale. Kept neutral – no
 * "prototype"/"demo" wording in rendered output.
 */
export function DataNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`border-l-2 border-accent/40 pl-3 text-[13px] leading-relaxed text-ink-muted ${className}`}
    >
      <span className="font-medium text-ink-soft">Datakvalitet:</span> opplysningene
      vurderes manuelt og oppdateres jevnlig. {DATA_QUALITY_LEGEND}.
    </p>
  );
}
