# 🌐 3D Scene Agent — Usmania Vision Co.

## Role
Build and maintain Three.js 3D scenes. All scenes must be SSR-safe (client-only rendering).

## Tech Stack
- `three` — Core 3D engine
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — Helpers (OrbitControls, Environment, etc.)

## Pattern for SSR-Safe 3D
```tsx
import { lazy, Suspense } from 'react';
const HeroScene = lazy(() => import('@/components/3d/HeroScene'));

// Usage (always wrap in Suspense)
<Suspense fallback={null}>
  <HeroScene />
</Suspense>
```

## Current Scenes

### HeroScene (Home Page)
- **Mesh:** TorusKnot (abstract luxury jewelry shape)
- **Material:** MeshStandardMaterial with gold color + metalness
- **Animation:** Slow rotation + floating (sine wave)
- **Lighting:** AmbientLight + SpotLight from top
- **Camera:** Fixed perspective, no controls
- **Canvas:** Full overlay behind hero text

## Performance Rules
1. Use `dpr={[1, 2]}` on Canvas — never higher
2. Dispose geometries and materials in useEffect cleanup
3. Use `frameloop="demand"` for static scenes
4. Use `shadows={false}` unless shadows explicitly needed
5. Texture resolution max 1024×1024

## Adding New Scenes
1. Create in `src/components/3d/`
2. Import lazily in the route
3. Wrap in `<Suspense fallback={null}>`
4. Add `'use client'` directive if using TanStack Start SSR
