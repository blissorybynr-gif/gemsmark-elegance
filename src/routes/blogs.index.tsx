import { createFileRoute, Link } from "@tanstack/react-router";
import { blogs } from "@/data/blogs";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Gemstone Guides & Meanings | Gems Mark" },
      {
        name: "description",
        content:
          "Learn the meanings, beauty and care of amethyst, moonstone, turquoise, ruby, emerald and more in the Gems Mark gemstone guides.",
      },
      { property: "og:title", content: "Gemstone Guides & Meanings | Gems Mark" },
      { property: "og:description", content: "A guide to gemstones: meanings, beauty and care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">Journal</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">A Guide to Gemstones</h1>
        <div className="gold-rule mx-auto mt-5" />
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Meanings, beauty and care — every stone carries its own colour, history and personality.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => (
          <Link key={b.slug} to="/blogs/$slug" params={{ slug: b.slug }} className="group block bg-card">
            <div className="aspect-square overflow-hidden">
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="eyebrow">{b.stone}</p>
              <h2 className="mt-2 font-display text-xl">{b.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{b.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
