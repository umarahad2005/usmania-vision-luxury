import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TextSplitProps {
  text: string;
  className?: string;
  delay?: number;
  /** 'chars' animates letter by letter, 'words' animates word by word */
  splitBy?: 'chars' | 'words';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Animates text by splitting it into spans and revealing each one.
 * No external SplitText plugin needed — pure vanilla approach.
 */
export function TextSplit({
  text,
  className,
  delay = 0,
  splitBy = 'chars',
  as: Tag = 'span',
}: TextSplitProps) {
  const ref = useRef<HTMLElement>(null);

  const units = splitBy === 'words' ? text.split(' ') : text.split('');

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll('.char-unit'));
    gsap.fromTo(
      spans,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: splitBy === 'chars' ? 0.028 : 0.08,
        delay,
      }
    );
  }, { scope: ref });

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={className} aria-label={text} style={{ overflow: 'hidden', display: 'block' }}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="char-unit"
          style={{ display: 'inline-block', willChange: 'transform', marginRight: splitBy === 'words' ? '0.25em' : undefined }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </span>
      ))}
    </Tag>
  );
}
