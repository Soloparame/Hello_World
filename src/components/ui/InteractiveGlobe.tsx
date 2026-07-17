import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';

type InteractiveGlobeProps = {
  compact?: boolean;
  labels?: boolean;
  className?: string;
};

export function InteractiveGlobe({
  compact = false,
  labels = false,
  className = '',
}: InteractiveGlobeProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const updateTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (compact || prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(y * -10);
    rotateY.set(x * 13);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className={`globe-shell w-full aspect-square relative mx-auto flex items-center justify-center ${compact ? 'globe-shell--compact' : 'cursor-grab active:cursor-grabbing'} ${className}`}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      aria-label={compact ? 'Rotating Hello World globe' : 'Interactive globe showing our global reach'}
      role="img"
    >
      <motion.div
        className={`interactive-earth ${compact ? 'interactive-earth--compact' : ''} ${prefersReducedMotion ? 'interactive-earth--still' : ''}`}
        style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
      />
      <div
        aria-hidden="true"
        className={`interactive-earth-orbit ${compact ? 'interactive-earth-orbit--compact' : ''}`}
      />

      {labels && (
        <div className="globe-copy pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="rounded-full border border-hw-accent/20 bg-black/40 px-7 py-5 backdrop-blur-[3px]"
          >
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.38em] text-hw-accent">
              {'</>'} · compile · ship
            </span>
            <span className="block text-xl font-semibold tracking-tight text-white md:text-2xl">
              console.log(&quot;Hello World&quot;)
            </span>
          </motion.div>
        </div>
      )}
      {!compact && <div className="globe-atmosphere pointer-events-none absolute inset-[8%] -z-10 rounded-full" />}
    </div>
  );
}
