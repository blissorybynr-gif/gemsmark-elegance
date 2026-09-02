import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Rings", search: { category: "Rings" } },
  { to: "/shop", label: "Pendants", search: { category: "Pendants" } },
  { to: "/blogs", label: "Blogs" },
  { to: "/reviews", label: "Reviews" },
  { to: "/track", label: "Track Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-gradient text-primary-foreground">
      <div className="border-b border-gold/20">
        <div className="container-luxe flex items-center justify-between gap-4 py-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-navy-gradient text-primary-foreground border-gold/20">
              <nav className="mt-10 flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    search={"search" in item ? (item.search as never) : undefined}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm tracking-[0.18em] uppercase border-b border-gold/10 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-3">
            <img src={site.logo} alt="Gems Mark logo" className="h-12 w-12 rounded-full object-cover" />
            <span className="hidden sm:block">
              <span className="block font-display text-2xl leading-none tracking-[0.18em] text-gold-gradient">
                GEMS MARK
              </span>
              <span className="block text-[0.6rem] tracking-[0.42em] text-gold-soft">{site.tagline}</span>
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <Link to="/shop" aria-label="Search products" className="hover:text-gold">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/account" aria-label="Account" className="hover:text-gold">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative hover:text-gold">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.6rem] font-medium text-navy-deep">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="hidden lg:block">
        <div className="container-luxe flex flex-wrap items-center justify-center gap-x-7 gap-y-2 py-3 text-[0.7rem] tracking-[0.24em] uppercase">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={"search" in item ? (item.search as never) : undefined}
              className="transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="bg-gold py-2 text-center text-[0.7rem] tracking-[0.2em] uppercase text-navy-deep">
        Free worldwide shipping · Handcrafted 925 sterling silver
      </div>
    </header>
  );
}
