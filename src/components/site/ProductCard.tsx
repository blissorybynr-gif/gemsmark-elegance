import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { pkr, usd } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalUsd && product.originalUsd > product.priceUsd
      ? Math.round((1 - product.priceUsd / product.originalUsd) * 100)
      : null;

  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block bg-card transition-shadow hover:shadow-luxe"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-3 top-3 bg-gold px-2 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-navy-deep">
            {discount}% off
          </span>
        )}
      </div>
      <div className="space-y-1 p-4 text-center">
        <p className="eyebrow">{product.stone}</p>
        <h3 className="line-clamp-2 font-display text-lg leading-snug">{product.title}</h3>
        <p className="pt-1 text-sm font-medium">
          {usd(product.priceUsd)}
          {product.originalUsd && (
            <span className="ml-2 text-muted-foreground line-through">{usd(product.originalUsd)}</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">{pkr(product.priceUsd)}</p>
      </div>
    </Link>
  );
}
