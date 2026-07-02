"use client";

import { useState } from "react";
import { StoreProfileHeader } from "@/components/profile/StoreProfileHeader";
import { StoreProfileNav, type ProfileTab } from "@/components/profile/StoreProfileNav";
import { OverviewSection } from "@/components/profile/OverviewSection";
import { PracticalInfoSection } from "@/components/profile/PracticalInfoSection";
import { BrandsSection } from "@/components/profile/BrandsSection";
import { ReviewsSection } from "@/components/profile/ReviewsSection";
import { RelatedStores } from "@/components/profile/RelatedStores";
import type { Store } from "@/lib/types";

const TABS = [
  { id: "oversikt", label: "Oversikt" },
  { id: "info", label: "Praktisk info" },
  { id: "merker", label: "Merkevarer og kategorier" },
  { id: "omtaler", label: "Omtaler" },
] as const satisfies readonly ProfileTab[];

type TabId = (typeof TABS)[number]["id"];

/**
 * Store profile orchestrator. Desktop: underline tabs show one section.
 * Mobile: sections stack vertically (the tab nav is hidden under `sm`).
 */
export function StoreProfile({ store, related }: { store: Store; related: Store[] }) {
  const [active, setActive] = useState<TabId>("oversikt");

  return (
    <div>
      <StoreProfileHeader store={store} />
      <StoreProfileNav tabs={TABS} active={active} onSelect={(id) => setActive(id as TabId)} />

      <div className="mt-8">
        <Section id="oversikt" active={active} label="Oversikt">
          <OverviewSection store={store} />
        </Section>
        <Section id="info" active={active} label="Praktisk info">
          <PracticalInfoSection store={store} />
        </Section>
        <Section id="merker" active={active} label="Merkevarer og kategorier">
          <BrandsSection store={store} />
        </Section>
        <Section id="omtaler" active={active} label="Omtaler">
          <ReviewsSection store={store} />
        </Section>
      </div>

      <RelatedStores stores={related} />
    </div>
  );
}

/** Visible when active (desktop) or always (mobile, stacked with a heading). */
function Section({
  id,
  active,
  label,
  children,
}: {
  id: TabId;
  active: TabId;
  label: string;
  children: React.ReactNode;
}) {
  const on = active === id;
  return (
    <section className={on ? "block" : "block sm:hidden"}>
      <h2 className="mb-4 border-t border-line pt-7 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint sm:hidden">
        {label}
      </h2>
      {children}
    </section>
  );
}
