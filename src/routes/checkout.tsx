import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/lib/cart";
import { pkr, toPkr, usd } from "@/lib/currency";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Gems Mark" },
      { name: "description", content: "Complete your Gems Mark order — pay by bank transfer or Payoneer." },
      { property: "og:title", content: "Checkout | Gems Mark" },
      { property: "og:description", content: "Secure checkout for handcrafted silver gemstone jewelry." },
    ],
  }),
  component: Checkout,
});

const empty = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postal_code: "",
  country: "Pakistan",
  notes: "",
  payment_method: "bank_transfer",
};

function Checkout() {
  const { user, loading } = useAuth();
  const { lines, subtotalUsd, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) setForm((f) => ({ ...f, email: f.email || user.email! }));
  }, [user]);

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (lines.length === 0) return toast.error("Your bag is empty");
    setSaving(true);
    const orderNumber = `GM-${Date.now().toString(36).toUpperCase()}`;
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postal_code: form.postal_code,
        country: form.country,
        ring_size: lines.map((l) => l.ringSize).filter(Boolean).join(", ") || null,
        notes: form.notes,
        payment_method: form.payment_method,
        subtotal_usd: subtotalUsd,
        total_usd: subtotalUsd,
        total_pkr: toPkr(subtotalUsd),
      })
      .select("id, order_number")
      .single();

    if (error || !data) {
      setSaving(false);
      return toast.error(error?.message ?? "Could not place order");
    }

    const { error: itemError } = await supabase.from("order_items").insert(
      lines.map((l) => ({
        order_id: data.id,
        product_id: l.id,
        title: l.title,
        image: l.image,
        unit_price_usd: l.priceUsd,
        quantity: l.quantity,
      })),
    );
    setSaving(false);
    if (itemError) return toast.error(itemError.message);

    clear();
    toast.success(`Order ${data.order_number} placed`);
    navigate({ to: "/account" });
  };

  if (loading) return <div className="container-luxe py-24 text-center text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-4xl">Sign in to checkout</h1>
        <p className="mt-4 text-muted-foreground">
          Create a buyer account so you can track your order and see your history.
        </p>
        <Button asChild className="mt-8 tracking-[0.2em] uppercase">
          <Link to="/auth">Sign in or register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-16">
      <h1 className="text-center font-display text-4xl">Checkout</h1>
      <div className="gold-rule mx-auto mt-5" />

      <form onSubmit={submit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <h2 className="eyebrow">Buyer details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.full_name} onChange={set("full_name")} />
              <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
              <Field label="Phone / WhatsApp" required value={form.phone} onChange={set("phone")} />
              <Field label="City" required value={form.city} onChange={set("city")} />
              <Field label="Postal code" value={form.postal_code} onChange={set("postal_code")} />
              <Field label="Country" required value={form.country} onChange={set("country")} />
            </div>
            <div className="mt-4">
              <Label htmlFor="address">Full shipping address</Label>
              <Textarea
                id="address"
                required
                value={form.address}
                onChange={set("address")}
                className="mt-2"
                rows={3}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="notes">Order notes (ring size, engraving, custom requests)</Label>
              <Textarea id="notes" value={form.notes} onChange={set("notes")} className="mt-2" rows={3} />
            </div>
          </section>

          <section>
            <h2 className="eyebrow">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {site.paymentMethods.map((m) => (
                <label
                  key={m.value}
                  className={`cursor-pointer border p-4 text-sm transition-colors ${
                    form.payment_method === m.value ? "border-gold bg-secondary" : "border-input"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="mr-2"
                    checked={form.payment_method === m.value}
                    onChange={() => setForm((f) => ({ ...f, payment_method: m.value }))}
                  />
                  {m.label}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              After placing your order we email the bank transfer or Payoneer payment details. Your piece ships once
              payment is confirmed.
            </p>
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-7">
          <h2 className="eyebrow">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-3 text-sm">
                <img src={l.image} alt={l.title} className="h-16 w-16 object-cover" />
                <div className="flex-1">
                  <p className="line-clamp-2">{l.title}</p>
                  <p className="text-muted-foreground">× {l.quantity}</p>
                </div>
                <p>{usd(l.priceUsd * l.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Total (USD)</dt><dd>{usd(subtotalUsd)}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>Total (PKR)</dt><dd>{pkr(subtotalUsd)}</dd></div>
          </dl>
          <Button type="submit" disabled={saving || lines.length === 0} className="mt-6 w-full tracking-[0.2em] uppercase">
            {saving ? "Placing order…" : "Place order"}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} required={required} value={value} onChange={onChange} className="mt-2" />
    </div>
  );
}
