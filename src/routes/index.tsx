import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { blogs } from "@/data/blogs";
import { reviews, shopStats } from "@/data/reviews";
import { site } from "@/data/site";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gems Mark | Handcrafted Silver Gemstone Rings & Pendants" },
      {
        name: "description",
        content:
          "Shop handcrafted 925 sterling silver gemstone rings and pendants by Gems Mark. Ruby, emerald, sapphire, agate and more — priced in USD and PKR, shipped worldwide.",
      },
      { property: "og:title", content: "Gems Mark | Handcrafted Silver Gemstone Rings & Pendants" },
      {
        property: "og:description",
        content: "Handcrafted 925 sterling silver gemstone jewelry from Multan, Pakistan. Worldwide shipping.",
      },
      { property: "og:image", content: site.banner },
      { name: "twitter:image", content: site.banner },
    ],
  }),
  component: Home,
});

const collections = [
  { stone: "Ruby", label: "Ruby / Yaqoot" },
  { stone: "Emerald", label: "Emerald / Zamrud" },
  { stone: "Agate", label: "Agate / Aqeeq" },
  { stone: "Sapphire", label: "Sapphire" },
  { stone: "Turquoise", label: "Turquoise / Feroza" },
  { stone: "Peridot", label: "Peridot" },
];

function Home() {
  const featured = products.slice(0, 8);
  const pendants = products.filter((p) => p.category === "Pendants").slice(0, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-gradient text-primary-foreground">
        <img
          src={products[0]?.image}
          alt="Handcrafted silver gemstone ring by Gems Mark"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-luxe relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <p className="eyebrow">Handcrafted in Multan, Pakistan</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Natural Gemstones set in <span className="text-gold-gradient">925 Sterling Silver</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Every Gems Mark ring is cut, set and polished by hand. One stone, one setting, one owner — the elegance
            of a piece made for you.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="bg-gold px-8 py-3 text-xs tracking-[0.24em] uppercase text-navy-deep transition-opacity hover:opacity-90"
            >
              Shop Collection
            </Link>
            <Link
              to="/contact"
              className="border border-gold/60 px-8 py-3 text-xs tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-navy-deep"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="container-luxe grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { icon: Gem, title: "Natural Stones", text: "Genuine, hand-selected gemstones" },
            { icon: Sparkles, title: "925 Silver", text: "Hallmarked sterling silver settings" },
            { icon: Truck, title: "Free Worldwide Shipping", text: "FedEx · SkyNet · UPS · DHL" },
            { icon: ShieldCheck, title: "5.0 Rated", text: `${shopStats.reviewCount} reviews · ${shopStats.sales} sales` },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2 text-center">
              <item.icon className="h-6 w-6 text-gold" />
              <p className="text-xs tracking-[0.2em] uppercase">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-20">
        <SectionHeading eyebrow="Shop by stone" title="Our Collections" />
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {collections.map((c) => {
            const item = products.find((p) => p.stone === c.stone);
            return (
              <Link
                key={c.stone}
                to="/shop"
                search={{ stone: c.stone }}
                className="group text-center"
              >
                <div className="overflow-hidden rounded-full border border-gold/30 p-1">
                  <img
                    src={item?.image}
                    alt={c.label}
                    loading="lazy"
                    className="aspect-square w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase">{c.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow="Best sellers" title="Featured Pieces" />
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="border border-primary px-10 py-3 text-xs tracking-[0.24em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View all {products.length} pieces
            </Link>
          </div>
        </div>
      </section>

      {pendants.length > 0 && (
        <section className="container-luxe py-20">
          <SectionHeading eyebrow="New" title="Silver Pendants" />
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {pendants.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-navy-gradient py-20 text-primary-foreground">
        <div className="container-luxe">
          <p className="eyebrow text-center">Client reviews</p>
          <h2 className="mt-3 text-center font-display text-4xl">
            5.0 out of 5 · {shopStats.reviewCount} reviews
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <figure key={r.name + r.date} className="border border-gold/25 p-7">
                <p className="text-gold">{"★".repeat(r.stars)}</p>
                <blockquote className="mt-4 line-clamp-6 text-sm leading-relaxed text-primary-foreground/80">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 text-xs tracking-[0.2em] uppercase text-gold-soft">
                  {r.name} · {r.date}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/reviews" className="text-xs tracking-[0.24em] uppercase text-gold hover:underline">
              Read all reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="container-luxe py-20">
        <SectionHeading eyebrow="Journal" title="A Guide to Gemstones" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogs.slice(0, 3).map((b) => (
            <Link key={b.slug} to="/blogs/$slug" params={{ slug: b.slug }} className="group block bg-card">
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <p className="eyebrow">{b.stone}</p>
                <h3 className="mt-2 font-display text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blogs" className="text-xs tracking-[0.24em] uppercase text-primary hover:text-gold">
            All gemstone guides
          </Link>
        </div>
      </section>
    </>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
      <div className="gold-rule mx-auto mt-5" />
    </div>
  );
}
