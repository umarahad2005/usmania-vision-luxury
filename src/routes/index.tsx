import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { watches, glasses } from "@/lib/products";
import heroImg from "@/assets/hero-banner.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Usmania Vision Co. — Modern Luxury Watches & Glasses" },
      {
        name: "description",
        content:
          "Premium watches and glasses crafted for a refined global look. Shop signature pieces from Usmania Vision Co.",
      },
      { property: "og:title", content: "Usmania Vision Co." },
      {
        property: "og:description",
        content: "Modern luxury watches and glasses crafted for a refined global look.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = [watches[0], watches[1], glasses[0], glasses[2]];

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wider uppercase">
              New Season
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Usmania Vision Co.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-xl">
              Modern luxury watches and glasses crafted for a refined global look.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/watches"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white text-navy font-semibold hover:bg-gold hover:text-gold-foreground transition-colors"
              >
                Shop Watches <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/glasses"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Shop Glasses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={heroImg}
              alt="Premium watches and glasses on a luxury wooden display"
              width={1536}
              height={1024}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Featured pieces</h2>
          <Link to="/watches" className="text-gold text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
