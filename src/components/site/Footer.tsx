import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy-gradient text-primary-foreground">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">
        <div>
          <img src={site.logo} alt="Gems Mark" className="h-16 w-16 rounded-full object-cover" />
          <p className="mt-4 font-display text-2xl tracking-[0.16em] text-gold-gradient">GEMS MARK</p>
          <p className="text-[0.65rem] tracking-[0.4em] text-gold-soft">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Handcrafted 925 sterling silver rings and pendants set with natural gemstones, made in Multan, Pakistan
            and shipped worldwide.
          </p>
        </div>

        <div>
          <h4 className="eyebrow">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/shop" className="hover:text-gold">All Jewelry</Link></li>
            <li><Link to="/shop" search={{ category: "Rings" }} className="hover:text-gold">Rings</Link></li>
            <li><Link to="/shop" search={{ category: "Pendants" }} className="hover:text-gold">Pendants</Link></li>
            <li><Link to="/blogs" className="hover:text-gold">Gemstone Blogs</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Client Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/track" className="hover:text-gold">Track Your Order</Link></li>
            <li><Link to="/account" className="hover:text-gold">My Account</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact & Custom Orders</Link></li>
            <li><Link to="/shipping" className="hover:text-gold">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <a href={site.whatsappLink} className="hover:text-gold">{site.whatsapp}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              {site.location}
            </li>
          </ul>
          <p className="mt-5 text-xs tracking-[0.16em] uppercase text-gold-soft">Payments: Bank Transfer · Payoneer</p>
          <p className="mt-2 text-xs tracking-[0.16em] uppercase text-gold-soft">
            Shipping: FedEx · SkyNet · UPS · DHL
          </p>
        </div>
      </div>

      <div className="border-t border-gold/20 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Gems Mark. All rights reserved.
      </div>
    </footer>
  );
}
