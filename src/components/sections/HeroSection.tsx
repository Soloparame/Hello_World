import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { InteractiveGlobe } from '../ui/InteractiveGlobe';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const updateLayout = () => setIsDesktop(media.matches);
    updateLayout();
    media.addEventListener('change', updateLayout);
    return () => media.removeEventListener('change', updateLayout);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const contentOpacity = useTransform(smoothProgress, [0, 0.45, 0.72], [1, 1, 0]);
  const contentX = useTransform(smoothProgress, [0, 0.72], [0, isDesktop ? 100 : 0]);
  const contentY = useTransform(smoothProgress, [0, 0.72], [0, isDesktop ? 0 : 42]);
  const globeScale = useTransform(smoothProgress, [0, 0.5, 0.82, 1], [1, 1.04, 1.5, 1.85]);
  const globeX = useTransform(smoothProgress, [0, 0.65], ['0%', isDesktop ? '48%' : '0%']);
  const globeY = useTransform(smoothProgress, [0, 0.65], ['0%', isDesktop ? '0%' : '-18%']);
  const globeOpacity = useTransform(smoothProgress, [0, 0.84, 1], [1, 1, 0]);
  const splashOpacity = useTransform(smoothProgress, [0.55, 0.72, 0.95], [0, 1, 0]);
  const splashScale = useTransform(smoothProgress, [0.55, 0.95], [0.25, 2.6]);

  const stats = [
    { value: '12+', label: 'Years shipping' },
    { value: '180+', label: 'Products launched' },
    { value: '99.98%', label: 'Hosting uptime' },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[145vh] overflow-clip">
      <div
        className="hero-visual-bg absolute inset-0 pointer-events-none bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-green-waves.png')",
          backgroundPosition: '72% 42%',
          backgroundSize: 'cover',
          opacity: 1,
        }}
      />
      <div
        className="hero-visual-overlay absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,5,.22) 0%, rgba(5,5,5,.04) 45%, rgba(5,5,5,.18) 100%), linear-gradient(180deg, rgba(5,5,5,.1) 0%, transparent 35%, rgba(5,5,5,.28) 100%)',
        }}
      />
      {/* Background Tech Nodes */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden pb-5 pt-20 md:pb-10 md:pt-24 hero-zoom">
      <div className="container mx-auto px-5 md:px-6 relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center mt-1 md:mt-2 lg:mt-2">
        {/* Right Content */}
        <motion.div
          style={{ opacity: contentOpacity, x: contentX, y: contentY }}
          className="order-2 flex-1 w-full text-center lg:pl-12 lg:text-left lg:-mt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-4 font-mono text-[10px] text-hw-muted uppercase tracking-wider md:mb-8 md:text-xs lg:justify-start"
          >
            <span className="w-2 h-2 rounded-full bg-hw-accent animate-pulse" />
            <span>SYSTEM</span>
            <span className="text-hw-border mx-1">&bull;</span>
            <span>ONLINE</span>
            <span className="text-hw-border mx-1">&bull;</span>
            <span>BUILD 2026.11</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 md:mb-6 leading-[1.05]"
          >
            We Build the <br />
            <span className="text-hw-accent">Digital World.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto text-sm sm:text-base md:text-xl text-hw-muted max-w-xl mb-6 md:mb-10 leading-relaxed font-light lg:mx-0"
          >
            From powerful websites and applications to reliable hosting infrastructure, 
            Hello World turns ambitious ideas into digital products that are built to perform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-row flex-wrap justify-center gap-3 md:gap-4 lg:justify-start"
          >
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Start a Project
            </Button>
            <Button variant="outline" size="lg">
              Explore Our Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Left Content - Interactive Globe */}
        <motion.div
          style={{ scale: globeScale, x: globeX, y: globeY, opacity: globeOpacity }}
          className="order-1 flex-1 relative w-full aspect-square max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-lg mb-8 md:mb-12 lg:mb-16 lg:-mt-8 perspective-1000 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <InteractiveGlobe labels />
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={{ opacity: splashOpacity, scale: splashScale }}
            className="globe-splash pointer-events-none absolute inset-0"
          >
            {Array.from({ length: 28 }, (_, index) => (
              <i
                key={index}
                style={{
                  '--particle-angle': `${index * (360 / 28)}deg`,
                  '--particle-distance': `${(isDesktop ? 120 : 68) + (index % 5) * (isDesktop ? 22 : 12)}px`,
                  '--particle-size': `${2 + (index % 4)}px`,
                } as React.CSSProperties}
              />
            ))}
          </motion.div>
          
          {/* Coding HUD around the globe */}
          <div className="absolute top-0 left-0 font-mono text-[10px] text-hw-accent/85 text-left hidden md:block pointer-events-none z-10 leading-relaxed">
            const world = await build();<br />
            deploy(&quot;live&quot;);
          </div>
          <div className="absolute top-0 right-0 font-mono text-[10px] text-hw-accent/90 text-right hidden md:block pointer-events-none z-10 leading-relaxed">
            CPU 40%<br />
            MEM 70%
          </div>
          <div className="absolute -bottom-1 left-0 font-mono text-[10px] text-hw-muted hidden md:block pointer-events-none z-10 leading-relaxed">
            &lt;HelloWorld /&gt;<br />
            {'{ }'} &rarr; ship()
          </div>
          <div className="absolute -bottom-1 right-0 font-mono text-[10px] text-hw-muted text-right hidden md:block pointer-events-none z-10 leading-relaxed">
            git push origin main<br />
            STATUS: COMPILED
          </div>
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-hw-accent/60 hidden lg:block pointer-events-none z-10 writing-mode-vertical">
            <span className="block rotate-180" style={{ writingMode: 'vertical-rl' }}>
              fn main() {'{'} hello(); {'}'}
            </span>
          </div>
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 font-mono text-[9px] tracking-[0.35em] text-hw-accent/80 uppercase hidden lg:block pointer-events-none z-10">
            stack · react · node · cloud
          </div>
        </motion.div>

      </div>

      {/* Stats footer */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="container mx-auto px-6 mt-8 pt-5 border-t border-hw-border hidden md:grid md:grid-cols-3 gap-8 lg:mt-16 lg:pt-8"
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
            <div className="text-sm text-hw-muted font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}

