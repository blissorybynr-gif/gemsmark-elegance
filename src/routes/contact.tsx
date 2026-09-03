import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Custom Orders | Gems Mark" },
      {
        name: "description",
        content: "Contact Gems Mark by email or WhatsApp for custom silver gemstone rings, sizing help and order questions.",
      },
      { property: "og:title", content: "Contact & Custom Orders | Gems Mark" },
      { property: "og:description", content: "Email or WhatsApp our Multan workshop about custom silver jewelry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">We would love to hear from you</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Contact Us</h1>
        <div className="gold-rule mx-auto mt-5" />
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
        <a href={`mailto:${site.email}`} className="border border-border bg-card p-7 text-center hover:border-gold">
          <Mail className="mx-auto h-5 w-5 text-gold" />
          <p className="eyebrow mt-4">Email</p>
          <p className="mt-2 break-words text-sm">{site.email}</p>
        </a>
        <a
          href={site.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="border border-border bg-card p-7 text-center hover:border-gold"
        >
          <Phone className="mx-auto h-5 w-5 text-gold" />
          <p className="eyebrow mt-4">WhatsApp</p>
          <p className="mt-2 text-sm">{site.whatsapp}</p>
        </a>
        <div className="border border-border bg-card p-7 text-center">
          <MapPin className="mx-auto h-5 w-5 text-gold" />
          <p className="eyebrow mt-4">Workshop</p>
          <p className="mt-2 text-sm">{site.location}</p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
        For custom orders, tell us the stone, ring size and any engraving or design details. We usually reply
        within 24 hours.
      </p>
    </div>
  );
}
