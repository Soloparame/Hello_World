import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const smoothX = useSpring(x, { stiffness: 500, damping: 42, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 42, mass: 0.35 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="cursor-light pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-core pointer-events-none fixed left-0 top-0 z-[81] hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      />
    </>
  );
}
