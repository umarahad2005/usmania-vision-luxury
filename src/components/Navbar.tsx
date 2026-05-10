import { Link } from "@tanstack/react-router";
import { Menu, X, Watch, Glasses } from "lucide-react";
import { useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { to: "/", label: "Home" },
  { to: "/watches", label: "Watches" },
  { to: "/glasses", label: "Glasses" },
  { to: "/cart", label: "Cart" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll-based navbar glass effect
  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        gsap.to(header, {
          backgroundColor: self.progress > 0
            ? "rgba(10,15,30,0.88)"
            : "rgba(10,15,30,0.0)",
          backdropFilter: self.progress > 0 ? "blur(24px)" : "blur(0px)",
          boxShadow: self.progress > 0
            ? "0 1px 0 rgba(255,255,255,0.06)"
            : "none",
          duration: 0.35,
          ease: "power2.out",
        });
      },
    });

    // Entrance animation
    gsap.from(header, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.05,
    });
  }, { scope: headerRef });

  // Animate mobile menu open/close
  const toggleMenu = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (mobileMenuRef.current) {
      if (nextOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/0"
      style={{ backgroundColor: "rgba(10,15,30,0)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center gap-1 text-gold transition-transform group-hover:scale-110 duration-300">
            <Watch className="h-5 w-5" />
            <Glasses className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight text-white text-lg">
            Usmania <span className="text-gold">Vision</span> Co.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="text-white/75 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-white/60 text-sm">{user.name}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-full text-sm bg-white/8 text-white hover:bg-white/15 transition border border-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/8 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full text-sm bg-gold text-navy font-semibold hover:brightness-110 transition shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2 hover:text-gold transition-colors"
          onClick={() => toggleMenu(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-4 py-5 flex flex-col gap-4 bg-navy/95 backdrop-blur-xl border-t border-white/8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => toggleMenu(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="text-white/85 text-sm py-0.5 hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-white/10">
            {user ? (
              <button
                onClick={() => { signOut(); toggleMenu(false); }}
                className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/10 text-white border border-white/10"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => toggleMenu(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-full text-sm border border-white/15 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => toggleMenu(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-full text-sm bg-gold text-navy font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
