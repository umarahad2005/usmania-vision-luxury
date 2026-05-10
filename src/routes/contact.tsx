import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, SUPPORT_EMAIL } from "@/lib/products";
import { sendContactFn } from "@/routes/api/contact";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Usmania Vision Co." },
      { name: "description", content: "Reach the Usmania Vision Co. team for product questions, styling help, and order support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactFn({ data: form });
      toast.success("Message sent! We'll reply within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send. Try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16">
        <ScrollReveal className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            Reach the Usmania Vision Co. team for product questions, styling help, and order support.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <ScrollReveal direction="left" className="space-y-5">
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: WHATSAPP_DISPLAY,
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
                cta: "Chat on WhatsApp",
              },
              {
                icon: Mail,
                label: "Email",
                value: SUPPORT_EMAIL,
                href: `mailto:${SUPPORT_EMAIL}`,
                cta: "Send Email",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Pakistan",
                href: undefined,
                cta: undefined,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="p-3 rounded-xl bg-gold/10 border border-gold/20 shrink-0">
                  <item.icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                  {item.href && item.cta && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold text-sm hover:underline mt-1 inline-block"
                    >
                      {item.cta} →
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <MagneticButton
              as="a"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp Now
            </MagneticButton>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <form
              onSubmit={handleSubmit}
              className="p-7 rounded-2xl space-y-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h2 className="text-xl font-semibold text-white mb-2">Send a Message</h2>

              {[
                { field: "name", label: "Your Name", type: "text", placeholder: "e.g. Ahmad Ali" },
                { field: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={form[field as "name" | "email"]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What can we help you with?"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/60 transition-colors resize-none"
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold text-navy font-semibold hover:brightness-110 transition disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
