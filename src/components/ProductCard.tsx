import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={product.type === "watches" ? "/watches/$id" : "/glasses/$id"}
      params={{ id: product.id }}
      className="card-hover block bg-card text-card-foreground rounded-2xl overflow-hidden group"
    >
      <div className="aspect-square overflow-hidden bg-white/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base sm:text-lg leading-tight">{product.name}</h3>
            <p className="text-xs sm:text-sm text-navy/60 mt-0.5">{product.category}</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-navy/70 group-hover:text-gold transition-colors" />
        </div>
        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-navy text-white text-sm font-medium">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
}
