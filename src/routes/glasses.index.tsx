import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { glasses } from "@/lib/products";

export const Route = createFileRoute("/glasses/")({
  head: () => ({
    meta: [
      { title: "Glasses — Usmania Vision Co." },
      { name: "description", content: "Sophisticated frames and lenses designed for elevated everyday wear." },
      { property: "og:title", content: "Glasses — Usmania Vision Co." },
      { property: "og:description", content: "Sophisticated frames and lenses designed for elevated everyday wear." },
    ],
  }),
  component: GlassesPage,
});

function GlassesPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Glasses</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Sophisticated frames and lenses designed for elevated everyday wear.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {glasses.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
