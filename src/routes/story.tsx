import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Watch, Glasses } from "lucide-react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Usmania Vision Co." },
      { name: "description", content: "Modern luxury blending international style with sophisticated craftsmanship." },
      { property: "og:title", content: "Our Story — Usmania Vision Co." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-14 pb-16 text-center">
        <div className="inline-flex items-center gap-3 text-gold mb-4">
          <Watch className="h-8 w-8" />
          <Glasses className="h-8 w-8" />
        </div>
        <div className="text-gold text-2xl font-bold tracking-tight">Usmania Vision Co.</div>

        <div className="mt-10 bg-card text-card-foreground rounded-3xl p-6 sm:p-10 text-left leading-relaxed space-y-4">
          <p>
            Usmania Vision Co stands at the forefront of modern luxury, seamlessly blending international
            style with a dark, sophisticated aesthetic. Specializing in high-end watches and glasses, the
            brand embodies precise craftsmanship and a minimalist 3D-inspired presentation that captivates
            discerning customers worldwide.
          </p>
          <p>
            Focused on signature pieces crafted from elevated materials, Usmania Vision Co delivers timeless
            styling that transcends trends.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/glasses" className="px-6 py-3 rounded-full bg-white text-navy font-semibold hover:bg-gold hover:text-gold-foreground transition-colors">
            More Glasses
          </Link>
          <Link to="/watches" className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition-colors">
            More Watches
          </Link>
        </div>
      </section>
    </Layout>
  );
}
