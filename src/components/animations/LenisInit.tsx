import { useEffect } from 'react';

/**
 * Replaces LenisInit. Instead of running immediately, we make sure it
 * is a valid React component that cleans up correctly.
 */
export function LenisInit() {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    init();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
