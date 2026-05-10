import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextSplit } from "@/components/animations/TextSplit";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { watches, glasses } from "@/lib/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Three.js scene is lazy-loaded for performance
const HeroScene = lazy(() => import("@/components/3d/HeroScene"));

export const Route = createFileRoute("/")(({
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
}));

function Home() {
  const featured = [watches[0], watches[1], glasses[0], glasses[2]];
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(badgeRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      )
      .from(
        btnsRef.current,
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .from(
        statsRef.current?.children ?? [],
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, { scope: heroRef });

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-16 overflow-hidden min-h-[70vh] flex items-center"
      >
        {/* 3D Background Scene */}
        <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles className="h-3 w-3" />
            New Season Collection
          </span>

          <div className="mt-6 overflow-hidden">
            <TextSplit
              text="Usmania"
              as="h1"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display"
              delay={0.1}
              splitBy="chars"
            />
            <TextSplit
              text="Vision Co."
              as="h1"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gold font-display"
              delay={0.4}
              splitBy="chars"
            />
          </div>

          <p
            ref={subtitleRef}
            className="mt-6 text-base sm:text-lg text-white/65 max-w-lg leading-relaxed"
          >
            Modern luxury watches and glasses crafted for a refined global look.
            Signature pieces for discerning taste.
          </p>

          <div ref={btnsRef} className="mt-10 flex flex-col sm:flex-row gap-4">
            <MagneticButton
              as="a"
              href="/watches"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Shop Watches <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/glasses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/8 text-white font-semibold text-sm border border-white/15 hover:bg-white/15 transition-colors backdrop-blur-sm"
            >
              Shop Glasses <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="mt-12 flex gap-8">
            {[
              { label: "Products", value: "10+" },
              { label: "Happy Clients", value: "500+" },
              { label: "Years of Luxury", value: "5+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-16">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              Curated Selection
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Featured Pieces
            </h2>
          </div>
          <Link to="/watches" className="text-gold text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ScrollReveal>
      </section>

      {/* ─── BRAND STATEMENT ─── */}
      <ScrollReveal>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(10,15,30,0) 60%)',
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-blue-900/10 pointer-events-none" />
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">Our Philosophy</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
              "Crafted for a refined global look."
            </h2>
            <p className="mt-6 text-white/60 max-w-lg mx-auto">
              Every piece in our collection is chosen for those who understand that true luxury
              is not worn — it is expressed.
            </p>
            <MagneticButton
              as="a"
              href="/story"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
            >
              Our Story <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </section>
      </ScrollReveal>
    </Layout>
  );
}
