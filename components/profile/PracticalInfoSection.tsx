import { DATA_QUALITY_TEXT } from "@/data/attribute-definitions";
import { COUNTRY, dagerFc, ja, jaFc, returfristFc, shipText, TRUST } from "@/lib/storeFormat";
import type { Confidence, Store } from "@/lib/types";

/** Plain-Norwegian labels for what a source supports. */
const SUPPORTS_TEXT: Record<string, string> = {
  productRange: "sortiment",
  payments: "betaling",
  shipping: "frakt og levering",
  returns: "retur",
  company: "selskapsinformasjon",
  brands: "merkevarer",
  clickAndCollect: "klikk og hent",
  priceMatch: "prismatch",
  marketplace: "markedsplasstruktur",
  voec: "VOEC/avgifter",
  productSafety: "produktsikkerhet",
  customerService: "kundeservice",
  partnerSales: "partnersalg",
  membership: "medlemsfordeler",
  subscriptions: "abonnement",
  deliveryArea: "leveringsområde",
  cancellation: "endring og kansellering",
  perishableGoods: "bedervelige varer",
};

type Row = { label: string; value: string };

/** True claims only – and unknown-confidence never asserts (claims-modell §8). */
function flag(fc?: { value: boolean; confidence: Confidence }): boolean {
  return fc?.value === true && fc.confidence !== "unknown";
}

/** A flat label/value group – thin separators, no box around it. */
function Group({ title, rows }: { title: string; rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <section>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <dl className="mt-2">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex items-baseline justify-between gap-6 py-2.5 text-sm ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <dt className="text-ink-muted">{r.label}</dt>
            <dd className="text-right font-medium text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Practical info: everything factual, merged and grouped in plain Norwegian. */
export function PracticalInfoSection({ store }: { store: Store }) {
  const a = store.attributes;

  const betaling: Row[] = [
    { label: "Vipps", value: jaFc(a.payments.vipps) },
    { label: "Klarna", value: jaFc(a.payments.klarna) },
    { label: "PayPal", value: jaFc(a.payments.paypal) },
    { label: "Apple Pay", value: jaFc(a.payments.applePay) },
    { label: "Google Pay", value: jaFc(a.payments.googlePay) },
    { label: "Amex", value: jaFc(a.payments.amex) },
  ];

  const frakt: Row[] = [
    { label: "Frakt", value: shipText(a.shipping.shippingType) },
    ...(a.shipping.freeShippingFrom?.value != null
      ? [{ label: "Fri frakt over", value: `${a.shipping.freeShippingFrom.value} kr` }]
      : []),
    { label: "Leveringstid", value: dagerFc(a.shipping.deliveryDays, "ca. ") },
    { label: "Hjemlevering", value: jaFc(a.shipping.homeDelivery) },
    { label: "Klikk og hent", value: jaFc(a.shipping.clickAndCollect) },
    { label: "Instabox", value: jaFc(a.shipping.instabox) },
  ];

  // Return terms are a top purchase-decision driver – own group.
  const retur: Row[] = [
    { label: "Returfrist", value: returfristFc(a.returns) },
    { label: "Fri retur", value: jaFc(a.returns.freeReturns) },
  ];

  const omButikken: Row[] = [
    { label: "Land", value: COUNTRY[store.country] },
    { label: "Norsk butikk", value: ja(store.isNorwegian) },
    { label: "Sender til Norge", value: ja(store.shipsToNorway) },
    // VOEC gjelder utenlandske tilbydere. For norske butikker settes claimet
    // ikke (registerstatus er ikke en butikkegenskap) – da skjules raden i
    // stedet for å vise et misvisende «Ukjent».
    ...(a.geography.voec ? [{ label: "VOEC", value: jaFc(a.geography.voec) }] : []),
    { label: "Vår tillitsvurdering", value: TRUST[store.trustLevel] },
  ];

  // Other terms: only surface the ones that actually apply, to avoid a wall of "Nei".
  const c = a.commercial;
  const andreVilkar: Row[] = [
    flag(c.subscription) && { label: "Abonnement", value: jaFc(c.subscription) },
    flag(c.bindingPeriod) && { label: "Bindingstid", value: jaFc(c.bindingPeriod) },
    flag(c.freeTrial) && { label: "Gratis prøve", value: jaFc(c.freeTrial) },
    flag(c.introOffer) && { label: "Introtilbud", value: jaFc(c.introOffer) },
    flag(c.giftCard) && { label: "Gavekort", value: jaFc(c.giftCard) },
    flag(c.outlet) && { label: "Outlet", value: jaFc(c.outlet) },
    flag(c.priceMatch) && { label: "Prismatch", value: jaFc(c.priceMatch) },
  ].filter(Boolean) as Row[];

  return (
    <div>
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <Group title="Betaling" rows={betaling} />
        <Group title="Frakt og levering" rows={frakt} />
        <Group title="Retur og kundeservice" rows={retur} />
        <Group title="Om butikken" rows={omButikken} />
        <Group title="Andre vilkår" rows={andreVilkar} />
      </div>

      {/* Kilder og sist kontrollert – full bredde nederst */}
      <section className="mt-10 border-t border-line pt-6">
        <h3 className="text-sm font-semibold text-ink">Kilder og sist kontrollert</h3>
        <p className="mt-1.5 text-sm text-ink-muted">
          Sist kontrollert {store.lastChecked} · Datakvalitet {store.dataQuality} –{" "}
          {DATA_QUALITY_TEXT[store.dataQuality]}
        </p>
        {store.sources && store.sources.length > 0 ? (
          <ul className="mt-3">
            {store.sources.map((src) => (
              <li
                key={src.url}
                className="flex flex-col gap-0.5 border-t border-line py-2.5 text-sm first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-link"
                >
                  {src.label} ↗
                </a>
                <span className="text-xs text-ink-muted">
                  Kontrollert {src.checkedAt}
                  {src.supports && src.supports.length > 0 && (
                    <> · dekker {src.supports.map((s) => SUPPORTS_TEXT[s] ?? s).join(", ")}</>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-muted">
            Kildeliste er ikke lagt inn for denne butikken ennå. Opplysningene er
            basert på butikkens egne sider og kontrolleres manuelt.
          </p>
        )}
      </section>
    </div>
  );
}
