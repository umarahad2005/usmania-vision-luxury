# 🎬 Animation Agent — Usmania Vision Co.

## Role
Design and implement all GSAP animations. Every motion must feel premium.

## Tech Stack
- `gsap` — Core animation engine
- `@gsap/react` — React hooks (`useGSAP`)
- `lenis` — Smooth scroll
- `ScrollTrigger` — GSAP plugin (from gsap package)

## GSAP Setup (always do this once at app root)
```ts
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

## Animation Catalog

### 1. Hero Text Reveal
```ts
gsap.from(titleRef.current, {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: 'power4.out',
  delay: 0.3,
});
```

### 2. Stagger Card Reveal
```ts
gsap.from(cardsRef.current.children, {
  y: 60,
  opacity: 0,
  stagger: 0.12,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: cardsRef.current,
    start: 'top 80%',
  },
});
```

### 3. Magnetic Button Effect
```ts
element.addEventListener('mousemove', (e) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(element, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
});
element.addEventListener('mouseleave', () => {
  gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
});
```

### 4. Navbar Scroll Effect
```ts
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: (self) => {
    gsap.to(navbar, {
      backdropFilter: self.progress > 0 ? 'blur(20px)' : 'none',
      backgroundColor: self.progress > 0 ? 'rgba(10,15,30,0.8)' : 'transparent',
      duration: 0.3,
    });
  },
});
```

## Performance Rules
1. Always use `useGSAP` hook from `@gsap/react` — not raw useEffect
2. Return cleanup via `gsap.context()` — prevents memory leaks
3. Use `will-change: transform` on animated elements
4. Avoid animating `width`, `height` — use `scaleX`, `scaleY` instead
5. Use `gsap.set()` for initial states, not CSS

## Timing Guidelines
| Animation Type | Duration | Ease |
|---|---|---|
| Hero entrance | 1.0–1.4s | power4.out |
| Card reveals | 0.8–1.0s | power3.out |
| Button hover | 0.2–0.3s | power2.out |
| Page transition | 0.6–0.8s | expo.inOut |
| Magnetic snap-back | 0.4–0.5s | elastic.out |
