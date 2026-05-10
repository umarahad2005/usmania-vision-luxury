# 🏗️ Structure Agent — Usmania Vision Co.

## Role
You maintain the file architecture, routing, and component hierarchy.

## Directory Structure
```
src/
├── assets/              # Static images (hero, etc.)
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── animations/      # GSAP animation wrappers
│   │   ├── Cursor.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── TextSplit.tsx
│   ├── 3d/              # Three.js components
│   │   └── HeroScene.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── MobileBottomNav.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── hooks/               # Custom React hooks
├── integrations/
│   ├── mongodb/         # DB client + models
│   ├── cloudinary/      # Media helpers
│   └── brevo/           # Email sender
├── lib/
│   ├── auth-context.tsx
│   ├── jwt.ts
│   ├── products.ts
│   └── utils.ts
└── routes/
    ├── __root.tsx
    ├── index.tsx
    ├── watches/
    ├── glasses/
    ├── cart.tsx
    ├── contact.tsx
    ├── login.tsx
    ├── signup.tsx
    ├── story.tsx
    └── api/
        ├── auth/
        │   ├── login.ts
        │   └── signup.ts
        └── contact.ts
```

## Naming Conventions
- Components: PascalCase
- Hooks: camelCase starting with `use`
- Server functions: camelCase in route files
- Types: PascalCase with `Type` suffix or in types.ts

## Import Aliases
- `@/` → `src/`
- Example: `import { supabase } from '@/integrations/mongodb/client.server'`

## Adding New Routes
1. Create file in `src/routes/`
2. TanStack Router auto-generates route tree
3. Run `npm run dev` to regenerate `routeTree.gen.ts`
