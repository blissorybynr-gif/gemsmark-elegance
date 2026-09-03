import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { usd, pkr } from "@/lib/currency";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account & Order History | Gems Mark" },
      {
        name: "description",
        content: "View your Gems Mark buyer account, order history, courier and tracking details.",
      },
      { property: "og:title", content: "My Account | Gems Mark" },
      { property: "og:description", content: "Your Gems Mark orders and tracking in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

type Order = {
  id: string;
  order_number: string;
  status: string;
  courier: string | null;
  tracking_number: string | null;
  total_usd: number;
  total_pkr: number;
  created_at: string;
};

function Account() {
  const { user, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) {
      setFetching(false);
      return;
    }
    setFetching(true);
    supabase
      .from("orders")
      .select("id, order_number, status, courier, tracking_number, total_usd, total_pkr, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data ?? []) as Order[]);
        setFetching(false);
      });
  }, [user]);

  if (loading) return <div className="container-luxe py-24 text-center text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-4xl">My Account</h1>
        <p className="mt-4 text-muted-foreground">Sign in to see your orders and tracking.</p>
        <Button asChild className="mt-8 tracking-[0.2em] uppercase">
          <Link to="/auth">Sign in or register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Buyer account</p>
          <h1 className="mt-3 font-display text-4xl">{user.email}</h1>
        </div>
        <Button variant="outline" onClick={() => signOut()} className="tracking-[0.2em] uppercase">
          Sign out
        </Button>
      </div>

      <h2 className="mt-12 font-display text-2xl">Order history</h2>
      {fetching ? (
        <p className="mt-6 text-muted-foreground">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          No orders yet.{" "}
          <Link to="/shop" className="text-gold hover:underline">
            Browse the collection
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-border bg-card p-6 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-lg">{o.order_number}</p>
                <span className="border border-gold px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase text-gold">
                  {o.status.replace(/_/g, " ")}
                </span>
              </div>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Placed</dt>
                  <dd>{new Date(o.created_at).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Total</dt>
                  <dd>
                    {usd(o.total_usd)} · {pkr(o.total_pkr)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Courier</dt>
                  <dd>{o.courier ?? "Assigned at dispatch"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Tracking</dt>
                  <dd className="break-all text-right">{o.tracking_number ?? "Pending"}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
