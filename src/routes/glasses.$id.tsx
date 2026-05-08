import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { findProduct, formatPrice, whatsappOrderLink } from "@/lib/products";
import { Tag, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/glasses/$id")({
  component: GlassDetail,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Glasses not found</h1>
        <Link to="/glasses" className="mt-4 inline-block text-gold underline">Back to glasses</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white/80">{error.message}</div>
    </Layout>
  ),
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product || product.type !== "glasses") throw notFound();
    return product;
  },
});

const COLORS = [
  { name: "Black", value: "#0a0a0a" },
  { name: "Silver", value: "#c0c0c0" },
  { name: "Gold", value: "#F5A623" },
  { name: "Navy", value: "#1C3A52" },
  { name: "Deep Brown", value: "#4a2c1a" },
];

function GlassDetail() {
  const product = Route.useLoaderData();
  const [color, setColor] = useState(COLORS[0].name);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 pb-16">
        <Link to="/glasses" className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to glasses
        </Link>

        <div className="rounded-3xl overflow-hidden bg-card aspect-[16/10] sm:aspect-[16/9]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>
          <p className="mt-1 text-white/60">{product.category}</p>
          <p className="mt-5 text-white/80 max-w-2xl leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <div className="text-sm text-white/60 mb-2">Frame color: <span className="text-white">{color}</span></div>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-gold scale-110" : "border-white/20"}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground rounded-2xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-navy text-white grid place-items-center"><Tag className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/60">Price</div>
                <div className="font-semibold text-lg">{formatPrice(product.price)}</div>
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-2xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-gold text-gold-foreground grid place-items-center"><Star className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-navy/60">Edition</div>
                <div className="font-semibold text-lg">{product.edition ?? "Classic"}</div>
              </div>
            </div>
          </div>

          <a
            href={whatsappOrderLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 rounded-full bg-white text-navy font-semibold hover:bg-gold hover:text-gold-foreground transition-colors"
          >
            Order Now via WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
