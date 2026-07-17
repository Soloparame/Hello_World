import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProjectsSection() {
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-project-card]');
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    card.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -2.2}deg`);
    card.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2.2}deg`);
  };

  return (
    <section id="work" onPointerMove={handlePointerMove} className="py-24 bg-transparent border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
              <span>SELECTED WORK</span>
              <span className="text-hw-muted">&bull;</span>
              <span>24</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Things we've <span className="text-hw-accent">brought to life.</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
            View full case studies
          </Button>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Project 1 - Large (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 group cursor-pointer"
          >
            <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[500px] flex flex-col relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d3f2b] to-hw-card opacity-50 transition-opacity group-hover:opacity-70" />
              
              {/* Mockup UI */}
              <div className="p-8 pt-12 flex-1 relative z-10 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Window Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">NORTHWIND-BANK.APP</span>
                  </div>
                  {/* Window Content */}
                  <div className="p-6">
                    <div className="w-1/3 h-4 bg-white/10 rounded mb-6" />
                    <div className="flex gap-4">
                      <div className="flex-1 h-32 bg-white/5 rounded-lg border border-white/5" />
                      <div className="w-1/3 flex flex-col gap-4">
                        <div className="flex-1 bg-white/5 rounded-lg border border-white/5" />
                        <div className="flex-1 bg-white/5 rounded-lg border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-hw-border bg-hw-card relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-2">
                    <span>FINANCE</span>
                    <span>&bull;</span>
                    <span>WEB APP</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Northwind Bank</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-hw-accent group-hover:text-hw-bg group-hover:border-hw-accent transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (2 smaller projects) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group cursor-pointer flex-1"
            >
              <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[240px] flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c2a4d] to-hw-card opacity-50 transition-opacity group-hover:opacity-70" />
                
                <div className="flex-1 p-6 relative z-10 flex items-center justify-center">
                  <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[8px] font-mono text-white/40 ml-2 uppercase tracking-widest">MERIDIAN-HEALTH.APP</span>
                    </div>
                    <div className="p-4">
                      <div className="w-full h-12 bg-white/5 rounded border border-white/5 mb-3" />
                      <div className="flex gap-3">
                        <div className="flex-1 h-8 bg-white/5 rounded border border-white/5" />
                        <div className="flex-1 h-8 bg-white/5 rounded border border-white/5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-hw-border bg-hw-card relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
                      <span>HEALTHCARE</span>
                      <span>&bull;</span>
                      <span>MOBILE</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Meridian Health</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-hw-accent group-hover:text-hw-bg group-hover:border-hw-accent transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group cursor-pointer flex-1"
            >
              <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[240px] flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4d2a0c] to-hw-card opacity-50 transition-opacity group-hover:opacity-70" />
                
                <div className="flex-1 p-6 relative z-10 flex items-center justify-center">
                  <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[8px] font-mono text-white/40 ml-2 uppercase tracking-widest">ATLAS-COMMERCE.APP</span>
                    </div>
                    <div className="p-4">
                      <div className="w-full h-16 bg-white/5 rounded border border-white/5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-hw-border bg-hw-card relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
                      <span>E-COMMERCE</span>
                      <span>&bull;</span>
                      <span>PLATFORM</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Atlas Commerce</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-hw-accent group-hover:text-hw-bg group-hover:border-hw-accent transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* New 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          {/* Beacon Studios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[360px] flex flex-col relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#3a1c4a] to-hw-card opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="flex-1 p-6 relative z-10 flex items-start justify-center pt-8">
                <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">BEACON-STUDIOS.APP</span>
                  </div>
                  <div className="p-4">
                    <div className="w-full h-16 bg-white/5 rounded border border-white/5 mb-2" />
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-hw-border bg-hw-card relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
                      <span>MEDIA</span>
                      <span>&bull;</span>
                      <span>WEBSITE</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Beacon Studios</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">REACT</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">GSAP</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">CMS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loop Logistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group cursor-pointer"
          >
            <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[360px] flex flex-col relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#113a36] to-hw-card opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="flex-1 p-6 relative z-10 flex items-start justify-center pt-8">
                <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">LOOP-LOGISTICS.APP</span>
                  </div>
                  <div className="p-4">
                    <div className="w-full h-16 bg-white/5 rounded border border-white/5 mb-2" />
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-hw-border bg-hw-card relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
                      <span>SOFTWARE</span>
                      <span>&bull;</span>
                      <span>OPS</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Loop Logistics</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">PYTHON</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">MAPS</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">WEBSOCKETS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Signal Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group cursor-pointer"
          >
            <div data-project-card className="project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden h-[360px] flex flex-col relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2b3a11] to-hw-card opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="flex-1 p-6 relative z-10 flex items-start justify-center pt-8">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-hw-accent/10 border border-hw-accent/20 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-hw-accent animate-pulse" />
                  <span className="text-[10px] font-mono text-hw-accent uppercase tracking-widest">HOSTING LIVE</span>
                </div>
                <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md transform transition-transform duration-500 group-hover:scale-105 mt-4">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-black/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-widest">SIGNAL-CLOUD.APP</span>
                  </div>
                  <div className="p-4">
                    <div className="w-full h-16 bg-white/5 rounded border border-white/5 mb-2" />
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                      <div className="flex-1 h-10 bg-white/5 rounded border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-hw-border bg-hw-card relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
                      <span>HOSTING</span>
                      <span>&bull;</span>
                      <span>INFRASTRUCTURE</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Signal Cloud</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">DOCKER</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">K8S</span>
                  <span className="px-3 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase">OBSERVABILITY</span>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
