import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Gems Mark | Handcrafted Silver Jewelry from Multan" },
      {
        name: "description",
        content:
          "Gems Mark handcrafts 925 sterling silver gemstone rings and pendants in Multan, Pakistan, shipping worldwide with a 5.0 star rating.",
      },
      { property: "og:title", content: "About Gems Mark" },
      { property: "og:description", content: "Handcrafted 925 sterling silver gemstone jewelry from Multan, Pakistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">{site.tagline}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">About Gems Mark</h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-5 text-muted-foreground">
        <p>
          Gems Mark is a family workshop in {site.location}, where every ring and pendant is cut, set and polished
          by hand in 925 sterling silver. We source natural stones — agate, ruby, emerald, sapphire, turquoise,
          peridot and more — and set each one to bring out its own colour and character.
        </p>
        <p>
          What began as a small Etsy studio now ships worldwide, with a 5.0 star rating from collectors who value
          honest materials and genuine craftsmanship. Custom work is our favourite kind of order: send us your
          stone, your size and your idea, and we will make it.
        </p>
        <p>
          Every piece leaves the bench polished, inspected and packed in a lined box, dispatched via FedEx, DHL,
          UPS or SkyNet Worldwide Express with tracking you can follow on this site.
        </p>
      </div>

      <div className="mt-10 flex justify-center gap-4 text-xs tracking-[0.24em] uppercase">
        <Link to="/shop" className="text-primary hover:text-gold">
          Shop the collection
        </Link>
        <Link to="/contact" className="text-primary hover:text-gold">
          Request a custom piece
        </Link>
      </div>
    </div>
  );
}
