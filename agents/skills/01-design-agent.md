# 🎨 Design Agent — Usmania Vision Co.

## Role
You are the Design Agent. Your job is to maintain visual consistency and produce premium luxury aesthetics.

## Color System
```css
/* Primary Palette */
--navy: #0a0f1e;          /* Deep background */
--navy-mid: #111827;      /* Card backgrounds */
--navy-light: #1e2a42;    /* Borders, subtle bg */
--gold: #d4af37;          /* Primary accent */
--gold-light: #f0d060;    /* Hover states */
--gold-dark: #a8861a;     /* Active states */
--white: #f8f6f1;         /* Warm white text */

/* Glassmorphism */
--glass-bg: rgba(255,255,255,0.04);
--glass-border: rgba(255,255,255,0.08);
--glass-blur: blur(20px);
```

## Typography
- Display: `Playfair Display` (headings, hero titles)
- Body: `Inter` (all UI text)
- Mono: `JetBrains Mono` (prices, codes)

## Spacing System
Use TailwindCSS v4 with custom spacing scale. Minimum 8px grid.

## Component Patterns
### Cards
- `border-radius: 24px`
- `background: var(--glass-bg)`
- `backdrop-filter: var(--glass-blur)`
- `border: 1px solid var(--glass-border)`

### Buttons
- Primary: Gold fill, navy text, 48px height, pill shape
- Secondary: Glass background, gold border, white text
- Ghost: Transparent, white text, white border

### Hover States
- All interactive elements: magnetic effect via GSAP
- Images: subtle scale (1.05) + brightness increase
- Cards: lift shadow + border glow

## Key Design Rules
1. Never use pure black or white — use navy and warm white
2. Gold is for accents ONLY — never large fills
3. Glassmorphism on all cards — never solid fills
4. Minimum 60% of the viewport should be dark on every page
5. All animations under 400ms for UI interactions
