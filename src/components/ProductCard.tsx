import { Link } from "@tanstack/react-router";
import { type Product, formatPrice } from "@/lib/products";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const glow = glowRef.current;
    if (!card || !img || !glow) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.06, duration: 0.5, ease: "power2.out" });
      gsap.to(glow, { opacity: 1, duration: 0.4 });
      gsap.to(card, {
        y: -6,
        boxShadow: "0 20px 60px rgba(212,175,55,0.12), 0 8px 24px rgba(0,0,0,0.4)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(glow, { opacity: 0, duration: 0.4 });
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef });

  const href = `/${product.type}/${product.id}`;

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        willChange: "transform",
      }}
    >
      {/* Gold glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 60%)",
          border: "1px solid rgba(212,175,55,0.2)",
        }}
      />

      <Link to={href}>
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-navy/50">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: "transform" }}
          />
          {product.edition && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold/90 text-navy text-[10px] font-bold tracking-wide uppercase z-20">
              {product.edition}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-white font-semibold text-base truncate">{product.name}</h3>
          <p className="text-gold font-bold mt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>

      {/* Quick order button */}
      <div className="px-4 pb-4">
        <a
          href={`https://wa.me/923344739333?text=Hi! I want to order ${encodeURIComponent(product.name)} (${formatPrice(product.price)}).`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-sm font-medium hover:bg-gold hover:text-navy transition-all duration-300"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
