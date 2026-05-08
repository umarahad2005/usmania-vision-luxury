import { Link } from "@tanstack/react-router";
import { Menu, X, Watch, Glasses } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/watches", label: "Watches" },
  { to: "/glasses", label: "Glasses" },
  { to: "/cart", label: "Cart" },
  { to: "/story", label: "Story & Glasses" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-navy/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1 text-gold">
            <Watch className="h-5 w-5" />
            <Glasses className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-white text-lg">Usmania Vision Co.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-white/70 text-sm">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-full text-sm bg-white/10 text-white hover:bg-white/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full text-sm text-white hover:bg-white/10 transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full text-sm bg-gold text-gold-foreground font-medium hover:brightness-110 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="text-white/90 py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-full text-sm bg-white/10 text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-full text-sm border border-white/20 text-white">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-full text-sm bg-gold text-gold-foreground font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
