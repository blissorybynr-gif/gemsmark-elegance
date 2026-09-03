import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | Gems Mark" },
      {
        name: "description",
        content: "Read verified customer reviews for Gems Mark handcrafted 925 sterling silver gemstone rings and pendants.",
      },
      { property: "og:title", content: "Customer Reviews | Gems Mark" },
      { property: "og:description", content: "5.0 star rated handcrafted silver gemstone jewelry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">Client love</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Reviews</h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <figure key={r.name + r.date} className="border border-border bg-card p-7">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: r.stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.text}</blockquote>
            <figcaption className="mt-5 text-xs tracking-[0.2em] uppercase">
              {r.name} · {r.date}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
