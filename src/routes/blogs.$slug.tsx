import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBlog } from "@/data/blogs";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = getBlog(params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable | Gems Mark" }, { name: "robots", content: "noindex" }] };
    }
    const { blog } = loaderData;
    return {
      meta: [
        { title: `${blog.title} | Gems Mark` },
        { name: "description", content: blog.excerpt },
        { property: "og:title", content: blog.title },
        { property: "og:description", content: blog.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: blog.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: blog.image },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { blog } = Route.useLoaderData();
  const related = products.filter((p) => p.stone === blog.stone).slice(0, 3);

  return (
    <article className="container-luxe py-14">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
        <Link to="/blogs" className="hover:text-gold">
          Journal
        </Link>{" "}
        / {blog.stone}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <img src={blog.image} alt={blog.title} className="w-full object-cover" />
        <div>
          <p className="eyebrow">{blog.birthstone ? `Birthstone for ${blog.birthstone}` : blog.stone}</p>
          <h1 className="mt-3 font-display text-4xl">{blog.title}</h1>
          <div className="gold-rule mt-5" />
          <div className="mt-6 space-y-4 text-muted-foreground">
            {blog.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl">Shop {blog.stone}</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
