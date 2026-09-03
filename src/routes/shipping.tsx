import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns | Gems Mark" },
      {
        name: "description",
        content: "Gems Mark ships worldwide via FedEx, DHL, UPS and SkyNet Worldwide Express with tracking on every order.",
      },
      { property: "og:title", content: "Shipping & Returns | Gems Mark" },
      { property: "og:description", content: "Worldwide tracked delivery on handcrafted silver jewelry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">Delivery</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Shipping & Returns</h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-sm text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl text-foreground">Couriers</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {site.couriers.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl text-foreground">Processing & delivery</h2>
          <p className="mt-3">
            Ready-to-ship pieces are dispatched within 2–3 business days. Custom and made-to-order rings take 7–14
            business days at the bench. Worldwide delivery usually takes 5–10 business days once dispatched, and
            every order travels with a tracking number you can follow on our Track Order page.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-foreground">Payment</h2>
          <p className="mt-3">
            We accept Bank Transfer and Payoneer. Once your order is placed we send payment instructions to your
            email, and your piece enters production as soon as payment is confirmed.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl text-foreground">Returns</h2>
          <p className="mt-3">
            If a piece arrives damaged or is not as described, contact us at {site.email} within 7 days of delivery
            and we will arrange a repair, replacement or refund. Custom and personalised pieces are not returnable
            unless faulty.
          </p>
        </section>
      </div>
    </div>
  );
}
