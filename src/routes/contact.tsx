import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, SUPPORT_EMAIL } from "@/lib/products";
import { MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Usmania Vision Co." },
      { name: "description", content: "Reach the Usmania Vision Co team for product questions, styling help, and order support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 pt-14 pb-16">
        <div className="bg-card text-card-foreground rounded-3xl p-8 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Contact</h1>
          <p className="mt-3 text-navy/70">
            Reach the Usmania Vision Co team for product questions, styling help, and order support.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 w-full justify-center px-6 py-4 rounded-full bg-navy text-white font-semibold hover:bg-gold hover:text-gold-foreground transition-colors"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp {WHATSAPP_DISPLAY}
          </a>

          <div className="mt-6 space-y-2 text-sm">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 text-navy hover:text-gold">
              <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
            </a>
            <div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-navy hover:text-gold">
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
