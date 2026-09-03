import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, stones } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";

type Search = {
  category?: string | undefined;
  stone?: string | undefined;
  q?: string | undefined;
};

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search['category'] === "string" ? (search['category'] as string) : undefined,
    stone: typeof search['stone'] === "string" ? (search['stone'] as string) : undefined,
    q: typeof search['q'] === "string" ? (search['q'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Silver Gemstone Rings & Pendants | Gems Mark" },
      {
        name: "description",
        content:
          "Browse every Gems Mark piece — ruby, emerald, sapphire, agate, turquoise and peridot rings and pendants in 925 sterling silver, priced in USD and PKR.",
      },
      { property: "og:title", content: "Shop Silver Gemstone Rings & Pendants | Gems Mark" },
      { property: "og:description", content: "Handcrafted 925 sterling silver gemstone jewelry, shipped worldwide." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(search.q ?? "");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.stone && p.stone !== search.stone) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.priceUsd - b.priceUsd);
    if (sort === "high") list = [...list].sort((a, b) => b.priceUsd - a.priceUsd);
    return list;
  }, [search.category, search.stone, query, sort]);

  const setFilter = (patch: Search) => navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">{search.stone ?? search.category ?? "All jewelry"}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">
          {search.stone ? `${search.stone} Collection` : (search.category ?? "The Collection")}
        </h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div>
            <h2 className="eyebrow">Search</h2>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stones, styles…"
              className="mt-3"
            />
          </div>
          <div>
            <h2 className="eyebrow">Category</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setFilter({ category: undefined })}
                  className={!search.category ? "text-gold" : "hover:text-gold"}
                >
                  All ({products.length})
                </button>
              </li>
              {["Rings", "Pendants"].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setFilter({ category: c })}
                    className={search.category === c ? "text-gold" : "hover:text-gold"}
                  >
                    {c} ({products.filter((p) => p.category === c).length})
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Gemstone</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setFilter({ stone: undefined })}
                  className={!search.stone ? "text-gold" : "hover:text-gold"}
                >
                  All stones
                </button>
              </li>
              {stones.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => setFilter({ stone: s })}
                    className={search.stone === s ? "text-gold" : "hover:text-gold"}
                  >
                    {s} ({products.filter((p) => p.stone === s).length})
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/blogs" className="block text-xs tracking-[0.2em] uppercase text-primary hover:text-gold">
            Read the gemstone guides →
          </Link>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} pieces</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-input bg-background px-3 py-2 text-xs tracking-[0.16em] uppercase"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">No pieces match this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
