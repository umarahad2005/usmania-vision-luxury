# 🧩 UI Components Agent — Usmania Vision Co.

## Role
Build and maintain reusable React components following the design system.

## Component Inventory

### Layout Components
- `Layout` — Page wrapper (Navbar + main + Footer)
- `Navbar` — Top navigation with GSAP scroll effect + mobile drawer
- `Footer` — Bottom links, social, WhatsApp CTA
- `MobileBottomNav` — Fixed bottom nav on mobile

### Product Components  
- `ProductCard` — Image + name + price + quick-order button
  - Props: `{ product: Product, className?: string }`
  - Behavior: Magnetic hover, scroll reveal

### Animation Wrappers
- `ScrollReveal` — Wraps any children with scroll-trigger reveal
  - Props: `{ children, delay?: number, direction?: 'up'|'left'|'right' }`
- `MagneticButton` — Wraps buttons with magnetic mouse follow
  - Props: `{ children, strength?: number }`
- `TextSplit` — Animates text character by character
  - Props: `{ text: string, className?: string, delay?: number }`
- `Cursor` — Custom luxury cursor overlay

### Form Components
- Use `react-hook-form` + `zod` for all forms
- Use shadcn `Input`, `Label`, `Button` as base
- Gold focus ring: `focus:ring-gold focus:border-gold`

## Component Rules
1. All components must have `className` prop for extension
2. Use `forwardRef` for interactive components
3. Animations in `useGSAP` from `@gsap/react`
4. Export default + named export both

## shadcn/ui Customization
Location: `src/components/ui/`
- Override default radius to `--radius: 1.5rem`
- Override default colors to match navy/gold palette
