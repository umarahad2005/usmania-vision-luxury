import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { allProducts, formatPrice, whatsappOrderLink } from "@/lib/products";
import { Search, List, Grid3x3, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Usmania Vision Co." },
      { name: "description", content: "Review selected pieces and continue to checkout via WhatsApp." },
    ],
  }),
  component: CartPage,
});

type View = "list" | "grid" | "compact";

function CartPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("list");

  const items = useMemo(
    () => allProducts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Cart</h1>
        <p className="mt-3 text-white/70">Review selected pieces and continue to checkout.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Products"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex gap-1 p-1 rounded-full bg-white/10 border border-white/15 self-start">
            {([
              ["list", List],
              ["grid", Grid3x3],
              ["compact", Rows3],
            ] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v}
                className={`p-2 rounded-full transition ${view === v ? "bg-gold text-gold-foreground" : "text-white/70 hover:text-white"}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div
          className={
            view === "grid"
              ? "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "mt-6 flex flex-col gap-3"
          }
        >
          {items.map((p) => (
            <div
              key={p.id}
              className={`bg-card text-card-foreground rounded-2xl p-3 sm:p-4 flex items-center gap-4 ${view === "compact" ? "py-2" : ""}`}
            >
              <img
                src={p.image}
                alt={p.name}
                className={`rounded-xl object-cover ${view === "compact" ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20"}`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-sm text-navy/60">{formatPrice(p.price)}</div>
              </div>
              <a
                href={whatsappOrderLink(p)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-navy text-white text-sm font-medium hover:bg-gold hover:text-gold-foreground transition-colors whitespace-nowrap"
              >
                Order Now
              </a>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-white/60 text-center py-10">No products match your search.</div>
          )}
        </div>
      </section>
    </Layout>
  );
}
