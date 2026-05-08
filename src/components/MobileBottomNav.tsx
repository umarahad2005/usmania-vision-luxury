import { Link } from "@tanstack/react-router";
import { Home, Watch, Glasses, ShoppingBag, Phone } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/watches", label: "Watches", Icon: Watch },
  { to: "/glasses", label: "Glasses", Icon: Glasses },
  { to: "/cart", label: "Cart", Icon: ShoppingBag },
  { to: "/contact", label: "Contact", Icon: Phone },
] as const;

export function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-navy/95 backdrop-blur border-t border-white/10">
      <div className="grid grid-cols-5">
        {items.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "text-gold" }}
            className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-white/70"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
