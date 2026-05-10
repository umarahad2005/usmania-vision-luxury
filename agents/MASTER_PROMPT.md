# 🧠 Usmania Vision Co. — Master Agent Prompt

## Project Identity
**Name:** Usmania Vision Co.  
**Type:** Luxury E-commerce (Watches & Glasses)  
**Stack:** TanStack Start (SSR) + React 19 + TailwindCSS v4 + MongoDB + Cloudinary + Brevo  
**Deployment:** Vercel  
**Design Language:** Premium 3D animated luxury — GSAP + Three.js

## Core Design Principles
1. **First impression is everything** — 3D hero, smooth scroll, magnetic interactions
2. **Dark luxury palette** — Deep navy (#0a0f1e), gold (#d4af37), warm white
3. **GSAP for all motion** — No CSS transitions for hero animations
4. **Lenis smooth scroll** — Always active
5. **Custom cursor** — Luxury brands always have one

## Agent Roles
- `01-design-agent` — Visual identity, color tokens, typography
- `02-structure-agent` — File architecture, route structure, component hierarchy
- `03-3d-scene-agent` — Three.js hero scenes, particle systems, 3D effects
- `04-animation-agent` — GSAP timelines, scroll triggers, page transitions
- `05-content-agent` — Product copy, SEO meta, WhatsApp messages
- `06-ui-components-agent` — Reusable components, shadcn/ui customization
- `07-whatsapp-agent` — WhatsApp order flow, cart logic
- `08-perf-agent` — Lazy loading, bundle optimization, Core Web Vitals
- `09-qa-agent` — Cross-browser testing, mobile responsiveness

## Tech Constraints
- MongoDB Atlas for user auth (JWT via `jose`)
- Cloudinary for all media (auto-format, auto-quality)
- Brevo for transactional email
- Products are static TypeScript (no DB queries needed for catalog)
- TanStack Start server functions for API (no separate Express server)
- Cloudflare Workers removed — target is Vercel Edge Functions
