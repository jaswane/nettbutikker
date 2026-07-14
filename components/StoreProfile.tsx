"use client";

import { useState } from "react";
import { StoreProfileHeader } from "@/components/profile/StoreProfileHeader";
import { StoreProfileNav, type ProfileTab } from "@/components/profile/StoreProfileNav";
import { OverviewSection } from "@/components/profile/OverviewSection";
import { PracticalInfoSection } from "@/components/profile/PracticalInfoSection";
import { BrandsSection } from "@/components/profile/BrandsSection";
import { RelatedStores } from "@/components/profile/RelatedStores";
import type { Store } from "@/lib/types";

/**
 * Store profile orchestrator. The tab bar is visual navigation only: every
 * panel is server-rendered in the initial HTML and hidden with CSS, so the
 * full content is always crawlable (SEO/AI-søk) regardless of JavaScript.
 *
 * Three fixed tabs. «Omtaler» is deliberately absent: the editorial verdict
 * lives in Oversikt («Vår vurdering»), and a reviews tab returns only when a
 * real user-review system exists (see profile/ReviewsSection.tsx).
 */
export function StoreProfile({ store, related }: { store: Store; related: Store[] }) {
  const tabs: ProfileTab[] = [
    { id: "oversikt", label: "Oversikt" },
    { id: "info", label: "Praktisk info" },
    { id: "merker", label: "Merkevarer" },
  ];

  const [active, setActive] = useState("oversikt");

  return (
    <div>
      <StoreProfileHeader store={store} />
      <StoreProfileNav tabs={tabs} active={active} onSelect={setActive} />

      <div className="mt-8">
        <Panel id="oversikt" active={active}>
          <OverviewSection store={store} />
        </Panel>
        <Panel id="info" active={active}>
          <PracticalInfoSection store={store} />
        </Panel>
        <Panel id="merker" active={active}>
          <BrandsSection store={store} />
        </Panel>
      </div>

      <RelatedStores stores={related} />
    </div>
  );
}

/**
 * Tab panel. Inactive panels get the `hidden` attribute (display:none) but
 * remain in the DOM/initial HTML – content is never fetched on click.
 */
function Panel({
  id,
  active,
  children,
}: {
  id: string;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <section
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={active !== id}
    >
      {children}
    </section>
  );
}
