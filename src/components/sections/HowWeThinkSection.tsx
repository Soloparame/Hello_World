import React from 'react';
import { motion } from 'framer-motion';

export function HowWeThinkSection() {
  const manifestoItems = [
    { title: 'Craft', description: 'Design in detail' },
    { title: 'Rigor', description: 'Engineer with care' },
    { title: 'Speed', description: 'Ship, then iterate' },
    { title: 'Trust', description: 'Own the outcome' },
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Text */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-hw-accent font-mono text-xs uppercase tracking-widest mb-6"
            >
              How We Think
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight"
            >
              Technology<br />should feel <span className="text-hw-accent">simple.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-hw-muted text-lg font-light leading-relaxed max-w-lg"
            >
              <p>
                Hello World is a digital technology company focused on building, 
                launching, and powering modern digital experiences. We don't only 
                make websites — we help ambitious teams move from an idea, to a 
                product, to a live platform.
              </p>
              <p>
                Great software is built where creative thinking, engineering, design, 
                and infrastructure meet. We keep all four close together so decisions 
                travel quickly and quality compounds.
              </p>
              <p className="font-normal text-white">
                Our promise is small: the things we build should be useful, beautiful, 
                and reliable — for the people who use them, and for the teams who own them.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Manifesto Card */}
          <div className="flex-1 lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-hw-border bg-hw-card p-8 md:p-10 relative overflow-hidden"
            >
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 font-mono text-[10px] text-hw-accent uppercase tracking-widest mb-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-hw-accent" />
                  MANIFESTO &bull; V2026
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {manifestoItems.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-hw-border/50 bg-hw-bg/50 backdrop-blur-sm hover:border-hw-border transition-colors">
                      <div className="text-white font-semibold text-xl mb-1">{item.title}</div>
                      <div className="text-hw-muted text-sm">{item.description}</div>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-hw-accent pl-6 py-1">
                  <blockquote className="text-xl md:text-2xl text-white font-medium mb-4 leading-snug">
                    "We treat the first line of code and the last line of infrastructure with the same care."
                  </blockquote>
                  <cite className="font-mono text-[10px] text-hw-muted uppercase tracking-widest not-italic">
                    — Hello World, Founding Note
                  </cite>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
