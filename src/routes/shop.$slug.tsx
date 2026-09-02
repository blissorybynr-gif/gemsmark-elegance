import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Truck, ShieldCheck } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { pkr, usd } from "@/lib/currency";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.slice(0, 55)} | Gems Mark` },
          {
            name: "description",
            content: `${loaderData.title} — handcrafted 925 sterling silver. ${usd(loaderData.priceUsd)} / ${pkr(loaderData.priceUsd)} with free worldwide shipping.`,
          },
          { property: "og:title", content: `${loaderData.title} | Gems Mark` },
          { property: "og:description", content: `Handcrafted 925 sterling silver ${loaderData.stone} jewelry.` },
          { property: "og:image", content: loaderData.image },
          { name: "twitter:image", content: loaderData.image },
        ]
      : [],
  }),
  component: ProductPage,
});

const sizes = ["6", "7", "8", "9", "10", "11", "12", "Custom"];

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState("9");
  const related = products.filter((p) => p.stone === product.stone && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-luxe py-12">
      <nav className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link>{" "}
        / <span className="text-foreground">{product.stone}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <img src={product.image} alt={product.title} className="w-full bg-muted object-cover" />

        <div>
          <p className="eyebrow">{product.stone} · {product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight">{product.title}</h1>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl">{usd(product.priceUsd)}</span>
            {product.originalUsd && (
              <span className="text-muted-foreground line-through">{usd(product.originalUsd)}</span>
            )}
            <span className="bg-gold px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-navy-deep">
              Sale
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{pkr(product.priceUsd)}</p>

          <div className="mt-8">
            <p className="eyebrow">Ring size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors ${
                    size === s ? "border-gold bg-gold text-navy-deep" : "border-input hover:border-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="tracking-[0.2em] uppercase"
              onClick={() => {
                add({ ...product, ringSize: size });
                toast.success("Added to your bag");
              }}
            >
              Add to bag
            </Button>
            <Button asChild size="lg" variant="outline" className="tracking-[0.2em] uppercase">
              <a href={site.whatsappLink} target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
            </Button>
          </div>

          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Natural {product.stone} in
              925 sterling silver</li>
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Free worldwide shipping via
              FedEx, SkyNet, UPS or DHL</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Payment by bank
              transfer or Payoneer</li>
          </ul>

          <div className="mt-8 space-y-3 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
            <p>
              Handcrafted by our silversmiths in Multan, Pakistan. Each stone is hand-selected and set individually,
              so natural variations in colour and pattern make every piece one of a kind.
            </p>
            <p>
              Need another size, a different stone, or a fully custom design? Message us and we'll craft it for you.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-center font-display text-3xl">More in {product.stone}</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
