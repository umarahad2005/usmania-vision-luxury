import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  stagger?: boolean;
  threshold?: string; // e.g. 'top 85%'
}

/**
 * Wraps children with a GSAP scroll-triggered reveal animation.
 * Use `stagger` to animate direct children one by one.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
  threshold = 'top 82%',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : [el];

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay,
      ...(direction === 'up' && { y: 60 }),
      ...(direction === 'left' && { x: -60 }),
      ...(direction === 'right' && { x: 60 }),
      ...(direction === 'scale' && { scale: 0.85 }),
    };

    gsap.from(targets, {
      ...fromVars,
      stagger: stagger ? 0.12 : 0,
      scrollTrigger: {
        trigger: el,
        start: threshold,
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
