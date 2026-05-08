import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, SUPPORT_EMAIL } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <div className="text-white font-semibold text-base mb-2">Usmania Vision Co.</div>
          <p>Modern luxury watches and glasses crafted for a refined global look.</p>
        </div>
        <div className="space-y-1">
          <div className="text-white font-medium mb-1">Contact</div>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="block hover:text-gold">WhatsApp {WHATSAPP_DISPLAY}</a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="block hover:text-gold">{SUPPORT_EMAIL}</a>
        </div>
        <div className="md:text-right">
          © {new Date().getFullYear()} Usmania Vision Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
