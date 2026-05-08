import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { watches } from "@/lib/products";

export const Route = createFileRoute("/watches/")({
  head: () => ({
    meta: [
      { title: "Watches — Usmania Vision Co." },
      { name: "description", content: "A curated selection of premium timepieces with signature character." },
      { property: "og:title", content: "Watches — Usmania Vision Co." },
      { property: "og:description", content: "Premium timepieces with signature character." },
    ],
  }),
  component: WatchesPage,
});

function WatchesPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Watches</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          A curated selection of premium timepieces with signature character.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {watches.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
