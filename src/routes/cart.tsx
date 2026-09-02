import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { pkr, usd } from "@/lib/currency";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Gems Mark" },
      { name: "description", content: "Review the handcrafted silver gemstone pieces in your Gems Mark bag." },
      { property: "og:title", content: "Your Bag | Gems Mark" },
      { property: "og:description", content: "Review your Gems Mark selection before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQuantity, remove, subtotalUsd } = useCart();

  return (
    <div className="container-luxe py-16">
      <h1 className="text-center font-display text-4xl">Your Bag</h1>
      <div className="gold-rule mx-auto mt-5" />

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Button asChild className="mt-6 tracking-[0.2em] uppercase">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-5 py-6">
                <img src={line.image} alt={line.title} className="h-28 w-28 object-cover" />
                <div className="flex-1">
                  <Link to="/shop/$slug" params={{ slug: line.slug }} className="font-display text-lg hover:text-gold">
                    {line.title}
                  </Link>
                  {line.ringSize && (
                    <p className="mt-1 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                      Size {line.ringSize}
                    </p>
                  )}
                  <p className="mt-2 text-sm">
                    {usd(line.priceUsd)} <span className="text-muted-foreground">· {pkr(line.priceUsd)}</span>
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(e) => setQuantity(line.id, Number(e.target.value))}
                      className="w-20 border border-input bg-background px-3 py-1.5 text-sm"
                    />
                    <button
                      onClick={() => remove(line.id)}
                      className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-card p-7">
            <h2 className="eyebrow">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{usd(subtotalUsd)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>In rupees</dt>
                <dd>{pkr(subtotalUsd)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd>Free worldwide</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
                <dt>Total</dt>
                <dd>{usd(subtotalUsd)}</dd>
              </div>
            </dl>
            <Button asChild className="mt-6 w-full tracking-[0.2em] uppercase">
              <Link to="/checkout">Checkout</Link>
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">Bank Transfer · Payoneer</p>
          </aside>
        </div>
      )}
    </div>
  );
}
