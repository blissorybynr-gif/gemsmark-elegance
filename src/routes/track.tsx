import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/data/site";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order | Gems Mark" },
      {
        name: "description",
        content: "Enter your Gems Mark order number and email to see the current status, courier and tracking number.",
      },
      { property: "og:title", content: "Track Your Order | Gems Mark" },
      { property: "og:description", content: "Follow your handcrafted silver jewelry from bench to doorstep." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Track,
});

type Result = {
  order_number: string;
  status: string;
  courier: string | null;
  tracking_number: string | null;
  created_at: string;
};

function Track() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    const { data } = await supabase
      .from("orders")
      .select("order_number, status, courier, tracking_number, created_at")
      .eq("order_number", orderNumber.trim().toUpperCase())
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();
    setBusy(false);
    if (!data) {
      setError("We could not find an order with those details. Check the order number and email you used at checkout.");
      return;
    }
    setResult(data as Result);
  };

  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">Order status</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Track Your Order</h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <form onSubmit={submit} className="mx-auto mt-10 max-w-md space-y-4 border border-border bg-card p-8">
        <div>
          <Label htmlFor="order">Order number</Label>
          <Input
            id="order"
            required
            placeholder="GM-XXXXXX"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="email">Email used at checkout</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2"
          />
        </div>
        <Button type="submit" disabled={busy} className="w-full tracking-[0.2em] uppercase">
          {busy ? "Searching…" : "Track order"}
        </Button>
      </form>

      {error && <p className="mx-auto mt-6 max-w-md text-center text-sm text-destructive">{error}</p>}

      {result && (
        <div className="mx-auto mt-8 max-w-md border border-border bg-card p-8 text-sm">
          <p className="eyebrow">Order {result.order_number}</p>
          <dl className="mt-4 space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="capitalize">{result.status.replace(/_/g, " ")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Placed</dt>
              <dd>{new Date(result.created_at).toLocaleDateString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Courier</dt>
              <dd>{result.courier ?? "Assigned at dispatch"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Tracking number</dt>
              <dd className="break-all text-right">{result.tracking_number ?? "Pending"}</dd>
            </div>
          </dl>
        </div>
      )}

      <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted-foreground">
        We ship with {site.couriers.join(", ")}. Need help? Email {site.email}.
      </p>
    </div>
  );
}
